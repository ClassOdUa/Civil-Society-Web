var PROGRAMS = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	last_opened_id: 0,
	currency: 0,
	currency_name: '',
	my_add: 0,
	init: function(call_back){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.data_last_item = 10;
		$('#programs-page #searched_string').val('');

		$('#programs-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.programs[CURRENT_LANG]);
		//$('#programs-page #create_link').attr('style','display: none');

		if(location.href.indexOf('#programs-page?tags_filter=') > -1){
			var tag_filter = location.href.match(/=([a-zA-Z0-9а-яА-Я]*)/i)[1];
			
			var url = mainURL + '/program.php?filter=' + encodeURIComponent(tag_filter);
			//console.log(tag_filter);
			$('#programs-page #menu_link').attr('style', 'display:block');
			$('#programs-page #my_activities_link').attr('style', 'display:none');
		}else if(location.href.indexOf('#programs-page?my_program=true') > -1){
			var url = mainURL + '/program.php?my=1';
			$('#programs-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.my_programs[CURRENT_LANG]);
			$('#programs-page #create_link').attr('style','display: block');
			$('#programs-page #menu_link').attr('style', 'display:none');
			$('#programs-page #my_activities_link').attr('style', 'display:block');
			PIF.get_pif_array(true);
		}else{
			var url = mainURL + '/program.php';
			$('#programs-page #menu_link').attr('style', 'display:block');
			$('#programs-page #my_activities_link').attr('style', 'display:none');
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
					//console.log(response);
					self.data_array = $.parseJSON( response.responseText );
					if(self.data_array.length == 0 && self.activated_hard_filter == 1){
						alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
					}	
					//console.log( self.data_array );
					self.check_current_url( 1 );
					self.build_elements();
					$('#programs-page #activated_filter').css('display', 'none'); 
					$('#programs-page #solo_filter').css('display', 'block');	 
					/*if(call_back){
						call_back();
					}*/	
					$.mobile.loading( "hide" );

			},
		});

		self.events();
	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{

			if(location.href.indexOf('#programs-page?tags_filter=') > -1){
				var tag_filter = location.href.match(/=([a-zA-Z0-9а-яА-Я]*)/i)[1];
				

				var url = mainURL + '/program.php?filter=' + encodeURIComponent(tag_filter) + '&ls=' + self.data_last_item;
				//console.log(tag_filter);
			}else if(location.href.indexOf('#programs-page?my_program=true') > -1){
				var url = mainURL + '/program.php?my=1&ls=' + self.data_last_item;
			}else{
				var url = mainURL + '/program.php?ls=' + self.data_last_item;
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
					
						var query_array =$.parseJSON( response.responseText );
						//console.log( self.data_array );
						if(query_array.length > 0){
							self.data_array = self.data_array.concat(query_array);
							self.data_last_item += query_array.length;
							self.check_current_url( 1 );
							self.build_elements( 1, true, query_array);
						}
						$.mobile.loading( "hide" );	 
				},
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		self.activated_easy_filter = 1;
		$.mobile.loading( "show", {theme: "z"});

		var url = mainURL + '/program.php';

		switch($('#programs-page [name=sort]').val()){
			case "Sort by id":
				url += '?sort=0';
				break;
			case "Sort by name":
				url += '?sort=1';
				break;
			case "Sort by newest":
				url += '?sort=2';
				break;
			case "Sort by stars":
				url += '?sort=4';
				break;
		}
		switch($('#programs-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
		}

		if($('#programs-page #searched_string').val() != ""){
			url += '&filter=' + $('#programs-page #searched_string').val();
		}
		if(self.activated_hard_filter){
			var start_date = $('#filter-page-programs [name=start_year]').val() + "-" 
							+ $('#filter-page-programs [name=start_month]').val() + "-" 
							+ $('#filter-page-programs [name=start_date]').val();
			var end_date = $('#filter-page-programs [name=end_year]').val() + "-" 
						+ $('#filter-page-programs [name=end_month]').val() + "-" 
						+ $('#filter-page-programs [name=end_date]').val();
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
						$('#programs-page #programs-list').html('<center>Empty</center>');
					} 	
			},
		});
	},
	build_elements: function(ready_array, reinit, reinit_array){
		var self = this;
		var elements_string = '';
		if(ready_array){
			var build_array = FILTERS.filtered_array;
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
				// case '2':
					//elements_string += self.finished_voting_build(one_voting);
					// break;
				// case '3':
					//elements_string += self.not_supported_build(one_voting);
					// break;
			}
		});
		if(reinit){
			$('#programs-page #programs-list').append(elements_string);
		}else{
			$('#programs-page #programs-list').html(elements_string);
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
					url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=0&obj=2",
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
				url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=2",
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
		self.my_add = one_voting.my_add;
		if(one_voting.stars > 0){
			star_class = 'icon-program-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' fund-raising">\
									<a onclick = "$.mobile.navigate(\'#program-page?program=' + one_voting.id + '\')" href="#">\
										<div class="img">\
											<img src="' + mainURL + one_voting.img + '" />\
										</div>\
										<div class="info">\
											<div class="title">\
												ID: <strong>' + one_voting.id + ' : ' + one_voting.title + '</strong>\
											</div>\
											<div class="amount up">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong>' + one_voting.amount_current + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
											</div>\
											<div class="my-amount">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong>' + one_voting.my_add + ' ' + PIF.get_currency_name_by_id( one_voting.currency_asking ) + '</strong>\
											</div>\
											<div class="contractors">\
												<span>' + LOCALE_ARRAY_ADDITIONAL.count_contractors[CURRENT_LANG] + '</span> - <strong>' + one_voting.pp + '</strong>\
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
			star_class = 'icon-program-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' program-completed">\
								<a onclick = "$.mobile.navigate(\'#program-page?program=' + one_voting.id + '\')" href="#">\
									<div class="img">\
										<img src="' + mainURL + one_voting.img + '" />\
									</div>\
									<div class="info">\
										<div class="title">\
											ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.title + '</strong>\
										</div>\
										<div class="ui-grid-a">\
											<div class="ui-block-a">\
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
													<span>' + LOCALE_ARRAY_ADDITIONAL.count_contractors[CURRENT_LANG] + '</span> - <strong>' + one_voting.pp + '</strong>\
												</div>\
											</div>\
										</div>\
									</div>\
								</a>\
							</div>';
		return part_ui_string;
	},
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#program-page?program=') > -1){
			var match_array = location.href.match(/#program-page\?program=[0-9]*/i);
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
			// case '2':
			// 	self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
			// 	break;
			// case '3':
			// 	self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
			// 	break;
		}

		$('#program-page .btn-login-soc button').on('click', function(e){
			$(this).next().fadeToggle(300);
			if($('.overlay').length < 1) {
				$(this).closest('.ui-page').append('<span class="overlay"></span>');
			} else {
				$('.overlay').remove();
			}
		});
		$(document).on('click','.overlay', function() {
			$(this).closest('.ui-page').find('#program-page .btn-login-soc button').trigger('click');
		});
	},
	current_collect_cash: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		PROGRAMS.last_opened_id = data_for_build.id;
		PROGRAMS.my_add = data_for_build.my_add;
		

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
				break;
		}

		var tags_array = data_for_build.tags.split(",");
		var ui_tags = '';
		jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#programs-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
		});

		var ui_pif_option = '';
		var flag_selected = 0;
		jQuery.each(PIF.pif_array, function(i, one_pif) {
			if(one_pif.currency == data_for_build.currency_asking){
				ui_pif_option += '<option data-currency = "' 
								+ one_pif.currency + '" value="' 
								+ one_pif.id + '">' 
								+ one_pif.id + ' - ' 
								+ one_pif.saldo + '</option>';
				flag_selected = 1;
			}
		});

		if(data_for_build.status == 0){
			var status_item = '<div class="status yellow">\
									' + LOCALE_ARRAY_ADDITIONAL.collect_cash[CURRENT_LANG] +'\
								</div>';						
		}else{
			var status_item = '<div class="status green">\
									' + LOCALE_ARRAY_ADDITIONAL.successfully_finished[CURRENT_LANG] + '\
								</div>';	
		}

		var ui_donate_panel = '';
		if(data_for_build.status == 0){
			if(flag_selected == 1){
				ui_donate_panel = '<div class="ui-grid-a">\
										<div class="ui-block-a">\
											<div>\
												<label>' 
			+ LOCALE_ARRAY_ADDITIONAL.choose_personal_fund[CURRENT_LANG]
			+ '</label><select name="pif">' + ui_pif_option + '</select>\
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
											<button onclick = "PROGRAMS.donate(\'program\', ' + data_for_build.id + ', 2)" class="ui-btn ui-corner-all ui-shadow donate-btn">' + LOCALE_ARRAY_ADDITIONAL.donate[CURRENT_LANG] + '</button>\
										</div>\
										<div class="ui-block-a center">\
											<div class="ui-checkbox">\
												<label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.anonymous_donation[CURRENT_LANG] + '</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
											</div>\
										</div>\
									</div>\
								</div>';
			}else{
				if(PIF.pif_array.length == 0){
					ui_donate_panel = '';
					PIF.set_select_input('#program-page', 'PROGRAMS', 'program', data_for_build.id, 2, data_for_build.currency_asking);
				}
				ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' <a href = "#my-fund-page">My funds</a></span>';
			}
		}		

		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
					<h1>\
						' + LOCALE_ARRAY_ADDITIONAL.program[CURRENT_LANG] + '\
					</h1>\
					<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" href="#programs-page">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-help">Ask</a>\
					<div id="program-help" class="help-popup" data-role="popup" data-history="false">\
						<div class="title">\
							' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
						</div>\
						<div class="text">\
							' + LOCALE_ARRAY_ADDITIONAL.help_collect_cash_program[CURRENT_LANG] + '\
						</div>\
					</div>\
				</div>\
				<div role="main" class="ui-content">\
					<div class="left_col">\
					<div id = "program-item" class="program-item" p_id="' + data_for_build.id + '">\
					<div class="img">\
						<img width="100%" src="' +  mainURL + data_for_build.img + '" />\
					</div>\
					<div class="program-item-inner">\
						<div class="stars-wrap">\
							' + stars_ui + '\
						</div>\
						<div class="id">\
							ID: <strong>' + data_for_build.id + ' : ' + data_for_build.title + '</strong>\
						</div>\
						<div class="username">\
							' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + ' @<strong>' + data_for_build.author + '</strong>\
						</div>\
						' + status_item + '\
						<div class="amount up">\
							<span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><span id = "amount_up">' + data_for_build.amount_current + '</span> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
						</div>\
						<div class="my-amount" my_add="' + data_for_build.my_add + '">\
							<span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><span id = "my_amount_current">' + data_for_build.my_add + '</span> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
						</div>\
						<div class="nko-list">\
							<div class="tag-list">\
								' + ui_tags + '\
							</div>\
							<div class="text">\
								' + data_for_build.description + '\
							</div>\
						</div>\
						<div class="discuss-btn">\
							<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.prog_discussion_link + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_program[CURRENT_LANG] + '</a>\
						</div>\
						<div class="btn-login-soc">\
							<button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
							<div class="social-wrap">\
								<div class="ui-grid-b">\
									<div class="ui-block-a">\
										<a target="_blank" class="vk" href="https://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(data_for_build.title) + '&image=' + mainURL + data_for_build.img + '"></a>\
									</div>\
									<div class="ui-block-b">\
										<a target="_blank" class="fb" href="https://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href) + '&t=' + encodeURIComponent(data_for_build.title) + '"></a>\
									</div>\
									<div class="ui-block-c">\
										<a target="_blank" class="tw" href="https://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(data_for_build.title) + '"></a>\
									</div>\
									<div class="ui-block-a">\
										<a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href) + '"></a>\
									</div>\
									<div class="ui-block-b">\
										<a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href) + '"></a>\
									</div>\
									<div class="ui-block-c">\
										<a target="_blank" class="ok" href="https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href) + '&st.comments=' + encodeURIComponent(data_for_build.title) + '"></a>\
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
							<a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=program&id=' + data_for_build.id + '\');">' + LOCALE_ARRAY_ADDITIONAL.history_donation[CURRENT_LANG] + '</a>\
						</div>\
						<div class="btn-next-page">\
							<a id = "weighted_voting_link" class="ui-btn ui-btn-icon-right"  href="">' + LOCALE_ARRAY_ADDITIONAL.votings_on_program[CURRENT_LANG] + '</a>\
						</div>\
						<div class="btn-next-page">\
							<a id = "project_propositions_link" class="ui-btn ui-btn-icon-right" href="">' + LOCALE_ARRAY_ADDITIONAL.projects_propositions[CURRENT_LANG] + '</a>\
						</div>\
					</div>\
				</div>\
				</div><div class="right_col"></div>\
			</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#program-page').html('');
		$( ui_string ).appendTo( '#program-page' );
		$('#program-page').enhanceWithin();
		$('#program-page select').selectmenu().selectmenu("refresh", true);
		$.mobile.loading( "hide" );
	},
	get_one_element: function(data_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			url: mainURL + '/program.php?id=' + data_id,
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
						self.current_collect_cash(data_for_build, 0, type_trigger);
						break;
					case '1':
						self.current_collect_cash(data_for_build, 0, type_trigger)
						break;
					case '2':
						self.current_collect_cash(data_for_build, 0, type_trigger)
						break;
				}

				$('#program-page .btn-login-soc button').on('click', function(e){
					$(this).next().fadeToggle(300);
					if($('.overlay').length < 1) {
						$(this).closest('.ui-page').append('<span class="overlay"></span>');
					} else {
						$('.overlay').remove();
					}
				});
				$(document).on('click','.overlay', function() {
					$(this).closest('.ui-page').find('#program-page .btn-login-soc button').trigger('click');
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
		var l_json = $.parseJSON('{"fund_id":"' + fund_id + '", "currency":"' + currency + '", "amount":"' + amount + '", "type":"' + type_id + '", "id":"' + object_id + '", "open":"' + open + '"}');
		
		$.post(mainURL + '/fund_add_by_type.php', l_json, function(l_response){
			if(l_response){
				var response_data = $.parseJSON(l_response);
				if(l_response.indexOf('error') == -1){
					
					$('#program-page [name=pif] option[value=' + $('#program-page [name=pif]').val() + ']').html($('#program-page [name=pif]').val() + ' - ' + response_data[0].saldo);

					$('#program-page #amount_up').html(parseInt($('#amount_up').html()) + parseInt( amount ));
					
					$('#program-page #my_amount_current').html( parseInt( $('#my_amount_current').html() ) + parseInt( amount ) );

					$('#program-page select').selectmenu().selectmenu("refresh", true);

					PIF.get_pif_array(true);

					//$('#weighted_voting_link').attr('onclick', '$.mobile.navigate(\'#weighted-votings-page?program=' + object_id + '\')');

					alert(LOCALE_ARRAY_ADDITIONAL.donate_successfull[CURRENT_LANG]);
				}else{
					alert(LOCALE_ARRAY_ADDITIONAL.fund_closed[CURRENT_LANG]);
				}
			}
		});
	},
	build_history_page: function(){
		var self = this;
		if(location.href.indexOf('#history-page?item=program&id=') > -1){
			var match_array = location.href.match(/#history-page\?item=program&id=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			var my_add = 0;
			$.mobile.loading( "show", {theme: "z"});
			$.ajax({
				url: mainURL + '/fund_public_cf.php?type=2&id=' + object_id,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					var funds_list = $.parseJSON( response.responseText );
					//console.log('program');
					//console.log('funds_list');
					//console.log(funds_list);	
					$.mobile.loading( "hide" );

					var ui_funds = '';
					var ui_cf = '';
					var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );
					jQuery.each(funds_list, function(j, one_fund) {
						for (var i = 0; i < one_fund.cf.length; i++) {
							var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
							var cancel_span = '';
							if(one_fund.cf[i].user_id == SUPER_PROFILE.id && SUPER_PROFILE.auth == true){
								cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "PROGRAMS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',2,\'' + object_id + '\',\'#program-page?program=' + object_id + '\')">' + LOCALE_ARRAY_ADDITIONAL.cancel_donate[CURRENT_LANG] + '</span>';
								//cancel_span = '<span style = "color: red;">' + LOCALE_ARRAY_ADDITIONAL.cancel_donate[CURRENT_LANG] + '</span>';
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
										<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#program-page?program=' + object_id + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-history-help">Ask</a>\
										<div id="request-history-help" class="help-popup" data-role="popup" data-history="false">\
											<div class="title">\
												' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
											</div>\
											<div class="text">\
												' + LOCALE_ARRAY_ADDITIONAL.help_history_page_program[CURRENT_LANG] + '\
											</div>\
										</div>\
									</div>\
									<div role="main" class="ui-content">\
									<div class="left_col">\
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
									</div>\
									</div><div class="right_col"></div>';
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
				$('#weighted_voting_link').attr('onclick', 'alert(\'' + LOCALE_ARRAY_ADDITIONAL.only_for_donators[CURRENT_LANG] + '\');');
				$.mobile.navigate(return_page);
				//alert('okay');
			}
		});
	},
	events: function(){

		$(document).on('click', '#weighted_voting_link', function(e){
			if(PROGRAMS.my_add > 0){
				$.mobile.navigate('#weighted-votings-page?program=' + PROGRAMS.last_opened_id);
			}else{
				alert(LOCALE_ARRAY_ADDITIONAL.only_for_donators[CURRENT_LANG]);
			}
		});

		$(document).on('click', '#project_propositions_link', function(e){
			$('#projects_list_back').attr('back_url', '#program-page?program=' + PROGRAMS.last_opened_id);
			$.mobile.navigate('#projects-page?program=' + PROGRAMS.last_opened_id);
		});

	}
}
