import { createContext, useContext, useEffect, useState } from "react";
import { useAuthMe } from "../features/auth/hooks/useAuth";
import type { ReactNode } from "react";
import type { User } from "../features/user/types/userTypes";

type AuthMeType = {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
};

const AuthContext = createContext<AuthMeType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, isLoading, isError } = useAuthMe();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        if (user?.data) setCurrentUser(user.data);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user: currentUser, isLoading, isError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthMeType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
