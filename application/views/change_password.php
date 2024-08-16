<?php $base_url = base_url(); ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>EODB ADMIN | Change Password</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php $this->load->view('common/css_links', array('base_url' => $base_url)); ?>
        <?php $this->load->view('common/js_links', array('base_url' => $base_url)); ?>
        <?php $this->load->view('common/validation_message'); ?>
    </head>
    <body class="hold-transition layout-top-nav">
        <?php
        $this->load->view('common/overlay');
        $this->load->view('security');
        ?>
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
                <div class="container">
                    <span class="brand-text font-weight-light" style="font-weight: bold !important; font-size: 25px !important;"><span class="d-sm-block d-md-none d-lg-none">EODB ADMIN</span> <span class="d-none d-md-block d-lg-block">EODB ADMIN</span></span>
                </div>
            </nav>
            <div class="content-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6" style="margin-top: 5%;">
                            <div class="card">
                                <div class="card-header">
                                    <h3 id="cp_success_title_container" class="card-title" style="float: none; text-align: center;">
                                        Change Password Form
                                    </h3>
                                </div>
                                <div class="card-body" id="cp_success_message_container">
                                    <form role="form" id="change_password_form" name="change_password_form" onsubmit="return false;">
                                        <input type="hidden" name="temp_tid_for_change_password" value="<?php echo isset($temp_tid) ? $temp_tid : ''; ?>"/>
                                        <input type="hidden" name="temp_npp_for_change_password" value="<?php echo isset($temp_npp) ? $temp_npp : ''; ?>"/>
                                        <div class="form-group">
                                            <label>New Password</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-asterisk"></i></span>
                                                </div>
                                                <input type="password" class="form-control" id="new_password_for_change_password" name="new_password_for_change_password" placeholder="Enter New Password !"
                                                       onblur="checkPasswordValidation('change-password', 'new_password_for_change_password');"
                                                       maxlength="20">
                                                <div class="input-group-prepend eye-class" onclick="hideShowPassword($(this), 'new_password_for_change_password');">
                                                    <span class="input-group-text"><i class="fa fa-eye"></i></span>
                                                </div>
                                            </div>
                                            <span class="error-message error-message-change-password-new_password_for_change_password"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Retype Password</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-asterisk"></i></span>
                                                </div>
                                                <input type="password" class="form-control" id="retype_password_for_change_password" name="retype_password_for_change_password" placeholder="Enter Retypes Password !"
                                                       onblur="checkPasswordValidationForRetypePassword('change-password', 'retype_password_for_change_password', 'new_password_for_change_password');"
                                                       maxlength="20">
                                                <div class="input-group-prepend eye-class" onclick="hideShowPassword($(this), 'retype_password_for_change_password');">
                                                    <span class="input-group-text"><i class="fa fa-eye"></i></span>
                                                </div>
                                            </div>
                                            <span class="error-message error-message-change-password-retype_password_for_change_password"></span>
                                        </div>

                                        <div class="form-group">
                                            <button type="button" id="submit_btn_for_change_password" class="btn btn-sm btn-success" onclick="changePassword($(this));" style="margin-right: 5px;">Submit</button>
                                            <button type="button" class="btn btn-sm btn-default" onclick="resetChangePasswordForm('<?php echo VALUE_TWO; ?>');">Clear</button>
                                        </div>
                                        <div class="form-group m-b-0" style="color: red;">
                                            <h5 class="f-w-b m-b-0" style="font-size: 16px;">Password Policy</h5>
                                            <?php echo PASSWORD_VALIDATION_MESSAGE; ?>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php $this->load->view('common/footer_text'); ?>
        </div>
        <script type="text/javascript">
            $('#change_password_form').find('input').keypress(function (e) {
                if (e.which == 13) {
                    changePassword($('#submit_btn_for_change_password'));
                }
            });

            function checkValidationForChangePassword(changePasswordFormData) {
                if (!changePasswordFormData.new_password_for_change_password) {
                    return getBasicMessageAndFieldJSONArray('new_password_for_change_password', newPasswordValidationMessage);
                }
                var passwordVMessage = passwordValidation(changePasswordFormData.new_password_for_change_password);
                if (passwordVMessage != '') {
                    return getBasicMessageAndFieldJSONArray('new_password_for_change_password', passwordVMessage);
                }
                if (!changePasswordFormData.retype_password_for_change_password) {
                    return getBasicMessageAndFieldJSONArray('retype_password_for_change_password', retypePasswordValidationMessage);
                }
                if (changePasswordFormData.new_password_for_change_password != changePasswordFormData.retype_password_for_change_password) {
                    return getBasicMessageAndFieldJSONArray('retype_password_for_change_password', passwordAndRetypePasswordValidationMessage);
                }
                return '';
            }

            function changePassword(btnObj) {
                validationMessageHide();
                var changePasswordFormData = $('#change_password_form').serializeFormJSON();
                var validationData = checkValidationForChangePassword(changePasswordFormData);
                if (validationData != '') {
                    $('#' + validationData.field).focus();
                    validationMessageShow('change-password-' + validationData.field, validationData.message);
                    return false;
                }
                changePasswordFormData.new_password_for_change_password = getEncryptedString(changePasswordFormData.new_password_for_change_password);
                $('#new_password_for_change_password').val(changePasswordFormData.new_password_for_change_password);
                changePasswordFormData.retype_password_for_change_password = getEncryptedString(changePasswordFormData.retype_password_for_change_password);
                $('#retype_password_for_change_password').val(changePasswordFormData.retype_password_for_change_password);
                var ogBtnHTML = btnObj.html();
                var ogBtnOnclick = btnObj.attr('onclick');
                btnObj.html('Processing..');
                btnObj.attr('onclick', '');
                openFullPageOverlay();
                $.ajax({
                    type: 'POST',
                    url: 'change_password/change_new_password',
                    data: $.extend({}, changePasswordFormData, getTokenData()),
                    error: function (textStatus, errorThrown) {
                        closeFullPageOverlay();
                        generateNewCSRFToken();
                        if (textStatus.status === 403) {
                            loginPage();
                            return false;
                        }
                        if (!textStatus.statusText) {
                            loginPage();
                            return false;
                        }
                        btnObj.html(ogBtnHTML);
                        btnObj.attr('onclick', ogBtnOnclick);
                        validationMessageShow('change-password', textStatus.statusText);
                    },
                    success: function (response) {
                        if (!isJSON(response)) {
                            loginPage();
                            return false;
                        }
                        closeFullPageOverlay();
                        var parseData = JSON.parse(response);
                        setNewToken(parseData.temp_token);
                        if (parseData.success == false) {
                            btnObj.html(ogBtnHTML);
                            btnObj.attr('onclick', ogBtnOnclick);
                            validationMessageShow('change-password', parseData.message);
                            return false;
                        }
                        $('#cp_success_title_container').html('Password Changed Successfully');
                        var template = '<h6 class="text-primary text-center">Click here to Login</h6><div class="text-center"><a class="btn btn-nic-blue" href="' + baseUrl + 'login">Login</a></div>';
                        $('#cp_success_message_container').html(template);
                    }
                });
            }
        </script>
    </body>
</html>
