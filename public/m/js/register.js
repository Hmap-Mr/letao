$(function(){
    // 全局的 验证的 验证码
    var vCode = 0;

    function register(){
        $(".btn-register").on("tap",function(){
            var isChecked = true;
            var inputs = $(".mui-input-row input");
            inputs.each(function(index,ele){
                if(this.value.trim() == ""){
                    mui.toast(this.placeholder,{duration:"long",type:"div"});
                    isChecked = false;
                    return false;
                };
            });
            if(isChecked){
                var mobile = $(".mobile-btn").val().trim();
                var username = $(".user-btn").val().trim();
                var password1 = $(".pass1-btn").val().trim();
                var password2 = $(".pass2-btn").val().trim();
                var vcode = $(".vcode").val().trim();

                // 验证手机号
                if(!/^[1][3,4,5,6,7,8,9][0-9]{9}/.test(mobile)){
                    mui.toast("手机号输入不合法!",{duration:"1000",type:"div"});
                    return false;
                }
                // 验证用户名 6-12位
                if(!/^[0-9a-zA-Z]{6,12}$/.test(username)){
                    mui.toast("用户名输入不合法!",{duration:"1000",type:"div"});
                    return false;
                }
                //
                if(password1 != password2){
                    mui.toast("两次输入的密码不一致!",{duration:"1000",type:"div"});
                    return false;
                }
                if(vcode != vCode){
                    mui.toast("验证码错误!",{duration:"1000",type:"div"});
                    return false;
                }
                $.ajax({
                    type:"post",
                    url:"/user/register",
                    dataType:"json",
                    data:{
                        username:username,
                        password:password1,
                        mobile:mobile,
                        vCode:vCode,
                    },
                    success:function(obj){
                        if(obj.error){
                            mui.toast(obj.message,{duration:1000,type:"div"});
                        }else {
                            location = "login.html?name="+username+"&user="+password1+"&returnurl=user.html";
                        }
                    }
                });
                // mui.toast("注册成功!",{duration:"long",type:"div"});
            }
        });
    };
    register();

    function getVCode(){
        $(".btn-get-vcode").on("tap",function(){
            $.ajax({
                type:"get",
                url:"/user/vCode",
                dataType:"json",
                success:function(obj){
                    console.log(obj.vCode);
                    vCode = obj.vCode;
                }
            });
        })
    }
    getVCode();
});