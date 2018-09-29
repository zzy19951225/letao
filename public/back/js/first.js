$(function(){
  var currentPage =1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data : {
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success: function(info){
        var htmlStr = template("tpl" ,info);
        $('tbody').html(htmlStr);


        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked : function(event, originalEvent, type, page){
            currentPage = page;
            render();
          }
        })
      }
    });
  }


  //点击添加分类按钮，显示添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  });

  //表单校验
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  //阻止校验成功时的默认提交（ajax）
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data : $("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          $("#addModal").modal("hide");
          currentPage=1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }

    })
  });

})