import { deleteAccessToken } from "./deleteAccessToken";

export const logout = async (profile) => {
 try {
 await fetch("http://localhost:3333/logout", {
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
