$(document).ready(function(){

	let id = 0;
	let carrito = [];
	let productosList = [];
	let productosShow = [];
	let path = window.location.href.split('/').slice(-1).toString().split('.');
	console.log(path[0]);
	const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
	const tituloCarrito = document.querySelector('#tituloCarrito');
	const listaProductos = document.querySelector('.row__orden');
	const listaCarrito = document.querySelector('.listadoCarrito');
	const totalDiv = document.createElement('div');
	const table = document.querySelector('.listadoProductos');
	let numeroArticulos = document.querySelector('#lblCartCount');
	let lblShoppingCart = document.querySelector('#lblShoppingCart');
	const vaciarButton = document.querySelector('#emptyCartBtn');
	const comprarButton = document.querySelector('#botonComprar');
	let articulosCarrito = [];
	const productsList = $('.row__orden');
	let header = $('header');
	const msg = $('#msg');
	let cards;
	let type;
	let destacado;
	let descuento;
	let novedades;
	let jsonRoot = 'js/articles.json';



	async function getJson(){
		const results = await fetch(jsonRoot);
		const productos = await results.json();
		searchProducts(productos, type, descuento, novedades, destacado);
	}	
	

	function vaciarCarrito(){
		localStorage.clear();
		numeroArticulos.length = 0;
		updateCart();
		borrarHTML();
		vaciarButton.disabled = true;
		comprarButton.disabled = true;
		location.reload();

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
			id : producto.querySelector('.p__title').getAttribute('data-id'),
			img : producto.querySelector('.image img').src,
			titulo : producto.querySelector('.p__title').textContent,
			precio : producto.querySelector('.price').getAttribute('price-Number'),
			tipo : producto.querySelector('.p__title').getAttribute('tipo'),
			cantidad : 1
		}
		let exist = articulosCarrito.some(producto => producto.id === productoAgregado.id);

		if (exist) {
			const products = articulosCarrito.map(producto => {
				if (producto.id === productoAgregado.id) {
					console.log(producto.cantidad);
					console.log(productoAgregado.precio);
					producto.cantidad++;
					producto.precio =`${productoAgregado.precio * producto.cantidad}`;
					return producto;
				} else {
					return producto;
				}
			});
			articulosCarrito = [...products];
		} else {
			articulosCarrito = [...articulosCarrito, productoAgregado];
		}
		console.log(articulosCarrito);
		updateCart();
		saveCart();
	}

	function updateCart(){
		let cantidadArticulos = 0;
		articulosCarrito.forEach(function(item){
			cantidadArticulos = item.cantidad + cantidadArticulos;
		})
		numeroArticulos.innerHTML = cantidadArticulos;
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
			title.setAttribute('data-id', item['id']);
			title.setAttribute('tipo', item['tipo']);
			title.innerHTML = item['marca'] + " " + item['modelo'];
			detailsCenter.appendChild(title);
			const price = document.createElement('p');
			price.className = 'price';
			price.setAttribute('price-Number', item['precio']);
			price.innerHTML = 'Precio: $'+item['precio'];
			detailsCenter.appendChild(price);
			const addButton = document.createElement('a');
			addButton.setAttribute('href','#');
			addButton.className = 'btn blue__button mt-auto add__button';
			addButton.innerHTML = 'Agregar al Carrito';
			detailsCenter.appendChild(addButton);
			idNumber = idNumber + 1;
		});
	}

	function showShoppingCart() {
		borrarHTML();
		if (localStorage.getItem('articulos') != null){
			lblShoppingCart.disabled = true;
			vaciarCarrito.disabled = false;
			let total = 0;
			let cartList;
			cartList = JSON.parse(localStorage.getItem('articulos'));
			console.log(cartList);
			const headers = document.createElement('tr');
			table.appendChild(headers);
			const headerProducto = document.createElement('th');
			const labelProducto = document.createElement('label')
			labelProducto.innerHTML = 'Producto';
			headerProducto.appendChild(labelProducto);
			headers.appendChild(headerProducto);
			const headerCantidad = document.createElement('th');
			const labelCantidad = document.createElement('label');
			labelCantidad.innerHTML = 'Cantidad';
			headerCantidad.appendChild(labelCantidad);
			headers.appendChild(headerCantidad);
			const headerSubtotal = document.createElement('th');
			const labelSubtotal = document.createElement('label');
			labelSubtotal.innerHTML = 'Subtotal';
			headerSubtotal.appendChild(labelSubtotal);
			headers.appendChild(headerSubtotal);
			cartList.forEach(function(item){
				const row = document.createElement('tr');
				row.className = "torta";
				row.setAttribute('data-id', item.id);
				table.appendChild(row);
				const infoColumn = document.createElement('td');
				row.appendChild(infoColumn);
				const infoContainer = document.createElement('div');
				infoContainer.className = 'cart-info';
				infoColumn.appendChild(infoContainer);
				const imgContainer = document.createElement('div');
				imgContainer.className = 'div-img';
				imgContainer.setAttribute('width', '130');
				imgContainer.style.minWidth = "130px";
				imgContainer.style.maxHeight = "130px";
				infoContainer.appendChild(imgContainer);
				const imgProd = document.createElement('img');
				imgProd.setAttribute('src', item.img);
				if(item.tipo == 'guitarra' || item.tipo == 'bajo'){
					imgProd.setAttribute('width', '60');
					imgProd.setAttribute('margin-left','25');
				} else {
					imgProd.setAttribute('width', '130');
				}
				imgContainer.appendChild(imgProd);
				const tituloDiv = document.createElement('div');
				infoContainer.appendChild(tituloDiv);
				const tituloProducto = document.createElement('p');
				tituloProducto.innerHTML = item.titulo;
				tituloDiv.appendChild(tituloProducto);
				const precioProd = document.createElement('small');
				precioProd.innerHTML = "Precio: $"+item.precio;
				tituloDiv.appendChild(precioProd);
				const removeOption = document.createElement('button');
				removeOption.className = 'remove-option';
				removeOption.innerHTML = 'Eliminar';
				removeOption.addEventListener('click',eliminarProducto);
				tituloDiv.appendChild(removeOption);
				const cantidadColumn = document.createElement('td');
				cantidadColumn.className = 'center__input';
				row.appendChild(cantidadColumn);
				const cantidadInput = document.createElement('input');
				cantidadInput.setAttribute('type', 'number');
				cantidadInput.setAttribute('min', '1');
				cantidadInput.setAttribute('value', item.cantidad);
				cantidadInput.addEventListener('change',cambioMontos);
				cantidadColumn.appendChild(cantidadInput);
				const subtotal = document.createElement('td');
				let subtotalProducto = parseInt(item.cantidad) * (parseFloat(item.precio).toFixed(2));
				total = total + subtotalProducto;
				subtotal.innerHTML = "$"+subtotalProducto.toFixed(2);
				row.appendChild(subtotal);
			})
			console.log(total);
			totalDiv.className = 'total-price';
			const totalTable = document.createElement('table');
			totalTable.className = 'total-table'
			totalDiv.appendChild(totalTable);
			const totalTr = document.createElement('tr');
			totalTable.appendChild(totalTr);
			const totalTitle = document.createElement('td');
			totalTitle.innerHTML = "Total:"
			totalTr.appendChild(totalTitle);
			const totalNumber = document.createElement('td');
			totalNumber.innerHTML = "$" + total.toFixed(2);
			const divPrincipal = document.querySelector('.cart-page');
			divPrincipal.appendChild(totalDiv);
			totalTr.appendChild(totalNumber);
			articulosCarrito = cartList;
		} else {
			lblShoppingCart.innerHTML = "Carrito Vacio";
		}
	}

	function eliminarProducto(e){
		//event.preventDefault();
		console.log("hola " + e);
		if (e.target.classList.contains('remove-option')){
			const productId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
			articulosCarrito = articulosCarrito.filter(producto => producto.id !== productId);
			saveCart();
			readStorage();
			borrarHTML();
			if (articulosCarrito.length > 0){
				showShoppingCart();
			} else {
				vaciarCarrito();
				borrarHTML();
				lblShoppingCart.disabled = false;
				location.reload();
			}
		} 
	}

	function cambioMontos(e){
		console.log(e.target.parentElement.parentElement.getAttribute('data-id'));
		const productId = e.target.parentElement.parentElement.getAttribute('data-id');
		articulosCarrito.forEach(function(item){
			if(item.id == productId){
				item.cantidad = e.target.value;
				saveCart();
				readStorage();
				borrarHTML();
				showShoppingCart();
			}	
		})
	}

	function borrarHTML(){
		while(table.firstChild){
			table.removeChild(table.firstChild);
		}
		while(totalDiv.firstChild){
			totalDiv.removeChild(totalDiv.firstChild);
		}
	}

	function searchProducts(productos, type, discount, novelties, featured){
		productos.forEach(function(item) {
			if(item.tipo == type && discount == item.descuento && novelties == item.novedades && featured == item.destacado){
				productosShow.push(item);
			} else if (type == "") {
				if(discount == item.descuento && novelties == item.novedades && featured == item.destacado) {
					productosShow.push(item);
				}
			}
		})
		generateCards(productosShow);
	}

	function compra(e){
		let saludo = "Hola%2C+estoy+interesado/a+en+realizar+la+compra+de+los+siguientes+art%C3%ADculos%3A+";
		let total = 0;
		articulosCarrito.forEach(function(item){
			saludo = saludo + "%0D%0A%0D%0A%E2%80%A2%09" + item.cantidad + "x+" + item.titulo + "%3A+" + item.cantidad*item.precio; 
			total = total + (item.cantidad*item.precio);
		});
		saludo = saludo + "%0D%0A%0D%0A" + "+Precio+total+" + total;
		comprarButton.firstChild.setAttribute('href','https://api.whatsapp.com/send/?phone=5491158602826&text='+saludo);
		comprarButton.firstChild.setAttribute('target','_blank');
	}

	if (path[0] == "guitarras" || path[0] == "bajos" || path[0] == "amplificadores" || path[0] == "auriculares") {
		type = defineType(path[0]);
		descuento = false;
		novedades = false;
		destacado = false;
		console.log(type);	
		getJson();

	} else if (path[0] == "shoppingcart") {
		console.log(path[0]);
		showShoppingCart();
		comprarButton.addEventListener('click',compra);
	} else if (path[0] == "novedades") {
		type = "";
		descuento = false;
		novedades = true;
		destacado = false;	
		console.log(type);
		getJson();
	} else if (path[0] == "descuentos") {
		type = "";
		descuento = true;
		novedades = false;
		destacado = false;	
		console.log(type);
		getJson();
	} else if (path[0] == "destacados") {
		type = "";
		descuento = false;
		novedades = false;
		destacado = true;	
		console.log(type);
		getJson();
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
		lblShoppingCart.disabled = true;
		if (localStorage.getItem('articulos') == null){
			vaciarButton.disabled = true;
			comprarButton.disabled =true;
		}
		vaciarButton.addEventListener('click', vaciarCarrito);
	}

	productsList.hide();
	productsList.fadeIn(500);

	setTimeout(() => {
		
	}, 3000);
})


