import { useMemo, useState } from "react";

const useSearchData = data => {
  const [searchConfig, setSearchConfig] = useState({
    field: "all",
    search: ""
  });

  const requestSearchData = (search, field) => {
    setSearchConfig({ search: search, field: field });
  };

  const searchMemo = useMemo(() => {
    if (data === null) {
      return null;
    }
    const searchItems = [...data];
    if (searchConfig.search === "") {
      return searchItems;
    }
    if (searchConfig.field === "all") {
      return searchItems.filter(user => {
        if (
          user.name.toLowerCase().includes(searchConfig.search.toLowerCase()) ||
          user.id.toLowerCase().includes(searchConfig.search.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(searchConfig.search.toLowerCase()) ||
          user.phone
            .toLowerCase()
            .includes(searchConfig.search.toLowerCase()) ||
          user.group.toLowerCase().includes(searchConfig.search.toLowerCase())
        ) {
          return user;
        }
      });
    }
    return searchItems.filter(user =>
      user[searchConfig.field]
        .toLowerCase()
        .includes(searchConfig.search.toLowerCase())
    );
  }, [data, searchConfig]);

  return {
    requestSearchData,
    itemsUsers: searchMemo
  };
};

export default useSearchData;
