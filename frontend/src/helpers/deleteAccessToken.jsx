export const deleteAccessToken = (cookieName) => {
 const allCookies = document.cookie;
 const cookieExists = allCookies.includes(`${cookieName}=`);

 if (cookieExists) {
 document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

 console.log(`Cookie '${cookieName}' deleted.`);
 } else {
 console.log(`Cookie '${cookieName}' not found.`);
 }
};
