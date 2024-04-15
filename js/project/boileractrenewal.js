var boilerActRenewalListTemplate = Handlebars.compile($('#boiler_act_renewal_list_template').html());
var boilerActRenewalTableTemplate = Handlebars.compile($('#boiler_act_renewal_table_template').html());
var boilerActRenewalActionTemplate = Handlebars.compile($('#boiler_act_renewal_action_template').html());
var boilerActRenewalFormTemplate = Handlebars.compile($('#boiler_act_renewal_form_template').html());
var boilerActRenewalViewTemplate = Handlebars.compile($('#boiler_act_renewal_view_template').html());
var boilerActRenewalUploadChallanTemplate = Handlebars.compile($('#boiler_act_renewal_upload_challan_template').html());
var boilerActRenewalApproveTemplate = Handlebars.compile($('#boiler_act_renewal_approve_template').html());
var boilerActRenewalRejectTemplate = Handlebars.compile($('#boiler_act_renewal_reject_template').html());
var boilerActRenewalViewPaymentTemplate = Handlebars.compile($('#boiler_act_renewal_view_payment_template').html());
var BoilerActRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
BoilerActRenewal.Router = Backbone.Router.extend({
    routes: {
        'boileract_renewal': 'renderList',
        'boileract_renewal_form': 'renderListForForm',
        'edit_boileract_renewal_form': 'renderList',
        'view_boileract_renewal_form': 'renderList',
    },
    renderList: function () {
        BoilerActRenewal.listview.listPage();
    },
    renderListForForm: function () {
        BoilerActRenewal.listview.listPageBoilerActRenewalForm();
    }
});
BoilerActRenewal.listView = Backbone.View.extend({
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
        addClass('menu_boiler_act_renewal', 'active');
        BoilerActRenewal.router.navigate('boileract_renewal');
        var templateData = {};
        this.$el.html(boilerActRenewalListTemplate(templateData));
        this.loadBoilerActRenewalData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageBoilerActRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_boiler_act_renewal', 'active');
        this.$el.html(boilerActRenewalListTemplate);
        this.newBoilerActRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return boilerActRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYFOUR;
        if (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE || rowData.status == VALUE_FOUR || rowData.status == VALUE_EIGHT || rowData.status == VALUE_NINE) {
            rowData.show_payment_confirm_btn = '';
        } else {
            rowData.show_payment_confirm_btn = 'display: none;';
        }
        //rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return boilerActRenewalActionTemplate(rowData);
    },
    loadBoilerActRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
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
            return getAppNoWithRating(VALUE_FOURTYFOUR, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYFOUR);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['boiler_act_renewal_data'], function (index, objData) {
                json['boiler_act_renewal_data'][index]['query_movement_string'] = qmData[objData.boiler_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.boiler_renewal_id] + '</table>') : '-';
            });
            return json['boiler_act_renewal_data'];
        };
        var that = this;
        BoilerActRenewal.router.navigate('boileract_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'BoilerActRenewal.listview.loadBoilerActRenewalData();');
        $('#boiler_act_renewal_form_and_datatable_container').html(boilerActRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_boiler_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_boiler_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_boiler_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_boiler_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_boiler_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_boiler_renewal_list', false);
        $('#district_for_boiler_renewal_list').val(searchData.search_district);
        $('#status_for_boiler_renewal_list').val(searchData.search_status);
        $('#app_timing_for_renewal_boiler_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_boiler_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_boiler_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_boiler_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_boiler_renewal_list').attr('disabled', 'disabled');
        }
        boilerActRenewalDataTable = $('#boiler_act_renewal_datatable').DataTable({
            ajax: {url: 'boileract_renewal/get_boiler_act_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'boiler_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'boiler_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'boiler_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'boiler_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //}
        $('#boiler_act_renewal_datatable_filter').remove();
        $('#boiler_act_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = boilerActRenewalDataTable.row(tr);
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
    askForNewBoilerActRenewalForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newBoilerActRenewalForm(false, {});
    },
    newBoilerActRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;
        var that = this;
        if (isEdit) {
            var formData = parseData.boiler_act_renewal_data;
            formData.hydraulically_tested_on_text = formData.hydraulically_tested_on != '0000-00-00' ? dateTo_DD_MM_YYYY(formData.hydraulically_tested_on) : '';
            BoilerActRenewal.router.navigate('edit_boileract_renewal_form');
        } else {
            var formData = {};
            BoilerActRenewal.router.navigate('boileract_renewal_form');
        }

        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.boilerActRenewal_data = parseData.boiler_act_renewal_data;
        $('#boiler_act_renewal_form_and_datatable_container').html(boilerActRenewalFormTemplate((templateData)));
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
            if (formData.copy_of_challan != '') {
                $('#copy_of_challan_container_for_boiler').hide();
                $('#copy_of_challan_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.copy_of_challan);
                $('#copy_of_challan_name_container_for_boiler').show();
                $('#copy_of_challan_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.copy_of_challan);
            }
            if (formData.last_boiler_license != '') {
                $('#last_boiler_license_container_for_boiler').hide();
                $('#last_boiler_license_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.last_boiler_license);
                $('#last_boiler_license_name_container_for_boiler').show();
                $('#last_boiler_license_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.last_boiler_license);
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
        $('#boiler_act_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitBoilerActRenewal($('#submit_btn_for_boiler_act_renewal'));
            }
        });
    },
    editOrViewBoilerActRenewal: function (btnObj, boilerActRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!boilerActRenewalId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract_renewal/get_boiler_act_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'boiler_renewal_id': boilerActRenewalId}, getTokenData()),
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
                // var boilerActRenewalData = parseData.boiler_act_renewal_data;
                // boilerActRenewalData.hydraulically_tested_on = dateTo_DD_MM_YYYY(boilerActRenewalData.hydraulically_tested_on);
                if (isEdit) {
                    that.newBoilerActRenewalForm(isEdit, parseData);
                } else {
                    that.viewBoilerActRenewalForm(parseData);
                }
            }
        });
    },
    viewBoilerActRenewalForm: function (parseData) {
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
        //templateData.boilerActRenewal_data = boilerActRenewalData;
        var formData = parseData.boiler_act_renewal_data;
        formData.hydraulically_tested_on_text = formData.hydraulically_tested_on != '0000-00-00' ? dateTo_DD_MM_YYYY(formData.hydraulically_tested_on) : '';
        BoilerActRenewal.router.navigate('view_boileract_renewal_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#boiler_act_renewal_form_and_datatable_container').html(boilerActRenewalViewTemplate(formData));
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
        if (formData.copy_of_challan != '') {
            $('#copy_of_challan_container_for_boiler').hide();
            $('#copy_of_challan_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.copy_of_challan);
            $('#copy_of_challan_name_container_for_boiler').show();
            $('#copy_of_challan_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.copy_of_challan);
        }
        if (formData.last_boiler_license != '') {
            $('#last_boiler_license_container_for_boiler').hide();
            $('#last_boiler_license_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.last_boiler_license);
            $('#last_boiler_license_name_container_for_boiler').show();
            $('#last_boiler_license_name_image_for_boiler_download').attr("href", BOILER_DOC_PATH + formData.last_boiler_license);
        }
        if (formData.sign_of_applicant != '') {
            $('#sign_of_applicant_container_for_boiler').hide();
            $('#sign_of_applicant_name_image_for_boiler').attr('src', BOILER_DOC_PATH + formData.sign_of_applicant);
            $('#sign_of_applicant_name_container_for_boiler').show();
            $('#sign_of_applicant_download').attr("href", BOILER_DOC_PATH + formData.sign_of_applicant);
        }
    },
    checkValidationForBoilerActRenewal: function (boilerActRenewalData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilerActRenewalData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!boilerActRenewalData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', licenseNumberValidationMessage);
        }
        if (!boilerActRenewalData.owner_name) {
            return getBasicMessageAndFieldJSONArray('owner_name', ownerNameValidationMessage);
        }
        if (!boilerActRenewalData.situation_of_boiler) {
            return getBasicMessageAndFieldJSONArray('situation_of_boiler', boilerSituationValidationMessage);
        }
        if (!boilerActRenewalData.boiler_type) {
            return getBasicMessageAndFieldJSONArray('boiler_type', boilerTypeValidationMessage);
        }

        if (!boilerActRenewalData.ut) {
            return getBasicMessageAndFieldJSONArray('ut', utValidationMessage);
        }
        if (!boilerActRenewalData.working_pressure) {
            return getBasicMessageAndFieldJSONArray('working_pressure', workingPressureValidationMessage);
        }
        if (!boilerActRenewalData.max_pressure) {
            return getBasicMessageAndFieldJSONArray('max_pressure', maxPressureValidationMessage);
        }
        if (!boilerActRenewalData.heating_surface_area) {
            return getBasicMessageAndFieldJSONArray('heating_surface_area', heatingSurfaceValidationMessage);
        }
        if (!boilerActRenewalData.length_of_pipes) {
            return getBasicMessageAndFieldJSONArray('length_of_pipes', lengthPipesValidationMessage);
        }
        if (!boilerActRenewalData.max_evaporation) {
            return getBasicMessageAndFieldJSONArray('max_evaporation', maxEvaporationValidationMessage);
        }
        if (!boilerActRenewalData.place_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('place_of_manufacture', manufacturePlaceValidationMessage);
        }
        if (!boilerActRenewalData.year_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('year_of_manufacture', manufactureYearValidationMessage);
        }
        if (!boilerActRenewalData.name_of_manufacture) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacture', manufactureNameValidationMessage);
        }
        if (!boilerActRenewalData.manufacture_address) {
            return getBasicMessageAndFieldJSONArray('manufacture_address', manufactureAddressValidationMessage);
        }
        if (!boilerActRenewalData.hydraulically_tested_on) {
            return getBasicMessageAndFieldJSONArray('hydraulically_tested_on', hydrulicallyTestedOnValidationMessage);
        }
        if (!boilerActRenewalData.hydraulically_tested_to) {
            return getBasicMessageAndFieldJSONArray('hydraulically_tested_to', hydrulicallyTestedValidationMessage);
        }
        if (!boilerActRenewalData.repairs && boilerActRenewalData.repairs != 0) {
            return getBasicMessageAndFieldJSONArray('repairs', repairsValidationMessage);
        }


        return '';
    },
    askForBoilerActRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BoilerActRenewal.listview.submitBoilerActRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitBoilerActRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var boilerActRenewalData = $('#boiler_act_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForBoilerActRenewal(boilerActRenewalData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('boiler-act-renewal-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#company_letter_head_container_for_boiler').is(':visible')) {
            var companyLetterHead = $('#company_letter_head_for_boiler').val();
            if (companyLetterHead == '') {
                $('#company_letter_head_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-company_letter_head_for_boiler', uploadDocumentValidationMessage);
                return false;
            }
            var companyLetterHeadMessage = pdffileUploadValidation('company_letter_head_for_boiler');
            if (companyLetterHeadMessage != '') {
                $('#company_letter_head_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-company_letter_head_for_boiler', companyLetterHeadMessage);
                return false;
            }
        }
        if ($('#copy_of_challan_container_for_boiler').is(':visible')) {
            var copyOfChallan = $('#copy_of_challan_for_boiler').val();
            if (copyOfChallan == '') {
                $('#copy_of_challan_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-copy_of_challan_for_boiler', uploadDocumentValidationMessage);
                return false;
            }
            var copyOfChallanMessage = pdffileUploadValidation('copy_of_challan_for_boiler');
            if (copyOfChallanMessage != '') {
                $('#copy_of_challan_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-copy_of_challan_for_boiler', copyOfChallanMessage);
                return false;
            }
        }
        if ($('#last_boiler_license_container_for_boiler').is(':visible')) {
            var lastBoilerLicense = $('#last_boiler_license_for_boiler').val();
            if (lastBoilerLicense == '') {
                $('#last_boiler_license_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-last_boiler_license_for_boiler', uploadDocumentValidationMessage);
                return false;
            }
            var lastBoilerLicenseMessage = pdffileUploadValidation('last_boiler_license_for_boiler');
            if (lastBoilerLicenseMessage != '') {
                $('#last_boiler_license_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-last_boiler_license_for_boiler', lastBoilerLicenseMessage);
                return false;
            }
        }
        if ($('#sign_of_applicant_container_for_boiler').is(':visible')) {
            var signOfApplicant = $('#sign_of_applicant_for_boiler').val();
            if (signOfApplicant == '') {
                $('#sign_of_applicant_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-sign_of_applicant_for_boiler', uploadDocumentValidationMessage);
                return false;
            }
            var signOfApplicantMessage = imagefileUploadValidation('sign_of_applicant_for_boiler');
            if (signOfApplicantMessage != '') {
                $('#sign_of_applicant_for_boiler').focus();
                validationMessageShow('boiler-act-renewal-sign_of_applicant_for_boiler', signOfApplicantMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_bolier') : $('#submit_btn_for_bolier');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var boilerActRenewalData = new FormData($('#boiler_act_renewal_form')[0]);
        boilerActRenewalData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        boilerActRenewalData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/submit_boiler_act_renewal',
            data: boilerActRenewalData,
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
                validationMessageShow('boileract_renewal', textStatus.statusText);
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
                    validationMessageShow('boileract_renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                BOCW.router.navigate('boileract_renewal', {'trigger': true});
            }
        });
    },
    askForRemove: function (boilerRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BoilerActRenewal.listview.removeDocument(\'' + boilerRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (boilerRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/remove_document',
            data: $.extend({}, {'boiler_renewal_id': boilerRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('boileract_renewal', textStatus.statusText);
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
                    validationMessageShow('boileract_renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_boiler').hide();
                $('#' + docId + '_name_image_for_boiler').attr('src', '');
                $('#' + docId + '_container_for_boiler').show();
                $('#' + docId + '_for_boiler').val('');
            }
        });
    },
    generateForm1: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boileract_renewal_id_for_boileract_renewal_form1').val(boilerRenewalId);
        $('#boileract_renewal_form1_pdf_form').submit();
        $('#boileract_renewal_id_for_boileract_renewal_form1').val('');
    },
    openUploadChallan: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + boilerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract_renewal/get_boileract_renewal_data_by_boileract_renewal_id',
            type: 'post',
            data: $.extend({}, {'boileract_renewal_id': boilerRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var boilerActRenewalData = parseData.boiler_act_renewal_data;
                showPopup();
                if (boilerActRenewalData.payment_type == VALUE_ONE) {
                    boilerActRenewalData.utitle = 'Challan Copy';
                } else {
                    boilerActRenewalData.utitle = 'Payment Details';
                }
                boilerActRenewalData.module_type = VALUE_FOURTYFOUR;
                $('#popup_container').html(boilerActRenewalUploadChallanTemplate(boilerActRenewalData));
                loadFB(VALUE_FOURTYFOUR, parseData.fb_data, boilerActRenewalData.payment_type, boilerActRenewalData.show_remove_upload_btn, boilerActRenewalData.show_dropdown, boilerActRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'boiler_act_renewal_upload_challan', boilerActRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'boiler_act_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYFOUR);
                if (boilerActRenewalData.challan != '') {
                    $('#challan_container_for_boiler_act_renewal_upload_challan').hide();
                    $('#challan_name_container_for_boiler_act_renewal_upload_challan').show();
                    $('#challan_name_href_for_boiler_act_renewal_upload_challan').attr('href', 'documents/boileract/' + boilerActRenewalData.challan);
                    $('#challan_name_for_boiler_act_renewal_upload_challan').html(boilerActRenewalData.challan);
                    $('#challan_remove_btn_for_boiler_act_renewal_upload_challan').attr('onclick', 'BoilerActRenewal.listview.removeChallan("' + boilerActRenewalData.boiler_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (boilerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/remove_challan',
            data: $.extend({}, {'boileract_renewal_id': boilerRenewalId}, getTokenData()),
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
                validationMessageShow('boiler-act-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-act-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-boiler-act-renewal-uc').html(parseData.message);
                removeDocument('challan', 'boiler_act_renewal_upload_challan');
                $('#status_' + boilerRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-boiler-act-renewal-uc').html('');
        validationMessageHide();
        var boilerRenewalId = $('#boiler_act_renewal_id_for_boiler_act_renewal_upload_challan').val();
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_boiler_act_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_boiler_act_renewal_upload_challan_1').focus();
            validationMessageShow('boiler-act-renewal-uc-payment_type_for_boiler_act_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_boiler_act_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_boiler_act_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_boiler_act_renewal_upload_challan').focus();
                validationMessageShow('boiler-act-renewal-uc-challan_for_boiler_act_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_boiler_act_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_boiler_act_renewal_upload_challan').focus();
                validationMessageShow('boiler-act-renewal-uc-challan_for_boiler_act_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYFOUR, 'boiler-act-renewal-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_boiler_act_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#boiler_act_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/upload_challan',
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
                validationMessageShow('boiler-act-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-act-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + boilerRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + boilerRenewalId).show();
                }
                $('#total_fees_' + boilerRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_boiler_act_renewal_' + boilerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract_renewal/get_boileract_renewal_data_by_boileract_renewal_id',
            type: 'post',
            data: $.extend({}, {'boileract_renewal_id': boilerRenewalId}, getTokenData()),
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
                var boilerActRenewalData = parseData.boiler_act_renewal_data;
                showPopup();
                $('#popup_container').html(boilerActRenewalApproveTemplate(boilerActRenewalData));
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
        var formData = $('#approve_boiler_act_renewal_form').serializeFormJSON();
        if (!formData.boileract_renewal_id_for_boiler_act_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_boiler_act_renewal_approve) {
            $('#registration_number_for_boiler_act_renewal_approve').focus();
            validationMessageShow('boiler-act-renewal-approve-registration_number_for_boiler_act_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_boiler_act_renewal_approve) {
            $('#valid_upto_for_boiler_act_renewal_approve').focus();
            validationMessageShow('boiler-act-renewal-approve-valid_upto_for_boiler_act_renewal_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_boiler_act_renewal_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_boiler_act_renewal_approve').focus();
            validationMessageShow('boiler-act-renewal-approve-certificate_file_for_boiler_act_renewal_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_act_renewal_approve) {
            $('#remarks_for_boiler_act_renewal_approve').focus();
            validationMessageShow('boiler-act-renewal-approve-remarks_for_boiler_act_renewal_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_boiler_act_renewal_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_boiler_act_renewal_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/approve_application',
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
                validationMessageShow('boiler-act-renewal-approve', textStatus.statusText);
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
                    validationMessageShow('boiler-act-renewal-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).show();
                $('#so_status_' + formData.boileract_renewal_id_for_boiler_act_renewal_approve).html(dateTimeDays(formData.boileract_renewal_id_for_boiler_act_renewal_approve, parseData, VALUE_FOURTYFOUR));
            }
        });
    },
    askForRejectApplication: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + boilerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract_renewal/get_boileract_renewal_data_by_boileract_renewal_id',
            type: 'post',
            data: $.extend({}, {'boileract_renewal_id': boilerRenewalId}, getTokenData()),
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
                var boilerActRenewalData = parseData.boiler_act_renewal_data;
                showPopup();
                $('#popup_container').html(boilerActRenewalRejectTemplate(boilerActRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_boiler_act_renewal_form').serializeFormJSON();
        if (!formData.boileract_renewal_id_for_boiler_act_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_act_renewal_reject) {
            $('#remarks_for_boiler_act_renewal_reject').focus();
            validationMessageShow('boiler-act-renewal-reject-remarks_for_boiler_act_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boileract_renewal/reject_application',
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
                validationMessageShow('boiler-act-renewal-reject', textStatus.statusText);
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
                    validationMessageShow('boiler-act-renewal-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).remove();
                $('#so_status_' + formData.boileract_renewal_id_for_boiler_act_renewal_reject).html(dateTimeDays(formData.boileract_renewal_id_for_boiler_act_renewal_reject, parseData, VALUE_FOURTYFOUR));
            }
        });
    },
    generateCertificate: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boiler_renewal_id_for_certificate').val(boilerRenewalId);
        $('#boiler_renewal_certificate_pdf_form').submit();
        $('#boiler_renewal_id_for_certificate').val('');
    },
    getQueryData: function (boilerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilerRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYFOUR;
        templateData.module_id = boilerRenewalId;
        var btnObj = $('#query_btn_for_app_' + boilerRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYFOUR, moduleData.boiler_renewal_id);
                tmpData.applicant_name = moduleData.owner_name;
                tmpData.title = 'Owner Name';
                tmpData.module_type = VALUE_FOURTYFOUR;
                tmpData.module_id = boilerRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (boilerRenewalId) {
        if (!boilerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + boilerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boileract_renewal/get_boileract_renewal_data_by_boileract_renewal_id',
            type: 'post',
            data: $.extend({}, {'boileract_renewal_id': boilerRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var boilerActRenewalData = parseData.boiler_act_renewal_data;
                showPopup();
                if (boilerActRenewalData.payment_type == VALUE_ONE || boilerActRenewalData.payment_type == VALUE_THREE) {
                    boilerActRenewalData.user_payment_type_text = paymentTypeArray[boilerActRenewalData.payment_type];
                } else {
                    boilerActRenewalData.user_payment_type_text = userPaymentTypeArray[boilerActRenewalData.user_payment_type] ? userPaymentTypeArray[boilerActRenewalData.user_payment_type] : '';
                }
                if (boilerActRenewalData.payment_type == VALUE_ONE) {
                    boilerActRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (boilerActRenewalData.payment_type == VALUE_TWO && boilerActRenewalData.user_payment_type == VALUE_ONE) {
                    boilerActRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                boilerActRenewalData.module_type = VALUE_FOURTYFOUR;
                $('#popup_container').html(boilerActRenewalViewPaymentTemplate(boilerActRenewalData));
                loadFB(VALUE_FOURTYFOUR, parseData.fb_data, boilerActRenewalData.payment_type);
                loadPH(VALUE_FOURTYFOUR, boilerActRenewalData.boiler_renewal_id, parseData.ph_data);
                if (boilerActRenewalData.payment_type == VALUE_ONE || (boilerActRenewalData.payment_type == VALUE_TWO && boilerActRenewalData.user_payment_type == VALUE_ONE)) {
                    if (boilerActRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_boiler_act_renewal').show();
                        $('#fees_paid_challan_name_href_for_boiler_act_renewal').attr('href', BOILER_DOC_PATH + boilerActRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_boiler_act_renewal').html(boilerActRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
