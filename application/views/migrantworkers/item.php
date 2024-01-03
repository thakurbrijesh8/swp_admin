<tr id="migrant_contractor_workers_name_{{item_cnt}}" class="migrant_contractor_workers_name" style="background-color: #fff;">
    <td style="width: 10px;">
        <input type="hidden" class='temp_cnt' value="{{item_cnt}}"><label>Sr No.</label><br><span class="display-cnt">{{item_cnt}}</span>
    </td>
    <td style="width: 260px;"><label>Contractor Establishment<br> Name <span style="color: red;">*</span></label><br>
        <input type="text" id="migrant_contractor_proprietor_name_{{item_cnt}}" name="migrant_contractor_proprietor_name_" maxlength="100" class="form-control" style="margin-top: 20px;"
               onblur="checkValidation('migrantworkers', 'migrant_contractor_proprietor_name_{{item_cnt}}', contractorPropriterNameValidationMessage);" value="{{mc_proprietor_name}}" placeholder="Contractor Establishment Name !">
        <span class="error-message error-message-migrantworkers-migrant_contractor_proprietor_name_{{item_cnt}}"></span> 
    </td>
    <td style="width: 260px;"><label>Name of<br> contractors  <span style="color: red;">*</span></label>
        <input type="text" id="migrant_contractor_name_{{item_cnt}}" name="migrant_contractor_name" class="form-control" style="margin-top: 20px;" placeholder="Name of Contractor Name !"
               maxlength="100" onblur="checkValidation('migrantworkers', 'migrant_contractor_name_{{item_cnt}}', contractorNameValidationMessage);" value="{{mc_name}}">
        <span class="error-message error-message-migrantworkers-migrant_contractor_name_{{item_cnt}}"></span>
    </td>
    <td style="width: 300px;"><label>Address of <br>contractors  <span style="color: red;">*</span></label>
        <input type="text" id="migrant_contractor_address_{{item_cnt}}" name="migrant_contractor_address" class="form-control" maxlength="150" style="margin-top: 20px;" placeholder="Address of Contractor !"
               onblur="checkValidation('migrantworkers', 'migrant_contractor_address_{{item_cnt}}', contractorAddressValidationMessage);" value="{{mc_address}}">
        <span class="error-message error-message-migrantworkers-migrant_contractor_address_{{item_cnt}}"></span>
    </td>
    <td style="width: 260px;"><label>Nature of work in which, migrant workman are to be recruited or are employed<span style="color: red;">*</span></label>
        <input type="text" id="migrant_contractor_nature_of_working_{{item_cnt}}" name="migrant_contractor_nature_of_working" placeholder="Nature of work !"
               class="form-control" maxlength="200" 
               onblur="checkValidation('migrantworkers', 'migrant_contractor_nature_of_working_{{item_cnt}}', contractorNatureOfWorkingValidationMessage);" value="{{mc_nature_of_work}}">
        <span class="error-message error-message-migrantworkers-migrant_contractor_nature_of_working_{{item_cnt}}"></span>
    </td>
    <td hidden>
        <input type="hidden" id='mc_id_{{item_cnt}}' value="{{mc_id}}">
    </td>
</tr>
<tr id="migrant_contractor_workers_name_id_{{item_cnt}}" style="background-color: #fff;">
    <td>
        
    </td>
    <td><label>Maximum No. of migrant workman to be employed on any day through each contractor <span style="color: red;">*</span></label>
        <input type="text" id="migrant_contractor_maximum_no_of_workers_{{item_cnt}}" name="migrant_contractor_maximum_no_of_workers_{{item_cnt}}" class="form-control" maxlength="5" 
               onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));" placeholder="Maximum No. of Workers !"
               onblur="checkValidation('migrantworkers', 'migrant_contractor_maximum_no_of_workers_{{item_cnt}}', contractorLabourValidationMessage);" value="{{mc_maximum_no_of_workers}}">
        <span class="error-message error-message-migrantworkers-migrant_contractor_maximum_no_of_workers_{{item_cnt}}"></span>
    </td>
    <td><label>Estimated date of commencement of work under each contractor <span style="color: red;">*</span></label>
        <div class="input-group date date_picker" style="margin-top: 20px;">
            <input type="text" name="migrant_contractor_commencement_date" id="migrant_contractor_commencement_date_{{item_cnt}}" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                   value="{{mc_date_of_commencement}}" onblur="checkValidation('migrantworkers', 'migrant_contractor_commencement_date_{{item_cnt}}', contractorStartDateValidationMessage);">
            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
        <span class="error-message error-message-migrantworkers-migrant_contractor_commencement_date_{{item_cnt}}"></span>
    </td>
    <td><label>Estimated date of termination of employment of migrant workman under each contractor <span style="color: red;">*</span></label>
        <div class="input-group date date_picker">
            <input type="text" name="migrant_contractor_termination_date" id="migrant_contractor_termination_date_{{item_cnt}}" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                   value="{{mc_date_of_termination}}" 
                   onblur="checkValidation('migrantworkers', 'migrant_contractor_termination_date_{{item_cnt}}', contractorTerminationDateValidationMessage);" >
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
        <span class="error-message error-message-migrantworkers-migrant_contractor_termination_date_{{item_cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-md btn-danger" onclick="MigrantWorkers.listview.removeContractor({{item_cnt}});">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
</tr>
