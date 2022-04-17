//no se usa, por ahora

//archivo con funciones utilitarias

function Util () {}

//devuelve width,height de un SVG en base a una ruta especificada
Util.GetSVGOriginalSize = function(path) 
{
	$.get(path, function(svg){
		console.log( svg );
	}, 'text');
};
