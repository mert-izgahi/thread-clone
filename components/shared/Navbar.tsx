"use client";
import React from "react";
import SignOutButton from "../buttons/SignOutButton";
import { links } from "./links";
import { NavLink, Space, Stack } from "@mantine/core";
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();
    return (
        <Stack p="md" h={"100%"}>
            {links.map((link) => (
                <NavLink
                    key={link.label}
                    label={link.label}
                    leftSection={link.icon}
                    href={link.link}
                    active={pathname === link.link}
                    variant="filled"
                />
            ))}
            <Space h="md" mb={"auto"} />
            <SignOutButton withLabel variant="outline" />
        </Stack>
    );
}

export default Navbar;
