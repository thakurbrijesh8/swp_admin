<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve BOCW Form</h3>
</div>
<form role="form" id="approve_bocw_form" name="approve_bocw_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="bocw_id_for_bocw_approve" name="bocw_id_for_bocw_approve" value="{{bocw_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-bocw-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name and location of the establishment <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name and location of the establishment !"
                       value="{{name_location_of_est}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Enter Only Establishment File No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_bocw_approve" name="registration_number_for_bocw_approve" class="form-control" placeholder="Eg. 1234 !"
                       maxlength="50" onblur="checkValidation('bocw-approve', 'registration_number_for_bocw_approve', registrationFileNoValidationMessage);">
                <span class="error-message error-message-bocw-approve-registration_number_for_bocw_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_bocw_approve" name="valid_upto_for_bocw_approve" 
                           onblur="checkValidation('bocw-approve', 'valid_upto_for_bocw_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-bocw-approve-valid_upto_for_bocw_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_bocw_approve" name="certificate_file_for_bocw_approve"
                       accept="application/pdf">
                <div class="error-message error-message-bocw-approve-certificate_file_for_bocw_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_bocw_approve" name="remarks_for_bocw_approve" class="form-control"
                          onblur="checkValidation('bocw-approve', 'remarks_for_bocw_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-bocw-approve-remarks_for_bocw_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_bocw_approve" class="btn btn-sm btn-success" onclick="BOCW.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>