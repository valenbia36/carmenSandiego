'use strict';

require('@pmoo/oow');
class Detective{
  constructor(ubicacion, tiempoInicial, pistas,sospechosos){      //Constructor de Detective.
    this._ubicacion = ubicacion;
    this._tiempo = tiempoInicial;
    this._pistas = pistas;
    this._sospechosos = sospechosos;

  }
  static ErrorFaltaDeTiempo(){
        return "No alcanza el tiempo. Perdiste";
  }
  static ErrorViajeAMismoPais(){
    return "No se puede viajar al mismo pais";
}
  static ErrorTestigoDeOtroPais(){
    return "Este testigo no es de este pais";
  }
  chequearTiempo(tiempoAUtilizar){              //Chequea que quede tiempo para realizar alguna accion indicada.
    if(this.tiempo() - tiempoAUtilizar <= 0){
      throw Detective.ErrorFaltaDeTiempo()
    }
  }
  validarPais(otroPais){                              //Chequea que no se trate de viajar al mismo pais en el que esta.
    let ubicacionActual = this._ubicacion;
    if(otroPais.nombre() === ubicacionActual.nombre()){
      throw Detective.ErrorViajeAMismoPais();
    }
  }
  chequearTestigo(testigo){                         // Verifica que el testigo que se quiere interrogar pertenezca al pais donde se encuentra el detective.
    let paisActual = this._ubicacion;
    let ubicacionTestigo = testigo.ubicacion();
    if( ubicacionTestigo.nombre()!= paisActual.nombre()){
      throw Detective.ErrorTestigoDeOtroPais();
    }
  }
  ubicacion(){
    return this._ubicacion;
  }
  tiempo(){
        return this._tiempo;
  }
  pistas(){
    return this._pistas;
  }
  viajar(otroPais){
    this.childResposibility();
  }
  interrogar(testigo){
    this.childResposibility();
  }
  arrestar(sospechoso){
    this.chequearTiempo(0);
    if(sospechoso.esCulpable()){
      return "Encontraste al Ladron";
    }
    else{
      return "Perdiste! Arrestaste al ladron incorrecto.";
    }
  }
  sospechosos(){
    return this._sospechosos;
  }
  filtrar(pistas,listaSos){
    this._sospechosos = listaSos.filter(sospechoso => sospechoso.tieneCaracteristicas(this._pistas));
  }
   


}
class DetectiveClasico extends Detective{
    viajar(otroPais){
      this.validarPais(otroPais);
      if(otroPais.esLimitrofeA(this.ubicacion())){
        this.chequearTiempo(7);
        this._ubicacion = otroPais;
        this._tiempo -= 7;
      }
      else{
        this.chequearTiempo(10);
        this._ubicacion = otroPais;
        this._tiempo -= 10;

      }
    }
    interrogar(testigo){
      this.chequearTiempo(2);
      this.chequearTestigo(testigo);
      let pista = testigo.darPista();
      this._pistas.push(pista);
      this._tiempo -= 2;

    }
}
class DetectivePersuasivo extends Detective{
  viajar(otroPais){
    this.validarPais(otroPais);
    if(otroPais.esLimitrofeA(this.ubicacion())){
      this.chequearTiempo(7);
      this._ubicacion = otroPais;
      this._tiempo -= 7;
    }
    else{
      this.chequearTiempo(10);
      this._ubicacion = otroPais;
      this._tiempo -= 10;

    }
  }
  interrogar(testigo){
    this.chequearTiempo(1);
    this.chequearTestigo(testigo);
    let pista1 = testigo.darPistas()[0];
    let pista2 = testigo.darPistas()[1];
    this._pistas.push(pista1);
    this._pistas.push(pista2);
    this._tiempo -= 1;

  }

}
class DetectiveInterpol extends Detective{
  viajar(otroPais){
    this.validarPais(otroPais);
    if(otroPais.esLimitrofeA(this.ubicacion())){
      this.chequearTiempo(5);
      this._ubicacion = otroPais;
      this._tiempo -= 5;
    }                                               //Suponemos que tarda dos horas menos.
    else{
      this.chequearTiempo(8);
      this._ubicacion = otroPais;
      this._tiempo -= 8;

    }
  }
  interrogar(testigo){
    this.chequearTiempo(2);
    this.chequearTestigo(testigo);
    let pista = testigo.darPista();
    this._pistas.push(pista);
    this._tiempo -= 2;

  }

}
module.exports = {
  DetectiveClasico, DetectivePersuasivo, DetectiveInterpol
};
