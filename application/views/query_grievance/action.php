<div class="text-center">
    {{#if show_edit_btn}}
    <button type="button" class="btn btn-sm btn-success" onclick="QueryGrievance.listview.replyQueryGrievance($(this),'{{query_grievance_id}}', true);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-pencil-alt" style="margin-right: 2px;"></i>Reply</button>
    {{/if}}
    <button type="button" class="btn btn-sm btn-primary" onclick="QueryGrievance.listview.replyQueryGrievance($(this),'{{query_grievance_id}}', false);"
            style="padding: 2px 7px; margin-top: 1px; margin-bottom: 2px;">
        <i class="fas fa-eye" style="margin-right: 2px;"></i> View</button>
</div>