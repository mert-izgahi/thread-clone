import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useLikeThread() {
    const queryClient = useQueryClient();

    const { mutate: likeThread, isPending: isPendingLikeThread } = useMutation({
        mutationKey: ["likeThread"],
        mutationFn: async ({ threadId }: { threadId: string }) => {
            const res = await axios.post(`/api/threads/${threadId}/like`);
            if (res.status !== 200) {
                return null;
            }
            const thread = await res.data;
            return thread;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["thread", data?._id] });
        },
        onSettled: (data) => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["thread", data?._id] });
        },
        onError: () => {
            // TODO: Handle error
        },
    });

    return {
        likeThread,
        isPendingLikeThread,
    };
}

export default useLikeThread;
