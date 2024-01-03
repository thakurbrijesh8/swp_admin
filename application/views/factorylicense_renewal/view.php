<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM- 3</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 6)</div>
            </div>
            <form role="form" id="factory_license_renewal_form" name="factory_license_renewal_form" onsubmit="return false;">
                <input type="hidden" id="factorylicence_id" name="factorylicence_id" value="{{factorylicence_id}}">
                <input type="hidden" id="factorylicence_renewal_id" name="factorylicence_renewal_id" value="{{factorylicence_renewal_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-factory-license-renewal f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District</label>
                            <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" disabled="" style="width: 100%;">
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('factory-license-renewal', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Factory License Number<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Factory License Number !"
                                       maxlength="100" value="{{license_number}}" onblur="FactoryLicenseRenewal.listview.getFactoryLicenseData($(this));checkValidation('factory-license-renewal', 'registration_number', licenseNumberValidationMessage);" readonly>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Full name of factory<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_factory" name="name_of_factory" class="form-control" placeholder="Enter Full name of factory !"
                                       maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'name_of_factory', factoryNameValidationMessage);" value="{{name_of_factory}}">
                            </div>
                            <span class="error-message error-message-factory-license-renewal-name_of_factory"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Full postal address and situation of factory</label>
                            <div class="input-group">
                                <textarea id="factory_address" name="factory_address" class="form-control" placeholder="Enter Full factory address to situation of factory !" maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'factory_address', factoryAddressValidationMessage);">{{factory_address}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-factory_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Full postal address to which communications should be carried (where the factory address serve the purpose of communication also this information need not be given.) <span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="factory_postal_address" name="factory_postal_address" class="form-control" placeholder="Enter Full postal address to which communications Relating to factory should be sent !" maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'factory_postal_address', factoryPostalAddressValidationMessage);">{{factory_postal_address}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-factory_postal_address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Maximum number of workers proposed to be employed on any one day during the year<span style="color: red;"></span></label>
                            <input type="text" id="max_no_of_worker_year" name="max_no_of_worker_year" class="form-control" placeholder="Enter Maximum number of workers proposed to be employed on any one day during the year !" onkeyup="checkNumeric($(this));"
                                   maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'max_no_of_worker_year', maxWorkerValidationMessage);" value="{{max_no_of_worker_year}}" style="margin-top: 22px;">
                            <span class="error-message error-message-factory-license-renewal-max_no_of_worker_year"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Installed (H.P.)<span style="color: red;"></span></label>
                            <input type="text" id="max_power_to_be_used" name="max_power_to_be_used" class="form-control" placeholder="Enter Installed (H.P.) !"
                                   maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'max_power_to_be_used', maxPowerValidationMessage);" onkeyup="checkNumeric($(this));" value="{{max_power_to_be_used}}">
                            <span class="error-message error-message-factory-license-renewal-max_power_to_be_used"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Full name and residential address of the person who shall be the manager of the factory for the purpose of the Act</label>
                            <div class="input-group">
                                <textarea id="manager_detail" name="manager_detail" class="form-control" placeholder="Enter Full name and residential address of manager!" maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'max_power_to_be_used', managerValidationMessage);">{{manager_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-manager_detail"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Full name and residential address of the Occupier <span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="occupier_detail" name="occupier_detail" class="form-control" placeholder="Enter Full name and residential address of the Occupier !" maxlength="100" readonly onblur="checkValidation('factory-license-renewal', 'occupier_detail', occupierValidationMessage);" style="margin-top: 22px;">{{occupier_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-factory-license-renewal-occupier_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_of_manager_container_for_fl">
                            <label>10. Signature of Occupier of the factory<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="sign_of_manager_for_fl" name="sign_of_manager_for_fl"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-factory-license-renewal-sign_of_manager_for_fl"></div>
                        </div>
                        <div class="form-group col-sm-12" id="sign_of_manager_name_container_for_fl" style="display: none;">
                            <label>10. Signature of Occupier of the factory<span style="color: red;"> <br></span></label><br>
                            <!-- <img id="sign_of_manager_name_image_for_fl" style="width: 250px; height: 250px; border: 2px solid blue;"> -->
                            <a id="sign_of_manager_download" target="_blank"><img id="sign_of_manager_name_image_for_fl" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_of_occupier_container_for_fl">
                            <label>11. Signature of Manager of the factory<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="sign_of_occupier_for_fl" name="sign_of_occupier_for_fl"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-factory-license-renewal-sign_of_occupier_for_fl"></div>
                        </div>
                        <div class="form-group col-sm-12" id="sign_of_occupier_name_container_for_fl" style="display: none;">
                            <label>11. Signature of Manager of the factory<span style="color: red;"> <br></span></label><br>
                            <!-- <img id="sign_of_occupier_name_image_for_fl" style="width: 250px; height: 250px; border: 2px solid blue;"> -->
                            <a id="sign_of_occupier_download" target="_blank"><img id="sign_of_occupier_name_image_for_fl" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="FactoryLicenseRenewal.listview.loadFactoryLicenseRenewalData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>