<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF LABOUR </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT Administration of Dadra & Nagar Haveli and Daman & Diu  </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application of Inter-State Migrant Workers(ISMW) returnees who have returned to their Native/ Home State</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Annexure-B</div>
            </div>
            <form role="form" id="ismw_form" name="ismw_form" onsubmit="return false;">

                <input type="hidden" id="ismw_id" name="ismw_id" value="{{ismw_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-ismw f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            To,<br>
                            Labour Inspector<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Return to District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;" disabled="">  
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-district"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Details of Migrant Workers</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name" name="name" class="form-control" placeholder="Name !" maxlength="100" value="{{name}}" 
                                       onblur="checkValidation('ismw', 'name', personNameValidationMessage);" disabled="">
                            </div>
                            <span class="error-message error-message-ismw-name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. DOB <span class="color-nic-red">*</span></label>
                            <div class="input-group date ">
                                <input type="text" name="dob" id="dob" class="form-control date_picker" placeholder="DD-MM-YYYY" data-date-format="DD-MM-YYYY"
                                       value="{{dob}}" onblur="checkValidation('ismw', 'dob', dateValidationMessage);" disabled="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-ismw-dob"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Gender <span class="color-nic-red">*</span></label>
                            <div id="gender_container_for_ismw" disabled="">
                            </div>
                            <span class="error-message error-message-ismw-gender_for_ismw"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>5. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mobile_no" name="mobile_no" class="form-control" placeholder=" Mobile No. !" disabled=""
                                   maxlength="10" onblur="checkNumeric($(this)); checkValidationForMobileNumber('ismw', 'mobile_no', mobileValidationMessage);" value="{{mobile_no}}">
                            <span class="error-message error-message-ismw-mobile_no"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>6. Aadhaar No. <span style="color: red;">*</span></label>
                            <input type="text" id="aadhaar_no" name="aadhaar_no" class="form-control" placeholder=" Aadhaar No. !" disabled=""
                                   maxlength="12" onblur="checkNumeric($(this)); checkValidation('ismw', 'aadhaar_no', aadharnoValidationMessage);" value="{{aadhaar_no}}">
                            <span class="error-message error-message-ismw-aadhaar_no"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Permanent residential address(native address)</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. State <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="state_for_ismw" name="state_for_ismw" class="form-control"
                                        data-placeholder="Select Native State/UT"
                                        onchange="checkValidation('ismw', 'state_for_ismw', stateValidationMessage);
                                                ISMW.listview.getDistrictData($(this), 'ismw');
                                                $('#other_village_name_container_for_ismw').hide();" disabled="">
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-state_for_ismw"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district_for_ismw" name="district_for_ismw" class="form-control"
                                        data-placeholder="Select Native District"
                                        onchange="checkValidation('ismw', 'district_for_ismw', districtValidationMessage);
                                                ISMW.listview.getVillageData($(this), 'ismw');
                                                $('#other_village_name_container_for_ismw').hide();" disabled="">
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-district_for_ismw"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Block/Ward No. </label>
                            <div class="input-group">
                                <input type="text" id="p_block_no" name="p_block_no" disabled="" class="form-control" placeholder="Block/Ward No. !" maxlength="100" value="{{p_block_no}}">
                            </div>
                            <span class="error-message error-message-ismw-p_block_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Village Locality <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="village_for_ismw" name="village_for_ismw" class="form-control select2"
                                        data-placeholder="Select Native Village" disabled=""
                                        onchange="ISMW.listview.villageChangeEvent($(this));" disabled="">
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-p_village"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11. House No. </label>
                            <div class="input-group">
                                <input type="text" id="p_house_no" name="p_house_no" disabled="" class="form-control" placeholder="House No. !" maxlength="100" value="{{p_house_no}}">
                            </div>
                            <span class="error-message error-message-ismw-p_house_no"></span>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>12. Pincode <span style="color: red;">*</span></label>
                            <input type="text" id="p_pincode" name="p_pincode" class="form-control" placeholder="Pincode !" disabled=""
                                   maxlength="12" onblur="checkNumeric($(this)); checkValidation('ismw', 'p_pincode', pincodeValidationMessage);" value="{{p_pincode}}">
                            <span class="error-message error-message-ismw-p_pincode"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Details of earlier employment</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13. State </label>
                            <div class="input-group">
                                <select id="ee_state" name="ee_state" class="form-control"
                                        data-placeholder="Select Native State/UT" disabled=""
                                        onchange="checkValidation('ismw', 'ee_state', stateValidationMessage);
                                                ISMW.listview.getDistrictData($(this), 'ee_state');">
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-ee_state"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14. District </label>
                            <div class="input-group">
                                <select id="ee_dist" name="ee_dist" class="form-control"
                                        data-placeholder="Select Native District" disabled=""
                                        onchange="checkValidation('ismw', 'ee_dist', districtValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-ismw-ee_dist"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Occupation </label>
                            <div class="input-group">
                                <input type="text" id="ee_occuption" name="ee_occuption" disabled="" class="form-control" placeholder="Occupation !" maxlength="100" value="{{ee_occuption}}">
                            </div>
                            <span class="error-message error-message-ismw-name_of_person"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16. Nature of employment (perm/remp/casual/contract/daily) </label>
                            <div class="input-group">
                                <input type="text" id="ee_nature" name="ee_nature" disabled="" class="form-control" placeholder="Nature of employment (perm/remp/casual/contract/daily) !" maxlength="100" value="{{ee_nature}}">
                            </div>
                            <span class="error-message error-message-ismw-ee_nature"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button typee="button" class="btn btn-sm btn-danger" onclick="ISMW.listview.loadISMWData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>