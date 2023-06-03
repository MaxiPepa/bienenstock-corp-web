import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { Main } from "Components";
import {
  AdminMenu,
  Dashboard,
  Layout,
  Login,
  Products,
  PurchasesArea,
  ReportsArea,
  SalesArea,
  Settings,
  StorageArea,
  NotFound,
} from "Pages";

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
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
