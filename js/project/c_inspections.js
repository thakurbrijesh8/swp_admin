var CInspectionsListTemplate = Handlebars.compile($('#c_inspections_list_template').html());
var CInspectionsTableTemplate = Handlebars.compile($('#c_inspections_table_template').html());
var CInspectionsActionTemplate = Handlebars.compile($('#c_inspections_action_template').html());
var CInspectionsFormTemplate = Handlebars.compile($('#c_inspections_form_template').html());
var CInspectionsUploadReportTemplate = Handlebars.compile($('#c_inspections_upload_report_template').html());
var CInspections = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
CInspections.Router = Backbone.Router.extend({
    routes: {
        'c_inspections': 'renderList',
    },
    renderList: function () {
        CInspections.listview.listPage();
    },
});
CInspections.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_inspections');
        addClass('menu_c_inspections', 'active');
        CInspections.router.navigate('c_inspections');
        var templateData = {};
        this.$el.html(CInspectionsListTemplate(templateData));
        this.loadCInspectionsData();

    },
    loadCInspectionsData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        CInspections.router.navigate('c_inspections');
        var ciActionRenderer = function (data, type, full, meta) {
            var templateData = {};
            templateData.c_inspection_id = data;
            if (full.status != VALUE_THREE && full.is_lock != VALUE_ONE) {
                templateData.show_edit = true;
            }
            if (full.status != VALUE_THREE && full.is_lock != VALUE_ONE) {
                templateData.show_rand_lock_btn = true;
            }
            return CInspectionsActionTemplate(templateData);
        };
        var iuaRenderer = function (data, type, full, meta) {
            var tempString = '<table class="table" style="margin-bottom: 0px;">';
            if (data.indexOf(',') > -1) {
                var multipleAct = data.split(',');
                var cnt = 1;
                var officerData = [];
                var officerIds = full.officer_ids;
                var tempData = [];
                if (officerIds != '') {
                    tempData = JSON.parse(full.officer_ids);
                }
                $.each(multipleAct, function (index, actId) {
                    officerData = tempData[actId] ? tempData[actId] : [];
                    tempString += '<tr><td style="min-width: 120px;">' + getActName(CInspectionActArray, actId) + '</td><td class="f-w-b" style="width: 120px;">' + (officerData['status'] ? (officerData['status'] == VALUE_TWO ? ('<span class="text-danger">' + officerData.message + '<span>') : (full.is_lock == VALUE_ONE ? officerData['officer_name'] : '<span class="text-warning">Please Lock Randomization</span>')) : '<span class="text-warning">Randomization Pending</span>') + '</td></tr>';
                    cnt++;
                });
            } else {
                var officerData = [];
                var officerIds = full.officer_ids;
                if (officerIds != '') {
                    var tempData = JSON.parse(full.officer_ids);
                    officerData = tempData[data] ? tempData[data] : [];
                }
                tempString += '<tr><td style="min-width: 120px;">' + getActName(CInspectionActArray, data) + '</td><td class="f-w-b" style="width: 120px;">' + (officerData['status'] ? (officerData['status'] == VALUE_TWO ? ('<span class="text-danger">' + officerData.message + '<span>') : (full.is_lock == VALUE_ONE ? officerData['officer_name'] : '<span class="text-warning">Please Lock Randomization</span>')) : '<span class="text-warning">Randomization Pending</span>') + '</td></tr>';
            }
            tempString += '</table>';
            return tempString;
        };
        var cbTypeRenderer = function (data, type, full, meta) {
            return cbTypeArray[data] ? cbTypeArray[data] : '';
        };
        var inspectionStatusRenderer = function (data, type, full, meta) {
            var iStatusText = (istatusArray[data] ? istatusArray[data] + (full.status == VALUE_THREE ? ('<br>' + full.display_datetime) : '') : '');
            var rStatus = VALUE_ZERO;
            if (full.officer_ids != '') {
                rStatus = VALUE_ONE;
            }
            var rStatusText = randomizationStatusArray[rStatus] ? randomizationStatusArray[rStatus] : '';
            var lStatus = lockStatusArray[full.is_lock] ? lockStatusArray[full.is_lock] : '';
            return iStatusText + '<hr>' + rStatusText + '<hr>' + lStatus;
        };
        $('#ci_form_and_datatable_container').html(CInspectionsTableTemplate);
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'cb_type_for_ci_list', false);
        renderOptionsForTwoDimensionalArray(istatusTextArray, 'status_for_ci_list', false);
        $('#ci_datatable').DataTable({
            ajax: {url: 'c_inspections/get_c_inspections_data', dataSrc: "c_inspections_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'inspection_date', 'class': 'text-center', 'render': dateRenderer},
                {data: 'inspection_under_act', 'render': iuaRenderer},
                {data: 'cb_type', 'class': 'text-center', 'render': cbTypeRenderer},
                {data: 'cb_name'},
                {data: 'cb_address'},
                {data: 'status', 'class': 'text-center', 'render': inspectionStatusRenderer},
                {
                    "orderable": false,
                    "data": 'c_inspection_id',
                    "render": ciActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#ci_datatable_filter').remove();
    },
    newCInspectionsForm: function (isEdit, ciData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (!isEdit) {
            ciData.inspection_date = dateTo_DD_MM_YYYY();
        } else {
            ciData.inspection_date = dateTo_DD_MM_YYYY(ciData.inspection_date);
        }
        if (ciData.status != VALUE_THREE) {
            ciData.show_btns = true;
        }
        $('#ci_form_and_datatable_container').html(CInspectionsFormTemplate(ciData));
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'cb_type_for_ci');
        if (isEdit) {
            $('#cb_type_for_ci').val(ciData.cb_type);

            var existingData = (ciData.inspection_under_act).split(',');
            $.each(existingData, function (index, value) {
                $('input[name=inspection_under_act_for_ci][value="' + value + '"]').click();
            });
        }
        datePicker();
        generateSelect2();
        $('#ci_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitCInspections($('#submit_btn_for_ci'));
            }
        });
    },
    editCInspections: function (btnObj, ciId, isUR) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'c_inspections/get_c_inspections_by_id',
            type: 'post',
            data: $.extend({}, {'c_inspection_id': ciId}, getTokenData()),
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
                if (isUR) {
                    that.uploadReportForm(parseData.ci_data);
                } else {
                    that.newCInspectionsForm(true, parseData.ci_data);
                }
            }
        });
    },
    checkValidationForCInspections: function (ciData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ciData.inspection_date_for_ci) {
            return getBasicMessageAndFieldJSONArray('inspection_date_for_ci', dateValidationMessage);
        }
        if (!ciData.cb_name_for_ci) {
            return getBasicMessageAndFieldJSONArray('cb_name_for_ci', cbnameValidationMessage);
        }
        if (!ciData.cb_address_for_ci) {
            return getBasicMessageAndFieldJSONArray('cb_address_for_ci', cbaddressValidationMessage);
        }
        if (!ciData.cb_type_for_ci) {
            return getBasicMessageAndFieldJSONArray('cb_type_for_ci', oneOptionValidationMessage);
        }
        if (!ciData.inspection_under_act_for_ci) {
            return getBasicMessageAndFieldJSONArray('inspection_under_act_for_ci', oneOptionValidationMessage);
        }
        return '';
    },
    submitCInspections: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var ciData = $('#ci_form').serializeFormJSON();
        var validationData = that.checkValidationForCInspections(ciData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('ci-' + validationData.field, validationData.message);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'c_inspections/submit_c_inspections',
            data: $.extend({}, ciData, getTokenData()),
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
                that.loadCInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    uploadReportForm: function (ciData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        ciData.VALUE_TWO = VALUE_TWO;
        ciData.VALUE_THREE = VALUE_THREE;
        if (ciData.status != VALUE_THREE) {
            ciData.show_btns = true;
        }
        ciData.inspection_date = dateTo_DD_MM_YYYY(ciData.inspection_date);
        if (ciData.status != VALUE_THREE) {
            ciData.show_edit = true;
        }
        $('#ci_form_and_datatable_container').html(CInspectionsUploadReportTemplate(ciData));
        if (ciData.inspection_report != '') {
            $('#inspection_report_container_for_uir_ci').hide();
            $('#inspection_report_name_container_for_uir_ci').show();
            $('#inspection_report_name_href_for_uir_ci').attr('href', 'documents/inspection_report/' + ciData.inspection_report);
            $('#inspection_report_name_for_uir_ci').html(ciData.inspection_report);
            $('#inspection_report_remove_btn_for_uir_ci').attr('onclick', 'CInspections.listview.askForRemoveIR("' + ciData.c_inspection_id + '")');
        }
    },
    askForUploadReport: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_THREE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CInspections.listview.uploadReport(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    askForRandomize: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CInspections.listview.randomize(\'' + ciId + '\')';
        showConfirmation(yesEvent, 'Randomize');
    },
    randomize: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#randomize_btn_for_ci_' + ciId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        openFullPageOverlay();
        $.ajax({
            type: 'POST',
            url: 'c_inspections/randomize_inspector_details',
            data: $.extend({}, {'c_inspection_id': ciId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                closeFullPageOverlay();
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
                closeFullPageOverlay();
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
                that.loadCInspectionsData();
                showSuccess(parseData.message);
            }
        });

    },
    askForLock: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CInspections.listview.lock(\'' + ciId + '\')';
        showConfirmation(yesEvent, 'Lock');
    },
    lock: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#lock_btn_for_ci_' + ciId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'c_inspections/lock_randomization_details',
            data: $.extend({}, {'c_inspection_id': ciId}, getTokenData()),
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
                that.loadCInspectionsData();
                showSuccess(parseData.message);
            }
        });

    },
    uploadReport: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        var ciId = $('#c_inspection_id_for_uir_ci').val();
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#inspection_report_container_for_uir_ci').is(':visible')) {
            var IR = $('#inspection_report_for_uir_ci').val();
            if (IR == '') {
                $('#inspection_report_for_uir_ci').focus();
                validationMessageShow('uir-ci-inspection_report_for_uir_ci', uploadDocumentValidationMessage);
                return false;
            }
            var irMessage = fileUploadValidationForAllFiles('inspection_report_for_uir_ci', 5210);
            if (irMessage != '') {
                $('#inspection_report_for_uir_ci').focus();
                validationMessageShow('uir-ci-inspection_report_for_uir_ci', irMessage);
                return false;
            }
        }
        var that = this;
        var btnObj = moduleType == VALUE_TWO ? $('#draft_btn_for_uir_ci') : $('#submit_btn_for_uir_ci');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var irData = new FormData($('#uir_ci_form')[0]);
        irData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        irData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'c_inspections/upload_inspection_report',
            data: irData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
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
                validationMessageShow('uir-ci', textStatus.statusText);
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
                    validationMessageShow('uir-ci', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadCInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    askForRemoveIR: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CInspections.listview.removeIR(\'' + ciId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeIR: function (ciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!ciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'c_inspections/remove_inspection_report',
            data: $.extend({}, {'c_inspection_id': ciId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('uir-ci', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                if (!isJSON(response)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('uir-ci', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                removeDocument('inspection_report', 'uir_ci');
            }
        });
    },
});
