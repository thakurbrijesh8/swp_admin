<tr id="employees_info_{{item_cnt}}" class="employees_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{item_cnt}}"><span class="display-cnt">{{item_cnt}}</span>
    </td>
    <td>
        <input type="text" id="employees_name_{{item_cnt}}" name="employees_name_{{item_cnt}}" maxlength="100" class="form-control" disabled placeholder="Employee Name !"
               onblur="checkValidation('shop', 'employees_name_{{item_cnt}}', shopEmployeeNameValidationMessage);" value="{{employeeName}}">
        <span class="error-message error-message-shop-employees_name_{{item_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="employees_managerial_capacity_{{item_cnt}}" name="employees_managerial_capacity_{{item_cnt}}" class="form-control" disabled placeholder="Managerial Capacity !"
               maxlength="100" onblur="checkValidation('shop', 'employees_managerial_capacity_{{item_cnt}}', shopEmployeeManagerialCapacityValidationMessage);" value="{{employeeManagerialCapacity}}">
        <span class="error-message error-message-shop-employees_managerial_capacity_{{item_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="employees_type_{{item_cnt}}" name="employees_type_{{item_cnt}}" class="form-control" disabled placeholder="Employee Type !"
               maxlength="100" onblur="checkValidation('shop', 'employees_type_{{item_cnt}}', shopEmployeeTypeValidationMessage);" value="{{employeeType}}">
        <span class="error-message error-message-shop-employees_type_{{item_cnt}}"></span>
    </td>
    <td>
        <input type="text" id="employees_godown_employed_{{item_cnt}}" name="employees_godown_employed_{{item_cnt}}" class="form-control" disabled placeholder="Godown Employed !"
               maxlength="100" onblur="checkValidation('shop', 'employees_godown_employed_{{item_cnt}}', shopEmployeeGodownEmployedValidationMessage);" value="{{employeeGodownEmployed}}">
        <span class="error-message error-message-shop-employees_godown_employed_{{item_cnt}}"></span>
    </td>
    <td>
        <input type="radio" id="employees_gender_male_{{item_cnt}}" name="employees_gender_{{item_cnt}}" disabled
                value="{{VALUE_ONE}}">&nbsp;Male<br>
    
        <input type="radio" id="employees_gender_female_{{item_cnt}}" name="employees_gender_{{item_cnt}}" style="margin-bottom: 0px;" disabled
                value="{{VALUE_TWO}}">&nbsp;Female
        <span class="error-message error-message-shop-employees_gender_{{item_cnt}}"></span>
    </td>
    <td class="text-center">
        <input type="checkbox" id="employees_adult_{{item_cnt}}" name="employees_adult_{{item_cnt}}" class="checkbox1" disabled
               value="{{is_checked}}">
    </td>
    <td class="text-center">
        <input type="checkbox" id="employees_young_person_{{item_cnt}}" name="employees_young_person_{{item_cnt}}" class="checkbox2"  
                value="{{is_checked}}" disabled>
    </td>
</tr>
