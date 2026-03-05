import { useQuery } from "@tanstack/react-query";
import { testFunc } from "../firebase/db";
import { useAuth } from "./auth-context";


export const useUserData = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["userData", user?.uid],
        queryFn: () => testFunc(user!.uid),
        enabled: !!user, // only run when logged in
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
