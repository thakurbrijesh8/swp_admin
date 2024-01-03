var constructionListTemplate = Handlebars.compile($('#construction_list_template').html());
var constructionTableTemplate = Handlebars.compile($('#construction_table_template').html());
var constructionActionTemplate = Handlebars.compile($('#construction_action_template').html());
var constructionFormTemplate = Handlebars.compile($('#construction_form_template').html());
var constructionViewTemplate = Handlebars.compile($('#construction_view_template').html());
var constructionUploadChallanTemplate = Handlebars.compile($('#construction_upload_challan_template').html());
var constructionApproveTemplate = Handlebars.compile($('#construction_approve_template').html());
var constructionRejectTemplate = Handlebars.compile($('#construction_reject_template').html());
var constructionViewPaymentTemplate = Handlebars.compile($('#construction_view_payment_template').html());
var tempPersonCnt = 1;
var Construction = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Construction.Router = Backbone.Router.extend({
    routes: {
        'construction': 'renderList',
        'construction_form': 'renderListForForm',
        'edit_construction_form': 'renderList',
        'view_construction_form': 'renderList',
    },
    renderList: function () {
        Construction.listview.listPage();
    },
    renderListForForm: function () {
        Construction.listview.listPageConstructionForm();
    }
});
Construction.listView = Backbone.View.extend({
    el: 'div#main_container',
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
        addClass('construction', 'active');
        Construction.router.navigate('construction');
        var templateData = {};
        this.$el.html(constructionListTemplate(templateData));
        this.loadConstructionData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageConstructionForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('construction', 'active');
        this.$el.html(constructionListTemplate);
        this.newConstructionForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return constructionActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYSIX;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return constructionActionTemplate(rowData);
    },
    loadConstructionData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_owner + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.address_of_owner;
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
                return regNoRenderer(VALUE_TWENTYSIX, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_TWENTYSIX, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYSIX);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['construction_data'], function (index, objData) {
                json['construction_data'][index]['query_movement_string'] = qmData[objData.construction_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.construction_id] + '</table>') : '-';
            });
            return json['construction_data'];
        };
        var that = this;
        showTableContainer('construction');
        Construction.router.navigate('construction');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Construction.listview.loadConstructionData();');
        $('#construction_datatable_container').html(constructionTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_construction_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_construction_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_construction_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_construction_list', false);
        allowOnlyIntegerValue('mobile_number_for_construction_list');
        //     if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_construction_list', false);
        $('#district_for_construction_list').val(searchData.search_district);
        $('#status_for_construction_list').val(searchData.search_status);
        $('#app_timing_for_construction_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_construction_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_construction_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_construction_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_construction_list').attr('disabled', 'disabled');
        }
        constructionDataTable = $('#construction_datatable').DataTable({
            ajax: {url: 'construction/get_construction_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'construction_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'construction_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'construction_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'construction_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}

            ],
            "initComplete": searchableDatatable
        });
        //   } 
        $('#construction_datatable_filter').remove();
        $('#construction_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = constructionDataTable.row(tr);
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
    newConstructionForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.construction_data;
            Construction.router.navigate('edit_construction_form');
        } else {
            var formData = {};
            Construction.router.navigate('construction_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.construction_data = parseData.construction_data;
        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.construction_data.application_date);
            templateData.valid_upto_date = dateTo_DD_MM_YYYY(formData.valid_upto_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('construction');
        $('#construction_form_container').html(constructionFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {

            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            that.getDepartmentdata(district);
            if (formData.provisional_noc == IS_CHECKED_YES) {
                $('#provisional_noc_yes').attr('checked', 'checked');
                $('.provisional_noc_div').show();
            } else if (formData.provisional_noc == IS_CHECKED_NO) {
                $('#provisional_noc_no').attr('checked', 'checked');
            }
            if (formData.crz_clearance == IS_CHECKED_YES) {
                $('#crz_clearance_yes').attr('checked', 'checked');
                $('.crz_clearance_div').show();
            } else if (formData.crz_clearance == IS_CHECKED_NO) {
                $('#crz_clearance_no').attr('checked', 'checked');
            }
            if (formData.sub_division == IS_CHECKED_YES) {
                $('#sub_division_yes').attr('checked', 'checked');
                $('.sub_division_div').show();
            } else if (formData.sub_division == IS_CHECKED_NO) {
                $('#sub_division_no').attr('checked', 'checked');
            }
            if (formData.amalgamation == IS_CHECKED_YES) {
                $('#amalgamation_yes').attr('checked', 'checked');
                $('.amalgamation_div').show();
            } else if (formData.amalgamation == IS_CHECKED_NO) {
                $('#amalgamation_no').attr('checked', 'checked');
            }
            if (formData.occupancy == IS_CHECKED_YES) {
                $('#occupancy_yes').attr('checked', 'checked');
                $('.occupancy_div').show();
            } else if (formData.occupancy == IS_CHECKED_NO) {
                $('#occupancy_no').attr('checked', 'checked');
            }
            if (formData.certificate_land == IS_CHECKED_YES) {
                $('#certificate_land_yes').attr('checked', 'checked');
                $('.certificate_land_div').show();
            } else if (formData.certificate_land == IS_CHECKED_NO) {
                $('#certificate_land_no').attr('checked', 'checked');
            }
            if (formData.annexureV == IS_CHECKED_YES) {
                $('#annexureV_yes').attr('checked', 'checked');
                $('.annexureV_div').show();
            } else if (formData.annexureV == IS_CHECKED_NO) {
                $('#annexureV_no').attr('checked', 'checked');
            }

            if (formData.annexureVI == IS_CHECKED_YES) {
                $('#annexureVI_yes').attr('checked', 'checked');
                $('.annexureVI_div').show();
            } else if (formData.annexureVI == IS_CHECKED_NO) {
                $('#annexureVI_no').attr('checked', 'checked');
            }
            if (formData.layoutplan == IS_CHECKED_YES) {
                $('#layoutplan_yes').attr('checked', 'checked');
                $('.layoutplan_div').show();
            } else if (formData.layoutplan == IS_CHECKED_NO) {
                $('#layoutplan_no').attr('checked', 'checked');
            }


            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_construction').hide();
                $('#seal_and_stamp_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_construction').show();
                $('#seal_and_stamp_download').attr("href", CONSTRUCTION_DOC_PATH + formData.signature);
            }

            if (formData.annexure_III != '') {
                $('#annexure_III_container_for_construction').hide();
                $('#annexure_III_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_III);
                $('#annexure_III_name_container_for_construction').show();
                $('#annexure_III_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_III);
            }
            if (formData.annexure_IV != '') {
                $('#annexure_IV_container_for_construction').hide();
                $('#annexure_IV_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_IV);
                $('#annexure_IV_name_container_for_construction').show();
                $('#annexure_IV_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_IV);
            }
            if (formData.annexure_V != '') {
                $('#annexure_V_container_for_construction').hide();
                $('#annexure_V_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_V);
                $('#annexure_V_name_container_for_construction').show();
                $('#annexure_V_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_V);
            }
            if (formData.copy_of_na != '') {
                $('#copy_of_na_container_for_construction').hide();
                $('#copy_of_na_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.copy_of_na);
                $('#copy_of_na_name_container_for_construction').show();
                $('#copy_of_na_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.copy_of_na);
            }
            if (formData.original_certified_map != '') {
                $('#original_certified_map_container_for_construction').hide();
                $('#original_certified_map_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.original_certified_map);
                $('#original_certified_map_name_container_for_construction').show();
                $('#original_certified_map_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.original_certified_map);
            }
            if (formData.I_and_XIV_nakal != '') {
                $('#I_and_XIV_nakal_container_for_construction').hide();
                $('#I_and_XIV_nakal_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.I_and_XIV_nakal);
                $('#I_and_XIV_nakal_name_container_for_construction').show();
                $('#I_and_XIV_nakal_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.I_and_XIV_nakal);
            }
            if (formData.building_plan_dcr != '') {
                $('#building_plan_dcr_container_for_construction').hide();
                $('#building_plan_dcr_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.building_plan_dcr);
                $('#building_plan_dcr_name_container_for_construction').show();
                $('#building_plan_dcr_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.building_plan_dcr);
            }
            if (formData.cost_estimate != '') {
                $('#cost_estimate_container_for_construction').hide();
                $('#cost_estimate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.cost_estimate);
                $('#cost_estimate_name_container_for_construction').show();
                $('#cost_estimate_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.cost_estimate);
            }
            if (formData.noc_coast_guard != '') {
                $('#noc_coast_guard_container_for_construction').hide();
                $('#noc_coast_guard_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.noc_coast_guard);
                $('#noc_coast_guard_name_container_for_construction').show();
                $('#noc_coast_guard_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.noc_coast_guard);
            }
            if (formData.provisional_noc_fire != '') {
                $('#provisional_noc_fire_container_for_construction').hide();
                $('#provisional_noc_fire_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.provisional_noc_fire);
                $('#provisional_noc_fire_name_container_for_construction').show();
                $('#provisional_noc_fire_download').attr("href", CONSTRUCTION_DOC_PATH + formData.provisional_noc_fire);
            }
            if (formData.crz_clearance_certificate != '') {
                $('#crz_clearance_certificate_container_for_construction').hide();
                $('#crz_clearance_certificate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.crz_clearance_certificate);
                $('#crz_clearance_certificate_name_container_for_construction').show();
                $('#crz_clearance_certificate_download').attr("href", CONSTRUCTION_DOC_PATH + formData.crz_clearance_certificate);
            }
            if (formData.sub_division_order != '') {
                $('#sub_division_order_container_for_construction').hide();
                $('#sub_division_order_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.sub_division_order);
                $('#sub_division_order_name_container_for_construction').show();
                $('#sub_division_order_download').attr("href", CONSTRUCTION_DOC_PATH + formData.sub_division_order);
            }
            if (formData.amalgamation_order != '') {
                $('#amalgamation_order_container_for_construction').hide();
                $('#amalgamation_order_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.amalgamation_order);
                $('#amalgamation_order_name_container_for_construction').show();
                $('#amalgamation_order_download').attr("href", CONSTRUCTION_DOC_PATH + formData.amalgamation_order);
            }
            if (formData.occupancy_certificate != '') {
                $('#occupancy_certificate_container_for_construction').hide();
                $('#occupancy_certificate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.occupancy_certificate);
                $('#occupancy_certificate_name_container_for_construction').show();
                $('#occupancy_certificate_download').attr("href", CONSTRUCTION_DOC_PATH + formData.occupancy_certificate);
            }
            if (formData.certificate_land_acquisition != '') {
                $('#certificate_land_acquisition_container_for_construction').hide();
                $('#certificate_land_acquisition_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.certificate_land_acquisition);
                $('#certificate_land_acquisition_name_container_for_construction').show();
                $('#certificate_land_acquisition_download').attr("href", CONSTRUCTION_DOC_PATH + formData.certificate_land_acquisition);
            }
            if (formData.annexure_VI != '') {
                $('#annexure_VI_container_for_construction').hide();
                $('#annexure_VI_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_VI);
                $('#annexure_VI_name_container_for_construction').show();
                $('#annexure_VI_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_VI);
            }
            if (formData.layout_plan != '') {
                $('#layout_plan_container_for_construction').hide();
                $('#layout_plan_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.layout_plan);
                $('#layout_plan_name_container_for_construction').show();
                $('#layout_plan_download').attr("href", CONSTRUCTION_DOC_PATH + formData.layout_plan);
            }
            if (formData.licensed_engineer_signature != '') {
                $('#licensed_engineer_signature_container_for_construction').hide();
                $('#licensed_engineer_signature_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.licensed_engineer_signature);
                $('#licensed_engineer_signature_name_container_for_construction').show();
                $('#licensed_engineer_signature_download').attr("href", CONSTRUCTION_DOC_PATH + formData.licensed_engineer_signature);
            }
            if (formData.labour_cess != '') {
                $('#labour_cess_container_for_construction').hide();
                $('#labour_cess_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.labour_cess);
                $('#labour_cess_name_container_for_construction').show();
                $('#labour_cess_download').attr("href", CONSTRUCTION_DOC_PATH + formData.labour_cess);
            }
            if (formData.undertaking != '') {
                $('#undertaking_container_for_construction').hide();
                $('#undertaking_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.undertaking);
                $('#undertaking_name_container_for_construction').show();
                $('#undertaking_download').attr("href", CONSTRUCTION_DOC_PATH + formData.undertaking);
            }
            if (formData.fire_noc != '') {
                $('#fire_noc_container_for_construction').hide();
                $('#fire_noc_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.fire_noc);
                $('#fire_noc_name_container_for_construction').show();
                $('#fire_noc_download').attr("href", CONSTRUCTION_DOC_PATH + formData.fire_noc);
            }
            if (formData.owner_signature != '') {
                $('#owner_signature_container_for_construction').hide();
                $('#owner_signature_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.owner_signature);
                $('#owner_signature_name_container_for_construction').show();
                $('#owner_signature_download').attr("href", CONSTRUCTION_DOC_PATH + formData.owner_signature);
            }
        }

        generateSelect2();
        datePicker();
        $('#construction_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitConstruction($('#submit_btn_for_construction'));
            }
        });
    },
    editOrViewConstruction: function (btnObj, constructionId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!constructionId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'construction/get_construction_data_by_id',
            type: 'post',
            data: $.extend({}, {'construction_id': constructionId}, getTokenData()),
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
                    that.newConstructionForm(isEdit, parseData);
                } else {
                    that.viewConstructionForm(parseData);
                }
            }
        });
    },
    viewConstructionForm: function (parseData) {
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
        var formData = parseData.construction_data;
        Construction.router.navigate('view_construction_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT
        showFormContainer('construction');
        $('#construction_form_container').html(constructionViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        that.getDepartmentdata(district);
        if (formData.provisional_noc == IS_CHECKED_YES) {
            $('#provisional_noc_yes').attr('checked', 'checked');
            $('.provisional_noc_div').show();
        } else if (formData.provisional_noc == IS_CHECKED_NO) {
            $('#provisional_noc_no').attr('checked', 'checked');
        }
        if (formData.crz_clearance == IS_CHECKED_YES) {
            $('#crz_clearance_yes').attr('checked', 'checked');
            $('.crz_clearance_div').show();
        } else if (formData.crz_clearance == IS_CHECKED_NO) {
            $('#crz_clearance_no').attr('checked', 'checked');
        }
        if (formData.sub_division == IS_CHECKED_YES) {
            $('#sub_division_yes').attr('checked', 'checked');
            $('.sub_division_div').show();
        } else if (formData.sub_division == IS_CHECKED_NO) {
            $('#sub_division_no').attr('checked', 'checked');
        }
        if (formData.amalgamation == IS_CHECKED_YES) {
            $('#amalgamation_yes').attr('checked', 'checked');
            $('.amalgamation_div').show();
        } else if (formData.amalgamation == IS_CHECKED_NO) {
            $('#amalgamation_no').attr('checked', 'checked');
        }
        if (formData.occupancy == IS_CHECKED_YES) {
            $('#occupancy_yes').attr('checked', 'checked');
            $('.occupancy_div').show();
        } else if (formData.occupancy == IS_CHECKED_NO) {
            $('#occupancy_no').attr('checked', 'checked');
        }
        if (formData.certificate_land == IS_CHECKED_YES) {
            $('#certificate_land_yes').attr('checked', 'checked');
            $('.certificate_land_div').show();
        } else if (formData.certificate_land == IS_CHECKED_NO) {
            $('#certificate_land_no').attr('checked', 'checked');
        }
        if (formData.annexureV == IS_CHECKED_YES) {
            $('#annexureV_yes').attr('checked', 'checked');
            $('.annexureV_div').show();
        } else if (formData.annexureV == IS_CHECKED_NO) {
            $('#annexureV_no').attr('checked', 'checked');
        }
        if (formData.annexureVI == IS_CHECKED_YES) {
            $('#annexureVI_yes').attr('checked', 'checked');
            $('.annexureVI_div').show();
        } else if (formData.annexureVI == IS_CHECKED_NO) {
            $('#annexureVI_no').attr('checked', 'checked');
        }
        if (formData.layoutplan == IS_CHECKED_YES) {
            $('#layoutplan_yes').attr('checked', 'checked');
            $('.layoutplan_div').show();
        } else if (formData.layoutplan == IS_CHECKED_NO) {
            $('#layoutplan_no').attr('checked', 'checked');
        }



        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_construction').hide();
            $('#seal_and_stamp_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_construction').show();
            $('#seal_and_stamp_download').attr("href", CONSTRUCTION_DOC_PATH + formData.signature);
        }
        if (formData.annexure_III != '') {
            $('#annexure_III_container_for_construction').hide();
            $('#annexure_III_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_III);
            $('#annexure_III_name_container_for_construction').show();
            $('#annexure_III_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_III);
        }
        if (formData.annexure_IV != '') {
            $('#annexure_IV_container_for_construction').hide();
            $('#annexure_IV_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_IV);
            $('#annexure_IV_name_container_for_construction').show();
            $('#annexure_IV_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_IV);
        }
        if (formData.annexure_V != '') {
            $('#annexure_V_container_for_construction').hide();
            $('#annexure_V_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_V);
            $('#annexure_V_name_container_for_construction').show();
            $('#annexure_V_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_V);
        }
        if (formData.copy_of_na != '') {
            $('#copy_of_na_container_for_construction').hide();
            $('#copy_of_na_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.copy_of_na);
            $('#copy_of_na_name_container_for_construction').show();
            $('#copy_of_na_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.copy_of_na);
        }
        if (formData.original_certified_map != '') {
            $('#original_certified_map_container_for_construction').hide();
            $('#original_certified_map_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.original_certified_map);
            $('#original_certified_map_name_container_for_construction').show();
            $('#original_certified_map_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.original_certified_map);
        }
        if (formData.I_and_XIV_nakal != '') {
            $('#I_and_XIV_nakal_container_for_construction').hide();
            $('#I_and_XIV_nakal_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.I_and_XIV_nakal);
            $('#I_and_XIV_nakal_name_container_for_construction').show();
            $('#I_and_XIV_nakal_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.I_and_XIV_nakal);
        }
        if (formData.building_plan_dcr != '') {
            $('#building_plan_dcr_container_for_construction').hide();
            $('#building_plan_dcr_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.building_plan_dcr);
            $('#building_plan_dcr_name_container_for_construction').show();
            $('#building_plan_dcr_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.building_plan_dcr);
        }
        if (formData.cost_estimate != '') {
            $('#cost_estimate_container_for_construction').hide();
            $('#cost_estimate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.cost_estimate);
            $('#cost_estimate_name_container_for_construction').show();
            $('#cost_estimate_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.cost_estimate);
        }
        if (formData.noc_coast_guard != '') {
            $('#noc_coast_guard_container_for_construction').hide();
            $('#noc_coast_guard_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.noc_coast_guard);
            $('#noc_coast_guard_name_container_for_construction').show();
            $('#noc_coast_guard_name_download').attr("href", CONSTRUCTION_DOC_PATH + formData.noc_coast_guard);
        }
        if (formData.provisional_noc_fire != '') {
            $('#provisional_noc_fire_container_for_construction').hide();
            $('#provisional_noc_fire_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.provisional_noc_fire);
            $('#provisional_noc_fire_name_container_for_construction').show();
            $('#provisional_noc_fire_download').attr("href", CONSTRUCTION_DOC_PATH + formData.provisional_noc_fire);
        }
        if (formData.crz_clearance_certificate != '') {
            $('#crz_clearance_certificate_container_for_construction').hide();
            $('#crz_clearance_certificate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.crz_clearance_certificate);
            $('#crz_clearance_certificate_name_container_for_construction').show();
            $('#crz_clearance_certificate_download').attr("href", CONSTRUCTION_DOC_PATH + formData.crz_clearance_certificate);
        }
        if (formData.sub_division_order != '') {
            $('#sub_division_order_container_for_construction').hide();
            $('#sub_division_order_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.sub_division_order);
            $('#sub_division_order_name_container_for_construction').show();
            $('#sub_division_order_download').attr("href", CONSTRUCTION_DOC_PATH + formData.sub_division_order);
        }
        if (formData.amalgamation_order != '') {
            $('#amalgamation_order_container_for_construction').hide();
            $('#amalgamation_order_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.amalgamation_order);
            $('#amalgamation_order_name_container_for_construction').show();
            $('#amalgamation_order_download').attr("href", CONSTRUCTION_DOC_PATH + formData.amalgamation_order);
        }
        if (formData.occupancy_certificate != '') {
            $('#occupancy_certificate_container_for_construction').hide();
            $('#occupancy_certificate_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.occupancy_certificate);
            $('#occupancy_certificate_name_container_for_construction').show();
            $('#occupancy_certificate_download').attr("href", CONSTRUCTION_DOC_PATH + formData.occupancy_certificate);
        }
        if (formData.certificate_land_acquisition != '') {
            $('#certificate_land_acquisition_container_for_construction').hide();
            $('#certificate_land_acquisition_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.certificate_land_acquisition);
            $('#certificate_land_acquisition_name_container_for_construction').show();
            $('#certificate_land_acquisition_download').attr("href", CONSTRUCTION_DOC_PATH + formData.certificate_land_acquisition);
        }
        if (formData.annexure_VI != '') {
            $('#annexure_VI_container_for_construction').hide();
            $('#annexure_VI_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.annexure_VI);
            $('#annexure_VI_name_container_for_construction').show();
            $('#annexure_VI_download').attr("href", CONSTRUCTION_DOC_PATH + formData.annexure_VI);
        }
        if (formData.layout_plan != '') {
            $('#layout_plan_container_for_construction').hide();
            $('#layout_plan_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.layout_plan);
            $('#layout_plan_name_container_for_construction').show();
            $('#layout_plan_download').attr("href", CONSTRUCTION_DOC_PATH + formData.layout_plan);
        }
        if (formData.licensed_engineer_signature != '') {
            $('#licensed_engineer_signature_container_for_construction').hide();
            $('#licensed_engineer_signature_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.licensed_engineer_signature);
            $('#licensed_engineer_signature_name_container_for_construction').show();
            $('#licensed_engineer_signature_download').attr("href", CONSTRUCTION_DOC_PATH + formData.licensed_engineer_signature);
        }
        if (formData.labour_cess != '') {
            $('#labour_cess_container_for_construction').hide();
            $('#labour_cess_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.labour_cess);
            $('#labour_cess_name_container_for_construction').show();
            $('#labour_cess_download').attr("href", CONSTRUCTION_DOC_PATH + formData.labour_cess);
        }
        if (formData.undertaking != '') {
            $('#undertaking_container_for_construction').hide();
            $('#undertaking_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.undertaking);
            $('#undertaking_name_container_for_construction').show();
            $('#undertaking_download').attr("href", CONSTRUCTION_DOC_PATH + formData.undertaking);
        }
        if (formData.fire_noc != '') {
            $('#fire_noc_container_for_construction').hide();
            $('#fire_noc_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.fire_noc);
            $('#fire_noc_name_container_for_construction').show();
            $('#fire_noc_download').attr("href", CONSTRUCTION_DOC_PATH + formData.fire_noc);
        }
        if (formData.owner_signature != '') {
            $('#owner_signature_container_for_construction').hide();
            $('#owner_signature_name_image_for_construction').attr('src', CONSTRUCTION_DOC_PATH + formData.owner_signature);
            $('#owner_signature_name_container_for_construction').show();
            $('#owner_signature_download').attr("href", CONSTRUCTION_DOC_PATH + formData.owner_signature);
        }

    },
    checkValidationForConstruction: function (constructionData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!constructionData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!constructionData.name_of_owner) {
            return getBasicMessageAndFieldJSONArray('name_of_owner', ownerNameValidationMessage);
        }
        if (!constructionData.address_of_owner) {
            return getBasicMessageAndFieldJSONArray('address_of_owner', owneraddressMessage);
        }
        if (!constructionData.building_no) {
            return getBasicMessageAndFieldJSONArray('building_no', buildingNoValidationMessage);
        }
        if (!constructionData.plot_no) {
            return getBasicMessageAndFieldJSONArray('plot_no', plotNoValidationMessage);
        }
        if (!constructionData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }
        if (!constructionData.name) {
            return getBasicMessageAndFieldJSONArray('name', architectNameValidationMessage);
        }
        // if (!constructionData.license_no) {
        //     return getBasicMessageAndFieldJSONArray('license_no', architectlicenseNoValidationMessage);
        // }
        return '';
    },
    askForSubmitConstruction: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Construction.listview.submitConstruction(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitConstruction: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var constructionData = $('#construction_form').serializeFormJSON();
        var validationData = that.checkValidationForConstruction(constructionData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('construction-' + validationData.field, validationData.message);
            return false;
        }

        // if ($('#annexure_III_container_for_construction').is(':visible')) {
        //     var annexureIII = $('#annexure_III_for_construction').val();
        //     if (annexureIII == '') {
        //         $('#annexure_III_for_construction').focus();
        //         validationMessageShow('construction-annexure_III_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var annexureIIIMessage = pdffileUploadValidation('annexure_III_for_construction', 10240);
        //     if (annexureIIIMessage != '') {
        //         $('#annexure_III_for_construction').focus();
        //         validationMessageShow('construction-annexure_III_for_construction', annexureIIIMessage);
        //         return false;
        //     }
        // }
        // if ($('#annexure_IV_container_for_construction').is(':visible')) {
        //     var annexureIv = $('#annexure_IV_for_construction').val();
        //     if (annexureIv == '') {
        //         $('#annexure_IV_for_construction').focus();
        //         validationMessageShow('construction-annexure_IV_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var annexureIvMessage = pdffileUploadValidation('annexure_IV_for_construction', 10240);
        //     if (annexureIvMessage != '') {
        //         $('#annexure_IV_for_construction').focus();
        //         validationMessageShow('construction-annexure_IV_for_construction', annexureIvMessage);
        //         return false;
        //     }
        // }
        // if ($('#annexure_V_container_for_construction').is(':visible')) {
        //     var annexureV = $('#annexure_V_for_construction').val();
        //     if (annexureV == '') {
        //         $('#annexure_V_for_construction').focus();
        //         validationMessageShow('construction-annexure_V_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var annexureVMessage = pdffileUploadValidation('annexure_V_for_construction', 10240);
        //     if (annexureVMessage != '') {
        //         $('#annexure_V_for_construction').focus();
        //         validationMessageShow('construction-annexure_V_for_construction', annexureVMessage);
        //         return false;
        //     }
        // }

        // if ($('#copy_of_na_container_for_construction').is(':visible')) {
        //     var nacopy = $('#copy_of_na_for_construction').val();
        //     if (nacopy == '') {
        //         $('#copy_of_na_for_construction').focus();
        //         validationMessageShow('construction-copy_of_na_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var nacopyMessage = pdffileUploadValidation('copy_of_na_for_construction', 10240);
        //     if (nacopyMessage != '') {
        //         $('#copy_of_na_for_construction').focus();
        //         validationMessageShow('construction-copy_of_na_for_construction', nacopyMessage);
        //         return false;
        //     }
        // }
        // if ($('#original_certified_mapa_container_for_construction').is(':visible')) {
        //     var originalcertificate = $('#original_certified_mapa_for_construction').val();
        //     if (originalcertificate == '') {
        //         $('#original_certified_mapa_for_construction').focus();
        //         validationMessageShow('construction-original_certified_mapa_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var originalcertificateMessage = pdffileUploadValidation('original_certified_mapa_for_construction', 10240);
        //     if (originalcertificateMessage != '') {
        //         $('#original_certified_mapa_for_construction').focus();
        //         validationMessageShow('construction-original_certified_mapa_for_construction', originalcertificateMessage);
        //         return false;
        //     }
        // }
        // if ($('#I_and_XIV_nakal_container_for_construction').is(':visible')) {
        //     var IXIVnakal = $('#I_and_XIV_nakal_for_construction').val();
        //     if (IXIVnakal == '') {
        //         $('#I_and_XIV_nakal_for_construction').focus();
        //         validationMessageShow('construction-I_and_XIV_nakal_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var IXIVnakalMessage = pdffileUploadValidation('I_and_XIV_nakal_for_construction', 10240);
        //     if (IXIVnakalMessage != '') {
        //         $('#I_and_XIV_nakal_for_construction').focus();
        //         validationMessageShow('construction-I_and_XIV_nakal_for_construction', IXIVnakalMessage);
        //         return false;
        //     }
        // }
        // if ($('#building_plan_dcr_container_for_construction').is(':visible')) {
        //     var buildingplan = $('#building_plan_dcr_for_construction').val();
        //     if (buildingplan == '') {
        //         $('#building_plan_dcr_for_construction').focus();
        //         validationMessageShow('construction-building_plan_dcr_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var buildingplanMessage = pdffileUploadValidation('building_plan_dcr_for_construction', 10240);
        //     if (buildingplanMessage != '') {
        //         $('#building_plan_dcr_for_construction').focus();
        //         validationMessageShow('construction-building_plan_dcr_for_construction', buildingplanMessage);
        //         return false;
        //     }
        // }
        // if ($('#cost_estimate_container_for_construction').is(':visible')) {
        //     var cost = $('#cost_estimate_for_construction').val();
        //     if (cost == '') {
        //         $('#cost_estimate_for_construction').focus();
        //         validationMessageShow('construction-cost_estimate_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var costMessage = pdffileUploadValidation('cost_estimate_for_construction', 10240);
        //     if (costMessage != '') {
        //         $('#cost_estimate_for_construction').focus();
        //         validationMessageShow('construction-cost_estimate_for_construction', costMessage);
        //         return false;
        //     }
        // }
        // if ($('#noc_coast_guard_container_for_construction').is(':visible')) {
        //     var noccoast = $('#noc_coast_guard_for_construction').val();
        //     if (noccoast == '') {
        //         $('#noc_coast_guard_for_construction').focus();
        //         validationMessageShow('construction-noc_coast_guard_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var noccoastMessage = pdffileUploadValidation('noc_coast_guard_for_construction', 10240);
        //     if (noccoastMessage != '') {
        //         $('#noc_coast_guard_for_construction').focus();
        //         validationMessageShow('construction-noc_coast_guard_for_construction', noccoastMessage);
        //         return false;
        //     }
        // }
        // if ($('#provisional_noc_fire_container_for_construction').is(':visible')) {
        //     var provisionalnoc = $('#provisional_noc_fire_for_construction').val();
        //     if (provisionalnoc == '') {
        //         $('#provisional_noc_fire_for_construction').focus();
        //         validationMessageShow('construction-provisional_noc_fire_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var provisionalnocMessageMessage = pdffileUploadValidation('provisional_noc_fire_for_construction');
        //     if (provisionalnocMessageMessage != '') {
        //         $('#provisional_noc_fire_for_construction').focus();
        //         validationMessageShow('construction-provisional_noc_fire_for_construction', provisionalnocMessageMessage);
        //         return false;
        //     }
        // }
        // if ($('#crz_clearance_certificate_container_for_construction').is(':visible')) {
        //     var crzcertifiacte = $('#crz_clearance_certificate_for_construction').val();
        //     if (crzcertifiacte == '') {
        //         $('#crz_clearance_certificate_for_construction').focus();
        //         validationMessageShow('construction-crz_clearance_certificate_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var crzcertifiacteMessageMessage = pdffileUploadValidation('crz_clearance_certificate_for_construction');
        //     if (crzcertifiacteMessageMessage != '') {
        //         $('#crz_clearance_certificate_for_construction').focus();
        //         validationMessageShow('construction-crz_clearance_certificate_for_construction', crzcertifiacteMessageMessage);
        //         return false;
        //     }
        // }
        // if ($('#sub_division_order_container_for_construction').is(':visible')) {
        //     var subdivision = $('#sub_division_order_for_construction').val();
        //     if (subdivision == '') {
        //         $('#sub_division_order_for_construction').focus();
        //         validationMessageShow('construction-sub_division_order_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var subdivisionMessageMessage = pdffileUploadValidation('sub_division_order_for_construction');
        //     if (subdivisionMessageMessage != '') {
        //         $('#sub_division_order_for_construction').focus();
        //         validationMessageShow('construction-sub_division_order_for_construction', subdivisionMessageMessage);
        //         return false;
        //     }
        // }
        // if ($('#amalgamation_order_container_for_construction').is(':visible')) {
        //     var amalgamation = $('#amalgamation_order_for_construction').val();
        //     if (amalgamation == '') {
        //         $('#amalgamation_order_for_construction').focus();
        //         validationMessageShow('construction-amalgamation_order_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var amalgamationMessageMessage = pdffileUploadValidation('amalgamation_order_for_construction');
        //     if (amalgamationMessageMessage != '') {
        //         $('#amalgamation_order_for_construction').focus();
        //         validationMessageShow('construction-amalgamation_order_for_construction', amalgamationMessageMessage);
        //         return false;
        //     }
        // }
        // if ($('#occupancy_certificate_container_for_construction').is(':visible')) {
        //     var occupancycertificate = $('#occupancy_certificate_for_construction').val();
        //     if (occupancycertificate == '') {
        //         $('#occupancy_certificate_for_construction').focus();
        //         validationMessageShow('construction-occupancy_certificate_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var occupancycertificateMessageMessage = pdffileUploadValidation('occupancy_certificate_for_construction');
        //     if (occupancycertificateMessageMessage != '') {
        //         $('#occupancy_certificate_for_construction').focus();
        //         validationMessageShow('construction-occupancy_certificate_for_construction', occupancycertificateMessageMessage);
        //         return false;
        //     }
        // }
        // if ($('#certificate_land_acquisition_container_for_construction').is(':visible')) {
        //     var certificateland = $('#certificate_land_acquisition_for_construction').val();
        //     if (certificateland == '') {
        //         $('#certificate_land_acquisition_for_construction').focus();
        //         validationMessageShow('construction-certificate_land_acquisition_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var certificatelandMessageMessage = pdffileUploadValidation('certificate_land_acquisition_for_construction');
        //     if (certificatelandMessageMessage != '') {
        //         $('#certificate_land_acquisition_for_construction').focus();
        //         validationMessageShow('construction-certificate_land_acquisition_for_construction', certificatelandMessageMessage);
        //         return false;
        //     }
        // }

        // if ($('#seal_and_stamp_container_for_construction').is(':visible')) {
        //     var sealAndStamp = $('#seal_and_stamp_for_construction').val();
        //     if (sealAndStamp == '') {
        //         $('#seal_and_stamp_for_construction').focus();
        //         validationMessageShow('construction-seal_and_stamp_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_construction');
        //     if (sealAndStampMessage != '') {
        //         $('#seal_and_stamp_for_construction').focus();
        //         validationMessageShow('construction-seal_and_stamp_for_construction', sealAndStampMessage);
        //         return false;
        //     }
        // }

        // if ($('#annexure_VI_container_for_construction').is(':visible')) {
        //     var annaxureVI = $('#annexure_VI_for_construction').val();
        //     if (annaxureVI == '') {
        //         $('#annexure_VI_for_construction').focus();
        //         validationMessageShow('construction-annexure_VI_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var certificatelandMessageMessage = pdffileUploadValidation('annexure_VI_for_construction');
        //     if (certificatelandMessageMessage != '') {
        //         $('#annexure_VI_for_construction').focus();
        //         validationMessageShow('construction-annexure_VI_for_construction', certificatelandMessageMessage);
        //         return false;
        //     }
        // }

        // if ($('#layout_plan_container_for_construction').is(':visible')) {
        //     var layoutplan = $('#layout_plan_for_construction').val();
        //     if (layoutplan == '') {
        //         $('#layout_plan_for_construction').focus();
        //         validationMessageShow('construction-layout_plan_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var certificatelandMessageMessage = pdffileUploadValidation('layout_plan_for_construction');
        //     if (certificatelandMessageMessage != '') {
        //         $('#layout_plan_for_construction').focus();
        //         validationMessageShow('construction-layout_plan_for_construction', certificatelandMessageMessage);
        //         return false;
        //     }
        // }

        //   if ($('#licensed_engineer_signature_container_for_construction').is(':visible')) {
        //     var engineerSignature = $('#licensed_engineer_signature_for_construction').val();
        //     if (engineerSignature == '') {
        //         $('#licensed_engineer_signature_for_construction').focus();
        //         validationMessageShow('construction-licensed_engineer_signature_for_construction', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var certificatelandMessageMessage = fileUploadValidation('licensed_engineer_signature_for_construction');
        //     if (certificatelandMessageMessage != '') {
        //         $('#licensed_engineer_signature_for_construction').focus();
        //         validationMessageShow('construction-licensed_engineer_signature_for_construction', certificatelandMessageMessage);
        //         return false;
        //     }
        // }



        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_construction') : $('#submit_btn_for_construction');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var constructionData = new FormData($('#construction_form')[0]);
        constructionData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        constructionData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'construction/submit_construction',
            data: constructionData,
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
                validationMessageShow('construction', textStatus.statusText);
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
                    validationMessageShow('construction', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Construction.router.navigate('construction', {'trigger': true});
            }
        });
    },
    askForRemove: function (constructionId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Construction.listview.removeDocument(\'' + constructionId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (constructionId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'construction/remove_document',
            data: $.extend({}, {'construction_id': constructionId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('construction', textStatus.statusText);
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
                    validationMessageShow('construction', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                // if (docType == 1) {
                //     $('#support_document_name_container_for_construction').hide();
                //     $('#support_document_name_image_for_construction').attr('src', '');
                //     $('#support_document_container_for_construction').show();
                //     $('#support_document_for_construction').val('');
                // }
                // if (docType == 2) {
                //     $('#seal_and_stamp_name_container_for_construction').hide();
                //     $('#seal_and_stamp_name_image_for_construction').attr('src', '');
                //     $('#seal_and_stamp_container_for_construction').show();
                //     $('#seal_and_stamp_for_construction').val('');
                // }

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
    generateForm1: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#construction_id_for_construction_form1').val(constructionId);
        $('#construction_form1_pdf_form').submit();
        $('#construction_id_for_construction_form1').val('');
    },
    openUploadChallan: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + constructionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'construction/get_construction_data_by_construction_id',
            type: 'post',
            data: $.extend({}, {'construction_id': constructionId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var constructionData = parseData.construction_data;
                showPopup();
                if (constructionData.status != VALUE_FOUR && constructionData.status != VALUE_FIVE && constructionData.status != VALUE_SIX && constructionData.status != VALUE_SEVEN && constructionData.status != VALUE_EIGHT) {
                    constructionData.show_remove_upload_btn = true;
                }
                if (constructionData.payment_type == VALUE_ONE) {
                    constructionData.utitle = 'Challan Copy';
                } else {
                    constructionData.utitle = 'Payment Details';
                }
                constructionData.module_type = VALUE_TWENTYSIX;
                $('#popup_container').html(constructionUploadChallanTemplate(constructionData));
                loadFB(VALUE_TWENTYSIX, parseData.fb_data, constructionData.payment_type, constructionData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'construction_upload_challan', constructionData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'construction_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYSIX);
                if (constructionData.challan != '') {
                    $('#challan_container_for_construction_upload_challan').hide();
                    $('#challan_name_container_for_construction_upload_challan').show();
                    $('#challan_name_href_for_construction_upload_challan').attr('href', 'documents/construction/' + constructionData.challan);
                    $('#challan_name_for_construction_upload_challan').html(constructionData.challan);
                    $('#challan_remove_btn_for_construction_upload_challan').attr('onclick', 'Construction.listview.removeChallan("' + constructionData.construction_id + '")');
                }
            }
        });
    },
    removeChallan: function (constructionId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'construction/remove_challan',
            data: $.extend({}, {'construction_id': constructionId}, getTokenData()),
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
                validationMessageShow('construction-uc', textStatus.statusText);
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
                    validationMessageShow('construction-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-construction-uc').html(parseData.message);
                removeDocument('challan', 'construction_upload_challan');
                $('#status_' + constructionId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-construction-uc').html('');
        validationMessageHide();
        var constructionId = $('#construction_id_for_construction_upload_challan').val();
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_construction_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_construction_upload_challan_1').focus();
            validationMessageShow('construction-uc-payment_type_for_construction_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_construction_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_construction_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_construction_upload_challan').focus();
                validationMessageShow('construction-uc-challan_for_construction_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_construction_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_construction_upload_challan').focus();
                validationMessageShow('construction-uc-challan_for_construction_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYSIX, 'construction-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_construction_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#construction_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'construction/upload_challan',
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
                validationMessageShow('construction-uc', textStatus.statusText);
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
                    validationMessageShow('construction-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + constructionId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + constructionId).show();
                }
                $('#total_fees_' + constructionId).html(returnFees(parseData));
                showSuccess(parseData.message);
                that.loadConstructionData();
            }
        });
    },
    askForApproveApplication: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + constructionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'construction/get_construction_data_by_construction_id',
            type: 'post',
            data: $.extend({}, {'construction_id': constructionId}, getTokenData()),
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
                var constructionData = parseData.construction_data;
                showPopup();
                $('#popup_container').html(constructionApproveTemplate(constructionData));
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
        var formData = $('#approve_construction_form').serializeFormJSON();
        if (!formData.construction_id_for_construction_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_construction_approve', 10240);
        if (certficateMessage != '') {
            $('#certificate_file_for_construction_approve').focus();
            validationMessageShow('construction-approve-certificate_file_for_construction_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_construction_approve) {
            $('#remarks_for_construction_approve').focus();
            validationMessageShow('construction-approve-remarks_for_construction_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_construction_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_construction_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'construction/approve_application',
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
                validationMessageShow('construction-approve', textStatus.statusText);
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
                    validationMessageShow('construction-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.construction_id_for_construction_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.construction_id_for_construction_approve).remove();
                $('#approve_btn_for_app_' + formData.construction_id_for_construction_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.construction_id_for_construction_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.construction_id_for_construction_approve).show();
                $('#so_status_' + formData.construction_id_for_construction_approve).html(dateTimeDays(formData.construction_id_for_construction_approve, parseData, VALUE_TWENTYSIX));
                //that.loadCLACTData();
            }
        });
    },
    askForRejectApplication: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + constructionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'construction/get_construction_data_by_construction_id',
            type: 'post',
            data: $.extend({}, {'construction_id': constructionId}, getTokenData()),
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
                var constructionData = parseData.construction_data;
                showPopup();
                $('#popup_container').html(constructionRejectTemplate(constructionData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_construction_form').serializeFormJSON();
        if (!formData.construction_id_for_construction_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_construction_reject) {
            $('#remarks_for_construction_reject').focus();
            validationMessageShow('construction-reject-remarks_for_construction_reject', constructionRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'construction/reject_application',
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
                validationMessageShow('construction-reject', textStatus.statusText);
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
                    validationMessageShow('construction-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.construction_id_for_construction_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.construction_id_for_construction_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.construction_id_for_construction_reject).remove();
                $('#reject_btn_for_app_' + formData.construction_id_for_construction_reject).remove();
                $('#approve_btn_for_app_' + formData.construction_id_for_construction_reject).remove();
                $('#so_status_' + formData.construction_id_for_construction_reject).html(dateTimeDays(formData.construction_id_for_construction_reject, parseData, VALUE_TWENTYSIX));
                // that.loadConstructionData();
            }
        });
    },
    generateCertificate: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#construction_id_for_certificate').val(constructionId);
        $('#construction_certificate_pdf_form').submit();
        $('#construction_id_for_certificate').val('');
    },
    getQueryData: function (constructionId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!constructionId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYSIX;
        templateData.module_id = constructionId;
        var btnObj = $('#query_btn_for_construction_' + constructionId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYSIX, moduleData.construction_id);
                tmpData.applicant_name = moduleData.name_of_owner;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_TWENTYSIX;
                tmpData.module_id = constructionId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (constructionId) {
        if (!constructionId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + constructionId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'construction/get_construction_data_by_construction_id',
            type: 'post',
            data: $.extend({}, {'construction_id': constructionId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var constructionData = parseData.construction_data;
                showPopup();
                if (constructionData.payment_type == VALUE_ONE || constructionData.payment_type == VALUE_THREE) {
                    constructionData.user_payment_type_text = paymentTypeArray[constructionData.payment_type];
                } else {
                    constructionData.user_payment_type_text = userPaymentTypeArray[constructionData.user_payment_type] ? userPaymentTypeArray[constructionData.user_payment_type] : '';
                }
                if (constructionData.payment_type == VALUE_ONE) {
                    constructionData.utitle = 'Fees Paid Challan Copy';
                } else if (constructionData.payment_type == VALUE_TWO && constructionData.user_payment_type == VALUE_ONE) {
                    constructionData.utitle = 'Demand Draft (DD) Copy';
                }
                constructionData.module_type = VALUE_TWENTYSIX;
                $('#popup_container').html(constructionViewPaymentTemplate(constructionData));
                loadFB(VALUE_TWENTYSIX, parseData.fb_data, constructionData.payment_type);
                loadPH(VALUE_TWENTYSIX, constructionData.construction_id, parseData.ph_data);
                if (constructionData.payment_type == VALUE_ONE || (constructionData.payment_type == VALUE_TWO && constructionData.user_payment_type == VALUE_ONE)) {
                    if (constructionData.fees_paid_challan != '') {
                        $('#vp_container_for_construction').show();
                        $('#fees_paid_challan_name_href_for_construction').attr('href', CONSTRUCTION_DOC_PATH + constructionData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_construction').html(constructionData.fees_paid_challan);
                    }
                }
            }
        });
    },
    getDepartmentdata: function (department) {
        var val = department.value;
        if (val == '') {
            return false;
        }
        if (val === '1') {

            this.$('.dd_for_cp_div').show();
            this.$('.dnh_for_cp_div').hide();
            this.$('.annexure_III_item_container_for_construction').show();
            this.$('.annexure_IV_item_container_for_construction').show();
            this.$('.copy_of_na_item_container_for_construction').show();
            this.$('.original_certified_map_item_container_for_construction').show();
            this.$('.I_and_XIV_nakal_item_container_for_construction').show();
            this.$('.building_plan_dcr_item_container_for_construction').show();
            this.$('.cost_estimate_item_container_for_construction').show();
            this.$('.noc_coast_guard_item_container_for_construction').show();
            this.$('.annexure_V_item_container_for_construction').show();
            this.$('.annexureVI_item_container_for_construction').show();
            this.$('.layout_plan_item_container_for_construction').show();
            this.$('.provisional_noc_fire_item_container_for_construction').show();
            this.$('.crz_clearance_certificate_item_container_for_construction').show();
            this.$('.sub_division_order_item_container_for_construction').show();
            this.$('.amalgamation_order_item_container_for_construction').show();
            this.$('.occupancy_certificate_item_container_for_construction').show();
            this.$('.certificate_land_acquisition_item_container_for_construction').show();
            this.$('.seal_and_stamp_item_container_for_construction').show();
            this.$('.licensed_engineer_signature_item_container_for_construction').show();
            this.$('.labour_cess_item_container_for_construction').hide();
            this.$('.undertaking_item_container_for_construction').hide();
            this.$('.fire_noc_item_container_for_construction').hide();
            this.$('.owner_signature_item_container_for_construction').hide();
        }
        if (val === '2') {

            this.$('.dd_for_cp_div').show();
            this.$('.dnh_for_cp_div').hide();
            this.$('.annexure_III_item_container_for_construction').show();
            this.$('.annexure_IV_item_container_for_construction').show();
            this.$('.copy_of_na_item_container_for_construction').show();
            this.$('.original_certified_map_item_container_for_construction').show();
            this.$('.I_and_XIV_nakal_item_container_for_construction').show();
            this.$('.building_plan_dcr_item_container_for_construction').show();
            this.$('.cost_estimate_item_container_for_construction').show();
            this.$('.noc_coast_guard_item_container_for_construction').show();
            this.$('.annexure_V_item_container_for_construction').show();
            this.$('.annexureVI_item_container_for_construction').show();
            this.$('.layout_plan_item_container_for_construction').show();
            this.$('.provisional_noc_fire_item_container_for_construction').show();
            this.$('.crz_clearance_certificate_item_container_for_construction').show();
            this.$('.sub_division_order_item_container_for_construction').show();
            this.$('.amalgamation_order_item_container_for_construction').show();
            this.$('.occupancy_certificate_item_container_for_construction').show();
            this.$('.certificate_land_acquisition_item_container_for_construction').show();
            this.$('.seal_and_stamp_item_container_for_construction').show();
            this.$('.licensed_engineer_signature_item_container_for_construction').show();
            this.$('.labour_cess_item_container_for_construction').hide();
            this.$('.undertaking_item_container_for_construction').hide();
            this.$('.fire_noc_item_container_for_construction').hide();
            this.$('.owner_signature_item_container_for_construction').hide();
        }
        if (val === '3') {
            this.$('.dd_for_cp_div').hide();
            this.$('.dnh_for_cp_div').show();
            this.$('.annexure_III_item_container_for_construction').show();
            this.$('.annexure_IV_item_container_for_construction').hide();
            this.$('.copy_of_na_item_container_for_construction').show();
            this.$('.original_certified_map_item_container_for_construction').show();
            this.$('.I_and_XIV_nakal_item_container_for_construction').show();
            this.$('.building_plan_dcr_item_container_for_construction').show();
            this.$('.cost_estimate_item_container_for_construction').hide();
            this.$('.noc_coast_guard_item_container_for_construction').hide();
            this.$('.annexure_V_item_container_for_construction').hide();
            this.$('.annexureVI_item_container_for_construction').hide();
            this.$('.layout_plan_item_container_for_construction').show();
            this.$('.provisional_noc_fire_item_container_for_construction').hide();
            this.$('.crz_clearance_certificate_item_container_for_construction').hide();
            this.$('.sub_division_order_item_container_for_construction').show();
            this.$('.amalgamation_order_item_container_for_construction').hide();
            this.$('.occupancy_certificate_item_container_for_construction').show();
            this.$('.certificate_land_acquisition_item_container_for_construction').hide();
            this.$('.seal_and_stamp_item_container_for_construction').hide();
            this.$('.licensed_engineer_signature_item_container_for_construction').hide();
            this.$('.labour_cess_item_container_for_construction').show();
            this.$('.undertaking_item_container_for_construction').show();
            this.$('.fire_noc_item_container_for_construction').show();
            this.$('.owner_signature_item_container_for_construction').show();
        }
    },
});
