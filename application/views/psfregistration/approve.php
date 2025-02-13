<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registration Form</h3>
</div>
<form role="form" id="approve_psfregistration_form" name="approve_psfregistration_form" onsubmit="return false;" style="font-size: 14px;"
      autocomplete="off">
    <input type="hidden" id="psfregistration_id_for_psfregistration_approve" name="psfregistration_id_for_psfregistration_approve" value="{{psfregistration_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-psfregistration-approve f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Firm Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Enetr Firm Name !"
                       value="{{firm_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Complete Address of Registered Office <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Complete Address of Registered Office !"
                       value="{{principal_address}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_psfregistration_approve" name="registration_number_for_psfregistration_approve" class="form-control" placeholder="Registration No. !"
                       maxlength="50" onblur="checkValidation('psfregistration-approve', 'registration_number_for_psfregistration_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-psfregistration-approve-registration_number_for_psfregistration_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_psfregistration_approve" name="valid_upto_for_psfregistration_approve" 
                           onblur="checkValidation('psfregistration-approve', 'valid_upto_for_psfregistration_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-psfregistration-approve-valid_upto_for_psfregistration_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_psfregistration_approve" name="certificate_file_for_psfregistration_approve"
                       accept="application/pdf">
                <div class="error-message error-message-psfregistration-approve-certificate_file_for_psfregistration_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_psfregistration_approve" name="remarks_for_psfregistration_approve" class="form-control"
                          onblur="checkValidation('psfregistration-approve', 'remarks_for_psfregistration_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-psfregistration-approve-remarks_for_psfregistration_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_psfregistration_approve" class="btn btn-sm btn-success" onclick="Psfregistration.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>