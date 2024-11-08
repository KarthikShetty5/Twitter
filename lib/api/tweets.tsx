import { createContext, PropsWithChildren, useContext } from "react";
import { API_URL } from "./config";
import { useAuth } from "../../context/AuthContext";


const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({ children }: PropsWithChildren) => {
    const { authToken, removeAuthToken } = useAuth();

    const listTweets = async () => {
        if (!authToken) {
            return;
        }
        //fetch tweets
        const res = await fetch(`${API_URL}/tweet`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        if (res.status == 401) {
            removeAuthToken();
            throw new Error("Not Authorized. Please sign in");
        }
        if (res.status != 200) {
            throw new Error('Erorr fetching tweets');
        }
        return await res.json();
    }


    const getTweet = async (id: string) => {
        if (!authToken) {
            return;
        }
        const res = await fetch(`${API_URL}/tweet/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        if (res.status == 401) {
            throw new Error("Not Authorized. Please sign in");
        }
        if (res.status != 200) {
            throw new Error('Erorr fetching tweets');
        }
        return await res.json();
    }

    const createTweet = async (data: { content: string }) => {
        if (!authToken) {
            return;
        }
        const res = await fetch(`${API_URL}/tweet`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.status == 401) {
            throw new Error("Not Authorized. Please sign in");
        }
        if (res.status != 200) {
            throw new Error('Erorr creating tweets');
        }
        return await res.json();
    }

    return (
        <TweetsApiContext.Provider
            value={{
                listTweets,
                getTweet,
                createTweet,
            }}
        >
            {children}
        </TweetsApiContext.Provider>
    );
};
export default TweetsApiContextProvider;

export const useTweetsApi = () => useContext(TweetsApiContext);