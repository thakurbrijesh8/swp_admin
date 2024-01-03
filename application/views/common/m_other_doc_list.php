<div class="card">
    <div class="card-header bg-nic-blue p-2">
        <h3 class="card-title f-w-b f-s-16px">Other Documents to be Submitted Along with Application Form (If Require)</h3>
    </div>
    <div class="card-body border-nic-blue">
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 40px;">No.</th>
                        <th class="text-center" style="min-width: 280px;">Document Name</th>
                        <th class="text-center" style="width: 320px;">Document{{#if is_edit}} <br><span style="color: red;">(Maximum File Size: 2MB)(Upload PDF Only)</span>{{/if}}</th>
                        {{#if is_edit}}
                        <th class="text-center" style="width: 75px;">Action</th>
                        {{/if}}
                    </tr>
                </thead>
                <tbody id="other_doc_item_container_for_{{module_type}}{{is_view}}" class="other_doc_item_{{module_type}}"></tbody>
            </table>
        </div>
        {{#if is_edit}}
        <div class="row">
            <div class="col-12">
                <button type="button" class="btn btn-nic-blue btn-sm pull-right" onclick="addMOtherDocumentRow({{module_type}}, {});">
                    <i class="fas fa-plus-square"></i> &nbsp; Add More Documents</button>
            </div>
        </div>
        {{/if}}
    </div>
</div>