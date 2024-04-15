var manufacturerListTemplate = Handlebars.compile($('#manufacturer_list_template').html());
var manufacturerTableTemplate = Handlebars.compile($('#manufacturer_table_template').html());
var manufacturerActionTemplate = Handlebars.compile($('#manufacturer_action_template').html());
var manufacturerFormTemplate = Handlebars.compile($('#manufacturer_form_template').html());
var manufacturerViewTemplate = Handlebars.compile($('#manufacturer_view_template').html());
var manufactureProprietorInfoTemplate = Handlebars.compile($('#manufacture_proprietor_info_template').html());
var manufacturerUploadChallanTemplate = Handlebars.compile($('#manufacturer_upload_challan_template').html());
var manufacturerApproveTemplate = Handlebars.compile($('#manufacturer_approve_template').html());
var manufacturerRejectTemplate = Handlebars.compile($('#manufacturer_reject_template').html());
var manufacturerViewPaymentTemplate = Handlebars.compile($('#manufacturer_view_payment_template').html());

var tempPersonCnt = 1;

var Manufacturer = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Manufacturer.Router = Backbone.Router.extend({
    routes: {
        'manufacturer': 'renderList',
        'manufacturer_form': 'renderListForForm',
        'edit_manufacturer_form': 'renderList',
        'view_manufacturer_form': 'renderList',
    },
    renderList: function () {
        Manufacturer.listview.listPage();
    },
    renderListForForm: function () {
        Manufacturer.listview.listPageManufacturerForm();
    }
});
Manufacturer.listView = Backbone.View.extend({
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
        addClass('manufacturer', 'active');
        Manufacturer.router.navigate('manufacturer');
        var templateData = {};
        this.$el.html(manufacturerListTemplate(templateData));
        this.loadManufacturerData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageManufacturerForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('manufacturer', 'active');
        this.$el.html(manufacturerListTemplate);
        this.newManufacturerForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return manufacturerActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOUR;
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
        return manufacturerActionTemplate(rowData);
    },
    loadManufacturerData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return getAppNoWithRating(VALUE_FOUR, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOUR);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['manufacturer_data'], function (index, objData) {
                json['manufacturer_data'][index]['query_movement_string'] = qmData[objData.manufacturer_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.manufacturer_id] + '</table>') : '-';
            });
            return json['manufacturer_data'];
        };
        var that = this;
        Manufacturer.router.navigate('manufacturer');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Manufacturer.listview.loadManufacturerData();');
        $('#manufacturer_form_and_datatable_container').html(manufacturerTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_manufacturer_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_manufacturer_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_manufacturer_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_manufacturer_list', false);
        allowOnlyIntegerValue('mobile_number_for_manufacturer_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_manufacturer_list', false);
        $('#district_for_manufacturer_list').val(searchData.search_district);
        $('#status_for_manufacturer_list').val(searchData.search_status);
        $('#app_timing_for_manufacturer_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_manufacturer_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_manufacturer_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_manufacturer_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_manufacturer_list').attr('disabled', 'disabled');
        }
        manufacturerDataTable = $('#manufacturer_datatable').DataTable({
            ajax: {url: 'manufacturer/get_manufacturer_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'manufacturer_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'manufacturer_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'manufacturer_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'manufacturer_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#manufacturer_datatable_filter').remove();
        $('#manufacturer_datatable tbody').on('click', 'td.details-control', function () {
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
    newManufacturerForm: function (isEdit, parseData) {
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
            var formData = parseData.manufacturer_data;
            Manufacturer.router.navigate('edit_manufacturer_form');
        } else {
            var formData = {};
            Manufacturer.router.navigate('manufacturer_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.manufacturer_data = parseData.manufacturer_data;
        templateData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        templateData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        templateData.inspection_sample_date = dateTo_DD_MM_YYYY(formData.inspection_sample_date);
        $('#manufacturer_form_and_datatable_container').html(manufacturerFormTemplate((templateData)));
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

            $('#premises_status').val(formData.premises_status);
            $('#identity_choice').val(formData.identity_choice);
            $('#location_of_selling').val(formData.location_of_selling);

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_manufacturer').hide();
                $('#seal_and_stamp_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_manufacturer').show();
                $('#seal_and_stamp_download').attr("href", MENUFACT_DOC_PATH + formData.signature);
            }
            if (formData.support_document != '') {
                $('#support_document_container_for_manufacturer').hide();
                $('#support_document_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.support_document);
                $('#support_document_name_container_for_manufacturer').show();
                $('#support_document_download').attr("href", MENUFACT_DOC_PATH + formData.support_document);
            }
            if (formData.monogram_uploader != '') {
                $('#monogram_uploader_container_for_manufacturer').hide();
                $('#monogram_uploader_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.monogram_uploader);
                $('#monogram_uploader_name_container_for_manufacturer').show();
                $('#monogram_uploader_download').attr("href", MENUFACT_DOC_PATH + formData.monogram_uploader);
            }

            if (formData.model_approval_certificate != '') {
                $('#model_approval_certificate_container_for_manufacturer').hide();
                $('#model_approval_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.model_approval_certificate);
                $('#model_approval_certificate_name_container_for_manufacturer').show();
                $('#model_approval_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.model_approval_certificate);
            }
            if (formData.proof_of_ownership != '') {
                $('#proof_of_ownership_container_for_manufacturer').hide();
                $('#proof_of_ownership_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.proof_of_ownership);
                $('#proof_of_ownership_name_container_for_manufacturer').show();
                $('#proof_of_ownership_download').attr("href", MENUFACT_DOC_PATH + formData.proof_of_ownership);
            }
            if (formData.gst_certificate != '') {
                $('#gst_certificate_container_for_manufacturer').hide();
                $('#gst_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.gst_certificate);
                $('#gst_certificate_name_container_for_manufacturer').show();
                $('#gst_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.gst_certificate);
            }
            if (formData.partnership_deed != '') {
                $('#partnership_deed_container_for_manufacturer').hide();
                $('#partnership_deed_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.partnership_deed);
                $('#partnership_deed_name_container_for_manufacturer').show();
                $('#partnership_deed_download').attr("href", MENUFACT_DOC_PATH + formData.partnership_deed);
            }
            if (formData.memorandum_of_association != '') {
                $('#memorandum_of_association_container_for_manufacturer').hide();
                $('#memorandum_of_association_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.memorandum_of_association);
                $('#memorandum_of_association_name_container_for_manufacturer').show();
                $('#memorandum_of_association_download').attr("href", MENUFACT_DOC_PATH + formData.memorandum_of_association);
            }
            if (formData.list_of_raw_material != '') {
                $('#list_of_raw_material_container_for_manufacturer').hide();
                $('#list_of_raw_material_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_raw_material);
                $('#list_of_raw_material_name_container_for_manufacturer').show();
                $('#list_of_raw_material_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_raw_material);
            }
            if (formData.list_of_machinery != '') {
                $('#list_of_machinery_container_for_manufacturer').hide();
                $('#list_of_machinery_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_machinery);
                $('#list_of_machinery_name_container_for_manufacturer').show();
                $('#list_of_machinery_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_machinery);
            }
            if (formData.list_of_wm != '') {
                $('#list_of_wm_container_for_manufacturer').hide();
                $('#list_of_wm_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_wm);
                $('#list_of_wm_name_container_for_manufacturer').show();
                $('#list_of_wm_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_wm);
            }
            if (formData.list_of_directors != '') {
                $('#list_of_directors_container_for_manufacturer').hide();
                $('#list_of_directors_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_directors);
                $('#list_of_directors_name_container_for_manufacturer').show();
                $('#list_of_directors_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_directors);
            }

            if (formData.is_limited_company == isChecked) {
                $('#is_limited_company').attr('checked', 'checked');
                this.$('.proprietor_info_div').show();

                var proprietorInfo = JSON.parse(formData.proprietor_details);
                $.each(proprietorInfo, function (key, value) {
                    that.addMultipleProprietor(value);
                })

            }

            if (formData.any_previous_application == isChecked) {
                $('#any_previous_application').attr('checked', 'checked');
                this.$('.any_previous_application_div').show();
            }
        }

        generateSelect2();
        datePicker();
        $('#manufacturer_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitManufacturer($('#submit_btn_for_manufacturer'));
            }
        });
    },
    editOrViewManufacturer: function (btnObj, manufacturerId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!manufacturerId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer/get_manufacturer_data_by_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_id': manufacturerId}, getTokenData()),
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
                    that.newManufacturerForm(isEdit, parseData);
                } else {
                    that.viewManufacturerForm(parseData);
                }
            }
        });
    },
    viewManufacturerForm: function (parseData) {
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
        var formData = parseData.manufacturer_data;
        Manufacturer.router.navigate('view_manufacturer_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.inspection_sample_date = dateTo_DD_MM_YYYY(formData.inspection_sample_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#manufacturer_form_and_datatable_container').html(manufacturerViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');
        // console.log(formData.premises_status);
        $('#premises_status').val(formData.premises_status);
        $('#identity_choice').val(formData.identity_choice);
        $('#location_of_selling').val(formData.location_of_selling);


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_manufacturer').hide();
            $('#seal_and_stamp_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_manufacturer').show();
            $('#seal_and_stamp_download').attr("href", MENUFACT_DOC_PATH + formData.signature);
        }

        if (formData.support_document != '') {
            $('#support_document_container_for_manufacturer').hide();
            $('#support_document_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.support_document);
            $('#support_document_name_container_for_manufacturer').show();
            $('#support_document_download').attr("href", MENUFACT_DOC_PATH + formData.support_document);
        }

        if (formData.monogram_uploader != '') {
            $('#monogram_uploader_container_for_manufacturer').hide();
            $('#monogram_uploader_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.monogram_uploader);
            $('#monogram_uploader_name_container_for_manufacturer').show();
            $('#monogram_uploader_download').attr("href", MENUFACT_DOC_PATH + formData.monogram_uploader);
        }

        if (formData.model_approval_certificate != '') {
            $('#model_approval_certificate_container_for_manufacturer').hide();
            $('#model_approval_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.model_approval_certificate);
            $('#model_approval_certificate_name_container_for_manufacturer').show();
            $('#model_approval_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.model_approval_certificate);
        }
        if (formData.proof_of_ownership != '') {
            $('#proof_of_ownership_container_for_manufacturer').hide();
            $('#proof_of_ownership_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.proof_of_ownership);
            $('#proof_of_ownership_name_container_for_manufacturer').show();
            $('#proof_of_ownership_download').attr("href", MENUFACT_DOC_PATH + formData.proof_of_ownership);
        }
        if (formData.gst_certificate != '') {
            $('#gst_certificate_container_for_manufacturer').hide();
            $('#gst_certificate_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.gst_certificate);
            $('#gst_certificate_name_container_for_manufacturer').show();
            $('#gst_certificate_download').attr("href", MENUFACT_DOC_PATH + formData.gst_certificate);
        }
        if (formData.partnership_deed != '') {
            $('#partnership_deed_container_for_manufacturer').hide();
            $('#partnership_deed_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.partnership_deed);
            $('#partnership_deed_name_container_for_manufacturer').show();
            $('#partnership_deed_download').attr("href", MENUFACT_DOC_PATH + formData.partnership_deed);
        }
        if (formData.memorandum_of_association != '') {
            $('#memorandum_of_association_container_for_manufacturer').hide();
            $('#memorandum_of_association_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.memorandum_of_association);
            $('#memorandum_of_association_name_container_for_manufacturer').show();
            $('#memorandum_of_association_download').attr("href", MENUFACT_DOC_PATH + formData.memorandum_of_association);
        }
        if (formData.list_of_raw_material != '') {
            $('#list_of_raw_material_container_for_manufacturer').hide();
            $('#list_of_raw_material_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_raw_material);
            $('#list_of_raw_material_name_container_for_manufacturer').show();
            $('#list_of_raw_material_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_raw_material);
        }
        if (formData.list_of_machinery != '') {
            $('#list_of_machinery_container_for_manufacturer').hide();
            $('#list_of_machinery_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_machinery);
            $('#list_of_machinery_name_container_for_manufacturer').show();
            $('#list_of_machinery_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_machinery);
        }
        if (formData.list_of_wm != '') {
            $('#list_of_wm_container_for_manufacturer').hide();
            $('#list_of_wm_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_wm);
            $('#list_of_wm_name_container_for_manufacturer').show();
            $('#list_of_wm_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_wm);
        }
        if (formData.list_of_directors != '') {
            $('#list_of_directors_container_for_manufacturer').hide();
            $('#list_of_directors_name_image_for_manufacturer').attr('src', MENUFACT_DOC_PATH + formData.list_of_directors);
            $('#list_of_directors_name_container_for_manufacturer').show();
            $('#list_of_directors_download').attr("href", MENUFACT_DOC_PATH + formData.list_of_directors);
        }

        if (formData.is_limited_company == isChecked) {
            $('#is_limited_company').attr('checked', 'checked');
            this.$('.proprietor_info_div').show();

            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })

        }
        if (formData.any_previous_application == isChecked) {
            $('#any_previous_application').attr('checked', 'checked');
            this.$('.any_previous_application_div').show();
        }
    },
    checkValidationForManufacturer: function (manufacturerData) {
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
        if (!manufacturerData.name_of_manufacturer) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacturer', manufacturerNameValidationMessage);
        }
        if (!manufacturerData.complete_address) {
            return getBasicMessageAndFieldJSONArray('complete_address', workshopAddressValidationMessage);
        }
        if (!manufacturerData.premises_status) {
            return getBasicMessageAndFieldJSONArray('premises_status', premisesStatusValidationMessage);
        }
        if (!manufacturerData.establishment_date) {
            return getBasicMessageAndFieldJSONArray('establishment_date', establishmentDateValidationMessage);
        }
        if (!manufacturerData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', shopDateValidationMessage);
        }
        if (!manufacturerData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', shopRegNoValidationMessage);
        }
        if (!manufacturerData.manufacturing_activity) {
            return getBasicMessageAndFieldJSONArray('manufacturing_activity', activityValidationMessage);
        }
        if (!manufacturerData.weights_type) {
            return getBasicMessageAndFieldJSONArray('weights_type', weightTypeValidationMessage);
        }
        if (!manufacturerData.measures_type) {
            return getBasicMessageAndFieldJSONArray('measures_type', measureTypeValidationMessage);
        }
        if (!manufacturerData.weighing_instruments_type) {
            return getBasicMessageAndFieldJSONArray('weighing_instruments_type', weightInstrumrntValidationMessage);
        }
        if (!manufacturerData.measuring_instruments_type) {
            return getBasicMessageAndFieldJSONArray('measuring_instruments_type', measureInstumentValidationMessage);
        }
        if (!manufacturerData.no_of_skilled) {
            return getBasicMessageAndFieldJSONArray('no_of_skilled', skilledNoValidationMessage);
        }
        if (!manufacturerData.no_of_semiskilled) {
            return getBasicMessageAndFieldJSONArray('no_of_semiskilled', semiskilledNoValidationMessage);
        }
        if (!manufacturerData.no_of_unskilled) {
            return getBasicMessageAndFieldJSONArray('no_of_unskilled', unskilledNoValidationMessage);
        }
        if (!manufacturerData.no_of_specialist) {
            return getBasicMessageAndFieldJSONArray('no_of_specialist', trainEmpValidationMessage);
        }
        if (!manufacturerData.details_of_personnel) {
            return getBasicMessageAndFieldJSONArray('details_of_personnel', personnelDetailValidationMessage);
        }
        if (!manufacturerData.details_of_machinery) {
            return getBasicMessageAndFieldJSONArray('details_of_machinery', machineryValidationMessage);
        }
        if (!manufacturerData.details_of_foundry) {
            return getBasicMessageAndFieldJSONArray('details_of_foundry', foundryValidationMessage);
        }
        if (!manufacturerData.steel_casting_facility) {
            return getBasicMessageAndFieldJSONArray('steel_casting_facility', castingFacilityValidationMessage);
        }
        if (!manufacturerData.electric_energy_availability) {
            return getBasicMessageAndFieldJSONArray('electric_energy_availability', electricEnergyValidationMessage);
        }
        if (!manufacturerData.details_of_loan) {
            return getBasicMessageAndFieldJSONArray('details_of_loan', loanDetailValidationMessage);
        }
        if (!manufacturerData.banker_names) {
            return getBasicMessageAndFieldJSONArray('banker_names', bankNameValidationMessage);
        }
        if (!manufacturerData.identity_choice) {
            return getBasicMessageAndFieldJSONArray('identity_choice', identityChoiceValidationMessage);
        }
        if (!manufacturerData.identity_number) {
            return getBasicMessageAndFieldJSONArray('identity_number', identityNoValidationMessage);
        }
        if (manufacturerData.any_previous_application == isChecked) {
            if (!manufacturerData.license_application_date) {
                return getBasicMessageAndFieldJSONArray('license_application_date', appliedDateValidationMessage);
            }
            if (!manufacturerData.license_application_result) {
                return getBasicMessageAndFieldJSONArray('license_application_result', licenseResultValidationMessage);
            }
        }
        if (!manufacturerData.location_of_selling) {
            return getBasicMessageAndFieldJSONArray('location_of_selling', sellingLocationStatusValidationMessage);
        }
        if (!manufacturerData.model_approval_detail) {
            return getBasicMessageAndFieldJSONArray('model_approval_detail', approvalModelValidationMessage);
        }
        if (!manufacturerData.inspection_sample_date) {
            return getBasicMessageAndFieldJSONArray('inspection_sample_date', inspectionDateValidationMessage);
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
    askForSubmitManufacturer: function (moduleType) {
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
        var yesEvent = 'Manufacturer.listview.submitManufacturer(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitManufacturer: function (moduleType) {
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
        var manufacturerData = $('#manufacturer_form').serializeFormJSON();
        var validationData = that.checkValidationForManufacturer(manufacturerData);
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

        if ($('#support_document_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#support_document_for_manufacturer').val();
            if (supportDocument == '') {
                $('#support_document_for_manufacturer').focus();
                validationMessageShow('manufacturer-support_document_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('support_document_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#support_document_for_manufacturer').focus();
                validationMessageShow('manufacturer-support_document_for_manufacturer', supportDocumentMessage);
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

        if ($('#model_approval_certificate_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#model_approval_certificate_for_manufacturer').val();
            if (supportDocument == '') {
                $('#model_approval_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-model_approval_certificate_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('model_approval_certificate_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#model_approval_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-model_approval_certificate_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#proof_of_ownership_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#proof_of_ownership_for_manufacturer').val();
            if (supportDocument == '') {
                $('#proof_of_ownership_for_manufacturer').focus();
                validationMessageShow('manufacturer-proof_of_ownership_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('proof_of_ownership_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#proof_of_ownership_for_manufacturer').focus();
                validationMessageShow('manufacturer-proof_of_ownership_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#gst_certificate_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#gst_certificate_for_manufacturer').val();
            if (supportDocument == '') {
                $('#gst_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-gst_certificate_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('gst_certificate_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#gst_certificate_for_manufacturer').focus();
                validationMessageShow('manufacturer-gst_certificate_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#partnership_deed_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#partnership_deed_for_manufacturer').val();
            if (supportDocument == '') {
                $('#partnership_deed_for_manufacturer').focus();
                validationMessageShow('manufacturer-partnership_deed_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('partnership_deed_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#partnership_deed_for_manufacturer').focus();
                validationMessageShow('manufacturer-partnership_deed_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#memorandum_of_association_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#memorandum_of_association_for_manufacturer').val();
            if (supportDocument == '') {
                $('#memorandum_of_association_for_manufacturer').focus();
                validationMessageShow('manufacturer-memorandum_of_association_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('memorandum_of_association_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#memorandum_of_association_for_manufacturer').focus();
                validationMessageShow('manufacturer-memorandum_of_association_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_raw_material_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#list_of_raw_material_for_manufacturer').val();
            if (supportDocument == '') {
                $('#list_of_raw_material_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_raw_material_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_raw_material_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#list_of_raw_material_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_raw_material_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_machinery_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#list_of_machinery_for_manufacturer').val();
            if (supportDocument == '') {
                $('#list_of_machinery_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_machinery_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_machinery_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#list_of_machinery_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_machinery_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_wm_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#list_of_wm_for_manufacturer').val();
            if (supportDocument == '') {
                $('#list_of_wm_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_wm_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_wm_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#list_of_wm_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_wm_for_manufacturer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_directors_container_for_manufacturer').is(':visible')) {
            var supportDocument = $('#list_of_directors_for_manufacturer').val();
            if (supportDocument == '') {
                $('#list_of_directors_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_directors_for_manufacturer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_directors_for_manufacturer');
            if (supportDocumentMessage != '') {
                $('#list_of_directors_for_manufacturer').focus();
                validationMessageShow('manufacturer-list_of_directors_for_manufacturer', supportDocumentMessage);
                return false;
            }
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

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_manufacturer') : $('#submit_btn_for_manufacturer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var manufacturerData = new FormData($('#manufacturer_form')[0]);
        manufacturerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        manufacturerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        manufacturerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'manufacturer/submit_manufacturer',
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
                Manufacturer.router.navigate('manufacturer', {'trigger': true});
            }
        });
    },

    askForRemove: function (manufacturerId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Manufacturer.listview.removeDocument(\'' + manufacturerId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (manufacturerId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer/remove_document',
            data: $.extend({}, {'manufacturer_id': manufacturerId, 'document_id': docId}, getTokenData()),
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
        $('#proprietor_info_container').append(manufactureProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#manufacturer_id_for_manufacturer_form1').val(manufacturerId);
        $('#manufacturer_form1_pdf_form').submit();
        $('#manufacturer_id_for_manufacturer_form1').val('');
    },
    openUploadChallan: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + manufacturerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer/get_manufacturer_data_by_manufacturer_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_id': manufacturerId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var manufacturerData = parseData.manufacturer_data;
                showPopup();
                if (manufacturerData.payment_type == VALUE_ONE) {
                    manufacturerData.utitle = 'Challan Copy';
                } else {
                    manufacturerData.utitle = 'Payment Details';
                }
                manufacturerData.module_type = VALUE_FOUR;
                $('#popup_container').html(manufacturerUploadChallanTemplate(manufacturerData));
                loadFB(VALUE_FOUR, parseData.fb_data, manufacturerData.payment_type, manufacturerData.show_remove_upload_btn, manufacturerData.show_dropdown, manufacturerData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'manufacturer_upload_challan', manufacturerData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'manufacturer_upload_challan', 'uc', 'radio', '#fb', VALUE_FOUR);
                if (manufacturerData.challan != '') {
                    $('#challan_container_for_manufacturer_upload_challan').hide();
                    $('#challan_name_container_for_manufacturer_upload_challan').show();
                    $('#challan_name_href_for_manufacturer_upload_challan').attr('href', 'documents/manufacturer/' + manufacturerData.challan);
                    $('#challan_name_for_manufacturer_upload_challan').html(manufacturerData.challan);
                    $('#challan_remove_btn_for_manufacturer_upload_challan').attr('onclick', 'Manufacturer.listview.removeChallan("' + manufacturerData.manufacturer_id + '")');
                }
            }
        });
    },
    removeChallan: function (manufacturerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer/remove_challan',
            data: $.extend({}, {'manufacturer_id': manufacturerId}, getTokenData()),
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
                removeDocument('challan', 'manufacturer_upload_challan');
                $('#status_' + manufacturerId).html(appStatusArray[VALUE_TWO]);
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
        var manufacturerId = $('#manufacturer_id_for_manufacturer_upload_challan').val();
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_manufacturer_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_manufacturer_upload_challan_1').focus();
            validationMessageShow('manufacturer-uc-payment_type_for_manufacturer_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_manufacturer_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_manufacturer_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_manufacturer_upload_challan').focus();
                validationMessageShow('manufacturer-uc-challan_for_manufacturer_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_manufacturer_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_manufacturer_upload_challan').focus();
                validationMessageShow('manufacturer-uc-challan_for_manufacturer_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOUR, 'manufacturer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_manufacturer_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#manufacturer_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer/upload_challan',
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
                $('#status_' + manufacturerId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + manufacturerId).show();
                }
                $('#total_fees_' + manufacturerId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + manufacturerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer/get_manufacturer_data_by_manufacturer_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_id': manufacturerId}, getTokenData()),
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
                var manufacturerData = parseData.manufacturer_data;
                showPopup();
                $('#popup_container').html(manufacturerApproveTemplate(manufacturerData));
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
        var formData = $('#approve_manufacturer_form').serializeFormJSON();
        if (!formData.manufacturer_id_for_manufacturer_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_manufacturer_approve) {
            $('#registration_number_for_manufacturer_approve').focus();
            validationMessageShow('manufacturer-approve-registration_number_for_manufacturer_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_manufacturer_approve) {
            $('#valid_upto_for_manufacturer_approve').focus();
            validationMessageShow('manufacturer-approve-valid_upto_for_manufacturer_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_manufacturer_approve) {
            $('#remarks_for_manufacturer_approve').focus();
            validationMessageShow('manufacturer-approve-remarks_for_manufacturer_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer/approve_application',
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
                $('#status_' + formData.manufacturer_id_for_manufacturer_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.manufacturer_id_for_manufacturer_approve).remove();
                $('#approve_btn_for_app_' + formData.manufacturer_id_for_manufacturer_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.manufacturer_id_for_manufacturer_approve).show();
                $('#so_status_' + formData.manufacturer_id_for_manufacturer_approve).html(dateTimeDays(formData.manufacturer_id_for_manufacturer_approve, parseData, VALUE_FOUR));
            }
        });
    },
    askForRejectApplication: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + manufacturerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer/get_manufacturer_data_by_manufacturer_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_id': manufacturerId}, getTokenData()),
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
                var manufacturerData = parseData.manufacturer_data;
                showPopup();
                $('#popup_container').html(manufacturerRejectTemplate(manufacturerData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_manufacturer_form').serializeFormJSON();
        if (!formData.manufacturer_id_for_manufacturer_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_manufacturer_reject) {
            $('#remarks_for_manufacturer_reject').focus();
            validationMessageShow('manufacturer-reject-remarks_for_manufacturer_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'manufacturer/reject_application',
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
                $('#status_' + formData.manufacturer_id_for_manufacturer_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.manufacturer_id_for_manufacturer_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.manufacturer_id_for_manufacturer_reject).remove();
                $('#reject_btn_for_app_' + formData.manufacturer_id_for_manufacturer_reject).remove();
                $('#approve_btn_for_app_' + formData.manufacturer_id_for_manufacturer_reject).remove();
                $('#so_status_' + formData.manufacturer_id_for_manufacturer_reject).html(dateTimeDays(formData.manufacturer_id_for_manufacturer_reject, parseData, VALUE_FOUR));
            }
        });
    },
    generateCertificate: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#manufacturer_id_for_certificate').val(manufacturerId);
        $('#manufacturer_certificate_pdf_form').submit();
        $('#manufacturer_id_for_certificate').val('');
    },
    getQueryData: function (manufacturerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!manufacturerId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOUR;
        templateData.module_id = manufacturerId;
        var btnObj = $('#query_btn_for_wm_' + manufacturerId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOUR, moduleData.manufacturer_id);
                tmpData.applicant_name = moduleData.name_of_manufacturer;
                tmpData.title = 'Manufacturer Name';
                tmpData.module_type = VALUE_FOUR;
                tmpData.module_id = manufacturerId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (manufacturerId) {
        if (!manufacturerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + manufacturerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'manufacturer/get_manufacturer_data_by_manufacturer_id',
            type: 'post',
            data: $.extend({}, {'manufacturer_id': manufacturerId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var manufacturerData = parseData.manufacturer_data;
                showPopup();
                if (manufacturerData.payment_type == VALUE_ONE || manufacturerData.payment_type == VALUE_THREE) {
                    manufacturerData.user_payment_type_text = paymentTypeArray[manufacturerData.payment_type];
                } else {
                    manufacturerData.user_payment_type_text = userPaymentTypeArray[manufacturerData.user_payment_type] ? userPaymentTypeArray[manufacturerData.user_payment_type] : '';
                }
                if (manufacturerData.payment_type == VALUE_ONE) {
                    manufacturerData.utitle = 'Fees Paid Challan Copy';
                } else if (manufacturerData.payment_type == VALUE_TWO && manufacturerData.user_payment_type == VALUE_ONE) {
                    manufacturerData.utitle = 'Demand Draft (DD) Copy';
                }
                manufacturerData.module_type = VALUE_FOUR;
                $('#popup_container').html(manufacturerViewPaymentTemplate(manufacturerData));
                loadFB(VALUE_FOUR, parseData.fb_data, manufacturerData.payment_type);
                loadPH(VALUE_FOUR, manufacturerData.manufacturer_id, parseData.ph_data);
                if (manufacturerData.payment_type == VALUE_ONE || (manufacturerData.payment_type == VALUE_TWO && manufacturerData.user_payment_type == VALUE_ONE)) {
                    if (manufacturerData.fees_paid_challan != '') {
                        $('#vp_container_for_manufacturer').show();
                        $('#fees_paid_challan_name_href_for_manufacturer').attr('href', MENUFACT_DOC_PATH + manufacturerData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_manufacturer').html(manufacturerData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
