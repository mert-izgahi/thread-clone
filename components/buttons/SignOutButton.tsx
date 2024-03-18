"use client";

import { ActionIcon, Box, Button } from "@mantine/core";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function SignOutButton({
    withLabel,
    variant,
}: {
    withLabel?: boolean;
    variant: "filled" | "light" | "subtle" | "outline";
}) {
    const router = useRouter();
    const { signOut } = useClerk();
    const onSignOut = async () => {
        await signOut();

        router.push("/sign-in");
    };
    return (
        <>
            {!withLabel ? (
                <Box hiddenFrom="sm">
                    <ActionIcon variant={variant} onClick={onSignOut}>
                        <IoLogOutOutline size={18} />
                    </ActionIcon>
                </Box>
            ) : (
                <Box visibleFrom="sm">
                    <Button
                        variant={variant}
                        leftSection={<IoLogOutOutline size={18} />}
                        onClick={onSignOut}
                    >
                        Sign Out
                    </Button>
                </Box>
            )}
        </>
    );
}

export default SignOutButton;
