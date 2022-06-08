import { useState, useMemo } from "react";

const useSortData = items => {
  const [sortConfig, setSortConfig] = useState({
    field: "default",
    direction: "default"
  });

  const byFieldDown = field => {
    return (a, b) => (a[field] > b[field] ? -1 : 1);
  };

  const byFieldUp = field => {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  };

  const requestSortDefault = field => {
    let direction = "default";
    setSortConfig({ field, direction });
  };

  const requestSortAscending = field => {
    let direction = "Ascending";
    setSortConfig({ field, direction });
  };

  const requestSortDescending = field => {
    let direction = "Descending";
    setSortConfig({ field, direction });
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.direction === "default") {
      return sortableItems;
    }
    if (sortConfig !== null) {
      if (sortConfig.direction === "Ascending") {
        sortableItems.sort(byFieldUp(sortConfig.field));
      } else {
        sortableItems.sort(byFieldDown(sortConfig.field));
      }
    }
    return sortableItems;
  }, [items, sortConfig]);

  return {
    data: sortedItems,
    requestSortAscending,
    requestSortDescending,
    requestSortDefault,
    sortConfig
  };
};

export default useSortData;
