var dealerRenewalListTemplate = Handlebars.compile($('#dealer_renewal_list_template').html());
var dealerRenewalTableTemplate = Handlebars.compile($('#dealer_renewal_table_template').html());
var dealerRenewalActionTemplate = Handlebars.compile($('#dealer_renewal_action_template').html());
var dealerRenewalFormTemplate = Handlebars.compile($('#dealer_renewal_form_template').html());
var dealerRenewalViewTemplate = Handlebars.compile($('#dealer_renewal_view_template').html());
var dealerRenewalProprietorInfoTemplate = Handlebars.compile($('#dealer_renewal_proprietor_info_template').html());
var dealerRenewalUploadChallanTemplate = Handlebars.compile($('#dealer_renewal_upload_challan_template').html());
var dealerRenewalApproveTemplate = Handlebars.compile($('#dealer_renewal_approve_template').html());
var dealerRenewalRejectTemplate = Handlebars.compile($('#dealer_renewal_reject_template').html());
var dealerRenewalViewPaymentTemplate = Handlebars.compile($('#dealer_renewal_view_payment_template').html());

var tempPersonCnt = 1;

var DealerRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
DealerRenewal.Router = Backbone.Router.extend({
    routes: {
        'dealer_renewal': 'renderList',
        'dealer_renewal_form': 'renderListForForm',
        'edit_dealer_renewal_form': 'renderList',
        'view_dealer_renewal_form': 'renderList',
    },
    renderList: function () {
        DealerRenewal.listview.listPage();
    },
    renderListForForm: function () {
        DealerRenewal.listview.listPageDealerRenewalForm();
    }
});
DealerRenewal.listView = Backbone.View.extend({
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
        addClass('dealer_renewal', 'active');
        DealerRenewal.router.navigate('dealer_renewal');
        var templateData = {};
        this.$el.html(dealerRenewalListTemplate(templateData));
        this.loadDealerRenewalData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageDealerRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('dealer_renewal', 'active');
        this.$el.html(dealerRenewalListTemplate);
        this.newDealerRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return dealerRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FIFTEEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return dealerRenewalActionTemplate(rowData);
    },
    loadDealerRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_dealer + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.complete_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FIFTEEN, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FIFTEEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['dealer_renewal_data'], function (index, objData) {
                json['dealer_renewal_data'][index]['query_movement_string'] = qmData[objData.dealer_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.dealer_renewal_id] + '</table>') : '-';
            });
            return json['dealer_renewal_data'];
        };
        var that = this;
        DealerRenewal.router.navigate('dealer_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'DealerRenewal.listview.loadDealerRenewalData();');
        $('#dealer_renewal_form_and_datatable_container').html(dealerRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_dealer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_dealer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_dealer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_dealer_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_dealer_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_dealer_renewal_list', false);
        $('#district_for_dealer_renewal_list').val(searchData.search_district);
        $('#status_for_dealer_renewal_list').val(searchData.search_status);
        $('#app_timing_for_dealer_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_dealer_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_dealer_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_dealer_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_dealer_renewal_list').attr('disabled', 'disabled');
        }
        dealerDataTable = $('#dealer_renewal_datatable').DataTable({
            ajax: {url: 'dealer_renewal/get_dealer_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'dealer_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'dealer_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'dealer_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'dealer_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#dealer_renewal_datatable_filter').remove();
        $('#dealer_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = dealerDataTable.row(tr);

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
    newDealerRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.dealer_renewal_data;
            DealerRenewal.router.navigate('edit_dealer_renewal_form');
        } else {
            var formData = {};
            DealerRenewal.router.navigate('dealer_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.dealer_renewal_data = parseData.dealer_renewal_data;
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        templateData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        $('#dealer_renewal_form_and_datatable_container').html(dealerRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        // renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status', false);
        // renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice', false);
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');
            $('#declarationthree').attr('checked', 'checked');


            $('#identity_choice').val(formData.identity_choice);

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_dealer').hide();
                $('#seal_and_stamp_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_dealer').show();
                $('#seal_and_stamp_download').attr("href", DEALER_DOC_PATH + formData.signature);
            }
            if (formData.import_model != '') {
                $('#import_model_container_for_dealer').hide();
                $('#import_model_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.import_model);
                $('#import_model_name_container_for_dealer').show();
                $('#import_model_download').attr("href", DEALER_DOC_PATH + formData.import_model);
            }
            if (formData.original_licence != '') {
                $('#original_licence_container_for_dealer').hide();
                $('#original_licence_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.original_licence);
                $('#original_licence_name_container_for_dealer').show();
                $('#original_licence_download').attr("href", DEALER_DOC_PATH + formData.original_licence);
            }
            if (formData.renewed_licence != '') {
                $('#renewed_licence_container_for_dealer').hide();
                $('#renewed_licence_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.renewed_licence);
                $('#renewed_licence_name_container_for_dealer').show();
                $('#renewed_licence_download').attr("href", DEALER_DOC_PATH + formData.renewed_licence);
            }
            if (formData.periodical_return != '') {
                $('#periodical_return_container_for_dealer').hide();
                $('#periodical_return_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.periodical_return);
                $('#periodical_return_name_container_for_dealer').show();
                $('#periodical_return_download').attr("href", DEALER_DOC_PATH + formData.periodical_return);
            }
            if (formData.verification_certificate != '') {
                $('#verification_certificate_container_for_dealer').hide();
                $('#verification_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.verification_certificate);
                $('#verification_certificate_name_container_for_dealer').show();
                $('#verification_certificate_download').attr("href", DEALER_DOC_PATH + formData.verification_certificate);
            }

            if (formData.is_limited_company == isChecked) {
                $('#is_limited_company').attr('checked', 'checked');
                this.$('.proprietor_info_div').show();

                var proprietorInfo = JSON.parse(formData.proprietor_details);
                $.each(proprietorInfo, function (key, value) {
                    that.addMultipleProprietor(value);
                })

            }
            if (formData.import_from_outside == isChecked) {
                $('#import_from_outside').attr('checked', 'checked');
                this.$('.import_from_outside_div').show();
            }
            if (formData.any_previous_application == isChecked) {
                $('#any_previous_application').attr('checked', 'checked');
                this.$('.any_previous_application_div').show();
            }
        }

        generateSelect2();
        datePicker();
        $('#dealer_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitDealerRenewal($('#submit_btn_for_dealer'));
            }
        });
    },
    editOrViewDealerRenewal: function (btnObj, dealerRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!dealerRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer_renewal/get_dealer_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId}, getTokenData()),
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
                    that.newDealerRenewalForm(isEdit, parseData);
                } else {
                    that.viewDealerRenewalForm(parseData);
                }
            }
        });
    },
    viewDealerRenewalForm: function (parseData) {
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
        var formData = parseData.dealer_renewal_data;
        DealerRenewal.router.navigate('view_dealer_renewal_form');
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#dealer_renewal_form_and_datatable_container').html(dealerRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');

        $('#identity_choice').val(formData.identity_choice);
        if (formData.is_limited_company == isChecked) {
            $('#is_limited_company').attr('checked', 'checked');
            this.$('.proprietor_info_div').show();

            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })

        }
        if (formData.import_from_outside == isChecked) {
            $('#import_from_outside').attr('checked', 'checked');
            this.$('.import_from_outside_div').show();
        }
        if (formData.any_previous_application == isChecked) {
            $('#any_previous_application').attr('checked', 'checked');
            this.$('.any_previous_application_div').show();
        }


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_dealer').hide();
            $('#seal_and_stamp_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_dealer').show();
            $('#seal_and_stamp_download').attr("href", DEALER_DOC_PATH + formData.signature);
        }

        if (formData.import_model != '') {
            $('#import_model_container_for_dealer').hide();
            $('#import_model_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.import_model);
            $('#import_model_name_container_for_dealer').show();
            $('#import_model_download').attr("href", DEALER_DOC_PATH + formData.import_model);
        }
        if (formData.original_licence != '') {
            $('#original_licence_container_for_dealer').hide();
            $('#original_licence_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.original_licence);
            $('#original_licence_name_container_for_dealer').show();
            $('#original_licence_download').attr("href", DEALER_DOC_PATH + formData.original_licence);
        }
        if (formData.renewed_licence != '') {
            $('#renewed_licence_container_for_dealer').hide();
            $('#renewed_licence_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.renewed_licence);
            $('#renewed_licence_name_container_for_dealer').show();
            $('#renewed_licence_download').attr("href", DEALER_DOC_PATH + formData.renewed_licence);
        }
        if (formData.periodical_return != '') {
            $('#periodical_return_container_for_dealer').hide();
            $('#periodical_return_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.periodical_return);
            $('#periodical_return_name_container_for_dealer').show();
            $('#periodical_return_download').attr("href", DEALER_DOC_PATH + formData.periodical_return);
        }
        if (formData.verification_certificate != '') {
            $('#verification_certificate_container_for_dealer').hide();
            $('#verification_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.verification_certificate);
            $('#verification_certificate_name_container_for_dealer').show();
            $('#verification_certificate_download').attr("href", DEALER_DOC_PATH + formData.verification_certificate);
        }

    },
    checkValidationForDealerRenewal: function (dealerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!dealerData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!dealerData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!dealerData.admin_registration_number) {
            return getBasicMessageAndFieldJSONArray('admin_registration_number', licenseNumberValidationMessage);
        }
        if (!dealerData.name_of_dealer) {
            return getBasicMessageAndFieldJSONArray('name_of_dealer', dealerNameValidationMessage);
        }
        if (!dealerData.complete_address) {
            return getBasicMessageAndFieldJSONArray('complete_address', workshopAddressValidationMessage);
        }
        if (!dealerData.establishment_date) {
            return getBasicMessageAndFieldJSONArray('establishment_date', establishmentDateValidationMessage);
        }
        if (!dealerData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', shopDateValidationMessage);
        }
        if (!dealerData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', shopRegNoValidationMessage);
        }
        if (!dealerData.categories_sold) {
            return getBasicMessageAndFieldJSONArray('categories_sold', categoriesSoldValidationMessage);
        }
        if (!dealerData.identity_choice) {
            return getBasicMessageAndFieldJSONArray('identity_choice', identityChoiceValidationMessage);
        }
        if (!dealerData.identity_number) {
            return getBasicMessageAndFieldJSONArray('identity_number', identityNoValidationMessage);
        }
        if (!dealerData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        if (!dealerData.declarationtwo) {
            return getBasicMessageAndFieldJSONArray('declarationtwo', declarationTwoValidationMessage);
        }
        if (!dealerData.declarationthree) {
            return getBasicMessageAndFieldJSONArray('declarationthree', declarationThreeValidationMessage);
        }

        return '';
    },
    askForSubmitDealerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'DealerRenewal.listview.submitDealerRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitDealerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var dealerData = $('#dealer_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForDealerRenewal(dealerData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('dealer-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;
        if (dealerData.is_limited_company == isChecked) {
            $('.proprietor_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var proprietorInfo = {};
                var occupierName = $('#occupier_name_' + cnt).val();
                if (occupierName == '' || occupierName == null) {
                    $('#occupier_name_' + cnt).focus();
                    validationMessageShow('dealer-' + cnt, occupierNameValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.occupier_name = occupierName;

                var address = $('#address_' + cnt).val();
                if (address == '' || address == null) {
                    $('#address_' + cnt).focus();
                    validationMessageShow('dealer-' + cnt, proprietorAddressValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.address = address;
                proprietorInfoItem.push(proprietorInfo);
            });
        }

        if (isproprietorValidation) {
            return false;
        }

        if ($('#seal_and_stamp_container_for_dealer').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_dealer').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_dealer').focus();
                validationMessageShow('dealer-seal_and_stamp_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_dealer');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_dealer').focus();
                validationMessageShow('dealer-seal_and_stamp_for_dealer', sealAndStampMessage);
                return false;
            }
        }
        if (dealerData.import_from_outside == isChecked) {
            if ($('#import_model_container_for_dealer').is(':visible')) {
                var supportDocument = $('#import_model_for_dealer').val();
                if (supportDocument == '') {
                    $('#import_model_for_dealer').focus();
                    validationMessageShow('dealer-import_model_for_dealer', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('import_model_for_dealer');
                if (supportDocumentMessage != '') {
                    $('#import_model_for_dealer').focus();
                    validationMessageShow('dealer-import_model_for_dealer', supportDocumentMessage);
                    return false;
                }
            }
        }
        if ($('#original_licence_container_for_dealer').is(':visible')) {
            var supportDocument = $('#original_licence_for_dealer').val();
            if (supportDocument == '') {
                $('#original_licence_for_dealer').focus();
                validationMessageShow('dealer-original_licence_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('original_licence_for_dealer');
            if (supportDocumentMessage != '') {
                $('#original_licence_for_dealer').focus();
                validationMessageShow('dealer-original_licence_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#renewed_licence_container_for_dealer').is(':visible')) {
            var supportDocument = $('#renewed_licence_for_dealer').val();
            if (supportDocument == '') {
                $('#renewed_licence_for_dealer').focus();
                validationMessageShow('dealer-renewed_licence_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('renewed_licence_for_dealer');
            if (supportDocumentMessage != '') {
                $('#renewed_licence_for_dealer').focus();
                validationMessageShow('dealer-renewed_licence_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#periodical_return_container_for_dealer').is(':visible')) {
            var supportDocument = $('#periodical_return_for_dealer').val();
            if (supportDocument == '') {
                $('#periodical_return_for_dealer').focus();
                validationMessageShow('dealer-periodical_return_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('periodical_return_for_dealer');
            if (supportDocumentMessage != '') {
                $('#periodical_return_for_dealer').focus();
                validationMessageShow('dealer-periodical_return_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#verification_certificate_container_for_dealer').is(':visible')) {
            var supportDocument = $('#verification_certificate_for_dealer').val();
            if (supportDocument == '') {
                $('#verification_certificate_for_dealer').focus();
                validationMessageShow('dealer-verification_certificate_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('verification_certificate_for_dealer');
            if (supportDocumentMessage != '') {
                $('#verification_certificate_for_dealer').focus();
                validationMessageShow('dealer-verification_certificate_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_dealer') : $('#submit_btn_for_dealer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var dealerData = new FormData($('#dealer_renewal_form')[0]);
        dealerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        dealerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        dealerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/submit_dealer_renewal',
            data: dealerData,
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
                validationMessageShow('dealer', textStatus.statusText);
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
                    validationMessageShow('dealer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                DealerRenewal.router.navigate('dealer_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (dealerRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'DealerRenewal.listview.removeDocument(\'' + dealerRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (dealerRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/remove_document',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('dealer', textStatus.statusText);
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
                    validationMessageShow('dealer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_dealer').hide();
                $('#' + docId + '_name_image_for_dealer').attr('src', '');
                $('#' + docId + '_container_for_dealer').show();
                $('#' + docId + '_for_dealer').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(dealerRenewalProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#dealer_renewal_id_for_dealer_renewal_form1').val(dealerRenewalId);
        $('#dealer_renewal_form1_pdf_form').submit();
        $('#dealer_renewal_id_for_dealer_renewal_form1').val('');
    },

    openUploadChallan: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + dealerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer_renewal/get_dealer_renewal_data_by_dealer_renewal_id',
            type: 'post',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var dealerRenewalData = parseData.dealer_renewal_data;
                showPopup();
                if (dealerRenewalData.payment_type == VALUE_ONE) {
                    dealerRenewalData.utitle = 'Challan Copy';
                } else {
                    dealerRenewalData.utitle = 'Payment Details';
                }
                dealerRenewalData.module_type = VALUE_FIFTEEN;
                $('#popup_container').html(dealerRenewalUploadChallanTemplate(dealerRenewalData));
                loadFB(VALUE_FIFTEEN, parseData.fb_data, dealerRenewalData.payment_type, dealerRenewalData.show_remove_upload_btn, dealerRenewalData.show_dropdown, dealerRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'dealer_renewal_upload_challan', dealerRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'dealer_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FIFTEEN);
                if (dealerRenewalData.challan != '') {
                    $('#challan_container_for_dealer_renewal_upload_challan').hide();
                    $('#challan_name_container_for_dealer_renewal_upload_challan').show();
                    $('#challan_name_href_for_dealer_renewal_upload_challan').attr('href', 'documents/dealer/' + dealerRenewalData.challan);
                    $('#challan_name_for_dealer_renewal_upload_challan').html(dealerRenewalData.challan);
                    $('#challan_remove_btn_for_dealer_renewal_upload_challan').attr('onclick', 'DealerRenewal.listview.removeChallan("' + dealerRenewalData.dealer_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (dealerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/remove_challan',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId}, getTokenData()),
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
                validationMessageShow('dealer-uc', textStatus.statusText);
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
                    validationMessageShow('dealer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-dealer-uc').html(parseData.message);
                removeDocument('challan', 'dealer_renewal_upload_challan');
                $('#status_' + dealerRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-dealer-uc').html('');
        validationMessageHide();
        var dealerRenewalId = $('#dealer_renewal_id_for_dealer_renewal_upload_challan').val();
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_dealer_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_dealer_renewal_upload_challan_1').focus();
            validationMessageShow('dealer-uc-payment_type_for_dealer_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_dealer_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_dealer_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_dealer_renewal_upload_challan').focus();
                validationMessageShow('dealer-uc-challan_for_dealer_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_dealer_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_dealer_renewal_upload_challan').focus();
                validationMessageShow('dealer-uc-challan_for_dealer_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FIFTEEN, 'dealer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_dealer_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#dealer_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/upload_challan',
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
                validationMessageShow('dealer-uc', textStatus.statusText);
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
                    validationMessageShow('dealer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + dealerRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + dealerRenewalId).show();
                }
                $('#total_fees_' + dealerRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + dealerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer_renewal/get_dealer_renewal_data_by_dealer_renewal_id',
            type: 'post',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId}, getTokenData()),
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
                var dealerRenewalData = parseData.dealer_renewal_data;
                showPopup();
                $('#popup_container').html(dealerRenewalApproveTemplate(dealerRenewalData));
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
        var formData = $('#approve_dealer_renewal_form').serializeFormJSON();
        if (!formData.dealer_renewal_id_for_dealer_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_dealer_renewal_approve) {
            $('#registration_number_for_dealer_renewal_approve').focus();
            validationMessageShow('dealer-approve-registration_number_for_dealer_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_dealer_renewal_approve) {
            $('#valid_upto_for_dealer_renewal_approve').focus();
            validationMessageShow('dealer-approve-valid_upto_for_dealer_renewal_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_dealer_renewal_approve) {
            $('#remarks_for_dealer_renewal_approve').focus();
            validationMessageShow('dealer-approve-remarks_for_dealer_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/approve_application',
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
                validationMessageShow('dealer-approve', textStatus.statusText);
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
                    validationMessageShow('dealer-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.dealer_renewal_id_for_dealer_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.dealer_renewal_id_for_dealer_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.dealer_renewal_id_for_dealer_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.dealer_renewal_id_for_dealer_renewal_approve).show();
                $('#so_status_' + formData.dealer_renewal_id_for_dealer_renewal_approve).html(dateTimeDays(formData.dealer_renewal_id_for_dealer_renewal_approve, parseData, VALUE_FIFTEEN));
            }
        });
    },
    askForRejectApplication: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + dealerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer_renewal/get_dealer_renewal_data_by_dealer_renewal_id',
            type: 'post',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId}, getTokenData()),
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
                var dealerRenewalData = parseData.dealer_renewal_data;
                showPopup();
                $('#popup_container').html(dealerRenewalRejectTemplate(dealerRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_dealer_renewal_form').serializeFormJSON();
        if (!formData.dealer_renewal_id_for_dealer_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_dealer_renewal_reject) {
            $('#remarks_for_dealer_renewal_reject').focus();
            validationMessageShow('dealer-reject-remarks_for_dealer_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer_renewal/reject_renewal_application',
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
                validationMessageShow('dealer-reject', textStatus.statusText);
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
                    validationMessageShow('dealer-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.dealer_renewal_id_for_dealer_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.dealer_renewal_id_for_dealer_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.dealer_renewal_id_for_dealer_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.dealer_renewal_id_for_dealer_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.dealer_renewal_id_for_dealer_renewal_reject).remove();
                $('#so_status_' + formData.dealer_renewal_id_for_dealer_renewal_reject).html(dateTimeDays(formData.dealer_renewal_id_for_dealer_renewal_reject, parseData, VALUE_FIFTEEN));
            }
        });
    },
    generateCertificate: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#dealer_renewal_id_for_certificate').val(dealerRenewalId);
        $('#dealer_renewal_certificate_pdf_form').submit();
        $('#dealer_renewal_id_for_certificate').val('');
    },
    getQueryData: function (dealerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!dealerRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FIFTEEN;
        templateData.module_id = dealerRenewalId;
        var btnObj = $('#query_btn_for_wm_' + dealerRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FIFTEEN, moduleData.dealer_renewal_id);
                tmpData.applicant_name = moduleData.name_of_dealer;
                tmpData.title = 'Dealer Name';
                tmpData.module_type = VALUE_FIFTEEN;
                tmpData.module_id = dealerRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (dealerRenewalId) {
        if (!dealerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + dealerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer_renewal/get_dealer_renewal_data_by_dealer_renewal_id',
            type: 'post',
            data: $.extend({}, {'dealer_renewal_id': dealerRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var dealerRenewalData = parseData.dealer_renewal_data;
                showPopup();
                if (dealerRenewalData.payment_type == VALUE_ONE || dealerRenewalData.payment_type == VALUE_THREE) {
                    dealerRenewalData.user_payment_type_text = paymentTypeArray[dealerRenewalData.payment_type];
                } else {
                    dealerRenewalData.user_payment_type_text = userPaymentTypeArray[dealerRenewalData.user_payment_type] ? userPaymentTypeArray[dealerRenewalData.user_payment_type] : '';
                }
                if (dealerRenewalData.payment_type == VALUE_ONE) {
                    dealerRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (dealerRenewalData.payment_type == VALUE_TWO && dealerRenewalData.user_payment_type == VALUE_ONE) {
                    dealerRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                dealerRenewalData.module_type = VALUE_FIFTEEN;
                $('#popup_container').html(dealerRenewalViewPaymentTemplate(dealerRenewalData));
                loadFB(VALUE_FIFTEEN, parseData.fb_data, dealerRenewalData.payment_type);
                loadPH(VALUE_FIFTEEN, dealerRenewalData.dealer_renewal_id, parseData.ph_data);
                if (dealerRenewalData.payment_type == VALUE_ONE || (dealerRenewalData.payment_type == VALUE_TWO && dealerRenewalData.user_payment_type == VALUE_ONE)) {
                    if (dealerRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_dealer_renewal').show();
                        $('#fees_paid_challan_name_href_for_dealer_renewal').attr('href', DEALER_DOC_PATH + dealerRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_dealer_renewal').html(dealerRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },

});
