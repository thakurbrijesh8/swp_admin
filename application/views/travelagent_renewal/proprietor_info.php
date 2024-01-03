<tr id="proprietor_info_{{per_cnt}}" class="proprietor_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="name_{{per_cnt}}" name="name_{{per_cnt}}" maxlength="100" class="form-control name" 
               onblur="checkValidation('travelagentrenewal', 'name_{{per_cnt}}', personNameValidationMessage);" value="{{name}}">
        <span class="error-message error-message-travelagentrenewal-new_employees_name{{per_cnt}}"></span> 
    </td>
    <td class="text-center view_hideen">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="TravelagentRenewal.listview.removeProprietorInfo({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
