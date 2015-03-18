var isPhoneGapApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
var rowH;
$(document).ready(function() {
    // define available background images
    var bgImages = [
        { file: 'images/01.jpg', w: 1536, h: 1024 },
        { file: 'images/02.jpg', w: 1536, h: 1024 },
        { file: 'images/03.jpg', w: 1280, h: 853 },
        { file: 'images/04.jpg', w: 1536, h: 1024 },
        { file: 'images/05.jpg', w: 1538, h: 1024 },
        { file: 'images/06.jpg', w: 1820, h: 1024 },
        { file: 'images/07.jpg', w: 1535, h: 1024 },
        { file: 'images/08.jpg', w: 1542, h: 1024 },
        { file: 'images/09.jpg', w: 1280, h: 850 },
        { file: 'images/10.jpg', w: 1541, h: 1024 },
        { file: 'images/11.jpg', w: 1536, h: 1024 }
    ];
    // pick one randomly
    var bgImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    var bgHorizontality = bgImage.w / bgImage.h;
    // get body dimensions
    var bodyW = $('body').width();
    var bodyH = $('body').height();
    var bodyHorizontality = bodyW / bodyH;
    // calculate the row height (minimum 48)
    rowH = bodyH / 10;
    if (rowH < 48) {
        rowH = 48;
        bodyH = 10 * rowH;
    }
    // calculate the fontsize
    var fontS = 14 / 48 * rowH;
    // calculate the size and offset of the image
    var bgX = 0;
    var bgY = 0;
    var bgW = 'auto';
    var bgH = 'auto';
    if (bgHorizontality > bodyHorizontality) { // like e.g. on a portait phone screen
        var bgScale = bodyH / bgImage.h;
        var bgH = bodyH;
        var bgX = - 1/2 * (bgScale * bgImage.w - bodyW);
        var bgSize = bgW + ' ' + bgH + 'px';
    } else { // like e.g. on a widescreen monitor
        var bgScale = bodyW / bgImage.w;
        var bgW = bodyW;
        var bgY = - 1/2 * (bgScale * bgImage.h - bodyH);
        var bgSize = bgW + 'px' + ' ' + bgH;
    }
    // set the rows with the row height and fontsize
    $('header,.ruimte,h1.init').css('height', rowH + 'px');
    $('header,h1').css('line-height', rowH + 'px').css('font-size', fontS + 'pt');
    // set the background image
    $('header,.ruimte,h1')
        .css('background', '#607D8B')
        .css('background-image', 'url(' + bgImage.file + ')')
        .css('background-size', bgSize)
        .css('background-position-x', bgX + 'px');
    // set the variable Y-offset
    var bgOffsets = [
        { q: 'header', y: bgY },
        { q: '.ruimte.boven', y: bgY - rowH },
        { q: '.gemeenschappelijke-gebeden h1', y: bgY - 2*rowH },
        { q: '.drie-eenheid h1', y: bgY - 3*rowH },
        { q: '.aanbidding h1', y: bgY - 4*rowH },
        { q: '.heilige-geest h1', y: bgY - 5*rowH },
        { q: '.maria h1', y: bgY - 6*rowH },
        { q: '.voor-de-mis h1', y: bgY - 7*rowH },
        { q: '.na-de-mis h1', y: bgY - 8*rowH },
        { q: '.ruimte.beneden', y: bgY - 9*rowH }
    ];
    $.each(bgOffsets, function(index, value) {
        $(value.q).css('background-position-y', value.y + 'px');    
    });
    if (!isPhoneGapApp) {
        // something to do only on web
        $('footer').show();
    } else {
        // something to do only on app
        document.addEventListener("deviceready", function(){
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, 100);
        }, false);
    }
});
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
                height: rowH + "px"
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
        var scrollReference = $(this).offset().top /*+ this.scrollHeight*/;
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
    $('header').on('click', function() {
        // find the h1 that is hiding (= for which the toc is shown)
        // hide the h2's in that h1
        // hide the contents in that h1
        // show that h1
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
                height: rowH + "px"
            }, 0.96 * 1000);
            if (before) scrollCorrection += hidingH1.height();
        }
        $('html, body').animate({
            scrollTop: (Math.max(0, scrollReference + scrollCorrection))
        }, 0.96 * 1000);
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