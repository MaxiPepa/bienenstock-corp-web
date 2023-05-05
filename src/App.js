import "./App.css";
import { RouterProvider } from "react-router-dom";
import { StatesProvider } from "./Contexts/StatesContext";
import { UserProvider } from "./Contexts/UserContext";
import { router } from "./Assets/Routes";

function App() {
  return (
    <>
      <UserProvider>
        <StatesProvider>
          <RouterProvider router={router} />
        </StatesProvider>
      </UserProvider>
    </>
  );
}

export default App;
