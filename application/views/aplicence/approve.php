<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registration Form</h3>
</div>
<form role="form" id="approve_aplicence_form" name="approve_aplicence_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="aplicence_id_for_aplicence_approve" name="aplicence_id_for_aplicence_approve" value="{{aplicence_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-aplicence-approve f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Name of Contractor <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of Applicant !"
                       value="{{contractor_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Establishment Address <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Establishment Address !"
                       value="{{establi_address}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Enter Only File No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_aplicence_approve" name="registration_number_for_aplicence_approve" class="form-control" placeholder="Eg. 1234 !"
                       maxlength="50" onblur="checkValidation('aplicence-approve', 'registration_number_for_aplicence_approve', registrationFileNoValidationMessage);">
                <span class="error-message error-message-aplicence-approve-registration_number_for_aplicence_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_aplicence_approve" name="valid_upto_for_aplicence_approve" 
                           onblur="checkValidation('aplicence-approve', 'valid_upto_for_aplicence_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-aplicence-approve-valid_upto_for_aplicence_approve"></span>
            </div>
        </div>
         <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_aplicence_approve" name="certificate_file_for_aplicence_approve"
                       accept="application/pdf">
                <div class="error-message error-message-aplicence-approve-certificate_file_for_aplicence_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Fees Paid <span style="color: red;">*</span></label>
                <input type="text" id="fees_for_aplicence_renewal_approve" name="fees_for_aplicence_renewal_approve" class="form-control" placeholder="Eg : 142 !"
                       maxlength="5" onblur="checkNumeric($(this));checkValidation('aplicence-renewal-approve', 'fees_for_aplicence_renewal_approve', feesValidationMessage);" value="{{fees}}">
                <span class="error-message error-message-aplicence-renewal-approve-fees_for_aplicence_renewal_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_aplicence_approve" name="remarks_for_aplicence_approve" class="form-control"
                          onblur="checkValidation('aplicence-approve', 'remarks_for_aplicence_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-aplicence-approve-remarks_for_aplicence_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_aplicence_approve" class="btn btn-sm btn-success" onclick="Aplicence.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>