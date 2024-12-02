<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Buyer of Lease </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Permission Buyer of Lease rights of Government Industrial plots</div>
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
                            <label>Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" disabled="">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" value="{{name_of_applicant}}" readonly="">
                            </div>
                            <span class="error-message error-message-transfer-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Date of Application <span class="color-nic-red">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="application_date" id="application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{application_date}}" disabled="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.State<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="state" name="state" class="form-control" readonly="" value="{{state}}">
                            </div>
                            <span class="error-message error-message-transfer-state"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.District<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-district"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5.Taluka<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="taluka" name="taluka" class="form-control" readonly="" value="{{taluka}}">
                            </div>
                            <span class="error-message error-message-transfer-taluka"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6.Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="villages_for_noc_data" name="villages_for_noc_data"
                                        data-placeholder="Status !" onblur="checkValidation('transfer', 'villages_for_noc_data', villageValidationMessage); getPlotData($(this), 'plot_no', 'transfer_data');" disabled="true">
                                    <option value="">Select Village</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-villages_for_transfer_data"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7.Plot No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_transfer_data" name="plot_no_for_transfer_data"
                                        data-placeholder="Status !" onchange="checkValidation('transfer', 'plot_no_for_transfer_data', plotnoValidationMessage);
                                                getAreaData($(this));" disabled="true">
                                    <option value="">Select Plot No.</option>
                                </select>
                            </div>
                            <span class="error-message error-message-transfer-plot_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8.  Admeasuring in square metre<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_Industrial_estate_area" name="govt_Industrial_estate_area" class="form-control" readonly="" value="{{govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-transfer-govt_Industrial_estate_area"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9.Survey No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" readonly="" value="{{survey_no}}">
                            </div>
                            <span class="error-message error-message-transfer-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring_square_metre" name="admeasuring_square_metre" class="form-control" readonly="" value="{{admeasuring_square_metre}}">
                            </div>
                            <span class="error-message error-message-transfer-admeasuring_square_metre"></span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>11.Reason for Sale/Transfer/Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="reason_of_transfer" name="reason_of_transfer" class="form-control" readonly="" value="{{reason_of_transfer}}">
                            </div>
                            <span class="error-message error-message-transfer-reason_of_transfer"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12.Name of Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="transferer_name" name="transferer_name" class="form-control" readonly="" value="{{transferer_name}}">
                            </div>
                            <span class="error-message error-message-transfer-transferer_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13.Details of Product of Purchaser<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_servicing" name="name_of_servicing" class="form-control" readonly="" value="{{name_of_servicing}}">
                            </div>
                            <span class="error-message error-message-transfer-name_of_servicing"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14.Activity of Purchaser (Manufacturing/Service)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_services" name="other_services" class="form-control" readonly="" value="{{other_services}}">
                            </div>
                            <span class="error-message error-message-transfer-other_services"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>15.Udyog Aadhar Memorandum Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="aadhar_no" name="aadhar_no" class="form-control" readonly="" value="{{aadhar_no}}">
                            </div>
                            <span class="error-message error-message-transfer-aadhar_no"></span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16.PAN Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="pan_no" name="pan_no" class="form-control" readonly="" value="{{pan_no}}">
                            </div>
                            <span class="error-message error-message-transfer-pan_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>17.GST Number:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="gst_no" name="gst_no" class="form-control" readonly="" value="{{gst_no}}">
                            </div>
                            <span class="error-message error-message-transfer-gst_no"></span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>18.Account Number for Transactions:<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="account_no" name="account_no" class="form-control" readonly="" value="{{account_no}}">
                            </div>
                            <span class="error-message error-message-transfer-account_no"></span>
                        </div>
                    </div>
                    <!-- checklist -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>19.Request letter with details of manufacture items. ? <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" disabled id="request_letter_yes" name="request_letter" class="" value="{{VALUE_ONE}}"> Yes &emsp;
                            <input type="radio" disabled id="request_letter_no" name="request_letter" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}"> No
                            <br/><span class="error-message error-message-transfer-request_letter"></span>
                        </div>
                        <div class="form-group col-sm-6 request_letter_upload_div" id="request_letter_upload_container_for_transfer" style="display: none;">
                            <!-- <label>19.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <input type="file" id="request_letter_upload_for_transfer" name="request_letter_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-request_letter_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="request_letter_upload_name_container_for_transfer" style="display: none;">
                            <!-- <label>19.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <a id="request_letter_upload_name_image_for_transfer_download" target="_blank"><label id="request_letter_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>20.Details of Project Report. ? <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" disabled id="project_report_yes" name="project_report" class="" value="{{VALUE_ONE}}"> Yes &emsp;
                            <input type="radio" disabled id="project_report_no" name="project_report" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}"> No
                            <br/><span class="error-message error-message-transfer-project_report"></span>
                        </div>
                        <div class="form-group col-sm-6 project_report_upload_div" id="project_report_upload_container_for_transfer" style="display: none;">
                            <!-- <label>20.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <input type="file" id="project_report_upload_for_transfer" name="project_report_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-project_report_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="project_report_upload_name_container_for_transfer" style="display: none;">
                            <!-- <label>20.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <a id="project_report_upload_name_image_for_transfer_download" target="_blank"><label id="project_report_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <!-- 3 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>21.Constitution of the Project viz. Memorandum and Article of Association/Partnership Deed. ? <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" disabled id="constitution_project_yes" name="constitution_project" class="" value="{{VALUE_ONE}}" > Yes &emsp;
                            <input type="radio" disabled id="constitution_project_no" name="constitution_project" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" > No
                            <br/><span class="error-message error-message-transfer-constitution_project"></span>
                        </div>
                        <div class="form-group col-sm-6 constitution_project_upload_div" id="constitution_project_upload_container_for_transfer" style="display: none;">
                            <!-- <label>21.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <input type="file" id="constitution_project_upload_for_transfer" name="constitution_project_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-constitution_project_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="constitution_project_upload_name_container_for_transfer" style="display: none;">
                            <!-- <label>21.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <a id="constitution_project_upload_name_image_for_transfer_download" target="_blank"><label id="constitution_project_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <!-- 4 -->
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>22.Valid authorization to sign on behalf of Purchaser/Buyer.. ? <span style="color: red;">* </span> &emsp;</label>
                            <input type="radio" disabled id="valid_authorization_yes" name="valid_authorization" class="" value="{{VALUE_ONE}}"> Yes &emsp;
                            <input type="radio" disabled id="valid_authorization_no" name="valid_authorization" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}"> No
                            <br/><span class="error-message error-message-transfer-valid_authorization"></span>
                        </div>
                        <div class="form-group col-sm-6 valid_authorization_upload_div" id="valid_authorization_upload_container_for_transfer" style="display: none;">
                            <!-- <label>22.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <input type="file" id="valid_authorization_upload_for_transfer" name="valid_authorization_upload_for_transfer"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-transfer-valid_authorization_upload_for_transfer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="valid_authorization_upload_name_container_for_transfer" style="display: none;">
                            <!-- <label>22.1 Please attach details document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br> -->
                            <a id="valid_authorization_upload_name_image_for_transfer_download" target="_blank"><label id="valid_authorization_upload_name_image_for_transfer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <!-- EndCheckList -->
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">23. &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('bocw', 'declarationone', declarationOneValidationMessage);" disabled>&nbsp;I / We hereby declare that the information and detials mentioned above are true and correct to the best of my knowledge.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-transfer-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_seal_container_for_transfer_view">
                            <label>Signature <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="sign_seal_name_container_for_transfer_view" style="display: none;">
                            <label>Signature <span style="color: red;">*</label><br>
                            <a id="seal_and_stamp_download" target="_blank"><img id="sign_seal_name_image_for_transfer_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('transfer');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>