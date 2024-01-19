<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Sub-Letting for Lessee</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format of Permission for sub-letting lease rights of Government Industrial Plots</div>

            </div>
            <form role="form" id="subletting_form" name="subletting_form" onsubmit="return false;">

                <input type="hidden" id="subletting_id" name="subletting_id" value="{{subletting_id}}">
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
                                       value="{{name_of_applicant}}" disabled="">
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
                            <label>3. State / UT<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="state" name="state" class="form-control" placeholder="State. !"  value="{{state}}" disabled="" >
                            </div>
                            <span class="error-message error-message-subletting-state"></span>
                           
                        </div>
                    
                        <div class="form-group col-sm-6">
                             <label>4. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="district" name="district" class="form-control" placeholder="District. !"  value="{{district}}" disabled="">
                            </div>
                            <span class="error-message error-message-subletting-district"></span>
                           
                        </div>
                    </div>
                         <div class="row">
                        <div class="form-group col-sm-6">
                             <label>5. Taluka<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="taluka" name="taluka" class="form-control" placeholder="Taluka !"
                                       value="{{taluka}}" disabled="">
                            </div>
                            <span class="error-message error-message-subletting-taluka"></span>
                            
                        </div>


                         <div class="form-group col-sm-6">
                            <label>6. Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                           <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                    data-placeholder="Status !" onblur="checkValidation('subletting', 'villages_for_noc_data', villageNameValidationMessage); getPlotData($(this), 'plot_no', 'subletting');" disabled="true">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-villages_for_noc_data"></span>
                            </div>
                        </div>
                   
                    
                      <div class="row">
                    <div class="form-group col-sm-6">
                            <label>7. Plot No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_subletting_data" name="plot_no_for_subletting_data"
                                        data-placeholder="Status !" onchange="checkValidation('subletting', 'plot_no_for_subletting_data', plotnoValidationMessage);
                                    getAreaData($(this));" disabled="">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-subletting-plot_no_for_subletting_data"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square meter<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" readonly="" value="{{govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-subletting-govt_industrial_estate_area"></span>
                        </div>
                    
                    </div>

      <div class="row">
                        <div class="form-group col-sm-6">
                              <label>9. Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" readonly="" value="{{survey_no}}">
                            </div>
                            <span class="error-message error-message-subletting-survey_no"></span>
                        </div>
                           
                    
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring" name="admeasuring" class="form-control" placeholder=" Enter admeasuring in square meter !"  value="{{admeasuring}}" disabled="">
                            </div>
                            <span class="error-message error-message-subletting-admeasuring"></span>
                        </div>
                        </div>
                   
                    <div class="row">
                         <div class="form-group col-sm-6">
                            <label>11. Name of  Manufacturing/Servicing  Establish<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_manufacturing" name="name_of_manufacturing" class="form-control" placeholder="Name of  Manufacturing/Servicing  Establish. ! !"  value="{{name_of_manufacturing}}" disabled="">
                            </div>
                            <span class="error-message error-message-subletting-name_of_manufacturing"></span>
                        </div>


                        <!-- <div class="form-group col-sm-6">
                            <label>11. Name of  Manufacturing/Servicing  Establish <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_manufacturing" name="name_of_manufacturing" class="form-control" placeholder="Name of  Manufacturing/Servicing  Establish. !" value="{{name_of_manufacturing}}" disabled="" >
                            </div>
                            <span class="error-message error-message-subletting-name_of_manufacturing"></span>
                        </div> -->
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Request letter with reason to sub-let the premises. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="request_letter_yes" name="request_letter"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="request_letter_no" name="request_letter" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="request_letter_premises_container_for_subletting">
                            <label>12.1 Request letter of sub-let premises.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="request_letter_premises_name_container_for_subletting" style="display: none;">
                            <label>12.1 Request letter of sub-let premises. <span style="color: red;">* </label><br>
                            <a target="_blank" id="request_letter_premises_download"><label id="request_letter_premises_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>13. Original 7 X 12 extract. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="original_extract_yes" name="original_extract"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="original_extract_no" name="original_extract" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="original_extract_certificate_container_for_subletting">
                            <label>13.1 Original 7 X 12 extract.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="original_extract_certificate_name_container_for_subletting" style="display: none;">
                            <label>13.1 Original 7 X 12 extract. <span style="color: red;">* </label><br>
                            <a target="_blank" id="original_extract_certificate_download"><label id="original_extract_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. No Due Certificate from Mamlatdar/Patel Talati regarding land revenue. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="land_revenue_yes" name="land_revenue"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="land_revenue_no" name="land_revenue" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="land_revenue_certificate_container_for_subletting">
                            <label>14.1 No Due Certificate regarding land revenue.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="land_revenue_certificate_name_container_for_subletting" style="display: none;">
                            <label>14.1 No Due Certificate regarding land revenue. <span style="color: red;">* </label><br>
                            <a target="_blank" id="land_revenue_certificate_download"><label id="land_revenue_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>15. No Due Certificate from Electricity Department/last bill paid copy. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="electricity_bill_yes" name="electricity_bill"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="electricity_bill_no" name="electricity_bill" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="electricity_bill_certificate_container_for_subletting">
                            <label>15.1 No Due Certificate from Electricity Department.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="electricity_bill_certificate_name_container_for_subletting" style="display: none;">
                            <label>15.1 No Due Certificate from Electricity Department. <span style="color: red;">* </label><br>
                            <a target="_blank" id="electricity_bill_certificate_download"><label id="electricity_bill_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>16. No Dues Certificate from Banks/Financial Institution/Bank regarding loan. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="bank_loan_yes" name="bank_loan"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="bank_loan_no" name="bank_loan" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="bank_loan_certificate_container_for_subletting">
                            <label>16.1 No Dues Certificate from Banks regarding loan.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="bank_loan_certificate_name_container_for_subletting" style="display: none;">
                            <label>16.1 No Dues Certificate from Banks regarding loan. <span style="color: red;">* </label><br>
                            <a target="_blank" id="bank_loan_certificate_download"><label id="bank_loan_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>17. Panchayat tax receipt/No Dues Certificate from group Gram Panchayat/Municipality   regarding panchayat tax. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="panchayat_tax_yes" name="panchayat_tax"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="panchayat_tax_no" name="panchayat_tax" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="panchayat_tax_certificate_container_for_subletting">
                            <label>17.1 No Dues Certificate from group Gram Panchayat regarding panchayat tax.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="panchayat_tax_certificate_name_container_for_subletting" style="display: none;">
                            <label>17.1 No Dues Certificate from group Gram Panchayat regarding panchayat tax. <span style="color: red;">* </label><br>
                            <a target="_blank" id="panchayat_tax_certificate_download"><label id="panchayat_tax_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>18. Challan of lease rent from Lessee. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="challan_of_lease_yes" name="challan_of_lease"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="challan_of_lease_no" name="challan_of_lease" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="challan_of_lease_rent_container_for_subletting">
                            <label>18.1 Challan of lease.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="challan_of_lease_rent_name_container_for_subletting" style="display: none;">
                            <label>18.1 Challan of lease. <span style="color: red;">* </label><br>
                            <a target="_blank" id="challan_of_lease_rent_download"><label id="challan_of_lease_rent_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-12">
                            <label>19. Occupancy Certificate, if there is factory building. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="occupancy_yes" name="occupancy"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="occupancy_no" name="occupancy" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="occupancy_certificate_container_for_subletting">
                            <label>19.1 Occupancy Certificate.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="occupancy_certificate_name_container_for_subletting" style="display: none;">
                            <label>19.1 Occupancy Certificate. <span style="color: red;">* </label><br>
                            <a target="_blank" id="occupancy_certificate_download"><label id="occupancy_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. No Due Certificate from P.C.C., VAT, C.I.F. & B. and Central Excise. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="central_excise_yes" name="central_excise"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="central_excise_no" name="central_excise" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="central_excise_certificate_container_for_subletting">
                            <label>20.1 No Due Certificate from Central Excise.
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-subletting-application_form_for_subletting"></div>
                        </div>
                        <div class="form-group col-sm-12" id="central_excise_certificate_name_container_for_subletting" style="display: none;">
                            <label>20.1 No Due Certificate from Central Excise.<span style="color: red;">* </label><br>
                            <a target="_blank" id="central_excise_certificate_download"><label id="central_excise_certificate_name_image_for_subletting" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                          <div class="row">
                        <div class="form-group col-sm-12">
                            <label>21. Valid authorization to sign on behalf of Lessee.  <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="authorization_sign_yes" name="authorization_sign"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="authorization_sign_no" name="authorization_sign" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="authorization_sign_lessee_container_for_subletting">
                            <label>21.1  Sign on behalf of Lessee. 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="authorization_sign_lessee_name_container_for_subletting" style="display: none;">
                            <label>21.1  Sign on behalf of Lessee. <span style="color: red;">* </label><br>
                            <a target="_blank" id="authorization_sign_lessee_download">
                                <img id="authorization_sign_lessee_name_image_for_subletting" style="width: 250px; height: 250px; border: 2px solid blue;">
                        </div>
                    </div>
                   <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_subletting_view">
                            <label>22. Signature <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_subletting_view" style="display: none;">
                            <label>22. Signature <span style="color: red;">*</label><br>
                            <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_subletting_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Subletting.listview.loadSublettingData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>