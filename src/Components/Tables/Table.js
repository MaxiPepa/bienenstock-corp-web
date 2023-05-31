import React from "react";

import "./Table.css";

const Table = ({ content, thead, mapKeys }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {thead.map((attr, key) => {
              return (
                <th key={key} data-column={attr}>
                  {attr}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((attr, index) => {
            return (
              <tr key={index}>
                {mapKeys.map((key) => (
                  <td key={index + key} data-column={typeof attr[key]}>
                    <p>{attr[key]}</p>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
