<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART A</div>
                <div style="font-size: 16px; margin-top: 0px;">May establishment is covered under the Minimum Wages Act,1948 rule made thereunder and all workers/office staff are paid wages overtime wages as prescribe by Administration</div>
                
            </div>
            <form role="form" id="single_return_parta_form" name="single_return_parta_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_parta_id" name="singlereturn_parta_id" value="{{singlereturn_parta_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Number of days the esytablishment/factory worked in this year<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="worked_days" name="worked_days" class="form-control" placeholder="Enter Number of days the esytablishment/factory worked in this year !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'worked_days', workedDaysValidationMessage);" value="{{worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-worked_days"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. The number of man days worked in the year<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="man_worked_days" name="man_worked_days" class="form-control" placeholder="Enter The number of man days worked in the year !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'man_worked_days', manWorkedDaysValidationMessage);" value="{{man_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-man_worked_days"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. The Number of Average employees employed in the year<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="average_emp" name="average_emp" class="form-control" placeholder="Enter The Number of Average employees employed in the year !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'average_emp', averageEmpValidationMessage);" value="{{average_emp}}">
                            </div>
                            <span class="error-message error-message-single-return-average_emp"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Total wages paid to Male<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="male_wages" name="male_wages" class="form-control" placeholder="Enter Total wages paid to Male !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'male_wages', maleWagesValidationMessage);" value="{{male_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-male_wages"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Total wages paid to Female<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="female_wages" name="female_wages" class="form-control" placeholder="Enter Total wages paid to Female !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'female_wages', femaleWagesValidationMessage);" value="{{female_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-female_wages"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Total Fine Imposed; If any<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_fine" name="total_fine" class="form-control" placeholder="Enter Total Fine Imposed !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'total_fine', totalFineValidationMessage);" value="{{total_fine}}">
                            </div>
                            <span class="error-message error-message-single-return-total_fine"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Other Deduction; If any<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="deduction" name="deduction" class="form-control" placeholder="Enter Other Deduction !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'deduction', deductionValidationMessage);" value="{{deduction}}">
                            </div>
                            <span class="error-message error-message-single-return-deduction"></span>
                        </div>
                    </div>
                   
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_parta_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartB($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_single_return_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewSingleReturn($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>