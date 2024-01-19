<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF TOURISM</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DADRA & NAGAR HAVELI / DAMAN / DIU </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Hotel Registration Renewal Form</div>
            </div>
            <form role="form" id="hotel_renewal_form" name="hotel_renewal_form" onsubmit="return false;">

                <input type="hidden" id="hotel_renewal_id" name="hotel_renewal_id" value="{{hotelrenewal_data.hotel_renewal_id}}">
                <input type="hidden" id="hotelregi_id" name="hotelregi_id" value="{{hotelrenewal_data.hotelregi_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-hotelrenewal f-w-b" style="border-bottom: 2px solid red;"></span>
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
                            <label>1. Hotel's License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Dealer's License Number !"
                                       maxlength="100" onblur="checkValidation('hotelrenewal', 'registration_number', registrationNumberValidationMessage);" value="{{hotelrenewal_data.registration_number}}" onblur="HotelRenewal.listview.getHotelData($(this))">
                            </div>
                            <span class="error-message error-message-hotelrenewal-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of Hotel <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_hotel" name="name_of_hotel" class="form-control" placeholder="Name of Hotel !"
                                       maxlength="100" onblur="checkValidation('hotelrenewal', 'name_of_hotel', hotelNameValidationMessage);" value="{{hotelrenewal_data.name_of_hotel}}">
                            </div>
                            <span class="error-message error-message-hotelrenewal-name_of_hotel"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Name of the Proprietor <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_proprietor" name="name_of_proprietor" class="form-control" placeholder="Name of the Proprietor !" maxlength="100" value="{{hotelrenewal_data.name_of_proprietor}}" onblur="checkValidation('hotelrenewal', 'name_of_proprietor', nameOfProprietorValidationMessage);">
                            </div>
                            <span class="error-message error-message-hotelrenewal-name_of_proprietor"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. License last renewed upto  <span style="color: red;">*</span></label>
                            <div class="input-group date ">
                                <input type="text" name="last_valid_upto" id="last_valid_upto" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{last_valid_upto}}" onblur="checkValidation('hotelrenewal', 'last_valid_upto', dateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-hotelrenewal-last_valid_upto"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Fees <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="fees" name="fees" class="form-control" placeholder="Fees !" readonly=""
                                       maxlength="100" value="{{hotelrenewal_data.fees}}">
                            </div>
                            <span class="error-message error-message-hotelrenewal-name_of_hotel"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <label>6. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mob_no" name="mob_no" class="form-control" placeholder=" Mobile No. !"
                                   maxlength="10" onblur="checkNumeric($(this)); checkValidationForMobileNumber('hotelrenewal', 'mob_no', mobileValidationMessage);" value="{{hotelrenewal_data.mob_no}}">
                            <span class="error-message error-message-hotelrenewal-mob_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Name of the tourist area where the hotel is to be run or is being run <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control select2" id="name_of_tourist_area" name="name_of_tourist_area" 
                                        data-placeholder="Select Name of the tourist area !" style="width: 100%;" onblur="checkValidation('hotelrenewal', 'name_of_tourist_area', districtValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-hotelrenewal-name_of_tourist_area"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('hotelrenewal', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-hotelrenewal-entity_establishment_type"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="col-xs-12 newemployees_info_div">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">8. Details new employees, if any </span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="newEmployeesDetails" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of the new employees</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="newemployees_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" style="margin-bottom: 50px;" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_agent" onclick="HotelRenewal.listview.addMultipleNewEmployees({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add new employees details
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="noc_fire_container_for_hotelrenewal">
                            <label>9. Upload Fire NOC. <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-hotelrenewal-noc_fire_for_hotelrenewal"></div>
                        </div>
                        <div class="form-group col-sm-12" id="noc_fire_name_container_for_hotelrenewal" style="display: none;">
                            <label>9. Upload Fire NOC. <span style="color: red;">* </label><br>
                            <a target="_blank" id="noc_fire_download"><label id="noc_fire_name_image_for_hotelrenewal" style="border: 2px solid black;" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_hotelrenewal">
                            <label>10. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-hotelrenewal-seal_and_stamp_for_hotelrenewal"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_hotelrenewal" style="display: none;">
                            <label>10. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_hotelrenewal" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" id="submit_btn_for_hotelrenewal" class="btn btn-sm btn-success" onclick="HotelRenewal.listview.askForSubmitHotelRenewal({{VALUE_TWO}});" style="margin-right: 5px;">Submit Application</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="HotelRenewal.listview.loadHotelRenewalData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>