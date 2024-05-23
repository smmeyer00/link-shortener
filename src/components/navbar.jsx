"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Moon, Settings, Sun, User, Link2Off } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const session = useSession();
    const router = useRouter();

    return (
        <div className="flex justify-between items-center p-4">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link2Off className="mx-4" />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>App</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]  lg:w-[300px]">
                                <ListItem
                                    key="Create"
                                    title="Create"
                                    href="/app/create"
                                >
                                    Generate a shortened link
                                </ListItem>
                                <ListItem
                                    key="View"
                                    title="View"
                                    href="/app/view"
                                >
                                    Manage your shortened links
                                </ListItem>
                                <ListItem
                                    key="Analytics"
                                    title="Analytics"
                                    href="/app/analytics"
                                >
                                    Understand your traffic
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {session.status == "authenticated" ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full">
                        <Avatar>
                            {
                                // TODO: use avatar pic from identity provider (e.g., google)
                            }
                            <AvatarImage
                                src={session?.data?.user?.image}
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mx-4">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/settings">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    if (theme === "dark") {
                                        setTheme("light");
                                    } else if (theme === "light") {
                                        setTheme("dark");
                                    }
                                }}
                            >
                                {theme === "dark" ? (
                                    <Moon className="mr-2 h-4 w-4" />
                                ) : (
                                    <Sun className="mr-2 h-4 w-4" />
                                )}
                                <span>Toggle theme</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {/* <Link href="/api/auth/signout"> */}
                            {
                                // TODO: update this href after setting up auth
                            }
                            <DropdownMenuItem className="cursor-pointer"
                                onClick={() => {
                                    signOut({redirect: false})
                                    router.push("/")
                                }}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        {/* </Link> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button onClick={() => router.push("/api/auth/signin")}>
                    Sign In
                </Button>
            )}
        </div>
    );
}

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
