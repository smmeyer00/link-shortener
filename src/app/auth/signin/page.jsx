"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className='flex min-h-[calc(100vh-78px)] flex-col items-center justify-center py-12'>
      <div className='w-full max-w-md space-y-8 px-4 sm:px-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Sign in to your account
          </h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            to continue to link shortener
          </p>
        </div>

        {error && (
          <div className='rounded-md bg-destructive/15 p-3 text-center text-sm text-destructive flex items-center justify-center gap-2'>
            <AlertCircle className='h-4 w-4' />
            <span>
              {error === "OAuthSignin" && "Error starting the sign in process."}
              {error === "OAuthCallback" && "Error during the sign in process."}
              {error === "OAuthAccountNotLinked" &&
                "This account is already linked to another user."}
              {error === "Callback" && "Error during the sign in callback."}
              {error === "OAuthCreateAccount" &&
                "Could not create an account with this provider."}
              {error === "EmailCreateAccount" &&
                "Could not create an account with this email."}
              {error === "SessionRequired" &&
                "Please sign in to access this page."}
              {![
                "OAuthSignin",
                "OAuthCallback",
                "OAuthAccountNotLinked",
                "Callback",
                "OAuthCreateAccount",
                "EmailCreateAccount",
                "SessionRequired",
              ].includes(error) && "An unknown error occurred."}
            </span>
          </div>
        )}

        <div className='mt-6'>
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className='w-full'
            variant='outline'>
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className='flex items-center justify-center'>
                <svg viewBox='0 0 24 24' className='mr-2 h-4 w-4'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                <span>Sign in with Google</span>
              </div>
            )}
          </Button>
        </div>

        <div className='mt-6 text-center text-sm text-muted-foreground'>
          By signing in, you agree to our{" "}
          <a href='#' className='font-medium underline'>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href='#' className='font-medium underline'>
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
