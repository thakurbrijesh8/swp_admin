<div class="text-center">
{{#if show_edit_btn}}
<button type="button" class="btn btn-sm btn-success" onclick="Dealer.listview.editOrViewDealer($(this),'{{dealer_id}}',true);"
        style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
    <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
{{/if}}
<button type="button" class="btn btn-sm btn-primary" onclick="Dealer.listview.editOrViewDealer($(this),'{{dealer_id}}',false);"
        style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
    <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
{{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Dealer.listview.generateForm1('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-1</button>
    {{/if}}
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_wm_{{dealer_id}}" onclick="Dealer.listview.getQueryData('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{/if}}
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{dealer_id}}"
            onclick="Dealer.listview.openUploadChallan('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt" style="margin-right: 2px;"></i> Request For Payment</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{dealer_id}}"
            onclick="Dealer.listview.viewPayment('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle" style="margin-right: 2px;"></i> View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{dealer_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign" style="margin-right: 2px;"></i> Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{dealer_id}}" onclick="Dealer.listview.askForApproveApplication('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i>Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{dealer_id}}"
            onclick="Dealer.listview.askForRejectApplication('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    <button type="button" class="btn btn-sm btn-nic-blue"
            id="download_certificate_btn_for_app_{{dealer_id}}"
            onclick="Dealer.listview.generateCertificate('{{dealer_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</button>
</div>