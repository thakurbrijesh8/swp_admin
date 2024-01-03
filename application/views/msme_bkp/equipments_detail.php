<tr id="equipments_info_{{equip_cnt}}" class="equipments_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{equip_cnt}}"><span class="equip_cnt">{{equip_cnt}}</span>
    </td>
    <td>
        <input type="text" id="equipment_name_{{equip_cnt}}" name="equipment_name_{{equip_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('incentive-partd', 'equipment_name_{{equip_cnt}}', equipmentNameValidationMessage);" value="{{equipment_name}}">
        <span class="error-message error-message-incentive-partd-equipment_name_{{equip_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="cost_{{equip_cnt}}" name="cost_{{equip_cnt}}" class="form-control"
               maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partd', 'cost_{{equip_cnt}}', costValidationMessage);" value="{{cost}}">
        <span class="error-message error-message-incentive-partd-cost_{{equip_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="MSME.listview.removeEquipmentsInfo({{equip_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
