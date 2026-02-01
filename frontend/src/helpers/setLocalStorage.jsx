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

// Helper to get current user ID prefix
const getUserPrefix = () => {
    const profile = getLocalProfile();
    return profile && profile._id ? `user_${profile._id}_` : "guest_";
};

export const setLocalCart = (data) => {
    localStorage.setItem(`${getUserPrefix()}cart`, JSON.stringify(data));
};

export const getLocalCart = () => {
    const data = localStorage.getItem(`${getUserPrefix()}cart`);
    if (!data) {
        return [];
    } else {
        return JSON.parse(data);
    }
};

export const setLocalSeclectedProduct = (data) => {
    localStorage.setItem(`${getUserPrefix()}selectedProduct`, JSON.stringify(data));
};

export const getLocalSeclectedProduct = () => {
    const data = localStorage.getItem(`${getUserPrefix()}selectedProduct`);

    if (!data) {
        return [];
    } else {
        return JSON.parse(data);
    }
};
