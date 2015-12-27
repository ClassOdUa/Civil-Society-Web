var NCO = {
	list: {},
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});

		$.post(mainURL + '/nco.php', function(p_result){
			self.list = $.parseJSON(p_result);
			$('#nco_full_list').html(LIST_OF_ITEM.build_items_list(self.list));
			$.mobile.loading( "hide" );

		});
	},
	offer_accept_nco: function(object_type, object_id, page){
		var l_json = $.parseJSON('{"type":' + object_type + ', "id":' + object_id + '}');
		$.post(mainURL + '/nco_bid.php', l_json, function(p_result){

			if(p_result.indexOf('error') > -1 ){
				message_result(p_result);
			}else{
				$('.nco_bid_btn').hide();
				var l_add_list = '';
				$.each(NCO.list, function(i, l_nco) {
					if(SUPER_PROFILE.id == l_nco.id){
						l_add_list = '<li class="nco_part ui-corner-all"><strong>' + l_nco.nco_name + '</strong> (<strong>ID</strong>:<span>' + l_nco.id + '</span>)<span class="phone">' + l_nco.nco_phone + '</span><span class="doc">' + l_nco.doc_type + ' ' + l_nco.doc_series + ' ' + l_nco.doc_number + ' ' + l_nco.doc_issue + ' ' + l_nco.doc_date + '</span><span class="addr">' + l_nco.country + ' ' + l_nco.state + ' ' + l_nco.county + ' ' + l_nco.city + ' ' + l_nco.street + ' ' + l_nco.build + ' ' + l_nco.ap + '</span></li>';
					}
				});

				switch(p_result){
					case '1':
						$('.ngo_bids_list').append(l_add_list);
					break;
					case '2':
						$('.nco_part').hide();
						$('#nco_btn').hide();
						$('.nko-list .title').html(LOCALE_ARRAY_ADDITIONAL.nco_accepted[CURRENT_LANG]);
						$('.ngo_bids_list').html(l_add_list);
					break;
				}
			}
		});
	},
	selected_by_author: function(p_choosen_nco_id){
		//build NCO selected by Author
		var l_return = '';
		$.each(self.list, function(i, l_nco) {
			if(p_choosen_nco_id == l_nco.id){
				l_return = '<span class="nco_choosen"></span><div class="nco_choosen_name ui-corner-all"><strong>ID: ' 
							+ l_nco.id + ' :: ' 
							+ l_nco.nco_name + '</strong><br /><span class="phone">'
							+ l_nco.nco_phone + '</span><br /><span class="doc">'
							+ l_nco.doc_type + ' ' + l_nco.doc_number + ' '
							+ l_nco.doc_issue + ' ' 
							+ l_nco.doc_date + '</span><br /><span class="addr">' 
							+ l_nco.country + ' ' + l_nco.state + ' ' + l_nco.city + ' ' 
							+ l_nco.street + ' ' + l_nco.build + '</span>';
			}
		});
		return l_return;
	},
	nco_build: function(p_type, p_id, p_author_id, p_choosen_nco_id, p_nco_bids_list, p_nco_acceptance){
		var self = this;

		// if($.isEmptyObject(self.list)){
		// 	self.init();
		// }

		var l_choosen_label = LOCALE_ARRAY_ADDITIONAL.choosen_nco[CURRENT_LANG];

		if(p_nco_acceptance == '1'){
			var l_choosen_label = LOCALE_ARRAY_ADDITIONAL.nco_accepted[CURRENT_LANG];
		}

		var l_nco_part = '';
		var l_nco_selected = '';
		var l_nco_bids_list = '';
		var l_nco_bid_btn = '';
		var l_nco_choice_btn = '';
		var l_nco_in_list = 0;

		//build NGO selected by Author
		if(p_choosen_nco_id > 0){
			// l_nco_selected = self.selected_by_author(p_choosen_nco_id);
			$.each(self.list, function(i, l_nco) {
				if(p_choosen_nco_id == l_nco.id){
					l_nco_selected = '<span class="nco_choosen">'
								+ l_choosen_label
								+ '</span><div class="nco_choosen_name ui-corner-all"><strong>ID: ' 
								+ l_nco.id + ' :: ' 
								+ l_nco.nco_name + '</strong><br /><span class="phone">'
								+ l_nco.nco_phone + '</span><br /><span class="doc">'
								+ l_nco.doc_type + ' ' + l_nco.doc_number + ' '
								+ l_nco.doc_issue + ' ' 
								+ l_nco.doc_date + '</span><br /><span class="addr">' 
								+ l_nco.country + ' ' + l_nco.state + ' ' + l_nco.city + ' ' 
								+ l_nco.street + ' ' + l_nco.build + '</span></div>';
				}
			});
		}

		//build list of NGO bids
		if(p_nco_bids_list.length > 0 && p_nco_acceptance == '0'){
			jQuery.each(p_nco_bids_list, function(i, l_nco) {
				l_nco_bids_list += '<li class="nco_part ui-corner-all"><strong>' 
								+ l_nco.reg_name + '</strong> (<strong>ID</strong>:<span>' 
								+ l_nco.user_id + '</span>)<span class="phone">' 
								+ l_nco.reg_phone + '</span><span class="doc">' 
								+ l_nco.reg_doc + '</span><span class="addr">'
								+ l_nco.reg_address + '</span></li>';
				if(SUPER_PROFILE.id == l_nco.user_id){
					l_nco_in_list = 1;
				}
			});
		}

		if(p_nco_acceptance == '0'){
			l_nco_bids_list = '<div class="ngo_bids_list_label">' 
							+ LOCALE_ARRAY_ADDITIONAL.ngo_bids_list_label[CURRENT_LANG]
							+ '</div><ul class="ngo_bids_list">' 
							+ l_nco_bids_list 
							+ '</ul>';
		}

		//Build NGO choice btn
		if(SUPER_PROFILE.id == p_author_id && p_nco_acceptance == '0' ){
			l_nco_choice_btn = '<a class="list-nco-btn nco-btn ui-btn ui-corner-all ui-shadow" p_type="' + p_type + '" p_id="' 
								+ p_id + '" href="#">' 
								+ LOCALE_ARRAY_ADDITIONAL.choose_nco[CURRENT_LANG] 
								+ '</a>'
		}

		//Default caption for BID button
		var l_btn_caption = LOCALE_ARRAY_ADDITIONAL.create_nco[CURRENT_LANG];

		//Build NGO bid btn
		if(SUPER_PROFILE.nco == 1 && p_nco_acceptance == '0'  &&  l_nco_in_list == 0 ){

			if(p_choosen_nco_id == SUPER_PROFILE.id){
				//change caption of bid button if author choosed current NGO
				l_btn_caption = LOCALE_ARRAY_ADDITIONAL.accept_ngo[CURRENT_LANG];
			}

			l_nco_bid_btn = '<a class="nco_bid_btn nco-btn ui-btn ui-corner-all ui-shadow" p_type="' + p_type + '" p_id="' 
								+ p_id + '" href="#">' 
								+ l_btn_caption
								+ '</a>';
		}

		$('.nco_status').html(l_nco_selected + l_nco_bid_btn + l_nco_choice_btn + l_nco_bids_list);
		//console.log(l_nco_selected);
	},
	events: function(){

		$('body').on('click', '.list-nco-btn', function(){
			var l_type = $(this).attr('p_type');
			var l_id = $(this).attr('p_id');
			var l_page = '';
			switch(l_type){
				case '3':
					l_page = '#project-page?project_proposition=' + l_id;
					break;
				case '4':
					l_page = '#project-page?project=' + l_id;
					break;
				case '5':
					l_page = '#request-page?request=' + l_id;
					break;
			}
			$('#nco-page .ui-icon-back').attr('p_type', l_type).attr('p_id', l_id).attr('href', l_page);

			$.mobile.navigate('#nco-page?p_type=' + l_type + '&id=' + l_id);
		});

		$('body').on('click', '.nco', function(){
			var n_id = $(this).attr('n_id');
			var l_page = '';
			switch(l_type){
				case '3':
					l_page = '#project-page?project_proposition=' + l_id;
					break;
				case '4':
					l_page = '#project-page?project=' + l_id;
					break;
				case '5':
					l_page = '#request-page?request=' + l_id;
					break;
			}
			$('#nco-page .ui-icon-back').attr('p_type', l_type).attr('p_id', l_id).attr('href', l_page);

			$.mobile.navigate('#nco-page?p_type=' + l_type + '&id=' + l_id);
		});

		$('body').on('click', '.nco_bid_btn', function(){
			l_type = $(this).attr('p_type');
			l_id = $(this).attr('p_id');
			NCO.offer_accept_nco(l_type, l_id, '');
		});
	}
}
