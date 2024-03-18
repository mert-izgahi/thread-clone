"use client";

import React from "react";
import { links } from "./links";
import { Flex, NavLink, Tooltip } from "@mantine/core";
import { styled } from "styled-components";
import { usePathname } from "next/navigation";

interface Props {
    leftSection: React.ReactNode;
    href: string;
    variant: string;
    active: boolean;
}

const StyledNavLink = styled(NavLink)<Props>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .mantine-NavLink-body {
        display: none;
    }
`;

function BottomBar() {
    const pathname = usePathname();
    return (
        <Flex h={60} align="stretch">
            {links.map((link) => (
                <Tooltip
                    key={link.label}
                    label={link.label}
                    withArrow
                    position="top"
                >
                    <StyledNavLink
                        leftSection={link.icon}
                        href={link.link}
                        active={pathname === link.link}
                        variant="subtle"
                    />
                </Tooltip>
            ))}
        </Flex>
    );
}

export default BottomBar;
