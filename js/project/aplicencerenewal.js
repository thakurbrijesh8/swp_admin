var aplicenceRenewalListTemplate = Handlebars.compile($('#aplicence_renewal_list_template').html());
var aplicenceRenewalTableTemplate = Handlebars.compile($('#aplicence_renewal_table_template').html());
var aplicenceRenewalActionTemplate = Handlebars.compile($('#aplicence_renewal_action_template').html());
var aplicenceRenewalFormTemplate = Handlebars.compile($('#aplicence_renewal_form_template').html());
var aplicenceRenewalViewTemplate = Handlebars.compile($('#aplicence_renewal_view_template').html());
var aplicenceRenewalUploadChallanTemplate = Handlebars.compile($('#aplicence_renewal_upload_challan_template').html());
var aplicenceRenewalApproveTemplate = Handlebars.compile($('#aplicence_renewal_approve_template').html());
var aplicenceRenewalRejectTemplate = Handlebars.compile($('#aplicence_renewal_reject_template').html());
var aplicenceRenewalViewPaymentTemplate = Handlebars.compile($('#aplicence_renewal_view_payment_template').html());

var tempPersonCnt = 1;
var AplicenceRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
AplicenceRenewal.Router = Backbone.Router.extend({
    routes: {
        'aplicence_renewal': 'renderList',
        'aplicence_renewal_form': 'renderListForForm',
        'edit_aplicence_renewal_form': 'renderList',
        'view_aplicence_renewal_form': 'renderList',
    },
    renderList: function () {
        AplicenceRenewal.listview.listPage();
    },
    renderListForForm: function () {
        AplicenceRenewal.listview.listPageAplicenceRenewalForm();
    }
});
AplicenceRenewal.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="if_contractor_work_other_place"]': 'hasOtherWorkEvent',
    },
    hasOtherWorkEvent: function (event) {
        var val = $('input[name=if_contractor_work_other_place]:checked').val();
        if (val === '1') {
            this.$('.if_contractor_work_other_place_div').show();
        } else {
            this.$('.if_contractor_work_other_place_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_aplicence_renewal', 'active');
        AplicenceRenewal.router.navigate('aplicence_renewal');
        var templateData = {};
        this.$el.html(aplicenceRenewalListTemplate(templateData));
        this.loadAplicenceRenewalData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageAplicenceRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_aplicence_renewal', 'active');
        this.$el.html(aplicenceRenewalListTemplate);
        this.newAplicenceRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return aplicenceRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYSIX;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return aplicenceRenewalActionTemplate(rowData);
    },
    loadAplicenceRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.contractor_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.establi_name;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTYSIX, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYSIX);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['aplicence_renewal_data'], function (index, objData) {
                json['aplicence_renewal_data'][index]['query_movement_string'] = qmData[objData.aplicence_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.aplicence_renewal_id] + '</table>') : '-';
            });
            return json['aplicence_renewal_data'];
        };
        var that = this;
        AplicenceRenewal.router.navigate('aplicence_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'AplicenceRenewal.listview.loadAplicenceRenewalData();');
        $('#aplicence_renewal_form_and_datatable_container').html(aplicenceRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_aplicence_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_aplicence_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_aplicence_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_aplicence_renewal_list', false);
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_aplicence_renewal_list', false);
        $('#district_for_aplicence_renewal_list').val(searchData.search_district);
        $('#status_for_aplicence_renewal_list').val(searchData.search_status);
        $('#app_timing_for_aplicence_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_aplicence_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_aplicence_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_aplicence_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_aplicence_renewal_list').attr('disabled', 'disabled');
        }
        aplicenceRenewalDataTable = $('#aplicence_renewal_datatable').DataTable({
            ajax: {url: 'aplicence_renewal/get_aplicence_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'aplicence_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'aplicence_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'aplicence_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'aplicence_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#aplicence_renewal_datatable_filter').remove();
        $('#aplicence_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = aplicenceRenewalDataTable.row(tr);

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
    newAplicenceRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.aplicence_renewal_data;
            AplicenceRenewal.router.navigate('edit_aplicence_renewal_form');
        } else {
            var formData = {};
            AplicenceRenewal.router.navigate('aplicence_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.aplicence_renewal_data = parseData.aplicence_renewal_data;
        if (isEdit) {
            templateData.date_of_certificate = dateTo_DD_MM_YYYY(templateData.aplicence_renewal_data.date_of_certificate);
            templateData.expiry_date_of_prev_licence = dateTo_DD_MM_YYYY(templateData.aplicence_renewal_data.expiry_date_of_prev_licence);
        }
        $('#aplicence_renewal_form_and_datatable_container').html(aplicenceRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');

            if (formData.formvii_doc != '') {
                $('#formvii_doc_container_for_aplicence_renewal').hide();
                $('#formvii_doc_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.formvii_doc);
                $('#formvii_doc_name_container_for_aplicence_renewal').show();
                $('#formvii_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formvii_doc);
            }
            if (formData.challan_copy != '') {
                $('#challan_copy_container_for_aplicence_renewal').hide();
                $('#challan_copy_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.challan_copy);
                $('#challan_copy_name_container_for_aplicence_renewal').show();
                $('#challan_copy_name_download').attr("href", APLICENCE_DOC_PATH + formData.challan_copy);
            }
            if (formData.register_certification_doc != '') {
                $('#register_certification_doc_container_for_aplicence_renewal').hide();
                $('#register_certification_doc_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.register_certification_doc);
                $('#register_certification_doc_name_container_for_aplicence_renewal').show();
                $('#register_certification_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.register_certification_doc);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_aplicence_renewal').hide();
                $('#seal_and_stamp_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_aplicence_renewal').show();
                $('#seal_and_stamp_download').attr("href", APLICENCE_DOC_PATH + formData.signature);
            }
        }
        generateSelect2();
        datePicker();
        $('#aplicence_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitAplicenceRenewal($('#submit_btn_for_aplicence'));
            }
        });
    },
    editOrViewAplicenceRenewal: function (btnObj, aplicenceRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!aplicenceRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence_renewal/get_aplicence_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId}, getTokenData()),
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
                    that.newAplicenceRenewalForm(isEdit, parseData);
                } else {
                    that.viewAplicenceRenewalForm(parseData);
                }
            }
        });
    },
    viewAplicenceRenewalForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.aplicence_renewal_data;
        AplicenceRenewal.router.navigate('view_aplicence_renewal_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.date_of_certificate = dateTo_DD_MM_YYYY(formData.date_of_certificate);
        formData.expiry_date_of_prev_licence = dateTo_DD_MM_YYYY(formData.expiry_date_of_prev_licence);
        $('#aplicence_renewal_form_and_datatable_container').html(aplicenceRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');

        if (formData.formvii_doc != '') {
            $('#formvii_doc_container_for_aplicence_renewal').hide();
            $('#formvii_doc_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.formvii_doc);
            $('#formvii_doc_name_container_for_aplicence_renewal').show();
            $('#formvii_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formvii_doc);
        }
        if (formData.challan_copy != '') {
            $('#challan_copy_container_for_aplicence_renewal').hide();
            $('#challan_copy_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.challan_copy);
            $('#challan_copy_name_container_for_aplicence_renewal').show();
            $('#challan_copy_name_download').attr("href", APLICENCE_DOC_PATH + formData.challan_copy);
        }
        if (formData.register_certification_doc != '') {
            $('#register_certification_doc_container_for_aplicence_renewal').hide();
            $('#register_certification_doc_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.register_certification_doc);
            $('#register_certification_doc_name_container_for_aplicence_renewal').show();
            $('#register_certification_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.register_certification_doc);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_aplicence_renewal').hide();
            $('#seal_and_stamp_name_image_for_aplicence_renewal').attr('src', APLICENCE_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_aplicence_renewal').show();
            $('#seal_and_stamp_download').attr("href", APLICENCE_DOC_PATH + formData.signature);
        }
    },
    checkValidationForAplicenceRenewal: function (aplicenceRenewalData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!aplicenceRenewalData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', licenseNumberValidationMessage);
        }
        if (!aplicenceRenewalData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!aplicenceRenewalData.contractor_name) {
            return getBasicMessageAndFieldJSONArray('contractor_name', contractorNameValidationMessage);
        }
        if (!aplicenceRenewalData.contractor_address) {
            return getBasicMessageAndFieldJSONArray('contractor_address', contractorAddressValidationMessage);
        }
        if (!aplicenceRenewalData.contractor_contact) {
            return getBasicMessageAndFieldJSONArray('contractor_contact', contractorCcontactValidationMessage);
        }
        if (!aplicenceRenewalData.contractor_email) {
            return getBasicMessageAndFieldJSONArray('contractor_email', emailValidationMessage);
        }
        if (!aplicenceRenewalData.no_of_certificate) {
            return getBasicMessageAndFieldJSONArray('no_of_certificate', certificateNoValidationMessage);
        }
        if (!aplicenceRenewalData.date_of_certificate) {
            return getBasicMessageAndFieldJSONArray('date_of_certificate', certificateDateValidationMessage);
        }
        if (!aplicenceRenewalData.expiry_date_of_prev_licence) {
            return getBasicMessageAndFieldJSONArray('expiry_date_of_prev_licence', expiryDateValidationMessage);
        }
        if (!aplicenceRenewalData.max_no_of_empl) {
            return getBasicMessageAndFieldJSONArray('max_no_of_empl', maxNoEmpValidationMessage);
        }
        if (!aplicenceRenewalData.licence_status) {
            return getBasicMessageAndFieldJSONArray('licence_status', licenceStatusValidationMessage);
        }
        if (!aplicenceRenewalData.duration_of_work) {
            return getBasicMessageAndFieldJSONArray('duration_of_work', durationOfWorkValidationMessage);
        }
        if (!aplicenceRenewalData.establi_name) {
            return getBasicMessageAndFieldJSONArray('establi_name', establishmentNameValidationMessage);
        }
        if (!aplicenceRenewalData.establi_address) {
            return getBasicMessageAndFieldJSONArray('establi_address', establishmentAddressValidationMessage);
        }

        return '';
    },
    askForSubmitAplicenceRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'AplicenceRenewal.listview.submitAplicenceRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitAplicenceRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var aplicenceRenewalData = $('#aplicence_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForAplicenceRenewal(aplicenceRenewalData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('aplicence-renewal-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#formvii_doc_container_for_aplicence_renewal').is(':visible')) {
            var formvii = $('#formvii_doc_for_aplicence_renewal').val();
            if (formvii == '') {
                $('#formvii_doc_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-formvii_doc_for_aplicence_renewal', uploadDocumentValidationMessage);
                return false;
            }
            var formviiMessage = pdffileUploadValidation('formvii_doc_for_aplicence_renewal');
            if (formviiMessage != '') {
                $('#formvii_doc_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-formvii_doc_for_aplicence_renewal', formviiMessage);
                return false;
            }
        }

        if ($('#challan_copy_container_for_aplicence_renewal').is(':visible')) {
            var challanCopy = $('#challan_copy_for_aplicence_renewal').val();
            if (challanCopy == '') {
                $('#challan_copy_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-challan_copy_for_aplicence_renewal', uploadDocumentValidationMessage);
                return false;
            }
            var challanCopyMessage = pdffileUploadValidation('challan_copy_for_aplicence_renewal');
            if (challanCopyMessage != '') {
                $('#challan_copy_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-challan_copy_for_aplicence_renewal', challanCopyMessage);
                return false;
            }
        }

        if ($('#register_certification_doc_container_for_aplicence_renewal').is(':visible')) {
            var formv = $('#register_certification_doc_for_aplicence_renewal').val();
            if (formv == '') {
                $('#register_certification_doc_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-register_certification_doc_for_aplicence_renewal', uploadDocumentValidationMessage);
                return false;
            }
            var formvMessage = pdffileUploadValidation('register_certification_doc_for_aplicence_renewal');
            if (formvMessage != '') {
                $('#register_certification_doc_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-register_certification_doc_for_aplicence_renewal', formvMessage);
                return false;
            }
        }

        if ($('#seal_and_stamp_container_for_aplicence_renewal').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_aplicence_renewal').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-seal_and_stamp_for_aplicence_renewal', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_aplicence_renewal');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_aplicence_renewal').focus();
                validationMessageShow('aplicence-renewal-seal_and_stamp_for_aplicence_renewal', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_aplicence') : $('#submit_btn_for_aplicence');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var aplicenceRenewalData = new FormData($('#aplicence_renewal_form')[0]);
        aplicenceRenewalData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        // aplicenceRenewalData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        aplicenceRenewalData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/submit_aplicence_renewal',
            data: aplicenceRenewalData,
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
                validationMessageShow('aplicence-renewal', textStatus.statusText);
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
                    validationMessageShow('aplicence-renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                AplicenceRenewal.router.navigate('aplicence_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (aplicenceRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'AplicenceRenewal.listview.removeDocument(\'' + aplicenceRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (aplicenceRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/remove_document',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('aplicence-renewal', textStatus.statusText);
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
                    validationMessageShow('aplicence-renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_aplicence_renewal').hide();
                $('#' + docId + '_name_image_for_aplicence_renewal').attr('src', '');
                $('#' + docId + '_container_for_aplicence_renewal').show();
                $('#' + docId + '_for_aplicence_renewal').val('');
            }
        });
    },
    generateForm1: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#aplicence_renewal_id_for_aplicence_renewal_form1').val(aplicenceRenewalId);
        $('#aplicence_renewal_form1_pdf_form').submit();
        $('#aplicence_renewal_id_for_aplicence_renewal_form1').val('');
    },

    openUploadChallan: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + aplicenceRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence_renewal/get_aplicence_renewal_data_by_aplicence_renewal_id',
            type: 'post',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var aplicenceRenewalData = parseData.aplicence_renewal_data;
                showPopup();
                if (aplicenceRenewalData.payment_type == VALUE_ONE) {
                    aplicenceRenewalData.utitle = 'Challan Copy';
                } else {
                    aplicenceRenewalData.utitle = 'Payment Details';
                }
                aplicenceRenewalData.module_type = VALUE_FOURTYSIX;
                $('#popup_container').html(aplicenceRenewalUploadChallanTemplate(aplicenceRenewalData));
                loadFB(VALUE_FOURTYSIX, parseData.fb_data, aplicenceRenewalData.payment_type, aplicenceRenewalData.show_remove_upload_btn, aplicenceRenewalData.show_dropdown, aplicenceRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'aplicence_renewal_upload_challan', aplicenceRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'aplicence_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYSIX);
                if (aplicenceRenewalData.challan != '') {
                    $('#challan_container_for_aplicence_renewal_upload_challan').hide();
                    $('#challan_name_container_for_aplicence_renewal_upload_challan').show();
                    $('#challan_name_href_for_aplicence_renewal_upload_challan').attr('href', 'documents/aplicence/' + aplicenceRenewalData.challan);
                    $('#challan_name_for_aplicence_renewal_upload_challan').html(aplicenceRenewalData.challan);
                    $('#challan_remove_btn_for_aplicence_renewal_upload_challan').attr('onclick', 'AplicenceRenewal.listview.removeChallan("' + aplicenceRenewalData.aplicence_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (aplicenceRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/remove_challan',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId}, getTokenData()),
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
                validationMessageShow('aplicence-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('aplicence-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-aplicence-renewal-uc').html(parseData.message);
                removeDocument('challan', 'aplicence_renewal_upload_challan');
                $('#status_' + aplicenceRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-aplicence-renewal-uc').html('');
        validationMessageHide();
        var aplicenceRenewalId = $('#aplicence_renewal_id_for_aplicence_renewal_upload_challan').val();
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_aplicence_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_aplicence_renewal_upload_challan_1').focus();
            validationMessageShow('aplicence-renewal-uc-payment_type_for_aplicence_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_aplicence_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_aplicence_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_aplicence_renewal_upload_challan').focus();
                validationMessageShow('aplicence-renewal-uc-challan_for_aplicence_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_aplicence_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_aplicence_renewal_upload_challan').focus();
                validationMessageShow('aplicence-renewal-uc-challan_for_aplicence_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYSIX, 'aplicence-renewal-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_aplicence_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#aplicence_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/upload_challan',
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
                validationMessageShow('aplicence-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('aplicence-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + aplicenceRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + aplicenceRenewalId).show();
                }
                $('#total_fees_' + aplicenceRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_aplicence_renewal_' + aplicenceRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence_renewal/get_aplicence_renewal_data_by_aplicence_renewal_id',
            type: 'post',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId}, getTokenData()),
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
                var aplicenceRenewalData = parseData.aplicence_renewal_data;
                showPopup();
                $('#popup_container').html(aplicenceRenewalApproveTemplate(aplicenceRenewalData));
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
        var formData = $('#approve_aplicence_renewal_form').serializeFormJSON();
        if (!formData.aplicence_renewal_id_for_aplicence_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_aplicence_renewal_approve) {
            $('#registration_number_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-registration_number_for_aplicence_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_aplicence_renewal_approve) {
            $('#valid_upto_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-valid_upto_for_aplicence_renewal_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_aplicence_renewal_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-certificate_file_for_aplicence_renewal_approve', certficateMessage);
            return false;
        }
        if (!formData.fees_for_aplicence_renewal_approve || formData.fees_for_aplicence_renewal_approve == VALUE_ZERO) {
            $('#fees_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-fees_for_aplicence_renewal_approve', feesValidationMessage);
            return false;
        }
        if (!formData.remarks_for_aplicence_renewal_approve) {
            $('#remarks_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-remarks_for_aplicence_renewal_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_aplicence_renewal_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_aplicence_renewal_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/approve_application',
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
                validationMessageShow('aplicence-approve', textStatus.statusText);
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
                    validationMessageShow('aplicence-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).show();
                $('#so_status_' + formData.aplicence_renewal_id_for_aplicence_renewal_approve).html(dateTimeDays(formData.aplicence_renewal_id_for_aplicence_renewal_approve, parseData, VALUE_FOURTYSIX));
            }
        });
    },
    askForRejectApplication: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_aplicence_renewal_' + aplicenceRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence_renewal/get_aplicence_renewal_data_by_aplicence_renewal_id',
            type: 'post',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId}, getTokenData()),
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
                var aplicenceRenewalData = parseData.aplicence_renewal_data;
                showPopup();
                $('#popup_container').html(aplicenceRenewalRejectTemplate(aplicenceRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_aplicence_renewal_form').serializeFormJSON();
        if (!formData.aplicence_renewal_id_for_aplicence_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_aplicence_renewal_reject) {
            $('#remarks_for_aplicence_renewal_reject').focus();
            validationMessageShow('aplicence-reject-remarks_for_aplicence_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence_renewal/reject_application',
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
                validationMessageShow('aplicence-reject', textStatus.statusText);
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
                    validationMessageShow('aplicence-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).remove();
                $('#so_status_' + formData.aplicence_renewal_id_for_aplicence_renewal_reject).html(dateTimeDays(formData.aplicence_renewal_id_for_aplicence_renewal_reject, parseData, VALUE_FOURTYSIX));
            }
        });
    },
    generateCertificate: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#aplicence_renewal_id_for_certificate').val(aplicenceRenewalId);
        $('#aplicence_renewal_certificate_pdf_form').submit();
        $('#aplicence_renewal_id_for_certificate').val('');
    },
    getQueryData: function (aplicenceRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!aplicenceRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYSIX;
        templateData.module_id = aplicenceRenewalId;
        var btnObj = $('#query_btn_for_lice_' + aplicenceRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYSIX, moduleData.aplicence_renewal_id);
                tmpData.applicant_name = moduleData.contractor_name;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FOURTYSIX;
                tmpData.module_id = aplicenceRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (aplicenceRenewalId) {
        if (!aplicenceRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + aplicenceRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence_renewal/get_aplicence_renewal_data_by_aplicence_renewal_id',
            type: 'post',
            data: $.extend({}, {'aplicence_renewal_id': aplicenceRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var aplicenceRenewalData = parseData.aplicence_renewal_data;
                showPopup();
                if (aplicenceRenewalData.payment_type == VALUE_ONE || aplicenceRenewalData.payment_type == VALUE_THREE) {
                    aplicenceRenewalData.user_payment_type_text = paymentTypeArray[aplicenceRenewalData.payment_type];
                } else {
                    aplicenceRenewalData.user_payment_type_text = userPaymentTypeArray[aplicenceRenewalData.user_payment_type] ? userPaymentTypeArray[aplicenceRenewalData.user_payment_type] : '';
                }
                if (aplicenceRenewalData.payment_type == VALUE_ONE) {
                    aplicenceRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (aplicenceRenewalData.payment_type == VALUE_TWO && aplicenceRenewalData.user_payment_type == VALUE_ONE) {
                    aplicenceRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                aplicenceRenewalData.module_type = VALUE_FOURTYSIX;
                $('#popup_container').html(aplicenceRenewalViewPaymentTemplate(aplicenceRenewalData));
                loadFB(VALUE_FOURTYSIX, parseData.fb_data, aplicenceRenewalData.payment_type);
                loadPH(VALUE_FOURTYSIX, aplicenceRenewalData.aplicence_renewal_id, parseData.ph_data);
                if (aplicenceRenewalData.payment_type == VALUE_ONE || (aplicenceRenewalData.payment_type == VALUE_TWO && aplicenceRenewalData.user_payment_type == VALUE_ONE)) {
                    if (aplicenceRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_aplicence_renewal').show();
                        $('#fees_paid_challan_name_href_for_aplicence_renewal').attr('href', APLICENCE_DOC_PATH + aplicenceRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_aplicence_renewal').html(aplicenceRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
