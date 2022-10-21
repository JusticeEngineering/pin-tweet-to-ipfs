import React from "react";
import { format } from "date-fns";
import "./Card.css";

type CardProps = {
  storedItems: StorageType[];
};

type StorageType = {
  name: string;
  dagSize: number;
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
          <th>Name</th>
          <th>Size</th>
          <th>Date</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {storedItems?.map((v, i) => (
          <tr key={`${v.name}-${i}`}>
            <td>{v.name}</td>
            <td>{formatSize(v.dagSize)}MB</td>
            <td>{format(new Date(v.created), "MM/dd/yyyy")}</td>
            <td>
              <a href={`https://w3s.link/ipfs/${v.cid}`} target="_blank">
                View
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Card;
