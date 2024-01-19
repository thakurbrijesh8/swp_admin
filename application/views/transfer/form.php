<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Buyer of Plot for Lease</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Permission of Sale/Transfer(Seller) of Lease rights of Government Industrial Plot</div>
            </div>
            <form role="form" id="transfer_form" name="transfer_form" onsubmit="return false;">
                
                <input type="hidden" id="transfer_id" name="transfer_id" value="{{transfer_data.transfer_id}}">
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
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !" onblur="checkValidation('transfer', 'name_of_applicant', applicantNameValidationMessage);"
                                       maxlength="100"  value="{{transfer_data.name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-transfer-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="application_date" id="application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{application_date}}" onblur="checkValidation('transfer', 'application_date', appDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-transfer-application_date"></span>
                        </div>
                    </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                            <label>3. State / UT<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="state" name="state"
                                    data-placeholder="Status !" onblur="checkValidation('transfer', 'state', stateValidationMessage);">
                                    <option value="">Select State</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-state"></span>
                    </div>
                    <div class="form-group col-sm-6">
                            <label>4. District<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="district" name="district"
                                    data-placeholder="Status !" onblur="checkValidation('transfer', 'district', districtValidationMessage);">
                                    <option value="">Select District</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-district"></span>
                    </div>
                </div>
                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Taluka</label>
                            <div class="input-group">
                                <select class="form-control" id="taluka" name="taluka"
                                    data-placeholder="Status !" onblur="checkValidation('transfer', 'taluka', talukaValidationMessage);">
                                    <option value="">Select Taluka</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-taluka"></span>
                    </div>
                      <div class="col-sm-6 col-md-6">
                        <label>6. Villages <span style="color: red;">*</span></label>
                         <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                    data-placeholder="Status !" onblur="checkValidation('transfer', 'villages_for_noc_data', villageNameValidationMessage); getPlotData($(this), 'plot_no', 'transfer_data');">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-villages_for_noc_data"></span>
                    </div>
                </div>
                    
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.Plot No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_transfer_data" name="plot_no_for_transfer_data"
                                        data-placeholder="Status !" onchange="checkValidation('transfer', 'plot_no_for_transfer_data', plotnoValidationMessage);
                                    getAreaData($(this));">
                                    <option value="">Select Plot No.</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-plot_no_for_transfer_data"></span>
                        </div>
                         <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square metre<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" placeholder="Enter  Government Industrial Estate Area!"  maxlength="100" onblur="checkValidation('transfer', 'govt_industrial_estate_area', govtIndustrialEstateAreaValidationMessage);" value="{{transfer_data.govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-transfer-govt_industrial_estate_area"></span>
                        </div>                    
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"  maxlength="100" onblur="checkValidation('transfer', 'survey_no', surveynoValidationMessage);" value="{{transfer_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-transfer-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring_square_metre" name="admeasuring_square_metre" class="form-control" placeholder="Enter Admeasuring square metre!"  maxlength="100" onblur="checkValidation('transfer', 'admeasuring_square_metre', admeasuringValidationMessage);" value="{{transfer_data.admeasuring_square_metre}}">
                            </div>
                            <span class="error-message error-message-transfer-admeasuring_square_metre"></span>
                        </div>
                   
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>11. Reason for Sale/Transfer/Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="reason_of_transfer" name="reason_of_transfer" class="form-control" placeholder="Enter Reason Of Leased Transfer !"  maxlength="100" onblur="checkValidation('transfer', 'reason_of_transfer', reasonofTransferValidationMessage);" value="{{transfer_data.reason_of_transfer}}">
                            </div>
                            <span class="error-message error-message-transfer-reason_of_transfer"></span>
                        </div>
                    </div>
                     
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Name of Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="transferer_name" name="transferer_name" class="form-control" placeholder="Enter Transferer Name !"  maxlength="100" onblur="checkValidation('transfer', 'transferer_name', transfererNameValidationMessage);" value="{{transfer_data.transferer_name}}">
                            </div>
                            <span class="error-message error-message-transfer-transferer_name"></span>
                        </div>
                    <div class="form-group col-sm-6">
                            <label>13. Details of Product of Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_servicing" name="name_of_servicing" class="form-control" placeholder="Enter Manufacturing/service activity !"  maxlength="100" onblur="checkValidation('transfer', 'name_of_servicing', nameofservicingValidationMessage);" value="{{transfer_data.name_of_servicing}}">
                            </div>
                            <span class="error-message error-message-transfer-name_of_servicing"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. Activity of Purchaser (Manufacturing/Service)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_services" name="other_services" class="form-control" placeholder="Enter other services !"  maxlength="100" onblur="checkValidation('transfer', 'other_services', otherservicesValidationMessage);" value="{{transfer_data.other_services}}">
                            </div>
                            <span class="error-message error-message-transfer-other_services"></span>
                        </div>
                
                    <div class="form-group col-sm-6">
                            <label>15. Udyog Aadhar Memorandum Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="aadhar_no" name="aadhar_no" class="form-control" placeholder="Enter Aadhar Number !"  maxlength="100" onblur="checkValidation('transfer', 'aadhar_no', aadharnoValidationMessage);" value="{{transfer_data.aadhar_no}}">
                            </div>
                            <span class="error-message error-message-transfer-aadhar_no"></span>
                        </div>
                
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16. PAN Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="pan_no" name="pan_no" class="form-control" placeholder="Enter PAN Number !"  maxlength="100" onblur="checkValidation('transfer', 'pan_no', pannoValidationMessage);" value="{{transfer_data.pan_no}}">
                            </div>
                            <span class="error-message error-message-transfer-pan_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>17. GST Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="gst_no" name="gst_no" class="form-control" placeholder="Enter GST Number !"  maxlength="100" onblur="checkValidation('transfer', 'gst_no', gstnoValidationMessage);" value="{{transfer_data.gst_no}}">
                            </div>
                            <span class="error-message error-message-transfer-gst_no"></span>
                        </div>
                
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>18. Account Number for Transactions:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="account_no" name="account_no" class="form-control" placeholder="Enter Account Number !"  maxlength="100" onblur="checkValidation('transfer', 'account_no', acNumberValidationMessage);" value="{{transfer_data.account_no}}">
                            </div>
                            <span class="error-message error-message-transfer-account_no"></span>
                        </div>                
                    </div>
     
                    <!-- checklist -->
                      <div class="row">
                        <div class="form-group col-sm-6">
                            <label>19.Request letter with details of manufacture items.? (if Yes, please attach details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="request_letter_yes" name="request_letter" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="request_letter_no" name="request_letter" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-transfer-request_letter"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 request_letter_upload_div" id="request_letter_upload_container_for_transfer" style="display: none;">
                            <label>19.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="request_letter_upload_for_transfer" name="request_letter_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-request_letter_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="request_letter_upload_name_container_for_transfer" style="display: none;">
                            <label>19.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="request_letter_upload_name_image_for_transfer_download" target="_blank"><label id="request_letter_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="Transfer.listview.askForRemove('{{transfer_data.transfer_id}}','request_letter_upload','transfer');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>20.Details of Project Report..? (if Yes, please attach details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="project_report_yes" name="project_report" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="project_report_no" name="project_report" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-transfer-project_report"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 project_report_upload_div" id="project_report_upload_container_for_transfer" style="display: none;">
                            <label>20.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="project_report_upload_for_transfer" name="project_report_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-project_report_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="project_report_upload_name_container_for_transfer" style="display: none;">
                            <label>20.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="project_report_upload_name_image_for_transfer_download" target="_blank"><label id="project_report_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="Transfer.listview.askForRemove('{{transfer_data.transfer_id}}','project_report_upload','transfer');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <!-- 3 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>21.Constitution of the Project viz. Memorandum and Article of Association/Partnership Deed.? (if Yes, please attach details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="constitution_project_yes" name="constitution_project" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="constitution_project_no" name="constitution_project" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-transfer-constitution_project"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 constitution_project_upload_div" id="constitution_project_upload_container_for_transfer" style="display: none;">
                            <label>21.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="constitution_project_upload_for_transfer" name="constitution_project_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-constitution_project_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="constitution_project_upload_name_container_for_transfer" style="display: none;">
                            <label>21.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="constitution_project_upload_name_image_for_transfer_download" target="_blank"><label id="constitution_project_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="Transfer.listview.askForRemove('{{transfer_data.transfer_id}}','constitution_project_upload','transfer');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                    <!-- 4 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>22.Request letter with details of manufacture items.? (if Yes, please attach details) <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="valid_authorization_yes" name="valid_authorization" class="" value="{{VALUE_ONE}}" >&nbsp; Yes
                                &emsp;
                                <input type="radio" id="valid_authorization_no" name="valid_authorization" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" >&nbsp;No
                                <br/><span class="error-message error-message-transfer-valid_authorization"></span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 valid_authorization_upload_div" id="valid_authorization_upload_container_for_transfer" style="display: none;">
                            <label>22.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="valid_authorization_upload_for_transfer" name="valid_authorization_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-valid_authorization_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="valid_authorization_upload_name_container_for_transfer" style="display: none;">
                            <label>22.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="valid_authorization_upload_name_image_for_transfer_download" target="_blank"><label id="valid_authorization_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="Transfer.listview.askForRemove('{{transfer_data.transfer_id}}','valid_authorization_upload','transfer');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>
                     <!-- checklist -->
                     <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">23. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('transfer', 'declarationone', declarationOneValidationMessage);">&nbsp;I / We hereby declare that the information and detials mentioned above are true and correct to the best of my knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-transfer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_seal_container_for_transfer">
                            <label>Upload Authorized Signature Designation with Seal<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="sign_seal_for_transfer" name="sign_seal_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-sign_seal_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="sign_seal_name_container_for_transfer" style="display: none;">
                            <label>Authorized Signatory Designation with Seal<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="sign_seal_name_image_for_transfer" style="width: 250px; height: 250px; border: 2px solid blue;">
                            <!-- <button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;"
                                    onclick="Transfer.listview.askForRemove('{{transfer_data.transfer_id}}','sign_seal','transfer');">
                                <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button> -->
                        </div>
                    </div>

                    <div class="form-group"><!-- 
                        <button type="button" id="draft_btn_for_transfer" class="btn btn-sm btn-nic-blue" onclick="transfer.listview.submittransfer({{VALUE_ONE}});" style="margin-right: 5px;">Save as a Draft</button> -->
                        <button type="button" id="submit_btn_for_transfer" class="btn btn-sm btn-success" onclick="Transfer.listview.submitTransfer({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('transfer');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>