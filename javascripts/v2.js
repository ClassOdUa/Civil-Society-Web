var DEFAULT_LANG = "en";
var CURRENT_LANG = false;
var FILE;
var UI_STATE_DIALOG = 0;
var mainURL = 'https://gurtom.mobi';
var HISTORY_INNER = [location.href];
var g_lat = 0;
var g_lng = 0;
var g_auth = false;
var g_gender = 0;
var g_id = 0;
var g_city = [0, 0, 0];
var g_ar_funds = [];
var g_ar_array_tasks = [];
var g_ar_ngo = [];
var g_ar_trust = [];
var g_ar_groups = [];
var g_ar_news = [];
var g_ar_votings = [];
var g_ar_my_votings = [];
var g_ar_programs = [];
var g_ar_pp = [];
var g_ar_w_votings = [];
var g_ar_projects = [];
var g_ar_requests = [];
var g_ar_nav_seeds = [];


$(document).on("pagecontainershow", function () {
	$.mobile.loading( "show", {theme: "z"});

	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	var activePageId = activePage[0].id;
	switch (activePageId) {
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
			break;
		case 'program-page':
			console.log('program-page');
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
			console.log('weighted-votings-page');
			break;
		case 'weighted-vote-page':
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
		case 'test':
			console.log('test');
			break;
		case 'my-activities-page':
			console.log('my-activities-page');
			break;
		case 'my-groups':
			console.log('my-groups');
			break;
		case 'my-spheres-options':
			console.log('my-spheres-options');
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
			break;
		case 'my-votings-page':
			console.log('my-votings-page');
			break;
		case 'vote-page':
			console.log('vote-page');
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
});

var TASKS = {
	tasks_list: [],
	tasks_last_item: 0,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: './tasks.php?ls=' + self.tasks_last_item,
			type: "GET",
			//data: { ls: self.tasks_last_item },
			complete: function( response ){
				var query_array = JSON.parse( response.responseText );
				if(query_array.length > 0){
					self.tasks_list = self.tasks_list.concat(query_array);
					self.build_elements(true, query_array);
					self.tasks_last_item += query_array.length;
				}			
			},
		});
		$.mobile.loading( "hide" );	
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
			if(CURRENT_LANG == 'ua') {
				l_task = one_tasks.ua;
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


var NEWS = {
	news_list: [],
	news_last_item: 10,
	init: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: './news.php',
			type: "GET",

			complete: function( response ){
				//console.log(response);
				self.news_list = JSON.parse( response.responseText );
				self.build_elements();
				//console.log(self.news_list);
				$.mobile.loading( "hide" );	
			},
		});
	},
	reinit: function(){
		var self = this;
		$.mobile.loading( "show", {theme: "z"});
		$.ajax({
			url: './news.php?ls=' + self.news_last_item,
			type: "GET",

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
			if( one_news.icon_num == 0 ){
				var icon_news = 'news-icon news-icon-' + (parseInt(one_news.icon_type));
			}else{
				var icon_news = 'news-icon news-icon-num-' + (parseInt(one_news.icon_num));
			}
			if(one_news.img.indexOf('svg') > -1){
				var image_news = '<div class="img">\
										<object type="image/svg+xml" data=".' + one_news.img + '">Your browser does not support SVG</object>\
									</div>';
			}else{
				var image_news = '<div class="img">\
										<img src=".' + one_news.img + '" />\
									</div>';
			}
			elements_string += '<div ' + onclick_event + ' class="item ui-corner-all ' + icon_news + '">\
									' + image_news + '\
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

		$('.right_col').html(LOCALE_ARRAY_ADDITIONAL.news_right[CURRENT_LANG]);

		if(reinit){
			$('#news-page #news_list').append(elements_string);
		}else{
			$('#news-page #news_list').html(elements_string);
		}
	},
}; 
