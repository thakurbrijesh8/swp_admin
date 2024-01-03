<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Appointment Slip</h3>
</div>
<form role="form" id="appointment_slip" name="appointment_slip" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="appointment_id" name="appointment_id" value="{{appointment_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="success-message-property-uc f-w-b" style="border-bottom: 2px solid green; color: green;"></span>
                <span class="error-message error-message-property-uc f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Name of Party<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name !"
                       value="{{property_data.party_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Your appointment No : <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Appointment No. !"
                       value="{{appointment_data.appointment_id}}" readonly="">
            </div>
        </div>
         <div class="row">
            <div class="form-group col-sm-12">
                <label>Appointment Date : <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Appointment Date !"
                       value="{{appointment_data.appointment_date}}" readonly="">
            </div>
        </div>

          <div class="row">
            <div class="form-group col-sm-12">
                <label>Reprting Time :  <span style="color: red;">*</span></label>
                 <input type="text" class="form-control" placeholder="Appointment Time!"
                       value="{{appointment_data.select_time}}" readonly="">
            </div>
        </div>


        <hr class="m-b-1rem">
        <div class="form-group">
             <button type="button" class="btn btn-sm btn-danger" onclick="window.print();">Print</button>
        </div>

    </div>
</form