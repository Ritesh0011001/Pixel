import { Card } from "@/components/ui/card";
import { apiClient } from "@/utils/axios";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function AuthLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => navigate("/"))
      .catch((err) => toast.error(err.response?.data?.message || err.message));
  }, []);

  return (
    <div className="flex w-full items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="w-[400px] md:[350px]">{children}</Card>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
