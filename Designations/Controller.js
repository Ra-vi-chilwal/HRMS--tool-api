const { Designation } = require("./Model");

module.exports = {
    addDesignation: (req, res) => {
        Designation.exists({ designation: req.body.designation, departmentName: req.body.departmentName }, (err, result) => {
            if (result) {
                return res.status(200).json({
                    code: "DUPLICATION",
                    data: "Designation already exists."
                })
            }
            else if (!result) {
                const designation = new Designation({ ...req.body });
                designation.save().then((result) => {
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

    getDesignation: (req, res) => {
        Designation.find({}).exec((err, result) => {
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
}