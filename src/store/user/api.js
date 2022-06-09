import axios from "axios";

export const getGHUser = async (userId) => {
    const { data } = await axios.get(`https://api.github.com/users/${userId}`);
    return data;
};
