import { RouterProvider } from "react-router-dom";
import { router } from "Layout/Routes";
import { StatesProvider, APIProvider, UserProvider } from "Contexts";

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
