"use client";
import { Burger, Flex, Group, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { SignedIn } from "@clerk/nextjs";
import OrganizationSwitcherButton from "../buttons/OrganizationSwitcherButton";
import SignOutButton from "../buttons/SignOutButton";

function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    return (
        <Flex h={60} align="center" justify="space-between" px="md">
            <Group>
                <Burger
                    size="sm"
                    hiddenFrom="md"
                    opened={opened}
                    onClick={toggle}
                />
                <Link href="/">
                    <Image src="/logo.svg" width={"40px"} height="40px" />
                </Link>
            </Group>

            <SignedIn>
                <Group align="center">
                    <SignOutButton variant="outline" />

                    {/* <OrganizationSwitcherButton /> */}
                </Group>
            </SignedIn>
        </Flex>
    );
}

export default Header;
