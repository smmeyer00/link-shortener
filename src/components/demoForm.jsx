'use client'

import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DemoForm() {
    const session = useSession()
    const isAuth = session.status === 'authenticated'
    const [inputValue, setInputValue] = useState('')
    return (
        <div className="w-full max-w-md">
            <Input
                className="flex-1"
                placeholder="Enter your long link"
                type="url"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value.trim())
                }}
            />
            <Link
                href={isAuth ? `/app/create/?input=${inputValue}` : "/api/auth/signin"}
            >
                <Button className="mt-4" type="submit">
                    {isAuth ? "Get Started" : "Sign-in and Shorten!"}
                </Button>
            </Link>
        </div>
    );
};