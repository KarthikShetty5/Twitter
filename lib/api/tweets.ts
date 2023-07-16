import { API_URL, authToken } from "./config";

export const listTweets = async () => {
    //fetch tweets
    const res = await fetch(`${API_URL}/tweet`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    if (res.status == 401) {
        throw new Error("Not Authorized. Please sign in")
    }
    if (res.status != 200) {
        throw new Error('Erorr fetching tweets');
    }
    return await res.json();
}


export const getTweet = async (id: string) => {
    const res = await fetch(`${API_URL}/tweet/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    if (res.status == 401) {
        throw new Error("Not Authorized. Please sign in")
    }
    if (res.status != 200) {
        throw new Error('Erorr fetching tweets');
    }
    return await res.json();
}

export const createTweet = async (data: { content: string }) => {
    const res = await fetch(`${API_URL}/tweet`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (res.status == 401) {
        throw new Error("Not Authorized. Please sign in")
    }
    if (res.status != 200) {
        throw new Error('Erorr creating tweets');
    }
    return await res.json();
}