<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Factory Building Plan Approval</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM 1 </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Prescribed Under Rule 3 </div>
            </div>
            <form role="form" id="building_plan_form" name="building_plan_form" onsubmit="return false;">
                <input type="hidden" id="buildingplan_id" name="buildingplan_id" value="{{buildingplan_id}}">
                <div class="card-body">
                    <div class="row">
                        <label style="margin-left: 5px;"><h5>1. Details Of Applicant</h5></label>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District</label>
                            <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" disabled="" style="width: 100%;">
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('building-plan', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-building-plan-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 Name Of Applicant<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="applicant_name" name="applicant_name" class="form-control" placeholder="Enter Name Of Applicant !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'applicant_name', applicantNameValidationMessage);" value="{{applicant_name}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-applicant_name"></span>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.2 Phone No. Of Applicant<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="applicant_phoneno" name="applicant_phoneno" class="form-control" placeholder="Enter Phone No. !"
                                       maxlength="100" onblur="checkValidationForMobileNumber('building-plan', 'applicant_phoneno', applicantPhnoValidationMessage);" value="{{applicant_phoneno}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-applicant_phoneno"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.3 Email Of Applicant<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" placeholder="Enter Email !"
                                       maxlength="100" onblur="checkValidationForEmail('building-plan', 'email', applicantEmailValidationMessage);" value="{{email}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-email"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.4 Full Address of Applicant</label>
                            <div class="input-group">
                                <textarea id="applicant_address" name="applicant_address" class="form-control" placeholder="Enter Full Address of Applicant !" maxlength="100" onblur="checkValidation('building-plan', 'applicant_address', factoryAddressValidationMessage);" readonly>{{applicant_address}}</textarea>
                            </div>
                            <span class="error-message error-message-building-plan-applicant_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <label style="margin-left: 5px;"><h5>2. Factory Details</h5></label>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.1 Name Of Factory<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_name" name="factory_name" class="form-control" placeholder="Enter Name Of Factory !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_name', factoryNameValidationMessage);" value="{{factory_name}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.2 Factory Building<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_building" name="factory_building" class="form-control" placeholder="Enter Factory Building !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_building', factoryBuildingValidationMessage);" value="{{factory_building}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_building"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>2.3 Factory Street No./Sector<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_streetno" name="factory_streetno" class="form-control" placeholder="Enter Factory Street No./Sector !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_streetno', factorySectorValidationMessage);" value="{{factory_streetno}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_streetno"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>2.4 City<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_city" name="factory_city" class="form-control" placeholder="Enter City !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_city', factoryCityValidationMessage);" value="{{factory_city}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_city"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>2.5 Pincode<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_pincode" name="factory_pincode" class="form-control" placeholder="Enter Pincode !" onblur="checkPincode($(this));"
                                       maxlength="6"  value="{{factory_pincode}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_pincode"></span>
                        </div>
                    </div>
                    <div class="row">
                        <label style="margin-left: 5px;"><h5>3. Situation Of Factory</h5></label>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.1 District<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_district" name="factory_district" class="form-control" placeholder="Enter District !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_district', factoryDistrictValidationMessage);" value="{{factory_district}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Town / Village<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="factory_town" name="factory_town" class="form-control" placeholder="Enter Town !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'factory_town', factoryTownValidationMessage);" value="{{factory_town}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-factory_town"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.3 Nearest Police Station<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="nearest_police_station" name="nearest_police_station" class="form-control" placeholder="Enter Nearest Police Station !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'nearest_police_station', policeStationValidationMessage);" value="{{nearest_police_station}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-nearest_police_station"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.4 Nearest Railway Station<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="nrearest_railway_station" name="nrearest_railway_station" class="form-control" placeholder="Enter Railway Station !"
                                       maxlength="100" onblur="checkValidation('building-plan', 'nrearest_railway_station', railwayStationValidationMessage);" value="{{nrearest_railway_station}}" readonly>
                            </div>
                            <span class="error-message error-message-building-plan-nrearest_railway_station"></span>
                        </div>
                    </div>
                    <div class="row">
                        <label style="margin-left: 5px;"><h5>4. Particulars of Plant </h5></label>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4.1 Particulars Of Plant</label>
                            <div class="input-group">
                                <textarea id="particulars_of_plant" name="particulars_of_plant" class="form-control" placeholder="Enter particulars of palnt !" maxlength="100" onblur="checkValidation('building-plan', 'particulars_of_plant', planValidationMessage);" readonly>{{particulars_of_plant}}</textarea>
                            </div>
                            <span class="error-message error-message-building-plan-particulars_of_plant"></span>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="form-group col-sm-6 upload_flow_chart_div" id="upload_flow_chart_container_for_bp">
                            <label>5. Upload Flow Chart of the Manufacturing Process Supplemented by rief<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="upload_flow_chart_for_bp" name="upload_flow_chart_for_bp"
                                   accept="application/pdf">
                            <div class="error-message error-message-building-plan-upload_flow_chart_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-6" id="upload_flow_chart_name_container_for_bp" style="display: none;">
                            <label>5. Upload Flow Chart of the Manufacturing Process Supplemented by rief<span style="color: red;"> <br></span></label><br>
                            <a id="upload_flow_chart_name_image_for_bp_download" target="_blank"><label id="upload_flow_chart_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6 upload_site_plan_div" id="upload_site_plan_container_for_bp">
                            <label>6. Upload site Plan of Factory and immediate surroundings<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="upload_site_plan_for_bp" name="upload_site_plan_for_bp"
                                   accept="application/pdf">
                            <div class="error-message error-message-building-plan-upload_site_plan_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-6" id="upload_site_plan_name_container_for_bp" style="display: none;">
                            <label>6. Upload site Plan of Factory and immediate surroundings<span style="color: red;"> <br></span></label><br>
                            <a id="upload_site_plan_name_image_for_bp_download" target="_blank"><label id="upload_site_plan_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6 upload_elevation_document_div" id="upload_elevation_document_container_for_bp">
                            <label>7. Upload Elevation Document<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="upload_elevation_document_for_bp" name="upload_elevation_document_for_bp"
                                   accept="application/pdf">
                            <div class="error-message error-message-building-plan-upload_elevation_document_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-6" id="upload_elevation_document_name_container_for_bp" style="display: none;">
                            <label>7. Upload Elevation Document<span style="color: red;"> <br></span></label><br>
                            <a id="upload_elevation_document_name_image_for_bp_download" target="_blank"><label id="upload_elevation_document_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="form-group col-sm-12" id="building_drawing_plans_container_for_bp">
                            <label>5.  Two sets of Factory building drawings showing the plans, Elevations Cross sections, the location of site (duly signed by the Occupier and the Architect) and its surroundings along with Form no. 1.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="building_drawing_plans_for_bp" name="building_drawing_plans_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-building_drawing_plans_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="building_drawing_plans_name_container_for_bp" style="display: none;">
                            <label>5.  Two sets of Factory building drawings showing the plans, Elevations Cross sections, the location of site (duly signed by the Occupier and the Architect) and its surroundings along with Form no. 1.<span style="color: red;"> <br></span></label><br>
                            <a id="building_drawing_plans_name_image_for_bp_download" target="_blank"><label id="building_drawing_plans_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="provisional_registration_container_for_bp">
                            <label>6.  Copy of Provisional registration –SSI / in principle clearance letter for MSI / LSI. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="provisional_registration_for_bp" name="provisional_registration_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-provisional_registration_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="provisional_registration_name_container_for_bp" style="display: none;">
                            <label>6.  Copy of Provisional registration –SSI / in principle clearance letter for MSI / LSI. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <a id="provisional_registration_name_image_for_bp_download" target="_blank"><label id="provisional_registration_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="project_report_container_for_bp">
                            <label>7.  Project Report giving the list of machineries, flow process, manufacturing Process, raw materials, finished products and bye / intermediate products. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="project_report_for_bp" name="project_report_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-project_report_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="project_report_name_container_for_bp" style="display: none;">
                            <label>7.  Project Report giving the list of machineries, flow process, manufacturing Process, raw materials, finished products and bye / intermediate products. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <a id="project_report_name_image_for_bp_download" target="_blank"><label id="project_report_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="mode_of_storage_container_for_bp">
                            <label>8. Quantity and mode of storage of LPG, Petroleum fuels, hazardous substances if any / signed statement on company’s letter head that it is not applicable. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="mode_of_storage_for_bp" name="mode_of_storage_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-mode_of_storage_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="mode_of_storage_name_container_for_bp" style="display: none;">
                            <label>8. Quantity and mode of storage of LPG, Petroleum fuels, hazardous substances if any / signed statement on company’s letter head that it is not applicable. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <a id="mode_of_storage_name_image_for_bp_download" target="_blank"><label id="mode_of_storage_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="drawing_of_treatment_plant_container_for_bp">
                            <label>9. Position and the drawing of the Effluent Treatment Plant, if any / signed statement on company’s letter head that it is not applicable. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="drawing_of_treatment_plant_for_bp" name="drawing_of_treatment_plant_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-drawing_of_treatment_plant_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="drawing_of_treatment_plant_name_container_for_bp" style="display: none;">
                            <label>9. Position and the drawing of the Effluent Treatment Plant, if any / signed statement on company’s letter head that it is not applicable. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <a id="drawing_of_treatment_plant_name_image_for_bp_download" target="_blank"><label id="drawing_of_treatment_plant_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="machinery_layout_container_for_bp">
                            <label>10. Machinery lay out in the building drawings along with their respective power Rating. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="machinery_layout_for_bp" name="machinery_layout_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-machinery_layout_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="machinery_layout_name_container_for_bp" style="display: none;">
                            <label>10. Machinery lay out in the building drawings along with their respective power Rating. (Not applicable for gala construction).<span style="color: red;"> <br></span></label><br>
                            <a id="machinery_layout_name_image_for_bp_download" target="_blank"><label id="machinery_layout_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="questionnaire_copy_container_for_bp">
                            <label>11. A copy of Questionnaire.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="questionnaire_copy_for_bp" name="questionnaire_copy_for_bp"
                                   accept="pdf">
                            <div class="error-message error-message-building-plan-questionnaire_copy_for_bp"></div>
                        </div>
                        <div class="form-group col-sm-12" id="questionnaire_copy_name_container_for_bp" style="display: none;">
                            <label>11. A copy of Questionnaire.<span style="color: red;"> <br></span></label><br>
                            <a id="questionnaire_copy_name_image_for_bp_download" target="_blank"><label id="questionnaire_copy_name_image_for_bp" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_of_applicant_container_for_bp">
                            <label>12. Signature of Applicant<span style="color: red;"> <br></span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="sign_of_applicant_name_container_for_bp" style="display: none;">
                            <label>12. Signature of Applicant<span style="color: red;"> <br></span></label><br>
                            
                            <a id="sign_of_applicant_download" target="_blank"><img id="sign_of_applicant_name_image_for_bp" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="BuildingPlan.listview.loadBuildingPlanData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>