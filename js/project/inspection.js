var inspectionListTemplate = Handlebars.compile($('#inspection_list_template').html());
var inspectionTableTemplate = Handlebars.compile($('#inspection_table_template').html());
var inspectionActionTemplate = Handlebars.compile($('#inspection_action_template').html());
var inspectionFormTemplate = Handlebars.compile($('#inspection_form_template').html());
var inspectionViewTemplate = Handlebars.compile($('#inspection_view_template').html());
var inspectionApproveTemplate = Handlebars.compile($('#inspection_approve_template').html());
var inspectionRejectTemplate = Handlebars.compile($('#inspection_reject_template').html());
var tempPersonCnt = 1;
var Inspection = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Inspection.Router = Backbone.Router.extend({
    routes: {
        'inspection': 'renderList',
        'inspection_form': 'renderList',
        'edit_inspection_form': 'renderList',
        'view_inspection_form': 'renderList',
    },
    renderList: function () {
        Inspection.listview.listPage();
    },
    renderListForForm: function () {
        Inspection.listview.listPageInspectionForm();
    }
});
Inspection.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('inspection', 'active');
        Inspection.router.navigate('inspection');
        var templateData = {};
        this.$el.html(inspectionListTemplate(templateData));
        this.loadInspectionData(sDistrict, sStatus, sAppTimingStatus);


    },
    listPageInspectionForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        ddClass('inspection', 'active');
        this.$el.html(inspectionListTemplate);
        this.newInspectionForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return inspectionActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }

        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_approve_btn = '';
        } else {
            rowData.show_approve_btn = 'display: none;';
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_reject_btn = '';
        } else {
            rowData.show_reject_btn = 'display: none;';
        }
        rowData.module_type = VALUE_TWENTYSEVEN;
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return inspectionActionTemplate(rowData);
    },
    loadInspectionData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
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
            return getAppNoWithRating(VALUE_TWENTYSEVEN, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYSEVEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['inspection_data'], function (index, objData) {
                json['inspection_data'][index]['query_movement_string'] = qmData[objData.inspection_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.inspection_id] + '</table>') : '-';
            });
            return json['inspection_data'];
        };
        var that = this;
        showTableContainer('inspection');
        Inspection.router.navigate('inspection');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Inspection.listview.loadInspectionData();');
        $('#inspection_datatable_container').html(inspectionTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_inspection_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_inspection_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_inspection_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_inspection_list', false);
        allowOnlyIntegerValue('mobile_number_for_inspection_list')
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_inspection_list', false);
        $('#district_for_inspection_list').val(searchData.search_district);
        $('#status_for_inspection_list').val(searchData.search_status);
        $('#app_timing_for_inspection_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_inspection_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_inspection_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_inspection_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_inspection_list').attr('disabled', 'disabled');
        }
        inspectionDataTable = $('#inspection_datatable').DataTable({
            ajax: {url: 'inspection/get_inspection_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'inspection_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'inspection_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'inspection_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'inspection_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  }
        $('#inspection_datatable_filter').remove();
        $('#inspection_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = inspectionDataTable.row(tr);

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
    newInspectionForm: function (isEdit, parseData) {
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
            var formData = parseData.inspection_data;
            Inspection.router.navigate('edit_inspection_form');
        } else {
            var formData = {};
            Inspection.router.navigate('inspection_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.inspection_data = parseData.inspection_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.inspection_data.application_date);
            templateData.valid_upto_date = dateTo_DD_MM_YYYY(formData.valid_upto_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }

        showFormContainer('inspection');
        $('#inspection_form_container').html(inspectionFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            if (formData.annexure_9 != '') {
                $('#annexure_9_container_for_inspection').hide();
                $('#annexure_9_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.annexure_9);
                $('#annexure_9_name_container_for_inspection').show();
                $('#annexure_9_name_image_for_inspection_download').attr("href", INSPECTION_DOC_PATH + formData.annexure_9);
            }
            if (formData.approved_license != '') {
                $('#approved_license_container_for_inspection').hide();
                $('#approved_license_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.approved_license);
                $('#approved_license_name_container_for_inspection').show();
                $('#approved_license_name_image_for_inspection_download').attr("href", INSPECTION_DOC_PATH + formData.approved_license);
            }

            if (formData.signature_architecture != '') {
                $('#signature_architecture_container_for_inspection').hide();
                $('#signature_architecture_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.signature_architecture);
                $('#signature_architecture_name_container_for_inspection').show();
                $('#seal_and_stamp_download').attr("href", INSPECTION_DOC_PATH + formData.signature_architecture);
            }

            if (formData.sign_seal != '') {
                $('#sign_seal_container_for_inspection').hide();
                $('#sign_seal_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.sign_seal);
                $('#sign_seal_name_container_for_inspection').show();
                $('#sign_seal_download').attr("href", INSPECTION_DOC_PATH + formData.sign_seal);
            }

        }
        generateSelect2();
        datePicker();
        $('#inspection_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitInspection($('#submit_btn_for_inspection'));
            }
        });
    },
    editOrViewInspection: function (btnObj, inspectionId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!inspectionId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'inspection/get_inspection_data_by_id',
            type: 'post',
            data: $.extend({}, {'inspection_id': inspectionId}, getTokenData()),
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
                    that.newInspectionForm(isEdit, parseData);
                } else {
                    that.viewInspectionForm(parseData);
                }
            }
        });
    },
    viewInspectionForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.inspection_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        Inspection.router.navigate('view_inspection_form');
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        showFormContainer('inspection');
        $('#inspection_form_container').html(inspectionViewTemplate(formData));

        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        if (formData.annexure_9 != '') {
            $('#annexure_9_container_for_inspection').hide();
            $('#annexure_9_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.annexure_9);
            $('#annexure_9_name_container_for_inspection').show();
            $('#annexure_9_name_image_for_inspection_download').attr("href", INSPECTION_DOC_PATH + formData.annexure_9);
        }
        if (formData.approved_license != '') {
            $('#approved_license_container_for_inspection').hide();
            $('#approved_license_name_image_for_inspection').attr('src', INSPECTION_DOC_PATH + formData.approved_license);
            $('#approved_license_name_container_for_inspection').show();
            $('#approved_license_name_image_for_inspection_download').attr("href", INSPECTION_DOC_PATH + formData.approved_license);
        }

        if (formData.signature_architecture != '') {
            $('#signature_architecture_container_for_inspection_view').hide();
            $('#signature_architecture_name_image_for_inspection_view').attr('src', INSPECTION_DOC_PATH + formData.signature_architecture);
            $('#signature_architecture_name_container_for_inspection_view').show();
            $('#seal_and_stamp_download').attr("href", INSPECTION_DOC_PATH + formData.signature_architecture);
        }
        if (formData.sign_seal != '') {
            $('#sign_seal_container_for_inspection_view').hide();
            $('#sign_seal_name_image_for_inspection_view').attr('src', INSPECTION_DOC_PATH + formData.sign_seal);
            $('#sign_seal_name_container_for_inspection_view').show();
            $('#sign_seal_download').attr("href", INSPECTION_DOC_PATH + formData.sign_seal);
        }

        // var proprietorInfo = JSON.parse(formData.proprietor_details);
        // $.each(proprietorInfo, function (key, value) {
        //     that.addMultipleProprietor(value);
        // })
    },
    checkValidationForInspection: function (inspectionData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!inspectionData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!inspectionData.communication_number) {
            return getBasicMessageAndFieldJSONArray('communication_number', CommunicationValidationMessage);
        }
        if (!inspectionData.name_licensed) {
            return getBasicMessageAndFieldJSONArray('name_licensed', LicensedNameValidationMessage);
        }
        if (!inspectionData.address) {
            return getBasicMessageAndFieldJSONArray('address', FullAddressValidationMessage);
        }
        if (!inspectionData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!inspectionData.application_date) {
            return getBasicMessageAndFieldJSONArray('application_date', appDateValidationMessage);
        }
        if (!inspectionData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }

        return '';
    },
    askForSubmitInspection: function (moduleType) {
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
        var yesEvent = 'Inspection.listview.submitInspection(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitInspection: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var inspectionData = $('#inspection_form').serializeFormJSON();
        var validationData = that.checkValidationForInspection(inspectionData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('inspection-' + validationData.field, validationData.message);
            return false;
        }
        if ($('#signature_architecture_container_for_inspection').is(':visible')) {
            var SignatureAndArchitecture = $('#signature_architecture_for_inspection').val();
            if (SignatureAndArchitecture == '') {
                $('#signature_architecture_for_inspection').focus();
                validationMessageShow('inspection-signature_architecture_for_inspection', uploadDocumentValidationMessage);
                return false;
            }
            var SignatureAndArchitectureMessage = imagefileUploadValidation('signature_architecture_for_inspection');
            if (SignatureAndArchitectureMessage != '') {
                $('#signature_architecture_for_inspection').focus();
                validationMessageShow('inspection-signature_architecture_for_inspection', SignatureAndArchitectureMessage);
                return false;
            }
        }
        if ($('#sign_seal_container_for_inspection').is(':visible')) {
            var SealAndStamp = $('#sign_seal_for_inspection').val();
            if (SealAndStamp == '') {
                $('#sign_seal_for_inspection').focus();
                validationMessageShow('inspection-sign_seal_for_inspection', uploadDocumentValidationMessage);
                return false;
            }
            var SealAndStampMessage = imagefileUploadValidation('sign_seal_for_inspection');
            if (SealAndStampMessage != '') {
                $('#sign_seal_for_inspection').focus();
                validationMessageShow('inspection-sign_seal_for_inspection', SealAndStampMessage);
                return false;
            }
        }
        if ($('#annexure_9_container_for_inspection').is(':visible')) {
            var annexure_9Document = $('#annexure_9_for_inspection').val();
            if (annexure_9Document == '') {
                $('#annexure_9_for_inspection').focus();
                validationMessageShow('inspection-annexure_9_for_inspection', uploadDocumentValidationMessage);
                return false;
            }
            var annexure_9DocumentMessage = pdffileUploadValidation('annexure_9_for_inspection');
            if (annexure_9DocumentMessage != '') {
                $('#annexure_9_for_inspection').focus();
                validationMessageShow('inspection-annexure_9_for_inspection', annexure_9DocumentMessage);
                return false;
            }
        }
        if ($('#approved_license_container_for_inspection').is(':visible')) {
            var approved_licenseDocument = $('#approved_license_for_inspection').val();
            if (approved_licenseDocument == '') {
                $('#approved_license_for_inspection').focus();
                validationMessageShow('inspection-approved_license_for_inspection', uploadDocumentValidationMessage);
                return false;
            }
            var approved_licenseDocumentMessage = pdffileUploadValidation('approved_license_for_inspection');
            if (approved_licenseDocumentMessage != '') {
                $('#approved_license_for_inspection').focus();
                validationMessageShow('inspection-approved_license_for_inspection', approved_licenseDocumentMessage);
                return false;
            }
        }



        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_inspection') : $('#submit_btn_for_inspection');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var inspectionData = new FormData($('#inspection_form')[0]);
        inspectionData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //inspectionData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        inspectionData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'inspection/submit_inspection',
            data: inspectionData,
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
                validationMessageShow('inspection', textStatus.statusText);
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
                    validationMessageShow('inspection', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Inspection.router.navigate('inspection', {'trigger': true});
            }
        });
    },

    askForRemove: function (inspectionId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Inspection.listview.removeDocument(\'' + inspectionId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (inspectionId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'inspection/remove_document',
            data: $.extend({}, {'inspection_id': inspectionId}, getTokenData()),
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
                validationMessageShow('inspection', textStatus.statusText);
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
                    validationMessageShow('inspection', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                removeDocument(docId, 'inspection');
            }
        });
    },
    generateForm1: function (inspectionId) {
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#inspection_id_for_inspection_form1').val(inspectionId);
        $('#inspection_form1_pdf_form').submit();
        $('#inspection_id_for_inspection_form1').val('');
    },

    askForApproveApplication: function (inspectionId) {
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + inspectionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'inspection/get_inspection_data_by_inspection_id',
            type: 'post',
            data: $.extend({}, {'inspection_id': inspectionId}, getTokenData()),
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
                var inspectionData = parseData.inspection_data;
                showPopup();
                $('#popup_container').html(inspectionApproveTemplate(inspectionData));
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
        var formData = $('#approve_inspection_form').serializeFormJSON();
        if (!formData.inspection_id_for_inspection_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_inspection_approve', 10240);
        if (certficateMessage != '') {
            $('#certificate_file_for_inspection_approve').focus();
            validationMessageShow('inspection-approve-certificate_file_for_inspection_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_inspection_approve) {
            $('#remarks_for_inspection_approve').focus();
            validationMessageShow('inspection-approve-remarks_for_inspection_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_inspection_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_inspection_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'inspection/approve_application',
            data: newFormData,
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
                validationMessageShow('inspection-approve', textStatus.statusText);
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
                    btnObj.html(ogBtnHTML);
                    btnObj.attr('onclick', ogBtnOnclick);
                    validationMessageShow('inspection-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.inspection_id_for_inspection_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.inspection_id_for_inspection_approve).remove();
                $('#approve_btn_for_app_' + formData.inspection_id_for_inspection_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.inspection_id_for_inspection_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.inspection_id_for_inspection_approve).show();
                $('#so_status_' + formData.inspection_id_for_inspection_approve).html(dateTimeDays(formData.inspection_id_for_inspection_approve, parseData, VALUE_TWENTYSEVEN));
            }
        });
    },
    askForRejectApplication: function (inspectionId) {
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_inspection_' + inspectionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'inspection/get_inspection_data_by_inspection_id',
            type: 'post',
            data: $.extend({}, {'inspection_id': inspectionId}, getTokenData()),
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
                var inspectionData = parseData.inspection_data;
                showPopup();
                $('#popup_container').html(inspectionRejectTemplate(inspectionData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_inspection_form').serializeFormJSON();
        if (!formData.inspection_id_for_inspection_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_inspection_reject) {
            $('#remarks_for_inspection_reject').focus();
            validationMessageShow('inspection-reject-remarks_for_inspection_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'inspection/reject_application',
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
                validationMessageShow('inspection-reject', textStatus.statusText);
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
                    validationMessageShow('inspection-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.inspection_id_for_inspection_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.inspection_id_for_inspection_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.inspection_id_for_inspection_reject).remove();
                $('#reject_btn_for_app_' + formData.inspection_id_for_inspection_reject).remove();
                $('#approve_btn_for_app_' + formData.inspection_id_for_inspection_reject).remove();
                $('#so_status_' + formData.inspection_id_for_inspection_reject).html(dateTimeDays(formData.inspection_id_for_inspection_reject, parseData, VALUE_TWENTYSEVEN));
            }
        });
    },
    generateCertificate: function (inspectionId) {
        if (!inspectionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#inspection_id_for_certificate').val(inspectionId);
        $('#inspection_certificate_pdf_form').submit();
        $('#inspection_id_for_certificate').val('');
    },
    getQueryData: function (inspectionId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!inspectionId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYSEVEN;
        templateData.module_id = inspectionId;
        var btnObj = $('#query_btn_for_inspection_' + inspectionId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYSEVEN, moduleData.inspection_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_TWENTYSEVEN;
                tmpData.module_id = inspectionId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
});
