//LOCAL OR SERVER
var hostName = $(location).attr('hostname');
if(hostName == 'www.iconshock.test'){
	var hostLocation = '//www.iconshock.test/'; 
} else {
	var hostLocation = '//www.iconshock.com/';
}
//LOCAL OR SERVER
var currentUrl = window.location;
var urlParameters = currentUrl.pathname.replace("/v2/","");
var urlSite = '//www.iconshock.com/';

var urlParametersDiv = urlParameters.split("/");
var urlCategory2 = urlParametersDiv[0];
var urlIndustry2 = urlParametersDiv[1];

var categoria = '';
var titular = urlParametersDiv[0];

var page = 1;

$(document).ready(function(e){	
	//alert($('meta[name="description"]').attr('content'));
});

var lineGlyph = new Array('55','59','262','265','266','263','268','257');
var Colorsts = new Array('57','58','266','268','17','27','31','29','16','271');
var SoftwareSt = new Array('32','18','21','22','17','3','2','12','9','15','31','29','1','4','6','16','10','7','5','8','14');
var DetailedSt = new Array('269','270','20','26','32','30','21','28','11','13');

$('#slug_category').val(urlParametersDiv[0]);
$('#slug_industry').val(urlParametersDiv[1]);

function loadIcons(cat,ind,pag,title)
{
	var ident = parseInt(cat);
	var param1 = typeof cat;
	var param2 = typeof ind;
	var route;
	var multi;
	var bycode;
	pag = parseInt(pag);

	$('#loadMore').empty();
    $('#loadMore').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw img_spinner"></i>');

    if(ind == undefined || ind == '' || ind == 'all') {
    	route = ''+location.protocol+hostLocation+cat+'?calljs=1&page='+pag;
    } else {
    	route = ''+location.protocol+hostLocation+cat+'/'+ind+'?calljs=1&page='+pag;
    }
    var datos = {
    	'calljs' : '1',
    	'page' : pag
    }
	$.ajax({
		url: route,
		data : datos,
		type : 'get'
	})
	.done(function(response) {
		if(pag == 1){
			$('#icon').empty();
		}
		$('#loadMore').remove();
		loadMenus(response[2],cat,ind);
		displayIcons(response,pag,title);
	})
	.fail(function() {
		$('#loadMore').remove();
	})
	.always(function() {
		//$('#loadMore').remove();
	});
}



const lazyImageAll=()=>{

    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.getAttribute('data-original');
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.getAttribute('data-original');
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
}

function displayIcons(res,pag,title) {
	
	var nav = res[0];
	var urlType = res[2];
	var iconData = res[3];
	var metaData = res[4];
	var metaName = res[4][1];
	var setInfo = res[4][2];
	var freebie = res[6];
	var breadcrumb = res[8];
	var actualSlug = res[9];

	
	$('title').html(metaData[1]+' - Iconshock');
	var purchased = res[7];
	if(urlType == 'cat' || urlType == 'ind') {
		var icons = res[1].data;
	} else {
		var icons = res[1];
	}

	var more;
	var headed;
	var set_class;
	var encabezado;
	var encabezado_principal;
	var showTitle = false;
	var nextPage = pag + 1;
	var set_ref;
	var formatIcon;
	var srcIcon;
	if(pag == 1) {
		showTitle = true;
	}

	// if(urlType == 'tag') {
	// 	$('.filter-side-bar').show('slow');
	// } else {
	// 	$('.filter-side-bar').hide('slow');
	// }

	var features = '';

	if (showTitle == true) {
		var BreadCrumbDiv = $('<div />',{ id : 'breadcrumbs_iconshock'});
		$('#icon').append(BreadCrumbDiv);
		$(BreadCrumbDiv).append('<a href="https://www.iconshock.com">iconshock</a>');
		var breadfollow = '';
		for(br=0;br<=breadcrumb.length-1;br++) {
			var bread = breadcrumb[br].split('_');
			breadfollow = breadfollow+'/'+bread[1];
			$(BreadCrumbDiv).append(' > <a href="https://www.iconshock.com'+breadfollow+'">'+bread[0]+'</a>');
		}
	}

	for(i=0;i<=icons.length-1;i++) {
		if(icons[i].icon_svg == '1') {
			formatIcon = 'svg';
			srcIcon = 'svg';
		} else {
			formatIcon = 'png';
			srcIcon = 'src';
		}

	  	if(urlType == 'ind') {
	  		headed = icons[i].cat_code;
	  		more = icons[i].ind_slug;
	  		set_class = 'icon-description-sub';
	  		encabezado = '<div class="row sticky-header ajax title-plus-size col-xs-12 col-md-8"><h2 class="col-xs-12 col-md-7 header-plus-title">'+icons[i].cat_name.toLowerCase()+' '+icons[i].ind_name.toLowerCase()+' Icons</h2><div class="col-xs-12 col-md-5"><div class="btn-group" id="btnsizes" role="group" aria-label="..."><i class="fa fa-th btn-default btnsshock btnshock-active" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">72px</span></i><i class="fa fa-th-large btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">128px</span></i><i class="fa fa-square btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">256px</span></i></div></div></div>';
	  		if(showTitle == true) {
	  			encabezado_principal = '<h1>'+icons[i].ind_name.toLowerCase()+' Icons Bundle</h1>';
	  			$('#icon').append(encabezado_principal);
	  			$('#icon').append('<p class="icon-description">'+icons[i].ind_description+'</p>');
	  			$('#icon').append(features);

	  			for(fi=0;fi<=freebie.length-1;fi++) {
					for(fb=0;fb<=freebie[fi].length-1;fb++) {
						if(freebie[fi][fb].ind_code == icons[i].ind_code) {
							var cat_fb_name = freebie[fi][fb].freebie_name.toLowerCase();
							cat_fb_name = cat_fb_name.trim();
							cat_fb_name = cat_fb_name.replace(/ /g,'_');
							$('#icon').append('<div class="freebie_prev" style="background-image:url(\''+location.protocol+'//www.iconshock.com/img/freebies/'+cat_fb_name+'.png\');">\
							<button onclick="getFreebie(this)" id="free_'+freebie[fi][fb].freebie_code+'" class="btn btn-info button_freebie button_shock">download a sneak peek of our iconset</button></div>');
						}
					}
				}

	  			showTitle = false;
	  		}
	  	}
	  	if(urlType == 'cat') {
	  		headed = icons[i].ind_code;
	  		more = icons[i].cat_slug;
	  		set_class = 'icon-description-sub';
	  		encabezado = '<div class="row sticky-header ajax title-plus-size col-xs-12 col-md-8"><h2 class="col-xs-12 col-md-7 header-plus-title">'+icons[i].cat_name.toLowerCase()+' '+icons[i].ind_name.toLowerCase()+' Icons</h2><div class="col-xs-12 col-md-5"><div class="btn-group" id="btnsizes" role="group" aria-label="..."><i class="fa fa-th btn-default btnsshock btnshock-active" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">72px</span></i><i class="fa fa-th-large btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">128px</span></i><i class="fa fa-square btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">256px</span></i></div></div></div>';
	  		if(showTitle == true) {
	  			encabezado_principal = '<h1>'+icons[i].cat_name.toLowerCase()+' Icons Bundle</h1>';
	  			$('#icon').append(encabezado_principal);
	  			$('#icon').append('<p class="icon-description">'+icons[i].cat_description+'</p>');
	  			$('#icon').append(features);

	  			var divGridFreebie = $('<div />');
	  			$('#icon').append(divGridFreebie);

	  			var routeFreeGrid = location.protocol+urlSite+'free-icons-grid-get/cat/'+icons[i].cat_code;
	  			$.ajax({
	  				url : routeFreeGrid,
	  			}).done(function(res){
	  				$(divGridFreebie).append(res);
	  			});
	  			/*for(fi=0;fi<=freebie.length-1;fi++) {
					for(fb=0;fb<=freebie[fi].length-1;fb++) {
						if(freebie[fi][fb].cat_code == icons[i].cat_code) {
							var cat_fb_name = freebie[fi][fb].freebie_name.toLowerCase();
							cat_fb_name = cat_fb_name.trim();
							cat_fb_name = cat_fb_name.replace(/ /g,'_');
							$('#icon').append('<div class="freebie_prev" style="background-image:url(\''+location.protocol+'//www.iconshock.com/img/freebies/'+cat_fb_name+'.png\');">\
							<button onclick="getFreebie(this)" id="free_'+freebie[fi][fb].freebie_code+'" class="btn btn-info button_freebie button_shock">download a sneak peek of our iconset</button></div>');
						}
					}
				}*/
	  			
	  			showTitle = false;
	  		}
	  	}

	  	if(urlType == 'sup') {
	  		headed = icons[i].cat_code;
	  		more = actualSlug;
	  		set_class = 'icon-description-sub';
	  		encabezado = '<div class="row sticky-header" style="min-height: 124px"><div class="row title-plus-size col-xs-12 col-md-12"><h2 class="header-plus-title col-md-7" style="margin-left: 0"><a href="'+location.protocol+urlSite+'/'+icons[i].cat_slug+'">'+icons[i].cat_name.toLowerCase()+'</a> - '+metaData[4]+' Related Icons</h2><div class="col-xs-12 col-md-5"><div class="btn-group" id="btnsizes" role="group" aria-label="..."><i class="fa fa-th btn-default btnsshock btnshock-active" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">72px</span></i><i class="fa fa-th-large btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">128px</span></i><i class="fa fa-square btn-default btnsshock" onclick="changeSizeDesk(this)" style="font-size: 26px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"><span style="display: none;">256px</span></i></div></div></div></div>';
	  	}

	  	if(urlType == 'set') {
	  		set_class = 'icon-description-sub';
	  		if(showTitle == true) {
	  			encabezado_principal = '<h1>'+metaName+'</h1>';
	  			$('#icon').append(encabezado_principal);
	  			$('#icon').append('<div style="padding-top:25px;" class="center-xs title-large">\
	  				<div class="downloads_container">\
                        <button style="inline-display:block;margin:5px auto;font-size:16px; width:300px;" class="btn btn-success button_shock" onclick="valideSet(\''+icons[i].cat_code+'\',\''+icons[i].ind_code+'\',this); window.packVar = \''+icons[i].cat_name+' '+icons[i].ind_name+'\'; window.catName = \''+icons[i].cat_name+'\'; window.catVar = \''+icons[i].cat_code+'\'; window.indVar = \''+icons[i].ind_code+'\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar;">Premium Full pack</button>\
                    	<span>(all source files and all PNG sizes)</span>\
                    </div>\
                    <div class="downloads_container">\
                        <button style="display:inline-block;margin:5px auto;font-size:16px; width:300px;" class="btn btn-primary button_shock" onclick="freeBundle(\''+icons[i].cat_code+'\',\''+icons[i].ind_code+'\',this)">Free Full pack</button>\
                    	<span>(Includes up to 72px PNG. Source files not included)</span>\
                    </div>\
                    </div>');
	  			$('#icon').append('<p class="icon-description">'+setInfo[0].set_description+'</p>');
	  			$('#icon').append(features);
	  			showTitle = false;
	  		}
	  	}
	  	if(urlType == 'tag') {
	  		if(showTitle == true) {
	  			encabezado_principal = '<h1>'+metaName+' Search Result</h1>';
	  			$('#icon').append(encabezado_principal);
	  			$('#icon').append(setInfo);
	  			$('#icon').append(features);
	  			showTitle = false;
	  		}
	  	}

	  	if(urlType == 'ind' || urlType == 'cat' || urlType == 'sup') {

  			if(headed != title) {
  				$('#icon').append('<hr class="hr_grid" />');
  				$('#icon').append(encabezado);

  				for(s=0;s<=setInfo.length-1;s++){
  					if(urlType == 'ind')
  					{
  						if(setInfo[s].cat_code == headed)
	  					{
	  						//$('#icon').append('<p class="icon-description-sub">'+setInfo[s].set_description+'</p>');
	  						$('#icon').append('<div style="padding-top:25px;" class="center-xs sticky-header title-large col-xs-12 col-md-4">\
			                   	<div class="downloads_container">\
			                        <button style="margin:5px auto;font-size:16px; width:300px; background-color: var(--first-branding-color); border-radius: 5px; font-size: 18px !important;" class="btn btn-success button_shock" onclick="valideSet(\''+icons[i].cat_code+'\',\''+icons[i].ind_code+'\',this); window.packVar = \''+icons[i].cat_name+' '+icons[i].ind_name+'\'; window.catName = \''+icons[i].cat_name+'\'; window.catVar = \''+icons[i].cat_code+'\'; window.indVar = \''+icons[i].ind_code+'\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar;"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;Download Full pack</button>\
			                    	<span>(all source files and all PNG sizes)</span>\
			                    </div>\
			                    </div>');
	  					}
  					}
  					if(urlType == 'cat')
  					{
  						if(setInfo[s].ind_code == headed)
	  					{
	  						//$('#icon').append('<p class="icon-description-sub">'+setInfo[s].set_description+'</p>');
	  						$('#icon').append('<div style="padding-top:25px;" class="center-xs sticky-header title-large col-xs-12 col-md-4">\
			                    <div class="downloads_container">\
			                        <button style="margin:5px auto;font-size:16px; width:300px; background-color: var(--first-branding-color); border-radius: 5px; font-size: 18px !important;" class="btn btn-success button_shock" onclick="valideSet(\''+icons[i].cat_code+'\',\''+icons[i].ind_code+'\',this); window.packVar = \''+icons[i].cat_name+' '+icons[i].ind_name+'\'; window.catName = \''+icons[i].cat_name+'\'; window.catVar = \''+icons[i].cat_code+'\'; window.indVar = \''+icons[i].ind_code+'\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar;"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;Download Full Pack</button>\
			                    	<span>(all source files and all PNG sizes)</span>\
			                    </div>\
			                    </div>');
	  					}
  					}
  					if(urlType == 'sup')
  					{
  						if(setInfo[s].cat_code == headed) {
  							
  						}
  					}
  					
  				}
  			}
  			title = headed;
  		}

  		//GRID ICON
  		var grid = $('<div />',{ class : 'svg_grid' });
  		icons[i].ind_name = icons[i].ind_name.replace(/ /g,'_');
		icons[i].cat_name = icons[i].cat_name.replace(/ /g,'');
		var icon_grid_icon = $('<div />', { class : 'icon-grid-icon', id : icons[i].icon_code });
		$(icon_grid_icon).attr('data-codecat',icons[i].cat_code);
		$(icon_grid_icon).attr('data-cat',icons[i].cat_name);
		$(icon_grid_icon).attr('data-codeind',icons[i].ind_code);
		$(icon_grid_icon).attr('data-ind',icons[i].ind_name);


		var source_sec = $('<div />', { class : 'botones_descarga_desk col-xs-6 col-sm-6 col-md-6' });
		if(purchased[i] == false) {
			var lock = '<i class="fa fa-lock lock-svg" aria-hidden="true"></i>';
			var launch = 'openMyModal(); printPacksNumber(catVar, catName);';
		} else {
			var lock = '';
			var launch = '';
		}
		$(icon_grid_icon).append("<div class=icon-grid-icon-img><div class='menu-des-icon'><div class='row flexthis'>\
                <div class='botones_descarga_desk col-xs-6 col-sm-6 col-md-6'>\
                	<div class='menu_png_desk'><button>PNG</button>\
                		<div class='menu_png_drop'>\
                </div></div></div>\
                <div onclick=\"descargaSource(\'"+srcIcon+"\',this); window.packVar = \'"+"Free "+icons[i].cat_name+" "+icons[i].ind_name+"\'; window.catName = \'"+icons[i].cat_name+"\'; window.catVar = \'"+icons[i].cat_code+"\'; window.indVar = \'"+icons[i].ind_code+"\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar; "+launch+"\" class='botones_descarga_desk col-xs-6 col-sm-6 col-md-6'><button style='border-left:0'>"+srcIcon.toUpperCase()+" "+lock+"</button>\
                </div>\
                </div></div>");
		var icon_metaname = icons[i].icon_name.replace(/_/g,' ');
		$(grid).attr("onclick","LoadSVG('route','"+icons[i].icon_code+"','"+icon_metaname+"','"+icons[i].cat_name+"', 'image','"+icons[i].cat_code+"','"+icons[i].ind_name+"','"+icons[i].cat_slug+"','"+icons[i].ind_slug+"',this.innerHTML,'svg','"+icons[i].ind_code+"')");
		$('#icon').append(icon_grid_icon);
		console.log('load img.... in lazy');
		

		if(icons[i].icon_svg == '1') {
			$(icon_grid_icon).append(grid);
			$(grid).append(iconData[1][i]);
		} else {
			var catslug = icons[i].cat_name;
			catslug = catslug.replace(/ /g,'');
			catslug = catslug.toUpperCase();

			var indslug = icons[i].ind_name;
			indslug = indslug.replace(/ /g,'_');
			indslug = indslug.toLowerCase();

			var iconname = icons[i].icon_name;
			iconname = iconname.replace(/ /g,'_');
			iconname = iconname.toLowerCase();

			var urlImagenFinal = location.protocol+urlSite+'/image/'+catslug+'/'+indslug+'/'+iconname;
			//xxxxxxxxxxxxxxxxxxxxx
	        $(icon_grid_icon).append('<img onclick=\"LoadSVG(\'route\',\''+icons[i].icon_code+'\',\''+icon_metaname+'\',\''+icons[i].cat_name+'\',\''+icons[i].icon_image+'\',\''+icons[i].cat_code+'\',\''+icons[i].ind_name+'\',\''+icons[i].cat_slug+'\',\''+icons[i].ind_slug+'\',this.src,\'png\',\''+icons[i].ind_code+'\')\" loading="lazy" class="lazy" src="https://www.iconshock.com/img/loader.gif" data-original=\''+urlImagenFinal+'\'  alt=loading..></div>');                
		}
		$(icon_grid_icon).append('<div class=icon-grid-icon-description style="display: block;"><span>'+icons[i].icon_name.replace(/-/g,' ')+'</span></div>');
		

		//SIZES
		iconD = iconData[0][i].split('%');
		for(d=0;d<=iconD.length-1;d++) {
			if(iconD[d] != ''){
				if(parseInt(iconD[d]) > 72 && purchased[i] == false) {
					var lock = '<i class="fa fa-lock" aria-hidden="true"></i>';
					var launch = 'openMyModal(); printPacksNumber(catVar, catName);';
				} else {
					var lock = '';
					var launch = '';
				}
				$(icon_grid_icon).find('.menu_png_drop').append('<button onclick="descargaDesktop(this,\''+formatIcon+'\'); window.packVar = \''+icons[i].cat_name+' '+icons[i].ind_name+'\'; window.catName = \''+icons[i].cat_name+'\'; window.catVar = \''+icons[i].cat_code+'\'; window.indVar = \''+icons[i].ind_code+'\'; document.getElementById(\'free-download-title\').innerHTML = window.packVar; '+launch+'" id="png_desk_download_'+iconD[d]+'px" class="png_download">'+iconD[d]+'px '+lock+'</button>');
			}
		}
		//SIZES
		if(icons[i].icon_svg == '1') {
			var estiloS = $('#'+icons[i].icon_code+' .svg_grid .stshockcolor').attr('style');
			$('#'+icons[i].icon_code+' .svg_grid .stshockcolor').attr('data-st',estiloS);
		}
  		///GRID ICON
	}

	if(urlType == 'cat' || urlType == 'ind' || urlType == 'sup') {
		$('#icon').append('<div id="loadMore"><button style="position:relative;" id="load_more_button" onclick="loadIcons(\''+more+'\',\'\',\''+nextPage+'\',\''+headed+'\')" style="margin:15px auto;" class="btn btn-primary">Load More</button></div>');
	}
	var widthgrid = $('.btnshock-active').text();
	$('.icon-grid-icon .svg_grid').css('width',widthgrid);
	$('.icon-grid-icon img').css('width',widthgrid);

	var colorpicked = $('#jscolorIcon').val();
	var colorpickedobg = $('#jscolorIcon');
	if(colorpicked != 'FFFFFF' && colorpicked && 'rgb(255,255,255)' && colorpicked != '' && colorpicked != undefined)
	{
		changeColorTable(colorpickedobg);
	}
	lazyImageAll();
}



function loadMenus(res,slug1,slug2)
{
	var selectedFilterCat;
	var selectedFilterInd;
	var selectedFilterInd2;
	var slugCat;
	var slugInd;
	if(res == 'ind')
	{
		selectedFilterCat = 'active';
		slugCat = 'all';
		slugInd = slug1;
	}
	else if(res == 'tag')
	{
		selectedFilterCat = 'active';
		selectedFilterInd = 'active';
		selectedFilterInd2 = 'selected="selected"';
		slugCat = 'all';
	}
	else if(res == 'cat')
	{
		selectedFilterInd = 'active';
		selectedFilterInd2 = 'selected="selected"';
		urlInd = slug1;
		slugCat = slug1;
	}
	else
	{
		slugCat = slug1;
		slugInd = slug2;
	}
	if($('#listCategories').is(':empty'))
	{
		var route = location.protocol+urlSite+'/categories';
		$.ajax({
			url: route
		})
		.done(function(response){
			$('#listCategories').append("<a href='#' changeFilterSide('cat',this); data-cat='all' data-category='all'  class='nav-categories-item "+selectedFilterCat+"' >all</a>");
			for(c=0;c<=response.length-1;c++)
			{
				var nameCategory = response[c].cat_name.toLowerCase();
				selectedFilterCat = '';
				if(slug1 == response[c].cat_slug)
				{
					selectedFilterCat = 'active';
				}
				$('#listCategories').append("<a href='#' changeFilterSide('cat',this); data-cat="+response[c].cat_code+" data-category="+response[c].cat_slug+"  class='nav-categories-item "+selectedFilterCat+"' >"+nameCategory+"</a>");
			}
		});
	}
	if($('#listIndustries').is(':empty') || $('#sideInd').is(':empty'))
	{
		$('#listIndustries').empty();
		$('#sideInd').empty();
		var routein = location.protocol+urlSite+'/industries/'+slugCat;
		$.ajax({
			url: routein
		})
		.done(function(response){

			$('#listIndustries').append("<a id='all_industries' href='#' changeFilterSide('ind',this); data-industry='all' class='nav-categories-item "+selectedFilterInd+"'>All</a>");
			$('#sideInd').append('<option value="all" data-slug="all" '+selectedFilterInd2+'>all</option>');
			var validInd = false;

			if(res != 'tag')
			{
				if(res != 'cat')
				{
					for(e=0;e<=response.length-1;e++)
					{
						if(slugInd == response[e].ind_slug)
						{
							validInd = true;
						}
					}
					if(validInd == false)
					{
						slugInd = response[0].ind_slug;
					}
				}
			}
			for(i=0;i<=response.length-1;i++)
			{
				var nameIndustry = response[i].ind_name.toLowerCase();
				selectedFilterInd = '';
				selectedFilterInd2 = '';
				if(slugInd == response[i].ind_slug)
				{
					selectedFilterInd = 'active';
					selectedFilterInd2 = 'selected="selected"';
				}
				$('#listIndustries').append("<a href='#' onclick=changeFilterSide('ind',this) data-ind="+response[i].ind_code+" data-industry="+response[i].ind_slug+" class='nav-categories-item "+selectedFilterInd+"' >"+response[i].ind_name+"</a>");
				$('#sideInd').append("<option value='"+response[i].ind_code+"' data-slug='"+response[i].ind_slug+"' "+selectedFilterInd2+">"+response[i].ind_name.toLowerCase()+"</option>");
			}
		});
	}
}



//SCROLL PAGINATION
function colocateNavbar() {
	var navHeight = $('#iconshock-main-navbar .navbar-header').css('height');
	navHeight = parseInt(navHeight);
	navHeight = navHeight + 10;
	//console.log(navHeight);

	var sideBar = document.getElementById('icon_sidebar');
	var posicions = sideBar.getBoundingClientRect();
	var navP = $("#style_nav").css('height');
	navP = navP.replace(/px/g,'');
	navP = parseInt(navP) - navHeight;
	if(navP > 0) {
		navP = '-'+navP;
	}
	navP = parseInt(navP);
	//console.log(navP);

	var navOf = $("#style_nav").offset().top;
	//console.log(navP,navOf);
	if($('#style_nav').is(':visible')) {
		  if(navOf < navP)
	  {
	  	$('#icon_sidebar').removeClass('side_fixed');
	  	$('#icon_sidebar').addClass('side_fixed');
	  	
	  	var navHeight = $('#iconshock-main-navbar .navbar-header').css('height');
	  	
	  	navHeight = parseInt(navHeight);
	  	$('#icon_sidebar').css('top','0px');
	  	navHeight = navHeight + 10;
	  	
	  	//$('#icon_container_main').css('height','calc(100vh - '+navHeight+'px)');
	  	$('#icon_container_main').css('height','100vh');
	  }
	  else
	  {
	  	$('#icon_sidebar').removeClass('side_fixed');
	  	$('#icon_sidebar').addClass('side_fixed');
	  	$('#icon_sidebar').removeAttr('style');
	  	$('#icon_container_main').removeAttr('style');
	  	$('#icon_container_main').css('height','100vh');
	  }
	} else {
		$('#icon_sidebar').removeClass('side_abs');
		$('#icon_sidebar').addClass('side_fixed');
		
		var navHeight = $('#iconshock-main-navbar .navbar-header').css('height');
		
		navHeight = parseInt(navHeight);
		$('#icon_sidebar').css('top','0');
		navHeight = navHeight + 10;
		
		$('#icon_container_main').css('height','100vh');
	}      

	var navbarh = $('#icons-data').position().top;
	if(navbarh < -1)
	{
		$('#icons-data .icons-toolbar').addClass('icon-toolbar-fixed');
	}
	else
	{
		$('#icons-data .icons-toolbar').removeClass('icon-toolbar-fixed');
	}
}

$(document).ready(function(e){
	$('#iconshock-main-navbar').click(function(e){
		colocateNavbar();
	});
});

$(document).ready(function(e) {
    $('.container-icons').scroll(function(){    
      if($('#load_more_button').length > 0)
      {
      	var boton = document.getElementById('loadMore');
      	var botonIndex = boton.getBoundingClientRect();

      	var ventana = $(window).height();
      	if(botonIndex.top < ( ventana + 800 ) )
      	{
      		$('#load_more_button').click();
      	}
      }
      colocateNavbar();
      
    });
});

//RELATED ICONS
function getRelatedIcons(idIcon, imageIcon){
	$('#relatedIcons').css('width','100%');
    $('#relatedIcons').html('<i class="fa fa-spinner fa-2x fa-pulse fa-fw"></i>');
    var routeRelatedIcons = location.protocol+urlSite+"/relatedIcons/"+idIcon;
    var relatedIcons = $("#relatedIcons");
    var urlImageReplaceFormat;
    var urlImagenFinalRelated;

    var basic = 52;
    basic = parseInt(basic);
    

    $.ajax({
    	url: routeRelatedIcons,
    })
    .done(function(response){
    	$('#relatedIcons').css('width',basic);
    	$('#relatedIcons').empty();
    	for(r=0;r<=response[0].length-1;r++)
    	{
    		if(response[0][r].icon_svg == '1')
	    	{
	    		response[0][r].cat_name = response[0][r].cat_name.replace(/\ /g,"_");
	            response[0][r].ind_name = response[0][r].ind_name.replace(/\ /g,"_");
	            //urlImagenFinalRelated = "../../../img_vista/"+urlImageReplaceFormat.replace(".png",".svg");
	            relatedIcons.append("<div id=related"+response[0][r].icon_code+" class='showrelated relatedsvg' onclick=loadRelated(this,'svg','"+response[0][r].icon_code+"','"+response[0][r].icon_name+"','"+response[0][r].cat_code+"','"+response[0][r].ind_code+"','"+response[0][r].cat_name+"','"+response[0][r].ind_name+"','"+response[0][r].cat_slug+"','"+response[0][r].ind_slug+"')></div>");
	             response[1][r] = response[1][r].replace(/_grid/g,'_rel');
	             $('#related'+response[0][r].icon_code).html(response[1][r]);
	             $('#relatedIcons').css('width',basic);
	    	}
	    	else
	    	{
	    		//urlImageReplaceFormat = value.icon_image.replace("png","jpg");
	            response[0][r].cat_name = response[0][r].cat_name.replace(/\ /g,"_");
	            response[0][r].ind_name = response[0][r].ind_name.replace(/\ /g,"_");
	            //urlImagenFinalRelated = "http://iconshock.com/img_vista/"+urlImageReplaceFormat.replace(".png","_icon.jpg");
	            relatedIcons.append("<img class=showrelated src=data:image/png;base64,"+response[1][r]+" onclick=loadRelated(this,'png','"+response[0][r].icon_code+"','"+response[0][r].icon_name+"','"+response[0][r].cat_code+"','"+response[0][r].ind_code+"','"+response[0][r].cat_name+"','"+response[0][r].ind_name+"','"+response[0][r].cat_slug+"','"+response[0][r].ind_slug+"'); alt=/>");
	            $('#relatedIcons').css('width',basic);
	            
	    	}
	        basic = basic + 52;
    	}	
    });       	
}



$(document).ready(function(e){
	$('.input-filter').on('change',function(e){
		changeFilterTop(this);	
	});
});

function changeFilterTop(esto) {
	var type = $(esto).attr('data-change');
	var code = $(esto).find('option:selected').val();

	var slugcat = $('#sideCat').find('option:selected').attr('data-slug');
	var slugInd = $('#sideInd').find('option:selected').attr('data-slug');

	if(type == 'cat') {
		$('#listCategories a').each(function(Index, el){
			var cat = $(this).attr('data-cat');
			if(code == cat) {
				$('#listCategories a').removeClass('active');
				$(this).addClass('active');
			}
		});
		$('#listIndustries').empty();
		$('#sideInd').empty();
	}
	if(type == 'ind') {
		$('#listIndustries a').each(function(Index, el){
			var ind = $(this).attr('data-ind');
			if(code == ind) {
				$('#listIndustries a').removeClass('active');
				$(this).addClass('active');
			}
		});
	}
	loadCodeFilter(slugcat,slugInd);
}

function changeFilterSide(type,esto) {
	$(esto).parents('.nav-listing').prepend($(esto));

	if(type=='cat') {
		var cat = $(esto).attr('data-cat');
		$('#sideCat option').each(function(Index, el){
			var catList = $(this).val();
			if(cat == catList) {
				$(this).attr('selected','selected');
			} else {
				$(this).removeAttr('selected');
			}
		});

		var slugcat = $(esto).attr('data-category');
		var padre = $('#listCategories');
		var slugInd = $('#listIndustries .active').attr('data-industry');
		$('#listIndustries').empty();
		$('#sideInd').empty();
	}
	if(type=='ind') {
		var ind = $(esto).attr('data-ind');
		$('#sideInd option').each(function(Index, el){
			var indList = $(this).val();
			if(ind == indList) {
				$(this).attr('selected','selected');
			} else {
				$(this).removeAttr('selected');
			}
		});

		var padre = $('#listIndustries');
		var slugInd = $(esto).attr('data-industry');
		var slugcat = $('#listCategories .active').attr('data-category');
	}

	$(esto).parent(padre).children('.nav-categories-item').removeClass('active');
	$(esto).addClass('active');

	loadCodeFilter(slugcat,slugInd);
}


function loadCodeFilter(slugcat,slugInd)
{
	$('#jscolorIcon').val('FFFFFF');
	$('#jscolorIcon').css('background-color','#fff');

	$('#icon').empty();
	$('#icon').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw img_spinner"></i>');

	/*if(type == 'cat')
	{
		var padre = $('#listCategories');
		//$('#listIndustries').empty();
		var slugcat = $(esto).attr('data-category');
		var slugInd = $('#listIndustries .active').attr('data-industry');
		slugInd = slugInd.toLowerCase();

		$('#listIndustries').empty();
	}
	else
	{
		var padre = $('#listIndustries');
		var slugInd = $(esto).attr('data-industry');
		var slugcat = $('#listCategories .active').attr('data-category');
	}*/

	if(slugcat == 'all')
	{
		slugcat = slugInd;
		slugInd = '';
	}
	if(slugInd == 'all')
	{
		slugInd = '';
	}

	//loadIcons(slugcat,slugInd,1,slugcat);

	//$(esto).parent(padre).children('.nav-categories-item').removeClass('active');
	//$(esto).addClass('active');

	if(slugInd != undefined) { slugInd = slugInd.toLowerCase(); }
	if(slugcat == undefined) { slugcat = 'flat-icons'; }
	if(slugInd == undefined) { slugInd = 'general-icons'; }

	if(slugInd == '')
	{
		var newPath = slugcat;
	}
	else
	{
		var newPath = slugcat+'/'+slugInd;
	}
	
	var newurl = window.location.protocol + "//" + window.location.host +'/'+ newPath;
	window.history.replaceState({path:newurl},'',newurl);

	window.location = newurl;
}

//DESCARGAR DESDE ESCRITORIO PNG
function descargaDesktop(esto,type)
{
    var descarga = false;
    var px = $(esto).text();
    px = px.replace('px','');
    px = parseInt(px);

    var addon = false;

    var icono = $(esto).parents('.icon-grid-icon').attr('id');
    var cat = $(esto).parents('.icon-grid-icon').attr('data-cat');
    var ind = $(esto).parents('.icon-grid-icon').attr('data-ind');
    var cat_code = $(esto).parents('.icon-grid-icon').attr('data-codecat');
    var ind_code = $(esto).parents('.icon-grid-icon').attr('data-codeind');

    var singleSet = $('#singleSet').val();
    var fullCategory = $('#fullCategory').val();
    var fullIndustry = $('#fullIndustry').val();
    var yearIconshock = $('#yearIconshock').val();
    var fullIconshock = $('#fullIconshock').val();

    $('#id_icon_ind').val(icono);
    
    $('#ValidaCateg').val(cat_code);
    $('#ValidaIndus').val(ind_code);

    var ruta = location.protocol+hostLocation+'/sales/getIcon/'+icono+'/'+px;

    $.ajax({
        url : ruta,
    }).done(function(response){
    	if(response[0] == true)
        {
        	if(type == 'svg')
        	{
        		var svgtext = $(esto).parents('.icon-grid-icon').find('.svg_grid').html();
        		var icon_name = $(esto).parents('.icon-grid-icon').find('.icon-grid-icon-description').html();
        		$('.container-editor-icon-name').html(icon_name.replace(/_/g,' '));
	            $('#id_firstSvg').html(svgtext);
	            ToPng(px,px);
        	}
        	else
        	{
        		window.location = location.protocol+urlSite+'/sales/downloadIcon/'+icono+'/'+px;
        	}  
        }
        else
        {
			if(document.querySelector('.downloads_container button')){
				document.querySelector('.downloads_container button').click()
				return
			}
			window.catVar = "<?php echo $icon->cat_code; ?>";
			window.indVar = "<?php echo $icon->ind_code; ?>";
			const pricingModal = ()=>{
			  $("#myModal").modal('show');
			  loadModules();
			}
			pricingModal()
			// document.querySelector('.downloads_container button').click()
        	/*$('#myModal').modal('show'); 
        	$('#pack-includes-set').empty();
        	$('#pack-includes-cat').empty();
        	$('#pack-includes-ind').empty();

        	$('#goto_bundle1').text('Full '+cat+' '+ind);
	        $('#goto_bundle2').text('Full '+cat);
	        //$('#goto_bundle3').text(ind);
	        $('#goto_bundle4').text('Full Iconshock');
        	
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
        	}*/
        }
    });
}

function descargaSource(type,esto)
{
	var descarga = false;

	var icono = $(esto).parents('.icon-grid-icon').attr('id');
    var cat = $(esto).parents('.icon-grid-icon').attr('data-cat');
    var ind = $(esto).parents('.icon-grid-icon').attr('data-ind');
    var cat_code = $(esto).parents('.icon-grid-icon').attr('data-codecat');
    var ind_code = $(esto).parents('.icon-grid-icon').attr('data-codeind');

    var singleSet = $('#singleSet').val();
    var fullCategory = $('#fullCategory').val();
    var fullIndustry = $('#fullIndustry').val();
    var yearIconshock = $('#yearIconshock').val();
    var fullIconshock = $('#fullIconshock').val();

    $('#id_icon_ind').val(icono);
    
    $('#ValidaCateg').val(cat_code);
    $('#ValidaIndus').val(ind_code);

    var ruta = location.protocol+hostLocation+'/sales/validIconSrc/'+icono+'/'+type;

    $.ajax({
        url : ruta,
    }).done(function(response){
    	if(response[0] == true)
        {
        	if(type == 'svg')
        	{
        		var svgtext = $(esto).parents('.icon-grid-icon').find('.svg_grid').html();
        		var icon_name = $(esto).parents('.icon-grid-icon').find('.icon-grid-icon-description').html();
        		$('.container-editor-icon-name').html(icon_name.replace(/_/g,' '));
	            $('#id_firstSvg').html(svgtext);
	            $('#id_firstSvg svg').attr('id','id_svgCanvas');
	            PrepareDownloadSVG();
        	}
        	else
        	{
        		window.location = location.protocol+urlSite+'/sales/getIconSrc/'+icono+'/'+type;
        	}   
        }
        else
        {
        	$('#myModal').modal('show');
        	$('#pack-includes-set').empty();
        	$('#pack-includes-cat').empty();
        	$('#pack-includes-ind').empty();

        	$('#goto_bundle1').text('Full '+cat+' '+ind);
	        $('#goto_bundle2').text('Full '+cat+ ' Category');
	        //$('#goto_bundle3').text(ind);
	        $('#goto_bundle4').text('Full Iconshock');
        	
        	var setDisplay = response[1].s_set;
        	var catDisplay = response[1].s_cat;
        	var indDisplay = response[1].s_ind;

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
        }
    });
}


//loadIcons(urlParametersDiv[0],urlParametersDiv[1],page,urlParametersDiv[0]);

$(document).ready(function(e){
	if(urlParametersDiv[2] == undefined || urlParametersDiv[2] == '')
	{

	}
	else
	{
		if(urlParametersDiv[3] != '')
		{
			var iconsrc = urlParametersDiv[3].replace('-icon','');
			iconsrc = iconsrc.replace(/-/g,'_');
			var ruta = location.protocol+urlSite+'icons/oneIcon/'+urlParametersDiv[1]+'/'+urlParametersDiv[2]+'/'+iconsrc;
			$.ajax({
				url: ruta,
			})
			.done(function(response){
				var cat = response[0][0].cat_name.toUpperCase();
				cat = cat.replace(/ /g,'');

				var ind = response[0][0].ind_name.toLowerCase();
				ind = ind.replace(/ /g,'_');

				var icon_name = response[0][0].icon_name.toLowerCase();
				icon_name = icon_name.replace(/ /g,'-');

				if(response[0][0].icon_svg == '1')
				{
					var ruta = response[2];
					$('#onchargeItem').html(ruta);
					var item = $('#onchargeItem').html();
					LoadSVG('', response[0][0].icon_code, response[0][0].icon_name, response[0][0].cat_name, response[0][0].icon_image, response[0][0].cat_code, response[0][0].ind_name, response[0][0].cat_slug, response[0][0].ind_slug, item, 'svg', response[0][0].ind_code);	
				}
				else
				{
					var ruta = "data:image/png;base64,"+response[2];
					$('#onchargeItem').html(ruta);
					var item = $('#onchargeItem').html();
					LoadSVG('', response[0][0].icon_code, response[0][0].icon_name, response[0][0].cat_name, response[0][0].icon_image, response[0][0].cat_code, response[0][0].ind_name, response[0][0].cat_slug, response[0][0].ind_slug, item, 'png', response[0][0].ind_code);
				}
			});
		}
	}
});


function CatMenuFilter()
{
	$('#listCategories a').hide();

	if($('#menu_line').is(':checked'))
	{
		for(i=0;i<=lineGlyph.length-1;i++)
		{
			$('#listCategories a').each(function(index, el){
				dataCat = $(this).attr('data-cat');
				if(dataCat == lineGlyph[i])
				{
					$(this).removeAttr('style');
				}
			});
		}	
	}
	if($('#menu_color').is(':checked'))
	{
		for(e=0;e<=Colorsts.length-1;e++)
		{
			$('#listCategories a').each(function(index, el){
				dataCat = $(this).attr('data-cat');
				if(dataCat == Colorsts[e])
				{
					$(this).removeAttr('style');
				}
			});
		}	
	}
	if($('#menu_software').is(':checked'))
	{
		for(e=0;e<=SoftwareSt.length-1;e++)
		{
			$('#listCategories a').each(function(index, el){
				dataCat = $(this).attr('data-cat');
				if(dataCat == SoftwareSt[e])
				{
					$(this).removeAttr('style');
				}
			});
		}	
	}
	if($('#menu_detailed').is(':checked'))
	{
		for(e=0;e<=DetailedSt.length-1;e++)
		{
			$('#listCategories a').each(function(index, el){
				dataCat = $(this).attr('data-cat');
				if(dataCat == DetailedSt[e])
				{
					$(this).removeAttr('style');
				}
			});
		}	
	}
	$("#listCategories a:first-child").show();
}

//Cambiar paleta 
$(document).ready(function(e){
	var pallette = $('#palette_change');
	changePalette(pallette);
});

