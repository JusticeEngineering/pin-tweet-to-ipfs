import React, { useState } from "react";
import Card from "../components/Card/Card";

const Popup: React.FC = () => {
  const [storedItems, setStoredItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitRun, setIsInitRun] = useState<boolean>(true);

  const populateStoredItems = async () => {
    setIsInitRun(false);
    setIsLoading(true);
    const result = await chrome.storage.sync.get(null);
    setStoredItems(Object.values(result));
    setIsLoading(false);
  };

  if (isInitRun) populateStoredItems();

  return (
    <div className="container">
      {
        <div>
          <div className="header">
            <h2>
              <b>Archived Tweets</b>
            </h2>
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
      }
    </div>
  );
};

export default Popup;
