// 进度条

$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function (){
    NProgress.done();
  },500);
})



$(function(){
  $('.lt_aside .category').click(function(){
    $(".lt_aside .child").stop().slideToggle();
  });


  $('.icon_menu').click(function(){
    $(".lt_aside ").toggleClass("hidemenu");
    $(".lt_topbar ").toggleClass("hidemenu");
    $(".lt_main ").toggleClass("hidemenu");
  });



  //退出显示模态框
  $(".icon_logout").click(function(){
    $("#logoutModal").modal("show");
  });

  //模态框退出功能
  $("#logoutBtn").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      datatype:"json",
      success:function(info){
        // console.log(info);
        if (info.success) {
         location.href = "login.html";
        }
      }
    })
  });


  //登录拦截
 
})