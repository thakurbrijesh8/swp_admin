var buildingPlanListTemplate = Handlebars.compile($('#building_plan_list_template').html());
var buildingPlanTableTemplate = Handlebars.compile($('#building_plan_table_template').html());
var buildingPlanActionTemplate = Handlebars.compile($('#building_plan_action_template').html());
var buildingPlanFormTemplate = Handlebars.compile($('#building_plan_form_template').html());
var buildingPlanViewTemplate = Handlebars.compile($('#building_plan_view_template').html());
var buildingPlanUploadChallanTemplate = Handlebars.compile($('#building_plan_upload_challan_template').html());
var buildingPlanApproveTemplate = Handlebars.compile($('#building_plan_approve_template').html());
var buildingPlanRejectTemplate = Handlebars.compile($('#building_plan_reject_template').html());
var buildingPlanViewPaymentTemplate = Handlebars.compile($('#building_plan_view_payment_template').html());


var BuildingPlan = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
BuildingPlan.Router = Backbone.Router.extend({
    routes: {
        'buildingplan': 'renderList',
        'buildingplan_form': 'renderListForForm',
        'edit_buildingplan_form': 'renderList',
        'view_buildingplan_form': 'renderList',
    },
    renderList: function () {
        BuildingPlan.listview.listPage();
    },
    renderListForForm: function () {
        BuildingPlan.listview.listPageBuildingPlanForm();
    }
});
BuildingPlan.listView = Backbone.View.extend({
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
        addClass('menu_building_plan', 'active');
        BuildingPlan.router.navigate('buildingplan');
        var templateData = {};
        this.$el.html(buildingPlanListTemplate(templateData));
        this.loadBuildingPlanData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageBuildingPlanForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_building_plan');
        this.$el.html(buildingPlanListTemplate);
        this.newBuildingPlanForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return buildingPlanActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYSIX;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return buildingPlanActionTemplate(rowData);
    },
    loadBuildingPlanData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.factory_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.factory_building;
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
                return regNoRenderer(VALUE_THIRTYSIX, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THIRTYSIX, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYSIX);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['building_plan_data'], function (index, objData) {
                json['building_plan_data'][index]['query_movement_string'] = qmData[objData.buildingplan_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.buildingplan_id] + '</table>') : '-';
            });
            return json['building_plan_data'];
        };
        var that = this;
        BuildingPlan.router.navigate('buildingplan');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'BuildingPlan.listview.loadBuildingPlanData();');
        $('#building_plan_form_and_datatable_container').html(buildingPlanTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_buildingplan_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_buildingplan_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_buildingplan_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_buildingplan_list', false);
        allowOnlyIntegerValue('mobile_number_for_buildingplan_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_buildingplan_list', false);
        $('#district_for_buildingplan_list').val(searchData.search_district);
        $('#status_for_buildingplan_list').val(searchData.search_status);
        $('#app_timing_for_buildingplan_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_buildingplan_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_buildingplan_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_buildingplan_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_buildingplan_list').attr('disabled', 'disabled');
        }
        buildingPlanDataTable = $('#building_plan_datatable').DataTable({
            ajax: {url: 'buildingplan/get_building_plan_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'buildingplan_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'buildingplan_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'buildingplan_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'buildingplan_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}

            ],
            "initComplete": searchableDatatable
        });
        //  } 
        $('#building_plan_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = buildingPlanDataTable.row(tr);

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
    askForNewBuildingPlanForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newBuildingPlanForm(false, {});
    },
    newBuildingPlanForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;

        var that = this;
        if (isEdit) {
            var formData = parseData.building_plan_data;
            BuildingPlan.router.navigate('edit_buildingplan_form');
        } else {
            var formData = {};
            BuildingPlan.router.navigate('buildingplan_form');
        }

        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.buildingPlan_data = parseData.building_plan_data;


        $('#building_plan_form_and_datatable_container').html(buildingPlanFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            if (formData.building_drawing_plans != '') {
                $('#building_drawing_plans_container_for_bp').hide();
                $('#building_drawing_plans_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.building_drawing_plans);
                $('#building_drawing_plans_name_container_for_bp').show();
                $('#building_drawing_plans_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.building_drawing_plans);
            }
            if (formData.provisional_registration != '') {
                $('#provisional_registration_container_for_bp').hide();
                $('#provisional_registration_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.provisional_registration);
                $('#provisional_registration_name_container_for_bp').show();
                $('#provisional_registration_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.provisional_registration);
            }
            if (formData.project_report != '') {
                $('#project_report_container_for_bp').hide();
                $('#project_report_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.project_report);
                $('#project_report_name_container_for_bp').show();
                $('#project_report_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.project_report);
            }
            if (formData.mode_of_storage != '') {
                $('#mode_of_storage_container_for_bp').hide();
                $('#mode_of_storage_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.mode_of_storage);
                $('#mode_of_storage_name_container_for_bp').show();
                $('#mode_of_storage_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.mode_of_storage);
            }
            if (formData.drawing_of_treatment_plant != '') {
                $('#drawing_of_treatment_plant_container_for_bp').hide();
                $('#drawing_of_treatment_plant_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.drawing_of_treatment_plant);
                $('#drawing_of_treatment_plant_name_container_for_bp').show();
                $('#drawing_of_treatment_plant_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.drawing_of_treatment_plant);
            }
            if (formData.machinery_layout != '') {
                $('#machinery_layout_container_for_bp').hide();
                $('#machinery_layout_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.machinery_layout);
                $('#machinery_layout_name_container_for_bp').show();
                $('#machinery_layout_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.machinery_layout);
            }
            if (formData.questionnaire_copy != '') {
                $('#questionnaire_copy_container_for_bp').hide();
                $('#questionnaire_copy_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.questionnaire_copy);
                $('#questionnaire_copy_name_container_for_bp').show();
                $('#questionnaire_copy_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.questionnaire_copy);
            }
            if (formData.sign_of_applicant != '') {
                $('#sign_of_applicant_container_for_bp').hide();
                $('#sign_of_applicant_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.sign_of_applicant);
                $('#sign_of_applicant_name_container_for_bp').show();
                $('#sign_of_applicant_download').attr("href", BUILD_DOC_PATH + formData.sign_of_applicant);
            }
        }
        generateSelect2();
        datePicker();
        $('#building_plan_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitBuildingPlan($('#submit_btn_for_building_plan'));
            }
        });
    },
    editOrViewBuildingPlan: function (btnObj, buildingPlanId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!buildingPlanId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'buildingplan/get_building_plan_data_by_id',
            type: 'post',
            data: $.extend({}, {'buildingplan_id': buildingPlanId}, getTokenData()),
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
                //var buildingPlanData = parseData.building_plan_data;
                // buildingPlanData.date_of_approval = dateTo_DD_MM_YYYY(buildingPlanData.date_of_approval);
                if (isEdit) {
                    that.newBuildingPlanForm(isEdit, parseData);
                } else {
                    that.viewBuildingPlanForm(parseData);
                }
            }
        });
    },
    viewBuildingPlanForm: function (parseData) {
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
        var formData = parseData.building_plan_data;
        BuildingPlan.router.navigate('view_buildingplan_form');
        //templateData.buildingPlan_data = buildingPlanData;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#building_plan_form_and_datatable_container').html(buildingPlanViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);


        if (formData.building_drawing_plans != '') {
            $('#building_drawing_plans_container_for_bp').hide();
            $('#building_drawing_plans_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.building_drawing_plans);
            $('#building_drawing_plans_name_container_for_bp').show();
            $('#building_drawing_plans_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.building_drawing_plans);
        }
        if (formData.provisional_registration != '') {
            $('#provisional_registration_container_for_bp').hide();
            $('#provisional_registration_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.provisional_registration);
            $('#provisional_registration_name_container_for_bp').show();
            $('#provisional_registration_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.provisional_registration);
        }
        if (formData.project_report != '') {
            $('#project_report_container_for_bp').hide();
            $('#project_report_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.project_report);
            $('#project_report_name_container_for_bp').show();
            $('#project_report_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.project_report);
        }
        if (formData.mode_of_storage != '') {
            $('#mode_of_storage_container_for_bp').hide();
            $('#mode_of_storage_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.mode_of_storage);
            $('#mode_of_storage_name_container_for_bp').show();
            $('#mode_of_storage_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.mode_of_storage);
        }
        if (formData.drawing_of_treatment_plant != '') {
            $('#drawing_of_treatment_plant_container_for_bp').hide();
            $('#drawing_of_treatment_plant_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.drawing_of_treatment_plant);
            $('#drawing_of_treatment_plant_name_container_for_bp').show();
            $('#drawing_of_treatment_plant_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.drawing_of_treatment_plant);
        }
        if (formData.machinery_layout != '') {
            $('#machinery_layout_container_for_bp').hide();
            $('#machinery_layout_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.machinery_layout);
            $('#machinery_layout_name_container_for_bp').show();
            $('#machinery_layout_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.machinery_layout);
        }
        if (formData.questionnaire_copy != '') {
            $('#questionnaire_copy_container_for_bp').hide();
            $('#questionnaire_copy_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.questionnaire_copy);
            $('#questionnaire_copy_name_container_for_bp').show();
            $('#questionnaire_copy_name_image_for_bp_download').attr("href", BUILD_DOC_PATH + formData.questionnaire_copy);
        }
        if (formData.sign_of_applicant != '') {
            $('#sign_of_applicant_container_for_bp').hide();
            $('#sign_of_applicant_name_image_for_bp').attr('src', BUILD_DOC_PATH + formData.sign_of_applicant);
            $('#sign_of_applicant_name_container_for_bp').show();
            $('#sign_of_applicant_download').attr("href", BUILD_DOC_PATH + formData.sign_of_applicant);
        }
    },
    checkValidationForBuildingPlan: function (buildingPlanData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!buildingPlanData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!buildingPlanData.applicant_name) {
            return getBasicMessageAndFieldJSONArray('applicant_name', applicantNameValidationMessage);
        }
        if (!buildingPlanData.applicant_phoneno) {
            return getBasicMessageAndFieldJSONArray('applicant_phoneno', applicantPhnoValidationMessage);
        }
        if (!buildingPlanData.email) {
            return getBasicMessageAndFieldJSONArray('email', applicantEmailValidationMessage);
        }
        if (!buildingPlanData.applicant_address) {
            return getBasicMessageAndFieldJSONArray('applicant_address', factoryAddressValidationMessage);
        }
        if (!buildingPlanData.factory_name) {
            return getBasicMessageAndFieldJSONArray('factory_name', factoryNameValidationMessage);
        }
        if (!buildingPlanData.factory_building) {
            return getBasicMessageAndFieldJSONArray('factory_building', factoryBuildingValidationMessage);
        }
        if (!buildingPlanData.factory_streetno) {
            return getBasicMessageAndFieldJSONArray('factory_streetno', factorySectorValidationMessage);
        }
        if (!buildingPlanData.factory_city) {
            return getBasicMessageAndFieldJSONArray('factory_city', factoryCityValidationMessage);
        }
        if (!buildingPlanData.factory_pincode) {
            return getBasicMessageAndFieldJSONArray('factory_pincode', factoryPincodeValidationMessage);
        }
        if (!buildingPlanData.factory_district) {
            return getBasicMessageAndFieldJSONArray('factory_district', factoryDistrictValidationMessage);
        }
        if (!buildingPlanData.factory_town) {
            return getBasicMessageAndFieldJSONArray('factory_town', factoryTownValidationMessage);
        }
        if (!buildingPlanData.nearest_police_station) {
            return getBasicMessageAndFieldJSONArray('nearest_police_station', policeStationValidationMessage);
        }
        if (!buildingPlanData.nrearest_railway_station) {
            return getBasicMessageAndFieldJSONArray('nrearest_railway_station', railwayStationValidationMessage);
        }
        if (!buildingPlanData.particulars_of_plant) {
            return getBasicMessageAndFieldJSONArray('particulars_of_plant', planValidationMessage);
        }

        return '';
    },
    askForSubmitBuildingPlan: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BuildingPlan.listview.submitBuildingPlan(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitBuildingPlan: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var buildingPlanData = $('#building_plan_form').serializeFormJSON();
        var validationData = that.checkValidationForBuildingPlan(buildingPlanData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('building-plan-' + validationData.field, validationData.message);
            return false;
        }

        // if (!buildingPlanData.temp_upload_flow_chart) {
        //     if (!$('#upload_flow_chart').val()) {
        //         if (imagePdfUploadValidation('upload_flow_chart', flowChartValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!buildingPlanData.temp_upload_site_plan) {
        //     if (!$('#upload_site_plan').val()) {
        //         if (imagePdfUploadValidation('upload_site_plan', sitePlanValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!buildingPlanData.temp_upload_elevation_document) {
        //     if (!$('#upload_elevation_document').val()) {
        //         if (imagePdfUploadValidation('upload_elevation_document', elevationDocumentValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }

        // if (!buildingPlanData.temp_sign_of_applicant) {
        //     if (!$('#sign_of_applicant').val()) {
        //         if (imagePdfUploadValidation('sign_of_applicant', applicantSignValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_buildingplan') : $('#submit_btn_for_buildingplan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var buildingPlanData = new FormData($('#building_plan_form')[0]);
        buildingPlanData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        buildingPlanData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'buildingplan/submit_building_plan',
            data: buildingPlanData,
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
                validationMessageShow('buildingplan', textStatus.statusText);
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
                    validationMessageShow('buildingplan', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                BuildingPlan.router.navigate('buildingplan', {'trigger': true});
            }
        });
    },
    viewDocumentFile: function (FileName, buildingplanId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/buildingplan/' + buildingplanId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/buildingplan/' + buildingplanId + '/' + FileName + ' style=width:150px;height:100px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="BuildingPlan.listview.askForDeleteforDocumentFile(' + buildingplanId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (buildingplanId, dbFileNameField, postId, postContainer) {
        if (!buildingplanId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'BuildingPlan.listview.deleteDocumentFile(' + buildingplanId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (buildingplanId, dbFileNameField, postId, postContainer) {
        if (!buildingplanId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'buildingplan/delete_upload_file_for_building_plan',
            type: 'POST',
            data: $.extend({}, {'buildingplan_id': buildingplanId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
    generateForm1: function (buildingplanId) {
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#buildingplan_id_for_buildingplan_form1').val(buildingplanId);
        $('#buildingplan_form1_pdf_form').submit();
        $('#buildingplan_id_for_buildingplan_form1').val('');
    },
    openUploadChallan: function (buildingplanId) {
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + buildingplanId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'buildingplan/get_buildingplan_data_by_buildingplan_id',
            type: 'post',
            data: $.extend({}, {'buildingplan_id': buildingplanId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var buildingPlanData = parseData.building_plan_data;
                showPopup();
                if (buildingPlanData.status != VALUE_FOUR && buildingPlanData.status != VALUE_FIVE && buildingPlanData.status != VALUE_SIX && buildingPlanData.status != VALUE_SEVEN && buildingPlanData.status != VALUE_EIGHT) {
                    buildingPlanData.show_remove_upload_btn = true;
                }
                if (buildingPlanData.payment_type == VALUE_ONE) {
                    buildingPlanData.utitle = 'Challan Copy';
                } else {
                    buildingPlanData.utitle = 'Payment Details';
                }
                buildingPlanData.module_type = VALUE_THIRTYSIX;
                $('#popup_container').html(buildingPlanUploadChallanTemplate(buildingPlanData));
                loadFB(VALUE_THIRTYSIX, parseData.fb_data, buildingPlanData.payment_type, buildingPlanData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'building_plan_upload_challan', buildingPlanData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'building_plan_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYSIX);
                if (buildingPlanData.challan != '') {
                    $('#challan_container_for_building_plan_upload_challan').hide();
                    $('#challan_name_container_for_building_plan_upload_challan').show();
                    $('#challan_name_href_for_building_plan_upload_challan').attr('href', 'documents/buildingplan/' + buildingPlanData.challan);
                    $('#challan_name_for_building_plan_upload_challan').html(buildingPlanData.challan);
                    $('#challan_remove_btn_for_building_plan_upload_challan').attr('onclick', 'BuildingPlan.listview.removeChallan("' + buildingPlanData.buildingplan_id + '")');
                }
            }
        });
    },
    removeChallan: function (buildingplanId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'buildingplan/remove_challan',
            data: $.extend({}, {'buildingplan_id': buildingplanId}, getTokenData()),
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
                validationMessageShow('building-plan-uc', textStatus.statusText);
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
                    validationMessageShow('building-plan-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-building-plan-uc').html(parseData.message);
                removeDocument('challan', 'building_plan_upload_challan');
                $('#status_' + buildingplanId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-building-plan-uc').html('');
        validationMessageHide();
        var buildingplanId = $('#building_plan_id_for_building_plan_upload_challan').val();
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_building_plan_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_building_plan_upload_challan_1').focus();
            validationMessageShow('building-plan-uc-payment_type_for_building_plan_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_building_plan_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_building_plan_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_building_plan_upload_challan').focus();
                validationMessageShow('building-plan-uc-challan_for_building_plan_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_building_plan_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_building_plan_upload_challan').focus();
                validationMessageShow('building-plan-uc-challan_for_building_plan_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYSIX, 'building-plan-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_building_plan_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#building_plan_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'buildingplan/upload_challan',
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
                validationMessageShow('building-plan-uc', textStatus.statusText);
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
                    validationMessageShow('building-plan-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + buildingplanId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + buildingplanId).show();
                }
                $('#total_fees_' + buildingplanId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (buildingplanId) {
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_building_plan_' + buildingplanId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'buildingplan/get_buildingplan_data_by_buildingplan_id',
            type: 'post',
            data: $.extend({}, {'buildingplan_id': buildingplanId}, getTokenData()),
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
                var buildingPlanData = parseData.building_plan_data;
                showPopup();
                $('#popup_container').html(buildingPlanApproveTemplate(buildingPlanData));
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
        var formData = $('#approve_building_plan_form').serializeFormJSON();
        if (!formData.buildingplan_id_for_building_plan_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_building_plan_approve) {
            $('#registration_number_for_building_plan_approve').focus();
            validationMessageShow('building-plan-approve-registration_number_for_building_plan_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_building_plan_approve) {
            $('#valid_upto_for_building_plan_approve').focus();
            validationMessageShow('building-plan-approve-valid_upto_for_building_plan_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_building_plan_approve) {
            $('#remarks_for_building_plan_approve').focus();
            validationMessageShow('building-plan-approve-remarks_for_building_plan_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'buildingplan/approve_application',
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
                validationMessageShow('building-paln-approve', textStatus.statusText);
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
                    validationMessageShow('building-paln-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.buildingplan_id_for_building_plan_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.buildingplan_id_for_building_plan_approve).remove();
                $('#approve_btn_for_app_' + formData.buildingplan_id_for_building_plan_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.buildingplan_id_for_building_plan_approve).show();
                $('#so_status_' + formData.buildingplan_id_for_building_plan_approve).html(dateTimeDays(formData.buildingplan_id_for_building_plan_approve, parseData, VALUE_THIRTYSIX));
            }
        });
    },
    askForRejectApplication: function (buildingplanId) {
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_building_plan_' + buildingplanId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'buildingplan/get_buildingplan_data_by_buildingplan_id',
            type: 'post',
            data: $.extend({}, {'buildingplan_id': buildingplanId}, getTokenData()),
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
                var buildingPlanData = parseData.building_plan_data;
                showPopup();
                $('#popup_container').html(buildingPlanRejectTemplate(buildingPlanData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_building_plan_form').serializeFormJSON();
        if (!formData.buildingplan_id_for_building_plan_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_building_plan_reject) {
            $('#remarks_for_building_plan_reject').focus();
            validationMessageShow('building-plan-reject-remarks_for_building_plan_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'buildingplan/reject_application',
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
                validationMessageShow('building-plan-reject', textStatus.statusText);
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
                    validationMessageShow('building-plan-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.buildingplan_id_for_building_plan_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.buildingplan_id_for_building_plan_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.buildingplan_id_for_building_plan_reject).remove();
                $('#reject_btn_for_app_' + formData.buildingplan_id_for_building_plan_reject).remove();
                $('#approve_btn_for_app_' + formData.buildingplan_id_for_building_plan_reject).remove();
                $('#so_status_' + formData.buildingplan_id_for_building_plan_reject).html(dateTimeDays(formData.buildingplan_id_for_building_plan_reject, parseData, VALUE_THIRTYSIX));
            }
        });
    },
    generateCertificate: function (buildingPlanId) {
        if (!buildingPlanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#buildingplan_id_for_certificate').val(buildingPlanId);
        $('#buildingplan_certificate_pdf_form').submit();
        $('#buildingplan_id_for_certificate').val('');
    },
    getQueryData: function (buildingplanId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!buildingplanId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYSIX;
        templateData.module_id = buildingplanId;
        var btnObj = $('#query_btn_for_app_' + buildingplanId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYSIX, moduleData.buildingplan_id);
                tmpData.applicant_name = moduleData.applicant_name;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_THIRTYSIX;
                tmpData.module_id = buildingplanId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (buildingplanId) {
        if (!buildingplanId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + buildingplanId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'buildingplan/get_buildingplan_data_by_buildingplan_id',
            type: 'post',
            data: $.extend({}, {'buildingplan_id': buildingplanId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var buildingPlanData = parseData.building_plan_data;
                showPopup();
                if (buildingPlanData.payment_type == VALUE_ONE || buildingPlanData.payment_type == VALUE_THREE) {
                    buildingPlanData.user_payment_type_text = paymentTypeArray[buildingPlanData.payment_type];
                } else {
                    buildingPlanData.user_payment_type_text = userPaymentTypeArray[buildingPlanData.user_payment_type] ? userPaymentTypeArray[buildingPlanData.user_payment_type] : '';
                }
                if (buildingPlanData.payment_type == VALUE_ONE) {
                    buildingPlanData.utitle = 'Fees Paid Challan Copy';
                } else if (buildingPlanData.payment_type == VALUE_TWO && buildingPlanData.user_payment_type == VALUE_ONE) {
                    buildingPlanData.utitle = 'Demand Draft (DD) Copy';
                }
                buildingPlanData.module_type = VALUE_THIRTYSIX;
                $('#popup_container').html(buildingPlanViewPaymentTemplate(buildingPlanData));
                loadFB(VALUE_THIRTYSIX, parseData.fb_data, buildingPlanData.payment_type);
                loadPH(VALUE_THIRTYSIX, buildingPlanData.buildingplan_id, parseData.ph_data);
                if (buildingPlanData.payment_type == VALUE_ONE || (buildingPlanData.payment_type == VALUE_TWO && buildingPlanData.user_payment_type == VALUE_ONE)) {
                    if (buildingPlanData.fees_paid_challan != '') {
                        $('#vp_container_for_building_plan').show();
                        $('#fees_paid_challan_name_href_for_building_plan').attr('href', BUILD_DOC_PATH + buildingPlanData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_building_plan').html(buildingPlanData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
