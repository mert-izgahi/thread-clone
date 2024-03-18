import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useGetThreads() {
    const {
        data: threads,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            const res = await axios.get("/api/threads");
            if (res.status !== 200) {
                return null;
            }
            const threads = await res.data;
            return threads;
        },
    });

    return {
        threads,
        isLoading,
        error,
    };
}

export default useGetThreads;
