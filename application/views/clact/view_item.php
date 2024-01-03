<tr style="background-color: #fff;">
    <td style="width: 50px;" class="text-center">
        <label>Sr No.</label><br><span>{{cnt}}</span>
    </td>
    <td style="width: 240px;">
        <label>Contractor Establishment Name is to be Employed <span style="color: red;">*</span></label>
        <input type="text" class="form-control" readonly=""
               value="{{contractor_proprietor_name}}" placeholder="Contractor Establishment Name">
    </td>
    <td style="width: 190px;">
        <label>Name of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{contractor_name}}" placeholder="Name of Contractors" readonly="">
    </td>
    <td style="width: 200px;">
        <label>Email of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{email_id}}" placeholder="Email" readonly="">
    </td>
    <td style="width: 200px;">
        <label>Mobile No. of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{mobile_number}}" placeholder="Mobile Number" readonly="">
    </td>
    <td style="width: 200px;">
        <label>Address of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{contractor_address}}" placeholder="Address" readonly="">
    </td>
</tr>
<tr style="background-color: #fff;">
    <td></td>
    <td>
        <label>Nature of Work in which Contract Labour is Employed Through each Contractor <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{nature_of_work}}" placeholder="Nature of Work" readonly="">
    </td>
    <td>
        <label>Maximum No. of Contract Labour to be Employed on any Day Labour <span style="color: red;">*</span></label>
        <input type="text" class="form-control"
               value="{{contractor_labour}}" placeholder="No. of Contract Labour" readonly="">
    </td>
    <td>
        <label>Estimated Date of Start of Employment of Contract <span style="color: red;">*</span></label>
        <div class="input-group date" style="margin-top: 20px;">
            <input type="text" class="form-control" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY"
                   value="{{contractor_start_date_text}}" readonly="">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-calendar"></i></span>
            </div>
        </div>
    </td>
    <td>
        <label>Estimated Date of Termination of Employment of Contract <span style="color: red;">*</span></label>
        <div class="input-group date" style="margin-top: 20px;">
            <input type="text"
                   class="form-control" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY"
                   value="{{contractor_termination_date_text}}" readonly="">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-calendar"></i></span>
            </div>
        </div>
    </td>
    <td class="text-center">
    </td>
</tr>