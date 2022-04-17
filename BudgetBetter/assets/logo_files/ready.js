//acá iría todo lo que necesita usar document.ready

var colorpickerInstance;

//inicializa el colorpicker, con función de cambio de color
$(document).ready(function() {
    colorpickerInstance = $('#id_colorpickerHolder').ColorPicker({
	flat: true,
	onChange: function (hsv,hex,rgb) {
		changeColor('#'+hex);
	}
});
	
	//le quita cosas al colorpicker
	$('.colorpicker_current_color').hide();
	$('.colorpicker_hsb_s.colorpicker_field').hide();
	$('.colorpicker_hsb_b.colorpicker_field').hide();
	$('.colorpicker_hsb_h.colorpicker_field').hide();
	$('.colorpicker_submit').hide();
	
	
	//agrega el back button
	
	$('#id_colorpickerHolder').append('<button id="id_backbutton" style=" border: 1px solid; width:47px;height:26px; position: absolute; right: 10px; top: 141px; padding:2px 4px;" onclick="HideColorPicker();"> Back </button>');
});

