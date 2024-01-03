<div class="row">
    <div class="col-sm-1 col-md-2"></div>
    <div class="col-sm-10 col-md-8">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Inspections (Surprise / Complaint) Form </h3>
            </div>
            <form role="form" id="sci_form" name="sci_form" onsubmit="return false;">
                <input type="hidden" id="sc_inspection_id_for_sci" name="sc_inspection_id_for_sci" value="{{sc_inspection_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Inspection Date <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" id="inspection_date_for_sci" name="inspection_date_for_sci"
                                       data-date-format="DD-MM-YYYY"
                                       class= "form-control date_picker" placeholder="dd-mm-yyyy"
                                       value="{{inspection_date}}">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-sci-inspection_date_for_sci"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>Inspection Type <span class="color-nic-red">*</span></label>
                            <div id="inspection_type_container_for_sci"></div>
                            <span class="error-message error-message-sci-inspection_type_for_sci"></span>
                        </div>
                    </div>
                    <div class="card" id="itc_container_for_sci" style="display: none;">
                        <div class="card-body p-b-0px bg-beige">
                            <div class="row">
                                <div class="col-12"><h6 class="f-w-b">Only for Complaint</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Complainant Name <span class="color-nic-red">*</span></label>
                                    <input type="text" class="form-control" id="complainant_name_for_sci" name="complainant_name_for_sci"
                                           onblur="checkValidation('sci', 'complainant_name_for_sci', cnameValidationMessage);"
                                           placeholder="Enter Complainant Name !" maxlength="100" value="{{complainant_name}}">
                                    <span class="error-message error-message-sci-complainant_name_for_sci"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Complainant Mobile Number <span class="color-nic-red">*</span></label>
                                    <input type="text" class="form-control" id="complainant_mobile_number_for_sci" name="complainant_mobile_number_for_sci"
                                           onblur="checkValidationForMobileNumber('sci', 'complainant_mobile_number_for_sci')"
                                           placeholder="Enter Complainant Mobile Number !" maxlength="10" value="{{complainant_mobile_number}}">
                                    <span class="error-message error-message-sci-complainant_mobile_number_for_sci"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Complainant Email</label>
                                    <input type="text" class="form-control" id="complainant_email_for_sci" name="complainant_email_for_sci"
                                           onblur="checkValidationForExiEmail('sci', 'complainant_email_for_sci')"
                                           placeholder="Enter Complainant Mobile Number !" maxlength="50" value="{{complainant_email}}">
                                    <span class="error-message error-message-sci-complainant_email_for_sci"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Complainant Address <span class="color-nic-red">*</span></label>
                                    <textarea class="form-control" id="complainant_address_for_sci" name="complainant_address_for_sci"
                                              onblur="checkValidation('sci', 'complainant_address_for_sci', caddressValidationMessage);"
                                              placeholder="Enter Complainant Address !" maxlength="200">{{complainant_address}}</textarea>
                                    <span class="error-message error-message-sci-complainant_address_for_sci"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-b-0px bg-beige">
                            <div class="row">
                                <div class="col-12"><h6 class="f-w-b">Inspection to be conducted for</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Company / Business Name <span class="color-nic-red">*</span></label>
                                    <input type="text" class="form-control" id="cb_name_for_sci" name="cb_name_for_sci"
                                           onblur="checkValidation('sci', 'cb_name_for_sci', cbnameValidationMessage);"
                                           placeholder="Enter Company / Business Name !" maxlength="100" value="{{cb_name}}">
                                    <span class="error-message error-message-sci-cb_name_for_sci"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Company / Business Address <span class="color-nic-red">*</span></label>
                                    <textarea class="form-control" id="cb_address_for_sci" name="cb_address_for_sci"
                                              onblur="checkValidation('sci', 'cb_address_for_sci', cbaddressValidationMessage);"
                                              placeholder="Enter Company / Business Address !" maxlength="200">{{cb_address}}</textarea>
                                    <span class="error-message error-message-sci-cb_address_for_sci"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Company Type <span class="color-nic-red">*</span></label>
                                    <select id="cb_type_for_sci" name="cb_type_for_sci" class="form-control select2"
                                            data-placeholder="Select Company Type"
                                            onchange="checkValidation('sci', 'cb_type_for_sci', oneOptionValidationMessage);"
                                            style="width: 100%;">
                                    </select>
                                    <span class="error-message error-message-sci-cb_type_for_sci"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Details of Required Inspection</label>
                                    <textarea class="form-control" id="inspection_details_for_sci" name="inspection_details_for_sci"
                                              placeholder="Enter Details of Required Inspection !">{{inspection_details}}</textarea>
                                    <span class="error-message error-message-sci-inspection_details_for_sci"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks</label>
                            <textarea class="form-control" id="remarks_for_sci" name="remarks_for_sci"
                                      placeholder="Enter Remarks !" maxlength="200">{{remarks}}</textarea>
                            <span class="error-message error-message-sci-remarks_for_sci"></span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-b-0px bg-beige">
                            <div class="row">
                                <div class="col-12 text-center"><span class="error-message error-message-sci-inspection_under_act_for_sci"></span></div>
                            </div>
                            <div class="row">
                                <div class="col-12"><h6 class="f-w-b">Labour & Employment</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_1" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_ONE; ?>">&nbsp;&nbsp;Inspection under The Equal Remuneration Act, 1976
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_2" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_TWO; ?>">&nbsp;&nbsp;Inspection under The Minimum Wages Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_3" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_THREE; ?>">&nbsp;&nbsp;Inspection under The GDD Shops and Establishments Act, 1973
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_4" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_FOUR; ?>">&nbsp;&nbsp;Inspection under The Payment of Bonus Act, 1965
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_5" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_FIVE; ?>">&nbsp;&nbsp;Inspection under The Payment of Wages Act, 1936
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_6" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_SIX; ?>">&nbsp;&nbsp;Inspection under The Payment of Gratuity Act, 1972
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_7" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_SEVEN; ?>">&nbsp;&nbsp;Inspection under The Contract Labour (Regulation and Abolition) Act, 1970
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Factories & Boilers</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_8" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_EIGHT; ?>">&nbsp;&nbsp;Inspection under The The Factories Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_9" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_NINE; ?>">&nbsp;&nbsp;Inspection under The Boilers Act, 1923
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Pollution Control Committee</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_10" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_TEN; ?>">&nbsp;&nbsp;Inspection under The Water (Prevention and Control of Pollution) Act, 1974
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_10" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_ELEVEN; ?>">&nbsp;&nbsp;Inspection under The Air (Prevention and Control of Pollution) Act, 1981
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_10" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_TWELVE; ?>">&nbsp;&nbsp;Inspection under The Environment (Protection) Act, 1986
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Legal Metrology (Weights & Measures)</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sci_10" name="inspection_under_act_for_sci"
                                               value="<?php echo VALUE_THIRTEEN; ?>">&nbsp;&nbsp;Inspection under The legal Metrology Act, 2009
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            {{#if show_btns}}
                            <button type="button" id="submit_btn_for_sci" class="btn btn-sm btn-success" onclick="SCInspections.listview.submitSCInspections($(this));" style="margin-right: 5px;">Submit</button>
                            {{/if}}
                            <button type="button" class="btn btn-sm btn-danger" onclick="SCInspections.listview.loadSCInspectionsData();">Back</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>