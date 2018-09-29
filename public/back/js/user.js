$(function() {
  var currentPage = 1; // 表示当前页
  var pageSize = 5; // 每页多少条


  var currentId;
  var isDelete;
  // 一进入页面, 需要发送ajax请求, 请求用户列表数据, 通过模板引擎, 进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,  // 页码
        pageSize: pageSize  // 每页多少条
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )

        // 模板引擎 template( 模板id, 数据对象 );
        var htmlStr = template( "tpl", info );
        // 根据生成的 htmlStr 模板, 渲染 tbody
        $('tbody').html( htmlStr );

        // 分页初始化测试
        $('#paginator').bootstrapPaginator({
          // 指定 bootstrap 的版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给分页按钮添加点击事件
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
            // 更新当前页
            currentPage = page;
            // 重新根据 render
            render();
          }
        });

      }
    })
  }

//点击启用禁用按钮，显示模态框，时间委托
      $("tbody").on("click",".btn",function(){
        $("#userModal").modal("show");
        currentId = $(this).parent().data("id");
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
      });

    $("#submitBtn").on("click",function(){
      console.log(currentId , isDelete);

      $.ajax({
        type : "post",
        url:"/user/updateUser",
        dataType:"json",
        data:{
          id :currentId,
          isDelete : isDelete
        },
        success: function(info){
          console.log(info);
          if (info.success) {
            $("#userModal").modal("hide");
            render();
          }
        }
      })
    })




});
