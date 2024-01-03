var travelagentListTemplate = Handlebars.compile($('#travelagent_list_template').html());
var travelagentTableTemplate = Handlebars.compile($('#travelagent_table_template').html());
var travelagentActionTemplate = Handlebars.compile($('#travelagent_action_template').html());
var travelagentFormTemplate = Handlebars.compile($('#travelagent_form_template').html());
var travelagentViewTemplate = Handlebars.compile($('#travelagent_view_template').html());
var travelagentUploadChallanTemplate = Handlebars.compile($('#travelagent_upload_challan_template').html());
var travelagentApproveTemplate = Handlebars.compile($('#travelagent_approve_template').html());
var travelagentRejectTemplate = Handlebars.compile($('#travelagent_reject_template').html());
var travelagentViewPaymentTemplate = Handlebars.compile($('#travelagent_view_payment_template').html());

var tempPersonCnt = 1;

var TravelAgent = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
TravelAgent.Router = Backbone.Router.extend({
    routes: {
        'travelagent': 'renderList',
        'travelagent_form': 'renderListForForm',
        'edit_travelagent_form': 'renderList',
        'view_travelagent_form': 'renderList',
    },
    renderList: function () {
        TravelAgent.listview.listPage();
    },
    renderListForForm: function () {
        TravelAgent.listview.listPageTravelAgentForm();
    }
});
TravelAgent.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        addClass('travelagent', 'active');
        TravelAgent.router.navigate('travelagent');
        var templateData = {};
        this.$el.html(travelagentListTemplate(templateData));
        this.loadTravelAgentData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageTravelAgentForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        this.$el.html(travelagentListTemplate);
        this.newTravelAgentForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return travelagentActionTemplate(rowData);
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
        rowData.module_type = VALUE_NINETEEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return travelagentActionTemplate(rowData);
    },
    loadTravelAgentData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_person + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.name_of_travel_agency;
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
                return regNoRenderer(VALUE_NINETEEN, data) + '<hr>' + (talukaArray[full.area_of_agency] ? talukaArray[full.area_of_agency] : '');
            else
                return regNoRenderer(VALUE_NINETEEN, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_NINETEEN);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['travelagent_data'], function (index, objData) {
                json['travelagent_data'][index]['query_movement_string'] = qmData[objData.travelagent_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.travelagent_id] + '</table>') : '-';
            });
            return json['travelagent_data'];
        };
        var that = this;
        showTableContainer('travelagent');
        TravelAgent.router.navigate('travelagent');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'TravelAgent.listview.loadTravelAgentData();');
        $('#travelagent_datatable_container').html(travelagentTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_travelagent_list', false);
        allowOnlyIntegerValue('mobile_number_for_travelagent_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_travelagent_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_travelagent_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_travelagent_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_travelagent_list', false);

        $('#district_for_travelagent_list').val(searchData.search_district);
        $('#status_for_travelagent_list').val(searchData.search_status);
        $('#app_timing_for_travelagent_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_travelagent_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_travelagent_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_travelagent_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_travelagent_list').attr('disabled', 'disabled');
        }
        travelagentDataTable = $('#travelagent_datatable').DataTable({
            ajax: {url: 'travelagent/get_travelagent_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'travelagent_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'travelagent_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'travelagent_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'travelagent_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#travelagent_datatable_filter').remove();
        $('#travelagent_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = travelagentDataTable.row(tr);

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
    newTravelAgentForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.travelagent_data;
            TravelAgent.router.navigate('edit_travelagent_form');
        } else {
            var formData = {};
            TravelAgent.router.navigate('travelagent_form');
        }
        var templateData = {};
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.TRAVEL_AGENCY_FEES = TRAVEL_AGENCY_FEES;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.travelagent_data = parseData.travelagent_data;
        showFormContainer('travelagent');
        $('#travelagent_form_container').html(travelagentFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'area_of_agency');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#area_of_agency').val(formData.area_of_agency);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.copy_of_registration != '') {
                $('#copy_of_registration_container_for_travelagent').hide();
                $('#copy_of_registration_name_image_for_travelagent').attr('src', TRAVELAGENT_DOC_PATH + formData.copy_of_registration);
                $('#copy_of_registration_name_container_for_travelagent').show();
                $('#copy_of_registration_download').attr("href", TRAVELAGENT_DOC_PATH + formData.copy_of_registration);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_travelagent').hide();
                $('#seal_and_stamp_name_image_for_travelagent').attr('src', TRAVELAGENT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_travelagent').show();
                $('#seal_and_stamp_download').attr("href", TRAVELAGENT_DOC_PATH + formData.signature);
            }

        }
        generateSelect2();
        datePicker();
        $('#travelagent_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitTravelAgent($('#submit_btn_for_travelagent'));
            }
        });
    },
    editOrViewTravelAgent: function (btnObj, travelagentId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!travelagentId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent/get_travelagent_data_by_id',
            type: 'post',
            data: $.extend({}, {'travelagent_id': travelagentId}, getTokenData()),
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
                    that.newTravelAgentForm(isEdit, parseData);
                } else {
                    that.viewTravelAgentForm(parseData);
                }
            }
        });
    },
    viewTravelAgentForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.travelagent_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.TRAVEL_AGENCY_FEES = TRAVEL_AGENCY_FEES;
        TravelAgent.router.navigate('view_travelagent_form');
        showFormContainer('travelagent');
        $('#travelagent_form_container').html(travelagentViewTemplate(formData));
        //$('#travelagent_form_and_datatable_container').html(travelagentViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'area_of_agency');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#area_of_agency').val(formData.area_of_agency);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        if (formData.copy_of_registration != '') {
            $('#copy_of_registration_container_for_travelagent').hide();
            $('#copy_of_registration_name_image_for_travelagent').attr('src', TRAVELAGENT_DOC_PATH + formData.copy_of_registration);
            $('#copy_of_registration_name_container_for_travelagent').show();
            $('#copy_of_registration_download').attr("href", TRAVELAGENT_DOC_PATH + formData.copy_of_registration);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_travelagent').hide();
            $('#seal_and_stamp_name_image_for_travelagent').attr('src', TRAVELAGENT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_travelagent').show();
            $('#seal_and_stamp_download').attr("href", TRAVELAGENT_DOC_PATH + formData.signature);
        }
    },
    checkValidationForTravelAgent: function (travelagentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        if (!travelagentData.name_of_person) {
            return getBasicMessageAndFieldJSONArray('name_of_person', personNameValidationMessage);
        }
        if (!travelagentData.name_of_travel_agency) {
            return getBasicMessageAndFieldJSONArray('name_of_travel_agency', travelAgencyNameValidationMessage);
        }
        if (!travelagentData.name_of_travel_agency) {
            return getBasicMessageAndFieldJSONArray('name_of_travel_agency', travelAgencyNameValidationMessage);
        }
        if (!travelagentData.address_of_agency) {
            return getBasicMessageAndFieldJSONArray('address_of_agency', addressOfAgencyValidationMessage);
        }
        if (!travelagentData.area_of_agency) {
            return getBasicMessageAndFieldJSONArray('area_of_agency', areaOfAgencyValidationMessage);
        }
        if (!travelagentData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!travelagentData.mob_no) {
            return getBasicMessageAndFieldJSONArray('mob_no', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(travelagentData.mob_no);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mob_no', invalidMobileValidationMessage);
        }

        return '';
    },
    askForSubmitTravelAgent: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'TravelAgent.listview.submitTravelAgent(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitTravelAgent: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var travelagentData = $('#travelagent_form').serializeFormJSON();
        var validationData = that.checkValidationForTravelAgent(travelagentData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('travelagent-' + validationData.field, validationData.message);
            return false;
        }

//        if ($('#seal_and_stamp_container_for_travelagent').is(':visible')) {
//            var sealAndStamp = $('#seal_and_stamp_for_travelagent').val();
//            if (sealAndStamp == '') {
//                $('#seal_and_stamp_for_travelagent').focus();
//                validationMessageShow('travelagent-seal_and_stamp_for_travelagent', uploadDocumentValidationMessage);
//                return false;
//            }
//            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_travelagent');
//            if (sealAndStampMessage != '') {
//                $('#seal_and_stamp_for_travelagent').focus();
//                validationMessageShow('travelagent-seal_and_stamp_for_travelagent', sealAndStampMessage);
//                return false;
//            }
//        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_travelagent') : $('#submit_btn_for_travelagent');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var travelagentData = new FormData($('#travelagent_form')[0]);
        travelagentData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        travelagentData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'travelagent/submit_travelagent',
            data: travelagentData,
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
                validationMessageShow('travelagent', textStatus.statusText);
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
                    validationMessageShow('travelagent', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                TravelAgent.router.navigate('travelagent', {'trigger': true});
            }
        });
    },

    askForRemove: function (travelagentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'TravelAgent.listview.removeDocument(\'' + travelagentId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (travelagentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent/remove_document',
            data: $.extend({}, {'travelagent_id': travelagentId}, getTokenData()),
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
                validationMessageShow('travelagent', textStatus.statusText);
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
                    validationMessageShow('travelagent', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_travelagent').hide();
                $('#seal_and_stamp_name_image_for_travelagent').attr('src', '');
                $('#seal_and_stamp_container_for_travelagent').show();
                $('#seal_and_stamp_for_travelagent').val('');
            }
        });
    },
    generateForm: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#travelagent_id_for_travelagent_form').val(travelagentId);
        $('#travelagent_form_pdf_form').submit();
        $('#travelagent_id_for_travelagent_form').val('');
    },

    openUploadChallan: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + travelagentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent/get_travelagent_data_by_travelagent_id',
            type: 'post',
            data: $.extend({}, {'travelagent_id': travelagentId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var travelagentData = parseData.travelagent_data;
                showPopup();
                if (travelagentData.status != VALUE_FOUR && travelagentData.status != VALUE_FIVE && travelagentData.status != VALUE_SIX && travelagentData.status != VALUE_SEVEN && travelagentData.status != VALUE_EIGHT) {
                    travelagentData.show_remove_upload_btn = true;
                }
                if (travelagentData.payment_type == VALUE_ONE) {
                    travelagentData.utitle = 'Challan Copy';
                } else {
                    travelagentData.utitle = 'Payment Details';
                }
                travelagentData.module_type = VALUE_NINETEEN;
                $('#popup_container').html(travelagentUploadChallanTemplate(travelagentData));
                loadFB(VALUE_NINETEEN, parseData.fb_data, travelagentData.payment_type, travelagentData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'travelagent_upload_challan', travelagentData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'travelagent_upload_challan', 'uc', 'radio', '#fb', VALUE_NINETEEN);
                if (travelagentData.challan != '') {
                    $('#challan_container_for_travelagent_upload_challan').hide();
                    $('#challan_name_container_for_travelagent_upload_challan').show();
                    $('#challan_name_href_for_travelagent_upload_challan').attr('href', 'documents/travelagent/' + travelagentData.challan);
                    $('#challan_name_for_travelagent_upload_challan').html(travelagentData.challan);
                    $('#challan_remove_btn_for_travelagent_upload_challan').attr('onclick', 'TravelAgent.listview.removeChallan("' + travelagentData.travelagent_id + '")');
                }
            }
        });
    },
    removeChallan: function (travelagentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent/remove_challan',
            data: $.extend({}, {'travelagent_id': travelagentId}, getTokenData()),
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
                validationMessageShow('travelagent-uc', textStatus.statusText);
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
                    validationMessageShow('travelagent-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-travelagent-uc').html(parseData.message);
                removeDocument('challan', 'travelagent_upload_challan');
                $('#status_' + travelagentId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-travelagent-uc').html('');
        validationMessageHide();
        var travelagentId = $('#travelagent_id_for_travelagent_upload_challan').val();
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_travelagent_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_travelagent_upload_challan_1').focus();
            validationMessageShow('travelagent-uc-payment_type_for_travelagent_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_travelagent_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_travelagent_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_travelagent_upload_challan').focus();
                validationMessageShow('travelagent-uc-challan_for_travelagent_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_travelagent_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_travelagent_upload_challan').focus();
                validationMessageShow('travelagent-uc-challan_for_travelagent_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_NINETEEN, 'travelagent-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_travelagent_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#travelagent_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent/upload_challan',
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
                validationMessageShow('travelagent-uc', textStatus.statusText);
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
                    validationMessageShow('travelagent-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + travelagentId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + travelagentId).show();
                }
                $('#total_fees_' + travelagentId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + travelagentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent/get_travelagent_data_by_travelagent_id',
            type: 'post',
            data: $.extend({}, {'travelagent_id': travelagentId}, getTokenData()),
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
                var travelagentData = parseData.travelagent_data;
                showPopup();
                $('#popup_container').html(travelagentApproveTemplate(travelagentData));
                datePicker();
            }
        });
    },
    approveApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var formData = $('#approve_travelagent_form').serializeFormJSON();
        if (!formData.travelagent_id_for_travelagent_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_travelagent_approve) {
            $('#registration_number_for_travelagent_approve').focus();
            validationMessageShow('travelagent-approve-registration_number_for_travelagent_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_travelagent_approve) {
            $('#valid_upto_for_travelagent_approve').focus();
            validationMessageShow('travelagent-approve-valid_upto_for_travelagent_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_travelagent_approve) {
            $('#remarks_for_travelagent_approve').focus();
            validationMessageShow('travelagent-approve-remarks_for_travelagent_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent/approve_application',
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
                validationMessageShow('travelagent-approve', textStatus.statusText);
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
                    validationMessageShow('travelagent-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.travelagent_id_for_travelagent_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.travelagent_id_for_travelagent_approve).remove();
                $('#approve_btn_for_app_' + formData.travelagent_id_for_travelagent_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.travelagent_id_for_travelagent_approve).show();
                $('#so_status_' + formData.travelagent_id_for_travelagent_approve).html(dateTimeDays(formData.travelagent_id_for_travelagent_approve, parseData, VALUE_NINETEEN));
            }
        });
    },
    askForRejectApplication: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + travelagentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent/get_travelagent_data_by_travelagent_id',
            type: 'post',
            data: $.extend({}, {'travelagent_id': travelagentId}, getTokenData()),
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
                var travelagentData = parseData.travelagent_data;
                showPopup();
                $('#popup_container').html(travelagentRejectTemplate(travelagentData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var formData = $('#reject_travelagent_form').serializeFormJSON();
        if (!formData.travelagent_id_for_travelagent_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_travelagent_reject) {
            $('#remarks_for_travelagent_reject').focus();
            validationMessageShow('travelagent-reject-remarks_for_travelagent_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent/reject_application',
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
                validationMessageShow('travelagent-reject', textStatus.statusText);
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
                    validationMessageShow('travelagent-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.travelagent_id_for_travelagent_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.travelagent_id_for_travelagent_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.travelagent_id_for_travelagent_reject).remove();
                $('#reject_btn_for_app_' + formData.travelagent_id_for_travelagent_reject).remove();
                $('#approve_btn_for_app_' + formData.travelagent_id_for_travelagent_reject).remove();
                $('#so_status_' + formData.travelagent_id_for_travelagent_reject).html(dateTimeDays(formData.travelagent_id_for_travelagent_reject, parseData, VALUE_NINETEEN));
            }
        });
    },
    generateCertificate: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#travelagent_id_for_certificate').val(travelagentId);
        $('#travelagent_certificate_pdf_form').submit();
        $('#travelagent_id_for_certificate').val('');
    },
    getQueryData: function (travelagentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!travelagentId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_NINETEEN;
        templateData.module_id = travelagentId;
        var btnObj = $('#query_btn_for_travelagent_' + travelagentId);
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
                tmpData.application_number = regNoRenderer(VALUE_NINETEEN, moduleData.travelagent_id);
                tmpData.applicant_name = moduleData.name_of_travel_agency;
                tmpData.title = 'Travel Agency Name';
                tmpData.module_type = VALUE_NINETEEN;
                tmpData.module_id = travelagentId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (travelagentId) {
        if (!travelagentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + travelagentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent/get_travelagent_data_by_travelagent_id',
            type: 'post',
            data: $.extend({}, {'travelagent_id': travelagentId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var travelagentData = parseData.travelagent_data;
                showPopup();
                if (travelagentData.payment_type == VALUE_ONE || travelagentData.payment_type == VALUE_THREE) {
                    travelagentData.user_payment_type_text = paymentTypeArray[travelagentData.payment_type];
                } else {
                    travelagentData.user_payment_type_text = userPaymentTypeArray[travelagentData.user_payment_type] ? userPaymentTypeArray[travelagentData.user_payment_type] : '';
                }
                if (travelagentData.payment_type == VALUE_ONE) {
                    travelagentData.utitle = 'Fees Paid Challan Copy';
                } else if (travelagentData.payment_type == VALUE_TWO && travelagentData.user_payment_type == VALUE_ONE) {
                    travelagentData.utitle = 'Demand Draft (DD) Copy';
                }
                travelagentData.module_type = VALUE_NINETEEN;
                $('#popup_container').html(travelagentViewPaymentTemplate(travelagentData));
                loadFB(VALUE_NINETEEN, parseData.fb_data, travelagentData.payment_type);
                loadPH(VALUE_NINETEEN, travelagentData.travelagent_id, parseData.ph_data);
                if (travelagentData.payment_type == VALUE_ONE || (travelagentData.payment_type == VALUE_TWO && travelagentData.user_payment_type == VALUE_ONE)) {
                    if (travelagentData.fees_paid_challan != '') {
                        $('#vp_container_for_travelagent').show();
                        $('#fees_paid_challan_name_href_for_travelagent').attr('href', TRAVELAGENT_DOC_PATH + travelagentData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_travelagent').html(travelagentData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
