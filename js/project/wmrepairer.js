var repairerListTemplate = Handlebars.compile($('#repairer_list_template').html());
var repairerTableTemplate = Handlebars.compile($('#repairer_table_template').html());
var repairerActionTemplate = Handlebars.compile($('#repairer_action_template').html());
var repairerFormTemplate = Handlebars.compile($('#repairer_form_template').html());
var repairerViewTemplate = Handlebars.compile($('#repairer_view_template').html());
var repairerProprietorInfoTemplate = Handlebars.compile($('#repairer_proprietor_info_template').html());
var repairerUploadChallanTemplate = Handlebars.compile($('#repairer_upload_challan_template').html());
var repairerApproveTemplate = Handlebars.compile($('#repairer_approve_template').html());
var repairerRejectTemplate = Handlebars.compile($('#repairer_reject_template').html());
var repairerViewPaymentTemplate = Handlebars.compile($('#repairer_view_payment_template').html());
var tempPersonCnt = 1;

var Repairer = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Repairer.Router = Backbone.Router.extend({
    routes: {
        'repairer': 'renderList',
        'repairer_form': 'renderListForForm',
        'edit_repairer_form': 'renderList',
        'view_repairer_form': 'renderList',
    },
    renderList: function () {
        Repairer.listview.listPage();
    },
    renderListForForm: function () {
        Repairer.listview.listPageRepairerForm();
    }
});
Repairer.listView = Backbone.View.extend({
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
        addClass('repairer', 'active');
        Repairer.router.navigate('repairer');
        var templateData = {};
        this.$el.html(repairerListTemplate(templateData));
        this.loadRepairerData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageRepairerForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('repairer', 'active');
        this.$el.html(repairerListTemplate);
        this.newRepairerForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return repairerActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWO;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return repairerActionTemplate(rowData);
    },
    loadRepairerData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_repairer + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + (premisesStatusArray[full.premises_status] ? premisesStatusArray[full.premises_status] : '');
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWO, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWO);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['repairer_data'], function (index, objData) {
                json['repairer_data'][index]['query_movement_string'] = qmData[objData.repairer_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.repairer_id] + '</table>') : '-';
            });
            return json['repairer_data'];
        };
        var that = this;
        Repairer.router.navigate('repairer');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Repairer.listview.loadRepairerData();');
        $('#repairer_form_and_datatable_container').html(repairerTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_repairer_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_repairer_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_repairer_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_repairer_list', false);
        allowOnlyIntegerValue('mobile_number_for_repairer_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_repairer_list', false);
        $('#district_for_repairer_list').val(searchData.search_district);
        $('#status_for_repairer_list').val(searchData.search_status);
        $('#app_timing_for_repairer_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_repairer_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_repairer_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_repairer_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_repairer_list').attr('disabled', 'disabled');
        }
        repairerDataTable = $('#repairer_datatable').DataTable({
            ajax: {url: 'repairer/get_repairer_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'repairer_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'repairer_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'repairer_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'repairer_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
        $('#repairer_datatable_filter').remove();
        $('#repairer_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = repairerDataTable.row(tr);

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
    newRepairerForm: function (isEdit, parseData) {
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
            var formData = parseData.repairer_data;
            Repairer.router.navigate('edit_repairer_form');
        } else {
            var formData = {};
            Repairer.router.navigate('repairer_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.repairer_data = parseData.repairer_data;
        templateData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        templateData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        templateData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        $('#repairer_form_and_datatable_container').html(repairerFormTemplate((templateData)));
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

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_repairer').hide();
                $('#seal_and_stamp_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_repairer').show();
                $('#seal_and_stamp_download').attr("href", REPAIRER_DOC_PATH + formData.signature);
            }
            if (formData.support_document != '') {
                $('#support_document_container_for_repairer').hide();
                $('#support_document_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.support_document);
                $('#support_document_name_container_for_repairer').show();
                $('#support_document_download').attr("href", REPAIRER_DOC_PATH + formData.support_document);
            }
            if (formData.proof_of_ownership != '') {
                $('#proof_of_ownership_container_for_repairer').hide();
                $('#proof_of_ownership_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.proof_of_ownership);
                $('#proof_of_ownership_name_container_for_repairer').show();
                $('#proof_of_ownership_download').attr("href", REPAIRER_DOC_PATH + formData.proof_of_ownership);
            }
            if (formData.gst_certificate != '') {
                $('#gst_certificate_container_for_repairer').hide();
                $('#gst_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.gst_certificate);
                $('#gst_certificate_name_container_for_repairer').show();
                $('#gst_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.gst_certificate);
            }
            if (formData.education_qualification != '') {
                $('#education_qualification_container_for_repairer').hide();
                $('#education_qualification_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.education_qualification);
                $('#education_qualification_name_container_for_repairer').show();
                $('#education_qualification_download').attr("href", REPAIRER_DOC_PATH + formData.education_qualification);
            }
            if (formData.experience_certificate != '') {
                $('#experience_certificate_container_for_repairer').hide();
                $('#experience_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.experience_certificate);
                $('#experience_certificate_name_container_for_repairer').show();
                $('#experience_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.experience_certificate);
            }
            if (formData.partnership_deed != '') {
                $('#partnership_deed_container_for_repairer').hide();
                $('#partnership_deed_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.partnership_deed);
                $('#partnership_deed_name_container_for_repairer').show();
                $('#partnership_deed_download').attr("href", REPAIRER_DOC_PATH + formData.partnership_deed);
            }
            if (formData.memorandum_of_association != '') {
                $('#memorandum_of_association_container_for_repairer').hide();
                $('#memorandum_of_association_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.memorandum_of_association);
                $('#memorandum_of_association_name_container_for_repairer').show();
                $('#memorandum_of_association_download').attr("href", REPAIRER_DOC_PATH + formData.memorandum_of_association);
            }
            if (formData.list_of_raw_material != '') {
                $('#list_of_raw_material_container_for_repairer').hide();
                $('#list_of_raw_material_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_raw_material);
                $('#list_of_raw_material_name_container_for_repairer').show();
                $('#list_of_raw_material_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_raw_material);
            }
            if (formData.list_of_machinery != '') {
                $('#list_of_machinery_container_for_repairer').hide();
                $('#list_of_machinery_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_machinery);
                $('#list_of_machinery_name_container_for_repairer').show();
                $('#list_of_machinery_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_machinery);
            }
            if (formData.list_of_wm != '') {
                $('#list_of_wm_container_for_repairer').hide();
                $('#list_of_wm_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_wm);
                $('#list_of_wm_name_container_for_repairer').show();
                $('#list_of_wm_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_wm);
            }
            if (formData.list_of_directors != '') {
                $('#list_of_directors_container_for_repairer').hide();
                $('#list_of_directors_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_directors);
                $('#list_of_directors_name_container_for_repairer').show();
                $('#list_of_directors_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_directors);
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
            if (formData.any_previous_application == isChecked) {
                $('#any_previous_application').attr('checked', 'checked');
                this.$('.any_previous_application_div').show();
            }
        }

        generateSelect2();
        datePicker();
        $('#repairer_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitRepairer($('#submit_btn_for_repairer'));
            }
        });
    },
    editOrViewRepairer: function (btnObj, repairerId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!repairerId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer/get_repairer_data_by_id',
            type: 'post',
            data: $.extend({}, {'repairer_id': repairerId}, getTokenData()),
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
                    that.newRepairerForm(isEdit, parseData);
                } else {
                    that.viewRepairerForm(parseData);
                }
            }
        });
    },
    viewRepairerForm: function (parseData) {
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
        var formData = parseData.repairer_data;
        Repairer.router.navigate('view_repairer_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#repairer_form_and_datatable_container').html(repairerViewTemplate(formData));
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


        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_repairer').hide();
            $('#seal_and_stamp_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_repairer').show();
            $('#seal_and_stamp_download').attr("href", REPAIRER_DOC_PATH + formData.signature);
        }

        if (formData.support_document != '') {
            $('#support_document_container_for_repairer').hide();
            $('#support_document_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.support_document);
            $('#support_document_name_container_for_repairer').show();
            $('#support_document_download').attr("href", REPAIRER_DOC_PATH + formData.support_document);
        }
        if (formData.proof_of_ownership != '') {
            $('#proof_of_ownership_container_for_repairer').hide();
            $('#proof_of_ownership_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.proof_of_ownership);
            $('#proof_of_ownership_name_container_for_repairer').show();
            $('#proof_of_ownership_download').attr("href", REPAIRER_DOC_PATH + formData.proof_of_ownership);
        }
        if (formData.gst_certificate != '') {
            $('#gst_certificate_container_for_repairer').hide();
            $('#gst_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.gst_certificate);
            $('#gst_certificate_name_container_for_repairer').show();
            $('#gst_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.gst_certificate);
        }
        if (formData.education_qualification != '') {
            $('#education_qualification_container_for_repairer').hide();
            $('#education_qualification_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.education_qualification);
            $('#education_qualification_name_container_for_repairer').show();
            $('#education_qualification_download').attr("href", REPAIRER_DOC_PATH + formData.education_qualification);
        }
        if (formData.experience_certificate != '') {
            $('#experience_certificate_container_for_repairer').hide();
            $('#experience_certificate_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.experience_certificate);
            $('#experience_certificate_name_container_for_repairer').show();
            $('#experience_certificate_download').attr("href", REPAIRER_DOC_PATH + formData.experience_certificate);
        }
        if (formData.partnership_deed != '') {
            $('#partnership_deed_container_for_repairer').hide();
            $('#partnership_deed_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.partnership_deed);
            $('#partnership_deed_name_container_for_repairer').show();
            $('#partnership_deed_download').attr("href", REPAIRER_DOC_PATH + formData.partnership_deed);
        }
        if (formData.memorandum_of_association != '') {
            $('#memorandum_of_association_container_for_repairer').hide();
            $('#memorandum_of_association_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.memorandum_of_association);
            $('#memorandum_of_association_name_container_for_repairer').show();
            $('#memorandum_of_association_download').attr("href", REPAIRER_DOC_PATH + formData.memorandum_of_association);
        }
        if (formData.list_of_raw_material != '') {
            $('#list_of_raw_material_container_for_repairer').hide();
            $('#list_of_raw_material_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_raw_material);
            $('#list_of_raw_material_name_container_for_repairer').show();
            $('#list_of_raw_material_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_raw_material);
        }
        if (formData.list_of_machinery != '') {
            $('#list_of_machinery_container_for_repairer').hide();
            $('#list_of_machinery_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_machinery);
            $('#list_of_machinery_name_container_for_repairer').show();
            $('#list_of_machinery_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_machinery);
        }
        if (formData.list_of_wm != '') {
            $('#list_of_wm_container_for_repairer').hide();
            $('#list_of_wm_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_wm);
            $('#list_of_wm_name_container_for_repairer').show();
            $('#list_of_wm_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_wm);
        }
        if (formData.list_of_directors != '') {
            $('#list_of_directors_container_for_repairer').hide();
            $('#list_of_directors_name_image_for_repairer').attr('src', REPAIRER_DOC_PATH + formData.list_of_directors);
            $('#list_of_directors_name_container_for_repairer').show();
            $('#list_of_directors_download').attr("href", REPAIRER_DOC_PATH + formData.list_of_directors);
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
        if (formData.any_previous_application == isChecked) {
            $('#any_previous_application').attr('checked', 'checked');
            this.$('.any_previous_application_div').show();
        }

    },
    checkValidationForRepairer: function (repairerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!repairerData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!repairerData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!repairerData.name_of_repairmen) {
            return getBasicMessageAndFieldJSONArray('name_of_repairmen', repairmenNameValidationMessage);
        }
        if (!repairerData.complete_address) {
            return getBasicMessageAndFieldJSONArray('complete_address', workshopAddressValidationMessage);
        }
        if (!repairerData.premises_status) {
            return getBasicMessageAndFieldJSONArray('premises_status', premisesStatusValidationMessage);
        }
        if (!repairerData.establishment_date) {
            return getBasicMessageAndFieldJSONArray('establishment_date', establishmentDateValidationMessage);
        }
        if (!repairerData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', shopDateValidationMessage);
        }
        if (!repairerData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', shopRegNoValidationMessage);
        }
        if (!repairerData.identity_choice) {
            return getBasicMessageAndFieldJSONArray('identity_choice', identityChoiceValidationMessage);
        }
        if (!repairerData.identity_number) {
            return getBasicMessageAndFieldJSONArray('identity_number', identityNoValidationMessage);
        }
        if (!repairerData.weights_type) {
            return getBasicMessageAndFieldJSONArray('weights_type', weightTypeValidationMessage);
        }
        if (!repairerData.area_operate) {
            return getBasicMessageAndFieldJSONArray('area_operate', areaOperateValidationMessage);
        }
        if (!repairerData.previous_experience) {
            return getBasicMessageAndFieldJSONArray('previous_experience', prevexperienceValidationMessage);
        }
        if (!repairerData.no_of_skilled) {
            return getBasicMessageAndFieldJSONArray('no_of_skilled', skilledNoValidationMessage);
        }
        if (!repairerData.no_of_semiskilled) {
            return getBasicMessageAndFieldJSONArray('no_of_semiskilled', semiskilledNoValidationMessage);
        }
        if (!repairerData.no_of_unskilled) {
            return getBasicMessageAndFieldJSONArray('no_of_unskilled', unskilledNoValidationMessage);
        }
        if (!repairerData.no_of_specialist) {
            return getBasicMessageAndFieldJSONArray('no_of_specialist', trainEmpValidationMessage);
        }
        if (!repairerData.details_of_personnel) {
            return getBasicMessageAndFieldJSONArray('details_of_personnel', personnelDetailValidationMessage);
        }
        if (!repairerData.details_of_machinery) {
            return getBasicMessageAndFieldJSONArray('details_of_machinery', machineryValidationMessage);
        }
        if (!repairerData.electric_energy_availability) {
            return getBasicMessageAndFieldJSONArray('electric_energy_availability', electricEnergyValidationMessage);
        }
        if (repairerData.sufficient_stock == isChecked) {
            if (!repairerData.stock_details) {
                return getBasicMessageAndFieldJSONArray('stock_details', stockDetailValidationMessage);
            }
        }
        if (repairerData.any_previous_application == isChecked) {
            if (!repairerData.license_application_date) {
                return getBasicMessageAndFieldJSONArray('license_application_date', appliedDateValidationMessage);
            }
            if (!repairerData.license_application_result) {
                return getBasicMessageAndFieldJSONArray('license_application_result', licenseResultValidationMessage);
            }
        }
        if (!repairerData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        if (!repairerData.declarationtwo) {
            return getBasicMessageAndFieldJSONArray('declarationtwo', declarationTwoValidationMessage);
        }
        if (!repairerData.declarationthree) {
            return getBasicMessageAndFieldJSONArray('declarationthree', declarationThreeValidationMessage);
        }

        return '';
    },
    askForSubmitRepairer: function (moduleType) {
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
        var yesEvent = 'Repairer.listview.submitRepairer(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitRepairer: function (moduleType) {
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
        var repairerData = $('#repairer_form').serializeFormJSON();
        var validationData = that.checkValidationForRepairer(repairerData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('repairer-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;
        if (repairerData.is_limited_company == isChecked) {
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

        if ($('#seal_and_stamp_container_for_repairer').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_repairer').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_repairer').focus();
                validationMessageShow('repairer-seal_and_stamp_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_repairer');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_repairer').focus();
                validationMessageShow('repairer-seal_and_stamp_for_repairer', sealAndStampMessage);
                return false;
            }
        }

        if ($('#support_document_container_for_repairer').is(':visible')) {
            var supportDocument = $('#support_document_for_repairer').val();
            if (supportDocument == '') {
                $('#support_document_for_repairer').focus();
                validationMessageShow('repairer-support_document_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('support_document_for_repairer');
            if (supportDocumentMessage != '') {
                $('#support_document_for_repairer').focus();
                validationMessageShow('repairer-support_document_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#proof_of_ownership_container_for_repairer').is(':visible')) {
            var supportDocument = $('#proof_of_ownership_for_repairer').val();
            if (supportDocument == '') {
                $('#proof_of_ownership_for_repairer').focus();
                validationMessageShow('repairer-proof_of_ownership_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('proof_of_ownership_for_repairer');
            if (supportDocumentMessage != '') {
                $('#proof_of_ownership_for_repairer').focus();
                validationMessageShow('repairer-proof_of_ownership_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#gst_certificate_container_for_repairer').is(':visible')) {
            var supportDocument = $('#gst_certificate_for_repairer').val();
            if (supportDocument == '') {
                $('#gst_certificate_for_repairer').focus();
                validationMessageShow('repairer-gst_certificate_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('gst_certificate_for_repairer');
            if (supportDocumentMessage != '') {
                $('#gst_certificate_for_repairer').focus();
                validationMessageShow('repairer-gst_certificate_for_repairer', supportDocumentMessage);
                return false;
            }
        }
        if ($('#education_qualification_container_for_repairer').is(':visible')) {
            var supportDocument = $('#education_qualification_for_repairer').val();
            if (supportDocument == '') {
                $('#education_qualification_for_repairer').focus();
                validationMessageShow('repairer-education_qualification_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('education_qualification_for_repairer');
            if (supportDocumentMessage != '') {
                $('#education_qualification_for_repairer').focus();
                validationMessageShow('repairer-education_qualification_for_repairer', supportDocumentMessage);
                return false;
            }
        }
        if ($('#experience_certificate_container_for_repairer').is(':visible')) {
            var supportDocument = $('#experience_certificate_for_repairer').val();
            if (supportDocument == '') {
                $('#experience_certificate_for_repairer').focus();
                validationMessageShow('repairer-experience_certificate_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('experience_certificate_for_repairer');
            if (supportDocumentMessage != '') {
                $('#experience_certificate_for_repairer').focus();
                validationMessageShow('repairer-experience_certificate_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#partnership_deed_container_for_repairer').is(':visible')) {
            var supportDocument = $('#partnership_deed_for_repairer').val();
            if (supportDocument == '') {
                $('#partnership_deed_for_repairer').focus();
                validationMessageShow('repairer-partnership_deed_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('partnership_deed_for_repairer');
            if (supportDocumentMessage != '') {
                $('#partnership_deed_for_repairer').focus();
                validationMessageShow('repairer-partnership_deed_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#memorandum_of_association_container_for_repairer').is(':visible')) {
            var supportDocument = $('#memorandum_of_association_for_repairer').val();
            if (supportDocument == '') {
                $('#memorandum_of_association_for_repairer').focus();
                validationMessageShow('repairer-memorandum_of_association_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('memorandum_of_association_for_repairer');
            if (supportDocumentMessage != '') {
                $('#memorandum_of_association_for_repairer').focus();
                validationMessageShow('repairer-memorandum_of_association_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_raw_material_container_for_repairer').is(':visible')) {
            var supportDocument = $('#list_of_raw_material_for_repairer').val();
            if (supportDocument == '') {
                $('#list_of_raw_material_for_repairer').focus();
                validationMessageShow('repairer-list_of_raw_material_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_raw_material_for_repairer');
            if (supportDocumentMessage != '') {
                $('#list_of_raw_material_for_repairer').focus();
                validationMessageShow('repairer-list_of_raw_material_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_machinery_container_for_repairer').is(':visible')) {
            var supportDocument = $('#list_of_machinery_for_repairer').val();
            if (supportDocument == '') {
                $('#list_of_machinery_for_repairer').focus();
                validationMessageShow('repairer-list_of_machinery_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_machinery_for_repairer');
            if (supportDocumentMessage != '') {
                $('#list_of_machinery_for_repairer').focus();
                validationMessageShow('repairer-list_of_machinery_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_wm_container_for_repairer').is(':visible')) {
            var supportDocument = $('#list_of_wm_for_repairer').val();
            if (supportDocument == '') {
                $('#list_of_wm_for_repairer').focus();
                validationMessageShow('repairer-list_of_wm_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_wm_for_repairer');
            if (supportDocumentMessage != '') {
                $('#list_of_wm_for_repairer').focus();
                validationMessageShow('repairer-list_of_wm_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        if ($('#list_of_directors_container_for_repairer').is(':visible')) {
            var supportDocument = $('#list_of_directors_for_repairer').val();
            if (supportDocument == '') {
                $('#list_of_directors_for_repairer').focus();
                validationMessageShow('repairer-list_of_directors_for_repairer', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('list_of_directors_for_repairer');
            if (supportDocumentMessage != '') {
                $('#list_of_directors_for_repairer').focus();
                validationMessageShow('repairer-list_of_directors_for_repairer', supportDocumentMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_repairer') : $('#submit_btn_for_repairer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var repairerData = new FormData($('#repairer_form')[0]);
        repairerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        repairerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        repairerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'repairer/submit_repairer',
            data: repairerData,
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
                Repairer.router.navigate('repairer', {'trigger': true});
            }
        });
    },

    askForRemove: function (repairerId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Repairer.listview.removeDocument(\'' + repairerId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (repairerId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer/remove_document',
            data: $.extend({}, {'repairer_id': repairerId, 'document_id': docId}, getTokenData()),
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
        $('#proprietor_info_container').append(repairerProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#repairer_id_for_repairer_form1').val(repairerId);
        $('#repairer_form1_pdf_form').submit();
        $('#repairer_id_for_repairer_form1').val('');
    },
    openUploadChallan: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + repairerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer/get_repairer_data_by_repairer_id',
            type: 'post',
            data: $.extend({}, {'repairer_id': repairerId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var repairerData = parseData.repairer_data;
                showPopup();
                if (repairerData.payment_type == VALUE_ONE) {
                    repairerData.utitle = 'Challan Copy';
                } else {
                    repairerData.utitle = 'Payment Details';
                }
                repairerData.module_type = VALUE_TWO;
                $('#popup_container').html(repairerUploadChallanTemplate(repairerData));
                loadFB(VALUE_TWO, parseData.fb_data, repairerData.payment_type, repairerData.show_remove_upload_btn, repairerData.show_dropdown, repairerData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'repairer_upload_challan', repairerData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'repairer_upload_challan', 'uc', 'radio', '#fb', VALUE_TWO);
                if (repairerData.challan != '') {
                    $('#challan_container_for_repairer_upload_challan').hide();
                    $('#challan_name_container_for_repairer_upload_challan').show();
                    $('#challan_name_href_for_repairer_upload_challan').attr('href', 'documents/repairer/' + repairerData.challan);
                    $('#challan_name_for_repairer_upload_challan').html(repairerData.challan);
                    $('#challan_remove_btn_for_repairer_upload_challan').attr('onclick', 'Repairer.listview.removeChallan("' + repairerData.repairer_id + '")');
                }
            }
        });
    },
    removeChallan: function (repairerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer/remove_challan',
            data: $.extend({}, {'repairer_id': repairerId}, getTokenData()),
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
                removeDocument('challan', 'repairer_upload_challan');
                $('#status_' + repairerId).html(appStatusArray[VALUE_TWO]);
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
        var repairerId = $('#repairer_id_for_repairer_upload_challan').val();
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_repairer_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_repairer_upload_challan_1').focus();
            validationMessageShow('repairer-uc-payment_type_for_repairer_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_repairer_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_repairer_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_repairer_upload_challan').focus();
                validationMessageShow('repairer-uc-challan_for_repairer_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_repairer_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_repairer_upload_challan').focus();
                validationMessageShow('repairer-uc-challan_for_repairer_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWO, 'repairer-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_repairer_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#repairer_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'repairer/upload_challan',
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
                $('#status_' + repairerId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + repairerId).show();
                }
                $('#total_fees_' + repairerId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + repairerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer/get_repairer_data_by_repairer_id',
            type: 'post',
            data: $.extend({}, {'repairer_id': repairerId}, getTokenData()),
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
                var repairerData = parseData.repairer_data;
                showPopup();
                $('#popup_container').html(repairerApproveTemplate(repairerData));
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
        var formData = $('#approve_repairer_form').serializeFormJSON();
        if (!formData.repairer_id_for_repairer_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_repairer_approve) {
            $('#registration_number_for_repairer_approve').focus();
            validationMessageShow('repairer-approve-registration_number_for_repairer_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_repairer_approve) {
            $('#valid_upto_for_repairer_approve').focus();
            validationMessageShow('repairer-approve-valid_upto_for_repairer_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_repairer_approve) {
            $('#remarks_for_repairer_approve').focus();
            validationMessageShow('repairer-approve-remarks_for_repairer_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer/approve_application',
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
                $('#status_' + formData.repairer_id_for_repairer_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.repairer_id_for_repairer_approve).remove();
                $('#approve_btn_for_app_' + formData.repairer_id_for_repairer_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.repairer_id_for_repairer_approve).show();
                $('#so_status_' + formData.repairer_id_for_repairer_approve).html(dateTimeDays(formData.repairer_id_for_repairer_approve, parseData, VALUE_TWO));
            }
        });
    },
    askForRejectApplication: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + repairerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer/get_repairer_data_by_repairer_id',
            type: 'post',
            data: $.extend({}, {'repairer_id': repairerId}, getTokenData()),
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
                var repairerData = parseData.repairer_data;
                showPopup();
                $('#popup_container').html(repairerRejectTemplate(repairerData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_repairer_form').serializeFormJSON();
        if (!formData.repairer_id_for_repairer_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_repairer_reject) {
            $('#remarks_for_repairer_reject').focus();
            validationMessageShow('repairer-reject-remarks_for_repairer_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'repairer/reject_application',
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
                $('#status_' + formData.repairer_id_for_repairer_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.repairer_id_for_repairer_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.repairer_id_for_repairer_reject).remove();
                $('#reject_btn_for_app_' + formData.repairer_id_for_repairer_reject).remove();
                $('#approve_btn_for_app_' + formData.repairer_id_for_repairer_reject).remove();
                $('#so_status_' + formData.repairer_id_for_repairer_reject).html(dateTimeDays(formData.repairer_id_for_repairer_reject, parseData, VALUE_TWO));
            }
        });
    },
    generateCertificate: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#repairer_id_for_certificate').val(repairerId);
        $('#repairer_certificate_pdf_form').submit();
        $('#repairer_id_for_certificate').val('');
    },
    getQueryData: function (repairerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!repairerId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWO;
        templateData.module_id = repairerId;
        var btnObj = $('#query_btn_for_wm_' + repairerId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWO, moduleData.repairer_id);
                tmpData.applicant_name = moduleData.name_of_repairer;
                tmpData.title = 'Repairer Name';
                tmpData.module_type = VALUE_TWO;
                tmpData.module_id = repairerId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (repairerId) {
        if (!repairerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + repairerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'repairer/get_repairer_data_by_repairer_id',
            type: 'post',
            data: $.extend({}, {'repairer_id': repairerId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var repairerData = parseData.repairer_data;
                showPopup();
                if (repairerData.payment_type == VALUE_ONE || repairerData.payment_type == VALUE_THREE) {
                    repairerData.user_payment_type_text = paymentTypeArray[repairerData.payment_type];
                } else {
                    repairerData.user_payment_type_text = userPaymentTypeArray[repairerData.user_payment_type] ? userPaymentTypeArray[repairerData.user_payment_type] : '';
                }
                if (repairerData.payment_type == VALUE_ONE) {
                    repairerData.utitle = 'Fees Paid Challan Copy';
                } else if (repairerData.payment_type == VALUE_TWO && repairerData.user_payment_type == VALUE_ONE) {
                    repairerData.utitle = 'Demand Draft (DD) Copy';
                }
                repairerData.module_type = VALUE_TWO;
                $('#popup_container').html(repairerViewPaymentTemplate(repairerData));
                loadFB(VALUE_TWO, parseData.fb_data, repairerData.payment_type);
                loadPH(VALUE_TWO, repairerData.repairer_id, parseData.ph_data);
                if (repairerData.payment_type == VALUE_ONE || (repairerData.payment_type == VALUE_TWO && repairerData.user_payment_type == VALUE_ONE)) {
                    if (repairerData.fees_paid_challan != '') {
                        $('#vp_container_for_repairer').show();
                        $('#fees_paid_challan_name_href_for_repairer').attr('href', REPAIRER_DOC_PATH + repairerData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_repairer').html(repairerData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
