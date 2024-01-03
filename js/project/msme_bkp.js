var msmeListTemplate = Handlebars.compile($('#msme_list_template').html());
var msmeTableTemplate = Handlebars.compile($('#msme_table_template').html());
var msmeActionTemplate = Handlebars.compile($('#msme_action_template').html());
var msmeFormTemplate = Handlebars.compile($('#msme_form_template').html());
var msmeViewTemplate = Handlebars.compile($('#msme_view_template').html());
var msmeProprietorInfoTemplate = Handlebars.compile($('#msme_proprietor_info_template').html());
var msmeUploadChallanTemplate = Handlebars.compile($('#msme_upload_challan_template').html());
var msmeApproveTemplate = Handlebars.compile($('#msme_approve_template').html());
var msmeRejectTemplate = Handlebars.compile($('#msme_reject_template').html());
var msmeViewPaymentTemplate = Handlebars.compile($('#msme_view_payment_template').html());

var msmeSchemeDetailsIncentiveFormTemplate = Handlebars.compile($('#msme_scheme_details_form_template').html());
var partADetailsIncentiveFormTemplate = Handlebars.compile($('#parta_details_form_template').html());
var partBDetailsIncentiveFormTemplate = Handlebars.compile($('#partb_details_form_template').html());
var partCDetailsIncentiveFormTemplate = Handlebars.compile($('#partc_details_form_template').html());
var partDDetailsIncentiveFormTemplate = Handlebars.compile($('#partd_details_form_template').html());
var partEDetailsIncentiveFormTemplate = Handlebars.compile($('#parte_details_form_template').html());
var msmeDeclarationFormTemplate = Handlebars.compile($('#msme_declaration_form_template').html());
var msmeChecklistFormTemplate = Handlebars.compile($('#msme_checklist_form_template').html());

var msmeSchemeViewTemplate = Handlebars.compile($('#msme_scheme_view_template').html());
var partAViewTemplate = Handlebars.compile($('#parta_view_template').html());
var partBViewTemplate = Handlebars.compile($('#partb_view_template').html());
var partCViewTemplate = Handlebars.compile($('#partc_view_template').html());
var partDViewTemplate = Handlebars.compile($('#partd_view_template').html());
var partEViewTemplate = Handlebars.compile($('#parte_view_template').html());
var msmeDeclarationViewTemplate = Handlebars.compile($('#msme_declaration_view_template').html());
var msmeChecklistViewTemplate = Handlebars.compile($('#msme_checklist_view_template').html());

var financialInstitutionDetailTemplate = Handlebars.compile($('#financial_institution_template').html());
var equipmentsDetailTemplate = Handlebars.compile($('#equipments_template').html());
var proprietorShareDetailTemplate = Handlebars.compile($('#proprietor_share_template').html());

var tempDetailCnt   = 1;
var tempEquipCnt = 1;
var tempShareCnt = 1;

var MSME = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
MSME.Router = Backbone.Router.extend({
    routes: {
        'msme': 'renderList',
        'msme_form': 'renderListForForm',
        'edit_msme_form': 'renderList',
        'view_msme_form': 'renderList',
        'msme_scheme_details/:id': 'renderList',
        'partA_details/:id': 'renderList',
        'partB_details/:id': 'renderList',
        'partC_details/:id': 'renderList',
        'partD_details/:id': 'renderList',
        'partE_details/:id': 'renderList',
        'msme_declaration/:id': 'renderList',
        'msme_checklist/:id': 'renderList',
    },
    renderList: function () {
        MSME.listview.listPage();
    },
    renderListForForm: function () {
        MSME.listview.listPageMSMEForm();
    }
});
MSME.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_women_entrepreneur"]': 'hasWomenEntrepreneurEvent',
        'click input[name="is_sc_st_entrepreneur"]': 'hasScstEntrepreneurEvent',
        'click input[name="is_physically_entrepreneur"]': 'hasPhysicallyEntrepreneurEvent',
        'click input[name="is_transgender_entrepreneur"]': 'hasTransgenderEntrepreneurEvent',
        'click input[name="is_other_entrepreneur"]': 'hasOtherEntrepreneurEvent',
        'click input[name="financial_assistance"]': 'hasFinancialAssistanceEvent',
        'click input[name="govt_dues"]': 'hasGovtDuesEvent',
        'click input[name="enterprise_category"]': 'hasEnterpriseCategoryEvent',
        'click input[name="is_capital_investment"]': 'hasCapitalInvestmentEvent',
        'click input[name="is_intrest_subsidy"]': 'hasIntrestSubsidyEvent',
    },
    hasCapitalInvestmentEvent: function (event) {
        var val = $('input[name=is_capital_investment]:checked').val();
        if (val === '1') {
            this.$('.capital_investment_div').show();
        } else {
            this.$('.capital_investment_div').hide();

        }
    },
    hasIntrestSubsidyEvent: function (event) {
        var val = $('input[name=is_intrest_subsidy]:checked').val();
        if (val === '1') {
            this.$('.intrest_subsidy_div').show();
        } else {
            this.$('.intrest_subsidy_div').hide();

        }
    },
    hasEnterpriseCategoryEvent: function (event) {
        var val = $('input[name=enterprise_category]:checked').val();
        if (val === '1') {
            this.$('.new_project_div').show();
        } else {
            this.$('.new_project_div').hide();
        }

        if (val === '2' || val === '3' || val === '4') {
            this.$('.expansion_div').show();
        } else {
            this.$('.expansion_div').hide();
        }
    },
    hasWomenEntrepreneurEvent: function (event) {
        var val = $('input[name=is_women_entrepreneur]:checked').val();
        if (val === '1') {
            this.$('.women_entrepreneur_div').show();
            this.$('.proprietor_share_div').show();
        } else {
            this.$('.women_entrepreneur_div').hide()
            if($('input[name=is_women_entrepreneur]:checked') .val() == undefined && $('input[name=is_sc_st_entrepreneur]:checked') .val() == undefined && $('input[name=is_physically_entrepreneur]:checked') .val() == undefined && $('input[name=is_transgender_entrepreneur]:checked') .val() == undefined)
                    this.$('.proprietor_share_div').hide();
        }
    },
    hasScstEntrepreneurEvent: function (event) {
        var val = $('input[name=is_sc_st_entrepreneur]:checked').val();
        if (val === '1') {
            this.$('.sc_st_entrepreneur_div').show();
            this.$('.proprietor_share_div').show();
        } else {
            this.$('.sc_st_entrepreneur_div').hide();
            if($('input[name=is_women_entrepreneur]:checked') .val() == undefined && $('input[name=is_sc_st_entrepreneur]:checked') .val() == undefined && $('input[name=is_physically_entrepreneur]:checked') .val() == undefined && $('input[name=is_transgender_entrepreneur]:checked') .val() == undefined)
                    this.$('.proprietor_share_div').hide();
        }
    },
    hasPhysicallyEntrepreneurEvent: function (event) {
        var val = $('input[name=is_physically_entrepreneur]:checked').val();
        if (val === '1') {
            this.$('.physically_entrepreneur_div').show();
            this.$('.proprietor_share_div').show();
        } else {
            this.$('.physically_entrepreneur_div').hide();
            if($('input[name=is_women_entrepreneur]:checked') .val() == undefined && $('input[name=is_sc_st_entrepreneur]:checked') .val() == undefined && $('input[name=is_physically_entrepreneur]:checked') .val() == undefined && $('input[name=is_transgender_entrepreneur]:checked') .val() == undefined)
                    this.$('.proprietor_share_div').hide();
        }
    },
    hasTransgenderEntrepreneurEvent: function (event) {
        var val = $('input[name=is_transgender_entrepreneur]:checked').val();
        if (val === '1') {
            this.$('.transgender_entrepreneur_div').show();
            this.$('.proprietor_share_div').show();
        } else {
            this.$('.transgender_entrepreneur_div').hide();
            if($('input[name=is_women_entrepreneur]:checked') .val() == undefined && $('input[name=is_sc_st_entrepreneur]:checked') .val() == undefined && $('input[name=is_physically_entrepreneur]:checked') .val() == undefined && $('input[name=is_transgender_entrepreneur]:checked') .val() == undefined)
                    this.$('.proprietor_share_div').hide();
        }
    },
    hasOtherEntrepreneurEvent: function (event) {
        var val = $('input[name=is_other_entrepreneur]:checked').val();
        if (val === '1') {
            this.$('.other_entrepreneur_div').show();
        } else {
            this.$('.other_entrepreneur_div').hide();

        }
    },
    hasFinancialAssistanceEvent: function (event) {
        var val = $('input[name=financial_assistance]:checked').val();
        if (val === '1') {
            this.$('.financial_assistance_upload_div').show();
        } else {
            this.$('.financial_assistance_upload_div').hide();

        }
    },
    hasGovtDuesEvent: function (event) {
        var val = $('input[name=govt_dues]:checked').val();
        if (val === '1') {
            this.$('.govt_dues_upload_div').show();
        } else {
            this.$('.govt_dues_upload_div').hide();

        }
    },
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_dic');
        addClass('msme', 'active');
        MSME.router.navigate('msme');
        var templateData = {};
        this.$el.html(msmeListTemplate(templateData));
        this.loadMSMEData();

    },
    listPageMSMEForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_dic');
        addClass('msme', 'active');
        this.$el.html(msmeListTemplate);
        this.newMSMEForm(false, {});
    },
    actionRenderer: function (rowData) {
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
        rowData.module_type = VALUE_NINE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return msmeActionTemplate(rowData);
    },
    loadMSMEData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_NINE, data);
        };
        var that = this;
         showTableContainer('incentive_generalform');
        MSME.router.navigate('msme');
        $('#msme_form_and_datatable_container').html(msmeTableTemplate);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_msme_list', false);
        allowOnlyIntegerValue('mobile_number_for_msme_list')
         if (tempTypeInSession == TEMP_TYPE_A) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_msme_list', false);
             msmeDataTable = $('#msme_datatable').DataTable({
            ajax: {url: 'msme/get_msme_data', dataSrc: "msme_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'incentive_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'district', 'class': 'text-center', 'render': districtRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                 {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                {data: 'enterprise_name', 'class': 'text-center'},
                {data: 'office_address', 'class': 'text-center'},
                {data: 'created_time', 'class': 'text-center','render': dateRendere},
                {data: 'incentive_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'incentive_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
     } else {

               msmeDataTable = $('#msme_datatable').DataTable({
            ajax: {url: 'msme/get_msme_data', dataSrc: "msme_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'incentive_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                //{data: 'district', 'class': 'text-center', 'render': districtRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                 {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                {data: 'enterprise_name', 'class': 'text-center'},
                {data: 'office_address', 'class': 'text-center'},
                {data: 'created_time', 'class': 'text-center','render': dateRendere},
                {data: 'incentive_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'incentive_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });  
            }
        $('#msme_datatable_filter').remove();
        $('#msme_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = msmeDataTable.row(tr);

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
    newMSMEForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.msme_data;
            MSME.router.navigate('edit_msme_form');
        } else {
            var formData = {};
            MSME.router.navigate('msme_form');
        }
        var templateData = {};
        tempShareCnt = 1;
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VALUE_THREE = VALUE_THREE;
        templateData.VALUE_FOUR = VALUE_FOUR;
        templateData.VALUE_FIVE = VALUE_FIVE;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.msme_data = parseData.msme_data;
        templateData.emdate_part1 = dateTo_DD_MM_YYYY(formData.emdate_part1);
        templateData.emdate_part2 = dateTo_DD_MM_YYYY(formData.emdate_part2);
        templateData.pccno_date = dateTo_DD_MM_YYYY(formData.pccno_date);
        templateData.pccno_validupto_date = dateTo_DD_MM_YYYY(formData.pccno_validupto_date);
        templateData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        templateData.establishment_validupto_date = dateTo_DD_MM_YYYY(formData.establishment_validupto_date);
        templateData.commencement_date = dateTo_DD_MM_YYYY(formData.commencement_date);

        var currentYear = new Date().getFullYear(); 
        var previousYear =  currentYear-1;
        templateData.previousYear = previousYear;

        var previousYearOne =  previousYear-1;
        templateData.previousYearOne = previousYearOne;

        var previousYearTwo =  previousYearOne-1;
        templateData.previousYearTwo = previousYearTwo;

        var previousYearThree =  previousYearTwo-1;
        templateData.previousYearThree = previousYearThree;

        var previousYearFour =  previousYearThree-1;
        templateData.previousYearFour = previousYearFour;

        $('#msme_form_and_datatable_container').html(msmeFormTemplate((templateData)));
        
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice', false);
        if (isEdit) {
            if (formData.is_women_entrepreneur == isChecked || formData.sc_st_entrepreneur == isChecked || formData.physically_entrepreneur == isChecked || formData.transgender_entrepreneur == isChecked) {
                var cnt = 1;
                var proprietorShareInfo = JSON.parse(formData.proprietor_share_details);
                $.each(proprietorShareInfo, function(key, value){
                    that.addProprietorShare(value);
                    if (value.gender == VALUE_ONE) {
                        $("#gender_male_" + cnt).prop("checked", true);
                    }
                    if (value.gender == VALUE_TWO) {
                        $("#gender_female_" + cnt).prop("checked", true);
                    }
                    cnt++;
                })

            }
        }else{
            that.addProprietorShare({});
        }
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        if (isEdit) {
              $('#district').val(formData.district);
            if (formData.women_entrepreneur != '') {
                $('#women_entrepreneur_container_for_msme').hide();
                $('#women_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.women_entrepreneur);
                $('#women_entrepreneur_name_container_for_msme').show();
                $('#women_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.women_entrepreneur);
            }

            if (formData.sc_st_entrepreneur != '') {
                $('#sc_st_entrepreneur_container_for_msme').hide();
                $('#sc_st_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.sc_st_entrepreneur);
                $('#sc_st_entrepreneur_name_container_for_msme').show();
                $('#sc_st_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.sc_st_entrepreneur);
            }
            if (formData.physically_entrepreneur != '') {
                $('#physically_entrepreneur_container_for_msme').hide();
                $('#physically_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.physically_entrepreneur);
                $('#physically_entrepreneur_name_container_for_msme').show();
                $('#physically_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.physically_entrepreneur);
            }
            if (formData.transgender_entrepreneur != '') {
                $('#transgender_entrepreneur_container_for_msme').hide();
                $('#transgender_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.transgender_entrepreneur);
                $('#transgender_entrepreneur_name_container_for_msme').show();
                $('#transgender_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.transgender_entrepreneur);
            }
            if (formData.other_entrepreneur != '') {
                $('#other_entrepreneur_container_for_msme').hide();
                $('#other_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.other_entrepreneur);
                $('#other_entrepreneur_name_container_for_msme').show();
                $('#other_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.other_entrepreneur);
            }

            if (formData.financial_assistance_upload != '') {
                $('#financial_assistance_upload_container_for_msme').hide();
                $('#financial_assistance_upload_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.financial_assistance_upload);
                $('#financial_assistance_upload_name_container_for_msme').show();
                $('#financial_assistance_upload_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.financial_assistance_upload);
            }

            if (formData.govt_dues_upload != '') {
                $('#govt_dues_upload_container_for_msme').hide();
                $('#govt_dues_upload_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.govt_dues_upload);
                $('#govt_dues_upload_name_container_for_msme').show();
                $('#govt_dues_upload_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.govt_dues_upload);
            }
            if (formData.constitution == VALUE_ONE) {
                $('#propritorship').attr('checked', 'checked');
            }
            if (formData.constitution == VALUE_TWO) {
                $('#partnership').attr('checked', 'checked');
            }
            if (formData.constitution == VALUE_THREE) {
                $('#company').attr('checked', 'checked');
            }
            if (formData.constitution == VALUE_FOUR) {
                $('#society').attr('checked', 'checked');
            }
            if (formData.constitution == VALUE_FIVE) {
                $('#others').attr('checked', 'checked');
            }

            if (formData.unit_type == VALUE_ONE) {
                $('#micro').attr('checked', 'checked');
            }
            if (formData.unit_type == VALUE_TWO) {
                $('#small').attr('checked', 'checked');
            }
            if (formData.unit_type == VALUE_THREE) {
                $('#medium').attr('checked', 'checked');
            }

            if (formData.category == VALUE_ONE) {
                $('#new').attr('checked', 'checked');
            }
            if (formData.category == VALUE_TWO) {
                $('#expansion').attr('checked', 'checked');
            }

            if (formData.financial_assistance == isChecked) {
                $('#financial_assistance_yes').attr('checked', 'checked');
            }else{
                $('#financial_assistance_no').attr('checked', 'checked');
            }
            if (formData.govt_dues == isChecked) {
                $('#govt_dues_yes').attr('checked', 'checked');
            }else{
                $('#govt_dues_no').attr('checked', 'checked');
            }

            if (formData.is_women_entrepreneur == isChecked) {
                $('#is_women_entrepreneur').attr('checked', 'checked');
                this.$('.proprietor_share_div').show();
            }
            if (formData.is_sc_st_entrepreneur == isChecked) {
                $('#is_sc_st_entrepreneur').attr('checked', 'checked');
                this.$('.proprietor_share_div').show();
            }
            if (formData.is_physically_entrepreneur == isChecked) {
                $('#is_physically_entrepreneur').attr('checked', 'checked');
                this.$('.proprietor_share_div').show();
            }
            if (formData.is_transgender_entrepreneur == isChecked) {
                $('#is_transgender_entrepreneur').attr('checked', 'checked');
                this.$('.proprietor_share_div').show();
            }
            if (formData.is_other_entrepreneur == isChecked) {
                $('#is_other_entrepreneur').attr('checked', 'checked');
            }
        }
        generateSelect2();
        datePicker();
        $('#msme_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitMSME($('#submit_btn_for_msme'));
            }
        });
    },
    schemeListForm: function (incentiveSchemeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('msme_scheme_details/' + incentiveSchemeData.encrypt_id);
        incentiveSchemeData.VALUE_ONE = VALUE_ONE;
        incentiveSchemeData.VALUE_TWO = VALUE_TWO;
        incentiveSchemeData.VALUE_THREE = VALUE_THREE;
        incentiveSchemeData.VALUE_FOUR = VALUE_FOUR;
        $('#msme_form_and_datatable_container').html(msmeSchemeDetailsIncentiveFormTemplate(incentiveSchemeData));
        if (incentiveSchemeData.parta_form == VALUE_ONE) {
            $('#parta_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.partb_form == VALUE_ONE) {
            $('#partb_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.partc_form == VALUE_ONE) {
            $('#partc_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.partd_form == VALUE_ONE) {
            $('#partd_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.parte_form == VALUE_ONE) {
            $('#parte_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.partf_form == VALUE_ONE) {
            $('#partf_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.partg_form == VALUE_ONE) {
            $('#partg_form').attr('checked', 'checked');
        }
        if (incentiveSchemeData.parth_form == VALUE_ONE) {
            $('#parth_form').attr('checked', 'checked');
        }
        datePicker();
        $('#scheme_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partADetailsForm: function (incentivePartAData) {
        console.log(incentivePartAData);
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('partA_details/' + incentivePartAData.encrypt_id);
        incentivePartAData.VALUE_ONE = VALUE_ONE;
        incentivePartAData.VALUE_TWO = VALUE_TWO;
        incentivePartAData.VALUE_THREE = VALUE_THREE;
        incentivePartAData.VALUE_FOUR = VALUE_FOUR;
        $('#msme_form_and_datatable_container').html(partADetailsIncentiveFormTemplate(incentivePartAData));
        $("#new").prop("checked", true);
        this.$('.expansion_div').hide();

        if(incentivePartAData.financial_data_info){
            var financialDataInfo = JSON.parse(incentivePartAData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }
        datePicker();
        $('#parta_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partBDetailsForm: function (incentivePartBData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('partB_details/' + incentivePartBData.encrypt_id);
        incentivePartBData.VALUE_ONE = VALUE_ONE;
        incentivePartBData.VALUE_TWO = VALUE_TWO;
        incentivePartBData.VALUE_THREE = VALUE_THREE;
        incentivePartBData.VALUE_FOUR = VALUE_FOUR;
        $('#msme_form_and_datatable_container').html(partBDetailsIncentiveFormTemplate(incentivePartBData));
        
        datePicker();
        $('#partb_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partCDetailsForm: function (incentivePartCData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('partC_details/' + incentivePartCData.encrypt_id);
        incentivePartCData.VALUE_ONE = VALUE_ONE;
        incentivePartCData.VALUE_TWO = VALUE_TWO;
        incentivePartCData.VALUE_THREE = VALUE_THREE;
        incentivePartCData.VALUE_FOUR = VALUE_FOUR;
        $('#msme_form_and_datatable_container').html(partCDetailsIncentiveFormTemplate(incentivePartCData));
        
        datePicker();
        $('#partc_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partDDetailsForm: function (incentivePartDData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('partD_details/' + incentivePartDData.encrypt_id);
        incentivePartDData.VALUE_ONE = VALUE_ONE;
        incentivePartDData.VALUE_TWO = VALUE_TWO;
        incentivePartDData.VALUE_THREE = VALUE_THREE;
        incentivePartDData.VALUE_FOUR = VALUE_FOUR;
        incentivePartDData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(partDDetailsIncentiveFormTemplate(incentivePartDData));
        if(incentivePartDData.equipment_info){
            var equipmentInfo = JSON.parse(incentivePartDData.equipment_info);
                $.each(equipmentInfo, function(key, value){
                    that.addEquipments(value);
            })
        }else{
            that.addEquipments({});
        }
        if (incentivePartDData.audit_report != '') {
            $('#audit_report_container_for_msme').hide();
            $('#audit_report_name_image_for_msme').attr('src', MSME_DOC_PATH + incentivePartDData.audit_report);
            $('#audit_report_name_container_for_msme').show();
            $('#audit_report_name_image_for_msme_download').attr("href", MSME_DOC_PATH + incentivePartDData.audit_report);
        }
        datePicker();
        $('#partd_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partEDetailsForm: function (incentivePartEData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('partE_details/' + incentivePartEData.encrypt_id);
        incentivePartEData.VALUE_ONE = VALUE_ONE;
        incentivePartEData.VALUE_TWO = VALUE_TWO;
        incentivePartEData.VALUE_THREE = VALUE_THREE;
        incentivePartEData.VALUE_FOUR = VALUE_FOUR;
        $('#msme_form_and_datatable_container').html(partEDetailsIncentiveFormTemplate(incentivePartEData));
        
        datePicker();
        $('#parte_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    msmeDeclarationForm: function (declarationData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('msme_declaration/' + declarationData.encrypt_id);
        declarationData.VALUE_ONE = VALUE_ONE;
        declarationData.VALUE_TWO = VALUE_TWO;
        declarationData.VALUE_THREE = VALUE_THREE;
        declarationData.VALUE_FOUR = VALUE_FOUR;
        declarationData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(msmeDeclarationFormTemplate(declarationData));

        if (declarationData.sign_seal != '' && declarationData.sign_seal != undefined) {
            $('#sign_seal_container_for_msme').hide();
            $('#sign_seal_name_image_for_msme').attr('src', MSME_DOC_PATH + declarationData.sign_seal);
            $('#sign_seal_name_container_for_msme').show();
        }
        
        datePicker();
        $('#declaration_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    msmehecklistForm: function (checklistData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        MSME.router.navigate('msme_checklist/' + checklistData.encrypt_id);
        checklistData.is_checked = isChecked;
        checklistData.VALUE_ONE = VALUE_ONE;
        checklistData.VALUE_TWO = VALUE_TWO;
        checklistData.VALUE_THREE = VALUE_THREE;
        checklistData.VALUE_FOUR = VALUE_FOUR;
        checklistData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(msmeChecklistFormTemplate(checklistData));

        if(checklistData.is_capital_investment == isChecked){
            $('#is_capital_investment').prop("checked", true);
            this.$('.capital_investment_div').show();
            if (checklistData.entrepreneur_memorandum_uploader != '' && checklistData.entrepreneur_memorandum_uploader != undefined) {
                $('#entrepreneur_memorandum_uploader_container_for_msme').hide();
                $('#entrepreneur_memorandum_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.entrepreneur_memorandum_uploader);
                $('#entrepreneur_memorandum_uploader_name_container_for_msme').show();
                $('#entrepreneur_memorandum_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.entrepreneur_memorandum_uploader);
            }
            if (checklistData.partnership_deed_uploader != '' && checklistData.partnership_deed_uploader != undefined) {
                $('#partnership_deed_uploader_container_for_msme').hide();
                $('#partnership_deed_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.partnership_deed_uploader);
                $('#partnership_deed_uploader_name_container_for_msme').show();
                $('#partnership_deed_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.partnership_deed_uploader);
            }
            if (checklistData.lease_agreement_uploader != '' && checklistData.lease_agreement_uploader != undefined) {
                $('#lease_agreement_uploader_container_for_msme').hide();
                $('#lease_agreement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.lease_agreement_uploader);
                $('#lease_agreement_uploader_name_container_for_msme').show();
                $('#lease_agreement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.lease_agreement_uploader);
            }
            if (checklistData.loan_sanction_uploader != '' && checklistData.loan_sanction_uploader != undefined) {
                $('#loan_sanction_uploader_container_for_msme').hide();
                $('#loan_sanction_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.loan_sanction_uploader);
                $('#loan_sanction_uploader_name_container_for_msme').show();
                $('#loan_sanction_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.loan_sanction_uploader);
            }
            if (checklistData.power_release_order_uploader != '' && checklistData.power_release_order_uploader != undefined) {
                $('#power_release_order_uploader_container_for_msme').hide();
                $('#power_release_order_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.power_release_order_uploader);
                $('#power_release_order_uploader_name_container_for_msme').show();
                $('#power_release_order_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.power_release_order_uploader);
            }
            if (checklistData.invoice_copy_uploader != '' && checklistData.invoice_copy_uploader != undefined) {
                $('#invoice_copy_uploader_container_for_msme').hide();
                $('#invoice_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.invoice_copy_uploader);
                $('#invoice_copy_uploader_name_container_for_msme').show();
                $('#invoice_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.invoice_copy_uploader);
            }
            if (checklistData.ca_prescribed_uploader != '' && checklistData.ca_prescribed_uploader != undefined) {
                $('#ca_prescribed_uploader_container_for_msme').hide();
                $('#ca_prescribed_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.ca_prescribed_uploader);
                $('#ca_prescribed_uploader_name_container_for_msme').show();
                $('#ca_prescribed_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.ca_prescribed_uploader);
            }
            if (checklistData.certificate_commencement_uploader != '' && checklistData.certificate_commencement_uploader != undefined) {
                $('#certificate_commencement_uploader_container_for_msme').hide();
                $('#certificate_commencement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.certificate_commencement_uploader);
                $('#certificate_commencement_uploader_name_container_for_msme').show();
                $('#certificate_commencement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.certificate_commencement_uploader);
            }
            if (checklistData.engineer_certificate_uploader != '' && checklistData.engineer_certificate_uploader != undefined) {
                $('#engineer_certificate_uploader_container_for_msme').hide();
                $('#engineer_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.engineer_certificate_uploader);
                $('#engineer_certificate_uploader_name_container_for_msme').show();
                $('#engineer_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.engineer_certificate_uploader);
            }
            if (checklistData.expenses_certificate_uploader != '' && checklistData.expenses_certificate_uploader != undefined) {
                $('#expenses_certificate_uploader_container_for_msme').hide();
                $('#expenses_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.expenses_certificate_uploader);
                $('#expenses_certificate_uploader_name_container_for_msme').show();
                $('#expenses_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.expenses_certificate_uploader);
            }
            if (checklistData.stamped_receipt_uploader != '' && checklistData.stamped_receipt_uploader != undefined) {
                $('#stamped_receipt_uploader_container_for_msme').hide();
                $('#stamped_receipt_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.stamped_receipt_uploader);
                $('#stamped_receipt_uploader_name_container_for_msme').show();
                $('#stamped_receipt_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.stamped_receipt_uploader);
            }
            if (checklistData.sale_invoice_uploader != '' && checklistData.sale_invoice_uploader != undefined) {
                $('#sale_invoice_uploader_container_for_msme').hide();
                $('#sale_invoice_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.sale_invoice_uploader);
                $('#sale_invoice_uploader_name_container_for_msme').show();
                $('#sale_invoice_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.sale_invoice_uploader);
            }
            if (checklistData.additional_document_uploader != '' && checklistData.additional_document_uploader != undefined) {
                $('#additional_document_uploader_container_for_msme').hide();
                $('#additional_document_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.additional_document_uploader);
                $('#additional_document_uploader_name_container_for_msme').show();
                $('#additional_document_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.additional_document_uploader);
            }
            if (checklistData.factorylicence_copy_uploader != '' && checklistData.factorylicence_copy_uploader != undefined) {
                $('#factorylicence_copy_uploader_container_for_msme').hide();
                $('#factorylicence_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.factorylicence_copy_uploader);
                $('#factorylicence_copy_uploader_name_container_for_msme').show();
                $('#factorylicence_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.factorylicence_copy_uploader);
            }
            if (checklistData.pcc_copy_uploader != '' && checklistData.pcc_copy_uploader != undefined) {
                $('#pcc_copy_uploader_container_for_msme').hide();
                $('#pcc_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.pcc_copy_uploader);
                $('#pcc_copy_uploader_name_container_for_msme').show();
                $('#pcc_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.pcc_copy_uploader);
            }
            if (checklistData.expansion_date_uploader != '' && checklistData.expansion_date_uploader != undefined) {
                $('#expansion_date_uploader_container_for_msme').hide();
                $('#expansion_date_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.expansion_date_uploader);
                $('#expansion_date_uploader_name_container_for_msme').show();
                $('#expansion_date_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.expansion_date_uploader);
            }
            if (checklistData.production_turnover_uploader != '' && checklistData.production_turnover_uploader != undefined) {
                $('#production_turnover_uploader_container_for_msme').hide();
                $('#production_turnover_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.production_turnover_uploader);
                $('#production_turnover_uploader_name_container_for_msme').show();
                $('#production_turnover_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.production_turnover_uploader);
            }
            if (checklistData.fix_assets_value_uploader != '' && checklistData.fix_assets_value_uploader != undefined) {
                $('#fix_assets_value_uploader_container_for_msme').hide();
                $('#fix_assets_value_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.fix_assets_value_uploader);
                $('#fix_assets_value_uploader_name_container_for_msme').show();
                $('#fix_assets_value_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.fix_assets_value_uploader);
            }
            if (checklistData.production_capacity_uploader != '' && checklistData.production_capacity_uploader != undefined) {
                $('#production_capacity_uploader_container_for_msme').hide();
                $('#production_capacity_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.production_capacity_uploader);
                $('#production_capacity_uploader_name_container_for_msme').show();
                $('#production_capacity_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.production_capacity_uploader);
            }
            if (checklistData.patent_registration_uploader != '' && checklistData.patent_registration_uploader != undefined) {
                $('#patent_registration_uploader_container_for_msme').hide();
                $('#patent_registration_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.patent_registration_uploader);
                $('#patent_registration_uploader_name_container_for_msme').show();
                $('#patent_registration_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.patent_registration_uploader);
            }
            if (checklistData.energy_water_uploader != '' && checklistData.energy_water_uploader != undefined) {
                $('#energy_water_uploader_container_for_msme').hide();
                $('#energy_water_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.energy_water_uploader);
                $('#energy_water_uploader_name_container_for_msme').show();
                $('#energy_water_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.energy_water_uploader);
            }
            if (checklistData.quality_certificate_uploader != '' && checklistData.quality_certificate_uploader != undefined) {
                $('#quality_certificate_uploader_container_for_msme').hide();
                $('#quality_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.quality_certificate_uploader);
                $('#quality_certificate_uploader_name_container_for_msme').show();
                $('#quality_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.quality_certificate_uploader);
            }
            if (checklistData.resident_certificate_uploader != '' && checklistData.resident_certificate_uploader != undefined) {
                $('#resident_certificate_uploader_container_for_msme').hide();
                $('#resident_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.resident_certificate_uploader);
                $('#resident_certificate_uploader_name_container_for_msme').show();
                $('#resident_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.resident_certificate_uploader);
            }
        }
        if(checklistData.is_intrest_subsidy == isChecked){
            $('#is_intrest_subsidy').prop("checked", true);
            this.$('.intrest_subsidy_div').show();
            if (checklistData.bank_total_interest_uploader != '' && checklistData.bank_total_interest_uploader != undefined) {
                $('#bank_total_interest_uploader_container_for_msme').hide();
                $('#bank_total_interest_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.bank_total_interest_uploader);
                $('#bank_total_interest_uploader_name_container_for_msme').show();
                $('#bank_total_interest_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.bank_total_interest_uploader);
            }
            if (checklistData.bank_statement_uploader != '' && checklistData.bank_statement_uploader != undefined) {
                $('#bank_statement_uploader_container_for_msme').hide();
                $('#bank_statement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.bank_statement_uploader);
                $('#bank_statement_uploader_name_container_for_msme').show();
                $('#bank_statement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.bank_statement_uploader);
            }
            if (checklistData.annexure3_declaration_uploader != '' && checklistData.annexure3_declaration_uploader != undefined) {
                $('#annexure3_declaration_uploader_container_for_msme').hide();
                $('#annexure3_declaration_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.annexure3_declaration_uploader);
                $('#annexure3_declaration_uploader_name_container_for_msme').show();
                $('#annexure3_declaration_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.annexure3_declaration_uploader);
            }
            if (checklistData.interest_subsidy_cal_uploader != '' && checklistData.interest_subsidy_cal_uploader != undefined) {
                $('#interest_subsidy_cal_uploader_container_for_msme').hide();
                $('#interest_subsidy_cal_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.interest_subsidy_cal_uploader);
                $('#interest_subsidy_cal_uploader_name_container_for_msme').show();
                $('#interest_subsidy_cal_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.interest_subsidy_cal_uploader);
            }
            if (checklistData.year_annual_prod_uploader != '' && checklistData.year_annual_prod_uploader != undefined) {
                $('#year_annual_prod_uploader_container_for_msme').hide();
                $('#year_annual_prod_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.year_annual_prod_uploader);
                $('#year_annual_prod_uploader_name_container_for_msme').show();
                $('#year_annual_prod_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.year_annual_prod_uploader);
            }
            if (checklistData.year_bank_statement_uploader != '' && checklistData.year_bank_statement_uploader != undefined) {
                $('#year_bank_statement_uploader_container_for_msme').hide();
                $('#year_bank_statement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + checklistData.year_bank_statement_uploader);
                $('#year_bank_statement_uploader_name_container_for_msme').show();
                $('#year_bank_statement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + checklistData.year_bank_statement_uploader);
            }
        }
        
        datePicker();
        $('#checklist_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    editOrViewMSME: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                if (isEdit) {
                    that.newMSMEForm(isEdit, parseData);
                } else {
                    that.viewMSMEForm(parseData);
                }
            }
        });
    },
    editOrViewScheme: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.schemeListForm(parseData.scheme_data);
                } else {
                    that.viewSchemeForm(parseData);
                }
            }
        });
    },
    editOrViewForms: function (btnObj, msmeId, isEdit, formName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);

                if(formName == 'partb_form'){
                    if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'partc_form'){
                    if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'partd_form'){
                    if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'parte_form'){
                    if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'declaration_form'){
                    if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }
                    else if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, msmeId, isEdit);
                    }
                } 
            }
        });
    },
    editOrViewFormsForView: function (btnObj, msmeId, isEdit, formName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);

                if(formName == 'scheme_form'){
                    if(parseData.scheme_data['parta_form'] == 1){
                        that.editOrViewPartA(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, msmeId, isEdit);
                    }
                }
                if(formName == 'parta_form'){
                    if(parseData.scheme_data['partb_form'] == 1){
                        that.editOrViewPartB(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'partb_form'){
                    if(parseData.scheme_data['partc_form'] == 1){
                        that.editOrViewPartC(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'partc_form'){
                    if(parseData.scheme_data['partd_form'] == 1){
                        that.editOrViewPartD(btnObj, msmeId, isEdit);
                    }else if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, msmeId, isEdit);
                    }
                }
                else if(formName == 'partd_form'){
                    if(parseData.scheme_data['parte_form'] == 1){
                        that.editOrViewPartE(btnObj, msmeId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, msmeId, isEdit);
                    }
                }
            }
        });
    },
    editOrViewPartA: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_parta_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partADetailsForm(parseData.parta_data);
                } else {
                    that.viewPartAForm(parseData);
                }
            }
        });
    },
    editOrViewPartB: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_partb_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partBDetailsForm(parseData.partb_data);
                } else {
                    that.viewPartBForm(parseData);
                }
            }
        });
    },
    editOrViewPartC: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_partc_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partCDetailsForm(parseData.partc_data);
                } else {
                    that.viewPartCForm(parseData);
                }
            }
        });
    },
    editOrViewPartD: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_partd_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partDDetailsForm(parseData.partd_data);
                } else {
                    that.viewPartDForm(parseData);
                }
            }
        });
    },
    editOrViewPartE: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_parte_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.partEDetailsForm(parseData.parte_data);
                } else {
                    that.viewPartEForm(parseData);
                }
            }
        });
    },
    editOrViewDeclaration: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_declaration_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.msmeDeclarationForm(parseData.declaration_data);
                } else {
                    that.viewDeclarationForm(parseData);
                }
            }
        });
    },
    editOrViewChecklist: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_incentive_checklist_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': msmeId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.msmeChecklistForm(parseData.checklist_data);
                } else {
                    that.viewChecklistForm(parseData);
                }
            }
        });
    },
    viewMSMEForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.msme_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        var currentYear = new Date().getFullYear(); 
        var previousYear =  currentYear-1;
        formData.previousYear = previousYear;

        var previousYearOne =  previousYear-1;
        formData.previousYearOne = previousYearOne;

        var previousYearTwo =  previousYearOne-1;
        formData.previousYearTwo = previousYearTwo;

        var previousYearThree =  previousYearTwo-1;
        formData.previousYearThree = previousYearThree;

        var previousYearFour =  previousYearThree-1;
        formData.previousYearFour = previousYearFour;

        $('#msme_form_and_datatable_container').html(msmeViewTemplate(formData));

        if (formData.is_women_entrepreneur == isChecked || formData.is_sc_st_entrepreneur == isChecked || formData.is_physically_entrepreneur == isChecked || formData.is_transgender_entrepreneur == isChecked) {
            var cnt = 1;
            var proprietorShareInfo = JSON.parse(formData.proprietor_share_details);
            $.each(proprietorShareInfo, function(key, value){
                that.addProprietorShare(value);
                if (value.gender == VALUE_ONE) {
                    $("#gender_male_" + cnt).prop("checked", true);
                }
                if (value.gender == VALUE_TWO) {
                    $("#gender_female_" + cnt).prop("checked", true);
                }
                cnt++;
            })

        }
          renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        $('#district').val(formData.district);

        if (formData.women_entrepreneur != '') {
            $('#women_entrepreneur_container_for_msme').hide();
            $('#women_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.women_entrepreneur);
            $('#women_entrepreneur_name_container_for_msme').show();
            $('#women_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.women_entrepreneur);
        }

        if (formData.sc_st_entrepreneur != '') {
            $('#sc_st_entrepreneur_container_for_msme').hide();
            $('#sc_st_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.sc_st_entrepreneur);
            $('#sc_st_entrepreneur_name_container_for_msme').show();
            $('#sc_st_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.sc_st_entrepreneur);
        }
        if (formData.physically_entrepreneur != '') {
            $('#physically_entrepreneur_container_for_msme').hide();
            $('#physically_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.physically_entrepreneur);
            $('#physically_entrepreneur_name_container_for_msme').show();
            $('#physically_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.physically_entrepreneur);
        }
        if (formData.transgender_entrepreneur != '') {
            $('#transgender_entrepreneur_container_for_msme').hide();
            $('#transgender_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.transgender_entrepreneur);
            $('#transgender_entrepreneur_name_container_for_msme').show();
            $('#transgender_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.transgender_entrepreneur);
        }
        if (formData.other_entrepreneur != '') {
            $('#other_entrepreneur_container_for_msme').hide();
            $('#other_entrepreneur_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.other_entrepreneur);
            $('#other_entrepreneur_name_container_for_msme').show();
            $('#other_entrepreneur_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.other_entrepreneur);
        }

        if (formData.financial_assistance_upload != '') {
            $('#financial_assistance_upload_container_for_msme').hide();
            $('#financial_assistance_upload_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.financial_assistance_upload);
            $('#financial_assistance_upload_name_container_for_msme').show();
            $('#financial_assistance_upload_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.financial_assistance_upload);
        }

        if (formData.govt_dues_upload != '') {
            $('#govt_dues_upload_container_for_msme').hide();
            $('#govt_dues_upload_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.govt_dues_upload);
            $('#govt_dues_upload_name_container_for_msme').show();
            $('#govt_dues_upload_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.govt_dues_upload);
        }
        if (formData.constitution == VALUE_ONE) {
            $('#propritorship').attr('checked', 'checked');
        }
        if (formData.constitution == VALUE_TWO) {
            $('#partnership').attr('checked', 'checked');
        }
        if (formData.constitution == VALUE_THREE) {
            $('#company').attr('checked', 'checked');
        }
        if (formData.constitution == VALUE_FOUR) {
            $('#society').attr('checked', 'checked');
        }
        if (formData.constitution == VALUE_FIVE) {
            $('#others').attr('checked', 'checked');
        }

        if (formData.unit_type == VALUE_ONE) {
            $('#micro').attr('checked', 'checked');
        }
        if (formData.unit_type == VALUE_TWO) {
            $('#small').attr('checked', 'checked');
        }
        if (formData.unit_type == VALUE_THREE) {
            $('#medium').attr('checked', 'checked');
        }

        if (formData.category == VALUE_ONE) {
            $('#new').attr('checked', 'checked');
        }
        if (formData.category == VALUE_TWO) {
            $('#expansion').attr('checked', 'checked');
        }

        if (formData.financial_assistance == isChecked) {
            $('#financial_assistance_yes').attr('checked', 'checked');
        }else{
            $('#financial_assistance_no').attr('checked', 'checked');
        }
        if (formData.govt_dues == isChecked) {
            $('#govt_dues_yes').attr('checked', 'checked');
        }else{
            $('#govt_dues_no').attr('checked', 'checked');
        }

        if (formData.is_women_entrepreneur == isChecked) {
            $('#is_women_entrepreneur').attr('checked', 'checked');
            this.$('.proprietor_share_div').show();
        }
        if (formData.is_sc_st_entrepreneur == isChecked) {
            $('#is_sc_st_entrepreneur').attr('checked', 'checked');
            this.$('.proprietor_share_div').show();
        }
        if (formData.is_physically_entrepreneur == isChecked) {
            $('#is_physically_entrepreneur').attr('checked', 'checked');
            this.$('.proprietor_share_div').show();
        }
        if (formData.is_transgender_entrepreneur == isChecked) {
            $('#is_transgender_entrepreneur').attr('checked', 'checked');
            this.$('.proprietor_share_div').show();
        }
        if (formData.is_other_entrepreneur == isChecked) {
            $('#is_other_entrepreneur').attr('checked', 'checked');
        }
        
    },
    viewSchemeForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.scheme_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(msmeSchemeViewTemplate(formData)); 
        if (formData.parta_form == VALUE_ONE) {
            $('#parta_form').attr('checked', 'checked');
        }
        if (formData.partb_form == VALUE_ONE) {
            $('#partb_form').attr('checked', 'checked');
        }
        if (formData.partc_form == VALUE_ONE) {
            $('#partc_form').attr('checked', 'checked');
        }
        if (formData.partd_form == VALUE_ONE) {
            $('#partd_form').attr('checked', 'checked');
        }
        if (formData.parte_form == VALUE_ONE) {
            $('#parte_form').attr('checked', 'checked');
        }
        if (formData.partf_form == VALUE_ONE) {
            $('#partf_form').attr('checked', 'checked');
        }
        if (formData.partg_form == VALUE_ONE) {
            $('#partg_form').attr('checked', 'checked');
        }
        if (formData.parth_form == VALUE_ONE) {
            $('#parth_form').attr('checked', 'checked');
        }  
    },
    viewPartAForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.parta_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(partAViewTemplate(formData)); 
        $("#new").prop("checked", true);
        this.$('.expansion_div').hide();

        if(formData.financial_data_info){
            var financialDataInfo = JSON.parse(formData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }   
    },
    viewPartBForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.partb_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT; 
        $('#msme_form_and_datatable_container').html(partBViewTemplate(formData)); 
    },
    viewPartCForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.partc_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(partCViewTemplate(formData));   
    },
    viewPartDForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.partd_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(partDViewTemplate(formData));   
        if(formData.equipment_info){
            var equipmentInfo = JSON.parse(formData.equipment_info);
                $.each(equipmentInfo, function(key, value){
                    that.addEquipments(value);
            })
        }else{
            that.addEquipments({});
        }
        if (formData.audit_report != '') {
            $('#audit_report_container_for_msme').hide();
            $('#audit_report_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.audit_report);
            $('#audit_report_name_container_for_msme').show();
            $('#audit_report_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.audit_report);
        }
    },
    viewPartEForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.parte_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(partEViewTemplate(formData));   
    },
    viewDeclarationForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.declaration_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(msmeDeclarationViewTemplate(formData)); 
        if (formData.sign_seal != '') {
            $('#sign_seal_container_for_msme').hide();
            $('#sign_seal_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.sign_seal);
            $('#sign_seal_name_container_for_msme').show();
        }  
    },
    viewChecklistForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.checklist_data;
        MSME.router.navigate('view_msme_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#msme_form_and_datatable_container').html(msmeChecklistViewTemplate(formData));  
        if(formData.is_capital_investment == isChecked){
            $('#is_capital_investment').prop("checked", true);
            this.$('.capital_investment_div').show(); 
            if (formData.entrepreneur_memorandum_uploader != '') {
                $('#entrepreneur_memorandum_uploader_container_for_msme').hide();
                $('#entrepreneur_memorandum_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.entrepreneur_memorandum_uploader);
                $('#entrepreneur_memorandum_uploader_name_container_for_msme').show();
                $('#entrepreneur_memorandum_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.entrepreneur_memorandum_uploader);
            }
            if (formData.partnership_deed_uploader != '') {
                $('#partnership_deed_uploader_container_for_msme').hide();
                $('#partnership_deed_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.partnership_deed_uploader);
                $('#partnership_deed_uploader_name_container_for_msme').show();
                $('#partnership_deed_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.partnership_deed_uploader);
            }
            if (formData.lease_agreement_uploader != '') {
                $('#lease_agreement_uploader_container_for_msme').hide();
                $('#lease_agreement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.lease_agreement_uploader);
                $('#lease_agreement_uploader_name_container_for_msme').show();
                $('#lease_agreement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.lease_agreement_uploader);
            }
            if (formData.loan_sanction_uploader != '') {
                $('#loan_sanction_uploader_container_for_msme').hide();
                $('#loan_sanction_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.loan_sanction_uploader);
                $('#loan_sanction_uploader_name_container_for_msme').show();
                $('#loan_sanction_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.loan_sanction_uploader);
            }
            if (formData.power_release_order_uploader != '') {
                $('#power_release_order_uploader_container_for_msme').hide();
                $('#power_release_order_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.power_release_order_uploader);
                $('#power_release_order_uploader_name_container_for_msme').show();
                $('#power_release_order_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.power_release_order_uploader);
            }
            if (formData.invoice_copy_uploader != '') {
                $('#invoice_copy_uploader_container_for_msme').hide();
                $('#invoice_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.invoice_copy_uploader);
                $('#invoice_copy_uploader_name_container_for_msme').show();
                $('#invoice_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.invoice_copy_uploader);
            }
            if (formData.ca_prescribed_uploader != '') {
                $('#ca_prescribed_uploader_container_for_msme').hide();
                $('#ca_prescribed_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.ca_prescribed_uploader);
                $('#ca_prescribed_uploader_name_container_for_msme').show();
                $('#ca_prescribed_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.ca_prescribed_uploader);
            }
            if (formData.certificate_commencement_uploader != '') {
                $('#certificate_commencement_uploader_container_for_msme').hide();
                $('#certificate_commencement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.certificate_commencement_uploader);
                $('#certificate_commencement_uploader_name_container_for_msme').show();
                $('#certificate_commencement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.certificate_commencement_uploader);
            }
            if (formData.engineer_certificate_uploader != '') {
                $('#engineer_certificate_uploader_container_for_msme').hide();
                $('#engineer_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.engineer_certificate_uploader);
                $('#engineer_certificate_uploader_name_container_for_msme').show();
                $('#engineer_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.engineer_certificate_uploader);
            }
            if (formData.expenses_certificate_uploader != '') {
                $('#expenses_certificate_uploader_container_for_msme').hide();
                $('#expenses_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.expenses_certificate_uploader);
                $('#expenses_certificate_uploader_name_container_for_msme').show();
                $('#expenses_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.expenses_certificate_uploader);
            }
            if (formData.stamped_receipt_uploader != '') {
                $('#stamped_receipt_uploader_container_for_msme').hide();
                $('#stamped_receipt_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.stamped_receipt_uploader);
                $('#stamped_receipt_uploader_name_container_for_msme').show();
                $('#stamped_receipt_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.stamped_receipt_uploader);
            }
            if (formData.sale_invoice_uploader != '') {
                $('#sale_invoice_uploader_container_for_msme').hide();
                $('#sale_invoice_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.sale_invoice_uploader);
                $('#sale_invoice_uploader_name_container_for_msme').show();
                $('#sale_invoice_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.sale_invoice_uploader);
            }
            if (formData.additional_document_uploader != '') {
                $('#additional_document_uploader_container_for_msme').hide();
                $('#additional_document_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.additional_document_uploader);
                $('#additional_document_uploader_name_container_for_msme').show();
                $('#additional_document_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.additional_document_uploader);
            }
            if (formData.factorylicence_copy_uploader != '') {
                $('#factorylicence_copy_uploader_container_for_msme').hide();
                $('#factorylicence_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.factorylicence_copy_uploader);
                $('#factorylicence_copy_uploader_name_container_for_msme').show();
                $('#factorylicence_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.factorylicence_copy_uploader);
            }
            if (formData.pcc_copy_uploader != '') {
                $('#pcc_copy_uploader_container_for_msme').hide();
                $('#pcc_copy_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.pcc_copy_uploader);
                $('#pcc_copy_uploader_name_container_for_msme').show();
                $('#pcc_copy_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.pcc_copy_uploader);
            }
            if (formData.expansion_date_uploader != '') {
                $('#expansion_date_uploader_container_for_msme').hide();
                $('#expansion_date_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.expansion_date_uploader);
                $('#expansion_date_uploader_name_container_for_msme').show();
                $('#expansion_date_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.expansion_date_uploader);
            }
            if (formData.production_turnover_uploader != '') {
                $('#production_turnover_uploader_container_for_msme').hide();
                $('#production_turnover_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.production_turnover_uploader);
                $('#production_turnover_uploader_name_container_for_msme').show();
                $('#production_turnover_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.production_turnover_uploader);
            }
            if (formData.fix_assets_value_uploader != '') {
                $('#fix_assets_value_uploader_container_for_msme').hide();
                $('#fix_assets_value_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.fix_assets_value_uploader);
                $('#fix_assets_value_uploader_name_container_for_msme').show();
                $('#fix_assets_value_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.fix_assets_value_uploader);
            }
            if (formData.production_capacity_uploader != '') {
                $('#production_capacity_uploader_container_for_msme').hide();
                $('#production_capacity_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.production_capacity_uploader);
                $('#production_capacity_uploader_name_container_for_msme').show();
                $('#production_capacity_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.production_capacity_uploader);
            }
            if (formData.patent_registration_uploader != '') {
                $('#patent_registration_uploader_container_for_msme').hide();
                $('#patent_registration_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.patent_registration_uploader);
                $('#patent_registration_uploader_name_container_for_msme').show();
                $('#patent_registration_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.patent_registration_uploader);
            }
            if (formData.energy_water_uploader != '') {
                $('#energy_water_uploader_container_for_msme').hide();
                $('#energy_water_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.energy_water_uploader);
                $('#energy_water_uploader_name_container_for_msme').show();
                $('#energy_water_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.energy_water_uploader);
            }
            if (formData.quality_certificate_uploader != '') {
                $('#quality_certificate_uploader_container_for_msme').hide();
                $('#quality_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.quality_certificate_uploader);
                $('#quality_certificate_uploader_name_container_for_msme').show();
                $('#quality_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.quality_certificate_uploader);
            }
            if (formData.resident_certificate_uploader != '') {
                $('#resident_certificate_uploader_container_for_msme').hide();
                $('#resident_certificate_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.resident_certificate_uploader);
                $('#resident_certificate_uploader_name_container_for_msme').show();
                $('#resident_certificate_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.resident_certificate_uploader);
            }
        }
        if(formData.is_intrest_subsidy == isChecked){
            $('#is_intrest_subsidy').prop("checked", true);
            this.$('.intrest_subsidy_div').show();
            if (formData.bank_total_interest_uploader != '') {
                $('#bank_total_interest_uploader_container_for_msme').hide();
                $('#bank_total_interest_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.bank_total_interest_uploader);
                $('#bank_total_interest_uploader_name_container_for_msme').show();
                $('#bank_total_interest_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.bank_total_interest_uploader);
            }
            if (formData.bank_statement_uploader != '') {
                $('#bank_statement_uploader_container_for_msme').hide();
                $('#bank_statement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.bank_statement_uploader);
                $('#bank_statement_uploader_name_container_for_msme').show();
                $('#bank_statement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.bank_statement_uploader);
            }
            if (formData.annexure3_declaration_uploader != '') {
                $('#annexure3_declaration_uploader_container_for_msme').hide();
                $('#annexure3_declaration_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.annexure3_declaration_uploader);
                $('#annexure3_declaration_uploader_name_container_for_msme').show();
                $('#annexure3_declaration_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.annexure3_declaration_uploader);
            }
            if (formData.interest_subsidy_cal_uploader != '') {
                $('#interest_subsidy_cal_uploader_container_for_msme').hide();
                $('#interest_subsidy_cal_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.interest_subsidy_cal_uploader);
                $('#interest_subsidy_cal_uploader_name_container_for_msme').show();
                $('#interest_subsidy_cal_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.interest_subsidy_cal_uploader);
            }
            if (formData.year_annual_prod_uploader != '') {
                $('#year_annual_prod_uploader_container_for_msme').hide();
                $('#year_annual_prod_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.year_annual_prod_uploader);
                $('#year_annual_prod_uploader_name_container_for_msme').show();
                $('#year_annual_prod_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.year_annual_prod_uploader);
            }
            if (formData.year_bank_statement_uploader != '') {
                $('#year_bank_statement_uploader_container_for_msme').hide();
                $('#year_bank_statement_uploader_name_image_for_msme').attr('src', MSME_DOC_PATH + formData.year_bank_statement_uploader);
                $('#year_bank_statement_uploader_name_container_for_msme').show();
                $('#year_bank_statement_uploader_name_image_for_msme_download').attr("href", MSME_DOC_PATH + formData.year_bank_statement_uploader);
            } 
        }
    },
    checkValidationForMSME: function (msmeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
         if (!msmeData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!msmeData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        if (!msmeData.office_address) {
            return getBasicMessageAndFieldJSONArray('office_address', officeAddressValidationMessage);
        }
        if (!msmeData.office_contactno) {
            return getBasicMessageAndFieldJSONArray('office_contactno', officeContactNoValidationMessage);
        }
        if (!msmeData.factory_address) {
            return getBasicMessageAndFieldJSONArray('factory_address', factoryAddressValidationMessage);
        }
        if (!msmeData.factory_contactno) {
            return getBasicMessageAndFieldJSONArray('factory_contactno', factoryContactNoValidationMessage);
        }
        // if (!msmeData.fax) {
        //     return getBasicMessageAndFieldJSONArray('fax', faxValidationMessage);
        // }
        // if (!msmeData.cellphone) {
        //     return getBasicMessageAndFieldJSONArray('cellphone', cellPhnoValidationMessage);
        // }
        if (!msmeData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!msmeData.promoters_details) {
            return getBasicMessageAndFieldJSONArray('promoters_details', promotersDetailValidationMessage);
        }
        if (!msmeData.othorized_person_detail) {
            return getBasicMessageAndFieldJSONArray('othorized_person_detail', othorizedPersonDetailValidationMessage);
        }
        var constitution = $('input[name=constitution]:checked').val();
        if (constitution == '' || constitution == null) {
            $('#propritorship').focus();
            return getBasicMessageAndFieldJSONArray('constitution', constitutionValidationMessage);
        }
        if(!msmeData.is_women_entrepreneur == isChecked && !msmeData.is_sc_st_entrepreneur == isChecked && !msmeData.is_physically_entrepreneur == isChecked && !msmeData.is_transgender_entrepreneur == isChecked && !msmeData.is_other_entrepreneur == isChecked ){
            $('#is_other_entrepreneur').focus();
            return getBasicMessageAndFieldJSONArray('is_other_entrepreneur', socialStatusValidationMessage);
        }
        var unitType = $('input[name=unit_type]:checked').val();
        if (unitType == '' || unitType == null) {
            $('#micro').focus();
            return getBasicMessageAndFieldJSONArray('unit_type', unitTypeValidationMessage);
        }
        var category = $('input[name=category]:checked').val();
        if (category == '' || category == null) {
            $('#new').focus();
            return getBasicMessageAndFieldJSONArray('category', categoryValidationMessage);
        }
        if (!msmeData.emno_part1) {
            return getBasicMessageAndFieldJSONArray('emno_part1', emNoValidationMessage);
        }
        if (!msmeData.emdate_part1) {
            return getBasicMessageAndFieldJSONArray('emdate_part1', emDateValidationMessage);
        }
        if (!msmeData.emno_part2) {
            return getBasicMessageAndFieldJSONArray('emno_part2', emNoValidationMessage);
        }
        if (!msmeData.emdate_part2) {
            return getBasicMessageAndFieldJSONArray('emdate_part2', emDateValidationMessage);
        }
        if (!msmeData.manufacturing_items) {
            return getBasicMessageAndFieldJSONArray('manufacturing_items', manufacturingItemValidationMessage);
        }
        if (!msmeData.annual_capacity) {
            return getBasicMessageAndFieldJSONArray('annual_capacity', annualCapacityValidationMessage);
        }
        if (!msmeData.approval_no) {
            return getBasicMessageAndFieldJSONArray('approval_no', approvalNoValidationMessage);
        }
        if (!msmeData.pccno_date) {
            return getBasicMessageAndFieldJSONArray('pccno_date', pccDateValidationMessage);
        }
        if (!msmeData.pccno_validupto_date) {
            return getBasicMessageAndFieldJSONArray('pccno_validupto_date', pccValidUptoDateValidationMessage);
        }
        if (!msmeData.factory_registration_no) {
            return getBasicMessageAndFieldJSONArray('factory_registration_no', factoryNoValidationMessage);
        }
        if (!msmeData.establishment_date) {
            return getBasicMessageAndFieldJSONArray('establishment_date', establishmentsDateValidationMessage);
        }
        if (!msmeData.establishment_validupto_date) {
            return getBasicMessageAndFieldJSONArray('establishment_validupto_date', establishmentValidUptoDateValidationMessage);
        }
        if (!msmeData.commencement_date) {
            return getBasicMessageAndFieldJSONArray('commencement_date', commencementDateValidationMessage);
        }
        if (!msmeData.annual_turnover) {
            return getBasicMessageAndFieldJSONArray('annual_turnover', turnoverValidationMessage);
        }
        if (!msmeData.annual_turnover_one) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_one', turnoverValidationMessage);
        }
        if (!msmeData.annual_turnover_two) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_two', turnoverValidationMessage);
        }
        if (!msmeData.annual_turnover_three) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_three', turnoverValidationMessage);
        }
        if (!msmeData.annual_turnover_four) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_four', turnoverValidationMessage);
        }
        var financialAssistance = $('input[name=financial_assistance]:checked').val();
        if (financialAssistance == '' || financialAssistance == null) {
            $('#financial_assistance_yes').focus();
            return getBasicMessageAndFieldJSONArray('financial_assistance', financialAssistanceValidationMessage);
        }
        var govtDues = $('input[name=govt_dues]:checked').val();
        if (govtDues == '' || financialAssistance == null) {
            $('#govt_dues_yes').focus();
            return getBasicMessageAndFieldJSONArray('govt_dues', govtDuesValidationMessage);
        }
        if (!msmeData.bank_name) {
            return getBasicMessageAndFieldJSONArray('bank_name', nameOfBankValidationMessage);
        }
        if (!msmeData.account_no) {
            return getBasicMessageAndFieldJSONArray('account_no', bankAccountNoValidationMessage);
        }
        if (!msmeData.ifsc_no) {
            return getBasicMessageAndFieldJSONArray('ifsc_no', ifscCodeValidationMessage);
        }
        if (!msmeData.bankbranch_no) {
            return getBasicMessageAndFieldJSONArray('bankbranch_no', branchCodeValidationMessage);
        }
        if (!msmeData.pancard_no) {
            return getBasicMessageAndFieldJSONArray('pancard_no', panCardValidationMessage);
        }
        
        return '';
    },
    submitMSME: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var msmeData = $('#msme_form').serializeFormJSON();
        var validationData = that.checkValidationForMSME(msmeData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('msme-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorShareInfoItem = [];
        var isproprietorShareValidation = false;
        if(msmeData.is_women_entrepreneur == isChecked || msmeData.is_sc_st_entrepreneur == isChecked || msmeData.is_physically_entrepreneur == isChecked || msmeData.is_transgender_entrepreneur == isChecked){
            $('.proprietor_share_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var proprietorShareInfo = {};
                var name = $('#name_' + cnt).val();
                if (name == '' || name == null) {
                    $('#name_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, personsNameValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.name = name;

                var empGender = $('input[name=gender_' + cnt + ']:checked').val();
                if (empGender == '' || empGender == null) {
                    $('#gender_' + cnt).focus();
                    validationMessageShow('msme-gender_' + cnt, 'Select Gender !');
                    isEmployeeInfoItemValidation = true;
                    return false;
                }
                proprietorShareInfo.gender = empGender;

                var community = $('#community_' + cnt).val();
                if (community == '' || community == null) {
                    $('#community_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, communityValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.community = community;

                var ph = $('#ph_' + cnt).val();
                if (ph == '' || ph == null) {
                    $('#ph_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, phValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.ph = ph;

                var share = $('#share_' + cnt).val();
                if (share == '' || share == null) {
                    $('#share_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, shareValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.share = share;

                var value = $('#value_' + cnt).val();
                if (value == '' || value == null) {
                    $('#value_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, valueValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.value = value;

                var percent = $('#percent_' + cnt).val();
                if (percent == '' || percent == null) {
                    $('#percent_' + cnt).focus();
                    validationMessageShow('msme-' + cnt, percentValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.percent = percent;
                proprietorShareInfoItem.push(proprietorShareInfo);
            });
        }

        if (isproprietorShareValidation) {
            return false;
        }

        if(msmeData.is_women_entrepreneur == isChecked){
           if ($('#women_entrepreneur_container_for_msme').is(':visible')) {
                var supportDocument = $('#women_entrepreneur_for_msme').val();
                if (supportDocument == '') {
                    $('#women_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-women_entrepreneur_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('women_entrepreneur_for_msme');
                if (supportDocumentMessage != '') {
                    $('#women_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-women_entrepreneur_for_msme', supportDocumentMessage);
                    return false;
                }
            } 
        }
        
        if (msmeData.is_sc_st_entrepreneur == isChecked) {
            if ($('#sc_st_entrepreneur_container_for_msme').is(':visible')) {
                var supportDocument = $('#sc_st_entrepreneur_for_msme').val();
                if (supportDocument == '') {
                    $('#sc_st_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-sc_st_entrepreneur_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('sc_st_entrepreneur_for_msme');
                if (supportDocumentMessage != '') {
                    $('#sc_st_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-sc_st_entrepreneur_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (msmeData.is_physically_entrepreneur == isChecked) {
            if ($('#physically_entrepreneur_container_for_msme').is(':visible')) {
                var supportDocument = $('#physically_entrepreneur_for_msme').val();
                if (supportDocument == '') {
                    $('#physically_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-physically_entrepreneur_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('physically_entrepreneur_for_msme');
                if (supportDocumentMessage != '') {
                    $('#physically_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-physically_entrepreneur_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (msmeData.is_transgender_entrepreneur == isChecked) {
            if ($('#transgender_entrepreneur_container_for_msme').is(':visible')) {
                var supportDocument = $('#transgender_entrepreneur_for_msme').val();
                if (supportDocument == '') {
                    $('#transgender_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-transgender_entrepreneur_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('transgender_entrepreneur_for_msme');
                if (supportDocumentMessage != '') {
                    $('#transgender_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-transgender_entrepreneur_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (msmeData.is_other_entrepreneur == isChecked) {
            if ($('#other_entrepreneur_container_for_msme').is(':visible')) {
                var supportDocument = $('#other_entrepreneur_for_msme').val();
                if (supportDocument == '') {
                    $('#other_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-other_entrepreneur_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('other_entrepreneur_for_msme');
                if (supportDocumentMessage != '') {
                    $('#other_entrepreneur_for_msme').focus();
                    validationMessageShow('msme-other_entrepreneur_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (msmeData.financial_assistance == isChecked) {
            if ($('#financial_assistance_upload_container_for_msme').is(':visible')) {
                var supportDocument = $('#financial_assistance_upload_for_msme').val();
                if (supportDocument == '') {
                    $('#financial_assistance_upload_for_msme').focus();
                    validationMessageShow('msme-financial_assistance_upload_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('financial_assistance_upload_for_msme');
                if (supportDocumentMessage != '') {
                    $('#financial_assistance_upload_for_msme').focus();
                    validationMessageShow('msme-financial_assistance_upload_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (msmeData.govt_dues == isChecked) {
            if ($('#govt_dues_upload_container_for_msme').is(':visible')) {
                var supportDocument = $('#govt_dues_upload_for_msme').val();
                if (supportDocument == '') {
                    $('#govt_dues_upload_for_msme').focus();
                    validationMessageShow('msme-govt_dues_upload_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('govt_dues_upload_for_msme');
                if (supportDocumentMessage != '') {
                    $('#govt_dues_upload_for_msme').focus();
                    validationMessageShow('msme-govt_dues_upload_for_msme', supportDocumentMessage);
                    return false;
                }
            }
        }

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_incentive') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var msmeData = new FormData($('#msme_form')[0]);
        msmeData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        msmeData.append("proprietor_share_data", JSON.stringify(proprietorShareInfoItem));
        msmeData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme',
            data: msmeData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('msme', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('msme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                that.schemeListForm(parseData.incentive_scheme_data);
            }
        });
    },

    checkValidationForScheme: function (schemeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!schemeData.parta_form == VALUE_ONE && !schemeData.partb_form == VALUE_ONE && !schemeData.partc_form == VALUE_ONE && !schemeData.partd_form == VALUE_ONE && !schemeData.parte_form == VALUE_ONE) {
            return getBasicMessageAndFieldJSONArray('parta_form', 'Select Atlist One Scheme');
        }
        
        return '';
    },
    submitSchemeDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var schemeData = $('#scheme_form').serializeFormJSON();
        var validationData = that.checkValidationForScheme(schemeData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('scheme-' + validationData.field, validationData.message);
            return false;
        }        

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_scheme_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var schemeData = new FormData($('#scheme_form')[0]);
        schemeData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        schemeData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_incentive_scheme',
            data: schemeData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('scheme', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('scheme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // $('#incentive_id').val(parseData.encrypt_id);
                // that.partADetailsForm(parseData.incentive_parta_data);

                if(parseData.scheme_flag == 'parta_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partADetailsForm(parseData.incentive_parta_data);
                }else if(parseData.scheme_flag == 'partb_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partBDetailsForm(parseData.incentive_partb_data);
                }else if(parseData.scheme_flag == 'partc_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partCDetailsForm(parseData.incentive_partc_data);
                }else if(parseData.scheme_flag == 'partd_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partDDetailsForm(parseData.incentive_partd_data);
                }else if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.msmeDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartA: function (partAData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partAData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        if (partAData.enterprise_category == VALUE_ONE) {
            if (!partAData.investment) {
                return getBasicMessageAndFieldJSONArray('investment', investmentValidationMessage);
            }
        }
        if (partAData.enterprise_category == VALUE_TWO || partAData.enterprise_category == VALUE_THREE || partAData.enterprise_category == VALUE_FOUR) {
            if (!partAData.machinery_units) {
                return getBasicMessageAndFieldJSONArray('machinery_units', machineryUnitValidationMessage);
            }
            if (!partAData.new_investment) {
                return getBasicMessageAndFieldJSONArray('new_investment', newInvestmentValidationMessage);
            }
            if (!partAData.investment_percentage) {
                return getBasicMessageAndFieldJSONArray('investment_percentage', investmentPercentageValidationMessage);
            }
        }
        if (!partAData.contribution) {
            return getBasicMessageAndFieldJSONArray('contribution', contributionValidationMessage);
        }
        if (!partAData.term_loan) {
            return getBasicMessageAndFieldJSONArray('term_loan', termLoanValidationMessage);
        }
        if (!partAData.unsecured_loan) {
            return getBasicMessageAndFieldJSONArray('unsecured_loan', unsecuredLoanValidationMessage);
        }
        if (!partAData.accruals) {
            return getBasicMessageAndFieldJSONArray('accruals', accrualsValidationMessage);
        }
         if (!partAData.finance_total) {
            return getBasicMessageAndFieldJSONArray('finance_total', financeTotalValidationMessage);
        }
        if (!partAData.term_loan_date) {
            return getBasicMessageAndFieldJSONArray('term_loan_date', termLoanDateValidationMessage);
        }
        if (!partAData.loan_accountno) {
            return getBasicMessageAndFieldJSONArray('loan_accountno', loanAccountNoValidationMessage);
        }
        if (!partAData.capital_subsidy) {
            return getBasicMessageAndFieldJSONArray('capital_subsidy', capitalSubsidyValidationMessage);
        }
        if (!partAData.anum) {
            return getBasicMessageAndFieldJSONArray('anum', anumValidationMessage);
        }
        if (!partAData.cliam_amount_total) {
            return getBasicMessageAndFieldJSONArray('cliam_amount_total', clamAmountTotalValidationMessage);
        }
        if (!partAData.commencement_date) {
            return getBasicMessageAndFieldJSONArray('commencement_date', commencementDateValidationMessage);
        }
        if (!partAData.disbursement_date) {
            return getBasicMessageAndFieldJSONArray('disbursement_date', disbursementDateValidationMessage);
        }
        
        
        return '';
    },
    submitPartADetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var partAData = $('#incentive_parta_form').serializeFormJSON();
        var validationData = that.checkValidationForPartA(partAData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-parta-' + validationData.field, validationData.message);
            return false;
        }


        var financialInstitutionInfoItem = [];
        var isfinancialInstitutionValidation = false;
        $('.financial_institution_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var financialInstitution = {};
            var nameAddress = $('#name_address_' + cnt).val();
            if (nameAddress == '' || nameAddress == null) {
                $('#name_address_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, nameAddressValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.name_address = nameAddress;

            var ifscCode = $('#ifsc_code_' + cnt).val();
            if (ifscCode == '' || ifscCode == null) {
                $('#ifsc_code_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, ifscCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.ifsc_code = ifscCode;

            var branchCode = $('#branch_code_' + cnt).val();
            if (branchCode == '' || branchCode == null) {
                $('#branch_code_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, branchCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.branch_code = branchCode;

            var loanType = $('#loan_type_' + cnt).val();
            if (loanType == '' || loanType == null) {
                $('#loan_type_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, loanTypeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.loan_type = loanType;

            var sanctionAmount = $('#sanction_amount_' + cnt).val();
            if (sanctionAmount == '' || sanctionAmount == null) {
                $('#sanction_amount_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, sanctionAmountValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.sanction_amount = sanctionAmount;

            var financialDate = $('#financial_date_' + cnt).val();
            if (financialDate == '' || financialDate == null) {
                $('#financial_date_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, dateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.financial_date = financialDate;

            var rate = $('#rate_' + cnt).val();
            if (rate == '' || rate == null) {
                $('#rate_' + cnt).focus();
                validationMessageShow('incentive-parta-' + cnt, rateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.rate = rate;
            financialInstitutionInfoItem.push(financialInstitution);
        });
      

        if (isfinancialInstitutionValidation) {
            return false;
        }

        

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_parta_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partAData = new FormData($('#incentive_parta_form')[0]);
        partAData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partAData.append("financial_institution_data", JSON.stringify(financialInstitutionInfoItem));
        partAData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_parta',
            data: partAData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('incentive-parta', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-parta', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // $('#incentive_id').val(parseData.encrypt_id);
                // that.partBDetailsForm(parseData.incentive_partb_data);
                if(parseData.scheme_flag == 'partb_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partBDetailsForm(parseData.incentive_partb_data);
                }else if(parseData.scheme_flag == 'partc_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partCDetailsForm(parseData.incentive_partc_data);
                }else if(parseData.scheme_flag == 'partd_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partDDetailsForm(parseData.incentive_partd_data);
                }else if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.msmeDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartB: function (partBData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partBData.supplier_name) {
            return getBasicMessageAndFieldJSONArray('supplier_name', supplierNameAddressValidationMessage);
        }
        if (!partBData.features) {
            return getBasicMessageAndFieldJSONArray('features', featureSystemValidationMessage);
        }
        if (!partBData.iso_agency_name) {
            return getBasicMessageAndFieldJSONArray('iso_agency_name', agencyNameValidationMessage);
        }
        if (!partBData.iso_product_detail) {
            return getBasicMessageAndFieldJSONArray('iso_product_detail', productDetailValidationMessage);
        }
        if (!partBData.iso_certificate_no) {
            return getBasicMessageAndFieldJSONArray('iso_certificate_no', isoCertificateNoValidationMessage);
        }
         if (!partBData.iso_certificate_date) {
            return getBasicMessageAndFieldJSONArray('iso_certificate_date', isoCertificateDateValidationMessage);
        }
        if (!partBData.isi_agency_name) {
            return getBasicMessageAndFieldJSONArray('isi_agency_name', agencyNameValidationMessage);
        }
        if (!partBData.isi_product_detail) {
            return getBasicMessageAndFieldJSONArray('isi_product_detail', productDetailValidationMessage);
        }
        if (!partBData.isi_certificate_no) {
            return getBasicMessageAndFieldJSONArray('isi_certificate_no', isicertificateNoValidationMessage);
        }
        if (!partBData.isi_certificate_date) {
            return getBasicMessageAndFieldJSONArray('isi_certificate_date', isicertificateDateValidationMessage);
        }
        if (!partBData.expenditure) {
            return getBasicMessageAndFieldJSONArray('expenditure', expenditureValidationMessage);
        }
        if (!partBData.capital_cost) {
            return getBasicMessageAndFieldJSONArray('capital_cost', capitalCostValidationMessage);
        }
        if (!partBData.consutancy_fees) {
            return getBasicMessageAndFieldJSONArray('consutancy_fees', consutancyFeesValidationMessage);
        }
        if (!partBData.certification_charges) {
            return getBasicMessageAndFieldJSONArray('certification_charges', certificationChargesValidationMessage);
        }
        if (!partBData.testing_equipments) {
            return getBasicMessageAndFieldJSONArray('testing_equipments', testingEquipmentsValidationMessage);
        }
        if (!partBData.cliam_amount_total) {
            return getBasicMessageAndFieldJSONArray('cliam_amount_total', clamAmountTotalValidationMessage);
        }
        
        return '';
    },
    submitPartBDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var partBData = $('#incentive_partb_form').serializeFormJSON();
        var validationData = that.checkValidationForPartB(partBData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-partb-' + validationData.field, validationData.message);
            return false;
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_partb_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partBData = new FormData($('#incentive_partb_form')[0]);
        partBData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partBData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_partb',
            data: partBData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('incentive-partb', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-partb', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // $('#incentive_id').val(parseData.encrypt_id);
                // that.partCDetailsForm(parseData.incentive_partc_data);
                if(parseData.scheme_flag == 'partc_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partCDetailsForm(parseData.incentive_partc_data);
                }else if(parseData.scheme_flag == 'partd_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partDDetailsForm(parseData.incentive_partd_data);
                }else if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.msmeDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartC: function (partCData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partCData.registration_no) {
            return getBasicMessageAndFieldJSONArray('registration_no', registrationNoValidationMessage);
        }
        if (!partCData.registration_date) {
            return getBasicMessageAndFieldJSONArray('registration_date', certificateDateValidationMessage);
        }
        if (!partCData.patent_name) {
            return getBasicMessageAndFieldJSONArray('patent_name', patentNameValidationMessage);
        }
        if (!partCData.product_name) {
            return getBasicMessageAndFieldJSONArray('product_name', productNameValidationMessage);
        }
        if (!partCData.patent_expenditure) {
            return getBasicMessageAndFieldJSONArray('patent_expenditure', patentExpenditureValidationMessage);
        }
        if (!partCData.claim_amount) {
            return getBasicMessageAndFieldJSONArray('claim_amount', cliamAmountValidationMessage);
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
        var partCData = $('#incentive_partc_form').serializeFormJSON();
        var validationData = that.checkValidationForPartC(partCData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-partc-' + validationData.field, validationData.message);
            return false;
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_partc_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partCData = new FormData($('#incentive_partc_form')[0]);
        partCData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partCData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_partc',
            data: partCData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('incentive-partc', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-partc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // $('#incentive_id').val(parseData.encrypt_id);
                // that.partDDetailsForm(parseData.incentive_partd_data);
                if(parseData.scheme_flag == 'partd_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partDDetailsForm(parseData.incentive_partd_data);
                }else if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.msmeDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartD: function (partDData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partDData.consultant_name) {
            return getBasicMessageAndFieldJSONArray('consultant_name', consultantNameAddressValidationMessage);
        }
        if (!partDData.suggestion) {
            return getBasicMessageAndFieldJSONArray('suggestion', suggestionValidationMessage);
        }
        if (!partDData.result_benefit) {
            return getBasicMessageAndFieldJSONArray('result_benefit', resultBenefitAddressValidationMessage);
        }
        if (!partDData.total_expenditure) {
            return getBasicMessageAndFieldJSONArray('total_expenditure', totalExpenditureValidationMessage);
        }
        if (!partDData.audit_fees) {
            return getBasicMessageAndFieldJSONArray('audit_fees', auditFeesValidationMessage);
        }
        if (!partDData.equipment_cost) {
            return getBasicMessageAndFieldJSONArray('equipment_cost', equipmentCostValidationMessage);
        }
        if (!partDData.cliam_amount_total) {
            return getBasicMessageAndFieldJSONArray('cliam_amount_total', clamAmountTotalValidationMessage);
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
        var partDData = $('#incentive_partd_form').serializeFormJSON();
        var validationData = that.checkValidationForPartD(partDData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-partd-' + validationData.field, validationData.message);
            return false;
        }

        var equipmentInfoItem = [];
        var isequipmentValidation = false;
        $('.equipments_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var equipment = {};
            var equipmentName = $('#equipment_name_' + cnt).val();
            if (equipmentName == '' || equipmentName == null) {
                $('#equipment_name_' + cnt).focus();
                validationMessageShow('incentive-partd-' + cnt, equipmentNameValidationMessage);
                isequipmentValidation = true;
                return false;
            }
            equipment.equipment_name = equipmentName;

            var cost = $('#cost_' + cnt).val();
            if (cost == '' || cost == null) {
                $('#cost_' + cnt).focus();
                validationMessageShow('incentive-partd-' + cnt, costValidationMessage);
                isequipmentValidation = true;
                return false;
            }
            equipment.cost = cost;
            equipmentInfoItem.push(equipment);
        });
      

        if (isequipmentValidation) {
            return false;
        }

        if ($('#audit_report_container_for_msme').is(':visible')) {
            var supportDocument = $('#audit_report_for_msme').val();
            if (supportDocument == '') {
                $('#audit_report_for_msme').focus();
                validationMessageShow('msme-audit_report_for_msme', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = pdffileUploadValidation('audit_report_for_msme');
            if (supportDocumentMessage != '') {
                $('#audit_report_for_msme').focus();
                validationMessageShow('msme-audit_report_for_msme', supportDocumentMessage);
                return false;
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_partd_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partDData = new FormData($('#incentive_partd_form')[0]);
        partDData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partDData.append("equipment_data", JSON.stringify(equipmentInfoItem));
        partDData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_partd',
            data: partDData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('incentive-partd', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-partd', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // $('#incentive_id').val(parseData.encrypt_id);
                // that.partEDetailsForm(parseData.incentive_parte_data);
                if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.msmeDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartE: function (partEData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partEData.newly_requit_emp) {
            return getBasicMessageAndFieldJSONArray('newly_requit_emp', requitEmpValidationMessage);
        }
        if (!partEData.emp_total_expenditure) {
            return getBasicMessageAndFieldJSONArray('emp_total_expenditure', empExpenditureValidationMessage);
        }
        if (!partEData.assclaim_amount) {
            return getBasicMessageAndFieldJSONArray('assclaim_amount', assclaimAmountValidationMessage);
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
        var partEData = $('#incentive_parte_form').serializeFormJSON();
        var validationData = that.checkValidationForPartE(partEData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-parte-' + validationData.field, validationData.message);
            return false;
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_parte_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partEData = new FormData($('#incentive_parte_form')[0]);
        partEData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partEData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_parte',
            data: partEData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('incentive-parte', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-parte', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // MSME.router.navigate('msme', {'trigger': true});
                $('#incentive_id').val(parseData.encrypt_id);
                that.msmeDeclarationForm(parseData.declaration_data);
            }
        });
    },
    submitMsmeDeclaration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var declarationData = $('#declaration_form').serializeFormJSON();
        
        if ($('#sign_seal_container_for_msme').is(':visible')) {
            var supportDocument = $('#sign_seal_for_msme').val();
            if (supportDocument == '') {
                $('#sign_seal_for_msme').focus();
                validationMessageShow('msme-sign_seal_for_msme', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = imagefileUploadValidation('sign_seal_for_msme');
            if (supportDocumentMessage != '') {
                $('#sign_seal_for_msme').focus();
                validationMessageShow('msme-sign_seal_for_msme', sealAndStampMessage);
                return false;
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_declaration_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var declarationData = new FormData($('#declaration_form')[0]);
        declarationData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        declarationData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_declaration',
            data: declarationData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('msme', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('msme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                // showSuccess(parseData.message);
                // MSME.router.navigate('msme', {'trigger': true});
                $('#incentive_id').val(parseData.encrypt_id);
                that.msmehecklistForm(parseData.checklist_data);
            }
        });
    },
    askForSubmitMSME: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'MSME.listview.submitMsmeChecklist(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    checkValidationForChecklist: function (checklistData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!checklistData.is_capital_investment == isChecked && !checklistData.is_intrest_subsidy == isChecked) {
            return getBasicMessageAndFieldJSONArray('is_intrest_subsidy', 'Select Option For Document Upload');
        }
        
        return '';
    },
    submitMsmeChecklist: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var checklistData = $('#checklist_form').serializeFormJSON();
        var validationData = that.checkValidationForChecklist(checklistData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('checklist-' + validationData.field, validationData.message);
            return false;
        }
        if (checklistData.is_capital_investment == isChecked) {
            if ($('#entrepreneur_memorandum_uploader_container_for_msme').is(':visible')) {
                var entrepreneurMemorandum = $('#entrepreneur_memorandum_uploader_for_msme').val();
                if (entrepreneurMemorandum == '') {
                    $('#entrepreneur_memorandum_uploader_for_msme').focus();
                    validationMessageShow('msme-entrepreneur_memorandum_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var entrepreneurMemorandumMessage = pdffileUploadValidation('entrepreneur_memorandum_uploader_for_msme');
                if (entrepreneurMemorandumMessage != '') {
                    $('#entrepreneur_memorandum_uploader_for_msme').focus();
                    validationMessageShow('msme-entrepreneur_memorandum_uploader_for_msme', entrepreneurMemorandumMessage);
                    return false;
                }
            }
            if ($('#partnership_deed_uploader_container_for_msme').is(':visible')) {
                var partnershipDeed = $('#partnership_deed_uploader_for_msme').val();
                if (partnershipDeed == '') {
                    $('#partnership_deed_uploader_for_msme').focus();
                    validationMessageShow('msme-partnership_deed_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var partnershipDeedMessage = pdffileUploadValidation('partnership_deed_uploader_for_msme');
                if (partnershipDeedMessage != '') {
                    $('#partnership_deed_uploader_for_msme').focus();
                    validationMessageShow('msme-partnership_deed_uploader_for_msme', partnershipDeedMessage);
                    return false;
                }
            }
            if ($('#lease_agreement_uploader_container_for_msme').is(':visible')) {
                var leaseAgreement = $('#lease_agreement_uploader_for_msme').val();
                if (leaseAgreement == '') {
                    $('#lease_agreement_uploader_for_msme').focus();
                    validationMessageShow('msme-lease_agreement_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var leaseAgreementMessage = pdffileUploadValidation('lease_agreement_uploader_for_msme');
                if (leaseAgreementMessage != '') {
                    $('#lease_agreement_uploader_for_msme').focus();
                    validationMessageShow('msme-lease_agreement_uploader_for_msme', leaseAgreementMessage);
                    return false;
                }
            }
            if ($('#loan_sanction_uploader_container_for_msme').is(':visible')) {
                var loanSanction = $('#loan_sanction_uploader_for_msme').val();
                if (loanSanction == '') {
                    $('#loan_sanction_uploader_for_msme').focus();
                    validationMessageShow('msme-loan_sanction_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var loanSanctionMessage = pdffileUploadValidation('loan_sanction_uploader_for_msme');
                if (loanSanctionMessage != '') {
                    $('#loan_sanction_uploader_for_msme').focus();
                    validationMessageShow('msme-loan_sanction_uploader_for_msme', loanSanctionMessage);
                    return false;
                }
            }
            if ($('#power_release_order_uploader_container_for_msme').is(':visible')) {
                var powerReleaseOrder = $('#power_release_order_uploader_for_msme').val();
                if (powerReleaseOrder == '') {
                    $('#power_release_order_uploader_for_msme').focus();
                    validationMessageShow('msme-power_release_order_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var powerReleaseOrderMessage = pdffileUploadValidation('power_release_order_uploader_for_msme');
                if (powerReleaseOrderMessage != '') {
                    $('#power_release_order_uploader_for_msme').focus();
                    validationMessageShow('msme-power_release_order_uploader_for_msme', powerReleaseOrderMessage);
                    return false;
                }
            }
            if ($('#invoice_copy_uploader_container_for_msme').is(':visible')) {
                var invoiceCopy = $('#invoice_copy_uploader_for_msme').val();
                if (invoiceCopy == '') {
                    $('#invoice_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-invoice_copy_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var invoiceCopyMessage = pdffileUploadValidation('invoice_copy_uploader_for_msme');
                if (invoiceCopyMessage != '') {
                    $('#invoice_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-invoice_copy_uploader_for_msme', invoiceCopyMessage);
                    return false;
                }
            }
            if ($('#ca_prescribed_uploader_container_for_msme').is(':visible')) {
                var caPrescribed = $('#ca_prescribed_uploader_for_msme').val();
                if (caPrescribed == '') {
                    $('#ca_prescribed_uploader_for_msme').focus();
                    validationMessageShow('msme-ca_prescribed_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var caPrescribedMessage = pdffileUploadValidation('ca_prescribed_uploader_for_msme');
                if (caPrescribedMessage != '') {
                    $('#ca_prescribed_uploader_for_msme').focus();
                    validationMessageShow('msme-ca_prescribed_uploader_for_msme', caPrescribedMessage);
                    return false;
                }
            }
            if ($('#certificate_commencement_uploader_container_for_msme').is(':visible')) {
                var certificateCommencement = $('#certificate_commencement_uploader_for_msme').val();
                if (certificateCommencement == '') {
                    $('#certificate_commencement_uploader_for_msme').focus();
                    validationMessageShow('msme-certificate_commencement_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var certificateCommencementMessage = pdffileUploadValidation('certificate_commencement_uploader_for_msme');
                if (certificateCommencementMessage != '') {
                    $('#certificate_commencement_uploader_for_msme').focus();
                    validationMessageShow('msme-certificate_commencement_uploader_for_msme', certificateCommencementMessage);
                    return false;
                }
            }
            if ($('#engineer_certificate_uploader_container_for_msme').is(':visible')) {
                var engineerCertificate = $('#engineer_certificate_uploader_for_msme').val();
                if (engineerCertificate == '') {
                    $('#engineer_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-engineer_certificate_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var engineerCertificateMessage = pdffileUploadValidation('engineer_certificate_uploader_for_msme');
                if (engineerCertificateMessage != '') {
                    $('#engineer_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-engineer_certificate_uploader_for_msme', engineerCertificateMessage);
                    return false;
                }
            }
            if ($('#expenses_certificate_uploader_container_for_msme').is(':visible')) {
                var expensesCertificate = $('#expenses_certificate_uploader_for_msme').val();
                if (expensesCertificate == '') {
                    $('#expenses_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-expenses_certificate_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var expensesCertificateMessage = pdffileUploadValidation('expenses_certificate_uploader_for_msme');
                if (expensesCertificateMessage != '') {
                    $('#expenses_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-expenses_certificate_uploader_for_msme', expensesCertificateMessage);
                    return false;
                }
            }
            if ($('#stamped_receipt_uploader_container_for_msme').is(':visible')) {
                var stampedReceipt = $('#stamped_receipt_uploader_for_msme').val();
                if (stampedReceipt == '') {
                    $('#stamped_receipt_uploader_for_msme').focus();
                    validationMessageShow('msme-stamped_receipt_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var stampedReceiptMessage = pdffileUploadValidation('stamped_receipt_uploader_for_msme');
                if (stampedReceiptMessage != '') {
                    $('#stamped_receipt_uploader_for_msme').focus();
                    validationMessageShow('msme-stamped_receipt_uploader_for_msme', sealAndStampMessage);
                    return false;
                }
            }
            if ($('#sale_invoice_uploader_container_for_msme').is(':visible')) {
                var saleInvoice = $('#sale_invoice_uploader_for_msme').val();
                if (saleInvoice == '') {
                    $('#sale_invoice_uploader_for_msme').focus();
                    validationMessageShow('msme-sale_invoice_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var saleInvoiceMessage = pdffileUploadValidation('sale_invoice_uploader_for_msme');
                if (saleInvoiceMessage != '') {
                    $('#sale_invoice_uploader_for_msme').focus();
                    validationMessageShow('msme-sale_invoice_uploader_for_msme', saleInvoiceMessage);
                    return false;
                }
            }
            if ($('#additional_document_uploader_container_for_msme').is(':visible')) {
                var additionalDocument = $('#additional_document_uploader_for_msme').val();
                if (additionalDocument == '') {
                    $('#additional_document_uploader_for_msme').focus();
                    validationMessageShow('msme-additional_document_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var additionalDocumentMessage = pdffileUploadValidation('additional_document_uploader_for_msme');
                if (additionalDocumentMessage != '') {
                    $('#additional_document_uploader_for_msme').focus();
                    validationMessageShow('msme-additional_document_uploader_for_msme', additionalDocumentMessage);
                    return false;
                }
            }
            if ($('#factorylicence_copy_uploader_container_for_msme').is(':visible')) {
                var factorylicenceCopy = $('#factorylicence_copy_uploader_for_msme').val();
                if (factorylicenceCopy == '') {
                    $('#factorylicence_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-factorylicence_copy_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var factorylicenceCopyMessage = pdffileUploadValidation('factorylicence_copy_uploader_for_msme');
                if (factorylicenceCopyMessage != '') {
                    $('#factorylicence_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-factorylicence_copy_uploader_for_msme', factorylicenceCopyMessage);
                    return false;
                }
            }
            if ($('#pcc_copy_uploader_container_for_msme').is(':visible')) {
                var pccCopy = $('#pcc_copy_uploader_for_msme').val();
                if (pccCopy == '') {
                    $('#pcc_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-pcc_copy_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var pccCopyMessage = pdffileUploadValidation('pcc_copy_uploader_for_msme');
                if (pccCopyMessage != '') {
                    $('#pcc_copy_uploader_for_msme').focus();
                    validationMessageShow('msme-pcc_copy_uploader_for_msme', pccCopyMessage);
                    return false;
                }
            }
            if ($('#expansion_date_uploader_container_for_msme').is(':visible')) {
                var expansionDate = $('#expansion_date_uploader_for_msme').val();
                if (expansionDate == '') {
                    $('#expansion_date_uploader_for_msme').focus();
                    validationMessageShow('msme-expansion_date_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var expansionDateMessage = pdffileUploadValidation('expansion_date_uploader_for_msme');
                if (expansionDateMessage != '') {
                    $('#expansion_date_uploader_for_msme').focus();
                    validationMessageShow('msme-expansion_date_uploader_for_msme', expansionDateMessage);
                    return false;
                }
            }
            if ($('#production_turnover_uploader_container_for_msme').is(':visible')) {
                var productionTurnover = $('#production_turnover_uploader_for_msme').val();
                if (productionTurnover == '') {
                    $('#production_turnover_uploader_for_msme').focus();
                    validationMessageShow('msme-production_turnover_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var productionTurnoverMessage = pdffileUploadValidation('production_turnover_uploader_for_msme');
                if (productionTurnoverMessage != '') {
                    $('#production_turnover_uploader_for_msme').focus();
                    validationMessageShow('msme-production_turnover_uploader_for_msme', productionTurnoverMessage);
                    return false;
                }
            }
            if ($('#fix_assets_value_uploader_container_for_msme').is(':visible')) {
                var fixAssetsValue = $('#fix_assets_value_uploader_for_msme').val();
                if (fixAssetsValue == '') {
                    $('#fix_assets_value_uploader_for_msme').focus();
                    validationMessageShow('msme-fix_assets_value_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var fixAssetsValueMessage = pdffileUploadValidation('fix_assets_value_uploader_for_msme');
                if (fixAssetsValueMessage != '') {
                    $('#fix_assets_value_uploader_for_msme').focus();
                    validationMessageShow('msme-fix_assets_value_uploader_for_msme', fixAssetsValueMessage);
                    return false;
                }
            }
            if ($('#production_capacity_uploader_container_for_msme').is(':visible')) {
                var productionCapacity = $('#production_capacity_uploader_for_msme').val();
                if (productionCapacity == '') {
                    $('#production_capacity_uploader_for_msme').focus();
                    validationMessageShow('msme-production_capacity_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var productionCapacityMessage = pdffileUploadValidation('production_capacity_uploader_for_msme');
                if (productionCapacityMessage != '') {
                    $('#production_capacity_uploader_for_msme').focus();
                    validationMessageShow('msme-production_capacity_uploader_for_msme', productionCapacityMessage);
                    return false;
                }
            }
            if ($('#patent_registration_uploader_container_for_msme').is(':visible')) {
                var patentRegistration = $('#patent_registration_uploader_for_msme').val();
                if (patentRegistration == '') {
                    $('#patent_registration_uploader_for_msme').focus();
                    validationMessageShow('msme-patent_registration_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var patentRegistrationMessage = pdffileUploadValidation('patent_registration_uploader_for_msme');
                if (patentRegistrationMessage != '') {
                    $('#patent_registration_uploader_for_msme').focus();
                    validationMessageShow('msme-patent_registration_uploader_for_msme', patentRegistrationMessage);
                    return false;
                }
            }
            if ($('#energy_water_uploader_container_for_msme').is(':visible')) {
                var energyWater = $('#energy_water_uploader_for_msme').val();
                if (energyWater == '') {
                    $('#energy_water_uploader_for_msme').focus();
                    validationMessageShow('msme-energy_water_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var energyWaterMessage = pdffileUploadValidation('energy_water_uploader_for_msme');
                if (energyWaterMessage != '') {
                    $('#energy_water_uploader_for_msme').focus();
                    validationMessageShow('msme-energy_water_uploader_for_msme', energyWaterMessage);
                    return false;
                }
            }
            if ($('#quality_certificate_uploader_container_for_msme').is(':visible')) {
                var qualityCertificate = $('#quality_certificate_uploader_for_msme').val();
                if (qualityCertificate == '') {
                    $('#quality_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-quality_certificate_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var qualityCertificateMessage = pdffileUploadValidation('quality_certificate_uploader_for_msme');
                if (qualityCertificateMessage != '') {
                    $('#quality_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-quality_certificate_uploader_for_msme', qualityCertificateMessage);
                    return false;
                }
            }
            if ($('#resident_certificate_uploader_container_for_msme').is(':visible')) {
                var residentCertificate = $('#resident_certificate_uploader_for_msme').val();
                if (residentCertificate == '') {
                    $('#resident_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-resident_certificate_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var residentCertificateMessage = pdffileUploadValidation('resident_certificate_uploader_for_msme');
                if (residentCertificateMessage != '') {
                    $('#resident_certificate_uploader_for_msme').focus();
                    validationMessageShow('msme-resident_certificate_uploader_for_msme', residentCertificateMessage);
                    return false;
                }
            }
        }
        if (checklistData.is_intrest_subsidy == isChecked) {
            if ($('#bank_total_interest_uploader_container_for_msme').is(':visible')) {
                var bankTotalInterest = $('#bank_total_interest_uploader_for_msme').val();
                if (bankTotalInterest == '') {
                    $('#bank_total_interest_uploader_for_msme').focus();
                    validationMessageShow('msme-bank_total_interest_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var bankTotalInterestMessage = pdffileUploadValidation('bank_total_interest_uploader_for_msme');
                if (bankTotalInterestMessage != '') {
                    $('#bank_total_interest_uploader_for_msme').focus();
                    validationMessageShow('msme-bank_total_interest_uploader_for_msme', bankTotalInterestMessage);
                    return false;
                }
            }
            if ($('#bank_statement_uploader_container_for_msme').is(':visible')) {
                var bankStatement = $('#bank_statement_uploader_for_msme').val();
                if (bankStatement == '') {
                    $('#bank_statement_uploader_for_msme').focus();
                    validationMessageShow('msme-bank_statement_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var bankStatementMessage = pdffileUploadValidation('bank_statement_uploader_for_msme');
                if (bankStatementMessage != '') {
                    $('#bank_statement_uploader_for_msme').focus();
                    validationMessageShow('msme-bank_statement_uploader_for_msme', bankStatementMessage);
                    return false;
                }
            }
            if ($('#annexure3_declaration_uploader_container_for_msme').is(':visible')) {
                var annexure3Declaration = $('#annexure3_declaration_uploader_for_msme').val();
                if (annexure3Declaration == '') {
                    $('#annexure3_declaration_uploader_for_msme').focus();
                    validationMessageShow('msme-annexure3_declaration_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var annexure3DeclarationMessage = pdffileUploadValidation('annexure3_declaration_uploader_for_msme');
                if (annexure3DeclarationMessage != '') {
                    $('#annexure3_declaration_uploader_for_msme').focus();
                    validationMessageShow('msme-annexure3_declaration_uploader_for_msme', annexure3DeclarationMessage);
                    return false;
                }
            }
            if ($('#interest_subsidy_cal_uploader_container_for_msme').is(':visible')) {
                var interestSubsidyCal = $('#interest_subsidy_cal_uploader_for_msme').val();
                if (interestSubsidyCal == '') {
                    $('#interest_subsidy_cal_uploader_for_msme').focus();
                    validationMessageShow('msme-interest_subsidy_cal_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var interestSubsidyCalMessage = pdffileUploadValidation('interest_subsidy_cal_uploader_for_msme');
                if (interestSubsidyCalMessage != '') {
                    $('#interest_subsidy_cal_uploader_for_msme').focus();
                    validationMessageShow('msme-interest_subsidy_cal_uploader_for_msme', interestSubsidyCalMessage);
                    return false;
                }
            }
            if ($('#year_annual_prod_uploader_container_for_msme').is(':visible')) {
                var yearAnnualProd = $('#year_annual_prod_uploader_for_msme').val();
                if (yearAnnualProd == '') {
                    $('#year_annual_prod_uploader_for_msme').focus();
                    validationMessageShow('msme-year_annual_prod_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var yearAnnualProdMessage = pdffileUploadValidation('year_annual_prod_uploader_for_msme');
                if (yearAnnualProdMessage != '') {
                    $('#year_annual_prod_uploader_for_msme').focus();
                    validationMessageShow('msme-year_annual_prod_uploader_for_msme', yearAnnualProdMessage);
                    return false;
                }
            }
            if ($('#year_bank_statement_uploader_container_for_msme').is(':visible')) {
                var yearBankStatement = $('#year_bank_statement_uploader_for_msme').val();
                if (yearBankStatement == '') {
                    $('#year_bank_statement_uploader_for_msme').focus();
                    validationMessageShow('msme-year_bank_statement_uploader_for_msme', uploadDocumentValidationMessage);
                    return false;
                }
                var yearBankStatementMessage = pdffileUploadValidation('year_bank_statement_uploader_for_msme');
                if (yearBankStatementMessage != '') {
                    $('#year_bank_statement_uploader_for_msme').focus();
                    validationMessageShow('msme-year_bank_statement_uploader_for_msme', yearBankStatementMessage);
                    return false;
                }
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_msme');
        var btnObj = $('#submit_btn_for_checklist_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var checklistData = new FormData($('#checklist_form')[0]);
        checklistData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        checklistData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme_checklist',
            data: checklistData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('msme', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('msme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                MSME.router.navigate('msme', {'trigger': true});
            }
        });
    },
    askForRemove: function (msmeId, docType, tableName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'MSME.listview.removeDocument(\'' + msmeId + '\',\'' + docType + '\',\'' + tableName + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (msmeId, docId, tableName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'msme/remove_document',
            data: $.extend({}, {'incentive_id': msmeId,'document_id':docId,'table_name':tableName}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('msme', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('msme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                    $('#' + docId + '_name_container_for_msme').hide();
                    $('#' + docId + '_name_image_for_msme').attr('src', '');
                    $('#' + docId + '_container_for_msme').show();
                    $('#' + docId + '_for_msme').val('');
            }
        });
    },
    addFinancialInstitution: function (templateData) {
        templateData.detail_cnt = tempDetailCnt;
        $('#financial_institution_info_container').append(financialInstitutionDetailTemplate(templateData));
        tempDetailCnt++;
        resetCounter('display-cnt');
    },
    removeFinancialInstitutionInfo: function (detailCnt) {
        $('#inancial_institution_info_' + detailCnt).remove();
        resetCounter('display-cnt');
    },

    addEquipments: function (templateData) {
        templateData.equip_cnt = tempEquipCnt;
        $('#equipments_info_container').append(equipmentsDetailTemplate(templateData));
        tempEquipCnt++;
        resetCounter('display-cnt1');
    },
    removeEquipmentsInfo: function (equipCnt) {
        $('#equipments_info_' + equipCnt).remove();
        resetCounter('display-cnt1');
    },

    addProprietorShare: function (templateData) {
        templateData.share_cnt = tempShareCnt;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        $('#proprietor_share_info_container').append(proprietorShareDetailTemplate(templateData));
        tempShareCnt++;
        resetCounter('display-cnt2');
    },
    removeProprietorShareInfo: function (shareCnt) {
        $('#proprietor_share_info_' + shareCnt).remove();
        resetCounter('display-cnt2');
    },
    generateForm1: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#incentive_id_for_msme_form1').val(incentiveId);
        $('#msme_form1_pdf_form').submit();
        $('#incentive_id_for_msme_form1').val('');
    },
    
    openUploadChallan: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var msmeData = parseData.msme_data;
                showPopup();
                if (msmeData.status != VALUE_FOUR && msmeData.status != VALUE_FIVE && msmeData.status != VALUE_SIX && msmeData.status != VALUE_SEVEN && msmeData.status != VALUE_EIGHT) {
                    msmeData.show_remove_upload_btn = true;
                }
                if (msmeData.payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Challan Copy';
                } else {
                    msmeData.utitle = 'Payment Details';
                }
                if (msmeData.status != VALUE_FOUR && msmeData.status != VALUE_FIVE && msmeData.status != VALUE_SIX) {
                    msmeData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(msmeUploadChallanTemplate(msmeData));
                generateBoxes('radio', paymentTypeArray, 'payment_type', 'msme_upload_challan', msmeData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'msme_upload_challan', 'uc', 'radio');
                if (msmeData.challan != '') {
                    $('#challan_container_for_msme_upload_challan').hide();
                    $('#challan_name_container_for_msme_upload_challan').show();
                    $('#challan_name_href_for_msme_upload_challan').attr('href', 'documents/msme/' + msmeData.challan);
                    $('#challan_name_for_msme_upload_challan').html(msmeData.challan);
                    $('#challan_remove_btn_for_msme_upload_challan').attr('onclick', 'MSME.listview.removeChallan("' + msmeData.incentive_id + '")');
                }
            }
        });
    },
    removeChallan: function (incentiveId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'msme/remove_challan',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('msme-uc', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('msme-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-msme-uc').html(parseData.message);
                removeDocument('challan', 'msme_upload_challan');
                $('#status_' + incentiveId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-msme-uc').html('');
        validationMessageHide();
        var incentiveId = $('#incentive_id_for_msme_upload_challan').val();
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_msme_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO) {
            $('#payment_type_for_msme_upload_challan_1').focus();
            validationMessageShow('msme-uc-payment_type_for_msme_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_msme_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_msme_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_msme_upload_challan').focus();
                validationMessageShow('msme-uc-challan_for_msme_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_msme_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_msme_upload_challan').focus();
                validationMessageShow('msme-uc-challan_for_msme_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_msme_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#msme_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'msme/upload_challan',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('msme-uc', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('msme-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + incentiveId).html(appStatusArray[VALUE_THREE]);
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_msme_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var msmeData = parseData.msme_data;
                showPopup();
                $('#popup_container').html(msmeApproveTemplate(msmeData));
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
        var formData = $('#approve_msme_form').serializeFormJSON();
        if (!formData.incentive_id_for_msme_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_msme_approve) {
            $('#registration_number_for_msme_approve').focus();
            validationMessageShow('msme-approve-registration_number_for_msme_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_msme_approve) {
            $('#valid_upto_for_msme_approve').focus();
            validationMessageShow('msme-approve-valid_upto_for_msme_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_msme_approve) {
            $('#remarks_for_msme_approve').focus();
            validationMessageShow('msme-approve-remarks_for_msme_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'msme/approve_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('msme-approve', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('msme-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.incentive_id_for_msme_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_msme_' + formData.incentive_id_for_msme_approve).remove();
                $('#approve_btn_for_msme_' + formData.incentive_id_for_msme_approve).remove();
            }
        });
    },
    askForRejectApplication: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_msme_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var msmeData = parseData.msme_data;
                showPopup();
                $('#popup_container').html(msmeRejectTemplate(msmeData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_msme_form').serializeFormJSON();
        if (!formData.incentive_id_for_msme_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_msme_reject) {
            $('#remarks_for_msme_reject').focus();
            validationMessageShow('msme-reject-remarks_for_msme_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'msme/reject_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('msme-reject', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('msme-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.incentive_id_for_msme_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.incentive_id_for_msme_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.incentive_id_for_msme_reject).remove();
                $('#reject_btn_for_msme_' + formData.incentive_id_for_msme_reject).remove();
                $('#approve_btn_for_msme_' + formData.incentive_id_for_msme_reject).remove();
            }
        });
    },
    generateCertificate: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#incentive_id_for_certificate').val(incentiveId);
        $('#msme_certificate_pdf_form').submit();
        $('#incentive_id_for_certificate').val('');
    },
    getQueryData: function (msmeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_NINE;
        templateData.module_id = msmeId;
        var btnObj = $('#query_btn_for_ms_' + msmeId);
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
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var moduleData = parseData.module_data;
                var tmpData = {};
                tmpData.application_number = regNoRenderer(VALUE_NINE, moduleData.incentive_id);
                tmpData.applicant_name = moduleData.enterprise_name;
                tmpData.title = 'Enterprise Name';
                tmpData.module_type = VALUE_NINE;
                tmpData.module_id = msmeId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                var msmeData = parseData.msme_data;
                showPopup();
                if (msmeData.payment_type == VALUE_ONE) {
                    msmeData.user_payment_type_text = paymentTypeArray[msmeData.payment_type];
                } else {
                    msmeData.user_payment_type_text = userPaymentTypeArray[msmeData.user_payment_type] ? userPaymentTypeArray[msmeData.user_payment_type] : '';
                }
                if (msmeData.payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Fees Paid Challan Copy';
                } else if (msmeData.payment_type == VALUE_TWO && msmeData.user_payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Demand Draft (DD) Copy';
                }
                $('#popup_container').html(msmeViewPaymentTemplate(msmeData));
                if (msmeData.payment_type == VALUE_ONE || (msmeData.payment_type == VALUE_TWO && msmeData.user_payment_type == VALUE_ONE)) {
                    if (msmeData.fees_paid_challan != '') {
                        $('#vp_container_for_msme').show();
                        $('#fees_paid_challan_name_href_for_msme').attr('href', MSME_DOC_PATH + msmeData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_msme').html(msmeData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
