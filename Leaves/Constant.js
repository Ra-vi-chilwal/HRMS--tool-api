const LeavesPolicy = [
    {
        LeaveType: "Sick Leave",
        Code: "SKL",
        Days: 6,
        min: 0.5,
        max: 2,
        carryForward: false,
        maxForward: 0
    },
    {
        LeaveType: "Casual Leave",
        Code: "CSL",
        Days: 7,
        min: 0.5,
        max: 2,
        carryForward: false,
        maxForward: 0
    },
    {
        LeaveType: "Privilage Leave",
        Code: "PVL",
        Days: 12,
        min: 0.5,
        max: 4,
        carryForward: false,
        maxForward: 4
    },
    {
        LeaveType: "Maternity Leave",
        Code: "MTL",
        Days: 182,
        min: 0.5,
        max: 182,
        carryForward: false,
        maxForward: 0
    },
    {
        LeaveType: "Marriage Leave",
        Code: "MGL",
        Days: 15,
        min: 0.5,
        max: 15,
        carryForward: true,
        maxForward: 0
    },
    {
        LeaveType: "Leave without Pay",
        Code: "LWP",
        Days: 365,
        min: 0.5,
        max: 30,
        carryForward: false,
        maxForward: 0

    }
]


module.exports = LeavesPolicy