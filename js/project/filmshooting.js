var filmShootingListTemplate = Handlebars.compile($('#filmshooting_list_template').html());
var filmShootingTableTemplate = Handlebars.compile($('#filmshooting_table_template').html());
var filmShootingActionTemplate = Handlebars.compile($('#filmshooting_action_template').html());
var filmShootingFormTemplate = Handlebars.compile($('#filmshooting_form_template').html());
var filmShootingViewTemplate = Handlebars.compile($('#filmshooting_view_template').html());
var filmShootingUploadChallanTemplate = Handlebars.compile($('#filmshooting_upload_challan_template').html());
var filmShootingApproveTemplate = Handlebars.compile($('#filmshooting_approve_template').html());
var filmShootingRejectTemplate = Handlebars.compile($('#filmshooting_reject_template').html());
var filmShootingViewPaymentTemplate = Handlebars.compile($('#filmshooting_view_payment_template').html());

var tempPersonCnt = 1;

var FilmShooting = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
FilmShooting.Router = Backbone.Router.extend({
    routes: {
        'filmshooting': 'renderList',
        'filmshooting_form': 'renderListForForm',
        'edit_filmshooting_form': 'renderList',
        'view_filmshooting_form': 'renderList',
    },
    renderList: function () {
        FilmShooting.listview.listPage();
    },
    renderListForForm: function () {
        FilmShooting.listview.listPageShootingForm();
    }
});
FilmShooting.listView = Backbone.View.extend({
    el: 'div#main_container',
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
        // addClass('cinema', 'active');
        addClass('filmshooting', 'active');
        FilmShooting.router.navigate('filmshooting');
        var templateData = {};
        this.$el.html(filmShootingListTemplate(templateData));
        this.loadFilmShootingData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageShootingForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        // ddClass('filmshooting', 'active');
        this.$el.html(filmShootingListTemplate);
        this.newFilmShootingForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return filmShootingActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYTWO;
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
        return filmShootingActionTemplate(rowData);
    },
    loadFilmShootingData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.production_manager + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.production_house;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTYTWO, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYTWO);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['filmshooting_data'], function (index, objData) {
                json['filmshooting_data'][index]['query_movement_string'] = qmData[objData.filmshooting_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.filmshooting_id] + '</table>') : '-';
            });
            return json['filmshooting_data'];
        };
        var that = this;
        showTableContainer('filmshooting');
        FilmShooting.router.navigate('filmshooting');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'FilmShooting.listview.loadFilmShootingData();');
        $('#filmshooting_form_and_datatable_container').html(filmShootingTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_filmshooting_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_filmshooting_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_filmshooting_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_filmshooting_list', false);
        allowOnlyIntegerValue('mobile_number_for_filmshooting_list')
        //  if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_filmshooting_list', false);
        $('#district_for_filmshooting_list').val(searchData.search_district);
        $('#status_for_filmshooting_list').val(searchData.search_status);
        $('#app_timing_for_filmshooting_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_filmshooting_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_filmshooting_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_filmshooting_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_filmshooting_list').attr('disabled', 'disabled');
        }
        filmShootingDataTable = $('#filmshooting_datatable').DataTable({
            ajax: {url: 'filmshooting/get_filmshooting_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'filmshooting_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'filmshooting_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'filmshooting_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'filmshooting_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //   } 
        $('#filmshooting_datatable_filter').remove();
        $('#filmshooting_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = filmShootingDataTable.row(tr);

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
    newFilmShootingForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.filmshooting_data;
            FilmShooting.router.navigate('edit_filmshooting_form');
        } else {
            var formData = {};
            FilmShooting.router.navigate('filmshooting_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.filmshooting_data = parseData.filmshooting_data;
        templateData.shooting_date_time = dateTo_DD_MM_YYYY(formData.shooting_date_time);
        $('#filmshooting_form_and_datatable_container').html(filmShootingFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            if (formData.declaration != '') {
                $('#declaration_container_for_filmshooting').hide();
                $('#declaration_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.declaration);
                $('#declaration_name_container_for_filmshooting').show();

                $('#declaration_name_image_for_filmshooting_download').attr("href", FILMSHOOTING_DOC_PATH + formData.declaration);
            }
            if (formData.producer_signature != '') {
                $('#producer_signature_container_for_filmshooting').hide();
                $('#producer_signature_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.producer_signature);
                $('#producer_signature_name_container_for_filmshooting').show();
            }
            if (formData.authorized_representative_sign != '') {
                $('#authorized_representative_sign_container_for_filmshooting').hide();
                $('#authorized_representative_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.authorized_representative_sign);
                $('#authorized_representative_sign_name_container_for_filmshooting').show();
            }
            if (formData.seal_of_company != '') {
                $('#seal_of_company_container_for_filmshooting').hide();
                $('#seal_of_company_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.seal_of_company);
                $('#seal_of_company_name_container_for_filmshooting').show();
            }
            if (formData.witness_one_sign != '') {
                $('#witness_one_sign_container_for_filmshooting').hide();
                $('#witness_one_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.witness_one_sign);
                $('#witness_one_sign_name_container_for_filmshooting').show();
            }
            if (formData.witness_two_sign != '') {
                $('#witness_two_sign_container_for_filmshooting').hide();
                $('#witness_two_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.witness_two_sign);
                $('#witness_two_sign_name_container_for_filmshooting').show();
            }
        }
        generateSelect2();
        datePicker();
        $('#filmshooting_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitFilmShooting($('#submit_btn_for_filmShooting'));
            }
        });
    },
    editOrViewFilmShooting: function (btnObj, filmShootingId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_REV_COLL && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!filmShootingId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'filmshooting/get_filmshooting_data_by_id',
            type: 'post',
            data: $.extend({}, {'filmshooting_id': filmShootingId}, getTokenData()),
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
                    that.newFilmShootingForm(isEdit, parseData);
                } else {
                    that.viewFilmShootingForm(parseData);
                }
            }
        });
    },
    viewFilmShootingForm: function (parseData, isPrint) {
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
        var formData = parseData.filmshooting_data;
        FilmShooting.router.navigate('view_filmshooting_form');
        formData.application_number = regNoRenderer(VALUE_TWENTYTWO, formData.filmshooting_id);
        formData.district_text = talukaArray[formData.district] ? talukaArray[formData.district] : '';
        formData.entity_establishment_type = entityEstablishmentTypeArray[formData.entity_establishment_type] ? entityEstablishmentTypeArray[formData.entity_establishment_type] : '';
        formData.shooting_date_time = dateTo_DD_MM_YYYY(formData.shooting_date_time);
        if (formData.dob == 'NaN-NaN-NaN') {
            formData.dob = '';
         }
        formData.title = 'View'
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.FILMSHOOTING_DOC_PATH = FILMSHOOTING_DOC_PATH;  
        formData.VALUE_TWO = VALUE_TWO;
        formData.VALUE_THREE = VALUE_THREE;
        formData.VALUE_FOUR = VALUE_FOUR;  
        formData.show_declaration = formData.declaration != '' ? true : false;
        formData.show_producer_signature = formData.producer_signature != '' ? true : false;
        formData.show_authorized_representative_sign = formData.authorized_representative_sign != '' ? true : false;
        formData.show_seal_of_company = formData.seal_of_company != '' ? true : false;
        formData.show_witness_one_sign = formData.witness_one_sign != '' ? true : false;
        formData.show_witness_two_sign = formData.witness_two_sign != '' ? true : false;
        //$('#filmshooting_form_and_datatable_container').html(filmShootingViewTemplate(formData));
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(filmShootingViewTemplate(formData));

        //showFormContainer('filmshooting');
        // renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        // renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        // $('#district').val(formData.district);
        // $('#entity_establishment_type').val(formData.entity_establishment_type);

        // if (formData.declaration != '') {
        //     $('#declaration_container_for_filmshooting').hide();
        //     $('#declaration_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.declaration);
        //     $('#declaration_name_container_for_filmshooting').show();

        //     $('#declaration_name_image_for_filmshooting_download').attr("href", FILMSHOOTING_DOC_PATH + formData.declaration);
        // }
        // if (formData.producer_signature != '') {
        //     $('#producer_signature_container_for_filmshooting').hide();
        //     $('#producer_signature_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.producer_signature);
        //     $('#producer_signature_name_container_for_filmshooting').show();
        //     $('#producer_signature_download').attr("href", FILMSHOOTING_DOC_PATH + formData.producer_signature);
        // }
        // if (formData.authorized_representative_sign != '') {
        //     $('#authorized_representative_sign_container_for_filmshooting').hide();
        //     $('#authorized_representative_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.authorized_representative_sign);
        //     $('#authorized_representative_sign_name_container_for_filmshooting').show();
        //     $('#authorized_representative_sign_download').attr("href", FILMSHOOTING_DOC_PATH + formData.authorized_representative_sign);
        // }
        // if (formData.seal_of_company != '') {
        //     $('#seal_of_company_container_for_filmshooting').hide();
        //     $('#seal_of_company_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.seal_of_company);
        //     $('#seal_of_company_name_container_for_filmshooting').show();
        //     $('#seal_of_company_download').attr("href", FILMSHOOTING_DOC_PATH + formData.seal_of_company);
        // }
        // if (formData.witness_one_sign != '') {
        //     $('#witness_one_sign_container_for_filmshooting').hide();
        //     $('#witness_one_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.witness_one_sign);
        //     $('#witness_one_sign_name_container_for_filmshooting').show();
        //     $('#witness_one_sign_download').attr("href", FILMSHOOTING_DOC_PATH + formData.witness_one_sign);
        // }
        // if (formData.witness_two_sign != '') {
        //     $('#witness_two_sign_container_for_filmshooting').hide();
        //     $('#witness_two_sign_name_image_for_filmshooting').attr('src', FILMSHOOTING_DOC_PATH + formData.witness_two_sign);
        //     $('#witness_two_sign_name_container_for_filmshooting').show();
        //     $('#witness_two_sign_download').attr("href", FILMSHOOTING_DOC_PATH + formData.witness_two_sign);
        // }
        if (isPrint) {
            setTimeout(function () {
                $('#pa_btn_for_icview').click();
            }, 500);
        }

    },
    checkValidationForFilmShooting: function (filmShootingData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!filmShootingData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!filmShootingData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!filmShootingData.production_house) {
            return getBasicMessageAndFieldJSONArray('production_house', productionHouseValidationMessage);
        }
        if (!filmShootingData.address) {
            return getBasicMessageAndFieldJSONArray('address', permanentAddressValidationMessage);
        }
        if (!filmShootingData.production_manager) {
            return getBasicMessageAndFieldJSONArray('production_manager', productionManagerValidationMessage);
        }
        if (!filmShootingData.contact_no) {
            return getBasicMessageAndFieldJSONArray('contact_no', contactNoValidationMessage);
        }
        if (!filmShootingData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!filmShootingData.director_cast) {
            return getBasicMessageAndFieldJSONArray('director_cast', directorValidationMessage);
        }
        if (!filmShootingData.film_title) {
            return getBasicMessageAndFieldJSONArray('film_title', filmTitleValidationMessage);
        }
        if (!filmShootingData.film_synopsis) {
            return getBasicMessageAndFieldJSONArray('film_synopsis', filmSynopsisValidationMessage);
        }
        if (!filmShootingData.film_shooting_days) {
            return getBasicMessageAndFieldJSONArray('film_shooting_days', filmShootingDaysValidationMessage);
        }
        if (!filmShootingData.shooting_location) {
            return getBasicMessageAndFieldJSONArray('shooting_location', shootingLocationValidationMessage);
        }
        if (!filmShootingData.shooting_date_time) {
            return getBasicMessageAndFieldJSONArray('shooting_date_time', shootingDateValidationMessage);
        }
        if (!filmShootingData.defense_installation) {
            return getBasicMessageAndFieldJSONArray('defense_installation', defenseInstallationValidationMessage);
        }

        if (!filmShootingData.undersigned) {
            return getBasicMessageAndFieldJSONArray('undersigned', undersignedValidationMessage);
        }
        if (!filmShootingData.aged) {
            return getBasicMessageAndFieldJSONArray('aged', agedYearValidationMessage);
        }
        if (!filmShootingData.resident) {
            return getBasicMessageAndFieldJSONArray('resident', residentValidationMessage);
        }
        if (!filmShootingData.purpose) {
            return getBasicMessageAndFieldJSONArray('purpose', purposeValidationMessage);
        }
        if (!filmShootingData.witness_one_name) {
            return getBasicMessageAndFieldJSONArray('witness_one_name', witnessNameValidationMessage);
        }
        if (!filmShootingData.witness_two_name) {
            return getBasicMessageAndFieldJSONArray('witness_two_name', witnessNameValidationMessage);
        }
        return '';
    },
    askForSubmitFilmShooting: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'FilmShooting.listview.submitFilmShooting(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitFilmShooting: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var filmShootingData = $('#filmshooting_form').serializeFormJSON();
        var validationData = that.checkValidationForFilmShooting(filmShootingData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('filmshooting-' + validationData.field, validationData.message);
            return false;
        }

        // if ($('#declaration_container_for_filmshooting').is(':visible')) {
        //     var declarationDocument = $('#declaration_for_filmshooting').val();
        //     if (declarationDocument == '') {
        //         $('#declaration_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-declaration_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var declarationDocumentMessage = pdffileUploadValidation('declaration_for_filmshooting');
        //     if (declarationDocumentMessage != '') {
        //         $('#declaration_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-declaration_for_filmshooting', declarationDocumentMessage);
        //         return false;
        //     }
        // }

        // if ($('#producer_signature_container_for_filmshooting').is(':visible')) {
        //     var producerSignature = $('#producer_signature_for_filmshooting').val();
        //     if (producerSignature == '') {
        //         $('#producer_signature_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-producer_signature_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var producerSignatureMessage = imagefileUploadValidation('producer_signature_for_filmshooting');
        //     if (producerSignatureMessage != '') {
        //         $('#producer_signature_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-producer_signature_for_filmshooting', producerSignatureMessage);
        //         return false;
        //     }
        // }

        // if ($('#authorized_representative_sign_container_for_filmshooting').is(':visible')) {
        //     var authorizedRepresentativeSign = $('#authorized_representative_sign_for_filmshooting').val();
        //     if (authorizedRepresentativeSign == '') {
        //         $('#authorized_representative_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-authorized_representative_sign_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var authorizedRepresentativeSignMessage = imagefileUploadValidation('authorized_representative_sign_for_filmshooting');
        //     if (authorizedRepresentativeSignMessage != '') {
        //         $('#authorized_representative_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-authorized_representative_sign_for_filmshooting', authorizedRepresentativeSignMessage);
        //         return false;
        //     }
        // }

        // if ($('#seal_of_company_container_for_filmshooting').is(':visible')) {
        //     var sealOfCompany = $('#seal_of_company_for_filmshooting').val();
        //     if (sealOfCompany == '') {
        //         $('#seal_of_company_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-seal_of_company_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var sealOfCompanyMessage = imagefileUploadValidation('seal_of_company_for_filmshooting');
        //     if (sealOfCompanyMessage != '') {
        //         $('#seal_of_company_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-seal_of_company_for_filmshooting', sealOfCompanyMessage);
        //         return false;
        //     }
        // }

        // if ($('#witness_one_sign_container_for_filmshooting').is(':visible')) {
        //     var witnessOneSign = $('#witness_one_sign_for_filmshooting').val();
        //     if (witnessOneSign == '') {
        //         $('#witness_one_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-witness_one_sign_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var witnessOneSignMessage = imagefileUploadValidation('witness_one_sign_for_filmshooting');
        //     if (witnessOneSignMessage != '') {
        //         $('#witness_one_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-witness_one_sign_for_filmshooting', witnessOneSignMessage);
        //         return false;
        //     }
        // }

        // if ($('#witness_two_sign_container_for_filmshooting').is(':visible')) {
        //     var witnessTwoSign = $('#witness_two_sign_for_filmshooting').val();
        //     if (witnessTwoSign == '') {
        //         $('#witness_two_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-witness_two_sign_for_filmshooting', uploadDocumentValidationMessage);
        //         return false;
        //     }
        //     var witnessTwoSignMessage = imagefileUploadValidation('witness_two_sign_for_filmshooting');
        //     if (witnessTwoSignMessage != '') {
        //         $('#witness_two_sign_for_filmshooting').focus();
        //         validationMessageShow('filmShooting-witness_two_sign_for_filmshooting', witnessTwoSignMessage);
        //         return false;
        //     }
        // }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_filmshooting') : $('#submit_btn_for_filmshooting');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var filmShootingData = new FormData($('#filmshooting_form')[0]);
        filmShootingData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        filmShootingData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'filmshooting/submit_filmshooting',
            data: filmShootingData,
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
                validationMessageShow('filmshooting', textStatus.statusText);
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
                    validationMessageShow('filmshooting', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                FilmShooting.router.navigate('filmshooting', {'trigger': true});
            }
        });
    },

    askForRemove: function (filmShootingId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'FilmShooting.listview.removeDocument(\'' + filmShootingId + '\',\'' + docId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (filmShootingId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'filmshooting/remove_document',
            data: $.extend({}, {'filmshooting_id': filmShootingId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('filmshooting', textStatus.statusText);
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
                    validationMessageShow('filmshooting', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_filmshooting').hide();
                $('#' + docId + '_name_image_for_filmshooting').attr('src', '');
                $('#' + docId + '_container_for_filmshooting').show();
                $('#' + docId + '_for_filmshooting').val('');
            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(proprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm1: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#filmshooting_id_for_filmshooting_form1').val(filmShootingId);
        $('#filmshooting_form1_pdf_form').submit();
        $('#filmshooting_id_for_filmshooting_form1').val('');
    },

    openUploadChallan: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + filmShootingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'filmshooting/get_filmshooting_data_by_filmshooting_id',
            type: 'post',
            data: $.extend({}, {'filmshooting_id': filmShootingId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var filmShootingData = parseData.filmshooting_data;
                showPopup();
                if (filmShootingData.payment_type == VALUE_ONE) {
                    filmShootingData.utitle = 'Challan Copy';
                } else {
                    filmShootingData.utitle = 'Payment Details';
                }
                filmShootingData.module_type = VALUE_TWENTYTWO;
                $('#popup_container').html(filmShootingUploadChallanTemplate(filmShootingData));
                loadFB(VALUE_TWENTYTWO, parseData.fb_data, filmShootingData.payment_type, filmShootingData.show_remove_upload_btn, filmShootingData.show_dropdown, filmShootingData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'filmshooting_upload_challan', filmShootingData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'filmshooting_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYTWO);
                if (filmShootingData.challan != '') {
                    $('#challan_container_for_filmshooting_upload_challan').hide();
                    $('#challan_name_container_for_filmshooting_upload_challan').show();
                    $('#challan_name_href_for_filmshooting_upload_challan').attr('href', 'documents/filmshooting/' + filmShootingData.challan);
                    $('#challan_name_for_filmshooting_upload_challan').html(filmShootingData.challan);
                    $('#challan_remove_btn_for_filmshooting_upload_challan').attr('onclick', 'FilmShooting.listview.removeChallan("' + filmShootingData.filmshooting_id + '")');
                }
            }
        });
    },
    removeChallan: function (filmShootingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'filmshooting/remove_challan',
            data: $.extend({}, {'filmshooting_id': filmShootingId}, getTokenData()),
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
                validationMessageShow('filmshooting-uc', textStatus.statusText);
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
                    validationMessageShow('filmshooting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-filmshooting-uc').html(parseData.message);
                removeDocument('challan', 'filmshooting_upload_challan');
                $('#status_' + filmShootingId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-filmshooting-uc').html('');
        validationMessageHide();
        var filmShootingId = $('#filmshooting_id_for_filmshooting_upload_challan').val();
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_filmshooting_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_filmshooting_upload_challan_1').focus();
            validationMessageShow('filmshooting-uc-payment_type_for_filmshooting_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_filmshooting_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_filmshooting_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_filmshooting_upload_challan').focus();
                validationMessageShow('filmshooting-uc-challan_for_filmshooting_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_filmshooting_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_filmshooting_upload_challan').focus();
                validationMessageShow('filmshooting-uc-challan_for_filmshooting_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYTWO, 'filmshooting-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_filmshooting_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#filmshooting_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'filmshooting/upload_challan',
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
                validationMessageShow('filmshooting-uc', textStatus.statusText);
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
                    validationMessageShow('filmshooting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + filmShootingId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + filmShootingId).show();
                }
                $('#total_fees_' + filmShootingId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + filmShootingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'filmshooting/get_filmshooting_data_by_filmshooting_id',
            type: 'post',
            data: $.extend({}, {'filmshooting_id': filmShootingId}, getTokenData()),
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
                var filmShootingData = parseData.filmshooting_data;
                showPopup();
                $('#popup_container').html(filmShootingApproveTemplate(filmShootingData));
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
        var formData = $('#approve_filmshooting_form').serializeFormJSON();
        if (!formData.filmshooting_id_for_filmshooting_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_filmshooting_approve) {
            $('#registration_number_for_filmshooting_approve').focus();
            validationMessageShow('filmshooting-approve-registration_number_for_filmshooting_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_filmshooting_approve) {
            $('#valid_upto_for_filmshooting_approve').focus();
            validationMessageShow('filmshooting-approve-valid_upto_for_filmshooting_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_filmshooting_approve) {
            $('#remarks_for_filmshooting_approve').focus();
            validationMessageShow('filmshooting-approve-remarks_for_filmshooting_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'filmshooting/approve_application',
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
                validationMessageShow('filmshooting-approve', textStatus.statusText);
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
                    validationMessageShow('filmshooting-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.filmshooting_id_for_filmshooting_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.filmshooting_id_for_filmshooting_approve).remove();
                $('#approve_btn_for_app_' + formData.filmshooting_id_for_filmshooting_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.filmshooting_id_for_filmshooting_approve).show();
                $('#so_status_' + formData.filmshooting_id_for_filmshooting_approve).html(dateTimeDays(formData.filmshooting_id_for_filmshooting_approve, parseData, VALUE_TWENTYTWO));
            }
        });
    },
    askForRejectApplication: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + filmShootingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'filmshooting/get_filmshooting_data_by_filmshooting_id',
            type: 'post',
            data: $.extend({}, {'filmshooting_id': filmShootingId}, getTokenData()),
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
                var filmShootingData = parseData.filmshooting_data;
                showPopup();
                $('#popup_container').html(filmShootingRejectTemplate(filmShootingData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_filmshooting_form').serializeFormJSON();
        if (!formData.filmshooting_id_for_filmshooting_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_filmshooting_reject) {
            $('#remarks_for_filmshooting_reject').focus();
            validationMessageShow('filmshooting-reject-remarks_for_filmshooting_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'filmshooting/reject_application',
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
                validationMessageShow('filmshooting-reject', textStatus.statusText);
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
                    validationMessageShow('filmshooting-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.filmshooting_id_for_filmshooting_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.filmshooting_id_for_filmshooting_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.filmshooting_id_for_filmshooting_reject).remove();
                $('#reject_btn_for_app_' + formData.filmshooting_id_for_filmshooting_reject).remove();
                $('#approve_btn_for_app_' + formData.filmshooting_id_for_filmshooting_reject).remove();
                $('#so_status_' + formData.filmshooting_id_for_filmshooting_reject).html(dateTimeDays(formData.filmshooting_id_for_filmshooting_reject, parseData, VALUE_TWENTYTWO));
            }
        });
    },
    generateCertificate: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#filmshooting_id_for_certificate').val(filmShootingId);
        $('#filmshooting_certificate_pdf_form').submit();
        $('#filmshooting_id_for_certificate').val('');
    },
    getQueryData: function (filmShootingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!filmShootingId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYTWO;
        templateData.module_id = filmShootingId;
        var btnObj = $('#query_btn_for_wm_' + filmShootingId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYTWO, moduleData.filmshooting_id);
                tmpData.applicant_name = moduleData.production_house;
                tmpData.title = 'Production House';
                tmpData.module_type = VALUE_TWENTYTWO;
                tmpData.module_id = filmShootingId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (filmShootingId) {
        if (!filmShootingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + filmShootingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'filmshooting/get_filmshooting_data_by_filmshooting_id',
            type: 'post',
            data: $.extend({}, {'filmshooting_id': filmShootingId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var filmshootingData = parseData.filmshooting_data;
                showPopup();
                if (filmshootingData.payment_type == VALUE_ONE || filmshootingData.payment_type == VALUE_THREE) {
                    filmshootingData.user_payment_type_text = paymentTypeArray[filmshootingData.payment_type];
                } else {
                    filmshootingData.user_payment_type_text = userPaymentTypeArray[filmshootingData.user_payment_type] ? userPaymentTypeArray[filmshootingData.user_payment_type] : '';
                }
                if (filmshootingData.payment_type == VALUE_ONE) {
                    filmshootingData.utitle = 'Fees Paid Challan Copy';
                } else if (filmshootingData.payment_type == VALUE_TWO && filmshootingData.user_payment_type == VALUE_ONE) {
                    filmshootingData.utitle = 'Demand Draft (DD) Copy';
                }
                filmshootingData.module_type = VALUE_TWENTYTWO;
                $('#popup_container').html(filmShootingViewPaymentTemplate(filmshootingData));
                loadFB(VALUE_TWENTYTWO, parseData.fb_data, filmshootingData.payment_type);
                loadPH(VALUE_TWENTYTWO, filmshootingData.filmshooting_id, parseData.ph_data);
                if (filmshootingData.payment_type == VALUE_ONE || (filmshootingData.payment_type == VALUE_TWO && filmshootingData.user_payment_type == VALUE_ONE)) {
                    if (filmshootingData.fees_paid_challan != '') {
                        $('#vp_container_for_filmshooting').show();
                        $('#fees_paid_challan_name_href_for_filmshooting').attr('href', FILMSHOOTING_DOC_PATH + filmshootingData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_filmshooting').html(filmshootingData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
