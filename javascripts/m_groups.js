var GROUPS = {
	items_list_groups: [],
	items_list_spheres: [],
	last_item_groups: 0,
	last_item_spheres: 0,
	full_sph_list_load: 0,
	sph_full_list: [],
	group_id: 0,
	group_name: '',
	group_city: '',
	group_owner_id: 0,
	filter: '',
	reinit: 0,
	rebuild: 0,
	scrolled_down: 0,
	init: function(){
		var self = this;

		LIST_OF_ITEM.load = 1;

		$.mobile.loading( "show", {theme: "z"});

		if(GROUPS.scrolled_down){
			GROUPS.rebuild = 0;
			GROUPS.scrolled_down = 0;
		}

		// console.log(SUPER_PROFILE.payment);
		// if(SUPER_PROFILE.payment){
		// 	$('#btn_group_create').show();
		// } else {
		// 	$('#btn_group_create').hide();
		// }

		var l_filter = '';

		if($('#search_group').val() != ''){
			if(isNaN($('#search_group').val())) {
				l_filter = '&filter=' + encodeURIComponent($('#search_group').val());
			}else{
				l_filter = '&id=' + $('#search_group').val();
			}
		}

		if(self.filter != $('#search_group').val()) {
			self.last_item_groups = 0;
			self.filter = $('#search_group').val();
			GROUPS.rebuild = 1;
		}

		if(GROUPS.rebuild){
			$('#org_list').html('');
			self.last_item_members = 0;
			MEMBERS.rebuild = 0;
		}

		$.ajax({
			url: mainURL + '/groups.php?ls=' + self.last_item_groups + l_filter,
			type: "GET",
			async: false,
			complete: function( response ){
				//console.log(response);
				var l_groups_json = $.parseJSON(response.responseText);
				if(l_groups_json.length > 0){


					l_news_json = LIST_OF_ITEM.concat_omit_doubles(GROUPS.items_list_groups, l_groups_json);
					//console.log(l_news_json);
					GROUPS.items_list_groups = GROUPS.items_list_groups.concat(l_groups_json);
					$('#org_list').append(LIST_OF_ITEM.build_items_list(l_groups_json));
					GROUPS.last_item_groups += l_groups_json.length;
				}
			},
		});

		$.mobile.loading( "hide" );	
	},
	groups_spheres: function(p_group_id){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$('#create_sphere').hide();
		$('#members-btn').hide();
		$('#membership_ask').hide();
		$('#membership_stop').hide();

		//if direct url link used
		if(p_group_id == 0){
			if(location.href.indexOf('#my-spheres-options?id=') > -1){
				var match_array = location.href.match(/#my-spheres-options\?id=[0-9]*/i);
				p_group_id = match_array[0].match(/[0-9]+/i);
				$('#search_group').val(p_group_id);

				GROUPS.init();

			}
		}

		$.each(GROUPS.items_list_groups, function(i, l_one_item) {
			if(p_group_id == l_one_item.id){
				GROUPS.group_owner_id = l_one_item.user_id;
				GROUPS.group_id = l_one_item.id;

				switch(CURRENT_LANG){
					case 'en':
						GROUPS.group_city = l_one_item.city_en;
						GROUPS.group_name = l_one_item.org_en;
					break;
					case 'uk':
						GROUPS.group_city = l_one_item.city_uk;
						GROUPS.group_name = l_one_item.org_uk;
					break;
					case 'ru':
						GROUPS.group_city = l_one_item.city_ru;
						GROUPS.group_name = l_one_item.org_ru;
					break;
				}
			}
		});

		console.log(GROUPS.group_owner_id);
		console.log(SUPER_PROFILE.id);

		if(GROUPS.group_owner_id == SUPER_PROFILE.id 
			&& SUPER_PROFILE.id > 0 && GROUPS.group_owner_id > 0){

			$('#create_sphere').show();
			$('#members-btn').show();
			$('#membership_ask').hide();
			$('#membership_stop').hide();
		}else{

			$('#create_sphere').hide();
			$('#members-btn').hide();
			$('#membership_ask').show();
			$('#membership_stop').show();
		}

		$.ajax({
			url: mainURL + '/groups_spheres.php?org_id=' + p_group_id,
			type: "GET",

			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);

				self.items_list_spheres = $.parseJSON(response.responseText);
				if(self.items_list_spheres.length > 0){

					//TODO: exqlude doubles!!!
					$('#group_spheres_list').html(LIST_OF_ITEM.build_items_list(self.items_list_spheres));

				}else{
					$('#group_spheres_list').html('');
				}
			},
		});

		$('#group_id_name').html('<h3>ID:' + GROUPS.group_id + ' :: ' + GROUPS.group_name + '</h3>');

		$.mobile.loading( "hide" );	
	},
	get_full_sph_list: function(){
		var self = this;

		$.mobile.loading( "show", {theme: "z"});

		$.post(mainURL + '/groups_spheres_full.php', function(l_result){

			self.sph_full_list = $.parseJSON(l_result);

			if(self.sph_full_list.length > 0){
				var l_name = '';

				// Removes all options for the select box
				$('#full_spheres_list option').remove();
 				
				// .each loops through the array
				$.each(self.sph_full_list, function(i, l_one_item){

					switch(CURRENT_LANG){
						case 'en':
							l_name = (l_one_item.name_en);
							break;
						case 'uk':
							l_name = (l_one_item.name_uk);
							break;
						case 'ru':
							l_name = (l_one_item.name_ru);
							break;
					}
					$('#full_spheres_list').append('<option value="' + l_one_item.id + '">' + l_name + '</option>');

				});

				GROUPS.full_sph_list_load = 1;

			}else{
				$('#full_spheres_list option').remove();
			}
		});
		$.mobile.loading( "hide" );	
	},	
	events: function(){

		$('body').on('click', '.group-item', function(){
			GROUPS.group_id = $(this).attr('org_id');
			GROUPS.group_owner_id = $(this).attr('user_id');
			//$('#group_id_name h3').html();
			$.mobile.navigate('#my-spheres-options?id=' + GROUPS.group_id );
		});

		$('#my-groups .ui-icon-back').click(function(){
			$.mobile.navigate('#my-activities-page');
		});

		$('#btn_group_create').click(function(){
			$('#add-group #add_btn').attr('value', LOCALE_ARRAY_ADDITIONAL.group_add_btn[CURRENT_LANG]);
			$('#add-group #add-group-back').attr('back', 'my-groups');

			$.mobile.navigate('#add-group');
		});

		$('body').on('keyup', '#search_group', function(){
			GROUPS.init();
		});

		$('body').on('click', '#my-groups .ui-input-clear', function(){
			GROUPS.init();
		});

		$('body').on('click', '#add_btn', function(){
			var p_result = '';
			var l_json = '{"name_en":"' 
							+ f_escape_quotes($('input[name=name_en]').val())
							+ '", "name_uk":"' 
							+ f_escape_quotes($('input[name=name_uk]').val())
							+ '", "name_ru":"' 
							+ f_escape_quotes($('input[name=name_ru]').val())
							+ '"}';
			console.log(l_json);
			var group_add_ask = confirm(LOCALE_ARRAY_ADDITIONAL.group_add_question[CURRENT_LANG]);
			if(group_add_ask){
				$.post(mainURL + '/groups_add.php', 
						$.parseJSON(l_json),
						function(p_result){

					if(p_result.indexOf('error') > -1 ){
							message_result(p_result);
					}else{
						var l_result = $.parseJSON(p_result);
						GROUPS.group_id = l_result.id;
						GROUPS.group_owner_id = l_result.user_id;
						$.mobile.navigate('#my-spheres-options?id=' + GROUPS.group_id );
					}
				});
				
			}

			console.log('item_add');
		});

		$('#membership_ask').click(function(){
			var membership_ask = confirm(LOCALE_ARRAY_ADDITIONAL.membership_ask[CURRENT_LANG]);
			console.log(membership_ask);
			if(membership_ask){
				$.post(mainURL + '/groups_membership_request.php', $.parseJSON('{"request":1, "id":' + GROUPS.group_id + '}'), function(l_result){
					message_result(l_result);
				});				
			}
		});
		
		$('#membership_stop').click(function(){
			var membership_ask = confirm(LOCALE_ARRAY_ADDITIONAL.membership_stop[CURRENT_LANG]);
			if(membership_stop){
				$.post(mainURL + '/groups_membership_request.php', $.parseJSON('{"request":2, "id":' + GROUPS.group_id + '}'), function(l_result){
					message_result(l_result);
				});
			}
		});

		$('#create_sphere').click(function(){
			var self = this;
			if(GROUPS.full_sph_list_load == 0){
				GROUPS.get_full_sph_list();
			}
			$('#add-group-shpere #add_sph').attr('value', LOCALE_ARRAY_ADDITIONAL.sph_add_btn[CURRENT_LANG]);


			$.mobile.navigate('#add-group-shpere');
		});
		
		$('#members-btn').click(function(){
			MEMBERS.init();
		});

		$('#add-group-sphere-back').click(function(){
			$.mobile.navigate('#my-spheres-options?id=' + GROUPS.group_id );
		});

		$('#add_sph').click(function(){
			var l_text = $('#sph_name').val();
			var l_select = $('#full_spheres_list').val();

			$.post(mainURL + '/groups_sphere_add.php', $.parseJSON('{"t":"' + f_escape_quotes(l_text)
					+ '", "s":"' + f_escape_quotes(l_select) 
					+ '", "g":"' + GROUPS.group_id 
					+ '"}'), function(l_result){
				message_result(l_result);
			});
		});
	},
}

	// spheres_add: function(){
	// 	var full_list_spheres = [
	// 		"ActionScript",
	// 		"AppleScript",
	// 		"Asp"
	// 	    ];
	//     $('#sph_name').autocomplete({
	//     	source: full_list_spheres
	//     });
	// },