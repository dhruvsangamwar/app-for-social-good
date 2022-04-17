//LOCAL OR SERVER
var hostName = $(location).attr('hostname');
if(hostName == 'www.iconshock.test'){
	var hostLocation = '//www.iconshock.test/'; 
} else {
	var hostLocation = '//www.iconshock.com/';
}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

/*$(document).ready(function(e){
	var _gscq = _gscq || [];
	_gscq.push(['language', navigator.language]);
	(function() {
	var gscw = document.createElement('script');
	gscw.type = 'text/javascript'; gscw.async = true;
	gscw.src = '//widgets.getsitecontrol.com/10572/script.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gscw, s);
	})();
	
});*/

var URLactual = jQuery(location).attr('href');
pos = URLactual.indexOf("premium");
$(document).ready(function(e){
	if(pos<0){
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
		var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
		s1.async=true;
		s1.src='https://embed.tawk.to/5b3b94a94af8e57442dc4d12/default';
		s1.charset='UTF-8';
		s1.setAttribute('crossorigin','*');
		s0.parentNode.insertBefore(s1,s0);
		})();
	}else{
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
		var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
		s1.async=true;
		s1.src='https://embed.tawk.to/596e1ee11dc79b329518ef6c/default';
		s1.charset='UTF-8';
		s1.setAttribute('crossorigin','*');
		s0.parentNode.insertBefore(s1,s0);
		})();
	}
});

function showDescription(esto,dibDisplay) {
	if(dibDisplay != undefined) {
		var iconHeader = $('.'+dibDisplay);
		var iconDes = iconHeader;
		if($(iconDes).is(':visible')) {	
			$(esto).html('Desc <i class="fa fa-angle-down"></i>');
			$(iconDes).hide();
			return;
		} else {
			$(esto).html('Hide <i class="fa fa-angle-up"></i>');
			$(iconDes).show();
			return;
		}
	} else {
		var iconHeader = $(esto).parents('.main-header-ic');
		var iconDes = $(iconHeader).find('.icon-description');
		if($(iconDes).is(':visible')) {	
			$(esto).html('Desc <i class="fa fa-angle-down"></i>');
			$(iconDes).hide();
			return;
		} else {
			$(esto).html('Hide <i class="fa fa-angle-up"></i>');
			$(iconDes).show();
			return;
		}
	}
	
	
}

function initValidarOldUser()
{
	$('#modal_old_users').modal({
		show: 'false'
	}); 
	
	/*$('#valid_old_user').show();
	$('#old_users_body').empty();
	$('#old_users_body').html('<p>If you are an old user, please valid your login and password and follow our instructions</p>\
        <span class="form-group">\
          <label class="label_login">Login</label>\
          <input type="text" class="form-control" id="old_us_login" name="old_us_login">\
        </span>\
        <span class="form-group">\
          <label class="label_login">Password</label>\
          <input type="password" class="form-control" id="old_us_pass" name="old_us_pass">\
        </span>');*/
	$('#old_us_pass').css('background','#fff');
	$('#old_us_login').css('background','#fff');
}

function validarOldUser()
{
	var login = $('#old_us_login').val();
	var pass = $('#old_us_pass').val();
	pass = btoa(encodeURIComponent(pass));

	$('#loading_old_user').show();
	$('#valid_old_user').attr('disabled','disabled');
	$('#valid_old_user').text('Processing...');

	var ruta = location.protocol+hostLocation+'logInOldUser/'+login+'/'+pass;

	$.ajax({
		url: ruta
	})
	.done(function(response) {
		$('#loading_old_user').hide();
		$('#valid_old_user').removeAttr('disabled');
		$('#valid_old_user').text('Login');
		if(response == true)
		{
			location.reload();
			$('#valid_old_user').text('Logged');
			$('#valid_old_user').attr('disabled','disabled');
			//$('#old_users_body').empty();
			//$('#old_users_body').html('<h3>Name: <b style="color:#71a8c3">'+response[4]+' '+response[2]+'</b></h3>\
			//<h3>email: <b style="color:#71a8c3">'+response[3]+'</b></h3>\
			//<h3>User Name: <b style="color:#71a8c3">'+response[1]+'</b></h3>');

			//$('#old_users_body').append('<br /><p>Hello '+response[2]+', we are upgrading our system, please associate your account to a social network to continue: </p>');
			//$('#old_users_body').append('<div style="padding:15px 0"><div class="row"><div class="col-xs-6"><button onclick="new_social_mail(\''+response[2]+'\',\'facebook\',\''+response[3]+'\',\''+response[5]+'\');" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i></button></div><div class="col-xs-6"><button onclick="new_social_mail(\''+response[2]+'\',\'google\',\''+response[3]+'\',\''+response[5]+'\');" class="btn btn-danger btn-block"><i class="fa fa-google-plus"></i></button></div></div></div>');
		}
		else
		{
			$('#old_us_pass').css('background','#fce0e7');
			$('#old_us_login').css('background','#fce0e7');
			$('.message_old_error').remove();
			$('#old_users_body').append('<p class="message_old_error" style="color:#c9224c"><b>Login and Password doesn\'t match</b></p>');
		}
	})
	.fail(function() {
		alert("error");
	})
}

$(document).ready(function(e){
	$('.other-select').on('change', function(e){
		var gotoUrl = $(this).find('option:selected').attr('data-goto');
		window.location = gotoUrl;
	});

	$('.search_sidebar').click(function(e) {
		var valueSearch = $(this).parents('.side_content').find('.input-search').val();
		valueSearch = valueSearch.replace(/[^a-zA-Z 0-9]+/g ,'');
		window.location = 'http://www.iconshock.com/'+valueSearch+'-icons-search/';
	});

	$('body').keyup(function(e){
		if($('#input-side-search').is(':focus')) {
			if(e.keyCode == 13){

				var valueSearch = $('#input-side-search').val();
				valueSearch = valueSearch.replace(/[^a-zA-Z 0-9]+/g ,'');
				window.location ='http://www.iconshock.com/'+valueSearch+'-icons-search/';
			}
		}
		

				

	});

	$('#inputSearchForm').on('submit',function(event){
		event.preventDefault();
		var valueSearch = $('#input-side-search').val();
		valueSearch = valueSearch.replace(/[^a-zA-Z 0-9]+/g ,'');
		window.location ='http://www.iconshock.com/'+valueSearch+'-icons-search/';
	});

	$('#icon_sidebar').click(function(event){
		if(event.target.id != 'close_sidebar') {
			if($(this).hasClass('res_hidden')){
				$('#icon_sidebar').addClass('res_show');
				$('#icon_sidebar').removeClass('res_hidden');
			}
		} else {
			$('#icon_sidebar').removeClass('res_show');
			$('#icon_sidebar').addClass('res_hidden');
		}
	});

	$('.sidebar_toggle').click(function(e) {
		if($('#icon_sidebar').hasClass('res_hidden')){
			$('#icon_sidebar').addClass('res_show');
			$('#icon_sidebar').removeClass('res_hidden');
			$('.sidebar_toggle i').removeClass('fa-bars');
			$('.sidebar_toggle i').addClass('fa-times');
			return;
		} else {
			$('#icon_sidebar').removeClass('res_show');
			$('#icon_sidebar').addClass('res_hidden');
			$('.sidebar_toggle i').removeClass('fa-times');
			$('.sidebar_toggle i').addClass('fa-bars');
			return;
		}
	});

	$('.toggle_sidebar').click(function(e) {

		if($('#icon_sidebar').hasClass('res_hidden')){
			$('#icon_sidebar').addClass('res_show');
			$('#icon_sidebar').removeClass('res_hidden');
			return;
		} else {
			$('#icon_sidebar').removeClass('res_show');
			$('#icon_sidebar').addClass('res_hidden');
			return;
		}
	});
});




/*function new_social_mail(name,social,email,code)
{	
	var color;
	var boton;
	if(social == 'facebook')
	{
		color = '#286090';
		boton = 'btn-primary';
	}
	if(social == 'google')
	{
		color = '#D9534F';
		boton = 'btn-danger';
	}

	$('#old_users_body').empty();
	$('#old_users_body').append('<h3 style="text-align:center; margin:10px auto;color:'+color+'">'+social+' login</h3>');
	$('#old_users_body').append('<p style="padding:15px 0">'+name+', please, write the email that you use to login into the social network that you choose, all your previous purshases will be assingned to this new email (the email can be the same that your old one)</p>');
	$('#old_users_body').append('<div class="form-group" style="padding:15px 0"><input id="old_user_change_social_email" type="text" class="form-control" placeholder="email" /></div>');
	$('#old_users_body').append('<button id="old_user_change" onclick="changeOldUserMail(\''+code+'\',\''+social+'\')" class="btn '+boton+'">Associate Social Account</button>');
}

function changeOldUserMail(code,social)
{
	if(social == 'facebook')
	{
		boton = '<button onclick="addParameterToPath(\'2\',\'facebook\');" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i></button>';
	}
	if(social == 'google')
	{
		boton = '<button onclick="addParameterToPath(\'2\',\'google\');" class="btn btn-danger btn-block"><i class="fa fa-google-plus"></i></button>';
	}

	var correo = $('#old_user_change_social_email').val();
	var ruta = 'http://www.iconshock.com/v2/class/associate_new_social_mail.php';
	var datos = {
		'correo' : correo,
		'code' : code
	}

	$.ajax({
		url: ruta,
		type: 'post',
		data: datos,
		beforeSend: function(xs){
			$('#old_user_change').attr('disabled','disabled');
			$('#old_user_change').text('Processing');
		}
	})
	.done(function(response) {
		$('#old_user_change').removeAttr('disabled');
		$('#old_user_change').text('Associate Social Account');
		$('#old_users_body').empty();
		$('#old_users_body').html('<p>Your Account Email was changed from <b>'+response[1]+'</b> to <b>'+response[0]+',</b> please, sing clicking the corresponding Networdk that you choose</p>');
		$('#old_users_body').append('<div style="padding:15px 0"><div class="row"><div class="col-xs-6 col-xs-push-3">'+boton+'</div></div></div>');
	})
	.fail(function() {
		alert("error");
	})
}*/

function Comparator(a, b) {
   if (a[1] < b[1]) return -1;
   if (a[1] > b[1]) return 1;
   return 0;
 }

$(document).ready(function(e){
	$('body').click(function(event){
		if($("#search_autocomplete").is(":visible"))
		{
			if(event.target.id != 'search_autocomplete')
			{
				$("#search_autocomplete").hide();
			}
		}
	});

	$('body').keyup(function(e){
	    if(e.keyCode == 27){
	    	if($("#search_autocomplete").is(":visible"))
	    	{
	    		$("#search_autocomplete").hide();
	    	}
		}
		if(e.keyCode == 40){
			if($("#search_autocomplete").is(":visible"))
			{
				if($('#autocomplete_list').children().hasClass('search_active'))
				{
					if($('#autocomplete_list').children('.search_active').is(":visible"))
					{
						$("#autocomplete_list li.search_active").next().addClass('search_active');
						$("#autocomplete_list li.search_active").not(':last').removeClass('search_active');
						var autobusqueda = $("#autocomplete_list li.search_active").text();
						$('#inputSearchUserInside').val(autobusqueda);
					}
				}
				else
				{
					$('#autocomplete_list li:first-child').addClass('search_active');
					var autobusqueda = $("#autocomplete_list li.search_active").text();
					$('#inputSearchUserInside').val(autobusqueda);
				}
			}
		}
		if(e.keyCode == 38){
			if($("#search_autocomplete").is(":visible"))
			{
				if($('#autocomplete_list').children().hasClass('search_active'))
				{
					if($('#autocomplete_list').children('.search_active').is(":visible"))
					{
						$("#autocomplete_list li.search_active").prev().addClass('search_active');
						$("#autocomplete_list li.search_active").not(':first').removeClass('search_active');
						var autobusqueda = $("#autocomplete_list li.search_active").text();
						$('#inputSearchUserInside').val(autobusqueda);
					}
				}
			}
		}
	});
});

function runEnterInside(t){13==t.keyCode&&searchPathInside()}
function runEnter(t){13==t.keyCode&&searchPathInside()}

$(document).ready(function(){
	$('#inputSearchUserInside').on('input',function(e){
		var busqueda = $(this).val();
		busqueda = busqueda.toLowerCase();
		busqueda = busqueda.trim();
		if(busqueda.length == 0)
		{
			$('.search_autocomplete').hide();
			$('#autocomplete_list').empty();
		}
		else
		{
			if(busqueda.length == 3)
			{
				var ruta = location.protocol+'//www.iconshock.com/v2/class/search_tags_and_icons_autocomplete.php';
				var datos = {
					'search' : busqueda,
				}
				$.ajax({
					url: ruta,
					type: 'post',
					data: datos
				})
				.done(function(response) {
					$('.search_autocomplete').show();
					$('#autocomplete_list').empty();
					var respuesta = response;
					respuesta.sort();
					respuesta = respuesta.unique();
					for(i=0;i<=respuesta.length-1;i++)
					{
						respuesta[i] = respuesta[i].replace(/_/g,' ');
						$('#autocomplete_list').append('<li style="display:block" onclick="sendSearch(\''+respuesta[i]+'\')">'+respuesta[i]+'</li>');
					}

					$('#autocomplete_list li').hide();
					$('#autocomplete_list li').each(function(index, el) {
						var item = $(this).text();
						item = item.toLowerCase();
						var busqueda2 = $('#inputSearchUserInside').val();
						var matches = item.indexOf(busqueda2) >= 0 ? true : false;
						if (matches) {
						    $(this).show();
						}
						if(item.substr(0,busqueda2.length) == busqueda2)
						{
							$('#autocomplete_list').prepend(this); 
						}

						if(item == busqueda2)
						{
							$('#autocomplete_list').prepend(this);
						}
					});

					$('#autocomplete_list li').each(function(index, el) {
						var item = $(this).text();
						item = item.toLowerCase();
						var busqueda2 = $('#inputSearchUserInside').val();
						if(item == busqueda2)
						{
							$('#autocomplete_list').prepend(this);
						}
					});
				})
				.fail(function() {
					//console.log("error");
				})
				.always(function() {
					
				});
			}
			else
			{
				if(busqueda.length < 3)
				{
					$('.search_autocomplete').hide();
					$('#autocomplete_list').empty();
				}
				else
				{
					$("#search_autocomplete").show();
					$('#autocomplete_list li').hide();
					$('#autocomplete_list li').each(function(index, el) {
						var item = $(this).text();
						item = item.toLowerCase();
						var matches = item.indexOf(busqueda) >= 0 ? true : false;
						if (matches) {
						    $(this).show();
						}
						if(item.substr(0,busqueda.length) == busqueda)
						{
							$('#autocomplete_list').prepend(this); 
						}

						if(item == busqueda)
						{
							$('#autocomplete_list').prepend(this);
						}
					});

					$('#autocomplete_list li').each(function(index, el) {
						var item = $(this).text();
						item = item.toLowerCase();
						if(item == busqueda)
						{
							$('#autocomplete_list').prepend(this);
						}
					});
				}
			}
		}
	})
});

function sendSearch(tag)
{
	$('.search_autocomplete').hide();
	$('#inputSearchUserInside').val(tag);
	searchPathInside();
}

function searchPathInside(){
	$('#search_autocomplete').hide();
	$('#search_autocomplete').children().removeClass('search_active');
	
	var valueSearch =  $("#inputSearchUserInside").val();

	valueSearch = valueSearch.trim();
	valueSearch = valueSearch.replace(/[^a-zA-Z 0-9]+/g ,'');
	valueSearch = valueSearch.replace(/ /g,'-');

	if (valueSearch!="") {
		//var cleanValueSearch=valueSearch.replace(/-+/g,"-");
		//var superClean=cleanValueSearch.replace(/-$/g,""); 
		var valueFinal= valueSearch;
		valueFinal = valueFinal+'-icons-search';

		if(window.location == location.protocol+'//www.iconshock.com/' || window.location == location.protocol+'://www.iconshock.com/icon_sets')
		{
			window.location.pathname = valueFinal;
		}
		else
		{
			$('#icon').empty();
			$('#icon').append('<img src="'+location.protocol+'//www.iconshock.com/img/loader.gif" class="img-loader">');

			var newPath = valueFinal;
			var newurl = window.location.protocol + "//" + window.location.host +'/'+ newPath;
			//window.history.replaceState({path:newurl},'',newurl);
			window.location = newurl;
			//loadIcons(valueFinal,'',1,valueFinal);
		}
	}
}

function freeBundle(cat,ind)
{
	$('.valid_free').text('Processing...');
    $('.valid_free').attr('disabled','disabled');

	var route = location.protocol+hostLocation+'checkSession';
	$.ajax({
		url: route
	})
	.done(function(response) {
		$('.valid_free').text('Free Bundle');
   		$('.valid_free').removeAttr('disabled');

   		if(response == true)
   		{
   			window.location = location.protocol+"//www.iconshock.com/sales/freeSet/"+cat+"/"+ind;
   		}
   		else
   		{
   			NewsletterCookie('#session_newsletter');
   			$('#modal-session').modal('show'); 
   		}
	})
	.fail(function() {
		alert('ERROR');
	})
	.always(function() {
		console.log("complete");
	});
}

$(document).ready(function(r){
	$('.buy_this_bundle').click(function(e){
		var button_buy = $(this);
		//$(this).text('Processing...');
		//$(this).attr('disabled','disabled');

		var bundle = $(this).parents('.main_section_content').attr('id');
		bundle = bundle.replace(/bundle_/g,'');

		var itemBuy = btoa(bundle+'-'+bundle+'-7');
		//var ruta = location.protocol+'//www.iconshock.com/sales/checking/'+code+'/'+code+'/'+type;
		var ruta = location.protocol+'//www.iconshock.com/get-iconshock-sale/'+itemBuy;
		//window.location = ruta;
		window.open(ruta,'_blank');
		/*var ruta = location.protocol+'//www.iconshock.com/bundle/buy/'+bundle;
		$.ajax({
			url : ruta
		}).done(function(response){
			$(button_buy).text('Buy this bundle');
			$(button_buy).removeAttr('disabled');

			if(response != 'false')
			{
				document.getElementById('h154h').innerHTML = response;
				document.getElementById("paypal_form").submit();
			}
			else
			{
				alert('Something is grong with your request');
			}
		});*/
	});

	$('.buy_this_bundle_item').click(function(e){
		var button_buy = $(this);
		//$(this).text('Processing...');
		//$(this).attr('disabled','disabled');

		var itemData = $(this).parents('.bundle_item').attr('id');
		itemData = itemData.split('_');
		var type = itemData[0];
		var code = itemData[1];

		if(type == 'cat') {
			type = '2';
		}
		if(type == 'ind') {
			type = '3';
		}
		if(type == 'cset') {
			type = '6';
		}

		var itemBuy = btoa(code+'-'+code+'-'+type);
		//var ruta = location.protocol+'//www.iconshock.com/sales/checking/'+code+'/'+code+'/'+type;
		var ruta = location.protocol+'//www.iconshock.com/get-iconshock-sale/'+itemBuy;
		//window.location = ruta;
		window.open(ruta,'_blank');
		/*var ruta = location.protocol+'//www.iconshock.com/bundle/buy-set/'+type+'/'+code;

		$.ajax({
			url : ruta
		}).done(function(response){
			$(button_buy).text('Buy this bundle');
			$(button_buy).removeAttr('disabled');
			
			if(response != 'false')
			{
				document.getElementById('h154h').innerHTML = response;
				document.getElementById("paypal_form").submit();
			}
			else
			{
				alert('Something is grong with your request');
			}
		});*/
	});

	$('.free_bundle_item').click(function(e){
		var button_buy = $(this);
		var oldText = $(button_buy).html();
		$(button_buy).html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');

		var itemData = $(this).parents('.bundle_item').attr('id');

		itemData = itemData.split('_');
		var type = itemData[0];
		var code = itemData[1];

		if(type == 'cat') {
			type = '2';
		}
		if(type == 'ind') {
			type = '3';
		}
		if(type == 'cset') {
			type = '6';
		}
		var route = location.protocol+hostLocation+'checkSession';
		$.ajax({
			url: route
		})
		.done(function(response) {
			$('.valid_free').text('Free Bundle');
	   		$('.valid_free').removeAttr('disabled');
	   		$(button_buy).html(oldText);

	   		if(response == true)
	   		{
	   			var itemFree = btoa(code+'-'+type);
	   			window.location = location.protocol+'//www.iconshock.com/free-custom/'+itemFree;
	   		}
	   		else
	   		{
	   			$('#modalSession').modal('show'); 
	   		}
		})
		.fail(function() {
			alert('ERROR');
		})
		.always(function() {
			console.log("complete");
		});
	});

	//Download From Bundle Detail
	$('.download_this_set').click(function(e){
		var button_down = $(this);
		$(this).text('Processing...');
		$(this).attr('disabled','disabled');

		var itemData = $(this).parents('.bundle_item').attr('id');
		itemData = itemData.split('_');
		var type = itemData[0];
		var code = itemData[1];

		var itemBuy = btoa(code+'-'+code+'-'+type);
		var ruta = location.protocol+'//www.iconshock.com/sales/checking/'+code+'/'+code+'/'+type;

		$.ajax({
			url : ruta
		}).done(function(response){
			if(response == true)
			{
				$(button_down).text('Download this set');
				$(button_down).removeAttr('disabled');
				window.location = location.protocol+'//www.iconshock.com/sales/download-set/'+code+'/'+code+'/'+type;		
			}
			else
			{
				alert('Error downloading your file, access denied');
			}
		});
	});

	$('.buy-set').click(function(e){
		$('.buy-set').attr('disabled','disabled');
		var clicked = $(this);
		var cat = $(this).parents('.img_set_container').attr('data-cat');
		var ind = $(this).parents('.img_set_container').attr('data-ind');
		$('#ValidaCateg').val(cat);
		$('#ValidaIndus').val(ind);

		var ruta = location.protocol+'//www.iconshock.com/sales/checking/'+cat+'/'+ind+'/mono';
		$.ajax({
			url : ruta
		}).done(function(response){
			if(response == true)
			{
				window.location = location.protocol+'//www.iconshock.com/downloadsetsale/'+cat+'/'+ind;
			}
			else
			{
				ProcessSet(1);
			}
			$('.buy-set').removeAttr('disabled');
		});
	});

	$('.buy-style').click(function(e){
		var cat = $(this).parents('.title_cat_set').attr('data-cat');
		$('#ValidaCateg').val(cat);
		$('#ValidaIndus').val(cat);
		ProcessSet(2);
	});
});

function ProcessSet(type)
{
	var cat = $('#ValidaCateg').val();
	var ind = $('#ValidaIndus').val();

	if(cat == undefined || cat == '' || type == '4' || type == '5') {
		cat = '1';
	}
	if(ind == undefined || ind == '' || type == '4' || type == '5') {
		ind = '1';
	}
	var setBuy = cat+'-'+ind+'-'+type;
	if(type == '8'){ setBuy = 'full_shock'; }
	setBuy = btoa(setBuy);

	//var ruta = location.protocol+'//www.iconshock.com/sets/buy-aset/'+cat+'/'+ind+'/'+type;
	var ruta = 'https://www.iconshock.com/get-iconshock-sale/'+setBuy;
	window.open(ruta,'_blank');
	//window.location = ruta;
	/*$.ajax({
		url: ruta
	}).done(function(response){
		document.getElementById('h154h').innerHTML = response;
		document.getElementById("paypal_form").submit();
	});*/
}

//PHPLIST
$(document).ready(function(e){
	var todolist = $('#SessiontoList').val();
	if(todolist != undefined && todolist != '') {
		var ruta = location.protocol+'//www.iconshock.com/PhpList.php';
		var datos = {
			'email' : todolist
		}
		$.ajax({
			url : ruta,
			data : datos,
			type : 'post'
		}).done(function(data){
			
		});
	}
});

//GETFREEBIE
function getFreebie(esto) {
	var frr = $(esto);
	var old_text = $(frr).text();
	$(frr).text('Processing...');
	$(frr).attr('disabled','disabled');
	var freebie = $(esto).attr('id');
	freebie = freebie.replace(/free_/g,'');

	var ruta = location.protocol+'//www.iconshock.com/freebies-get/'+freebie;

	$.ajax({
		url : ruta
	}).done(function(res){
		$(frr).text(old_text);
		$(frr).removeAttr('disabled');
		if(res == '1') {
			window.location = location.protocol+'//www.iconshock.com/freebies-download/'+freebie;
		} else {
			NewsletterCookie('#session_newsletter');
			$('#modal-session').modal('show');
		}
	}).fail(function(){
		alert('ERROR');
		$(frr).text(old_text);
		$(frr).removeAttr('disabled');
	});
}
	
$(document).ready(function(e){
	$('.sale-item-method').click(function(e){
		var method = $(this).attr('data-sale');
		$(this).empty();
		$(this).html('<i class="fa fa-spinner fa-pulse fa-fw fa-3x"></i>');

		var itemB = $('#item_buy').val();
		var itemsB = itemB.split('-');
		cat = itemsB[0];
		ind = itemsB[1];
		type = itemsB[2];

		//console.log(cat,ind,type);
		if(method == 'paypal') {
			var ruta = location.protocol+'//www.iconshock.com/sets/buy-aset/'+cat+'/'+ind+'/'+type;

			$.ajax({
				url: ruta
			}).done(function(response){
				document.getElementById('h154h').innerHTML = response;
				document.getElementById("paypal_form").submit();
			});
		}

		if(method == 'shareit') {
			var ruta = location.protocol+'//www.iconshock.com/shareit/'+itemB;
			window.location = ruta;
		}
	});
});

/*$('.icon-grid-icon-img').children('img').contextmenu(function(event){
	alert('hue');
	var clickedTag = (e==null) ? event.srcElement.tagName : e.target.tagName;
	if (clickedTag == "IMG")
	return false;
});*/

$(function(e){

	$('#iconshock_main_urls').empty();
	var urlMenus = location.protocol+hostLocation+'getAllmenuLinks';

	$.ajax({
		url : urlMenus,
		type : 'GET'
	}).done(function(res){
		
		// STYLES
		console.log(res);

		$('#iconshock_main_urls').append('<h2>Styles</h2>');
		//$('#iconshock_main_urls').append('<div style="margin: 5px 0;"><div style="width: 49%; display: inline-block;"><h3 style="font-size: 16px; display: inline-block;">Style view</h3></div><div style="width: 49%; display: inline-block; text-align: center;"><i class="fa fa-list-ul btn-default" onclick="removeGridStyle()" style="font-size: 21px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"></i><i class="fa fa-th btn-default" onclick="addGridStyle()" style="font-size: 21px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"></i></div></div>');
		var ulCat = $('<ul/>', { class : 'important-icon-list' });
		$('#iconshock_main_urls').append(ulCat); 
		window.Categories = res.Categories; console.log(res.Categories);

		for(i=0;i<=res.Categories.length-1;i++) {
			var liCat = $('<li/>', { class : 'ic-style-dropdown' });
			var dropUl = $('<ul/>', { class : 'ul-dropdown' });
			
			for( let icons of  res.Categories[i].sets ){
				if(icons.industry){
					$(dropUl).append('<li><a href="https://www.iconshock.com/'+res.Categories[i].cat_slug+'/'+icons.industry.ind_slug+'/">'+icons.industry.ind_name.toLowerCase()+' icons</a></li>');
				}
			}
			
			/*for(s=0;s<=res.Categories[i].sets.length-1;s++) {
				$(dropUl).append('<li><a href="https://www.iconshock.com/'+res.Categories[i].sets[s].cat_slug+'/'+res.Categories[i].Sets[s].ind_slug+'/">'+res.Categories[i].sets[s].ind_name.toLowerCase()+' icons</a></li>');
			}*/
			if(res.Categories[i].cat_code == '272'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/diskette.svg" alt="diskette"><!--<img src="https://www.iconshock.com/img/bank.svg" alt="bank"><img src="https://www.iconshock.com/img/atm.svg" alt="atm"><img src="https://www.iconshock.com/img/alarm.svg" alt="Alarm">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '57'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/safety_box.svg" alt="Alarm"><!--<img src="https://www.iconshock.com/img/bomb.svg" alt="bomb"><img src="https://www.iconshock.com/img/emoji.svg" alt="emoji"><img src="https://www.iconshock.com/img/bell.svg" alt="bell">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '58'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sniffer.svg" alt="sniffer"><!--<img src="https://www.iconshock.com/img/network_monitor.svg" alt="network"><img src="https://www.iconshock.com/img/cloud.svg" alt="cloud"><img src="https://www.iconshock.com/img/bank_material.svg" alt="bank">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '55'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/iphone_04.svg" alt="iphone"><!--<img src="https://www.iconshock.com/img/iphone_03.svg" alt="iphone"><img src="https://www.iconshock.com/img/iphone_02.svg" alt="iphone"><img src="https://www.iconshock.com/img/iphone_01.svg" alt="iphone">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '257'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/win_10_4.svg" alt="win10"><!--<img src="https://www.iconshock.com/img/win_10_3.svg" alt="win10"><img src="https://www.iconshock.com/img/win_10_2.svg" alt="win10"><img src="https://www.iconshock.com/img/win_10_1.svg" alt="win10">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '59'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/ios_line_04.svg" alt="ios_line"><!--<img src="https://www.iconshock.com/img/ios_line_03.svg" alt="ios_line"><img src="https://www.iconshock.com/img/ios_line_02.svg" alt="ios_line"><img src="https://www.iconshock.com/img/ios_line_01.svg" alt="ios_line">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '262'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/glyph_04.svg" alt="glyph"><!--<img src="https://www.iconshock.com/img/glyph_03.svg" alt="glyph"><img src="https://www.iconshock.com/img/glyph_02.svg" alt="glyph"><img src="https://www.iconshock.com/img/glyph_01.svg" alt="glyph">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '265'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/ios_filled_04.svg" alt="ios_filled"><!--<img src="https://www.iconshock.com/img/ios_filled_03.svg" alt="ios_filled"><img src="https://www.iconshock.com/img/ios_filled_02.svg" alt="ios_filled"><img src="https://www.iconshock.com/img/ios_filled_01.svg" alt="ios_filled">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '266'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/color_line_04.svg" alt="color_line"><!--<img src="https://www.iconshock.com/img/color_line_03.svg" alt="color_line"><img src="https://www.iconshock.com/img/color_line_02.svg" alt="color_line"><img src="https://www.iconshock.com/img/color_line_01.svg" alt="color_line">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '271'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/isometric_04.svg" alt="isometric"><!--<img src="https://www.iconshock.com/img/isometric_03.svg" alt="isometric"><img src="https://www.iconshock.com/img/isometric_02.svg" alt="isometric"><img src="https://www.iconshock.com/img/isometric_01.svg" alt="isometric">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '20'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/realvista_04.svg" alt="realvista"><!--<img src="https://www.iconshock.com/img/realvista_03.svg" alt="realvista"><img src="https://www.iconshock.com/img/realvista_02.svg" alt="realvista"><img src="https://www.iconshock.com/img/realvista_01.svg" alt="realvista">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '32'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/shine7_04.png" alt="shine7"><!--<img src="https://www.iconshock.com/img/shine7_03.png" alt="shine7"><img src="https://www.iconshock.com/img/shine7_02.png" alt="shine7"><img src="https://www.iconshock.com/img/shine7_01.png" alt="shine7">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '30'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/win7_04.png" alt="shine7"><!--<img src="https://www.iconshock.com/img/win7_03.png" alt="shine7"><img src="https://www.iconshock.com/img/win7_02.png" alt="win7"><img src="https://www.iconshock.com/img/win7_01.png" alt="win7">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '268'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/glyphcolor_04.svg" alt="glyphcolor"><!--<img src="https://www.iconshock.com/img/glyphcolor_03.svg" alt="glyphcolor"><img src="https://www.iconshock.com/img/glyphcolor_02.svg" alt="glyphcolor"><img src="https://www.iconshock.com/img/glyphcolor_01.svg" alt="glyphcolor">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '18'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/brilliant_04.png" alt="brilliant"><!--<img src="https://www.iconshock.com/img/brilliant_03.png" alt="brilliant"><img src="https://www.iconshock.com/img/brilliant_02.png" alt="brilliant"><img src="https://www.iconshock.com/img/brilliant_01.png" alt="brilliant">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '21'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/golden_04.png" alt="golden"><!--<img src="https://www.iconshock.com/img/golden_03.png" alt="golden"><img src="https://www.iconshock.com/img/golden_02.png" alt="golden"><img src="https://www.iconshock.com/img/golden_01.png" alt="golden">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '28'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/seven_04.png" alt="seven"><!--<img src="https://www.iconshock.com/img/seven_03.png" alt="seven"><img src="https://www.iconshock.com/img/seven_02.png" alt="seven"><img src="https://www.iconshock.com/img/seven_01.png" alt="seven">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '11'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/vista_04.png" alt="vista"><!--<img src="https://www.iconshock.com/img/vista_03.png" alt="vista"><img src="https://www.iconshock.com/img/vista_02.png" alt="vista"><img src="https://www.iconshock.com/img/vista_01.png" alt="vista">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '17'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/lumina_04.png" alt="lumina"><!--<img src="https://www.iconshock.com/img/lumina_03.png" alt="lumina"><img src="https://www.iconshock.com/img/lumina_02.png" alt="lumina"><img src="https://www.iconshock.com/img/lumina_01.png" alt="lumina">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '270'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/doodle_04.png" alt="doodle"><!--<img src="https://www.iconshock.com/img/doodle_03.png" alt="doodle"><img src="https://www.iconshock.com/img/doodle_02.png" alt="doodle"><img src="https://www.iconshock.com/img/doodle_01.png" alt="doodle">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '13'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/x-mac_04.png" alt="x-mac"><!--<img src="https://www.iconshock.com/img/x-mac_03.png" alt="x-mac"><img src="https://www.iconshock.com/img/x-mac_02.png" alt="x-mac"><img src="https://www.iconshock.com/img/x-mac_01.png" alt="x-mac">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '3'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/impressions_04.png" alt="impressions"><!--<img src="https://www.iconshock.com/img/impressions_03.png" alt="impressions"><img src="https://www.iconshock.com/img/impressions_02.png" alt="impressions"><img src="https://www.iconshock.com/img/impressions_01.png" alt="impressions">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '2'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/crystal_04.png" alt="crystal"><!--<img src="https://www.iconshock.com/img/crystal_03.png" alt="crystal"><img src="https://www.iconshock.com/img/crystal_02.png" alt="crystal"><img src="https://www.iconshock.com/img/crystal_01.png" alt="crystal">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '12'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/diamond_04.png" alt="diamond"><!--<img src="https://www.iconshock.com/img/diamond_03.png" alt="diamond"><img src="https://www.iconshock.com/img/diamond_02.png" alt="diamond"><img src="https://www.iconshock.com/img/diamond_01.png" alt="diamond">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '9'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/prisma_04.png" alt="prisma"><!--<img src="https://www.iconshock.com/img/prisma_03.png" alt="prisma"><img src="https://www.iconshock.com/img/prisma_02.png" alt="prisma"><img src="https://www.iconshock.com/img/prisma_01.png" alt="prisma">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '23'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/luminight_04.png" alt="luminight"><!--<img src="https://www.iconshock.com/img/luminight_03.png" alt="luminight"><img src="https://www.iconshock.com/img/luminight_02.png" alt="luminight"><img src="https://www.iconshock.com/img/luminight_01.png" alt="luminight">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '27'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/clean_04.png" alt="clean"><!--<img src="https://www.iconshock.com/img/clean_03.png" alt="clean"><img src="https://www.iconshock.com/img/clean_02.png" alt="clean"><img src="https://www.iconshock.com/img/clean_01.png" alt="clean">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '31'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/office_04.png" alt="office"><!--<img src="https://www.iconshock.com/img/office_03.png" alt="office"><img src="https://www.iconshock.com/img/office_02.png" alt="office"><img src="https://www.iconshock.com/img/office_01.png" alt="office">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '15'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/stroke_04.png" alt="stroke"><!--<img src="https://www.iconshock.com/img/stroke_03.png" alt="stroke"><img src="https://www.iconshock.com/img/stroke_02.png" alt="stroke"><img src="https://www.iconshock.com/img/stroke_01.png" alt="stroke">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '29'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/beta_04.png" alt="beta"><!--<img src="https://www.iconshock.com/img/beta_03.png" alt="beta"><img src="https://www.iconshock.com/img/beta_02.png" alt="beta"><img src="https://www.iconshock.com/img/beta_01.png" alt="beta">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '1'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sophistique_04.png" alt="sophistique"><!--<img src="https://www.iconshock.com/img/sophistique_03.png" alt="sophistique"><img src="https://www.iconshock.com/img/sophistique_02.png" alt="sophistique"><img src="https://www.iconshock.com/img/sophistique_01.png" alt="sophistique">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '4'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/plastic_xp_04.png" alt="plastic_xp"><!--<img src="https://www.iconshock.com/img/plastic_xp_03.png" alt="plastic_xp"><img src="https://www.iconshock.com/img/plastic_xp_02.png" alt="plastic_xp"><img src="https://www.iconshock.com/img/plastic_xp_01.png" alt="plastic_xp">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			if(res.Categories[i].cat_code == '16'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sunny_day_04.png" alt="sunny_day"><!--<img src="https://www.iconshock.com/img/sunny_day_03.png" alt="sunny_day"><img src="https://www.iconshock.com/img/sunny_day_02.png" alt="sunny_day"><img src="https://www.iconshock.com/img/sunny_day_01.png" alt="sunny_day">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
			$(liCat).append('<a class="categories-name" href="'+location.protocol+hostLocation+res.Categories[i].cat_slug+'/">'+res.Categories[i].cat_name.toLowerCase()+'</a><span class="show-more-list"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>');
			$(ulCat).append(liCat);
			$(liCat).append(dropUl);

			$('#bar-select-search').append('<option value="'+res.Categories[i].cat_slug+'">'+res.Categories[i].cat_name.toLowerCase()+'</option>');
			$('#bar-select-search-desktop').append('<option value="'+res.Categories[i].cat_slug+'">'+res.Categories[i].cat_name.toLowerCase()+'</option>');
		}
		
		
		
		
		// $('#iconshock_main_urls').append('<h2>Styles</h2>');
		// //$('#iconshock_main_urls').append('<div style="margin: 5px 0;"><div style="width: 49%; display: inline-block;"><h3 style="font-size: 16px; display: inline-block;">Style view</h3></div><div style="width: 49%; display: inline-block; text-align: center;"><i class="fa fa-list-ul btn-default" onclick="removeGridStyle()" style="font-size: 21px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"></i><i class="fa fa-th btn-default" onclick="addGridStyle()" style="font-size: 21px; padding: 6px 6px 5px; border-radius: 4px; margin: 0 4px;"></i></div></div>');
		// var ulCat = $('<ul/>', { class : 'important-icon-list' });
		// $('#iconshock_main_urls').append(ulCat); 
		// window.Categories = res.Categories; console.log(res.Categories);

		// for(i=0;i<=res.Categories.length-1;i++) {

		// 	if(res.Categories[i].cat_code == '276') {
				
		// 	}

		// 	var liCat = $('<li/>', { class : 'ic-style-dropdown' });
		// 	var dropUl = $('<ul/>', { class : 'ul-dropdown' });
			
		// 	for(s=0;s<=res.Categories[i].Sets.length-1;s++) {
		// 		$(dropUl).append('<li><a href="https://www.iconshock.com/'+res.Categories[i].Sets[s].cat_slug+'/'+res.Categories[i].Sets[s].ind_slug+'/">'+res.Categories[i].Sets[s].ind_name.toLowerCase()+' icons</a></li>');
		// 	}
		// 	if(res.Categories[i].cat_code == '272'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/diskette.svg" alt="diskette"><!--<img src="https://www.iconshock.com/img/bank.svg" alt="bank"><img src="https://www.iconshock.com/img/atm.svg" alt="atm"><img src="https://www.iconshock.com/img/alarm.svg" alt="Alarm">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '57'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/safety_box.svg" alt="Alarm"><!--<img src="https://www.iconshock.com/img/bomb.svg" alt="bomb"><img src="https://www.iconshock.com/img/emoji.svg" alt="emoji"><img src="https://www.iconshock.com/img/bell.svg" alt="bell">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '58'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sniffer.svg" alt="sniffer"><!--<img src="https://www.iconshock.com/img/network_monitor.svg" alt="network"><img src="https://www.iconshock.com/img/cloud.svg" alt="cloud"><img src="https://www.iconshock.com/img/bank_material.svg" alt="bank">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '55'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/iphone_04.svg" alt="iphone"><!--<img src="https://www.iconshock.com/img/iphone_03.svg" alt="iphone"><img src="https://www.iconshock.com/img/iphone_02.svg" alt="iphone"><img src="https://www.iconshock.com/img/iphone_01.svg" alt="iphone">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '257'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/win_10_4.svg" alt="win10"><!--<img src="https://www.iconshock.com/img/win_10_3.svg" alt="win10"><img src="https://www.iconshock.com/img/win_10_2.svg" alt="win10"><img src="https://www.iconshock.com/img/win_10_1.svg" alt="win10">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '59'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/ios_line_04.svg" alt="ios_line"><!--<img src="https://www.iconshock.com/img/ios_line_03.svg" alt="ios_line"><img src="https://www.iconshock.com/img/ios_line_02.svg" alt="ios_line"><img src="https://www.iconshock.com/img/ios_line_01.svg" alt="ios_line">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '262'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/glyph_04.svg" alt="glyph"><!--<img src="https://www.iconshock.com/img/glyph_03.svg" alt="glyph"><img src="https://www.iconshock.com/img/glyph_02.svg" alt="glyph"><img src="https://www.iconshock.com/img/glyph_01.svg" alt="glyph">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '265'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/ios_filled_04.svg" alt="ios_filled"><!--<img src="https://www.iconshock.com/img/ios_filled_03.svg" alt="ios_filled"><img src="https://www.iconshock.com/img/ios_filled_02.svg" alt="ios_filled"><img src="https://www.iconshock.com/img/ios_filled_01.svg" alt="ios_filled">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '266'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/color_line_04.svg" alt="color_line"><!--<img src="https://www.iconshock.com/img/color_line_03.svg" alt="color_line"><img src="https://www.iconshock.com/img/color_line_02.svg" alt="color_line"><img src="https://www.iconshock.com/img/color_line_01.svg" alt="color_line">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '271'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/isometric_04.svg" alt="isometric"><!--<img src="https://www.iconshock.com/img/isometric_03.svg" alt="isometric"><img src="https://www.iconshock.com/img/isometric_02.svg" alt="isometric"><img src="https://www.iconshock.com/img/isometric_01.svg" alt="isometric">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '20'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/realvista_04.svg" alt="realvista"><!--<img src="https://www.iconshock.com/img/realvista_03.svg" alt="realvista"><img src="https://www.iconshock.com/img/realvista_02.svg" alt="realvista"><img src="https://www.iconshock.com/img/realvista_01.svg" alt="realvista">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '32'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/shine7_04.png" alt="shine7"><!--<img src="https://www.iconshock.com/img/shine7_03.png" alt="shine7"><img src="https://www.iconshock.com/img/shine7_02.png" alt="shine7"><img src="https://www.iconshock.com/img/shine7_01.png" alt="shine7">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '30'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/win7_04.png" alt="shine7"><!--<img src="https://www.iconshock.com/img/win7_03.png" alt="shine7"><img src="https://www.iconshock.com/img/win7_02.png" alt="win7"><img src="https://www.iconshock.com/img/win7_01.png" alt="win7">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '268'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/glyphcolor_04.svg" alt="glyphcolor"><!--<img src="https://www.iconshock.com/img/glyphcolor_03.svg" alt="glyphcolor"><img src="https://www.iconshock.com/img/glyphcolor_02.svg" alt="glyphcolor"><img src="https://www.iconshock.com/img/glyphcolor_01.svg" alt="glyphcolor">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '18'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/brilliant_04.png" alt="brilliant"><!--<img src="https://www.iconshock.com/img/brilliant_03.png" alt="brilliant"><img src="https://www.iconshock.com/img/brilliant_02.png" alt="brilliant"><img src="https://www.iconshock.com/img/brilliant_01.png" alt="brilliant">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '21'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/golden_04.png" alt="golden"><!--<img src="https://www.iconshock.com/img/golden_03.png" alt="golden"><img src="https://www.iconshock.com/img/golden_02.png" alt="golden"><img src="https://www.iconshock.com/img/golden_01.png" alt="golden">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '28'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/seven_04.png" alt="seven"><!--<img src="https://www.iconshock.com/img/seven_03.png" alt="seven"><img src="https://www.iconshock.com/img/seven_02.png" alt="seven"><img src="https://www.iconshock.com/img/seven_01.png" alt="seven">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '11'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/vista_04.png" alt="vista"><!--<img src="https://www.iconshock.com/img/vista_03.png" alt="vista"><img src="https://www.iconshock.com/img/vista_02.png" alt="vista"><img src="https://www.iconshock.com/img/vista_01.png" alt="vista">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '17'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/lumina_04.png" alt="lumina"><!--<img src="https://www.iconshock.com/img/lumina_03.png" alt="lumina"><img src="https://www.iconshock.com/img/lumina_02.png" alt="lumina"><img src="https://www.iconshock.com/img/lumina_01.png" alt="lumina">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '270'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/doodle_04.png" alt="doodle"><!--<img src="https://www.iconshock.com/img/doodle_03.png" alt="doodle"><img src="https://www.iconshock.com/img/doodle_02.png" alt="doodle"><img src="https://www.iconshock.com/img/doodle_01.png" alt="doodle">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '13'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/x-mac_04.png" alt="x-mac"><!--<img src="https://www.iconshock.com/img/x-mac_03.png" alt="x-mac"><img src="https://www.iconshock.com/img/x-mac_02.png" alt="x-mac"><img src="https://www.iconshock.com/img/x-mac_01.png" alt="x-mac">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '3'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/impressions_04.png" alt="impressions"><!--<img src="https://www.iconshock.com/img/impressions_03.png" alt="impressions"><img src="https://www.iconshock.com/img/impressions_02.png" alt="impressions"><img src="https://www.iconshock.com/img/impressions_01.png" alt="impressions">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '2'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/crystal_04.png" alt="crystal"><!--<img src="https://www.iconshock.com/img/crystal_03.png" alt="crystal"><img src="https://www.iconshock.com/img/crystal_02.png" alt="crystal"><img src="https://www.iconshock.com/img/crystal_01.png" alt="crystal">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '12'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/diamond_04.png" alt="diamond"><!--<img src="https://www.iconshock.com/img/diamond_03.png" alt="diamond"><img src="https://www.iconshock.com/img/diamond_02.png" alt="diamond"><img src="https://www.iconshock.com/img/diamond_01.png" alt="diamond">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '9'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/prisma_04.png" alt="prisma"><!--<img src="https://www.iconshock.com/img/prisma_03.png" alt="prisma"><img src="https://www.iconshock.com/img/prisma_02.png" alt="prisma"><img src="https://www.iconshock.com/img/prisma_01.png" alt="prisma">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '23'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/luminight_04.png" alt="luminight"><!--<img src="https://www.iconshock.com/img/luminight_03.png" alt="luminight"><img src="https://www.iconshock.com/img/luminight_02.png" alt="luminight"><img src="https://www.iconshock.com/img/luminight_01.png" alt="luminight">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '27'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/clean_04.png" alt="clean"><!--<img src="https://www.iconshock.com/img/clean_03.png" alt="clean"><img src="https://www.iconshock.com/img/clean_02.png" alt="clean"><img src="https://www.iconshock.com/img/clean_01.png" alt="clean">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '31'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/office_04.png" alt="office"><!--<img src="https://www.iconshock.com/img/office_03.png" alt="office"><img src="https://www.iconshock.com/img/office_02.png" alt="office"><img src="https://www.iconshock.com/img/office_01.png" alt="office">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '15'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/stroke_04.png" alt="stroke"><!--<img src="https://www.iconshock.com/img/stroke_03.png" alt="stroke"><img src="https://www.iconshock.com/img/stroke_02.png" alt="stroke"><img src="https://www.iconshock.com/img/stroke_01.png" alt="stroke">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '29'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/beta_04.png" alt="beta"><!--<img src="https://www.iconshock.com/img/beta_03.png" alt="beta"><img src="https://www.iconshock.com/img/beta_02.png" alt="beta"><img src="https://www.iconshock.com/img/beta_01.png" alt="beta">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '1'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sophistique_04.png" alt="sophistique"><!--<img src="https://www.iconshock.com/img/sophistique_03.png" alt="sophistique"><img src="https://www.iconshock.com/img/sophistique_02.png" alt="sophistique"><img src="https://www.iconshock.com/img/sophistique_01.png" alt="sophistique">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '4'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/plastic_xp_04.png" alt="plastic_xp"><!--<img src="https://www.iconshock.com/img/plastic_xp_03.png" alt="plastic_xp"><img src="https://www.iconshock.com/img/plastic_xp_02.png" alt="plastic_xp"><img src="https://www.iconshock.com/img/plastic_xp_01.png" alt="plastic_xp">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	if(res.Categories[i].cat_code == '16'){ $(liCat).append('<div class="grid-icon"><img src="https://www.iconshock.com/img/sunny_day_04.png" alt="sunny_day"><!--<img src="https://www.iconshock.com/img/sunny_day_03.png" alt="sunny_day"><img src="https://www.iconshock.com/img/sunny_day_02.png" alt="sunny_day"><img src="https://www.iconshock.com/img/sunny_day_01.png" alt="sunny_day">--></div>'+'</a><span class="show-more-list grid-show-more"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>'); }
		// 	$(liCat).append('<a class="categories-name" href="'+location.protocol+hostLocation+res.Categories[i].cat_slug+'/">'+res.Categories[i].cat_name.toLowerCase()+'</a><span class="show-more-list"><i class="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" original-title="expand" style="position: relative;"></i></span>');
		// 	$(ulCat).append(liCat);
		// 	$(liCat).append(dropUl);

		// 	//$('#bar-select-search').append('<option value="'+res.Categories[i].cat_slug+'">'+res.Categories[i].cat_name.toLowerCase()+'</option>');
			
		// }






		var ulInd = $('<ul/>', { class : 'important-icon-list' });
		$('#iconshock_main_urls').append('<hr style="margin-bottom: 2em;">');
		$('#iconshock_main_urls').append('<h2>Categories</h2>');
		$('#iconshock_main_urls').append(ulInd);
		for(i=0;i<=res.Industries.length-1;i++) {
			var liInd = $('<li/>');
			/*if(res.Industries[i].ind_code == '1'){ $(liInd).append('<img style="margin: 0 10px; vertical-align: middle;" src="https://www.iconshock.com/img/general_ind.svg" alt="general">'); }
			if(res.Industries[i].ind_code == '2'){ $(liInd).append('<img style="margin: 0 10px; vertical-align: middle;" src="https://www.iconshock.com/img/accounting_ind.svg" alt="accounting">'); }
			if(res.Industries[i].ind_code == '3'){ $(liInd).append('<img style="margin: 0 10px; vertical-align: middle;" src="https://www.iconshock.com/img/networking_ind.svg" alt="networking">'); }
			if(res.Industries[i].ind_code == '40'){ $(liInd).append('<img style="margin: 0 10px; vertical-align: middle;" src="https://www.iconshock.com/img/animals_ind.svg" alt="animals">'); }*/
			$(liInd).append('<a href="https://www.iconshock.com/'+res.Industries[i].ind_slug+'/">'+res.Industries[i].ind_name.toLowerCase()+'</a>');
			$(ulInd).append(liInd);
		}

		var ulList = $('<ul/>', { class : 'important-icon-list' });
		$('#iconshock_main_urls').append('<hr style="margin-bottom: 2em;">');
		$('#iconshock_main_urls').append('<h2>Highlights</h2>');
		$('#iconshock_main_urls').append(ulList);
		for(i=0;i<=res.Lists.length-1;i++) {
			var liList = $('<li/>');
			$(liList).append('<a href="https://www.iconshock.com/'+res.Lists[i].sup_slug+'/">'+res.Lists[i].sup_name.toLowerCase()+'</a>');
			$(ulList).append(liList);
		}
		$('.fa[data-toggle="tooltip"]').tooltip(); 
	});

});

function addGridStyle(){
	$('.ic-style-dropdown').addClass('grid__item');
}

function removeGridStyle(){
	$('.ic-style-dropdown').removeClass('grid__item');
}

function displayListMenu(esto) {
	var clickedList = $(esto);
	var listDisplay = $(clickedList).parents('.ic-style-dropdown').find('.ul-dropdown');

	if($(listDisplay).is(':visible')) {
		$(clickedList).html('<i class="fa fa-plus-circle" aria-hidden="true"></i>');
		$(listDisplay).hide('slow');
		return;
	} else {
		$(clickedList).html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
		$(listDisplay).show('slow');
		return;
	}
}

$(function(e){
	var divbottomFixed = $('<div />', { class : 'div_bottom_premium' });
	var container_button_premium = $('<div />', { class: 'container_button_premium' });
	var buttonPremium = $('<a />', { class : 'div_bottom_premium-fixed', text : 'Become Premium (2 million icons)', href : 'https://www.iconshock.com/premium' });
	$(divbottomFixed).append(container_button_premium)
	$(container_button_premium).append(buttonPremium);
	$('body').append(divbottomFixed);
});

$(document).on('click','.show-more-list', function(event){ event.preventDefault(); displayListMenu(this); });



//Newsletter conditional
function NewsletterCookie(esto) {
	if($(esto).is(':checked')) {
		document.cookie = "newsletter_sign_up=1; path=/";
		return;
	} else {
		document.cookie = "newsletter_sign_up=0; path=/";
		return;
	}
}
$(document).on('click', '#session_newsletter', function(event){ NewsletterCookie(this); });

function copyToClipboard(element) {
	var $temp = $("<input>");
	$(element).append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}

$(function(){
	var formIconsSrc = $('#src-icons-filter');

	function srcIcons(esto){
		var inputText = $(esto).find('input[name="src_new"]').val();
		inputText = inputText.replace(/[^\w\s]/gi , '');
		inputText = inputText.trim();

		var inputUrl = inputText.replace(' ', '-')+'-icons';

		if($('#bar-select-search').val() != '0') {
			inputUrl = $('#bar-select-search').val()+'/'+inputUrl;
		}

		window.location = location.protocol+hostLocation+inputUrl;
	}

	$(formIconsSrc).on('submit', function(event){ event.preventDefault(); srcIcons(this); });
});

function openMyModal(){
	$('#myModal').modal('show');
}

function printPacksNumber(cat, name){
	window.Categories.forEach(function (value, i) {
		if(value.cat_code == cat) {
			$('#print-pack-number').html(value.cat_num_icons+' icons included in all '+value.Sets.length+' '+name+' packs');
		}
	});

}
