'use strict';

require('@pmoo/oow');

class Testigo{ 
    constructor(listaPistas,ubicacion){
        this._pistas = listaPistas;
        this._ubicacion = ubicacion; 
    }
    darPistas(){
        return this._pistas;
    }
    darPista(){
        return this._pistas [0];
    }
    ubicacion(){
        return this._ubicacion;
    }
}

module.exports = {
    Testigo
  };