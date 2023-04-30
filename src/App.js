import "./App.css";
import { RouterProvider } from "react-router-dom";
import { StatesProvider } from "./Contexts/StatesContext";
import { router } from "./Assets/Routes";

function App() {
  return (
    <>
      <StatesProvider>
        <RouterProvider router={router} />
      </StatesProvider>
    </>
  );
}

export default App;
