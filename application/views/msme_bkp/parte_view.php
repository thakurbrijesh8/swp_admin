<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART E</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(E) INCENTIVES FOR LOCAL EMPLOYMENT </div>
                
            </div>
            <form role="form" id="incentive_parte_form" name="incentive_parte_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_parte_id" name="incentive_parte_id" value="{{incentive_parte_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Total Number of Local Employment Newly recruited<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="newly_requit_emp" name="newly_requit_emp" class="form-control" placeholder="Enter Total Number of Local Employment Newly recruited !"
                                       maxlength="100" disabled onblur="checkValidation('incentive-parte', 'newly_requit_emp', requitEmpValidationMessage);" value="{{newly_requit_emp}}">
                            </div>
                            <span class="error-message error-message-incentive-parte-newly_requit_emp"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Total Expenditure made on Local Employment<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="emp_total_expenditure" name="emp_total_expenditure" class="form-control" placeholder="Enter Total Expenditure made on Local Employment !"
                                       maxlength="100" disabled onblur="checkValidation('incentive-parte', 'emp_total_expenditure', empExpenditureValidationMessage);" value="{{emp_total_expenditure}}">
                            </div>
                            <span class="error-message error-message-incentive-parte-emp_total_expenditure"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Total Amount Claim for Assistance (maximum 15 Lakhs)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="assclaim_amount" name="assclaim_amount" class="form-control" placeholder="Enter Total Amount Claim for Assistance !"
                                       maxlength="100" disabled onblur="checkValidation('incentive-parte', 'assclaim_amount', assclaimAmountValidationMessage);" value="{{assclaim_amount}}">
                            </div>
                            <span class="error-message error-message-incentive-parte-assclaim_amount"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_parte_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewDeclaration($('#previous_btn_for_declaration_details'), '{{incentive_id}}', false, 'declaration_form');" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewForms($('#previous_btn_for_partd_details'), '{{incentive_id}}', true, 'parte_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>