import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Packages } from "./pages/Packages";
import { PackageDetail } from "./pages/PackageDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Founder } from "./pages/Founder";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminPackageForm } from "./pages/AdminPackageForm";
import { PackageProvider } from "./contexts/PackageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Outlet } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PackageProvider>
        <Layout />
      </PackageProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "packages", element: <Packages /> },
      { path: "packages/:id", element: <PackageDetail /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "founder", element: <Founder /> },

      // ✅ ADMIN ROUTES
     {
  path: "admin",
  element: (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "package/new", element: <AdminPackageForm /> },
    { path: "package/edit/:id", element: <AdminPackageForm /> },
  ],
},
{ path: "admin/login", element: <AdminLogin /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

/*
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PackageProvider>
        <Layout />
      </PackageProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "packages", Component: Packages },
      { path: "packages/:id", Component: PackageDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "founder", Component: Founder },
      { path: "*", Component: NotFound },
    ],
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      { path: "dashboard", Component: AdminDashboard },
      { path: "package/new", Component: AdminPackageForm },
      { path: "package/edit/:id", Component: AdminPackageForm },
    ],
  },
]);

*/

/*

export const router = createBrowserRouter([
  {path: "/",
    element: (
      <PackageProvider>
        <Layout />
      </PackageProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "packages", Component: Packages },
      { path: "packages/:id", Component: PackageDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "founder", Component: Founder },
      { path: "*", Component: NotFound },
    ],

  },
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      { path: "dashboard", Component: AdminDashboard },
      { path: "package/new", Component: AdminPackageForm },
      { path: "package/edit/:id", Component: AdminPackageForm },
    ],
  },
]);*/
/*
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PackageProvider>
        <Layout />
      </PackageProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "packages", Component: Packages },
      { path: "packages/:id", Component: PackageDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "founder", Component: Founder },

      // ✅ MOVE ADMIN HERE
      { path: "admin/login", Component: AdminLogin },
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/package/new", Component: AdminPackageForm },
      { path: "admin/package/edit/:id", Component: AdminPackageForm },

      { path: "*", Component: NotFound },
    ],
  },
]);*/