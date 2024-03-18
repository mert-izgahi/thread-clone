"use client";
import {
    ActionIcon,
    Avatar,
    Card,
    CardSection,
    Flex,
    Image,
    Loader,
    Menu,
    MenuTarget,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IoHeartOutline,
    IoHeart,
    IoBookmarkOutline,
    IoBookmark,
    IoEllipsisVerticalOutline,
    IoTrashOutline,
    IoPencilOutline,
} from "react-icons/io5";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import useDeleteThread from "@/hooks/useDeleteThread";
import useLikeThread from "@/hooks/useLikeThread";
import useSaveThread from "@/hooks/useSaveThread";

interface Props {
    thread: any;
}

function ThreadDeleteButton({ thread }: Props) {
    const { deleteThread, isPendingDeleteThread } = useDeleteThread();

    const handleDelete = async () => {
        await deleteThread({ threadId: thread._id });
    };
    return (
        <Menu.Item
            color="red"
            disabled={isPendingDeleteThread}
            leftSection={
                isPendingDeleteThread ? (
                    <Loader color="red" size="xs" />
                ) : (
                    <IoTrashOutline />
                )
            }
            onClick={handleDelete}
        >
            Delete
        </Menu.Item>
    );
}

function ThreadCardHeader({ thread }: Props) {
    const router = useRouter();
    const { currentUser, isLoading } = useCurrentUser();
    const isForCurrentUser = useMemo(() => {
        return currentUser?._id === thread.user?._id;
    }, [currentUser?._id, thread.user?._id]);

    return (
        <CardSection p={"md"}>
            <Flex align="center" gap="md">
                <Avatar
                    size="md"
                    radius="sm"
                    src={thread.user?.profilePhotoUrl as string}
                />
                <p>{thread.user?.name}</p>

                <Flex ml="auto" align="center" gap="md">
                    <Text component="span" size="md" visibleFrom="md">
                        {dayjs(thread.createdAt).format("MMMM DD YYYY")}
                    </Text>

                    {isForCurrentUser && (
                        <Menu position="bottom-end" width={200}>
                            <MenuTarget>
                                <ActionIcon variant="subtle">
                                    <IoEllipsisVerticalOutline />
                                </ActionIcon>
                            </MenuTarget>

                            <Menu.Dropdown>
                                <ThreadDeleteButton thread={thread} />
                                <Menu.Item
                                    leftSection={<IoPencilOutline />}
                                    onClick={() => {
                                        router.push(`/threads/${thread._id}`);
                                    }}
                                >
                                    Edit
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </Flex>
            </Flex>
        </CardSection>
    );
}

function ThreadCardContent({ thread }: Props) {
    return (
        <CardSection>
            {thread.image && (
                <Image
                    src={thread.image}
                    w={"100%"}
                    fit="contain"
                    alt="image"
                />
            )}
            <Stack p={"md"}>
                <Title order={3}>{thread.title}</Title>
                <Text>{thread.content}</Text>
            </Stack>
        </CardSection>
    );
}

function ThreadCardFooter({ thread }: Props) {
    return (
        <CardSection p={"md"}>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap="md">
                    <Flex align="center" gap="xs">
                        <Text>{thread.likesCount}</Text>
                        <Text>Likes</Text>
                    </Flex>
                </Flex>
                <ThreadCardActions thread={thread} />
            </Flex>
        </CardSection>
    );
}

function ThreadCardActions({ thread }: Props) {
    const { currentUser, isLoading } = useCurrentUser();
    const { likeThread, isPendingLikeThread } = useLikeThread();
    const { saveThread, isPendingSaveThread } = useSaveThread();
    const handleLike = async () => {
        await likeThread({ threadId: thread._id });
    };

    const hasLiked = useMemo(() => {
        return currentUser?.likedThreads
            .map((like: any) => like._id)
            .includes(thread._id);
    }, [currentUser?.likedThreads]);

    const handleSave = async () => {
        await saveThread({ threadId: thread._id });
    };
    const hasSaved = useMemo(() => {
        return currentUser?.savedThreads
            .map((save: any) => save._id)
            .includes(thread._id);
    }, [currentUser?.savedThreads]);

    return (
        <Flex align="center" gap="md">
            <ActionIcon
                variant="subtle"
                disabled={isPendingLikeThread}
                onClick={handleLike}
                loading={isPendingLikeThread}
            >
                {hasLiked === true ? <IoHeart /> : <IoHeartOutline />}
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                onClick={handleSave}
                loading={isPendingSaveThread}
                disabled={isPendingSaveThread}
            >
                {hasSaved === true ? <IoBookmark /> : <IoBookmarkOutline />}
            </ActionIcon>
        </Flex>
    );
}

function ThreadCard({ thread }: Props) {
    return (
        <Paper
            maw={{
                base: "auto",
                xs: "auto",
                md: "500px",
            }}
            w={"100%"}
            mx={"auto"}
        >
            <Card withBorder>
                <ThreadCardHeader thread={thread} />

                <ThreadCardContent thread={thread} />

                <ThreadCardFooter thread={thread} />
            </Card>
        </Paper>
    );
}

export default ThreadCard;
