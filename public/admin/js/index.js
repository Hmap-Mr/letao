var totalPage = 0;
var page = 1;

$(function(){

    queryUser();
    updateUser();

    // 1. 完成后台主页的用户管理页面渲染用户信息功能
    function queryUser(){
        $.ajax({
            url:"/user/queryUser",
            data:{
               page:page,
               pageSize:5, 
            },
            success:function(data){
                // console.log(data);
                $(".info tbody").html(template("content_table",data));
                totalPage = Math.ceil(data.total / data.size);
                initPages(totalPage);
            }
        });
    }

    // 2. 完成更新用户状态的函数
    function updateUser(){
        $('.info tbody').on('click', '.btn-option', function () {
            var isDelete = $(this).data("isdelete");
            isDelete = isDelete == 0?1:0;
            $(this).data("isdelete",isDelete);
            var id = $(this).data("id");
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function(data){
                    if(data.success){
                        queryUser();
                    }
                }
            });
        });
    };

    function initPage(){
        var pages = [];
        for(var i = 1;i<=totalPage;i++){ 
            pages.push(i);
        }
        $(".page-list").html(template("page_li",{pages:pages,page:page}));

        $(".page-list li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            page = $(this).data("page");
            queryUser();
        });

    }

    function initPages(totalPage){
        $(".page-list").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: page,
            numberOfPages: 10,
            totalPages: totalPage,
            shouldShowPage: true, 
            useBootstrapTooltip: true,
            onPageClicked:function(event,originalEvent,type,nowPage){
                page = nowPage;
                queryUser();
            }
        });
    }
});