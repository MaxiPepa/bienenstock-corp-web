import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products/Products";
import PurchasesArea from "../Pages/PurchasesArea/PurchasesArea";
import SalesArea from "../Pages/SalesArea/SalesArea";
import StorageArea from "../Pages/StorageArea/StorageArea";
import ReportsArea from "../Pages/ReportsArea/ReportsArea";
import Settings from "../Pages/Settings/Settings";
import Main from "../Components/Main/Main";
import AdminMenu from "../Pages/AdminMenu/AdminMenu";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Main render={<Dashboard />} />} />
      <Route
        path="/dashboard/products"
        element={<Main render={<Products />} />}
      />
      <Route
        path="/dashboard/purchases-area"
        element={<Main render={<PurchasesArea />} />}
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
      <Route path="/admin-menu" element={<Main render={<AdminMenu />} />} />
      <Route path="/settings" element={<Main render={<Settings />} />} />
    </Route>
  )
);
