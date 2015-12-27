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

				// $('#create-item [name=curr]').html(ui_pif_option);
				// if(location.href.indexOf('#create-item') > -1){
				// 	$('#create-item select').selectmenu().selectmenu("refresh", true);
				// }
				
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
			//console.log(force_get_array);
			//console.log(funds.arr);
			//console.log('pif here');
			$.ajax({
				url: mainURL + "/fund_user.php",
				type: "GET",
				xhrFields: {
			 		withCredentials: true
				},
			 	crossDomain: true,
				complete: function( response ){
					self.pif_array = $.parseJSON( response.responseText );	
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
												<button onclick = "' + object_name + '.donate(\'' + special_type + '\', ' + id_object + ', ' + code_type_object + ')" class="ui-btn ui-corner-all ui-shadow donate-btn">' + LOCALE_ARRAY_ADDITIONAL.donate[CURRENT_LANG] + '</button>\
											</div>\
											<div class="ui-block-a center">\
												<div class="ui-checkbox">\
													<label id = "anonimous_check" class="ui-btn ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + LOCALE_ARRAY_ADDITIONAL.anonymous_donation[CURRENT_LANG] + '</label><input type="checkbox" name="" value="1" data-enhanced="true" />\
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

var funds = {
	currency : {
		"980" : "UAH",
		"840" : "USD",
		"978" : "EUR",
		"1" : "ICAN"
	},
	init : function(callback_function){
		var self = this;
		$.ajax({
			url: mainURL + "/fund_user.php",
			type: "GET",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(data){
				self.arr = $.parseJSON(data.responseText);
				self.build_page(self.arr);
				if(callback_function){
					//console.log('callback');
					callback_function();
					
				}
			}
		});
	},
	get : function( ){
		alert('repaire this');
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
								'+saldo+' '+PIF.get_currency_name_by_id(fund.currency) +'\
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
			url: mainURL + "/sn/donation.php?fund_id="+id,
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
		if(button_html.indexOf('Unable') > -1){
			button_html = LOCALE_ARRAY_ADDITIONAL.unable_to_donate[CURRENT_LANG];
		}
		 $("#my-fund-page .center").html(button_html);
	},
	create_fund : function(currency){
		var self = this;
		if(confirm(LOCALE_ARRAY_ADDITIONAL.create_fund_question[CURRENT_LANG])){
			$.ajax({
				url: mainURL + "/fund_user_add.php?currency="+currency,
				type: "GET",
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
				complete: function(data){
					try{
						var funds = $.parseJSON(data.responseText);
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
		var build_string_select = '<label>' + LOCALE_ARRAY_ADDITIONAL.choose_personal_fund[CURRENT_LANG] + '</label><select id="select-pay-block">';
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
		var create_select = '<label>' + LOCALE_ARRAY_ADDITIONAL.choose_type_currency[CURRENT_LANG] + '</label><select name="">';
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
			var match_array = location.href.match(/=([a-zA-Z0-9а-яА-Я]*)/i)[1];
			var fund_id = match_array.match(/[^=][0-9]*/i);
			var url = mainURL + '/fund_user_cf.php?fund_id=' + fund_id;

			$.ajax({
				url: url,
				type: "GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function( response ){
					////console.log(response);
					var fund_array = $.parseJSON( response.responseText );
					if(fund_array.length == 0){
						$('#balances-pif-page #content_table').html( '<center><h2>' + LOCALE_ARRAY_ADDITIONAL.no_pif_history[CURRENT_LANG] + '</h1></center>' ).enhanceWithin();
					}else{
						//console.log( fund_array );
							$.mobile.loading( "hide" );
							var ui_elements = '';

							jQuery.each(fund_array, function(i, one_fund) {
								switch(one_fund.type){
									case '0':
										var general_span = '<span>(' + LOCALE_ARRAY_ADDITIONAL.donation[CURRENT_LANG] + ' - ' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ')</span>';
										break;
									case '1':
										var general_span = '<span>(' + LOCALE_ARRAY_ADDITIONAL.donation[CURRENT_LANG] + ' - ' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ')</span>';
										break;
									case '2':
										var general_span = '<span>(' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ' - Программа ' + one_fund.fund_id + ')</span>';
										break;
									case '3':
										var general_span = '<span>(' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ' - Проектное предложение ' + one_fund.fund_id + ')</span>';
										break;
									case '4':
										var general_span = one_fund.title + '<br /><span>' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ' => ' +LOCALE_ARRAY_ADDITIONAL.project[CURRENT_LANG] + ' ' + one_fund.idt + ' ' + LOCALE_ARRAY_ADDITIONAL.fund[CURRENT_LANG] + ' ' + one_fund.fund_id + '</span>';
										break;
									case '5':
										var general_span = one_fund.title + '<br /><span>' + LOCALE_ARRAY_ADDITIONAL.personal_fund[CURRENT_LANG] + ' ' + fund_id + ' => ' +LOCALE_ARRAY_ADDITIONAL.request[CURRENT_LANG] + ' ' + one_fund.idt + ' ' + LOCALE_ARRAY_ADDITIONAL.fund[CURRENT_LANG] + ' ' + one_fund.fund_id + '</span>';
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
								if(one_fund.r == 1){
									var additional_span = '<span style = "cursor: pointer;" class = "yellow" onclick = "funds.cancel_fund(\'' + one_fund.fund_id + '\',\'' + one_fund.cur + '\',\'' + one_fund.type + '\',\'' + one_fund.id + '\');">' + LOCALE_ARRAY_ADDITIONAL.cancel_donate[CURRENT_LANG] + '</span> ';
								}else{
									var additional_span = '';
								}
								ui_elements += '<tr>\
													<td>\
														<div class="date">\
															' + one_fund.dts + '\
														</div>\
														<div class="pif">\
														 ' + additional_span + general_span + '\
														</div>\
													</td>\
													<td>\
														<div class="price">\
															<span data-id-amount = "' + one_fund.id + '">' + one_fund.amount + '</span> ' + currency_name + '\
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
		var amount = prompt(LOCALE_ARRAY_ADDITIONAL.enter_amount[CURRENT_LANG], "");
		if(amount){
			var parsed_int = parseInt( $('#balances-pif-page [data-id-amount=' + id + ']').html() ) * -1;
			if(amount > parsed_int ) {
				alert(LOCALE_ARRAY_ADDITIONAL.please_enter_valid_amount[CURRENT_LANG]);
			}else{
				//console.log( parsed_int );
				$.ajax({
					url: mainURL + '/fund_return_by_type.php',
					type: "POST",
					data: {	"fund_id": fund_id,
				 			"currency": currency,
				 			"amount": amount,
				 			"type": type,
				 			"id": id},
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					complete: function( response ){
							$('#balances-pif-page [data-id-amount=' + id + ']').html( parsed_int - amount );
					}
				});
			}
		}
	},
	set_pif_options_transaction_page: function(page){
		var self = this;
		var options = '';
		jQuery.each(PIF.pif_array, function(i, one_pif) {
			options += '<option data-currency = "' + one_pif.currency + '" value = ' + one_pif.id + '>#' + one_pif.id + ' >> ' + one_pif.saldo + ' ' + PIF.get_currency_name_by_id(one_pif.currency) + '</option>';
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
				url: mainURL + "/fund_user_user.php",
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
						var response_data = $.parseJSON(data.responseText);
						alert(LOCALE_ARRAY_ADDITIONAL.transaction_okay[CURRENT_LANG]);
						$('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').html('#' + $('#transaction-page [name=fund_id]').val() + ' >> ' + response_data[0].saldo + ' ' + PIF.get_currency_name_by_id( $('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').data('currency') ) );
						$('#my-fund-page #select_pif option[value=' + $('#transaction-page [name=fund_id]').val() + ']').html('#' + $('#transaction-page [name=fund_id]').val() + ' >> ' + response_data[0].saldo + ' ' + PIF.get_currency_name_by_id( $('#transaction-page [name=fund_id] option[value=' + $('#transaction-page [name=fund_id]').val() + ']').data('currency') ) );
						$('#transaction-page select').selectmenu().selectmenu("refresh", true);
						$('#my-fund-page select').selectmenu().selectmenu("refresh", true);
						//console.log("saved ok");
					}
				}
			});
		}
	}
};

var WALLET = {
	init: function(){
		$.ajax({
			url: mainURL + "/sn/auth_liqpay.php",
			type: "value",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			complete: function(response){
				var data = response.responseText;
				$('#auth_wallet').html(data);
			}
		});
	}
};