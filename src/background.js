chrome.runtime.onMessage.addListener((msg) => {
  if (msg.url) {
    chrome.tabs.create(
      {
        url: `https://express.archiveweb.page/#https://oembed.link/${msg.url}`,
      },
      (createdTab) => {
        chrome.scripting.executeScript({
          target: { tabId: createdTab.id },
          func: async () => {
            async function waitForElement(selector) {
              return new Promise((resolve) => {
                const elInterval = setInterval(() => {
                  const elem = document.querySelector(selector);
                  if (elem) {
                    clearInterval(elInterval);
                    resolve(elem);
                  }
                }, 100);
              });
            }

            async function fileHasLoaded() {
              const sizeElem = await waitForElement(
                "body > live-web-proxy sl-format-bytes"
              );
              const size = parseInt(sizeElem.getAttribute("value"), 10);
              if (!size) {
                return false;
              }
              return size > 1000000; // one mb
            }

            const asyncInterval = async (callback, ms, triesLeft = 25) => {
              return new Promise((resolve, reject) => {
                const interval = setInterval(async () => {
                  if (await callback()) {
                    resolve();
                    clearInterval(interval);
                  } else if (triesLeft <= 1) {
                    reject();
                    clearInterval(interval);
                  }
                  triesLeft--;
                }, ms);
              });
            };

            await asyncInterval(fileHasLoaded, 500);
            chrome.storage.local.get(["web3storageKey"], function (res) {
              if (res.web3storageKey) {
                const summaryEl = document.querySelector(
                  `body > live-web-proxy > sl-form > div.flex.flex-wrap.mt-2 > sl-radio-group:nth-child(4) > details > summary`
                );
                summaryEl.click();

                const inputEl = document.getElementById("apikey");
                inputEl.setAttribute("value", res.web3storageKey);
              }
            });
          },
        });
      }
    );
  }
});
