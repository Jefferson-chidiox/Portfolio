function dt_counterFlip() {
	
    var oTop = $('#counter').offset().top - window.innerHeight;
    $(window).bind('scroll', function() {
        var pTop = $(this).scrollTop();

        if (pTop > oTop) {
            $(window).unbind('scroll');
            $('.count', '#counter').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
    });


}
$(document).ready(function() {
dt_counterFlip();
});