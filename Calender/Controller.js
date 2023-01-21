
const { Calender } = require("./Model")
module.exports = {
    addCalender: (req, res) => {
        Calender.exists({ year: req.body.year }, (err, result) => {
            if (result) {
                return res.status(200).json({
                    code: "DUPLICATION",
                    data: "Calender already exists."
                })
            }
            else if (!result) {
                Calender.insertMany(req.body).then((result) => {
                    return res.status(200).json({
                        code: "CREATED",
                        data: result
                    })
                }).catch((err) => {
                    return res.status(400).json({
                        code: "ERROROCCURED",
                        data: err
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

    getCalender: (req, res) => {
        Calender.find({}).exec((err, result) => {
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