<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Reporting/Informing/Intimation to Legal Metrology Office</div>
            </div>
            <form role="form" id="rii_form" name="rii_form" onsubmit="return false;">
                <input type="hidden" id="rii_id" name="rii_id" value="{{rii_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-rii f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('rii', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-rii-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Name of User/ Premises  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="user_name" name="user_name" class="form-control" placeholder="Enter Name of User/ Premises !" maxlength="200" onblur="checkValidation('rii', 'user_name', userNameValidationMessage);" value="{{user_name}}" readonly="">
                            </div>
                            <span class="error-message error-message-rii-user_name"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                        data-placeholder="Select District" style="width: 100%;" onblur="checkValidation('rii', 'district', districtValidationMessage);" disabled="">  
                                </select>
                            </div>
                            <span class="error-message error-message-rii-district"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Address  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea id="address" name="address" class="form-control" placeholder="Enter Postal address !" maxlength="100" onblur="checkValidation('rii', 'address', addressValidationMessage);" readonly="">{{address}}</textarea>
                            </div>
                            <span class="error-message error-message-rii-address"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>4. Trade <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="trade" name="trade" class="form-control select2"
                                        data-placeholder="Select Trade" style="width: 100%;" onblur="checkValidation('rii', 'trade', tradeValidationMessage);" disabled="">  
                                </select>
                            </div>
                            <span class="error-message error-message-rii-trade"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>5. Report/Intimate/Inform <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="reporting" name="reporting" class="form-control select2"
                                        data-placeholder="Select Report/Intimate/Inform" style="width: 100%;" onblur="checkValidation('rii', 'reporting', reportValidationMessage);" disabled="">  
                                </select>
                            </div>
                            <span class="error-message error-message-rii-reporting"></span>
                        </div>
                    </div>
                    <hr class="m-b-5px">
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="RII.listview.loadRIIData();">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>