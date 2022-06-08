import classes from "../styles/UsersGroup.module.css";
import classesWrapper from "../styles/wrapper.module.css";

const UsersGroup = ({ users }) => {
  if (!users) {
    return null;
  }
  const groupUsers = {};
  let group = "";
  let isId = false;
  users.map(user => {
    group = user.group;
    if (!groupUsers.hasOwnProperty(group)) {
      groupUsers[group] = [];
      groupUsers[group].push(user);
    } else {
      isId = false;
      groupUsers[group].map(grUser => {
        if (user.id === grUser.id) {
          return (isId = true);
        }
      });
      if (isId === false) {
        groupUsers[group].push(user);
      }
    }
  });
  return (
    <div className={classesWrapper.wrapper}>
      {Object.entries(groupUsers).map(([key, val]) => (
        <div key={key} className={classes.tile}>
          <p>{key}</p>
          {val.map(el => (
            <div key={el.id} className={classes.tile}>
              <p>{el.name}</p>
              <p>{el.email}</p>
              <p>{el.phone}</p>
              <p>{el.id}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UsersGroup;
