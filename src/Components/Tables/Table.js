import { useState } from "react";

import Filter from "./Filter/Filter";

import "./Table.css";

const Table = ({ content, thead, mapKeys, entity, tableId }) => {
  const [filteredContent, setFilteredContent] = useState([]);
  const [filterText, setFilterText] = useState("");

  const items =
    filteredContent.length > 0
      ? filteredContent
      : filterText !== ""
      ? filteredContent
      : content;

  return (
    <div className="table">
      <Filter
        content={content}
        thead={thead}
        mapKeys={mapKeys}
        setFilteredContent={setFilteredContent}
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <div className="table-container" id={tableId ? tableId : null}>
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
            {items.length > 0 ? (
              items.map((attr, index) => {
                return (
                  <tr key={index}>
                    {mapKeys.map((key) => (
                      <td key={index + key} data-column={typeof attr[key]}>
                        {attr[key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={thead.length}>
                  <h3 className="no-table-message">No {entity} to show</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

Table.defaultProps = {
  content: [],
  thead: [],
  mapKeys: [],
  entity: "data",
};
