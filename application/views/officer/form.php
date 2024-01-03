<div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Add Inspection Officer Form</h3>
            </div>
            <form role="form" id="officer_form" name="officer_form" onsubmit="return false;">
                <input type="hidden" id="officer_id_for_officer" name="officer_id_for_officer" value="{{officer_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label>Department Name <span class="color-nic-red">*</span></label>
                            <select id="department_id_for_officer" name="department_id_for_officer" class="form-control select2"
                                    data-placeholder="Select Department Name"
                                    onchange="checkValidation('officer', 'department_id_for_officer', oneOptionValidationMessage);"
                                    style="width: 100%;">
                            </select>
                            <span class="error-message error-message-officer-department_id_for_officer"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-12">
                            <label>Officer Name <span class="color-nic-red">*</span></label>
                            <input type="text" class="form-control" id="officer_name_for_officer" name="officer_name_for_officer"
                                   onblur="checkValidation('officer', 'officer_name_for_officer', nameValidationMessage);"
                                   placeholder="Enter Officer Name !" maxlength="100" value="{{officer_name}}">
                            <span class="error-message error-message-officer-officer_name_for_officer"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Mobile Number <span style="color: red;">*</span></label>
                            <input type="text" id="mobile_number_for_officer" name="mobile_number_for_officer" class="form-control"
                                   placeholder="Enter Mobile Number !" maxlength="10" onblur="checkNumeric($(this));
                                           checkValidationForMobileNumber('officer', 'mobile_number_for_officer', mobileValidationMessage);"
                                   value="{{mobile_number}}">
                            <span class="error-message error-message-officer-mobile_number_for_officer"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="f-w-n">Email Address</label>
                            <input type="text" class="form-control" id="email_for_officer" name="email_for_officer"
                                   onblur="checkValidationForExiEmail('officer', 'email_for_officer')"
                                   placeholder="Enter Email Address !" maxlength="50" value="{{email}}">
                            <span class="error-message error-message-officer-email_for_officer"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Active / Deactive <span class="color-nic-red">*</span></label>
                            <select id="status_for_officer" name="status_for_officer" class="form-control select2">
                                <option value="1" selected>Active</option>
                                <option value="0">Deactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" id="submit_btn_for_officer" class="btn btn-sm btn-success" onclick="Officer.listview.submitOfficer($(this));" style="margin-right: 5px;">Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="Officer.listview.loadOfficerData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>