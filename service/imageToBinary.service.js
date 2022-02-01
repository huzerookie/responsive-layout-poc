const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

module.exports = {
    saveCover: (coverEncoded) => {
        if (coverEncoded == null) return
        const cover = JSON.parse(coverEncoded)
        if (cover != null && imageMimeTypes.includes(cover.type)) {
            coverImage = new Buffer.from(cover.data, 'base64')
            coverImageType = cover.type
            return { coverImage, coverImageType }
        }
    }

}