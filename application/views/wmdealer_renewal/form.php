<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">SCHEDULE – II “B”</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See rule 11 (2)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Form - LD – 2 </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[ Application for renewal License as Dealers in Weights & Measures under the Legal Metrology Act, 2009 ]</div>
            </div>
            <form role="form" id="dealer_renewal_form" name="dealer_renewal_form" onsubmit="return false;">
                <input type="hidden" id="dealer_renewal_id" name="dealer_renewal_id" value="{{dealer_renewal_data.dealer_renewal_id}}">
                <input type="hidden" id="dealer_id" name="dealer_id" value="{{dealer_renewal_data.dealer_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-dealer f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br/>
                            The Assistant Controller,<br/>
                            Department of Legal Metrology,<br/>
                            (Weights & Measures)<br/>
                            Daman & Diu<br/>
                        </div>
                    </div>
                    
                     <div class="row">
                      <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" >
                            </select>
                            </div>
                            <span class="error-message error-message-zone-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('dealer', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-dealer-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Dealer's License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admin_registration_number" name="admin_registration_number" class="form-control" placeholder="Enter Dealer's License Number !"
                                       maxlength="100" value="{{dealer_renewal_data.admin_registration_number}}" onblur="DealerRenewal.listview.getDealerData($(this));checkValidation('dealer', 'admin_registration_number', licenseNumberValidationMessage);">
                            </div>
                            <span class="error-message error-message-dealer-admin_registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name of the establishment/shop/person seeking the license<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_dealer" name="name_of_dealer" class="form-control" placeholder="Enter Name of the establishment/shop/person seeking the license !"
                                       maxlength="100" onblur="checkValidation('dealer', 'name_of_dealer', dealerNameValidationMessage);" value="{{dealer_renewal_data.name_of_dealer}}">
                            </div>
                            <span class="error-message error-message-dealer-name_of_dealer"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Complete address of the establishment etc <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="complete_address" name="complete_address" class="form-control" placeholder="Enter Complete address of the establishment !" maxlength="100" onblur="checkValidation('dealer', 'complete_address', workshopAddressValidationMessage);">{{dealer_renewal_data.complete_address}}</textarea>
                            </div>
                            <span class="error-message error-message-dealer-complete_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of Establishment of workshop/factory<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="establishment_date" id="establishment_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{establishment_date}}" onblur="checkValidation('dealer', 'establishment_date', establishmentDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-dealer-establishment_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>6. Are you a Limited (Ltd) Company ?</label>&nbsp;
                            <!-- <input type="checkbox" id="is_limited_company" name="is_limited_company" class="checkbox" value="{{is_checked}}"> -->
                            <input type="radio" id="is_limited_company_yes" name="is_limited_company" class="" value="{{VALUE_ONE}}">&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_limited_company_no" name="is_limited_company" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="">&nbsp;No
                            <span class="error-message error-message-dealer-is_limited_company"></span>
                        </div>
                    </div>
                    <div class="col-xs-12 proprietor_info_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">6.1 Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="proprietorList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of Occupier</th>
                                        <th>Address</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="proprietor_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="DealerRenewal.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Date Registration of Current of shop/establishment/Municipal Trade License<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="registration_date" id="registration_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{registration_date}}" onblur="checkValidation('dealer', 'registration_date', shopDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-dealer-registration_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Registration Number of shop/establishment/Municipal Trade License<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Registration Number of shop/establishment/Municipal Trade License !"
                                       maxlength="100" onblur="checkValidation('dealer', 'registration_number', shopRegNoValidationMessage);" value="{{dealer_renewal_data.registration_number}}">
                            </div>
                            <span class="error-message error-message-dealer-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Categories of weights and measures sold/proposed to be sold at present <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="categories_sold" name="categories_sold" class="form-control" placeholder="Enter Categories of weights and measures sold/proposed to be sold at present !" maxlength="100" onblur="checkValidation('dealer', 'categories_sold', categoriesSoldValidationMessage);">{{dealer_renewal_data.categories_sold}}</textarea>
                            </div>
                            <span class="error-message error-message-dealer-categories_sold"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Select one Identity</label>
                            <div class="input-group">
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Status !" name="identity_choice" id="identity_choice" onblur="checkValidation('dealer', 'identity_choice', identityChoiceValidationMessage);">
                                    <option value="">Select one Identity</option>
                                    <option value="1">VAT Registration Number</option>
                                    <option value="2">Sales Tax Registration Number</option>
                                    <option value="3">CST Number</option>
                                    <option value="4">Professional Tax Registration Number</option>
                                    <option value="5">IT Number</option>
                                </select>
                            </div>
                            <span class="error-message error-message-dealer-identity_choice"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11. Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="identity_number" name="identity_number" class="form-control" placeholder="Enter Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number !"
                                       maxlength="100" onblur="checkValidation('dealer', 'identity_number', identityNoValidationMessage);" value="{{dealer_renewal_data.identity_number}}">
                            </div>
                            <span class="error-message error-message-dealer-identity_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Do you intend to import weights etc. from places outside the State/Country ?</label>&nbsp;
                            <!-- <input type="checkbox" id="import_from_outside" name="import_from_outside" class="checkbox" value="{{is_checked}}"> -->
                            <input type="radio" id="import_from_outside_yes" name="import_from_outside" class="" value="{{VALUE_ONE}}">&nbsp; Yes
                            &emsp;
                            <input type="radio" id="import_from_outside_no" name="import_from_outside" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="">&nbsp;No
                            <span class="error-message error-message-dealer-import_from_outside"></span>
                        </div>
                    </div>
                    <div class="row import_from_outside_div" style="display: none;">
                        <div class="form-group col-sm-6">
                            <label>12.1 Registration of importer of Weights and Measures, if any</label>
                            <div class="input-group">
                                <input type="text" id="registration_of_importer" name="registration_of_importer" class="form-control" placeholder="Enter Registration of importer of Weights and Measures, if any !"
                                       maxlength="100" onblur="checkValidation('dealer', 'registration_of_importer', importerRegValidationMessage);" value="{{dealer_renewal_data.registration_of_importer}}">
                            </div>
                            <span class="error-message error-message-dealer-registration_of_importer"></span>
                        </div>
                        <input type="hidden" id="import_model" name="import_model" value="{{dealer_renewal_data.import_model}}">
                          <div class="form-group col-sm-6" id="import_model_container_for_dealer">
                            <label>12.2 Renewed Licence. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="import_model_for_dealer" name="import_model_for_dealer"
                                   accept="image/pdf">
                             <div class="error-message error-message-dealer-import_model_for_dealer"></div>
                        </div>

                     <div class="form-group col-sm-6" id="import_model_name_container_for_dealer" style="display: none;">
                            <label>12.2 Renewed Licence. <span style="color: red;">*<br></span></label><br>
                            <a id="import_model_download" target="_blank"><label id="import_model_name_image_for_dealer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                    <h2 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h2>
                    <br/>
                    <div class="row">
                        <div class="form-group col-sm-12" id="original_licence_container_for_dealer">
                            <label>13. Original Licence. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="original_licence_for_dealer" name="original_licence_for_dealer"
                                   accept="image/pdf">
                             <div class="error-message error-message-dealer-original_licence_for_dealer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="original_licence_name_container_for_dealer" style="display: none;">
                            <label>13.1 Original Licence. <span style="color: red;">*<br></span></label><br>
                            <a id="original_licence_download" target="_blank"><label id="original_licence_name_image_for_dealer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
 
                       <div class="row">
                        <div class="form-group col-sm-12" id="renewed_licence_container_for_dealer">
                            <label>14. Renewed Licence. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="renewed_licence_for_dealer" name="renewed_licence_for_dealer"
                                   accept="image/pdf">
                             <div class="error-message error-message-dealer-renewed_licence_for_dealer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="renewed_licence_name_container_for_dealer" style="display: none;">
                            <label>14.1 Renewed Licence. <span style="color: red;">*<br></span></label><br>
                            <a id="renewed_licence_download" target="_blank"><label id="renewed_licence_name_image_for_dealer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>


                <div class="row">
                        <div class="form-group col-sm-12" id="periodical_return_container_for_dealer">
                            <label>15. Register/ Periodical Return LM-4. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="periodical_return_for_dealer" name="periodical_return_for_dealer"
                                   accept="image/pdf">
                             <div class="error-message error-message-dealer-periodical_return_for_dealer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="periodical_return_name_container_for_dealer" style="display: none;">
                            <label>15.1 Register/ Periodical Return LM-4. <span style="color: red;">*<br></span></label><br>
                            <a id="periodical_return_download" target="_blank"><label id="periodical_return_name_image_for_dealer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

 
                <div class="row">
                        <div class="form-group col-sm-12" id="verification_certificate_container_for_dealer">
                            <label>16. Verification Certificate of Weights & Measures and Test Equipment Tools. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="verification_certificate_for_dealer" name="verification_certificate_for_dealer"
                                   accept="image/pdf">
                             <div class="error-message error-message-dealer-verification_certificate_for_dealer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="verification_certificate_name_container_for_dealer" style="display: none;">
                            <label>16.1 Verification Certificate of Weights & Measures and Test Equipment Tools. <span style="color: red;">*<br></span></label><br>
                            <a id="verification_certificate_download" target="_blank"><label id="verification_certificate_name_image_for_dealer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">17. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('dealer', 'declarationone', declarationOneValidationMessage);">&nbsp;Certified that I/We have read the Legal Metrology Act,2009 and the Daman and Diu Legal Metrology (Enforcement) Rules, 2011 and agree to abide by the same and also the same and also the administrative orders and instructions issued or to be issued there under.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-dealer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">18. &nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('dealer', 'declarationtwo', declarationTwoValidationMessage);">&nbsp;I/We agree to deposit the Scheduled license fees with Government as soon as required to do so by the Licensing Authority.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-dealer-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">19. &nbsp;
                                    <input type="checkbox" class="" name="declarationthree" id="declarationthree" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('dealer', 'declarationthree', declarationThreeValidationMessage);">&nbsp;All the information furnished above is true to the best of my/our knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-dealer-declarationthree"></span>
                        </div>
                    </div>
                   
                 <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_dealer">
                            <label>20. Signature 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_dealer" style="display: none;">
                            <label>20. Signature <span style="color: red;">*<br></span></label><br>
                            <a id="seal_and_stamp_download" target="_blank">
                                <img id="seal_and_stamp_name_image_for_dealer" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                     <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" id="submit_btn_for_delaer" class="btn btn-sm btn-success" onclick="DealerRenewal.listview.submitDealerRenewal({{VALUE_ONE}});" style="margin-right: 5px;">Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="DealerRenewal.listview.loadDealerRenewalData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>