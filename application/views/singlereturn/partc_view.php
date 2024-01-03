<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART C</div>
                <div style="font-size: 16px; margin-top: 0px;">May establishment is covered under the Contract Labour (Regulation and Abolition) Act,1970 and the worker are paid wages and overtime wages as prescribed by the Administration</div>
                
            </div>
            <form role="form" id="single_return_partc_form" name="single_return_partc_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_partc_id" name="singlereturn_partc_id" value="{{singlereturn_partc_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of the contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contractor_name" name="contractor_name" class="form-control" placeholder="Enter Name of the contractor !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_name', contractorNameValidationMessage);" value="{{contractor_name}}">
                            </div>
                            <span class="error-message error-message-single-return-contractor_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Address of the contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="contractor_address" name="contractor_address" class="form-control" placeholder="Enter Address of the contractor !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_address', contractorAddressValidationMessage);">{{contractor_address}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-contractor_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Nature of work/operations of contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contractor_nature" name="contractor_nature" class="form-control" placeholder="Enter Nature of work/operations of contractor !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'contractor_nature', contractorNatureValidationMessage);" value="{{contractor_nature}}">
                            </div>
                            <span class="error-message error-message-single-return-contractor_nature"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Total number of days during the year on which contract labour was employed<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_employed_labour" name="total_employed_labour" class="form-control" placeholder="Enter Total number of days during the year on which contract labour was employed !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'total_employed_labour', employedLabourValidationMessage);" value="{{total_employed_labour}}">
                            </div>
                            <span class="error-message error-message-single-return-total_employed_labour"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Total number of man days worked during the year by the contract labour<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_worked_days_by_labour" name="total_worked_days_by_labour" class="form-control" placeholder="Enter Total number of man days worked during the year by the contract labour !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'total_worked_days_by_labour', labourWorkedDaysValidationMessage);" value="{{total_worked_days_by_labour}}">
                            </div>
                            <span class="error-message error-message-single-return-total_worked_days_by_labour"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Total number of days during the year on which direct labour was employed<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_employed_direct_labour" name="total_employed_direct_labour" class="form-control" placeholder="Enter Total number of days during the year on which direct labour was employed !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'total_employed_direct_labour', employedDirectLabourValidationMessage);" value="{{total_employed_direct_labour}}">
                            </div>
                            <span class="error-message error-message-single-return-total_employed_direct_labour"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Total number of man days worked by direct labour<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_worked_days_by_direct_labour" name="total_worked_days_by_direct_labour" class="form-control" placeholder="Enter Total number of man days worked by direct labour !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'total_worked_days_by_direct_labour', directLabouWOrkedDaysValidationMessage);" value="{{total_worked_days_by_direct_labour}}">
                            </div>
                            <span class="error-message error-message-single-return-total_worked_days_by_direct_labour"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Change, if any, in the management of establishments its locations or any, other particulars furnished to the registring Officer in the application for the registration (details may be furnished with dates of change)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="change_management_details" name="change_management_details" class="form-control" placeholder="Enter Change, if any, in the management of establishments !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'change_management_details', changeManagementDetailsValidationMessage);">{{change_management_details}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-change_management_details"></span>
                        </div>
                    </div>
                   <h2 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0" style="text-align: center">YEARLY RETURN to be submitted by the Contractors</h2>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Duration of contract Number of days worked during the year <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="duration_of_contract" name="duration_of_contract" class="form-control" placeholder="Enter Duration of contract Number of days worked during the year  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'duration_of_contract', contractDurationValidationMessage);" value="{{duration_of_contract}}">
                            </div>
                            <span class="error-message error-message-single-return-duration_of_contract"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Average number of contract labour worked on any day during the year <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_contract_labour" name="no_of_contract_labour" class="form-control" placeholder="Enter Average number of contract labour worked on any day during the year  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'no_of_contract_labour', contractLanourValidationMessage);" value="{{no_of_contract_labour}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_contract_labour"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">11. Details of</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>11.1 Working hours <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="working_hours" name="working_hours" class="form-control" placeholder="Enter Working hours  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'working_hours', workHoursValidationMessage);" value="{{working_hours}}">
                            </div>
                            <span class="error-message error-message-single-return-working_hours"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>11.2 Overtime work <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="overtime_work" name="overtime_work" class="form-control" placeholder="Enter Overtime work  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'overtime_work', overtimeWorkDaysValidationMessage);" value="{{overtime_work}}">
                            </div>
                            <span class="error-message error-message-single-return-overtime_work"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>11.3 Weekly holiday <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="weekly_holiday" name="weekly_holiday" class="form-control" placeholder="Enter Weekly holiday  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'weekly_holiday', weeklyHolidayValidationMessage);" value="{{weekly_holiday}}">
                            </div>
                            <span class="error-message error-message-single-return-weekly_holiday"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>11.4 Spread over <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="spread_over" name="spread_over" class="form-control" placeholder="Enter Spread over  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'spread_over', spreadOverValidationMessage);" value="{{spread_over}}">
                            </div>
                            <span class="error-message error-message-single-return-spread_over"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11.5 Weekly holiday paid or not  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_paid_weekly_holiday_yes" name="is_paid_weekly_holiday" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_paid_weekly_holiday_no" name="is_paid_weekly_holiday" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">12. Number of mandays worked During the year</span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>12.1 Male <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="male_worked_days" name="male_worked_days" class="form-control" placeholder="Enter Male  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="getTotalWorker('male_worked_days','female_worked_days','total_worked_days');checkNumeric($(this));checkValidation('single-return', 'male_worked_days', maleWOrkedDaysValidationMessage);" value="{{male_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-male_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>12.2 Female <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="female_worked_days" name="female_worked_days" class="form-control" placeholder="Enter Female  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="getTotalWorker('male_worked_days','female_worked_days','total_worked_days');checkNumeric($(this));checkValidation('single-return', 'female_worked_days', femaleWOrkedDaysValidationMessage);" value="{{female_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-female_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>12.3 Total <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_worked_days" name="total_worked_days" class="form-control" placeholder="Enter Total  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'total_worked_days', totalWOrkedDaysValidationMessage);" value="{{total_worked_days}}" readonly>
                            </div>
                            <span class="error-message error-message-single-return-total_worked_days"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>13. Amount of wages paid  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="paid_amount" name="paid_amount" class="form-control" placeholder="Enter Amount of wages paid !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'paid_amount', paidAmountValidationMessage);" value="{{paid_amount}}">
                            </div>
                            <span class="error-message error-message-single-return-paid_amount"></span>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>14. Amount of deduction from wages <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="amount_deduction" name="amount_deduction" class="form-control" placeholder="Enter Amount of deduction from wages  !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'amount_deduction', amountDeductionValidationMessage);" value="{{amount_deduction}}">
                            </div>
                            <span class="error-message error-message-single-return-amount_deduction"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">15. The following has been provided ? </span>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>15.1 Canteen <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_canteen_yes" name="is_provide_canteen" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_canteen_no" name="is_provide_canteen" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>15.2 Rest rooms <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_restroom_yes" name="is_provide_restroom" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_restroom_no" name="is_provide_restroom" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>15.3 Drinking water <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_drinking_water_yes" name="is_provide_drinking_water" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_drinking_water_no" name="is_provide_drinking_water" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>15.4 Creches <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_creches_yes" name="is_provide_creches" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_creches_no" name="is_provide_creches" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-4">
                            <label>15.5 First aid  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_provide_firstaid_yes" name="is_provide_firstaid" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_provide_firstaid_no" name="is_provide_firstaid" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partc_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartD($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_partb_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartB($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>