/* global chrome */

import React from 'react'
import { createRoot } from 'react-dom/client'

import Popup from './Popup'

// If user is on tweet permalink page, send them to archive page and
// close the popup
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentTab = tabs[0] // there will be only one in this array
  const url = currentTab.url.match(/https:\/\/twitter.com\/(\w){1,15}\/status\/(\d)*/)[0]
  if (url) {
    chrome.runtime.sendMessage({ url })
    window.close()
  }
})

const root = createRoot(window.document.getElementById('app-container'))
root.render(<Popup />)
