<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                 <h3 class="card-title" style="float: none; text-align: center;">  <label class="dd_for_oc_div" style="display: none;">Annexure - 13</label></h3>
                   <h3 class="card-title" style="float: none; text-align: center;">  <label class="dnh_for_oc_div" style="display: none;">Annexure - 14</label></h3>
                <h3 class="card-title" style="float: none; text-align: center;">Form of Completion Certificate</h3>
            </div>
            <form role="form" id="occupancycertificate_form" name="occupancycertificate_form" onsubmit="return false;">
                
                <input type="hidden" id="occupancycertificate_id" name="occupancycertificate_id" value="{{occupancycertificate_data.occupancy_certificate_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-occupancycertificate f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br/>
                            Competent Authority,<br/>
                            Daman<br/>
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
                            <span class="error-message error-message-occupancycertificate-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;"  disabled="">
                            </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Survey No. : </label>
                            <div class="input-group">
                                <input type="text" id="survey_no" name="survey_no" class="form-control" placeholder="Enter Survey No.  !"
                                       maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'survey_no', surveyNoValidationMessage);" value="{{occupancycertificate_data.survey_no}}">
                            </div>
                            <span class="error-message error-message-occupancycertificate-survey_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Plot No : </label>
                            <div class="input-group">
                                <input type="text" id="plot_no" name="plot_no" class="form-control" placeholder="Enter Plot No  !"
                                       maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'plot_no', plotNoValidationMessage);" value="{{occupancycertificate_data.plot_no}}">
                            </div>
                            <span class="error-message error-message-occupancycertificate-plot_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Situated at Village  : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="situated_at" name="situated_at" class="form-control" placeholder="Enter Situated at Village !"
                                       maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'situated_at', situatedAtValidationMessage);" value="{{occupancycertificate_data.situated_at}}">
                            </div>
                            <span class="error-message error-message-occupancycertificate-situated_at"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Permission / License No with Date issue by PDA Daman<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="license_no" id="license_no" class="form-control" 
                                       value="{{license_no}}" readonly onblur="checkValidation('occupancycertificate', 'license_no', licenseNoValidationMessage);">
                                
                            </div>
                            <span class="error-message error-message-occupancycertificate-license_no"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Building Completed On</label>
                            <div class="input-group date">
                                <input type="text" name="completed_on" id="completed_on" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{completed_on}}" readonly onblur="checkValidation('occupancycertificate', 'completed_on', completionOnDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-occupancycertificate-completed_on"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Name of the Licensed Architect / Engineer / Surveyor / Structural Engineer  : </label>
                            <div class="input-group">
                                <input type="text" id="licensed_engineer_name" name="licensed_engineer_name" class="form-control" placeholder="Enter Name of the Licensed Architect / Engineer / Surveyor / Structural Engineer  !"
                                       maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'licensed_engineer_name', licensedEngineerNameValidationMessage);" value="{{occupancycertificate_data.licensed_engineer_name}}">
                            </div>
                            <span class="error-message error-message-occupancycertificate-licensed_engineer_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Registration No. of the Licensed Architect / Engineer / Surveyor / Structural Engineer : <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="occupancy_registration_no" name="occupancy_registration_no" class="form-control" placeholder="Enter Registration No. of the Licensed Architect / Engineer / Surveyor / Structural Engineer  !"
                                       maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'occupancy_registration_no', occupancyRegistrationNoValidationMessage);" value="{{occupancycertificate_data.occupancy_registration_no}}">
                            </div>
                            <span class="error-message error-message-occupancycertificate-occupancy_registration_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Valid upto</label>
                            <div class="input-group date">
                                <input type="text" name="occupancy_valid_upto" id="occupancy_valid_upto" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{occupancy_valid_upto}}" readonly onblur="checkValidation('occupancycertificate', 'occupancy_valid_upto', occupancyValidUptoValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-occupancycertificate-occupancy_valid_upto"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Address  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="address" name="address" class="form-control" placeholder="Enter If Any Defense Installations Are Involved  !" maxlength="100" readonly onblur="checkValidation('occupancycertificate', 'address', occupancyAddressValidationMessage);">{{occupancycertificate_data.address}}</textarea>
                            </div>
                            <span class="error-message error-message-occupancycertificate-address"></span>
                        </div>
                    </div>
                
                    <h2 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h2>
                    <br/>
                     <div class="row">
                      <div  class="copy_of_construction_permission_item_container_for_occupancycertificate" style="display: none;"> 
                        <div class="form-group col-sm-12" id="copy_of_construction_permission_container_for_occupancycertificate">
                            <label>11. Copy Of Construction Permission Order.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="copy_of_construction_permission_for_occupancycertificate" name="copy_of_construction_permission_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-copy_of_construction_permission_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="copy_of_construction_permission_name_container_for_occupancycertificate" style="display: none;">
                        <label class="dnh_for_oc_div" style="display: none">11.1 Copy of Construction Permission Order <span style="color: red;">*<br></span></label>
                            <label class="dd_for_oc_div">11.1 Copy Of Construction Permission Order.<span style="color: red;">*<br></span></label><br>
                            <a id="copy_of_construction_permission_download" target="_blank"><label id="copy_of_construction_permission_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
              </div>
               
                     <div class="row">
                        <div  class="copy_of_building_plan_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="copy_of_building_plan_container_for_occupancycertificate">
                            <label>12. Copy of approved building plan.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="copy_of_building_plan_for_occupancycertificate" name="copy_of_building_plan_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-copy_of_building_plan_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="copy_of_building_plan_name_container_for_occupancycertificate" style="display: none;">
                         <label class="dnh_for_oc_div" style="display: none">12.1 Copy of approved building plan.<span style="color: red;">* </span></label>
                            <label class="dd_for_oc_div">12.1 Copy of approved building plan.<span style="color: red;">*<br></span></label><br>
                            <a id="copy_of_building_plan_download" target="_blank"><label id="copy_of_building_plan_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
              </div>

                     <div class="row">
                         <div  class="stability_certificate_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12">
                             <label>13. Structural stability certificate from licensed Architect or Structural Engineer as per the format in Annexure -14 (Wheather the Building is high rise Construction) ?</label>&nbsp;
                            <input type="radio" id="is_stability_certificate_yes" name="is_stability_certificate" class="" value="{{VALUE_ONE}}" disabled="">&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_stability_certificate_no" name="is_stability_certificate" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled="">&nbsp;No
                            <span class="error-message error-message-occupancycertificate-is_stability_certificate"></span>
                        </div>
                        <div class="col-12 m-b-5px" id="stability_certificate_container_for_occupancycertificate">
                            <label>13.1 Structural stability certificate from licensed Architect or Structural Engineer as per the format in Annexure -14<a href="documents/departments/PDA/Annexure - 14.pdf" download>(Download Formate of  Annexure -14)</a> 
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-occupancycertificate-stability_certificate_for_occupancycertificate"></div>
                        </div>
                        <div class="form-group col-sm-12" id="stability_certificate_name_container_for_occupancycertificate" style="display: none;">
                            <label>13.1 Structural stability certificate from licensed Architect or Structural Engineer as per the format in Annexure -14<a href="documents/departments/PDA/Annexure - 14.pdf" download>(Download Formate of  Annexure -14)</a><span style="color: red;">*<br></span></label><br>
                            <a target="_blank" id="stability_certificate_download"><label id="stability_certificate_name_image_for_occupancycertificate" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>

                <div class="row">
                        <div  class="building_height_noc_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="building_height_noc_container_for_occupancycertificate">
                            <label>14. Final NOC from Coast Guard Authority for building height.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="building_height_noc_for_occupancycertificate" name="building_height_noc_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-building_height_noc_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="building_height_noc_name_container_for_occupancycertificate" style="display: none;">
                            <label>14. Final NOC from Coast Guard Authority for building height.<span style="color: red;">*<br></span></label><br>
                            <a id="building_height_noc_download" target="_blank"><label id="building_height_noc_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
              </div>
          
                     <div class="row">
                        <div  class="fire_noc_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>15.1 Final NOC from Department of Fire & Emergency Services ?</label>&nbsp;
                            <input type="radio" id="is_fire_noc_yes" name="is_fire_noc" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_fire_noc_no" name="is_fire_noc" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-occupancycertificate-is_fire_noc"></span>
                        </div>
                        <div class="col-12 m-b-5px" id="fire_noc_container_for_occupancycertificate">
                            <label>15.1 Final NOC from Department of Fire & Emergency Services (Applicable to all building except residential building with height less than 15.0 mts.)</label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-occupancycertificate-fire_noc_for_occupancycertificate"></div>
                        </div>
                        <div class="form-group col-sm-12" id="fire_noc_name_container_for_occupancycertificate" style="display: none;">
                            <label>15.1 Final NOC from Department of Fire & Emergency Services (Applicable to all building except residential building with height less than 15.0 mts.)<span style="color: red;">*<br></span></label><br>
                            <a target="_blank" id="fire_noc_download"><label id="fire_noc_name_image_for_occupancycertificate" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>

                    <div class="row">
                        <div  class="copy_of_water_harvesting_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="copy_of_water_harvesting_container_for_occupancycertificate">
                            <label>16. Photo copy of installed Rain water harvesting system. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="copy_of_water_harvesting_for_occupancycertificate" name="copy_of_water_harvesting_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-copy_of_water_harvesting_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="copy_of_water_harvesting_name_container_for_occupancycertificate" style="display: none;">
                         <label class="dnh_for_oc_div" style="display: none">13. Photo copy of installed Rain water harvesting system<span style="color: red;">* </span></label>
                            <label class="dd_for_oc_div">16.1 Photo copy of installed Rain water harvesting system. <span style="color: red;">*<br></span></label><br>
                            <a id="copy_of_water_harvesting_download" target="_blank"><label id="copy_of_water_harvesting_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
              </div>

        
                     <div class="row">
                         <div  class="existing_building_plan_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>17. If the building constructed as per approved building plan ?</label>&nbsp;
                            <input type="radio" id="is_existing_building_plan_yes" name="is_existing_building_plan" class="" value="{{VALUE_ONE}}" checked="" disabled="">&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_existing_building_plan_no" name="is_existing_building_plan" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled="">&nbsp;No
                            <span class="error-message error-message-occupancycertificate-is_existing_building_plan"></span>
                        </div>
                        <div class="col-12 m-b-5px" id="existing_building_plan_container_for_occupancycertificate">
                            <label>17.1 Existing building plan as per the actual construction carried out, if there is minor deviation from the approval plan.(if applicable)</label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-occupancycertificate-existing_building_plan_for_occupancycertificate"></div>
                        </div>
                        <div class="form-group col-sm-12" id="existing_building_plan_name_container_for_occupancycertificate" style="display: none;">
                            <label>17.1 Existing building plan as per the actual construction carried out, if there is minor deviation from the approval plan.(if applicable)<span style="color: red;">*<br></span></label><br>
                            <a target="_blank" id="existing_building_plan_download"><label id="existing_building_plan_name_image_for_occupancycertificate" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>
            
                     <div class="row">
                          <div  class="form_of_indemnity_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12">
                             <label class="dnh_for_oc_div" style="display: none">14. Form of Indemnity On Stamp paper of Rs. 20/- ?.<span style="color: red;">*</span></label>
                          <label class="dd_for_oc_div">18. Form of Indemnity On Stamp paper of Rs. 20/- ?</label>&nbsp;
                            <input type="radio" id="is_form_of_indemnity_yes" name="is_form_of_indemnity" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_form_of_indemnity_no" name="is_form_of_indemnity" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled>&nbsp;No
                            <span class="error-message error-message-occupancycertificate-is_form_of_indemnity"></span>
                        </div>
                        <div class="col-12 m-b-5px" id="form_of_indemnity_container_for_occupancycertificate">
                         
                             <label class="dnh_for_oc_div">14. Form of Indemnity On Stamp paper of Rs. 20/- ? <span style="color: red;">* </span>&emsp;</label>
                            <label class="dd_for_oc_div">18.1 Form of Indemnity On Stamp paper of Rs. 20/- (if application is for Part Occupancy).<a href="documents/departments/PDA/Annexure - 16.pdf" download>(Download Formate of  Annexure -16)</a></label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-occupancycertificate-form_of_indemnity_for_occupancycertificate"></div>
                        </div>
                        <div class="form-group col-sm-12" id="form_of_indemnity_name_container_for_occupancycertificate" style="display: none;">
                             <label class="dnh_for_oc_div">14. Form of Indemnity On Stamp paper of Rs. 20/- ? <span style="color: red;">* </span>&emsp;</label>
                            <label class="dd_for_oc_div">18.1 Form of Indemnity On Stamp paper of Rs. 20/- (if application is for Part Occupancy).<a href="documents/departments/PDA/Annexure - 16.pdf" download>(Download Formate of  Annexure -16)</a><span style="color: red;">*<br></span></label><br>
                            <a target="_blank" id="form_of_indemnity_download"><label id="form_of_indemnity_name_image_for_occupancycertificate" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>

                 <div class="row">
                    <div  class="annexure_14_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="annexure_14_container_for_occupancycertificate">
                            <label>15. Architect’s Completion Certificate. Annexure -14.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="annexure_14_for_occupancycertificate" name="annexure_14_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-annexure_14_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="annexure_14_name_container_for_occupancycertificate" style="display: none;">
                            <label >15.1 Architect’s Completion Certificate.<span style="color: red;">*<br></span></label><br>
                            <a id="annexure_14_download" target="_blank"><label id="annexure_14_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                 <div class="row">
                    <div  class="oc_part_oc_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="oc_part_oc_container_for_occupancycertificate">
                            <label>16.  Application to the Authority for obtaining full OC/ Part OC.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="oc_part_oc_for_occupancycertificate" name="oc_part_oc_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-oc_part_oc_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="oc_part_oc_name_container_for_occupancycertificate" style="display: none;">
                            <label >16.1  Application to the Authority for obtaining full OC/ Part OC.<span style="color: red;">*<br></span></label><br>
                            <a id="oc_part_oc_download" target="_blank"><label id="oc_part_oc_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                   <div class="row">
                    <div  class="fire_emergency_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="fire_emergency_container_for_occupancycertificate">
                            <label>17. Final NOC from Department of Fire & Emergency Services.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="fire_emergency_for_occupancycertificate" name="fire_emergency_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-fire_emergency_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="fire_emergency_name_container_for_occupancycertificate" style="display: none;">
                            <label >17.1 Final NOC from Department of Fire & Emergency Services.<span style="color: red;">*<br></span></label><br>
                            <a id="fire_emergency_download" target="_blank"><label id="fire_emergency_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                <div class="row">
                    <div  class="building_plan_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="building_plan_container_for_occupancycertificate">
                            <label>18. If the building constructed as per approved building plan?<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="building_plan_for_occupancycertificate" name="building_plan_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-building_plan_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="building_plan_name_container_for_occupancycertificate" style="display: none;">
                            <label >18.1 If the building constructed as per approved building plan?<span style="color: red;">*<br></span></label><br>
                            <a id="building_plan_download" target="_blank"><label id="building_plan_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                  <div class="row">
                    <div  class="stability_certificate_dnh_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="stability_certificate_dnh_container_for_occupancycertificate">
                            <label>19. Structural Stability Certificate Issued by Engineer (Annexture-15)<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="stability_certificate_dnh_for_occupancycertificate" name="stability_certificate_dnh_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-stability_certificate_dnh_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="stability_certificate_dnh_name_container_for_occupancycertificate" style="display: none;">
                            <label >19.1 Structural Stability Certificate Issued by Engineer (Annexture-15)<span style="color: red;">*<br></span></label><br>
                            <a id="stability_certificate_dnh_download" target="_blank"><label id="stability_certificate_dnh_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                    <div class="row">
                         <div  class="occupancy_certificate_dnh_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12">
                             <label>20. Occupancy Certificate if any granted earlier (Xerox copy)</label>&nbsp;
                            <input type="radio" id="is_occupancy_certificate_dnh_yes" name="is_occupancy_certificate_dnh" class="" value="{{VALUE_ONE}}" disabled="">&nbsp; Yes
                            &emsp;
                            <input type="radio" id="is_occupancy_certificate_dnh_no" name="is_occupancy_certificate_dnh" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" checked="" disabled="">&nbsp;No
                            <span class="error-message error-message-occupancycertificate-is_occupancy_certificate_dnh"></span>
                        </div>
                        <div class="col-12 m-b-5px" id="occupancy_certificate_dnh_container_for_occupancycertificate">
                            <label>20.1 Occupancy Certificate</label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-occupancycertificate-occupancy_certificate_dnh_for_occupancycertificate"></div>
                        </div>
                        <div class="form-group col-sm-12" id="occupancy_certificate_dnh_name_container_for_occupancycertificate" style="display: none;">
                            <label>20.1 Occupancy Certificate if any granted earlier (Xerox copy)<span style="color: red;">*<br></span></label><br>
                            <a target="_blank" id="occupancy_certificate_dnh_download"><label id="occupancy_certificate_dnh_name_image_for_occupancycertificate" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                </div>


                 <div class="row">
                    <div  class="existing_cp_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="existing_cp_container_for_occupancycertificate">
                            <label>21. Existing CP orders granted earlier  (Xerox copy)  <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="existing_cp_for_occupancycertificate" name="existing_cp_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-existing_cp_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="existing_cp_name_container_for_occupancycertificate" style="display: none;">
                            <label >21.1 Existing CP orders granted earlier <span style="color: red;">*<br></span></label><br>
                            <a id="existing_cp_download" target="_blank"><label id="existing_cp_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>


            <div class="row">
                    <div  class="labour_cess_certificate_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="labour_cess_certificate_container_for_occupancycertificate">
                            <label>22. Copy of Labour Cess certificate <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="labour_cess_certificate_for_occupancycertificate" name="labour_cess_certificate_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-labour_cess_certificate_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="labour_cess_certificate_name_container_for_occupancycertificate" style="display: none;">
                            <label >22.1 Copy of Labour Cess certificate <span style="color: red;">*<br></span></label><br>
                            <a id="labour_cess_certificate_download" target="_blank"><label id="labour_cess_certificate_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                <div class="row">
                    <div  class="valuation_certificate_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="valuation_certificate_container_for_occupancycertificate">
                            <label>23. Copy of Valuation Certificate from Govt. Approved Valuer.<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="valuation_certificate_for_occupancycertificate" name="valuation_certificate_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-valuation_certificate_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="valuation_certificate_name_container_for_occupancycertificate" style="display: none;">
                            <label >23.1 Copy of Valuation Certificate from Govt. Approved Valuer.<span style="color: red;">*<br></span></label><br>
                            <a id="valuation_certificate_download" target="_blank"><label id="valuation_certificate_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>


                <div class="row">
                    <div  class="bank_deposit_sleep_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="bank_deposit_sleep_container_for_occupancycertificate">
                            <label>24. Bank Deposit Sleep indicates deposit of Labour Cess amount in Govt. Account, Dena Bank, Silvassa Branch with signature and stamp of approval of Assistant Engineer, PWD/Building Inspector, DNH. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="bank_deposit_sleep_for_occupancycertificate" name="bank_deposit_sleep_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-bank_deposit_sleep_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="bank_deposit_sleep_name_container_for_occupancycertificate" style="display: none;">
                            <label >24.1 Bank Deposit Sleep indicates deposit of Labour Cess amount in Govt. Account, Dena Bank, Silvassa Branch with signature and stamp of approval of Assistant Engineer, PWD/Building Inspector, DNH. <span style="color: red;">*<br></span></label><br>
                            <a id="bank_deposit_sleep_download" target="_blank"><label id="bank_deposit_sleep_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>


            <div class="row">
                    <div  class="deviation_photographs_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="deviation_photographs_container_for_occupancycertificate">
                            <label>25. Submit existing building Plans copy with any type of deviation with Photographs. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="deviation_photographs_for_occupancycertificate" name="deviation_photographs_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-deviation_photographs_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="deviation_photographs_name_container_for_occupancycertificate" style="display: none;">
                            <label >25.1 Submit existing building Plans copy with any type of deviation with Photographs.<span style="color: red;">*<br></span></label><br>
                            <a id="deviation_photographs_download" target="_blank"><label id="deviation_photographs_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

            <div class="row">
                    <div  class="copy_7_12_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="copy_7_12_container_for_occupancycertificate">
                            <label>26. 7 x 12 (Original)<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="copy_7_12_for_occupancycertificate" name="copy_7_12_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-copy_7_12_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="copy_7_12_name_container_for_occupancycertificate" style="display: none;">
                            <label >26.1 7 x 12 (Original)<span style="color: red;">*<br></span></label><br>
                            <a id="copy_7_12_download" target="_blank"><label id="copy_7_12_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                    <div class="row">
                    <div  class="certificate_map_item_container_for_occupancycertificate" style="display: none;">
                        <div class="form-group col-sm-12" id="certificate_map_container_for_occupancycertificate">
                            <label>27. Certified Map (Original)<span style="color: red;">* <br></span></label><br>
                            <input type="file" id="certificate_map_for_occupancycertificate" name="certificate_map_for_occupancycertificate"
                                   accept="image/pdf">
                             <div class="error-message error-message-occupancycertificate-certificate_map_for_occupancycertificate"></div>
                        </div>

                     <div class="form-group col-sm-12" id="certificate_map_name_container_for_occupancycertificate" style="display: none;">
                            <label >27.1 Certified Map<span style="color: red;">*<br></span></label><br>
                            <a id="certificate_map_download" target="_blank"><label id="certificate_map_name_image_for_occupancycertificate" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                </div>

                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="OccupancyCertificate.listview.loadOccupancyCertificateData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>