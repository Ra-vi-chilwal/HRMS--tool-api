// const pdf = require('html-pdf');

const { ToWords } = require('to-words');

var html_to_pdf = require('html-pdf-node');
const toWords = new ToWords({
  localeCode: 'en-IN',
  
 
});
module.exports = {
 
  generateSlip: (req, res) => {
    console.log("ol")
    const total = `${ parseInt(req.body && req.body.basic) + parseInt(req.body && req.body.hra)+parseInt(req.body && req.body.da)+parseInt(req.body && req.body.convAll) + parseInt(req.body && req.body.foodAll)+parseInt(req.body && req.body.medRem)+parseInt(req.body && req.body.uniformAll) + parseInt(req.body && req.body.academicAll)+parseInt(req.body && req.body. specialAll)+ parseInt(req.body && req.body.othAll)+parseInt(req.body && req.body.bonus)}`
    const Deductions = `${parseInt(req.body && req.body.pfDeduction)}`
    
    let file = {
    
      content: `
      <body class="nav-md">
  <div class="salary-slip">
    <table class="empDetail">
      <tbody>
        <tr height="100px" style="background: #002335;color:#fff">
          <td colSpan="4">
            <img height="60px" src="http://localhost:5000/logoi.png" />
          </td>
          <td colSpan="4" class="companyName">DDReg Pharma Pvt. Ltd.
            <p style=font-size:12px;>
              Units 1006 -1008, 10th Floor, Tower B4,
              Spaze ITech Park, Sector 49, Sohna Road,
              Gurgaon – 122018, Haryana (INDIA)
            </p>
          </td>
        </tr>
        <tr class='title-slip' style="background : #048cc2; color:#fff">
          <th colSpan="8">Payslip for the month of ${req.body.month} 2022</th>
        </tr>

        <tr>
          <th colSpan="2">
            Employee ID
          </th>

          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.empId}
         
          </td>
          <th colSpan="2">
            Bank Name
          </th>
          <td class="myAlign" colSpan="2">
     ${req && req.body && req.body.user && req.body.user.bankName}
          </td>
        </tr>
        <tr>
          <th colSpan="2">
            Employee ID
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user.firstName + " " + req.body.user.lastName}
          </td>
          <th colSpan="2">
            Bank A/C No.
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user && req.body.user.accountNumber}
          </td>
        </tr>
        <tr>
          <th colSpan="2">
            Designation
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user && req.body.user.designation[0] && req.body.user.designation[0].designation} 
          </td>
          <th colSpan="2">
            PAN
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user && req.body.user.pancard} 
          </td>
        </tr>
        <tr>
          <th colSpan="2">
            Department
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user && req.body.user.department[0] && req.body.user.department[0].departmentName} 
          </td>
          <th colSpan="2">
            PF No.
          </th>
          <td class="myAlign" colSpan="2">
          ${req.body && req.body.pfno}
          </td>
        </tr>
        <tr>
          <th colSpan="2">
            Date of Joining
          </th>
          <td class="myAlign" colSpan="2">
          ${req && req.body && req.body.user && req.body.user.doj}
          </td>
          <th colSpan="2">
            UAN 
          </th>
          <td class="myAlign" colSpan="2">
           ${req.body && req.body.uan}
          </td>
        </tr>
        <tr>
          <th colSpan="2">
          Location
          </th>
          <td class="myAlign" colSpan="2">   
          ${req.body && req.body.user && req.body.user.officeLocation}
          </td>
          <th colSpan="2">
         	Payable days 
          </th>
          <td class="myAlign" colSpan="2">
          ${req.body && req.body.Payabledays}
          </td>
        </tr>
        <tr>
          <th colSpan="2">
        
          </th>
          <td class="myAlign" colSpan="2">
        
          </td>
          <th colSpan="2">
           Paid Days
          </th>
          <td class="myAlign" colSpan="2">
          ${req.body && req.body.Paiddays}
          </td>
        </tr>

     


        <tr class="myBackground">
          <th colSpan="4" class="cntr">
            Earnings
          </th>

          <th colSpan="4" class="cntr">
            Deductions
          </th>

        </tr>

      </tbody>

      <tbody class="border-center">
        <tr>
          <th colSpan="2">
            Description
          </th>
          <td colSpan="2">
            Amount
          </td>
          <th colSpan="2">
            Description
          </th>
          <td colSpan="2">
            Amount
          </td>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Basic
          </th>
          <td colSpan="2">
          ${req.body && req.body.basic}
          </td>
          <th colSpan="2">
          P.F Deduction
          </th>
          <td colSpan="2">
          ${req.body && req.body.pfDeduction}
          </td>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            HRA
          </th>
          <td colSpan="2">
          ${req.body && req.body.hra}
          </td>
          <th colSpan="2">
         
          </th>
          <td colSpan="2">
       
          </td>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
           PF
          </th>
          <td colSpan="2">
          ${req.body && req.body.pf}
          </td>
          <th colSpan="2">
         
          </th>
          <td colSpan="2">
       
          </td>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            DA
          </th>
          <td colSpan="2">
          ${req.body && req.body.da}
          </td>
          <th colSpan="2">
       
          </th>
          <td colSpan="2">
          
          </td>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Conveyance Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.convAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <tr>
        <th colSpan="2">
        Arrear 
        </th>
        <td colSpan="2">
        ${req.body && req.body.arrear} 
        </td>
        <th colSpan="2">
        </th>
        <th colSpan="2">
        </th>
      </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Food Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.foodAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
          Medical Remedies
          </th>
          <td colSpan="2">
          ${req.body && req.body.medRem}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Uniform Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.uniformAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Academic Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.academicAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Special Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.specialAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Other Allowances
          </th>
          <td colSpan="2">
          ${req.body && req.body.othAll}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Bonus
          </th>
          <td colSpan="2">
          ${req.body && req.body.bonus}
          </td>
          <th colSpan="2">
          </th>
          <th colSpan="2">
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Total Earnings (A)
          </th>
          <th colSpan="2" style="text-align:right;padding-right: 10px;">
        ${total}
          </th>
          <th colSpan="2">
            Total Deductions (B)
          </th>
          <th colSpan="2" style="text-align:right;padding-right: 10px;">
         ${Deductions}
          </th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="8" height="20px"></th>
        </tr>
        <!-- =================== -->
        <tr>
          <th colSpan="2">
            Net Salary (A - B)
          </th>
          <th colSpan="2" style="text-align:right;padding-right: 10px;">
          ${total  - Deductions}
          </th>
          <th colSpan="4" style="text-align:right;padding-right: 10px;">
          ${toWords.convert(total -Deductions)}
          </th>
        </tr>

        <!-- =================== -->
        <tr>
          <th colSpan="8" height="60px" style="text-align:right;padding-right: 10px;">
            For DDREG PHARMA PVT LTD
          </th>
        </tr>
        <!-- =================== -->
        <tr style="background:#e3e3e3;color:rgb(0, 0, 0)">
          <th colSpan="8" height="20px" style="text-align:center;font-size:11px">
            This is a computer generated document and does not require signature
          </th>
        </tr>


      </tbody>
    </table>
  </div>
  <style>
    body {
   font-family:Calibri, 'sans-serif';!important !important;
    }

    .cntr {
      text-align: center;
    }

    .salary-slip .myBackground {
      padding-top: 10px;
      text-align: left;
      border: 1px solid #ccc;
      height: 40px;
      background: #002335;
      color: #fff
    }

    .salary-slip .myAlign {
      text-align: right;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }

    .salary-slip .companyName {
      text-align: right;
      font-size: 22px;
      font-weight: bold;
      padding-right: 10px;
      padding-bottom: 5px;
    }

    .salary-slip {
      margin: 15px;
    }

    .salary-slip .empDetail {
      width: 100%;
      text-align: left;
      border: 1px solid #ccc;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .salary-slip .border-center td {
      text-align: right;
      padding-right: 10px;
    }

    .salary-slip .border-center th,
    .salary-slip .border-center td {
      border: 1px solid #ccc;
    }

    .salary-slip th,
    .salary-slip td {
      padding-left: 6px;
    }

    tr.title-slip th {
      padding: 12px;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
  </style>

</body>`}
    let options = { format: 'letter', landscape: true, margin: { top: 50, bottom: 50, right: 50, left: 50 }, scale: 0.8, printBackground: true };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      return res.send(pdfBuffer)
    }).catch((error) => {
      return res.status(400).json({
        code: "ERROROCCURED",
        data: error
      })
    })

  }



}