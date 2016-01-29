
//phonegap special cross-domain configuration
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	$.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
});

function f_escape_quotes(p_string){
    return p_string.replace(/[\"]/g, "\\\"");
}

function message_result(p_result){
	//Multilingual alert. TODO: change 'error' on 'msg' in all outputs then delete 'error' from here 
	if(p_result.indexOf('error') > -1){
		var l_error_arr = $.parseJSON(p_result);
		switch(CURRENT_LANG){
			case 'en':
				alert(l_error_arr[0].error);
			break;
			case 'uk':
				alert(l_error_arr[0].error_uk);
			break;
			case 'ru':
				alert(l_error_arr[0].error_ru);
			break;
		}
		var l_r = l_error_arr;
		if(l_r[0].msg==1){
			switch(CURRENT_LANG){
				case 'en':
					alert(l_r[0].msg_en);
				break;
				case 'uk':
					alert(l_r[0].msg_uk);
				break;
				case 'ru':
					alert(l_r[0].msg_ru);
				break;
			}
		}
	}else if(p_result.indexOf('msg_en') > -1){
		var l_msg = $.parseJSON(p_result);
		switch(CURRENT_LANG){
			case 'en':
				alert(l_msg[0].msg_en);
			break;
			case 'uk':
				alert(l_msg[0].msg_uk);
			break;
			case 'ru':
				alert(l_msg[0].msg_ru);
			break;
		}
	}
}

function checkUpdateByID(p_json_list, p_id) {
  return p_json_list.filter(function(p_json_list) {
      return p_json_list.id == p_id;
    }
  );
}

//////////////////////////////////////////////////////////////////
var GoogleMapsAdress = {
	geocoder: new google.maps.Geocoder(),
	marker: false,
	map: false,
	lt_value: false,
	ln_value: false,
	geocodePosition: function(pos) {
		var self = this;
	  self.geocoder.geocode({
		latLng: pos
	  }, function(responses) {
		if (responses && responses.length > 0) {
		    self.updateMarkerAddress(responses[0].formatted_address);
		    jQuery.each(LOCALE_ARRAY, function(i, one_element) {
				if($(one_element['selector'])){
					if(one_element['value']){
						$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
					}else{
						$(one_element['selector']).html(one_element[CURRENT_LANG]);
					}
						
				}
			});
		    //console.log(responses);
		} else {
		  self.updateMarkerAddress('Cannot determine address at this location.');
		}
	  });
	},
	updateMarkerStatus: function(str) {
		var self = this;
	},
	updateMarkerPosition: function(latLng) {
		var self = this;
	},
	setCheckBoxes: function(latLng){
		var self = this;
		self.lt_value = latLng.lat();
	    self.ln_value = latLng.lng();
		var geocoder = new google.maps.Geocoder();
		var latLng = new google.maps.LatLng(latLng.lat(), latLng.lng());
		if(location.href.indexOf('#address-item-') > -1){
			var match_array = location.href.match(/item-[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);

			if(geocoder){
				geocoder.geocode({'latLng': latLng,'language': 'en'},function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					 var address = results[0].address_components;
					 var country = ADRESS.getGPSByType(address,"country");
					 var state = ADRESS.getGPSByType(address,"administrative_area_level_1");
					 var county = ADRESS.getGPSByType(address,"administrative_area_level_3");
					 var city = ADRESS.getGPSByType(address,"locality");
					 //console.log('build: ' + results[0].address_components[0].long_name);
					 var street = ADRESS.getGPSByType(address,"route");
					 var build = ADRESS.getGPSByType(address,"street_number");
					 ADRESS.gpsSet(object_id, country,state,county,city,street,build, latLng.lat(), latLng.lng());
				} else {
					console.log(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
				}
				});
			}
		}
	},
	moveMarker: function(height, length){
		var self = this;
		self.lt_value = height;
	    self.ln_value = length;
		self.marker.setPosition( new google.maps.LatLng( height, length ) );
		self.map.panTo( new google.maps.LatLng( height, length ) );
	},
	updateMarkerAddress: function(str) {
		var self = this;
	},
	initialize: function() {
		var self = this;
		if(location.href.indexOf('#address-item-') > -1){
			var match_array = location.href.match(/item-[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
		}
		if(ADRESS.address_arr[object_id-1] && ADRESS.address_arr[object_id-1].lat != 0.00000000){
			var lt = ADRESS.address_arr[object_id-1].lat;
			var ln = ADRESS.address_arr[object_id-1].lng;
		}else{
			var lt = 50.447753;
			var ln = 30.5229279;
		}
	  var latLng = new google.maps.LatLng(lt, ln);
	  self.lt_value = lt;
	  self.ln_value = ln;
	  self.map = new google.maps.Map(document.getElementById('mapCanvas_' + object_id), {
		zoom: 8,
		center: latLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  });
	  self.marker = new google.maps.Marker({
		position: latLng,
		title: 'Point A',
		map: self.map,
		draggable: true
	  });
	  
	  // Update current position info.
	  self.updateMarkerPosition(latLng);
	  self.geocodePosition(latLng);
	  
	  // Add dragging event listeners.
	  google.maps.event.addListener(self.marker, 'dragstart', function() {
		self.updateMarkerAddress('Dragging...');
	  });
	  
	  google.maps.event.addListener(self.marker, 'drag', function() {
		self.updateMarkerStatus('Dragging...');
		self.updateMarkerPosition(self.marker.getPosition());
	  });
	  
	  google.maps.event.addListener(self.marker, 'dragend', function() {
		self.updateMarkerStatus('Drag ended');
		self.geocodePosition(self.marker.getPosition());
		self.setCheckBoxes(self.marker.getPosition());
	  });
	}
}
//////////////////////////////////////////////////////////////////

$.mobile.defaultPageTransition = 'none';

function inner_back(link){
	if(link){
		$.mobile.navigate(link);
	}else{
		HISTORY_INNER.pop();
		var back_href = HISTORY_INNER.pop();
		if(back_href){
			location.href = back_href;
		}
	}
}

function lang_activate_el(element){
	//add check is current language already set or need to be set
	var lang = false;
	if(!CURRENT_LANG){
		if(readCookie("lang")){
			CURRENT_LANG = readCookie("lang");
		}else{
			CURRENT_LANG = DEFAULT_LANG;
		}
	}
	if(element == "uk" || element == "ru" || element == "en"){
		CURRENT_LANG = element;
	}

	jQuery.each(LOCALE_ARRAY, function(i, one_element) {
		if($(one_element['selector'])){
			if(one_element['value']){
				$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
			}else{
				$(one_element['selector']).html(one_element[CURRENT_LANG]);
			}
				
		}
	});
}

window.onload = function(){

	$("#left-panel").on("panelbeforeopen",function(){
		if(SUPER_PROFILE.auth == true){
			console.log('LEFT PANEL: user authorised');
		}else{
			//TODO: rebuild left panel for not authorised view
			console.log('LEFT PANEL: user NOT authorised');
		}
	});

	if(g_phonegap){
		//if first load from external URL and not PhoneGap
		if(location.href.indexOf('&lang=') > -1){
			var lang_array = location.href.match(/&lang=[0-9]/i);
			var lang_id = lang_array[0].match(/[0-9]+/i);
			if(lang_id == 1) {
				lang_activate_el('en');
			} else if(lang_id == 2) {
				lang_activate_el('uk');
			} else if(lang_id == 3) {
				lang_activate_el('ru');
			}
		}
	}

	lang_activate_el();
	/*if(readCookie('id_cookie') == null){
		createCookie('id_cookie', -1);
	}
	setInterval(function(){
		//console.log('interval');
		SUPER_PROFILE.checkUser();
	}, 5000);*/

	NCO.init();

	NEWS.events();

	COMMON_OBJECT.init_common_listeners();
		
	MAP.init();

	jQuery.each(LOCALE_ARRAY, function(i, one_element) {
		if($(one_element['selector'])){
			if(one_element['value']){
				$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
			}else{
				$(one_element['selector']).html(one_element[CURRENT_LANG]);
			}
				
		}
	});

	setTimeout(function(){

		if( (location.href.indexOf('#spheres-address') > -1 ||
			 location.href.indexOf('#spheres-trust') > -1 ||
			 location.href.indexOf('#spheres-create-vote') > -1 ||
			 location.href.indexOf('#spheres-trust-vote') > -1 ||
			 location.href.indexOf('#spheres-filters') > -1)){
				SPHERES.initial();
		}

		if(location.href.indexOf('#balances-pif-page') > -1){
			//console.log('#balances-pif-page');
			funds.current_fund_history();
		}

		$('#profile-page .avatar').click(function(){
			$('#profile-page [name=picture]').click();
		});

		set_dates_range('.options_date', '.options_month', '.options_year', new Date().getFullYear(), 2, 'current', 'current');

		//TODO: make clases for dates_ranges

		set_dates_range('#filter-page [name=start_date]', '#filter-page [name=start_month]', '#filter-page [name=start_year]', new Date().getFullYear(), 2, 'current', 'current');
		set_dates_range('#filter-page [name=end_date]', '#filter-page [name=end_month]', '#filter-page [name=end_year]', new Date().getFullYear(), 2, 'current');

		set_dates_range('#filter-page-programs [name=start_date]', '#filter-page-programs [name=start_month]', '#filter-page-programs [name=start_year]', new Date().getFullYear(), 2, 'current', 'current');
		set_dates_range('#filter-page-programs [name=end_date]', '#filter-page-programs [name=end_month]', '#filter-page-programs [name=end_year]', new Date().getFullYear(), 2, 'current');

		set_dates_range('#filter-page-projects [name=start_date]', '#filter-page-projects [name=start_month]', '#filter-page-projects [name=start_year]', new Date().getFullYear(), 2, 'current', 'current');
		set_dates_range('#filter-page-projects [name=end_date]', '#filter-page-projects [name=end_month]', '#filter-page-projects [name=end_year]', new Date().getFullYear(), 2, 'current');

		set_dates_range('#filter-page-requests [name=start_date]', '#filter-page-requests [name=start_month]', '#filter-page-requests [name=start_year]', new Date().getFullYear(), 2, 'current', 'current');
		set_dates_range('#filter-page-requests [name=end_date]', '#filter-page-requests [name=end_month]', '#filter-page-requests [name=end_year]', new Date().getFullYear(), 2, 'current');

		set_dates_range('#create-item [name=start_date]', '#create-item [name=start_month]', '#create-item [name=start_year]', new Date().getFullYear(), 2, "current");
		set_dates_range('#create-item [name=dtex_date]', '#create-item [name=dtex_month]', '#create-item [name=dtex_year]', new Date().getFullYear(), 2, "current");
		//SPHERES.set_spheres_filters();

		if(location.href.indexOf('#votings-page') > -1 || location.href.indexOf('#vote-page?vote=') > -1){
			// VOTINGS.init();
			$('#votings-page select').selectmenu().selectmenu("refresh", true);
		}

		if((location.href.indexOf('#my-votings-page') > -1 || location.href.indexOf('#my-vote-page?vote=') > -1) && SUPER_PROFILE.auth == true){
			// MY_VOTINGS.init();
			$('#my-votings-page select').selectmenu().selectmenu("refresh", true);
		}

		if(location.href.indexOf('#weighted-votings-page') > -1 || location.href.indexOf('#weighted-vote-page?vote=') > -1){
			WEIGHTED_VOTINGS.init();
			$('#weighted-votings-page select').selectmenu().selectmenu("refresh", true);
		}

		if(location.href.indexOf('#wallet') > -1){
			WALLET.init();
		}

		if(location.href.indexOf('#programs-page') > -1){
			//console.log('load programs');
			PROGRAMS.init();
			$('#programs-page select').selectmenu().selectmenu("refresh", true);
		}

		if(location.href.indexOf('#projects-page') > -1){
			//console.log('load projects');
			PROJECTS.init();
			$('#projects-page select').selectmenu().selectmenu("refresh", true);
		}

		if(location.href.indexOf('#requests-page') > -1){
			//console.log('load requests');
			REQUESTS.init();
			$('#requests-page select').selectmenu().selectmenu("refresh", true);
		}

		if(location.href.indexOf('#create-item-nko-page') > -1){
			nko_create_page_data();
		}

		if(location.href.indexOf('#my-fund-page') > -1){
			//console.log('load fund');
			function temp_callback(){
				return function(){
					PIF.get_pif_array();
				}
			}
			funds.init( temp_callback() );
		}

		if( ( location.href.indexOf('#trust-list') > -1 ||
				location.href.indexOf('#create-item') > -1 ||
				location.href.indexOf('#create-vote') > -1 ||
				location.href.indexOf('#my-fund-page') > -1 ||
				location.href.indexOf('#voters-page') > -1 ||
				location.href.indexOf('#profile-page') > -1 ||
				location.href.indexOf('#my-votings-page') > -1 ||
				location.href.indexOf('#programs-page?my_program=true') > -1 ||
				location.href.indexOf('#projects-page?my_project_propositions=true') > -1 ||
				location.href.indexOf('#weighted-votings-page?my=1') > -1 ||
				location.href.indexOf('#weighted-votings-page?my=2') > -1 ||
				location.href.indexOf('#projects-page?my_project=true') > -1 ||
				location.href.indexOf('#requests-page?my_request=true') > -1 ||
				location.href.indexOf('#address-item') > -1 ||
				location.href.indexOf('#edit-address') > -1 ||
				location.href.indexOf('#balances-pif-page') > -1 ||
				location.href.indexOf('#spheres-trust-vote') > -1) && SUPER_PROFILE.auth == false){
			ask_login();
		}

		if( (
				location.href.indexOf('#create-item') > -1 ||
				location.href.indexOf('#history-page') > -1 ||
				location.href.indexOf('#project-page') > -1 ||
				location.href.indexOf('#program-page') > -1 ||
				location.href.indexOf('#request-page') > -1) && SUPER_PROFILE.auth == true){
			PIF.get_pif_array();
		}

		if(location.href.indexOf('#trust-list') > -1 && SUPER_PROFILE.auth == true){
			if(!$('#trusted_checkbox').hasClass('ui-checkbox-on')){
				//console.log('checkbpx off');
				$('#trust-list input[name=trusted_checkbox]').checkboxradio().prop('checked', true).checkboxradio( 'refresh' );
			}
			TRUST_LIST.init(false, 'p_s');
		}

		if(( location.href.indexOf('#edit-address') > -1 || 
			 location.href.indexOf('#address-item-1') > -1 ||
			 location.href.indexOf('#address-item-2') > -1 ||
			 location.href.indexOf('#address-item-3') > -1 ) && SUPER_PROFILE.auth == true){
			if(ADRESS){
				ADRESS.init();
				// Onload handler to fire off the app.
				GoogleMapsAdress.initialize();
			}
		}

		if(location.href.indexOf('#create-vote') > -1 && SUPER_PROFILE.auth == true){
			set_dates_range('#create-vote [name=s_time_date]', '#create-vote [name=s_time_month]', '#create-vote [name=s_time_year]', new Date().getFullYear(), 2, "current");
			set_dates_range('#create-vote [name=f_time_date]', '#create-vote [name=f_time_month]', '#create-vote [name=f_time_year]', new Date().getFullYear(), 2, "current");
		}

		if(location.href.indexOf('#registration') > -1){
			$("#captcha").attr("src", mainURL + "/l/tools/showCaptcha.php");
			$('#registration [type=submit]').button('refresh');
		}
	}, 300);

	//PIF.get_pif_array();

	$('#picture_form').ajaxForm({
		url: mainURL + '/i/up.php', 
		type: 'post', 
		success: function(response) {
			if( response.indexOf('error') > -1 ){
				var error_arr = $.parseJSON(response);
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
			$.ajax({
				url: mainURL + "/profile.php",
				type:"GET",
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
				//var data = response.responseText;
				if(response.responseText.indexOf('error') == -1 && !jQuery.parseJSON(response.responseText)[0].error){
					var profile_obj = jQuery.parseJSON(response.responseText)[0];
					$('#profile-page #avatar').attr('src', '.' + profile_obj.avatar);
					$('#menu_avatar').html('<img id="avatar" src="' +  mainURL + profile_obj.avatar + '">');
					//console.log( mainURL + '/' + profile_obj.avatar);
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
						$('#menu_avatar').html('');
					}					
				}
			});
		}
	});

	$('#picture_form_create_vote').ajaxForm({
		url: mainURL + '/i/up.php', 
		type: 'post', 
		success: function(response) {
			var error = 0;
			if(response){
				if(response.indexOf('error') == -1){
					var img = response;
				}else{
					if( response.indexOf('error') > -1 ){
						var error_arr = $.parseJSON(response);
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
					error = 1;
				}
			}else{
				var img = "";
			}
			if(error == 0){
				$('#create-vote #response_img_create_vote').val(img);
				$('#create-vote #image_div_create_vote').attr('style', 'display:block');
				$('#create-vote #image_div_create_vote img').attr('src', img);							
			}else{
				$('#create-vote #response_img_create_vote').val("");
				$('#create-vote #image_div_create_vote').attr('style', 'display:none');
				$('#create-vote #image_div_create_vote img').attr('src', '');
			}
			/*if(response){
				if(response.indexOf('File is larger than the specified amount set') > -1){
					alert(LOCALE_ARRAY_ADDITIONAL.bad_size[CURRENT_LANG]);
					error = 1;
				}else{
					var img = response;
				}
			}else{
				var img = "";
				alert(LOCALE_ARRAY_ADDITIONAL.please_enter_image_voting[CURRENT_LANG]);
				error = 1;
			}*/
			
		}
	});

	//функция create_object

	$('#additional_photo_form').ajaxForm({
		url: mainURL + '/i/up.php', 
		type: 'post', 
		success: function(response) {
			var error = 0;
			if(response){
				if(response.indexOf('error') == -1){
					var img = response;
					//console.log(img);
				}else{
					if( response.indexOf('error') > -1 ){
						var error_arr = $.parseJSON(response);
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
						error = 1;
					}
				}
			}else{
				var img = "";
			}
			if(error == 0){
				$('#create-item #response_img').val(img);
				$('#create-item #image_div').attr('style', 'display:block');
				$('#create-item #image_div img').attr('src', img);							
			}
			/*if(response){
				if(response.indexOf('File is larger than the specified amount set') > -1){
					alert(LOCALE_ARRAY_ADDITIONAL.bad_size[CURRENT_LANG]);
					error = 1;
				}else{
					var img = response;
				}
			}else{
				var img = "";
				//alert(LOCALE_ARRAY_ADDITIONAL.please_enter_image_voting[CURRENT_LANG]);
				//error = 1;
			}*/	
		}
	});

	$('#create-vote #img').click(function(){
		$('#create-vote [name=picture]').click();
	});

	if(location.href.indexOf('network_status=EmailNotMuch') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.email_not_much[CURRENT_LANG]);
	}
	if(location.href.indexOf('network_status=NotAuth') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.not_auth[CURRENT_LANG]);
	}
	if(location.href.indexOf('verification_code=') > -1) { 
		COMMON_OBJECT.registration_verification();
	}
	//PROGRAMS.check_nko_page();
	PROJECTS.check_nko_page();
	REQUESTS.check_nko_page();
	PROGRAMS.check_current_url();
	PROJECTS.check_current_url();
	REQUESTS.check_current_url();
	PROGRAMS.build_history_page();
	PROJECTS.build_history_page();
	REQUESTS.build_history_page();
	CREATE_ITEM.check_item();
	//GROUPS.init_sphere();

	try{
		$('#lang label').attr('lang', CURRENT_LANG);
		$('#lang label').html($('#lang label').data(CURRENT_LANG));
		$('#select-lang').selectmenu("refresh", true);
	}catch(e){
		console.log('exception catched, all ok');
	}
};

$(document).on("pagecontainershow", function () {
	$.mobile.loading( "show", {theme: "z"});
	lang_activate_el();
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	g_current_page = activePage[0].id;

	switch (g_current_page) {
		case 'test':
			console.log('test');
			SPHERES.init();
			SPHERES.events();
			break;
		case 'main-page':
			console.log('main-page');
			break;
		case 'registration':
			console.log('registration');
			break;
		case 'forgot-password':
			console.log('forgot-password');
			break;
		case 'profile-page':
			console.log('profile-page');
			break;
		case 'edit-address':
			console.log('edit-address');
			break;
		case 'address-item-1':
			console.log('address-item-1');
			break;
		case 'address-item-2':
			console.log('address-item-2');
			break;
		case 'address-item-3':
			console.log('address-item-3');
			break;
		case 'spheres-address':
			console.log('spheres-address');
			break;
		case 'spheres-filters':
			console.log('spheres-filters');
			break;
		case 'spheres-trust-vote':
			console.log('spheres-trust-vote');
			break;
		case 'programs-page':
			console.log('programs-page');
			$('.right_col').html('<a href="https://www.facebook.com/citizens.empowering/videos/vb.740675639284899/1044527985566328/?type=2&theater" target="_blank">Инструкция по основным механизмам Гражданского Общества</a>');
			break;
		case 'program-page':
			console.log('program-page');
			PROGRAMS.events();
			break;
		case 'pp-list-page':
			console.log('pp-list-page');
			PROJECT_PROPOSITION.init();
			break;
		case 'pp-page':
			console.log('pp-page');
			break;
		case 'filter-page-programs':
			console.log('filter-page-programs');
			break;
		case 'projects-page':
			console.log('projects-page');
			break;
		case 'project-page':
			console.log('project-page');
			break;
		case 'filter-page-projects':
			console.log('filter-page-projects');
			break;
		case 'requests-page':
			console.log('requests-page');
			break;
		case 'request-page':
			console.log('request-page');
			break;
		case 'filter-page-requests':
			console.log('filter-page-requests');
			break;
		case 'weighted-votings-page':
			PROGRAMS.events();
			console.log('weighted-votings-page');
			break;
		case 'weighted-vote-page':
			PROGRAMS.events();
			console.log('weighted-vote-page');
			break;
		case 'my-fund-page':
			console.log('my-fund-page');
			break;
		case 'transaction-page':
			console.log('transaction-page');
			break;
		case 'nko-page':
			console.log('nko-page');
			break;
		case 'history-page':
			console.log('history-page');
			break;
		case 'public-proposals':
			console.log('public-proposals');
			break;
		case 'local-self-governments':
			console.log('local-self-governments');
			break;
		case 'co-owners':
			console.log('co-owners');
			break;
		case 'parties':
			console.log('parties');
			break;
		case 'primaries':
			console.log('primaries');
			break;
		case 'future':
			console.log('future');
			break;
		case 'help':
			console.log('help');
			break;
		case 'my-activities-page':
			console.log('my-activities-page');
			break;
		case 'my-groups':
			console.log('my-groups');
			GROUPS.init();
			break;
		case 'my-spheres-options':
			console.log('my-spheres-options');
			GROUPS.groups_spheres(GROUPS.group_id);
			break;
		case 'add-group':
			console.log('add-group');
			break;
		case 'add-group-sphere':
			console.log('add-group-sphere');
			break;
		case 'membership-manage':
			console.log('membership-manage');
			break;
		case 'my-tasks-page':
			console.log('my-tasks-page');
			TASKS.init();
			break;
		case 'social-investment':
			console.log('social-investment');
			break;
		case 'social-entrepreneurship':
			console.log('social-entrepreneurship');
			break;
		case 'create-item':
			console.log('create-item');
			break;
		case 'create-item-nko-page':
			console.log('create-item-nko-page');
			break;
		case 'votings-page':
			console.log('votings-page');
			SPHERES.initial();
			SPHERES.init();
			SPHERES.events();
			VOTINGS.init();
			break;
		case 'my-votings-page':
			console.log('my-votings-page');
			MY_VOTINGS.init();
			break;
		case 'vote-page':
			console.log('vote-page');
			VOTINGS.init();
			break;
		case 'my-vote-page':
			console.log('my-vote-page');
			break;
		case 'vote-page-full':
			console.log('vote-page-full');
			break;
		case 'voters-page':
			console.log('voters-page');
			break;
		case 'filter-page':
			console.log('filter-page');
			break;
		case 'create-vote':
			console.log('create-vote');
			break;
		case 'spheres-create-vote':
			console.log('spheres-create-vote');
			break;
		case 'news-page':
			console.log('news-page');
			NEWS.init();
			break;
		case 'community':
			console.log('community');
			break;
		case 'house':
			console.log('house');
			break;
		case 'wallet':
			console.log('wallet');
			break;
		case 'bankid':
			console.log('bankid');
			break;
		case 'trust-list':
			console.log('trust-list');
			break;
		case 'spheres-trust':
			console.log('spheres-trust');
			break;
		case 'balances-pif-page':
			console.log('balances-pif-page');
			break;
		default:
	}

	$.mobile.loading( "hide" );
	console.log('finished');
});

window.onhashchange = function(){
	//lang_activate_el();
	if(UI_STATE_DIALOG == 0 && location.href.indexOf('ui-state=dialog') > -1){
		UI_STATE_DIALOG = 1;
	}

	HISTORY_INNER.push(location.href);
	if( ( location.href.indexOf('#trust-list') > -1 ||
			location.href.indexOf('#create-item') > -1 ||
			location.href.indexOf('#create-vote') > -1 ||
			location.href.indexOf('#my-fund-page') > -1 ||
			location.href.indexOf('#voters-page') > -1 ||
			location.href.indexOf('#profile-page') > -1 ||
			location.href.indexOf('#my-votings-page') > -1 ||
			location.href.indexOf('#programs-page?my_program=true') > -1 ||
			location.href.indexOf('#projects-page?my_project_propositions=true') > -1 ||
			location.href.indexOf('#weighted-votings-page?my=1') > -1 ||
			location.href.indexOf('#weighted-votings-page?my=2') > -1 ||
			location.href.indexOf('#projects-page?my_project=true') > -1 ||
			location.href.indexOf('#requests-page?my_request=true') > -1 ||
			location.href.indexOf('#address-item') > -1 ||
			location.href.indexOf('#edit-address') > -1 ||
			location.href.indexOf('#balances-pif-page') > -1 ||
			location.href.indexOf('#spheres-trust-vote') > -1) && SUPER_PROFILE.auth == false){
		ask_login();
	}

	if(location.href.indexOf('#address-item-1') > -1){
		$('#address-item-1 #delete_address').attr('style', 'display: none');
	}
	if(location.href.indexOf('#address-item-2') > -1){
		$('#address-item-2 #delete_address').attr('style', 'display: none');
	}
	if(location.href.indexOf('#address-item-3') > -1){
		$('#address-item-3 #delete_address').attr('style', 'display: none');
	}

	if( (location.href.indexOf('#spheres-address') > -1 ||
		 location.href.indexOf('#spheres-trust') > -1 ||
		 location.href.indexOf('#spheres-trust-vote') > -1 ||
		 location.href.indexOf('#spheres-create-vote') > -1 ||
		 location.href.indexOf('#spheres-filters') > -1) && UI_STATE_DIALOG == 0){
			SPHERES.initial();
	}
	if(location.href.indexOf('#spheres-trust') > -1){
		$('#spheres-trust #sphere_form select').selectmenu().selectmenu("refresh", true);
	}
	if(location.href.indexOf('#spheres-trust-vote') > -1){
		$('#spheres-trust-vote #sphere_form select').selectmenu().selectmenu("refresh", true);
		$('#spheres-trust-vote').enhanceWithin();
	}

	// if(location.href.indexOf('#votings-page') > -1 
	// 	&& VOTINGS.activated_hard_filter != 1
	// 	&& VOTINGS.activated_easy_filter != 1){
	// 	VOTINGS.init();
	// }

	// if(location.href.indexOf('#my-votings-page') > -1 && SUPER_PROFILE.auth == true){
	// 	MY_VOTINGS.init();
	// }


	if(location.href.indexOf('#wallet') > -1){
		WALLET.init();
	}

	if(location.href.indexOf('#programs-page') > -1
		&& PROGRAMS.activated_hard_filter != 1
		&& PROGRAMS.activated_easy_filter != 1){
		//console.log('load programs');
		PROGRAMS.init();
		$('#programs-page select').selectmenu().selectmenu("refresh", true);
	}

	if(location.href.indexOf('#projects-page') > -1
		&& PROJECTS.activated_hard_filter != 1
		&& PROJECTS.activated_easy_filter != 1){
		//console.log('load projects');
		PROJECTS.init();
	}

	if(location.href.indexOf('#requests-page') > -1
		&& REQUESTS.activated_hard_filter != 1
		&& REQUESTS.activated_easy_filter != 1){
		//console.log('load requests');
		REQUESTS.init();
		$('#requests-page select').selectmenu().selectmenu("refresh", true);
	}

	if(location.href.indexOf('#my-fund-page') > -1 && location.href.indexOf('&ui-state=dialog') == -1){
			//console.log('load fund');
			function temp_callback(){
				return function(){
					PIF.get_pif_array();
				}
			}
			funds.init( temp_callback() );
		}

	if(location.href.indexOf('#create-item-nko-page') > -1){
		nko_create_page_data();
	}

	if(location.href.indexOf('#weighted-votings-page') > -1 || location.href.indexOf('#vote-page?vote=') > -1){
		WEIGHTED_VOTINGS.init();
		$('#weighted-votings-page select').selectmenu().selectmenu("refresh", true);
	}

	if(location.href.indexOf('#trust-list') > -1 && SUPER_PROFILE.auth == true){
		if(!$('#trusted_checkbox').hasClass('ui-checkbox-on')){
			//console.log('checkbpx off');
			$('#trust-list input[name=trusted_checkbox]').checkboxradio().prop('checked', true).checkboxradio( 'refresh' );
		}
		TRUST_LIST.init(false, 'p_s');
	}

	if(( location.href.indexOf('#edit-address') > -1 || 
		 location.href.indexOf('#address-item-1') > -1 ||
		 location.href.indexOf('#address-item-2') > -1 ||
		 location.href.indexOf('#address-item-3') > -1 ) && SUPER_PROFILE.auth == true){
		if(ADRESS){
			ADRESS.init();
			GoogleMapsAdress.initialize();
		}
	}

	if(location.href.indexOf('#create-vote') > -1 && SUPER_PROFILE.auth == true){
		set_dates_range('#create-vote [name=s_time_date]', '#create-vote [name=s_time_month]', '#create-vote [name=s_time_year]', new Date().getFullYear(), 2, "current");
		set_dates_range('#create-vote [name=f_time_date]', '#create-vote [name=f_time_month]', '#create-vote [name=f_time_year]', new Date().getFullYear(), 2, "current");
		$.mobile.loading( "hide" );
	}


	if(location.href.indexOf('#profile-page') > -1 && SUPER_PROFILE.auth == true){
		switch(SUPER_PROFILE.gender){
			case "0":
				$('#profile-page #female').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-radio-off');
				$('#profile-page #male').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
				break;
			case "1":
				$('#profile-page #male').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-radio-off');
				$('#profile-page #female').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
				break;
		}
	}

	if(location.href.indexOf('#registration') > -1){
		$("#captcha").attr("src", mainURL + "/l/tools/showCaptcha.php");
		$('#registration [type=submit]').button('refresh');
	}

	if(location.href.indexOf('network_status=EmailNotMuch') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.email_not_much[CURRENT_LANG]);
	}
	if(location.href.indexOf('network_status=NotAuth') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.not_auth[CURRENT_LANG]);
	}

	if(location.href.indexOf('#spheres-trust') > -1){
		$('#spheres-trust #sphere_form select').selectmenu().selectmenu("refresh", true);
	}
	if(location.href.indexOf('#spheres-trust-vote') > -1){
		$('#spheres-trust-vote #sphere_form select').selectmenu().selectmenu("refresh", true);
	}
	if(location.href.indexOf('#create-item') > -1){
		$('#create-item select').selectmenu().selectmenu("refresh", true);
	}
	/*if(location.href.indexOf('#spheres-trust-vote') > -1){
		$('#spheres-trust-vote #sphere_form select').selectmenu().selectmenu("refresh", true);
	}*/

	if(location.href.indexOf('#address-item-1') > -1){
		var page = 1;
		$('#address-item-' + page + ' [name=country]').selectmenu("refresh", true);
		$('#address-item-' + page + ' [name=state]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=city]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=index]').selectmenu("refresh", true);
	}else if(location.href.indexOf('#address-item-2') > -1){
		var page = 2;
		$('#address-item-' + page + ' [name=country]').selectmenu("refresh", true);
		$('#address-item-' + page + ' [name=state]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=city]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=index]').selectmenu("refresh", true);
	}else if(location.href.indexOf('#address-item-3') > -1){
		var page = 3;
		$('#address-item-' + page + ' [name=country]').selectmenu("refresh", true);
		$('#address-item-' + page + ' [name=state]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=city]').selectmenu("refresh", true);
		//$('#address-item-' + page + ' [name=index]').selectmenu("refresh", true);	
	}
	if(typeof ADRESS !== 'undefined' ){
		if(ADRESS.address_arr[page-1]){
			if(ADRESS.address_arr[page-1].reg_adr.indexOf("0") < 0 ){
				$('#address-item-' + page + ' .ui-btn.ui-btn-inherit.ui-btn-icon-left').attr('class', 'ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-on');
				$('#address-item-' + page + ' [name=off_address]').data('cacheval', 'false');
			}else{
				//console.log('do not work');
				//console.log('page:' + page);
				$('#address-item-' + page + ' .ui-btn ui-btn-inherit.ui-btn-icon-left').attr('class', 'ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off');
				$('#address-item-' + page + ' [name=off_address]').data('cacheval', 'true');	
			}
			
		}else if(page){
			ADRESS.enable(page, 'state');
		}
	}

	if(location.href.indexOf('#options-page') > -1){
		$('#select-lang2').selectmenu("refresh", true);
	}

	if(location.href.indexOf('#transaction-page') > -1){
		funds.set_pif_options_transaction_page('#transaction-page');
	}
	if(location.href.indexOf('#my-fund-page') > -1){
		//funds.set_pif_options_transaction_page('#my-fund-page');
		//funds.current_fund_history();
	}		

	//VOTINGS.check_current_url(0);
	//MY_VOTINGS.check_current_url(0);
	WEIGHTED_VOTINGS.init();
	PROGRAMS.check_current_url(0);
	PROJECTS.check_current_url(0);
	REQUESTS.check_current_url(0);
	//PROGRAMS.check_nko_page();
	PROJECTS.check_nko_page();
	REQUESTS.check_nko_page();
	PROGRAMS.build_history_page();
	PROJECTS.build_history_page();
	REQUESTS.build_history_page();
	CREATE_ITEM.check_item();
	funds.current_fund_history();
	try{
		var new_lang = $('#select-lang').find("option:selected").val();
		$('#select-lang > option[value="' + new_lang + '"]').attr('selected', 'selected');
		$('#select-lang').selectmenu("refresh", true);
	}catch(e){
		console.log('exception catched, all ok');
	}

	if(UI_STATE_DIALOG == 1 && location.href.indexOf('ui-state=dialog') == -1){
		UI_STATE_DIALOG = 0;
	}
};

function createCookie(name, value, days) {
	var expires = '';

	/*if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}*/
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

function ask_login(){
	var answer = confirm(LOCALE_ARRAY_ADDITIONAL.only_registered_users_able[CURRENT_LANG]);
	if(answer){
		$.mobile.navigate('#');
	}else{
		history.back();
	}
}

function set_dates_range(selector_date, selector_month, selector_year, year_from, years_after_current, selected_date, direction){
	var selected = false;
	var options = "";
	//добавим дни, если нужно - выделим конкретный
	for (var i = 1; i < 32; i++) {
		selected = false;
		if(selected_date == "current" && (new Date().getDate() == i)){
			selected = true;			
		}
		if(i < 10){
			var string_number = "0" + i;
		}else{
			var string_number = i;
		}
		if(selected == true){
			options += '<option value="' + string_number + '" selected>' + i + '</option>';
		}else{
			options += '<option value="' + string_number + '">' + i + '</option>';
		}
	}
	$(selector_date).html(options);
	//добавим месяца, если нужно - выделим конкретный
	options = "";
	var current_month = -1;
	if(selected_date == "current"){
		current_month = new Date().getMonth() + 1;
	}
	if(current_month == 1){		options += '<option value="01" selected>' + LOCALE_ARRAY_ADDITIONAL.january[CURRENT_LANG] + '</option>';	}else{		options += '<option value="01">' + LOCALE_ARRAY_ADDITIONAL.january[CURRENT_LANG] + '</option>';	}
	if(current_month == 2){		options += '<option value="02" selected>' + LOCALE_ARRAY_ADDITIONAL.february[CURRENT_LANG] + '</option>';	}else{		options += '<option value="02">' + LOCALE_ARRAY_ADDITIONAL.february[CURRENT_LANG] + '</option>';	}
	if(current_month == 3){		options += '<option value="03" selected>' + LOCALE_ARRAY_ADDITIONAL.march[CURRENT_LANG] + '</option>';	}else{		options += '<option value="03">' + LOCALE_ARRAY_ADDITIONAL.march[CURRENT_LANG] + '</option>';	}
	if(current_month == 4){		options += '<option value="04" selected>' + LOCALE_ARRAY_ADDITIONAL.april[CURRENT_LANG] + '</option>';	}else{		options += '<option value="04">' + LOCALE_ARRAY_ADDITIONAL.april[CURRENT_LANG] + '</option>';	}
	if(current_month == 5){		options += '<option value="05" selected>' + LOCALE_ARRAY_ADDITIONAL.may[CURRENT_LANG] + '</option>';	}else{		options += '<option value="05">' + LOCALE_ARRAY_ADDITIONAL.may[CURRENT_LANG] + '</option>';	}
	if(current_month == 6){		options += '<option value="06" selected>' + LOCALE_ARRAY_ADDITIONAL.june[CURRENT_LANG] + '</option>';	}else{		options += '<option value="06">' + LOCALE_ARRAY_ADDITIONAL.june[CURRENT_LANG] + '</option>';	}
	if(current_month == 7){		options += '<option value="07" selected>' + LOCALE_ARRAY_ADDITIONAL.july[CURRENT_LANG] + '</option>';	}else{		options += '<option value="07">' + LOCALE_ARRAY_ADDITIONAL.july[CURRENT_LANG] + '</option>';	}
	if(current_month == 8){		options += '<option value="08" selected>' + LOCALE_ARRAY_ADDITIONAL.august[CURRENT_LANG] + '</option>';	}else{		options += '<option value="08">' + LOCALE_ARRAY_ADDITIONAL.august[CURRENT_LANG] + '</option>';	}
	if(current_month == 9){		options += '<option value="09" selected>' + LOCALE_ARRAY_ADDITIONAL.september[CURRENT_LANG] + '</option>';	}else{		options += '<option value="09">' + LOCALE_ARRAY_ADDITIONAL.september[CURRENT_LANG] + '</option>';	}
	if(current_month == 10){		options += '<option value="10" selected>' + LOCALE_ARRAY_ADDITIONAL.october[CURRENT_LANG] + '</option>';	}else{		options += '<option value="10">' + LOCALE_ARRAY_ADDITIONAL.october[CURRENT_LANG] + '</option>';	}
	if(current_month == 11){		options += '<option value="11" selected>' + LOCALE_ARRAY_ADDITIONAL.november[CURRENT_LANG] + '</option>';	}else{		options += '<option value="11">' + LOCALE_ARRAY_ADDITIONAL.november[CURRENT_LANG] + '</option>';	}
	if(current_month == 12){		options += '<option value="12" selected>' + LOCALE_ARRAY_ADDITIONAL.december[CURRENT_LANG] + '</option>';	}else{		options += '<option value="12">' + LOCALE_ARRAY_ADDITIONAL.december[CURRENT_LANG] + '</option>';	}
	$(selector_month).html(options);
	//добавим года, если нужно - выделим конкретный
	options = "";
	var year_to = new Date().getFullYear() + years_after_current;
	if(direction == "from_oldest"){
		for (var i = year_from; i < year_to+1; i++) {
			options += '<option value="' + i + '">' + i + '</option>';			
		}
	}else{
		for (var i = year_to; i > year_from-1; i--) {
			selected = false;
			if(selected_date == "current" && (new Date().getFullYear() == i)){
				selected = true;			
			}
			if(selected == true){
				options += '<option value="' + i + '" selected>' + i + '</option>';
			}else{
				options += '<option value="' + i + '">' + i + '</option>';
			}
		}
	}
	$(selector_year).html(options);
	$('#create-vote select').selectmenu().selectmenu("refresh", true);
}

function nko_create_page_data(){
	var data_for_build;

	$.ajax({
		url: mainURL + "/nco.php",
		type: "GET",
		xhrFields: {
	 		withCredentials: true
		},
	 	crossDomain: true,
		complete: function( response ){
			data_for_build = $.parseJSON( response.responseText );

			var nko_parts = '';
			jQuery.each(data_for_build, function(i, one_nko) {
				nko_parts += '<li>\
								<div onclick = "nco_show_selected( ' + one_nko.id + ', \'' + one_nko.nco_name + '\', \'' + one_nko.nco_phone + '\', \'' + one_nko.doc_type + '\', \'' + one_nko.doc_series + '\', \'' + one_nko.doc_number + '\', \'' + one_nko.doc_date + '\', \'' +  one_nko.address_type + '\', \'' + one_nko.street + '\', \'' + one_nko.city + '\', \'' + one_nko.county + '\', \'' + one_nko.build + '\', \'' + one_nko.ap + '\'  )" class="ui-checkbox">\
									<label class="ui-btn ui-btn-icon-left ui-checkbox-off"></label><input type="checkbox" name="nco_chk" n_id="' + one_nko.id + '" value="1" data-enhanced="true" />\
								</div>\
								<div>\
									<strong>' + one_nko.nco_name + '</strong> (<strong>ID</strong>:<span >' + one_nko.id + '</span>)<span class="phone">' + one_nko.nco_phone + '</span><span class="doc">' + one_nko.doc_type + ' ' + one_nko.doc_series + ' ' + one_nko.doc_number + ' ' + one_nko.doc_date + '</span><span class="addr">' + one_nko.address_type + ' ' + one_nko.street + ',' + one_nko.city + ',' + one_nko.county + ', дом ' + one_nko.build + ', каб. ' + one_nko.ap + '</span>\
								</div>\
							</li>\ '; 
			});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
								<h1>\
									' + LOCALE_ARRAY_ADDITIONAL.nco_list_title[CURRENT_LANG] + '\
								</h1>\
								<a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "inner_back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
								<div id="project-nko-help" class="help-popup" data-role="popup" data-history="false">\
									<div class="title">\
										' + LOCALE_ARRAY_ADDITIONAL.description[CURRENT_LANG] + '\
									</div>\
									<div class="text">\
										' + LOCALE_ARRAY_ADDITIONAL.help_nco_create_page[CURRENT_LANG] + '\
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
								</div>\
							</div>';
			$('#create-item-nko-page').html( ui_string ).enhanceWithin();
		}
	});
}

function nco_show_selected( id, nco_name, nco_phone, doc_type, doc_series, doc_number, doc_date, address_type, street, city, county, build, ap){
	var nco_ui = '<div class="select-nko-wrap">\
					<div class="title">\
						' + LOCALE_ARRAY_ADDITIONAL.choosen_nco[CURRENT_LANG] + '\
					</div>\
					<ol><li>\
					<div>\
						<strong>' + nco_name + '</strong> (<strong>ID</strong>:<span>' + id + '</span>)<span class="phone">' + nco_phone + '</span><span class="doc">' + doc_type + ' ' + doc_series + ' ' + doc_number + ' ' + doc_date + '</span><span class="addr">' + address_type + ' ' + street + ',' + city + ',' + county + ', дом ' + build + ', каб. ' + ap + '</span>\
						</div>\
					<ol></li></div>\ ';
	$('#create-item #nco_content').html(nco_ui);
	$('#create-item [name=nco]').val(id); $.mobile.navigate('#create-item');
}

var COMMON_OBJECT = {
	custom_listeners: function(){

		//Scrolling list update
		//console.log($(window).scrollTop());
		//console.log($(document).height()- $(window).height() - 1);
		if( $(window).scrollTop() > ($(document).height() - $(window).height() - 2)){
			switch (g_current_page) {
				case 'votings-page':
					VOTINGS.reinit();
					break;
				case 'news-page':
				 	NEWS.init();
				 	break;
				case 'trust-list':
					TRUST_LIST.reinit();
					break;
				case 'my-votings-page':
					MY_VOTINGS.reinit();
					break;
				case 'programs-page':
					PROGRAMS.reinit();
					break;
				case 'projects-page':
					PROJECTS.reinit();
					break;
				case 'requests-page':
					REQUESTS.reinit();
					break;
				case 'weighted-votings-page':
					WEIGHTED_VOTINGS.reinit();
					break;
				case 'pp-list-page':
					PROJECT_PROPOSITION.scrolled_down = 1;
					PROJECT_PROPOSITION.init();
					break;
				case 'members':
					MEMBERS.scrolled_down = 1;
					MEMBERS.init();
					break;
				case 'my-groups':
					GROUPS.scrolled_down = 1;
					GROUPS.init();
					break;
			}
		}
	},
	init_common_listeners: function(){
		window.addEventListener("scroll", COMMON_OBJECT.custom_listeners );	

		//all module.events() activation here
		MEMBERS.events();
		GROUPS.events();
		CREATE_ITEM.events();
		PROFILE.events();
		RIGHT_COL.events();
	},
	custom_swipe: function(object){
		switch($(object).data('show')){
			case 0:
				$.mobile.activePage.find('.filters-panel').find('.filters-panel-inner').slideUp(200);
				$('.filter_slider_btn').show();
				break;
			case 1:
				$(object).hide();
				$.mobile.activePage.find('.filters-panel').find('.filters-panel-inner').slideDown(500);
				break;
		}
	},
	free_callbacker: function(callback_function){
		if(callback_function){
			callback_function();
		}
	},
	registration_verification: function(){ 
		var pattern = /m=[0-9]+/; 
		var parts = pattern.exec(location.href);
		pattern = /[0-9]/;
		parts = pattern.exec(parts[0]);
		var the_m = parts[0];

		pattern = /id=[0-9]+/; 
		parts = pattern.exec(location.href);
		pattern = /[0-9]+/;
		parts = pattern.exec(parts[0]);
		var the_id = parts[0];

		pattern = /verification_code=[\w]+/; 
		parts = pattern.exec(location.href);
		pattern = /[^verification_code=][\w]+/;
		parts = pattern.exec(parts[0]);
		var the_verification_code = parts[0];

		$.ajax({
			url: mainURL + "/l/index.php",
			type: "POST",
			data: {"m": the_m,
				 "id": the_id,
				 "verification_code": the_verification_code },
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(response){
				if(response && response.responseText.indexOf('error') == -1){
					window.location.replace(mainURL + "/index.html");
				}else{
					message_result(response.responseText);
				}				
			}
		});
	}
}

var CREATE_ITEM = {
	create_object: function (){
		var img = $('#create-item #response_img').val();
		switch($('#create-item [name=type_item]').val()){
			case '2':
				CREATE_ITEM.send_program(img);
				break;
			case '3':
				CREATE_ITEM.send_project_proposition(img);
				break;
			case '4':
				CREATE_ITEM.send_project(img);
				break;
			case '5':
				CREATE_ITEM.send_request(img);
				break;
			case '6':
				CREATE_ITEM.send_weighted_voting(img);
				break;
		}
	},
	check_item: function(){
		var self = this;		
		if(location.href.indexOf('#create-item?project=true') > -1){
			$('#create-item [name=type_item] option[value=4]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_project[CURRENT_LANG]);
			$('#create-item .ui-icon-back').attr('onclick', 'inner_back(\'#projects-page?my_project=true\')');			
		}else if(location.href.indexOf('#create-item?program=true') > -1){
			$('#create-item [name=type_item] option[value=2]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_program[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_program[CURRENT_LANG]);
			$('#create-item .ui-icon-back').attr('onclick', 'inner_back(\'#programs-page?my_program=true\')');
		}else if(location.href.indexOf('#create-item?request=true') > -1){
			$('#create-item [name=type_item] option[value=5]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_request[CURRENT_LANG]);
			$('#create-item .ui-icon-back').attr('onclick', 'inner_back(\'#requests-page?my_request=true\')');			
		}else if(location.href.indexOf('#create-item?weighted_voting=true') > -1){
			$('#create-item [name=type_item] option[value=6]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_weighted_vote[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_weighted_vote[CURRENT_LANG]);
			if(location.href.indexOf('#create-item?weighted_voting=true&item=') > -1){
				var match_array = location.href.match(/item=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				$('#create-item [name=program_id]').val(object_id);
				$('#create-item .ui-icon-back').attr('onclick', 'inner_back(\'#weighted-votings-page?program=' + object_id + '\')');
			}
		}else if(location.href.indexOf('#create-item?project_proposition=true') > -1){
			if(location.href.indexOf('#create-item?project_proposition=true&item=') > -1){
				var match_array = location.href.match(/item=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				$('#create-item [name=program_id]').val(object_id);
				$('#create-item .ui-icon-back').attr('onclick', 'inner_back(\'#projects-page?program=' + object_id + '\')');
			}
			$('#create-item [name=type_item] option[value=3]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_project_proposition[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_project_proposition[CURRENT_LANG]);
		}
		$('#create-item select').selectmenu().selectmenu("refresh", true);
		self.switch_item();
	},
	switch_item: function(){
		$('#create-item #dtex').attr('style', 'display: none');
		$('#create-item #ben').attr('style', 'display: none');
		$('#create-item #amount').attr('style', 'display: none');
		$('#create-item #curr').attr('style', 'display: none');
		$('#create-item #start').attr('style', 'display: none');
		$('#create-item #program_id').attr('style', 'display: none');
		$('#create-item .btn-nko').attr('style', 'display: none');
		switch($('#create-item [name=type_item]').val()){
			case '2':
				$('#create-item #additional_photo_form [name=type]').val(2);
				//$('#create-item #amount').attr('style', 'display: block');
				$('#create-item #curr').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_program[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_program[CURRENT_LANG]);
				//$('#create-item .btn-nko').attr('style', 'display: block');
				//$('#create-item #submit').attr('onclick', 'CREATE_ITEM.send_program()');
				break;
			case '3':
				$('#create-item #additional_photo_form [name=type]').val(3);
				$('#create-item #amount').attr('style', 'display: block');
				$('#create-item #dtex').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_project_proposition[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_project_proposition[CURRENT_LANG]);
				$('#create-item .btn-nko').attr('style', 'display: block');
				//$('#create-item #submit').attr('onclick', 'CREATE_ITEM.send_project_proposition()');
				break;
			case '4':
				$('#create-item #additional_photo_form [name=type]').val(4);
				$('#create-item #amount').attr('style', 'display: block');
				$('#create-item #curr').attr('style', 'display: block');
				//$('#create-item #submit').attr('onclick', 'CREATE_ITEM.send_project()');
				$('#create-item #dtex').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_project[CURRENT_LANG]);	
				$('#create-item .btn-nko').attr('style', 'display: block');
				break;
			case '5':
				$('#create-item #additional_photo_form [name=type]').val(5);
				$('#create-item #amount').attr('style', 'display: block');
				$('#create-item #curr').attr('style', 'display: block');
				//$('#create-item #submit').attr('onclick', 'CREATE_ITEM.send_request()');
				$('#create-item #dtex').attr('style', 'display: block');
				$('#create-item #ben').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_request[CURRENT_LANG]);
				$('#create-item .btn-nko').attr('style', 'display: block');
				break;
			case '6':
				$('#create-item #additional_photo_form [name=type]').val(1);
				$('#create-item #dtex').attr('style', 'display: block');
				$('#create-item #start').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_weighted_vote[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_weighted_vote[CURRENT_LANG]);
				//$('#create-item #submit').attr('onclick', 'CREATE_ITEM.send_weighted_voting()');
				break;
		}
	},
	send_project: function(img){
		var self = this;
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		var validation_row = [];
		//validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=nco]').val(), error: LOCALE_ARRAY_ADDITIONAL.nco_not_selected[CURRENT_LANG] };

		var l_amount = $('#create-item [name=amount]').val();
		validation_row[ validation_row.length ] = { type: 1, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.no_amount[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 2, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.min_amount[CURRENT_LANG] };

		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=tags]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_tags[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=descr]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_description[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=title]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_title[CURRENT_LANG] };		

		var validation_error = self.validation( validation_row );
		if( validation_error == 0 ){
			$.ajax({
				url: mainURL + "/project_add.php",
				type: "POST",
				data: {"img": img,
					 "descr": $("#create-item .jqte_editor").html(),
					 "title": $('#create-item [name=title ]').val(),
					 "dtex": dtex, 
					 "tags": $('#create-item [name=tags]').val(),
					 "nco": $('#create-item [name=nco]').val(),
					 "curr": $('#create-item [name=curr]').val(),
					 "amount": $('#create-item [name=amount]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						$.mobile.navigate("#project-page?project=" + id);
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
					//$.mobile.navigate("#vote-page?vote=" + id);
				}
			});
		}
	},
	send_program: function(img){
		var self = this;
		var validation_row = [];
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=tags]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_tags[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=descr]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_description[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=title]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_title[CURRENT_LANG] };		

		var validation_error = self.validation( validation_row );
		if( validation_error == 0 ){
			$.ajax({
				url: mainURL + "/program_add.php",
				type: "POST",
				data: {"img": img,
					 "descr": $("#create-item .jqte_editor").html(),
					 "title": $('#create-item [name=title ]').val(),
					 "tags": $('#create-item [name=tags]').val(),
					 "curr": $('#create-item [name=curr]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						$.mobile.navigate("#program-page?program=" + id);
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
					//$.mobile.navigate("#vote-page?vote=" + id);
				}
			});
		}
	},
	send_request: function(img){
		var self = this;
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		var validation_row = [];
		//validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=nco]').val(), error: LOCALE_ARRAY_ADDITIONAL.nco_not_selected[CURRENT_LANG] };

		var l_amount = $('#create-item [name=amount]').val();
		validation_row[ validation_row.length ] = { type: 1, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.no_amount[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 2, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.min_amount[CURRENT_LANG] };

		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=ben]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_beneficiary[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=tags]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_tags[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=descr]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_description[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=title]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_title[CURRENT_LANG] };		

		var validation_error = self.validation( validation_row );
		if( validation_error == 0 ){
			$.ajax({
				url: mainURL + "/request_add.php",
				type: "POST",
				data: {"img": img,
					 "descr": $('#create-item [name=descr]').val(),
					 "title": $('#create-item [name=title]').val(),
					 "dtex": dtex,
					 "ben": $('#create-item [name=ben]').val(),
					 "tags": $('#create-item [name=tags]').val(),
					 "nco": $('#create-item [name=nco]').val(),
					 "curr": $('#create-item [name=curr]').val(),
					 "amount": $('#create-item [name=amount]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						$.mobile.navigate("#request-page?request=" + id);
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
					//$.mobile.navigate("#vote-page?vote=" + id);
				}
			});
		}
	},
	send_weighted_voting: function(img){
		var self = this;
		var start = $('#create-item [name=start_year]').val() + "-" 
				 + $('#create-item [name=start_month]').val() + "-" 
				 + $('#create-item [name=start_date]').val();
		var finish = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		var validation_row = [];
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=tags]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_tags[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=descr]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_description[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=title]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_title[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 1, value: $('#create-item [name=program_id]').val(), error: LOCALE_ARRAY_ADDITIONAL.weighted_voitng_only_from_program[CURRENT_LANG] };		

		var validation_error = self.validation( validation_row );
		if( validation_error == 0 ){
			$.ajax({
				url: mainURL + "/weighted_voting_add.php",
				type: "POST",
				data: {"img": img,
					 "descr": $('#create-item [name=descr]').val(),
					 "title": $('#create-item [name=title]').val(),
					 "program_id": $('#create-item [name=program_id]').val(),
					 "start": start,
					 "finish": finish, 
					 "tags": $('#create-item [name=tags]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						$.mobile.navigate("#weighted-vote-page?vote=" + id);
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
					//$.mobile.navigate("#vote-page?vote=" + id);
				}
			});
		}
	},
	send_project_proposition: function(img){
		var self = this;
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		var validation_row = [];
		//validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=nco]').val(), error: LOCALE_ARRAY_ADDITIONAL.nco_not_selected[CURRENT_LANG] };
		var l_amount = $('#create-item [name=amount]').val();
		validation_row[ validation_row.length ] = { type: 1, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.no_amount[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 2, value: l_amount, error: LOCALE_ARRAY_ADDITIONAL.min_amount[CURRENT_LANG] };

		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=tags]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_tags[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=descr]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_description[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 0, value: $('#create-item [name=title]').val(), error: LOCALE_ARRAY_ADDITIONAL.no_title[CURRENT_LANG] };
		validation_row[ validation_row.length ] = { type: 1, value: $('#create-item [name=program_id]').val(), error: LOCALE_ARRAY_ADDITIONAL.projects_proposition_only_from_program[CURRENT_LANG] };		

		var validation_error = self.validation( validation_row );
		if( validation_error == 0 ){
			$.ajax({
				url: mainURL + "/project_propositions_add.php",
				type: "POST",
				data: {"img": img,
					 "descr": $("#create-item .jqte_editor").html(),
					 "title": $('#create-item [name=title ]').val(),
					 "dtex": dtex,
					 "program_id": $('#create-item [name=program_id]').val(), 
					 "tags": $('#create-item [name=tags]').val(),
					 "nco": $('#create-item [name=nco]').val(),
					 "curr": $('#create-item [name=curr]').val(),
					 "amount": $('#create-item [name=amount]').val()},
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					if(response && response.responseText.indexOf('error') == -1){
						alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
						var id = $.parseJSON(response.responseText);
						id = id[0].id;
						$.mobile.navigate("#project-page?project_proposition=" + id);
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
					//$.mobile.navigate("#vote-page?vote=" + id);
				}
			});
		}
	},
	validation: function( rows_array ){
		var error = 0;
		var error_description = '';
		jQuery.each(rows_array, function(i, one_row) {
			switch( one_row.type ){
				case 0:
					if( one_row.value == '' ){
						error_description = one_row.error;
						error = 1;
					}
					break;
				case 1:
					if( one_row.value == '' || one_row.value == 0 ){
						error_description = one_row.error;
						error = 1;
					}
					break;
				case 2:
					if($('#create-item [name=curr]').val() == 980 && one_row.value < 500){
						error_description = one_row.error;
						error = 1;
					}
					break;
			}
		});
		if(error_description != '')
			alert( error_description );

		return error;
	},
	events: function(){
		$('#add-item-back').click(function(){
			$.mobile.navigate('#' + $('#add-item-back').attr('back'));
		});
	}
}

var HISTORY_PAGE = {
	build_history_page: function(object_id, my_add, amount_current, amount_asking, currency_asking){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/fund_public_cf.php?type=4&id=' + object_id,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				var funds_list = $.parseJSON( response.responseText );
				//console.log('history');	
				$.mobile.loading( "hide" );

				var ui_funds = '';
				var ui_cf = '';
				var main_currency = PIF.get_currency_name_by_id( currency_asking );
				jQuery.each(funds_list, function(i, one_fund) {					
					for (var i = 0; i < one_fund.cf.length; i++) {
						var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
						ui_cf += '<tr>\
									<td>' + one_fund.cf[i].ts_created + '</td>\
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
											' + LOCALE_ARRAY_ADDITIONAL.help_history_page[CURRENT_LANG] + '\
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
													' + amount_current + '\
													 ' + main_currency + '</strong><span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span>\
												</div>\
											</div>\
											<div class="ui-block-c">\
												<div class="total-amount">\
													<strong>\
													' + amount_asking + '\
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
}

var MAP = {
	marks_list: [],
	marks_url: '/map_marks.php',
	center: [48.574740, 31.465320],
	zoom: 5,
	max_zoom: 18,
	nh: 0,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + MAP.marks_url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(l_response){
				var l_query_array = $.parseJSON(l_response.responseText );
				if(l_query_array.length > 0){
					MAP.marks_list = MAP.marks_list.concat(l_query_array);
					MAP.build_elements();
					MAP.marks_last_item += l_query_array.length;
					$.mobile.loading( "hide" );
				}
			},
		});
	},
	build_elements: function(){
		var self = this;
		var elements_string = '';
		var build_array = MAP.marks_list;
		if(MAP.nh){
			var map = L.map('map').setView(MAP.marks_list[0], MAP.max_zoom);
		}else{
			var map = L.map('map').setView(MAP.center, MAP.zoom);
		}

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a rel="nofollow" href="https://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

		jQuery.each(build_array, function(i, one_mark) {

			L.marker([one_mark.lat, one_mark.lng]).addTo(map);

		});

		$('.leaflet-container').show();

	},
}; 

var LIST_OF_ITEM = {
	load: 0,
	build_items_list: function(p_items_list){
		var self = this;
		var l_elements_string = '';
		var l_item_properties = '';
		var l_str_a = '';
		var l_str_b = '';
		var l_str_c = '';
		var l_str_d = '';

		var l_image = '';
		var l_img = '';
		var l_city = '';
		var l_classes = '';
		var l_label = '';
		var l_extra = '';
		var l_org = '';

		jQuery.each(p_items_list, function(i, l_one_item) {
			l_item_properties = '';
			l_str_a = '';
			l_str_b = '';
			l_str_c = '';
			l_str_d = '';

			l_image = '';
			l_img = '';
			l_city = '';
			l_classes = '';
			l_label = '';
			l_extra = '';
			l_org = '';

			switch( parseInt(l_one_item.type_id) ){
				case 4:
					//groups
					$('[org_id=' + l_one_item.id + ']').remove();
					l_item_properties = ' user_id="' + l_one_item.user_id + '" org_id="' + l_one_item.id + '" style="cursor:pointer" ';
					l_classes = ' group-item ';
					l_image = mainURL + '/uploads/news.svg';

					switch(CURRENT_LANG){
						case 'en':
							l_city = l_one_item.city_en;
							l_org = l_one_item.org_en;
				 		break;
						case 'uk':
							l_city = l_one_item.city_uk;
							l_org = l_one_item.org_uk;
				 		break;
				 		case 'ru':
							l_city = l_one_item.city_ru;
							l_org = l_one_item.org_ru;
				 		break;
				 	}


					l_str_a = '<b>ID: ' + l_one_item.id + ' :: ' + '</b>' + l_org ;
					l_str_b = '<b>' + l_one_item.user_id + ' @ ' + '</b>' + l_one_item.user_name ;
					l_str_c = l_city;
					l_str_d = '<img src="/images/icon-contractors.png" /> <b>' + l_one_item.users + '</b>';
					l_label = '4';

					break;
				case 10:
					l_item_properties = ' id="' + l_one_item.id + '" ';
					l_image = mainURL + '/uploads/news.svg';
					l_str_a = '<b>' + l_one_item.name_uk + '</b>';
					break;
				case 11:
					l_item_properties = '  access_id="' + l_one_item.id + '" user_id="' + l_one_item.user_id + '" ';
					if(l_one_item.avatar == '') {
						l_image = mainURL + '/images/svg/avatar-bg.svg';
					} else {
						l_image = mainURL + '/uploads/' + l_one_item.user_id + '/0/' + l_one_item.avatar;
					}
					l_str_a = '<b>ID: ' + l_one_item.user_id + ' :: ' + l_one_item.user_name + '<br />';
					l_name = l_one_item.fname + ' ' + l_one_item.lname + '</b>';
					if(Number(l_one_item.right) == 0){
						l_str_d = '<a class="btn_approve ui-btn btn-save ui-corner-all" href="#">' + LOCALE_ARRAY_ADDITIONAL.btn_approve[CURRENT_LANG] + '</a><a class="btn_decline btn-delete ui-btn ui-corner-all" href="#">' + LOCALE_ARRAY_ADDITIONAL.btn_decline[CURRENT_LANG] + '</a>';
					}

					for (var i = 0; i < l_one_item.t_s.length; i++) {
						switch(l_one_item.t_s[i].s){
							case "1":
								l_str_b += '<img class="ribbon ui-corner-all" src="images/trust-icon-fb.png" />';
								break;
							case "2":
								l_str_b += '<img class="ribbon ui-corner-all" src="images/trust-icon-gp.png" />';
								break;
							case "3":
								l_str_b += '<img class="ribbon ui-corner-all" src="images/trust-icon-tw.png" />';
								break;
							case "4":
								l_str_b += '<img class="ribbon ui-corner-all" src="images/trust-icon-in.png" />';
								break;
							case "5":
								l_str_b += '<img class="ribbon ribon ui-corner-all" src="images/trust-icon-vk.png" />';
								break;
							case "6":
								l_str_b += '<img class="ribbon ui-corner-all" src="images/trust-icon-ok.png" />';
								break;
							case "7":
								l_str_c += '<img class="ribbon ui-corner-all" src="images/trust-icon-wallet.png" />';
								break;
							case "8":
								l_str_c += '<img class="ribbon ui-corner-all" src="images/trust-icon-house.png" />';
								break;
							case "9":
								l_str_c += '<img class="ribbon ui-corner-all" src="images/trust-icon-community.png" />';
								break;
							case "10":
								l_str_c += '<img class="ribbon ui-corner-all" src="images/trust-icon-password.png" />';
								break;
						}
					}
					break;
				case 12:
					l_classes = 'nco_to_set';
					l_image = mainURL + '/images/svg/avatar-bg.svg';
					l_item_properties = ' n_id="' + l_one_item.id + '" style="cursor:pointer" ';
					l_str_a = '<b>ID: ' + l_one_item.id + ' :: ' + l_one_item.nco_name + '</b>';
					l_str_b = '<span class="phone">' + l_one_item.nco_phone + '</span>';
					l_str_c = '<span class="doc">' + l_one_item.doc_type + ' ' + l_one_item.doc_number + ' ' + l_one_item.doc_issue + ' ' + l_one_item.doc_date + '</span>';
					l_str_d = '<span class="addr">' + l_one_item.country + ' ' + l_one_item.state + ' ' + l_one_item.city + ' ' + l_one_item.street + ' ' + l_one_item.build + '</span>'
					break;
			}

			if(l_image.indexOf('svg') > -1){
				var l_img = '<object type="image/svg+xml" data="' 
							+ l_image + '">Your browser does not support SVG</object>';
			}else{
				var l_img = '<img src="' 
							+ l_image + '" />';
			}

			l_elements_string += '<div ' + l_item_properties + ' class="item ' + l_classes + '" >\
				<div class="grid-a">\
					<div class="grid-a-left">\
						<div class="avatar">' + l_img + '</div>\
					</div>\
					<div class="grid-a-right">\
						<div class="str-a">' + l_str_a + '</div>\
						<div class="str-b">' + l_str_b + '</div>\
						<div class="str-c">' + l_str_c + '</div>\
						<div class="str-d">' + l_str_d + '</div>\
					</div>\
					<div class="grid-b">\
						<div class="extra">' + l_extra + '</div>\
					</div>\
					<div class="grid-c">\
						<div class="right-block">' + l_label + '</div>\
					</div>\
				</div>\
			</div>';
		});

		self.events();

		LIST_OF_ITEM.load = 0;

		return l_elements_string;

		// if(p_reinit){
		// 	$(p_selector_list).append(l_elements_string);
		// }else{
		// 	$(p_selector_list).html(l_elements_string);
		// }
	},
	build_item: function(p_reinit, p_back_to, p_item){
		var self = this;
		var l_elements_string = '';
	},
	concat_omit_doubles: function(p_json_target, p_json_addings){
		$.each(p_json_addings[0], function(i, l_adds_item) {
			l_dbl = 0;
			$.each(p_json_target, function(e, l_list_item){
				if(l_list_item.id == l_adds_item.id){
					p_json_addings[0].splice(i, 1);
					return false;
				}
			});
		});
		// p_json_target = p_json_target.concat(p_json_addings);
		console.log(p_json_addings);
		return p_json_addings;
	},
	events: function(){

		$('body').on('click', '.nco_to_set', function(){
			var l_type = $('#nco-page .ui-icon-back').attr('p_type');
			var l_id = $('#nco-page .ui-icon-back').attr('p_id');
			var l_nco = $(this).attr('n_id');
			$.get(mainURL + '/nco_choice.php', { type: l_type, id: l_id, nco: l_nco }, function(p_result){
				if( p_result.indexOf('status') > -1 ){
					var l_result = $.parseJSON(p_result);

					switch(l_result[1].status){
						case '1':
							console.log(l_result[1].status);
						break;
						case '2':
							$('.nco_choosen').html(LOCALE_ARRAY_ADDITIONAL.nco_accepted[CURRENT_LANG]);
							$('.nco_choosen').show();
							$('.list-nco-btn').hide();
							$('.ngo_bids_list_label').hide();
							$('.ngo_bids_list').hide();
						break;
					}
				}
				message_result(p_result);
				$.mobile.navigate($('#nco-page .ui-icon-back').prop('href'));
			});
		});

	},
}

/*var FILTERS = {
	activated: 0,
	searched_string: "",
	serched_sphere: "",
	start_date: "",
	finish_date: "",
	searched_priority: [],
	sort_by: "",
	filtered_array: [],
	easy_filtering: function(must_return){
		var self = this;
		if(self.activated == 1){
			self.middle_filtering(0);
		}else{
			var filter_element;
			self.searched_string = $('#votings-page #searched_string').val();
			self.filtered_array = [];
			if(self.searched_string != ""){
				jQuery.each(VOTINGS.votings_array, function(i, one_voting) {
					if(one_voting.name.toUpperCase().indexOf(self.searched_string.toUpperCase()) > -1 || String(one_voting.id).indexOf(self.searched_string) > -1){
						self.filtered_array[self.filtered_array.length] = one_voting;
					}
				});
			}else{
				self.filtered_array = VOTINGS.votings_array;
			}
			
			self.sort_elements('must_return');

		 	VOTINGS.build_elements(1);
		}			

	},
	sort_elements: function(must_return){
		var self = this;
		if(self.filtered_array.length == 0 && !must_return){
			self.filtered_array = VOTINGS.votings_array;
		}
		
		if(self.sort_by != $('#votings-page [name=sort]').val()){
			self.sort_by = $('#votings-page [name=sort]').val();
		}

		switch(self.sort_by){
			case "Sort by newest":
				var temp_array = [];
				for (var i = 0; i < VOTINGS.votings_array.length; i++) {
					for (var j = 0; j < self.filtered_array.length; j++) {
						if(self.filtered_array[j] == VOTINGS.votings_array[i]){
							temp_array[temp_array.length] = self.filtered_array[j];
						}						
					}
				}
				self.filtered_array = temp_array;
				var sorting_ready = 1;
				break;
			case "Sort by title":
				var filter_element = 'name';
				break;
			case "Sort by date":
				var filter_element = 'start';
				break;	
		}
		if(!sorting_ready){
			var n = self.filtered_array.length;
			for (var i = 0; i < n-1; i++){
				var min = i;
				for (var j = i+1; j < n; j++){
					if (self.filtered_array[j][filter_element] < self.filtered_array[min][filter_element]) min = j; 
				} 
			 	var temp = self.filtered_array[min]; self.filtered_array[min] = self.filtered_array[ i ]; self.filtered_array[ i ] = temp;
			 }
		}
		

		if(!must_return){
			VOTINGS.build_elements(1);
		}else{
			return self.filtered_array;
		}
	},
	activate: function(parameter){
		var self = this;
		switch(parameter){
			case 0:
				self.activated = 0;
				alert("Deactivated!");
				self.activated = 0;
				self.searched_string = "";
				self.serched_sphere = "";
				self.start_date = "";
				self.finish_date = "";
				self.searched_priority = [];
				self.easy_filtering();
				$.mobile.navigate("#votings-page");
				return 0;
				break;
			case 1:
				self.activated = 1;
				alert("Activated!");
				self.middle_filtering();
				break;
		}
	},
	middle_filtering: function(){
		var self = this;
		if(self.activated == 1){

			var filter_element;
			self.searched_string = $('#votings-page #searched_string').val();
			self.filtered_array = [];
			if(self.searched_string != ""){
				jQuery.each(VOTINGS.votings_array, function(i, one_voting) {
					if(one_voting.name.toUpperCase().indexOf(self.searched_string.toUpperCase()) > -1 || String(one_voting.id).indexOf(self.searched_string) > -1){
						self.filtered_array[self.filtered_array.length] = one_voting;
					}
				});
			}else{
				self.filtered_array = VOTINGS.votings_array;
			}
			
			self.sort_elements('must_return');

			self.start_date = $('#filter-page [name=start_year]').val() + "-" 
							+ $('#filter-page [name=start_month]').val() + "-" 
							+ $('#filter-page [name=start_date]').val();
			self.end_date = $('#filter-page [name=end_year]').val() + "-" 
						+ $('#filter-page [name=end_month]').val() + "-" 
						+ $('#filter-page [name=end_date]').val();
			var half_filtered_array = self.filtered_array;

			//console.log('half_filtered');
			//console.log(half_filtered_array);
			self.filtered_array = [];
			
			jQuery.each(half_filtered_array, function(i, one_voting) {
				if(self.start_date <= one_voting.start){
					if(self.serched_sphere >= 0){
						if(self.serched_sphere == one_voting.type){
							self.filtered_array[self.filtered_array.length] = one_voting;
							//console.log('finded');
						}
						//console.log(' half finded');
					}else{
						self.filtered_array[self.filtered_array.length] = one_voting;
						//console.log('not finded' + self.serched_sphere);
					}
				}
			});

			//console.log('full_filtered');
			//console.log(self.filtered_array);
			VOTINGS.build_elements(1);
		}
	},
	set_sphere_filter: function(sphere_type){
		var self = this;
		self.serched_sphere = sphere_type;
		$.mobile.navigate("#filter-page");
	}
};*/

function levenshtein(s1, s2, cost_ins, cost_rep, cost_del) {
	var LEVENSHTEIN_MAX_LENGTH = 1000;

	cost_ins = 1;
	cost_rep = 1;
	cost_del = 1;

	if (s1 == s2) {
		return 0;
	}

	var l1 = s1.length;
	var l2 = s2.length;
	if (l1 === 0) {
		return l2 * cost_ins;
	}
	if (l2 === 0) {
		return l1 * cost_del;
	}


	// BEGIN STATIC
	var split = false;
	try {
		split = !('0')[0];
	} catch (e) {
		// Earlier IE may not support access by string index
		split = true;
	}
	// END STATIC
	if (split) {
		s1 = s1.split('');
		s2 = s2.split('');
	}

	var p1 = new Array(l2 + 1);
	var p2 = new Array(l2 + 1);

	var i1, i2, c0, c1, c2, tmp;
	for (i2 = 0; i2 <= l2; i2++) {
		p1[i2] = i2 * cost_ins;
	}
	for (i1 = 0; i1 < l1 ; i1++) {
		p2[0] = p1[0] + cost_del;
		
		for (i2 = 0; i2 < l2; i2++) {
		c0 = p1[i2] + ((s1[i1] == s2[i2]) ? 0 : cost_rep);
		c1 = p1[i2 + 1] + cost_del;
		
		if (c1 < c0) {
			c0 = c1;
		}
		
		c2 = p2[i2] + cost_ins;
		
		if (c2 < c0) {
			c0 = c2;
		}
		
		p2[i2 + 1] = c0;
		}
		
		tmp = p1;
		p1 = p2;
		p2 = tmp;
	}
	c0 = p1[l2];
	return c0;
}

function change_nan(number){
	if(isNaN(number)){
		number = 0;
	}
	return number;
}

//console.log(window.location.toString());

(function($){
	$(function(){

		if(location.href.search(/m=[\w&id=]+/i) > -1){
			var matches = location.href.match(/m=[\w&id=]+/i);
			$.ajax({
				url: mainURL + '/l/index.php?' + matches[0],
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					auth(true);
					$.mobile.navigate("#news-page");
					//console.log('ok');
				},
			});
		}

		//NAVIGATION EVENTS:

		//MAIN MENU:neighborhoods
		$('.menu-neighborhoods').click(function(){
			VOTINGS.neighborhoods = 1;
			$.mobile.changePage('#loading'); //remove after votings will be as standard list
			$('#map').remove();
			$('#votings-page .right_col').html('');
			$('#votings-page .right_col').append('<div class="right_menu"><a id="btn_map" class="ui-btn btn_inline ui-corner-all">' + LOCALE_ARRAY_ADDITIONAL.nh_btn_map[CURRENT_LANG] + '</a><a id="btn_info" class="ui-btn btn_inline ui-corner-all">' + LOCALE_ARRAY_ADDITIONAL.nh_btn_info[CURRENT_LANG] + '</a></div><div class="right_field"><div id="nh_info">' + LOCALE_ARRAY_ADDITIONAL.nh_info[CURRENT_LANG] + '</div><div id="map"></div></div>');
			RIGHT_COL.events();
			MAP.marks_list = [];
			MAP.marks_last_item = 0;
			MAP.nh = 1;
			MAP.marks_url = '/map_neighborhoods.php';
			MAP.init();
			$.mobile.navigate('#votings-page?&nh=1');
			//RIGHT_COL.menu(1);
		});

		//MAIN MENU:votings
		$('.menu-votings').click(function(){
			VOTINGS.neighborhoods = 0;
			$.mobile.changePage('#loading'); //remove after votings will be as standard list
			$('#map').remove();
			$('#votings-page .right_col').html(LOCALE_ARRAY_ADDITIONAL.right_col_votings_page[CURRENT_LANG]);

			$.mobile.navigate('#votings-page');
			RIGHT_COL.menu(2);
		});

		//Global back_btn intercept
		$(document).on('click', '.back_btn', function(e){
			$.mobile.navigate($(this).attr('back_url'));
		});

		//social-entrepreneurship navigation
		$('#social-entrepreneurship .menu-icon-projects').click(function(){
			$('#projects_list_back').attr('back_url', '#social-entrepreneurship');
			$.mobile.navigate('#projects-page'); 
		});

		//My activities navigation
		$('#my-activities-page .icon-projects').click(function(){
			$('#projects_list_back').attr('back_url', '#my-activities-page');
			$.mobile.navigate('#projects-page?my_project=true'); 
		});


		$(document).on('click', '.swiper', function(e){
			COMMON_OBJECT.custom_swipe(this);
		});

		function init(){
			if(readCookie("lang")){
				$('#select-lang2 > option[value="' + readCookie("lang") + '"]').attr('selected', 'selected');
				$('#select-lang > option[value="' + readCookie("lang") + '"]').attr('selected', 'selected');
			}
			$("#select-lang2").change(function(){
				var new_lang = $(this).find("option:selected").val();
				createCookie("lang", new_lang);
				$('#select-lang2 > option[value="' + new_lang + '"]').attr('selected', 'selected');
				$('#lang label').attr('lang', new_lang);
				$('#lang label').html($('#lang label').data(new_lang));
			 /*jQuery.each(LOCALE_ARRAY, function(i, one_element) {
					if($(one_element['selector'])){
						if(one_element['value']){
							$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
						}else{
							$(one_element['selector']).html(one_element[CURRENT_LANG]);
						}
							
					}
				});*/
				lang_activate_el(new_lang);
			});
			$("#select-lang").change(function(){
				var new_lang = $(this).find("option:selected").val();
				createCookie("lang", new_lang);
				$('#select-lang > option[value="' + new_lang + '"]').attr('selected', 'selected');
				$('#lang label').attr('lang', new_lang);
				$('#lang label').html($('#lang label').data(new_lang));
			 /* jQuery.each(LOCALE_ARRAY, function(i, one_element) {
					if($(one_element['selector'])){
						if(one_element['value']){
							$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
						}else{
							$(one_element['selector']).html(one_element[CURRENT_LANG]);
						}							
					}
				});*/
				lang_activate_el(new_lang);
			});

			//lang_activate_el("body");
			$.ajax({
				url: mainURL + "/profile.php",
				type:"GET",
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(response){
					var data = response.responseText;
					PROFILE.profile_obj = jQuery.parseJSON(data)[0];
					if(jQuery.parseJSON(data)[0] && data.indexOf('error') == -1){
						auth(true);
						if(( location.href.indexOf('#edit-address') > -1 || 
							 location.href.indexOf('#address-item-1') > -1 ||
							 location.href.indexOf('#address-item-2') > -1 ||
							 location.href.indexOf('#address-item-3') > -1 ) && SUPER_PROFILE.auth == true){
							if(ADRESS){
								ADRESS.init();
							}
						}
					}
					else{
						auth(false);
					}					
				}
			});
		}

		init();

		function auth(turn){
			if(turn){
				PROFILE.auth = true;
				SUPER_PROFILE.auth = true;
				PROFILE.getProfile();
				//TRUST_LIST.init();
				set_unset_links(1, '.menu-icon-activities', '#my-activities-page');
				set_unset_links(1, '.menu-icon-options', '#options-page');
				set_unset_links(1, '[data-link=#trust-list]');
				SOCIAL.init();
				SOCIAL.listener();

				if(PROFILE.nco == 1){
					$('.ngo_filter').show();
				}else{
					$('.ngo_filter').hide();
				}

			}else{
				PROFILE.auth = false;
				SUPER_PROFILE.auth = false;
				PROFILE.updateMenu();
				set_unset_links(0, '.menu-icon-activities');
				set_unset_links(0, '.menu-icon-options');
				set_unset_links(0, '[data-link=#trust-list]');
				$('.ngo_filter').hide();

			}			
		}

		$(document).on('click', '#btn_save_new_pass', function(e){
			var l_pass = $('#reset-password input[name=new_password1]').val();

			if(l_pass.length > 5 && $('#reset-password input[name=new_password1]').val() == $('#reset-password input[name=new_password2]').val()){
				if(location.href.indexOf('#reset-password?verification_code=') > -1){
					var l_hash_param = location.href.match(/verification_code=[0-9a-fA-F]{40}/i);
					var l_hash_array = l_hash_param[0].match(/[0-9a-fA-F]{40}/i);
					var l_hash = l_hash_array[0];

					$.ajax({
						url: mainURL + "/user_pass_reset.php",
						type: "POST",
						data: {"hash": l_hash, "pass": l_pass},
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						},
						complete: function(l_response){
							console.log(l_response.responseText);
							message_result(l_response.responseText);
							$.mobile.navigate("#");
						}
					});
				}
			}
		});

		function set_unset_links(parameter, selector, href){
			switch(parameter){
				case 0:
					$(selector).removeAttr("href");
					$(selector).on("click", function(){
						alert(LOCALE_ARRAY_ADDITIONAL.please_register[CURRENT_LANG]);
					});
					break;
				case 1:
					var links_array = $(selector);					
					for(var i = 0; i < links_array.length; i++){
						if($(links_array[i]).data('link')){
							$(links_array[i]).attr('href', $(links_array[i]).data('link'));							
						}else{
							$(links_array[i]).attr('href', href);
						}
						$(links_array[i]).off("click");						
					}
					//console.log('fuck');
					break;
			}
		}

		function prepare_avatar(event){
			if(event.target.files.length > 1){
				alert(LOCALE_ARRAY_ADDITIONAL.choose_only_one_avatar[CURRENT_LANG]);
			}else{
				if((event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') && event.target.files[0].size < 150000){
					FILE = event.target.files[0];
					//console.log('format:' + event.target.files[0].type);
					//console.log('size:' + event.target.files[0].size );
				}else{
					//console.log('format:' + event.target.files[0].type);
					//console.log('size:' + event.target.files[0].size );
					alert(LOCALE_ARRAY_ADDITIONAL.bad_format_or_size[CURRENT_LANG]);
				}
			}
			///////////////////////////////
			var client = new XMLHttpRequest();

			 function upload() 
			 {
				//var file = document.getElementById("uploadfile");
				 
				var formData = new FormData();
				formData.append("av", FILE);
				client.open("post", mainURL + "/i/up.php", true);
				client.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
				client.setRequestHeader("Content-Type", "multipart/form-data");
				client.send(formData);/* Send to server */ 
			 }
				 
			 client.onreadycountychange = function() 
			 {
				if (client.readyState == 4 && client.status == 200) 
				{
					console.log("send ok");
					 //alert(client.statusText);
				}
			 }
			 upload();
		}

		function prepare_form(event){
			if(event.target.files.length > 1){
				alert(LOCALE_ARRAY_ADDITIONAL.choose_only_one_avatar[CURRENT_LANG]);
			}else{
				if((event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png')){
					FILE = event.target.files[0];
					//console.log('format:' + event.target.files[0].type);
					//console.log('size:' + event.target.files[0].size );
				}else{
					//console.log('format:' + event.target.files[0].type);
					//console.log('size:' + event.target.files[0].size );
					alert(LOCALE_ARRAY_ADDITIONAL.bad_format_or_size[CURRENT_LANG]);
				}
			}
			///////////////////////////////
			var client = new XMLHttpRequest();

			function upload(){
				//var file = document.getElementById("uploadfile");
				 
				/* Create a FormData instance */
				var formData = new FormData();
				/* Add the file */ 
				formData.append("av", FILE);

				client.open("post", mainURL + "/l/index.php?m=2", true);
				client.setRequestHeader("Content-Type", "multipart/form-data");
				client.send(formData);/* Send to server */ 
			 }
				 
			 /* Check the response status */
			 client.onreadystatechange = function(){
				if (client.readyState == 4 && client.status == 200){
					console.log("send ok");
					//alert(client.statusText);
				}
			 }
			 upload();
		}

		$("#login-form").submit(function(){
			var form = $(this);
			var login = $(form).find("[name=login]").val();
			var pass = $(form).find("[name=pass]").val();
			var remember = $(form).find("[name=remember]").prop("checked")?'1':'0';
			var data = {
				login:'1',
				user_name:login,
				user_password:pass,
				user_rememberme:remember
			};
			$.ajax({
				url: mainURL + "/l/index.php?m=0",
				type: "POST",
				data: data,
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(data){
					if(data.responseText.indexOf("You are logged")!==-1){
						$.mobile.navigate("#profile-page");
						auth(true);
					}else{
						alert(LOCALE_ARRAY_ADDITIONAL.wrong_password_or_username[CURRENT_LANG]);
					}/*else{
						alert("Network error!");
					}*/
				}
			});
			return false;
		});

		$("#forgot-password .ui-btn-right").click(function(){
			$("#forgot-password form").submit();
		});

		$("#forgot-password form").submit(function(){
			var l_email = $('input[name=forgot-password-e-mail]').val();
			var l_data = {
				email:l_email,
				request_password_reset: "Reset my password"
			}
			$.ajax({
				url: mainURL + "/l/index.php?m=3",
				type: "POST",
				data: l_data,
				xhrFields: {
					withCredentials: true
				},
				complete: function(data){
					var resp = data.responseText;
					if(resp.indexOf("This user does not exist")!==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.user_does_not_exist[CURRENT_LANG]);
					}
					else if(resp.indexOf("Password reset mail successfully sent!")!==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.password_reset_successfully_sent[CURRENT_LANG]);
						$.mobile.navigate("#main-page");
					}

				}
			});
			return false;
		});

		$("#register-form").submit(function(){
			var user_name = $(this).find("[name=username]").val();
			var user_email = $(this).find("[name=email]").val();
			var fn = $(this).find("[name=firstname]").val();
			var ln = $(this).find("[name=lastname]").val();
			var db = $("#register-form").find("[name=year]").val() + "-" + 
					 $("#register-form").find("[name=month]").val() + "-" + 
					 $("#register-form").find("[name=day]").val();
			if($('#register-form #male').hasClass('ui-radio-on')){
				var g = 0;
			}else{
				var g = 1;
			}
			var user_password_new = $(this).find("[name=password]").val();
			var user_password_repeat = $(this).find("[name=password_r]").val();
			var captcha = $(this).find("[name=captcha]").val();
			var data = {
				user_name : user_name,
				user_email : user_email,
				user_password_new : user_password_new,
				fn : fn,
				ln : ln,
				db : db,
				g : g,
				user_password_repeat : user_password_repeat,
				captcha : captcha,
				register : "Register"
				}

			$.ajax({
				url: mainURL + "/l/index.php?m=1",
				type: "POST",
				data: data,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data){
					var resp = data.responseText;
					if(resp.indexOf("Captcha was wrong!")!==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.wrong_captcha[CURRENT_LANG]);
						update_img("#register-form .captcha img", mainURL + "/l/tools/showCaptcha.php");
					}
					if(resp.indexOf("This email address is already registered") !==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.email_already_registered[CURRENT_LANG]);
					}
					if(resp.indexOf("Sorry, that username is already taken") !==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.login_already_registered[CURRENT_LANG]);
					}
					if(resp.indexOf("Please click the VERIFICATION LINK within that mail.")!==-1){
						alert(LOCALE_ARRAY_ADDITIONAL.account_created[CURRENT_LANG]);
						$.mobile.navigate("#main-page");
					}

				}
			});
			return false;
		});

		function update_img(selector,url){
			if(!url){
				var url = $(selector).attr("src");
			}
			$(selector).attr("src", url+"?timestamp=" + new Date().getTime());
		}

        $('.chart').on('click', function(){
            $(this).find('.info').toggleClass('animated');
        })

	})
})(jQuery);

(function(){

	var matcher = /\s*(?:((?:(?:\\\.|[^.,])+\.?)+)\s*([!~><=]=|[><])\s*("|')?((?:\\\3|.)*?)\3|(.+?))\s*(?:,|$)/g;

	function resolve(element, data) {

		data = data.match(/(?:\\\.|[^.])+(?=\.|$)/g);

		var cur = jQuery.data(element)[data.shift()];

		while (cur && data[0]) {
			cur = cur[data.shift()];
		}

		return cur || undefined;

	}

	jQuery.expr[':'].data = function(el, i, match) {

		matcher.lastIndex = 0;

		var expr = match[3],
			m,
			check, val,
			allMatch = null,
			foundMatch = false;

		while (m = matcher.exec(expr)) {

			check = m[4];
			val = resolve(el, m[1] || m[5]);

			switch (m[2]) {
				case '==': foundMatch = val == check; break;
				case '!=': foundMatch = val != check; break;
				case '<=': foundMatch = val <= check; break;
				case '>=': foundMatch = val >= check; break;
				case '~=': foundMatch = RegExp(check).test(val); break;
				case '>': foundMatch = val > check; break;
				case '<': foundMatch = val < check; break;
				default: if (m[5]) foundMatch = !!val;
			}

			allMatch = allMatch === null ? foundMatch : allMatch && foundMatch;

		}

		return allMatch;

	};

}());