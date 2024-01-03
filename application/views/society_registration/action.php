<div class="text-center">
    <button type="button" class="btn btn-sm btn-primary" onclick="SocietyRegistration.listview.editOrViewSocietyRegistration($(this),'{{society_registration_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye"></i> &nbsp; View</button>
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_app_{{society_registration_id}}" onclick="SocietyRegistration.listview.getQueryData('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> &nbsp; Raise / View Query</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary btn-nic-blue" id="upload_letter_btn_{{society_registration_id}}"
            onclick="SocietyRegistration.listview.openUploadLetter('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-cloud-upload-alt"></i> &nbsp; Upload Letter</button>
    {{#if show_download_passbook_btn}}
    <a class="btn btn-sm btn-warning"
       target="_blank" href="<?php echo SOCIETY_REGISTRATION_DOC_PATH; ?>{{passbook}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-cloud-download-alt"></i> Download Passbook</a>    
    {{/if}}
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{society_registration_id}}"
            onclick="SocietyRegistration.listview.openUploadChallan('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt"></i> &nbsp; Request For Payment</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{society_registration_id}}"
            onclick="SocietyRegistration.listview.viewPayment('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle"></i> &nbsp; View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{society_registration_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign"></i> &nbsp; Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{society_registration_id}}" onclick="SocietyRegistration.listview.askForApproveApplication('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf"></i> &nbsp; Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{society_registration_id}}"
            onclick="SocietyRegistration.listview.askForRejectApplication('{{society_registration_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle"></i> &nbsp; Reject</button>
    <a class="btn btn-sm btn-nic-blue" target="_blank"
       id="download_certificate_btn_for_app_{{society_registration_id}}"
       href="certificate/rev_coll/{{final_certificate}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate"></i> &nbsp; Download Certificate</a>
</div>