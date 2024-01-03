<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Establishment Form</h3>
</div>
<form role="form" id="reject_clact_form" name="reject_clact_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="clact_id_for_clact_reject" name="clact_id_for_clact_reject" value="{{establishment_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-clact-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_clact_reject" name="remarks_for_clact_reject" class="form-control"
                          onblur="checkValidation('clact-reject', 'remarks_for_clact_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-clact-reject-remarks_for_clact_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_clact_reject" class="btn btn-sm btn-danger" onclick="CLACT.listview.rejectApplication();"
                    style="margin-right: 5px;">Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>