export const setAccessTokenCookie = (key, value, expirationMinutes) => {
 const now = new Date();
 const expirationTime = now.getTime() + expirationMinutes * 60 * 1000;
 const expirationDate = new Date(expirationTime);

 // Set the cookie
 document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
};
