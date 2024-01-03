<div class="row">
    <div class="col-sm-12 col-md-2"></div>
    <div class="col-sm-12 col-md-8">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-employee f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <form role="form" method="post" name="employee_form" id="employee_form" autocomplete="off" onsubmit="return false;">
            <input type="hidden" id="employee_id_for_employee" name="employee_id_for_employee" value="{{employee_id}}">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Employee Status (Active / Deactive) <span class="color-nic-red">*</span></label>
                    <div id="status_container_for_employee"></div>
                    <span class="error-message error-message-employee-status_for_employee"></span>
                </div>
            </div>
            <?php if (is_admin()) { ?>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>District <span class="color-nic-red">*</span></label>
                        <select id="district_for_employee" name="district_for_employee" class="form-control select2"
                                onchange="checkValidation('employee', 'district_for_employee', districtValidationMessage);
                                            Employee.listview.districtChangeEvent($(this), 'employee');"
                                data-placeholder="Select District" style="width: 100%;">
                        </select>
                        <span class="error-message error-message-employee-district_for_employee"></span>
                    </div>
                    <div class="form-group col-sm-6">
                        <label>Department <span class="color-nic-red">*</span></label>
                        <select id="department_id_for_employee" name="department_id_for_employee" class="form-control select2"
                                onchange="checkValidation('employee', 'department_id_for_employee', selectDepartmentValidationMessage);"
                                data-placeholder="Select Department" style="width: 100%;">
                        </select>
                        <span class="error-message error-message-employee-department_id_for_employee"></span>
                    </div>
                </div>
            <?php } ?>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Employee Name <span class="color-nic-red">*</span></label>
                    <input type="text" id="employee_name_for_employee" name="employee_name_for_employee"
                           class="form-control" placeholder="Enter Employee Name !"
                           onblur="checkValidation('employee', 'employee_name_for_employee', employeeNameValidationMessage)"
                           value="{{employee_name}}" maxlength="100">
                    <span class="error-message error-message-employee-employee_name_for_employee"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Employee Designation</label>
                    <input type="text" id="designation_for_employee" name="designation_for_employee"
                           class="form-control" placeholder="Enter Employee Designation !"
                           value="{{designation}}" maxlength="100">
                    <span class="error-message error-message-employee-designation_for_employee"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Employee Roles <span class="color-nic-red">*</span></label>
                    <div id="roles_container_for_employee"></div>
                    <span class="error-message error-message-employee-roles_for_employee"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Employee Email <span class="color-nic-red">*</span></label>
                    <input type="text" id="email_for_employee" name="email_for_employee"
                           class="form-control" placeholder="Enter Employee Email !"
                           onblur="checkValidationForEmail('employee', 'email_for_employee');"
                           value="{{email}}" maxlength="50">
                    <span class="error-message error-message-employee-email_for_employee"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Employee Mobile Number (For Login) <span style="color: red;">*</span></label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="mobile_number_for_employee" name="mobile_number_for_employee"
                               placeholder="Enter Employee Mobile Number !"
                               onblur="checkValidationForMobileNumber('employee', 'mobile_number_for_employee', mobileValidationMessage);"
                               maxlength="10" value="{{mobile_number}}">
                    </div>
                    <span class="error-message error-message-employee-mobile_number_for_employee"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Employee Pin (For Login) <span style="color: red;">*</span></label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="pin_for_employee" name="pin_for_employee"
                               placeholder="Enter Employee Pin !"
                               onblur="checkValidation('employee', 'pin_for_employee', pinValidationMessage);"
                               maxlength="10" value="{{pin}}">
                    </div>
                    <span class="error-message error-message-employee-pin_for_employee"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6" id="spacimen_signature_container_for_employee">
                    <label>Spacimen Signature <span style="color: red;">* (Maximum File Size: 1MB)</span></label>
                    <input type="file" id="spacimen_signature_for_employee" name="spacimen_signature_for_employee"
                           accept="image/jpg,image/png,image/jpeg,image/jfif"><br>
                    <span class="error-message error-message-employee-spacimen_signature_for_employee"></span>
                </div>
                <div class="form-group col-sm-6" id="spacimen_signature_name_container_for_employee" style="display: none;">
                    <label>Spacimen Signature <span style="color: red;">*</label><br>
                    <a id="spacimen_signature_name_href_for_employee" target="_blank"><span id="spacimen_signature_name_for_employee"></span></a>
                    <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" id="spacimen_signature_remove_btn_for_employee"></span><br>
                    <span class="error-message error-message-employee-spacimen_signature_name_for_employee"></span>
                </div>
                <div class="form-group col-sm-6" id="photo_container_for_employee">
                    <label>Employee Photo</label>
                    <input type="file" id="photo_for_employee" name="photo_for_employee"
                           accept="image/jpg,image/png,image/jpeg,image/jfif"><br>
                    <span class="error-message error-message-employee-photo_for_employee"></span>
                </div>
                <div class="form-group col-sm-6" id="photo_name_container_for_employee" style="display: none;">
                    <label>Employee Photo<br>
                    <a id="photo_name_href_for_employee" target="_blank"><span id="photo_name_for_employee"></span></a>
                    <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" id="photo_remove_btn_for_employee"></span><br>
                    <span class="error-message error-message-employee-photo_name_for_employee"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <button type="button" id="submit_btn_for_employee" class="btn btn-sm btn-success" onclick="Employee.listview.submitEmployee($(this));" style="margin-right: 5px;">Submit</button>
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" aria-label="Close" onclick="resetModel();">Close</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 color-nic-red">
                    <b>Notes : </b>
                    <div>1. Maximum File Size: 1MB</div>
                    <div>2. Upload JPG | PNG | JPEG | JFIF Only</div>
                </div>
            </div>
        </form>
    </div>
</div>