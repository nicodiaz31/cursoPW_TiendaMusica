let id = 0;
let carrito = [];
let productos = [];
let path = window.location.href.split('/').slice(-1).toString().split('.');
const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const tituloCarrito = document.querySelector('#tituloCarrito');
const listaProductos = document.querySelector('.row__orden');
const listaCarrito = document.querySelector('#listaCarrito');
const vaciarCarritoBtn = document.querySelector('#emptyCartBtn');
let numeroArticulos = document.querySelector('#lblCartCount');
let lblShoppingCart = document.querySelector('#lblShoppingCart');
let articulosCarrito = [];
let type;


let epiPR5 = new Producto(1, "Epiphone", "PR5", "guitarra", 38999.99, "imagenes/epiphone_pr5.jpg", false, false, false);
let epiWil = new Producto(2, "Epiphone", "Wildkat", "guitarra", 69999.99, "imagenes/epiphone_wildkat_3.jpg", false, false, false);
let fenStrChr = new Producto(3, "Fender", "Stratocaster Chrome", "guitarra", 78999.99, "imagenes/fender_stratocaster_chrome.jpg", false, false, false);
let epi339 = new Producto(4, "Epiphone", "ES 339", "guitarra", 89999.99, "imagenes/epiphone_339_2.jpg", false, false, false);
let epiSp2 = new Producto(5, "Epiphone", "Les Paul Special II", "guitarra", 23999.99, "imagenes/epiphone_lp_sp2.jpg", false, false, false);
let epi335 = new Producto(6, "Epiphone", "DOT 335", "guitarra", 74999.99, "imagenes/epiphone_335.jpg", false, false, false);
let fenTel = new Producto(7, "Fender", "Telecaster", "guitarra", 68999.99, "imagenes/fender_telecaster.jpg", false, false, false);
addProducto(epiPR5);
addProducto(epiWil);
addProducto(fenStrChr);
addProducto(epi339);
addProducto(epiSp2);
addProducto(epi335);
addProducto(fenTel);

if (listaProductos != undefined){
	listaProductos.addEventListener('click', agregarCarrito);
}

if (path[0] == "shoppingcart"){
	vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function vaciarCarrito(){
	localStorage.clear();
	numeroArticulos.length = 0;
	updateCart();
	location.reload(false);
}

function agregarCarrito(e) {
	e.preventDefault();
	if(e.target.classList.contains('add__button')){
		const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
		obtenerInfo(productoSeleccionado);
	}
}

function obtenerInfo(producto) {
	const productoAgregado = {
		img : producto.querySelector('.image img').src,
		titulo : producto.querySelector('.p__title').textContent,
		precio : producto.querySelector('.price').textContent
	}
	articulosCarrito.push(productoAgregado);
	console.log(articulosCarrito);
	updateCart();
	saveCart();
}

function updateCart(){
	numeroArticulos.innerHTML = articulosCarrito.length;
}

//Clase del producto
function Producto(id, marca, modelo, tipo, precio, imagen, descuento, destacado, novedades) {
	this.id = id;
	this.marca = marca;
	this.modelo = modelo;
	this.tipo = tipo;
	this.precio = precio;
	this.imagen = imagen;
	this.descuento = descuento;
	this.destacado = destacado;
	this.novedades = novedades;
}

//Funcion eliminar del carrito
function deleteCarrito(producto){
	for (let i = 0; i < carrito.lenght; i++) {
		//Codigo para eliminar
	}
}

//Funcion para agregar id al producto y que no se repita DEBO ARREGLAR 
function getId(id){
	id = id + 1;
	return id;
}

function addProducto(producto){
	productos.push(producto);
}

function defineType (pagina) {
	let tipo;
	if (pagina == "guitarras") {
		tipo = "guitarra";
	}
	return tipo;
}

function generateCards(productos) {
	let idNumber = 0;

	productos.forEach( function(item) {
		if ( item.tipo == type ){
			const containerDiv = document.querySelector('.row__orden');
			const dflex = document.createElement('div');
			dflex.className = 'd-flex';
			containerDiv.appendChild(dflex);
			const card = document.createElement('div');
			card.className = 'card';
			card.setAttribute('id', 'card__' + numbers[idNumber] + '--color');
			dflex.appendChild(card);
			const image = document.createElement('div');
			image.className = 'image';
			card.appendChild(image)
			const img = document.createElement('img');
			img.setAttribute('src',item['imagen']);
			image.appendChild(img); 
			const details = document.createElement('div');
			details.className = 'details__card';
			card.appendChild(details);
			const detailsCenter = document.createElement('div');
			detailsCenter.className = 'center';
			details.appendChild(detailsCenter);
			const title = document.createElement('p');
			title.className = 'p__title';
			title.innerHTML = item['marca'] + " " + item['modelo'];
			detailsCenter.appendChild(title);
			const price = document.createElement('p');
			price.className = 'price';
			price.innerHTML = 'Precio: $'+item['precio'];
			detailsCenter.appendChild(price);
			const addButton = document.createElement('a');
			addButton.setAttribute('href','#');
			addButton.className = 'btn blue__button mt-auto add__button';
			addButton.innerHTML = 'Agregar al Carrito';
			detailsCenter.appendChild(addButton);
			idNumber = idNumber + 1;
		}
	});

}

//Esto lo haré para todas las paginas que necesiten mostrar cards, para esta entrega solo estoy trabajando con guitarras
if (path[0] == "guitarras") {
	type = defineType(path[0]);
	console.log(type);	

	generateCards(productos, type);
} else if (path[0] == "shoppingcart") {
	console.log(path[0]);
	showShoppingCart();
}

function saveCart(){
	localStorage.setItem('articulos',JSON.stringify(articulosCarrito));
}

function readStorage(){
	articulosCarrito = JSON.parse(localStorage.getItem('articulos'));
	updateCart();
}

if (articulosCarrito.length > 0) {
	updateCart();
}

if (localStorage.getItem('articulos') != null){
	readStorage();
}

function showShoppingCart(	) {
	if (localStorage.getItem('articulos') != null){
		lblShoppingCart.innerHTML = "Artículos";
	} else {
		lblShoppingCart.innerHTML = "Carrito Vacio";
	}
}



