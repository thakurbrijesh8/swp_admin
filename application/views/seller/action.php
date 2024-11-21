<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" id="edit_btn_{{seller_id}}" onclick="Seller.listview.editOrViewSeller($(this),'{{seller_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="Seller.listview.editOrViewSeller($(this),'{{seller_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Seller.listview.generateForm1('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-1</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_seller_{{seller_id}}" onclick="Seller.listview.getQueryData('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{seller_id}}"
            onclick="Seller.listview.openUploadChallan('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt" style="margin-right: 2px;"></i> Request For Payment</button>
    {{/if}}
    {{#if show_withdraw_application_btn}}
    <button type="button" class="btn btn-sm btn-secondary" id="withdraw_application_btn_{{seller_id}}"
            onclick="askForWithdrawApplication($(this), VALUE_EIGHTEEN,'{{seller_id}}')"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-undo" style="margin-right: 2px;"></i> Withdraw</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{seller_id}}"
            onclick="Seller.listview.viewPayment('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle" style="margin-right: 2px;"></i> View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{seller_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign" style="margin-right: 2px;"></i> Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{seller_id}}" onclick="Seller.listview.askForApproveApplication('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{seller_id}}"
            onclick="Seller.listview.askForRejectApplication('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    {{#if show_download_certificate_btn}}
    <button type="button" class="btn btn-sm btn-nic-blue" onclick="Seller.listview.generateCertificate('{{seller_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</button>
    {{/if}}
    {{#if show_fr_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="showFeedbackRating($(this), VALUE_EIGHTEEN,'{{seller_id}}')"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-star" style="margin-right: 2px;"></i> View Feedback / Rating</button>
    {{/if}}
</div>