"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DemoForm() {
    const session = useSession();
    const isAuth = session.status === "authenticated";
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <div className="w-full max-w-md">
            <Input
                className="flex-1"
                placeholder="Enter your long link"
                type="url"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value.trim());
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setIsSubmitting(true)
                        router.push(
                            isAuth
                                ? `/app/create/?input=${inputValue}`
                                : "/api/auth/signin"
                        );
                    }
                }}
            />
            <Link
                href={
                    isAuth
                        ? `/app/create/?input=${inputValue}`
                        : "/api/auth/signin"
                }
            >
                <Button onClick={() => {setIsSubmitting(true)}} disabled={isSubmitting} className="mt-4" type="submit">
                    {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isAuth ? "Get Started" : "Sign-in and Shorten!"}
                </Button>
            </Link>
        </div>
    );
}
