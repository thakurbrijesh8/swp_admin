<div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-12">
        <div class="card">
            <form method="post" id="migrantworkers_form" autocomplete="off" class="m-t-15">
                <input type="hidden" name="mw_id" id="mw_id" class="form-control" value="{{migrantworkers_data.mw_id}}">
                <input type="hidden" name="temp_migrantworkers_seal_and_stemp" id="temp_migrantworkers_seal_and_stemp" class="form-control" value="{{migrantworkers_data.mw_sign_of_principal_employer}}">
                <div style="font-size: 16px; text-align: center; margin-top: 5px;font-weight: bold;">FORM - I</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[ See Rule 3(1) ]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for Registration of Establishments Employing Migrant Workman</div>
                <hr class="m-b-5px">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <label>Establishment Registration No.<span style="color: red;">*</span></label>
                            <input type="text" id="registration_no_for_migrantworkers_registration" name="registration_no_for_migrantworkers_registration" class="form-control" placeholder="Establishment Registration No. !"
                                   maxlength="50" onblur="checkValidation('migrantworkers', 'registration_no_for_migrantworkers_registration', establishmentRegistrationNoValidationMessage);" value="{{migrantworkers_data.mw_registration_no}}" readonly>
                            <span class="error-message error-message-migrantworkers-registration_no_for_migrantworkers_registration"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>Establishment Certificate Expiry Date<span style="color: red;">*</span></label>
                            <div class="input-group date date_picker">
                                <input type="text" id="cerificate_expiry_date_for_migrantworkers_registration" name="cerificate_expiry_date_for_migrantworkers_registration" class="form-control" placeholder="DD-MM-YYYY" data-date-format="DD-MM-YYYY" readonly
                                       maxlength="50" onblur="checkValidation('migrantworkers', 'cerificate_expiry_date_for_migrantworkers_registration', establishmentRegistrationNoValidationMessage);" value="{{migrantworkers_data.mw_certificate_expiry_date}}">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                            <span class="error-message error-message-migrantworkers-cerificate_expiry_date_for_migrantworkers_registration"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-migrantworkers-district"></span>
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
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <label>2. Name of the Establishment <span style="color: red;">*</span></label>
                            <input type="text" id="name_of_migrantworkers_registration" name="name_of_migrantworkers_registration" class="form-control" placeholder="Establishment Name !" readonly
                                   maxlength="100" onblur="checkValidation('migrantworkers', 'name_of_migrantworkers_registration', establishmentNameValidationMessage);" value="{{migrantworkers_data.mw_name_of_establishment}}">
                            <span class="error-message error-message-migrantworkers-name_of_migrantworkers_registration"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Location of the Establishment  <span style="color: red;">*</span></label>
                            <textarea id="loaction_for_migrantworkers_registration" name="loaction_for_migrantworkers_registration" class="form-control" readonly
                                      onblur="checkValidation('migrantworkers', 'loaction_for_migrantworkers_registration', establishmentLocationValidationMessage);"
                                      placeholder="Location of the Establishment !" maxlength="200">{{migrantworkers_data.mw_location_of_establishment}}</textarea>
                            <span class="error-message error-message-migrantworkers-loaction_for_migrantworkers_registration"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Postal Address of the Establishment <span style="color: red;">*</span></label>
                            <textarea id="postal_address_for_migrantworkers_registration" name="postal_address_for_migrantworkers_registration" class="form-control" readonly
                                      onblur="checkValidation('migrantworkers', 'postal_address_for_migrantworkers_registration', establishmentPostalAddressValidationMessage);"
                                      placeholder="Postal Address of the Establishment !" maxlength="200">{{migrantworkers_data.mw_postal_address_of_establishment}}</textarea>
                            <span class="error-message error-message-migrantworkers-postal_address_for_migrantworkers_registration"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>5. Nature of work carried on in the establishment / Type of bussiness / Trade / Industry / Manufacture / Occupation <span style="color: red;">*</span></label>
                            <input type="text" id="nature_of_work_for_migrantworkers_registration" name="nature_of_work_for_migrantworkers_registration" class="form-control" placeholder="Nature of work carried on in the establishment / Type of bussiness / Trade / Industry / Manufacture / Occupation !"
                                   maxlength="150" onblur="checkValidation('migrantworkers', 'nature_of_work_for_migrantworkers_registration', establishmentTypeValidationMessage);" value="{{migrantworkers_data.mw_nature_of_work_of_establishment}}" readonly>
                            <span class="error-message error-message-migrantworkers-nature_of_work_for_migrantworkers_registration"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Principal Employer Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Full Name of the Principal Employer  <span style="color: red;">*</span> (furnish father's name in the case of individuals)</label>
                            <input type="text" id="principle_employer_full_name_for_migrantworkers_registration" name="principle_employer_full_name_for_migrantworkers_registration" class="form-control" placeholder="Principal Employer Full Name !" readonly
                                   maxlength="150"  onblur="checkValidation('migrantworkers', 'principle_employer_full_name_for_migrantworkers_registration', establishmentPrincipalNameValidationMessage);" value="{{migrantworkers_data.mw_principal_employer_name}}">
                            <span class="error-message error-message-migrantworkers-principle_employer_full_name_for_migrantworkers_registration"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Address of the Principal Employer <span style="color: red;">*</span></label>
                            <textarea id="principle_employer_address_for_migrantworkers_registration" name="principle_employer_address_for_migrantworkers_registration" class="form-control" readonly
                                      onblur="checkValidation('migrantworkers', 'principle_employer_address_for_migrantworkers_registration', establishmentPrincipalAddressValidationMessage);" 
                                      placeholder="Address of the Principal Employer !" maxlength="200">{{migrantworkers_data.mw_principal_employer_address}}</textarea>
                            <span class="error-message error-message-migrantworkers-principle_employer_address_for_migrantworkers_registration"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Directors/Particular Partners Information (in case of companies and firms)</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Full Name of the Directors/Particular Partners of the establishment</label>
                            <input type="text" id="directors_or_partners_name_migrantworkers_registration" name="directors_or_partners_name_migrantworkers_registration" class="form-control" placeholder="Full Name of the Directors/Particular Partners !"
                                   readonly maxlength="100"   value="{{migrantworkers_data.mw_directors_or_partners_name}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Address of the Directors/Particular Partners of the establishment</label>
                            <textarea id="directors_or_partners_address_for_migrantworkers_registration" name="directors_or_partners_address_for_migrantworkers_registration" class="form-control" readonly
                                      placeholder="Address of the Directors/Particular Partners !" maxlength="200">{{migrantworkers_data.mw_directors_or_partners_address}}</textarea>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Manager Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Full Name of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                            <input type="text" id="manager_or_person_full_name_migrantworkers_registration" name="manager_or_person_full_name_migrantworkers_registration" class="form-control" placeholder="Full Name of the Manager or Person !" readonly
                                   maxlength="150"   onblur="checkValidation('migrantworkers', 'manager_or_person_full_name_migrantworkers_registration', establishmentManagerNameValidationMessage);" value="{{migrantworkers_data.mw_manager_or_persons_name}}">
                            <span class="error-message error-message-migrantworkers-manager_or_person_full_name_migrantworkers_registration"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11. Address of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                            <textarea id="manager_or_person_address_for_migrantworkers_registration" name="manager_or_person_address_for_migrantworkers_registration" class="form-control" readonly
                                      onblur="checkValidation('migrantworkers', 'manager_or_person_address_for_migrantworkers_registration', establishmentManagerAddressValidationMessage);"
                                      placeholder="Address of the Manager or Person !" maxlength="200">{{migrantworkers_data.mw_manager_or_persons_address}}</textarea>
                            <span class="error-message error-message-migrantworkers-manager_or_person_address_for_migrantworkers_registration"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">12. Particular of contractors and migrant workman</h3>
                    <hr class="m-b-5px">
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 3px;">
                            <table class="table table-bordered m-b-0px" id="contractors_and_migrant_workman_list" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                    </tr>
                                </thead>
                                <tbody id="migrant_contractor_name_container_for_view">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_migrantworkers_view">
                            <label>13. Upload Principal Employer Seal & Stamp <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_migrantworkers_view" style="display: none;">
                            <label>13. Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                            <img id="seal_and_stamp_name_image_for_migrantworkers_view" style="width: 250px; height: 250px; border: 2px solid blue;">
                        </div>
                    </div>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="declaration_for_migrantworkers" name="declaration_for_migrantworkers" value="{{is_checked}}" disabled>
                                <label class="form-check-label" for="declaration_for_migrantworkers">
                                    I Hereby Declare that the Particulars Given Above are True to the Best of My Knowledge and Belief. <span style="color: red;">*</span>
                                </label>
                            </div>
                            <span class="error-message error-message-migrantworkers-declaration_for_migrantworkers"></span>
                        </div>
                    </div>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks  <span style="color: red;">*</span></label>
                            <textarea class="form-control" placeholder="Remarks !" readonly="">{{migrantworkers_data.mw_remark}}</textarea>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('migrantworkers');"   style="margin-right: 5px;">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
