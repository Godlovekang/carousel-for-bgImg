(function(name, definition, context) {
    if (typeof module != 'undefined' && module.exports) {
        // 在 CMD 规范下 (node)
        module.exports = definition();
    } else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define']['cmd'])) {
        //在 AMD 规范下(RequireJS) 或者 CMD 规范下(SeaJS)
        define(definition);
    } else {
        //在浏览器环境下
        context[name] = definition();
    }
})('carousel', function(require, exports, module) {
    var $ = require('jquery');

    function Carousel($ct) {
        this.$ct = $ct;
        this.init();
        this.bind();
    }
    Carousel.prototype.init = function() {
        var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
            $preBtn = this.$preBtn = this.$ct.find('.btn-prev'),
            $nextBtn = this.$nextBtn = this.$ct.find('.btn-next'),
            $bullot = this.$bullot = this.$ct.find('.bullot');
        var $firstImg = this.$firstImg = $imgCt.children('li').first(),
            $lastImg = this.$lastImg = $imgCt.children('li').last();
        this.curPageIndex = 0;
        this.isAnimate = false;
        this.imgLength = $imgCt.children().length

        $imgCt.append($firstImg.clone())
        $imgCt.prepend($lastImg.clone())
        $imgCt.children('li').first().css({
            'left': '-100%'
        })
        $imgCt.children('li').last().css({
            'left': this.imgLength + '00%'
        })
    }

    // $imgCt.css({
    //         'width': $firstImg.width() * $imgCt.children().length,
    //         'left': -$firstImg.width()
    //     })
    Carousel.prototype.bind = function() {
        var _this = this;
        this.$preBtn.on('click', function(e) {
            e.preventDefault();
            _this.playPre();
        })
        this.$nextBtn.on('click', function(e) {
            e.preventDefault();
            _this.playNext();
        })
        this.$bullot.on('click', 'li', function() {
            var index = $(this).index();
            _this.playBullot(index);
            _this.setBullot(index);

        })
    }



    Carousel.prototype.playPre = function() {
        var _this = this;
        if (this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            'left': '+=' + this.$firstImg.width()
        }, function() {
            _this.curPageIndex--;
            if (_this.curPageIndex < 0) {
                _this.$imgCt.css({
                    'left': -_this.$firstImg.width() * (_this.imgLength - 1)
                })
                _this.curPageIndex = _this.imgLength - 1
            }
            _this.isAnimate = false;
            _this.setBullot(_this.curPageIndex);
        })
    }

    Carousel.prototype.playNext = function() {
        var _this = this;
        if (this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            'left': '-=' + _this.$firstImg.width()
        }, function() {
            _this.curPageIndex++;
            if (_this.curPageIndex === _this.imgLength) {
                _this.$imgCt.css({
                    'left': '0'
                })
                _this.curPageIndex = 0
            }
            _this.isAnimate = false;
            _this.setBullot(_this.curPageIndex);
        })
    }
    Carousel.prototype.playBullot = function(i) {
        var _this = this;
        this.curPageIndex = i;
        this.$imgCt.animate({
            'left': -i * _this.$firstImg.width()
        })
    }
    Carousel.prototype.setBullot = function(index) {
        this.$bullot.children('li')
            .removeClass('active')
            .eq(index)
            .addClass('active')
    }
    return Carousel
}, this)
