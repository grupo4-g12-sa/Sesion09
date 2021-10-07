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
 * peticion get de la api audiende
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

    productos.forEach(producto=>{
        cadena+="<p>Codigo: "+producto.codprod+"</p>"+
                "<p>Nombre: "+producto.nomprod+"</p>"+
                "<p>Precio: "+producto.precio+"</p>"+
                "<p>Inventario: "+producto.inventario+"</p>"
    });
    //return cadena
    etp.innerHTML=cadena
}
/**
 * peticion POST de la api audiende
 */
function get_post(){

const data= {
    codprod:"2",
    nomprod:"Coca-cola",
    precio:3500,
    inventario:14,

}

let datasend=JSON.stringify(data)
    $.ajax({
        
        method:"POST",
        url: endpoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log(response.status)
        }
    });
}

/**llamado a la función */
get_get()//-- Traigo Info
//get_post()-- Introduzco info
 
function get_put(){

const data= {
    codprod:"2",
    nomprod:"CocaCola",
    precio:3550,
    inventario:14,

}

let datasend=JSON.stringify(data)
    $.ajax({
        
        method:"PUT",
        url: endpoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log(response.status)
            console.log("Actualizó registro")
        }
    });
}

//get_put()//--EDITAR ACTUALIZAR

function get_del(){

const data= {
    codprod:"2",
}

let datasend=JSON.stringify(data)
    $.ajax({
        
        method:"DELETE",
        url: endpoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
                    console.log("Elimino registro")
        }
    });
}

//get_del()//--EDITAR ACTUALIZAR