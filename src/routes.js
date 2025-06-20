import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import FilesPage from "./pages/FilesPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/pliki", element: <FilesPage /> },
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
