import { ShieldUser, ShieldCheck, Home } from "lucide-react";

import { BackgroundBeamsWithCollision } from "@/components/ui/shadcn-io/background-beams-with-collision";
import { LoginForm } from "./LoginForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Login() {
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
            <LoginForm />
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
                Welcome to{" "}
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  IdentityX
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Build secure authentication flows with ease
              </p>
              <div className="grid gap-4 pt-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <ShieldCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure by Default</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security with JWT authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Custom Auth Flows</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and manage authentication flows tailored to your
                      needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Easy Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Seamlessly integrate with your existing applications
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
}
