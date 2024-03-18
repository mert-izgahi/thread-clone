import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useSaveThread() {
    const queryClient = useQueryClient();
    const { mutate: saveThread, isPending: isPendingSaveThread } = useMutation({
        mutationKey: ["saveThread"],
        mutationFn: async ({ threadId }: { threadId: string }) => {
            const res = await axios.post(`/api/threads/${threadId}/save`);
            if (res.status !== 200) {
                return null;
            }
            const thread = await res.data;
            return thread;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: () => {
            // TODO: Handle error
        },
    });

    return {
        saveThread,
        isPendingSaveThread,
    };
}

export default useSaveThread;
