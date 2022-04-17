const loadPricingEditor =()=>{
	for( const loadign of document.querySelectorAll('.purchase_now_editor .loader_stencil')){
        loadign.remove()
    }

	if( document.querySelector('.purchase_now_editor site-index') ){
			document.querySelector('site-index').remove();
	}
	document.querySelector('.purchase_now_editor').innerHTML = `<div style="text-align: center; text-align: center; position: absolute; margin: auto; left: 50%;" class="loader_stencil">
		<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="black">
		  <g fill="none" fill-rule="evenodd">
			<g transform="translate(1 1)" stroke-width="2">
			  <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
			  <path d="M36 18c0-9.94-8.06-18-18-18">
				<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform>
			  </path>
			</g>
		  </g>
		</svg>
	  </div>`
	var elementType = document.createElement("site-index");
	elementType.setAttribute('type', 'iconshock');        
	let parentElement = document.querySelector('.purchase_now_editor');
	let theFirstChild = parentElement.firstChild;
	parentElement.insertBefore(elementType, theFirstChild);  
    


}

//LOCAL OR SERVER
var hostName = $(location).attr('hostname');
if (hostName == 'www.iconshock.test') {
	var hostLocation = '//www.iconshock.test/';
} else {
	var hostLocation = '//www.iconshock.com/';
}
//LOCAL OR SERVER

//vector que contiene ancho alto
var valueSize = [32, 32];

//datos del overlay, el primero es el path, el segundo la metadata (<svg> etc...)
//el tercero es el offset... 64 para los complejos, 90 para los simples
var overlayUrl = "";
var overlayMetadata = "";
var overlayOffset = "";
var svgType = ""; //dice si es complejo o simple

var overlayActivated = false; //hay overlay o no?

var addon_y = 24;
var addon_x = 24;

//carga la casita
// LoadSVG('img/simple/Home.svg');
var colorLineP = new Array('#FF61E1', '#FF80ED', '#EF6565', '#F27C7C', '#E57C5C', '#E88C77', '#FFD878', '#FFE4A9', '#75EA9C', '#A4FFBE', '#67DDE0', '#ACF0F2', '#BF9171', '#C9A287', '#AAAAAA', '#BFBFBF', '#4D5152');
var iOsLineP = new Array('#AB2820', '#FF3B30', '#FF7F78', '#AD5A00', '#FF9500', '#FFB64F', '#AB7C2C', '#FFCC00', '#FFE16B', '#3F822E', '#4CD964', '#81E091', '#3F8BAE', '#5AC8FA', '#7DCFF5', '#0055B3', '#007AFF', '#4AA1FF', '#41408A', '#5856D6', '#8887DD', '#992C61', '#FF2D55', '#FF889F');
var FlatP = new Array('#C7441C', '#EA7A2F', '#E0A30A', '#F7C90B', '#BCD676', '#80B34F', '#85DED8', '#93C1CF', '#75A2D8', '#AFCBE1', '#AFCBE1', '#C7DBEB', '#D1D5DD', '#D99A57', '#93684E', '#6E6768', '#47475E', '#9487A3', '#D993AD', '#DEDCD9', '#A6A69F');
var materialP = new Array('#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B');
var simpleLineP = new Array('#B598D1', '#8EA5DE', '#85C3DE', '#85DED8', '#7DD47F', '#C3D686', '#F7C768', '#FFAF6E', '#FF8787', '#FFBDD8', '#D6B196', '#BBC4C9', '#231F20');

$('.icon-picker').on('click', function (event) {
	event.preventDefault();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.colors').show();
});
$(".downloadSvgColor").click(function (e) { 
	donwloadsvg();
});
$('.downloadSvgColor').on('click', function (e) {
	donwloadsvg();
});
function donwloadsvg() {
	let svgs = document.querySelectorAll('.icon-grid-icon svg');
	var zip = new JSZip();
	for( let svg in svgs){
		if(svgs[svg].outerHTML){
			zip.file(`svg${svg}.svg`, svgs[svg].outerHTML);    
		}
	}
	zip.generateAsync({type:"base64"}).then(function (content) {
		location.href="data:application/zip;base64," + content;
	});
}

$('.icon-related').on('click', function (event) {
	event.preventDefault();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.related').show();
});

$('.icon-addon').on('click', function (event) {
	event.preventDefault();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.overlay').show();
});

$('.icon-size').on('click', function (event) {
	event.preventDefault();
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.size').show();
});

function ShowColorPicker() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.colorpicker').show();
}

function HideColorPicker() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	//$('.container-editor-toolbar-container').siblings().hide();
	$('.container-editor-toolbar-container.colors').show();
	$('.container-editor-toolbar-container.colorpicker').hide();
}

function changeColor(color) {
	var edsvg = $('#id_firstSvg svg').html();
	$('#editor_picker').css('background-color', color);
	$('#editor_picker').val(color);
	if (ColorTooBright(color)) {
		$('#editor_picker').css('color', '#000');
	}
	else {
		$('#editor_picker').css('color', '#fff');
	}

	if (edsvg.indexOf('stshockcolor') !== -1) {
		$('#image-editor .stshockcolor').css('fill', color);
		$('#same .stshockcolor').css('fill', color);
	}
	else {
		$("#image-editor svg").css('fill', color);
		$("#image-editor path").css('fill', color);
		$("#image-editor polygon").css('fill', color);
		$("#image-editor ellipse").css('fill', color);
		$("#image-editor rect").css('fill', color);
		$("#image-editor circle").css('fill', color);

		$("#same svg").css('fill', color);
		$("#same path").css('fill', color);
		$("#same polygon").css('fill', color);
		$("#same ellipse").css('fill', color);
		$("#same rect").css('fill', color);
		$("#same circle").css('fill', color);
		//$('.svg').css('fill',color);
	}


	//la manera correcta es ir children por children... con una función tipo loop
	//$('svg').children().children().css('fill', color);
	//$('svg').children().children().children().css('fill', color);
	//$('svg').children().children().children().children().css('fill', color);

	//si eligió fill muy blanco, ajusta el background haciendolo negro
	if (ColorTooBright(color)) {
		$('#id_firstSvg').css('background-color', 'black');
		$('#same_container').css('background-color', '#000');
	}
	else {
		$('#id_firstSvg').css('background-color', 'white');
		$('#same_container').css('background-color', '#fff');
	}
}

function ChangeColorPickerEditor(color) {
	var trueColor = '#' + color;
	changeColor(trueColor);
}



function changePalette(esto) {
	var palette = $(esto).val();

	$('#color_editor_s .container-editor-toolbar-grid').empty();
	//$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="ShowColorPicker();" class="container-editor-toolbar-item color-39">\
	//<img style="padding-bottom:1px;" src="http://www.iconshock.com/v2/editor/img/assets/multicolor.png"/>  \
	//</div> ');

	if (palette == '266') {
		for (c = 0; c <= colorLineP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + colorLineP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + colorLineP[c] + ';"></div>')
		}
	}
	if (palette == '59') {
		for (c = 0; c <= iOsLineP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + iOsLineP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + iOsLineP[c] + ';"></div>')
		}
	}
	if (palette == '59') {
		for (c = 0; c <= iOsLineP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + iOsLineP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + iOsLineP[c] + ';"></div>')
		}
	}
	if (palette == '57') {
		for (c = 0; c <= FlatP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + FlatP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + FlatP[c] + ';"></div>')
		}
	}
	if (palette == '262') {
		for (c = 0; c <= simpleLineP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + simpleLineP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + simpleLineP[c] + ';"></div>')
		}
	}
	if (palette == '58') {
		for (c = 0; c <= materialP.length - 1; c++) {
			$('#color_editor_s .container-editor-toolbar-grid').append('<div onclick="changeColor(\'' + materialP[c] + '\')" class="container-editor-toolbar-item" style="background-color:' + materialP[c] + ';"></div>')
		}
	}
}

//devuelve true si un color es muy claro
function ColorTooBright(hex) {
	answer = false;
	var hex = hex.substring(1);   // strip #
	var rgb = parseInt(hex, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >> 8) & 0xff;  // extract green
	var b = (rgb >> 0) & 0xff;  // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	if (luma > 240)
		answer = true;

	return (answer);

}

// $('#buttonColor').on('click', function(event) {
// 	event.preventDefault();
// 	//alert("hola mundos")
// 	$("#image-editor path").css('fill', 'teal');
// 	//$("#image-editor .shock-color").css('fill', 'teal');
// });

$('#change-size').on('click', function (event) {
	//event.preventDefault();

	//$("#image-editor path").css('fill', 'teal');
	//$("#image-editor .shock-color").css('fill', 'teal');

	//$("#image-editor svg").css('width', '16px');

});

var selectedSize = $("input[name='sizeicon']:checked", "#sizesForm").val();

//toma valores de radios de size
var rad = document.getElementsByName('sizeicon');
var prev = null;
for (var i = 0; i < rad.length; i++) {
	rad[i].onclick = function () {

		if (this !== prev) {
			prev = this;
		}

		valueSize[0] = this.value;
		valueSize[1] = this.value;

		//desactiva el custom
		$('#id_customSize').prop('checked', false);
		$('#id_customTextboxSize').attr('disabled', true);

	};
}
//-----

//toma valor de size radio custom, desactiva los otros
/*$(document).ready(function(e) {

	document.getElementById('id_customSize').onclick = function()
	{
		if(prev)
			prev.checked = false;
		
		$('#id_customTextboxSize').attr('disabled', false);
	};
});*/


function make_base(url) {
	base_image = new Image();
	base_image.src = url;
	base_image.onload = function () {
		context.drawImage(base_image, 0, 0);
	}
}

//valida el size custom
function ValidateCustomSize() {
	var box = $('#id_customTextboxSize');
	var value = box.val();

	var validSyntax = /\(\d+,\d+\)/.test('(' + value + ')');

	//primero revisa si es válido
	//luego que esté dentro del rango
	if (validSyntax) {
		var numbers = value.split(",");

		if (numbers[0] >= 1 && numbers[0] <= 128 && numbers[1] >= 1 && numbers[1] <= 128) {
			box.removeClass('wrong');
			valueSize[0] = numbers[0];
			valueSize[1] = numbers[1];
		}
		else
			box.addClass('wrong');
	}
	else
		box.addClass('wrong');
}

//coloca el overlay
function PutOverlay(path, formato, indus, icon, addon, cat) {
	$('.overlay_preloader').show();
	//$('#id_firstSvg').html('<i class="preloader_editor fa fa-spinner fa-pulse fa-fw"></i>');
	if (formato == 'svg' || formato == 'png') {
		$('#id_overlaySvg').empty();

		var defpath = "";
		if (formato == 'svg') {
			var eladdon = $('#editor_overlay_svg .svgad_' + addon).html();
			$('#id_overlaySvg').append(eladdon);
			$('#id_overlaySvg').attr('type', 'image/svg');

			overlaySvg = document.getElementById("id_overlaySvg");
			overlaySvg.data = defpath;
			overlayUrl = eladdon;
			overlayMetadata = eladdon;
			LoadMask(addon, cat);

			addonParameters('svg');
		}
		else {
			var eladdon = $('#editor_overlay_svg .svgad_' + addon).children('img').attr('src');
			/*path2 = path.replace('/thumbs/','/256/');
			defpath = path2.replace('.png','.png');
			defpath = defpath+'&format=png';*/
			$('#id_overlaySvg').empty();
			$('#id_overlaySvg').attr('type', 'image/png');
			$('#id_overlaySvg').html("<img data-addon='" + addon + "' id='addon_svgcanvas' class='img_responsive addon' src='" + eladdon + "' />");
			addonParameters('png');
		}
		$('.overlay_preloader').hide();


		overlaySvg.style.display = 'block';
		overlayOffset = 32;
		overlayActivated = true;

		//$('.addon_editor').show('slow');
		$('.menu_addon').show('slow');
		$('#a_addon').val('1');
		$('#addon-test').focusout();

		//$('#image-editor').css('margin-left','51px');

		/*$.get(overlayUrl, function(svg){
				overlayMetadata = svg;

				
				//if(svgType = "simple")
				//{
					//$('#id_whiteOverlay').append(svg);
					//$('#id_whiteOverlay svg').attr('stroke','white');
					//$('#id_whiteOverlay svg').attr('stroke-width','15px');
					//$('#id_whiteOverlay svg').attr('fill','red');
					//$('#id_whiteOverlay svg').attr('stroke-opacity','0');
				//}
			}, 'text');*/

	}
	$('#x_addon').val('0');
	$('#y_addon').val('0');
	if (formato == 'svg') {
		$('#size_addon').val('1');
	} else {
		$('#size_addon').val('100');
	}
}

function addonParameters(format) {
	if (format == 'svg') {
		$('#x_range').val(0);
		$('#x_range').attr('min', '-75');
		$('#x_range').attr('max', '75');

		$('#y_range').val(0);
		$('#y_range').attr('min', '-75');
		$('#y_range').attr('max', '75');

		$('#size_range').val(0);
		$('#size_range').attr('min', '0');
		$('#size_range').attr('max', '40');
	}
	else {
		$('#x_range').val(0);
		$('#x_range').attr('min', '-200');
		$('#x_range').attr('max', '200');

		$('#y_range').val(0);
		$('#y_range').attr('min', '-200');
		$('#y_range').attr('max', '200');

		$('#size_range').val(100);
		$('#size_range').attr('min', '80');
		$('#size_range').attr('max', '120');
	}
}

function LoadMask(addon, cat) {
	if ($('#id_overlaySvg svg').hasClass('addmask')) {
		if ($('#id_firstSvg svg g').hasClass('svgmask')) {

		}
		else {
			$('#id_firstSvg svg').addClass('svgmask');
		}

		if ($('#id_overlaySvg svg g').hasClass('icnplhld')) {
			$('path.mask_container').attr('transform', 'translate(0,0)');
			var icono = $('#id_firstSvg').html();
			if ($(icono + ' g').hasClass('svgmask')) {
				//$(icono + ' g.svgmask').empty();

				icono = icono.replace('<svg', '<g');
				icono = icono.replace('</svg>', '</g>');
				//$('#id_firstSvg').empty();
				var addon = $('#id_overlaySvg svg').parent().html();

				var fill = $('#id_svgCanvas path').css('fill');

				addon = addon.replace(/_grid/g, '');
				//console.log(addon);

				$('#id_firstSvg').html(addon);


				$('#id_firstSvg svg').not('svg.addon_content').attr('id', 'svg_con_addon');
				$('#svg_con_addon .icnplhld').html(icono);

				var svgshock = $('#svg_con_addon').html();
				if (svgshock.indexOf('stshockcolor') === -1) {
					$('#svg_con_addon').css('fill', fill);
					$('#svg_con_addon').find('path').css('fill', fill);
					$('#svg_con_addon').find('circle').css('fill', fill);
				}

				$('#id_svgCanvas').removeAttr('id');
				$('#svg_con_addon').attr('id', 'id_svgCanvas');

				$('#id_overlaySvg').hide();
				$('#id_overlaySvg').empty();
				overlayActivated = false;
			}
			else {
				var fill = $('#id_firstSvg svg').css('fill');

				//console.log('#'+cat+'_'+addon+'_addon path');
				$('#id_overlaySvg').hide();
				var icono = $('#id_firstSvg .icnplhld').html();

				icono = icono.trim();
				var largo = icono.length;

				var eladdon = $('#id_overlaySvg svg').parent().html();
				eladdon = eladdon.replace(/_grid/g, '');
				//console.log(eladdon);
				$('#id_firstSvg').html(eladdon);

				$('#id_firstSvg svg').not('svg.addon_content').attr('id', 'svg_con_addon');
				$('#svg_con_addon .icnplhld').html(icono);
				//$('#principalsvg svg').html(icono);
				//var fill = $('#'+cat+'_'+addon+'_icon_placeholder path').css('fill');

				var svgshock = $('#svg_con_addon').html();
				if (svgshock.indexOf('stshockcolor') === -1) {
					$('#svg_con_addon').css('fill', fill);
					$('#svg_con_addon').find('path').css('fill', fill);
					$('#svg_con_addon').find('circle').css('fill', fill);
				}


				$('#id_svgCanvas').removeAttr('id');
				$('#svg_con_addon').attr('id', 'id_svgCanvas');
				$('#id_overlaySvg').hide();
				$('#id_overlaySvg').empty();
				overlayActivated = false;
			}
			$('#id_overlaySvg').hide();
			$('#id_overlaySvg').empty();
			overlayActivated = false;
		}
		else {

		}
	}
	else {
	}
}

function DeleteOverlay() {
	overlaySvg = document.getElementById("id_overlaySvg");

	if (overlaySvg.style.display == 'block') {
		overlayEx = $("#id_ex");
		overlayEx.css({ 'display': 'none' });

		overlaySvg.data = '';
		overlaySvg.style.display = 'none';

		$('#id_whiteOverlay').hide();
		$('#id_whiteOverlay svg').remove();

		overlayActivated = false;
	}
	$('#id_overlaySvg').empty();
	$('.addon_editor').hide('slow');
	$('.menu_addon').hide('slow');

	var plh = $('#id_firstSvg .icnplhld').html();
	if (plh != undefined && plh != '') {
		plh = plh.replace('<g', '<svg');
		plh = plh.substring(0, plh.length - 5);
		plh = plh + '</svg>';

		$('#id_firstSvg').empty();
		$('#id_firstSvg').html(plh);

		$('#id_firstSvg svg').attr('id', 'id_svgCanvas');
	}
	$('#a_addon').val('0');
}

function OverlayShowX() {
	overlaySvg = $("#id_overlaySvg");

	if (overlaySvg.css('display') == 'block') {
		overlayEx = $("#id_ex");
		overlayEx.css({ 'display': 'inline' });
	}
}

function OverlayHideX() {
	overlaySvg = document.getElementById("id_overlaySvg");

	if (overlaySvg.data != '') {
		overlayEx = $("#id_ex");
		overlayEx.css({ 'display': 'none' });
	}
}

//carga un svg asincrónicamente, luego lo inserta
function LoadSVG(path, iconCode, iconName, catName, iconImage, catCode, indname, catslug, indslug, esto, type, indCode) {
	$('.addon_editor').hide('slow');
	$('#image-editor').css('margin-left', '0');
	$('#container-main').attr('actual-icon', iconCode);
	//loadSizes(catCode);

	if (type == 'svg') {
		esto = esto.replace(/_grid/g, '_focus');
		esto = esto.replace(/_same/g, '_focus');
		esto = esto.replace(/_rel/g, '_focus');
		$('#id_firstSvg').html(esto);
		$('#id_firstSvg svg').attr('id', 'id_svgCanvas');
		$('.colors').show();
		$('#palette_change').show();
		$('#editor_picker').show();
		$('#colorResetEditor').show();
		$('#color_editable').hide();

		document.getElementById("id_svgCanvas").setAttribute('preserveAspectRatio', 'none');
	}
	else {
		getEditableIcons(iconName);
		$('#id_firstSvg').html('<img src="' + esto + '" />');
		$('.colors').hide();
		$('#palette_change').hide();
		$('#editor_picker').hide();
		$('#colorResetEditor').hide();
	}
	$('#png_size_menu label').show();
	showEditor(iconCode, iconName, catName, iconImage, indname, catslug, indslug);
	$('#id_icon_ind').val(iconCode);
	DeleteOverlay();


	var gosvg = false;
	var ruta = location.protocol + "//www.iconshock.com/sales/formatsAndSales/" + catCode + "/" + indCode;
	var datos = {
		'icono': iconCode,
		'valid_us': true
	}

	//Consulta los formatos del icono
	$.ajax({
		url: ruta,
	}).done(function (response) {

		for (i = 0; i <= response[0].length; i++) {
			if (response[0][i] == 'svg') {
				gosvg = true;
				//$('#svg_download').show();
			}
		}
		LoadAddons(catCode, gosvg, iconCode, indname, iconName);
	});
	getRelatedData(iconCode);
	getRelatedIcons(iconCode);

	iconName = iconName.replace(/ /g, '-');

	var newPath = catslug + '/' + indslug + '/' + iconName.toLowerCase() + '-icon';
	newPath = newPath.replace(/_/g, '-');
	var newurl = window.location.protocol + "//" + window.location.host + '/' + newPath + '/';
	window.history.replaceState({ path: newurl }, '', newurl);
	ga('send', 'pageview', newPath + '/');


	var singleSet = $('#singleSet').val();
	var fullCategory = $('#fullCategory').val();
	var fullIndustry = $('#fullIndustry').val();
	var yearIconshock = $('#yearIconshock').val();
	var fullIconshock = $('#fullIconshock').val();

	fillSameTitle(catName, indname, catslug, indslug);
	$('#goto_bundle1-editor').text('More from ' + catName);
	$('#goto_bundle1').text(catName + ' ' + indname);
	$('#goto_bundle2').text('Full ' + catName);
	//$('#goto_bundle3').text('Buy full '+indname);
	$('#goto_bundle4').text('Full iconshock');
	addSuggestForm();
}

function getRelatedData(icon) {
	$('#same_loader').show();
	$('#same_container').empty();
	$('#editor_sizes .editor-sizes-grid').empty();
	$('#editor_sizes .editor-sizes-grid').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');
	//$('#relatedIcons').empty();
	//$('#relatedIcons').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');
	$('#tag_container').empty();
	$('#tag_container').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');

	var ruta = location.protocol + '//www.iconshock.com/icons-getRelatedData/' + icon;

	$.ajax({
		url: ruta
	})
		.done(function (response) {
			$('#same_loader').hide();

			for (i = 0; i <= response[4][1].length - 1; i++) {
				//console.log(response[1][1][i]);
				if (response[4][0][i].icon_svg == '1') {
					response[4][1][i] = response[4][1][i].replace(/_grid/g, '_same');
					$('#same_container').append('<div id="st_' + response[4][0][i].icon_code + '" class="same_item">\
        		<div onclick="changeSame(this,\'svg\',\''+ response[4][0][i].icon_code + '\',\'' + response[4][0][i].icon_name + '\',\'' + response[4][0][i].cat_code + '\',\'' + response[4][0][i].ind_code + '\',\'' + response[4][0][i].cat_name + '\',\'' + response[4][0][i].ind_name + '\',\'' + response[4][0][i].cat_slug + '\',\'' + response[4][0][i].ind_slug + '\')" id="same_' + response[4][0][i].icon_code + '" class="same_img_container">' + response[4][1][i] + '\
        		</div>\
        		</div>');
					var estiloS = $('#st_' + response[4][0][i].icon_code + ' .stshockcolor').attr('style');
					$('#st_' + response[4][0][i].icon_code + ' .stshockcolor').attr('data-st', estiloS);
				}
				else {
					$('#same_container').append('<div class="same_item">\
        		<div onclick="changeSame(this,\'png\',\''+ response[4][0][i].icon_code + '\',\'' + response[4][0][i].icon_name + '\',\'' + response[4][0][i].cat_code + '\',\'' + response[4][0][i].ind_code + '\',\'' + response[4][0][i].cat_name + '\',\'' + response[4][0][i].ind_name + '\',\'' + response[4][0][i].cat_slug + '\',\'' + response[4][0][i].ind_slug + '\')" id="same_' + response[4][0][i].icon_code + '" class="same_img_container">\
        			<img class="img-responsive" src="data:image/png;base64,'+ response[4][1][i] + '" />\
        		</div>\
        		</div>');
				}
			}
			changeSameColor();

			relatedIcons = $('#relatedIcons');
			//$('#relatedIcons').empty();
			var basic = 52;
			basic = parseInt(basic);
			for (r = 0; r <= response[0][0].length - 1; r++) {
				if (response[0][0][r].icon_svg == '1') {
					//console.log(response[1][r]);
					response[0][0][r].cat_name = response[0][0][r].cat_name.replace(/\ /g, "_");
					response[0][0][r].ind_name = response[0][0][r].ind_name.replace(/\ /g, "_");
					//urlImagenFinalRelated = "../../../img_vista/"+urlImageReplaceFormat.replace(".png",".svg");
					relatedIcons.append("<div id=related" + response[0][0][r].icon_code + " class='showrelated relatedsvg' onclick=loadRelated(this,'svg','" + response[0][0][r].icon_code + "','" + response[0][0][r].icon_name + "','" + response[0][0][r].cat_code + "','" + response[0][0][r].ind_code + "','" + response[0][0][r].cat_name + "','" + response[0][0][r].ind_name + "','" + response[0][0][r].cat_slug + "','" + response[0][0][r].ind_slug + "')></div>");
					response[0][1][r] = response[0][1][r].replace(/_grid/g, '_rel');
					$('#related' + response[0][0][r].icon_code).html(response[0][1][r]);
					$('#relatedIcons').css('width', basic);
				}
				else {
					//urlImageReplaceFormat = value.icon_image.replace("png","jpg");
					response[0][0][r].cat_name = response[0][0][r].cat_name.replace(/\ /g, "_");
					response[0][0][r].ind_name = response[0][0][r].ind_name.replace(/\ /g, "_");
					//urlImagenFinalRelated = "http://iconshock.com/img_vista/"+urlImageReplaceFormat.replace(".png","_icon.jpg");
					relatedIcons.append("<img class=showrelated src=data:image/png;base64," + response[0][1][r] + " onclick=loadRelated(this,'png','" + response[0][0][r].icon_code + "','" + response[0][0][r].icon_name + "','" + response[0][0][r].cat_code + "','" + response[0][0][r].ind_code + "','" + response[0][0][r].cat_name + "','" + response[0][0][r].ind_name + "','" + response[0][0][r].cat_slug + "','" + response[0][0][r].ind_slug + "'); alt=/>");
					$('#relatedIcons').css('width', basic);

				}
				basic = basic + 52;
			}

			$('#tag_container').empty();
			for (t = 0; t <= response[3].length - 1; t++) {
				
				var tagName = response[3][t].tag_name.replace(/_/g, '-');
				tagName = tagName.trim();
				tagName = tagName.replace(/ /g, '-');
				tagName = tagName + '-icons';
				$('#tag_container').append('<a href="' + location.protocol + '//www.iconshock.com/' + tagName + '">' + response[3][t].tag_name + '</a>');
				
			}

			if (t>10) {

			}
			console.log(t + 'tags')

			loadPricingEditor();


			$('#editor_sizes .editor-sizes-grid').empty();

			var rowSizes = $('<div />', { class: 'row' });
			var sizeCol = $('<div />', { class: 'col-xs-12' });

			$('#editor_sizes .editor-sizes-grid').append(rowSizes);
			$(rowSizes).append(sizeCol);

			for (s = 0; s <= response[1].length - 1; s++) {
				var theSize = parseInt(response[1][s].size);
				var iconLock;
				if (response[5] == false && theSize > 72) {
					iconLock = ' <i class="fa fa-lock" aria-hidden="true"></i>';
				} else {
					iconLock = '';
				}

				$(sizeCol).append('<button data-download="png" for="size-' + response[1][s].size + '" class="size_sub_label download_png_button" onclick="cambiarInput(\'' + response[1][s].size + '\'); AnalyzeDownload(this); window.packVar = \'' + 'Free ' + response[4][0][s].cat_name + ' ' + response[4][0][s].ind_name + '\'; window.catName = \'' + response[4][0][s].cat_name + '\'; window.catVar = \'' + response[4][0][s].cat_code + '\'; window.indVar = \'' + response[4][0][s].ind_code + '\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar;" id="size-' + response[1][s].size + '" value="' + response[1][s].size + '">' + response[1][s].size + 'px' + iconLock + '</button>');
			}

			if (response[3].length == 4) {
				var colS = 'col-xs-4';
			} else {
				var colS = 'col-xs-6';
			}

			for (f = 0; f <= response[2].length - 1; f++) {
				if (response[2][f].formato != 'png' && response[2][f].formato != 'fla') {
					if (response[5] == false) {
						iconLock = ' <i class="fa fa-lock" aria-hidden="true"></i>';
					} else {
						iconLock = '';
					}
					if (response[2][f].formato == 'source') {
						var vaLabel = 'src';
					} else {
						var vaLabel = response[2][f].formato;
					}

					var sizeCol = $('<div />', { class: colS });
					$(rowSizes).append(sizeCol);
					$(sizeCol).append('<button onclick="AnalyzeDownload(this); window.packVar = \'' + 'Free ' + response[4][0][s].cat_name + ' ' + response[4][0][s].ind_name + '\'; window.catName = \'' + response[4][0][s].cat_name + '\'; window.catVar = \'' + response[4][0][s].cat_code + '\'; window.indVar = \'' + response[4][0][s].ind_code + '\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar;" data-download="' + vaLabel + '" class="label_editor premium_label" for="id_check_' + vaLabel.toUpperCase() + '">' + response[2][f].formato.toUpperCase() + iconLock + '</button>');
				}
			}

		});

}

function doimage(iconCode) {

}

function InsertSVG(svg, format, rut, esto) {
	if (svg.indexOf('stshockcolor') !== -1)
		svgType = "complex";
	else
		svgType = "simple";

	$('#id_firstSvg').html('');
	if (format == true) {
		$('#id_firstSvg').html(esto);
		$('#id_firstSvg svg').attr('id', '	');
		$('.colors').show();
		$('#palette_change').show();
		$('#editor_picker').show();
		$('#colorResetEditor').show();

		$('#editor_overlay').show();
	}
	else {
		$('.colors').hide();
		$('#palette_change').hide();
		$('#editor_picker').hide();
		$('#colorResetEditor').hide();

		$('#editor_overlay').show();
		$('#id_firstSvg').html("<img OnError='Error_Cargar();' id='id_svgCanvas' class='img_responsive' src='" + rut + "' />");
	}

	document.getElementById("id_svgCanvas").setAttribute('preserveAspectRatio', 'none');
}

function LoadAddons(cat, format, icn, ind, icname) {
	$('#addon-test').empty();
	//$('#addon-test').append('<img class="center-block img-loader" src='+location.protocol+'//www.iconshock.com/img/loader.gif" />');
	$('.overlay_preloader').hide();
	var indust = ind.toLowerCase();
	indust = indust.replace(/\s/g, "_");
	var icn_name = icname.replace(/\s/g, "_");
	if (format == true) {
		var formato = 'svg';
	}
	else {
		var formato = 'png';
	}

	var datos = {
		'icono': icn,
		'categoria': cat,
		'formato': formato
	}
	var ruta = location.protocol + "//www.iconshock.com/icons/addons/" + cat;

	$.ajax({
		url: ruta,
		beforeSend: function (xhr) {
			$('#editor_overlay .overlay .container-editor-toolbar-grid').css('width', '100px');
			$('#editor_overlay .overlay .container-editor-toolbar-grid').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');
		}
	}).done(function (response) {
		$('#editor_overlay .overlay .container-editor-toolbar-grid').empty();
		$('#addon-test').empty();
		var anchura = 52;
		anchura = parseInt(anchura);
		$('#editor_overlay_svg .container-editor-toolbar-container').empty();

		$('#same_addons').append('<div class="row"></div>');

		for (p = 0; p <= response[1].length - 1; p++) {
			var addon_name = response[2][p];
			$('#editor_overlay .overlay .container-editor-toolbar-grid').css('width', anchura + 'px');
			$('#editor_overlay .overlay_preloader').css('width', $('#editor_overlay .overlay .container-editor-toolbar-grid').css('width'));
			var rr = response[1][p];
			var addon = '<img class="addon_thumb ad_' + addon_name + '" onclick="PutOverlay(\'pp\',\'' + formato + '\',\'' + indust + '\',\'' + icn_name + '\',\'' + addon_name + '\',\'' + cat + '\');" src="data:image/png;base64,' + rr + '" alt="" />';
			$('#editor_overlay .overlay .container-editor-toolbar-grid').append(addon);
			anchura = anchura + 52;


			$('#addon-test').append(addon);
			//$('#same_addons .row').append('<div class="col-xs-4">'+addon+'</div>');
			if (formato == 'svg') {
				var svg = response[0][p];
				$('#editor_overlay_svg .container-editor-toolbar-container').append('<div class="svgad_' + addon_name + '">' + svg + '</div>');

			}
			else {
				var png = response[0][p];
				$('#editor_overlay_svg .container-editor-toolbar-container').append('<div class="svgad_' + addon_name + '"><img src="data:image/png;base64,' + png + '" /></div>');
				//$('#editor_overlay_svg .container-editor-toolbar-container').append('<img src="data:image/png;base64,'+png+'" />');
			}
		}
	});
	//if(format == format);
	//$('#editor_overlay').empty();
}

function Error_Cargar() {
	$('#id_firstSvg').html("<img id='id_svgCanvas' class='img_responsive addon' src='" + location.protocol + "'//www.iconshock.com/img/svg/world.svg' />");
}

//Cambiar Px en el input
function cambiarInput(px) {
	var tampx = px;
	$('#size_png_show').val(tampx);
	$('#id_check_PNG').prop('checked', true);
}

//Setea comportamiento de los checkbox
$('#id_check_PNG,#id_check_SVG').change(function () {
	if ($('#id_check_ALL').prop('checked')) $('#id_check_ALL').prop("checked", false);
});

$('#id_check_ALL').change(function () {
	if ($('#id_check_SVG').prop('checked')) $('#id_check_SVG').prop("checked", false);
	if ($('#id_check_PNG').prop('checked')) $('#id_check_PNG').prop("checked", false);
});

// function hideEditor(){
//    $('#container-main').css("left","100%");
// }

function showEditor(idIcon, nameIcon, nameStyle, imageIcon, indname, catslug, indslug) {
	$('.container-editor-icon-name').text(nameIcon);
	$('#id_overlaySvg').empty();
	$('.container-editor-style-name').html('<span class="icon_link"> \
  	<a class="cat_link" href="'+ location.protocol + '//www.iconshock.com/' + catslug + '">' + nameStyle + ' - </a>\
  	<a class="ind_link" href="'+ location.protocol + '//www.iconshock.com/' + indslug + '">' + indname + '</a>\
  	<a class="set_link" href="'+ location.protocol + '//www.iconshock.com/' + catslug + '/' + indslug + '"><i class="fa fa-link" aria-hidden="true"></i></a>\
  	</span>');
	//getRelatedIcons(idIcon, imageIcon);


	$('#container-main').fadeIn();
	$('body').addClass('noOver');
	$('body').removeClass('no-scroll');

	//Activar Scroll Horizontal
	/*$(".related").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 10);
		event.preventDefault();
	  });
  
	$(".colors").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 10);
		event.preventDefault();
	  });
	$(".overlay").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 10);
		event.preventDefault();
	  });
  
	$('#tag_container').mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 10);
		event.preventDefault();
	  });*/
}

$(".modal-body-editor").click(function (event) {
	event.stopPropagation();
});

$("#container-main").click(function (event) {
	$('#container-main').removeClass('show-modal');
});

function hideEditor() {
	$('#container-main').removeClass('show-modal');
	$('#container-main').fadeOut();
	$('body').removeClass('noOver');
	$('body').removeClass('no-scroll');

	var oldpath = window.location.pathname;
	oldpath = oldpath.split('/');
	var newpath = "";

	newpath = oldpath[0] + oldpath[1] + '/' + oldpath[2] + '/' + oldpath[3];

	var newurl = window.location.protocol + "//" + window.location.host + '/' + newpath + '/';
	window.history.replaceState({ path: newurl }, '', newurl);
	ga('send', 'pageview', newPath + '/');
}


async function loadModules() {
	if( document.querySelector('site-index') ){
		document.querySelector('site-index').remove();
	}
	document.querySelector('#purchase_now').innerHTML = `<div style="text-align: center; text-align: center; position: fixed; margin: auto; top: 50%; left: 50%;" class="loader_stencil">
		<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="black">
		  <g fill="none" fill-rule="evenodd">
			<g transform="translate(1 1)" stroke-width="2">
			  <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
			  <path d="M36 18c0-9.94-8.06-18-18-18">
				<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform>
			  </path>
			</g>
		  </g>
		</svg>
	  </div>`
	var elementType = document.createElement("site-index");
	elementType.setAttribute('type', 'iconshock');        
	let parentElement = document.querySelector('#purchase_now');
	let theFirstChild = parentElement.firstChild;
	parentElement.insertBefore(elementType, theFirstChild);    
}

window.onload = function() {
	if(window.catVar && window.indVar) loadModules();
};






function valideSet(cat, ind, esto) {
	//event.stopPropagation();
	var textoboton = $(esto).text();
	$(esto).text('Processing...');

	var ruta = location.protocol + hostLocation + "validatesale/" + cat + "/" + ind;
	var rutaIcon = location.protocol + hostLocation + "validatesale/" + cat + "/" + ind;

	$.ajax({
		url: ruta,
		beforeSend: function () {
			$('.valid_buy').text('Processing...');
			$('.valid_download').text('Processing...');
			$('.valid_buy').attr('disabled', 'disabled');
			$('.valid_download').attr('disabled', 'disabled');
		}
	}).done(function (res) {
		//document.querySelector('#purchase_now .xnx_pricing').style.display = 'none';
		//document.querySelector('#purchase_now .main_section_content').style.display = 'none';
		$(esto).text(textoboton);
		$('#ValidaCateg').val(cat);
		$('#ValidaIndus').val(ind);
		if (res[0] == false) {
			var singleSet = $('#singleSet').val();
			var fullCategory = $('#fullCategory').val();
			var fullIndustry = $('#fullIndustry').val();
			var yearIconshock = $('#yearIconshock').val();
			var fullIconshock = $('#fullIconshock').val();

			$('#pack-includes-set').empty();
			$('#pack-includes-cat').empty();
			$('#pack-includes-ind').empty();

			var setDisplay = res[5].s_set;
			var catDisplay = res[5].s_cat;
			var indDisplay = res[5].s_ind;

			for (s = 0; s <= setDisplay.length - 1; s++) {
				var setName = setDisplay[s].cat_name.toLowerCase() + ' - ' + setDisplay[s].ind_name.toLowerCase();
				$('#pack-includes-set').append('<li><a target="_blank" href="https://www.iconshock.com/' + setDisplay[s].cat_slug + '/' + setDisplay[s].ind_slug + '/">' + setName + '</a></li>');
			}
			for (s = 0; s <= catDisplay.length - 1; s++) {
				var setName = catDisplay[s].cat_name.toLowerCase() + ' - ' + catDisplay[s].ind_name.toLowerCase();
				$('#pack-includes-cat').append('<li><a target="_blank" href="https://www.iconshock.com/' + catDisplay[s].cat_slug + '/' + catDisplay[s].ind_slug + '/">' + setName + '</a></li>');
			}
			for (s = 0; s <= indDisplay.length - 1; s++) {
				var setName = indDisplay[s].cat_name.toLowerCase() + ' - ' + indDisplay[s].ind_name.toLowerCase();
				$('#pack-includes-ind').append('<li><a target="_blank" href="https://www.iconshock.com/' + indDisplay[s].cat_slug + '/' + indDisplay[s].ind_slug + '/">' + setName + '</a></li>');
			}

			$('#goto_bundle1').text(res[3] + ' ' + res[4]);
			$('#goto_bundle2').text('Full ' + res[3]);
			//$('#goto_bundle3').text('Buy full '+res[4].toUpperCase()+' Industry Icon Set');

			$('#ValidaCateg').val(cat);
			$('#ValidaIndus').val(ind);
			$("#myModal").modal('show');
			loadModules();
		}
		else {
			if (res[1] != '0') {
				window.location = location.protocol + "//www.iconshock.com/downloadsetsale/" + cat + "/" + ind;
			}
			else {
				alert('File not found');
			}
		}
		$('.valid_buy').text('Buy style bundle');
		$('.valid_download').text('Download');
		$('.valid_buy').removeAttr('disabled');
		$('.valid_download').removeAttr('disabled');
	});
}
//OCULTAR EDITOR HACIENDO CLICK FUERA CON CLICK O ESCAPE
$(document).ready(function () {
	var editor = $('#editor_container');
	$('#container-main').click(function (event) {
		if ($("#editor_container").is(":visible")) {
			if (event.target.id == 'container-main') {
				hideEditor();
			}
		}
	});

	$('body').keyup(function (e) {
		if (e.keyCode == 27) {
			hideEditor();
		}
	});
});


//SEPARAR TAGS POR COMA
function anadirTag(esto) {
	var tag = $(esto).val();
	tag = tag.trim();
	tag = tag.toLowerCase();
	tag = tag.replace(/,/g, '');
	//console.log(tag);

	if ($(esto).val().indexOf(',') !== -1) {
		$(esto).val('');
		if (tag != '') {
			$('#tags_suggested').append('<span onclick="deleteTag(this)" class="tag_suggests">' + tag + '</span>');
		}
	}
	var vacio = $('#tags_suggested').is(':empty');
	if (vacio == true && $(esto).val() == '') {
		$('.col_sug').removeClass('col-xs-7');
		$('.col_sug').removeClass('col-xs-7');
		$('.col_sug').addClass('col-xs-9');
		$('.col_sug').addClass('col-xs-9');
		$('.confirm_sug').empty();
		$('.confirm_sug').hide();
	}
	else {
		$('.col_sug').removeClass('col-xs-9');
		$('.col_sug').removeClass('col-xs-9');
		$('.col_sug').addClass('col-xs-7');
		$('.col_sug').addClass('col-xs-7');
		$('.confirm_sug').show();
		$('.confirm_sug').empty();
		$('.confirm_sug').append('<button onclick="SendSuggested(this);" class="btn btn-success btn-sug btn-block">suggest</button>');
	}
}

function SendSuggested(esto) {

	$(esto).attr('disabled', 'disabled');
	$(esto).text('...');
	var vacio = $('#tags_suggested').is(':empty');
	var principal = $('#tagsuggest').val();

	var cadena = '';
	if (principal != '') {
		var cadena = principal;
	}
	$('#tags_suggested span').each(function (index, el) {
		var sugerido = $(this).text();
		cadena = cadena + ',' + sugerido;
	});
	/*var icon = $('.container-editor-icon-name').text();
	icon = icon.trim();
	icon = icon.replace(/ /g,'_');
	icon = icon.toLowerCase();*/
	var icon = $('#container-main').attr('actual-icon');
	var lang = $('#lang_sug').val();

	var ruta = location.protocol + '//www.iconshock.com/sugtag/' + icon + '/' + cadena + '/' + lang;

	$.ajax({
		url: ruta
	}).done(function (response) {
		//console.log(response);
		$('#tags_suggested').empty();
		$('#tag_suggests').empty();
		$('#tag_suggests').html('<h4>Your suggest was sent successfully, Thanks for help to perform our platform :)</h4>');
	});
}

function addSuggestForm() {
	var content = '<div class="tag_mobile row flexthis">\
                  <select class="lang_change" id="lang_sug">\
                    <option value="1">English</option>\
                    <option value="2">Spanish</option>\
                    <option value="3">French</option>\
                    <option value="4">German</option>\
                    <option value="5">Portuguese</option>\
                  </select>\
                <input class="lang_input" type="text" id="tagsuggest" placeholder="tag suggestion" oninput="anadirTag(this)"/>\
                <div class="confirm_sug" style="display: none;"></div>\
              </div>';
	$('#tag_suggests').html(content);
}

function loadFormats(cat, ind) {
	var ruta = location.protocol + "//www.iconshock.com/sales/formatsAndSales2/" + cat + "/" + ind;
	$('#editor_sizes .editor-sizes-grid').empty();
	$('#editor_sizes .editor-sizes-grid').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');

	$.ajax({
		url: ruta,
	}).done(function (response) {

		$('#editor_sizes .editor-sizes-grid').empty();

		var rowSizes = $('<div />', { class: 'row' });
		var sizeCol = $('<div />', { class: 'col-xs-12' });

		$('#editor_sizes .editor-sizes-grid').append(rowSizes);
		$(rowSizes).append(sizeCol);

		for (s = 0; s <= response[1].length - 1; s++) {
			var theSize = parseInt(response[1][s].size);
			var iconLock;
			if (response[2] == false && theSize > 72) {
				iconLock = ' <i class="fa fa-lock" aria-hidden="true"></i>';
			} else {
				iconLock = '';
			}

			$(sizeCol).append('<button data-download="png" for="size-' + response[1][s].size + '" class="size_sub_label download_png_button" onclick="cambiarInput(\'' + response[1][s].size + '\'); AnalyzeDownload(this);" id="size-' + response[1][s].size + '" value="' + response[1][s].size + '">' + response[1][s].size + 'px' + iconLock + '</button>');
		}

		if (response[0].length == 4) {
			var colS = 'col-xs-4';
		} else {
			var colS = 'col-xs-6';
		}

		for (f = 0; f <= response[0].length - 1; f++) {
			if (response[0][f].formato != 'png' && response[0][f].formato != 'fla') {
				if (response[2] == false) {
					iconLock = ' <i class="fa fa-lock" aria-hidden="true"></i>';
				} else {
					iconLock = '';
				}
				if (response[0][f].formato == 'source') {
					var vaLabel = 'src';
				} else {
					var vaLabel = response[0][f].formato;
				}

				var sizeCol = $('<div />', { class: colS });
				$(rowSizes).append(sizeCol);
				$(sizeCol).append('<button onclick="AnalyzeDownload(this);" data-download="' + vaLabel + '" class="label_editor premium_label" for="id_check_' + vaLabel.toUpperCase() + '">' + response[0][f].formato.toUpperCase() + iconLock + '</button>');
			}
		}
	});
}

function loadRelated(esto, type, iconCode, iconName, catCode, indCode, catName, indName, catSlug, indSlug) {
	$('#container-main').attr('actual-icon', iconCode);
	$('.addon_editor').hide('slow');
	$('#image-editor').css('margin-left', '0');
	loadSizes(catCode);

	var gosvg = false;
	var actual = $('#id_firstSvg').html();
	var onclickold = $(actual).attr('onclick');
	if (actual.indexOf('<svg') !== -1) {
		var div1 = '<div onclick="' + onclickold + '" class="relatedsvg">';
		var div2 = "</div>";
	}
	else {

		var div1 = "";
		var div2 = "";
	}
	if (type == 'svg') {
		gosvg = true;
		$('.colors').show();
		$('#palette_change').show();
		$('#editor_picker').show();
		$('#colorResetEditor').show();

		$('.showrelated').show();
		$('#id_firstSvg').html(esto.innerHTML);
		$('#id_firstSvg svg').attr('id', 'id_svgCanvas');
		addonParameters('svg');
		$('#color_editable').hide();
	}
	else {
		getEditableIcons(iconName);
		gosvg = false;
		$('.colors').hide();
		$('#palette_change').hide();
		$('#editor_picker').hide();
		$('#colorResetEditor').hide();

		var actual = $('#id_firstSvg').html();
		$('.showrelated').show();
		$('#id_firstSvg').html('<img onclick="' + onclickold + '" src="' + esto.src + '" />');
		addonParameters('png');
	}

	$(esto).hide();

	$('.container-editor-icon-name').text(iconName);
	$('.cat_link').attr('href', location.protocol + '//www.iconshock.com/' + catSlug);
	$('.ind_link').attr('href', location.protocol + '//www.iconshock.com/' + indSlug);
	$('.set_link').attr('href', location.protocol + '//www.iconshock.com/' + catSlug + '/' + indSlug);

	$('.cat_link').text(catName + ' - ');
	$('.ind_link').text(indName);
	//($'.icon_link').html(catName+' - '+indName+' <i class="fa fa-link" aria-hidden="true"></i>');

	var singleSet = $('#singleSet').val();
	var fullCategory = $('#fullCategory').val();
	var fullIndustry = $('#fullIndustry').val();
	var yearIconshock = $('#yearIconshock').val();
	var fullIconshock = $('#fullIconshock').val();

	$('#goto_bundle1-editor').text(catName);
	$('#goto_bundle1').text(catName + ' ' + indName);
	$('#goto_bundle2').text('Full ' + catName);
	//$('#goto_bundle3').text('Buy full '+indName+' Icon Set $');
	$('#goto_bundle4').text('Full iconshock');

	$('#id_icon_ind').val(iconCode);
	$('#id_overlaySvg').empty();
	$('#id_overlaySvg').hide();
	LoadAddons(catCode, gosvg, iconCode, indName, iconName);
	loadSameSet(catCode, indCode);
	loadFormats(catCode, indCode);

	/*var ruta = location.protocol+"//www.iconshock.com/sales/formatsAndSales/"+catCode+"/"+indCode;
	var datos = {
		'icono' : iconCode,
		'valid_us' : true
	}*/
	//Consulta los formatos del icono
	/*$.ajax ({
	    url: ruta,
		}).done(function(response) {
			if(response[1] == true)
			{
				$('.premium_label i').hide();
			}
			else
			{
				$('.premium_label i').show();
			}

			if(response[0].length == 3)
    		{
    			$('#svg_download').removeClass('col-xs-4');
    			$('#psd_download').removeClass('col-xs-4');
    			$('#ai_download').removeClass('col-xs-4');

    			$('#svg_download').addClass('col-xs-6');
    			$('#psd_download').addClass('col-xs-6');
    			$('#ai_download').addClass('col-xs-6');
    		}
    		else
    		{
    			$('#svg_download').removeClass('col-xs-6');
    			$('#psd_download').removeClass('col-xs-6');
    			$('#ai_download').removeClass('col-xs-6');

    			$('#svg_download').addClass('col-xs-4');
    			$('#psd_download').addClass('col-xs-4');
    			$('#ai_download').addClass('col-xs-4');
    		}

			$('#svg_download').hide();
			$('#png_download').hide();
			$('#psd_download').hide();
			$('#ai_download').hide();
			for(i=0;i<=response[0].length;i++)
			{
				if(response[0][i] == 'svg')
				{
					$('#svg_download').show();
				}
				if(response[0][i] == 'png')
				{
					$('#png_download').show();
					
				}
				if(response[0][i] == 'psd')
				{
					$('#psd_download').show();
					
				}
				if(response[0][i] == 'ai')
				{
					$('#ai_download').show();
				}
				if(response[0][i] == 'source')
				{
					$('#src_download').show();
				}
			}
		});*/


	var newPath = catSlug + '/' + indSlug + '/' + iconName.toLowerCase() + '-icon';
	var newurl = window.location.protocol + "//" + window.location.host + '/' + newPath + '/';
	window.history.replaceState({ path: newurl }, '', newurl);
	ga('send', 'pageview', newPath + '/');

	$('#editor_overlay').show();
	$('#id_overlaySvg').empty();
	DeleteOverlay();
	fillSameTitle(catName, indName, catSlug, indSlug);

	addSuggestForm();
}

function editAddon(esto) {
	var action = $(esto).attr('data-edit');
	var laimg = $('#id_overlaySvg img');

	var imgtype = $('#id_overlaySvg').attr('type');
	if (imgtype == 'image/png') {
		if (action == 'up' || action == 'down' || action == 'left' || action == 'right') {
			var estado = $(laimg).css('top');
			var x = $(laimg).css('left');

			estado = estado.replace(/px/g, '');
			estado = parseInt(estado);

			x = x.replace(/px/g, '');
			x = parseInt(x);

			if (action == 'up') {
				estado = estado - 5;
			}
			if (action == 'down') {
				estado = estado + 5;
			}
			if (action == 'left') {
				x = x - 5;
			}
			if (action == 'right') {
				x = x + 5;
			}

			$(laimg).css('top', estado + 'px');
			$(laimg).css('left', x + 'px');
			$(laimg).css('display', 'block');
		}

		if (action == 'plus' || action == 'minus') {
			var neutral = 200;
			var variacion = 10;
			var wid = $(laimg).css('width');
			wid = wid.trim();
			wid = wid.replace(/px/g, '');
			var percent = calcPorcentaje(wid, neutral);
			if (action == 'plus') {
				if (percent < 120) {
					psuma = sacarPorcentaje(neutral, variacion);
					wid = parseInt(wid) + parseInt(psuma);
					$(laimg).css('width', wid);
				}

			}
			if (action == 'minus') {
				if (percent > 80) {
					psuma = sacarPorcentaje(neutral, variacion);
					wid = parseInt(wid) - parseInt(psuma);
					$(laimg).css('width', wid);
				}
			}
		}
	}
	else {
		if (action == 'up' || action == 'down' || action == 'left' || action == 'right') {
			var posit = $('#id_firstSvg svg.addon_content').attr('data-pos');
			posit = posit.split(" ");
			var x = posit[0];
			var y = posit[1];
			var an = posit[2];
			var al = posit[3];

			if (action == 'left') {
				x = parseInt(x) + 2;
			}
			var svgAdd = $('#id_firstSvg svg.addon_content');
			svgAdd.setAttribute("viewbox", x + ' ' + y + ' ' + an + ' ' + al);
			$('#id_firstSvg svg.addon_content').attr('data-pos', x + ' ' + y + ' ' + an + ' ' + al);
			//$('#id_firstSvg svg.addon_content').attr('view\Box',x+' '+y+' '+an+' '+al);
		}
	}
}

function moveAddon(esto) {
	var action = $(esto).attr('data-edit');
	var valor = $(esto).val();
	var laimg = $('#id_overlaySvg img');

	var imgtype = $('#id_overlaySvg').attr('type');
	if (imgtype == 'image/png') {
		var estado = $(laimg).css('top');
		var x = $(laimg).css('left');

		estado = estado.replace(/px/g, '');
		estado = parseInt(estado);

		x = x.replace(/px/g, '');
		x = parseInt(x);

		if (action == 'hor') {
			$(laimg).css('left', valor + 'px');
		}
		if (action == 'ver') {
			$(laimg).css('top', valor + 'px');
		}
		if (action == 'size') {
			var neutral = 200;
			//var variacion = 10;
			var wid = $(laimg).css('width');
			var percent = calcPorcentaje(neutral, valor);
			$(laimg).css('width', percent + 'px');

			//$(laimg).css('top',valor+'px');
		}
	}
	else {
		var posit = $('#id_firstSvg g.addon_content');
		var transform = $(posit).attr('transform');

		if (transform == undefined) {
			$(posit).attr('transform', 'translate(0,0) scale(1,1)');
			transform = $(posit).attr('transform');
		}
		transform = transform.replace(/translate\(/g, '');
		transform = transform.replace(/scale\(/g, '');
		transform = transform.replace(/ /g, ',');
		transform = transform.replace(/\)/g, '');

		transform = transform.split(',');
		var x = transform[0];
		var y = transform[1];;
		var s = transform[2];

		if (action == 'hor') {
			x = valor;
		}
		if (action == 'ver') {
			y = valor;
		}
		if (action == 'size') {
			if (valor < 10) {
				valor = '0' + valor;
			}
			s = '1.' + valor;
		}
		if (x == undefined) {
			x = 0;
		}
		if (y == undefined) {
			y = 0;
		}
		if (s == undefined) {
			s = 1;
		}

		$(posit).attr('transform', 'translate(' + x + ',' + y + ') scale(' + s + ',' + s + ')');
		$('path.mask_container').attr('transform', 'translate(' + x + ',' + y + ') scale(' + s + ',' + s + ')');
	}
}

function Dinaddon(action) {
	var ad_y = $('#y_addon').val();
	var ad_x = $('#x_addon').val();
	var ad_size = $('#size_addon').val();

	ad_y = parseInt(ad_y);
	ad_x = parseInt(ad_x);
	ad_size = parseFloat(ad_size);

	var laimg = $('#id_overlaySvg img');

	var imgtype = $('#id_overlaySvg').attr('type');
	if (imgtype == 'image/png') {
		if (action == 'up') {
			ad_y = ad_y - 10;
		}
		if (action == 'down') {
			ad_y = ad_y + 10;
		}
		if (action == 'right') {
			ad_x = ad_x + 10;
		}
		if (action == 'left') {
			ad_x = ad_x - 10;
		}
		if (action == 'minus') {
			ad_size = ad_size + 5;
		}
		if (action == 'plus') {
			ad_size = ad_size - 5;
		}

		var estado = $(laimg).css('top');
		var x = $(laimg).css('left');

		estado = estado.replace(/px/g, '');
		estado = parseInt(estado);

		x = x.replace(/px/g, '');
		x = parseInt(x);

		if (action == 'left' || action == 'right') {
			if (ad_x < -200) {
				ad_x = -200;
			}
			if (ad_x > 200) {
				ad_x = 200;
			}
			$('#x_addon').val(ad_x);
			$(laimg).css('left', ad_x + 'px');
		}
		if (action == 'up' || action == 'down') {
			if (ad_y < -200) {
				ad_y = -200;
			}
			if (ad_y > 200) {
				ad_y = 200;
			}
			$('#y_addon').val(ad_y);
			$(laimg).css('top', ad_y + 'px');
		}
		if (action == 'minus' || action == 'plus') {
			if (ad_size < 80) {
				ad_size = 80;
			}
			if (ad_size > 120) {
				ad_size = 120;
			}
			$('#size_addon').val(ad_size);

			var neutral = 200;
			//var variacion = 10;
			var wid = $(laimg).css('width');
			var percent = calcPorcentaje(neutral, ad_size);
			$(laimg).css('width', percent + 'px');

			//$(laimg).css('top',valor+'px');
		}
	}
	else {
		if (action == 'up') {
			ad_y = ad_y - 1;
		}
		if (action == 'down') {
			ad_y = ad_y + 1;
		}
		if (action == 'right') {
			ad_x = ad_x + 1;
		}
		if (action == 'left') {
			ad_x = ad_x - 1;
		}
		if (action == 'minus') {
			ad_size = ad_size - 0.1;
		}
		if (action == 'plus') {
			ad_size = ad_size + 0.1;
		}

		var posit = $('#id_firstSvg g.addon_content');
		var transform = $(posit).attr('transform');

		if (transform == undefined) {
			$(posit).attr('transform', 'translate(0,0) scale(1,1)');
			transform = $(posit).attr('transform');
		}
		transform = transform.replace(/translate\(/g, '');
		transform = transform.replace(/scale\(/g, '');
		transform = transform.replace(/ /g, ',');
		transform = transform.replace(/\)/g, '');

		transform = transform.split(',');
		var x = transform[0];
		var y = transform[1];;
		var s = transform[2];

		if (action == 'left' || action == 'right') {
			x = ad_x;
			$('#x_addon').val(ad_x);
		}
		if (action == 'up' || action == 'down') {
			y = ad_y;
			$('#y_addon').val(ad_y);
		}
		if (action == 'minus' || action == 'plus') {
			if (ad_size < 0.4) {
				ad_size = 0.4;
			}
			if (ad_size > 2) {
				ad_size = 2;
			}
			s = ad_size;
			$('#size_addon').val(ad_size);
		}
		if (x == undefined) {
			x = 0;
		}
		if (y == undefined) {
			y = 0;
		}
		if (s == undefined) {
			s = 1;
		}

		$(posit).attr('transform', 'translate(' + x + ',' + y + ') scale(' + s + ',' + s + ')');
		$('path.mask_container').attr('transform', 'translate(' + x + ',' + y + ') scale(' + s + ',' + s + ')');
	}
}

$(document).ready(function (r) {
	$('body').keyup(function (e) {
		e.preventDefault()
		var action;
		if ($('#a_addon').val() == '1') {
			if (e.keyCode == 38) {
				action = 'up';
				Dinaddon(action);
			}
			if (e.keyCode == 40) {
				action = 'down';
				Dinaddon(action);
			}
			if (e.keyCode == 39) {
				action = 'right';
				Dinaddon(action);
			}
			if (e.keyCode == 37) {
				action = 'left';
				Dinaddon(action);
			}
			if (e.keyCode == 107) {
				action = 'plus';
				Dinaddon(action);
			}
			if (e.keyCode == 109) {
				action = 'minus';
				Dinaddon(action);
			}
			if (e.keyCode == 46) {
				DeleteOverlay();
			}
		}
	});
});


$(document).ready(function (e) {
	$('.modif_addon').click(function (e) {

		var action = $(this).attr('data-editor');
		Dinaddon(action);

	});
});

function calcPorcentaje(size, original) {
	size = parseInt(size);
	original = parseInt(original);

	var result = size / original;
	result = result * 100;
	return result;
}

function sacarPorcentaje(numero, porc) {
	numero = parseInt(numero);
	porc = parseInt(porc);

	var result = numero * porc;
	result = result / 100;
	return result;
}

function loadSameSet(cat, ind) {
	$('#same_loader').show();
	$('#same_container').empty();
	var ruta = location.protocol + '//www.iconshock.com/icons/sameSet/' + cat + '/' + ind;

	$.ajax({
		url: ruta
	})
		.done(function (response) {
			$('#same_loader').hide();
			$('#same_container').empty();

			for (i = 0; i <= response[0].length - 1; i++) {
				if (response[0][i].icon_svg == '1') {
					response[1][i] = response[1][i].replace(/_grid/g, '_same');
					$('#same_container').append('<div id="st_' + response[0][i].icon_code + '" class="same_item">\
        		<div onclick="changeSame(this,\'svg\',\''+ response[0][i].icon_code + '\',\'' + response[0][i].icon_name + '\',\'' + response[0][i].cat_code + '\',\'' + response[0][i].ind_code + '\',\'' + response[0][i].cat_name + '\',\'' + response[0][i].ind_name + '\',\'' + response[0][i].cat_slug + '\',\'' + response[0][i].ind_slug + '\')" id="same_' + response[0][i].icon_code + '" class="same_img_container">' + response[1][i] + '\
        		</div>\
        		</div>');
					var estiloS = $('#st_' + response[0][i].icon_code + ' .stshockcolor').attr('style');
					$('#st_' + response[0][i].icon_code + ' .stshockcolor').attr('data-st', estiloS);
				}
				else {
					$('#same_container').append('<div class="same_item">\
        		<div onclick="changeSame(this,\'png\',\''+ response[0][i].icon_code + '\',\'' + response[0][i].icon_name + '\',\'' + response[0][i].cat_code + '\',\'' + response[0][i].ind_code + '\',\'' + response[0][i].cat_name + '\',\'' + response[0][i].ind_name + '\',\'' + response[0][i].cat_slug + '\',\'' + response[0][i].ind_slug + '\')" id="same_' + response[0][i].icon_code + '" class="same_img_container">\
        			<img class="img-responsive" src="data:image/png;base64,'+ response[1][i] + '" />\
        		</div>\
        		</div>');
				}
			}
			changeSameColor()
		});
}

function changeSameColor() {
	var colorpicked = $('#jscolorIcon').val();
	if (colorpicked != 'FFFFFF' && colorpicked && 'rgb(255,255,255)' && colorpicked != '' && colorpicked != undefined) {
		$('#editor_picker').val(colorpicked);
		$('#editor_picker').css('background-color', colorpicked);

		var item_focus = $('#id_firstSvg').html();
		if (item_focus.indexOf('<svg') !== -1) {
			if (colorpicked.indexOf('rgb') === -1) {
				colorpicked == '#' + colorpicked;
			}
			$('#same_container .same_item svg').each(function (index, el) {
				var svgText = $(this).html();
				if (svgText.indexOf('stshockcolor') !== -1) {
					$('#same .stshockcolor').css('fill', colorpicked);
				}
				else {
					$(this).find('svg').css('fill', colorpicked);
					$(this).find('path').css('fill', colorpicked);
					$(this).find('polygon').css('fill', colorpicked);
					$(this).find('ellipse').css('fill', colorpicked);
					$(this).find('rect').css('fill', colorpicked);
					$(this).find('circle').css('fill', colorpicked);
				}
			});
		}
	}
}

function resetColorEditor() {
	$('#same_container').css('background-color', '#fff');
	$('#same svg').each(function (index, en) {
		var gridContent = $(this).html();

		if (gridContent.indexOf('stshockcolor') === -1) {
			$(this).find("svg").css('fill', '#000');
			$(this).find("path").css('fill', '#000');
			$(this).find("polygon").css('fill', '#000');
			$(this).find("ellipse").css('fill', '#000');
			$(this).find("rect").css('fill', '#000');
			$(this).find("circle").css('fill', '#000');
		}
	});

	$('#id_firstSvg svg').each(function (index, en) {
		var gridContent = $(this).html();
		if (gridContent.indexOf('stshockcolor') === -1) {
			$('#id_firstSvg').find("svg").css('fill', '#000');
			$('#id_firstSvg').find("path").css('fill', '#000');
			$('#id_firstSvg').find("polygon").css('fill', '#000');
			$('#id_firstSvg').find("ellipse").css('fill', '#000');
			$('#id_firstSvg').find("rect").css('fill', '#000');
			$('#id_firstSvg').find("circle").css('fill', '#000');
		}
	});

	$('#same .stshockcolor').each(function (index, el) {
		var colorViejo = $(this).attr('data-st');
		if (colorViejo != undefined) {
			$(this).attr('style', colorViejo);
		}
	});
	$('#id_firstSvg .stshockcolor').each(function (index, el) {
		var colorViejo = $(this).attr('data-st');
		if (colorViejo != undefined) {
			$(this).attr('style', colorViejo);
		}
	});
	$('#editor_picker').val('FFFFFF');
	$('#editor_picker').css('background-color', '#fff');
}

function changeSame(esto, type, iconCode, iconName, catCode, indCode, catName, indName, catSlug, indSlug) {
	$('#container-main').attr('actual-icon', iconCode);
	$('#id_firstSvg').empty();

	$('#id_icon_ind').val(iconCode);
	$('#id_overlaySvg').empty();
	$('#id_overlaySvg').hide();

	DeleteOverlay();

	if (type == 'svg') {
		var contenido = $(esto).html();
		$('#id_firstSvg').html(contenido);
		$('#id_firstSvg svg').attr('id', 'id_svgCanvas');
	}
	else {
		var contenido = $(esto).html();
		$('#id_firstSvg').html(contenido);
	}
	var newPath = catSlug + '/' + indSlug + '/' + iconName.toLowerCase() + '-icon';
	var newurl = window.location.protocol + "//" + window.location.host + '/' + newPath + '/';
	window.history.replaceState({ path: newurl }, '', newurl);
	ga('send', 'pageview', newPath + '/');

	iconName = iconName.replace('_', ' ');

	$('.container-editor-icon-name').html(iconName);
	getRelatedIcons(iconCode);
	getTagEditor(iconName);

	addSuggestForm();
}

function fillSameTitle(cat, ind, catS, indS) {
	cat = cat.replace('_', ' ');
	cat = cat.toLowerCase();
	ind = ind.toLowerCase();
	ind = ind.replace('_', ' ');
	$('#same_title').html('other icons from <a href="' + location.protocol + '//www.iconshock.com/' + catS + '">' + cat + '</a> - <a href="' + location.protocol + '//www.iconshock.com/' + indS + '">' + ind + '</a> icons');
}

function getTagEditor(icon) {
	icon = icon.trim();
	icon = icon.toLowerCase();
	icon = icon.replace(/ /g, '_');
	icon = icon.replace(/-/g, '_');

	//alert(icon);

	$('#tag_container').empty();
	$('#tag_container').append('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');
	var ruta = location.protocol + '//www.iconshock.com/tag/getTagsIcon/' + icon;

	$.ajax({
		url: ruta
	})
		.done(function (response) {
			$('#tag_container').empty();

			for (t = 0; t <= response.length - 1; t++) {
				if (response[t].tag_code != undefined) {
					var tagSlug = response[t].tag_name;
					tagSlug = tagSlug.trim();
					tagSlug = tagSlug.replace(/ /g, '-');
					tagSlug = tagSlug.toUpperCase();
					$('#tag_container').append('<a href="' + location.protocol + '//www.iconshock.com/' + tagSlug + '-icons">' + response[t].tag_name + '</a>');
				}
			}
		});
}

function loadSizes(cat) {
	$('#png_size_menu').empty();
	var ruta = location.protocol + "//www.iconshock.com/size/" + cat;

	$.ajax({
		url: ruta
	}).done(function (response) {
		for (i = 0; i <= response.length - 1; i++) {
			$('#png_size_menu').append('<input type="radio" name="sizeicon" id="size-' + response[i].size + '" value="' + response[i].size + '" >');
			if (response[i].size <= 72) {
				$('#png_size_menu').append('<label data-download="png" for="size-' + response[i].size + '" class="size_sub_label" onclick="cambiarInput(\'' + response[i].size + '\'); AnalyzeDownload(this);">' + response[i].size + 'px</label>');
			}
			else {
				$('#png_size_menu').append('<label data-download="png" for="size-' + response[i].size + '" class="size_sub_label premium_label" onclick="cambiarInput(\'' + response[i].size + '\'); AnalyzeDownload(this);">' + response[i].size + 'px <i class="fa fa-lock" aria-hidden="true"></i></label>');
			}
		}
	});
}

function deleteTag(esto) {
	$(esto).remove();

	var vacio = $('#tags_suggested').is(':empty');
	if (vacio == true && $('#tagsuggest').val() == '') {
		$('.col_sug').removeClass('col-xs-7');
		$('.col_sug').removeClass('col-xs-7');
		$('.col_sug').addClass('col-xs-9');
		$('.col_sug').addClass('col-xs-9');
		$('.confirm_sug').empty();
		$('.confirm_sug').hide();
	}
	else {
		$('.col_sug').removeClass('col-xs-9');
		$('.col_sug').removeClass('col-xs-9');
		$('.col_sug').addClass('col-xs-7');
		$('.col_sug').addClass('col-xs-7');
		$('.confirm_sug').show();
		$('.confirm_sug').empty();
		$('.confirm_sug').append('<button onclick="SendSuggested(this);" class="btn btn-success btn-sug btn-block">suggest</button>');
	}
}

function getEditableIcons(iconName) {
	$('#editor_editable').empty();
	$('#color_editable').show();
	var ruta = location.protocol + '//www.iconshock.com/icons/getEditable/' + iconName;
	$.ajax({
		url: ruta
	}).done(function (response) {
		for (r = 0; r <= response[0].length - 1; r++) {
			$('#editor_editable').append("<div id=editable" + response[0][r].icon_code + " class='showrelated relatedsvg' onclick=loadRelated(this,'svg','" + response[0][r].icon_code + "','" + response[0][r].icon_name + "','" + response[0][r].cat_code + "','" + response[0][r].ind_code + "','" + response[0][r].cat_name + "','" + response[0][r].ind_name + "','" + response[0][r].cat_slug + "','" + response[0][r].ind_slug + "')></div>");
			$('#editable' + response[0][r].icon_code).html(response[1][r]);
		}
	});
}

$(document).ready(function (e) {
	$('.display_styles').click(function (e) {
		if ($('#style_nav').hasClass('closed_nav')) {
			$(this).text('Collapse All Styles');
			$(this).removeClass('hidden_display');
			$(this).addClass('show_display');
			//$(this).find('i').removeClass('fa-plus-circle');
			//$(this).find('i').addClass('fa-minus-circle');
			$('#style_nav').removeClass('closed_nav');
			$('#style_nav').addClass('open_nav');
			colocateNavbar();
			$('.container-icons').scrollTop(0);
			return;
		}
		if ($('#style_nav').hasClass('open_nav')) {

			$(this).text('Display All Styles');
			$(this).removeClass('show_display');
			$(this).addClass('hidden_display');
			//$(this).find('i').addClass('fa-plus-circle');
			//$(this).find('i').removeClass('fa-minus-circle');
			$('#style_nav').addClass('closed_nav');
			$('#style_nav').removeClass('open_nav');
			colocateNavbar();
			return;
		}
	});
});