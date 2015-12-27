var l_app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

console.log(l_app);

if ( l_app ) {
	$('.btn-login-soc').html('');
	$('.social-wrap').html('');
	$('.refund').html('');
}