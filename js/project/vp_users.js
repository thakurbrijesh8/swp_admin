var vpUsersListTemplate = Handlebars.compile($('#vp_users_list_template').html());
var vpUsersTableTemplate = Handlebars.compile($('#vp_users_table_template').html());
var vpUsersActionTemplate = Handlebars.compile($('#vp_users_action_template').html());
var vpUsersEditEmailTemplate = Handlebars.compile($('#vp_users_edit_email_template').html());
var deletedUsersListTemplate = Handlebars.compile($('#deleted_users_list_template').html());
var deletedUsersTableTemplate = Handlebars.compile($('#deleted_users_table_template').html());

var VPUsers = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
VPUsers.Router = Backbone.Router.extend({
    routes: {
        'client_vp_users': 'renderList',
        'client_deleted_users': 'renderDeletedList'
    },
    renderList: function () {
        VPUsers.listview.listPage();
    },
    renderDeletedList: function () {
        VPUsers.listview.loadDeletedUserData();
    }
});
VPUsers.listView = Backbone.View.extend({
    el: 'div#main_container',

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_client_mm');
        addClass('menu_client_vp_users', 'active');
        VPUsers.router.navigate('client_vp_users');
        var templateData = {};
        this.$el.html(vpUsersListTemplate(templateData));
        this.loadVPUsersData();
    },
    loadVPUsersData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_client_mm');
        addClass('menu_client_vp_users', 'active');
        VPUsers.router.navigate('client_vp_users');
        var vpUsersActionRenderer = function (data, type, full, meta) {
            var actionTemplateData = {
                'temp_access_token': full.temp_access_token,
                'user_id': data
            };
            return vpUsersActionTemplate(actionTemplateData);
        };
        $('#vp_users_datatable_container').html(vpUsersTableTemplate);
        allowOnlyIntegerValue('mobile_number_for_vp_users_list');
        activeUsersDataTable = $('#vp_users_datatable').DataTable({
            ajax: {url: 'vp_users/get_vp_users_data', dataSrc: "vp_users_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            pageLength: 25,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'mobile_number', 'class': 'text-center v-a-m'},
                {data: 'email', 'class': 'text-center v-a-m', 'render': emailEditsplitStringRenderer},
                {data: 'is_verify_email', 'class': 'text-center v-a-m', 'render': yesNoRenderer},
                {data: 'verify_email_datetime', 'class': 'text-center v-a-m', 'render': dateTimeRenderer},
                {data: 'is_verify_mobile', 'class': 'text-center v-a-m', 'render': yesNoRenderer},
                {data: 'verify_mobile_datetime', 'class': 'text-center v-a-m', 'render': dateTimeRenderer},
                {data: 'is_active', 'class': 'text-center v-a-m', 'render': userStatusRenderer},
                {
                    "orderable": false,
                    "data": 'user_id',
                    "render": vpUsersActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#vp_users_datatable_filter').remove();
    },
    reSendVerificationEmail: function (btnObj, tempAccessToken) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!tempAccessToken) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vp_users/resend_verification_link', type: 'post',
            data: $.extend({}, {'temp_access_token': tempAccessToken}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                showError(textStatus.statusText);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (!isJSON(response)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    return false;
                }
                showSuccess(parseData.message);
            }
        });
    },

    editEmailVPUsers: function (btnObj, vpUsersId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!vpUsersId) {
            showError(invalidAccessValidationMessage);
            return;
        }

        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(spinnerTemplate({'type': 'primary', 'extra_class': 'spinner-border-small'}));
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vp_users/get_vp_users_data_by_id',
            type: 'post',
            data: $.extend({}, {'vp_user_id': vpUsersId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (!isJSON(response)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var vpUsersData = parseData.vp_users_data;

                that.editEmailVPUsersForm(vpUsersData);

            }
        });
    },

    editEmailVPUsersForm: function (vpUsersData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        showPopup();
        $('.swal2-popup').css('width', '40em');
        $('#popup_container').html(vpUsersEditEmailTemplate(vpUsersData));

    },
    checkValidationForEmailUpdate: function (vpUsersData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!vpUsersData.email_for_vp_users) {
            return getBasicMessageAndFieldJSONArray('email_for_vp_users', emailValidationMessage);
        }
        var emailIdValidationMessage = emailIdValidation(vpUsersData.email_for_vp_users);
        if (emailIdValidationMessage != '') {
            return getBasicMessageAndFieldJSONArray('email_for_vp_users', emailIdValidationMessage);
        }
        return '';
    },
    updateEmailVPUsers: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var vpUsersData = $('#vp_users_form').serializeFormJSON();
        var validationData = that.checkValidationForEmailUpdate(vpUsersData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('vp-users-' + validationData.field, validationData.message);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'vp_users/update_email',
            data: $.extend({}, vpUsersData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('vp-users', textStatus.statusText);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('vp-users', parseData.message);
                    return false;
                }
                that.loadVPUsersData();
                showSuccess(parseData.message);
            }
        });
    },
    askForDeleteVPUsers: function (vpUsersId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!vpUsersId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'VPUsers.listview.deleteVPUsers(' + vpUsersId + ')';
        showConfirmation(yesEvent, 'Delete');
    },
    deleteVPUsers: function (vpUsersId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var btnObj = $('#delete_btn_for_vp_users_list_' + vpUsersId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'vp_users/delete_vp_users_by_id',
            data: $.extend({}, {'vp_user_id': vpUsersId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                showError(textStatus.statusText);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadVPUsersData();
            }
        });
    },

    loadDeletedUserData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_client_mm');
        addClass('menu_client_deleted_users', 'active');
        VPUsers.router.navigate('client_deleted_users');
        var templateData = {};
        this.$el.html(deletedUsersListTemplate(templateData));
        $('#deleted_users_datatable_container').html(deletedUsersTableTemplate);
        allowOnlyIntegerValue('mobile_number_for_vp_users_list');
        activeUsersDataTable = $('#deleted_users_datatable').DataTable({
            ajax: {url: 'vp_users/get_deleted_users_data', dataSrc: "deleted_users_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            pageLength: 25,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'mobile_number', 'class': 'text-center v-a-m'},
                {data: 'email', 'class': 'text-center v-a-m', 'render': emailEditsplitStringRenderer},
                {data: 'is_verify_email', 'class': 'text-center v-a-m', 'render': yesNoRenderer},
                {data: 'verify_email_datetime', 'class': 'text-center v-a-m', 'render': dateTimeRenderer},
                {data: 'is_verify_mobile', 'class': 'text-center v-a-m', 'render': yesNoRenderer},
                {data: 'verify_mobile_datetime', 'class': 'text-center v-a-m', 'render': dateTimeRenderer},
                {data: 'is_active', 'class': 'text-center v-a-m', 'render': userStatusRenderer},
            ],
            "initComplete": searchableDatatable
        });
        $('#deleted_users_datatable_filter').remove();
    }
});
