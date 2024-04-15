var wcListTemplate = Handlebars.compile($('#wc_list_template').html());
var wcTableTemplate = Handlebars.compile($('#wc_table_template').html());
var wcActionTemplate = Handlebars.compile($('#wc_action_template').html());
var wcFormTemplate = Handlebars.compile($('#wc_form_template').html());
var wcViewTemplate = Handlebars.compile($('#wc_view_template').html());
var wcUploadChallanTemplate = Handlebars.compile($('#wc_upload_challan_template').html());
var wcApproveTemplate = Handlebars.compile($('#wc_approve_template').html());
var wcRejectTemplate = Handlebars.compile($('#wc_reject_template').html());
var wcViewPaymentTemplate = Handlebars.compile($('#wc_view_payment_template').html());
var tempPersonCnt = 1;

var WC = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
WC.Router = Backbone.Router.extend({
    routes: {
        'wc': 'renderList',
        'wc_form': 'renderListForForm',
        'edit_wc_form': 'renderList',
        'view_wc_form': 'renderList',
    },
    renderList: function () {
        WC.listview.listPage();
    },
    renderListForForm: function () {
        WC.listview.listPageWCForm();
    }
});
WC.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="sufficient_stock"]': 'hasSufficientStockEvent',
        'click input[name="any_previous_application"]': 'hasAnyPreviousApplicationsEvent',
        'click input[name="is_limited_company"]': 'hasLimitedCompanyEvent',
    },
    hasSufficientStockEvent: function (event) {
        var val = $('input[name=sufficient_stock]:checked').val();
        if (val === '1') {
            this.$('.stock_details_div').show();
        } else {
            this.$('.stock_details_div').hide();

        }
    },
    hasAnyPreviousApplicationsEvent: function (event) {
        var val = $('input[name=any_previous_application]:checked').val();
        if (val === '1') {
            this.$('.any_previous_application_div').show();
        } else {
            this.$('.any_previous_application_div').hide();

        }
    },
    hasLimitedCompanyEvent: function (event) {
        var val = $('input[name=is_limited_company]:checked').val();
        if (val === '1') {
            this.$('.proprietor_info_div').show();
        } else {
            this.$('.proprietor_info_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pwd');
        addClass('wc', 'active');
        WC.router.navigate('wc');
        var templateData = {};
        this.$el.html(wcListTemplate(templateData));
        this.loadWCData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageWCForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pwd');
        this.$el.html(wcListTemplate);
        this.newWCForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return wcActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_upload_challan_btn = true;
        }
        rowData.status = parseInt(rowData.status);
        if (rowData.status == VALUE_FOUR || rowData.status == VALUE_FIVE || rowData.status == VALUE_SEVEN || rowData.status == VALUE_EIGHT) {
            rowData.show_download_fees_paid_challan_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_reject_btn = '';
        } else {
            rowData.show_reject_btn = 'display: none;';
        }
        if (rowData.status == VALUE_SEVEN && (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_approve_btn = '';
        } else {
            rowData.show_approve_btn = 'display: none;';
        }
        rowData.module_type = VALUE_FIVE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return wcActionTemplate(rowData);
    },
    loadWCData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.wc_type;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FIVE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FIVE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['wc_data'], function (index, objData) {
                json['wc_data'][index]['query_movement_string'] = qmData[objData.wc_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.wc_id] + '</table>') : '-';
            });
            return json['wc_data'];
        };
        var that = this;
        showTableContainer('wc');
        WC.router.navigate('wc');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'WC.listview.loadWCData();');
        $('#wc_datatable_container').html(wcTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_wc_list', false);
        allowOnlyIntegerValue('mobile_number_for_wc_list');
//         if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_wc_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_wc_type', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_wc_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_wc_list', false);
        $('#district_for_wc_list').val(searchData.search_district);
        $('#status_for_wc_list').val(searchData.search_status);
        $('#app_timing_for_wc_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_wc_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_wc_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_wc_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_wc_list').attr('disabled', 'disabled');
        }
        wcDataTable = $('#wc_datatable').DataTable({
            ajax: {url: 'wc/get_wc_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'wc_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'wc_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'wc_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'wc_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  }
        $('#wc_datatable_filter').remove();
        $('#wc_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = wcDataTable.row(tr);

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
    newWCForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.wc_data;
            WC.router.navigate('edit_wc_form');
        } else {
            var formData = {};
            WC.router.navigate('wc_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.wc_data = parseData.wc_data;
        showFormContainer('wc');
        $('#wc_form_container').html(wcFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#declaration_for_wc').attr('checked', 'checked');
            $('#application_category').val(formData.application_category);
            $('#house_ownership').val(formData.house_ownership);
            $('#wc_type').val(formData.wc_type);
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_wc').hide();
                $('#seal_and_stamp_name_image_for_wc').attr('src', WC_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_wc').show();
                $('#seal_and_stamp_download').attr("href", WC_DOC_PATH + formData.signature);
            }
            if (formData.receipt_of_last_years_house_tax != '') {
                $('#receipt_of_last_years_house_tax_container').hide();
                $('#receipt_of_last_years_house_tax_name_image').attr('src', WC_DOC_PATH + formData.receipt_of_last_years_house_tax);
                $('#receipt_of_last_years_house_tax_name_container').show();
                $('#receipt_of_last_years_house_tax_download').attr("href", WC_DOC_PATH + formData.receipt_of_last_years_house_tax);
            }
            if (formData.id_proof != '') {
                $('#id_proof_container').hide();
                $('#id_proof_name_image').attr('src', WC_DOC_PATH + formData.id_proof);
                $('#id_proof_name_container').show();
                $('#id_proof_download').attr("href", WC_DOC_PATH + formData.id_proof);
            }
            if (formData.electricity_bill != '') {
                $('#electricity_bill_container').hide();
                $('#electricity_bill_name_image').attr('src', WC_DOC_PATH + formData.electricity_bill);
                $('#electricity_bill_name_container').show();
                $('#electricity_bill_download').attr("href", WC_DOC_PATH + formData.electricity_bill);
            }
        }
        generateSelect2();
        datePicker();
        $('#wc_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitWC($('#submit_btn_for_wc'));
            }
        });
    },
    editOrViewWC: function (btnObj, wcId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!wcId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wc/get_wc_data_by_id',
            type: 'post',
            data: $.extend({}, {'wc_id': wcId}, getTokenData()),
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
                if (isEdit) {
                    that.newWCForm(isEdit, parseData);
                } else {
                    that.viewWCForm(parseData);
                }
            }
        });
    },
    viewWCForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.wc_data;
        WC.router.navigate('view_wc_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('wc');
        $('#wc_form_container').html(wcViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#declaration_for_wc').attr('checked', 'checked');
        $('#application_category').val(formData.application_category);
        $('#house_ownership').val(formData.house_ownership);
        $('#wc_type').val(formData.wc_type);
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_wc_view').hide();
            $('#seal_and_stamp_name_image_for_wc_view').attr('src', WC_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_wc_view').show();
            $('#seal_and_stamp_download').attr("href", WC_DOC_PATH + formData.signature);
        }
        if (formData.receipt_of_last_years_house_tax != '') {
            $('#receipt_of_last_years_house_tax_container_for_wc_view').hide();
            $('#receipt_of_last_years_house_tax_name_image_for_wc_view').attr('src', WC_DOC_PATH + formData.receipt_of_last_years_house_tax);
            $('#receipt_of_last_years_house_tax_name_container_for_wc_view').show();
            $('#receipt_of_last_years_house_tax_download').attr("href", WC_DOC_PATH + formData.receipt_of_last_years_house_tax);
        }
        if (formData.id_proof != '') {
            $('#id_proof_container_for_wc_view').hide();
            $('#id_proof_name_image_for_wc_view').attr('src', WC_DOC_PATH + formData.id_proof);
            $('#id_proof_name_container_for_wc_view').show();
            $('#id_proof_download').attr("href", WC_DOC_PATH + formData.id_proof);
        }

        if (formData.electricity_bill != '') {
            $('#electricity_bill_container_for_wc_view').hide();
            $('#electricity_bill_name_image_for_wc_view').attr('src', WC_DOC_PATH + formData.electricity_bill);
            $('#electricity_bill_name_container_for_wc_view').show();
            $('#electricity_bill_download').attr("href", WC_DOC_PATH + formData.electricity_bill);
        }
    },
    checkValidationForWC: function (wcData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!wcData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!wcData.house_no) {
            return getBasicMessageAndFieldJSONArray('house_no', houseNoValidationMessage);
        }
        if (!wcData.ward_no) {
            return getBasicMessageAndFieldJSONArray('ward_no', wardNoValidationMessage);
        }
        if (!wcData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }
        if (!wcData.panchayat_or_dmc) {
            return getBasicMessageAndFieldJSONArray('panchayat_or_dmc', panchayatOrDmcValidationMessage);
        }
        if (!wcData.application_category) {
            return getBasicMessageAndFieldJSONArray('application_category', applicantCategoryWcValidationMessage);
        }
        if (!wcData.house_ownership) {
            return getBasicMessageAndFieldJSONArray('house_ownership', houseOwnershipValidationMessage);
        }
        if (!wcData.wc_type) {
            return getBasicMessageAndFieldJSONArray('wc_type', wcTypeValidationMessage);
        }
        if (!wcData.diameter_service_connection) {
            return getBasicMessageAndFieldJSONArray('diameter_service_connection', diameterServiceConnectionValidationMessage);
        }
        if (!wcData.water_meter) {
            return getBasicMessageAndFieldJSONArray('water_meter', waterMeterValidationMessage);
        }
        if (!wcData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        return '';
    },
    askForSubmitWC: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'WC.listview.submitWC(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitWC: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var wcData = $('#wc_form').serializeFormJSON();
        var validationData = that.checkValidationForWC(wcData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('wc-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#seal_and_stamp_container_for_wc').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_wc').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_wc').focus();
                validationMessageShow('wc-seal_and_stamp_for_wc', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_wc');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_wc').focus();
                validationMessageShow('wc-seal_and_stamp_for_wc', sealAndStampMessage);
                return false;
            }
        }

        if ($('#support_document_container_for_wc').is(':visible')) {
            var supportDocument = $('#support_document_for_wc').val();
            if (supportDocument == '') {
                $('#support_document_for_wc').focus();
                validationMessageShow('wc-support_document_for_wc', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = fileUploadValidation('support_document_for_wc');
            if (supportDocumentMessage != '') {
                $('#support_document_for_wc').focus();
                validationMessageShow('wc-support_document_for_wc', sealAndStampMessage);
                return false;
            }
        }

        if (!$('#declaration_for_wc').is(':checked')) {
            $('#declaration_for_wc').focus();
            validationMessageShow('wc-declaration_for_wc', declarationOneValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_wc') : $('#submit_btn_for_wc');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var wcData = new FormData($('#wc_form')[0]);
        wcData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        wcData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'wc/submit_wc',
            data: wcData,
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
                validationMessageShow('wc', textStatus.statusText);
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
                    validationMessageShow('wc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                WC.router.navigate('wc', {'trigger': true});
            }
        });
    },

    askForRemove: function (wcId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'WC.listview.removeDocument(\'' + wcId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (wcId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wc/remove_document',
            data: $.extend({}, {'wc_id': wcId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('wc', textStatus.statusText);
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
                    validationMessageShow('wc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == 1) {
                    $('#support_document_name_container_for_wc').hide();
                    $('#support_document_name_image_for_wc').attr('src', '');
                    $('#support_document_container_for_wc').show();
                    $('#support_document_for_wc').val('');
                }
                if (docType == 2) {
                    $('#seal_and_stamp_name_container_for_wc').hide();
                    $('#seal_and_stamp_name_image_for_wc').attr('src', '');
                    $('#seal_and_stamp_container_for_wc').show();
                    $('#seal_and_stamp_for_wc').val('');
                }

            }
        });
    },
    generateForm1: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#wc_id_for_wc_form1').val(wcId);
        $('#wc_form1_pdf_form').submit();
        $('#wc_id_for_wc_form1').val('');
    },
    openUploadChallan: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + wcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wc/get_wc_data_by_wc_id',
            type: 'post',
            data: $.extend({}, {'wc_id': wcId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var wcData = parseData.wc_data;
                showPopup();
                if (wcData.payment_type == VALUE_ONE) {
                    wcData.utitle = 'Challan Copy';
                } else {
                    wcData.utitle = 'Payment Details';
                }
                wcData.module_type = VALUE_FIVE;
                $('#popup_container').html(wcUploadChallanTemplate(wcData));
                loadFB(VALUE_FIVE, parseData.fb_data, wcData.payment_type, wcData.show_remove_upload_btn, wcData.show_dropdown, wcData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'wc_upload_challan', wcData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'wc_upload_challan', 'uc', 'radio', '#fb', VALUE_FIVE);
                if (wcData.challan != '') {
                    $('#challan_container_for_wc_upload_challan').hide();
                    $('#challan_name_container_for_wc_upload_challan').show();
                    $('#challan_name_href_for_wc_upload_challan').attr('href', 'documents/wc/' + wcData.challan);
                    $('#challan_name_for_wc_upload_challan').html(wcData.challan);
                    $('#challan_remove_btn_for_wc_upload_challan').attr('onclick', 'WC.listview.removeChallan("' + wcData.wc_id + '")');
                }
            }
        });
    },
    removeChallan: function (wcId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wc/remove_challan',
            data: $.extend({}, {'wc_id': wcId}, getTokenData()),
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
                validationMessageShow('wc-uc', textStatus.statusText);
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
                    validationMessageShow('wc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-wc-uc').html(parseData.message);
                removeDocument('challan', 'wc_upload_challan');
                $('#status_' + wcId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-wc-uc').html('');
        validationMessageHide();
        var wcId = $('#wc_id_for_wc_upload_challan').val();
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_wc_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_wc_upload_challan_1').focus();
            validationMessageShow('wc-uc-payment_type_for_wc_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_wc_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_wc_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_wc_upload_challan').focus();
                validationMessageShow('wc-uc-challan_for_wc_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_wc_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_wc_upload_challan').focus();
                validationMessageShow('wc-uc-challan_for_wc_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FIVE, 'wc-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_wc_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#wc_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'wc/upload_challan',
            data: formData,
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
                validationMessageShow('wc-uc', textStatus.statusText);
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
                    validationMessageShow('wc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + wcId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + wcId).show();
                }
                $('#total_fees_' + wcId).html(returnFees(parseData));
                showSuccess(parseData.message);
//                that.loadWCData();
            }
        });
    },
    askForApproveApplication: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_wc_' + wcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wc/get_wc_data_by_wc_id',
            type: 'post',
            data: $.extend({}, {'wc_id': wcId}, getTokenData()),
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
                var wcData = parseData.wc_data;
                showPopup();
                $('#popup_container').html(wcApproveTemplate(wcData));
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
        var formData = $('#approve_wc_form').serializeFormJSON();
        if (!formData.wc_id_for_wc_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_wc_approve) {
            $('#registration_number_for_wc_approve').focus();
            validationMessageShow('wc-approve-registration_number_for_wc_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_wc_approve) {
            $('#valid_upto_for_wc_approve').focus();
            validationMessageShow('wc-approve-valid_upto_for_wc_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_wc_approve) {
            $('#remarks_for_wc_approve').focus();
            validationMessageShow('wc-approve-remarks_for_wc_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wc/approve_application',
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
                validationMessageShow('wc-approve', textStatus.statusText);
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
                    validationMessageShow('wc-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.wc_id_for_wc_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.wc_id_for_wc_approve).remove();
                $('#approve_btn_for_app_' + formData.wc_id_for_wc_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.wc_id_for_wc_approve).show();
                $('#so_status_' + formData.wc_id_for_wc_approve).html(dateTimeDays(formData.wc_id_for_wc_approve, parseData, VALUE_FIVE));
            }
        });
    },
    askForRejectApplication: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_wc_' + wcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wc/get_wc_data_by_wc_id',
            type: 'post',
            data: $.extend({}, {'wc_id': wcId}, getTokenData()),
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
                var wcData = parseData.wc_data;
                showPopup();
                $('#popup_container').html(wcRejectTemplate(wcData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_wc_form').serializeFormJSON();
        if (!formData.wc_id_for_wc_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_wc_reject) {
            $('#remarks_for_wc_reject').focus();
            validationMessageShow('wc-reject-remarks_for_wc_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wc/reject_application',
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
                validationMessageShow('wc-reject', textStatus.statusText);
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
                    validationMessageShow('wc-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.wc_id_for_wc_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.wc_id_for_wc_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.wc_id_for_wc_reject).remove();
                $('#reject_btn_for_app_' + formData.wc_id_for_wc_reject).remove();
                $('#approve_btn_for_app_' + formData.wc_id_for_wc_reject).remove();
                $('#so_status_' + formData.wc_id_for_wc_reject).html(dateTimeDays(formData.wc_id_for_wc_reject, parseData, VALUE_FIVE));
            }
        });
    },
    generateCertificate: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#wc_id_for_certificate').val(wcId);
        $('#wc_certificate_pdf_form').submit();
        $('#wc_id_for_certificate').val('');
    },
    getQueryData: function (wcId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!wcId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FIVE;
        templateData.module_id = wcId;
        var btnObj = $('#query_btn_for_wc_' + wcId);
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
                tmpData.application_number = regNoRenderer(VALUE_FIVE, moduleData.wc_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FIVE;
                tmpData.module_id = wcId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (wcId) {
        if (!wcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + wcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wc/get_wc_data_by_wc_id',
            type: 'post',
            data: $.extend({}, {'wc_id': wcId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var wcData = parseData.wc_data;
                showPopup();
                if (wcData.payment_type == VALUE_ONE || wcData.payment_type == VALUE_THREE) {
                    wcData.user_payment_type_text = paymentTypeArray[wcData.payment_type];
                } else {
                    wcData.user_payment_type_text = userPaymentTypeArray[wcData.user_payment_type] ? userPaymentTypeArray[wcData.user_payment_type] : '';
                }
                if (wcData.payment_type == VALUE_ONE) {
                    wcData.utitle = 'Fees Paid Challan Copy';
                } else if (wcData.payment_type == VALUE_TWO && wcData.user_payment_type == VALUE_ONE) {
                    wcData.utitle = 'Demand Draft (DD) Copy';
                }
                wcData.module_type = VALUE_FIVE;
                $('#popup_container').html(wcViewPaymentTemplate(wcData));
                loadFB(VALUE_FIVE, parseData.fb_data, wcData.payment_type);
                loadPH(VALUE_FIVE, wcData.wc_id, parseData.ph_data);
                if (wcData.payment_type == VALUE_ONE || (wcData.payment_type == VALUE_TWO && wcData.user_payment_type == VALUE_ONE)) {
                    if (wcData.fees_paid_challan != '') {
                        $('#vp_container_for_wc').show();
                        $('#fees_paid_challan_name_href_for_wc').attr('href', WC_DOC_PATH + wcData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_wc').html(wcData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
