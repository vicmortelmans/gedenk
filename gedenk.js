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
        $(window).trigger('resize');
    });
    $('.content').hide();
});