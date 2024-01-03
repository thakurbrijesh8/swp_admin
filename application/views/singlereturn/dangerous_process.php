<tr id="dangerous_process_info_{{process_cnt}}" class="dangerous_process_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{process_cnt}}"><span class="display-cnt">{{process_cnt}}</span>
    </td>
    <td>
        <input type="text" id="process_name_{{process_cnt}}" name="process_name_{{process_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'process_name_{{process_cnt}}', processNameValidationMessage);" value="{{process_name}}">
        <span class="error-message error-message-single-return-process_name_{{process_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="employed_person_{{process_cnt}}" name="employed_person_{{process_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('contractor', 'employed_person_{{process_cnt}}', employedPersonValidationMessage);" value="{{employed_person}}">
        <span class="error-message error-message-single-return-employed_person_{{process_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="examined_male_{{process_cnt}}" name="examined_male_{{process_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'examined_male_{{process_cnt}}', examinedMaleValidationMessage);" value="{{examined_male}}">
        <span class="error-message error-message-single-return-examined_male_{{process_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="examined_female_{{process_cnt}}" name="examined_female_{{process_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'examined_female_{{process_cnt}}', examinedFemaleValidationMessage);" value="{{examined_female}}">
        <span class="error-message error-message-single-return-examined_female_{{process_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="unfit_male_{{process_cnt}}" name="unfit_male_{{process_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'unfit_male_{{process_cnt}}', unfitMaleValidationMessage);" value="{{unfit_male}}">
        <span class="error-message error-message-single-return-unfit_male_{{process_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="unfit_female_{{process_cnt}}" name="unfit_female_{{process_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'unfit_female_{{process_cnt}}', unfitFemaleValidationMessage);" value="{{unfit_female}}">
        <span class="error-message error-message-single-return-unfit_female_{{process_cnt}}"></span> 
    </td>
    <td>
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="SingleReturn.listview.removeProcessInfo({{process_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
