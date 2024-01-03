<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        View Business Details
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige vat-top-table">
            <tr>
                <td class="f-w-b" style="width: 40%;">Registered User Details</td>
                <td>
                    <b><i class="fas fa-user f-s-10px"></i></b> :- {{applicant_name}}<br>
                    <b><i class="fas fa-phone-volume f-s-10px"></i></b> :- {{applicant_mobile}}
                </td>
            </tr>
            <tr>
                <td class="f-w-b">Udyam Number</td>
                <td>{{udyam_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Certificate Number</td>
                <td>{{certificate_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Unit Name</td>
                <td>{{unit_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Unit Address</td>
                <td>{{unit_address}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Unit Pin</td>
                <td>{{unit_pin}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Unit District</td>
                <td>{{district_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Unit State</td>
                <td>{{state_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Certification Date</td>
                <td>{{certification_date}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Expiry Date</td>
                <td>{{expiry_date}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Bronze Certified</td>
                <td>{{is_bronze_certified}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Silver Certified</td>
                <td>{{is_silver_certified}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Gold Certified</td>
                <td>{{is_gold_certified}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Certification Fee</td>
                <td>&#8377;{{certification_fees}}/-</td>
            </tr>
            <tr>
                <td class="f-w-b">Subsidy Amount</td>
                <td>&#8377;{{subsidy_amount}}/-</td>
            </tr>
            <tr>
                <td class="f-w-b">Paid Amount</td>
                <td>&#8377;{{amount_paid}}/-</td>
            </tr>
        </table>
    </div>
</div>
<div class="card-footer text-right">
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">
        <i class="fas fa-times"></i> &nbsp; Close
    </button>
</div>
