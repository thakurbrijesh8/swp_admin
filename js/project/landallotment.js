var landallotmentListTemplate = Handlebars.compile($('#landallotment_list_template').html());
var landallotmentTableTemplate = Handlebars.compile($('#landallotment_table_template').html());
var landallotmentActionTemplate = Handlebars.compile($('#landallotment_action_template').html());
var landallotmentFormTemplate = Handlebars.compile($('#landallotment_form_template').html());
var landallotmentViewTemplate = Handlebars.compile($('#landallotment_view_template').html());
var landallotmentProprietorInfoTemplate = Handlebars.compile($('#landallotment_proprietor_info_template').html());
var landallotmentUploadChallanTemplate = Handlebars.compile($('#landallotment_upload_challan_template').html());
var landallotmentApproveTemplate = Handlebars.compile($('#landallotment_approve_template').html());
var landallotmentRejectTemplate = Handlebars.compile($('#landallotment_reject_template').html());
var landallotmentViewPaymentTemplate = Handlebars.compile($('#landallotment_view_payment_template').html());

var tempPersonCnt = 1;

var Landallotment = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Landallotment.Router = Backbone.Router.extend({
    routes: {
        'landallotment': 'renderList',
        'landallotment_form': 'renderList',
        'edit_landallotment_form': 'renderList',
        'view_landallotment_form': 'renderList',
    },
    renderList: function () {
        Landallotment.listview.listPage();
    },
    renderListForForm: function () {
        Landallotment.listview.listPageLandallotmentForm();
    }
});
Landallotment.listView = Backbone.View.extend({
    el: 'div#main_container',

    events: {
        'click input[name="obtained_letter_of_intent"]': 'hasObtainedLetter',
        'click input[name="regist_letter_msme"]': 'hasRegistLetterMsme',
        'click input[name="if_project_collaboration"]': 'hasProjectCollab',
        'click input[name="if_project_requires_import"]': 'hasProjectRequImp',
        'click input[name="no_of_persons_likely_emp"]': 'hasNoPersLikely',
        'click input[name="no_of_persons_likely_emp_unskilled"]': 'hasNoPersLikelyUnskilled',
        'click input[name="no_of_persons_likely_emp_staff"]': 'hasNoPersLikelyStaff',
        'click input[name="if_backward_class_bac"]': 'hasBackwardClass',
        'click input[name="if_backward_class_scst"]': 'hasBackwardClassSCST',
        'click input[name="if_backward_class_ex_serv"]': 'hasBackwardExServ',
        'click input[name="if_backward_class_wm"]': 'hasBackwardClassWomen',
        'click input[name="if_backward_class_ph"]': 'hasBackwardClassPH',
        'click input[name="if_belonging_transg"]': 'hasBelongTransg',
        'click input[name="if_bonafide"]': 'hasBonafideCerty',
        'click input[name="ifnot_state_particular_place"]': 'hasStateParticularPlace',
        'click input[name="if_promotion_council"]': 'hasPromotionCouncil',
    },

    hasObtainedLetter: function (event) {
        var val = $('input[name=obtained_letter_of_intent]:checked').val();
        if (val == '1') {
            this.$('.obtained_letter_of_intent_div').show();
        } else {
            this.$('.obtained_letter_of_intent_div').hide();

        }
    },
    hasRegistLetterMsme: function (event) {
        var val = $('input[name=regist_letter_msme]:checked').val();
        if (val == '1') {
            this.$('.regist_letter_msme_div').show();
        } else {
            this.$('.regist_letter_msme_div').hide();

        }
    },
    hasProjectCollab: function (event) {
        var val = $('input[name=if_project_collaboration]:checked').val();
        if (val == '1') {
            this.$('.if_project_collaboration_div').show();
        } else {
            this.$('.if_project_collaboration_div').hide();

        }
    },
    hasProjectRequImp: function (event) {
        var val = $('input[name=if_project_requires_import]:checked').val();
        if (val == '1') {
            this.$('.if_project_requires_import_div').show();
        } else {
            this.$('.if_project_requires_import_div').hide();

        }
    },
    hasNoPersLikely: function (event) {
        var val = $('input[name=no_of_persons_likely_emp]:checked').val();
        if (val == '1') {
            this.$('.no_of_persons_likely_emp_div').show();
        } else {
            this.$('.no_of_persons_likely_emp_div').hide();

        }
    },
    hasNoPersLikelyUnskilled: function (event) {
        var val = $('input[name=no_of_persons_likely_emp_unskilled]:checked').val();
        if (val == '1') {
            this.$('.no_of_persons_likely_emp_unskilled_div').show();
        } else {
            this.$('.no_of_persons_likely_emp_unskilled_div').hide();

        }
    },
    hasNoPersLikelyStaff: function (event) {
        var val = $('input[name=no_of_persons_likely_emp_staff]:checked').val();
        if (val == '1') {
            this.$('.no_of_persons_likely_emp_staff_div').show();
        } else {
            this.$('.no_of_persons_likely_emp_staff_div').hide();

        }
    },
    hasBackwardClass: function (event) {
        var val = $('input[name=if_backward_class_bac]:checked').val();
        if (val == '1') {
            this.$('.if_backward_class_bac_div').show();
        } else {
            this.$('.if_backward_class_bac_div').hide();

        }
    },
    hasBackwardClassSCST: function (event) {
        var val = $('input[name=if_backward_class_scst]:checked').val();
        if (val == '1') {
            this.$('.if_backward_class_scst_div').show();
        } else {
            this.$('.if_backward_class_scst_div').hide();

        }
    },
    hasBackwardExServ: function (event) {
        var val = $('input[name=if_backward_class_ex_serv]:checked').val();
        if (val == '1') {
            this.$('.if_backward_class_ex_serv_div').show();
        } else {
            this.$('.if_backward_class_ex_serv_div').hide();

        }
    },
    hasBackwardClassWomen: function (event) {
        var val = $('input[name=if_backward_class_wm]:checked').val();
        if (val == '1') {
            this.$('.if_backward_class_wm_div').show();
        } else {
            this.$('.if_backward_class_wm_div').hide();

        }
    },
    hasBackwardClassPH: function (event) {
        var val = $('input[name=if_backward_class_ph]:checked').val();
        if (val == '1') {
            this.$('.if_backward_class_ph_div').show();
        } else {
            this.$('.if_backward_class_ph_div').hide();

        }
    },
    hasBelongTransg: function (event) {
        var val = $('input[name=if_belonging_transg]:checked').val();
        if (val == '1') {
            this.$('.if_belonging_transg_div').show();
        } else {
            this.$('.if_belonging_transg_div').hide();

        }
    },

    hasBonafideCerty: function (event) {
        var val = $('input[name=if_bonafide]:checked').val();
        if (val == IS_CHECKED_YES) {
            this.$('.if_bonafide_div').show();
        } else {
            this.$('.if_bonafide_div').hide();

        }
    },
    hasStateParticularPlace: function (event) {
        var val = $('input[name=ifnot_state_particular_place]:checked').val();
        if (val == IS_CHECKED_YES) {
            this.$('.ifnot_state_particular_place_div').show();
        } else {
            this.$('.ifnot_state_particular_place_div').hide();

        }
    },
    hasPromotionCouncil: function (event) {
        var val = $('input[name=if_promotion_council]:checked').val();
        if (val == '1') {
            this.$('.if_promotion_council_div').show();
        } else {
            this.$('.if_promotion_council_div').hide();

        }
    },

    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('landallotment', 'active');
        Landallotment.router.navigate('landallotment');
        var templateData = {};
        this.$el.html(landallotmentListTemplate(templateData));
        this.loadLandallotmentData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageLandallotmentForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('landallotment', 'active');
        this.$el.html(landallotmentListTemplate);
        this.newLandallotmentForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return landallotmentActionTemplate(rowData);
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
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_TWO && rowData.status != VALUE_THREE && rowData.status != VALUE_SIX) {
            rowData.show_download_fees_paid_challan_btn = true;
            rowData.LANDALLOTMENT_DOC_PATH = LANDALLOTMENT_DOC_PATH;
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
        rowData.module_type = VALUE_TWENTYFIVE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return landallotmentActionTemplate(rowData);
    },
    loadLandallotmentData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.applicant_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTYFIVE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYFIVE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['landallotment_data'], function (index, objData) {
                json['landallotment_data'][index]['query_movement_string'] = qmData[objData.landallotment_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.landallotment_id] + '</table>') : '-';
            });
            return json['landallotment_data'];
        };
        var that = this;
        showTableContainer('landallotment');
        Landallotment.router.navigate('landallotment');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Landallotment.listview.loadLandallotmentData();');
        $('#landallotment_datatable_container').html(landallotmentTableTemplate(searchData));

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_landallotment_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_landallotment_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_landallotment_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_landallotment_list', false);
        allowOnlyIntegerValue('mobile_number_for_landallotment_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_landallotment_list', false);
        $('#district_for_landallotment_list').val(searchData.search_district);
        $('#status_for_landallotment_list').val(searchData.search_status);
        $('#app_timing_for_landallotment_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_landallotment_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_landallotment_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_landallotment_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_landallotment_list').attr('disabled', 'disabled');
        }
        landallotmentDataTable = $('#landallotment_datatable').DataTable({
            ajax: {url: 'landallotment/get_landallotment_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'landallotment_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'landallotment_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'landallotment_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'landallotment_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#landallotment_datatable_filter').remove();
        $('#landallotment_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = landallotmentDataTable.row(tr);

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
    newLandallotmentForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.landallotment_data;
            Landallotment.router.navigate('edit_landallotment_form');
        } else {
            var formData = {};
            Landallotment.router.navigate('landallotment_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VALUE_THREE = VALUE_THREE;
        templateData.VALUE_FOUR = VALUE_FOUR;
        templateData.VALUE_FIVE = VALUE_FIVE;
        templateData.VALUE_SIX = VALUE_SIX;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.landallotment_data = parseData.landallotment_data;
        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.landallotment_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('landallotment');
        $('#landallotment_form_container').html(landallotmentFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_landallotment_data', 'plot_no', 'plot_no', 'Plot No');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {

            $('#declaration').attr('checked', 'checked');
            $('#villages_for_noc_data').val(formData.village);
            $('#expansion_industry').val(formData.expansion_industry);
            $('#constitution_artical').val(formData.constitution_artical);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            that.getConstitution(constitution_artical);
            // $('#applicant_type'+ per_cnt).val(formData.applicant_type);


            $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_landallotment_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_landallotment_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


            var cnt = 1;
            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
                $('#applicant_type_' + cnt).val(value.applicant_type);
            })
        } else {
            that.addMultipleProprietor({});
        }

        if (isEdit) {
            if (formData.bio_data_doc != '') {
                $('#bio_data_doc_container_for_landallotment').hide();
                $('#bio_data_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.bio_data_doc);
                $('#bio_data_doc_name_container_for_landallotment').show();
                $('#bio_data_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.bio_data_doc);
            }
            if (formData.constitution_artical_doc != '') {
                $('#constitution_artical_doc_container_for_landallotment').hide();
                $('#constitution_artical_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.constitution_artical_doc);
                $('#constitution_artical_doc_name_container_for_landallotment').show();
                $('#constitution_artical_doc_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.constitution_artical_doc);
            }
            if (formData.obtained_letter_of_intent_doc != '') {
                $('#obtained_letter_of_intent_doc_container_for_landallotment').hide();
                $('#obtained_letter_of_intent_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.obtained_letter_of_intent_doc);
                $('#obtained_letter_of_intent_doc_name_container_for_landallotment').show();
                $('#obtained_letter_of_intent_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.obtained_letter_of_intent_doc);
            }
            if (formData.regist_letter_msme_doc != '') {
                $('#regist_letter_msme_doc_container_for_landallotment').hide();
                $('#regist_letter_msme_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.regist_letter_msme_doc);
                $('#regist_letter_msme_doc_name_container_for_landallotment').show();
                $('#regist_letter_msme_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.regist_letter_msme_doc);
            }
            if (formData.detailed_project_report_doc != '') {
                $('#detailed_project_report_doc_container_for_landallotment').hide();
                $('#detailed_project_report_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.detailed_project_report_doc);
                $('#detailed_project_report_doc_name_container_for_landallotment').show();
                $('#detailed_project_report_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.detailed_project_report_doc);
            }
            if (formData.proposed_finance_terms_doc != '') {
                $('#proposed_finance_terms_doc_container_for_landallotment').hide();
                $('#proposed_finance_terms_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.proposed_finance_terms_doc);
                $('#proposed_finance_terms_doc_name_container_for_landallotment').show();
                $('#proposed_finance_terms_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.proposed_finance_terms_doc);
            }
            if (formData.details_of_manufacturing_doc != '') {
                $('#details_of_manufacturing_doc_container_for_landallotment').hide();
                $('#details_of_manufacturing_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.details_of_manufacturing_doc);
                $('#details_of_manufacturing_doc_name_container_for_landallotment').show();
                $('#details_of_manufacturing_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.details_of_manufacturing_doc);
            }
            if (formData.if_backward_class_bac_doc != '') {
                $('#if_backward_class_bac_doc_container_for_landallotment').hide();
                $('#if_backward_class_bac_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_bac_doc);
                $('#if_backward_class_bac_doc_name_container_for_landallotment').show();
                $('#if_backward_class_bac_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_bac_doc);
            }
            if (formData.if_backward_class_scst_doc != '') {
                $('#if_backward_class_scst_doc_container_for_landallotment').hide();
                $('#if_backward_class_scst_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_scst_doc);
                $('#if_backward_class_scst_doc_name_container_for_landallotment').show();
                $('#if_backward_class_scst_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_scst_doc);
            }
            if (formData.if_backward_class_ex_serv_doc != '') {
                $('#if_backward_class_ex_serv_doc_container_for_landallotment').hide();
                $('#if_backward_class_ex_serv_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ex_serv_doc);
                $('#if_backward_class_ex_serv_doc_name_container_for_landallotment').show();
                $('#if_backward_class_ex_serv_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ex_serv_doc);
            }
            if (formData.if_backward_class_wm_doc != '') {
                $('#if_backward_class_wm_doc_container_for_landallotment').hide();
                $('#if_backward_class_wm_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_wm_doc);
                $('#if_backward_class_wm_doc_name_container_for_landallotment').show();
                $('#if_backward_class_wm_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_wm_doc);
            }
            if (formData.if_backward_class_ph_doc != '') {
                $('#if_backward_class_ph_doc_container_for_landallotment').hide();
                $('#if_backward_class_ph_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ph_doc);
                $('#if_backward_class_ph_doc_name_container_for_landallotment').show();
                $('#if_backward_class_ph_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ph_doc);
            }
            if (formData.if_belonging_transg_doc != '') {
                $('#if_belonging_transg_doc_container_for_landallotment').hide();
                $('#if_belonging_transg_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_belonging_transg_doc);
                $('#if_belonging_transg_doc_name_container_for_landallotment').show();
                $('#if_belonging_transg_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_belonging_transg_doc);
            }

            if (formData.bonafide_of_dnh_doc != '') {
                $('#bonafide_of_dnh_doc_container_for_landallotment').hide();
                $('#bonafide_of_dnh_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.bonafide_of_dnh_doc);
                $('#bonafide_of_dnh_doc_name_container_for_landallotment').show();
                $('#bonafide_of_dnh_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.bonafide_of_dnh_doc);
            }
            if (formData.information_raw_materials_doc != '') {
                $('#information_raw_materials_doc_container_for_landallotment').hide();
                $('#information_raw_materials_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.information_raw_materials_doc);
                $('#information_raw_materials_doc_name_container_for_landallotment').show();
                $('#information_raw_materials_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.information_raw_materials_doc);
            }
            if (formData.infrastructure_requirement_doc != '') {
                $('#infrastructure_requirement_doc_container_for_landallotment').hide();
                $('#infrastructure_requirement_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.infrastructure_requirement_doc);
                $('#infrastructure_requirement_doc_name_container_for_landallotment').show();
                $('#infrastructure_requirement_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.infrastructure_requirement_doc);
            }
            if (formData.effluent_teratment_doc != '') {
                $('#effluent_teratment_doc_container_for_landallotment').hide();
                $('#effluent_teratment_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.effluent_teratment_doc);
                $('#effluent_teratment_doc_name_container_for_landallotment').show();
                $('#effluent_teratment_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.effluent_teratment_doc);
            }
            if (formData.emission_of_gases_doc != '') {
                $('#emission_of_gases_doc_container_for_landallotment').hide();
                $('#emission_of_gases_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.emission_of_gases_doc);
                $('#emission_of_gases_doc_name_container_for_landallotment').show();
                $('#emission_of_gases_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.emission_of_gases_doc);
            }
            if (formData.copy_authority_letter_doc != '') {
                $('#copy_authority_letter_doc_container_for_landallotment').hide();
                $('#copy_authority_letter_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_authority_letter_doc);
                $('#copy_authority_letter_doc_name_container_for_landallotment').show();
                $('#copy_authority_letter_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_authority_letter_doc);
            }
            if (formData.copy_project_profile_doc != '') {
                $('#copy_project_profile_doc_container_for_landallotment').hide();
                $('#copy_project_profile_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_project_profile_doc);
                $('#copy_project_profile_doc_name_container_for_landallotment').show();
                $('#copy_project_profile_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_project_profile_doc);
            }
            if (formData.demand_of_deposit_draft != '') {
                $('#demand_of_deposit_draft_container_for_landallotment').hide();
                $('#demand_of_deposit_draft_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.demand_of_deposit_draft);
                $('#demand_of_deposit_draft_name_container_for_landallotment').show();
                $('#demand_of_deposit_draft_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.demand_of_deposit_draft);
            }
            if (formData.copy_proposed_land_doc != '') {
                $('#copy_proposed_land_doc_container_for_landallotment').hide();
                $('#copy_proposed_land_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_proposed_land_doc);
                $('#copy_proposed_land_doc_name_container_for_landallotment').show();
                $('#copy_proposed_land_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_proposed_land_doc);
            }
            if (formData.copy_of_partnership_deed_doc != '') {
                $('#copy_of_partnership_deed_doc_container_for_landallotment').hide();
                $('#copy_of_partnership_deed_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_of_partnership_deed_doc);
                $('#copy_of_partnership_deed_doc_name_container_for_landallotment').show();
                $('#copy_of_partnership_deed_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_of_partnership_deed_doc);
            }
            if (formData.relevant_experience_doc != '') {
                $('#relevant_experience_doc_container_for_landallotment').hide();
                $('#relevant_experience_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.relevant_experience_doc);
                $('#relevant_experience_doc_name_container_for_landallotment').show();
                $('#relevant_experience_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.relevant_experience_doc);
            }
            if (formData.certy_by_direc_indus_doc != '') {
                $('#certy_by_direc_indus_doc_container_for_landallotment').hide();
                $('#certy_by_direc_indus_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.certy_by_direc_indus_doc);
                $('#certy_by_direc_indus_doc_name_container_for_landallotment').show();
                $('#certy_by_direc_indus_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.certy_by_direc_indus_doc);
            }
            if (formData.other_relevant_doc != '') {
                $('#other_relevant_doc_container_for_landallotment').hide();
                $('#other_relevant_doc_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.other_relevant_doc);
                $('#other_relevant_doc_name_container_for_landallotment').show();
                $('#other_relevant_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.other_relevant_doc);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_landallotment').hide();
                $('#seal_and_stamp_name_image_for_landallotment').attr('src', LANDALLOTMENT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_landallotment').show();
                $('#seal_and_stamp_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.signature);
            }


            if (formData.industrial_license_necessary == isChecked) {
                $('#industrial_license_necessary').attr('checked', 'checked');
                //this.$('.obtained_letter_of_intent_div').show();
            }
            // $('#industrial_license_necessary').attr('checked', 'checked');


            if (formData.obtained_letter_of_intent == isChecked) {
                $('#obtained_letter_of_intent').attr('checked', 'checked');
                this.$('.obtained_letter_of_intent_div').show();
            }
            if (formData.regist_letter_msme == isChecked) {
                $('#regist_letter_msme').attr('checked', 'checked');
                this.$('.regist_letter_msme_div').show();
            }

            if (formData.if_project_collaboration == isChecked) {
                $('#if_project_collaboration').attr('checked', 'checked');
                this.$('.if_project_collaboration_div').show();
            }

            if (formData.if_project_requires_import == isChecked) {
                $('#if_project_requires_import').attr('checked', 'checked');
                this.$('.if_project_requires_import_div').show();
            }

            if (formData.no_of_persons_likely_emp == isChecked) {
                $('#no_of_persons_likely_emp').attr('checked', 'checked');
                this.$('.no_of_persons_likely_emp_div').show();
            }
            if (formData.no_of_persons_likely_emp_unskilled == isChecked) {
                $('#no_of_persons_likely_emp_unskilled').attr('checked', 'checked');
                this.$('.no_of_persons_likely_emp_unskilled_div').show();
            }
            if (formData.no_of_persons_likely_emp_staff == isChecked) {
                $('#no_of_persons_likely_emp_staff').attr('checked', 'checked');
                this.$('.no_of_persons_likely_emp_staff_div').show();
            }
            if (formData.if_backward_class_bac == isChecked) {
                $('#if_backward_class_bac').attr('checked', 'checked');
                this.$('.if_backward_class_bac_div').show();
            }
            if (formData.if_backward_class_scst == isChecked) {
                $('#if_backward_class_scst').attr('checked', 'checked');
                this.$('.if_backward_class_scst_div').show();
            }
            if (formData.if_backward_class_ex_serv == isChecked) {
                $('#if_backward_class_ex_serv').attr('checked', 'checked');
                this.$('.if_backward_class_ex_serv_div').show();
            }
            if (formData.if_backward_class_wm == isChecked) {
                $('#if_backward_class_wm').attr('checked', 'checked');
                this.$('.if_backward_class_wm_div').show();
            }
            if (formData.if_backward_class_ph == isChecked) {
                $('#if_backward_class_ph').attr('checked', 'checked');
                this.$('.if_backward_class_ph_div').show();
            }
            if (formData.if_belonging_transg == isChecked) {
                $('#if_belonging_transg').attr('checked', 'checked');
                this.$('.if_belonging_transg_div').show();
            }
            if (formData.if_belonging_other == isChecked) {
                $('#if_belonging_other').attr('checked', 'checked');
            }

            if (formData.if_bonafide == IS_CHECKED_YES) {
                $('#if_bonafide_yes').attr('checked', 'checked');
                $('.if_bonafide_div').show();
            } else if (formData.if_bonafide == IS_CHECKED_NO) {
                $('#if_bonafide_no').attr('checked', 'checked');
            }

            if (formData.ifnot_state_particular_place == IS_CHECKED_YES) {
                $('#ifnot_state_particular_place_yes').attr('checked', 'checked');
                $('.ifnot_state_particular_place_div').show();
            } else if (formData.ifnot_state_particular_place == IS_CHECKED_NO) {
                $('#ifnot_state_particular_place_no').attr('checked', 'checked');
            }

            if (formData.if_promotion_council == IS_CHECKED_YES) {
                $('#if_promotion_council_yes').attr('checked', 'checked');
                $('.if_promotion_council_div').show();
            } else if (formData.if_promotion_council == IS_CHECKED_NO) {
                $('#if_promotion_council_no').attr('checked', 'checked');
            }


        }

        datePicker();
        $('#landallotment_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitLandallotment($('#submit_btn_for_landallotment'));
            }
        });
    },
    editOrViewLandallotment: function (btnObj, landallotmentId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!landallotmentId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'landallotment/get_landallotment_data_by_id',
            type: 'post',
            data: $.extend({}, {'landallotment_id': landallotmentId}, getTokenData()),
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
                    that.newLandallotmentForm(isEdit, parseData);
                } else {
                    that.viewLandallotmentForm(parseData);
                }
            }
        });
    },
    viewLandallotmentForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.landallotment_data;
        Landallotment.router.navigate('view_landallotment_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        formData.VALUE_ONE = VALUE_ONE;
        formData.VALUE_TWO = VALUE_TWO;
        formData.VALUE_THREE = VALUE_THREE;
        formData.VALUE_FOUR = VALUE_FOUR;
        formData.VALUE_FIVE = VALUE_FIVE;
        formData.VALUE_SIX = VALUE_SIX;
        formData.IS_CHECKED_YES = IS_CHECKED_YES;
        formData.IS_CHECKED_NO = IS_CHECKED_NO;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('landallotment');
        $('#landallotment_form_container').html(landallotmentViewTemplate(formData));
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_landallotment_data', 'plot_no', 'plot_no', 'Plot No');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
        var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_landallotment_data', 'plot_id', 'plot_no', 'Plot No');
        $('#plot_no_for_landallotment_data').val(formData.plot_no == 0 ? '' : formData.plot_no);

        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declaration').attr('checked', 'checked');

        // $('#application_category').val(formData.application_category);
        $('#villages_for_noc_data').val(formData.village);
        $('#expansion_industry').val(formData.expansion_industry);
        $('#constitution_artical').val(formData.constitution_artical);
        that.getConstitution(constitution_artical);



        if (formData.bio_data_doc != '') {
            $('#bio_data_doc_container_for_landallotment_view').hide();
            $('#bio_data_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.bio_data_doc);
            $('#bio_data_doc_name_container_for_landallotment_view').show();
            $('#bio_data_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.bio_data_doc);
        }
        if (formData.constitution_artical_doc != '') {
            $('#constitution_artical_doc_container_for_landallotment_view').hide();
            $('#constitution_artical_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.constitution_artical_doc);
            $('#constitution_artical_doc_name_container_for_landallotment_view').show();
            $('#constitution_artical_doc_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.constitution_artical_doc);
        }
        if (formData.obtained_letter_of_intent_doc != '') {
            $('#obtained_letter_of_intent_doc_container_for_landallotment_view').hide();
            $('#obtained_letter_of_intent_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.obtained_letter_of_intent_doc);
            $('#obtained_letter_of_intent_doc_name_container_for_landallotment_view').show();
            $('#obtained_letter_of_intent_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.obtained_letter_of_intent_doc);
        }
        if (formData.regist_letter_msme_doc != '') {
            $('#regist_letter_msme_doc_container_for_landallotment_view').hide();
            $('#regist_letter_msme_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.regist_letter_msme_doc);
            $('#regist_letter_msme_doc_name_container_for_landallotment_view').show();
            $('#regist_letter_msme_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.regist_letter_msme_doc);
        }
        if (formData.detailed_project_report_doc != '') {
            $('#detailed_project_report_doc_container_for_landallotment_view').hide();
            $('#detailed_project_report_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.detailed_project_report_doc);
            $('#detailed_project_report_doc_name_container_for_landallotment_view').show();
            $('#detailed_project_report_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.detailed_project_report_doc);
        }
        if (formData.proposed_finance_terms_doc != '') {
            $('#proposed_finance_terms_doc_container_for_landallotment_view').hide();
            $('#proposed_finance_terms_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.proposed_finance_terms_doc);
            $('#proposed_finance_terms_doc_name_container_for_landallotment_view').show();
            $('#proposed_finance_terms_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.proposed_finance_terms_doc);
        }
        if (formData.details_of_manufacturing_doc != '') {
            $('#details_of_manufacturing_doc_container_for_landallotment_view').hide();
            $('#details_of_manufacturing_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.details_of_manufacturing_doc);
            $('#details_of_manufacturing_doc_name_container_for_landallotment_view').show();
            $('#details_of_manufacturing_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.details_of_manufacturing_doc);
        }
        if (formData.if_backward_class_bac_doc != '') {
            $('#if_backward_class_bac_doc_container_for_landallotment_view').hide();
            $('#if_backward_class_bac_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_bac_doc);
            $('#if_backward_class_bac_doc_name_container_for_landallotment_view').show();
            $('#if_backward_class_bac_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_bac_doc);
        }
        if (formData.if_backward_class_scst_doc != '') {
            $('#if_backward_class_scst_doc_container_for_landallotment_view').hide();
            $('#if_backward_class_scst_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_scst_doc);
            $('#if_backward_class_scst_doc_name_container_for_landallotment_view').show();
            $('#if_backward_class_scst_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_scst_doc);
        }
        if (formData.if_backward_class_ex_serv_doc != '') {
            $('#if_backward_class_ex_serv_doc_container_for_landallotment_view').hide();
            $('#if_backward_class_ex_serv_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ex_serv_doc);
            $('#if_backward_class_ex_serv_doc_name_container_for_landallotment_view').show();
            $('#if_backward_class_ex_serv_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ex_serv_doc);
        }
        if (formData.if_backward_class_wm_doc != '') {
            $('#if_backward_class_wm_doc_container_for_landallotment_view').hide();
            $('#if_backward_class_wm_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_wm_doc);
            $('#if_backward_class_wm_doc_name_container_for_landallotment_view').show();
            $('#if_backward_class_wm_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_wm_doc);
        }
        if (formData.if_belonging_transg_doc != '') {
            $('#if_belonging_transg_doc_container_for_landallotment_view').hide();
            $('#if_belonging_transg_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_belonging_transg_doc);
            $('#if_belonging_transg_doc_name_container_for_landallotment_view').show();
            $('#if_belonging_transg_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_belonging_transg_doc);
        }

        if (formData.if_backward_class_ph_doc != '') {
            $('#if_backward_class_ph_doc_container_for_landallotment_view').hide();
            $('#if_backward_class_ph_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ph_doc);
            $('#if_backward_class_ph_doc_name_container_for_landallotment_view').show();
            $('#if_backward_class_ph_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.if_backward_class_ph_doc);
        }
        if (formData.bonafide_of_dnh_doc != '') {
            $('#bonafide_of_dnh_doc_container_for_landallotment_view').hide();
            $('#bonafide_of_dnh_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.bonafide_of_dnh_doc);
            $('#bonafide_of_dnh_doc_name_container_for_landallotment_view').show();
            $('#bonafide_of_dnh_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.bonafide_of_dnh_doc);
        }
        if (formData.information_raw_materials_doc != '') {
            $('#information_raw_materials_doc_container_for_landallotment_view').hide();
            $('#information_raw_materials_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.information_raw_materials_doc);
            $('#information_raw_materials_doc_name_container_for_landallotment_view').show();
            $('#information_raw_materials_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.information_raw_materials_doc);
        }
        if (formData.infrastructure_requirement_doc != '') {
            $('#infrastructure_requirement_doc_container_for_landallotment_view').hide();
            $('#infrastructure_requirement_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.infrastructure_requirement_doc);
            $('#infrastructure_requirement_doc_name_container_for_landallotment_view').show();
            $('#infrastructure_requirement_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.infrastructure_requirement_doc);
        }
        if (formData.effluent_teratment_doc != '') {
            $('#effluent_teratment_doc_container_for_landallotment_view').hide();
            $('#effluent_teratment_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.effluent_teratment_doc);
            $('#effluent_teratment_doc_name_container_for_landallotment_view').show();
            $('#effluent_teratment_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.effluent_teratment_doc);
        }
        if (formData.emission_of_gases_doc != '') {
            $('#emission_of_gases_doc_container_for_landallotment_view').hide();
            $('#emission_of_gases_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.emission_of_gases_doc);
            $('#emission_of_gases_doc_name_container_for_landallotment_view').show();
            $('#emission_of_gases_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.emission_of_gases_doc);
        }
        if (formData.copy_authority_letter_doc != '') {
            $('#copy_authority_letter_doc_container_for_landallotment_view').hide();
            $('#copy_authority_letter_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_authority_letter_doc);
            $('#copy_authority_letter_doc_name_container_for_landallotment_view').show();
            $('#copy_authority_letter_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_authority_letter_doc);
        }
        if (formData.copy_project_profile_doc != '') {
            $('#copy_project_profile_doc_container_for_landallotment_view').hide();
            $('#copy_project_profile_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_project_profile_doc);
            $('#copy_project_profile_doc_name_container_for_landallotment_view').show();
            $('#copy_project_profile_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_project_profile_doc);
        }
        if (formData.demand_of_deposit_draft != '') {
            $('#demand_of_deposit_draft_container_for_landallotment_view').hide();
            $('#demand_of_deposit_draft_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.demand_of_deposit_draft);
            $('#demand_of_deposit_draft_name_container_for_landallotment_view').show();
            $('#demand_of_deposit_draft_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.demand_of_deposit_draft);
        }
        if (formData.copy_proposed_land_doc != '') {
            $('#copy_proposed_land_doc_container_for_landallotment_view').hide();
            $('#copy_proposed_land_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_proposed_land_doc);
            $('#copy_proposed_land_doc_name_container_for_landallotment_view').show();
            $('#copy_proposed_land_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_proposed_land_doc);
        }
        if (formData.copy_of_partnership_deed_doc != '') {
            $('#copy_of_partnership_deed_doc_container_for_landallotment_view').hide();
            $('#copy_of_partnership_deed_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.copy_of_partnership_deed_doc);
            $('#copy_of_partnership_deed_doc_name_container_for_landallotment_view').show();
            $('#copy_of_partnership_deed_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.copy_of_partnership_deed_doc);
        }
        if (formData.relevant_experience_doc != '') {
            $('#relevant_experience_doc_container_for_landallotment_view').hide();
            $('#relevant_experience_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.relevant_experience_doc);
            $('#relevant_experience_doc_name_container_for_landallotment_view').show();
            $('#relevant_experience_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.relevant_experience_doc);
        }
        if (formData.certy_by_direc_indus_doc != '') {
            $('#certy_by_direc_indus_doc_container_for_landallotment_view').hide();
            $('#certy_by_direc_indus_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.certy_by_direc_indus_doc);
            $('#certy_by_direc_indus_doc_name_container_for_landallotment_view').show();
            $('#certy_by_direc_indus_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.certy_by_direc_indus_doc);
        }
        if (formData.other_relevant_doc != '') {
            $('#other_relevant_doc_container_for_landallotment_view').hide();
            $('#other_relevant_doc_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.other_relevant_doc);
            $('#other_relevant_doc_name_container_for_landallotment_view').show();
            $('#other_relevant_doc_name_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.other_relevant_doc);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_landallotment_view').hide();
            $('#seal_and_stamp_name_image_for_landallotment_view').attr('src', LANDALLOTMENT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_landallotment_view').show();
            $('#seal_and_stamp_download').attr("href", LANDALLOTMENT_DOC_PATH + formData.signature);
        }


        if (formData.industrial_license_necessary == isChecked) {
            $('#industrial_license_necessary').attr('checked', 'checked');
            //this.$('.obtained_letter_of_intent_div').show();
        }
        // $('#industrial_license_necessary').attr('checked', 'checked');


        if (formData.obtained_letter_of_intent == isChecked) {
            $('#obtained_letter_of_intent').attr('checked', 'checked');
            this.$('.obtained_letter_of_intent_div').show();
        }
        if (formData.regist_letter_msme == isChecked) {
            $('#regist_letter_msme').attr('checked', 'checked');
            this.$('.regist_letter_msme_div').show();
        }

        if (formData.if_project_collaboration == isChecked) {
            $('#if_project_collaboration').attr('checked', 'checked');
            this.$('.if_project_collaboration_div').show();
        }

        if (formData.if_project_requires_import == isChecked) {
            $('#if_project_requires_import').attr('checked', 'checked');
            this.$('.if_project_requires_import_div').show();
        }

        if (formData.no_of_persons_likely_emp == isChecked) {
            $('#no_of_persons_likely_emp').attr('checked', 'checked');
            this.$('.no_of_persons_likely_emp_div').show();
        }
        if (formData.no_of_persons_likely_emp_unskilled == isChecked) {
            $('#no_of_persons_likely_emp_unskilled').attr('checked', 'checked');
            this.$('.no_of_persons_likely_emp_unskilled_div').show();
        }
        if (formData.no_of_persons_likely_emp_staff == isChecked) {
            $('#no_of_persons_likely_emp_staff').attr('checked', 'checked');
            this.$('.no_of_persons_likely_emp_staff_div').show();
        }
        if (formData.if_backward_class_bac == isChecked) {
            $('#if_backward_class_bac').attr('checked', 'checked');
            this.$('.if_backward_class_bac_div').show();
        }
        if (formData.if_backward_class_scst == isChecked) {
            $('#if_backward_class_scst').attr('checked', 'checked');
            this.$('.if_backward_class_scst_div').show();
        }
        if (formData.if_backward_class_ex_serv == isChecked) {
            $('#if_backward_class_ex_serv').attr('checked', 'checked');
            this.$('.if_backward_class_ex_serv_div').show();
        }
        if (formData.if_backward_class_wm == isChecked) {
            $('#if_backward_class_wm').attr('checked', 'checked');
            this.$('.if_backward_class_wm_div').show();
        }
        if (formData.if_backward_class_ph == isChecked) {
            $('#if_backward_class_ph').attr('checked', 'checked');
            this.$('.if_backward_class_ph_div').show();
        }

        if (formData.if_belonging_transg == isChecked) {
            $('#if_belonging_transg').attr('checked', 'checked');
            this.$('.if_belonging_transg_div').show();
        }
        if (formData.if_belonging_other == isChecked) {
            $('#if_belonging_other').attr('checked', 'checked');
        }

        if (formData.if_bonafide == IS_CHECKED_YES) {
            $('#if_bonafide_yes').attr('checked', 'checked');
            $('.if_bonafide_div').show();
        } else if (formData.if_bonafide == IS_CHECKED_NO) {
            $('#if_bonafide_no').attr('checked', 'checked');
        }

        if (formData.ifnot_state_particular_place == IS_CHECKED_YES) {
            $('#ifnot_state_particular_place_yes').attr('checked', 'checked');
            $('.ifnot_state_particular_place_div').show();
        } else if (formData.ifnot_state_particular_place == IS_CHECKED_NO) {
            $('#ifnot_state_particular_place_no').attr('checked', 'checked');
        }

        if (formData.if_promotion_council == IS_CHECKED_YES) {
            $('#if_promotion_council_yes').attr('checked', 'checked');
            $('.if_promotion_council_div').show();
        } else if (formData.if_promotion_council == IS_CHECKED_NO) {
            $('#if_promotion_council_no').attr('checked', 'checked');
        }

        var cnt = 1;
        var proprietorInfo = JSON.parse(formData.proprietor_details);
        $.each(proprietorInfo, function (key, value) {
            that.addMultipleProprietor(value);
            $('#applicant_type_' + cnt).val(value.applicant_type);
        })
    },
    checkValidationForLandallotment: function (landallotmentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!landallotmentData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!landallotmentData.applicant_address) {
            return getBasicMessageAndFieldJSONArray('applicant_address', applicantAddressValidationMessage);
        }
        if (!landallotmentData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!landallotmentData.telehpone_no) {
            return getBasicMessageAndFieldJSONArray('telehpone_no', telephoneNoValidationMessage);
        }
        if (!landallotmentData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data', villageNameValidationMessage);
        }
        if (!landallotmentData.plot_no_for_landallotment_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_landallotment_data', plotnoValidationMessage);
        }
        if (!landallotmentData.constitution_artical) {
            return getBasicMessageAndFieldJSONArray('constitution_artical', reasonofloanValidationMessage);
        }
        if (!landallotmentData.expansion_industry) {
            return getBasicMessageAndFieldJSONArray('expansion_industry', expansionIndustryValidationMessage);
        }
        if (!landallotmentData.nature_of_industry) {
            return getBasicMessageAndFieldJSONArray('nature_of_industry', natureOfIndustryValidationMessage);
        }
        if (!landallotmentData.possession_of_industry_plot) {
            return getBasicMessageAndFieldJSONArray('possession_of_industry_plot', possessionOfIndustryValidationMessage);
        }
        if (!landallotmentData.detail_of_space) {
            return getBasicMessageAndFieldJSONArray('detail_of_space', detailValidationMessage);
        }
        if (!landallotmentData.treatment_indicate) {
            return getBasicMessageAndFieldJSONArray('treatment_indicate', detailValidationMessage);
        }
        if (!landallotmentData.detail_of_emission_of_gases) {
            return getBasicMessageAndFieldJSONArray('detail_of_emission_of_gases', detailValidationMessage);
        }

        if (!landallotmentData.no_of_persons_likely_emp == isChecked && !landallotmentData.no_of_persons_likely_emp_unskilled == isChecked && !landallotmentData.no_of_persons_likely_emp_staff == isChecked) {
            $('#no_of_persons_likely_emp_staff').focus();
            return getBasicMessageAndFieldJSONArray('no_of_persons_likely_emp_staff', noOfPersonsLiklyEmpValidationMessage);
        }

        var ifnot_state_particular_place = $('input[name=ifnot_state_particular_place]:checked').val();
        if (ifnot_state_particular_place == '' || ifnot_state_particular_place == null) {
            $('#ifnot_state_particular_place_yes').focus();
            return getBasicMessageAndFieldJSONArray('ifnot_state_particular_place', reasonofloanValidationMessage);
        }

        return '';
    },
    askForSubmitLandallotment: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Landallotment.listview.submitLandallotment(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitLandallotment: function (moduleType) {
        //alert('hi');
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var landallotmentData = $('#landallotment_form').serializeFormJSON();
        // alert('hiiiii');
        var validationData = that.checkValidationForLandallotment(landallotmentData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('landallotment-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;

        $('.landallot_proprietor_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var proprietorInfo = {};
            var Name = $('#name_' + cnt).val();
            if (Name == '' || Name == null) {
                $('#name_' + cnt).focus();
                validationMessageShow('landallotment-' + cnt, applicantNameValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.name = Name;

            var address = $('#address_' + cnt).val();
            if (address == '' || address == null) {
                $('#address_' + cnt).focus();
                validationMessageShow('landallotment-' + cnt, applicantAddressValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.address = address;

            var ApplicantType = $('#applicant_type_' + cnt).val();
            if (ApplicantType == '' || ApplicantType == null) {
                $('#applicant_type_' + cnt).focus();
                validationMessageShow('landallotment-' + cnt, applicantTypeValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.applicant_type = ApplicantType;
            proprietorInfoItem.push(proprietorInfo);
        });


        if (isproprietorValidation) {
            return false;
        }

        if ($('#bio_data_doc_container_for_landallotment').is(':visible')) {
            var biodata = $('#bio_data_doc').val();
            if (biodata == '') {
                $('#bio_data_doc').focus();
                validationMessageShow('landallotment-bio_data_doc', uploadDocumentValidationMessage);
                return false;
            }
            var biodataMessage = fileUploadValidation('bio_data_doc');
            if (biodataMessage != '') {
                $('#bio_data_doc').focus();
                validationMessageShow('landallotment-bio_data_doc', biodataMessage);
                return false;
            }
        }



        if (landallotmentData.obtained_letter_of_intent == isChecked) {
            if ($('#obtained_letter_of_intent_doc_container_for_landallotment').is(':visible')) {
                var obtainedletter = $('#obtained_letter_of_intent_doc_for_landallotment').val();
                if (obtainedletter == '') {
                    $('#obtained_letter_of_intent_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-obtained_letter_of_intent_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var obtainedletterMessage = fileUploadValidation('obtained_letter_of_intent_doc_for_landallotment');
                if (obtainedletterMessage != '') {
                    $('#obtained_letter_of_intent_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-obtained_letter_of_intent_doc_for_landallotment', obtainedletterMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.regist_letter_msme == isChecked) {
            if ($('#regist_letter_msme_doc_container_for_landallotment').is(':visible')) {
                var registLetter = $('#regist_letter_msme_doc_for_landallotment').val();
                if (registLetter == '') {
                    $('#regist_letter_msme_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-regist_letter_msme_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var registLetterMessage = fileUploadValidation('regist_letter_msme_doc_for_landallotment');
                if (registLetterMessage != '') {
                    $('#regist_letter_msme_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-regist_letter_msme_doc_for_landallotment', registLetterMessage);
                    return false;
                }
            }
        }

        if ($('#detailed_project_report_doc_container_for_landallotment').is(':visible')) {
            var detailProject = $('#detailed_project_report_doc_for_landallotment').val();
            if (detailProject == '') {
                $('#detailed_project_report_doc_for_landallotment').focus();
                validationMessageShow('landallotment-detailed_project_report_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var detailProjectMessage = fileUploadValidation('detailed_project_report_doc_for_landallotment');
            if (detailProjectMessage != '') {
                $('#detailed_project_report_doc_for_landallotment').focus();
                validationMessageShow('landallotment-detailed_project_report_doc_for_landallotment', detailProjectMessage);
                return false;
            }
        }

        if ($('#proposed_finance_terms_doc_container_for_landallotment').is(':visible')) {
            var proposedFinance = $('#proposed_finance_terms_doc_for_landallotment').val();
            if (proposedFinance == '') {
                $('#proposed_finance_terms_doc_for_landallotment').focus();
                validationMessageShow('landallotment-proposed_finance_terms_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var proposedFinanceMessage = fileUploadValidation('proposed_finance_terms_doc_for_landallotment');
            if (proposedFinanceMessage != '') {
                $('#proposed_finance_terms_doc_for_landallotment').focus();
                validationMessageShow('landallotment-proposed_finance_terms_doc_for_landallotment', proposedFinanceMessage);
                return false;
            }
        }

        if ($('#details_of_manufacturing_doc_container_for_landallotment').is(':visible')) {
            var detailOfManufac = $('#details_of_manufacturing_doc_for_landallotment').val();
            if (detailOfManufac == '') {
                $('#details_of_manufacturing_doc_for_landallotment').focus();
                validationMessageShow('landallotment-details_of_manufacturing_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var detailOfManufacMessage = fileUploadValidation('details_of_manufacturing_doc_for_landallotment');
            if (detailOfManufacMessage != '') {
                $('#details_of_manufacturing_doc_for_landallotment').focus();
                validationMessageShow('landallotment-details_of_manufacturing_doc_for_landallotment', detailOfManufacMessage);
                return false;
            }
        }

        if (landallotmentData.if_backward_class_bac == isChecked) {
            if ($('#if_backward_class_bac_doc_container_for_landallotment').is(':visible')) {
                var obcClass = $('#if_backward_class_bac_doc_for_landallotment').val();
                if (obcClass == '') {
                    $('#if_backward_class_bac_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_bac_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var obcClassMessage = fileUploadValidation('if_backward_class_bac_doc_for_landallotment');
                if (obcClassMessage != '') {
                    $('#if_backward_class_bac_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_bac_doc_for_landallotment', obcClassMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.if_backward_class_scst == isChecked) {
            if ($('#if_backward_class_scst_doc_container_for_landallotment').is(':visible')) {
                var scstClass = $('#if_backward_class_scst_doc_for_landallotment').val();
                if (scstClass == '') {
                    $('#if_backward_class_scst_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_scst_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var scstClassMessage = fileUploadValidation('if_backward_class_scst_doc_for_landallotment');
                if (scstClassMessage != '') {
                    $('#if_backward_class_scst_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_scst_doc_for_landallotment', scstClassMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.if_backward_class_ex_serv == isChecked) {
            if ($('#if_backward_class_ex_serv_doc_container_for_landallotment').is(':visible')) {
                var exServc = $('#if_backward_class_ex_serv_doc_for_landallotment').val();
                if (exServc == '') {
                    $('#if_backward_class_ex_serv_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_ex_serv_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var exServcMessage = fileUploadValidation('if_backward_class_ex_serv_doc_for_landallotment');
                if (exServcMessage != '') {
                    $('#if_backward_class_ex_serv_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_ex_serv_doc_for_landallotment', exServcMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.if_backward_class_wm == isChecked) {
            if ($('#if_backward_class_wm_doc_container_for_landallotment').is(':visible')) {
                var womenClass = $('#if_backward_class_wm_doc_for_landallotment').val();
                if (womenClass == '') {
                    $('#if_backward_class_wm_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_wm_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var womenClassMessage = fileUploadValidation('if_backward_class_wm_doc_for_landallotment');
                if (womenClassMessage != '') {
                    $('#if_backward_class_wm_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_wm_doc_for_landallotment', womenClassMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.if_backward_class_ph == isChecked) {
            if ($('#if_backward_class_ph_doc_container_for_landallotment').is(':visible')) {
                var phClass = $('#if_backward_class_ph_doc_for_landallotment').val();
                if (phClass == '') {
                    $('#if_backward_class_ph_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_ph_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var phClassMessage = fileUploadValidation('if_backward_class_ph_doc_for_landallotment');
                if (phClassMessage != '') {
                    $('#if_backward_class_ph_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_backward_class_wm_doc_for_landallotment', phClassMessage);
                    return false;
                }
            }
        }
        if (landallotmentData.if_belonging_transg == isChecked) {
            if ($('#if_belonging_transg_doc_container_for_landallotment').is(':visible')) {
                var womenClass = $('#if_belonging_transg_doc_for_landallotment').val();
                if (womenClass == '') {
                    $('#if_belonging_transg_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_belonging_transg_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var womenClassMessage = pdffileUploadValidation('if_belonging_transg_doc_for_landallotment');
                if (womenClassMessage != '') {
                    $('#if_belonging_transg_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-if_belonging_transg_doc_for_landallotment', womenClassMessage);
                    return false;
                }
            }
        }


        if (landallotmentData.if_bonafide == isChecked) {
            if ($('#bonafide_of_dnh_doc_container_for_landallotment').is(':visible')) {
                var bonafide = $('#bonafide_of_dnh_doc_for_landallotment').val();
                if (bonafide == '') {
                    $('#bonafide_of_dnh_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-bonafide_of_dnh_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var bonafideMessage = fileUploadValidation('bonafide_of_dnh_doc_for_landallotment');
                if (bonafideMessage != '') {
                    $('#bonafide_of_dnh_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-bonafide_of_dnh_doc_for_landallotment', bonafideMessage);
                    return false;
                }
            }
        }

        if ($('#information_raw_materials_doc_container_for_landallotment').is(':visible')) {
            var infoRawMat = $('#information_raw_materials_doc_for_landallotment').val();
            if (infoRawMat == '') {
                $('#information_raw_materials_doc_for_landallotment').focus();
                validationMessageShow('landallotment-information_raw_materials_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var infoRawMatMessage = fileUploadValidation('information_raw_materials_doc_for_landallotment');
            if (infoRawMatMessage != '') {
                $('#information_raw_materials_doc_for_landallotment').focus();
                validationMessageShow('landallotment-information_raw_materials_doc_for_landallotment', infoRawMatMessage);
                return false;
            }
        }

        if ($('#infrastructure_requirement_doc_container_for_landallotment').is(':visible')) {
            var infasReq = $('#infrastructure_requirement_doc_for_landallotment').val();
            if (infasReq == '') {
                $('#infrastructure_requirement_doc_for_landallotment').focus();
                validationMessageShow('landallotment-infrastructure_requirement_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var infasReqMessage = fileUploadValidation('infrastructure_requirement_doc_for_landallotment');
            if (infasReqMessage != '') {
                $('#infrastructure_requirement_doc_for_landallotment').focus();
                validationMessageShow('landallotment-infrastructure_requirement_doc_for_landallotment', infasReqMessage);
                return false;
            }
        }
        if ($('#effluent_teratment_doc_container_for_landallotment').is(':visible')) {
            var effluentTreatment = $('#effluent_teratment_doc_for_landallotment').val();
            if (effluentTreatment == '') {
                $('#effluent_teratment_doc_for_landallotment').focus();
                validationMessageShow('landallotment-effluent_teratment_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var effluentTreatmentMessage = pdffileUploadValidation('effluent_teratment_doc_for_landallotment');
            if (effluentTreatmentMessage != '') {
                $('#effluent_teratment_doc_for_landallotment').focus();
                validationMessageShow('landallotment-effluent_teratment_doc_for_landallotment', effluentTreatmentMessage);
                return false;
            }
        }
        if ($('#emission_of_gases_doc_container_for_landallotment').is(':visible')) {
            var emissionOfGases = $('#emission_of_gases_doc_for_landallotment').val();
            if (emissionOfGases == '') {
                $('#emission_of_gases_doc_for_landallotment').focus();
                validationMessageShow('landallotment-emission_of_gases_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var emissionOfGasesMessage = pdffileUploadValidation('emission_of_gases_doc_for_landallotment');
            if (emissionOfGasesMessage != '') {
                $('#emission_of_gases_doc_for_landallotment').focus();
                validationMessageShow('landallotment-emission_of_gases_doc_for_landallotment', emissionOfGasesMessage);
                return false;
            }
        }


        if ($('#copy_authority_letter_doc_container_for_landallotment').is(':visible')) {
            var authorityLett = $('#copy_authority_letter_doc_for_landallotment').val();
            if (authorityLett == '') {
                $('#copy_authority_letter_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_authority_letter_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var authorityLettMessage = fileUploadValidation('copy_authority_letter_doc_for_landallotment');
            if (authorityLettMessage != '') {
                $('#copy_authority_letter_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_authority_letter_doc_for_landallotment', authorityLettMessage);
                return false;
            }
        }
        if ($('#copy_project_profile_doc_container_for_landallotment').is(':visible')) {
            var projectProf = $('#copy_project_profile_doc_for_landallotment').val();
            if (projectProf == '') {
                $('#copy_project_profile_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_project_profile_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var projectProfMessage = fileUploadValidation('copy_project_profile_doc_for_landallotment');
            if (projectProfMessage != '') {
                $('#copy_project_profile_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_project_profile_doc_for_landallotment', projectProfMessage);
                return false;
            }
        }
        if ($('#demand_of_deposit_draft_container_for_landallotment').is(':visible')) {
            var demandDraft = $('#demand_of_deposit_draft_for_landallotment').val();
            if (demandDraft == '') {
                $('#demand_of_deposit_draft_for_landallotment').focus();
                validationMessageShow('landallotment-demand_of_deposit_draft_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var demandDraftMessage = fileUploadValidation('demand_of_deposit_draft_for_landallotment');
            if (demandDraftMessage != '') {
                $('#demand_of_deposit_draft_for_landallotment').focus();
                validationMessageShow('landallotment-demand_of_deposit_draft_for_landallotment', demandDraftMessage);
                return false;
            }
        }
        if ($('#copy_proposed_land_doc_container_for_landallotment').is(':visible')) {
            var proposedLand = $('#copy_proposed_land_doc_for_landallotment').val();
            if (proposedLand == '') {
                $('#copy_proposed_land_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_proposed_land_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var proposedLandMessage = fileUploadValidation('copy_proposed_land_doc_for_landallotment');
            if (proposedLandMessage != '') {
                $('#copy_proposed_land_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_proposed_land_doc_for_landallotment', proposedLandMessage);
                return false;
            }
        }
        if ($('#copy_of_partnership_deed_doc_container_for_landallotment').is(':visible')) {
            var partnerDeed = $('#copy_of_partnership_deed_doc_for_landallotment').val();
            if (partnerDeed == '') {
                $('#copy_of_partnership_deed_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_of_partnership_deed_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var partnerDeedMessage = fileUploadValidation('copy_of_partnership_deed_doc_for_landallotment');
            if (partnerDeedMessage != '') {
                $('#copy_of_partnership_deed_doc_for_landallotment').focus();
                validationMessageShow('landallotment-copy_of_partnership_deed_doc_for_landallotment', partnerDeedMessage);
                return false;
            }
        }
        if ($('#relevant_experience_doc_container_for_landallotment').is(':visible')) {
            var relevntDoc = $('#relevant_experience_doc_for_landallotment').val();
            if (relevntDoc == '') {
                $('#relevant_experience_doc_for_landallotment').focus();
                validationMessageShow('landallotment-relevant_experience_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var relevntDocMessage = fileUploadValidation('relevant_experience_doc_for_landallotment');
            if (relevntDocMessage != '') {
                $('#relevant_experience_doc_for_landallotment').focus();
                validationMessageShow('landallotment-relevant_experience_doc_for_landallotment', relevntDocMessage);
                return false;
            }
        }

        if (landallotmentData.if_promotion_council == isChecked) {
            if ($('#certy_by_direc_indus_doc_container_for_landallotment').is(':visible')) {
                var direcIndus = $('#certy_by_direc_indus_doc_for_landallotment').val();
                if (direcIndus == '') {
                    $('#certy_by_direc_indus_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-certy_by_direc_indus_doc_for_landallotment', uploadDocumentValidationMessage);
                    return false;
                }
                var direcIndusMessage = fileUploadValidation('certy_by_direc_indus_doc_for_landallotment');
                if (direcIndusMessage != '') {
                    $('#certy_by_direc_indus_doc_for_landallotment').focus();
                    validationMessageShow('landallotment-certy_by_direc_indus_doc_for_landallotment', direcIndusMessage);
                    return false;
                }
            }
        }
        if ($('#other_relevant_doc_container_for_landallotment').is(':visible')) {
            var otherRelev = $('#other_relevant_doc_for_landallotment').val();
            if (otherRelev == '') {
                $('#other_relevant_doc_for_landallotment').focus();
                validationMessageShow('landallotment-other_relevant_doc_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var otherRelevMessage = fileUploadValidation('other_relevant_doc_for_landallotment');
            if (otherRelevMessage != '') {
                $('#other_relevant_doc_for_landallotment').focus();
                validationMessageShow('landallotment-other_relevant_doc_for_landallotment', otherRelevMessage);
                return false;
            }
        }


        if ($('#seal_and_stamp_container_for_landallotment').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_landallotment').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_landallotment').focus();
                validationMessageShow('landallotment-seal_and_stamp_for_landallotment', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_landallotment');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_landallotment').focus();
                validationMessageShow('landallotment-seal_and_stamp_for_landallotment', sealAndStampMessage);
                return false;
            }
        }

        if (!$('#declaration').is(':checked')) {
            $('#declaration').focus();
            validationMessageShow('landallotment-declaration', declarationOneValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_landallotment') : $('#submit_btn_for_landallotment');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var landallotmentData = new FormData($('#landallotment_form')[0]);
        landallotmentData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        landallotmentData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        landallotmentData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'landallotment/submit_landallotment',
            data: landallotmentData,
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
                validationMessageShow('landallotment', textStatus.statusText);
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
                    validationMessageShow('landallotment', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Landallotment.router.navigate('landallotment', {'trigger': true});
            }
        });
    },

    askForRemove: function (landallotmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Landallotment.listview.removeDocument(\'' + landallotmentId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (landallotmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'landallotment/remove_document',
            data: $.extend({}, {'landallotment_id': landallotmentId}, getTokenData()),
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
                validationMessageShow('landallotment', textStatus.statusText);
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
                    validationMessageShow('landallotment', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_landallotment').hide();
                $('#seal_and_stamp_name_image_for_landallotment').attr('src', '');
                $('#seal_and_stamp_container_for_landallotment').show();
                $('#seal_and_stamp_for_landallotment').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(landallotmentProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#landallot_proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#landallotment_id_for_landallotment_form1').val(landallotmentId);
        $('#landallotment_form1_pdf_form').submit();
        $('#landallotment_id_for_landallotment_form1').val('');
    },

    openUploadChallan: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + landallotmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'landallotment/get_landallotment_data_by_landallotment_id',
            type: 'post',
            data: $.extend({}, {'landallotment_id': landallotmentId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var landallotmentData = parseData.landallotment_data;
                showPopup();
                if (landallotmentData.status != VALUE_FOUR && landallotmentData.status != VALUE_FIVE && landallotmentData.status != VALUE_SIX && landallotmentData.status != VALUE_SEVEN && landallotmentData.status != VALUE_EIGHT) {
                    landallotmentData.show_remove_upload_btn = true;
                }
                if (landallotmentData.payment_type == VALUE_ONE) {
                    landallotmentData.utitle = 'Challan Copy';
                } else {
                    landallotmentData.utitle = 'Payment Details';
                }
                landallotmentData.module_type = VALUE_TWENTYFIVE;
                $('#popup_container').html(landallotmentUploadChallanTemplate(landallotmentData));
                loadFB(VALUE_TWENTYFIVE, parseData.fb_data, landallotmentData.payment_type, landallotmentData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'landallotment_upload_challan', landallotmentData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'landallotment_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYFIVE);
                if (landallotmentData.challan != '') {
                    $('#challan_container_for_landallotment_upload_challan').hide();
                    $('#challan_name_container_for_landallotment_upload_challan').show();
                    $('#challan_name_href_for_landallotment_upload_challan').attr('href', 'documents/landallotment/' + landallotmentData.challan);
                    $('#challan_name_for_landallotment_upload_challan').html(landallotmentData.challan);
                    $('#challan_remove_btn_for_landallotment_upload_challan').attr('onclick', 'Landallotment.listview.removeChallan("' + landallotmentData.landallotment_id + '")');
                }
            }
        });
    },
    removeChallan: function (landallotmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'landallotment/remove_challan',
            data: $.extend({}, {'landallotment_id': landallotmentId}, getTokenData()),
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
                validationMessageShow('landallotment-uc', textStatus.statusText);
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
                    validationMessageShow('landallotment-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-landallotment-uc').html(parseData.message);
                removeDocument('challan', 'landallotment_upload_challan');
                $('#status_' + landallotmentId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-landallotment-uc').html('');
        validationMessageHide();
        var landallotmentId = $('#landallotment_id_for_landallotment_upload_challan').val();
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_landallotment_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_landallotment_upload_challan_1').focus();
            validationMessageShow('landallotment-uc-payment_type_for_landallotment_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_landallotment_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_landallotment_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_landallotment_upload_challan').focus();
                validationMessageShow('landallotment-uc-challan_for_landallotment_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_landallotment_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_landallotment_upload_challan').focus();
                validationMessageShow('landallotment-uc-challan_for_landallotment_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYFIVE, 'landallotment-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_landallotment_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#landallotment_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'landallotment/upload_challan',
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
                validationMessageShow('landallotment-uc', textStatus.statusText);
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
                    validationMessageShow('landallotment-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + landallotmentId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + landallotmentId).show();
                }
                $('#total_fees_' + landallotmentId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_landallotment_' + landallotmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'landallotment/get_landallotment_data_by_landallotment_id',
            type: 'post',
            data: $.extend({}, {'landallotment_id': landallotmentId}, getTokenData()),
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
                var landallotmentData = parseData.landallotment_data;
                showPopup();
                $('#popup_container').html(landallotmentApproveTemplate(landallotmentData));
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
        var formData = $('#approve_landallotment_form').serializeFormJSON();
        if (!formData.landallotment_id_for_landallotment_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_landallotment_approve) {
            $('#registration_number_for_landallotment_approve').focus();
            validationMessageShow('landallotment-approve-registration_number_for_landallotment_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_landallotment_approve) {
            $('#valid_upto_for_landallotment_approve').focus();
            validationMessageShow('landallotment-approve-valid_upto_for_landallotment_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_landallotment_approve) {
            $('#remarks_for_landallotment_approve').focus();
            validationMessageShow('landallotment-approve-remarks_for_landallotment_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'landallotment/approve_application',
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
                validationMessageShow('landallotment-approve', textStatus.statusText);
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
                    validationMessageShow('landallotment-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.landallotment_id_for_landallotment_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.landallotment_id_for_landallotment_approve).remove();
                $('#approve_btn_for_app_' + formData.landallotment_id_for_landallotment_approve).remove();
                $('#so_status_' + formData.landallotment_id_for_landallotment_approve).html(dateTimeDays(formData.landallotment_id_for_landallotment_approve, parseData, VALUE_TWENTYFIVE));
            }
        });
    },
    askForRejectApplication: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_landallotment_' + landallotmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'landallotment/get_landallotment_data_by_landallotment_id',
            type: 'post',
            data: $.extend({}, {'landallotment_id': landallotmentId}, getTokenData()),
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
                var landallotmentData = parseData.landallotment_data;
                showPopup();
                $('#popup_container').html(landallotmentRejectTemplate(landallotmentData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_landallotment_form').serializeFormJSON();
        if (!formData.landallotment_id_for_landallotment_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_landallotment_reject) {
            $('#remarks_for_landallotment_reject').focus();
            validationMessageShow('landallotment-reject-remarks_for_landallotment_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'landallotment/reject_application',
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
                validationMessageShow('landallotment-reject', textStatus.statusText);
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
                    validationMessageShow('landallotment-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.landallotment_id_for_landallotment_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.landallotment_id_for_landallotment_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.landallotment_id_for_landallotment_reject).remove();
                $('#reject_btn_for_app_' + formData.landallotment_id_for_landallotment_reject).remove();
                $('#approve_btn_for_app_' + formData.landallotment_id_for_landallotment_reject).remove();
                $('#so_status_' + formData.landallotment_id_for_landallotment_reject).html(dateTimeDays(formData.landallotment_id_for_landallotment_reject, parseData, VALUE_TWENTYFIVE));
            }
        });
    },
    generateCertificate: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#landallotment_id_for_certificate').val(landallotmentId);
        $('#landallotment_certificate_pdf_form').submit();
        $('#landallotment_id_for_certificate').val('');
    },
    getQueryData: function (landallotmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!landallotmentId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYFIVE;
        templateData.module_id = landallotmentId;
        var btnObj = $('#query_btn_for_landallot_' + landallotmentId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYFIVE, moduleData.landallotment_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_TWENTYFIVE;
                tmpData.module_id = landallotmentId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },

    getConstitution: function (constitution) {
        var categoryOfHotel = constitution.value;
        if (categoryOfHotel == '') {
            return false;
        }

        if (categoryOfHotel == 'proprietary') {
            $('.constitution_artical_div').show();
        } else if (categoryOfHotel == 'partnership') {
            $('.constitution_artical_div').show();
        } else if (categoryOfHotel == 'private') {
            $('.constitution_artical_div').show();
        } else if (categoryOfHotel == 'public') {
            $('.constitution_artical_div').show();
        } else if (categoryOfHotel == 'limited_liability_partnership') {
            $('.constitution_artical_div').show();
        } else if (categoryOfHotel == 'others') {
            $('.constitution_artical_div').show();
        }

    },
    viewPayment: function (landallotmentId) {
        if (!landallotmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + landallotmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'landallotment/get_landallotment_data_by_landallotment_id',
            type: 'post',
            data: $.extend({}, {'landallotment_id': landallotmentId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var landallotmentData = parseData.landallotment_data;
                showPopup();
                if (landallotmentData.payment_type == VALUE_ONE || landallotmentData.payment_type == VALUE_THREE) {
                    landallotmentData.user_payment_type_text = paymentTypeArray[landallotmentData.payment_type];
                } else {
                    landallotmentData.user_payment_type_text = userPaymentTypeArray[landallotmentData.user_payment_type] ? userPaymentTypeArray[landallotmentData.user_payment_type] : '';
                }
                if (landallotmentData.payment_type == VALUE_ONE) {
                    landallotmentData.utitle = 'Fees Paid Challan Copy';
                } else if (landallotmentData.payment_type == VALUE_TWO && landallotmentData.user_payment_type == VALUE_ONE) {
                    landallotmentData.utitle = 'Demand Draft (DD) Copy';
                }
                landallotmentData.module_type = VALUE_TWENTYFIVE;
                $('#popup_container').html(landallotmentViewPaymentTemplate(landallotmentData));
                loadFB(VALUE_TWENTYFIVE, parseData.fb_data, landallotmentData.payment_type);
                loadPH(VALUE_TWENTYFIVE, landallotmentData.landallotment_id, parseData.ph_data);
                if (landallotmentData.payment_type == VALUE_ONE || (landallotmentData.payment_type == VALUE_TWO && landallotmentData.user_payment_type == VALUE_ONE)) {
                    if (landallotmentData.fees_paid_challan != '') {
                        $('#vp_container_for_landallotment').show();
                        $('#fees_paid_challan_name_href_for_landallotment').attr('href', LANDALLOTMENT_DOC_PATH + landallotmentData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_landallotment').html(landallotmentData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
