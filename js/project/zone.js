var zoneListTemplate = Handlebars.compile($('#zone_list_template').html());
var zoneTableTemplate = Handlebars.compile($('#zone_table_template').html());
var zoneActionTemplate = Handlebars.compile($('#zone_action_template').html());
var zoneFormTemplate = Handlebars.compile($('#zone_form_template').html());
var zoneViewTemplate = Handlebars.compile($('#zone_view_template').html());
var zoneApproveTemplate = Handlebars.compile($('#zone_approve_template').html());
var zoneRejectTemplate = Handlebars.compile($('#zone_reject_template').html());

var tempPersonCnt = 1;

var Zone = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Zone.Router = Backbone.Router.extend({
    routes: {
        'zone': 'renderList',
        'zone_form': 'renderList',
        'edit_zone_form': 'renderList',
        'view_zone_form': 'renderList',
    },
    renderList: function () {
        Zone.listview.listPage();
    },
    renderListForForm: function () {
        Zone.listview.listPageZoneForm();
    }
});
Zone.listView = Backbone.View.extend({
    el: 'div#main_container',

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('zone', 'active');
        Zone.router.navigate('zone');
        var templateData = {};
        this.$el.html(zoneListTemplate(templateData));
        this.loadZoneData();

    },
    listPageZoneForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('zone', 'active');
        this.$el.html(zoneListTemplate);
        this.newZoneForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_approve_btn = '';
        } else {
            rowData.show_approve_btn = 'display: none;';
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_reject_btn = '';
        } else {
            rowData.show_reject_btn = 'display: none;';
        }
        rowData.module_type = VALUE_THIRTY;
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return zoneActionTemplate(rowData);
    },
    loadZoneData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_THIRTY, data);
        };
        var that = this;
        showTableContainer('zone');
        Zone.router.navigate('zone');
        $('#zone_datatable_container').html(zoneTableTemplate);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_zone_list', false);
        allowOnlyIntegerValue('mobile_number_for_zone_list');
        if (tempTypeInSession == TEMP_TYPE_A) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_zone_list', false);
            zoneDataTable = $('#zone_datatable').DataTable({
                ajax: {url: 'zone/get_zone_data', dataSrc: "zone_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'zone_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'district', 'class': 'text-center', 'render': districtRenderer},
                    {data: 'applicant_name', 'class': 'v-a-m'},
                    {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                    {data: 'name_of_applicant'},
                    {data: 'mobile_no'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'zone_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                    {data: 'zone_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        } else {
            zoneDataTable = $('#zone_datatable').DataTable({
                ajax: {url: 'zone/get_zone_data', dataSrc: "zone_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'zone_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'applicant_name', 'class': 'v-a-m'},
                    {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                    {data: 'name_of_applicant'},
                    {data: 'mobile_no'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'zone_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                    {data: 'zone_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        }
        $('#zone_datatable_filter').remove();
        $('#zone_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = zoneDataTable.row(tr);

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
    newZoneForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.zone_data;
            Zone.router.navigate('edit_zone_form');
        } else {
            var formData = {};
            Zone.router.navigate('zone_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.zone_data = parseData.zone_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.zone_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }

        showFormContainer('zone');

        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.zone_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        $('#zone_form_container').html(zoneFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        if (isEdit) {

            $('#district').val(formData.district);

            if (formData.site_plan != '') {
                $('#site_plan_container_for_zone').hide();
                $('#site_plan_name_image_for_zone').attr('src', ZONE_DOC_PATH + formData.site_plan);
                $('#site_plan_name_container_for_zone').show();
                $('#site_plan_name_download').attr("href", ZONE_DOC_PATH + formData.site_plan);
            }
            if (formData.I_XIV_nakal != '') {
                $('#I_XIV_nakal_container_for_zone').hide();
                $('#I_XIV_nakal_name_image_for_zone').attr('src', ZONE_DOC_PATH + formData.I_XIV_nakal);
                $('#I_XIV_nakal_name_container_for_zone').show();
                $('#I_XIV_nakal_name_download').attr("href", ZONE_DOC_PATH + formData.I_XIV_nakal);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_zone').hide();
                $('#seal_and_stamp_name_image_for_zone').attr('src', ZONE_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_zone').show();
                $('#seal_and_stamp_download').attr("href", ZONE_DOC_PATH + formData.signature);
            }
        }

        generateSelect2();
        datePicker();
        $('#zone_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitZone($('#submit_btn_for_zone'));
            }
        });
    },
    editOrViewZone: function (btnObj, zoneId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!zoneId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'zone/get_zone_data_by_id',
            type: 'post',
            data: $.extend({}, {'zone_id': zoneId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
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
                if (isEdit) {
                    that.newZoneForm(isEdit, parseData);
                } else {
                    that.viewZoneForm(parseData);
                }
            }
        });
    },
    viewZoneForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.zone_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        Zone.router.navigate('view_zone_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        showFormContainer('zone');
        $('#zone_form_container').html(zoneViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');

        $('#district').val(formData.district);
        if (formData.site_plan != '') {
            $('#site_plan_container_for_zone').hide();
            $('#site_plan_name_image_for_zone').attr('src', ZONE_DOC_PATH + formData.site_plan);
            $('#site_plan_name_container_for_zone').show();
            $('#site_plan_name_download').attr("href", ZONE_DOC_PATH + formData.site_plan);
        }
        if (formData.I_XIV_nakal != '') {
            $('#I_XIV_nakal_container_for_zone').hide();
            $('#I_XIV_nakal_name_image_for_zone').attr('src', ZONE_DOC_PATH + formData.I_XIV_nakal);
            $('#I_XIV_nakal_name_container_for_zone').show();
            $('#I_XIV_nakal_name_download').attr("href", ZONE_DOC_PATH + formData.I_XIV_nakal);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_zone_view').hide();
            $('#seal_and_stamp_name_image_for_zone_view').attr('src', ZONE_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_zone_view').show();
            $('#seal_and_stamp_download').attr("href", ZONE_DOC_PATH + formData.signature);
        }
    },
    checkValidationForZone: function (zoneData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!zoneData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!zoneData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!zoneData.address) {
            return getBasicMessageAndFieldJSONArray('address', owneraddressMessage);
        }
        if (!zoneData.mobile_no) {
            return getBasicMessageAndFieldJSONArray('mobile_no', mobileValidationMessage);
        }
        if (!zoneData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }
        return '';
    },
    askForSubmitZone: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Zone.listview.submitZone(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitZone: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var zoneData = $('#zone_form').serializeFormJSON();
        var validationData = that.checkValidationForZone(zoneData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('zone-' + validationData.field, validationData.message);
            return false;
        }


        if ($('#site_plan_container_for_zone').is(':visible')) {
            var siteplan = $('#site_plan_for_zone').val();
            if (siteplan == '') {
                $('#site_plan_for_zone').focus();
                validationMessageShow('zone-site_plan_for_zone', uploadDocumentValidationMessage);
                return false;
            }
            var siteplanMessage = pdffileUploadValidation('site_plan_for_zone', 10240);
            if (siteplanMessage != '') {
                $('#site_plan_for_zone').focus();
                validationMessageShow('zone-site_plan_for_zone', siteplanMessage);
                return false;
            }
        }

        if ($('#I_XIV_nakal_container_for_zone').is(':visible')) {
            var IXIVnakal = $('#I_XIV_nakal_for_zone').val();
            if (IXIVnakal == '') {
                $('#I_XIV_nakal_for_zone').focus();
                validationMessageShow('zone-I_XIV_nakal_for_zone', uploadDocumentValidationMessage);
                return false;
            }
            var IXIVnakalMessage = pdffileUploadValidation('I_XIV_nakal_for_zone', 10240);
            if (IXIVnakalMessage != '') {
                $('#I_XIV_nakal_for_zone').focus();
                validationMessageShow('zone-I_XIV_nakal_for_zone', IXIVnakalMessage);
                return false;
            }
        }


        if ($('#seal_and_stamp_container_for_zone').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_zone').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_zone').focus();
                validationMessageShow('zone-seal_and_stamp_for_zone', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_zone');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_zone').focus();
                validationMessageShow('zone-seal_and_stamp_for_zone', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_zone') : $('#submit_btn_for_zone');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var zoneData = new FormData($('#zone_form')[0]);
        zoneData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //zoneData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        zoneData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'zone/submit_zone',
            data: zoneData,
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
                validationMessageShow('zone', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('zone', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Zone.router.navigate('zone', {'trigger': true});
            }
        });
    },

    askForRemove: function (zoneId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Zone.listview.removeDocument(\'' + zoneId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (zoneId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'zone/remove_document',
            data: $.extend({}, {'zone_id': zoneId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('zone', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('zone', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_zone').hide();
                $('#seal_and_stamp_name_image_for_zone').attr('src', '');
                $('#seal_and_stamp_container_for_zone').show();
                $('#seal_and_stamp_for_zone').val('');
            }
        });
    },
    generateForm1: function (zoneId) {
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#zone_id_for_zone_form1').val(zoneId);
        $('#zone_form1_pdf_form').submit();
        $('#zone_id_for_zone_form1').val('');
    },
    askForApproveApplication: function (zoneId) {
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_zone_' + zoneId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'zone/get_zone_data_by_zone_id',
            type: 'post',
            data: $.extend({}, {'zone_id': zoneId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
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
                var zoneData = parseData.zone_data;
                showPopup();
                $('#popup_container').html(zoneApproveTemplate(zoneData));
                datePicker();
            }
        });
    },
    approveApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#approve_zone_form').serializeFormJSON();
        if (!formData.zone_id_for_zone_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_zone_approve) {
            $('#registration_number_for_zone_approve').focus();
            validationMessageShow('zone-approve-registration_number_for_zone_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_zone_approve) {
            $('#valid_upto_for_zone_approve').focus();
            validationMessageShow('zone-approve-valid_upto_for_zone_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_zone_approve) {
            $('#remarks_for_zone_approve').focus();
            validationMessageShow('zone-approve-remarks_for_zone_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'zone/approve_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('zone-approve', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('zone-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.zone_id_for_zone_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.zone_id_for_zone_approve).remove();
                $('#approve_btn_for_app_' + formData.zone_id_for_zone_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.zone_id_for_zone_approve).show();
            }
        });
    },
    askForRejectApplication: function (zoneId) {
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_zone_' + zoneId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'zone/get_zone_data_by_zone_id',
            type: 'post',
            data: $.extend({}, {'zone_id': zoneId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
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
                var zoneData = parseData.zone_data;
                showPopup();
                $('#popup_container').html(zoneRejectTemplate(zoneData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_zone_form').serializeFormJSON();
        if (!formData.zone_id_for_zone_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_zone_reject) {
            $('#remarks_for_zone_reject').focus();
            validationMessageShow('zone-reject-remarks_for_zone_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'zone/reject_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('zone-reject', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('zone-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.zone_id_for_zone_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.zone_id_for_zone_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.zone_id_for_zone_reject).remove();
                $('#reject_btn_for_app_' + formData.zone_id_for_zone_reject).remove();
                $('#approve_btn_for_app_' + formData.zone_id_for_zone_reject).remove();
            }
        });
    },
    generateCertificate: function (zoneId) {
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#zone_id_for_certificate').val(zoneId);
        $('#zone_certificate_pdf_form').submit();
        $('#zone_id_for_certificate').val('');
    },
    getQueryData: function (zoneId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!zoneId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTY;
        templateData.module_id = zoneId;
        var btnObj = $('#query_btn_for_zone_' + zoneId);
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
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
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
                var moduleData = parseData.module_data;
                var tmpData = {};
                tmpData.application_number = regNoRenderer(VALUE_THIRTY, moduleData.zone_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_THIRTY;
                tmpData.module_id = zoneId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (zoneId) {
        if (!zoneId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + zoneId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'zone/get_zone_data_by_zone_id',
            type: 'post',
            data: $.extend({}, {'zone_id': zoneId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
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
                var zoneData = parseData.zone_data;
                showPopup();
                if (zoneData.payment_type == VALUE_ONE || zoneData.payment_type == VALUE_THREE) {
                    zoneData.user_payment_type_text = paymentTypeArray[zoneData.payment_type];
                } else {
                    zoneData.user_payment_type_text = userPaymentTypeArray[zoneData.user_payment_type] ? userPaymentTypeArray[zoneData.user_payment_type] : '';
                }
                if (zoneData.payment_type == VALUE_ONE) {
                    zoneData.utitle = 'Fees Paid Challan Copy';
                } else if (zoneData.payment_type == VALUE_TWO && zoneData.user_payment_type == VALUE_ONE) {
                    zoneData.utitle = 'Demand Draft (DD) Copy';
                }
                $('#popup_container').html(zoneViewPaymentTemplate(zoneData));
                if (zoneData.payment_type == VALUE_ONE || (zoneData.payment_type == VALUE_TWO && zoneData.user_payment_type == VALUE_ONE)) {
                    if (zoneData.fees_paid_challan != '') {
                        $('#vp_container_for_zone').show();
                        $('#fees_paid_challan_name_href_for_zone').attr('href', ZONE_DOC_PATH + zoneData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_zone').html(zoneData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
