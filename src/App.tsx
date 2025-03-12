import { Outlet } from "react-router";
import { UserProvider } from "./context/userContext"; // ✅ Import UserProvider

const App = () => {
  return (
    <UserProvider>  {/* ✅ Wrap the app with UserProvider */}
      <Outlet />
    </UserProvider>
  );
};

export default App;
