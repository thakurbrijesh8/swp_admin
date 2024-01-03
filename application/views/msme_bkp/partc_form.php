<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART C</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(c) ASSISTANCE FOR PATENT REGISTRATION  </div>
                
            </div>
            <form role="form" id="incentive_partc_form" name="incentive_partc_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_partc_id" name="incentive_partc_id" value="{{incentive_partc_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-partc f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Patent Registration No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_no" name="registration_no" class="form-control" placeholder="Enter Patent Registration No. !"
                                       maxlength="100" onblur="checkValidation('incentive-partc', 'registration_no', registrationNoValidationMessage);" value="{{registration_no}}">
                            </div>
                            <span class="error-message error-message-incentive-partc-registration_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Certificate Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="registration_date" id="registration_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{registration_date}}" onblur="checkValidation('incentive-partc', 'registration_date', certificateDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-partc-registration_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name & Address of Office from where patent registration was obtained <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="patent_name" name="patent_name" class="form-control" placeholder="Enter Name & Address of Office from where patent registration was obtained !" maxlength="100" onblur="checkValidation('incentive-partc', 'patent_name', patentNameValidationMessage);">{{patent_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partc-patent_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Name of Product / Activity for which Patent registration is obtained <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="product_name" name="product_name" class="form-control" placeholder="Enter Name of Product / Activity for which Patent registration is obtained !" maxlength="100" onblur="checkValidation('incentive-partc', 'product_name', productNameValidationMessage);">{{product_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partc-product_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Total Expenditure made on patent registration with details<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="patent_expenditure" name="patent_expenditure" class="form-control" placeholder="Enter Total Expenditure made on patent registration with details !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partc', 'patent_expenditure', patentExpenditureValidationMessage);" value="{{patent_expenditure}}">
                            </div>
                            <span class="error-message error-message-incentive-partc-patent_expenditure"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Total Amount claim for Assistance (50% subsidy claim on Patent Registration)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="claim_amount" name="claim_amount" class="form-control" placeholder="Enter Total Amount claim for Assistance (50% subsidy claim on Patent Registration) !" maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('incentive-partc', 'claim_amount', cliamAmountValidationMessage);" value="{{claim_amount}}">
                            </div>
                            <span class="error-message error-message-incentive-partc-claim_amount"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partc_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.submitPartCDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewForms($('#previous_btn_for_partb_details'), '{{incentive_id}}', true, 'partc_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>