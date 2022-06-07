import { useState } from "react";
import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";

const Users = ({ users }) => {
  const [displayType, setDisplayType] = useState("table");

  const handleSelectChange = event => {
    setDisplayType(event.target.value);
  };

  return (
    <MainLayout>
      <div>
        <div className={classes.search}>
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
        <div className={classes.data}>
          {displayType === "table" ? <UsersTable users={users} /> : null}
          {displayType === "card" ? <UsersCard users={users} /> : null}
          {displayType === "group" ? <UsersGroup users={users} /> : null}
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
