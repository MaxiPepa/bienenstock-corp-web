import React from "react";

import "./Table.css";

const Table = ({ content, thead }) => {
  return (
    <>
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
                {Object.keys(attr).map((item, key) => {
                  console.log(attr[item]);
                  return (
                    <td key={index + key} data-column={typeof attr[item]}>
                      <p>{attr[item]}</p>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
