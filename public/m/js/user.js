$(function(){
    function queryUserMassage(){
        $.ajax({
            type:"get",
            url:"/user/queryUserMessage",
            dataType:"json",
            success:function(obj){
                // console.log(obj);
                if(obj.error){
                    location = "login.html?returnurl=" + location.href;
                }else {
                    $(".username").html(obj.username);
                    $(".mobile").html(obj.mobile);
                }
            }
        });
    }
    queryUserMassage();

    function exit(){
        $(".exit-btn").on("tap",function(){    
            $.ajax({
                type:"get",
                url:"/user/logout",
                dataType:"json",
                success:function(obj){
                    if(obj.success){
                        location = "login.html?returnurl=" + location.href;
                    }
                }
            });
        });
    }
    exit();
})