<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Textile Form</h3>
</div>
<form role="form" id="reject_textile_form" name="reject_textile_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="textile_id_for_textile_reject" name="textile_id_for_textile_reject" value="{{textile_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-textile-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name of the Enterprise <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the Enterprise !"
                       value="{{enterprise_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_textile_reject" name="remarks_for_textile_reject" class="form-control"
                          onblur="checkValidation('textile-reject', 'remarks_for_textile_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-textile-reject-remarks_for_textile_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_textile_reject" class="btn btn-sm btn-danger" onclick="Textile.listview.rejectApplication();"
                    style="margin-right: 5px;"><i class="fas fa-times-circle"></i> Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>