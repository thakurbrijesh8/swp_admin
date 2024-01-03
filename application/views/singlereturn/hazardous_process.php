<tr id="hazardous_process_info_{{hazardous_cnt}}" class="hazardous_process_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt2' value="{{hazardous_cnt}}"><span class="hazardous-cnt">{{hazardous_cnt}}</span>
    </td>
    <td>
        <input type="text" id="hz_process_name_{{hazardous_cnt}}" name="hz_process_name_{{hazardous_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'hz_process_name_{{hazardous_cnt}}', processNameValidationMessage);" value="{{hz_process_name}}">
        <span class="error-message error-message-single-return-hz_process_name_{{hazardous_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="hz_employed_person_{{hazardous_cnt}}" name="hz_employed_person_{{hazardous_cnt}}" class="form-control"
               maxlength="100" onblur="checkValidation('contractor', 'hz_employed_person_{{hazardous_cnt}}', employedPersonValidationMessage);" value="{{hz_employed_person}}">
        <span class="error-message error-message-single-return-hz_employed_person_{{hazardous_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="hz_examined_male_{{hazardous_cnt}}" name="hz_examined_male_{{hazardous_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'hz_examined_male_{{hazardous_cnt}}', examinedMaleValidationMessage);" value="{{hz_examined_male}}">
        <span class="error-message error-message-single-return-hz_examined_male_{{hazardous_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="hz_examined_female_{{hazardous_cnt}}" name="hz_examined_female_{{hazardous_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'hz_examined_female_{{hazardous_cnt}}', examinedFemaleValidationMessage);" value="{{hz_examined_female}}">
        <span class="error-message error-message-single-return-hz_examined_female_{{hazardous_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="hz_unfit_male_{{hazardous_cnt}}" name="hz_unfit_male_{{hazardous_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'hz_unfit_male_{{hazardous_cnt}}', unfitMaleValidationMessage);" value="{{hz_unfit_male}}">
        <span class="error-message error-message-single-return-hz_unfit_male_{{hazardous_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="hz_unfit_female_{{hazardous_cnt}}" name="hz_unfit_female_{{hazardous_cnt}}" maxlength="100" class="form-control" 
               onblur="checkValidation('single-return', 'hz_unfit_female_{{hazardous_cnt}}', unfitFemaleValidationMessage);" value="{{hz_unfit_female}}">
        <span class="error-message error-message-single-return-hz_unfit_female_{{hazardous_cnt}}"></span> 
    </td>
    <td>
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="SingleReturn.listview.removeHazardousProcessInfo({{hazardous_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
