<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Upload Letter to Open Bank Account</h3>
</div>
<form role="form" id="society_registration_upload_letter_form" name="society_registration_upload_letter_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="society_registration_id_for_society_registration_upload_letter" name="society_registration_id_for_society_registration_upload_letter" value="{{society_registration_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="success-message-society-registration-ul f-w-b" style="border-bottom: 2px solid green; color: green;"></span>
                <span class="error-message error-message-society-registration-ul f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Applicant Address <span style="color: red;">*</span></label>
                <textarea class="form-control" placeholder="Address of Applicant !"
                          readonly="">{{applicant_address}}</textarea>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Name of the Proposed Society <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the Proposed Society !"
                       value="{{society_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Address to be Registered <span style="color: red;">*</span></label>
                <textarea class="form-control" placeholder="Address to be Registered !"
                          readonly="">{{society_address}}</textarea>
            </div>
        </div>
        
        <div class="row" id="ul_container_for_society_registration_upload_letter">
            <div class="col-12 m-b-5px" id="letter_container_for_society_registration_upload_letter">
                <label>Upload Letter <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                <input type="file" id="letter_for_society_registration_upload_letter" name="letter_for_society_registration_upload_letter"
                       accept="image/jpg,image/png,image/jpeg,image/jfif,application/pdf">
                <div class="error-message error-message-society-registration-ul-letter_for_society_registration_upload_letter"></div>
            </div>
            <div class="form-group col-sm-12" id="letter_name_container_for_society_registration_upload_letter" style="display: none;">
                <label><span class="utitle_for_society_registration_upload_challan">Letter</span> <span style="color: red;">*</label><br>
                <a id="letter_name_href_for_society_registration_upload_letter" target="_blank">
                    <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="letter_name_for_society_registration_upload_letter"></span>
                </a>
                {{#if show_remove_upload_btn}}
                <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" style="display: none;" id="letter_remove_btn_for_society_registration_upload_letter"></span><br>
                {{/if}}
                <span class="error-message error-message-society-registration-ul-letter_name_for_society_registration_upload_letter"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks <span style="color: red;">*</span></label>
                <textarea id="upload_letter_remarks_for_society_registration"  class="form-control" placeholder="Enter Remarks !"
                          onblur="checkValidation('society-registration-ul', 'upload_letter_remarks_for_society_registration', remarksValidationMessage);">{{letter_remarks}}</textarea>
                <span class="error-message error-message-society-registration-ul-upload_letter_remarks_for_society_registration"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            {{#if show_submit_upload_btn}}
            <button type="button" id="submit_btn_for_society_registration_upload_letter" class="btn btn-sm btn-success" onclick="SocietyRegistration.listview.uploadLetter();"
                    style="margin-right: 5px;">Submit</button>
            {{/if}}
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>