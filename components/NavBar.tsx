"use client"


import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ModeToggle } from "@/components/ui/ModeToggle"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Rocket } from "lucide-react"
import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Profile } from "./Profile"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Blog",
        href: "/resources/blog",
        description:
            "Deepen your knowledge.",
    },
]

export function NavBar() {
    const { userId, sessionId } = useAuth();
    const router = useRouter();
    if (!userId) {
        router.push("/");
        return null;
    }

    if(!sessionId){
        router.push("/");
        return null;
    }

    return (
        <div className="flex min-w-full justify-between p-2 border-b z-10">
            <Dialog>
                <SheetTrigger className="min-[825px]:hidden p-2 transition">
                    <GiHamburgerMenu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Weather System</SheetTitle>
                        <SheetDescription>
                            Monitor, Predict and Learn Weather Choices
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3 mt-[1rem]">
                        <DialogClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full">Home</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/contact-us">
                                <Button variant="outline" className="w-full">Contact Us</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/">
                                <SignOutButton signOutOptions={{ sessionId }} >
                                    <Button variant="destructive" className="w-full">Log Out</Button>
                                </SignOutButton>
                            </Link>

                        </DialogClose>
                    </div>
                </SheetContent>
            </Dialog>

            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden ">
                    <Link href="/" className="pl-2">
                        <Rocket />
                    </Link>
                    <NavigationMenuItem>
                        <Link href="/#pricing" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Pricing
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/contact-us" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Contact Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">
                {/* {userId && <Profile />} For adding profile*/}
                {userId && <Profile />}
                <ModeToggle />
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
