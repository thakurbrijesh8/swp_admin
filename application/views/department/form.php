<div class="row">
    <div class="col-sm-12 col-md-2"></div>
    <div class="col-sm-12 col-md-8">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-department f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <form role="form" method="post" name="department_form" id="department_form" autocomplete="off" onsubmit="return false;">
            <div class="row">
                <div class="form-group col-sm-6">
                    <input type="hidden" id="department_id_for_department" name="department_id_for_department" value="{{department_id}}">
                    <label>District <span class="color-nic-red">*</span></label>
                    <select id="district_for_department" name="district_for_department" class="form-control select2"
                            onchange="checkValidation('department', 'district_for_department', districtValidationMessage);"
                            data-placeholder="Select District" style="width: 100%;">
                    </select>
                    <span class="error-message error-message-department-district_for_department"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Department Name <span class="color-nic-red">*</span></label>
                    <input type="text" id="department_name_for_department" name="department_name_for_department"
                           onblur="checkValidation('department', 'department_name_for_department', departmentValidationMessage);"
                           class="form-control" placeholder="Enter Department Name." value="{{department_name}}" maxlength="100">
                    <span class="error-message error-message-department-department_name_for_department"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Department Address</label>
                    <textarea id="department_address_for_department" name="department_address_for_department"
                              class="form-control" placeholder="Enter Department Address." maxlength="200">{{department_address}}</textarea>
                </div>
                <div class="form-group col-sm-6">
                    <label>Department Landline Numbers</label>
                    <input type="text" id="landline_number_for_department" name="landline_number_for_department"
                           class="form-control" placeholder="Enter Department Landline Numbers." value="{{landline_number}}" maxlength="50">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>HOD Designation</label>
                    <input type="text" id="hod_designation_for_department" name="hod_designation_for_department"
                           class="form-control" placeholder="Enter HOD Designation" value="{{hod_designation}}"
                           maxlength="100">
                </div>
                <div class="form-group col-sm-6">
                    <label>HOF Designation</label>
                    <input type="text" id="hof_designation_for_department" name="hof_designation_for_department"
                           class="form-control" placeholder="Enter HOF Designation" value="{{hof_designation}}"
                           maxlength="100">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <button type="button" id="submit_btn_for_department" class="btn btn-sm btn-success" onclick="Department.listview.submitDepartment($(this));" style="margin-right: 5px;">Submit</button>
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" aria-label="Close" onclick="resetModel();">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>