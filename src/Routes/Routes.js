import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { ROLES } from "Assets/Constants";

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

import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute roles={ROLES.ALL} />}>
        <Route path="/dashboard" element={<Main render={<Dashboard />} />} />
        <Route path="/products" element={<Main render={<Products />} />} />
        <Route path="/settings" element={<Main render={<Settings />} />} />
      </Route>

      <Route element={<PrivateRoute roles={[ROLES.ADMIN]} />}>
        <Route path="/admin-menu" element={<Main render={<AdminMenu />} />} />
      </Route>

      <Route element={<PrivateRoute roles={[ROLES.SELLER, ROLES.ADMIN]} />}>
        <Route path="/sales-area" element={<Main render={<SalesArea />} />} />
      </Route>

      <Route element={<PrivateRoute roles={[ROLES.BUYER, ROLES.ADMIN]} />}>
        <Route
          path="/purchases-area"
          element={<Main render={<PurchasesArea />} />}
        />
      </Route>

      <Route element={<PrivateRoute roles={[ROLES.DEPOSITOR, ROLES.ADMIN]} />}>
        <Route
          path="/storage-area"
          element={<Main render={<StorageArea />} />}
        />
      </Route>

      <Route element={<PrivateRoute roles={[ROLES.ANALYST, ROLES.ADMIN]} />}>
        <Route
          path="/reports-area"
          element={<Main render={<ReportsArea />} />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
