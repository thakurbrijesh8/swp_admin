<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">Property Registration</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Property registration and get appointment</div>
            </div>
            <form role="form" id="property_form" name="property_form" onsubmit="return false;">
                
                <input type="hidden" id="property_id" name="property_id" value="{{property_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To<br>
                            The Registrar of Firm, <br>
                            Department of Civil Registrar - Cum - Sub - Registrar,<br>
                            Daman & Diu,
                        </div>
                    </div>
                
               <div class="row">
                  <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-property-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('property', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-property-entity_establishment_type"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Party Type<span class="color-nic-red">*</span></label>
                            <div id="party_type_container_for_property_data">
                       </div>
                    <span class="error-message error-message-property-party_type_for_property_data"></span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Document Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="document_type" name="document_type"
                                        data-placeholder="Status !"  disabled="">
                                        <option value="">Select Document Type</option>
                                     <option value="Sale_Deed">Sale Deed</option>
                                    <option value="Power_of_attorney">Power of attorney</option>
                                    <option value="Agreement_for_sale">Agreement for sale</option>
                                    <option value="Deed_of_rectification">Deed of rectification</option>
                                    <option value="Adoption_Deed">Adoption Deed</option>
                                    <option value="Divorce_Deed">Divorce Deed</option>
                                    <option value="Lease_deed">Lease deed</option>
                                    <option value="Leave_and_License_Agreement">Leave and License Agreement</option>
                                    <option value="MOU_Deed">MOU Deed</option>
                                    <option value="Deed_of_Trasfer">Deed of Trasfer</option>
                                    <option value="Exchange_Deed">Exchange Deed</option>
                                    <option value="Mortgage_Deed">Mortgage Deed</option>
                                    <option value="Partnership_Deed">Partnership Deed</option>
                                    <option value="Partition_Deed">Partition Deed</option>
                                    <option value="Release_Deed">Release Deed</option>
                                    <option value="Gift_Deed">Gift Deed</option>
                                    <option value="Trust_Deed">Trust Deed</option>
                                    <option value="Will">Will</option>
                                    <option value="Other">Other</option>                                
                                </select>
                            </div>
                            <span class="error-message error-message-property-document_type"></span>
                        </div>
                         <div class="form-group col-sm-6">
                             <label>4. Date of Application<span style="color: red;">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="application_date" id="application_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{application_date}}"  readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-property-application_date"></span>
                        </div>
                    </div>


                       <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Party Name <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="party_name" name="party_name" class="form-control"  value="{{party_name}}" disabled="" >
                            </div>
                            <span class="error-message error-message-property-party_name"></span>
                        </div>

                           <div class="form-group col-sm-6">

                         <label>6. Party Address <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="party_address" name="party_address" class="form-control" value="{{party_address}}" disabled="" >
                            </div>
                            <span class="error-message error-message-property-party_address"></span>
                        </div>
                    </div>

                      <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Mobile Number <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="digit_mobile_number" name="digit_mobile_number" class="form-control"
                                       value="{{digit_mobile_number}}" disabled="">
                            </div>
                            <span class="error-message error-message-property-digit_mobile_number"></span>
                        </div>

                           <div class="form-group col-sm-6">

                         <label>8. Email Address  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="email" name="email" class="form-control" value="{{email}}" disabled="" >
                            </div>
                            <span class="error-message error-message-property-email"></span>
                        </div>
                    </div>

     

                     <div class="row">

                        <div class="form-group col-sm-12">
                                <label>9. Do you want to upload Pancard ?</label>&nbsp;
                                <input type="checkbox" id="pancard_all_parties" name="pancard_all_parties" class="checkbox" value="{{is_checked}}">
                                <span class="error-message error-message-shop-pancard_all_parties"></span>

                           <div class=" pancard_all_parties_div" style="display: none;"> 
                        <div class="col-6 m-b-5px" id="pan_card_container_for_property">
                            <label>9. Pan Card<span style="color: red;">*<br></span></label><br>
                           <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        
                        <div class="form-group col-sm-6" id="pan_card_name_container_for_property" style="display: none;">
                            <label>9.1 Pan Card <span style="color: red;">*</label><br>
                            <a target="_blank" id="pan_card_name_download"><img id="pan_card_name_image_for_property" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>                       
                </div>
            </div>
                
                 <div class="row">
                        <div class="col-6 m-b-5px" id="aadhaar_card_container_for_property">
                            <label>10. Aadhaar Card<span style="color: red;">*<br></span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                        </div>
                        
                        <div class="form-group col-sm-6" id="aadhaar_card_name_container_for_property" style="display: none;">
                            <label>10.1 Aadhaar Card <span style="color: red;">*</label><br>
                            <a target="_blank" id="aadhaar_card_name_download"><img id="aadhaar_card_name_image_for_property" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
       
                    <div class="row">
                        <div class="form-group col-sm-12">

                             <label>11. Property Description/Schedule.  <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <textarea type="text" id="document" name="document" class="form-control" disabled=""  >{{document}}</textarea>
                            </div>
                            <span class="error-message error-message-property-document"></span>
                        </div>
                  </div> 

                     <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Property.listview.loadPropertyData();">Close</button>

                        <button type="button" id="submit_btn_for_incentive" class="btn btn-sm btn-success pull-right" onclick="Property.listview.editOrViewAppointment($('#submit_btn_for_property'), '{{property_id}}', false);" style="margin-right: 5px;">Next  <span class="fas fa-hand-point-right"></span></button>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>


