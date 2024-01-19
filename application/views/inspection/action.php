<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="Inspection.listview.editOrViewInspection($(this),'{{inspection_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="Inspection.listview.editOrViewInspection($(this),'{{inspection_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Inspection.listview.generateForm1('{{inspection_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form-1</button>
    {{/if}}
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_inspection_{{inspection_id}}" onclick="Inspection.listview.getQueryData('{{inspection_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{inspection_id}}" onclick="Inspection.listview.askForApproveApplication('{{inspection_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{inspection_id}}"
            onclick="Inspection.listview.askForRejectApplication('{{inspection_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    <a class="btn btn-sm btn-nic-blue" target="_blank"
       id="download_certificate_btn_for_app_{{inspection_id}}"
       href="certificate/pda/{{final_certificate}}"
       style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</a>
    {{#if show_fr_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="showFeedbackRating($(this), VALUE_TWENTYSEVEN,'{{inspection_id}}')"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-star" style="margin-right: 2px;"></i> View Feedback / Rating</button>
    {{/if}}
</div>