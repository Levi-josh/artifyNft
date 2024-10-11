const errorhandler = async (err, req, res, next) => {
    console.log(`message:${err.message}`)
    console.log(`err:${err}`)
    //  let newerror = { username: '', password: '', other: '' }
    //     if (err.message.includes('User validation failed')) {
    //         Object.values(err.errors).forEach(({ properties }) => {
    //             newerror[properties.path] = properties.message;
    //         })
    //     }
    //     if (err.code === 11000) {
    //         newerror.username = 'this user already exist'
    //     }
        res.status(500).json(err.message)
}

module.exports = errorhandler