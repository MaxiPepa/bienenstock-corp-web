import { RouterProvider } from "react-router-dom";
import { StatesProvider } from "./Contexts/StatesContext";
import { UserProvider } from "./Contexts/UserContext";
import { APIProvider } from "./Contexts/APIContext";
import { router } from "./Assets/Routes";

import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <StatesProvider>
          <APIProvider>
            <RouterProvider router={router} />
          </APIProvider>
        </StatesProvider>
      </UserProvider>
    </>
  );
}

export default App;
