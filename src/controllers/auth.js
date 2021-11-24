exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = {
        message: 'Login Success',
        data: {
            uid: 1,
            username: username
        }
    }
    res.status(201).json(result);
}