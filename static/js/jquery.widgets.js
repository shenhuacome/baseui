// JavaScript Document

(function($) {
    //input
    $.fn.ui_input = function(setting) {
        var option = $.extend({}, setting);
        var type_Array = [ "text", "textarea", "password", "search" ];
        return this.each(function() {
            var _self = $(this);
            var _selfinfo = {
                name:_self.attr("name") ? _self.attr("name") :new Date().getTime(),
                id:_self.attr("id") ? _self.attr("id") :+new Date().getTime(),
                width:_self.outerWidth(),
                height:_self.outerHeight(),
                type:_self[0].type
            };
            var wrap = $("<span id='ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "' class='ui_input ui_input_" + _selfinfo.type + " ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "'><span class='ui_input_inner'></span></span>");
            if ($("#ui_input_" + _selfinfo.type + "_" + _selfinfo.id).size() <= 0) {
                if ($.inArray(_self[0].type, type_Array) != -1) _self.wrap(wrap);
                _self.bind("focus", function() {
                    _self.parents(".ui_input").addClass("ui_input_" + _selfinfo.type + "_focus");
                }).bind("blur", function() {
                    _self.parents(".ui_input").removeClass("ui_input_" + _selfinfo.type + "_focus");
                });
            }
        });
    };
    //select
	
    $.fn.ui_select = function(setting) {
        var type_Array = [ "select" ];
		var function_Array=['disabled','undisabled'];
		
        return this.each(function() {
					
			var cf={
				disabled:function(){
					_self.attr("disabled",'disabled').prev().addClass('ui_select_disabled');
					},
				undisabled:function(){
					_self.attr("disabled",false).prev().removeClass('ui_select_disabled');
				}
			}						  
            var _self = $(this);
            var _selfinfo = {
                name:_self.attr("name") ? _self.attr("name") :new Date().getTime(),
                id:_self.attr("id") ? _self.attr("id") :+new Date().getTime(),
                width:_self.outerWidth(),
                height:_self.outerHeight(),
                type:_self[0].type,
                option:$("option", _self),
                disabled:_self.attr("disabled")
            };	
			
			
			
            if (_self.data("event")) {
					
				switch (typeof setting)
				{
					case 'string':
					cf[setting]&&cf[setting]();
					break;
					case 'function':
					setting();
					break;
					case 'object':
					 var option = $.extend({},$.fn.ui_select.defaultset, setting);
					break;
					default:
					break;
				}
				return;
				
            } else {
				
				
				
                var _event = {
                    init:function() {
						
                        var disabled = _selfinfo.disabled ? "ui_select_disabled" :"";
                        var select_html = $("<span  id='ui_select_" + _selfinfo.id + "' class=' ui_select ui_select_" + _selfinfo.id + " " + disabled + "'><span class='ui_select_current'><i>" + _event.getSelectedOption(_self) + "</i><em></em></span><span class='ui_select_options'><dl>" + _event.getAllOptions(_selfinfo.option) + "</dl></span></span>");
                        _self.hide().before(select_html);
                        select_html.css({
                            width:_selfinfo.width
                        });
                        $(document).bind("click", function(e) {
                            if ($(e.target) != select_html) {
                                _event.hideOptions(select_html);
                                select_html.removeClass("ui_select_active");
                            }
                        });
                        $(".ui_select_current", select_html).bind("click", function(e) {
                            e.stopPropagation();
                            if (select_html.hasClass("ui_select_disabled")) {
                                return;
                            }
                            $(".ui_select").not(select_html).removeClass("ui_select_active").find(".ui_select_options").hide();
                            if (select_html.hasClass("ui_select_active")) {
                                _event.hideOptions(select_html);
                                select_html.removeClass("ui_select_active");
                            } else {
                                _event.showOptions(select_html);
                                select_html.addClass("ui_select_active");
                            }
                        });
                        $(".ui_select_options", select_html).css({
                            top:$(".ui_select_current", select_html).outerHeight(),
                            left:0
                        });
                        $(".ui_select_option", select_html).bind("click", function(e,callback) {
                            e.stopPropagation();
                            $(".ui_select_current i", select_html).html($(this).text());
                            _event.hideOptions(select_html);
                            select_html.removeClass("ui_select_active");
                            $(this).addClass("ui_select_selected").siblings().removeClass("ui_select_selected");
                            _self.val($(this).attr("data-value")).trigger("change");
							callback&&callback();
                        }).hover(function() {
                            $(this).addClass("ui_select_option_hover");
                        }, function() {
                            $(this).removeClass("ui_select_option_hover");
                        });
                    },
                    getAllOptions:function(opt) {
                        var html = "";
                        opt.each(function(i) {
                            var _s = $(this);
                            var select_sign = _s.attr("selected") == true ? "ui_select_selected" :"";
                            html += "<dd class='ui_select_option " + select_sign + "' data-value='" + _s.attr("value") + "'><span class='ui_select_option_con'>" + _s.html() + "</span></dd>";
                        });
                        return html;
                    },
                    getSelectedOption:function(_self) {
                        return _self.find("option:selected").text();
                    },
                    setOptions:function(_self) {},
                    changeOptions:function(_self) {},
                    showOptions:function(_s) {
                        var opts = $(".ui_select_options", _s);
                        var copt = $(".ui_select_current", _s);
                        if ($(window).height() - (_s.offset().top - $(window).scrollTop() + copt.outerHeight()) < opts.outerHeight()) {
                            opts.css({
                                top:-opts.outerHeight()
                            }).removeClass('ui_select_options_bottom').addClass('ui_select_options_top');
                        }else
						{
							opts.css({
                                top:copt.outerHeight()
                            }).removeClass('ui_select_options_top').addClass('ui_select_options_bottom');
						}
                        opts.show();
                    },
                    hideOptions:function(_s) {
                        $(".ui_select_options", _s).hide();
                    }
                };
				switch (typeof setting)
				{
					case 'string':
					_event.init();
					cf[setting]&&cf[setting]();
					break;
					case 'function':
					_event.init();
					setting();
					break;
					case 'object':
					 var option = $.extend({},$.fn.ui_select.defaultset, setting);
					 _event.init();
					break;
					default:
					_event.init();
					break;
				}
                _self.data("event", _event);
            }
        });
    };
	$.fn.ui_select.defaultset={width:200};
    //checkbox
    $.fn.ui_checkbox = function(setting) {
        var option = $.extend({}, setting);
        var type_Array = [ "checkbox" ];
	
		
        return this.each(function() {
            var _self = $(this);
			
			
			
            var _selfinfo = {
                name:_self.attr("name") ? _self.attr("name") :new Date().getTime(),
                id:_self.attr("id") ? _self.attr("id") :+new Date().getTime(),
                width:_self.outerWidth(),
                height:_self.outerHeight(),
                type:_self[0].type
            };
            var wrap = $("<span id='ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "' class='ui_input ui_input_" + _selfinfo.type + " ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "'><span class='ui_input_inner'></span></span>");
            if ($("#ui_input_checkbox" + _selfinfo.id).size() <= 0) {
                if ($.inArray(_self[0].type, type_Array) != -1) _self.wrap(wrap);
            }
            _self.bind("change", function(o) {
                _self.attr("checked") == "checked" ? _self.parents(".ui_input").addClass("ui_input_checkbox_checked") :_self.parents(".ui_input").removeClass("ui_input_checkbox_checked")
            }).attr('hidefocus',true);
        });
    };
    //radio
    $.fn.ui_radio = function(setting) {
        var option = $.extend({}, setting);
        var type_Array = [ "radio" ];
        return this.each(function() {
            var _self = $(this);
            var _selfinfo = {
                name:_self.attr("name") ? _self.attr("name") :new Date().getTime(),
                id:_self.attr("id") ? _self.attr("id") :+new Date().getTime(),
                width:_self.outerWidth(),
                height:_self.outerHeight(),
                type:_self[0].type
            };
            var nameclass = "ui_input_" + _selfinfo.type + "_" + _selfinfo.name;
            var wrap = $("<span id='ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "' class='ui_input ui_input_" + _selfinfo.type + " " + nameclass + " ui_input_" + _selfinfo.type + "_" + _selfinfo.id + "'><span class='ui_input_inner'></span></span>");
            if ($("#ui_input_radio" + _selfinfo.id).size() <= 0) {
                if ($.inArray(_self[0].type, type_Array) != -1) _self.wrap(wrap);
            }
            _self.bind("change", function(o) {
                $("." + nameclass).removeClass("ui_input_radio_checked");
                _self.parents(".ui_input").addClass("ui_input_radio_checked");
            }).attr('hidefocus',true);
        });
    };
	//card tips
	$.fn.cardTip=function(setting){
		var option=$.extend({dis:4,type:0,_split:" ",autowh:1},setting);
		return this.each(function(){
					 var _self = $(this);
					 var _selfinfo = {
						name:_self.attr("name") ? _self.attr("name") :new Date().getTime(),
						id:_self.attr("id") ? _self.attr("id") :+new Date().getTime(),
						width:_self.outerWidth(),
						height:_self.outerHeight(),
						offset:_self.offset(),
						type:_self[0].type
					};
					var _event={
						init:function(){
							_event._render();
							_event._bind_event();
							},
						_bind_event:function(){ 
							
							_self.bind('keyup focus',function(){
										var viewValue="";
										var _val=_self.val();
										var valueLen = _val.length;
										switch(option.type)
										{
											case 0:
											for(var i = 0; i < valueLen; i++){
										viewValue += _val.substring(4 * i,4 * (i + 1)) +option._split;
										}
											break;
											case 1:
											if(valueLen>=6&&valueLen<14)
											{
												viewValue= _val.substring(0,6) +option._split+_val.substring(6);
											}else
											{
												if(valueLen<6)
												{
													viewValue=_val;
												}
												else
												{
													viewValue= _val.substring(0,6) +option._split+_val.substring(6,14)+option._split+_val.substring(14);
												}
											}
											
											break;
											default:
											break;
										}
									_event._setHtml(viewValue);	
									_event._setPostion();
									_val!=""?_event._showTip():_event._hideTip()
									
									
							}).bind('blur',function(){
								_event._hideTip()
							})
						},
						_render:function(){
							if(!$("#ui_cardTip_box_"+_selfinfo.id)[0])
							{
								var cardTipbox=$("<div id='ui_cardTip_box_"+_selfinfo.id+"' class='ui_cardTip_box ui_cardTip_box"+_selfinfo.id+"'><em class='ui_cardTip_box_ico'></em><div class='ui_cardTip_box_content'></div></div>");
							if(option.autowh){
                                cardTipbox.outerWidth(_selfinfo.width);
                            }
                            cardTipbox.appendTo($("body"));
							}
						},
						_setHtml:function(html){
							$(".ui_cardTip_box_content",$("#ui_cardTip_box_"+_selfinfo.id)).html(html);
						},
						_setPostion:function(){
							var tipbox=this._getTipbox();
							tipbox.css({left:_selfinfo.offset.left,top:_selfinfo.offset.top-tipbox.outerHeight()});
						},
						_showTip:function(){
							var tipbox=this._getTipbox();
							tipbox.show();
							},
						_hideTip:function(){
							var tipbox=this._getTipbox();
							tipbox.hide();
						},
						_getTipbox:function(){
							return $("#ui_cardTip_box_"+_selfinfo.id);
							}
					}
					_event.init()
		})
	}
    $(function() {});
})(jQuery);


(function($){
        $.fn.ui_tab=function(setting){
            var options=$.extend({init:0,e:'hover'},setting);
            return this.each(function(){
                
                function show_tab(i)
                {
                    _tab_items.eq(i).addClass("on").siblings().removeClass("on");
                    _tab_cnts.eq(i).show().siblings().hide();
                }
                function  getIndex(o)
                {
                    var _index=_tab_items.index(o);
                    show_tab(_index);
                }
                var _self=$(this);
                var _tab_items=$(".ui_tab_items li",_self);
                var _tab_cnts=$(".ui_tab_cnts .ui_tab_cnt_box",_self);
                switch (options.e)
                {
                    case 'hover':
                    _tab_items.hover(function(){
                        getIndex($(this));
                        
                        },function(){})
                    break;
                    case 'click':
                    _tab_items.bind('click',function(){
                        getIndex($(this));
                        
                    })
                    
                    break;
                    case 'dblclick':
                    _tab_items.dblclick(function(){
                        getIndex($(this));
                        
                    });
                    break;
                    default:
                    _tab_items.hover(function(){
                        getIndex($(this));
                    },function(){})
                    
                }
                options.init=options.init>=_tab_items.length?_tab_items.length-1:options.init;
                show_tab(options.init);
            })
        }
})(jQuery);


(function($) {
    $.fn.placeholder = function(setting) {
        var option = $.extend({
            text:"请输入..."
        }, setting), support = "placeholder" in document.createElement("input");
        return this.each(function() {
            if (support) return;
            var self = $(this),_float=self.css("float"),height=self.outerHeight(),fontSize=self.css("fontSize");;
            if (self.data("placeholder") == undefined) {
                var text = self.attr("placeholder"), type = self[0].tagName.toLowerCase();
                self.wrap("<span style='_height:"+height+"px' class='placeholder_wrap placeholder_wrap_"+_float+" placeholder_wrap_" + type + "'></span>");
                var tip = $("<span class='placeholder_tip' ></span>");
                var namecss = self.attr("name") || self.attr("id")? self.attr("name") || self.attr("id") + "_tip_style" :"custom_tips_style";
                tip.addClass(namecss).html("<em>" + text + "</em>").appendTo(self.parents(".placeholder_wrap")).css({fontSize:fontSize});

                if (self.val() != "") {
                    tip.hide();
                }
                self.blur(function() {
                    if (self.val() == "") {
                        tip.show();
                    }
                });

                //ie9 bug
                if(/*@cc_on!@*/false){

                    self[0].attachEvent("onpropertychange",function(){
                        if(self.val()!=""){
                             tip.hide();
                        }
                       
                    })
                }
                self.focus(function() {
                    tip.hide();
                });
                self.change(function() {
                    tip.hide();
                });
                tip.bind("click", function() {
                    self.trigger("focus");
                });
                self.data("placeholder", "true");
            }
        });
    };
})(jQuery);


/**
 * 数字转中文
 * @param dValue
 * @returns
 */
function chineseNumber(dValue) {
    var maxDec = 2;
    // 验证输入金额数值或数值字符串：
    dValue = dValue.toString().replace(/,/g, "");
    dValue = dValue.replace(/^0+/, ""); // 金额数值转字符、移除逗号、移除前导零
    if (dValue == "") {
        return "零元整";
    } // （错误：金额为空！）
    else if (isNaN(dValue)) {
        return "错误：金额不是合法的数值！";
    }
    var minus = ""; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
    var CN_SYMBOL = ""; // 币种名称（如“人民币”，默认空）
    if (dValue.length > 1) {
        if (dValue.indexOf('-') == 0) {
            dValue = dValue.replace("-", "");
            minus = "负";
        } // 处理负数符号“-”
        if (dValue.indexOf('+') == 0) {
            dValue = dValue.replace("+", "");
        } // 处理前导正数符号“+”（无实际意义）
    }
    // 变量定义：
    var vInt = "";
    var vDec = ""; // 字符串：金额的整数部分、小数部分
    var resAIW; // 字符串：要输出的结果
    var parts; // 数组（整数部分.小数部分），length=1时则仅为整数。
    var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
    var zeroCount; // 零计数
    var i, p, d; // 循环因子；前一位数字；当前位数字。
    var quotient, modulus; // 整数部分计算用：商数、模数。
    // 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
    var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）
    parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
    if (parts.length > 1) {
        vInt = parts[0];
        vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分
        if (NoneDecLen) {
            maxDec = vDec.length > 5 ? 5 : vDec.length;
        } // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
        var rDec = Number("0." + vDec);
        rDec *= Math.pow(10, maxDec);
        rDec = Math.round(Math.abs(rDec));
        rDec /= Math.pow(10, maxDec); // 小数四舍五入
        var aIntDec = rDec.toString().split('.');
        if (Number(aIntDec[0]) == 1) {
            vInt = (Number(vInt) + 1).toString();
        } // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
        if (aIntDec.length > 1) {
            vDec = aIntDec[1];
        } else {
            vDec = "";
        }
    } else {
        vInt = dValue;
        vDec = "";
        if (NoneDecLen) {
            maxDec = 0;
        }
    }
    if (vInt.length > 44) {
        return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";
    }
    // 准备各字符数组 Prepare the characters corresponding to the digits:
    digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); // 零~玖
    radices = new Array("", "拾", "佰", "仟"); // 拾,佰,仟
    bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
    decimals = new Array("角", "分", "厘", "毫", "丝"); // 角/分/厘/毫/丝
    resAIW = ""; // 开始处理
    // 处理整数部分（如果有）
    if (Number(vInt) > 0) {
        zeroCount = 0;
        for (i = 0; i < vInt.length; i++) {
            p = vInt.length - i - 1;
            d = vInt.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    resAIW += digits[0];
                }
                zeroCount = 0;
                resAIW += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) {
                resAIW += bigRadices[quotient];
            }
        }
        resAIW += "元";
    }
    // 处理小数部分（如果有）
    for (i = 0; i < vDec.length; i++) {
        d = vDec.substr(i, 1);
        if (d != "0") {
            resAIW += digits[Number(d)] + decimals[i];
        }
    }
    // 处理结果
    if (resAIW == "") {
        resAIW = "零" + "元";
    } // 零元
    if (vDec == "") {
        resAIW += "整";
    } // ...元整
    resAIW = CN_SYMBOL + minus + resAIW; // 人民币/负......元角分/整
    return resAIW;
}

/**
 * 中文转数字
 * @param num
 * @returns
 */
function aNumber(num) {
    var numArray = new Array();
    var unit = "亿万元$";
    for ( var i = 0; i < unit.length; i++) {
        var re = eval("/" + (numArray[i - 1] ? unit.charAt(i - 1) : "") + "(.*)" + unit.charAt(i) + "/");
        if (num.match(re)) {
            numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾");
            numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function($1) {
                return "零壹贰叁肆伍陆柒捌玖".indexOf($1);
            });
            numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function($1) {
                return "*" + Math.pow(10, "分角 拾佰仟 ".indexOf($1) - 2) + "+"
            }).replace(/^\*|\+$/g, "").replace(/整/, "0");
            numArray[i] = "(" + numArray[i] + ")*" + Math.ceil(Math.pow(10, (2 - i) * 4));
        } else
            numArray[i] = 0;
    }
    return eval(numArray.join("+"));
}



