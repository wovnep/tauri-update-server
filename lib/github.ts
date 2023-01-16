import dotenv from "dotenv"
dotenv.config()

const baseURL = `https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPO}/releases/latest`

export const github = async() => {
    const config = {
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    } 
    const response = await fetch(baseURL, process.env.API_KEY? config : undefined)
    return response.json()
}
export const getSignature = async(assetsURL:string) => {
    const response = await fetch(assetsURL, {
        headers: {
            "Accept": "application/octet-stream",
            "Authorization": process.env.API_KEY ? `Bearer ${process.env.API_KEY}` : undefined
        }
    })
    return response.text()
}