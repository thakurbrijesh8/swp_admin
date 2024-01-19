var vcListTemplate = Handlebars.compile($('#vc_list_template').html());
var vcTableTemplate = Handlebars.compile($('#vc_table_template').html());
var vcActionTemplate = Handlebars.compile($('#vc_action_template').html());
var vcFormTemplate = Handlebars.compile($('#vc_form_template').html());
var vcViewTemplate = Handlebars.compile($('#vc_view_template').html());
var vcUploadChallanTemplate = Handlebars.compile($('#vc_upload_challan_template').html());
var vcApproveTemplate = Handlebars.compile($('#vc_approve_template').html());
var vcRejectTemplate = Handlebars.compile($('#vc_reject_template').html());
var vcViewPaymentTemplate = Handlebars.compile($('#vc_view_payment_template').html());
var tempPersonCnt = 1;

var VC = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
VC.Router = Backbone.Router.extend({
    routes: {
        'vc': 'renderList',
        'vc_form': 'renderListForForm',
        'edit_vc_form': 'renderList',
        'view_vc_form': 'renderList',
    },
    renderList: function () {
        VC.listview.listPage();
    },
    renderListForForm: function () {
        VC.listview.listPageVCForm();
    }
});
VC.listView = Backbone.View.extend({
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
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('vc', 'active');
        VC.router.navigate('vc');
        var templateData = {};
        this.$el.html(vcListTemplate(templateData));
        this.loadVCData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageVCForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        this.$el.html(vcListTemplate);
        this.newVCForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return vcActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_SIX) {
            rowData.show_upload_challan_btn = true;
        }
        rowData.status = parseInt(rowData.status);
        if (rowData.status == VALUE_FOUR || rowData.status == VALUE_FIVE || rowData.status == VALUE_SEVEN || rowData.status == VALUE_EIGHT) {
            rowData.show_download_fees_paid_challan_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
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
        rowData.module_type = VALUE_FOURTYEIGHT;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return vcActionTemplate(rowData);
    },
    loadVCData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTYEIGHT, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYEIGHT);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['vc_data'], function (index, objData) {
                json['vc_data'][index]['query_movement_string'] = qmData[objData.vc_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.vc_id] + '</table>') : '-';
            });
            return json['vc_data'];
        };
        var that = this;
        showTableContainer('vc');
        VC.router.navigate('vc');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'VC.listview.loadVCData();');
        $('#vc_datatable_container').html(vcTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_vc_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_vc_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_vc_list', false);
        allowOnlyIntegerValue('mobile_number_for_vc_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_vc_list', false);
        $('#district_for_vc_list').val(searchData.search_district);
        $('#status_for_vc_list').val(searchData.search_status);
        $('#app_timing_for_vc_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_vc_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_vc_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_vc_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_vc_list').attr('disabled', 'disabled');
        }
        vcDataTable = $('#vc_datatable').DataTable({
            ajax: {url: 'vc/get_vc_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'vc_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'vc_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'vc_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'vc_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#vc_datatable_filter').remove();
        $('#vc_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = vcDataTable.row(tr);

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
    newVCForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.vc_data;
            VC.router.navigate('edit_vc_form');
        } else {
            var formData = {};
            VC.router.navigate('vc_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.vc_data = parseData.vc_data;
        showFormContainer('vc');
        $('#vc_form_container').html(vcFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        renderOptionsForTwoDimensionalArray(tradeArray, 'trade');
        renderOptionsForTwoDimensionalArray(capacityTypeArray, 'capacity_type');
        renderOptionsForTwoDimensionalArray(classArray, 'class');
        renderOptionsForTwoDimensionalArray(verificationPlaceArray, 'verification_at');
        renderOptionsForTwoDimensionalArray(quantityUnitsArray, 'quantity_units');
        if (isEdit) {
            $('#application_category').val(formData.application_category);
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#trade').val(formData.trade);
            $('#capacity_type').val(formData.capacity_type);
            $('#class').val(formData.class);
            $('#verification_at').val(formData.verification_at);
            $('#quantity_units').val(formData.quantity_units);

            if (formData.invoice_doc != '') {
                that.showDocument('invoice_doc_container', 'invoice_doc_name_image', 'invoice_doc_name_container',
                        'invoice_doc_download', 'invoice_doc_remove_btn', formData.invoice_doc, formData.vc_id, VALUE_ONE);
            }
        }
        generateSelect2();
        datePicker();
        $('#vc_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitVC($('#submit_btn_for_vc'));
            }
        });
    },
    editOrViewVC: function (btnObj, vcId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!vcId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vc/get_vc_data_by_id',
            type: 'post',
            data: $.extend({}, {'vc_id': vcId}, getTokenData()),
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
                    that.newVCForm(isEdit, parseData);
                } else {
                    that.viewVCForm(parseData);
                }
            }
        });
    },
    viewVCForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.vc_data;
        VC.router.navigate('view_vc_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('vc');
        $('#vc_form_container').html(vcViewTemplate(formData));
        $('#vc_form_and_datatable_container').html(vcViewTemplate(formData));
        $('input[type=text]').attr('disabled', 'disabled');
        $('.hideView').prop('disabled', true);

        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        renderOptionsForTwoDimensionalArray(tradeArray, 'trade');
        renderOptionsForTwoDimensionalArray(capacityTypeArray, 'capacity_type');
        renderOptionsForTwoDimensionalArray(classArray, 'class');
        renderOptionsForTwoDimensionalArray(verificationPlaceArray, 'verification_at');
        renderOptionsForTwoDimensionalArray(quantityUnitsArray, 'quantity_units');

        $('#application_category').val(formData.application_category);
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#trade').val(formData.trade);
        $('#capacity_type').val(formData.capacity_type);
        $('#class').val(formData.class);
        $('#verification_at').val(formData.verification_at);
        $('#quantity_units').val(formData.quantity_units);

        if (formData.invoice_doc != '') {
            that.showDocument('invoice_doc_container', 'invoice_doc_name_image', 'invoice_doc_name_container',
                    'invoice_doc_download', 'invoice_doc_remove_btn', formData.invoice_doc, formData.vc_id, VALUE_ONE);
        }
    },
    checkValidationForVC: function (vcData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!vcData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!vcData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!vcData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!vcData.address) {
            return getBasicMessageAndFieldJSONArray('address', addressValidationMessage);
        }
        if (!vcData.trade) {
            return getBasicMessageAndFieldJSONArray('trade', selectOneOptionValidationMessage);
        }
//        if (!vcData.type) {
//            return getBasicMessageAndFieldJSONArray('type', selectOneOptionValidationMessage);
//        }
//        if (!vcData.sub_type) {
//            return getBasicMessageAndFieldJSONArray('sub_type', selectOneOptionValidationMessage);
//        }
        if (!vcData.capacity) {
            return getBasicMessageAndFieldJSONArray('capacity', capacityValidationMessage);
        }
        if (!vcData.capacity_type) {
            return getBasicMessageAndFieldJSONArray('capacity_type', selectOneOptionValidationMessage);
        }
        if (!vcData.class) {
            return getBasicMessageAndFieldJSONArray('class', selectOneOptionValidationMessage);
        }
        if (!vcData.make) {
            return getBasicMessageAndFieldJSONArray('make', makeValidationMessage);
        }
        if (!vcData.model_no) {
            return getBasicMessageAndFieldJSONArray('model_no', modelNoValidationMessage);
        }
        if (!vcData.serial_no) {
            return getBasicMessageAndFieldJSONArray('serial_no', serialNoValidationMessage);
        }
        if (!vcData.verification_at) {
            return getBasicMessageAndFieldJSONArray('verification_at', selectOneOptionValidationMessage);
        }
        if (!vcData.quantity_units) {
            return getBasicMessageAndFieldJSONArray('quantity_units', selectOneOptionValidationMessage);
        }

        return '';
    },
    askForSubmitVC: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'VC.listview.submitVC(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitVC: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var vcData = $('#vc_form').serializeFormJSON();
        var validationData = that.checkValidationForVC(vcData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('vc-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#seal_and_stamp_container_for_vc').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_vc').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_vc').focus();
                validationMessageShow('vc-seal_and_stamp_for_vc', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_vc');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_vc').focus();
                validationMessageShow('vc-seal_and_stamp_for_vc', sealAndStampMessage);
                return false;
            }
        }

        if ($('#support_document_container_for_vc').is(':visible')) {
            var supportDocument = $('#support_document_for_vc').val();
            if (supportDocument == '') {
                $('#support_document_for_vc').focus();
                validationMessageShow('vc-support_document_for_vc', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = fileUploadValidation('support_document_for_vc');
            if (supportDocumentMessage != '') {
                $('#support_document_for_vc').focus();
                validationMessageShow('vc-support_document_for_vc', sealAndStampMessage);
                return false;
            }
        }

        if (!$('#declaration_for_vc').is(':checked')) {
            $('#declaration_for_vc').focus();
            validationMessageShow('vc-declaration_for_vc', declarationOneValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_vc') : $('#submit_btn_for_vc');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var vcData = new FormData($('#vc_form')[0]);
        vcData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        vcData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'vc/submit_vc',
            data: vcData,
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
                validationMessageShow('vc', textStatus.statusText);
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
                    validationMessageShow('vc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                VC.router.navigate('vc', {'trigger': true});
            }
        });
    },

    askForRemove: function (vcId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'VC.listview.removeDocument(\'' + vcId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (vcId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'vc/remove_document',
            data: $.extend({}, {'vc_id': vcId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('vc', textStatus.statusText);
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
                    validationMessageShow('vc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == 1) {
                    $('#support_document_name_container_for_vc').hide();
                    $('#support_document_name_image_for_vc').attr('src', '');
                    $('#support_document_container_for_vc').show();
                    $('#support_document_for_vc').val('');
                }
                if (docType == 2) {
                    $('#seal_and_stamp_name_container_for_vc').hide();
                    $('#seal_and_stamp_name_image_for_vc').attr('src', '');
                    $('#seal_and_stamp_container_for_vc').show();
                    $('#seal_and_stamp_for_vc').val('');
                }

            }
        });
    },
    generateForm1: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#vc_id_for_vc_form1').val(vcId);
        $('#vc_form1_pdf_form').submit();
        $('#vc_id_for_vc_form1').val('');
    },
    openUploadChallan: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + vcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vc/get_vc_data_by_vc_id',
            type: 'post',
            data: $.extend({}, {'vc_id': vcId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var vcData = parseData.vc_data;
                showPopup();
                if (vcData.payment_type == VALUE_ONE) {
                    vcData.utitle = 'Challan Copy';
                } else {
                    vcData.utitle = 'Payment Details';
                }
                vcData.module_type = VALUE_FOURTYEIGHT;
                $('#popup_container').html(vcUploadChallanTemplate(vcData));
                loadFB(VALUE_FOURTYEIGHT, parseData.fb_data, vcData.payment_type, vcData.show_remove_upload_btn, vcData.show_dropdown, vcData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'vc_upload_challan', vcData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'vc_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYEIGHT);
                if (vcData.challan != '') {
                    $('#challan_container_for_vc_upload_challan').hide();
                    $('#challan_name_container_for_vc_upload_challan').show();
                    $('#challan_name_href_for_vc_upload_challan').attr('href', 'documents/vc/' + vcData.challan);
                    $('#challan_name_for_vc_upload_challan').html(vcData.challan);
                    $('#challan_remove_btn_for_vc_upload_challan').attr('onclick', 'VC.listview.removeChallan("' + vcData.vc_id + '")');
                }
            }
        });
    },
    removeChallan: function (vcId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'vc/remove_challan',
            data: $.extend({}, {'vc_id': vcId}, getTokenData()),
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
                validationMessageShow('vc-uc', textStatus.statusText);
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
                    validationMessageShow('vc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-vc-uc').html(parseData.message);
                removeDocument('challan', 'vc_upload_challan');
                $('#status_' + vcId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-vc-uc').html('');
        validationMessageHide();
        var vcId = $('#vc_id_for_vc_upload_challan').val();
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_vc_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_vc_upload_challan_1').focus();
            validationMessageShow('vc-uc-payment_type_for_vc_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_vc_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_vc_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_vc_upload_challan').focus();
                validationMessageShow('vc-uc-challan_for_vc_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_vc_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_vc_upload_challan').focus();
                validationMessageShow('vc-uc-challan_for_vc_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYEIGHT, 'vc-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_vc_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#vc_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'vc/upload_challan',
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
                validationMessageShow('vc-uc', textStatus.statusText);
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
                    validationMessageShow('vc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + vcId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + vcId).show();
                }
                $('#total_fees_' + vcId).html(returnFees(parseData));
                showSuccess(parseData.message);
//                that.loadVCData();
            }
        });
    },
    askForApproveApplication: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_vc_' + vcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vc/get_vc_data_by_vc_id',
            type: 'post',
            data: $.extend({}, {'vc_id': vcId}, getTokenData()),
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
                var vcData = parseData.vc_data;
                showPopup();
                $('#popup_container').html(vcApproveTemplate(vcData));
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
        var formData = $('#approve_vc_form').serializeFormJSON();
        if (!formData.vc_id_for_vc_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_vc_approve) {
            $('#registration_number_for_vc_approve').focus();
            validationMessageShow('vc-approve-registration_number_for_vc_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_vc_approve) {
            $('#valid_upto_for_vc_approve').focus();
            validationMessageShow('vc-approve-valid_upto_for_vc_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_vc_approve) {
            $('#remarks_for_vc_approve').focus();
            validationMessageShow('vc-approve-remarks_for_vc_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'vc/approve_application',
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
                validationMessageShow('vc-approve', textStatus.statusText);
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
                    validationMessageShow('vc-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.vc_id_for_vc_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.vc_id_for_vc_approve).remove();
                $('#approve_btn_for_app_' + formData.vc_id_for_vc_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.vc_id_for_vc_approve).show();
                $('#so_status_' + formData.vc_id_for_vc_approve).html(dateTimeDays(formData.vc_id_for_vc_approve, parseData, VALUE_FOURTYEIGHT));
            }
        });
    },
    askForRejectApplication: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_vc_' + vcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vc/get_vc_data_by_vc_id',
            type: 'post',
            data: $.extend({}, {'vc_id': vcId}, getTokenData()),
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
                var vcData = parseData.vc_data;
                showPopup();
                $('#popup_container').html(vcRejectTemplate(vcData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_vc_form').serializeFormJSON();
        if (!formData.vc_id_for_vc_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_vc_reject) {
            $('#remarks_for_vc_reject').focus();
            validationMessageShow('vc-reject-remarks_for_vc_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'vc/reject_application',
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
                validationMessageShow('vc-reject', textStatus.statusText);
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
                    validationMessageShow('vc-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.vc_id_for_vc_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.vc_id_for_vc_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.vc_id_for_vc_reject).remove();
                $('#reject_btn_for_app_' + formData.vc_id_for_vc_reject).remove();
                $('#approve_btn_for_app_' + formData.vc_id_for_vc_reject).remove();
                $('#so_status_' + formData.vc_id_for_vc_reject).html(dateTimeDays(formData.vc_id_for_vc_reject, parseData, VALUE_FOURTYEIGHT));
            }
        });
    },
    generateCertificate: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#vc_id_for_certificate').val(vcId);
        $('#vc_certificate_pdf_form').submit();
        $('#vc_id_for_certificate').val('');
    },
    getQueryData: function (vcId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!vcId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYEIGHT;
        templateData.module_id = vcId;
        var btnObj = $('#query_btn_for_vc_' + vcId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYEIGHT, moduleData.vc_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FOURTYEIGHT;
                tmpData.module_id = vcId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (vcId) {
        if (!vcId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + vcId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'vc/get_vc_data_by_vc_id',
            type: 'post',
            data: $.extend({}, {'vc_id': vcId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var vcData = parseData.vc_data;
                showPopup();
                if (vcData.payment_type == VALUE_ONE || vcData.payment_type == VALUE_THREE) {
                    vcData.user_payment_type_text = paymentTypeArray[vcData.payment_type];
                } else {
                    vcData.user_payment_type_text = userPaymentTypeArray[vcData.user_payment_type] ? userPaymentTypeArray[vcData.user_payment_type] : '';
                }
                if (vcData.payment_type == VALUE_ONE) {
                    vcData.utitle = 'Fees Paid Challan Copy';
                } else if (vcData.payment_type == VALUE_TWO && vcData.user_payment_type == VALUE_ONE) {
                    vcData.utitle = 'Demand Draft (DD) Copy';
                }
                vcData.module_type = VALUE_FOURTYEIGHT;
                $('#popup_container').html(vcViewPaymentTemplate(vcData));
                loadFB(VALUE_FOURTYEIGHT, parseData.fb_data, vcData.payment_type);
                loadPH(VALUE_FOURTYEIGHT, vcData.vc_id, parseData.ph_data);
                if (vcData.payment_type == VALUE_ONE || (vcData.payment_type == VALUE_TWO && vcData.user_payment_type == VALUE_ONE)) {
                    if (vcData.fees_paid_challan != '') {
                        $('#vp_container_for_vc').show();
                        $('#fees_paid_challan_name_href_for_vc').attr('href', VC_DOC_PATH + vcData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_vc').html(vcData.fees_paid_challan);
                    }
                }
            }
        });
    },
    showDocument: function (containerHideId, documentSrcPathId, containerShowId, documenthrefPathId, removeDocumentBtnId, dbDocumentFieldName, dbDocumentFieldId, VALUE) {
        $('#' + containerHideId).hide();
        $('#' + documentSrcPathId).attr('src', VC_DOC_PATH + dbDocumentFieldName);
        $('#' + containerShowId).show();
        $('#' + documenthrefPathId).attr("href", VC_DOC_PATH + dbDocumentFieldName);
        $('#' + removeDocumentBtnId).attr('onclick', 'VC.listview.askForRemove("' + dbDocumentFieldId + '","' + VALUE + '")');
    },
});
