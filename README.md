<!-- markdownlint-disable MD041 -->
<p align="center">
    <img alt="pin tweet to ipfs" src="./src/logo.svg" width="250"/>
</p>
<h1 align="center">
    Pin Tweet to IPFS
</h1>
<p align="center">
<a href="https://github.com/marketplace/actions/super-linter">
<img alt="GitHub Super-Linter" src="https://github.com/meandavejustice/pin-tweet-to-ipfs/workflows/Lint%20Code%20Base/badge.svg"/>
</a>
</p>

## Availability

<a href="https://chrome.google.com/webstore/detail/pin-tweet-to-ipfs/bkbejdaeamaehgpodkjdbkhkofpijagn"><img src="https://user-images.githubusercontent.com/1844554/203426246-e65a07bf-718e-4398-94be-9406528d2559.png" alt="Get Pin Tweet to IPFS for Chromium"></a>
<a href="ms-windows-store://pdp/?ProductId=0RDCKDH8ZD6B&mode=mini">
   <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Download Pin twee to IPFS" width="250"/>
</a>

[Firefox support coming soon...](https://github.com/meandavejustice/pin-tweet-to-ipfs/issues/6)

## Features

Pin Tweet to IPFS is a [web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) targetting less-technical users who wish to archive Tweets in a verifiable way. It uses [IPFS](https://ipfs.tech/), [WebRecorder](https://webrecorder.net/), and [web3.storage](https://web3.storage/) to achieve this.

## How does it work?

We are using tools from the [WebRecorder](https://webrecorder.net/) team to create
verifiable [WebArChiveZip](https://specs.webrecorder.net/wacz/1.1.1/) files of
tweets. We then assist the user in uploading these "WACZ" files to the IPFS network
via [web3.storage](https://web3.storage). Here users can store all of their archived
tweets in one place, and easily access them via their own IPFS node or other pinning
services.

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
