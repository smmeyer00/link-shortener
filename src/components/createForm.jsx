"use client";

import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import { useSession } from "next-auth/react";

export default function CreateForm() {

    const [inputVal, setInputVal] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const session = useSession()

    const handleInputChange = (e) => {
        setIsValid(
            isURL(e.target.value, {
                require_protocol: true,
            })
        );
        setInputVal(e.target.value.trim());
        console.log("input changed");
    };

    const handleClick = () => {
        // TODO: replace once API implemented
        console.log("button click");
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
        // window.location.replace(inputVal)
    };

    return (
        <>
            <div className="w-full relative">
                <Input
                    type="text"
                    pattern="[^\s]+"
                    value={inputVal}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Enter long URL here..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {isValid ? (
                        <CircleCheck className="text-primary" />
                    ) : (
                        <CircleX className="text-destructive" />
                    )}
                </div>
            </div>
            <div>
                <Button
                    disabled={isSubmitting}
                    className="my-2 lg:px-8"
                    onClick={handleClick}
                >
                    {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Please wait" : "Shrink it"}
                </Button>
            </div>
        </>
    );
}
