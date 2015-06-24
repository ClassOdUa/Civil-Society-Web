(function($){
    $(function(){

        // Change language

        var DEFAULT_LANG = "en";
        function lang_activate(p_lang){
            var lang = DEFAULT_LANG;
            if(!p_lang){
                //if(readCookie("lang")){
                //    lang = readCookie("lang");
                //}
            }else{
                lang = p_lang;
                //createCookie("lang",p_lang);
            }
            $("[data-"+lang+"]").each(function(){
                $(this).html($(this).data(lang));
                $(this).attr("lang",lang);
            });
            $("[data-ph-"+lang+"]").each(function(){
                var placeholder = $(this).data("ph-"+lang);
                $(this).attr("placeholder",placeholder);
                $(this).attr("lang",lang);
            });

        }

        $("#select-lang").change(function(){
            var new_lang = $(this).find("option:selected").val();
            lang_activate(new_lang);
        });

        // Init left panel

        $( "body>[data-role='panel']" ).panel();

        $( document ).on( "swiperight", function( e ) {
            if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
                if ( e.type === "swiperight" ) {
                    $( "#left-panel" ).panel( "open" );
                }
            }
        });

        $( window ).hashchange(function() {
            $("#left-panel .menu li").removeClass("active");
            var active_page = location.hash;
            $("[href="+active_page+"]").parent().addClass("active");
        });

        // Disable scrolling content when panel is open

        $("#left-panel").on("panelopen", function (event, ui) {
            var selScrollable = '.ui-panel-inner';

            $(document).on('touchmove',function(e){
                e.preventDefault();
            });

            $('body').css("overflow", "hidden").on('touchstart', selScrollable, function(e) {
                if (e.currentTarget.scrollTop === 0) {
                    e.currentTarget.scrollTop = 1;
                } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                    e.currentTarget.scrollTop -= 1;
                }
            }).on('touchmove', selScrollable, function(e) {
                if($(this)[0].scrollHeight > $(this).innerHeight()) {
                    e.stopPropagation();
                }
            });

        }).on("panelclose", function (event, ui) {
            var selScrollable = '.ui-panel-inner';
            $(document).off("touchmove");
            $('body').css("overflow", "inherit").off("touchstart touchmove", selScrollable);
        });


        $('.btn-login-soc button').on('click', function(e){
            $(this).next().fadeToggle(300);
            if($('.overlay').length < 1) {
                $(this).closest('.ui-page').append('<span class="overlay"></span>');
            } else {
                $('.overlay').remove();
            }
        });

        $(document).on('click','.overlay', function() {
            $(this).closest('.ui-page').find('.btn-login-soc button').trigger('click');
        });


        // Editor

        $("#create-vote textarea, #create-item textarea").jqte({
            format: false,
            fsize: false,
            color: false,
            ol: false,
            ul: false,
            sub: false,
            sup: false,
            outdent: false,
            indent: false,
            left: false,
            center: false,
            right: false,
            strike: false,
            link: false,
            unlink: false,
            remove: false,
            rule: false,
            source: false,
            title: false,
            placeholder: "Write your description here"
        });

        $('.jqte').on('click', function(){
            $(this).find('.jqte_editor').trigger('focus');
        });

        /*$('.stars-wrap span').on('click', function(){
            var star = $(this);
            var allStar = star.parent().find('span');
            var val = star.index();

            if (star.hasClass('active') && !star.next().hasClass('active')) {
                allStar.removeClass('active');
                return false;
            }
            star.siblings().removeClass('active');

            for (var i = 0; i <= val; i++) {
                allStar.eq(i).addClass('active');
            }
        });*/

        $(document).on('pagebeforeshow', function() {

            var activePage        = $.mobile.activePage;
            var filtersPanel       = activePage.find('.filters-panel');
            var filtersPanelInner  = filtersPanel.find('.filters-panel-inner');

            if ( GetIEVersion() > 0 ) {
                filtersPanelInner.show();
            } else {
                /*$(document).on('swipedown', activePage, function () {
                    //filtersPanelInner.slideDown(500);
                });*/
            }
        });

        /*var votingsPage        = $('#votings-page');
        var filtersPanel       = votingsPage.find('.filters-panel');
        var filtersPanelInner  = filtersPanel.find('.filters-panel-inner');
        //var filtersPanelHeight = 175;
        var speed              = 500;

        if ( GetIEVersion() > 0 ) {
            filtersPanelInner.show();
        } else {
            $(document).on('swipedown', votingsPage, function () {
                filtersPanelInner.slideDown(speed);
            });
            //$(document).on('swipeup', votingsPage, function () {
            //    filtersPanelInner.slideUp(speed);
            //});
        }*/

        function GetIEVersion() {
            var sAgent = window.navigator.userAgent;
            var Idx = sAgent.indexOf("MSIE");

            // If IE, return version number.
            if (Idx > 0)
                return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

            // If IE 11 then look for Updated user agent string.
            else if (!!navigator.userAgent.match(/Trident\/7\./))
                return 11;

            else
                return 0; //It is not IE
        }

        //votingsPage.swipe({
        //    triggerOnTouchEnd: true,
        //    //swipeStatus: swipeStatus,
        //    swipe: swipeUpDown,
        //    allowPageScroll:"vertical",
        //    threshold: 75
        //});

        //function swipeUpDown(event, direction, distance, duration) {
        //
        //    if (direction == "down")
        //        filtersPanelInner.slideDown();
        //    else if (direction == "up")
        //        filtersPanelInner.slideUp();
        //}

        //function swipeStatus(event, phase, direction, distance) {
        //
        //    if (phase == "move" && (direction == "up" || direction == "down")) {
        //        var duration = 0;
        //        var openPanel = filtersPanel.hasClass('filters-panel-open');
        //
        //        if (direction == "down" && !openPanel) {
        //            scrollPanel(distance, duration, false);
        //        } else if (direction == "up" && openPanel) {
        //            scrollPanel(filtersPanelHeight - distance, duration, true);
        //        }
        //
        //    } else if (phase == "cancel" || phase == "end") {
        //        if (direction == "down") {
        //            scrollPanel(filtersPanelHeight, speed, true);
        //        } else if (direction == "up") {
        //            scrollPanel(0, speed, false);
        //        }
        //    }
        //}

        //function scrollPanel(distance, duration, open) {
        //    filtersPanelInner.css("transition-duration", (duration / 1000).toFixed(1) + "s");
        //    var value = distance.toString();
        //
        //    filtersPanelInner.css('height', value + 'px');
        //    if (open) {
        //        filtersPanel.addClass('filters-panel-open');
        //    } else {
        //        filtersPanel.removeClass('filters-panel-open');
        //    }
        //}

        $('.chart').on('click', function(){
            $(this).find('.info').toggleClass('animated');
        })
    })
})(jQuery);
