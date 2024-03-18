"use client";

import useGetThreads from "@/hooks/useGetThreads";
import React from "react";
import ThreadCard from "./ThreadCard";
import { IThread } from "@/server/models/Thread.model";
import { IUser } from "@/server/models/User.model";
import { Box, Stack } from "@mantine/core";

function ThreadsList() {
    const { threads, isLoading, error } = useGetThreads();

    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading</div>;
    return (
        <Box p="xs">
            <Stack gap="md">
                {threads &&
                    threads.length > 0 &&
                    threads.map((thread: IThread) => (
                        <ThreadCard key={thread._id} thread={thread} />
                    ))}
            </Stack>
        </Box>
    );
}

export default ThreadsList;
