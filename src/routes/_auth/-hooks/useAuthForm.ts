import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { getAuthFormOptions } from "../-form/auth-form-options";
import { loginSchema, signupSchema } from "../-form/auth-schema";

import { createUser, loginUser } from "@/db/user";

export const useAuthForm = (mode: "login" | "signup") => {
    const router = useRouter();

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            router.navigate({ to: "/" });
        },
    });

    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.navigate({ to: "/" });
        },
    });

    const form = useForm({
        ...getAuthFormOptions(mode),
        validators: {
            onSubmit: mode === "login" ? loginSchema : signupSchema,
        },
        onSubmit: async ({ value }) => {
            if (mode === "login") {
                const parsedLogin = loginSchema.safeParse(value);

                if (parsedLogin.success) {
                    loginUserMutation.mutate({
                        data: parsedLogin.data,
                    });
                }
            } else {
                const parsedSignUp = signupSchema.safeParse(value);

                if (parsedSignUp.success) {
                    createUserMutation.mutate({
                        data: parsedSignUp.data,
                    });
                }
            }
        },
    });

    return form;
};
