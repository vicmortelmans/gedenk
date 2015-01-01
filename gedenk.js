var Webflow = Webflow || [];  
Webflow.push(function () { 
    $('h1').on('click', function() {
        // find the h1 that is hiding (= for which the toc is shown)
        // hide the h2's in that h1
        // hide the contents in that h1
        // show that h1
        // hide this h1
        // show the h2's in this h1
        // align to top of the screen
        var scrollReference = $(document).scrollTop();
        var scrollCorrection = 0;
        var hidingH1 = $('h1.hiding');
        if (hidingH1.length) {
            var before = $('h1').index(hidingH1) < $('h1').index(this);
            var showingH2s = hidingH1.parent().find('h2.listed,h2.selected');
            if (showingH2s.length) {
                if (before) 
                    showingH2s.each(function() {
                        scrollCorrection -= this.scrollHeight;
                    });
                showingH2s.removeClass('listed').removeClass('selected').animate({
                    height: 0
                }, 0.96 * 1000);
                var showingContent = hidingH1.parent().find('.content.showing');
                if (showingContent.length) {
                    if (before) scrollCorrection -= showingContent.height();
                    showingContent.removeClass('showing').animate({
                        height: 0
                    }, 0.96 * 1000);
                }
            }
            hidingH1.removeClass('hiding').animate({
                height: "48px"
            }, 0.96 * 1000);
            if (before) scrollCorrection += hidingH1.height();
        }
        $(this).addClass('hiding').animate({
            height: 0
        }, 0.96 * 1000);
        var contentToShow = $(this).parent().find('h2');
        contentToShow.addClass('listed').animate({
            height: "48px"
        }, 0.96 * 1000);
        $('html, body').animate({
            scrollTop: (Math.max(0, scrollReference + scrollCorrection))
        }, 0.96 * 1000);
    });
    $('h2:not(".selected")').on('click', function() {
        // find the h2 that is selected
        // hide the content in that h2
        // change that h2 to listed
        // change this h2 to selected
        // show the content
        // align to top of the screen
        var scrollReference = $(this).offset().top + this.scrollHeight;
        var scrollCorrection = 0;
        var selectedH2 = $(this).parents('.toc').find('h2.selected');
        if (selectedH2.length) {
            var before = $('h2').index(selectedH2) < $('h2').index(this);
            var contentToHide = selectedH2.siblings('.content');
            if (contentToHide.length) {
                if (before) scrollCorrection -= contentToHide.get(0).scrollHeight; 
                contentToHide.removeClass('showing').animate({
                    height: 0
                }, 0.96 * 1000); 
            }
            selectedH2.removeClass('selected').addClass('listed');
/*            if (before) scrollCorrection -= hidingH2.get(0).scrollHeight;*/
        }
        $(this).removeClass('listed').addClass('selected');
        var contentToShow = $(this).siblings('.content');
        var contentToShowHeight = contentToShow.get(0).scrollHeight;
        var screenHeight = $(window).innerHeight();
        contentToShow.addClass('showing').animate({
            height: Math.max(contentToShowHeight, screenHeight) + "px"
        }, 0.96 * 1000);
        $('html, body').animate({
            scrollTop: (scrollReference + scrollCorrection)
        }, 0.96 * 1000);
        /* h2 moves up because elements before h2 are hiding
         * the page scrolls up to h2's new position 
         * if the scrolling is faster than the moving, h2 appears to move down */
    });
    $('.content').on('click', function() {
        // workaround for webflow sliders not being aligned properly
        // when being rendered while part of hidden content.
        // after testing numberous workarounds, I found out that a
        // window resize triggers proper realigning of the slider
        // so this one ends up as most elegant.
        $(window).trigger('resize');
    });
//    $('.content').hide();
});