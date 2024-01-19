<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="Noc.listview.editOrViewNoc($(this),'{{noc_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="Noc.listview.editOrViewNoc($(this),'{{noc_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Noc.listview.generateForm1('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-1</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_noc_{{noc_id}}" onclick="Noc.listview.getQueryData('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{#if show_upload_challan_btn}}
    <button type="button" class="btn btn-sm btn-info" id="upload_challan_btn_{{noc_id}}"
            onclick="Noc.listview.openUploadChallan('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-cloud-upload-alt" style="margin-right: 2px;"></i> Send Challan</button>
    {{/if}}
    {{#if show_download_fees_paid_challan_btn}}
    <a class="btn btn-sm btn-success color-nic-white" target="_blank"
       href="{{NOC_DOC_PATH}}{{fees_paid_challan}}" id="download_fees_paid_challan_btn_{{noc_id}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-cloud-download-alt" style="margin-right: 2px;"></i> Fees Paid Challan
    </a>
    {{/if}}
    <button type="button" class="btn btn-sm btn-warning" id="confirm_payment_btn_for_app_{{noc_id}}"
            onclick="askForConfirmPayment('{{module_type}}', '{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_payment_confirm_btn}}">
        <i class="fas fa-rupee-sign" style="margin-right: 2px;"></i> Confirm Payment</button>
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{noc_id}}" onclick="Noc.listview.askForApproveApplication('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i>Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{noc_id}}"
            onclick="Noc.listview.askForRejectApplication('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    {{#if show_download_certificate_btn}}
    <button type="button" class="btn btn-sm btn-nic-blue" onclick="Noc.listview.generateCertificate('{{noc_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</button>
    {{/if}}
</div>