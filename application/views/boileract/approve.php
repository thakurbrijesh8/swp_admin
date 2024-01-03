<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registartion Under Boiler Act Form</h3>
</div>
<form role="form" id="approve_boiler_act_form" name="approve_boiler_act_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="boileract_id_for_boiler_act_approve" name="boileract_id_for_boiler_act_approve" value="{{boiler_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-boiler-act-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name Of Owner<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name Of Owner!"
                       value="{{owner_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_boiler_act_approve" name="registration_number_for_boiler_act_approve" class="form-control" placeholder="Registration No. !"
                       maxlength="50" onblur="checkValidation('boiler-act-approve', 'registration_number_for_boiler_act_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-boiler-act-approve-registration_number_for_boiler_act_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_boiler_act_approve" name="valid_upto_for_boiler_act_approve" 
                           onblur="checkValidation('boiler-act-approve', 'valid_upto_for_boiler_act_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-boiler-act-approve-valid_upto_for_boiler_act_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_boiler_act_approve" name="certificate_file_for_boiler_act_approve"
                       accept="application/pdf">
                <div class="error-message error-message-boiler-act-approve-certificate_file_for_boiler_act_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_boiler_act_approve" name="remarks_for_boiler_act_approve" class="form-control"
                          onblur="checkValidation('boiler-act-approve', 'remarks_for_boiler_act_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-boiler-act-approve-remarks_for_boiler_act_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_boiler_act_approve" class="btn btn-sm btn-success" onclick="BoilerAct.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>