import { RouterProvider } from "react-router-dom";
import { router } from "Routes/Routes";
import {
  StatesProvider,
  APIProvider,
  UserProvider,
  ReaderProvider,
} from "Contexts";

import "./App.css";

function App() {
  return (
    <>
      <StatesProvider>
        <APIProvider>
          <UserProvider>
            <ReaderProvider>
              <RouterProvider router={router} />
            </ReaderProvider>
          </UserProvider>
        </APIProvider>
      </StatesProvider>
    </>
  );
}

export default App;
