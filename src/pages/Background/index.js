chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.url) {
    chrome.tabs.create(
      { url: `https://express.archiveweb.page/#https://oembed.link/${msg.url}` },
      (createdTab) => {
        chrome.scripting.executeScript({
          target: { tabId: createdTab.id },
          func: () => {
            function waitForElm(selector) {
              return new Promise((resolve) => {
                if (document.querySelector(selector)) {
                  return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver((mutations) => {
                  if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                  }
                });

                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
              });
            }

            waitForElm(
              "body > live-web-proxy > sl-form > div.flex.flex-wrap.mt-2 > sl-radio-group:nth-child(4)"
            ).then(() => {
              chrome.storage.local.get(["web3storageKey"], function (res) {
                if (res.web3storageKey) {
                  document
                    .querySelector(
                      "body > live-web-proxy > sl-form > div.flex.flex-wrap.mt-2 > sl-radio-group:nth-child(4) > details > summary"
                    )
                    .click();

                  document
                    .querySelector("#apikey")
                    .setAttribute("value", res.web3storageKey);

                  document
                    .querySelector(
                      "body > live-web-proxy > sl-form > div.flex.flex-wrap.mt-2 > sl-radio-group:nth-child(4) > div > sl-button"
                    )
                    .click();
                }
              });
            });
          },
        });
      }
    );
  }
});
