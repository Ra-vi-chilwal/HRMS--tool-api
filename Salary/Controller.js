const { Users } = require("../Auth/Model")
const { Salary } = require("./Model")

module.exports = {
    //     addSalary: (req, res) => {
    // Salary.exists({}),(arr,key){

    // }
    //         Salary.exists({ month: req.body[0].month, employee: req.body.employee }, (err, result) => {
    //             if (result) {
    //                 return res.status(200).json({
    //                     code: "DUPLICATION",
    //                     data: "Salary already exists."
    //                 })
    //             }
    //             else if (!result) {

    //                 const arr = req.body
    //                 for

    //                 function getUniqueListBy(arr, key) {
    //                     return [...new Map(arr.map(item => [item[key], item])).values()]
    //                 }
    //                 const arr1 = getUniqueListBy(arr, 'empId' && 'month')
    //                 Salary.insertMany(arr1).then((result) => {
    //                     return res.status(200).json({
    //                         code: "CREATED",
    //                         data: result
    //                     })
    //                 }).catch((err) => {
    //                     return res.status(400).json({
    //                         code: "ERROROCCURED",
    //                         data: err
    //                     })
    //                 })
    //             }
    //             else {
    //                 return res.status(400).json({
    //                     code: "ERROROCCURED",
    //                     data: err
    //                 })
    //             }
    //         })
    //     },

    addSalary: (req, res) => {
        const arr = req.body;
        var promises = [];
        for (let i = 0; i < arr.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                Salary.exists({ empId: arr[i].empId, month: arr[i].month, year: arr[i].year }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    else if (result) {
                        resolve(`Salary of Empid ${arr[i].empId} of ${arr[i].month} ${arr[i].year} already exists`)
                    }
                    else {
                        const salary = new Salary({ ...arr[i] });
                        salary.save().then((result) => {
                            resolve(`Salary of Empid ${arr[i].empId} of ${arr[i].month} ${arr[i].year} has been added.`)
                        }).catch((error) => {
                            reject(error)
                        })
                    }
                })
            }))
        }
        Promise.all(promises).then((result) => {
            return res.status(200).json({
                code: "CREATED",
                data: result
            })
        }).catch((error) => {
            return res.status(400).json({
                code: "ERROROCCURED",
                data: error
            })
        })

    },

    getSalary: (req, res) => {
        Salary.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "empId",
                    foreignField: "empId",
                    as: "user"
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "department",
                    localField: "user.department",
                    foreignField: "_id",
                    as: "user.department",
                }
            },
            {
                $lookup: {
                    from: "designation",
                    localField: "user.designation",
                    foreignField: "_id",
                    as: "user.designation",
                }
            },
            {
                $project: {
                    "user.password": 0,
                }
            },
            {
                $match: {
                    "month": req.body.month,
                    "year": req.body.year
                }
            }
        ]).exec((err, result) => {

            if (err) {
                return res.status(400).json({
                    code: "ERROROCCURED",
                    data: err
                })
            }
            else {
                return res.status(200).json({
                    code: "FETCHED",
                    data: result
                })
            }
        })
    },
    getOne: (req, res) => {
        const monthArray = ['January', 'February',
            'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November',
            'December'];
        const currentYear = new Date().getFullYear();
        Salary.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "empId",
                    foreignField: "empId",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "department",
                    localField: "user.department",
                    foreignField: "_id",
                    as: "user.department",
                }
            },
            {
                $lookup: {
                    from: "designation",
                    localField: "user.designation",
                    foreignField: "_id",
                    as: "user.designation",
                }
            },
            {
                $project: {
                    "user.password": 0
                }
            },
            {
                $match: {
                    "empId": req.user && req.user.empId,

                },


            },
            {
                $match: {
                    "month": req.body.month,
                    "year": req.body.year

                },
            },

        ]).exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    code: "ERROROCCURED",
                    data: err
                })
            }
            else {
                return res.status(200).json({
                    code: "FETCHED",
                    data: result
                })
            }
        })
    },
    DeleteSalary: (req, res) => {
   
        Salary.findByIdAndDelete({ _id: req.body._id }, async (err, result) => {
       
            if (result) {
                await res.status(200).json({
                    code: "DELETE",
                    data: result,
                });
            } else {
                await res.status(400).json({
                    code: "ERROROCCURED",
                    data: err,
                });
            }
        })
    },
}