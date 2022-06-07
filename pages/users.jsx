import { useState } from "react";
import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";

const Users = ({ users }) => {
  const [displayType, setDisplayType] = useState("table");

  return (
    <MainLayout>
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <select name="select">
            <option value="table">Таблиц</option>
            <option value="value2" selected>
              Значение 2
            </option>
            <option value="value3">Значение 3</option>
          </select>
        </div>
        <div>
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
