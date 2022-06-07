import Head from "next/head";
import Link from "next/link";
import classes from "../styles/MainLayout.module.css";

const MainLayout = ({ children, title = "Next App" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="NEXT, JS, react" />
        <meta name="description" content="test" />
      </Head>
      <nav className={classes.nav}>
        <Link href="/">
          <a className={classes.nav_a}>Home</a>
        </Link>
        <Link href="/users">
          <a className={classes.nav_a}>Users</a>
        </Link>
      </nav>
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default MainLayout;
