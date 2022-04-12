'use strict';

require('@pmoo/oow');
class Sospechoso{
  constructor(colorOjos, formaCabello, colorCabello, colorTez, contextura, sexo, altura, nombre, ubicacion, estado ){
        this._colorOjos = colorOjos;
        this._formaCabello = formaCabello;
        this._colorCabello = colorCabello;
        this._colorTez = colorTez;
        this._contextura = contextura;
        this._sexo = sexo;
        this._altura = altura;
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._esCulpable = estado;
  }
  esCulpable(){
    return this._esCulpable;
  }
  tieneCaracteristicas(pistas){
    let atributos = [ this._colorOjos,this._formaCabello,this._colorCabello,this._colorTez,this._contextura,this._sexo,this._altura,this._nombre,this._ubicacion];
    return atributos.some(r=> pistas.indexOf(r)>=0);
  }
}
  module.exports = {
    Sospechoso
  };