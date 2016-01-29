var RIGHT_COL = {
	busy: [],
	events: function(){

		$(document).on('click', '#btn_map', function(e){
			$(this).css('opacity', '0.4');
			$('#btn_info').css('opacity', '1');
			$('#nh_info').hide();
			$('#map').show();
			$('#right-panel').panel("close");

		});

		$(document).on('click', '#btn_info', function(e){
			$(this).css('opacity', '0.4');
			$('#btn_map').css('opacity', '1');
			$('#map').hide();
			$('#nh_info').show();
			$('#right-panel').panel("close");

		});

	},
}; 