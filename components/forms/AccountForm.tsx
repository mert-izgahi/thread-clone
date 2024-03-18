"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useUploadThing } from "../buttons/UploadButton";
import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import UploadAvatarField from "./UploadAvatarField";
import { IAccountFormInputs } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import { redirect } from "next/navigation";

interface Props {
    isOnBoarding: boolean;
}

function AccountForm({ isOnBoarding }: Props) {
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const [imagesBlob, setImagesBlob] = useState<File[] | null>(null);
    const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();
    const { updateUser, isPending } = useUpdateUser();

    const accountForm = useForm<IAccountFormInputs>({
        initialValues: {
            name: currentUser?.name || "",
            username: currentUser?.username || "",
            bio: currentUser?.bio || "",
            profilePhotoUrl: currentUser?.profilePhotoUrl || "",
            profileCompleted: currentUser?.profileCompleted || false,
        },

        validate: {
            username: (value) =>
                value.length < 2
                    ? "Username must have at least 2 letters"
                    : null,
            bio: (value) =>
                value.length < 2 ? "Bio must have at least 2 letters" : null,
        },
    });

    const handleSubmit = async (data: IAccountFormInputs) => {
        const imageHasChanged =
            data.profilePhotoUrl !== currentUser?.profilePhotoUrl;

        let newImage = null;

        if (imageHasChanged && imagesBlob) {
            // TODO: Upload image
            const uploadedImages = await startUpload(imagesBlob as File[]);
            if (uploadedImages && uploadedImages.length > 0) {
                newImage = uploadedImages[0].url;
                accountForm.setFieldValue("profilePhotoUrl", newImage);
            }
        }

        // TODO: Update user
        const args = {
            name: data.name,
            username: data.username,
            bio: data.bio,
            profilePhotoUrl: newImage,
            profileCompleted: true,
        } as IAccountFormInputs;

        await updateUser(args);
    };

    useEffect(() => {
        if (currentUser) {
            accountForm.setValues({
                name: currentUser.name,
                username: currentUser.username,
                bio: currentUser.bio,
                profilePhotoUrl: currentUser.profilePhotoUrl,
            });
        }

        if (isOnBoarding) {
            if (currentUser && currentUser.profileCompleted) {
                return redirect("/");
            }
        }
    }, [currentUser]);

    return (
        <form onSubmit={accountForm.onSubmit(handleSubmit)} noValidate>
            <Stack gap={"xl"}>
                <UploadAvatarField
                    form={accountForm}
                    setImagesBlob={setImagesBlob}
                />
                <TextInput
                    required
                    label="Name"
                    placeholder="Name"
                    {...accountForm.getInputProps("name")}
                />
                <TextInput
                    required
                    label="Username"
                    placeholder="Username"
                    {...accountForm.getInputProps("username")}
                />
                <Textarea
                    required
                    label="Bio"
                    placeholder="Bio"
                    {...accountForm.getInputProps("bio")}
                />

                <Button
                    disabled={isPending || isCurrentUserLoading || isUploading}
                    loading={isPending || isCurrentUserLoading || isUploading}
                    type="submit"
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default AccountForm;
