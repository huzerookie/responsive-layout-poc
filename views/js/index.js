const extractImageAndSendToDB = async function () {
    try {
        const coverImage = await imageExtractor();
        console.log(document.querySelector("#coverImage"))
        cribsFactory.saveImage(coverImage);
    } catch (e) {
        console.log(e);
    }
}

const saveImage = async (coverImage) => {
    const response = await fetch('/save-image');
    const json = await JSON.stringify(response.json());
    console.log(json)
    return json;
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function imageExtractor(event) {
    const file = document.querySelector('#coverImage').files[0];
    console.log(file)
    console.log(file.type)
    return await toBase64(file);
}

function browseImages() {
    window.location.href = "/browse";
}