var nocListTemplate = Handlebars.compile($('#noc_list_template').html());
var nocTableTemplate = Handlebars.compile($('#noc_table_template').html());
var nocActionTemplate = Handlebars.compile($('#noc_action_template').html());
var nocFormTemplate = Handlebars.compile($('#noc_form_template').html());
var nocViewTemplate = Handlebars.compile($('#noc_view_template').html());
var nocUploadChallanTemplate = Handlebars.compile($('#noc_upload_challan_template').html());
var nocApproveTemplate = Handlebars.compile($('#noc_approve_template').html());
var nocRejectTemplate = Handlebars.compile($('#noc_reject_template').html());

var tempPersonCnt = 1;

var Noc = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Noc.Router = Backbone.Router.extend({
    routes: {
        'noc': 'renderList',
        'noc_form': 'renderList',
        'edit_noc_form': 'renderList',
        'view_noc_form': 'renderList',
    },
    renderList: function () {
        Noc.listview.listPage();
    },
    renderListForForm: function () {
        Noc.listview.listPageNocForm();
    }
});
Noc.listView = Backbone.View.extend({
    el: 'div#main_container',

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('noc', 'active');
        Noc.router.navigate('noc');
        var templateData = {};
        this.$el.html(nocListTemplate(templateData));
        this.loadNocData();

    },
    listPageNocForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('noc', 'active');
        this.$el.html(nocListTemplate);
        this.newNocForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return nocActionTemplate(rowData);
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
            rowData.NOC_DOC_PATH = NOC_DOC_PATH;
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
        rowData.module_type = VALUE_ELEVEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : 'display: none;';
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        return nocActionTemplate(rowData);
    },
    loadNocData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_ELEVEN, data);
        };
        var that = this;
        showTableContainer('noc');
        Noc.router.navigate('noc');
        $('#noc_datatable_container').html(nocTableTemplate);

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_noc_list', false);
        nocDataTable = $('#noc_datatable').DataTable({
            ajax: {url: 'noc/get_noc_data', dataSrc: "noc_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'noc_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'name_of_applicant', 'class': 'text-center'},
                {data: 'survey_no', 'class': 'text-center'},
                {data: 'govt_industrial_estate_area', 'class': 'text-center'},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'noc_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'noc_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#noc_datatable_filter').remove();
        $('#noc_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = nocDataTable.row(tr);

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
    newNocForm: function (isEdit, parseData) {
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
            var formData = parseData.noc_data;
            Noc.router.navigate('edit_noc_form');
        } else {
            var formData = {};
            Noc.router.navigate('noc_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.noc_data = parseData.noc_data;
         if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.noc_data.application_date);
            templateData.loan_from_date = dateTo_DD_MM_YYYY(templateData.noc_data.loan_from_date);
            templateData.to_date = dateTo_DD_MM_YYYY(templateData.noc_data.to_date);
        }
        else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('noc');
        $('#noc_form_container').html(nocFormTemplate((templateData)));
         renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
      // renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_name', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_noc_data', 'plot_no', 'plot_no', 'Plot No');
        if (isEdit) {
            $('#state').val(formData.state);
            $('#district').val(formData.district);
            $('#taluka').val(formData.taluka);
           // $('#declaration_for_noc').attr('checked', 'checked');
           // $('#villages_for_noc_data').val(formData.village);

             $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_noc_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_noc_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


            if (formData.reason_of_loan_doc != '') {
                $('#reason_of_loan_doc_container_for_noc').hide();
                $('#reason_of_loan_doc_name_image').attr('src', NOC_DOC_PATH + formData.reason_of_loan_doc);
                $('#reason_of_loan_doc_name_container_for_noc').show();
                $('#reason_of_loan_doc_name_download').attr("href", NOC_DOC_PATH + formData.reason_of_loan_doc);
            }
             if (formData.request_letter_doc != '') {
                $('#request_letter_doc_container_for_noc').hide();
                $('#request_letter_doc_name_image').attr('src', NOC_DOC_PATH + formData.request_letter_doc);
                $('#request_letter_doc_name_container_for_noc').show();
                $('#request_letter_doc_name_download').attr("href", NOC_DOC_PATH + formData.request_letter_doc);
            }

           if (formData.behalf_of_lessee_doc != '') {
                $('#behalf_of_lessee_doc_container_for_noc').hide();
                $('#behalf_of_lessee_doc_name_image').attr('src', NOC_DOC_PATH + formData.behalf_of_lessee_doc);
                $('#behalf_of_lessee_doc_name_container_for_noc').show();
                $('#behalf_of_lessee_doc_name_download').attr("href", NOC_DOC_PATH + formData.behalf_of_lessee_doc);
            }
             if (formData.public_undertaking_doc != '') {
                $('#public_undertaking_doc_container_for_noc').hide();
                $('#public_undertaking_doc_name_image').attr('src', NOC_DOC_PATH + formData.public_undertaking_doc);
                $('#public_undertaking_doc_name_container_for_noc').show();
                $('#public_undertaking_doc_name_download').attr("href", NOC_DOC_PATH + formData.public_undertaking_doc);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_noc').hide();
                $('#seal_and_stamp_name_image_for_noc').attr('src', NOC_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_noc').show();
                $('#seal_and_stamp_download').attr("href", NOC_DOC_PATH + formData.signature);
            }
       

         if (formData.reason_of_loan_from_bank == IS_CHECKED_YES) {
            $('#reason_of_loan_from_bank_yes').attr('checked', 'checked');
              $('.reason_of_loan_from_bank_div').show();
           } else if (formData.reason_of_loan_from_bank == IS_CHECKED_NO) {
            $('#reason_of_loan_from_bank_no').attr('checked', 'checked');
           }

            if (formData.request_letter_of_bank == IS_CHECKED_YES) {
            $('#request_letter_of_bank_yes').attr('checked', 'checked');
              $('.request_letter_doc_div').show();
           } else if (formData.request_letter_of_bank == IS_CHECKED_NO) {
            $('#request_letter_of_bank_no').attr('checked', 'checked');
           }

            if (formData.behalf_of_lessee == IS_CHECKED_YES) {
            $('#behalf_of_lessee_yes').attr('checked', 'checked');
              $('.behalf_of_lessee_div').show();
           } else if (formData.behalf_of_lessee == IS_CHECKED_NO) {
            $('#behalf_of_lessee_no').attr('checked', 'checked');
           }

            if (formData.public_undertaking == IS_CHECKED_YES) {
            $('#public_undertaking_yes').attr('checked', 'checked');
            $('.public_undertaking_div').show();
        } else if (formData.public_undertaking == IS_CHECKED_NO) {
            $('#public_undertaking_no').attr('checked', 'checked');
        }
}
        datePicker();
        startDateEndDateFunctionality('loan_from_date','to_date');
        $('#noc_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitNoc($('#submit_btn_for_noc'));
            }
        });
    },
    editOrViewNoc: function (btnObj, nocId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!nocId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'noc/get_noc_data_by_id',
            type: 'post',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                    that.newNocForm(isEdit, parseData);
                } else {
                    that.viewNocForm(parseData);
                }
            }
        });
    },
    viewNocForm: function (parseData) {
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
        var formData = parseData.noc_data;
        Noc.router.navigate('view_noc_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        formData.loan_from_date = dateTo_DD_MM_YYYY(formData.loan_from_date);
        formData.to_date = dateTo_DD_MM_YYYY(formData.to_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
      // formData.loan_to_date = dateTo_DD_MM_YYYY(formData.loan_to_date);
        showFormContainer('noc');
        $('#noc_form_container').html(nocViewTemplate(formData));
        $('#state').val(formData.state);
        $('#district').val(formData.district);
        $('#taluka').val(formData.taluka);
        //$('#declaration_for_noc').attr('checked', 'checked');

         renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'plot_no_for_noc_data', 'plot_no', 'plot_no', 'Plot No');
         
          $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, 'plot_no_for_noc_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_noc_data').val(formData.plot_no == 0 ? '' : formData.plot_no);

           if (formData.reason_of_loan_from_bank == IS_CHECKED_YES) {
            $('#reason_of_loan_from_bank_yes').attr('checked', 'checked');
              $('.reason_of_loan_from_bank_div').show();
           } else if (formData.reason_of_loan_from_bank == IS_CHECKED_NO) {
            $('#reason_of_loan_from_bank_no').attr('checked', 'checked');
           }

            if (formData.request_letter_of_bank == IS_CHECKED_YES) {
            $('#request_letter_of_bank_yes').attr('checked', 'checked');
              $('.request_letter_doc_div').show();
           } else if (formData.request_letter_of_bank == IS_CHECKED_NO) {
            $('#request_letter_of_bank_no').attr('checked', 'checked');
           }

            if (formData.behalf_of_lessee == IS_CHECKED_YES) {
            $('#behalf_of_lessee_yes').attr('checked', 'checked');
              $('.behalf_of_lessee_div').show();
           } else if (formData.behalf_of_lessee == IS_CHECKED_NO) {
            $('#behalf_of_lessee_no').attr('checked', 'checked');
           }

        if (formData.public_undertaking == IS_CHECKED_YES) {
            $('#public_undertaking_yes').attr('checked', 'checked');
            $('.public_undertaking_div').show();
        } else if (formData.public_undertaking == IS_CHECKED_NO) {
            $('#public_undertaking_no').attr('checked', 'checked');
        }

         if (formData.reason_of_loan_doc != '') {
                $('#reason_of_loan_doc_container_for_noc_view').hide();
                $('#reason_of_loan_doc_name_image_view').attr('src',NOC_DOC_PATH + formData.reason_of_loan_doc);
                $('#reason_of_loan_doc_name_container_for_noc_view').show();
                $('#reason_of_loan_doc_name_download').attr("href",NOC_DOC_PATH + formData.reason_of_loan_doc);
            }
         if (formData.request_letter_doc != '') {
                $('#request_letter_doc_container_for_noc_view').hide();
                $('#request_letter_doc_name_image_view').attr('src',NOC_DOC_PATH + formData.request_letter_doc);
                $('#request_letter_doc_name_container_for_noc_view').show();
                $('#request_letter_doc_name_download').attr("href",NOC_DOC_PATH + formData.request_letter_doc);
            }

         if (formData.behalf_of_lessee_doc != '') {
                $('#behalf_of_lessee_doc_container_for_noc_view').hide();
                $('#behalf_of_lessee_doc_name_image_view').attr('src',NOC_DOC_PATH + formData.behalf_of_lessee_doc);
                $('#behalf_of_lessee_doc_name_container_for_noc_view').show();
                $('#behalf_of_lessee_doc_name_download').attr("href",NOC_DOC_PATH + formData.behalf_of_lessee_doc);
            }

        if (formData.public_undertaking_doc != '') {
            $('#public_undertaking_doc_container_for_noc_view').hide();
            $('#public_undertaking_doc_name_image_view').attr('src', NOC_DOC_PATH + formData.public_undertaking_doc);
            $('#public_undertaking_doc_name_container_for_noc_view').show();
            $('#public_undertaking_doc_name_download').attr("href", NOC_DOC_PATH + formData.public_undertaking_doc);
        }

        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_noc_view').hide();
            $('#seal_and_stamp_name_image_for_noc_view').attr('src', NOC_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_noc_view').show();
            $('#seal_and_stamp_download').attr("href", NOC_DOC_PATH + formData.signature);
        }
    },
    checkValidationForNoc: function (nocData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!nocData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!nocData.state) {
            return getBasicMessageAndFieldJSONArray('state', stateValidationMessage);
        }
        if (!nocData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!nocData.taluka) {
            return getBasicMessageAndFieldJSONArray('taluka', talukaValidationMessage);
        }
        if (!nocData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data', villageNameValidationMessage);
        }
        
        if (!nocData.plot_no_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_noc_data', plotnoValidationMessage);
        }
//         if (!nocData.govt_industrial_estate_area) {
//            return getBasicMessageAndFieldJSONArray('govt_industrial_estate_area');
//        }
        if (!nocData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no', surveynoValidationMessage);
        }
        if (!nocData.loan_amount) {
            return getBasicMessageAndFieldJSONArray('loan_amount', loanAmountValidationMessage);
        }
        // if (!nocData.admeasuring_square_metre) {
        //     return getBasicMessageAndFieldJSONArray('admeasuring_square_metre', admeasuringValidationMessage);
        // }
       
        if (!nocData.purpose_of_lease) {
            return getBasicMessageAndFieldJSONArray('purpose_of_lease', purposeleaseValidationMessage);
        }

        if (!nocData.ac_number) {
            return getBasicMessageAndFieldJSONArray('ac_number', acNumberValidationMessage);
        }
        if (!nocData.bank_name) {
            return getBasicMessageAndFieldJSONArray('bank_name', banknameValidationMessage);
        }
        if (!nocData.branch_name) {
            return getBasicMessageAndFieldJSONArray('branch_name', branchNameValidationMessage);
        }
        if (!nocData.ifsc_code) {
            return getBasicMessageAndFieldJSONArray('ifsc_code', ifscCodeValidationMessage);
        }
         if (!nocData.loan_from_date) {
            return getBasicMessageAndFieldJSONArray('loan_from_date', loanFromDateValidationMessage);
        }

         if (!nocData.to_date) {
            return getBasicMessageAndFieldJSONArray('to_date', loanToDateValidationMessage);
        }
       
        return '';
    },
    askForSubmitNoc: function (moduleType) {
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
        var yesEvent = 'Noc.listview.submitNoc(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitNoc: function (moduleType) {
       // alert('hi');
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var nocData = $('#noc_form').serializeFormJSON();
        var validationData = that.checkValidationForNoc(nocData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('noc-' + validationData.field, validationData.message);
            return false;
        }

         if (nocData.reason_of_loan_from_bank == isChecked) {
        if ($('#reason_of_loan_doc_container_for_noc').is(':visible')) {
            var reasonform = $('#reason_of_loan_doc_for_noc').val();
            if (reasonform == '') {
                $('#reason_of_loan_doc_for_noc').focus();
                validationMessageShow('noc-reason_of_loan_doc_for_noc', uploadDocumentValidationMessage);
                return false;
            }
            var reasonformMessage = pdffileUploadValidation('reason_of_loan_doc_for_noc');
            if (reasonformMessage != '') {
                $('#reason_of_loan_doc_for_noc').focus();
                validationMessageShow('noc-reason_of_loan_doc_for_noc', reasonformMessage);
                return false;
            }
        }
       } 

     if (nocData.request_letter_of_bank == isChecked) {
        if ($('#request_letter_doc_container_for_noc').is(':visible')) {
            var reasonform = $('#request_letter_doc_for_noc').val();
            if (reasonform == '') {
                $('#request_letter_doc_for_noc').focus();
                validationMessageShow('noc-request_letter_doc_for_noc', uploadDocumentValidationMessage);
                return false;
            }
            var reasonformMessage = pdffileUploadValidation('request_letter_doc_for_noc');
            if (reasonformMessage != '') {
                $('#request_letter_doc_for_noc').focus();
                validationMessageShow('noc-request_letter_doc_for_noc', reasonformMessage);
                return false;
            }
        }
       } 

       if (nocData.behalf_of_lessee == isChecked) {
        if ($('#behalf_of_lessee_doc_container_for_noc').is(':visible')) {
            var reasonform = $('#behalf_of_lessee_doc_for_noc').val();
            if (reasonform == '') {
                $('#behalf_of_lessee_doc_for_noc').focus();
                validationMessageShow('noc-behalf_of_lessee_doc_for_noc', uploadDocumentValidationMessage);
                return false;
            }
            var reasonformMessage = pdffileUploadValidation('behalf_of_lessee_doc_for_noc');
            if (reasonformMessage != '') {
                $('#behalf_of_lessee_doc_for_noc').focus();
                validationMessageShow('noc-behalf_of_lessee_doc_for_noc', reasonformMessage);
                return false;
            }
        }
       } 

       if (nocData.public_undertaking == isChecked) {
            if ($('#public_undertaking_doc_container_for_noc').is(':visible')) {
                var reasonform = $('#public_undertaking_doc_for_noc').val();
                if (reasonform == '') {
                    $('#public_undertaking_doc_for_noc').focus();
                    validationMessageShow('noc-public_undertaking_doc_for_noc', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('public_undertaking_doc_for_noc');
                if (reasonformMessage != '') {
                    $('#public_undertaking_doc_for_noc').focus();
                    validationMessageShow('noc-public_undertaking_doc_for_noc', reasonformMessage);
                    return false;
                }
            }
        }

        if ($('#seal_and_stamp_container_for_noc').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_noc').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_noc').focus();
                validationMessageShow('noc-seal_and_stamp_for_noc', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_noc');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_noc').focus();
                validationMessageShow('noc-seal_and_stamp_for_noc', sealAndStampMessage);
                return false;
            }
        }

        // if (!$('#declaration_for_noc').is(':checked')) {
        //     $('#declaration_for_noc').focus();
        //     validationMessageShow('noc-declaration_for_noc', declarationOneValidationMessage);
        //     return false;
        // }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_noc') : $('#submit_btn_for_noc');
        //alert('hiiiiii');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var nocData = new FormData($('#noc_form')[0]);
        nocData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //nocData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        nocData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'noc/submit_noc',
            data: nocData,
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
                validationMessageShow('noc', textStatus.statusText);
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
                    validationMessageShow('noc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Noc.router.navigate('noc', {'trigger': true});
            }
        });
    },

    askForRemove: function (nocId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Noc.listview.removeDocument(\'' + nocId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (nocId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'noc/remove_document',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                validationMessageShow('noc', textStatus.statusText);
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
                    validationMessageShow('noc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_noc').hide();
                $('#seal_and_stamp_name_image_for_noc').attr('src', '');
                $('#seal_and_stamp_container_for_noc').show();
                $('#seal_and_stamp_for_noc').val('');
            }
        });
    },
    generateForm1: function (nocId) {
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#noc_id_for_noc_form1').val(nocId);
        $('#noc_form1_pdf_form').submit();
        $('#noc_id_for_noc_form1').val('');
    },

    openUploadChallan: function (nocId) {
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + nocId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'noc/get_noc_data_by_noc_id',
            type: 'post',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                var nocData = parseData.noc_data;
                showPopup();
                if (nocData.status != VALUE_FOUR && nocData.status != VALUE_FIVE && nocData.status != VALUE_SIX) {
                    nocData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(nocUploadChallanTemplate(nocData));
                if (nocData.challan != '') {
                    $('#challan_container_for_noc_upload_challan').hide();
                    $('#challan_name_container_for_noc_upload_challan').show();
                    $('#challan_name_href_for_noc_upload_challan').attr('href', 'documents/noc/' + nocData.challan);
                    $('#challan_name_for_noc_upload_challan').html(nocData.challan);
                    $('#challan_remove_btn_for_noc_upload_challan').attr('onclick', 'Noc.listview.removeChallan("' + nocData.noc_id + '")');
                }
            }
        });
    },
    removeChallan: function (nocId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'noc/remove_challan',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                validationMessageShow('noc-uc', textStatus.statusText);
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
                    validationMessageShow('noc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-noc-uc').html(parseData.message);
                removeDocument('challan', 'noc_upload_challan');
                $('#status_' + nocId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-noc-uc').html('');
        validationMessageHide();
        var nocId = $('#noc_id_for_noc_upload_challan').val();
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#challan_container_for_noc_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_noc_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_noc_upload_challan').focus();
                validationMessageShow('noc-uc-challan_for_noc_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_noc_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_noc_upload_challan').focus();
                validationMessageShow('noc-uc-challan_for_noc_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_noc_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#noc_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'noc/upload_challan',
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
                validationMessageShow('noc-uc', textStatus.statusText);
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
                    validationMessageShow('noc-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + nocId).html(appStatusArray[VALUE_THREE]);
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (nocId) {
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_noc_' + nocId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'noc/get_noc_data_by_noc_id',
            type: 'post',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                var nocData = parseData.noc_data;
                showPopup();
                $('#popup_container').html(nocApproveTemplate(nocData));
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
        var formData = $('#approve_noc_form').serializeFormJSON();
        if (!formData.noc_id_for_noc_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_noc_approve) {
            $('#registration_number_for_noc_approve').focus();
            validationMessageShow('noc-approve-registration_number_for_noc_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_noc_approve) {
            $('#valid_upto_for_noc_approve').focus();
            validationMessageShow('noc-approve-valid_upto_for_noc_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_noc_approve) {
            $('#remarks_for_noc_approve').focus();
            validationMessageShow('noc-approve-remarks_for_noc_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'noc/approve_application',
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
                validationMessageShow('noc-approve', textStatus.statusText);
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
                    validationMessageShow('noc-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.noc_id_for_noc_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.noc_id_for_noc_approve).remove();
                $('#approve_btn_for_app_' + formData.noc_id_for_noc_approve).remove();
            }
        });
    },
    askForRejectApplication: function (nocId) {
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_noc_' + nocId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'noc/get_noc_data_by_noc_id',
            type: 'post',
            data: $.extend({}, {'noc_id': nocId}, getTokenData()),
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
                var nocData = parseData.noc_data;
                showPopup();
                $('#popup_container').html(nocRejectTemplate(nocData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_noc_form').serializeFormJSON();
        if (!formData.noc_id_for_noc_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_noc_reject) {
            $('#remarks_for_noc_reject').focus();
            validationMessageShow('noc-reject-remarks_for_noc_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'noc/reject_application',
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
                validationMessageShow('noc-reject', textStatus.statusText);
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
                    validationMessageShow('noc-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.noc_id_for_noc_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.noc_id_for_noc_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.noc_id_for_noc_reject).remove();
                $('#reject_btn_for_app_' + formData.noc_id_for_noc_reject).remove();
                $('#approve_btn_for_app_' + formData.noc_id_for_noc_reject).remove();
            }
        });
    },
    generateCertificate: function (nocId) {
        if (!nocId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#noc_id_for_certificate').val(nocId);
        $('#noc_certificate_pdf_form').submit();
        $('#noc_id_for_certificate').val('');
    },
    getQueryData: function (nocId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!nocId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_ELEVEN;
        templateData.module_id = nocId;
        var btnObj = $('#query_btn_for_noc_' + nocId);
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
                tmpData.application_number = regNoRenderer(VALUE_ELEVEN, moduleData.noc_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_ELEVEN;
                tmpData.module_id = nocId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    }
});
