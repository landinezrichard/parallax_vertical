(function () {
	/* Dependencias*/
	const $ = require('jquery');
	// const showMenu = require('./components/MainMenu');
	const ScrollMagic = require('scrollmagic');
	require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
	
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
			.addIndicators()//para ver indicadores de donde se dispara la escena, donde empieza y termina
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
		.addIndicators()
		.addTo(ctrl);
		
	}

}())