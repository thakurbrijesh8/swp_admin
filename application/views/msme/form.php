<div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FORM FOR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">INCENTIVES UNDER INVESTMENT PROMOTION SCHEME - 2015 FOR MSME </div>
            </div>
            <form role="form" id="msme_form" name="msme_form" onsubmit="return false;">
                <input type="hidden" id="msme_id_for_msme" name="msme_id_for_msme" value="{{msme_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-msme f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">                   
                            <label>1.District <span class="color-nic-red">*</span></label>
                            <select id="district_for_msme" name="district_for_msme" class="form-control select2"
                                    onchange="checkValidation('msme', 'district_for_msme', districtValidationMessage)"
                                    data-placeholder="Select District" style="width: 100%;">
                            </select>
                            <span class="error-message error-message-msme-district_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('msme', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-msme-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <input type="text" id="enterprise_name_for_msme" name="enterprise_name_for_msme" class="form-control" placeholder="Enter Name of the Enterprise !"
                                   maxlength="100" onblur="checkValidation('msme', 'enterprise_name_for_msme', enterpriseNameValidationMessage);" value="{{enterprise_name}}">
                            <span class="error-message error-message-msme-enterprise_name_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Office Address with pin code No. <span class="color-nic-red">*</span></label>
                            <textarea id="office_address_for_msme" name="office_address_for_msme" class="form-control" placeholder="Enter Office Address with pin code No. !"
                                      maxlength="200" onblur="checkValidation('msme', 'office_address_for_msme', officeAddressValidationMessage);">{{office_address}}</textarea>
                            <span class="error-message error-message-msme-office_address_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Factory Address with pin code No. <span class="color-nic-red">*</span></label>
                            <textarea id="factory_address_for_msme" name="factory_address_for_msme" class="form-control" placeholder="Enter Factory Address with pin code No. !"
                                      maxlength="200" onblur="checkValidation('msme', 'factory_address_for_msme', factoryAddressValidationMessage);">{{factory_address}}</textarea>
                            <span class="error-message error-message-msme-factory_address_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5.1 Office Contact No. <span class="color-nic-red">*</span></label>
                            <input type="text" id="office_contact_number_for_msme" name="office_contact_number_for_msme" class="form-control" placeholder="Enter Office Contact No. !"
                                   onkeyup="checkNumeric($(this));" maxlength="20"
                                   onblur="checkValidation('msme', 'office_contact_number_for_msme', officeContactNoValidationMessage);" value="{{office_contact_number}}">
                            <span class="error-message error-message-msme-office_contact_number_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5.2 Factory Contact No. <span class="color-nic-red">*</span></label>
                            <input type="text" id="factory_contact_number_for_msme" name="factory_contact_number_for_msme" class="form-control" placeholder="Enter Factory Contact No. !"
                                   maxlength="20" onkeyup="checkNumeric($(this));" onblur="checkValidation('msme', 'factory_contact_number_for_msme', factoryContactNoValidationMessage);" value="{{factory_contact_number}}">
                            <span class="error-message error-message-msme-factory_contact_number_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>5.3 Fax </label>
                            <input type="text" id="fax_for_msme" name="fax_for_msme" class="form-control" placeholder="Enter Fax !"
                                   maxlength="20" value="{{fax}}" onkeyup="checkNumeric($(this));">
                            <span class="error-message error-message-msme-fax_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.4 Cell Phone </label>
                            <input type="text" id="cellphone_for_msme" name="cellphone_for_msme" class="form-control"
                                   placeholder="Enter Cell Phone !" maxlength="20"
                                   value="{{cellphone}}" onkeyup="checkNumeric($(this));">
                            <span class="error-message error-message-msme-cellphone_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.6 Email </label>
                            <input type="text" id="email_for_msme" name="email_for_msme" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('msme', 'email_for_msme', emailValidationMessage);" value="{{email}}">
                            <span class="error-message error-message-msme-email_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Constitution of the Enterprise<span class="color-nic-red">*</span></label>
                            <div id="constitution_container_for_msme">
                            </div>
                            <span class="error-message error-message-msme-constitution_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.1 Name of Promoter <span class="color-nic-red">*</span></label>
                            <input type="text" id="promoter_name_for_msme" name="promoter_name_for_msme" class="form-control" placeholder="Enter Name of Promoter !"
                                   maxlength="100" onblur="checkValidation('msme', 'promoter_name_for_msme', promoterNameValidationMessage);" value="{{promoter_name}}">
                            <span class="error-message error-message-msme-promoter_name_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.2 Designation of Promoter <span class="color-nic-red">*</span></label>
                            <textarea id="promoter_designation_for_msme" name="promoter_designation_for_msme" class="form-control" placeholder="Enter Designation of Promoter !"
                                      maxlength="100" onblur="checkValidation('msme', 'promoter_designation_for_msme', promoterDesignationValidationMessage);">{{promoter_designation}}</textarea>
                            <span class="error-message error-message-msme-promoter_designation_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.3 Contact Number of Promoter</label>
                            <input type="text" id="promoter_contact_number_for_msme" name="promoter_contact_number_for_msme" class="form-control"
                                   placeholder="Enter Contact Number !" maxlength="20" value="{{promoter_contact_number}}">
                            <span class="error-message error-message-msme-promoter_contact_number_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.4 Email of Promoter</label>
                            <input type="text" id="promoter_email_for_msme" name="promoter_email_for_msme" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('msme', 'promoter_email_for_msme', emailValidationMessage);" value="{{promoter_email}}">
                            <span class="error-message error-message-msme-promoter_email_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Social Status of the Entrepreneur <span class="color-nic-red">*</span></label>
                            <div id="social_status_container_for_msme">
                            </div>
                            <span class="error-message error-message-msme-social_status_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.1 Name of Authorized Person <span class="color-nic-red">*</span></label>
                            <input type="text" id="ap_name_for_msme" name="ap_name_for_msme" class="form-control" placeholder="Enter Name of Authorized Person !"
                                   maxlength="100" onblur="checkValidation('msme', 'ap_name_for_msme', apNameValidationMessage);" value="{{ap_name}}">
                            <span class="error-message error-message-msme-ap_name_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.2 Designation of Authorized Person <span class="color-nic-red">*</span></label>
                            <textarea id="ap_designation_for_msme" name="ap_designation_for_msme" class="form-control" placeholder="Enter Designation of Authorized Person !"
                                      maxlength="100" onblur="checkValidation('msme', 'ap_designation_for_msme', apDesignationValidationMessage);">{{ap_designation}}</textarea>
                            <span class="error-message error-message-msme-ap_designation_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.3 Contact Number of Authorized Person</label>
                            <input type="text" id="ap_contact_number_for_msme" name="ap_contact_number_for_msme" class="form-control"
                                   placeholder="Enter Contact Number !" maxlength="20" value="{{ap_contact_number}}">
                            <span class="error-message error-message-msme-ap_contact_number_for_msme"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.4 Email of Authorized Person</label>
                            <input type="text" id="ap_email_for_msme" name="ap_email_for_msme" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('msme', 'ap_email_for_msme', emailValidationMessage);" value="{{ap_email}}">
                            <span class="error-message error-message-msme-ap_email_for_msme"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">                   
                            <label>10. Type of the Unit <span class="color-nic-red">*</span></label>
                            <select id="unit_type_for_msme" name="unit_type_for_msme" class="form-control select2"
                                    onclick="checkValidation('msme', 'unit_type_for_msme', oneOptionValidationMessage)"
                                    data-placeholder="Select Type of the Unit" style="width: 100%;">
                            </select>
                            <span class="error-message error-message-msme-unit_type_for_msme"></span>
                        </div>
                    </div>
                    <div id="view_document_container_for_msme"></div>
                    <div>
                        <button type="button" id="submit_btn_for_msme" class="btn btn-sm btn-success" onclick="MSME.listview.askForSubmitMSME('{{VALUE_TWO}}');"  style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button  >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>