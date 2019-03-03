$(function(){


    //mui 轮播图 初始化
    var gallery = mui(".mui-slider");
    gallery.slider({
        // 自动轮播走起 若为0则不自动播放 默认为0
        interval: 2000
    })

    //swiper轮播图 初始化
    var swiper = new Swiper(".swiper-container", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay:{
            delay:2000,
            stopOnLastSlide:false,
            disableOnInteraction:false,
        }
    });

    mui(".mui-scroll-wrapper").scroll({
        // 阻尼 减速系数 系数越小 滑动越灵敏
        deceleration:0.0005
    })


});