import { useMemo, useState } from "react";
import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";

const Users = ({ users }) => {
  const [displayType, setDisplayType] = useState("table");
  const [sortedType, setSortedType] = useState("default");
  const [usersSorted, setUsersSorted] = useState(users);

  const handleSelectChange = event => {
    setDisplayType(event.target.value);
  };

  /* useMemo(() => {
    if (sortedType === "default") {
      return setUsersSorted(users);
    }
    const array = sortedType.split("_");
    let field = array[0];
    let type = array[1];
    const sortedUsersArray = [...users];
    sortedUsersArray.sort((a, b) => {
      if (type === "ascending") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] > b[field] ? -1 : 1;
    });
  }); */

  return (
    <MainLayout>
      <div>
        <div className={classes.search}>
          <div>
            <p>Варианты отображения данных:</p>
            <select
              value={displayType}
              onChange={e => handleSelectChange(e)}
              className={classes.select}
            >
              <option value="table">Таблица</option>
              <option value="card">Карточки пользователей</option>
              <option value="group">Группы пользователей</option>
            </select>
          </div>
          <div>
            <p>Варианты сортировки данных:</p>
            <button>По умолчанию</button>
            <div>
              <button>
                <i className="bi bi-arrow-up"></i>
              </button>
              <button>
                <i className="bi bi-arrow-down"></i>
              </button>
              <p>Полное имя</p>
            </div>
          </div>
        </div>
        <div className={classes.data}>
          {displayType === "table" ? <UsersTable users={usersSorted} /> : null}
          {displayType === "card" ? <UsersCard users={usersSorted} /> : null}
          {displayType === "group" ? <UsersGroup users={usersSorted} /> : null}
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
