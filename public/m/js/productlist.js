$(function(){
    // 1.截取地址栏的参数 函数
    function querySearch(str){
        //接收地址参数  按键值对 分割成数组
        var arr = window.location.search.substr(1).split("&");
        for(var i = 0;i<arr.length;i++){ 
            if(arr[i].split("=")[0]==str){
                return decodeURI(arr[i].split("=")[1]);
            };
        }
    }
    // 2.截取地址栏的参数 函数  (正则)
    function getQueryString(name){
        var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
        var arr = window.location.search.match(reg);
        if(arr != null){
            return decodeURI(arr[0].split('=')[1]);
        }
        return "";
    }
    var proName = querySearch('search');

    /**
     * @param {*} page 第几页
     * @param {*} pageSize 每页条数
     * @param {*} brandId 品牌id
     * @param {*} proName 产品名称
     * @param {*} price 价格(1升序2降序)
     * @param {*} num   库存(1升序2降序)
     */
    function getData(page,pageSize,proName,sort={}){
        var price = sort.price;
        var num = sort.num;

        $.ajax({
            type:"get",
            url:"http://localhost:3000/product/queryProduct",
            dataType:"json",
            data:{
                page:page,
                pageSize:pageSize,
                proName:proName,
                price:price,
                num:num
            },
            success:function(obj){
                // console.log(obj);
                $(".mui-card-content .mui-row").html(template("product_list_div",obj))
            }
        });
    }
    getData(1,5,proName);

    function sortProduct(){
        $(".product-list .mui-card-header a").on("tap",function(){
            console.log(this);
            $(this).addClass("active").siblings().removeClass("active");
            var sort = $(this).data("sort");
            var type = $(this).data("type");
            if(sort==2){
                sort = 1;
                $(this).data("sort",sort).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(this).siblings().data("sort",2).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
                if(type == "price"){
                    getData(1,5,proName,{price:1});
                }else {
                    getData(1,5,proName,{num:1});
                }
            }else {
                sort = 2;
                $(this).data("sort",sort).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
                $(this).siblings().data("sort",2).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
                if(type == "price"){
                    getData(1,5,proName,{price:2});
                }else {
                    getData(1,5,proName,{num:2});
                }
            }
        });
    };
    sortProduct();

    

    // 添加记录
    function addHistory(){
        //搜索按钮 点击事件
        $(".btn-search").on("tap",function(){
            var search = $(".input-search").val().trim();
            if(search==""){
                mui.toast('请输入合法搜索内容!',{ 
                    duration:'long',
                    type:'div'
                });
                return false;
            }
            //获取以前的 历史记录
            var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
            
            // 查重 把前面的删除掉 
            for(var i = 0;i<searchHistory.length;i++){ 
                if(searchHistory[i].key == search){
                    searchHistory.splice(i,1);
                    i--;
                }
            }
            
            // 加入到 历史记录 数组中
            searchHistory.unshift({
                key:search,
                time:new Date().getTime()
            });

            // 添加到localStorage
            localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
            console.log(searchHistory);

            $(".input-search").val('');
            window.location.href = "productlist.html?search="+search+"&time="+new Date().getTime();
                   
        })
    };
    addHistory();

    window.onkeydown = function(e){
        if(e.keyCode == 13){
            $(".btn-search").trigger("tap");
        }
    }
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
                getData(1,5,proName);
                mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
            },2000);
            
        }
        // 上拉
        var pages = 1;
        function pullupRefresh(){
            setTimeout(function(){
                $.ajax({
                    type:"get",
                    url:"http://localhost:3000/product/queryProduct",
                    dataType:"json",
                    data:{
                        page:++pages,
                        pageSize:4,
                        proName:proName
                    },
                    success:function(obj){
                        if(obj.data.length > 0){
                            $(".mui-card-content .mui-row").append(template("product_list_div",obj));
                            mui("#pullrefresh").pullRefresh().endPullupToRefresh();
                        }else {
                            mui("#pullrefresh").pullRefresh().endPullupToRefresh(true);
                        }
                        
                    }
                });
            },2000);
        }
    }
    pullRefresh();

    // 点击button跳转到detail页面
    function gotoDetail(){
        $(".mui-card-content .mui-row").on("tap",".product-buy",function(){
            let id = $(this).data("id");
            window.location.href = "detail.html?id="+id;
        });
    }
    gotoDetail();
})