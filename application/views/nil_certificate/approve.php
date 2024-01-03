<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Nil Certificate Form</h3>
</div>
<form role="form" id="approve_nil_certificate_form" name="approve_nil_certificate_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="nil_certificate_id_for_nil_certificate_approve" name="nil_certificate_id_for_nil_certificate_approve" value="{{nil_certificate_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-nil-certificate-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Applicant Address <span style="color: red;">*</span></label>
                <textarea class="form-control" placeholder="Address of Applicant !"
                          readonly="">{{applicant_address}}</textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_nil_certificate_approve" name="certificate_file_for_nil_certificate_approve"
                       accept="application/pdf">
                <div class="error-message error-message-nil-certificate-approve-certificate_file_for_nil_certificate_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_nil_certificate_approve" name="remarks_for_nil_certificate_approve" class="form-control"
                          onblur="checkValidation('nil-certificate-approve', 'remarks_for_nil_certificate_approve', remarksValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-nil-certificate-approve-remarks_for_nil_certificate_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_nil_certificate_approve" class="btn btn-sm btn-success" 
                    onclick="NilCertificate.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>