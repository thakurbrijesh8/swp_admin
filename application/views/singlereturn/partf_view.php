<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART F</div>
                <div style="font-size: 16px; margin-top: 0px;">Details under the Maternity Benefit Act-1961 & Rules made there under</div>
                
            </div>
            <form role="form" id="single_return_partf_form" name="single_return_partf_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_partf_id" name="singlereturn_partf_id" value="{{singlereturn_partf_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Number of female workers employed on any day<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_female_workers" name="no_of_female_workers" class="form-control" placeholder="Enter Number of female workers employed on any day !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_female_workers', noOfFemaleWorkersValidationMessage);" value="{{no_of_female_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_female_workers"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Number of women workers, claimed Maternity benefits/ No, paid (Section 5)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_maternity_women_workers" name="no_of_maternity_women_workers" class="form-control" placeholder="Enter Number of women workers, claimed Maternity benefits/ No, paid !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_maternity_women_workers', noOfMaternityWomenWorkersValidationMessage);" value="{{no_of_maternity_women_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_maternity_women_workers"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. No. of case in which medical Bonus is claimed/paid (Section 8)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="medical_bonus_case" name="medical_bonus_case" class="form-control" placeholder="Enter No. of case in which medical Bonus is claimed /paid !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'medical_bonus_case', medicalBonusValidationMessage);" value="{{medical_bonus_case}}">
                            </div>
                            <span class="error-message error-message-single-return-medical_bonus_case"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. No. of case of leave for miscarriage is applied/granted (Section 9 & 9-A)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="miscarriage_leave_case" name="miscarriage_leave_case" class="form-control" placeholder="Enter No. of case of leave for miscarriage is applied/granted !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'miscarriage_leave_case', miscarriageLeaveValidationMessage);" value="{{miscarriage_leave_case}}">
                            </div>
                            <span class="error-message error-message-single-return-miscarriage_leave_case"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Number of cases of additional leave for illness applied/granted (Section 10)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="additional_leave_case" name="additional_leave_case" class="form-control" placeholder="Enter Number of cases of additional leave for illness applied/granted !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'additional_leave_case', additionalLeaveValidationMessage);" value="{{additional_leave_case}}">
                            </div>
                            <span class="error-message error-message-single-return-additional_leave_case"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Total Amount of Maternity Benefit paid<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="maternity_benefit_amount" name="maternity_benefit_amount" class="form-control" placeholder="Enter Total Amount of Maternity Benefit paid !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'maternity_benefit_amount', maternityBenefitAmountValidationMessage);" value="{{maternity_benefit_amount}}">
                            </div>
                            <span class="error-message error-message-single-return-maternity_benefit_amount"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Whether Nursing breaks allowed to the eligible women employees ? (Under Section 11)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_nursing_breaks_yes" name="is_nursing_breaks" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_nursing_breaks_no" name="is_nursing_breaks" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                            <span class="error-message error-message-single-return-is_nursing_breaks"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>8. Whether women employees are dismissed from service during their pregnancy depriving of their entitled maternity benefits or medical bonus ? (Section 12)</label>&nbsp;
                            <input type="checkbox" id="is_dismissed_service" name="is_dismissed_service" class="checkbox" value="{{is_checked}}" disabled>
                            <span class="error-message error-message-shop-is_dismissed_service"></span>
                        </div>
                    </div>
                    <div class="row is_dismissed_service_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>8.1 Number of women dismissed<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_dismissed_women" name="no_of_dismissed_women" class="form-control" placeholder="Enter Number of women dismissed !"
                                       maxlength="100" readonly onblur="checkValidation('factory-license', 'no_of_dismissed_women', dismissedWomenValidationMessage);" value="{{no_of_dismissed_women}}">
                            </div>
                            <span class="error-message error-message-factory-license-no_of_dismissed_women"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8.2 Reason thereof<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="dismissed_reason" name="dismissed_reason" class="form-control" placeholder="Enter Reason thereof !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'dismissed_reason', dismissedReasonValidationMessage);">{{dismissed_reason}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-dismissed_reason"></span>
                        </div>
                    </div>
                   
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partf_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartG($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_parte_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartE($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>