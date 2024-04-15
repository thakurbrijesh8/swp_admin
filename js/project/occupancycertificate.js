var occupancyCertificateListTemplate = Handlebars.compile($('#occupancycertificate_list_template').html());
var occupancyCertificateTableTemplate = Handlebars.compile($('#occupancycertificate_table_template').html());
var occupancyCertificateActionTemplate = Handlebars.compile($('#occupancycertificate_action_template').html());
var occupancyCertificateFormTemplate = Handlebars.compile($('#occupancycertificate_form_template').html());
var occupancyCertificateViewTemplate = Handlebars.compile($('#occupancycertificate_view_template').html());
var occupancyCertificateUploadChallanTemplate = Handlebars.compile($('#occupancycertificate_upload_challan_template').html());
var occupancyCertificateApproveTemplate = Handlebars.compile($('#occupancycertificate_approve_template').html());
var occupancyCertificateRejectTemplate = Handlebars.compile($('#occupancycertificate_reject_template').html());
var occupancyCertificateViewPaymentTemplate = Handlebars.compile($('#occupancycertificate_view_payment_template').html());

var tempPersonCnt = 1;

var OccupancyCertificate = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
OccupancyCertificate.Router = Backbone.Router.extend({
    routes: {
        'occupancycertificate': 'renderList',
        'occupancycertificate_form': 'renderListForForm',
        'edit_occupancycertificate_form': 'renderList',
        'view_occupancycertificate_form': 'renderList',
    },
    renderList: function () {
        OccupancyCertificate.listview.listPage();
    },
    renderListForForm: function () {
        OccupancyCertificate.listview.listPageShootingForm();
    }
});
OccupancyCertificate.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_fire_noc"]': 'hasFireNOCEvent',
        'click input[name="is_existing_building_plan"]': 'hasBuildingPlanEvent',
        'click input[name="is_form_of_indemnity"]': 'hasformOfIndemnityEvent',
        'click input[name="is_stability_certificate"]': 'hasStabilityCertificateEvent',
        'click input[name="is_occupancy_certificate_dnh"]': 'hasOccupancyCertificatednhEvent',
    },
    hasStabilityCertificateEvent: function (event) {
        var val = $('input[name=is_stability_certificate]:checked').val();
        if (val === '1') {
            this.$('.stability_certificate_div').show();
        } else {
            this.$('.stability_certificate_div').hide();

        }
    },
    hasFireNOCEvent: function (event) {
        var val = $('input[name=is_fire_noc]:checked').val();
        if (val === '1') {
            this.$('.fire_noc_div').show();
        } else {
            this.$('.fire_noc_div').hide();

        }
    },
    hasBuildingPlanEvent: function (event) {
        var val = $('input[name=is_existing_building_plan]:checked').val();
        if (val === '2') {
            this.$('.existing_building_plan_div').show();
        } else {
            this.$('.existing_building_plan_div').hide();

        }
    },
    hasformOfIndemnityEvent: function (event) {
        var val = $('input[name=is_form_of_indemnity]:checked').val();
        if (val === '1') {
            this.$('.form_of_indemnity_div').show();
        } else {
            this.$('.form_of_indemnity_div').hide();

        }
    },
    hasOccupancyCertificatednhEvent: function (event) {
        var val = $('input[name=is_occupancy_certificate_dnh]:checked').val();
        if (val === '1') {
            this.$('.occupancy_certificate_dnh_div').show();
        } else {
            this.$('.occupancy_certificate_dnh_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('occupancycertificate', 'active');
        OccupancyCertificate.router.navigate('occupancycertificate');
        var templateData = {};
        this.$el.html(occupancyCertificateListTemplate(templateData));
        this.loadOccupancyCertificateData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageShootingForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('occupancycertificate', 'active');
        this.$el.html(occupancyCertificateListTemplate);
        this.newOccupancyCertificateForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return occupancyCertificateActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYEIGHT;
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
        return occupancyCertificateActionTemplate(rowData);
    },
    loadOccupancyCertificateData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.licensed_engineer_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.situated_at;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTYEIGHT, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYEIGHT);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['occupancycertificate_data'], function (index, objData) {
                json['occupancycertificate_data'][index]['query_movement_string'] = qmData[objData.occupancy_certificate_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.occupancy_certificate_id] + '</table>') : '-';
            });
            return json['occupancycertificate_data'];
        };
        var that = this;
        OccupancyCertificate.router.navigate('occupancycertificate');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'OccupancyCertificate.listview.loadOccupancyCertificateData();');
        $('#occupancycertificate_form_and_datatable_container').html(occupancyCertificateTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_occupancycertificate_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_occupancycertificate_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_occupancycertificate_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_occupancycertificate_list', false);
        allowOnlyIntegerValue('mobile_number_for_occupancycertificate_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_occupancycertificate_list', false);
        $('#district_for_occupancycertificate_list').val(searchData.search_district);
        $('#status_for_occupancycertificate_list').val(searchData.search_status);
        $('#app_timing_for_occupancycertificate_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_occupancycertificate_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_occupancycertificate_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_occupancycertificate_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_occupancycertificate_list').attr('disabled', 'disabled');
        }
        occupancyCertificateDataTable = $('#occupancycertificate_datatable').DataTable({
            ajax: {url: 'occupancy_certificate/get_occupancycertificate_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'occupancy_certificate_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'occupancy_certificate_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'occupancy_certificate_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'occupancy_certificate_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  } 
        $('#occupancycertificate_datatable_filter').remove();
        $('#occupancycertificate_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = occupancyCertificateDataTable.row(tr);

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
    newOccupancyCertificateForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.occupancycertificate_data;
            OccupancyCertificate.router.navigate('edit_occupancycertificate_form');
        } else {
            var formData = {};
            OccupancyCertificate.router.navigate('occupancycertificate_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.occupancycertificate_data = parseData.occupancycertificate_data;
        if (isEdit) {

            templateData.completed_on = dateTo_DD_MM_YYYY(formData.completed_on);
            templateData.occupancy_valid_upto = dateTo_DD_MM_YYYY(formData.occupancy_valid_upto);
        }
        $('#occupancycertificate_form_and_datatable_container').html(occupancyCertificateFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        if (isEdit) {

            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            that.getDepartmentdata(district);
            if (formData.is_fire_noc == VALUE_ONE) {
                $('#is_fire_noc_yes').attr('checked', 'checked');
                this.$('.fire_noc_div').show();
            }
            if (formData.is_existing_building_plan == VALUE_TWO) {
                $('#is_existing_building_plan_no').attr('checked', 'checked');
                this.$('.existing_building_plan_div').show();
            }
            if (formData.is_form_of_indemnity == VALUE_ONE) {
                $('#is_form_of_indemnity_yes').attr('checked', 'checked');
                this.$('.form_of_indemnity_div').show();
            }
            if (formData.is_stability_certificate == VALUE_ONE) {
                $('#is_stability_certificate_yes').attr('checked', 'checked');
                this.$('.stability_certificate_div').show();
            }

            if (formData.is_occupancy_certificate_dnh == IS_CHECKED_YES) {
                $('#is_occupancy_certificate_dnh_yes').attr('checked', 'checked');
                $('.occupancy_certificate_dnh_div').show();
            } else if (formData.is_occupancy_certificate_dnh == IS_CHECKED_NO) {
                $('#is_occupancy_certificate_dnh_no').attr('checked', 'checked');
            }

            if (formData.annexure_14 != '') {
                $('#annexure_14_container_for_occupancycertificate').hide();
                $('#annexure_14_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.annexure_14);
                $('#annexure_14_name_container_for_occupancycertificate').show();
                $('#annexure_14_download').attr("href", OCCUPANCY_DOC_PATH + formData.annexure_14);
            }
            if (formData.oc_part_oc != '') {
                $('#oc_part_oc_container_for_occupancycertificate').hide();
                $('#oc_part_oc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.oc_part_oc);
                $('#oc_part_oc_name_container_for_occupancycertificate').show();
                $('#oc_part_oc_download').attr("href", OCCUPANCY_DOC_PATH + formData.oc_part_oc);
            }
            if (formData.copy_of_construction_permission != '') {
                $('#copy_of_construction_permission_container_for_occupancycertificate').hide();
                $('#copy_of_construction_permission_name_image_for_occupancycertificate').attr('src', OCCUPANCY_DOC_PATH + formData.copy_of_construction_permission);
                $('#copy_of_construction_permission_name_container_for_occupancycertificate').show();
                $('#copy_of_construction_permission_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_construction_permission);
            }
            // if (formData.owner_signature != '') {
            //     $('#owner_signature_container_for_occupancycertificate').hide();
            //     $('#owner_signature_name_image_for_occupancycertificate').attr('src', OCCUPANCY_DOC_PATH + formData.owner_signature);
            //     $('#owner_signature_name_container_for_occupancycertificate').show();
            //     $('#owner_signature_download').attr("href", OCCUPANCY_DOC_PATH + formData.owner_signature);
            // }
            if (formData.copy_of_occupancycertificate_permission != '') {
                $('#copy_of_occupancycertificate_permission_container_for_occupancycertificate').hide();
                $('#copy_of_occupancycertificate_permission_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_occupancycertificate_permission);
                $('#copy_of_occupancycertificate_permission_name_container_for_occupancycertificate').show();
                $('#copy_of_occupancycertificate_permission_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_occupancycertificate_permission);
            }
            if (formData.copy_of_building_plan != '') {
                $('#copy_of_building_plan_container_for_occupancycertificate').hide();
                $('#copy_of_building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_building_plan);
                $('#copy_of_building_plan_name_container_for_occupancycertificate').show();
                $('#copy_of_building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_building_plan);
            }
            if (formData.stability_certificate != '') {
                $('#stability_certificate_container_for_occupancycertificate').hide();
                $('#stability_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.stability_certificate);
                $('#stability_certificate_name_container_for_occupancycertificate').show();
                $('#stability_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.stability_certificate);
            }
            if (formData.building_height_noc != '') {
                $('#building_height_noc_container_for_occupancycertificate').hide();
                $('#building_height_noc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.building_height_noc);
                $('#building_height_noc_name_container_for_occupancycertificate').show();
                $('#building_height_noc_download').attr("href", OCCUPANCY_DOC_PATH + formData.building_height_noc);
            }
            if (formData.fire_noc != '') {
                $('#fire_noc_container_for_occupancycertificate').hide();
                $('#fire_noc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.fire_noc);
                $('#fire_noc_name_container_for_occupancycertificate').show();
                $('#fire_noc_download').attr("href", OCCUPANCY_DOC_PATH + formData.fire_noc);
            }
            if (formData.copy_of_water_harvesting != '') {
                $('#copy_of_water_harvesting_container_for_occupancycertificate').hide();
                $('#copy_of_water_harvesting_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_water_harvesting);
                $('#copy_of_water_harvesting_name_container_for_occupancycertificate').show();
                $('#copy_of_water_harvesting_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_water_harvesting);
            }
            if (formData.existing_building_plan != '') {
                $('#existing_building_plan_container_for_occupancycertificate').hide();
                $('#existing_building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.existing_building_plan);
                $('#existing_building_plan_name_container_for_occupancycertificate').show();
                $('#existing_building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.existing_building_plan);
            }
            if (formData.form_of_indemnity != '') {
                $('#form_of_indemnity_container_for_occupancycertificate').hide();
                $('#form_of_indemnity_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.form_of_indemnity);
                $('#form_of_indemnity_name_container_for_occupancycertificate').show();
                $('#form_of_indemnity_download').attr("href", OCCUPANCY_DOC_PATH + formData.form_of_indemnity);
            }
            if (formData.annexure_sixteen != '') {
                $('#annexure_sixteen_container_for_occupancycertificate').hide();
                $('#annexure_sixteen_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.annexure_sixteen);
                $('#annexure_sixteen_name_container_for_occupancycertificate').show();
                $('#annexure_sixteen_download').attr("href", OCCUPANCY_DOC_PATH + formData.annexure_sixteen);
            }
            if (formData.fire_emergency != '') {
                $('#fire_emergency_container_for_occupancycertificate').hide();
                $('#fire_emergency_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.fire_emergency);
                $('#fire_emergency_name_container_for_occupancycertificate').show();
                $('#fire_emergency_download').attr("href", OCCUPANCY_DOC_PATH + formData.fire_emergency);
            }
            if (formData.building_plan != '') {
                $('#building_plan_container_for_occupancycertificate').hide();
                $('#building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.building_plan);
                $('#building_plan_name_container_for_occupancycertificate').show();
                $('#building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.building_plan);
            }
            if (formData.stability_certificate_dnh != '') {
                $('#stability_certificate_dnh_container_for_occupancycertificate').hide();
                $('#stability_certificate_dnh_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.stability_certificate_dnh);
                $('#stability_certificate_dnh_name_container_for_occupancycertificate').show();
                $('#stability_certificate_dnh_download').attr("href", OCCUPANCY_DOC_PATH + formData.stability_certificate_dnh);
            }
            if (formData.occupancy_certificate_dnh != '') {
                $('#occupancy_certificate_dnh_container_for_occupancycertificate').hide();
                $('#occupancy_certificate_dnh_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.occupancy_certificate_dnh);
                $('#occupancy_certificate_dnh_name_container_for_occupancycertificate').show();
                $('#occupancy_certificate_dnh_download').attr("href", OCCUPANCY_DOC_PATH + formData.occupancy_certificate_dnh);
            }
            if (formData.existing_cp != '') {
                $('#existing_cp_container_for_occupancycertificate').hide();
                $('#existing_cp_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.existing_cp);
                $('#existing_cp_name_container_for_occupancycertificate').show();
                $('#existing_cp_download').attr("href", OCCUPANCY_DOC_PATH + formData.existing_cp);
            }
            if (formData.labour_cess_certificate != '') {
                $('#labour_cess_certificate_container_for_occupancycertificate').hide();
                $('#labour_cess_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.labour_cess_certificate);
                $('#labour_cess_certificate_name_container_for_occupancycertificate').show();
                $('#labour_cess_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.labour_cess_certificate);
            }
            if (formData.valuation_certificate != '') {
                $('#valuation_certificate_container_for_occupancycertificate').hide();
                $('#valuation_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.valuation_certificate);
                $('#valuation_certificate_name_container_for_occupancycertificate').show();
                $('#valuation_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.valuation_certificate);
            }
            if (formData.bank_deposit_sleep != '') {
                $('#bank_deposit_sleep_container_for_occupancycertificate').hide();
                $('#bank_deposit_sleep_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.bank_deposit_sleep);
                $('#bank_deposit_sleep_name_container_for_occupancycertificate').show();
                $('#bank_deposit_sleep_download').attr("href", OCCUPANCY_DOC_PATH + formData.bank_deposit_sleep);
            }
            if (formData.deviation_photographs != '') {
                $('#deviation_photographs_container_for_occupancycertificate').hide();
                $('#deviation_photographs_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.deviation_photographs);
                $('#deviation_photographs_name_container_for_occupancycertificate').show();
                $('#deviation_photographs_download').attr("href", OCCUPANCY_DOC_PATH + formData.deviation_photographs);
            }
            if (formData.copy_7_12 != '') {
                $('#copy_7_12_container_for_occupancycertificate').hide();
                $('#copy_7_12_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_7_12);
                $('#copy_7_12_name_container_for_occupancycertificate').show();
                $('#copy_7_12_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_7_12);
            }
            if (formData.certificate_map != '') {
                $('#certificate_map_container_for_occupancycertificate').hide();
                $('#certificate_map_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.certificate_map);
                $('#certificate_map_name_container_for_occupancycertificate').show();
                $('#certificate_map_download').attr("href", OCCUPANCY_DOC_PATH + formData.certificate_map);
            }
        }
        generateSelect2();
        datePicker();
        $('#occupancycertificate_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitOccupancyCertificate($('#submit_btn_for_occupancyCertificate'));
            }
        });
    },
    editOrViewOccupancyCertificate: function (btnObj, occupancyCertificateId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!occupancyCertificateId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'occupancy_certificate/get_occupancycertificate_data_by_id',
            type: 'post',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId}, getTokenData()),
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
                    that.newOccupancyCertificateForm(isEdit, parseData);
                } else {
                    that.viewOccupancyCertificateForm(parseData);
                }
            }
        });
    },
    viewOccupancyCertificateForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.occupancycertificate_data;
        OccupancyCertificate.router.navigate('view_occupancycertificate_form');
        formData.occupancycertificate_data = parseData.occupancycertificate_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#occupancycertificate_form_and_datatable_container').html(occupancyCertificateViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        that.getDepartmentdata(district);
        if (formData.is_fire_noc == VALUE_ONE) {
            $('#is_fire_noc_yes').attr('checked', 'checked');
            this.$('.fire_noc_div').show();
        }
        if (formData.is_existing_building_plan == VALUE_TWO) {
            $('#is_existing_building_plan_no').attr('checked', 'checked');
            this.$('.existing_building_plan_div').show();
        }
        if (formData.is_form_of_indemnity == VALUE_ONE) {
            $('#is_form_of_indemnity_yes').attr('checked', 'checked');
            this.$('.form_of_indemnity_div').show();
        }
        if (formData.is_stability_certificate == VALUE_ONE) {
            $('#is_stability_certificate_yes').attr('checked', 'checked');
            this.$('.stability_certificate_div').show();
        }
        if (formData.annexure_14 != '') {
            $('#annexure_14_container_for_occupancycertificate').hide();
            $('#annexure_14_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.annexure_14);
            $('#annexure_14_name_container_for_occupancycertificate').show();
            $('#annexure_14_download').attr("href", OCCUPANCY_DOC_PATH + formData.annexure_14);
        }
        if (formData.oc_part_oc != '') {
            $('#oc_part_oc_container_for_occupancycertificate').hide();
            $('#oc_part_oc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.oc_part_oc);
            $('#oc_part_oc_name_container_for_occupancycertificate').show();
            $('#oc_part_oc_download').attr("href", OCCUPANCY_DOC_PATH + formData.oc_part_oc);
        }
        if (formData.copy_of_construction_permission != '') {
            $('#copy_of_construction_permission_container_for_occupancycertificate').hide();
            $('#copy_of_construction_permission_name_image_for_occupancycertificate').attr('src', OCCUPANCY_DOC_PATH + formData.copy_of_construction_permission);
            $('#copy_of_construction_permission_name_container_for_occupancycertificate').show();
            $('#copy_of_construction_permission_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_construction_permission);
        }
        // if (formData.owner_signature != '') {
        //     $('#owner_signature_container_for_occupancycertificate').hide();
        //     $('#owner_signature_name_image_for_occupancycertificate').attr('src', OCCUPANCY_DOC_PATH + formData.owner_signature);
        //     $('#owner_signature_name_container_for_occupancycertificate').show();
        //     $('#owner_signature_download').attr("href", OCCUPANCY_DOC_PATH + formData.owner_signature);
        // }
        if (formData.copy_of_occupancycertificate_permission != '') {
            $('#copy_of_occupancycertificate_permission_container_for_occupancycertificate').hide();
            $('#copy_of_occupancycertificate_permission_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_occupancycertificate_permission);
            $('#copy_of_occupancycertificate_permission_name_container_for_occupancycertificate').show();
            $('#copy_of_occupancycertificate_permission_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_occupancycertificate_permission);
        }
        if (formData.copy_of_building_plan != '') {
            $('#copy_of_building_plan_container_for_occupancycertificate').hide();
            $('#copy_of_building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_building_plan);
            $('#copy_of_building_plan_name_container_for_occupancycertificate').show();
            $('#copy_of_building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_building_plan);
        }
        if (formData.stability_certificate != '') {
            $('#stability_certificate_container_for_occupancycertificate').hide();
            $('#stability_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.stability_certificate);
            $('#stability_certificate_name_container_for_occupancycertificate').show();
            $('#stability_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.stability_certificate);
        }
        if (formData.building_height_noc != '') {
            $('#building_height_noc_container_for_occupancycertificate').hide();
            $('#building_height_noc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.building_height_noc);
            $('#building_height_noc_name_container_for_occupancycertificate').show();
            $('#building_height_noc_download').attr("href", OCCUPANCY_DOC_PATH + formData.building_height_noc);
        }
        if (formData.fire_noc != '') {
            $('#fire_noc_container_for_occupancycertificate').hide();
            $('#fire_noc_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.fire_noc);
            $('#fire_noc_name_container_for_occupancycertificate').show();
            $('#fire_noc_download').attr("href", OCCUPANCY_DOC_PATH + formData.fire_noc);
        }
        if (formData.copy_of_water_harvesting != '') {
            $('#copy_of_water_harvesting_container_for_occupancycertificate').hide();
            $('#copy_of_water_harvesting_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_of_water_harvesting);
            $('#copy_of_water_harvesting_name_container_for_occupancycertificate').show();
            $('#copy_of_water_harvesting_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_of_water_harvesting);
        }
        if (formData.existing_building_plan != '') {
            $('#existing_building_plan_container_for_occupancycertificate').hide();
            $('#existing_building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.existing_building_plan);
            $('#existing_building_plan_name_container_for_occupancycertificate').show();
            $('#existing_building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.existing_building_plan);
        }
        if (formData.form_of_indemnity != '') {
            $('#form_of_indemnity_container_for_occupancycertificate').hide();
            $('#form_of_indemnity_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.form_of_indemnity);
            $('#form_of_indemnity_name_container_for_occupancycertificate').show();
            $('#form_of_indemnity_download').attr("href", OCCUPANCY_DOC_PATH + formData.form_of_indemnity);
        }
        if (formData.annexure_sixteen != '') {
            $('#annexure_sixteen_container_for_occupancycertificate').hide();
            $('#annexure_sixteen_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.annexure_sixteen);
            $('#annexure_sixteen_name_container_for_occupancycertificate').show();
            $('#annexure_sixteen_download').attr("href", OCCUPANCY_DOC_PATH + formData.annexure_sixteen);
        }
        if (formData.fire_emergency != '') {
            $('#fire_emergency_container_for_occupancycertificate').hide();
            $('#fire_emergency_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.fire_emergency);
            $('#fire_emergency_name_container_for_occupancycertificate').show();
            $('#fire_emergency_download').attr("href", OCCUPANCY_DOC_PATH + formData.fire_emergency);
        }
        if (formData.building_plan != '') {
            $('#building_plan_container_for_occupancycertificate').hide();
            $('#building_plan_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.building_plan);
            $('#building_plan_name_container_for_occupancycertificate').show();
            $('#building_plan_download').attr("href", OCCUPANCY_DOC_PATH + formData.building_plan);
        }
        if (formData.stability_certificate_dnh != '') {
            $('#stability_certificate_dnh_container_for_occupancycertificate').hide();
            $('#stability_certificate_dnh_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.stability_certificate_dnh);
            $('#stability_certificate_dnh_name_container_for_occupancycertificate').show();
            $('#stability_certificate_dnh_download').attr("href", OCCUPANCY_DOC_PATH + formData.stability_certificate_dnh);
        }
        if (formData.occupancy_certificate_dnh != '') {
            $('#occupancy_certificate_dnh_container_for_occupancycertificate').hide();
            $('#occupancy_certificate_dnh_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.occupancy_certificate_dnh);
            $('#occupancy_certificate_dnh_name_container_for_occupancycertificate').show();
            $('#occupancy_certificate_dnh_download').attr("href", OCCUPANCY_DOC_PATH + formData.occupancy_certificate_dnh);
        }
        if (formData.existing_cp != '') {
            $('#existing_cp_container_for_occupancycertificate').hide();
            $('#existing_cp_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.existing_cp);
            $('#existing_cp_name_container_for_occupancycertificate').show();
            $('#existing_cp_download').attr("href", OCCUPANCY_DOC_PATH + formData.existing_cp);
        }
        if (formData.labour_cess_certificate != '') {
            $('#labour_cess_certificate_container_for_occupancycertificate').hide();
            $('#labour_cess_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.labour_cess_certificate);
            $('#labour_cess_certificate_name_container_for_occupancycertificate').show();
            $('#labour_cess_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.labour_cess_certificate);
        }
        if (formData.valuation_certificate != '') {
            $('#valuation_certificate_container_for_occupancycertificate').hide();
            $('#valuation_certificate_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.valuation_certificate);
            $('#valuation_certificate_name_container_for_occupancycertificate').show();
            $('#valuation_certificate_download').attr("href", OCCUPANCY_DOC_PATH + formData.valuation_certificate);
        }
        if (formData.bank_deposit_sleep != '') {
            $('#bank_deposit_sleep_container_for_occupancycertificate').hide();
            $('#bank_deposit_sleep_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.bank_deposit_sleep);
            $('#bank_deposit_sleep_name_container_for_occupancycertificate').show();
            $('#bank_deposit_sleep_download').attr("href", OCCUPANCY_DOC_PATH + formData.bank_deposit_sleep);
        }
        if (formData.deviation_photographs != '') {
            $('#deviation_photographs_container_for_occupancycertificate').hide();
            $('#deviation_photographs_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.deviation_photographs);
            $('#deviation_photographs_name_container_for_occupancycertificate').show();
            $('#deviation_photographs_download').attr("href", OCCUPANCY_DOC_PATH + formData.deviation_photographs);
        }
        if (formData.copy_7_12 != '') {
            $('#copy_7_12_container_for_occupancycertificate').hide();
            $('#copy_7_12_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.copy_7_12);
            $('#copy_7_12_name_container_for_occupancycertificate').show();
            $('#copy_7_12_download').attr("href", OCCUPANCY_DOC_PATH + formData.copy_7_12);
        }
        if (formData.certificate_map != '') {
            $('#certificate_map_container_for_occupancycertificate').hide();
            $('#certificate_map_name_image_for_occupancycertificate').attr('src', baseUrl + 'documents/filmshooting/' + formData.certificate_map);
            $('#certificate_map_name_container_for_occupancycertificate').show();
            $('#certificate_map_download').attr("href", OCCUPANCY_DOC_PATH + formData.certificate_map);
        }

    },
    checkValidationForOccupancyCertificate: function (occupancyCertificateData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!occupancyCertificateData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!occupancyCertificateData.situated_at) {
            return getBasicMessageAndFieldJSONArray('situated_at', situatedAtValidationMessage);
        }
        if (!occupancyCertificateData.license_no) {
            return getBasicMessageAndFieldJSONArray('license_no', licenseNoValidationMessage);
        }
        if (!occupancyCertificateData.occupancy_registration_no) {
            return getBasicMessageAndFieldJSONArray('occupancy_registration_no', occupancyRegistrationNoValidationMessage);
        }
        if (!occupancyCertificateData.address) {
            return getBasicMessageAndFieldJSONArray('address', occupancyAddressValidationMessage);
        }

        return '';
    },
    askForSubmitOccupancyCertificate: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'OccupancyCertificate.listview.submitOccupancyCertificate(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitOccupancyCertificate: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var occupancyCertificateData = $('#occupancycertificate_form').serializeFormJSON();
        var validationData = that.checkValidationForOccupancyCertificate(occupancyCertificateData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('occupancycertificate-' + validationData.field, validationData.message);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_occupancycertificate') : $('#submit_btn_for_occupancycertificate');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var occupancyCertificateData = new FormData($('#occupancycertificate_form')[0]);
        occupancyCertificateData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        occupancyCertificateData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/submit_occupancycertificate',
            data: occupancyCertificateData,
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
                validationMessageShow('occupancycertificate', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                OccupancyCertificate.router.navigate('occupancycertificate', {'trigger': true});
            }
        });
    },

    askForRemove: function (occupancyCertificateId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'OccupancyCertificate.listview.removeDocument(\'' + occupancyCertificateId + '\',\'' + docId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (occupancyCertificateId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/remove_document',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('occupancycertificate', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_occupancycertificate').hide();
                $('#' + docId + '_name_image_for_occupancycertificate').attr('src', '');
                $('#' + docId + '_container_for_occupancycertificate').show();
                $('#' + docId + '_for_occupancycertificate').val('');
            }
        });
    },
    generateForm1: function (occupancyCertificateId) {
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#occupancycertificate_id_for_occupancycertificate_form1').val(occupancyCertificateId);
        $('#occupancycertificate_form1_pdf_form').submit();
        $('#occupancycertificate_id_for_occupancycertificate_form1').val('');
    },
    openUploadChallan: function (occupancyCertificateId) {
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + occupancyCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'occupancy_certificate/get_occupancycertificate_data_by_occupancycertificate_id',
            type: 'post',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var occupancyCertificateData = parseData.occupancycertificate_data;
                showPopup();
                if (occupancyCertificateData.status != VALUE_FOUR && occupancyCertificateData.status != VALUE_FIVE && occupancyCertificateData.status != VALUE_SIX && occupancyCertificateData.status != VALUE_SEVEN && occupancyCertificateData.status != VALUE_EIGHT  && occupancyCertificateData.status != VALUE_ELEVEN) {
                    occupancyCertificateData.show_remove_upload_btn = true;
                }
                if (occupancyCertificateData.payment_type == VALUE_ONE) {
                    occupancyCertificateData.utitle = 'Challan Copy';
                } else {
                    occupancyCertificateData.utitle = 'Payment Details';
                }
                if (occupancyCertificateData.status != VALUE_FOUR && occupancyCertificateData.status != VALUE_FIVE && occupancyCertificateData.status != VALUE_SIX) {
                    occupancyCertificateData.show_remove_upload_btn = true;
                }
                occupancyCertificateData.module_type = VALUE_TWENTYEIGHT;
                $('#popup_container').html(occupancyCertificateUploadChallanTemplate(occupancyCertificateData));
                loadFB(VALUE_TWENTYEIGHT, parseData.fb_data, occupancyCertificateData.payment_type, occupancyCertificateData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'occupancycertificate_upload_challan', occupancyCertificateData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'occupancycertificate_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYEIGHT);
                if (occupancyCertificateData.challan != '') {
                    $('#challan_container_for_occupancycertificate_upload_challan').hide();
                    $('#challan_name_container_for_occupancycertificate_upload_challan').show();
                    $('#challan_name_href_for_occupancycertificate_upload_challan').attr('href', 'documents/occupancycertificate/' + occupancyCertificateData.challan);
                    $('#challan_name_for_occupancycertificate_upload_challan').html(occupancyCertificateData.challan);
                    $('#challan_remove_btn_for_occupancycertificate_upload_challan').attr('onclick', 'OccupancyCertificate.listview.removeChallan("' + occupancyCertificateData.occupancy_certificate_id + '")');
                }
            }
        });
    },
    removeChallan: function (occupancyCertificateId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/remove_challan',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId}, getTokenData()),
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
                validationMessageShow('occupancycertificate-uc', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-occupancycertificate-uc').html(parseData.message);
                removeDocument('challan', 'occupancycertificate_upload_challan');
                $('#status_' + occupancyCertificateId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-occupancycertificate-uc').html('');
        validationMessageHide();
        var occupancyCertificateId = $('#occupancycertificate_id_for_occupancycertificate_upload_challan').val();
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_occupancycertificate_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_occupancycertificate_upload_challan_1').focus();
            validationMessageShow('occupancycertificate-uc-payment_type_for_occupancycertificate_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_occupancycertificate_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_occupancycertificate_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_occupancycertificate_upload_challan').focus();
                validationMessageShow('occupancycertificate-uc-challan_for_occupancycertificate_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_occupancycertificate_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_occupancycertificate_upload_challan').focus();
                validationMessageShow('occupancycertificate-uc-challan_for_occupancycertificate_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYEIGHT, 'occupancycertificate-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_occupancycertificate_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#occupancycertificate_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/upload_challan',
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
                validationMessageShow('occupancycertificate-uc', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + occupancyCertificateId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + occupancyCertificateId).show();
                }
                $('#total_fees_' + occupancyCertificateId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + establishmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'occupancy_certificate/get_occupancycertificate_data_by_occupancycertificate_id',
            type: 'post',
            data: $.extend({}, {'occupancycertificate_id': establishmentId}, getTokenData()),
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
                var occupancycertificateData = parseData.occupancycertificate_data;
                showPopup();
                $('#popup_container').html(occupancyCertificateApproveTemplate(occupancycertificateData));
                datePicker();
            }
        });
    },
    approveApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var formData = $('#approve_occupancycertificate_form').serializeFormJSON();
        if (!formData.occupancycertificate_id_for_occupancycertificate_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_occupancycertificate_approve', 10240);
        if (certficateMessage != '') {
            $('#certificate_file_for_occupancycertificate_approve').focus();
            validationMessageShow('occupancycertificate-approve-certificate_file_for_occupancycertificate_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_occupancycertificate_approve) {
            $('#remarks_for_occupancycertificate_approve').focus();
            validationMessageShow('occupancycertificate-approve-remarks_for_occupancycertificate_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_occupancycertificate_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_occupancycertificate_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/approve_application',
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
                validationMessageShow('occupancycertificate-approve', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.occupancycertificate_id_for_occupancycertificate_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_approve).remove();
                $('#approve_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_approve).show();
                $('#so_status_' + formData.occupancycertificate_id_for_occupancycertificate_approve).html(dateTimeDays(formData.occupancycertificate_id_for_occupancycertificate_approve, parseData, VALUE_TWENTYEIGHT));
                //that.loadCLACTData();
            }
        });
    },
    askForRejectApplication: function (occupancyCertificateId) {
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + occupancyCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'occupancy_certificate/get_occupancycertificate_data_by_occupancycertificate_id',
            type: 'post',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId}, getTokenData()),
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
                var occupancyCertificateData = parseData.occupancycertificate_data;
                showPopup();
                $('#popup_container').html(occupancyCertificateRejectTemplate(occupancyCertificateData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_occupancycertificate_form').serializeFormJSON();
        if (!formData.occupancycertificate_id_for_occupancycertificate_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_occupancycertificate_reject) {
            $('#remarks_for_occupancycertificate_reject').focus();
            validationMessageShow('occupancycertificate-reject-remarks_for_occupancycertificate_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'occupancy_certificate/reject_renewal_application',
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
                validationMessageShow('occupancycertificate-reject', textStatus.statusText);
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
                    validationMessageShow('occupancycertificate-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.occupancycertificate_id_for_occupancycertificate_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.occupancycertificate_id_for_occupancycertificate_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.occupancycertificate_id_for_occupancycertificate_reject).remove();
                $('#reject_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_reject).remove();
                $('#approve_btn_for_app_' + formData.occupancycertificate_id_for_occupancycertificate_reject).remove();
                $('#so_status_' + formData.occupancycertificate_id_for_occupancycertificate_reject).html(dateTimeDays(formData.occupancycertificate_id_for_occupancycertificate_reject, parseData, VALUE_TWENTYEIGHT));
            }
        });
    },
    generateCertificate: function (occupancyCertificateId) {
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#occupancycertificate_id_for_certificate').val(occupancyCertificateId);
        $('#occupancycertificate_certificate_pdf_form').submit();
        $('#occupancycertificate_id_for_certificate').val('');
    },
    getQueryData: function (occupancyCertificateId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!occupancyCertificateId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYEIGHT;
        templateData.module_id = occupancyCertificateId;
        var btnObj = $('#query_btn_for_wm_' + occupancyCertificateId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYEIGHT, moduleData.occupancy_certificate_id);
                tmpData.applicant_name = moduleData.plot_no;
                tmpData.title = 'Plot No';
                tmpData.module_type = VALUE_TWENTYEIGHT;
                tmpData.module_id = occupancyCertificateId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (occupancyCertificateId) {
        if (!occupancyCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + occupancyCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'occupancy_certificate/get_occupancycertificate_data_by_occupancycertificate_id',
            type: 'post',
            data: $.extend({}, {'occupancycertificate_id': occupancyCertificateId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var occupancyCertificateData = parseData.occupancycertificate_data;
                showPopup();
                if (occupancyCertificateData.payment_type == VALUE_ONE || occupancyCertificateData.payment_type == VALUE_THREE) {
                    occupancyCertificateData.user_payment_type_text = paymentTypeArray[occupancyCertificateData.payment_type];
                } else {
                    occupancyCertificateData.user_payment_type_text = userPaymentTypeArray[occupancyCertificateData.user_payment_type] ? userPaymentTypeArray[occupancyCertificateData.user_payment_type] : '';
                }
                if (occupancyCertificateData.payment_type == VALUE_ONE) {
                    occupancyCertificateData.utitle = 'Fees Paid Challan Copy';
                } else if (occupancyCertificateData.payment_type == VALUE_TWO && occupancyCertificateData.user_payment_type == VALUE_ONE) {
                    occupancyCertificateData.utitle = 'Demand Draft (DD) Copy';
                }
                occupancyCertificateData.module_type = VALUE_TWENTYEIGHT;
                $('#popup_container').html(occupancyCertificateViewPaymentTemplate(occupancyCertificateData));
                loadFB(VALUE_TWENTYEIGHT, parseData.fb_data, occupancyCertificateData.payment_type);
                loadPH(VALUE_TWENTYEIGHT, occupancyCertificateData.occupancy_certificate_id, parseData.ph_data);
                if (occupancyCertificateData.payment_type == VALUE_ONE || (occupancyCertificateData.payment_type == VALUE_TWO && occupancyCertificateData.user_payment_type == VALUE_ONE)) {
                    if (occupancyCertificateData.fees_paid_challan != '') {
                        $('#vp_container_for_occupancycertificate').show();
                        $('#fees_paid_challan_name_href_for_occupancycertificate').attr('href', OCCUPANCY_DOC_PATH + occupancyCertificateData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_occupancycertificate').html(occupancyCertificateData.fees_paid_challan);
                    }
                }
            }
        });
    },
    getDepartmentdata: function (department) {
        var val = department.value;
        if (val == '') {
            return false;
            dd_for_oc_div
        }
        if (val === '1') {

            this.$('.dd_for_oc_div').show();
            this.$('.dnh_for_oc_div').hide();

            this.$('.copy_of_construction_permission_item_container_for_occupancycertificate').show();
            this.$('.copy_of_building_plan_item_container_for_occupancycertificate').show();
            this.$('.stability_certificate_item_container_for_occupancycertificate').show();
            this.$('.building_height_noc_item_container_for_occupancycertificate').show();
            this.$('.fire_noc_item_container_for_occupancycertificate').show();
            this.$('.copy_of_water_harvesting_item_container_for_occupancycertificate').show();
            this.$('.existing_building_plan_item_container_for_occupancycertificate').show();
            this.$('.form_of_indemnity_item_container_for_occupancycertificate').show();
            this.$('.annexure_14_item_container_for_occupancycertificate').hide();
            this.$('.oc_part_oc_item_container_for_occupancycertificate').hide();
            this.$('.fire_emergency_item_container_for_occupancycertificate').hide();
            this.$('.building_plan_item_container_for_occupancycertificate').hide();
            this.$('.stability_certificate_dnh_item_container_for_occupancycertificate').hide();
            this.$('.occupancy_certificate_dnh_item_container_for_occupancycertificate').hide();
            this.$('.existing_cp_item_container_for_occupancycertificate').hide();
            this.$('.labour_cess_certificate_item_container_for_occupancycertificate').hide();
            this.$('.valuation_certificate_item_container_for_occupancycertificate').hide();
            this.$('.bank_deposit_sleep_item_container_for_occupancycertificate').hide();
            this.$('.deviation_photographs_item_container_for_occupancycertificate').hide();
            this.$('.copy_7_12_item_container_for_occupancycertificate').hide();
            this.$('.certificate_map_item_container_for_occupancycertificate').hide();

        }
        if (val === '2') {

            this.$('.dd_for_oc_div').show();
            this.$('.dnh_for_oc_div').hide();

            this.$('.copy_of_construction_permission_item_container_for_occupancycertificate').show();
            this.$('.copy_of_building_plan_item_container_for_occupancycertificate').show();
            this.$('.stability_certificate_item_container_for_occupancycertificate').show();
            this.$('.building_height_noc_item_container_for_occupancycertificate').show();
            this.$('.fire_noc_item_container_for_occupancycertificate').show();
            this.$('.copy_of_water_harvesting_item_container_for_occupancycertificate').show();
            this.$('.existing_building_plan_item_container_for_occupancycertificate').show();
            this.$('.form_of_indemnity_item_container_for_occupancycertificate').show();
            this.$('.annexure_14_item_container_for_occupancycertificate').hide();
            this.$('.oc_part_oc_item_container_for_occupancycertificate').hide();
            this.$('.fire_emergency_item_container_for_occupancycertificate').hide();
            this.$('.building_plan_item_container_for_occupancycertificate').hide();
            this.$('.stability_certificate_dnh_item_container_for_occupancycertificate').hide();
            this.$('.occupancy_certificate_dnh_item_container_for_occupancycertificate').hide();
            this.$('.existing_cp_item_container_for_occupancycertificate').hide();
            this.$('.labour_cess_certificate_item_container_for_occupancycertificate').hide();
            this.$('.valuation_certificate_item_container_for_occupancycertificate').hide();
            this.$('.bank_deposit_sleep_item_container_for_occupancycertificate').hide();
            this.$('.deviation_photographs_item_container_for_occupancycertificate').hide();
            this.$('.copy_7_12_item_container_for_occupancycertificate').hide();
            this.$('.certificate_map_item_container_for_occupancycertificate').hide();


        }
        if (val === '3') {
            this.$('.dd_for_oc_div').hide();
            this.$('.dnh_for_oc_div').show();

            this.$('.copy_of_construction_permission_item_container_for_occupancycertificate').show();
            this.$('.copy_of_building_plan_item_container_for_occupancycertificate').show();
            this.$('.stability_certificate_item_container_for_occupancycertificate').hide();
            this.$('.building_height_noc_item_container_for_occupancycertificate').hide();
            this.$('.fire_noc_item_container_for_occupancycertificate').hide();
            this.$('.copy_of_water_harvesting_item_container_for_occupancycertificate').show();
            this.$('.existing_building_plan_item_container_for_occupancycertificate').hide();
            this.$('.form_of_indemnity_item_container_for_occupancycertificate').show();
            this.$('.annexure_14_item_container_for_occupancycertificate').show();
            this.$('.oc_part_oc_item_container_for_occupancycertificate').show();
            this.$('.fire_emergency_item_container_for_occupancycertificate').show();
            this.$('.building_plan_item_container_for_occupancycertificate').show();
            this.$('.stability_certificate_dnh_item_container_for_occupancycertificate').show();
            this.$('.occupancy_certificate_dnh_item_container_for_occupancycertificate').show();
            this.$('.existing_cp_item_container_for_occupancycertificate').show();
            this.$('.labour_cess_certificate_item_container_for_occupancycertificate').show();
            this.$('.valuation_certificate_item_container_for_occupancycertificate').show();
            this.$('.bank_deposit_sleep_item_container_for_occupancycertificate').show();
            this.$('.deviation_photographs_item_container_for_occupancycertificate').show();
            this.$('.copy_7_12_item_container_for_occupancycertificate').show();
            this.$('.certificate_map_item_container_for_occupancycertificate').show();


        }
    },
});
