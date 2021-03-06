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
  const [searchField, setSearchField] = useState("all");

  const {
    data,
    requestSortAscending,
    requestSortDescending,
    requestSortDefault,
    sortConfig
  } = useSortData(users);

  const { requestSearchData, itemsUsers } = useSearchData(data);

  const handleSelectSeacrhChange = event => {
    setSearchField(event.target.value);
  };

  const handleSelectChange = event => {
    setDisplayType(event.target.value);
  };

  if (users === null || users.length <= 1) {
    return (
      <MainLayout>
        <div>Нет данных пользователей</div>
      </MainLayout>
    );
  }

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
            <p>Поиск: Найдено пользователей {itemsUsers.length}</p>
            <div>
              <p>Варианты поиска:</p>
              <select
                value={searchField}
                onChange={handleSelectSeacrhChange}
                className={classes.select}
              >
                <option value="all">По всем полям</option>
                <option value="name">Полному имени</option>
                <option value="id">ID</option>
                <option value="email">Почте</option>
                <option value="group">Группе</option>
                <option value="phone">Телефону</option>
              </select>
            </div>
            <input
              type="text"
              onChange={event =>
                requestSearchData(event.target.value, searchField)
              }
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
        props: { users: null }
      };
    }
    return { props: { users } };
  } catch {
    return {
      props: { users: null }
    };
  }
};

export default Users;
