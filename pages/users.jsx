import MainLayout from "../components/MainLayout.jsx";
import UsersCard from "../components/UsersCard.jsx";
import UsersGroup from "../components/UsersGroup.jsx";
import UsersTable from "../components/UsersTable.jsx";
import classes from "../styles/Users.module.css";

const Users = ({ users }) => {
  return (
    <MainLayout>
      <div className={classes.wrapper}>
        <div className={classes.search}>Тут вид отображения и будет поиск</div>
        <div>
          <UsersGroup users={users} />
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
