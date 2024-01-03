<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                 <h3 class="card-title" style="float: none; text-align: center;">Sub-Letting for Lessee </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format of Permission for Sub-Letting lease rights of Government Industrial Plots</div>

            </div>
            <form role="form" id="subletting_form" name="subletting_form" onsubmit="return false;">

                <input type="hidden" id="subletting_id" name="subletting_id" value="{{subletting_data.subletting_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The General Manager,<br>
                            District Industries Centre,<br>
                            DNH&DD,<br>
                            Silvassa.

                        </div>
                    </div>
 <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of Sub-letting Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('subletting', 'name_of_applicant', applicantNameValidationMessage);" value="{{subletting_data.name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-subletting-name_of_applicant"></span>
                        </div>

                     <div class="form-group col-sm-6">

                           <label>2. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" class= "form-control" placeholder="dd-mm-yyyy"
                                       value="{{application_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-subletting-application_date"></span>
                        </div>
                    </div>

                     
                         <div class="row">
                          <div class="form-group col-sm-6">
                            <label>3. State / UT</label>
                            <div class="input-group">
                                <select class="form-control" id="state" name="state"
                                    data-placeholder="Status !" onblur="checkValidation('subletting', 'state', stateValidationMessage);">
                                    <option value="">Select State</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                </select>
                            </div>
                            <span class="error-message error-message-subletting-state"></span>
                        </div>
                    

                             <div class="form-group col-sm-6">
                             <label>4. District</label>
                            <div class="input-group">
                                <select class="form-control" id="district" name="district"
                                    data-placeholder="District !" onblur="checkValidation('subletting', 'district', districtValidationMessage);">
                                    <option value="">Select District</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli </option>
                                </select>
                            </div>
                            <span class="error-message error-message-subletting-district"></span>   
                    </div>
                </div>
                         <div class="row">
                       <div class="form-group col-sm-6">
                         <label>5. Taluka</label>
                            <div class="input-group">
                                <select class="form-control" id="taluka" name="taluka"
                                    data-placeholder="Taluka !" onblur="checkValidation('subletting', 'taluka', talukaValidationMessage);">
                                    <option value="">Select Taluka</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli </option>
                                </select>
                                 </div>
                        <span class="error-message error-message-subletting-taluka"></span>
                        </div>
                         <div class="form-group col-sm-6">
                            <label>6. Villages<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('subletting', 'villages_for_noc_data', villageNameValidationMessage);
                                    getPlotData($(this), 'plot_no', 'subletting_data');">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-subletting-villages_for_noc_data"></span>
                        </div>
                    </div>
                    
                          <div class="row">
                        <div class="form-group col-sm-6">
                           <label>7. Plot No.<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_subletting_data" name="plot_no_for_subletting_data"
                                        data-placeholder="Status !" onchange="checkValidation('subletting', 'plot_no_for_subletting_data', plotnoValidationMessage);
                                    getAreaData($(this));">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-subletting-plot_no_for_subletting_data"></span>
                        </div>
                    
                        <div class="form-group col-sm-6">
                         
                        
                             <label>8. Admeasuring in square meter<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" placeholder="Enter  Government Industrial Estate Area!"  maxlength="100" value="{{subletting_data.govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-subletting-govt_industrial_estate_area"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                             <label>9. Survey No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"
                                       maxlength="100" onblur="checkValidation('subletting', 'survey_no', surveynoValidationMessage);" value="{{subletting_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-subletting-survey_no"></span>
                            
                        </div>
                    
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring" name="admeasuring" class="form-control" placeholder=" Enter admeasuring in square meter !" maxlength="100" value="{{subletting_data.admeasuring}}" onblur="checkValidation('subletting', 'admeasuring', admeasuringValidationMessage);">
                            </div>
                            <span class="error-message error-message-subletting-admeasuring"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Name of  Manufacturing/Servicing  Establish <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_manufacturing" name="name_of_manufacturing" class="form-control" placeholder="Name of  Manufacturing/Servicing  Establish. !" maxlength="100" value="{{subletting_data.name_of_manufacturing}}" onblur="checkValidation('subletting', 'name_of_manufacturing', nameofmanufactringValidationMessage);">
                            </div>
                            <span class="error-message error-message-subletting-name_of_manufacturing"></span>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Request letter with reason to sub-let the premises. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="request_letter_yes" name="request_letter"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="request_letter_no" name="request_letter"   value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-request_letter"></span>
                        </div>
                        
                        <div class=" request_letter_div" style="display: none;">
                            <div class="form-group col-sm-12" id="request_letter_premises_container_for_subletting">
                                <label>12.1 Request letter of sub-let premises.<span style="color: red;"><br></span></label><br>
                                    <input type="file" id="request_letter_premises_for_subletting" name="request_letter_premises_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-request_letter_premises_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="request_letter_premises_name_container_for_subletting" style="display: none;">
                                <label>12.1 Request letter of sub-let premises.<span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="request_letter_premises_download" target="_blank"><label id="request_letter_premises_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>13. Original 7 X 12 extract.  <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="original_extract_yes" name="original_extract"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="original_extract_no" name="original_extract"   value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-original_extract"></span>
                        </div>
                        
                        <div class=" original_extract_div" style="display: none;">
                            <div class="form-group col-sm-12" id="original_extract_certificate_container_for_subletting">
                                <label>13.1 Original 7 X 12 extract. <span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="original_extract_certificate_for_subletting" name="original_extract_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-original_extract_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="original_extract_certificate_name_container_for_subletting" style="display: none;">
                                <label>13.1 Original 7 X 12 extract.  <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="original_extract_certificate_download" target="_blank"><label id="original_extract_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. No Due Certificate from Mamlatdar/Patel Talati regarding land revenue.  <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="land_revenue_yes" name="land_revenue"  o value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="land_revenue_no" name="land_revenue"  o value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-land_revenue"></span>
                        </div>
                        
                        <div class=" land_revenue_div" style="display: none;">
                            <div class="form-group col-sm-12" id="land_revenue_certificate_container_for_subletting">
                                <label>14.1 No Due Certificate regarding land revenue.<span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="land_revenue_certificate_for_subletting" name="land_revenue_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-land_revenue_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="land_revenue_certificate_name_container_for_subletting" style="display: none;">
                                <label>14.1 No Due Certificate regarding land revenue. <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="land_revenue_certificate_download" target="_blank"><label id="land_revenue_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>15. No Due Certificate from Electricity Department/last bill paid copy. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="electricity_bill_yes" name="electricity_bill"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="electricity_bill_no" name="electricity_bill"   value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-electricity_bill"></span>
                        </div>
                        
                        <div class=" electricity_bill_div" style="display: none;">
                            <div class="form-group col-sm-12" id="electricity_bill_certificate_container_for_subletting">
                                <label>15.1 No Due Certificate from Electricity Department. <span style="color: red;"><br></span></label><br>
                                    <input type="file" id="electricity_bill_certificate_for_subletting" name="electricity_bill_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-electricity_bill_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="electricity_bill_certificate_name_container_for_subletting" style="display: none;">
                                <label>15.1 No Due Certificate from Electricity Department.  <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="electricity_bill_certificate_download" target="_blank"><label id="electricity_bill_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>16. No Dues Certificate from Banks/Financial Institution/Bank regarding loan. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="bank_loan_yes" name="bank_loan" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="bank_loan_no" name="bank_loan"  value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-bank_loan"></span>
                        </div>
                        
                        <div class=" bank_loan_div" style="display: none;">
                            <div class="form-group col-sm-12" id="bank_loan_certificate_container_for_subletting">
                                <label>16.1 No Dues Certificate from Banks regarding loan.<span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="bank_loan_certificate_for_subletting" name="bank_loan_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-bank_loan_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="bank_loan_certificate_name_container_for_subletting" style="display: none;">
                                <label>16.1 No Dues Certificate from Banks regarding loan. <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="bank_loan_certificate_download" target="_blank"><label id="bank_loan_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>17. Panchayat tax receipt/No Dues Certificate from group Gram Panchayat/Municipality   regarding panchayat tax. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="panchayat_tax_yes" name="panchayat_tax"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="panchayat_tax_no" name="panchayat_tax"  value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-panchayat_tax"></span>
                        </div>
                        
                        <div class=" panchayat_tax_div" style="display: none;">
                            <div class="form-group col-sm-12" id="panchayat_tax_certificate_container_for_subletting">
                                <label>17.1 No Dues Certificate from group Gram Panchayat regarding panchayat tax.<span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="panchayat_tax_certificate_for_subletting" name="panchayat_tax_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-panchayat_tax_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="panchayat_tax_certificate_name_container_for_subletting" style="display: none;">
                                <label>17.1 No Dues Certificate from group Gram Panchayat regarding panchayat tax.. <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="panchayat_tax_certificate_download" target="_blank"><label id="panchayat_tax_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>18. Challan of lease rent from Lessee. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="challan_of_lease_yes" name="challan_of_lease"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="challan_of_lease_no" name="challan_of_lease"    value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-challan_of_lease"></span>
                        </div>
                        
                        <div class=" challan_of_lease_div" style="display: none;">
                            <div class="form-group col-sm-12" id="challan_of_lease_rent_container_for_subletting">
                                <label>18.1 Challan of lease. <span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="challan_of_lease_rent_for_subletting" name="challan_of_lease_rent_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-challan_of_lease_rent_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="challan_of_lease_rent_name_container_for_subletting" style="display: none;">
                                <label>18.1 Challan of lease.  <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="challan_of_lease_rent_download" target="_blank"><label id="challan_of_lease_rent_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>19.  Occupancy Certificate, if there is factory building.. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="occupancy_yes" name="occpancy"  value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="occupancy_no" name="occupancy"  value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-occupancy"></span>
                        </div>
                        
                     <div class=" occupancy_div" style="display: none;">
                            <div class="form-group col-sm-12" id="occupancy_certificate_container_for_subletting">
                                <label>19.1  Occupancy Certificate.<span style="color: red;"><br></span></label><br>
                                    <input type="file" id="occupancy_certificate_for_subletting" name="occupancy_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-occupancy_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="occupancy_certificate_name_container_for_subletting" style="display: none;">
                                <label>19.1  Occupancy Certificate. <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="occupancy_certificate_download" target="_blank"><label id="occupancy_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. No Due Certificate from P.C.C., VAT, C.I.F. & B. and Central Excise. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="central_excise_yes" name="central_excise"   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="central_excise_no" name="central_excise"   value="{{IS_CHECKED_NO}}">  No &emsp;
                                <br><span class="error-message error-message-subletting-central_excise"></span>
                        </div>
                        
                        <div class=" central_excise_div" style="display: none;">
                            <div class="form-group col-sm-12" id="central_excise_certificate_container_for_subletting">
                                <label>20.1 No Due Certificate from Central Excise.<span style="color: red;"><br> </span></label><br>
                                    <input type="file" id="central_excise_certificate_for_subletting" name="central_excise_certificate_for_subletting"
                                   accept="image/pdf">
                                <div class="error-message error-message-subletting-central_excise_certificate_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="central_excise_certificate_name_container_for_subletting" style="display: none;">
                                <label>20.1 No Due Certificate from Central Excise. <span style="color: red;"><br> <span style="color: red;"></span></label><br>
                                    <a id="central_excise_certificate_download" target="_blank"><label id="central_excise_certificate_name_image_for_subletting" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                       </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>21. Valid authorization to sign on behalf of Lessee. <span style="color: red;">* </span>&emsp;</label>
                                <input type="radio" id="authorization_sign_yes" name="authorization_sign"  
                                    onblur="checkValidation('subletting', 'authorization_sign', authorizationsignValidationMessage);" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                                <input type="radio" id="authorization_sign_no" name="authorization_sign" 
                                   onblur="checkValidation('subletting', 'authorization_sign', authorizationsignValidationMessage);" value="{{IS_CHECKED_NO}}"> No
                                <br><span class="error-message error-message-subletting-authorization_sign"></span>
                        </div>
                        <div class=" authorization_sign_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="authorization_sign_lessee_container_for_subletting">
                                <label>21.1  Sign on behalf of Lessee. <span style="color: red;">* </span></label><br>
                                    <input type="file" id="authorization_sign_lessee_for_subletting" name="authorization_sign_lessee_for_subletting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                                <div class="error-message error-message-subletting-authorization_sign_lessee_for_subletting"></div>
                            </div>
                            <div class="form-group col-sm-12" id="authorization_sign_lessee_name_container_for_subletting" style="display: none;">
                                <label>21.1  Sign on behalf of Lessee.  <span style="color: red;">* </label><br>
                                    <a target="_blank" id="authorization_sign_lessee_download"><img id="authorization_sign_lessee_name_image_for_subletting" style="width: 250px; height: 250px; border: 2px solid blue;"></a>

                             </div>
                        </div>     
                    </div>

            
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_subletting">
                            <label>22. Signature<span style="color: red;">*</span></label><br>
                            <input type="file" id="seal_and_stamp_for_subletting" name="seal_and_stamp_for_subletting"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-subletting-seal_and_stamp_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_subletting" style="display: none;">
                            <label>Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_subletting" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                                                  </div>
                    </div>
                     <hr class="m-b-1rem"> 

                   <div class="form-group">
                        <button type="button" id="submit_btn_for_wmregistration" class="btn btn-sm btn-success" onclick="Subletting.listview.submitSubletting({{VALUE_TWO}});" style="margin-right: 5px;">Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('subletting');">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>