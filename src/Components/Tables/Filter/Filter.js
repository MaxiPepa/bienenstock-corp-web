import { useState } from "react";

const Filter = ({
  content,
  thead,
  mapKeys,
  setFilteredContent,
  filterText,
  setFilterText,
}) => {
  const notMap = [
    "Details",
    "Cancel",
    "Invoice",
    "Modify user",
    "Delete user",
    "Active",
    null,
  ];

  const [selectedOption, setSelectedOption] = useState("all");

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
    filterContent(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFilteredContent(content);
    setFilterText("");
  };

  const filterContent = (filterOption) => {
    setFilteredContent(
      content.filter((item) => {
        if (selectedOption === "all") {
          return true;
        } else if (selectedOption.includes("status")) {
          switch (filterOption) {
            case "Pending":
              return item.pending;
            case "Cancelled":
              return item.cancelled;
            case "Completed":
              return item.completed;
            default:
              return true;
          }
        } else {
          const filterOptionLower = filterOption.toLowerCase();

          let value = item[selectedOption].toString();
          value = value.toLowerCase();

          if (value.startsWith("#") || value.startsWith("$")) {
            value = value.slice(1);
          }

          return value.includes(filterOptionLower)
            ? value.startsWith(filterOptionLower)
            : false;
        }
      })
    );
  };
  return (
    <>
      <div className="filter">
        <span>Filter:</span>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="all">All</option>
          {thead.map((key, index) => {
            if (!notMap.includes(key)) {
              return (
                <option value={mapKeys[index]} key={index}>
                  {key}
                </option>
              );
            }
            return null;
          })}
        </select>
        {selectedOption !== "all" &&
          (selectedOption.includes("status") ? (
            <select
              value={filterText}
              onChange={handleFilterTextChange}
              disabled={selectedOption === "all"}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={handleFilterTextChange}
              disabled={selectedOption === "all"}
            />
          ))}
      </div>
    </>
  );
};

export default Filter;
