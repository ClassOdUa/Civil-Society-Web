
var TASKS = {
	tasks_list: [],
	tasks_last_item: 10,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/tasks.php',
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				var query_array = $.parseJSON( response.responseText );
				if(query_array.length > 0){
					self.tasks_list = self.tasks_list.concat(query_array);
					self.build_elements(true, query_array);
					self.tasks_last_item += query_array.length;
				}
				//console.log(self.tasks_list);
			},
		});
 		$.mobile.loading( "hide" );	
	},
	reinit: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: mainURL + '/tasks.php?ls=' + self.tasks_last_item,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function( response ){
				//console.log(response);
				var query_array = $.parseJSON( response.responseText );
				if(query_array.length > 0){
					self.tasks_list = self.tasks_list.concat(query_array);
					self.build_elements(true, query_array);
					self.tasks_last_item += query_array.length;
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
			var build_array = self.tasks_list;
		}


		jQuery.each(build_array, function(i, one_tasks) {
			var l_task = '';
			if(CURRENT_LANG == 'uk') {
				l_task = one_tasks.uk;
			}else if (CURRENT_LANG == 'ru') {
				l_task = one_tasks.ru;
			}else{
				l_task = one_tasks.en;
			}

			elements_string += '<div class="item ui-corner-all task-icon">' + l_task + '<div class="check-' + one_tasks.chk + '"></div></div>';
		});
 		$('#my-tasks-page #tasklist').html(elements_string);
	},
}; 
