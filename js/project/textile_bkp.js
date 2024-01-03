var textileListTemplate = Handlebars.compile($('#textile_list_template').html());
var textileTableTemplate = Handlebars.compile($('#textile_table_template').html());
var textileActionTemplate = Handlebars.compile($('#textile_action_template').html());
var textileFormTemplate = Handlebars.compile($('#textile_form_template').html());
var textileViewTemplate = Handlebars.compile($('#textile_view_template').html());
var textileProprietorInfoTemplate = Handlebars.compile($('#textile_proprietor_info_template').html());
var textileUploadChallanTemplate = Handlebars.compile($('#textile_upload_challan_template').html());
var textileApproveTemplate = Handlebars.compile($('#textile_approve_template').html());
var textileRejectTemplate = Handlebars.compile($('#textile_reject_template').html());
var textileViewPaymentTemplate = Handlebars.compile($('#textile_view_payment_template').html());

var schemeDetailsIncentiveFormTemplate = Handlebars.compile($('#textile_scheme_details_form_template').html());
var partFDetailsIncentiveFormTemplate = Handlebars.compile($('#partf_details_form_template').html());
var partGDetailsIncentiveFormTemplate = Handlebars.compile($('#partg_details_form_template').html());
var partHDetailsIncentiveFormTemplate = Handlebars.compile($('#parth_details_form_template').html());
var declarationFormTemplate = Handlebars.compile($('#textile_declaration_form_template').html());
var checklistFormTemplate = Handlebars.compile($('#textile_checklist_form_template').html());

var schemeViewTemplate = Handlebars.compile($('#textile_scheme_view_template').html());
var partFViewTemplate = Handlebars.compile($('#partf_view_template').html());
var partGViewTemplate = Handlebars.compile($('#partg_view_template').html());
var partHViewTemplate = Handlebars.compile($('#parth_view_template').html());
var declarationViewTemplate = Handlebars.compile($('#textile_declaration_view_template').html());
var checklistViewTemplate = Handlebars.compile($('#textile_checklist_view_template').html());

var financialInstitutionDetailTemplate = Handlebars.compile($('#financial_institution_template').html());
var equipmentsDetailTemplate = Handlebars.compile($('#equipments_template').html());
var proprietorShareDetailTemplate = Handlebars.compile($('#proprietor_share_template').html());

var tempDetailCnt   = 1;
var tempEquipCnt = 1;
var tempShareCnt = 1;

var Textile = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Textile.Router = Backbone.Router.extend({
    routes: {
        'textile': 'renderList',
        'textile_form': 'renderListForForm',
        'edit_textile_form': 'renderList',
        'view_textile_form': 'renderList',
        'scheme_details/:id': 'renderList',
        'partF_details/:id': 'renderList',
        'partG_details/:id': 'renderList',
        'partH_details/:id': 'renderList',
        'declaration/:id': 'renderList',
        'checklist/:id': 'renderList',
    },
    renderList: function () {
        Textile.listview.listPage();
    },
    renderListForForm: function () {
        Textile.listview.listPageTextileForm();
    }
});
Textile.listView = Backbone.View.extend({
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
        'click input[name="enterprise_accqu"]': 'hasEnterpriseAccquEvent',
    },
    hasEnterpriseAccquEvent: function (event) {
        var val = $('input[name=enterprise_accqu]:checked').val();
        if (val === '1') {
            this.$('.enterprise_accqu_div').show();
        } else {
            this.$('.enterprise_accqu_div').hide();

        }
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
        addClass('textile', 'active');
        Textile.router.navigate('textile');
        var templateData = {};
        this.$el.html(textileListTemplate(templateData));
        this.loadTextileData();

    },
    listPageTextileForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_dic');
        addClass('textile', 'active');
        this.$el.html(textileListTemplate);
        this.newTextileForm(false, {});
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
        rowData.module_type = VALUE_TEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return textileActionTemplate(rowData);
    },
    loadTextileData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_TEN, data);
        };
        var that = this;
        showTableContainer('incentive_generalform_textile');
        Textile.router.navigate('textile');
        $('#textile_form_and_datatable_container').html(textileTableTemplate);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_textile_list', false);
         allowOnlyIntegerValue('mobile_number_for_textile_list')
        if (tempTypeInSession == TEMP_TYPE_A) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_textile_list', false);
        textileDataTable = $('#textile_datatable').DataTable({
            ajax: {url: 'textile/get_textile_data', dataSrc: "textile_data", type: "post", data: getTokenData()},
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
             textileDataTable = $('#textile_datatable').DataTable({
            ajax: {url: 'textile/get_textile_data', dataSrc: "textile_data", type: "post", data: getTokenData()},
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
        $('#textile_datatable_filter').remove();
        $('#textile_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = textileDataTable.row(tr);

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
    newTextileForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.textile_data;
            Textile.router.navigate('edit_textile_form');
        } else {
            var formData = {};
            Textile.router.navigate('textile_form');
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
        templateData.textile_data = parseData.textile_data;
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

        showFormContainer('incentive_generalform_textile');
        $('#textile_form_and_datatable_container').html(textileFormTemplate((templateData)));
        
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice', false);
        if (isEdit) {
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
        }else{
            that.addProprietorShare({});
        }
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        if (isEdit) {
            $('#district').val(formData.district);
            if (formData.women_entrepreneur != '') {
                $('#women_entrepreneur_container_for_textile').hide();
                $('#women_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.women_entrepreneur);
                $('#women_entrepreneur_name_container_for_textile').show();
                $('#women_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.women_entrepreneur);
            }

            if (formData.sc_st_entrepreneur != '') {
                $('#sc_st_entrepreneur_container_for_textile').hide();
                $('#sc_st_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.sc_st_entrepreneur);
                $('#sc_st_entrepreneur_name_container_for_textile').show();
                $('#sc_st_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.sc_st_entrepreneur);
            }
            if (formData.physically_entrepreneur != '') {
                $('#physically_entrepreneur_container_for_textile').hide();
                $('#physically_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.physically_entrepreneur);
                $('#physically_entrepreneur_name_container_for_textile').show();
                $('#physically_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.physically_entrepreneur);
            }
            if (formData.transgender_entrepreneur != '') {
                $('#transgender_entrepreneur_container_for_textile').hide();
                $('#transgender_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.transgender_entrepreneur);
                $('#transgender_entrepreneur_name_container_for_textile').show();
                $('#transgender_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.transgender_entrepreneur);
            }
            if (formData.other_entrepreneur != '') {
                $('#other_entrepreneur_container_for_textile').hide();
                $('#other_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.other_entrepreneur);
                $('#other_entrepreneur_name_container_for_textile').show();
                $('#other_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.other_entrepreneur);
            }

            if (formData.financial_assistance_upload != '') {
                $('#financial_assistance_upload_container_for_textile').hide();
                $('#financial_assistance_upload_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.financial_assistance_upload);
                $('#financial_assistance_upload_name_container_for_textile').show();
                $('#financial_assistance_upload_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.financial_assistance_upload);
            }

            if (formData.govt_dues_upload != '') {
                $('#govt_dues_upload_container_for_textile').hide();
                $('#govt_dues_upload_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.govt_dues_upload);
                $('#govt_dues_upload_name_container_for_textile').show();
                $('#govt_dues_upload_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.govt_dues_upload);
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
        $('#textile_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitTextile($('#submit_btn_for_textile'));
            }
        });
    },
    schemeListForm: function (incentiveSchemeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('scheme_details/' + incentiveSchemeData.encrypt_id);
        incentiveSchemeData.VALUE_ONE = VALUE_ONE;
        incentiveSchemeData.VALUE_TWO = VALUE_TWO;
        incentiveSchemeData.VALUE_THREE = VALUE_THREE;
        incentiveSchemeData.VALUE_FOUR = VALUE_FOUR;
        $('#textile_form_and_datatable_container').html(schemeDetailsIncentiveFormTemplate(incentiveSchemeData));
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
    partFDetailsForm: function (incentivePartFData) {
        console.log(incentivePartFData);
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('partF_details/' + incentivePartFData.encrypt_id);
        incentivePartFData.VALUE_ONE = VALUE_ONE;
        incentivePartFData.VALUE_TWO = VALUE_TWO;
        incentivePartFData.VALUE_THREE = VALUE_THREE;
        incentivePartFData.VALUE_FOUR = VALUE_FOUR;
        incentivePartFData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(partFDetailsIncentiveFormTemplate(incentivePartFData));
        $("#new").prop("checked", true);
        this.$('.expansion_div').hide();

        if(incentivePartFData.financial_data_info){
            var financialDataInfo = JSON.parse(incentivePartFData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }

        if (incentivePartFData.project_profile_uploader != '' && incentivePartFData.project_profile_uploader != undefined) {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartFData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartFData.project_profile_uploader);
        }

        if (incentivePartFData.details_uploader != '' && incentivePartFData.details_uploader != undefined) {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartFData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartFData.details_uploader);
        }

        if (incentivePartFData.investment_uploader != '' && incentivePartFData.investment_uploader != undefined) {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartFData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartFData.investment_uploader);
        }
        datePicker();
        $('#partf_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partGDetailsForm: function (incentivePartGData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('partG_details/' + incentivePartGData.encrypt_id);
        incentivePartGData.VALUE_ONE = VALUE_ONE;
        incentivePartGData.VALUE_TWO = VALUE_TWO;
        incentivePartGData.VALUE_THREE = VALUE_THREE;
        incentivePartGData.VALUE_FOUR = VALUE_FOUR;
        incentivePartGData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(partGDetailsIncentiveFormTemplate(incentivePartGData));
        $("#new").prop("checked", true);
        this.$('.expansion_div').hide();
        
        if(incentivePartGData.financial_data_info){
            var financialDataInfo = JSON.parse(incentivePartGData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }
        if (incentivePartGData.project_profile_uploader != '' && incentivePartGData.project_profile_uploader != undefined) {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartGData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartGData.project_profile_uploader);
        }

        if (incentivePartGData.details_uploader != '' && incentivePartGData.details_uploader != undefined) {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartGData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartGData.details_uploader);
        }

        if (incentivePartGData.investment_uploader != '' && incentivePartGData.investment_uploader != undefined) {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartGData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartGData.investment_uploader);
        }

        datePicker();
        $('#partg_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    partHDetailsForm: function (incentivePartHData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('partH_details/' + incentivePartHData.encrypt_id);
        incentivePartHData.VALUE_ONE = VALUE_ONE;
        incentivePartHData.VALUE_TWO = VALUE_TWO;
        incentivePartHData.VALUE_THREE = VALUE_THREE;
        incentivePartHData.VALUE_FOUR = VALUE_FOUR;
        incentivePartHData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(partHDetailsIncentiveFormTemplate(incentivePartHData));
        $("#enterprise_accqu_yes").prop("checked", true);
        this.$('.enterprise_accqu_div').show();

        if (incentivePartHData.technology_purpose == VALUE_ONE)
            $("#acquisition").prop("checked", true);
        if (incentivePartHData.technology_purpose == VALUE_TWO)
            $("#upgradation").prop("checked", true);

        if(incentivePartHData.financial_data_info){
            var financialDataInfo = JSON.parse(incentivePartHData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }
        if (incentivePartHData.enterprise_accqu == VALUE_ONE){
            if (incentivePartHData.arrangement_uploader != '' && incentivePartHData.arrangement_uploader != undefined) {
                $('#arrangement_uploader_container_for_textile').hide();
                $('#arrangement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.arrangement_uploader);
                $('#arrangement_uploader_name_container_for_textile').show();
                $('#arrangement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.arrangement_uploader);
            }
            if (incentivePartHData.mou_uploader != '' && incentivePartHData.mou_uploader != undefined) {
                $('#mou_uploader_container_for_textile').hide();
                $('#mou_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.mou_uploader);
                $('#mou_uploader_name_container_for_textile').show();
                $('#mou_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.mou_uploader);
            }
        }
        if (incentivePartHData.project_profile_uploader != '' && incentivePartHData.project_profile_uploader != undefined) {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.project_profile_uploader);
        }

        if (incentivePartHData.details_uploader != '' && incentivePartHData.details_uploader != undefined) {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.details_uploader);
        }

        if (incentivePartHData.investment_uploader != '' && incentivePartHData.investment_uploader != undefined) {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.investment_uploader);
        }

        if (incentivePartHData.annual_production_uploader != '' && incentivePartHData.annual_production_uploader != undefined) {
            $('#annual_production_uploader_container_for_textile').hide();
            $('#annual_production_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.annual_production_uploader);
            $('#annual_production_uploader_name_container_for_textile').show();
            $('#annual_production_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.annual_production_uploader);
        }

        if (incentivePartHData.power_consumption_uploader != '' && incentivePartHData.power_consumption_uploader != undefined) {
            $('#power_consumption_uploader_container_for_textile').hide();
            $('#power_consumption_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.power_consumption_uploader);
            $('#power_consumption_uploader_name_container_for_textile').show();
            $('#power_consumption_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.power_consumption_uploader);
        }

        if (incentivePartHData.impact_uploader != '' && incentivePartHData.impact_uploader != undefined) {
            $('#impact_uploader_container_for_textile').hide();
            $('#impact_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + incentivePartHData.impact_uploader);
            $('#impact_uploader_name_container_for_textile').show();
            $('#impact_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + incentivePartHData.impact_uploader);
        }

        datePicker();
        $('#parth_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    textileDeclarationForm: function (declarationData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('declaration/' + declarationData.encrypt_id);
        declarationData.VALUE_ONE = VALUE_ONE;
        declarationData.VALUE_TWO = VALUE_TWO;
        declarationData.VALUE_THREE = VALUE_THREE;
        declarationData.VALUE_FOUR = VALUE_FOUR;
        declarationData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(declarationFormTemplate(declarationData));

        if (declarationData.sign_seal != '' && declarationData.sign_seal != undefined) {
            $('#sign_seal_container_for_textile').hide();
            $('#sign_seal_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + declarationData.sign_seal);
            $('#sign_seal_name_container_for_textile').show();
        }
        
        datePicker();
        $('#declaration_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    textilehecklistForm: function (checklistData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        
        var that = this;
        Textile.router.navigate('checklist/' + checklistData.encrypt_id);
        checklistData.is_checked = isChecked;
        checklistData.VALUE_ONE = VALUE_ONE;
        checklistData.VALUE_TWO = VALUE_TWO;
        checklistData.VALUE_THREE = VALUE_THREE;
        checklistData.VALUE_FOUR = VALUE_FOUR;
        checklistData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(checklistFormTemplate(checklistData));

        if(checklistData.is_capital_investment == isChecked){
            $('#is_capital_investment').prop("checked", true);
            this.$('.capital_investment_div').show();
            if (checklistData.entrepreneur_memorandum_uploader != '' && checklistData.entrepreneur_memorandum_uploader != undefined) {
                $('#entrepreneur_memorandum_uploader_container_for_textile').hide();
                $('#entrepreneur_memorandum_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.entrepreneur_memorandum_uploader);
                $('#entrepreneur_memorandum_uploader_name_container_for_textile').show();
                $('#entrepreneur_memorandum_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.entrepreneur_memorandum_uploader);
            }
            if (checklistData.partnership_deed_uploader != '' && checklistData.partnership_deed_uploader != undefined) {
                $('#partnership_deed_uploader_container_for_textile').hide();
                $('#partnership_deed_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.partnership_deed_uploader);
                $('#partnership_deed_uploader_name_container_for_textile').show();
                $('#partnership_deed_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.partnership_deed_uploader);
            }
            if (checklistData.lease_agreement_uploader != '' && checklistData.lease_agreement_uploader != undefined) {
                $('#lease_agreement_uploader_container_for_textile').hide();
                $('#lease_agreement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.lease_agreement_uploader);
                $('#lease_agreement_uploader_name_container_for_textile').show();
                $('#lease_agreement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.lease_agreement_uploader);
            }
            if (checklistData.loan_sanction_uploader != '' && checklistData.loan_sanction_uploader != undefined) {
                $('#loan_sanction_uploader_container_for_textile').hide();
                $('#loan_sanction_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.loan_sanction_uploader);
                $('#loan_sanction_uploader_name_container_for_textile').show();
                $('#loan_sanction_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.loan_sanction_uploader);
            }
            if (checklistData.power_release_order_uploader != '' && checklistData.power_release_order_uploader != undefined) {
                $('#power_release_order_uploader_container_for_textile').hide();
                $('#power_release_order_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.power_release_order_uploader);
                $('#power_release_order_uploader_name_container_for_textile').show();
                $('#power_release_order_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.power_release_order_uploader);
            }
            if (checklistData.invoice_copy_uploader != '' && checklistData.invoice_copy_uploader != undefined) {
                $('#invoice_copy_uploader_container_for_textile').hide();
                $('#invoice_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.invoice_copy_uploader);
                $('#invoice_copy_uploader_name_container_for_textile').show();
                $('#invoice_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.invoice_copy_uploader);
            }
            if (checklistData.ca_prescribed_uploader != '' && checklistData.ca_prescribed_uploader != undefined) {
                $('#ca_prescribed_uploader_container_for_textile').hide();
                $('#ca_prescribed_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.ca_prescribed_uploader);
                $('#ca_prescribed_uploader_name_container_for_textile').show();
                $('#ca_prescribed_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.ca_prescribed_uploader);
            }
            if (checklistData.certificate_commencement_uploader != '' && checklistData.certificate_commencement_uploader != undefined) {
                $('#certificate_commencement_uploader_container_for_textile').hide();
                $('#certificate_commencement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.certificate_commencement_uploader);
                $('#certificate_commencement_uploader_name_container_for_textile').show();
                $('#certificate_commencement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.certificate_commencement_uploader);
            }
            if (checklistData.engineer_certificate_uploader != '' && checklistData.engineer_certificate_uploader != undefined) {
                $('#engineer_certificate_uploader_container_for_textile').hide();
                $('#engineer_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.engineer_certificate_uploader);
                $('#engineer_certificate_uploader_name_container_for_textile').show();
                $('#engineer_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.engineer_certificate_uploader);
            }
            if (checklistData.expenses_certificate_uploader != '' && checklistData.expenses_certificate_uploader != undefined) {
                $('#expenses_certificate_uploader_container_for_textile').hide();
                $('#expenses_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.expenses_certificate_uploader);
                $('#expenses_certificate_uploader_name_container_for_textile').show();
                $('#expenses_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.expenses_certificate_uploader);
            }
            if (checklistData.stamped_receipt_uploader != '' && checklistData.stamped_receipt_uploader != undefined) {
                $('#stamped_receipt_uploader_container_for_textile').hide();
                $('#stamped_receipt_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.stamped_receipt_uploader);
                $('#stamped_receipt_uploader_name_container_for_textile').show();
                $('#stamped_receipt_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.stamped_receipt_uploader);
            }
            if (checklistData.sale_invoice_uploader != '' && checklistData.sale_invoice_uploader != undefined) {
                $('#sale_invoice_uploader_container_for_textile').hide();
                $('#sale_invoice_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.sale_invoice_uploader);
                $('#sale_invoice_uploader_name_container_for_textile').show();
                $('#sale_invoice_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.sale_invoice_uploader);
            }
            if (checklistData.additional_document_uploader != '' && checklistData.additional_document_uploader != undefined) {
                $('#additional_document_uploader_container_for_textile').hide();
                $('#additional_document_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.additional_document_uploader);
                $('#additional_document_uploader_name_container_for_textile').show();
                $('#additional_document_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.additional_document_uploader);
            }
            if (checklistData.factorylicence_copy_uploader != '' && checklistData.factorylicence_copy_uploader != undefined) {
                $('#factorylicence_copy_uploader_container_for_textile').hide();
                $('#factorylicence_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.factorylicence_copy_uploader);
                $('#factorylicence_copy_uploader_name_container_for_textile').show();
                $('#factorylicence_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.factorylicence_copy_uploader);
            }
            if (checklistData.pcc_copy_uploader != '' && checklistData.pcc_copy_uploader != undefined) {
                $('#pcc_copy_uploader_container_for_textile').hide();
                $('#pcc_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.pcc_copy_uploader);
                $('#pcc_copy_uploader_name_container_for_textile').show();
                $('#pcc_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.pcc_copy_uploader);
            }
            if (checklistData.expansion_date_uploader != '' && checklistData.expansion_date_uploader != undefined) {
                $('#expansion_date_uploader_container_for_textile').hide();
                $('#expansion_date_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.expansion_date_uploader);
                $('#expansion_date_uploader_name_container_for_textile').show();
                $('#expansion_date_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.expansion_date_uploader);
            }
            if (checklistData.production_turnover_uploader != '' && checklistData.production_turnover_uploader != undefined) {
                $('#production_turnover_uploader_container_for_textile').hide();
                $('#production_turnover_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.production_turnover_uploader);
                $('#production_turnover_uploader_name_container_for_textile').show();
                $('#production_turnover_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.production_turnover_uploader);
            }
            if (checklistData.fix_assets_value_uploader != '' && checklistData.fix_assets_value_uploader != undefined) {
                $('#fix_assets_value_uploader_container_for_textile').hide();
                $('#fix_assets_value_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.fix_assets_value_uploader);
                $('#fix_assets_value_uploader_name_container_for_textile').show();
                $('#fix_assets_value_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.fix_assets_value_uploader);
            }
            if (checklistData.production_capacity_uploader != '' && checklistData.production_capacity_uploader != undefined) {
                $('#production_capacity_uploader_container_for_textile').hide();
                $('#production_capacity_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.production_capacity_uploader);
                $('#production_capacity_uploader_name_container_for_textile').show();
                $('#production_capacity_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.production_capacity_uploader);
            }
            if (checklistData.patent_registration_uploader != '' && checklistData.patent_registration_uploader != undefined) {
                $('#patent_registration_uploader_container_for_textile').hide();
                $('#patent_registration_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.patent_registration_uploader);
                $('#patent_registration_uploader_name_container_for_textile').show();
                $('#patent_registration_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.patent_registration_uploader);
            }
            if (checklistData.energy_water_uploader != '' && checklistData.energy_water_uploader != undefined) {
                $('#energy_water_uploader_container_for_textile').hide();
                $('#energy_water_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.energy_water_uploader);
                $('#energy_water_uploader_name_container_for_textile').show();
                $('#energy_water_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.energy_water_uploader);
            }
            if (checklistData.quality_certificate_uploader != '' && checklistData.quality_certificate_uploader != undefined) {
                $('#quality_certificate_uploader_container_for_textile').hide();
                $('#quality_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.quality_certificate_uploader);
                $('#quality_certificate_uploader_name_container_for_textile').show();
                $('#quality_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.quality_certificate_uploader);
            }
            if (checklistData.resident_certificate_uploader != '' && checklistData.resident_certificate_uploader != undefined) {
                $('#resident_certificate_uploader_container_for_textile').hide();
                $('#resident_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.resident_certificate_uploader);
                $('#resident_certificate_uploader_name_container_for_textile').show();
                $('#resident_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.resident_certificate_uploader);
            }
        }
        if(checklistData.is_intrest_subsidy == isChecked){
            $('#is_intrest_subsidy').prop("checked", true);
            this.$('.intrest_subsidy_div').show();
            if (checklistData.bank_total_interest_uploader != '' && checklistData.bank_total_interest_uploader != undefined) {
                $('#bank_total_interest_uploader_container_for_textile').hide();
                $('#bank_total_interest_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.bank_total_interest_uploader);
                $('#bank_total_interest_uploader_name_container_for_textile').show();
                $('#bank_total_interest_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.bank_total_interest_uploader);
            }
            if (checklistData.bank_statement_uploader != '' && checklistData.bank_statement_uploader != undefined) {
                $('#bank_statement_uploader_container_for_textile').hide();
                $('#bank_statement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.bank_statement_uploader);
                $('#bank_statement_uploader_name_container_for_textile').show();
                $('#bank_statement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.bank_statement_uploader);
            }
            if (checklistData.annexure3_declaration_uploader != '' && checklistData.annexure3_declaration_uploader != undefined) {
                $('#annexure3_declaration_uploader_container_for_textile').hide();
                $('#annexure3_declaration_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.annexure3_declaration_uploader);
                $('#annexure3_declaration_uploader_name_container_for_textile').show();
                $('#annexure3_declaration_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.annexure3_declaration_uploader);
            }
            if (checklistData.interest_subsidy_cal_uploader != '' && checklistData.interest_subsidy_cal_uploader != undefined) {
                $('#interest_subsidy_cal_uploader_container_for_textile').hide();
                $('#interest_subsidy_cal_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.interest_subsidy_cal_uploader);
                $('#interest_subsidy_cal_uploader_name_container_for_textile').show();
                $('#interest_subsidy_cal_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.interest_subsidy_cal_uploader);
            }
            if (checklistData.year_annual_prod_uploader != '' && checklistData.year_annual_prod_uploader != undefined) {
                $('#year_annual_prod_uploader_container_for_textile').hide();
                $('#year_annual_prod_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.year_annual_prod_uploader);
                $('#year_annual_prod_uploader_name_container_for_textile').show();
                $('#year_annual_prod_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.year_annual_prod_uploader);
            }
            if (checklistData.year_bank_statement_uploader != '' && checklistData.year_bank_statement_uploader != undefined) {
                $('#year_bank_statement_uploader_container_for_textile').hide();
                $('#year_bank_statement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + checklistData.year_bank_statement_uploader);
                $('#year_bank_statement_uploader_name_container_for_textile').show();
                $('#year_bank_statement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + checklistData.year_bank_statement_uploader);
            }
        }
        
        datePicker();
        $('#checklist_details_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    editOrViewTextile: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_textile_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.newTextileForm(isEdit, parseData);
                } else {
                    that.viewTextileForm(parseData);
                }
            }
        });
    },
    editOrViewScheme: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
    editOrViewForms: function (btnObj, textileId, isEdit, formName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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

                if(formName == 'partg_form'){
                    if(parseData.scheme_data['partf_form'] == 1){
                        that.editOrViewPartF(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, textileId, isEdit);
                    }
                }
                else if(formName == 'parth_form'){
                    if(parseData.scheme_data['partg_form'] == 1){
                        that.editOrViewPartG(btnObj, textileId, isEdit);
                    }
                    else if(parseData.scheme_data['partf_form'] == 1){
                        that.editOrViewPartF(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, textileId, isEdit);
                    }
                }
                else if(formName == 'declaration_form'){
                    if(parseData.scheme_data['parth_form'] == 1){
                        that.editOrViewPartH(btnObj, textileId, isEdit);
                    }
                    else if(parseData.scheme_data['partg_form'] == 1){
                        that.editOrViewPartG(btnObj, textileId, isEdit);
                    }
                    else if(parseData.scheme_data['partf_form'] == 1){
                        that.editOrViewPartF(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewScheme(btnObj, textileId, isEdit);
                    }
                }  
            }
        });
    },
    editOrViewFormsForView: function (btnObj, textileId, isEdit, formName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_scheme_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    if(parseData.scheme_data['partf_form'] == 1){
                        that.editOrViewPartF(btnObj, textileId, isEdit);
                    }else if(parseData.scheme_data['partg_form'] == 1){
                        that.editOrViewPartG(btnObj, textileId, isEdit);
                    }else if(parseData.scheme_data['parth_form'] == 1){
                        that.editOrViewPartH(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, textileId, isEdit);
                    }
                }
                if(formName == 'partf_form'){
                    if(parseData.scheme_data['partg_form'] == 1){
                        that.editOrViewPartG(btnObj, textileId, isEdit);
                    }else if(parseData.scheme_data['parth_form'] == 1){
                        that.editOrViewPartH(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, textileId, isEdit);
                    }
                }
                else if(formName == 'partg_form'){
                    if(parseData.scheme_data['parth_form'] == 1){
                        that.editOrViewPartH(btnObj, textileId, isEdit);
                    }else{
                        that.editOrViewDeclaration(btnObj, textileId, isEdit);
                    }
                }
            }
        });
    },
    editOrViewPartF: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_partf_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.partFDetailsForm(parseData.partf_data);
                } else {
                    that.viewPartFForm(parseData);
                }
            }
        });
    },
    editOrViewPartG: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_partg_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.partGDetailsForm(parseData.partg_data);
                } else {
                    that.viewPartGForm(parseData);
                }
            }
        });
    },
    editOrViewPartH: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_parth_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.partHDetailsForm(parseData.parth_data);
                } else {
                    that.viewPartHForm(parseData);
                }
            }
        });
    },
    editOrViewDeclaration: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_declaration_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.textileDeclarationForm(parseData.declaration_data);
                } else {
                    that.viewDeclarationForm(parseData);
                }
            }
        });
    },
    editOrViewChecklist: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_incentive_checklist_data_by_id',
            type: 'post',
            data: $.extend({}, {'incentive_id': textileId}, getTokenData()),
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
                    that.textileChecklistForm(parseData.checklist_data);
                } else {
                    that.viewChecklistForm(parseData);
                }
            }
        });
    },
    viewTextileForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.textile_data;
        Textile.router.navigate('view_textile_form');
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

        $('#textile_form_and_datatable_container').html(textileViewTemplate(formData));

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
            $('#women_entrepreneur_container_for_textile').hide();
            $('#women_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.women_entrepreneur);
            $('#women_entrepreneur_name_container_for_textile').show();
            $('#women_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.women_entrepreneur);
        }

        if (formData.sc_st_entrepreneur != '') {
            $('#sc_st_entrepreneur_container_for_textile').hide();
            $('#sc_st_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.sc_st_entrepreneur);
            $('#sc_st_entrepreneur_name_container_for_textile').show();
            $('#sc_st_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.sc_st_entrepreneur);
        }
        if (formData.physically_entrepreneur != '') {
            $('#physically_entrepreneur_container_for_textile').hide();
            $('#physically_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.physically_entrepreneur);
            $('#physically_entrepreneur_name_container_for_textile').show();
            $('#physically_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.physically_entrepreneur);
        }
        if (formData.transgender_entrepreneur != '') {
            $('#transgender_entrepreneur_container_for_textile').hide();
            $('#transgender_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.transgender_entrepreneur);
            $('#transgender_entrepreneur_name_container_for_textile').show();
            $('#transgender_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.transgender_entrepreneur);
        }
        if (formData.other_entrepreneur != '') {
            $('#other_entrepreneur_container_for_textile').hide();
            $('#other_entrepreneur_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.other_entrepreneur);
            $('#other_entrepreneur_name_container_for_textile').show();
            $('#other_entrepreneur_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.other_entrepreneur);
        }

        if (formData.financial_assistance_upload != '') {
            $('#financial_assistance_upload_container_for_textile').hide();
            $('#financial_assistance_upload_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.financial_assistance_upload);
            $('#financial_assistance_upload_name_container_for_textile').show();
            $('#financial_assistance_upload_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.financial_assistance_upload);
        }

        if (formData.govt_dues_upload != '') {
            $('#govt_dues_upload_container_for_textile').hide();
            $('#govt_dues_upload_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.govt_dues_upload);
            $('#govt_dues_upload_name_container_for_textile').show();
            $('#govt_dues_upload_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.govt_dues_upload);
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
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(schemeViewTemplate(formData)); 
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
    viewPartFForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.partf_data;
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(partFViewTemplate(formData)); 
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

        if (formData.project_profile_uploader != '') {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.project_profile_uploader);
        }

        if (formData.details_uploader != '') {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.details_uploader);
        }

        if (formData.investment_uploader != '') {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.investment_uploader);
        }
    },
    viewPartGForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.partg_data;
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT; 
        $('#textile_form_and_datatable_container').html(partGViewTemplate(formData)); 
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
        if (formData.project_profile_uploader != '' && formData.project_profile_uploader != undefined) {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.project_profile_uploader);
        }

        if (formData.details_uploader != '' && formData.details_uploader != undefined) {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.details_uploader);
        }

        if (formData.investment_uploader != '' && formData.investment_uploader != undefined) {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.investment_uploader);
        }
    },
    viewPartHForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.parth_data;
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(partHViewTemplate(formData));  
        $("#enterprise_accqu_yes").prop("checked", true);
        this.$('.enterprise_accqu_div').show();

        if (formData.technology_purpose == VALUE_ONE)
            $("#acquisition").prop("checked", true);
        if (formData.technology_purpose == VALUE_TWO)
            $("#upgradation").prop("checked", true);
        if(formData.financial_data_info){
            var financialDataInfo = JSON.parse(formData.financial_data_info);
                $.each(financialDataInfo, function(key, value){
                    that.addFinancialInstitution(value);
            })
        }else{
            that.addFinancialInstitution({});
        }
        if (formData.enterprise_accqu == VALUE_ONE){
            if (formData.arrangement_uploader != '' && formData.arrangement_uploader != undefined) {
                $('#arrangement_uploader_container_for_textile').hide();
                $('#arrangement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.arrangement_uploader);
                $('#arrangement_uploader_name_container_for_textile').show();
                $('#arrangement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.arrangement_uploader);
            }
            if (formData.mou_uploader != '' && formData.mou_uploader != undefined) {
                $('#mou_uploader_container_for_textile').hide();
                $('#mou_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.mou_uploader);
                $('#mou_uploader_name_container_for_textile').show();
                $('#mou_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.mou_uploader);
            }
        }
        if (formData.project_profile_uploader != '' && formData.project_profile_uploader != undefined) {
            $('#project_profile_uploader_container_for_textile').hide();
            $('#project_profile_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.project_profile_uploader);
            $('#project_profile_uploader_name_container_for_textile').show();
            $('#project_profile_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.project_profile_uploader);
        }

        if (formData.details_uploader != '' && formData.details_uploader != undefined) {
            $('#details_uploader_container_for_textile').hide();
            $('#details_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.details_uploader);
            $('#details_uploader_name_container_for_textile').show();
            $('#details_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.details_uploader);
        }

        if (formData.investment_uploader != '' && formData.investment_uploader != undefined) {
            $('#investment_uploader_container_for_textile').hide();
            $('#investment_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.investment_uploader);
            $('#investment_uploader_name_container_for_textile').show();
            $('#investment_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.investment_uploader);
        }

        if (formData.annual_production_uploader != '' && formData.annual_production_uploader != undefined) {
            $('#annual_production_uploader_container_for_textile').hide();
            $('#annual_production_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.annual_production_uploader);
            $('#annual_production_uploader_name_container_for_textile').show();
            $('#annual_production_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.annual_production_uploader);
        }

        if (formData.power_consumption_uploader != '' && formData.power_consumption_uploader != undefined) {
            $('#power_consumption_uploader_container_for_textile').hide();
            $('#power_consumption_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.power_consumption_uploader);
            $('#power_consumption_uploader_name_container_for_textile').show();
            $('#power_consumption_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.power_consumption_uploader);
        }

        if (formData.impact_uploader != '' && formData.impact_uploader != undefined) {
            $('#impact_uploader_container_for_textile').hide();
            $('#impact_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.impact_uploader);
            $('#impact_uploader_name_container_for_textile').show();
            $('#impact_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.impact_uploader);
        } 
    },
    viewDeclarationForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.declaration_data;
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(declarationViewTemplate(formData)); 
        if (formData.sign_seal != '') {
            $('#sign_seal_container_for_textile').hide();
            $('#sign_seal_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.sign_seal);
            $('#sign_seal_name_container_for_textile').show();
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
        Textile.router.navigate('view_textile_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#textile_form_and_datatable_container').html(checklistViewTemplate(formData));  
        if(formData.is_capital_investment == isChecked){
            $('#is_capital_investment').prop("checked", true);
            this.$('.capital_investment_div').show(); 
            if (formData.entrepreneur_memorandum_uploader != '') {
                $('#entrepreneur_memorandum_uploader_container_for_textile').hide();
                $('#entrepreneur_memorandum_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.entrepreneur_memorandum_uploader);
                $('#entrepreneur_memorandum_uploader_name_container_for_textile').show();
                $('#entrepreneur_memorandum_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.entrepreneur_memorandum_uploader);
            }
            if (formData.partnership_deed_uploader != '') {
                $('#partnership_deed_uploader_container_for_textile').hide();
                $('#partnership_deed_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.partnership_deed_uploader);
                $('#partnership_deed_uploader_name_container_for_textile').show();
                $('#partnership_deed_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.partnership_deed_uploader);
            }
            if (formData.lease_agreement_uploader != '') {
                $('#lease_agreement_uploader_container_for_textile').hide();
                $('#lease_agreement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.lease_agreement_uploader);
                $('#lease_agreement_uploader_name_container_for_textile').show();
                $('#lease_agreement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.lease_agreement_uploader);
            }
            if (formData.loan_sanction_uploader != '') {
                $('#loan_sanction_uploader_container_for_textile').hide();
                $('#loan_sanction_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.loan_sanction_uploader);
                $('#loan_sanction_uploader_name_container_for_textile').show();
                $('#loan_sanction_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.loan_sanction_uploader);
            }
            if (formData.power_release_order_uploader != '') {
                $('#power_release_order_uploader_container_for_textile').hide();
                $('#power_release_order_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.power_release_order_uploader);
                $('#power_release_order_uploader_name_container_for_textile').show();
                $('#power_release_order_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.power_release_order_uploader);
            }
            if (formData.invoice_copy_uploader != '') {
                $('#invoice_copy_uploader_container_for_textile').hide();
                $('#invoice_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.invoice_copy_uploader);
                $('#invoice_copy_uploader_name_container_for_textile').show();
                $('#invoice_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.invoice_copy_uploader);
            }
            if (formData.ca_prescribed_uploader != '') {
                $('#ca_prescribed_uploader_container_for_textile').hide();
                $('#ca_prescribed_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.ca_prescribed_uploader);
                $('#ca_prescribed_uploader_name_container_for_textile').show();
                $('#ca_prescribed_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.ca_prescribed_uploader);
            }
            if (formData.certificate_commencement_uploader != '') {
                $('#certificate_commencement_uploader_container_for_textile').hide();
                $('#certificate_commencement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.certificate_commencement_uploader);
                $('#certificate_commencement_uploader_name_container_for_textile').show();
                $('#certificate_commencement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.certificate_commencement_uploader);
            }
            if (formData.engineer_certificate_uploader != '') {
                $('#engineer_certificate_uploader_container_for_textile').hide();
                $('#engineer_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.engineer_certificate_uploader);
                $('#engineer_certificate_uploader_name_container_for_textile').show();
                $('#engineer_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.engineer_certificate_uploader);
            }
            if (formData.expenses_certificate_uploader != '') {
                $('#expenses_certificate_uploader_container_for_textile').hide();
                $('#expenses_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.expenses_certificate_uploader);
                $('#expenses_certificate_uploader_name_container_for_textile').show();
                $('#expenses_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.expenses_certificate_uploader);
            }
            if (formData.stamped_receipt_uploader != '') {
                $('#stamped_receipt_uploader_container_for_textile').hide();
                $('#stamped_receipt_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.stamped_receipt_uploader);
                $('#stamped_receipt_uploader_name_container_for_textile').show();
                $('#stamped_receipt_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.stamped_receipt_uploader);
            }
            if (formData.sale_invoice_uploader != '') {
                $('#sale_invoice_uploader_container_for_textile').hide();
                $('#sale_invoice_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.sale_invoice_uploader);
                $('#sale_invoice_uploader_name_container_for_textile').show();
                $('#sale_invoice_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.sale_invoice_uploader);
            }
            if (formData.additional_document_uploader != '') {
                $('#additional_document_uploader_container_for_textile').hide();
                $('#additional_document_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.additional_document_uploader);
                $('#additional_document_uploader_name_container_for_textile').show();
                $('#additional_document_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.additional_document_uploader);
            }
            if (formData.factorylicence_copy_uploader != '') {
                $('#factorylicence_copy_uploader_container_for_textile').hide();
                $('#factorylicence_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.factorylicence_copy_uploader);
                $('#factorylicence_copy_uploader_name_container_for_textile').show();
                $('#factorylicence_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.factorylicence_copy_uploader);
            }
            if (formData.pcc_copy_uploader != '') {
                $('#pcc_copy_uploader_container_for_textile').hide();
                $('#pcc_copy_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.pcc_copy_uploader);
                $('#pcc_copy_uploader_name_container_for_textile').show();
                $('#pcc_copy_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.pcc_copy_uploader);
            }
            if (formData.expansion_date_uploader != '') {
                $('#expansion_date_uploader_container_for_textile').hide();
                $('#expansion_date_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.expansion_date_uploader);
                $('#expansion_date_uploader_name_container_for_textile').show();
                $('#expansion_date_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.expansion_date_uploader);
            }
            if (formData.production_turnover_uploader != '') {
                $('#production_turnover_uploader_container_for_textile').hide();
                $('#production_turnover_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.production_turnover_uploader);
                $('#production_turnover_uploader_name_container_for_textile').show();
                $('#production_turnover_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.production_turnover_uploader);
            }
            if (formData.fix_assets_value_uploader != '') {
                $('#fix_assets_value_uploader_container_for_textile').hide();
                $('#fix_assets_value_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.fix_assets_value_uploader);
                $('#fix_assets_value_uploader_name_container_for_textile').show();
                $('#fix_assets_value_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.fix_assets_value_uploader);
            }
            if (formData.production_capacity_uploader != '') {
                $('#production_capacity_uploader_container_for_textile').hide();
                $('#production_capacity_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.production_capacity_uploader);
                $('#production_capacity_uploader_name_container_for_textile').show();
                $('#production_capacity_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.production_capacity_uploader);
            }
            if (formData.patent_registration_uploader != '') {
                $('#patent_registration_uploader_container_for_textile').hide();
                $('#patent_registration_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.patent_registration_uploader);
                $('#patent_registration_uploader_name_container_for_textile').show();
                $('#patent_registration_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.patent_registration_uploader);
            }
            if (formData.energy_water_uploader != '') {
                $('#energy_water_uploader_container_for_textile').hide();
                $('#energy_water_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.energy_water_uploader);
                $('#energy_water_uploader_name_container_for_textile').show();
                $('#energy_water_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.energy_water_uploader);
            }
            if (formData.quality_certificate_uploader != '') {
                $('#quality_certificate_uploader_container_for_textile').hide();
                $('#quality_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.quality_certificate_uploader);
                $('#quality_certificate_uploader_name_container_for_textile').show();
                $('#quality_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.quality_certificate_uploader);
            }
            if (formData.resident_certificate_uploader != '') {
                $('#resident_certificate_uploader_container_for_textile').hide();
                $('#resident_certificate_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.resident_certificate_uploader);
                $('#resident_certificate_uploader_name_container_for_textile').show();
                $('#resident_certificate_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.resident_certificate_uploader);
            }
        }
        if(formData.is_intrest_subsidy == isChecked){
            $('#is_intrest_subsidy').prop("checked", true);
            this.$('.intrest_subsidy_div').show();
            if (formData.bank_total_interest_uploader != '') {
                $('#bank_total_interest_uploader_container_for_textile').hide();
                $('#bank_total_interest_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.bank_total_interest_uploader);
                $('#bank_total_interest_uploader_name_container_for_textile').show();
                $('#bank_total_interest_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.bank_total_interest_uploader);
            }
            if (formData.bank_statement_uploader != '') {
                $('#bank_statement_uploader_container_for_textile').hide();
                $('#bank_statement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.bank_statement_uploader);
                $('#bank_statement_uploader_name_container_for_textile').show();
                $('#bank_statement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.bank_statement_uploader);
            }
            if (formData.annexure3_declaration_uploader != '') {
                $('#annexure3_declaration_uploader_container_for_textile').hide();
                $('#annexure3_declaration_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.annexure3_declaration_uploader);
                $('#annexure3_declaration_uploader_name_container_for_textile').show();
                $('#annexure3_declaration_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.annexure3_declaration_uploader);
            }
            if (formData.interest_subsidy_cal_uploader != '') {
                $('#interest_subsidy_cal_uploader_container_for_textile').hide();
                $('#interest_subsidy_cal_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.interest_subsidy_cal_uploader);
                $('#interest_subsidy_cal_uploader_name_container_for_textile').show();
                $('#interest_subsidy_cal_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.interest_subsidy_cal_uploader);
            }
            if (formData.year_annual_prod_uploader != '') {
                $('#year_annual_prod_uploader_container_for_textile').hide();
                $('#year_annual_prod_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.year_annual_prod_uploader);
                $('#year_annual_prod_uploader_name_container_for_textile').show();
                $('#year_annual_prod_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.year_annual_prod_uploader);
            }
            if (formData.year_bank_statement_uploader != '') {
                $('#year_bank_statement_uploader_container_for_textile').hide();
                $('#year_bank_statement_uploader_name_image_for_textile').attr('src', TEXTILE_DOC_PATH + formData.year_bank_statement_uploader);
                $('#year_bank_statement_uploader_name_container_for_textile').show();
                $('#year_bank_statement_uploader_name_image_for_textile_download').attr("href", TEXTILE_DOC_PATH + formData.year_bank_statement_uploader);
            } 
        }
    },
    checkValidationForTextile: function (textileData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        if (!textileData.office_address) {
            return getBasicMessageAndFieldJSONArray('office_address', officeAddressValidationMessage);
        }
        if (!textileData.office_contactno) {
            return getBasicMessageAndFieldJSONArray('office_contactno', officeContactNoValidationMessage);
        }
        if (!textileData.factory_address) {
            return getBasicMessageAndFieldJSONArray('factory_address', factoryAddressValidationMessage);
        }
        if (!textileData.factory_contactno) {
            return getBasicMessageAndFieldJSONArray('factory_contactno', factoryContactNoValidationMessage);
        }
        // if (!textileData.fax) {
        //     return getBasicMessageAndFieldJSONArray('fax', faxValidationMessage);
        // }
        // if (!textileData.cellphone) {
        //     return getBasicMessageAndFieldJSONArray('cellphone', cellPhnoValidationMessage);
        // }
        if (!textileData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!textileData.promoters_details) {
            return getBasicMessageAndFieldJSONArray('promoters_details', promotersDetailValidationMessage);
        }
        if (!textileData.othorized_person_detail) {
            return getBasicMessageAndFieldJSONArray('othorized_person_detail', othorizedPersonDetailValidationMessage);
        }
        var constitution = $('input[name=constitution]:checked').val();
        if (constitution == '' || constitution == null) {
            $('#propritorship').focus();
            return getBasicMessageAndFieldJSONArray('constitution', constitutionValidationMessage);
        }
        if(!textileData.is_women_entrepreneur == isChecked && !textileData.is_sc_st_entrepreneur == isChecked && !textileData.is_physically_entrepreneur == isChecked && !textileData.is_transgender_entrepreneur == isChecked && !textileData.is_other_entrepreneur == isChecked ){
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
        if (!textileData.emno_part1) {
            return getBasicMessageAndFieldJSONArray('emno_part1', emNoValidationMessage);
        }
        if (!textileData.emdate_part1) {
            return getBasicMessageAndFieldJSONArray('emdate_part1', emDateValidationMessage);
        }
        if (!textileData.emno_part2) {
            return getBasicMessageAndFieldJSONArray('emno_part2', emNoValidationMessage);
        }
        if (!textileData.emdate_part2) {
            return getBasicMessageAndFieldJSONArray('emdate_part2', emDateValidationMessage);
        }
        if (!textileData.manufacturing_items) {
            return getBasicMessageAndFieldJSONArray('manufacturing_items', manufacturingItemValidationMessage);
        }
        if (!textileData.annual_capacity) {
            return getBasicMessageAndFieldJSONArray('annual_capacity', annualCapacityValidationMessage);
        }
        if (!textileData.approval_no) {
            return getBasicMessageAndFieldJSONArray('approval_no', approvalNoValidationMessage);
        }
        if (!textileData.pccno_date) {
            return getBasicMessageAndFieldJSONArray('pccno_date', pccDateValidationMessage);
        }
        if (!textileData.pccno_validupto_date) {
            return getBasicMessageAndFieldJSONArray('pccno_validupto_date', pccValidUptoDateValidationMessage);
        }
        if (!textileData.factory_registration_no) {
            return getBasicMessageAndFieldJSONArray('factory_registration_no', factoryNoValidationMessage);
        }
        if (!textileData.establishment_date) {
            return getBasicMessageAndFieldJSONArray('establishment_date', establishmentsDateValidationMessage);
        }
        if (!textileData.establishment_validupto_date) {
            return getBasicMessageAndFieldJSONArray('establishment_validupto_date', establishmentValidUptoDateValidationMessage);
        }
        if (!textileData.commencement_date) {
            return getBasicMessageAndFieldJSONArray('commencement_date', commencementDateValidationMessage);
        }
        if (!textileData.annual_turnover) {
            return getBasicMessageAndFieldJSONArray('annual_turnover', turnoverValidationMessage);
        }
        if (!textileData.annual_turnover_one) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_one', turnoverValidationMessage);
        }
        if (!textileData.annual_turnover_two) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_two', turnoverValidationMessage);
        }
        if (!textileData.annual_turnover_three) {
            return getBasicMessageAndFieldJSONArray('annual_turnover_three', turnoverValidationMessage);
        }
        if (!textileData.annual_turnover_four) {
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
        if (!textileData.bank_name) {
            return getBasicMessageAndFieldJSONArray('bank_name', nameOfBankValidationMessage);
        }
        if (!textileData.account_no) {
            return getBasicMessageAndFieldJSONArray('account_no', bankAccountNoValidationMessage);
        }
        if (!textileData.ifsc_no) {
            return getBasicMessageAndFieldJSONArray('ifsc_no', ifscCodeValidationMessage);
        }
        if (!textileData.bankbranch_no) {
            return getBasicMessageAndFieldJSONArray('bankbranch_no', branchCodeValidationMessage);
        }
        if (!textileData.pancard_no) {
            return getBasicMessageAndFieldJSONArray('pancard_no', panCardValidationMessage);
        }
        if (!textileData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        
        return '';
    },
    submitTextile: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var textileData = $('#textile_form').serializeFormJSON();
        var validationData = that.checkValidationForTextile(textileData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('textile-' + validationData.field, validationData.message);
            return false;
        }

        
        if(textileData.is_women_entrepreneur == isChecked || textileData.is_sc_st_entrepreneur == isChecked || textileData.is_physically_entrepreneur == isChecked || textileData.is_transgender_entrepreneur == isChecked){
            var proprietorShareInfoItem = [];
            var isproprietorShareValidation = false;
            $('.proprietor_share_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var proprietorShareInfo = {};
                var name = $('#name_' + cnt).val();
                if (name == '' || name == null) {
                    $('#name_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, personsNameValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.name = name;

                var empGender = $('input[name=gender_' + cnt + ']:checked').val();
                if (empGender == '' || empGender == null) {
                    $('#gender_' + cnt).focus();
                    validationMessageShow('textile-gender_' + cnt, 'Select Gender !');
                    isEmployeeInfoItemValidation = true;
                    return false;
                }
                proprietorShareInfo.gender = empGender;

                var community = $('#community_' + cnt).val();
                if (community == '' || community == null) {
                    $('#community_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, communityValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.community = community;

                var ph = $('#ph_' + cnt).val();
                if (ph == '' || ph == null) {
                    $('#ph_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, phValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.ph = ph;

                var share = $('#share_' + cnt).val();
                if (share == '' || share == null) {
                    $('#share_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, shareValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.share = share;

                var value = $('#value_' + cnt).val();
                if (value == '' || value == null) {
                    $('#value_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, valueValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.value = value;

                var percent = $('#percent_' + cnt).val();
                if (percent == '' || percent == null) {
                    $('#percent_' + cnt).focus();
                    validationMessageShow('textile-' + cnt, percentValidationMessage);
                    isproprietorShareValidation = true;
                    return false;
                }
                proprietorShareInfo.percent = percent;
                proprietorShareInfoItem.push(proprietorShareInfo);
            });

            if (isproprietorShareValidation) {
                return false;
            }
        }

        if(textileData.is_women_entrepreneur == isChecked){
           if ($('#women_entrepreneur_container_for_textile').is(':visible')) {
                var supportDocument = $('#women_entrepreneur_for_textile').val();
                if (supportDocument == '') {
                    $('#women_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-women_entrepreneur_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('women_entrepreneur_for_textile');
                if (supportDocumentMessage != '') {
                    $('#women_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-women_entrepreneur_for_textile', supportDocumentMessage);
                    return false;
                }
            } 
        }
        
        if (textileData.is_sc_st_entrepreneur == isChecked) {
            if ($('#sc_st_entrepreneur_container_for_textile').is(':visible')) {
                var supportDocument = $('#sc_st_entrepreneur_for_textile').val();
                if (supportDocument == '') {
                    $('#sc_st_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-sc_st_entrepreneur_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('sc_st_entrepreneur_for_textile');
                if (supportDocumentMessage != '') {
                    $('#sc_st_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-sc_st_entrepreneur_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (textileData.is_physically_entrepreneur == isChecked) {
            if ($('#physically_entrepreneur_container_for_textile').is(':visible')) {
                var supportDocument = $('#physically_entrepreneur_for_textile').val();
                if (supportDocument == '') {
                    $('#physically_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-physically_entrepreneur_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('physically_entrepreneur_for_textile');
                if (supportDocumentMessage != '') {
                    $('#physically_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-physically_entrepreneur_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (textileData.is_transgender_entrepreneur == isChecked) {
            if ($('#transgender_entrepreneur_container_for_textile').is(':visible')) {
                var supportDocument = $('#transgender_entrepreneur_for_textile').val();
                if (supportDocument == '') {
                    $('#transgender_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-transgender_entrepreneur_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('transgender_entrepreneur_for_textile');
                if (supportDocumentMessage != '') {
                    $('#transgender_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-transgender_entrepreneur_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (textileData.is_other_entrepreneur == isChecked) {
            if ($('#other_entrepreneur_container_for_textile').is(':visible')) {
                var supportDocument = $('#other_entrepreneur_for_textile').val();
                if (supportDocument == '') {
                    $('#other_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-other_entrepreneur_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('other_entrepreneur_for_textile');
                if (supportDocumentMessage != '') {
                    $('#other_entrepreneur_for_textile').focus();
                    validationMessageShow('textile-other_entrepreneur_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (textileData.financial_assistance == isChecked) {
            if ($('#financial_assistance_upload_container_for_textile').is(':visible')) {
                var supportDocument = $('#financial_assistance_upload_for_textile').val();
                if (supportDocument == '') {
                    $('#financial_assistance_upload_for_textile').focus();
                    validationMessageShow('textile-financial_assistance_upload_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('financial_assistance_upload_for_textile');
                if (supportDocumentMessage != '') {
                    $('#financial_assistance_upload_for_textile').focus();
                    validationMessageShow('textile-financial_assistance_upload_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        if (textileData.govt_dues == isChecked) {
            if ($('#govt_dues_upload_container_for_textile').is(':visible')) {
                var supportDocument = $('#govt_dues_upload_for_textile').val();
                if (supportDocument == '') {
                    $('#govt_dues_upload_for_textile').focus();
                    validationMessageShow('textile-govt_dues_upload_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('govt_dues_upload_for_textile');
                if (supportDocumentMessage != '') {
                    $('#govt_dues_upload_for_textile').focus();
                    validationMessageShow('textile-govt_dues_upload_for_textile', supportDocumentMessage);
                    return false;
                }
            }
        }

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
        var btnObj = $('#submit_btn_for_incentive') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var textileData = new FormData($('#textile_form')[0]);
        textileData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        textileData.append("proprietor_share_data", JSON.stringify(proprietorShareInfoItem));
        textileData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'textile/submit_textile',
            data: textileData,
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
                validationMessageShow('textile', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('textile', parseData.message);
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
        if (!schemeData.partf_form == VALUE_ONE && !schemeData.partg_form == VALUE_ONE && !schemeData.parth_form == VALUE_ONE && !schemeData.partd_form == VALUE_ONE && !schemeData.parte_form == VALUE_ONE) {
            return getBasicMessageAndFieldJSONArray('partf_form', 'Select Atlist One Scheme');
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

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
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
            url: 'textile/submit_incentive_scheme',
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

                if(parseData.scheme_flag == 'partf_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partFDetailsForm(parseData.incentive_partf_data);
                }else if(parseData.scheme_flag == 'partg_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partGDetailsForm(parseData.incentive_partg_data);
                }else if(parseData.scheme_flag == 'parth_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partHDetailsForm(parseData.incentive_parth_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.textileDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartF: function (partFData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partFData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        if (partFData.enterprise_category == VALUE_ONE) {
            if (!partFData.investment) {
                return getBasicMessageAndFieldJSONArray('investment', investmentValidationMessage);
            }
        }
        if (partFData.enterprise_category == VALUE_TWO || partFData.enterprise_category == VALUE_THREE || partFData.enterprise_category == VALUE_FOUR) {
            if (!partFData.machinery_units) {
                return getBasicMessageAndFieldJSONArray('machinery_units', machineryUnitValidationMessage);
            }
            if (!partFData.new_investment) {
                return getBasicMessageAndFieldJSONArray('new_investment', newInvestmentValidationMessage);
            }
            if (!partFData.investment_percentage) {
                return getBasicMessageAndFieldJSONArray('investment_percentage', investmentPercentageValidationMessage);
            }
        }
        if (!partFData.contribution) {
            return getBasicMessageAndFieldJSONArray('contribution', contributionValidationMessage);
        }
        if (!partFData.term_loan) {
            return getBasicMessageAndFieldJSONArray('term_loan', termLoanValidationMessage);
        }
        if (!partFData.unsecured_loan) {
            return getBasicMessageAndFieldJSONArray('unsecured_loan', unsecuredLoanValidationMessage);
        }
        if (!partFData.accruals) {
            return getBasicMessageAndFieldJSONArray('accruals', accrualsValidationMessage);
        }
         if (!partFData.finance_total) {
            return getBasicMessageAndFieldJSONArray('finance_total', financeTotalValidationMessage);
        }
        if (!partFData.term_loan_date) {
            return getBasicMessageAndFieldJSONArray('term_loan_date', termLoanDateValidationMessage);
        }
        if (!partFData.loan_accountno) {
            return getBasicMessageAndFieldJSONArray('loan_accountno', loanAccountNoValidationMessage);
        }
        if (!partFData.interest_subsidy) {
            return getBasicMessageAndFieldJSONArray('interest_subsidy', intrestSubsidyValidationMessage);
        }
        if (!partFData.other_info) {
            return getBasicMessageAndFieldJSONArray('other_info', otherInfoValidationMessage);
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
        var partFData = $('#incentive_partf_form').serializeFormJSON();
        var validationData = that.checkValidationForPartF(partFData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-partf-' + validationData.field, validationData.message);
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
                validationMessageShow('incentive-partf-' + cnt, nameAddressValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.name_address = nameAddress;

            var ifscCode = $('#ifsc_code_' + cnt).val();
            if (ifscCode == '' || ifscCode == null) {
                $('#ifsc_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, ifscCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.ifsc_code = ifscCode;

            var branchCode = $('#branch_code_' + cnt).val();
            if (branchCode == '' || branchCode == null) {
                $('#branch_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, branchCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.branch_code = branchCode;

            var loanType = $('#loan_type_' + cnt).val();
            if (loanType == '' || loanType == null) {
                $('#loan_type_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, loanTypeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.loan_type = loanType;

            var sanctionAmount = $('#sanction_amount_' + cnt).val();
            if (sanctionAmount == '' || sanctionAmount == null) {
                $('#sanction_amount_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, sanctionAmountValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.sanction_amount = sanctionAmount;

            var financialDate = $('#financial_date_' + cnt).val();
            if (financialDate == '' || financialDate == null) {
                $('#financial_date_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, dateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.financial_date = financialDate;

            var rate = $('#rate_' + cnt).val();
            if (rate == '' || rate == null) {
                $('#rate_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, rateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.rate = rate;
            financialInstitutionInfoItem.push(financialInstitution);
        });
      

        if (isfinancialInstitutionValidation) {
            return false;
        }

        if ($('#project_profile_uploader_container_for_textile').is(':visible')) {
            var projectProfile = $('#project_profile_uploader_for_textile').val();
            if (projectProfile == '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var projectProfileMessage = pdffileUploadValidation('project_profile_uploader_for_textile');
            if (projectProfileMessage != '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', projectProfileMessage);
                return false;
            }
        }
        if ($('#details_uploader_container_for_textile').is(':visible')) {
            var detailsUploader = $('#details_uploader_for_textile').val();
            if (detailsUploader == '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var detailsUploaderMessage = pdffileUploadValidation('details_uploader_for_textile');
            if (detailsUploaderMessage != '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', detailsUploaderMessage);
                return false;
            }
        }
        if ($('#investment_uploader_container_for_textile').is(':visible')) {
            var investmentUploader = $('#investment_uploader_for_textile').val();
            if (investmentUploader == '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var investmentUploaderMessage = pdffileUploadValidation('investment_uploader_for_textile');
            if (investmentUploaderMessage != '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', investmentUploaderMessage);
                return false;
            }
        }

        

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
        var btnObj = $('#submit_btn_for_partf_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partFData = new FormData($('#incentive_partf_form')[0]);
        partFData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partFData.append("financial_institution_data", JSON.stringify(financialInstitutionInfoItem));
        partFData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'textile/submit_textile_partf',
            data: partFData,
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
                validationMessageShow('incentive-partf', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-partf', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                if(parseData.scheme_flag == 'partg_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partGDetailsForm(parseData.incentive_partg_data);
                }else if(parseData.scheme_flag == 'parth_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partHDetailsForm(parseData.incentive_parth_data);
                }else if(parseData.scheme_flag == 'partd_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partDDetailsForm(parseData.incentive_partd_data);
                }else if(parseData.scheme_flag == 'parte_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partEDetailsForm(parseData.incentive_parte_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.textileDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartG: function (partGData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partGData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        if (partGData.enterprise_category == VALUE_ONE) {
            if (!partGData.investment) {
                return getBasicMessageAndFieldJSONArray('investment', investmentValidationMessage);
            }
        }
        if (partGData.enterprise_category == VALUE_TWO || partGData.enterprise_category == VALUE_THREE || partGData.enterprise_category == VALUE_FOUR) {
            if (!partGData.machinery_units) {
                return getBasicMessageAndFieldJSONArray('machinery_units', machineryUnitValidationMessage);
            }
            if (!partGData.new_investment) {
                return getBasicMessageAndFieldJSONArray('new_investment', newInvestmentValidationMessage);
            }
            if (!partGData.investment_percentage) {
                return getBasicMessageAndFieldJSONArray('investment_percentage', investmentPercentageValidationMessage);
            }
        }
        if (!partGData.sector_textile) {
            return getBasicMessageAndFieldJSONArray('sector_textile', sectorTextileValidationMessage);
        }
        if (!partGData.contribution) {
            return getBasicMessageAndFieldJSONArray('contribution', contributionValidationMessage);
        }
        if (!partGData.term_loan) {
            return getBasicMessageAndFieldJSONArray('term_loan', termLoanValidationMessage);
        }
        if (!partGData.unsecured_loan) {
            return getBasicMessageAndFieldJSONArray('unsecured_loan', unsecuredLoanValidationMessage);
        }
        if (!partGData.accruals) {
            return getBasicMessageAndFieldJSONArray('accruals', accrualsValidationMessage);
        }
         if (!partGData.finance_total) {
            return getBasicMessageAndFieldJSONArray('finance_total', financeTotalValidationMessage);
        }
        if (!partGData.term_loan_date) {
            return getBasicMessageAndFieldJSONArray('term_loan_date', termLoanDateValidationMessage);
        }
        if (!partGData.loan_accountno) {
            return getBasicMessageAndFieldJSONArray('loan_accountno', loanAccountNoValidationMessage);
        }
        if (!partGData.interest_subsidy) {
            return getBasicMessageAndFieldJSONArray('interest_subsidy', intrestSubsidyValidationMessage);
        }
        if (!partGData.other_info) {
            return getBasicMessageAndFieldJSONArray('other_info', otherInfoValidationMessage);
        }
        
        return '';
    },
    submitPartGDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var partGData = $('#incentive_partg_form').serializeFormJSON();
        var validationData = that.checkValidationForPartG(partGData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-partg-' + validationData.field, validationData.message);
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
                validationMessageShow('incentive-partf-' + cnt, nameAddressValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.name_address = nameAddress;

            var ifscCode = $('#ifsc_code_' + cnt).val();
            if (ifscCode == '' || ifscCode == null) {
                $('#ifsc_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, ifscCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.ifsc_code = ifscCode;

            var branchCode = $('#branch_code_' + cnt).val();
            if (branchCode == '' || branchCode == null) {
                $('#branch_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, branchCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.branch_code = branchCode;

            var loanType = $('#loan_type_' + cnt).val();
            if (loanType == '' || loanType == null) {
                $('#loan_type_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, loanTypeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.loan_type = loanType;

            var sanctionAmount = $('#sanction_amount_' + cnt).val();
            if (sanctionAmount == '' || sanctionAmount == null) {
                $('#sanction_amount_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, sanctionAmountValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.sanction_amount = sanctionAmount;

            var financialDate = $('#financial_date_' + cnt).val();
            if (financialDate == '' || financialDate == null) {
                $('#financial_date_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, dateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.financial_date = financialDate;

            var rate = $('#rate_' + cnt).val();
            if (rate == '' || rate == null) {
                $('#rate_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, rateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.rate = rate;
            financialInstitutionInfoItem.push(financialInstitution);
        });
      

        if (isfinancialInstitutionValidation) {
            return false;
        }

        if ($('#project_profile_uploader_container_for_textile').is(':visible')) {
            var projectProfile = $('#project_profile_uploader_for_textile').val();
            if (projectProfile == '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var projectProfileMessage = pdffileUploadValidation('project_profile_uploader_for_textile');
            if (projectProfileMessage != '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', projectProfileMessage);
                return false;
            }
        }
        if ($('#details_uploader_container_for_textile').is(':visible')) {
            var detailsUploader = $('#details_uploader_for_textile').val();
            if (detailsUploader == '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var detailsUploaderMessage = pdffileUploadValidation('details_uploader_for_textile');
            if (detailsUploaderMessage != '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', detailsUploaderMessage);
                return false;
            }
        }
        if ($('#investment_uploader_container_for_textile').is(':visible')) {
            var investmentUploader = $('#investment_uploader_for_textile').val();
            if (investmentUploader == '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var investmentUploaderMessage = pdffileUploadValidation('investment_uploader_for_textile');
            if (investmentUploaderMessage != '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', investmentUploaderMessage);
                return false;
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
        var btnObj = $('#submit_btn_for_partg_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partGData = new FormData($('#incentive_partg_form')[0]);
        partGData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partGData.append("financial_institution_data", JSON.stringify(financialInstitutionInfoItem));
        partGData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'textile/submit_textile_partg',
            data: partGData,
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
                validationMessageShow('incentive-partg', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-partg', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                if(parseData.scheme_flag == 'parth_form'){
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.partHDetailsForm(parseData.incentive_parth_data);
                }else{
                    $('#incentive_id').val(parseData.encrypt_id);
                    that.textileDeclarationForm(parseData.declaration_data);
                }
            }
        });
    },

    checkValidationForPartH: function (partHData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!partHData.enterprise_name) {
            return getBasicMessageAndFieldJSONArray('enterprise_name', enterpriseNameValidationMessage);
        }
        var technologyPurpose = $('input[name=technology_purpose]:checked').val();
        if (technologyPurpose == '' || technologyPurpose == null) {
            $('#upgradation').focus();
            return getBasicMessageAndFieldJSONArray('technology_purpose', technologyPurposeValidationMessage);
        }
        if (partHData.enterprise_accqu == VALUE_ONE) {
            if (!partHData.justification) {
                return getBasicMessageAndFieldJSONArray('justification', justificationValidationMessage);
            }
            if (!partHData.process_detail) {
                return getBasicMessageAndFieldJSONArray('process_detail', processDetailValidationMessage);
            }
            if (!partHData.name_address) {
                return getBasicMessageAndFieldJSONArray('name_address', nameAddressValidationMessage);
            }
        }
        if (!partHData.sector_textile) {
            return getBasicMessageAndFieldJSONArray('sector_textile', sectorTextileValidationMessage);
        }
        if (!partHData.commencement_date) {
            return getBasicMessageAndFieldJSONArray('commencement_date', commencementDateValidationMessage);
        }
        if (!partHData.purchase) {
            return getBasicMessageAndFieldJSONArray('purchase', purchaseValidationMessage);
        }
        if (!partHData.technology_fees) {
            return getBasicMessageAndFieldJSONArray('technology_fees', technologyFeesValidationMessage);
        }
        if (!partHData.other_detail) {
            return getBasicMessageAndFieldJSONArray('other_detail', otherDetailValidationMessage);
        }
        if (!partHData.upgradation_total) {
            return getBasicMessageAndFieldJSONArray('upgradation_total', financeTotalValidationMessage);
        }
        if (!partHData.contribution) {
            return getBasicMessageAndFieldJSONArray('contribution', contributionValidationMessage);
        }
        if (!partHData.term_loan) {
            return getBasicMessageAndFieldJSONArray('term_loan', termLoanValidationMessage);
        }
        if (!partHData.unsecured_loan) {
            return getBasicMessageAndFieldJSONArray('unsecured_loan', unsecuredLoanValidationMessage);
        }
        if (!partHData.accruals) {
            return getBasicMessageAndFieldJSONArray('accruals', accrualsValidationMessage);
        }
         if (!partHData.finance_total) {
            return getBasicMessageAndFieldJSONArray('finance_total', financeTotalValidationMessage);
        }
        if (!partHData.term_loan_date) {
            return getBasicMessageAndFieldJSONArray('term_loan_date', termLoanDateValidationMessage);
        }
        if (!partHData.loan_accountno) {
            return getBasicMessageAndFieldJSONArray('loan_accountno', loanAccountNoValidationMessage);
        }
        if (!partHData.interest_subsidy) {
            return getBasicMessageAndFieldJSONArray('interest_subsidy', intrestSubsidyValidationMessage);
        }
        if (!partHData.other_info) {
            return getBasicMessageAndFieldJSONArray('other_info', otherInfoValidationMessage);
        }
        
        
        return '';
    },
    submitPartHDetails: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var partHData = $('#incentive_parth_form').serializeFormJSON();
        var validationData = that.checkValidationForPartH(partHData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('incentive-parth-' + validationData.field, validationData.message);
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
                validationMessageShow('incentive-partf-' + cnt, nameAddressValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.name_address = nameAddress;

            var ifscCode = $('#ifsc_code_' + cnt).val();
            if (ifscCode == '' || ifscCode == null) {
                $('#ifsc_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, ifscCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.ifsc_code = ifscCode;

            var branchCode = $('#branch_code_' + cnt).val();
            if (branchCode == '' || branchCode == null) {
                $('#branch_code_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, branchCodeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.branch_code = branchCode;

            var loanType = $('#loan_type_' + cnt).val();
            if (loanType == '' || loanType == null) {
                $('#loan_type_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, loanTypeValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.loan_type = loanType;

            var sanctionAmount = $('#sanction_amount_' + cnt).val();
            if (sanctionAmount == '' || sanctionAmount == null) {
                $('#sanction_amount_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, sanctionAmountValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.sanction_amount = sanctionAmount;

            var financialDate = $('#financial_date_' + cnt).val();
            if (financialDate == '' || financialDate == null) {
                $('#financial_date_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, dateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.financial_date = financialDate;

            var rate = $('#rate_' + cnt).val();
            if (rate == '' || rate == null) {
                $('#rate_' + cnt).focus();
                validationMessageShow('incentive-partf-' + cnt, rateValidationMessage);
                isfinancialInstitutionValidation = true;
                return false;
            }
            financialInstitution.rate = rate;
            financialInstitutionInfoItem.push(financialInstitution);
        });
      

        if (isfinancialInstitutionValidation) {
            return false;
        }

        if (partHData.enterprise_accqu == VALUE_ONE) {
            if ($('#arrangement_uploader_container_for_textile').is(':visible')) {
                var arrangementUploader = $('#arrangement_uploader_for_textile').val();
                if (arrangementUploader == '') {
                    $('#arrangement_uploader_for_textile').focus();
                    validationMessageShow('textile-arrangement_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var arrangementUploaderMessage = pdffileUploadValidation('arrangement_uploader_for_textile');
                if (arrangementUploaderMessage != '') {
                    $('#arrangement_uploader_for_textile').focus();
                    validationMessageShow('textile-arrangement_uploader_for_textile', arrangementUploaderMessage);
                    return false;
                }
            }
            if ($('#mou_uploader_container_for_textile').is(':visible')) {
                var mouUploader = $('#mou_uploader_for_textile').val();
                if (mouUploader == '') {
                    $('#mou_uploader_for_textile').focus();
                    validationMessageShow('textile-mou_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var mouUploaderMessage = pdffileUploadValidation('mou_uploader_for_textile');
                if (mouUploaderMessage != '') {
                    $('#mou_uploader_for_textile').focus();
                    validationMessageShow('textile-mou_uploader_for_textile', mouUploaderMessage);
                    return false;
                }
            }
        }

        if ($('#project_profile_uploader_container_for_textile').is(':visible')) {
            var projectProfile = $('#project_profile_uploader_for_textile').val();
            if (projectProfile == '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var projectProfileMessage = pdffileUploadValidation('project_profile_uploader_for_textile');
            if (projectProfileMessage != '') {
                $('#project_profile_uploader_for_textile').focus();
                validationMessageShow('textile-project_profile_uploader_for_textile', projectProfileMessage);
                return false;
            }
        }
        if ($('#details_uploader_container_for_textile').is(':visible')) {
            var detailsUploader = $('#details_uploader_for_textile').val();
            if (detailsUploader == '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var detailsUploaderMessage = pdffileUploadValidation('details_uploader_for_textile');
            if (detailsUploaderMessage != '') {
                $('#details_uploader_for_textile').focus();
                validationMessageShow('textile-details_uploader_for_textile', detailsUploaderMessage);
                return false;
            }
        }
        if ($('#investment_uploader_container_for_textile').is(':visible')) {
            var investmentUploader = $('#investment_uploader_for_textile').val();
            if (investmentUploader == '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var investmentUploaderMessage = pdffileUploadValidation('investment_uploader_for_textile');
            if (investmentUploaderMessage != '') {
                $('#investment_uploader_for_textile').focus();
                validationMessageShow('textile-investment_uploader_for_textile', investmentUploaderMessage);
                return false;
            }
        }
        if ($('#annual_production_uploader_container_for_textile').is(':visible')) {
            var annualProduction = $('#annual_production_uploader_for_textile').val();
            if (annualProduction == '') {
                $('#annual_production_uploader_for_textile').focus();
                validationMessageShow('textile-annual_production_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var annualProductionMessage = pdffileUploadValidation('annual_production_uploader_for_textile');
            if (annualProductionMessage != '') {
                $('#annual_production_uploader_for_textile').focus();
                validationMessageShow('textile-annual_production_uploader_for_textile', annualProductionMessage);
                return false;
            }
        }
        if ($('#power_consumption_uploader_container_for_textile').is(':visible')) {
            var powerConsumption = $('#power_consumption_uploader_for_textile').val();
            if (powerConsumption == '') {
                $('#power_consumption_uploader_for_textile').focus();
                validationMessageShow('textile-power_consumption_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var powerConsumptionMessage = pdffileUploadValidation('power_consumption_uploader_for_textile');
            if (powerConsumptionMessage != '') {
                $('#power_consumption_uploader_for_textile').focus();
                validationMessageShow('textile-power_consumption_uploader_for_textile', powerConsumptionMessage);
                return false;
            }
        }
        if ($('#impact_uploader_container_for_textile').is(':visible')) {
            var impactUploader = $('#impact_uploader_for_textile').val();
            if (impactUploader == '') {
                $('#impact_uploader_for_textile').focus();
                validationMessageShow('textile-impact_uploader_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var impactUploaderMessage = pdffileUploadValidation('impact_uploader_for_textile');
            if (impactUploaderMessage != '') {
                $('#impact_uploader_for_textile').focus();
                validationMessageShow('textile-impact_uploader_for_textile', impactUploaderMessage);
                return false;
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
        var btnObj = $('#submit_btn_for_parth_details') ;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var partHData = new FormData($('#incentive_parth_form')[0]);
        partHData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        partHData.append("financial_institution_data", JSON.stringify(financialInstitutionInfoItem));
        partHData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'textile/submit_textile_parth',
            data: partHData,
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
                validationMessageShow('incentive-parth', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('incentive-parth', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                that.textileDeclarationForm(parseData.declaration_data);
            }
        });
    },
    submitTextileDeclaration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var declarationData = $('#declaration_form').serializeFormJSON();
        
        if ($('#sign_seal_container_for_textile').is(':visible')) {
            var supportDocument = $('#sign_seal_for_textile').val();
            if (supportDocument == '') {
                $('#sign_seal_for_textile').focus();
                validationMessageShow('textile-sign_seal_for_textile', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = imagefileUploadValidation('sign_seal_for_textile');
            if (supportDocumentMessage != '') {
                $('#sign_seal_for_textile').focus();
                validationMessageShow('textile-sign_seal_for_textile', sealAndStampMessage);
                return false;
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
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
            url: 'textile/submit_textile_declaration',
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
                validationMessageShow('textile', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('textile', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#incentive_id').val(parseData.encrypt_id);
                that.textilehecklistForm(parseData.checklist_data);
            }
        });
    },
    askForSubmitTextile: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Textile.listview.submitTextileChecklist(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    checkValidationForTextileChecklist: function (checklistData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!checklistData.is_capital_investment == isChecked && !checklistData.is_intrest_subsidy == isChecked) {
            return getBasicMessageAndFieldJSONArray('is_intrest_subsidy', 'Select Option For Document Upload');
        }
        
        return '';
    },
    submitTextileChecklist: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var checklistData = $('#checklist_form').serializeFormJSON();
        var validationData = that.checkValidationForTextileChecklist(checklistData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('checklist-' + validationData.field, validationData.message);
            return false;
        }
        
        if (checklistData.is_capital_investment == isChecked) {
            if ($('#entrepreneur_memorandum_uploader_container_for_textile').is(':visible')) {
                var entrepreneurMemorandum = $('#entrepreneur_memorandum_uploader_for_textile').val();
                if (entrepreneurMemorandum == '') {
                    $('#entrepreneur_memorandum_uploader_for_textile').focus();
                    validationMessageShow('textile-entrepreneur_memorandum_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var entrepreneurMemorandumMessage = pdffileUploadValidation('entrepreneur_memorandum_uploader_for_textile');
                if (entrepreneurMemorandumMessage != '') {
                    $('#entrepreneur_memorandum_uploader_for_textile').focus();
                    validationMessageShow('textile-entrepreneur_memorandum_uploader_for_textile', entrepreneurMemorandumMessage);
                    return false;
                }
            }
            if ($('#partnership_deed_uploader_container_for_textile').is(':visible')) {
                var partnershipDeed = $('#partnership_deed_uploader_for_textile').val();
                if (partnershipDeed == '') {
                    $('#partnership_deed_uploader_for_textile').focus();
                    validationMessageShow('textile-partnership_deed_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var partnershipDeedMessage = pdffileUploadValidation('partnership_deed_uploader_for_textile');
                if (partnershipDeedMessage != '') {
                    $('#partnership_deed_uploader_for_textile').focus();
                    validationMessageShow('textile-partnership_deed_uploader_for_textile', partnershipDeedMessage);
                    return false;
                }
            }
            if ($('#lease_agreement_uploader_container_for_textile').is(':visible')) {
                var leaseAgreement = $('#lease_agreement_uploader_for_textile').val();
                if (leaseAgreement == '') {
                    $('#lease_agreement_uploader_for_textile').focus();
                    validationMessageShow('textile-lease_agreement_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var leaseAgreementMessage = pdffileUploadValidation('lease_agreement_uploader_for_textile');
                if (leaseAgreementMessage != '') {
                    $('#lease_agreement_uploader_for_textile').focus();
                    validationMessageShow('textile-lease_agreement_uploader_for_textile', leaseAgreementMessage);
                    return false;
                }
            }
            if ($('#loan_sanction_uploader_container_for_textile').is(':visible')) {
                var loanSanction = $('#loan_sanction_uploader_for_textile').val();
                if (loanSanction == '') {
                    $('#loan_sanction_uploader_for_textile').focus();
                    validationMessageShow('textile-loan_sanction_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var loanSanctionMessage = pdffileUploadValidation('loan_sanction_uploader_for_textile');
                if (loanSanctionMessage != '') {
                    $('#loan_sanction_uploader_for_textile').focus();
                    validationMessageShow('textile-loan_sanction_uploader_for_textile', loanSanctionMessage);
                    return false;
                }
            }
            if ($('#power_release_order_uploader_container_for_textile').is(':visible')) {
                var powerReleaseOrder = $('#power_release_order_uploader_for_textile').val();
                if (powerReleaseOrder == '') {
                    $('#power_release_order_uploader_for_textile').focus();
                    validationMessageShow('textile-power_release_order_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var powerReleaseOrderMessage = pdffileUploadValidation('power_release_order_uploader_for_textile');
                if (powerReleaseOrderMessage != '') {
                    $('#power_release_order_uploader_for_textile').focus();
                    validationMessageShow('textile-power_release_order_uploader_for_textile', powerReleaseOrderMessage);
                    return false;
                }
            }
            if ($('#invoice_copy_uploader_container_for_textile').is(':visible')) {
                var invoiceCopy = $('#invoice_copy_uploader_for_textile').val();
                if (invoiceCopy == '') {
                    $('#invoice_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-invoice_copy_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var invoiceCopyMessage = pdffileUploadValidation('invoice_copy_uploader_for_textile');
                if (invoiceCopyMessage != '') {
                    $('#invoice_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-invoice_copy_uploader_for_textile', invoiceCopyMessage);
                    return false;
                }
            }
            if ($('#ca_prescribed_uploader_container_for_textile').is(':visible')) {
                var caPrescribed = $('#ca_prescribed_uploader_for_textile').val();
                if (caPrescribed == '') {
                    $('#ca_prescribed_uploader_for_textile').focus();
                    validationMessageShow('textile-ca_prescribed_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var caPrescribedMessage = pdffileUploadValidation('ca_prescribed_uploader_for_textile');
                if (caPrescribedMessage != '') {
                    $('#ca_prescribed_uploader_for_textile').focus();
                    validationMessageShow('textile-ca_prescribed_uploader_for_textile', caPrescribedMessage);
                    return false;
                }
            }
            if ($('#certificate_commencement_uploader_container_for_textile').is(':visible')) {
                var certificateCommencement = $('#certificate_commencement_uploader_for_textile').val();
                if (certificateCommencement == '') {
                    $('#certificate_commencement_uploader_for_textile').focus();
                    validationMessageShow('textile-certificate_commencement_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var certificateCommencementMessage = pdffileUploadValidation('certificate_commencement_uploader_for_textile');
                if (certificateCommencementMessage != '') {
                    $('#certificate_commencement_uploader_for_textile').focus();
                    validationMessageShow('textile-certificate_commencement_uploader_for_textile', certificateCommencementMessage);
                    return false;
                }
            }
            if ($('#engineer_certificate_uploader_container_for_textile').is(':visible')) {
                var engineerCertificate = $('#engineer_certificate_uploader_for_textile').val();
                if (engineerCertificate == '') {
                    $('#engineer_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-engineer_certificate_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var engineerCertificateMessage = pdffileUploadValidation('engineer_certificate_uploader_for_textile');
                if (engineerCertificateMessage != '') {
                    $('#engineer_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-engineer_certificate_uploader_for_textile', engineerCertificateMessage);
                    return false;
                }
            }
            if ($('#expenses_certificate_uploader_container_for_textile').is(':visible')) {
                var expensesCertificate = $('#expenses_certificate_uploader_for_textile').val();
                if (expensesCertificate == '') {
                    $('#expenses_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-expenses_certificate_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var expensesCertificateMessage = pdffileUploadValidation('expenses_certificate_uploader_for_textile');
                if (expensesCertificateMessage != '') {
                    $('#expenses_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-expenses_certificate_uploader_for_textile', expensesCertificateMessage);
                    return false;
                }
            }
            if ($('#stamped_receipt_uploader_container_for_textile').is(':visible')) {
                var stampedReceipt = $('#stamped_receipt_uploader_for_textile').val();
                if (stampedReceipt == '') {
                    $('#stamped_receipt_uploader_for_textile').focus();
                    validationMessageShow('textile-stamped_receipt_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var stampedReceiptMessage = pdffileUploadValidation('stamped_receipt_uploader_for_textile');
                if (stampedReceiptMessage != '') {
                    $('#stamped_receipt_uploader_for_textile').focus();
                    validationMessageShow('textile-stamped_receipt_uploader_for_textile', stampedReceiptMessage);
                    return false;
                }
            }
            if ($('#sale_invoice_uploader_container_for_textile').is(':visible')) {
                var saleInvoice = $('#sale_invoice_uploader_for_textile').val();
                if (saleInvoice == '') {
                    $('#sale_invoice_uploader_for_textile').focus();
                    validationMessageShow('textile-sale_invoice_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var saleInvoiceMessage = pdffileUploadValidation('sale_invoice_uploader_for_textile');
                if (saleInvoiceMessage != '') {
                    $('#sale_invoice_uploader_for_textile').focus();
                    validationMessageShow('textile-sale_invoice_uploader_for_textile', saleInvoiceMessage);
                    return false;
                }
            }
            if ($('#additional_document_uploader_container_for_textile').is(':visible')) {
                var additionalDocument = $('#additional_document_uploader_for_textile').val();
                if (additionalDocument == '') {
                    $('#additional_document_uploader_for_textile').focus();
                    validationMessageShow('textile-additional_document_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var additionalDocumentMessage = pdffileUploadValidation('additional_document_uploader_for_textile');
                if (additionalDocumentMessage != '') {
                    $('#additional_document_uploader_for_textile').focus();
                    validationMessageShow('textile-additional_document_uploader_for_textile', additionalDocumentMessage);
                    return false;
                }
            }
            if ($('#factorylicence_copy_uploader_container_for_textile').is(':visible')) {
                var factorylicenceCopy = $('#factorylicence_copy_uploader_for_textile').val();
                if (factorylicenceCopy == '') {
                    $('#factorylicence_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-factorylicence_copy_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var factorylicenceCopyMessage = pdffileUploadValidation('factorylicence_copy_uploader_for_textile');
                if (factorylicenceCopyMessage != '') {
                    $('#factorylicence_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-factorylicence_copy_uploader_for_textile', factorylicenceCopyMessage);
                    return false;
                }
            }
            if ($('#pcc_copy_uploader_container_for_textile').is(':visible')) {
                var pccCopy = $('#pcc_copy_uploader_for_textile').val();
                if (pccCopy == '') {
                    $('#pcc_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-pcc_copy_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var pccCopyMessage = pdffileUploadValidation('pcc_copy_uploader_for_textile');
                if (pccCopyMessage != '') {
                    $('#pcc_copy_uploader_for_textile').focus();
                    validationMessageShow('textile-pcc_copy_uploader_for_textile', pccCopyMessage);
                    return false;
                }
            }
            if ($('#expansion_date_uploader_container_for_textile').is(':visible')) {
                var expansionDate = $('#expansion_date_uploader_for_textile').val();
                if (expansionDate == '') {
                    $('#expansion_date_uploader_for_textile').focus();
                    validationMessageShow('textile-expansion_date_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var expansionDateMessage = pdffileUploadValidation('expansion_date_uploader_for_textile');
                if (expansionDateMessage != '') {
                    $('#expansion_date_uploader_for_textile').focus();
                    validationMessageShow('textile-expansion_date_uploader_for_textile', expansionDateMessage);
                    return false;
                }
            }
            if ($('#production_turnover_uploader_container_for_textile').is(':visible')) {
                var productionTurnover = $('#production_turnover_uploader_for_textile').val();
                if (productionTurnover == '') {
                    $('#production_turnover_uploader_for_textile').focus();
                    validationMessageShow('textile-production_turnover_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var productionTurnoverMessage = pdffileUploadValidation('production_turnover_uploader_for_textile');
                if (productionTurnoverMessage != '') {
                    $('#production_turnover_uploader_for_textile').focus();
                    validationMessageShow('textile-production_turnover_uploader_for_textile', productionTurnoverMessage);
                    return false;
                }
            }
            if ($('#fix_assets_value_uploader_container_for_textile').is(':visible')) {
                var fixAssetsValue = $('#fix_assets_value_uploader_for_textile').val();
                if (fixAssetsValue == '') {
                    $('#fix_assets_value_uploader_for_textile').focus();
                    validationMessageShow('textile-fix_assets_value_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var fixAssetsValueMessage = pdffileUploadValidation('fix_assets_value_uploader_for_textile');
                if (fixAssetsValueMessage != '') {
                    $('#fix_assets_value_uploader_for_textile').focus();
                    validationMessageShow('textile-fix_assets_value_uploader_for_textile', fixAssetsValueMessage);
                    return false;
                }
            }
            if ($('#production_capacity_uploader_container_for_textile').is(':visible')) {
                var productionCapacity = $('#production_capacity_uploader_for_textile').val();
                if (productionCapacity == '') {
                    $('#production_capacity_uploader_for_textile').focus();
                    validationMessageShow('textile-production_capacity_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var productionCapacityMessage = pdffileUploadValidation('production_capacity_uploader_for_textile');
                if (productionCapacityMessage != '') {
                    $('#production_capacity_uploader_for_textile').focus();
                    validationMessageShow('textile-production_capacity_uploader_for_textile', productionCapacityMessage);
                    return false;
                }
            }
            if ($('#patent_registration_uploader_container_for_textile').is(':visible')) {
                var patentRegistration = $('#patent_registration_uploader_for_textile').val();
                if (patentRegistration == '') {
                    $('#patent_registration_uploader_for_textile').focus();
                    validationMessageShow('textile-patent_registration_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var patentRegistrationMessage = pdffileUploadValidation('patent_registration_uploader_for_textile');
                if (patentRegistrationMessage != '') {
                    $('#patent_registration_uploader_for_textile').focus();
                    validationMessageShow('textile-patent_registration_uploader_for_textile', patentRegistrationMessage);
                    return false;
                }
            }
            if ($('#energy_water_uploader_container_for_textile').is(':visible')) {
                var energyWater = $('#energy_water_uploader_for_textile').val();
                if (energyWater == '') {
                    $('#energy_water_uploader_for_textile').focus();
                    validationMessageShow('textile-energy_water_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var energyWaterMessage = pdffileUploadValidation('energy_water_uploader_for_textile');
                if (energyWaterMessage != '') {
                    $('#energy_water_uploader_for_textile').focus();
                    validationMessageShow('textile-energy_water_uploader_for_textile', energyWaterMessage);
                    return false;
                }
            }
            if ($('#quality_certificate_uploader_container_for_textile').is(':visible')) {
                var qualityCertificate = $('#quality_certificate_uploader_for_textile').val();
                if (qualityCertificate == '') {
                    $('#quality_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-quality_certificate_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var qualityCertificateMessage = pdffileUploadValidation('quality_certificate_uploader_for_textile');
                if (qualityCertificateMessage != '') {
                    $('#quality_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-quality_certificate_uploader_for_textile', qualityCertificateMessage);
                    return false;
                }
            }
            if ($('#resident_certificate_uploader_container_for_textile').is(':visible')) {
                var residentCertificate = $('#resident_certificate_uploader_for_textile').val();
                if (residentCertificate == '') {
                    $('#resident_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-resident_certificate_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var residentCertificateMessage = pdffileUploadValidation('resident_certificate_uploader_for_textile');
                if (residentCertificateMessage != '') {
                    $('#resident_certificate_uploader_for_textile').focus();
                    validationMessageShow('textile-resident_certificate_uploader_for_textile', residentCertificateMessage);
                    return false;
                }
            }
        }
        if (checklistData.is_intrest_subsidy == isChecked) {
            if ($('#bank_total_interest_uploader_container_for_textile').is(':visible')) {
                var bankTotalInterest = $('#bank_total_interest_uploader_for_textile').val();
                if (bankTotalInterest == '') {
                    $('#bank_total_interest_uploader_for_textile').focus();
                    validationMessageShow('textile-bank_total_interest_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var bankTotalInterestMessage = pdffileUploadValidation('bank_total_interest_uploader_for_textile');
                if (bankTotalInterestMessage != '') {
                    $('#bank_total_interest_uploader_for_textile').focus();
                    validationMessageShow('textile-bank_total_interest_uploader_for_textile', bankTotalInterestMessage);
                    return false;
                }
            }
            if ($('#bank_statement_uploader_container_for_textile').is(':visible')) {
                var bankStatement = $('#bank_statement_uploader_for_textile').val();
                if (bankStatement == '') {
                    $('#bank_statement_uploader_for_textile').focus();
                    validationMessageShow('textile-bank_statement_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var bankStatementMessage = pdffileUploadValidation('bank_statement_uploader_for_textile');
                if (bankStatementMessage != '') {
                    $('#bank_statement_uploader_for_textile').focus();
                    validationMessageShow('textile-bank_statement_uploader_for_textile', bankStatementMessage);
                    return false;
                }
            }
            if ($('#annexure3_declaration_uploader_container_for_textile').is(':visible')) {
                var annexure3Declaration = $('#annexure3_declaration_uploader_for_textile').val();
                if (annexure3Declaration == '') {
                    $('#annexure3_declaration_uploader_for_textile').focus();
                    validationMessageShow('textile-annexure3_declaration_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var annexure3DeclarationMessage = pdffileUploadValidation('annexure3_declaration_uploader_for_textile');
                if (annexure3DeclarationMessage != '') {
                    $('#annexure3_declaration_uploader_for_textile').focus();
                    validationMessageShow('textile-annexure3_declaration_uploader_for_textile', annexure3DeclarationMessage);
                    return false;
                }
            }
            if ($('#interest_subsidy_cal_uploader_container_for_textile').is(':visible')) {
                var interestSubsidyCal = $('#interest_subsidy_cal_uploader_for_textile').val();
                if (interestSubsidyCal == '') {
                    $('#interest_subsidy_cal_uploader_for_textile').focus();
                    validationMessageShow('textile-interest_subsidy_cal_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var interestSubsidyCalMessage = pdffileUploadValidation('interest_subsidy_cal_uploader_for_textile');
                if (interestSubsidyCalMessage != '') {
                    $('#interest_subsidy_cal_uploader_for_textile').focus();
                    validationMessageShow('textile-interest_subsidy_cal_uploader_for_textile', interestSubsidyCalMessage);
                    return false;
                }
            }
            if ($('#year_annual_prod_uploader_container_for_textile').is(':visible')) {
                var yearAnnualProd = $('#year_annual_prod_uploader_for_textile').val();
                if (yearAnnualProd == '') {
                    $('#year_annual_prod_uploader_for_textile').focus();
                    validationMessageShow('textile-year_annual_prod_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var yearAnnualProdMessage = pdffileUploadValidation('year_annual_prod_uploader_for_textile');
                if (yearAnnualProdMessage != '') {
                    $('#year_annual_prod_uploader_for_textile').focus();
                    validationMessageShow('textile-year_annual_prod_uploader_for_textile', yearAnnualProdMessage);
                    return false;
                }
            }
            if ($('#year_bank_statement_uploader_container_for_textile').is(':visible')) {
                var yearBankStatement = $('#year_bank_statement_uploader_for_textile').val();
                if (yearBankStatement == '') {
                    $('#year_bank_statement_uploader_for_textile').focus();
                    validationMessageShow('textile-year_bank_statement_uploader_for_textile', uploadDocumentValidationMessage);
                    return false;
                }
                var yearBankStatementMessage = pdffileUploadValidation('year_bank_statement_uploader_for_textile');
                if (yearBankStatementMessage != '') {
                    $('#year_bank_statement_uploader_for_textile').focus();
                    validationMessageShow('textile-year_bank_statement_uploader_for_textile', yearBankStatementMessage);
                    return false;
                }
            }
        }
        
        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_textile');
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
            url: 'textile/submit_textile_checklist',
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
                validationMessageShow('textile', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('textile', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Textile.router.navigate('textile', {'trigger': true});
            }
        });
    },
    askForRemove: function (textileId, docType, tableName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!textileId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Textile.listview.removeDocument(\'' + textileId + '\',\'' + docType + '\',\'' + tableName + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (textileId, docId, tableName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!textileId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'textile/remove_document',
            data: $.extend({}, {'incentive_id': textileId,'document_id':docId,'table_name':tableName}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('textile', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('textile', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                    $('#' + docId + '_name_container_for_textile').hide();
                    $('#' + docId + '_name_image_for_textile').attr('src', '');
                    $('#' + docId + '_container_for_textile').show();
                    $('#' + docId + '_for_textile').val('');
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
        $('#incentive_id_for_textile_form1').val(incentiveId);
        $('#textile_form1_pdf_form').submit();
        $('#incentive_id_for_textile_form1').val('');
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
            url: 'textile/get_textile_data_by_textile_id',
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
                var textileData = parseData.textile_data;
                showPopup();
                if (textileData.status != textileData && textileData.status != VALUE_FIVE && textileData.status != VALUE_SIX && textileData.status != VALUE_SEVEN && textileData.status != VALUE_EIGHT) {
                    textileData.show_remove_upload_btn = true;
                }
                if (textileData.payment_type == VALUE_ONE) {
                    textileData.utitle = 'Challan Copy';
                } else {
                    textileData.utitle = 'Payment Details';
                }
                if (textileData.status != VALUE_FOUR && textileData.status != VALUE_FIVE && textileData.status != VALUE_SIX) {
                    textileData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(textileUploadChallanTemplate(textileData));
                generateBoxes('radio', paymentTypeArray, 'payment_type', 'textile_upload_challan', textileData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'textile_upload_challan', 'uc', 'radio');
                if (textileData.challan != '') {
                    $('#challan_container_for_textile_upload_challan').hide();
                    $('#challan_name_container_for_textile_upload_challan').show();
                    $('#challan_name_href_for_textile_upload_challan').attr('href', 'documents/textile/' + textileData.challan);
                    $('#challan_name_for_textile_upload_challan').html(textileData.challan);
                    $('#challan_remove_btn_for_textile_upload_challan').attr('onclick', 'Textile.listview.removeChallan("' + textileData.incentive_id + '")');
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
            url: 'textile/remove_challan',
            data: $.extend({}, {'incentive_id': incentiveId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('textile-uc', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('textile-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-textile-uc').html(parseData.message);
                removeDocument('challan', 'textile_upload_challan');
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
        $('.success-message-textile-uc').html('');
        validationMessageHide();
        var incentiveId = $('#incentive_id_for_textile_upload_challan').val();
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_textile_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO) {
            $('#payment_type_for_textile_upload_challan_1').focus();
            validationMessageShow('textile-uc-payment_type_for_textile_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_textile_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_textile_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_textile_upload_challan').focus();
                validationMessageShow('textile-uc-challan_for_textile_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_textile_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_textile_upload_challan').focus();
                validationMessageShow('textile-uc-challan_for_textile_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_textile_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#textile_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'textile/upload_challan',
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
                validationMessageShow('textile-uc', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('textile-uc', parseData.message);
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
        var btnObj = $('#approve_btn_for_app_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_textile_data_by_textile_id',
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
                var textileData = parseData.textile_data;
                showPopup();
                $('#popup_container').html(textileApproveTemplate(textileData));
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
        var formData = $('#approve_textile_form').serializeFormJSON();
        if (!formData.incentive_id_for_textile_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_textile_approve) {
            $('#registration_number_for_textile_approve').focus();
            validationMessageShow('textile-approve-registration_number_for_textile_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_textile_approve) {
            $('#valid_upto_for_textile_approve').focus();
            validationMessageShow('textile-approve-valid_upto_for_textile_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_textile_approve) {
            $('#remarks_for_textile_approve').focus();
            validationMessageShow('textile-approve-remarks_for_textile_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'textile/approve_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('textile-approve', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('textile-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.incentive_id_for_textile_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.incentive_id_for_textile_approve).remove();
                $('#approve_btn_for_app_' + formData.incentive_id_for_textile_approve).remove();
            }
        });
    },
    askForRejectApplication: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + incentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'textile/get_textile_data_by_textile_id',
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
                var textileData = parseData.textile_data;
                showPopup();
                $('#popup_container').html(textileRejectTemplate(textileData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_textile_form').serializeFormJSON();
        if (!formData.incentive_id_for_textile_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_textile_reject) {
            $('#remarks_for_textile_reject').focus();
            validationMessageShow('textile-reject-remarks_for_textile_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'textile/reject_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('textile-reject', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    validationMessageShow('textile-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.incentive_id_for_textile_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.incentive_id_for_textile_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.incentive_id_for_textile_reject).remove();
                $('#reject_btn_for_app_' + formData.incentive_id_for_textile_reject).remove();
                $('#approve_btn_for_app_' + formData.incentive_id_for_textile_reject).remove();
            }
        });
    },
    generateCertificate: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#incentive_id_for_certificate').val(incentiveId);
        $('#textile_certificate_pdf_form').submit();
        $('#incentive_id_for_certificate').val('');
    },
    getQueryData: function (textileId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TEN;
        templateData.module_id = textileId;
        var btnObj = $('#query_btn_for_ms_' + textileId);
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
                tmpData.application_number = regNoRenderer(VALUE_TEN, moduleData.incentive_id);
                tmpData.applicant_name = moduleData.enterprise_name;
                tmpData.title = 'Enterprise Name';
                tmpData.module_type = VALUE_TEN;
                tmpData.module_id = textileId;
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
            url: 'textile/get_textile_data_by_textile_id',
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
                var textileData = parseData.textile_data;
                showPopup();
                if (textileData.payment_type == VALUE_ONE) {
                    textileData.user_payment_type_text = paymentTypeArray[textileData.payment_type];
                } else {
                    textileData.user_payment_type_text = userPaymentTypeArray[textileData.user_payment_type] ? userPaymentTypeArray[textileData.user_payment_type] : '';
                }
                if (textileData.payment_type == VALUE_ONE) {
                    textileData.utitle = 'Fees Paid Challan Copy';
                } else if (textileData.payment_type == VALUE_TWO && textileData.user_payment_type == VALUE_ONE) {
                    textileData.utitle = 'Demand Draft (DD) Copy';
                }
                $('#popup_container').html(textileViewPaymentTemplate(textileData));
                if (textileData.payment_type == VALUE_ONE || (textileData.payment_type == VALUE_TWO && textileData.user_payment_type == VALUE_ONE)) {
                    if (textileData.fees_paid_challan != '') {
                        $('#vp_container_for_textile').show();
                        $('#fees_paid_challan_name_href_for_textile').attr('href', TEXTILE_DOC_PATH + textileData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_textile').html(textileData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
