<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Partnership Firms </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Partnership Firms Form Registration</div>
            </div>
            <form role="form" id="psfregistration_form" name="psfregistration_form" onsubmit="return false;">
                
                <input type="hidden" id="psfregistration_id" name="psfregistration_id" value="{{psfregistration_data.psfregistration_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Registrar of Firm, <br>
                            Department of Civil Registrar - Cum - Sub - Registrar,<br>
                            Daman.
                        </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;">
                            </select>
                            </div>
                            <span class="error-message error-message-psfregistration-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('psfregistration', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-psfregistration-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Firm Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="firm_name" name="firm_name" class="form-control" placeholder="Enter Name Of the Firm !" maxlength="50" onblur="checkValidation('psfregistration', 'firm_name', firmNameValidationMessage);" value="{{psfregistration_data.firm_name}}">
                            </div>
                            <span class="error-message error-message-psfregistration-firm_name"></span>
                        </div>
                        
                        <div class="form-group col-sm-6">
                            <label>3. Email<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter Email !"
                                       maxlength="50" onkeypress="emailIdValidation($(this));" onblur="checkValidationForEmail('psfregistration', 'email', emailValidationMessage);"  value="{{psfregistration_data.email}}">
                            </div>
                            <span class="error-message error-message-psfregistration-email"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Complete Address of Principal place of Business <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="principal_address" name="principal_address" class="form-control" placeholder="Enter Complete Address of Registered Business Place !" maxlength="100" onblur="checkValidation('psfregistration', 'principal_address', principaladdressValidationMessage);">{{psfregistration_data.principal_address}}</textarea>
                            </div>
                            <span class="error-message error-message-psfregistration-principal_address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Duration of The Firm<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="firm_duration" name="firm_duration" class="form-control" value="{{AT_WILL}}" readonly="">
                            </div>
                            <span class="error-message error-message-psfregistration-firm_duration"></span>
                        </div>
                        
                    </div>



                     <div class="row">
                         <div class="form-group col-sm-12">
                                <label>6. Do you want to add any other places Where the firm carries on Business ?</label>&nbsp;
                                <input type="checkbox" id="import_from_outside" name="import_from_outside" class="checkbox" value="{{is_checked}}">
                                <span class="error-message error-message-shop-import_from_outside"></span>
                        </div><br>
                    

                        <div class="form-group col-sm-12 import_from_outside_div" style="display: none;">
                            <label>6.1 Complete Address of The names of any other places Where the firm carries on Business.<span class="color-nic-red"></span></label>
                                <textarea id="other_address" name="other_address" class="form-control" placeholder="Enter Complete Address of Other Business Place !" maxlength="100" onblur="checkValidation('psfregistration', 'other_address', otheraddressValidationMessage);">{{psfregistration_data.other_address}}</textarea>
                            
                            <span class="error-message error-message-psfregistration-other_address"></span>
                        </div>
                      
                    </div>

                   
                    <div class="row">


                      <div class="form-group col-sm-12" id="application_of_firm_container_for_psfregistration">
                            <label>7. Application on company's Letter head with rubber stamp <span style="color: red;"> (Maximum File Size: 1MB)</span></label><br>
                            <input type="file" id="apploication_of_firm_for_psfregistration" name="apploication_of_firm_for_psfregistration"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-psfregistration-apploication_of_firm_for_psfregistration"></div>
                        </div>
                        <div class="form-group col-sm-12" id="application_of_firm_name_container" style="display: none;">
                            <label>7. Application on company's Letter head with rubber stamp <span style="color: red;"></span></label><br>
                            <a id="application_of_firm_name_download" target="_blank"><label id="apploication_of_firm_name_image" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                   
                        <div class="col-6 m-b-5px" id="formII_of_firm_container_for_psfregistration">
                            <label>8. FORM NO.II</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="formII_of_firm_name_container_for_psfregistration" style="display: none;">
                            <label>8. FORM NO.II</label><br>
                            <a id="formII_of_firm_name_download" target="_blank"><label id="formII_of_firm_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6 m-b-5px" id="partnershipdeed_of_firm_container_for_psfregistration">
                            <label>9. Attached Partnership Deed which shall be registed by Sub Register Office.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="partnershipdeed_of_firm_name_container_for_psfregistration" style="display: none;">
                            <label>9. Attached Partnership Deed which shall be registed by Sub Register Office.</label><br>
                             <a id="partnershipdeed_of_firm_name_download" target="_blank"><label id="partnershipdeed_of_firm_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                         <div class="form-group col-sm-12">
                            
                                <label>10. Do you want to upload Aadhar Card of all Parties ?</label>&nbsp;
                                <input type="checkbox" id="aadharcard_all_parties" name="aadharcard_all_parties" class="checkbox" value="{{is_checked}}" disabled="">
                                <span class="error-message error-message-shop-aadharcard_all_parties"></span>
                           
                        
                    <div class="row aadharcard_all_parties_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="aadharcard_of_firm_container_for_psfregistration">
                            <label>10.1 Aadhar Card of all Parties.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="aadharcard_of_firm_name_container_for_psfregistration" style="display: none;">
                            <label>10.1 Aadhar Card of all Parties.</label><br>
                            <a id="aadharcard_of_firm_name_download" target="_blank"><label id="aadharcard_of_firm_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>11. Do you want to upload Pancard of all Parties ?</label>&nbsp;
                                <input type="checkbox" id="pancard_all_parties" name="pancard_all_parties" class="checkbox" value="{{is_checked}}" disabled>
                                <span class="error-message error-message-shop-pancard_all_parties"></span>
                           
                        
                    <div class="row pancard_all_parties_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="pancard_of_firm_container_for_psfregistration">
                            <label>11.1 Pancard of all Parties.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="pancard_of_firm_name_container_for_psfregistration" style="display: none;">
                            <label>11.1 Pancard of all Parties.</label><br>
                             <a id="pancard_of_firm_name_download" target="_blank"><label id="pancard_of_firm_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-sm-12">
                            
                                <label>12. Do you want to upload alteration in the name of the firm or in the principal place of business there of the firm ?</label>&nbsp;
                                <input type="checkbox" id="alteration_name_firm" name="alteration_name_firm" class="checkbox" value="{{is_checked}}" disabled>
                                <span class="error-message error-message-shop-alteration_name_firm"></span>
                           
                        
                    <div class=" alteration_name_firm_div" style="display: none;">

                        <div class="form-group col-sm-12" id="alteration_name_firm_doc_container_for_psfregistration">
                            <label>12.1 Upload Alteration Form.</label><br>
                            <input type="file" id="alteration_name_firm_doc_for_psfregistration" name="alteration_name_firm_doc_for_psfregistration"
                                   accept="image/pdf">
                            <div class="error-message error-message-psfregistration-alteration_name_firm_doc_for_psfregistration"></div>
                        </div>
                        <div class="form-group col-sm-12" id="alteration_name_firm_doc_name_container_for_psfregistration" style="display: none;">
                            <label>12.1 Upload Alteration Form. </label><br>
                            <a id="alteration_name_firm_doc_name_download" target="_blank"><label id="alteration_name_firm_doc_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            
                        </div>
                       </div>
                     </div>
                </div>
                   <div class="form-group col-sm-12">
                                <label>13. Do you want to upload Admission / Retirement Forms ?</label>&nbsp;
                                <input type="checkbox" id="import_from_outside_ret" name="import_from_outside_ret" class="checkbox" value="{{is_checked}}" disabled>
                                <span class="error-message error-message-shop-import_from_outside_ret"></span>
                    
                    <div class=" import_from_outside_ret_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="retirement_of_firm_container_for_psfregistration">
                            <label>13.1 Admission / Retirement Form.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="retirement_of_firm_name_container_for_psfregistration" style="display: none;">
                            <label>13.1 Admission / Retirement Form.</label><br>
                            <a id="retirement_of_firm_name_download" target="_blank"><label id="retirement_of_firm_name_image_for_psfregistration" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     </div>
                 </div> 

                 <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_psfregistration">
                            <label>14. Signature <span style="color: red;"> (Maximum File Size: 2MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-6" id="seal_and_stamp_name_container_for_psfregistration" style="display: none;">
                            <label>14. Signature <span style="color: red;"></label><br>
                            <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_psfregistration" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>


                    <div class="form-group"><!-- 
                        <button type="button" id="draft_btn_for_wmregistration" class="btn btn-sm btn-nic-blue" onclick="Wmregistration.listview.submitWmregistration({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button> -->
                        <button type="button" id="submit_btn_for_psfregistration" class="btn btn-sm btn-success" onclick="Psfregistration.listview.submitPsfregistration({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('psfregistration');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>