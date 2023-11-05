/* global chrome */

import React from 'react'
import { createRoot } from 'react-dom/client'

import Popup from './Popup'

// If user is on tweet permalink page, send them to archive page and
// close the popup
function main() {
  const root = createRoot(window.document.getElementById('app-container'))

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0] // there will be only one in this array
      const tweetUrlMatch = currentTab.url.match(/https:\/\/twitter.com\/(\w){1,15}\/status\/(\d)*/)
    if (tweetUrlMatch) {
      const url = tweetUrlMatch[0]
      root.render(<Popup />)
      chrome.runtime.sendMessage({ url })
      // window.close()
    } else root.render(<Popup />)
  })
}


try {
  main()
} catch (err) {
  // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/q18Zuz0tuUs
  console.error('[pin-tweet-to-ipfs] Failed to add runtime listener', err)
}