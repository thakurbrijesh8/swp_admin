<tr id="agent_info_{{per_cnt}}" class="agent_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="name_of_agent_{{per_cnt}}" name="name_of_agent_{{per_cnt}}" maxlength="100" class="form-control name_of_agent" 
               onblur="checkValidation('hotelregi', 'name_of_agent_{{per_cnt}}', agentNameValidationMessage);" value="{{name}}">
        <span class="error-message error-message-hotelregi-name_of_agent_{{per_cnt}}"></span> 
    </td>
    <td class="text-center remove_btn_hidden">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Hotelregi.listview.removeAgentInfo({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
