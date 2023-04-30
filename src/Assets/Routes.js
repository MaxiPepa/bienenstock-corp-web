import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products/Products";
import PurchansingArea from "../Pages/PurchansingArea/PurchansingArea";
import SalesArea from "../Pages/SalesArea/SalesArea";
import StorageArea from "../Pages/StorageArea/StorageArea";
import ReportsArea from "../Pages/ReportsArea/ReportsArea";
import Settings from "../Pages/Settings/Settings";
import Main from "../Components/Main/Main";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Main render={<Dashboard />} />} />
      <Route
        path="/dashboard/products"
        element={<Main render={<Products />} />}
      />
      <Route
        path="/dashboard/purchansing-area"
        element={<Main render={<PurchansingArea />} />}
      />
      <Route
        path="/dashboard/sales-area"
        element={<Main render={<SalesArea />} />}
      />
      <Route
        path="/dashboard/storage-area"
        element={<Main render={<StorageArea />} />}
      />
      <Route
        path="/dashboard/reports-area"
        element={<Main render={<ReportsArea />} />}
      />
      <Route path="/settings" element={<Main render={<Settings />} />} />
    </Route>
  )
);
