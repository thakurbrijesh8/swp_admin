<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">FORM - VII</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See Rule 29(2)]</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FOR RENEWAL OF LICENCE</div>
            </div>
            <form role="form" id="aplicence_renewal_form" name="aplicence_renewal_form" onsubmit="return false;">

                <input type="hidden" id="aplicence_renewal_id" name="aplicence_renewal_id" value="{{aplicence_renewal_data.aplicence_renewal_id}}">
                <input type="hidden" id="aplicence_id" name="aplicence_id" value="{{aplicence_renewal_data.aplicence_id}}">
                <div class="card-body p-b-0px">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-aplicence-renewal f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter License Number !"
                                       maxlength="100" value="{{aplicence_renewal_data.registration_number}}" onblur="AplicenceRenewal.listview.getAplicenceData($(this)); checkValidation('boiler-act-renewal', 'registration_number', licenseNumberValidationMessage);">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-registration_number"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('aplicence-renewal', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                            </select>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-entity_establishment_type"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">2. Contractor Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.1 Name of Contractor<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contractor_name" name="contractor_name" class="form-control" placeholder="Enter Name of Contractor !"
                                       maxlength="100" onblur="checkValidation('aplicence-renewal', 'contractor_name', contractorNameValidationMessage);" value="{{aplicence_renewal_data.contractor_name}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-contractor_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.2 Contractor Address<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="contractor_address" name="contractor_address" class="form-control" placeholder="Enter Address!" maxlength="100" onblur="checkValidation('aplicence-renewal', 'contractor_address', contractorAddressValidationMessage);">{{aplicence_renewal_data.contractor_address}}</textarea>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-contractor_address"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2.3 Contractor Contact No. <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contractor_contact" name="contractor_contact" class="form-control" placeholder="Enter Contact No!"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('aplicence-renewal', 'contractor_contact', contractorCcontactValidationMessage);" value="{{aplicence_renewal_data.contractor_contact}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-contractor_contact"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.4 Contractor Email<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="contractor_email" name="contractor_email" class="form-control" placeholder="Enter Contractor Email !"
                                       maxlength="100" onkeypress="emailIdValidation($(this));" onblur="checkValidationForEmail('aplicence-renewal', 'contractor_email', emailValidationMessage);" value="{{aplicence_renewal_data.contractor_email}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-contractor_email"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">3. Particulars of Establishment or Extablishments where contract labour is to be employed</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3.1 Number of the Licence<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_certificate" name="no_of_certificate" class="form-control" placeholder="Enter Number of the Licence !"
                                       maxlength="100" onblur="checkValidation('aplicence-renewal', 'no_of_certificate', certificateNoValidationMessage);" value="{{aplicence_renewal_data.no_of_certificate}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-no_of_certificate"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.2 Date  Of the Licence<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="date_of_certificate" id="date_of_certificate" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{date_of_certificate}}" onblur="checkValidation('aplicence-renewal', 'date_of_certificate', certificateDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-date_of_certificate"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6"><br>
                            <label>3.3 Date  Of expiry of the previous Licence<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="expiry_date_of_prev_licence" id="expiry_date_of_prev_licence" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{expiry_date_of_prev_licence}}" onblur="checkValidation('aplicence-renewal', 'expiry_date_of_prev_licence', expiryDateValidationMessage);">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-expiry_date_of_prev_licence"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3.4 Maximum number of employess proposed to be employed as contract employed as contract labour in establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="max_no_of_empl" name="max_no_of_empl" class="form-control" placeholder="Enter Maximum number of employess !"
                                       maxlength="100" onkeyup="checkNumeric($(this));" onblur="checkValidation('aplicence-renewal', 'max_no_of_empl', maxNoEmpValidationMessage);" value="{{aplicence_renewal_data.max_no_of_empl}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-max_no_of_empl"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Wheather Licence of the Contractor was suspended or revoked<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="licence_status" name="licence_status" class="form-control" placeholder="Enter Licence of the Contractor was suspended or revoked !"
                                       maxlength="100" onblur="checkValidation('aplicence-renewal', 'licence_status', licenceStatusValidationMessage);" value="{{aplicence_renewal_data.licence_status}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-licence_status"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Duration of process contract work<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="duration_of_work" name="duration_of_work" class="form-control" placeholder="Enter Duration of Work !"
                                       maxlength="100" onblur="checkValidation('aplicence-renewal', 'duration_of_work', durationOfWorkValidationMessage);" value="{{aplicence_renewal_data.duration_of_work}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-duration_of_work"></span>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">6. Particulars of Establishment or Establishments where contract labour is to be employed</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6.1 Name of Establishment<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="establi_name" name="establi_name" class="form-control" placeholder="Enter Name of Applicant !"
                                       maxlength="100" onblur="checkValidation('aplicence-renewal', 'establi_name', establishmentNameValidationMessage);" value="{{aplicence_renewal_data.establi_name}}">
                            </div>
                            <span class="error-message error-message-aplicence-renewal-establi_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6.2 Address of Establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="establi_address" name="establi_address" class="form-control" placeholder="Enter Address of Establishment !" maxlength="100" onblur="checkValidation('aplicence-renewal', 'establi_address', establishmentAddressValidationMessage);">{{aplicence_renewal_data.establi_address}}</textarea>
                            </div>
                            <span class="error-message error-message-aplicence-renewal-establi_address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12" id="register_certification_doc_container_for_aplicence_renewal">
                            <label>7. Original Copy of Certificate.<span style="color: red;">* <br>(Maximum File Size: 2MB)(Upload pdf Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-aplicence-renewal-register_certification_doc_for_aplicence_renewal"></div>
                        </div>

                        <div class="form-group col-sm-12" id="register_certification_doc_name_container_for_aplicence_renewal" style="display: none;">
                            <label>7. Original Copy of Certificate.<span style="color: red;">*<br> (Maximum File Size: 2MB)(Upload pdf Only) <span style="color: red;">*</span></label><br>
                            <a id="register_certification_doc_name_download" target="_blank"><label id="register_certification_doc_name_image_for_aplicence_renewal" class="btn btn-sm btn-nic-blue f-w-n" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6 m-b-5px" id="seal_and_stamp_container_for_aplicence_renewal">
                            <label>8. Signature of Applicant / Contractor<span style="color: red;">*<br> (Maximum File Size: 1MB)(Upload jpg, png, jpeg ,jfif Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-aplicence-renewal-seal_and_stamp_for_aplicence_renewal"></div>
                        </div>

                        <div class="form-group col-sm-6" id="seal_and_stamp_name_container_for_aplicence_renewal" style="display: none;">
                            <label>8. Signature of Applicant / Contractor <span style="color: red;">*</label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_aplicence_renewal" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
 
                    <hr class="m-b-5px">
                    <div class="form-group">
                        <button type="button" id="submit_btn_for_aplicence" class="btn btn-sm btn-success" onclick="AplicenceRenewal.listview.submitAplicenceRenewal({{VALUE_TWO}});" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="AplicenceRenewal.listview.loadAplicenceRenewalData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>