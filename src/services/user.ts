import { queryOptions } from "@tanstack/react-query";

import { getUser } from "@/db/user";

export const getUserQueryOptions = () => {
    return queryOptions({
        queryKey: ["user"],
        queryFn: getUser,
    });
};
