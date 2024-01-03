<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">SCHEDULE – II “A”</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See rule 11 (1)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Form - LM – 1 </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[Application Form for License as Manufacture in Weights & Measures under the Legal Metrology Act, 2009]</div>
            </div>
            <form role="form" id="manufacturer_form" name="manufacturer_form" onsubmit="return false;">
                
                <input type="hidden" id="manufacturer_id" name="manufacturer_id" value="{{manufacturer_id}}">
                <div class="card-body">
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
                                    data-placeholder="Select District" style="width: 100%;" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-zone-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('manufacturer', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-manufacturer-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of the concern seeking the license<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_manufacturer" name="name_of_manufacturer" class="form-control" placeholder="Enter Name of the concern seeking the license !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'name_of_manufacturer', manufacturerNameValidationMessage);" value="{{name_of_manufacturer}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-name_of_manufacturer"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Complete address of the workshop <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="complete_address" name="complete_address" class="form-control" placeholder="Enter Complete address of the workshop !" maxlength="100" onblur="checkValidation('manufacturer', 'complete_address', workshopAddressValidationMessage);" readonly>{{complete_address}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-complete_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Status of the Premises</label>
                            <div class="input-group">
                                <select class="form-control" id="premises_status" name="premises_status"
                                    data-placeholder="Status !" onblur="checkValidation('manufacturer', 'identity_choice', premisesStatusValidationMessage);" disabled>
                                    <option>Select Status of the Premises</option>
                                    <option value="1">Owned</option>
                                    <option value="2">Rented</option>
                                    <option value="3">Taken on Lease/Leave License</option>
                                </select>
                            </div>
                            <span class="error-message error-message-manufacturer-premises_status"></span>
                        </div>

                        <div class="form-group col-sm-6" id="support_document_container_for_manufacturer">
                            <label>5. Support Documents .<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="support_document_for_manufacturer" name="support_document_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-support_document_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-6" id="support_document_name_container_for_manufacturer" style="display: none;">
                            <label>5.1 Support Documents <span style="color: red;">*<br></span></label><br>
                            <a id="support_document_download" target="_blank"><label id="support_document_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Date of Establishment of workshop/factory<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="establishment_date" id="establishment_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{establishment_date}}" onblur="checkValidation('manufacturer', 'establishment_date', establishmentDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-manufacturer-establishment_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>7. Are you a Limited (Ltd) Company ?</label>&nbsp;
                            <!-- <input type="checkbox" id="is_limited_company" name="is_limited_company" class="checkbox" value="{{is_checked}}" disabled> -->
                            <input type="radio" id="is_limited_company_yes" name="is_limited_company" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_limited_company_no" name="is_limited_company" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-manufacturer-is_limited_company"></span>
                        </div>
                    </div>
                    <div class="col-xs-12 proprietor_info_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">7.1 Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="proprietorList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of Occupier</th>
                                        <th>Father's Name </th>
                                        <th>Address</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="proprietor_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Manufacturer.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Date of shop/establishment/Municipal Trade License<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="registration_date" id="registration_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{registration_date}}" onblur="checkValidation('manufacturer', 'registration_date', shopDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-manufacturer-registration_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Registration Number of shop/establishment/Municipal Trade License<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Registration Number of shop/establishment/Municipal Trade License !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'registration_number', shopRegNoValidationMessage);" value="{{registration_number}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Nature of manufacturing Activity at present<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="manufacturing_activity" name="manufacturing_activity" class="form-control" placeholder="Enter Nature of manufacturing Activity at present !" 
                                       maxlength="100" onblur="checkValidation('manufacturer', 'manufacturing_activity', activityValidationMessage);" value="{{manufacturing_activity}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-manufacturing_activity"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. The type of weights and measures proposed to be manufactured viz<br/>11.1 Weights<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="weights_type" name="weights_type" class="form-control" placeholder="Enter Weights !" 
                                       maxlength="100" onblur="checkValidation('manufacturer', 'weights_type', weightTypeValidationMessage);" value="{{weights_type}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-weights_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 20px;">10.2 Measures<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="measures_type" name="measures_type" class="form-control" placeholder="Enter Measures !" 
                                       maxlength="100" onblur="checkValidation('manufacturer', 'measures_type', measureTypeValidationMessage);" value="{{measures_type}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-measures_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Weighing Instruments<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="weighing_instruments_type" name="weighing_instruments_type" class="form-control" placeholder="Enter Weighing Instruments !" 
                                       maxlength="100" onblur="checkValidation('manufacturer', 'weighing_instruments_type', weightInstrumrntValidationMessage);" value="{{weighing_instruments_type}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-weighing_instruments_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13. Measuring Instruments<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="measuring_instruments_type" name="measuring_instruments_type" class="form-control" placeholder="Enter Measuring Instruments !" 
                                       maxlength="100" onblur="checkValidation('manufacturer', 'measuring_instruments_type', measureInstumentValidationMessage);" value="{{measuring_instruments_type}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-measuring_instruments_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. The number of people employed/proposed to be employed<br/>14.1 Skilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_skilled" name="no_of_skilled" class="form-control" placeholder="Enter Skilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'no_of_skilled', skilledNoValidationMessage);" value="{{no_of_skilled}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-no_of_skilled"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 20px;">14.2 Semi-Skilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_semiskilled" name="no_of_semiskilled" class="form-control" placeholder="Enter Semi Skilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'no_of_semiskilled', semiskilledNoValidationMessage);" value="{{no_of_semiskilled}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-no_of_semiskilled"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14.3 Unskilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_unskilled" name="no_of_unskilled" class="form-control" placeholder="Enter Unskilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'no_of_unskilled', unskilledNoValidationMessage);" value="{{no_of_unskilled}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-no_of_unskilled"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14.4 Employees trained in the line<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_specialist" name="no_of_specialist" class="form-control" placeholder="Enter Employees trained in the line !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'no_of_specialist', trainEmpValidationMessage);" value="{{no_of_specialist}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-no_of_specialist"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Details of Qualified Personnel<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_personnel" name="details_of_personnel" class="form-control" placeholder="Enter Details of Qualified Personnel !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'details_of_personnel', personnelDetailValidationMessage);" readonly>{{details_of_personnel}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-details_of_personnel"></span>
                        </div>
                          <div class="form-group col-sm-6" id="monogram_uploader_container_for_manufacturer">
                            <label>16. The monogram or trade mark intended to be Imprinted on weights and measures to be manufactured. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="monogram_uploader_for_manufacturer" name="monogram_uploader_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-monogram_uploader_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-6" id="monogram_uploader_name_container_for_manufacturer" style="display: none;">
                            <label>16.1 The monogram or trade mark intended to be Imprinted on weights and measures to be manufactured. <span style="color: red;">*<br></span></label><br>
                            <a id="monogram_uploader_download" target="_blank"><label id="monogram_uploader_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>17. Details of machinery, tools accessories, owned and used for manufacturing weights measures etc<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_machinery" name="details_of_machinery" class="form-control" placeholder="Enter Details of machinery, tools accessories, owned and used for manufacturing weights measures etc !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'details_of_machinery', machineryValidationMessage);" readonly>{{details_of_machinery}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-details_of_machinery"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>18. Details of foundry/workshop facilities arranged whether ownership, long term lease etc<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_foundry" name="details_of_foundry" class="form-control" placeholder="Enter Details of foundry/workshop facilities arranged whether ownership, long term lease etc !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'details_of_foundry', foundryValidationMessage);" readonly>{{details_of_foundry}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-details_of_foundry"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>19. Facilities of steel casting and hardness testing of Vital parts etc or other means<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="steel_casting_facility" name="steel_casting_facility" class="form-control" placeholder="Enter Facilities of steel casting and hardness testing of Vital parts etc or other means !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'steel_casting_facility', castingFacilityValidationMessage);" readonly>{{steel_casting_facility}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-steel_casting_facility"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>20. Availability of electric energy<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="electric_energy_availability" name="electric_energy_availability" class="form-control" placeholder="Enter Availability of electric energy !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'electric_energy_availability', electricEnergyValidationMessage);" value="{{electric_energy_availability}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-electric_energy_availability"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>21. Details of loan received from Government or Financial Institution, if any<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_loan" name="details_of_loan" class="form-control" placeholder="Enter Details of loan received from Government or Financial Institution, if any !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'details_of_loan', loanDetailValidationMessage);" readonly>{{details_of_loan}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-details_of_loan"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>22. Name of Bankers, if any<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="banker_names" name="banker_names" class="form-control" placeholder="Enter Name of Bankers, if any !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'banker_names', bankNameValidationMessage);" readonly>{{banker_names}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-banker_names"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>23. Select one Identity</label>
                            <div class="input-group">
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Status !" name="identity_choice" id="identity_choice" onblur="checkValidation('manufacturer', 'identity_choice', identityChoiceValidationMessage);" disabled>
                                    <option value="">Select one Identity</option>
                                    <option value="1">VAT Registration Number</option>
                                    <option value="2">Sales Tax Registration Number</option>
                                    <option value="3">CST Number</option>
                                    <option value="4">Professional Tax Registration Number</option>
                                    <option value="5">IT Number</option>
                                </select>
                            </div>
                            <span class="error-message error-message-manufacturer-identity_choice"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>24. Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="identity_number" name="identity_number" class="form-control" placeholder="Enter Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number !"
                                       maxlength="100" onblur="checkValidation('manufacturer', 'identity_number', identityNoValidationMessage);" value="{{identity_number}}" readonly>
                            </div>
                            <span class="error-message error-message-manufacturer-identity_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>25. Have you applied previously for a manufacturer’s license ?</label>&nbsp;
                            <!-- <input type="checkbox" id="any_previous_application" name="any_previous_application" class="checkbox" value="{{is_checked}}" disabled> -->
                            <input type="radio" id="any_previous_application_yes" name="any_previous_application" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="any_previous_application_no" name="any_previous_application" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-manufacturer-any_previous_application"></span>
                        </div>
                    </div>
                    <div class="row any_previous_application_div" style="display: none;">
                        <div class="form-group col-sm-6">
                            <label>25.1 Date Applied On<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="license_application_date" id="license_application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{license_application_date}}" onblur="checkValidation('manufacturer', 'license_application_date', appliedDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-manufacturer-license_application_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>25.2 Result of the Application <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="license_application_result" name="license_application_result" class="form-control" placeholder="Enter Result of the Application !" maxlength="100" onblur="checkValidation('manufacturer', 'license_application_result', licenseResultValidationMessage);" readonly>{{license_application_result}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-license_application_result"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>26. Whether the item (s) proposed to be manufactured will be sold</label>
                            <div class="input-group">
                                <select class="form-control" id="location_of_selling" name="location_of_selling"
                                    data-placeholder="Status !" onblur="checkValidation('manufacturer', 'location_of_selling', sellingLocationStatusValidationMessage);" disabled>
                                    <option>Select the item (s) proposed to be manufactured will be sold</option>
                                    <option value="1">within the State</option>
                                    <option value="2">outside the State</option>
                                    <option value="3">both, within and outside the State</option>
                                </select>
                            </div>
                            <span class="error-message error-message-manufacturer-location_of_selling"></span>
                        </div>
                    </div>    
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>27. Details of Model Approval received from Government of India<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="model_approval_detail" name="model_approval_detail" class="form-control" placeholder="Enter Details of Model Approval received from Government of India!" maxlength="100" onblur="checkValidation('manufacturer', 'model_approval_detail', approvalModelValidationMessage);" readonly>{{model_approval_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-manufacturer-model_approval_detail"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>28. When can you produce for inspection samples of your products for which license is desired<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="inspection_sample_date" id="inspection_sample_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{inspection_sample_date}}" onblur="checkValidation('manufacturer', 'inspection_sample_date', inspectionDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-manufacturer-inspection_sample_date"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h2>
                    <br/>
                     <div class="row">
                        <div class="form-group col-sm-12" id="model_approval_certificate_container_for_manufacturer">
                            <label>29. Model approval certificate issued by the Govt. of India.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="model_approval_certificate_for_manufacturer" name="model_approval_certificate_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-model_approval_certificate_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="model_approval_certificate_name_container_for_manufacturer" style="display: none;">
                            <label>29.1 Model approval certificate issued by the Govt. of India.<span style="color: red;">*<br></span></label><br>
                            <a id="model_approval_certificate_download" target="_blank"><label id="model_approval_certificate_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="proof_of_ownership_container_for_manufacturer">
                            <label>30 Proof of ownership of business premises/ Rent agreement.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="proof_of_ownership_for_manufacturer" name="proof_of_ownership_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-proof_of_ownership_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="proof_of_ownership_name_container_for_manufacturer" style="display: none;">
                            <label>30.1 Proof of ownership of business premises/ Rent agreement.<span style="color: red;">*<br></span></label><br>
                            <a id="proof_of_ownership_download" target="_blank"><label id="proof_of_ownership_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                 
                      <div class="row">
                        <div class="form-group col-sm-12" id="gst_certificate_container_for_manufacturer">
                            <label>31. GST Certificate.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="gst_certificate_for_manufacturer" name="gst_certificate_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-gst_certificate_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="gst_certificate_name_container_for_manufacturer" style="display: none;">
                            <label>31.1 GST Certificate.<span style="color: red;">*<br></span></label><br>
                            <a id="gst_certificate_download" target="_blank"><label id="gst_certificate_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="partnership_deed_container_for_manufacturer">
                            <label>32. Partnership deed ( If operating in partnership ).<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="partnership_deed_for_manufacturer" name="partnership_deed_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-partnership_deed_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="partnership_deed_name_container_for_manufacturer" style="display: none;">
                            <label>32.1 Partnership deed ( If operating in partnership ).<span style="color: red;">*<br></span></label><br>
                            <a id="partnership_deed_download" target="_blank"><label id="partnership_deedd_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
               
                      <div class="row">
                        <div class="form-group col-sm-12" id="memorandum_of_association_container_for_manufacturer">
                            <label>33. Memorandum & Articles of Association ( If operating a Private / Limited ).<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="memorandum_of_association_for_manufacturer" name="memorandum_of_association_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-memorandum_of_association_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="memorandum_of_association_name_container_for_manufacturer" style="display: none;">
                            <label>33.1 Memorandum & Articles of Association ( If operating a Private / Limited ).<span style="color: red;">*<br></span></label><br>
                            <a id="memorandum_of_association_download" target="_blank"><label id="memorandum_of_association_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
            
                      <div class="row">
                        <div class="form-group col-sm-12" id="list_of_raw_material_container_for_manufacturer">
                            <label>34. List of Raw Material Required.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="list_of_raw_material_for_manufacturer" name="list_of_raw_material_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-list_of_raw_material_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="list_of_raw_material_name_container_for_manufacturer" style="display: none;">
                            <label>34.1 List of Raw Material Required.<span style="color: red;">*<br></span></label><br>
                            <a id="list_of_raw_material_download" target="_blank"><label id="list_of_raw_material_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="list_of_machinery_container_for_manufacturer">
                            <label>35. List of Machinery & Tools.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="list_of_machinery_for_manufacturer" name="list_of_machinery_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-list_of_machinery_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="list_of_machinery_name_container_for_manufacturer" style="display: none;">
                            <label>35.1 List of Machinery & Tools.<span style="color: red;">*<br></span></label><br>
                            <a id="list_of_machinery_download" target="_blank"><label id="list_of_machinery_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="list_of_wm_container_for_manufacturer">
                            <label>36. List of Weights & Measures used and maintained.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="list_of_wm_for_manufacturer" name="list_of_wm_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-list_of_wm_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="list_of_wm_name_container_for_manufacturer" style="display: none;">
                            <label>36.1 List of Weights & Measures used and maintained.<span style="color: red;">*<br></span></label><br>
                            <a id="list_of_wm_download" target="_blank"><label id="list_of_wm_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                   <div class="row">
                        <div class="form-group col-sm-12" id="list_of_directors_container_for_manufacturer">
                            <label>37. List of Directors/ Partners of the company as amended time to time.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="list_of_directors_for_manufacturer" name="list_of_directors_for_manufacturer"
                                   accept="image/pdf">
                             <div class="error-message error-message-manufacturer-list_of_directors_for_manufacturer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="list_of_directors_name_container_for_manufacturer" style="display: none;">
                            <label>37.1 List of Directors/ Partners of the company as amended time to time.<span style="color: red;">*<br></span></label><br>
                            <a id="list_of_directors_download" target="_blank"><label id="list_of_directors_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>To Be Certified by Applicant</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">38. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('manufacturer', 'declarationone', declarationOneValidationMessage);" disabled>&nbsp;Certified that I/We have read the Legal Metrology Act,2009 and the Daman and Diu Legal Metrology (Enforcement) Rules, 2011 and agree to abide by the same and also the same and also the administrative orders and instructions issued or to be issued there under.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-manufacturer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">39. &nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('manufacturer', 'declarationtwo', declarationTwoValidationMessage);" disabled>&nbsp;I/We agree to deposit the Scheduled license fees with Government as soon as required to do so by the Licensing Authority.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-manufacturer-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">40. &nbsp;
                                    <input type="checkbox" class="" name="declarationthree" id="declarationthree" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('manufacturer', 'declarationthree', declarationThreeValidationMessage);" disabled>&nbsp;All the information furnished above is true to the best of my/our knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-manufacturer-declarationthree"></span>
                        </div>
                    </div>
                  <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_manufacturer">
                            <label>41. Signature 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_manufacturer" style="display: none;">
                            <label>41. Signature <span style="color: red;">*<br></span></label><br>
                            <a id="seal_and_stamp_download" target="_blank">
                                <img id="seal_and_stamp_name_image_for_manufacturer" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                     <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Manufacturer.listview.loadManufacturerData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>