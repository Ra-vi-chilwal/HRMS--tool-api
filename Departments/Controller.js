const { Department } = require("./Model");

module.exports = {
    addDepartment: (req, res) => {
        Department.exists({ departmentName: req.body.departmentName }, (err, result) => {
            if (result) {
                return res.status(200).json({
                    code: "DUPLICATION",
                    data: "Department already exists."
                })
            }
            else if (!result) {
                const department = new Department({ ...req.body });
                department.save().then((result) => {
                    return res.status(200).json({
                        code: "CREATED",
                        data: result
                    })
                }).catch((error) => {
                    console.log(error)
                    return res.json({
                        code: "ERROROCCURED",
                        data: error,
                    })
                })
            }
            else {
                return res.status(400).json({
                    code: "ERROROCCURED",
                    data: err
                })
            }
        })
    },

    //--------------------GET DEPARTMENT----------------------------------
    getDepartment: (req, res) => {
        Department.find({}).exec((err, result) => {
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

}