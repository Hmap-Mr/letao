$(function(){

    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    initScroll();

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

            queryHistory();
            $(".input-search").val('');
            window.location.href = "productlist.html?search="+search+"&time="+new Date().getTime();
                   
        })
    };
    // 查询记录
    function queryHistory(){
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        $(".search_ul").html(template("searchHistory_li",{list:searchHistory}));
    };
    // 删除记录
    function deleteHistory(){
        $(".search_ul").on("tap","li span",function(){
            var index = $(this).parent().data('index');
            // $(this).parent().remove();
            var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
            searchHistory.splice(index,1);
            localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
            queryHistory();
        });
    };
    // 清空记录
    function clearHistory(){
        $(".clear_btn").on("tap",function(){
            // localStorage.setItem("searchHistory",JSON.stringify([]));
            localStorage.removeItem("searchHistory");
            queryHistory();
        })
    };

    window.onkeydown = function(e){
        if(e.keyCode == 13){
            $(".btn-search").trigger("tap");
        }
    }

    function initScroll(){
        mui('.mui-scroll-wrapper').scroll({     
            indicators: false, //是否显示滚动条 如果不想要滚动条把这个参数的值改成false
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏        
        });
    }


});

