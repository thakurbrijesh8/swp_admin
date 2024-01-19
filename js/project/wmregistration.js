var wmregistrationListTemplate = Handlebars.compile($('#wmregistration_list_template').html());
var wmregistrationTableTemplate = Handlebars.compile($('#wmregistration_table_template').html());
var wmregistrationActionTemplate = Handlebars.compile($('#wmregistration_action_template').html());
var wmregistrationFormTemplate = Handlebars.compile($('#wmregistration_form_template').html());
var wmregistrationViewTemplate = Handlebars.compile($('#wmregistration_view_template').html());
var wmregistrationProprietorInfoTemplate = Handlebars.compile($('#wmregistration_proprietor_info_template').html());
var wmregistrationUploadChallanTemplate = Handlebars.compile($('#wmregistration_upload_challan_template').html());
var wmregistrationApproveTemplate = Handlebars.compile($('#wmregistration_approve_template').html());
var wmregistrationRejectTemplate = Handlebars.compile($('#wmregistration_reject_template').html());
var wmregistrationViewPaymentTemplate = Handlebars.compile($('#wmregistration_view_payment_template').html());

var tempPersonCnt = 1;

var Wmregistration = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Wmregistration.Router = Backbone.Router.extend({
    routes: {
        'wmregistration': 'renderList',
        'wmregistration_form': 'renderList',
        'edit_wmregistration_form': 'renderList',
        'view_wmregistration_form': 'renderList',
    },
    renderList: function () {
        Wmregistration.listview.listPage();
    },
    renderListForForm: function () {
        Wmregistration.listview.listPageWmregistrationForm();
    }
});
Wmregistration.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('wmregistration', 'active');
        Wmregistration.router.navigate('wmregistration');
        var templateData = {};
        this.$el.html(wmregistrationListTemplate(templateData));
        this.loadWmregistrationData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageWmregistrationForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_weightandmeasure');
        addClass('wmregistration', 'active');
        this.$el.html(wmregistrationListTemplate);
        this.newWmregistrationForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return wmregistrationActionTemplate(rowData);
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
        rowData.module_type = VALUE_ONE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return wmregistrationActionTemplate(rowData);
    },
    loadWmregistrationData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.application_category;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_ONE, data, full);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['wmregistration_data'], function (index, objData) {
                json['wmregistration_data'][index]['query_movement_string'] = qmData[objData.wmregistration_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.wmregistration_id] + '</table>') : '-';
            });
            return json['wmregistration_data'];
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_ONE);
        };
        var that = this;
        showTableContainer('wmregistration');
        Wmregistration.router.navigate('wmregistration');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Wmregistration.listview.loadWmregistrationData();');
        $('#wmregistration_datatable_container').html(wmregistrationTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_wmregistration_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_wmregistration_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_wmregistration_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_wmregistration_list', false);
        allowOnlyIntegerValue('mobile_number_for_wmregistration_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_wmregistration_list', false);
        $('#district_for_wmregistration_list').val(searchData.search_district);
        $('#status_for_wmregistration_list').val(searchData.search_status);
        $('#app_timing_for_wmregistration_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_wmregistration_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_wmregistration_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_wmregistration_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_wmregistration_list').attr('disabled', 'disabled');
        }
        wmregistrationDataTable = $('#wmregistration_datatable').DataTable({
            ajax: {url: 'wmregistration/get_wmregistration_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'wmregistration_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'wmregistration_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'wmregistration_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'wmregistration_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //}
        $('#wmregistration_datatable_filter').remove();
        $('#wmregistration_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = wmregistrationDataTable.row(tr);

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
    newWmregistrationForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.wmregistration_data;
            Wmregistration.router.navigate('edit_wmregistration_form');
        } else {
            var formData = {};
            Wmregistration.router.navigate('wmregistration_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.wmregistration_data = parseData.wmregistration_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('wmregistration');
        $('#wmregistration_form_container').html(wmregistrationFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');
            $('#declarationthree').attr('checked', 'checked');

            $('#application_category').val(formData.application_category);

            if (formData.trade_licence != '') {
                $('#trade_licence_container_for_wmregistration').hide();
                $('#trade_licence_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.trade_licence);
                $('#trade_licence_name_container_for_wmregistration').show();
                $('#trade_licence_download').attr("href", WMREG_DOC_PATH + formData.trade_licence);
            }
            if (formData.proof_of_ownership != '') {
                $('#proof_of_ownership_container_for_wmregistration').hide();
                $('#proof_of_ownership_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.proof_of_ownership);
                $('#proof_of_ownership_name_container_for_wmregistration').show();
                $('#proof_of_ownership_download').attr("href", WMREG_DOC_PATH + formData.proof_of_ownership);
            }
            if (formData.gst_certificate != '') {
                $('#gst_certificate_container_for_wmregistration').hide();
                $('#gst_certificate_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.gst_certificate);
                $('#gst_certificate_name_container_for_wmregistration').show();
                $('#gst_certificate_download').attr("href", WMREG_DOC_PATH + formData.gst_certificate);
            }
            if (formData.partnership_deed != '') {
                $('#partnership_deed_container_for_wmregistration').hide();
                $('#partnership_deed_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.partnership_deed);
                $('#partnership_deed_name_container_for_wmregistration').show();
                $('#partnership_deed_download').attr("href", WMREG_DOC_PATH + formData.partnership_deed);
            }
            if (formData.memorandum_articles != '') {
                $('#memorandum_articles_container_for_wmregistration').hide();
                $('#memorandum_articles_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.memorandum_articles);
                $('#memorandum_articles_name_container_for_wmregistration').show();
                $('#memorandum_articles_download').attr("href", WMREG_DOC_PATH + formData.memorandum_articles);
            }
            if (formData.item_to_be_packed != '') {
                $('#item_to_be_packed_container_for_wmregistration').hide();
                $('#item_to_be_packed_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.item_to_be_packed);
                $('#item_to_be_packed_name_container_for_wmregistration').show();
                $('#item_to_be_packed_download').attr("href", WMREG_DOC_PATH + formData.item_to_be_packed);
            }
            if (formData.list_of_directors != '') {
                $('#list_of_directors_container_for_wmregistration').hide();
                $('#list_of_directors_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.list_of_directors);
                $('#list_of_directors_name_container_for_wmregistration').show();
                $('#list_of_directors_download').attr("href", WMREG_DOC_PATH + formData.list_of_directors);
            }
            if (formData.code_certificate != '') {
                $('#code_certificate_container_for_wmregistration').hide();
                $('#code_certificate_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.code_certificate);
                $('#code_certificate_name_container_for_wmregistration').show();
                $('#code_certificate_download').attr("href", WMREG_DOC_PATH + formData.code_certificate);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_wmregistration').hide();
                $('#seal_and_stamp_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_wmregistration').show();
                $('#seal_and_stamp_download').attr("href", WMREG_DOC_PATH + formData.signature);
            }
            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })
        } else {
            that.addMultipleProprietor({});
        }

        generateSelect2();
        datePicker();
        $('#wmregistration_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitWmregistration($('#submit_btn_for_wmregistration'));
            }
        });
    },
    editOrViewWmregistration: function (btnObj, wmregistrationId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!wmregistrationId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wmregistration/get_wmregistration_data_by_id',
            type: 'post',
            data: $.extend({}, {'wmregistration_id': wmregistrationId}, getTokenData()),
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
                    that.newWmregistrationForm(isEdit, parseData);
                } else {
                    that.viewWmregistrationForm(parseData);
                }
            }
        });
    },
    viewWmregistrationForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.wmregistration_data;
        Wmregistration.router.navigate('view_wmregistration_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('wmregistration');
        $('#wmregistration_form_container').html(wmregistrationViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');
        $('#declarationthree').attr('checked', 'checked');
        $('#application_category').val(formData.application_category);


        if (formData.trade_licence != '') {
            $('#trade_licence_container_for_wmregistration').hide();
            $('#trade_licence_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.trade_licence);
            $('#trade_licence_name_container_for_wmregistration').show();
            $('#trade_licence_download').attr("href", WMREG_DOC_PATH + formData.trade_licence);
        }
        if (formData.proof_of_ownership != '') {
            $('#proof_of_ownership_container_for_wmregistration').hide();
            $('#proof_of_ownership_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.proof_of_ownership);
            $('#proof_of_ownership_name_container_for_wmregistration').show();
            $('#proof_of_ownership_download').attr("href", WMREG_DOC_PATH + formData.proof_of_ownership);
        }
        if (formData.gst_certificate != '') {
            $('#gst_certificate_container_for_wmregistration').hide();
            $('#gst_certificate_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.gst_certificate);
            $('#gst_certificate_name_container_for_wmregistration').show();
            $('#gst_certificate_download').attr("href", WMREG_DOC_PATH + formData.gst_certificate);
        }
        if (formData.partnership_deed != '') {
            $('#partnership_deed_container_for_wmregistration').hide();
            $('#partnership_deed_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.partnership_deed);
            $('#partnership_deed_name_container_for_wmregistration').show();
            $('#partnership_deed_download').attr("href", WMREG_DOC_PATH + formData.partnership_deed);
        }
        if (formData.memorandum_articles != '') {
            $('#memorandum_articles_container_for_wmregistration').hide();
            $('#memorandum_articles_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.memorandum_articles);
            $('#memorandum_articles_name_container_for_wmregistration').show();
            $('#memorandum_articles_download').attr("href", WMREG_DOC_PATH + formData.memorandum_articles);
        }
        if (formData.item_to_be_packed != '') {
            $('#item_to_be_packed_container_for_wmregistration').hide();
            $('#item_to_be_packed_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.item_to_be_packed);
            $('#item_to_be_packed_name_container_for_wmregistration').show();
            $('#item_to_be_packed_download').attr("href", WMREG_DOC_PATH + formData.item_to_be_packed);
        }
        if (formData.list_of_directors != '') {
            $('#list_of_directors_container_for_wmregistration').hide();
            $('#list_of_directors_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.list_of_directors);
            $('#list_of_directors_name_container_for_wmregistration').show();
            $('#list_of_directors_download').attr("href", WMREG_DOC_PATH + formData.list_of_directors);
        }
        if (formData.code_certificate != '') {
            $('#code_certificate_container_for_wmregistration').hide();
            $('#code_certificate_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.code_certificate);
            $('#code_certificate_name_container_for_wmregistration').show();
            $('#code_certificate_download').attr("href", WMREG_DOC_PATH + formData.code_certificate);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_wmregistration').hide();
            $('#seal_and_stamp_name_image_for_wmregistration').attr('src', WMREG_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_wmregistration').show();
            $('#seal_and_stamp_download').attr("href", WMREG_DOC_PATH + formData.signature);
        }

        var proprietorInfo = JSON.parse(formData.proprietor_details);
        $.each(proprietorInfo, function (key, value) {
            that.addMultipleProprietor(value);
        })
    },
    checkValidationForWmregistration: function (wmregistrationData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!wmregistrationData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!wmregistrationData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!wmregistrationData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!wmregistrationData.location_of_factory) {
            return getBasicMessageAndFieldJSONArray('location_of_factory', completeAddressValidationMessage);
        }
        if (!wmregistrationData.branches) {
            return getBasicMessageAndFieldJSONArray('branches', branchValidationMessage);
        }
        if (!wmregistrationData.application_category) {
            return getBasicMessageAndFieldJSONArray('application_category', applicantCategoryValidationMessage);
        }
        if (!wmregistrationData.item_detail) {
            return getBasicMessageAndFieldJSONArray('item_detail', itemDetailValidationMessage);
        }
        return '';
    },
    askForSubmitWmregistration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Wmregistration.listview.submitWmregistration(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitWmregistration: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var wmregistrationData = $('#wmregistration_form').serializeFormJSON();
        var validationData = that.checkValidationForWmregistration(wmregistrationData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('wmregistration-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;

        $('.proprietor_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var proprietorInfo = {};
            var occupierName = $('#occupier_name_' + cnt).val();
            if (occupierName == '' || occupierName == null) {
                $('#occupier_name_' + cnt).focus();
                validationMessageShow('wmregistration-' + cnt, occupierNameValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.occupier_name = occupierName;

            var fatherName = $('#father_name_' + cnt).val();
            if (fatherName == '' || fatherName == null) {
                $('#father_name_' + cnt).focus();
                validationMessageShow('wmregistration-' + cnt, fatherNameValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.father_name = fatherName;

            var address = $('#address_' + cnt).val();
            if (address == '' || address == null) {
                $('#address_' + cnt).focus();
                validationMessageShow('wmregistration-' + cnt, proprietorAddressValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.address = address;
            proprietorInfoItem.push(proprietorInfo);
        });


        if (isproprietorValidation) {
            return false;
        }


        if ($('#trade_licence_container_for_wmregistration').is(':visible')) {
            var tradeLicence = $('#trade_licence_for_wmregistration').val();
            if (tradeLicence == '') {
                $('#trade_licence_for_wmregistration').focus();
                validationMessageShow('wmregistration-trade_licence_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var tradeLicenceMessage = pdffileUploadValidation('trade_licence_for_wmregistration');
            if (tradeLicenceMessage != '') {
                $('#trade_licence_for_wmregistration').focus();
                validationMessageShow('wmregistration-trade_licence_for_wmregistration', tradeLicenceMessage);
                return false;
            }
        }

        if ($('#proof_of_ownership_container_for_wmregistration').is(':visible')) {
            var proofOfOwnership = $('#proof_of_ownership_for_wmregistration').val();
            if (proofOfOwnership == '') {
                $('#proof_of_ownership_for_wmregistration').focus();
                validationMessageShow('wmregistration-proof_of_ownership_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var proofOfOwnershipMessage = pdffileUploadValidation('proof_of_ownership_for_wmregistration');
            if (proofOfOwnershipMessage != '') {
                $('#proof_of_ownership_for_wmregistration').focus();
                validationMessageShow('wmregistration-proof_of_ownership_for_wmregistration', proofOfOwnershipMessage);
                return false;
            }
        }

        if ($('#gst_certificate_container_for_wmregistration').is(':visible')) {
            var gstCertificate = $('#gst_certificate_for_wmregistration').val();
            if (gstCertificate == '') {
                $('#gst_certificate_for_wmregistration').focus();
                validationMessageShow('wmregistration-gst_certificate_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var gstCertificateMessage = pdffileUploadValidation('gst_certificate_for_wmregistration');
            if (gstCertificateMessage != '') {
                $('#gst_certificate_for_wmregistration').focus();
                validationMessageShow('wmregistration-gst_certificate_for_wmregistration', gstCertificateMessage);
                return false;
            }
        }

        if ($('#partnership_deed_container_for_wmregistration').is(':visible')) {
            var partnershipDeed = $('#partnership_deed_for_wmregistration').val();
            if (partnershipDeed == '') {
                $('#partnership_deed_for_wmregistration').focus();
                validationMessageShow('wmregistration-partnership_deed_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var partnershipDeedMessage = pdffileUploadValidation('partnership_deed_for_wmregistration');
            if (partnershipDeedMessage != '') {
                $('#partnership_deed_for_wmregistration').focus();
                validationMessageShow('wmregistration-partnership_deed_for_wmregistration', partnershipDeedMessage);
                return false;
            }
        }

        if ($('#memorandum_articles_container_for_wmregistration').is(':visible')) {
            var memorandumArticles = $('#memorandum_articles_for_wmregistration').val();
            if (memorandumArticles == '') {
                $('#memorandum_articles_for_wmregistration').focus();
                validationMessageShow('wmregistration-memorandum_articles_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var memorandumArticlesMessage = pdffileUploadValidation('memorandum_articles_for_wmregistration');
            if (memorandumArticlesMessage != '') {
                $('#memorandum_articles_for_wmregistration').focus();
                validationMessageShow('wmregistration-memorandum_articles_for_wmregistration', memorandumArticlesMessage);
                return false;
            }
        }

        if ($('#item_to_be_packed_container_for_wmregistration').is(':visible')) {
            var itemToBePacked = $('#item_to_be_packed_for_wmregistration').val();
            if (itemToBePacked == '') {
                $('#item_to_be_packed_for_wmregistration').focus();
                validationMessageShow('wmregistration-item_to_be_packed_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var itemToBePackedMessage = pdffileUploadValidation('item_to_be_packed_for_wmregistration');
            if (itemToBePackedMessage != '') {
                $('#item_to_be_packed_for_wmregistration').focus();
                validationMessageShow('wmregistration-item_to_be_packed_for_wmregistration', itemToBePackedMessage);
                return false;
            }
        }

        if ($('#list_of_directors_container_for_wmregistration').is(':visible')) {
            var listOfDirectors = $('#list_of_directors_for_wmregistration').val();
            if (listOfDirectors == '') {
                $('#list_of_directors_for_wmregistration').focus();
                validationMessageShow('wmregistration-list_of_directors_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var listOfDirectorsMessage = pdffileUploadValidation('list_of_directors_for_wmregistration');
            if (listOfDirectorsMessage != '') {
                $('#list_of_directors_for_wmregistration').focus();
                validationMessageShow('wmregistration-list_of_directors_for_wmregistration', listOfDirectorsMessage);
                return false;
            }
        }

        if ($('#code_certificate_container_for_wmregistration').is(':visible')) {
            var codeCertificate = $('#code_certificate_for_wmregistration').val();
            if (codeCertificate == '') {
                $('#code_certificate_for_wmregistration').focus();
                validationMessageShow('wmregistration-code_certificate_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var codeCertificateMessage = pdffileUploadValidation('code_certificate_for_wmregistration');
            if (codeCertificateMessage != '') {
                $('#code_certificate_for_wmregistration').focus();
                validationMessageShow('wmregistration-code_certificate_for_wmregistration', codeCertificateMessage);
                return false;
            }
        }

        if ($('#seal_and_stamp_container_for_wmregistration').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_wmregistration').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_wmregistration').focus();
                validationMessageShow('wmregistration-seal_and_stamp_for_wmregistration', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_wmregistration');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_wmregistration').focus();
                validationMessageShow('wmregistration-seal_and_stamp_for_wmregistration', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_wmregistration') : $('#submit_btn_for_wmregistration');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var wmregistrationData = new FormData($('#wmregistration_form')[0]);
        wmregistrationData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        wmregistrationData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        wmregistrationData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'wmregistration/submit_wmregistration',
            data: wmregistrationData,
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
                validationMessageShow('wmregistration', textStatus.statusText);
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
                    validationMessageShow('wmregistration', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Wmregistration.router.navigate('wmregistration', {'trigger': true});
            }
        });
    },

    askForRemove: function (wmregistrationId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Wmregistration.listview.removeDocument(\'' + wmregistrationId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (wmregistrationId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wmregistration/remove_document',
            data: $.extend({}, {'wmregistration_id': wmregistrationId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('wmregistration', textStatus.statusText);
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
                    validationMessageShow('wmregistration', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#' + docId + '_name_container_for_wmregistration').hide();
                $('#' + docId + '_name_image_for_wmregistration').attr('src', '');
                $('#' + docId + '_container_for_wmregistration').show();
                $('#' + docId + '_for_wmregistration').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(wmregistrationProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#wmregistration_id_for_wmregistration_form1').val(wmregistrationId);
        $('#wmregistration_form1_pdf_form').submit();
        $('#wmregistration_id_for_wmregistration_form1').val('');
    },

    openUploadChallan: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + wmregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wmregistration/get_wmregistration_data_by_wmregistration_id',
            type: 'post',
            data: $.extend({}, {'wmregistration_id': wmregistrationId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var wmregistrationData = parseData.wmregistration_data;
                showPopup();
                if (wmregistrationData.payment_type == VALUE_ONE) {
                    wmregistrationData.utitle = 'Challan Copy';
                } else {
                    wmregistrationData.utitle = 'Payment Details';
                }
                wmregistrationData.module_type = VALUE_ONE;
                $('#popup_container').html(wmregistrationUploadChallanTemplate(wmregistrationData));
                loadFB(VALUE_ONE, parseData.fb_data, wmregistrationData.payment_type, wmregistrationData.show_remove_upload_btn, wmregistrationData.show_dropdown, wmregistrationData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'wmregistration_upload_challan', wmregistrationData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'wmregistration_upload_challan', 'uc', 'radio', '#fb', VALUE_ONE);
                if (wmregistrationData.challan != '') {
                    $('#challan_container_for_wmregistration_upload_challan').hide();
                    $('#challan_name_container_for_wmregistration_upload_challan').show();
                    $('#challan_name_href_for_wmregistration_upload_challan').attr('href', 'documents/wmregistration/' + wmregistrationData.challan);
                    $('#challan_name_for_wmregistration_upload_challan').html(wmregistrationData.challan);
                    $('#challan_remove_btn_for_wmregistration_upload_challan').attr('onclick', 'Wmregistration.listview.removeChallan("' + wmregistrationData.wmregistration_id + '")');
                }
            }
        });
    },
    removeChallan: function (wmregistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wmregistration/remove_challan',
            data: $.extend({}, {'wmregistration_id': wmregistrationId}, getTokenData()),
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
                validationMessageShow('wmregistration-uc', textStatus.statusText);
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
                    validationMessageShow('wmregistration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-wmregistration-uc').html(parseData.message);
                removeDocument('challan', 'wmregistration_upload_challan');
                $('#status_' + wmregistrationId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-wmregistration-uc').html('');
        validationMessageHide();
        var wmregistrationId = $('#wmregistration_id_for_wmregistration_upload_challan').val();
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_wmregistration_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_wmregistration_upload_challan_1').focus();
            validationMessageShow('wmregistration-uc-payment_type_for_wmregistration_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_wmregistration_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_wmregistration_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_wmregistration_upload_challan').focus();
                validationMessageShow('wmregistration-uc-challan_for_wmregistration_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_wmregistration_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_wmregistration_upload_challan').focus();
                validationMessageShow('wmregistration-uc-challan_for_wmregistration_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_ONE, 'wmregistration-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_wmregistration_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#wmregistration_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'wmregistration/upload_challan',
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
                validationMessageShow('wmregistration-uc', textStatus.statusText);
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
                    validationMessageShow('wmregistration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + wmregistrationId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + wmregistrationId).show();
                }
                $('#total_fees_' + wmregistrationId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_wmregistration_' + wmregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wmregistration/get_wmregistration_data_by_wmregistration_id',
            type: 'post',
            data: $.extend({}, {'wmregistration_id': wmregistrationId}, getTokenData()),
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
                var wmregistrationData = parseData.wmregistration_data;
                showPopup();
                $('#popup_container').html(wmregistrationApproveTemplate(wmregistrationData));
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
        var formData = $('#approve_wmregistration_form').serializeFormJSON();
        if (!formData.wmregistration_id_for_wmregistration_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_wmregistration_approve) {
            $('#registration_number_for_wmregistration_approve').focus();
            validationMessageShow('wmregistration-approve-registration_number_for_wmregistration_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_wmregistration_approve) {
            $('#valid_upto_for_wmregistration_approve').focus();
            validationMessageShow('wmregistration-approve-valid_upto_for_wmregistration_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_wmregistration_approve) {
            $('#remarks_for_wmregistration_approve').focus();
            validationMessageShow('wmregistration-approve-remarks_for_wmregistration_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wmregistration/approve_application',
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
                validationMessageShow('wmregistration-approve', textStatus.statusText);
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
                    validationMessageShow('wmregistration-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.wmregistration_id_for_wmregistration_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.wmregistration_id_for_wmregistration_approve).remove();
                $('#approve_btn_for_app_' + formData.wmregistration_id_for_wmregistration_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.wmregistration_id_for_wmregistration_approve).show();
                $('#so_status_' + formData.wmregistration_id_for_wmregistration_approve).html(dateTimeDays(formData.wmregistration_id_for_wmregistration_approve, parseData, VALUE_ONE));
            }
        });
    },
    askForRejectApplication: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_wmregistration_' + wmregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wmregistration/get_wmregistration_data_by_wmregistration_id',
            type: 'post',
            data: $.extend({}, {'wmregistration_id': wmregistrationId}, getTokenData()),
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
                var wmregistrationData = parseData.wmregistration_data;
                showPopup();
                $('#popup_container').html(wmregistrationRejectTemplate(wmregistrationData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_wmregistration_form').serializeFormJSON();
        if (!formData.wmregistration_id_for_wmregistration_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_wmregistration_reject) {
            $('#remarks_for_wmregistration_reject').focus();
            validationMessageShow('wmregistration-reject-remarks_for_wmregistration_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'wmregistration/reject_application',
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
                validationMessageShow('wmregistration-reject', textStatus.statusText);
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
                    validationMessageShow('wmregistration-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.wmregistration_id_for_wmregistration_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.wmregistration_id_for_wmregistration_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.wmregistration_id_for_wmregistration_reject).remove();
                $('#reject_btn_for_app_' + formData.wmregistration_id_for_wmregistration_reject).remove();
                $('#approve_btn_for_app_' + formData.wmregistration_id_for_wmregistration_reject).remove();
                $('#so_status_' + formData.wmregistration_id_for_wmregistration_reject).html(dateTimeDays(formData.wmregistration_id_for_wmregistration_reject, parseData, VALUE_ONE));
            }
        });
    },
    generateCertificate: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#wmregistration_id_for_certificate').val(wmregistrationId);
        $('#wmregistration_certificate_pdf_form').submit();
        $('#wmregistration_id_for_certificate').val('');
    },
    getQueryData: function (wmregistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!wmregistrationId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_ONE;
        templateData.module_id = wmregistrationId;
        var btnObj = $('#query_btn_for_wm_' + wmregistrationId);
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
                tmpData.application_number = regNoRenderer(VALUE_ONE, moduleData.wmregistration_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_ONE;
                tmpData.module_id = wmregistrationId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (wmregistrationId) {
        if (!wmregistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + wmregistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'wmregistration/get_wmregistration_data_by_wmregistration_id',
            type: 'post',
            data: $.extend({}, {'wmregistration_id': wmregistrationId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var wmregistrationData = parseData.wmregistration_data;
                showPopup();
                if (wmregistrationData.payment_type == VALUE_ONE || wmregistrationData.payment_type == VALUE_THREE) {
                    wmregistrationData.user_payment_type_text = paymentTypeArray[wmregistrationData.payment_type];
                } else {
                    wmregistrationData.user_payment_type_text = userPaymentTypeArray[wmregistrationData.user_payment_type] ? userPaymentTypeArray[wmregistrationData.user_payment_type] : '';
                }
                if (wmregistrationData.payment_type == VALUE_ONE) {
                    wmregistrationData.utitle = 'Fees Paid Challan Copy';
                } else if (wmregistrationData.payment_type == VALUE_TWO && wmregistrationData.user_payment_type == VALUE_ONE) {
                    wmregistrationData.utitle = 'Demand Draft (DD) Copy';
                }
                wmregistrationData.module_type = VALUE_ONE;
                $('#popup_container').html(wmregistrationViewPaymentTemplate(wmregistrationData));
                loadFB(VALUE_ONE, parseData.fb_data, wmregistrationData.payment_type);
                loadPH(VALUE_ONE, wmregistrationData.wmregistration_id, parseData.ph_data);
                if (wmregistrationData.payment_type == VALUE_ONE || (wmregistrationData.payment_type == VALUE_TWO && wmregistrationData.user_payment_type == VALUE_ONE)) {
                    if (wmregistrationData.fees_paid_challan != '') {
                        $('#vp_container_for_wmregistration').show();
                        $('#fees_paid_challan_name_href_for_wmregistration').attr('href', WMREG_DOC_PATH + wmregistrationData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_wmregistration').html(wmregistrationData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
