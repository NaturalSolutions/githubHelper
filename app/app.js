define(['marionette', 'backbone','lyt-rootview', 'router', 'controller', 'config'],
function(Marionette, Backbone,Lyt_rootview, Router, Controller, config) {


	var app = {}, JST = window.JST = window.JST || {};

	Backbone.Marionette.Renderer.render = function(template, data){
		if (!JST[template]) throw "Template '" + template + "' not found!";
		return JST[template](data);
	};

	app = new Marionette.Application();

	app.on('start', function() {
		app.rootView = new Lyt_rootview();
		app.rootView.render();
		app.controller = new Controller({app : app});
		app.router = new Router({controller: app.controller, app: app});

		Backbone.history.start();
	});

	app.on('applicationException', function(){
		Backbone.history.navigate('context', true);
	})

	$( document ).ajaxStart(function(e) {
		$('#header-loader').removeClass('hidden');
	});
	$( document ).ajaxStop(function() {
		$('#header-loader').addClass('hidden');
	});
	$( document ).ajaxError(function(event, data, dest, status) {

		if(data.status == 403){
			console.log('403 sans infos');			
		}else{
			console.log('Network error : ' + data.statusText);
		}
	});

	window.app = app;
	return app;
});
