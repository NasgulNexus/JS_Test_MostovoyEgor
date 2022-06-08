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
        <i className="bi bi-arrow-up"></i>
      </button>
      <button
        onClick={() => requestSortDescending(field)}
        className={clsx(classes.sortButton, {
          [classes.sortButtonSelect]:
            sortConfig.field === field && sortConfig.direction === "Descending"
        })}
      >
        <i className="bi bi-arrow-down"></i>
      </button>
      <span>{title}</span>
    </div>
  );
};

export default ButtonSort;
