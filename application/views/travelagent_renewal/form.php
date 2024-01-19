<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF TOURISM</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DADRA & NAGAR HAVELI / DAMAN / DIU </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Travel Agency registration Renewal Form</div>
            </div>
            <form role="form" id="travelagent_renewal_form" name="travelagent_renewal_form" onsubmit="return false;">

                <input type="hidden" id="travelagent_renewal_id" name="travelagent_renewal_id" value="{{travelagentrenewal_data.travelagent_renewal_id}}">
                <input type="hidden" id="travelagent_id" name="travelagent_id" value="{{travelagentrenewal_data.travelagent_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-travelagentrenewal f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Director,<br>
                            Department of Tourism,<br>
                            Dadra & Nagar Haveli and  Daman & Diu.<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Travel Agency License Number <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Travel Agency License Number !"
                                       maxlength="100" value="{{travelagentrenewal_data.registration_number}}" onblur="TravelagentRenewal.listview.getTravelagentData($(this))">
                            </div>
                            <span class="error-message error-message-travelagentrenewal-registration_number"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('travelagentrenewal', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-travelagentrenewal-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of the Travel Agency <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_travel_agency" name="name_of_travel_agency" class="form-control" placeholder="Name of Travel Agency !"
                                       maxlength="100" onblur="checkValidation('travelagentrenewal', 'name_of_travel_agency', travelAgencyNameValidationMessage);" value="{{travelagentrenewal_data.name_of_travel_agency}}">
                            </div>
                            <span class="error-message error-message-travelagentrenewal-name_of_travel_agency"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Address of the Agency <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="address_of_agency" name="address_of_agency" class="form-control" placeholder="Address of the Agency !"
                                          maxlength="100" onblur="checkValidation('travelagent', 'address_of_agency', addressOfAgencyValidationMessage);">{{travelagentrenewal_data.address_of_agency}}</textarea>
                            </div>
                            <span class="error-message error-message-travelagent-address_of_agency"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. License last renewed upto  <span style="color: red;">*</span></label>
                            <div class="input-group date ">
                                <input type="text" name="last_valid_upto" id="last_valid_upto" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{last_valid_upto}}" onblur="checkValidation('travelagentrenewal', 'last_valid_upto', dateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-travelagentrenewal-last_valid_upto"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Fees <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fees" name="fees" class="form-control" placeholder="Fees !" maxlength="100" disabled="" value="{{TRAVEL_AGENCY_FEES}}">
                            </div>
                            <span class="error-message error-message-travelagent-name_of_person"></span>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <label>6. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mob_no" name="mob_no" class="form-control" placeholder=" Mobile No. !"
                                   maxlength="10" onblur="checkNumeric($(this)); checkValidationForMobileNumber('travelagent', 'mob_no', mobileValidationMessage);" value="{{travelagentrenewal_data.mob_no}}">
                            <span class="error-message error-message-travelagent-mob_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Area where the travel agency is being operated/to be operated <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control select2" id="area_of_agency" name="area_of_agency" 
                                        data-placeholder="Select Area " style="width: 100%;" >
                                </select>
                            </div>
                            <span class="error-message error-message-travelagentrenewal-area_of_agency"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="col-xs-12">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">8. Name of Proprietor </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="proprietorInfo" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of the proprietor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="proprietor_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" style="margin-bottom: 50px;" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_agent" onclick="TravelagentRenewal.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Proprietor
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_travelagentrenewal">
                            <label>9. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-travelagentrenewal-seal_and_stamp_for_travelagentrenewal"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_travelagentrenewal" style="display: none;">
                            <label>9. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_travelagentrenewal" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" id="submit_btn_for_travelagentrenewal" class="btn btn-sm btn-success" onclick="TravelagentRenewal.listview.askForSubmitTravelagentRenewal({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="TravelagentRenewal.listview.loadTravelagentRenewalData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>