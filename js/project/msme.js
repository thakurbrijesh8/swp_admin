var msmeListTemplate = Handlebars.compile($('#msme_list_template').html());
var msmeTableTemplate = Handlebars.compile($('#msme_table_template').html());
var msmeActionTemplate = Handlebars.compile($('#msme_action_template').html());
var msmeFormTemplate = Handlebars.compile($('#msme_form_template').html());
var msmeViewTemplate = Handlebars.compile($('#msme_view_template').html());
var msmeUploadChallanTemplate = Handlebars.compile($('#msme_upload_challan_template').html());
var msmeApproveTemplate = Handlebars.compile($('#msme_approve_template').html());
var msmeRejectTemplate = Handlebars.compile($('#msme_reject_template').html());
var msmeViewPaymentTemplate = Handlebars.compile($('#msme_view_payment_template').html());
var msmeViewDocumentTemplate = Handlebars.compile($('#msme_view_document_template').html());

var MSME = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
MSME.Router = Backbone.Router.extend({
    routes: {
        'msme': 'renderList',
        'msme_form': 'renderList',
        'edit_msme_form': 'renderList',
        'view_msme_form': 'renderList',
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
        addClass('msme', 'active');
        MSME.router.navigate('msme');
        var templateData = {};
        this.$el.html(msmeListTemplate(templateData));
        this.loadMSMEData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageMSMEForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('msme', 'active');
        this.$el.html(msmeListTemplate);
        this.newMSMEForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return msmeActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_upload_challan_btn = true;
        }
        rowData.status = parseInt(rowData.status);
        if (rowData.status == VALUE_FOUR || rowData.status == VALUE_FIVE || rowData.status == VALUE_SEVEN || rowData.status == VALUE_EIGHT) {
            rowData.show_download_fees_paid_challan_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN &&
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
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return msmeActionTemplate(rowData);
    },
    loadMSMEData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return getAppNoWithRating(VALUE_NINE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_NINE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['msme_data'], function (index, objData) {
                json['msme_data'][index]['query_movement_string'] = qmData[objData.msme_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.msme_id] + '</table>') : '-';
            });
            return json['msme_data'];
        };
        var that = this;
        showTableContainer('incentive_generalform');
        MSME.router.navigate('msme');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'MSME.listview.loadMSMEData();');
        $('#msme_form_and_datatable_container').html(msmeTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_msme_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_msme_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_msme_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_msme_list', false);
        allowOnlyIntegerValue('mobile_number_for_msme_list')
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_msme_list', false);
        $('#district_for_msme_list').val(searchData.search_district);
        $('#status_for_msme_list').val(searchData.search_status);
        $('#app_timing_for_msme_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_msme_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_msme_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_msme_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_msme_list').attr('disabled', 'disabled');
        }
        msmeDataTable = $('#msme_datatable').DataTable({
            ajax: {url: 'msme/get_msme_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'msme_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'msme_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'msme_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'msme_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
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
    newMSMEForm: function (isEdit, msmeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            MSME.router.navigate('edit_msme_form');
        } else {
            MSME.router.navigate('msme_form');
        }
        msmeData = that.basicDetailsForForm(msmeData);
        $('#msme_form_and_datatable_container').html(msmeFormTemplate(msmeData));
        $('#view_document_container_for_msme').html(msmeViewDocumentTemplate(msmeData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_msme');
        renderOptionsForTwoDimensionalArray(cbTypeArray, 'unit_type_for_msme');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        generateBoxes('radio', constitutionArray, 'constitution', 'msme', msmeData.constitution, true);
        generateBoxes('checkbox', socialStatusArray, 'social_status', 'msme', msmeData.social_status, true);
        if (isEdit) {
            $('#district_for_msme').val(msmeData.district);
            $('#unit_type_for_msme').val(msmeData.unit_type);
            $('#entity_establishment_type').val(msmeData.entity_establishment_type);
            var docData = {};
            that.viewDocument(docData, msmeData);
        }
        resetCounter('scheme-sr-no');
        resetCounter('doc-sr-no');
        if (isEdit) {
            that.loadFAC(msmeData);
        }
        generateSelect2();
        $('#msme_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.askForSubmitMSME(VALUE_TWO);
            }
        });
    },
    viewDocument: function (docData, msmeData) {
        var that = this;
        if (msmeData.application_form_file != '') {
            docData.file_name = msmeData.application_form_file;
            that.loadMSMEDocumentForView(VALUE_TWO, docData);
        }
//        if (msmeData.declaration_file != '') {
//            docData.file_name = msmeData.declaration_file;
//            that.loadMSMEDocumentForView(VALUE_ONE, docData);
//        }
//        if (msmeData.ci_is_file != '') {
//            docData.file_name = msmeData.ci_is_file;
//            that.loadMSMEDocumentForView(VALUE_TWO, docData);
//        }
//        if (msmeData.afqc_file != '') {
//            docData.file_name = msmeData.afqc_file;
//            that.loadMSMEDocumentForView(VALUE_THREE, docData);
//        }
//        if (msmeData.afpr_file != '') {
//            docData.file_name = msmeData.afpr_file;
//            that.loadMSMEDocumentForView(VALUE_FOUR, docData);
//        }
//        if (msmeData.afscew_file != '') {
//            docData.file_name = msmeData.afscew_file;
//            that.loadMSMEDocumentForView(VALUE_FIVE, docData);
//        }
//        if (msmeData.ifle_file != '') {
//            docData.file_name = msmeData.ifle_file;
//            that.loadMSMEDocumentForView(VALUE_SIX, docData);
//        }
        if (msmeData.doc_1 != '') {
            docData.file_name = msmeData.doc_1;
            that.loadMSMEDocumentForView(VALUE_SEVEN, docData);
        }
        if (msmeData.doc_2 != '') {
            docData.file_name = msmeData.doc_2;
            that.loadMSMEDocumentForView(VALUE_EIGHT, docData);
        }
        if (msmeData.doc_3 != '') {
            docData.file_name = msmeData.doc_3;
            that.loadMSMEDocumentForView(VALUE_NINE, docData);
        }
        if (msmeData.doc_4 != '') {
            docData.file_name = msmeData.doc_4;
            that.loadMSMEDocumentForView(VALUE_TEN, docData);
        }
        if (msmeData.doc_5 != '') {
            docData.file_name = msmeData.doc_5;
            that.loadMSMEDocumentForView(VALUE_ELEVEN, docData);
        }
        if (msmeData.doc_6 != '') {
            docData.file_name = msmeData.doc_6;
            that.loadMSMEDocumentForView(VALUE_TWELVE, docData);
        }
        if (msmeData.doc_7 != '') {
            docData.file_name = msmeData.doc_7;
            that.loadMSMEDocumentForView(VALUE_THIRTEEN, docData);
        }
        if (msmeData.doc_8 != '') {
            docData.file_name = msmeData.doc_8;
            that.loadMSMEDocumentForView(VALUE_FOURTEEN, docData);
        }
        if (msmeData.doc_9 != '') {
            docData.file_name = msmeData.doc_9;
            that.loadMSMEDocumentForView(VALUE_FIFTEEN, docData);
        }
        if (msmeData.doc_10 != '') {
            docData.file_name = msmeData.doc_10;
            that.loadMSMEDocumentForView(VALUE_SIXTEEN, docData);
        }
        if (msmeData.doc_11 != '') {
            docData.file_name = msmeData.doc_11;
            that.loadMSMEDocumentForView(VALUE_SEVENTEEN, docData);
        }
        if (msmeData.doc_12 != '') {
            docData.file_name = msmeData.doc_12;
            that.loadMSMEDocumentForView(VALUE_EIGHTEEN, docData);
        }
        if (msmeData.doc_13 != '') {
            docData.file_name = msmeData.doc_13;
            that.loadMSMEDocumentForView(VALUE_NINETEEN, docData);
        }
        if (msmeData.doc_14 != '') {
            docData.file_name = msmeData.doc_14;
            that.loadMSMEDocumentForView(VALUE_TWENTY, docData);
        }
        if (msmeData.doc_15 != '') {
            docData.file_name = msmeData.doc_15;
            that.loadMSMEDocumentForView(VALUE_TWENTYONE, docData);
        }
        if (msmeData.doc_16 != '') {
            docData.file_name = msmeData.doc_16;
            that.loadMSMEDocumentForView(VALUE_TWENTYTWO, docData);
        }
        if (msmeData.doc_17 != '') {
            docData.file_name = msmeData.doc_17;
            that.loadMSMEDocumentForView(VALUE_TWENTYTHREE, docData);
        }
        if (msmeData.doc_18 != '') {
            docData.file_name = msmeData.doc_18;
            that.loadMSMEDocumentForView(VALUE_TWENTYFOUR, docData);
        }
        if (msmeData.doc_19 != '') {
            docData.file_name = msmeData.doc_19;
            that.loadMSMEDocumentForView(VALUE_TWENTYFIVE, docData);
        }
        if (msmeData.doc_20 != '') {
            docData.file_name = msmeData.doc_20;
            that.loadMSMEDocumentForView(VALUE_TWENTYSIX, docData);
        }
        if (msmeData.doc_21 != '') {
            docData.file_name = msmeData.doc_21;
            that.loadMSMEDocumentForView(VALUE_TWENTYSEVEN, docData);
        }
        if (msmeData.doc_22 != '') {
            docData.file_name = msmeData.doc_22;
            that.loadMSMEDocumentForView(VALUE_TWENTYEIGHT, docData);
        }
        if (msmeData.doc_23 != '') {
            docData.file_name = msmeData.doc_23;
            that.loadMSMEDocumentForView(VALUE_TWENTYNINE, docData);
        }
        if (msmeData.doc_24 != '') {
            docData.file_name = msmeData.doc_24;
            that.loadMSMEDocumentForView(VALUE_THIRTY, docData);
        }
        that.loadFAC(msmeData);
    },
    basicDetailsForForm: function (msmeData) {
        msmeData.VALUE_ONE = VALUE_ONE;
        msmeData.VALUE_TWO = VALUE_TWO;
        msmeData.VALUE_THREE = VALUE_THREE;
        msmeData.VALUE_FOUR = VALUE_FOUR;
        msmeData.VALUE_FIVE = VALUE_FIVE;
        msmeData.VALUE_SIX = VALUE_SIX;
        msmeData.VALUE_SEVEN = VALUE_SEVEN;
        msmeData.VALUE_EIGHT = VALUE_EIGHT;
        msmeData.VALUE_NINE = VALUE_NINE;
        msmeData.VALUE_TEN = VALUE_TEN;
        msmeData.VALUE_ELEVEN = VALUE_ELEVEN;
        msmeData.VALUE_TWELVE = VALUE_TWELVE;
        msmeData.VALUE_THIRTEEN = VALUE_THIRTEEN;
        msmeData.VALUE_FOURTEEN = VALUE_FOURTEEN;
        msmeData.VALUE_FIFTEEN = VALUE_FIFTEEN;
        msmeData.VALUE_SIXTEEN = VALUE_SIXTEEN;
        msmeData.VALUE_SEVENTEEN = VALUE_SEVENTEEN;
        msmeData.VALUE_EIGHTEEN = VALUE_EIGHTEEN;
        msmeData.VALUE_NINETEEN = VALUE_NINETEEN;
        msmeData.VALUE_TWENTY = VALUE_TWENTY;
        msmeData.VALUE_TWENTYONE = VALUE_TWENTYONE;
        msmeData.VALUE_TWENTYTWO = VALUE_TWENTYTWO;
        msmeData.VALUE_TWENTYTHREE = VALUE_TWENTYTHREE;
        msmeData.VALUE_TWENTYFOUR = VALUE_TWENTYFOUR;
        msmeData.VALUE_TWENTYFIVE = VALUE_TWENTYFIVE;
        msmeData.VALUE_TWENTYSIX = VALUE_TWENTYSIX;
        msmeData.VALUE_TWENTYSEVEN = VALUE_TWENTYSEVEN;
        msmeData.VALUE_TWENTYEIGHT = VALUE_TWENTYEIGHT;
        msmeData.VALUE_TWENTYNINE = VALUE_TWENTYNINE;
        msmeData.VALUE_THIRTY = VALUE_THIRTY;
        msmeData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        return msmeData;
    },
    editOrViewMSME: function (btnObj, msmeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
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
            data: $.extend({}, {'msme_id': msmeId}, getTokenData()),
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
                var msmeData = parseData.msme_data;
                if (isEdit) {
                    that.newMSMEForm(isEdit, msmeData);
                } else {
                    that.viewMSMEForm(msmeData);
                }
            }
        });
    },
    viewMSMEForm: function (msmeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        MSME.router.navigate('view_msme_form');
        msmeData = that.basicDetailsForForm(msmeData);
        msmeData.district_text = talukaArray[msmeData.district] ? talukaArray[msmeData.district] : '';
        msmeData.unit_type_text = cbTypeArray[msmeData.unit_type] ? cbTypeArray[msmeData.unit_type] : '';
        $('#msme_form_and_datatable_container').html(msmeViewTemplate(msmeData));
        $('#view_document_container_for_msme').html(msmeViewDocumentTemplate(msmeData));
        generateBoxes('radio', constitutionArray, 'constitution', 'msme_view', msmeData.constitution, true);
        generateBoxes('checkbox', socialStatusArray, 'social_status', 'msme_view', msmeData.social_status, true);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        var docData = {};
        $('#entity_establishment_type').val(msmeData.entity_establishment_type);
        that.viewDocument(docData, msmeData);
        resetCounter('scheme-sr-no');
        resetCounter('doc-sr-no');
    },
    checkValidationForMSME: function (msmeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!msmeData.district_for_msme) {
            return getBasicMessageAndFieldJSONArray('district_for_msme', selectDistrictValidationMessage);
        }
        if (!msmeData.enterprise_name_for_msme) {
            return getBasicMessageAndFieldJSONArray('enterprise_name_for_msme', enterpriseNameValidationMessage);
        }
        if (!msmeData.office_address_for_msme) {
            return getBasicMessageAndFieldJSONArray('office_address_for_msme', officeAddressValidationMessage);
        }
        if (!msmeData.office_contact_number_for_msme) {
            return getBasicMessageAndFieldJSONArray('office_contact_number_for_msme', officeContactNoValidationMessage);
        }
        if (!msmeData.factory_contact_number_for_msme) {
            return getBasicMessageAndFieldJSONArray('factory_contact_number_for_msme', factoryContactNoValidationMessage);
        }
        if (!msmeData.constitution_for_msme) {
            $('#constitution_for_msme_1').focus();
            return getBasicMessageAndFieldJSONArray('constitution_for_msme', oneOptionValidationMessage);
        }
        if (!msmeData.promoter_name_for_msme) {
            return getBasicMessageAndFieldJSONArray('promoter_name_for_msme', promoterNameValidationMessage);
        }
        if (!msmeData.promoter_designation_for_msme) {
            return getBasicMessageAndFieldJSONArray('promoter_designation_for_msme', promoterDesignationValidationMessage);
        }
        if (!msmeData.social_status_for_msme) {
            $('#social_status_for_msme_1').focus();
            return getBasicMessageAndFieldJSONArray('social_status_for_msme', oneOptionValidationMessage);
        }
        if (!msmeData.ap_name_for_msme) {
            return getBasicMessageAndFieldJSONArray('ap_name_for_msme', apNameValidationMessage);
        }
        if (!msmeData.ap_designation_for_msme) {
            return getBasicMessageAndFieldJSONArray('ap_designation_for_msme', apDesignationValidationMessage);
        }
        if (!msmeData.unit_type_for_msme) {
            return getBasicMessageAndFieldJSONArray('unit_type_for_msme', oneOptionValidationMessage);
        }
        return '';
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
        var yesEvent = 'MSME.listview.submitMSME(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
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
        msmeData.module_type = moduleType;
        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_msme') : $('#submit_btn_for_msme');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'msme/submit_msme',
            data: $.extend({}, msmeData, getTokenData()),
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
                validationMessageShow('msme', textStatus.statusText);
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
                    validationMessageShow('msme', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                MSME.listview.loadMSMEData();
                showSuccess(parseData.message);
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
            data: $.extend({}, {'msme_id': msmeId, 'document_id': docId, 'table_name': tableName}, getTokenData()),
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
                validationMessageShow('msme', textStatus.statusText);
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
    openUploadChallan: function (msmeId) {
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + msmeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'msme_id': msmeId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var msmeData = parseData.msme_data;
                showPopup();
                if (msmeData.status != VALUE_FOUR && msmeData.status != VALUE_FIVE && msmeData.status != VALUE_SIX && msmeData.status != VALUE_SEVEN && msmeData.status != VALUE_EIGHT && msmeData.status != VALUE_ELEVEN) {
                    msmeData.show_remove_upload_btn = true;
                }
                if (msmeData.payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Challan Copy';
                } else {
                    msmeData.utitle = 'Payment Details';
                }
                msmeData.module_type = VALUE_NINE;
                $('#popup_container').html(msmeUploadChallanTemplate(msmeData));
                loadFB(VALUE_NINE, parseData.fb_data, msmeData.payment_type, msmeData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'msme_upload_challan', msmeData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'msme_upload_challan', 'uc', 'radio', '#fb', VALUE_NINE);
                if (msmeData.challan != '') {
                    $('#challan_container_for_msme_upload_challan').hide();
                    $('#challan_name_container_for_msme_upload_challan').show();
                    $('#challan_name_href_for_msme_upload_challan').attr('href', 'documents/msme/' + msmeData.challan);
                    $('#challan_name_for_msme_upload_challan').html(msmeData.challan);
                    $('#challan_remove_btn_for_msme_upload_challan').attr('onclick', 'MSME.listview.removeChallan("' + msmeData.msme_id + '")');
                }
            }
        });
    },
    removeChallan: function (msmeId) {
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
            url: 'msme/remove_challan',
            data: $.extend({}, {'msme_id': msmeId}, getTokenData()),
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
                validationMessageShow('msme-uc', textStatus.statusText);
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
                    validationMessageShow('msme-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-msme-uc').html(parseData.message);
                removeDocument('challan', 'msme_upload_challan');
                $('#status_' + msmeId).html(appStatusArray[VALUE_TWO]);
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
        var msmeId = $('#msme_id_for_msme_upload_challan').val();
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_msme_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
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
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_NINE, 'msme-uc');
            if (!returnData) {
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
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
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
                validationMessageShow('msme-uc', textStatus.statusText);
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
                    validationMessageShow('msme-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + msmeId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + msmeId).show();
                }
                $('#total_fees_' + msmeId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (msmeId) {
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + msmeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'msme_id': msmeId}, getTokenData()),
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
        if (!formData.msme_id_for_msme_approve) {
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
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_msme_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_msme_approve').focus();
            validationMessageShow('msme-approve-certificate_file_for_msme_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_msme_approve) {
            $('#remarks_for_msme_approve').focus();
            validationMessageShow('msme-approve-remarks_for_msme_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_msme_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_msme_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'msme/approve_application',
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
                validationMessageShow('msme-approve', textStatus.statusText);
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
                    validationMessageShow('msme-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.msme_id_for_msme_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.msme_id_for_msme_approve).remove();
                $('#approve_btn_for_app_' + formData.msme_id_for_msme_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.msme_id_for_msme_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.msme_id_for_msme_approve).show();
                $('#so_status_' + formData.msme_id_for_msme_approve).html(dateTimeDays(formData.msme_id_for_msme_approve, parseData, VALUE_NINE));
            }
        });
    },
    askForRejectApplication: function (msmeId) {
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + msmeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'msme_id': msmeId}, getTokenData()),
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
        if (!formData.msme_id_for_msme_reject) {
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
                if (textStatus.status === 403) {
                    loginPage();
                    return false;
                }
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('msme-reject', textStatus.statusText);
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
                    validationMessageShow('msme-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.msme_id_for_msme_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.msme_id_for_msme_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.msme_id_for_msme_reject).remove();
                $('#reject_btn_for_app_' + formData.msme_id_for_msme_reject).remove();
                $('#approve_btn_for_app_' + formData.msme_id_for_msme_reject).remove();
                $('#so_status_' + formData.msme_id_for_msme_reject).html(dateTimeDays(formData.msme_id_for_msme_reject, parseData, VALUE_NINE));
            }
        });
    },
    generateCertificate: function (msmeId) {
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#msme_id_for_certificate').val(msmeId);
        $('#msme_certificate_pdf_form').submit();
        $('#msme_id_for_certificate').val('');
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
                tmpData.application_number = regNoRenderer(VALUE_NINE, moduleData.msme_id);
                tmpData.applicant_name = moduleData.enterprise_name;
                tmpData.title = 'Enterprise Name';
                tmpData.module_type = VALUE_NINE;
                tmpData.module_id = msmeId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (msmeId) {
        if (!msmeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + msmeId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'msme/get_msme_data_by_msme_id',
            type: 'post',
            data: $.extend({}, {'msme_id': msmeId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var msmeData = parseData.msme_data;
                showPopup();
                if (msmeData.payment_type == VALUE_ONE || msmeData.payment_type == VALUE_THREE) {
                    msmeData.user_payment_type_text = paymentTypeArray[msmeData.payment_type];
                } else {
                    msmeData.user_payment_type_text = userPaymentTypeArray[msmeData.user_payment_type] ? userPaymentTypeArray[msmeData.user_payment_type] : '';
                }
                if (msmeData.payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Fees Paid Challan Copy';
                } else if (msmeData.payment_type == VALUE_TWO && msmeData.user_payment_type == VALUE_ONE) {
                    msmeData.utitle = 'Demand Draft (DD) Copy';
                }
                msmeData.module_type = VALUE_NINE;
                $('#popup_container').html(msmeViewPaymentTemplate(msmeData));
                loadFB(VALUE_NINE, parseData.fb_data, msmeData.payment_type);
                loadPH(VALUE_NINE, msmeData.msme_id, parseData.ph_data);

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
    loadMSMEDocumentForView: function (fileNo, msmeData) {
        $('#upload_name_href_for_msme_view_' + fileNo).attr('href', MSME_DOC_PATH + msmeData.file_name);
        $('#upload_container_for_msme_view_' + fileNo).hide();
        $('#upload_name_container_for_msme_view_' + fileNo).show();
    },
    loadFAC: function (msmeData) {
        var facData = [];
        if (msmeData.form_application_checklist.indexOf(',') != -1) {
            facData = (msmeData.form_application_checklist).split(',');
        } else {
            facData.push(msmeData.form_application_checklist)
        }
        $.each(facData, function (index, value) {
            $('input[name=form_application_checklist_for_msme][value="' + value + '"]').click();
        });
        $('[name=form_application_checklist_for_msme]').attr('disabled', 'disabled');
        $('[name=form_application_checklist_for_msme]').removeAttr('onclick');
    },
    FACChangeEvent: function () {
        var facArray = [];
        $('[name="form_application_checklist_for_msme"]:checked').each(function (i, e) {
            facArray.push(parseInt(e.value));
        });
        this.hideShowFAC(facArray);
    },
    hideShowFAC: function (facArray) {
        if (facArray.length == VALUE_ONE && facArray.indexOf(VALUE_TWO) != -1) {
            $('.doc-for-all').hide();
            $('.doc-for-is').show();
            resetCounter('is-doc-sr-no');
            return false;
        }
        if (facArray.indexOf(VALUE_TWO) != -1) {
            $('.doc-for-all').show();
            $('.doc-for-is').show();
            resetCounter('doc-sr-no');
            return false;
        }
        $('.doc-for-is').hide();
        $('.doc-for-all').show();
    }
});
