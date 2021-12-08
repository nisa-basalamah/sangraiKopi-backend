const Admin = require('../models/auth');

exports.login = (req, res, next) => {
    const adminId = req.params.adminId;

    Admin.findById(adminId)
    .then(result => {
        if(!result) {
            const error = new Error('Admin tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        // find by username

        res.status(200).json({
            message: 'Login Success',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })

    // const username = req.body.username;
    // const password = req.body.password;

    // const result = {
    //     message: 'Login Success',
    //     data: {
    //         uid: 1,
    //         username: username
    //     }
    // }
    // res.status(201).json(result);
}

exports.getAllAdmin = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 3;
    let totalItems;

    Admin.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return Admin.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Admin Berhasil dipanggil',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage)
        })
    })
    .catch(err => {
        next(err);
    })
}

// add new admin (NOT NEED TO USE)
// exports.register = (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;

//     const Register = new Admin({
//         username: username,
//         password: password,
//         email: email,
//     })

//     Register.save()
//     .then(result => {
//         res.status(201).json({
//             message: 'Create Admin Success',
//             data: result
//         });
//     })
//     .catch(err => {
//         console.log('err: ', err);
//     });
// }