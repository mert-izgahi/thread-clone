"use client";

import AsideBar from "@/components/shared/AsideBar";
import BottomBar from "@/components/shared/BottomBar";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";

import {
    AppShell,
    AppShellAside,
    AppShellFooter,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const client = new QueryClient();
    const [opened, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();

    if (isCurrentUserLoading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        redirect("/sign-in");
    }

    if (currentUser) {
        if (!currentUser.profileCompleted) {
            redirect("/on-boarding");
        }
    }

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { desktop: false, mobile: !opened },
                }}
                footer={isMobile ? { height: 60 } : undefined}
                aside={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { desktop: false, mobile: true },
                }}
            >
                <AppShellHeader>
                    <Header opened={opened} toggle={toggle} />
                </AppShellHeader>
                <AppShellNavbar>
                    <Navbar />
                </AppShellNavbar>
                <AppShellAside>
                    <AsideBar />
                </AppShellAside>
                {isMobile && (
                    <AppShellFooter>
                        <BottomBar />
                    </AppShellFooter>
                )}
                <AppShellMain>{children}</AppShellMain>
            </AppShell>
        </HydrationBoundary>
    );
}

export default layout;
