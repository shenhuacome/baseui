
(function($){
		$.fn.Hs_Tab=function(setting){
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
				var _tab_items=$(".hs_tab_items li",_self);
				var _tab_cnts=$(".hs_tab_cnts .hs_tab_cnt_box",_self);
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
})(jQuery)