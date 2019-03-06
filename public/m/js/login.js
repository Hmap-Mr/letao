$(function(){

    // 2.截取地址栏的参数 函数  (正则)
    function getQueryString(name) {
        var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
        var arr = window.location.search.match(reg);
        console.log(arr);
        if (arr != null) {
            return decodeURI(arr[0].substr(arr[0].indexOf("=")+1,));
        }
        return "";
    }

    // 登录函数
    function login(){
        $(".login-btn").on("tap",function(){
            var userName = $(".user-btn").val().trim();
            var password = $(".pass-btn").val().trim();

            if(userName==""){
                mui.toast('请输入用户名',{ duration:'long', type:'div' });
                return false;
            };
            if(password==""){
                mui.toast('请输入密码',{ duration:'long', type:'div' });
                return false;
            };

            $.ajax({
                type:"post",
                url:"/user/login",
                dataType:"json",
                data:{
                    username:userName,
                    password:password
                },
                success:function(obj){
                    if(obj.error){
                        mui.toast(obj.massage,{ duration:'long', type:'div' });
                    }else{
                        location.href = getQueryString("returnurl");
                    }
                }
            });
        });
    };

    login();
});