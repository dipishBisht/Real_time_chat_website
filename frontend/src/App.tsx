import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/page"
import Signup from "./pages/signup/page"
import Login from "./pages/login/page"
import Profile from "./pages/setting/profile/page"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Community } from "./pages/community/community"
import Setting from "./pages/setting/page"
import Sidebar from "./components/home/sidebar"
import Notifications from "./pages/setting/notifications/page"
import Security from "./pages/setting/security/page"

function App() {
    const { user, checkAuth, checkingAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (checkingAuthenticated && !user)
    return (
      <div className="h-screen w-full grid place-items-center">
        <Loader className="size-10 animate-spin" />
      </div>)
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <Sidebar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/community" element={user ? <Community /> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />

        <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" replace />}>
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
