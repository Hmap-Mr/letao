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
                    // getData(1,5,proName);
                    mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
                },2000);
                
            }
            // 上拉
            var pages = 1;
            function pullupRefresh(){
                setTimeout(function(){
                    // $.ajax({
                    //     type:"get",
                    //     url:"http://localhost:3000/product/queryProduct",
                    //     dataType:"json",
                    //     data:{
                    //         page:++pages,
                    //         pageSize:4,
                    //         proName:proName
                    //     },
                    //     success:function(obj){
                    //         if(obj.data.length > 0){
                    //             // $(".mui-card-content .mui-row").append(template("product_list_div",obj));
                    //             mui("#pullrefresh").pullRefresh().endPullupToRefresh();
                    //         }else {
                    //             mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);
                    //         }
                            
                    //     }
                    // });
                },2000);
            }
        }
        pullRefresh();
});