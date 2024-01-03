<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Site Elevation</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application form of Ground Elevation Data</div>
            </div>
            <form role="form" id="site_form" name="site_form" onsubmit="return false;">
                
                <input type="hidden" id="site_id" name="site_id" value="{{site_data.site_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Chief Town Planner,<br>
                            Town & Country Planning Dept.,<br>
                            Daman.
                        </div>
                    </div>

                    <div class="row">
                      <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" >
                            </select>
                            </div>
                            <span class="error-message error-message-site-district"></span>
                        </div>
                    </div>
                 <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !" onblur="checkValidation('site', 'name_of_applicant', applicantNameValidationMessage);"
                                       maxlength="100"  value="{{site_data.name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-site-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="application_date" id="application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{application_date}}" onblur="checkValidation('site', 'application_date', appDateValidationMessage);" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-site-application_date"></span>
                        </div>
                    </div>
               
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="address" name="address" class="form-control" placeholder="Enter Address !"  maxlength="100" onblur="checkValidation('site', 'address', owneraddressMessage);" value="{{site_data.address}}">
                            </div>
                            <span class="error-message error-message-site-address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Mobile No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="mobile_no" name="mobile_no" class="form-control" placeholder="Enter  Mobile No!"  maxlength="100" onblur="checkValidation('site', 'mobile_no', mobileValidationMessage);" value="{{site_data.mobile_no}}">
                            </div>
                            <span class="error-message error-message-site-mobile_no"></span>
                        </div>
                    
                    </div>

                      <div class="row">
                        <div class="form-group col-sm-3">
                            <label>6. PTS No</label>
                            <div class="input-group">
                                <input type="text" id="pts_no" name="pts_no" class="form-control" placeholder="Enter PTS No !"  maxlength="100"  value="{{site_data.pts_no}}">
                            </div>
                            <span class="error-message error-message-site-pts_no"></span>
                        </div>
                         <div class="form-group col-sm-3">
                            <label>7. Survey No</label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"  maxlength="100" value="{{site_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-site-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                                <label>8. Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="village" name="village" class="form-control" placeholder="Enter Village !"  maxlength="100" onblur="checkValidation('site', 'village', villageValidationMessage);" value="{{site_data.village}}">
                            </div>
                            <span class="error-message error-message-site-village"></span>
                        </div>
                    
                    </div>

            <div class="row">
                     <div class="form-group col-sm-6">
                            <label>9. Plot Area <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="plot_area" name="plot_area" onchange="Site.listview.getFees(this);"
                                        data-placeholder="Status !" onblur="checkValidation('site', 'plot_area', plotAreaValidationMessage);">
                                    <option value="">Select Plot Area</option>
                                    <option value="500sqm">Plot area utpo 500 sqm</option>
                                    <option value="501to1000sqm">Plot area from 501 to 1000 sqm</option>
                                    <option value="above1000">Above 1000 sqm</option>
                                </select>
                            </div>
                            <span class="error-message error-message-site-plot_area"></span>
                        </div>
                 
                        <div class="form-group col-sm-6">
                            <label>10. Fees <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fees" name="fees" class="form-control" placeholder="Fees !" maxlength="10">
                            </div>
                            <span class="error-message error-message-site-fees"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-12" id="site_plan_container_for_site">
                            <label>11. Copy of Site Plan issued by City Survey office (latest Original). <span style="color: red;">* <br</span></label><br>
                            <input type="file" id="site_plan_for_site" name="site_plan_for_site"
                                   accept="image/pdf">
                             <div class="error-message error-message-site-site_plan_for_site"></div>
                        </div>

                     <div class="form-group col-sm-12" id="site_plan_name_container_for_site" style="display: none;">
                            <label>11.1 Copy of Site Plan. <span style="color: red;">*<br> </label><br>
                            <a id="site_plan_name_download" target="_blank"><label id="site_plan_name_image_for_site" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 

                  <div class="row">
                        <div class="form-group col-sm-12" id="I_XIV_nakal_container_for_site">
                            <label>12. Copy of I & XIV Nakal (latest Original). <span style="color: red;">* <br</span></label><br>
                            <input type="file" id="I_XIV_nakal_for_site" name="I_XIV_nakal_for_site"
                                   accept="image/pdf">
                             <div class="error-message error-message-site-I_XIV_nakal_for_site"></div>
                        </div>

                     <div class="form-group col-sm-12" id="I_XIV_nakal_name_container_for_site" style="display: none;">
                            <label>12.1 Copy of I & XIV Nakal. <span style="color: red;">*<br> </label><br>
                            <a id="I_XIV_nakal_name_download" target="_blank"><label id="I_XIV_nakal_name_image_for_site" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 


                     <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_site">
                            <label>13. Signature <span style="color: red;">* <br></label><br>
                            <input type="file" id="seal_and_stamp_for_site" name="seal_and_stamp_for_site"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif,image/pdf">
                            <div class="error-message error-message-site-seal_and_stamp_for_site"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_site" style="display: none;">
                            <label>13. Principal Employer Seal & Stamp <span style="color: red;">* <br></label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_site" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    
                     <hr class="m-b-1rem"> 
                     
                    <div class="form-group">
                        <button type="button" id="submit_btn_for_site" class="btn btn-sm btn-success" onclick="Site.listview.askForSubmitSite({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="Site.listview.loadSiteData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>