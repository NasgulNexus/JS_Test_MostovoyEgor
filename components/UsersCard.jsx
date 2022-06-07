import classes from "../styles/UsersCard.module.css";

const UsersCard = ({ users }) => {
  if (!users) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      {users.map(user => (
        <div key={user.id} className={classes.item}>
          <p>{user.name}</p>
          <p>{user.group}</p>
          <p>{user.mobile}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersCard;
