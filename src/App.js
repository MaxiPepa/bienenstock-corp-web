import RouterProvider from "Routes/Routes";
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
              <RouterProvider />
            </ReaderProvider>
          </UserProvider>
        </APIProvider>
      </StatesProvider>
    </>
  );
}

export default App;
