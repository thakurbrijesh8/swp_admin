<div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FORM FOR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">INCENTIVES UNDER INVESTMENT PROMOTION SCHEME-2015 FOR TEXTILE SECTOR</div>
            </div>
            <form role="form" id="textile_form" name="textile_form" onsubmit="return false;">
                <input type="hidden" id="textile_id_for_textile" name="textile_id_for_textile" value="{{textile_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-textile f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">                   
                            <label>1.District <span class="color-nic-red">*</span></label>
                            <select id="district_for_textile" name="district_for_textile" class="form-control select2"
                                    onchange="checkValidation('textile', 'district_for_textile', districtValidationMessage)"
                                    data-placeholder="Select District" style="width: 100%;">
                            </select>
                            <span class="error-message error-message-textile-district_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('textile', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-textile-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <input type="text" id="enterprise_name_for_textile" name="enterprise_name_for_textile" class="form-control" placeholder="Enter Name of the Enterprise !"
                                   maxlength="100" onblur="checkValidation('textile', 'enterprise_name_for_textile', enterpriseNameValidationMessage);" value="{{enterprise_name}}">
                            <span class="error-message error-message-textile-enterprise_name_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Office Address with pin code No. <span class="color-nic-red">*</span></label>
                            <textarea id="office_address_for_textile" name="office_address_for_textile" class="form-control" placeholder="Enter Office Address with pin code No. !"
                                      maxlength="200" onblur="checkValidation('textile', 'office_address_for_textile', officeAddressValidationMessage);">{{office_address}}</textarea>
                            <span class="error-message error-message-textile-office_address_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Factory Address with pin code No. <span class="color-nic-red">*</span></label>
                            <textarea id="factory_address_for_textile" name="factory_address_for_textile" class="form-control" placeholder="Enter Factory Address with pin code No. !"
                                      maxlength="200" onblur="checkValidation('textile', 'factory_address_for_textile', factoryAddressValidationMessage);">{{factory_address}}</textarea>
                            <span class="error-message error-message-textile-factory_address_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5.1 Office Contact No. <span class="color-nic-red">*</span></label>
                            <input type="text" id="office_contact_number_for_textile" name="office_contact_number_for_textile" class="form-control" placeholder="Enter Office Contact No. !"
                                   onkeyup="checkNumeric($(this));" maxlength="20"
                                   onblur="checkValidation('textile', 'office_contact_number_for_textile', officeContactNoValidationMessage);" value="{{office_contact_number}}">
                            <span class="error-message error-message-textile-office_contact_number_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5.2 Factory Contact No. <span class="color-nic-red">*</span></label>
                            <input type="text" id="factory_contact_number_for_textile" name="factory_contact_number_for_textile" class="form-control" placeholder="Enter Factory Contact No. !"
                                   maxlength="20" onkeyup="checkNumeric($(this));" onblur="checkValidation('textile', 'factory_contact_number_for_textile', factoryContactNoValidationMessage);" value="{{factory_contact_number}}">
                            <span class="error-message error-message-textile-factory_contact_number_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>5.3 Fax </label>
                            <input type="text" id="fax_for_textile" name="fax_for_textile" class="form-control" placeholder="Enter Fax !"
                                   maxlength="20" value="{{fax}}" onkeyup="checkNumeric($(this));">
                            <span class="error-message error-message-textile-fax_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.4 Cell Phone </label>
                            <input type="text" id="cellphone_for_textile" name="cellphone_for_textile" class="form-control"
                                   placeholder="Enter Cell Phone !" maxlength="20"
                                   value="{{cellphone}}" onkeyup="checkNumeric($(this));">
                            <span class="error-message error-message-textile-cellphone_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>5.6 Email </label>
                            <input type="text" id="email_for_textile" name="email_for_textile" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('textile', 'email_for_textile', emailValidationMessage);" value="{{email}}">
                            <span class="error-message error-message-textile-email_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Constitution of the Enterprise<span class="color-nic-red">*</span></label>
                            <div id="constitution_container_for_textile">
                            </div>
                            <span class="error-message error-message-textile-constitution_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.1 Name of Promoter <span class="color-nic-red">*</span></label>
                            <input type="text" id="promoter_name_for_textile" name="promoter_name_for_textile" class="form-control" placeholder="Enter Name of Promoter !"
                                   maxlength="100" onblur="checkValidation('textile', 'promoter_name_for_textile', promoterNameValidationMessage);" value="{{promoter_name}}">
                            <span class="error-message error-message-textile-promoter_name_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.2 Designation of Promoter <span class="color-nic-red">*</span></label>
                            <textarea id="promoter_designation_for_textile" name="promoter_designation_for_textile" class="form-control" placeholder="Enter Designation of Promoter !"
                                      maxlength="100" onblur="checkValidation('textile', 'promoter_designation_for_textile', promoterDesignationValidationMessage);">{{promoter_designation}}</textarea>
                            <span class="error-message error-message-textile-promoter_designation_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.3 Contact Number of Promoter</label>
                            <input type="text" id="promoter_contact_number_for_textile" name="promoter_contact_number_for_textile" class="form-control"
                                   placeholder="Enter Contact Number !" maxlength="20" value="{{promoter_contact_number}}">
                            <span class="error-message error-message-textile-promoter_contact_number_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.4 Email of Promoter</label>
                            <input type="text" id="promoter_email_for_textile" name="promoter_email_for_textile" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('textile', 'promoter_email_for_textile', emailValidationMessage);" value="{{promoter_email}}">
                            <span class="error-message error-message-textile-promoter_email_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Social Status of the Entrepreneur <span class="color-nic-red">*</span></label>
                            <div id="social_status_container_for_textile">
                            </div>
                            <span class="error-message error-message-textile-social_status_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.1 Name of Authorized Person <span class="color-nic-red">*</span></label>
                            <input type="text" id="ap_name_for_textile" name="ap_name_for_textile" class="form-control" placeholder="Enter Name of Authorized Person !"
                                   maxlength="100" onblur="checkValidation('textile', 'ap_name_for_textile', apNameValidationMessage);" value="{{ap_name}}">
                            <span class="error-message error-message-textile-ap_name_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.2 Designation of Authorized Person <span class="color-nic-red">*</span></label>
                            <textarea id="ap_designation_for_textile" name="ap_designation_for_textile" class="form-control" placeholder="Enter Designation of Authorized Person !"
                                      maxlength="100" onblur="checkValidation('textile', 'ap_designation_for_textile', apDesignationValidationMessage);">{{ap_designation}}</textarea>
                            <span class="error-message error-message-textile-ap_designation_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.3 Contact Number of Authorized Person</label>
                            <input type="text" id="ap_contact_number_for_textile" name="ap_contact_number_for_textile" class="form-control"
                                   placeholder="Enter Contact Number !" maxlength="20" value="{{ap_contact_number}}">
                            <span class="error-message error-message-textile-ap_contact_number_for_textile"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9.4 Email of Authorized Person</label>
                            <input type="text" id="ap_email_for_textile" name="ap_email_for_textile" class="form-control"
                                   placeholder="Enter Email !" maxlength="100" 
                                   onblur="checkValidationForEmailBlank('textile', 'ap_email_for_textile', emailValidationMessage);" value="{{ap_email}}">
                            <span class="error-message error-message-textile-ap_email_for_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">                   
                            <label>10. Type of the Unit <span class="color-nic-red">*</span></label>
                            <select id="unit_type_for_textile" name="unit_type_for_textile" class="form-control select2"
                                    onclick="checkValidation('textile', 'unit_type_for_textile', oneOptionValidationMessage)"
                                    data-placeholder="Select Type of the Unit" style="width: 100%;">
                            </select>
                            <span class="error-message error-message-textile-unit_type_for_textile"></span>
                        </div>
                    </div>
                    <div id="view_document_container_for_textile"></div>
                    <div>
                        <button type="button" id="submit_btn_for_textile" class="btn btn-sm btn-success" onclick="Textile.listview.askForSubmitTextile('{{VALUE_TWO}}');"  style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();">Cancel</button  >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>