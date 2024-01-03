<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART B</div>
                <div style="font-size: 16px; margin-top: 0px;">May establishment is covered under the Payment of Bonus Act,1965 and the workers are paid bonus. I have maintained records and registers as per the Act.</div>
                
            </div>
            <form role="form" id="single_return_partb_form" name="single_return_partb_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_partb_id" name="singlereturn_partb_id" value="{{singlereturn_partb_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-single-return f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Percentage of bonus paid<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="percentage_of_bonus" name="percentage_of_bonus" class="form-control" placeholder="Enter Percentage of bonus paid !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'percentage_of_bonus', percentageBonusValidationMessage);" value="{{percentage_of_bonus}}">
                            </div>
                            <span class="error-message error-message-single-return-percentage_of_bonus"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Number of baneficiaries<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_baneficiaries" name="no_of_baneficiaries" class="form-control" placeholder="Enter Number of baneficiaries !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'no_of_baneficiaries', noOfBeneficiariesValidationMessage);" value="{{no_of_baneficiaries}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_baneficiaries"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Total amount of bonus paid<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_bonus_paid" name="total_bonus_paid" class="form-control" placeholder="Enter Total amount of bonus paid !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'total_bonus_paid', bonusPaidValidationMessage);" value="{{total_bonus_paid}}">
                            </div>
                            <span class="error-message error-message-single-return-total_bonus_paid"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Date of payment  <span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="payment_date" id="payment_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{payment_date}}" onblur="checkValidation('single-return', 'payment_date', paymentDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-single-return-payment_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. If bonus is not paid, reason there of</label>
                            <div class="input-group">
                                <textarea id="not_paid_reason" name="not_paid_reason" class="form-control" placeholder="Enter if bonus is not paid, reason there of !"
                                       maxlength="100" onblur="checkValidation('single-return', 'not_paid_reason', bonusReasonValidationMessage);" >{{not_paid_reason}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-not_paid_reason"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partb_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.submitPartBDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_parta_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartA($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>