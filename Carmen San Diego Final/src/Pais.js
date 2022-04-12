'use strict';

require('@pmoo/oow');

class Pais{
    constructor(nombre, paisesLimitrofes,testigosPorPais){
        this._nombre = nombre;
        this._limites = paisesLimitrofes;
        this._testigos = testigosPorPais; 
    }
    nombre(){
        return this._nombre;
    }
    paisesLimitrofes(){
        return this._limites;
    }
    esLimitrofeA(otroPais){
        return (this.paisesLimitrofes()).includes(otroPais.nombre());
    }
    testigos(){
        return this._testigos;
    }
}
module.exports = {
    Pais
  };