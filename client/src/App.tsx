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

function App() {
  return (
    <div className="min-h-screen items-center justify-center py-6">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        {/* <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} /> */}

        {/* Protected Routes */}
        <Route index element={<LandingPage />} />
        <Route path="wallet">
          <Route path="create" element={<CreateWallet />} />
          <Route path="import" element={<ImportWallet />} />
        </Route>

        <Route path="blockchain" element={<ProtectedRoute />}>
          <Route path="select" element={<SelectBlockchain />} />
          <Route path="ethereum" element={<UserWallet />} />
          <Route path="solana" element={<UserWallet />} />
        </Route>
      </Routes>

      <ToastNotification />
    </div>
  );
}

export default App;
