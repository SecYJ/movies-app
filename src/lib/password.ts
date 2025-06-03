import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string) => {
    return await hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string,
) => {
    return await compare(password, hashedPassword);
};
