/**
 * Created by elly on 2017/1/29.
 */
;(function ($) {
    'use strict';

    var DEFAULT_OPTIONS = {
        width: 460,
        marginRight: 20,
        marginBottom: 20,
        onInit: function () {
        }
    };

    function Waterfall(element, options) {
        this.element = $(element);
        this.options = $.extend({}, DEFAULT_OPTIONS, options);
        this.init();
        this.resize();
    }


    Waterfall.prototype.init = function () {
        var $this = this.element;
        var options = this.options;
        var width = options.width;
        var marginRight = options.marginRight;
        var marginBottom = options.marginBottom;
        var $children = $this.find('li');
        var $length = $children.length;
        var $width = $this.parent().innerWidth();
        var cols = Math.floor(($width + marginRight) / (width + marginRight));
        var floorRows = Math.floor($length / cols);
        var lastRowNum = $length - floorRows * cols;
        lastRowNum = lastRowNum || cols;
        var top = 0;
        var left = 0;
        var warpHeight = 0;

        $children.css({width: width});

        for (var i = 0; i < cols; i++) {
            var index = 0;
            for (var j = 0; index < $length; j++) {
                index = i + j * cols;
                var $child = $children[index];
                if ($child) {
                    $child = $($child);
                    $child.animate({
                        top: top,
                        left: left
                    });
                    options.onInit($child, index, cols);
                    top = top + $child.height() + marginBottom;
                    if (index >= $length - lastRowNum && index <= $length) {
                        warpHeight = Math.max(warpHeight, top)
                    }
                }
            }
            top = 0;
            left = left + width + marginRight;
        }
        $this.css({height: warpHeight});
    };

    Waterfall.prototype.resize = function () {
        var that = this;
        $(window).on('resize', function () {
            that.init()
        });
    };

    function Plugin(options) {
        return this.each(function () {
            var $this = $(this),
                $children = $this.find("li"),
                data = $this.data('ellie.waterfall'),
                _options = typeof options == 'object' && options;
            if (!data) {
                $this.css({position: 'relative'});
                $children.css({position: 'absolute'});
                $this.data('ellie.waterfall', ( data = new Waterfall(this, _options) ));
            }
        })
    }

    $.fn.waterfall = Plugin;

})(jQuery);
