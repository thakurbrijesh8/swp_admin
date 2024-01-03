<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF TOURISM </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT OF DADRA & NAGAR AND DAMAN & DIU  </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application Form for Registration of Travel Agent</div>
            </div>
            <form role="form" id="travelagent_form" name="travelagent_form" onsubmit="return false;">

                <input type="hidden" id="travelagent_id" name="travelagent_id" value="{{travelagent_data.travelagent_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-travelagent f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Director,<br>
                            Department of Tourism,<br>
                            UT Administration of Dadra & Nagar Haveli and  Daman & Diu.<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of the Person <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_person" name="name_of_person" class="form-control" placeholder="Name of Person !" maxlength="100" value="{{travelagent_data.name_of_person}}" 
                                       onblur="checkValidation('travelagent', 'name_of_person', personNameValidationMessage);">
                            </div>
                            <span class="error-message error-message-travelagent-name_of_person"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Name of the Travel Agency <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_travel_agency" name="name_of_travel_agency" class="form-control" placeholder="Name of the Travel Agency !" maxlength="100" value="{{travelagent_data.name_of_travel_agency}}" onblur="checkValidation('travelagent', 'name_of_travel_agency', travelAgencyNameValidationMessage);">
                            </div>
                            <span class="error-message error-message-travelagent-name_of_travel_agency"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Address of the Agency <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="address_of_agency" name="address_of_agency" class="form-control" placeholder="Address of the Agency !"
                                          maxlength="100" onblur="checkValidation('travelagent', 'address_of_agency', addressOfAgencyValidationMessage);">{{travelagent_data.address_of_agency}}</textarea>
                            </div>
                            <span class="error-message error-message-travelagent-address_of_agency"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Area where the travel agency is being operated/to be operated  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control select2" id="area_of_agency" name="area_of_agency" 
                                        data-placeholder="Select Area " style="width: 100%;" >
                                </select>
                            </div>
                            <span class="error-message error-message-travelagent-area_of_agency"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('travelagent', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-travelagent-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Fees <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fees" name="fees" class="form-control" placeholder="Fees !" maxlength="100" disabled="" value="{{TRAVEL_AGENCY_FEES}}">
                            </div>
                            <span class="error-message error-message-travelagent-name_of_person"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>6. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mob_no" name="mob_no" class="form-control" placeholder=" Mobile No. !"
                                   maxlength="10" onblur="checkNumeric($(this)); checkValidationForMobileNumber('travelagent', 'mob_no', mobileValidationMessage);" value="{{travelagent_data.mob_no}}">
                            <span class="error-message error-message-travelagent-mob_no"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="col-12 m-b-5px" id="copy_of_registration_container_for_travelagent">
                            <label>7. Upload Copy of Registration of firm/company (Issued by Municipality or Concerned Panchayat). <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="copy_of_registration_for_travelagent" name="copy_of_registration_for_travelagent"
                                   accept="image/pdf">
                            <div class="error-message error-message-travelagent-copy_of_registration_for_travelagent"></div>
                        </div>
                        <div class="form-group col-sm-12" id="copy_of_registration_name_container_for_travelagent" style="display: none;">
                            <label>7. Upload Copy of Registration of firm/company (Issued by Municipality or Concerned Panchayat). <span style="color: red;">* </label><br>
                            <a target="_blank" id="copy_of_registration_download"><label id="copy_of_registration_name_image_for_travelagent" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_travelagent">
                            <label>8. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <input type="file" id="seal_and_stamp_for_travelagent" name="seal_and_stamp_for_travelagent"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-travelagent-seal_and_stamp_for_travelagent"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_travelagent" style="display: none;">
                            <label>8. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_travelagent" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" id="submit_btn_for_travelagent" class="btn btn-sm btn-success" onclick="TravelAgent.listview.askForSubmitTravelAgent({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="TravelAgent.listview.loadTravelAgentData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>