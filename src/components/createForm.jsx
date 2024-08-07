"use client";

import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import isURL from "validator/lib/isURL";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";

export default function CreateForm() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [inputVal, setInputVal] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        setInputVal(searchParams.get("input") ?? "");
        setIsValid(
            isURL(searchParams.get("input") ?? "", {
                require_protocol: true,
            })
        );
        router.replace(pathName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setIsValid(
            isURL(e.target.value, {
                require_protocol: true,
            })
        );
        setInputVal(e.target.value.trim());
    };

    const handleClick = async () => {
        if (!isValid || isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        const response = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullUrl: inputVal }),
        });

        const result = await response.json();
        if (response.status == 200 && result.shortUrl) {
            router.push(
                `/app/create/success/${result.shortUrl}?fullUrl=${result.fullUrl}`
            );
        } else {
            setIsSubmitting(false);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <>
            <div className="w-full relative">
                <Input
                    type="text"
                    pattern="[^\s]+"
                    value={inputVal}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleClick();
                        }
                    }}
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
                    disabled={isSubmitting || !isValid}
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
