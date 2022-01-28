fetch('/images').then(res => res.json()).then(images => {
    console.log(images)
    /*  < div class="column marginDivider" >
         <div class="ui fluid card">
             <div class="image">
                 <img src="/images/avatar/large/daniel.jpg" />
             </div>
         </div>
     </ > */
    const parentDiv = document.querySelector(".doubling.four.column.row")

    for (image of images) {
        const divImage = createImageDiv(image.coverImage)
        parentDiv.appendChild(divImage)
    }
}).catch(e => console.log(e))

const createImageDiv = (image) => {
    const img = document.createElement('img');
    img.src = image

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