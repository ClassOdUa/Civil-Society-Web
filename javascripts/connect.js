var DEFAULT_LANG = "en";
var CURRENT_LANG = false;
var FILE;
var UI_STATE_DIALOG = 0;

$.mobile.defaultPageTransition = 'none';

function lang_activate_el(element){
    var lang = false;
    if(!CURRENT_LANG){
    	if(readCookie("lang")){
        	CURRENT_LANG = readCookie("lang");
        }else{
        	CURRENT_LANG = DEFAULT_LANG;
        }
    }
    if(element == "ua" || element == "ru" || element == "en"){
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
    /*$(element).find(":data("+lang+"),[data-"+lang+"]").each(function(){

    	
        $(this).html($(this).data(lang));
        $(this).attr("lang",lang);
    });
    $(element).find(":data(ph"+lang+"),[data-sl"+lang+"]").each(function(){
        var placeholder = $(this).data("ph"+lang);
        $(this).attr("placeholder",placeholder);
        $(this).attr("lang",lang);
    });
    $(element).find(":data(sl"+lang+"),[data-sl"+lang+"]").each(function(){
        var value = $(this).data("sl"+lang);
        console.log(value);
        $(this).parent().find("span").html(value);
        $(this).parent().find("span").html(value);
    });*/

}

window.onload = function(){
	lang_activate_el();
	setTimeout(function(){

		jQuery.each(LOCALE_ARRAY, function(i, one_element) {
			if($(one_element['selector'])){
				if(one_element['value']){
					$(one_element['selector']).attr(one_element['value'], one_element[CURRENT_LANG]);
				}else{
					$(one_element['selector']).html(one_element[CURRENT_LANG]);
				}
					
			}
	    });
		if( (location.href.indexOf('#spheres-address') > -1 ||
			 location.href.indexOf('#spheres-trust') > -1 ||
			 location.href.indexOf('#spheres-create-vote') > -1 ||
			 location.href.indexOf('#spheres-trust-vote') > -1 ||
			 location.href.indexOf('#spheres-filters') > -1)){
				SPHERES.initial();
		}

		$('#profile-page .avatar').click(function(){
			$('#profile-page [name=picture]').click();
		});

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
			VOTINGS.init();
		}

		if((location.href.indexOf('#my-votings-page') > -1 || location.href.indexOf('#my-vote-page?vote=') > -1) && SUPER_PROFILE.auth == true){
			MY_VOTINGS.init();
		}

		if(location.href.indexOf('#weighted-votings-page') > -1 || location.href.indexOf('#weighted-vote-page?vote=') > -1){
			WEIGHTED_VOTINGS.init();
		}

		if(location.href.indexOf('#news-page') > -1){
			console.log('load news');
			NEWS.init();
		}

		if(location.href.indexOf('#programs-page') > -1){
			console.log('load programs');
			PROGRAMS.init();
		}

		if(location.href.indexOf('#projects-page') > -1){
			console.log('load projects');
			PROJECTS.init();
		}

		if(location.href.indexOf('#requests-page') > -1){
			console.log('load requests');
			REQUESTS.init();
		}

		if(location.href.indexOf('#create-item-nko-page') > -1){
			nko_create_page_data();
		}

		if(location.href.indexOf('#my-fund-page') > -1){
			console.log('load fund');
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
			  location.href.indexOf('#history-page') > -1 ||
			  location.href.indexOf('#voters-page') > -1 ||
			  location.href.indexOf('#profile-page') > -1 ||
			  location.href.indexOf('#my-votings-page') > -1 ||
			  location.href.indexOf('#programs-page?my_program=true') > -1 ||
			  location.href.indexOf('#projects-page?my_project_propositions=true') > -1 ||
			  location.href.indexOf('#weighted-votings-page?my=1') > -1 ||
			  location.href.indexOf('#weighted-votings-page?my=2') > -1 ||
			  location.href.indexOf('#projects-page?my_project=true') > -1 ||
			  location.href.indexOf('#requests-page?my_request=true') > -1 ||
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
				console.log('checkbpx off');
				$('#trust-list input[name=trusted_checkbox]').checkboxradio().prop('checked', true).checkboxradio( 'refresh' );
				TRUST_LIST.init(false, 'p_s');
			}
		}

		if(( location.href.indexOf('#edit-address') > -1 || 
			 location.href.indexOf('#address-item-1') > -1 ||
			 location.href.indexOf('#address-item-2') > -1 ||
			 location.href.indexOf('#address-item-3') > -1 ) && SUPER_PROFILE.auth == true){
			if(ADRESS){
				ADRESS.init();
			}
		}

		if(location.href.indexOf('#create-vote') > -1 && SUPER_PROFILE.auth == true){
			set_dates_range('#create-vote [name=s_time_date]', '#create-vote [name=s_time_month]', '#create-vote [name=s_time_year]', new Date().getFullYear(), 2, "current");
			set_dates_range('#create-vote [name=f_time_date]', '#create-vote [name=f_time_month]', '#create-vote [name=f_time_year]', new Date().getFullYear(), 2, "current");
		}

		if(location.href.indexOf('#registration') > -1){
			$("#captcha").attr("src", "http://gurtom.mobi/l/tools/showCaptcha.php");
		}
	}, 300);

	//PIF.get_pif_array();

	$('#picture_form').ajaxForm({url: 'http://gurtom.mobi/i/up.php', type: 'post', success: function(response) {
		$.ajax({
			url:"http://gurtom.mobi/profile.php",
			type:"GET",
	        crossDomain: true,
			xhrFields: {
		       withCredentials: true
	    },
        complete: function(response){
        	var data = response.responseText;
        	if(data.indexOf('File is larger than the specified amount set') > -1){
        		alert(LOCALE_ARRAY_ADDITIONAL.bad_size[CURRENT_LANG]);
        	}else{
        		var profile_obj = jQuery.parseJSON(data)[0];
	            $('#profile-page #avatar').attr('src', 'http://' + profile_obj.avatar);
	        	console.log('http://gurtom.mobi/' + profile_obj.avatar);
        	}			            
        }});
    }});



	$('#picture_form_create_vote').ajaxForm({url: 'http://gurtom.mobi/i/up.php', type: 'post', success: function(response) {
		var error = 0;
		if(response){
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
		}
		if($('#create-vote [name=name]').val() == "" && error != 1){
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
		if($('#create-vote [name=sph]').val() == "" && error != 1){
			alert(LOCALE_ARRAY_ADDITIONAL.please_enter_sphere_voting[CURRENT_LANG]);
			error = 1;
		}
		if(error != 1){
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

		    $.ajax({
				url: "http://gurtom.mobi/mc_add.php",
		        type: "POST",
		        data: {"img": img,
		    		   "sph": $('#create-vote [name=sph]').val(),
		    		   "name": $('#create-vote [name=name]').val(),
		    		   "s_time": start_date,
		    		   "f_time": end_date, 
		    		   "descr": $('#create-vote [name=descr]').val(),
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
		        	var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	alert(LOCALE_ARRAY_ADDITIONAL.voting_created[CURRENT_LANG]);
		        	$.mobile.navigate("#vote-page?vote=" + id);
		        	//console.log("saved ok, id = " + id);
		            //alert('okay');
		        }
			});

	        console.log('http://gurtom.mobi' + response.responseText);
		}
	    
    }});

    $('#additional_photo_form').ajaxForm({url: 'http://gurtom.mobi/i/up.php', type: 'post', success: function(response) {
		var error = 0;
		if(response){
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
		}

		if(error == 0){
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
		}    
    }}); 

	$('#create-vote #img').click(function(){
		$('#create-vote [name=picture]').click();
	});

	if(location.href.indexOf('network_status=EmailNotMuch') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.email_not_much[CURRENT_LANG]);
	}
	if(location.href.indexOf('network_status=NotAuth') > -1){
		alert(LOCALE_ARRAY_ADDITIONAL.not_auth[CURRENT_LANG]);
	}
	PROGRAMS.check_nko_page();
	PROJECTS.check_nko_page();
	REQUESTS.check_nko_page();
	PROGRAMS.check_current_url();
	PROJECTS.check_current_url();
	REQUESTS.check_current_url();
	PROGRAMS.build_history_page();
	PROJECTS.build_history_page();
	REQUESTS.build_history_page();
	CREATE_ITEM.check_item();

	try{
		$('#lang label').attr('lang', CURRENT_LANG);
	    $('#lang label').html($('#lang label').data(CURRENT_LANG));
		$('#select-lang').selectmenu("refresh", true);
	}catch(e){
		console.log('exception catched, all ok');
	}
};

window.onhashchange = function(){
	lang_activate_el();
	if(UI_STATE_DIALOG == 0 && location.href.indexOf('ui-state=dialog') > -1){
		UI_STATE_DIALOG = 1;
	}

	if( ( location.href.indexOf('#trust-list') > -1 ||
		  location.href.indexOf('#create-item') > -1 ||
		  location.href.indexOf('#create-vote') > -1 ||
		  location.href.indexOf('#my-fund-page') > -1 ||
		  location.href.indexOf('#history-page') > -1 ||
		  location.href.indexOf('#voters-page') > -1 ||
		  location.href.indexOf('#profile-page') > -1 ||
		  location.href.indexOf('#my-votings-page') > -1 ||
		  location.href.indexOf('#programs-page?my_program=true') > -1 ||
		  location.href.indexOf('#projects-page?my_project_propositions=true') > -1 ||
		  location.href.indexOf('#weighted-votings-page?my=1') > -1 ||
		  location.href.indexOf('#weighted-votings-page?my=2') > -1 ||
		  location.href.indexOf('#projects-page?my_project=true') > -1 ||
		  location.href.indexOf('#requests-page?my_request=true') > -1 ||
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

	if(location.href.indexOf('#votings-page') > -1 
		&& VOTINGS.activated_hard_filter != 1
		&& VOTINGS.activated_easy_filter != 1){
		VOTINGS.init();
	}

	if(location.href.indexOf('#my-votings-page') > -1 && SUPER_PROFILE.auth == true){
		MY_VOTINGS.init();
	}

	if(location.href.indexOf('#news-page') > -1){
		NEWS.init();
	}

	if(location.href.indexOf('#programs-page') > -1
		&& PROGRAMS.activated_hard_filter != 1
		&& PROGRAMS.activated_easy_filter != 1){
		console.log('load programs');
		PROGRAMS.init();
	}

	if(location.href.indexOf('#projects-page') > -1
		&& PROJECTS.activated_hard_filter != 1
		&& PROJECTS.activated_easy_filter != 1){
		console.log('load projects');
		PROJECTS.init();
	}

	if(location.href.indexOf('#requests-page') > -1
		&& REQUESTS.activated_hard_filter != 1
		&& REQUESTS.activated_easy_filter != 1){
		console.log('load requests');
		REQUESTS.init();
	}

	if(location.href.indexOf('#my-fund-page') > -1 && location.href.indexOf('&ui-state=dialog') == -1){
			console.log('load fund');
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
	}

	if(location.href.indexOf('#trust-list') > -1 && SUPER_PROFILE.auth == true){
		if(!$('#trusted_checkbox').hasClass('ui-checkbox-on')){
			console.log('checkbpx off');
			$('#trust-list input[name=trusted_checkbox]').checkboxradio().prop('checked', true).checkboxradio( 'refresh' );
			TRUST_LIST.init(false, 'p_s');
		}
	}

	if(( location.href.indexOf('#edit-address') > -1 || 
		 location.href.indexOf('#address-item-1') > -1 ||
		 location.href.indexOf('#address-item-2') > -1 ||
		 location.href.indexOf('#address-item-3') > -1 )  && SUPER_PROFILE.auth == true){
		if(ADRESS){
			ADRESS.init();
		}
	}


	if(location.href.indexOf('#create-vote') > -1 && SUPER_PROFILE.auth == true){
		set_dates_range('#create-vote [name=s_time_date]', '#create-vote [name=s_time_month]', '#create-vote [name=s_time_year]', new Date().getFullYear(), 2, "current");
		set_dates_range('#create-vote [name=f_time_date]', '#create-vote [name=f_time_month]', '#create-vote [name=f_time_year]', new Date().getFullYear(), 2, "current");
	}
	/*if(location.href.indexOf('#filter-page') > -1 && SUPER_PROFILE.auth == true){
		set_dates_range('#filter-page [name=start_date]', '#filter-page [name=start_month]', '#filter-page [name=start_year]', 1990, 2, 'current');
		set_dates_range('#filter-page [name=end_date]', '#filter-page [name=end_month]', '#filter-page [name=end_year]', 1990, 2, 'current');
	}*/
	

	if(location.href.indexOf('#profile-page') > -1 && SUPER_PROFILE.auth == true){
		switch(SUPER_PROFILE.gender){
			case "0":
				$('#profile-page #male').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
				break;
			case "1":
				$('#profile-page #female').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
				break;
		}
	}

	if(location.href.indexOf('#registration') > -1){
		$("#captcha").attr("src", "http://gurtom.mobi/l/tools/showCaptcha.php");
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

	VOTINGS.check_current_url(0);
	MY_VOTINGS.check_current_url(0);
	WEIGHTED_VOTINGS.init();
	PROGRAMS.check_current_url(0);
	PROJECTS.check_current_url(0);
	REQUESTS.check_current_url(0);
	PROGRAMS.check_nko_page();
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

/*function lang_activate(lang){
	CURRENT_LANG = lang;
 	createCookie("lang",lang);
 	lang_activate_el("body");
    }*/

function createCookie(name, value, days) {
                var expires;

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
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
	var answer = confirm('Only registred Useres are able to use this function. Do you want to proceed with registration?');
	if(answer){
		$.mobile.navigate('#');
	}else{
		$.mobile.navigate('#news-page');
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
		current_month = new Date().getMonth()+1;
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
	  	url: "http://gurtom.mobi/nco.php",
	  	type: "GET",
	  	xhrFields: {
       		withCredentials: true
      	},
     	crossDomain: true,
	  	complete: function( response ){
	  		data_for_build =  JSON.parse( response.responseText );

	  		var nko_parts = '';
			jQuery.each(data_for_build, function(i, one_nko) {
				nko_parts += '<li>\
			                    <div onclick = "$(\'#create-item [name=nco]\').val(' + one_nko.id + '); $.mobile.navigate(\'#create-item\')" class="ui-checkbox">\
			                        <label class="ui-btn ui-btn-icon-left ui-checkbox-off"></label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                    </div>\
			                    <div>\
			                        <strong>' + one_nko.nco_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.nco_phone + '</span><span class="doc">' + one_nko.doc_type + ' ' + one_nko.doc_series + ' ' + one_nko.doc_number + ' ' + one_nko.doc_date + '</span><span class="addr">' + one_nko.address_type + ' ' + one_nko.street + ',' + one_nko.city + ',' + one_nko.county + ', дом ' + one_nko.build + ', каб. ' + one_nko.ap + '</span>\
			                    </div>\
			                </li>\ '; 
			});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						        <h1>\
						            Список НКО\
						        </h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
						        <div id="project-nko-help" class="help-popup" data-role="popup" data-history="false">\
						            <div class="title">\
						                Description\
						            </div>\
						            <div class="text">\
						                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
						            </div>\
						        </div>\
						    </div>\
						    <div role="main" class="ui-content">\
						        <div class="select-nko-wrap">\
						            <div class="title">\
						                Выберете <strong>НКО</strong> из текущих предложений:\
						            </div>\
						            <ol>' + nko_parts + '\
						            </ol>\
						        </div>\
						    </div>';
			$('#create-item-nko-page').html( ui_string ).enhanceWithin();
	  	}
	});
}

var COMMON_OBJECT = {
	init_common_listeners: function(){
			window.addEventListener("scroll", function(){
				if(location.href.indexOf('#votings-page') > -1){
					
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	VOTINGS.reinit();
			      	}
			      	
				}else if(location.href.indexOf('#news-page') > -1){
					
					//$(window).scroll(function(){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	NEWS.reinit();
			      	}
			      		
				}else if(location.href.indexOf('#trust-list') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	TRUST_LIST.reinit();
			      	}
				}else if(location.href.indexOf('#my-votings-page') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	MY_VOTINGS.reinit();
			      	}
				}else if(location.href.indexOf('#programs-page') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	PROGRAMS.reinit();
			      	}
				}else if(location.href.indexOf('#projects-page') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	PROJECTS.reinit();
			      	}
				}else if(location.href.indexOf('#requests-page') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	REQUESTS.reinit();
			      	}
				}else if(location.href.indexOf('#weighted-votings-page') > -1){
					if( $(window).scrollTop() == $(document).height() - $(window).height()){
			          	WEIGHTED_VOTINGS.reinit();
			      	}
				}
			});	
	},
	custom_swipe: function(object){
		console.log($(object).data('show'));
		switch($(object).data('show')){
			/*case 0:
			console.log(2);
				$.mobile.activePage.find('.filters-panel').find('.filters-panel-inner').attr('style', 'display: none');
				$(object).html('Filter');
				$(object).data('show', 1);
				break;*/
			case 1:
			console.log(3);
				$(object).attr('style', 'display: none');
				$.mobile.activePage.find('.filters-panel').find('.filters-panel-inner').slideDown(500);
				//$(object).html('Hide filter');
				//$(object).data('show', 0);
				break;
		}
	},
	free_callbacker: function(callback_function){
		if(callback_function){
			callback_function();
		}
	}
};

var SUPER_PROFILE = {
	auth: false,
	gender: 0,
	id: 0
};


var CREATE_ITEM = {
	check_item: function(){
		var self = this;		
		if(location.href.indexOf('#create-item?project=true') > -1){
			$('#create-item [name=type_item] option[value=4]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_project[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_project[CURRENT_LANG]);			
		}else if(location.href.indexOf('#create-item?program=true') > -1){
			$('#create-item [name=type_item] option[value=2]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_program[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_program[CURRENT_LANG]);
		}else if(location.href.indexOf('#create-item?request=true') > -1){
			$('#create-item [name=type_item] option[value=5]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_request[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_request[CURRENT_LANG]);			
		}else if(location.href.indexOf('#create-item?weighted_voting=true') > -1){
			$('#create-item [name=type_item] option[value=6]').attr('selected', true);
			$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_weighted_vote[CURRENT_LANG]);
			$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_weighted_vote[CURRENT_LANG]);
			if(location.href.indexOf('#create-item?weighted_voting=true&item=') > -1){
				var match_array = location.href.match(/item=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				$('#create-item [name=program_id]').val(object_id);
			}
		}else if(location.href.indexOf('#create-item?project_proposition=true') > -1){
			if(location.href.indexOf('#create-item?project_proposition=true&item=') > -1){
				var match_array = location.href.match(/item=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				$('#create-item [name=program_id]').val(object_id);
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
				$('#create-item #amount').attr('style', 'display: block');
				$('#create-item #curr').attr('style', 'display: block');
				$('#create-item #title_item').html(LOCALE_ARRAY_ADDITIONAL.create_program[CURRENT_LANG]);
				$('#create-item #name_item').html(LOCALE_ARRAY_ADDITIONAL.name_of_your_program[CURRENT_LANG]);
				$('#create-item .btn-nko').attr('style', 'display: block');
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
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		$.ajax({
			url: "http://gurtom.mobi/project_add.php",
	        type: "POST",
	        data: {"img": img,
	    		   "descr": $('#create-item [name=descr]').val(),
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
	        		var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	$.mobile.navigate("#project-page?project=" + id);
	        	}
	        	//$.mobile.navigate("#vote-page?vote=" + id);
	        }
		});
	},
	send_program: function(img){
		$.ajax({
			url: "http://gurtom.mobi/program_add.php",
	        type: "POST",
	        data: {"img": img,
	    		   "descr": $('#create-item [name=descr]').val(),
	    		   "title": $('#create-item [name=title ]').val(),
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
	        		var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	$.mobile.navigate("#program-page?program=" + id);
	        	}
	        	//$.mobile.navigate("#vote-page?vote=" + id);
	        }
		});
	},
	send_request: function(img){
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		$.ajax({
			url: "http://gurtom.mobi/request_add.php",
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
	        		var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	$.mobile.navigate("#request-page?request=" + id);
	        	}
	        	//$.mobile.navigate("#vote-page?vote=" + id);
	        }
		});
	},
	send_weighted_voting: function(img){
		var start = $('#create-item [name=start_year]').val() + "-" 
				 + $('#create-item [name=start_month]').val() + "-" 
				 + $('#create-item [name=start_date]').val();
		var finish = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		$.ajax({
			url: "http://gurtom.mobi/weighted_voting_add.php",
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
	        		var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	$.mobile.navigate("#weighted-vote-page?vote=" + id);
	        	}
	        	//$.mobile.navigate("#vote-page?vote=" + id);
	        }
		});
	},
	send_project_proposition: function(img){
		var dtex = $('#create-item [name=dtex_year]').val() + "-" 
				 + $('#create-item [name=dtex_month]').val() + "-" 
				 + $('#create-item [name=dtex_date]').val();
		$.ajax({
			url: "http://gurtom.mobi/project_propositions_add.php",
	        type: "POST",
	        data: {"img": img,
	    		   "descr": $('#create-item [name=descr]').val(),
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
	        		var id = JSON.parse(response.responseText);
		        	id = id[0].id;
		        	$.mobile.navigate("#project-page?project_proposition=" + id);
	        	}
	        	//$.mobile.navigate("#vote-page?vote=" + id);
	        }
		});
	}
}

var HISTORY_PAGE = {
	build_history_page: function(object_id, my_add, amount_current, amount_asking, currency_asking){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/fund_public_cf.php?type=4&id=' + object_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		var funds_list = JSON.parse( response.responseText );
		  		console.log('history');	
		  		$.mobile.loading( "hide" );

		  		var ui_funds = '';
		  		var ui_cf = '';
		  		var main_currency = PIF.get_currency_name_by_id( currency_asking );
		  		jQuery.each(funds_list, function(i, one_fund) {		  			
		    		for (var i = 0; i < one_fund.cf.length; i++) {
		    			var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
		    			ui_cf += '<tr>\
			                        <td>' + one_fund.cf[i].ts_modified + '</td>\
			                        <td>' + one_fund.cf[i].user_id + ' ' + one_fund.cf[i].fname + ' ' + one_fund.cf[i].lname + '</td>\
			                        <td><strong>' + one_fund.cf[i].saldo + '</strong> ' + currency_name + '</td>\
			                    </tr>';
		  			} 
		    	});

		    	ui_funds += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
							        <h1 class="long-title">\
							            История сбора средств\
							        </h1>\
							        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'#project-page?project=' + object_id + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-history-help">Ask</a>\
							        <div id="request-history-help" class="help-popup" data-role="popup" data-history="false">\
							            <div class="title">\
							                Description\
							            </div>\
							            <div class="text">\
							                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
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
							                         ' + main_currency + '</strong><span>Мой вклад</span>\
							                    </div>\
							                </div>\
							                <div class="ui-block-b">\
							                    <div class="amount up">\
							                        <strong>\
							                        ' + amount_current + '\
							                         ' + main_currency + '</strong><span>Собранно на данный момент</span>\
							                    </div>\
							                </div>\
							                <div class="ui-block-c">\
							                    <div class="total-amount">\
							                        <strong>\
							                        ' + amount_asking + '\
							                        ' + main_currency + '</strong><span>Нужное количество</span>\
							                    </div>\
							                </div>\
							            </div>\
							            <table>\
							                <thead>\
							                    <tr>\
							                        <td>\
							                            Дата и время\
							                        </td>\
							                        <td>\
							                            ФИО\
							                        </td>\
							                        <td>\
							                            Сумма\
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

var CREATE_VOTE = {
	file: "",
	send_data: function(){
		var self = this;

		$( "#picture_form_create_vote" ).submit();
	}
};  

var PIF = {
	pif_array: [],
	get_pif_array: function(force_get_array, callback_function ){
		var self = this;

		function temp_callback(){
			return function(){
				var ui_pif_option = '';
		  		var unique_array = [];
		  		var temp_flag = 0;		  		
		    	jQuery.each(self.pif_array, function(i, one_pif) {
		    		switch(one_pif.currency){
		    			case "1":
		    				var currency_name = "ICAN";
		    				break;
		    			case "980":
		    				var currency_name = "UAH";
		    				break;
		    			case "840":
		    				var currency_name = "USD";
		    				break;
		    			case "978":
		    				var currency_name = "EUR";
		    				break;
		    		}
		    		temp_flag = 0;
		    		for (var j = 0; j < unique_array.length; j++) {
		    			if(unique_array[j] == currency_name){
		    				temp_flag = 1;
		    			}
		    		}
		    		if(temp_flag == 0){
		    			ui_pif_option += '<option value="' + one_pif.currency + '">' + currency_name + '</option>';
		    			unique_array[unique_array.length] = currency_name;
		    		}
		    	});
		    	$('#create-item [name=curr]').html(ui_pif_option);
		    	if(location.href.indexOf('#create-item') > -1){
		    		$('#create-item select').selectmenu().selectmenu("refresh", true);
		    	}
		    	if(location.href.indexOf('#transaction-page') > -1){
					funds.set_pif_options_transaction_page('#transaction-page');
				}
				if(location.href.indexOf('#my-fund-page') > -1){
					funds.set_pif_options_transaction_page('#my-fund-page');	
				}
			}
		}

		if(funds.arr && !force_get_array && !callback_function){
			self.pif_array = funds.arr;
			COMMON_OBJECT.free_callbacker( temp_callback() );
		}else{
			console.log(force_get_array);
			console.log(funds.arr);
			console.log('pif here');
			$.ajax({
			  	url: "http://gurtom.mobi/fund_user.php",
			  	type: "GET",
			  	xhrFields: {
		       		withCredentials: true
		      	},
	         	crossDomain: true,
			  	complete: function( response ){
			  		self.pif_array =  JSON.parse( response.responseText );	
			  		COMMON_OBJECT.free_callbacker( temp_callback() );
			  		if( callback_function ){
			  			callback_function();
			  		}	  				    	
			  	}
			});
		}
	},
	get_currency_name_by_id: function(currency_id){
		switch(currency_id){
  			case "1":
				var currency_name = "ICAN";
				break;
			case 1:
				var currency_name = "ICAN";
				break;
			case "980":
				var currency_name = "UAH";
				break;
			case 980:
				var currency_name = "UAH";
				break;
			case "840":
				var currency_name = "USD";
				break;
			case 840:
				var currency_name = "USD";
				break;
			case "978":
				var currency_name = "EUR";
				break;
			case 978:
				var currency_name = "EUR";
				break;
  		}
  		return currency_name;
	},
	set_select_input: function(selector_container, object_name, special_type, id_object, code_type_object, currency_asking){
		var self = this;
		function temp_callback(selector_container, object_name, special_type, id_object, code_type_object, currency_asking){
			return function(){				
				var ui_pif_option = '';
		    	var flag_selected = 0;
		    	jQuery.each(self.pif_array, function(i, one_pif) {
		    		if(one_pif.currency == currency_asking){
		    			ui_pif_option += '<option data-currency = "' + one_pif.currency + '" value="' + one_pif.id + '">' + one_pif.id + ' - ' + one_pif.saldo + '</option>';
		    			flag_selected = 1;
		    		}
		    	});

		    	if(flag_selected == 1){
		    		var ui_donate_panel = '<div class="ui-grid-a">\
					                        <div class="ui-block-a">\
					                            <div>\
					                                <label>Choose Personal Fund</label><select name="pif">\
					                                ' + ui_pif_option + '\
					                                </select>\
					                            </div>\
					                        </div>\
					                        <div class="ui-block-b">\
					                            <div class="text-field">\
					                                <label>Amount of money</label>\
					                                <div class="ui-input-text">\
					                                    <input type="text" name="amount" data-enhanced="true" />\
					                                </div>\
					                            </div>\
					                        </div>\
					                    </div>\
					                    <div class="ui-grid-solo">\
					                        <div class="ui-block-a">\
					                            <button onclick = "' + object_name + '.donate(\'' + special_type + '\', ' + id_object + ', ' + code_type_object + ')" class="ui-btn ui-corner-all ui-shadow donate-btn">Donate</button>\
					                        </div>\
					                        <div class="ui-block-a center">\
					                            <div class="ui-checkbox">\
					                                <label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Anonymous donation</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
					                            </div>\
					                        </div>\
					                    </div>\
					                </div>\ ';
		    	}else{
	    			if(SUPER_PROFILE.auth == true){
		    			var warning_link = '<a href = "#my-fund-page">My funds</a>';
		    		}else{
		    			var warning_link = '<a href = "#registration">Registration</a>';
		    		}
		    		var ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' ' + warning_link + '</span>';
		    	}
		    	$(selector_container + ' .donate-wrap').html(ui_donate_panel);
		    	$(selector_container + ' select').selectmenu().selectmenu("refresh", true);
			}
		}
		self.get_pif_array( true, temp_callback( selector_container, object_name, special_type, id_object, code_type_object, currency_asking ) );
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////Projects 
var PROJECTS = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.data_last_item = 10;
		$('#projects-page #searched_string').val('');
		
		$('#projects-page #ui_title').html('Projects');
		$('#projects-page #create_link').attr('style','display: none');
		$('#projects-page #create_propositions_link').attr('style','display: none');
		$('#projects-page #create_proposition_link').attr('style', 'display: none');

		if(location.href.indexOf('#projects-page?tags_filter=') > -1){
			var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
			var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);
			var url = 'http://gurtom.mobi/project.php?filter=' + encodeURIComponent(tag_filter);
			$('#projects-page #menu_link').attr('style', 'display:block');
			$('#projects-page #my_activities_link').attr('style', 'display:none');
			console.log(tag_filter);
		}else if(location.href.indexOf('#projects-page?program=') > -1){
			var match_array = location.href.match(/#projects-page\?program=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			var url = 'http://gurtom.mobi/project_propositions.php?program_id=' + object_id;
			$('#projects-page #ui_title').html('Projects propositions');
			var return_to = '#program-page?program=' + object_id;
			$('#projects-page #menu_link').attr('style', 'display:block');
			$('#projects-page #create_proposition_link').attr('style', 'display:block');
			$('#projects-page #create_proposition_link').attr('onclick', '$.mobile.navigate(\'#create-item?project_proposition=true&item=' + object_id + '\')');
			$('#projects-page #my_activities_link').attr('style', 'display:none');
		}else if(location.href.indexOf('#projects-page?my_project=true') > -1){
			var url = 'http://gurtom.mobi/project.php?my=1';
			$('#projects-page #ui_title').html('My projects');
			$('#projects-page #create_link').attr('style','display: block');
			$('#projects-page #menu_link').attr('style', 'display:none');
			$('#projects-page #my_activities_link').attr('style', 'display:block');
		}else if(location.href.indexOf('#projects-page?my_project_propositions=true') > -1){
			var url = 'http://gurtom.mobi/project_propositions.php?my=1';
			$('#projects-page #ui_title').html('My projects propositions');
			$('#projects-page #menu_link').attr('style', 'display:none');
			$('#projects-page #my_activities_link').attr('style', 'display:block');
		}else{
			var url = 'http://gurtom.mobi/project.php';
			$('#programs-page #menu_link').attr('style', 'display:block');
			$('#programs-page #my_activities_link').attr('style', 'display:none');
		}

		

		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: url,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.data_array = JSON.parse( response.responseText );
		  		if(self.data_array.length == 0){
		  			//alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG] && self.activated_hard_filter == 1);
		  			$('#projects-page #projects-list').html('<center>Empty</center>');
		  		}	
		  		console.log( self.data_array );
		  		$.mobile.loading( "hide" );
		  		self.check_current_url( 1 );
		  		self.build_elements();
		  		$('#projects-page #activated_filter').css('display', 'none'); 
		  		$('#projects-page #solo_filter').css('display', 'block');	 	
		  },
		});
	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			$.mobile.loading( "show", {  theme: "z"	});

			if(location.href.indexOf('#projects-page?tags_filter=') > -1){
				var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
				var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);

				var url = 'http://gurtom.mobi/project.php?filter=' + encodeURIComponent(tag_filter) + '&ls=' + self.data_last_item;
				console.log(tag_filter);
			}else if(location.href.indexOf('#projects-page?program=') > -1){
				var match_array = location.href.match(/#projects-page\?program=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/project_propositions.php?program_id=' + object_id + '&ls=' + self.data_last_item;;
				var return_to = '#program-page?program=' + object_id + '&ls=' + self.data_last_item;;
			}else if(location.href.indexOf('#projects-page?my_project=true') > -1){
				var url = 'http://gurtom.mobi/project.php?my=1&ls=' + self.data_last_item;;
			}else if(location.href.indexOf('#projects-page?my_project_propositions=true') > -1){
				var url = 'http://gurtom.mobi/project_propositions.php?my=1&ls=' + self.data_last_item;
			}else{
				var url = 'http://gurtom.mobi/project.php?ls=' + self.data_last_item;
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
			  		
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( self.data_array );			  		
			  		if(query_array.length > 0){
			  			self.data_array = self.data_array.concat(query_array);
			  			self.data_last_item += query_array.length;
				  		self.check_current_url( 1 );
				  		self.build_elements( 0, true,  query_array);
			  		}
			  		$.mobile.loading( "hide" );	 
			  },
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		self.activated_easy_filter = 1;

		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/project.php';

		switch($('#projects-page [name=sort]').val()){
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
		}
		switch($('#projects-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
		}

		switch($('#projects-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#projects-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#projects-page [name=sort]').data('direct', 0);
				break;
		}

		if($('#projects-page #searched_string').val() != ""){
			url += '&filter=' + $('#projects-page #searched_string').val();
		}
		if(self.activated_hard_filter){
			var start_date = $('#filter-page-projects [name=start_year]').val() + "-" 
						    + $('#filter-page-projects [name=start_month]').val() + "-" 
						    + $('#filter-page-projects [name=start_date]').val();
			var end_date = $('#filter-page-projects [name=end_year]').val() + "-" 
						  + $('#filter-page-projects [name=end_month]').val() + "-" 
						  + $('#filter-page-projects [name=end_date]').val();
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
		  		console.log(url);
		  		self.data_array = JSON.parse( response.responseText );	
		  		$.mobile.loading( "hide" );
		  		//self.check_current_url( 1 );
		  		if(reinit){
		  			self.build_elements( "", true );	
		  		}else{
		  			self.build_elements();	
		  		}
		  		if(self.data_array.length == 0 && reinit != 1 && self.activated_hard_filter){
		  			$('#projects-page #projects-list').html('<center>Empty</center>');
		  		} 	
		  },
		});
	},
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
			/*switch(one_voting.status){
				case '0':*/
					elements_string += self.collect_cash_build(one_voting);
					/*break;
				case '1':
					elements_string += self.finished_collecting_build(one_voting);
					break;
				case '2':
					//elements_string += self.finished_voting_build(one_voting);
					break;
				case '3':
					//elements_string += self.not_supported_build(one_voting);
					break;
			}*/
    	});
    	if(reinit){
    		$('#projects-page #projects-list').append(elements_string);
    	}else{
    		$('#projects-page #projects-list').html(elements_string);
    	}
	},
	stars_action: function(current_star, project_proposition){
		//$('.stars-wrap span').on('click', function(){
            var star = $(current_star);
            var allStar = star.parent().find('span');
            var val = star.index();
            var vote_id = $(current_star).data('vote_id');

            var obj_type = '4';
            if(project_proposition){
            	obj_type = '3';
            }
            if (star.hasClass('active') && !star.next().hasClass('active')) {
                allStar.removeClass('active');
                
                $.ajax({
				  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=0&obj=" + obj_type,
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
			  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=" + obj_type,
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
			star_class = 'icon-project-star';
		}
		if(location.href.indexOf('#projects-page?program=') > -1){
			var page = 'project_proposition=';
		}else{
			var page = 'project=';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' fund-raising">\
					                <a onclick = "$.mobile.navigate(\'#project-page?' + page + one_voting.id + '\')" href="#">\
					                    <div class="img">\
					                        <img src="http://' + one_voting.img + '" />\
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
			star_class = 'icon-project-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' project-completed">\
				                <a onclick = "$.mobile.navigate(\'#project-page?project=' + one_voting.id + '\')" href="#">\
				                    <div class="img">\
				                        <img src="http://' + one_voting.img + '" />\
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
				                </a>\
				            </div>';
		return part_ui_string;
	},
	not_supported_build:function(one_voting){
		var self = this;
		var star_class = '';
		if(one_voting.stars > 0){
			star_class = 'icon-project-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' fund-raising">\
					                <a onclick = "$.mobile.navigate(\'#project-page?project=' + one_voting.id + '\')" href="#">\
					                    <div class="img">\
					                        <img src="http://' + one_voting.img + '" />\
					                    </div>\
					                    <div class="info">\
					                        <div class="title">\
					                            ID: <strong>' + one_voting.id + '</strong> : <strong>' + one_voting.title + '</strong>\
					                        </div>\
					                        <div class="ui-grid-a">\
					                            <div class="ui-block-a">\
					                                <div class="country">\
					                                    Украина, Одесса\
					                                </div>\
					                            </div>\
					                            <div class="ui-block-b">\
					                                <div class="status">\
					                                    <span style = "color: red">' + LOCALE_ARRAY_ADDITIONAL.collect_cash[CURRENT_LANG] + '</span>\
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
	check_current_url:function(type_trigger){
		var self = this;
		if(location.href.indexOf('#project-page?project=') > -1){
			var match_array = location.href.match(/#project-page\?project=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			self.switch_page_for_build(object_id[0], type_trigger);
		}else if(location.href.indexOf('#project-page?project_proposition=') > -1){
			var match_array = location.href.match(/#project-page\?project_proposition=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			self.switch_page_for_build(object_id[0], type_trigger, 1);
		}		
	},
	switch_page_for_build:function(object_id, type_trigger, project_proposition){
		var self = this;
		var data_for_build;
		jQuery.each(self.data_array, function(i, one_data) {
			if(parseInt(one_data.id) == parseInt(object_id)){
				data_for_build = one_data;
			}
    	});
    	if(!data_for_build){
    		if(project_proposition){
    			self.get_one_element(object_id, type_trigger, 1);
    			return false;
    		}else{
    			self.get_one_element(object_id, type_trigger);
    			return false;
    		}
    	}
    	if(project_proposition){
			self.current_collect_cash_project_proposition( data_for_build, 0, type_trigger);
    	}else{
    		switch(data_for_build.status){
				case '0':
					self.current_collect_cash( data_for_build, 0, type_trigger);
					break;
				case '1':
					self.current_collect_cash(  data_for_build, 0, type_trigger)
					break;
			}
    	}

		$('#project-page .btn-login-soc button').on('click', function(e){
            $(this).next().fadeToggle(300);
            if($('.overlay').length < 1) {
                $(this).closest('.ui-page').append('<span class="overlay"></span>');
            } else {
                $('.overlay').remove();
            }
        });
		$(document).on('click','.overlay', function() {
            $(this).closest('.ui-page').find('#project-page .btn-login-soc button').trigger('click');
        });
	},
	current_collect_cash: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span>\ ';
    			break;
    		case "3":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span>\ ';
    			break;
    		case "4":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this)"></span>\ ';
    			break;
    	}

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
    	var ui_tags = '';
    	jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#projects-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
    	});

    	var ui_pif_option = '';
    	var flag_selected = 0;
    	jQuery.each(PIF.pif_array, function(i, one_pif) {
    		if(one_pif.currency == data_for_build.currency_asking){
    			ui_pif_option += '<option data-currency = "' + one_pif.currency + '" value="' + one_pif.id + '">' + one_pif.id + ' - ' + one_pif.saldo + '</option>';
    			flag_selected = 1;
    		}
    	});

    	var nko_parts = '';
		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
			nko_parts += '<li>\
		                    <div>\
		                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		                    </div>\
		                </li>\ '; 
    	});

    	if(SUPER_PROFILE.id == data_for_build.creator_id){
			var nco_button = '<div class="nko-btn">\
			                    <a class="ui-btn ui-corner-all ui-shadow" onclick = "$.mobile.navigate(\'#nko-page?project=' + data_for_build.id + '\')" href="#">Выбрать НКО</a>\
			                </div>\
			                <div class="nko-status red">\
			                    НКО не выбран\
			                </div>';
		}else{
			var nco_button = '';
		}

    	if(flag_selected == 1){
    		var ui_donate_panel = '<div class="ui-grid-a">\
			                        <div class="ui-block-a">\
			                            <div>\
			                                <label>Choose Personal Fund</label><select name="pif">\
			                                ' + ui_pif_option + '\
			                                </select>\
			                            </div>\
			                        </div>\
			                        <div class="ui-block-b">\
			                            <div class="text-field">\
			                                <label>Amount of money</label>\
			                                <div class="ui-input-text">\
			                                    <input type="text" name="amount" data-enhanced="true" />\
			                                </div>\
			                            </div>\
			                        </div>\
			                    </div>\
			                    <div class="ui-grid-solo">\
			                        <div class="ui-block-a">\
			                            <button onclick = "PROJECTS.donate(\'project\', ' + data_for_build.id + ', 4)" class="ui-btn ui-corner-all ui-shadow donate-btn">Donate</button>\
			                        </div>\
			                        <div class="ui-block-a center">\
			                            <div class="ui-checkbox">\
			                                <label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Anonymous donation</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                            </div>\
			                        </div>\
			                    </div>\
			                </div>\ ';
    	}else{
    		var ui_donate_panel = '';
    		if(PIF.pif_array.length == 0){
    			PIF.set_select_input('#project-page', 'PROJECTS', 'project', data_for_build.id, 4, data_for_build.currency_asking);
    		}
    		if(SUPER_PROFILE.auth == true){
    			 ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' <a href = "#my-fund-page">My funds</a></span>';
    		}else{
    			 ui_donate_panel = '<span>Please register for donate. <a href = "#registration">Registration</a></span>';
    		}
    	}

    	var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
			        <h1>\
			            ' + LOCALE_ARRAY_ADDITIONAL.project[CURRENT_LANG] + '\
			        </h1>\
			        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#project-help">Ask</a>\
			        <div id="project-help" class="help-popup" data-role="popup" data-history="false">\
			            <div class="title">\
			                Description\
			            </div>\
			            <div class="text">\
			                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
			            </div>\
			        </div>\
			    </div>\
			    <div role="main" class="ui-content">\
			        <div id = "project-item" class="project-item">\
			        <div class="img">\
		                <img width="100%" src="http://' + data_for_build.img + '" />\
		            </div>\
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
		                <div class="status yellow">\
		                    ' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' 23.08.2015\
		                </div>\
		                <div class="total-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + data_for_build.amount_asking + ' ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="amount up">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.amount_current + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="my-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.my_add + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="nko-list">\
		                    <div class="title">\
		                        Список текущих предложений <strong>НКО</strong>:\
		                    </div>\
		                    <ol>\
		                        ' + nko_parts + '\
		                    </ol>\
		                </div>\
		                ' + nco_button + '\
		                <div class="desc">\
		                    <div class="text">\
		                        ' + data_for_build.description + '\
		                    </div>\
		                    <div class="tag-list">\
		                        ' + ui_tags + '\
		                    </div>\
		                </div>\
		                <div class="discuss-btn">\
		                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
		                </div>\
		                <div class="btn-login-soc">\
		                    <button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
		                    <div class="social-wrap">\
		                        <div class="ui-grid-b">\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
		                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=project&id=' + data_for_build.id + '\');">История сбора средств</a>\
		                </div>\
		            </div>\
		        </div>\
    		</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#project-page').html('');
		$( ui_string ).appendTo( '#project-page' );
		$('#project-page').enhanceWithin();
		$('#project-page select').selectmenu().selectmenu("refresh", true);	
		$.mobile.loading( "hide" );
	},
	current_collect_cash_project_proposition: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span>\ ';
    			break;
    		case "3":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span>\ ';
    			break;
    		case "4":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROJECTS.stars_action(this, 1)"></span>\ ';
    			break;
    	}

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
    	var ui_tags = '';
    	jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#projects-page?program=' + data_for_build.program_id + 'tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
    	});

    	var ui_pif_option = '';
    	var flag_selected = 0;
    	jQuery.each(PIF.pif_array, function(i, one_pif) {
    		if(one_pif.currency == data_for_build.currency_asking){
    			ui_pif_option += '<option data-currency = "' + one_pif.currency + '" value="' + one_pif.id + '">' + one_pif.id + ' - ' + one_pif.saldo + '</option>';
    			flag_selected = 1;
    		}
    	});

    	var nko_parts = '';
		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
			nko_parts += '<li>\
		                    <div>\
		                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		                    </div>\
		                </li>\ '; 
    	});

    	if(SUPER_PROFILE.id == data_for_build.creator_id){
			var nco_button = '<div class="nko-btn">\
			                    <a class="ui-btn ui-corner-all ui-shadow" onclick = "$.mobile.navigate(\'#nko-page?project_proposition=' + data_for_build.id + '\')" href="#">Выбрать НКО</a>\
			                </div>\
			                <div class="nko-status red">\
			                    НКО не выбран\
			                </div>';
		}else{
			var nco_button = '';
		}

    	if(flag_selected == 1){
    		var ui_donate_panel = '<div class="ui-grid-a">\
			                        <div class="ui-block-a">\
			                            <div>\
			                                <label>Choose Personal Fund</label><select name="pif">\
			                                ' + ui_pif_option + '\
			                                </select>\
			                            </div>\
			                        </div>\
			                        <div class="ui-block-b">\
			                            <div class="text-field">\
			                                <label>Amount of money</label>\
			                                <div class="ui-input-text">\
			                                    <input type="text" name="amount" data-enhanced="true" />\
			                                </div>\
			                            </div>\
			                        </div>\
			                    </div>\
			                    <div class="ui-grid-solo">\
			                        <div class="ui-block-a">\
			                            <button onclick = "PROJECTS.donate(\'project\', ' + data_for_build.id + ', 3)" class="ui-btn ui-corner-all ui-shadow donate-btn">Donate</button>\
			                        </div>\
			                        <div class="ui-block-a center">\
			                            <div class="ui-checkbox">\
			                                <label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Anonymous donation</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                            </div>\
			                        </div>\
			                    </div>\
			                </div>\ ';
    	}else{
    		var ui_donate_panel = '';
    		if(PIF.pif_array.length == 0){
    			
    			PIF.set_select_input('#project-page', 'PROJECTS', 'project', data_for_build.id, 3, data_for_build.currency_asking);
    		}
    		if(SUPER_PROFILE.auth == true){
    			 ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' <a href = "#my-fund-page">My funds</a></span>';
    		}else{
    			 ui_donate_panel = '<span>Please register for donate. <a href = "#registration">Registration</a></span>';
    		}
    	}

    	var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
			        <h1>\
			            ' + LOCALE_ARRAY_ADDITIONAL.project_proposition[CURRENT_LANG] + '\
			        </h1>\
			        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'#projects-page?program=' + data_for_build.program_id + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#project-help">Ask</a>\
			        <div id="project-help" class="help-popup" data-role="popup" data-history="false">\
			            <div class="title">\
			                Description\
			            </div>\
			            <div class="text">\
			                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
			            </div>\
			        </div>\
			    </div>\
			    <div role="main" class="ui-content">\
			        <div id = "project-item" class="project-item">\
			        <div class="img">\
		                <img width="100%" src="http://' + data_for_build.img + '" />\
		            </div>\
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
		                <div class="status yellow">\
		                    ' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' 23.08.2015\
		                </div>\
		                <div class="total-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + data_for_build.amount_asking + ' ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="amount up">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.amount_current + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="my-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><test id = "my_amount_current">' + data_for_build.my_add + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="nko-list">\
		                    <div class="title">\
		                        Список текущих предложений <strong>НКО</strong>:\
		                    </div>\
		                    <ol>\
		                        ' + nko_parts + '\
		                    </ol>\
		                </div>\
		                ' + nco_button + '\
		                <div class="desc">\
		                    <div class="text">\
		                        ' + data_for_build.description + '\
		                    </div>\
		                    <div class="tag-list">\
		                        ' + ui_tags + '\
		                    </div>\
		                </div>\
		                <div class="discuss-btn">\
		                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
		                </div>\
		                <div class="btn-login-soc">\
		                    <button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
		                    <div class="social-wrap">\
		                        <div class="ui-grid-b">\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
		                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=project_proposition&id=' + data_for_build.id + '\');">История сбора средств</a>\
		                </div>\
		            </div>\
		        </div>\
    		</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#project-page').html('');
		$( ui_string ).appendTo( '#project-page' );
		$('#project-page').enhanceWithin();
		$('#project-page select').selectmenu().selectmenu("refresh", true);	
		$.mobile.loading( "hide" );
	},
	check_nko_page: function(){
		var self = this;
		var data_for_build;
		if(location.href.indexOf('#nko-page?project=') > -1 || location.href.indexOf('#nko-page?project_proposition=') > -1){
			if(location.href.indexOf('#nko-page?project=') > -1){
				var match_array = location.href.match(/#nko-page\?project=[0-9]*/i);
				var type = 4;
				var return_page = 'project=';
			}else{
				var match_array = location.href.match(/#nko-page\?project_proposition=[0-9]*/i);
				var type = 3;
				var return_page = 'project_proposition=';
			}
			var object_id = match_array[0].match(/[0-9]+/i);
			
			jQuery.each(self.data_array, function(i, one_data) {
				if(parseInt(one_data.id) == parseInt(object_id)){
					data_for_build = one_data;
					
				}
	    	});
	    	var nko_parts = '';
			jQuery.each(data_for_build.nco_list, function(i, one_nko) {
				nko_parts += '<li>\
			                    <div onclick = "PROJECTS.set_nco(' + type + ',\'' + object_id + '\', \'' + one_nko.id + '\')" class="ui-checkbox">\
			                        <label class="ui-btn ui-btn-icon-left ui-checkbox-off"></label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                    </div>\
			                    <div>\
			                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
			                    </div>\
			                </li>\ '; 
	    	});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						        <h1>\
						            Список НКО\
						        </h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
						        <div id="project-nko-help" class="help-popup" data-role="popup" data-history="false">\
						            <div class="title">\
						                Description\
						            </div>\
						            <div class="text">\
						                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
						            </div>\
						        </div>\
						    </div>\
						    <div role="main" class="ui-content">\
						        <div class="select-nko-wrap">\
						            <div class="title">\
						                Выберете <strong>НКО</strong> из текущих предложений:\
						            </div>\
						            <ol>' + nko_parts + '\
						            </ol>\
						            <div class="btn-save">\
						                <input type="submit" value="Сохранить" />\
						            </div>\
						        </div>\
						    </div>';
			$('#nko-page').html( ui_string ).enhanceWithin();
		}
	},
	set_nco: function(object_type, object_id, nco_id){
		$.ajax({
			url: "http://gurtom.mobi/nco_choice.php",
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
	        	console.log("saved ok");
	            //alert('okay');
	        }
		});
	},
	get_one_element: function(data_id, type_trigger, project_proposition){
		var url = 'http://gurtom.mobi/project.php?id=' + data_id;
		if(project_proposition){
			url = 'http://gurtom.mobi/project_propositions.php?id=' + data_id;			
		}
		var self = this;
		var return_element;
		$.ajax({
			  url: url,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		self.data_array = data_for_build;
			  		console.log(self.data_array);
			  		if(project_proposition){
						self.current_collect_cash_project_proposition( data_for_build, 0, type_trigger);
			    	}else{
			    		switch(data_for_build.status){
							case '0':
								self.current_collect_cash( data_for_build, 0, type_trigger);
								break;
							case '1':
								self.current_collect_cash(  data_for_build, 0, type_trigger)
								break;
							case '2':
								self.current_collect_cash(  data_for_build, 0, type_trigger)
								break;
						}

			    	}
					$('#project-page .btn-login-soc button').on('click', function(e){
			            $(this).next().fadeToggle(300);
			            if($('.overlay').length < 1) {
			                $(this).closest('.ui-page').append('<span class="overlay"></span>');
			            } else {
			                $('.overlay').remove();
			            }
			        });
					$(document).on('click','.overlay', function() {
			            $(this).closest('.ui-page').find('#project-page .btn-login-soc button').trigger('click');
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
			url: "http://gurtom.mobi/fund_add_by_type.php",
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
	        		var response_data = JSON.parse(data.responseText);
	        		if(data.responseText.indexOf('error') == -1){
	        			alert(LOCALE_ARRAY_ADDITIONAL.donate_successfull[CURRENT_LANG]);
		        		$('#' + selector + '-page [name=pif] option[value=' + $('#' + selector + '-page [name=pif]').val() + ']').html($('#' + selector + '-page [name=pif]').val() + ' - ' + response_data[0].saldo);
		        		$('#' + selector + '-page #amount_up').html( parseInt( $('#' + selector + '-page #amount_up').html() ) + parseInt( amount ));
		        		$('#' + selector + '-page #my_amount_current').html( parseInt( $('#' + selector + '-page #my_amount_current').html() ) + parseInt( amount ) );
		        		
		        		$('#' + selector + '-page select').selectmenu().selectmenu("refresh", true);
		        		console.log("donate ok");
	        		}else{
	        			alert('There are no enough resources or fund is closed');
	        		}
	        		
	        	}
	            //alert('okay');
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
				//var return_page = '#project-page?project=';
			}else{
				var match_array = location.href.match(/#history-page\?item=project_proposition&id=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var type = 3;
				//var return_page = '#project-page?project_proposition=';
			}
			var return_page = '#project-page';
			var my_add = 0;
			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: 'http://gurtom.mobi/fund_public_cf.php?type=' + type + '&id=' + object_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		var funds_list = JSON.parse( response.responseText );
			  		console.log('project_proposition or project');	
			  		$.mobile.loading( "hide" );

			  		var ui_funds = '';
			  		var ui_cf = '';
			  		var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );

			  		jQuery.each(funds_list, function(i, one_fund) {		  			
			    		for (var i = 0; i < one_fund.cf.length; i++) {
			    			var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
				    		var cancel_span = '';
				    		if(one_fund.cf[i].user_id == SUPER_PROFILE.id){
				    			cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "PROJECTS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',\'' + type + '\',\'' + object_id + '\',\'' + return_page + object_id + '\')">Cancel donate</span>';
				    			my_add += parseInt(one_fund.cf[i].saldo);
				    		}
			    			ui_cf += '<tr>\
				                        <td>' + cancel_span + ' ' + one_fund.cf[i].ts_modified + '</td>\
				                        <td>' + one_fund.cf[i].user_id + ' ' + one_fund.cf[i].fname + ' ' + one_fund.cf[i].lname + '</td>\
				                        <td><strong>' + one_fund.cf[i].saldo + '</strong> ' + currency_name + '</td>\
				                    </tr>';
			  			} 
			    	});

			    	ui_funds += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
								        <h1 class="long-title">\
								            История сбора средств\
								        </h1>\
								        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'' + return_page + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#project_proposition-history-help">Ask</a>\
								        <div id="project_proposition-history-help" class="help-popup" data-role="popup" data-history="false">\
								            <div class="title">\
								                Description\
								            </div>\
								            <div class="text">\
								                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
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
								                         ' + main_currency + '</strong><span>Мой вклад</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-b">\
								                    <div class="amount up">\
								                        <strong>\
								                        ' + funds_list[0].amount_current + '\
								                         ' + main_currency + '</strong><span>Собранно на данный момент</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-c">\
								                    <div class="total-amount">\
								                        <strong>\
								                        ' + funds_list[0].amount_asking + '\
								                        ' + main_currency + '</strong><span>Нужное количество</span>\
								                    </div>\
								                </div>\
								            </div>\
								            <table>\
								                <thead>\
								                    <tr>\
								                        <td>\
								                            Дата и время\
								                        </td>\
								                        <td>\
								                            ФИО\
								                        </td>\
								                        <td>\
								                            Сумма\
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
			url: "http://gurtom.mobi/fund_return_by_type.php",
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
        		console.log(return_page);
        		PIF.get_pif_array(true);
        		$.mobile.navigate(return_page);
	            //alert('okay');
	        }
		});
	},
	/*delete_voting: function(voting_id, return_page){
		$.ajax({
		  url: 'http://gurtom.mobi/mc_rm.php?id=' + voting_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  	 console.log("Deleted id:" + voting_id);
		  	 $.mobile.navigate(return_page);  	
		  },
		});
	},*/
};

var PROGRAMS = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.data_last_item = 10;
		$('#programs-page #searched_string').val('');

		$('#programs-page #ui_title').html('Programs');
		$('#programs-page #create_link').attr('style','display: none');

		if(location.href.indexOf('#programs-page?tags_filter=') > -1){
			var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
			var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);
			var url = 'http://gurtom.mobi/program.php?filter=' + encodeURIComponent(tag_filter);
			console.log(tag_filter);
			$('#programs-page #menu_link').attr('style', 'display:block');
			$('#programs-page #my_activities_link').attr('style', 'display:none');
		}else if(location.href.indexOf('#programs-page?my_program=true') > -1){
			var url = 'http://gurtom.mobi/program.php?my=1';
			$('#programs-page #ui_title').html('My programs');
			$('#programs-page #create_link').attr('style','display: block');
			$('#programs-page #menu_link').attr('style', 'display:none');
			$('#programs-page #my_activities_link').attr('style', 'display:block');
		}else{
			var url = 'http://gurtom.mobi/program.php';
			$('#programs-page #menu_link').attr('style', 'display:block');
			$('#programs-page #my_activities_link').attr('style', 'display:none');
		}

		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: url,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.data_array = JSON.parse( response.responseText );
		  		if(self.data_array.length == 0  && self.activated_hard_filter == 1){
		  			alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
		  		}	
		  		console.log( self.data_array );
		  		$.mobile.loading( "hide" );
		  		self.check_current_url( 1 );
		  		self.build_elements();
		  		$('#programs-page #activated_filter').css('display', 'none'); 
		  		$('#programs-page #solo_filter').css('display', 'block');	 
		  		/*if(call_back){
		  			call_back();
		  		}*/	
		  },
		});
	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{

			if(location.href.indexOf('#programs-page?tags_filter=') > -1){
				var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
				var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);

				var url = 'http://gurtom.mobi/program.php?filter=' + encodeURIComponent(tag_filter) + '&ls=' + self.data_last_item;
				console.log(tag_filter);
			}else if(location.href.indexOf('#programs-page?my_program=true') > -1){
				var url = 'http://gurtom.mobi/program.php?my=1&ls=' + self.data_last_item;
			}else{
				var url = 'http://gurtom.mobi/program.php?ls=' + self.data_last_item;
			}

			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: url,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		//console.log(response);
			  		
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( self.data_array );			  		
			  		if(query_array.length > 0){
			  			self.data_array = self.data_array.concat(query_array);
			  			self.data_last_item += query_array.length;
				  		self.check_current_url( 1 );
				  		self.build_elements( 1, true,  query_array);
			  		}
			  		$.mobile.loading( "hide" );	 
			  },
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		self.activated_easy_filter = 1;
		/*if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
	    	$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}*/
		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/program.php';

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

		switch($('#programs-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#programs-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#programs-page [name=sort]').data('direct', 0);
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
		  		console.log(url);
		  		self.data_array = JSON.parse( response.responseText );	
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
	/*support_voting: function(vote_id){
		$.ajax({
		  url: 'http://gurtom.mobi/like_add.php?id=' + vote_id,
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
				$('#supported').html(parseInt($('#supported').html())+1);
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
				  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=0&obj=2",
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
			  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=2",
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
			star_class = 'icon-program-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' fund-raising">\
					                <a onclick = "$.mobile.navigate(\'#program-page?program=' + one_voting.id + '\')" href="#">\
					                    <div class="img">\
					                        <img src="http://' + one_voting.img + '" />\
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
			star_class = 'icon-program-star';
		}
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' program-completed">\
				                <a onclick = "$.mobile.navigate(\'#program-page?program=' + one_voting.id + '\')" href="#">\
				                    <div class="img">\
				                        <img src="http://' + one_voting.img + '" />\
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
			                        <img src="http://' + one_voting.img + '" />\
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
				self.current_collect_cash(  data_for_build, 0, type_trigger)
				break;
			case '2':
				//self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
				break;
			case '3':
				//self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
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
	current_collect_cash: function(data_for_build, canceled, type_trigger){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
    			break;
    		case "3":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
    			break;
    		case "4":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "PROGRAMS.stars_action(this)"></span>\ ';
    			break;
    	}

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
    	var ui_tags = '';
    	jQuery.each(tags_array, function(i, one_tag) {
			ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#programs-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
    	});

    	var ui_pif_option = '';
    	var flag_selected = 0;
    	jQuery.each(PIF.pif_array, function(i, one_pif) {
    		if(one_pif.currency == data_for_build.currency_asking){
    			ui_pif_option += '<option data-currency = "' + one_pif.currency + '" value="' + one_pif.id + '">' + one_pif.id + ' - ' + one_pif.saldo + '</option>';
    			flag_selected = 1;
    		}
    	});

    	var nko_parts = '';
		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
			nko_parts += '<li>\
		                    <div>\
		                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		                    </div>\
		                </li>\ '; 
    	});

    	if(SUPER_PROFILE.id == data_for_build.creator_id){
			var nco_button = '<div class="nko-btn">\
			                    <a class="ui-btn ui-corner-all ui-shadow" onclick = "$.mobile.navigate(\'#nko-page?program=' + data_for_build.id + '\')" href="#">Выбрать НКО</a>\
			                </div>\
			                <div class="nko-status red">\
			                    НКО не выбран\
			                </div>';
		}else{
			var nco_button = '';
		}

    	if(flag_selected == 1){
    		var ui_donate_panel = '<div class="ui-grid-a">\
			                        <div class="ui-block-a">\
			                            <div>\
			                                <label>Choose Personal Fund</label><select name="pif">\
			                                ' + ui_pif_option + '\
			                                </select>\
			                            </div>\
			                        </div>\
			                        <div class="ui-block-b">\
			                            <div class="text-field">\
			                                <label>Amount of money</label>\
			                                <div class="ui-input-text">\
			                                    <input type="text" name="amount" data-enhanced="true" />\
			                                </div>\
			                            </div>\
			                        </div>\
			                    </div>\
			                    <div class="ui-grid-solo">\
			                        <div class="ui-block-a">\
			                            <button onclick = "PROGRAMS.donate(\'program\', ' + data_for_build.id + ', 2)" class="ui-btn ui-corner-all ui-shadow donate-btn">Donate</button>\
			                        </div>\
			                        <div class="ui-block-a center">\
			                            <div class="ui-checkbox">\
			                                <label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Anonymous donation</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                            </div>\
			                        </div>\
			                    </div>\
			                </div>\ ';
    	}else{
    		var ui_donate_panel = '';
    		if(PIF.pif_array.length == 0){
    			ui_donate_panel = '';
    			PIF.set_select_input('#program-page', 'PROGRAMS', 'program', data_for_build.id, 2, data_for_build.currency_asking);
    		}
    		if(SUPER_PROFILE.auth == true){
    			ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' <a href = "#my-fund-page">My funds</a></span>';
    		}else{
    			ui_donate_panel = '<span>Please register for donate. <a href = "#registration">Registration</a></span>';
    		}
    	}

    	var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
			        <h1>\
			            ' + LOCALE_ARRAY_ADDITIONAL.program[CURRENT_LANG] + '\
			        </h1>\
			        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-help">Ask</a>\
			        <div id="program-help" class="help-popup" data-role="popup" data-history="false">\
			            <div class="title">\
			                Description\
			            </div>\
			            <div class="text">\
			                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
			            </div>\
			        </div>\
			    </div>\
			    <div role="main" class="ui-content">\
			        <div id = "program-item" class="program-item">\
			        <div class="img">\
		                <img width="100%" src="http://' + data_for_build.img + '" />\
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
		                <div class="status yellow">\
		                    ' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' 23.08.2015\
		                </div>\
		                <div class="total-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + data_for_build.amount_asking + ' ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="amount up">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.amount_current + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="my-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><test id = "my_amount_current">' + data_for_build.my_add + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="nko-list">\
		                    <div class="title">\
		                        Список текущих предложений <strong>НКО</strong>:\
		                    </div>\
		                    <ol>\
		                        ' + nko_parts + '\
		                    </ol>\
		                </div>\
		                ' + nco_button + '\
		                <div class="desc">\
		                    <div class="text">\
		                        ' + data_for_build.description + '\
		                    </div>\
		                    <div class="tag-list">\
		                        ' + ui_tags + '\
		                    </div>\
		                </div>\
		                <div class="discuss-btn">\
		                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
		                </div>\
		                <div class="btn-login-soc">\
		                    <button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
		                    <div class="social-wrap">\
		                        <div class="ui-grid-b">\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
		                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=program&id=' + data_for_build.id + '\');">История сбора средств</a>\
		                </div>\
		                <div class="btn-next-page">\
		                    <a class="ui-btn ui-btn-icon-right" onclick = "$.mobile.navigate(\'#weighted-votings-page?program=' + data_for_build.id + '\')" href="#">Голосование по программе</a>\
		                </div>\
		                <div class="btn-next-page">\
		                    <a class="ui-btn ui-btn-icon-right" onclick = "$.mobile.navigate(\'#projects-page?program=' + data_for_build.id + '\')" href="#">Проектные предложения</a>\
		                </div>\
		            </div>\
		        </div>\
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
	check_nko_page: function(){
		var self = this;
		if(location.href.indexOf('#nko-page?program=') > -1){
			var match_array = location.href.match(/#nko-page\?program=[0-9]*/i);
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
			                    <div onclick = "PROGRAMS.set_nco(2,\'' + object_id + '\', \'' + one_nko.id + '\')" class="ui-checkbox">\
			                        <label class="ui-btn ui-btn-icon-left ui-checkbox-off"></label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                    </div>\
			                    <div>\
			                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
			                    </div>\
			                </li>\ '; 
	    	});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						        <h1>\
						            Список НКО\
						        </h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
						        <div id="program-nko-help" class="help-popup" data-role="popup" data-history="false">\
						            <div class="title">\
						                Description\
						            </div>\
						            <div class="text">\
						                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
						            </div>\
						        </div>\
						    </div>\
						    <div role="main" class="ui-content">\
						        <div class="select-nko-wrap">\
						            <div class="title">\
						                Выберете <strong>НКО</strong> из текущих предложений:\
						            </div>\
						            <ol>' + nko_parts + '\
						            </ol>\
						            <div class="btn-save">\
						                <input type="submit" value="Сохранить" />\
						            </div>\
						        </div>\
						    </div>';
			$('#nko-page').html( ui_string ).enhanceWithin();
		}
	},
	set_nco: function(object_type, object_id, nco_id){
		$.ajax({
			url: "http://gurtom.mobi/nco_choice.php",
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
	        	console.log("saved ok");
	            //alert('okay');
	        }
		});
	},
	get_one_element: function(data_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			  url: 'http://gurtom.mobi/program.php?id=' + data_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		self.data_array = data_for_build;
			  		console.log(self.data_array);
			  		switch(data_for_build.status){
						case '0':
							self.current_collect_cash( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_collect_cash(  data_for_build, 0, type_trigger)
							break;
						case '2':
							self.current_collect_cash(  data_for_build, 0, type_trigger)
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
		
		$.ajax({
			url: "http://gurtom.mobi/fund_add_by_type.php",
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
	        		var response_data = JSON.parse(data.responseText);
	        		if(data.responseText.indexOf('error') == -1){
	        			alert(LOCALE_ARRAY_ADDITIONAL.donate_successfull[CURRENT_LANG]);
		        		$('#' + selector + '-page [name=pif] option[value=' + $('#' + selector + '-page [name=pif]').val() + ']').html($('#' + selector + '-page [name=pif]').val() + ' - ' + response_data[0].saldo);
		        		$('#' + selector + '-page #amount_up').html( parseInt( $('#' + selector + '-page #amount_up').html() ) + parseInt( amount ));
		        		$('#' + selector + '-page #my_amount_current').html( parseInt( $('#' + selector + '-page #my_amount_current').html() ) + parseInt( amount ) );
		        		$('#' + selector + '-page select').selectmenu().selectmenu("refresh", true);
		        		console.log("donate ok");
	        		}else{
	        			alert('There are no enough resources or fund is closed');
	        		}
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
			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: 'http://gurtom.mobi/fund_public_cf.php?type=2&id=' + object_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		var funds_list = JSON.parse( response.responseText );
			  		console.log('program');
			  		console.log('funds_list');
			  		console.log(funds_list);	
			  		$.mobile.loading( "hide" );

			  		var ui_funds = '';
			  		var ui_cf = '';
			  		var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );
			  		jQuery.each(funds_list, function(j, one_fund) {
			  			for (var i = 0; i < one_fund.cf.length; i++) {
			  				var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
			    			var cancel_span = '';
				    		if(one_fund.cf[i].user_id == SUPER_PROFILE.id){
				    			cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "PROGRAMS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',2,\'' + object_id + '\',\'#program-page?program=' + object_id + '\')">Cancel donate</span>';
				    			//cancel_span = '<span style = "color: red;">Cancel donate</span>';
				    			my_add += parseInt(one_fund.cf[i].saldo);
				    		}
			    			ui_cf += '<tr>\
				                        <td>' + cancel_span + ' ' + one_fund.cf[i].ts_modified + '</td>\
				                        <td>' + one_fund.cf[i].user_id + ' ' + one_fund.cf[i].fname + ' ' + one_fund.cf[i].lname + '</td>\
				                        <td><strong>' + one_fund.cf[i].saldo + '</strong> ' + currency_name + '</td>\
				                    </tr>';
			  			}		  			 
			    	});

			    	ui_funds += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
								        <h1 class="long-title">\
								            История сбора средств\
								        </h1>\
								        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'#program-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-history-help">Ask</a>\
								        <div id="request-history-help" class="help-popup" data-role="popup" data-history="false">\
								            <div class="title">\
								                Description\
								            </div>\
								            <div class="text">\
								                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
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
								                         ' + main_currency + '</strong><span>Мой вклад</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-b">\
								                    <div class="amount up">\
								                        <strong>\
								                        ' + funds_list[0].amount_current + '\
								                         ' + main_currency + '</strong><span>Собранно на данный момент</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-c">\
								                    <div class="total-amount">\
								                        <strong>\
								                        ' + funds_list[0].amount_asking + '\
								                        ' + main_currency + '</strong><span>Нужное количество</span>\
								                    </div>\
								                </div>\
								            </div>\
								            <table>\
								                <thead>\
								                    <tr>\
								                        <td>\
								                            Дата и время\
								                        </td>\
								                        <td>\
								                            ФИО\
								                        </td>\
								                        <td>\
								                            Сумма\
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
			url: "http://gurtom.mobi/fund_return_by_type.php",
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
        		console.log(return_page);
        		PIF.get_pif_array(true);
        		$.mobile.navigate(return_page);
	            //alert('okay');
	        }
		});
	}	
	/*delete_voting: function(voting_id, return_page){
		$.ajax({
		  url: 'http://gurtom.mobi/mc_rm.php?id=' + voting_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  	 console.log("Deleted id:" + voting_id);
		  	 $.mobile.navigate(return_page);  	
		  },
		});
	},*/

};

var REQUESTS = {
	data_array: [],
	voters_list: [],
	data_last_item: 10,
	activated_easy_filter: 0,
	activated_hard_filter: 0,
	sphere_filter: -1,
	init: function(call_back){
		var self = this;
		self.activated_easy_filter = 0;
		self.activated_hard_filter = 0;
		self.sphere_filter = 0;
		self.data_last_item = 10;
		$('#requests-page #searched_string').val('');

		$('#requests-page #ui_title').html('Requests');
		$('#requests-page #create_link').attr('style','display: none');
		$('#requests-page #menu_link').attr('style', 'display:block');
		$('#requests-page #my_activities_link').attr('style', 'display:none');

		if(location.href.indexOf('#requests-page?tags_filter=') > -1){
			var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
			var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);
			var url = 'http://gurtom.mobi/request.php?filter=' + encodeURIComponent(tag_filter);
			console.log(tag_filter);
		}else if(location.href.indexOf('#requests-page?my_request=true') > -1){
			var url = 'http://gurtom.mobi/request.php?my=1';
			$('#requests-page #ui_title').html('My requests');
			$('#requests-page #create_link').attr('style','display: block');
			$('#requests-page #menu_link').attr('style', 'display:none');
			$('#requests-page #my_activities_link').attr('style', 'display:block');
		}else{
			var url = 'http://gurtom.mobi/request.php';
		}

		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: url,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.data_array = JSON.parse( response.responseText );
		  		if(self.data_array.length == 0  && self.activated_hard_filter == 1){
		  			alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
		  		}	
		  		console.log( self.data_array );
		  		$.mobile.loading( "hide" );
		  		self.check_current_url( 1 );
		  		self.build_elements();
		  		$('#requests-page #activated_filter').css('display', 'none'); 
		  		$('#requests-page #solo_filter').css('display', 'block');	
		  },
		});
	},
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			if(location.href.indexOf('#requests-page?tags_filter=') > -1){
				var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
				var tag_filter = match_array[0].match(/[^=][a-zA-Z]*/i);

				var url = 'http://gurtom.mobi/request.php?filter=' + encodeURIComponent(tag_filter) + '&ls=' + self.data_last_item;
				console.log(tag_filter);
			}else if(location.href.indexOf('#requests-page?my_request=true') > -1){
				var url = 'http://gurtom.mobi/request.php?my=1&ls=' + self.data_last_item;
			}else{
				var url = 'http://gurtom.mobi/request.php?ls=' + self.data_last_item;
			}

			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: url,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		//console.log(response);
			  		
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( self.data_array );			  		
			  		if(query_array.length > 0){
			  			self.data_array = self.data_array.concat(query_array);
			  			self.data_last_item += query_array.length;
				  		self.check_current_url( 1 );
				  		self.build_elements( 0, true,  query_array);
			  		}
			  		$.mobile.loading( "hide" );	 
			  },
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		self.activated_easy_filter = 1;
		/*if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
	    	$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}*/
		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/request.php';

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

		switch($('#requests-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#requests-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#requests-page [name=sort]').data('direct', 0);
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
		  		console.log(url);
		  		self.data_array = JSON.parse( response.responseText );	
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
		  url: 'http://gurtom.mobi/like_add.php?id=' + vote_id,
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
				$('#supported').html(parseInt($('#supported').html())+1);
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
				  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=0&obj=5",
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
			  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=5",
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
					                        <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
			                        <img src="http://' + one_voting.img + '" />\
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
				self.current_collect_cash(  data_for_build, 0, type_trigger)
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
		$.mobile.loading( "show", {  theme: "z"	});

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
    			break;
    		case "3":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
    			break;
    		case "4":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "REQUESTS.stars_action(this)"></span>\ ';
    			break;
    	}

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
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

    	var nko_parts = '';
		jQuery.each(data_for_build.nco_list, function(i, one_nko) {
			nko_parts += '<li>\
		                    <div>\
		                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
		                    </div>\
		                </li>\ '; 
    	});

		if(SUPER_PROFILE.id == data_for_build.creator_id){
			var nco_button = '<div class="nko-btn">\
			                    <a class="ui-btn ui-corner-all ui-shadow" onclick = "$.mobile.navigate(\'#nko-page?request=' + data_for_build.id + '\')" href="#">Выбрать НКО</a>\
			                </div>\
			                <div class="nko-status red">\
			                    НКО не выбран\
			                </div>';
		}else{
			var nco_button = '';
		}

    	if(flag_selected == 1){
    		var ui_donate_panel = '<div class="ui-grid-a">\
			                        <div class="ui-block-a">\
			                            <div>\
			                                <label>Choose Personal Fund</label><select name="pif">\
			                                ' + ui_pif_option + '\
			                                </select>\
			                            </div>\
			                        </div>\
			                        <div class="ui-block-b">\
			                            <div class="text-field">\
			                                <label>Amount of money</label>\
			                                <div class="ui-input-text">\
			                                    <input type="text" name="amount" data-enhanced="true" />\
			                                </div>\
			                            </div>\
			                        </div>\
			                    </div>\
			                    <div class="ui-grid-solo">\
			                        <div class="ui-block-a">\
			                            <button onclick = "REQUESTS.donate(\'request\', ' + data_for_build.id + ', 5)" class="ui-btn ui-corner-all ui-shadow donate-btn">Donate</button>\
			                        </div>\
			                        <div class="ui-block-a center">\
			                            <div class="ui-checkbox">\
			                                <label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">Anonymous donation</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
			                            </div>\
			                        </div>\
			                    </div>\
			                </div>\ ';
    	}else{
    		var ui_donate_panel = '';
    		if(PIF.pif_array.length == 0){
    			
    			PIF.set_select_input('#request-page', 'REQUESTS', 'request', data_for_build.id, 5, data_for_build.currency_asking);
    		}
    		if(SUPER_PROFILE.auth == true){
    			ui_donate_panel = '<span>' + LOCALE_ARRAY_ADDITIONAL.warning_donate[CURRENT_LANG] +' <a href = "#my-fund-page">My funds</a></span>';
    		}else{
    			ui_donate_panel = '<span>Please register for donate. <a href = "#registration">Registration</a></span>';
    		}
    	}

    	var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
			        <h1>\
			            ' + LOCALE_ARRAY_ADDITIONAL.request[CURRENT_LANG] + '\
			        </h1>\
			        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-help">Ask</a>\
			        <div id="request-help" class="help-popup" data-role="popup" data-history="false">\
			            <div class="title">\
			                Description\
			            </div>\
			            <div class="text">\
			                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
			            </div>\
			        </div>\
			    </div>\
			    <div role="main" class="ui-content">\
			        <div id = "request-item" class="request-item">\
			        <div class="img">\
		                <img width="100%" src="http://' + data_for_build.img + '" />\
		            </div>\
		            <div class="request-item-inner">\
		                <div class="stars-wrap">\
		                    ' + stars_ui + '\
		                </div>\
		                <div class="id">\
		                    ID: <strong>' + data_for_build.id + ' : ' + data_for_build.title + '</strong>\
		                </div>\
		                <div class="benitsifiar">\
		                    <span class="bg">Беницифиар @<strong>' + data_for_build.beneficiary + '</strong></span>\
		                </div>\
		                <div class="username">\
		                    ' + LOCALE_ARRAY_ADDITIONAL.by[CURRENT_LANG] + ' @<strong>' + data_for_build.creator_id + ' ' + data_for_build.author + '</strong>\
		                </div>\
		                <div class="status yellow">\
		                    ' + LOCALE_ARRAY_ADDITIONAL.collect_cash_to[CURRENT_LANG] + ' 23.08.2015\
		                </div>\
		                <div class="total-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_asking[CURRENT_LANG] + '</span> - <strong>' + data_for_build.amount_asking + ' ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="amount up">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.amount_current[CURRENT_LANG] + '</span> - <strong><test id = "amount_up">' + data_for_build.amount_current + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="my-amount">\
		                    <span>' + LOCALE_ARRAY_ADDITIONAL.my_cash[CURRENT_LANG] + '</span> - <strong><test id = "my_amount_current">' + data_for_build.my_add + '</test> ' + PIF.get_currency_name_by_id( data_for_build.currency_asking ) + '</strong>\
		                </div>\
		                <div class="nko-list">\
		                    <div class="title">\
		                        Список текущих предложений <strong>НКО</strong>:\
		                    </div>\
		                    <ol>\
		                       ' + nko_parts + '\
		                    </ol>\
		                </div>\
		                ' + nco_button + '\
		                <div class="desc">\
		                    <div class="text">\
		                        ' + data_for_build.description + '\
		                    </div>\
		                    <div class="tag-list">\
		                        ' + ui_tags + '\
		                    </div>\
		                </div>\
		                <div class="discuss-btn">\
		                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.project_discussion_link +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
		                </div>\
		                <div class="btn-login-soc">\
		                    <button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
		                    <div class="social-wrap">\
		                        <div class="ui-grid-b">\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
		                            </div>\
		                            <div class="ui-block-a">\
		                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-b">\
		                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
		                            </div>\
		                            <div class="ui-block-c">\
		                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
		                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#history-page?item=request&id=' + data_for_build.id + '\'); ">История сбора средств</a>\
		                </div>\
		            </div>\
		        </div>\
    		</div>';
		
		//$('#vote-page').html(ui_string);
		//$.mobile.navigate("#vote-page");
		//$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#request-page').html('');
		$( ui_string ).appendTo( '#request-page' );
		$('#request-page').enhanceWithin();
		$('#request-page select').selectmenu().selectmenu("refresh", true);	
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
			                        <strong>' + one_nko.reg_name + '</strong> (<strong>ID</strong>:<span>' + one_nko.id + '</span>)<span class="phone">' + one_nko.reg_phone + '</span><span class="doc">' + one_nko.reg_doc + '</span><span class="addr">' + one_nko.reg_address + '</span>\
			                    </div>\
			                </li>\ '; 
	    	});
			var ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						        <h1>\
						            Список НКО\
						        </h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#program-nko-help">Ask</a>\
						        <div id="request-nko-help" class="help-popup" data-role="popup" data-history="false">\
						            <div class="title">\
						                Description\
						            </div>\
						            <div class="text">\
						                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
						            </div>\
						        </div>\
						    </div>\
						    <div role="main" class="ui-content">\
						        <div class="select-nko-wrap">\
						            <div class="title">\
						                Выберете <strong>НКО</strong> из текущих предложений:\
						            </div>\
						            <ol>' + nko_parts + '\
						            </ol>\
						            <div class="btn-save">\
						                <input type="submit" value="Сохранить" />\
						            </div>\
						        </div>\
						    </div>';
			$('#nko-page').html( ui_string ).enhanceWithin();
		}
	},
	set_nco: function(object_type, object_id, nco_id){
		$.ajax({
			url: "http://gurtom.mobi/nco_choice.php",
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
	        	console.log("saved ok");
	            //alert('okay');
	        }
		});
	},
	get_one_element: function(data_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			  url: 'http://gurtom.mobi/request.php?id=' + data_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		self.data_array = data_for_build;
			  		console.log(self.data_array);
			  		switch(data_for_build.status){
						case '0':
							self.current_collect_cash( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_collect_cash(  data_for_build, 0, type_trigger)
							break;
						case '2':
							self.current_collect_cash(  data_for_build, 0, type_trigger)
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
			url: "http://gurtom.mobi/fund_add_by_type.php",
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
	        		var response_data = JSON.parse(data.responseText);
	        		if(data.responseText.indexOf('error') == -1){
	        			alert(LOCALE_ARRAY_ADDITIONAL.donate_successfull[CURRENT_LANG]);
		        		$('#' + selector + '-page [name=pif] option[value=' + $('#' + selector + '-page [name=pif]').val() + ']').html($('#' + selector + '-page [name=pif]').val() + ' - ' + response_data[0].saldo);
		        		$('#' + selector + '-page #amount_up').html( parseInt( $('#' + selector + '-page #amount_up').html() ) + parseInt( amount ));
		        		$('#' + selector + '-page #my_amount_current').html( parseInt( $('#' + selector + '-page #my_amount_current').html() ) + parseInt( amount ) );
		        		$('#' + selector + '-page select').selectmenu().selectmenu("refresh", true);
	        			console.log("donate ok");
	        		}else{
	        			alert('There are no enough resources or fund is closed');
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
			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: 'http://gurtom.mobi/fund_public_cf.php?type=5&id=' + object_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		var funds_list = JSON.parse( response.responseText );
			  		console.log('request');	
			  		$.mobile.loading( "hide" );

			  		var ui_funds = '';
			  		var ui_cf = '';
			  		var main_currency = PIF.get_currency_name_by_id( funds_list[0].cur );

			  		jQuery.each(funds_list, function(i, one_fund) {		  			
			    		for (var i = 0; i < one_fund.cf.length; i++) {
			    			var currency_name = PIF.get_currency_name_by_id( one_fund.cf[i].currency );
			    			var cancel_span = '';
			    			if(one_fund.cf[i].user_id == SUPER_PROFILE.id){
				    			cancel_span = '<span style = "color: red; cursor: pointer;" onclick = "REQUESTS.return_donate(\'' + one_fund.id + '\',\'' + one_fund.cur + '\',\'' + one_fund.cf[i].saldo + '\',5,\'' + object_id + '\',\'#request-page?request=' + object_id + '\')">Cancel donate</span>';
				    			my_add += parseInt(one_fund.cf[i].saldo);
				    		}
			    			ui_cf += '<tr>\
				                        <td>' + cancel_span + ' ' + one_fund.cf[i].ts_modified + '</td>\
				                        <td>' + one_fund.cf[i].user_id + ' ' + one_fund.cf[i].fname + ' ' + one_fund.cf[i].lname + '</td>\
				                        <td><strong>' + one_fund.cf[i].saldo + '</strong> ' + currency_name + '</td>\
				                    </tr>';
			  			}
			    	});

			    	ui_funds += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
								        <h1 class="long-title">\
								            История сбора средств\
								        </h1>\
								        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'#request-page\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#request-history-help">Ask</a>\
								        <div id="request-history-help" class="help-popup" data-role="popup" data-history="false">\
								            <div class="title">\
								                Description\
								            </div>\
								            <div class="text">\
								                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure in\
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
								                         ' + main_currency + '</strong><span>Мой вклад</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-b">\
								                    <div class="amount up">\
								                        <strong>\
								                        ' + funds_list[0].amount_current + '\
								                         ' + main_currency + '</strong><span>Собранно на данный момент</span>\
								                    </div>\
								                </div>\
								                <div class="ui-block-c">\
								                    <div class="total-amount">\
								                        <strong>\
								                        ' + funds_list[0].amount_asking + '\
								                        ' + main_currency + '</strong><span>Нужное количество</span>\
								                    </div>\
								                </div>\
								            </div>\
								            <table>\
								                <thead>\
								                    <tr>\
								                        <td>\
								                            Дата и время\
								                        </td>\
								                        <td>\
								                            ФИО\
								                        </td>\
								                        <td>\
								                            Сумма\
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
			url: "http://gurtom.mobi/fund_return_by_type.php",
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
        		console.log(return_page);
        		PIF.get_pif_array(true);
        		$.mobile.navigate(return_page);
	            //alert('okay');
	        }
		});
	}	
	/*delete_voting: function(voting_id, return_page){
		$.ajax({
		  url: 'http://gurtom.mobi/mc_rm.php?id=' + voting_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  	 console.log("Deleted id:" + voting_id);
		  	 $.mobile.navigate(return_page);  	
		  },
		});
	},*/
};

var funds = {
    currency : {
        "1" : "ICAN",
        "980" : "UAH",
        "840" : "USD",
        "978" : "EUR"
    },
    init : function(callback_function){
    	var self = this;
        $.ajax({
            url: "http://gurtom.mobi/fund_user.php",
            type: "GET",
            crossDomain: true,
            xhrFields: {
               withCredentials: true
            },
            complete: function(data){
                self.arr = JSON.parse(data.responseText);
                self.build_page(self.arr);
                if(callback_function){
                	console.log('callback');
                	callback_function();
                	
                }
            }
        });
    },
    get : function( ){
        alert('repare this');
    },
    build_fund : function(fund){
        var currency_str = this.currency[fund.currency];
        var saldo = 0;
        if(fund.saldo){
        	saldo = fund.saldo;
        }
        if(fund.id){
        	var fund_id = fund.id;
        }else{
        	var fund_id = fund.fund_id;
        }

        var fund_str = '<div style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#balances-pif-page?fund=' + fund_id+ '\')" class="item ui-corner-all">'+
	                        '<div class="pif-num">\
			                    '+fund_id+'\
			                </div>\
			                <div class="sum">\
			                    '+saldo+' '+PIF.get_currency_name_by_id(fund.currency)+'\
			                </div>\
                    	</div>';
        return fund_str;
    },
    build_fund_select : function(fund){
        var fund_select_str = '<option value="'+fund.id+'">PIF ID '+fund.id+' Остаток '+fund.saldo+'</option>';
        return fund_select_str;
    },
    update_pay_button : function(id){
        var self = this;
        $.ajax({
            url: "http://gurtom.mobi/sn/donation.php?fund_id="+id,
            type: "GET",
            crossDomain: true,
            xhrFields: {
               withCredentials: true
            },
            complete: function(data){
            	if(data.responseText.indexOf('Incorrect') > -1){
            		self.set_pay_button('');
            	}else{
            		self.set_pay_button(data.responseText);
            	}
            }
        });
        
    },
    set_pay_button : function(button_html){
         $("#my-fund-page .center").html(button_html);
    },
    create_fund : function(currency){
    	var self = this;
    	if(confirm(LOCALE_ARRAY_ADDITIONAL.create_fund_question[CURRENT_LANG])){
    		$.ajax({
	            url: "http://gurtom.mobi/fund_user_add.php?currency="+currency,
	            type: "GET",
	            crossDomain: true,
	            xhrFields: {
	               withCredentials: true
	            },
	            complete: function(data){
	                try{
	                    var funds = JSON.parse(data.responseText);
	                    var fund = self.build_fund(funds[0]);
	                    $('#my-fund-page .fund-list').append(fund);
	                    $('#my-fund-page #select_pif').append('<option data-currency = "' + funds[0].currency + '" value = ' + funds[0].fund_id + '>#' + funds[0].fund_id + ' 0 ' + PIF.get_currency_name_by_id(funds[0].currency) + '</option>');
	                }
	                catch(e){
	                    alert("Error");
	                    return ;
	                }
	                alert("Ok");
	            }
	        });
    	}
        
    },
    build_page : function(data){
        var self = this;
        if(!data){
          data = self.arr;
        }

        var build_string_list = "";
        var build_string_select = '<label>Choose Personal Fund</label><select id="select-pay-block">';
        jQuery.each(data,function(i , one_data){
            build_string_list += self.build_fund(one_data);
            build_string_select += self.build_fund_select(one_data);

        });
        build_string_select += '</select>';
        $(".fund-list").html(build_string_list);
        $(".fund-list").next().find("form .select-field").html(build_string_select);
        $("#select-pay-block").selectmenu().selectmenu("refresh", true);
        $("#select-pay-block").change(function(){
            self.update_pay_button($(this).val());
        });
        var create_select = '<label>Выберите тип валюты</label><select name="">';
        jQuery.each(self.currency,function(i , one_data){
            create_select += '<option value="'+i+'">'+one_data+'</option>';
        });
        create_select += '</select>';
        $("#choose_currency_div").html(create_select);
        $("#choose_currency_div select").selectmenu().selectmenu("refresh", true);
        /*$("#choose_currency_div").next().find("[type=submit]").click(function(){
            var currency = $("#choose_currency_div select").val();
            self.create_fund(currency);
            return false;
        });*/
    },
    current_fund_history: function(){
    	if(location.href.indexOf('#balances-pif-page?fund=') > -1){
			var match_array = location.href.match(/=[a-zA-Z0-9а-яА-Я]*/i);
			var fund_id = match_array[0].match(/[^=][0-9]*/i);
			var url = 'http://gurtom.mobi/fund_user_cf.php?fund_id=' + fund_id;

			$.ajax({
			  url: url,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		//console.log(response);
			  		var fund_array  = JSON.parse( response.responseText );
			  		if(fund_array.length == 0){
			  			$('#balances-pif-page #content_table').html( '<center><h2>' + LOCALE_ARRAY_ADDITIONAL.no_pif_history[CURRENT_LANG] + '</h1></center>' ).enhanceWithin();
			  		}else{
			  			console.log( fund_array );
					  		$.mobile.loading( "hide" );
					  		var ui_elements = '';

					  		jQuery.each(fund_array, function(i, one_fund) {
								switch(one_fund.type){
									case '0':
										var general_span = '<span>(Пожертвование - Personal Fund ' + fund_id + ')</span>';
										break;
									case '1':
										var general_span = '<span>(Пожертвование - Personal Fund ' + fund_id + ')</span>';
										break;
									case '2':
										var general_span = '<span>(Personal Fund ' + fund_id + ' - Программа ' + one_fund.fund_id + ')</span>';
										break;
									case '3':
										var general_span = '<span>(Personal Fund ' + fund_id + ' - Проектное предложение ' + one_fund.fund_id + ')</span>';
										break;
									case '4':
										var general_span = '<span>(Personal Fund ' + fund_id + ' - Проект ' + one_fund.fund_id + ')</span>';
										break;
									case '5':
										var general_span = '<span>(Personal Fund  ' + fund_id + ' - Заявка ' + one_fund.fund_id + ')</span>';
										break;
								}
								switch(one_fund.cur){
					    			case "1":
					    				var currency_name = "ICAN";
					    				break;
					    			case "980":
					    				var currency_name = "UAH";
					    				break;
					    			case "840":
					    				var currency_name = "USD";
					    				break;
					    			case "978":
					    				var currency_name = "EUR";
					    				break;
					    		}
					    		if(one_fund.r){
					    			var additional_span = '<span style = "cursor: pointer;" class = "yellow" onclick = "funds.cancel_fund(\'' + one_fund.fund_id + '\',\'' + one_fund.cur + '\',\'' + one_fund.type + '\',\'' + one_fund.id + '\');">Отменить</span> ';
					    		}else{
					    			var additional_span = '';
					    		}
								ui_elements += '<tr>\
								                    <td>\
								                        <div class="date">\
								                            ' + one_fund.dts + '\
								                        </div>\
								                        <div class="pif">\
								                         '  + additional_span + general_span + '\
								                        </div>\
								                    </td>\
								                    <td>\
								                        <div class="price">\
								                          ' +  one_fund.amount + ' ' + currency_name + '\
								                        </div>\
								                    </td>\
								                </tr>';
					    	});
						$('#balances-pif-page #content_table').html( ui_elements ).enhanceWithin();
			  		}
			  }
			});
		}
    }, 
    cancel_fund: function(fund_id, currency, type, id){
    	var amount = prompt("Введите сумму", "");
    	if(amount){
    		$.ajax({
			  url: 'http://gurtom.mobi/fund_return_by_type.php?fund_id=' + fund_id + '&currency=' + currency + '&amount=' + amount + '&type=' + type + '&id=' + id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		
			  }
			});
    	}
    },
    set_pif_options_transaction_page: function(page){
    	var self = this;
    	var options = '';
    	jQuery.each(PIF.pif_array, function(i, one_pif) {
    		options += '<option data-currency = "' + one_pif.currency + '" value = ' + one_pif.id + '>#' + one_pif.id + ' ' + one_pif.saldo + ' ' + PIF.get_currency_name_by_id(one_pif.currency) + '</option>';
    	});
    	$(page + ' #select_pif').html(options);
    	if(location.href.indexOf(page) > -1){
    		$(page + ' select').selectmenu().selectmenu("refresh", true);
    	}
    	if(page == '#my-fund-page'){
    		self.update_pay_button($(page + ' #select_pif').val());
    	}
    },
    set_cash: function(){
    	if(confirm(LOCALE_ARRAY_ADDITIONAL.transaction_question[CURRENT_LANG])){
    		$.ajax({
				url: "http://gurtom.mobi/fund_user_user.php",
		        type: "POST",
		        data: {"fund_id": $('#transaction-page [name=fund_id]').val(),
		    		   "currency": $('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').data('currency'),
		    		   "amount": $('#transaction-page [name=amount]').val(),
		    		   "user_id": $('#transaction-page [name=user_id]').val()},
		        crossDomain: true,
		        xhrFields: {
			       withCredentials: true
			    },
		        complete: function(data){
		        	if(data){
		        		var response_data = JSON.parse(data.responseText);
		        		alert(LOCALE_ARRAY_ADDITIONAL.transaction_okay[CURRENT_LANG]);
		        		$('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').html('#' + $('#transaction-page [name=fund_id]').val() + ' ' + response_data[0].saldo + ' ' + PIF.get_currency_name_by_id( $('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').data('currency') ) );
		        		$('#my-fund-page #select_pif option[value=' + $('#transaction-page [name=fund_id]').val() + ']').html('#' + $('#transaction-page [name=fund_id]').val() + ' ' + response_data[0].saldo + ' ' + PIF.get_currency_name_by_id( $('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').data('currency') ) );
		        		$('#transaction-page select').selectmenu().selectmenu("refresh", true);
		        		$('#my-fund-page select').selectmenu().selectmenu("refresh", true);
		        		console.log("saved ok");
		        	}
		        }
			});
    	}
    }
};

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

			$.mobile.loading( "show", {  theme: "z"	});

			if(location.href.indexOf('#weighted-votings-page?program=') > -1){
				var match_array = location.href.match(/#weighted-votings-page\?program=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/weighted_votings.php?program_id=' + object_id;
				$('#weighted-votings-page #ui_title').html('Weighted votings');
				$('#weighted-votings-page #create_voting_link').attr('style','display: block');
				$('#weighted-votings-page #create_voting_link').attr('onclick', "$.mobile.navigate(\'#create-item?weighted_voting=true&item=" + object_id + "\')");
			}else{
				if(location.href.indexOf('#weighted-votings-page?my=1') > -1){
					$('#weighted-votings-page #ui_title').html('My weighted votings');
					$('#weighted-votings-page #create_voting_link').attr('style','display: none');
					var url = 'http://gurtom.mobi/weighted_votings.php?my=1';
				}else if(location.href.indexOf('#weighted-votings-page?my=2') > -1){
					$('#weighted-votings-page #ui_title').html('Weighted votings');
					$('#weighted-votings-page #create_voting_link').attr('style','display: block');
					var url = 'http://gurtom.mobi/weighted_votings.php?my=2';
				}
			}
			if(location.href.indexOf('#weighted-vote-page?vote=') > -1){
				var match_array = location.href.match(/#weighted-vote-page\?vote=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/weighted_votings.php?id=' + object_id;
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
			  		self.votings_array = JSON.parse( response.responseText );
			  		if(self.votings_array.length == 0 && self.activated_hard_filter == 1){
			  			alert(LOCALE_ARRAY_ADDITIONAL.no_data[CURRENT_LANG]);
			  		}	
			  		console.log( self.votings_array );
			  		$.mobile.loading( "hide" );
			  		self.check_current_url( 1 );
			  		self.build_elements();
			  		$('#weighted-votings-page #activated_filter').css('display', 'none'); 
			  		$('#weighted-votings-page #solo_filter').css('display', 'block');	 	
			  },
			});
		}
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		console.log(name_sphere);
		self.activated_easy_filter = 1;
		if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
	    	$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}
		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/weighted_votings.php?';

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
		

		switch($('#weighted-votings-page [name=sort]').data('direct')){
			case 0:
				url += '&direct=0';
				$('#weighted-votings-page [name=sort]').data('direct', 1);
				break;
			case 1:
				url += '&direct=1';
				$('#weighted-votings-page [name=sort]').data('direct', 0);
				break;
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
		  		//console.log(response);
		  		self.votings_array = JSON.parse( response.responseText );	
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
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			if(location.href.indexOf('#weighted-votings-page?program=') > -1){
				var match_array = location.href.match(/#weighted-votings-page\?program=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/weighted_votings.php?program_id=' + object_id + '&ls=' + self.voting_last_item;
				$('#weighted-votings-page #ui_title').html('Weighted votings');
				$('#weighted-votings-page #create_link').attr('style','display: none');
				var return_to = '#program-page?program=' + object_id;
			}else{
				$('#weighted-votings-page #ui_title').html('My weighted votings');
				$('#weighted-votings-page #create_link').attr('style','display: block');
				var url = 'http://gurtom.mobi/weighted_votings.php?my=1&ls=' + self.voting_last_item;
			}

			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: url,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		//console.log(response);
			  		
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( self.votings_array );			  		
			  		if(query_array.length > 0){
			  			self.votings_array = self.votings_array.concat(query_array);
			  			self.voting_last_item += query_array.length;
				  		//self.check_current_url( 1 );
				  		self.build_elements( 0, true,  query_array);
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
				  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=0&obj=6",
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
			  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=6",
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
				                    <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
			                        <img src="http://' + one_voting.img + '" />\
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
		$.mobile.loading( "show", {  theme: "z"	});
		for (var k = 0; k < SPHERES.spheres.length; k++) {
			if(SPHERES.spheres[k].type == parseInt( data_for_build.type ) ){
				var type_sphere = SPHERES.spheres[k].name;
				break;
			}
		}

    	if(SUPER_PROFILE.id == data_for_build.author_id && data_for_build.vote_no == "0" && data_for_build.vote_nth == "0" && data_for_build.vote_yes == "0"){
    		console.log('1111111111111');
    		var delete_button = '<div class="delete_vote_button">\
								    <a onclick = "WEIGHTED_VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#weighted-votings-page?my=1\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
    	}else{
    		console.log('rrrrrrrrrrr');
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
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "3":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "4":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    	}

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
    	var ui_tags = '';
    	if(tags_array){
    		jQuery.each(tags_array, function(i, one_tag) {
				ui_tags += '<span style = "cursor: pointer;" onclick = "$.mobile.navigate(\'#weighted-votings-page?tags_filter=' + one_tag.trim() + '\');">' + one_tag + '</span>';
	    	});	
    	}

    	var ui_string = '';
		ui_string += '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
							        <h1>' + LOCALE_ARRAY_ADDITIONAL.weighted_vote[CURRENT_LANG] + '</h1>\
							        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
							                <img width="100%" src="http://' + data_for_build.img + '" />\
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
							                    ' + LOCALE_ARRAY_ADDITIONAL.share[CURRENT_LANG] + '  - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
							                </div>\
							                <div class="num-votes-support">\
							                    ' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + status_vote +  							              
							                '<div class="desc">' + data_for_build.description + ' </div>\
							                <div class="tag-list">\
						                      ' + ui_tags + '\
						                    </div>\
							                <div class="discuss-btn">\
							                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
							                </div>\
							                <div class="btn-login-soc">\
							                    <button class="ui-btn ui-corner-all ui-shadow share-btn"> ' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
							                    <div class="social-wrap">\
							                        <div class="ui-grid-b">\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                        </div>\
							                    </div>\
							                </div>\
							                <div class="sms-btn">\
							                    <a class="ui-btn ui-corner-all ui-shadow" href="#">SMS</a>\
							                </div>' + delete_button + '\
							            </div>\
							        </div>\
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
				status_current_voting = 'You Vote YES';
				checked_yes = 0;
				break;
			case 3:
				selected_class_abstain = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote ABSTAINED';
				checked_abstain = 0;
				break;
			case 2:
				selected_class_no = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote NO';
				checked_no = 0;
				break;
			default:
				status_current_voting = 'You didn\'t vote';
		}

    	if(data_for_build.user_vote_open == "1"){
    		selected_class_checkbox = ' ui-checkbox-on ';
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' Open';
    		}
    	}else{
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' is anonymous';
    		}    		
    	}

    	var percents_object = self.get_percents_values(data_for_build.vote_yes, data_for_build.vote_nth, data_for_build.vote_no);
    	var voting_buttons = '';
    	var status_vote = '';

    	var tags_array = data_for_build.tags.match(/[^,][a-zA-Z0-9а-яА-Я]*/ig);
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
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "WEIGHTED_VOTINGS.stars_action(this)"></span>\ ';
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
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "$.mobile.navigate(\'#weighted-votings-page?program=' + data_for_build.program_id + '\')" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
						                <img width="100%" src="http://' + data_for_build.img + '" />\
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
						                </div>' + status_vote + 
						                '<div class="desc">' + data_for_build.description + ' </div>\
						                <div class="tag-list">\
					                      ' + ui_tags + '\
					                    </div>\
						                <div class="discuss-btn">\
						                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(' + data_for_build.chat +  '); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
						                </div>\
						                <div class="btn-login-soc">\
						                    <button data-role="button" class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
						                    <div class="social-wrap">\
						                        <div class="ui-grid-b">\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
						                </div>\ ' + voting_buttons +  ' <div class="btn-next-page">\
						                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = "$.mobile.navigate(\'#voters-page?voting=' + data_for_build.id + '\'); WEIGHTED_VOTINGS.get_open_voters_list(' + data_for_build.id + ');">' + LOCALE_ARRAY_ADDITIONAL.view_list_public_voters[CURRENT_LANG] + '</a>\
						                </div>' + delete_button + '\
						            </div>\
						        </div>\
						    </div></div>';

		//self.build_circle_chart();
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#weighted-vote-page?vote=" + data_for_build.id);
		$('#weighted-vote-page').html('');				    
		$( ui_string ).appendTo( '#weighted-vote-page' );

		$('#weighted-vote-page').enhanceWithin();
		console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
				switch(data_for_build.user_vote){
	    			case '1':
	    				$('#weighted-vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
	    				$('#weighted-vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
	    				$('#weighted-vote-page .ui-btn.btn-yes').data('checked', 0);
	    				console.log('yeeees');
	    				break;
	    			case '3':
	    				$('#weighted-vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
	    				$('#weighted-vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
	    				$('#weighted-vote-page .ui-btn.btn-abstain').data('checked', 0);
	    				console.log('abstained');
	    				break;
	    			case '2':
	    				$('#weighted-vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
	    				$('#weighted-vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
	    				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
	    				console.log('minus');
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
    	console.log('test3');
    	if(!data_for_build){

    		data_for_build = self.get_one_element(object_id, type_trigger);

    		return false;
    	}
    	switch(data_for_build.status){
			case '1':
				self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
				break;
			case '0':
				self.current_vote_page_voting_period(  data_for_build, 0, type_trigger);
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
			  url: 'http://gurtom.mobi/weighted_votings.php?id=' + vote_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		console.log('data_for_build');
			  		console.log(data_for_build);
			  		switch(data_for_build.status){
						case '0':
							self.current_vote_page_voting_period( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_vote_page_voting_period(  data_for_build, 1, type_trigger);
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
				status_current_voting = 'You Vote YES';
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#weighted-vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#weighted-vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote ABSTAINED';
			}else if($('#weighted-vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#weighted-vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#weighted-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote NO';
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
	    		status_current_voting = 'You didn\'t vote';
				var vote = 0;
			}
			if($('#weighted-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
				var open_name = 1;
				if(vote != 0){
					status_current_voting += ' Open';
				}
			}else{
				var open_name = 0;
				if(vote != 0){
					status_current_voting += ' is anonymous';
				}
			}
			$('#weighted-vote-page .selected-text').html( status_current_voting );
			$.ajax({
			  url: 'http://gurtom.mobi/weighted_vote_add.php?wv_id=' + object_id + '&vote=' + vote + '&open=' + open_name,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		self.get_one_element(object_id);
			  		console.log('ok');  	
			  },
			});
		}, 100);
	},
	delete_voting: function(voting_id, return_page){
		$.ajax({
		  url: 'http://gurtom.mobi/weighted_voting_rm.php?wv_id=' + voting_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  	 console.log("Deleted id:" + voting_id);
		  	 $.mobile.navigate(return_page);  	
		  },
		});
	},
	get_open_voters_list:function(vote_id, idu_input){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		var filter_id = '';
		if(idu_input){
			filter_id = '&idu=' + $(idu_input).val();
		}
		$.ajax({
		  url: 'http://gurtom.mobi/weighted_vote_open.php?id=' + vote_id + filter_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.voters_list = JSON.parse( response.responseText );
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
					        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
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
					                    <input id = "filter_input" onkeyup="WEIGHTED_VOTINGS.get_open_voters_list(\'' + vote_id + '\', this)" type="search" name="" placeholder="Search" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
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
		                        <img src="http://' + one_voter.avatar + '" />\
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
		

		//$.mobile.navigate("#voters-page?voting=" + vote_id);
		$('#voters-page').html('');
		$( ui_string ).appendTo( '#voters-page' );
		$('#voters-page').enhanceWithin();
	}
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

var TRUST_LIST = {
	trust_array: [],
	trust_last_item: 10,
	init: function(next_used, parameter){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		if(parameter){
			if(parameter == 's'){
				var url = 'http://gurtom.mobi/trust.php';					
			}else if(parameter == 'p_s'){
				var url = 'http://gurtom.mobi/trust.php?p_s=1';
			}
		}else{
			if(next_used){
				if($('#trusted_checkbox').hasClass('ui-checkbox-off')){
					var url = 'http://gurtom.mobi/trust.php';					
				}else{
					var url = 'http://gurtom.mobi/trust.php?p_s=1';
				}
			}else{
				if($('#trusted_checkbox').hasClass('ui-checkbox-on')){
					var url = 'http://gurtom.mobi/trust.php';					
				}else{
					var url = 'http://gurtom.mobi/trust.php?p_s=1';
				}
			}
		}
		if($('#trust-list #searched_string').val() != ''){
			if(url.indexOf('?') > -1){
				url += "&s="  + $('#trust-list #searched_string').val();
			}else{
				url += "?s="  + $('#trust-list #searched_string').val();
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
	  		//console.log(response);
	  		self.trust_array = JSON.parse( response.responseText );
	  		console.log('trust');	
	  		console.log(self.trust_array);
	  		self.build_elements();
	  		self.set_spheres_and_listeners();
	  		SPHERES.initial();
	  		$.mobile.loading( "hide" );	
		  },
		});
	},
	reinit: function(){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		if($('#trusted_checkbox').hasClass('ui-checkbox-on')){
			var url = 'http://gurtom.mobi/trust.php?p_s=1&ls=' + self.trust_last_item;			
		}else{
			var url = 'http://gurtom.mobi/trust.php?ls=' + self.trust_last_item;
		}
		if($('#trust-list #searched_string').val() != ''){
				url += "&s="  + $('#trust-list #searched_string').val();
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
	  		var query_array = JSON.parse( response.responseText );
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
					                <div class="avatar">\
					                    <img src="http://' + one_trust.img + '" />\
					                </div>\
					                <div class="osmd-list">';
			var type_sphere = '';
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
		    	elements_string += '<div>' + type_sphere + sphere + subtype + '</div>';
				
			}
			elements_string +=     '</div>\
									<div class="ui-grid-a">\
					                    <div class="ui-block-a">\
					                        <div class="id">\
					                            ID:' + one_trust.id + '\
					                        </div>\
					                        <div class="name">\
					                            ' + one_trust.name + '\
					                        </div>\
					                        <a class="ui-btn ui-corner-all" href="#" onclick = "$.mobile.navigate(\'#spheres-trust-vote\'); TRUST_LIST.set_spheres_for_trust(\'' + one_trust.id + '\');">' + LOCALE_ARRAY_ADDITIONAL.trust_vote[CURRENT_LANG] + '</a>\
					                    </div>\
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
			elements_string +=             '</div>\
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
			elements_string +=         '    </div>\
										</div>\
					                </div>\
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
			        			ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc +  '" selected>' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';
				        		stop_flag = 1;
				        		break;
				        	}
			        	} 
			        	if(stop_flag != 1){
			        		ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc +  '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';
			        	}
			        }

			        ui_string +=  '</select>\
			                    </div>';
				}else{
					//console.log('equal more than one');
					var varable = '#spheres-trust-vote #' + SPHERES.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "TRUST_LIST.show_mini_spheres(\'' + varable + '\');">\
			                        <select disabled class = "container"  name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
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
				        			ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +  '" selected>' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';
					        		stop_flag = 1;
				        			break;
					        	}
			        		}
			        		if(stop_flag != 1){
				        		ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +  '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';
				        	}		        		
				        	
				        }
				        ui_string +=  '</select>\
			                    </div>'; 
			        }
			        ui_string += '</div>';	
				}
			}
		}
		ui_string += '</fieldset>\
			            <div class="btn-save">\
			                    <input type="submit" value="Save" class="ui-btn ui-btn-corner-all ui-shadow" />\
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
		console.log( 'spheres trust' );
		console.log( SPHERES.spheres_array );
		for ( var i = 0; i < SPHERES.spheres.length; i++ ) {
			if(SPHERES.spheres[i].objects.length > 0){
				if(SPHERES.spheres[i].objects[0].org == ''){
					//console.log('equal one');
					ui_string += '<div class = "content_value">\
			                        <select  onchange = "history.back()" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
			                            <option>' + SPHERES.spheres[i].name + '</option>';
			        
			        for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
			        	ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc +  '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';		        	
			        }

			        ui_string +=  '</select>\
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
			                        <select  onchange = "history.back()"  data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
			                            <option>' + SPHERES.spheres[i].objects[k].org + '</option>';
				        
				        for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
							ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +  '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';			        	
				        }
				        ui_string +=  '</select>\
			                    </div>'; 
			        }
			        ui_string += '</div>';
			    }				
			}
		}
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

		var spheres_option_selected = $('#spheres-trust-vote #sphere_form .content_value option:selected')
		for (var i = 0; i < spheres_option_selected.length; i++) {
			self.save_sphere(id_user, $(spheres_option_selected[i]).val());
		}
		console.log('was saved');
		//alert('сохранено!');
		//$.mobile.navigate("#edit-address");
	},
	delete_sphere: function(id_sphere_trust){
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: ' http://gurtom.mobi/trust_rm.php?tid=' + id_sphere_trust,
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
	save_sphere: function(id_user, id_sphere){
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/trust_add.php?t=' + id_user + '&s=' + id_sphere,
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
};

var SPHERES = {
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
			  {name: "Political Parties, Public organizations",
			  selector_name: "public_organization",
			  type: 4,
			  objects: []},
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
			  /*{name: "Candidates\' rating (Public proposal)",
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
	initial: function(callback_function){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		self.spheres[0].name =  LOCALE_ARRAY_ADDITIONAL.votings_by_sphere[CURRENT_LANG];
		self.spheres[1].name =  LOCALE_ARRAY_ADDITIONAL.local_self_goverments_indicative[CURRENT_LANG];
		self.spheres[2].name =  LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG];
		self.spheres[3].name =  LOCALE_ARRAY_ADDITIONAL.type_public_orrganization[CURRENT_LANG];
		self.spheres[4].name =  LOCALE_ARRAY_ADDITIONAL.type_primaries[CURRENT_LANG];
		self.spheres[5].name =  LOCALE_ARRAY_ADDITIONAL.elections[CURRENT_LANG];
		self.spheres[6].name =  LOCALE_ARRAY_ADDITIONAL.type_maidan[CURRENT_LANG];
		/*self.spheres[7].name =  LOCALE_ARRAY_ADDITIONAL.candidates_proposal[CURRENT_LANG];
		self.spheres[8].name =  LOCALE_ARRAY_ADDITIONAL.candidates_parties[CURRENT_LANG];
		self.spheres[9].name =  LOCALE_ARRAY_ADDITIONAL.local_self_goverments[CURRENT_LANG];*/
		if(SPHERES.spheres_array.length == 0){
			$.ajax({
				  url: 'http://gurtom.mobi/filter.php',
				  type: "GET",
				  xhrFields: {
			       withCredentials: true
			      },
		          crossDomain: true,
				  complete: function( response ){
				  		self.spheres_array = JSON.parse( response.responseText );	
				  		self.normalize_array();
				  		if(location.href.indexOf('#spheres-filters') > -1){
				  			self.set_spheres_filters();
				  			$('#spheres-filters #sphere_form select').selectmenu().selectmenu("refresh", true);
				  		}
				  		if(location.href.indexOf('#spheres-address') > -1){
				  			self.set_spheres_and_listeners();				  			
				  			$('#spheres-address #sphere_form select').selectmenu().selectmenu("refresh", true);
				  			$('#spheres-address').enhanceWithin();
				  		}
				  		if(location.href.indexOf('#spheres-create-vote') > -1){
				  			self.set_spheres_create_vote();
				  			$('#spheres-create-vote #sphere_form select').selectmenu().selectmenu("refresh", true);
				  		}		
				  		$.mobile.loading( "hide" );
				  		
				  		if(callback_function)
				  			callback_function();
				  			  	
				  },
				});
		}else{
			if(location.href.indexOf('#spheres-filters') > -1){
	  			self.set_spheres_filters();
	  			console.log('#spheres-filters');
	  			$('#spheres-filters #sphere_form select').selectmenu().selectmenu("refresh", true);
	  		}
	  		if(location.href.indexOf('#spheres-address') > -1){
	  			self.set_spheres_and_listeners();
	  			console.log('#spheres-address');
	  			$('#spheres-address #sphere_form select').selectmenu().selectmenu("refresh", true);
	  			$('#spheres-address').enhanceWithin();
	  		}
	  		if(location.href.indexOf('#spheres-create-vote') > -1){
	  			self.set_spheres_create_vote();
	  			console.log('#spheres-create-vote');
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
			        		ui_string += '<option value = "' + self.spheres[i].objects[0].sph[j].idc +  '" selected>' + self.spheres[i].objects[0].sph[j].sphere + '</option>';
			        	}else{
			        		ui_string += '<option value = "' + self.spheres[i].objects[0].sph[j].idc +  '">' + self.spheres[i].objects[0].sph[j].sphere + '</option>';
			        	}
			        	
			        }

			        ui_string +=  '</select>\
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
				        		ui_string += '<option value = "' + self.spheres[i].objects[k].sph[j].idc +  '" selected>' + self.spheres[i].objects[k].sph[j].sphere + '</option>';
				        	}else{
				        		ui_string += '<option value = "' + self.spheres[i].objects[k].sph[j].idc +  '">' + self.spheres[i].objects[k].sph[j].sphere + '</option>';
				        	}
				        	
				        }
				        ui_string +=  '</select>\
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
		console.log("was saved");
		//alert('сохранено!');
		//$.mobile.navigate("#edit-address");
	},
	delete_sphere: function(id_sphere){
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/filter_fav_add.php?id=' + id_sphere + '&rm=1',
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
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/filter_fav_add.php?id=' + id_sphere,
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
			                        <select  onchange = "$.mobile.navigate(\'#filter-page\'); WEIGHTED_VOTINGS.filter_data($(this).val(), 0, \'' + SPHERES.spheres[i].selector_name + '\')" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
			                            <option>' + SPHERES.spheres[i].name + '</option>';
			        
			        for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
			        	ui_string += '<option value = "' + SPHERES.spheres[i].objects[0].sph[j].idc +  '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';		        	
			        }

			        ui_string +=  '</select>\
			                    </div>';
			    }else{
			    	//console.log('equal more than one');
					var varable = '#spheres-filters #' + SPHERES.spheres[i].selector_name + '_content';
					ui_string += '<div onclick = "SPHERES.show_mini_spheres(\'' + varable + '\');">\
			                        <select disabled class = "container" name="' + SPHERES.spheres[i].selector_name + '"><option value="' + SPHERES.spheres[i].name + '">' + SPHERES.spheres[i].name + '</option></select>\
			                    </div>';
			        ui_string += '<div id = "' + SPHERES.spheres[i].selector_name + '_content" style = "display:none;">';
			        for (var k = 0; k < SPHERES.spheres[i].objects.length; k++) {
			           ui_string += '<div class = "content_value">\
			                        <select  onchange = "$.mobile.navigate(\'#filter-page\'); WEIGHTED_VOTINGS.filter_data($(this).val(), 0, \'' + SPHERES.spheres[i].selector_name + '\')" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
			                            <option>' + SPHERES.spheres[i].objects[k].org + '</option>';
				        
				        for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
							ui_string += '<option value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +  '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';			        	
				        }
				        ui_string +=  '</select>\
			                    </div>'; 
			        }
			        ui_string += '</div>';
			    }				
			}
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
					                        <select  onchange = "$.mobile.navigate(\'#create-vote\'); $(\'#create-vote [name=sph]\').val($(this).val()); $(\'#create_vote_sphere\').html(\'' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + SPHERES.spheres[i].name + '\');" name = "' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
					                            <option>' + SPHERES.spheres[i].name + '</option>';
					        
					        for (var j = 0; j < SPHERES.spheres[i].objects[0].sph.length; j++) {
					        	ui_string += '<option data-checkbox = "1" value = "' + SPHERES.spheres[i].objects[0].sph[j].idc +  '">' + SPHERES.spheres[i].objects[0].sph[j].sphere + '</option>';		        	
					        }

					        ui_string +=  '</select>\
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
					                        <select  onchange = "$.mobile.navigate(\'#create-vote\'); $(\'#create-vote [name=sph]\').val($(this).val()); $(\'#create_vote_sphere\').html(\'' + LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + SPHERES.spheres[i].name + '\');" data-mini="true" name ="' + SPHERES.spheres[i].selector_name + '" data-native-menu="false">\
					                            <option>' + SPHERES.spheres[i].objects[k].org + '</option>';
						        
						        for (var j = 0; j < SPHERES.spheres[i].objects[k].sph.length; j++) {
									ui_string += '<option data-checkbox = "1"  value = "' + SPHERES.spheres[i].objects[k].sph[j].idc +  '">' + SPHERES.spheres[i].objects[k].sph[j].sphere + '</option>';			        	
						        }
						        ui_string +=  '</select>\
					                    </div>'; 
					        }
					        ui_string += '</div>';
		                }
						
					}
				}
				console.log('second');
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
};


var NEWS = {
	news_list: [],
	news_last_item: 10,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/news.php',
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
	  		//console.log(response);
	  		self.news_list = JSON.parse( response.responseText );
	  		self.build_elements();
	  		$.mobile.loading( "hide" );	
		  },
		});
	},
	reinit: function(){
		var self = this;
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/news.php?ls=' + self.news_last_item,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
	  		//console.log(response);
	  		var query_array = JSON.parse( response.responseText );
	  		if(query_array.length > 0){
	  			self.news_list = self.news_list.concat(query_array);
	  			self.build_elements(true, query_array);
	  			self.news_last_item += query_array.length;
	  		}	  		
	  		$.mobile.loading( "hide" );	
		  },
		});
	},
	build_elements: function(reinit, reinit_array){
		var self = this;
		var elements_string = '';
		if(reinit){
			var build_array = reinit_array;
		}else{
			var build_array = self.news_list;
		}
		jQuery.each(build_array, function(i, one_news) {
			var onclick_event = '';
			switch( parseInt(one_news.type) ){
				case 2:
					onclick_event = 'style = "cursor:pointer" onclick = "$.mobile.navigate(\'#program-page?program=' + one_news.link + '\')"';
					break;
				case 3:
					onclick_event = 'style = "cursor:pointer" onclick = "$.mobile.navigate(\'#project-page?project_proposition=' + one_news.link + '\')"';
					break;
				case 4:
					onclick_event = 'style = "cursor:pointer" onclick = "$.mobile.navigate(\'#project-page?project=' + one_news.link + '\')"';
					break;
				case 5:
					onclick_event = 'style = "cursor:pointer" onclick = "$.mobile.navigate(\'#request-page?request=' + one_news.link + '\')"';
					break;
				case 6:
					onclick_event = 'style = "cursor:pointer" onclick = "$.mobile.navigate(\'#weighted-vote-page?vote=' + one_news.link + '\')"';
					break;
			}
			elements_string += '<div ' + onclick_event + ' class="item ui-corner-all news-icon news-icon-num-' + (parseInt(one_news.type)) + '">\
					                <div class="img">\
					                	<object type="image/svg+xml" data="http://' + one_news.img + '">Your browser does not support SVG</object>\
					                </div>\
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
    	if(reinit){
    		$('#news-page #news_list').append(elements_string);
    	}else{
    		$('#news-page #news_list').html(elements_string);
    	}
	},
}; 

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

			console.log('half_filtered');
			console.log(half_filtered_array);
			self.filtered_array = [];
			
			jQuery.each(half_filtered_array, function(i, one_voting) {
				if(self.start_date <= one_voting.start){
					if(self.serched_sphere >= 0){
						if(self.serched_sphere == one_voting.type){
							self.filtered_array[self.filtered_array.length] = one_voting;
							console.log('finded');
						}
						console.log(' half finded');
					}else{
						self.filtered_array[self.filtered_array.length] = one_voting;
						console.log('not finded' + self.serched_sphere);
					}
				}
	    	});

			console.log('full_filtered');
			console.log(self.filtered_array);
	    	VOTINGS.build_elements(1);
		}
	},
	set_sphere_filter: function(sphere_type){
		var self = this;
		self.serched_sphere = sphere_type;
		$.mobile.navigate("#filter-page");
	}
};*/

var VOTINGS = {
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
		$('#votings-page #searched_string').val('');

		$.mobile.loading( "show", {  theme: "z"	});

		if(location.href.indexOf('#votings-page?program=') > -1){
			var match_array = location.href.match(/#votings-page\?program=[0-9]*/i);
			var object_id = match_array[0].match(/[0-9]+/i);
			var url = 'http://gurtom.mobi/weighted_votings.php?program_id=' + object_id;
		}else{
			if(location.href.indexOf('#votings-page?type=') > -1){
				var match_array = location.href.match(/#votings-page\?type=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/mc.php?type=' + object_id;
			}else{
				var url = 'http://gurtom.mobi/mc.php?sph=0';
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
		  		//console.log(response);
		  		self.votings_array = JSON.parse( response.responseText );	
		  		console.log( self.votings_array );
		  		$.mobile.loading( "hide" );
		  		self.check_current_url( 1 );
		  		self.build_elements();
		  		$('#votings-page #activated_filter').css('display', 'none'); 
		  		$('#votings-page #solo_filter').css('display', 'block');	 
		  		if(call_back){
		  			call_back();
		  		} 	
		  },
		});
	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		console.log(name_sphere);
		self.activated_easy_filter = 1;
		if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
	    	$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}
		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/mc.php?sph=0';

		if($('#votings-page #searched_string').val() != ""){
			url += '&filter=' + $('#votings-page #searched_string').val();
		}
		switch($('#votings-page [name=sort]').val()){
			case "Sort by newest":
				url += '&sort=0';
				break;
			case "Sort by stars":
				url += '&sort=1';
				break;
			case "Sort by supported":
				url += '&sort=2';
				break;	
		}
		switch($('#votings-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
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

		if(self.activated_hard_filter){
			var start_date = $('#filter-page [name=start_year]').val() + "-" 
						    + $('#filter-page [name=start_month]').val() + "-" 
						    + $('#filter-page [name=start_date]').val();
			var end_date = $('#filter-page [name=end_year]').val() + "-" 
						  + $('#filter-page [name=end_month]').val() + "-" 
						  + $('#filter-page [name=end_date]').val();
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
		  		self.votings_array = JSON.parse( response.responseText );	
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
	reinit: function(){
		var self = this;
		if(self.activated_easy_filter == 1 || self.activated_hard_filter == 1){
			self.filter_data(-1, 1);
		}else{
			$.mobile.loading( "show", {  theme: "z"	});

			if(location.href.indexOf('#votings-page?type=') > -1){
				var match_array = location.href.match(/#votings-page\?type=[0-9]*/i);
				var object_id = match_array[0].match(/[0-9]+/i);
				var url = 'http://gurtom.mobi/mc.php?type=' + object_id + '&sph=0&ls=' + self.voting_last_item;
			}else{
				var url = 'http://gurtom.mobi/mc.php?sph=0&ls=' + self.voting_last_item;
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
			  		
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( self.votings_array );			  		
			  		if(query_array.length > 0){
			  			self.votings_array = self.votings_array.concat(query_array);
			  			self.voting_last_item += query_array.length;
				  		//self.check_current_url( 1 );
				  		self.build_elements( 0, true,  query_array);
			  		}
			  		$.mobile.loading( "hide" );	 
			  },
			});
		}
	},
	support_voting: function(vote_id, page){
		$.ajax({
		  url: 'http://gurtom.mobi/like_add.php?id=' + vote_id,
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
				$('#supported').html(parseInt($('#supported').html())+1);
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
	stars_action: function(current_star){
		//$('.stars-wrap span').on('click', function(){
            var star = $(current_star);
            var allStar = star.parent().find('span');
            var val = star.index();
            var vote_id = $(current_star).data('vote_id');

            if (star.hasClass('active') && !star.next().hasClass('active')) {
                allStar.removeClass('active');
                $.ajax({
				  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=0&obj=1",
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
			  url: "http://gurtom.mobi/stars_add.php?id=" + vote_id + "&stars=" + (val+1) + "&obj=1",
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-supporters" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
				                <div class="img">\
				                    <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-completed" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
				                <a href="#">\
				                    <div class="img">\
				                        <img src="http://' + one_voting.img + '" />\
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
		var part_ui_string = '<div class="item ui-corner-all ' + star_class + ' voting-canceled" style = "cursor: pointer" onclick = "VOTINGS.switch_page_for_build(' + one_voting.id + ', 0)">\
				                <div class="img">\
			                        <img src="http://' + one_voting.img + '" />\
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
		$.mobile.loading( "show", {  theme: "z"	});
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
    		status_vote = '<div class="status red" >\
		                        <span>' + LOCALE_ARRAY_ADDITIONAL.voting_canceled[CURRENT_LANG] + '</span>\
		                    </div>\ ';
    	}

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
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
							        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
							                <img width="100%" src="http://' + data_for_build.img + '" />\
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
							                    ' + LOCALE_ARRAY_ADDITIONAL.share[CURRENT_LANG] + '  - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
							                </div>\
							                <div class="num-votes-support">\
							                    ' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
							                    <div class="counter">\
							                        <span><test id = "supported">' + data_for_build.sprtd + '</test>/<test id = "all_supporters">' + data_for_build.sprt + '</test></span>' + support_button + '</div>\
							                </div>' + status_vote +  							              
							                '<div class="desc">' + data_for_build.description + ' </div>\
							                <div class="discuss-btn">\
							                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
							                </div>\
							                <div class="btn-login-soc">\
							                    <button class="ui-btn ui-corner-all ui-shadow share-btn"> ' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
							                    <div class="social-wrap">\
							                        <div class="ui-grid-b">\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
    		var organization = data_for_build.org + " - ";
    	}


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
				status_current_voting = 'You Vote YES';
				checked_yes = 0;
				break;
			case 3:
				selected_class_abstain = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote ABSTAINED';
				checked_abstain = 0;
				break;
			case 2:
				selected_class_no = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote NO';
				checked_no = 0;
				break;
			default:
				status_current_voting = 'You didn\'t vote';
		}

    	if(data_for_build.user_vote_open == "1"){
    		selected_class_checkbox = ' ui-checkbox-on ';
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' Open';
    		}
    	}else{
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' is anonymous';
    		}    		
    	}

    	var percents_object = self.get_percents_values(data_for_build.vote_yes, data_for_build.vote_nth, data_for_build.vote_no);
    	var voting_buttons = '';
    	var status_vote = '';
    	if(SUPER_PROFILE.auth == true){
    		voting_buttons = '<form action="" accept-charset="UTF-8" method="post">\
						                                <fieldset class="vote-radio-group" data-role="controlgroup" data-type="horizontal">\
						                                    <legend>' + LOCALE_ARRAY_ADDITIONAL.yes_no_i_do_not_know[CURRENT_LANG] + '</legend>\
						                                    <div  class="ui-radio ' + selected_class_yes + '">\
						                                        <label data-checked = "' + checked_yes + '" onclick = "VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-yes">' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + '</label><input type="radio" name="vote" value="yes" data-enhanced="true">\
						                                    </div>\
						                                    <div  class="ui-radio ' + selected_class_abstain + '">\
						                                        <label data-checked = "' + checked_abstain + '" onclick = "VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-abstain">' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + '</label><input type="radio" name="vote" value="abstain" data-enhanced="true">\
						                                    </div>\
						                                    <div class="ui-radio ' + selected_class_no + '" >\
						                                        <label data-checked = "' + checked_no + '" onclick = "VOTINGS.vote_for_voting(' + data_for_build.id + ')" class="ui-btn ui-radio-off btn-no">' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + '</label><input type="radio" name="vote" value="no" data-enhanced="true">\
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
		    if(finished == 0 && SUPER_PROFILE.auth == false){
		    	voting_buttons = 'Please register to vote this voting <a href = "#registration">Register</a>';
		    }
    	}

    	switch(data_for_build.stars){
    		case "0":
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
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
		ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						    <h1>' + LOCALE_ARRAY_ADDITIONAL.vote[CURRENT_LANG] + '</h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
						                <img width="100%" src="http://' + data_for_build.img + '" />\
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
						                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
						                </div>\
						                <div class="btn-login-soc">\
						                    <button data-role="button" class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
						                    <div class="social-wrap">\
						                        <div class="ui-grid-b">\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
						                        <div class="ui-block-a">\
						                            <div class="chart">\
						                                <canvas id="chart-1" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus0'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained0'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus0'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                 ' + LOCALE_ARRAY_ADDITIONAL.auth_by_email[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-b">\
						                            <div class="chart">\
						                                <canvas id="chart-2" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus1'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained1'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus1'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.social_network[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-c">\
						                            <div class="chart">\
						                                <canvas id="chart-3" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus2'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained2'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus2'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                               ' + LOCALE_ARRAY_ADDITIONAL.by_payment[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-a">\
						                            <div class="chart">\
						                                <canvas id="chart-4" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus3'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained3'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus3'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.by_passport[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-b">\
						                            <div class="chart">\
						                                <canvas id="chart-5" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus4'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained4'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus4'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.community[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-c">\
						                            <div class="chart">\
						                                <canvas id="chart-6" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                   <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus5'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained5'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus5'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                    </div>\
						                </div>\ ' + voting_buttons +  ' <div class="btn-next-page">\
						                    <a class="ui-btn ui-btn-icon-right" href="#" onclick = " $.mobile.navigate(\'#voters-page?voting=' + data_for_build.id + '\'); VOTINGS.get_open_voters_list(' + data_for_build.id + ');">' + LOCALE_ARRAY_ADDITIONAL.view_list_public_voters[CURRENT_LANG] + '</a>\
						                </div>\
						            </div>\
						        </div>\
						    </div></div>';

		//self.build_circle_chart();
		//$.mobile.navigate("#vote-page");
		$.mobile.navigate("#vote-page?vote=" + data_for_build.id);
		$('#vote-page').html('');				    
		$( ui_string ).appendTo( '#vote-page' );

		$('#vote-page').enhanceWithin();
		console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
	    		switch(data_for_build.user_vote){
	    			case '1':
	    				$('#vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
	    				$('#vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
	    				$('#vote-page .ui-btn.btn-yes').data('checked', 0);
	    				console.log('yeeees');
	    				break;
	    			case '3':
	    				$('#vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
	    				$('#vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
	    				$('#vote-page .ui-btn.btn-abstain').data('checked', 0);
	    				console.log('abstained');
	    				break;
	    			case '2':
	    				$('#vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
	    				$('#vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
	    				$('#vote-page .ui-btn.btn-no').data('checked', 0);
	    				console.log('minus');
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
				self.current_vote_page_voting_period(  data_for_build, 0, type_trigger)
				break;
			case '2':
				self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
				break;
			case '3':
				self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
				break;
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
	get_one_element: function(vote_id, type_trigger){
		var self = this;
		var return_element;
		$.ajax({
			  url: 'http://gurtom.mobi/mc.php?sph=0&id=' + vote_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		switch(data_for_build.status){
						case '0':
							self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_vote_page_voting_period(  data_for_build, 0, type_trigger)
							break;
						case '2':
							self.current_vote_page_voting_period( data_for_build, 1, type_trigger)
							break;
						case '3':
							self.current_vote_page_collect_supports( data_for_build, 1, type_trigger);
							break;
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
	vote_for_voting:function(object_id){
		var self = this;
		setTimeout(function(){
			var status_current_voting = '';
			if($('#vote-page .ui-btn.btn-yes').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-yes').data('checked') == '1'){
				var vote = 1;
				status_current_voting = 'You Vote YES';
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote ABSTAINED';
			}else if($('#vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote NO';
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
	    		status_current_voting = 'You didn\'t vote';
				var vote = 0;
			}
			if($('#vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
				var open_name = 1;
				if(vote != 0){
					status_current_voting += ' Open';
				}
			}else{
				var open_name = 0;
				if(vote != 0){
					status_current_voting += ' is anonymous';
				}
			}
			$('#vote-page .selected-text').html( status_current_voting );
			$.ajax({
			  url: 'http://gurtom.mobi/vote_add.php?id=' + object_id + '&vote=' + vote + '&open=' + open_name,
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
			  		self.init(cb(object_id));
			  		console.log('ok');  	
			  },
			});
		}, 100);
	},
	delete_voting: function(voting_id, return_page){
		$.ajax({
		  url: 'http://gurtom.mobi/mc_rm.php?id=' + voting_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
	      crossDomain: true,
		  complete: function( response ){
		  	 console.log("Deleted id:" + voting_id);
		  	 $.mobile.navigate(return_page);  	
		  },
		});
	},
	build_circle_chart:function(data_values_array, type_trigger){
		console.log('data_array0: ' );
                   		     console.log(data_values_array[0] );
        if(location.href.indexOf("vote-page") > -1 && type_trigger == 1){
        	if(document.getElementById("chart-1")){
        		var ctx1 = document.getElementById("chart-1").getContext("2d");
		        var ctx2 = document.getElementById("chart-2").getContext("2d");
		        var ctx3 = document.getElementById("chart-3").getContext("2d");
		        var ctx4 = document.getElementById("chart-4").getContext("2d");
		        var ctx5 = document.getElementById("chart-5").getContext("2d");
		        var ctx6 = document.getElementById("chart-6").getContext("2d");
		        var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
		            showTooltips: false
		        });
		        var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
		            showTooltips: false
		        });
		        var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
		            showTooltips: false
		        });
		        var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
		            showTooltips: false
		        });
		        var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
		            showTooltips: false
		        });
		        var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
		            showTooltips: false
		        });
        	}
        }else{
        	$('body').on('pagecontainershow', function(event, ui){
            if (ui.toPage.prop("id") === "vote-page") {
            	if(document.getElementById("chart-1")){
            		var ctx1 = document.getElementById("chart-1").getContext("2d");
	                var ctx2 = document.getElementById("chart-2").getContext("2d");
	                var ctx3 = document.getElementById("chart-3").getContext("2d");
	                var ctx4 = document.getElementById("chart-4").getContext("2d");
	                var ctx5 = document.getElementById("chart-5").getContext("2d");
	                var ctx6 = document.getElementById("chart-6").getContext("2d");
	                var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
	                    showTooltips: false
	                });
	                var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
	                    showTooltips: false
	                });
	                var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
	                    showTooltips: false
	                });
	                var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
	                    showTooltips: false
	                });
	                var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
	                    showTooltips: false
	                });
	                var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
	                    showTooltips: false
	                });
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
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/vote_open.php?id=' + vote_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.voters_list = JSON.parse( response.responseText );
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
					        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
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
					                    <input type="search" name="" placeholder="Search" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
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
		                        <img src="http://' + one_voter.avatar + '" />\
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
	},
	create_project_request: function(vote_id, type){
		switch(type){
			case 'project':
				var url = 'http://gurtom.mobi/vote_add_project.php?id=' + vote_id;
				var answer = confirm('Do you want to create project?');
				break;
			case 'request':
				var url = 'http://gurtom.mobi/vote_add_request.php?id=' + vote_id;
				var answer = confirm('Do you want to create request?');
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
			  	 console.log("Okay");
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

		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/user_votes_list.php?sph=0',
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.votings_array = JSON.parse( response.responseText );	
		  		console.log( self.votings_array );
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
			$.mobile.loading( "show", {  theme: "z"	});
			$.ajax({
			  url: 'http://gurtom.mobi/user_votes_list.php?sph=0&ls=' + self.voting_last_item,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  		//console.log(response);
			  		var query_array =  JSON.parse( response.responseText );	
			  		console.log( query_array );			  		
			  		if(query_array.length > 0){
			  			self.votings_array = self.votings_array.concat(query_array);
			  			self.voting_last_item += query_array.length;
				  		//self.check_current_url( 1 );
				  		self.build_elements( 0, true,  query_array);
			  		}
			  		$.mobile.loading( "hide" );	 
			  },
			});

	},
	filter_data: function(sphere_id, reinit, name_sphere){
		var self = this;
		console.log(name_sphere);
		self.activated_easy_filter = 1;
		if(sphere_id >= 0){
			self.sphere_filter = sphere_id;
			console.log(sphere_id);
			for (var i = 0; i < SPHERES.spheres.length; i++) {
				if(SPHERES.spheres[i].selector_name == name_sphere){
					var type_sphere = SPHERES.spheres[i].name;
					break;
				}
			}
	    	$('#filter-page #choose_spheres').html(LOCALE_ARRAY_ADDITIONAL.choose_sphere[CURRENT_LANG] + ': ' + type_sphere);
		}
		$.mobile.loading( "show", {  theme: "z"	});

		var url = 'http://gurtom.mobi/user_votes_list.php?sph=0';

		if($('#my-votings-page #searched_string').val() != ""){
			url += '&filter=' + $('#my-votings-page #searched_string').val();
		}
		switch($('#my-votings-page [name=sort]').val()){
			case "Sort by newest":
				url += '&sort=0';
				break;
			case "Sort by stars":
				url += '&sort=1';
				break;
			case "Sort by supported":
				url += '&sort=2';
				break;	
		}
		switch($('#my-votings-page [name=sort_direction]').val()){
			case "up":
				url += '&direct=0';
				break;
			case "down":
				url += '&direct=1';
				break;	
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
			var start_date = $('#filter-page [name=start_year]').val() + "-" 
						    + $('#filter-page [name=start_month]').val() + "-" 
						    + $('#filter-page [name=start_date]').val();
			var end_date = $('#filter-page [name=end_year]').val() + "-" 
						  + $('#filter-page [name=end_month]').val() + "-" 
						  + $('#filter-page [name=end_date]').val();
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
		  		self.votings_array = JSON.parse( response.responseText );	
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
		  url: 'http://gurtom.mobi/like_add.php?id=' + vote_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		console.log("all ok!");	 
		  		switch($('#my_support').data('my_supported')){
					case 1:
						$('#my_support').html(LOCALE_ARRAY_ADDITIONAL.support[CURRENT_LANG]);
						$('#my_support').data('my_supported', 0);
						$('#my_supported').html(parseInt($('#my_supported').html())-1);
						break;
					case 0:
						$('#my_support').html(LOCALE_ARRAY_ADDITIONAL.not_support[CURRENT_LANG]);
						$('#my_support').data('my_supported', 1);
						$('#my_supported').html(parseInt($('#my_supported').html())+1);
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
				                    <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
				                        <img src="http://' + one_voting.img + '" />\
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
			                        <img src="http://' + one_voting.img + '" />\
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
		$.mobile.loading( "show", {  theme: "z"	});
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
    	var support_button = '';
    	var status_vote = '';

    	if(data_for_build.sprtd == "0"){
    		var delete_button = '<div class="delete_vote_button">\
								    <a onclick = "VOTINGS.delete_voting(\'' + data_for_build.id + '\', \'#my-votings-page\')" class="ui-btn ui-corner-all ui-shadow special_href" href="#">' + LOCALE_ARRAY_ADDITIONAL.delete_vote[CURRENT_LANG] + '</a>\
								</div> ';
    	}else{
    		var delete_button = '';
    	}

    	if(canceled == 0){
    		if(data_for_build.sprt_my == 1){
    			support_button = '<strong data-my_supported = "1" style = "cursor: pointer" id = "my_support" onclick = "MY_VOTINGS.support_voting(' + data_for_build.id + ')">Not support</strong>';
    		}else{
    			support_button = '<strong data-my_supported = "0" style = "cursor: pointer" id = "my_support" onclick = "MY_VOTINGS.support_voting(' + data_for_build.id + ')">Support</strong>';
    		}
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
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
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
							        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
							                <img width="100%" src="http://' + data_for_build.img + '" />\
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
							                     <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
							                </div>\
							                <div class="btn-login-soc">\
							                    <button class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
							                    <div class="social-wrap">\
							                        <div class="ui-grid-b">\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href).replace('my-', '')  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href).replace('my-', '')  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href).replace('my-', '')  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
							                            </div>\
							                            <div class="ui-block-a">\
							                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href).replace('my-', '')  + '"></a>\
							                            </div>\
							                            <div class="ui-block-b">\
							                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href).replace('my-', '')  + '"></a>\
							                            </div>\
							                            <div class="ui-block-c">\
							                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href).replace('my-', '')  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
				status_current_voting = 'You Vote YES';
				checked_yes = 0;
				break;
			case 3:
				selected_class_abstain = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote ABSTAINED';
				checked_abstain = 0;
				break;
			case 2:
				selected_class_no = ' ui-btn-active ui-radio-on ';
				status_current_voting = 'You Vote NO';
				checked_no = 0;
				break;
			default:
				status_current_voting = 'You didn\'t vote';
		}

    	if(data_for_build.user_vote_open == "1"){
    		selected_class_checkbox = ' ui-checkbox-on ';
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' Open';
    		}
    	}else{
    		if(parseInt(data_for_build.user_vote) > 0){
    			status_current_voting += ' is anonymous';
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
    			var stars_ui = '<span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "1":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
    			break;
    		case "2":
    			var stars_ui = '<span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span class = "active" data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span  data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span><span data-vote_id = "' + data_for_build.id + '" onclick = "VOTINGS.stars_action(this)"></span>\ ';
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
		ui_string = '<div data-role="header" data-position="fixed" data-tap-toggle="false">\
						    <h1>' + LOCALE_ARRAY_ADDITIONAL.my_vote[CURRENT_LANG] + '</h1>\
						        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">Back</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#vote-help">Ask</a>\
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
						                <img width="100%" src="http://' + data_for_build.img + '" />\
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
						                    ' + LOCALE_ARRAY_ADDITIONAL.sphere[CURRENT_LANG] + '  - ' + type_sphere + ' - ' + organization + data_for_build.sphere + '\
						                </div>\
						                <div class="num-votes-support">\
						                    ' + LOCALE_ARRAY_ADDITIONAL.number_of_votes_support[CURRENT_LANG] + '\
						                    <div class="counter">\
						                        <span>' + data_for_build.sprtd + '</span>\
						                    </div>\
						                </div>' + status_vote + 
						                '<div class="desc">' + data_for_build.description + ' </div>\
						                <div class="discuss-btn">\
						                    <a class="ui-btn ui-corner-all ui-shadow" onclick="window.open(\'' + data_for_build.chat +  '\', \'\'); return false;">' + LOCALE_ARRAY_ADDITIONAL.discussion_of_voting[CURRENT_LANG] + '</a>\
						                </div>\
						                <div class="btn-login-soc">\
						                    <button data-role="button" class="ui-btn ui-corner-all ui-shadow share-btn">' + LOCALE_ARRAY_ADDITIONAL.share_by_social_newtworks[CURRENT_LANG] + '</button>\
						                    <div class="social-wrap">\
						                        <div class="ui-grid-b">\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="vk" href="http://vkontakte.ru/share.php?url=' + encodeURIComponent(location.href)  + '&title=' + encodeURIComponent(data_for_build.name) + '&image=' + 'http://' + data_for_build.img + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href)  + '&t=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="tw" href="http://twitter.com/share?url=' + encodeURIComponent(location.href)  + '&text=' + encodeURIComponent(data_for_build.name) + '"></a>\
						                            </div>\
						                            <div class="ui-block-a">\
						                                <a target="_blank" class="gp" href="https://plus.google.com/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-b">\
						                                <a target="_blank" class="in" href="https://www.linkedin.com/cws/share?url=' + encodeURIComponent(location.href)  + '"></a>\
						                            </div>\
						                            <div class="ui-block-c">\
						                                <a target="_blank" class="ok" href="http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(location.href)  + '&st.comments=' + encodeURIComponent(data_for_build.name) + '"></a>\
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
						                        <div class="ui-block-a">\
						                            <div class="chart">\
						                                <canvas id="chart-1" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus0'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained0'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus0'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                 ' + LOCALE_ARRAY_ADDITIONAL.auth_by_email[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-b">\
						                            <div class="chart">\
						                                <canvas id="chart-2" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus1'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained1'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus1'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.social_network[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-c">\
						                            <div class="chart">\
						                                <canvas id="chart-3" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus2'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained2'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus2'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                               ' + LOCALE_ARRAY_ADDITIONAL.by_payment[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-a">\
						                            <div class="chart">\
						                                <canvas id="chart-4" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus3'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained3'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus3'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.by_passport[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-b">\
						                            <div class="chart">\
						                                <canvas id="chart-5" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus4'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained4'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus4'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.community[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                        <div class="ui-block-c">\
						                            <div class="chart">\
						                                <canvas id="chart-6" width="80" height="80"></canvas>\
						                                <div class="info">\
						                                   <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.yes[CURRENT_LANG] + ':<br>' + data_for_build['plus5'] + '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.abstain[CURRENT_LANG] + ':<br>' + data_for_build['abstained5'] +  '\
						                                    </div>\
						                                    <div>\
						                                        ' + LOCALE_ARRAY_ADDITIONAL.no[CURRENT_LANG] + ':<br>' + data_for_build['minus5'] +  '\
						                                    </div>\
						                                </div>\
						                            </div>\
						                            <div class="title">\
						                                ' + LOCALE_ARRAY_ADDITIONAL.co_owners[CURRENT_LANG] + '\
						                            </div>\
						                        </div>\
						                    </div>\
						                </div>\ ' + voting_buttons +  ' <div class="btn-next-page">\
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
		console.log('window on load');
		setTimeout(function(){
			if(data_for_build.user_vote){
				switch(data_for_build.user_vote){
	    			case '1':
	    				$('#my-vote-page .ui-btn.btn-yes').removeClass("ui-radio-off");
	    				$('#my-vote-page .ui-btn.btn-yes').addClass("ui-btn-active ui-radio-on");
	    				$('#my-vote-page .ui-btn.btn-yes').data('checked', 0);
	    				console.log('yeeees');
	    				break;
	    			case '3':
	    				$('#my-vote-page .ui-btn.btn-abstain').removeClass("ui-radio-off");
	    				$('#my-vote-page .ui-btn.btn-abstain').addClass("ui-btn-active ui-radio-on");
	    				$('#my-vote-page .ui-btn.btn-abstain').data('checked', 0);
	    				console.log('abstained');
	    				break;
	    			case '2':
	    				$('#my-vote-page .ui-btn.btn-no').removeClass("ui-radio-off");
	    				$('#my-vote-page .ui-btn.btn-no').addClass("ui-btn-active ui-radio-on");
	    				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
	    				console.log('minus');
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
				self.current_vote_page_voting_period(  data_for_build, 0, type_trigger)
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
			  url: 'http://gurtom.mobi/mc.php?sph=0&id=' + vote_id,
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
		      crossDomain: true,
			  complete: function( response ){
			  		return_element = JSON.parse( response.responseText );
			  		data_for_build = return_element[0];
			  		switch(data_for_build.status){
						case '0':
							self.current_vote_page_collect_supports( data_for_build, 0, type_trigger);
							break;
						case '1':
							self.current_vote_page_voting_period(  data_for_build, 0, type_trigger)
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
				status_current_voting = 'You Vote YES';
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
			}else if($('#my-vote-page .ui-btn.btn-abstain').hasClass('ui-radio-on') == 1 && $('#my-vote-page .ui-btn.btn-abstain').data('checked') == '1'){
				var vote = 3;
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote ABSTAINED';
			}else if($('#my-vote-page .ui-btn.btn-no').hasClass('ui-radio-on') == 1 && $('#my-vote-page .ui-btn.btn-no').data('checked') == '1'){
				var vote = 2;
				$('#my-vote-page .ui-btn.btn-no').data('checked', 0);
				status_current_voting = 'You Vote NO';
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
	    		status_current_voting = 'You didn\'t vote';
				var vote = 0;
			}
			if($('#my-vote-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
				var open_name = 1;
				if(vote != 0){
					status_current_voting += ' Open';
				}
			}else{
				var open_name = 0;
				if(vote != 0){
					status_current_voting += ' is anonymous';
				}
			}
			$('#my-vote-page .selected-text').html( status_current_voting );
			$.ajax({
			  url: 'http://gurtom.mobi/vote_add.php?id=' + object_id + '&vote=' + vote + '&open=' + open_name,
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
			  		self.init(cb(object_id));
			  		console.log('ok');  	
			  },
			});
		}, 100);
	},
	build_circle_chart:function(data_values_array, type_trigger){
		console.log('data_array0: ' );
                   		     console.log(data_values_array[0] );
        if(location.href.indexOf("my-vote-page") > -1 && type_trigger == 1){
        	if(document.getElementById("chart-1")){
        		var ctx1 = document.getElementById("chart-1").getContext("2d");
		        var ctx2 = document.getElementById("chart-2").getContext("2d");
		        var ctx3 = document.getElementById("chart-3").getContext("2d");
		        var ctx4 = document.getElementById("chart-4").getContext("2d");
		        var ctx5 = document.getElementById("chart-5").getContext("2d");
		        var ctx6 = document.getElementById("chart-6").getContext("2d");
		        var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
		            showTooltips: false
		        });
		        var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
		            showTooltips: false
		        });
		        var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
		            showTooltips: false
		        });
		        var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
		            showTooltips: false
		        });
		        var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
		            showTooltips: false
		        });
		        var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
		            showTooltips: false
		        });
        	}
        }else{
        	$('body').on('pagecontainershow', function(event, ui){
            if (ui.toPage.prop("id") === "my-vote-page") {
            	if(document.getElementById("chart-1")){
            		var ctx1 = document.getElementById("chart-1").getContext("2d");
                	var ctx2 = document.getElementById("chart-2").getContext("2d");
	                var ctx3 = document.getElementById("chart-3").getContext("2d");
	                var ctx4 = document.getElementById("chart-4").getContext("2d");
	                var ctx5 = document.getElementById("chart-5").getContext("2d");
	                var ctx6 = document.getElementById("chart-6").getContext("2d");
	                var chart1 = new Chart(ctx1).Doughnut(data_values_array[0], {
	                    showTooltips: false
	                });
	                var chart2 = new Chart(ctx2).Doughnut(data_values_array[1], {
	                    showTooltips: false
	                });
	                var chart3 = new Chart(ctx3).Doughnut(data_values_array[2], {
	                    showTooltips: false
	                });
	                var chart4 = new Chart(ctx4).Doughnut(data_values_array[3], {
	                    showTooltips: false
	                });
	                var chart5 = new Chart(ctx5).Doughnut(data_values_array[4], {
	                    showTooltips: false
	                });
	                var chart6 = new Chart(ctx6).Doughnut(data_values_array[5], {
	                    showTooltips: false
	                });
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
		$.mobile.loading( "show", {  theme: "z"	});
		$.ajax({
		  url: 'http://gurtom.mobi/vote_open.php?id=' + vote_id,
		  type: "GET",
		  xhrFields: {
	       withCredentials: true
	      },
          crossDomain: true,
		  complete: function( response ){
		  		//console.log(response);
		  		self.voters_list = JSON.parse( response.responseText );
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
					        <a class="ui-btn ui-btn-left ui-icon-back ui-btn-icon-notext" onclick = "history.back()" href="#">' + LOCALE_ARRAY_ADDITIONAL.back[CURRENT_LANG] + '</a><a data-rel="popup" data-transition="pop" class="ui-btn ui-btn-right ui-icon-help ui-btn-corner-all ui-btn-icon-notext" href="#voters-help">' + LOCALE_ARRAY_ADDITIONAL.ask[CURRENT_LANG] + '</a>\
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
					                    <input type="search" name="" placeholder="Search" data-enhanced="true" /><a class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-input-clear-hidden" href="">' + LOCALE_ARRAY_ADDITIONAL.clear_text[CURRENT_LANG] + '</a><input type="button" value="speech" data-icon="speech" data-iconpos="notext" />\
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
		                        <img src="http://' + one_voter.avatar + '" />\
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

var ADRESS = {
			address_arr: [],
			init:function(){
				if(location.href.indexOf('#address-item') > -1){
					var match_array = location.href.match(/#address-item-[0-9]*/i);
					var object_id = match_array[0].match(/[0-9]+/i);
					
					this.setListener(object_id);

					function callback_country(object_id){
				        return function(){
				        	ADRESS.selectCountry(object_id, $('#address-item-' + object_id + ' [name=country] > option:eq(0)').val());
				        	if(location.href.indexOf('#address-item-' + object_id) > -1){
			          			$('#address-item-' + object_id + ' [name=country]').selectmenu("refresh", true);								
							}
							ADRESS.enable(object_id, 'state');				   
				        }  						
				    }

					this.getCountry(object_id, callback_country(object_id));
					this.disable(object_id, 'state');
					this.disable(object_id, 'county');
					this.disable(object_id, 'city');
					this.disable(object_id, 'index');				
					
					this.setDefault();
					window.ADRESS = ADRESS;
					this.getCurrent(false,false, object_id);
					return false;

			 	}
				
				window.ADRESS = ADRESS;
				this.getCurrent(false,false, false);
				
			},
			levFind:function(source,obj){
				var clone = jQuery.extend(true, {}, obj);
				var arr = $.map(clone, function(value, index) {
				    return [value];
				});
				function levSort(a,b){
						var aLev = levenshtein(source,a.name_en);
						var bLev = levenshtein(source,b.name_en);
						return aLev - bLev;
					}
				return arr.sort(levSort)[0];
			},
			
			gpsSet: function(page,country,state,county,city,street,house){
				var self = this;
				if(country){
					var name = "country";
					var list_place = self.country;
					var source = country;
					var select_func = self.selectCountry.bind(self);
					country = null;
				}else if (state){
					var name = "state";
					var list_place = self.state;
					var source = state;
					var select_func = self.selectState.bind(self);
					state = null;
				}
				else if (county){
					var name = "county";
					var list_place = self.county;
					var source = county;
					var select_func = self.selectCounty.bind(self);
					county = null;
				}
				else if (city){
					var name = "city";
					var list_place = self.city;
					var source = city;
					var select_func = self.selectCity.bind(self);
					city = null;
				}
				else {
					$("#address-item-" + page + " [name=street]").val(street);
					$("#address-item-" + page + " [name=house]").val(house);
					$.mobile.loading( "hide" ); //анимация загрузки
					return ;
				}

				var res = this.levFind(source,list_place);

				self.setOption(page, name,res.id);

				select_func(page, res.id,function(){
					self.gpsSet(page, country,state,county,city,street,house);
				});
			},
			setListener:function(page){
				var self = this;
				self.clear_listeners(page);
				$("#address-item-" + page + " [name=country]").change(function(){
					var value = $(this).val();
					self.selectCountry(page, value);
					$("#address-item-" + page + " [name=country]").selectmenu("refresh", true);
				});
				$("#address-item-" + page + " [name=state]").change(function(){
					var value = $(this).val();
					self.selectState(page, value);
					$("#address-item-" + page + " [name=state]").selectmenu("refresh", true);
				});
				$("#address-item-" + page + " [name=county]").change(function(){
					var value = $(this).val();
					self.selectCounty(page, value);
					$("#address-item-" + page + " [name=county]").selectmenu("refresh", true);
				});
				$("#address-item-" + page + " [name=city]").change(function(){
					var value = $(this).val();
					self.selectCity(page, value);
					$("#address-item-" + page + " [name=city]").selectmenu("refresh", true);
				});
				$('#address-item-' + page + ' .btn-delete.ui-btn.ui-shadow.ui-corner-all').click(function(){
					self.delete_address(page);
				});
				$("#address-item-" + page + " .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right").click(function(){
					$('#address-item-' + page + ' .btn-save.ui-btn.ui-shadow.ui-corner-all').click();
				});
				$("#findgps-" + page).click(function(){
					  	$.mobile.loading( "show", {
						  //text: "foo",
						  //textVisible: true,
						  theme: "z"
						  //html: ""
						});
		    		  navigator.geolocation.getCurrentPosition(function (pos) {
					      var lat = pos.coords.latitude;
					      var lng = pos.coords.longitude;
					      if (lat == null) {
					        alert(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
					      }else{
					      	console.log(lat);
					      	console.log(lng);
					      	var geocoder = new google.maps.Geocoder();
		    				var latLng = new google.maps.LatLng(lat, lng);
		    				if(geocoder){
		    					geocoder.geocode({'latLng': latLng,'language': 'en'},function(results, status) {
							       if (status == google.maps.GeocoderStatus.OK) {
							         console.log(results);
							         var country = results[0].address_components[6].long_name;
							         var state = results[0].address_components[5].long_name;
							         var county = results[0].address_components[4].long_name;
							         var city = results[0].address_components[3].long_name;
							         //console.log('build: ' + results[0].address_components[0].long_name);
							         var street = results[0].address_components[1].long_name;
							         var build = results[0].address_components[0].long_name;
							         ADRESS.gpsSet(page, country,state,county,city,street,build);
							       }

							       else{
							       	alert(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
							       }
		    					});;
		    				}
					      }
					   });
		    	});
			},
			clear_listeners: function(page){
				var self = this;
				$("#address-item-" + page + " [name=country]").off();
				$("#address-item-" + page + " [name=state]").off();
				$("#address-item-" + page + " [name=county]").off();
				$("#address-item-" + page + " [name=city]").off();
				$('#address-item-' + page + ' .btn-delete.ui-btn.ui-shadow.ui-corner-all').off();
				$("#address-item-" + page + " .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right").off();
				$("#findgps-" + page).off();
			},
			save_address:function(page){
				var self = this;
				var reg_adr = 0;

				$.mobile.loading( "show", {
					  //text: "foo",
					  //textVisible: true,
					  theme: "z",
					  //html: ""
					});

				if($('#address-item-' + page + ' .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
					reg_adr = 1;
				}				
				
				if(ADRESS.address_arr[page-1]){
					var ida = ADRESS.address_arr[page-1]['ida'];
				}else{
					var ida = '';
				}

				$.ajax({
				  url: 'http://gurtom.mobi/user_address_add.php?ida=' + ida
				  											+ ('&c=' + $('#address-item-' + page + ' [name=city]').val()).replace("'", "`")
				  											+ ('&str=' + $('#address-item-' + page + ' [name=street]').val()).replace("'", "`")
				  											+ '&bld=' + $('#address-item-' + page + ' [name=house]').val()
				  											+ '&oth=' + $('#address-item-' + page + ' [name=comment]').val()
				  											+ '&zip=' + $('#address-item-' + page + ' [name=index]').val()
				  											+ '&reg_adr=' + reg_adr,
				  type: "GET",
				  xhrFields: {
			       withCredentials: true
			      },
		          crossDomain: true,
				  complete: function(){			  			
		  			$.mobile.navigate("#edit-address");
		  			$.mobile.loading( "hide" );

				  	//if(page > 2 && ADRESS.address_arr.length < 2){
				  	//	self.getCurrent(0, callback_current());
				  	//}else{
				  	//self.getCurrent(0, callback_current(), page);				
				  	//}			

				  	//alert('Changing complete');
				  	
				  },
				});
			},
			delete_address:function(page){
				$.mobile.loading( "show", {
				  //text: "foo",
				  //textVisible: true,
				  theme: "z",
				  //html: ""
				});
				var self = this;
				if(ADRESS.address_arr[page-1]){
					if(ADRESS.address_arr[page-1]['ida']){
						$.ajax({
						  url: 'http://gurtom.mobi/user_address_rm.php?ida=' + ADRESS.address_arr[page-1]['ida'],
						  type: "GET",
						  xhrFields: {
					       withCredentials: true
					      },
				          crossDomain: true,
						  complete: function(){
						  	//alert('Deleting complete');	
							
							function callback_current(){
						  		return function(){
						  			$.mobile.loading( "hide" );
						  		}
						  	}						  	
						  	$.mobile.navigate("#edit-address");						
						  	//self.getCurrent(0, callback_current(), page);				
						  	
						  },
						});
					}
				}
			},
			clear_address_info: function(page){
				var self = this;
				$('#edit-address [href=#address-item-' + page + ']').html('Address ' + page);
				
				//

				function callback_country(page){
			        return function(){
			        	//self.enable(page, 'state');
			        	function callback_select_country(){
			        		return function(){
			        			//self.disable(page, 'state');
			        			self.enable(page, 'state');
			        			//console.log('state');
			        		}
			        	}
			        	self.selectCountry(page, $('#address-item-' + page + ' [name=country] > option:eq(0)').val(), callback_select_country());
			        	//


			        	if(location.href.indexOf('#address-item-' + page) > -1){
		          			$('#address-item-' + page + ' [name=country]').selectmenu("refresh", true);		          			
		          			//$('#address-item-' + page + ' [name=state]').selectmenu("refresh", true);					       							
						}
			        }  						
			    }
				self.getCountry(page, callback_country(page));
				//self.disable(page, 'state');
				self.disable(page, 'county');
				self.disable(page, 'city');
				self.disable(page, 'index');
				$('#address-item-' + page + ' [name=street]').val('');
				$('#address-item-' + page + ' [name=house]').val('');
				$('#address-item-' + page + ' [name=comment]').val('');
				$('#address-item-' + page + ' .ui-btn ui-btn-inherit.ui-btn-icon-left.ui-checkbox-on').attr('class', 'ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off');
				$('#address-item-' + page + ' [name=off_address]').data('cacheval', 'true');
			},
			selectCountry:function(page, idc,cb_){
				this.disable(page, "county");
				this.enable(page, "state");
				this.getState(page, idc,function(res){
					$("#address-item-" + page + " [name=state]").val('');
					if(cb_)cb_(res);
				});
				
			},
			selectState:function(page, ids, cb_){
				this.disable(page, "city");
				this.enable(page, "county")
				var idc = $("#address-item-" + page + " [name=country]").val();
				//alert(idc + ',' + ids);
				this.getCounty(page, idc,ids,function(res){
					$("#address-item-" + page + " [name=county]").val('');
					if(cb_)cb_(res);					
				});
				
			},
			selectCounty:function(page, idr, cb_){
				this.disable(page, "index");
				this.enable(page, "city");
				var idc = $("#address-item-" + page + " [name=country]").val();
				var ids = $("#address-item-" + page + " [name=state]").val();

				this.getCity(page, idc,ids,idr,function(res){
					$("#address-item-" + page + " [name=city]").val('');
					if(cb_)cb_(res);					
				});
				
			},
			selectCity:function(page, idcity,cb_){
				this.enable(page, "index");
				//console.log(idcity);
				this.getIndex(page, idcity,function(res){
					$("#address-item-" + page + " [name=index]").val('');
					if(cb_)cb_(res);					
				});
			},
			getCountry:function(page, cb){/*cb*/
				var self = this;
				if(self.country){
					$("#address-item-" + page + " [name=country]").html('');
			            for(var i = 0; i < self.country.length; i++){
			            	var c = self.country[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=country]").append(option);
			            	//console.log(1);
			            }
			            if(cb){
			            	cb(self.country);
			            }
				}else{
					$.ajax({
	    			url:"http://gurtom.mobi/list_adr_country.php",
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
				    async: false,
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			           // console.log(data);
			            self.country = jQuery.parseJSON(data);
			            //console.log(self.country);
			            $("#address-item-" + page + " [name=country]").html('');

			            for(var i = 0; i < self.country.length; i++){
			            	var c = self.country[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=country]").append(option);
			            	//console.log(1);
			            }
			            if(cb){
			            	cb(self.country);
			            }


			        	}
					});
				}
				
			},
			getState:function(page, idc,cb){
				var self = this;
				if(self.state){
					$("#address-item-" + page + " [name=state]").html('');
			            $("#address-item-" + page + " [name=state]").show();
			            for(var i = 0; i < self.state.length; i++){
			            	var c = self.state[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=state]").append(option);
			            }
			            //lang_activate_el("#address-item-" + page + " [name=state]");
			            if(cb){
			            	cb(self.state);
			            }
				}else{
					$.ajax({
	    			url:"http://gurtom.mobi/list_adr_state.php?idc="+idc,
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
				    async: false,
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			            self.state = jQuery.parseJSON(data);
			            $("#address-item-" + page + " [name=state]").html('');
			            $("#address-item-" + page + " [name=state]").show();
			            for(var i = 0; i < self.state.length; i++){
			            	var c = self.state[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=state]").append(option);
			            	
			            }
			            //lang_activate_el("#address-item-" + page + " [name=state]");
			            if(cb){
			            	cb(self.state);
			            }
			        }
				});
				}
				
			},
			getCounty:function(page, idc,ids,cb){
				var self = this;
				$.ajax({
	    			url:"http://gurtom.mobi/list_adr_county.php?idc="+idc+"&ids="+ids,
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			         //   console.log(data);
			            self.county = jQuery.parseJSON(data);
			            $("#address-item-" + page + " [name=county]").html('');
			            $("#address-item-" + page + " [name=county]").show();
			            for(var i = 0; i < self.county.length; i++){
			            	var c = self.county[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=county]").append(option);
			            	
			            }
			            //lang_activate_el("#address-item-" + page + " [name=county]");
			            if(cb){
			            	cb(self.county);
			            }
			        	}
					})
			},
			getCity:function(page, idc,ids,idr,cb){
				var self = this;
				$.ajax({
	    			url:"http://gurtom.mobi/list_adr_city.php?idc="+idc+"&ids="+ids+"&idr="+idr,
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			          //  console.log(data);
			            self.city = jQuery.parseJSON(data);
			            $("#address-item-" + page + " [name=city]").html('');
			            $("#address-item-" + page + " [name=city]").show();
			            for(var i = 0; i < self.city.length; i++){
			            	var c = self.city[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	if(CURRENT_LANG){
			            		switch(CURRENT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}else{
			            		switch(DEFAULT_LANG){
				            		case 'ua':
				            			$(option).html(c.name_uk);
				            			break;
				            		case 'en':
				            			$(option).html(c.name_en);
				            			break;
				            		case 'ru':
				            			$(option).html(c.name_ru);
				            			break;
			            		}
			            	}

			            	$("#address-item-" + page + " [name=city]").append(option);
			            	
			            }
			            //lang_activate_el("#address-item-" + page + " [name=city]");
			            if(cb){
			            	cb(self.city);
			            }
			        	}
					})
			},
			getIndex:function(page, idcity,cb){
				var self = this;
				$.ajax({
	    			url:"http://gurtom.mobi/list_adr_zip.php?id="+idcity,
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			            //console.log(data);
			            self.indexes = jQuery.parseJSON(data);
			            $("#address-item-" + page + " [name=index]").html('');
			            $("#address-item-" + page + " [name=index]").show();
			            for(var i = 0; i < self.indexes.length; i++){
			            	var c = self.indexes[i];
			            	var option = document.createElement("option");
			            	$(option).val(c.id);
			            	$(option).html(c.zip);

			            	$("#address-item-" + page + " [name=index]").append(option);
			            }
			            if(cb){
			            	cb(self.indexes);
			            }
			        	}
					})
			},
			enable:function(page, name,choose){
				$('#address-item-' + page + ' [name="'+name+'"]').attr("disabled",false);
				if(!choose)$('#address-item-' + page + ' [name="'+name+'"]').parent().find("span").html('Choose '+ name);
			},
			getCurrent:function(not_refresh, callback_redirect, page){
				var self = this;
				if(self.address_arr.length > 0 && location.href.indexOf('#address-item') > -1){
					if(page && self.address_arr[page-1]){
						self.set_one_address(page, not_refresh, callback_redirect);						
					}else{
						if(page){
							self.clear_address_info(page);
						}			          	
					}
					if(location.href.indexOf('#edit-address') > -1){
						for (var i = 1; i < 4; i++) {
							if(self.address_arr[i-1]){
								$('#edit-address [href=#address-item-' + i + ']').html(self.address_arr[i-1]['str'] + ' '  +
			          																   self.address_arr[i-1]['bld'] + ', ' + 
			          																   self.address_arr[i-1]['city_' + CURRENT_LANG]);
							}else{
								$('#edit-address [href=#address-item-' + i + ']').html('Address ' + i);	
							}														
						}
						if(i < 3){
							for (var j = i; j < 4; j++) {
								$('#edit-address [href=#address-item-' + j + ']').html('Address ' + j);						
							}								
						}										
					}
				}else{
					$.ajax({
		    			url:"http://gurtom.mobi/user_address.php",
		    			type:"GET",
				        crossDomain: true,
		    			xhrFields: {
					       withCredentials: true
					    },
				        complete: function(response){
				        	var data = response.responseText;
				            var address_arr = jQuery.parseJSON(data);
				            for(var i in address_arr){
				            	var address = address_arr[i];
				            	var en = address.str+" "+address.bld+", "+address.city_en;
				            	var ru = address.str+" "+address.bld+", "+address.city_ru;
				            	var ua = address.str+" "+address.bld+", "+address.city_ua;
				            	$(".address-item a.js-address:eq("+i+")")
				            		.data("en",en)
				            		.data("ru",ru)
				            		.data("ua",ua);

				            	$(".address-item a.js-sphere:eq("+i+")")
				            		.data("en","Choose sphere for "+en)
				            		.data("ru","Выберите сферы для "+ru)
				            		.data("ua","Виберіть галузі для "+ua);
				            }

				          	self.address_arr = address_arr;
				          	
				          	
				          	if(page && self.address_arr[page-1]){
								self.set_one_address(page, not_refresh, callback_redirect);						
							}else{
								if(page){
									self.clear_address_info(page);
								}
							}				
							if(location.href.indexOf('#edit-address') > -1){
								for (var i = 1; i < 4; i++) {
									if(self.address_arr[i-1]){
										$('#edit-address [href=#address-item-' + i + ']').html(self.address_arr[i-1]['str'] + ' '  +
					          																   self.address_arr[i-1]['bld'] + ', ' + 
					          																   self.address_arr[i-1]['city_' + CURRENT_LANG]);
									}else{
										$('#edit-address [href=#address-item-' + i + ']').html('Address ' + i);	
									}							
								}
								if(i < 3){
									for (var j = i; j < 4; j++) {
										$('#edit-address [href=#address-item-' + j + ']').html('Address ' + j);						
									}								
								}					
							}
				        }
					});
				}				
					

			},
			set_one_address: function(page, not_refresh, callback_redirect){
					var self = this;				
	          		var z = page;
					var one_address = self.address_arr[page-1];
		          		$('#address-item-' + z + ' #delete_address').attr('style', 'display: block');
		          				          	
	          			function callback_country(z){
							return function(){
				                 function callback_state(){
				                 	return function(){
				                 		function callback_county(){
				                 			return function(){
				                 				function callback_city(){
				                 					return function(){
				                 						$('#address-item-' + z + ' [name=city] option[value=' + one_address['city_id']  + ']').attr('selected', 'selected');
				                 						$('#address-item-' + z + ' [name=index] option[value=' + one_address['zip']  + ']').attr('selected', 'selected');
				                 						$('#address-item-' + z + ' [name=street]').val(one_address['str']);
			          									$('#address-item-' + z + ' [name=house]').val(one_address['bld']);
			          									$('#address-item-' + z + ' [name=comment]').val(one_address['oth']);
			          									/*if(one_address['reg_adr']){
			          										console.log('reg_adr');
			          										$('#address-item-' + z + ' .ui-btn.ui-btn-inherit.ui-btn-icon-left.ui-checkbox-off').attr('class', 'ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-on');
			          										$('#address-item-' + z + ' [name=off_address]').data('cacheval', 'false');
			          									}*/
			          									if(location.href.indexOf('#address-item-' + z) > -1){
			          										$('#address-item-' + z + ' [name=country]').selectmenu("refresh", true);
			          										$('#address-item-' + z + ' [name=state]').selectmenu("refresh", true);
															$('#address-item-' + z + ' [name=county]').selectmenu("refresh", true);
															$('#address-item-' + z + ' [name=city]').selectmenu("refresh", true);
															$('#address-item-' + z + ' [name=index]').selectmenu("refresh", true);
															//alert($('#address-item-' + z + ' [name=index]').val());
														}
				                 					}
				                 				}
				                 				$('#address-item-' + z + ' [name=county] option[value=' + one_address['county_id']  + ']').attr('selected', 'selected');
				                 				self.selectCity(z, one_address['city_id'], callback_city());
				                 			}				           
				                 		}
				                 	  $('#address-item-' + z + ' [name=state] option[value=' + one_address['state_id']  + ']').attr('selected', 'selected');
					                  self.selectCounty(z, one_address['county_id'], callback_county());
					                  //alert(one_address['county_en']);					                  
				                 	}						            
				                  //alert(county_id);
				                 }

				                 $('#address-item-' + z + ' [name=country] option[value=' + one_address['country_id']  + ']').attr('selected', 'selected');
				         		self.selectState(z, one_address['state_id'], callback_state());				         			        
			        		}
		        		}
		        		if(!not_refresh){
		        			self.selectCountry(z, one_address['country_id'], callback_country(z));
		        		}      			
		          			//$('#address-item-' + z + ' [name=street]').val(one_address['str']);
		          			//$('#address-item-' + z + ' [name=house]').val(one_address['bld']);		        			
		          	
		          	if(callback_redirect){
		          		callback_redirect();
		          	}
		          	
			},
			setOption:function(page, name,id){
				$("#address-item-" + page + " [name="+name+"]").val(id).attr('selected', true).siblings('option').removeAttr('selected');
				$("#address-item-" + page + " [name="+name+"]").selectmenu("refresh", true);
			},
			setDefault:function(){
				for(var i = 1; i <= 3; i++){
					$(".address-item a.js-address:eq("+ (i-1) +")")
			            		.data("en","Address "+i)
			            		.data("ru","Адресс "+i)
			            		.data("ua","Адрес "+i);
			         $(".address-item a.js-sphere:eq("+ (i-1) +")")
			            		.data("en","Choose sphere")
			            		.data("ru","Выберите сферы")
			            		.data("ua","Виберіть галузі");
				}
				//lang_activate_el($("#edit-address"));
			},
			disable:function(page, name){
				if(name == "state"){
					$('#address-item-' + page + ' [name="state"]').parent().find("span").html('Set country');
					$('#address-item-' + page + ' [name="state"]').html("<option disabled>Set country</option>");
					$('#address-item-' + page + ' [name="state"]').attr("disabled","disabled");
					$('#address-item-' + page + ' [name="state"]').val("");

					name = "county";
				}
				if(name == "county"){
					$('#address-item-' + page + ' [name="county"]').parent().find("span").html('Set state');
					$('#address-item-' + page + ' [name="county"]').html("<option disabled>Set state</option>");
					$('#address-item-' + page + ' [name="county"]').attr("disabled","disabled");
					$('#address-item-' + page + ' [name="county"]').val("");

					name = "city";
				}
				if(name == "city"){
					$('#address-item-' + page + ' [name="city"]').parent().find("span").html('Set county');
					$('#address-item-' + page + ' [name="city"]').html("<option disabled>Set county</option>");
					$('#address-item-' + page + ' [name="city"]').attr("disabled","disabled");
					$('#address-item-' + page + ' [name="city"]').val("");

					name = "index";
				}
				if(name == "index"){
					$('#address-item-' + page + ' [name="index"]').parent().find("span").html('Set city');
					$('#address-item-' + page + ' [name="index"]').html("<option disabled>Set city</option>");
					$('#address-item-' + page + ' [name="index"]').attr("disabled","disabled");
					$('#address-item-' + page + ' [name="index"]').val("");

				}
			}
		};

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

console.log(window.location.toString());
(function($){
    $(function(){
    	if(location.href.search(/m=[\w&id=]+/i) > -1){
			var matches = location.href.match(/m=[\w&id=]+/i);
			$.ajax({
			  url: 'http://gurtom.mobi/l/index.php?' + matches[0],
			  type: "GET",
			  xhrFields: {
		       withCredentials: true
		      },
	          crossDomain: true,
			  complete: function( response ){
			  	auth(true);
			  	$.mobile.navigate("#news-page");
			  	console.log('ok');		  		 	
			  },
			});
		}

		function init(){
			if(readCookie("lang")){
				$('#select-lang2 > option[value="' + readCookie("lang") + '"]').attr('selected', 'selected');
				$('#select-lang > option[value="' + readCookie("lang") + '"]').attr('selected', 'selected');
			}
			$("#select-lang2").change(function(){
	            var new_lang = $(this).find("option:selected").val();
	            //createCookie("lang", new_lang);
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
	            //createCookie("lang", new_lang);
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
				url:"http://gurtom.mobi/profile.php",
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
			/*$.ajax({
	    			url:"http://gurtom.mobi/list_adr_country.php",
	    			type:"GET",
	    			xhrFields: {
				       withCredentials: true
				    },
			        crossDomain: true,
			        complete: function(response){
			        	var data = response.responseText;
			        	
			        	}
					});*/
		}
		init();


		function auth(turn){
			
			if(turn){
				PROFILE.auth = true;
				SUPER_PROFILE.auth = true;
				PROFILE.getProfile();
				COMMON_OBJECT.init_common_listeners();
				//TRUST_LIST.init();
				set_unset_links(1, '.menu-icon-activities', '#my-activities-page');
				set_unset_links(1, '.menu-icon-options', '#options-page');
				set_unset_links(1, '[data-link=#trust-list]');
				SOCIAL.init();
				SOCIAL.listener();
			}else{
				PROFILE.auth = false;
				SUPER_PROFILE.auth = false;
				PROFILE.updateMenu();
				set_unset_links(0, '.menu-icon-activities');
				set_unset_links(0, '.menu-icon-options');
				set_unset_links(0, '[data-link=#trust-list]');
			}
			
			
		}
		$("#logout").click(function(){
			PROFILE.logout();
		});

		function set_unset_links(parameter, selector, href){
			switch(parameter){
				case 0:
					$(selector).removeAttr("href");
					break;
				case 1:
					var links_array = $(selector);					
					for(var i = 0; i < links_array.length; i++){
						if($(links_array[i]).data('link')){
							$(links_array[i]).attr('href', $(links_array[i]).data('link'));
						}else{
							$(links_array[i]).attr('href', href);
						}						
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
					console.log('format:' + event.target.files[0].type);
					console.log('size:' + event.target.files[0].size );
				}else{
					console.log('format:' + event.target.files[0].type);
					console.log('size:' + event.target.files[0].size );
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
			      client.open("post", "http://gurtom.mobi/i/up.php", true);
			      client.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
			      client.setRequestHeader("Content-Type", "multipart/form-data");
			      client.send(formData);  /* Send to server */ 
			   }
			     
			   client.onreadystatechange = function() 
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
					console.log('format:' + event.target.files[0].type);
					console.log('size:' + event.target.files[0].size );
				}else{
					console.log('format:' + event.target.files[0].type);
					console.log('size:' + event.target.files[0].size );
					alert(LOCALE_ARRAY_ADDITIONAL.bad_format_or_size[CURRENT_LANG]);
				}
			}
			///////////////////////////////
			var client = new XMLHttpRequest();
  
			   function upload() 
			   {
			      //var file = document.getElementById("uploadfile");
			     
			      /* Create a FormData instance */
			      var formData = new FormData();
			      /* Add the file */ 
			      formData.append("av", FILE);

			      client.open("post", "http://gurtom.mobi/l/index.php?m=2", true);
			      client.setRequestHeader("Content-Type", "multipart/form-data");
			      client.send(formData);  /* Send to server */ 
			   }
			     
			   /* Check the response status */  
			   client.onreadystatechange = function() 
			   {
			      if (client.readyState == 4 && client.status == 200) 
			      {
			      	console.log("send ok");
			        //alert(client.statusText);
			      }
			   }
			   upload();
		}

		

		var SOCIAL = {
			vk:{
				auth: false,
				activate: "http://gurtom.mobi/sn/vk.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=5",
				sn: "http://gurtom.mobi/sn/vk_sn.php",
				element: "a.vk",
				ind: "5",
				prefix_elem: "vk"
			},
			fb:{
				auth: false,
				activate: "http://gurtom.mobi/sn/fb.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=1",
				sn: "http://gurtom.mobi/sn/fb_sn.php",
				element: "a.fb",
				ind: "1",
				prefix_elem: "fb"
			},
			tw:{
				auth: false,
				activate: "http://gurtom.mobi/sn/tw.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=3",
				sn: "http://gurtom.mobi/sn/tw_sn.php",
				element: "a.tw",
				ind: "3",
				prefix_elem: "tw"
			},
			gp:{
				auth: true,
				activate: "http://gurtom.mobi/sn/gp.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=2",
				sn: "http://gurtom.mobi/sn/gp_sn.php",
				element: "a.gp",
				ind: "2",
				prefix_elem: "gp"
			},
			in:{
				auth: false,
				activate: "http://gurtom.mobi/sn/in.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=4",
				sn: "http://gurtom.mobi/sn/in_sn.php",
				element: "a.in",
				ind: "4",
				prefix_elem: "in"
			},
			ok:{
				auth: false,
				activate: "http://gurtom.mobi/sn/ok.php",
				deactivate: " http://gurtom.mobi/sn/sn_rm.php?sn=6",
				sn: "http://gurtom.mobi/sn/ok_sn.php",
				element: "a.ok",
				ind: "6",
				prefix_elem: "ok"
			}, 
			init: function(){
				
				for (var i in this){
					if(typeof this[i] != "object") continue;
					var soc = this[i];
					var link = soc.auth ? soc.sn : soc.activate;
					if(SUPER_PROFILE.auth){
						$button = $("#profile-page").find(soc.element);
						$button.attr("href",link);
						if(!soc.auth){
							$button.attr("href","");
							$button.attr("onclick", "location.href='" + soc.activate + "'");
							$button.addClass("active");
							$button.html('<span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span>');
							console.log('non active');
							}
						else{
							console.log('active');
							$button.attr("href","");
							$button.removeClass("active");
							$button.html('<span>' + LOCALE_ARRAY_ADDITIONAL.deactivate[CURRENT_LANG] + '</span>');
							var href_acivate = soc.activate;
							var prefix_elem = soc.prefix_elem;

							$button.on("click", function(){
								if($(this).data("index") == SOCIAL.vk.ind){
									$(this).parent().html('<a class="vk active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.vk.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}
								if($(this).data("index") == SOCIAL.fb.ind){
									$(this).parent().html('<a class="fb active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.fb.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}
								if($(this).data("index") == SOCIAL.tw.ind){
									$(this).parent().html('<a class="tw active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.tw.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}
								if($(this).data("index") == SOCIAL.gp.ind){
									$(this).parent().html('<a class="gp active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.gp.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}
								if($(this).data("index") == SOCIAL.in.ind){
									$(this).parent().html('<a class="in active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.in.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}
								if($(this).data("index") == SOCIAL.ok.ind){
									$(this).parent().html('<a class="ok active" data-index = "' + $(this).data("index") +'" href="' + SOCIAL.ok.activate + '"><span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span></a>');
								}									
								
								$.ajax({
								  url: 'http://gurtom.mobi/sn/sn_rm.php?sn=' + $(this).data("index"),
								  type: "GET",
								  xhrFields: {
							       withCredentials: true
							      },
						          crossDomain: true,
								  complete: function( response ){	  	
									console.log('ok');
								  }
								});
								
							});
							}
						//lang_activate_el($button);
						}
					//$("#main-page").find(soc.element).attr("href",soc.activate);
				}
				for (var j in this){
					if(typeof this[i] != "object") continue;
					var soc = this[i];
					var link = soc.auth ? soc.sn : soc.activate;
					if(PROFILE.auth){
						$button = $("#main-page").find(soc.element);
						$button.attr("href",link);
						if(!soc.auth){
							$button.attr("href",soc.activate);
							$button.addClass("active");
							$button.html('<span>' + LOCALE_ARRAY_ADDITIONAL.activate[CURRENT_LANG] + '</span>');
							}
						else{
							$button.attr("href",soc.deactivate);
							$button.removeClass("active");
							$button.html('<span>' + LOCALE_ARRAY_ADDITIONAL.deactivate[CURRENT_LANG] + '</span>');
							}
						//lang_activate_el($button);
						}
					//$("#main-page").find(soc.element).attr("href",soc.activate);
				}				
			},
			listener: function(){
				$('#profile-page input[type=file]').on('change', function(){
					$( "#picture_form" ).submit();
					//$.mobile.navigate('#spheres-address');
					//$.mobile.navigate('#profile-page');
				});
				$('#profile-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right').off();
				$('#profile-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right').click(function(){
					if($('#profile-page #male').hasClass('ui-radio-on')){
						var g = 0;
					}else{
						var g = 1;
					}
					if(FILE){
						var av = FILE;
					}else{
						var av = '';
					}
					var db = $('#profile-page [name=year]').val() + '-' + $('#profile-page [name=month]').val() + '-' + $('#profile-page [name=date]').val();
					var fn = $('#profile-page [name=fn]').val();
					var ln = $('#profile-page [name=ln]').val();
					var url = $('#profile-page [name=url]').val();
					
					$.ajax({
						url: "http://gurtom.mobi/l/index.php?m=2",
				        type: "POST",
				        data: {"db": db,
				    		   "g": g,
				    		   "fn": fn,
				    		   "ln": ln,
				    		   "url": url,
				    		   "av": av},
				        crossDomain: true,
				        xhrFields: {
					       withCredentials: true
					    },
				        complete: function(data){
				        	console.log("saved ok");
				      		$('#profile-page .name').html(fn + ' ' + ln);
				        	alert(LOCALE_ARRAY_ADDITIONAL.saved_successfull[CURRENT_LANG]);
				            //alert('okay');
				        }
					});

				});

				$('#profile-page #change_pass_button').click(function(){
					var wrong_enter = 0;
					if($('#profile-page [name=user_password_old]').val() == ""){
						wrong_enter = 1;
						alert(LOCALE_ARRAY_ADDITIONAL.enter_old_password[CURRENT_LANG]);
					}
					if($('#profile-page [name=user_password_new]').val() == ""){
						wrong_enter = 1;
						alert(LOCALE_ARRAY_ADDITIONAL.enter_new_password[CURRENT_LANG]);
					}
					if($('#profile-page [name=user_password_repeat]').val() == "" || $('#profile-page [name=user_password_repeat]').val() != $('#profile-page [name=user_password_new]').val()){
						wrong_enter = 1;
						alert(LOCALE_ARRAY_ADDITIONAL.repeat_new_password[CURRENT_LANG]);
					}
					if(wrong_enter == 0){
						$.ajax({
							url: "http://gurtom.mobi/l/index.php?m=2",
					        type: "POST",
					        data: {"user_password_old": $('#profile-page [name=user_password_old]').val(),
					    		   "user_password_new": $('#profile-page [name=user_password_new]').val(),
					    		   "user_password_repeat": $('#profile-page [name=user_password_repeat]').val(),
					    		   "user_edit_submit_password": "Change password"},
					        crossDomain: true,
					        xhrFields: {
						       withCredentials: true
						    },
					        complete: function(data){
					        	if(data.responseText.indexOf("wrong") > -1){
					        		alert(LOCALE_ARRAY_ADDITIONAL.old_password_is_wrong[CURRENT_LANG]);
					        	}else{
					        		console.log('Password was changed!');
					        		$.mobile.navigate("#profile-page");
					        	}
					        	console.log(data);
					        }
						});
					}

				});
			},
		};
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
				url: "http://gurtom.mobi/l/index.php?m=0",
		        type: "POST",
		        data: data,
		        crossDomain: true,
		        xhrFields: {
			       withCredentials: true
			    },
		        complete: function(data){
		            if(data.responseText.indexOf("You are logged")!==-1){
		            	$.mobile.navigate("#news-page");
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
    		var user_name = $(this).find("input[type=text]").val();
    		var data = {
    			user_name:user_name,
    			request_password_reset: "Reset my password"
    		}
    		$.ajax({
    			url:"http://gurtom.mobi/l/index.php?m=3",
    			type: "POST",
    			data: data,
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
    	//
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
				url: "http://gurtom.mobi/l/index.php?m=1",
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
		            	update_img("#register-form .captcha img","http://gurtom.mobi/l/tools/showCaptcha.php");
		            }
		            else if(resp.indexOf("Please click the VERIFICATION LINK within that mail.")!==-1){
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
		
    	var PROFILE = {
    		auth : false,
    		profile_obj: [],
    		getProfile:function(){
    				var that = this;	    			
					console.log("profile_obj");
		            console.log(that.profile_obj);
		            if(that.profile_obj && !that.profile_obj.error){
		            	console.log('yeah');
		            	that.email = that.profile_obj.email;
			            that.login = that.profile_obj.login;
			            that.avatar = that.profile_obj.avatar;
			            that.ID = that.profile_obj.id;
			            that.birth = that.profile_obj.birth;
			            that.first_name = that.profile_obj.user_first;
			            that.last_name = that.profile_obj.user_last;
			            that.gender = that.profile_obj.gender;
			            that.osmd = that.profile_obj.osmd;
			            that.nco = that.profile_obj.nco;
			            that.payment = that.profile_obj.payment;
			            SUPER_PROFILE.gender = that.gender;
			            SUPER_PROFILE.id = that.profile_obj.id;
			            for (var i in SOCIAL){
							if(typeof SOCIAL[i] != "object") continue;
							var soc = SOCIAL[i];
							for(var b in that.profile_obj){
								if(b != i) continue;								
								if(that.profile_obj[b] != 0){
									soc.auth = true;
								}else{
									soc.auth = false;
								}	
								//soc.auth = that.profile_obj[b]?true:false;

							}
						}
						
			            that.updateMenu();
			            SOCIAL.init();
		            }else{
		            	console.log('nothing');
		            	$.ajax({
							url:"http://gurtom.mobi/profile.php",
							type:"GET",
					        crossDomain: true,
							xhrFields: {
						       withCredentials: true
						    },
					        complete: function(response){
					        	var data = response.responseText;
					            that.profile_obj = jQuery.parseJSON(data)[0];
					            that.email = that.profile_obj.email;
					            that.login = that.profile_obj.login;
					            that.avatar = that.profile_obj.avatar;
					            that.ID = that.profile_obj.id;
					            that.birth = that.profile_obj.birth;
					            that.first_name = that.profile_obj.user_first;
					            that.last_name = that.profile_obj.user_last;
					            that.gender = that.profile_obj.gender;
					            that.osmd = that.profile_obj.osmd;
					            that.nco = that.profile_obj.nco;
					            that.payment = that.profile_obj.payment;
					            SUPER_PROFILE.gender = that.gender;
					            SUPER_PROFILE.id = that.profile_obj.id;
					            for (var i in SOCIAL){
									if(typeof SOCIAL[i] != "object") continue;
									var soc = SOCIAL[i];
									for(var b in that.profile_obj){
										if(b != i) continue;								
										if(that.profile_obj[b] != 0){
											soc.auth = true;
											console.log(SOCIAL[i]);
											console.log(SOCIAL[i].auth);
										}else{
											soc.auth = false;
										}	
										//soc.auth = that.profile_obj[b]?true:false;

									}
								}
					            that.updateMenu();
					            SOCIAL.init();		            
					        }
						}); 	
		            	
		            }
    			},
    		logout:function(){
    			var self = this;
    			auth(false);
    			$.ajax({
	    			url:"http://gurtom.mobi/l/index.php?logout=1&logout=1",
	    			type:"GET",
			        crossDomain: true,
	    			xhrFields: {
				       withCredentials: true
				    },
			        complete: function(response){
			        	self.auth = false;
			        	$("#login-form [name=login]").val("");
			        	$("#login-form [name=pass]").val("");
			            self.updateMenu();
			            PROFILE.profile_obj = false;
			        	}
					})
    		},
    		updateMenu:function(){
	    			if(this.auth){
	    				$(".user-info .username").html(this.login);
	    				$('#profile-page [name=fn]').val(this.first_name);
	    				$('#profile-page [name=ln]').val(this.last_name);
	    				$('#profile-page .login > span:eq(1)').html(this.login);
	    				$('#profile-page #avatar').attr('src', 'http://' + this.avatar);
	    				$('#menu_avatar').html('<img id="avatar" src="http://' + this.avatar + '">');
	    				switch(this.gender){
	    					case "0":
	    						$('#profile-page #male').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
	    						break;
	    					case "1":
	    						$('#profile-page #female').attr('class', 'ui-btn ui-btn-inherit ui-first-child ui-btn-active ui-radio-on');
	    						break;
	    				}
	    				var match_array = this.birth.match(/[0-9]+/ig);
						var year_val = match_array[0];
						$('#profile-page [name=year]  option[value=' + year_val + ']').prop('selected', true);
						var month_val = match_array[1];
						$('#profile-page [name=month]  option[value=' + month_val + ']').prop('selected', true);
						var date_val = match_array[2];
						$('#profile-page [name=date]  option[value=' + date_val + ']').prop('selected', true);
						$('#profile-page select').selectmenu().selectmenu("refresh", true);
	    				$(".user-info .email").html(this.email);
	    				//$(".user-info .avatar").css("background-image","url('"+this.avatar+"')");
	    				$(".user-info .id").html("ID: "+this.ID);
	    				$(".user-info .name").html(this.first_name + " " + this.last_name);
	    				var ribbons = '';
	    				if(this.email != "0"){
	    					ribbons += '<img style = "margin: 10px;" class="ui-corner-all" src="images/trust-icon-email.png">';
	    				}
	    				if(this.nco != "0"){
	    					ribbons += '<img style = "margin: 10px;" class="ui-corner-all" src="images/trust-icon-community.png">';
	    				}
	    				if(this.osmd != "0"){
	    					ribbons += '<img style = "margin: 10px;" class="ui-corner-all" src="images/trust-icon-house.png">';
	    				}
	    				if(this.payment != "0"){
	    					ribbons += '<img style = "margin: 10px;" class="ui-corner-all" src="images/trust-icon-wallet.png">';
	    				}
	    				$('#profile-page #ribbons').html( ribbons );
	    				$("#left-panel").addClass("auth-panel");
	    				}
	    			else{
	    				$("#left-panel").removeClass("auth-panel");
	    				$(".user-info .username").html("Guest");
	    				$(".user-info .email").html("");

	    				$(".user-info .avatar").css("background-image","");
	    				$(".user-info .id").html("");
	    				$(".user-info .name").html("");

	    				}
    			}
    	};

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