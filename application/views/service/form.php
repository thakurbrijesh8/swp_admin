<div class="card">
    <div class="card-header">
        <h3 class="card-title" style="float: none; text-align: center;">Add / Update Service Form</h3>
    </div>
    <form role="form" id="service_form" name="service_form" onsubmit="return false;">
        <input type="hidden" id="service_id_for_service" name="service_id_for_service" value="{{service_id}}">
        <div class="card-body">
            <div class="row">
                <div class="form-group col-sm-4">
                    <label>Daman Department Name</label>
                    <select id="daman_department_id_for_service" name="daman_department_id_for_service" class="form-control select2"
                            data-placeholder="Select Daman Department Name" style="width: 100%;">
                    </select>
                    <span class="error-message error-message-service-daman_department_id_for_service"></span>
                </div>
                <div class="form-group col-sm-4">
                    <label>Diu Department Name</label>
                    <select id="diu_department_id_for_service" name="diu_department_id_for_service" class="form-control select2"
                            data-placeholder="Select Diu Department Name" style="width: 100%;">
                    </select>
                    <span class="error-message error-message-service-diu_department_id_for_service"></span>
                </div>
                <div class="form-group col-sm-4">
                    <label>DNH Department Name</label>
                    <select id="dnh_department_id_for_service" name="dnh_department_id_for_service" class="form-control select2"
                            data-placeholder="Select DNH Department Name" style="width: 100%;">
                    </select>
                    <span class="error-message error-message-service-dnh_department_id_for_service"></span>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label>Name of Service/Clearance <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" id="service_name_for_service" name="service_name_for_service"
                               onblur="checkValidation('service', 'service_name_for_service', serviceNameValidationMessage);"
                               placeholder="Enter Name of Service/Clearance !" maxlength="200" value="{{service_name}}">
                        <span class="error-message error-message-service-service_name_for_service"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 col-md-3">
                    <label>Service Type <span class="color-nic-red">*</span></label>
                    <div id="service_type_container_for_service">
                    </div>
                    <span class="error-message error-message-service-service_type_for_service"></span>
                </div>
                <div class="form-group col-sm-6 col-md-3">
                    <label>Timeline (Working Days) <span class="color-nic-red">*</span></label>
                    <input type="text" class="form-control" id="timeline_for_service" name="timeline_for_service"
                           onblur="checkValidation('service', 'service_name_for_service', enterTimelineValidationMessage);"
                           placeholder="Enter Timeline (Working Days) !" maxlength="50" value="{{timeline}}">
                    <span class="error-message error-message-service-timeline_for_service"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Designation of the Authority Responsible to Deliver the Services</label>
                    <input type="text" class="form-control" id="competent_authority_for_service" name="competent_authority_for_service"
                           placeholder="Enter Designation of the Authority Responsible to Deliver the Services !" maxlength="100" value="{{competent_authority}}">
                    <span class="error-message error-message-service-competent_authority_for_service"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6 col-md-3">
                    <label>Risk Category <span class="color-nic-red">*</span></label>
                    <div id="risk_category_container_for_service">
                    </div>
                    <span class="error-message error-message-service-risk_category_for_service"></span>
                </div>
                <div class="form-group col-sm-6 col-md-3">
                    <label>Size of firm<span class="color-nic-red">*</span></label>
                    <div id="size_of_firm_container_for_service">
                    </div>
                    <span class="error-message error-message-service-size_of_firm_for_service"></span>
                </div>
                <div class="form-group col-sm-6 col-md-3">
                    <label>Foreign / Domestic Investor<span class="color-nic-red">*</span></label>
                    <div id="foreign_domestic_investor_container_for_service">
                    </div>
                    <span class="error-message error-message-service-foreign_domestic_investor_for_service"></span>
                </div>
                <div class="form-group col-sm-6 col-md-3">
                    <label>Business Location<span class="color-nic-red">*</span></label>
                    <div id="business_location_container_for_service">
                    </div>
                    <span class="error-message error-message-service-business_location_for_service"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>1st Appellate Authority for Grievance Redressal</label>
                    <input type="text" class="form-control" id="first_aagr_for_service" name="first_aagr_for_service"
                           placeholder="Enter 1st Appellate Authority for Grievance Redressal !" maxlength="100" value="{{first_aagr}}">
                    <span class="error-message error-message-service-first_aagr_for_service"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>2nd Appellate Authority for Grievance Redressal</label>
                    <input type="text" class="form-control" id="second_aagr_for_service" name="second_aagr_for_service"
                           placeholder="Enter 1st Appellate Authority for Grievance Redressal !" maxlength="100" value="{{second_aagr}}">
                    <span class="error-message error-message-service-second_aagr_for_service"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Apply URL</label>
                    <input type="text" class="form-control" id="apply_url_for_service" name="apply_url_for_service"
                           placeholder="Enter Apply URL !" maxlength="100" value="{{apply_url}}">
                    <span class="error-message error-message-service-apply_url_for_service"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Fees Details</label>
                    <textarea class="form-control" id="fees_details_for_service" name="fees_details_for_service"
                              placeholder="Enter Deemed Approval Authority !" rows="3">{{fees_details}}</textarea>
                    <span class="error-message error-message-service-fees_details_for_service"></span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Document Checklist</label>
                    <textarea class="form-control" id="document_checklist_for_service" name="document_checklist_for_service"
                              placeholder="Document Checklist !" rows="3">{{document_checklist}}</textarea>
                    <span class="error-message error-message-service-document_checklist_for_service"></span>
                </div>
                <div class="form-group col-sm-6">
                    <label>Procedure</label>
                    <textarea class="form-control" id="procedure_for_service" name="procedure_for_service"
                              placeholder="Procedure !" rows="3">{{procedure}}</textarea>
                    <span class="error-message error-message-service-procedure_for_service"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="bg-light-gray">
                                    <th class="text-center" style="width: 20px;">No.</th>
                                    <th class="text-center" style="min-width: 260px;">Question</th>
                                    <th class="text-center" style="width: 150px;">Answer</th>
                                    <th class="text-center" style="width: 80px;">Action</th>
                                </tr>
                            </thead>
                            <tbody id="questionary_item_container_for_service">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-sm btn-nic-blue pull-right"
                            onclick="Service.listview.addQuestion({});">
                        <i class="fas fa-plus-circle"></i>&nbsp; Add More Question</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="button" id="submit_btn_for_service" class="btn btn-sm btn-success" onclick="Service.listview.submitService($(this));" style="margin-right: 5px;"><i class="fas fa-save"></i> Submit</button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="Service.listview.loadServiceData();"><i class="fas fa-times"></i> Close</button>
                </div>
            </div>
        </div>
    </form>
</div>