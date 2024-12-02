<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Sub-Letting for Sub-Lessee</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format of Permission for Sub-Letting lease rights of Government Industrial Plots</div>

            </div>
            <form role="form" id="sublessee_form" name="sublessee_form" onsubmit="return false;">

                <input type="hidden" id="sublessee_id" name="sublessee_id" value="{{sublessee_data.sublessee_id}}">
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
                            <label>1. Name of Sub-lessee Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('sublessee', 'name_of_applicant', applicantNameValidationMessage);" value="{{sublessee_data.name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-sublessee-name_of_applicant"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>2. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" class= "form-control" placeholder="dd-mm-yyyy"
                                       value="{{date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-sublessee-date"></span>

                        </div>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. State / UT</label>
                            <div class="input-group">
                                <select class="form-control" id="state" name="state"
                                        data-placeholder="Status !" onblur="checkValidation('sublessee', 'state', stateValidationMessage);">
                                    <option value="">Select State</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                </select>
                            </div>
                            <span class="error-message error-message-sublessee-state"></span>

                        </div>


                        <div class="form-group col-sm-6">
                            <label>4. District</label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-sublessee-district"></span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Taluka</label>
                            <div class="input-group">
                                <select class="form-control" id="taluka" name="taluka"
                                        data-placeholder="Taluka !" onblur="checkValidation('sublessee', 'taluka', talukaValidationMessage);">
                                    <option value="">Select Taluka</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli </option>
                                </select>
                            </div>
                            <span class="error-message error-message-sublessee-taluka"></span>   
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Village<span style="color: red;">*</span></label>
                            <select id="villages_for_noc_data" name="villages_for_noc_data" class="form-control"
                                    data-placeholder="Select Village !" 
                                    onblur="checkValidation('sublessee', 'villages_for_noc_data', villageNameValidationMessage);">
                                <option value="">Select Village</option>
                            </select>
                            <span class="error-message error-message-sublessee-villages_for_noc_data"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Plot No.<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_no_for_sublessee_data" name="plot_no_for_sublessee_data"
                                        data-placeholder="Status !" onchange="checkValidation('sublessee', 'plot_no_for_sublessee_data', plotnoValidationMessage);
                                            getAreaData($(this));">
                                    <option value="">Select Plot NO</option>
                                </select>
                            </div>
                            <span class="error-message error-message-sublessee-plot_no_for_sublessee_data"></span>
                        </div>

                        <div class="form-group col-sm-6">
                            <label>8. Admeasuring in square meter<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="govt_industrial_estate_area" name="govt_industrial_estate_area" class="form-control" placeholder="Enter  Government Industrial Estate Area!"  maxlength="100" value="{{sublessee_data.govt_industrial_estate_area}}">
                            </div>
                            <span class="error-message error-message-sublessee-govt_industrial_estate_area"></span>


                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Survey No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"
                                       maxlength="100" onblur="checkValidation('sublessee', 'survey_no', surveynoValidationMessage);" value="{{sublessee_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-sublessee-survey_no"></span>

                        </div>

                        <div class="form-group col-sm-6">
                            <label>10. Government Industrial Estate<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="admeasuring" name="admeasuring" class="form-control" placeholder=" Enter admeasuring in square meter !" maxlength="100" value="{{sublessee_data.admeasuring}}" onblur="checkValidation('sublessee', 'admeasuring', admeasuringValidationMessage);">
                            </div>
                            <span class="error-message error-message-sublessee-admeasuring"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Name of  Manufacturing/Servicing  Establish <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_manufacturing" name="name_of_manufacturing" class="form-control" placeholder="Name of  Manufacturing/Servicing  Establish. !" maxlength="100" value="{{sublessee_data.name_of_manufacturing}}" onblur="checkValidation('sublessee', 'name_of_manufacturing', nameofmanufactringValidationMessage);">
                            </div>
                            <span class="error-message error-message-sublessee-name_of_manufacturing"></span>
                        </div>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>12. Request letter with detail of manufacture item. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="request_letter_yes" name="request_letter"  
                                   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="request_letter_no" name="request_letter" 
                                   value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-sublessee-request_letter"></span>
                        </div>
                        <div class="row request_letter_div" style="display: none;">
                            <div class="form-group col-sm-12" id="request_letter_manufacture_container_for_sublessee" >
                                <label>12.1 Detail of manufacture item <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <input type="file" id="request_letter_manufacture_for_sublessee" name="request_letter_manufacture_for_sublessee"
                                       accept="image/pdf">
                                <div class="error-message error-message-sublessee-request_letter_manufacture_for_sublessee"></div>
                            </div>
                            <div class="form-group col-sm-12" id="request_letter_manufacture_name_container_for_sublessee" style="display: none;">
                                <label>12.1 Detail of manufacture item <span style="color: red;">* </label><br>
                                <a target="_blank" id="request_letter_manufacture_download"><label id="request_letter_manufacture_name_image_for_sublessee" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>
                        <span class="error-message error-message-sublessee-request_letter_manufacture"></span>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>13. Detail of Project Report. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="detail_project_yes" name="detail_project"  
                                   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="detail_project_no" name="detail_project" 
                                   value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-sublessee-detail_project"></span>
                        </div>
                        <div class="row detail_project_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="detail_project_report_container_for_sublessee" >
                                <label>13.1 Project Report <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <input type="file" id="detail_project_report_for_sublessee" name="detail_project_report_for_sublessee"
                                       accept="image/pdf">
                                <div class="error-message error-message-sublessee-detail_project_report_for_sublessee"></div>
                            </div>
                            <div class="form-group col-sm-12" id="detail_project_report_name_container_for_sublessee" style="display: none;">
                                <label>13.1 Project Report <span style="color: red;">* </label><br>
                                <a target="_blank" id="detail_project_report_download"><label id="detail_project_report_name_image_for_sublessee" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>

                            </div>
                        </div>
                        <span class="error-message error-message-sublessee-detail_project_report"></span>
                    </div>



                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. Constitution of the Project viz. Memorandum and Article Association/Partnership Deed. <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="partnership_deed_yes" name="partnership_deed"  
                                   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="partnership_deed_no" name="partnership_deed" 
                                   value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-sublessee-partnership_deed"></span>
                        </div>
                        <div class="row partnership_deed_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="memorandum_partnership_deed_container_for_sublessee" >
                                <label>14.1  Memorandum and Article Association/Partnership Deed. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                                <input type="file" id="memorandum_partnership_deed_for_sublessee" name="memorandum_partnership_deed_for_sublessee"
                                       accept="image/pdf">
                                <div class="error-message error-message-sublessee-memorandum_partnership_deed_for_sublessee"></div>
                            </div>
                            <div class="form-group col-sm-12" id="memorandum_partnership_deed_name_container_for_sublessee" style="display: none;">
                                <label>14.1  Memorandum and Article Association/Partnership Deed. <span style="color: red;">* </label><br>
                                <a target="_blank" id="memorandum_partnership_deed_download"><label id="memorandum_partnership_deed_name_image_for_sublessee" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <span class="error-message error-message-sublessee-memorandum_partnership_deed"></span>
                    </div>


                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>15. Valid authorization to sign on behalf of Sub-Lessee <span style="color: red;">* </span>&emsp;</label>
                            <input type="radio" id="sign_sublessee_yes" name="sign_sublessee"  
                                   value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="sign_sublessee_no" name="sign_sublessee" 
                                   value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-sublessee-sign_sublessee"></span>
                        </div>
                        <div class="row sign_sublessee_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="behalf_sign_sublessee_container_for_sublessee">
                                <label>15.1  sign on behalf of Sub-Lessee<span style="color: red;">* (Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only) </span></label><br>
                                <input type="file" id="behalf_sign_sublessee_for_sublessee" name="behalf_sign_sublessee_for_sublessee"
                                       accept="image/jpg,image/png,image/jpeg,image/jfif">
                                <div class="error-message error-message-sublessee-behalf_sign_sublessee_for_sublessee"></div>
                            </div>
                            <div class="form-group col-sm-12" id="behalf_sign_sublessee_name_container_for_sublessee" style="display: none;">
                                <label>15.1  sign on behalf of Sub-Lessee <span style="color: red;">* </label><br>
                                <a target="_blank" id="behalf_sign_sublessee_download"><img id="behalf_sign_sublessee_name_image_for_sublessee" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                            </div>
                        </div>
                        <span class="error-message error-message-sublessee-behalf_sign_sublessee"></span>
                    </div>


                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_sublessee">
                            <label>16. Signature<span style="color: red;">* (Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only) </span></label><br>
                            <input type="file" id="seal_and_stamp_for_sublessee" name="seal_and_stamp_for_sublessee"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-sublessee-seal_and_stamp_for_sublessee"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_sublessee" style="display: none;">
                            <label>16.Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_sublessee" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" id="submit_btn_for_wmregistration" class="btn btn-sm btn-success" onclick="Sublessee.listview.submitSublessee({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('sublessee');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>