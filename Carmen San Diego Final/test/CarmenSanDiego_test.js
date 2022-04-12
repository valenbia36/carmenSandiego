'use strict';

const { suite, test, assert, before } = require('@pmoo/testy');
const { DetectiveClasico, DetectivePersuasivo, DetectiveInterpol } = require('../src/Detective');
const {Pais} = require ('../src/Pais');
const {Testigo} = require ('../src/Testigo');
const {Sospechoso} = require ('../src/Sospechoso');

suite('Suite Carmen Sandiego', () => {
  let detectiveClasico,detectivePersuasivo,detectiveInterpol;let argentina; let brasil; let mexico,testigo1MX,testigo2MX,testigo3MX, listaTestigosMX; let estadosUnidos,listaTestigosEU,testigo1EU,testigo2EU,testigo3EU;let testigo1BR,testigo2BR,testigo3BR,listaTestigossBR;
  let testigo1AR, listaTestigosAR, testigo2AR, testigo3AR;let sospechoso1,sospechoso2,sospechoso3,sospechoso4; let listaSospechosos;
  
  before(() => {

    /************Creo paises**************************************** */
    argentina = new Pais("Argentina", ["Brasil", "Chile"],listaTestigosAR);
    brasil = new Pais("Brasil", ["Argentina", "Chile", "Uruguay"],listaTestigossBR);
    estadosUnidos = new Pais("Estados Unidos", ["Mexico"],listaTestigosEU);
    mexico = new Pais("Mexico", ["Estados Unidos"],listaTestigosMX);

    /************Creo sospechosos*********************************** */
    sospechoso1 = new Sospechoso("Celeste", "Enrulado", "Negro", "Blanca", "Delgado", "Masculino", "1.81", "Fly Trap", estadosUnidos,true);
    sospechoso2 = new Sospechoso("Marron", "Lacio", "Rubio", "Blanca", "Delgado", "Masculino", "1.84", "Graham Calloway", argentina, false);
    sospechoso3 = new Sospechoso("Celeste", "Corto", "Rojo", "Oscura", "Robusto", "Femenino", "1.75", "Paper Star", brasil, false);
    sospechoso4 = new Sospechoso("Verde", "Largo", "Violeta", "Oscura", "Delgado", "Femenino", "1.72", "Neal the Eal", mexico, false);
    listaSospechosos = [sospechoso1,sospechoso2,sospechoso3,sospechoso4];
    /*************************************************************** */
    //*********Creo testigos************    
    testigo1BR = new Testigo(["Negro","Es alto"],brasil);
    testigo2BR = new Testigo(["No esta en chile", "No tiene pelo largo"],brasil);
    testigo3BR = new Testigo(["No es robusto", "No tiene el pelo verde"],brasil);
    listaTestigossBR = [testigo1BR,testigo2BR,testigo3BR];
    testigo1AR= new Testigo(["Se escapo para Brasil",""],argentina);
    testigo2AR= new Testigo(["No tiene ojos rojos","No tiene pelo azul"],argentina);
    testigo3AR= new Testigo(["Celeste",""],argentina);
    listaTestigosAR = [testigo1AR,testigo2AR,testigo3AR];
    testigo1EU = new Testigo(["No vi nada", ""],estadosUnidos);
    testigo2EU = new Testigo(["No vi nada", ""],estadosUnidos);
    testigo3EU = new Testigo(["No vi nada", ""],estadosUnidos);
    listaTestigosEU=[testigo1EU,testigo2EU,testigo3EU];
    testigo1MX = new Testigo(["", ""],mexico); // Testigo sin pistas: Las "No pistas" son consideradas como pistas, lo unico que no dicen nada.
    testigo2MX = new Testigo(["Su tez es blanca", "No es mujer"],mexico);
    testigo3MX = new Testigo(["Se encuentra en el pais", ""],mexico);
    listaTestigosMX =[testigo1MX,testigo2MX,testigo3MX];
    
    /*************************************************************** */
    /************Creo detectives************************************ */
    detectiveClasico = new DetectiveClasico(argentina,50,["Origen robo: Argentina"],listaSospechosos);
    detectivePersuasivo = new DetectivePersuasivo(argentina,50,["Origen robo: Argentina"],listaSospechosos);
    detectiveInterpol = new DetectiveInterpol(argentina,50,["Origen robo: Argentina"],listaSospechosos);
    /*************************************************************** */
  });
  test('Test 01: Detective inicialmente tiene 50 horas', () => {
    assert.that(detectiveClasico.tiempo()).isEqualTo(50);
  });
  test('Test 02: Detective inicialmente se encuentra en pais donde objeto fue robado', () => {
    let ubicacion = detectiveClasico.ubicacion();
    assert.that(ubicacion.nombre()).isEqualTo("Argentina");
  });
  test('Test 03: Detective inicialmente cuenta con pista origen del robo', () => {
    let pistaInicial = detectiveClasico.pistas()[0];
    assert.that(pistaInicial).isEqualTo("Origen robo: Argentina");
  });
  test('Test 04: Un pais es limitrofe a otro', () => {
    assert.isTrue(argentina.esLimitrofeA(brasil));
  });
  test('Test 05: Un pais no es limitrofe a otro', () => {
    assert.isFalse(argentina.esLimitrofeA(estadosUnidos));
  });
  test('Test 06: Un pais tiene tres testigos', () => {
    let testigosBR = brasil.testigos();
    assert.that(testigosBR.length).isEqualTo(3);
  });
  test('Test 07: Un testigo tiene pistas', () => {
    let testigo2BR = brasil.testigos()[1];
    assert.that(testigo2BR.darPistas().length).isEqualTo(2);
  });
  test('Test 08: Detective viaja a otro pais', () => {
    detectiveClasico.viajar(brasil);
    let ubicacion = detectiveClasico.ubicacion();
    assert.that(ubicacion.nombre()).isEqualTo("Brasil");
  });
  test('Test 09: Detective viaja a otro pais y pierde horas', () => {
    detectiveClasico.viajar(brasil);
    assert.that(detectiveClasico.tiempo()).isEqualTo(43);
  });
  test('Test 10: Detective no puede viajar por falta de horas', () => {
    let detClas = new DetectiveClasico(argentina,5,["Origen robo: Argentina"]);
    assert.that(() => { detClas.viajar(brasil); }).raises(DetectiveClasico.ErrorFaltaDeTiempo());
  });
  test('Test 11: Detective no puede viajar al mismo pais en el que esta', () => {
    let detClas = new DetectiveClasico(argentina,5,["Origen robo: Argentina"]);
    assert.that(() => { detClas.viajar(argentina); }).raises(DetectiveClasico.ErrorViajeAMismoPais());
  });
  test('Test 12: Detective puede interrogar y obtiene pistas', () => {
    let testigo1AR = argentina.testigos()[0]; 
    detectiveClasico.interrogar(testigo1AR);
    let arrPistas = detectiveClasico.pistas();
    assert.that(arrPistas.length).isEqualTo(2);
    assert.that(arrPistas[1]).isEqualTo("Se escapo para Brasil");
  });
  test('Test 13: Detective interroga y pierde tiempo', () => {
    let testigo1AR = argentina.testigos()[0]; 
    detectiveClasico.interrogar(testigo1AR);
    assert.that(detectiveClasico.tiempo()).isEqualTo(48);
  });
  test('Test 14: Detective no puede interrogar a testigo de otro pais', () => {
    let testigo1BR = brasil.testigos()[0]; 
    let arrPistas = detectiveClasico.pistas();
    assert.that(() => { detectiveClasico.interrogar(testigo1BR); }).raises(DetectiveClasico.ErrorTestigoDeOtroPais());
    assert.that(arrPistas.length).isEqualTo(1);
  });
  test('Test 15: Detective no puede interrogar por falta de tiempo', () => {
    let testigo1AR = argentina.testigos()[0];
    let detClas = new DetectiveClasico(argentina,2,["Origen Robo: Argentina"]);
    let arrPistas = detClas.pistas();
    assert.that(() => { detClas.interrogar(testigo1AR); }).raises(DetectiveClasico.ErrorFaltaDeTiempo());
    assert.that(arrPistas.length).isEqualTo(1);
  });
  test('Test 16: Detective va a un pais en el que no estuvo el sospechoso y los testigos no vieron nada', () => {
    let testigoEU = estadosUnidos.testigos()[0]; 
    detectiveClasico.viajar(estadosUnidos);
    detectiveClasico.interrogar(testigoEU);
    let arrPistas = detectiveClasico.pistas();
    assert.isTrue(arrPistas.includes("No vi nada"));
  });
  test('Test 17: Detective viaja a pais no limitrofe y tarda mas', () => {
    detectiveClasico.viajar(estadosUnidos);
    assert.that(detectiveClasico.tiempo()).isEqualTo(40);
  });
  test('Test 18: Detective viaja a pais limitrofe y tarda menos', () => {
    detectiveClasico.viajar(brasil);
    assert.that(detectiveClasico.tiempo()).isEqualTo(43);
  });
  test('Test 19:Detective arresta al ladron', () => {
    assert.isTrue(sospechoso1.esCulpable());
    assert.that(detectiveClasico.arrestar(sospechoso1)).isEqualTo("Encontraste al Ladron")
  });
  test('Test 20:Detective arresta al ladron equivocado', () => {
    assert.isFalse(sospechoso2.esCulpable());
    assert.that(detectiveClasico.arrestar(sospechoso2)).isEqualTo("Perdiste! Arrestaste al ladron incorrecto.")
  });
  test('Test 21:Detective no puede arrestar por falta de tiempo', () => {
    let detClas = new DetectiveClasico (argentina,0,["Origen Robo: Argentina"]);
    assert.that(() => { detClas.arrestar(sospechoso1); }).raises(DetectiveClasico.ErrorFaltaDeTiempo());
  });
  test('Test 22:Detective persuasivo interroga y obtiene dos pistas', () => {
    let testigo2BR = brasil.testigos()[1];
    detectivePersuasivo.viajar(brasil);
    detectivePersuasivo.interrogar(testigo2BR);
    let arrPistas = detectivePersuasivo.pistas();
    assert.that(arrPistas.length).isEqualTo(3);
  });
  test('Test 23:Detective persuasivo pierde menos tiempo interrogando', () => {
    let testigo1AR = argentina.testigos()[0];
    detectivePersuasivo.interrogar(testigo1AR);
    assert.that(detectivePersuasivo.tiempo()).isEqualTo(49);
  });
  test('Test 24:Detective persuasivo pierde menos tiempo interrogando', () => {
    let testigo1AR = argentina.testigos()[0];
    detectivePersuasivo.interrogar(testigo1AR);
    assert.that(detectivePersuasivo.tiempo()).isEqualTo(49);
  });
  test('Test 25:Detective persuasivo no puede interrogar por falta de tiempo', () => {
    let detPers = new DetectivePersuasivo (argentina,1,["Origen Robo: Argentina"]);
    assert.that(() => { detPers.interrogar(testigo1AR); }).raises(DetectivePersuasivo.ErrorFaltaDeTiempo());
  });
  test('Test 26:Detective Interpol tarda menos de lo normal en viajar a pais limitrofe', () => {
    detectiveInterpol.viajar(brasil);
    assert.that(detectiveInterpol.tiempo()).isEqualTo(45);
  });
  test('Test 27:Detective Interpol tarda menos de lo normal en viajar a pais no limitrofe', () => {
    detectiveInterpol.viajar(estadosUnidos);
    assert.that(detectiveInterpol.tiempo()).isEqualTo(42);
  });

  test('Test 28:Detective Interpol puede arrestar', () => {
    assert.that(detectiveInterpol.arrestar(sospechoso1)).isEqualTo("Encontraste al Ladron");
  });
  test('Test 29:Desarollo Juego', () => {
    let ubicacionInicial = detectiveClasico.ubicacion();
    let testigo1Ar= ubicacionInicial.testigos()[0];
    detectiveClasico.interrogar(testigo1Ar);              //Detective arranca en Argentina interrogando, la pista es que se para brasil
    detectiveClasico.viajar(brasil);
    let ubicacionActual = detectiveClasico.ubicacion();   //Viaja a Brasil y recolecta pistas, llevandolo a Estados Unidos
    let testigo1Br = ubicacionActual.testigos()[0];
    let testigo2Br = ubicacionActual.testigos()[1];
    detectiveClasico.interrogar(testigo1Br);detectiveClasico.interrogar(testigo2Br);
    detectiveClasico.viajar(estadosUnidos);
    ubicacionActual = detectiveClasico.ubicacion();                 //En estados Unidos los testigos dicen que no vieron nada por ende el ladron no paso por ahi
    let testigo1Eu = ubicacionActual.testigos()[0];
    detectiveClasico.interrogar(testigo1Eu);
    detectiveClasico.viajar(mexico);
    ubicacionActual = detectiveClasico.ubicacion();                 //Detective viaja a Mexico segun pistas y da con el sospechoso
    let testigo1Mx = ubicacionActual.testigos()[0];
    detectiveClasico.interrogar(testigo1Mx);
    assert.that(detectiveClasico.arrestar(sospechoso1)).isEqualTo("Encontraste al Ladron");
    assert.that(ubicacionActual.nombre()).isEqualTo(mexico.nombre());
    assert.that(detectiveClasico.tiempo()).isEqualTo(16);
  });
  test('Test 30: Detective obtiene pista y filtra sospechosos', () => {
    detectiveClasico.viajar(brasil);
    detectiveClasico.interrogar(testigo1BR); //Recibe pista del color de pelo de el culpable
    let sus = detectiveClasico.sospechosos();
    detectiveClasico.filtrar(detectiveClasico.pistas(),listaSospechosos);
    assert.that(detectiveClasico._sospechosos.length).isEqualTo(1); //Filtra la lista quedando un solo sospechoso
    assert.that(sus[0]._colorCabello).isEqualTo("Negro"); //Verifica que la pista que recibio coincide con el unico sospechoso que quedo en la lista
    assert.isTrue(sus.includes(sospechoso1));
  });
  test('Test 31: Detective obtiene pista y no filtra sospechosos', () => {
    detectiveClasico.viajar(brasil);
    detectiveClasico.interrogar(testigo2BR);
    let sus = detectiveClasico.sospechosos();
    detectiveClasico.filtrar(detectiveClasico.pistas(),listaSospechosos);
    assert.that(sus.length).isEqualTo(4);
  });
  test('Test 32: Detective obtiene pista y filtra dos sospechosos', () => {
    detectiveClasico.interrogar(testigo3AR); //Recibe pista del color de pelo de el culpable
    let sus = detectiveClasico.sospechosos();
    detectiveClasico.filtrar(detectiveClasico.pistas(),listaSospechosos);
    assert.that(detectiveClasico._sospechosos.length).isEqualTo(2); //Filtra la lista quedando un solo sospechoso
  });




});
