import { RouterProvider } from "react-router-dom";
import { StatesProvider } from "./Contexts/StatesContext";
import { UserProvider } from "./Contexts/UserContext";
import { APIProvider } from "./Contexts/APIContext";
import { router } from "./Assets/Routes";

import "./App.css";

function App() {
  return (
    <>
      <APIProvider>
        <UserProvider>
          <StatesProvider>
            <RouterProvider router={router} />
          </StatesProvider>
        </UserProvider>
      </APIProvider>
    </>
  );
}

export default App;
