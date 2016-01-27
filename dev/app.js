(function () {
	/* Dependencias*/
	const $ = require('jquery');
	const showMenu = require('./components/MainMenu');
	const ScrollMagic = require('scrollmagic');
	const gsap = require('gsap');
	require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
	require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
	require('./lib/ScrollToPlugin.min.js');
	
	document.addEventListener('DOMContentLoaded', onDOMload);
	
	function onDOMload() {

		showMenu.init();	
		
		// Init ScrollMagic
		var ctrl = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave',//definimos cuando se dispara la animación al hacer scroll
				reverse: true
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

		ctrl.scrollTo(function(target) {

			TweenMax.to(window, 0.5, {
				scrollTo : {
				y : target, // scroll position of the target along y axis
				autoKill : true // allows user to kill scroll action smoothly
				},
				ease : Cubic.easeInOut
			});

		});


		//  Bind scroll to anchor links
		$('#menu').on("click", "a", function(e) {
			showMenu.close();

			var id = $(this).attr("href");

			if($(id).length > 0) {
				e.preventDefault();

				// trigger scroll
				ctrl.scrollTo(id);

				// If supported by the browser we can also update the URL
				if (window.history && window.history.pushState) {
					history.pushState("", document.title, id);
				}
			}

		});
		
	}

}())