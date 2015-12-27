var TRUST_LIST = {
	trust_array: [],
	trust_last_item: 10,
	init: function(next_used, parameter){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		if(parameter == 's'){
				var url = mainURL + '/trust.php';					
		}else if(parameter == 'p_s'){
				var url = mainURL + '/trust.php?p_s=1';
		}

		if(parameter){
			if(parameter == 's'){
				var url = mainURL + '/trust.php';					
			}else if(parameter == 'p_s'){
				var url = mainURL + '/trust.php?p_s=1';
			}
		}else{
			if(next_used){
				if($('#trusted_checkbox').hasClass('ui-checkbox-off')){
					var url = mainURL + '/trust.php';					
				}else{
					var url = mainURL + '/trust.php?p_s=1';
				}
			}else{
				if($('#trusted_checkbox').hasClass('ui-checkbox-on')){
					var url = mainURL + '/trust.php';					
				}else{
					var url = mainURL + '/trust.php?p_s=1';
				}
			}
		}

		if($('#trust-list #searched_string').val() != ''){
			if(url.indexOf('?') > -1){
				url += "&s=" + $('#trust-list #searched_string').val();
			}else{
				url += "?s=" + $('#trust-list #searched_string').val();
			}
		}

		if(location.href.indexOf('sphere=') > -1){
			var match_array = location.href.match(/sphere=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			if(url.indexOf('?') > -1){
				url += "&sph=" + object_id;
			}else{
				url += "?sph=" + object_id;
			}
		}

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				$.mobile.loading( "hide" );
				//console.log(response);
				if(response && response.responseText.indexOf('error') == -1){
					self.trust_array = $.parseJSON( response.responseText );
					//console.log('trust');	
					//console.log(self.trust_array);
					self.build_elements();
					self.set_spheres_and_listeners();
					SPHERES.initial();
				}else{
					if( response.responseText.indexOf('error') > -1 ){
						message_result(response.responseText);
					}
				}	
			},
		});
	},
	reinit: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		if($('#trusted_checkbox').hasClass('ui-checkbox-on')){
			var url = mainURL + '/trust.php?p_s=1&ls=' + self.trust_last_item;			
		}else{
			var url = mainURL + '/trust.php?ls=' + self.trust_last_item;
		}
		if($('#trust-list #searched_string').val() != ''){
				url += "&s=" + $('#trust-list #searched_string').val();
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
				var query_array = $.parseJSON( response.responseText );
				if(query_array.length > 0){
					self.trust_array = self.trust_array.concat(query_array);
					self.build_elements(true, query_array);
					self.trust_last_item += query_array.length;
				}
				$.mobile.loading( "hide" );	
			},
		});
	},
	filter_by_id:function(click){
		var self = this;
		if(click)
			$('#trust-list #searched_string').val('');

			self.init();
	},
	build_elements: function(reinit, reinit_array){
		var self = this;
		var elements_string = '';
		if(reinit){
			var build_array = reinit_array;
		}else{
			var build_array = self.trust_array;
		}
		jQuery.each(build_array, function(i, one_trust) {
			elements_string += '<div class="item ui-corner-all">\
									<div class="ui-block-a">\
										<div class="avatar">\
											<img src="' + mainURL + one_trust.img + '" />\
										</div>\
									</div>\
									<div class="ui-block-b">\
										<div class="id">\
											ID: ' + one_trust.id + ' ' + one_trust.name +'\
										</div>\
										<div class="name">\
											' + one_trust.fname + ' ' + one_trust.lname + '\
										</div>\
										<a class="ui-btn ui-corner-all" href="#" onclick = "$.mobile.navigate(\'#spheres-trust-vote\'); TRUST_LIST.set_spheres_for_trust(\'' + one_trust.id + '\');">' + LOCALE_ARRAY_ADDITIONAL.trust_vote[CURRENT_LANG] + '</a>\
									</div>';

			elements_string += '<div class="ui-grid-a">\
										<div class="ui-block-b">\
									<div>';
			for (var i = 0; i < one_trust.t_s.length; i++) {
				switch(one_trust.t_s[i].s){
					case "1":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-fb.png" />';
						break;
					case "2":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-gp.png" />';
						break;
					case "3":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-tw.png" />';
						break;
					case "4":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-in.png" />';
						break;
					case "5":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-vk.png" />';
						break;
					case "6":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-ok.png" />';
						break;
				}				
			}												
			elements_string +=			 '</div>\
											<div>\
												<img class="ui-corner-all" src="images/trust-icon-email.png" />';
			for (var i = 0; i < one_trust.t_s.length; i++) {
				switch(one_trust.t_s[i].s){
					case "7":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-wallet.png" />';
						break;
					case "8":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-house.png" />';
						break;
					case "9":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-community.png" />';
						break;
					case "10":
						elements_string += '<img class="ui-corner-all" src="images/trust-icon-password.png" />';
						break;
				}				
			}												
			elements_string +=		 '	</div>\
										</div>';

			elements_string += '<div class="osmd-list">';
			var type_sphere = '';
			SPHERES.set_locale_names();
			for (var i = 0; i < one_trust.t_l.length; i++) {
				for (var k = 0; k < SPHERES.spheres.length; k++) {
					if(SPHERES.spheres[k].type == parseInt( one_trust.t_l[i].type ) ){
						type_sphere = SPHERES.spheres[k].name;
						break;
					}
				}
				var sphere = '';
				if(one_trust.t_l[i].sphere){
					sphere = ': ' + one_trust.t_l[i].sphere;
				}
				var subtype = '';
				if(one_trust.t_l[i].subtype){
					subtype = ': ' + one_trust.t_l[i].subtype;
				}
				elements_string += '<div>' + type_sphere + subtype +sphere +  '</div>';
				
			}
			elements_string += '</div>';

			elements_string += '</div>\
								</div>\
							</div>';
		});
		if(reinit){
			$('#trust-list #trust_list_all').append(elements_string);
		}else{
			$('#trust-list #trust_list_all').html(elements_string);
		}
	},
	set_spheres_for_trust: function(trust_id){
		var self = this;
		var ui_string = '<form action="" accept-charset="UTF-8" method="post" onsubmit = "TRUST_LIST.save_and_delete_spheres(\'' + trust_id + '\'); return false;">\
							<fieldset id = "sphere_form">\
								<legend>' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + '</legend>';
		var stop_flag = 0;
		//var founded_matches;
		//console.log( self.spheres_array );
		for (var i = 0; i < self.trust_array.length; i++) {
			if(self.trust_array[i].id == trust_id){
				var current_trust = self.trust_array[i];
				break;
			}
		};

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
									<select name = "' + SPHERES.spheres[i].selector_name + '" multiple="multiple" data-native-menu="false">\
										<option>' + SPHERES.spheres[i].name + '</option>';
					
					for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
						stop_flag = 0;
						for (var current_index = 0; current_index < current_trust.t_l.length; current_index++) {
							if(current_trust.t_l[current_index].sphere_id == SPHERES.spheres[i].objects[0].sph[j].idc){
								ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc + '" selected>' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';
								stop_flag = 1;
								break;
							}
						} 
						if(stop_flag != 1){
							ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc + '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';
						}
					}

					ui_string += '</select>\
								</div>';
				}else{
					//console.log('equal more than one');
					var varable = '#spheres-trust-vote #' + SPHERES.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "TRUST_LIST.show_mini_spheres(\'' + varable + '\');">\
									<select disabled class = "container" name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
								</div>';
					ui_string += '<div id = "' + SPHERES.spheres[i].selector_name + '_content" style = "display:none;">';
					for (var k = 0; k < SPHERES.spheres[i].objects.length; k++) {
						ui_string += '<div>\
									<select class = "content_value" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" multiple="multiple" data-native-menu="false">\
										<option>' + SPHERES.spheres[i].objects[k].org + '</option>';
						
						for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
							stop_flag = 0;
							for (var current_index = 0; current_index < current_trust.t_l.length; current_index++) {
								if(current_trust.t_l[current_index].sphere_id == SPHERES.spheres[i].objects[k].sph[j].idc){
									ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc + '" selected>' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';
									stop_flag = 1;
									break;
								}
							}
							if(stop_flag != 1){
								ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc + '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';
							}						
							
						}
						ui_string += '</select>\
								</div>'; 
					}
					ui_string += '</div>';	
				}
			}
		}
		ui_string += '</fieldset>\
						<div class="btn-save">\
								<input type="submit" value="' + LOCALE_ARRAY_ADDITIONAL.save_trust_sphere[CURRENT_LANG] + '" class="ui-btn ui-btn-corner-all ui-shadow" />\
							</div>\
							</form>';
		$('#spheres-trust-vote #sphere_main').html(ui_string);
		var arr = $('#spheres-trust-vote #sphere_form .container option');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		var arr = $('#spheres-trust-vote #sphere_form .non_container');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		if(location.href.indexOf('#spheres-trust-vote') > -1){
			$('#spheres-trust-vote #sphere_form select').selectmenu().selectmenu("refresh", true);	
		}
		/*$('#spheres-address .ui-content input[type=submit]').on('click', function(){
			
		});*/
	},
	set_spheres_and_listeners: function(){
		var self = this;
		var ui_string = '<legend>' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + '</legend>';
		//var founded_matches;
		//console.log( 'spheres trust' );
		//console.log( SPHERES.spheres_array );
		for ( var i = 0; i < SPHERES.spheres.length; i++ ) {
			if(SPHERES.spheres[i].objects.length > 0){
				if(SPHERES.spheres[i].objects[0].org == ''){
					//console.log('equal one');
					ui_string += '<div class = "content_value">\
									<select id = "select_' + i + '" onchange = "$.mobile.navigate(\'#trust-list?sphere=\'+$(this).val())" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
										<option>' + SPHERES.spheres[i].name + '</option>';
					
					for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
						ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc + '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';					
					}

					ui_string += '</select>\
								</div>';
				}else{
					//console.log('equal more than one');
					var varable = '#spheres-trust #' + SPHERES.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "SPHERES.show_mini_spheres(\'' + varable + '\');">\
									<select disabled class = "container" name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
								</div>';
					ui_string += '<div id = "' + SPHERES.spheres[i].selector_name + '_content" style = "display:none;">';
					for (var k = 0; k < SPHERES.spheres[i].objects.length; k++) {
						ui_string += '<div class = "content_value">\
									<select id = "select_' + i + '" onchange = "$.mobile.navigate(\'#trust-list?sphere=\'+$(this).val())" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
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
		ui_string += '<button onclick = "$.mobile.navigate(\'#trust-list\')" class="btn-delete ui-btn ui-shadow ui-corner-all">' + LOCALE_ARRAY_ADDITIONAL.delete_button_trust_spheres_filter[CURRENT_LANG] + '</button>';
		$('#spheres-trust #sphere_form').html(ui_string);
		var arr = $('#spheres-trust #sphere_form .container option');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		var arr = $('#spheres-trust #sphere_form .non_container');
		for (var i = 0; i < arr.length; i++) {
			$(arr[i]).hide();
		}
		if(location.href.indexOf('#spheres-trust') > -1){
			$('#spheres-trust #sphere_form select').selectmenu().selectmenu("refresh", true);	
		}
		/*$('#spheres-address .ui-content input[type=submit]').on('click', function(){
			
		});*/
	},
	show_mini_spheres: function (selector_content){
		if($(selector_content).attr('style') == 'display:none;'){
			$(selector_content).attr('style', '');
		}else{
			$(selector_content).attr('style', 'display:none;');
		}
	},
	save_and_delete_spheres: function(id_user){
		var self = this;
		for (var i = 0; i < self.trust_array.length; i++) {
			if(self.trust_array[i].id == id_user){
				var current_trust = self.trust_array[i];
				break;
			}
		}

		for (var j = 0; j < current_trust.t_l.length; j++) {
			self.delete_sphere(current_trust.t_l[j].idt);
		}

		var spheres_option_selected = $('#spheres-trust-vote #sphere_form .content_value option:selected');
		for (var i = 0; i < spheres_option_selected.length; i++) {
			self.save_sphere(id_user, $(spheres_option_selected[i]).val());
		}
		//console.log('was saved');
		//alert('сохранено!');
		//$.mobile.navigate("#edit-address");
	},
	delete_sphere: function(id_sphere_trust){
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/trust_rm.php?tid=' + id_sphere_trust,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				$.mobile.loading( "hide" );
				if( response.responseText.indexOf('error') > -1 ){
					message_result(response.responseText);
				}
			},
		});
	},
	save_sphere: function(id_user, id_sphere){
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/trust_add.php?t=' + id_user + '&s=' + id_sphere,
			type: "GET",
			xhrFields: {
			 withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				$.mobile.loading( "hide" );
				if( response.responseText.indexOf('error') > -1 ){
					message_result(response.responseText);
				}
			},
		});
	},
};
