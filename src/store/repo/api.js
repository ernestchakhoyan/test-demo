import axios from "axios";
import { getGHUser } from "../user/api";

export const getGHRepos = async (username) => {
    const { login } = await getGHUser(username);
    const { data } = await axios.get(`https://api.github.com/users/${login}/repos`);

    return data.map(item => ({name: item.name, url: item.url}));
}
