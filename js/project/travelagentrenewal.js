var travelagentRenewalListTemplate = Handlebars.compile($('#travelagent_renewal_list_template').html());
var travelagentRenewalTableTemplate = Handlebars.compile($('#travelagent_renewal_table_template').html());
var travelagentRenewalActionTemplate = Handlebars.compile($('#travelagent_renewal_action_template').html());
var travelagentRenewalFormTemplate = Handlebars.compile($('#travelagent_renewal_form_template').html());
var travelagentRenewalViewTemplate = Handlebars.compile($('#travelagent_renewal_view_template').html());
var travelagentRenewalProprietorInfoTemplate = Handlebars.compile($('#travelagent_renewal_proprietor_info_template').html());
var travelagentRenewalUploadChallanTemplate = Handlebars.compile($('#travelagent_renewal_upload_challan_template').html());
var travelagentRenewalApproveTemplate = Handlebars.compile($('#travelagent_renewal_approve_template').html());
var travelagentRenewalRejectTemplate = Handlebars.compile($('#travelagent_renewal_reject_template').html());
var travelagentRenewalViewPaymentTemplate = Handlebars.compile($('#travelagent_renewal_view_payment_template').html());

var temptravelagentRenewalProprietorInfoCnt = 1;

var TravelagentRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
TravelagentRenewal.Router = Backbone.Router.extend({
    routes: {
        'travelagent_renewal': 'renderList',
        'travelagent_renewal_form': 'renderListForForm',
        'edit_travelagent_renewal_form': 'renderList',
        'view_travelagent_renewal_form': 'renderList',
    },
    renderList: function () {
        TravelagentRenewal.listview.listPage();
    },
    renderListForForm: function () {
        TravelagentRenewal.listview.listPageTravelagentRenewalForm();
    }
});
TravelagentRenewal.listView = Backbone.View.extend({
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
        addClass('travelagent_renewal', 'active');
        TravelagentRenewal.router.navigate('travelagent_renewal');
        var templateData = {};
        this.$el.html(travelagentRenewalListTemplate(templateData));
        this.loadTravelagentRenewalData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageTravelagentRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        addClass('travelagent_renewal', 'active');
        this.$el.html(travelagentRenewalListTemplate);
        this.newTravelagentRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return travelagentRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_TWENTYTHREE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return travelagentRenewalActionTemplate(rowData);
    },
    loadTravelagentRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_travel_agency + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.address_of_agency;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_TWENTYTHREE, data, full.area_of_agency, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_TWENTYTHREE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['travelagent_renewal_data'], function (index, objData) {
                json['travelagent_renewal_data'][index]['query_movement_string'] = qmData[objData.travelagent_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.travelagent_renewal_id] + '</table>') : '-';
            });
            return json['travelagent_renewal_data'];
        };
        var that = this;
        TravelagentRenewal.router.navigate('travelagent_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'TravelagentRenewal.listview.loadTravelagentRenewalData();');
        $('#travelagent_renewal_form_and_datatable_container').html(travelagentRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_travelagent_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_travelagent_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_travelagent_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_travelagent_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_travelagent_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_travelagent_renewal_list', false);
        $('#district_for_travelagent_renewal_list').val(searchData.search_district);
        $('#status_for_travelagent_renewal_list').val(searchData.search_status);
        $('#app_timing_for_travelagent_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_travelagent_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_travelagent_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_travelagent_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_travelagent_renewal_list').attr('disabled', 'disabled');
        }
        travelagentDataTable = $('#travelagent_renewal_datatable').DataTable({
            ajax: {url: 'travelagent_renewal/get_travelagent_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'travelagent_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'travelagent_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'travelagent_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'travelagent_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#travelagent_renewal_datatable tbody').on('click', 'td.details-control', function () {
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
    newTravelagentRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.travelagent_renewal_data;
            TravelagentRenewal.router.navigate('edit_travelagent_renewal_form');
        } else {
            var formData = {};
            TravelagentRenewal.router.navigate('travelagent_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.TRAVEL_AGENCY_FEES = TRAVEL_AGENCY_FEES;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.travelagentrenewal_data = parseData.travelagent_renewal_data;
        templateData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        $('#travelagent_renewal_form_and_datatable_container').html(travelagentRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'area_of_agency');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#area_of_agency').val(formData.area_of_agency);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_travelagentrenewal').hide();
                $('#seal_and_stamp_name_image_for_travelagentrenewal').attr('src', TRAVELAGENT_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_travelagentrenewal').show();
                $('#seal_and_stamp_download').attr("href", TRAVELAGENT_DOC_PATH + formData.signature);
            }

            var proprietorInfo = JSON.parse(formData.name_of_proprietor);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })
        }
        generateSelect2();
        datePicker();
        $('#travelagent_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitTravelagentRenewal($('#submit_btn_for_travelagentrenewal'));
            }
        });
    },
    editOrViewTravelagentRenewal: function (btnObj, travelagentRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!travelagentRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent_renewal/get_travelagent_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId}, getTokenData()),
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
                    that.newTravelagentRenewalForm(isEdit, parseData);
                } else {
                    that.viewTravelagentRenewalForm(parseData);
                }
            }
        });
    },
    viewTravelagentRenewalForm: function (parseData) {
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
        var formData = parseData.travelagent_renewal_data;
        TravelagentRenewal.router.navigate('view_travelagent_renewal_form');
        formData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        formData.TRAVEL_AGENCY_FEES = TRAVEL_AGENCY_FEES;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#travelagent_renewal_form_and_datatable_container').html(travelagentRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'area_of_agency');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#area_of_agency').val(formData.area_of_agency);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        var proprietorInfo = JSON.parse(formData.name_of_proprietor);
        $.each(proprietorInfo, function (key, value) {
            that.addMultipleProprietor(value);
            $('.view_hideen').hide();
            $('.name').attr('readonly', true);
        })

        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_travelagentrenewal').hide();
            $('#seal_and_stamp_name_image_for_travelagentrenewal').attr('src', TRAVELAGENT_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_travelagentrenewal').show();
            $('#seal_and_stamp_download').attr("href", TRAVELAGENT_DOC_PATH + formData.signature);
        }
    },
    checkValidationForTravelagentRenewal: function (travelagentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!travelagentData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!travelagentData.name_of_travel_agency) {
            return getBasicMessageAndFieldJSONArray('name_of_travel_agency', travelAgencyNameValidationMessage);
        }
        if (!travelagentData.address_of_agency) {
            return getBasicMessageAndFieldJSONArray('address_of_agency', addressOfAgencyValidationMessage);
        }
        if (!travelagentData.last_valid_upto) {
            return getBasicMessageAndFieldJSONArray('last_valid_upto', dateValidationMessage);
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
    askForSubmitTravelagentRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'TravelagentRenewal.listview.submitTravelagentRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitTravelagentRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var travelagentData = $('#travelagent_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForTravelagentRenewal(travelagentData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('travelagentrenewal-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        var isproprietorValidation = false;
        $('.proprietor_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var proprietorInfo = {};
            var name = $('#name_' + cnt).val();
            if (name == '' || name == null) {
                $('#name_' + cnt).focus();
                validationMessageShow('travelagentrenewal-' + cnt, nameValidationMessage);
                isproprietorValidation = true;
                return false;
            }
            proprietorInfo.name = name;
            proprietorInfoItem.push(proprietorInfo);
        });

        if (isproprietorValidation) {
            return false;
        }

        if ($('#seal_and_stamp_container_for_travelagent').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_travelagent').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_travelagent').focus();
                validationMessageShow('travelagent-seal_and_stamp_for_travelagent', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_travelagent');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_travelagent').focus();
                validationMessageShow('travelagent-seal_and_stamp_for_travelagent', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_travelagentrenewal') : $('#submit_btn_for_travelagentrenewal');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var travelagentData = new FormData($('#travelagent_renewal_form')[0]);
        travelagentData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        travelagentData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        travelagentData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/submit_travelagent_renewal',
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
                TravelagentRenewal.router.navigate('travelagent_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (travelagentRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'TravelagentRenewal.listview.removeDocument(\'' + travelagentRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (travelagentRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/remove_document',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId, 'document_type': docType}, getTokenData()),
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
                if (docType == VALUE_ONE) {
                    $('#noc_fire_name_container_for_travelagentrenewal').hide();
                    $('#noc_fire_name_image_for_travelagentrenewal').attr('src', '');
                    $('#noc_fire_container_for_travelagentrenewal').show();
                    $('#noc_fire_for_travelagentrenewal').val('');
                }
                if (docType == VALUE_TWO) {
                    $('#seal_and_stamp_name_container_for_travelagentrenewal').hide();
                    $('#seal_and_stamp_name_image_for_travelagentrenewal').attr('src', '');
                    $('#seal_and_stamp_container_for_travelagentrenewal').show();
                    $('#seal_and_stamp_for_travelagentrenewal').val('');
                }

            }
        });
    },
    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = temptravelagentRenewalProprietorInfoCnt;
        $('#proprietor_info_container').append(travelagentRenewalProprietorInfoTemplate(templateData));
        temptravelagentRenewalProprietorInfoCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm: function (travelagentRenewalId) {
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#travelagent_renewal_id_for_travelagent_renewal_form').val(travelagentRenewalId);
        $('#travelagent_renewal_form_pdf_form').submit();
        $('#travelagent_renewal_id_for_travelagent_renewal_form').val('');
    },

    openUploadChallan: function (travelagentRenewalId) {
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + travelagentRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent_renewal/get_travelagent_renewal_data_by_travelagent_renewal_id',
            type: 'post',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var travelagentRenewalData = parseData.travelagent_renewal_data;
                showPopup();
                if (travelagentRenewalData.status != VALUE_FOUR && travelagentRenewalData.status != VALUE_FIVE && travelagentRenewalData.status != VALUE_SIX && travelagentRenewalData.status != VALUE_SEVEN && travelagentRenewalData.status != VALUE_EIGHT) {
                    travelagentRenewalData.show_remove_upload_btn = true;
                }
                if (travelagentRenewalData.payment_type == VALUE_ONE) {
                    travelagentRenewalData.utitle = 'Challan Copy';
                } else {
                    travelagentRenewalData.utitle = 'Payment Details';
                }
                travelagentRenewalData.module_type = VALUE_TWENTYTHREE;
                $('#popup_container').html(travelagentRenewalUploadChallanTemplate(travelagentRenewalData));
                loadFB(VALUE_TWENTYTHREE, parseData.fb_data, travelagentRenewalData.payment_type, travelagentRenewalData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'travelagent_renewal_upload_challan', travelagentRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'travelagent_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_TWENTYTHREE);
                if (travelagentRenewalData.challan != '') {
                    $('#challan_container_for_travelagent_renewal_upload_challan').hide();
                    $('#challan_name_container_for_travelagent_renewal_upload_challan').show();
                    $('#challan_name_href_for_travelagent_renewal_upload_challan').attr('href', 'documents/travelagent/' + travelagentRenewalData.challan);
                    $('#challan_name_for_travelagent_renewal_upload_challan').html(travelagentRenewalData.challan);
                    $('#challan_remove_btn_for_travelagent_renewal_upload_challan').attr('onclick', 'TravelagentRenewal.listview.removeChallan("' + travelagentRenewalData.travelagent_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (travelagentRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/remove_challan',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId}, getTokenData()),
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
                removeDocument('challan', 'travelagent_renewal_upload_challan');
                $('#status_' + travelagentRenewalId).html(appStatusArray[VALUE_TWO]);
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
        var travelagentRenewalId = $('#travelagent_renewal_id_for_travelagent_renewal_upload_challan').val();
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_travelagent_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_travelagent_renewal_upload_challan_1').focus();
            validationMessageShow('travelagent_renewal-uc-payment_type_for_travelagent_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_travelagent_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_travelagent_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_travelagent_renewal_upload_challan').focus();
                validationMessageShow('travelagent-uc-challan_for_travelagent_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_travelagent_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_travelagent_renewal_upload_challan').focus();
                validationMessageShow('travelagent-uc-challan_for_travelagent_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_TWENTYTHREE, 'travelagent-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_travelagent_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#travelagent_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/upload_challan',
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
                $('#status_' + travelagentRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + travelagentRenewalId).show();
                }
                $('#total_fees_' + travelagentRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (travelagentRenewalId) {
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + travelagentRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent_renewal/get_travelagent_renewal_data_by_travelagent_renewal_id',
            type: 'post',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId}, getTokenData()),
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
                var travelagentRenewalData = parseData.travelagent_renewal_data;
                showPopup();
                $('#popup_container').html(travelagentRenewalApproveTemplate(travelagentRenewalData));
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
        var formData = $('#approve_travelagent_renewal_form').serializeFormJSON();
        if (!formData.travelagent_renewal_id_for_travelagent_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_travelagent_renewal_approve) {
            $('#registration_number_for_travelagent_renewal_approve').focus();
            validationMessageShow('travelagent-approve-registration_number_for_travelagent_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_travelagent_renewal_approve) {
            $('#valid_upto_for_travelagent_renewal_approve').focus();
            validationMessageShow('travelagent-approve-valid_upto_for_travelagent_renewal_approve', dateValidationMessage);
            return false;
        }
        if (!formData.challan_number_for_travelagent_renewal_approve) {
            $('#challan_number_for_travelagent_renewal_approve').focus();
            validationMessageShow('travelagent-approve-challan_number_for_travelagent_renewal_approve', challanNoValidationMessage);
            return false;
        }
        if (!formData.remarks_for_travelagent_renewal_approve) {
            $('#remarks_for_travelagent_renewal_approve').focus();
            validationMessageShow('travelagent-approve-remarks_for_travelagent_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/approve_application',
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
                $('#status_' + formData.travelagent_renewal_id_for_travelagent_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.travelagent_renewal_id_for_travelagent_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.travelagent_renewal_id_for_travelagent_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.travelagent_renewal_id_for_travelagent_renewal_approve).show();
                $('#so_status_' + formData.travelagent_renewal_id_for_travelagent_renewal_approve).html(dateTimeDays(formData.travelagent_renewal_id_for_travelagent_renewal_approve, parseData, VALUE_TWENTYTHREE));
            }
        });
    },
    askForRejectApplication: function (travelagentRenewalId) {
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + travelagentRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent_renewal/get_travelagent_renewal_data_by_travelagent_renewal_id',
            type: 'post',
            data: $.extend({}, {'travelagent_renewal_id': travelagentRenewalId}, getTokenData()),
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
                var travelagentRenewalData = parseData.travelagent_renewal_data;
                showPopup();
                $('#popup_container').html(travelagentRenewalRejectTemplate(travelagentRenewalData));
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
        var formData = $('#reject_travelagent_renewal_form').serializeFormJSON();
        if (!formData.travelagent_renewal_id_for_travelagent_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_travelagent_renewal_reject) {
            $('#remarks_for_travelagent_renewal_reject').focus();
            validationMessageShow('travelagent-reject-remarks_for_travelagent_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'travelagent_renewal/reject_application',
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
                $('#status_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).remove();
                $('#so_status_' + formData.travelagent_renewal_id_for_travelagent_renewal_reject).html(dateTimeDays(formData.travelagent_renewal_id_for_travelagent_renewal_reject, parseData, VALUE_TWENTYTHREE));
            }
        });
    },
    generateCertificate: function (travelagentRenewalId) {
        if (!travelagentRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#travelagent_renewal_id_for_certificate').val(travelagentRenewalId);
        $('#travelagent_renewal_certificate_pdf_form').submit();
        $('#travelagent_renewal_id_for_certificate').val('');
    },
    getQueryData: function (travelagentRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!travelagentRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_TWENTYTHREE;
        templateData.module_id = travelagentRenewalId;
        var btnObj = $('#query_btn_for_travelagentrenewal' + travelagentRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_TWENTYTHREE, moduleData.travelagent_renewal_id);
                tmpData.applicant_name = moduleData.name_of_travel_agency;
                tmpData.title = 'Travelagent Name';
                tmpData.module_type = VALUE_TWENTYTHREE;
                tmpData.module_id = travelagentRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getTravelagentData: function (btnObj) {
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
            url: 'travelagent_renewal/get_travelagent_data_by_id',
            type: 'post',
            data: $.extend({}, {'license_number': license_number}, getTokenData()),
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
                travelagentData = parseData.travelagent_data;
                if (travelagentData == null) {
                    $('#travelagent_id').val('');
                    $('#name_of_travelagent').val('');
                    $('#name_of_proprietor').val('');
                    $('#registration_number').val('');
                    $('#last_valid_upto').val('');
                    $('#fees').attr('readonly', true);
                    $('#fees').val('');
                    $('#mob_no').val('');
                    showError(licenseNoNotAvailable);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                }
                if (travelagentData) {
                    $('#travelagent_id').val(travelagentData.travelagent_id);
                    $('#name_of_travelagent').val(travelagentData.name_of_travelagent);
                    $('#name_of_proprietor').val(travelagentData.name_of_proprietor);
                    $('#registration_number').val(travelagentData.registration_number);
                    var last_valid_upto = dateTo_DD_MM_YYYY(travelagentData.last_valid_upto);
                    if (travelagentData.last_valid_upto != '0000-00-00') {
                        $('#last_valid_upto').val(last_valid_upto);
                    } else {
                        $('#last_valid_upto').val('');
                    }
                    $('#fees').attr('readonly', true);
                    $('#fees').val(travelagentData.fees);
                    $('#mob_no').val(travelagentData.mob_no);
                }
            }
        });
    },
    viewPayment: function (travelagent_renewalId) {
        if (!travelagent_renewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + travelagent_renewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'travelagent_renewal/get_travelagent_renewal_data_by_travelagent_renewal_id',
            type: 'post',
            data: $.extend({}, {'travelagent_renewal_id': travelagent_renewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var travelagentRenewalData = parseData.travelagent_renewal_data;
                showPopup();
                if (travelagentRenewalData.payment_type == VALUE_ONE || travelagentRenewalData.payment_type == VALUE_THREE) {
                    travelagentRenewalData.user_payment_type_text = paymentTypeArray[travelagentRenewalData.payment_type];
                } else {
                    travelagentRenewalData.user_payment_type_text = userPaymentTypeArray[travelagentRenewalData.user_payment_type] ? userPaymentTypeArray[travelagentRenewalData.user_payment_type] : '';
                }
                if (travelagentRenewalData.payment_type == VALUE_ONE) {
                    travelagentRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (travelagentRenewalData.payment_type == VALUE_TWO && travelagentRenewalData.user_payment_type == VALUE_ONE) {
                    travelagentRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                travelagentRenewalData.module_type = VALUE_TWENTYTHREE;
                $('#popup_container').html(travelagentRenewalViewPaymentTemplate(travelagentRenewalData));
                loadFB(VALUE_TWENTYTHREE, parseData.fb_data, travelagentRenewalData.payment_type);
                loadPH(VALUE_TWENTYTHREE, travelagentRenewalData.travelagent_renewal_id, parseData.ph_data);
                if (travelagentRenewalData.payment_type == VALUE_ONE || (travelagentRenewalData.payment_type == VALUE_TWO && travelagentRenewalData.user_payment_type == VALUE_ONE)) {
                    if (travelagentRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_travelagent_renewal').show();
                        $('#fees_paid_challan_name_href_for_travelagent_renewal').attr('href', TRAVELAGENT_DOC_PATH + travelagentRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_travelagent_renewal').html(travelagentRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
