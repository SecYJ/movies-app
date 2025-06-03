import { formOptions } from "@tanstack/react-form";

export const getAuthFormOptions = (mode: "login" | "signup") => {
    return formOptions({
        defaultValues: {
            email: "",
            password: "",
            ...(mode === "signup" && {
                repeatPassword: "",
                username: "",
            }),
        },
    });
};
