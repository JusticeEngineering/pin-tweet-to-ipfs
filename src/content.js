/* global chrome, MutationObserver */
const observer = new MutationObserver(onMutation)
observer.observe(document, {
  childList: true,
  subtree: true
})

function onMutation (mutations) {
  const currentUrl = window.location.href
  const isTweetPage = currentUrl.includes('status')

  const getTweetUrl = (e) => {
    let tweetUrl

    if (isTweetPage) {
      tweetUrl = currentUrl
    } else {
      const selectedTweet = e.target.closest('article')
      tweetUrl = selectedTweet.querySelector(
        '[data-testid="User-Names"] [role="link"][dir="auto"]'
      )?.href
    }

    chrome.runtime.sendMessage({ url: tweetUrl })
  }

  const createButton = () => {
    const pinTweetButton = document.createElement('button')
    pinTweetButton.innerHTML = 'PinTweetIPFS'
    pinTweetButton.style.backgroundColor = '#1d9cf0'
    pinTweetButton.style.color = '#fff'
    pinTweetButton.style.border = 'none'
    pinTweetButton.style.borderRadius = '4px'
    pinTweetButton.style.margin = '5px'
    pinTweetButton.style.letterSpacing = '0.5px'
    pinTweetButton.style.padding = '5px 10px'
    pinTweetButton.style.cursor = 'pointer'
    pinTweetButton.addEventListener('click', (e) => getTweetUrl(e))
    return pinTweetButton
  }

  const found = []
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (!node.tagName) continue // not an element

      if (isTweetPage) {
        [].slice
          .apply(node.querySelectorAll("[role='group']"))
          .filter(
            (node) =>
              !node.hasAttribute('aria-label') &&
              node.id &&
              !found.includes(node)
          )
          .forEach((node) => found.push(node))
      } else {
        [].slice
          .apply(node.querySelectorAll('[aria-label]'))
          .filter(
            (node) =>
              node.ariaLabel.includes('eplies') &&
              node.id &&
              !found.includes(node)
          )
          .forEach((node) => found.push(node))
      }
    }
  }

  found.forEach((n) => {
    n.appendChild(createButton())
  })
}
