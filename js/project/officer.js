var officerListTemplate = Handlebars.compile($('#officer_list_template').html());
var officerTableTemplate = Handlebars.compile($('#officer_table_template').html());
var officerActionTemplate = Handlebars.compile($('#officer_action_template').html());
var officerFormTemplate = Handlebars.compile($('#officer_form_template').html());
var tempDepartmentData = [];
var Officer = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Officer.Router = Backbone.Router.extend({
    routes: {
        'officer': 'renderList',
    },
    renderList: function () {
        Officer.listview.listPage();
    },
});
Officer.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_users');
        addClass('menu_users_officer', 'active');
        Officer.router.navigate('officer');
        var templateData = {};
        this.$el.html(officerListTemplate(templateData));
        this.loadOfficerData();

    },
    loadOfficerData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        Officer.router.navigate('officer');
        var officerActionRenderer = function (data, type, full, meta) {
            return officerActionTemplate({'officer_id': data});
        };
        var officerStatusRenderer = function (data, type, full, meta) {
            if (data == VALUE_ONE) {
                return '<span class="badge bg-success" id="active_deactive_container_' + full.officer_id + '">Active</span>';
            }
            return '<span class="badge bg-danger" id="active_deactive_container_' + full.officer_id + '">Deactive</span>';
        };
        $('#officer_form_and_datatable_container').html(officerTableTemplate);
        $('#officer_datatable').DataTable({
            ajax: {url: 'officer/get_officer_data', dataSrc: "officer_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            pageLength: 20,
            language: dataTableProcessingAndNoDataMsg,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'department_name'},
                {data: 'officer_name'},
                {data: 'mobile_number', 'class': 'text-center', 'orderable': false},
                {data: 'email', 'orderable': false},
                {data: 'status', 'class': 'text-center', 'render': officerStatusRenderer, 'orderable': false},
                {
                    "orderable": false,
                    "data": 'officer_id',
                    "render": officerActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": function (settings, json) {
                setNewToken(json.temp_token);
            }
        });
    },
    askForNewOfficerForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var that = this;
        tempDepartmentData = [];
        $.ajax({
            type: 'POST',
            url: 'officer/get_common_data_for_officer',
            data: getTokenData(),
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
                tempDepartmentData = parseData.department_data;
                that.newOfficerForm(false, {});
            }
        });
    },
    newOfficerForm: function (isEdit, officerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        $('#officer_form_and_datatable_container').html(officerFormTemplate(officerData));
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempDepartmentData, 'department_id_for_officer', 'sa_user_type_id', 'type');
        if (isEdit) {
            $('#department_id_for_officer').val(officerData.department_id);
            $('#status_for_officer').val(officerData.status);
        }
        generateSelect2();
        $('#officer_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitOfficer($('#submit_btn_for_officer'));
            }
        });
    },
    editOfficer: function (btnObj, officerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!officerId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'officer/get_officer_data_by_id',
            type: 'post',
            data: $.extend({}, {'officer_id': officerId}, getTokenData()),
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
                tempDepartmentData = parseData.department_data;
                that.newOfficerForm(true, parseData.officer_data);
            }
        });
    },
    checkValidationForOfficer: function (officerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!officerData.department_id_for_officer) {
            return getBasicMessageAndFieldJSONArray('department_id_for_officer', oneOptionValidationMessage);
        }
        if (!officerData.officer_name_for_officer) {
            return getBasicMessageAndFieldJSONArray('officer_name_for_officer', nameValidationMessage);
        }
        if (!officerData.mobile_number_for_officer) {
            return getBasicMessageAndFieldJSONArray('mobile_number_for_officer', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(officerData.mobile_number_for_officer);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mobile_number_for_officer', mobileMessage);
        }
        if (officerData.email_for_officer != '') {
            var emailMessage = emailIdValidation(officerData.email_for_officer);
            if (emailMessage != '') {
                return getBasicMessageAndFieldJSONArray('email_for_officer', emailMessage);
            }
        }
        return '';
    },
    submitOfficer: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var officerData = $('#officer_form').serializeFormJSON();
        var validationData = that.checkValidationForOfficer(officerData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('officer-' + validationData.field, validationData.message);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'officer/submit_officer_data',
            data: $.extend({}, officerData, getTokenData()),
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
                that.loadOfficerData();
                showSuccess(parseData.message);
            }
        });
    },
});
