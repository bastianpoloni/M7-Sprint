import express, { query } from 'express';
import { pool } from './connection.js';
import hbs from 'hbs';
import {crearUsuario, sequelize, listarUsuarios, borrarUsuario, actualizarUsuario} from './models/Usuarios.js';
import {crearTransferencia, listarTransferencias} from './models/Transferencias.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
sequelize.sync({alter: true});

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/usuario', async (req, res) => {
    //console.log(req.body);
   await crearUsuario(req.body.username, req.body.balance);
   res.redirect('/');
});

app.post ('/transferencia', async (req, res) => {
    await crearTransferencia(req.body.emisor, req.body.receptor, req.body.monto);
    await pool.query(`UPDATE usuarios SET balance = balance - ${req.body.monto} WHERE id = ${req.body.emisor}`);
    await pool.query(`UPDATE usuarios SET balance = balance + ${req.body.monto} WHERE id = ${req.body.receptor}`);
    res.sendStatus(200);
});

app.get('/usuarios', async (req, res) => {
    res.send(await listarUsuarios());
});

app.delete('/usuario/:id', async (req, res) => {
    await borrarUsuario(req.params.id);
    res.redirect('/');
});

app.put ('/usuario/:id', async (req, res) => {
    res.send(await actualizarUsuario(req.params.id, req.body.username, req.body.balance));
});

app.get ('/transferencias', async (req, res) => {
    res.send(await listarTransferencias());
});

app.get('/usuario/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let usuario = await pool.query(`SELECT nombre FROM usuarios WHERE id = ${id}`);
        res.send (usuario.rows[0]);
    } catch (error) {
        res.sendStatus(404);
    }
    
    
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});