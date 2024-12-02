<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">NOC For Mortgage</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for NOC of Mortgage rights of Government Industrial Plots</div>
            </div>
            <form role="form" id="noc_form" name="noc_form" onsubmit="return false;">

                <input type="hidden" id="noc_id" name="noc_id" value="{{noc_data.noc_id}}">
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
                            <label>Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('noc', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-noc-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('noc', 'name_of_applicant', applicantNameValidationMessage);" value="{{noc_data.name_of_applicant}}">
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
                            <label>3. State / UT<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="state" name="state"
                                        data-placeholder="Status !" onblur="checkValidation('noc', 'state', stateValidationMessage);">
                                    <option value="">Select State</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-state"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. District<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-noc-district"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Taluka<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="taluka" name="taluka"
                                        data-placeholder="Status !" onblur="checkValidation('noc', 'taluka', talukaValidationMessage);">
                                    <option value="">Select Taluka</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-taluka"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Villages/ Government Industrial Estate<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !"  onchange="checkValidation('noc', 'villages_for_noc_data', villageNameValidationMessage);
                                                getPlotData($(this), 'plot_no', 'noc_data');">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-villages_for_noc_data"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Plot No.<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_noc_data" name="plot_no_for_noc_data"
                                        data-placeholder="Status !" onchange="checkValidation('noc', 'plot_no_for_noc_data', plotnoValidationMessage);
                                                getAreaData($(this));">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-noc-plot_no_for_noc_data"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>8. Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"  maxlength="100" onblur="checkValidation('noc', 'survey_no', surveynoValidationMessage);" value="{{noc_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-noc-survey_no"></span>
                        </div>


                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Admeasuring in square metre <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" placeholder="Enter Admeasuring square metre !"  maxlength="100" value="{{noc_data.govt_industrial_estate_area}}" readonly="">
                            </div>
                            <span class="error-message error-message-noc-govt_industrial_estate_area"></span>
                        </div>
                        <!--  <div class="form-group col-sm-6">
                                
                                  <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="admeasuring_square_metre" name="admeasuring_square_metre" class="form-control" placeholder="Enter  Government Industrial Estate!"  maxlength="100" onblur="checkValidation('noc', 'admeasuring_square_metre', admeasuringValidationMessage);" value="{{noc_data.admeasuring_square_metre}}">
                                </div>
                                <span class="error-message error-message-noc-admeasuring_square_metre"></span>
                            </div> -->



                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Loan Amount<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="loan_amount" name="loan_amount" class="form-control" placeholder="Enter Loan Amount !"  maxlength="100" onblur="checkValidation('noc', 'loan_amount', loanAmountValidationMessage);" value="{{noc_data.loan_amount}}">
                            </div>
                            <span class="error-message error-message-noc-loan_amount"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>12. Purpose Of Loan<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="purpose_of_lease" name="purpose_of_lease" class="form-control" placeholder="Enter Purpose Of Loan !"  maxlength="100" onblur="checkValidation('noc', 'purpose_of_lease', purposeleaseValidationMessage);" value="{{noc_data.purpose_of_lease}}">
                            </div>
                            <span class="error-message error-message-noc-purpose_of_lease"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13. Bank Account Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="ac_number" name="ac_number" class="form-control" placeholder="Enter Account Number !"  maxlength="100" onblur="checkValidation('noc', 'ac_number', acNumberValidationMessage);" value="{{noc_data.ac_number}}">
                            </div>
                            <span class="error-message error-message-noc-ac_number"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14. Branch Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="branch_name" name="branch_name" class="form-control" placeholder="Enter Branch Name !"  maxlength="100" onblur="checkValidation('noc', 'branch_name', branchNameValidationMessage);" value="{{noc_data.branch_name}}">
                            </div>
                            <span class="error-message error-message-noc-branch_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Bank Name<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="bank_name" name="bank_name" class="form-control" placeholder="Enter Bank Name!"  maxlength="100" onblur="checkValidation('noc', 'bank_name', banknameValidationMessage);" value="{{noc_data.bank_name}}">
                            </div>
                            <span class="error-message error-message-noc-bank_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16. IFSC Code<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="ifsc_code" name="ifsc_code" class="form-control" placeholder="Enter IFSC Code!"  maxlength="100" onblur="checkValidation('noc', 'ifsc_code', ifscCodeValidationMessage);" value="{{noc_data.ifsc_code}}">
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
                                       value="{{loan_from_date}}" onblur="checkValidation('noc', 'loan_from_date', loanFromDateValidationMessage);">
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
                                       value="{{to_date}}" onblur="checkValidation('noc', 'to_date', loanToDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-noc-to_date"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>18. Reason for obtaining loan from Bank.<span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="reason_of_loan_from_bank_yes" name="reason_of_loan_from_bank" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="reason_of_loan_from_bank_no" name="reason_of_loan_from_bank" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-noc-reason_of_loan_from_bank"></span>
                        </div>
                        <div class=" reason_of_loan_from_bank_div" style="display: none;">
                            <div class="form-group col-sm-12 " id="reason_of_loan_doc_container_for_noc">
                                <label>18.1 Document from Bank. <span style="color: red;">* <br>(Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                                <input type="file" id="reason_of_loan_doc_for_noc" name="reason_of_loan_doc_for_noc"
                                       accept="image/pdf">
                                <div class="error-message error-message-noc-reason_of_loan_doc_for_noc"></div>
                            </div>

                            <div class="form-group col-sm-12" id="reason_of_loan_doc_name_container_for_noc" style="display: none;">
                                <label>18.1 Document from Bank. <span style="color: red;">*<br> (Maximum File Size: 2MB)(Upload pdf Only) <span style="color: red;">*</span></label><br>
                                <a id="reason_of_loan_doc_name_download" target="_blank"><label id="reason_of_loan_doc_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>19. Request original Letter from Bank. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="request_letter_of_bank_yes" name="request_letter_of_bank" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="request_letter_of_bank_no" name="request_letter_of_bank" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-noc-request_letter_of_bank"></span>
                        </div>
                        <div class=" request_letter_doc_div" style="display: none;">
                            <div class="form-group col-sm-12" id="request_letter_doc_container_for_noc">
                                <label>19.1 Original Letter. <span style="color: red;">* <br>(Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                                <input type="file" id="request_letter_doc_for_noc" name="request_letter_doc_for_noc"
                                       accept="image/pdf">
                                <div class="error-message error-message-noc-request_letter_doc_for_noc"></div>
                            </div>

                            <div class="form-group col-sm-12" id="request_letter_doc_name_container_for_noc" style="display: none;">
                                <label>19.1 Original Letter. <span style="color: red;">*<br> (Maximum File Size: 2MB)(Upload pdf Only) <span style="color: red;">*</span></label><br>
                                <a id="request_letter_doc_name_download" target="_blank"><label id="request_letter_doc_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>   
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>20. Valid authorization to sign on behalf of Lessee. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="behalf_of_lessee_yes" name="behalf_of_lessee" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="behalf_of_lessee_no" name="behalf_of_lessee" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-noc-behalf_of_lessee"></span>
                        </div>
                        <div class=" behalf_of_lessee_div" style="display: none;">
                            <div class="form-group col-sm-12" id="behalf_of_lessee_doc_container_for_noc">
                                <label>20.1 Behalf of Lessee. <span style="color: red;">* <br>(Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                                <input type="file" id="behalf_of_lessee_doc_for_noc" name="behalf_of_lessee_doc_for_noc"
                                       accept="image/pdf">
                                <div class="error-message error-message-noc-behalf_of_lessee_doc_for_noc"></div>
                            </div>

                            <div class="form-group col-sm-12" id="behalf_of_lessee_doc_name_container_for_noc" style="display: none;">
                                <label>20.1 Behalf of Lessee. <span style="color: red;">*<br> (Maximum File Size: 2MB)(Upload pdf Only) <span style="color: red;">*</span></label><br>
                                <a id="behalf_of_lessee_doc_name_download" target="_blank"><label id="behalf_of_lessee_doc_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>  
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>21. No Due Certificate for Public Undertaking / Paid Challan. <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" id="public_undertaking_yes" name="public_undertaking" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="public_undertaking_no" name="public_undertaking" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-noc-public_undertaking"></span>
                        </div>
                        <div class=" public_undertaking_div" style="display: none;">
                            <div class="form-group col-sm-12" id="public_undertaking_doc_container_for_noc">
                                <label>21.1 Certificate for Public Undertaking. <span style="color: red;">* <br>(Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                                <input type="file" id="public_undertaking_doc_for_noc" name="public_undertaking_doc_for_noc"
                                       accept="image/pdf">
                                <div class="error-message error-message-noc-public_undertaking_doc_for_noc"></div>
                            </div>

                            <div class="form-group col-sm-12" id="public_undertaking_doc_name_container_for_noc" style="display: none;">
                                <label>21.1 Certificate for Public Undertaking. <span style="color: red;">*<br> (Maximum File Size: 2MB)(Upload pdf Only) <span style="color: red;">*</span></label><br>
                                <a id="public_undertaking_doc_name_download" target="_blank"><label id="public_undertaking_doc_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>  
                    </div>


                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_noc">
                            <label>22.Signature<span style="color: red;">* (Maximum File Size: 1MB)(Upload jpg, png, jpeg ,jfif Only)</span></label><br>
                            <input type="file" id="seal_and_stamp_for_noc" name="seal_and_stamp_for_noc"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-noc-seal_and_stamp_for_noc"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_noc" style="display: none;">
                            <label>22.Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_noc" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <div class="form-group"><!-- 
                        <button type="button" id="draft_btn_for_noc" class="btn btn-sm btn-nic-blue" onclick="noc.listview.submitnoc({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button> -->
                        <button type="button" id="submit_btn_for_noc" class="btn btn-sm btn-success" onclick="Noc.listview.submitNoc({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('noc');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>