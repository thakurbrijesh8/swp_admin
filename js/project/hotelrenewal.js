var hotelRenewalListTemplate = Handlebars.compile($('#hotel_renewal_list_template').html());
var hotelRenewalTableTemplate = Handlebars.compile($('#hotel_renewal_table_template').html());
var hotelRenewalActionTemplate = Handlebars.compile($('#hotel_renewal_action_template').html());
var hotelRenewalFormTemplate = Handlebars.compile($('#hotel_renewal_form_template').html());
var hotelRenewalViewTemplate = Handlebars.compile($('#hotel_renewal_view_template').html());
var newEmployeesDetailsTemplate = Handlebars.compile($('#hotel_newemployees_info_template').html());
var hotelRenewalUploadChallanTemplate = Handlebars.compile($('#hotel_renewal_upload_challan_template').html());
var hotelRenewalApproveTemplate = Handlebars.compile($('#hotel_renewal_approve_template').html());
var hotelRenewalRejectTemplate = Handlebars.compile($('#hotel_renewal_reject_template').html());
var hotelRenewalViewPaymentTemplate = Handlebars.compile($('#hotel_renewal_view_payment_template').html());

var tempPersonCnt = 1;

var HotelRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
HotelRenewal.Router = Backbone.Router.extend({
    routes: {
        'hotel_renewal': 'renderList',
        'hotel_renewal_form': 'renderListForForm',
        'edit_hotel_renewal_form': 'renderList',
        'view_hotel_renewal_form': 'renderList',
    },
    renderList: function () {
        HotelRenewal.listview.listPage();
    },
    renderListForForm: function () {
        HotelRenewal.listview.listPageHotelRenewalForm();
    }
});
HotelRenewal.listView = Backbone.View.extend({
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
        addClass('hotel_renewal', 'active');
        HotelRenewal.router.navigate('hotel_renewal');
        var templateData = {};
        this.$el.html(hotelRenewalListTemplate(templateData));
        this.loadHotelRenewalData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageHotelRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        addClass('hotel_renewal', 'active');
        this.$el.html(hotelRenewalListTemplate);
        this.newHotelRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return hotelRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTY;
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
        return hotelRenewalActionTemplate(rowData);
    },
    loadHotelRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_hotel + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.name_of_proprietor;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTY, data, full.name_of_tourist_area, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTY);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['hotel_renewal_data'], function (index, objData) {
                json['hotel_renewal_data'][index]['query_movement_string'] = qmData[objData.hotel_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.hotel_renewal_id] + '</table>') : '-';
            });
            return json['hotel_renewal_data'];
        };
        var that = this;
        HotelRenewal.router.navigate('hotel_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'HotelRenewal.listview.loadHotelRenewalData();');
        $('#hotel_renewal_form_and_datatable_container').html(hotelRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_hotel_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_hotel_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_hotel_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_hotel_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_hotel_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_hotel_renewal_list', false);
        $('#district_for_hotel_renewal_list').val(searchData.search_district);
        $('#status_for_hotel_renewal_list').val(searchData.search_status);
        $('#app_timing_for_hotel_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_hotel_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_hotel_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_hotel_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_hotel_renewal_list').attr('disabled', 'disabled');
        }
        hotelDataTable = $('#hotel_renewal_datatable').DataTable({
            ajax: {url: 'hotel_renewal/get_hotel_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'hotel_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'hotel_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'hotel_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'hotel_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
        $('#hotel_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = hotelDataTable.row(tr);

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
    newHotelRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.hotel_renewal_data;
            HotelRenewal.router.navigate('edit_hotel_renewal_form');
        } else {
            var formData = {};
            HotelRenewal.router.navigate('hotel_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.hotelrenewal_data = parseData.hotel_renewal_data;
        templateData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        $('#hotel_renewal_form_and_datatable_container').html(hotelRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'name_of_tourist_area');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#name_of_tourist_area').val(formData.name_of_tourist_area);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.noc_fire != '') {
                $('#noc_fire_container_for_hotelrenewal').hide();
                $('#noc_fire_name_image_for_hotelrenewal').attr('src', HOTELREGI_DOC_PATH + formData.noc_fire);
                $('#noc_fire_name_container_for_hotelrenewal').show();
                $('#noc_fire_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_fire);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_hotelrenewal').hide();
                $('#seal_and_stamp_name_image_for_hotelrenewal').attr('src', HOTELREGI_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_hotelrenewal').show();
                $('#seal_and_stamp_download').attr("href", HOTELREGI_DOC_PATH + formData.signature);
            }

            var newEmployeesDetails = JSON.parse(formData.new_employees_details);
            $.each(newEmployeesDetails, function (key, value) {
                that.addMultipleNewEmployees(value);
            })
        }
        generateSelect2();
        datePicker();
        $('#hotel_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitHotelRenewal($('#submit_btn_for_hotelrenewal'));
            }
        });
    },
    editOrViewHotelRenewal: function (btnObj, hotelRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!hotelRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId}, getTokenData()),
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
                    that.newHotelRenewalForm(isEdit, parseData);
                } else {
                    that.viewHotelRenewalForm(parseData);
                }
            }
        });
    },
    viewHotelRenewalForm: function (parseData) {
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
        var formData = parseData.hotel_renewal_data;
        HotelRenewal.router.navigate('view_hotel_renewal_form');
        formData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#hotel_renewal_form_and_datatable_container').html(hotelRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'name_of_tourist_area');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#name_of_tourist_area').val(formData.name_of_tourist_area);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        var newEmployeesDetails = JSON.parse(formData.new_employees_details);
        $.each(newEmployeesDetails, function (key, value) {
            that.addMultipleNewEmployees(value);
            $('.view_hideen').hide();
            $('.name').attr('readonly', true);
        })

        if (formData.noc_fire != '') {
            $('#noc_fire_container_for_hotelrenewal').hide();
            $('#noc_fire_name_image_for_hotelrenewal').attr('src', HOTELREGI_DOC_PATH + formData.noc_fire);
            $('#noc_fire_name_container_for_hotelrenewal').show();
            $('#noc_fire_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_fire);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_hotelrenewal').hide();
            $('#seal_and_stamp_name_image_for_hotelrenewal').attr('src', HOTELREGI_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_hotelrenewal').show();
            $('#seal_and_stamp_download').attr("href", HOTELREGI_DOC_PATH + formData.signature);
        }
    },
    checkValidationForHotelRenewal: function (hotelData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!hotelData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', registrationNumberValidationMessage);
        }
        if (!hotelData.name_of_hotel) {
            return getBasicMessageAndFieldJSONArray('name_of_hotel', hotelNameValidationMessage);
        }
        if (!hotelData.name_of_proprietor) {
            return getBasicMessageAndFieldJSONArray('name_of_proprietor', nameOfProprietorValidationMessage);
        }
        if (!hotelData.last_valid_upto) {
            return getBasicMessageAndFieldJSONArray('last_valid_upto', dateValidationMessage);
        }
        if (!hotelData.mob_no) {
            return getBasicMessageAndFieldJSONArray('mob_no', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(hotelData.mob_no);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mob_no', invalidMobileValidationMessage);
        }
        if (!hotelData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }

        return '';
    },
    askForSubmitHotelRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'HotelRenewal.listview.submitHotelRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitHotelRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var hotelData = $('#hotel_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForHotelRenewal(hotelData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('hotelrenewal-' + validationData.field, validationData.message);
            return false;
        }

        var newEmployeesDetailsItem = [];
        var isnewemployeesValidation = false;
        $('.newemployees_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var newEmployeesDetails = {};
            var name = $('#name_' + cnt).val();
            if (name == '' || name == null) {
                $('#name_' + cnt).focus();
                validationMessageShow('hotelrenewal-' + cnt, nameValidationMessage);
                isnewemployeesValidation = true;
                return false;
            }
            newEmployeesDetails.name = name;
            newEmployeesDetailsItem.push(newEmployeesDetails);
        });

        if (isnewemployeesValidation) {
            return false;
        }

        if ($('#seal_and_stamp_container_for_hotel').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_hotel').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_hotel').focus();
                validationMessageShow('hotel_renewal-seal_and_stamp_for_hotel', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_hotel');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_hotel').focus();
                validationMessageShow('hotel_renewal-seal_and_stamp_for_hotel', sealAndStampMessage);
                return false;
            }
        }
        if (hotelData.import_from_outside == isChecked) {
            if ($('#noc_fire_container_for_hotel').is(':visible')) {
                var supportDocument = $('#noc_fire_for_hotel').val();
                if (supportDocument == '') {
                    $('#noc_fire_for_hotel').focus();
                    validationMessageShow('hotel_renewal-noc_fire_for_hotel', uploadDocumentValidationMessage);
                    return false;
                }
                var supportDocumentMessage = pdffileUploadValidation('noc_fire_for_hotel');
                if (supportDocumentMessage != '') {
                    $('#noc_fire_for_hotel').focus();
                    validationMessageShow('hotel_renewal-noc_fire_for_hotel', supportDocumentMessage);
                    return false;
                }
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_hotelrenewal') : $('#submit_btn_for_hotelrenewal');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var hotelData = new FormData($('#hotel_renewal_form')[0]);
        hotelData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        hotelData.append("newemployees_data", JSON.stringify(newEmployeesDetailsItem));
        hotelData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/submit_hotel_renewal',
            data: hotelData,
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
                validationMessageShow('hotelrenewal', textStatus.statusText);
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
                    validationMessageShow('hotelrenewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                HotelRenewal.router.navigate('hotel_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (hotelRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'HotelRenewal.listview.removeDocument(\'' + hotelRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (hotelRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/remove_document',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('hotel_renewal', textStatus.statusText);
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
                    validationMessageShow('hotel_renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == VALUE_ONE) {
                    $('#noc_fire_name_container_for_hotelrenewal').hide();
                    $('#noc_fire_name_image_for_hotelrenewal').attr('src', '');
                    $('#noc_fire_container_for_hotelrenewal').show();
                    $('#noc_fire_for_hotelrenewal').val('');
                }
                if (docType == VALUE_TWO) {
                    $('#seal_and_stamp_name_container_for_hotelrenewal').hide();
                    $('#seal_and_stamp_name_image_for_hotelrenewal').attr('src', '');
                    $('#seal_and_stamp_container_for_hotelrenewal').show();
                    $('#seal_and_stamp_for_hotelrenewal').val('');
                }

            }
        });
    },
    addMultipleNewEmployees: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#newemployees_info_container').append(newEmployeesDetailsTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeNewEmployeesInfo: function (perCnt) {
        $('#newemployees_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#hotel_renewal_id_for_hotel_renewal_form').val(hotelRenewalId);
        $('#hotel_renewal_form_pdf_form').submit();
        $('#hotel_renewal_id_for_hotel_renewal_form').val('');
    },

    openUploadChallan: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + hotelRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_renewal_data_by_hotel_renewal_id',
            type: 'post',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var hotelRenewalData = parseData.hotel_renewal_data;
                showPopup();
                if (hotelRenewalData.status != VALUE_FOUR && hotelRenewalData.status != VALUE_FIVE && hotelRenewalData.status != VALUE_SIX && hotelRenewalData.status != VALUE_SEVEN && hotelRenewalData.status != VALUE_EIGHT && hotelRenewalData.status != VALUE_ELEVEN) {
                    hotelRenewalData.show_remove_upload_btn = true;
                }
                if (hotelRenewalData.payment_type == VALUE_ONE) {
                    hotelRenewalData.utitle = 'Challan Copy';
                } else {
                    hotelRenewalData.utitle = 'Payment Details';
                }
                hotelRenewalData.module_type = VALUE_TWENTY;
                $('#popup_container').html(hotelRenewalUploadChallanTemplate(hotelRenewalData));
                loadFB(VALUE_TWENTY, parseData.fb_data, hotelRenewalData.payment_type, hotelRenewalData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'hotel_renewal_upload_challan', hotelRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'hotel_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTY);
                if (hotelRenewalData.challan != '') {
                    $('#challan_container_for_hotel_renewal_upload_challan').hide();
                    $('#challan_name_container_for_hotel_renewal_upload_challan').show();
                    $('#challan_name_href_for_hotel_renewal_upload_challan').attr('href', 'documents/hotelregi/' + hotelRenewalData.challan);
                    $('#challan_name_for_hotel_renewal_upload_challan').html(hotelRenewalData.challan);
                    $('#challan_remove_btn_for_hotel_renewal_upload_challan').attr('onclick', 'HotelRenewal.listview.removeChallan("' + hotelRenewalData.hotel_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (hotelRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/remove_challan',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId}, getTokenData()),
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
                validationMessageShow('hotel_renewal-uc', textStatus.statusText);
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
                    validationMessageShow('hotel_renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-hotel_renewal-uc').html(parseData.message);
                removeDocument('challan', 'hotel_renewal_upload_challan');
                $('#status_' + hotelRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-hotel_renewal-uc').html('');
        validationMessageHide();
        var hotelRenewalId = $('#hotel_renewal_id_for_hotel_renewal_upload_challan').val();
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_hotel_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_hotel_renewal_upload_challan_1').focus();
            validationMessageShow('hotel_renewal-uc-payment_type_for_hotel_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_hotel_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_hotel_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_hotel_renewal_upload_challan').focus();
                validationMessageShow('hotel_renewal-uc-challan_for_hotel_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_hotel_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_hotel_renewal_upload_challan').focus();
                validationMessageShow('hotel_renewal-uc-challan_for_hotel_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTY, 'hotel_renewal-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_hotel_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#hotel_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/upload_challan',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('hotel_renewal-uc', textStatus.statusText);
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
                    validationMessageShow('hotel_renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + hotelRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + hotelRenewalId).show();
                }
                $('#total_fees_' + hotelRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + hotelRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_renewal_data_by_hotel_renewal_id',
            type: 'post',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
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
                var hotelRenewalData = parseData.hotel_renewal_data;
                showPopup();
                $('#popup_container').html(hotelRenewalApproveTemplate(hotelRenewalData));
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
        var formData = $('#approve_hotel_renewal_form').serializeFormJSON();
        if (!formData.hotel_renewal_id_for_hotel_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_hotel_renewal_approve) {
            $('#registration_number_for_hotel_renewal_approve').focus();
            validationMessageShow('hotel_renewal-approve-registration_number_for_hotel_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_hotel_renewal_approve) {
            $('#valid_upto_for_hotel_renewal_approve').focus();
            validationMessageShow('hotel_renewal-approve-valid_upto_for_hotel_renewal_approve', dateValidationMessage);
            return false;
        }
        if (!formData.challan_number_for_hotel_renewal_approve) {
            $('#challan_number_for_hotel_renewal_approve').focus();
            validationMessageShow('hotel_renewal-approve-challan_number_for_hotel_renewal_approve', challanNoValidationMessage);
            return false;
        }
        if (!formData.remarks_for_hotel_renewal_approve) {
            $('#remarks_for_hotel_renewal_approve').focus();
            validationMessageShow('hotel_renewal-approve-remarks_for_hotel_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/approve_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('hotel_renewal-approve', textStatus.statusText);
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
                    validationMessageShow('hotel_renewal-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.hotel_renewal_id_for_hotel_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.hotel_renewal_id_for_hotel_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.hotel_renewal_id_for_hotel_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.hotel_renewal_id_for_hotel_renewal_approve).show();
                $('#so_status_' + formData.hotel_renewal_id_for_hotel_renewal_approve).html(dateTimeDays(formData.hotel_renewal_id_for_hotel_renewal_approve, parseData, VALUE_TWENTY));
            }
        });
    },
    askForRejectApplication: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + hotelRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_renewal_data_by_hotel_renewal_id',
            type: 'post',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
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
                var hotelRenewalData = parseData.hotel_renewal_data;
                showPopup();
                $('#popup_container').html(hotelRenewalRejectTemplate(hotelRenewalData));
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
        var formData = $('#reject_hotel_renewal_form').serializeFormJSON();
        if (!formData.hotel_renewal_id_for_hotel_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_hotel_renewal_reject) {
            $('#remarks_for_hotel_renewal_reject').focus();
            validationMessageShow('hotel_renewal-reject-remarks_for_hotel_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotel_renewal/reject_application',
            data: $.extend({}, formData, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                validationMessageShow('hotel_renewal-reject', textStatus.statusText);
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
                    validationMessageShow('hotel_renewal-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.hotel_renewal_id_for_hotel_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.hotel_renewal_id_for_hotel_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.hotel_renewal_id_for_hotel_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.hotel_renewal_id_for_hotel_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.hotel_renewal_id_for_hotel_renewal_reject).remove();
                $('#so_status_' + formData.hotel_renewal_id_for_hotel_renewal_reject).html(dateTimeDays(formData.hotel_renewal_id_for_hotel_renewal_reject, parseData, VALUE_TWENTY));
            }
        });
    },
    generateCertificate: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#hotel_renewal_id_for_certificate').val(hotelRenewalId);
        $('#hotel_renewal_certificate_pdf_form').submit();
        $('#hotel_renewal_id_for_certificate').val('');
    },
    getQueryData: function (hotelRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!hotelRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTY;
        templateData.module_id = hotelRenewalId;
        var btnObj = $('#query_btn_for_hotelrenewal' + hotelRenewalId);
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
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTY, moduleData.hotel_renewal_id);
                tmpData.applicant_name = moduleData.name_of_hotel;
                tmpData.title = 'Hotel Name';
                tmpData.module_type = VALUE_TWENTY;
                tmpData.module_id = hotelRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getHotelData: function (btnObj) {
        var license_number = $('#registration_number').val();
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_data_by_id',
            type: 'post',
            data: $.extend({}, {'license_number': license_number}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
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
                hotelData = parseData.hotel_data;
                if (hotelData == null) {
                    $('#hotelregi_id').val('');
                    $('#name_of_hotel').val('');
                    $('#name_of_proprietor').val('');
                    $('#registration_number').val('');
                    $('#last_valid_upto').val('');
                    $('#fees').attr('readonly', true);
                    $('#fees').val('');
                    $('#mob_no').val('');
                    $('#name_of_tourist_area').val('');
                    //showError(licenseNoNotAvailable);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                }
                if (hotelData) {
                    $('#hotelregi_id').val(hotelData.hotelregi_id);
                    $('#name_of_hotel').val(hotelData.name_of_hotel);
                    $('#name_of_proprietor').val(hotelData.name_of_proprietor);
                    $('#registration_number').val(hotelData.registration_number);
                    var last_valid_upto = dateTo_DD_MM_YYYY(hotelData.last_valid_upto);
                    if (hotelData.last_valid_upto != '0000-00-00') {
                        $('#last_valid_upto').val(last_valid_upto);
                    } else {
                        $('#last_valid_upto').val('');
                    }
                    $('#fees').attr('readonly', true);
                    $('#fees').val(hotelData.fees);
                    $('#mob_no').val(hotelData.mob_no);
                    renderOptionsForTwoDimensionalArray(talukaArray, 'name_of_tourist_area');
                    $('#name_of_tourist_area').val(hotelData.name_of_tourist_area);
                }
            }
        });
    },
    viewPayment: function (hotelRenewalId) {
        if (!hotelRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + hotelRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotel_renewal/get_hotel_renewal_data_by_hotel_renewal_id',
            type: 'post',
            data: $.extend({}, {'hotel_renewal_id': hotelRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                if (!textStatus.statusText) {
                    loginPage();
                    return false;
                }
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
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
                var hotelRenewalData = parseData.hotel_renewal_data;
                showPopup();
                if (hotelRenewalData.payment_type == VALUE_ONE || hotelRenewalData.payment_type == VALUE_THREE) {
                    hotelRenewalData.user_payment_type_text = paymentTypeArray[hotelRenewalData.payment_type];
                } else {
                    hotelRenewalData.user_payment_type_text = userPaymentTypeArray[hotelRenewalData.user_payment_type] ? userPaymentTypeArray[hotelRenewalData.user_payment_type] : '';
                }
                if (hotelRenewalData.payment_type == VALUE_ONE) {
                    hotelRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (hotelRenewalData.payment_type == VALUE_TWO && hotelRenewalData.user_payment_type == VALUE_ONE) {
                    hotelRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                hotelRenewalData.module_type = VALUE_TWENTY;
                $('#popup_container').html(hotelRenewalViewPaymentTemplate(hotelRenewalData));
                loadFB(VALUE_TWENTY, parseData.fb_data, hotelRenewalData.payment_type);
                loadPH(VALUE_TWENTY, hotelRenewalData.hotel_renewal_id, parseData.ph_data);
                if (hotelRenewalData.payment_type == VALUE_ONE || (hotelRenewalData.payment_type == VALUE_TWO && hotelRenewalData.user_payment_type == VALUE_ONE)) {
                    if (hotelRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_hotel_renewal').show();
                        $('#fees_paid_challan_name_href_for_hotel_renewal').attr('href', HOTELREGI_DOC_PATH + hotelRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_hotel_renewal').html(hotelRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
