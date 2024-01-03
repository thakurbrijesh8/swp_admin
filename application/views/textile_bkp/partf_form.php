<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART F</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(F) INTEREST SUBSIDY FOR TEXTILE SECTOR  </div>
                
            </div>
            <form role="form" id="incentive_partf_form" name="incentive_partf_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_partf_id" name="incentive_partf_id" value="{{incentive_partf_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-partf f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="enterprise_name" name="enterprise_name" class="form-control" placeholder="Enter Name of the Enterprise !"
                                       maxlength="100" onblur="checkValidation('incentive-partf', 'enterprise_name', enterpriseNameValidationMessage);" value="{{enterprise_name}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-enterprise_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Category of the Enterprise <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="new" name="enterprise_category" class="" value="{{VALUE_ONE}}" >&nbsp; New
                                &emsp;
                                <input type="radio" id="expansion" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Expansion
                                &emsp;
                                <input type="radio" id="diversification" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_THREE}}" >&nbsp;Diversification
                                &emsp;
                                <input type="radio" id="modernization" name="enterprise_category" class="" style="margin-bottom: 0px;" value="{{VALUE_FOUR}}" >&nbsp;Modernization
                            </div>
                            <span class="error-message error-message-incentive-partf-email"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0 new_project_div">3 For New Project  </span>
                    <div class="row new_project_div">
                        <div class="form-group col-sm-6">
                            <label>3.1 Investment made in Plant & Machinery  - (In Lacs)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="investment" name="investment" class="form-control" placeholder="Enter Investment made in Plant & Machinery  - (In Lacs) !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partf', 'investment', investmentValidationMessage);" value="{{investment}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-investment"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0 expansion_div">4 For Unit going under Expansion / Diversification / Modernization (in Lakhs) </span>
                    <div class="row expansion_div">
                        <div class="form-group col-sm-6">
                            <label>4.1 Investment already made in Plant & Machinery in Existing Unit<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="machinery_units" name="machinery_units" class="form-control" placeholder="Enter Investment already made in Plant & Machinery in Existing Unit !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partf', 'machinery_units', machineryUnitValidationMessage);" value="{{machinery_units}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-machinery_units"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4.2 New Investment in Plant & Machinery<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="new_investment" name="new_investment" class="form-control" placeholder="Enter New Investment in Plant & Machinery !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partf', 'new_investment', newInvestmentValidationMessage);" value="{{new_investment}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-new_investment"></span>
                        </div>
                    </div>
                    <div class="row expansion_div">
                        <div class="form-group col-sm-6">
                            <label>4.3 Increase in Investment (%)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="investment_percentage" name="investment_percentage" class="form-control" placeholder="Enter Increase in Investment (%) !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partf', 'investment_percentage', investmentPercentageValidationMessage);" value="{{investment_percentage}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-investment_percentage"></span>
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
                                            <input type="text" id="contribution" name="contribution" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'contribution', contributionValidationMessage);" value="{{contribution}}">
                                            <span class="error-message error-message-single-return-contribution"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="term_loan" name="term_loan" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'term_loan', termLoanValidationMessage);" value="{{term_loan}}">
                                            <span class="error-message error-message-single-return-term_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="unsecured_loan" name="unsecured_loan" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'unsecured_loan', unsecuredLoanValidationMessage);" value="{{unsecured_loan}}">
                                            <span class="error-message error-message-single-return-unsecured_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="accruals" name="accruals" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('single-return', 'accruals', accrualsValidationMessage);" value="{{accruals}}">
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
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_financial_institution" onclick="Textile.listview.addFinancialInstitution({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Financial Institution Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Date of First Disbursement of Term Loan<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="term_loan_date" id="term_loan_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{term_loan_date}}" onblur="checkValidation('incentive-partf', 'term_loan_date', termLoanDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-partf-term_loan_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Term Loan Account No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="loan_accountno" name="loan_accountno" class="form-control" placeholder="Enter Term Loan Account No. !" maxlength="100" onblur="checkValidation('incentive-partf', 'loan_accountno', loanAccountNoValidationMessage);" value="{{loan_accountno}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-loan_accountno"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">Project Report,covering</span>
                    <div class="row">
                        <div class="form-group col-sm-12" id="project_profile_uploader_container_for_textile">
                            <label>9. Copy Of Project Profile<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="project_profile_uploader_for_textile" name="project_profile_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-project_profile_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="project_profile_uploader_name_container_for_textile" style="display: none;">
                            <label>9. Copy Of Project Profile<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="project_profile_uploader_name_image_for_textile_download" download><label id="project_profile_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="details_uploader_container_for_textile">
                            <label>10. Copy Of Details of equipments & machineries<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="details_uploader_for_textile" name="details_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-details_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="details_uploader_name_container_for_textile" style="display: none;">
                            <label>10. Copy Of Details of equipments & machineries<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="details_uploader_name_image_for_textile_download" download><label id="details_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="investment_uploader_container_for_textile">
                            <label>11. Copy Of Fixed Capital investment<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="investment_uploader_for_textile" name="investment_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-investment_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="investment_uploader_name_container_for_textile" style="display: none;">
                            <label>11. Copy Of Fixed Capital investment<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="investment_uploader_name_image_for_textile_download" download><label id="investment_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">12. Total Amount Claim for Assistance :</span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12.1  Subsidy @ 5% (max. 50 Lakhs) per annum<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="interest_subsidy" name="interest_subsidy" class="form-control" placeholder="Enter Interest Subsidy @ 5% (max. 50 Lakhs) per annum !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partf', 'interest_subsidy', intrestSubsidyValidationMessage);" value="{{interest_subsidy}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-interest_subsidy"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>12.2 Any Other Information<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_info" name="other_info" class="form-control" placeholder="Enter Any Other Information !"
                                       maxlength="100" onblur="checkValidation('incentive-partf', 'other_info', otherInfoValidationMessage);" value="{{other_info}}">
                            </div>
                            <span class="error-message error-message-incentive-partf-other_info"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partf_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.submitPartFDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.editOrViewScheme($('#previous_btn_for_parta_details'), '{{incentive_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>