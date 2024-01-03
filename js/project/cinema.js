var cinemaListTemplate = Handlebars.compile($('#cinema_list_template').html());
var cinemaTableTemplate = Handlebars.compile($('#cinema_table_template').html());
var cinemaActionTemplate = Handlebars.compile($('#cinema_action_template').html());
var cinemaFormTemplate = Handlebars.compile($('#cinema_form_template').html());
var cinemaViewTemplate = Handlebars.compile($('#cinema_view_template').html());
var cinemaUploadChallanTemplate = Handlebars.compile($('#cinema_upload_challan_template').html());
var cinemaApproveTemplate = Handlebars.compile($('#cinema_approve_template').html());
var cinemaRejectTemplate = Handlebars.compile($('#cinema_reject_template').html());
var cinemaViewPaymentTemplate = Handlebars.compile($('#cinema_view_payment_template').html());
var tempPersonCnt = 1;

var Cinema = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Cinema.Router = Backbone.Router.extend({
    routes: {
        'cinema': 'renderList',
        'cinema_form': 'renderListForForm',
        'edit_cinema_form': 'renderList',
        'view_cinema_form': 'renderList',
    },
    renderList: function () {
        Cinema.listview.listPage();
    },
    renderListForForm: function () {
        Cinema.listview.listPageCinemaForm();
    }
});
Cinema.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_case_of_building"]': 'hasCaseOfBuilding',
    },
    hasCaseOfBuilding: function (event) {
        var val = $('input[name=is_case_of_building]:checked').val();
        if (val == VALUE_ONE) {
            this.$('.building_details_div').show();
        } else {
            this.$('.building_details_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        addClass('cinema', 'active');
        Cinema.router.navigate('cinema');
        var templateData = {};
        this.$el.html(cinemaListTemplate(templateData));
        this.loadCinemaData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageCinemaForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        this.$el.html(cinemaListTemplate);
        this.newCinemaForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return cinemaActionTemplate(rowData);
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
        rowData.module_type = VALUE_EIGHT;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return cinemaActionTemplate(rowData);
    },
    loadCinemaData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.permanent_address;
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
                return regNoRenderer(VALUE_EIGHT, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_EIGHT, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_EIGHT);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['cinema_data'], function (index, objData) {
                json['cinema_data'][index]['query_movement_string'] = qmData[objData.cinema_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.cinema_id] + '</table>') : '-';
            });
            return json['cinema_data'];
        };
        var that = this;
        showTableContainer('cinema');
        Cinema.router.navigate('cinema');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Cinema.listview.loadCinemaData();');
        $('#cinema_datatable_container').html(cinemaTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_cinema_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_cinema_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_cinema_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_cinema_list', false);
        allowOnlyIntegerValue('mobile_number_for_cinema_list');
        //   if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_cinema_list', false);
        $('#district_for_cinema_list').val(searchData.search_district);
        $('#status_for_cinema_list').val(searchData.search_status);
        $('#app_timing_for_cinema_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_cinema_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_cinema_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_cinema_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_cinema_list').attr('disabled', 'disabled');
        }
        cinemaDataTable = $('#cinema_datatable').DataTable({
            ajax: {url: 'cinema/get_cinema_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'cinema_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'cinema_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'cinema_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'cinema_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  
        $('#cinema_datatable_filter').remove();
        $('#cinema_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = cinemaDataTable.row(tr);

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
    newCinemaForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.cinema_data;
            Cinema.router.navigate('edit_cinema_form');
        } else {
            var formData = {};
            Cinema.router.navigate('cinema_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.cinema_data = parseData.cinema_data;
        if (isEdit) {
            templateData.dob = dateTo_DD_MM_YYYY(templateData.cinema_data.dob);
        }
        showFormContainer('cinema');
        $('#cinema_form_container').html(cinemaFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.is_case_of_building == isChecked) {
                $('#is_case_of_building').attr('checked', 'checked');
                $('.building_details_div').show();
                if (formData.plan_of_building_document != '') {
                    $('#plan_of_building_document_container').hide();
                    $('#plan_of_building_document_name_image').attr('src', CINEMA_DOC_PATH + formData.plan_of_building_document);
                    $('#plan_of_building_document_name_container').show();
                    $('#plan_of_building_document_download').attr("href", CINEMA_DOC_PATH + formData.plan_of_building_document);
                }
                if (formData.character_licence_certificate != '') {
                    $('#character_licence_certificate_container').hide();
                    $('#character_licence_certificate_name_image').attr('src', CINEMA_DOC_PATH + formData.character_licence_certificate);
                    $('#character_licence_certificate_name_container').show();
                    $('#character_licence_certificate_download').attr("href", CINEMA_DOC_PATH + formData.character_licence_certificate);
                }
                if (formData.photo_state_copy != '') {
                    $('#photo_state_copy_container').hide();
                    $('#photo_state_copy_name_image').attr('src', CINEMA_DOC_PATH + formData.photo_state_copy);
                    $('#photo_state_copy_name_container').show();
                    $('#photo_state_copy_download').attr("href", CINEMA_DOC_PATH + formData.photo_state_copy);
                }
                if (formData.ownership_document != '') {
                    $('#ownership_document_container').hide();
                    $('#ownership_document_name_image').attr('src', CINEMA_DOC_PATH + formData.ownership_document);
                    $('#ownership_document_name_container').show();
                    $('#ownership_document_download').attr("href", CINEMA_DOC_PATH + formData.ownership_document);
                }
                if (formData.motor_vehicles_document != '') {
                    $('#motor_vehicles_document_container').hide();
                    $('#motor_vehicles_document_name_image').attr('src', CINEMA_DOC_PATH + formData.motor_vehicles_document);
                    $('#motor_vehicles_document_name_container').show();
                    $('#motor_vehicles_document_download').attr("href", CINEMA_DOC_PATH + formData.motor_vehicles_document);
                }
            }
            if (formData.business_trade_authority_license != '') {
                $('#business_trade_authority_license_container').hide();
                $('#business_trade_authority_license_name_image').attr('src', CINEMA_DOC_PATH + formData.business_trade_authority_license);
                $('#business_trade_authority_license_name_container').show();
                $('#business_trade_authority_license_download').attr("href", CINEMA_DOC_PATH + formData.business_trade_authority_license);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_cinema').hide();
                $('#seal_and_stamp_name_image_for_cinema').attr('src', CINEMA_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_cinema').show();
                $('#seal_and_stamp_download').attr("href", CINEMA_DOC_PATH + formData.signature);
            }
        }
        generateSelect2();
        datePicker();
        $('#cinema_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitCinema($('#submit_btn_for_cinema'));
            }
        });
    },
    editOrViewCinema: function (btnObj, cinemaId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!cinemaId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'cinema/get_cinema_data_by_id',
            type: 'post',
            data: $.extend({}, {'cinema_id': cinemaId}, getTokenData()),
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
                    that.newCinemaForm(isEdit, parseData);
                } else {
                    that.viewCinemaForm(parseData);
                }
            }
        });
    },
    viewCinemaForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.cinema_data;
        Cinema.router.navigate('view_cinema_form');
        formData.dob = dateTo_DD_MM_YYYY(formData.dob);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('cinema');
        $('#cinema_form_container').html(cinemaViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        if (formData.is_case_of_building == isChecked) {
            $('#is_case_of_building').attr('checked', 'checked');
            $('.building_details_div').show();
            if (formData.plan_of_building_document != '') {
                $('#plan_of_building_document_container').hide();
                $('#plan_of_building_document_name_image').attr('src', CINEMA_DOC_PATH + formData.plan_of_building_document);
                $('#plan_of_building_document_name_container').show();
                $('#plan_of_building_document_download').attr("href", CINEMA_DOC_PATH + formData.plan_of_building_document);
            }
            if (formData.character_licence_certificate != '') {
                $('#character_licence_certificate_container').hide();
                $('#character_licence_certificate_name_image').attr('src', CINEMA_DOC_PATH + formData.character_licence_certificate);
                $('#character_licence_certificate_name_container').show();
                $('#character_licence_certificate_download').attr("href", CINEMA_DOC_PATH + formData.character_licence_certificate);
            }
            if (formData.photo_state_copy != '') {
                $('#photo_state_copy_container').hide();
                $('#photo_state_copy_name_image').attr('src', CINEMA_DOC_PATH + formData.photo_state_copy);
                $('#photo_state_copy_name_container').show();
                $('#photo_state_copy_download').attr("href", CINEMA_DOC_PATH + formData.photo_state_copy);
            }
            if (formData.ownership_document != '') {
                $('#ownership_document_container').hide();
                $('#ownership_document_name_image').attr('src', CINEMA_DOC_PATH + formData.ownership_document);
                $('#ownership_document_name_container').show();
                $('#ownership_document_download').attr("href", CINEMA_DOC_PATH + formData.ownership_document);
            }
            if (formData.motor_vehicles_document != '') {
                $('#motor_vehicles_document_container').hide();
                $('#motor_vehicles_document_name_image').attr('src', CINEMA_DOC_PATH + formData.motor_vehicles_document);
                $('#motor_vehicles_document_name_container').show();
                $('#motor_vehicles_document_download').attr("href", CINEMA_DOC_PATH + formData.motor_vehicles_document);
            }
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_cinema').hide();
            $('#seal_and_stamp_name_image_for_cinema').attr('src', CINEMA_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_cinema').show();
            $('#seal_and_stamp_download').attr("href", CINEMA_DOC_PATH + formData.signature);
        }
        if (formData.business_trade_authority_license != '') {
            $('#business_trade_authority_license_container').hide();
            $('#business_trade_authority_license_name_image').attr('src', CINEMA_DOC_PATH + formData.business_trade_authority_license);
            $('#business_trade_authority_license_name_container').show();
            $('#business_trade_authority_license_download').attr("href", CINEMA_DOC_PATH + formData.business_trade_authority_license);
        }
    },
    checkValidationForCinema: function (cinemaData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!cinemaData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!cinemaData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!cinemaData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!cinemaData.father_name) {
            return getBasicMessageAndFieldJSONArray('father_name', fatherNameValidationMessage);
        }
        if (!cinemaData.dob) {
            return getBasicMessageAndFieldJSONArray('dob', dobValidationMessage);
        }
        if (!cinemaData.permanent_address) {
            return getBasicMessageAndFieldJSONArray('permanent_address', permanentAddressValidationMessage);
        }
        if (!cinemaData.temporary_address) {
            return getBasicMessageAndFieldJSONArray('temporary_address', temporaryAddressValidationMessage);
        }
        if (!cinemaData.video_cassette_recorder) {
            return getBasicMessageAndFieldJSONArray('video_cassette_recorder', videoCassetteRecorderLinkValidationMessage);
        }
        if (cinemaData.is_case_of_building == isChecked) {
            cinemaData.is_case_of_building == isChecked;
            if (!cinemaData.name_of_building) {
                return getBasicMessageAndFieldJSONArray('name_of_building', nameOfBuildingValidationMessage);
            }
            if (!cinemaData.place_of_building) {
                return getBasicMessageAndFieldJSONArray('place_of_building', placeOfBuildingValidationMessage);
            }
            if (!cinemaData.distance_of_building) {
                return getBasicMessageAndFieldJSONArray('distance_of_building', distanceOfBuildingValidationMessage);
            }
        }
        if (!cinemaData.tb_license_affected) {
            return getBasicMessageAndFieldJSONArray('tb_license_affected', tbLicenseAffectedValidationMessage);
        }
        if (!cinemaData.building_as) {
            return getBasicMessageAndFieldJSONArray('building_as', buildingASValidationMessage);
        }
        if (!cinemaData.auditorium_as) {
            return getBasicMessageAndFieldJSONArray('auditorium_as', auditoriumASValidationMessage);
        }
        if (!cinemaData.passages_and_gangways_as) {
            return getBasicMessageAndFieldJSONArray('passages_and_gangways_as', passagesAndGangwaysASValidationMessage);
        }
        if (!cinemaData.urinals_and_wc_as) {
            return getBasicMessageAndFieldJSONArray('urinals_and_wc_as', urinalsAndWcASValidationMessage);
        }
        if (!cinemaData.time_schedule_film) {
            return getBasicMessageAndFieldJSONArray('time_schedule_film', timeScheduleFilmValidationMessage);
        }
        if (!cinemaData.screen_width) {
            return getBasicMessageAndFieldJSONArray('screen_width', screenWidthValidationMessage);
        }
        return '';
    },
    askForSubmitCinema: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Cinema.listview.submitCinema(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitCinema: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var cinemaData = $('#cinema_form').serializeFormJSON();
        var validationData = that.checkValidationForCinema(cinemaData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('cinema-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#seal_and_stamp_container_for_cinema').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_cinema').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_cinema').focus();
                validationMessageShow('cinema-seal_and_stamp_for_cinema', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_cinema');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_cinema').focus();
                validationMessageShow('cinema-seal_and_stamp_for_cinema', sealAndStampMessage);
                return false;
            }
        }

        if ($('#support_document_container_for_cinema').is(':visible')) {
            var supportDocument = $('#support_document_for_cinema').val();
            if (supportDocument == '') {
                $('#support_document_for_cinema').focus();
                validationMessageShow('cinema-support_document_for_cinema', uploadDocumentValidationMessage);
                return false;
            }
            var supportDocumentMessage = fileUploadValidation('support_document_for_cinema');
            if (supportDocumentMessage != '') {
                $('#support_document_for_cinema').focus();
                validationMessageShow('cinema-support_document_for_cinema', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_cinema') : $('#submit_btn_for_cinema');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var cinemaData = new FormData($('#cinema_form')[0]);
        cinemaData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        cinemaData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'cinema/submit_cinema',
            data: cinemaData,
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
                validationMessageShow('cinema', textStatus.statusText);
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
                    validationMessageShow('cinema', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Cinema.router.navigate('cinema', {'trigger': true});
            }
        });
    },

    askForRemove: function (cinemaId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Cinema.listview.removeDocument(\'' + cinemaId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (cinemaId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'cinema/remove_document',
            data: $.extend({}, {'cinema_id': cinemaId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('cinema', textStatus.statusText);
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
                    validationMessageShow('cinema', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == 1) {
                    $('#support_document_name_container_for_cinema').hide();
                    $('#support_document_name_image_for_cinema').attr('src', '');
                    $('#support_document_container_for_cinema').show();
                    $('#support_document_for_cinema').val('');
                }
                if (docType == 2) {
                    $('#seal_and_stamp_name_container_for_cinema').hide();
                    $('#seal_and_stamp_name_image_for_cinema').attr('src', '');
                    $('#seal_and_stamp_container_for_cinema').show();
                    $('#seal_and_stamp_for_cinema').val('');
                }

            }
        });
    },
    generateForm1: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#cinema_id_for_cinema_form1').val(cinemaId);
        $('#cinema_form1_pdf_form').submit();
        $('#cinema_id_for_cinema_form1').val('');
    },
    openUploadChallan: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + cinemaId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'cinema/get_cinema_data_by_cinema_id',
            type: 'post',
            data: $.extend({}, {'cinema_id': cinemaId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var cinemaData = parseData.cinema_data;
                showPopup();
                if (cinemaData.payment_type == VALUE_ONE) {
                    cinemaData.utitle = 'Challan Copy';
                } else {
                    cinemaData.utitle = 'Payment Details';
                }
                cinemaData.module_type = VALUE_EIGHT;
                $('#popup_container').html(cinemaUploadChallanTemplate(cinemaData));
                loadFB(VALUE_EIGHT, parseData.fb_data, cinemaData.payment_type, cinemaData.show_remove_upload_btn, cinemaData.show_dropdown, cinemaData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'cinema_upload_challan', cinemaData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'cinema_upload_challan', 'uc', 'radio', '#fb', VALUE_EIGHT);
                if (cinemaData.challan != '') {
                    $('#challan_container_for_cinema_upload_challan').hide();
                    $('#challan_name_container_for_cinema_upload_challan').show();
                    $('#challan_name_href_for_cinema_upload_challan').attr('href', 'documents/cinema/' + cinemaData.challan);
                    $('#challan_name_for_cinema_upload_challan').html(cinemaData.challan);
                    $('#challan_remove_btn_for_cinema_upload_challan').attr('onclick', 'Cinema.listview.removeChallan("' + cinemaData.cinema_id + '")');
                }
            }
        });
    },
    removeChallan: function (cinemaId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'cinema/remove_challan',
            data: $.extend({}, {'cinema_id': cinemaId}, getTokenData()),
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
                validationMessageShow('cinema-uc', textStatus.statusText);
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
                    validationMessageShow('cinema-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-cinema-uc').html(parseData.message);
                removeDocument('challan', 'cinema_upload_challan');
                $('#status_' + cinemaId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-cinema-uc').html('');
        validationMessageHide();
        var cinemaId = $('#cinema_id_for_cinema_upload_challan').val();
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_cinema_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_cinema_upload_challan_1').focus();
            validationMessageShow('cinema-uc-payment_type_for_cinema_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_cinema_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_cinema_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_cinema_upload_challan').focus();
                validationMessageShow('cinema-uc-challan_for_cinema_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_cinema_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_cinema_upload_challan').focus();
                validationMessageShow('cinema-uc-challan_for_cinema_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_EIGHT, 'cinema-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_cinema_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#cinema_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'cinema/upload_challan',
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
                validationMessageShow('cinema-uc', textStatus.statusText);
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
                    validationMessageShow('cinema-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + cinemaId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + cinemaId).show();
                }
                $('#total_fees_' + cinemaId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_cinema_' + cinemaId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'cinema/get_cinema_data_by_cinema_id',
            type: 'post',
            data: $.extend({}, {'cinema_id': cinemaId}, getTokenData()),
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
                var cinemaData = parseData.cinema_data;
                showPopup();
                $('#popup_container').html(cinemaApproveTemplate(cinemaData));
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
        var formData = $('#approve_cinema_form').serializeFormJSON();
        if (!formData.cinema_id_for_cinema_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_cinema_approve) {
            $('#registration_number_for_cinema_approve').focus();
            validationMessageShow('cinema-approve-registration_number_for_cinema_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_cinema_approve) {
            $('#valid_upto_for_cinema_approve').focus();
            validationMessageShow('cinema-approve-valid_upto_for_cinema_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_cinema_approve) {
            $('#remarks_for_cinema_approve').focus();
            validationMessageShow('cinema-approve-remarks_for_cinema_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'cinema/approve_application',
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
                validationMessageShow('cinema-approve', textStatus.statusText);
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
                    validationMessageShow('cinema-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.cinema_id_for_cinema_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.cinema_id_for_cinema_approve).remove();
                $('#approve_btn_for_app_' + formData.cinema_id_for_cinema_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.cinema_id_for_cinema_approve).show();
                $('#so_status_' + formData.cinema_id_for_cinema_approve).html(dateTimeDays(formData.cinema_id_for_cinema_approve, parseData, VALUE_EIGHT));
            }
        });
    },
    askForRejectApplication: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_cinema_' + cinemaId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'cinema/get_cinema_data_by_cinema_id',
            type: 'post',
            data: $.extend({}, {'cinema_id': cinemaId}, getTokenData()),
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
                var cinemaData = parseData.cinema_data;
                showPopup();
                $('#popup_container').html(cinemaRejectTemplate(cinemaData));
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
        var formData = $('#reject_cinema_form').serializeFormJSON();
        if (!formData.cinema_id_for_cinema_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_cinema_reject) {
            $('#remarks_for_cinema_reject').focus();
            validationMessageShow('cinema-reject-remarks_for_cinema_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'cinema/reject_application',
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
                validationMessageShow('cinema-reject', textStatus.statusText);
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
                    validationMessageShow('cinema-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.cinema_id_for_cinema_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.cinema_id_for_cinema_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.cinema_id_for_cinema_reject).remove();
                $('#reject_btn_for_app_' + formData.cinema_id_for_cinema_reject).remove();
                $('#approve_btn_for_app_' + formData.cinema_id_for_cinema_reject).remove();
                $('#so_status_' + formData.cinema_id_for_cinema_reject).html(dateTimeDays(formData.cinema_id_for_cinema_reject, parseData, VALUE_EIGHT));
                that.loadCinemaData();
            }
        });
    },
    generateCertificate: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#cinema_id_for_certificate').val(cinemaId);
        $('#cinema_certificate_pdf_form').submit();
        $('#cinema_id_for_certificate').val('');
    },
    getQueryData: function (cinemaId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!cinemaId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_EIGHT;
        templateData.module_id = cinemaId;
        var btnObj = $('#query_btn_for_cinema_' + cinemaId);
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
                tmpData.application_number = regNoRenderer(VALUE_EIGHT, moduleData.cinema_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_EIGHT;
                tmpData.module_id = cinemaId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (cinemaId) {
        if (!cinemaId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + cinemaId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'cinema/get_cinema_data_by_cinema_id',
            type: 'post',
            data: $.extend({}, {'cinema_id': cinemaId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var cinemaData = parseData.cinema_data;
                showPopup();
                if (cinemaData.payment_type == VALUE_ONE || cinemaData.payment_type == VALUE_THREE) {
                    cinemaData.user_payment_type_text = paymentTypeArray[cinemaData.payment_type];
                } else {
                    cinemaData.user_payment_type_text = userPaymentTypeArray[cinemaData.user_payment_type] ? userPaymentTypeArray[cinemaData.user_payment_type] : '';
                }
                if (cinemaData.payment_type == VALUE_ONE) {
                    cinemaData.utitle = 'Fees Paid Challan Copy';
                } else if (cinemaData.payment_type == VALUE_TWO && cinemaData.user_payment_type == VALUE_ONE) {
                    cinemaData.utitle = 'Demand Draft (DD) Copy';
                }
                cinemaData.module_type = VALUE_EIGHT;
                $('#popup_container').html(cinemaViewPaymentTemplate(cinemaData));
                loadFB(VALUE_EIGHT, parseData.fb_data, cinemaData.payment_type);
                loadPH(VALUE_EIGHT, cinemaData.cinema_id, parseData.ph_data);
                if (cinemaData.payment_type == VALUE_ONE || (cinemaData.payment_type == VALUE_TWO && cinemaData.user_payment_type == VALUE_ONE)) {
                    if (cinemaData.fees_paid_challan != '') {
                        $('#vp_container_for_cinema').show();
                        $('#fees_paid_challan_name_href_for_cinema').attr('href', CINEMA_DOC_PATH + cinemaData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_cinema').html(cinemaData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
