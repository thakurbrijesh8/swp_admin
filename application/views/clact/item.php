<tr id="contractor_item_for_clact_{{cnt}}" class="contractor-item-for-clact contractor_item_for_clact_{{cnt}}"
    style="background-color: #fff;">
    <td style="width: 50px;" class="text-center">
        <input type="hidden" class='contractor-item-cnt' value="{{cnt}}">
        <input type="hidden" id='user_id_{{cnt}}' value="{{user_id}}">
        <input type="hidden" id='contractor_id_{{cnt}}' value="{{establishment_contractor_id}}">
        <label>Sr No.</label><br><span class="display-contractor-item-cnt">{{cnt}}</span>
    </td>
    <td style="width: 240px;">
        <label>Contractor Establishment Name is to be Employed <span style="color: red;">*</span></label>
        <input type="text" id="contractor_proprietor_name_{{cnt}}" name="contractor_proprietor_name" maxlength="100" class="form-control" 
               onblur="checkValidation('clact', 'contractor_proprietor_name_{{cnt}}', contractorPropriterNameValidationMessage);"
               value="{{contractor_proprietor_name}}" placeholder="Contractor Establishment Name">
        <span class="error-message error-message-clact-contractor_proprietor_name_{{cnt}}"></span> 
    </td>
    <td style="width: 190px;">
        <label>Name of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" id="contractor_name_{{cnt}}" name="contractor_name" class="form-control"
               maxlength="100" onblur="checkValidation('clact', 'contractor_name_{{cnt}}', contractorNameValidationMessage);"
               value="{{contractor_name}}" placeholder="Name of Contractors">
        <span class="error-message error-message-clact-contractor_name_{{cnt}}"></span>
    </td>
    <td style="width: 200px;">
        <label>Email of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" id="contractor_email_id_{{cnt}}" name="contractor_email_id" class="form-control" 
               onblur="checkValidationForEmail('clact', 'contractor_email_id_{{cnt}}');"
               value="{{email_id}}" placeholder="Email">
        <span class="error-message error-message-clact-contractor_email_id_{{cnt}}"></span>
    </td>
    <td style="width: 200px;">
        <label>Mobile No. of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" id="contractor_mobile_number_{{cnt}}" name="contractor_mobile_number" class="form-control" maxlength="10"  
               onblur="checkNumeric($(this)); checkValidationForMobileNumber('clact', 'contractor_mobile_number_{{cnt}}');"
               value="{{mobile_number}}" placeholder="Mobile Number">
        <span class="error-message error-message-clact-contractor_mobile_number_{{cnt}}"></span>
    </td>
    <td style="width: 200px;">
        <label>Address of Contractors or is to be Employed <span style="color: red;">*</span></label>
        <input type="text" id="contractor_address_{{cnt}}" name="contractor_address" class="form-control" maxlength="150" 
               onblur="checkValidation('clact', 'contractor_address_{{cnt}}', contractorAddressValidationMessage);"
               value="{{contractor_address}}" placeholder="Address">
        <span class="error-message error-message-clact-contractor_address_{{cnt}}"></span>
    </td>
</tr>
<tr class="contractor_item_for_clact_{{cnt}}" style="background-color: #fff;">
    <td></td>
    <td>
        <label>Nature of Work in which Contract Labour is Employed Through each Contractor <span style="color: red;">*</span></label>
        <input type="text" id="nature_of_work_{{cnt}}" name="nature_of_work" 
               class="form-control" maxlength="200" 
               onblur="checkValidation('clact', 'nature_of_work_{{cnt}}', contractorNatureOfWorkingValidationMessage);"
               value="{{nature_of_work}}" placeholder="Nature of Work">
        <span class="error-message error-message-clact-nature_of_work_{{cnt}}"></span>
    </td>
    <td>
        <label>Maximum No. of Contract Labour to be Employed on any Day Labour <span style="color: red;">*</span></label>
        <input type="text" id="contractor_labour_{{cnt}}" name="contractor_labour" class="form-control" maxlength="5" 
               onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));
                           checkValidation('clact', 'contractor_labour_{{cnt}}', contractorLabourValidationMessage);"
               value="{{contractor_labour}}" placeholder="No. of Contract Labour">
        <span class="error-message error-message-clact-contractor_labour_{{cnt}}"></span>
    </td>
    <td>
        <label>Estimated Date of Start of Employment of Contract <span style="color: red;">*</span></label>
        <div class="input-group date" style="margin-top: 20px;">
            <input type="text" id="contractor_start_date_{{cnt}}" name="contractor_start_date" 
                   onblur="checkValidation('clact', 'contractor_start_date_{{cnt}}', dateValidationMessage);"
                   class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY"
                   value="{{contractor_start_date_text}}">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-calendar"></i></span>
            </div>
        </div>
        <span class="error-message error-message-clact-contractor_start_date_{{cnt}}"></span>
    </td>
    <td>
        <label>Estimated Date of Termination of Employment of Contract <span style="color: red;">*</span></label>
        <div class="input-group date" style="margin-top: 20px;">
            <input type="text" id="contractor_termination_date_{{cnt}}" name="contractor_termination_date" 
                   onblur="checkValidation('clact', 'contractor_termination_date_{{cnt}}', dateValidationMessage);"
                   class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY"
                   value="{{contractor_termination_date_text}}">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-calendar"></i></span>
            </div>
        </div>
        <span class="error-message error-message-clact-contractor_termination_date_{{cnt}}"></span>
    </td>
    <td class="text-center">
        <button type="button" class="btn btn-md btn-danger"
                onclick="CLACT.listview.removeContractor('{{cnt}}');">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
</tr>