<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application for Verification/ Re-verification/ Stamping of Weights & Measures </div>
            </div>
            <form role="form" id="vc_form" name="vc_form" onsubmit="return false;">

                <input type="hidden" id="vc_id" name="vc_id" value="{{vc_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-vc f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Assistant Controller,<br>
                            Department of Legal Metrology,<br>
                            (Weights & Measures).
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2 hideView"
                                        data-placeholder="Select District" style="width: 100%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('vc', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-vc-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Name of Applicant / Premises <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Name of Applicant /Premises  !"
                                       maxlength="100" onblur="checkValidation('vc', 'name_of_applicant', applicantNameValidationMessage);" value="{{name_of_applicant}}">
                            </div>
                            <span class="error-message error-message-vc-name_of_applicant"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>3. Complete address of the establishment etc <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="address" name="address" class="form-control" readonly="" placeholder="Enter address !" maxlength="500" onblur="checkValidation('vc', 'address', addressValidationMessage);">{{address}}</textarea>
                            </div>
                            <span class="error-message error-message-vc-address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Trade <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="trade" name="trade" class="form-control select2 hideView"
                                        data-placeholder="Select Trade" style="width: 100%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-trade"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="type" name="type" class="form-control select2 hideView"
                                        data-placeholder="Select Type" style="width: 100%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Sub-Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="sub_type" name="sub_type" class="form-control select2 hideView"
                                        data-placeholder="Select Sub-Type" style="width: 100%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-sub_type"></span>
                        </div>
                        <div class="form-group col-sm-5">
                            <label>7. Capacity <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="capacity" name="capacity" class="form-control" placeholder="Capacity !"
                                       maxlength="100" onblur="checkValidation('vc', 'capacity', capacityValidationMessage);" value="{{capacity}}">
                                &nbsp;<select id="capacity_type" name="capacity_type" class="form-control select2 hideView"
                                        data-placeholder="Select Capacity-Type" style="width: 50%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-capacity_type" style="margin-left: 250px;"></span>
                            <span class="error-message error-message-vc-capacity"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>8. Class <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="class" name="class" class="form-control select2 hideView"
                                        data-placeholder="Select Classs" style="width: 100%;">
                                </select>
                            </div>
                            <span class="error-message error-message-vc-class"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>9. Make <span style="color: red;">*</span></label>
                            <input type="text" id="make" name="make" class="form-control" placeholder="Make !"
                                   maxlength="200" onblur="checkValidation('vc', 'make', diameterServiceConnectionValidationMessage);" value="{{make}}">
                            <span class="error-message error-message-vc-make"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>10. Model No. <span style="color: red;">*</span></label>
                            <input type="text" id="model_no" name="model_no" class="form-control" placeholder="Enter Model No. !"
                                   maxlength="100" onblur="checkValidation('vc', 'model_no', modelNoValidationMessage);" value="{{model_no}}">
                            <span class="error-message error-message-vc-model_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>11. Serial No. <span style="color: red;">*</span></label>
                            <input type="text" id="serial_no" name="serial_no" class="form-control" placeholder="Enter Serial No. !"
                                   maxlength="100" onblur="checkValidation('vc', 'serial_no', serialNoValidationMessage);" value="{{serial_no}}">
                            <span class="error-message error-message-vc-serial_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>12. Verification Place <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="verification_at" name="verification_at" class="form-control select2 hideView"
                                        data-placeholder="Select Verification Place" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-vc-verification_at"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13. Quantity or Units <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="quantity_units" name="quantity_units" class="form-control select2 hideView"
                                        data-placeholder="Select Quantity or Units" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-vc-quantity_units"></span>
                        </div>
                        <div class="form-group col-sm-12" id="invoice_doc_container">
                            <label>14. Invoice Copy / Previous Verification Certification <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload PDF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-vc-invoice_doc"></div>
                        </div>
                        <div class="form-group col-sm-12" id="invoice_doc_name_container" style="display: none;">
                            <label>14. Invoice Copy / Previous Verification Certification <span style="color: red;">*</span></label><br>
                            <a id="invoice_doc_download" target="_blank"><label id="invoice_doc_name_image" class="btn btn-sm btn-nic-blue f-w-n spinner_name_container_for_vc_{{VALUE_ONE}}" style="border: 2px solid black;">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                        <div class="text-center color-nic-blue col-3 m-b-5px" id="spinner_template_{{VALUE_ONE}}" style="display: none;"><i class="fas fa-sync-alt fa-spin fa-1x"></i></div>
                    </div>
                    <hr class="m-b-1rem"> 

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="VC.listview.loadVCData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>