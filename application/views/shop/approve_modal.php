<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Approve Establishment Form</h3>
</div>
<form role="form" id="approve_shop_form" name="approve_shop_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="shop_id_for_shop_approve" name="shop_id_for_shop_approve" value="{{s_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-shop-approve f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Applicant Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of Applicant !"
                       value="{{applicant_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Name of the Shop & Establishment <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the Shop & Establishment !"
                       value="{{s_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label>Enter Only Establishment File No. <span style="color: red;">*</span></label>
                <input type="text" id="registration_number_for_shop_approve" name="registration_number_for_shop_approve" class="form-control" placeholder="Eg. 1234 !"
                       maxlength="50" onblur="checkValidation('shop-approve', 'registration_number_for_shop_approve', registrationFileNoValidationMessage);">
                <span class="error-message error-message-shop-approve-registration_number_for_shop_approve"></span>
            </div>
            <div class="form-group col-sm-6">
                <label>Establishment Valid Up to <span style="color: red;">*</span></label>
                <div class="input-group date">
                    <input type="text" id="valid_upto_for_shop_approve" name="valid_upto_for_shop_approve" 
                           onblur="checkValidation('shop-approve', 'valid_upto_for_shop_approve', dateValidationMessage);"
                           class="form-control date_picker" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="far fa-calendar"></i></span>
                    </div>
                </div>
                <span class="error-message error-message-shop-approve-valid_upto_for_shop_approve"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 m-b-5px">
                <label>Upload Certificate <span style="color: red;">* (Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                <input type="file" id="certificate_file_for_shop_approve" name="certificate_file_for_shop_approve"
                       accept="application/pdf">
                <div class="error-message error-message-shop-approve-certificate_file_for_shop_approve"></div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_shop_approve" name="remarks_for_shop_approve" class="form-control"
                          onblur="checkValidation('shop-approve', 'remarks_for_shop_approve', shopRemarkValidationMessage);"
                          placeholder="Remarks !" maxlength="200"></textarea>
                <span class="error-message error-message-shop-approve-remarks_for_shop_approve"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_shop_approve" class="btn btn-sm btn-success" onclick="Shop.listview.approveApplication();"
                    style="margin-right: 5px;">Approve</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>
<!--<form role="form" method="post" id="approve_form_for_shop">
    <input type="hidden" name="s_id" id="s_id" class="form-control" value="{{s_id}}">
    <div class="box-body">
        <div class="text-center m-t-10" style="margin-bottom: 20px;">
            <span id="error-message-shop" class="error-message error-message-shop f-w-b" style="border-bottom: 2px solid red;"></span>
            <span id="successful-message-shop" class="successful-message successful-message-shop f-w-b" style="border-bottom: 2px solid green;"></span>
        </div>
        <div class="row">
            <div class="form-group col-md-12">
                <label>Shop & Establishment Name</label>
                <input type="text" name="shop_name" id="shop_name" class="form-control" value="{{s_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label>Name of Treasury <span style="color: red;">*</span></label>
                <input type="text" name="name_of_treasury_for_shop" id="name_of_treasury_for_shop" class="form-control" value="{{s_name_of_treasury}}"
                       onblur="checkValidation('shop', 'name_of_treasury_for_shop', shopTreasuryNameValidationMessage);" placeholder=" Shop Name of Treasury">
                <span class="error-message error-message-shop-name_of_treasury_for_shop"></span>
            </div>
            <div class="form-group col-md-6">
                <label>Shop & Establishment Challan No. <span style="color: red;">*</span></label>
                <input type="text" name="challan_no_for_shop" id="challan_no_for_shop" class="form-control" value="{{s_challan_no}}"
                       onblur="checkValidation('shop', 'challan_no_for_shop', shopChallanNoValidationMessage);" placeholder=" Shop Challan No.">
                <span class="error-message error-message-shop-challan_no_for_shop"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label for="contract_start_date">Shop & Establishment Challan Date <span style="color: red;">*</span></label>
                <div class="input-group date date_picker">
                    <input type="text" name="challan_date_for_shop" id="challan_date_for_shop" class="form-control date_picker" placeholdcertificate_expiry_date_for_shoper="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                           onblur="checkValidation('shop', 'challan_date_for_shop', shopChallanDateValidationMessage);" value="{{s_challan_date}}" placeholder="dd-mm-yyyy">
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <span class="error-message error-message-shop-challan_date_for_shop"></span>
            </div>
            <div class="form-group col-md-6">
                <label>Amount of Fees Paid <span style="color: red;">*</span></label>
                <input type="text" name="amount_of_fees_paid_for_shop" id="amount_of_fees_paid_for_shop" class="form-control" value="{{s_amount_of_fees_paid}}"
                       onkeyup="checkNumeric($(this));"
                       onblur="checkNumeric($(this)); checkValidation('shop', 'amount_of_fees_paid_for_shop', shopAmountOfFeesPaidValidationMessage);" placeholder=" Shop Amount of Paid">
                <span class="error-message error-message-shop-amount_of_fees_paid_for_shop"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label>Shop & Establishment Registration No. <span style="color: red;">*</span></label>
                <input type="text" name="registration_no_for_shop" id="registration_no_for_shop" class="form-control" value="{{s_registration_no}}"
                       onblur="checkValidation('shop', 'registration_no_for_shop', shopRegistrationNoValidationMessage);" placeholder=" Shop Registration No.">
                <span class="error-message error-message-shop-registration_no_for_shop"></span>
            </div>
            <div class="form-group col-md-6 col-sm-6">
                <label for="">Shop & Establishment Valid up to <span style="color: red;">*</span></label>
                <div class="input-group date date_picker">
                    <input type="text" name="certificate_expiry_date_for_shop" id="certificate_expiry_date_for_shop" class="form-control date_picker" placeholdcertificate_expiry_date_for_shoper="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                           onblur="checkValidation('shop', 'certificate_expiry_date_for_shop', shopCerticateExpiryDateValidationMessage);" value="{{s_certificate_expiry_date}}" placeholder="dd-mm-yyyy">
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <span class="error-message error-message-shop-certificate_expiry_date_for_shop"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-12">
                <label>Remark <span style="color: red;">*</span></label>
                <textarea class="form-control" name="remark_for_shop" id="remark_for_shop" placeholder=" Shop Remark" rows="3" 
                          onblur="checkValidation('shop', 'remark_for_shop', shopRemarkValidationMessage);">{{s_remark}}</textarea>
                <span class="error-message error-message-shop-remark_for_shop"></span>
            </div>
        </div>
    </div>
    <hr class="m-b-5px">
    <div class="form-group">
        <button type="button" class="btn btn-sm btn-success" onclick="Shop.listview.labourDeptApproveForShop($(this), '{{s_id}}');"
                style="margin-right: 5px;">Approve</button>
                <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" style="margin-right: 5px;" onclick="resetModel();">Cancel</button>
    </div>
</form>-->