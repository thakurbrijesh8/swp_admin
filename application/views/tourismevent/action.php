<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="Tourismevent.listview.editOrViewTourismevent($(this),'{{tourismevent_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i> Edit</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="Tourismevent.listview.editOrViewTourismevent($(this),'{{tourismevent_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
    {{#if show_form_one_btn}}
    <button type="button" class="btn btn-sm btn-danger" 
            onclick="Tourismevent.listview.generateForm('{{tourismevent_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;"><i class="fas fa-file-pdf" style="margin-right: 2px;"></i> Form</button>
    {{/if}}
    {{#if show_rv_query_btn}}
    <button type="button" class="btn btn-sm btn-warning" id="query_btn_for_tourismevent_{{tourismevent_id}}" onclick="Tourismevent.listview.getQueryData('{{tourismevent_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-question" style="margin-right: 5px;"></i> Raise / View Query</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-success" id="approve_btn_for_app_{{tourismevent_id}}" onclick="Tourismevent.listview.askForApproveApplication('{{tourismevent_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_approve_btn}}">
        <i class="fas fa-file-pdf" style="margin-right: 2px;"></i>Approve</button>
    <button type="button" class="btn btn-sm btn-danger" id="reject_btn_for_app_{{tourismevent_id}}"
            onclick="Tourismevent.listview.askForRejectApplication('{{tourismevent_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{show_reject_btn}}">
        <i class="fas fa-times-circle" style="margin-right: 2px;"></i> Reject</button>
    <button type="button" class="btn btn-sm btn-nic-blue" id="download_certificate_btn_for_app_{{tourismevent_id}}"
            onclick="Tourismevent.listview.generateCertificate('{{tourismevent_id}}');"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px; {{download_certificate_style}}">
        <i class="fas fa-certificate" style="margin-right: 2px;"></i> Download Certificate</button>
</div>