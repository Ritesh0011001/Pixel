import { apiClient } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import ProgressBar from "./ProgressBar";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/globalAtoms";

function ProtectedRoute() {
  const location = useLocation();
  const setName = useSetRecoilState(userState);
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data }: { data: { name: string } } = await apiClient(
          "/user/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setIsAuthenticated(!!data.name);
        setName(data.name);
      } catch {
        setIsAuthenticated(false);
        localStorage.clear();
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <ProgressBar />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
