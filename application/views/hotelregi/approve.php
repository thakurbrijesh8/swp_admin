<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registration Form</h3>
</div>
<form role="form" id="approve_hotelregi_form" name="approve_hotelregi_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="hotelregi_id_for_hotelregi_approve" name="hotelregi_id_for_hotelregi_approve" value="{{hotelregi_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-hotelregi-approve f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Complete Address of Registered Office <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Complete Address of Registered Office !"
                       value="{{full_address}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_hotelregi_approve" name="registration_number_for_hotelregi_approve" class="form-control" placeholder="Registration No. !"
                       maxlength="50" onblur="checkValidation('hotelregi-approve', 'registration_number_for_hotelregi_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-hotelregi-approve-registration_number_for_hotelregi_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_hotelregi_approve" name="valid_upto_for_hotelregi_approve" 
                           onblur="checkValidation('hotelregi-approve', 'valid_upto_for_hotelregi_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-hotelregi-approve-valid_upto_for_hotelregi_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_hotelregi_approve" name="remarks_for_hotelregi_approve" class="form-control"
                          onblur="checkValidation('hotelregi-approve', 'remarks_for_hotelregi_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-hotelregi-approve-remarks_for_hotelregi_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_hotelregi_approve" class="btn btn-sm btn-success" onclick="Hotelregi.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>