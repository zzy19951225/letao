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
  
})