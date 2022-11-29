import React from "react";
import copyTextToClipboard from "../../copy-text-to-clipboard";

type CardProps = {
  storedItems: StorageType[];
};

export type StorageType = {
  title: string;
  size: number;
  created: string;
  cid: string;
};

const Card: React.FC<CardProps> = ({ storedItems }) => {
  const formatSize = (sizeInBytes: number) =>
    (sizeInBytes / (1024 * 1024)).toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Size</th>
          <th>Date</th>
          <th>Share</th>
        </tr>
      </thead>
      <tbody>
        {storedItems?.map((v, i) => (
          <tr key={`${v.title}-${i}`}>
            <td>{v.title}</td>
            <td>{formatSize(v.size)}MB</td>
            <td title={new Date(v.created).toString()}>
              {new Date(v.created).toString()}
            </td>
            <td>
              <a
                href={`https://w3s.link/ipfs/${v.cid}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
              <a
                className="button"
                onClick={() => {
                  copyTextToClipboard(`https://w3s.link/ipfs/${v.cid}`);
                }}
              >
                Copy
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Card;
