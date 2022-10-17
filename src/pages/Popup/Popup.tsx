import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup: React.FC = () => {
  const [web3storageKey, setWeb3storageKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    chrome.storage.local.set({ web3storageKey });
  };

  useEffect(() => {
    chrome.storage.local.get(["web3storageKey"], function (result) {
      setSavedKey(result.web3storageKey);
    });
  }, []);

  return (
    <div className="App">
      {savedKey ? (
        <p>Your current API key is: {savedKey}</p>
      ) : (
        <p>You do not have a key in storage</p>
      )}
      <p>Enter your web3.storage key</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={web3storageKey}
          onChange={(e) => setWeb3storageKey(e.target.value)}
        />
        <button>Save Key</button>
      </form>
    </div>
  );
};

export default Popup;
