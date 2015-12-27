var MEMBERS = {
	items_list_members: [],
	last_item_members: 0,
	filter: '',
	rebuild: 0,
	new_only: 1,
	scrolled_down: 0,
	init: function(){
		$.mobile.loading( "show", {theme: "z"});
		var self = this;
		var l_filter = $('#filter_members').val();
		var l_new_only = 0;

		if($('#members_checkbox').is(':checked')){
			l_new_only = 1;
		}


		if(MEMBERS.scrolled_down){
			MEMBERS.rebuild = 0;
			MEMBERS.scrolled_down = 0;
		}

		if(MEMBERS.filter != l_filter){
			MEMBERS.rebuild = 1;
			MEMBERS.filter = l_filter;
		}

		if(MEMBERS.new_only != l_new_only){
			MEMBERS.rebuild = 1;
			MEMBERS.new_only = l_new_only
		}

		if(MEMBERS.rebuild){
			$('#members_list').html('');
			self.last_item_members = 0;
			MEMBERS.rebuild = 0;
		}

		$.ajax({
			url: mainURL + '/members.php',
			type: "GET",
			data: {"ls": self.last_item_members, "org_id": GROUPS.group_id, "filter": l_filter, "new_only": l_new_only},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				self.items_list_members = $.parseJSON(response.responseText);
				if(self.items_list_members.length > 0){
					$('#members_list').append(LIST_OF_ITEM.build_items_list(self.items_list_members));
					self.last_item_members += 10;
				}
			},
		});
		$.mobile.loading( "hide" );	
	},
	events: function(){

		$(document).on('keyup', '#filter_members', function(e){
			MEMBERS.rebuild = 1;
			MEMBERS.init();
		});

		$(document).on('click', '.ui-btn', function(e){
			var l_do = 0;
			if($(this).hasClass('btn_approve')){
				l_do = 1;
			}else if($(this).hasClass('btn_decline')){
				l_do = 2;
			}
			if(l_do > 0){
				var l_json = $.parseJSON('{"request":' + l_do + ', "access_id":'+ $(this).closest('.item').attr('access_id') + ', "user_id":' + $(this).closest('.item').attr('user_id') + ', "group_id":' + GROUPS.group_id + '}');

				$.post(mainURL + '/groups_membership_moderate.php', l_json);

				if(l_do == 1){
					$(this).closest('.item .str-d').html('');

				}else if(l_do == 2){
					$(this).closest('.item').remove();
				}
			}
		});

		$('#filter_clear').click(function(){
			$('#filter_members').val('');
			MEMBERS.rebuild = 1;
			MEMBERS.init();
		});

		$('#members_checkbox').click(function(){
			
			MEMBERS.init();
		});
	},
};