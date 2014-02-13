var Webflow = Webflow || [];  
Webflow.push(function () { 
    $('h1').on('click', function() {
        if ( $(this).parent().find('.slider').is(':visible') ) {
            $('.slider').slideUp();
        } else {
            $('.slider').hide();
            $(this).parent().find('.slider').slideDown();
            $('html, body').animate({
                scrollTop: ($(this).offset().top)
            },500);
        }
    });
});