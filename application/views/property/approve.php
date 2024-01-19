<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Registration Form</h3>
</div>
<form role="form" id="approve_property_form" name="approve_property_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="property_id_for_property_approve" name="property_id_for_property_approve" value="{{property_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-property-approve f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Party Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Enetr Firm Name !"
                       value="{{party_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Party Address<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Complete Address of Registered Office !"
                       value="{{party_address}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Registration No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_property_approve" name="registration_number_for_property_approve" class="form-control" placeholder="Registration No. !"
                       maxlength="50" onblur="checkValidation('property-approve', 'registration_number_for_property_approve', establishmentRegistrationNoValidationMessage);">
                <span class="error-message error-message-property-approve-registration_number_for_property_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_property_approve" name="valid_upto_for_property_approve" 
                           onblur="checkValidation('property-approve', 'valid_upto_for_property_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-property-approve-valid_upto_for_property_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_property_approve" name="remarks_for_property_approve" class="form-control"
                          onblur="checkValidation('property-approve', 'remarks_for_property_approve', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-property-approve-remarks_for_property_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_property_approve" class="btn btn-sm btn-success" onclick="Property.listview.approveApplication();"
                    style="margin-right: 5px;"><i class="fas fa-check-double"></i> Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>