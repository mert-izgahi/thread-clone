import ThreadForm from "@/components/forms/ThreadForm";
import { Container, Text, Title } from "@mantine/core";
import React from "react";

function CreateThreadPage() {
    return (
        <Container size={"md"} p={"md"}>
            <Title>Create Thread</Title>
            <Text size={"sm"} c={"dimmed"} mb={"xl"}>
                Create a new thread
            </Text>
            <ThreadForm />
        </Container>
    );
}

export default CreateThreadPage;
