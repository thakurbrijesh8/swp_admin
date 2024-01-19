<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Questionnaires for recognition as manufacturer of Boiler & Boiler components</div>
                
            </div>
            <form role="form" id="boiler_manufacture_form" name="boiler_manufacture_form" onsubmit="return false;">
                
                <input type="hidden" id="boilermanufacture_id" name="boilermanufacture_id" value="{{boilermanufacture_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District</label>
                            <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" disabled="" style="width: 100%;">
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('boiler-manufacture', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name Of the firm<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_firm" name="name_of_firm" class="form-control" placeholder="Enter Name Of the firm !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'name_of_firm', firmNameValidationMessage);" value="{{name_of_firm}}" readonly>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-name_of_firm"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Address of the Workshop<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="address_of_workshop" name="address_of_workshop" class="form-control" placeholder="Enter Address of the Workshop !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'address_of_workshop', workshopAddressValidationMessage);" readonly>{{address_of_workshop}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-address_of_workshop"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Address for Communication<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="address_of_communication" name="address_of_communication" class="form-control" placeholder="Enter Address for Communication !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'address_of_communication', commAddressValidationMessage);" readonly>{{address_of_communication}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-address_of_communication"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Type of jobs executed by the firm earlier,With special Reference to their maximum
                            Working pressure, temperature And the Materials involved<span class="color-nic-red"></span></label>
                            <div class="input-group" style="margin-top: 22px;">
                                <textarea id="type_of_jobs" name="type_of_jobs" class="form-control" placeholder="Enter Type of jobs executed by the firm !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'type_of_jobs', jobTypeValidationMessage);" readonly>{{type_of_jobs}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-type_of_jobs"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Whether having rectifier / generator, grinder,General tools And tackles, dye penetrant kit,Expander and measuring instruments or any Other tools and tackles NDT facilities, Heat Treatment etc<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="tools_and_tackles" name="tools_and_tackles" class="form-control" placeholder="Enter tools and tackles !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'tools_and_tackles', toolsValidationMessage);" readonly>{{tools_and_tackles}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-tools_and_tackles"></span>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">7. Detailed list of technical personnel & supervisory staff with qualification and experience</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="technicalpersonnelList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th> Supervisor Name</th>
                                        <th> Qualification</th>
                                        <th> Experience</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="technical_personnel_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_technicalpersonnel" onclick="BoilerManufacture.listview.addMultipleTechnicalPersone({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add supervisory staff
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">8. List of permanent welders with their experience :(enclose Xerox copy of welders certificate issued Under IBR)</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="welderslList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th> welder Name</th>
                                        <th> Experience</th>
                                        <!-- <th> welder Name</th> -->
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="welders_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_welder" onclick="BoilerManufacture.listview.addMultipleweldersdetail({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add welders
                            </button>
                        </div>
                    </div><br/><br/>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Whether the firm is prepared to execute the job Strictly in conformity with the IBR and maintain A high standard of work<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="standard_of_work" name="standard_of_work" class="form-control" placeholder="Enter A high standard of work !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'standard_of_work', standardWorkValidationMessage);" readonly>{{standard_of_work}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-standard_of_work"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Whether the firm is prepared to accept full Responsibility for the work done and is prepared To clarify any controversial issue, If required ?<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="controversial_issue" name="controversial_issue" class="form-control" placeholder="Enter full Responsibility for the work done !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'controversial_issue', controversialIssueValidationMessage);" readonly>{{controversial_issue}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-controversial_issue"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Whether the firm has an internal quality control System of their own ?</label>&nbsp;
                            <input type="checkbox" id="is_internal_quality_control" name="is_internal_quality_control" class="checkbox" value="{{is_checked}}" disabled>
                            <span class="error-message error-message-shop-is_internal_quality_control"></span>
                        </div>
                        <div class="form-group col-sm-6 quality_control_detail_div" style="display: none">
                            <label>11.1 If so, give details<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="quality_control_detail" name="quality_control_detail" class="form-control" placeholder="Enter internal quality control Details !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'quality_control_detail', qualityControlValidationMessage);" readonly>{{quality_control_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-quality_control_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Details of power sanction<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="power_sanction" name="power_sanction" class="form-control" placeholder="Enter Details of power sanction!"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'power_sanction', powerSanctionValidationMessage);" readonly>{{power_sanction}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-power_sanction"></span>
                        </div>
                        <!-- <div class="form-group col-sm-6">
                            <label class="mb-none">12. Copy of NOC from Local authorities to undertake Manufacturing facility are to be enclosed</label>
                            <label><span style="color: red;">(Maximum File Size: 5MB)</span></label><br/>
                            <input type="file" id="copy_of_noc" name="copy_of_noc"
                                   accept="image/jpg,image/png,image/jpeg,image/gif" onchange="imagePdfValidation(this, nocCopyValidationMessage, 'copy_of_noc');">
                            <h5 id="copy_of_noc_container" style="display: none; margin-top: 0px;"></h5>
                            <span class="error-message error-message-boiler-manufacture-copy_of_noc"></span>
                        </div> -->
                        <div class="form-group col-sm-6 copy_of_noc_div" id="copy_of_noc_container_for_manufacturer">
                            <label>13. Copy of NOC from Local authorities to undertake Manufacturing facility are to be enclosed<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="copy_of_noc_for_manufacturer" name="copy_of_noc_for_manufacturer"
                                   accept="application/pdf">
                            <div class="error-message error-message-boiler-manufacture-copy_of_noc_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="copy_of_noc_name_container_for_manufacturer" style="display: none;">
                            <label>13. Copy of NOC from Local authorities to undertake Manufacturing facility are to be enclosed<span style="color: red;"> <br></span></label><br>
                            <a id="copy_of_noc_name_image_for_manufacturer_download" target="_blank"><label id="copy_of_noc_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>14. Whether the firm is conversant with the Boilers Act,1923 and Indian Boiler Regulation, 1950<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="conversant_with_boiler" name="conversant_with_boiler" class="form-control" placeholder="Enter the firm is conversant with the Boilers Act,1923 and Indian Boiler Regulation, 1950 !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'conversant_with_boiler', conversantValidationMessage);" readonly>{{conversant_with_boiler}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-conversant_with_boiler"></span>
                        </div>
                        <!-- <div class="form-group col-sm-6">
                            <label class="mb-none">14. plan of workshop showing the location of machines,Fabrication equipments, NDT equipments covering All the space area</label>
                            <label><span style="color: red;">(Maximum File Size: 5MB)</span></label><br/>
                            <input type="file" id="plan_of_workshop" name="plan_of_workshop"
                                   accept="image/jpg,image/png,image/jpeg,image/gif" onchange="imagePdfValidation(this, workshopPlanValidationMessage, 'plan_of_workshop');">
                            <h5 id="plan_of_workshop_container" style="display: none; margin-top: 0px;"></h5>
                            <span class="error-message error-message-boiler-manufacture-plan_of_workshop"></span>
                        </div> -->
                        <div class="form-group col-sm-6 plan_of_workshop_div" id="plan_of_workshop_container_for_manufacturer">
                            <label>15. plan of workshop showing the location of machines,Fabrication equipments, NDT equipments covering All the space area<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="plan_of_workshop_for_manufacturer" name="plan_of_workshop_for_manufacturer"
                                   accept="application/pdf">
                            <div class="error-message error-message-boiler-manufacture-plan_of_workshop_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-6" id="plan_of_workshop_name_container_for_manufacturer" style="display: none;">
                            <label>15. plan of workshop showing the location of machines,Fabrication equipments, NDT equipments covering All the space area<span style="color: red;"> <br></span></label><br>
                            <a id="plan_of_workshop_name_image_for_manufacturer_download" target="_blank"><label id="plan_of_workshop_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    </div>
                    <br/>
                   <div class="row">
                        <div class="form-group col-sm-6">
                            <label>16. Whether the aforesaid instruments are calibrated periodically</label>&nbsp;
                            <input type="checkbox" id="is_instruments_calibrated" name="is_instruments_calibrated" class="checkbox" value="{{is_checked}}" disabled>
                            <span class="error-message error-message-shop-is_instruments_calibrated"></span>
                        </div>
                        <div class="form-group col-sm-6 instruments_calibrate_detail_div" style="display: none">
                            <label>16.1 If so, give details<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="instruments_calibrate_detail" name="instruments_calibrate_detail" class="form-control" placeholder="Enter aforesaid instruments are calibrated Details !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'instruments_calibrate_detail', instrumentCalibrateValidationMessage);" readonly>{{instruments_calibrate_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-instruments_calibrate_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>17. Details of Testing facilities available<span class="color-nic-red"></span></label>
                            <div class="input-group" style="margin-top: 22px;">
                                <textarea id="testing_facility" name="testing_facility" class="form-control" placeholder="Enter Details of Testing facilities available !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'testing_facility', testingFacilityValidationMessage);" readonly>{{testing_facility}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-testing_facility"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>18. Whether the recording system of documents, data storing,Processing etc has been computerized with Internet<span class="color-nic-red"></span></label>
                            <div class="input-group">
                                <textarea id="recording_system" name="recording_system" class="form-control" placeholder="Enter the recording system of documents, data storing,Processing etc has been computerized with Internet !"
                                       maxlength="100" onblur="checkValidation('boiler-manufacture', 'recording_system', recordSystemValidationMessage);" readonly>{{recording_system}}</textarea>
                            </div>
                            <span class="error-message error-message-boiler-manufacture-recording_system"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="occupancy_certificate_copy_container_for_manufacturer">
                            <label>19.  A Copy of Occupancy Certificate<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="occupancy_certificate_copy_for_manufacturer" name="occupancy_certificate_copy_for_manufacturer"
                                   accept="pdf">
                            <div class="error-message error-message-boiler-manufacture-occupancy_certificate_copy_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="occupancy_certificate_copy_name_container_for_manufacturer" style="display: none;">
                            <label>19.  A Copy of Occupancy Certificate<span style="color: red;"> <br></span></label><br>
                            <a id="occupancy_certificate_copy_name_image_for_manufacturer_download" target="_blank"><label id="occupancy_certificate_copy_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="factory_license_copy_container_for_manufacturer">
                            <label>20.  A Copy of Factory License<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="factory_license_copy_for_manufacturer" name="factory_license_copy_for_manufacturer"
                                   accept="pdf">
                            <div class="error-message error-message-boiler-manufacture-factory_license_copy_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="factory_license_copy_name_container_for_manufacturer" style="display: none;">
                            <label>20.  A Copy of Factory License<span style="color: red;"> <br></span></label><br>
                            <a id="factory_license_copy_name_image_for_manufacturer_download" target="_blank"><label id="factory_license_copy_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="machinery_layout_copy_container_for_manufacturer">
                            <label>21.  Copy of Plan of Machinery layout along with the list of equipment & machinery, tools & tackles and NDT facilities<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="machinery_layout_copy_for_manufacturer" name="machinery_layout_copy_for_manufacturer"
                                   accept="pdf">
                            <div class="error-message error-message-boiler-manufacture-machinery_layout_copy_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="machinery_layout_copy_name_container_for_manufacturer" style="display: none;">
                            <label>21.  Copy of Plan of Machinery layout along with the list of equipment & machinery, tools & tackles and NDT facilities<span style="color: red;"> <br></span></label><br>
                            <a id="machinery_layout_copy_name_image_for_manufacturer_download" target="_blank"><label id="machinery_layout_copy_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="qualification_detail_container_for_manufacturer">
                            <label>22.  Details of a qualification & experience of personnel employed (Certificates of welders are to be enclosed).<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="qualification_detail_for_manufacturer" name="qualification_detail_for_manufacturer"
                                   accept="pdf">
                            <div class="error-message error-message-boiler-manufacture-qualification_detail_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="qualification_detail_name_container_for_manufacturer" style="display: none;">
                            <label>22.  Details of a qualification & experience of personnel employed (Certificates of welders are to be enclosed).<span style="color: red;"> <br></span></label><br>
                            <a id="qualification_detail_name_image_for_manufacturer_download" target="_blank"><label id="qualification_detail_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="shop_photograph_copy_container_for_manufacturer">
                            <label>23.  Few photographs of shop floor showing equipment, machinery and NDT facilities.<span style="color: red;"> <br></span></label><br>
                            <input type="file" id="shop_photograph_copy_for_manufacturer" name="shop_photograph_copy_for_manufacturer"
                                   accept="pdf">
                            <div class="error-message error-message-boiler-manufacture-shop_photograph_copy_for_manufacturer"></div>
                        </div>
                        <div class="form-group col-sm-12" id="shop_photograph_copy_name_container_for_manufacturer" style="display: none;">
                            <label>23.  Few photographs of shop floor showing equipment, machinery and NDT facilities.<span style="color: red;"> <br></span></label><br>
                            <a id="shop_photograph_copy_name_image_for_manufacturer_download" target="_blank"><label id="shop_photograph_copy_name_image_for_manufacturer" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="signature_and_seal_container_for_manufacturer">
                            <label>24. Signature & Seal<span style="color: red;"> <br></span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="signature_and_seal_name_container_for_manufacturer" style="display: none;">
                            <label>24. Signature & Seal<span style="color: red;"> <br></span></label><br>
                            <!-- <img id="signature_and_seal_name_image_for_manufacturer" style="width: 250px; height: 250px; border: 2px solid blue;"> -->
                            <a id="signature_and_seal_download" target="_blank"><img id="signature_and_seal_name_image_for_manufacturer" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="BoilerManufacture.listview.loadBoilerManufactureData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>