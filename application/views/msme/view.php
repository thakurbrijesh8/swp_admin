<div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FORM FOR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">INCENTIVES UNDER INVESTMENT PROMOTION SCHEME - 2015 FOR MSME </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-sm-6">                   
                        <label>1.District <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Name of the Enterprise !"
                               maxlength="100" value="{{district_text}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('wmregistration', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-wmregistration-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                    <div class="form-group col-sm-6">
                        <label>2. Name of the Enterprise<span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Name of the Enterprise !"
                               maxlength="100" value="{{enterprise_name}}" readonly="">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>3. Office Address with pin code No. <span class="color-nic-red">*</span></label>
                        <textarea class="form-control" placeholder="Enter Office Address with pin code No. !"
                                  maxlength="200" readonly="">{{office_address}}</textarea>
                    </div>
                    <div class="form-group col-sm-6">
                        <label>4. Factory Address with pin code No. <span class="color-nic-red">*</span></label>
                        <textarea class="form-control" placeholder="Enter Factory Address with pin code No. !"
                                  maxlength="200" readonly="">{{factory_address}}</textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>5.1 Office Contact No. <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Office Contact No. !"
                               maxlength="20" value="{{office_contact_number}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>5.2 Factory Contact No. <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Factory Contact No. !"
                               maxlength="20" value="{{factory_contact_number}}" readonly="">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label>5.3 Fax </label>
                        <input type="text" class="form-control" placeholder="Enter Fax !"
                               maxlength="20" value="{{fax}}" readonly="">
                    </div>
                    <div class="form-group col-sm-4">
                        <label>5.4 Cell Phone </label>
                        <input type="text" class="form-control"
                               placeholder="Enter Cell Phone !" maxlength="20"
                               value="{{cellphone}}" readonly="">
                    </div>
                    <div class="form-group col-sm-4">
                        <label>5.6 Email </label>
                        <input type="text" class="form-control"
                               placeholder="Enter Email !" maxlength="100"  value="{{email}}" readonly="">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>6. Constitution of the Enterprise<span class="color-nic-red">*</span></label>
                        <div id="constitution_container_for_msme_view">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>7.1 Name of Promoter <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Name of Promoter !"
                               maxlength="100" value="{{promoter_name}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>7.2 Designation of Promoter <span class="color-nic-red">*</span></label>
                        <textarea class="form-control" placeholder="Enter Designation of Promoter !"
                                  maxlength="100" readonly="">{{promoter_designation}}</textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>7.3 Contact Number of Promoter</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Contact Number !" maxlength="20" value="{{promoter_contact_number}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>7.4 Email of Promoter</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Email !" maxlength="100" value="{{promoter_email}}" readonly="">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>8. Social Status of the Entrepreneur <span class="color-nic-red">*</span></label>
                        <div id="social_status_container_for_msme_view">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>9.1 Name of Authorized Person <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Name of Authorized Person !"
                               maxlength="100" value="{{ap_name}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>9.2 Designation of Authorized Person <span class="color-nic-red">*</span></label>
                        <textarea class="form-control" placeholder="Enter Designation of Authorized Person !"
                                  maxlength="100" readonly="">{{ap_designation}}</textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label>9.3 Contact Number of Authorized Person</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Contact Number !" maxlength="20" value="{{ap_contact_number}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label>9.4 Email of Authorized Person</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Email !" maxlength="100" 
                               readonly="" value="{{ap_email}}">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">                   
                        <label>10. Type of the Unit <span class="color-nic-red">*</span></label>
                        <input type="text" class="form-control"
                               placeholder="Enter Type of the Unit !" maxlength="100" 
                               readonly="" value="{{unit_type_text}}" required="">
                    </div>
                </div>
                <div id="view_document_container_for_msme"></div>
                <div>
                    <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button  >
                </div>
            </div>
        </div>
    </div>
</div>