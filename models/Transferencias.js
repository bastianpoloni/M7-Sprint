import { sequelize, sumarDinero, restarDinero } from "./Usuarios.js";
import { DataTypes } from "sequelize";

export const transferencias = sequelize.define("transferencias", { 
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},   
    emisor : {type : DataTypes.INTEGER, references: {model: "usuarios", key: "id"}},
    receptor : {type : DataTypes.INTEGER, references: {model: "usuarios", key: "id"}},
    monto : {type : DataTypes.FLOAT}
});

export async function crearTransferencia(emisor, receptor, monto) {
    await transferencias.create({emisor, receptor, monto});
    await restarDinero(emisor, monto);
    await sumarDinero(receptor, monto);
    // await usuarios.update({balance: usuarios.balance - monto}, {where: {id: emisor}});
    // await usuarios.update({balance: usuarios.balance + monto}, {where: {id: receptor}});

}

export async function listarTransferencias() {
    return await transferencias.findAll();
}
