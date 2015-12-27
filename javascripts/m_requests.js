var REQUESTS = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.data_last_item = 10;
		$('#requests-page #searched_string').val('');

		$('#requests-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.requests[CURRENT_LANG]);
		//$('#requests-page #create_link').attr('style','display: none');
		$('#requests-page #menu_link').attr('style', 'display:block');
		$('#requests-page #my_activities_link').attr('style', 'display:none');

		if(location.href.indexOf('#requests-page?tags_filter=') > -1){
			var tag_filter = location.href.match(/=([a-zA-Z0-9а-яА-Я]*)/i)[1];
			
			var url = mainURL + '/request.php?filter=' + encodeURIComponent(tag_filter);
			//console.log(tag_filter);
		}else if(location.href.indexOf('#requests-page?my_request=true') > -1){
			var url = mainURL + '/request.php?my=1';
			$('#requests-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.my_requests[CURRENT_LANG]);
			$('#requests-page #create_link').attr('style','display: block');
			$('#requests-page #menu_link').attr('style', 'display:none');
			$('#requests-page #my_activities_link').attr('style', 'display:block');
			PIF.get_pif_array(true);
		}else{
			var url = mainURL + '/request.php';
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
				self.data_array = $.parseJSON( response.responseText );
				if(self.data_array.length == 0 && self.activated_hard_filter == 1){
					alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
				}	
				console.log( self.data_array );
				self.check_current_url( 1 );
				self.build_elements();
				$('#requests-page #activated_filter').css('display', 'none'); 
				$('#requests-page #solo_filter').css('display', 'block');
				$.mobile.loading( "hide" );
			},
		});

	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			if(location.href.indexOf('#requests-page?tags_filter=') > -1){
				var tag_filter = location.href.match(/=([a-zA-Z0-9а-яА-Я]*)/i)[1];
				

				var url = mainURL + '/request.php?filter=' + encodeURIComponent(tag_filter) + '&ls=' + self.data_last_item;
				//console.log(tag_filter);
			}else if(location.href.indexOf('#requests-page?my_request=true') > -1){
				var url = mainURL + '/request.php?my=1&ls=' + self.data_last_item;
			}else{
				var url = mainURL + '/request.php?ls=' + self.data_last_item;
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
					if(query_array.length > 0){
						self.data_array = self.data_array.concat(query_array);
						self.data_last_item += query_array.length;
						self.check_current_url( 1 );
						self.build_elements(0, true, query_array);
					}
					console.log( self.data_array );

					$.mobile.loading( "hide" );	 
				},
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		self.activated_easy_filter = 1;

		$.mobile.loading("show", {theme: "z"});

		var url = mainURL + '/request.php';

		switch($('#requests-page [name=sort]').val()){
			case "Sort by id":
				url += '?sort=0';
				break;
			case "Sort by name":
				url += '?sort=1';
				break;
			case "Sort by date create":
				url += '?sort=2';
				break;
			case "Sort by date end":
				url += '?sort=3';
				break;
			case "Sort by stars":
				url += '?sort=4';
				break;
			case "Sort by amount asking":
				url += '?sort=5';
				break;
			case "Sort by beneficiary":
				url += '?sort=6';
				break;	
		}

		switch($('#requests-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
		}

		switch($('#requests-page [name=ngo]').val()){
			case "Accepted":
				url += '&nco=1&ac=1';
				break;
			case "Offered":
				url += '&nco=1&ac=0';
				break;	
			case "Open for offer":
				url += '&nco=0&ac=0';
				break;
		}

		if($('#requests-page #searched_string').val() != ""){
			url += '&filter=' + $('#requests-page #searched_string').val();
		}
		if(self.activated_hard_filter){
			var start_date = $('#filter-page-requests [name=start_year]').val() + "-" 
							+ $('#filter-page-requests [name=start_month]').val() + "-" 
							+ $('#filter-page-requests [name=start_date]').val();
			var end_date = $('#filter-page-requests [name=end_year]').val() + "-" 
						+ $('#filter-page-requests [name=end_month]').val() + "-" 
						+ $('#filter-page-requests [name=end_date]').val();
			url += '&start=' + start_date + '&finish=' + end_date;
			
			/*if(self.sphere_filter >= 0){
				url += '&sph=' + self.sphere_filter;
			}*/
		}

		if(reinit){
			url += '&ls=' + self.data_last_item;
			self.data_last_item += 10;	
		}else{
			self.data_last_item = 10;
		}

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(url);
				self.data_array = $.parseJSON( response.responseText );	
				$.mobile.loading( "hide" );
				//self.check_current_url( 1 );
				if(reinit){
					self.build_elements( "", true );	
				}else{
					self.build_elements();	
				}
				if(self.data_array.length == 0 && reinit != 1 && self.activated_hard_filter){
					$('#requests-page #requests-list').html('<center>Empty</center>');
				} 	
			},
		});
	},
	/*support_voting: function(vote_id){
		$.ajax({
			url: mainURL + '/like_add.php?id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
					//console.log("all ok!");	 
			},
		});
		switch($('#support').data('supported')){
			case 1:
				$('#support').html(LOCALE_ARRAY_ADDITIONAL.support[CURRENT_LANG]);
				$('#support').data('supported', 0);
				$('#supported').html(parseInt($('#supported').html())-1);
				break;
			case 0:
				$('#support').html(LOCALE_ARRAY_ADDITIONAL.not_support[CURRENT_LANG]);
				$('#support').data('supported', 1);
				$('#supported').html(parseInt($('#supported').html()) + 1);
				break;
		}
	},*/
	build_elements: function(ready_array, reinit, reinit_array){
		var self = this;
		var elements_string = '';
		if(ready_array){
			//var build_array = FILTERS.filtered_array;
		}else{
			var build_array = self.data_array;
		}
		if(reinit_array){
			build_array = reinit_array;
		}
		jQuery.each(build_array, function(i, one_voting) {
			switch(one_voting.status){
				case '0':
					elements_string += self.collect_cash_build(one_voting);
					break;
				case '1':
					elements_string += self.finished_collecting_build(one_voting);
					break;
				case '2':
					//elements_string += self.finished_voting_build(one_voting);
					break;
				case '3':
					//elements_string += self.not_supported_build(one_voting);
					break;
			}
		});
		if(reinit){
			$('#requests-page #requests-list').append(elements_string);
		}else{
			$('#requests-page #requests-list').html(elements_string);
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
					url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=0&obj=5",
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
				url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=5",
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
	collect_cash_build:function(one_voting){
		var self = this;
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-request-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' fund-raising">\
									<a onclick = "$.mobile.navigate(\'#request-page?request=' + one_voting.id + '\')" href="#">\
										<div class="img">\
											<img src="' + mainURL + one_voting.img + '" />\
										</div>\
										<div class="info">\
											<div class="title">\
												ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.title + '</strong>\
											</div>\
											<div class="ui-grid-a">\
												<div class="ui-block-b">\
													<div class="status">\
														<span>' + LOCALE_ARRAY_ADDITIONAL.collect_cash[CURRENT_LANG] + '</span>\
													</div>\
												</div>\
											</div>\
											<div class="total-amount">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + one_voting.amount_asking + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
											</div>\
											<div class="amount up">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong>' + one_voting.amount_current + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
											</div>\
											<div class="my-amount">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong>' + one_voting.my_add + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
											</div>\
										</div>\
									</a>\
								</div>';
		return part_ui_string;
	},
	finished_collecting_build:function(one_voting){
		var self = this;
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-request-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' request-completed">\
								<a onclick = "$.mobile.navigate(\'#request-page?request=' + one_voting.id + '\')" href="#">\
									<div class="img">\
										<img src="' + mainURL + one_voting.img + '" />\
									</div>\
									<div class="info">\
										<div class="title">\
											ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.title + '</strong>\
										</div>\
										<div class="ui-grid-a">\
											<div class="ui-block-b">\
												<div class="status">\
													<span>' + LOCALE_ARRAY_ADDITIONAL.successfully_finished[CURRENT_LANG] + '</span>\
												</div>\
												<div class="amount up">\
													<span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + one_voting.amount_asking + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
												</div>\
												<div class="my-amount">\
													<span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong>' + one_voting.my_add + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
												</div>\
												<div class="contractors">\
													<span>' + LOCALE_ARRAY_ADDITIONAL.count_contractors[CURRENT_LANG] + '</span> - <strong>96</strong>\
												</div>\
												</div>\
										</div>\
									</div>\
								</a>\
							</div>';
		return part_ui_string;
	},
	/*not_supported_build:function(one_voting){
		var self = this;
		var percents_object = self.get_percents_values(one_voting.vote_yes, one_voting.vote_nth, one_voting.vote_no);
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-canceled" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
	},*/
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#request-page?request=') > -1){
			var match_array = location.href.match(/#request-page\?request=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			self.switch_page_for_build(object_id[0], type_trigger);
		}		
	},
	switch_page_for_build:function(object_id, type_trigger){
		var self = this;
		var data_for_build;
		jQuery.each(self.data_array, function(i, one_data) {
			if(parseInt(one_data.id) == parseInt(object_id)){
				data_for_build = one_data;
			}
		});
		if(!data_for_build){
			self.get_one_element(object_id, type_trigger);
			return false;
		}
		switch(data_for_build.status){
			case '0':
				self.current_collect_cash( data_for_build, 0, type_trigger);
				break;
			case '1':
				self.current_collect_cash(data_for_build, 0, type_trigger)
				break;
			case '2':
				//self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
				break;
			case '3':
				//self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
				break;
		}

		$('#request-page .btn-login-soc button').on('click', function(e){
			$(this).next().fadeToggle(300);
			if($('.overlay').length < 1) {
				$(this).closest('.ui-page').append('<span class="overlay"></span>');
			} else {
				$('.overlay').remove();
			}
		});
		$(document).on('click','.overlay', function() {
			$(this).closest('.ui-page').find('#request-page .btn-login-soc button').trigger('click');
		});
	},
	current_collect_cash: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
				break;
		}

		var tags_array = data_for_build.tags.split(",");
		var ui_tags = '';
		jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#requests-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
		});

		var ui_pif_option = '';
		var flag_selected = 0;
		jQuery.each(PIF.pif_array, function(i, one_pif) {
			if(one_pif.currency == data_for_build.currency_asking){
				ui_pif_option += '<option data-currency = "' + one_pif.currency + '" value="' + one_pif.id + '">' + one_pif.id + ' - ' + one_pif.saldo + '</option>';
				flag_selected = 1;
			}
		});

		// var nko_parts = '';
		// var nco_create_flag = 0;
		// jQuery.each(data_for_build.nco_list, function(i, one_nko) {
		// 	if( data_for_build.nco_id == '0' ){
		// 			nko_parts += '<li>\
		// 							<div>\
		// 								<strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.user_id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		// 							</div>\
		// 						</li>';
		// 	}else{
		// 		if( data_for_build.nco_id == one_nko.user_id){
		// 			nko_parts += '<li>\
		// 							<div>\
		// 								<strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.user_id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		// 							</div>\
		// 						</li>';
		// 			nco_create_flag = 1;
		// 		}
		// 	} 
		// });

		// if(SUPER_PROFILE.id == data_for_build.author_id && data_for_build.nco_acceptance == '0' ){
		// 	var nco_button = '<div class="nko-btn">\
		// 						<a class="ui-btn ui-corner-all ui-shadow" onclick = "$.mobile.navigate(\'#nko-page?request=' + data_for_build.id + '\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.choose_nco[CURRENT_LANG] + '</a>\
		// 					</div>\
		// 					<div class="nko-status red">\
		// 						' + (data_for_build.nco_list.length > 0 ? "" : LOCALE_ARRAY_ADDITIONAL.nco_not_selected[CURRENT_LANG]) + '\
		// 					</div>';
		// }else{
		// 	var nco_button = '';
		// }
		// var nco_create_button = '';
		// var creator_check = 0;
		// if(SUPER_PROFILE.nco == '1' && data_for_build.nco_acceptance == '0' && data_for_build.nco_id == '0' ){
		// 	if( data_for_build.nco_list.length == 0 ){
		// 		nco_create_button = '<div class="nko-btn">\
		// 						<a class="ui-btn ui-corner-all ui-shadow" onclick = "NCO.offer_accept_nco(5,' + data_for_build.id + ',\'#request-page\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.create_nco[CURRENT_LANG] + '</a>\
		// 					</div>';
		// 	}else{
		// 		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
		// 			if( SUPER_PROFILE.id == one_nko.user_id ){
		// 				creator_check = 1;
		// 			} 
		// 		});
		// 		if(creator_check == 0){
		// 			nco_create_button = '<div class="nko-btn">\
		// 						<a class="ui-btn ui-corner-all ui-shadow" onclick = "NCO.offer_accept_nco(5,' + data_for_build.id + '\'#request-page\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.create_nco[CURRENT_LANG] + '</a>\
		// 					</div>';
		// 		}
		// 	}
		// }
		// var nco_accept_button = '';
		// var creator_check_accept = 0;
		// if(SUPER_PROFILE.nco == '1' && data_for_build.nco_acceptance == '0' && data_for_build.nco_id == '0' ){
		// 	jQuery.each(data_for_build.nco_list, function(i, one_nko) {
		// 		if( SUPER_PROFILE.id == one_nko.user_id ){
		// 			creator_check_accept = 1;
		// 		} 
		// 	});
		// 	if(creator_check_accept == 0){
		// 		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
		// 			if( data_for_build.nco_id == one_nko.user_id){
		// 				nco_accept_button = '<div class="nko-btn">\
		// 					<a class="ui-btn ui-corner-all ui-shadow" onclick = "NCO.offer_accept_nco(5,' + data_for_build.id + '\'#request-page\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.accept_nco[CURRENT_LANG] + '</a>\
		// 				</div>';
		// 			} 
		// 		});
		// 	}
		// }

		var ui_donate_panel = '';
		if(data_for_build.status == 0){
			if(flag_selected == 1){
				var ui_donate_panel = '<div class="ui-grid-a">\
										<div class="ui-block-a">\
											<div>\
												<label>' + LOCALE_ARRAY_ADDITIONAL.choose_personal_fund[CURRENT_LANG] + '</label><select name="pif">\
												' + ui_pif_option + '\
												</select>\
											</div>\
										</div>\
										<div class="ui-block-b">\
											<div class="text-field">\
												<label>' + LOCALE_ARRAY_ADDITIONAL.amount_of_money[CURRENT_LANG] + '</label>\
												<div class="ui-input-text">\
													<input type="number" min="0" step="1" name="amount" data-enhanced="true" />\
												</div>\
											</div>\
										</div>\
									</div>\
									<div class="ui-grid-solo">\
										<div class="ui-block-a">\
											<button onclick = "REQUESTS.donate(\'request\', ' + data_for_build.id + ', 5)" class="ui-btn ui-corner-all ui-shadow donate-btn">' + LOCALE_ARRAY_ADDITIONAL.donate[CURRENT_LANG] + '</button>\
										</div>\
										<div class="ui-block-a center">\
											<div class="ui-checkbox">\
												<label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.anonymous_donation[CURRENT_LANG] + '</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
											</div>\
										</div>\
									</div>\
								</div>\ ';
			}else{
				ui_donate_panel = '';
				if(PIF.pif_array.length == 0){
					
					PIF.set_select_input('#request-page', 'REQUESTS', 'request', data_for_build.id, 5, data_for_build.currency_asking);
				}
				if(SUPER_PROFILE.auth == true){
					ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] + ' <a href = "#my-fund-page">My funds</a></span>';
				}else{
					ui_donate_panel = '<span>Please register for donate. <a href = "#registration">Registration</a></span>';
				}
			}
		}

		if(data_for_build.status == 0){
			var status_item = '<div class="status yellow">\
									' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' ' + data_for_build.ts_closed + '\
								</div>';						
		}else{
			var status_item = '<div class="status green">\
									' + LOCALE_ARRAY_ADDITIONAL.successfully_finished[CURRENT_LANG] + '\
								</div>';	
		}

		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
					<h1>' + LOCALE_ARRAY_ADDITIONAL.request[CURRENT_LANG] + '</h1>\
					<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#requests-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-help">Ask</a>\
					<div id="request-help" class="help-popup" data-role="popup" data-history="false">\
						<div class="title">\
							' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
						</div>\
						<div class="text">\
							' + LOCALE_ARRAY_ADDITIONAL.help_collect_cash_request[CURRENT_LANG] + '\
						</div>\
					</div>\
				</div>\
				<div role="main" class="ui-content">\
				<div class="left_col">\
					<div id = "request-item" class="request-item">\
					<div class="img">\
						<img width="100%" src="' +  mainURL + data_for_build.img + '" />\
					</div>\
					<div class="request-item-inner">\
						<div class="stars-wrap">\
							' + stars_ui + '\
						</div>\
						<div class="id">\
							ID: <strong>' + data_for_build.id + ' : ' + data_for_build.title + '</strong>\
						</div>\
						<div class="benitsifiar">\
							<span class="bg">' + LOCALE_ARRAY_ADDITIONAL.beneficiary[CURRENT_LANG] + ' @<strong>' + data_for_build.beneficiary + '</strong></span>\
						</div>\
						<div class="username">\
							' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + ' @<strong>' + data_for_build.creator_id + ' :: ' + data_for_build.author + '</strong>\
						</div>\
						' + status_item + '\
						<div class="total-amount">\
							<span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + data_for_build.amount_asking + ' ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
						</div>\
						<div class="amount up">\
							<span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.amount_current + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
						</div>\
						<div class="my-amount">\
							<span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><test id = "my_amount_current">' + data_for_build.my_add + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
						</div>\
						<div class="nco_status ui-corner-all"></div>\
						<div class="desc">\
							<div class="text">\
								' + data_for_build.description + '\
							</div>\
							<div class="tag-list">\
								' + ui_tags + '\
							</div>\
						</div>\
						<div class="discuss-btn">\
							<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_request[CURRENT_LANG] + '</a>\
						</div>\
						<div class="btn-login-soc">\
							<button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
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
						<hr>\
						<div class="donate-wrap">\
							' + ui_donate_panel + '\
						</div>\
						<hr>\
						<div class="btn-next-page">\
							<a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=request&id=' + data_for_build.id + '\'); ">' + LOCALE_ARRAY_ADDITIONAL.history_donation[CURRENT_LANG] + '</a>\
						</div>\
					</div>\
					</div><div class="right_col"></div>\
				</div>\
			</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#request-page').html('');
		$( ui_string ).appendTo( '#request-page' );
		$('#request-page').enhanceWithin();
		$('#request-page select').selectmenu().selectmenu("refresh", true);	

		NCO.nco_build(5, data_for_build.id, data_for_build.creator_id, data_for_build.nco_id, data_for_build.nco_list, data_for_build.nco_acceptance);
		NCO.events();

		$.mobile.loading( "hide" );
	},
	check_nko_page: function(){
		var self = this;
		if(location.href.indexOf('#nko-page?request=') > -1){
			var match_array = location.href.match(/#nko-page\?request=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			
			var data_for_build;
			jQuery.each(self.data_array, function(i, one_data) {
				if(parseInt(one_data.id) == parseInt(object_id)){
					data_for_build = one_data;
					
				}
			});
			
			var nko_parts = '';
			jQuery.each(data_for_build.nco_list, function(i, one_nko) {
				nko_parts += '<li>\
								<div onclick = "REQUESTS.set_nco(5,\'' + object_id + '\', \'' + one_nko.id + '\')" class="ui-checkbox">\
									<label class="ui-btn ui-btn-icon-left ui-checkbox-off"></label><input type="checkbox" name="" value="1" data-enhanced="true" />\
								</div>\
								<div>\
									<strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.user_id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
								</div>\
							</li>\ '; 
			});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
								<h1>\
									' + LOCALE_ARRAY_ADDITIONAL.nco_list_title[CURRENT_LANG] + '\
								</h1>\
								<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
								<div id="request-nko-help" class="help-popup" data-role="popup" data-history="false">\
									<div class="title">\
										' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
									</div>\
									<div class="text">\
										' + LOCALE_ARRAY_ADDITIONAL.help_check_nco_request[CURRENT_LANG] + '\
									</div>\
								</div>\
							</div>\
							<div role="main" class="ui-content">\
								<div class="select-nko-wrap">\
									<div class="title">\
										' + LOCALE_ARRAY_ADDITIONAL.choose_nco_list[CURRENT_LANG] + ':\
									</div>\
									<ol>' + nko_parts + '\
									</ol>\
									<div class="btn-save">\
										<input type="submit" value="' + LOCALE_ARRAY_ADDITIONAL.save_nco[CURRENT_LANG] + '" />\
									</div>\
								</div>\
							</div>';
			$('#nko-page').html( ui_string ).enhanceWithin();
		}
	},
	set_nco: function(object_type, object_id, nco_id){
		$.ajax({
			url: mainURL + "/nco_choice.php",
			type: "POST",
			data: {"type": object_type,
				 "id": object_id,
				 "nco": nco_id},
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(data){
				alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
				//console.log("saved ok");
				//alert('okay');
			}
		});
	},
	get_one_element: function(data_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			url: mainURL + '/request.php?id=' + data_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				return_element = $.parseJSON( response.responseText );
				data_for_build = return_element[0];
				self.data_array = data_for_build;
				//console.log(self.data_array);
				switch(data_for_build.status){
					case '0':
						self.current_collect_cash( data_for_build, 0, type_trigger);
						break;
					case '1':
						self.current_collect_cash(data_for_build, 0, type_trigger)
						break;
					case '2':
						self.current_collect_cash(data_for_build, 0, type_trigger)
						break;
				}

				$('#request-page .btn-login-soc button').on('click', function(e){
					$(this).next().fadeToggle(300);
					if($('.overlay').length < 1) {
						$(this).closest('.ui-page').append('<span class="overlay"></span>');
					} else {
						$('.overlay').remove();
					}
				});
				$(document).on('click','.overlay', function() {
					$(this).closest('.ui-page').find('#request-page .btn-login-soc button').trigger('click');
				});
			},
		});
	},
	donate: function(selector, object_id, type_id){
		var fund_id = $('#' + selector + '-page [name=pif]').val(); 
		var currency = $('#' + selector + '-page option[value=' + fund_id + ']').data('currency');
		var amount = $('#' + selector + '-page [name=amount]').val();
		var open = 0;
		if($('#' + selector + '-page #anonimous_check').hasClass('ui-checkbox-on')){
			open = 1;
		}
		
		$.ajax({
			url: mainURL + "/fund_add_by_type.php",
			type: "POST",
			data: {"fund_id": fund_id,
				 "currency": currency,
				 "amount": amount,
				 "type": type_id,
				 "id": object_id,
				 "open": open},
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(data){
				if(data){
					var response_data = $.parseJSON(data.responseText);
					if(data.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.donate_successfull[CURRENT_LANG]);
						$('#' + selector + '-page [name=pif] option[value=' + $('#' + selector + '-page [name=pif]').val() + ']').html($('#' + selector + '-page [name=pif]').val() + ' - ' + response_data[0].saldo);
						$('#' + selector + '-page #amount_up').html( parseInt( $('#' + selector + '-page #amount_up').html() ) + parseInt( amount ));
						$('#' + selector + '-page #my_amount_current').html( parseInt( $('#' + selector + '-page #my_amount_current').html() ) + parseInt( amount ) );
						$('#' + selector + '-page select').selectmenu().selectmenu("refresh", true);
						//console.log("donate ok");
					}else{
						alert(LOCALE_ARRAY_ADDITIONAL.fund_closed[CURRENT_LANG]);
					}					
				}
				//alert('okay');
			}
		});
	},
	build_history_page: function(){
		var self = this;
		if(location.href.indexOf('#history-page?item=request&id=') > -1){
			var match_array = location.href.match(/#history-page\?item=request&id=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			var my_add = 0;
			$.mobile.loading( "show", {theme: "z"});
			$.ajax({
				url: mainURL + '/fund_public_cf.php?type=5&id=' + object_id,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					var funds_list = $.parseJSON( response.responseText );
					//console.log('request');	
					$.mobile.loading( "hide" );

					var ui_funds = '';
					var ui_cf = '';
					var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );

					jQuery.each(funds_list, function(i, one_fund) {
						for (var i = 0; i < one_fund.cf.length; i++) {
							var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
							var cancel_span = '';
							if(one_fund.cf[i].user_id == SUPER_PROFILE.id && SUPER_PROFILE.auth == true){
								cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "REQUESTS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',5,\'' + object_id + '\',\'#request-page?request=' + object_id + '\')">' + LOCALE_ARRAY_ADDITIONAL.cancel_donate[CURRENT_LANG] + '</span>';
								my_add += parseInt(one_fund.cf[i].saldo);
							}
							ui_cf += '<tr>\
										<td>' + cancel_span + ' ' + one_fund.cf[i].ts_created + '</td>\
										<td>' + one_fund.cf[i].user_id + ' ' + one_fund.cf[i].fname + ' ' + one_fund.cf[i].lname + '</td>\
										<td><strong>' + one_fund.cf[i].saldo + '</strong> ' + currency_name + '</td>\
									</tr>';
						}
					});

					ui_funds += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
										<h1 class="long-title">\
											' + LOCALE_ARRAY_ADDITIONAL.history_donation[CURRENT_LANG] + '\
										</h1>\
										<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-history-help">Ask</a>\
										<div id="request-history-help" class="help-popup" data-role="popup" data-history="false">\
											<div class="title">\
												' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
											</div>\
											<div class="text">\
												' + LOCALE_ARRAY_ADDITIONAL.help_request_history_page[CURRENT_LANG] + '\
											</div>\
										</div>\
									</div>\
									<div role="main" class="ui-content">\
										<div class="program-history-wrap">\
											<div class="ui-grid-b">\
												<div class="ui-block-a">\
													<div class="my-amount">\
														<strong>\
															' + my_add + '\
														 ' + main_currency + '</strong><span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span>\
													</div>\
												</div>\
												<div class="ui-block-b">\
													<div class="amount up">\
														<strong>\
														' + funds_list[0].amount_current + '\
														 ' + main_currency + '</strong><span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span>\
													</div>\
												</div>\
												<div class="ui-block-c">\
													<div class="total-amount">\
														<strong>\
														' + funds_list[0].amount_asking + '\
														' + main_currency + '</strong><span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span>\
													</div>\
												</div>\
											</div>\
											<table>\
												<thead>\
													<tr>\
														<td>\
															' + LOCALE_ARRAY_ADDITIONAL.date_and_time[CURRENT_LANG] + '\
														</td>\
														<td>\
															' + LOCALE_ARRAY_ADDITIONAL.fio[CURRENT_LANG] + '\
														</td>\
														<td>\
															' + LOCALE_ARRAY_ADDITIONAL.amount_of_money[CURRENT_LANG] + '\
														</td>\
													</tr>\
												</thead>\
												<tbody>\
												' + ui_cf + '\
												</tbody>\
											</table>\
										</div>\
									</div>';
				$('#history-page').html( ui_funds ).enhanceWithin();
							
			},
			});
		}
	},
	return_donate: function(fund_id, currency, amount, type, type_id, return_page){
		$.ajax({
			url: mainURL + "/fund_return_by_type.php",
			type: "POST",
			data: {"fund_id": fund_id,
				 "currency": currency,
				 "amount": amount,
				 "type": type,
				 "id": type_id},
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(data){
				alert(LOCALE_ARRAY_ADDITIONAL.return_donate_successfull[CURRENT_LANG]);
				//console.log(return_page);
				PIF.get_pif_array(true);
				$.mobile.navigate(return_page);
				//alert('okay');
			}
		});
	}	
	/*delete_voting: function(voting_id, return_page){
		$.ajax({
			url: mainURL + '/mc_rm.php?id=' + voting_id,
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
	},*/
};
