var transferListTemplate = Handlebars.compile($('#transfer_list_template').html());
var transferTableTemplate = Handlebars.compile($('#transfer_table_template').html());
var transferActionTemplate = Handlebars.compile($('#transfer_action_template').html());
var transferFormTemplate = Handlebars.compile($('#transfer_form_template').html());
var transferViewTemplate = Handlebars.compile($('#transfer_view_template').html());
var transferUploadChallanTemplate = Handlebars.compile($('#transfer_upload_challan_template').html());
var transferApproveTemplate = Handlebars.compile($('#transfer_approve_template').html());
var transferRejectTemplate = Handlebars.compile($('#transfer_reject_template').html());

var tempPersonCnt = 1;

var Transfer = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Transfer.Router = Backbone.Router.extend({
    routes: {
        'transfer': 'renderList',
        'transfer_form': 'renderList',
        'edit_transfer_form': 'renderList',
        'view_transfer_form': 'renderList',
    },
    renderList: function () {
        Transfer.listview.listPage();
    },
    renderListForForm: function () {
        Transfer.listview.listPageTransferForm();
    }
});
Transfer.listView = Backbone.View.extend({
    el: 'div#main_container',
    // events: {
    //     'click input[name="request_letter"]': 'hasRequestLetterEvent',
    //     'click input[name="project_report"]':'hasProjectReportEvent',
    //     'click input[name="constitution_project"]':'hasConstitutionProjectEvent',
    //     'click input[name="valid_authorization"]':'hasValid_AuthorizationEvent',        
    // },
    // hasRequestLetterEvent: function (event) {
    //     var val = $('input[name=request_letter]:checked').val();
    //     if (val === '1') {
    //         this.$('.request_letter_upload_div').show();
    //     } else {
    //         this.$('.request_letter_upload_div').hide();

    //     }
    // },
    // hasProjectReportEvent: function (event) {
    //     var val = $('input[name=project_report]:checked').val();
    //     if (val === '1') {
    //         this.$('.project_report_upload_div').show();
    //     } else {
    //         this.$('.project_report_upload_div').hide();

    //     }
    // },
    // hasConstitutionProjectEvent: function (event) {
    //     var val = $('input[name=constitution_project]:checked').val();
    //     if (val === '1') {
    //         this.$('.constitution_project_upload_div').show();
    //     } else {
    //         this.$('.constitution_project_upload_div').hide();

    //     }
    // },
    // hasValid_AuthorizationEvent: function (event) {
    //     var val = $('input[name=valid_authorization]:checked').val();
    //     if (val === '1') {
    //         this.$('.valid_authorization_upload_div').show();
    //     } else {
    //         this.$('.valid_authorization_upload_div').hide();

    //     }
    // },
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
        addClass('transfer', 'active');
        Transfer.router.navigate('transfer');
        var templateData = {};
        this.$el.html(transferListTemplate(templateData));
        this.loadTransferData();

    },
    listPageTransferForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('transfer', 'active');
        this.$el.html(transferListTemplate);
        this.newTransferForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return transferActionTemplate(rowData);
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
            rowData.TRANSFER_DOC_PATH = TRANSFER_DOC_PATH;
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
        rowData.module_type = VALUE_TWELVE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : 'display: none;';
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        return transferActionTemplate(rowData);
    },
    loadTransferData: function () {
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
            return regNoRenderer(VALUE_TWELVE, data);
        };
        var that = this;
        showTableContainer('transfer');
        Transfer.router.navigate('transfer');
        $('#transfer_datatable_container').html(transferTableTemplate);

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_transfer_list', false);
        transferDataTable = $('#transfer_datatable').DataTable({
            ajax: {url: 'transfer/get_transfer_data', dataSrc: "transfer_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'transfer_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'name_of_applicant', 'class': 'text-center'},
                {data: 'survey_no', 'class': 'text-center'},
                {data: 'transferer_name', 'class': 'text-center'},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'transfer_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'transfer_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#transfer_datatable_filter').remove();
        $('#transfer_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = transferDataTable.row(tr);

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
    newTransferForm: function (isEdit, parseData) {
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
            var formData = parseData.transfer_data;
            Transfer.router.navigate('edit_transfer_form');
        } else {
            var formData = {};
            Transfer.router.navigate('transfer_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.transfer_data = parseData.transfer_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

         if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.transfer_data.application_date);
        }else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }

        showFormContainer('transfer');
        $('#transfer_form_container').html(transferFormTemplate((templateData)));
         renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');


        
         renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_transfer_data', 'plot_no', 'plot_no', 'Plot No');

        $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];

            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_transfer_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_transfer_data').val(formData.plot_no == 0 ? '' : formData.plot_no);       
        
        if (isEdit) {
            $('#state').val(formData.state);
            $('#district').val(formData.district);
            $('#taluka').val(formData.taluka);
            $('#villages_for_transfer_data').val(formData.village);
            $('#declarationone').attr('checked', 'checked');

          //  $('#application_category').val(formData.application_category);
           if (formData.request_letter_upload != '') {
                $('#request_letter_upload_container_for_transfer').hide();
                $('#request_letter_upload_name_image_for_transfer').attr('src',TRANSFER_DOC_PATH + formData.request_letter_upload);
                $('#request_letter_upload_name_container_for_transfer').show();
                $('#request_letter_upload_name_image_for_transfer_download').attr("href", TRANSFER_DOC_PATH+ formData.request_letter_upload);
            }
            if (formData.project_report_upload != '') {
                $('#project_report_upload_container_for_transfer').hide();
                $('#project_report_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.project_report_upload);
                $('#project_report_upload_name_container_for_transfer').show();
                $('#project_report_upload_name_image_for_transfer_download').attr("href", TRANSFER_DOC_PATH + formData.project_report_upload);
            }
                if (formData.constitution_project_upload != '') {
                $('#constitution_project_upload_container_for_transfer').hide();
                $('#constitution_project_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.constitution_project_upload);
                $('#constitution_project_upload_name_container_for_transfer').show();
                $('#constitution_project_upload_name_image_for_transfer_download').attr("href",TRANSFER_DOC_PATH + formData.constitution_project_upload);
            }
             if (formData.valid_authorization_upload != '') {
                $('#valid_authorization_upload_container_for_transfer').hide();
                $('#valid_authorization_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.valid_authorization_upload);
                $('#valid_authorization_upload_name_container_for_transfer').show();
                $('#valid_authorization_upload_name_image_for_transfer_download').attr("href",TRANSFER_DOC_PATH + formData.valid_authorization_upload);
            }

            if (formData.sign_seal != '') {
                $('#sign_seal_container_for_transfer').hide();
                $('#sign_seal_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.sign_seal);
                $('#sign_seal_name_container_for_transfer').show();
                $('#seal_and_stamp_download').attr("href", TRANSFER_DOC_PATH + formData.sign_seal);
            }
       
        }

        if (formData.request_letter == isChecked) {
            $('#request_letter_yes').attr('checked', 'checked');
        }else{
            $('#request_letter_no').attr('checked', 'checked');
        }
        if (formData.project_report == isChecked) {
            $('#project_report_yes').attr('checked', 'checked');
        }else{
            $('#project_report_no').attr('checked', 'checked');
        }
         if (formData.constitution_project == isChecked) {
            $('#constitution_project_yes').attr('checked', 'checked');
        }else{
            $('#constitution_project_no').attr('checked', 'checked');
        }
        if (formData.valid_authorization == isChecked) {
            $('#valid_authorization_yes').attr('checked', 'checked');
        }else{
            $('#valid_authorization_no').attr('checked', 'checked');
        }
        datePicker();
        $('#transfer_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitTransfer($('#submit_btn_for_transfer'));
            }
        });
    },
    editOrViewTransfer: function (btnObj, transferId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!transferId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'transfer/get_transfer_data_by_id',
            type: 'post',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                    that.newTransferForm(isEdit, parseData);
                } else {
                    that.viewTransferForm(parseData);
                }
            }
        });
    },
    viewTransferForm: function (parseData) {
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
        var formData = parseData.transfer_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
                formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        Transfer.router.navigate('view_transfer_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        showFormContainer('transfer');
        $('#transfer_form_container').html(transferViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
       renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');

       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'plot_no_for_transfer_data', 'plot_id', 'plot_no', 'Plot No');

        $('#state').val(formData.state);
         $('#district').val(formData.district);
           $('#taluka').val(formData.taluka);
            //$('#villages_for_transfer_data').val(formData.village);
            $('#declarationone').attr('checked', 'checked');
            $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];

            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, 'plot_no_for_transfer_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_transfer_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


         if (formData.request_letter_upload != '') {
            $('#request_letter_upload_container_for_transfer').hide();
            $('#request_letter_upload_name_image_for_transfer').attr('src',TRANSFER_DOC_PATH + formData.request_letter_upload);
            $('#request_letter_upload_name_container_for_transfer').show();
            $('#request_letter_upload_name_image_for_transfer_download').attr("href", TRANSFER_DOC_PATH + formData.request_letter_upload);
        }
         if (formData.project_report_upload != '') {
            $('#project_report_upload_container_for_transfer').hide();
            $('#project_report_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.project_report_upload);
            $('#project_report_upload_name_container_for_transfer').show();
            $('#project_report_upload_name_image_for_transfer_download').attr("href",TRANSFER_DOC_PATH + formData.project_report_upload);
        }
         if (formData.constitution_project_upload != '') {
            $('#constitution_project_upload_container_for_transfer').hide();
            $('#constitution_project_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.constitution_project_upload);
            $('#constitution_project_upload_name_container_for_transfer').show();
            $('#constitution_project_upload_name_image_for_transfer_download').attr("href", TRANSFER_DOC_PATH + formData.constitution_project_upload);
        }
        if (formData.valid_authorization_upload != '') {
            $('#valid_authorization_upload_container_for_transfer').hide();
            $('#valid_authorization_upload_name_image_for_transfer').attr('src', TRANSFER_DOC_PATH + formData.valid_authorization_upload);
            $('#valid_authorization_upload_name_container_for_transfer').show();
            $('#valid_authorization_upload_name_image_for_transfer_download').attr("href", TRANSFER_DOC_PATH + formData.valid_authorization_upload);
        }

        if (formData.sign_seal != '') {
            $('#sign_seal_container_for_transfer_view').hide();
            $('#sign_seal_name_image_for_transfer_view').attr('src', TRANSFER_DOC_PATH + formData.sign_seal);
            $('#sign_seal_name_container_for_transfer_view').show();
            $('#seal_and_stamp_download').attr("href", TRANSFER_DOC_PATH + formData.sign_seal);
        }
         if (formData.request_letter == isChecked) {
            $('#request_letter_yes').attr('checked', 'checked');
        }else{
            $('#request_letter_no').attr('checked', 'checked');
        }
         if (formData.project_report == isChecked) {
            $('#project_report_yes').attr('checked', 'checked');
        }else{
            $('#project_report_no').attr('checked', 'checked');
        }
           if (formData.constitution_project == isChecked) {
            $('#constitution_project_yes').attr('checked', 'checked');
        }else{
            $('#constitution_project_no').attr('checked', 'checked');
        }
        if (formData.valid_authorization == isChecked) {
            $('#valid_authorization_yes').attr('checked', 'checked');
        }else{
            $('#valid_authorization_no').attr('checked', 'checked');
        }

        // var proprietorInfo = JSON.parse(formData.proprietor_details);
        // $.each(proprietorInfo, function (key, value) {
        //     that.addMultipleProprietor(value);
        // })
    },
    checkValidationForTransfer: function (transferData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
         if (!transferData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
         if (!transferData.application_date) {
            return getBasicMessageAndFieldJSONArray('application_date',appDateValidationMessage);
        }
         if (!transferData.state) {
            return getBasicMessageAndFieldJSONArray('state',stateValidationMessage);
        }
        if (!transferData.district) {
            return getBasicMessageAndFieldJSONArray('district',districtValidationMessage);
        }
        if (!transferData.taluka) {
            return getBasicMessageAndFieldJSONArray('taluka',talukaValidationMessage);
        }
        if (!transferData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data',villageValidationMessage);
        }
       
        if (!transferData.plot_no_for_transfer_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_transfer_data',plotnoValidationMessage);
        }
        if (!transferData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no',surveynoValidationMessage);
        }
        if (!transferData.admeasuring_square_metre) {
            return getBasicMessageAndFieldJSONArray('admeasuring_square_metre',admeasuringValidationMessage);
        }
        if (!transferData.govt_industrial_estate_area) {
            return getBasicMessageAndFieldJSONArray('govt_industrial_estate_area',govtIndustrialEstateAreaValidationMessage);
        }
         if (!transferData.reason_of_transfer) {
            return getBasicMessageAndFieldJSONArray('reason_of_transfer',purposeleaseValidationMessage);
        }
       
         if (!transferData.transferer_name) {
            return getBasicMessageAndFieldJSONArray('transferer_name',acNumberValidationMessage);
        }
         if (!transferData.name_of_servicing) {
            return getBasicMessageAndFieldJSONArray('name_of_servicing',banknameValidationMessage);
        }
        if (!transferData.other_services) {
            return getBasicMessageAndFieldJSONArray('other_services',branchNameValidationMessage);
        }
        if (!transferData.aadhar_no) {
            return getBasicMessageAndFieldJSONArray('aadhar_no',aadharnoValidationMessage);
        }
        if (!transferData.pan_no) {
            return getBasicMessageAndFieldJSONArray('pan_no',pannoValidationMessage);
        }
        if (!transferData.gst_no) {
            return getBasicMessageAndFieldJSONArray('gst_no',gstnoValidationMessage);
        }
        if (!transferData.account_no) {
            return getBasicMessageAndFieldJSONArray('account_no',acNumberValidationMessage);
        }
        var requestLetter = $('input[name=request_letter]:checked').val();
        if (requestLetter == '' || requestLetter == null) {
            $('#request_letter_yes').focus();
            return getBasicMessageAndFieldJSONArray('request_letter', requestLetterValidationMessage);
        }
         var projectReport = $('input[name=project_report]:checked').val();
        if (projectReport == '' || projectReport == null) {
            $('#project_report_yes').focus();
            return getBasicMessageAndFieldJSONArray('project_report', projectReportValidationMessage);
        }
        var constitutionProject = $('input[name=constitution_project]:checked').val();
        if (constitutionProject == '' || constitutionProject == null) {
            $('#constitution_project_yes').focus();
            return getBasicMessageAndFieldJSONArray('constitution_project', constitutionProjectValidationMessage);
        }
        var validAuthorization = $('input[name=valid_authorization]:checked').val();
        if (validAuthorization == '' || validAuthorization == null) {
            $('#valid_authorization_yes').focus();
            return getBasicMessageAndFieldJSONArray('valid_authorization', validAuthorizationValidationMessage);
        }
        if (!transferData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        return '';
    },
    askForSubmitTransfer: function (moduleType) {
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
        var yesEvent = 'Transfer.listview.submitTransfer(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitTransfer: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var transferData = $('#transfer_form').serializeFormJSON();
        var validationData = that.checkValidationForTransfer(transferData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('transfer-' + validationData.field, validationData.message);
            return false;
        }

    
        if (transferData.request_letter == isChecked) {
            if ($('#request_letter_upload_container_for_transfer').is(':visible')) {
                var supportDocument = $('#request_letter_upload_for_transfer').val();
                if (supportDocument == '') {
                    $('#request_letter_upload_for_transfer').focus();
                    validationMessageShow('transfer-request_letter_upload_for_transfer', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('request_letter_upload_for_transfer');
                if (supportDocumentMessage != '') {
                    $('#request_letter_upload_for_transfer').focus();
                    validationMessageShow('transfer-request_letter_upload_for_transfer', supportDocumentMessage);
                    return false;
                }
            }
        }
         if (transferData.project_report == isChecked) {
            if ($('#project_report_upload_container_for_transfer').is(':visible')) {
                var supportDocument = $('#project_report_upload_for_transfer').val();
                if (supportDocument == '') {
                    $('#project_report_upload_for_transfer').focus();
                    validationMessageShow('transfer-project_report_upload_for_transfer', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('project_report_upload_for_transfer');
                if (supportDocumentMessage != '') {
                    $('#project_report_upload_for_transfer').focus();
                    validationMessageShow('transfer-project_report_upload_for_transfer', supportDocumentMessage);
                    return false;
                }
            }
        }
        if (transferData.constitution_project == isChecked) {
            if ($('#constitution_project_upload_container_for_transfer').is(':visible')) {
                var supportDocument = $('#constitution_project_upload_for_transfer').val();
                if (supportDocument == '') {
                    $('#constitution_project_upload_for_transfer').focus();
                    validationMessageShow('transfer-constitution_project_upload_for_transfer', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('constitution_project_upload_for_transfer');
                if (supportDocumentMessage != '') {
                    $('#constitution_project_upload_for_transfer').focus();
                    validationMessageShow('transfer-constitution_project_upload_for_transfer', supportDocumentMessage);
                    return false;
                }
            }
        }
         if (transferData.valid_authorization == isChecked) {
            if ($('#valid_authorization_upload_container_for_transfer').is(':visible')) {
                var supportDocument = $('#valid_authorization_upload_for_transfer').val();
                if (supportDocument == '') {
                    $('#valid_authorization_upload_for_transfer').focus();
                    validationMessageShow('transfer-valid_authorization_upload_for_transfer', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('valid_authorization_upload_for_transfer');
                if (supportDocumentMessage != '') {
                    $('#valid_authorization_upload_for_transfer').focus();
                    validationMessageShow('transfer-valid_authorization_upload_for_transfer', supportDocumentMessage);
                    return false;
                }
            }
        }
        if ($('#sign_seal_container_for_transfer').is(':visible')) {
            var sealAndStamp = $('#sign_seal_for_transfer').val();
            if (sealAndStamp == '') {
                $('#sign_seal_for_transfer').focus();
                validationMessageShow('transfer-sign_seal_for_transfer', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('sign_seal_for_transfer');
            if (sealAndStampMessage != '') {
                $('#sign_seal_for_transfer').focus();
                validationMessageShow('transfer-sign_seal_for_transfer', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_transfer') : $('#submit_btn_for_transfer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var transferData = new FormData($('#transfer_form')[0]);
        transferData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //transferData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        transferData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'transfer/submit_transfer',
            data: transferData,
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
                validationMessageShow('transfer', textStatus.statusText);
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
                    validationMessageShow('transfer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Transfer.router.navigate('transfer', {'trigger': true});
            }
        });
    },

    askForRemove: function (transferId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Transfer.listview.removeDocument(\'' + transferId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (transferId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'transfer/remove_document',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                validationMessageShow('transfer', textStatus.statusText);
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
                    validationMessageShow('transfer', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_transfer').hide();
                $('#seal_and_stamp_name_image_for_transfer').attr('src', '');
                $('#seal_and_stamp_container_for_transfer').show();
                $('#seal_and_stamp_for_transfer').val('');
            }
        });
    },
    // addMultipleProprietor: function (templateData) {
    //     templateData.per_cnt = tempPersonCnt;
    //     $('#proprietor_info_container').append(proprietorInfoTemplate(templateData));
    //     tempPersonCnt++;
    //     resetCounter('display-cnt');
    // },
    // removeProprietorInfo: function (perCnt) {
    //     $('#proprietor_info_' + perCnt).remove();
    //     resetCounter('display-cnt');
    // },
    generateForm1: function (transferId) {
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#transfer_id_for_transfer_form1').val(transferId);
        $('#transfer_form1_pdf_form').submit();
        $('#transfer_id_for_transfer_form1').val('');
    },

    openUploadChallan: function (transferId) {
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + transferId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'transfer/get_transfer_data_by_transfer_id',
            type: 'post',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                var transferData = parseData.transfer_data;
                showPopup();
                if (transferData.status != VALUE_FOUR && transferData.status != VALUE_FIVE && transferData.status != VALUE_SIX) {
                    transferData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(transferUploadChallanTemplate(transferData));
                if (transferData.challan != '') {
                    $('#challan_container_for_transfer_upload_challan').hide();
                    $('#challan_name_container_for_transfer_upload_challan').show();
                    $('#challan_name_href_for_transfer_upload_challan').attr('href', 'documents/transfer/' + transferData.challan);
                    $('#challan_name_for_transfer_upload_challan').html(transferData.challan);
                    $('#challan_remove_btn_for_transfer_upload_challan').attr('onclick', 'Transfer.listview.removeChallan("' + transferData.transfer_id + '")');
                }
            }
        });
    },
    removeChallan: function (transferId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'transfer/remove_challan',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                validationMessageShow('transfer-uc', textStatus.statusText);
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
                    validationMessageShow('transfer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-transfer-uc').html(parseData.message);
                removeDocument('challan', 'transfer_upload_challan');
                $('#status_' + transferId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-transfer-uc').html('');
        validationMessageHide();
        var transferId = $('#transfer_id_for_transfer_upload_challan').val();
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#challan_container_for_transfer_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_transfer_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_transfer_upload_challan').focus();
                validationMessageShow('transfer-uc-challan_for_transfer_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_transfer_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_transfer_upload_challan').focus();
                validationMessageShow('transfer-uc-challan_for_transfer_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_transfer_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#transfer_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'transfer/upload_challan',
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
                validationMessageShow('transfer-uc', textStatus.statusText);
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
                    validationMessageShow('transfer-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + transferId).html(appStatusArray[VALUE_THREE]);
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (transferId) {
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_transfer_' + transferId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'transfer/get_transfer_data_by_transfer_id',
            type: 'post',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                var transferData = parseData.transfer_data;
                showPopup();
                $('#popup_container').html(transferApproveTemplate(transferData));
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
        var formData = $('#approve_transfer_form').serializeFormJSON();
        if (!formData.transfer_id_for_transfer_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_transfer_approve) {
            $('#registration_number_for_transfer_approve').focus();
            validationMessageShow('transfer-approve-registration_number_for_transfer_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_transfer_approve) {
            $('#valid_upto_for_transfer_approve').focus();
            validationMessageShow('transfer-approve-valid_upto_for_transfer_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_transfer_approve) {
            $('#remarks_for_transfer_approve').focus();
            validationMessageShow('transfer-approve-remarks_for_transfer_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'transfer/approve_application',
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
                validationMessageShow('transfer-approve', textStatus.statusText);
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
                    validationMessageShow('transfer-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.transfer_id_for_transfer_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.transfer_id_for_transfer_approve).remove();
                $('#approve_btn_for_app_' + formData.transfer_id_for_transfer_approve).remove();
            }
        });
    },
    askForRejectApplication: function (transferId) {
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_transfer_' + transferId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'transfer/get_transfer_data_by_transfer_id',
            type: 'post',
            data: $.extend({}, {'transfer_id': transferId}, getTokenData()),
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
                var transferData = parseData.transfer_data;
                showPopup();
                $('#popup_container').html(transferRejectTemplate(transferData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_transfer_form').serializeFormJSON();
        if (!formData.transfer_id_for_transfer_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_transfer_reject) {
            $('#remarks_for_transfer_reject').focus();
            validationMessageShow('transfer-reject-remarks_for_transfer_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'transfer/reject_application',
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
                validationMessageShow('transfer-reject', textStatus.statusText);
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
                    validationMessageShow('transfer-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.transfer_id_for_transfer_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.transfer_id_for_transfer_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.transfer_id_for_transfer_reject).remove();
                $('#reject_btn_for_app_' + formData.transfer_id_for_transfer_reject).remove();
                $('#approve_btn_for_app_' + formData.transfer_id_for_transfer_reject).remove();
            }
        });
    },
    generateCertificate: function (transferId) {
        if (!transferId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#transfer_id_for_certificate').val(transferId);
        $('#transfer_certificate_pdf_form').submit();
        $('#transfer_id_for_certificate').val('');
    },
    getQueryData: function (transferId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!transferId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWELVE;
        templateData.module_id = transferId;
        var btnObj = $('#query_btn_for_transfer_' + transferId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWELVE, moduleData.transfer_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_TWELVE;
                tmpData.module_id = transferId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    }
});
