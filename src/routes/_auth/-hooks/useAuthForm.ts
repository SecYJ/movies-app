import { useForm } from "@tanstack/react-form";

import { getAuthFormOptions } from "../-form/auth-form-options";
import { loginSchema, signupSchema } from "../-form/auth-schema";

export const useAuthForm = (mode: "login" | "signup") => {
    const form = useForm({
        ...getAuthFormOptions(mode),
        validators: {
            onSubmit: mode === "login" ? loginSchema : signupSchema,
        },
        onSubmit: async ({ value }) => {
            // Handle form submission
            console.log("Form submitted:", value);
        },
    });

    return form;
};
