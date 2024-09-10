import jsonToken from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
    const theCookie = cookies().get('genai')?.value;
    if (theCookie) {
        try {
            const decoded = jsonToken.verify(
              theCookie,
                process.env.JSON_TOKEN_KEY
            );
            return decoded
        } catch (error) {
            return null
        }
    }
}