var $overlay_load = $('#overlay-load');

var count = 1,
allocations = new Array(1, 2, 3, 6, 9, 8, 7, 4),
animate = setInterval(function () {
        $("#loader b").css("background", "white");
        $("#loader b:nth-child(" + allocations[count] + ")").css(
			"background",
			"black"
        );
        count++;
        if (count == 8) {
			count = 1;
		}
	}, 150);

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
	setTimeout(function(){
		$overlay_load.fadeOut('slow');
	}, 1500);
}