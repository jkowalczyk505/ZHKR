import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import FilesPage from "./pages/FilesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import BreedingsPage from "./pages/BreedingsPage";
import KnowledgePage from "./pages/KnowledgePage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/pliki", element: <FilesPage /> },
  { path: "/kontakt", element: <ContactPage /> },
  { path: "/o-nas", element: <AboutPage /> },
  { path: "/hodowle", element: <BreedingsPage /> },
  { path: "/wiedza", element: <KnowledgePage /> },
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
