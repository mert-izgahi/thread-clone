"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
import { styled } from "styled-components";

const StyledOrganizationSwitcher = styled.div`
    .cl-rootBox {
        height: 100%;
        display: flex;
        align-items: center;

        .cl-organizationSwitcherTrigger {
            border-radius: var(--mantine-radius-sm);
            display: flex;

            @media screen and (max-width: 768px) {
                width: 30px;
            }
            outline: none;
            border: none;
            &:focus,
            &:active {
                outline: none;
                border: none;
                box-shadow: none;
            }

            .cl-userPreview {
                .cl-userPreviewTextContainer {
                    @media screen and (max-width: 768px) {
                        display: none;
                    }
                }
            }

            .cl-organizationSwitcherTriggerIcon {
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
        }
    }
`;

function OrganizationSwitcherButton() {
    return (
        <StyledOrganizationSwitcher>
            <OrganizationSwitcher
                appearance={{
                    baseTheme: dark,
                }}
            />
        </StyledOrganizationSwitcher>
    );
}

export default OrganizationSwitcherButton;
