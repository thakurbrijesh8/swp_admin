<div class="card-header">
    <h3 class="card-title f-w-b" style="float: none; text-align: center;">
        {{title}} Update Email Id
    </h3>
</div>
<form role="form" id="vp_users_form" name="vp_users_form" onsubmit="return false;">
    <input type="hidden" id="vp_user_id_for_vp_users" name="vp_user_id_for_vp_users" value="{{user_id}}">
    <div class="card-body p-b-0px text-left" style="font-size: 13px;">
        <div class="row">
            <div class="col-sm-12 text-center">
                <span class="error-message error-message-vp-users f-w-b"
                      style="border-bottom: 2px solid red;"></span>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-padding bg-beige">
                <tr>
                    <td class="f-w-b" style="width: 40%;">Applicant Name</td>
                    <td>{{applicant_name}}</td>
                </tr>
                <tr>
                    <td class="f-w-b">Mobile Number</td>
                    <td>{{mobile_number}}</td>
                </tr>

            </table>
        </div>

        <div class="row">
            <div class="form-group col-sm-12">
                <label>Applicant Email</label>
                <input type="text" class="form-control" id="email_for_vp_users" name="email_for_vp_users"
                       onblur="checkValidationForExiEmail('vp-users', 'email_for_vp_users');"
                       placeholder="Enter Email !" maxlength="100" value="{{email}}">
                <span class="error-message error-message-vp-users-email_for_vp_users"></span>
            </div>
        </div>




        <div class="card-footer text-left pl-0">

            <button type="button" class="btn btn-sm btn-success" id="submit_btn_for_vp_users"
                    onclick="VPUsers.listview.updateEmailVPUsers($(this));">
                <i class="fas fa-save"></i> &nbsp; Update</button>

                <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();"><i class="fa fa-times"></i> &nbsp; Close</button>
        </div>
    </div>
</form>