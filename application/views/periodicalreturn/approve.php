<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registration Form</h3>
</div>
<form role="form" id="approve_periodicalreturn_form" name="approve_periodicalreturn_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="periodicalreturn_id_for_periodicalreturn_approve" name="periodicalreturn_id_for_periodicalreturn_approve" value="{{periodicalreturn_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-periodicalreturn-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Applicant Licence No. <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Complete Address of Registered Office !"
                       value="{{applicant_licence_no}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_periodicalreturn_approve" name="registration_number_for_periodicalreturn_approve" class="form-control" placeholder="Registration No. !"
                       maxlength="50" onblur="checkValidation('periodicalreturn-approve', 'registration_number_for_periodicalreturn_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-periodicalreturn-approve-registration_number_for_periodicalreturn_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_periodicalreturn_approve" name="valid_upto_for_periodicalreturn_approve" 
                           onblur="checkValidation('periodicalreturn-approve', 'valid_upto_for_periodicalreturn_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-periodicalreturn-approve-valid_upto_for_periodicalreturn_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_periodicalreturn_approve" name="remarks_for_periodicalreturn_approve" class="form-control"
                          onblur="checkValidation('periodicalreturn-approve', 'remarks_for_periodicalreturn_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-periodicalreturn-approve-remarks_for_periodicalreturn_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_periodicalreturn_approve" class="btn btn-sm btn-success" onclick="Periodicalreturn.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>