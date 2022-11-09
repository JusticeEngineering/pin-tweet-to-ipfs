# Pin Tweets to IPFS
![pin tweet to ipfs logo](./src/icon-128.png)

[![GitHub Super-Linter](https://github.com/meandavejustice/pin-tweet-to-ipfs/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)


## Availability

<a href="https://chrome.google.com/webstore/detail/pin-tweet-to-ipfs/bkbejdaeamaehgpodkjdbkhkofpijagn"><img src="https://user-images.githubusercontent.com/1844554/200466572-07459a2b-f299-4eaf-9d6f-e8e6aa87afe4.png" alt="Get Pin Tweet to IPFS for Chromium"></a>

[Firefox support coming soon](https://github.com/meandavejustice/pin-tweet-to-ipfs/issues/6)

## Features

Pin Tweet to IPFS is a [web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) targetting less-technical users who wish to archive Tweets in a verifiable way. It uses [IPFS](https://ipfs.tech/), [WebRecorder](https://webrecorder.net/), and [web3.storage](https://web3.storage/) to achieve this.


## Installing and Running

1. Check if your [Node.js](https://nodejs.org/) version is >= **19**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm run build`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

## Resources

- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

## Credits

Made with :heart: by [Justice Engineering](https://justice.engineering) & [Trigram](https://www.trigram.co/)
