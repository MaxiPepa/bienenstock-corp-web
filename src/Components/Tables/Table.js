import React from "react";

import "./Table.css";

const Table = ({ content, thead }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {thead.map((attr, key) => {
              return <th key={key}>{attr}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((attr, index) => {
            return (
              <tr key={index}>
                {Object.keys(attr).map((item, key) => {
                  return (
                    <td key={index + key}>
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
