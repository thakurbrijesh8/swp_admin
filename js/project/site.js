var siteListTemplate = Handlebars.compile($('#site_list_template').html());
var siteTableTemplate = Handlebars.compile($('#site_table_template').html());
var siteActionTemplate = Handlebars.compile($('#site_action_template').html());
var siteFormTemplate = Handlebars.compile($('#site_form_template').html());
var siteViewTemplate = Handlebars.compile($('#site_view_template').html());
var siteUploadChallanTemplate = Handlebars.compile($('#site_upload_challan_template').html());
var siteApproveTemplate = Handlebars.compile($('#site_approve_template').html());
var siteRejectTemplate = Handlebars.compile($('#site_reject_template').html());
var siteViewPaymentTemplate = Handlebars.compile($('#site_view_payment_template').html());

var tempPersonCnt = 1;

var Site = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Site.Router = Backbone.Router.extend({
    routes: {
        'site': 'renderList',
        'site_form': 'renderList',
        'edit_site_form': 'renderList',
        'view_site_form': 'renderList',
    },
    renderList: function () {
        Site.listview.listPage();
    },
    renderListForForm: function () {
        Site.listview.listPageSiteForm();
    }
});
Site.listView = Backbone.View.extend({
    el: 'div#main_container',

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('site', 'active');
        Site.router.navigate('site');
        var templateData = {};
        this.$el.html(siteListTemplate(templateData));
        this.loadSiteData();

    },
    listPageSiteForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_pda');
        addClass('site', 'active');
        this.$el.html(siteListTemplate);
        this.newSiteForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return siteActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYNINE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return siteActionTemplate(rowData);
    },
    loadSiteData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_TWENTYNINE, data);
        };
        var that = this;
        showTableContainer('site');
        Site.router.navigate('site');
        $('#site_datatable_container').html(siteTableTemplate);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_site_list', false);
        allowOnlyIntegerValue('mobile_number_for_site_list');
        if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_site_list', false);
            siteDataTable = $('#site_datatable').DataTable({
                ajax: {url: 'site/get_site_data', dataSrc: "site_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'site_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'district', 'class': 'text-center', 'render': districtRenderer},
                    {data: 'applicant_name', 'class': 'v-a-m'},
                    {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                    {data: 'name_of_applicant'},
                    {data: 'mobile_no'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'site_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                    {data: 'site_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        } else {
            siteDataTable = $('#site_datatable').DataTable({
                ajax: {url: 'site/get_site_data', dataSrc: "site_data", type: "post"},
                bAutoWidth: false,
                ordering: false,
                processing: true,
                language: dataTableProcessingAndNoDataMsg,
                serverSide: true,
                columns: [
                    {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                    {data: 'site_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                    {data: 'applicant_name', 'class': 'v-a-m'},
                    {data: 'applicant_mobile', 'class': 'text-center v-a-m'},
                    {data: 'name_of_applicant'},
                    {data: 'mobile_no'},
                    {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                    {data: 'site_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                    {data: 'site_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                    {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
                ],
                "initComplete": searchableDatatable
            });
        }
        $('#site_datatable_filter').remove();
        $('#site_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = siteDataTable.row(tr);

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
    newSiteForm: function (isEdit, parseData) {
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
            var formData = parseData.site_data;
            Site.router.navigate('edit_site_form');
        } else {
            var formData = {};
            Site.router.navigate('site_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.site_data = parseData.site_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.site_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }

        showFormContainer('site');

        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.site_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        $('#site_form_container').html(siteFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        if (isEdit) {

            $('#district').val(formData.district);
            $('#plot_area').val(formData.plot_area);

            that.getFees(plot_area);

            if (formData.site_plan != '') {
                $('#site_plan_container_for_site').hide();
                $('#site_plan_name_image_for_site').attr('src', SITE_DOC_PATH + formData.site_plan);
                $('#site_plan_name_container_for_site').show();
                $('#site_plan_name_download').attr("href", SITE_DOC_PATH + formData.site_plan);
            }
            if (formData.I_XIV_nakal != '') {
                $('#I_XIV_nakal_container_for_site').hide();
                $('#I_XIV_nakal_name_image_for_site').attr('src', SITE_DOC_PATH + formData.I_XIV_nakal);
                $('#I_XIV_nakal_name_container_for_site').show();
                $('#I_XIV_nakal_name_download').attr("href", SITE_DOC_PATH + formData.I_XIV_nakal);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_site').hide();
                $('#seal_and_stamp_name_image_for_site').attr('src', SITE_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_site').show();
                $('#seal_and_stamp_download').attr("href", SITE_DOC_PATH + formData.signature);

            }


        }
        generateSelect2();
        datePicker();
        $('#site_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSite($('#submit_btn_for_site'));
            }
        });
    },
    editOrViewSite: function (btnObj, siteId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!siteId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'site/get_site_data_by_id',
            type: 'post',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                    that.newSiteForm(isEdit, parseData);
                } else {
                    that.viewSiteForm(parseData);
                }
            }
        });
    },
    viewSiteForm: function (parseData) {
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
        var formData = parseData.site_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        Site.router.navigate('view_site_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        showFormContainer('site');
        $('#site_form_container').html(siteViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');

        $('#district').val(formData.district);
        $('#plot_area').val(formData.plot_area);

        that.getFees(plot_area);

        if (formData.site_plan != '') {
            $('#site_plan_container_for_site').hide();
            $('#site_plan_name_image_for_site').attr('src', SITE_DOC_PATH + formData.site_plan);
            $('#site_plan_name_container_for_site').show();
            $('#site_plan_name_download').attr("href", SITE_DOC_PATH + formData.site_plan);
        }
        if (formData.I_XIV_nakal != '') {
            $('#I_XIV_nakal_container_for_site').hide();
            $('#I_XIV_nakal_name_image_for_site').attr('src', SITE_DOC_PATH + formData.I_XIV_nakal);
            $('#I_XIV_nakal_name_container_for_site').show();
            $('#I_XIV_nakal_name_download').attr("href", SITE_DOC_PATH + formData.I_XIV_nakal);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_site_view').hide();
            $('#seal_and_stamp_name_image_for_site_view').attr('src', SITE_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_site_view').show();
            $('#seal_and_stamp_download').attr("href", SITE_DOC_PATH + formData.signature);
        }
    },
    checkValidationForSite: function (siteData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!siteData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!siteData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!siteData.address) {
            return getBasicMessageAndFieldJSONArray('address', owneraddressMessage);
        }
        if (!siteData.mobile_no) {
            return getBasicMessageAndFieldJSONArray('mobile_no', mobileValidationMessage);
        }
        if (!siteData.village) {
            return getBasicMessageAndFieldJSONArray('village', villageValidationMessage);
        }
        if (!siteData.plot_area) {
            return getBasicMessageAndFieldJSONArray('plot_area', plotAreaValidationMessage);
        }
        return '';
    },
    askForSubmitSite: function (moduleType) {
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
        var yesEvent = 'Site.listview.submitSite(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitSite: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var siteData = $('#site_form').serializeFormJSON();
        var validationData = that.checkValidationForSite(siteData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('site-' + validationData.field, validationData.message);
            return false;
        }


        if ($('#site_plan_container_for_site').is(':visible')) {
            var siteplan = $('#site_plan_for_site').val();
            if (siteplan == '') {
                $('#site_plan_for_site').focus();
                validationMessageShow('site-site_plan_for_site', uploadDocumentValidationMessage);
                return false;
            }
            var siteplanMessage = pdffileUploadValidation('site_plan_for_site', 10240);
            if (siteplanMessage != '') {
                $('#site_plan_for_site').focus();
                validationMessageShow('site-site_plan_for_site', deedMessage);
                return false;
            }
        }

        if ($('#I_XIV_nakal_container_for_site').is(':visible')) {
            var IXIVnakal = $('#I_XIV_nakal_for_site').val();
            if (IXIVnakal == '') {
                $('#I_XIV_nakal_for_site').focus();
                validationMessageShow('site-I_XIV_nakal_for_site', uploadDocumentValidationMessage);
                return false;
            }
            var IXIVnakalMessage = pdffileUploadValidation('I_XIV_nakal_for_site', 10240);
            if (IXIVnakalMessage != '') {
                $('#I_XIV_nakal_for_site').focus();
                validationMessageShow('site-I_XIV_nakal_for_site', IXIVnakalMessage);
                return false;
            }
        }


        if ($('#seal_and_stamp_container_for_site').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_site').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_site').focus();
                validationMessageShow('site-seal_and_stamp_for_site', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_site');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_site').focus();
                validationMessageShow('site-seal_and_stamp_for_site', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_site') : $('#submit_btn_for_site');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var siteData = new FormData($('#site_form')[0]);
        siteData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //siteData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        siteData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'site/submit_site',
            data: siteData,
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
                validationMessageShow('site', textStatus.statusText);
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
                    validationMessageShow('site', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Site.router.navigate('site', {'trigger': true});
            }
        });
    },

    askForRemove: function (siteId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Site.listview.removeDocument(\'' + siteId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (siteId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_PDA) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'site/remove_document',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                validationMessageShow('site', textStatus.statusText);
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
                    validationMessageShow('site', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_site').hide();
                $('#seal_and_stamp_name_image_for_site').attr('src', '');
                $('#seal_and_stamp_container_for_site').show();
                $('#seal_and_stamp_for_site').val('');
            }
        });
    },
    generateForm1: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#site_id_for_site_form1').val(siteId);
        $('#site_form1_pdf_form').submit();
        $('#site_id_for_site_form1').val('');
    },

    openUploadChallan: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + siteId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'site/get_site_data_by_site_id',
            type: 'post',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                var siteData = parseData.site_data;
                showPopup();
                if (siteData.status != VALUE_FOUR && siteData.status != VALUE_FIVE && siteData.status != VALUE_SIX && siteData.status != VALUE_SEVEN && siteData.status != VALUE_EIGHT) {
                    siteData.show_remove_upload_btn = true;
                }
                if (siteData.payment_type == VALUE_ONE) {
                    siteData.utitle = 'Challan Copy';
                } else {
                    siteData.utitle = 'Payment Details';
                }
                $('#popup_container').html(siteUploadChallanTemplate(siteData));
                generateBoxes('radio', paymentTypeArray, 'payment_type', 'site_upload_challan', siteData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'site_upload_challan', 'uc', 'radio');
                if (siteData.challan != '') {
                    $('#challan_container_for_site_upload_challan').hide();
                    $('#challan_name_container_for_site_upload_challan').show();
                    $('#challan_name_href_for_site_upload_challan').attr('href', 'documents/site/' + siteData.challan);
                    $('#challan_name_for_site_upload_challan').html(siteData.challan);
                    $('#challan_remove_btn_for_site_upload_challan').attr('onclick', 'Site.listview.removeChallan("' + siteData.site_id + '")');
                }
            }
        });
    },
    removeChallan: function (siteId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'site/remove_challan',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                validationMessageShow('site-uc', textStatus.statusText);
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
                    validationMessageShow('site-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-site-uc').html(parseData.message);
                removeDocument('challan', 'site_upload_challan');
                $('#status_' + siteId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-site-uc').html('');
        validationMessageHide();
        var siteId = $('#site_id_for_site_upload_challan').val();
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_site_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_site_upload_challan_1').focus();
            validationMessageShow('site-uc-payment_type_for_site_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_site_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_site_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_site_upload_challan').focus();
                validationMessageShow('site-uc-challan_for_site_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_site_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_site_upload_challan').focus();
                validationMessageShow('site-uc-challan_for_site_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_site_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#site_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'site/upload_challan',
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
                validationMessageShow('site-uc', textStatus.statusText);
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
                    validationMessageShow('site-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + siteId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + siteId).show();
                }
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_site_' + siteId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'site/get_site_data_by_site_id',
            type: 'post',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                var siteData = parseData.site_data;
                showPopup();
                $('#popup_container').html(siteApproveTemplate(siteData));
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
        var formData = $('#approve_site_form').serializeFormJSON();
        if (!formData.site_id_for_site_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_site_approve) {
            $('#registration_number_for_site_approve').focus();
            validationMessageShow('site-approve-registration_number_for_site_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_site_approve) {
            $('#valid_upto_for_site_approve').focus();
            validationMessageShow('site-approve-valid_upto_for_site_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_site_approve) {
            $('#remarks_for_site_approve').focus();
            validationMessageShow('site-approve-remarks_for_site_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'site/approve_application',
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
                validationMessageShow('site-approve', textStatus.statusText);
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
                    validationMessageShow('site-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.site_id_for_site_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.site_id_for_site_approve).remove();
                $('#approve_btn_for_app_' + formData.site_id_for_site_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.site_id_for_site_approve).show();
            }
        });
    },
    askForRejectApplication: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_site_' + siteId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'site/get_site_data_by_site_id',
            type: 'post',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                var siteData = parseData.site_data;
                showPopup();
                $('#popup_container').html(siteRejectTemplate(siteData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_site_form').serializeFormJSON();
        if (!formData.site_id_for_site_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_site_reject) {
            $('#remarks_for_site_reject').focus();
            validationMessageShow('site-reject-remarks_for_site_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'site/reject_application',
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
                validationMessageShow('site-reject', textStatus.statusText);
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
                    validationMessageShow('site-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.site_id_for_site_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.site_id_for_site_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.site_id_for_site_reject).remove();
                $('#reject_btn_for_app_' + formData.site_id_for_site_reject).remove();
                $('#approve_btn_for_app_' + formData.site_id_for_site_reject).remove();
            }
        });
    },
    generateCertificate: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#site_id_for_certificate').val(siteId);
        $('#site_certificate_pdf_form').submit();
        $('#site_id_for_certificate').val('');
    },
    getQueryData: function (siteId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!siteId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYNINE;
        templateData.module_id = siteId;
        var btnObj = $('#query_btn_for_site_' + siteId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYNINE, moduleData.site_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_TWENTYNINE;
                tmpData.module_id = siteId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getFees: function (category) {
        $("#fees").prop("readonly", true);
        var ploatareaFees = category.value;
        if (ploatareaFees == '') {
            return false;
        }
        if (ploatareaFees == '500sqm') {
            $('#fees').val('Rs. 500');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (ploatareaFees == '501to1000sqm') {
            $('#fees').val('Rs. 1000');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (ploatareaFees == 'above1000') {
            $('#fees').val('Rs. 2000');
            $('.hotel').show();
            $('.homestay').hide();
        }
    },
    viewPayment: function (siteId) {
        if (!siteId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + siteId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'site/get_site_data_by_site_id',
            type: 'post',
            data: $.extend({}, {'site_id': siteId}, getTokenData()),
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
                var siteData = parseData.site_data;
                showPopup();
                if (siteData.payment_type == VALUE_ONE || siteData.payment_type == VALUE_THREE) {
                    siteData.user_payment_type_text = paymentTypeArray[siteData.payment_type];
                } else {
                    siteData.user_payment_type_text = userPaymentTypeArray[siteData.user_payment_type] ? userPaymentTypeArray[siteData.user_payment_type] : '';
                }
                if (siteData.payment_type == VALUE_ONE) {
                    siteData.utitle = 'Fees Paid Challan Copy';
                } else if (siteData.payment_type == VALUE_TWO && siteData.user_payment_type == VALUE_ONE) {
                    siteData.utitle = 'Demand Draft (DD) Copy';
                }
                $('#popup_container').html(siteViewPaymentTemplate(siteData));
                if (siteData.payment_type == VALUE_ONE || (siteData.payment_type == VALUE_TWO && siteData.user_payment_type == VALUE_ONE)) {
                    if (siteData.fees_paid_challan != '') {
                        $('#vp_container_for_site').show();
                        $('#fees_paid_challan_name_href_for_site').attr('href', SITE_DOC_PATH + siteData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_site').html(siteData.fees_paid_challan);
                    }
                }
            }
        });
    },
});

