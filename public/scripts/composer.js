$(document).ready(function() {
  $(document).scroll(function() {
    if ($(window).scrollTop() === 0) {
      $(".top").css("display", "none");
      $(".right-nav").css("display", "flex");
      $(".new-tweet").slideDown("fast");
    } else {
      $(".top").css("display", "block");
      $(".right-nav").css("display", "none");
    }
  });
  $(".top").click(function() {
    $(window).scrollTop(0);
    $("textarea").focus();
  });
});
