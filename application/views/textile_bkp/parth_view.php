<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART H</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(H) ASSISTANCE FOR TECHNOLOGY UPGRADATION   </div>
                
            </div>
            <form role="form" id="incentive_parth_form" name="incentive_parth_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_parth_id" name="incentive_parth_id" value="{{incentive_parth_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-parth f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of the Enterprise<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="enterprise_name" name="enterprise_name" class="form-control" placeholder="Enter Name of the Enterprise !"
                                       maxlength="100" readonly onblur="checkValidation('incentive-parth', 'enterprise_name', enterpriseNameValidationMessage);" value="{{enterprise_name}}">
                            </div>
                            <span class="error-message error-message-incentive-parth-enterprise_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Purpose of Technology <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" disabled id="acquisition" name="technology_purpose" class="" value="{{VALUE_ONE}}" >&nbsp; Acquisition
                                &emsp;
                                <input type="radio" disabled id="upgradation" name="technology_purpose" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;Upgradation
                            </div>
                            <span class="error-message error-message-incentive-parth-technology_purpose"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Sector of Technical Textile (from 13 sector as in Scheme)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="sector_textile" name="sector_textile" class="form-control" placeholder="Enter Sector of Technical Textile (from 13 sector as in Scheme) !"
                                       maxlength="100" readonly onblur="checkValidation('incentive-parth', 'sector_textile', sectorTextileValidationMessage);" value="{{sector_textile}}">
                            </div>
                            <span class="error-message error-message-incentive-parth-sector_textile"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Whether the enterprise acquiring the technology for the first time in India for specialized application ? If so, please give the details with justification thereof <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" disabled id="enterprise_accqu_yes" name="enterprise_accqu" class="" value="{{VALUE_ONE}}" >&nbsp; YES
                                &emsp;
                                <input type="radio" disabled id="enterprise_accqu_no" name="enterprise_accqu" class="" style="margin-bottom: 0px;" value="{{VALUE_TWO}}" >&nbsp;NO
                            </div>
                            <span class="error-message error-message-incentive-parth-enterprise_accqu"></span>
                        </div>
                    </div>
                    <div class="enterprise_accqu_div" style="display :none">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>4.1 Give Details with Justification<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="justification" name="justification" class="form-control" placeholder="Enter Give Details with Justification !"
                                           maxlength="100" readonly onblur="checkValidation('incentive-parth', 'justification', justificationValidationMessage);" value="{{justification}}">
                                </div>
                                <span class="error-message error-message-incentive-parth-justification"></span>
                            </div>
                            <div class="form-group col-sm-6">
                                <label>4.2 Brief of New Technology with manufacturing process & details thereof<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="process_detail" name="process_detail" class="form-control" placeholder="Enter Brief of New Technology with manufacturing process & details thereof !"
                                           maxlength="100" readonly onblur="checkValidation('incentive-parth', 'process_detail', processDetailValidationMessage);" value="{{process_detail}}">
                                </div>
                                <span class="error-message error-message-incentive-parth-justification"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label>4.3 Name & Address of the entity from which Technology will be acquired along with copy of<span class="color-nic-red">*</span></label>
                                <div class="input-group">
                                    <input type="text" id="name_address" name="name_address" class="form-control" placeholder="Enter Name & Address of the entity from which Technology will be acquired along with copy of !"
                                           maxlength="100" readonly onblur="checkValidation('incentive-parth', 'name_address', nameAddressValidationMessage);" value="{{name_address}}">
                                </div>
                                <span class="error-message error-message-incentive-parth-name_address"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12" id="arrangement_uploader_container_for_textile">
                                <label>4.4 Upload Arrangement<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                                <input type="file" id="arrangement_uploader_for_textile" name="arrangement_uploader_for_textile"
                                       accept="pdf">
                                <div class="error-message error-message-msme-arrangement_uploader_for_textile"></div>
                            </div>
                            <div class="form-group col-sm-12" id="arrangement_uploader_name_container_for_textile" style="display: none;">
                                <label>4.4 Upload Arrangement<span style="color: red;">*</label><br>
                                <a id="arrangement_uploader_name_image_for_textile_download" download><label id="arrangement_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12" id="mou_uploader_container_for_textile">
                                <label>4.5 Upload MOU<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                                <input type="file" id="mou_uploader_for_textile" name="mou_uploader_for_textile"
                                       accept="pdf">
                                <div class="error-message error-message-msme-mou_uploader_for_textile"></div>
                            </div>
                            <div class="form-group col-sm-12" id="mou_uploader_name_container_for_textile" style="display: none;">
                                <label>4.5 Upload MOU<span style="color: red;">*</label><br>
                                <a id="mou_uploader_name_image_for_textile_download" download><label id="mou_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of Commencement of Commercial Production on Technology upgradation<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="commencement_date" id="commencement_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{commencement_date}}" readonly onblur="checkValidation('incentive-parth', 'commencement_date', commencementDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-parth-commencement_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>6. Details of Cost of Acquisition / Upgradation</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Purchase of Design & Drawings</th>
                                        <th>Technology Development Fees to Experts / R&D Institutions / Technical Consultancy Firm</th>
                                        <th>Others</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>
                                            <input type="text" id="purchase" name="purchase" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotalAcquisition($(this));checkValidation('incentive-parth', 'purchase', purchaseValidationMessage);" value="{{purchase}}">
                                            <span class="error-message error-message-incentive-parth-purchase"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="technology_fees" name="technology_fees" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotalAcquisition($(this));checkValidation('incentive-parth', 'technology_fees', technologyFeesValidationMessage);" value="{{technology_fees}}">
                                            <span class="error-message error-message-incentive-parth-technology_fees"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="other_detail" name="other_detail" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotalAcquisition($(this));checkValidation('incentive-parth', 'other_detail', otherDetailValidationMessage);" value="{{other_detail}}">
                                            <span class="error-message error-message-incentive-parth-other_detail"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="upgradation_total" name="upgradation_total" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('incentive-parth', 'upgradation_total', financeTotalValidationMessage);" value="{{upgradation_total}}" >
                                            <span class="error-message error-message-incentive-parth-upgradation_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>7. Means of Finance (in Lakhs)</label>
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
                                            <input type="text" id="contribution" name="contribution" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('incentive-parth', 'contribution', contributionValidationMessage);" value="{{contribution}}">
                                            <span class="error-message error-message-incentive-parth-contribution"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="term_loan" name="term_loan" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('incentive-parth', 'term_loan', termLoanValidationMessage);" value="{{term_loan}}">
                                            <span class="error-message error-message-incentive-parth-term_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="unsecured_loan" name="unsecured_loan" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('incentive-parth', 'unsecured_loan', unsecuredLoanValidationMessage);" value="{{unsecured_loan}}">
                                            <span class="error-message error-message-incentive-parth-unsecured_loan"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="accruals" name="accruals" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));getTotal($(this));checkValidation('incentive-parth', 'accruals', accrualsValidationMessage);" value="{{accruals}}">
                                            <span class="error-message error-message-incentive-parth-accruals"></span>
                                        </th>
                                        <th>
                                            <input type="text" id="finance_total" name="finance_total" class="form-control"placeholder="" maxlength="100" readonly onkeyup="checkNumeric($(this));" onblur="checkNumeric($(this));checkValidation('incentive-parth', 'finance_total', financeTotalValidationMessage);" value="{{finance_total}}" >
                                            <span class="error-message error-message-incentive-parth-finance_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">8. Details of Financial Institution </span>
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
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_financial_institution" onclick="Textile.listview.addFinancialInstitution({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Financial Institution Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>9. Date of First Disbursement of Term Loan<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="term_loan_date" id="term_loan_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{term_loan_date}}" readonly onblur="checkValidation('incentive-parth', 'term_loan_date', termLoanDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-parth-term_loan_date"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>10. Term Loan Account No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="loan_accountno" name="loan_accountno" class="form-control" placeholder="Enter Term Loan Account No. !" maxlength="100" readonly onblur="checkValidation('incentive-parth', 'loan_accountno', loanAccountNoValidationMessage);" value="{{loan_accountno}}">
                            </div>
                            <span class="error-message error-message-incentive-parth-loan_accountno"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">Project Report,covering</span>
                    <div class="row">
                        <div class="form-group col-sm-12" id="project_profile_uploader_container_for_textile">
                            <label>11. Copy Of Project Profile<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="project_profile_uploader_for_textile" name="project_profile_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-project_profile_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="project_profile_uploader_name_container_for_textile" style="display: none;">
                            <label>11. Copy Of Project Profile<span style="color: red;">*</label><br>
                            <a id="project_profile_uploader_name_image_for_textile_download" download><label id="project_profile_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="details_uploader_container_for_textile">
                            <label>12. Copy Of Details of equipments & machineries<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="details_uploader_for_textile" name="details_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-details_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="details_uploader_name_container_for_textile" style="display: none;">
                            <label>12. Copy Of Details of equipments & machineries<span style="color: red;">*</label><br>
                            <a id="details_uploader_name_image_for_textile_download" download><label id="details_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="investment_uploader_container_for_textile">
                            <label>13. Copy Of Fixed Capital investment<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="investment_uploader_for_textile" name="investment_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-investment_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="investment_uploader_name_container_for_textile" style="display: none;">
                            <label>13. Copy Of Fixed Capital investment<span style="color: red;">*</label><br>
                            <a id="investment_uploader_name_image_for_textile_download" download><label id="investment_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="annual_production_uploader_container_for_textile">
                            <label>14. Annual Production, Sales<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="annual_production_uploader_for_textile" name="annual_production_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-annual_production_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="annual_production_uploader_name_container_for_textile" style="display: none;">
                            <label>14. Annual Production, Sales<span style="color: red;">*</label><br>
                            <a id="annual_production_uploader_name_image_for_textile_download" download><label id="annual_production_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="power_consumption_uploader_container_for_textile">
                            <label>15. Power Consumption<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="power_consumption_uploader_for_textile" name="power_consumption_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-power_consumption_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="power_consumption_uploader_name_container_for_textile" style="display: none;">
                            <label>15. Power Consumption<span style="color: red;">*</label><br>
                            <a id="power_consumption_uploader_name_image_for_textile_download" download><label id="power_consumption_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="impact_uploader_container_for_textile">
                            <label>16. Impact on adoption of new technology on product quality & energy consumption/savings<span style="color: red;">* <br/>(Maximum File Size: 1MB)&nbsp;(Upload PDF Only)</span></label><br>
                            <input type="file" id="impact_uploader_for_textile" name="impact_uploader_for_textile"
                                   accept="pdf">
                            <div class="error-message error-message-msme-impact_uploader_for_textile"></div>
                        </div>
                        <div class="form-group col-sm-12" id="impact_uploader_name_container_for_textile" style="display: none;">
                            <label>16. Impact on adoption of new technology on product quality & energy consumption/savings<span style="color: red;">*</label><br>
                            <a id="impact_uploader_name_image_for_textile_download" download><label id="impact_uploader_name_image_for_textile" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">17. Total Amount Claim for Assistance :</span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>17.1 [25% (max.25 Lakhs) once during the operative period]<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="interest_subsidy" name="interest_subsidy" class="form-control" placeholder="Enter [25% (max.25 Lakhs) once during the operative period] !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-parth', 'interest_subsidy', intrestSubsidyValidationMessage);" value="{{interest_subsidy}}">
                            </div>
                            <span class="error-message error-message-incentive-parth-interest_subsidy"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>17.2 Any Other Information<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="other_info" name="other_info" class="form-control" placeholder="Enter Any Other Information !"
                                       maxlength="100" readonly onblur="checkValidation('incentive-parth', 'other_info', otherInfoValidationMessage);" value="{{other_info}}">
                            </div>
                            <span class="error-message error-message-incentive-parth-other_info"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();">Cancel</button>
                        <button type="button" id="submit_btn_for_parth_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.editOrViewDeclaration($('#previous_btn_for_parth_details'), '{{incentive_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.editOrViewForms($('#previous_btn_for_parth_details'), '{{incentive_id}}', true, 'parth_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>