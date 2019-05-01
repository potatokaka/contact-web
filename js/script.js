$(function(){
    svgimg();
});
      
function animMainVisual(){
    $('.carousel').carousel('pause');
    $(".carousel").swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');
      }
    });
}

$(window).on("load", function (e) {
    var progress = 0;
    var imgCount = $('img').length;
    var baseCount = 0;
    $('img').each(function(){
        var src = $(this).attr('src');
        $('<img>').attr('src',src).on('load',function(){
            progress++;

            if(progress == imgCount) {
                $('#loadingBar').css({'height': '100%'});
                
                setTimeout(function(){
                    $('#loadingBg').css({'height': '0'});
                    
                    $("#container").removeClass('hide');
                    $("#loadingBg").remove();
                    animMainVisual();
                }, 1000);
            }
        });
    });
});


$(window).scroll(function(event){
    var w = $(window).width();
    var h = $(window).height();
    var scrolltop = $(window).scrollTop();

});



function svgimg(){
    $('img.svgimg').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            
            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    
    }); 
}
