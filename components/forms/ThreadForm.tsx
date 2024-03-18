"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { IThreadFormInputs } from "@/types";
import {
    Stack,
    Button,
    FileInput,
    TagsInput,
    TextInput,
    Textarea,
} from "@mantine/core";
import useCreateThread from "@/hooks/useCreateThread";
import { useUploadThing } from "../buttons/UploadButton";
import useUpdateThread from "@/hooks/useUpdateThread";
import useGetThread from "@/hooks/useGetThread";

function ThreadForm({ threadId }: { threadId?: string }) {
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const [imageBlob, setImageBlob] = useState<File | null>(null);
    const { createThread, isPendingCreateThread } = useCreateThread();
    const { updateThread, isPendingUpdateThread } = useUpdateThread();
    const { thread, isLoading } = useGetThread({
        threadId: threadId as string,
    });
    const threadForm = useForm<IThreadFormInputs>({
        initialValues: {
            title: "",
            content: "",
            image: "",
            tags: [],
        },

        validate: {
            title: (value) => (value.length > 0 ? null : "Title is required"),
            content: (value) =>
                value.length > 0 ? null : "Content is required",
            tags: (value) => (value.length > 0 ? null : "Tags are required"),
        },
    });

    const handleImageChange = (file: File | null) => {
        setImageBlob(file);
    };

    const onSubmit = async (data: IThreadFormInputs) => {
        let imageUrl = "";
        if (imageBlob) {
            // TODO: Upload image
            const uploadedImages = await startUpload([imageBlob] as File[]);
            if (uploadedImages && uploadedImages.length > 0) {
                const imgUrl = await uploadedImages[0].url;
                imageUrl = imgUrl;
            }
        }

        // Create thread
        if (!isUploading) {
            if (threadId) {
                await updateThread({
                    threadId: threadId,
                    args: {
                        title: data.title,
                        content: data.content,
                        image: imageUrl,
                        tags: data.tags,
                    },
                });
            } else {
                console.log({
                    title: data.title,
                    content: data.content,
                    image: imageUrl,
                    tags: data.tags,
                });

                await createThread({
                    title: data.title,
                    content: data.content,
                    image: imageUrl,
                    tags: data.tags,
                });

                threadForm.reset();
                setImageBlob(null);
            }
        }
    };

    useEffect(() => {
        if (thread) {
            threadForm.setFieldValue("title", thread?.title);
            threadForm.setFieldValue("content", thread?.content);
            threadForm.setFieldValue("image", thread?.image);
            threadForm.setFieldValue("tags", thread?.tags);
        }
    }, [thread]);

    return (
        <form onSubmit={threadForm.onSubmit(onSubmit)} noValidate>
            <Stack>
                <TextInput
                    label="Title"
                    placeholder="Title"
                    {...threadForm.getInputProps("title")}
                />
                <Textarea
                    label="Content"
                    placeholder="Content"
                    {...threadForm.getInputProps("content")}
                />

                <FileInput
                    label="Image"
                    {...threadForm.getInputProps("image")}
                    value={imageBlob}
                    onChange={handleImageChange}
                />

                <TagsInput label="Tags" {...threadForm.getInputProps("tags")} />

                <Button
                    type="submit"
                    disabled={
                        isPendingCreateThread ||
                        isPendingUpdateThread ||
                        isUploading
                    }
                    loading={
                        isPendingCreateThread ||
                        isPendingUpdateThread ||
                        isUploading
                    }
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default ThreadForm;
