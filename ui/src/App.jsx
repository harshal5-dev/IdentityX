import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./pages/auth/Login1";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import UserInfo from "./pages/Account/UserInfo";
import UserAddresses from "./pages/UserAddresses";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="identityx-ui-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/403" element={<Forbidden />} />

          {/* Protected Routes - Using Outlet pattern */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/addresses" element={<UserAddresses />} />
          </Route>

          {/* 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
