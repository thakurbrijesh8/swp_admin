<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM-I</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See Rule 23 (1)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FOR REGISTRATION OF ESTABLISHMENTS EMPLOYING BUILDING WORKERS</div>
            </div>
            <form role="form" id="bocw_form" name="bocw_form" onsubmit="return false;">
                <input type="hidden" id="bocw_id" name="bocw_id" value="{{bocw_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-bocw-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" disabled="">
                            </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name and location of the establishment where building or other construction work is to be carried on <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="name_location_of_est" name="name_location_of_est" class="form-control" placeholder="Enter Name and location of the establishment where building or other construction work is to be carried on !" maxlength="200" onblur="checkValidation('bocw', 'name_location_of_est', nameLocationValidationMessage);" readonly>{{name_location_of_est}}</textarea>
                            </div>
                            <span class="error-message error-message-bocw-name_location_of_est"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Postal address of the Establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="postal_address_of_est" name="postal_address_of_est" class="form-control" placeholder="Enter Postal address of the Establishment !" maxlength="100" onblur="checkValidation('bocw', 'postal_address_of_est', postalAddressValidationMessage);" readonly style="margin-top: 20px;">{{postal_address_of_est}}</textarea>
                            </div>
                            <span class="error-message error-message-bocw-postal_address_of_est"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Full name and permanent address of the Establishment,if any</label>
                            <div class="input-group">
                                <textarea id="name_address_of_est" name="name_address_of_est" class="form-control" placeholder="Enter Full name and permanent address of the Establishment,if any !" maxlength="100" readonly style="margin-top: 22px;">{{name_address_of_est}}</textarea>
                            </div>
                            <span class="error-message error-message-bocw-name_address_of_est"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Full name and address of the Manager or persons responsible for the supervision and control of the Establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="name_address_of_manager" name="name_address_of_manager" class="form-control" placeholder="Enter Full name and address of the Manager or persons responsible for the supervision and control of the Establishment !" maxlength="100" onblur="checkValidation('bocw', 'name_address_of_manager', managerNameAddressValidationMessage);" readonly>{{name_address_of_manager}}</textarea>
                            </div>
                            <span class="error-message error-message-bocw-name_address_of_manager"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Nature of building or other construction work carried is to be carried on in the Establishment <span style="color: red;">*</span></label>
                            <input type="text" id="nature_of_building" name="nature_of_building" class="form-control" placeholder="Nature of building or other construction work carried is to be carried on in the Establishment !"
                                   maxlength="100" onblur="checkValidation('bocw', 'nature_of_building', buildingNatureValidationMessage);" value="{{nature_of_building}}" readonly>
                            <span class="error-message error-message-bocw-nature_of_building"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Maximum number of building workers to be employed on any day <span style="color: red;">*</span></label>
                            <input type="text" id="max_num_building_workers" name="max_num_building_workers" class="form-control" placeholder="Maximum number of building workers to be employed on any day !"
                                   maxlength="25" onkeyup="checkNumeric($(this));" onblur="checkValidation('bocw', 'max_num_building_workers', maxnumberValidationMessage);" value="{{max_num_building_workers}}" readonly style="margin-top: 20px;">
                            <span class="error-message error-message-bocw-max_num_building_workers"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Estimated date of commencement of building or the other construction work <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="estimated_date_of_commencement" id="estimated_date_of_commencement" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{estimated_date_of_commencement}}" onblur="checkValidation('bocw', 'estimated_date_of_commencement', commencementDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-bocw-estimated_date_of_commencement"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Estimated date of completion of building or the other construction work  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="estimated_date_of_completion" id="estimated_date_of_completion" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{estimated_date_of_completion}}" onblur="checkValidation('bocw', 'estimated_date_of_completion', completionDateValidationMessage);" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-bocw-estimated_date_of_completion"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12"> 
                            <strong>10. Declaration by the employer</strong><br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">10.1 &nbsp;
                                    <input type="checkbox" class="" name="declarationone" id="declarationone" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('bocw', 'declarationone', declarationOneValidationMessage);" disabled>&nbsp;I hereby declare that the particulars given above are true to the best of my knowledge and belief
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-bocw-declarationone"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">10.2 &nbsp;
                                    <input type="checkbox" class="" name="declarationtwo" id="declarationtwo" autocomplete="true" value="{{is_checked}}" onblur="checkValidation('bocw', 'declarationtwo', declarationTwoValidationMessage);" disabled>&nbsp;I undertake to abide by the provisions of the Building and other Construction Workers (Regulation of Employment and Conditions of Service) Act, 1996 and the rules made thereunder.
                                    <span style="color: red;">*</span>
                                </span>
                            </div>
                            <span class="error-message error-message-bocw-declarationtwo"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="workorder_copy_container_for_bocw">
                            <label>11.  Attach a copy of work order. <span style="color: red;">* <br>(Maximum File Size: 1MB)(Upload pdf Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-bocw-workorder_copy_for_bocw"></div>
                        </div>

                        <div class="form-group col-sm-12" id="workorder_copy_name_container_for_bocw" style="display: none;">
                            <label>11.  Attach a copy of work order. <span style="color: red;">*<br> (Maximum File Size: 1MB)(Upload pdf Only) </span></label><br>
                            <a id="workorder_copy_name_download" target="_blank" download><label id="workorder_copy_name_image_for_bocw" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_bocw">
                            <label>12. Principal Employer Seal and Stamp <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_bocw" style="display: none;">
                            <label>12. Principal Employer Seal and Stamp <span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <img id="seal_and_stamp_name_image_for_bocw" style="width: 250px; height: 250px; border: 2px solid blue;">
                        </div>
                    </div>
                    <hr class="m-b-5px">
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="BOCW.listview.loadBOCWData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>