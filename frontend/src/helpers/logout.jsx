import { deleteAccessToken } from "./deleteAccessToken";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

export const logout = async (profile) => {
 try {
 await fetch(`${SERVER_URL}/logout`, {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(profile),
 });

 deleteAccessToken("accessToken");
 localStorage.removeItem("ProfileInfo");
 } catch (error) {
 console.log(error);
 }
};
