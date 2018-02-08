var Calculadora = (function () {

  // Declaración de variables
  var display = document.getElementById("display");
  var teclas = document.querySelectorAll('.tecla');
  var tecla_presionada, val1  = "", val2 = "", posicion = 1, resultado = 0, operacion = "", punto = false;

  //Inicializar
  function init(){
    for ( var i = 0; i < teclas.length; i++ ){
          teclas[i].onmousedown = presionarTecla;
	        teclas[i].onmouseup = soltarTecla;
    }
    mostrarResultado(0);
  }

  init();


  function mostrarResultado(nuevoResultado){
    if (nuevoResultado.length > 8){
        nuevoResultado = nuevoResultado.toString().substr(0,8);
      }
      display.innerHTML = parseFloat(nuevoResultado);
    }

// Seteo de valores
  function setVal(val){
    if(posicion==1){
       if(val1==''&&val==0)exit;
       if(val1.length<8){
	        val1+=val;
          mostrarResultado(val1);
       }
    }
    if(posicion==2){
      if(val2==''&&val==0)exit;
      if(val2.length<8){
	     val2+=val;
       mostrarResultado(val2);
     }
    }
  }

  function setDecimal(){
    if(punto==false){
      if(posicion==1){
       display.innerHTML =  val1+=".";
      }
      if(posicion==2){
       display.innerHTML =  val2+=".";
      }
      punto=true;
    }
  }

  function setSigno(){
    if(posicion==1&&val1!=''){
      resultado=valor1=parseFloat(valor1)*(-1);
    }
    if(posicion==2&&val2!=''){
      resultado=valor2=parseFloat(valor2)*(-1);
    }
    mostrarResultado(resultado);
  }

//Funciones teclas
   function presionarTecla(){
    	this.style.padding = "3px";
    	switch( this.id ){
    	  case "on":
    	    init();
    	    break;
    	  case "0":
    	  case "1":
    	  case "2":
    	  case "3":
    	  case "4":
    	  case "5":
    	  case "6":
    	  case "7":
    	  case "8":
    	  case "9":
    	    setVal(this.id);
    	    break;
        case "punto":
          setDecimal();
          break;
        case "sign":
          setSigno();
          break;
    	  case "mas":
    	  case "menos":
    	  case "por":
    	  case "dividido":
    	    operacion=this.id;
    	    posicion=2;
          punto=false; 
          display.innerHTML = (" ");
    	    break;
    	  case "igual":
    	    switch(operacion){
    		      case "mas":
          		  resultado = parseFloat(val1) + parseFloat(val2);
    		  break;
    		    case "menos":
          		  resultado = parseFloat(val1) - parseFloat(val2);
    		  break;
    		    case "por":
          		  resultado = parseFloat(val1) * parseFloat(val2);
    		  break;
    		case "dividido":
    	          if (parseFloat(val2) > 0){
    		            resultado = parseFloat(val1) / parseFloat(val2);
    	          }
    		  break;

    	    }
    	    mostrarResultado(resultado);
    	    posicion=1;
    	    val1='';
    	    val2='';
          punto=false;
    	    break;
    	}
    }

  function soltarTecla(){
    this.style.padding = "0";
  }

  return {
    sumar: function(){
      var resultado = val1 + val2;
      mostrarResultado(resultado);
    },
    restar: function(){
      var resultado = val1 - val2;
      mostrarResultado(resultado);
    },
    multiplicar: function(){
      var resultado = val1 * val2;
      mostrarResultado(resultado);
    },
    dividir: function(){
      if (val2 > 0){
          var resultado = val1 / val2;
          mostrarResultado(resultado);
      }
    },
  getval1: function(){
	return val1;
    },
  getval2: function(){
	return val2;
    }
  }
})();