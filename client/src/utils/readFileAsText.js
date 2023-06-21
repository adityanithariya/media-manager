const readAsText = (inputFile) => {
    const tempFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        tempFileReader.onerror = () => {
            tempFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        tempFileReader.onload = () => {
            resolve(tempFileReader.result);
        };
        tempFileReader.readAsDataURL(inputFile);
    });
};

export default readAsText;
