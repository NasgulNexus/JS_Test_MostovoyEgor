import classes from "../styles/UsersTable.module.css";

const UsersTable = ({ users }) => {
  if (!users) {
    return null;
  }
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr>
          <th className={classes.th}>Полное имя </th>
          <th className={classes.th}>Индустрия компании</th>
          <th className={classes.th}>Электронная почта </th>
          <th className={classes.th}>Группа</th>
          <th className={classes.th}>Номер телефона</th>
        </tr>
      </thead>
      <tbody className={classes.tbody}>
        {users.map(user => (
          <tr key={user.id}>
            <td className={classes.td}>{user.name}</td>
            <td className={classes.td}>{user.id}</td>
            <td className={classes.td}>{user.email}</td>
            <td className={classes.td}>{user.group}</td>
            <td className={classes.td}>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
