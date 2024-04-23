export const saveData = (key: string, data: any) => {
    return chrome.storage.local.set({[key]: data});
}

export const fetchData = async (key: string) => {
    const data = await chrome.storage.local.get(key);
    return data[key];
}

export const fetchCredentials = async () => {
    const data = await fetchData("options");
    return {url: data?.apiUrl, token: data?.apiKey};
}