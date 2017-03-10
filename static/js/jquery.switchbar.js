/*
插件名称：UISwitchBarPlugin
插件版本：1.0
插件创建日期：2015年08月18日
插件更新日期：2015年08月18日
插件作者：马超群
*/

var UISwitchBarPlugin=function(){
    'use strict';
    (function($){
        $.fn. UISwitchBar = function (method) {
            //定义控件名称
            var pluginName="UISwitchBar";
            var self = this;

            //默认参数
            var settings = {
                text:"",
                status:'off'
            };
            
            //内部方法
            var main={                
                setHtml:function(){

                    var opts=$(self).data("options"),
                        onClass=(opts.status=="on")?"on":"",
                        value=(opts.status=="on")?"1":"0",
                        html=   '<span class="switch-bar '+onClass+'" m-value="'+value+'">'
                                +'    <span class="switch-btn">'
                                +'        <span class="switch-btn-bg"></span>'
                                +'        <span class="switch-btn-item"></span>'
                                +'    </span>'
                                +'    <span class="switch-text">'+opts.text+'</span>'
                                +'</span>';
                    $(self).append(html);
                },
                events:function(){
                    $(self).on('click',function(){
                        var obj=$(self).find(".switch-bar");
                        obj.toggleClass('on');
                        if(obj.hasClass('on')){
                            obj.attr("m-value",1);
                        }else{
                            obj.attr("m-value",0);
                        }
                    });
                }
                
            };

            //暴露方法的集合
            var methods = {
                init:function(options){
                    var opts = $.extend({}, settings, options||{});
                    $(self).data("options",opts);
                    return self.each(function(){
                       main.setHtml();
                       main.events();

                        // 初始化完后引用回调函数
                        if (typeof opts.callback == 'function') { // 确保类型为函数类型
                            opts.callback.call(this); // 执行回调函数
                        }
                    });
                        
                },
                value:function(){
                    return $(self).find(".switch-bar").attr("m-value");
                },
               
                //销毁控件
                destroy : function() { 
                    return self.each(function(){
                        // Namespacing FTW  
                        $(window).unbind('.'+pluginName);               
                        $(self).removeData(pluginName);
                    })
                }
            }

            if ( methods[method] ) {  
                return methods[method].apply( this, Array.prototype.slice.call( arguments,1));  
            } else if ( typeof method === 'object' || ! method ) {  
                return methods.init.apply( this, arguments );
            } else {  
                alert( pluginName+'控件中不存在名为：' +  method + ' 的方法或属性！' );  
            };

        };

    })(jQuery);
}


// requirejs support
if (typeof define === 'function' && define.amd) {
   
    define(["jquery"],function ($) {
            'use strict';
            return new UISwitchBarPlugin();
        }
    );
}else{
    new UISwitchBarPlugin();
}




