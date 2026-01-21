export const getAccessToken = (cookieName) => {
 const cookies = document.cookie.split(";");

 for (const cookie of cookies) {
 const data = cookie.split("=");
 const [name, value] = data;

 if (name.trim() === cookieName) {
 return value.trim();
 }
 }
 return null;
};
