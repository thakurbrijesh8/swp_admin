var propertyListTemplate = Handlebars.compile($('#property_list_template').html());
var propertyTableTemplate = Handlebars.compile($('#property_table_template').html());
var propertyActionTemplate = Handlebars.compile($('#property_action_template').html());
var propertyFormTemplate = Handlebars.compile($('#property_form_template').html());
var propertyViewTemplate = Handlebars.compile($('#property_view_template').html());
var propertyUploadChallanTemplate = Handlebars.compile($('#property_upload_challan_template').html());
var propertyApproveTemplate = Handlebars.compile($('#property_approve_template').html());
var propertyRejectTemplate = Handlebars.compile($('#property_reject_template').html());
var propertyViewPaymentTemplate = Handlebars.compile($('#property_view_payment_template').html());

var appointmentFormTemplate = Handlebars.compile($('#appointment_form_template').html());
var AppointmentViewTemplate = Handlebars.compile($('#appointment_view_template').html());
var appointmentSlipTemplate = Handlebars.compile($('#appointment_slip_template').html());

var tempDetailCnt = 1;
var tempEquipCnt = 1;
var tempShareCnt = 1;

var Property = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Property.Router = Backbone.Router.extend({
    routes: {
        'property': 'renderList',
        'property_form': 'renderListForForm',
        'edit_property_form': 'renderList',
        'view_property_form': 'renderList',
        'appointment_form/:id': 'renderList',
    },
    renderList: function () {
        Property.listview.listPage();
    },
    renderListForForm: function () {
        Property.listview.listPagePropertyForm();
    }
});
Property.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="pancard_all_parties"]': 'hasPanCard',
    },
    hasPanCard: function (event) {
        var val = $('input[name=pancard_all_parties]:checked').val();
        if (val === '1') {
            this.$('.pancard_all_parties_div').show();
        } else {
            this.$('.pancard_all_parties_div').hide();

        }
    },

    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_psfregistration');
        addClass('property', 'active');
        Property.router.navigate('property');
        var templateData = {};
        this.$el.html(propertyListTemplate(templateData));
        this.loadPropertyData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPagePropertyForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_psfregistration');
        addClass('property', 'active');
        this.$el.html(propertyListTemplate);
        this.newPropertyForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return propertyActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYONE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return propertyActionTemplate(rowData);
    },
    loadPropertyData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.party_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.party_address;
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
                return regNoRenderer(VALUE_TWENTYONE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_TWENTYONE, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYONE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['property_data'], function (index, objData) {
                json['property_data'][index]['query_movement_string'] = qmData[objData.property_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.property_id] + '</table>') : '-';
            });
            return json['property_data'];
        };
        var that = this;
        showTableContainer('property');
        Property.router.navigate('property');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Property.listview.loadPropertyData();');
        $('#property_form_and_datatable_container').html(propertyTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_property_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_property_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_property_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_property_list', false);
        allowOnlyIntegerValue('mobile_number_for_property_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_property_list', false);
        $('#district_for_property_list').val(searchData.search_district);
        $('#status_for_property_list').val(searchData.search_status);
        $('#app_timing_for_property_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_property_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_property_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_property_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_property_list').attr('disabled', 'disabled');
        }
        propertyDataTable = $('#property_datatable').DataTable({
            ajax: {url: 'property/get_property_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'property_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'property_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'property_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'property_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
        $('#property_datatable_filter').remove();
        $('#property_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = propertyDataTable.row(tr);

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
    newPropertyForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.property_data;
            Property.router.navigate('edit_property_form');
        } else {
            var formData = {};
            Property.router.navigate('property_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.AT_WILL = AT_WILL;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.VALUE_SEVEN = VALUE_SEVEN;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VALUE_FIVE = VALUE_FIVE;
        templateData.VALUE_SIX = VALUE_SIX;
        templateData.VALUE_SEVEN = VALUE_SEVEN;
        templateData.property_data = parseData.property_data;
        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.property_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('property');
        $('#property_form_and_datatable_container').html(propertyFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        generateBoxes('radio', partyTypeArray, 'party_type', 'property_data', formData.party_type, false);
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#document_type').val(formData.document_type);

            if (formData.pancard_all_parties == isChecked) {
                $('#pancard_all_parties').attr('checked', 'checked');
                this.$('.pancard_all_parties_div').show();
            }

            if (formData.pan_card != '') {
                $('#pan_card_container_for_property').hide();
                $('#pan_card_name_image_for_property').attr('src', PROPERTY_DOC_PATH + formData.pan_card);
                $('#pan_card_name_container_for_property').show();
                $('#pan_card_name_download').attr("href", PROPERTY_DOC_PATH + formData.pan_card);
            }
            if (formData.aadhaar_card != '') {
                $('#aadhaar_card_container_for_property').hide();
                $('#aadhaar_card_name_image_for_property').attr('src', PROPERTY_DOC_PATH + formData.aadhaar_card);
                $('#aadhaar_card_name_container_for_property').show();
                $('#aadhaar_card_name_download').attr("href", PROPERTY_DOC_PATH + formData.aadhaar_card);
            }
        }
        generateSelect2();
        datePicker();
        $('#property_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitProperty($('#submit_btn_for_property'));
            }
        });
    },

    appointmentForm: function (appointmentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        Property.router.navigate('appointment_form/' + appointmentData.encrypt_id);
        appointmentData.is_checked = isChecked;
        appointmentData.VALUE_ONE = VALUE_ONE;
        appointmentData.VALUE_TWO = VALUE_TWO;
        appointmentData.VALUE_THREE = VALUE_THREE;
        appointmentData.VALUE_FOUR = VALUE_FOUR;
        appointmentData.VALUE_FIVE = VALUE_FIVE;
        appointmentData.VALUE_SIX = VALUE_SIX;
        appointmentData.VALUE_SEVEN = VALUE_SEVEN;
        appointmentData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;

        $('#property_form_and_datatable_container').html(appointmentFormTemplate(appointmentData));
        $('#select_time').val(appointmentData.select_time);

        generateBoxes('radio', appointmentData.dates_array, 'appointment_date', 'appointment', appointmentData.appointment_date, true);

        datePicker();
        $('#appointment_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                //that.submitRoadDetails();
            }
        });
    },
    editOrViewProperty: function (btnObj, propertyId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!propertyId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_property_data_by_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId}, getTokenData()),
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
                    that.newPropertyForm(isEdit, parseData);
                } else {
                    that.viewPropertyForm(parseData);
                }
            }
        });
    },
    editOrViewAppointment: function (btnObj, propertyId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        if (!propertyId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_appointment_data_by_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId}, getTokenData()),
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
                $('#property_id').val(parseData.encrypt_id);
                if (isEdit) {
                    that.appointmentForm(parseData.appointment_data);
                } else {
                    that.viewAppointmentForm(parseData);
                }
            }
        });
    },
    viewPropertyForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.property_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        Property.router.navigate('view_property_form');
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);

        showFormContainer('property');
        $('#property_form_and_datatable_container').html(propertyViewTemplate((formData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        generateBoxes('radio', partyTypeArray, 'party_type', 'property_data', formData.party_type, false);
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#document_type').val(formData.document_type);

        if (formData.pancard_all_parties == isChecked) {
            $('#pancard_all_parties').attr('checked', 'checked');
            this.$('.pancard_all_parties_div').show();
        }

        if (formData.pan_card != '') {
            $('#pan_card_container_for_property').hide();
            $('#pan_card_name_image_for_property').attr('src', PROPERTY_DOC_PATH + formData.pan_card);
            $('#pan_card_name_container_for_property').show();
            $('#pan_card_name_download').attr("href", PROPERTY_DOC_PATH + formData.pan_card);
        }
        if (formData.aadhaar_card != '') {
            $('#aadhaar_card_container_for_property').hide();
            $('#aadhaar_card_name_image_for_property').attr('src', PROPERTY_DOC_PATH + formData.aadhaar_card);
            $('#aadhaar_card_name_container_for_property').show();
            $('#aadhaar_card_name_download').attr("href", PROPERTY_DOC_PATH + formData.aadhaar_card);
        }
    },
    viewAppointmentForm: function (parseData, appointmentData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        var formData = parseData.appointment_data;
        Property.router.navigate('view_property_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#property_form_and_datatable_container').html(AppointmentViewTemplate(formData));
        $('#select_time').val(formData.select_time);

        $('#appointment_date').val(formData.appointment_date);

    },
    checkValidationForProperty: function (propertyData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!propertyData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!propertyData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!propertyData.party_type_for_property_data) {
            return getBasicMessageAndFieldJSONArray('party_type_for_property_data', partyTypeNameValidationMessage);
        }
        if (!propertyData.document_type) {
            return getBasicMessageAndFieldJSONArray('document_type', documentTypeValidationMessage);
        }
        if (!propertyData.party_name) {
            return getBasicMessageAndFieldJSONArray('party_name', partyNameValidationMessage);
        }
        if (!propertyData.party_address) {
            return getBasicMessageAndFieldJSONArray('party_address', partyAddressNameValidationMessage);
        }
        if (!propertyData.digit_mobile_number) {
            return getBasicMessageAndFieldJSONArray('digit_mobile_number', mobileValidationMessage);
        }
        if (!propertyData.email) {
            return getBasicMessageAndFieldJSONArray('email', emailValidationMessage);
        }
        if (!propertyData.document) {
            return getBasicMessageAndFieldJSONArray('document', propertyDescriptionValidationMessage);
        }
        return '';
    },
    submitProperty: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        var that = this;
        validationMessageHide();
        var propertyData = $('#property_form').serializeFormJSON();
        var validationData = that.checkValidationForProperty(propertyData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('property-' + validationData.field, validationData.message);
            return false;
        }

        if (propertyData.pancard_all_parties == isChecked) {
            if ($('#pan_card_container_for_property').is(':visible')) {
                var pancard = $('#pan_card_for_property').val();
                if (pancard == '') {
                    $('#pan_card_for_property').focus();
                    validationMessageShow('property-pan_card_for_property', uploadDocumentValidationMessage);
                    return false;
                }
                var pancardMessage = imagefileUploadValidation('pan_card_for_property', 2048);
                if (pancardMessage != '') {
                    $('#pan_card_for_property').focus();
                    validationMessageShow('property-pan_card_for_property', pancardMessage);
                    return false;
                }
            }
        }

        if ($('#aadhaar_card_container_for_property').is(':visible')) {
            var aadhaar = $('#aadhaar_card_for_property').val();
            if (aadhaar == '') {
                $('#aadhaar_card_for_property').focus();
                validationMessageShow('property-aadhaar_card_for_property', uploadDocumentValidationMessage);
                return false;
            }
            var aadhaarMessage = imagefileUploadValidation('aadhaar_card_for_property', 2048);
            if (aadhaarMessage != '') {
                $('#aadhaar_card_for_property').focus();
                validationMessageShow('property-aadhaar_card_for_property', aadhaarMessage);
                return false;
            }
        }

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_property');
        var btnObj = $('#submit_btn_for_property');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var propertyData = new FormData($('#property_form')[0]);
        propertyData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //  propertyData.append("proprietor_share_data", JSON.stringify(proprietorShareInfoItem));
        propertyData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'property/submit_property',
            data: propertyData,
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
                validationMessageShow('property', textStatus.statusText);
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
                    validationMessageShow('property', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#property_id').val(parseData.encrypt_id);
                that.appointmentForm(parseData.appointment_data);
            }
        });
    },
    askForSubmitProperty: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Property.listview.submitAppointment(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    checkValidationForAppointment: function (appointmentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!appointmentData.appointment_date_for_appointment) {
            return getBasicMessageAndFieldJSONArray('appointment_date_for_appointment', appoinmentdateValidation);
        }
        if (!appointmentData.select_time) {
            return getBasicMessageAndFieldJSONArray('select_time', selectTimeValidationMessage);
        }

        return '';
    },
    submitAppointment: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        var that = this;
        validationMessageHide();
        var appointmentData = $('#appointment_form').serializeFormJSON();
        var validationData = that.checkValidationForAppointment(appointmentData);
        if (validationData != '') {
            //  $('#' + validationData.field).focus();
            validationMessageShow('appointment-' + validationData.field, validationData.message);
            return false;
        }

        //var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_single_return') : $('#submit_btn_for_property');
        var btnObj = $('#submit_btn_for_appointment_form');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var appointmentData = new FormData($('#appointment_form')[0]);
        appointmentData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        appointmentData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'property/submit_appointment',
            data: appointmentData,
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
                validationMessageShow('property', textStatus.statusText);
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
                    validationMessageShow('property', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Property.router.navigate('property', {'trigger': true});
                // if (moduleType == VALUE_TWO)
                // {
                //    // Property.router.navigate('property', {'trigger': true});
                //    that.showAppointmentSlip(parseData);
                // }

            }
        });
    },
    //  showAppointmentSlip: function(parseData)
    // {
    //     console.log(parseData);
    //     var templateData = {};
    //     templateData.appointment_data = parseData.appointment_data;
    //     templateData.property_data = parseData.property_data;
    //     $('#model_title') .html('Appointment Slip');
    //     $('#model_body') .html (appointmentSlipTemplate(templateData));
    //     $('#popup_modal') .modal('show');
    // },
    askForRemove: function (propertyId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        validationMessageHide();
        if (!property_id) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Property.listview.removeDocument(\'' + property_id + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (property_id) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        //  if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR) {
        //     Dashboard.router.navigate('dashboard', {trigger: true});
        //     return false;
        // }
        validationMessageHide();
        if (!property_id) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'property/remove_document',
            data: $.extend({}, {'property_id': property_id}, getTokenData()),
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
                validationMessageShow('property', textStatus.statusText);
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
                    validationMessageShow('property', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#seal_and_stamp_name_container_for_property').hide();
                $('#seal_and_stamp_name_image_for_property').attr('src', '');
                $('#seal_and_stamp_container_for_property').show();
                $('#seal_and_stamp_for_property').val('');
            }
        });
    },
    generateForm1: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#property_id_for_property_form1').val(propertyId);
        $('#property_form1_pdf_form').submit();
        $('#property_id_for_property_form1').val('');
    },
    openUploadChallan: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + propertyId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_property_data_by_property_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var propertyData = parseData.property_data;
                showPopup();
                if (propertyData.status != VALUE_FOUR && propertyData.status != VALUE_FIVE && propertyData.status != VALUE_SIX && propertyData.status != VALUE_SEVEN && propertyData.status != VALUE_EIGHT) {
                    propertyData.show_remove_upload_btn = true;
                }
                if (propertyData.payment_type == VALUE_ONE) {
                    propertyData.utitle = 'Challan Copy';
                } else {
                    propertyData.utitle = 'Payment Details';
                }
                if (propertyData.status != VALUE_FOUR && propertyData.status != VALUE_FIVE && propertyData.status != VALUE_SIX) {
                    propertyData.show_remove_upload_btn = true;
                }
                propertyData.module_type = VALUE_TWENTYONE;
                $('#popup_container').html(propertyUploadChallanTemplate(propertyData));
                loadFB(VALUE_TWENTYONE, parseData.fb_data, propertyData.payment_type, propertyData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'property_upload_challan', propertyData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'property_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYONE);
                if (propertyData.challan != '') {
                    $('#challan_container_for_property_upload_challan').hide();
                    $('#challan_name_container_for_property_upload_challan').show();
                    $('#challan_name_href_for_property_upload_challan').attr('href', 'documents/property/' + propertyData.challan);
                    $('#challan_name_for_property_upload_challan').html(propertyData.challan);
                    $('#challan_remove_btn_for_property_upload_challan').attr('onclick', 'Property.listview.removeChallan("' + propertyData.property_id + '")');
                }
            }
        });
    },
    removeChallan: function (propertyId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'property/remove_challan',
            data: $.extend({}, {'property_id': propertyId}, getTokenData()),
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
                validationMessageShow('property-uc', textStatus.statusText);
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
                    validationMessageShow('property-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-property-uc').html(parseData.message);
                removeDocument('challan', 'property_upload_challan');
                $('#status_' + propertyId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-property-uc').html('');
        validationMessageHide();
        var propertyId = $('#property_id_for_property_upload_challan').val();
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_property_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_property_upload_challan_1').focus();
            validationMessageShow('property-uc-payment_type_for_property_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_property_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_property_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_property_upload_challan').focus();
                validationMessageShow('property-uc-challan_for_property_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_property_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_property_upload_challan').focus();
                validationMessageShow('property-uc-challan_for_property_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYONE, 'property-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_property_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#property_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'property/upload_challan',
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
                validationMessageShow('property-uc', textStatus.statusText);
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
                    validationMessageShow('property-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + propertyId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + propertyId).show();
                }
                $('#total_fees_' + propertyId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_property_' + propertyId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_property_data_by_property_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId}, getTokenData()),
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
                var propertyData = parseData.property_data;
                showPopup();
                $('#popup_container').html(propertyApproveTemplate(propertyData));
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
        var formData = $('#approve_property_form').serializeFormJSON();
        if (!formData.property_id_for_property_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_property_approve) {
            $('#registration_number_for_property_approve').focus();
            validationMessageShow('property-approve-registration_number_for_property_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_property_approve) {
            $('#valid_upto_for_property_approve').focus();
            validationMessageShow('property-approve-valid_upto_for_property_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_property_approve) {
            $('#remarks_for_property_approve').focus();
            validationMessageShow('property-approve-remarks_for_property_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'property/approve_application',
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
                validationMessageShow('property-approve', textStatus.statusText);
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
                    validationMessageShow('property-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.property_id_for_property_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.property_id_for_property_approve).remove();
                $('#approve_btn_for_app_' + formData.property_id_for_property_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.property_id_for_property_approve).show();
                $('#so_status_' + formData.property_id_for_property_approve).html(dateTimeDays(formData.property_id_for_property_approve, parseData, VALUE_TWENTYONE));
            }
        });
    },
    askForRejectApplication: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_property_' + propertyId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_property_data_by_property_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId}, getTokenData()),
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
                var propertyData = parseData.property_data;
                showPopup();
                $('#popup_container').html(propertyRejectTemplate(propertyData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_property_form').serializeFormJSON();
        if (!formData.property_id_for_property_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_property_reject) {
            $('#remarks_for_property_reject').focus();
            validationMessageShow('property-reject-remarks_for_property_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'property/reject_application',
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
                validationMessageShow('property-reject', textStatus.statusText);
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
                    validationMessageShow('property-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.property_id_for_property_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.property_id_for_property_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.property_id_for_property_reject).remove();
                $('#reject_btn_for_app_' + formData.property_id_for_property_reject).remove();
                $('#approve_btn_for_app_' + formData.property_id_for_property_reject).remove();
                $('#so_status_' + formData.property_id_for_property_reject).html(dateTimeDays(formData.property_id_for_property_reject, parseData, VALUE_TWENTYONE));
            }
        });
    },
    generateCertificate: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#property_id_for_certificate').val(propertyId);
        $('#property_certificate_pdf_form').submit();
        $('#property_id_for_certificate').val('');
    },
    getQueryData: function (propertyId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!propertyId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYONE;
        templateData.module_id = propertyId;
        var btnObj = $('#query_btn_for_property_' + propertyId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYONE, moduleData.property_id);
                tmpData.applicant_name = moduleData.party_name;
                tmpData.title = 'Party Name';
                tmpData.module_type = VALUE_TWENTYONE;
                tmpData.module_id = propertyId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (propertyId) {
        if (!propertyId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + propertyId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'property/get_property_data_by_property_id',
            type: 'post',
            data: $.extend({}, {'property_id': propertyId, load_fb_details: VALUE_TWO}, getTokenData()),
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
                var propertyData = parseData.property_data;
                showPopup();
                if (propertyData.payment_type == VALUE_ONE || propertyData.payment_type == VALUE_THREE) {
                    propertyData.user_payment_type_text = paymentTypeArray[propertyData.payment_type];
                } else {
                    propertyData.user_payment_type_text = userPaymentTypeArray[propertyData.user_payment_type] ? userPaymentTypeArray[propertyData.user_payment_type] : '';
                }
                if (propertyData.payment_type == VALUE_ONE) {
                    propertyData.utitle = 'Fees Paid Challan Copy';
                } else if (propertyData.payment_type == VALUE_TWO && propertyData.user_payment_type == VALUE_ONE) {
                    propertyData.utitle = 'Demand Draft (DD) Copy';
                }
                propertyData.module_type = VALUE_TWENTYONE;
                $('#popup_container').html(propertyViewPaymentTemplate(propertyData));
                loadFB(VALUE_TWENTYONE, parseData.fb_data, propertyData.payment_type);
                loadPH(VALUE_TWENTYONE, propertyData.property_id, parseData.ph_data);
                if (propertyData.payment_type == VALUE_ONE || (propertyData.payment_type == VALUE_TWO && propertyData.user_payment_type == VALUE_ONE)) {
                    if (propertyData.fees_paid_challan != '') {
                        $('#vp_container_for_property').show();
                        $('#fees_paid_challan_name_href_for_property').attr('href', PROPERTY_DOC_PATH + propertyData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_property').html(propertyData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
