import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? `Hello, ${user?.name}!` : "Hello!"}</div>;
};

export default HomePage;
