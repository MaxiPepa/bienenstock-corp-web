import { RouterProvider } from "react-router-dom";
import { StatesProvider } from "./Contexts/StatesContext";
import { UserProvider } from "./Contexts/UserContext";
import { APIProvider } from "./Contexts/APIContext";
import { router } from "./Assets/Routes";

import "./App.css";

function App() {
  return (
    <>
      <StatesProvider>
        <APIProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </APIProvider>
      </StatesProvider>
    </>
  );
}

export default App;
