var SJInspectionsListTemplate = Handlebars.compile($('#sj_inspections_list_template').html());
var SJInspectionsTableTemplate = Handlebars.compile($('#sj_inspections_table_template').html());
var SJInspectionsActionTemplate = Handlebars.compile($('#sj_inspections_action_template').html());
var SJInspectionsFormTemplate = Handlebars.compile($('#sj_inspections_form_template').html());
var SJInspectionsUploadReportTemplate = Handlebars.compile($('#sj_inspections_upload_report_template').html());
var SJInspections = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
SJInspections.Router = Backbone.Router.extend({
    routes: {
        'sj_inspections': 'renderList',
    },
    renderList: function () {
        SJInspections.listview.listPage();
    },
});
SJInspections.listView = Backbone.View.extend({
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
        addClass('menu_sj_inspections', 'active');
        SJInspections.router.navigate('sj_inspections');
        var templateData = {};
        this.$el.html(SJInspectionsListTemplate(templateData));
        this.loadSJInspectionsData();

    },
    loadSJInspectionsData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        SJInspections.router.navigate('sj_inspections');
        var sjiActionRenderer = function (data, type, full, meta) {
            var templateData = {};
            templateData.sj_inspection_id = data;
            if (full.status != VALUE_THREE) {
                templateData.show_edit = true;
            }
            return SJInspectionsActionTemplate(templateData);
        };
        var iuaRenderer = function (data, type, full, meta) {
            if (data.indexOf(',') > -1) {
                var actString = '';
                var multipleAct = data.split(',');
                var totalCnt = multipleAct.length;
                var cnt = 1;
                $.each(multipleAct, function (index, actId) {
                    actString += getActName(SJInspectionActArray, actId) + (totalCnt != cnt ? '<hr>' : '');
                    cnt++;
                });
                return actString;
            } else {
                return getActName(SJInspectionActArray, data);
            }
        };
        var cbTypeRenderer = function (data, type, full, meta) {
            return cbTypeArray[data] ? cbTypeArray[data] : '';
        };
        var inspectionStatusRenderer = function (data, type, full, meta) {
            return istatusArray[data] ? istatusArray[data] + (full.status == VALUE_THREE ? ('<br>(' + full.display_datetime + ')') : '') : '';
        };
        $('#sji_form_and_datatable_container').html(SJInspectionsTableTemplate);
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'cb_type_for_sji_list', false);
        renderOptionsForTwoDimensionalArray(istatusTextArray, 'status_for_sji_list', false);
        $('#sji_datatable').DataTable({
            ajax: {url: 'sj_inspections/get_sj_inspections_data', dataSrc: "sj_inspections_data", type: "post"},
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
                    "data": 'sj_inspection_id',
                    "render": sjiActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#sji_datatable_filter').remove();
    },
    newSJInspectionsForm: function (isEdit, sjiData) {
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
            sjiData.inspection_date = dateTo_DD_MM_YYYY();
        } else {
            sjiData.inspection_date = dateTo_DD_MM_YYYY(sjiData.inspection_date);
        }
        if (sjiData.status != VALUE_THREE) {
            sjiData.show_btns = true;
        }
        $('#sji_form_and_datatable_container').html(SJInspectionsFormTemplate(sjiData));
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'cb_type_for_sji');
        if (isEdit) {
            $('#cb_type_for_sji').val(sjiData.cb_type);

            var existingData = (sjiData.inspection_under_act).split(',');
            $.each(existingData, function (index, value) {
                $('input[name=inspection_under_act_for_sji][value="' + value + '"]').click();
            });
        }
        datePicker();
        generateSelect2();
        $('#sji_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSJInspections($('#submit_btn_for_sji'));
            }
        });
    },
    editSJInspections: function (btnObj, sjiId, isUR) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sjiId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sj_inspections/get_sj_inspections_by_id',
            type: 'post',
            data: $.extend({}, {'sj_inspection_id': sjiId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                if (isUR) {
                    that.uploadReportForm(parseData.sji_data);
                } else {
                    that.newSJInspectionsForm(true, parseData.sji_data);
                }
            }
        });
    },
    checkValidationForSJInspections: function (sjiData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sjiData.inspection_date_for_sji) {
            return getBasicMessageAndFieldJSONArray('inspection_date_for_sji', dateValidationMessage);
        }
        if (!sjiData.cb_name_for_sji) {
            return getBasicMessageAndFieldJSONArray('cb_name_for_sji', cbnameValidationMessage);
        }
        if (!sjiData.cb_address_for_sji) {
            return getBasicMessageAndFieldJSONArray('cb_address_for_sji', cbaddressValidationMessage);
        }
        if (!sjiData.cb_type_for_sji) {
            return getBasicMessageAndFieldJSONArray('cb_type_for_sji', oneOptionValidationMessage);
        }
        if (!sjiData.inspection_under_act_for_sji) {
            return getBasicMessageAndFieldJSONArray('inspection_under_act_for_sji', oneOptionValidationMessage);
        }
        return '';
    },
    submitSJInspections: function (btnObj) {
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
        var sjiData = $('#sji_form').serializeFormJSON();
        var validationData = that.checkValidationForSJInspections(sjiData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('sji-' + validationData.field, validationData.message);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'sj_inspections/submit_sj_inspections',
            data: $.extend({}, sjiData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadSJInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    uploadReportForm: function (sjiData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_INSPECTIONS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        sjiData.VALUE_TWO = VALUE_TWO;
        sjiData.VALUE_THREE = VALUE_THREE;
        if (sjiData.status != VALUE_THREE) {
            sjiData.show_btns = true;
        }
        sjiData.inspection_date = dateTo_DD_MM_YYYY(sjiData.inspection_date);
        if (sjiData.status != VALUE_THREE) {
            sjiData.show_edit = true;
        }
        $('#sji_form_and_datatable_container').html(SJInspectionsUploadReportTemplate(sjiData));
        if (sjiData.inspection_report != '') {
            $('#inspection_report_container_for_uir_sji').hide();
            $('#inspection_report_name_container_for_uir_sji').show();
            $('#inspection_report_name_href_for_uir_sji').attr('href', 'documents/inspection_report/' + sjiData.inspection_report);
            $('#inspection_report_name_for_uir_sji').html(sjiData.inspection_report);
            $('#inspection_report_remove_btn_for_uir_sji').attr('onclick', 'SJInspections.listview.askForRemoveIR("' + sjiData.sj_inspection_id + '")');
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
        var yesEvent = 'SJInspections.listview.uploadReport(\'' + moduleType + '\')';
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
        var sjiId = $('#sj_inspection_id_for_uir_sji').val();
        if (!sjiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#inspection_report_container_for_uir_sji').is(':visible')) {
            var IR = $('#inspection_report_for_uir_sji').val();
            if (IR == '') {
                $('#inspection_report_for_uir_sji').focus();
                validationMessageShow('uir-sji-inspection_report_for_uir_sji', uploadDocumentValidationMessage);
                return false;
            }
            var irMessage = fileUploadValidationForAllFiles('inspection_report_for_uir_sji', 5210);
            if (irMessage != '') {
                $('#inspection_report_for_uir_sji').focus();
                validationMessageShow('uir-sji-inspection_report_for_uir_sji', irMessage);
                return false;
            }
        }
        var that = this;
        var btnObj = moduleType == VALUE_TWO ? $('#draft_btn_for_uir_sji') : $('#submit_btn_for_uir_sji');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var irData = new FormData($('#uir_sji_form')[0]);
        irData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        irData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'sj_inspections/upload_inspection_report',
            data: irData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('uir-sji', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('uir-sji', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadSJInspectionsData();
                showSuccess(parseData.message);
            }
        });
    },
    askForRemoveIR: function (sjiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!sjiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'SJInspections.listview.removeIR(\'' + sjiId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeIR: function (sjiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!sjiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sj_inspections/remove_inspection_report',
            data: $.extend({}, {'sj_inspection_id': sjiId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('uir-sji', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('uir-sji', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                removeDocument('inspection_report', 'uir_sji');
            }
        });
    },
});
