$(function(){
    login();

    function login(){
        $(".login-btn").on("click",function(){
            var userName = $(".username").val().trim();
            var password = $(".password").val().trim();

            if (userName == "") {
                alert('请输入用户名');
                return false;
            };
            if (password == "") {
                alert('请输入密码');
                return false;
            };

            $.ajax({
                type:"post",
                url:"/employee/employeeLogin",
                dataType:"json",
                data:{
                    username:userName,
                    password:password
                },
                success:function(obj){
                    console.log(obj);
                    if(obj.error){
                        alert(obj.message);
                    }else{
                        location.href = "index.html";
                    }
                }
            });

        });

    }
});