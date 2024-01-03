<tr id="landallot_proprietor_info_{{per_cnt}}" class="landallot_proprietor_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="name_{{per_cnt}}" name="name_{{per_cnt}}" maxlength="100" class="form-control" onblur="checkValidation('landallotment', 'name_{{per_cnt}}', applicantNameValidationMessage);" value="{{name}}">
        <span class="error-message error-message-landallotment-name_{{per_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="address_{{per_cnt}}" name="address_{{per_cnt}}" class="form-control" onblur="checkValidation('landallotment', 'address_{{per_cnt}}', applicantAddressValidationMessage);" value="{{address}}">
        <span class="error-message error-message-landallotment-address_{{per_cnt}}"></span>
    </td>
    <td>
        <select class="form-control" id="applicant_type_{{per_cnt}}" name="applicant_type_{{per_cnt}}"
                                        data-placeholder="Status !" onblur="checkValidation('landallotment', 'applicant_type_{{per_cnt}}', applicantTypeValidationMessage);">
                                    <option value="">Select Applicant Type</option>
                                    <option value="Proprietor">Proprietor</option>
                                    <option value="Partners">Partners</option>
                                    <option value="Directors">Directors</option>
                                </select>
        <span class="error-message error-message-landallotment-applicant_type_{{per_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="Landallotment.listview.removeProprietorInfo({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
