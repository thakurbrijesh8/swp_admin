<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART E</div>
                <div style="font-size: 16px; margin-top: 0px;">May establishment is covered under the Payment of wages Act,1936 and the rule made there under. All worker/office staff are paid wages as prescribed manner. I have mantained all registers and records are required under the law.</div>
                
            </div>
            <form role="form" id="single_return_parte_form" name="single_return_parte_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_parte_id" name="singlereturn_parte_id" value="{{singlereturn_parte_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-single-return f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Whether applicantion in respect of Fines being Imposed on the employees in sent<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="respect_of_fines" name="respect_of_fines" class="form-control" placeholder="Enter Whether applicantion in respect of Fines being Imposed on the employees in sent !"
                                       maxlength="100" onblur="checkValidation('single-return', 'respect_of_fines', respectOfFinesValidationMessage);" value="{{respect_of_fines}}">
                            </div>
                            <span class="error-message error-message-single-return-respect_of_fines"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Number of man days worked (i.e. aggregate number of attendence) during the year for person Earning more than Rs. 1600/- per month<br>2.1 Adult<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_worked_days" name="adult_worked_days" class="form-control" placeholder="Enter Number of man days worked !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'adult_worked_days', adultsWorkedDaysValidationMessage);" value="{{adult_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_worked_days"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 44px;">2.2 Young Persons<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="young_person_worked_days" name="young_person_worked_days" class="form-control" placeholder="Enter Number of man days worked !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'young_person_worked_days', youngPersonWorkedDaysValidationMessage);" value="{{young_person_worked_days}}">
                            </div>
                            <span class="error-message error-message-single-return-young_person_worked_days"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Average number of workers employed daily (i.e. man days worked divided by number of days worked) for person earning more than Rs 1600/- per month<br>3.1 Adult<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="adult_workers_employed" name="adult_workers_employed" class="form-control" placeholder="Enter Average number of workers employed daily !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'adult_workers_employed', adultsWorkersEmployedValidationMessage);" value="{{adult_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-adult_workers_employed"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label style="margin-top: 44px;">3.2 Young Persons<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="young_peson_workers_employed" name="young_peson_workers_employed" class="form-control" placeholder="Enter Average number of workers employed daily !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'young_peson_workers_employed', youngPersonWorkersEmployedValidationMessage);" value="{{young_peson_workers_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-young_peson_workers_employed"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Total wages paid including deduction under section 7(2) of the payment of wages Act,1936  for person getting less than Rs. 1600/- per month on the following account</span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Basic wages only<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="basic_wages" name="basic_wages" class="form-control" placeholder="Enter Basic wages only !"
                                       maxlength="100" onblur="checkValidation('single-return', 'basic_wages', basicwagesValidationMessage);" value="{{basic_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-basic_wages"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Dearness Allowances<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="dearness_allowances" name="dearness_allowances" class="form-control" placeholder="Enter Dearness Allowances !"
                                       maxlength="100" onblur="checkValidation('single-return', 'dearness_allowances', dearnessAllowancesValidationMessage);">{{dearness_allowances}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-dearness_allowances"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Composite wages only (i.e. if combined Basic wages and dearness allowance paid)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="composite_wages" name="composite_wages" class="form-control" placeholder="Enter Composite wages only !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'composite_wages', compositewagesValidationMessage);" value="{{composite_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-composite_wages"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Overtime Wages<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="overtime_wages" name="overtime_wages" class="form-control" placeholder="Enter Overtime Wages !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'overtime_wages', overtimeWagesValidationMessage);">{{overtime_wages}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-overtime_wages"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Non-profit sharing bonus<span class="color-nic-red">*</span></label>
                            <div class="input-group" style="margin-top: 24px;">
                                <input type="text" id="nonprofit_bonus" name="nonprofit_bonus" class="form-control" placeholder="Enter Non-profit sharing bonus !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'nonprofit_bonus', nonProfitBonusValidationMessage);" value="{{nonprofit_bonus}}">
                            </div>
                            <span class="error-message error-message-single-return-nonprofit_bonus"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Any Other Bonus (other than profit sharing bonus and non-profit sharing Bonus) forming part of wages As define under the Act<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="other_bonus" name="other_bonus" class="form-control" placeholder="Enter Any Other Bonus !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'other_bonus', otherBonusValidationMessage);">{{other_bonus}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-other_bonus"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Any other amount paid in cash which may form part of wages as define under the Act (Please Specify)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_amount" name="other_amount" class="form-control" placeholder="Enter Any other amount paid in cash which may form part of wages as define under the Act !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'other_amount', otherAmountValidationMessage);" value="{{other_amount}}">
                            </div>
                            <span class="error-message error-message-single-return-other_amount"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11. Arrears of pat in respects of Previous year during the year<span class="color-nic-red">*</span></label>
                            <div class="input-group" style="margin-top: 21px;">
                                <textarea id="arrears_of_pat" name="arrears_of_pat" class="form-control" placeholder="Enter Arrears of pat in respects of Previous year during the year !"
                                       maxlength="100" onblur="checkValidation('single-return', 'arrears_of_pat', arrearsOfPatValidationMessage);">{{arrears_of_pat}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-arrears_of_pat"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Total wages paid<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_wages" name="total_wages" class="form-control" placeholder="Enter Total wages paid !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'total_wages', totalWagesValidationMessage);" value="{{total_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-total_wages"></span>
                        </div>
                    </div>
                   <span class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Gross amount paid as remuneration to person getting less than 1600/- per month including deduction under section 7(2) of the Act on the following Accounts :</span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>13. Total wages paid during the year<span class="color-nic-red">*</span></label>
                            <div class="input-group" style="margin-top: 24px;">
                                <input type="text" id="year_total_wages" name="year_total_wages" class="form-control" placeholder="Enter Total wages paid during the year !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'year_total_wages', yearTotalWagesValidationMessage);" value="{{year_total_wages}}">
                            </div>
                            <span class="error-message error-message-single-return-year_total_wages"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>14. Bonus paid during the year (including arrears also , if paid during the year. This is statutory sharing Bonus)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="year_paid_bonus" name="year_paid_bonus" class="form-control" placeholder="Enter Bonus paid during the year !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'year_paid_bonus', yearPaidBonusValidationMessage);">{{year_paid_bonus}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-year_paid_bonus"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>15. Amount of money Value of Commision given during the year<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="commision_amount" name="commision_amount" class="form-control" placeholder="Enter Amount of money Value of Commision given during the year !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'commision_amount', commisionAmountValidationMessage);" value="{{commision_amount}}">
                            </div>
                            <span class="error-message error-message-single-return-commision_amount"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>16. Deduction number of case and amount realized <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="realized_amount" name="realized_amount" class="form-control" placeholder="Enter Deduction number of case and amount realized !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('single-return', 'realized_amount', realizedAmountValidationMessage);">{{realized_amount}}</textarea>
                            </div>
                            <span class="error-message error-message-single-return-realized_amount"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();">Cancel</button>
                        <button type="button" id="submit_btn_for_parte_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.submitPartEDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_partd_details" class="btn btn-sm btn-success pull-right" onclick="SingleReturn.listview.editOrViewPartD($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>