<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Appointment Detail </div>
            </div>
            <form role="form" id="appointment_form" name="appointment_form" onsubmit="return false;">
                 <input type="hidden" id="property_id" name="property_id" value="{{property_id}}">
                <input type="hidden" id="appointment_id" name="appointment_id" value="{{appointment_id}}">
                <div class="card-body">

 <div class="row">

                     <div class="form-group col-sm-6">
                            <label> Appointment Date <span class="color-nic-red">*</span></label><br/>
                             <div id=appointment_date_container_for_appointment>

                            <input type="radio" disabled id="date_one" name="appointment_date" class="" value="{{VALUE_ONE}}" >&nbsp; <label id="date_one_lb">{{appointment_date}}</label><br>

                        </div>
                            <span class="error-message error-message-appointment_date_for_appointment"></span>
                        </div>

                    </div>


                      <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Select Appointment Time<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select class="form-control" id="select_time" name="select_time"
                                        data-placeholder="Status !" disabled="">
                                        <option value="">Select Appointment Time</option>
                                     <option value="10:15">10:15</option>
                                    <option value="10:30">10:30</option>
                                    <option value="10:45">10:45</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:15">11:15</option>
                                    <option value="11:30">11:30</option>
                                    <option value="11:45">11:45</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:15">12:15</option>
                                    <option value="12:30">12:30</option>
                                    <option value="12:45">12:45</option>
                                    <option value="01:00">01:00</option>
                                 
                                </select>
                            </div>
                            <span class="error-message error-message-appointment-select_time"></span>
                        </div>
                    </div>

         <hr class="m-b-1rem"> 
                    
                      <div class="form-group">


<button type="button" class="btn btn-sm btn-danger" onclick="Property.listview.loadPropertyData();"  style="margin-right: 5px;">Cancel</button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="Property.listview.editOrViewProperty($('#previous_btn_for_declaration_details'), '{{property_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>