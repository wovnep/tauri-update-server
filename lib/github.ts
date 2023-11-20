import dotenv from 'dotenv';
dotenv.config({ override: true });

const baseURL = `https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPO}/releases/latest`;

export const github = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
        },
    };
    const response = await fetch(baseURL, process.env.API_KEY ? config : undefined);
    if(response.status == 404) throw new Error("Github repository not found. Provide API_KEY for private repositories.")
    return response.json();
};
export const getSignature = async (assetsURL: string) => {
    const response = await fetch(assetsURL, {
        headers: {
            Accept: 'application/octet-stream',
            Authorization: process.env.API_KEY ? `Bearer ${process.env.API_KEY}` : undefined,
        },
    });
    return response.text();
};
export const getDirectUrl = async(assets_url: string) => {
    const response = await fetch(assets_url, {
        headers: {
            Accept: 'application/octet-stream',
            Authorization: `token ${process.env.API_KEY}`
        },
        redirect: 'manual',
    });
    return response.headers.get('location')
}