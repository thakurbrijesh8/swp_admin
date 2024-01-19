<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="Aplicence.listview.editOrViewAplicence($(this),'{{aplicence_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="Aplicence.listview.editOrViewAplicence($(this),'{{aplicence_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Aplicence.listview.generateForm1('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-IV</button>
    {{/if}}
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_lice_{{aplicence_id}}" onclick="Aplicence.listview.getQueryData('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{/if}}
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{aplicence_id}}"
            onclick="Aplicence.listview.openUploadChallan('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt" style="margin-right: 2px;"></i> Request For Payment</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <button type="button" class="btn btn-sm btn-success" id="download_fees_paid_challan_btn_{{aplicence_id}}"
            onclick="Aplicence.listview.viewPayment('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-info-circle" style="margin-right: 2px;"></i> View Payment</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{aplicence_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign" style="margin-right: 2px;"></i> Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{aplicence_id}}" onclick="Aplicence.listview.askForApproveApplication('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i>Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{aplicence_id}}"
            onclick="Aplicence.listview.askForRejectApplication('{{aplicence_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    <a class="btn btn-sm btn-nic-blue" target="_blank"
       id="download_certificate_btn_for_app_{{aplicence_id}}"
       href="certificate/labour/{{final_certificate}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</a>
</div>