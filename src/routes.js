import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminPage />
      </RequireAuth>
    ),
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
