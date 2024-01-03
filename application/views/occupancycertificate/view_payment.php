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
            <label>Permission / License No with Date issue by PDA Daman<span style="color: red;">*</span></label>
            <input type="text" class="form-control" placeholder="Permission / License No !"
                   value="{{license_no}}" readonly="">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Applicant Payment Type <span class="color-nic-red">*</span></label>
            <input type="text" class="form-control" placeholder="Applicant Payment Type"
                   value="{{user_payment_type_text}}" readonly="" />
        </div>
    </div>
    <div class="row" id="vp_container_for_occupancycertificate" style="display: none;">
        <div class="form-group col-sm-12">
            <label><span class="utitle_for_occupancycertificate">{{utitle}}</span> <span style="color: red;">*</label><br>
            <a id="fees_paid_challan_name_href_for_occupancycertificate" target="_blank">
                <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="fees_paid_challan_name_for_occupancycertificate"></span>
            </a>
        </div>
    </div>
    <div id="fb_container_for_{{module_type}}" style="display: none;"></div>
    <div id="ph_container_for_{{module_type}}" style="display: none;"></div>
    <hr class="m-b-1rem">
    <div class="form-group">
        <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
    </div>
</div>