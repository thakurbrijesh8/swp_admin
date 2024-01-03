<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Zone Information</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application of Zone Information</div>
            </div>
            <form role="form" id="zone_form" name="zone_form" onsubmit="return false;">
                
                <input type="hidden" id="zone_id" name="zone_id" value="{{zone_id}}">
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
                                    data-placeholder="Select District" style="width: 100%;" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-zone-district"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.Name of Applicant<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" value="{{name_of_applicant}}" readonly="">
                            </div>
                            <span class="error-message error-message-zone-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Date of Application <span class="color-nic-red">*</span></label>
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
                            <label>4. Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                             <input type="text" id="address" name="address" class="form-control" value="{{address}}"readonly="">
                            </div>
                            <span class="error-message error-message-zone-address"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Mobile No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="mobile_no" name="mobile_no" class="form-control"  value="{{mobile_no}}" readonly="">
                            </div>
                            <span class="error-message error-message-zone-mobile_no"></span>
                        </div>
                    
                    </div>

                       <div class="row">
                        <div class="form-group col-sm-3">
                         <label>6. PTS No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="pts_no" name="pts_no" class="form-control" placeholder="Enter PTS No !"  maxlength="100" value="{{pts_no}}" readonly="">
                            </div>
                            <span class="error-message error-message-zone-pts_no"></span>
                        </div>
                         <div class="form-group col-sm-3">
                            <label>7. Survey No<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No !"  maxlength="100" value="{{survey_no}}" readonly="">
                            </div>
                            <span class="error-message error-message-zone-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                                <label>8. Village<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="village" name="village" class="form-control"  value=" {{village}}" readonly="">
                            </div>
                            <span class="error-message error-message-zone-village"></span>
                        </div>
                    
                    </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="site_plan_container_for_zone">
                            <label>9. Copy of Zone Plan issued by City Survey office.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="site_plan_for_zone" name="site_plan_for_zone"
                                   accept="image/pdf">
                             <div class="error-message error-message-zone-site_plan_for_zone"></div>
                        </div>

                     <div class="form-group col-sm-12" id="site_plan_name_container_for_zone" style="display: none;">
                            <label>9.1 Copy of Zone Plan.<span style="color: red;">*<br></span></label><br>
                            <a id="site_plan_name_download" target="_blank"><label id="site_plan_name_image_for_zone" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>

                      <div class="row">
                        <div class="form-group col-sm-12" id="I_XIV_nakal_container_for_zone">
                            <label>10. Copy of I & XIV Nakal.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="I_XIV_nakal_for_zone" name="I_XIV_nakal_for_zone"
                                   accept="image/pdf">
                             <div class="error-message error-message-zone-I_XIV_nakal_for_zone"></div>
                        </div>

                     <div class="form-group col-sm-12" id="I_XIV_nakal_name_container_for_zone" style="display: none;">
                            <label>10.1 Copy of I & XIV Nakal.<span style="color: red;">*<br></span></label><br>
                            <a id="I_XIV_nakal_name_download" target="_blank"><label id="I_XIV_nakal_name_image_for_zone" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
               
                   
                      <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_zone_view">
                            <label>11. Signature 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_zone_view" style="display: none;">
                            <label>11. Signature <span style="color: red;">*<br></span></label><br>
                            <a id="seal_and_stamp_download" target="_blank">
                                <img id="seal_and_stamp_name_image_for_zone_view" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>

                    <hr class="m-b-1rem"> 


                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Zone.listview.loadZoneData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>