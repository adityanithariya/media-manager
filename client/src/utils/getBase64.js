const getBase64 = (arrayBuffer) => {
    const data = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return btoa(data);
};

export default getBase64;
