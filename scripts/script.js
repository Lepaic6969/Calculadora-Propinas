// Capturo los elementos del DOM que necesito.
let $formulario=document.getElementById("formulario"),
    $limpiar=document.getElementById("btn-limpiar");

//Función para darle formato a la moneda

//Documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
const formatoMoneda=cantidad=>{
    return cantidad.toLocaleString('es-ES',{style:'currency',currency:'COP',maximumFractionDigits: 0});
    // return cantidad.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
     //  return cantidad.toLocaleString('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:2});
}


//Función para calcular el total a pagar

const calcularTotal=(cantidad,propina)=>{
    let cantidadNumber=Number(cantidad),
        propinaNumber=Number(propina);
    if(cantidadNumber>0 && propinaNumber>=0){
        let total=cantidadNumber+(cantidadNumber*propinaNumber/100);
        return [formatoMoneda(cantidadNumber),formatoMoneda(propinaNumber*cantidadNumber/100),formatoMoneda(total)];
    }else{
        alert("Recuerde que el valor de la cuenta y la propina deben ser números positivos.");
        return [];
    }
    
}

//Función para crear y darle contenido a la tarjeta que se muestra con los resultados.
const generarResultado=(arregloResultados)=>{
    let resultado=`
    
            Total de la cuenta &nbsp; $ ${arregloResultados[0]} <br>
            Propina &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;$ ${arregloResultados[1]} <br>
            Total a pagar &nbsp;&nbsp; &nbsp;&nbsp; $ ${arregloResultados[2]} <br>
    `;
   //Lleno mi tarjetita con la informción de los formularios ya procesada.
    document.querySelector("#resultados").innerHTML=resultado;
   
    //Hago que deje de estar oculta la tarjetita
    document.querySelector(".contenedor-resultado").classList.remove("ocultar"); 
   
}


   

$formulario.addEventListener("submit",e=>{
     e.preventDefault(); //Previene el envío de la información para poderla procesar.
    let cuenta=document.getElementById("cuenta").value,
        propinaPorcentaje=document.getElementById("propina").value;
    
    //Validación para campos vacíos.
    if(cuenta==="" || propinaPorcentaje===""){
        alert("Debe llenar todos los campos para poder hacer el cálculo.");
    }else{
        const calculos=calcularTotal(cuenta,propinaPorcentaje); //Arreglo que almacena toda la información que necesito.
        if(calculos.length!=0){
            generarResultado(calculos);
             //Desaparezco el botón de calcular hasta que se le de limpiar al resultado actual.
            document.getElementById("enviar").classList.add("ocultar");
            // El contenedor se hace más chico al no necesitar contener al botón de calcular
            document.querySelector(".contenedor-calculadora").style.height= "250px";
        }
      
       
    }
   
        
});
$limpiar.addEventListener("click",e=>{
   //Hago que desaparezca la tarjetita
   document.querySelector(".contenedor-resultado").classList.add("ocultar"); 
   //Reseteo formularios
   document.getElementById("cuenta").value="";
   document.getElementById("propina").value="";
   //Reseteo el contenido de mi tarjeta
   document.querySelector("#resultados").innerHTML="";
    //Hago que aparezca de nuevo el botón de calcular
    document.getElementById("enviar").classList.remove("ocultar");
    //El contenedor de la calculadora vuelve a su tamaño original
    document.querySelector(".contenedor-calculadora").style.height= "300px";
});