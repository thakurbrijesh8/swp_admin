<div class="card-header pt-1">
    <h3 class="card-title" style="float: none; text-align: center;">Feedback / Rating</h3>
</div>
<div class="card-body p-b-0px text-left f-s-14px">
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Application Number <span style="color: red;">*</span></label>
            <input type="text" class="form-control" placeholder="Application Number !"
                   value="{{application_number}}" readonly="">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Rating <span class="color-nic-red">*</span></label>
            <div id="rating_container_for_fr"></div>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Feedback <span class="color-nic-red">*</span></label>
            <textarea type="text" class="form-control" readonly=""
                      placeholder="Enter Feedback !">{{feedback}}</textarea>
        </div>
    </div>
</div>
<div class="card-footer text-right pr-2 pb-2">
    <button type="button" class="btn btn-sm btn-danger" style="padding: 2px 7px; margin-top: 1px;"
            onclick="Swal.close();"><i class="fas fa-times"></i>&nbsp; Close</button>
</div>