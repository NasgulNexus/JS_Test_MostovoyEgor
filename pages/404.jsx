import Link from "next/link";
import MainLayout from "../components/MainLayout";
import classes from "../styles/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <MainLayout>
      <div className={classes.errorDiv}>
        <h2 className={classes.errorHead}>Error 404</h2>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
