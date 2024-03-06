<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        View Payment / Double Verification Details
    </h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 13px;">
    <div class="row">
        <div class="col-sm-12 text-center">
            <span class="error-message error-message-dv f-w-b"
                  style="border-bottom: 2px solid red;"></span>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-padding bg-beige">
            <tr>
                <td class="f-w-b" style="width: 30%;">District</td>
                <td>{{district_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Department Name</td>
                <td>{{department_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Service Name</td>
                <td>{{service_name}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Application Number</td>
                <td>{{application_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Payment Order Number</td>
                <td>{{op_order_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Transaction Date & Time</td>
                <td>{{transaction_datetime_text}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Total Fees</td>
                <td>{{total_fees}} /-</td>
            </tr>
            <tr>
                <td class="f-w-b">Payment Reference Number</td>
                <td>{{reference_id}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Bank Code / Bank Reference Number</td>
                <td>{{op_bank_code}} / {{op_bank_reference_number}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Payment Status</td>
                <td class="pg_status_{{fees_payment_id}}">{{{payment_status_text}}}</td>
            </tr>
            <tr>
                <td class="f-w-b">Message</td>
                <td class="pg_message_{{fees_payment_id}}">{{op_message}}</td>
            </tr>
        </table>
    </div>
    <div class="mb-5">
        <button type="button" class="btn btn-sm btn-info pull-right"
                onclick="checkPaymentDV($(this),'{{fees_payment_id}}')"><i class="fas fa-check-circle"></i> &nbsp; Check for Payment Double Verification</button>
    </div>
    <div class="table-responsive">
        <table id="dv_datatable" class="table table-bordered m-b-0px table-hover f-s-14px"
               style="margin-top: 0px !important;">
            <thead>
                <tr class="bg-light-gray">
                    <th class="text-center" style="width: 35px;">No.</th>
                    <th class="text-center" style="min-width: 80px;">D.V. By</th>
                    <th class="text-center" style="min-width: 120px;">Date & Time</th>
                    <th class="text-center" style="min-width: 80px;">Bank Code</th>
                    <th class="text-center" style="min-width: 120px;">Bank Reference Number</th>
                    <th class="text-center" style="min-width: 120px;">D.V. Status</th>
                    <th class="text-center" style="min-width: 120px;">Payment Status</th>
                    <th class="text-center" style="min-width: 120px;">Message</th>
                </tr>
            </thead>
            <tbody id="dv_item_container"></tbody>
        </table>
    </div>
</div>
<div class="card-footer text-right pr-2">
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">
        <i class="fas fa-times"></i>&nbsp; Close</button>
</div>