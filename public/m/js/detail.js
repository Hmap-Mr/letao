$(function(){
    // 初始化轮播图
    function initSlide(){
        var gallery = mui("#slide");
        gallery.slider({
            interval:2000
        });
    };
    initSlide();

    // 初始化滚动条
    function initScroll(){
        mui('.mui-scroll-wrapper').scroll({     
            indicators: false, //是否显示滚动条 如果不想要滚动条把这个参数的值改成false
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏        
        });
    }
    initScroll();

    // 获取参数 函数
    function getQueryString(name){
        var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
        var arr = window.location.search.match(reg);
        if(arr != null){
            return decodeURI(arr[0].split('=')[1]);
        }
        return "";
    }
    var id = getQueryString("id");

    //查询 商品详情
    function queryDetail(id=1){
        $.ajax({
            type:"get",
            url:"http://localhost:3000/product/queryProductDetail",
            dataType:"json",
            data:{
                id:id
            },
            success:function(obj){
                // console.log(obj);
                // 处理尺码数组
                var arr = obj.size.split("-");
                var size = [];
                for(var i = arr[0]-0;i<=arr[1]-0;i++){ 
                    size.push(i);
                }
                obj.size = size;
                // 调用模板
                $("#main .mui-scroll").html(template("detail_div",obj));
                // 初始化轮播图
                initSlide();
                // 初始化滚动条
                initScroll();
                // 初始化号码框
                mui(".mui-numbox").numbox();
                // 添加点击事件 切换类
                $(".product-size button").on("tap",function(){
                    $(this).addClass("mui-btn-warning").siblings().removeClass("mui-btn-warning");
                });
            }
        });
    };
    queryDetail(id);

    function addCart(){
        $(".cart-btn").on("tap",function(){
            var id = getQueryString("id");
            var size = $(".mui-btn.mui-btn-warning").data("size");
            var num = mui('.mui-numbox').numbox().getValue();

            $.ajax({
                type:"post",
                url:"/cart/addCart",
                dataType:"json",
                data:{
                    productId:id,
                    size:size,
                    num:num
                },
                success:function(obj){
                    console.log(obj);
                    if(obj.error){
                        location = "login.html?returnurl=" + location.href;
                    }else {
                        mui.confirm("<h4>加入成功!</h4>是否去购物车查看","温馨提示",["是","否","哎呀"],function(obj){
                            console.log(obj);
                            if(obj.index==0){
                                location = "cart.html?id="+id;
                            }else {
                                mui.toast('官人请继续玩~',{ duration:'long', type:'div' }) 
                            }
                        },"div")
                        // location = "cart.html?id="+id;
                    }
                }
            });

        });
    }
    addCart();
});