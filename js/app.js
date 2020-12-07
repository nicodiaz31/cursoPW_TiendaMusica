let id = 0;
let carrito = [];

//Clase del producto
function producto(id, marca, modelo, tipo, precio, imagen) {
	this.id = getId(id);
	this.marca = marca;
	this.modelo = modelo;
	this.tipo = tipo;
	this.precio = precio;
	this.imagen = imagen;
}

//Funcion agregar al carrito
function addCarrito(producto){
	carrito.push(producto);
}

//Funcion eliminar del carrito
function deleteCarrito(producto){
	for (let i = 0; i < carrito.lenght; i++) {
		//Codigo para eliminar
	}
}

//Funcion para agregar id al producto y que no se repita
function getId(id){
	id =+ 1;
	return id;
}