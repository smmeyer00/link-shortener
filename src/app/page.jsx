"use server";

import DemoForm from "@/components/demoForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    return (
        <main>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Shorten Your Links, Expand Your Reach
                            </h1>
                            <p className="mx-auto max-w-[700px] md:text-xl text-muted-foreground">
                                Our link shortening service helps you create
                                custom, branded links that are easy to share and
                                track.
                            </p>
                        </div>
                        <DemoForm />
                    </div>
                </div>
            </section>
            <div className="mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                <Separator />
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg px-3 py-1 text-sm text-muted-foreground">
                                    Fast Processing
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Instant Link Shortening
                                </h2>
                                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                                    Our link shortening service processes your
                                    links instantly, allowing you to share them
                                    right away.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                <Separator />
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg px-3 py-1 text-sm text-muted-foreground">
                                    Custom URLs
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Branded, Memorable Links
                                </h2>
                                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                                    Create custom, branded links that are easy
                                    to remember and share with your audience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                <Separator />
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg px-3 py-1 text-sm text-muted-foreground">
                                    Analytics
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Detailed Link Analytics
                                </h2>
                                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                                    Track the performance of your links with our
                                    comprehensive analytics dashboard, including
                                    referral source, device information, and
                                    geographic data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
