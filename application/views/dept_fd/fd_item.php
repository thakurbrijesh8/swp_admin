<tr id="fd_item_{{module_type}}_{{temp_cnt}}" class="fd_item_{{module_type}}">
    <td style="width: 30px;" class="text-center dfdi-cnt-{{module_type}} v-a-m f-w-b"></td>
    <td style="vertical-align: top !important;">
        <input type="hidden" class="og_temp_cnt" value="{{temp_cnt}}" />
        <input type="hidden" id="dept_fd_id_for_ddfdi_{{temp_cnt}}" value="{{dept_fd_id}}" />
        <input type="text" class="form-control" id="description_for_ddfdi_{{temp_cnt}}"
               onblur="checkValidation('dfdi','description_for_ddfdi_{{temp_cnt}}', descValidationMessage)"
               placeholder="Description !" maxlength="50" value="{{description}}">
        <span class="error-message error-message-dfdi-description_for_ddfdi_{{temp_cnt}}"></span>
    </td>
    <td class="text-center">
        {{#if show_remove_btn}}
        <button type="button" class="btn btn-sm btn-danger"
                onclick="DeptFD.listview.removeFDI({{module_type}},{{temp_cnt}})" style="cursor: pointer;">
            <i class="fa fa-trash"></i>
        </button>
        {{/if}}
    </td>
</tr>