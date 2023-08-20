import {Sequelize, DataTypes} from "sequelize";

export const sequelize = new Sequelize('bancosolar', 'bastianpoloni', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});


export const usuarios = sequelize.define('usuarios', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre : {type: DataTypes.STRING},
    balance : {type: DataTypes.FLOAT}
});

export async function crearUsuario(nombre, balance) {
    await usuarios.create({nombre, balance});
}

export async function listarUsuarios() {
    return await usuarios.findAll();
}

export async function actualizarUsuario(id, nombre, balance) {
    await usuarios.update({nombre, balance}, {where: {id}});
}

export async function borrarUsuario(id) {
    await usuarios.destroy({where: {id}});
}
