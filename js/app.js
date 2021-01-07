$(document).ready(function(){

	let id = 0;
	let carrito = [];
	let productos = [];
	let path = window.location.href.split('/').slice(-1).toString().split('.');
	console.log(path[0]);
	const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
	const tituloCarrito = document.querySelector('#tituloCarrito');
	const listaProductos = document.querySelector('.row__orden');
	const listaCarrito = document.querySelector('#listaCarrito');
	const vaciarCarritoBtn = document.querySelector('#emptyCartBtn');
	let numeroArticulos = document.querySelector('#lblCartCount');
	let lblShoppingCart = document.querySelector('#lblShoppingCart');
	let articulosCarrito = [];
	const productsList = $('.row__orden');
	let header = $('header');
	const msg = $('#msg');
	let cards;
	let type;

	function getJson(){
		console.log(productos);
		$.ajax({
			url:'js/articles.json',
			success: function (data, status, xhr) {
				console.log(data)
				productos = data
				generateCards(productos)
			},
			error: function (xhr, status, errorThrown) {
				console.log(xhr)
				console.log(status)
				console.log(errorThrown)
			}
		})
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
			mostrarMsg();
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

	function mostrarMsg() {
		msg.css("position","absolute");
		msg.fadeIn(1500);
		msg.fadeOut(1500);
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
		if (pagina == "bajos") {
			tipo = "bajo";
		}
		if (pagina == "amplificadores") {
			tipo = "amplificador";
		} 
		if (pagina == "auriculares") {
			tipo = "auriculares";
		} 
		return tipo;
	}

	function showShoppingCart(	) {
		if (localStorage.getItem('articulos') != null){
			lblShoppingCart.innerHTML = "Artículos";
		} else {
			lblShoppingCart.innerHTML = "Carrito Vacio";
		}
	}

	function saveCart(){
		localStorage.setItem('articulos',JSON.stringify(articulosCarrito));
	}

	function readStorage(){
		articulosCarrito = JSON.parse(localStorage.getItem('articulos'));
		updateCart();
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
				if ( item.tipo == "amplificador" || item.tipo == "auriculares") {
					img.className = 'img__ancha';
				} 
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
	if (path[0] == "guitarras" || path[0] == "bajos" || path[0] == "amplificadores" || path[0] == "auriculares") {
		type = defineType(path[0]);
		console.log(type);	
		getJson();

	} else if (path[0] == "shoppingcart") {
		console.log(path[0]);
		showShoppingCart();
	}

	if (articulosCarrito.length > 0) {
		updateCart();
	}

	if (localStorage.getItem('articulos') != null){
		readStorage();
	}

	if (productsList != undefined){
		productsList.click(agregarCarrito);
	}

	if (path[0] == "shoppingcart"){
		vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
	}

	productsList.hide();
	productsList.fadeIn(500);

	setTimeout(() => {
		
	}, 3000);
})


