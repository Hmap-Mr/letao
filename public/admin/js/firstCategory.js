var totalPage = 0;
var page = 1;
$(function () {
    queryTopCategory();
    addFirstCategory();
    // 1. 完成后台主页的用户管理页面渲染用户信息功能
    function queryTopCategory() {
        /* 1. 请求后台获取用户信息的API
        2. 创建用户信息的表格的模板
        3. 调用模板生成表格tr
        4. 把表格tr放到tbody */
        //    1. 请求后台获取用户信息的API
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: 5
            },
            success: function (data) {
                // console.log(data);
                //    2. 创建用户信息的表格的模板
                //    3. 调用模板生成表格tr
                var html = template('firstCategoryTpl', data);
                // console.log(html);
                //    4. 把表格tr放到tbody 
                $('.info tbody').html(html);

                // 5. 初始化之前计算当前总共分几页 使用总条数/每页大小 而且向上取整 如果7/5 = 1.2 == 2
                totalPage = Math.ceil(data.total / data.size);
                // console.log(totalPage);
                // 6. 得在数据渲染完之后才知道要分几页才调用初始化分页的函数
                initPage();
            }
        })
    }
    // 2. 使用分页插件实现分页功能 函数
    function initPage() {
        /* 1. 先引包引入插件 bootstrapPaginator.js文件
        2. 写一个结构 ul
        3. 调用分页插件的初始化函数  传人一堆参数
        4. 当前页码数（控制哪个高亮）
        5. totalPages 总页码数 总条数/每页大小
        6. 总条数请求了数据才知道要等到数据渲染完后再初始化分页
        7. 还有一个点击事件点击每个分页按钮都会触发事件 里面最后一个参数就当前点击的页码数
        8. 把当前点击页码数覆盖全局变量页码数
        9. 调用查询刷新页面既可 */
        $(".page-list").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: page, //当前页数 也是外面定义的全局变量当前页码数
            numberOfPages: 10, //每次显示页数
            totalPages: totalPage, //总页数 外面定义全局变量totalPage
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
            //点击事件
            onPageClicked: function (event, originalEvent, type, nowPage) {
                // console.log(nowPage);
                // nowPage就是当前点击的每一页
                // 把全局变量的page赋值为当前的nowPage
                page = nowPage;
                // 重新调用查询刷新页面
                queryTopCategory();
            }
        });
    }
    // 3. 添加一级分类功能
    function addFirstCategory() {
        /* 1. 点击保存要添加分类名称
        2. 获取输入框输入分类名称
        3. 也要进行非空 合法判断
        4. 调用添加分类的API接口传入当前的分类名称
        5. 如果添加调用查询刷新页面 */
        // 1. 给保存按钮添加点击事件
        $('.btn-save').on('click', function () {
            // 2. 获取输入框输入分类名称
            var categoryName = $('.category-name').val().trim();
            if (categoryName == '' || categoryName.length > 3) {
                alert('分类名称不合法不能为空且不能大于3位');
                return false;
            }
            // 3. 调用添加分类的API接口传入当前的分类名称
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: categoryName
                },
                success: function (data) {
                    //   4. 判断如果添加成功就调用查询刷新页面
                    if (data.success) {
                        queryTopCategory();
                    }
                }
            });
            // 6. 清空输入框
            $('.category-name').val('');
        });
    }
});