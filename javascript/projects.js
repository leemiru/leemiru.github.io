	// /*======작업물 나열 구간======*/
	// allProjects();
	
	// function allProjects() {
	// 	let masterpieces = 6; //작품의 최신 개수로 업데이트
	// 	let count = masterpieces + 1;
	// 	const gallery = $('.gallery');
	// 	for (count>1; count--;) {
	// 		if (count>0) {
	// 			const frame = document.createElement('span');
	// 			gallery.append(frame);
	// 			frame.className="project-frame";
				
	// 			const sub = document.createElement('a');
	// 			frame.append(sub);
				
	// 			sub.className="image-frame";
	// 			sub.id = "image-" + count;
				
	// 			$('#image-'+count).css('background', 'url("./images/posts/19-'+ count +'/thumb.png") center no-repeat');
	// 			$('#image-'+count).attr('href', './images/posts/19-'+ count +'/desc.html');
	// 			var title = $('#image-'+count);
				
	// 			//JSON Array
	// 			var jsondata = './images/posts/19-'+ count +'/data.json';
	// 			$.getJSON(jsondata, function(title) { return (data) => {
	// 				title.html('<p class="image-frame-title">'+JSON.stringify(data.index)+'</p>');
	// 			}}(title));;
				
	// 		}
	// 	}
		
	// }