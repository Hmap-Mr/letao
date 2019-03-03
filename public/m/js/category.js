$(function(){
    // 左侧滑动 初始化
    var mySwiper = new Swiper('.category-left .swiper-container', {
        slidesPerView: "auto",
        direction: 'vertical',
        freeMode: true,
        mousewheel: true,
    })

    // 右侧滑动 初始化
    var mySwiper = new Swiper('.category-right .swiper-container', {
        slidesPerView: "auto",
        direction: 'vertical',
        freeMode: true,
        mousewheel: true,
    })

    // 请求左边栏
    $.ajax({
        type:"get",
        url:"http://localhost:3000/category/queryTopCategory",
        dataType:"json",
        success:function(obj){
            // console.log(obj);
            $(".category-left .mui-table-view").html(template("category_left_li",obj));
            $(".category-left .mui-table-view li").on("tap",function(e){
                    e.preventDefault();
                    $(this).addClass("active").siblings().removeClass("active");
                    SecondCategory($(this).data('index'));           
            });
        }
    });

    //请求右边栏 函数
    function SecondCategory(id){
        // e.preventDefault();
        $.ajax({
            type:"get",
            url:"http://localhost:3000/category/querySecondCategory",
            dataType:"json",
            data:{
                id:id
            },
            success:function(obj){
                // console.log(obj);
                $(".category-right .mui-row").html(template("category_right_div",obj));
            }
        });
    }
    SecondCategory(1);

    // 初始化区域滚动实现分类左侧滚动
    mui('.mui-scroll-wrapper').scroll({     
        indicators: false, //是否显示滚动条 如果不想要滚动条把这个参数的值改成false
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏        
    });
});