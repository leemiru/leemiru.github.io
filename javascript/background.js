$(function(){
	includeLayout();
}); 

function includeLayout(){ 
	var includeArea = $('[data-include]'); 
	var self, url; 
	$.each(includeArea, function() { 
		self = $(this); 
		url = self.data("include"); 
		self.load(url, function() { 
			self.removeAttr("data-include"); 
		}); 
	}); 
	
	completeLoad();
}

function completeLoad() {
	// setTimeout(function(){
	// 	$overlay_load.fadeOut('slow');
	// }, 1500);
}