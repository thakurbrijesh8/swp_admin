var SCInspectionsListTemplate = Handlebars.compile($('#sc_inspections_list_template').html());
var SCInspectionsTableTemplate = Handlebars.compile($('#sc_inspections_table_template').html());
var SCInspectionsActionTemplate = Handlebars.compile($('#sc_inspections_action_template').html());
var SCInspectionsFormTemplate = Handlebars.compile($('#sc_inspections_form_template').html());
var SCInspectionsUploadReportTemplate = Handlebars.compile($('#sc_inspections_upload_report_template').html());
var SCInspections = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
SCInspections.Router = Backbone.Router.extend({
    routes: {
        'sc_inspections': 'renderList',
    },
    renderList: function () {
        SCInspections.listview.listPage();
    },
});
SCInspections.listView = Backbone.View.extend({
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
        addClass('menu_sc_inspections', 'active');
        SCInspections.router.navigate('sc_inspections');
        var templateData = {};
        this.$el.html(SCInspectionsListTemplate(templateData));
        this.loadSCInspectionsData();

    },
    loadSCInspectionsData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        SCInspections.router.navigate('sc_inspections');
        var sciActionRenderer = function (data, type, full, meta) {
            var templateData = {};
            templateData.sc_inspection_id = data;
            if (full.status != VALUE_THREE) {
                templateData.show_edit = true;
            }
            return SCInspectionsActionTemplate(templateData);
        };
        var iuaRenderer = function (data, type, full, meta) {
            if (data.indexOf(',') > -1) {
                var actString = '';
                var multipleAct = data.split(',');
                var totalCnt = multipleAct.length;
                var cnt = 1;
                $.each(multipleAct, function (index, actId) {
                    actString += getActName(SCInspectionActArray, actId) + (totalCnt != cnt ? '<hr>' : '');
                    cnt++;
                });
                return actString;
            } else {
                return getActName(SCInspectionActArray, data);
            }
        };
        var inspectionTypeRenderer = function (data, type, full, meta) {
            return inspectionTypeArray[data] ? inspectionTypeArray[data] : '';
        };
        var inspectionStatusRenderer = function (data, type, full, meta) {
            return istatusArray[data] ? istatusArray[data] + (full.status == VALUE_THREE ? ('<br>(' + full.display_datetime + ')') : '') : '';
        };
        $('#sci_form_and_datatable_container').html(SCInspectionsTableTemplate);
        renderOptionsForTwoDimensionalArray(inspectionTypeArray, 'inspection_type_for_sci_list', false);
        renderOptionsForTwoDimensionalArray(istatusTextArray, 'status_for_sci_list', false);
        $('#sci_datatable').DataTable({
            ajax: {url: 'sc_inspections/get_sc_inspections_data', dataSrc: "sc_inspections_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'inspection_date', 'class': 'text-center', 'render': dateRenderer},
                {data: 'inspection_under_act', 'render': iuaRenderer},
                {data: 'inspection_type', 'class': 'text-center', 'render': inspectionTypeRenderer},
                {data: 'cb_name'},
                {data: 'cb_address'},
                {data: 'status', 'class': 'text-center', 'render': inspectionStatusRenderer},
                {
                    "orderable": false,
                    "data": 'sc_inspection_id',
                    "render": sciActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#sci_datatable_filter').remove();
    },
    newSCInspectionsForm: function (isEdit, sciData) {
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
            sciData.inspection_date = dateTo_DD_MM_YYYY();
        } else {
            sciData.inspection_date = dateTo_DD_MM_YYYY(sciData.inspection_date);
        }
        if (sciData.status != VALUE_THREE) {
            sciData.show_btns = true;
        }
        $('#sci_form_and_datatable_container').html(SCInspectionsFormTemplate(sciData));
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'cb_type_for_sci');
        generateBoxes('radio', inspectionTypeArray, 'inspection_type', 'sci', sciData.inspection_type, false);
        showSubContainer('inspection_type', 'sci', 'itc', VALUE_TWO, 'radio');
        if (isEdit) {
            $('#cb_type_for_sci').val(sciData.cb_type);

            var existingData = (sciData.inspection_under_act).split(',');
            $.each(existingData, function (index, value) {
                $('input[name=inspection_under_act_for_sci][value="' + value + '"]').click();
            });
        }
        datePicker();
        generateSelect2();
        $('#sci_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSCInspections($('#submit_btn_for_sci'));
            }
        });
    },
    editSCInspections: function (btnObj, sciId, isUR) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sciId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sc_inspections/get_sc_inspections_by_id',
            type: 'post',
            data: $.extend({}, {'sc_inspection_id': sciId}, getTokenData()),
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
                    that.uploadReportForm(parseData.sci_data);
                } else {
                    that.newSCInspectionsForm(true, parseData.sci_data);
                }
            }
        });
    },
    checkValidationForSCInspections: function (sciData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sciData.inspection_date_for_sci) {
            return getBasicMessageAndFieldJSONArray('inspection_date_for_sci', dateValidationMessage);
        }
        if (!sciData.inspection_type_for_sci) {
            return getBasicMessageAndFieldJSONArray('inspection_type_for_sci', oneOptionValidationMessage);
        }
        if (sciData.inspection_type_for_sci == VALUE_TWO) {
            if (!sciData.complainant_name_for_sci) {
                return getBasicMessageAndFieldJSONArray('complainant_name_for_sci', cnameValidationMessage);
            }
            if (!sciData.complainant_mobile_number_for_sci) {
                return getBasicMessageAndFieldJSONArray('complainant_mobile_number_for_sci', mobileValidationMessage);
            }
            var cmMessage = mobileNumberValidation(sciData.complainant_mobile_number_for_sci);
            if (cmMessage != '') {
                return getBasicMessageAndFieldJSONArray('complainant_mobile_number_for_sci', cmMessage);
            }
            if (sciData.complainant_email_for_sci != '') {
                var ceMessage = emailIdValidation(sciData.complainant_email_for_sci);
                if (ceMessage != '') {
                    return getBasicMessageAndFieldJSONArray('complainant_email_for_sci', ceMessage);
                }
            }
            if (!sciData.complainant_address_for_sci) {
                return getBasicMessageAndFieldJSONArray('complainant_address_for_sci', caddressValidationMessage);
            }
        }
        if (!sciData.cb_name_for_sci) {
            return getBasicMessageAndFieldJSONArray('cb_name_for_sci', cbnameValidationMessage);
        }
        if (!sciData.cb_address_for_sci) {
            return getBasicMessageAndFieldJSONArray('cb_address_for_sci', cbaddressValidationMessage);
        }
        if (!sciData.cb_type_for_sci) {
            return getBasicMessageAndFieldJSONArray('cb_type_for_sci', oneOptionValidationMessage);
        }
        if (!sciData.inspection_under_act_for_sci) {
            return getBasicMessageAndFieldJSONArray('inspection_under_act_for_sci', oneOptionValidationMessage);
        }
        return '';
    },
    submitSCInspections: function (btnObj) {
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
        var sciData = $('#sci_form').serializeFormJSON();
        var validationData = that.checkValidationForSCInspections(sciData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('sci-' + validationData.field, validationData.message);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'sc_inspections/submit_sc_inspections',
            data: $.extend({}, sciData, getTokenData()),
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
                that.loadSCInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    uploadReportForm: function (sciData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        sciData.VALUE_TWO = VALUE_TWO;
        sciData.VALUE_THREE = VALUE_THREE;
        if (sciData.status != VALUE_THREE) {
            sciData.show_btns = true;
        }
        sciData.inspection_date = dateTo_DD_MM_YYYY(sciData.inspection_date);
        if (sciData.status != VALUE_THREE) {
            sciData.show_edit = true;
        }
        $('#sci_form_and_datatable_container').html(SCInspectionsUploadReportTemplate(sciData));
        if (sciData.inspection_report != '') {
            $('#inspection_report_container_for_uir_sci').hide();
            $('#inspection_report_name_container_for_uir_sci').show();
            $('#inspection_report_name_href_for_uir_sci').attr('href', 'documents/inspection_report/' + sciData.inspection_report);
            $('#inspection_report_name_for_uir_sci').html(sciData.inspection_report);
            $('#inspection_report_remove_btn_for_uir_sci').attr('onclick', 'SCInspections.listview.askForRemoveIR("' + sciData.sc_inspection_id + '")');
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
        var yesEvent = 'SCInspections.listview.uploadReport(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
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
        var sciId = $('#sc_inspection_id_for_uir_sci').val();
        if (!sciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#inspection_report_container_for_uir_sci').is(':visible')) {
            var IR = $('#inspection_report_for_uir_sci').val();
            if (IR == '') {
                $('#inspection_report_for_uir_sci').focus();
                validationMessageShow('uir-sci-inspection_report_for_uir_sci', uploadDocumentValidationMessage);
                return false;
            }
            var irMessage = fileUploadValidationForAllFiles('inspection_report_for_uir_sci', 5210);
            if (irMessage != '') {
                $('#inspection_report_for_uir_sci').focus();
                validationMessageShow('uir-sci-inspection_report_for_uir_sci', irMessage);
                return false;
            }
        }
        var that = this;
        var btnObj = moduleType == VALUE_TWO ? $('#draft_btn_for_uir_sci') : $('#submit_btn_for_uir_sci');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var irData = new FormData($('#uir_sci_form')[0]);
        irData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        irData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'sc_inspections/upload_inspection_report',
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
                validationMessageShow('uir-sci', textStatus.statusText);
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
                    validationMessageShow('uir-sci', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadSCInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    askForRemoveIR: function (sciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!sciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'SCInspections.listview.removeIR(\'' + sciId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeIR: function (sciId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!sciId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sc_inspections/remove_inspection_report',
            data: $.extend({}, {'sc_inspection_id': sciId}, getTokenData()),
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
                validationMessageShow('uir-sci', textStatus.statusText);
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
                    validationMessageShow('uir-sci', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                removeDocument('inspection_report', 'uir_sci');
            }
        });
    },
});
