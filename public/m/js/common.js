//公共逻辑代码

// 返回上一页的功能函数
function goBack(){
    $("#header .left .fa-arrow-left").on("tap",function(){
        history.back();
    });
}
goBack();


// 1.截取地址栏的参数 函数 (数组)
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
function getQueryString(name) {
    var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
    var arr = window.location.search.match(reg);
    if (arr != null) {
        return decodeURI(arr[0].substr(arr[0].indexOf("=")+1,));
    }
    return "";
}