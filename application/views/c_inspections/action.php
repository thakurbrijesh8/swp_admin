{{#if show_edit}}
<button type="button" class="btn btn-sm btn-success" onclick="CInspections.listview.editCInspections($(this),'{{c_inspection_id}}', false);"
        style="margin-right: 5px; padding: 2px 7px; margin-bottom: 3px;"><i class="fas fa-edit"></i> Inspection Details</button>
{{/if}}
{{#if show_rand_lock_btn}}
<button type="button" class="btn btn-sm btn-primary" id="randomize_btn_for_ci_{{c_inspection_id}}"
        onclick="CInspections.listview.askForRandomize('{{c_inspection_id}}');"
        style="margin-right: 5px; padding: 2px 7px; margin-bottom: 3px;"><i class="fas fa-sync"></i> &nbsp; Rando. Inspector</button>
<button type="button" class="btn btn-sm btn-warning" id="lock_btn_for_ci_{{c_inspection_id}}"
        onclick="CInspections.listview.askForLock('{{c_inspection_id}}');"
        style="margin-right: 5px; padding: 2px 7px; margin-bottom: 2px;"><i class="fas fa-lock"></i> &nbsp; Lock Randomiza.</button>
{{/if}}
<button type="button" class="btn btn-sm btn-nic-blue" onclick="CInspections.listview.editCInspections($(this),'{{c_inspection_id}}', true);"
        style="margin-right: 5px; padding: 2px 7px;">View / Upload Report</button>