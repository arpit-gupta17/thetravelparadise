import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PackageProvider } from "./contexts/PackageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

// Eagerly load Home for best LCP
import { Home } from "./pages/Home";

// Lazy load the rest to improve Performance Score
const Packages = lazy(() =>
  import("./pages/Packages").then((module) => ({ default: module.Packages })),
);
const PackageDetail = lazy(() =>
  import("./pages/PackageDetail").then((module) => ({
    default: module.PackageDetail,
  })),
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact })),
);
const Founder = lazy(() =>
  import("./pages/Founder").then((module) => ({ default: module.Founder })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({ default: module.NotFound })),
);
const AdminLogin = lazy(() =>
  import("./pages/AdminLogin").then((module) => ({
    default: module.AdminLogin,
  })),
);
const AdminDashboard = lazy(() =>
  import("./pages/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);
const AdminPackageForm = lazy(() =>
  import("./pages/AdminPackageForm").then((module) => ({
    default: module.AdminPackageForm,
  })),
);

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="w-12 h-12 border-4 border-[var(--brand-orange-red)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
      {
        path: "packages",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Packages />
          </Suspense>
        ),
      },
      {
        path: "packages/:id",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PackageDetail />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "founder",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Founder />
          </Suspense>
        ),
      },

      // ADMIN ROUTES
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "package/new",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AdminPackageForm />
              </Suspense>
            ),
          },
          {
            path: "package/edit/:id",
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AdminPackageForm />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "admin/login",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AdminLogin />
          </Suspense>
        ),
      },

      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
