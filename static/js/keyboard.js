$.fn._keyBoard = function(options) {
    var config = {
        prevKeys:[ "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "|", "-", "`" ],
        nextKeys:[ "=", "\\", "{", "}", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "<", ">", "?", "a", "s", "d", "f", "g", "h", "j", "k", "l", "'", ",", ".", "/", "z", "x", "c", "v", "b", "n", "m", ":", '"', ";" ],
        numbers:[ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ]
    };
    var options=$.extend({type:1},options);
    return this.each(function() {
        var _self = $(this), _selfID = _self.attr("id");
        if(_self.data("_keyBoard")==undefined)
        	{
        		
        		var _keyBoard = {
            keyboardBox:null,
            init:function() {
               
                    var keyboardBox = $(_keyBoard.render());
                    keyboardBox.appendTo("body").on("click", function(e) {
                        e.stopPropagation();
                    }).hide();
                    _keyBoard.keyboardBox =keyboardBox;
                    _keyBoard.bindevent();
                
            },
            bindevent:function() {
                _self.on("click", function(e) {
                    e.stopPropagation();
                });

                _self.on("keydown",function(){
                	 _keyBoard.hide();
                })

                _self.on('focus',function(){
                	$(".keyboard").hide();
                	_keyBoard.show();
                })
                $(document).on("click", function() {
                    _keyBoard.hide();
                });

                _keyBoard.keyboardBox.on('mousedown',function(e){
                	var target=$(e.target);
                	target.addClass('key-active')
                }).on('mouseup',function(e){
                	var target=$(e.target);
                	target.removeClass('key-active')
                })

               _keyBoard.keyboardBox.on("click",".change-u-l",function() {
                   
                    var _self = $(this);
                    if (_self.hasClass("tolower")) {
                        _self.removeClass("tolower");
                        $(".li-nextKeys",_keyBoard.keyboardBox).each(function() {
                            var html = $(this).html().toUpperCase();
                            $(this).html(html);
                        });
                    } else {
                        _self.addClass("tolower");
                        $(".li-nextKeys",_keyBoard.keyboardBox).each(function() {
                            var html = $(this).html().toLowerCase();
                            $(this).html(html);
                        });
                    }
                });
               _keyBoard.keyboardBox.on("click", ".sure-btn",function() {
                    _keyBoard.hide();
                });

                _keyBoard.keyboardBox.on("click", ".display ul li", function() {
                    var html = $(this).text(), value = _self.val();
                    _self.val(value + html);
                });


                _keyBoard.keyboardBox.find(".delete-letter").bind("click", function() {
                    var value = _self.val(), newValue = value.substring(0, value.length - 1);
                    _self.val(newValue);
                });
                _keyBoard.keyboardBox.find(".space-btn").bind("click", function() {
                    var value = _self.val();
                    _self.val(value + " ");
                });
            },
            show:function() {
            	 var position = {
                    left:_self.offset().left,
                    top:_self.offset().top + _self.outerHeight()
                };
                _keyBoard.keyboardBox.css({
                        top:position.top,
                        left:position.left
                    }).show();
            },
            hide:function() {
                _keyBoard.keyboardBox.hide();
            },
            getPosition:function(_self) {
                return _self.offset();
            },
            getRandomArray:function(array){

                var b=[],c=[];
                for(var i=0;i<array.length;i++)
                {
                    c[i]=array[i];
                }
                
                 while(c.length) {
                b.push(c.splice(parseInt(Math.random() * c.length), 1)[0]);
                }
                return b;
            },
            render:function() {

                var number=_keyBoard.getRandomArray(config.numbers);
                var prevKeys = "", nextKeys = "", numbers = "";
                for (var i = 0; i < config.prevKeys.length; i++) {
                	prevKeys += "<li class='li-prevKeys'><a href=javascript:;>" + config.prevKeys[i] + "</a></li>";
                }
                for (var i = 0; i < config.nextKeys.length; i++) {
                    nextKeys += "<li class='li-nextKeys'><a href=javascript:;>" + config.nextKeys[i].toUpperCase() + "</a></li>";
                }
                for (var i = 0; i < number.length; i++) {
                    numbers += "<li class='li-numbers'><a href=javascript:;>" + number[i] + "</a></li>";
                }
                var id = _selfID ? "keyboard-" + _selfID :"";
            
                switch(options.type)
                {
                    case 0:
                     var keyboardBox = '<div class="keyboard keyboard_number" id="' + id + '"><div class="caption"><a href="javascript:;" class="delete-letter">删除</a></div><div class="display"><ul>'  + numbers  + '</ul></div><div class="key-bottom"><a href="javascript:;" class="sure-btn">确定</a></div></div>';
                    break;
                    case 1:
                     var keyboardBox = '<div class="keyboard keyboard_letter" id="' + id + '"><div class="caption"><a href="javascript:;" class="change-u-l">切换大小写</a> <a href="javascript:;" class="delete-letter">删除</a></div><div class="display"><ul>' + prevKeys + numbers + nextKeys + '</ul></div><div class="key-bottom"><a href="javascript:;" class="space-btn">空格</a><a href="javascript:;" class="sure-btn">确定</a></div></div>';
                    break;
                }

                return keyboardBox;
            }
        };
        _keyBoard.init();
        _self.data("_keyBoard",_keyBoard);
        	}
            else{
        		
        		if(typeof(options)=="string")
        		{
        			
        		}

        	}


       
    });
};