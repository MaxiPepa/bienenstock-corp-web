import { RouterProvider } from "react-router-dom";
import { router } from "./Assets/Routes";
import contexts from "./Assets/Contexts";

import "./App.css";

function App() {
  return (
    <>
      <contexts.StatesProvider>
        <contexts.APIProvider>
          <contexts.UserProvider>
            <RouterProvider router={router} />
          </contexts.UserProvider>
        </contexts.APIProvider>
      </contexts.StatesProvider>
    </>
  );
}

export default App;
