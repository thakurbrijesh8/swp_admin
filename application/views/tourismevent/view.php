<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF TOURISM </h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT Administration of Dadra & Nagar Haveli and Daman & Diu  </div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application Form for Performance License for Tourism Event</div>
            </div>
            <form role="form" id="tourismevent_form" name="tourismevent_form" onsubmit="return false;">

                <input type="hidden" id="tourismevent_id" name="tourismevent_id" value="{{tourismevent_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-tourismevent f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            To,<br>
                            The Director,<br>
                            Department of Tourism,<br>
                            UT Administration of Dadra & Nagar Haveli and Daman & Diu.<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-wc-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2" disabled=""
                                        data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('tourismevent', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);">
                                </select>
                            </div>
                            <span class="error-message error-message-tourismevent-entity_establishment_type"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Name of the person/Agency proposing to carry out the event <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_person" name="name_of_person" class="form-control" placeholder="Name of person/Agency proposing to carry out the event !" maxlength="100" value="{{name_of_person}}" 
                                       disabled="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name of the event <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_event" name="name_of_event" class="form-control" placeholder="Name of the event !" maxlength="100" value="{{name_of_event}}" readonly="">
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Location of the event <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="location_of_event" name="location_of_event" class="form-control" placeholder="Location of the event !" maxlength="100" value="{{location_of_event}}" disabled="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Date of the event <span class="color-nic-red">*</span></label>
                            <div class="input-group date ">
                                <input type="text" name="date_of_event" id="date_of_event" class="form-control date_picker" placeholder="DD-MM-YYYY" data-date-format="DD-MM-YYYY"
                                       value="{{date_of_event}}" disabled="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>6. Time of the event <span class="color-nic-red">*</span></label>
                            <div class="bootstrap-timepicker">
                                <div class="form-group">
                                    <div class="input-group date " id="timepicker" data-target-input="nearest">
                                        <input type="text" name="time_of_event" id="time_of_event" class="form-control datetimepicker-input timepicker" data-target="#timepicker" disabled=""
                                               value="{{time_of_event}}" maxlength="10" placeholder="00:00 AM">
                                        <div class="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="far fa-clock"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>7. Duration of the event <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="duration_of_event" name="duration_of_event" class="form-control" placeholder="Duration of the event !" maxlength="10"value="{{duration_of_event}}" disabled=""
                                       value="{{duration_of_event}}">
                            </div>
                        </div>
                        <div class="col-sm-6 form-group">
                            <label>8. Mobile No. <span style="color: red;">*</span></label>
                            <input type="text" id="mob_no" name="mob_no" class="form-control" placeholder=" Mobile No. !" readonly=""
                                   maxlength="10" value="{{mob_no}}">
                            <span class="error-message error-message-tourismevent-mob_no"></span>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="col-12 m-b-5px" id="proposal_details_document_container_for_tourismevent">
                            <label>9. Upload the detailed proposal and particulars of the event <span style="color: red;">* </label><br>                                                                                                                                                                                                    
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-tourismevent-proposal_details_document_for_tourismevent"></div>                                                                                                                                                                                                        
                        </div>
                        <div class="form-group col-sm-12" id="proposal_details_document_name_container_for_tourismevent" style="display: none;">
                            <label>9. Upload the detailed proposal and particulars of the event <span style="color: red;">* </label><br>
                            <a target="_blank" id="proposal_details_document_download"><label id="proposal_details_document_name_image_for_tourismevent" class="btn btn-sm btn-nic-blue f-w-n">{{VIEW_UPLODED_DOCUMENT}}</label></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_tourismevent">
                            <label>10. Signature <span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-tourismevent-seal_and_stamp_for_tourismevent"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_tourismevent" style="display: none;">
                            <label>10. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_tourismevent" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks  <span style="color: red;">*</span></label>
                            <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button typee="button" class="btn btn-sm btn-danger" onclick="Tourismevent.listview.loadTourismeventData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>