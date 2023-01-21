const { Leaves } = require("./Model");
const LeavesPolicy = require("./Constant");
const { Users } = require("../Auth/Model");
module.exports = {
    leavesList: (req, res) => {
        res.status(200).json({
            data: LeavesPolicy,
            code: "FETCHED"
        })
    },
    applyLeave: (req, res) => {
        const leaves = new Leaves({ ...req.body, empId: req.user.empId, reportingManager: req.user.reportingManager });
        leaves.save((error, result) => {
            if (error) {
                res.send(error)
            }
            else {
                res.send(result)
            }
        })
    },
    LeaveApproval: (req, res) => {
        const _id = req.body._id;
        const remainLeaves = req.body.remainLeaves;
        const from = req.body.from;
        const to = req.body.to;
        const numberofLeaves = req.body.numberofLeaves;
        const empId = req.body.empId;
        const reason = req.body.reason;
        const status = req.body.status;
        if (status === "Approved") {

        }
        else {

        }
    },
    getLeaveOfEmpByMonth: (req, res) => {

        Leaves.aggregate(
            [
                {
                    $project:
                    {
                        year: { $year: { $toDate: "$from" } },
                        month: { $month: { $toDate: "$from" } },
                        status: 1,
                        empId: 1,
                        numberofLeaves: 1,
                        leaveType: 1
                    }
                },
                {
                    $match: {
                        empId: req.user.empId,
                        status: "Approved",
                        leaveType: req.body.leaveType,
                        month: req.body.month,
                        year: req.body.year
                    }
                },
                {
                    $group:
                    {
                        _id: req.user.empId,
                        leaves: { $sum: "$numberofLeaves" },
                    }
                }

            ]
        ).exec((err, result) => {

            if (result) {
                res.status(200).send(result)
            }
            else {
                res.status(200).send(err)
            }
        })

    },

    getLeave: (req, res) => {
        if (req.user.role === "hr") {
            Leaves.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "empId",
                        foreignField: "empId",
                        as: "employee"
                    },
                },
                {
                    $project: {
                        "employee.password": 0,
                    }
                },
                {
                    $match: {
                        "reportingManager": req.user.empId,

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
        }
        else {

            Leaves.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "empId",
                        foreignField: "empId",
                        as: "employee"
                    },
                },
                {
                    $project: {
                        "employee.password": 0,
                    }
                },
                {
                    $match: {
                        "reportingManager": req.user.empId,

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

        }
    },
    userLeave: (req, res) => {
        Leaves.find({ empId: req.user.empId }).exec((err, result) => {
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
    updateStatus: (req, res) => {
        Leaves.findByIdAndUpdate(req.body._id, { ...req.body }, async (err, result) => {
            if (err) {
                await res.status(400).json({
                    code: "ERROROCCURED",
                    data: err,
                })
            } else {
                if (req.body.status === "Approved") {
                    Users.findOne({ empId: result.empId }).exec((err, user) => {
                        if (user) {
                            Users.findOneAndUpdate({ empId: result.empId }, { [`remainLeaves.${result.leaveType}`]: user.remainLeaves[result.leaveType] - result.numberofLeaves }).exec((err, remainLeaves) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    console.log(remainLeaves)
                                }
                            })
                        }
                        else {
                            console.log(err)
                        }
                    })
                }

            }
        });

    },
    addLeave: (req, res) => {
        Users.findOne({ empId: req.body.empId }).exec((err, result) => {
            if (result) {
                const reportingManager = result.reportingManager;
                const leaves = new Leaves({ ...req.body, reportingManager: reportingManager, status: "Approved" })
                leaves.save().then((result) => {
                    res.status(200).json({
                        code: "UPDATE",
                        data: result
                    })
                }).catch((error) => {
                    res.status(200).json({
                        code: "error",
                        data: error
                    })
                })
            }
            else {
                // console.log(result)
                console.log(err)
            }
        })
    }
}