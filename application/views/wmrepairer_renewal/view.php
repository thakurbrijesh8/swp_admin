<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">SCHEDULE – II B</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See rule 11 (2)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Form - LR – 2 </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[Application for Renewal License as repairers of Weights & Measures under the Legal Metrology Act, 2009]</div>
            </div>
            <form role="form" id="repairer_renewal_form" name="repairer_renewal_form" onsubmit="return false;">
                
                <input type="hidden" id="repairer_renewal_id" name="repairer_renewal_id" value="{{repairer_renewal_id}}">
                <input type="hidden" id="repairer_id" name="repairer_id" value="{{repairer_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-repairer f-w-b" style="border-bottom: 2px solid red;"></span>
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
                                    data-placeholder="Select District" style="width: 100%;" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-zone-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('repairer', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-repairer-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Repairer's License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admin_registration_number" name="admin_registration_number" class="form-control" placeholder="Enter Name of the concern seeking the license !"
                                       maxlength="100" value="{{admin_registration_number}}" onblur="RepairerRenewal.listview.getRepairerData($(this))" readonly>
                            </div>
                            <span class="error-message error-message-repairer-admin_registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name of the concern seeking the renewal of the license<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_repairmen" name="name_of_repairmen" class="form-control" placeholder="Enter Name of the concern seeking the license !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'name_of_repairmen', repairmenNameValidationMessage);" value="{{name_of_repairer}}">
                            </div>
                            <span class="error-message error-message-repairer-name_of_repairmen"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Complete address of the workshop <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="complete_address" name="complete_address" class="form-control" placeholder="Enter Complete address of the workshop !" maxlength="100" readonly onblur="checkValidation('repairer', 'complete_address', workshopAddressValidationMessage);">{{complete_address}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-complete_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>5. Are you a Limited (Ltd) Company ?</label>&nbsp;
                            <!-- <input type="checkbox" id="is_limited_company" name="is_limited_company" class="checkbox" value="{{is_checked}}"> -->
                            <input type="radio" id="is_limited_company_yes" name="is_limited_company" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_limited_company_no" name="is_limited_company" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-repairer-is_limited_company"></span>
                        </div>
                    </div>
                    <div class="col-xs-12 proprietor_info_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">5.1 Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
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
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Repairer.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Date of shop/establishment/Municipal Trade License<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="registration_date" id="registration_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{registration_date}}" readonly onblur="checkValidation('repairer', 'registration_date', shopDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-repairer-registration_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Registration Number of shop/establishment/Municipal Trade License<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Registration Number of shop/establishment/Municipal Trade License !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'registration_number', shopRegNoValidationMessage);" value="{{registration_number}}">
                            </div>
                            <span class="error-message error-message-repairer-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Select one Identity</label>
                            <div class="input-group"> 
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Status !" name="identity_choice" id="identity_choice" readonly onblur="checkValidation('repairer', 'identity_choice', identityChoiceValidationMessage);">
                                    <option value="">Select one Identity</option>
                                    <option value="1">VAT Registration Number</option>
                                    <option value="2">Sales Tax Registration Number</option>
                                    <option value="3">CST Number</option>
                                    <option value="4">Professional Tax Registration Number</option>
                                    <option value="5">IT Number</option>
                                </select>
                            </div>
                            <span class="error-message error-message-repairer-identity_choice"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="identity_number" name="identity_number" class="form-control" placeholder="Enter Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'identity_number', identityNoValidationMessage);" value="{{identity_number}}">
                            </div>
                            <span class="error-message error-message-repairer-identity_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. The type of weights and measures proposed to be repaired<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="weights_type" name="weights_type" class="form-control" placeholder="Enter The type of weights and measures proposed to be repaired !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'weights_type', weightTypeValidationMessage);" value="{{weights_type}}">
                            </div>
                            <span class="error-message error-message-repairer-weights_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11. Do you propose any change<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="propose_change" name="propose_change" class="form-control" placeholder="Enter any change !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'propose_change', proposeChangeValidationMessage);" value="{{propose_change}}">
                            </div>
                            <span class="error-message error-message-repairer-propose_change"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Area in which you wish to operate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="area_operate" name="area_operate" class="form-control" placeholder="Enter Area in which you wish to operate !"
                                       maxlength="100" readonly onblur="checkValidation('repairer', 'area_operate', areaOperateValidationMessage);" value="{{area_operate}}">
                            </div>
                            <span class="error-message error-message-repairer-area_operate"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13. Have you sufficient stock of lone/test weights, etc ?</label>&nbsp;
                            <!-- <input type="checkbox" id="sufficient_stock" name="sufficient_stock" class="checkbox" value="{{is_checked}}" disabled> -->
                            <input type="radio" id="sufficient_stock_yes" name="sufficient_stock" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="sufficient_stock_no" name="sufficient_stock" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-repairer-sufficient_stock"></span>
                        </div>
                        <div class="form-group col-sm-6 stock_details_div" style="display: none;">
                            <label>13.1 Stock Details <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="stock_details" name="stock_details" class="form-control" placeholder="Enter Stock Details !" maxlength="100" readonly onblur="checkValidation('repairer', 'stock_details', stockDetailValidationMessage);">{{stock_details}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-stock_details"></span>
                        </div>
                    </div>
                    <h2 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h2>
                    <br/>
                       <div class="row">
                        <div class="form-group col-sm-12" id="original_licence_container_for_repairer">
                            <label>14. Original Licence. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="original_licence_for_repairer" name="original_licence_for_repairer"
                                   accept="image/pdf">
                             <div class="error-message error-message-repairer-original_licence_for_repairer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="original_licence_name_container_for_repairer" style="display: none;">
                            <label>14.1 Original Licence. <span style="color: red;">*<br></span></label><br>
                            <a id="original_licence_download" target="_blank"><label id="original_licence_name_image_for_repairer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
 
                       <div class="row">
                        <div class="form-group col-sm-12" id="renewed_licence_container_for_repairer">
                            <label>15. Renewed Licence. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="renewed_licence_for_repairer" name="renewed_licence_for_repairer"
                                   accept="image/pdf">
                             <div class="error-message error-message-repairer-renewed_licence_for_repairer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="renewed_licence_name_container_for_repairer" style="display: none;">
                            <label>15.1 Renewed Licence. <span style="color: red;">*<br></span></label><br>
                            <a id="renewed_licence_download" target="_blank"><label id="renewed_licence_name_image_for_repairer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>


                <div class="row">
                        <div class="form-group col-sm-12" id="periodical_return_container_for_repairer">
                            <label>16. Register/ Periodical Return LM-4. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="periodical_return_for_repairer" name="periodical_return_for_repairer"
                                   accept="image/pdf">
                             <div class="error-message error-message-repairer-periodical_return_for_repairer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="periodical_return_name_container_for_repairer" style="display: none;">
                            <label>16.1 Register/ Periodical Return LM-4. <span style="color: red;">*<br></span></label><br>
                            <a id="periodical_return_download" target="_blank"><label id="periodical_return_name_image_for_repairer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

 
                <div class="row">
                        <div class="form-group col-sm-12" id="verification_certificate_container_for_repairer">
                            <label>17. Verification Certificate of Weights & Measures and Test Equipment Tools. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="verification_certificate_for_repairer" name="verification_certificate_for_repairer"
                                   accept="image/pdf">
                             <div class="error-message error-message-repairer-verification_certificate_for_repairer"></div>
                        </div>

                     <div class="form-group col-sm-12" id="verification_certificate_name_container_for_repairer" style="display: none;">
                            <label>17.1 Verification Certificate of Weights & Measures and Test Equipment Tools. <span style="color: red;">*<br></span></label><br>
                            <a id="verification_certificate_download" target="_blank"><label id="verification_certificate_name_image_for_repairer" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
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
                                <span class="input-group-addon">18. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" disabled onblur="checkValidation('repairer', 'declarationone', declarationOneValidationMessage);">&nbsp;Certified that I/We have read the Legal Metrology Act,2009 and the Daman and Diu Legal Metrology (Enforcement) Rules, 2011 and agree to abide by the same and also the same and also the administrative orders and instructions issued or to be issued there under.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">19. &nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" disabled onblur="checkValidation('repairer', 'declarationtwo', declarationTwoValidationMessage);">&nbsp;I/We agree to deposit the Scheduled license fees with Government as soon as required to do so by the Licensing Authority.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">20. &nbsp;
                                    <input type="checkbox" class="" name="declarationthree" id="declarationthree" autocomplete="true" value="{{is_checked}}" disabled onblur="checkValidation('repairer', 'declarationthree', declarationThreeValidationMessage);">&nbsp;All the information furnished above is true to the best of my/our knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationthree"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_repairer">
                            <label>21. Signature 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_repairer" style="display: none;">
                            <label>21. Signature <span style="color: red;">*<br></span></label><br>
                            <a id="seal_and_stamp_download" target="_blank">
                                <img id="seal_and_stamp_name_image_for_repairer" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                     <hr class="m-b-1rem"> 


                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="RepairerRenewal.listview.loadRepairerRenewalData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>