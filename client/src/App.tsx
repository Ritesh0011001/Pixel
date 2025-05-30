import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateWallet from "./pages/CreateWallet";
import ImportWallet from "./pages/ImportWallet";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ToastNotification from "./components/ToastNotification";
import SelectBlockchain from "./pages/SelectBlockchain";
import UserWallet from "./pages/UserWallet";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen items-center justify-center py-6">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<LandingPage />} />

          <Route path="wallet">
            <Route path="create" element={<CreateWallet />} />
            <Route path="import" element={<ImportWallet />} />
          </Route>

          <Route path="blockchain">
            <Route path="select" element={<SelectBlockchain />} />
            <Route path="ethereum" element={<UserWallet />} />
            <Route path="solana" element={<UserWallet />} />
          </Route>
        </Route>
      </Routes>

      <ToastNotification />
      <Toaster closeButton />
    </div>
  );
}

export default App;
