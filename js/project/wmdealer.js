var dealerListTemplate = Handlebars.compile($('#dealer_list_template').html());
var dealerTableTemplate = Handlebars.compile($('#dealer_table_template').html());
var dealerActionTemplate = Handlebars.compile($('#dealer_action_template').html());
var dealerFormTemplate = Handlebars.compile($('#dealer_form_template').html());
var dealerViewTemplate = Handlebars.compile($('#dealer_view_template').html());
var dealerProprietorInfoTemplate = Handlebars.compile($('#dealer_proprietor_info_template').html());
var dealerUploadChallanTemplate = Handlebars.compile($('#dealer_upload_challan_template').html());
var dealerApproveTemplate = Handlebars.compile($('#dealer_approve_template').html());
var dealerRejectTemplate = Handlebars.compile($('#dealer_reject_template').html());
var dealerViewPaymentTemplate = Handlebars.compile($('#dealer_view_payment_template').html());

var tempPersonCnt = 1;

var Dealer = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Dealer.Router = Backbone.Router.extend({
    routes: {
        'dealer': 'renderList',
        'dealer_form': 'renderListForForm',
        'edit_dealer_form': 'renderList',
        'view_dealer_form': 'renderList',
    },
    renderList: function () {
        Dealer.listview.listPage();
    },
    renderListForForm: function () {
        Dealer.listview.listPageDealerForm();
    }
});
Dealer.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="import_from_outside"]': 'hasOutsideImportEvent',
        'click input[name="any_previous_application"]': 'hasAnyPreviousApplicationsEvent',
        'click input[name="is_limited_company"]': 'hasLimitedCompanyEvent',
    },
    hasOutsideImportEvent: function (event) {
        var val = $('input[name=import_from_outside]:checked').val();
        if (val === '1') {
            this.$('.import_from_outside_div').show();
        } else {
            this.$('.import_from_outside_div').hide();

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
        addClass('dealer', 'active');
        Dealer.router.navigate('dealer');
        var templateData = {};
        this.$el.html(dealerListTemplate(templateData));
        this.loadDealerData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageDealerForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('dealer', 'active');
        this.$el.html(dealerListTemplate);
        this.newDealerForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return dealerActionTemplate(rowData);
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
        rowData.module_type = VALUE_THREE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return dealerActionTemplate(rowData);
    },
    loadDealerData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD)
                return regNoRenderer(VALUE_THREE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THREE, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THREE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['dealer_data'], function (index, objData) {
                json['dealer_data'][index]['query_movement_string'] = qmData[objData.dealer_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.dealer_id] + '</table>') : '-';
            });
            return json['dealer_data'];
        };
        var that = this;
        Dealer.router.navigate('dealer');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Dealer.listview.loadDealerData();');
        $('#dealer_form_and_datatable_container').html(dealerTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_dealer_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_dealer_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_dealer_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_dealer_list', false);
        allowOnlyIntegerValue('mobile_number_for_dealer_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_dealer_list', false);
        $('#district_for_dealer_list').val(searchData.search_district);
        $('#status_for_dealer_list').val(searchData.search_status);
        $('#app_timing_for_dealer_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_dealer_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_dealer_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_dealer_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_dealer_list').attr('disabled', 'disabled');
        }
        dealerDataTable = $('#dealer_datatable').DataTable({
            ajax: {url: 'dealer/get_dealer_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'dealer_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'dealer_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'dealer_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'dealer_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#dealer_datatable_filter').remove();
        $('#dealer_datatable tbody').on('click', 'td.details-control', function () {
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
    newDealerForm: function (isEdit, parseData) {
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
            var formData = parseData.dealer_data;
            Dealer.router.navigate('edit_dealer_form');
        } else {
            var formData = {};
            Dealer.router.navigate('dealer_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.dealer_data = parseData.dealer_data;
        templateData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        templateData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        $('#dealer_form_and_datatable_container').html(dealerFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');


        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
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
            if (formData.model_approval_certificate != '') {
                $('#model_approval_certificate_container_for_dealer').hide();
                $('#model_approval_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.model_approval_certificate);
                $('#model_approval_certificate_name_container_for_dealer').show();
                $('#model_approval_certificate_download').attr("href", DEALER_DOC_PATH + formData.model_approval_certificate);
            }
            if (formData.proof_of_ownership != '') {
                $('#proof_of_ownership_container_for_dealer').hide();
                $('#proof_of_ownership_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.proof_of_ownership);
                $('#proof_of_ownership_name_container_for_dealer').show();
                $('#proof_of_ownership_download').attr("href", DEALER_DOC_PATH + formData.proof_of_ownership);
            }
            if (formData.gst_certificate != '') {
                $('#gst_certificate_container_for_dealer').hide();
                $('#gst_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.gst_certificate);
                $('#gst_certificate_name_container_for_dealer').show();
                $('#gst_certificate_download').attr("href", DEALER_DOC_PATH + formData.gst_certificate);
            }
            if (formData.partnership_deed != '') {
                $('#partnership_deed_container_for_dealer').hide();
                $('#partnership_deed_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.partnership_deed);
                $('#partnership_deed_name_container_for_dealer').show();
                $('#partnership_deed_download').attr("href", DEALER_DOC_PATH + formData.partnership_deed);
            }
            if (formData.memorandum_of_association != '') {
                $('#memorandum_of_association_container_for_dealer').hide();
                $('#memorandum_of_association_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.memorandum_of_association);
                $('#memorandum_of_association_name_container_for_dealer').show();
                $('#memorandum_of_association_download').attr("href", DEALER_DOC_PATH + formData.memorandum_of_association);
            }
            if (formData.list_of_raw_material != '') {
                $('#list_of_raw_material_container_for_dealer').hide();
                $('#list_of_raw_material_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_raw_material);
                $('#list_of_raw_material_name_container_for_dealer').show();
                $('#list_of_raw_material_download').attr("href", DEALER_DOC_PATH + formData.list_of_raw_material);
            }
            if (formData.list_of_machinery != '') {
                $('#list_of_machinery_container_for_dealer').hide();
                $('#list_of_machinery_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_machinery);
                $('#list_of_machinery_name_container_for_dealer').show();
                $('#list_of_machinery_download').attr("href", DEALER_DOC_PATH + formData.list_of_machinery);
            }
            if (formData.list_of_wm != '') {
                $('#list_of_wm_container_for_dealer').hide();
                $('#list_of_wm_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_wm);
                $('#list_of_wm_name_container_for_dealer').show();
                $('#list_of_wm_download').attr("href", DEALER_DOC_PATH + formData.list_of_wm);
            }
            if (formData.list_of_directors != '') {
                $('#list_of_directors_container_for_dealer').hide();
                $('#list_of_directors_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_directors);
                $('#list_of_directors_name_container_for_dealer').show();
                $('#list_of_directors_download').attr("href", DEALER_DOC_PATH + formData.list_of_directors);
            }

            this.$('.proprietor_info_div').show();

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
        $('#dealer_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitDealer($('#submit_btn_for_dealer'));
            }
        });
    },
    editOrViewDealer: function (btnObj, dealerId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!dealerId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer/get_dealer_data_by_id',
            type: 'post',
            data: $.extend({}, {'dealer_id': dealerId}, getTokenData()),
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
                    that.newDealerForm(isEdit, parseData);
                } else {
                    that.viewDealerForm(parseData);
                }
            }
        });
    },
    viewDealerForm: function (parseData) {
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
        var formData = parseData.dealer_data;
        Dealer.router.navigate('view_dealer_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#dealer_form_and_datatable_container').html(dealerViewTemplate(formData));
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
            $('#import_model_download').attr("href", baseUrl + DEALER_DOC_PATH + formData.import_model);
        }

        if (formData.model_approval_certificate != '') {
            $('#model_approval_certificate_container_for_dealer').hide();
            $('#model_approval_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.model_approval_certificate);
            $('#model_approval_certificate_name_container_for_dealer').show();
            $('#model_approval_certificate_download').attr("href", DEALER_DOC_PATH + formData.model_approval_certificate);
        }
        if (formData.proof_of_ownership != '') {
            $('#proof_of_ownership_container_for_dealer').hide();
            $('#proof_of_ownership_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.proof_of_ownership);
            $('#proof_of_ownership_name_container_for_dealer').show();
            $('#proof_of_ownership_download').attr("href", DEALER_DOC_PATH + formData.proof_of_ownership);
        }
        if (formData.gst_certificate != '') {
            $('#gst_certificate_container_for_dealer').hide();
            $('#gst_certificate_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.gst_certificate);
            $('#gst_certificate_name_container_for_dealer').show();
            $('#gst_certificate_download').attr("href", DEALER_DOC_PATH + formData.gst_certificate);
        }
        if (formData.partnership_deed != '') {
            $('#partnership_deed_container_for_dealer').hide();
            $('#partnership_deed_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.partnership_deed);
            $('#partnership_deed_name_container_for_dealer').show();
            $('#partnership_deed_download').attr("href", DEALER_DOC_PATH + formData.partnership_deed);
        }
        if (formData.memorandum_of_association != '') {
            $('#memorandum_of_association_container_for_dealer').hide();
            $('#memorandum_of_association_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.memorandum_of_association);
            $('#memorandum_of_association_name_container_for_dealer').show();
            $('#memorandum_of_association_download').attr("href", DEALER_DOC_PATH + formData.memorandum_of_association);
        }
        if (formData.list_of_raw_material != '') {
            $('#list_of_raw_material_container_for_dealer').hide();
            $('#list_of_raw_material_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_raw_material);
            $('#list_of_raw_material_name_container_for_dealer').show();
            $('#list_of_raw_material_download').attr("href", DEALER_DOC_PATH + formData.list_of_raw_material);
        }
        if (formData.list_of_machinery != '') {
            $('#list_of_machinery_container_for_dealer').hide();
            $('#list_of_machinery_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_machinery);
            $('#list_of_machinery_name_container_for_dealer').show();
            $('#list_of_machinery_download').attr("href", DEALER_DOC_PATH + formData.list_of_machinery);
        }
        if (formData.list_of_wm != '') {
            $('#list_of_wm_container_for_dealer').hide();
            $('#list_of_wm_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_wm);
            $('#list_of_wm_name_container_for_dealer').show();
            $('#list_of_wm_download').attr("href", DEALER_DOC_PATH + formData.list_of_wm);
        }
        if (formData.list_of_directors != '') {
            $('#list_of_directors_container_for_dealer').hide();
            $('#list_of_directors_name_image_for_dealer').attr('src', DEALER_DOC_PATH + formData.list_of_directors);
            $('#list_of_directors_name_container_for_dealer').show();
            $('#list_of_directors_download').attr("href", DEALER_DOC_PATH + formData.list_of_directors);
        }
    },
    checkValidationForDealer: function (dealerData) {
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
        if (dealerData.any_previous_application == isChecked) {
            if (!dealerData.license_application_date) {
                return getBasicMessageAndFieldJSONArray('license_application_date', appliedDateValidationMessage);
            }
            if (!dealerData.license_application_result) {
                return getBasicMessageAndFieldJSONArray('license_application_result', licenseResultValidationMessage);
            }
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
    askForSubmitDealer: function (moduleType) {
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
        var yesEvent = 'Dealer.listview.submitDealer(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitDealer: function (moduleType) {
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
        var dealerData = $('#dealer_form').serializeFormJSON();
        var validationData = that.checkValidationForDealer(dealerData);
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

        if ($('#model_approval_certificate_container_for_dealer').is(':visible')) {
            var supportDocument = $('#model_approval_certificate_for_dealer').val();
            if (supportDocument == '') {
                $('#model_approval_certificate_for_dealer').focus();
                validationMessageShow('dealer-model_approval_certificate_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('model_approval_certificate_for_dealer');
            if (supportDocumentMessage != '') {
                $('#model_approval_certificate_for_dealer').focus();
                validationMessageShow('dealer-model_approval_certificate_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#proof_of_ownership_container_for_dealer').is(':visible')) {
            var supportDocument = $('#proof_of_ownership_for_dealer').val();
            if (supportDocument == '') {
                $('#proof_of_ownership_for_dealer').focus();
                validationMessageShow('dealer-proof_of_ownership_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('proof_of_ownership_for_dealer');
            if (supportDocumentMessage != '') {
                $('#proof_of_ownership_for_dealer').focus();
                validationMessageShow('dealer-proof_of_ownership_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#gst_certificate_container_for_dealer').is(':visible')) {
            var supportDocument = $('#gst_certificate_for_dealer').val();
            if (supportDocument == '') {
                $('#gst_certificate_for_dealer').focus();
                validationMessageShow('dealer-gst_certificate_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('gst_certificate_for_dealer');
            if (supportDocumentMessage != '') {
                $('#gst_certificate_for_dealer').focus();
                validationMessageShow('dealer-gst_certificate_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#partnership_deed_container_for_dealer').is(':visible')) {
            var supportDocument = $('#partnership_deed_for_dealer').val();
            if (supportDocument == '') {
                $('#partnership_deed_for_dealer').focus();
                validationMessageShow('dealer-partnership_deed_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('partnership_deed_for_dealer');
            if (supportDocumentMessage != '') {
                $('#partnership_deed_for_dealer').focus();
                validationMessageShow('dealer-partnership_deed_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#memorandum_of_association_container_for_dealer').is(':visible')) {
            var supportDocument = $('#memorandum_of_association_for_dealer').val();
            if (supportDocument == '') {
                $('#memorandum_of_association_for_dealer').focus();
                validationMessageShow('dealer-memorandum_of_association_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('memorandum_of_association_for_dealer');
            if (supportDocumentMessage != '') {
                $('#memorandum_of_association_for_dealer').focus();
                validationMessageShow('dealer-memorandum_of_association_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_raw_material_container_for_dealer').is(':visible')) {
            var supportDocument = $('#list_of_raw_material_for_dealer').val();
            if (supportDocument == '') {
                $('#list_of_raw_material_for_dealer').focus();
                validationMessageShow('dealer-list_of_raw_material_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_raw_material_for_dealer');
            if (supportDocumentMessage != '') {
                $('#list_of_raw_material_for_dealer').focus();
                validationMessageShow('dealer-list_of_raw_material_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_machinery_container_for_dealer').is(':visible')) {
            var supportDocument = $('#list_of_machinery_for_dealer').val();
            if (supportDocument == '') {
                $('#list_of_machinery_for_dealer').focus();
                validationMessageShow('dealer-list_of_machinery_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_machinery_for_dealer');
            if (supportDocumentMessage != '') {
                $('#list_of_machinery_for_dealer').focus();
                validationMessageShow('dealer-list_of_machinery_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_wm_container_for_dealer').is(':visible')) {
            var supportDocument = $('#list_of_wm_for_dealer').val();
            if (supportDocument == '') {
                $('#list_of_wm_for_dealer').focus();
                validationMessageShow('dealer-list_of_wm_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_wm_for_dealer');
            if (supportDocumentMessage != '') {
                $('#list_of_wm_for_dealer').focus();
                validationMessageShow('dealer-list_of_wm_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_directors_container_for_dealer').is(':visible')) {
            var supportDocument = $('#list_of_directors_for_dealer').val();
            if (supportDocument == '') {
                $('#list_of_directors_for_dealer').focus();
                validationMessageShow('dealer-list_of_directors_for_dealer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_directors_for_dealer');
            if (supportDocumentMessage != '') {
                $('#list_of_directors_for_dealer').focus();
                validationMessageShow('dealer-list_of_directors_for_dealer', supportDocumentMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_dealer') : $('#submit_btn_for_dealer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var dealerData = new FormData($('#dealer_form')[0]);
        dealerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        dealerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        dealerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'dealer/submit_dealer',
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
                Dealer.router.navigate('dealer', {'trigger': true});
            }
        });
    },

    askForRemove: function (dealerId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Dealer.listview.removeDocument(\'' + dealerId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (dealerId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer/remove_document',
            data: $.extend({}, {'dealer_id': dealerId, 'document_id': docId}, getTokenData()),
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
        $('#proprietor_info_container').append(dealerProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#dealer_id_for_dealer_form1').val(dealerId);
        $('#dealer_form1_pdf_form').submit();
        $('#dealer_id_for_dealer_form1').val('');
    },

    openUploadChallan: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + dealerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer/get_dealer_data_by_dealer_id',
            type: 'post',
            data: $.extend({}, {'dealer_id': dealerId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var dealerData = parseData.dealer_data;
                showPopup();
                if (dealerData.payment_type == VALUE_ONE) {
                    dealerData.utitle = 'Challan Copy';
                } else {
                    dealerData.utitle = 'Payment Details';
                }
                dealerData.module_type = VALUE_THREE;
                $('#popup_container').html(dealerUploadChallanTemplate(dealerData));
                loadFB(VALUE_THREE, parseData.fb_data, dealerData.payment_type, dealerData.show_remove_upload_btn, dealerData.show_dropdown, dealerData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'dealer_upload_challan', dealerData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'dealer_upload_challan', 'uc', 'radio', '#fb', VALUE_THREE);
                if (dealerData.challan != '') {
                    $('#challan_container_for_dealer_upload_challan').hide();
                    $('#challan_name_container_for_dealer_upload_challan').show();
                    $('#challan_name_href_for_dealer_upload_challan').attr('href', 'documents/dealer/' + dealerData.challan);
                    $('#challan_name_for_dealer_upload_challan').html(dealerData.challan);
                    $('#challan_remove_btn_for_dealer_upload_challan').attr('onclick', 'Dealer.listview.removeChallan("' + dealerData.dealer_id + '")');
                }
            }
        });
    },
    removeChallan: function (dealerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer/remove_challan',
            data: $.extend({}, {'dealer_id': dealerId}, getTokenData()),
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
                removeDocument('challan', 'dealer_upload_challan');
                $('#status_' + dealerId).html(appStatusArray[VALUE_TWO]);
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
        var dealerId = $('#dealer_id_for_dealer_upload_challan').val();
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_dealer_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_dealer_upload_challan_1').focus();
            validationMessageShow('dealer-uc-payment_type_for_dealer_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_dealer_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_dealer_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_dealer_upload_challan').focus();
                validationMessageShow('dealer-uc-challan_for_dealer_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_dealer_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_dealer_upload_challan').focus();
                validationMessageShow('dealer-uc-challan_for_dealer_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THREE, 'dealer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_dealer_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#dealer_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'dealer/upload_challan',
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
                $('#status_' + dealerId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + dealerId).show();
                }
                $('#total_fees_' + dealerId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + dealerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer/get_dealer_data_by_dealer_id',
            type: 'post',
            data: $.extend({}, {'dealer_id': dealerId}, getTokenData()),
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
                var dealerData = parseData.dealer_data;
                showPopup();
                $('#popup_container').html(dealerApproveTemplate(dealerData));
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
        var formData = $('#approve_dealer_form').serializeFormJSON();
        if (!formData.dealer_id_for_dealer_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_dealer_approve) {
            $('#registration_number_for_dealer_approve').focus();
            validationMessageShow('dealer-approve-registration_number_for_dealer_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_dealer_approve) {
            $('#valid_upto_for_dealer_approve').focus();
            validationMessageShow('dealer-approve-valid_upto_for_dealer_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_dealer_approve) {
            $('#remarks_for_dealer_approve').focus();
            validationMessageShow('dealer-approve-remarks_for_dealer_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer/approve_application',
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
                $('#status_' + formData.dealer_id_for_dealer_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.dealer_id_for_dealer_approve).remove();
                $('#approve_btn_for_app_' + formData.dealer_id_for_dealer_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.dealer_id_for_dealer_approve).show();
                $('#so_status_' + formData.dealer_id_for_dealer_approve).html(dateTimeDays(formData.dealer_id_for_dealer_approve, parseData, VALUE_THREE));
            }
        });
    },
    askForRejectApplication: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + dealerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer/get_dealer_data_by_dealer_id',
            type: 'post',
            data: $.extend({}, {'dealer_id': dealerId}, getTokenData()),
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
                var dealerData = parseData.dealer_data;
                showPopup();
                $('#popup_container').html(dealerRejectTemplate(dealerData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_dealer_form').serializeFormJSON();
        if (!formData.dealer_id_for_dealer_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_dealer_reject) {
            $('#remarks_for_dealer_reject').focus();
            validationMessageShow('dealer-reject-remarks_for_dealer_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'dealer/reject_application',
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
                $('#status_' + formData.dealer_id_for_dealer_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.dealer_id_for_dealer_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.dealer_id_for_dealer_reject).remove();
                $('#reject_btn_for_app_' + formData.dealer_id_for_dealer_reject).remove();
                $('#approve_btn_for_app_' + formData.dealer_id_for_dealer_reject).remove();
                $('#so_status_' + formData.dealer_id_for_dealer_reject).html(dateTimeDays(formData.dealer_id_for_dealer_reject, parseData, VALUE_THREE));
            }
        });
    },
    generateCertificate: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#dealer_id_for_certificate').val(dealerId);
        $('#dealer_certificate_pdf_form').submit();
        $('#dealer_id_for_certificate').val('');
    },
    getQueryData: function (dealerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!dealerId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THREE;
        templateData.module_id = dealerId;
        var btnObj = $('#query_btn_for_wm_' + dealerId);
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
                tmpData.application_number = regNoRenderer(VALUE_THREE, moduleData.dealer_id);
                tmpData.applicant_name = moduleData.name_of_dealer;
                tmpData.title = 'Dealer Name';
                tmpData.module_type = VALUE_THREE;
                tmpData.module_id = dealerId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (dealerId) {
        if (!dealerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + dealerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dealer/get_dealer_data_by_dealer_id',
            type: 'post',
            data: $.extend({}, {'dealer_id': dealerId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var dealerData = parseData.dealer_data;
                showPopup();
                if (dealerData.payment_type == VALUE_ONE || dealerData.payment_type == VALUE_THREE) {
                    dealerData.user_payment_type_text = paymentTypeArray[dealerData.payment_type];
                } else {
                    dealerData.user_payment_type_text = userPaymentTypeArray[dealerData.user_payment_type] ? userPaymentTypeArray[dealerData.user_payment_type] : '';
                }
                if (dealerData.payment_type == VALUE_ONE) {
                    dealerData.utitle = 'Fees Paid Challan Copy';
                } else if (dealerData.payment_type == VALUE_TWO && dealerData.user_payment_type == VALUE_ONE) {
                    dealerData.utitle = 'Demand Draft (DD) Copy';
                }
                dealerData.module_type = VALUE_THREE;
                $('#popup_container').html(dealerViewPaymentTemplate(dealerData));
                loadFB(VALUE_THREE, parseData.fb_data, dealerData.payment_type);
                loadPH(VALUE_THREE, dealerData.dealer_id, parseData.ph_data);
                if (dealerData.payment_type == VALUE_ONE || (dealerData.payment_type == VALUE_TWO && dealerData.user_payment_type == VALUE_ONE)) {
                    if (dealerData.fees_paid_challan != '') {
                        $('#vp_container_for_dealer').show();
                        $('#fees_paid_challan_name_href_for_dealer').attr('href', DEALER_DOC_PATH + dealerData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_dealer').html(dealerData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
