<div class="row">
    <div class="col-sm-1 col-md-2"></div>
    <div class="col-sm-10 col-md-8">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Inspections (Synchronized / Joint) Form </h3>
            </div>
            <form role="form" id="sji_form" name="sji_form" onsubmit="return false;">
                <input type="hidden" id="sj_inspection_id_for_sji" name="sj_inspection_id_for_sji" value="{{sj_inspection_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Inspection Date <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" id="inspection_date_for_sji" name="inspection_date_for_sji"
                                       data-date-format="DD-MM-YYYY"
                                       class= "form-control date_picker" placeholder="dd-mm-yyyy"
                                       value="{{inspection_date}}">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-sji-inspection_date_for_sji"></span>
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
                                    <input type="text" class="form-control" id="cb_name_for_sji" name="cb_name_for_sji"
                                           onblur="checkValidation('sci', 'cb_name_for_sji', cbnameValidationMessage);"
                                           placeholder="Enter Company / Business Name !" maxlength="100" value="{{cb_name}}">
                                    <span class="error-message error-message-sji-cb_name_for_sji"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Company / Business Address <span class="color-nic-red">*</span></label>
                                    <textarea class="form-control" id="cb_address_for_sji" name="cb_address_for_sji"
                                              onblur="checkValidation('sci', 'cb_address_for_sji', cbaddressValidationMessage);"
                                              placeholder="Enter Company / Business Address !" maxlength="200">{{cb_address}}</textarea>
                                    <span class="error-message error-message-sji-cb_address_for_sji"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Company Type <span class="color-nic-red">*</span></label>
                                    <select id="cb_type_for_sji" name="cb_type_for_sji" class="form-control select2"
                                            data-placeholder="Select Company Type"
                                            onchange="checkValidation('sci', 'cb_type_for_sji', oneOptionValidationMessage);"
                                            style="width: 100%;">
                                    </select>
                                    <span class="error-message error-message-sji-cb_type_for_sji"></span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="f-w-n">Details of Required Inspection</label>
                                    <textarea class="form-control" id="inspection_details_for_sji" name="inspection_details_for_sji"
                                              placeholder="Enter Details of Required Inspection !">{{inspection_details}}</textarea>
                                    <span class="error-message error-message-sji-inspection_details_for_sji"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks</label>
                            <textarea class="form-control" id="remarks_for_sji" name="remarks_for_sji"
                                      placeholder="Enter Remarks !" maxlength="200">{{remarks}}</textarea>
                            <span class="error-message error-message-sji-remarks_for_sji"></span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-b-0px bg-beige">
                            <div class="row">
                                <div class="col-12 text-center"><span class="error-message error-message-sji-inspection_under_act_for_sji"></span></div>
                            </div>
                            <div class="row">
                                <div class="col-12"><h6 class="f-w-b">Inspection to be Conducted for</h6><hr></div>
                            </div>
                            <div class="row">
                                <div class="col-12 m-b-5px">
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_1" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_ONE; ?>">&nbsp;&nbsp;Inspection under The Equal Remuneration Act, 1976
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_2" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_TWO; ?>">&nbsp;&nbsp;Inspection under The Factories Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_3" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_THREE; ?>">&nbsp;&nbsp;Inspection under The Maternity Benefit Act, 1961
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_4" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_FOUR; ?>">&nbsp;&nbsp;Inspection under The Minimum Wages Act, 1948
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_5" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_FIVE; ?>">&nbsp;&nbsp;Inspection under The Shops and Establishments Act(as applicable)
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_6" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_SIX; ?>">&nbsp;&nbsp;Inspection under The Labour Welfare Fund Act(as applicable)
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_7" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_SEVEN; ?>">&nbsp;&nbsp;Inspection under The Payment of Bonus Act, 1965
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_8" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_EIGHT; ?>">&nbsp;&nbsp;Inspection under The Payment of Wages Act, 1936
                                    </label><br>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_9" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_NINE; ?>">&nbsp;&nbsp;Inspection under The Payment of Gratuity Act, 1972
                                    </label>
                                    <label class="checkbox-inline f-w-n m-b-0px m-r-10px">
                                        <input type="checkbox" id="inspection_under_act_for_sji_10" name="inspection_under_act_for_sji"
                                               value="<?php echo VALUE_TEN; ?>">&nbsp;&nbsp;Inspection under The Contract Labour (Regulation and Abolition) Act, 1970
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            {{#if show_btns}}
                            <button type="button" id="submit_btn_for_sji" class="btn btn-sm btn-success" onclick="SJInspections.listview.submitSJInspections($(this));" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                            {{/if}}
                            <button type="button" class="btn btn-sm btn-danger" onclick="SJInspections.listview.loadSJInspectionsData();">Back</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>