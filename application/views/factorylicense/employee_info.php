<tr id="employee_info_{{emp_cnt}}" class="employee_info" style="background-color: #fff;">
    <td style="width: 5px;">
        <input type="hidden" class='temp_cnt' value="{{emp_cnt}}"><span class="display-cnt-emp">{{emp_cnt}}</span>
    </td>
    <td>
        <input type="text" id="manager_name_{{emp_cnt}}" name="manager_name_{{emp_cnt}}" maxlength="100" class="form-control" value="{{manager_name}}">
        <span class="error-message error-message-factory-license-manager_name_{{emp_cnt}}"></span> 
    </td>
    <td>
        <input type="text" id="managing_director_name_{{emp_cnt}}" name="managing_director_name_{{emp_cnt}}" class="form-control" maxlength="100" value="{{managing_director_name}}">
        <span class="error-message error-message-factory-license-managing_director_name_{{emp_cnt}}"></span>
    </td>
    <td>
        <button type="button" class="btn btn-xs btn-danger" style="margin-top: 2px;" onclick="FactoryLicense.listview.removeEmployeeInfo({{emp_cnt}});">
            <label class="fa fa-trash label-btn-icon"></label>
        </button>
    </td>
</tr>
