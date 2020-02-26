/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const convertTime = mtime => {
  let currentTime = Date.now();
  let sub = currentTime - mtime;
  let time = sub / 1000;
  if (time < 3600) {
    let min = Math.floor(time / 60);
    return `${min} ${min === 1 ? "min" : "mins"} ago`;
  } else if (time < 86400) {
    let hour = Math.floor(time / 3600);
    return `${hour} ${hour === 1 ? "hour" : "hours"} ago`;
  } else if (time < 604800) {
    let day = Math.floor(time / 86400);
    return `${day} ${day === 1 ? "day" : "days"} ago`;
  } else if (time < 2629743) {
    let week = Math.floor(time / 604800);
    return `${week} ${week === 1 ? "week" : "weeks"} ago`;
  } else if (time < 31556926) {
    let month = Math.floor(time / 2629743);
    return `${month} ${month === 1 ? "month" : "months"} ago`;
  } else {
    let year = Math.floor(time / 31556926);
    return `${year} ${year === 1 ? "year" : "years"} ago`;
  }
};

const createTweetElement = tweet => {
  let $tweet = $("<article>").addClass("tweet");
  $tweet.append(
    $("<header/>").append(
      $("<div/>", { class: "user" }).append(
        $("<div/>", { class: "avatar" }).append(
          $("<img/>", {
            src: tweet.user.avatars,
            height: "45",
            width: "45"
          })
        ),
        $("<div/>", { class: "username", text: tweet.user.name })
      ),
      $("<div/>", { class: "handler", text: tweet.user.handle })
    ),
    $("<div/>", { class: "content", text: tweet.content.text }),
    $("<footer/>", { class: "footer" }).append(
      $("<div/>", {
        class: "created",
        text: `${convertTime(tweet.created_at)}`
      }),
      $("<div/>", { class: "icons" })
    )
  );
  return $tweet;
};

$(document).ready(function() {
  const renderTweets = function(tweets) {
    const sortedTweets = tweets.sort(function(a, b) {
      return b["created_at"] - a["created_at"];
    });

    for (const tweet of sortedTweets) {
      $("#tweet-container").append(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: $(this).serialize()
    }).then(function(response) {
      renderTweets(response);
    });
  };

  loadTweets();

  $("form").submit(function(event) {
    const length = $("textarea").val().length;
    if (length === 0) {
      alert("No content provided");
    } else if (length > 140) {
      alert("Too long tweet");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).then(function(response) {
        $("#tweet-container").load("index.html #tweet-container");
        loadTweets();
      });
    }
    event.preventDefault();
  });

  $(".pointer-img").click(function(event) {
    $(".new-tweet").slideToggle("fast");
    $("textarea").focus();
  });
});
