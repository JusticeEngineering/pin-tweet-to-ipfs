/* global chrome */

function archiveTweet (url) {
  chrome.tabs.create(
    {
      url: `https://webrecorder.github.io/save-tweet-now/#url=${url}&autoupload=1`
    },
    (createdTab) => {
      chrome.scripting.executeScript({
        target: { tabId: createdTab.id },
        func: async () => {
          async function waitForElement (selector) {
            return new Promise((resolve) => {
              const elInterval = setInterval(() => {
                const elem = document.querySelector(selector)
                if (elem) {
                  clearInterval(elInterval)
                  resolve(elem)
                }
              }, 100)
            })
          }
          const w3sLinkEl = await waitForElement('.panel a')
          const gatewayUrl = w3sLinkEl.href
          const size = 12345678 // TODO: PLACEHOLDER< NEED TO REPLACE THIS

          const cidRegexp =
            /Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}/

          const cid = gatewayUrl.match(cidRegexp)[0]
          const listing = {}
          const created = new Date().toISOString()
          listing[cid] = {
            title: `Archived Tweet ${created}`,
            created,
            size,
            cid
          }
          chrome.storage.sync.set(listing, () => {
            console.log('[pin-tweet-to-ipfs] Tweet saved in extension storage, ', listing)
          })
        }
      })
    }
  )
}

function init () {
  // setup contextMenu handling
  chrome.contextMenus.create({
    title: 'Pin Tweet to IPFS',
    contexts: ['link'],
    id: `pin-tweet-to-ipfs-${new Date().toISOString()}`, // unique id to avoid errors
    targetUrlPatterns: ['https://twitter.com/*/status/*']
  })

  chrome.contextMenus.onClicked.addListener((info) => archiveTweet(info.linkUrl))

  // add global listener
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.url) archiveTweet(msg.url)
  })
}

try {
  init()
} catch (err) {
  console.error('[pin-tweet-to-ipfs] Failed to init in background.js', err)
}
