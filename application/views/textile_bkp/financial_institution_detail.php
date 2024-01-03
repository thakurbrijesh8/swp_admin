<tr id="financial_institution_info_{{detail_cnt}}" class="financial_institution_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{detail_cnt}}"><span class="display-cnt">{{detail_cnt}}</span>
    </td>
    <td>
        <input type="text" id="name_address_{{detail_cnt}}" name="name_address_{{detail_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('incentive-parta', 'name_address_{{detail_cnt}}', nameAddressValidationMessage);" value="{{name_address}}">
        <span class="error-message error-message-incentive-parta-name_address_{{detail_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="ifsc_code_{{detail_cnt}}" name="ifsc_code_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'ifsc_code_{{detail_cnt}}', ifscCodeValidationMessage);" value="{{ifsc_code}}">
        <span class="error-message error-message-incentive-parta-ifsc_code_{{detail_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="branch_code_{{detail_cnt}}" name="branch_code_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'branch_code_{{detail_cnt}}', branchCodeValidationMessage);" value="{{branch_code}}">
        <span class="error-message error-message-incentive-parta-branch_code_{{detail_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="loan_type_{{detail_cnt}}" name="loan_type_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'loan_type_{{detail_cnt}}', loanTypeValidationMessage);" value="{{loan_type}}">
        <span class="error-message error-message-incentive-parta-loan_type_{{detail_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="sanction_amount_{{detail_cnt}}" name="sanction_amount_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'sanction_amount_{{detail_cnt}}', sanctionAmountValidationMessage);" value="{{sanction_amount}}">
        <span class="error-message error-message-incentive-parta-sanction_amount_{{detail_cnt}}"></span>
    </td>
    <td width="20%">
        <!-- <input type="text" id="address_{{detail_cnt}}" name="address_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'address_{{detail_cnt}}', proprietorAddressValidationMessage);" value="{{address}}">
        <span class="error-message error-message-incentive-parta-address_{{detail_cnt}}"></span> -->

        <div class="input-group date">
            <input type="text" name="financial_date_{{detail_cnt}}" id="financial_date_{{detail_cnt}}" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                   value="{{financial_date}}" onblur="checkValidation('incentive-parta', 'financial_date_{{detail_cnt}}', dateValidationMessage);">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-calendar"></i></span>
            </div>
            <span class="error-message error-message-incentive-parta-financial_date_{{detail_cnt}}"></span>
        </div>
    </td>
    <td>
        <input type="text" id="rate_{{detail_cnt}}" name="rate_{{detail_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('incentive-parta', 'rate_{{detail_cnt}}', rateValidationMessage);" value="{{rate}}">
        <span class="error-message error-message-incentive-parta-rate_{{detail_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="MSME.listview.removeFinancialInstitutionInfo({{detail_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
