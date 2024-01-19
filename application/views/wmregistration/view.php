<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <!-- <h3 class="card-title" style="float: none; text-align: center;">Weight and Measure Form </h3> -->
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Manufacturer/Packer/Importer, <br>Registration as per Rule Standard of Weight and Measures (P.C) <br> Rule,2011 U/s. 27</div>
            </div>
            <form role="form" id="wmregistration_form" name="wmregistration_form" onsubmit="return false;">

                <input type="hidden" id="wmregistration_id" name="wmregistration_id" value="{{wmregistration_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To<br>
                            The Assistant Controller,<br>
                            Department of Legal Metrology,<br>
                            (Weights & Measures)<br>
                            Daman & Diu,
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
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('wmregistration', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-wmregistration-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('wmregistration', 'name_of_applicant', applicantNameValidationMessage);" value="{{name_of_applicant}}" readonly>
                            </div>
                            <span class="error-message error-message-wmregistration-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Complete Address of Registered Office <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="location_of_factory" name="location_of_factory" class="form-control" placeholder="Enter Complete Address of Registered Office !" maxlength="100" onblur="checkValidation('wmregistration', 'location_of_factory', completeAddressValidationMessage);" readonly>{{location_of_factory}}</textarea>
                            </div>
                            <span class="error-message error-message-wmregistration-location_of_factory"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Complete Address of Manufacturing/Packing/Importing Premises <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="branches" name="branches" class="form-control" placeholder="Enter Complete Address of Manufacturing/Packing/Importing Premises !" maxlength="100" onblur="checkValidation('wmregistration', 'branches', branchValidationMessage);" readonly>{{branches}}</textarea>
                            </div>
                            <span class="error-message error-message-wmregistration-branches"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Item to be Manufactured/Packed/Imported</label>
                            <div class="input-group">
                                <select class="form-control" id="application_category" name="application_category"
                                    data-placeholder="Status !" onblur="checkValidation('wmregistration', 'application_category', applicantCategoryValidationMessage);" disabled>
                                    <option>Item to be Manufactured/Packed/Imported</option>
                                    <option value="Manufactured">Manufactured</option>
                                    <option value="Packed">Packed</option>
                                    <option value="Imported">Imported</option>
                                </select>
                            </div>
                            <span class="error-message error-message-wmregistration-application_category"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Item Detail<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="item_detail" name="item_detail" class="form-control" placeholder="Enter Item Detail !"
                                       maxlength="100" onblur="checkValidation('wmregistration', 'item_detail', itemDetailValidationMessage);" readonly>{{item_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-wmregistration-item_detail"></span>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">7. Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company</span>
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
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Wmregistration.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <h6 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h6>
                    <br/>
                    <div class="row">
                        <div class="form-group col-sm-12" id="trade_licence_container_for_wmregistration">
                            <label>8. Trade Licence.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="trade_licence_for_wmregistration" name="trade_licence_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-trade_licence_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="trade_licence_name_container_for_wmregistration" style="display: none;">
                            <label>8.1 Trade Licence.<span style="color: red;">*<br></span></label><br>
                            <a id="trade_licence_download" target="_blank"><label id="trade_licence_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-12" id="proof_of_ownership_container_for_wmregistration">
                            <label>9. Proof of ownership of business premises/ Rent agreement.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="proof_of_ownership_for_wmregistration" name="proof_of_ownership_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-proof_of_ownership_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="proof_of_ownership_name_container_for_wmregistration" style="display: none;">
                            <label>9.1 Proof of ownership of business premises/ Rent agreement.<span style="color: red;">*<br></span></label><br>
                            <a id="proof_of_ownership_download" target="_blank"><label id="proof_of_ownership_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="gst_certificate_container_for_wmregistration">
                            <label>10. GST Certificate.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="gst_certificate_for_wmregistration" name="gst_certificat_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-gst_certificate_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="gst_certificate_name_container_for_wmregistration" style="display: none;">
                            <label>10.1 GST Certificate.<span style="color: red;">*<br></span></label><br>
                            <a id="gst_certificate_download" target="_blank"><label id="gst_certificate_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="partnership_deed_container_for_wmregistration">
                            <label>11.1 Partnership deed <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="partnership_deed_for_wmregistration" name="partnership_deed_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-partnership_deed_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="partnership_deed_name_container_for_wmregistration" style="display: none;">
                            <label>11.1 Partnership deed .<span style="color: red;">*<br></span></label><br>
                            <a id="partnership_deed_download" target="_blank"><label id="partnership_deed_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="memorandum_articles_container_for_wmregistration">
                            <label>12. Memorandum & Articles of Association ( If operating a Private / Limited )<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="memorandum_articles_for_wmregistration" name="memorandum_articles_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-memorandum_articles_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="memorandum_articles_name_container_for_wmregistration" style="display: none;">
                            <label>12.1 Memorandum & Articles of Association ( If operating a Private / Limited )<span style="color: red;">*<br></span></label><br>
                            <a id="memorandum_articles_download" target="_blank"><label id="memorandum_articles_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                  <div class="row">
                        <div class="form-group col-sm-12" id="item_to_be_packed_container_for_wmregistration">
                            <label>13. List of items to be packed in different packing size.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="item_to_be_packed_for_wmregistration" name="item_to_be_packed_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-item_to_be_packed_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="item_to_be_packed_name_container_for_wmregistration" style="display: none;">
                            <label>13.1 List of items to be packed in different packing size.<span style="color: red;">*<br></span></label><br>
                            <a id="item_to_be_packed_download" target="_blank"><label id="item_to_be_packed_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="list_of_directors_container_for_wmregistration">
                            <label>14. List of Directors/ Partners of the company as amended time to time.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="list_of_directors_for_wmregistration" name="list_of_directors_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-list_of_directors_for_wmregistration"></div>
                        </div>

                     <div class="form-group col-sm-12" id="list_of_directors_name_container_for_wmregistration" style="display: none;">
                            <label>14.1 List of Directors/ Partners of the company as amended time to time.<span style="color: red;">*<br></span></label><br>
                            <a id="list_of_directors_download" target="_blank"><label id="list_of_directors_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="code_certificate_container_for_wmregistration">
                            <label>15. Export/Import Code Certificate ( In case of Importer) .<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="code_certificate_for_wmregistration" name="code_certificate_for_wmregistration"
                                   accept="image/pdf">
                             <div class="error-message error-message-wmregistration-code_certificate_for_wmregistration"></div>
                        </div>

                      <div class="form-group col-sm-12" id="code_certificate_name_container_for_wmregistration" style="display: none;">
                            <label>15.1 Export/Import Code Certificate ( In case of Importer) .<span style="color: red;">*<br></span></label><br>
                            <a id="code_certificate_download" target="_blank"><label id="code_certificate_name_image_for_wmregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                     </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>Declaration</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">16.&nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('wmregistration', 'declarationone', declarationOneValidationMessage);" disabled>&nbsp;I/We of the Applicant/Authorized Person have read The Legal Metrology Act, 2009 and The Legal Metrology(Packaged Commodities) Rules,2011 and agree to abide by the same and also declare that the packages package manufactured /prepack/imported will complied the various provisions of the Legal Metrology ( Package Commodity ) Rules 2011.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-wmregistration-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">17.&nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('wmregistration', 'declarationtwo', declarationTwoValidationMessage);" disabled>&nbsp;I/we also state that the contents given in the application are true and correct to the best of my/our knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-wmregistration-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">18.&nbsp;
                                    <input type="checkbox" class="" name="declarationthree" id="declarationthree" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('wmregistration', 'declarationthree', declarationThreeValidationMessage);" disabled>&nbsp;Fees of Rs. 500/- for registration of manufacturer/packer/importer of prepackaged commodities is enclosed.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-wmregistration-declarationthree"></span>
                        </div>
                    </div>
                <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_wmregistration">
                            <label>19. Signature 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_wmregistration" style="display: none;">
                            <label>19. Signature <span style="color: red;">*<br></span></label><br>
                            <a id="seal_and_stamp_download" target="_blank">
                                <img id="seal_and_stamp_name_image_for_wmregistration" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                     <hr class="m-b-1rem">

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('wmregistration');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>