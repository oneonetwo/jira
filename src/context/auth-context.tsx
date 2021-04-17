import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { createContext, ReactNode, useContext, useState } from "react";
import { User } from 'screens/project-list/search-panel';
import { useMount } from "utils";
import { http } from "utils/https";
import { useAsync } from "utils/useAsync";
import * as auth from './auth-provider';

const AuthContext = createContext<{
    user: User | null;
    login: (form: AuthForm) => Promise<void>;
    register: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext';
interface AuthForm {
    username: string;
    password: string;
}



const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token });
        user = data.user;
    }
    return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<User | null>(null);
    const { run, error, isLoading, isError, isIdel, data: user, setData: setUser } = useAsync<User|null>();

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(() => {
        // bootstrapUser().then(setUser);
        run(bootstrapUser());
    })
    //当处理登录接口时，保持loading的效果
    if (isIdel || isLoading) {
        return <FullPageLoading />
    }
    if(isError){
        return <FullPageErrorFallback error={error}/>
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("请正确使用context");
    }
    return context;
}