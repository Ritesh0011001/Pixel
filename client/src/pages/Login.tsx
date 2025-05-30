import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinInput, type SigninInput } from "@amulgaurav/medium-common";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiClient } from "@/utils/axios";
import { toast } from "sonner";
import useLoading from "@/hooks/useLoading";
import { Loader2 } from "lucide-react";
import type { IAuthResponse } from "@/types/user";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/globalAtoms";

function Login() {
  const navigate = useNavigate();
  const setName = useSetRecoilState(userState);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinInput),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninInput) {
    startLoading();
    const { email, password } = values;

    try {
      const { data }: { data: IAuthResponse } = await apiClient.post(
        "/user/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      setName(data.name);

      toast.success("Logged in successfully!");
      form.reset();
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || err.message || "Something went wrong."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      stopLoading();
    }
  }

  return (
    <AuthLayout>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Jm@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Logging in
                </Button>
              ) : (
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
}
export default Login;
