<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">NOC For Mortgage</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for NOC of Mortgage rights of Government Industrial Plots</div>
            </div>
            <form role="form" id="noc_form" name="noc_form" onsubmit="return false;">
                
                <input type="hidden" id="noc_id" name="noc_id" value="{{noc_id}}">
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
                            <span class="error-message error-message-noc-name_of_applicant"></span>
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
                            <span class="error-message error-message-noc-application_date"></span>
                        </div>
                       
                    </div>

                      <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. State<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="state" name="state" class="form-control" readonly="" value="{{state}}">
                            </div>
                            <span class="error-message error-message-noc-state"></span>
                        </div>
                    <div class="form-group col-sm-6">
                            <label>4. District<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="district" name="district" class="form-control" readonly="" value="{{district}}">
                            </div>
                            <span class="error-message error-message-noc-district"></span>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Taluka<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="taluka" name="taluka" class="form-control" readonly="" value="{{taluka}}">
                            </div>
                            <span class="error-message error-message-noc-taluka"></span>
                        </div>
                    <div class="form-group col-sm-6">
                            <label>6. Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('noc', 'villages_for_noc_data', villageValidationMessage);
                                    getPlotData($(this), 'plot_no', 'noc_data');" disabled="">
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
                                <select class="form-control" id="plot_no_for_noc_data" name="plot_no_for_noc_data"
                                        data-placeholder="Status !" onchange="checkValidation('noc', 'plot_no_for_noc_data', plotnoValidationMessage);
                                    getAreaData($(this));" disabled="">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-plot_no_for_noc_data"></span>
                        </div>
                       <div class="form-group col-sm-6">
                            <label>8. Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" readonly="" value="{{survey_no}}">
                            </div>
                            <span class="error-message error-message-noc-survey_no"></span>
                        </div>
                        
                    
                    </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                            <label>9. Admeasuring in square metre<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" readonly="" value="{{govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-noc-govt_industrial_estate_area"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring_square_metre" name="admeasuring_square_metre" class="form-control" readonly="" value="{{admeasuring_square_metre}}">
                            </div>
                            <span class="error-message error-message-noc-admeasuring_square_metre"></span>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Loan Amount<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="loan_amount" name="loan_amount" class="form-control" readonly="" value="{{loan_amount}}">
                            </div>
                            <span class="error-message error-message-noc-loan_amount"></span>
                        </div>
                     
                        <div class="form-group col-sm-6">
                            <label>12. Purpose Of Loan<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="purpose_of_lease" name="purpose_of_lease" class="form-control" readonly="" value="{{purpose_of_lease}}">
                            </div>
                            <span class="error-message error-message-noc-purpose_of_lease"></span>
                        </div>
                    </div>
          <div class="row">
                         <div class="form-group col-sm-6">
                            <label>14. Bank Account Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="ac_number" name="ac_number" class="form-control" readonly="" value="{{ac_number}}">
                            </div>
                            <span class="error-message error-message-noc-ac_number"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>15. Bank Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="bank_name" name="bank_name" class="form-control" readonly="" value="{{bank_name}}">
                            </div>
                            <span class="error-message error-message-noc-bank_name"></span>
                        </div>
                    </div>
                <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16. Branch Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="branch_name" name="branch_name" class="form-control" readonly="" value="{{branch_name}}">
                            </div>
                            <span class="error-message error-message-noc-branch_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>17. IFSC Code<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="ifsc_code" name="ifsc_code" class="form-control" readonly="" value="{{ifsc_code}}">
                            </div>
                            <span class="error-message error-message-noc-ifsc_code"></span>
                        </div>
                    </div>
                    
                <div class="row">
                        
                   <div class="form-group col-sm-3">
                            <label>17. Perioad Of Loan<span class="color-nic-red">*</span></label><br>
                            <label>Date (From) </label>
                            <div class="input-group date">
                                <input type="text" name="loan_from_date" id="loan_from_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{loan_from_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-noc-loan_from_date"></span>
                        </div>
                        <div class="form-group col-sm-3">
                            <label><span class="color-nic-red">&emsp;&emsp;</span></label><br>
                            <label>Date (To) </label>
                            <div class="input-group date">
                                <input type="text" name="to_date" id="to_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{to_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-noc-to_date"></span>
                        </div>
                    </div>
                    <div class="row">
                    <div class="form-group col-sm-12">
                            <label>18. Reason for obtaining loan from Bank. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="reason_of_loan_from_bank_yes" name="reason_of_loan_from_bank"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="reason_of_loan_from_bank_no" name="reason_of_loan_from_bank" 
                                   disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" reason_of_loan_from_bank_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="reason_of_loan_doc_container_for_noc_view">
                            <label>18.1 Document from Bank.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="reason_of_loan_doc_name_container_for_noc_view" style="display: none;">
                            <label>18.1 Document from Bank.</label><br>
                            <a id="reason_of_loan_doc_name_download" target="_blank"><label id="reason_of_loan_doc_name_image_view" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12">
                            <label>19. Request original Letter from Bank.<span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="request_letter_of_bank_yes" name="request_letter_of_bank"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="request_letter_of_bank_no" name="request_letter_of_bank" 
                                   disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" request_letter_doc_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="request_letter_doc_container_for_noc_view">
                            <label>19.1 Original Letter.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="request_letter_doc_name_container_for_noc_view" style="display: none;">
                            <label>19.1 Original Letter.</label><br>
                            <a id="request_letter_doc_name_download" target="_blank"><label id="request_letter_doc_name_image_view" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12">
                            <label>20. Valid authorization to sign on behalf of Lessee.<span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="behalf_of_lessee_yes" name="behalf_of_lessee"  
                                   disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="behalf_of_lessee_no" name="behalf_of_lessee" 
                                   disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                    <div class=" behalf_of_lessee_div" style="display: none;">
                        <div class="col-6 m-b-5px" id="behalf_of_lessee_doc_container_for_noc_view">
                            <label>20.1 Document from Bank.</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="behalf_of_lessee_doc_name_container_for_noc_view" style="display: none;">
                            <label>20.1 Document from Bank.</label><br>
                            <a id="behalf_of_lessee_doc_name_download" target="_blank"><label id="behalf_of_lessee_doc_name_image_view" class="btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>

                <div class="row">
                        <div class="form-group col-sm-12">
                            <label>21. No Due Certificate for Public Undertaking / Paid Challan. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="public_undertaking_yes" name="public_undertaking" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="public_undertaking_no" name="public_undertaking" disabled="" value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class=" public_undertaking_div" style="display: none;">
                            <div class="form-group col-sm-12" id="public_undertaking_doc_container_for_noc">
                                <label>21.1 Certificate for Public Undertaking.</label><br>
                                <label class="f-w-n">Document Not Uploaded</label><br>
                            </div>

                            <div class="form-group col-sm-12" id="public_undertaking_doc_name_container_for_noc" style="display: none;">
                                <label>21.1 Certificate for Public Undertaking.</label><br>
                                <a id="public_undertaking_doc_name_download" target="_blank"><label id="public_undertaking_doc_name_image" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>  
                    </div>


                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_noc_view">
                            <label>22. Signature <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_noc_view" style="display: none;">
                            <label>22. Signature <span style="color: red;">*</label><br>
                                <a id="seal_and_stamp_download" target="_blank"><img id="seal_and_stamp_name_image_for_noc_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('noc');">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>