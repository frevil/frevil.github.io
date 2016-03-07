function init_content_wrap(){
	preventScroll("nav_left");
	preventScroll("content_wrap");
}
function preventScroll(id){  
    var _this = document.getElementById(id)||document.getElementsByClassName(id)[0];  
    if(navigator.userAgent.indexOf("Firefox")>0){  
        _this.addEventListener('DOMMouseScroll',function(e){  
            _this.scrollTop += e.detail > 0 ? 60 : -60;     
            e.preventDefault();  
        },false);   
    }else{  
        _this.onmousewheel = function(e){     
            e = e || window.event;     
            _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;     
            return false;  
        };  
    }  
    return this;  
} 
