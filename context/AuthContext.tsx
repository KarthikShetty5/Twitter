import { useRouter, useSegments } from 'expo-router';
import { PropsWithChildren, createContext, useState, useContext, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);

    //if we have authtoken then it means we r authenticated and we can safely push to homepage and its done by listeners
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';
        if (!authToken || !isAuthGroup) {
            router.replace('/signin');
        }
        if (authToken && isAuthGroup) {
            router.replace('/');
        }

    }, [segments, authToken])

    useEffect(() => {
        const loadAuthToken = async () => {
            const res = await SecureStore.getItemAsync('authToken');
            if (res) {
                setAuthToken(res);
            }
        }
        loadAuthToken();
    })

    const updateAuthToken = async (newToken: string) => {
        await SecureStore.setItemAsync('authToken', newToken);
        setAuthToken(newToken);
    }

    return (
        <AuthContext.Provider value={{ authToken, updateAuthToken }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);