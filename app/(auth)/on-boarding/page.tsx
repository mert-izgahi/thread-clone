import AccountForm from "@/components/forms/AccountForm";
import { Card, Container, Text, Title } from "@mantine/core";
import React from "react";

async function OnBoardPage() {
    return (
        <Container size="sm" py={"xl"}>
            <Title mb={"md"}>Onboarding</Title>
            <Text mb={"xl"}>Please complete your onboarding steps here.</Text>
            <Card>
                <AccountForm isOnBoarding />
            </Card>
        </Container>
    );
}

export default OnBoardPage;
