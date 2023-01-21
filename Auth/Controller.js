const { Users } = require("./Model");
const { sign } = require("jsonwebtoken")
// const  bcrypt = require('bcrypt');
const { compare, hash } = require("bcrypt");
const path = require("path");
var bodyParser = require('body-parser')
const fs = require("fs");
require("dotenv").config();
module.exports = {
  register: (req, res) => {
    Users.exists({ email: req.body.email }, (err, result) => {
      if (result) {
        return res.status(200).json({
          code: "DUPLICATION",
        })
      }
      else {
        hash(req.body.password, 10, (err, hash) => {
          if (hash) {
            const date1 = new Date(`${new Date().getFullYear()}-12-31`);
            const date2 = new Date(req.body.doj);
            let availLeaves = 0
            if (date2.getFullYear() === new Date().getFullYear()) {
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              availLeaves = Math.round((7 / 365) * diffDays);
            }
            const user = new Users({ ...req.body, password: hash, "remainLeaves.SKL": availLeaves / 2, "remainLeaves.CSL": availLeaves / 2 });
            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  code: "ERROROCCURED",
                  data: err
                })
              }
              else {
                return res.status(200).json({
                  code: "CREATED",
                  data: result
                })
              }
            })
          }
        })
      }
    })
  },

  //---------------------Login----------------------------
  login: (req, res) => {
    Users.findOne({ email: req.body.email }).populate("role").populate("department").
      populate("designation").exec((err, user) => {
        if (err) {
          return res.status(400).json({
            code: "ERROROCCURED",
            data: err
          })
        }
        if (!user) {
          return res.status(200).json({
            code: "NOTFOUND"
          })
        }
        compare(req.body.password, user.password, (err, result) => {
          if (err) {
            console.log(err)
            return res.status(400).json({
              code: "ERROROCCURED",
              data: err
            })
          }
          else if (!result) {
            return res.status(200).json({
              code: "UNAUTHORISED",
            })
          }
          if (result) {
            const token = sign({
              _id: user && user._id,
              empId: user && user.empId,
              firstName: user && user.firstName,
              lastName: user && user.lastName,
              email: user && user.email,
              salary: user && user.salary,
              doj: user && user.doj,
              officeLocation: user && user.officeLocation,
              reportingManager: user && user.reportingManager,
              role: user && user.role && user.role.slug,
              designation: user && user.designation,
              department: user && user.department,
              ifscCode: user && user.ifscCode,
              bankName: user && user.bankName,
              accountNumber: user && user.accountNumber,
              biometricId: user && user.biometricId,
              pancard: user && user.pancard,
              profile: user && user.profile,
              remainLeaves: {
                SKL: user.remainLeaves.SKL,
                CSL: user.remainLeaves.CSL,
                PVL: user.remainLeaves.PVL,
                MTL: user.remainLeaves.MTL,
                MGL: user.remainLeaves.MGL,
                LWP: user.remainLeaves.LWP
              }
            }, process.env.TOKEN_KEY, {
              expiresIn: "1d"
            })
            res.status(200).json({
              code: "FETCHED",
              token: token,
              verified: true,
            });
          }
          
        })
      })
  },
  getuser: (req, res) => {
    if (res) {
      Users.find({}).sort([["createdAt", -1]]).populate("roles")
        .populate("department").
        populate("designation").then((result) => {
          // res.set(password, undefined)
          return res.status(200).json({
            code: "FETCHED",
            data: result
          })
        }).catch((error) => {
          return res.status(400).json({
            code: "ERROROCCURED",
            data: error
          })
        })
    }
  },
  getOne: (req, res) => {
    if (res) {
      Users.findOne({ _id: req.user.user._id }).populate("roles")
        .populate("department").populate("designation").then((result) => {
          return res.status(200).json({
            code: "FETCHED",
            data: result
          })
        }).catch((error) => {
          return res.status(400).json({
            code: "ERROROCCURED"
          })
        })
    }
  },

  // 
  DeleteUser: (req, res) => {
    Users.findByIdAndDelete(req.params.id, async (err, result) => {
      if (result) {
        await res.status(200).json({
          code: "FETCHED",
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
  EditUser: (req, res) => {
    Users.findByIdAndUpdate(req.params.id, { ...req.body }, async (err, result) => {
      if (err) {
        await res.status(400).json({
          code: "ERROROCCURED",
          data: err,
        })
      } else {
        await res.status(200).json({
          code: "UPDATED",
          data: result
        })
      }
    });
  },
  // changePassword: (req, res) => {
  //   // _id:req.user._id
  //   Users.findOne({ _id: req.user._id }).exec((err, user) => {
  //     const passwordEnteredByUser = req.body.password
  //     const hash = user.password

  //     bcrypt.compare(passwordEnteredByUser, hash, function (err, isMatch) {
  //       if (err) {
  //         return res.status(400).json({
  //           code: " ERROROCCURED",
  //           data: err
  //         })
  //       } else if (!isMatch) {
  //         return res.status(200).json({
  //           code: "PASSWORDMISMATCHED",
  //           data: err
  //         })
  //       } else {
  //         bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
  //           Users.findOneAndUpdate({ _id: req.user._id }, { password: hash }, null, function (err, result) {
  //             if (err) {
  //               res.status(200).json({
  //                 code: "ERROROCCURED",
  //                 data: err
  //               })
  //             } else {
  //               res.status(200).json({
  //                 code: "UPDATED",
  //                 data: result
  //               })
  //             }
  //           })
  //         })

  //       }

  //     })
  //   })
  // }
}

