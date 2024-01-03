<div class="card-header">
    <h3 class="card-title" style="float: none; text-align: center;">Request For Payment</h3>
</div>
<form role="form" id="property_upload_challan_form" name="property_upload_challan_form" onsubmit="return false;" style="font-size: 14px;">
    <input type="hidden" id="property_id_for_property_upload_challan" name="property_id_for_property_upload_challan" value="{{property_id}}">
    <div class="card-body p-b-0px text-left">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="success-message-property-uc f-w-b" style="border-bottom: 2px solid green; color: green;"></span>
                <span class="error-message error-message-property-uc f-w-b" style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Party Name <span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Name of Applicant !"
                       value="{{party_name}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Party Address<span style="color: red;">*</span></label>
                <input type="text" class="form-control" placeholder="Complete Address of Registered Office !"
                       value="{{party_address}}" readonly="">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <label>Payment Type <span class="color-nic-red">*</span></label>
                <div id="payment_type_container_for_property_upload_challan"></div>
                <span class="error-message error-message-property-uc-payment_type_for_property_upload_challan"></span>
            </div>
        </div>
        <div class="row" id="uc_container_for_property_upload_challan" style="display: none;">
            <div class="col-12 m-b-5px" id="challan_container_for_property_upload_challan">
                <label>Upload <span class="utitle_for_property_upload_challan">{{utitle}}</span> <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                <input type="file" id="challan_for_property_upload_challan" name="challan_for_property_upload_challan"
                       accept="image/jpg,image/png,image/jpeg,image/jfif,application/pdf">
                <div class="error-message error-message-property-uc-challan_for_property_upload_challan"></div>
            </div>
            <div class="form-group col-sm-12" id="challan_name_container_for_property_upload_challan" style="display: none;">
                <label><span class="utitle_for_property_upload_challan">{{utitle}}</span> <span style="color: red;">*</label><br>
                <a id="challan_name_href_for_property_upload_challan" target="_blank">
                    <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="challan_name_for_property_upload_challan"></span>
                </a>
                {{#if show_remove_upload_btn}}
                <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" id="challan_remove_btn_for_property_upload_challan"></span><br>
                {{/if}}
                <span class="error-message error-message-property-uc-challan_name_for_property_upload_challan"></span>
            </div>
        </div>
        <div id="fb_container_for_{{module_type}}" style="display: none;"></div> 
        <hr class="m-b-1rem">
        <div class="form-group">
            {{#if show_remove_upload_btn}}
            <button type="button" id="submit_btn_for_property_upload_challan" class="btn btn-sm btn-success" onclick="Property.listview.uploadChallan();"
                    style="margin-right: 5px;">Request For Payment</button>
            {{/if}}
            <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
        </div>
    </div>
</form>