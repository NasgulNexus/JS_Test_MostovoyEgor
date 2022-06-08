import { useState, useTransition } from "react";
import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";
import useSortData from "../components/useSortData";
import clsx from "clsx";
import useSearchData from "../components/useSearchData";

const Users = ({ users }) => {
  const [displayType, setDisplayType] = useState("table");
  const [search, setSearh] = useState("");
  const [, startTransition] = useTransition();

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

  /*   const changeHandlerSearch = event => {
    startTransition(() => {
      setSearh(event.target.value);
    });
  }; */

  console.log(itemsUsers);

  return (
    <MainLayout>
      <div>
        <div className={classes.search}>
          <div>
            <p>Поиск</p>
            <input
              type="text"
              onChange={event => requestSearchData(event.target.value)}
            />
          </div>
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
            <div>
              <div>
                <button
                  onClick={() => requestSortAscending("name")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "name" &&
                      sortConfig.direction === "Ascending"
                  })}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  onClick={() => requestSortDescending("name")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "name" &&
                      sortConfig.direction === "Descending"
                  })}
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <span>Полное имя</span>
              </div>
              <div>
                <button
                  onClick={() => requestSortAscending("id")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "id" &&
                      sortConfig.direction === "Ascending"
                  })}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  onClick={() => requestSortDescending("id")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "id" &&
                      sortConfig.direction === "Descending"
                  })}
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <span>ID</span>
              </div>
              <div>
                <button
                  onClick={() => requestSortAscending("email")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "email" &&
                      sortConfig.direction === "Ascending"
                  })}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  onClick={() => requestSortDescending("email")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "email" &&
                      sortConfig.direction === "Descending"
                  })}
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <span>Электронная почта</span>
              </div>
              <div>
                <button
                  onClick={() => requestSortAscending("group")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "group" &&
                      sortConfig.direction === "Ascending"
                  })}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  onClick={() => requestSortDescending("group")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "group" &&
                      sortConfig.direction === "Descending"
                  })}
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <span>Группа</span>
              </div>
              <div>
                <button
                  onClick={() => requestSortAscending("phone")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "phone" &&
                      sortConfig.direction === "Ascending"
                  })}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
                <button
                  onClick={() => requestSortDescending("phone")}
                  className={clsx(classes.sortButton, {
                    [classes.sortButtonSelect]:
                      sortConfig.field === "phone" &&
                      sortConfig.direction === "Descending"
                  })}
                >
                  <i className="bi bi-arrow-down"></i>
                </button>
                <span>Номер телефона</span>
              </div>
            </div>
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
