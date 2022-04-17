$( ".modal-body" ).click(function( event ){event.stopPropagation();});$( ".modal-container" ).click(function( event ){$('.modal-container').removeClass('show-modal');});
function obtenerCookie(clave) {

	var elements = document.cookie.split('=');
    var obligations= elements[1].split('%');
    for (var i = 0; i < obligations.length - 1; i++) {
        var tmp = obligations[i].split('$');
        addProduct1(tmp[0], tmp[1], tmp[2], tmp[3]);
    }
	
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
 
function comprobarCookie(clave) {
	console.log(localStorage.getItem(clave));
    var clave = obtenerCookie(clave);
    if (clave!="") {
        return true;
    }else{
        return false;
    }
}
function openModal(type,set,name){
	if (comprobarCookie("sesion") == false){
		type = 1;
	}else{
		type = 2;
	}
	var modal1="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Have Fun with you download but first, could you register :) </h2><div class=modal-buttons><div class=button onclick=addParameterToPath('2','facebook')>Register with Facebook </div> <div class=button onclick=addParameterToPath('2','google')>Register with Google </div></div>	   </div>	 </section>",modal2="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Great! these icons will make your day but you can get even more ;) </h2>	     <div class=modal-buttons>        <div class=button>Buy full "+set+" bundle $29 </div>	       <div class=button>Buy full iconShock bundle $39 </div>	     </div>	   </div>  </section>",modal3="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Great! these icons will make your day but you can get even more ;) </h2>	     <div class=modal-buttons>        <div class=button>Buy  "+set+", "+name+" set $29 </div>	       <div class=button>Buy full "+set+" bundle $29 </div>	       <div class=button>Buy full iconShock bundle $39 </div>	     </div>	   </div>	 </section>";    

	if (type == 1) {
		$('.modal-container').html(modal1);	
	}else if (type == 2) {
		$('.modal-container').html(modal2);	
	}else{ 
		$('.modal-container').html(modal3);	
	}	 
	$('.modal-container').addClass('show-modal');
}

function openModalBar(type,set,name){
	if (comprobarCookie("sesion") == false){
		type = 1;
	}else{
		type = 2;
	}
	var modal1="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Register or Sing Up to get Started :) </h2><div class=modal-buttons><div class=button onclick=addParameterToPath('2','facebook')>Register with Facebook </div> <div class=button onclick=addParameterToPath('2','google')>Register with Google </div></div>	   </div>	 </section>",modal2="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Great! these icons will make your day but you can get even more ;) </h2>	     <div class=modal-buttons>        <div class=button>Buy full "+set+" bundle $29 </div>	       <div class=button>Buy full iconShock bundle $39 </div>	     </div>	   </div>  </section>",modal3="<section class=modal-container>	   <div class=modal-body onclick=event.stopPropagation();>	     <button onclick=closeModal() class=modal-close>X</button>      <h2 class=modal-title>Great! these icons will make your day but you can get even more ;) </h2>	     <div class=modal-buttons>        <div class=button>Buy  "+set+", "+name+" set $29 </div>	       <div class=button>Buy full "+set+" bundle $29 </div>	       <div class=button>Buy full iconShock bundle $39 </div>	     </div>	   </div>	 </section>";    

	if (type == 1) {
		$('.modal-container').html(modal1);	
	}else if (type == 2) {
		$('.modal-container').html(modal2);	
	}else{ 
		$('.modal-container').html(modal3);	
	}	 
	$('.modal-container').addClass('show-modal');
}

function closeModal(){
	$('.modal-container').removeClass('show-modal');
}
var pathArray = window.location.pathname.split( '/' );function addPath(t,e){var o=(window.location.href.split("/").pop(),window.location.href);console.log(o),e.href=window.location.href+"/"+t,$("#title-industry").html(e.text)}

function addParameterToPath(position,parameter){
	if (parameter=="facebook" || parameter == "google") {
		window.location= location.protocol+"//www.iconshock.com/"+parameter;	
	}else{
		var newPathname = "";
		pathArray[position] = parameter;
		for(i=1;i<pathArray.length;i++){
			newPathname+="/";
			newPathname+=pathArray[i];
		}
		alert(newPathname);
	}	
}

function removeParameterToPath(position){var newPathname="";var lastChar= pathArray[3].length;if (pathArray.length < 5 && pathArray[3].indexOf("-icon") !=-1 && pathArray[3].charAt(lastChar-1)=="s" && pathArray[2]!="all"){pathArray.splice(position,position);}for(i=1;i<pathArray.length;i++){newPathname+="/";newPathname+=pathArray[i];}window.location.pathname=newPathname;}

function categoryFilter(categoryItem,element){
	if (pathArray.length==3) {
		if (categoryItem!="all"){
			var urltype = $('#urltype').val();
			if(urltype == 'ind')
			{
				var newPath = pathArray[1]+'/'+categoryItem+'/'+pathArray[2];
				window.location.pathname = newPath;
			}
			else
			{
				$('#title-category').html(element.text);
				addParameterToPath(2,categoryItem);
			}
		}
		else
		{

		}
	}else{
		if(categoryItem=="all")
		{
			window.location = location.protocol+"//www.iconshock.com/"+pathArray[3];
		}
		else
		{
			$('#title-category').html(element.text);
			addParameterToPath(2,categoryItem);
		}
	}
}

function industryFilter(industryItem,element){
	
	$('#title-industry').html(element.text);
	if (pathArray.length==3) {

	}else{
		$('#title-category').html(element.text);
		removeParameterToPath(3);
	}

	if (industryItem!="all")
	{
		$('#title-category').html(element.text);
		var urltype = $('#urltype').val();
		if(urltype == 'ind')
		{
			addParameterToPath(2,industryItem);
		}
		else
		{
			addParameterToPath(3,industryItem);
		}
	}
	else
	{
		
	}
	/*if (industryItem=="all") {
			
	}else{
		
		addParameterToPath(3,industryItem);	
	}*/
}

function ChangeUrl(t,e){if("undefined"!=typeof history.pushState){var o={Title:t,Url:e};history.pushState(o,o.Title,o.Url)}else alert("Browser does not support HTML5.")}
function searchPath(){
	var valueSearch=$("#inputSearchUserInside").val();
	if (valueSearch!="") {
		var cleanValueSearch=valueSearch.replace(/ +/g,"-");
		var superClean= cleanValueSearch.replace(/-$/g,"");  
		var valueFinal=  superClean.replace(/[,.;!#$%&/()=?¡<>*_:;,.ñÑ{}+´¿'|^ `~+/,]/gi,'');
		valueFinal = valueFinal+'-icons-search';
		window.location.pathname = valueFinal;
	}
}

//function runEnter(t){13==t.keyCode&&searchPath()}function runEnterInside(t){13==t.keyCode&&searchPathInside()}var buttonA=document.getElementById("buttonMenu"),menu=document.getElementById("menu"),opacity=document.getElementById("opacity");buttonAnimated=document.getElementById("nav-icon1");var body=document.getElementsByTagName("body"),flag=0;$(".nav-categories .nav-categories-item").click(function(){$("#title-category").html(this.text),$(this).siblings().removeClass("active"),$(this).addClass("active");var t=$(this).attr("data-category");addParameterToPath(1,t),removeParameterToPath(2)}),$(".nav-industries .nav-categories-item").click(function(){$("#title-industry").html(this.text),$(this).siblings().removeClass("active"),$(this).addClass("active");var t=$(this).attr("data-industry");addParameterToPath(2,t)}),buttonA.onclick=function(){menu.classList.toggle("active-menu"),opacity.classList.toggle("open-opacity")},buttonAnimated.onclick=function(){buttonAnimated.classList.toggle("open")},body.onclick=function(){alert("hola")},opacity.onclick=function(){menu.classList.remove("active-menu"),this.classList.remove("open-opacity"),buttonAnimated.classList.remove("open")};

function getCookie(name) {
    var cookie = document.cookie;
    var prefix = name + "=";
    var begin = cookie.indexOf("; " + prefix);
    if (begin == -1) {
        begin = cookie.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = cookie.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 


$(document).ready(function(){
	//Change Color index
	$('.change_color').click(function(){
		var color = $(this).css('fill');
		$('#icon_color_change').css('fill',color);

		var disx = $(this).css('x');
		var disxx = $(this).attr('x');
		$('.color_pick').css('x',disx);
		$('.color_pick').attr('x',disxx);
	});

	//Change Style index
	$('.change_icon_sel').click(function(){
		$(this).children('path').css('fill','#629fbd');
		$(this).siblings().children('path').css('fill','rgb(79, 79, 84)');

		var icono = $(this).attr('display-icon');
		var idicon = document.getElementById(icono);

		$(".icon_shield_display").fadeOut("slow");
		$('#'+icono).fadeIn("slow");
		//$(".icon_shield_display").removeClass("displaygiro");

		
	});

	//Change Addon index
	$('.addon_sel').click(function(){
		$(this).children('path').css('fill','#629fbd');
		$(this).siblings().children('.addon_sel path').css('fill','rgb(0, 0, 0)');

		$('#no_addons_obj').css('opacity','0');
		var addon = $(this).attr('data-addon');

		for(e=0;e<=8;e++)
		{
			document.getElementsByClassName("addon_display")[e].classList.remove('shake');
		}
		
		var addonid = document.getElementById(addon);
		addonid.classList.add('shake');
		//var addonclass = document.getElementsByClassName('getElementsByClassName');
	});
});


