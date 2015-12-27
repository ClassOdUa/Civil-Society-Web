var WEIGHTED_VOTINGS = {
	votings_array: [],
	voters_list: [],
	voting_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		if(location.href.indexOf('#weighted') > -1){
			self.activated_easy_filter = 0;
			self.activated_hard_filter = 0;
			self.sphere_filter = 0;
			self.voting_last_item = 10;
			$('#weighted-votings-page #searched_string').val('');

			$.mobile.loading( "show", {theme: "z"});

			if(location.href.indexOf('#weighted-votings-page?program=') > -1){
				var match_array = location.href.match(/#weighted-votings-page\?program=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);

				PROGRAMS.last_opened_id = object_id;
				$("#wv-list-back").attr('program', object_id);
				$("#wv-list-back").attr('back_url', '#program-page?program=' + object_id);

				var url = mainURL + '/weighted_votings.php?program_id=' + object_id;
				$('#weighted-votings-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.weighted_votings[CURRENT_LANG]);
				$('#weighted-votings-page #create_voting_link').attr('style','display: block');
				$('#weighted-votings-page #create_voting_link').attr('onclick', "$.mobile.navigate(\'#create-item?weighted_voting=true&item=" + object_id + "\')");
				$('#weighted-votings-page').attr('program_id', object_id);


			}else{
				if(location.href.indexOf('#weighted-votings-page?my=1') > -1){
					$('#weighted-votings-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.my_weighted_votings[CURRENT_LANG]);
					$('#weighted-votings-page #create_voting_link').attr('style','display: none');
					var url = mainURL + '/weighted_votings.php?my=1';
				}else if(location.href.indexOf('#weighted-votings-page?my=2') > -1){
					$('#weighted-votings-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.weighted_votings[CURRENT_LANG]);
					$('#weighted-votings-page #create_voting_link').attr('style','display: block');
					var url = mainURL + '/weighted_votings.php?my=2';
				}
			}
			if(location.href.indexOf('#weighted-vote-page?vote=') > -1){
				var match_array = location.href.match(/#weighted-vote-page\?vote=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = mainURL + '/weighted_votings.php?id=' + object_id;
			}

			$.ajax({
				url: url,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					////console.log(response);
					self.votings_array = $.parseJSON( response.responseText );
					if(self.votings_array.length == 0 && self.activated_hard_filter == 1){
						alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
					}	
					//console.log( self.votings_array );
					self.check_current_url( 1 );
					self.build_elements();
					$('#weighted-votings-page #activated_filter').css('display', 'none'); 
					$('#weighted-votings-page #solo_filter').css('display', 'block');
					$.mobile.loading( "hide" );
 	
				},
			});

			self.events();
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		//console.log(name_sphere);
		self.activated_easy_filter = 1;
		if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			//console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
			$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}
		$.mobile.loading( "show", {theme: "z"});

		var url = mainURL + '/weighted_votings.php?';

		switch($('#weighted-votings-page [name=sort]').val()){
			case "Sort by newest":
				url += '?sort=0';
				break;
			case "Sort by stars":
				url += '?sort=1';
				break;
			case "Sort by supported":
				url += '?sort=2';
				break;	
		}

		if($('#weighted-votings-page #searched_string').val() != ""){
			url += '&filter=' + $('#weighted-votings-page #searched_string').val();
		}
		

		
		switch($('#weighted-votings-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
		}

		if(self.activated_hard_filter){
			var start_date = $('#filter-page [name=start_year]').val() + "-" 
							+ $('#filter-page [name=start_month]').val() + "-" 
							+ $('#filter-page [name=start_date]').val();
			var end_date = $('#filter-page [name=end_year]').val() + "-" 
						+ $('#filter-page [name=end_month]').val() + "-" 
						+ $('#filter-page [name=end_date]').val();
			url += '&start=' + start_date + '&finish=' + end_date;
		}

		if(reinit){
			url += '&ls=' + self.voting_last_item;
			self.voting_last_item += 10;	
		}else{
			self.voting_last_item = 10;
		}

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				////console.log(response);
				self.votings_array = $.parseJSON( response.responseText );	
				self.check_current_url( 1 );
				if(reinit){
					self.build_elements( "", true );	
				}else{
					self.build_elements();	
				}
				if(self.votings_array.length == 0 && reinit != 1 && self.activated_hard_filter == 1){
					alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
				}
				$.mobile.loading( "hide" );
			},
		});
	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			if(location.href.indexOf('#weighted-votings-page?program=') > -1){
				var match_array = location.href.match(/#weighted-votings-page\?program=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = mainURL + '/weighted_votings.php?program_id=' + object_id + '&ls=' + self.voting_last_item;
				$('#weighted-votings-page #ui_title').html('Weighted votings');
				$('#weighted-votings-page #create_link').attr('style','display: none');
				var return_to = '#program-page?program=' + object_id;
			}else{
				$('#weighted-votings-page #ui_title').html('My weighted votings');
				$('#weighted-votings-page #create_link').attr('style','display: block');
				var url = mainURL + '/weighted_votings.php?my=1&ls=' + self.voting_last_item;
			}

			$.mobile.loading( "show", {theme: "z"});
			$.ajax({
				url: url,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
						////console.log(response);
					
						var query_array = $.parseJSON( response.responseText );	
						//console.log( self.votings_array );
						if(query_array.length > 0){
							self.votings_array = self.votings_array.concat(query_array);
							self.voting_last_item += query_array.length;
							//self.check_current_url( 1 );
							self.build_elements( 0, true,query_array);
						}
						$.mobile.loading( "hide" );	 
				},
			});
		}
	},
	build_elements: function(ready_array, reinit, reinit_array){
		var self = this;
		var elements_string = '';
		if(ready_array){
			var build_array = FILTERS.filtered_array;
		}else{
			var build_array = self.votings_array;
		}
		if(reinit_array){
			build_array = reinit_array;
		}
		jQuery.each(build_array, function(i, one_voting) {
			switch(one_voting.status){
				case '1':
					elements_string += self.collect_supports_build(one_voting);
					break;
				case '0':
					elements_string += self.voting_period_build(one_voting);
					break;
				case '2':
					elements_string += self.finished_voting_build(one_voting);
					break;
				case '3':
					elements_string += self.not_supported_build(one_voting);
					break;
			}
		});
		if(reinit){
			$('#weighted-votings-page #votings_list').append(elements_string);
		}else{
			$('#weighted-votings-page #votings_list').html(elements_string);
		}
	},
	stars_action: function(current_star){
		//$('.stars-wrap span').on('click', function(){
			var star = $(current_star);
			var allStar = star.parent().find('span');
			var val = star.index();
			var vote_id = $(current_star).data('vote_id');

			if (star.hasClass('active') && !star.next().hasClass('active')) {
				allStar.removeClass('active');
				$.ajax({
					url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=0&obj=6",
					type: "GET",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					complete: function( response ){
						
					}
				});
				return false;
			}

			$.ajax({
				url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=6",
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					
				}
			});

			star.siblings().removeClass('active');

			for (var i = 0; i <= val; i++) {
				allStar.eq(i).addClass('active');
			}
	 // });
	},
	collect_supports_build:function(one_voting){
		var self = this;
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-supporters" style = "cursor: pointer" onclick = "WEIGHTED_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
								<div class="img">\
									<img src="' + mainURL + one_voting.img + '" />\
								</div>\
								<div class="info">\
									 <div class="title">\
										ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.name + '</strong>\
									</div>\
									<div class="status">\
										<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + '</span> <span>' + one_voting.sprtf + '</span>\
									</div>\
								</div>\
							</div>';
		return part_ui_string;
	},
	voting_period_build:function(one_voting){
		var self = this;
		var percents_object = self.get_percents_values(one_voting.vote_yes, one_voting.vote_nth, one_voting.vote_no);
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + '" style = "cursor: pointer" onclick = "WEIGHTED_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
								<a href="#">\
									<div class="img">\
										<img src="' + mainURL + one_voting.img + '" />\
									</div>\
									<div class="info">\
										<div class="title">\
											ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.name + '</strong>\
										</div>\
										<div class="status">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.time_voting[CURRENT_LANG] + '</span> <span>' + one_voting.start + '</span> - <span>' + one_voting.finish + '</span>\
										</div>\
										<div class="total-count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.all_voters[CURRENT_LANG] + '</span> <strong>' + percents_object.sum_values + '</strong>\
										</div>\
										<div class="voting-line clearfix">\
											<span class="left" style="width: ' + parseInt(percents_object.plus_percent) + '%">' + parseInt(one_voting.vote_yes) + '</span><span class="middle" style="width: ' 
																			 + parseInt(percents_object.abstained_percent) + '%">' + parseInt(one_voting.vote_nth) + '</span><span class="right" style="width: ' 
																			 + parseInt(percents_object.minus_percent) + '%">' + parseInt(one_voting.vote_no) + '</span>\
										</div>\
									</div>\
								</a>\
							</div>';
		return part_ui_string;
	},
	finished_voting_build:function(one_voting){
		var self = this;
		var percents_object = self.get_percents_values(one_voting.vote_yes, one_voting.vote_nth, one_voting.vote_no);
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-completed" style = "cursor: pointer" onclick = "WEIGHTED_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
								<a href="#">\
									<div class="img">\
										<img src="' + mainURL + one_voting.img + '" />\
									</div>\
									<div class="info">\
										<div class="title">\
											ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.name + '</strong>\
										</div>\
										<div class="status">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.voting_finished[CURRENT_LANG] + '</span>\
										</div>\
										<div class="total-count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.all_voters[CURRENT_LANG] + '</span> <strong>' + percents_object.sum_values + '</strong>\
										</div>\
										<div class="voting-line clearfix">\
											<span class="left" style="width: ' + parseInt(percents_object.plus_percent) + '%">' + parseInt(one_voting.vote_yes) + '%</span><span class="middle" style="width: ' 
																			 + parseInt(percents_object.abstained_percent) + '%">' + parseInt(one_voting.vote_nth) + '%</span><span class="right" style="width: ' 
																			 + parseInt(percents_object.minus_percent) + '%">' + parseInt(one_voting.vote_no) + '%</span>\
										</div>\
									</div>\
								</a>\
							</div>';
		return part_ui_string;
	},
	not_supported_build:function(one_voting){
		var self = this;
		var percents_object = self.get_percents_values(one_voting.vote_yes, one_voting.vote_nth, one_voting.vote_no);
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-canceled" style = "cursor: pointer" onclick = "WEIGHTED_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
								<div class="img">\
									<img src="' + mainURL + one_voting.img + '" />\
								</div>\
								<div class="info">\
									<div class="title">\
										ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.name + '</strong>\
									</div>\
									<div class="status">\
										<span>' + LOCALE_ARRAY_ADDITIONAL.voting_canceled[CURRENT_LANG] + '</span>\
									</div>\
								</div>\
							</div>';
		return part_ui_string;
	},
	current_vote_page_collect_supports: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		for (var k = 0; k < SPHERES.spheres.length; k++) {
			if(SPHERES.spheres[k].type == parseInt( data_for_build.type ) ){
				var type_sphere = SPHERES.spheres[k].name;
				break;
			}
		}

		if(SUPER_PROFILE.id == data_for_build.author_id && data_for_build.vote_no == "0" && data_for_build.vote_nth == "0" && data_for_build.vote_yes == "0"){
			var delete_button = '<div class="delete_vote_button">\
									<a onclick = "WEIGHTED_VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#weighted-votings-page?my=1\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
		}else{
			var delete_button = '';
		}

		var organization = '';
		if(data_for_build.org){
			var organization = data_for_build.org + " - ";
		}
		var status_vote = '';
		if(canceled == 0){			
			status_vote = '<div class="status yellow">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.sprtf +
						 '</span></div>\ ';
		}else{
			status_vote = '<div class="status red" >\
								<span>' + LOCALE_ARRAY_ADDITIONAL.voting_canceled[CURRENT_LANG] + '</span>\
							</div>\ ';
		}

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
		}

		var tags_array = data_for_build.tags.split(",");
		var ui_tags = '';
		if(tags_array){
			jQuery.each(tags_array, function(i, one_tag) {
				ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#weighted-votings-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
			});	
		}

		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
									<h1>' + LOCALE_ARRAY_ADDITIONAL.weighted_vote[CURRENT_LANG] + '</h1>\
									<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
									<div id="vote-help" class="help-popup" data-role="popup" data-history="false">\
										<div class="title">\
											' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
										</div>\
										<div class="text">\
											' + LOCALE_ARRAY_ADDITIONAL.help_collect_supports_or_canceled[CURRENT_LANG] + '\
										</div>\
									</div>\
								</div>\
								<div role="main" class="ui-content">\
								<div class="left_col">\
									<div class="vote-item">\
										<div class="img">\
											<img width="100%" src="' +  mainURL + data_for_build.img + '" />\
										</div>\
										<div class="vote-item-inner">\
											<div class="stars-wrap">' + stars_ui + 
											'</div>\
											<div class="id">\
												ID: <strong>' + data_for_build.id + ' : ' + data_for_build.name + '</strong>\
											</div>\
											<div class="username">\
												 ' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + ' @<strong>' + data_for_build.author + '</strong>\
											</div>\
											<div class="address">\
												' + LOCALE_ARRAY_ADDITIONAL.share[CURRENT_LANG] + ' - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
											</div>\
											<div class="num-votes-support">\
												' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + status_vote +										
											'<div class="desc">' + data_for_build.description + ' </div>\
											<div class="tag-list">\
											' + ui_tags + '\
											</div>\
											<div class="discuss-btn">\
												<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
											</div>\
											<div class="btn-login-soc">\
												<button class="ui-btn ui-corner-all ui-shadow share-btn"> ' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
												<div class="social-wrap">\
													<div class="ui-grid-b">\
														<div class="ui-block-a">\
															<a target="_blank" class="vk" href="https://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + mainURL + data_for_build.img + '"></a>\
														</div>\
														<div class="ui-block-b">\
															<a target="_blank" class="fb" href="https://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href) + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
														<div class="ui-block-c">\
															<a target="_blank" class="tw" href="https://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
														<div class="ui-block-a">\
															<a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href) + '"></a>\
														</div>\
														<div class="ui-block-b">\
															<a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href) + '"></a>\
														</div>\
														<div class="ui-block-c">\
															<a target="_blank" class="ok" href="https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href) + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div class="sms-btn">\
												<a class="ui-btn ui-corner-all ui-shadow" href="#">SMS</a>\
											</div>' + delete_button + '\
										</div>\
									</div>\
									</div><div class="right_col"></div>\
								</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#weighted-vote-page?vote=" + data_for_build.id);
		$('#weighted-vote-page').html('');
		$( ui_string ).appendTo( '#weighted-vote-page' );
		$('#weighted-vote-page').enhanceWithin();
		$.mobile.loading( "hide" );
	},
	current_vote_page_voting_period: function(data_for_build, finished, type_trigger){
		var self = this;
		// for (var k = 0; k < SPHERES.spheres.length; k++) {
		// 	if(SPHERES.spheres[k].type == parseInt( data_for_build.type ) ){
		// 		var type_sphere = SPHERES.spheres[k].name;
		// 		break;
		// 	}
		// }
		// var organization = '';
		// if(data_for_build.org){
		// 	var organization = data_for_build.org + " - ";
		// }


		var selected_class_yes = '';
		var selected_class_abstain = '';
		var selected_class_no = '';
		var selected_class_checkbox = '';
		var checked_yes = 1;
		var checked_abstain = 1;
		var checked_no = 1;
		var status_current_voting = '';
		switch(parseInt(data_for_build.user_vote)){
			case 1:
				selected_class_yes = 'ui-btn-active ui-radio-on';
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_yes[CURRENT_LANG];
				checked_yes = 0;
				break;
			case 3:
				selected_class_abstain = ' ui-btn-active ui-radio-on ';
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_abstained[CURRENT_LANG];
				checked_abstain = 0;
				break;
			case 2:
				selected_class_no = ' ui-btn-active ui-radio-on ';
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_no[CURRENT_LANG];
				checked_no = 0;
				break;
			default:
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_did_not_vote[CURRENT_LANG];
		}

		if(data_for_build.user_vote_open == "1"){
			selected_class_checkbox = ' ui-checkbox-on ';
			if(parseInt(data_for_build.user_vote) > 0){
				status_current_voting += LOCALE_ARRAY_ADDITIONAL.open_vote[CURRENT_LANG];
			}
		}else{
			if(parseInt(data_for_build.user_vote) > 0){
				status_current_voting += LOCALE_ARRAY_ADDITIONAL.is_anonymous[CURRENT_LANG];
			}			
		}

		var percents_object = self.get_percents_values(data_for_build.vote_yes, data_for_build.vote_nth, data_for_build.vote_no);
		var voting_buttons = '';
		var status_vote = '';

		var tags_array = data_for_build.tags.split(",");
		var ui_tags = '';
		if(tags_array){
			jQuery.each(tags_array, function(i, one_tag) {
				ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#weighted-votings-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
			});	
		}

		if(SUPER_PROFILE.id == data_for_build.author_id && data_for_build.vote_no == "0" && data_for_build.vote_nth == "0" && data_for_build.vote_yes == "0"){
			var delete_button = '<div class="delete_vote_button">\
									<a onclick = "WEIGHTED_VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#weighted-votings-page?my=1\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
		}else{
			var delete_button = '';
		}

		if(finished == 0){
			voting_buttons = '<form action="" accept-charset="UTF-8" method="post">\
														<fieldset class="vote-radio-group" data-role="controlgroup" data-type="horizontal">\
															<legend>' + LOCALE_ARRAY_ADDITIONAL.yes_no_i_do_not_know[CURRENT_LANG] + '</legend>\
															<div class="ui-radio ' + selected_class_yes + '">\
																<label data-checked = "' + checked_yes + '" onclick = "WEIGHTED_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-yes">' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + '</label><input type="radio" name="vote" value="yes" data-enhanced="true">\
															</div>\
															<div class="ui-radio ' + selected_class_abstain + '">\
																<label data-checked = "' + checked_abstain + '" onclick = "WEIGHTED_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-abstain">' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + '</label><input type="radio" name="vote" value="abstain" data-enhanced="true">\
															</div>\
															<div class="ui-radio ' + selected_class_no + '" >\
																<label data-checked = "' + checked_no + '" onclick = "WEIGHTED_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-no">' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + '</label><input type="radio" name="vote" value="no" data-enhanced="true">\
															</div>\
														</fieldset>\
														<div class="ui-checkbox' + selected_class_checkbox + '">\
															<label class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.turn_to_open_anonymous[CURRENT_LANG] + '</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
														</div>\
														<div class="selected-text">\
															' + status_current_voting + '\
														</div></form>\ ';
			status_vote = '<div class="status blue">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.time_voting[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.finish +
						 '</span></div>\ ';
		}else{
			status_vote = '<div class="status green">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.voting_finished[CURRENT_LANG] + '</span>\
							</div>\ ';
		}

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
				break;
		}
		var ui_string = '';
		ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
							<h1>' + LOCALE_ARRAY_ADDITIONAL.weighted_vote[CURRENT_LANG] + '</h1>\
								<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
								<div id="vote-help" class="help-popup" data-role="popup" data-history="false">\
									<div class="title">\
										' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
									</div>\
									<div class="text">\
										' + LOCALE_ARRAY_ADDITIONAL.help_voting_period_finished[CURRENT_LANG] + '\
									</div>\
								</div>\
							</div>\
							<div role="main" class="ui-content">\
							<div class="left_col">\
								<div class="vote-item">\
									<div class="img">\
										<img width="100%" src="' +  mainURL + data_for_build.img + '" />\
									</div>\
									<div class="vote-item-inner">\
										<div class="stars-wrap">' + stars_ui +											
										'</div>\
										 <div class="id">\
											ID: <strong>' + data_for_build.id + ' : ' + data_for_build.name + '</strong>\
										</div>\
										<div class="username">\
											' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + ' @<strong>' + data_for_build.author + '</strong>\
										</div>\
										</div>' + status_vote + 
										'<div class="desc">' + data_for_build.description + ' </div>\
										<div class="tag-list">\
										' + ui_tags + '\
										</div>\
										<div class="discuss-btn">\
											<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(' + data_for_build.chat + '); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
										</div>\
										<div class="btn-login-soc">\
											<button data-role="button" class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
											<div class="social-wrap">\
												<div class="ui-grid-b">\
													<div class="ui-block-a">\
														<a target="_blank" class="vk" href="https://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + mainURL + data_for_build.img + '"></a>\
													</div>\
													<div class="ui-block-b">\
														<a target="_blank" class="fb" href="https://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href) + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
													</div>\
													<div class="ui-block-c">\
														<a target="_blank" class="tw" href="https://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
													</div>\
													<div class="ui-block-a">\
														<a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href) + '"></a>\
													</div>\
													<div class="ui-block-b">\
														<a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href) + '"></a>\
													</div>\
													<div class="ui-block-c">\
														<a target="_blank" class="ok" href="https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href) + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
													</div>\
												</div>\
											</div>\
										</div>\
										<div class="sms-btn">\
											<a class="ui-btn ui-corner-all ui-shadow" href="#">SMS</a>\
										</div>\
										<div class="results-wrap">\
											<div class="results-label">\
												' + LOCALE_ARRAY_ADDITIONAL.result_of_votes[CURRENT_LANG] + ':\
											</div>\
											<div class="num-voters">\
												' + LOCALE_ARRAY_ADDITIONAL.number_of_voters[CURRENT_LANG] + ' - ' + percents_object.sum_values + '\
											</div>\
											<div class="voting-line clearfix">\
												<span class="left" style="width: ' + parseInt(percents_object.plus_percent) + '%">' + parseInt(data_for_build.vote_yes) + '</span><span class="middle" style="width: ' 
																				 + parseInt(percents_object.abstained_percent) + '%">' + parseInt(data_for_build.vote_nth) + '</span><span class="right" style="width: ' 
																				 + parseInt(percents_object.minus_percent) + '%">' + parseInt(data_for_build.vote_no) + '</span>\
											</div>\
										</div>\ ' + voting_buttons + ' <div class="btn-next-page">\
											<a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#voters-page?voting=' + data_for_build.id + '\'); WEIGHTED_VOTINGS.get_open_voters_list(' + data_for_build.id + ');">' + LOCALE_ARRAY_ADDITIONAL.view_list_public_voters[CURRENT_LANG] + '</a>\
										</div>' + delete_button + '\
									</div>\
								</div>\
							</div><div class="right_col"></div>\
							</div></div>';

		//self.build_circle_chart();
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#weighted-vote-page?vote=" + data_for_build.id);
		$('#weighted-vote-page').html('');					
		$( ui_string ).appendTo( '#weighted-vote-page' );

		$('#weighted-vote-page').enhanceWithin();
		//console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
				switch(data_for_build.user_vote){
					case '1':
						$('#weighted-vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
						$('#weighted-vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
						$('#weighted-vote-page .ui-btn.btn-yes').data('checked', 0);
						//console.log('yeeees');
						break;
					case '3':
						$('#weighted-vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
						$('#weighted-vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
						$('#weighted-vote-page .ui-btn.btn-abstain').data('checked', 0);
						//console.log('abstained');
						break;
					case '2':
						$('#weighted-vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
						$('#weighted-vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
						$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
						//console.log('minus');
						break;
				}
			}
		}, 500);
		

		var data_array = [];

		for(var j = 0; j < 6; j++){
			if(parseInt(data_for_build['plus' + j]) == 0 && parseInt(data_for_build['abstained' + j]) == 0 && parseInt(data_for_build['minus' + j]) ==0){
				data_array[j] = [{ value: (parseInt(data_for_build['plus' + j]) + 1), color: "#399d3d" },
					 			 { value: (parseInt(data_for_build['abstained' + j]) + 1), color: "#03a9f4" },
					 			 { value: (parseInt(data_for_build['minus' + j]) + 1), color:"#f44336" } ];
			}else{
				data_array[j] = [{ value: parseInt(data_for_build['plus' + j]), color: "#399d3d" },
					 			 { value: parseInt(data_for_build['abstained' + j]), color: "#03a9f4" },
					 			 { value: parseInt(data_for_build['minus' + j]), color:"#f44336" } ];
			}
		}
		



		if(data_for_build.user_vote_open == "1"){
			$('#weighted-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').addClass("ui-checkbox-on");
		}

		$.mobile.loading( "hide" );
	},
	switch_page_for_build:function(object_id, type_trigger){
		var self = this;
		var data_for_build;
		jQuery.each(self.votings_array, function(i, one_voting) {
			if(parseInt(one_voting.id) == parseInt(object_id)){
				data_for_build = one_voting;
			}
		});
		//console.log('test3');
		if(!data_for_build){

			data_for_build = self.get_one_element(object_id, type_trigger);

			return false;
		}
		switch(data_for_build.status){
			case '1':
				self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
				break;
			case '0':
				self.current_vote_page_voting_period(data_for_build, 0, type_trigger);
				break;
			case '2':
				self.current_vote_page_voting_period( data_for_build, 1, type_trigger);
				break;
			case '3':
				self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
				break;
		}

		$('#weighted-vote-page .btn-login-soc button').on('click', function(e){
			$(this).next().fadeToggle(300);
			if($('.overlay').length < 1) {
				$(this).closest('.ui-page').append('<span class="overlay"></span>');
			} else {
				$('.overlay').remove();
			}
		});
		$(document).on('click','.overlay', function() {
			$(this).closest('.ui-page').find('#weighted-vote-page .btn-login-soc button').trigger('click');
		});
	},
	get_one_element: function(vote_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			url: mainURL + '/weighted_votings.php?id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				return_element = $.parseJSON( response.responseText );
				data_for_build = return_element[0];
				//console.log('data_for_build');
				//console.log(data_for_build);
				switch(data_for_build.status){
					case '0':
						self.current_vote_page_voting_period( data_for_build, 0, type_trigger);
						break;
					case '1':
						self.current_vote_page_voting_period(data_for_build, 1, type_trigger);
						break;
				}

				$('#weighted-vote-page .btn-login-soc button').on('click', function(e){
					$(this).next().fadeToggle(300);
					if($('.overlay').length < 1) {
						$(this).closest('.ui-page').append('<span class="overlay"></span>');
					} else {
						$('.overlay').remove();
					}
				});
				$(document).on('click','.overlay', function() {
					$(this).closest('.ui-page').find('#weighted-vote-page .btn-login-soc button').trigger('click');
				});					
			},
		});
	},
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#weighted-vote-page?vote=') > -1){
			var match_array = location.href.match(/#weighted-vote-page\?vote=[0-9]*/ig);
			var object_id = match_array[0].match(/[0-9]+/ig);
			self.switch_page_for_build(object_id[0], type_trigger);
		}		
	},
	get_percents_values: function(plus_value, abstained_value, minus_value){
		var one_percent = (parseInt(plus_value) + parseInt(abstained_value) + parseInt(minus_value)) / 100;
		//console.log(one_percent);
		var percents_object = {plus_percent: change_nan(parseInt(plus_value) / one_percent),
							 abstained_percent: change_nan(parseInt(abstained_value) / one_percent),
							 minus_percent: change_nan(parseInt(minus_value) / one_percent),
							 sum_values: parseInt(plus_value) + parseInt(abstained_value) + parseInt(minus_value)};
		return percents_object;
	},
	vote_for_voting:function(object_id){
		var self = this;
		setTimeout(function(){
			var status_current_voting = '';
			if($('#weighted-vote-page .ui-btn.btn-yes').hasClass('ui-radio-on') == 1 && $('#weighted-vote-page .ui-btn.btn-yes').data('checked') == '1'){
				var vote = 1;
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_yes[CURRENT_LANG];
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#weighted-vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#weighted-vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_abstained[CURRENT_LANG];
			}else if($('#weighted-vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#weighted-vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_no[CURRENT_LANG];
			}else{
				$('#weighted-vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
				$('#weighted-vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
				$('#weighted-vote-page .ui-btn.btn-yes').data('checked', 1);
				$('#weighted-vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
				$('#weighted-vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
				$('#weighted-vote-page .ui-btn.btn-abstain').data('checked', 1);
				$('#weighted-vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
				$('#weighted-vote-page .ui-btn.btn-no').addClass("ui-radio-off");
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 1);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_did_not_vote[CURRENT_LANG];
				var vote = 0;
			}
			if($('#weighted-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
				var open_name = 1;
				if(vote != 0){
					status_current_voting += LOCALE_ARRAY_ADDITIONAL.open_vote[CURRENT_LANG];
				}
			}else{
				var open_name = 0;
				if(vote != 0){
					status_current_voting += LOCALE_ARRAY_ADDITIONAL.is_anonymous[CURRENT_LANG];
				}
			}
			$('#weighted-vote-page .selected-text').html( status_current_voting );
			$.ajax({
				url: mainURL + '/weighted_vote_add.php?wv_id=' + object_id + '&vote=' + vote + '&open=' + open_name,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
						self.get_one_element(object_id, 6); //6 is wv type number
						//console.log('ok');
				},
			});
		}, 100);
	},
	delete_voting: function(voting_id, return_page){
		$.ajax({
			url: mainURL + '/weighted_voting_rm.php?wv_id=' + voting_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				 //console.log("Deleted id:" + voting_id);
				 $.mobile.navigate(return_page);	
			},
		});
	},
	get_open_voters_list:function(vote_id, idu_input){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		var filter_id = '';
		if(idu_input){
			filter_id = '&idu=' + $(idu_input).val();
		}
		$.ajax({
			url: mainURL + '/weighted_vote_open.php?id=' + vote_id + filter_id,
			type: "GET",
			xhrFields: {
			 withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
					//console.log(response);
					self.voters_list = $.parseJSON( response.responseText );
					$.mobile.loading( "hide" );
					self.set_voters_list(vote_id);
			},
		});
	},
	set_voters_list: function(vote_id){
		var self = this;
		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
							<h1>\
								' + LOCALE_ARRAY_ADDITIONAL.voters[CURRENT_LANG] + '\
							</h1>\
							<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
							<div id="voters-help" class="help-popup" data-role="popup" data-history="false">\
								<div class="title">\
									' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
								</div>\
								<div class="text">\
									' + LOCALE_ARRAY_ADDITIONAL.help_voters_list[CURRENT_LANG] + '\
								</div>\
							</div>\
						</div>\
						<div role="main" class="ui-content">\
						<div class="left_col">\
							<form action="" accept-charset="UTF-8" method="post">\
									<div class="ui-input-search ui-input-has-clear">\
										<input id = "filter_input" onkeyup="WEIGHTED_VOTINGS.get_open_voters_list(\'' + vote_id + '\', this)" type="search" name="" placeholder="' + LOCALE_ARRAY_ADDITIONAL.search_voters[CURRENT_LANG] + '" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
									</div></form>\
							<div class="ui-grid-b voters-list">\
								<div class="ui-block-a">\
									<div class="title icon-yes">\
										' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + '\
									</div>\
								</div>\
								<div class="ui-block-b">\
									<div class="title">\
										' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + '\
									</div>\
								</div>\
								<div class="ui-block-c">\
									<div class="title icon-no">\
										' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + '\
									</div>\
								</div>';

		var plus_vote_string = '<div class="ui-block-a">';
		var minus_vote_string = '<div class="ui-block-c">';
		var abstained_vote_string = '<div class="ui-block-b">';
								
		jQuery.each(self.voters_list, function(i, one_voter) {
			var item = '<div class="item">\
							<div class="avatar">\
								<img src="' + mainURL + one_voter.avatar + '" />\
							</div>\
							<div class="id">\
								ID:' + one_voter.user_id + '\
							</div>\
							<div class="name">\
								' + one_voter.name + '\
							</div>\
						</div>';

			switch(one_voter.vote){
				case "1":
					plus_vote_string += item;
					break;
				case "2":
					minus_vote_string += item;
					break;
				case "3":
					abstained_vote_string += item;
					break;
			}
		});
		plus_vote_string += '</div>';
		abstained_vote_string += '</div>';
		minus_vote_string += '</div>';

		ui_string += plus_vote_string;
		ui_string += abstained_vote_string;	
		ui_string += minus_vote_string;
		
		ui_string += '</div>\
					</div><div class="right_col"></div>\
					</div>';
		

		//$.mobile.navigate("#voters-page?voting=" + vote_id);
		$('#voters-page').html('');
		$( ui_string ).appendTo( '#voters-page' );
		$('#voters-page').enhanceWithin();
	},
	events: function(){

		$(document).on('click', '#wv-list-back', function(e){
			$.mobile.navigate($(this).attr('back_url'));
		});

	}
};
