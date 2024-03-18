import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useDeleteThread() {
    const queryClient = useQueryClient();
    const { mutate: deleteThread, isPending: isPendingDeleteThread } =
        useMutation({
            mutationKey: ["deleteThread"],
            mutationFn: async ({ threadId }: { threadId: string }) => {
                const res = await axios.delete(`/api/threads/${threadId}`);
                if (res.status !== 200) {
                    return null;
                }
                return res.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["threads"] });
            },

            onError: () => {
                // TODO: Handle error
            },
        });

    return {
        deleteThread,
        isPendingDeleteThread,
    };
}

export default useDeleteThread;
