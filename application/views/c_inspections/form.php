<div class="row">
    <div class="col-sm-1 col-md-2"></div>
    <div class="col-sm-10 col-md-8">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Central Inspections(CIS) Form </h3>
            </div>
            <form role="form" id="ci_form" name="ci_form" onsubmit="return false;">
                <input type="hidden" id="c_inspection_id_for_ci" name="c_inspection_id_for_ci" value="{{c_inspection_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Inspection Date <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" id="inspection_date_for_ci" name="inspection_date_for_ci"
                                       data-date-format="DD-MM-YYYY"
                                       class= "form-control date_picker" placeholder="dd-mm-yyyy"
                                       value="{{inspection_date}}">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-ci-inspection_date_for_ci"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Company / Business Name <span class="color-nic-red">*</span></label>
                            <input type="text" class="form-control" id="cb_name_for_ci" name="cb_name_for_ci"
                                   onblur="checkValidation('ci', 'cb_name_for_ci', cbnameValidationMessage);"
                                   placeholder="Enter Company / Business Name !" maxlength="100" value="{{cb_name}}">
                            <span class="error-message error-message-ci-cb_name_for_ci"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>Company / Business Address <span class="color-nic-red">*</span></label>
                            <textarea class="form-control" id="cb_address_for_ci" name="cb_address_for_ci"
                                      onblur="checkValidation('ci', 'cb_address_for_ci', cbaddressValidationMessage);"
                                      placeholder="Enter Company / Business Address !" maxlength="200">{{cb_address}}</textarea>
                            <span class="error-message error-message-ci-cb_address_for_ci"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Company Type <span class="color-nic-red">*</span></label>
                            <select id="cb_type_for_ci" name="cb_type_for_ci" class="form-control select2"
                                    data-placeholder="Select Company Type"
                                    onchange="checkValidation('ci', 'cb_type_for_ci', oneOptionValidationMessage);"
                                    style="width: 100%;">
                            </select>
                            <span class="error-message error-message-ci-cb_type_for_ci"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>Details of Required Inspection</label>
                            <textarea class="form-control" id="inspection_details_for_ci" name="inspection_details_for_ci"
                                      placeholder="Enter Details of Required Inspection !">{{inspection_details}}</textarea>
                            <span class="error-message error-message-ci-inspection_details_for_ci"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>Remarks</label>
                            <textarea class="form-control" id="remarks_for_ci" name="remarks_for_ci"
                                      placeholder="Enter Remarks !" maxlength="200">{{remarks}}</textarea>
                            <span class="error-message error-message-ci-remarks_for_ci"></span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-b-0px bg-beige">
                            <div class="row">
                                <div class="col-12 text-center"><span class="error-message error-message-ci-inspection_under_act_for_ci"></span></div>
                            </div>
                            <div class="row">
                                <div class="col-12"><h6 class="f-w-b">Labour & Employment</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_1" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_ONE; ?>">&nbsp;&nbsp;Inspection under The Equal Remuneration Act, 1976
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_2" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_TWO; ?>">&nbsp;&nbsp;Inspection under The Minimum Wages Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_3" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_THREE; ?>">&nbsp;&nbsp;Inspection under The Shops and Establishments Act
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_4" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_FOUR; ?>">&nbsp;&nbsp;Inspection under The Payment of Bonus Act, 1965
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_5" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_FIVE; ?>">&nbsp;&nbsp;Inspection under The Payment of Wages Act, 1936
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_6" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_SIX; ?>">&nbsp;&nbsp;Inspection under The Payment of Gratuity Act, 1972
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_7" name="inspection_under_act_for_ci"
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
                                        <input type="checkbox" id="inspection_under_act_for_ci_8" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_EIGHT; ?>">&nbsp;&nbsp;Inspection under The The Factories Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_9" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_NINE; ?>">&nbsp;&nbsp;Inspection under The Indian Boilers Act 1923
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Legal Metrology (Weights & Measures)</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_10" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_TEN; ?>">&nbsp;&nbsp;Inspection under The Legal Metrology Act, 2009 and Rules Environment
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Environment / Pollution</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_11" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_ELEVEN; ?>">&nbsp;&nbsp;Inspection under The Water (Prevention and Control of Pollution) Act, 1974
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_12" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_TWELVE; ?>">&nbsp;&nbsp;Inspection under The Air (Prevention and Control of Pollution) Act, 1981
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12"><hr style="border-top: 1px solid black;"><h6 class="f-w-b" style="margin-top: .5rem;">Planning and Development Authority</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_ci_11" name="inspection_under_act_for_ci"
                                               value="<?php echo VALUE_THIRTEEN; ?>">&nbsp;&nbsp;Planning and Development Authority -  Allocation of Officers for Inspection
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            {{#if show_btns}}
                            <button type="button" id="submit_btn_for_ci" class="btn btn-sm btn-success" onclick="CInspections.listview.submitCInspections($(this));" style="margin-right: 5px;">Submit</button>
                            {{/if}}
                            <button type="button" class="btn btn-sm btn-danger" onclick="CInspections.listview.loadCInspectionsData();">Back</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>