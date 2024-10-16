const errorhandler = async (err, req, res, next) => {
    console.log(`message:${err.message}`)
    let newerror = { username: '', password: '', errorMsg: '' }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            newerror[properties.path] = properties.message;
        })
    }
    if (err.code === 11000) {
        newerror.username = 'this user already exist'
    }
    if (err.message === 'No user found') {
        newerror.username = 'No user found'
    }
    if (err.message === 'incorrect password') {
        newerror.password = 'incorrect password'
    }
    else {
    newerror.errorMsg = err.message  
    }

res.status(500).json(newerror)

}

module.exports = errorhandler