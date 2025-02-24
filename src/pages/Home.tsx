import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user?.name || "User"}!</p>
          {!user?.emailVerified && (
            <p className="text-red-500">
              Por favor, verifica tu correo electrónico.
            </p>
          )}
        </div>
      ) : (
        <p>Hello!</p>
      )}
    </div>
  );
};

export default HomePage;
