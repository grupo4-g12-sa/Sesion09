/**
 * autor Ingrid Jahaira Perdomo Sánchez
 * Fecha 29/08/2021
 * Universidad Sergio Arboleda
 */
/**
 * endpoint api Oracle cloud 
 */
const endpoint = "https://gc0313b709c117e-db202109241641.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/producto/producto"
const etp=document.getElementById("info")

/**
 * captura id boton
 */
const btn_show=document.getElementById("btn_show")
const btn_save=document.getElementById("btn_save")
const btn_update=document.getElementById("btn_update")
const btn_del=document.getElementById("btn_del")
/**
 * Captura del input de la interfaz html 
*/
const codprode=document.getElementById("codprod")
const nomprode=document.getElementById("nomprod")
const precioe=document.getElementById("precio")
const inventarioe=document.getElementById("inventario")

/**
 * peticion get de la api producto
 */

function get_get(){
    /**
     * peticiones asincronas al servidor con ajax
     */
    $.ajax({
        method:"GET",
        url: endpoint,
        success:function(data){
            show_prod(data.items)
            getProd(data.items)
        }
    });
    //etp.innerHTML="Modifique desde JS"
}

/**
 * Función para mostrar productos
 */
function show_prod(productos){
    productos.forEach(producto => {
        console.log("Codigo de Producto: "+producto.codprod)
        console.log("Nombre de Producto: "+producto.nomprod)
        console.log("Precio de Producto: "+producto.precio)
        console.log("Inventario de Producto: "+producto.inventario)
        
    });
}

function getProd(productos){
    let cadena=""
    if(productos.lenght==0){
        cadena="No hay registros en la base de datos"
    }
    else{
    productos.forEach(producto=>{
        cadena+="<p>Codigo: "+producto.codprod+"</p>"+
                "<p>Nombre: "+producto.nomprod+"</p>"+
                "<p>Precio: "+producto.precio+"</p>"+
                "<p>Inventario: "+producto.inventario+"</p>"
    });
    }//return cadena
    console.log(etp)
    console.log(cadena)
    etp.innerHTML=cadena
}
/**
 * peticion POST de la api audiende
 */

function capturaprod(){
    
    const data= {
        codprod:codprode.value,
        nomprod:nomprode.value,
        precio:precioe.value,
        inventario:inventarioe.value,
    }
    return JSON.stringify(data)
}

function show_answer(status,texto){
    let mensaje=""
    if(status==201){
        mensaje=texto
    }
    else if (status==204){
        mensaje="El registro ya existe"
    }
    alert(mensaje)
}

function get_post(){

/**const data= {
    codprod:"1",
    nomprod:"Coca-cola",
    precio:3500,
    inventario:14,

}

let datasend=JSON.stringify(data)
*/
    $.ajax({
        
        method:"POST",
        url: endpoint,
        data:capturaprod(),
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            show_answer(response.status,"Guardado con éxito")
            cleanField()
        }
    });
}
function checkField(){
    if(codprode.value=="" || nomprode.value=="" || precioe.value=="" || inventarioe.value==""){
    return true
}
else{
    return false
}
}

function checkFieldDelete(){
    if(codprode.value=="" ){
    return true
}
else{
    return false
}
}
/**llamado a la función */
//get_get()//-- Traigo Info
//get_post()-- Introduzco info
 
function get_put(){
/**
const data= {
    codprod:"2",
    nomprod:"CocaCola",
    precio:3550,
    inventario:14,

}

let datasend=JSON.stringify(data)
 */
    $.ajax({
        
        method:"PUT",
        url: endpoint,
        data:capturaprod(),
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            show_answer(response.status,"Actualizó registro")
            cleanField()
        }
    });
}

//get_put()//--EDITAR ACTUALIZAR
function capturacodprod(){
    
    const data= {
        codprod:codprode.value,
    }
    return JSON.stringify(data)
}

function show_answerdelete(status){
    if (status==204){
        alert("Registro Eliminado") 
    }
    alert(mensaje)
}

function get_del(){

    $.ajax({
        
        method:"DELETE",
        url: endpoint,
        data:capturacodprod(),
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
                   show_answerdelete(response.status)
        }
    });
}

function cleanField(){
    codprode.value=""
    nomprode.value=""
    precioe.value=""
    inventarioe.value=""
    codprode.focus()
}


btn_show.addEventListener("click",(e)=>{
    e.preventDefault()
    get_get()
})
btn_save.addEventListener("click",(e)=>{
    e.preventDefault()
    if(checkField()){
        alert("Campos Vacíos")
    }
    else{
        get_post()
    }
    
})
btn_update.addEventListener("click",(e)=>{
    e.preventDefault()
    if(checkField()){
        alert("Campos Vacíos")
    }
    else{
        get_put()
    }
    
})
btn_del.addEventListener("click",(e)=>{
    e.preventDefault()
    if(checkFieldDelete()){
        alert ("Campo código vacío")
    }
    else{
        get_del()
    }
})

//get_del()//--EDITAR ACTUALIZAR