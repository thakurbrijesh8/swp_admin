<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Seller of Plot for Lease</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Permission of Sale/Transfer(Seller) of Lease rights of Government Industrial Plot</div>
            </div>
            <form role="form" id="transfer_form" name="transfer_form" onsubmit="return false;">
                
                <input type="hidden" id="transfer_id" name="transfer_id" value="{{transfer_id}}">
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
                            <label>1. Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" value="{{name_of_applicant}}" readonly="">
                            </div>
                            <span class="error-message error-message-seller-name_of_applicant"></span>
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
                            <span class="error-message error-message-seller-application_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. State<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="state" name="state" class="form-control" readonly="" value="{{state}}">
                            </div>
                            <span class="error-message error-message-seller-state"></span>
                        </div>
                    <div class="form-group col-sm-6">
                            <label>4. District<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="district" name="district" class="form-control" readonly="" value="{{district}}">
                            </div>
                            <span class="error-message error-message-seller-district"></span>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Taluka<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="taluka" name="taluka" class="form-control" readonly="" value="{{taluka}}">
                            </div>
                            <span class="error-message error-message-seller-taluka"></span>
                        </div>
                    <div class="form-group col-sm-6">
                            <label>6. Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('seller', 'villages_for_noc_data', villageValidationMessage);
                                    getPlotData($(this), 'plot_no', 'seller_data');" disabled="">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-seller-villages_for_noc_data"></span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                            <label>7. Plot No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select class="form-control" id="plot_no_for_seller_data" name="plot_no_for_seller_data"
                                        data-placeholder="Status !" onchange="checkValidation('seller', 'plot_no_for_seller_data', plotnoValidationMessage);
                                    getAreaData($(this));" disabled="">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-seller-plot_no_for_seller_data"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square metre<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" readonly="" value="{{govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-seller-govt_industrial_estate_area"></span>
                        </div>
                    
                    </div>
                   
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" readonly="" value="{{survey_no}}">
                            </div>
                            <span class="error-message error-message-seller-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring_square_metre" name="admeasuring_square_metre" class="form-control" readonly="" value="{{admeasuring_square_metre}}">
                            </div>
                            <span class="error-message error-message-seller-admeasuring_square_metre"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Reason Of Leased Sale/Transfer/Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="reason_of_transfer" name="reason_of_transfer" class="form-control" readonly="" value="{{reason_of_transfer}}">
                            </div>
                            <span class="error-message error-message-seller-reason_of_transfer"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>12. Leased sellerer Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="transferer_name" name="transferer_name" class="form-control" readonly="" value="{{transferer_name}}">
                            </div>
                            <span class="error-message error-message-seller-transferer_name"></span>
                        </div>
                    </div>
                     
                    <div class="row">
                       <div class="form-group col-sm-6">
                            <label>13. Manufacturing/service activity on Plot<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_servicing" name="name_of_servicing" class="form-control" readonly="" value="{{name_of_servicing}}">
                            </div>
                            <span class="error-message error-message-seller-name_of_servicing"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14. Udyog Aadhar Memorandum No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="udyog_aadhar_memo_no" name="udyog_aadhar_memo_no" class="form-control" readonly="" value="{{udyog_aadhar_memo_no}}">
                            </div>
                            <span class="error-message error-message-seller-udyog_aadhar_memo_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. GST No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="gst_no" name="gst_no" class="form-control" readonly="" value="{{gst_no}}">
                            </div>
                            <span class="error-message error-message-seller-gst_no"></span>
                        </div>
                       <div class="form-group col-sm-6">
                            <label>16. PAN Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="pan_no" name="pan_no" class="form-control" readonly="" value="{{pan_no}}">
                            </div>
                            <span class="error-message error-message-seller-pan_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>17. Account No. for Transactions.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="trans_account_no" name="trans_account_no" class="form-control" readonly="" value="{{trans_account_no}}">
                            </div>
                            <span class="error-message error-message-seller-trans_account_no"></span>
                        </div>
                    </div>
                <div class="row">
                     <div class="form-group col-sm-12">
                            <label>18. Request letter with reason to Sale/Transfer.</label>
                            <input type="radio" id="request_letter_reason_yes" name="request_letter_reason"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="request_letter_reason_no" name="request_letter_reason" 
                                   disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                      <div class=" request_letter_reason_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="request_letter_reason_doc_container_for_seller_view">
                            <label>18.1 Request letter.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                    <div class="form-group col-sm-12" id="request_letter_reason_doc_name_container_for_seller_view" style="display: none;">
                            <label>18.1 Request letter.</label><br>
                            <a id="request_letter_reason_doc_name_download" target="_blank"><label id="request_letter_reason_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>
                 <div class="row">
                        <div class="form-group col-sm-12">
                            <label>19. Original 7 X 12 extract Document.</label>
                            <input type="radio" id="original_extract_yes" name="original_extract" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="original_extract_no" name="original_extract" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" original_extract_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="original_extract_doc_container_for_seller_view">
                            <label>19.1 Original extract.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>

                     <div class="form-group col-sm-12" id="original_extract_doc_name_container_for_seller_view" style="display: none;">
                            <label>19.1 Original extract.</label><br>
                            <a id="original_extract_doc_name_download" target="_blank"><label id="original_extract_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. No Due Certificate from Mamlatdar/Patel Talati regarding land revenue.</label>
                            <input type="radio" id="nodue_from_mamlatdar_yes" name="nodue_from_mamlatdar" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="nodue_from_mamlatdar_no" name="nodue_from_mamlatdar" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" nodue_from_mamlatdar_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="nodue_from_mamlatdar_doc_container_for_seller_view">
                            <label>20.1 No Due Certificate from Mamlatdar.</label><br><label class="f-w-n">Document Not Uploaded</label><br>
                        </div>

                     <div class="form-group col-sm-12" id="nodue_from_mamlatdar_doc_name_container_for_seller_view" style="display: none;">
                            <label>20.1 No Due Certificate from Mamlatdar.</label><br>
                            <a id="nodue_from_mamlatdar_doc_name_download" target="_blank"><label id="nodue_from_mamlatdar_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>21. No Due Certificate from Electricity Department/last bill paid copy.</label>
                            <input type="radio" id="nodue_from_electricity_yes" name="nodue_from_electricity" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="nodue_from_electricity_no" name="nodue_from_electricity" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" nodue_from_electricity_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="nodue_from_electricity_doc_container_for_seller_view">
                            <label>21.1 No Due Certificate from Electricity. </span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>

                     <div class="form-group col-sm-12" id="nodue_from_electricity_doc_name_container_for_seller_view" style="display: none;">
                            <label>21.1 No Due Certificate from Electricity.</label><br>
                            <a id="nodue_from_electricity_doc_name_download" target="_blank"><label id="nodue_from_electricity_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>22. No Dues Certificate from Banks/Financial Institution/Bank regarding loan.</label>
                            <input type="radio" id="nodue_from_bank_yes" name="nodue_from_bank" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="nodue_from_bank_no" name="nodue_from_bank" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" nodue_from_bank_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="nodue_from_bank_doc_container_for_seller_view">
                            <label>22.1 No Due Certificate from Banks. </span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>

                     <div class="form-group col-sm-12" id="nodue_from_bank_doc_name_container_for_seller_view" style="display: none;">
                            <label>22.1 No Due Certificate from Banks.</label><br>
                            <a id="nodue_from_bank_doc_name_download" target="_blank"><label id="nodue_from_bank_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>23. Panchayat tax receipt/No Dues Certificate from group Gram Panchayat/Municipality regarding panchayat tax.</label>
                            <input type="radio" id="nodues_from_grampanchayat_yes" name="nodues_from_grampanchayat" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="nodues_from_grampanchayat_no" name="nodues_from_grampanchayat" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" nodues_from_grampanchayat_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="nodues_from_grampanchayat_doc_container_for_seller_view">
                            <label>23.1 No Due Certificate from Gram Panchayat.</label><br><label class="f-w-n">Document Not Uploaded</label><br>

                        </div>

                     <div class="form-group col-sm-12" id="nodues_from_grampanchayat_doc_name_container_for_seller_view" style="display: none;">
                            <label>23.1 No Due Certificate from Gram Panchayat.</label><br>
                            <a id="nodues_from_grampanchayat_doc_name_download" target="_blank"><label id="nodues_from_grampanchayat_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>24. Challan of lease rent from Lessee.</label>
                            <input type="radio" id="challan_of_lease_yes" name="challan_of_lease" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="challan_of_lease_no" name="challan_of_lease" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" challan_of_lease_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="challan_of_lease_doc_container_for_seller_view">
                            <label>24.1 Challan of lease.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>

                     <div class="form-group col-sm-12" id="challan_of_lease_doc_name_container_for_seller_view" style="display: none;">
                            <label>24.1 Challan of lease.</span></label><br>
                            <a id="challan_of_lease_doc_name_download" target="_blank"><label id="challan_of_lease_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>25. Occupancy Certificate, if there is factory building.</label>
                            <input type="radio" id="occupancy_certy_yes" name="occupancy_certy" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="occupancy_certy_no" name="occupancy_certy" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" occupancy_certy_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="occupancy_certy_doc_container_for_seller_view">
                            <label>25.1 Occupancy Certificate.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>

                        </div>

                     <div class="form-group col-sm-12" id="occupancy_certy_doc_name_container_for_seller_view" style="display: none;">
                            <label>25.1 Occupancy Certificate.</label><br>
                            <a id="occupancy_certy_doc_name_download" target="_blank"><label id="occupancy_certy_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>26. No Due Certificate from P.C.C., VAT, C.I.F. & B. and Central Excise.</label>
                            <input type="radio" id="nodue_from_excise_yes" name="nodue_from_excise" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="nodue_from_excise_no" name="nodue_from_excise" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" nodue_from_excise_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="nodue_from_excise_doc_container_for_seller_view">
                            <label>26.1 No Due Certificate from Central Excise.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>

                        </div>

                     <div class="form-group col-sm-12" id="nodue_from_excise_doc_name_container_for_seller_view" style="display: none;">
                            <label>26.1 No Due Certificate from Central Excise.</label><br>
                            <a id="nodue_from_excise_doc_name_download" target="_blank"><label id="nodue_from_excise_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                  <div class="row">
                        <div class="form-group col-sm-12">
                            <label>27. Valid authorization to sign on behalf of Lessee/Seller.</label>
                            <input type="radio" id="sign_behalf_lessee_yes" name="sign_behalf_lessee" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="sign_behalf_lessee_no" name="sign_behalf_lessee" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" sign_behalf_lessee_div" style="display: none;">
                        <div class="form-group col-sm-12 " id="sign_behalf_lessee_doc_container_for_seller_view">
                            <label>27.1 Sign on behalf of Lessee/Seller.</label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>

                        </div>

                     <div class="form-group col-sm-12" id="sign_behalf_lessee_doc_name_container_for_seller_view" style="display: none;">
                            <label>27.1 Sign on behalf of Lessee/Seller.</label><br>
                            <a id="sign_behalf_lessee_doc_name_download" target="_blank"><label id="sign_behalf_lessee_doc_name_image_for_seller_view" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_seller_view">
                            <label>28. Signature </label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_seller_view" style="display: none;">
                            <label>28. Signature</label><br>
                                <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_seller_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('seller');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>