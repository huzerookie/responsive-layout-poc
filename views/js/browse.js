fetch('/images').then(res => res.json()).then(images => {
    const parentDiv = document.querySelector(".doubling.four.column.row")
    if (!Object.keys(images).length) {
        const errorDiv = document.createElement('div')
        errorDiv.textContent = "No images found to preview!"
        parentDiv.appendChild(errorDiv);
        return;
    }
    for (image of images) {
        const divImage = createImageDiv(image)
        parentDiv.appendChild(divImage)
    }
}).catch(e => console.log(e))

//const convertBinaryToImageFormat = image => `data:${image.coverImageType};charset=utf-8;base64,${image.coverImage.data.toString('base64')}`;

const createImageDiv = (image) => {
    const img = document.createElement('img');
    img.src = image;

    const imageDiv = document.createElement('div')
    imageDiv.className = 'image'
    imageDiv.appendChild(img)

    const cardDiv = document.createElement('div')
    cardDiv.className = 'ui fluid card'
    cardDiv.appendChild(imageDiv)

    const marginDividerDiv = document.createElement('div')
    marginDividerDiv.className = 'column marginDivider'
    marginDividerDiv.appendChild(cardDiv)

    return marginDividerDiv
}