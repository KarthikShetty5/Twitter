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