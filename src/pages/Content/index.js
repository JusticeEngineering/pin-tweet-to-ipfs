const observer = new MutationObserver(onMutation);
observer.observe(document, {
  childList: true,
  subtree: true,
});

function onMutation(mutations) {
  const currentUrl = window.location.href;
  const isTweetPage = currentUrl.includes("status");

  const getTweetUrl = (e) => {
    let tweetUrl;

    if (isTweetPage) {
      tweetUrl = currentUrl;
    } else {
      const selectedTweet = e.target.closest("article");
      tweetUrl = selectedTweet.querySelector(
        '[data-testid="User-Names"] [role="link"][dir="auto"]'
      )?.href;
    }

    chrome.runtime.sendMessage({ url: tweetUrl });
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
            isTweetPage
              ? "css-1dbjc4n r-1oszu61 r-j5o65s r-rull8r r-qklmqi r-1dgieki r-1efd50x r-5kkj8d r-1ta3fxp r-18u37iz r-h3s6tt r-a2tzq0 r-3qxfft r-s1qlax"
              : "css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws"
          )
        );
      }
    }
  }

  found.forEach((n) => {
    n.append(pinTweetButton);
  });
}
