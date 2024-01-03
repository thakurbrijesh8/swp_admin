var textileListTemplate = Handlebars.compile($('#textile_list_template').html());
var textileTableTemplate = Handlebars.compile($('#textile_table_template').html());
var textileActionTemplate = Handlebars.compile($('#textile_action_template').html());
var textileFormTemplate = Handlebars.compile($('#textile_form_template').html());
var textileViewTemplate = Handlebars.compile($('#textile_view_template').html());
var textileUploadChallanTemplate = Handlebars.compile($('#textile_upload_challan_template').html());
var textileApproveTemplate = Handlebars.compile($('#textile_approve_template').html());
var textileRejectTemplate = Handlebars.compile($('#textile_reject_template').html());
var textileViewPaymentTemplate = Handlebars.compile($('#textile_view_payment_template').html());
var textileViewDocumentTemplate = Handlebars.compile($('#textile_view_document_template').html());

var Textile = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Textile.Router = Backbone.Router.extend({
    routes: {
        'textile': 'renderList',
        'textile_form': 'renderList',
        'edit_textile_form': 'renderList',
        'view_textile_form': 'renderList',
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
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('textile', 'active');
        Textile.router.navigate('textile');
        var templateData = {};
        this.$el.html(textileListTemplate(templateData));
        this.loadTextileData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageTextileForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('textile', 'active');
        this.$el.html(textileListTemplate);
        this.newTextileForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return textileActionTemplate(rowData);
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
        rowData.module_type = VALUE_TEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return textileActionTemplate(rowData);
    },
    loadTextileData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.enterprise_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.office_address;
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
                return regNoRenderer(VALUE_TEN, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_TEN, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['textile_data'], function (index, objData) {
                json['textile_data'][index]['query_movement_string'] = qmData[objData.textile_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.textile_id] + '</table>') : '-';
            });
            return json['textile_data'];
        };
        var that = this;
        showTableContainer('incentive_generalform_textile');
        Textile.router.navigate('textile');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Textile.listview.loadTextileData();');
        $('#textile_form_and_datatable_container').html(textileTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_textile_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_textile_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_textile_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_textile_list', false);
        allowOnlyIntegerValue('mobile_number_for_textile_list')
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_textile_list', false);
        $('#district_for_textile_list').val(searchData.search_district);
        $('#status_for_textile_list').val(searchData.search_status);
        $('#app_timing_for_textile_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_textile_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_textile_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_textile_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_textile_list').attr('disabled', 'disabled');
        }
        textileDataTable = $('#textile_datatable').DataTable({
            ajax: {url: 'textile/get_textile_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'textile_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'textile_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'textile_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'textile_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
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
    newTextileForm: function (isEdit, textileData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            Textile.router.navigate('edit_textile_form');
        } else {
            var formData = {};
            Textile.router.navigate('textile_form');
        }
        textileData = that.basicDetailsForForm(textileData);
        $('#textile_form_and_datatable_container').html(textileFormTemplate(textileData));
        $('#view_document_container_for_textile').html(textileViewDocumentTemplate(textileData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_textile');
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'unit_type_for_textile');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        generateBoxes('radio', constitutionArray, 'constitution', 'textile', textileData.constitution, true);
        generateBoxes('checkbox', socialStatusArray, 'social_status', 'textile', textileData.social_status, true);
        if (isEdit) {
            $('#district_for_textile').val(textileData.district);
            $('#unit_type_for_textile').val(textileData.unit_type);
            $('#entity_establishment_type').val(textileData.entity_establishment_type);
            var docData = {};
            that.viewDocument(docData, textileData);
        }
        resetCounter('scheme-sr-no');
        resetCounter('doc-sr-no');
        if (isEdit) {
            that.loadFAC(textileData);
        }
        generateSelect2();
        $('#textile_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.askForSubmitTextile(VALUE_TWO);
            }
        });
    },
    viewDocument: function (docData, textileData) {
        var that = this;
        if (textileData.application_form_file != '') {
            docData.file_name = textileData.application_form_file;
            that.loadTextileDocumentForView(VALUE_ONE, docData);
        }
        if (textileData.doc_1 != '') {
            docData.file_name = textileData.doc_1;
            that.loadTextileDocumentForView(VALUE_TWO, docData);
        }
        if (textileData.doc_2 != '') {
            docData.file_name = textileData.doc_2;
            that.loadTextileDocumentForView(VALUE_THREE, docData);
        }
        if (textileData.doc_3 != '') {
            docData.file_name = textileData.doc_3;
            that.loadTextileDocumentForView(VALUE_FOUR, docData);
        }
        if (textileData.doc_4 != '') {
            docData.file_name = textileData.doc_4;
            that.loadTextileDocumentForView(VALUE_FIVE, docData);
        }
        if (textileData.doc_5 != '') {
            docData.file_name = textileData.doc_5;
            that.loadTextileDocumentForView(VALUE_SIX, docData);
        }
        if (textileData.doc_6 != '') {
            docData.file_name = textileData.doc_6;
            that.loadTextileDocumentForView(VALUE_SEVEN, docData);
        }
        if (textileData.doc_7 != '') {
            docData.file_name = textileData.doc_7;
            that.loadTextileDocumentForView(VALUE_EIGHT, docData);
        }
        if (textileData.doc_8 != '') {
            docData.file_name = textileData.doc_8;
            that.loadTextileDocumentForView(VALUE_NINE, docData);
        }
        if (textileData.doc_9 != '') {
            docData.file_name = textileData.doc_9;
            that.loadTextileDocumentForView(VALUE_TEN, docData);
        }
        if (textileData.doc_10 != '') {
            docData.file_name = textileData.doc_10;
            that.loadTextileDocumentForView(VALUE_ELEVEN, docData);
        }
        if (textileData.doc_11 != '') {
            docData.file_name = textileData.doc_11;
            that.loadTextileDocumentForView(VALUE_TWELVE, docData);
        }
        if (textileData.doc_12 != '') {
            docData.file_name = textileData.doc_12;
            that.loadTextileDocumentForView(VALUE_THIRTEEN, docData);
        }
        if (textileData.doc_13 != '') {
            docData.file_name = textileData.doc_13;
            that.loadTextileDocumentForView(VALUE_FOURTEEN, docData);
        }
        if (textileData.doc_14 != '') {
            docData.file_name = textileData.doc_14;
            that.loadTextileDocumentForView(VALUE_FIFTEEN, docData);
        }
        if (textileData.doc_15 != '') {
            docData.file_name = textileData.doc_15;
            that.loadTextileDocumentForView(VALUE_SIXTEEN, docData);
        }
        if (textileData.doc_16 != '') {
            docData.file_name = textileData.doc_16;
            that.loadTextileDocumentForView(VALUE_SEVENTEEN, docData);
        }
        if (textileData.doc_17 != '') {
            docData.file_name = textileData.doc_17;
            that.loadTextileDocumentForView(VALUE_EIGHTEEN, docData);
        }
    },
    basicDetailsForForm: function (textileData) {
        textileData.VALUE_ONE = VALUE_ONE;
        textileData.VALUE_TWO = VALUE_TWO;
        textileData.VALUE_THREE = VALUE_THREE;
        textileData.VALUE_FOUR = VALUE_FOUR;
        textileData.VALUE_FIVE = VALUE_FIVE;
        textileData.VALUE_SIX = VALUE_SIX;
        textileData.VALUE_SEVEN = VALUE_SEVEN;
        textileData.VALUE_EIGHT = VALUE_EIGHT;
        textileData.VALUE_NINE = VALUE_NINE;
        textileData.VALUE_TEN = VALUE_TEN;
        textileData.VALUE_ELEVEN = VALUE_ELEVEN;
        textileData.VALUE_TWELVE = VALUE_TWELVE;
        textileData.VALUE_THIRTEEN = VALUE_THIRTEEN;
        textileData.VALUE_FOURTEEN = VALUE_FOURTEEN;
        textileData.VALUE_FIFTEEN = VALUE_FIFTEEN;
        textileData.VALUE_SIXTEEN = VALUE_SIXTEEN;
        textileData.VALUE_SEVENTEEN = VALUE_SEVENTEEN;
        textileData.VALUE_EIGHTEEN = VALUE_EIGHTEEN;
        textileData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        return textileData;
    },
    editOrViewTextile: function (btnObj, textileId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
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
            data: $.extend({}, {'textile_id': textileId}, getTokenData()),
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
                var textileData = parseData.textile_data;
                if (isEdit) {
                    that.newTextileForm(isEdit, textileData);
                } else {
                    that.viewTextileForm(textileData);
                }
            }
        });
    },
    viewTextileForm: function (textileData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        Textile.router.navigate('view_textile_form');
        textileData = that.basicDetailsForForm(textileData);
        textileData.district_text = talukaArray[textileData.district] ? talukaArray[textileData.district] : '';
        textileData.unit_type_text = cbTypeArray[textileData.unit_type] ? cbTypeArray[textileData.unit_type] : '';
        $('#textile_form_and_datatable_container').html(textileViewTemplate(textileData));
        $('#view_document_container_for_textile').html(textileViewDocumentTemplate(textileData));
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        generateBoxes('radio', constitutionArray, 'constitution', 'textile_view', textileData.constitution, true);
        generateBoxes('checkbox', socialStatusArray, 'social_status', 'textile_view', textileData.social_status, true);
        var docData = {};
        $('#entity_establishment_type').val(textileData.entity_establishment_type);
        that.viewDocument(docData, textileData);
        resetCounter('scheme-sr-no');
        resetCounter('doc-sr-no');
        that.loadFAC(textileData);
    },
    checkValidationForTextile: function (textileData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!textileData.district_for_textile) {
            return getBasicMessageAndFieldJSONArray('district_for_textile', selectDistrictValidationMessage);
        }
        if (!textileData.enterprise_name_for_textile) {
            return getBasicMessageAndFieldJSONArray('enterprise_name_for_textile', enterpriseNameValidationMessage);
        }
        if (!textileData.office_address_for_textile) {
            return getBasicMessageAndFieldJSONArray('office_address_for_textile', officeAddressValidationMessage);
        }
        if (!textileData.office_contact_number_for_textile) {
            return getBasicMessageAndFieldJSONArray('office_contact_number_for_textile', officeContactNoValidationMessage);
        }
        if (!textileData.factory_contact_number_for_textile) {
            return getBasicMessageAndFieldJSONArray('factory_contact_number_for_textile', factoryContactNoValidationMessage);
        }
        if (!textileData.constitution_for_textile) {
            $('#constitution_for_textile_1').focus();
            return getBasicMessageAndFieldJSONArray('constitution_for_textile', oneOptionValidationMessage);
        }
        if (!textileData.promoter_name_for_textile) {
            return getBasicMessageAndFieldJSONArray('promoter_name_for_textile', promoterNameValidationMessage);
        }
        if (!textileData.promoter_designation_for_textile) {
            return getBasicMessageAndFieldJSONArray('promoter_designation_for_textile', promoterDesignationValidationMessage);
        }
        if (!textileData.social_status_for_textile) {
            $('#social_status_for_textile_1').focus();
            return getBasicMessageAndFieldJSONArray('social_status_for_textile', oneOptionValidationMessage);
        }
        if (!textileData.ap_name_for_textile) {
            return getBasicMessageAndFieldJSONArray('ap_name_for_textile', apNameValidationMessage);
        }
        if (!textileData.ap_designation_for_textile) {
            return getBasicMessageAndFieldJSONArray('ap_designation_for_textile', apDesignationValidationMessage);
        }
        if (!textileData.unit_type_for_textile) {
            return getBasicMessageAndFieldJSONArray('unit_type_for_textile', oneOptionValidationMessage);
        }
        return '';
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
        var yesEvent = 'Textile.listview.submitTextile(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
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
        textileData.module_type = moduleType;
        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_textile') : $('#submit_btn_for_textile');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'textile/submit_textile',
            data: $.extend({}, textileData, getTokenData()),
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
                validationMessageShow('textile', textStatus.statusText);
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
                    validationMessageShow('textile', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Textile.listview.loadTextileData();
                showSuccess(parseData.message);
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
            data: $.extend({}, {'textile_id': textileId, 'document_id': docId, 'table_name': tableName}, getTokenData()),
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
                validationMessageShow('textile', textStatus.statusText);
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
            data: $.extend({}, {'textile_id': incentiveId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                textileData.module_type = VALUE_TEN;
                $('#popup_container').html(textileUploadChallanTemplate(textileData));
                loadFB(VALUE_TEN, parseData.fb_data, textileData.payment_type, textileData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'textile_upload_challan', textileData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'textile_upload_challan', 'uc', 'radio', '#fb', VALUE_TEN);
                if (textileData.challan != '') {
                    $('#challan_container_for_textile_upload_challan').hide();
                    $('#challan_name_container_for_textile_upload_challan').show();
                    $('#challan_name_href_for_textile_upload_challan').attr('href', 'documents/textile/' + textileData.challan);
                    $('#challan_name_for_textile_upload_challan').html(textileData.challan);
                    $('#challan_remove_btn_for_textile_upload_challan').attr('onclick', 'Textile.listview.removeChallan("' + textileData.textile_id + '")');
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
            data: $.extend({}, {'textile_id': incentiveId}, getTokenData()),
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
                validationMessageShow('textile-uc', textStatus.statusText);
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
        var incentiveId = $('#textile_id_for_textile_upload_challan').val();
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_textile_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
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
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TEN, 'textile-uc');
            if (!returnData) {
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
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
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
                validationMessageShow('textile-uc', textStatus.statusText);
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
                    validationMessageShow('textile-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + incentiveId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + incentiveId).show();
                }
                $('#total_fees_' + incentiveId).html(returnFees(parseData));
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
            data: $.extend({}, {'textile_id': incentiveId}, getTokenData()),
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
        if (!formData.textile_id_for_textile_approve) {
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
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_textile_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_textile_approve').focus();
            validationMessageShow('textile-approve-certificate_file_for_textile_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_textile_approve) {
            $('#remarks_for_textile_approve').focus();
            validationMessageShow('textile-approve-remarks_for_textile_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_textile_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_textile_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'textile/approve_application',
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
                validationMessageShow('textile-approve', textStatus.statusText);
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
                    validationMessageShow('textile-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.textile_id_for_textile_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.textile_id_for_textile_approve).remove();
                $('#approve_btn_for_app_' + formData.textile_id_for_textile_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.textile_id_for_textile_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.textile_id_for_textile_approve).show();
                $('#so_status_' + formData.textile_id_for_textile_approve).html(dateTimeDays(formData.textile_id_for_textile_approve, parseData, VALUE_TEN));
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
            data: $.extend({}, {'textile_id': incentiveId}, getTokenData()),
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
        if (!formData.textile_id_for_textile_reject) {
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
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('textile-reject', textStatus.statusText);
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
                    validationMessageShow('textile-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.textile_id_for_textile_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.textile_id_for_textile_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.textile_id_for_textile_reject).remove();
                $('#reject_btn_for_app_' + formData.textile_id_for_textile_reject).remove();
                $('#approve_btn_for_app_' + formData.textile_id_for_textile_reject).remove();
                $('#so_status_' + formData.textile_id_for_textile_reject).html(dateTimeDays(formData.textile_id_for_textile_reject, parseData, VALUE_TEN));
            }
        });
    },
    generateCertificate: function (incentiveId) {
        if (!incentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#textile_id_for_certificate').val(incentiveId);
        $('#textile_certificate_pdf_form').submit();
        $('#textile_id_for_certificate').val('');
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
        var btnObj = $('#query_btn_for_textile_' + textileId);
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
                tmpData.application_number = regNoRenderer(VALUE_TEN, moduleData.textile_id);
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
            data: $.extend({}, {'textile_id': incentiveId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var textileData = parseData.textile_data;
                showPopup();
                if (textileData.payment_type == VALUE_ONE || textileData.payment_type == VALUE_THREE) {
                    textileData.user_payment_type_text = paymentTypeArray[textileData.payment_type];
                } else {
                    textileData.user_payment_type_text = userPaymentTypeArray[textileData.user_payment_type] ? userPaymentTypeArray[textileData.user_payment_type] : '';
                }
                if (textileData.payment_type == VALUE_ONE) {
                    textileData.utitle = 'Fees Paid Challan Copy';
                } else if (textileData.payment_type == VALUE_TWO && textileData.user_payment_type == VALUE_ONE) {
                    textileData.utitle = 'Demand Draft (DD) Copy';
                }
                textileData.module_type = VALUE_TEN;
                $('#popup_container').html(textileViewPaymentTemplate(textileData));
                loadFB(VALUE_TEN, parseData.fb_data, textileData.payment_type);
                loadPH(VALUE_TEN, textileData.textile_id, parseData.ph_data);
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
    loadTextileDocumentForView: function (fileNo, textileData) {
        $('#upload_name_href_for_textile_view_' + fileNo).attr('href', TEXTILE_DOC_PATH + textileData.file_name);
        $('#upload_container_for_textile_view_' + fileNo).hide();
        $('#upload_name_container_for_textile_view_' + fileNo).show();
    },
    loadFAC: function (textileData) {
        var facData = [];
        if (textileData.form_application_checklist.indexOf(',') != -1) {
            facData = (textileData.form_application_checklist).split(',');
        } else {
            facData.push(textileData.form_application_checklist)
        }
        $.each(facData, function (index, value) {
            $('input[name=form_application_checklist_for_textile][value="' + value + '"]').click();
        });
        $('[name=form_application_checklist_for_textile]').attr('disabled', 'disabled');
        $('[name=form_application_checklist_for_textile]').removeAttr('onclick');
    },
    FACChangeEvent: function () {
        var facArray = [];
        $('[name="form_application_checklist_for_textile"]:checked').each(function (i, e) {
            facArray.push(parseInt(e.value));
        });
        this.hideShowFAC(facArray);
    },
    hideShowFAC: function (facArray) {
        if (facArray.indexOf(VALUE_ONE) != -1) {
            $('.doc-for-all').show();
            $('.doc-for-is').show();
            resetCounter('doc-sr-no');
            return false;
        }
        $('.doc-for-is').hide();
        $('.doc-for-all').show();
    }
});
