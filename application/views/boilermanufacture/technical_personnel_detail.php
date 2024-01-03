<tr id="technical_personnel_detail_{{per_cnt}}" class="technical_personnel_detail" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{per_cnt}}"><span class="display-cnt">{{per_cnt}}</span>
    </td>
    <td>
        <input type="text" id="supervisor_name_{{per_cnt}}" name="supervisor_name_{{per_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('boiler-manufacture', 'supervisor_name_{{per_cnt}}', supervisorNameValidationMessage);" value="{{supervisor_name}}">
        <span class="error-message error-message-boiler-manufacture-supervisor_name_{{per_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="qualification_{{per_cnt}}" name="qualification_{{per_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('boiler-manufacture', 'qualification_{{per_cnt}}', qualificationValidationMessage);" value="{{qualification}}">
        <span class="error-message error-message-boiler-manufacture-qualification_{{per_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="experience_{{per_cnt}}" name="experience_{{per_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('boiler-manufacture', 'experience_{{per_cnt}}', experienceValidationMessage);" value="{{experience}}">
        <span class="error-message error-message-boiler-manufacture-experience_{{per_cnt}}"></span>
    </td>    <td class="text-center">
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="BoilerManufacture.listview.removeTechnicalPersonnel({{per_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
