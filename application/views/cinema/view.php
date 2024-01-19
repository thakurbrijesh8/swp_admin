<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM (I) </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See rule 11) </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application of license under rule 11 of the Dadra and Nagar Haveli & Daman and Diu Cinema ( Regulation of </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Exihibition by Video ) Rules, 1985.</div>
            </div>
            <form role="form" id="cinema_form" name="cinema_form" onsubmit="return false;">

                <input type="hidden" id="cinema_id" name="cinema_id" value="{{cinema_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            Collector,<br>
                            Dadra and Nagar Haveli & Daman and Diu.<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-cinema-district"></span>
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
                            <label>2. Name of applicant <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Name of Applicant !"
                                       maxlength="100" value="{{name_of_applicant}}" disabled="" >
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label>3. Father's Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="father_name" name="father_name" class="form-control" placeholder="Father's Name !" maxlength="100" value="{{father_name}}" disabled="">
                            </div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label>4. Date of Birth <span class="color-nic-red">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="dob" id="dob" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{dob}}" disabled="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Permanent Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="permanent_address" name="permanent_address" class="form-control" placeholder="Permanent Address !"
                                          maxlength="100" disabled="">{{permanent_address}}</textarea>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Temporary Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="temporary_address" name="temporary_address" class="form-control" placeholder="Temporary Address !" maxlength="100" disabled="">{{temporary_address}}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>7. Name of place and description where exhibition of film for public shall be made by the video cassette Recorder Link <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="video_cassette_recorder" name="video_cassette_recorder"  disabled=""class="form-control" placeholder="Provide Exhibition Video Cassette Recorder Link !" maxlength="100" value="{{video_cassette_recorder}}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>8. Documents referred to in rule 11 of the Dadra and Nagar Haveli & Daman and Diu Cinema ( Regulation of Exhibition by Video ) Rules 1985 namely :</label>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>(a) - In the case of a building ?</label>&nbsp;
                            <input type="checkbox" id="is_case_of_building" name="is_case_of_building" class="checkbox" value="{{is_checked}}" disabled="">
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="row building_details_div" style="display: none">
                        <div class="form-group col-sm-12" id="plan_of_building_document_container">
                            <label>I. Please attach the site plan of the building as approved by the Mamlatdar in counsultation with Associate Town
                                Planner, and give the names, places  and distance by public road of the Proposed site to the nearest place of exhibition etc. Attached <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="plan_of_building_document_name_container" style="display: none;">
                            <label>I. Please attach the site plan of the building as approved by the Mamlatdar in counsultation with Associate Town
                                Planner, and give the names, places  and distance by public road of the Proposed site to the nearest place of exhibition etc. Attached <span style="color: red;">* </span></label><br>
                            <a id="plan_of_building_document_download" target="_blank"><lable id="plan_of_building_document_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>

                        </div>
                    </div>
                    <div class="row building_details_div" style="display: none">
                        <div class="form-group col-sm-5">
                            <label>NAME <span style="color: red;">* </span></label>
                            <input type="text" id="name_of_building" name="name_of_building" class="form-control" placeholder="Name of Building !"
                                   maxlength="100" disabled="" value="{{name_of_building}}">
                        </div>
                        <div class="form-group col-sm-4">
                            <label>PLACE <span style="color: red;">* </span></label>
                            <input type="text" id="place_of_building" name="place_of_building" class="form-control" placeholder="Place of Building !"
                                   maxlength="100" disabled="" value="{{place_of_building}}">
                        </div>
                        <div class="form-group col-sm-3">
                            <label>DISTANCE <span style="color: red;">* </span></label>
                            <input type="text" id="distance_of_building" name="distance_of_building" class="form-control" placeholder="Distance of Building !"
                                   maxlength="100" disabled="" value="{{distance_of_building}}">
                        </div>
                    </div>
                    <div class="row building_details_div" style="display: none">
                        <div class="form-group col-sm-12">
                            <label>No such place within radious of 300 meters from the proposed Video house.</label>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>1. Exhibition of film on Television, screen through Video cassette recorder. </label>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>2. School, Collage etc. </label>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>3. Hospital etc. </label>
                        </div>
                        <div class="form-group col-sm-12">
                            <label>4. Temples, Mosques, Church and other religious institution </label>
                        </div>
                    </div>
                    <div class="row building_details_div" style="display: none">
                        <div class="form-group col-sm-12" id="character_licence_certificate_container">
                            <label>II. Certificate of Chief of Police (regarding character of the license). <span style="color: red;">* </span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="character_licence_certificate_name_container" style="display: none;">
                            <label>II. Certificate of Chief of Police regarding character of the license. <span style="color: red;">* </span> </label><br>
                            <a id="character_licence_certificate_download" target="_blank"><lable id="character_licence_certificate_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>
                        </div>
                        <div class="form-group col-sm-12" id="photo_state_copy_container">
                            <label>III. Photo-state copy of license obtained for the commercial use video/television under the Indian Telegraph Act, 1885 (No. 13 of 1885). <span style="color: red;">*</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="photo_state_copy_name_container" style="display: none;">
                            <label>III. Photo-state copy of license obtained for the commercial use video/television under the Indian Telegraph Act, 1885 (No. 13 of 1885). <span style="color: red;">* </span></label><br>
                            <a id="photo_state_copy_download" target="_blank"><lable id="photo_state_copy_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>
                        </div>
                    </div>
                    <div class="row building_details_div" style="display: none">
                        <div class="form-group col-sm-12" id="ownership_document_container">
                            <label>IV. Documents showing the ownership or tenancy of the place <span style="color: red;"> *</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="ownership_document_name_container" style="display: none;">
                            <label>IV. Documents showing the ownership or tenancy of the place <span style="color: red;">* </span></label><br>
                            <a id="ownership_document_download" target="_blank"><lable id="ownership_document_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>
                        </div>
                        <div class="form-group col-sm-12" id="motor_vehicles_document_container">
                            <label>V. In the case of omnibus used as a contract carriage, a photo-state copy of the documents of its registration under the motor Vehicles Act, 1939. <span style="color: red;"> *</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="motor_vehicles_document_name_container" style="display: none;">
                            <label>V. In the case of omnibus used as a contract carriage, a photo-state copy of the documents of its registration under the motor Vehicles Act, 1939. <span style="color: red;">* </span></label><br>
                            <a id="motor_vehicles_document_download" target="_blank"><lable id="motor_vehicles_document_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>9. If any other trade or business is located in the main premises where the video shows are to be exhibited :</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="business_trade_authority_license_container">
                            <label>I. Has license for such trade or business has been from the competent authority. <span style="color: red;">*</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="business_trade_authority_license_name_container" style="display: none;">
                            <label>I. Has license for such trade or business has been from the competent authority. <span style="color: red;">* </span></label><br>
                            <a id="business_trade_authority_license_download" target="_blank"><lable id="business_trade_authority_license_name_image" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid blue;">{{VIEW_UPLODED_DOCUMENT}}</lable></a>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>II. Whether by conducting the Video exhibitions the trade or business for which the license has been granted is likely to be affected. <span style="color: red;">*</span></label><br>
                            <div class="input-group">
                                <input type="text" id="tb_license_affected" name="tb_license_affected" class="form-control" placeholder="Trade or business for which the license has been granted is likely to be affected !" maxlength="100" value="{{tb_license_affected}}" disabled="">
                            </div>
                            <span class="error-message error-message-cinema-tb_license_affected"></span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 20px;">
                        <div class="form-group col-sm-12">
                            <label>10. Area in square of the</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>I. Building <span style="color: red;">* </span></label>
                            <input type="text" id="building_as" name="building_as" class="form-control" placeholder="Area Square of Building !"
                                   maxlength="100" disabled="" value="{{building_as}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label>II. Auditorium <span style="color: red;">* </span></label>
                            <input type="text" id="auditorium_as" name="auditorium_as" class="form-control" placeholder="Area Square of Auditorium !"
                                   maxlength="100" disabled="" value="{{auditorium_as}}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>III. Passages and Gangways <span style="color: red;">* </span></label>
                            <input type="text" id="passages_and_gangways_as" name="passages_and_gangways_as" class="form-control" placeholder="Area Square of Passages and Gangways !"
                                   maxlength="100" disabled="" value="{{passages_and_gangways_as}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label>IV. Urinals and W.C. <span style="color: red;">* </span></label>
                            <input type="text" id="urinals_and_wc_as" name="urinals_and_wc_as" class="form-control" placeholder="Area Square of Urinals and W.C. !"
                                   maxlength="100" disabled=""  value="{{urinals_and_wc_as}}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. Time schedule for exhibition of film <span style="color: red;">* </span></label>
                            <input type="text" id="time_schedule_film" name="time_schedule_film" class="form-control" placeholder="Time Schedule for exhibition of film !"
                                   maxlength="100" disabled=""  value="{{time_schedule_film}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label>12. Width of television screen / Video Scope Screen Setting arrangement in the building  <span style="color: red;">* </span></label>
                            <input type="text" id="screen_width" name="screen_width" class="form-control" placeholder="Width of television screen / Video Scope Screen Setting arrangement in the building !"
                                   maxlength="100" disabled=""  value="{{screen_width}}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_cinema">
                            <label>13. Signature <span style="color: red;">* </span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_cinema" style="display: none;">
                            <label>13. Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_cinema" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks  <span style="color: red;">*</span></label>
                            <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Cinema.listview.loadCinemaData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>