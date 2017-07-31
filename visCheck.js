$('document').ready(function() {
    $('.focus').visCheck({
        applyNumbers: true,
    });
});


//wrap settings in an object
(function($){

    $.fn.visCheck = function(settings) {
        const visable = new VisCheck(this, settings)
    };

    function VisCheck(elements, c_settings){
        const _ = this;

        _.settings = {
            className: 'visible',
            notVisClass: 'not-visible',
            applyNotVisClass: false,
            numberingClassPrefix: 'vis',
            applyNumbers: false,
        }

        $.extend(_.settings, c_settings)

        _.elements = elements,
        _.viewframeTop;
        _.viewframeBot;
        _.activeElements = 0;

        _.updateVisibility();
        _.addListener();

    }

    VisCheck.prototype.updateVisibility = function() {
        const _ = this;

        _.getFrameCoords();
        _.elements.each(function(){
            _.checkVisibility($(this))
        })

        if (_.settings.applyNumbers){
            _.addNumbering();
        }
    }

    VisCheck.prototype.getFrameCoords = function() {
        const _ = this;

        _.viewframeTop = $(window).scrollTop();
        _.viewframeBot = _.viewframeTop + $(window).height();
    }

    VisCheck.prototype.checkVisibility = function(element, i) {
        const _ = this;

        let elemTop = element.offset().top;
        let elemBottom = elemTop + element.height();


        if ((elemBottom <= _.viewframeBot) && (elemTop >= _.viewframeTop)) {
            element.removeClass(_.settings.notVisClass).addClass(_.settings.className);
            _.activeElements++;
        } else {
            element.removeClass(_.settings.className);
            if (_.settings.applyNotVisClass) {
                element.addClass(_.settings.notVisClass);
            }
        }
    }

    //use ~ sibling selectors? save a count and for loop the count to remove
    VisCheck.prototype.addNumbering = function() {
        const _ = this;

        for (let i = 0; i < _.activeElements; i++) {
            let numClass = _.settings.numberingClassPrefix + i;
            $('.' + numClass).removeClass(numClass);
        }

        $('.' + _.settings.className).each(function(i){  
            $(this).addClass(_.settings.numberingClassPrefix + i);
        })
    }

    VisCheck.prototype.addListener = function() {
        const _ = this;

        $(window).scroll(function(){
            _.updateVisibility();
        })
    }
    
})(jQuery)