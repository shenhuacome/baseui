/*
插件名称：UIChangeNumPlugin
插件版本：1.0
插件创建日期：2015年08月21日
插件更新日期：2015年08月21日
插件作者：马超群
*/

var UIChangeNumPlugin=function(){
    'use strict';
    (function($){
        $.fn. UIChangeNum = function (method) {
            //定义控件名称
            var pluginName="UIChangeNum";
            var self = this;

            //默认参数
            var settings = {
                value:"0",
                num:1,
                minNum:'',
                maxNum:'',
                positive:true
            };
            
            //内部方法
            var main={                
                setHtml:function(){

                    var opts=$(self).data("options"),                        
                        html=   '<ul class="change-num clear">'
                                +'    <li class="change-num-minus" onselectstart="return false;">-</li>'
                                +'    <li class="change-num-text"><input type="text" value="'+opts.value+'"></li>'
                                +'    <li class="change-num-add" onselectstart="return false;">+</li>'
                                +'</ul>';
                    $(self).append(html);
                },
                events:function(){
                    var opts=$(self).data("options");

                    $(self).find(".change-num-minus").on('click',function(){
                        var value=parseInt($(self).find("input").val(),10);
                        if(value > 0 || positive==false){
                            if(opts.minNum!=''){
                                if(value > opts.minNum){
                                    value=value-parseInt(opts.num,10);
                                }
                            }else{
                                value=value-parseInt(opts.num,10);
                            }                            
                        }
                        $(self).find('input').val(value);
                    });

                    $(self).find(".change-num-add").on('click',function(){
                        var value=parseInt($(self).find("input").val(),10);
                        if(opts.maxNum!=""){
                            if(value < opts.maxNum){
                                value=value+parseInt(opts.num,10);
                            }
                        }else{
                            value=value+parseInt(opts.num,10);
                        }
                        $(self).find('input').val(value);
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
                    return $(self).find('input').val();
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
            return new UIChangeNumPlugin();
        }
    );
}else{
    new UIChangeNumPlugin();
}




