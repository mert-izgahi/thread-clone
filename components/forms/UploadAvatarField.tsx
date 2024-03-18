import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { Avatar, Button, FileButton, Stack } from "@mantine/core";
import { IoImageOutline } from "react-icons/io5";
import { IAccountFormInputs } from "@/types";

function UploadAvatarField({
    form,
    setImagesBlob,
}: {
    form: UseFormReturnType<IAccountFormInputs>;
    setImagesBlob: any;
}) {
    const handleImageChange = (e: File) => {
        const reader = new FileReader();

        if (e) {
            reader.onload = (event) => {
                if (event?.target?.result) {
                    form.setFieldValue(
                        "profilePhotoUrl",
                        event.target.result as string
                    );
                }
            };

            const files = [e];

            reader.readAsDataURL(e);
            setImagesBlob(files);
        }
    };

    return (
        <Stack align="center" gap="md">
            <Avatar
                src={form.values.profilePhotoUrl}
                alt="Profile Photo"
                size={100}
                radius={"sm"}
            />

            <FileButton
                multiple={false}
                onChange={(e) => handleImageChange(e as File)}
            >
                {(props) => (
                    <Button
                        leftSection={<IoImageOutline />}
                        variant="outline"
                        color="dark"
                        size="sm"
                        type="button"
                        {...props}
                    >
                        Upload
                    </Button>
                )}
            </FileButton>
        </Stack>
    );
}

export default UploadAvatarField;
