<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">View Payment</h3>
</div>
<div class="card-body p-b-0px text-left" style="font-size: 14px;">
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Applicant Name <span style="color: red;">*</span></label>
            <input type="text" class="form-control" placeholder="Name of Applicant !"
                   value="{{applicant_name}}" readonly="">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Applicant Address <span style="color: red;">*</span></label>
            <textarea class="form-control" placeholder="Address of Applicant !"
                      readonly="">{{applicant_address}}</textarea>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Name of the Proposed Society <span style="color: red;">*</span></label>
            <input type="text" class="form-control" placeholder="Name of the Proposed Society !"
                   value="{{society_name}}" readonly="">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Address to be Registered <span style="color: red;">*</span></label>
            <textarea class="form-control" placeholder="Address to be Registered !"
                      readonly="">{{society_address}}</textarea>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Applicant Payment Type <span class="color-nic-red">*</span></label>
            <input type="text" class="form-control" placeholder="Applicant Payment Type"
                   value="{{user_payment_type_text}}" readonly="" />
        </div>
    </div>
    <div class="row" id="vp_container_for_society_registration" style="display: none;">
        <div class="form-group col-sm-12">
            <label><span class="utitle_for_society_registration">{{utitle}}</span> <span style="color: red;">*</label><br>
            <a id="fees_paid_challan_name_href_for_society_registration" target="_blank">
                <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="fees_paid_challan_name_for_society_registration"></span>
            </a>
        </div>
    </div>
    <div id="fb_container_for_{{module_type}}" style="display: none;"></div>
    <div id="ph_container_for_{{module_type}}" style="display: none;"></div>
    <div class="form-group">
        <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
    </div>
</div>