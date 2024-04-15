<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" id="edit_btn_{{manufacturer_renewal_id}}" onclick="ManufacturerRenewal.listview.editOrViewManufacturerRenewal($(this),'{{manufacturer_renewal_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="ManufacturerRenewal.listview.editOrViewManufacturerRenewal($(this),'{{manufacturer_renewal_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="ManufacturerRenewal.listview.generateForm1('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-1</button>
    {{/if}}
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_wm_{{manufacturer_renewal_id}}" onclick="ManufacturerRenewal.listview.getQueryData('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{/if}}
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{manufacturer_renewal_id}}"
            onclick="ManufacturerRenewal.listview.openUploadChallan('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt" style="margin-right: 2px;"></i> Request For Payment</button>
    {{/if}}
    {{#if show_withdraw_application_btn}}
    <button type="button" class="btn btn-sm btn-secondary" id="withdraw_application_btn_{{manufacturer_renewal_id}}"
            onclick="askForWithdrawApplication($(this), VALUE_SIXTEEN,'{{manufacturer_renewal_id}}')"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-undo" style="margin-right: 2px;"></i> Withdraw</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{manufacturer_renewal_id}}"
            onclick="ManufacturerRenewal.listview.viewPayment('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle" style="margin-right: 2px;"></i> View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{manufacturer_renewal_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign" style="margin-right: 2px;"></i> Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{manufacturer_renewal_id}}" onclick="ManufacturerRenewal.listview.askForApproveApplication('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Approve</button>
    <!--   <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{manufacturer_renewal_id}}"
              onclick="ManufacturerRenewal.listview.askForRejectApplication('{{manufacturer_renewal_id}}');"
              style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
          <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button> -->

    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{manufacturer_renewal_id}}"
            onclick="ManufacturerRenewal.listview.askForRejectApplication('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>

    <button type="button" class="btn btn-sm btn-nic-blue"
            id="download_certificate_btn_for_app_{{manufacturer_renewal_id}}"
            onclick="ManufacturerRenewal.listview.generateCertificate('{{manufacturer_renewal_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</button>
    {{#if show_fr_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="showFeedbackRating($(this), VALUE_SIXTEEN,'{{manufacturer_renewal_id}}')"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-star" style="margin-right: 2px;"></i> View Feedback / Rating</button>
    {{/if}}
</div>