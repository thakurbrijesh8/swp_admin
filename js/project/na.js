var naListTemplate = Handlebars.compile($('#na_list_template').html());
var naTableTemplate = Handlebars.compile($('#na_table_template').html());
var naActionTemplate = Handlebars.compile($('#na_action_template').html());
var naFormTemplate = Handlebars.compile($('#na_form_template').html());
var naViewTemplate = Handlebars.compile($('#na_view_template').html());
var naUploadChallanTemplate = Handlebars.compile($('#na_upload_challan_template').html());
var naApproveTemplate = Handlebars.compile($('#na_approve_template').html());
var naRejectTemplate = Handlebars.compile($('#na_reject_template').html());
var naViewPaymentTemplate = Handlebars.compile($('#na_view_payment_template').html());
var naApplicantInfoTemplate = Handlebars.compile($('#na_applicant_info_template').html());

var tempApplicantCnt = 1;

var Na = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Na.Router = Backbone.Router.extend({
    routes: {
        'na': 'renderList',
        'na_form': 'renderList',
        'edit_na_form': 'renderList',
        'view_na_form': 'renderList',
    },
    renderList: function () {
        Na.listview.listPage();
    },
    renderListForForm: function () {
        Na.listview.listPageNaForm();
    }
});
Na.listView = Backbone.View.extend({
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
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        addClass('na', 'active');
        Na.router.navigate('na');
        var templateData = {};
        this.$el.html(naListTemplate(templateData));
        this.loadNaData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageNaForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        this.$el.html(naListTemplate);
        this.newNaForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return naActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTY;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return naActionTemplate(rowData);
    },
    loadNaData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.occupation;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTY, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTY);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['na_data'], function (index, objData) {
                json['na_data'][index]['query_movement_string'] = qmData[objData.na_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.na_id] + '</table>') : '-';
            });
            return json['na_data'];
        };
        var that = this;
        showTableContainer('na');
        Na.router.navigate('na');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Na.listview.loadNaData();');
        $('#na_datatable_container').html(naTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_na_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_na_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_na_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_na_list', false);
        //  if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_na_list', false);
        $('#district_for_na_list').val(searchData.search_district);
        $('#status_for_na_list').val(searchData.search_status);
        $('#app_timing_for_na_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_na_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_na_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_na_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_na_list').attr('disabled', 'disabled');
        }
        naDataTable = $('#na_datatable').DataTable({
            ajax: {url: 'na/get_na_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'na_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'na_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'na_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'na_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  } 
        $('#na_datatable_filter').remove();
        $('#na_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = naDataTable.row(tr);

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
    newNaForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
//        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
//            Dashboard.router.navigate('dashboard', {trigger: true});
//            return false;
//        }
        var that = this;
        if (isEdit) {
            var formData = parseData.na_data;
            Na.router.navigate('edit_na_form');
        } else {
            var formData = {};
            Na.router.navigate('na_form');
        }
        var templateData = {};
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.na_data = parseData.na_data;
        showFormContainer('na');
        $('#na_form_container').html(naFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#declaration_for_na').attr('checked', 'checked');
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
//            $('#area_of_site_used').val(formData.area_of_site_used);
//            $('#occupant_class').val(formData.occupant_class);
//            $('#situated_land').val(formData.situated_land);
//
//            if (formData.electrical_distance_land == IS_CHECKED_YES) {
//                $('#electrical_distance_land_yes').attr('checked', 'checked');
//            } else if (formData.electrical_distance_land == IS_CHECKED_NO) {
//                $('#electrical_distance_land_no').attr('checked', 'checked');
//            }
//
//            if (formData.acquisition_under_land == IS_CHECKED_YES) {
//                $('#acquisition_under_land_yes').attr('checked', 'checked');
//            } else if (formData.acquisition_under_land == IS_CHECKED_NO) {
//                $('#acquisition_under_land_no').attr('checked', 'checked');
//            }
//
//            if (formData.accessible_land == IS_CHECKED_YES) {
//                $('#accessible_land_yes').attr('checked', 'checked');
//            } else if (formData.accessible_land == IS_CHECKED_NO) {
//                $('#accessible_land_no').attr('checked', 'checked');
//            }
//
//            if (formData.site_access_land == IS_CHECKED_YES) {
//                $('#site_access_land_yes').attr('checked', 'checked');
//            } else if (formData.site_access_land == IS_CHECKED_NO) {
//                $('#site_access_land_no').attr('checked', 'checked');
//            }
//
//            if (formData.rejected_land == IS_CHECKED_YES) {
//                $('#rejected_land_yes').attr('checked', 'checked');
//            } else if (formData.rejected_land == IS_CHECKED_NO) {
//                $('#rejected_land_no').attr('checked', 'checked');
//            }

            if (formData.certified_copy != '') {
                that.showDocument('certified_copy_container', 'certified_copy_name_image', 'certified_copy_name_container',
                        'certified_copy_download', 'certified_copy_remove_btn', formData.certified_copy, formData.na_id, VALUE_FOUR);
            }
            if (formData.sketch_layout != '') {
                that.showDocument('sketch_layout_container', 'sketch_layout_name_image', 'sketch_layout_name_container',
                        'sketch_layout_download', 'sketch_layout_remove_btn', formData.sketch_layout, formData.na_id, VALUE_FIVE);
            }
            if (formData.written_consent != '') {
                that.showDocument('written_consent_container', 'written_consent_name_image', 'written_consent_name_container',
                        'written_consent_download', 'written_consent_remove_btn', formData.written_consent, formData.na_id, VALUE_SIX);
            }

            if (formData.form_land_document != '') {
                that.showDocument('form_land_document_container', 'form_land_document_name_image', 'form_land_document_name_container',
                        'form_land_document_download', 'form_land_document_remove_btn', formData.form_land_document, formData.na_id, VALUE_ONE);
            }
            if (formData.site_plan_document != '') {
                that.showDocument('site_plan_document_container', 'site_plan_document_name_image', 'site_plan_document_name_container',
                        'site_plan_document_download', 'site_plan_document_remove_btn', formData.site_plan_document, formData.na_id, VALUE_TWO);
            }
            if (formData.signature != '') {
                that.showDocument('seal_and_stamp_container_for_na', 'seal_and_stamp_name_image_for_na', 'seal_and_stamp_name_container_for_na',
                        'seal_and_stamp_download', 'seal_and_stamp_remove_btn', formData.signature, formData.na_id, VALUE_THREE);
            }

            if (formData.multiple_applicant != '') {
                var applicantInfo = JSON.parse(formData.multiple_applicant);
                $.each(applicantInfo, function (key, value) {
                    that.addMultipleApplicant(value);
                })
            }
        } else {
            that.addMultipleApplicant({});
        }
        generateSelect2();
        datePicker();
        $('#na_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitNa($('#submit_btn_for_na'));
            }
        });
    },
    editOrViewNa: function (btnObj, naId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!naId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'na/get_na_data_by_id',
            type: 'post',
            data: $.extend({}, {'na_id': naId}, getTokenData()),
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
                    that.newNaForm(isEdit, parseData);
                } else {
                    that.viewNaForm(parseData);
                }
            }
        });
    },
    viewNaForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.na_data;
        Na.router.navigate('view_na_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('na');
        $('#na_form_container').html(naViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#declaration_for_na').attr('checked', 'checked');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
//        $('#area_of_site_used').val(formData.area_of_site_used);
//        $('#occupant_class').val(formData.occupant_class);
//        $('#situated_land').val(formData.situated_land);
//
//        if (formData.electrical_distance_land == IS_CHECKED_YES) {
//            $('#electrical_distance_land_yes').attr('checked', 'checked');
//        } else if (formData.electrical_distance_land == IS_CHECKED_NO) {
//            $('#electrical_distance_land_no').attr('checked', 'checked');
//        }
//
//        if (formData.acquisition_under_land == IS_CHECKED_YES) {
//            $('#acquisition_under_land_yes').attr('checked', 'checked');
//        } else if (formData.acquisition_under_land == IS_CHECKED_NO) {
//            $('#acquisition_under_land_no').attr('checked', 'checked');
//        }
//
//        if (formData.accessible_land == IS_CHECKED_YES) {
//            $('#accessible_land_yes').attr('checked', 'checked');
//        } else if (formData.accessible_land == IS_CHECKED_NO) {
//            $('#accessible_land_no').attr('checked', 'checked');
//        }
//
//        if (formData.site_access_land == IS_CHECKED_YES) {
//            $('#site_access_land_yes').attr('checked', 'checked');
//        } else if (formData.site_access_land == IS_CHECKED_NO) {
//            $('#site_access_land_no').attr('checked', 'checked');
//        }
//
//        if (formData.rejected_land == IS_CHECKED_YES) {
//            $('#rejected_land_yes').attr('checked', 'checked');
//        } else if (formData.rejected_land == IS_CHECKED_NO) {
//            $('#rejected_land_no').attr('checked', 'checked');
//        }
        if (formData.certified_copy != '') {
            that.showDocument('certified_copy_container', 'certified_copy_name_image', 'certified_copy_name_container',
                    'certified_copy_download', 'certified_copy_remove_btn', formData.certified_copy, formData.na_id, VALUE_FOUR);
        }
        if (formData.sketch_layout != '') {
            that.showDocument('sketch_layout_container', 'sketch_layout_name_image', 'sketch_layout_name_container',
                    'sketch_layout_download', 'sketch_layout_remove_btn', formData.sketch_layout, formData.na_id, VALUE_FIVE);
        }
        if (formData.written_consent != '') {
            that.showDocument('written_consent_container', 'written_consent_name_image', 'written_consent_name_container',
                    'written_consent_download', 'written_consent_remove_btn', formData.written_consent, formData.na_id, VALUE_SIX);
        }
        if (formData.form_land_document != '') {
            that.showDocument('form_land_document_container', 'form_land_document_name_image', 'form_land_document_name_container',
                    'form_land_document_download', 'form_land_document_remove_btn', formData.form_land_document, formData.na_id, VALUE_ONE);
        }
        if (formData.site_plan_document != '') {
            that.showDocument('site_plan_document_container', 'site_plan_document_name_image', 'site_plan_document_name_container',
                    'site_plan_document_download', 'site_plan_document_remove_btn', formData.site_plan_document, formData.na_id, VALUE_TWO);
        }
        if (formData.signature != '') {
            that.showDocument('seal_and_stamp_container_for_na', 'seal_and_stamp_name_image_for_na', 'seal_and_stamp_name_container_for_na',
                    'seal_and_stamp_download', 'seal_and_stamp_remove_btn', formData.signature, formData.na_id, VALUE_THREE);
        }

        $('.remove_btn_hidden').hide();
        var applicantInfo = JSON.parse(formData.multiple_applicant);
        $.each(applicantInfo, function (key, value) {
            that.addMultipleApplicant(value);
            $(".name_of_applicant").prop("readonly", true);
            $(".address_of_applicant").prop("readonly", true);
            $('.remove_btn_hidden').hide();
        })
//        if (formData.site_plan_document != '') {
//            $('#site_plan_document_container').hide();
//            $('#site_plan_document_name_image').attr('src', NA_DOC_PATH + formData.site_plan_document);
//            $('#site_plan_document_name_container').show();
//            $('#site_plan_document_download').attr("href", NA_DOC_PATH + formData.site_plan_document);
//        }
//        if (formData.form_land_document != '') {
//            $('#form_land_document_container').hide();
//            $('#form_land_document_name_image').attr('src', NA_DOC_PATH + formData.form_land_document);
//            $('#form_land_document_name_container').show();
//            $('#form_land_document_download').attr("href", NA_DOC_PATH + formData.form_land_document);
//        }
//        if (formData.signature != '') {
//            $('#seal_and_stamp_container_for_na').hide();
//            $('#seal_and_stamp_name_image_for_na').attr('src', NA_DOC_PATH + formData.signature);
//            $('#seal_and_stamp_name_container_for_na').show();
//            $('#seal_and_stamp_download').attr("href", NA_DOC_PATH + formData.signature);
//
//        }
    },
    checkValidationForNa: function (naData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!naData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!naData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!naData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!naData.postel_address) {
            return getBasicMessageAndFieldJSONArray('postel_address', addressValidationMessage);
        }
        if (!naData.occupation) {
            return getBasicMessageAndFieldJSONArray('occupation', occupationValidationMessage);
        }
//        if (!naData.purpose) {
//            return getBasicMessageAndFieldJSONArray('purpose', naPurposeValidationMessage);
//        }
        if (!naData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }
        if (!naData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no', naSurveyNoValidationMessage);
        }
        if (!naData.area_assessment) {
            return getBasicMessageAndFieldJSONArray('area_assessment', naAreaAssessmentValidationMessage);
        }
        if (!naData.area_of_site_used) {
            return getBasicMessageAndFieldJSONArray('area_of_site_used', naAreaSiteValidationMessage);
        }
        if (!naData.occupant_class) {
            return getBasicMessageAndFieldJSONArray('occupant_class', naOccupantClassValidationMessage);
        }
        if (!naData.present_use_land) {
            return getBasicMessageAndFieldJSONArray('present_use_land', naPresentUseValidationMessage);
        }
        if (!naData.situated_land) {
            return getBasicMessageAndFieldJSONArray('situated_land', naSituatedLandValidationMessage);
        }
        if (!naData.electrical_distance_land) {
            return getBasicMessageAndFieldJSONArray('electrical_distance_land', naElectricalDistanceLandValidationMessage);
        }
        if (!naData.acquisition_under_land) {
            return getBasicMessageAndFieldJSONArray('acquisition_under_land', naAcquisitionsUnderLandValidationMessage);
        }
        if (!naData.accessible_land) {
            return getBasicMessageAndFieldJSONArray('accessible_land', naAccessibleLandValidationMessage);
        }
        if (!naData.site_access_land) {
            return getBasicMessageAndFieldJSONArray('site_access_land', naSiteAccessLandValidationMessage);
        }
        if (!naData.rejected_land) {
            return getBasicMessageAndFieldJSONArray('rejected_land', naRejectedLandValidationMessage);
        }
//        var electrical_distance_land = $('input[name=electrical_distance_land]:checked').val();
//        if (electrical_distance_land == '' || electrical_distance_land == null) {
//            $('#electrical_distance_land').focus();
//            return getBasicMessageAndFieldJSONArray('electrical_distance_land', naElectricalDistanceLandValidationMessage);
//        }
//        var acquisition_under_land = $('input[name=acquisition_under_land]:checked').val();
//        if (acquisition_under_land == '' || acquisition_under_land == null) {
//            $('#acquisition_under_land').focus();
//            return getBasicMessageAndFieldJSONArray('acquisition_under_land', naAcquisitionsUnderLandValidationMessage);
//        }
//        var accessible_land = $('input[name=accessible_land]:checked').val();
//        if (accessible_land == '' || accessible_land == null) {
//            $('#accessible_land').focus();
//            return getBasicMessageAndFieldJSONArray('accessible_land', naAccessibleLandValidationMessage);
//        }
//        var site_access_land = $('input[name=site_access_land]:checked').val();
//        if (site_access_land == '' || site_access_land == null) {
//            $('#site_access_land').focus();
//            return getBasicMessageAndFieldJSONArray('site_access_land', naSiteAccessLandValidationMessage);
//        }
//        var rejected_land = $('input[name=rejected_land]:checked').val();
//        if (rejected_land == '' || site_access_land == null) {
//            $('#rejected_land').focus();
//            return getBasicMessageAndFieldJSONArray('rejected_land', naRejectedLandValidationMessage);
//        }
        return '';
    },
    askForSubmitNa: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
//        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
//            Dashboard.router.navigate('dashboard', {trigger: true});
//            return false;
//        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Na.listview.submitNa(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitNa: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
//        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
//            Dashboard.router.navigate('dashboard', {trigger: true});
//            return false;
//        }
        var that = this;
        validationMessageHide();
        var naData = $('#na_form').serializeFormJSON();
        var validationData = that.checkValidationForNa(naData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('na-' + validationData.field, validationData.message);
            return false;
        }

        var applicantInfoItem = [];
        var isapplicantValidation = false;

        $('.applicant_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var applicantInfo = {};
            var applicantName = $('#name_of_applicant_' + cnt).val();
            if (applicantName == '' || applicantName == null) {
                $('#name_of_applicant_' + cnt).focus();
                validationMessageShow('na-name_of_applicant_' + cnt, applicantNameValidationMessage);
                isapplicantValidation = true;
                return false;
            }
            applicantInfo.name = applicantName;
            var applicantAddress = $('#address_of_applicant_' + cnt).val();
            if (applicantAddress == '' || applicantAddress == null) {
                $('#address_of_applicant_' + cnt).focus();
                validationMessageShow('na-address_of_applicant_' + cnt, applicantAddressValidationMessage);
                isapplicantValidation = true;
                return false;
            }
            applicantInfo.address = applicantAddress;

            applicantInfoItem.push(applicantInfo);
        });

        if (isapplicantValidation) {
            return false;
        }

        if (!$('#declaration_for_na').is(':checked')) {
            $('#declaration_for_na').focus();
            validationMessageShow('na-declaration_for_na', declarationOneValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_na') : $('#submit_btn_for_na');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var naData = new FormData($('#na_form')[0]);
        naData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        naData.append("applicant_data", JSON.stringify(applicantInfoItem));
        naData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'na/submit_na',
            data: naData,
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
                validationMessageShow('na', textStatus.statusText);
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
                    validationMessageShow('na', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Na.router.navigate('na', {'trigger': true});
            }
        });
    },

    askForRemove: function (naId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
//        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
//            Dashboard.router.navigate('dashboard', {trigger: true});
//            return false;
//        }
        validationMessageHide();
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Na.listview.removeDocument(\'' + naId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (naId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
//        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PWD) {
//            Dashboard.router.navigate('dashboard', {trigger: true});
//            return false;
//        }
        validationMessageHide();
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'na/remove_document',
            data: $.extend({}, {'na_id': naId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('na', textStatus.statusText);
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
                    validationMessageShow('na', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == VALUE_ONE) {
                    $('#support_document_name_container_for_na').hide();
                    $('#support_document_name_image_for_na').attr('src', '');
                    $('#support_document_container_for_na').show();
                    $('#support_document_for_na').val('');
                }
                if (docType == VALUE_TWO) {
                    $('#seal_and_stamp_name_container_for_na').hide();
                    $('#seal_and_stamp_name_image_for_na').attr('src', '');
                    $('#seal_and_stamp_container_for_na').show();
                    $('#seal_and_stamp_for_na').val('');
                }

            }
        });
    },
    generateForm: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#na_id_for_na_form').val(naId);
        $('#na_form_pdf_form').submit();
        $('#na_id_for_na_form').val('');
    },
    openUploadChallan: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + naId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'na/get_na_data_by_na_id',
            type: 'post',
            data: $.extend({}, {'na_id': naId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var naData = parseData.na_data;
                showPopup();
                if (naData.payment_type == VALUE_ONE) {
                    naData.utitle = 'Challan Copy';
                } else {
                    naData.utitle = 'Payment Details';
                }
                naData.module_type = VALUE_FOURTY;
                $('#popup_container').html(naUploadChallanTemplate(naData));
                loadFB(VALUE_FOURTY, parseData.fb_data, naData.payment_type, naData.show_remove_upload_btn, naData.show_dropdown, naData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'na_upload_challan', naData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'na_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTY);
                if (naData.challan != '') {
                    $('#challan_container_for_na_upload_challan').hide();
                    $('#challan_name_container_for_na_upload_challan').show();
                    $('#challan_name_href_for_na_upload_challan').attr('href', 'documents/na/' + naData.challan);
                    $('#challan_name_for_na_upload_challan').html(naData.challan);
                    $('#challan_remove_btn_for_na_upload_challan').attr('onclick', 'Na.listview.removeChallan("' + naData.na_id + '")');
                }
            }
        });
    },
    removeChallan: function (naId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'na/remove_challan',
            data: $.extend({}, {'na_id': naId}, getTokenData()),
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
                validationMessageShow('na-uc', textStatus.statusText);
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
                    validationMessageShow('na-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-na-uc').html(parseData.message);
                removeDocument('challan', 'na_upload_challan');
                $('#status_' + naId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-na-uc').html('');
        validationMessageHide();
        var naId = $('#na_id_for_na_upload_challan').val();
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_na_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_na_upload_challan_1').focus();
            validationMessageShow('na-uc-payment_type_for_na_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_na_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_na_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_na_upload_challan').focus();
                validationMessageShow('na-uc-challan_for_na_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_na_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_na_upload_challan').focus();
                validationMessageShow('na-uc-challan_for_na_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTY, 'na-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_na_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#na_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'na/upload_challan',
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
                validationMessageShow('na-uc', textStatus.statusText);
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
                    validationMessageShow('na-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + naId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + naId).show();
                }
                $('#total_fees_' + naId).html(returnFees(parseData));
                showSuccess(parseData.message);
//                that.loadNaData();
            }
        });
    },
    askForApproveApplication: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + naId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'na/get_na_data_by_na_id',
            type: 'post',
            data: $.extend({}, {'na_id': naId}, getTokenData()),
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
                var naData = parseData.na_data;
                showPopup();
                $('#popup_container').html(naApproveTemplate(naData));
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
        var formData = $('#approve_na_form').serializeFormJSON();
        if (!formData.na_id_for_na_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_na_approve) {
            $('#registration_number_for_na_approve').focus();
            validationMessageShow('na-approve-registration_number_for_na_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_na_approve) {
            $('#valid_upto_for_na_approve').focus();
            validationMessageShow('na-approve-valid_upto_for_na_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_na_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_na_approve').focus();
            validationMessageShow('na-approve-certificate_file_for_na_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_na_approve) {
            $('#remarks_for_na_approve').focus();
            validationMessageShow('na-approve-remarks_for_na_approve', establishmentRemarkValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_na_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_na_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'na/approve_application',
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
                validationMessageShow('na-approve', textStatus.statusText);
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
                    validationMessageShow('na-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.na_id_for_na_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.na_id_for_na_approve).remove();
                $('#approve_btn_for_app_' + formData.na_id_for_na_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.na_id_for_na_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.na_id_for_na_approve).show();
                $('#so_status_' + formData.na_id_for_na_approve).html(dateTimeDays(formData.na_id_for_na_approve, parseData, VALUE_FOURTY));
            }
        });
    },
    askForRejectApplication: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + naId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'na/get_na_data_by_na_id',
            type: 'post',
            data: $.extend({}, {'na_id': naId}, getTokenData()),
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
                var naData = parseData.na_data;
                showPopup();
                $('#popup_container').html(naRejectTemplate(naData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_na_form').serializeFormJSON();
        if (!formData.na_id_for_na_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_na_reject) {
            $('#remarks_for_na_reject').focus();
            validationMessageShow('na-reject-remarks_for_na_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'na/reject_application',
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
                validationMessageShow('na-reject', textStatus.statusText);
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
                    validationMessageShow('na-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.na_id_for_na_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.na_id_for_na_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.na_id_for_na_reject).remove();
                $('#reject_btn_for_app_' + formData.na_id_for_na_reject).remove();
                $('#approve_btn_for_app_' + formData.na_id_for_na_reject).remove();
                $('#so_status_' + formData.na_id_for_na_reject).html(dateTimeDays(formData.na_id_for_na_reject, parseData, VALUE_FOURTY));
            }
        });
    },
    generateCertificate: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#na_id_for_certificate').val(naId);
        $('#na_certificate_pdf_form').submit();
        $('#na_id_for_certificate').val('');
    },
    getQueryData: function (naId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!naId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTY;
        templateData.module_id = naId;
        var btnObj = $('#query_btn_for_na_' + naId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTY, moduleData.na_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FOURTY;
                tmpData.module_id = naId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (naId) {
        if (!naId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + naId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'na/get_na_data_by_na_id',
            type: 'post',
            data: $.extend({}, {'na_id': naId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var naData = parseData.na_data;
                showPopup();
                if (naData.payment_type == VALUE_ONE || naData.payment_type == VALUE_THREE) {
                    naData.user_payment_type_text = paymentTypeArray[naData.payment_type];
                } else {
                    naData.user_payment_type_text = userPaymentTypeArray[naData.user_payment_type] ? userPaymentTypeArray[naData.user_payment_type] : '';
                }
                if (naData.payment_type == VALUE_ONE) {
                    naData.utitle = 'Fees Paid Challan Copy';
                } else if (naData.payment_type == VALUE_TWO && naData.user_payment_type == VALUE_ONE) {
                    naData.utitle = 'Demand Draft (DD) Copy';
                }
                naData.module_type = VALUE_FOURTY;
                $('#popup_container').html(naViewPaymentTemplate(naData));
                loadFB(VALUE_FOURTY, parseData.fb_data, naData.payment_type);
                loadPH(VALUE_FOURTY, naData.na_id, parseData.ph_data);
                if (naData.payment_type == VALUE_ONE || (naData.payment_type == VALUE_TWO && naData.user_payment_type == VALUE_ONE)) {
                    if (naData.fees_paid_challan != '') {
                        $('#vp_container_for_na').show();
                        $('#fees_paid_challan_name_href_for_na').attr('href', NA_DOC_PATH + naData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_na').html(naData.fees_paid_challan);
                    }
                }
            }
        });
    },
    showDocument: function (containerHideId, documentSrcPathId, containerShowId, documenthrefPathId, removeDocumentBtnId, dbDocumentFieldName, dbDocumentFieldId, VALUE) {
        $('#' + containerHideId).hide();
        $('#' + documentSrcPathId).attr('src', NA_DOC_PATH + dbDocumentFieldName);
        $('#' + containerShowId).show();
        $('#' + documenthrefPathId).attr("href", NA_DOC_PATH + dbDocumentFieldName);
        $('#' + removeDocumentBtnId).attr('onclick', 'Na.listview.askForRemove("' + dbDocumentFieldId + '","' + VALUE + '")');
    },
    addMultipleApplicant: function (templateData) {
        templateData.per_cnt = tempApplicantCnt;
        $('#applicant_info_container').append(naApplicantInfoTemplate(templateData));
        tempApplicantCnt++;
        resetCounter('display-cnt');
    },
    removeApplicantInfo: function (perCnt) {
        $('#applicant_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
});
