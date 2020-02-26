$(document).ready(function() {
  $("textarea").keyup(function() {
    let remainlen = 140 - $(this).val().length;

    const counter = $(this)
      .siblings()
      .children(".counter");

    if (remainlen < 0) {
      $(counter).addClass("invalid-counter");
    }
    if (remainlen >= 0) {
      $(counter).removeClass("invalid-counter");
    }
    $(counter).text(remainlen);
  });
});
