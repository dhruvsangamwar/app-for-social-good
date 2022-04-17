//este js gestiona las descargas y transformaciones

//se fija qué checkboxes están activados y en base a eso prepara un zip o no
function AnalyzeDownload(esto)
{
	$('.formats input').removeAttr('checked');
	var goSVG = false;
	var goPNG = false;
	var goPSD = false;
	var goAI = false;
	var goSRC = false;
	var goFONT = false;
	var comprar = false;

	var pretext = $(esto).html();
	$(esto).html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
	$(esto).attr('disabled','disabled');

	var etiqueta = $(esto).attr('for');
	console.log(etiqueta);
	var format_down = $(esto).attr('data-download');
	console.log(format_down);
	var px;
	if(format_down == 'png')
	{
		goPNG = true;
		px = $('#'+etiqueta).val();
		px = px.replace(/px/g,'');
		console.log(px);
	}
	else
	{
		px = "";
	}
	//var px = $('#png_size_menu').children('input:checked').val();

	if(format_down == 'psd')
	{
		goPSD = true;
		//$('#myModal').modal('show'); 
	}

	if(format_down == 'ai')
	{
		goAI = true;
		//$('#myModal').modal('show'); 
	}
	//if(goSVG!=true){
	if(format_down == 'svg')
	{
		goSVG = true;
	}
	
	if(format_down == 'src')
	{
		goSRC = true;
	}

	if(format_down == 'font')
	{
		goFONT = true;
	}
	
if(goPNG == false)
{
	//AJAX
	var usua = $('#ValidaUSer').val();
	var icn = $('#id_icon_ind').val();
	var enl_validar = location.protocol+"//www.iconshock.com/sales/getIcon/"+icn+"/100";

	//$('#id_downloadButton').text('Processing...');
    //$('#id_downloadButton').attr('disabled','true');
    $.ajax ({
        url: enl_validar,
    }).done(function(response) {
    		//$('#id_downloadButton').removeAttr('disabled');
    		//$('#id_downloadButton').text('Get Premium');
           //alert(response);
           $(esto).html(pretext);
		   $(esto).removeAttr('disabled');
           
           console.log(response);
           if (response[0] == false)
           {
           		$('#pack-includes-set').empty();
	        	$('#pack-includes-cat').empty();
	        	$('#pack-includes-ind').empty();
	        	
	        	var setDisplay = response[3].s_set;
	        	var catDisplay = response[3].s_cat;
	        	var indDisplay = response[3].s_ind;

	        	for(s=0;s<=setDisplay.length-1;s++) {
	        		var setName = setDisplay[s].cat_name.toLowerCase()+' - '+setDisplay[s].ind_name.toLowerCase();
	        		$('#pack-includes-set').append('<li><a target="_blank" href="https://www.iconshock.com/'+setDisplay[s].cat_slug+'/'+setDisplay[s].ind_slug+'/">'+setName+'</a></li>');
	        	}
	        	for(s=0;s<=catDisplay.length-1;s++) {
	        		var setName = catDisplay[s].cat_name.toLowerCase()+' - '+catDisplay[s].ind_name.toLowerCase();
	        		$('#pack-includes-cat').append('<li><a target="_blank" href="https://www.iconshock.com/'+catDisplay[s].cat_slug+'/'+catDisplay[s].ind_slug+'/">'+setName+'</a></li>');
	        	}
	        	for(s=0;s<=indDisplay.length-1;s++) {
	        		var setName = indDisplay[s].cat_name.toLowerCase()+' - '+indDisplay[s].ind_name.toLowerCase();
	        		$('#pack-includes-ind').append('<li><a target="_blank" href="https://www.iconshock.com/'+indDisplay[s].cat_slug+'/'+indDisplay[s].ind_slug+'/">'+setName+'</a></li>');
	        	}

           		$('#ValidaCateg').val(response[1]);
				$('#ValidaIndus').val(response[2]);
           		goSVG = false;
           		goPSD = false;
           		goAI = false;
           		goFONT = false;

           		$('#myModal').modal('show');
           }
           else
           {
           		if(goSVG == true)
				{
					PrepareDownloadSVG();
				}
				if(goPSD == true)
				{
					var formato = 'psd';
					var rut= location.protocol+"//www.iconshock.com/v2/do_icon_down.php";
					PrepareDownloadPSD(icn,formato,rut);
				}
				if(goAI == true)
				{
					var formato = 'ai';
					var rut= location.protocol+"//www.iconshock.com/v2/do_icon_down.php";
					PrepareDownloadAI(icn,formato,rut);
				}
				if(goSRC == true)
				{
					var formato = 'src';
					var rut= location.protocol+"//www.iconshock.com/v2/do_icon_down.php";
					PrepareDownloadAI(icn,formato,rut);
				}
				if(goFONT == true)
				{
					var formato = 'font';
					var rut = location.protocol+"//www.iconshock.com/v2/do_icon_down.php";
					PrepareDownloadFONT(icn,formato,rut);
				}
           }
    });
}
	if(goPNG == true)
	{
		var addon = false;
		if( $('#addon_svgcanvas').is(":visible") ){
			addon = true;
		}

		var icn = $('#id_icon_ind').val();

		var gosvg = false;
		var ruta = location.protocol+"//www.iconshock.com/v2/class/consulta_formatos.php";
		var datos = {
			'icono' : icn,
			'valid_us' : true
		}
		$.ajax ({
	        data: datos,
	        url: ruta,
	        type: 'get',
	        beforeSend: function( xhr ) {

	 		}
	    	}).done(function(response) {
				$(esto).html(pretext);
		   		$(esto).removeAttr('disabled');	    			
	    		for(i=0;i<=response.length;i++)
	    		{
	    			if(response[i] == 'svg')
	    			{
	    				gosvg = true;	
	    			}
	    		}
	    		if(gosvg == true)
	    		{
	    			//ToPng(px,px);
	    			PrepareDownloadPNG(px,addon,gosvg);
	    		}
	    		else
	    		{
	    			PrepareDownloadPNG(px,addon,gosvg);
	    		}
	    	});
		
	}
	
}

function PrepareDownloadPSD(icon,formato,route) {
	var rutafinal = location.protocol+'//www.iconshock.com/sales/getIconSrc/'+icon+'/src/'+formato;
	window.location = rutafinal;
}

function PrepareDownloadAI(icon,formato,route) {
	var rutafinal = location.protocol+'//www.iconshock.com/sales/getIconSrc/'+icon+'/src/'+formato;
	window.location = rutafinal;
}

function PrepareDownloadSRC(icon,formato,route) {
	var rutafinal = location.protocol+'//www.iconshock.com/sales/getIconSrc/'+icon+'/src/'+formato;
	window.location = rutafinal;
}

function PrepareDownloadFONT(icon,formato,route) {
	var rutafinal = location.protocol+'//www.iconshock.com/sales/getIconSrc/'+icon+'/src/'+formato;
	window.location = rutafinal;
}

function PrepareDownloadPNG(px,addon,formato,returnData = false)
{
	var result="";
	/*if(formato == true)
	{
		svgCanvas = document.getElementById("id_svgCanvas");

		svgCanvas.setAttribute('width',px);
		svgCanvas.setAttribute('height',px);
		svgCanvas.setAttribute('viewbox',"0 0 "+px+" "+px);

		var currentUrl = window.location;
	    var urlParameters = currentUrl.pathname.replace("/v2/","");
	    var urlParametersDiv = urlParameters.split("/");
	    var urlCategory = urlParametersDiv[0];
	    var urlIndustry = urlParametersDiv[1];

		var verwidth=px;

		var svgText = document.getElementById("id_svgCanvas").outerHTML;

		var result = ToPng(svgText,px,px);
		console.log(result);
		
		svgCanvas.setAttribute('width',64);
		svgCanvas.setAttribute('height',64);
		svgCanvas.setAttribute('viewbox',"0 0 64 64");
	}*/
	var verwidth=px;
	//AJAX
	var usua = $('#ValidaUSer').val();
	var icn = $('#id_icon_ind').val();
	var enl_validar = location.protocol+"//www.iconshock.com/sales/getIcon/"+icn+"/"+verwidth;
	
	//$('#id_downloadButton').text('Processing...');
    //$('#id_downloadButton').attr('disabled','true');
    $.ajax ({
        url: enl_validar,
    }).done(function(response) {
    		//$('#id_downloadButton').removeAttr('disabled');
    		//$('#id_downloadButton').text('Get Premium');
           if (response[0] == true)
           {
           		if(formato == true)
           		{
           			ToPng(px,px);
           		}
           		else
           		{
           			ExecuteDownloadPNG(addon,verwidth,formato,result);
           		}	
           }
           else
           {
           		$('#ValidaCateg').val(response[1]);
				$('#ValidaIndus').val(response[2]);
				$('#myModal').modal('show'); 
           }
    });

		
	$('#image-editor').show();
	if(verwidth<128){
	
	}
}

function ExecuteDownloadPNG(addon,size,formato,url)
{
	var eladdon = $('#id_overlaySvg img').attr('data-addon');
	if(eladdon != undefined)
	{
		var addon_size = $('#id_overlaySvg img').width();
		var y = $('#id_overlaySvg img').css('top');
		var x = $('#id_overlaySvg img').css('left');

		x = x.replace(/px/g,'');
		y = y.replace(/px/g,'');

		var pos = x+'vs'+y+'vs'+addon_size;
	}
	else
	{
		var pos = "no";
	}

	if (formato == true)
	{
		var nameicon = $('.container-editor-icon-name').text();
		nameicon = nameicon.replace(/ /g,'_');
		$('#id_downloadLink').attr('download',nameicon+'.png')
		$('#id_downloadLink').attr('href',url);
		document.getElementById('id_downloadLink').click();
	}
	else
	{
		var icono = $('#id_icon_ind').val();
		window.location = location.protocol+'//www.iconshock.com/sales/downloadIcon/'+icono+'/'+size+'/'+eladdon+'/'+pos;
		//window.location = 'http://www.iconshock.com/v2/do_download_png.php?icono='+icono+'&size='+size+'&addon='+addon+'&addon_name='+eladdon;
	}
}

function ToPng(width, height)
{
	var DOMURL = window.URL || window.webkitURL || window;
	var canvas = document.getElementById("id_resultCanvas");

	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext("2d");
	var data = $('#id_firstSvg').html();
	var icon = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);
    $(icon).attr('src',url);

    icon.onload = function () {
    	ctx.drawImage(icon, 0, 0,width ,height);
      	DOMURL.revokeObjectURL(url);

      	//icon.src = url;

      	var dataURL = canvas.toDataURL("image/png");
    	//dataURL = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    	downloadPNG(dataURL);
    	//window.location = dataURL;

    	//var nameicon = $('.container-editor-icon-name').text();
    	//saveImageAsPng(nameicon, dataURL)

    	//
    	//saveAs(dataURL,nameicon);
    }
}

function saveImageAsPng(name,address) {
    var link = document.createElement('a');
    link.style = 'position: fixed; left -10000px;'; // making it invisible
    link.href = 'data:application/octet-stream,' + encodeURIComponent(address); // forcing content type
    name = name.replace(/ /g,'_');
    link.download = name.indexOf('.png') < 0 ? name + '.png' : name;
    /* file extension is very important! */
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadPNG(url)
{
	var nameicon = $('.container-editor-icon-name').text();
	nameicon = nameicon.replace(/ /g,'_');
	$('#id_downloadLink').attr('download',nameicon+'.png')
	$('#id_downloadLink').attr('href',url);
	document.getElementById('id_downloadLink').click();
}



function PrepareDownloadSVG(returnData = false)
{
	var icono = $('#id_firstSvg').html();
	svgCanvas = $('#id_firstSvg').find('svg');

	/*if($(icono + ' g').hasClass('svgmask'))
	{
		svgCanvas = document.getElementById("svg_con_addon");
	}
	else
	{
		svgCanvas = document.getElementById("id_svgCanvas");
	}*/
	//console.log(svgCanvas);
	//var hola = $(svgCanvas).children('.addon_mask_plhld');
	//var box = hola[0].getAttribute("viewBox");
	//alert(box);

	//console.log(valueSize[0]+' / '+valueSize[1]);
	$('#image-editor').hide();
	svgCanvas[0].setAttribute('width',valueSize[0]);
	svgCanvas[0].setAttribute('height',valueSize[1]);
	svgCanvas[0].setAttribute('viewbox',"0 0 "+valueSize[0]+" "+valueSize[1]);

	/*svgCanvas.setAttribute('width','40px');
	svgCanvas.setAttribute('height','40px');
	svgCanvas.setAttribute('viewbox',"0 0 40 40");
	svgCanvas.setAttribute('x',"0px");
	svgCanvas.setAttribute('x',"0px");*/

	//agrega al canvas, el overlay (si existe) y el whiteOverlay
	overlaySvg = document.getElementById("id_overlaySvg");
	//whiteOverlay = document.getElementById("id_whiteOverlay");

	//if(overlaySvg.style.display == 'block')
	//	return(GiveDownloadSVG(overlayUrl,whiteOverlay.innerHTML,returnData));
	//else
		return(GiveDownloadSVG('','',returnData));
}

function GiveDownloadSVG(overlay,whiteOverlay,returnData = false)
{
	var icono = $('#id_firstSvg').html();
	svgCanvas = $('#id_firstSvg').find('svg');
	/*if($(icono + ' g').hasClass('svgmask'))
	{
		svgCanvas = document.getElementById("svg_con_addon");
	}
	else
	{
		svgCanvas = document.getElementById("id_svgCanvas");
	}*/
	
	//$('#id_overlayForExport').append(whiteOverlay);
	$('#id_overlayForExport').append(overlay);
	
	$('#id_overlayForExport svg').attr('width',64);
	$('#id_overlayForExport svg').attr('height',64);
	$('#id_overlayForExport svg').attr('x',0);
	$('#id_overlayForExport svg').attr('y',0);

	$('#id_overlayForExport svg').addClass('RemoveMe');

	/*if(overlayActivated)
	{
		//cambia el svg por g, porque sino sale mal en illustrator
		var modifiedOverlay = $('#id_overlayForExport svg')[0].outerHTML;

		modifiedOverlay = modifiedOverlay.replace("<svg","<g");
		modifiedOverlay = modifiedOverlay.replace("</svg>","</g>");

		//$('#id_svgCanvas').append(modifiedOverlay);
		Pablo("#id_svgCanvas").append(modifiedOverlay); //hay que usar esto, porque al estar modificando SVG por G... ya deja de ser un SVG totalmente valido
														//entonces en el append los atributos con mayúsculas pasan a minuscula... y deja de funcionar
	}*/
	// crea blob
	var svgData = $("#id_firstSvg svg")[0].outerHTML;
	svgData = svgData.replace(/id="id_svgCanvas"/g,'');
	var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
	var svgUrl = URL.createObjectURL(svgBlob);
	
	$('.RemoveMe').remove();
	
	$('#image-editor').show();
	svgCanvas[0].setAttribute('width',64);
	svgCanvas[0].setAttribute('height',64);
	svgCanvas[0].setAttribute('viewbox',"0 0 64 64");

	svgCanvas[0].removeAttribute("id");
	
	if(returnData)
		return(svgData);
	else
		ExecuteDownloadSVG(svgUrl);
}

function ExecuteDownloadSVG(svgUrl)
{
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;

	var svgname = $('.container-editor-icon-name').text();
	svgname = svgname.replace(/ /g,'_');

	downloadLink.download = svgname+".svg";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

//DESKTOP DOWNLOADS
function VerifyDownloadDesktop(tipo,ruta) {

    var px = tipo;
    px = px.replace(/\D/g,'');

    if (px <= 72)
    {
        //$('#load_svg_desk').load(ruta);

        $.get(ruta, function(svg){
            InsertSVG(svg);

            $('#load_svg_desk').html('');
            $('#load_svg_desk').html(svg);
            $('#load_svg_desk svg').attr('id','id_svgDesk');
             var elsvg = $('#id_svgDesk').html(); 
             
			 $('#image-editor').show();
			 IdentSVG(px,px,elsvg);
        }, 'text');   
    }
    //var elsvg = $('#id_svgDesk').attr('id'); 
}


function IdentSVG(w,h,svg,returnData = false) {
	var svgCanvas = $('#id_resultCanvas');


	//$(svgCanvas).css('width',w+'px');
	//$(svgCanvas).css('height',w+'px');
	//$(svgCanvas).css('viewbox',"0 0 "+valueSize[0]+" "+valueSize[1]);

	//svgCanvas.scale(w+'px',w+'px');
	
	

	//$('#id_resultCanvas').attr('width',64);
	//$('#id_resultCanvas').attr('height',64);
	//$('#id_resultCanvas').attr('viewbox',"0 0 64 64");
	
	//$('#load_svg_desk').css('width',w+'px');
	//$('#load_svg_desk').css('height',h+'px');

	//$('#load_svg_desk svg').css('width','100%');
	//$('#load_svg_desk').attr('viewbox',"0 0 64 64");

    //$('#load_svg_desk svg').attr('id','id_svgDesk');
    var svgText = $('#load_svg_desk').html();
	
    //alert(svgText);
    //var svgText = document.getElementById("id_svgDesk").outerHTML;
    var result = ToPngDesk(svgText,w,h);

    //alert(result);
        if(w<128){
	if(returnData)
		return(result);
	else
		ExecuteDownloadPNG(result);
		}
		else
		{
			$('#myModal').modal('show'); 
		}
}

