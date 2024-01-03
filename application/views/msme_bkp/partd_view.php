<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART D</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(D) ASSISTANCE FOR SAVING IN CONSUMPTION OF ENERGY AND WATER  </div>
                
            </div>
            <form role="form" id="incentive_partd_form" name="incentive_partd_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_partd_id" name="incentive_partd_id" value="{{incentive_partd_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-partd f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name and Address of auditing Institution / consultant for Energy / Water <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="consultant_name" name="consultant_name" class="form-control" placeholder="Enter Name and Address of auditing Institution / consultant for Energy / Water !" maxlength="100" readonly onblur="checkValidation('incentive-partd', 'consultant_name', consultantNameAddressValidationMessage);">{{consultant_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partd-consultant_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Brief of suggestions / recommendation of the Audit Study<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="suggestion" name="suggestion" class="form-control" placeholder="Enter Brief of suggestions / recommendation of the Audit Study!" maxlength="100" readonly onblur="checkValidation('incentive-partd', 'suggestion', suggestionValidationMessage);">{{suggestion}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partd-suggestion"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6 audit_report_div" id="audit_report_container_for_msme">
                            <label>3. Please submit copy Audit report / relevant part of audit report<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <input type="file" id="audit_report_for_msme" name="audit_report_for_msme"
                                   accept="application/pdf">
                            <div class="error-message error-message-msme-audit_report_for_msme"></div>
                        </div>
                        <div class="form-group col-sm-6" id="audit_report_name_container_for_msme" style="display: none;">
                            <label>3. Upload document<span style="color: red;">* <br>(Maximum File Size: 1MB)&nbsp; (Upload PDF Only)</span></label><br>
                            <a id="audit_report_name_image_for_msme_download" download><label id="audit_report_name_image_for_msme" class="btn-nic-blue f-w-n" style="border: 2px solid black;padding: 4px 4px 4px 4px;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Result / Benifits after implementation of energy / water saving equipments i.e. decrease in conservation of water / electricity in Nos. / Units / Liters / etc. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="result_benefit" name="result_benefit" class="form-control" placeholder="Enter Result / Benifits after implementation of energy / water saving equipments i.e. decrease in conservation of water / electricity in Nos. / Units / Liters / etc. !" maxlength="100" readonly onblur="checkValidation('incentive-partd', 'result_benefit', resultBenefitAddressValidationMessage);">{{result_benefit}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partd-result_benefit"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Total Expenditure made on Energy / water Conservation<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_expenditure" name="total_expenditure" class="form-control" placeholder="Enter Total Expenditure made on Energy / water Conservation !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-partd', 'total_expenditure', totalExpenditureValidationMessage);" value="{{total_expenditure}}">
                            </div>
                            <span class="error-message error-message-incentive-partd-total_expenditure"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <div style="background-color: #d2d6de; padding: 5px;">
                                <span class="f-w-b" style="font-size: 15px; color: #000;">6. Name of equipments used for Energy / Water conservation and cost for each equipment</span>
                                <hr>
                                <table class="table table-bordered m-b-0px" id="equipmentsList" style="margin-top: 10px;text-align: center;">
                                    <thead>
                                        <tr style='color: #000;'>
                                            <th></th>
                                            <th>Name of Equipments</th>
                                            <th>Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody id="equipments_info_container">
                                    </tbody>
                                </table>
                            </div>
                            <div class="box-footer" align="right" >
                                <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_equipments" onclick="MSME.listview.addEquipments({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add equipments Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>7. Total Amount Claim for Assistance</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Sr. No.</th>
                                        <th>Type of Assistance</th>
                                        <th>Cost</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>1</th>
                                        <th>75% on cost of Audit Fees (maximum 50,000)</th>
                                        <th>
                                            <input type="text" id="audit_fees" name="audit_fees" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliamAmount($(this));checkValidation('incentive-partd', 'audit_fees', auditFeesValidationMessage);" value="{{audit_fees}}">
                                            <span class="error-message error-message-incentive-partd-audit_fees"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>2</th>
                                        <th>25% on cost of equipments recommendation by Institution (maximum 20 Lakhs)</th>
                                        <th>
                                            <input type="text" id="equipment_cost" name="equipment_cost" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliamAmount($(this));checkValidation('incentive-partd', 'equipment_cost', equipmentCostValidationMessage);" value="{{equipment_cost}}">
                                            <span class="error-message error-message-incentive-partd-equipment_cost"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            <input type="text" id="cliam_amount_total" name="cliam_amount_total" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('incentive-partd', 'cliam_amount_total', clamAmountTotalValidationMessage);" value="{{cliam_amount_total}}" readonly>
                                            <span class="error-message error-message-incentive-partd-cliam_amount_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partd_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewFormsForView($('#previous_btn_for_partd_details'), '{{incentive_id}}', false, 'partd_form');" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewForms($('#previous_btn_for_partc_details'), '{{incentive_id}}', true, 'partd_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>