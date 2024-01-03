<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Occupancy Certificate Form</h3>
</div>
<form role="form" id="approve_occupancycertificate_form" name="approve_occupancycertificate_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="occupancycertificate_id_for_occupancycertificate_approve" name="occupancycertificate_id_for_occupancycertificate_approve" value="{{occupancy_certificate_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-occupancycertificate-approve f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Applicant Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of Applicant !"
                       value="{{applicant_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Permission / License No with Date issue by PDA Daman<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Permission / License No !"
                       value="{{license_no}}" readonly="">
            </div>
        </div>
          <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 25MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_occupancycertificate_approve" name="certificate_file_for_occupancycertificate_approve"
                       accept="application/pdf">
                <div class="error-message error-message-occupancycertificate-approve-certificate_file_for_occupancycertificate_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_occupancycertificate_approve" name="remarks_for_occupancycertificate_approve" class="form-control"
                          onblur="checkValidation('occupancycertificate-approve', 'remarks_for_occupancycertificate_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-occupancycertificate-approve-remarks_for_occupancycertificate_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_occupancycertificate_approve" class="btn btn-sm btn-success" onclick="OccupancyCertificate.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>