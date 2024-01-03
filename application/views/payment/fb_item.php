<tr id="fb_row_{{module_type}}_{{fb_cnt}}" class="fb_row_{{module_type}}">
    <td style="width: 30px;" class="text-center fb-cnt v-a-m f-w-b"></td>
    <td style="vertical-align: top !important;">
        <input type="hidden" class="og_fb_cnt" value="{{fb_cnt}}" />
        <input type="hidden" id="fb_id_for_fb_{{fb_cnt}}" value="{{fees_bifurcation_id}}" />
        {{#if show_dropdown}}
        <select id="dept_fd_id_for_fb_{{fb_cnt}}" name="dept_fd_id_for_fb_{{fb_cnt}}" class="form-control"
                onchange="checkValidation('department', 'dept_fd_id_for_fb_{{fb_cnt}}', oneOptionValidationMessage);">
            <option value="">Select Description</option>
        </select>
        <span class="error-message error-message-fb-dept_fd_id_for_fb_{{fb_cnt}}"></span>
        {{else}}
        <input type="text" class="form-control" id="desc_for_fb_{{fb_cnt}}"
               onblur="checkValidation('fb','desc_for_fb_{{fb_cnt}}', descValidationMessage)"
               placeholder="Description !" maxlength="50" value="{{fee_description}}" 
               {{#if is_allow_changes}}
               {{else}}
               disabled
               {{/if}}
               >
        <span class="error-message error-message-fb-desc_for_fb_{{fb_cnt}}"></span>
        {{/if}}
    </td>
    <td style="vertical-align: top !important;">
        <input type="text" class="form-control text-right fee_for_fb_{{module_type}}" id="fee_for_fb_{{fb_cnt}}"
               onblur="checkValidation('fb','fee_for_fb_{{fb_cnt}}', feesValidationMessage);"
               onkeyup="fbFeeCalculation({{module_type}});" placeholder="Fee !" maxlength="6" value="{{fee}}"
               {{#if is_allow_changes}}
               {{else}}
               disabled
               {{/if}}>
        <span class="error-message error-message-fb-fee_for_fb_{{fb_cnt}}"></span>
    </td>
    {{#if is_allow_changes}}
    <td class="text-center">
        <button type="button" class="btn btn-sm btn-danger"
                onclick="askForRemoveFBRow({{module_type}},{{fb_cnt}})" style="cursor: pointer;">
            <i class="fa fa-trash"></i>
        </button>
    </td>
    {{/if}}
</tr>