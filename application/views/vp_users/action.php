<a class="btn btn-sm btn-nic-blue" target="_blank" style="padding: 2px 7px;"
   href="<?php echo PROJECT_PATH; ?>confirmation?q={{temp_access_token}}">
    <i class="fas fa-user-check" style="margin-right: 2px;"></i> Verify</a>
<button type="button" class="btn btn-sm btn-info" style="padding: 2px 7px; margin-bottom: 2px;"
        onclick="VPUsers.listview.reSendVerificationEmail($(this),'{{temp_access_token}}')">
    <i class="fas fa-paper-plane"></i> Re-Send</button>
<button type="button" class="btn btn-sm btn-danger" id="delete_btn_for_vp_users_list_{{user_id}}" style="padding: 2px 7px; margin-bottom: 2px;"
        onclick="VPUsers.listview.askForDeleteVPUsers('{{user_id}}')">
    <i class="fas fa-times-circle"></i> Delete</button>
