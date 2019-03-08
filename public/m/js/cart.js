$(function(){
        // 上下拉 函数
        function pullRefresh(){
            mui.init({
                pullRefresh: {
                    // 指定一个下拉刷新的容器 也是就是区域滚动的父容器
                    container: '#pullrefresh',
                    // down表示初始化下拉刷新
                    down: {
                        contentdown:"往下拉可以刷新噢!",
                        contentover:"释放可以立即刷新!",
                        contentrefresh:"正在刷新...",
                        // callback指的是下拉刷新的回调函数
                        callback: pulldownRefresh
                    },
                    // up表示初始化上拉加载更多
                    up: {
                        height:200,//可选.默认50.触发上拉加载拖动距离
                        contentrefresh: '正在加载...',
                        callback: pullupRefresh
                    }
                }
            });
            // 下拉 刷新 具体工作 函数
            function pulldownRefresh(){
                setTimeout(function(){
                    queryCart(1);
                    mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
                },500);
                
            }
            // 上拉
            var pages = 1;
            function pullupRefresh(){
                setTimeout(function(){
                    $.ajax({
                        type:"get",
                        url:"/cart/queryCartPaging",
                        dataType:"json",
                        data:{
                            page:++pages,
                            pageSize:10,
                        },
                        success:function(obj){
                            // console.log(obj);
                            if(obj.error){
                                location.href = "login.html?returnurl="+location.href;
                            }else {
                                // console.log(obj);
                                if(obj.length > 0){
                                    $(".cart-list").append(template("cart_li",obj));
                                    mui("#pullrefresh").pullRefresh().endPullupToRefresh();
                                }else {
                                    mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);
                                };           
                            }
                            
                        }
                    });
                },1000);
            }
        }
        pullRefresh();

        function queryCart(page){
            $.ajax({
                type:"get",
                url:"/cart/queryCartPaging",
                dataType:"json",
                data:{
                    page:page,
                    pageSize:10,
                },
                success:function(obj){
                    // console.log(obj);
                    if(obj.error){
                        location.href = "login.html?returnurl="+location.href;
                    }else {
                        // console.log(obj);
                        $(".cart-list").html(template("cart_li",obj))
                        getCount();
                    }
                    
                }
            });

        }
        queryCart(1);

        function deleteCart(){
            $(".cart-list").on("tap",".delete-btn",function(){
                var li = $(this).parent().parent()[0];
                var id = $(this).data("id");
                mui.confirm("您真的要删除我吗?","温馨提示",["确认","取消"],function(e){
                    if(e.index==1){
                        mui.swipeoutClose(li);
                    }else{
                        $.ajax({
                            type:"get",
                            url:"/cart/deleteCart",
                            dataType:"json",
                            data:{
                                id:id
                            },
                            success:function(obj){
                                // console.log(obj);
                                if (obj.success) {
                                    // 8. 如果返回成功就提示用户删除成功
                                    mui.toast('删除成功', {
                                        duration: 1000,
                                        type: 'div'
                                    });
                                    // 9. 重新调用查询刷新页面
                                    queryCart(1);
                                } else {
                                    // 10. 删除失败跳转到登录可能是没登录
                                    location = 'login.html?returnurl=' + location.href;
                                }
                            }
                        });
                    }
                });
            });
        }
        deleteCart();

        function editCart(){
            $(".cart-list").on("tap",".edit-btn",function(){

                var product = $(this).data("product");

                var productSize = [];
                var produMin = product.productSize.split("-")[0] - 0;
                var produMax = product.productSize.split("-")[1] - 0;
                for(var i = produMin;i<=produMax;i++){ 
                    productSize.push(i);
                }
                product.productSize = productSize;

                var html = template("cart_edit",product);
                html = html.replace(/[\r\n]/g, '');

                var li = $(this).parent().parent()[0];
                var id = product.id;
                mui.confirm(html,"温馨提示",["确认","取消"],function(e){
                    console.log(e.index);
                    if(e.index==1){
                        mui.swipeoutClose(li);
                    }else{
                        var size = $(".mui-btn.mui-btn-warning").data("size");
                        var num = $(".product-num input.mui-numbox-input").val();
                        console.log(id,size,num);
                        $.ajax({
                            type:"post",
                            url:"/cart/updateCart",
                            dataType:"json",
                            data:{
                                id:id,
                                size:size,
                                num:num,
                            },
                            success:function(obj){
                                // console.log(obj);
                                if (obj.success) {
                                    // 8. 如果返回成功就提示用户删除成功
                                    mui.toast('保存成功', {
                                        duration: 1000,
                                        type: 'div'
                                    });
                                    // 9. 重新调用查询刷新页面
                                    queryCart(1);
                                } else {
                                    // 10. 删除失败跳转到登录可能是没登录
                                    location = 'login.html?returnurl=' + location.href;
                                }
                            }
                        });
                    }
                });
                // 初始化号码框                
                mui(".mui-numbox").numbox();
                // 添加点击事件 切换类
                $(".product-size button").on("tap",function(){
                    $(this).addClass("mui-btn-warning").siblings().removeClass("mui-btn-warning");
                });
                // 调用计算总金额函数
                getCount();
            });
        };
        editCart();

        function getCount(){
            var checkeds = $(".mui-checkbox input:checked");

            var sum = 0;
            checkeds.each(function(index,ele){
                var price = $(this).data("price");
                var num = $(this).data("num");
                var singleCount = price * num;
                sum += singleCount;
            });
            sum = sum.toFixed(2);
            console.log(sum);
            $(".order-count span").html(sum);
        }

        
});