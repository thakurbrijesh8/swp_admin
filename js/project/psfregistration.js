var psfregistrationListTemplate = Handlebars.compile($('#psfregistration_list_template').html());
var psfregistrationTableTemplate = Handlebars.compile($('#psfregistration_table_template').html());
var psfregistrationActionTemplate = Handlebars.compile($('#psfregistration_action_template').html());
var psfregistrationFormTemplate = Handlebars.compile($('#psfregistration_form_template').html());
var psfregistrationViewTemplate = Handlebars.compile($('#psfregistration_view_template').html());
var psfregistrationUploadChallanTemplate = Handlebars.compile($('#psfregistration_upload_challan_template').html());
var psfregistrationApproveTemplate = Handlebars.compile($('#psfregistration_approve_template').html());
var psfregistrationRejectTemplate = Handlebars.compile($('#psfregistration_reject_template').html());
var psfregistrationViewPaymentTemplate = Handlebars.compile($('#psfregistration_view_payment_template').html());

var tempPersonCnt = 1;

var Psfregistration = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Psfregistration.Router = Backbone.Router.extend({
    routes: {
        'psfregistration': 'renderList',
        'psfregistration_form': 'renderListForForm',
        'edit_psfregistration_form': 'renderList',
        'view_psfregistration_form': 'renderList',
    },
    renderList: function () {
        Psfregistration.listview.listPage();
    },
    renderListForForm: function () {
        Psfregistration.listview.listPagePsfregistrationForm();
    }
});
Psfregistration.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="import_from_outside"]': 'hasOutsideImportEvent',
        'click input[name="import_from_outside_ret"]': 'hasOutsideImportEventRetirement',
        'click input[name="aadharcard_all_parties"]': 'hasAadharCard',
        'click input[name="pancard_all_parties"]': 'hasPanCard',
        'click input[name="alteration_name_firm"]': 'hasAlteration',
    },
    hasOutsideImportEvent: function (event) {
        var val = $('input[name=import_from_outside]:checked').val();
        if (val === '1') {
            this.$('.import_from_outside_div').show();
        } else {
            this.$('.import_from_outside_div').hide();

        }
    },
    hasOutsideImportEventRetirement: function (event) {
        var val = $('input[name=import_from_outside_ret]:checked').val();
        if (val === '1') {
            this.$('.import_from_outside_ret_div').show();
        } else {
            this.$('.import_from_outside_ret_div').hide();

        }
    },
    hasAadharCard: function (event) {
        var val = $('input[name=aadharcard_all_parties]:checked').val();
        if (val === '1') {
            this.$('.aadharcard_all_parties_div').show();
        } else {
            this.$('.aadharcard_all_parties_div').hide();

        }
    },
    hasPanCard: function (event) {
        var val = $('input[name=pancard_all_parties]:checked').val();
        if (val === '1') {
            this.$('.pancard_all_parties_div').show();
        } else {
            this.$('.pancard_all_parties_div').hide();

        }
    },
    hasAlteration: function (event) {
        var val = $('input[name=alteration_name_firm]:checked').val();
        if (val === '1') {
            this.$('.alteration_name_firm_div').show();
        } else {
            this.$('.alteration_name_firm_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_psfregistration');
        addClass('psfregistration', 'active');
        Psfregistration.router.navigate('psfregistration');
        var templateData = {};
        this.$el.html(psfregistrationListTemplate(templateData));
        this.loadPsfregistrationData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPagePsfregistrationForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_psfregistration');
        addClass('psfregistration', 'active');
        this.$el.html(psfregistrationListTemplate);
        this.newPsfregistrationForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return psfregistrationActionTemplate(rowData);
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
        rowData.module_type = VALUE_SEVEN;
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
        return psfregistrationActionTemplate(rowData);
    },
    loadPsfregistrationData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.firm_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.principal_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_SEVEN, data, full.district, full);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['psfregistration_data'], function (index, objData) {
                json['psfregistration_data'][index]['query_movement_string'] = qmData[objData.psfregistration_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.psfregistration_id] + '</table>') : '-';
            });
            return json['psfregistration_data'];
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_SEVEN);
        };
        var that = this;
        showTableContainer('psfregistration');
        Psfregistration.router.navigate('psfregistration');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Psfregistration.listview.loadPsfregistrationData();');
        $('#psfregistration_datatable_container').html(psfregistrationTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_psfregistration_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_psfregistration_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_psfregistration_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_psfregistration_list', false);
        allowOnlyIntegerValue('mobile_number_for_psfregistration_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_psfregistration_list', false);
        $('#district_for_psfregistration_list').val(searchData.search_district);
        $('#status_for_psfregistration_list').val(searchData.search_status);
        $('#app_timing_for_psfregistration_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_psfregistration_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_psfregistration_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_psfregistration_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_psfregistration_list').attr('disabled', 'disabled');
        }
        psfregistrationDataTable = $('#psfregistration_datatable').DataTable({
            ajax: {url: 'psfregistration/get_psfregistration_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'psfregistration_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'psfregistration_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'psfregistration_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'psfregistration_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable

        });
        // }
        $('#psfregistration_datatable_filter').remove();
        $('#psfregistration_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = psfregistrationDataTable.row(tr);

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
    newPsfregistrationForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.psfregistration_data;
            Psfregistration.router.navigate('edit_psfregistration_form');
        } else {
            var formData = {};
            Psfregistration.router.navigate('psfregistration_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.AT_WILL = AT_WILL;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.VALUE_SEVEN = VALUE_SEVEN;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.psfregistration_data = parseData.psfregistration_data;
        showFormContainer('psfregistration');
        $('#psfregistration_form_container').html(psfregistrationFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');
            $('#declarationthree').attr('checked', 'checked');

            if (formData.application_of_firm_document != '') {
                $('#application_of_firm_container_for_psfregistration').hide();
                $('#apploication_of_firm_name_image').attr('src', PSFREG_DOC_PATH + formData.application_of_firm_document);
                $('#application_of_firm_name_container').show();
                $('#application_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.application_of_firm_document);
            }

            if (formData.formII_document != '') {
                $('#formII_of_firm_container_for_psfregistration').hide();
                $('#formII_of_firm_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.formII_document);
                $('#formII_of_firm_name_container_for_psfregistration').show();
                $('#formII_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.formII_document);
            }

            if (formData.partnership_deed != '') {
                $('#partnershipdeed_of_firm_container_for_psfregistration').hide();
                $('#partnershipdeed_of_firm_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.partnership_deed);
                $('#partnershipdeed_of_firm_name_container_for_psfregistration').show();
                $('#partnershipdeed_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.partnership_deed);
            }

            if (formData.aadharcard != '') {
                $('#aadharcard_of_firm_container_for_psfregistration').hide();
                $('#aadharcard_of_firm_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.aadharcard);
                $('#aadharcard_of_firm_name_container_for_psfregistration').show();
                $('#aadharcard_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.aadharcard);
            }

            if (formData.pancard != '') {
                $('#pancard_of_firm_container_for_psfregistration').hide();
                $('#pancard_of_firm_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.pancard);
                $('#pancard_of_firm_name_container_for_psfregistration').show();
                $('#pancard_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.pancard);
            }
            if (formData.alteration_name_firm_doc != '') {
                $('#alteration_name_firm_doc_container_for_psfregistration').hide();
                $('#alteration_name_firm_doc_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.alteration_name_firm_doc);
                $('#alteration_name_firm_doc_name_container_for_psfregistration').show();
                $('#alteration_name_firm_doc_name_download').attr("href", PSFREG_DOC_PATH + formData.alteration_name_firm_doc);
            }

            if (formData.retirement_form != '') {
                $('#retirement_of_firm_container_for_psfregistration').hide();
                $('#retirement_of_firm_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.retirement_form);
                $('#retirement_of_firm_name_container_for_psfregistration').show();
                $('#retirement_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.retirement_form);
            }

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_psfregistration').hide();
                $('#seal_and_stamp_name_image_for_psfregistration').attr('src', PSFREG_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_psfregistration').show();
                $('#seal_and_stamp_download').attr("href", PSFREG_DOC_PATH + formData.signature);
            }

            if (formData.import_from_outside == isChecked) {
                $('#import_from_outside').attr('checked', 'checked');
                this.$('.import_from_outside_div').show();
            }

            if (formData.import_from_outside_ret == isChecked) {
                $('#import_from_outside_ret').attr('checked', 'checked');
                this.$('.import_from_outside_ret_div').show();
            }
            if (formData.aadharcard_all_parties == isChecked) {
                $('#aadharcard_all_parties').attr('checked', 'checked');
                this.$('.aadharcard_all_parties_div').show();
            }

            if (formData.pancard_all_parties == isChecked) {
                $('#pancard_all_parties').attr('checked', 'checked');
                this.$('.pancard_all_parties_div').show();
            }
            if (formData.alteration_name_firm == isChecked) {
                $('#alteration_name_firm').attr('checked', 'checked');
                this.$('.alteration_name_firm_div').show();
            }

        }

        generateSelect2();
        datePicker();
        $('#psfregistration_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitPsfregistration($('#submit_btn_for_psfregistration'));
            }
        });
    },
    editOrViewPsfregistration: function (btnObj, psfregistrationId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!psfregistrationId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'psfregistration/get_psfregistration_data_by_id',
            type: 'post',
            data: $.extend({}, {'psfregistration_id': psfregistrationId}, getTokenData()),
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
                    that.newPsfregistrationForm(isEdit, parseData);
                } else {
                    that.viewPsfregistrationForm(parseData);
                }
            }
        });
    },
    viewPsfregistrationForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.psfregistration_data;
        formData.AT_WILL = AT_WILL;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        Psfregistration.router.navigate('view_psfregistration_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);

        showFormContainer('psfregistration');
        $('#psfregistration_form_container').html(psfregistrationViewTemplate((formData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);

        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');
        // $('#application_category').val(formData.application_category);

        if (formData.import_from_outside == isChecked) {
            $('#import_from_outside').attr('checked', 'checked');
            this.$('.import_from_outside_div').show();
        }

        if (formData.import_from_outside_ret == isChecked) {
            $('#import_from_outside_ret').attr('checked', 'checked');
            this.$('.import_from_outside_ret_div').show();
        }
        if (formData.aadharcard_all_parties == isChecked) {
            $('#aadharcard_all_parties').attr('checked', 'checked');
            this.$('.aadharcard_all_parties_div').show();
        }

        if (formData.pancard_all_parties == isChecked) {
            $('#pancard_all_parties').attr('checked', 'checked');
            this.$('.pancard_all_parties_div').show();
        }
        if (formData.alteration_name_firm == isChecked) {
            $('#alteration_name_firm').attr('checked', 'checked');
            this.$('.alteration_name_firm_div').show();
        }


        if (formData.application_of_firm_document != '') {
            $('#application_of_firm_container_for_psfregistration_view').hide();
            $('#apploication_of_firm_name_image_view').attr('src', PSFREG_DOC_PATH + formData.application_of_firm_document);
            $('#apploication_of_firm_name_container_view').show();
            $('#apploication_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.application_of_firm_document);
        }

        if (formData.formII_document != '') {
            $('#formII_of_firm_container_for_psfregistration_view').hide();
            $('#formII_of_firm_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.formII_document);
            $('#formII_of_firm_name_container_for_psfregistration_view').show();
            $('#formII_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.formII_document);
        }

        if (formData.partnership_deed != '') {
            $('#partnershipdeed_of_firm_container_for_psfregistration_view').hide();
            $('#partnershipdeed_of_firm_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.partnership_deed);
            $('#partnershipdeed_of_firm_name_container_for_psfregistration_view').show();
            $('#partnershipdeed_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.partnership_deed);
        }
        if (formData.aadharcard != '') {
            $('#aadharcard_of_firm_container_for_psfregistration_view').hide();
            $('#aadharcard_of_firm_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.aadharcard);
            $('#aadharcard_of_firm_name_container_for_psfregistration_view').show();
            $('#aadharcard_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.partnership_deed);
        }
        if (formData.pancard != '') {
            $('#pancard_of_firm_container_for_psfregistration_view').hide();
            $('#pancard_of_firm_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.pancard);
            $('#pancard_of_firm_name_container_for_psfregistration_view').show();
            $('#pancard_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.pancard);
        }
        if (formData.alteration_name_firm_doc != '') {
            $('#alteration_name_firm_doc_container_for_psfregistration_view').hide();
            $('#alteration_name_firm_doc_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.alteration_name_firm_doc);
            $('#alteration_name_firm_doc_name_container_for_psfregistration_view').show();
            $('#alteration_name_firm_doc_name_download').attr("href", PSFREG_DOC_PATH + formData.alteration_name_firm_doc);
        }
        if (formData.retirement_form != '') {
            $('#retirement_of_firm_container_for_psfregistration_view').hide();
            $('#retirement_of_firm_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.retirement_form);
            $('#retirement_of_firm_name_container_for_psfregistration_view').show();
            $('#retirement_of_firm_name_download').attr("href", PSFREG_DOC_PATH + formData.retirement_form);
        }

        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_psfregistration_view').hide();
            $('#seal_and_stamp_name_image_for_psfregistration_view').attr('src', PSFREG_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_psfregistration_view').show();
            $('#seal_and_stamp_download').attr("href", PSFREG_DOC_PATH + formData.signature);
        }

        // var proprietorInfo = JSON.parse(formData.proprietor_details);
        // $.each(proprietorInfo, function(key, value){
        //     that.addMultipleProprietor(value);
        // })
    },
    checkValidationForPsfregistration: function (psfregistrationData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!psfregistrationData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!psfregistrationData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!psfregistrationData.firm_name) {
            return getBasicMessageAndFieldJSONArray('firm_name', firmNameValidationMessage);
        }
        if (!psfregistrationData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!psfregistrationData.principal_address) {
            return getBasicMessageAndFieldJSONArray('principal_address', principaladdressValidationMessage);
        }
        // if (!psfregistrationData.other_address) {
        //     return getBasicMessageAndFieldJSONArray('other_address',otheraddressValidationMessage);
        // }
        if (!psfregistrationData.firm_duration) {
            return getBasicMessageAndFieldJSONArray('firm_duration');
        }
        return '';
    },
    //Psfregistration
    askForSubmitPsfregistration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Psfregistration.listview.submitPsfregistration(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    //psfregistration
    submitPsfregistration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var psfregistrationData = $('#psfregistration_form').serializeFormJSON();
        var validationData = that.checkValidationForPsfregistration(psfregistrationData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('psfregistration-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#application_of_firm_container_for_psfregistration').is(':visible')) {
            var applicationOfLetter = $('#apploication_of_firm_for_psfregistration').val();
            if (applicationOfLetter == '') {
                $('#apploication_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-apploication_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                return false;
            }
            var applicationOfLetterMessage = fileUploadValidation('apploication_of_firm_for_psfregistration');
            if (applicationOfLetterMessage != '') {
                $('#apploication_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-apploication_of_firm_for_psfregistration', applicationOfLetterMessage);
                return false;
            }
        }

        //------------------------Form No. II------

        if ($('#formII_of_firm_container_for_psfregistration').is(':visible')) {
            var formII = $('#formII_of_firm_for_psfregistration').val();
            if (formII == '') {
                $('#formII_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-formII_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                return false;
            }
            var formIIMessage = fileUploadValidation('formII_of_firm_for_psfregistration');
            if (formIIMessage != '') {
                $('#formII_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-formII_of_firm_for_psfregistration', formIIMessage);
                return false;
            }
        }
        //------------------------Partnership Deed------

        if ($('#partnershipdeed_of_firm_container_for_psfregistration').is(':visible')) {
            var deed = $('#partnershipdeed_of_firm_for_psfregistration').val();
            if (deed == '') {
                $('#partnershipdeed_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-partnershipdeed_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                return false;
            }
            var deedMessage = fileUploadValidation('partnershipdeed_of_firm_for_psfregistration');
            if (deedMessage != '') {
                $('#partnershipdeed_of_firm_for_psfregistration').focus();
                validationMessageShow('psfregistration-partnershipdeed_of_firm_for_psfregistration', deedMessage);
                return false;
            }
        }
        //------------------------Aadhar Card------
        if (psfregistrationData.aadharcard_all_parties == isChecked) {
            if ($('#aadharcard_of_firm_container_for_psfregistration').is(':visible')) {
                var aadharcard = $('#aadharcard_of_firm_for_psfregistration').val();
                if (aadharcard == '') {
                    $('#aadharcard_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-aadharcard_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                    return false;
                }
                var aadharcardMessage = pdffileUploadValidation('aadharcard_of_firm_for_psfregistration', 2048);
                if (aadharcardMessage != '') {
                    $('#aadharcard_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-aadharcard_of_firm_for_psfregistration', aadharcardMessage);
                    return false;
                }
            }
        }

        //------------------------Pancard------
        if (psfregistrationData.pancard_all_parties == isChecked) {
            if ($('#pancard_of_firm_container_for_psfregistration').is(':visible')) {
                var pancard = $('#pancard_of_firm_for_psfregistration').val();
                if (pancard == '') {
                    $('#pancard_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-pancard_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                    return false;
                }
                var pancardMessage = pdffileUploadValidation('pancard_of_firm_for_psfregistration', 2048);
                if (pancardMessage != '') {
                    $('#pancard_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-pancard_of_firm_for_psfregistration', pancardMessage);
                    return false;
                }
            }
        }
        //------------------------Retirement form------
        if (psfregistrationData.import_from_outside_ret == isChecked) {
            if ($('#retirement_of_firm_container_for_psfregistration').is(':visible')) {
                var retirementform = $('#retirement_of_firm_for_psfregistration').val();
                if (retirementform == '') {
                    $('#retirement_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-retirement_of_firm_for_psfregistration', uploadDocumentValidationMessage);
                    return false;
                }
                var retirementformMessage = fileUploadValidation('retirement_of_firm_for_psfregistration');
                if (retirementformMessage != '') {
                    $('#retirement_of_firm_for_psfregistration').focus();
                    validationMessageShow('psfregistration-retirement_of_firm_for_psfregistration', retirementformMessage);
                    return false;
                }
            }
        }
        //-------------------Seal and Stamp---------------
        if ($('#seal_and_stamp_container_for_psfregistration').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_psfregistration').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_psfregistration').focus();
                validationMessageShow('psfregistration-seal_and_stamp_for_psfregistration', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_psfregistration');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_psfregistration').focus();
                validationMessageShow('psfregistration-seal_and_stamp_for_psfregistration', sealAndStampMessage);
                return false;
            }
        }


        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_psfregistration') : $('#submit_btn_for_psfregistration');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var psfregistrationData = new FormData($('#psfregistration_form')[0]);
        psfregistrationData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        // psfregistrationData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        psfregistrationData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'psfregistration/submit_psfregistration',
            data: psfregistrationData,
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
                validationMessageShow('psfregistration', textStatus.statusText);
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
                    validationMessageShow('psfregistration', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Psfregistration.router.navigate('psfregistration', {'trigger': true});
            }
        });
    },

    askForRemove: function (psfregistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!psfregistration_id) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Psfregistration.listview.removeDocument(\'' + psfregistration_id + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (psfregistration_id) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!psfregistration_id) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'psfregistration/remove_document',
            data: $.extend({}, {'psfregistration_id': psfregistration_id}, getTokenData()),
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
                validationMessageShow('psfregistration', textStatus.statusText);
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
                    validationMessageShow('psfregistration', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_psfregistration').hide();
                $('#seal_and_stamp_name_image_for_psfregistration').attr('src', '');
                $('#seal_and_stamp_container_for_psfregistration').show();
                $('#seal_and_stamp_for_psfregistration').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(proprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#psfregistration_id_for_psfregistration_form1').val(psfregistrationId);
        $('#psfregistration_form1_pdf_form').submit();
        $('#psfregistration_id_for_psfregistration_form1').val('');
    },

    openUploadChallan: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + psfregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'psfregistration/get_psfregistration_data_by_psfregistration_id',
            type: 'post',
            data: $.extend({}, {'psfregistration_id': psfregistrationId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var psfregistrationData = parseData.psfregistration_data;
                showPopup();
                if (psfregistrationData.payment_type == VALUE_ONE) {
                    psfregistrationData.utitle = 'Challan Copy';
                } else {
                    psfregistrationData.utitle = 'Payment Details';
                }
                psfregistrationData.module_type = VALUE_SEVEN;
                $('#popup_container').html(psfregistrationUploadChallanTemplate(psfregistrationData));
                loadFB(VALUE_SEVEN, parseData.fb_data, psfregistrationData.payment_type, psfregistrationData.show_remove_upload_btn, psfregistrationData.show_dropdown, psfregistrationData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'psfregistration_upload_challan', psfregistrationData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'psfregistration_upload_challan', 'uc', 'radio', '#fb', VALUE_SEVEN);
                if (psfregistrationData.challan != '') {
                    $('#challan_container_for_psfregistration_upload_challan').hide();
                    $('#challan_name_container_for_psfregistration_upload_challan').show();
                    $('#challan_name_href_for_psfregistration_upload_challan').attr('href', 'documents/psfregistration/' + psfregistrationData.challan);
                    $('#challan_name_for_psfregistration_upload_challan').html(psfregistrationData.challan);
                    $('#challan_remove_btn_for_psfregistration_upload_challan').attr('onclick', 'Psfregistration.listview.removeChallan("' + psfregistrationData.psfregistration_id + '")');
                }
            }
        });
    },

    removeChallan: function (psfregistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'psfregistration/remove_challan',
            data: $.extend({}, {'psfregistration_id': psfregistrationId}, getTokenData()),
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
                validationMessageShow('psfregistration-uc', textStatus.statusText);
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
                    validationMessageShow('psfregistration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-psfregistration-uc').html(parseData.message);
                removeDocument('challan', 'psfregistration_upload_challan');
                $('#status_' + psfregistrationId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-psfregistration-uc').html('');
        validationMessageHide();
        var psfregistrationId = $('#psfregistration_id_for_psfregistration_upload_challan').val();
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_psfregistration_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_psfregistration_upload_challan_1').focus();
            validationMessageShow('psfregistration-uc-payment_type_for_psfregistration_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_psfregistration_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_psfregistration_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_psfregistration_upload_challan').focus();
                validationMessageShow('psfregistration-uc-challan_for_psfregistration_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_psfregistration_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_psfregistration_upload_challan').focus();
                validationMessageShow('psfregistration-uc-challan_for_psfregistration_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_SEVEN, 'psfregistration-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_psfregistration_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#psfregistration_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'psfregistration/upload_challan',
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
                validationMessageShow('psfregistration-uc', textStatus.statusText);
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
                    validationMessageShow('psfregistration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + psfregistrationId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + psfregistrationId).show();
                }
                $('#total_fees_' + psfregistrationId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + psfregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'psfregistration/get_psfregistration_data_by_psfregistration_id',
            type: 'post',
            data: $.extend({}, {'psfregistration_id': psfregistrationId}, getTokenData()),
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
                var psfregistrationData = parseData.psfregistration_data;
                showPopup();
                $('#popup_container').html(psfregistrationApproveTemplate(psfregistrationData));
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
        var formData = $('#approve_psfregistration_form').serializeFormJSON();
        if (!formData.psfregistration_id_for_psfregistration_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_psfregistration_approve) {
            $('#registration_number_for_psfregistration_approve').focus();
            validationMessageShow('psfregistration-approve-registration_number_for_psfregistration_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_psfregistration_approve) {
            $('#valid_upto_for_psfregistration_approve').focus();
            validationMessageShow('psfregistration-approve-valid_upto_for_psfregistration_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_psfregistration_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_psfregistration_approve').focus();
            validationMessageShow('psfregistration-approve-certificate_file_for_psfregistration_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_psfregistration_approve) {
            $('#remarks_for_psfregistration_approve').focus();
            validationMessageShow('psfregistration-approve-remarks_for_psfregistration_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_psfregistration_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_psfregistration_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'psfregistration/approve_application',
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
                validationMessageShow('psfregistration-approve', textStatus.statusText);
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
                    validationMessageShow('psfregistration-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.psfregistration_id_for_psfregistration_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.psfregistration_id_for_psfregistration_approve).remove();
                $('#approve_btn_for_app_' + formData.psfregistration_id_for_psfregistration_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.psfregistration_id_for_psfregistration_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.psfregistration_id_for_psfregistration_approve).show();
                $('#so_status_' + formData.psfregistration_id_for_psfregistration_approve).html(dateTimeDays(formData.psfregistration_id_for_psfregistration_approve, parseData, VALUE_SEVEN));
            }
        });
    },
    askForRejectApplication: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + psfregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'psfregistration/get_psfregistration_data_by_psfregistration_id',
            type: 'post',
            data: $.extend({}, {'psfregistration_id': psfregistrationId}, getTokenData()),
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
                var psfregistrationData = parseData.psfregistration_data;
                showPopup();
                $('#popup_container').html(psfregistrationRejectTemplate(psfregistrationData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_psfregistration_form').serializeFormJSON();
        if (!formData.psfregistration_id_for_psfregistration_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_psfregistration_reject) {
            $('#remarks_for_psfregistration_reject').focus();
            validationMessageShow('psfregistration-reject-remarks_for_psfregistration_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'psfregistration/reject_application',
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
                validationMessageShow('psfregistration-reject', textStatus.statusText);
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
                    validationMessageShow('psfregistration-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.psfregistration_id_for_psfregistration_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.psfregistration_id_for_psfregistration_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.psfregistration_id_for_psfregistration_reject).remove();
                $('#reject_btn_for_app_' + formData.psfregistration_id_for_psfregistration_reject).remove();
                $('#approve_btn_for_app_' + formData.psfregistration_id_for_psfregistration_reject).remove();
                $('#so_status_' + formData.psfregistration_id_for_psfregistration_reject).html(dateTimeDays(formData.psfregistration_id_for_psfregistration_reject, parseData, VALUE_SEVEN));
            }
        });
    },
    generateCertificate: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#psfregistration_id_for_certificate').val(psfregistrationId);
        $('#psfregistration_certificate_pdf_form').submit();
        $('#psfregistration_id_for_certificate').val('');
    },
    getQueryData: function (psfregistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!psfregistrationId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SEVEN;
        templateData.module_id = psfregistrationId;
        var btnObj = $('#query_btn_for_psf_' + psfregistrationId);
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
                tmpData.application_number = regNoRenderer(VALUE_SEVEN, moduleData.psfregistration_id);
                tmpData.applicant_name = moduleData.firm_name;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_SEVEN;
                tmpData.module_id = psfregistrationId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (psfregistrationId) {
        if (!psfregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + psfregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'psfregistration/get_psfregistration_data_by_psfregistration_id',
            type: 'post',
            data: $.extend({}, {'psfregistration_id': psfregistrationId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var psfregistrationData = parseData.psfregistration_data;
                showPopup();
                if (psfregistrationData.payment_type == VALUE_ONE || psfregistrationData.payment_type == VALUE_THREE) {
                    psfregistrationData.user_payment_type_text = paymentTypeArray[psfregistrationData.payment_type];
                } else {
                    psfregistrationData.user_payment_type_text = userPaymentTypeArray[psfregistrationData.user_payment_type] ? userPaymentTypeArray[psfregistrationData.user_payment_type] : '';
                }
                if (psfregistrationData.payment_type == VALUE_ONE) {
                    psfregistrationData.utitle = 'Fees Paid Challan Copy';
                } else if (psfregistrationData.payment_type == VALUE_TWO && psfregistrationData.user_payment_type == VALUE_ONE) {
                    psfregistrationData.utitle = 'Demand Draft (DD) Copy';
                }
                psfregistrationData.module_type = VALUE_SEVEN;
                $('#popup_container').html(psfregistrationViewPaymentTemplate(psfregistrationData));
                loadFB(VALUE_SEVEN, parseData.fb_data, psfregistrationData.payment_type);
                loadPH(VALUE_SEVEN, psfregistrationData.psfregistration_id, parseData.ph_data);
                if (psfregistrationData.payment_type == VALUE_ONE || (psfregistrationData.payment_type == VALUE_TWO && psfregistrationData.user_payment_type == VALUE_ONE)) {
                    if (psfregistrationData.fees_paid_challan != '') {
                        $('#vp_container_for_psfregistration').show();
                        $('#fees_paid_challan_name_href_for_psfregistration').attr('href', PSFREG_DOC_PATH + psfregistrationData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_psfregistration').html(psfregistrationData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
