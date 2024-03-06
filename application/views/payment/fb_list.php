<hr>
<div class="f-w-b">
    Fees Details <span style="color: red;">*</span>
</div>
<div class="table-responsive">
    <table class="table table-bordered table-hover m-b-5px">
        <thead>
            <tr class="bg-light-gray">
                <th class="text-center" style="width: 30px;">No.</th>
                <th class="text-center" style="min-width: 250px;">Fee Description</th>
                <th class="text-center" style="min-width: 90px;">Fee</th>
                {{#if is_allow_changes}}
                <th class="text-center" style="width: 50px;"></th>
                {{/if}}
            </tr>
        </thead>
        <tbody id="fb_item_container_for_{{module_type}}"></tbody>
        <tfoot>
            <tr class="bg-light-gray">
                <th class="text-right" colspan="2">Total Fees Payment : </th>
                <th id="total_fees_for_fb_{{module_type}}" class="text-right">0 /-</th>
                {{#if is_allow_changes}}
                <th class="text-center"></th>
                {{/if}}
            </tr>
        </tfoot>
    </table>
    {{#if is_allow_changes}}
    <button type="button" class="btn btn-sm btn-nic-blue"
            onclick="addFBRow({{module_type}}, {'is_allow_changes' : true, 'show_dropdown' : '{{show_dropdown}}'});" style="margin-right: 5px;">Add More</button>
    {{/if}}
</div>