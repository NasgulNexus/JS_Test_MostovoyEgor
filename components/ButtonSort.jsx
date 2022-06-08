import clsx from "clsx";
import classes from "../styles/Users.module.css";

const ButtonSort = ({
  field,
  title,
  sortConfig,
  requestSortAscending,
  requestSortDescending
}) => {
  return (
    <div>
      <button
        onClick={() => requestSortAscending(field)}
        className={clsx(classes.sortButton, {
          [classes.sortButtonSelect]:
            sortConfig.field === field && sortConfig.direction === "Ascending"
        })}
      >
        <i
          className={clsx("bi bi-arrow-up", {
            [classes.icon]:
              sortConfig.field === field && sortConfig.direction === "Ascending"
          })}
        ></i>
      </button>
      <button
        onClick={() => requestSortDescending(field)}
        className={clsx(classes.sortButton, {
          [classes.sortButtonSelect]:
            sortConfig.field === field && sortConfig.direction === "Descending"
        })}
      >
        <i
          className={clsx("bi bi-arrow-down", {
            [classes.icon]:
              sortConfig.field === field &&
              sortConfig.direction === "Descending"
          })}
        ></i>
      </button>
      <span>{title}</span>
    </div>
  );
};

export default ButtonSort;
