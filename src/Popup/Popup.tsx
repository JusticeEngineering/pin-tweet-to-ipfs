import React, { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage";
import Card from "../components/Card/Card";

type PinsType = {
  peerId: string;
  peerName: string;
  region: string;
  status: string;
  updated: string;
};

type Web3StorageItemsType = {
  cid: string;
  created: string;
  dagSize: number;
  deals: any[];
  name: string;
  pins: PinsType[];
  type?: string;
  updated?: string;
  _id?: string;
};

const Popup: React.FC = () => {
  const [web3storageKey, setWeb3storageKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");
  const [storedItems, setStoredItems] = useState<Web3StorageItemsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    chrome.storage.local.set({ web3storageKey });
    setSavedKey(web3storageKey);
  };

  const handleRemoveKey = () => {
    chrome.storage.local.set({ web3storageKey: null });
    setSavedKey("");
    setWeb3storageKey("");
  };

  const handleWeb3Storage = async () => {
    setIsLoading(true);
    const client = new Web3Storage({ token: savedKey });
    const items = [];
    for await (const item of client.list({ maxResults: 10 })) {
      items.push(item);
    }
    setStoredItems(items);
    setIsLoading(false);
  };

  function formatKey(str: string) {
    if (str.length > 35) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  useEffect(() => {
    chrome.storage.local.get(["web3storageKey"], function (result) {
      setSavedKey(result.web3storageKey);
    });
  }, []);

  useEffect(() => {
    if (savedKey) handleWeb3Storage();
  }, [savedKey]);

  return (
    <div className="container">
      {savedKey ? (
        <div>
          <div className="header">
            <p>
              <b>Key:</b> {formatKey(savedKey)}
            </p>
            <button onClick={handleRemoveKey}>Remove Key</button>
          </div>
          <div>
            {isLoading ? (
              <div className="content">
                <div className="loader" />
              </div>
            ) : (
              <Card storedItems={storedItems} />
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Enter Your web3.storage Key</label>
          <input
            type="text"
            value={web3storageKey}
            onChange={(e) => setWeb3storageKey(e.target.value)}
          />
          <button>Save Key</button>
        </form>
      )}
    </div>
  );
};

export default Popup;
