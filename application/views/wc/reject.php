<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Repairer Form</h3>
</div>
<form role="form" id="reject_wc_form" name="reject_wc_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="wc_id_for_wc_reject" name="wc_id_for_wc_reject" value="{{wc_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-wc-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name of the concern seeking the license <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the concern seeking the license !"
                       value="{{name_of_applicant}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Reason For Rejection<span style="color: red;">*</span></label>
                <select class="form-control" id="reason_for_rejection_for_wc_reject" name="reason_for_rejection_for_wc_reject"
                        data-placeholder="Select Reason For Rejection !" onchange="showUpladForWcReject(this, 'upload_certificate', 'wc_reject');" onblur="checkValidation('wc', 'reason_for_rejection_for_wc_reject', reasonForRejectionValidationMessage);">
                    <option value="">Select Reason For Rejection !</option>
                </select>
                <span class="error-message error-message-wc-reject-reason_for_rejection_for_wc_reject"></span>
            </div>
        </div>
        <div class="row" id="upload_certificate_for_wc_reject" style="display: none;">
            <div class="col-12 m-b-5px" id="certificate_container_for_wc_reject">
                <label>Upload : Certificate of Non-Availabiblity of Water <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                <input type="file" id="certificate_for_wc_reject" name="certificate_for_wc_reject"
                       accept="image/jpg,image/png,image/jpeg,image/jfif,application/pdf">
                <div class="error-message error-message-wc-reject-certificate_for_wc_reject"></div>
            </div>
            <div class="form-group col-sm-12" id="certificate_name_container_for_wc_reject" style="display: none;">
                <label>Certificate of Non-Availabiblity of Water <span style="color: red;">*</label><br>
                <a id="certificate_name_href_for_wc_reject" target="_blank">
                    <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="certificate_name_for_wc_reject"></span>
                </a>
                {{#if show_remove_upload_btn}}
                <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" id="certificate_remove_btn_for_wc_reject"></span><br>
                {{/if}}
                <span class="error-message error-message-wc-reject-certificate_name_for_wc_reject"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_wc_reject" name="remarks_for_wc_reject" class="form-control"
                          onblur="checkValidation('wc-reject', 'remarks_for_wc_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-wc-reject-remarks_for_wc_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_wc_reject" class="btn btn-sm btn-danger" onclick="WC.listview.rejectApplication();"
                    style="margin-right: 5px;"><i class="fas fa-times-circle"></i> Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>