import { RouterProvider } from "react-router-dom";
import { router } from "./Assets/Routes";
import { StatesProvider, APIProvider, UserProvider } from "./Assets/Contexts";

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
