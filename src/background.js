chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.url) {
    chrome.tabs.create(
      { url: `https://express.archiveweb.page/#${msg.url}` },
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

            const oneMb = 1000000;

            const fileHasLoaded = async () => {
              const resp = await fetch(
                `/w/api/c/${document.querySelector("live-web-proxy").collId}`
              );
              const { size } = await resp.json();
              console.log("SIZE IS :", size);
              return size < oneMb;
            };
            const asyncInterval = async (callback, ms, triesLeft = 5) => {
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

            waitForElm(
              "body > live-web-proxy > sl-form > div.flex.flex-wrap.mt-2 > sl-radio-group:nth-child(4)"
            ).then(async () => {
              await asyncInterval(fileHasLoaded, 500);
              console.log("CHECKING API KEY NOW");
              chrome.storage.local.get(["web3storageKey"], function (res) {
                waitForSize();
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
