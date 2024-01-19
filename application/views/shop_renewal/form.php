<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF LABOUR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Shop & Establishment Renewal Form</div>
            </div>
            <form role="form" id="shop_renewal_form" name="shop_renewal_form" onsubmit="return false;">
                <input type="hidden" id="shop_renewal_id" name="shop_renewal_id" value="{{shoprenewal_data.shop_renewal_id}}">
                <input type="hidden" id="shop_id" name="shop_id" value="{{shoprenewal_data.shop_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-shoprenewal f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            Labour Inspector<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Shop & Establishment License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Shop & Establishment License Number !"
                                       maxlength="100" value="{{shoprenewal_data.registration_number}}" onblur="ShopRenewal.listview.getShopData($(this))">
                            </div>
                            <span class="error-message error-message-shoprenewal-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-shoprenewal-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('shoprenewal', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-shoprenewal-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name of Shop & Establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_shop" name="name_of_shop" class="form-control" placeholder="Name of Shop & Establishment !"
                                       maxlength="100" onblur="checkValidation('shoprenewal', 'name_of_shop', shopNameValidationMessage);" value="{{shoprenewal_data.name_of_shop}}">
                            </div>
                            <span class="error-message error-message-shoprenewal-name_of_shop"></span>
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>4. Door No. <span style="color: red;">*</span></label>
                            <input type="text" id="door_no_for_shop" name="door_no_for_shop" class="form-control" placeholder=" Door No. of the Shop/Establishment !"
                                   maxlength="25" onblur="checkValidation('shoprenewal', 'door_no_for_shop', shopDoorNoValidationMessage);" value="{{shoprenewal_data.door_no}}">
                            <span class="error-message error-message-shoprenewal-door_no_for_shop"></span>
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>5. Street Name <span style="color: red;">*</span></label>
                            <input type="text" id="street_name_for_shop" name="street_name_for_shop" class="form-control" placeholder=" Street Name of the Shop/Establishment !"
                                   maxlength="100" onblur="checkValidation('shoprenewal', 'street_name_for_shop', shopStreetNameValidationMessage);" value="{{shoprenewal_data.street_name}}">
                            <span class="error-message error-message-shoprenewal-street_name_for_shop"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Location of the Shop/Establishment   <span style="color: red;">*</span></label>
                            <textarea id="loaction_for_shop" name="loaction_for_shop" class="form-control"
                                      onblur="checkValidation('shoprenewal', 'loaction_for_shop', shopLocationValidationMessage);"
                                      placeholder=" Location of the Shop/Establishment !" maxlength="200">{{shoprenewal_data.location}}</textarea>
                            <span class="error-message error-message-shoprenewal-loaction_for_shop"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Total Number of employees <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_employees" name="total_employees" class="form-control" placeholder="Total Number of employees !" maxlength="100" value="{{shoprenewal_data.total_employees}}"
                                       onkeyup="checkNumeric($(this));" onblur="checkValidation('shoprenewal', 'total_employees', totalTotalValidationMessage);">
                            </div>
                            <span class="error-message error-message-shoprenewal-total_employees"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Nature of Business <span style="color: red;">*</span></label>
                            <input type="text" id="nature_of_business_for_shop" name="nature_of_business_for_shop" class="form-control" placeholder=" Nature of Business of Shop/Establishment !"
                                   maxlength="100"   onblur="checkValidation('shoprenewal', 'nature_of_business_for_shop', shopNatureOfBusinessValidationMessage);" value="{{shoprenewal_data.nature_of_business}}">
                            <span class="error-message error-message-shoprenewal-nature_of_business_for_shop"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Employer Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="col-sm-5 form-group">
                            <label>9. Full Name of the Employer(including his Father's Name)<span style="color: red;">*</span></label>
                            <input type="text" id="name_of_employer_for_shop" name="name_of_employer_for_shop" class="form-control" placeholder=" Full Name of the Employer !"
                                   maxlength="100" onblur="checkValidation('shoprenewal', 'name_of_employer_for_shop', shopEmployerNameValidationMessage);" value="{{shoprenewal_data.employer_name}}">
                            <span class="error-message error-message-shoprenewal-name_of_employer_for_shop"></span>
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>10. Mobile No. of the Employer <span style="color: red;">*</span></label>
                            <input type="text" id="mobile_no_employer_for_shop" name="mobile_no_employer_for_shop" class="form-control" placeholder=" Mobile No. of the Employer !"
                                   maxlength="10" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this)); checkValidationForMobileNumber('shoprenewal', 'mobile_no_employer_for_shop', mobileValidationMessage);" value="{{shoprenewal_data.employer_mobile_no}}">
                            <span class="error-message error-message-shoprenewal-mobile_no_employer_for_shop"></span>
                        </div>
                        <div class="col-sm-4 form-group">
                            <label>11. Residential address of the Employer <span style="color: red;">*</span></label>
                            <textarea id="residential_address_employer_for_shop" name="residential_address_employer_for_shop" class="form-control" placeholder=" Residential Address of the Employer !"
                                      maxlength="200" onblur="checkValidation('shoprenewal', 'residential_address_employer_for_shop', shopEmployerResidentialAddressValidationMessage);">{{shoprenewal_data.employer_residential_address}}</textarea>
                            <span class="error-message error-message-shoprenewal-residential_address_employer_for_shop"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Manager Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Full Name of the Manager (including his Father's Name) <span style="color: red;">*</span></label>
                            <input type="text" id="manager_name_for_shop" name="manager_name_for_shop" class="form-control" placeholder=" Full Name of Manager !"
                                   maxlength="150"  onblur="checkValidation('shoprenewal', 'manager_name_for_shop', shopManagerNameValidationMessage);" value="{{shoprenewal_data.manager_name}}">
                            <span class="error-message error-message-shoprenewal-manager_name_for_shop"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13. Residential Address of the Manager <span style="color: red;">*</span></label>
                            <textarea id="residential_address_manager_for_shop" name="residential_address_manager_for_shop" class="form-control"
                                      onblur="checkValidation('shoprenewal', 'residential_address_manager_for_shop', shopManagerResidentialAddressValidationMessage);" 
                                      placeholder=" Residential Address of the Manager !" maxlength="200">{{shoprenewal_data.manager_residential_address}}</textarea>
                            <span class="error-message error-message-shoprenewal-residential_address_manager_for_shop"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. Category of establishment i.e, whether a Shop, Commercial Establishment, residential Hotel, restaurant, eating house, theatre, Cinema, or other place or public amusement of entertainment etc. <span style="color: red;">*</span></label>
                            <input type="text" id="category_for_shop" name="category_for_shop" class="form-control" placeholder=" Category of establishment i.e, whether a Shop, Commercial Establishment, residential Hotel, restaurant, eating house, theatre, Cinema, or other place or public amusement of entertainment etc. !"
                                   maxlength="100"   onblur="checkValidation('shoprenewal', 'category_for_shop', shopCategoryValidationMessage);" value="{{shoprenewal_data.category}}">
                            <span class="error-message error-message-shoprenewal-category_for_shop"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_shoprenewal">
                            <label>15. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-shoprenewal-seal_and_stamp_for_shoprenewal"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_shoprenewal" style="display: none;">
                            <label>15. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_shoprenewal" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" id="submit_btn_for_shoprenewal" class="btn btn-sm btn-success" onclick="ShopRenewal.listview.askForSubmitShopRenewal({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="ShopRenewal.listview.loadShopRenewalData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>