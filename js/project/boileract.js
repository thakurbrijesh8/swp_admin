var boilerActListTemplate = Handlebars.compile($('#boiler_act_list_template').html());
var boilerActTableTemplate = Handlebars.compile($('#boiler_act_table_template').html());
var boilerActActionTemplate = Handlebars.compile($('#boiler_act_action_template').html());
var boilerActFormTemplate = Handlebars.compile($('#boiler_act_form_template').html());
var boilerActViewTemplate = Handlebars.compile($('#boiler_act_view_template').html());
var boilerActUploadChallanTemplate = Handlebars.compile($('#boiler_act_upload_challan_template').html());
var boilerActApproveTemplate = Handlebars.compile($('#boiler_act_approve_template').html());
var boilerActRejectTemplate = Handlebars.compile($('#boiler_act_reject_template').html());
var boilerActViewPaymentTemplate = Handlebars.compile($('#boiler_act_view_payment_template').html());


var BoilerAct = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
BoilerAct.Router = Backbone.Router.extend({
    routes: {
        'boileract': 'renderList',
        'boileract_form': 'renderListForForm',
        'edit_boileract_form': 'renderList',
        'view_boileract_form': 'renderList',
    },
    renderList: function () {
        BoilerAct.listview.listPage();
    },
    renderListForForm: function () {
        BoilerAct.listview.listPageBoilerActForm();
    }
});
BoilerAct.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_boiler_act', 'active');
        BoilerAct.router.navigate('boileract');
        var templateData = {};
        this.$el.html(boilerActListTemplate(templateData));
        this.loadBoilerActData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageBoilerActForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_boiler_act', 'active');
        this.$el.html(boilerActListTemplate);
        this.newBoilerActForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return boilerActActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYSEVEN;
        if (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE || rowData.status == VALUE_FOUR || rowData.status == VALUE_EIGHT || rowData.status == VALUE_NINE) {
            rowData.show_payment_confirm_btn = '';
        } else {
            rowData.show_payment_confirm_btn = 'display: none;';
        }
        //rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return boilerActActionTemplate(rowData);
    },
    loadBoilerActData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.owner_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.boiler_type;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD)
                return regNoRenderer(VALUE_THIRTYSEVEN, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THIRTYSEVEN, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYSEVEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['boiler_act_data'], function (index, objData) {
                json['boiler_act_data'][index]['query_movement_string'] = qmData[objData.boiler_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.boiler_id] + '</table>') : '-';
            });
            return json['boiler_act_data'];
        };
        var that = this;
        BoilerAct.router.navigate('boileract');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'BoilerAct.listview.loadBoilerActData();');
        $('#boiler_act_form_and_datatable_container').html(boilerActTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_boiler_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_boiler_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_boiler_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_boiler_list', false);
        allowOnlyIntegerValue('mobile_number_for_boiler_list');
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_boiler_list', false);
        $('#district_for_boiler_list').val(searchData.search_district);
        $('#status_for_boiler_list').val(searchData.search_status);
        $('#app_timing_for_boiler_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_boiler_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_boiler_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_boiler_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_boiler_list').attr('disabled', 'disabled');
        }
        boilerActDataTable = $('#boiler_act_datatable').DataTable({
            ajax: {url: 'boileract/get_boiler_act_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'boiler_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'boiler_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'boiler_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'boiler_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#boiler_act_datatable_filter').remove();
        $('#boiler_act_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = boilerActDataTable.row(tr);

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
    askForNewBoilerActForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newBoilerActForm(false, {});
    },
    newBoilerActForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;

        var that = this;
        if (isEdit) {
            var formData = parseData.boiler_act_data;
            BoilerAct.router.navigate('edit_boileract_form');
        } else {
            var formData = {};
            BoilerAct.router.navigate('boileract_form');
        }

        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.boilerAct_data = parseData.boiler_act_data;

        if (isEdit) {
            templateData.hydraulically_tested_on = dateTo_DD_MM_YYYY(templateData.boilerAct_data.hydraulically_tested_on);
        }
        $('#boiler_act_form_and_datatable_container').html(boilerActFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {

            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.company_letter_head != '') {
                $('#company_letter_head_container_for_boiler').hide();
                $('#company_letter_head_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.company_letter_head);
                $('#company_letter_head_name_container_for_boiler').show();
                $('#company_letter_head_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.company_letter_head);
            }
            if (formData.pipe_line_deawing != '') {
                $('#pipe_line_deawing_container_for_boiler').hide();
                $('#pipe_line_deawing_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.pipe_line_deawing);
                $('#pipe_line_deawing_name_container_for_boiler').show();
                $('#pipe_line_deawing_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.pipe_line_deawing);
            }
            if (formData.copy_of_challan != '') {
                $('#copy_of_challan_container_for_boiler').hide();
                $('#copy_of_challan_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.copy_of_challan);
                $('#copy_of_challan_name_container_for_boiler').show();
                $('#copy_of_challan_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.copy_of_challan);
            }
            if (formData.ibr_document != '') {
                $('#ibr_document_container_for_boiler').hide();
                $('#ibr_document_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.ibr_document);
                $('#ibr_document_name_container_for_boiler').show();
                $('#ibr_document_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.ibr_document);
            }
            if (formData.sign_of_applicant != '') {
                $('#sign_of_applicant_container_for_boiler').hide();
                $('#sign_of_applicant_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.sign_of_applicant);
                $('#sign_of_applicant_name_container_for_boiler').show();
                $('#sign_of_applicant_download').attr("href", BOILER_DOC_PATH + formData.sign_of_applicant);
            }
        }

        generateSelect2();
        datePicker();
        $('#boiler_act_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitBoilerAct($('#submit_btn_for_boiler_act'));
            }
        });
    },
    editOrViewBoilerAct: function (btnObj, boilerActId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!boilerActId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract/get_boiler_act_data_by_id',
            type: 'post',
            data: $.extend({}, {'boiler_id': boilerActId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnClick);
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
                btnObj.attr('onclick', ogBtnOnClick);
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
                // var boilerActData = parseData.boiler_act_data;
                // boilerActData.hydraulically_tested_on = dateTo_DD_MM_YYYY(boilerActData.hydraulically_tested_on);
                if (isEdit) {
                    that.newBoilerActForm(isEdit, parseData);
                } else {
                    that.viewBoilerActForm(parseData);
                }
            }
        });
    },
    viewBoilerActForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        //templateData.boilerAct_data = boilerActData;
        var formData = parseData.boiler_act_data;
        BoilerAct.router.navigate('view_boileract_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#boiler_act_form_and_datatable_container').html(boilerActViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        if (formData.company_letter_head != '') {
            $('#company_letter_head_container_for_boiler').hide();
            $('#company_letter_head_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.company_letter_head);
            $('#company_letter_head_name_container_for_boiler').show();
            $('#company_letter_head_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.company_letter_head);
        }
        if (formData.pipe_line_deawing != '') {
            $('#pipe_line_deawing_container_for_boiler').hide();
            $('#pipe_line_deawing_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.pipe_line_deawing);
            $('#pipe_line_deawing_name_container_for_boiler').show();
            $('#pipe_line_deawing_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.pipe_line_deawing);
        }
        if (formData.copy_of_challan != '') {
            $('#copy_of_challan_container_for_boiler').hide();
            $('#copy_of_challan_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.copy_of_challan);
            $('#copy_of_challan_name_container_for_boiler').show();
            $('#copy_of_challan_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.copy_of_challan);
        }
        if (formData.ibr_document != '') {
            $('#ibr_document_container_for_boiler').hide();
            $('#ibr_document_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.ibr_document);
            $('#ibr_document_name_container_for_boiler').show();
            $('#ibr_document_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.ibr_document);
        }
        if (formData.sign_of_applicant != '') {
            $('#sign_of_applicant_container_for_boiler').hide();
            $('#sign_of_applicant_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.sign_of_applicant);
            $('#sign_of_applicant_name_container_for_boiler').show();
            $('#sign_of_applicant_download').attr("href", BOILER_DOC_PATH + formData.sign_of_applicant);
        }
    },
    checkValidationForBoilerAct: function (boilerActData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilerActData.owner_name) {
            return getBasicMessageAndFieldJSONArray('owner_name', ownerNameValidationMessage);
        }
        if (!boilerActData.situation_of_boiler) {
            return getBasicMessageAndFieldJSONArray('situation_of_boiler', boilerSituationValidationMessage);
        }
        if (!boilerActData.boiler_type) {
            return getBasicMessageAndFieldJSONArray('boiler_type', boilerTypeValidationMessage);
        }
        if (!boilerActData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!boilerActData.ut) {
            return getBasicMessageAndFieldJSONArray('ut', utValidationMessage);
        }
        if (!boilerActData.working_pressure) {
            return getBasicMessageAndFieldJSONArray('working_pressure', workingPressureValidationMessage);
        }
        if (!boilerActData.max_pressure) {
            return getBasicMessageAndFieldJSONArray('max_pressure', maxPressureValidationMessage);
        }
        if (!boilerActData.heating_surface_area) {
            return getBasicMessageAndFieldJSONArray('heating_surface_area', heatingSurfaceValidationMessage);
        }
        if (!boilerActData.length_of_pipes) {
            return getBasicMessageAndFieldJSONArray('length_of_pipes', lengthPipesValidationMessage);
        }
        if (!boilerActData.max_evaporation) {
            return getBasicMessageAndFieldJSONArray('max_evaporation', maxEvaporationValidationMessage);
        }
        if (!boilerActData.place_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('place_of_manufacture', manufacturePlaceValidationMessage);
        }
        if (!boilerActData.year_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('year_of_manufacture', manufactureYearValidationMessage);
        }
        if (!boilerActData.name_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacture', manufactureNameValidationMessage);
        }
        if (!boilerActData.manufacture_address) {
            return getBasicMessageAndFieldJSONArray('manufacture_address', manufactureAddressValidationMessage);
        }
        if (!boilerActData.hydraulically_tested_on) {
            return getBasicMessageAndFieldJSONArray('hydraulically_tested_on', hydrulicallyTestedOnValidationMessage);
        }
        if (!boilerActData.hydraulically_tested_to) {
            return getBasicMessageAndFieldJSONArray('hydraulically_tested_to', hydrulicallyTestedValidationMessage);
        }
        if (!boilerActData.repairs && boilerActData.repairs != 0) {
            return getBasicMessageAndFieldJSONArray('repairs', repairsValidationMessage);
        }


        return '';
    },
    askForBoilerAct: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BoilerAct.listview.submitBoilerAct(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitBoilerAct: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var boilerActData = $('#boiler_act_form').serializeFormJSON();
        var validationData = that.checkValidationForBoilerAct(boilerActData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('factory-license-' + validationData.field, validationData.message);
            return false;
        }

        // if (!boilerActData.temp_pipe_line_deawing) {
        //     if (!$('#pipe_line_deawing').val()) {
        //         if (imagePdfUploadValidation('pipe_line_deawing', pipeLineDrawValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!boilerActData.temp_copy_of_challan) {
        //     if (!$('#copy_of_challan').val()) {
        //         if (imagePdfUploadValidation('copy_of_challan', copyOfChallanValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!boilerActData.temp_ibr_document) {
        //     if (!$('#ibr_document').val()) {
        //         if (imagePdfUploadValidation('ibr_document', ibrDocumentValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!boilerActData.temp_sign_of_applicant) {
        //     if (!$('#sign_of_applicant').val()) {
        //         if (imagePdfUploadValidation('sign_of_applicant', applicantSignValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_bolier') : $('#submit_btn_for_bolier');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var boilerActData = new FormData($('#boiler_act_form')[0]);
        boilerActData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        boilerActData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'boileract/submit_boiler_act',
            data: boilerActData,
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
                validationMessageShow('boileract', textStatus.statusText);
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
                    validationMessageShow('boileract', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                BoilerAct.router.navigate('boileract', {'trigger': true});
            }
        });
    },
    viewDocumentFile: function (FileName, boileractId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/boileract/' + boileractId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/boileract/' + boileractId + '/' + FileName + ' style=width:150px;height:100px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="BoilerAct.listview.askForDeleteforDocumentFile(' + boileractId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (boileractId, dbFileNameField, postId, postContainer) {
        if (!boileractId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'BoilerAct.listview.deleteDocumentFile(' + boileractId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (boileractId, dbFileNameField, postId, postContainer) {
        if (!boileractId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'boileract/delete_upload_file_for_boiler_act',
            type: 'POST',
            data: $.extend({}, {'boileract_id': boileractId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
                showError('Some unexpected database error encountered due to which your transaction could not be completed');
            },
            success: function (data) {
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    return false;
                }
                $('.stack-bar-bottom').hide();
                showSuccess(parseData.message);
                $('#temp_' + dbFileNameField).val('');
                $('#' + postContainer).hide();
                $('#' + postContainer).html('');
                $('#' + postId).show();
            }
        });
    },
    generateForm1: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boileract_id_for_boileract_form1').val(boilerId);
        $('#boileract_form1_pdf_form').submit();
        $('#boileract_id_for_boileract_form1').val('');
    },
    openUploadChallan: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + boilerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract/get_boileract_data_by_boileract_id',
            type: 'post',
            data: $.extend({}, {'boiler_id': boilerId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var boilerActData = parseData.boiler_act_data;
                showPopup();
                if (boilerActData.payment_type == VALUE_ONE) {
                    boilerActData.utitle = 'Challan Copy';
                } else {
                    boilerActData.utitle = 'Payment Details';
                }
                boilerActData.module_type = VALUE_THIRTYSEVEN;
                $('#popup_container').html(boilerActUploadChallanTemplate(boilerActData));
                loadFB(VALUE_THIRTYSEVEN, parseData.fb_data, boilerActData.payment_type, boilerActData.show_remove_upload_btn, boilerActData.show_dropdown, boilerActData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'boiler_act_upload_challan', boilerActData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'boiler_act_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYSEVEN);
                if (boilerActData.challan != '') {
                    $('#challan_container_for_boiler_act_upload_challan').hide();
                    $('#challan_name_container_for_boiler_act_upload_challan').show();
                    $('#challan_name_href_for_boiler_act_upload_challan').attr('href', 'documents/boileract/' + boilerActData.challan);
                    $('#challan_name_for_boiler_act_upload_challan').html(boilerActData.challan);
                    $('#challan_remove_btn_for_boiler_act_upload_challan').attr('onclick', 'BoilerAct.listview.removeChallan("' + boilerActData.boiler_id + '")');
                }
            }
        });
    },
    removeChallan: function (boilerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boileract/remove_challan',
            data: $.extend({}, {'boiler_id': boilerId}, getTokenData()),
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
                validationMessageShow('boiler-act-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-act-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-boiler-act-uc').html(parseData.message);
                removeDocument('challan', 'boiler_act_upload_challan');
                $('#status_' + boilerId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-boiler-act-uc').html('');
        validationMessageHide();
        var boilerId = $('#boiler_act_id_for_boiler_act_upload_challan').val();
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_boiler_act_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_boiler_act_upload_challan_1').focus();
            validationMessageShow('boiler-act-uc-payment_type_for_boiler_act_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_boiler_act_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_boiler_act_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_boiler_act_upload_challan').focus();
                validationMessageShow('boiler-act-uc-challan_for_boiler_act_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_boiler_act_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_boiler_act_upload_challan').focus();
                validationMessageShow('boiler-act-uc-challan_for_boiler_act_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYSEVEN, 'boiler-act-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_boiler_act_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#boiler_act_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'boileract/upload_challan',
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
                validationMessageShow('boiler-act-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-act-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + boilerId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + boilerId).show();
                }
                $('#total_fees_' + boilerId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_boiler_act_' + boilerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract/get_boileract_data_by_boileract_id',
            type: 'post',
            data: $.extend({}, {'boiler_id': boilerId}, getTokenData()),
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
                var boilerActData = parseData.boiler_act_data;
                showPopup();
                $('#popup_container').html(boilerActApproveTemplate(boilerActData));
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
        var formData = $('#approve_boiler_act_form').serializeFormJSON();
        if (!formData.boileract_id_for_boiler_act_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_boiler_act_approve) {
            $('#registration_number_for_boiler_act_approve').focus();
            validationMessageShow('boiler-act-approve-registration_number_for_boiler_act_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_boiler_act_approve) {
            $('#valid_upto_for_boiler_act_approve').focus();
            validationMessageShow('boiler-act-approve-valid_upto_for_boiler_act_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_boiler_act_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_boiler_act_approve').focus();
            validationMessageShow('boiler-act-approve-certificate_file_for_boiler_act_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_act_approve) {
            $('#remarks_for_boiler_act_approve').focus();
            validationMessageShow('boiler-act-approve-remarks_for_boiler_act_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_boiler_act_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_boiler_act_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'boileract/approve_application',
            data: newFormData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
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
                validationMessageShow('boiler-act-approve', textStatus.statusText);
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
                    validationMessageShow('boiler-act-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boileract_id_for_boiler_act_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_boiler_act_' + formData.boileract_id_for_boiler_act_approve).remove();
                $('#approve_btn_for_boiler_act_' + formData.boileract_id_for_boiler_act_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.boileract_id_for_boiler_act_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.boileract_id_for_boiler_act_approve).show();
                $('#so_status_' + formData.boileract_id_for_boiler_act_approve).html(dateTimeDays(formData.boileract_id_for_boiler_act_approve, parseData, VALUE_THIRTYSEVEN));
            }
        });
    },
    askForRejectApplication: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_boiler_act_' + boilerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract/get_boileract_data_by_boileract_id',
            type: 'post',
            data: $.extend({}, {'boiler_id': boilerId}, getTokenData()),
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
                var boilerActData = parseData.boiler_act_data;
                showPopup();
                $('#popup_container').html(boilerActRejectTemplate(boilerActData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_boiler_act_form').serializeFormJSON();
        if (!formData.boileract_id_for_boiler_act_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_act_reject) {
            $('#remarks_for_boiler_act_reject').focus();
            validationMessageShow('boiler-act-reject-remarks_for_boiler_act_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boileract/reject_application',
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
                validationMessageShow('boiler-act-reject', textStatus.statusText);
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
                    validationMessageShow('boiler-act-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boileract_id_for_boiler_act_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.boileract_id_for_boiler_act_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.boileract_id_for_boiler_act_reject).remove();
                $('#reject_btn_for_boiler_act_' + formData.boileract_id_for_boiler_act_reject).remove();
                $('#approve_btn_for_boiler_act_' + formData.boileract_id_for_boiler_act_reject).remove();
                $('#so_status_' + formData.boileract_id_for_boiler_act_reject).html(dateTimeDays(formData.boileract_id_for_boiler_act_reject, parseData, VALUE_THIRTYSEVEN));
            }
        });
    },
    generateCertificate: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boiler_id_for_certificate').val(boilerId);
        $('#boiler_certificate_pdf_form').submit();
        $('#boiler_id_for_certificate').val('');
    },
    getQueryData: function (boilerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilerId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYSEVEN;
        templateData.module_id = boilerId;
        var btnObj = $('#query_btn_for_app_' + boilerId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYSEVEN, moduleData.boiler_id);
                tmpData.applicant_name = moduleData.owner_name;
                tmpData.title = 'Owner Name';
                tmpData.module_type = VALUE_THIRTYSEVEN;
                tmpData.module_id = boilerId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (boilerId) {
        if (!boilerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + boilerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract/get_boileract_data_by_boileract_id',
            type: 'post',
            data: $.extend({}, {'boiler_id': boilerId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var boilerActData = parseData.boiler_act_data;
                showPopup();
                if (boilerActData.payment_type == VALUE_ONE || boilerActData.payment_type == VALUE_THREE) {
                    boilerActData.user_payment_type_text = paymentTypeArray[boilerActData.payment_type];
                } else {
                    boilerActData.user_payment_type_text = userPaymentTypeArray[boilerActData.user_payment_type] ? userPaymentTypeArray[boilerActData.user_payment_type] : '';
                }
                if (boilerActData.payment_type == VALUE_ONE) {
                    boilerActData.utitle = 'Fees Paid Challan Copy';
                } else if (boilerActData.payment_type == VALUE_TWO && boilerActData.user_payment_type == VALUE_ONE) {
                    boilerActData.utitle = 'Demand Draft (DD) Copy';
                }
                boilerActData.module_type = VALUE_THIRTYSEVEN;
                $('#popup_container').html(boilerActViewPaymentTemplate(boilerActData));
                loadFB(VALUE_THIRTYSEVEN, parseData.fb_data, boilerActData.payment_type);
                loadPH(VALUE_THIRTYSEVEN, boilerActData.boiler_id, parseData.ph_data);
                if (boilerActData.payment_type == VALUE_ONE || (boilerActData.payment_type == VALUE_TWO && boilerActData.user_payment_type == VALUE_ONE)) {
                    if (boilerActData.fees_paid_challan != '') {
                        $('#vp_container_for_boiler_act').show();
                        $('#fees_paid_challan_name_href_for_boiler_act').attr('href', BOILER_DOC_PATH + boilerActData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_boiler_act').html(boilerActData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
