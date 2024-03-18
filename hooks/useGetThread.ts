import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetThread({ threadId }: { threadId: string }) {
    const { data: thread, isLoading } = useQuery({
        queryKey: ["thread", threadId],
        queryFn: async () => {
            const res = await axios.get(`/api/threads/${threadId}`);
            return res.data;
        },

        enabled: !!threadId,
    });

    return { thread, isLoading };
}

export default useGetThread;
