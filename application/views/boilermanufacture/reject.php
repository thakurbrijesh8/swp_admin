<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Boiler Manufacture Form</h3>
</div>
<form role="form" id="reject_boiler_manufacture_form" name="reject_boiler_manufacture_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="boiler_manufacture_id_for_boiler_manufacture_reject" name="boiler_manufacture_id_for_boiler_manufacture_reject" value="{{boilermanufacture_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-boiler-manufacture-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name Of the firm <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name Of the firm !"
                       value="{{name_of_firm}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_boiler_manufacture_reject" name="remarks_for_boiler_manufacture_reject" class="form-control"
                          onblur="checkValidation('boiler-manufacture-reject', 'remarks_for_boiler_manufacture_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-boiler-manufacture-reject-remarks_for_boiler_manufacture_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_boiler_manufacture_reject" class="btn btn-sm btn-danger" onclick="BoilerManufacture.listview.rejectApplication();"
                    style="margin-right: 5px;">Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>