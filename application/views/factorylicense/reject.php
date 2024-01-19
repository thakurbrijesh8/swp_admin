<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Factory License Form</h3>
</div>
<form role="form" id="reject_factory_license_form" name="reject_factory_license_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="factory_license_id_for_factory_license_reject" name="factory_license_id_for_factory_license_reject" value="{{factorylicence_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-factory-license-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Full name of factory <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Full name of factory !"
                       value="{{name_of_factory}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_factory_license_reject" name="remarks_for_factory_license_reject" class="form-control"
                          onblur="checkValidation('factory-license-reject', 'remarks_for_factory_license_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-factory-license-reject-remarks_for_factory_license_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_factory_license_reject" class="btn btn-sm btn-danger" onclick="FactoryLicense.listview.rejectApplication();"
                    style="margin-right: 5px;">Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>