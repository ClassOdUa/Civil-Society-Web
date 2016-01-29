var PROFILE = {
	auth: false,
	profile_obj: [],
	ind: 0,
	ida: 0,
	getProfile:function(){
		var that = this;
		//console.log("profile_obj");
		//console.log(that.profile_obj);
		if(that.profile_obj && !that.profile_obj.error){
			//console.log('yeah');
			that.email = that.profile_obj.email;
			that.login = that.profile_obj.login;
			that.avatar = that.profile_obj.avatar;
			that.ID = that.profile_obj.id;
			that.birth = that.profile_obj.birth;
			that.first_name = that.profile_obj.user_first;
			that.last_name = that.profile_obj.user_last;
			that.gender = that.profile_obj.gender;
			that.osmd = that.profile_obj.osmd;
			that.go = that.profile_obj.go;
			that.nco = that.profile_obj.nco;
			that.payment = that.profile_obj.payment;
			that.bankid = that.profile_obj.bankid;
			that.adr = that.profile_obj.adr;

			//createCookie('id_cookie', that.profile_obj.id);
			//OLD_ID_COOKIE = that.profile_obj.id;

			SUPER_PROFILE.gender = that.profile_obj.gender;
			SUPER_PROFILE.id = that.profile_obj.id;
			SUPER_PROFILE.nco = that.profile_obj.nco;
			SUPER_PROFILE.payment = that.profile_obj.payment;
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
			$.ajax({
				url: mainURL + "/profile.php",
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
					that.go = that.profile_obj.go;
					that.nco = that.profile_obj.nco;
					that.payment = that.profile_obj.payment;
					that.bankid = that.profile_obj.bankid;
					that.adr = that.profile_obj.adr;

						//createCookie('id_cookie', that.profile_obj.id);
						//OLD_ID_COOKIE = that.profile_obj.id;

					SUPER_PROFILE.gender = that.profile_obj.gender;
					SUPER_PROFILE.id = that.profile_obj.id;
					SUPER_PROFILE.nco = that.profile_obj.nco;
					SUPER_PROFILE.payment = that.profile_obj.payment;
					for (var i in SOCIAL){
						if(typeof SOCIAL[i] != "object") continue;
						var soc = SOCIAL[i];
						for(var b in that.profile_obj){
							if(b != i) continue;
							if(that.profile_obj[b] != 0){
								soc.auth = true;
								//console.log(SOCIAL[i]);
								//console.log(SOCIAL[i].auth);
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
	updateMenu:function(){
		if(this.auth){
			$(".user-info .username").html(this.login);
			$('#profile-page [name=fn]').val(this.first_name);
			$('#profile-page [name=ln]').val(this.last_name);
			$('#profile-page .login > span:eq(1)').html(this.login);
			$('#profile-page #avatar').attr('src', '.' + this.avatar);
			$('#menu_avatar').html('<img id="avatar" src="' +  mainURL + this.avatar + '">');
			$('input:radio[name=gender]').filter('[value="'+ this.gender + '"]').next().click()
			var match_array = this.birth.match(/[0-9]+/ig);
			var year_val = match_array[0];
			$('#profile-page [name=year] option[value=' + year_val + ']').prop('selected', true);
			var month_val = match_array[1];
			$('#profile-page [name=month] option[value=' + month_val + ']').prop('selected', true);
			var date_val = match_array[2];
			$('#profile-page [name=date] option[value=' + date_val + ']').prop('selected', true);
			$('#profile-page select').selectmenu().selectmenu("refresh", true);
			$(".user-info .email").html(this.email);
			//$(".user-info .avatar").css("background-image","url('"+this.avatar+"')");
			$(".user-info .id").html("ID: "+this.ID);
			$(".user-info .name").html(this.first_name + " " + this.last_name);
			var ribbons = '<img style = "margin: 3px;" class="ui-corner-all" src="images/trust-icon-email.png">';
			if(this.go != "0"){
				ribbons += '<img style = "margin: 3px;" class="ui-corner-all" src="images/trust-icon-community.png">';
			} else {
				ribbons += '<a href="#community"><img style = "margin: 3px; filter: alpha(Opacity=30); opacity: 0.3;" src="images/trust-icon-community.png"></a>';
			}
			if(this.osmd != "0"){
				ribbons += '<img style = "margin: 3px;" class="ui-corner-all" src="images/trust-icon-house.png">';
			} else {
				ribbons += '<a href="#house"><img style = "margin: 3px; filter: alpha(Opacity=30); opacity: 0.3;" class="ui-corner-all" src="images/trust-icon-house.png"></a>';
			}
			if(this.payment != "0"){
				ribbons += '<img style = "margin: 3px;" class="ui-corner-all" src="images/trust-icon-wallet.png">';
			} else {
				ribbons += '<a href="#wallet"><img style = "margin: 3px; filter: alpha(Opacity=30); opacity: 0.3;" class="ui-corner-all" src="images/trust-icon-wallet.png"></a>';
			}
			if(this.bankid != "0"){
				ribbons += '<img style = "margin: 3px;" class="ui-corner-all" src="images/trust-icon-password.png">';
			} else {
				ribbons += '<a href="#bankid"><img style = "margin: 3px; filter: alpha(Opacity=30); opacity: 0.3;" class="ui-corner-all" src="images/trust-icon-password.png"></a>';
			}

			// if(this.fb != "0"){
			// 	ribbons += '<img class="ui-corner-all ribbon" src="images/icon-fb.png">';
			// } else {
			// 	ribbons += '<a href="sn/fb.php"><img style = "filter: alpha(Opacity=30);" class="ui-corner-all ribbon" src="images/icon-fb.png"></a>';
			// }

			// if(this.gp != "0"){
			// 	ribbons += '<img class="ui-corner-all ribbon" src="images/icon-gp.png">';
			// } else {
			// 	ribbons += '<a href="sn/fb.php"><img style = "filter: alpha(Opacity=30);" class="ui-corner-all ribbon" src="images/icon-gp.png"></a>';
			// }

			PROFILE.address_list();

			$('#profile-page #ribbons').html( ribbons );
			$("#left-panel").addClass("auth-panel");
		} else {
			$("#left-panel").removeClass("auth-panel");
			$(".user-info .username").html("Guest");
			$(".user-info .email").html("");

			$(".user-info .avatar").css("background-image","");
			$(".user-info .id").html("");
			$(".user-info .name").html("");
		}
	},
	address_list: function(){
		var l_a = 0;
		var l_adr = '';
		var l_ida = 0;
		for (var l_i = 0; l_i < 3; l_i++) {
			l_a = l_i + 1;

			if(l_i < this.adr.length){
				l_adr = '';
				switch(CURRENT_LANG){
					case 'en':
						l_adr = this.adr[l_i].city_en;
						break;
					case 'uk':
						l_adr = this.adr[l_i].city_uk;
						break;
					case 'ru':
						l_adr = this.adr[l_i].city_ru;
						break;
				}
				l_adr = l_adr + ', ' + this.adr[l_i].str + ', ' + this.adr[l_i].bld;
				l_ida = this.adr[l_i].ida;
			}else{
				l_ida = 0;
				l_adr = LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG];
			}

			$('#profile-page .address-item [ind=' + l_a + ']').attr('ida', l_ida);
			$('#profile-page .address-item [ind=' + l_a + ']').html(l_adr);
		}
	},
	address: function(){
		GoogleMapsAdress.initialize();
		if(PROFILE.ida > 0){
			ADRESS.init();
			$('#delete_address').show();
		}else{
			$('#delete_address').hide();

		}
	},
	events:function(){

		$('#btn_other_adr').click(function(){
			$('#btn_other_adr').css('display', 'none');
			$('#other_adr').css('display', 'block');
		});

		$('#logout').click(function(){
			PROFILE.auth = false;
			PROFILE.ID = 0;
			PROFILE.ind = 0;
			PROFILE.adr = [];
			$('#login-form [name=login]').val('');
			$('#login-form [name=pass]').val('');
			$('#menu_avatar').html('');
			PROFILE.profile_obj = false;
			PIF.pif_array = [];
			// createCookie('id_cookie', -1);
			// OLD_ID_COOKIE = -1;

			$.ajax({
				url: mainURL + '/l/index.php?logout=1',
				type:'GET',
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(l_response){
					PROFILE.updateMenu();
				}
			});
		});

		$('.btn_circle.img_gp').click(function(){
			location.href = mainURL + '/sn/gp.php';
		});

		$('.btn_circle.img_fb').click(function(){
			location.href = mainURL + '/sn/fb.php';
		});

		$('.btn_circle.img_in').click(function(){
			location.href = mainURL + '/sn/in.php';
		});

		$('#profile-page .address-item a').click(function(){
			PROFILE.ind = $(this).attr('ind');
			PROFILE.ida = $(this).attr('ida');
			$.mobile.navigate('#address-page');
		});

		$('#address-page .btn-save').click(function(){
			ADRESS.save_address();
		});	

		$('#findgps').click(function(){
			$.mobile.loading( "show", {theme: "z"});
			navigator.geolocation.getCurrentPosition(function (pos) {
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				if (lat == null) {
					alert(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
				} else {
					g_lat = lat;
					g_lng = lng;
					//console.log(lat);
					//console.log(lng);
					GoogleMapsAdress.moveMarker(lat, lng);
					var geocoder = new google.maps.Geocoder();
					var latLng = new google.maps.LatLng(lat, lng);
					if(geocoder){
						geocoder.geocode({'latLng': latLng,'language': 'en'},function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								//console.log(results);
								var address = results[0].address_components;

								var country = ADRESS.getGPSByType(address,"country");
								var state = ADRESS.getGPSByType(address,"administrative_area_level_1");
								var county = ADRESS.getGPSByType(address,"administrative_area_level_3");
								var city = ADRESS.getGPSByType(address,"locality");
								//console.log('build: ' + results[0].address_components[0].long_name);
								var street = ADRESS.getGPSByType(address,"route");
								var build = ADRESS.getGPSByType(address,"street_number");

								ADRESS.gpsSet(country,state,county,city,street,build, lat, lng);
							} else {
								alert(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
							}
						});
					}
				}
			});
			$.mobile.loading( "hide" );
		});
	},
};

var SOCIAL = {
	vk:{
		auth: false,
		activate: mainURL + "/sn/vk.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=5",
		sn: mainURL + "/sn/vk_sn.php",
		element: "a.vk",
		ind: "5",
		prefix_elem: "vk"
	},
	fb:{
		auth: false,
		activate: mainURL + "/sn/fb.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=1",
		sn: mainURL + "/sn/fb_sn.php",
		element: "a.fb",
		ind: "1",
		prefix_elem: "fb"
	},
	tw:{
		auth: false,
		activate: mainURL + "/sn/tw.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=3",
		sn: mainURL + "/sn/tw_sn.php",
		element: "a.tw",
		ind: "3",
		prefix_elem: "tw"
	},
	gp:{
		auth: true,
		activate: mainURL + "/sn/gp.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=2",
		sn: mainURL + "/sn/gp_sn.php",
		element: "a.gp",
		ind: "2",
		prefix_elem: "gp"
	},
	in:{
		auth: false,
		activate: mainURL + "/sn/in.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=4",
		sn: mainURL + "/sn/in_sn.php",
		element: "a.in",
		ind: "4",
		prefix_elem: "in"
	},
	ok:{
		auth: false,
		activate: mainURL + "/sn/ok.php",
		deactivate: mainURL + "/sn/sn_rm.php?sn=6",
		sn: mainURL + "/sn/ok_sn.php",
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
					//console.log('non active');
					}
				else{
					//console.log('active');
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
							url: mainURL + '/sn/sn_rm.php?sn=' + $(this).data("index"),
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

		// $('#profile-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right').off();

		//TODO: All events for profile must be in PRIFILE.events!!!

		$('#profile-page [name=fn]').on('change', function(){
			var l_fn = $('#profile-page [name=fn]').val().replace(/[\"]/g, "'");
			var l_url = mainURL + "/profile_edit.php";
			var l_data = $.parseJSON('{"fn":"'+ l_fn + '"}');
			$.post(l_url, l_data);
			//TODO: split last name and first name to separate placeholders!!
			var l_ln = $('#profile-page [name=ln]').val();
			$('#profile-page .name').html(l_fn + ' ' + l_ln);
		});

		$('#profile-page [name=ln]').on('change', function(){
			var l_ln = $('#profile-page [name=ln]').val().replace(/[\"]/, "'");
			var l_url = mainURL + "/profile_edit.php";
			var l_data = $.parseJSON('{"ln":"'+ l_ln + '"}');
			$.post(l_url, l_data);
			//TODO: split last name and first name to separate placeholders!!
			var l_fn = $('#profile-page [name=fn]').val();
			$('#profile-page .name').html(l_fn + ' ' + l_ln);
		});

		$('#gender').on('change', function(){
			var l_g = $('#gender :radio:checked').val();
			var l_url = mainURL + "/profile_edit.php";
			var l_data = $.parseJSON('{"g":"'+ l_g + '"}');
			$.post(l_url, l_data);
			PROFILE.gender = l_g;
			SUPER_PROFILE.gender = l_g;
		});

		$('#date_of_birth').on('change', function(){
			var l_db = $('#profile-page [name=year]').val() 
			+ '-' + $('#profile-page [name=month]').val() 
			+ '-' + $('#profile-page [name=date]').val();
			var l_url = mainURL + "/profile_edit.php";
			var l_data = $.parseJSON('{"db":"'+ l_db + '"}');
			$.post(l_url, l_data);
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
					url: mainURL + "/l/index.php?m=2",
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
							//console.log('Password was changed!');
							$.mobile.navigate("#profile-page");
						}
						//console.log(data);
					}
				});
			}
		});
	},
};

var SUPER_PROFILE = {
	auth: false,
	gender: 0,
	id: 0,
	nco: 0,
	checkUser: function(){
		console.log('SUPER_PROFILE.checkUser - EMPTY MODULE ACTIVATED!');
		/*if(readCookie('id_cookie') != OLD_ID_COOKIE){
			location.reload(true);
		}*/
	}
}

var ADRESS = {
	address_arr: [],
	init:function(){
		var object_id = PROFILE.ida;

		this.setListener();

		function callback_country(){
			return function(){
				ADRESS.selectCountry($('#address-page [name=country] > option:eq(0)').val());
				$('#address-page [name=country]').selectmenu("refresh", true);
				ADRESS.enable('state');
			}
		}

		this.getCountry(callback_country());
		this.disable('state');
		this.disable('county');
		this.disable('city');
		this.disable('index');				

		this.setDefault();
		window.ADRESS = ADRESS;
		self.address_arr = PROFILE.adr;
		return false;

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
	gpsSet: function(country,state,county,city,street,house, lat, lng){
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
		} else if (county){
			var name = "county";
			var list_place = self.county;
			var source = county;
			var select_func = self.selectCounty.bind(self);
			county = null;
		} else if (city){
			var name = "city";
			var list_place = self.city;
			var source = city;
			var select_func = self.selectCity.bind(self);
			city = null;
		} else {
			$("#address-page [name=street]").val(street);
			$("#address-page [name=house]").val(house);
			$.mobile.loading( "hide" );
			return ;
		}

		var res = this.levFind(source,list_place);
		//console.log(source + ' 1 ' + self.city);

		self.setOption(name,res.id);

		select_func(res.id,function(){
			self.gpsSet(country, state, county, city, street, house);
		});
	},
	getGPSByType:function(results,type){
		for(var i in results){
			var item = results[i];
			if(item.types.indexOf(type) > -1){
				return item.long_name;
			}
		}
		return "";
	},
	setListener:function(){
		var self = this;
		self.clear_listeners();
		$("#address-page [name=country]").change(function(){
			var value = $(this).val();
			self.selectCountry(value);
			$("#address-page [name=country]").selectmenu("refresh", true);
		});
		$("#address-page [name=state]").change(function(){
			var value = $(this).val();
			self.selectState(value);
			$("#address-page [name=state]").selectmenu("refresh", true);
		});
		$("#address-page [name=county]").change(function(){
			var value = $(this).val();
			self.selectCounty(value);
			$("#address-page [name=county]").selectmenu("refresh", true);
		});
		$("#address-page [name=city]").change(function(){
			var value = $(this).val();
			self.selectCity(value);
			$("#address-page [name=city]").selectmenu("refresh", true);
		});
		$('#address-page .btn-delete.ui-btn.ui-corner-all').click(function(){
			self.delete_address();
		});
		$("#address-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right").click(function(){
			$('#address-page .btn-save.ui-btn.ui-corner-all').click();
		});

		$("#address-page [name=house]").change(function(){
			var value = $(this).val();

			var m = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
			+ $("#address-page [name=house]").val() + ",+"
			+ $("#address-page [name=street]").val() + ",+"
			+ $("#address-page [name=city] option:selected").text() + ",+"
			+ $("#address-page [name=country] option:selected").text()
			+ "&sensor=false";

			$.ajax({
				url: m,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				dataType: 'jsonp',
				complete: function(result){
					//console.log(result);
					l_res = jQuery.parseJSON(result);						
					//console.log((result.results[0]).geometry.location.lat+0.00003);
					//console.log((result.results[0]).geometry.location.lng);
				},
			});


		});
	},
	clear_listeners: function(){
		var self = this;
		$('#address-page [name=country]').off();
		$('#address-page [name=state]').off();
		$('#address-page [name=county]').off();
		$('#address-page [name=city]').off();
		$('#address-page .btn-delete.ui-btn.ui-corner-all').off();
		$('#address-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right').off();
	},
	save_address:function(){
		var self = this;
		var reg_adr = 0;

		$.mobile.loading( "show", {theme: "z"});

		if($('#address-page .ui-btn.ui-btn-inherit.ui-btn-icon-left').hasClass('ui-checkbox-on')){
			reg_adr = 1;
		}				
		
		var ida = PROFILE.ida;

		$.ajax({
			url: mainURL + '/user_address_add.php?ida=' + ida
														+ ('&c=' + $('#address-page [name=city]').val()).replace("'", "`")
														+ ('&str=' + $('#address-page [name=street]').val()).replace("'", "`")
														+ '&bld=' + $('#address-page [name=house]').val()
														+ '&oth=' + $('#address-page [name=comment]').val()
														+ '&zip=' + $('#address-page [name=index]').val()
														+ '&reg_adr=' + reg_adr + '&lat=' + GoogleMapsAdress.lat + '&lng=' + GoogleMapsAdress.lng,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(p_result){
				//message_result(p_result);
				$.mobile.loading( "hide" );
				$('.menu-neighborhoods').click();
				SPHERES.initial(false, true);
				$.mobile.navigate('#votings-page?&nh=1');
				//$.mobile.navigate("#edit-address");
			},
		});
	},
	delete_address:function(){
		$.mobile.loading( "show", {theme: "z"});
		var self = this;
		if(PROFILE.ida){
			$.ajax({
				url: mainURL + '/user_address_rm.php?ida=' + PROFILE.ida,
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
					$.mobile.navigate("#profile-page");
					SPHERES.initial(false, true);						
					//self.getCurrent(0, callback_current(), page);				
				},
			});
		}
	},
	clear_address_info:function(){
		var self = this;
		$('#profile-page [ind=' + PROFILE.ind + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG]);

		function callback_country(){
			return function(){
				//self.enable(page, 'state');
				function callback_select_country(){
					return function(){
						//self.disable(page, 'state');
						self.enable('state');
						//console.log('state');
					}
				}
				self.selectCountry($('#address-page [name=country] > option:eq(0)').val(), callback_select_country());

				if(location.href.indexOf('#address-page') > -1){
					$('#address-page [name=country]').selectmenu("refresh", true);						
				}
			}
		}
		self.getCountry(callback_country());
		//self.disable('state');
		self.disable('county');
		self.disable('city');
		self.disable('index');
		$('#address-page [name=street]').val('');
		$('#address-page [name=house]').val('');
		$('#address-page [name=comment]').val('');
		$('#address-page .ui-btn ui-btn-inherit.ui-btn-icon-left.ui-checkbox-on').attr('class', 'ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off');
		$('#address-page [name=off_address]').data('cacheval', 'true');
	},
	selectCountry:function(idc,cb_){
		this.disable("county");
		this.enable("state");
		this.getState(idc,function(res){
			$("#address-page [name=state]").val('');
			if(cb_)cb_(res);
		});
	},
	selectState:function(ids, cb_){
		this.disable("city");
		this.enable("county")
		var idc = $("#address-page [name=country]").val();
		//alert(idc + ',' + ids);
		this.getCounty(idc,ids,function(res){
			$("#address-page [name=county]").val('');
			if(cb_)cb_(res);					
		});
	},
	selectCounty:function(idr, cb_){
		this.disable("index");
		this.enable("city");
		var idc = $("#address-page [name=country]").val();
		var ids = $("#address-page [name=state]").val();

		this.getCity(idc,ids,idr,function(res){
			$("#address-page [name=city]").val('');
			if(cb_)cb_(res);					
		});
	},
	selectCity:function(idcity,cb_){
		this.enable("index");
		//console.log(idcity);
		this.getIndex(idcity,function(res){
			$("#address-page [name=index]").val('');
			if(cb_)cb_(res);					
		});
	},
	getCountry:function(cb){/*cb*/
		var self = this;
		if(self.country){
			$("#address-page [name=country]").html('');
				for(var i = 0; i < self.country.length; i++){
					var c = self.country[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					if(CURRENT_LANG){
						switch(CURRENT_LANG){
							case 'uk':
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
							case 'uk':
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

					$("#address-page [name=country]").append(option);
					//console.log(1);
				}
				if(cb){
					cb(self.country);
				}
		} else {
			$.ajax({
				url: mainURL + "/list_adr_country.php",
				type:"GET",
				xhrFields: {
					withCredentials: true
				},
				async: true,
				crossDomain: true,
				complete: function(response){
					var data = response.responseText;
					// //console.log(data);
					self.country = jQuery.parseJSON(data);
					//console.log(self.country);
					$("#address-page [name=country]").html('');

					for(var i = 0; i < self.country.length; i++){
						var c = self.country[i];
						var option = document.createElement("option");
						$(option).val(c.id);
						if(CURRENT_LANG){
							switch(CURRENT_LANG){
								case 'uk':
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
								case 'uk':
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

						$("#address-page [name=country]").append(option);
						//console.log(1);
					}
					if(cb){
						cb(self.country);
					}
				}
			});
		}
	},
	getState:function(idc,cb){
		var self = this;
		if(self.state){
			$.ajax({
			url: mainURL + "/list_adr_state.php?idc="+idc,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			async: true,
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
				self.state = jQuery.parseJSON(data);
				$("#address-page [name=state]").html('');
				$("#address-page [name=state]").show();
				for(var i = 0; i < self.state.length; i++){
					var c = self.state[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					if(CURRENT_LANG){
						switch(CURRENT_LANG){
							case 'uk':
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
							case 'uk':
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

						$("#address-page [name=state]").append(option);
					
					}
					//lang_activate_el("#address-item-" + page + " [name=state]");
					if(cb){
						cb(self.state);
					}
				}
			});

		} else {
			$.ajax({
			url: mainURL + "/list_adr_state.php?idc="+idc,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			async: true,
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
				self.state = jQuery.parseJSON(data);
				$("#address-page [name=state]").html('');
				$("#address-page [name=state]").show();
				for(var i = 0; i < self.state.length; i++){
					var c = self.state[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					if(CURRENT_LANG){
						switch(CURRENT_LANG){
							case 'uk':
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
							case 'uk':
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

						$("#address-page [name=state]").append(option);
					
					}
					//lang_activate_el("#address-item-" + page + " [name=state]");
					if(cb){
						cb(self.state);
					}
				}
			});
		}
	},
	getCounty:function(idc,ids,cb){
		var self = this;
		$.ajax({
			url: mainURL + "/list_adr_county.php?idc="+idc+"&ids="+ids,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
			 // //console.log(data);
				self.county = jQuery.parseJSON(data);
				$("#address-page [name=county]").html('');
				$("#address-page [name=county]").show();
				for(var i = 0; i < self.county.length; i++){
					var c = self.county[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					if(CURRENT_LANG){
						switch(CURRENT_LANG){
							case 'uk':
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
							case 'uk':
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

					$("#address-page [name=county]").append(option);
					
				}
				//lang_activate_el("#address-item-" + page + " [name=county]");
				if(cb){
					cb(self.county);
				}
			}
		})
	},
	getCity:function(idc,ids,idr,cb){
		var self = this;
		$.ajax({
			url: mainURL + "/list_adr_city.php?idc="+idc+"&ids="+ids+"&idr="+idr,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
				self.city = jQuery.parseJSON(data);
				$("#address-page [name=city]").html('');
				$("#address-page [name=city]").show();
				for(var i = 0; i < self.city.length; i++){
					var c = self.city[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					if(CURRENT_LANG){
						switch(CURRENT_LANG){
							case 'uk':
								$(option).html(c.name_uk);
								break;
							case 'en':
								$(option).html(c.name_en);
								break;
							case 'ru':
								$(option).html(c.name_ru);
								break;
						}
					} else {
						switch(DEFAULT_LANG){
							case 'uk':
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

					$("#address-page [name=city]").append(option);
					
				}
				//lang_activate_el("#address-item-" + page + " [name=city]");
				if(cb){
					cb(self.city);
				}
			}
		})
	},
	getIndex:function(idcity,cb){
		var self = this;
		$.ajax({
			url: mainURL + "/list_adr_zip.php?id="+idcity,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
				//console.log(data);
				self.indexes = jQuery.parseJSON(data);
				$("#address-page [name=index]").html('');
				$("#address-page [name=index]").show();
				for(var i = 0; i < self.indexes.length; i++){
					var c = self.indexes[i];
					var option = document.createElement("option");
					$(option).val(c.id);
					$(option).html(c.zip);

					$("#address-page [name=index]").append(option);
				}
				if(cb){
					cb(self.indexes);
				}
			}
		})
	},
	enable:function(name,choose){
		var self = this;
		$('#address-page [name="'+name+'"]').attr("disabled",false);
		if(!choose)$('#address-page [name="'+name+'"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.choose[CURRENT_LANG] + self.set_locale_names( name ));
	},
	set_one_address: function(not_refresh, callback_redirect){
		var self = this;
		var one_address = PROFILE.adr[PROFILE.ind-1];
		$('#address-page #delete_address').attr('style', 'display: block');

		function callback_country(){
			return function(){
				 function callback_state(){
				 	return function(){
				 		function callback_county(){
				 			return function(){
				 				function callback_city(){
				 					return function(){
				 						$('#address-page [name=city] option[value=' + one_address['city_id'] + ']').attr('selected', 'selected');
				 						$('#address-page [name=index] option[value=' + one_address['zip'] + ']').attr('selected', 'selected');
				 						$('#address-page [name=street]').val(one_address['str']);
										$('#address-page [name=house]').val(one_address['bld']);
										$('#address-page [name=comment]').val(one_address['oth']);
										//firefox correctoin
										if($('#address-page [name=county] option').length == 1){
											$('#address-page [name=county]').val( $('#address-page [name=county] option[selected="selected"]').val() );
											$('#address-page [name=county]').parent().children('span').html( $('#address-page [name=county] option[selected="selected"]').html() );
										}//county
										if($('#address-page [name=city] option').length == 1){
											$('#address-page [name=city]').val( $('#address-page [name=city] option[selected="selected"]').val() );
											$('#address-page [name=city]').parent().children('span').html( $('#address-page [name=city] option[selected="selected"]').html() );
										}//city
											$('#address-page [name=index]').val( $('#address-page [name=index] option[selected="selected"]').val() );
											$('#address-page [name=index]').parent().children('span').html( $('#address-page [name=index] option[selected="selected"]').html() );
										//index
										if(location.href.indexOf('#address-page') > -1){
											$('#address-page [name=country]').selectmenu("refresh", true);
											$('#address-page [name=state]').selectmenu("refresh", true);
											$('#address-page [name=county]').selectmenu("refresh", true);
											$('#address-page [name=city]').selectmenu("refresh", true);
											$('#address-page [name=index]').selectmenu("refresh", true);
											//alert($('#address-page [name=index]').val());
										}
				 					}
				 				}
				 				$('#address-page [name=county] option[value=' + one_address['county_id'] + ']').attr('selected', 'selected');
				 				self.selectCity(one_address['city_id'], callback_city());
				 			}
				 		}
					$('#address-page [name=state] option[value=' + one_address['state_id'] + ']').attr('selected', 'selected');
					self.selectCounty(one_address['county_id'], callback_county());
					//alert(one_address['county_en']);									
				 	}									
				//alert(county_id);
				}

				$('#address-page [name=country] option[value=' + one_address['country_id'] + ']').attr('selected', 'selected');
		 		self.selectState(one_address['state_id'], callback_state());
			}
		}
		if(!not_refresh){
			self.selectCountry(one_address['country_id'], callback_country());
		}				
			//$('#address-page [name=street]').val(one_address['str']);
			//$('#address-page [name=house]').val(one_address['bld']);
		if(callback_redirect){
			callback_redirect();
		}
	},
	setOption:function(name,id){
		$("#address-page [name="+name+"]").val(id).attr('selected', true).siblings('option').removeAttr('selected');
		$("#address-page [name="+name+"]").selectmenu("refresh", true);
	},
	setDefault:function(){
		// is it right or must be deleted?
		for(var i = 1; i <= 3; i++){
			$(".address-item a.js-address:eq("+ (i-1) +")")
						.data("en","Address "+i)
						.data("ru","Адресс "+i)
						.data("uk","Адрес "+i);
			 $(".address-item a.js-sphere:eq("+ (i-1) +")")
						.data("en","Choose sphere")
						.data("ru","Выберите сферы")
						.data("uk","Виберіть галузі");
		}
		//lang_activate_el($("#edit-address"));
	},
	disable:function(name){
		if(name == "state"){
			$('#address-page [name="state"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.country[CURRENT_LANG]);
			$('#address-page [name="state"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.country[CURRENT_LANG] + "</option>");
			$('#address-page [name="state"]').attr("disabled","disabled");
			$('#address-page [name="state"]').val("");

			name = "county";
		}
		if(name == "county"){
			$('#address-page [name="county"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.state[CURRENT_LANG]);
			$('#address-page [name="county"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.state[CURRENT_LANG] + "</option>");
			$('#address-page [name="county"]').attr("disabled","disabled");
			$('#address-page [name="county"]').val("");

			name = "city";
		}
		if(name == "city"){
			$('#address-page [name="city"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.county[CURRENT_LANG]);
			$('#address-page [name="city"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.county[CURRENT_LANG] + "</option>");
			$('#address-page [name="city"]').attr("disabled","disabled");
			$('#address-page [name="city"]').val("");
			name = "index";
		}
		if(name == "index"){
			$('#address-page [name="index"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.city[CURRENT_LANG]);
			$('#address-page [name="index"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.city[CURRENT_LANG] + "</option>");
			$('#address-page [name="index"]').attr("disabled","disabled");
			$('#address-page [name="index"]').val("");
		}
	},
	set_locale_names: function( name ){
		switch( name ){
			case 'country':
				return LOCALE_ARRAY_ADDITIONAL.country[CURRENT_LANG];
				break;
			case 'state':
				return LOCALE_ARRAY_ADDITIONAL.state[CURRENT_LANG];
				break;
			case 'county':
				return LOCALE_ARRAY_ADDITIONAL.county[CURRENT_LANG];
				break;
			case 'city':
				return LOCALE_ARRAY_ADDITIONAL.city[CURRENT_LANG];
				break;
			case 'index':
				return LOCALE_ARRAY_ADDITIONAL.index[CURRENT_LANG];
				break;
		}
	}
}

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
		if(location.href.indexOf('#address-page') > -1){

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
					 ADRESS.gpsSet(country,state,county,city,street,build, latLng.lat(), latLng.lng());
				} else {
					console.log(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
				}
				});
			}
		}
	},
	updateMarkerAddress: function(str) {
		var self = this;
	},
	moveMarker: function(height, length){
		var self = this;
		self.lat = height;
		self.lng = length;
		self.marker.setPosition( new google.maps.LatLng( height, length ) );
		self.map.panTo( new google.maps.LatLng( height, length ) );
		self.map.setOptions({ zoom: 18 });
	},
	initialize: function() {
		var self = this;
		var l_title = 'Point A';
		var l_zoom = 8;
		self.lat = 50.447753;
		self.lng = 30.5229279;
		if(PROFILE.ida > 0){
			var l_i = PROFILE.ind - 1;
			self.lat = PROFILE.adr[l_i].lat;
			self.lng = PROFILE.adr[l_i].lng;
			l_zoom = 18;
		}

		var latLng = new google.maps.LatLng(self.lat, self.lng);

		self.map = new google.maps.Map(document.getElementById('mapCanvas_1'), {
			zoom: l_zoom,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		self.marker = new google.maps.Marker({
			position: latLng,
			title: l_title,
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