<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Single Integrated return under all the labour laws</div>

            </div>
            <form role="form" id="single_return_form" name="single_return_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-single-return-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" disabled="">
                            </select>
                            </div>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">2. Details Of Establishment / Factory</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.1 Name Of Establishment / Factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="esta_name" name="esta_name" class="form-control" placeholder="Enter Name Of Establishment / Factory !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'esta_name', factoryNameValidationMessage);" value="{{esta_name}}">
                            </div>
                            <span class="error-message error-message-single-return-esta_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.2 Address Of Establishment / Factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="esta_address" name="esta_address" class="form-control" placeholder="Enter Address Of Establishment / Factory !"
                                          maxlength="100" readonly onblur="checkValidation('single-return', 'esta_address', factoryAddressValidationMessage);">{{esta_address}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-esta_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.3 Tele No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="esta_tel_no" name="esta_tel_no" class="form-control" placeholder="Enter Tele No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'esta_tel_no', telNoValidationMessage);" value="{{esta_tel_no}}" >
                            </div>
                            <span class="error-message error-message-single-return-esta_tel_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.4 Mobile No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="esta_mob_no" name="esta_mob_no" class="form-control" placeholder="Enter Mobile No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'esta_mob_no', mobileValidationMessage);" value="{{esta_mob_no}}">
                            </div>
                            <span class="error-message error-message-single-return-esta_mob_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.5 Fax No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="esta_fax_no" name="esta_fax_no" class="form-control" placeholder="Enter Fax No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'esta_fax_no', faxNoValidationMessage);" value="{{esta_fax_no}}">
                            </div>
                            <span class="error-message error-message-single-return-esta_fax_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.6 Email Address<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="esta_email_id" name="esta_email_id" class="form-control" placeholder="Enter Email Address !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'esta_email_id', emailValidationMessage);" value="{{esta_email_id}}">
                            </div>
                            <span class="error-message error-message-single-return-esta_email_id"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. Details Of the Employer/Occupier/contractor</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.1 Name Of the Employer/Occupier/contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_name" name="emp_name" class="form-control" placeholder="Enter Name Of the Employer/Occupier/contractor< !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'emp_name', empNameValidationMessage);" value="{{emp_name}}">
                            </div>
                            <span class="error-message error-message-single-return-emp_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Address Of the Employer/Occupier/contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="emp_address" name="emp_address" class="form-control" placeholder="Enter Address Of the Employer/Occupier/contractor !"
                                          maxlength="100" readonly onblur="checkValidation('single-return', 'emp_address', empAddressValidationMessage);">{{emp_address}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-emp_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.3 Tele No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_tel_no" name="emp_tel_no" class="form-control" placeholder="Enter Tele No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'emp_tel_no', telNoValidationMessage);" value="{{emp_tel_no}}">
                            </div>
                            <span class="error-message error-message-single-return-emp_tel_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.4 Mobile No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_mob_no" name="emp_mob_no" class="form-control" placeholder="Enter Mobile No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'emp_mob_no', mobileValidationMessage);" value="{{emp_mob_no}}">
                            </div>
                            <span class="error-message error-message-single-return-emp_mob_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.5 Fax No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_fax_no" name="emp_fax_no" class="form-control" placeholder="Enter Fax No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'emp_fax_no', faxNoValidationMessage);" value="{{emp_fax_no}}">
                            </div>
                            <span class="error-message error-message-single-return-emp_fax_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.6 Email Address<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_email_id" name="emp_email_id" class="form-control" placeholder="Enter Email Address !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'emp_email_id', emailValidationMessage);" value="{{emp_email_id}}">
                            </div>
                            <span class="error-message error-message-single-return-emp_email_id"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">4. Details Of the Manager Person responsible for supervision or control of the establishment/factory</h2>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.1 Name Of the Manager Person responsible for supervision or control of the establishment/factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manager_name" name="manager_name" class="form-control" placeholder="Enter Name Of the Manager Person responsible for supervision or control of the establishment/factory !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'manager_name', managerPersonNameValidationMessage);" value="{{manager_name}}">
                            </div>
                            <span class="error-message error-message-single-return-manager_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.2 Address Of the Manager Person responsible for supervision or control of the establishment/factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="manager_address" name="manager_address" class="form-control" placeholder="Enter Address Of the Manager Person responsible for supervision or control of the establishment/factory !"
                                          maxlength="100" readonly onblur="checkValidation('single-return', 'manager_address', managerPersonAddressValidationMessage);">{{manager_address}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-manager_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.3 Tele No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manager_tel_no" name="manager_tel_no" class="form-control" placeholder="Enter Tele No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'manager_tel_no', telNoValidationMessage);" value="{{manager_tel_no}}">
                            </div>
                            <span class="error-message error-message-single-return-manager_tel_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.4 Mobile No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manager_mob_no" name="manager_mob_no" class="form-control" placeholder="Enter Mobile No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'manager_mob_no', mobileValidationMessage);" value="{{manager_mob_no}}">
                            </div>
                            <span class="error-message error-message-single-return-manager_mob_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.5 Fax No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manager_fax_no" name="manager_fax_no" class="form-control" placeholder="Enter Fax No. !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'manager_fax_no', faxNoValidationMessage);" value="{{manager_fax_no}}">
                            </div>
                            <span class="error-message error-message-single-return-manager_fax_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.6 Email Address<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manager_email_id" name="manager_email_id" class="form-control" placeholder="Enter Email Address !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'manager_email_id', emailValidationMessage);" value="{{manager_email_id}}">
                            </div>
                            <span class="error-message error-message-single-return-manager_email_id"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Registration No. of establishment/factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_no" name="registration_no" class="form-control" placeholder="Enter Registration No. of establishment/factory !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'registration_no', registrationNoValidationMessage);" value="{{registration_no}}">
                            </div>
                            <span class="error-message error-message-single-return-registration_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. License No. of establishment/factory<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_no" name="license_no" class="form-control" placeholder="Enter License No. of establishment/factory !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'license_no', licenseNoValidationMessage);" value="{{license_no}}">
                            </div>
                            <span class="error-message error-message-single-return-license_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Date of commencement of the establishment/factory  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="commencement_date" id="commencement_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{commencement_date}}" readonly onblur="checkValidation('bocw', 'commencement_date', commencementsDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-bocw-commencement_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Nature of industry/activity<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="industry_nature" name="industry_nature" class="form-control" placeholder="Enter Nature of industry/activity !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'industry_nature', industryNatureValidationMessage);" value="{{industry_nature}}">
                            </div>
                            <span class="error-message error-message-single-return-industry_nature"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>9. Number of Employees employed<br/>(Including contract workers)</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Type of worker</th>
                                        <th>Unskilled</th>
                                        <th>Semi skilled</th>
                                        <th>Skilled</th>
                                        <th>Total</th>
                                        <th>Male</th>
                                        <th>Female</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>Direct</th>
                                        <th>
                                            <input type="text" id="direct_unskilled" name="direct_unskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_unskilled', directUnskilledValidationMessage);" value="{{direct_unskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="direct_semiskilled" name="direct_semiskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_semiskilled', directSemiskilledValidationMessage);" value="{{direct_semiskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="direct_skilled" name="direct_skilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_skilled', directSkilledValidationMessage);" value="{{direct_skilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="direct_total" name="direct_total" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_total', directTotalValidationMessage);" value="{{direct_total}}">
                                        </th>
                                        <th>
                                            <input type="text" id="direct_male" name="direct_male" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_male', directMaleValidationMessage);" value="{{direct_male}}">
                                        </th>
                                        <th>
                                            <input type="text" id="direct_female" name="direct_female" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'direct_female', directFemaleValidationMessage);" value="{{direct_female}}">
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>Through Contractor</th>
                                        <th>
                                            <input type="text" id="contractor_unskilled" name="contractor_unskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_unskilled', contractorUnskilledValidationMessage);" value="{{contractor_unskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="contractor_semiskilled" name="contractor_semiskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_semiskilled', contractorSemiskilledValidationMessage);" value="{{contractor_semiskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="contractor_skilled" name="contractor_skilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_skilled', contractorSkilledValidationMessage);" value="{{contractor_skilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="contractor_total" name="contractor_total" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_total', contractorTotalValidationMessage);" value="{{contractor_total}}">
                                        </th>
                                        <th>
                                            <input type="text" id="contractor_male" name="contractor_male" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_male', contractorMaleValidationMessage);" value="{{contractor_male}}">
                                        </th>
                                        <th>
                                            <input type="text" id="contractor_female" name="contractor_female" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_female', contractorFemaleValidationMessage);" value="{{contractor_female}}">
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>Total</th>
                                        <th>
                                            <input type="text" id="total_unskilled" name="total_unskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_unskilled', totalSkilledValidationMessage);" value="{{total_unskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="total_semiskilled" name="total_semiskilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_semiskilled', totalSemiskilledValidationMessage);" value="{{total_semiskilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="total_skilled" name="total_skilled" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_skilled', totalSkilledValidationMessage);" value="{{total_skilled}}">
                                        </th>
                                        <th>
                                            <input type="text" id="total_total" name="total_total" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_total', totalTotalValidationMessage);" value="{{total_total}}">
                                        </th>
                                        <th>
                                            <input type="text" id="total_male" name="total_male" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_male', totalMaleValidationMessage);" value="{{total_male}}">
                                        </th>
                                        <th>
                                            <input type="text" id="total_female" name="total_female" class="form-control"placeholder="" maxlength="100" readonly onblur="checkValidation('single-return', 'total_female', totalFemaleValidationMessage);" value="{{total_female}}">
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button  >
                        <button type="button" id="submit_btn_for_single_return" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartA($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;">Next  <span class="fas fa-hand-point-right"></span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>