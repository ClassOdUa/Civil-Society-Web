
var PROJECT_PROPOSITION = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(){
		var self = this;
		var url = '';
		$.mobile.loading( "show", {theme: "z"});

		if(location.href.indexOf('#pp-list-page?program=') > -1){
			var match_array = location.href.match(/#pp-list-page\?program=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			url = mainURL + '/project_propositions.php?program_id=' + object_id;
			$('#pp-list-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.projects_propositions[CURRENT_LANG]);
			
			var return_to = '#program-page?program=' + object_id;
			if(object_id == 0){
				$('#pp-list-page #create_link').attr('style', 'display:none');
				return_to = '#social-entrepreneurship';
			}else{
				$('#pp-list-page #create_link').attr('style', 'display:block');
				$('#projects-page #create_proposition_link').attr('onclick', '$.mobile.navigate(\'#create-item?project_proposition=true&item=' + object_id + '\')');
			}

		}else if(location.href.indexOf('#pp-list-page?my_project_propositions=true') > -1){
			url = mainURL + '/project_propositions.php?my=1';
			$('#pp-list-page #create_link').attr('style', 'display:none');
			$('#pp-list-page #ui_title').html(LOCALE_ARRAY_ADDITIONAL.my_projects_propositions[CURRENT_LANG]);
		};

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
				if(self.data_array.length == 0){
					$('#pp-list').html('<center>Empty</center>');
				}	
				//console.log( self.data_array );
				self.check_current_url( 1 );
				self.build_elements();
				$('#pp-list-page #activated_filter').css('display', 'none'); 
				$('#pp-list-page #solo_filter').css('display', 'block');
				$.mobile.loading( "hide" );
	 	
			},
		});


		self.events();
	},

	build_elements: function(){
		var self = this;
		var elements_string = '';

		var build_array = self.data_array;

		jQuery.each(build_array, function(i, one_voting) {
			elements_string += self.collect_cash_build(one_voting);
		});

		$('#pp-list').append(elements_string);

	},

	project_proposition: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		//back button link:
		$('#projects_list_back').attr('back_url', '#program-page?program=' + data_for_build.program_id);

		$('.star').attr('data-vote_id', data_for_build.id);
		$('.star').attr('onclick', 'PROJECTS.stars_action(this, 1)');
		switch(data_for_build.stars){
			case "0":
				$('.star').removeClass('active');
				break;
			case "1":
				$('.star').removeClass('active');
				$('#star1').addClass('active');
				break;
			case "2":
				$('.star').removeClass('active');
				$('#star1').addClass('active');
				$('#star2').addClass('active');
				break;
			case "3":
				$('.star').removeClass('active');
				$('#star1').addClass('active');
				$('#star2').addClass('active');
				$('#star3').addClass('active');
				break;
			case "4":
				$('.star').addClass('active');
				break;
		}

		$('.pp-page .id').attr('p_id', data_for_build.id);
		$('.pp-page .id').html('ID: <strong>' + data_for_build.id + ' : ' + data_for_build.title + '</strong>');

/*		var tags_array = data_for_build.tags.split(",");
		var ui_tags = '';
 
 		//Tags string
		jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#projects-page?program=' + data_for_build.program_id + 'tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
		});

		var ui_pif_option = '';
		var flag_selected = 0;

		if(data_for_build.my_add){
			flag_selected = 1;
		}

		//Setting global variables, if page opened from direck link
		if(PROGRAMS.currency != data_for_build.currency_asking || PROGRAMS.my_add != data_for_build.my_program_add) {
			PROGRAMS.my_add = data_for_build.my_program_add;
			PROGRAMS.currency = data_for_build.currency_asking;
			PROGRAMS.currency_name = PIF.get_currency_name_by_id(data_for_build.currency_asking);
		}

		ui_pif_option = '<label>' + LOCALE_ARRAY_ADDITIONAL.your_add[CURRENT_LANG] 
						+ '</label><span class="support_value" my_add="'
						+ PROGRAMS.my_add
						+ '" currency="' 
						+ PROGRAMS.currency
						+ '"><b>' 
						+ PROGRAMS.my_add
						+ ' '
						+ PROGRAMS.currency_name 
						+ '</b></span>';

		var ui_donate_panel = '';
		if(data_for_build.status == 0){
			if(flag_selected == 1){
				var ui_donate_panel = '<div class="ui-grid-a">\
										<div class="ui-block-a">\
											<div>' 
											+ ui_pif_option 
											+ '</div>\
										</div>\
										<div class="ui-block-b">\
											<div class="text-field">\
												<label>' + LOCALE_ARRAY_ADDITIONAL.amount_of_money[CURRENT_LANG] + '</label>\
												<div class="ui-input-text">\
													<input type="number" min="0" step="1" max="' + PROGRAMS.my_add + '" value="' + PROGRAMS.my_add + '" name="amount" data-enhanced="true" />\
												</div>\
											</div>\
										</div>\
									</div>\
									<div class="ui-grid-solo">\
										<div class="ui-block-a">\
											<button class="ui-btn ui-corner-all ui-shadow donate-btn support-pp-btn" p_id="' + data_for_build.id + '">' + LOCALE_ARRAY_ADDITIONAL.donate[CURRENT_LANG] + '</button>\
										</div>\
										<div class="ui-block-a center">\
											<div class="ui-checkbox">\
												<label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.anonymous_donation[CURRENT_LANG] + '</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
											</div>\
										</div>\
									</div>\
								</div>';
			}else{
				ui_donate_panel = LOCALE_ARRAY_ADDITIONAL.donate_program_first[CURRENT_LANG] ;
			}
		}

		if(data_for_build.status == 0){
			var status_item = '<div class="status yellow">\
									' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' ' + data_for_build.dt_expired + '\
								</div>';						
		}else{
			var status_item = '<div class="status green">\
									' + LOCALE_ARRAY_ADDITIONAL.successfully_finished[CURRENT_LANG] + '\
								</div>';	
		}
*/

		$('#pp-page [data-role=header] h1').html(LOCALE_ARRAY_ADDITIONAL.project_proposition[CURRENT_LANG]);
		$('#pp-page .ui-icon-back').attr('back_url', '#pp-list-page?program=' + data_for_build.program_id);
		$('#pp-page-help .title').html(LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG]);
		$('#pp-page-help .text').html(LOCALE_ARRAY_ADDITIONAL.help_project_proposition[CURRENT_LANG]);

		$('#pp-page .project-item .img img').attr('src', mainURL + data_for_build.img);

/*		var ui_string = '';
		ui_string += '
					<div class="project-item-inner">\
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
							<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_project_proposition[CURRENT_LANG] + '</a>\
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
						<hr>\
						<div class="btn-next-page">\
							<a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=project_proposition&id=' + data_for_build.id + '\');">' + LOCALE_ARRAY_ADDITIONAL.history_donation[CURRENT_LANG] + '</a>\
						</div>\
					</div>\
					</div><div class="right_col"></div>\
				</div>\
			</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#project-page').html('');
		$( ui_string ).appendTo( '#project-page' );
		$('#project-page').enhanceWithin();
		$('#project-page select').selectmenu().selectmenu("refresh", true);	

		NCO.nco_build(3, data_for_build.id, data_for_build.author_id, data_for_build.nco_id, data_for_build.nco_list, data_for_build.nco_acceptance);
		NCO.events();

		//PROJECT_PROPOSITION.events();
*/
		$.mobile.loading( "hide" );
	},
	support: function(p_id, p_amount){

		var l_json = $.parseJSON('{"id":"' + p_id + '", "amount":"' + p_amount + '"}');

		$.ajax({
			url: mainURL + "/project_proposition_support.php", 
			type: "POST",
			data: l_json, 
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(p_result){
				//console.log(p_result);
				var l_result = $.parseJSON(p_result.responseText);
				var l_up = $('.amount_up #amount_up').attr('amount_up');
				var l_my = $('.project-item-inner #my_amount_current').attr('my_amount_current');

				var l_amount_up = l_up - l_my + l_result[0].amount_current;

				$('.amount_up #amount_up').html(l_amount_up);
				$('.amount_up #amount_up').attr('amount_up', l_amount_up);

				$('.project-item-inner #my_amount_current').html(l_result[0].amount_current);
				$('.project-item-inner #my_amount_current').attr('my_amount_current', l_result[0].amount_current);

				$(this).attr('my_add', l_result[0].amount_current);

				//alert(l_result[0].amount_current);

			}
		});



	},
	build_history_page: function(){
		var self = this;
		if(location.href.indexOf('#history-page?item=project&id=') > -1 || location.href.indexOf('#history-page?item=project_proposition&id=') > -1){
			if(location.href.indexOf('#history-page?item=project&id=') > -1){
				var match_array = location.href.match(/#history-page\?item=project&id=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var type = 4;
				var return_page = '#project-page?project=' + object_id;				
				//var return_page = '#project-page?project=';
			}else{
				var match_array = location.href.match(/#history-page\?item=project_proposition&id=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var type = 3;
				var return_page = '#project-page?project_proposition=' + object_id;
			}
			var my_add = 0;
			$.mobile.loading( "show", {theme: "z"});
			$.ajax({
			url: mainURL + '/fund_public_cf.php?type=' + type + '&id=' + object_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
					var funds_list = $.parseJSON( response.responseText );
					//console.log('project_proposition or project');	
					$.mobile.loading( "hide" );

					var ui_funds = '';
					var ui_cf = '';
					var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );

					jQuery.each(funds_list, function(i, one_fund) {
						for (var i = 0; i < one_fund.cf.length; i++) {
							var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
							var cancel_span = '';
							if(one_fund.cf[i].user_id == SUPER_PROFILE.id && SUPER_PROFILE.auth == true){
								cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "PROJECTS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',\'' + type + '\',\'' + object_id + '\',\'' + return_page + object_id + '\')">' + LOCALE_ARRAY_ADDITIONAL.cancel_donate[CURRENT_LANG] + '</span>';
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
										<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'' + return_page + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#project_proposition-history-help">Ask</a>\
										<div id="project_proposition-history-help" class="help-popup" data-role="popup" data-history="false">\
											<div class="title">\
												' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
											</div>\
											<div class="text">\
												' + LOCALE_ARRAY_ADDITIONAL.help_history_page_project_project[CURRENT_LANG] + '\
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
										</div><div class="right_col"></div>\
									</div>';
				$('#history-page').html( ui_funds ).enhanceWithin();
							
			},
			});
		}
	},
	events: function(){

		$('body').on('click', '.support-pp-btn', function(){
			var l_id = $(this).attr('p_id');
			var l_max_amount = $(this).attr('my_program_add');
			var l_amount = $('.input_amount').val();

			if(l_max_amount >= l_amount){
				PROJECT_PROPOSITION.support(l_id, l_amount);
			}else{
				alert(LOCALE_ARRAY_ADDITIONAL.incorrect_support_amount[CURRENT_LANG]);
			}

		});

		$(document).on('click', '#pp-list-back', function(e){
			$.mobile.navigate($(this).attr('back_url'));
		});

	}
};
