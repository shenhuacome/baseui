(function($) {
    $.fn.placeholder = function(setting) {
        var option = $.extend({
            text:"请输入..."
        }, setting), support = "placeholder" in document.createElement("input");
        return this.each(function() {
            if (support) return;
            var self = $(this),_float=self.css("float"),height=self.outerHeight(),fontSize=self.css("fontSize");
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