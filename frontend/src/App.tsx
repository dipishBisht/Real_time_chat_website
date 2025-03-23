import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/home/page";
import Signup from "./pages/signup/page";
import Login from "./pages/login/page";
import Profile from "./pages/setting/profile/page";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Community } from "./pages/community/community";
import Setting from "./pages/setting/page";
import Sidebar from "./components/home/sidebar";
import Notifications from "./pages/setting/notifications/page";
import Security from "./pages/setting/security/page";
import Dashboard from "./pages/admin/dashboard/page";

function App() {
  const { user, checkAuth, checkingAuthenticated } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin" && pathname !== "/dashboard") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "user" && ["/login", "/signup"].includes(pathname)) {
        navigate("/", { replace: true });
      }
    }
  }, [user, pathname, navigate]);

  // Show loader while checking authentication status
  if (checkingAuthenticated && !user)
    return (
      <div className="h-screen w-full grid place-items-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  // Control sidebar visibility
  const shouldShowSidebar =
    !pathname.includes("/dashboard") &&
    !pathname.includes("/signup") &&
    !pathname.includes("/login") &&
    !isAdmin;

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {shouldShowSidebar && <Sidebar />}

      <Routes>
        {/* Public Routes */}
        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : null}

        {/* User Routes */}
        {isUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/setting" element={<Setting />}>
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="security" element={<Security />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Admin Routes */}
        {isAdmin && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
