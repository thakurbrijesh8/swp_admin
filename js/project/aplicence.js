var aplicenceListTemplate = Handlebars.compile($('#aplicence_list_template').html());
var aplicenceTableTemplate = Handlebars.compile($('#aplicence_table_template').html());
var aplicenceActionTemplate = Handlebars.compile($('#aplicence_action_template').html());
var aplicenceFormTemplate = Handlebars.compile($('#aplicence_form_template').html());
var aplicenceViewTemplate = Handlebars.compile($('#aplicence_view_template').html());
var aplicenceUploadChallanTemplate = Handlebars.compile($('#aplicence_upload_challan_template').html());
var aplicenceApproveTemplate = Handlebars.compile($('#aplicence_approve_template').html());
var aplicenceRejectTemplate = Handlebars.compile($('#aplicence_reject_template').html());
var aplicenceViewPaymentTemplate = Handlebars.compile($('#aplicence_view_payment_template').html());

var tempPersonCnt = 1;

var Aplicence = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Aplicence.Router = Backbone.Router.extend({
    routes: {
        'aplicence': 'renderList',
        'aplicence_form': 'renderList',
        'edit_aplicence_form': 'renderList',
        'view_aplicence_form': 'renderList',
    },
    renderList: function () {
        Aplicence.listview.listPage();
    },
    renderListForForm: function () {
        Aplicence.listview.listPageAplicenceForm();
    }
});
Aplicence.listView = Backbone.View.extend({
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
        addClass('menu_aplicence', 'active');
        Aplicence.router.navigate('aplicence');
        var templateData = {};
        this.$el.html(aplicenceListTemplate(templateData));
        this.loadAplicenceData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageAplicenceForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_aplicence', 'active');
        this.$el.html(aplicenceListTemplate);
        this.newAplicenceForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return aplicenceActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYTHREE;
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
        return aplicenceActionTemplate(rowData);
    },
    loadAplicenceData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.contractor_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.nature_of_process_for_establi;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTYTHREE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYTHREE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['aplicence_data'], function (index, objData) {
                json['aplicence_data'][index]['query_movement_string'] = qmData[objData.aplicence_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.aplicence_id] + '</table>') : '-';
            });
            return json['aplicence_data'];
        };
        var that = this;
        showTableContainer('aplicence');
        Aplicence.router.navigate('aplicence');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Aplicence.listview.loadAplicenceData();');
        $('#aplicence_datatable_container').html(aplicenceTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_aplicence_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_aplicence_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_aplicence_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_aplicence_list', false);
        allowOnlyIntegerValue('mobile_number_for_aplicence_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_aplicence_list', false);
        $('#district_for_aplicence_list').val(searchData.search_district);
        $('#status_for_aplicence_list').val(searchData.search_status);
        $('#app_timing_for_aplicence_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_aplicence_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_aplicence_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_aplicence_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_aplicence_list').attr('disabled', 'disabled');
        }
        aplicenceDataTable = $('#aplicence_datatable').DataTable({
            ajax: {url: 'aplicence/get_aplicence_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'aplicence_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'aplicence_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'aplicence_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'aplicence_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#aplicence_datatable_filter').remove();
        $('#aplicence_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = aplicenceDataTable.row(tr);

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
    newAplicenceForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        if (isEdit) {
            var formData = parseData.aplicence_data;
            Aplicence.router.navigate('edit_aplicence_form');
        } else {
            var formData = {};
            Aplicence.router.navigate('aplicence_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.aplicence_data = parseData.aplicence_data;
        showFormContainer('aplicence');
        if (isEdit) {
            templateData.date_of_certificate = dateTo_DD_MM_YYYY(templateData.aplicence_data.date_of_certificate);
        }
        $('#aplicence_form_container').html(aplicenceFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');

            if (formData.formv_doc != '') {
                $('#formv_doc_container_for_aplicence').hide();
                $('#formv_doc_name_image_for_aplicence').attr('src', APLICENCE_DOC_PATH + formData.formv_doc);
                $('#formv_doc_name_container_for_aplicence').show();
                $('#formv_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formv_doc);
            }
            if (formData.formiv_doc != '') {
                $('#formiv_doc_container_for_aplicence').hide();
                $('#formiv_doc_name_image_for_aplicence').attr('src', APLICENCE_DOC_PATH + formData.formiv_doc);
                $('#formiv_doc_name_container_for_aplicence').show();
                $('#formiv_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formiv_doc);
            }
            if (formData.register_certification_doc != '') {
                $('#register_certification_doc_container_for_aplicence').hide();
                $('#register_certification_doc_name_image_for_aplicence').attr('src', APLICENCE_DOC_PATH + formData.register_certification_doc);
                $('#register_certification_doc_name_container_for_aplicence').show();
                $('#register_certification_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.register_certification_doc);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_aplicence').hide();
                $('#seal_and_stamp_name_image_for_aplicence').attr('src', APLICENCE_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_aplicence').show();
                $('#seal_and_stamp_download').attr("href", APLICENCE_DOC_PATH + formData.signature);
            }
            if (formData.if_contractor_work_other_place == isChecked) {
                $('#if_contractor_work_other_place').attr('checked', 'checked');
                this.$('.if_contractor_work_other_place_div').show();
            }

        }
        generateSelect2();
        datePicker();
        $('#aplicence_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitAplicence($('#submit_btn_for_aplicence'));
            }
        });
    },
    editOrViewAplicence: function (btnObj, aplicenceId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!aplicenceId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence/get_aplicence_data_by_id',
            type: 'post',
            data: $.extend({}, {'aplicence_id': aplicenceId}, getTokenData()),
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
                    that.newAplicenceForm(isEdit, parseData);
                } else {
                    that.viewAplicenceForm(parseData);
                }
            }
        });
    },
    viewAplicenceForm: function (parseData) {
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
        var formData = parseData.aplicence_data;
        Aplicence.router.navigate('view_aplicence_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.date_of_certificate = dateTo_DD_MM_YYYY(formData.date_of_certificate);
        showFormContainer('aplicence');
        $('#aplicence_form_container').html(aplicenceViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');

        if (formData.formv_doc != '') {
            $('#formv_doc_container_for_aplicence_view').hide();
            $('#formv_doc_name_image_for_aplicence_view').attr('src', APLICENCE_DOC_PATH + formData.formv_doc);
            $('#formv_doc_name_container_for_aplicence_view').show();
            $('#formv_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formv_doc);
        }
        if (formData.formiv_doc != '') {
            $('#formiv_doc_container_for_aplicence_view').hide();
            $('#formiv_doc_name_image_for_aplicence_view').attr('src', APLICENCE_DOC_PATH + formData.formiv_doc);
            $('#formiv_doc_name_container_for_aplicence_view').show();
            $('#formiv_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.formiv_doc);
        }
        if (formData.register_certification_doc != '') {
            $('#register_certification_doc_container_for_aplicence_view').hide();
            $('#register_certification_doc_name_image_for_aplicence_view').attr('src', APLICENCE_DOC_PATH + formData.register_certification_doc);
            $('#register_certification_doc_name_container_for_aplicence_view').show();
            $('#register_certification_doc_name_download').attr("href", APLICENCE_DOC_PATH + formData.register_certification_doc);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_aplicence_view').hide();
            $('#seal_and_stamp_name_image_for_aplicence_view').attr('src', APLICENCE_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_aplicence_view').show();
            $('#seal_and_stamp_download').attr("href", APLICENCE_DOC_PATH + formData.signature);
        }
        if (formData.if_contractor_work_other_place == isChecked) {
            $('#if_contractor_work_other_place').attr('checked', 'checked');
            this.$('.if_contractor_work_other_place_div').show();
        }


    },
    checkValidationForAplicence: function (aplicenceData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!aplicenceData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!aplicenceData.contractor_name) {
            return getBasicMessageAndFieldJSONArray('contractor_name', contractorNameValidationMessage);
        }
        if (!aplicenceData.contractor_fathername) {
            return getBasicMessageAndFieldJSONArray('contractor_fathername', contractorFatherNameValidationMessage);
        }
        if (!aplicenceData.contractor_address) {
            return getBasicMessageAndFieldJSONArray('contractor_address', contractorAddressValidationMessage);
        }
        if (!aplicenceData.contractor_contact) {
            return getBasicMessageAndFieldJSONArray('contractor_contact', contractorCcontactValidationMessage);
        }
        if (!aplicenceData.contractor_email) {
            return getBasicMessageAndFieldJSONArray('contractor_email', emailValidationMessage);
        }
        if (!aplicenceData.establi_name) {
            return getBasicMessageAndFieldJSONArray('establi_name', establishmentNameValidationMessage);
        }
        if (!aplicenceData.establi_address) {
            return getBasicMessageAndFieldJSONArray('establi_address', establishmentAddressValidationMessage);
        }
        if (!aplicenceData.no_of_certificate) {
            return getBasicMessageAndFieldJSONArray('no_of_certificate', certificateNoValidationMessage);
        }
        if (!aplicenceData.date_of_certificate) {
            return getBasicMessageAndFieldJSONArray('date_of_certificate', certificateDateValidationMessage);
        }
        if (!aplicenceData.employer_name) {
            return getBasicMessageAndFieldJSONArray('employer_name', employerNameValidationMessage);
        }
        if (!aplicenceData.employer_address) {
            return getBasicMessageAndFieldJSONArray('employer_address', employerAddressValidationMessage);
        }
        if (!aplicenceData.nature_of_process_for_establi) {
            return getBasicMessageAndFieldJSONArray('nature_of_process_for_establi', natureOfProcessValidationMessage);
        }
        if (!aplicenceData.nature_of_process_for_labour) {
            return getBasicMessageAndFieldJSONArray('nature_of_process_for_labour', natureOfProcesslabourValidationMessage);
        }
        if (!aplicenceData.duration_of_work) {
            return getBasicMessageAndFieldJSONArray('duration_of_work', durationOfWorkValidationMessage);
        }
        if (!aplicenceData.name_of_agent) {
            return getBasicMessageAndFieldJSONArray('name_of_agent', agentNameValidationMessage);
        }
        if (!aplicenceData.address_of_agent) {
            return getBasicMessageAndFieldJSONArray('address_of_agent', agentAddressValidationMessage);
        }
        if (!aplicenceData.max_no_of_empl) {
            return getBasicMessageAndFieldJSONArray('max_no_of_empl', maxNoEmpValidationMessage);
        }
        if (!aplicenceData.estimeted_value) {
            return getBasicMessageAndFieldJSONArray('estimeted_value', estimetedValueValidationMessage);
        }

        return '';
    },
    askForSubmitAplicence: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Aplicence.listview.submitAplicence(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitAplicence: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var aplicenceData = $('#aplicence_form').serializeFormJSON();
        var validationData = that.checkValidationForAplicence(aplicenceData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('aplicence-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#formv_doc_container_for_aplicence').is(':visible')) {
            var formv = $('#formv_doc_for_aplicence').val();
            if (formv == '') {
                $('#formv_doc_for_aplicence').focus();
                validationMessageShow('aplicence-formv_doc_for_aplicence', uploadDocumentValidationMessage);
                return false;
            }
            var formvMessage = pdffileUploadValidation('formv_doc_for_aplicence');
            if (formvMessage != '') {
                $('#formv_doc_for_aplicence').focus();
                validationMessageShow('aplicence-formv_doc_for_aplicence', formvMessage);
                return false;
            }
        }

        if ($('#formiv_doc_container_for_aplicence').is(':visible')) {
            var formiv = $('#formiv_doc_for_aplicence').val();
            if (formiv == '') {
                $('#formiv_doc_for_aplicence').focus();
                validationMessageShow('aplicence-formiv_doc_for_aplicence', uploadDocumentValidationMessage);
                return false;
            }
            var formivMessage = pdffileUploadValidation('formiv_doc_for_aplicence');
            if (formivMessage != '') {
                $('#formiv_doc_for_aplicence').focus();
                validationMessageShow('aplicence-formiv_doc_for_aplicence', formivMessage);
                return false;
            }
        }

        if ($('#register_certification_doc_container_for_aplicence').is(':visible')) {
            var formv = $('#register_certification_doc_for_aplicence').val();
            if (formv == '') {
                $('#register_certification_doc_for_aplicence').focus();
                validationMessageShow('aplicence-register_certification_doc_for_aplicence', uploadDocumentValidationMessage);
                return false;
            }
            var formvMessage = pdffileUploadValidation('register_certification_doc_for_aplicence');
            if (formvMessage != '') {
                $('#register_certification_doc_for_aplicence').focus();
                validationMessageShow('aplicence-register_certification_doc_for_aplicence', formvMessage);
                return false;
            }
        }

        if ($('#seal_and_stamp_container_for_aplicence').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_aplicence').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_aplicence').focus();
                validationMessageShow('aplicence-seal_and_stamp_for_aplicence', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_aplicence');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_aplicence').focus();
                validationMessageShow('aplicence-seal_and_stamp_for_aplicence', sealAndStampMessage);
                return false;
            }
        }
        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_aplicence') : $('#submit_btn_for_aplicence');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var aplicenceData = new FormData($('#aplicence_form')[0]);
        aplicenceData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        // aplicenceData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        aplicenceData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'aplicence/submit_aplicence',
            data: aplicenceData,
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
                validationMessageShow('aplicence', textStatus.statusText);
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
                    validationMessageShow('aplicence', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Aplicence.router.navigate('aplicence', {'trigger': true});
            }
        });
    },

    askForRemove: function (aplicenceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Aplicence.listview.removeDocument(\'' + aplicenceId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (aplicenceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        validationMessageHide();
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence/remove_document',
            data: $.extend({}, {'aplicence_id': aplicenceId}, getTokenData()),
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
                validationMessageShow('aplicence', textStatus.statusText);
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
                    validationMessageShow('aplicence', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_aplicence').hide();
                $('#seal_and_stamp_name_image_for_aplicence').attr('src', '');
                $('#seal_and_stamp_container_for_aplicence').show();
                $('#seal_and_stamp_for_aplicence').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(aplicenceProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#aplicence_id_for_aplicence_form1').val(aplicenceId);
        $('#aplicence_form1_pdf_form').submit();
        $('#aplicence_id_for_aplicence_form1').val('');
    },

    openUploadChallan: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + aplicenceId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence/get_aplicence_data_by_aplicence_id',
            type: 'post',
            data: $.extend({}, {'aplicence_id': aplicenceId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var aplicenceData = parseData.aplicence_data;
                showPopup();
                if (aplicenceData.payment_type == VALUE_ONE) {
                    aplicenceData.utitle = 'Challan Copy';
                } else {
                    aplicenceData.utitle = 'Payment Details';
                }
                aplicenceData.module_type = VALUE_FOURTYTHREE;
                $('#popup_container').html(aplicenceUploadChallanTemplate(aplicenceData));
                loadFB(VALUE_FOURTYTHREE, parseData.fb_data, aplicenceData.payment_type, aplicenceData.show_remove_upload_btn, aplicenceData.show_dropdown, aplicenceData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'aplicence_upload_challan', aplicenceData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'aplicence_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYTHREE);
                if (aplicenceData.challan != '') {
                    $('#challan_container_for_aplicence_upload_challan').hide();
                    $('#challan_name_container_for_aplicence_upload_challan').show();
                    $('#challan_name_href_for_aplicence_upload_challan').attr('href', 'documents/aplicence/' + aplicenceData.challan);
                    $('#challan_name_for_aplicence_upload_challan').html(aplicenceData.challan);
                    $('#challan_remove_btn_for_aplicence_upload_challan').attr('onclick', 'Aplicence.listview.removeChallan("' + aplicenceData.aplicence_id + '")');
                }
            }
        });
    },
    removeChallan: function (aplicenceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence/remove_challan',
            data: $.extend({}, {'aplicence_id': aplicenceId}, getTokenData()),
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
                validationMessageShow('aplicence-uc', textStatus.statusText);
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
                    validationMessageShow('aplicence-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-aplicence-uc').html(parseData.message);
                removeDocument('challan', 'aplicence_upload_challan');
                $('#status_' + aplicenceId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-aplicence-uc').html('');
        validationMessageHide();
        var aplicenceId = $('#aplicence_id_for_aplicence_upload_challan').val();
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_aplicence_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_aplicence_upload_challan_1').focus();
            validationMessageShow('aplicence-uc-payment_type_for_aplicence_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_aplicence_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_aplicence_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_aplicence_upload_challan').focus();
                validationMessageShow('aplicence-uc-challan_for_aplicence_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_aplicence_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_aplicence_upload_challan').focus();
                validationMessageShow('aplicence-uc-challan_for_aplicence_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYTHREE, 'aplicence-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_aplicence_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#aplicence_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence/upload_challan',
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
                validationMessageShow('aplicence-uc', textStatus.statusText);
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
                    validationMessageShow('aplicence-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + aplicenceId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + aplicenceId).show();
                }
                $('#total_fees_' + aplicenceId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_aplicence_' + aplicenceId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence/get_aplicence_data_by_aplicence_id',
            type: 'post',
            data: $.extend({}, {'aplicence_id': aplicenceId}, getTokenData()),
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
                var aplicenceData = parseData.aplicence_data;
                showPopup();
                $('#popup_container').html(aplicenceApproveTemplate(aplicenceData));
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
        var formData = $('#approve_aplicence_form').serializeFormJSON();
        if (!formData.aplicence_id_for_aplicence_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_aplicence_approve) {
            $('#registration_number_for_aplicence_approve').focus();
            validationMessageShow('aplicence-approve-registration_number_for_aplicence_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_aplicence_approve) {
            $('#valid_upto_for_aplicence_approve').focus();
            validationMessageShow('aplicence-approve-valid_upto_for_aplicence_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_aplicence_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_aplicence_approve').focus();
            validationMessageShow('aplicence-approve-certificate_file_for_aplicence_approve', certficateMessage);
            return false;
        }
        if (!formData.fees_for_aplicence_renewal_approve || formData.fees_for_aplicence_renewal_approve == VALUE_ZERO) {
            $('#fees_for_aplicence_renewal_approve').focus();
            validationMessageShow('aplicence-renewal-approve-fees_for_aplicence_renewal_approve', feesValidationMessage);
            return false;
        }
        if (!formData.remarks_for_aplicence_approve) {
            $('#remarks_for_aplicence_approve').focus();
            validationMessageShow('aplicence-approve-remarks_for_aplicence_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_aplicence_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_aplicence_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'aplicence/approve_application',
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
                $('#status_' + formData.aplicence_id_for_aplicence_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.aplicence_id_for_aplicence_approve).remove();
                $('#approve_btn_for_app_' + formData.aplicence_id_for_aplicence_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.aplicence_id_for_aplicence_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.aplicence_id_for_aplicence_approve).show();
                $('#so_status_' + formData.aplicence_id_for_aplicence_approve).html(dateTimeDays(formData.aplicence_id_for_aplicence_approve, parseData, VALUE_FOURTYTHREE));
            }
        });
    },
    askForRejectApplication: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_aplicence_' + aplicenceId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence/get_aplicence_data_by_aplicence_id',
            type: 'post',
            data: $.extend({}, {'aplicence_id': aplicenceId}, getTokenData()),
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
                var aplicenceData = parseData.aplicence_data;
                showPopup();
                $('#popup_container').html(aplicenceRejectTemplate(aplicenceData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_aplicence_form').serializeFormJSON();
        if (!formData.aplicence_id_for_aplicence_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_aplicence_reject) {
            $('#remarks_for_aplicence_reject').focus();
            validationMessageShow('aplicence-reject-remarks_for_aplicence_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'aplicence/reject_application',
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
                $('#status_' + formData.aplicence_id_for_aplicence_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.aplicence_id_for_aplicence_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.aplicence_id_for_aplicence_reject).remove();
                $('#reject_btn_for_app_' + formData.aplicence_id_for_aplicence_reject).remove();
                $('#approve_btn_for_app_' + formData.aplicence_id_for_aplicence_reject).remove();
                $('#so_status_' + formData.aplicence_id_for_aplicence_reject).html(dateTimeDays(formData.aplicence_id_for_aplicence_reject, parseData, VALUE_FOURTYTHREE));
            }
        });
    },
    generateCertificate: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#aplicence_id_for_certificate').val(aplicenceId);
        $('#aplicence_certificate_pdf_form').submit();
        $('#aplicence_id_for_certificate').val('');
    },
    getQueryData: function (aplicenceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!aplicenceId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYTHREE;
        templateData.module_id = aplicenceId;
        var btnObj = $('#query_btn_for_lice_' + aplicenceId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYTHREE, moduleData.aplicence_id);
                tmpData.applicant_name = moduleData.contractor_name;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FOURTYTHREE;
                tmpData.module_id = aplicenceId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (aplicenceId) {
        if (!aplicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + aplicenceId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'aplicence/get_aplicence_data_by_aplicence_id',
            type: 'post',
            data: $.extend({}, {'aplicence_id': aplicenceId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var aplicenceData = parseData.aplicence_data;
                showPopup();
                if (aplicenceData.payment_type == VALUE_ONE || aplicenceData.payment_type == VALUE_THREE) {
                    aplicenceData.user_payment_type_text = paymentTypeArray[aplicenceData.payment_type];
                } else {
                    aplicenceData.user_payment_type_text = userPaymentTypeArray[aplicenceData.user_payment_type] ? userPaymentTypeArray[aplicenceData.user_payment_type] : '';
                }
                if (aplicenceData.payment_type == VALUE_ONE) {
                    aplicenceData.utitle = 'Fees Paid Challan Copy';
                } else if (aplicenceData.payment_type == VALUE_TWO && aplicenceData.user_payment_type == VALUE_ONE) {
                    aplicenceData.utitle = 'Demand Draft (DD) Copy';
                }
                aplicenceData.module_type = VALUE_FOURTYTHREE;
                $('#popup_container').html(aplicenceViewPaymentTemplate(aplicenceData));
                loadFB(VALUE_FOURTYTHREE, parseData.fb_data, aplicenceData.payment_type);
                loadPH(VALUE_FOURTYTHREE, aplicenceData.aplicence_id, parseData.ph_data);
                if (aplicenceData.payment_type == VALUE_ONE || (aplicenceData.payment_type == VALUE_TWO && aplicenceData.user_payment_type == VALUE_ONE)) {
                    if (aplicenceData.fees_paid_challan != '') {
                        $('#vp_container_for_aplicence').show();
                        $('#fees_paid_challan_name_href_for_aplicence').attr('href', APLICENCE_DOC_PATH + aplicenceData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_aplicence').html(aplicenceData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
