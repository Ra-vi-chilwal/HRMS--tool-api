import React, { useEffect, useState } from 'react'
import config from "../../config";
import axios from "axios";
import Loader from "../Includes/Loader"
import DataTable from "react-data-table-component"
function AdminAttendance(props) {


    const [detail, setdetail] = useState('')
    useEffect(() => {
        axios.get(`${config.API_URL}/auth/get`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((result) => {

            setdetail(result.data.data)

        }).catch((error) => {
            console.log(error)

        })
    }, [])

    const [loader, setLoader] = useState(false);
    const [query, setQuery] = useState({ month: "", year: "", biometricId: "", });
    const [data, setData] = useState("")
    var token = localStorage.getItem("token") || "";

    const getSalary = () => {
        setLoader(true)
        axios.post(`${config.API_URL}/attendance/monthly`, query, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setLoader(false)
            setData(result.data);
        }).catch((error) => {
            console.log(error)
            setLoader(false)
        })
    }
    console.log(query)
    const columns = [

        {
            name: <strong>Date</strong>,
            sortable: true,
            cell: (row) => <span>{(new Date(row.LogDate).toISOString().split('T')[0]).split("-").reverse().join("-")}</span>,
        },
        {
            name: <strong>Start Of Day</strong>,
            sortable: true,
            cell: (row) => <span>{new Date(row && row.StartOfDay).toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}</span>,
        },
        {
            name: <strong>End Of Day</strong>,
            sortable: true,
            cell: (row) => <span>{new Date(row && row.EndOfDay).toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}</span>,
        },
        {
            name: <strong>Elapsed In hours</strong>,
            sortable: true,
            cell: (row) => <span> <strong>{Math.floor(row && row.ElapsedSeconds / 3600)} hours:  {Math.floor((row && row.ElapsedSeconds - (Math.floor(row && row.ElapsedSeconds / 3600) * 3600)) / 60)} mins</strong></span>,
        },





    ];
    return (
        <>

            <div className="col-xl-12 col-lg-8  col-md-12">
                <div className="card shadow-sm ctm-border-radius grow">
                    <div className="card-body align-center">
                        <div className="row filter-row">
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, biometricId: e.target.value }) }}>
                                        <option selected value="">Select Employee</option>
                                        {detail && detail.map((items) => {
                                            return (
                                                <>
                                                    <option value={items.biometricId}>{`${items && items.firstName} ${items && items.lastName}`}</option>
                                                </>

                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, month: e.target.value }) }}>
                                        <option selected value="">Select Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, year: e.target.value }) }}>
                                        <option selected value="">Select Year</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                        <option>2026</option>
                                        <option>2027</option>
                                        <option>2028</option>
                                        <option>2029</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                <button className="btn btn-theme button-1 text-white btn-block p-2 mb-md-0 mb-sm-0 mb-lg-0 mb-0" onClick={getSalary} disabled={query.month == "" || query.year == "" ? true : false}> Apply Filter </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow-sm ctm-border-radius grow">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h4 className="card-title mb-0 d-inline-block">Employee Attendence</h4>
                        {/* <Link to="/addsalary" className="btn btn-theme button-1 ctm-border-radius text-white float-right"><span /> Add Salary</Link> */}
                    </div>
                    <div className="card-body align-center">
                        <div className="row">
                            {loader === true ? <Loader /> :
                                <div className="col-md-12 react-table">
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                        defaultSortFieldId={1}
                                        pagination
                                        responsive
                                        striped
                                        highlightOnHover
                                    />              </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAttendance