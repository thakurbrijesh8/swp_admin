var tourismeventListTemplate = Handlebars.compile($('#tourismevent_list_template').html());
var tourismeventTableTemplate = Handlebars.compile($('#tourismevent_table_template').html());
var tourismeventActionTemplate = Handlebars.compile($('#tourismevent_action_template').html());
var tourismeventFormTemplate = Handlebars.compile($('#tourismevent_form_template').html());
var tourismeventViewTemplate = Handlebars.compile($('#tourismevent_view_template').html());
var tourismeventApproveTemplate = Handlebars.compile($('#tourismevent_approve_template').html());
var tourismeventRejectTemplate = Handlebars.compile($('#tourismevent_reject_template').html());

var tempPersonCnt = 1;

var Tourismevent = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Tourismevent.Router = Backbone.Router.extend({
    routes: {
        'tourismevent': 'renderList',
        'tourismevent_form': 'renderListForForm',
        'edit_tourismevent_form': 'renderList',
        'view_tourismevent_form': 'renderList',
    },
    renderList: function () {
        Tourismevent.listview.listPage();
    },
    renderListForForm: function () {
        Tourismevent.listview.listPageTourismeventForm();
    }
});
Tourismevent.listView = Backbone.View.extend({
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
        addClass('tourismevent', 'active');
        Tourismevent.router.navigate('tourismevent');
        var templateData = {};
        this.$el.html(tourismeventListTemplate(templateData));
        this.loadTourismeventData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageTourismeventForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        this.$el.html(tourismeventListTemplate);
        this.newTourismeventForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return tourismeventActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_reject_btn = '';
        } else {
            rowData.show_reject_btn = 'display: none;';
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_approve_btn = '';
        } else {
            rowData.show_approve_btn = 'display: none;';
        }
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return tourismeventActionTemplate(rowData);
    },
    loadTourismeventData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_person + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.name_of_event;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTYFOUR, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYFOUR);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['tourismevent_data'], function (index, objData) {
                json['tourismevent_data'][index]['query_movement_string'] = qmData[objData.tourismevent_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.tourismevent_id] + '</table>') : '-';
            });
            return json['tourismevent_data'];
        };
        var that = this;
        showTableContainer('tourismevent');
        Tourismevent.router.navigate('tourismevent');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Tourismevent.listview.loadTourismeventData();');
        $('#tourismevent_datatable_container').html(tourismeventTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_tourismevent_list', false);
        allowOnlyIntegerValue('mobile_number_for_tourismevent_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_tourismevent_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_tourismevent_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_tourismevent_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_tourismevent_list', false);
        $('#district_for_tourismevent_list').val(searchData.search_district);
        $('#status_for_tourismevent_list').val(searchData.search_status);
        $('#app_timing_for_tourismevent_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_tourismevent_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_tourismevent_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_tourismevent_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_tourismevent_list').attr('disabled', 'disabled');
        }
        tourismeventDataTable = $('#tourismevent_datatable').DataTable({
            ajax: {url: 'tourismevent/get_tourismevent_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'tourismevent_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'tourismevent_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'tourismevent_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'tourismevent_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //   } 
        $('#tourismevent_datatable_filter').remove();
        $('#tourismevent_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = tourismeventDataTable.row(tr);

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
    newTourismeventForm: function (isEdit, parseData) {
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
            var formData = parseData.tourismevent_data;
            Tourismevent.router.navigate('edit_tourismevent_form');
        } else {
            var formData = {};
            Tourismevent.router.navigate('tourismevent_form');
        }
        var templateData = {};
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.tourismevent_data = parseData.tourismevent_data;
        templateData.date_of_event = dateTo_DD_MM_YYYY(formData.date_of_event);
        showFormContainer('tourismevent');
        $('#tourismevent_form_container').html(tourismeventFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.proposal_details_document != '') {
                $('#proposal_details_document_container_for_tourismevent').hide();
                $('#proposal_details_document_name_image_for_tourismevent').attr('src', TOURISMEVENT_DOC_PATH + formData.proposal_details_document);
                $('#proposal_details_document_name_container_for_tourismevent').show();
                $('#proposal_details_document_download').attr("href", TOURISMEVENT_DOC_PATH + formData.proposal_details_document);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_tourismevent').hide();
                $('#seal_and_stamp_name_image_for_tourismevent').attr('src', TOURISMEVENT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_tourismevent').show();
                $('#seal_and_stamp_download').attr("href", TOURISMEVENT_DOC_PATH + formData.signature);
            }

        }
        generateSelect2();
        datePicker();
        timePicker();
        $('#tourismevent_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitTourismevent($('#submit_btn_for_tourismevent'));
            }
        });
    },
    editOrViewTourismevent: function (btnObj, tourismeventId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!tourismeventId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tourismevent/get_tourismevent_data_by_id',
            type: 'post',
            data: $.extend({}, {'tourismevent_id': tourismeventId}, getTokenData()),
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
                    that.newTourismeventForm(isEdit, parseData);
                } else {
                    that.viewTourismeventForm(parseData);
                }
            }
        });
    },
    viewTourismeventForm: function (parseData) {
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
        var formData = parseData.tourismevent_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.date_of_event = dateTo_DD_MM_YYYY(formData.date_of_event);
        Tourismevent.router.navigate('view_tourismevent_form');
        showFormContainer('tourismevent');
        $('#tourismevent_form_container').html(tourismeventViewTemplate(formData));
//        $('#tourismevent_form_and_datatable_container').html(tourismeventViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        if (formData.proposal_details_document != '') {
            $('#proposal_details_document_container_for_tourismevent').hide();
            $('#proposal_details_document_name_image_for_tourismevent').attr('src', TOURISMEVENT_DOC_PATH + formData.proposal_details_document);
            $('#proposal_details_document_name_container_for_tourismevent').show();
            $('#proposal_details_document_download').attr("href", TOURISMEVENT_DOC_PATH + formData.proposal_details_document);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_tourismevent').hide();
            $('#seal_and_stamp_name_image_for_tourismevent').attr('src', TOURISMEVENT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_tourismevent').show();
            $('#seal_and_stamp_download').attr("href", TOURISMEVENT_DOC_PATH + formData.signature);
        }
    },
    checkValidationForTourismevent: function (tourismeventData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        if (!tourismeventData.name_of_person) {
            return getBasicMessageAndFieldJSONArray('name_of_person', personNameValidationMessage);
        }
        if (!tourismeventData.location_of_event) {
            return getBasicMessageAndFieldJSONArray('location_of_event', locationOfEventValidationMessage);
        }
        if (!tourismeventData.date_of_event) {
            return getBasicMessageAndFieldJSONArray('date_of_event', dateValidationMessage);
        }
        if (!tourismeventData.time_of_event) {
            return getBasicMessageAndFieldJSONArray('time_of_event', timeOfEventValidationMessage);
        }
        if (!tourismeventData.duration_of_event) {
            return getBasicMessageAndFieldJSONArray('duration_of_event', durationOfEventValidationMessage);
        }
        if (!tourismeventData.mob_no) {
            return getBasicMessageAndFieldJSONArray('mob_no', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(tourismeventData.mob_no);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mob_no', invalidMobileValidationMessage);
        }
        if (!tourismeventData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        return '';
    },
    askForSubmitTourismevent: function (moduleType) {
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
        var yesEvent = 'Tourismevent.listview.submitTourismevent(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitTourismevent: function (moduleType) {
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
        var tourismeventData = $('#tourismevent_form').serializeFormJSON();
        var validationData = that.checkValidationForTourismevent(tourismeventData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('tourismevent-' + validationData.field, validationData.message);
            return false;
        }

//        if ($('#seal_and_stamp_container_for_tourismevent').is(':visible')) {
//            var sealAndStamp = $('#seal_and_stamp_for_tourismevent').val();
//            if (sealAndStamp == '') {
//                $('#seal_and_stamp_for_tourismevent').focus();
//                validationMessageShow('tourismevent-seal_and_stamp_for_tourismevent', uploadDocumentValidationMessage);
//                return false;
//            }
//            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_tourismevent');
//            if (sealAndStampMessage != '') {
//                $('#seal_and_stamp_for_tourismevent').focus();
//                validationMessageShow('tourismevent-seal_and_stamp_for_tourismevent', sealAndStampMessage);
//                return false;
//            }
//        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_tourismevent') : $('#submit_btn_for_tourismevent');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var tourismeventData = new FormData($('#tourismevent_form')[0]);
        tourismeventData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        tourismeventData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'tourismevent/submit_tourismevent',
            data: tourismeventData,
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
                validationMessageShow('tourismevent', textStatus.statusText);
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
                    validationMessageShow('tourismevent', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Tourismevent.router.navigate('tourismevent', {'trigger': true});
            }
        });
    },

    askForRemove: function (tourismeventId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Tourismevent.listview.removeDocument(\'' + tourismeventId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (tourismeventId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'tourismevent/remove_document',
            data: $.extend({}, {'tourismevent_id': tourismeventId}, getTokenData()),
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
                validationMessageShow('tourismevent', textStatus.statusText);
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
                    validationMessageShow('tourismevent', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_tourismevent').hide();
                $('#seal_and_stamp_name_image_for_tourismevent').attr('src', '');
                $('#seal_and_stamp_container_for_tourismevent').show();
                $('#seal_and_stamp_for_tourismevent').val('');
            }
        });
    },
    generateForm: function (tourismeventId) {
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#tourismevent_id_for_tourismevent_form').val(tourismeventId);
        $('#tourismevent_form_pdf_form').submit();
        $('#tourismevent_id_for_tourismevent_form').val('');
    },
    askForApproveApplication: function (tourismeventId) {
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_tourismevent_' + tourismeventId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tourismevent/get_tourismevent_data_by_tourismevent_id',
            type: 'post',
            data: $.extend({}, {'tourismevent_id': tourismeventId}, getTokenData()),
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
                var tourismeventData = parseData.tourismevent_data;
                showPopup();
                $('#popup_container').html(tourismeventApproveTemplate(tourismeventData));
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
        var formData = $('#approve_tourismevent_form').serializeFormJSON();
        if (!formData.tourismevent_id_for_tourismevent_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_tourismevent_approve) {
            $('#registration_number_for_tourismevent_approve').focus();
            validationMessageShow('tourismevent-approve-registration_number_for_tourismevent_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_tourismevent_approve) {
            $('#valid_upto_for_tourismevent_approve').focus();
            validationMessageShow('tourismevent-approve-valid_upto_for_tourismevent_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_tourismevent_approve) {
            $('#remarks_for_tourismevent_approve').focus();
            validationMessageShow('tourismevent-approve-remarks_for_tourismevent_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'tourismevent/approve_application',
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
                validationMessageShow('tourismevent-approve', textStatus.statusText);
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
                    validationMessageShow('tourismevent-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.tourismevent_id_for_tourismevent_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.tourismevent_id_for_tourismevent_approve).remove();
                $('#approve_btn_for_app_' + formData.tourismevent_id_for_tourismevent_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.tourismevent_id_for_tourismevent_approve).show();
                $('#so_status_' + formData.tourismevent_id_for_tourismevent_approve).html(dateTimeDays(formData.tourismevent_id_for_tourismevent_approve, parseData, VALUE_TWENTYFOUR));
            }
        });
    },
    askForRejectApplication: function (tourismeventId) {
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_tourismevent_' + tourismeventId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tourismevent/get_tourismevent_data_by_tourismevent_id',
            type: 'post',
            data: $.extend({}, {'tourismevent_id': tourismeventId}, getTokenData()),
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
                var tourismeventData = parseData.tourismevent_data;
                showPopup();
                $('#popup_container').html(tourismeventRejectTemplate(tourismeventData));
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
        var formData = $('#reject_tourismevent_form').serializeFormJSON();
        if (!formData.tourismevent_id_for_tourismevent_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_tourismevent_reject) {
            $('#remarks_for_tourismevent_reject').focus();
            validationMessageShow('tourismevent-reject-remarks_for_tourismevent_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'tourismevent/reject_application',
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
                validationMessageShow('tourismevent-reject', textStatus.statusText);
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
                    validationMessageShow('tourismevent-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.tourismevent_id_for_tourismevent_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.tourismevent_id_for_tourismevent_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.tourismevent_id_for_tourismevent_reject).remove();
                $('#reject_btn_for_tourismevent_' + formData.tourismevent_id_for_tourismevent_reject).remove();
                $('#approve_btn_for_tourismevent_' + formData.tourismevent_id_for_tourismevent_reject).remove();
                $('#so_status_' + formData.tourismevent_id_for_tourismevent_reject).html(dateTimeDays(formData.tourismevent_id_for_tourismevent_reject, parseData, VALUE_TWENTYFOUR));
                that.loadTourismeventData();
            }
        });
    },
    generateCertificate: function (tourismeventId) {
        if (!tourismeventId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#tourismevent_id_for_certificate').val(tourismeventId);
        $('#tourismevent_certificate_pdf_form').submit();
        $('#tourismevent_id_for_certificate').val('');
    },
    addMultipleAgent: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#agent_info_container').append(agentInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeAgentInfo: function (perCnt) {
        $('#agent_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    getQueryData: function (tourismeventId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!tourismeventId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYFOUR;
        templateData.module_id = tourismeventId;
        var btnObj = $('#query_btn_for_tourismevent_' + tourismeventId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYFOUR, moduleData.tourismevent_id);
                tmpData.applicant_name = moduleData.name_of_person;
                tmpData.title = 'Tourism Event';
                tmpData.module_type = VALUE_TWENTYFOUR;
                tmpData.module_id = tourismeventId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
});
