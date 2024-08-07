"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLinkPage({ params: { shortUrl } }) {
    const router = useRouter();
    const { toast } = useToast();

    // TODO: check ownership of link, if requester doesn't own then redirect to home page

    // TODO: fetch data to set initial state, maybe set an is loading state with overlay loading wheel and disabled inputs
    // eg, req.send().then(/** set state here */)
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("initValue");
    const [desc, setDesc] = useState("initValue");
    const [fullUrl, setFullUrl] = useState("initValue");
    const [submitEnabled, setSubmitEnabled] = useState(title.length > 0);

    useEffect(() => {
        setSubmitEnabled(title.length > 0);
    }, [title]);

    useEffect(() => {
        fetch(`/api/${shortUrl}`)
            .then((response) => {
                if (!response.ok) {
                    router.push(`/app/view/${shortUrl}`);
                }
                return response.json();
            })
            .then((data) => {
                setTitle(data.linkData.title);
                setDesc(data.linkData.description);
                setFullUrl(data.linkData.fullUrl);
                setIsLoading(false);
            })
            .catch((error) => {
                router.push(`/app/view/${shortUrl}`);
            });
    }, [shortUrl, router]);

    const handleSubmit = async () => {
        const res = await fetch(`/api/${shortUrl}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, description: desc }),
        });

        if (!res?.ok) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            return;
        }

        router.push(`/app/view/${shortUrl}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-4">
                <LoaderCircle className="animate-spin text-muted h-12 w-12" />
            </div>
        );
    }

    return (
        <>
            <h1 className="text-4xl text-center my-4 font-bold">
                Editing -{" "}
                <Button
                    className="text-4xl font-bold m-0 p-0 underline"
                    asChild
                    variant="link"
                >
                    <Link href={`/app/view/${shortUrl}`}>{`${shortUrl}`}</Link>
                </Button>
            </h1>
            <div className="flex justify-center">
                <div className="rounded-md border p-4 space-y-8 w-[500px]">
                    <div>
                        <Label htmlFor="titleInput">Title</Label>
                        <Input
                            id="titleInput"
                            placeholder="Enter a title"
                            value={title}
                            maxlength={128}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            className="font-mono"
                        />
                    </div>

                    <div>
                        <Label htmlFor="descInput">Description</Label>
                        <Textarea
                            id="descInput"
                            placeholder="Enter a description"
                            value={desc}
                            maxlength={128}
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            className="font-mono"
                        />
                    </div>

                    <div className="flex flex-row justify-center">
                        <Button className="font-bold" variant="link" asChild>
                            <Link href={fullUrl}>
                                {fullUrl}
                                <ExternalLink className="ml-1" />
                            </Link>
                        </Button>
                    </div>

                    <div>
                        <Button
                            disabled={!submitEnabled}
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
