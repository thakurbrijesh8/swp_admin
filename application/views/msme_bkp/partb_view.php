<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART B</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;">Name of the Scheme :(B) ASSISTANCE FOR QUALITY CERTIFICATION </div>
                
            </div>
            <form role="form" id="incentive_partb_form" name="incentive_partb_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="incentive_partb_id" name="incentive_partb_id" value="{{incentive_partb_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-incentive-partb f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">1. For Enterprise Resource Planning ERP System </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 Name & Address of ERP System Supplier <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="supplier_name" name="supplier_name" class="form-control" placeholder="Enter Name & Address of ERP System Supplier !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'supplier_name', supplierNameAddressValidationMessage);">{{supplier_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-supplier_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.2 Features of the ERP System <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="features" name="features" class="form-control" placeholder="Enter Features of the ERP System !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'features', featureSystemValidationMessage);">{{features}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-features"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">2. For ISO Certification </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.1 Name & Address of Certifing Agency <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="iso_agency_name" name="iso_agency_name" class="form-control" placeholder="Enter Name & Address of Certifing Agency !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'iso_agency_name', agencyNameValidationMessage);">{{iso_agency_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-iso_agency_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.2 Details of Product of which the certificate has been issued<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="iso_product_detail" name="iso_product_detail" class="form-control" placeholder="Enter Details of Product of which the certificate has been issued!" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'iso_product_detail', productDetailValidationMessage);">{{iso_product_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-iso_product_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.3 Certificate No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="iso_certificate_no" name="iso_certificate_no" class="form-control" placeholder="Enter Certificate No. !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'iso_certificate_no', isoCertificateNoValidationMessage);" value="{{iso_certificate_no}}">
                            </div>
                            <span class="error-message error-message-incentive-partb-iso_certificate_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.4 Certificate Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="iso_certificate_date" id="iso_certificate_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{iso_certificate_date}}" readonly onblur="checkValidation('incentive-partb', 'iso_certificate_date', isoCertificateDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-partb-iso_certificate_date"></span>
                        </div>
                    </div>
                    <span class="box-title f-w-b page-header m-b-0">3. For ISI/WHO/GMP/Hallmark Certification and other National / International certification </span>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.1 Name & Address of Certifing Agency <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="isi_agency_name" name="isi_agency_name" class="form-control" placeholder="Enter Name & Address of Certifing Agency !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'isi_agency_name', agencyNameValidationMessage);">{{isi_agency_name}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-isi_agency_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Details of Product of which the certificate has been issued<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="isi_product_detail" name="isi_product_detail" class="form-control" placeholder="Enter Details of Product of which the certificate has been issued!" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'isi_product_detail', productDetailValidationMessage);">{{isi_product_detail}}</textarea>
                            </div>
                            <span class="error-message error-message-incentive-partb-isi_product_detail"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.3 Certificate No.<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="isi_certificate_no" name="isi_certificate_no" class="form-control" placeholder="Enter Certificate No. !" maxlength="100" readonly onblur="checkValidation('incentive-partb', 'isi_certificate_no', isicertificateNoValidationMessage);" value="{{isi_certificate_no}}">
                            </div>
                            <span class="error-message error-message-incentive-partb-isi_certificate_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.4 Certificate Date<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="isi_certificate_date" id="isi_certificate_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{isi_certificate_date}}" readonly onblur="checkValidation('incentive-partb', 'isi_certificate_date', isicertificateDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-incentive-partb-isi_certificate_date"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Total Expenditure on Quality Certification<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="expenditure" name="expenditure" class="form-control" placeholder="Enter Total Expenditure on Quality Certification !" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkValidation('incentive-partb', 'expenditure', expenditureValidationMessage);" value="{{expenditure}}">
                            </div>
                            <span class="error-message error-message-incentive-partb-expenditure"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>5. Total Amount Claim for Assistance</label>
                            <table class="table table-bordered m-b-0px" id="productList" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <th>Sr. No.</th>
                                        <th>Type of Claim</th>
                                        <th>Cost</th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>1</th>
                                        <th>50% of Capital Cost for installing ERP System (maximum 50,000)</th>
                                        <th>
                                            <input type="text" id="capital_cost" name="capital_cost" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliam($(this));checkValidation('incentive-partb', 'capital_cost', capitalCostValidationMessage);" value="{{capital_cost}}">
                                            <span class="error-message error-message-incentive-partb-capital_cost"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>2</th>
                                        <th>50% of all charges including Consultancy Fees (maximum 50,000)</th>
                                        <th>
                                            <input type="text" id="consutancy_fees" name="consutancy_fees" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliam($(this));checkValidation('incentive-partb', 'consutancy_fees', consutancyFeesValidationMessage);" value="{{consutancy_fees}}">
                                            <span class="error-message error-message-incentive-partb-consutancy_fees"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>3</th>
                                        <th>50% of all charges for obtaining each certification (maximum 5 Lakhs)</th>
                                        <th>
                                            <input type="text" id="certification_charges" name="certification_charges" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliam($(this));checkValidation('incentive-partb', 'certification_charges', certificationChargesValidationMessage);" value="{{certification_charges}}">
                                            <span class="error-message error-message-incentive-partb-certification_charges"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th>4</th>
                                        <th>50% of cost of testing equipments required for certification (maximum 5 Lakhs)</th>
                                        <th>
                                            <input type="text" id="testing_equipments" name="testing_equipments" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));getTotalCliam($(this));checkValidation('incentive-partb', 'testing_equipments', testingEquipmentsValidationMessage);" value="{{testing_equipments}}">
                                            <span class="error-message error-message-incentive-partb-testing_equipments"></span>
                                        </th>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            <input type="text" id="cliam_amount_total" name="cliam_amount_total" class="form-control"placeholder="" maxlength="100" onkeyup="checkNumeric($(this));" readonly onblur="checkNumeric($(this));checkValidation('incentive-partb', 'cliam_amount_total', clamAmountTotalValidationMessage);" value="{{cliam_amount_total}}" readonly>
                                            <span class="error-message error-message-incentive-partb-cliam_amount_total"></span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_partb_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewFormsForView($('#previous_btn_for_partb_details'), '{{incentive_id}}', false, 'partb_form');" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewForms($('#previous_btn_for_partb_details'), '{{incentive_id}}', true, 'partb_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>