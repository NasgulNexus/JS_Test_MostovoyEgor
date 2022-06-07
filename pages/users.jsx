import MainLayout from "../components/MainLayout.jsx";

const Users = ({ users }) => {
  return (
    <MainLayout>
      <pre>{JSON.stringify(users, null, 2)}</pre>
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
