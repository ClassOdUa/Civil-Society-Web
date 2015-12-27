var l_app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if ( l_app ) {
	$('.btn-login-soc').hide();
	$('.social-wrap').hide();
	$('.refund').hide();
}