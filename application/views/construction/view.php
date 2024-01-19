<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
            <h3 class="card-title" style="float: none; text-align: center;">Construction Permission</h3>
                <h3 class="card-title" style="float: none; text-align: center;"> (Annexure - 2) </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for Development work, to erect, re-erect or to make alteration in any place in a building and for organized development/layouts or subdivison of land. </div>
            </div>
            <form role="form" id="construction_form" name="construction_form" onsubmit="return false;">

                <input type="hidden" id="construction_id" name="construction_id" value="{{construction_id}}">
                <div class="card-body">
                    <div class="row">
                       <div class="form-group col-sm-6">
                             To,<br>
                             The Competent Authority,<br>
                             UT Administration of Dadra and Nagar Haveli & Daman and Diu,<br>
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
                            <span class="error-message error-message-construction-district"></span>
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
                            <label>2. Name of the Owner <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_owner" name="name_of_owner" class="form-control" 
                                       maxlength="100" value="{{name_of_owner}}" disabled="">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Address of the Owner. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="address_of_owner" name="address_of_owner" class="form-control"  maxlength="100" value="{{address_of_owner}}" disabled="">
                            </div>
                        </div>
                    </div>
                     <div class="row">
                        <div class="form-group col-sm-3">
                            <label>4. Survey No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="building_no" name="building_no" class="form-control" maxlength="100" value="{{building_no}}" disabled="">
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label>5. Plot No <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                          <input type="text" id="plot_no" name="plot_no" class="form-control" maxlength="100" value="{{plot_no}}" disabled="">
                            </div>
                        </div>
                          <div class="form-group col-sm-6">
                            <label> 6. Village <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="village" name="village" class="form-control"  maxlength="100" value="{{village}}" disabled="">
                            </div>
                        </div>
                    </div>

                
                <div class="row">
                      <div class="form-group col-sm-6">
                            <label> 7. Name of Architect / Engineer <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name" name="name" class="form-control"  maxlength="100" value="{{name}}" disabled="">
                            </div>
                        </div>
                         <div class="form-group col-sm-6">
                            <label> 8. Architect/ Engineer /Structural License No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="license_no" name="license_no" class="form-control"  maxlength="100" value="{{license_no}}" disabled="">
                            </div>
                        </div>
                    </div>

                     <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Architect/ Engineer /Structural License valid upto <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" name="valid_upto_date" id="valid_upto_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{valid_upto_date}}"readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-construction-valid_upto_date"></span>
                        </div> 
                      <div class="form-group col-sm-6">
                            <label>9. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" class= "form-control" placeholder="dd-mm-yyyy"
                                       value="{{application_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-construction-application_date"></span>
                        </div>
                         
                    </div>

                      <br/>
                      <h2 class="box-title f-w-b page-header f-s-20px m-b-0" >Document Required to be Uploaded with the Application</h2>
                      <br/>
                  
                                    <div class="row">
                         <div  class="annexure_III_item_container_for_construction" style="display: none;"> 
                        <div class="form-group col-sm-12" id="annexure_III_container_for_construction">
                            <label>11. Annexure III. <span style="color: red;">* &nbsp; <a href="<?=base_url();?>documents/construction/annexure-3.doc">(Download Format of  Annexure III )</a><br></span></label><br>
                            <input type="file" id="annexure_III_for_construction" name="annexure_III_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-annexure_III_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="annexure_III_name_container_for_construction" style="display: none;">
                       <label class="dnh_for_cp_div">11.1 Annexure.<span style="color: red;">* </span></label>
                            <label class="dd_for_cp_div">11.1 Annexure III. </label><br>
                            <a id="annexure_III_name_download" target="_blank"><label id="annexure_III_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>

                    <div class="row">
                      <div  class="annexure_IV_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="annexure_IV_container_for_construction">
                            <label>12. Annexure IV. <span style="color: red;">*  &nbsp; <a href="<?=base_url();?>documents/construction/annexure-4.doc">(Download Format of  Annexure IV )</a><br></span></label><br>
                            <input type="file" id="annexure_IV_for_construction" name="annexure_IV_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-annexure_IV_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="annexure_IV_name_container_for_construction" style="display: none;">
                            <label>12.1 Annexure IV . </label><br>
                            <a id="annexure_IV_name_download" target="_blank"><label id="annexure_IV_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                  </div> 


                   <div class="row">
                    <div  class="copy_of_na_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="copy_of_na_container_for_construction">
                            <label>13. Copy of N.A. Sanad /Order/ Property card for existing Gaothan area. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="copy_of_na_for_construction" name="copy_of_na_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-copy_of_na_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="copy_of_na_name_container_for_construction" style="display: none;">
                       <label class="dnh_for_cp_div" style="display: none">12.1  N.A Order <span style="color: red;">* </span></label>
                            <label class="dd_for_cp_div">13.1  Copy of N.A. </label><br>
                            <a id="copy_of_na_name_download" target="_blank"><label id="copy_of_na_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                  </div> 

                  <div class="row">
                    <div  class="original_certified_map_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="original_certified_map_container_for_construction">
                            <label>14. Original certified Map of Survey/Plot no. issued by City Survey office, Daman. (Latest Original) <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="original_certified_map_for_construction" name="original_certified_map_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-original_certified_map_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="original_certified_map_name_container_for_construction" style="display: none;">
                      <label class="dnh_for_cp_div" style="display: none">13.1 Certified Map. <span style="color: red;">* </span></label>
                            <label class="dd_for_cp_div">14.1 Original certified Map of Survey/Plot no. </label><br>
                            <a id="original_certified_map_name_download" target="_blank"><label id="original_certified_map_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                  </div> 

                  <div class="row">
                    <div  class="I_and_XIV_nakal_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="I_and_XIV_nakal_container_for_construction">
                            <label>15. Copy of RoR (I and XIV nakal Copy or 7/12 extract Copy). <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="I_and_XIV_nakal_for_construction" name="I_and_XIV_nakal_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-I_and_XIV_nakal_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="I_and_XIV_nakal_name_container_for_construction" style="display: none;">
                      <label class="dnh_for_cp_div" style="display: none">14.1 7x12 Nakal of land. <span style="color: red;">* </span></label>
                            <label class="dd_for_cp_div">15.1 Copy of RoR (I and XIV nakal Copy or 7/12 extract Copy). </label><br>
                            <a id="I_and_XIV_nakal_name_download" target="_blank"><label id="I_and_XIV_nakal_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>

                 

                   <div class="row">
                    <div  class="building_plan_dcr_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="building_plan_dcr_container_for_construction">
                            <label>16. Building Plan with complete details as per Rule 6.7 to 6.12 of DCR 2005 (Building plan shall also include Key Plan/Location plan, Site plan and Service plan.) <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="building_plan_dcr_for_construction" name="building_plan_dcr_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-building_plan_dcr_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="building_plan_dcr_name_container_for_construction" style="display: none;">
                      <label class="dnh_for_cp_div" style="display: none">15.1 Building Plan <span style="color: red;">* </span></label>
                            <label class="dd_for_cp_div">16.1 Building Plan with complete details as per Rule 6.7 to 6.12 of DCR 2005 (Building plan shall also include Key Plan/Location plan, Site plan and Service plan.) </label><br>
                            <a id="building_plan_dcr_name_download" target="_blank"><label id="building_plan_dcr_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                  </div> 

                  <div class="row">
                    <div  class="cost_estimate_item_container_for_construction" style="display: none;"> 
                        <div class="form-group col-sm-12" id="cost_estimate_container_for_construction">
                            <label>17. Cost Estimate for the proposed building from the Registered Architect/engineer. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="cost_estimate_for_construction" name="cost_estimate_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-cost_estimate_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="cost_estimate_name_container_for_construction" style="display: none;">
                            <label>17.1 Cost Estimate. </label><br>
                            <a id="cost_estimate_name_download" target="_blank"><label id="cost_estimate_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>
                   
            <div class="row">
              <div  class="noc_coast_guard_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12" id="noc_coast_guard_container_for_construction">
                            <label>18. NOC of the coast Guard Authority for Height Restriction/ Receive copy of application made for issuance of NOC to Coast Guard Authority. <span style="color: red;">* <br></span></label><br>
                            <input type="file" id="noc_coast_guard_for_construction" name="noc_coast_guard_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-noc_coast_guard_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="noc_coast_guard_name_container_for_construction" style="display: none;">
                            <label>18.1 NOC of the coast Guard Authority. </label><br>
                            <a id="noc_coast_guard_name_download" target="_blank"><label id="noc_coast_guard_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div>
                  </div>


                   <div class="row">
                        <div class="form-group col-sm-12">
                          <div  class="annexure_V_item_container_for_construction" style="display: none;">
                            <label>19 Annexure V (Whether the building is high rise). &emsp;</label>
                            <input type="radio" id="annexureV_yes" name="annexureV" disabled="" value=" {{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="annexureV_no" name="annexureV" disabled=""  value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-annexureV"></span>
                        </div>
                        <div class="annexureV_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="annexure_V_container_for_construction" >
                                <label>19.1 Annexure V. <a href="<?=base_url();?>documents/construction/annexure-5.doc">(Download Format of  Annexure V )</a> </label><br>
                                <input type="file" id="annexure_V_for_construction" name="annexure_V_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-annexure_V_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="annexure_V_name_container_for_construction" style="display: none;">
                                <label>19.1 Annexure V.  </label><br>
                                <a target="_blank" id="annexure_V_download"><label id="annexure_V_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                             </div>
                        </div>
                            <span class="error-message error-message-construction-annexure_V"></span>
                    </div>
                  </div>

                     <div class="row">
                       <div  class="annexureVI_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>20. Annexure VI. &emsp;</label>
                            <input type="radio" id="annexureVI_yes" name="annexureVI"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="annexureVI_no" name="annexureVI" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="annexure_VI_container_for_construction">
                            <label>20.1 Annexure VI.</label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-construction-annexure_VI_for_construction"></div>
                        </div>
                        <div class="form-group col-sm-12" id="annexure_VI_name_container_for_construction" style="display: none;">
                            <label>20.1 Annexure VI.</label><br>
                            <a target="_blank" id="annexure_VI_download"><label id="annexure_VI_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>

                      <div class="row">
                         <div  class="layout_plan_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                          <label class="dnh_for_cp_div" style="display: none">16. Completion Certificate of the layout (Xerox copy).<span class="color-nic-red">*</span></label>

                            <label class="dd_for_cp_div">21. If part of a Private Industrial Estate,  a certificate of completion of Development work as per approval layout plan or singed statement on company’s letterhead that it is not applicable.  &emsp;</label>
                            <input type="radio" id="layoutplan_yes" name="layoutplan"  
                                   disabled=""  value="{{IS_CHECKED_YES}}"> Yes &emsp;  
                            <input type="radio" id="layoutplan_no" name="layoutplan" 
                                   disabled=""  value="{{IS_CHECKED_NO}}"> No
                        </div>
                        <div class="col-12 m-b-5px" id="layout_plan_container_for_construction">
                            <label>21.1 Certificate of completion of Development work as per approval layout plan or singed statement on company’s letterhead that it is not applicable.</label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-construction-layout_plan_for_construction"></div>
                        </div>
                        <div class="form-group col-sm-12" id="layout_plan_name_container_for_construction" style="display: none;">
                           <label class="dnh_for_cp_div" style="display: none">16.1 Completion Certificate of the layout (Xerox copy).<span class="color-nic-red">*</span></label>
                            <label class="dd_for_cp_div">21.1 Certificate of completion of Development work as per approval layout plan or singed statement on company’s letterhead that it is not applicable.</label><br>
                            <a target="_blank" id="layout_plan_download"><label id="layout_plan_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                  </div>


                <div class="row">
                  <div  class="provisional_noc_fire_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>22. Provisional NOC from Fire Department (Applicable to all building except Residential building having height less than 15m). &emsp;</label>
                            <input type="radio" id="provisional_noc_yes" name="provisional_noc"  
                                     disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="provisional_noc_no" name="provisional_noc" 
                                    disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-provisional_noc"></span>
                        </div>
                        <div class="provisional_noc_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="provisional_noc_fire_container_for_construction" >
                                <label>22.1 Provisional NOC from Fire Department.</label><br>
                                <input type="file" id="provisional_noc_fire_for_construction" name="provisional_noc_fire_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-provisional_noc_fire_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="provisional_noc_fire_name_container_for_construction" style="display: none;">
                                <label>22.1 Provisional NOC from Fire Department. </label><br>
                                <a target="_blank" id="provisional_noc_fire_download"><label id="provisional_noc_fire_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                           
                             </div>
                        </div>
                            <span class="error-message error-message-construction-provisional_noc_fire"></span>
                    </div>
                  </div>

                      <div class="row">
                          <div  class="crz_clearance_certificate_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>23.CRZ clearance certificate of the concerned authority (This is required in case of land falling under CRZ). &emsp;</label>
                            <input type="radio" id="crz_clearance_yes" name="crz_clearance"  
                                     disabled="" ="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="crz_clearance_no" name="crz_clearance" 
                                    disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-crz_clearance"></span>
                        </div>
                        <div class="crz_clearance_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="crz_clearance_certificate_container_for_construction" >
                                <label>23.1 CRZ clearance certificate of the concerned authority.</label><br>
                                <input type="file" id="crz_clearance_certificate_for_construction" name="crz_clearance_certificate_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-crz_clearance_certificate_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="crz_clearance_certificate_name_container_for_construction" style="display: none;">
                                <label>23.1 CRZ clearance certificate of the concerned authority. </label><br>
                                <a target="_blank" id="crz_clearance_certificate_download"><label id="crz_clearance_certificate_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                             
                             </div>
                        </div>
                            <span class="error-message error-message-construction-crz_clearance_certificate"></span>
                    </div>
                  </div>

                    <div class="row">
                          <div  class="sub_division_order_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                          <label class="dnh_for_cp_div" style="display: none">17. Copy of Approved Layout (in case of plotted lands, (Industrial Lay- out and Residential cum Commercial Lay-out) (Xerox copy). <span class="color-nic-red">*</span></label>
                            <label class="dd_for_cp_div">24. True copy of approved layout plan and Sub division order (This is applicable if land is part of private Industrial Estate/ Private sub division). &emsp;</label>
                            <input type="radio" id="sub_division_yes" name="sub_division"  
                                    disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="sub_division_no" name="sub_division" 
                                    disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-sub_division"></span>
                        </div>
                        <div class="sub_division_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="sub_division_order_container_for_construction" >
                                <label>24.1 Copy of the amalgamation order.</label><br>
                                <input type="file" id="sub_division_order_for_construction" name="sub_division_order_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-sub_division_order_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="sub_division_order_name_container_for_construction" style="display: none;">
                              <label class="dnh_for_cp_div" style="display: none">17.1 Copy of Approved Layout <span class="color-nic-red">*</span></label>
                                <label class="dd_for_cp_div">24.1 Copy of the amalgamation order. </label><br>
                                <a target="_blank" id="sub_division_order_download"><label id="sub_division_order_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                          
                             </div>
                        </div>
                            <span class="error-message error-message-construction-sub_division_order"></span>
                    </div>
                  </div>

                    <div class="row">
                      <div  class="amalgamation_order_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>25. Copy of the amalgamation order, if relevant. &emsp;</label>
                            <input type="radio" id="amalgamation_yes" name="amalgamation"  
                                     disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="amalgamation_no" name="amalgamation" 
                                    disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-amalgamation"></span>
                        </div>
                        <div class="amalgamation_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="amalgamation_order_container_for_construction" >
                                <label>25.1 Copy of the amalgamation order.</label><br>
                                <input type="file" id="amalgamation_order_for_construction" name="amalgamation_order_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-amalgamation_order_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="amalgamation_order_name_container_for_construction" style="display: none;">
                                <label>25.1 Copy of the amalgamation order.</label><br>
                                <a target="_blank" id="amalgamation_order_download"><label id="amalgamation_order_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                             
                             </div>
                        </div>
                            <span class="error-message error-message-construction-amalgamation_order"></span>
                    </div>
                  </div>

                     <div class="row">
                       <div  class="occupancy_certificate_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                          <label class="dnh_for_cp_div" style="display: none">18. Copy of approved plan, Construction Permission Oder and Occupancy Certificate (in case of Revised Proposal) (Xerox copy). <span class="color-nic-red">*</span></label>
                            <label class="dd_for_cp_div">26. If application is for revised plan/additional and alteration to the existing building, then true copy of the construction permission along with approved plan and Occupancy Certificate is required. &emsp;</label>
                            <input type="radio" id="occupancy_yes" name="occupancy" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="occupancy_no" name="occupancy" disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-occupancy"></span>
                        </div>
                        <div class="occupancy_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="occupancy_certificate_container_for_construction" >
                                <label>26.1 Occupancy Certificate.</label><br>
                                <input type="file" id="occupancy_certificate_for_construction" name="occupancy_certificate_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-occupancy_certificate_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="occupancy_certificate_name_container_for_construction" style="display: none;">
                              <label class="dnh_for_cp_div" style="display: none">18.1 Copy of approved plan, Construction Permission Oder and Occupancy Certificate <span style="color: red;">* </span></label>
                                <label class="dd_for_cp_div">26.1 Occupancy Certificate.</label><br>
                                <a target="_blank" id="occupancy_certificate_download"><label id="occupancy_certificate_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                             
                             </div>
                        </div>
                            <span class="error-message error-message-construction-occupancy_certificate"></span>
                    </div>
                  </div>

                      <div class="row">
                        <div  class="certificate_land_acquisition_item_container_for_construction" style="display: none;">
                        <div class="form-group col-sm-12">
                            <label>27. Certificate or order of the Land Acquisition Officer if claiming benefit of additional FSI in lieu of compensation (If applicable). &emsp;</label>
                            <input type="radio" id="certificate_land_yes" name="certificate_land" disabled="" value="{{IS_CHECKED_YES}}"> Yes &emsp; 
                            <input type="radio" id="certificate_land_no" name="certificate_land" disabled="" value="{{IS_CHECKED_NO}}"> No
                            <br><span class="error-message error-message-construction-certificate_land"></span>
                        </div>
                        <div class="certificate_land_div" style="display: none;">
                            <div class="col-12 m-b-5px" id="certificate_land_acquisition_container_for_construction">
                                <label>27.1 Certificate or order of the Land Acquisition.</label><br>
                                <input type="file" id="certificate_land_acquisition_for_construction" name="certificate_land_acquisition_for_construction"
                                   accept="image/pdf">
                                <div class="error-message error-message-construction-certificate_land_acquisition_for_construction"></div>
                            </div>
                            <div class="form-group col-sm-12" id="certificate_land_acquisition_name_container_for_construction" style="display: none;">
                                <label>27.1 Certificate or order of the Land Acquisition. </label><br>
                                <a target="_blank" id="certificate_land_acquisition_download"><label id="certificate_land_acquisition_name_image_for_construction" style="border: 2px solid black;" class="btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                              
                             </div>
                        </div>
                            <span class="error-message error-message-construction-certificate_land_acquisition"></span>
                    </div>
                  </div>
                            
                 <div class="row">
                  <div  class="seal_and_stamp_item_container_for_construction" style="display: none;">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_construction">
                            <label>28. Signature</label><br>
                            <input type="file" id="seal_and_stamp_for_construction" name="seal_and_stamp_for_construction"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif,image/pdf">
                            <div class="error-message error-message-construction-seal_and_stamp_for_construction"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_construction" style="display: none;">
                            <label>28. Principal Employer Seal & Stamp <span style="color: red;">* <br></span></label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_construction" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                          
                        </div>
                    </div>
                  </div>
               

                  <div class="row">
                        <div  class="licensed_engineer_signature_item_container_for_construction" style="display: none;">
                        <div class="col-12 m-b-5px" id="licensed_engineer_signature_container_for_construction">
                            <label>29. Signature of the Licensed Architect / Engineer / Surveyor / Structural Engineer </label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="licensed_engineer_signature_name_container_for_construction" style="display: none;">
                            <label>29. Signature of the Licensed Architect / Engineer / Surveyor / StructuralEngineer <span style="color: red;">*<br></span></label><br>
                            <a id="licensed_engineer_signature_download" target="_blank">
                                <img id="licensed_engineer_signature_name_image_for_construction" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                  </div>

                  <div class="row">
                         <div  class="labour_cess_item_container_for_construction" style="display: none;"> 
                        <div class="form-group col-sm-12" id="labour_cess_container_for_construction">
                            <label>19. Labour Cess Certificate issued by RDC(S) (Xerox copy).<span style="color: red;">* &nbsp; <br></span></label><br>
                            <input type="file" id="labour_cess_for_construction" name="labour_cess_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-labour_cess_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="labour_cess_name_container_for_construction" style="display: none;">
                            <label >19.1 Labour Cess Certificate.<span style="color: red;">* </span></label><br>
                            <a id="labour_cess_download" target="_blank"><label id="labour_cess_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>

                 <div class="row">
                         <div  class="undertaking_item_container_for_construction" style="display: none;"> 
                        <div class="form-group col-sm-12" id="undertaking_container_for_construction">
                            <label>20. Undertaking on Rs. 100/- Stamp Paper for Labour Cess<span style="color: red;">* &nbsp; <br></span></label><br>
                            <input type="file" id="undertaking_for_construction" name="undertaking_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-undertaking_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="undertaking_name_container_for_construction" style="display: none;">
                            <label >20.1 Undertaking on Rs. 100/- Stamp Paper for Labour Cess.<span style="color: red;">* </span></label><br>
                            <a id="undertaking_download" target="_blank"><label id="undertaking_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>

                  <div class="row">
                         <div  class="fire_noc_item_container_for_construction" style="display: none;"> 
                        <div class="form-group col-sm-12" id="fire_noc_container_for_construction">
                            <label>21. Provisional NOC from Fire Department (Applicable to all building except Residential building having height less than 15m).<span style="color: red;">* &nbsp; <a href="<?=base_url();?>documents/construction/annexure-3.doc">(Download Format of  Annexure III )</a><br></span></label><br>
                            <input type="file" id="fire_noc_for_construction" name="fire_noc_for_construction"
                                   accept="image/pdf">
                             <div class="error-message error-message-construction-fire_noc_for_construction"></div>
                        </div>

                     <div class="form-group col-sm-12" id="fire_noc_name_container_for_construction" style="display: none;">
                            <label >21.1 Provisional NOC from Fire Department.<span style="color: red;">* </span></label><br>
                            <a id="fire_noc_download" target="_blank"><label id="fire_noc_name_image_for_construction" class="btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                  </div> 
                </div>

                   <div class="row">
                        <div  class="owner_signature_item_container_for_construction" style="display: none;">
                        <div class="col-12 m-b-5px" id="owner_signature_container_for_construction">
                            <label>22.  Signature of Owner </label>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="owner_signature_name_container_for_construction" style="display: none;">
                            <label>22.1 Signature of Owner<span style="color: red;">*</span></label><br>
                            <a id="owner_signature_download" target="_blank">
                                <img id="owner_signature_name_image_for_construction" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                  </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('construction');"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>