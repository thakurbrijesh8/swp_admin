<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Query / Grievance Redressal</h3>
                
            </div>
            <form role="form" id="query_grievance_form" name="query_grievance_form" onsubmit="return false;">
                <input type="hidden" id="query_grievance_id" name="query_grievance_id" value="{{query_grievance_data.query_grievance_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-grievance f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Select District
                            <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="district" name="district"
                                    data-placeholder="" onblur="checkValidation('grievance', 'district', queryDistrictValidationMessage);">
                                    <option value="">Select District</option>
                                    <option value="1">Daman</option>
                                    <option value="2">Diu</option>
                                    <option value="3">Dadara and Nagar Haveli</option>
                                </select>
                            </div>
                            <span class="error-message error-message-grievance-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Select Issue Category
                                <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="issue_category" name="issue_category"
                                    data-placeholder="" onblur="checkValidation('grievance', 'issue_category', issueCategoryValidationMessage);">
                                    <option value="">Select Issue Category</option>
                                    <option value="1">Application Approval Status</option>
                                    <option value="2">Enquiries Requiring Other Department Input</option>
                                    <option value="3">General Enquiry & Guidance</option>
                                    <option value="4">Grievance</option>
                                    <option value="5">Procurement Related</option>
                                </select>
                            </div>
                            <span class="error-message error-message-grievance-issue_category"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Select Department
                                <span class="color-nic-red">*</span> </label>
                            <div class="input-group">
                                <select class="form-control" id="department" name="department"
                                    data-placeholder="" onblur="checkValidation('grievance', 'department', queryDepartmentValidationMessage);">
                                    <option value="">Select Department</option>
                                    <option value="1">Pollution Control Committee</option>
                                    <option value="2">Fire & Emergency Service</option>
                                    <option value="3">District Industries Center</option>
                                    <option value="4">Labour & Employment</option>
                                    <option value="5">Weight & Measure</option>
                                    <option value="6">Revenue</option>
                                    <option value="11">Civil Registrar Cum Sub Registrar</option>
                                    <option value="7">Factories & Boiler</option>
                                    <option value="8">Electricity Department</option>
                                    <option value="9">Public Works Department(PWD)</option>
                                    <option value="10">Other</option>
                                </select>
                            </div>
                            <span class="error-message error-message-grievance-department"></span>
                        </div>
                        <div class="form-group col-6 mb-3 other_department_div" style="display: none;">
                            <label class="mb-0" style="color: black;">Enter Other Department Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_department" name="other_department" class="form-control" placeholder="Enter Other Department Name !"
                                       maxlength="100" onblur="checkValidation('grievance', 'other_department', queryOtherDepartmentValidationMessage);" value="{{query_grievance_data.other_department}}">
                            </div>
                            <span class="error-message error-message-grievance-other_department"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Your Full Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="full_name" name="full_name" class="form-control" placeholder="Enter Your Full Name !"
                                       maxlength="100" onblur="checkValidation('grievance', 'full_name', applicantFullNameValidationMessage);" value="{{query_grievance_data.full_name}}">
                            </div>
                            <span class="error-message error-message-grievance-full_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Your Business Name (if any).</label>
                            <div class="input-group">
                                <input type="text" id="business_name" name="business_name" class="form-control" placeholder="Enter Your Business Name (if any) !"
                                       maxlength="100" value="{{query_grievance_data.business_name}}">
                            </div>
                            <span class="error-message error-message-grievance-business_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Select Classification of Industry 
                            <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="industry_classification" name="industry_classification"
                                    data-placeholder="" onblur="checkValidation('grievance', 'industry_classification', industryClassificationValidationMessage);">
                                    <option value="">Select Classification of Industry </option>
                                    <option value="1">Micro</option>
                                    <option value="2">Small</option>
                                    <option value="3">Medium</option>
                                    <option value="4">Large</option>
                                </select>
                            </div>
                            <span class="error-message error-message-grievance-industry_classification"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Enter your Mobile Number Registered on <a href="https://swp.dddgov.in/" >www.swp.dddgov.in</a> (if Registered).<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="mobile_no" name="mobile_no" class="form-control" placeholder="Enter your Mobile Number  !"
                                       maxlength="100" onblur="checkValidationForMobileNumber('grievance', 'mobile_no', mobileNumberValidationMessage);" value="{{query_grievance_data.mobile_no}}">
                            </div>
                            <span class="error-message error-message-grievance-mobile_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Enter your Email Address Registered on <a href="https://swp.dddgov.in/" >www.swp.dddgov.in</a> (if Registered).<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email_id" name="email_id" class="form-control" placeholder="Enter your Email Address  !"
                                       maxlength="100" onblur="checkValidationForEmail('grievance', 'email_id', emailValidationMessage);" value="{{query_grievance_data.email}}">
                            </div>
                            <span class="error-message error-message-grievance-email_id"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Submitted Application Number (if Any).</label>
                            <div class="input-group">
                                <input type="text" id="application_no" name="application_no" class="form-control" placeholder="Enter Submitted Application Number (if Any) !"
                                       maxlength="100" value="{{query_grievance_data.application_no}}">
                            </div>
                            <span class="error-message error-message-grievance-application_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Query.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="query" name="query" class="form-control" placeholder="Enter Query !" maxlength="100" onblur="checkValidation('grievance', 'query', queryDetailValidationMessage);">{{query_grievance_data.query}}</textarea>
                            </div>
                            <span class="error-message error-message-grievance-query"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="mb-0" style="color: black;">Query Response.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="query_response" name="query_response" class="form-control" placeholder="Enter Query Response !" maxlength="100" onblur="checkValidation('grievance', 'query_response', queryResponseDetailValidationMessage);">{{query_grievance_data.query_response}}</textarea>
                            </div>
                            <span class="error-message error-message-grievance-query_response"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" id="submit_btn_for_query_grievance" class="btn btn-sm btn-success" onclick="QueryGrievance.listview.submitQueryGrievance({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="QueryGrievance.listview.loadQueryGrievanceData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>