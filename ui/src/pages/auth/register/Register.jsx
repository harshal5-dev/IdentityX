import { useNavigate } from "react-router";
import {
  ShieldUser,
  ShieldCheck,
  Home,
  FingerprintPattern,
  ListTodo,
} from "lucide-react";

import { BackgroundBeamsWithCollision } from "@/components/ui/shadcn-io/background-beams-with-collision";
import RegisterForm from "./RegisterForm";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center gap-2">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <ShieldUser className="size-5" />
            </div>
            IdentityX
          </a>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="size-4" />
            Home
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs md:max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <BackgroundBeamsWithCollision className="min-h-screen">
          <div className="flex h-full items-center justify-center p-10">
            <div className="relative z-20 max-w-2xl space-y-6 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
                <ShieldUser className="size-16 text-primary" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Join{" "}
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  IdentityX
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Create your account and start building secure authentication
                flows
              </p>
              <div className="grid gap-4 pt-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <ShieldCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Bank-grade encryption and JWT authentication built-in
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <FingerprintPattern className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Get started in minutes with our intuitive interface
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <ListTodo className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Full Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage users, permissions, and auth flows with ease
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </div>
    </div>
  );
};

export default Register;
