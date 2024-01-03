<div class="text-center">
    <button type="button" class="btn btn-sm btn-primary" onclick="TreeCutting.listview.editOrViewTreeCutting($(this),'{{tree_cutting_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye"></i> &nbsp; View</button>
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_app_{{tree_cutting_id}}" onclick="TreeCutting.listview.getQueryData('{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> &nbsp; Raise / View Query</button>
    {{/if}}
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{tree_cutting_id}}"
            onclick="TreeCutting.listview.openUploadChallan('{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt"></i> &nbsp; Request For Payment</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{tree_cutting_id}}"
            onclick="TreeCutting.listview.viewPayment('{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle"></i> &nbsp; View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{tree_cutting_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign"></i> &nbsp; Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{tree_cutting_id}}" onclick="TreeCutting.listview.askForApproveApplication('{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf"></i> &nbsp; Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{tree_cutting_id}}"
            onclick="TreeCutting.listview.askForRejectApplication('{{tree_cutting_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle"></i> &nbsp; Reject</button>
    <a class="btn btn-sm btn-nic-blue" target="_blank"
       id="download_certificate_btn_for_app_{{tree_cutting_id}}"
       href="certificate/forest/{{final_certificate}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate"></i> &nbsp; Download Certificate</a>
</div>