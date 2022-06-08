import { useMemo, useState } from "react";

const useSearchData = data => {
  const [searchConfig, setSearchConfig] = useState("");

  const requestSearchData = search => {
    setSearchConfig(search);
  };

  const searchMemo = useMemo(() => {
    const searchItems = [...data];
    if (!searchConfig) {
      return searchItems;
    }
    return searchItems.filter(user =>
      user.name.toLowerCase().includes(searchConfig.toLowerCase())
    );
  }, [data, searchConfig]);

  return {
    requestSearchData,
    itemsUsers: searchMemo
  };
};

export default useSearchData;
