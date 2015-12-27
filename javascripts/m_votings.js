var CREATE_VOTE = {
	file: "",
	send_data: function(){
		var self = this;

		$( "#picture_form_create_vote" ).submit();
	},
	sendFormData: function()
	{	
		var error = 0;
		var img = $('#create-vote #response_img_create_vote').val();
		if($('#create-vote [name=name]').val() == ""){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_name_voting[CURRENT_LANG]);
			error = 1;
		}
		if($('#create-vote [name=sprt]').val() == "" && error != 1){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_supporters_voting[CURRENT_LANG]);
			error = 1;
		}
		if($('#create-vote [name=descr]').val() == "" && error != 1){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_description_voting[CURRENT_LANG]);
			error = 1;
		}
		if($('#create-vote [name=descr]').val() == "" && error != 1){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_description_voting[CURRENT_LANG]);
			error = 1;
		}
		if(($('#create-vote [name=sph]').val() == "" && $('#create_vote_global_sphere').is(':checked') != true) && error != 1){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_sphere_voting[CURRENT_LANG]);
			error = 1;
		}
		if(error != 1){
			$.mobile.loading( "show", {theme: "z"});

			var start_date = $('#create-vote [name=s_time_year]').val() + "-" 
							+ $('#create-vote [name=s_time_month]').val() + "-" 
							+ $('#create-vote [name=s_time_date]').val();
			var end_date = $('#create-vote [name=f_time_year]').val() + "-" 
						+ $('#create-vote [name=f_time_month]').val() + "-" 
						+ $('#create-vote [name=f_time_date]').val();
			if($('#create-vote #v0').hasClass('ui-checkbox-on')){
				var v0 = 1;
			}else{
				var v0 = 0;
			}
			if($('#create-vote #v1').hasClass('ui-checkbox-on')){
				var v1 = 1;
			}else{
				var v1 = 0;
			}
			if($('#create-vote #v2').hasClass('ui-checkbox-on')){
				var v2 = 1;
			}else{
				var v2 = 0;
			}
			if($('#create-vote #v3').hasClass('ui-checkbox-on')){
				var v3 = 1;
			}else{
				var v3 = 0;
			}
			if($('#create-vote #v4').hasClass('ui-checkbox-on')){
				var v4 = 1;
			}else{
				var v4 = 0;
			}
			if($('#create-vote #v5').hasClass('ui-checkbox-on')){
				var v5 = 1;
			}else{
				var v5 = 0;
			}

			var l_shp = 0;

			if($('#create_vote_global_sphere').is(':checked')){
				l_shp = 1;
			}else{
				l_shp = $('#create-vote [name=sph]').val();
			}

			$.ajax({
				url: mainURL + "/mc_add.php",
				type: "POST",
				data: {"img": img,
					 "sph": l_shp,
					 "name": $('#create-vote [name=name]').val(),
					 "s_time": start_date,
					 "f_time": end_date, 
					 "descr": $('#create-vote .jqte_editor').html(),
					 "sprt": $('#create-vote [name=sprt]').val(),
					 "v0": v0,
					 "v1": v1,
					 "v2": v2,
					 "v3": v3,
					 "v4": v4,
					 "v5": v5,
					 "age_from": 	$('#create-vote [name=age_from]').val(),
					 "age_to": $('#create-vote [name=age_to]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						alert(LOCALE_ARRAY_ADDITIONAL.voting_created[CURRENT_LANG]);
						$.mobile.navigate("#vote-page?vote=" + id);
					}else{
						if( response.responseText.indexOf('error') > -1 ){
							var error_arr = $.parseJSON(response.responseText);
							switch(CURRENT_LANG){
								case 'en':
									alert(error_arr[0].error);
									break;
								case 'ru':
									alert(error_arr[0].error_ru);
									break;
								case 'uk':
									alert(error_arr[0].error_uk);
									break;
							}
						}
					}
					$.mobile.loading( "hide" );

					/*if(response){
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						alert(LOCALE_ARRAY_ADDITIONAL.voting_created[CURRENT_LANG]);
						$.mobile.navigate("#vote-page?vote=" + id);
					}*/
					//console.log("saved ok, id = " + id);
					//alert('okay');
				}
			});

			//console.log(response.responseText);
		}
	}
};

var SPHERES = {
	list: {},
	spheres_array: [],
	spheres: [{name: "Votings by spheres",
			selector_name: "votings_by_sphere",
			type: 1,
			objects: []},
			{name: "Local self-governments indicative",
			selector_name: "local_self_goverments_indicative",
			type: 2,
			objects: []},
			{name: "Co-owners",
			selector_name: "co_owners",
			type: 3,
			objects: []},
			{name: "Votings in groups",
			selector_name: "groups_votings",
			type: 4,
			objects: []}/*,
			{name: "Public primaries",
			selector_name: "primaries",
			type: 5,
			objects: []},
			{name: "Elections",
			selector_name: "elections",
			type: 6,
			objects: []},
			{name: "Maidan",
			selector_name: "maidan",
			type: 7,
			objects: []},
			{name: "Candidates\' rating (Public proposal)",
			selector_name: "candidates_proposal",
			type: 8,
			objects: []},
			{name: "Candidates\' rating (Political Parties)",
			selector_name: "candidates_parties",
			type: 9,
			objects: []},
			{name: "Local self-governments",
			selector_name: "local_self_goverments",
			type: 10,
			objects: []}*/],
	set_locale_names: function(){
		var self = this;
		self.spheres[0].name = LOCALE_ARRAY_ADDITIONAL.votings_by_sphere[CURRENT_LANG];
		self.spheres[1].name = LOCALE_ARRAY_ADDITIONAL.local_self_goverments_indicative[CURRENT_LANG];
		self.spheres[2].name = LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG];
		self.spheres[3].name = LOCALE_ARRAY_ADDITIONAL.groups_votings[CURRENT_LANG];
		// self.spheres[4].name = LOCALE_ARRAY_ADDITIONAL.type_primaries[CURRENT_LANG];
		// self.spheres[5].name = LOCALE_ARRAY_ADDITIONAL.elections[CURRENT_LANG];
		// self.spheres[6].name = LOCALE_ARRAY_ADDITIONAL.type_maidan[CURRENT_LANG];
		// self.spheres[7].name = LOCALE_ARRAY_ADDITIONAL.candidates_proposal[CURRENT_LANG];
		// self.spheres[8].name = LOCALE_ARRAY_ADDITIONAL.candidates_parties[CURRENT_LANG];
		// self.spheres[9].name = LOCALE_ARRAY_ADDITIONAL.local_self_goverments[CURRENT_LANG];
	},
	initial: function(callback_function, forced_initial){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		self.set_locale_names();
		if(SPHERES.spheres_array.length == 0 || forced_initial){
			$.ajax({
				url: mainURL + '/filter.php',
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
						self.spheres_array = $.parseJSON( response.responseText );	
						self.normalize_array();
						if(location.href.indexOf('#votings-page') > -1){
							self.set_spheres_filters();
							$('.sphere_form select').selectmenu().selectmenu("refresh", true);
							VOTINGS.activated_hard_filter = 1;
						} else if(location.href.indexOf('#spheres-filters') > -1){
							self.set_spheres_filters();
							$('#spheres-filters .sphere_form select').selectmenu().selectmenu("refresh", true);
						} else if(location.href.indexOf('#spheres-address') > -1){
							self.set_spheres_and_listeners();
							$('#spheres-address .sphere_form select').selectmenu().selectmenu("refresh", true);
							$('#spheres-address').enhanceWithin();
						} else if(location.href.indexOf('#spheres-create-vote') > -1){
							self.set_spheres_create_vote();
							$('#spheres-create-vote .sphere_form select').selectmenu().selectmenu("refresh", true);
						}		
						$.mobile.loading( "hide" );
						
						if(callback_function)
							callback_function();
	
				},
			});
		}else{
			if(location.href.indexOf('#votings-page') > -1){
				self.set_spheres_filters();
				$('.sphere_form select').selectmenu().selectmenu("refresh", true);
			} else if(location.href.indexOf('#spheres-filters') > -1){
				self.set_spheres_filters();
				//console.log('#spheres-filters');
				$('#spheres-filters #sphere_form select').selectmenu().selectmenu("refresh", true);
			} else if(location.href.indexOf('#spheres-address') > -1){
				self.set_spheres_and_listeners();
				//console.log('#spheres-address');
				$('#spheres-address #sphere_form select').selectmenu().selectmenu("refresh", true);
				$('#spheres-address').enhanceWithin();
			} else if(location.href.indexOf('#spheres-create-vote') > -1){
				self.set_spheres_create_vote();
				//console.log('#spheres-create-vote');
				$('#spheres-create-vote #sphere_form select').selectmenu().selectmenu("refresh", true);
			}		

			$.mobile.loading( "hide" );
			
			if(callback_function)
				callback_function();
		}		
	},
	normalize_array: function(){
		var self = this;
		for ( var j = 0; j < self.spheres.length; j++ ) {				
			self.spheres[j].objects = [];
		}
		for ( var i = 0; i < self.spheres_array.length; i++ ) {			
			for ( var j = 0; j < self.spheres.length; j++ ) {				
				if( self.spheres_array[i].type == self.spheres[j].type ){
					self.spheres[j].objects[self.spheres[j].objects.length] = self.spheres_array[i];
					break; 
				}
			}
		}
	},
	set_spheres_and_listeners: function(){
		var self = this;
		var ui_string = '<legend>' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + '</legend>';
		//var founded_matches;
		//console.log( self.spheres_array );
		for ( var i = 0; i < self.spheres.length; i++ ) {
			if(self.spheres[i].objects.length == 0){
				ui_string += '<div>\
				<select class = "non_container" name="' + self.spheres[i].selector_name + '">\
					<option value="' + self.spheres[i].name + '">' + self.spheres[i].name + '</option>\
				</select></div>';
			}
			if(self.spheres[i].objects.length > 0){
				if(self.spheres[i].objects[0].org == ''){
					//console.log('equal one');
					ui_string += '<div class = "content_value">\
									<select data-ajax="false" name = "' + self.spheres[i].selector_name + '" multiple="multiple" data-native-menu="false">\
										<option>' + self.spheres[i].name + '</option>';
					
					for (var j = 0; j < self.spheres[i].objects[0].sph.length; j++) {
						if(self.spheres[i].objects[0].sph[j].fav == 1){
							ui_string += '<option value = "' + self.spheres[i].objects[0].sph[j].idc + '" selected>' + self.spheres[i].objects[0].sph[j].sphere + '</option>';
						}else{
							ui_string += '<option value = "' + self.spheres[i].objects[0].sph[j].idc + '">' + self.spheres[i].objects[0].sph[j].sphere + '</option>';
						}
						
					}

					ui_string += '</select>\
								</div>';
				}else{
					//console.log('equal more than one');
					var varable = '#spheres-address #' + self.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "SPHERES.show_mini_spheres(\'' + varable + '\');">\
									<select disabled class = "container" name="' + self.spheres[i].selector_name + '"><option value="' + self.spheres[i].name + '">' + self.spheres[i].name + '</option></select>\
								</div>';
					ui_string += '<div id = "' + self.spheres[i].selector_name + '_content" style = "display:none;">';
					for (var k = 0; k < self.spheres[i].objects.length; k++) {
						ui_string += '<div class = "content_value">\
									<select data-mini="true" name ="' + self.spheres[i].selector_name + '" multiple="multiple" data-native-menu="false">\
										<option>' + self.spheres[i].objects[k].org + '</option>';
						
						for (var j = 0; j < self.spheres[i].objects[k].sph.length; j++) {
							if(self.spheres[i].objects[k].sph[j].fav == 1){
								ui_string += '<option value = "' + self.spheres[i].objects[k].sph[j].idc + '" selected>' + self.spheres[i].objects[k].sph[j].sphere + '</option>';
							}else{
								ui_string += '<option value = "' + self.spheres[i].objects[k].sph[j].idc + '">' + self.spheres[i].objects[k].sph[j].sphere + '</option>';
							}
							
						}
						ui_string += '</select>\
								</div>'; 
					}
					ui_string += '</div>';
				}
			}
		}
		$('#spheres-address #sphere_form').html('');
		$('#spheres-address #sphere_form').html(ui_string);
		var arr = $('#spheres-address #sphere_form .container option');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		var arr = $('#spheres-address #sphere_form .non_container');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		/*$('#spheres-address .ui-content input[type=submit]').on('click', function(){
			
		});*/
	},
	save_and_delete_spheres: function(){
		var self = this;
		var spheres_option = $('#spheres-address #sphere_form .content_value option');
		for (var i = 0; i < spheres_option.length; i++) {
			if(!$(spheres_option[i]).data('placeholder')){
				self.delete_sphere($(spheres_option[i]).val());
			} 
		}
		var spheres_option_selected = $('#spheres-address #sphere_form .content_value option:selected')
		for (var i = 0; i < spheres_option_selected.length; i++) {
			self.save_sphere($(spheres_option_selected[i]).val());
		}
		//console.log("was saved");
		//alert('сохранено!');
		//$.mobile.navigate("#edit-address");
	},
	delete_sphere: function(id_sphere){
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/filter_fav_add.php?id=' + id_sphere + '&rm=1',
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				$.mobile.loading( "hide" );
			},
		});
	},
	save_sphere: function(id_sphere){
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/filter_fav_add.php?id=' + id_sphere,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
					$.mobile.loading( "hide" );	
			},
		});
	},
	show_mini_spheres: function (selector_content){
		if($(selector_content).attr('style') == 'display:none;'){
			$(selector_content).attr('style', '');
		}else{
			$(selector_content).attr('style', 'display:none;');
		}
	},
	set_spheres_filters: function(){
		var self = this;
		var ui_string = '<legend>' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + '</legend>';
		//var founded_matches;

		for ( var i = 0; i < SPHERES.spheres.length; i++ ) {
			/*if(SPHERES.spheres[i].objects.length == 0){
				ui_string += '<div>\
				<select class = "non_container" name="' + SPHERES.spheres[i].selector_name + '">\
					<option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option>\
				</select></div>';
			}*/
			if(SPHERES.spheres[i].objects.length > 0){
				if(SPHERES.spheres[i].objects[0].org == ''){
					//console.log('equal one');
					ui_string += '<div class = "content_value">\
									<select onchange = "VOTINGS.filter_data($(this).val(), 0, \'' + SPHERES.spheres[i].selector_name + '\')" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
										<option>' + SPHERES.spheres[i].name + '</option>';
					
					for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
						ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc + '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';					
					}

					ui_string += '</select>\
								</div>';
				}else{
					//console.log('equal more than one');
					var varable = '.sphere_form #' + SPHERES.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "SPHERES.show_mini_spheres(\'' + varable + '\');">\
									<select disabled class = "container" name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
								</div>';
					ui_string += '<div id = "' + SPHERES.spheres[i].selector_name + '_content" style = "display:none;">';
					for (var k = 0; k < SPHERES.spheres[i].objects.length; k++) {
						ui_string += '<div class = "content_value">\
									<select onchange = "VOTINGS.filter_data($(this).val(), 0, \'' + SPHERES.spheres[i].selector_name + '\')" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
										<option>' + SPHERES.spheres[i].objects[k].org + '</option>';
						
						for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
							ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc + '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';						
						}
						ui_string += '</select>\
								</div>'; 
					}
					ui_string += '</div>';
				}				
			}
		}

		$('.sphere_form').html(ui_string);
		var arr = $('.sphere_form .container option');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}

		$('#spheres-filters #sphere_form').html(ui_string);
		var arr = $('#spheres-filters #sphere_form .container option');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		var arr = $('#spheres-filters #sphere_form .non_container');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		if(location.href.indexOf('#spheres-filters') > -1){
			$('#spheres-filters #sphere_form select').selectmenu().selectmenu("refresh", true);	
		}
	},
	set_spheres_create_vote: function(){
		var self = this;

		function temp_callback(){
			return function(){
				var ui_string = '<legend>' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + '</legend>';

				for ( var i = 0; i < SPHERES.spheres.length; i++ ) {
					if(SPHERES.spheres[i].objects.length == 0){
						ui_string += '<div>\
						<select class = "non_container" name="' + SPHERES.spheres[i].selector_name + '">\
							<option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option>\
						</select></div>';
					}

					if(SPHERES.spheres[i].objects.length > 0){
						if(SPHERES.spheres[i].objects[0].org == ''){
							//console.log('equal one');
							ui_string += '<div class = "content_value">\
											<select onchange = "$.mobile.loading( \'show\', {theme: \'z\'}); $.mobile.navigate(\'#create-vote\'); $(\'#create-vote [name=sph]\').val($(this).val()); $(\'#create_vote_sphere\').html(\'' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + SPHERES.spheres[i].name + '\');" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
												<option>' + SPHERES.spheres[i].name + '</option>';
							
							for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
								ui_string += '<option data-checkbox = "1" value = "' + SPHERES.spheres[i].objects[0].sph[j].idc + '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';					
							}

							ui_string += '</select>\
										</div>';
						}else{
							//console.log('equal more than one');
							var varable = '#spheres-create-vote #' + SPHERES.spheres[i].selector_name + '_content';
							ui_string += '<div onclick = "SPHERES.show_mini_spheres(\'' + varable + '\');">\
											<select disabled class = "container" name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
										</div>';
							ui_string += '<div id = "' + SPHERES.spheres[i].selector_name + '_content" style = "display:none;">';
							for (var k = 0; k < SPHERES.spheres[i].objects.length; k++) {
								ui_string += '<div class = "content_value">\
											<select onchange = "$.mobile.loading( \'show\', {theme: \'z\'}); $.mobile.navigate(\'#create-vote\'); $(\'#create-vote [name=sph]\').val($(this).val()); $(\'#create_vote_sphere\').html(\'' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + SPHERES.spheres[i].name + '\');" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
												<option>' + SPHERES.spheres[i].objects[k].org + '</option>';
								
								for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
									ui_string += '<option data-checkbox = "1" value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +'">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';						
								}
								ui_string += '</select>\
										</div>'; 
							}
							ui_string += '</div>';
						}
						
					}
				}
				//console.log('second');
				$('#spheres-create-vote #sphere_form').html(ui_string);
				var arr = $('#spheres-create-vote #sphere_form .container option');
				for (var i = 0; i < arr.length; i++) {
					$(arr[i]).hide();
				}
				var arr = $('#spheres-create-vote #sphere_form .non_container');
				for (var i = 0; i < arr.length; i++) {
					$(arr[i]).hide();
				}
				if(location.href.indexOf('#spheres-create-vote') > -1){
					$('#spheres-create-vote #sphere_form select').selectmenu().selectmenu("refresh", true);	
				}
			}
		}

		if(SPHERES.spheres_array.length == 0){
			self.initial(temp_callback());
		}else{
			COMMON_OBJECT.free_callbacker( temp_callback() );			
		}		
	},
	f_sph: function(p_org, p_sph){
		var l_return = '<div class="sph_selector_org" data-role="collapsible" ><h3>'
							+ p_org
							+ '</h3><ul class="sph_listview" data-role="listview">';

		$.each(p_sph, function(i, l_one_sph){
			l_return += '<li><a href="#" class="sph_idc" p_idc="' + l_one_sph.idc + '">' + l_one_sph.sphere + '</a></li>';
		});

		l_return += '</ul></div>';

		return l_return;
	},
	init: function(){
		var self = this;
		//$.mobile.loading( "show", {theme: "z"});

		$.post(mainURL + '/filter.php', function(l_result){
			self.list = $.parseJSON(l_result);

			$('.sph_selector').html('');
			var l_sph_tree = [];

			$.each(self.list, function(i, l_one_item){
				console.log(l_one_item);

				if(l_sph_tree[l_one_item.type] === undefined){ 
					l_sph_tree[l_one_item.type] = ''; 
				}

				l_sph_tree[l_one_item.type] += self.f_sph(l_one_item.org, l_one_item.sph);

			});

			$.each(l_sph_tree, function(i, l_sph_item){
				if(l_sph_item === undefined){
					console.log(i);
				}else{
					$('.sph_selector').append('<div class="sph_selector_type" data-role="collapsible"><h3>' + LOCALE_ARRAY_ADDITIONAL.sphs[i][CURRENT_LANG] + '</h3>' + l_sph_item + '</div>');
				}
			});

			$('.sph_selector_type').collapsible();
			$('.sph_selector_org').collapsible();
			$('.sph_listview').listview();

		});
	},
	events: function(){
		$(document).on('click', '.sph_idc', function(e){
			var l_idc = $(this).attr('p_idc');
			alert(l_idc);

		});
	},
};

var VOTINGS = {
	votings_array: [],
	voters_list: [],
	voting_last_item: 0,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.voting_last_item = 0;
		$('#votings-page #searched_string').val('');

		$.mobile.loading( "show", {theme: "z"});
		//SPHERES.initial();
		if(location.href.indexOf('#votings-page?program=') > -1){
			var match_array = location.href.match(/#votings-page\?program=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			var url = mainURL + '/weighted_votings.php?program_id=' + object_id;
		}else{
			if(location.href.indexOf('#votings-page?type=') > -1){
				var match_array = location.href.match(/#votings-page\?type=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = mainURL + '/mc.php?type=' + object_id;

			}else if(location.href.indexOf('#votings-page?filter=') > -1){
				self.activated_easy_filter = 1;
				var match_array = location.href.match(/filter=[%a-zA-Z0-9]*/i);
				var object_search = match_array[0].match(/filter=[%a-zA-Z0-9]*/i);

				var url = mainURL + '/mc.php?' + object_search + '&ls=' + self.voting_last_item;

			}else{
				var url = mainURL + '/mc.php?';
			}

			if(location.href.indexOf('&sph=') > -1){
				var match_array_sph = location.href.match(/&sph=[0-9]*/i);
				url += match_array_sph[0];
			}

			if(location.href.indexOf('&type=') > -1){
				var match_array_type = location.href.match(/&type=[0-9]*/i);
				url += match_array_type[0];
			}

			if(location.href.indexOf('&sort=') > -1){
				var match_array_sort = location.href.match(/&sort=[0-9]*/i);
				url += match_array_sort[0];
			}

			if(location.href.indexOf('&direct=') > -1){
				var match_array_direct = location.href.match(/&direct=[0-9]*/i);
				url += match_array_direct[0];
			}
		}

		//console.log('init:' + url);

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				self.votings_array = $.parseJSON( response.responseText );	
				//console.log( self.votings_array );
				self.check_current_url( 1 );
				self.build_elements();
				$('#votings-page #activated_filter').css('display', 'none'); 
				$('#votings-page #solo_filter').css('display', 'block');	 
				if(call_back){
					call_back();
				}
				$.mobile.loading( "hide" );

			},
		});

		$('.right_col').html(LOCALE_ARRAY_ADDITIONAL.right_col_votings_page[CURRENT_LANG]);

	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		//console.log(name_sphere);
		$.mobile.loading( "show", {theme: "z"});

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

		var url = mainURL + '/mc.php?';

		if($('#votings-page #searched_string').val() != ""){
			url += '&filter=' + $('#votings-page #searched_string').val();
		}

		var l_sort = $('#votings-page [name=sort]').val();

		if(l_sort >= 0 && l_sort < 6){
			url += '&sort=' + l_sort;
		}

		var l_status = $('#votings-page [name=status] option:selected').val();

		if(l_status > -1 && l_status < 5){
			url += '&status=' + l_status;
		}

		var l_sort_dir = $('#votings-page [name=sort_direction]').val();

		if(l_sort_dir == 0 || l_sort_dir ==1){
			url += '&direct=' + l_sort_dir;
		}

		switch($('#votings-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#votings-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#votings-page [name=sort]').data('direct', 0);
				break;
		}

		if($('.start_date_checkbox').is(':checked')){

			var start_date = $('#votings-page [name=start_year]').val() + "-" 
							+ $('#votings-page [name=start_month]').val() + "-" 
							+ $('#votings-page [name=start_date]').val();
			url += '&start=' + start_date;
		}

		if($('.finish_date_checkbox').is(':checked')){

			var end_date = $('#votings-page [name=end_year]').val() + "-" 
						+ $('#votings-page [name=end_month]').val() + "-" 
						+ $('#votings-page [name=end_date]').val();
			url += '&finish=' + end_date;
		}

		if(reinit){
			var object_search = '';
			if(location.href.indexOf('filter=') > -1){
				var match_array = location.href.match(/filter=[%a-zA-Z0-9]*/i);
				url += '&' + match_array[0].match(/filter=[%a-zA-Z0-9]*/i);
			}



			if(location.href.indexOf('&sph=') > -1){
				var match_array_sph = location.href.match(/&sph=[0-9]*/i);
				url += match_array_sph[0];
			}

			if(location.href.indexOf('&type=') > -1){
				var match_array_type = location.href.match(/&type=[0-9]*/i);
				url += match_array_type[0];
			}

			self.voting_last_item += 10;	

			url += '&ls=' + self.voting_last_item;
		}

		if(self.sphere_filter > 0){
			//console.log(self.sphere_filter);
			url += '&sph=' + self.sphere_filter;
		} 

		console.log('filter:' + url);

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				self.votings_array = $.parseJSON( response.responseText );	
				if(self.votings_array.length > 0){
					self.check_current_url( 1 );
					if(reinit){
						self.build_elements( "", true );	
					}else{
						self.build_elements();	
					}
				} else if(self.votings_array.length == 0 && reinit != 1 && self.activated_hard_filter == 1){
					alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
				}
				$.mobile.loading( "hide" );
			},
		});
	},
	reinit: function(){
		var self = this;
		if(location.href.indexOf('#votings-page?filter=') > -1){
			self.activated_easy_filter = 1;
		}
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			$.mobile.loading( "show", {theme: "z"});

			if(location.href.indexOf('#votings-page?type=') > -1){
				var match_array = location.href.match(/#votings-page\?type=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = mainURL + '/mc.php?type=' + object_id + '&ls=' + self.voting_last_item;

			}else if(location.href.indexOf('#votings-page?filter=') > -1){
				var match_array = location.href.match(/#votings-page\?filter=[%a-zA-Z0-9]*/i);
				var object_search = match_array[0].match(/filter=[%a-zA-Z0-9]*/i);
				
				var url = mainURL + '/mc.php?' + object_search + '&ls=' + self.voting_last_item;

			}else{
				var url = mainURL + '/mc.php?ls=' + self.voting_last_item;
			}

			if(location.href.indexOf('&sph=') > -1){
				var match_array_sph = location.href.match(/&sph=[0-9]*/i);
				url += match_array_sph[0];
			}

			if(location.href.indexOf('&type=') > -1){
				var match_array_type = location.href.match(/&type=[0-9]*/i);
				url += match_array_type[0];
			}

			//console.log('REinit:' + url);

			$.ajax({
				url: url,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					//console.log('REinit:' + response);
				
					var query_array =$.parseJSON( response.responseText );	
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
	support_voting: function(vote_id, page){
		$.ajax({
			url: mainURL + '/like_add.php?id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				console.log("all ok!");	 
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
		if( parseInt( $('#all_supporters').html() ) == parseInt( $('#supported').html() )){
			VOTINGS.get_one_element(vote_id);
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
				case '0':
					elements_string += self.collect_supports_build(one_voting);
					break;
				case '1':
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
			$('#votings-page #votings_list').append(elements_string);
		}else{
			$('#votings-page #votings_list').html(elements_string);
		}
	},
	vote_for_voting:function(object_id){
		var self = this;

		setTimeout(function(){
			var status_current_voting = '';
			if($('#vote-page .ui-btn.btn-yes').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-yes').data('checked') == '1'){
				var vote = 1;
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_yes[CURRENT_LANG];
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_abstained[CURRENT_LANG];
			}else if($('#vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_no[CURRENT_LANG];
			}else{
				$('#vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
				$('#vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
				$('#vote-page .ui-btn.btn-yes').data('checked', 1);
				$('#vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
				$('#vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
				$('#vote-page .ui-btn.btn-abstain').data('checked', 1);
				$('#vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
				$('#vote-page .ui-btn.btn-no').addClass("ui-radio-off");
				$('#vote-page .ui-btn.btn-no').data('checked', 1);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_did_not_vote[CURRENT_LANG];
				var vote = 0;
			}

			if($('#vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
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
			$('#vote-page .selected-text').html( status_current_voting );
			$.ajax({
				url: mainURL + '/vote_add.php?id=' + object_id + '&vote=' + vote + '&open=' + open_name,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					function cb(){
						return function(){
							self.switch_page_for_build(object_id, 1);
						}
					}
					if(response && response.responseText.indexOf('error') == -1){
						self.init(cb(object_id));
						console.log('response error');
					}else{
						if( response.responseText.indexOf('error') > -1 ){
							var error_arr = $.parseJSON(response.responseText);
							switch(CURRENT_LANG){
								case 'en':
									alert(error_arr[0].error);
									break;
								case 'ru':
									alert(error_arr[2].error_ru);
									break;
								case 'uk':
									alert(error_arr[1].error_uk);
									break;
							}
						}
					}
					console.log('ok');
				},
			});
		}, 100);
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
					url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=0&obj=1",
					type: "GET",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					complete: function( response ){
						console.log('ok');
					}
				});
				return false;
			}

			$.ajax({
				url: mainURL + "/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=1",
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					console.log('ok');
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-supporters" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
									<div class="count">\
										<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprtd + '/' + one_voting.sprt + '</strong>\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + '" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
										<div class="count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprt + '</strong>\
										</div>\
										<div class="total-count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.all_voters[CURRENT_LANG] + '</span> <strong>' + percents_object.sum_values + '</strong>\
										</div>\
										<div class="voting-line clearfix">\
											<span class="left" style="width: ' + parseInt(percents_object.plus_percent) + '%">' + parseInt(one_voting.vote_yes) + '</span><span class="middle" style="width: ' + parseInt(percents_object.abstained_percent) + '%">' + parseInt(one_voting.vote_nth) + '</span><span class="right" style="width: ' + parseInt(percents_object.minus_percent) + '%">' + parseInt(one_voting.vote_no) + '</span>\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-completed" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
										<div class="count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprt + '</strong>\
										</div>\
										<div class="total-count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.all_voters[CURRENT_LANG] + '</span> <strong>' + percents_object.sum_values + '</strong>\
										</div>\
										<div class="voting-line clearfix">\
											<span class="left" style="width: ' + parseInt(percents_object.plus_percent) + '%">' + parseInt(one_voting.vote_yes) + '</span><span class="middle" style="width: ' + parseInt(percents_object.abstained_percent) + '%">' + parseInt(one_voting.vote_nth) + '</span><span class="right" style="width: ' + parseInt(percents_object.minus_percent) + '%">' + parseInt(one_voting.vote_no) + '</span>\
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

		if(SUPER_PROFILE.id == data_for_build.author_id && data_for_build.sprtd == "0"){
			var delete_button = '<div class="delete_vote_button">\
									<a onclick = "VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#votings-page\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
		}else{
			var delete_button = '';
		}

		var organization = '';
		if(data_for_build.org){
			var organization = data_for_build.org + " - ";
		}

		var l_city = '';
		switch(CURRENT_LANG){
			case "en":
				l_city = data_for_build.city_en;
			break;
			case "ru":
				l_city = data_for_build.city_ru;
			break;
			case "uk":
				l_city = data_for_build.city_uk;
			break;
		}

		organization += l_city + " - ";

		var support_button = '';
		var status_vote = '';
		if(canceled == 0 && SUPER_PROFILE.auth == true){
			if(data_for_build.sprt_my == 1){
				support_button = '<strong data-supported = "1" style = "cursor: pointer" id = "support" onclick = "VOTINGS.support_voting(' + data_for_build.id + ', \'vote\')">Not support</strong>';
			}else{
				support_button = '<strong data-supported = "0" style = "cursor: pointer" id = "support" onclick = "VOTINGS.support_voting(' + data_for_build.id + ', \'vote\')">Support</strong>';
			}
			
			status_vote = '<div class="status yellow">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.sprtf +
						 '</span></div>\ ';
		}else{
			if(canceled != 0){
				status_vote = '<div class="status red" >\
								<span>' + LOCALE_ARRAY_ADDITIONAL.voting_canceled[CURRENT_LANG] + '</span>\
							</div>\ ';
			}else{
				status_vote = '<div class="status yellow">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.sprtf +
						 '</span></div>\ ';
			}
			
		}

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
		}
		var create_project_button = '';
		if( data_for_build.cpb == "1" && SUPER_PROFILE.auth == true){
			create_project_button = '<div id = "create_project_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'project\')">' + LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG] + '</a>\
									</div>';
		}	
		var create_request_button = '';
		if( data_for_build.crb == "1" && SUPER_PROFILE.auth == true){
			create_request_button = '<div id = "create_request_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'request\')">' + LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG] + '</a>\
									</div>';
		}
		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
									<h1>' + LOCALE_ARRAY_ADDITIONAL.vote[CURRENT_LANG] + '</h1>\
									<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#votings-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
												 ' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + '::<b>' + data_for_build.author_id + ' @' + data_for_build.author + '</b>\
											</div>\
											<div class="address">\
												' + LOCALE_ARRAY_ADDITIONAL.share[CURRENT_LANG] + ' - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
											</div>\
											<div class="num-votes-support">\
												' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
												<div class="counter">\
													<span><test id = "supported">' + data_for_build.sprtd + '</test>/<test id = "all_supporters">' + data_for_build.sprt + '</test></span>' + support_button + '</div>\
											</div>' + status_vote +
											'<div class="desc">' + data_for_build.description + ' </div>\
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
															<a target="_blank" class="fb" href="https://www.facebook.com/dialog/feed?app_id=1576819145899302&redirect_uri=' + encodeURIComponent(location.href) + '&picture=' + encodeURIComponent(mainURL + data_for_build.img) + '&caption=' + encodeURIComponent(LOCALE_ARRAY_ADDITIONAL.vote[CURRENT_LANG] + ' ID:' + data_for_build.id + ' : ' + data_for_build.name) + '&description=' + encodeURIComponent(data_for_build.description) + ' ' + mainURL + '#vote-page?vote=' + data_for_build.id + '&lang=2"></a>\
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
											' + create_project_button + '\
											' + create_request_button + '\
										</div>\
									</div>\
								</div>\
								<div class="right_col"></div></div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#vote-page').html('');
		$( ui_string ).appendTo( '#vote-page' );
		$('#vote-page').enhanceWithin();
		$.mobile.loading( "hide" );
	},
	current_vote_page_voting_period: function(data_for_build, finished, type_trigger){
		var self = this;
		for (var k = 0; k < SPHERES.spheres.length; k++) {
			if(SPHERES.spheres[k].type == parseInt( data_for_build.type ) ){
				var type_sphere = SPHERES.spheres[k].name;
				break;
			}
		}
		var organization = '';
		if(data_for_build.org){
			organization = data_for_build.org + " - ";
		}

		var l_city = '';
		switch(CURRENT_LANG){
			case "en":
				l_city = data_for_build.city_en;
			break;
			case "ru":
				l_city = data_for_build.city_ru;
			break;
			case "uk":
				l_city = data_for_build.city_uk;
			break;
		}

		organization += l_city + " - ";

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
		var only_buttons = '';
		if(finished == 0){
			only_buttons = '<fieldset class="vote-radio-group" data-role="controlgroup" name="vote_buttons" idv = "' + data_for_build.id + '" id="vote_buttons" data-type="horizontal">\
			<legend>' + LOCALE_ARRAY_ADDITIONAL.yes_no_i_do_not_know[CURRENT_LANG] + '</legend>\
			<div class="ui-radio ' + selected_class_yes + '">\
				<input type="radio" name="vote" id = "yes_' + data_for_build.id + '" value="1" data-enhanced="true"><label data-checked = "' + checked_yes + '" class="ui-btn ui-radio-off btn-yes">' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + '</label>\
			</div>\
			<div class="ui-radio ' + selected_class_abstain + '">\
				<label data-checked = "' + checked_abstain + '" class="ui-btn ui-radio-off btn-abstain">' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + '</label><input type="radio" id = "abstain_' + data_for_build.id + '" name="vote" value="3" data-enhanced="true">\
			</div>\
			<div class="ui-radio ' + selected_class_no + '" >\
				<label data-checked = "' + checked_no + '" class="ui-btn ui-radio-off btn-no">' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + '</label><input type="radio" id = "no_' + data_for_build.id + '" name="vote" value="2" data-enhanced="true">\
			</div>\
		</fieldset>\
		<div class="ui-checkbox' + selected_class_checkbox + '">\
			<label class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.turn_to_open_anonymous[CURRENT_LANG] + '</label><input type="checkbox" name="open_vote" value="1" data-enhanced="true" />\
		</div>';
		}
		var voting_buttons = '';
		var status_vote = '';
		if(finished == 0){
			status_vote = '<div class="status blue">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.time_voting[CURRENT_LANG] + ' ' + data_for_build.start + ' - ' + data_for_build.finish +
						 '</span></div>\ ';
		}else{
			if(finished == 1){
				status_vote = '<div class="status green">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.voting_finished[CURRENT_LANG] + '</span>\
							</div>\ ';
			}
		}
		if(finished == 0 && SUPER_PROFILE.auth == true){
			voting_buttons = '<form action="" accept-charset="UTF-8" method="post">\
						' + only_buttons + '\
						<div class="selected-text">\
							' + status_current_voting + '\
							</div></form>\ ';
		}else if(SUPER_PROFILE.auth == false){
			voting_buttons = LOCALE_ARRAY_ADDITIONAL.regiter_now[CURRENT_LANG];
		}

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
		}
		var create_project_button = '';
		if( data_for_build.cpb == "1" && SUPER_PROFILE.auth == true){
			create_project_button = '<div id = "create_project_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'project\')">' + LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG] + '</a>\
									</div>';
		}	
		var create_request_button = '';
		if( data_for_build.crb == "1" && SUPER_PROFILE.auth == true){
			create_request_button = '<div id = "create_request_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'request\')">' + LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG] + '</a>\
									</div>';
		}
		var charts = '';
		for (var i = 0; i < 6; i++) {
			if(i == 0 || i == 3){
				var selector_chart = "ui-block-a";
				if(i == 0){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.auth_by_email[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG];
				}
			}				
			if(i == 1 || i == 4){
				var selector_chart = "ui-block-b";
				if(i == 1){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.social_network[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.by_payment[CURRENT_LANG];
				}
			}				
			if(i == 2 || i == 5){
				var selector_chart = "ui-block-c";
				if(i == 2){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.community[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.by_passport[CURRENT_LANG];
				}
			}				
			charts += self.build_one_chart( selector_chart, i+1, data_for_build['plus' + i], data_for_build['minus' + i], data_for_build['abstained' + i], name_chart);
		}
		var ui_string = '';
		ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						<h1>' + LOCALE_ARRAY_ADDITIONAL.vote[CURRENT_LANG] + '</h1>\
							<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#votings-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
										ID: <b>' + data_for_build.id + ' : ' + data_for_build.name + '</b>\
									</div>\
									<div class="username">\
										' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + '::<b>' + data_for_build.author_id + ' @' + data_for_build.author + '</b>\
									</div>\
									<div class="address">\
										' + LOCALE_ARRAY_ADDITIONAL.sphere[CURRENT_LANG] + ' - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
									</div>\
									<div class="num-votes-support">\
										' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
										<div class="counter">\
											<span>' + data_for_build.sprtd + '</span>\
										</div>\
									</div>' + status_vote + 
									'<div class="desc">' + data_for_build.description + ' </div>\
									<div class="discuss-btn">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
									</div>\
									<div class="btn-login-soc">\
										<button data-role="button" class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
										<div class="social-wrap">\
											<div class="ui-grid-b">\
												<div class="ui-block-a">\
													<a target="_blank" class="vk" href="https://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + mainURL + data_for_build.img + '"></a>\
												</div>\
												<div class="ui-block-b">\
													<a target="_blank" class="fb" href="https://www.facebook.com/dialog/feed?app_id=1576819145899302&redirect_uri=' + encodeURIComponent(location.href) + '&picture=' + encodeURIComponent(mainURL + data_for_build.img) + '&caption=' + encodeURIComponent(LOCALE_ARRAY_ADDITIONAL.vote[CURRENT_LANG] + ' ID:' + data_for_build.id + ' : ' + data_for_build.name) + '&description=' + encodeURIComponent(data_for_build.description) + ' ' + mainURL + '#vote-page?vote=' + data_for_build.id + '&lang=2"></a>\
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
									' + create_project_button + '\
									' + create_request_button + '\
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
										<div class="ui-grid-b charts-wrap">\
											' + charts + '\
										</div>\
									</div>\ ' + voting_buttons + ' <div class="btn-next-page">\
										<a class="ui-btn ui-btn-icon-right" href="#" onclick = " $.mobile.navigate(\'#voters-page?voting=' + data_for_build.id + '\'); VOTINGS.get_open_voters_list(' + data_for_build.id + ');">' + LOCALE_ARRAY_ADDITIONAL.view_list_public_voters[CURRENT_LANG] + '</a>\
									</div>\
								</div>\
							</div>\
						</div>\
						<div class="right_col"></div>\
						</div>';

		//self.build_circle_chart();
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#vote-page').html('');					
		$( ui_string ).appendTo( '#vote-page' );

		document.title = data_for_build.id + " : " + data_for_build.name;


		$('#vote-page').enhanceWithin();
		//console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
				switch(data_for_build.user_vote){
					case '1':
						$('#vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
						$('#vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
						$('#vote-page .ui-btn.btn-yes').data('checked', 0);
						//console.log('yeeees');
						break;
					case '3':
						$('#vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
						$('#vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
						$('#vote-page .ui-btn.btn-abstain').data('checked', 0);
						//console.log('abstained');
						break;
					case '2':
						$('#vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
						$('#vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
						$('#vote-page .ui-btn.btn-no').data('checked', 0);
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
		
		self.build_circle_chart(data_array, type_trigger);



		if(data_for_build.user_vote_open == "1"){
			$('#vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').addClass("ui-checkbox-on");
		}

		$("#vote_buttons input[type='radio']").bind( "change", function() {
			VOTINGS.vote_for_voting($("#vote_buttons").attr("idv"));
		});


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
		if(!data_for_build){
			data_for_build = self.get_one_element(object_id, type_trigger);
			return false;
		}

			switch(data_for_build.status){
				case '0':
					self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
					break;
				case '1':
					self.current_vote_page_voting_period(data_for_build, 0, type_trigger)
					break;
				case '2':
					self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
					break;
				case '3':
					self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
					break;
			}


		document.title = data_for_build.id + " : " + data_for_build.name;

		$('#vote-page .btn-login-soc button').on('click', function(e){
			$(this).next().fadeToggle(300);
			if($('.overlay').length < 1) {
				$(this).closest('.ui-page').append('<span class="overlay"></span>');
			} else {
				$('.overlay').remove();
			}
		});
		$(document).on('click','.overlay', function() {
			$(this).closest('.ui-page').find('#vote-page .btn-login-soc button').trigger('click');
		});
	},
	get_one_element: function(vote_id, type_trigger){
		var self = this;
		var return_element;
		console.log('sw');
		$.ajax({
			url: mainURL + '/mc.php?id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				var return_element = $.parseJSON( response.responseText );
				data_for_build = return_element[0];
				if(data_for_build){
					//console.log(data_for_build);
					g_data_for_build = data_for_build;
					switch(data_for_build.status){
						case '0':
							self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_vote_page_voting_period(data_for_build, 0, type_trigger)
							break;
						case '2':
							self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
							break;
						case '3':
							self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
							break;
					}
				}else{
					alert(LOCALE_ARRAY_ADDITIONAL.no_such_vote[CURRENT_LANG]);
					$.mobile.navigate('#votings-page');
					return false;
				}

				$('#vote-page .btn-login-soc button').on('click', function(e){
					$(this).next().fadeToggle(300);
					if($('.overlay').length < 1) {
						$(this).closest('.ui-page').append('<span class="overlay"></span>');
					} else {
						$('.overlay').remove();
					}
				});
				$(document).on('click','.overlay', function() {
					$(this).closest('.ui-page').find('#vote-page .btn-login-soc button').trigger('click');
				});
			},
		});

		return return_element[0];
	},
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#vote-page?vote=') > -1){
			var match_array = location.href.match(/#vote-page\?vote=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
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
	f_array_for_chart: function(p_data){

		var l_data_array = [];

		for(var j = 0; j < 6; j++){
			if(p_data[j]['plus' + j] == 0 && p_data[j]['abstained' + j] == 0 && p_data[j]['minus' + j] == 0){
				l_data_array[j] = [{ value: (p_data[j]['plus' + j] + 1), color: "#399d3d" },{ value: (p_data[j]['abstained' + j] + 1), color: "#03a9f4" },{ value: (p_data[j]['minus' + j] + 1), color:"#f44336" } ];
			}else{
				l_data_array[j] = [{ value: p_data[j]['plus' + j], color: "#399d3d" },{ value: p_data[j]['abstained' + j], color: "#03a9f4" },{ value: p_data[j]['minus' + j], color:"#f44336" } ];
			}
		}

		return l_data_array;
	},
	f_add_vote:function(p_offer_id, p_vote){
		$.mobile.loading( "show", {theme: "z"});
		var self = this;
		var open_name = 0;
		var l_open = LOCALE_ARRAY_ADDITIONAL.is_anonymous[CURRENT_LANG];
		var l_vote = 0;
		var l_status = LOCALE_ARRAY_ADDITIONAL.you_did_not_vote[CURRENT_LANG];

		if($('#vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
			open_name = 1;
			l_open = LOCALE_ARRAY_ADDITIONAL.open_vote[CURRENT_LANG];
		}

		if(p_vote == 1 && $('#vote-page .ui-btn.btn-yes').hasClass('ui-radio-off') == 1){
			l_vote = 1;
		}else if(p_vote == 2 && $('#vote-page .ui-btn.btn-no').hasClass('ui-radio-off') == 1){
			l_vote = 2;
		}else if(p_vote == 3 && $('#vote-page .ui-btn.btn-abstain').hasClass('ui-radio-off') == 1){
			l_vote = 3;
		}

		//setTimeout(function(){
			var status_current_voting = '';
			$.ajax({
				url: mainURL + '/vote_add.php?id=' + p_offer_id + '&vote=' + l_vote + '&open=' + open_name,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					// self.switch_page_for_build(p_offer_id, 1);

					// if(response && response.responseText.indexOf('error') == -1){
					// 	self.init(cb(object_id));
					// 	console.log(response.responseText);
					// }else{
						if( response.responseText.indexOf('error') > -1 ){
							var error_arr = $.parseJSON(response.responseText);
							switch(CURRENT_LANG){
								case 'en':
									alert(error_arr[0].error);
									break;
								case 'ru':
									alert(error_arr[2].error_ru);
									break;
								case 'uk':
									alert(error_arr[1].error_uk);
									break;
							}
						}else{
							var l_data_for_build = $.parseJSON(response.responseText);

							var l_data_array = self.f_array_for_chart(l_data_for_build);

							self.build_circle_chart(l_data_array, 1);

							$('#vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
							$('#vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
							$('#vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
							$('#vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
							$('#vote-page .ui-btn.btn-no').addClass("ui-radio-off");
							$('#vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
							$('#vote-page .ui-btn.btn-yes').data('checked', 0);
							$('#vote-page .ui-btn.btn-no').data('checked', 0);
							$('#vote-page .ui-btn.btn-abstain').data('checked', 0);

							switch(l_vote){
								case 1:
									l_status = LOCALE_ARRAY_ADDITIONAL.you_vote_yes[CURRENT_LANG];
									$('#vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-no').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-yes').data('checked', 1);
									l_status += l_open;
									break;
								case 2:
									l_status = LOCALE_ARRAY_ADDITIONAL.you_vote_no[CURRENT_LANG];
									$('#vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-no').data('checked', 1);
									l_status += l_open;
									break;
								case 3:
									l_status = LOCALE_ARRAY_ADDITIONAL.you_vote_abstained[CURRENT_LANG];
									$('#vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
									$('#vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-no').addClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
									$('#vote-page .ui-btn.btn-abstain').data('checked', 1);
									l_status += l_open;
									break;
							}

							$('#vote-page .selected-text').html(l_status);

						}
					// }
				
					console.log('ok');
				},
			});
		//}, 100);
		$.mobile.loading( "hide" );
	},
	delete_voting: function(voting_id, return_page){
		$.ajax({
			url: mainURL + '/mc_rm.php?id=' + voting_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				if(response && response.responseText.indexOf('error') == -1){
					//console.log("Deleted id:" + voting_id);
			 		$.mobile.navigate(return_page);
				}else{
					if( response.responseText.indexOf('error') > -1 ){
						var error_arr = $.parseJSON(response.responseText);
						switch(CURRENT_LANG){
							case 'en':
								alert(error_arr[0].error);
								break;
							case 'ru':
								alert(error_arr[0].error_ru);
								break;
							case 'uk':
								alert(error_arr[0].error_uk);
								break;
						}
					}
				}	
			},
		});
	},
	build_one_chart: function(selector, id_chart, plus_vote, minus_vote, abstained_vote, name_chart ){
		var self = this; 
		var chart = '';
		if(plus_vote > 0 || minus_vote > 0 || abstained_vote > 0){
			chart = '<div class="' + selector + '">\
						<div class="chart">\
							<canvas id="chart-' + id_chart + '" width="80" height="80"></canvas>\
							<div class="info">\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + plus_vote + '\
								</div>\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + abstained_vote + '\
								</div>\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + minus_vote + '\
								</div>\
							</div>\
						</div>\
						<div class="title">\
							 ' + name_chart + '\
						</div>\
					</div>';
		}
		return chart;
	},
	build_circle_chart:function(data_values_array, type_trigger){
		//console.log('data_array123123123123123: ' );
				 			 //console.log(data_values_array[0] );
		if(location.href.indexOf("vote-page") > -1 && type_trigger == 1){
			if(document.getElementById("chart-1") || 
			 document.getElementById("chart-2") ||
			 document.getElementById("chart-3") ||
			 document.getElementById("chart-4") ||
			 document.getElementById("chart-5") ||
			 document.getElementById("chart-6") ){
			 	if(document.getElementById("chart-1")){
			 		var ctx1 = document.getElementById("chart-1").getContext("2d");
					var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
						showTooltips: false
					});
			 	}
				if(document.getElementById("chart-2")){
					var ctx2 = document.getElementById("chart-2").getContext("2d");
					var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-3")){
					var ctx3 = document.getElementById("chart-3").getContext("2d");
					var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-4")){
					var ctx4 = document.getElementById("chart-4").getContext("2d");
					var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-5")){
					var ctx5 = document.getElementById("chart-5").getContext("2d");
					var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-6")){
					var ctx6 = document.getElementById("chart-6").getContext("2d");
					var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
						showTooltips: false
					});
				}
			}
		}else{
			$('body').on('pagecontainershow', function(event, ui){
			if (ui.toPage.prop("id") === "vote-page") {
				if(document.getElementById("chart-1") || 
				 document.getElementById("chart-2") ||
				 document.getElementById("chart-3") ||
				 document.getElementById("chart-4") ||
				 document.getElementById("chart-5") ||
				 document.getElementById("chart-6") ){
				 	if(document.getElementById("chart-1")){
				 		var ctx1 = document.getElementById("chart-1").getContext("2d");
						var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
							showTooltips: false
						});
				 	}
					if(document.getElementById("chart-2")){
						var ctx2 = document.getElementById("chart-2").getContext("2d");
						var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-3")){
						var ctx3 = document.getElementById("chart-3").getContext("2d");
						var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-4")){
						var ctx4 = document.getElementById("chart-4").getContext("2d");
						var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-5")){
						var ctx5 = document.getElementById("chart-5").getContext("2d");
						var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-6")){
						var ctx6 = document.getElementById("chart-6").getContext("2d");		
						var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
							showTooltips: false
						});
					}
				}
			}
		});
		}
		$('.chart').on('click', function(){
			$(this).find('.info').toggleClass('animated');
		})
	},
	get_open_voters_list:function(vote_id){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/vote_open.php?id=' + vote_id,
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
							<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#vote-page?vote=' + vote_id + '\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
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
							<form action="" accept-charset="UTF-8" method="post">\
									<div class="ui-input-search ui-input-has-clear">\
										<input type="search" name="" placeholder="' + LOCALE_ARRAY_ADDITIONAL.search_voters[CURRENT_LANG] + '" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
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
					</div>';
		$('#voters-page').html('');
		$( ui_string ).appendTo( '#voters-page' );
		$('#voters-page').enhanceWithin();
	},
	create_project_request: function(vote_id, type){
		switch(type){
			case 'project':
				var url = mainURL + '/vote_add_project.php?id=' + vote_id;
				var answer = confirm(LOCALE_ARRAY_ADDITIONAL.do_you_want_to_create_project[CURRENT_LANG]);
				break;
			case 'request':
				var url = mainURL + '/vote_add_request.php?id=' + vote_id;
				var answer = confirm(LOCALE_ARRAY_ADDITIONAL.do_you_want_to_create_request[CURRENT_LANG]);
				break;
		}
		if(answer == 1){
			$.ajax({
				url: url,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					 //console.log("Okay");
					 $('#vote-page #create_project_button').attr('style', 'display: none');
					 $('#vote-page #create_request_button').attr('style', 'display: none');
				},
			});
		}
	}
};

var MY_VOTINGS = {
	votings_array: [],
	voters_list: [],
	voting_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.voting_last_item = 10;
		$('#my-votings-page #searched_string').val('');

		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/user_votes_list.php?sph=0',
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				self.votings_array = $.parseJSON( response.responseText );	
				//console.log( self.votings_array );
				$.mobile.loading( "hide" );
				$('#my-votings-page #activated_filter').css('display', 'none'); 
				$('#my-votings-page #solo_filter').css('display', 'block');	
				self.check_current_url( 1 );
				self.build_elements();	 
				if(call_back){
					call_back();
				} 	
			},
		});
	},
	reinit: function(){
		var self = this;
			$.mobile.loading( "show", {theme: "z"});
			$.ajax({
			url: mainURL + '/user_votes_list.php?sph=0&ls=' + self.voting_last_item,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				var query_array =$.parseJSON( response.responseText );	
				//console.log( query_array );					
				if(query_array.length > 0){
					self.votings_array = self.votings_array.concat(query_array);
					self.voting_last_item += query_array.length;
					//self.check_current_url( 1 );
					self.build_elements( 0, true,query_array);
				}
				$.mobile.loading( "hide" );	 
			},
		});
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

		var url = mainURL + '/user_votes_list.php?sph=0';

		if($('#my-votings-page #searched_string').val() != ""){
			url += '&filter=' + $('#my-votings-page #searched_string').val();
		}
		
		var l_sort = $('#votings-page [name=sort]').val();

		if(l_sort >= 0 && l_sort < 6){
			url += '&sort=' + l_sort;
		}

		var l_sort_dir = $('#votings-page [name=sort_direction]').val();

		if(l_sort_dir == 0 || l_sort_dir ==1){
			url += '&direct=' + l_sort_dir;
		}

		switch($('#my-votings-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#my-votings-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#my-votings-page [name=sort]').data('direct', 0);
				break;
		}

		if(self.activated_hard_filter){
			var start_date = $('#votings-page [name=start_year]').val() + "-" 
							+ $('#votings-page [name=start_month]').val() + "-" 
							+ $('#votings-page [name=start_date]').val();
			var end_date = $('#votings-page [name=end_year]').val() + "-" 
						+ $('#votings-page [name=end_month]').val() + "-" 
						+ $('#votings-page [name=end_date]').val();
			url += '&start=' + start_date + '&finish=' + end_date;
			
			if(self.sphere_filter >= 0){
				url += '&sph=' + self.sphere_filter;
			}
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
				//console.log(response);
				self.votings_array = $.parseJSON( response.responseText );	
				$.mobile.loading( "hide" );
				self.check_current_url( 1 );
				if(reinit){
					self.build_elements( "", true );	
				}else{
					self.build_elements();	
				}
				if(self.votings_array.length == 0 && reinit != 1 && self.activated_hard_filter == 1){
					alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
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
			var build_array = self.votings_array;
		}
		if(reinit_array){
			build_array = reinit_array;
		}
		jQuery.each(build_array, function(i, one_voting) {
			switch(one_voting.status){
				case '0':
					elements_string += self.collect_supports_build(one_voting);
					break;
				case '1':
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
			$('#my-votings-page #votings_list').append(elements_string);
		}else{
			$('#my-votings-page #votings_list').html(elements_string);
		}
	},
	support_voting: function(vote_id){
		$.ajax({
			url: mainURL + '/like_add.php?id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log("all ok!");	 
				switch($('#my_support').data('my_supported')){
					case 1:
						$('#my_support').html(LOCALE_ARRAY_ADDITIONAL.support[CURRENT_LANG]);
						$('#my_support').data('my_supported', 0);
						$('#my_supported').html(parseInt($('#my_supported').html())-1);
						break;
					case 0:
						$('#my_support').html(LOCALE_ARRAY_ADDITIONAL.not_support[CURRENT_LANG]);
						$('#my_support').data('my_supported', 1);
						$('#my_supported').html(parseInt($('#my_supported').html()) + 1);
						break;
				}
				if( parseInt( $('#my_all_supporters').html() ) == parseInt( $('#my_supported').html() )){
					MY_VOTINGS.get_one_element(vote_id);
				}
			},
		});
	},
	collect_supports_build:function(one_voting){
		var self = this;
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-supporters" style = "cursor: pointer" onclick = "MY_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
									<div class="count">\
										<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprtd + '/' + one_voting.sprt + '</strong>\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + '" style = "cursor: pointer" onclick = "MY_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
										<div class="count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprt + '</strong>\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-completed" style = "cursor: pointer" onclick = "MY_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
										<div class="count">\
											<span>' + LOCALE_ARRAY_ADDITIONAL.supporters[CURRENT_LANG] + '</span> <strong>' + one_voting.sprt + '</strong>\
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
	not_supported_build:function(one_voting){
		var self = this;
		var percents_object = self.get_percents_values(one_voting.vote_yes, one_voting.vote_nth, one_voting.vote_no);
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-voting-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-canceled" style = "cursor: pointer" onclick = "MY_VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
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
		var organization = '';
		if(data_for_build.org){
			var organization = data_for_build.org + " - ";
		}

		var l_city = '';
		switch(CURRENT_LANG){
			case "en":
				l_city = data_for_build.city_en;
			break;
			case "ru":
				l_city = data_for_build.city_ru;
			break;
			case "uk":
				l_city = data_for_build.city_uk;
			break;
		}

		organization += l_city + " - ";

		var support_button = '';
		var status_vote = '';

		if(data_for_build.sprtd == "0"){
			var delete_button = '<div class="delete_vote_button">\
									<a onclick = "VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#my-votings-page\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
		}else{
			var delete_button = '';
		}

		if(canceled == 0 && SUPER_PROFILE.auth == true){
			if(data_for_build.sprt_my == 1){
				support_button = '<strong data-my_supported = "1" style = "cursor: pointer" id = "my_support" onclick = "MY_VOTINGS.support_voting(' + data_for_build.id + ')">Not support</strong>';
			}else{
				support_button = '<strong data-my_supported = "0" style = "cursor: pointer" id = "my_support" onclick = "MY_VOTINGS.support_voting(' + data_for_build.id + ')">Support</strong>';
			}
			status_vote = '<div class="status yellow">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.sprtf +
						 '</span></div>\ ';
		}else{
			if(canceled != 0){
				status_vote = '<div class="status red" >\
								<span>' + LOCALE_ARRAY_ADDITIONAL.voting_canceled[CURRENT_LANG] + '</span>\
							</div>\ ';
			}else{
				status_vote = '<div class="status yellow">\
								<span>' + LOCALE_ARRAY_ADDITIONAL.collect_supporters[CURRENT_LANG] + data_for_build.start + ' - ' + data_for_build.sprtf +
						 '</span></div>\ ';
			}
		}

		switch(data_for_build.stars){
			case "0":
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
		}
		var create_project_button = '';
		if( data_for_build.cpb == "1" && SUPER_PROFILE.auth == true){
			create_project_button = '<div id = "create_project_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'project\')">' + LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG] + '</a>\
									</div>';
		}	
		var create_request_button = '';
		if( data_for_build.crb == "1" && SUPER_PROFILE.auth == true){
			create_request_button = '<div id = "create_request_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'request\')">' + LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG] + '</a>\
									</div>';
		}
		var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
									<h1>' + LOCALE_ARRAY_ADDITIONAL.my_vote[CURRENT_LANG] + '</h1>\
									<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#my-votings-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
												' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
												<div class="counter">\
													<span><test id = "my_supported">' + data_for_build.sprtd + '</test>/<test id = "my_all_supporters">' + data_for_build.sprt + '</test></span>' + support_button + '</div>\
											</div>' + status_vote +
											'<div class="desc">' + data_for_build.description + ' </div>\
											<div class="discuss-btn">\
												 <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
											</div>\
											<div class="btn-login-soc">\
												<button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
												<div class="social-wrap">\
													<div class="ui-grid-b">\
														<div class="ui-block-a">\
															<a target="_blank" class="vk" href="https://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href).replace('my-', '') + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + mainURL + data_for_build.img + '"></a>\
														</div>\
														<div class="ui-block-b">\
															<a target="_blank" class="fb" href="https://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href).replace('my-', '') + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
														<div class="ui-block-c">\
															<a target="_blank" class="tw" href="https://twitter.com/share?url=' + encodeURIComponent(location.href).replace('my-', '') + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
														<div class="ui-block-a">\
															<a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href).replace('my-', '') + '"></a>\
														</div>\
														<div class="ui-block-b">\
															<a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href).replace('my-', '') + '"></a>\
														</div>\
														<div class="ui-block-c">\
															<a target="_blank" class="ok" href="https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href).replace('my-', '') + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div class="sms-btn">\
												<a class="ui-btn ui-corner-all ui-shadow" href="#">SMS</a>\
											</div>' + delete_button + '\
											' + create_project_button + '\
											' + create_request_button + '\
										</div>\
									</div>\
								</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#my-vote-page?vote=" + data_for_build.id);
		$('#my-vote-page').html('');
		$( ui_string ).appendTo( '#my-vote-page' );
		$('#my-vote-page').enhanceWithin();
		$.mobile.loading( "hide" );
	},
	current_vote_page_voting_period: function(data_for_build, finished, type_trigger){
		var self = this;
		for (var k = 0; k < SPHERES.spheres.length; k++) {
			if(SPHERES.spheres[k].type == parseInt( data_for_build.type ) ){
				var type_sphere = SPHERES.spheres[k].name;
				break;
			}
		}
		var organization = '';
		if(data_for_build.org){
			var organization = data_for_build.org + " - ";
		}

		var l_city = '';
		switch(CURRENT_LANG){
			case "en":
				l_city = data_for_build.city_en;
			break;
			case "ru":
				l_city = data_for_build.city_ru;
			break;
			case "uk":
				l_city = data_for_build.city_uk;
			break;
		}

		organization += l_city + " - ";

		var selected_class_yes = '';
		var selected_class_abstain = '';
		var selected_class_no = '';
		var selected_class_checkbox = '';
		var checked_yes = 1;
		var checked_abstain = 1;
		var checked_no = 1;
		var status_current_voting = '';
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
		if(finished == 0){
			voting_buttons = '<form action="" accept-charset="UTF-8" method="post">\
														<fieldset class="vote-radio-group" data-role="controlgroup" data-type="horizontal">\
															<legend>' + LOCALE_ARRAY_ADDITIONAL.yes_no_i_do_not_know[CURRENT_LANG] + '</legend>\
															<div class="ui-radio ' + selected_class_yes + '">\
																<label data-checked = "' + checked_yes + '" onclick = "MY_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-yes">' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + '</label><input type="radio" name="vote" value="yes" data-enhanced="true">\
															</div>\
															<div class="ui-radio ' + selected_class_abstain + '">\
																<label data-checked = "' + checked_abstain + '" onclick = "MY_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-abstain">' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + '</label><input type="radio" name="vote" value="abstain" data-enhanced="true">\
															</div>\
															<div class="ui-radio ' + selected_class_no + '" >\
																<label data-checked = "' + checked_no + '" onclick = "MY_VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-no">' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + '</label><input type="radio" name="vote" value="no" data-enhanced="true">\
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
				var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "1":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "2":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "3":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
			case "4":
				var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
				break;
		}
		var create_project_button = '';
		if( data_for_build.cpb == "1" && SUPER_PROFILE.auth == true){
			create_project_button = '<div id = "create_project_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'project\')">' + LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG] + '</a>\
									</div>';
		}	
		var create_request_button = '';
		if( data_for_build.crb == "1" && SUPER_PROFILE.auth == true){
			create_request_button = '<div id = "create_request_button" class="btn-login-soc">\
										<a class="ui-btn ui-corner-all ui-shadow" onclick="VOTINGS.create_project_request(\'' + data_for_build.id + '\',\'request\')">' + LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG] + '</a>\
									</div>';
		}
		var charts = '';
		for (var i = 0; i < 6; i++) {
			if(i == 0 || i == 3){
				var selector_chart = "ui-block-a";
				if(i == 0){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.auth_by_email[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.by_passport[CURRENT_LANG];
				}
			}				
			if(i == 1 || i == 4){
				var selector_chart = "ui-block-b";
				if(i == 1){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.social_network[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.community[CURRENT_LANG];
				}
			}				
			if(i == 2 || i == 5){
				var selector_chart = "ui-block-c";
				if(i == 2){
					var name_chart = LOCALE_ARRAY_ADDITIONAL.by_payment[CURRENT_LANG];
				}else{
					var name_chart = LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG];
				}
			}				
			charts += self.build_one_chart( selector_chart, i+1, data_for_build['plus' + i], data_for_build['minus' + i], data_for_build['abstained' + i], name_chart);
		}
		var ui_string = '';
		ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
							<h1>' + LOCALE_ARRAY_ADDITIONAL.my_vote[CURRENT_LANG] + '</h1>\
								<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#my-votings-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
											' + LOCALE_ARRAY_ADDITIONAL.sphere[CURRENT_LANG] + ' - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
										</div>\
										<div class="num-votes-support">\
											' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
											<div class="counter">\
												<span>' + data_for_build.sprtd + '</span>\
											</div>\
										</div>' + status_vote + 
										'<div class="desc">' + data_for_build.description + ' </div>\
										<div class="discuss-btn">\
											<a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat + '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
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
									 	' + create_project_button + '\
										' + create_request_button + '\
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
											<div class="ui-grid-b charts-wrap">\
												' + charts + '\
											</div>\
										</div>\ ' + voting_buttons + ' <div class="btn-next-page">\
											<a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#voters-page?voting=' + data_for_build.id + '\'); MY_VOTINGS.get_open_voters_list(' + data_for_build.id + ');">' + LOCALE_ARRAY_ADDITIONAL.view_list_public_voters[CURRENT_LANG] + '</a>\
										</div>\
									</div>\
								</div>\
							</deactivate></div>';

		//self.build_circle_chart();
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#my-vote-page?vote=" + data_for_build.id);
		$('#my-vote-page').html('');					
		$( ui_string ).appendTo( '#my-vote-page' );

		$('#my-vote-page').enhanceWithin();
		//console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
				switch(data_for_build.user_vote){
					case '1':
						$('#my-vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
						$('#my-vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
						$('#my-vote-page .ui-btn.btn-yes').data('checked', 0);
						//console.log('yeeees');
						break;
					case '3':
						$('#my-vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
						$('#my-vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
						$('#my-vote-page .ui-btn.btn-abstain').data('checked', 0);
						//console.log('abstained');
						break;
					case '2':
						$('#my-vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
						$('#my-vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
						$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
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
		
		self.build_circle_chart(data_array, type_trigger);



		if(data_for_build.user_vote_open == "1"){
			$('#my-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').addClass("ui-checkbox-on");
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
		if(!data_for_build){
			data_for_build = self.get_one_element(object_id, type_trigger);
			return false;
		}
		switch(data_for_build.status){
			case '0':
				self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
				break;
			case '1':
				self.current_vote_page_voting_period(data_for_build, 0, type_trigger)
				break;
			case '2':
				self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
				break;
			case '3':
				self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
				break;
		}

		$('#my-vote-page .btn-login-soc button').on('click', function(e){
			$(this).next().fadeToggle(300);
			if($('.overlay').length < 1) {
				$(this).closest('.ui-page').append('<span class="overlay"></span>');
			} else {
				$('.overlay').remove();
			}
		});
		$(document).on('click','.overlay', function() {
			$(this).closest('.ui-page').find('#my-vote-page .btn-login-soc button').trigger('click');
		});
	},
	get_one_element: function(vote_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			url: mainURL + '/mc.php?sph=0&id=' + vote_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				return_element = $.parseJSON( response.responseText );
				data_for_build = return_element[0];
				switch(data_for_build.status){
					case '0':
						self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
						break;
					case '1':
						self.current_vote_page_voting_period(data_for_build, 0, type_trigger)
						break;
					case '2':
						self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
						break;
					case '3':
						self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
						break;
				}

				$('#my-vote-page .btn-login-soc button').on('click', function(e){
					$(this).next().fadeToggle(300);
					if($('.overlay').length < 1) {
						$(this).closest('.ui-page').append('<span class="overlay"></span>');
					} else {
						$('.overlay').remove();
					}
				});
				$(document).on('click','.overlay', function() {
					$(this).closest('.ui-page').find('#my-vote-page .btn-login-soc button').trigger('click');
				});
			},
		});
		return return_element[0];
	},
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#my-vote-page?vote=') > -1){
			var match_array = location.href.match(/#my-vote-page\?vote=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			self.switch_page_for_build(object_id, type_trigger);
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
			if($('#my-vote-page .ui-btn.btn-yes').hasClass('ui-radio-on') == 1 && $('#my-vote-page .ui-btn.btn-yes').data('checked') == '1'){
				var vote = 1;
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_yes[CURRENT_LANG];
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#my-vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#my-vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_abstained[CURRENT_LANG];
			}else if($('#my-vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#my-vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_vote_no[CURRENT_LANG];
			}else{
				$('#my-vote-page .ui-btn.btn-yes').removeClass("ui-btn-active ui-radio-on");
				$('#my-vote-page .ui-btn.btn-yes').addClass("ui-radio-off");
				$('#my-vote-page .ui-btn.btn-yes').data('checked', 1);
				$('#my-vote-page .ui-btn.btn-abstain').removeClass("ui-btn-active ui-radio-on");
				$('#my-vote-page .ui-btn.btn-abstain').addClass("ui-radio-off");
				$('#my-vote-page .ui-btn.btn-abstain').data('checked', 1);
				$('#my-vote-page .ui-btn.btn-no').removeClass("ui-btn-active ui-radio-on");
				$('#my-vote-page .ui-btn.btn-no').addClass("ui-radio-off");
				$('#my-vote-page .ui-btn.btn-no').data('checked', 1);
				status_current_voting = LOCALE_ARRAY_ADDITIONAL.you_did_not_vote[CURRENT_LANG];
				var vote = 0;
			}
			if($('#my-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
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
			$('#my-vote-page .selected-text').html( status_current_voting );
			$.ajax({
				url: mainURL + '/vote_add.php?id=' + object_id + '&vote=' + vote + '&open=' + open_name,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					function cb(){
						return function(){
							self.switch_page_for_build(object_id, 1);
						}
					}
					if(response && response.responseText.indexOf('error') == -1){
						self.init(cb(object_id));
						//console.log('ok');
					}else{
						if( response.responseText.indexOf('error') > -1 ){
							var error_arr = $.parseJSON(response.responseText);
							switch(CURRENT_LANG){
								case 'en':
									alert(error_arr[0].error);
									break;
								case 'ru':
									alert(error_arr[0].error_ru);
									break;
								case 'uk':
									alert(error_arr[0].error_uk);
									break;
							}
						}
					}					
				},
			});
		}, 100);
	},
	build_one_chart: function(selector, id_chart, plus_vote, minus_vote, abstained_vote, name_chart ){
		var self = this; 
		var chart = '';
		if(plus_vote > 0 || minus_vote > 0 || abstained_vote > 0){
			chart = '<div class="' + selector + '">\
						<div class="chart">\
							<canvas id="chart-' + id_chart + '" width="80" height="80"></canvas>\
							<div class="info">\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + plus_vote + '\
								</div>\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + abstained_vote + '\
								</div>\
								<div>\
									' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + minus_vote + '\
								</div>\
							</div>\
						</div>\
						<div class="title">\
							 ' + name_chart + '\
						</div>\
					</div>';
		}
		return chart;
	},
	build_circle_chart:function(data_values_array, type_trigger){
		//console.log('data_array0: ' );
				 			 //console.log(data_values_array[0] );
		if(location.href.indexOf("my-vote-page") > -1 && type_trigger == 1){
			if(document.getElementById("chart-1") || 
					document.getElementById("chart-2") ||
					document.getElementById("chart-3") ||
					document.getElementById("chart-4") ||
					document.getElementById("chart-5") ||
					document.getElementById("chart-6") ){
			 	if(document.getElementById("chart-1")){
			 		var ctx1 = document.getElementById("chart-1").getContext("2d");
					var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
						showTooltips: false
					});
			 	}
				if(document.getElementById("chart-2")){
					var ctx2 = document.getElementById("chart-2").getContext("2d");
					var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-3")){
					var ctx3 = document.getElementById("chart-3").getContext("2d");
					var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-4")){
					var ctx4 = document.getElementById("chart-4").getContext("2d");
					var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-5")){
					var ctx5 = document.getElementById("chart-5").getContext("2d");
					var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
						showTooltips: false
					});
				}

				if(document.getElementById("chart-6")){
					var ctx6 = document.getElementById("chart-6").getContext("2d");		
					var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
						showTooltips: false
					});
				}
			}
		}else{
			$('body').on('pagecontainershow', function(event, ui){
			if (ui.toPage.prop("id") === "my-vote-page") {
				if(document.getElementById("chart-1") || 
						document.getElementById("chart-2") ||
						document.getElementById("chart-3") ||
						document.getElementById("chart-4") ||
						document.getElementById("chart-5") ||
						document.getElementById("chart-6") ){
				 	if(document.getElementById("chart-1")){
				 		var ctx1 = document.getElementById("chart-1").getContext("2d");
						var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
							showTooltips: false
						});
				 	}
					if(document.getElementById("chart-2")){
						var ctx2 = document.getElementById("chart-2").getContext("2d");
						var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-3")){
						var ctx3 = document.getElementById("chart-3").getContext("2d");
						var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-4")){
						var ctx4 = document.getElementById("chart-4").getContext("2d");
						var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-5")){
						var ctx5 = document.getElementById("chart-5").getContext("2d");
						var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
							showTooltips: false
						});
					}

					if(document.getElementById("chart-6")){
						var ctx6 = document.getElementById("chart-6").getContext("2d");		
						var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
							showTooltips: false
						});
					}
				}
			}
		});
		}
		$('.chart').on('click', function(){
			$(this).find('.info').toggleClass('animated');
		})
	},
	get_open_voters_list:function(vote_id){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/vote_open.php?id=' + vote_id,
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
							<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back(\'#my-vote-page?vote=' + vote_id + '\')" href="#">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
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
							<form action="" accept-charset="UTF-8" method="post">\
									<div class="ui-input-search ui-input-has-clear">\
										<input type="search" name="" placeholder="' + LOCALE_ARRAY_ADDITIONAL.search_voters[CURRENT_LANG] + '" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
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
								ID:' + one_voter.id + '\
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
					</div>';
		$('#voters-page').html('');
		$( ui_string ).appendTo( '#voters-page' );
		$('#voters-page').enhanceWithin();
	}
};