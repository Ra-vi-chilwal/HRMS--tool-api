import React, { useState } from 'react'
import './calender.css';
import { Calendar } from 'react-calendar';
import axios from 'axios';
import config from "../../config"
import { useEffect } from 'react';
function Calender(props) {
    const biometricId = props && props.biometricId
    console.log(biometricId)
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [attendance, setAttendance] = useState([])
    const [monthYear, setMonthYear] = useState({ month: new Date().toISOString().substring(5, 7), year: new Date().toISOString().substring(0, 4) })

    var token = localStorage.getItem("token") || "";
    useEffect(() => {
        axios.get(`${config.API_URL}/calender`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setLoader(false)
            setData(result && result.data && result.data.data)
        }).catch((error) => {
            console.log(error)
            setLoader(false)
        })
    }, [])

    useEffect(() => {
        axios.post(`${config.API_URL}/attendance/monthly`, { ...monthYear, biometricId }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setAttendance(result.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [monthYear])

    const Content = (date, view) => {
        let message = "";
        let logDate = '';
        if (view === "month") {
            const monthDate = new Date(date).toISOString().toString().substring(0, 10);
            attendance && attendance.map((item) => {
                if (new Date(item && item.LogDate).toString().substring(0, 10) == monthDate) {
                    logDate = <p style={{ fontSize: 10, textTransform: "capitalize", marginTop: "30px", fontWeight: 300 }}>{item.StartOfDay}</p>

                    console.log(logDate)
                }
            })
            data && data.map((item) => {
                if (new Date(item && item.date).toISOString().toString().substring(0, 10) == monthDate) {
                    message = <p style={{ fontSize: 10, textTransform: "capitalize", marginTop: "30px", fontWeight: 300 }}>{item.holiday}</p>
                }

            })
            return message
        }
    }


    return (
        <div><Calendar className="react-calendar"
            onClickMonth={(value) => setMonthYear({ ...monthYear, month: new Date(value.getTime() + 60 * 60 * 24 * 1000).toISOString().substring(5, 7) })}
            onClickYear={(value) => setMonthYear({ ...monthYear, year: new Date(value.getTime() + 60 * 60 * 24 * 1000).toISOString().substring(0, 4) })}
            tileContent={({ date, view }) => Content(date, view)}
        /></div>
    )
}

export default Calender