import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface IUserProvider {
    children: ReactNode
}

export interface IUserContent {
    token: string
    setToken: Dispatch<SetStateAction<string>>;
}

const defaultUserContent: IUserContent = {
    token: process.env.NEXT_PUBLIC_DEFAULT_TOKEN as string,
    setToken: () => {}
}

const UserContext = createContext<IUserContent>(defaultUserContent)

export const useIUser = () => {
    const context = useContext<IUserContent>(UserContext)
    if (!context) {
        throw new Error("useIUser must be used within a UserProvider")
    }
    return context

}

export const UserProvider = ({children}: IUserProvider) => {
    const [token, setToken] = useState(defaultUserContent.token)

    return (
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}