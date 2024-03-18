"use client";
import { IUser } from "@/server/models/User.model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useCurrentUser(): { currentUser: IUser | null; isLoading: boolean } {
    const { data, isLoading } = useQuery<IUser | null>({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await axios.get("/api/users/me");
            if (res.status !== 200) {
                return null;
            }
            const currentUser = await res.data;
            return currentUser;
        },
    });

    return { currentUser: data as IUser, isLoading };
}

export default useCurrentUser;
