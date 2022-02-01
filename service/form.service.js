module.exports = {
    userMapper: (userBody) => {
        const user = {}
        // console.log(userBody)
        user.firstName = userBody.firstName
        user.lastName = userBody.lastName
        user.state = userBody.state
        user.pincode = userBody.pincode
        user.address = userBody.address
        return user;
    }
}