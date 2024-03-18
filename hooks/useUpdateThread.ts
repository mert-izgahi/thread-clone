import { IThreadFormInputs } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useUpdateThread() {
    const queryClient = useQueryClient();
    const { mutate: updateThread, isPending: isPendingUpdateThread } =
        useMutation({
            mutationKey: ["updateThread"],
            mutationFn: async ({
                threadId,
                args,
            }: {
                threadId: string;
                args: IThreadFormInputs;
            }) => {
                const res = await axios.put(`/api/threads/${threadId}`, args);
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
        updateThread,
        isPendingUpdateThread,
    };
}

export default useUpdateThread;
