import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from 'axios';
import config from '../../config';
import { Field } from 'formik';


function UserDetail(props) {

  const [manager, setManager] = useState("")
  const [data, setData] = useState("")
  var token = localStorage.getItem("token") || "";

  useEffect(() => {
    axios.get(`${config.API_URL}/leave/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((result) => {
      setData(result.data.data);
    }).catch((error) => {
      console.log(error)

    })
  }, [token])

  ///
  const updateStatus = (e, id) => {
    console.log(e, id)
    axios.put(`${config.API_URL}/leave/update`, { _id: id, status: e.target.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
  }
  const columns = [
  

    {
      name: "Number of Leaves",
      selector: (row) => row.numberofLeaves && row.numberofLeaves.$numberDecimal,
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row && row.leaveType,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => <span>{new Date(row && row.from).toLocaleDateString()}</span>,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) =><span>{new Date(row && row.to).toLocaleDateString()}</span>,
      sortable: true,
    },

    {
      name: "Status",
     
      selector: (row) => row && row.status,
      sortable: true, 
    }
    ,

  ];
  const ExpandableComponent = ({ data }) => {

    return (
      <div>
        <>
          <ul className="p-4 bg-light">
            <p>{data.reason}</p>
          </ul>
        </>
      </div>

    );

  };
  return (
    <>
      <div className='row'>
        <div className="col-xl-12 col-lg-12  col-md-12">

          <div className="card shadow-sm ctm-border-radius grow">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="card-title mb-0 d-inline-block">Leave Details</h4>
              {/* <Link to="/addsalary" className="btn btn-theme button-1 ctm-border-radius text-white float-right"><span /> Add Salary</Link> */}
            </div>
            <div className="card-body align-center">
              <div className="row">
                <div className="col-md-12 react-table">

                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                    FixedHeader
                    fixedHeaderScrollHeight='450px'
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;