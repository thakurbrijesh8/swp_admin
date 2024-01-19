<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Reject Repairer Renewal Form</h3>
</div>
<form role="form" id="reject_hotel_renewal_form" name="reject_hotel_renewal_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="hotel_renewal_id_for_hotel_renewal_reject" name="hotel_renewal_id_for_hotel_renewal_reject" value="{{hotel_renewal_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-hotel-reject f-w-b" style="border-bottom: 2px solid red;"></span>
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
                <label>Name of the concern seeking the license <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of the concern seeking the license !"
                       value="{{name_of_hotel}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Remarks  <span style="color: red;">*</span></label>
                <textarea id="remarks_for_hotel_renewal_reject" name="remarks_for_hotel_renewal_reject" class="form-control"
                          onblur="checkValidation('hotel-reject', 'remarks_for_hotel_renewal_reject', establishmentRemarkValidationMessage);"
                          placeholder="Remarks !" ></textarea>
                <span class="error-message error-message-hotel-reject-remarks_for_hotel_renewal_reject"></span>
            </div>
        </div>
        <hr class="m-b-1rem">
        <div class="form-group">
            <button type="button" id="submit_btn_for_hotel_renewal_reject" class="btn btn-sm btn-danger" onclick="HotelRenewal.listview.rejectApplication();"
                    style="margin-right: 5px;"><i class="fas fa-times-circle"></i> Reject</button>
            <button type="button" class="btn btn-sm btn-default" onclick="Swal.close();"><i class="fas fa-times"></i> Close</button>
        </div>
    </div>
</form>