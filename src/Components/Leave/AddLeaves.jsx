import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import config from '../../config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import UserDetail from './UserDetail';
import { useNavigate } from 'react-router-dom';
function AddLeaves() {
    let navigate = useNavigate();
    var token = localStorage.getItem("token") || " ";
    const [userList, setuserList] = useState([]);

    useEffect(() => {
        axios.get(`${config.API_URL}/auth/get`, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
            setuserList(result.data && result.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])



    //----------------Formik-----------------------

    const initialValues = {
        empId: "",
        leaveType: "LWP",
        from: "",
        to: "",
        numberofLeaves: 0,
        reason: ""
    }

    const validationSchema = Yup.object({
        empId: Yup.string().required("Please select Employee"),
        leaveType: Yup.string().required("Please select Leave Type"),
        from: Yup.date().required("Please select a date."),
        reason: Yup.string().required("Please mention a reason to take leave."),
        to: Yup.date().required("Please select a date."),
        numberofLeaves: Yup
            .number()
            .when("from", {
                is: (e) => { if (e !== "") { return true } },
                then: Yup.number().typeError('Only numbers are allowed').min(0.5, 'Min value 0.5').max(30, `Max value 30`).required("Please fill Number of Leaves.")
            }),
    })

    const onSubmit = (values) => {
        const from = new Date(values.from).toISOString();
        const to = new Date(values.to).toISOString();
        axios.post(`${config.API_URL}/leave/add`, { ...values, to: to, from: from }, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((result) => {
            if (result) {
                toast.success("Created", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        navigate("/")
                    }
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <ToastContainer />
            <div className="col-xl-12 col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card ctm-border-radius shadow-sm grow">
                            <div className="card-header">
                                <h4 className="card-title mb-0">Add Leaves</h4>
                            </div>
                            <div className="card-body">
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ values, errors, dirty, setFieldValue, isSubmitting }) => {
                                        return (<Form>
                                            <div className="row">
                                                <div className="col-sm-12 leave-col">
                                                    <div className="form-group">
                                                        <label>--Select Employee--</label>
                                                        <Field as="select" name="empId" className="form-control">
                                                            <option value={""}>---SELECT OPTION---</option>
                                                            {userList && userList.map((item, index) => {
                                                                return (
                                                                    <option value={item.empId} key={index}>{item.firstName} {item.lastName}</option>
                                                                )
                                                            })}
                                                        </Field>
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 leave-col">
                                                    <div className="form-group">
                                                        <label>Select Date From</label>
                                                        <DatePicker selected={values && values.from != "" ? values.from : null} className="form-control" name="from" onChange={(date) => { setFieldValue("from", date); setFieldValue("to", "") }} minDate={new Date()} placeholderText={'Please select a date'} autoComplete='off' disabled={errors && errors.empId || values.empId == "" ? true : false}
                                                        />
                                                        {errors && errors.from && <small className='text-danger'>{errors.from}</small>}
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 leave-col">
                                                    <div className="form-group">
                                                        <label>Select Date To</label>
                                                        <DatePicker selected={values && values.to != "" && values.to} className="form-control" name="to" onChange={(date) => { setFieldValue("to", date) }} minDate={values.from} maxDate={new Date(new Date(values.from).getFullYear(), new Date(values.from).getMonth() + 1, 0)} placeholderText={'Please select a date'} autoComplete='off' disabled={errors && errors.empId || values.empId == "" ? true : false} />
                                                        {errors && errors.to && <small className='text-danger'>{errors.to}</small>}
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 leave-col">
                                                    <div className="form-group">
                                                        <label>Number of Leaves</label>
                                                        <Field type="Number" className="form-control" name="numberofLeaves" disabled={errors && errors.empId || values.empId == "" || values.from == "" || values.to == "" ? true : false} />
                                                        <ErrorMessage
                                                            name="numberofLeaves"
                                                            render={(msg) => (
                                                                <small className="text-danger">{msg}</small>
                                                            )} />
                                                    </div>
                                                </div>

                                                <div className="col-sm-12 leave-col">
                                                    <div className="form-group">
                                                        <label>Reason</label>
                                                        <Field as="textarea" className="form-control" name="reason" />
                                                        <ErrorMessage
                                                            name="reason"
                                                            render={(msg) => (
                                                                <small className="text-danger">{msg}</small>
                                                            )} />
                                                    </div>
                                                </div>


                                                <div className="col-sm-12 leave-col text-right">
                                                    <button
                                                        className="btn btn-primarybtn btn-theme button-1 text-white ctm-border-radius p-2 add-person ctm-btn-padding"
                                                        disabled={
                                                            Object.keys(errors).length != 0 ||
                                                                dirty === false ||
                                                                isSubmitting === true
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>)
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
                <UserDetail />
            </div>
        </>
    )
}

export default AddLeaves