import React from "react";

import "./Table.css";

const Table = ({ content, thead, mapKeys, entity, idTable }) => {
  return (
    <div className="table-container" id={idTable ? idTable : null}>
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
          {content.length > 0 ? (
            content.map((attr, index) => {
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
  );
};

export default Table;

Table.defaultProps = {
  content: [],
  thead: [],
  mapKeys: [],
  entity: "data",
};
