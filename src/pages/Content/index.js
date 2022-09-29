const observer = new MutationObserver(onMutation);
observer.observe(document, {
  childList: true,
  subtree: true,
});

function onMutation(mutations) {
  const getTweetUrl = (e) => {
    const selectedTweet = e.target.closest("article");
    const tweetUrl = selectedTweet.querySelector(
      '[data-testid="User-Names"] [role="link"][dir="auto"]'
    )?.href;

    console.log("tweetUrl: ", tweetUrl);
  };

  const pinTweetButton = document.createElement("button");
  pinTweetButton.innerHTML = "PinTweetIPFS";
  pinTweetButton.addEventListener("click", (e) => getTweetUrl(e));

  const found = [];
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (!node.tagName) continue; // not an element

      if (node.firstElementChild) {
        found.push(
          ...node.getElementsByClassName(
            "css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws"
          )
        );
      }
    }
  }

  found.forEach((n) => {
    n.style.background = "#808080";
    n.append(pinTweetButton);
  });
}
