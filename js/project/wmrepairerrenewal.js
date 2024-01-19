var repairerRenewalListTemplate = Handlebars.compile($('#repairer_renewal_list_template').html());
var repairerRenewalTableTemplate = Handlebars.compile($('#repairer_renewal_table_template').html());
var repairerRenewalActionTemplate = Handlebars.compile($('#repairer_renewal_action_template').html());
var repairerRenewalFormTemplate = Handlebars.compile($('#repairer_renewal_form_template').html());
var repairerRenewalViewTemplate = Handlebars.compile($('#repairer_renewal_view_template').html());
var repairerRenewalProprietorInfoTemplate = Handlebars.compile($('#repairer_renewal_proprietor_info_template').html());
var repairerRenewalUploadChallanTemplate = Handlebars.compile($('#repairer_renewal_upload_challan_template').html());
var repairerRenewalApproveTemplate = Handlebars.compile($('#repairer_renewal_approve_template').html());
var repairerRenewalRejectTemplate = Handlebars.compile($('#repairer_renewal_reject_template').html());
var repairerRenewalViewPaymentTemplate = Handlebars.compile($('#repairer_renewal_view_payment_template').html());

var tempPersonCnt = 1;

var RepairerRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
RepairerRenewal.Router = Backbone.Router.extend({
    routes: {
        'repairer_renewal': 'renderList',
        'repairer_renewal_form': 'renderListForForm',
        'edit_repairer_renewal_form': 'renderList',
        'view_repairer_renewal_form': 'renderList',
    },
    renderList: function () {
        RepairerRenewal.listview.listPage();
    },
    renderListForForm: function () {
        RepairerRenewal.listview.listPageRepairerRenewalForm();
    }
});
RepairerRenewal.listView = Backbone.View.extend({
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
        addClass('repairer_renewal', 'active');
        RepairerRenewal.router.navigate('repairer_renewal');
        var templateData = {};
        this.$el.html(repairerRenewalListTemplate(templateData));
        this.loadRepairerRenewalData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageRepairerRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('repairer_renewal', 'active');
        this.$el.html(repairerRenewalListTemplate);
        this.newRepairerRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return repairerRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTEEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return repairerRenewalActionTemplate(rowData);
    },
    loadRepairerRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_repairer + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.complete_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTEEN, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTEEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['repairer_renewal_data'], function (index, objData) {
                json['repairer_renewal_data'][index]['query_movement_string'] = qmData[objData.repairer_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.repairer_renewal_id] + '</table>') : '-';
            });
            return json['repairer_renewal_data'];
        };
        var that = this;
        RepairerRenewal.router.navigate('repairer_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'RepairerRenewal.listview.loadRepairerRenewalData();');
        $('#repairer_renewal_form_and_datatable_container').html(repairerRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_repairer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_repairer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_repairer_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_repairer_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_repairer_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_repairer_renewal_list', false);
        $('#district_for_repairer_renewal_list').val(searchData.search_district);
        $('#status_for_repairer_renewal_list').val(searchData.search_status);
        $('#app_timing_for_repairer_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_repairer_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_repairer_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_repairer_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_repairer_renewal_list').attr('disabled', 'disabled');
        }
        repairerRenewalDataTable = $('#repairer_renewal_datatable').DataTable({
            ajax: {url: 'repairer_renewal/get_repairer_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'repairer_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'repairer_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'repairer_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'repairer_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#repairer_renewal_datatable_filter').remove();
        $('#repairer_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = repairerRenewalDataTable.row(tr);

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
    newRepairerRenewalForm: function (isEdit, parseData) {
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
            var formData = parseData.repairer_renewal_data;
            RepairerRenewal.router.navigate('edit_repairer_renewal_form');
        } else {
            var formData = {};
            RepairerRenewal.router.navigate('repairer_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.repairer_renewal_data = parseData.repairer_renewal_data;
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        $('#repairer_renewal_form_and_datatable_container').html(repairerRenewalFormTemplate((templateData)));
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
                $('#seal_and_stamp_container_for_repairer').hide();
                $('#seal_and_stamp_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_repairer').show();
                $('#seal_and_stamp_download').attr("href", REPAIRER_DOC_PATH + formData.signature);
            }
            if (formData.original_licence != '') {
                $('#original_licence_container_for_repairer').hide();
                $('#original_licence_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.original_licence);
                $('#original_licence_name_container_for_repairer').show();
                $('#original_licence_download').attr("href", REPAIRER_DOC_PATH + formData.original_licence);
            }
            if (formData.renewed_licence != '') {
                $('#renewed_licence_container_for_repairer').hide();
                $('#renewed_licence_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.renewed_licence);
                $('#renewed_licence_name_container_for_repairer').show();
                $('#renewed_licence_download').attr("href", REPAIRER_DOC_PATH + formData.renewed_licence);
            }
            if (formData.periodical_return != '') {
                $('#periodical_return_container_for_repairer').hide();
                $('#periodical_return_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.periodical_return);
                $('#periodical_return_name_container_for_repairer').show();
                $('#periodical_return_download').attr("href", REPAIRER_DOC_PATH + formData.periodical_return);
            }
            if (formData.verification_certificate != '') {
                $('#verification_certificate_container_for_repairer').hide();
                $('#verification_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.verification_certificate);
                $('#verification_certificate_name_container_for_repairer').show();
                $('#verification_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.verification_certificate);
            }
            //this.$('.proprietor_info_div').show();

            if (formData.is_limited_company == isChecked) {
                $('#is_limited_company').attr('checked', 'checked');
                this.$('.proprietor_info_div').show();

                var proprietorInfo = JSON.parse(formData.proprietor_details);
                $.each(proprietorInfo, function (key, value) {
                    that.addMultipleProprietor(value);
                })
            }

            if (formData.sufficient_stock == isChecked) {
                $('#sufficient_stock').attr('checked', 'checked');
                this.$('.stock_details_div').show();
            }
        }

        generateSelect2();
        datePicker();
        $('#repairer_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitRepairerRenewal($('#submit_btn_for_repairer'));
            }
        });
    },
    editOrViewRepairerRenewal: function (btnObj, repairerRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!repairerRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer_renewal/get_repairer_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId}, getTokenData()),
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
                    that.newRepairerRenewalForm(isEdit, parseData);
                } else {
                    that.viewRepairerRenewalForm(parseData);
                }
            }
        });
    },
    viewRepairerRenewalForm: function (parseData) {
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
        var formData = parseData.repairer_renewal_data;
        RepairerRenewal.router.navigate('view_repairer_renewal_form');
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#repairer_renewal_form_and_datatable_container').html(repairerRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');
        $('#identity_choice').val(formData.identity_choice);


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_repairer').hide();
            $('#seal_and_stamp_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_repairer').show();
            $('#seal_and_stamp_download').attr("href", REPAIRER_DOC_PATH + formData.signature);
        }
        if (formData.original_licence != '') {
            $('#original_licence_container_for_repairer').hide();
            $('#original_licence_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.original_licence);
            $('#original_licence_name_container_for_repairer').show();
            $('#original_licence_download').attr("href", REPAIRER_DOC_PATH + formData.original_licence);
        }
        if (formData.renewed_licence != '') {
            $('#renewed_licence_container_for_repairer').hide();
            $('#renewed_licence_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.renewed_licence);
            $('#renewed_licence_name_container_for_repairer').show();
            $('#renewed_licence_download').attr("href", REPAIRER_DOC_PATH + formData.renewed_licence);
        }
        if (formData.periodical_return != '') {
            $('#periodical_return_container_for_repairer').hide();
            $('#periodical_return_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.periodical_return);
            $('#periodical_return_name_container_for_repairer').show();
            $('#periodical_return_download').attr("href", REPAIRER_DOC_PATH + formData.periodical_return);
        }
        if (formData.verification_certificate != '') {
            $('#verification_certificate_container_for_repairer').hide();
            $('#verification_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.verification_certificate);
            $('#verification_certificate_name_container_for_repairer').show();
            $('#verification_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.verification_certificate);
        }

        if (formData.is_limited_company == isChecked) {
            $('#is_limited_company').attr('checked', 'checked');
            this.$('.proprietor_info_div').show();

            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })
        }

        if (formData.sufficient_stock == isChecked) {
            $('#sufficient_stock').attr('checked', 'checked');
            this.$('.stock_details_div').show();
        }

    },
    checkValidationForRepairerRenewal: function (repairerRenewalData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //console.log(repairerRenewalData.admin_registration_number);
        if (!repairerRenewalData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!repairerRenewalData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!repairerRenewalData.admin_registration_number) {
            return getBasicMessageAndFieldJSONArray('admin_registration_number', licenseNumberValidationMessage);
        }
        if (!repairerRenewalData.name_of_repairmen) {
            return getBasicMessageAndFieldJSONArray('name_of_repairmen', repairmenNameValidationMessage);
        }
        if (!repairerRenewalData.complete_address) {
            return getBasicMessageAndFieldJSONArray('complete_address', workshopAddressValidationMessage);
        }
        if (!repairerRenewalData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', shopDateValidationMessage);
        }
        if (!repairerRenewalData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', shopRegNoValidationMessage);
        }
        if (!repairerRenewalData.identity_choice) {
            return getBasicMessageAndFieldJSONArray('identity_choice', identityChoiceValidationMessage);
        }
        if (!repairerRenewalData.identity_number) {
            return getBasicMessageAndFieldJSONArray('identity_number', identityNoValidationMessage);
        }
        if (!repairerRenewalData.weights_type) {
            return getBasicMessageAndFieldJSONArray('weights_type', weightTypeValidationMessage);
        }
        if (!repairerRenewalData.area_operate) {
            return getBasicMessageAndFieldJSONArray('area_operate', areaOperateValidationMessage);
        }
        if (repairerRenewalData.sufficient_stock == isChecked) {
            if (!repairerRenewalData.stock_details) {
                return getBasicMessageAndFieldJSONArray('stock_details', stockDetailValidationMessage);
            }
        }
        if (!repairerRenewalData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        if (!repairerRenewalData.declarationtwo) {
            return getBasicMessageAndFieldJSONArray('declarationtwo', declarationTwoValidationMessage);
        }
        if (!repairerRenewalData.declarationthree) {
            return getBasicMessageAndFieldJSONArray('declarationthree', declarationThreeValidationMessage);
        }

        return '';
    },
    askForSubmitRepairerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'RepairerRenewal.listview.submitRepairerRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitRepairerRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var repairerRenewalData = $('#repairer_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForRepairerRenewal(repairerRenewalData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('repairer-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;
        if (repairerRenewalData.is_limited_company == isChecked) {
            $('.proprietor_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var proprietorInfo = {};
                var occupierName = $('#occupier_name_' + cnt).val();
                if (occupierName == '' || occupierName == null) {
                    $('#occupier_name_' + cnt).focus();
                    validationMessageShow('repairer-' + cnt, occupierNameValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.occupier_name = occupierName;

                var fatherName = $('#father_name_' + cnt).val();
                if (fatherName == '' || fatherName == null) {
                    $('#father_name_' + cnt).focus();
                    validationMessageShow('repairer-' + cnt, fatherNameValidationMessage);
                    isproprietorValidation = true;
                    return false;
                }
                proprietorInfo.father_name = fatherName;

                var address = $('#address_' + cnt).val();
                if (address == '' || address == null) {
                    $('#address_' + cnt).focus();
                    validationMessageShow('repairer-' + cnt, proprietorAddressValidationMessage);
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

        // if ($('#seal_and_stamp_container_for_repairer').is(':visible')) {
        //     var sealAndStamp = $('#seal_and_stamp_for_repairer').val();
        //     if (sealAndStamp == '') {
        //         $('#seal_and_stamp_for_repairer').focus();
        //         validationMessageShow('repairer-seal_and_stamp_for_repairer', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_repairer');
        //     if (sealAndStampMessage != '') {
        //         $('#seal_and_stamp_for_repairer').focus();
        //         validationMessageShow('repairer-seal_and_stamp_for_repairer', sealAndStampMessage);
        //         return false;
        //     }
        // }

        if ($('#original_licence_container_for_repairer').is(':visible')) {
            var supportDocument = $('#original_licence_for_repairer').val();
            if (supportDocument == '') {
                $('#original_licence_for_repairer').focus();
                validationMessageShow('repairer-original_licence_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('original_licence_for_repairer');
            if (supportDocumentMessage != '') {
                $('#original_licence_for_repairer').focus();
                validationMessageShow('repairer-original_licence_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#renewed_licence_container_for_repairer').is(':visible')) {
            var supportDocument = $('#renewed_licence_for_repairer').val();
            if (supportDocument == '') {
                $('#renewed_licence_for_repairer').focus();
                validationMessageShow('repairer-renewed_licence_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('renewed_licence_for_repairer');
            if (supportDocumentMessage != '') {
                $('#renewed_licence_for_repairer').focus();
                validationMessageShow('repairer-renewed_licence_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#periodical_return_container_for_repairer').is(':visible')) {
            var supportDocument = $('#periodical_return_for_repairer').val();
            if (supportDocument == '') {
                $('#periodical_return_for_repairer').focus();
                validationMessageShow('repairer-periodical_return_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('periodical_return_for_repairer');
            if (supportDocumentMessage != '') {
                $('#periodical_return_for_repairer').focus();
                validationMessageShow('repairer-periodical_return_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#verification_certificate_container_for_repairer').is(':visible')) {
            var supportDocument = $('#verification_certificate_for_repairer').val();
            if (supportDocument == '') {
                $('#verification_certificate_for_repairer').focus();
                validationMessageShow('repairer-verification_certificate_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('verification_certificate_for_repairer');
            if (supportDocumentMessage != '') {
                $('#verification_certificate_for_repairer').focus();
                validationMessageShow('repairer-verification_certificate_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_repairer') : $('#submit_btn_for_repairer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var repairerRenewalData = new FormData($('#repairer_renewal_form')[0]);
        repairerRenewalData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        repairerRenewalData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        repairerRenewalData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/submit_repairer_renewal',
            data: repairerRenewalData,
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
                validationMessageShow('repairer', textStatus.statusText);
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
                    validationMessageShow('repairer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                RepairerRenewal.router.navigate('repairer_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (repairerRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'RepairerRenewal.listview.removeDocument(\'' + repairerRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (repairerRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/remove_document',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('repairer', textStatus.statusText);
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
                    validationMessageShow('repairer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_repairer').hide();
                $('#' + docId + '_name_image_for_repairer').attr('src', '');
                $('#' + docId + '_container_for_repairer').show();
                $('#' + docId + '_for_repairer').val('');

            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(repairerRenewalProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#repairer_renewal_id_for_repairer_renewal_form1').val(repairerRenewalId);
        $('#repairer_renewal_form1_pdf_form').submit();
        $('#repairer_renewal_id_for_repairer_renewal_form1').val('');
    },

    openUploadChallan: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + repairerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer_renewal/get_repairer_renewal_data_by_repairer_renewal_id',
            type: 'post',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var repairerRenewalData = parseData.repairer_renewal_data;
                showPopup();
                if (repairerRenewalData.payment_type == VALUE_ONE) {
                    repairerRenewalData.utitle = 'Challan Copy';
                } else {
                    repairerRenewalData.utitle = 'Payment Details';
                }
                repairerRenewalData.module_type = VALUE_FOURTEEN;
                $('#popup_container').html(repairerRenewalUploadChallanTemplate(repairerRenewalData));
                loadFB(VALUE_FOURTEEN, parseData.fb_data, repairerRenewalData.payment_type, repairerRenewalData.show_remove_upload_btn, repairerRenewalData.show_dropdown, repairerRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'repairer_renewal_upload_challan', repairerRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'repairer_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTEEN);
                if (repairerRenewalData.challan != '') {
                    $('#challan_container_for_repairer_renewal_upload_challan').hide();
                    $('#challan_name_container_for_repairer_renewal_upload_challan').show();
                    $('#challan_name_href_for_repairer_renewal_upload_challan').attr('href', 'documents/repairer/' + repairerRenewalData.challan);
                    $('#challan_name_for_repairer_renewal_upload_challan').html(repairerRenewalData.challan);
                    $('#challan_remove_btn_for_repairer_renewal_upload_challan').attr('onclick', 'RepairerRenewal.listview.removeChallan("' + repairerRenewalData.repairer_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (repairerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/remove_challan',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId}, getTokenData()),
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
                validationMessageShow('repairer-uc', textStatus.statusText);
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
                    validationMessageShow('repairer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-repairer-uc').html(parseData.message);
                removeDocument('challan', 'repairer_renewal_upload_challan');
                $('#status_' + repairerRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-repairer-uc').html('');
        validationMessageHide();
        var repairerRenewalId = $('#repairer_renewal_id_for_repairer_renewal_upload_challan').val();
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_repairer_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_repairer_renewal_upload_challan_1').focus();
            validationMessageShow('repairer-uc-payment_type_for_repairer_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_repairer_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_repairer_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_repairer_renewal_upload_challan').focus();
                validationMessageShow('repairer-uc-challan_for_repairer_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_repairer_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_repairer_renewal_upload_challan').focus();
                validationMessageShow('repairer-uc-challan_for_repairer_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTEEN, 'repairer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_repairer_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#repairer_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/upload_challan',
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
                validationMessageShow('repairer-uc', textStatus.statusText);
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
                    validationMessageShow('repairer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + repairerRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + repairerRenewalId).show();
                }
                $('#total_fees_' + repairerRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + repairerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer_renewal/get_repairer_renewal_data_by_repairer_renewal_id',
            type: 'post',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId}, getTokenData()),
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
                var repairerRenewalData = parseData.repairer_renewal_data;
                showPopup();
                $('#popup_container').html(repairerRenewalApproveTemplate(repairerRenewalData));
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
        var formData = $('#approve_repairer_renewal_form').serializeFormJSON();
        if (!formData.repairer_renewal_id_for_repairer_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_repairer_renewal_approve) {
            $('#registration_number_for_repairer_renewal_approve').focus();
            validationMessageShow('repairer-approve-registration_number_for_repairer_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_repairer_renewal_approve) {
            $('#valid_upto_for_repairer_renewal_approve').focus();
            validationMessageShow('repairer-approve-valid_upto_for_repairer_renewal_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_repairer_renewal_approve) {
            $('#remarks_for_repairer_renewal_approve').focus();
            validationMessageShow('repairer-approve-remarks_for_repairer_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/approve_application',
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
                validationMessageShow('repairer-approve', textStatus.statusText);
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
                    validationMessageShow('repairer-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.repairer_renewal_id_for_repairer_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_approve).show();
                // $('#download_certificate_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_approve).show();
                $('#so_status_' + formData.repairer_renewal_id_for_repairer_renewal_approve).html(dateTimeDays(formData.repairer_renewal_id_for_repairer_renewal_approve, parseData, VALUE_FOURTEEN));
            }
        });
    },
    askForRejectApplication: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + repairerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer_renewal/get_repairer_renewal_data_by_repairer_renewal_id',
            type: 'post',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId}, getTokenData()),
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
                var repairerRenewalData = parseData.repairer_renewal_data;
                showPopup();
                $('#popup_container').html(repairerRenewalRejectTemplate(repairerRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_repairer_renewal_form').serializeFormJSON();
        if (!formData.repairer_renewal_id_for_repairer_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_repairer_renewal_reject) {
            $('#remarks_for_repairer_renewal_reject').focus();
            validationMessageShow('repairer-reject-remarks_for_repairer_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer_renewal/reject_renewal_application',
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
                validationMessageShow('repairer-reject', textStatus.statusText);
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
                    validationMessageShow('repairer-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.repairer_renewal_id_for_repairer_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.repairer_renewal_id_for_repairer_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.repairer_renewal_id_for_repairer_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.repairer_renewal_id_for_repairer_renewal_reject).remove();
                $('#so_status_' + formData.repairer_renewal_id_for_repairer_renewal_reject).html(dateTimeDays(formData.repairer_renewal_id_for_repairer_renewal_reject, parseData, VALUE_FOURTEEN));
            }
        });
    },
    generateCertificate: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#repairer_renewal_id_for_certificate').val(repairerRenewalId);
        $('#repairer_renewal_certificate_pdf_form').submit();
        $('#repairer_renewal_id_for_certificate').val('');
    },
    getQueryData: function (repairerRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!repairerRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTEEN;
        templateData.module_id = repairerRenewalId;
        var btnObj = $('#query_btn_for_wm_' + repairerRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTEEN, moduleData.repairer_renewal_id);
                tmpData.applicant_name = moduleData.name_of_repairer;
                tmpData.title = 'Repairer Name';
                tmpData.module_type = VALUE_FOURTEEN;
                tmpData.module_id = repairerRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (repairerRenewalId) {
        if (!repairerRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + repairerRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer_renewal/get_repairer_renewal_data_by_repairer_renewal_id',
            type: 'post',
            data: $.extend({}, {'repairer_renewal_id': repairerRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var repairerRenewalData = parseData.repairer_renewal_data;
                showPopup();
                if (repairerRenewalData.payment_type == VALUE_ONE || repairerRenewalData.payment_type == VALUE_THREE) {
                    repairerRenewalData.user_payment_type_text = paymentTypeArray[repairerRenewalData.payment_type];
                } else {
                    repairerRenewalData.user_payment_type_text = userPaymentTypeArray[repairerRenewalData.user_payment_type] ? userPaymentTypeArray[repairerRenewalData.user_payment_type] : '';
                }
                if (repairerRenewalData.payment_type == VALUE_ONE) {
                    repairerRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (repairerRenewalData.payment_type == VALUE_TWO && repairerRenewalData.user_payment_type == VALUE_ONE) {
                    repairerRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                repairerRenewalData.module_type = VALUE_FOURTEEN;
                $('#popup_container').html(repairerRenewalViewPaymentTemplate(repairerRenewalData));
                loadFB(VALUE_FOURTEEN, parseData.fb_data);
                loadPH(VALUE_FOURTEEN, repairerRenewalData.repairer_renewal_id, parseData.ph_data);
                if (repairerRenewalData.payment_type == VALUE_ONE || (repairerRenewalData.payment_type == VALUE_TWO && repairerRenewalData.user_payment_type == VALUE_ONE)) {
                    if (repairerRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_repairer_renewal').show();
                        $('#fees_paid_challan_name_href_for_repairer_renewal').attr('href', REPAIRER_DOC_PATH + repairerRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_repairer_renewal').html(repairerRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },

});
