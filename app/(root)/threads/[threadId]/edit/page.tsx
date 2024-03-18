import ThreadForm from "@/components/forms/ThreadForm";
import { Container, Text, Title } from "@mantine/core";
import React from "react";

interface Props {
    params: {
        threadId: string;
    };
}

function EditThreadPage({ params }: Props) {
    const threadId = params.threadId;
    return (
        <Container size={"md"} p={"md"}>
            <Title>Edit Thread</Title>
            <Text size={"sm"} c={"dimmed"} mb={"xl"}>
                Create a new thread
            </Text>
            <ThreadForm threadId={threadId} />
        </Container>
    );
}

export default EditThreadPage;
