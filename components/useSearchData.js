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
    return searchItems.filter(user => {
      if (
        user.name.toLowerCase().includes(searchConfig.toLowerCase()) ||
        user.id.toLowerCase().includes(searchConfig.toLowerCase()) ||
        user.email.toLowerCase().includes(searchConfig.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchConfig.toLowerCase()) ||
        user.group.toLowerCase().includes(searchConfig.toLowerCase())
      ) {
        return user;
      }
    });
  }, [data, searchConfig]);

  return {
    requestSearchData,
    itemsUsers: searchMemo
  };
};

export default useSearchData;
