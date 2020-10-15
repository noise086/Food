const postData = async function (url, data) {
    const res = await axios.post(url, data);
    return await res;
};
function getResours(url) {
    return axios.get(url);
}

export {postData};
export {getResours};