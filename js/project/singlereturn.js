var singleReturnListTemplate = Handlebars.compile($('#single_return_list_template').html());
var singleReturnTableTemplate = Handlebars.compile($('#single_return_table_template').html());
var singleReturnActionTemplate = Handlebars.compile($('#single_return_action_template').html());
var singleReturnFormTemplate = Handlebars.compile($('#single_return_form_template').html());
var singleReturnViewTemplate = Handlebars.compile($('#single_return_view_template').html());

var partADetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_parta_details_form_template').html());
var partBDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_partb_details_form_template').html());
var partCDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_partc_details_form_template').html());
var partDDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_partd_details_form_template').html());
var partEDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_parte_details_form_template').html());
var partFDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_partf_details_form_template').html());
var partGDetailsSingleReturnFormTemplate = Handlebars.compile($('#single_return_partg_details_form_template').html());

var singleReturnPartAViewTemplate = Handlebars.compile($('#single_return_parta_view_template').html());
var singleReturnPartBViewTemplate = Handlebars.compile($('#single_return_partb_view_template').html());
var singleReturnPartCViewTemplate = Handlebars.compile($('#single_return_partc_view_template').html());
var singleReturnPartDViewTemplate = Handlebars.compile($('#single_return_partd_view_template').html());
var singleReturnPartEViewTemplate = Handlebars.compile($('#single_return_parte_view_template').html());
var singleReturnPartFViewTemplate = Handlebars.compile($('#single_return_partf_view_template').html());
var singleReturnPartGViewTemplate = Handlebars.compile($('#single_return_partg_view_template').html());

var singleReturnUploadChallanTemplate = Handlebars.compile($('#single_return_upload_challan_template').html());
var singleReturnApproveTemplate = Handlebars.compile($('#single_return_approve_template').html());
var singleReturnRejectTemplate = Handlebars.compile($('#single_return_reject_template').html());
var singleReturnViewPaymentTemplate = Handlebars.compile($('#single_return_view_payment_template').html());

var dangerousProcessTemplate = Handlebars.compile($('#dangerous_process_template').html());
var hazardousProcessTemplate = Handlebars.compile($('#hazardous_process_template').html());

var tempProcessCnt = 1;
var tempHazardousCnt = 1;


var SingleReturn = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
SingleReturn.Router = Backbone.Router.extend({
    routes: {
        'singlereturn': 'renderList',
        'singlereturn_form': 'renderListForForm',
        'edit_singlereturn_form': 'renderList',
        'view_singlereturn_form': 'renderList',
        'partA_details/:id': 'renderList',
        'partB_details/:id': 'renderList',
        'partC_details/:id': 'renderList',
        'partD_details/:id': 'renderList',
        'partE_details/:id': 'renderList',
        'partF_details/:id': 'renderList',
        'partG_details/:id': 'renderList',
    },
    renderList: function () {
        SingleReturn.listview.listPageForSingleReturn();
    },
    renderListForForm: function () {
        SingleReturn.listview.listPageSingleReturnForm();
    },
});
SingleReturn.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_dismissed_service"]': 'hasDismissedServicesEvent',
        'click input[name="is_provide_washroom"]': 'hasWashroomServicesEvent',
        'click input[name="is_provide_medical_officer"]': 'hasMedicalOfficerServicesEvent',
    },
    hasDismissedServicesEvent: function (event) {
        var val = $('input[name=is_dismissed_service]:checked').val();
        if (val === '1') {
            this.$('.is_dismissed_service_div').show();
        } else {
            this.$('.is_dismissed_service_div').hide();

        }
    },
    hasWashroomServicesEvent: function (event) {
        var val = $('input[name=is_provide_washroom]:checked').val();
        if (val === '1') {
            this.$('.is_provide_washroom_div').show();
        } else {
            this.$('.is_provide_washroom_div').hide();

        }
    },
    hasMedicalOfficerServicesEvent: function (event) {
        var val = $('input[name=is_provide_medical_officer]:checked').val();
        if (val === '1') {
            this.$('.is_provide_medical_officer_div').show();
        } else {
            this.$('.is_provide_medical_officer_div').hide();

        }
    },
    listPageForSingleReturn: function (sDistrict, sStatus, sAppTimingStatus) {
        this.loadSingleReturn(sDistrict, sStatus, sAppTimingStatus);
        this.loadSingleReturnData(sDistrict, sStatus, sAppTimingStatus);
    },
    loadSingleReturn: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_singlereturn', 'active');
        var templateData = {};
        this.$el.html(singleReturnListTemplate(templateData));
    },
    listPageSingleReturnForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_singlereturn', 'active');
        this.$el.html(singleReturnListTemplate);
        this.newSingleReturnForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return singleReturnActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYNINE;
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
        return singleReturnActionTemplate(rowData);
    },
    loadSingleReturnData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.esta_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.industry_nature;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_THIRTYNINE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYNINE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['single_return_data'], function (index, objData) {
                json['single_return_data'][index]['query_movement_string'] = qmData[objData.singlereturn_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.singlereturn_id] + '</table>') : '-';
            });
            return json['single_return_data'];
        };
        var that = this;
        SingleReturn.router.navigate('singlereturn');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'SingleReturn.listview.loadSingleReturnData();');
        $('#single_return_form_and_datatable_container').html(singleReturnTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_singlereturn_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_singlereturn_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_singlereturn_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_singlereturn_list', false);
        allowOnlyIntegerValue('mobile_number_for_singlereturn_list');
        //  if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_singlereturn_list', false);
        $('#district_for_singlereturn_list').val(searchData.search_district);
        $('#status_for_singlereturn_list').val(searchData.search_status);
        $('#app_timing_for_singlereturn_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_singlereturn_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_singlereturn_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_singlereturn_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_singlereturn_list').attr('disabled', 'disabled');
        }
        singleReturnDataTable = $('#single_return_datatable').DataTable({
            ajax: {url: 'singlereturn/get_single_return_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'singlereturn_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'singlereturn_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'singlereturn_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'singlereturn_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  } 
        $('#single_return_datatable_filter').remove();
        $('#single_return_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = singleReturnDataTable.row(tr);

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
    askForNewSingleReturnForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newSingleReturnForm(false, {});
    },
    newSingleReturnForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;

        var that = this;
        if (isEdit) {
            var formData = parseData.single_return_data;
            SingleReturn.router.navigate('edit_singlereturn_form');
        } else {
            var formData = {};
            SingleReturn.router.navigate('singlereturn_form');
        }

        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.singleReturn_data = parseData.single_return_data;
        templateData.commencement_date = dateTo_DD_MM_YYYY(formData.commencement_date);
        $('#single_return_form_and_datatable_container').html(singleReturnFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
        }
        generateSelect2();
        datePicker();
        $('#single_return_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSingleReturn($('#submit_btn_for_single_return'));
            }
        });
    },
    partADetailsForm: function (singleReturnPartAData) {
        console.log(singleReturnPartAData);
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partA_details/' + singleReturnPartAData.encrypt_id);
        singleReturnPartAData.VALUE_ONE = VALUE_ONE;
        singleReturnPartAData.VALUE_TWO = VALUE_TWO;
        $('#single_return_form_and_datatable_container').html(partADetailsSingleReturnFormTemplate(singleReturnPartAData));

        datePicker();
        $('#parta_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partBDetailsForm: function (singleReturnPartBData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partB_details/' + singleReturnPartBData.encrypt_id);
        singleReturnPartBData.VALUE_ONE = VALUE_ONE;
        singleReturnPartBData.VALUE_TWO = VALUE_TWO;
        singleReturnPartBData.payment_date = dateTo_DD_MM_YYYY(singleReturnPartBData.payment_date);
        $('#single_return_form_and_datatable_container').html(partBDetailsSingleReturnFormTemplate(singleReturnPartBData));

        datePicker();
        $('#partb_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partCDetailsForm: function (singleReturnPartCData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partC_details/' + singleReturnPartCData.encrypt_id);
        singleReturnPartCData.VALUE_ONE = VALUE_ONE;
        singleReturnPartCData.VALUE_TWO = VALUE_TWO;
        $('#single_return_form_and_datatable_container').html(partCDetailsSingleReturnFormTemplate(singleReturnPartCData));

        if (singleReturnPartCData.is_paid_weekly_holiday == VALUE_ONE)
            $("#is_paid_weekly_holiday_yes").prop("checked", true);
        else
            $("#is_paid_weekly_holiday_no").prop("checked", true);

        if (singleReturnPartCData.is_provide_canteen == VALUE_ONE)
            $("#is_provide_canteen_yes").prop("checked", true);
        else
            $("#is_provide_canteen_no").prop("checked", true);

        if (singleReturnPartCData.is_provide_restroom == VALUE_ONE)
            $("#is_provide_restroom_yes").prop("checked", true);
        else
            $("#is_provide_restroom_no").prop("checked", true);

        if (singleReturnPartCData.is_provide_drinking_water == VALUE_ONE)
            $("#is_provide_drinking_water_yes").prop("checked", true);
        else
            $("#is_provide_drinking_water_no").prop("checked", true);

        if (singleReturnPartCData.is_provide_creches == VALUE_ONE)
            $("#is_provide_creches_yes").prop("checked", true);
        else
            $("#is_provide_creches_no").prop("checked", true);

        if (singleReturnPartCData.is_provide_firstaid == VALUE_ONE)
            $("#is_provide_firstaid_yes").prop("checked", true);
        else
            $("#is_provide_firstaid_no").prop("checked", true);

        datePicker();
        $('#partc_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partDDetailsForm: function (singleReturnPartDData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProcessCnt = 1;
        tempHazardousCnt = 1;
        var that = this;
        SingleReturn.router.navigate('partD_details/' + singleReturnPartDData.encrypt_id);
        singleReturnPartDData.VALUE_ONE = VALUE_ONE;
        singleReturnPartDData.VALUE_TWO = VALUE_TWO;
        singleReturnPartDData.plan_approval_date = dateTo_DD_MM_YYYY(singleReturnPartDData.plan_approval_date);
        singleReturnPartDData.certificate_obtain_on_date = dateTo_DD_MM_YYYY(singleReturnPartDData.certificate_obtain_on_date);
        singleReturnPartDData.certificate_submitted_on_date = dateTo_DD_MM_YYYY(singleReturnPartDData.certificate_submitted_on_date);
        singleReturnPartDData.amended_date = dateTo_DD_MM_YYYY(singleReturnPartDData.amended_date);
        singleReturnPartDData.rehearsals_date = dateTo_DD_MM_YYYY(singleReturnPartDData.rehearsals_date);
        $('#single_return_form_and_datatable_container').html(partDDetailsSingleReturnFormTemplate(singleReturnPartDData));
        $('#sector').val(singleReturnPartDData.sector);
        $('#registration_section').val(singleReturnPartDData.registration_section);
        $('#canteen_managed_by').val(singleReturnPartDData.canteen_managed_by);
        $('#retainer_ship').val(singleReturnPartDData.retainer_ship);

        if (singleReturnPartDData.is_provide_washroom == '1') {
            this.$('.is_provide_washroom_div').show();
        }

        if (singleReturnPartDData.is_provide_medical_officer == '1') {
            this.$('.is_provide_medical_officer_div').show();
        }

        if (singleReturnPartDData.is_dust_generated == VALUE_ONE)
            $("#is_dust_generated_yes").prop("checked", true);
        else
            $("#is_dust_generated_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_drinking_water == VALUE_ONE)
            $("#is_provide_drinking_water_yes").prop("checked", true);
        else
            $("#is_provide_drinking_water_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_washroom == VALUE_ONE)
            $("#is_provide_washroom_yes").prop("checked", true);
        else
            $("#is_provide_washroom_no").prop("checked", true);

        if (singleReturnPartDData.is_health_record_maintain == VALUE_ONE)
            $("#is_health_record_maintain_yes").prop("checked", true);
        else
            $("#is_health_record_maintain_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_health_center == VALUE_ONE)
            $("#is_provide_health_center_yes").prop("checked", true);
        else
            $("#is_provide_health_center_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_medical_officer == VALUE_ONE)
            $("#is_provide_medical_officer_yes").prop("checked", true);
        else
            $("#is_provide_medical_officer_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_safe_access == VALUE_ONE)
            $("#is_provide_safe_access_yes").prop("checked", true);
        else
            $("#is_provide_safe_access_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_fire_exits == VALUE_ONE)
            $("#is_provide_fire_exits_yes").prop("checked", true);
        else
            $("#is_provide_fire_exits_no").prop("checked", true);

        if (singleReturnPartDData.is_devices_certified == VALUE_ONE)
            $("#is_devices_certified_yes").prop("checked", true);
        else
            $("#is_devices_certified_no").prop("checked", true);

        if (singleReturnPartDData.is_pressure_vessels_certified == VALUE_ONE)
            $("#is_pressure_vessels_certified_yes").prop("checked", true);
        else
            $("#is_pressure_vessels_certified_no").prop("checked", true);

        if (singleReturnPartDData.is_functioning_safety_committee == VALUE_ONE)
            $("#is_functioning_safety_committee_yes").prop("checked", true);
        else
            $("#is_functioning_safety_committee_no").prop("checked", true);

        if (singleReturnPartDData.is_provision_of_chapteriva == VALUE_ONE)
            $("#is_provision_of_chapteriva_yes").prop("checked", true);
        else
            $("#is_provision_of_chapteriva_no").prop("checked", true);

        if (singleReturnPartDData.is_action_taken == VALUE_ONE)
            $("#is_action_taken_yes").prop("checked", true);
        else
            $("#is_action_taken_no").prop("checked", true);

        if (singleReturnPartDData.is_firstaid_provide == VALUE_ONE)
            $("#is_firstaid_provide_yes").prop("checked", true);
        else
            $("#is_firstaid_provide_no").prop("checked", true);

        if (singleReturnPartDData.is_ambulance_room_provide == VALUE_ONE)
            $("#is_ambulance_room_provide_yes").prop("checked", true);
        else
            $("#is_ambulance_room_provide_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_canteen == VALUE_ONE)
            $("#is_provide_canteen_yes").prop("checked", true);
        else
            $("#is_provide_canteen_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_rest_room == VALUE_ONE)
            $("#is_provide_rest_room_yes").prop("checked", true);
        else
            $("#is_provide_rest_room_no").prop("checked", true);

        if (singleReturnPartDData.is_provide_creche == VALUE_ONE)
            $("#is_provide_creche_yes").prop("checked", true);
        else
            $("#is_provide_creche_no").prop("checked", true);

        if (singleReturnPartDData.is_welfare_officer_apponyed == VALUE_ONE)
            $("#is_welfare_officer_apponyed_yes").prop("checked", true);
        else
            $("#is_welfare_officer_apponyed_no").prop("checked", true);

        if (singleReturnPartDData.is_disply_period_of_work == VALUE_ONE)
            $("#is_disply_period_of_work_yes").prop("checked", true);
        else
            $("#is_disply_period_of_work_no").prop("checked", true);

        if (singleReturnPartDData.is_leave_with_wages == VALUE_ONE)
            $("#is_leave_with_wages_yes").prop("checked", true);
        else
            $("#is_leave_with_wages_no").prop("checked", true);

        if (singleReturnPartDData.is_obtain_fitness_certificate == VALUE_ONE)
            $("#is_obtain_fitness_certificate_yes").prop("checked", true);
        else
            $("#is_obtain_fitness_certificate_no").prop("checked", true);

        if (singleReturnPartDData.is_report_accident == VALUE_ONE)
            $("#is_report_accident_yes").prop("checked", true);
        else
            $("#is_report_accident_no").prop("checked", true);

        if (singleReturnPartDData.dangerous_process_info) {
            var dangerousProcessInfo = JSON.parse(singleReturnPartDData.dangerous_process_info);
            $.each(dangerousProcessInfo, function (key, value) {
                that.addDangerousProcess(value);
            })
        } else {
            that.addDangerousProcess({});
        }

        if (singleReturnPartDData.hazardous_process_info) {
            var hazardousProcessInfo = JSON.parse(singleReturnPartDData.hazardous_process_info);
            $.each(hazardousProcessInfo, function (key, value) {
                that.addHazardousProcess(value);
            })
        } else {
            that.addHazardousProcess({});
        }

        datePicker();
        $('#partd_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partEDetailsForm: function (singleReturnPartEData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partE_details/' + singleReturnPartEData.encrypt_id);
        singleReturnPartEData.VALUE_ONE = VALUE_ONE;
        singleReturnPartEData.VALUE_TWO = VALUE_TWO;
        $('#single_return_form_and_datatable_container').html(partEDetailsSingleReturnFormTemplate(singleReturnPartEData));

        datePicker();
        $('#parte_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partFDetailsForm: function (singleReturnPartFData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partF_details/' + singleReturnPartFData.encrypt_id);
        singleReturnPartFData.VALUE_ONE = VALUE_ONE;
        singleReturnPartFData.VALUE_TWO = VALUE_TWO;
        singleReturnPartFData.is_checked = isChecked;
        $('#single_return_form_and_datatable_container').html(partFDetailsSingleReturnFormTemplate(singleReturnPartFData));
        if (singleReturnPartFData.is_dismissed_service == IS_CHECKED_YES) {
            $('#is_dismissed_service').attr('checked', 'checked');
            this.$('.is_dismissed_service_div').show();
        }
        if (singleReturnPartFData.is_nursing_breaks == VALUE_ONE) {
            $("#is_nursing_breaks_yes").prop("checked", true);
        } else {
            $("#is_nursing_breaks_no").prop("checked", true);
        }
        datePicker();
        $('#partf_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partGDetailsForm: function (singleReturnPartGData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        SingleReturn.router.navigate('partG_details/' + singleReturnPartGData.encrypt_id);
        singleReturnPartGData.VALUE_ONE = VALUE_ONE;
        singleReturnPartGData.VALUE_TWO = VALUE_TWO;
        $('#single_return_form_and_datatable_container').html(partGDetailsSingleReturnFormTemplate(singleReturnPartGData));
        if (singleReturnPartGData.is_surgeon_obtain == VALUE_ONE) {
            $("#is_surgeon_obtain_yes").prop("checked", true);
        } else {
            $("#is_surgeon_obtain_no").prop("checked", true);
        }
        if (singleReturnPartGData.is_handicapped_recuited == VALUE_ONE) {
            $("#is_handicapped_recuited_yes").prop("checked", true);
        } else {
            $("#is_handicapped_recuited_no").prop("checked", true);
        }
        if (singleReturnPartGData.is_record_physically_handicapped == VALUE_ONE) {
            $("#is_record_physically_handicapped_yes").prop("checked", true);
        } else {
            $("#is_record_physically_handicapped_no").prop("checked", true);
        }
        datePicker();
        $('#partg_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    editOrViewSingleReturn: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                //var singleReturnData = parseData.single_return_data;
                // singleReturnData.date_of_approval = dateTo_DD_MM_YYYY(singleReturnData.date_of_approval);
                if (isEdit) {
                    that.newSingleReturnForm(isEdit, parseData);
                } else {
                    that.viewSingleReturnForm(parseData);
                }
            }
        });
    },
    editOrViewPartA: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_parta_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partADetailsForm(parseData.single_return_parta_data);
                } else {
                    that.viewpartADetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartB: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_partb_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partBDetailsForm(parseData.single_return_partb_data);
                } else {
                    that.viewpartBDetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartC: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_partc_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partCDetailsForm(parseData.single_return_partc_data);
                } else {
                    that.viewpartCDetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartD: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_partd_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partDDetailsForm(parseData.single_return_partd_data);
                } else {
                    that.viewpartDDetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartE: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_parte_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partEDetailsForm(parseData.single_return_parte_data);
                } else {
                    that.viewpartEDetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartF: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_partf_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partFDetailsForm(parseData.single_return_partf_data);
                } else {
                    that.viewpartFDetailsForm(parseData);
                }
            }
        });
    },
    editOrViewPartG: function (btnObj, singleReturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_single_return_partg_data_by_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                $('#singlereturn_id').val(parseData.encrypt_id);

                if (isEdit) {
                    that.partGDetailsForm(parseData.single_return_partg_data);
                } else {
                    that.viewpartGDetailsForm(parseData);
                }
            }
        });
    },
    viewSingleReturnForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        //templateData.singleReturn_data = singleReturnData;
        $('#single_return_form_and_datatable_container').html(singleReturnViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
    },
    viewpartADetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_parta_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartAViewTemplate(formData));

    },
    viewpartBDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_partb_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartBViewTemplate(formData));

    },
    viewpartCDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_partc_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartCViewTemplate(formData));

        if (formData.is_paid_weekly_holiday == VALUE_ONE)
            $("#is_paid_weekly_holiday_yes").prop("checked", true);
        else
            $("#is_paid_weekly_holiday_no").prop("checked", true);

        if (formData.is_provide_canteen == VALUE_ONE)
            $("#is_provide_canteen_yes").prop("checked", true);
        else
            $("#is_provide_canteen_no").prop("checked", true);

        if (formData.is_provide_restroom == VALUE_ONE)
            $("#is_provide_restroom_yes").prop("checked", true);
        else
            $("#is_provide_restroom_no").prop("checked", true);

        if (formData.is_provide_drinking_water == VALUE_ONE)
            $("#is_provide_drinking_water_yes").prop("checked", true);
        else
            $("#is_provide_drinking_water_no").prop("checked", true);

        if (formData.is_provide_creches == VALUE_ONE)
            $("#is_provide_creches_yes").prop("checked", true);
        else
            $("#is_provide_creches_no").prop("checked", true);

        if (formData.is_provide_firstaid == VALUE_ONE)
            $("#is_provide_firstaid_yes").prop("checked", true);
        else
            $("#is_provide_firstaid_no").prop("checked", true);

    },
    viewpartDDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_partd_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartDViewTemplate(formData));

        $('#sector').val(formData.sector);
        $('#registration_section').val(formData.registration_section);
        $('#canteen_managed_by').val(formData.canteen_managed_by);
        $('#retainer_ship').val(formData.retainer_ship);

        if (formData.is_provide_washroom == '1') {
            this.$('.is_provide_washroom_div').show();
        }

        if (formData.is_provide_medical_officer == '1') {
            this.$('.is_provide_medical_officer_div').show();
        }
        if (formData.is_dust_generated == VALUE_ONE)
            $("#is_dust_generated_yes").prop("checked", true);
        else
            $("#is_dust_generated_no").prop("checked", true);

        if (formData.is_provide_drinking_water == VALUE_ONE)
            $("#is_provide_drinking_water_yes").prop("checked", true);
        else
            $("#is_provide_drinking_water_no").prop("checked", true);

        if (formData.is_provide_washroom == VALUE_ONE)
            $("#is_provide_washroom_yes").prop("checked", true);
        else
            $("#is_provide_washroom_no").prop("checked", true);

        if (formData.is_health_record_maintain == VALUE_ONE)
            $("#is_health_record_maintain_yes").prop("checked", true);
        else
            $("#is_health_record_maintain_no").prop("checked", true);

        if (formData.is_provide_health_center == VALUE_ONE)
            $("#is_provide_health_center_yes").prop("checked", true);
        else
            $("#is_provide_health_center_no").prop("checked", true);

        if (formData.is_provide_medical_officer == VALUE_ONE)
            $("#is_provide_medical_officer_yes").prop("checked", true);
        else
            $("#is_provide_medical_officer_no").prop("checked", true);

        if (formData.is_provide_safe_access == VALUE_ONE)
            $("#is_provide_safe_access_yes").prop("checked", true);
        else
            $("#is_provide_safe_access_no").prop("checked", true);

        if (formData.is_provide_fire_exits == VALUE_ONE)
            $("#is_provide_fire_exits_yes").prop("checked", true);
        else
            $("#is_provide_fire_exits_no").prop("checked", true);

        if (formData.is_devices_certified == VALUE_ONE)
            $("#is_devices_certified_yes").prop("checked", true);
        else
            $("#is_devices_certified_no").prop("checked", true);

        if (formData.is_pressure_vessels_certified == VALUE_ONE)
            $("#is_pressure_vessels_certified_yes").prop("checked", true);
        else
            $("#is_pressure_vessels_certified_no").prop("checked", true);

        if (formData.is_functioning_safety_committee == VALUE_ONE)
            $("#is_functioning_safety_committee_yes").prop("checked", true);
        else
            $("#is_functioning_safety_committee_no").prop("checked", true);

        if (formData.is_provision_of_chapteriva == VALUE_ONE)
            $("#is_provision_of_chapteriva_yes").prop("checked", true);
        else
            $("#is_provision_of_chapteriva_no").prop("checked", true);

        if (formData.is_action_taken == VALUE_ONE)
            $("#is_action_taken_yes").prop("checked", true);
        else
            $("#is_action_taken_no").prop("checked", true);

        if (formData.is_firstaid_provide == VALUE_ONE)
            $("#is_firstaid_provide_yes").prop("checked", true);
        else
            $("#is_firstaid_provide_no").prop("checked", true);

        if (formData.is_ambulance_room_provide == VALUE_ONE)
            $("#is_ambulance_room_provide_yes").prop("checked", true);
        else
            $("#is_ambulance_room_provide_no").prop("checked", true);

        if (formData.is_provide_canteen == VALUE_ONE)
            $("#is_provide_canteen_yes").prop("checked", true);
        else
            $("#is_provide_canteen_no").prop("checked", true);

        if (formData.is_provide_rest_room == VALUE_ONE)
            $("#is_provide_rest_room_yes").prop("checked", true);
        else
            $("#is_provide_rest_room_no").prop("checked", true);

        if (formData.is_provide_creche == VALUE_ONE)
            $("#is_provide_creche_yes").prop("checked", true);
        else
            $("#is_provide_creche_no").prop("checked", true);

        if (formData.is_welfare_officer_apponyed == VALUE_ONE)
            $("#is_welfare_officer_apponyed_yes").prop("checked", true);
        else
            $("#is_welfare_officer_apponyed_no").prop("checked", true);

        if (formData.is_disply_period_of_work == VALUE_ONE)
            $("#is_disply_period_of_work_yes").prop("checked", true);
        else
            $("#is_disply_period_of_work_no").prop("checked", true);

        if (formData.is_leave_with_wages == VALUE_ONE)
            $("#is_leave_with_wages_yes").prop("checked", true);
        else
            $("#is_leave_with_wages_no").prop("checked", true);

        if (formData.is_obtain_fitness_certificate == VALUE_ONE)
            $("#is_obtain_fitness_certificate_yes").prop("checked", true);
        else
            $("#is_obtain_fitness_certificate_no").prop("checked", true);

        if (formData.is_report_accident == VALUE_ONE)
            $("#is_report_accident_yes").prop("checked", true);
        else
            $("#is_report_accident_no").prop("checked", true);

        if (formData.dangerous_process_info) {
            var dangerousProcessInfo = JSON.parse(formData.dangerous_process_info);
            $.each(dangerousProcessInfo, function (key, value) {
                that.addDangerousProcess(value);
            })
        }

        if (formData.hazardous_process_info) {
            var hazardousProcessInfo = JSON.parse(formData.hazardous_process_info);
            $.each(hazardousProcessInfo, function (key, value) {
                that.addHazardousProcess(value);
            })
        }

    },
    viewpartEDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_parte_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartEViewTemplate(formData));

    },
    viewpartFDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_partf_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartFViewTemplate(formData));
        if (formData.is_dismissed_service == IS_CHECKED_YES) {
            $('#is_dismissed_service').attr('checked', 'checked');
            this.$('.is_dismissed_service_div').show();
        }
        if (formData.is_nursing_breaks == VALUE_ONE) {
            $("#is_nursing_breaks_yes").prop("checked", true);
        } else {
            $("#is_nursing_breaks_no").prop("checked", true);
        }

    },
    viewpartGDetailsForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var formData = parseData.single_return_partg_data;
        SingleReturn.router.navigate('view_singlereturn_form');
        $('#single_return_form_and_datatable_container').html(singleReturnPartGViewTemplate(formData));
        if (formData.is_surgeon_obtain == VALUE_ONE) {
            $("#is_surgeon_obtain_yes").prop("checked", true);
        } else {
            $("#is_surgeon_obtain_no").prop("checked", true);
        }
        if (formData.is_handicapped_recuited == VALUE_ONE) {
            $("#is_handicapped_recuited_yes").prop("checked", true);
        } else {
            $("#is_handicapped_recuited_no").prop("checked", true);
        }
        if (formData.is_record_physically_handicapped == VALUE_ONE) {
            $("#is_record_physically_handicapped_yes").prop("checked", true);
        } else {
            $("#is_record_physically_handicapped_no").prop("checked", true);
        }

    },
    checkValidationForSingleReturn: function (singleReturnData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!singleReturnData.esta_name) {
            return getBasicMessageAndFieldJSONArray('esta_name', factoryNameValidationMessage);
        }
        if (!singleReturnData.esta_address) {
            return getBasicMessageAndFieldJSONArray('esta_address', factoryAddressValidationMessage);
        }
        if (!singleReturnData.esta_tel_no) {
            return getBasicMessageAndFieldJSONArray('esta_tel_no', telNoValidationMessage);
        }
        if (!singleReturnData.esta_mob_no) {
            return getBasicMessageAndFieldJSONArray('esta_mob_no', mobileValidationMessage);
        }
        if (!singleReturnData.esta_fax_no) {
            return getBasicMessageAndFieldJSONArray('esta_fax_no', faxNoValidationMessage);
        }
        if (!singleReturnData.esta_email_id) {
            return getBasicMessageAndFieldJSONArray('esta_email_id', emailValidationMessage);
        }
        if (!singleReturnData.emp_name) {
            return getBasicMessageAndFieldJSONArray('emp_name', empNameValidationMessage);
        }
        if (!singleReturnData.emp_address) {
            return getBasicMessageAndFieldJSONArray('emp_address', empAddressValidationMessage);
        }
        if (!singleReturnData.emp_tel_no) {
            return getBasicMessageAndFieldJSONArray('emp_tel_no', telNoValidationMessage);
        }
        if (!singleReturnData.emp_mob_no) {
            return getBasicMessageAndFieldJSONArray('emp_mob_no', mobileValidationMessage);
        }
        if (!singleReturnData.emp_fax_no) {
            return getBasicMessageAndFieldJSONArray('emp_fax_no', faxNoValidationMessage);
        }
        if (!singleReturnData.emp_email_id) {
            return getBasicMessageAndFieldJSONArray('emp_email_id', emailValidationMessage);
        }
        if (!singleReturnData.manager_name) {
            return getBasicMessageAndFieldJSONArray('manager_name', managerPersonNameValidationMessage);
        }
        if (!singleReturnData.manager_address) {
            return getBasicMessageAndFieldJSONArray('manager_address', managerPersonAddressValidationMessage);
        }
        if (!singleReturnData.manager_tel_no) {
            return getBasicMessageAndFieldJSONArray('manager_tel_no', telNoValidationMessage);
        }
        if (!singleReturnData.manager_mob_no) {
            return getBasicMessageAndFieldJSONArray('manager_mob_no', mobileValidationMessage);
        }
        if (!singleReturnData.manager_fax_no) {
            return getBasicMessageAndFieldJSONArray('manager_fax_no', faxNoValidationMessage);
        }
        if (!singleReturnData.manager_email_id) {
            return getBasicMessageAndFieldJSONArray('manager_email_id', emailValidationMessage);
        }
        if (!singleReturnData.registration_no) {
            return getBasicMessageAndFieldJSONArray('registration_no', registrationNoValidationMessage);
        }
        if (!singleReturnData.license_no) {
            return getBasicMessageAndFieldJSONArray('license_no', licenseNoValidationMessage);
        }
        if (!singleReturnData.commencement_date) {
            return getBasicMessageAndFieldJSONArray('commencement_date', commencementsDateValidationMessage);
        }
        if (!singleReturnData.industry_nature) {
            return getBasicMessageAndFieldJSONArray('industry_nature', industryNatureValidationMessage);
        }
        if (!singleReturnData.direct_unskilled) {
            return getBasicMessageAndFieldJSONArray('direct_unskilled', directUnskilledValidationMessage);
        }
        if (!singleReturnData.direct_semiskilled) {
            return getBasicMessageAndFieldJSONArray('direct_semiskilled', directSemiskilledValidationMessage);
        }
        if (!singleReturnData.direct_skilled) {
            return getBasicMessageAndFieldJSONArray('direct_skilled', directSkilledValidationMessage);
        }
        if (!singleReturnData.direct_total) {
            return getBasicMessageAndFieldJSONArray('direct_total', directTotalValidationMessage);
        }
        if (!singleReturnData.direct_male) {
            return getBasicMessageAndFieldJSONArray('direct_male', directMaleValidationMessage);
        }
        if (!singleReturnData.direct_female) {
            return getBasicMessageAndFieldJSONArray('direct_female', directFemaleValidationMessage);
        }
        if (!singleReturnData.contractor_unskilled) {
            return getBasicMessageAndFieldJSONArray('contractor_unskilled', contractorUnskilledValidationMessage);
        }
        if (!singleReturnData.contractor_semiskilled) {
            return getBasicMessageAndFieldJSONArray('contractor_semiskilled', contractorSemiskilledValidationMessage);
        }
        if (!singleReturnData.contractor_skilled) {
            return getBasicMessageAndFieldJSONArray('contractor_skilled', contractorSkilledValidationMessage);
        }
        if (!singleReturnData.contractor_total) {
            return getBasicMessageAndFieldJSONArray('contractor_total', contractorTotalValidationMessage);
        }
        if (!singleReturnData.contractor_male) {
            return getBasicMessageAndFieldJSONArray('contractor_male', contractorMaleValidationMessage);
        }
        if (!singleReturnData.contractor_female) {
            return getBasicMessageAndFieldJSONArray('contractor_female', contractorFemaleValidationMessage);
        }
        if (!singleReturnData.total_unskilled) {
            return getBasicMessageAndFieldJSONArray('total_unskilled', totalUnskilledValidationMessage);
        }
        if (!singleReturnData.total_semiskilled) {
            return getBasicMessageAndFieldJSONArray('total_semiskilled', totalSemiskilledValidationMessage);
        }
        if (!singleReturnData.total_skilled) {
            return getBasicMessageAndFieldJSONArray('total_skilled', totalSkilledValidationMessage);
        }
        if (!singleReturnData.total_total) {
            return getBasicMessageAndFieldJSONArray('total_total', totalTotalValidationMessage);
        }
        if (!singleReturnData.total_male) {
            return getBasicMessageAndFieldJSONArray('total_male', totalMaleValidationMessage);
        }
        if (!singleReturnData.total_female) {
            return getBasicMessageAndFieldJSONArray('total_female', totalFemaleValidationMessage);
        }

        return '';
    },
    submitSingleReturn: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnData = $('#single_return_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturn(singleReturnData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_single_return');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnData = new FormData($('#single_return_form')[0]);
        singleReturnData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return',
            data: singleReturnData,
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
                validationMessageShow('single-return', textStatus.statusText);
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
                    validationMessageShow('single-return', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partADetailsForm(parseData.singlereturn_parta_data);
            }
        });
    },
    checkValidationForSingleReturnPartA: function (singleReturnPartAData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartAData.worked_days) {
            return getBasicMessageAndFieldJSONArray('worked_days', workedDaysValidationMessage);
        }
        if (!singleReturnPartAData.man_worked_days) {
            return getBasicMessageAndFieldJSONArray('man_worked_days', manWorkedDaysValidationMessage);
        }
        if (!singleReturnPartAData.average_emp) {
            return getBasicMessageAndFieldJSONArray('average_emp', averageEmpValidationMessage);
        }
        if (!singleReturnPartAData.male_wages) {
            return getBasicMessageAndFieldJSONArray('male_wages', maleWagesValidationMessage);
        }
        if (!singleReturnPartAData.female_wages) {
            return getBasicMessageAndFieldJSONArray('female_wages', femaleWagesValidationMessage);
        }
        // if (!singleReturnPartAData.total_fine) {
        //     return getBasicMessageAndFieldJSONArray('total_fine', totalFineValidationMessage);
        // }
        // if (!singleReturnPartAData.deduction) {
        //     return getBasicMessageAndFieldJSONArray('deduction', deductionValidationMessage);
        // }

        return '';
    },
    submitPartADetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartAData = $('#single_return_parta_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartA(singleReturnPartAData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_parta_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartAData = new FormData($('#single_return_parta_form')[0]);
        singleReturnPartAData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartAData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_parta',
            data: singleReturnPartAData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partBDetailsForm(parseData.singlereturn_partb_data);
            }
        });
    },
    checkValidationForSingleReturnPartB: function (singleReturnPartBData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartBData.percentage_of_bonus) {
            return getBasicMessageAndFieldJSONArray('percentage_of_bonus', percentageBonusValidationMessage);
        }
        if (!singleReturnPartBData.no_of_baneficiaries) {
            return getBasicMessageAndFieldJSONArray('no_of_baneficiaries', noOfBeneficiariesValidationMessage);
        }
        if (!singleReturnPartBData.total_bonus_paid) {
            return getBasicMessageAndFieldJSONArray('total_bonus_paid', bonusPaidValidationMessage);
        }
        if (!singleReturnPartBData.payment_date) {
            return getBasicMessageAndFieldJSONArray('payment_date', paymentDateValidationMessage);
        }
        // if (!singleReturnPartBData.not_paid_reason) {
        //     return getBasicMessageAndFieldJSONArray('not_paid_reason', bonusReasonValidationMessage);
        // }

        return '';
    },
    submitPartBDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartBData = $('#single_return_partb_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartB(singleReturnPartBData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_partb_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartBData = new FormData($('#single_return_partb_form')[0]);
        singleReturnPartBData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartBData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_partb',
            data: singleReturnPartBData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partCDetailsForm(parseData.singlereturn_partc_data);
            }
        });
    },
    checkValidationForSingleReturnPartC: function (singleReturnPartCData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartCData.contractor_name) {
            return getBasicMessageAndFieldJSONArray('contractor_name', contractorNameValidationMessage);
        }
        if (!singleReturnPartCData.contractor_address) {
            return getBasicMessageAndFieldJSONArray('contractor_address', contractorAddressValidationMessage);
        }
        if (!singleReturnPartCData.contractor_nature) {
            return getBasicMessageAndFieldJSONArray('contractor_nature', contractorNatureValidationMessage);
        }
        if (!singleReturnPartCData.total_employed_labour) {
            return getBasicMessageAndFieldJSONArray('total_employed_labour', employedLabourValidationMessage);
        }
        if (!singleReturnPartCData.total_worked_days_by_labour) {
            return getBasicMessageAndFieldJSONArray('total_worked_days_by_labour', labourWorkedDaysValidationMessage);
        }
        if (!singleReturnPartCData.total_employed_direct_labour) {
            return getBasicMessageAndFieldJSONArray('total_employed_direct_labour', employedDirectLabourValidationMessage);
        }
        if (!singleReturnPartCData.total_worked_days_by_direct_labour) {
            return getBasicMessageAndFieldJSONArray('total_worked_days_by_direct_labour', directLabouWOrkedDaysValidationMessage);
        }
        // if (!singleReturnPartCData.change_management_details) {
        //     return getBasicMessageAndFieldJSONArray('change_management_details', changeManagementDetailsValidationMessage);
        // }
        if (!singleReturnPartCData.duration_of_contract) {
            return getBasicMessageAndFieldJSONArray('duration_of_contract', contractDurationValidationMessage);
        }
        if (!singleReturnPartCData.no_of_contract_labour) {
            return getBasicMessageAndFieldJSONArray('no_of_contract_labour', contractLanourValidationMessage);
        }
        if (!singleReturnPartCData.working_hours) {
            return getBasicMessageAndFieldJSONArray('working_hours', workHoursValidationMessage);
        }
        if (!singleReturnPartCData.overtime_work) {
            return getBasicMessageAndFieldJSONArray('overtime_work', overtimeWorkDaysValidationMessage);
        }
        if (!singleReturnPartCData.weekly_holiday) {
            return getBasicMessageAndFieldJSONArray('weekly_holiday', weeklyHolidayValidationMessage);
        }
        if (!singleReturnPartCData.spread_over) {
            return getBasicMessageAndFieldJSONArray('spread_over', spreadOverValidationMessage);
        }
        if (!singleReturnPartCData.male_worked_days) {
            return getBasicMessageAndFieldJSONArray('male_worked_days', maleWOrkedDaysValidationMessage);
        }
        if (!singleReturnPartCData.female_worked_days) {
            return getBasicMessageAndFieldJSONArray('female_worked_days', femaleWOrkedDaysValidationMessage);
        }
        if (!singleReturnPartCData.total_worked_days) {
            return getBasicMessageAndFieldJSONArray('total_worked_days', totalWOrkedDaysValidationMessage);
        }
        if (!singleReturnPartCData.paid_amount) {
            return getBasicMessageAndFieldJSONArray('paid_amount', paidAmountValidationMessage);
        }
        if (!singleReturnPartCData.amount_deduction) {
            return getBasicMessageAndFieldJSONArray('amount_deduction', amountDeductionValidationMessage);
        }

        return '';
    },
    submitPartCDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartCData = $('#single_return_partc_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartC(singleReturnPartCData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_partc_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartCData = new FormData($('#single_return_partc_form')[0]);
        singleReturnPartCData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartCData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_partc',
            data: singleReturnPartCData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partDDetailsForm(parseData.singlereturn_partd_data);
            }
        });
    },
    checkValidationForSingleReturnPartD: function (singleReturnPartDData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartDData.fin) {
            return getBasicMessageAndFieldJSONArray('fin', finValidationMessage);
        }
        if (!singleReturnPartDData.nic_code) {
            return getBasicMessageAndFieldJSONArray('nic_code', nicCodeValidationMessage);
        }
        if (!singleReturnPartDData.sector) {
            return getBasicMessageAndFieldJSONArray('sector', sectorValidationMessage);
        }
        if (!singleReturnPartDData.registration_section) {
            return getBasicMessageAndFieldJSONArray('registration_section', registrationSectionValidationMessage);
        }
        if (!singleReturnPartDData.registration_no) {
            return getBasicMessageAndFieldJSONArray('registration_no', registrationNumberValidationMessage);
        }
        if (!singleReturnPartDData.license_no) {
            return getBasicMessageAndFieldJSONArray('license_no', licenseNumberValidationMessage);
        }
        if (!singleReturnPartDData.license_workers) {
            return getBasicMessageAndFieldJSONArray('license_workers', licenseWorkerValidationMessage);
        }
        if (!singleReturnPartDData.license_hp) {
            return getBasicMessageAndFieldJSONArray('license_hp', licensehpValidationMessage);
        }
        if (!singleReturnPartDData.license_renewal_year) {
            return getBasicMessageAndFieldJSONArray('license_renewal_year', licenseRenewalYearValidationMessage);
        }
        if (!singleReturnPartDData.license_submitted_year) {
            return getBasicMessageAndFieldJSONArray('license_submitted_year', licenseSubmitYearValidationMessage);
        }
        if (!singleReturnPartDData.plan_approval_no) {
            return getBasicMessageAndFieldJSONArray('plan_approval_no', planApprovalNumberValidationMessage);
        }
        if (!singleReturnPartDData.plan_approval_date) {
            return getBasicMessageAndFieldJSONArray('plan_approval_date', planApprovalDateValidationMessage);
        }
        if (!singleReturnPartDData.certificate_obtain_on_date) {
            return getBasicMessageAndFieldJSONArray('certificate_obtain_on_date', certificateObtainDateValidationMessage);
        }
        if (!singleReturnPartDData.certificate_submitted_on_date) {
            return getBasicMessageAndFieldJSONArray('certificate_submitted_on_date', certificateSubmitDateValidationMessage);
        }
        if (!singleReturnPartDData.finished_product) {
            return getBasicMessageAndFieldJSONArray('finished_product', finishedProductValidationMessage);
        }
        if (!singleReturnPartDData.intermediates) {
            return getBasicMessageAndFieldJSONArray('intermediates', intermediatesValidationMessage);
        }
        if (!singleReturnPartDData.raw_materials) {
            return getBasicMessageAndFieldJSONArray('raw_materials', rawMaterialValidationMessage);
        }
        if (!singleReturnPartDData.male_average_workers) {
            return getBasicMessageAndFieldJSONArray('male_average_workers', malAverageWorkersValidationMessage);
        }
        if (!singleReturnPartDData.female_average_workers) {
            return getBasicMessageAndFieldJSONArray('female_average_workers', femalAverageWorkersValidationMessage);
        }
        if (!singleReturnPartDData.factory_worked_days) {
            return getBasicMessageAndFieldJSONArray('factory_worked_days', factoryWorkedDaysValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_worked_days) {
            return getBasicMessageAndFieldJSONArray('adult_men_worked_days', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_worked_days) {
            return getBasicMessageAndFieldJSONArray('adult_women_worked_days', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_worked_days) {
            return getBasicMessageAndFieldJSONArray('adult_total_worked_days', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_worked_days) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_worked_days', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_worked_days) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_worked_days', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_worked_days) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_worked_days', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adult_men_workers_employed', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adult_women_workers_employed', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adult_total_workers_employed', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_workers_employed', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_workers_employed', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_workers_employed', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_work_hours) {
            return getBasicMessageAndFieldJSONArray('adult_men_work_hours', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_work_hours) {
            return getBasicMessageAndFieldJSONArray('adult_women_work_hours', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_work_hours) {
            return getBasicMessageAndFieldJSONArray('adult_total_work_hours', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_work_hours) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_work_hours', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_work_hours) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_work_hours', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_work_hours) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_work_hours', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.no_of_hyginists_employed) {
            return getBasicMessageAndFieldJSONArray('no_of_hyginists_employed', hyginistsEmployedValidationMessage);
        }
        if (!singleReturnPartDData.safety_provision) {
            return getBasicMessageAndFieldJSONArray('safety_provision', safetyProvisionValidationMessage);
        }
        if (!singleReturnPartDData.fighting_equipments_details) {
            return getBasicMessageAndFieldJSONArray('fighting_equipments_details', fightingEuipmentsValidationMessage);
        }
        // if (!singleReturnPartDData.personal_equipments_details) {
        //     return getBasicMessageAndFieldJSONArray('personal_equipments_details', personalequipmentsValidationMessage);
        // }
        if (!singleReturnPartDData.safety_officers_detail) {
            return getBasicMessageAndFieldJSONArray('safety_officers_detail', safetyOfficerValidationMessage);
        }
        if (!singleReturnPartDData.no_of_safety_programs) {
            return getBasicMessageAndFieldJSONArray('no_of_safety_programs', safetyProgramsValidationMessage);
        }
        if (!singleReturnPartDData.no_of_worker_trained) {
            return getBasicMessageAndFieldJSONArray('no_of_worker_trained', workerTrainedValidationMessage);
        }

        if (!singleReturnPartDData.amended_date) {
            return getBasicMessageAndFieldJSONArray('amended_date', amendedDateValidationMessage);
        }
        if (!singleReturnPartDData.rehearsals_date) {
            return getBasicMessageAndFieldJSONArray('rehearsals_date', rehearsalsDateValidationMessage);
        }
        // if (!singleReturnPartDData.safety_policy_detail) {
        //     return getBasicMessageAndFieldJSONArray('safety_policy_detail', safetyPolicyValidationMessage);
        // }
        if (!singleReturnPartDData.canteen_managed_by) {
            return getBasicMessageAndFieldJSONArray('canteen_managed_by', cateenManagedByValidationMessage);
        }
        if (!singleReturnPartDData.working_hours_for_adults) {
            return getBasicMessageAndFieldJSONArray('working_hours_for_adults', workingHoursValidationMessage);
        }
        if (!singleReturnPartDData.working_hours_for_women) {
            return getBasicMessageAndFieldJSONArray('working_hours_for_women', workingHoursValidationMessage);
        }
        if (!singleReturnPartDData.no_of_worker_dismissed) {
            return getBasicMessageAndFieldJSONArray('no_of_worker_dismissed', workerDismissedValidationMessage);
        }
        if (!singleReturnPartDData.no_of_paid_leave_worker) {
            return getBasicMessageAndFieldJSONArray('no_of_paid_leave_worker', workingHoursValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adult_men_workers_employed_year', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adult_women_workers_employed_year', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adult_total_workers_employed_year', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_workers_employed_year', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_workers_employed_year', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_workers_employed_year) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_workers_employed_year', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_men_leave_with_wages', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_women_leave_with_wages', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_total_leave_with_wages', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_leave_with_wages', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_leave_with_wages', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_leave_with_wages', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.adult_men_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_men_annual_leave_with_wages', adultMenValidationMessage);
        }
        if (!singleReturnPartDData.adult_women_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_women_annual_leave_with_wages', adultWomenValidationMessage);
        }
        if (!singleReturnPartDData.adult_total_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adult_total_annual_leave_with_wages', adultTotalValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_men_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_men_annual_leave_with_wages', adolescentMenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_women_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_women_annual_leave_with_wages', adolescentWomenValidationMessage);
        }
        if (!singleReturnPartDData.adolescent_total_annual_leave_with_wages) {
            return getBasicMessageAndFieldJSONArray('adolescent_total_annual_leave_with_wages', adolescentTotalValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_major_accidents) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_major_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_major_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_major_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_major_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_major_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_major_accidents) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_major_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_major_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_major_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_major_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_major_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_major_accidents_killed_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_major_accidents_killed_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_major_accidents_killed_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_major_accidents_killed_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nondangerous_accidents) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nondangerous_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nondangerous_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nondangerous_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nondangerous_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nondangerous_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nondangerous_accidents) {
            return getBasicMessageAndFieldJSONArray('fatal_nondangerous_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nondangerous_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_nondangerous_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nondangerous_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_nondangerous_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nondangerous_accidents_killed_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_nondangerous_accidents_killed_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nondangerous_accidents_killed_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_nondangerous_accidents_killed_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_accidents) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_dangerous_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_dangerous_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_accidents) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_accidents_killed_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_accidents_killed_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_dangerous_accidents_killed_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_dangerous_accidents_killed_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_major_accidents) {
            return getBasicMessageAndFieldJSONArray('nonfatal_major_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_major_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_major_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_major_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_major_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_major_accidents) {
            return getBasicMessageAndFieldJSONArray('fatal_major_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_major_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_major_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_major_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_major_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_major_accidents_killed_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_major_accidents_killed_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_major_accidents_killed_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_major_accidents_killed_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nonmajor_accidents) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nonmajor_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nonmajor_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nonmajor_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.nonfatal_nonmajor_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('nonfatal_nonmajor_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nonmajor_accidents) {
            return getBasicMessageAndFieldJSONArray('fatal_nonmajor_accidents', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nonmajor_accidents_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_nonmajor_accidents_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nonmajor_accidents_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_nonmajor_accidents_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nonmajor_accidents_killed_inside) {
            return getBasicMessageAndFieldJSONArray('fatal_nonmajor_accidents_killed_inside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.fatal_nonmajor_accidents_killed_outside) {
            return getBasicMessageAndFieldJSONArray('fatal_nonmajor_accidents_killed_outside', accidentsOccurrencesValidationMessage);
        }
        if (!singleReturnPartDData.hazardous_accidents) {
            return getBasicMessageAndFieldJSONArray('hazardous_accidents', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.hazardous_fatal_injured) {
            return getBasicMessageAndFieldJSONArray('hazardous_fatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.hazardous_nonfatal_injured) {
            return getBasicMessageAndFieldJSONArray('hazardous_nonfatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.dangerous_accidents) {
            return getBasicMessageAndFieldJSONArray('dangerous_accidents', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.dangerous_fatal_injured) {
            return getBasicMessageAndFieldJSONArray('dangerous_fatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.dangerous_nonfatal_injured) {
            return getBasicMessageAndFieldJSONArray('dangerous_nonfatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.other_accidents) {
            return getBasicMessageAndFieldJSONArray('other_accidents', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.other_fatal_injured) {
            return getBasicMessageAndFieldJSONArray('other_fatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.other_nonfatal_injured) {
            return getBasicMessageAndFieldJSONArray('other_nonfatal_injured', injuriesOccurringValidationMessage);
        }
        if (!singleReturnPartDData.no_of_non_fatal_injuries) {
            return getBasicMessageAndFieldJSONArray('no_of_non_fatal_injuries', fatalinjuriesValidationMessage);
        }
        if (!singleReturnPartDData.no_of_non_fatal_lost_injuries) {
            return getBasicMessageAndFieldJSONArray('no_of_non_fatal_lost_injuries', nonFatalinjuriesValidationMessage);
        }
        if (!singleReturnPartDData.no_of_return_non_fatal_injuries) {
            return getBasicMessageAndFieldJSONArray('no_of_return_non_fatal_injuries', returnNonFatalinjuriesValidationMessage);
        }
        if (!singleReturnPartDData.no_of_return_non_fatal_lost_injuries) {
            return getBasicMessageAndFieldJSONArray('no_of_return_non_fatal_lost_injuries', returnNonFatalLostinjuriesValidationMessage);
        }
        if (singleReturnPartDData.is_provide_washroom == isChecked) {
            if (!singleReturnPartDData.washroom_for_men) {
                return getBasicMessageAndFieldJSONArray('washroom_for_men', noOfWashroomValidationMessage);
            }
            if (!singleReturnPartDData.washroom_for_women) {
                return getBasicMessageAndFieldJSONArray('washroom_for_women', noOfWashroomValidationMessage);
            }
        }
        if (singleReturnPartDData.is_provide_medical_officer == isChecked) {
            if (!singleReturnPartDData.retainer_ship) {
                return getBasicMessageAndFieldJSONArray('retainer_ship', retainerShipValidationValidationMessage);
            }
        }

        return '';
    },
    submitPartDDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartDData = $('#single_return_partd_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartD(singleReturnPartDData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }

        var dangerousProcessInfoItem = [];
        var hazardousProcessInfoItem = [];
        var dangerousProcessInfoValidation = false;
        var hazardousProcessInfoValidation = false;
        $('.dangerous_process_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var dangerousProcessItem = {};
            var processName = $('#process_name_' + cnt).val();

            if (processName == '' || processName == null) {
                $('#process_name_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, processNameValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.process_name = processName;

            var employedPerson = $('#employed_person_' + cnt).val();

            if (employedPerson == '' || employedPerson == null) {
                $('#employed_person_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, employedPersonValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.employed_person = employedPerson;

            var examinedMale = $('#examined_male_' + cnt).val();
            if (examinedMale == '' || examinedMale == null) {
                $('#examined_male_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, examinedMaleValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.examined_male = examinedMale;

            var examinedFemale = $('#examined_female_' + cnt).val();
            if (examinedFemale == '' || examinedFemale == null) {
                $('#examined_female_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, examinedFemaleValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.examined_female = examinedFemale;

            var unfitMale = $('#unfit_male_' + cnt).val();
            if (unfitMale == '' || unfitMale == null) {
                $('#unfit_male_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, unfitMaleValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.unfit_male = unfitMale;

            var unfitFemale = $('#unfit_female_' + cnt).val();
            if (unfitFemale == '' || unfitFemale == null) {
                $('#unfit_female_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, unfitFemaleValidationMessage);
                dangerousProcessInfoValidation = true;
                return false;
            }
            dangerousProcessItem.unfit_female = unfitFemale;
            dangerousProcessInfoItem.push(dangerousProcessItem);
        });


        $('.hazardous_process_info').each(function () {
            var cnt = $(this).find('.temp_cnt2').val();
            var hazardousProcessItem = {};
            var hzprocessName = $('#hz_process_name_' + cnt).val();
            if (hzprocessName == '' || hzprocessName == null) {
                $('#hz_process_name_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, processNameValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_process_name = hzprocessName;

            var hzemployedPerson = $('#hz_employed_person_' + cnt).val();
            if (hzemployedPerson == '' || hzemployedPerson == null) {
                $('#hz_employed_person_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, employedPersonValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_employed_person = hzemployedPerson;

            var hzexaminedMale = $('#hz_examined_male_' + cnt).val();
            if (hzexaminedMale == '' || hzexaminedMale == null) {
                $('#hz_examined_male_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, examinedMaleValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_examined_male = hzexaminedMale;

            var hzexaminedFemale = $('#hz_examined_female_' + cnt).val();
            if (hzexaminedFemale == '' || hzexaminedFemale == null) {
                $('#hz_examined_female_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, examinedFemaleValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_examined_female = hzexaminedFemale;

            var hzunfitMale = $('#hz_unfit_male_' + cnt).val();
            if (hzunfitMale == '' || hzunfitMale == null) {
                $('#hz_unfit_male_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, unfitMaleValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_unfit_male = hzunfitMale;

            var hzunfitFemale = $('#hz_unfit_female_' + cnt).val();
            if (hzunfitFemale == '' || hzunfitFemale == null) {
                $('#hz_unfit_female_' + cnt).focus();
                validationMessageShow('single-return-' + cnt, unfitFemaleValidationMessage);
                hazardousProcessInfoValidation = true;
                return false;
            }
            hazardousProcessItem.hz_unfit_female = hzunfitFemale;
            hazardousProcessInfoItem.push(hazardousProcessItem);
        });

        if (dangerousProcessInfoValidation) {
            return false;
        }
        if (hazardousProcessInfoValidation) {
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_partd_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartDData = new FormData($('#single_return_partd_form')[0]);
        singleReturnPartDData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartDData.append("module_type", moduleType);
        singleReturnPartDData.append("dangerous_data", JSON.stringify(dangerousProcessInfoItem));
        singleReturnPartDData.append("hazardous_data", JSON.stringify(hazardousProcessInfoItem));

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_partd',
            data: singleReturnPartDData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partEDetailsForm(parseData.singlereturn_parte_data);
            }
        });
    },
    checkValidationForSingleReturnPartE: function (singleReturnPartEData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartEData.respect_of_fines) {
            return getBasicMessageAndFieldJSONArray('respect_of_fines', respectOfFinesValidationMessage);
        }
        if (!singleReturnPartEData.adult_worked_days) {
            return getBasicMessageAndFieldJSONArray('adult_worked_days', adultsWorkedDaysValidationMessage);
        }
        if (!singleReturnPartEData.young_person_worked_days) {
            return getBasicMessageAndFieldJSONArray('young_person_worked_days', youngPersonWorkedDaysValidationMessage);
        }
        if (!singleReturnPartEData.adult_workers_employed) {
            return getBasicMessageAndFieldJSONArray('adult_workers_employed', adultsWorkersEmployedValidationMessage);
        }
        if (!singleReturnPartEData.young_peson_workers_employed) {
            return getBasicMessageAndFieldJSONArray('young_peson_workers_employed', youngPersonWorkersEmployedValidationMessage);
        }
        if (!singleReturnPartEData.basic_wages) {
            return getBasicMessageAndFieldJSONArray('basic_wages', basicwagesValidationMessage);
        }
        if (!singleReturnPartEData.dearness_allowances) {
            return getBasicMessageAndFieldJSONArray('dearness_allowances', dearnessAllowancesValidationMessage);
        }
        if (!singleReturnPartEData.composite_wages) {
            return getBasicMessageAndFieldJSONArray('composite_wages', compositewagesValidationMessage);
        }
        if (!singleReturnPartEData.overtime_wages) {
            return getBasicMessageAndFieldJSONArray('overtime_wages', overtimeWagesValidationMessage);
        }
        if (!singleReturnPartEData.nonprofit_bonus) {
            return getBasicMessageAndFieldJSONArray('nonprofit_bonus', nonProfitBonusValidationMessage);
        }
        if (!singleReturnPartEData.other_bonus) {
            return getBasicMessageAndFieldJSONArray('other_bonus', otherBonusValidationMessage);
        }
        if (!singleReturnPartEData.other_amount) {
            return getBasicMessageAndFieldJSONArray('other_amount', otherAmountValidationMessage);
        }
        if (!singleReturnPartEData.arrears_of_pat) {
            return getBasicMessageAndFieldJSONArray('arrears_of_pat', arrearsOfPatValidationMessage);
        }
        if (!singleReturnPartEData.total_wages) {
            return getBasicMessageAndFieldJSONArray('total_wages', totalWagesValidationMessage);
        }
        if (!singleReturnPartEData.year_total_wages) {
            return getBasicMessageAndFieldJSONArray('year_total_wages', yearTotalWagesValidationMessage);
        }
        if (!singleReturnPartEData.year_paid_bonus) {
            return getBasicMessageAndFieldJSONArray('year_paid_bonus', yearPaidBonusValidationMessage);
        }
        if (!singleReturnPartEData.commision_amount) {
            return getBasicMessageAndFieldJSONArray('commision_amount', commisionAmountValidationMessage);
        }
        if (!singleReturnPartEData.realized_amount) {
            return getBasicMessageAndFieldJSONArray('realized_amount', realizedAmountValidationMessage);
        }

        return '';
    },
    submitPartEDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartEData = $('#single_return_parte_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartE(singleReturnPartEData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_parte_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartEData = new FormData($('#single_return_parte_form')[0]);
        singleReturnPartEData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartEData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_parte',
            data: singleReturnPartEData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partFDetailsForm(parseData.singlereturn_partf_data);
            }
        });
    },
    checkValidationForSingleReturnPartF: function (singleReturnPartFData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartFData.no_of_female_workers) {
            return getBasicMessageAndFieldJSONArray('no_of_female_workers', noOfFemaleWorkersValidationMessage);
        }
        if (!singleReturnPartFData.no_of_maternity_women_workers) {
            return getBasicMessageAndFieldJSONArray('no_of_maternity_women_workers', noOfMaternityWomenWorkersValidationMessage);
        }
        if (!singleReturnPartFData.medical_bonus_case) {
            return getBasicMessageAndFieldJSONArray('medical_bonus_case', medicalBonusValidationMessage);
        }
        if (!singleReturnPartFData.miscarriage_leave_case) {
            return getBasicMessageAndFieldJSONArray('miscarriage_leave_case', miscarriageLeaveValidationMessage);
        }
        if (!singleReturnPartFData.additional_leave_case) {
            return getBasicMessageAndFieldJSONArray('additional_leave_case', additionalLeaveValidationMessage);
        }
        if (!singleReturnPartFData.maternity_benefit_amount) {
            return getBasicMessageAndFieldJSONArray('maternity_benefit_amount', maternityBenefitAmountValidationMessage);
        }
        if (singleReturnPartFData.is_dismissed_service == isChecked) {
            if (!singleReturnPartFData.no_of_dismissed_women) {
                return getBasicMessageAndFieldJSONArray('no_of_dismissed_women', dismissedWomenValidationMessage);
            }
            if (!singleReturnPartFData.dismissed_reason) {
                return getBasicMessageAndFieldJSONArray('dismissed_reason', dismissedReasonValidationMessage);
            }
        }

        return '';
    },
    submitPartFDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartFData = $('#single_return_partf_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartF(singleReturnPartFData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_partf_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartFData = new FormData($('#single_return_partf_form')[0]);
        singleReturnPartFData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartFData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_partf',
            data: singleReturnPartFData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // SingleReturn.router.navigate('singlereturn', {'trigger': true});
                //that.partADetailsForm();
                $('#singlereturn_id').val(parseData.encrypt_id);
                that.partGDetailsForm(parseData.singlereturn_partg_data);
            }
        });
    },
    checkValidationForSingleReturnPartG: function (singleReturnPartGData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singleReturnPartGData.no_of_employed_workers) {
            return getBasicMessageAndFieldJSONArray('no_of_employed_workers', noOfEmployedWorkersValidationMessage);
        }
        if (!singleReturnPartGData.no_of_handicapped_employed) {
            return getBasicMessageAndFieldJSONArray('no_of_handicapped_employed', noOfHandicappedEmployedValidationMessage);
        }

        return '';
    },
    askForSubmitSingleReturn: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'SingleReturn.listview.submitPartGDetails(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitPartGDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var singleReturnPartGData = $('#single_return_partg_form').serializeFormJSON();
        var validationData = that.checkValidationForSingleReturnPartG(singleReturnPartGData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('single-return-' + validationData.field, validationData.message);
            return false;
        }


        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_single_return');
        var btnObj = $('#submit_btn_for_partg_details');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var singleReturnPartGData = new FormData($('#single_return_partg_form')[0]);
        singleReturnPartGData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        singleReturnPartGData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'singlereturn/submit_single_return_partg',
            data: singleReturnPartGData,
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
                validationMessageShow('singlereturn', textStatus.statusText);
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
                    validationMessageShow('singlereturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                SingleReturn.router.navigate('singlereturn', {'trigger': true});
            }
        });
    },
    viewDocumentFile: function (FileName, singlereturnId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + baseUrl + 'documents/singlereturn/' + singlereturnId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + baseUrl + 'documents/singlereturn/' + singlereturnId + '/' + FileName + ' style=width:150px;height:100px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="SingleReturn.listview.askForDeleteforDocumentFile(' + singlereturnId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (singlereturnId, dbFileNameField, postId, postContainer) {
        if (!singlereturnId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'SingleReturn.listview.deleteDocumentFile(' + singlereturnId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (singlereturnId, dbFileNameField, postId, postContainer) {
        if (!singlereturnId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'singlereturn/delete_upload_file_for_single_return',
            type: 'POST',
            data: $.extend({}, {'singlereturn_id': singlereturnId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
    generateForm1: function (singlereturnId) {
        if (!singlereturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#singlereturn_id_for_singlereturn_form1').val(singlereturnId);
        $('#singlereturn_form1_pdf_form').submit();
        $('#singlereturn_id_for_singlereturn_form1').val('');
    },
    openUploadChallan: function (singleReturnId) {
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + singleReturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_singlereturn_data_by_singlereturn_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var singleReturnData = parseData.single_return_data;
                showPopup();
                if (singleReturnData.status != VALUE_FOUR && singleReturnData.status != VALUE_FIVE && singleReturnData.status != VALUE_SIX && singleReturnData.status != VALUE_SEVEN && singleReturnData.status != VALUE_EIGHT && singleReturnData.status != VALUE_ELEVEN) {
                    singleReturnData.show_remove_upload_btn = true;
                }
                if (singleReturnData.payment_type == VALUE_ONE) {
                    singleReturnData.utitle = 'Challan Copy';
                } else {
                    singleReturnData.utitle = 'Payment Details';
                }
                singleReturnData.module_type = VALUE_THIRTYNINE;
                $('#popup_container').html(singleReturnUploadChallanTemplate(singleReturnData));
                loadFB(VALUE_THIRTYNINE, parseData.fb_data, singleReturnData.payment_type, singleReturnData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'single_return_upload_challan', singleReturnData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'single_return_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYNINE);
                if (singleReturnData.challan != '') {
                    $('#challan_container_for_single_return_upload_challan').hide();
                    $('#challan_name_container_for_single_return_upload_challan').show();
                    $('#challan_name_href_for_single_return_upload_challan').attr('href', 'documents/singlereturn/' + singleReturnData.challan);
                    $('#challan_name_for_single_return_upload_challan').html(singleReturnData.challan);
                    $('#challan_remove_btn_for_single_return_upload_challan').attr('onclick', 'SingleReturn.listview.removeChallan("' + singleReturnData.singlereturn_id + '")');
                }
            }
        });
    },
    removeChallan: function (singleReturnId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'singlereturn/remove_challan',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                validationMessageShow('single-return-uc', textStatus.statusText);
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
                    validationMessageShow('single-return-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-single-return-uc').html(parseData.message);
                removeDocument('challan', 'single_return_upload_challan');
                $('#status_' + singleReturnId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-single-return-uc').html('');
        validationMessageHide();
        var singleReturnId = $('#singlereturn_id_for_single_return_upload_challan').val();
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_single_return_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_single_return_upload_challan_1').focus();
            validationMessageShow('single_return-uc-payment_type_for_single_return_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_single_return_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_single_return_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_single_return_upload_challan').focus();
                validationMessageShow('single-return-uc-challan_for_single_return_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_single_return_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_single_return_upload_challan').focus();
                validationMessageShow('single-return-uc-challan_for_single_return_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYNINE, 'single-return-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_single_return_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#single_return_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'singlereturn/upload_challan',
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
                validationMessageShow('single-return-uc', textStatus.statusText);
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
                    validationMessageShow('single-return-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + singleReturnId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + singleReturnId).show();
                }
                $('#total_fees_' + singleReturnId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (singleReturnId) {
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + singleReturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_singlereturn_data_by_singlereturn_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                var singleReturnData = parseData.single_return_data;
                showPopup();
                $('#popup_container').html(singleReturnApproveTemplate(singleReturnData));
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
        var formData = $('#approve_single_return_form').serializeFormJSON();
        if (!formData.single_return_id_for_single_return_approve) {
            alert('ok');
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_single_return_approve) {
            $('#registration_number_for_single_return_approve').focus();
            validationMessageShow('single-return-approve-registration_number_for_single_return_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_single_return_approve) {
            $('#valid_upto_for_single_return_approve').focus();
            validationMessageShow('single-return-approve-valid_upto_for_single_return_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_single_return_approve) {
            $('#remarks_for_single_return_approve').focus();
            validationMessageShow('single-return-approve-remarks_for_single_return_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'singlereturn/approve_application',
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
                validationMessageShow('single-return-approve', textStatus.statusText);
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
                    validationMessageShow('single-return-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.single_return_id_for_single_return_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.single_return_id_for_single_return_approve).remove();
                $('#approve_btn_for_app_' + formData.single_return_id_for_single_return_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.single_return_id_for_single_return_approve).show();
                $('#so_status_' + formData.single_return_id_for_single_return_approve).html(dateTimeDays(formData.single_return_id_for_single_return_approve, parseData, VALUE_THIRTYNINE));
            }
        });
    },
    askForRejectApplication: function (singleReturnId) {
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + singleReturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_singlereturn_data_by_singlereturn_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId}, getTokenData()),
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
                var singleReturnData = parseData.single_return_data;
                showPopup();
                $('#popup_container').html(singleReturnRejectTemplate(singleReturnData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_single_return_form').serializeFormJSON();
        if (!formData.single_return_id_for_single_return_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_single_return_reject) {
            $('#remarks_for_single_return_reject').focus();
            validationMessageShow('single-return-reject-remarks_for_single_return_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'singlereturn/reject_application',
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
                validationMessageShow('single-return-reject', textStatus.statusText);
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
                    validationMessageShow('single-return-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.single_return_id_for_single_return_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.single_return_id_for_single_return_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.single_return_id_for_single_return_reject).remove();
                $('#reject_btn_for_app_' + formData.single_return_id_for_single_return_reject).remove();
                $('#approve_btn_for_app_' + formData.single_return_id_for_single_return_reject).remove();
                $('#download_btn_for_app_' + formData.single_return_id_for_single_return_reject).show();
                $('#so_status_' + formData.single_return_id_for_single_return_reject).html(dateTimeDays(formData.single_return_id_for_single_return_reject, parseData, VALUE_THIRTYNINE));
            }
        });
    },
    generateCertificate: function (singleReturnId) {
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#singlereturn_id_for_certificate').val(singleReturnId);
        $('#singlereturn_certificate_pdf_form').submit();
        $('#singlereturn_id_for_certificate').val('');
    },
    addDangerousProcess: function (templateData) {
        templateData.process_cnt = tempProcessCnt;
        $('#dangerous_process_info_container').append(dangerousProcessTemplate(templateData));
        tempProcessCnt++;
        resetCounter('display-cnt');
    },
    removeProductInfo: function (prodCnt) {
        $('#dangerous_process_info_' + prodCnt).remove();
        resetCounter('display-cnt');
    },
    addDangerousProcess: function (templateData) {
        templateData.process_cnt = tempProcessCnt;
        $('#dangerous_process_info_container').append(dangerousProcessTemplate(templateData));
        tempProcessCnt++;
        resetCounter('display-cnt');
    },
    removeProcessInfo: function (prodCnt) {
        $('#dangerous_process_info_' + prodCnt).remove();
        resetCounter('display-cnt');
    },
    addHazardousProcess: function (templateData) {
        templateData.hazardous_cnt = tempHazardousCnt;
        $('#hazardous_process_info_container').append(hazardousProcessTemplate(templateData));
        tempHazardousCnt++;
        resetCounter('hazardous-cnt');
    },
    removeHazardousProcessInfo: function (prodCnt) {
        $('#hazardous_process_info_' + prodCnt).remove();
        resetCounter('hazardous-cnt');
    },
    getQueryData: function (singlereturnId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!singlereturnId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYNINE;
        templateData.module_id = singlereturnId;
        var btnObj = $('#query_btn_for_app_' + singlereturnId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYNINE, moduleData.singlereturn_id);
                tmpData.applicant_name = moduleData.esta_name;
                tmpData.title = 'Establishment Name';
                tmpData.module_type = VALUE_THIRTYNINE;
                tmpData.module_id = singlereturnId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (singleReturnId) {
        if (!singleReturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + singleReturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'singlereturn/get_singlereturn_data_by_singlereturn_id',
            type: 'post',
            data: $.extend({}, {'singlereturn_id': singleReturnId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var singleReturnData = parseData.single_return_data;
                showPopup();
                if (singleReturnData.payment_type == VALUE_ONE || singleReturnData.payment_type == VALUE_THREE) {
                    singleReturnData.user_payment_type_text = paymentTypeArray[singleReturnData.payment_type];
                } else {
                    singleReturnData.user_payment_type_text = userPaymentTypeArray[singleReturnData.user_payment_type] ? userPaymentTypeArray[singleReturnData.user_payment_type] : '';
                }
                if (singleReturnData.payment_type == VALUE_ONE) {
                    singleReturnData.utitle = 'Fees Paid Challan Copy';
                } else if (singleReturnData.payment_type == VALUE_TWO && singleReturnData.user_payment_type == VALUE_ONE) {
                    singleReturnData.utitle = 'Demand Draft (DD) Copy';
                }
                singleReturnData.module_type = VALUE_THIRTYNINE;
                $('#popup_container').html(singleReturnViewPaymentTemplate(singleReturnData));
                loadFB(VALUE_THIRTYNINE, parseData.fb_data, singleReturnData.payment_type);
                loadPH(VALUE_THIRTYNINE, singleReturnData.singlereturn_id, parseData.ph_data);
                if (singleReturnData.payment_type == VALUE_ONE || (singleReturnData.payment_type == VALUE_TWO && singleReturnData.user_payment_type == VALUE_ONE)) {
                    if (singleReturnData.fees_paid_challan != '') {
                        $('#vp_container_for_single_return').show();
                        $('#fees_paid_challan_name_href_for_single_return').attr('href', SINGLERETURN_DOC_PATH + singleReturnData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_single_return').html(singleReturnData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
