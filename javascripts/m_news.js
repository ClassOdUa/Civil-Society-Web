var NEWS = {
	news_list: [],
	news_last_item: 0,
	news_busy: 0,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		var l_rnd = Math.random();

		if(NEWS.news_busy == 0){
			NEWS.news_busy = l_rnd;
			if(NEWS.news_busy == l_rnd){
				$.ajax({
					url: mainURL + '/news.php?ls=' + NEWS.news_last_item,
					type: "GET",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					complete: function(p_response){
						//console.log(response);
						var l_news_json = $.parseJSON(p_response.responseText);
						var l_dbl = 0;
						if(l_news_json.length > 0){

							//TODO: find better way to omit doubles!

							l_news_json = LIST_OF_ITEM.concat_omit_doubles(NEWS.news_list, l_news_json);
							NEWS.news_list = NEWS.news_list.concat(l_news_json);
							NEWS.news_last_item += l_news_json.length;
							NEWS.build_elements(l_news_json);
						}
						$.mobile.loading( "hide" );	
					},
				});
				NEWS.news_busy = 0;
			}
		}
		// console.log(NEWS.news_list.length);
		// console.log(NEWS.news_list);

	},
	build_elements: function(p_build_array){
		var self = this;
		var elements_string = '';
		var image_news = '<div class="img news_img_list"></div>';


		jQuery.each(p_build_array, function(i, one_news) {
			image_news = '<div class="img news_img_list"></div>';

			$('[news_id=' + one_news.id + ']').remove();
			if( one_news.icon_num == 0 ){
				var icon_news = 'news-icon news-icon-' + (parseInt(one_news.icon_type));
			}else{
				var icon_news = 'news-icon news-icon-num-' + (parseInt(one_news.icon_num));
			}

			if(one_news.img){
				image_news = '<div class="img" style="background: url(\'..' + one_news.img + '\' ); background-size: cover;"></div>';
			}

			elements_string += '<div news_id="' + one_news.id + '" news_type="' + one_news.type + '" news_link="' + one_news.link + '" class="item news-item ui-corner-all ' + icon_news + '">\
									' + image_news + '\
									<div class="info">\
										<div class="date">\
											' + one_news.dt + '\
										</div>\
										<div class="title">\
											' + one_news.news + '\
										</div>\
										<div class="author">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.news_by[CURRENT_LANG] + '</span> <strong>' + one_news.by + '</strong>\
										</div>\
									</div>\
								</div>';

		});

		$('.right_col').html(LOCALE_ARRAY_ADDITIONAL.news_right[CURRENT_LANG]);

		$('#news-page #news_list').append(elements_string);
	},
	events: function(){

		$('body').on('click', '.news-item', function(){
			switch( parseInt($(this).attr('news_type')) ){
				case 1:
					$.mobile.navigate('#vote-page?vote=' + $(this).attr('news_link'));
					break;
				case 2:
					$.mobile.navigate('#program-page?program=' + $(this).attr('news_link'));
					break;
				case 3:
					$.mobile.navigate('#project-page?project_proposition=' + $(this).attr('news_link'));
					break;
				case 4:
					$.mobile.navigate('#project-page?project=' + $(this).attr('news_link'));
					break;
				case 5:
					$.mobile.navigate('#request-page?request=' + $(this).attr('news_link'));
					break;
				case 6:
					$.mobile.navigate('#weighted-vote-page?vote=' + $(this).attr('news_link'));
					break;
			}
		});

	},
}; 