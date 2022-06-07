import classes from "../styles/UsersCard.module.css";
import classesWrapper from "../styles/wrapper.module.css";

const UsersCard = ({ users }) => {
  if (!users) {
    return null;
  }

  return (
    <div className={classesWrapper.wrapper}>
      {users.map(user => (
        <div key={user.id} className={classes.item}>
          <p>{user.name}</p>
          <p>{user.group}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.id}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersCard;
