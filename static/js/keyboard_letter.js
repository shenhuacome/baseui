function $defined(obj){return(obj!=undefined)}
String.prototype.equals = function(value) {
    try {
        if (value == this) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
};
String.prototype.equalsIgnoreCase = function(value) {
    try {
        if (value.toLowerCase() == this.toLowerCase()) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
};
String.prototype.startsWith = function(value) {
    if (this == null || value == null) {
        return false
    }
    if (value.length > this.length) {
        return false
    }
    if (this.substring(0, value.length).equals(value)) {
        return true
    }
    return false
};
String.prototype.textLength = function() {
    if (this == null) {
        return 0
    }
    var tlen = 0;
    for (var i = 0; i < this.length; i++) {
        var code = this.charCodeAt(i);
        if (code >= 0 && code <= 128) {
            tlen += 1
        } else {
            tlen += 2
        }
    }
    return tlen
};
function _$(el){if(!el){return null}if(el.htmlElement){return Garbage.collect(el)}if([window,document].contains(el)){return el}var type=$type(el);if(type=="string"){el=document.getElementById(el);type=(el)?"element":false}if(type!="element"){return null}if(el.htmlElement){return Garbage.collect(el)}if(["object","embed"].contains(el.tagName.toLowerCase())){return el}$extend(el,Element.prototype);el.htmlElement=function(){};return Garbage.collect(el)}
var $keyboard=new Object(),doc=$(document);
$keyboard.name="keyboard";
$keyboard.hidetimeout=null;
$keyboard.object=null;
$keyboard.input=null;
$keyboard.lowercase=true;
$keyboard.disabled=false;
$keyboard.selected=false;
$keyboard.prevKeys=["~","!","@","#","$","%","^","&","*","(",")","_","+","|","-","`"];
$keyboard.nextKeys=["=","\\","{","}","q","w","e","r","t","y","u","i","o","p","[","]","<",">","?","a","s","d","f","g","h","j","k","l","'",",",".","/","chardelete","z","x","c","v","b","n","m",":",'"',";","&nbsp;","charswitch"];
$keyboard.numbers=["1","2","3","4","5","6","7","8","9","0"];
$keyboard.verify_blank_error="密码键盘资料不完整.";

//Ajax validate 2009-12-31
$keyboard.oldvalue=null;
$keyboard.maxlength=20;

$keyboard.show=function (el){
	if(this.disabled){
		return; 
	}
	this.addListener();
	if(this.input!=el&&this.object!=null){
		this.hidden();
	}
	this.input=el;
	el.readOnly=true;
	setTimeout("$keyboard.display()",10);
	
	//Ajax validate 2009-12-31
	try{
        this.oldvalue=el.value;
        if(jQuery(el).attr("maxlength")!=null && jQuery(el).attr("maxlength")!="" && jQuery(el).attr("maxlength")>0){
            $keyboard.maxlength = jQuery(el).attr("maxlength");
        }
    }catch(e){
        $keyboard.maxlength = 20;
        this.oldvalue = el.value;
    }
};
$keyboard.addListener=function (){
	doc.unbind("keyup",this.fn);
	doc.unbind("click",this.fn);
	this.fn=function (event){
		$keyboard.remove(event);
	};
	doc.bind("keyup",this.fn);
	doc.bind("click",this.fn);
};
$keyboard.hide=function (el){
	var key=_$(this.name+el.id);
	if(!$defined(key)){
		alert(this.verify_blank_error);
	}
	this.hidetimeout=setTimeout("$keyboard.hidden()",100);
	this.object=key;
	this.input=el;
};
$keyboard.hidden=function (){
    this.object.style.display="none";
	this.disabled=false;
	
	//Ajax validate 2009-12-31
	try{
	    if(this.oldvalue!=null){
	        //如果有校验了
	        if(this.oldvalue != this.input.value){
	            if(jQuery(this.input).validateSelf){
	                jQuery(this.input).validateSelf();
	            }
	        }else{
	            //数据无变化不做处理
	        }
	    }
	    
        this.oldvalue=null;
    }catch(e){alert(e.message)}
};
$keyboard.display=function (){
	if(this.hidetimeout!=null){
		$clear(this.hidetimeout);
	}
	var key=_$(this.name+this.input.id);
	var ns=this.numbers;
	var format=this.input.getAttribute("pa_keyboard");
	if(format==null){
		format="random";
	};
	if(!$defined(key)||"random".equalsIgnoreCase(format)){
		if("random".equalsIgnoreCase(format)){
			ns=this.random(ns);
		}if($defined(key)){
			key.style.display="";
		}else {
			var event=new Element(this.input);
			var coord=event.getCoordinates();
			var x=(coord.right-coord.width)+"px";
			var y=(coord.top+coord.height)+"px";
			key=new Element("div",{
				styles:{
					left:x,top:y,position:"absolute",zIndex:1000
				}
			}).addClass(this.name).injectInside(document.body);
			key.onselectstart=function (){
				return false;
			};
			key.onselect=function (){
				document.selection.empty();
			};
			key.id=this.name+this.input.id;
			key.addClass(this.name);
		}
		this.object=key;
		bgiframe(key);
		var html='<div class="caption"><button onclick="return $keyboard.switchkey();"></button><button onclick="return $keyboard.switchkey();" class="use_keyboard"></button></div><div class="display"><ul>';
		for(var i=0;i<this.prevKeys.length;i++){
			if(this.prevKeys[i].length==1||this.prevKeys[i].startsWith("&")){
				html+='<li onclick="return $keyboard.select(this);">'+this.prevKeys[i]+"</li>";
			}else {
				html+='<li onclick="return $keyboard.'+this.prevKeys[i]+'(this);" class="'+this.prevKeys[i]+'"></li>';
			}
		}for(var i=0;i<ns.length;i++){
			html+='<li onclick="return $keyboard.select(this);" class="num">'+ns[i]+"</li>";
		}for(var i=0;i<this.nextKeys.length;i++){
			if(this.nextKeys[i].length==1||this.nextKeys[i].startsWith("&")){
				html+='<li onclick="return $keyboard.select(this);">'+this.nextKeys[i]+"</li>";
			}else {
				html+='<li onclick="return $keyboard.'+this.nextKeys[i]+'(this);" class="'+this.nextKeys[i]+'"></li>';
			}
		}
		html+="</ul></div>";
		key.innerHTML=html;
		return; 
	}
	key.style.display="";
	this.object=key;
	if(this.name.equals(key.className)){
		return ;
	}
};
$keyboard.charswitch=function (el){
	var ul=$parent(el,"ul");
	if(ul==null||!$defined(ul.childNodes)){
		return ;
	}for(var j=0;j<ul.childNodes.length;j++){
		if(!this.isChar(ul.childNodes[j].innerHTML)){
			continue;
		}if(this.lowercase){
			ul.childNodes[j].innerHTML=ul.childNodes[j].innerHTML.toUpperCase();
		}else {
			ul.childNodes[j].innerHTML=ul.childNodes[j].innerHTML.toLowerCase();
		}
	}if(this.lowercase){
		this.lowercase=false;
	}else {
		this.lowercase=true;
	}
};
$keyboard.isChar=function (s){
	var matches=/^[a-zA-Z]$/;
	return (matches.test(s));
};
$keyboard.select=function (el){
    
    if(this.input.value.length>= $keyboard.maxlength){
        return;
    }
    
	var e=new Element(el);
	this.input.value+=e.getText();
	$keyboard.fireEvent(this.input, "keyup");
};

$keyboard.fireEvent = function(element, event){
	jQuery(element).trigger(event);
	/*
	if (document.createEventObject){
		// IE浏览器支持fireEvent方法
		var evt = document.createEventObject();
		return element.fireEvent('on'+event, evt)
	} else {
		// 其他标准浏览器使用dispatchEvent方法
		var evt = document.createEvent('HTMLEvents');
	    // initEvent接受3个参数：
	    // 事件类型，是否冒泡，是否阻止浏览器的默认行为
	    evt.initEvent(event, true, true);
	    return !element.dispatchEvent(evt);
	}
	*/
};

$keyboard.switchkey=function (){
	this.disabled=true;
	this.input.readOnly=false;
	this.input.focus();
	this.hidetimeout=window.setTimeout("$keyboard.hidden();",100);
	return false;
};
$keyboard.chardelete=function (){
	this.selected=true;
	var v=this.input.value;
	var len=v.length;
	if(len>0){
		this.input.value=v.substr(0,len-1);
	}
	$keyboard.fireEvent(this.input, "keyup");
};
$keyboard.remove=function (e){
	var event=new Event(e);
	if($defined(event.target.tagName)&&"input".equalsIgnoreCase(event.target.tagName)){
		
		if(event.target==this.input){
			return ;
		}
	}if(this.parent(event.target)==this.object){
		return ;
	}
	this.disabled=true;
	this.input.readOnly=false;
	//this.input.focus();
	this.hidetimeout=window.setTimeout("$keyboard.hidden();",100);
};
$keyboard.parent=function (el){
	if(el==null){
		return null;
	}else {
		if(el.nodeType==1&&el.tagName.equalsIgnoreCase("div")&&this.name.equals(el.className)){
			return el;
		}else {
			return this.parent(el.parentNode);
		}
	}
};
$keyboard.random=function (a){
	var randomNum;
	var times=a.length;
	var ra=new Array(times);
	for(var i=0;i<times;i++){
		ra[i]=a[i];
	}
	for(var i=0;i<times;i++){
		randomNum=parseInt(Math.random()*times);
		var tmp=ra[0];
		ra[0]=ra[randomNum];
		ra[randomNum]=tmp;
	}
	return ra;
};

function getContextPath() {
    try{
        var protocolObj = document.location.protocol;
        if(protocolObj!=null && protocolObj.toUpperCase().indexOf("HTTP")!=0){
            return "";
        }
    }catch(e){
        alert("getContextPath:"+e.message);
    }
  var tmpPathName = document.location.pathname;
  
  tmpPathName = tmpPathName.substring(1);
  var iPos = tmpPathName.indexOf("/");
  var contextPath = tmpPathName.substring(0, iPos)
  
  return contextPath;

} 

function getBlankPage() {
    try{
        var protocolObj = document.location.protocol;
        if(protocolObj!=null && protocolObj.toUpperCase().indexOf("HTTP")!=0){
            return "";
        }
    }catch(e){
        alert("getBlankPage:"+e.message);
    }
	var contextPath = getContextPath()
	return "/" + contextPath + "/app_js/blank.htm";

}

function bgiframe(div){
	if(jQuery.browser.msie&&/6.0/.test(navigator.userAgent)){
		var iframe = document.createElement("<iframe id='bgiframe' name='bgiframe' src='"+getBlankPage()+"' frameborder='0' style='position:absolute;z-index:50;filter:Alpha(Opacity=0);width:expression(this.nextSibling.offsetWidth);height:expression(this.nextSibling.offsetHeight);top:expression(this.nextSibling.offsetTop);left:expression(this.nextSibling.offsetLeft);'/>");
		div.parentNode.insertBefore(iframe,div);
	}
}