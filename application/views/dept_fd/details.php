<tr id="dept_fd_item_container_for_dfdlist_{{module_type}}" class="dept-fd-item-container-for-dfdlist">
    <td class="text-center f-w-b dept-fd-display-cnt"></td>
    <td class="text-center">{{department_name}}</td>
    <td>
        <input type="hidden" id="dept_fd_id_for_dfdlist_{{module_type}}" value="{{module_type}}" />
        <input type="hidden" class="dept-fd-h-cnt" value="{{module_type}}" />
        {{title}}
    </td>
    <td id="fee_details_for_dfdlist_{{module_type}}"></td>
    <td class="text-center">
        <button type="button" 
                class="btn btn-sm btn-success" style="padding: 2px 7px;"
                onclick="DeptFD.listview.getFeeDetails($(this),'{{module_type}}');">Update Fee Details</button>
    </td>
</tr>