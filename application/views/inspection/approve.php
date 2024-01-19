<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Inspection at Plinth level Form</h3>
</div>
<form role="form" id="approve_inspection_form" name="approve_inspection_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="inspection_id_for_inspection_approve" name="inspection_id_for_inspection_approve" value="{{inspection_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-inspection-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Applicant Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Applicant Name !"
                       value="{{name_of_applicant}}" readonly="">
            </div>
        </div>
          <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 25MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_inspection_approve" name="certificate_file_for_inspection_approve"
                       accept="application/pdf">
                <div class="error-message error-message-inspection-approve-certificate_file_for_inspection_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_inspection_approve" name="remarks_for_inspection_approve" class="form-control"
                          onblur="checkValidation('inspection-approve', 'remarks_for_inspection_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-inspection-approve-remarks_for_inspection_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_inspection_approve" class="btn btn-sm btn-success" onclick="Inspection.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>