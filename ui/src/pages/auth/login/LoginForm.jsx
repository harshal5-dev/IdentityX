import * as z from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DoorClosedLocked, Lock, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorAlert from "@/components/ErrorAlert";
import { useLoginMutation } from "../authApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setIsAuthenticated } from "../authSlice";
import SuccessAlert from "@/components/SuccessAlert";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error, reset, isSuccess, isError }] =
    useLoginMutation();
  const { data = {} } = error || {};
  const { errorMessage = "An unexpected error occurred. Please try again." } =
    data;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await login(data);
    dispatch(setIsAuthenticated(true));
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }

    if (isError) {
      setTimeout(() => {
        reset();
      }, 5555);
    }
  }, [isSuccess, isError, navigate, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your username below to login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="pl-10 h-11"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage>
                  {form.formState.errors?.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <button
                    type="button"
                    className="text-sm font-medium hover:underline text-primary cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 h-11"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage>
                  {form.formState.errors?.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {/* Error Message */}
          {isError && (
            <ErrorAlert title="Login Failed" message={errorMessage} />
          )}

          {/* Success Message */}
          {isSuccess && (
            <SuccessAlert
              title="Login Successful"
              message="Welcome back! Redirecting..."
            />
          )}

          <Field>
            <Button type="submit">
              {isLoading ? (
                <>
                  <Spinner /> Please wait
                </>
              ) : (
                <>
                  <DoorClosedLocked /> Login
                </>
              )}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-sm font-medium hover:underline text-primary cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};

export default LoginForm;
