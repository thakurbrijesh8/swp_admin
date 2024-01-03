<tr id="proprietor_share_info_{{share_cnt}}" class="proprietor_share_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{share_cnt}}"><span class="share_cnt">{{share_cnt}}</span>
    </td>
    <td>
        <input type="text" id="name_{{share_cnt}}" name="name_{{share_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('msme', 'name_{{share_cnt}}', personsNameValidationMessage);" value="{{name}}">
        <span class="error-message error-message-msme-name_{{share_cnt}}"></span> 
    </td>
    <td width="10% ">&emsp;
        <input type="radio" id="gender_male_{{share_cnt}}" name="gender_{{share_cnt}}" class="" value="{{VALUE_ONE}}">&nbsp; Male<br>
        &emsp;
        <input type="radio" id="gender_female_{{share_cnt}}" name="gender_{{share_cnt}}" class="" style="margin-bottom: 0px;"
               maxlength="100" value="{{VALUE_TWO}}">&nbsp;Female
    </td>
    <td>
        <input type="text" id="community_{{share_cnt}}" name="community_{{share_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('msme', 'community_{{share_cnt}}', communityValidationMessage);" value="{{community}}">
        <span class="error-message error-message-msme-community_{{share_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="ph_{{share_cnt}}" name="ph_{{share_cnt}}" class="form-control"
               maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('msme', 'ph_{{share_cnt}}', phValidationMessage);" value="{{ph}}">
        <span class="error-message error-message-msme-ph_{{share_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="share_{{share_cnt}}" name="share_{{share_cnt}}" class="form-control"
               maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('msme', 'share_{{share_cnt}}', shareValidationMessage);" value="{{share}}">
        <span class="error-message error-message-msme-share_{{share_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="value_{{share_cnt}}" name="value_{{share_cnt}}" class="form-control"
               maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('msme', 'value_{{share_cnt}}', valueValidationMessage);" value="{{value}}">
        <span class="error-message error-message-msme-value_{{share_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="percent_{{share_cnt}}" name="percent_{{share_cnt}}" class="form-control"
               maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('msme', 'percent_{{share_cnt}}', percentValidationMessage);" value="{{percent}}">
        <span class="error-message error-message-msme-percent_{{share_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="MSME.listview.removeEquipmentsInfo({{share_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
