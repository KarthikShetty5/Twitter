import { API_URL } from "./config"

export const login = async (data: { email: string }) => {
    const res = await fetch('http://192.168.225.168:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(data)
    });
    if (res.status != 200) {
        throw new Error("Error during login process");
    }
}

export const authenticate = async (data: {
    email: string,
    emailToken: number,
}) => {
    const res = await fetch('http://192.168.225.168:3000/auth/authenticate', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(data)
    });
    if (res.status != 200) {
        throw new Error("Error during login process");
    }
    return res.json();
}
