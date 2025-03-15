import { Navigate, Route, Routes } from "react-router-dom"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import Home from "./pages/home/page"
import Signup from "./pages/signup/page"
import Login from "./pages/login/page"
import Profile from "./pages/profile/page"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

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
    <div className="h-screen w-full overflow-hidden">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
      </Routes>
      {/* <Footer /> */}
      <Toaster />
    </div>
  )
}

export default App
