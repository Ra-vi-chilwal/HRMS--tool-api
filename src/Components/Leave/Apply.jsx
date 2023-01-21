import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import config from '../../config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import UserDetail from './UserDetail';
import { useNavigate} from 'react-router-dom';
function Leaves(props) {
  let navigate = useNavigate();
  var token = localStorage.getItem("token") || " ";
  const user = props && props.props

  const remainLeaves = user.remainLeaves;
  const [leavelist, setLeavelist] = useState([]);
  const [monthlyRemain, setMonthlyRemain] = useState(0)
  const [yearlyleaves, setYearlyLeaves] = useState(0)
  const [yearlyremain, setYearlyRemain] = useState(0)
  const [monthmax, setMonthMax] = useState(0)
  const [takenLeaves, setTakenLeaves] = useState(0)

  useEffect(() => {
    axios.get(`${config.API_URL}/leave/leaveslist`, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
      setLeavelist(result.data && result.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  const takenLeavesFunc = (date, leaveType) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    axios.post(`${config.API_URL}/leave/get-leaves`, { month, year, leaveType }, { headers: { Authorization: `Bearer ${token}` } }).then((result) => {
    
      if (result.data.length > 0) {
        let data = result.data && result.data[0] && result.data[0].leaves && result.data[0].leaves.$numberDecimal;
        console.log(parseFloat(data))
        setTakenLeaves(parseFloat(data))
        console.log(data)
        setMonthlyRemain(monthmax - data)
      }
      else {
        setTakenLeaves(0)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const remainLeavesFunc = () => {
    console.log(takenLeaves ,"taken leave" , monthmax,"month leave", yearlyremain, "yearremain",monthlyRemain,"monthlyreamin")
    if(monthlyRemain !==0 && yearlyremain !==0){
      if (yearlyremain >= monthmax ) {
        console.log(yearlyremain)
         setMonthlyRemain(monthmax - takenLeaves)
         if (monthmax >= monthlyRemain) {
           console.log(monthlyRemain, "Remain Leaves")
           console.log(monthmax, "Month Max Leaves")
           console.log(takenLeaves, "Taken Leaves")
         }
         else {
           
           setMonthlyRemain(monthmax)
         }
       }
       else {
         
         setMonthMax(yearlyremain)
       }
    }else{
     if(takenLeaves !== monthmax){
      console.log("df")
      setMonthlyRemain(monthmax)
     }else{

       console.log("sorry ")
     }
    }
 

  }
  //----------------Formik-----------------------

  const initialValues = {
    leaveType: "",
    from: "",
    to: "",
    numberofLeaves: 0,
    reason: ""
  }

  const validationSchema = Yup.object({
    leaveType: Yup.string().required("Please select Leave Type"),
    from: Yup.date().required("Please select a date."),
    reason: Yup.string().required("Please mention a reason to take leave."),
    to: Yup.date().required("Please select a date."),
    numberofLeaves: Yup
      .number()
      .when("from", {
        is: (e) => { if (e !== "") { return true } },
        then: Yup.number().typeError('Only numbers are allowed').min(0.5, 'Min value 0.5').max(monthlyRemain, `${monthlyRemain} Leaves available in this month`).required("Please fill Number of Leaves.")
      }),
  })

  const onSubmit = (values) => {

    const from = new Date(values.from).toISOString();
    const to = new Date(values.to).toISOString();
    axios.post(`${config.API_URL}/leave/apply`, { ...values, to: to, from: from }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((result) => {
      console.log(result)
      if (result) {
        toast.success("Applied ! Wait for Approval", {
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
              <h4 className="card-title mb-0">Apply Leaves</h4>
            </div>
            <div className="card-body">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, errors, dirty, setFieldValue, handleChange, isSubmitting }) => {
              
                  handleChange = (e) => {
                    setFieldValue("leaveType", e.target.value);
                    setFieldValue("from", "");
                    setFieldValue("to", "");
                    setYearlyLeaves(parseInt(e.target[e.target.selectedIndex].getAttribute('yearlyleaves')))
                    setYearlyRemain(parseInt(e.target[e.target.selectedIndex].getAttribute('yearlyremain')))
                    setMonthMax(parseInt(e.target[e.target.selectedIndex].getAttribute('monthmax')))
                    setMonthlyRemain(0)
                  }
                  return (<Form>
                    <div className="row">
                      <div className="col-sm-12 leave-col">
                        <div className="form-group">
                          <label>Select Leave Type</label>
                          <Field as="select" name="leaveType" className="form-control" onChange={handleChange}>
                            <option value={""}>---SELECT OPTION---</option>
                            {leavelist && leavelist.map((leave, index) => {
                              return (
                                <option
                                  value={leave.Code}
                                  yearlyleaves={leave.Days}
                                  yearlyremain={remainLeaves[leave.Code]}
                                  monthmax={leave.max}
                                  key={index}
                                >
                                  {leave.LeaveType}
                                </option>
                              )
                            })}
                          </Field>
                        </div>
                      </div>

                      <div className="col-sm-4 leave-col">
                        <div className="form-group">
                          <label>Select Date From</label>
                          <DatePicker selected={values && values.from != "" ? values.from : null} className="form-control" name="from" onChange={(date) => { setFieldValue("from", date); setFieldValue("to", "") }} minDate={new Date()} placeholderText={'Please select a date'} autoComplete='off'
                            onSelect={(date) => { takenLeavesFunc(date, values.leaveType) }} disabled={errors && errors.leaveType || values.leaveType == "" ? true : false}
                          />
                          {errors && errors.from && <small className='text-danger'>{errors.from}</small>}
                        </div>
                      </div>

                      <div className="col-sm-4 leave-col">
                        <div className="form-group">
                          <label>Select Date To</label>
                          <DatePicker selected={values && values.to != "" && values.to} className="form-control" name="to" onChange={(date) => { setFieldValue("to", date) }} minDate={values.from} maxDate={new Date(new Date(values.from).getFullYear(), new Date(values.from).getMonth() + 1, 0)} placeholderText={'Please select a date'} autoComplete='off' disabled={errors && errors.leaveType || values.leaveType == "" ? true : false} onSelect={remainLeavesFunc} />
                          {errors && errors.to && <small className='text-danger'>{errors.to}</small>}
                        </div>
                      </div>

                      <div className="col-sm-4 leave-col">
                        <div className="form-group">
                          <label>Number of Leaves</label>
                          <Field type="Number" className="form-control" name="numberofLeaves" disabled={errors && errors.leaveType || values.leaveType == "" || values.from == "" || values.to == "" ? true : false} />
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
                          type="submit"
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

export default Leaves