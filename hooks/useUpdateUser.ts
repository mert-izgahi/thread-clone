import { IAccountFormInputs } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useUpdateUser() {
    const { mutate: updateUser, isPending } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: async (data: IAccountFormInputs) => {
            const res = await axios.put("/api/users/me", data);
            if (res.status !== 200) {
                return null;
            }

            const user = await res.data;
            return user;
        },
    });
    return {
        updateUser,
        isPending,
    };
}

export default useUpdateUser;
