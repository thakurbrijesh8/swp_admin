var ismwListTemplate = Handlebars.compile($('#ismw_list_template').html());
var ismwTableTemplate = Handlebars.compile($('#ismw_table_template').html());
var ismwActionTemplate = Handlebars.compile($('#ismw_action_template').html());
var ismwFormTemplate = Handlebars.compile($('#ismw_form_template').html());
var ismwViewTemplate = Handlebars.compile($('#ismw_view_template').html());
var ismwApproveTemplate = Handlebars.compile($('#ismw_approve_template').html());
var ismwRejectTemplate = Handlebars.compile($('#ismw_reject_template').html());

var tempPersonCnt = 1;

var ISMW = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
ISMW.Router = Backbone.Router.extend({
    routes: {
        'ismw': 'renderList',
        'ismw_form': 'renderListForForm',
        'edit_ismw_form': 'renderList',
        'view_ismw_form': 'renderList',
    },
    renderList: function () {
        ISMW.listview.listPage();
    },
    renderListForForm: function () {
        ISMW.listview.listPageISMWForm();
    }
});
ISMW.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_ISMW) {
            activeLink('menu_ismw');
        } else {
            activeLink('menu_labour');
            addClass('menu_ismw', 'active');
        }
        ISMW.router.navigate('ismw');
        var templateData = {};
        this.$el.html(ismwListTemplate(templateData));
        this.loadISMWData();

    },
    listPageISMWForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        this.$el.html(ismwListTemplate);
        this.newISMWForm(false, {});
    },
    actionRenderer: function (rowData) {
//        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
        if ((tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_LABOUR_DEPT_USER || tempTypeInSession == TEMP_TYPE_ISMW) && rowData.status != VALUE_TWO) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
//        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
//                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
//            rowData.show_reject_btn = '';
//        } else {
//            rowData.show_reject_btn = 'display: none;';
//        }
//        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
//            rowData.show_approve_btn = '';
//        } else {
//            rowData.show_approve_btn = 'display: none;';
//        }
//        if (rowData.status != VALUE_FIVE) {
//            rowData.download_certificate_style = 'display: none;';
//        }
        return ismwActionTemplate(rowData);
    },
    loadISMWData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var dateEventRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.dob);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_FOURTYSEVEN, data);
        };
        var that = this;
        showTableContainer('ismw');
        ISMW.router.navigate('ismw');
        $('#ismw_datatable_container').html(ismwTableTemplate);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_ismw_list', false);
        allowOnlyIntegerValue('mobile_number_for_ismw_list');
        if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_ismw_list', false);
            ismwDataTable = $('#ismw_datatable').DataTable({
                ajax: {url: 'ismw/get_ismw_data', dataSrc: "ismw_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'ismw_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'district', 'class': 'text-center', 'render': districtRenderer},
                    {data: 'name', 'class': 'v-a-m'},
                    {data: 'mobile_no', 'class': 'v-a-m'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'ismw_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
//                    {data: 'ismw_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        } else {
            ismwDataTable = $('#ismw_datatable').DataTable({
                ajax: {url: 'ismw/get_ismw_data', dataSrc: "ismw_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'ismw_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'name', 'class': 'v-a-m'},
                    {data: 'mobile_no', 'class': 'v-a-m'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'ismw_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
//                    {data: 'ismw_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        }
        $('#ismw_datatable_filter').remove();
        $('#ismw_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = ismwDataTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(that.actionRenderer(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    newISMWForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.ismw_data;
            ISMW.router.navigate('edit_ismw_form');
        } else {
            var formData = {};
            ISMW.router.navigate('ismw_form');
        }
        eeDist = [];
        var templateData = {};
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.ismw_data = parseData.ismw_data;
        templateData.dob = dateTo_DD_MM_YYYY(formData.dob);
        //var ismwData = parseData.ismw_data;
        showFormContainer('ismw');
        $('#ismw_form_container').html(ismwFormTemplate((templateData)));
        generateBoxes('radio', genderTypeArray, 'gender', 'ismw', formData.gender, true);
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempStateData, 'state_for_ismw', 'state_code', 'state_name', 'Native State/UT');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'district_for_ismw', 'district_code', 'district_name', 'Native District');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'village_for_ismw', 'village_code', 'village_name', 'Native Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempStateData, 'ee_state', 'state_code', 'state_name', 'Native State/UT');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(eeDist, 'ee_dist', 'district_code', 'district_name', 'Native District');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#state_for_ismw').val(formData.p_state == 0 ? '' : formData.p_state);
            var districtData = tempDistrictData[formData.p_state] ? tempDistrictData[formData.p_state] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(districtData, 'district_for_ismw', 'district_code', 'district_name', 'District');
            $('#district_for_ismw').val(formData.p_dist == 0 ? '' : formData.p_dist);

            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillageData, 'village_for_ismw', 'village_code', 'village_name', 'Village');
            $('#village_for_ismw').val(formData.p_village == 0 ? '' : formData.p_village).trigger('change');
            if (formData.p_village == OTHER_VILLAGE) {
                renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(formData.village_data, 'village_for_ismw', 'village_code', 'Other', 'Village');
            }
            //ee
            $('#ee_state').val(formData.ee_state == 0 ? '' : formData.ee_state);
            var eedistrictData = tempDistrictData[formData.ee_state] ? tempDistrictData[formData.ee_state] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(eedistrictData, 'ee_dist', 'district_code', 'district_name', 'District');
            $('#ee_dist').val(formData.ee_dist == 0 ? '' : formData.ee_dist);

//            generateBoxes('radio', genderTypeArray, 'gender', 'ismw', formData.gender, true);
        }
        generateSelect2();
        datePicker();
        timePicker();
        $('#ismw_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitISMW($('#submit_btn_for_ismw'));
            }
        });
    },
    editOrViewISMW: function (btnObj, ismwId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ismwId) {
            showError(invalidUserValidationMessage);
            return;
        }
        tempVillageData = [];
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ismw/get_ismw_data_by_id',
            type: 'post',
            data: $.extend({}, {'ismw_id': ismwId}, getTokenData()),
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
                tempVillageData = parseData.village_data;
                if (isEdit) {
                    that.newISMWForm(isEdit, parseData);
                } else {
                    that.viewISMWForm(parseData);
                }
            }
        });
    },
    viewISMWForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        eeDist = [];
        var formData = parseData.ismw_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.dob = dateTo_DD_MM_YYYY(formData.dob);
        ISMW.router.navigate('view_ismw_form');
        showFormContainer('ismw');
        $('#ismw_form_container').html(ismwViewTemplate(formData));
        generateBoxes('radio', genderTypeArray, 'gender', 'ismw', formData.gender, true);
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempStateData, 'state_for_ismw', 'state_code', 'state_name', 'Native State/UT');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'district_for_ismw', 'district_code', 'district_name', 'Native District');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'village_for_ismw', 'village_code', 'village_name', 'Native Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempStateData, 'ee_state', 'state_code', 'state_name', 'Native State/UT');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(eeDist, 'ee_dist', 'district_code', 'district_name', 'Native District');
        //        $('#ismw_form_and_datatable_container').html(ismwViewTemplate(formData));

        $('#state_for_ismw').val(formData.p_state == 0 ? '' : formData.p_state);
        var districtData = tempDistrictData[formData.p_state] ? tempDistrictData[formData.p_state] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(districtData, 'district_for_ismw', 'district_code', 'district_name', 'District');
        $('#district_for_ismw').val(formData.p_dist == 0 ? '' : formData.p_dist);

        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillageData, 'village_for_ismw', 'village_code', 'village_name', 'Village');
        $('#village_for_ismw').val(formData.p_village == 0 ? '' : formData.p_village).trigger('change');
        if (formData.p_village == OTHER_VILLAGE) {
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(formData.village_data, 'village_for_ismw', 'village_code', 'Other', 'Village');
        }
        //ee
        $('#ee_state').val(formData.ee_state == 0 ? '' : formData.ee_state);
        var eedistrictData = tempDistrictData[formData.ee_state] ? tempDistrictData[formData.ee_state] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(eedistrictData, 'ee_dist', 'district_code', 'district_name', 'District');
        $('#ee_dist').val(formData.ee_dist == 0 ? '' : formData.ee_dist);

        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        $('#district').val(formData.district);
        generateSelect2();
    },
    checkValidationForISMW: function (ismwData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        if (!ismwData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!ismwData.name) {
            return getBasicMessageAndFieldJSONArray('name', personNameValidationMessage);
        }
        if (!ismwData.dob) {
            return getBasicMessageAndFieldJSONArray('dob', dateValidationMessage);
        }
        if (!ismwData.gender_for_ismw) {
            $('#gender_for_ismw_1').focus();
            return getBasicMessageAndFieldJSONArray('gender_for_ismw', oneOptionValidationMessage);
        }
        if (!ismwData.mobile_no) {
            return getBasicMessageAndFieldJSONArray('mobile_no', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(ismwData.mobile_no);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mobile_no', invalidMobileValidationMessage);
        }
        if (!ismwData.aadhaar_no) {
            return getBasicMessageAndFieldJSONArray('aadhaar_no', aadharnoValidationMessage);
        }
        if (!ismwData.state_for_ismw) {
            return getBasicMessageAndFieldJSONArray('state_for_ismw', stateValidationMessage);
        }
        if (!ismwData.district_for_ismw) {
            return getBasicMessageAndFieldJSONArray('district_for_ismw', districtValidationMessage);
        }
        if (!ismwData.village_for_ismw) {
            return getBasicMessageAndFieldJSONArray('village_for_ismw', villageNameValidationMessage);
        }
        if (!ismwData.p_pincode) {
            return getBasicMessageAndFieldJSONArray('p_pincode', pincodeValidationMessage);
        }

        return '';
    },
    askForSubmitISMW: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ISMW.listview.submitISMW(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitISMW: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var ismwData = $('#ismw_form').serializeFormJSON();
        var validationData = that.checkValidationForISMW(ismwData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('ismw-' + validationData.field, validationData.message);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_ismw') : $('#submit_btn_for_ismw');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var ismwData = new FormData($('#ismw_form')[0]);
        ismwData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        ismwData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'ismw/submit_ismw',
            data: ismwData,
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
                validationMessageShow('ismw', textStatus.statusText);
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
                    validationMessageShow('ismw', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                ISMW.router.navigate('ismw', {'trigger': true});
            }
        });
    },
    askForRemove: function (ismwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ISMW.listview.removeDocument(\'' + ismwId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (ismwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_ISMW) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'ismw/remove_document',
            data: $.extend({}, {'ismw_id': ismwId}, getTokenData()),
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
                validationMessageShow('ismw', textStatus.statusText);
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
                    validationMessageShow('ismw', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_ismw').hide();
                $('#seal_and_stamp_name_image_for_ismw').attr('src', '');
                $('#seal_and_stamp_container_for_ismw').show();
                $('#seal_and_stamp_for_ismw').val('');
            }
        });
    },
    generateForm: function (ismwId) {
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#ismw_id_for_ismw_form').val(ismwId);
        $('#ismw_form_pdf_form').submit();
        $('#ismw_id_for_ismw_form').val('');
    },
    askForApproveApplication: function (ismwId) {
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_ismw_' + ismwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ismw/get_ismw_data_by_ismw_id',
            type: 'post',
            data: $.extend({}, {'ismw_id': ismwId}, getTokenData()),
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
                var ismwData = parseData.ismw_data;
                showPopup();
                $('#popup_container').html(ismwApproveTemplate(ismwData));
                datePicker();
            }
        });
    },
    approveApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var formData = $('#approve_ismw_form').serializeFormJSON();
        if (!formData.ismw_id_for_ismw_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_ismw_approve) {
            $('#registration_number_for_ismw_approve').focus();
            validationMessageShow('ismw-approve-registration_number_for_ismw_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_ismw_approve) {
            $('#valid_upto_for_ismw_approve').focus();
            validationMessageShow('ismw-approve-valid_upto_for_ismw_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_ismw_approve) {
            $('#remarks_for_ismw_approve').focus();
            validationMessageShow('ismw-approve-remarks_for_ismw_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'ismw/approve_application',
            data: $.extend({}, formData, getTokenData()),
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
                validationMessageShow('ismw-approve', textStatus.statusText);
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
                    validationMessageShow('ismw-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.ismw_id_for_ismw_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.ismw_id_for_ismw_approve).remove();
                $('#approve_btn_for_app_' + formData.ismw_id_for_ismw_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.ismw_id_for_ismw_approve).show();
            }
        });
    },
    askForRejectApplication: function (ismwId) {
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_ismw_' + ismwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ismw/get_ismw_data_by_ismw_id',
            type: 'post',
            data: $.extend({}, {'ismw_id': ismwId}, getTokenData()),
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
                var ismwData = parseData.ismw_data;
                showPopup();
                $('#popup_container').html(ismwRejectTemplate(ismwData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var formData = $('#reject_ismw_form').serializeFormJSON();
        if (!formData.ismw_id_for_ismw_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_ismw_reject) {
            $('#remarks_for_ismw_reject').focus();
            validationMessageShow('ismw-reject-remarks_for_ismw_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'ismw/reject_application',
            data: $.extend({}, formData, getTokenData()),
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
                validationMessageShow('ismw-reject', textStatus.statusText);
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
                    validationMessageShow('ismw-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.ismw_id_for_ismw_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.ismw_id_for_ismw_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.ismw_id_for_ismw_reject).remove();
                $('#reject_btn_for_ismw_' + formData.ismw_id_for_ismw_reject).remove();
                $('#approve_btn_for_ismw_' + formData.ismw_id_for_ismw_reject).remove();
                that.loadISMWData();
            }
        });
    },
    generateCertificate: function (ismwId) {
        if (!ismwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#ismw_id_for_certificate').val(ismwId);
        $('#ismw_certificate_pdf_form').submit();
        $('#ismw_id_for_certificate').val('');
    },
    addMultipleAgent: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#agent_info_container').append(agentInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeAgentInfo: function (perCnt) {
        $('#agent_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    getQueryData: function (ismwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!ismwId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYFOUR;
        templateData.module_id = ismwId;
        var btnObj = $('#query_btn_for_ismw_' + ismwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'utility/get_query_data',
            type: 'post',
            data: $.extend({}, templateData, getTokenData()),
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
                return false;
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                if (parseData.is_logout === true) {
                    loginPage();
                    return false;
                }
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var moduleData = parseData.module_data;
                var tmpData = {};
                tmpData.application_number = regNoRenderer(VALUE_TWENTYFOUR, moduleData.ismw_id);
                tmpData.applicant_name = moduleData.name_of_person;
                tmpData.title = 'Tourism Event';
                tmpData.module_type = VALUE_TWENTYFOUR;
                tmpData.module_id = ismwId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getDistrictData: function (obj, moduleName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var text = moduleName == 'ismw' ? 'Native ' : '';
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'district_for_' + moduleName, 'district_code', 'district_name', text + 'District');
        $('#district_for_' + moduleName).val('');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'village_for_' + moduleName, 'village_code', 'village_name', text + 'Village');
        $('#village_for_' + moduleName).val('');
        var stateCode = obj.val();
        if (!stateCode) {
            return;
        }
        var districtData = tempDistrictData[stateCode] ? tempDistrictData[stateCode] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(districtData, 'district_for_' + moduleName, 'district_code', 'district_name', text + 'District');
        $('#district_for_' + moduleName).val('');

        // ee
        var eedistrictData = tempDistrictData[stateCode] ? tempDistrictData[stateCode] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(eedistrictData, 'ee_dist', 'district_code', 'district_name', text + 'District');
        $('#ee_dist').val('');


    },
    getVillageData: function (obj, moduleName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var text = moduleName == 'ismw' ? 'Native ' : '';
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'village_for_' + moduleName, 'village_code', 'village_name', text + 'Village');
        $('#village_for_' + moduleName).val('');
        var state = $('#state_for_' + moduleName).val();
        var districtCode = obj.val();
        if (!districtCode || !state) {
            return;
        }
        $.ajax({
            url: 'ismw/get_village_data_for_ismw',
            type: 'post',
            data: $.extend({}, {'state_code': state, 'district_code': districtCode}, getTokenData()),
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
                showError(textStatus.statusText);
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
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(parseData.village_data, 'village_for_' + moduleName, 'village_code', 'village_name', text + 'Village');
                $('#village_for_' + moduleName).val('');
            }
        });
    },
    villageChangeEvent: function (obj) {
        $('#other_village_name_container_for_ismw').hide();
        var villageCode = obj.val();
        if (!villageCode) {
            return false;
        }
        if (villageCode == OTHER_VILLAGE) {
            $('#other_village_name_container_for_ismw').show();
        }
    },
});
