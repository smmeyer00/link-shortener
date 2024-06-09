"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { CircleCheck, Copy, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSuccessPage({ params: { shortUrl } }) {
    const { toast } = useToast();

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [fullUrlValue, setFullUrlValue] = useState(
        searchParams.get("fullUrl") ?? ""
    );
    const [copied, setCopied] = useState(false);

    // useEffect(() => {
    //     setFullUrlValue(searchParams.get("fullUrl") ?? "");
    //     router.replace(pathName);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
        <h1 className="font-bold tracking-tighter text-4xl lg:text-5xl/none text-center mt-16 ">Success!</h1>
            <div className="pt-28 md:pt-36 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 2xl:mx-32 flex flex-col justify-center">
                {/** TODO: possibly add items-center back above (doesn't fit localhost URL but will fit real URL) */}
                <div>
                    <Link href={`/app/view/${shortUrl}`}>
                        <Button variant="ghost" className="mb-2">
                            {"< Overview"}
                        </Button>
                    </Link>

                    <div className="relative rounded-md border">
                        <Input
                            disabled
                            value={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${shortUrl}`}
                            className="disabled:cursor-default h-15 text-xl lg:text-2xl font-medium font-mono disabled:opacity-100"
                        />
                        <div
                            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${"hover:cursor-pointer"} `}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${shortUrl}`
                                );
                                setCopied(true);
                                toast({ description: "Copied to clipboard" });
                            }}
                        >
                            <Copy className="text-primary hover:text-foreground" />
                        </div>
                    </div>
                    <div className="w-full italic font-mono text-sm px-3 py-2">
                        <CornerDownRight className="inline h-4 w-4 text-primary" />{" "}
                        <Link
                            className="hover:underline text-primary"
                            href={fullUrlValue}
                        >
                            {fullUrlValue}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
