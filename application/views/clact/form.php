<div class="card">
    <div class="card-header">
        <h3 class="card-title" style="float: none; text-align: center;">FORM - I</h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See Rule 17(1)]</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FOR REGISTRATION OF ESTABLISHMENTS EMPLOYING CONTRACT LABOUR</div>
    </div>
    <form role="form" id="clact_form" name="clact_form" onsubmit="return false;">
        <input type="hidden" id="clact_id_for_clact" name="clact_id_for_clact" value="{{establishment_id}}">
        <input type="hidden" id="user_id_for_clact" name="user_id_for_clact" value="{{user_id}}">
        <div class="card-body p-b-0px">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <span class="error-message error-message-clact f-w-b" style="border-bottom: 2px solid red;"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>1. District <span style="color: red;">*</span></label>
                    <div class="input-group">
                        <select id="district" name="district" class="form-control select2"
                                data-placeholder="Select District" style="width: 100%;">  
                        </select>
                    </div>
                    <span class="error-message error-message-clact-district"></span>
                </div>
                <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('clact', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-clact-entity_establishment_type"></span>
                        </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>2. Name of the Establishment <span style="color: red;">*</span></label>
                    <input type="text" id="establishment_name_for_clact" name="establishment_name_for_clact" class="form-control" placeholder="Name of the Establishment !"
                           maxlength="200" onblur="checkValidation('clact', 'establishment_name_for_clact', establishmentNameValidationMessage);"
                           value="{{establishment_name}}">
                    <span class="error-message error-message-clact-establishment_name_for_clact"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>3. Location of the Establishment  <span style="color: red;">*</span></label>
                    <textarea id="establishment_location_for_clact" name="establishment_location_for_clact" class="form-control"
                              onblur="checkValidation('clact', 'establishment_location_for_clact', establishmentLocationValidationMessage);"
                              placeholder="Location of the Establishment !" maxlength="200">{{establishment_location}}</textarea>
                    <span class="error-message error-message-clact-establishment_location_for_clact"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>4. Postal Address of the Establishment <span style="color: red;">*</span></label>
                    <textarea id="establishment_postel_address_for_clact" name="establishment_postel_address_for_clact" class="form-control"
                              onblur="checkValidation('clact', 'establishment_postel_address_for_clact', establishmentPostalAddressValidationMessage);"
                              placeholder="Postel Address of the Establishment !" maxlength="200">{{establishment_postel_address}}</textarea>
                    <span class="error-message error-message-clact-establishment_postel_address_for_clact"></span>
                </div>
                <div class="col-sm-6 form-group">
                    <label>5. Nature of Work Carried on in the Establishment / Type of Business / Trade / Industry / Manufacture / Occupation <span style="color: red;">*</span></label>
                    <input type="text" id="nature_of_work_for_clact" name="nature_of_work_for_clact" class="form-control" placeholder="Nature of Work !"
                           maxlength="150" onblur="checkValidation('clact', 'nature_of_work_for_clact', contractorNatureOfWorkingValidationMessage);" value="{{nature_of_work}}">
                    <span class="error-message error-message-clact-nature_of_work_for_clact"></span>
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Principal Employer Information</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>6. Full Name of the Principal Employer  <span style="color: red;">*</span> (furnish father's name in the case of individuals)</label>
                    <input type="text" id="pe_full_name_for_clact" name="pe_full_name_for_clact" class="form-control" placeholder="Principal Employer Full Name !"
                           maxlength="150"  onblur="checkValidation('clact', 'pe_full_name_for_clact', establishmentPrincipalNameValidationMessage);"
                           value="{{pe_full_name}}">
                    <span class="error-message error-message-clact-pe_full_name_for_clact"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>7. Address of the Principal Employer <span style="color: red;">*</span></label>
                    <textarea id="pe_address_for_clact" name="pe_address_for_clact" class="form-control"
                              onblur="checkValidation('clact', 'pe_address_for_clact', establishmentPrincipalAddressValidationMessage);" 
                              placeholder="Address of the Principal Employer !" maxlength="200">{{pe_address}}</textarea>
                    <span class="error-message error-message-clact-pe_address_for_clact"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>8. Mobile Number of Principal Employer <span style="color: red;">*</span></label>
                    <input type="text" id="pe_mobile_number_for_clact" name="pe_mobile_number_for_clact" class="form-control" placeholder="Establishment Mobile Number !"
                           maxlength="10" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));
                               checkValidationForMobileNumber('clact', 'pe_mobile_number_for_clact');"
                           value="{{pe_mobile_number}}">
                    <span class="error-message error-message-clact-pe_mobile_number_for_clact"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>9. Email of Principal Employer  <span style="color: red;">*</span></label>
                    <input type="text" id="pe_email_id_for_clact" name="pe_email_id_for_clact" class="form-control" placeholder="Establishment Email Address !"
                           maxlength="80" onblur="checkValidationForEmail('clact', 'pe_email_id_for_clact');" value="{{pe_email_id}}">
                    <span class="error-message error-message-clact-pe_email_id_for_clact"></span>
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Manager Information</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>10. Full Name of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                    <input type="text" id="mp_full_name_for_clact" name="mp_full_name_for_clact" class="form-control" placeholder="Full Name of the Manager or Person !"
                           maxlength="150" onblur="checkValidation('clact', 'mp_full_name_for_clact', establishmentManagerNameValidationMessage);" value="{{mp_full_name}}">
                    <span class="error-message error-message-clact-mp_full_name_for_clact"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>11. Address of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                    <textarea id="mp_address_for_clact" name="mp_address_for_clact" class="form-control"
                              onblur="checkValidation('clact', 'mp_address_for_clact', establishmentManagerAddressValidationMessage);"
                              placeholder="Address of the Manager or Person !" maxlength="200">{{mp_address}}</textarea>
                    <span class="error-message error-message-clact-mp_address_for_clact"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>12. Mobile Number of the Manager or Person <span style="color: red;">*</span></label>
                    <input type="text" id="mp_mobile_number_for_clact" name="mp_mobile_number_for_clact" class="form-control" placeholder="Establishment Manager or Person Mobile Number !"
                           maxlength="10" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));
                               checkValidationForMobileNumber('clact', 'mp_mobile_number_for_clact');" value="{{mp_mobile_number}}">
                    <span class="error-message error-message-clact-mp_mobile_number_for_clact"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>13. Email of the Manager or Person <span style="color: red;">*</span></label>
                    <input type="text" id="mp_email_id_for_clact" name="mp_email_id_for_clact" class="form-control" placeholder="Establishment Manager or Person Email Address !"
                           maxlength="80" onblur="checkValidationForEmail('clact', 'mp_email_id_for_clact');" value="{{mp_email_id}}">
                    <span class="error-message error-message-clact-mp_email_id_for_clact"></span>
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">14. Particular of Contractors and Contract Labour</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12 m-b-5px">
                    <div style="background-color: #d2d6de; padding: 3px;">
                        <table class="table table-bordered m-b-0px">
                            <tbody id="contractor_container_for_clact">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-sm btn-nic-blue float-right" onclick="CLACT.listview.addContractor({});"
                            style="margin-right: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i> Add Contractor</button>
                </div>
            </div>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_clact">
                    <label>15. Upload Principal Employer Seal & Stamp <span style="color: red;">* (Maximum File Size: 1MB)</span></label><br>
                    <input type="file" id="seal_and_stamp_for_clact" name="seal_and_stamp_for_clact"
                           accept="image/jpg,image/png,image/jpeg,image/jfif">
                    <div class="error-message error-message-clact-seal_and_stamp_for_clact"></div>
                </div>
                <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_clact" style="display: none;">
                    <label>15. Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                    <img id="seal_and_stamp_name_image_for_clact" style="width: 250px; height: 250px; border: 2px solid blue;">
                    <!--                    <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                                onclick="CLACT.listview.askForRemove('{{establishment_id}}');">
                                            <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>-->
                </div>
            </div>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="declaration_for_clact">
                        <label class="form-check-label" for="declaration_for_clact">
                            I Hereby Declare that the Particulars Given Above are True to the Best of My Knowledge and Belief.
                        </label>
                    </div>
                    <span class="error-message error-message-clact-declaration_for_clact"></span>
                </div>
            </div>
            <hr class="m-b-1rem">
            <div class="form-group">
                <!--<button type="button" id="draft_btn_for_clact" class="btn btn-sm btn-nic-blue" onclick="CLACT.listview.submitCLACT({{VALUE_ONE}});" style="margin-right: 5px;">Save as Draft</button>-->
                <button type="button" id="submit_btn_for_clact" class="btn btn-sm btn-success" onclick="CLACT.listview.askForSubmitCLACT({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('clact');"><i class="fas fa-times"></i> Close</button>
            </div>
        </div>
    </form>
</div>