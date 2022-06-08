import { useState } from "react";
import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";
import useSortData from "../components/useSortData";
import clsx from "clsx";
import useSearchData from "../components/useSearchData";
import ButtonSort from "../components/ButtonSort.jsx";
import settingSortButtons from "../components/settingSortButtons";

const Users = ({ users }) => {
  const [displayType, setDisplayType] = useState("table");

  const {
    data,
    requestSortAscending,
    requestSortDescending,
    requestSortDefault,
    sortConfig
  } = useSortData(users);

  const { requestSearchData, itemsUsers } = useSearchData(data);

  const handleSelectChange = event => {
    setDisplayType(event.target.value);
  };

  return (
    <MainLayout>
      <div>
        <div className={classes.control}>
          <div>
            <p>Варианты отображения данных:</p>
            <select
              value={displayType}
              onChange={handleSelectChange}
              className={classes.select}
            >
              <option value="table">Таблица</option>
              <option value="card">Карточки пользователей</option>
              <option value="group">Группы пользователей</option>
            </select>
          </div>
          <div className={classes.sort}>
            <p>Варианты сортировки данных:</p>
            <div>
              <button
                onClick={() => requestSortDefault("default")}
                className={clsx(classes.sortButton, {
                  [classes.sortButtonSelect]:
                    sortConfig.field === "default" &&
                    sortConfig.direction === "default"
                })}
              >
                По умолчанию
              </button>
            </div>
            <div>
              {settingSortButtons.map(settingSortButton => (
                <ButtonSort
                  key={settingSortButton.field}
                  field={settingSortButton.field}
                  title={settingSortButton.title}
                  sortConfig={sortConfig}
                  requestSortAscending={requestSortAscending}
                  requestSortDescending={requestSortDescending}
                />
              ))}
            </div>
          </div>
          <div>
            <p>Поиск: {itemsUsers.length}</p>
            <input
              type="text"
              onChange={event => requestSearchData(event.target.value)}
              className={classes.input}
            />
          </div>
        </div>
        <div className={classes.data}>
          {displayType === "table" ? <UsersTable users={itemsUsers} /> : null}
          {displayType === "card" ? <UsersCard users={itemsUsers} /> : null}
          {displayType === "group" ? <UsersGroup users={itemsUsers} /> : null}
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.API_HOST}/users`);
    const users = await res.json();
    if (!users) {
      return {
        notFound: true
      };
    }
    return { props: { users } };
  } catch {
    return {
      props: { socials: null }
    };
  }
};

export default Users;
