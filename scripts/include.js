function _includeFile(){


	var protocol=window.location.protocol.replace(":",""),protocolType=0;
	if(protocol.toLowerCase()=="file"){
		protocolType=1;
		console.log(window.location)
	}

	$("[load-page]").each(function(){
		var _self=$(this),page=_self.attr('load-page');
		if(page){
			_self.html("正在加载"+page).load(page,function(response,status,xhr){
				if(xhr.statusText=="error"&&protocolType==1){
					alert('请以http形式访问该页面!');
					return;
				}
			});
		}

	});
}
$(function(){
	_includeFile();
})