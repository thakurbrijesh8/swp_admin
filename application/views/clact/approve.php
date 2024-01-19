<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Establishment Form</h3>
</div>
<form role="form" id="approve_clact_form" name="approve_clact_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="clact_id_for_clact_approve" name="clact_id_for_clact_approve" value="{{establishment_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-clact-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name of the Establishment <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the Establishment !"
                       value="{{establishment_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Enter Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_clact_approve" name="registration_number_for_clact_approve" class="form-control" placeholder="Eg : LE/LI/DMN/RE-111/2021 "
                       maxlength="50" onblur="checkValidation('clact-approve', 'registration_number_for_clact_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-clact-approve-registration_number_for_clact_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Establishment Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_clact_approve" name="valid_upto_for_clact_approve" 
                           onblur="checkValidation('clact-approve', 'valid_upto_for_clact_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-clact-approve-valid_upto_for_clact_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_clact_approve" name="certificate_file_for_clact_approve"
                       accept="application/pdf">
                <div class="error-message error-message-clact-approve-certificate_file_for_clact_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_clact_approve" name="remarks_for_clact_approve" class="form-control"
                          onblur="checkValidation('clact-approve', 'remarks_for_clact_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-clact-approve-remarks_for_clact_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_clact_approve" class="btn btn-sm btn-success" onclick="CLACT.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>