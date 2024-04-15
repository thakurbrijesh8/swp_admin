var manufacturerRenewalListTemplate = Handlebars.compile($('#manufacturer_renewal_list_template').html());
var manufacturerRenewalTableTemplate = Handlebars.compile($('#manufacturer_renewal_table_template').html());
var manufacturerRenewalActionTemplate = Handlebars.compile($('#manufacturer_renewal_action_template').html());
var manufacturerRenewalFormTemplate = Handlebars.compile($('#manufacturer_renewal_form_template').html());
var manufacturerRenewalViewTemplate = Handlebars.compile($('#manufacturer_renewal_view_template').html());
var manufacturerRenewalproprietorInfoTemplate = Handlebars.compile($('#manufacturer_renewal_proprietor_info_template').html());
var manufacturerRenewalUploadChallanTemplate = Handlebars.compile($('#manufacturer_renewal_upload_challan_template').html());
var manufacturerRenewalApproveTemplate = Handlebars.compile($('#manufacturer_renewal_approve_template').html());
var manufacturerRenewalRejectTemplate = Handlebars.compile($('#manufacturer_renewal_reject_template').html());
var manufacturerRenewalViewPaymentTemplate = Handlebars.compile($('#manufacturer_renewal_view_payment_template').html());

var tempPersonCnt = 1;

var ManufacturerRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
ManufacturerRenewal.Router = Backbone.Router.extend({
    routes: {
        'manufacturer_renewal': 'renderList',
        'manufacturer_renewal_form': 'renderListForForm',
        'edit_manufacturer_renewal_form': 'renderList',
        'view_manufacturer_renewal_form': 'renderList',
    },
    renderList: function () {
        ManufacturerRenewal.listview.listPage();
    },
    renderListForForm: function () {
        ManufacturerRenewal.listview.listPageManufacturerRenewalForm();
    }
});
ManufacturerRenewal.listView = Backbone.View.extend({
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
        addClass('manufacturer_renewal', 'active');
        ManufacturerRenewal.router.navigate('manufacturer_renewal');
        var templateData = {};
        this.$el.html(manufacturerRenewalListTemplate(templateData));
        this.loadManufacturerRenewalData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageManufacturerRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('manufacturer_renewal', 'active');
        this.$el.html(manufacturerRenewalListTemplate);
        this.newManufacturerRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return manufacturerRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_SIXTEEN;
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
        return manufacturerRenewalActionTemplate(rowData);
    },
    loadManufacturerRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_manufacturer + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.complete_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_SIXTEEN, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_SIXTEEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['manufacturer_renewal_data'], function (index, objData) {
                json['manufacturer_renewal_data'][index]['query_movement_string'] = qmData[objData.manufacturer_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.manufacturer_renewal_id] + '</table>') : '-';
            });
            return json['manufacturer_renewal_data'];
        };
        var that = this;
        ManufacturerRenewal.router.navigate('manufacturer_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'ManufacturerRenewal.listview.loadManufacturerRenewalData();');
        $('#manufacturer_renewal_form_and_datatable_container').html(manufacturerRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_manufacturer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_manufacturer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_manufacturer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_manufacturer_list', false);
        allowOnlyIntegerValue('mobile_number_for_manufacturer_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_manufacturer_renewal_list', false);
        $('#district_for_manufacturer_renewal_list').val(searchData.search_district);
        $('#status_for_manufacturer_renewal_list').val(searchData.search_status);
        $('#app_timing_for_manufacturer_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_manufacturer_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_manufacturer_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_manufacturer_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_manufacturer_renewal_list').attr('disabled', 'disabled');
        }
        manufacturerDataTable = $('#manufacturer_renewal_datatable').DataTable({
            ajax: {url: 'manufacturer_renewal/get_manufacturer_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'manufacturer_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'manufacturer_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'manufacturer_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'manufacturer_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#manufacturer_renewal_datatable_filter').remove();
        $('#manufacturer_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = manufacturerDataTable.row(tr);

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
    newManufacturerRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.manufacturer_renewal_data;
            ManufacturerRenewal.router.navigate('edit_manufacturer_renewal_form');
        } else {
            var formData = {};
            ManufacturerRenewal.router.navigate('manufacturer_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.manufacturer_renewal_data = parseData.manufacturer_renewal_data;
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        $('#manufacturer_renewal_form_and_datatable_container').html(manufacturerRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');
            $('#declarationthree').attr('checked', 'checked');
            $('#identity_choice').val(formData.identity_choice);

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_manufacturer').hide();
                $('#seal_and_stamp_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_manufacturer').show();
                $('#seal_and_stamp_download').attr("href", MENUFACT_DOC_PATH + formData.signature);
            }

            if (formData.monogram_uploader != '') {
                $('#monogram_uploader_container_for_manufacturer').hide();
                $('#monogram_uploader_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.monogram_uploader);
                $('#monogram_uploader_name_container_for_manufacturer').show();
                $('#monogram_uploader_download').attr("href", MENUFACT_DOC_PATH + formData.monogram_uploader);
            }

            if (formData.original_licence != '') {
                $('#original_licence_container_for_manufacturer').hide();
                $('#original_licence_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.original_licence);
                $('#original_licence_name_container_for_manufacturer').show();
                $('#original_licence_download').attr("href", MENUFACT_DOC_PATH + formData.original_licence);
            }
            if (formData.renewed_licence != '') {
                $('#renewed_licence_container_for_manufacturer').hide();
                $('#renewed_licence_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.renewed_licence);
                $('#renewed_licence_name_container_for_manufacturer').show();
                $('#renewed_licence_download').attr("href", MENUFACT_DOC_PATH + formData.renewed_licence);
            }
            if (formData.periodical_return != '') {
                $('#periodical_return_container_for_manufacturer').hide();
                $('#periodical_return_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.periodical_return);
                $('#periodical_return_name_container_for_manufacturer').show();
                $('#periodical_return_download').attr("href", MENUFACT_DOC_PATH + formData.periodical_return);
            }
            if (formData.verification_certificate != '') {
                $('#verification_certificate_container_for_manufacturer').hide();
                $('#verification_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.verification_certificate);
                $('#verification_certificate_name_container_for_manufacturer').show();
                $('#verification_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.verification_certificate);
            }

            if (formData.is_limited_company == isChecked) {
                $('#is_limited_company').attr('checked', 'checked');
                this.$('.proprietor_info_div').show();

                var proprietorInfo = JSON.parse(formData.proprietor_details);
                $.each(proprietorInfo, function (key, value) {
                    that.addMultipleProprietor(value);
                })

            }

            // if (formData.any_previous_application == isChecked) {
            //     $('#any_previous_application').attr('checked', 'checked');
            //     this.$('.any_previous_application_div').show();
            // }
        }

        generateSelect2();
        datePicker();
        $('#manufacturer_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitManufacturerRenewal($('#submit_btn_for_manufacturer'));
            }
        });
    },
    editOrViewManufacturerRenewal: function (btnObj, manufacturerRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!manufacturerRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer_renewal/get_manufacturer_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId}, getTokenData()),
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
                    that.newManufacturerRenewalForm(isEdit, parseData);
                } else {
                    that.viewManufacturerRenewalForm(parseData);
                }
            }
        });
    },
    viewManufacturerRenewalForm: function (parseData) {
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
        var formData = parseData.manufacturer_renewal_data;
        ManufacturerRenewal.router.navigate('view_manufacturer_renewal_form');
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#manufacturer_renewal_form_and_datatable_container').html(manufacturerRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');
        $('#identity_choice').val(formData.identity_choice);


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_manufacturer').hide();
            $('#seal_and_stamp_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_manufacturer').show();
            $('#seal_and_stamp_download').attr("href", MENUFACT_DOC_PATH + formData.signature);
        }

        if (formData.monogram_uploader != '') {
            $('#monogram_uploader_container_for_manufacturer').hide();
            $('#monogram_uploader_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.monogram_uploader);
            $('#monogram_uploader_name_container_for_manufacturer').show();
            $('#monogram_uploader_download').attr("href", MENUFACT_DOC_PATH + formData.monogram_uploader);
        }
        if (formData.original_licence != '') {
            $('#original_licence_container_for_manufacturer').hide();
            $('#original_licence_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.original_licence);
            $('#original_licence_name_container_for_manufacturer').show();
            $('#original_licence_download').attr("href", MENUFACT_DOC_PATH + formData.original_licence);
        }
        if (formData.renewed_licence != '') {
            $('#renewed_licence_container_for_manufacturer').hide();
            $('#renewed_licence_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.renewed_licence);
            $('#renewed_licence_name_container_for_manufacturer').show();
            $('#renewed_licence_download').attr("href", MENUFACT_DOC_PATH + formData.renewed_licence);
        }
        if (formData.periodical_return != '') {
            $('#periodical_return_container_for_manufacturer').hide();
            $('#periodical_return_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.periodical_return);
            $('#periodical_return_name_container_for_manufacturer').show();
            $('#periodical_return_download').attr("href", MENUFACT_DOC_PATH + formData.periodical_return);
        }
        if (formData.verification_certificate != '') {
            $('#verification_certificate_container_for_manufacturer').hide();
            $('#verification_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.verification_certificate);
            $('#verification_certificate_name_container_for_manufacturer').show();
            $('#verification_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.verification_certificate);
        }
        if (formData.is_limited_company == isChecked) {
            $('#is_limited_company').attr('checked', 'checked');
            this.$('.proprietor_info_div').show();

            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })

        }


    },
    checkValidationForManufacturerRenewal: function (manufacturerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!manufacturerData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!manufacturerData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!manufacturerData.admin_registration_number) {
            return getBasicMessageAndFieldJSONArray('admin_registration_number', licenseNumberValidationMessage);
        }
        if (!manufacturerData.name_of_manufacturer) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacturer', manufacturerNameValidationMessage);
        }
        if (!manufacturerData.complete_address) {
            return getBasicMessageAndFieldJSONArray('complete_address', workshopAddressValidationMessage);
        }
        if (!manufacturerData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', shopDateValidationMessage);
        }
        if (!manufacturerData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', shopRegNoValidationMessage);
        }
        if (!manufacturerData.weights_type) {
            return getBasicMessageAndFieldJSONArray('weights_type', weightTypeValidationMessage);
        }
        if (!manufacturerData.propose_change) {
            return getBasicMessageAndFieldJSONArray('propose_change', proposeChangeValidationMessage);
        }
        if (!manufacturerData.details_of_foundry) {
            return getBasicMessageAndFieldJSONArray('details_of_foundry', foundryValidationMessage);
        }
        if (!manufacturerData.production_sales) {
            return getBasicMessageAndFieldJSONArray('production_sales', productionSalesValidationMessage);
        }
        if (!manufacturerData.identity_choice) {
            return getBasicMessageAndFieldJSONArray('identity_choice', identityChoiceValidationMessage);
        }
        if (!manufacturerData.identity_number) {
            return getBasicMessageAndFieldJSONArray('identity_number', identityNoValidationMessage);
        }
        if (!manufacturerData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        if (!manufacturerData.declarationtwo) {
            return getBasicMessageAndFieldJSONArray('declarationtwo', declarationTwoValidationMessage);
        }
        if (!manufacturerData.declarationthree) {
            return getBasicMessageAndFieldJSONArray('declarationthree', declarationThreeValidationMessage);
        }

        return '';
    },
    askForSubmitManufacturerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ManufacturerRenewal.listview.submitManufacturerRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitManufacturerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var manufacturerData = $('#manufacturer_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForManufacturerRenewal(manufacturerData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('manufacturer-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;
        if (manufacturerData.is_limited_company == isChecked) {
            $('.proprietor_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var proprietorInfo = {};
                var occupierName = $('#occupier_name_' + cnt).val();
                if (occupierName == '' || occupierName == null) {
                    $('#occupier_name_' + cnt).focus();
                    validationMessageShow('manufacturer-' + cnt, occupierNameValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.occupier_name = occupierName;

                var fatherName = $('#father_name_' + cnt).val();
                if (fatherName == '' || fatherName == null) {
                    $('#father_name_' + cnt).focus();
                    validationMessageShow('manufacturer-' + cnt, fatherNameValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.father_name = fatherName;

                var address = $('#address_' + cnt).val();
                if (address == '' || address == null) {
                    $('#address_' + cnt).focus();
                    validationMessageShow('manufacturer-' + cnt, proprietorAddressValidationMessage);
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

        if ($('#seal_and_stamp_container_for_manufacturer').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_manufacturer').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_manufacturer').focus();
                validationMessageShow('manufacturer-seal_and_stamp_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_manufacturer');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_manufacturer').focus();
                validationMessageShow('manufacturer-seal_and_stamp_for_manufacturer', sealAndStampMessage);
                return false;
            }
        }

        if ($('#monogram_uploader_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#monogram_uploader_for_manufacturer').val();
            if (supportDocument == '') {
                $('#monogram_uploader_for_manufacturer').focus();
                validationMessageShow('manufacturer-monogram_uploader_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('monogram_uploader_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#monogram_uploader_for_manufacturer').focus();
                validationMessageShow('manufacturer-monogram_uploader_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#original_licence_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#original_licence_for_manufacturer').val();
            if (supportDocument == '') {
                $('#original_licence_for_manufacturer').focus();
                validationMessageShow('manufacturer-original_licence_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('original_licence_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#original_licence_for_manufacturer').focus();
                validationMessageShow('manufacturer-original_licence_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#renewed_licence_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#renewed_licence_for_manufacturer').val();
            if (supportDocument == '') {
                $('#renewed_licence_for_manufacturer').focus();
                validationMessageShow('manufacturer-renewed_licence_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('renewed_licence_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#renewed_licence_for_manufacturer').focus();
                validationMessageShow('manufacturer-renewed_licence_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#periodical_return_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#periodical_return_for_manufacturer').val();
            if (supportDocument == '') {
                $('#periodical_return_for_manufacturer').focus();
                validationMessageShow('manufacturer-periodical_return_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('periodical_return_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#periodical_return_for_manufacturer').focus();
                validationMessageShow('manufacturer-periodical_return_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#verification_certificate_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#verification_certificate_for_manufacturer').val();
            if (supportDocument == '') {
                $('#verification_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-verification_certificate_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('verification_certificate_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#verification_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-verification_certificate_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_manufacturer') : $('#submit_btn_for_manufacturer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var manufacturerData = new FormData($('#manufacturer_renewal_form')[0]);
        manufacturerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        manufacturerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        manufacturerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/submit_manufacturer_renewal',
            data: manufacturerData,
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
                validationMessageShow('manufacturer', textStatus.statusText);
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
                    validationMessageShow('manufacturer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                ManufacturerRenewal.router.navigate('manufacturer_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (manufacturerRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ManufacturerRenewal.listview.removeDocument(\'' + manufacturerRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (manufacturerRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/remove_document',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('manufacturer', textStatus.statusText);
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
                    validationMessageShow('manufacturer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_manufacturer').hide();
                $('#' + docId + '_name_image_for_manufacturer').attr('src', '');
                $('#' + docId + '_container_for_manufacturer').show();
                $('#' + docId + '_for_manufacturer').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(manufacturerRenewalproprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#manufacturer_renewal_id_for_manufacturer_renewal_form1').val(manufacturerRenewalId);
        $('#manufacturer_renewal_form1_pdf_form').submit();
        $('#manufacturer_renewal_id_for_manufacturer_renewal_form1').val('');
    },

    openUploadChallan: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + manufacturerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer_renewal/get_manufacturer_renewal_data_by_manufacturer_renewal_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var manufacturerRenewalData = parseData.manufacturer_renewal_data;
                showPopup();
                if (manufacturerRenewalData.payment_type == VALUE_ONE) {
                    manufacturerRenewalData.utitle = 'Challan Copy';
                } else {
                    manufacturerRenewalData.utitle = 'Payment Details';
                }
                manufacturerRenewalData.module_type = VALUE_SIXTEEN;
                $('#popup_container').html(manufacturerRenewalUploadChallanTemplate(manufacturerRenewalData));
                loadFB(VALUE_SIXTEEN, parseData.fb_data, manufacturerRenewalData.payment_type, manufacturerRenewalData.show_remove_upload_btn, manufacturerRenewalData.show_dropdown, manufacturerRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'manufacturer_renewal_upload_challan', manufacturerRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'manufacturer_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_SIXTEEN);
                if (manufacturerRenewalData.challan != '') {
                    $('#challan_container_for_manufacturer_renewal_upload_challan').hide();
                    $('#challan_name_container_for_manufacturer_renewal_upload_challan').show();
                    $('#challan_name_href_for_manufacturer_renewal_upload_challan').attr('href', 'documents/manufacturer/' + manufacturerRenewalData.challan);
                    $('#challan_name_for_manufacturer_renewal_upload_challan').html(manufacturerRenewalData.challan);
                    $('#challan_remove_btn_for_manufacturer_renewal_upload_challan').attr('onclick', 'ManufacturerRenewal.listview.removeChallan("' + manufacturerRenewalData.manufacturer_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (manufacturerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/remove_challan',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId}, getTokenData()),
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
                validationMessageShow('manufacturer-uc', textStatus.statusText);
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
                    validationMessageShow('manufacturer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-manufacturer-uc').html(parseData.message);
                removeDocument('challan', 'manufacturer_renewal_upload_challan');
                $('#status_' + manufacturerRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-manufacturer-uc').html('');
        validationMessageHide();
        var manufacturerRenewalId = $('#manufacturer_renewal_id_for_manufacturer_renewal_upload_challan').val();
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_manufacturer_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_manufacturer_renewal_upload_challan_1').focus();
            validationMessageShow('manufacturer-uc-payment_type_for_manufacturer_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_manufacturer_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_manufacturer_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_manufacturer_renewal_upload_challan').focus();
                validationMessageShow('manufacturer-uc-challan_for_manufacturer_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_manufacturer_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_manufacturer_renewal_upload_challan').focus();
                validationMessageShow('manufacturer-uc-challan_for_manufacturer_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_SIXTEEN, 'manufacturer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_manufacturer_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#manufacturer_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/upload_challan',
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
                validationMessageShow('manufacturer-uc', textStatus.statusText);
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
                    validationMessageShow('manufacturer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + manufacturerRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + manufacturerRenewalId).show();
                }
                $('#total_fees_' + manufacturerRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + manufacturerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer_renewal/get_manufacturer_renewal_data_by_manufacturer_renewal_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId}, getTokenData()),
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
                var manufacturerRenewalData = parseData.manufacturer_renewal_data;
                showPopup();
                $('#popup_container').html(manufacturerRenewalApproveTemplate(manufacturerRenewalData));
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
        var formData = $('#approve_manufacturer_renewal_form').serializeFormJSON();
        if (!formData.manufacturer_renewal_id_for_manufacturer_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_manufacturer_renewal_approve) {
            $('#registration_number_for_manufacturer_renewal_approve').focus();
            validationMessageShow('manufacturer-approve-registration_number_for_manufacturer_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_manufacturer_renewal_approve) {
            $('#valid_upto_for_manufacturer_renewal_approve').focus();
            validationMessageShow('manufacturer-approve-valid_upto_for_manufacturer_renewal_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_manufacturer_renewal_approve) {
            $('#remarks_for_manufacturer_renewal_approve').focus();
            validationMessageShow('manufacturer-approve-remarks_for_manufacturer_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/approve_application',
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
                validationMessageShow('manufacturer-approve', textStatus.statusText);
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
                    validationMessageShow('manufacturer-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_approve).show();
                $('#so_status_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_approve).html(dateTimeDays(formData.manufacturer_renewal_id_for_manufacturer_renewal_approve, parseData, VALUE_SIXTEEN));
            }
        });
    },
    askForRejectApplication: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + manufacturerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer_renewal/get_manufacturer_renewal_data_by_manufacturer_renewal_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId}, getTokenData()),
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
                var manufacturerRenewalData = parseData.manufacturer_renewal_data;
                showPopup();
                $('#popup_container').html(manufacturerRenewalRejectTemplate(manufacturerRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_manufacturer_renewal_form').serializeFormJSON();
        if (!formData.manufacturer_renewal_id_for_manufacturer_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_manufacturer_renewal_reject) {
            $('#remarks_for_manufacturer_renewal_reject').focus();
            validationMessageShow('manufacturer-reject-remarks_for_manufacturer_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer_renewal/reject_renewal_application',
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
                validationMessageShow('manufacturer-reject', textStatus.statusText);
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
                    validationMessageShow('manufacturer-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).remove();
                $('#so_status_' + formData.manufacturer_renewal_id_for_manufacturer_renewal_reject).html(dateTimeDays(formData.manufacturer_renewal_id_for_manufacturer_renewal_reject, parseData, VALUE_SIXTEEN));
            }
        });
    },
    generateCertificate: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#manufacturer_renewal_id_for_certificate').val(manufacturerRenewalId);
        $('#manufacturer_renewal_certificate_pdf_form').submit();
        $('#manufacturer_renewal_id_for_certificate').val('');
    },
    getQueryData: function (manufacturerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!manufacturerRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SIXTEEN;
        templateData.module_id = manufacturerRenewalId;
        var btnObj = $('#query_btn_for_wm_' + manufacturerRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_SIXTEEN, moduleData.manufacturer_renewal_id);
                tmpData.applicant_name = moduleData.name_of_manufacturer;
                tmpData.title = 'MAnufacturer Name';
                tmpData.module_type = VALUE_SIXTEEN;
                tmpData.module_id = manufacturerRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (manufacturerRenewalId) {
        if (!manufacturerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + manufacturerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer_renewal/get_manufacturer_renewal_data_by_manufacturer_renewal_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_renewal_id': manufacturerRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var manufacturerRenewalrData = parseData.manufacturer_renewal_data;
                showPopup();
                if (manufacturerRenewalrData.payment_type == VALUE_ONE || manufacturerRenewalrData.payment_type == VALUE_THREE) {
                    manufacturerRenewalrData.user_payment_type_text = paymentTypeArray[manufacturerRenewalrData.payment_type];
                } else {
                    manufacturerRenewalrData.user_payment_type_text = userPaymentTypeArray[manufacturerRenewalrData.user_payment_type] ? userPaymentTypeArray[manufacturerRenewalrData.user_payment_type] : '';
                }
                if (manufacturerRenewalrData.payment_type == VALUE_ONE) {
                    manufacturerRenewalrData.utitle = 'Fees Paid Challan Copy';
                } else if (manufacturerRenewalrData.payment_type == VALUE_TWO && manufacturerRenewalrData.user_payment_type == VALUE_ONE) {
                    manufacturerRenewalrData.utitle = 'Demand Draft (DD) Copy';
                }
                manufacturerRenewalrData.module_type = VALUE_SIXTEEN;
                $('#popup_container').html(manufacturerRenewalViewPaymentTemplate(manufacturerRenewalrData));
                loadFB(VALUE_SIXTEEN, parseData.fb_data, manufacturerRenewalrData.payment_type);
                loadPH(VALUE_SIXTEEN, manufacturerRenewalrData.manufacturer_renewal_id, parseData.ph_data);
                if (manufacturerRenewalrData.payment_type == VALUE_ONE || (manufacturerRenewalrData.payment_type == VALUE_TWO && manufacturerRenewalrData.user_payment_type == VALUE_ONE)) {
                    if (manufacturerRenewalrData.fees_paid_challan != '') {
                        $('#vp_container_for_manufacturer_renewal').show();
                        $('#fees_paid_challan_name_href_for_manufacturer_renewal').attr('href', MENUFACT_DOC_PATH + manufacturerRenewalrData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_manufacturer_renewal').html(manufacturerRenewalrData.fees_paid_challan);
                    }
                }
            }
        });
    },

});
