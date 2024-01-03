<tr id="proprietor_info_{{per_cnt}}" class="proprietor_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="occupier_name_{{per_cnt}}" name="occupier_name_{{per_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('repairer', 'occupier_name_{{per_cnt}}', occupierNameValidationMessage);" value="{{occupier_name}}">
        <span class="error-message error-message-repairer-occupier_name_{{per_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="address_{{per_cnt}}" name="address_{{per_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('repairer', 'address_{{per_cnt}}', proprietorAddressValidationMessage);" value="{{address}}">
        <span class="error-message error-message-repairer-address_{{per_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Dealer.listview.removeProprietorInfo({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
