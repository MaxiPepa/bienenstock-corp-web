import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { Main } from "./Components";
import pages from "../Assets/Pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<pages.Layout />}>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<pages.Login />} />
      <Route
        path="/dashboard"
        element={<Main render={<pages.Dashboard />} />}
      />
      <Route
        path="/dashboard/products"
        element={<Main render={<pages.Products />} />}
      />
      <Route
        path="/dashboard/purchases-area"
        element={<Main render={<pages.PurchasesArea />} />}
      />
      <Route
        path="/dashboard/sales-area"
        element={<Main render={<pages.SalesArea />} />}
      />
      <Route
        path="/dashboard/storage-area"
        element={<Main render={<pages.StorageArea />} />}
      />
      <Route
        path="/dashboard/reports-area"
        element={<Main render={<pages.ReportsArea />} />}
      />
      <Route
        path="/admin-menu"
        element={<Main render={<pages.AdminMenu />} />}
      />
      <Route path="/settings" element={<Main render={<pages.Settings />} />} />
    </Route>
  )
);
