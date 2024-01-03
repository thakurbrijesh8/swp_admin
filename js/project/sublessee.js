var sublesseeListTemplate = Handlebars.compile($('#sublessee_list_template').html());
var sublesseeTableTemplate = Handlebars.compile($('#sublessee_table_template').html());
var sublesseeActionTemplate = Handlebars.compile($('#sublessee_action_template').html());
var sublesseeFormTemplate = Handlebars.compile($('#sublessee_form_template').html());
var sublesseeViewTemplate = Handlebars.compile($('#sublessee_view_template').html());
var sublesseeUploadChallanTemplate = Handlebars.compile($('#sublessee_upload_challan_template').html());
var sublesseeApproveTemplate = Handlebars.compile($('#sublessee_approve_template').html());
var sublesseeRejectTemplate = Handlebars.compile($('#sublessee_reject_template').html());

var tempPersonCnt = 1;

var Sublessee = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Sublessee.Router = Backbone.Router.extend({
    routes: {
        'sublessee': 'renderList',
        'sublessee_form': 'renderList',
        'edit_sublessee_form': 'renderList',
        'view_sublessee_form': 'renderList',
    },
    renderList: function () {
        Sublessee.listview.listPage();
    },
    renderListForForm: function () {
        Sublessee.listview.listPageSublesseeForm();
    }
});
Sublessee.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="request_letter"]': 'hasCaseOfRequestletter',
        'click input[name="detail_project"]': 'hasCaseOfDetailproject',
        'click input[name="partnership_deed"]': 'hasCaseOfPartnershipdeed',
        'click input[name="sign_sublessee"]': 'hasCaseOfBehalfsign',

    },
    // hasCaseOfLRequestletter: function (event) {
    //     var val = $('input[name=request_letter]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.request_letter_div').show();
    //     } else {
    //         this.$('.request_letter_div').hide();

    //     }
    // },
    //  hasCaseOfDetailproject: function (event) {
    //     var val = $('input[name=detail_project]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.detail_project_div').show();
    //     } else {
    //         this.$('.detail_project_div').hide();

    //     }
    // },
    //  hasCaseOfPartnershipdeed: function (event) {
    //     var val = $('input[name=partnership_deed]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.partnership_deed_div').show();
    //     } else {
    //         this.$('.partnership_deed_div').hide();

    //     }
    // },
    //  hasCaseOfBehalfsign: function (event) {
    //     var val = $('input[name=sign_sublessee]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.sign_sublessee_div').show();
    //     } else {
    //         this.$('.sign_sublessee_div').hide();

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
        addClass('sublessee', 'active');
        Sublessee.router.navigate('sublessee');
        var templateData = {};
        this.$el.html(sublesseeListTemplate(templateData));
        this.loadSublesseeData();

    },
    listPageSublesseeForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('sublessee', 'active');
        this.$el.html(sublesseeListTemplate);
        this.newSublesseeForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return sublesseeActionTemplate(rowData);
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
            rowData.SUBLESSEE_DOC_PATH = SUBLESSEE_DOC_PATH;
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
        rowData.module_type = VALUE_SEVENTEEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : 'display: none;';
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        return sublesseeActionTemplate(rowData);
    },
    loadSublesseeData: function () {
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
            return regNoRenderer(VALUE_SEVENTEEN, data);
        };
        var that = this;
        showTableContainer('sublessee');
        Sublessee.router.navigate('sublessee');
        $('#sublessee_datatable_container').html(sublesseeTableTemplate);

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_sublessee_list', false);
        sublesseeDataTable = $('#sublessee_datatable').DataTable({
            ajax: {url: 'sublessee/get_sublessee_data', dataSrc: "sublessee_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'sublessee_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'name_of_applicant', 'class': 'text-center'},
                {data: 'plot_no', 'class': 'text-center'},
                {data: 'name_of_manufacturing', 'class': 'text-center'},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'sublessee_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'sublessee_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#sublessee_datatable_filter').remove();
        $('#sublessee_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = sublesseeDataTable.row(tr);

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
    newSublesseeForm: function (isEdit, parseData) {
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
            var formData = parseData.sublessee_data;
            Sublessee.router.navigate('edit_sublessee_form');
        } else {
            var formData = {};
           Sublessee.router.navigate('sublessee_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
         templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.sublessee_data = parseData.sublessee_data;
         if (isEdit) {
            templateData.date = dateTo_DD_MM_YYYY(templateData.sublessee_data.date);
        }
         else {
            templateData.date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('sublessee');
        $('#sublessee_form_container').html(sublesseeFormTemplate((templateData)));
     renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_sublessee_data', 'plot_no', 'plot_no', 'Plot No');
        if (isEdit) {
           
         //   $('#village_for_sublessee').val(formData.village);
            $('#state').val(formData.state);
            $('#district').val(formData.district);
            $('#taluka').val(formData.taluka);

            $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_sublessee_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_sublessee_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


             if (formData.request_letter == IS_CHECKED_YES) {
                $('#request_letter_yes').attr('checked', 'checked');
                $('.request_letter_div').show();
            } else if (formData.request_letter == IS_CHECKED_NO) {
                $('#request_letter_no').attr('checked', 'checked');
            }

            if (formData.detail_project == IS_CHECKED_YES) {
                $('#detail_project_yes').attr('checked', 'checked');
                $('.detail_project_div').show();
            } else if (formData.detail_project == IS_CHECKED_NO) {
                $('#detail_project_no').attr('checked', 'checked');
            }

            if (formData.partnership_deed == IS_CHECKED_YES) {
                $('#partnership_deed_yes').attr('checked', 'checked');
                $('.partnership_deed_div').show();
            } else if (formData.partnership_deed == IS_CHECKED_NO) {
                $('#partnership_deed_no').attr('checked', 'checked');
            }

             if (formData.sign_sublessee == IS_CHECKED_YES) {
                $('#sign_sublessee_yes').attr('checked', 'checked');
                $('.sign_sublessee_div').show();
            } else if (formData.sign_sublessee == IS_CHECKED_NO) {
                $('#sign_sublessee_no').attr('checked', 'checked');
            }

             if (formData.request_letter_manufacture != '') {
                $('#request_letter_manufacture_container_for_sublessee').hide();
                $('#request_letter_manufacture_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.request_letter_manufacture);
                $('#request_letter_manufacture_name_container_for_sublessee').show();
                $('#request_letter_manufacture_download').attr("href", SUBLESSEE_DOC_PATH + formData.request_letter_manufacture);
            }
            if (formData.detail_project_report != '') {
                $('#detail_project_report_container_for_sublessee').hide();
                $('#detail_project_report_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.detail_project_report);
                $('#detail_project_report_name_container_for_sublessee').show();
                $('#detail_project_report_download').attr("href", SUBLESSEE_DOC_PATH + formData.detail_project_report);
            }

            if (formData.memorandum_partnership_deed != '') {
                $('#memorandum_partnership_deed_container_for_sublessee').hide();
                $('#memorandum_partnership_deed_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.memorandum_partnership_deed);
                $('#memorandum_partnership_deed_name_container_for_sublessee').show();
                $('#memorandum_partnership_deed_download').attr("href", SUBLESSEE_DOC_PATH + formData.memorandum_partnership_deed);
            }

             if (formData.behalf_sign_sublessee != '') {
                $('#behalf_sign_sublessee_container_for_sublessee').hide();
                $('#behalf_sign_sublessee_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.behalf_sign_sublessee);
                $('#behalf_sign_sublessee_name_container_for_sublessee').show();
                $('#behalf_sign_sublessee_download').attr("href", SUBLESSEE_DOC_PATH + formData.behalf_sign_sublessee);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_sublessee').hide();
                $('#seal_and_stamp_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_sublessee').show();
                $('#seal_and_stamp_download').attr("href", SUBLESSEE_DOC_PATH + formData.signature);
            }
        }

        datePicker();
        $('#sublessee_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSublessee($('#submit_btn_for_sublessee'));
            }
        });
    },
    editOrViewSublessee: function (btnObj, sublesseeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sublesseeId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sublessee/get_sublessee_data_by_id',
            type: 'post',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                    that.newSublesseeForm(isEdit, parseData);
                } else {
                    that.viewSublesseeForm(parseData);
                }
            }
        });
    },

    viewSublesseeForm: function (parseData) {
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
        var formData = parseData.sublessee_data;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        Sublessee.router.navigate('view_sublessee_form');
        showFormContainer('sublessee');
        $('#sublessee_form_container').html(sublesseeViewTemplate(formData));
         formData.date = dateTo_DD_MM_YYYY(formData.date);
        $('#state').val(formData.state);
        $('#district').val(formData.district);
        $('#taluka').val(formData.taluka);
        // $('#villages_for_noc_data').val(formData.village);
        // $('#plot_no_for_sublessee_data').val(formData.plot_no);

        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
       renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'plot_no_for_sublessee_data', 'plot_no', 'plot_no', 'Plot No');


          $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, 'plot_no_for_sublessee_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_sublessee_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


           if (formData.request_letter == IS_CHECKED_YES) {
                $('#request_letter_yes').attr('checked', 'checked');
            } else if (formData.request_letter == IS_CHECKED_NO) {
                $('#request_letter_no').attr('checked', 'checked');
            }

             if (formData.detail_project == IS_CHECKED_YES) {
                $('#detail_project_yes').attr('checked', 'checked');
                $('.detail_project_div').show();
            } else if (formData.detail_project == IS_CHECKED_NO) {
                $('#detail_project_no').attr('checked', 'checked');
            }

            if (formData.partnership_deed == IS_CHECKED_YES) {
                $('#partnership_deed_yes').attr('checked', 'checked');
                $('.partnership_deed_div').show();
            } else if (formData.partnership_deed == IS_CHECKED_NO) {
                $('#partnership_deed_no').attr('checked', 'checked');
            }

             if (formData.sign_sublessee == IS_CHECKED_YES) {
                $('#sign_sublessee_yes').attr('checked', 'checked');
                $('.sign_sublessee_div').show();
            } else if (formData.sign_sublessee == IS_CHECKED_NO) {
                $('#sign_sublessee_no').attr('checked', 'checked');
            }

           if (formData.request_letter_manufacture != '') {
                $('#request_letter_manufacture_container_for_sublessee').hide();
                $('#request_letter_manufacture_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.request_letter_manufacture);
                $('#request_letter_manufacture_name_container_for_sublessee').show();
                $('#request_letter_manufacture_download').attr("href", SUBLESSEE_DOC_PATH + formData.request_letter_manufacture);
            }
            if (formData.detail_project_report != '') {
                $('#detail_project_report_container_for_sublessee').hide();
                $('#detail_project_report_name_image_for_sublessee').attr('src', baseUrl + 'documents/sublessee/' + formData.detail_project_report);
                $('#detail_project_report_name_container_for_sublessee').show();
                $('#detail_project_report_download').attr("href", SUBLESSEE_DOC_PATH + formData.detail_project_report);
            }

            if (formData.memorandum_partnership_deed != '') {
                $('#memorandum_partnership_deed_container_for_sublessee').hide();
                $('#memorandum_partnership_deed_name_image_for_sublessee').attr('src', SUBLESSEE_DOC_PATH + formData.memorandum_partnership_deed);
                $('#memorandum_partnership_deed_name_container_for_sublessee').show();
                $('#memorandum_partnership_deed_download').attr("href", SUBLESSEE_DOC_PATH + formData.memorandum_partnership_deed);
            }

             if (formData.behalf_sign_sublessee != '') {
            $('#behalf_sign_sublessee_container_for_sublessee_view').hide();
            $('#behalf_sign_sublessee_name_image_for_sublessee_view').attr('src', SUBLESSEE_DOC_PATH + formData.behalf_sign_sublessee);
            $('#behalf_sign_sublessee_name_container_for_sublessee_view').show();
            $('#behalf_sign_sublessee_download').attr("href", SUBLESSEE_DOC_PATH + formData.behalf_sign_sublessee);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_sublessee_view').hide();
            $('#seal_and_stamp_name_image_for_sublessee_view').attr('src', SUBLESSEE_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_sublessee_view').show();
            $('#seal_and_stamp_download').attr("href", SUBLESSEE_DOC_PATH + formData.signature);
        }

    },
    checkValidationForSublessee: function (sublesseeData) {
         if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
                if (!sublesseeData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
         if (!sublesseeData.state) {
            return getBasicMessageAndFieldJSONArray('state', stateValidationMessage);
        }
        if (!sublesseeData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!sublesseeData.taluka) {
            return getBasicMessageAndFieldJSONArray('taluka', talukaValidationMessage);
        }
         if (!sublesseeData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data', villageNameValidationMessage);
        }
        // if (!sublesseeData.date) {
        //     return getBasicMessageAndFieldJSONArray('date', dateValidationMessage);
        // }
         if (!sublesseeData.plot_no_for_sublessee_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_sublessee_data', plotnoValidationMessage);
        }
        if (!sublesseeData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no', surveynoValidationMessage);
        }
         if (!sublesseeData.admeasuring) {
            return getBasicMessageAndFieldJSONArray('admeasuring', admeasuringValidationMessage);
        }
        if (!sublesseeData.govt_industrial_estate_area) {
            return getBasicMessageAndFieldJSONArray('govt_industrial_estate_area', govtIndustrialEstateAreaValidationMessage);
        }
         if (!sublesseeData.name_of_manufacturing) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacturing', nameofmanufactringValidationMessage);
        }
         var request_letter = $('input[name=request_letter]:checked').val();
        if (request_letter == '' || request_letter == null) {
            $('#request_letter').focus();
            return getBasicMessageAndFieldJSONArray('request_letter', requestletterValidationMessage);
        }
        var detail_project = $('input[name=detail_project]:checked').val();
        if (detail_project == '' || detail_project == null) {
            $('#detail_project').focus();
            return getBasicMessageAndFieldJSONArray('detail_project', detailprojectValidationMessage);
        }
        var partnership_deed = $('input[name=partnership_deed]:checked').val();
        if (partnership_deed == '' || partnership_deed == null) {
            $('#partnership_deed').focus();
            return getBasicMessageAndFieldJSONArray('partnership_deed', partnershipdeedValidationMessage);
        }
         var sign_sublessee = $('input[name=sign_sublessee]:checked').val();
        if (sign_sublessee == '' || sign_sublessee == null) {
            $('#sign_sublessee').focus();
            return getBasicMessageAndFieldJSONArray('sign_sublessee', sublesseesignValidationMessage);
        }
        return '';
    },
    askForSubmitSublessee: function (moduleType) {
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
        var yesEvent = 'Sublessee.listview.submitSublessee(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitSublessee: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var sublesseeData = $('#sublessee_form').serializeFormJSON();
        var validationData = that.checkValidationForSublessee(sublesseeData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('sublessee-' + validationData.field, validationData.message);
            return false;
        }


    if ($('#request_letter_manufacture_container_for_sublessee').is(':visible')) {
            var requestLetter = $('#request_letter_manufacture_for_sublessee').val();
            if (requestLetter == '') {
                $('#request_letter_manufacture_for_sublessee').focus();
                validationMessageShow('sublessee-request_letter_manufacture_for_sublessee', uploadDocumentValidationMessage);
                return false;
            }
            var requestLetterMessage = pdffileUploadValidation('request_letter_manufacture_for_sublessee');
            if (requestLetterMessage != '') {
                $('#request_letter_manufacture_for_sublessee').focus();
                validationMessageShow('sublessee-request_letter_manufacture_for_sublessee', requestLetterMessage);
                return false;
            }
        }
         if ($('#detail_project_report_container_for_sublessee').is(':visible')) {
            var detailProject = $('#detail_project_report_for_sublessee').val();
            if (detailProject == '') {
                $('#detail_project_report_for_sublessee').focus();
                validationMessageShow('sublessee-detail_project_report_for_sublessee', uploadDocumentValidationMessage);
                return false;
            }
            var detailProjectMessage = pdffileUploadValidation('detail_project_report_for_sublessee');
            if (detailProjectMessage != '') {
                $('#detail_project_report_for_sublessee').focus();
                validationMessageShow('sublessee-detail_project_report_for_sublessee', detailProjectMessage);
                return false;
            }
        }
         if ($('#memorandum_partnership_deed_container_for_sublessee').is(':visible')) {
            var memorandumPartnership = $('#memorandum_partnership_deed_for_sublessee').val();
            if (memorandumPartnership == '') {
                $('#memorandum_partnership_deed_for_sublessee').focus();
                validationMessageShow('sublessee-memorandum_partnership_deed_for_sublessee', uploadDocumentValidationMessage);
                return false;
            }
            var memorandumPartnershipMessage = pdffileUploadValidation('memorandum_partnership_deed_for_sublessee');
            if (memorandumPartnershipMessage != '') {
                $('#memorandum_partnership_deed_for_sublessee').focus();
                validationMessageShow('sublessee-memorandum_partnership_deed_for_sublessee', memorandumPartnershipMessage);
                return false;
            }
        }
         if ($('#behalf_sign_sublessee_container_for_sublessee').is(':visible')) {
            var behalfSign = $('#behalf_sign_sublessee_for_sublessee').val();
            if (behalfSign == '') {
                $('#behalf_sign_sublessee_for_sublessee').focus();
                validationMessageShow('sublessee-behalf_sign_sublessee_for_sublessee', uploadDocumentValidationMessage);
                return false;
            }
            var behalfSignMessage = imagefileUploadValidation('behalf_sign_sublessee_for_sublessee');
            if (behalfSignMessage != '') {
                $('#behalf_sign_sublessee_for_sublessee').focus();
                validationMessageShow('sublessee-behalf_sign_sublessee_for_sublessee', behalfSignMessage);
                return false;
            }
        }
        if ($('#seal_and_stamp_container_for_sublessee').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_sublessee').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_sublessee').focus();
                validationMessageShow('sublessee-seal_and_stamp_for_sublessee', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_sublessee');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_sublessee').focus();
                validationMessageShow('sublessee-seal_and_stamp_for_sublessee', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_sublessee') : $('#submit_btn_for_sublessee');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var sublesseeData = new FormData($('#sublessee_form')[0]);
        sublesseeData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        sublesseeData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'sublessee/submit_sublessee',
            data: sublesseeData,
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
                validationMessageShow('sublessee', textStatus.statusText);
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
                    validationMessageShow('sublessee', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Sublessee.router.navigate('sublessee', {'trigger': true});
            }
        });
    },

    askForRemove: function (sublesseeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Sublessee.listview.removeDocument(\'' + sublesseeId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (sublesseeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sublessee/remove_document',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                validationMessageShow('sublessee', textStatus.statusText);
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
                    validationMessageShow('sublessee', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

               if (docType == VALUE_ONE) {
                    $('#request_letter_manufacture_name_container_for_sublessee').hide();
                    $('#request_letter_manufacture_name_image_for_sublessee').attr('src', '');
                    $('#request_letter_manufacture_container_for_sublessee').show();
                    $('#request_letter_manufacture_for_sublessee').val('');
                }
                  if (docType == VALUE_TWO) {
                    $('#detail_project_report_name_container_for_sublessee').hide();
                    $('#detail_project_report_name_image_for_sublessee').attr('src', '');
                    $('#detail_project_report_container_for_sublessee').show();
                    $('#detail_project_report_for_sublessee').val('');
                }
                  if (docType == VALUE_THREE) {
                    $('#memorandum_partnership_deed_name_container_for_sublessee').hide();
                    $('#memorandum_partnership_deed_name_image_for_sublessee').attr('src', '');
                    $('#memorandum_partnership_deed_container_for_sublessee').show();
                    $('#memorandum_partnership_deed_for_sublessee').val('');
                }
                 if (docType == VALUE_FOUR) {
                    $('#behalf_sign_sublessee_name_container_for_sublessee').hide();
                    $('#behalf_sign_sublessee_name_image_for_sublessee').attr('src', '');
                    $('#behalf_sign_sublessee_container_for_sublessee').show();
                    $('#behalf_sign_sublessee_for_sublessee').val('');
                }
                 if (docType == VALUE_FIVE) {
                    $('#seal_and_stamp_name_container_for_sublessee').hide();
                    $('#seal_and_stamp_name_image_for_sublessee').attr('src', '');
                    $('#seal_and_stamp_container_for_sublessee').show();
                    $('#seal_and_stamp_for_sublessee').val('');
            }
        }
        });
    },
    
    generateForm1: function (sublesseeId) {
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#sublessee_id_for_sublessee_form1').val(sublesseeId);
        $('#sublessee_form1_pdf_form').submit();
        $('#sublessee_id_for_sublessee_form1').val('');
    },

    openUploadChallan: function (sublesseeId) {
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + sublesseeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sublessee/get_sublessee_data_by_sublessee_id',
            type: 'post',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                var sublesseeData = parseData.sublessee_data;
                showPopup();
                if (sublesseeData.status != VALUE_FOUR && sublesseeData.status != VALUE_FIVE && sublesseeData.status != VALUE_SIX) {
                    sublesseeData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(sublesseeUploadChallanTemplate(sublesseeData));
                if (sublesseeData.challan != '') {
                    $('#challan_container_for_sublessee_upload_challan').hide();
                    $('#challan_name_container_for_sublessee_upload_challan').show();
                    $('#challan_name_href_for_sublessee_upload_challan').attr('href', 'documents/sublessee/' + sublesseeData.challan);
                    $('#challan_name_for_sublessee_upload_challan').html(sublesseeData.challan);
                    $('#challan_remove_btn_for_sublessee_upload_challan').attr('onclick', 'Sublessee.listview.removeChallan("' + sublesseeData.sublessee_id + '")');
                }
            }
        });
    },
    removeChallan: function (sublesseeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sublessee/remove_challan',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                validationMessageShow('sublessee-uc', textStatus.statusText);
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
                    validationMessageShow('sublessee-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-sublessee-uc').html(parseData.message);
                removeDocument('challan', 'sublessee_upload_challan');
                $('#status_' + sublesseeId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-sublessee-uc').html('');
        validationMessageHide();
        var sublesseeId = $('#sublessee_id_for_sublessee_upload_challan').val();
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#challan_container_for_sublessee_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_sublessee_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_sublessee_upload_challan').focus();
                validationMessageShow('sublessee-uc-challan_for_sublessee_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_sublessee_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_sublessee_upload_challan').focus();
                validationMessageShow('sublessee-uc-challan_for_sublessee_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_sublessee_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#sublessee_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'sublessee/upload_challan',
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
                validationMessageShow('sublessee-uc', textStatus.statusText);
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
                    validationMessageShow('sublessee-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + sublesseeId).html(appStatusArray[VALUE_THREE]);
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (sublesseeId) {
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_sublessee_' + sublesseeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sublessee/get_sublessee_data_by_sublessee_id',
            type: 'post',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                var sublesseeData = parseData.sublessee_data;
                showPopup();
                $('#popup_container').html(sublesseeApproveTemplate(sublesseeData));
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
        var formData = $('#approve_sublessee_form').serializeFormJSON();
        if (!formData.sublessee_id_for_sublessee_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_sublessee_approve) {
            $('#registration_number_for_sublessee_approve').focus();
            validationMessageShow('sublessee-approve-registration_number_for_sublessee_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_sublessee_approve) {
            $('#valid_upto_for_sublessee_approve').focus();
            validationMessageShow('sublessee-approve-valid_upto_for_sublessee_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_sublessee_approve) {
            $('#remarks_for_sublessee_approve').focus();
            validationMessageShow('sublessee-approve-remarks_for_sublessee_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sublessee/approve_application',
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
                validationMessageShow('sublessee-approve', textStatus.statusText);
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
                    validationMessageShow('sublessee-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.sublessee_id_for_sublessee_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.sublessee_id_for_sublessee_approve).remove();
                $('#approve_btn_for_app_' + formData.sublessee_id_for_sublessee_approve).remove();
            }
        });
    },
    askForRejectApplication: function (sublesseeId) {
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_sublessee_' + sublesseeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'sublessee/get_sublessee_data_by_sublessee_id',
            type: 'post',
            data: $.extend({}, {'sublessee_id': sublesseeId}, getTokenData()),
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
                var sublesseeData = parseData.sublessee_data;
                showPopup();
                $('#popup_container').html(sublesseeRejectTemplate(sublesseeData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_sublessee_form').serializeFormJSON();
        if (!formData.sublessee_id_for_sublessee_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_sublessee_reject) {
            $('#remarks_for_sublessee_reject').focus();
            validationMessageShow('sublessee-reject-remarks_for_sublessee_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'sublessee/reject_application',
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
                validationMessageShow('sublessee-reject', textStatus.statusText);
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
                    validationMessageShow('sublessee-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.sublessee_id_for_sublessee_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.sublessee_id_for_sublessee_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.sublessee_id_for_sublessee_reject).remove();
                $('#reject_btn_for_app_' + formData.sublessee_id_for_sublessee_reject).remove();
                $('#approve_btn_for_app_' + formData.sublessee_id_for_sublessee_reject).remove();
            }
        });
    },
    generateCertificate: function (sublesseeId) {
        if (!sublesseeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#sublessee_id_for_certificate').val(sublesseeId);
        $('#sublessee_certificate_pdf_form').submit();
        $('#sublessee_id_for_certificate').val('');
    },
    getQueryData: function (sublesseeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!sublesseeId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SEVENTEEN;
        templateData.module_id = sublesseeId;
        var btnObj = $('#query_btn_for_sublessee_' + sublesseeId);
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
                tmpData.application_number = regNoRenderer(VALUE_SEVENTEEN, moduleData.sublessee_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_SEVENTEEN;
                tmpData.module_id = sublesseeId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    }
});
