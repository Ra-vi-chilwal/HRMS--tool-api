var sql = require("mssql");
var dbConfig = require("./config")
var dbConn = new sql.ConnectionPool(dbConfig);
module.exports = {
    getPunchInOut: (req, res) => {
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            var date = new Date();

            request.query(`SELECT * FROM dbo.parallel WHERE EmployeeCode = '${req && req.body && req.body.biometricId}' AND
            (( Day(LogDateTime)=DAY(GETDATE()) and MONTH(LogDateTime) = MONTH(GETDATE()) and YEAR(LogDateTime) = YEAR(GETDATE())) )`).then(function (data) {
                res.json(data && data.recordsets[0].sort(function (a, b) { return a.LogDateTime - b.LogDateTime }))
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });

    },
    getMonthlyInOut: (req, res) => {
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (req.body.month && req.body.year) {
                month = req.body.month;
                year = req.body.year;
            }
            var query = `SELECT LogDate, StartOfDay, EndOfDay, 
        DATEDIFF(s,StartOfDay, EndOfDay) AS ElapsedSeconds
    FROM
      (SELECT
            CAST(LogDateTime AS DATE) AS LogDate,
            MIN(LogDateTime) AS StartOfDay,
            MAX(LogDateTime) AS EndOfDay
        FROM dbo.parallel
        WHERE EmployeeCode = ${req.body.biometricId} AND ((MONTH(LogDateTime) = ${month} and YEAR(LogDateTime) = ${year})) 
        GROUP BY
            CAST(LogDateTime AS DATE)
      ) AS dt`
            request.query(query).then(function (data) {
                res.json(data && data.recordsets[0])
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);[]
        });
    }
}