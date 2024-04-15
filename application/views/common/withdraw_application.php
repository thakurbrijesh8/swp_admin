<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Application Withdraw Form</h3>
</div>
<form role="form" id="withdraw_application_form" name="withdraw_application_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="module_type_for_withdraw_application" name="module_type_for_withdraw_application" value="{{module_type}}">
    <input type="hidden" id="module_id_for_withdraw_application" name="module_id_for_withdraw_application" value="{{module_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-shop-reject f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Application Number <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Application Number !"
                       value="{{application_number}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>{{title}}<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="{{title}} !"
                       value="{{establishment_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_withdraw_application" name="remarks_for_withdraw_application" class="form-control"
                          onblur="checkValidation('withdraw-application', 'remarks_for_withdraw_application', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-withdraw-application-remarks_for_withdraw_application"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_withdraw_application" class="btn btn-sm btn-secondary" onclick="submitWithdrawApplication($(this));"
                    style="margin-right: 5px;"><i class="fas fa-undo"></i> Withdraw</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>