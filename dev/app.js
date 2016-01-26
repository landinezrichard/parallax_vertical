(function () {
	/* Dependencias*/
	const $ = require('jquery');
	// const showMenu = require('./components/MainMenu');
	const ScrollMagic = require('scrollmagic');

	var capas = [
		{
			"id": "nube",
			"valor1":"-100",
			"valor2":"-500"
		},
		{
			"id": "montaña",
			"valor1":"-200",
			"valor2":"-600"
		},
		{
			"id": "ciudad",
			"valor1":"-300",
			"valor2":"-700"
		},
		{
			"id": "personajes",
			"valor1":"-500",
			"valor2":"-900"
		}
	];

	function getSections(secciones,size){
		for(let i = 0; i < size; i++){
			secciones[i].elemento = document.querySelector(`#${secciones[i].id}`);
		}
	} 

	document.addEventListener('DOMContentLoaded', onDOMload);
	
	function onDOMload() {		
		
		// Init ScrollMagic
		var ctrl = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'//definimos cuando se dispara la animación al hacer scroll
			}
		});

		// Create scene
		$("section").each(function() {

			new ScrollMagic.Scene({
				triggerElement: this
			})
			.setPin(this)
			.addTo(ctrl);
			//this --> se refiere a cada una de las secciones
			/* aquí indicamos que cada vez que una sección llegue al top del viewport, se fije en esa posicion (pin) 
			*/
		});

		//creamos otra escena

		/*
		en esta parte disparamos una animación css, añadiendo una clase al elemento con 'id=four' cuando el body se salga de la ventana un 300%
		*/
		// get window height
		var wh = window.innerHeight;
		 
		new ScrollMagic.Scene({
		  offset: wh*3
		})
		.setClassToggle("section#four", "is-active")
		.addTo(ctrl);
		
	}

}())