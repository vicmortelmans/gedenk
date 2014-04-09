var Webflow = Webflow || [];  
Webflow.push(function () { 
    $('h1').on('click', function() {
        if ( $(this).parent().find('.content').is(':visible') ) {
            $('.content').slideUp();
        } else {
            $('.content').hide();
            $(this).parent().find('.content').slideDown();
            $(window).trigger('resize');
            $('html, body').animate({
                scrollTop: ($(this).offset().top - 10)
            },500);
        }
    });
    $('.content').on('click', function() {
        // workaround for webflow sliders not being aligned properly
        // when being rendered while part of hidden content.
        // after testing numberous workarounds, I found out that a
        // window resize triggers proper realigning of the slider
        // so this one ends up as most elegant.
        $(window).trigger('resize');
    });
    $('.content').hide();
});