export const profileInLocalStorage = (data) => {
 localStorage.setItem("ProfileInfo", JSON.stringify(data));
};

export const getLocalProfile = () => {
 const data = localStorage.getItem("ProfileInfo");
 if (!data) {
 return null;
 } else {
 return JSON.parse(data);
 }
};

export const setLocalCart = (data) => {
 localStorage.setItem("myCart", JSON.stringify(data));
};

export const getLocalCart = () => {
 const data = localStorage.getItem("myCart");
 if (!data) {
 return [];
 } else {
 return JSON.parse(data);
 }
};

export const setLocalSeclectedProduct = (data) => {
 localStorage.setItem("selectedProduct", JSON.stringify(data));
};

export const getLocalSeclectedProduct = () => {
 const data = localStorage.getItem("selectedProduct");

 if (!data) {
 return [];
 } else {
 return JSON.parse(data);
 }
};
