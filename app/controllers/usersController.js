const userModel = require('../models/userModel');

exports.userList = async (req, res, next) => {
    let projection = {}
    if (req.query.hasOwnProperty('fields')) {
        projection = req.query.fields.split(',').reduce((total, current) => {
            return { [current]: 1, ...total }
        }, {})
    }
    const perPage = 10;
    const page = parseInt(req.query.page);
    const fieldsURL = req.query.fields;
    const offset = (page - 1) * perPage;
    const totalUsers = await userModel.count();
    const totalPage = Math.ceil(totalUsers / perPage);
    const users = await userModel.find({}, projection).limit(perPage).skip(offset);
    res.status(200).send({
        users,
        meta: {
            CurrentURL: page,
            pages: totalPage,
            nextPage: hasNextPage(page, totalPage) ? `${process.env.APP_URL}:${process.env.APP_PORT}/api/v1/user?fields=${fieldsURL}&page=${page + 1}` : null,
            prevPage: hasPrevPage(page, totalPage) ? `${process.env.APP_URL}:${process.env.APP_PORT}/api/v1/user?fields=${fieldsURL}&page=${page - 1}` : null
        }
    })


}
const hasNextPage = (page, totalPage) => {
    return totalPage > page;
}
const hasPrevPage = (page, totalPage) => {
    return page > 1;
}


exports.addUser = async (req, res, next) => {
    try {
        const { first_name, last_name, mobile, email } = req.body;
        if (first_name == undefined || '', last_name == undefined || '', mobile == undefined || '', email == undefined || '') {
            return res.status(422).send({
                error: true,
                message: 'اطلاعات ارسالی برای ایجاد کاربر معتبر نمیباشد'
            })
        }
        const newUser = new userModel({
            first_name,
            last_name,
            mobile,
            email
        })
        await newUser.save()
        res.status(201).send({
            success: true,
            message: 'کاربر با موفقیت ایجاد شد',
            newUser
        })

    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                error: true,
                message: 'کاربر با این مشخصات یافت نشد'
            })
        }
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'کاربر با این مشخصات یافت نشد'
            })
        }
        return res.status(200).send({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.userRemove = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).send({
                error: true,
                message: 'کاربر با این مشخصات یافت نشد'
            })
        }
        const user = await userModel.deleteOne({ _id: id });
        if (user.deletedCount == 0) {
            return res.status(404).send({
                error: true,
                message: ' کاربر با این مشخصات یافت نشد'
            })
        }
        res.status(202).send({
            success: true,
            message: 'کاربر با موفقیت حذف شد'
        })
    } catch (error) {
        next(error)
    }
}
exports.userUpdate = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).send({
                error: true,
                message: 'کاربر با این مشخصات یافت نشد'
            })
        }
        const user = await userModel.updateOne({ _id: id }, { ...req.body });
        if (user.matchedCount == 0) {
            return res.status(404).send({
                error: true,
                message: ' کاربر با این مشخصات یافت نشد'
            })
        }
        res.status(202).send({
            success: true,
            message: ' اطلاعات کاربر با موفقیت به روز رسانی شد'
        })
    } catch (error) {
        next(error)
    }
}

