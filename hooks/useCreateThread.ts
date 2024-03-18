import { IThreadFormInputs } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useCreateThread() {
    const queryClient = useQueryClient();
    const { mutate: createThread, isPending: isPendingCreateThread } =
        useMutation({
            mutationKey: ["createThread"],
            mutationFn: async (args: IThreadFormInputs) => {
                const res = await axios.post("/api/threads", args);

                if (res.status !== 200) {
                    return null;
                }
                const thread = await res.data;
                return thread;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["threads"] });
            },

            onError: () => {
                // TODO: Handle error
            },
        });

    return {
        createThread,
        isPendingCreateThread,
    };
}

export default useCreateThread;
