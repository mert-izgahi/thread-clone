import AccountForm from "@/components/forms/AccountForm";
import { Container } from "@mantine/core";
import React from "react";

function ProfilePage() {
    return (
        <Container size={"md"} p={"md"}>
            <AccountForm isOnBoarding={false} />
        </Container>
    );
}

export default ProfilePage;
