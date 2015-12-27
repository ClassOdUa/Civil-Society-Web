var isCordovaApp = !!window.cordova;

if(isCordovaApp){
	$('.btn-login-soc').hide();
	$('.social-wrap').hide();
	$('.refund').hide();
}