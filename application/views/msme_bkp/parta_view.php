<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART A</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(A) Capital Investment / Interest Subsidy </div>
                
            </div>
            <form role="form" id="incentive_parta_form" name="incentive_parta_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_parta_id" name="incentive_parta_id" value="{{incentive_parta_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-parta f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="enterprise_name" name="enterprise_name" class="form-control" placeholder="Enter Name of the Enterprise !"
                                       maxlength="100" readonly onblur="checkValidation('incentive-parta', 'enterprise_name', enterpriseNameValidationMessage);" value="{{enterprise_name}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-enterprise_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Category of the Enterprise <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" disabled id="new" name="enterprise_category" class="" value="{{VALUE_ONE}}" >&nbsp; New
                                &emsp;
                                <input type="radio" disabled id="expansion" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Expansion
                                &emsp;
                                <input type="radio" disabled id="diversification" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_THREE}}" >&nbsp;Diversification
                                &emsp;
                                <input type="radio" disabled id="modernization" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_FOUR}}" >&nbsp;Modernization
                            </div>
                            <span class="error-message error-message-incentive-parta-email"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0 new_project_div">3 For New Project  </span>
                    <div class="row new_project_div">
                        <div class="form-group col-sm-6">
                            <label>3.1 Investment made in Plant & Machinery  - (In Lacs)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="investment" name="investment" class="form-control" placeholder="Enter Investment made in Plant & Machinery  - (In Lacs) !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-parta', 'investment', investmentValidationMessage);" value="{{investment}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-investment"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0 expansion_div">4 For Unit going under Expansion / Diversification / Modernization (in Lakhs) </span>
                    <div class="row expansion_div">
                        <div class="form-group col-sm-6">
                            <label>4.1 Investment already made in Plant & Machinery in Existing Unit<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="machinery_units" name="machinery_units" class="form-control" placeholder="Enter Investment already made in Plant & Machinery in Existing Unit !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-parta', 'machinery_units', machineryUnitValidationMessage);" value="{{machinery_units}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-machinery_units"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.2 New Investment in Plant & Machinery<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="new_investment" name="new_investment" class="form-control" placeholder="Enter New Investment in Plant & Machinery !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-parta', 'new_investment', newInvestmentValidationMessage);" value="{{new_investment}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-new_investment"></span>
                        </div>
                    </div>
                    <div class="row expansion_div">
                        <div class="form-group col-sm-6">
                            <label>4.4 Increase in Investment (%)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="investment_percentage" name="investment_percentage" class="form-control" placeholder="Enter Increase in Investment (%) !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-parta', 'investment_percentage', investmentPercentageValidationMessage);" value="{{investment_percentage}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-investment_percentage"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>5. Means of Finance (in Lakhs)</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Promoters Contribution</th>
                                        <th>Term Loan</th>
                                        <th>Unsecured Loan</th>
                                        <th>Internal Accruals / Others</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>
                                            <input type="text" id="contribution" name="contribution" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'contribution', contributionValidationMessage);" value="{{contribution}}">
                                            <span class="error-message error-message-single-return-contribution"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="term_loan" name="term_loan" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'term_loan', termLoanValidationMessage);" value="{{term_loan}}">
                                            <span class="error-message error-message-single-return-term_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="unsecured_loan" name="unsecured_loan" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'unsecured_loan', unsecuredLoanValidationMessage);" value="{{unsecured_loan}}">
                                            <span class="error-message error-message-single-return-unsecured_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="accruals" name="accruals" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'accruals', accrualsValidationMessage);" value="{{accruals}}">
                                            <span class="error-message error-message-single-return-accruals"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="finance_total" name="finance_total" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'finance_total', financeTotalValidationMessage);" value="{{finance_total}}" readonly>
                                            <span class="error-message error-message-single-return-finance_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">6. Details of Financial Institution </span>
                                <hr>
                                <table class="table table-bordered m-b-0px" id="financialInstitutionList" style="margin-top: 10px;text-align: center;">
                                    <thead>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th>Name & address</th>
                                            <th>IFSC Code No.</th>
                                            <th>Branch Code No.</th>
                                            <th>Type of Loan</th>
                                            <th>Sanction Amount</th>
                                            <th>Date</th>
                                            <th>Rate of Interest %</th>
                                        </tr>
                                    </thead>
                                    <tbody id="financial_institution_info_container">
                                    </tbody>
                                </table>
                            </div>
                            <div class="box-footer" align="right" >
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_financial_institution" onclick="MSME.listview.addFinancialInstitution({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Financial Institution Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Date of First Disbursement of Term Loan<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="term_loan_date" id="term_loan_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{term_loan_date}}" readonly onblur="checkValidation('incentive-parta', 'term_loan_date', termLoanDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-parta-term_loan_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Term Loan Account No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="loan_accountno" name="loan_accountno" class="form-control" placeholder="Enter Term Loan Account No. !" maxlength="100" readonly onblur="checkValidation('incentive-parta', 'loan_accountno', loanAccountNoValidationMessage);" value="{{loan_accountno}}">
                            </div>
                            <span class="error-message error-message-incentive-parta-loan_accountno"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>9. Total Amount Claim for Assistance</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Sr. No.</th>
                                        <th>Type of Assistance</th>
                                        <th>Amount</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>1</th>
                                        <th>Capital Investment Subsidy</th>
                                        <th>
                                            <input type="text" id="capital_subsidy" name="capital_subsidy" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalInvestment($(this));checkValidation('single-return', 'capital_subsidy', capitalSubsidyValidationMessage);" value="{{capital_subsidy}}">
                                            <span class="error-message error-message-single-return-capital_subsidy"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>2</th>
                                        <th>Interest Subsidy @ 5% per annum (max. 30 Lakhs per annum)</th>
                                        <th>
                                            <input type="text" id="anum" name="anum" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalInvestment($(this));checkValidation('single-return', 'anum', anumValidationMessage);" value="{{anum}}">
                                            <span class="error-message error-message-single-return-anum"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            <input type="text" id="cliam_amount_total" name="cliam_amount_total" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('single-return', 'cliam_amount_total', clamAmountTotalValidationMessage);" value="{{cliam_amount_total}}" readonly>
                                            <span class="error-message error-message-single-return-cliam_amount_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">10. I / We OPT for the date of eligibility of interest subsidy from the </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10.1 Date of commencement of commercial production<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="commencement_date" id="commencement_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{commencement_date}}" readonly onblur="checkValidation('incentive-parta', 'commencement_date', commencementDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-parta-commencement_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10.2 Date of first Disbursement of Loan<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="disbursement_date" id="disbursement_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{disbursement_date}}" readonly onblur="checkValidation('incentive-parta', 'disbursement_date', disbursementDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-parta-disbursement_date"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_parta_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewFormsForView($('#previous_btn_for_parta_details'), '{{incentive_id}}', false, 'parta_form');" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewScheme($('#previous_btn_for_parta_details'), '{{incentive_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>