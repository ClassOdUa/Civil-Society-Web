var PROFILE = {
	auth : false,
	profile_obj: [],
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

			//createCookie('id_cookie', that.profile_obj.id);
			//OLD_ID_COOKIE = that.profile_obj.id;

			SUPER_PROFILE.gender = that.gender;
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

						//createCookie('id_cookie', that.profile_obj.id);
						//OLD_ID_COOKIE = that.profile_obj.id;

					SUPER_PROFILE.gender = that.gender;
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
	logout:function(){
		var self = this;
		auth(false);
		$.ajax({
			url: mainURL + "/l/index.php?logout=1&logout=1",
			type:"GET",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(response){
				self.auth = false;
				$("#login-form [name=login]").val("");
				$("#login-form [name=pass]").val("");
				$('#menu_avatar').html('');
				self.updateMenu();
				PROFILE.profile_obj = false;
				PIF.pif_array = [];
				}
			})
		//createCookie('id_cookie', -1);
		//OLD_ID_COOKIE = -1;
	},
	updateMenu:function(){
		if(this.auth){
			$(".user-info .username").html(this.login);
			$('#profile-page [name=fn]').val(this.first_name);
			$('#profile-page [name=ln]').val(this.last_name);
			$('#profile-page .login > span:eq(1)').html(this.login);
			$('#profile-page #avatar').attr('src', '.' + this.avatar);
			$('#menu_avatar').html('<img id="avatar" src="' +  mainURL + this.avatar + '">');
			console.log(this.gender);
			$('input:radio[name=gender]').filter('[value="'+ this.gender + '"]').attr('checked', true);
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
	}
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

	gpsSet: function(page,country,state,county,city,street,house, lat, lng){
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
			$("#address-item-" + page + " [name=street]").val(street);
			$("#address-item-" + page + " [name=house]").val(house);
			$.mobile.loading( "hide" ); //анимация загрузки
			return ;
		}

		var res = this.levFind(source,list_place);
		//console.log(source + ' 1 ' + self.city);

		self.setOption(page, name,res.id);

		select_func(page, res.id,function(){
			self.gpsSet(page, country,state,county,city,street,house);
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
				} else {
					g_lat = lat;
					g_lng = lng;
					//console.log(lat);
					//console.log(lng);
					GoogleMapsAdress.moveMarker(lat, lng, page);
					var geocoder = new google.maps.Geocoder();
					var latLng = new google.maps.LatLng(lat, lng);
					if(geocoder){
						geocoder.geocode({'latLng': latLng,'language': 'en'},function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								//console.log(results);
								var address = results[0].address_components;

								var country = self.getGPSByType(address,"country");
								var state = self.getGPSByType(address,"administrative_area_level_1");
								var county = self.getGPSByType(address,"administrative_area_level_3");
								var city = self.getGPSByType(address,"locality");
								//console.log('build: ' + results[0].address_components[0].long_name);
								var street = self.getGPSByType(address,"route");
								var build = self.getGPSByType(address,"street_number");
								ADRESS.gpsSet(page, country,state,county,city,street,build, lat, lng);
							} else {
								alert(LOCALE_ARRAY_ADDITIONAL.gps_not_activated[CURRENT_LANG]);
							}
						});
					}
				}
			});
		});
		$("#address-item-" + page + " [name=house]").change(function(){
			var value = $(this).val();

			var m = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
			+ $("#address-item-" + page + " [name=house]").val() + ",+"
			+ $("#address-item-" + page + " [name=street]").val() + ",+"
			+ $("#address-item-" + page + " [name=city] option:selected").text() + ",+"
			+ $("#address-item-" + page + " [name=country] option:selected").text()
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
			url: mainURL + '/user_address_add.php?ida=' + ida
														+ ('&c=' + $('#address-item-' + page + ' [name=city]').val()).replace("'", "`")
														+ ('&str=' + $('#address-item-' + page + ' [name=street]').val()).replace("'", "`")
														+ '&bld=' + $('#address-item-' + page + ' [name=house]').val()
														+ '&oth=' + $('#address-item-' + page + ' [name=comment]').val()
														+ '&zip=' + $('#address-item-' + page + ' [name=index]').val()
														+ '&reg_adr=' + reg_adr + '&lat=' + GoogleMapsAdress.lt_value + '&lng=' + GoogleMapsAdress.ln_value,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(){
				$.mobile.navigate("#edit-address");
				$.mobile.loading( "hide" );
				SPHERES.initial(false, true);

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
					url: mainURL + '/user_address_rm.php?ida=' + ADRESS.address_arr[page-1]['ida'],
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
						SPHERES.initial(false, true);						
						//self.getCurrent(0, callback_current(), page);				

					},
				});
			}
		}
	},
	clear_address_info: function(page){
		var self = this;
		$('#edit-address [href=#address-item-' + page + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + page);
		
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

					$("#address-item-" + page + " [name=country]").append(option);
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
					$("#address-item-" + page + " [name=country]").html('');

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
				$("#address-item-" + page + " [name=state]").html('');
				$("#address-item-" + page + " [name=state]").show();
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

						$("#address-item-" + page + " [name=state]").append(option);
					
					}
					//lang_activate_el("#address-item-" + page + " [name=state]");
					if(cb){
						cb(self.state);
					}
				}
			});

			/*$("#address-item-" + page + " [name=state]").html('');
				$("#address-item-" + page + " [name=state]").show();
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

					$("#address-item-" + page + " [name=state]").append(option);
				}
				//lang_activate_el("#address-item-" + page + " [name=state]");
				if(cb){
					cb(self.state);
				}*/
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
				$("#address-item-" + page + " [name=state]").html('');
				$("#address-item-" + page + " [name=state]").show();
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
				$("#address-item-" + page + " [name=county]").html('');
				$("#address-item-" + page + " [name=county]").show();
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
			url: mainURL + "/list_adr_city.php?idc="+idc+"&ids="+ids+"&idr="+idr,
			type:"GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(response){
				var data = response.responseText;
				self.city = jQuery.parseJSON(data);
				$("#address-item-" + page + " [name=city]").html('');
				$("#address-item-" + page + " [name=city]").show();
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
	var self = this;				
		$('#address-item-' + page + ' [name="'+name+'"]').attr("disabled",false);
		if(!choose)$('#address-item-' + page + ' [name="'+name+'"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.choose[CURRENT_LANG] + self.set_locale_names( name ));
	},
	getCurrent:function(not_refresh, callback_redirect, page){
		var self = this;
		var lang_address = CURRENT_LANG;
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
						$('#edit-address [href=#address-item-' + i + ']').html(self.address_arr[i-1]['str'] + ' ' +
																			 self.address_arr[i-1]['bld'] + ', ' + 
																			 self.address_arr[i-1]['city_' + lang_address]);
					}else{
						$('#edit-address [href=#address-item-' + i + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + i);	
					}
				}
				if(i < 3){
					for (var j = i; j < 4; j++) {
						$('#edit-address [href=#address-item-' + j + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + j);		
					}
				}
			}
		} else {
			$.ajax({
				url: mainURL + "/user_address.php",
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
						var uk = address.str+" "+address.bld+", "+address.city_uk;
						$(".address-item a.js-address:eq("+i+")")
							.data("en",en)
							.data("ru",ru)
							.data("uk",uk);

						$(".address-item a.js-sphere:eq("+i+")")
							.data("en","Choose sphere for "+en)
							.data("ru","Выберите сферы для "+ru)
							.data("uk","Виберіть галузі для "+uk);
					}

					self.address_arr = address_arr;
					var lang_address = CURRENT_LANG;
					if(page && self.address_arr[page-1]){
						self.set_one_address(page, not_refresh, callback_redirect);						
					} else {
						if(page){
							self.clear_address_info(page);
						}
					}				
					if(location.href.indexOf('#edit-address') > -1){
						$('#edit-address [href=#address-item-' + 1 + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + 1);	
						for (var i = 1; i < 4; i++) {
							if(self.address_arr[i-1]){
								$('#edit-address [href=#address-item-' + i + ']').html(self.address_arr[i-1]['str'] + ' ' +
																					 self.address_arr[i-1]['bld'] + ', ' + 
																					 self.address_arr[i-1]['city_' + lang_address]);
							} else {
								$('#edit-address [href=#address-item-' + i + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + i);
							}
						}
						if(i < 3){
							for (var j = i; j < 4; j++) {
								$('#edit-address [href=#address-item-' + j + ']').html(LOCALE_ARRAY_ADDITIONAL.address[CURRENT_LANG] + j);
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
				 						$('#address-item-' + z + ' [name=city] option[value=' + one_address['city_id'] + ']').attr('selected', 'selected');
				 						$('#address-item-' + z + ' [name=index] option[value=' + one_address['zip'] + ']').attr('selected', 'selected');
				 						$('#address-item-' + z + ' [name=street]').val(one_address['str']);
										$('#address-item-' + z + ' [name=house]').val(one_address['bld']);
										$('#address-item-' + z + ' [name=comment]').val(one_address['oth']);
										//Корректировка работы в firefox
										if($('#address-item-' + z + ' [name=county] option').length == 1){
											$('#address-item-' + z + ' [name=county]').val( $('#address-item-' + z + ' [name=county] option[selected="selected"]').val() );
											$('#address-item-' + z + ' [name=county]').parent().children('span').html( $('#address-item-' + z + ' [name=county] option[selected="selected"]').html() );
										}//правильно отображение области
										if($('#address-item-' + z + ' [name=city] option').length == 1){
											$('#address-item-' + z + ' [name=city]').val( $('#address-item-' + z + ' [name=city] option[selected="selected"]').val() );
											$('#address-item-' + z + ' [name=city]').parent().children('span').html( $('#address-item-' + z + ' [name=city] option[selected="selected"]').html() );
										}//правильно отображение города
											$('#address-item-' + z + ' [name=index]').val( $('#address-item-' + z + ' [name=index] option[selected="selected"]').val() );
											$('#address-item-' + z + ' [name=index]').parent().children('span').html( $('#address-item-' + z + ' [name=index] option[selected="selected"]').html() );
										//правильно отображение индекса
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
				 				$('#address-item-' + z + ' [name=county] option[value=' + one_address['county_id'] + ']').attr('selected', 'selected');
				 				self.selectCity(z, one_address['city_id'], callback_city());
				 			}
				 		}
					$('#address-item-' + z + ' [name=state] option[value=' + one_address['state_id'] + ']').attr('selected', 'selected');
					self.selectCounty(z, one_address['county_id'], callback_county());
					//alert(one_address['county_en']);									
				 	}									
				//alert(county_id);
				}

				$('#address-item-' + z + ' [name=country] option[value=' + one_address['country_id'] + ']').attr('selected', 'selected');
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
						.data("uk","Адрес "+i);
			 $(".address-item a.js-sphere:eq("+ (i-1) +")")
						.data("en","Choose sphere")
						.data("ru","Выберите сферы")
						.data("uk","Виберіть галузі");
		}
		//lang_activate_el($("#edit-address"));
	},
	disable:function(page, name){
		if(name == "state"){
			$('#address-item-' + page + ' [name="state"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.country[CURRENT_LANG]);
			$('#address-item-' + page + ' [name="state"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.country[CURRENT_LANG] + "</option>");
			$('#address-item-' + page + ' [name="state"]').attr("disabled","disabled");
			$('#address-item-' + page + ' [name="state"]').val("");

			name = "county";
		}

		if(name == "county"){
			$('#address-item-' + page + ' [name="county"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.state[CURRENT_LANG]);
			$('#address-item-' + page + ' [name="county"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.state[CURRENT_LANG] + "</option>");
			$('#address-item-' + page + ' [name="county"]').attr("disabled","disabled");
			$('#address-item-' + page + ' [name="county"]').val("");

			name = "city";
		}
		if(name == "city"){
			$('#address-item-' + page + ' [name="city"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.county[CURRENT_LANG]);
			$('#address-item-' + page + ' [name="city"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.county[CURRENT_LANG] + "</option>");
			$('#address-item-' + page + ' [name="city"]').attr("disabled","disabled");
			$('#address-item-' + page + ' [name="city"]').val("");
			name = "index";
		}
		if(name == "index"){
			$('#address-item-' + page + ' [name="index"]').parent().find("span").html(LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + ' ' + LOCALE_ARRAY_ADDITIONAL.city[CURRENT_LANG]);
			$('#address-item-' + page + ' [name="index"]').html("<option disabled>" + LOCALE_ARRAY_ADDITIONAL.set[CURRENT_LANG] + " " + LOCALE_ARRAY_ADDITIONAL.city[CURRENT_LANG] + "</option>");
			$('#address-item-' + page + ' [name="index"]').attr("disabled","disabled");
			$('#address-item-' + page + ' [name="index"]').val("");
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
};
