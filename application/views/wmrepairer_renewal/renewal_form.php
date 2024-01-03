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
                
                <input type="hidden" id="repairer_renewal_id" name="repairer_renewal_id" value="{{repairer_data.repairer_renewal_id}}">
                <input type="hidden" id="repairer_id" name="repairer_id" value="{{repairer_data.repairer_id}}">
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
                            <label>1. Name of the concern seeking the renewal of the license<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_repairmen" name="name_of_repairmen" class="form-control" placeholder="Enter Name of the concern seeking the license !"
                                       maxlength="100" onblur="checkValidation('repairer', 'name_of_repairmen', repairmenNameValidationMessage);" value="{{repairer_data.name_of_repairer}}">
                            </div>
                            <span class="error-message error-message-repairer-name_of_repairmen"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Complete address of the workshop <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="complete_address" name="complete_address" class="form-control" placeholder="Enter Complete address of the workshop !" maxlength="100" onblur="checkValidation('repairer', 'complete_address', workshopAddressValidationMessage);">{{repairer_data.complete_address}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-complete_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Repairer's License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admin_registration_number" name="admin_registration_number" class="form-control" placeholder="Enter Name of the concern seeking the license !"
                                       maxlength="100" value="{{repairer_data.admin_registration_number}}" readonly>
                            </div>
                            <span class="error-message error-message-repairer-admin_registration_number"></span>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Status of the Premises</label>
                            <div class="input-group">
                                <select class="form-control" id="premises_status" name="premises_status"
                                    data-placeholder="Status !" onblur="checkValidation('dealer', 'identity_choice', premisesStatusValidationMessage);">
                                    <option value="">Status of the Premises</option>
                                </select>
                            </div>
                            <span class="error-message error-message-repairer-premises_status"></span>
                        </div>
                        <div class="form-group col-sm-6" id="support_document_container_for_repairer">
                            <label>4. Support Documents<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="support_document_for_repairer" name="support_document_for_repairer"
                                   accept="pdf">
                            <div class="error-message error-message-repairer-support_document_for_repairer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="support_document_name_container_for_repairer" style="display: none;">
                            <label>4. Support Documents<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="support_document_name_image_for_repairer_download" download><label id="support_document_name_image_for_repairer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="Repairer.listview.askForRemove('{{repairer_data.repairer_renewal_id}}',{{VALUE_ONE}});">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of Establishment of workshop/factory<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="establishment_date" id="establishment_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{establishment_date}}" onblur="checkValidation('repairer', 'establishment_date', establishmentDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-repairer-establishment_date"></span>
                        </div>
                    </div> -->
                    <!-- <div class="row">
                        <div class="form-group col-sm-12">
                            <label>6. Are you a Limited (Ltd) Company ?</label>&nbsp;
                            <input type="checkbox" id="is_limited_company" name="is_limited_company" class="checkbox" value="{{is_checked}}">
                            <span class="error-message error-message-shop-is_limited_company"></span>
                        </div>
                    </div> -->
                    <div class="col-xs-12 proprietor_info_div">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">4. Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
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
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Repairer.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of shop/establishment/Municipal Trade License<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="registration_date" id="registration_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{registration_date}}" onblur="checkValidation('repairer', 'registration_date', shopDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-repairer-registration_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Registration Number of shop/establishment/Municipal Trade License<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Registration Number of shop/establishment/Municipal Trade License !"
                                       maxlength="100" onblur="checkValidation('repairer', 'registration_number', shopRegNoValidationMessage);" value="{{repairer_data.registration_number}}">
                            </div>
                            <span class="error-message error-message-repairer-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Select one Identity</label>
                            <div class="input-group"> 
                                <select class="form-control" style="margin-top: 22px;" 
                                    data-placeholder="Status !" name="identity_choice" id="identity_choice" onblur="checkValidation('dealer', 'identity_choice', identityChoiceValidationMessage);">
                                    <option value="">Select one Identity</option>
                                </select>
                            </div>
                            <span class="error-message error-message-repairer-identity_choice"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="identity_number" name="identity_number" class="form-control" placeholder="Enter Vat/Sales Tax Registration Numbers/CST Number/Professional Tax registration Number/It Number !"
                                       maxlength="100" onblur="checkValidation('repairer', 'identity_number', identityNoValidationMessage);" value="{{repairer_data.identity_number}}">
                            </div>
                            <span class="error-message error-message-repairer-identity_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. The type of weights and measures proposed to be repaired<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="weights_type" name="weights_type" class="form-control" placeholder="Enter The type of weights and measures proposed to be repaired !"
                                       maxlength="100" onblur="checkValidation('repairer', 'weights_type', weightTypeValidationMessage);" value="{{repairer_data.weights_type}}">
                            </div>
                            <span class="error-message error-message-repairer-weights_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Do you propose any change<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="propose_change" name="propose_change" class="form-control" placeholder="Enter any change !"
                                       maxlength="100" onblur="checkValidation('repairer', 'propose_change', proposeChangeValidationMessage);" value="{{repairer_data.propose_change}}">
                            </div>
                            <span class="error-message error-message-repairer-propose_change"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Area in which you wish to operate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="area_operate" name="area_operate" class="form-control" placeholder="Enter Area in which you wish to operate !"
                                       maxlength="100" onblur="checkValidation('repairer', 'area_operate', areaOperateValidationMessage);" value="{{repairer_data.area_operate}}">
                            </div>
                            <span class="error-message error-message-repairer-area_operate"></span>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13. Previous experience in the line<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="previous_experience" name="previous_experience" class="form-control" placeholder="Enter Previous experience in the line !"
                                       maxlength="100" onblur="checkValidation('repairer', 'previous_experience', prevexperienceValidationMessage);" value="{{repairer_data.previous_experience}}">
                            </div>
                            <span class="error-message error-message-repairer-previous_experience"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. The number of people employed/proposed to be employed<br/>14.1 Skilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_skilled" name="no_of_skilled" class="form-control" placeholder="Enter Skilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('repairer', 'no_of_skilled', skilledNoValidationMessage);" value="{{repairer_data.no_of_skilled}}">
                            </div>
                            <span class="error-message error-message-repairer-no_of_skilled"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 20px;">14.2 Semi-Skilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_semiskilled" name="no_of_semiskilled" class="form-control" placeholder="Enter Semi Skilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('repairer', 'no_of_semiskilled', semiskilledNoValidationMessage);" value="{{repairer_data.no_of_semiskilled}}">
                            </div>
                            <span class="error-message error-message-repairer-no_of_semiskilled"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14.3 Unskilled<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_unskilled" name="no_of_unskilled" class="form-control" placeholder="Enter Unskilled !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('repairer', 'no_of_unskilled', unskilledNoValidationMessage);" value="{{repairer_data.no_of_unskilled}}">
                            </div>
                            <span class="error-message error-message-repairer-no_of_unskilled"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14.4 Employees trained in the line<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_specialist" name="no_of_specialist" class="form-control" placeholder="Enter Employees trained in the line !" onkeyup="checkNumeric($(this));"
                                       maxlength="100" onblur="checkValidation('repairer', 'no_of_specialist', trainEmpValidationMessage);" value="{{repairer_data.no_of_specialist}}">
                            </div>
                            <span class="error-message error-message-repairer-no_of_specialist"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Details of Qualified Personnel<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_personnel" name="details_of_personnel" class="form-control" placeholder="Enter Details of Qualified Personnel !"
                                       maxlength="100" onblur="checkValidation('repairer', 'details_of_personnel', personnelDetailValidationMessage);">{{repairer_data.details_of_personnel}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-details_of_personnel"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16. Details of machinery/tools/accessories available<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="details_of_machinery" name="details_of_machinery" class="form-control" placeholder="Enter Details of machinery/tools/accessories available !"
                                       maxlength="100" onblur="checkValidation('repairer', 'details_of_machinery', machineryValidationMessage);">{{repairer_data.details_of_machinery}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-details_of_machinery"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>17. Availability of electric energy<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="electric_energy_availability" name="electric_energy_availability" class="form-control" placeholder="Enter Availability of electric energy !"
                                       maxlength="100" onblur="checkValidation('repairer', 'electric_energy_availability', electricEnergyValidationMessage);" value="{{repairer_data.electric_energy_availability}}">
                            </div>
                            <span class="error-message error-message-repairer-electric_energy_availability"></span>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Have you sufficient stock of lone/test weights, etc ?</label>&nbsp;
                            <input type="checkbox" id="sufficient_stock" name="sufficient_stock" class="checkbox" value="{{is_checked}}">
                            <span class="error-message error-message-shop-sufficient_stock"></span>
                        </div>
                        <div class="form-group col-sm-6 stock_details_div" style="display: none;">
                            <label>12.1 Stock Details <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="stock_details" name="stock_details" class="form-control" placeholder="Enter Stock Details !" maxlength="100" onblur="checkValidation('repairer', 'stock_details', stockDetailValidationMessage);">{{repairer_data.stock_details}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-stock_details"></span>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="form-group col-sm-12">
                            <label>19. Have you applied previously for a repairer’s license ?</label>&nbsp;
                            <input type="checkbox" id="any_previous_application" name="any_previous_application" class="checkbox" value="{{is_checked}}">
                            <span class="error-message error-message-shop-any_previous_application"></span>
                        </div>
                    </div>
                    <div class="row any_previous_application_div" style="display: none;">
                        <div class="form-group col-sm-6">
                            <label>19.1 Date Applied On<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="license_application_date" id="license_application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{license_application_date}}" onblur="checkValidation('repairer', 'license_application_date', appliedDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-repairer-license_application_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>19.2 Result of the Application <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="license_application_result" name="license_application_result" class="form-control" placeholder="Enter Result of the Application !" maxlength="100" onblur="checkValidation('repairer', 'license_application_result', licenseResultValidationMessage);">{{repairer_data.license_application_result}}</textarea>
                            </div>
                            <span class="error-message error-message-repairer-license_application_result"></span>
                        </div>
                    </div> -->
                        
                   
                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>To Be Certified by Applicant</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">13. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('repairer', 'declarationone', declarationOneValidationMessage);">&nbsp;Certified that I/We have read the Legal Metrology Act,2009 and the Daman and Diu Legal Metrology (Enforcement) Rules, 2011 and agree to abide by the same and also the same and also the administrative orders and instructions issued or to be issued there under.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">14. &nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('repairer', 'declarationtwo', declarationTwoValidationMessage);">&nbsp;I/We agree to deposit the Scheduled license fees with Government as soon as required to do so by the Licensing Authority.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">15. &nbsp;
                                    <input type="checkbox" class="" name="declarationthree" id="declarationthree" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('repairer', 'declarationthree', declarationThreeValidationMessage);">&nbsp;All the information furnished above is true to the best of my/our knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-repairer-declarationthree"></span>
                        </div>
                    </div>
                    <div class="row">
                        <input type="hidden" id="signature" name="signature" value="{{repairer_data.signature}}">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_repairer">
                            <label>16. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="seal_and_stamp_for_repairer" name="seal_and_stamp_for_repairer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-repairer-seal_and_stamp_for_repairer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_repairer" style="display: none;">
                            <label>16. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="seal_and_stamp_name_image_for_repairer" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="Repairer.listview.askForRemove('{{repairer_data.repairer_renewal_id}}',{{VALUE_TWO}});">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" id="draft_btn_for_repairer_renewal" class="btn btn-sm btn-nic-blue" onclick="Repairer.listview.submitRepairerRenewal({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button>
                        <button type="button" id="submit_btn_for_repairer_renewal" class="btn btn-sm btn-success" onclick="Repairer.listview.askForSubmitRepairerRenewal({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="Repairer.listview.loadRepairerData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>