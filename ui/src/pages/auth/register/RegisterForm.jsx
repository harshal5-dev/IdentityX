import * as z from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail, User, Lock, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorAlert from "@/components/ErrorAlert";
import { useRegisterMutation } from "../authApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SuccessAlert from "@/components/SuccessAlert";
import { Spinner } from "@/components/ui/spinner";

const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const navigate = useNavigate();

  const [register, { isLoading, error, reset, isSuccess, isError }] =
    useRegisterMutation();
  const { data = {} } = error || {};
  const { errorMessage = "An unexpected error occurred. Please try again." } =
    data;

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...payload } = data;
    await register(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
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
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your information to get started
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="pl-10 h-11"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage>
                    {form.formState.errors?.firstName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="pl-10 h-11"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage>
                    {form.formState.errors?.lastName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      className="pl-10 h-11"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage>
                  {form.formState.errors?.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 h-11"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage>
                  {form.formState.errors?.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Error Message */}
          {isError && (
            <ErrorAlert title="Registration Failed" message={errorMessage} />
          )}

          {/* Success Message */}
          {isSuccess && (
            <SuccessAlert
              title="Registration Successful"
              message="Account created! Redirecting to login..."
            />
          )}

          <Field>
            <Button type="submit" disabled={isLoading || isSuccess}>
              {isLoading || isSuccess ? (
                <>
                  <Spinner /> Creating account...
                </>
              ) : (
                <>
                  <UserPlus /> Create Account
                </>
              )}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="text-sm font-medium hover:underline text-primary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};

export default RegisterForm;
