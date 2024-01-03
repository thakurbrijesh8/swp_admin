var societyRegistrationListTemplate = Handlebars.compile($('#society_registration_list_template').html());
var societyRegistrationTableTemplate = Handlebars.compile($('#society_registration_table_template').html());
var societyRegistrationActionTemplate = Handlebars.compile($('#society_registration_action_template').html());
var societyRegistrationViewTemplate = Handlebars.compile($('#society_registration_view_template').html());
var societyRegistrationUploadChallanTemplate = Handlebars.compile($('#society_registration_upload_challan_template').html());
var societyRegistrationUploadLetterTemplate = Handlebars.compile($('#society_registration_upload_letter_template').html());
var societyRegistrationViewPaymentTemplate = Handlebars.compile($('#society_registration_view_payment_template').html());
var societyRegistrationApproveTemplate = Handlebars.compile($('#society_registration_approve_template').html());
var societyRegistrationRejectTemplate = Handlebars.compile($('#society_registration_reject_template').html());

var SocietyRegistration = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
SocietyRegistration.Router = Backbone.Router.extend({
    routes: {
        'society_registration': 'listPage'
    },
    listPage: function () {
        SocietyRegistration.listview.listPage();
    }
});
SocietyRegistration.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_ARCS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_collectorate');
        addClass('menu_society_registration', 'active');
        SocietyRegistration.router.navigate('society_registration');
        var templateData = {};
        this.$el.html(societyRegistrationListTemplate(templateData));
        this.loadSocietyRegistrationData(sDistrict, sStatus, sAppTimingStatus);
    },
    societyRegistrationActionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return societyRegistrationActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (rowData.letter_status == VALUE_TWO) {
            rowData.show_download_passbook_btn = true;
        } else {
            rowData.show_download_passbook_btn = false;
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
        rowData.module_type = VALUE_SIXTY;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return societyRegistrationActionTemplate(rowData);
    },
    loadSocietyRegistrationData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_ARCS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.u_applicant_name +
                    '<hr><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.u_applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name +
                    '<hr><b><i class="fas fa-map f-s-10px"></i></b> :- ' + full.applicant_address +
                    '<hr><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile_number;
        };
        var socDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.society_name +
                    '<hr><b><i class="fas fa-map f-s-10px"></i></b> :- ' + full.society_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-12px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            var tString = '';
            if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
                tString = regNoRenderer(VALUE_SIXTY, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            } else {
                tString = regNoRenderer(VALUE_SIXTY, data);
            }
            return tString;
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_SIXTY);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['society_registration_data'], function (index, objData) {
                json['society_registration_data'][index]['query_movement_string'] = qmData[objData.society_registration_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.society_registration_id] + '</table>') : '-';
            });
            return json['society_registration_data'];
        };
        var that = this;
        SocietyRegistration.router.navigate('society_registration');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'SocietyRegistration.listview.listPage();');
        $('#society_registration_form_and_datatable_container').html(societyRegistrationTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_society_registration_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_society_registration_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_society_registration_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_society_registration_list', false);
        allowOnlyIntegerValue('mobile_number_for_society_registration_list')
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_society_registration_list', false);
        $('#district_for_society_registration_list').val(searchData.search_district);
        $('#status_for_society_registration_list').val(searchData.search_status);
        $('#app_timing_for_society_registration_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_society_registration_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_society_registration_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_society_registration_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_society_registration_list').attr('disabled', 'disabled');
        }
        societyRegistrationDataTable = $('#society_registration_datatable').DataTable({
            ajax: {url: 'society_registration/get_society_registration_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'society_registration_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': 'f-s-13px', 'render': appDetailsRenderer},
                {data: '', 'class': 'f-s-13px', 'render': socDetailsRenderer},
                {data: 'society_registration_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'society_registration_id', 'class': 'text-center v-a-m ', 'render': AppStatusforSRRenderer},
                {data: 'society_registration_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#society_registration_datatable_filter').remove();
        $('#society_registration_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = societyRegistrationDataTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(that.societyRegistrationActionRenderer(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    editOrViewSocietyRegistration: function (btnObj, societyRegistrationId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_ARCS && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        if (isEdit) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId}, getTokenData()),
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
                if (!isEdit) {
                    that.viewSocietyRegistrationForm(parseData);
                }
            }
        });
    },
    viewSocietyRegistrationForm: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var societyRegistrationData = parseData.society_registration_data;
        societyRegistrationData.module_type = VALUE_SIXTY;
        societyRegistrationData.application_number = regNoRenderer(VALUE_SIXTY, societyRegistrationData.society_registration_id);
        societyRegistrationData.district_text = talukaArray[societyRegistrationData.district] ? talukaArray[societyRegistrationData.district] : '';
        societyRegistrationData.entity_establishment_type_text = entityEstablishmentTypeArray[societyRegistrationData.entity_establishment_type] ? entityEstablishmentTypeArray[societyRegistrationData.entity_establishment_type] : '';
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(societyRegistrationViewTemplate(societyRegistrationData));

        loadMDoc(VALUE_SIXTY, societyRegistrationData.m_doc, '_view');
        if (societyRegistrationData['m_other_doc'].length != VALUE_ZERO) {
            loadMOtherDoc(VALUE_SIXTY, societyRegistrationData.m_other_doc, '_view');
        }
    },
    openUploadChallan: function (societyRegistrationId) {
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_society_registration_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var societyRegistrationData = parseData.society_registration_data;
                showPopup();
                if (societyRegistrationData.status != VALUE_FOUR && societyRegistrationData.status != VALUE_FIVE && societyRegistrationData.status != VALUE_SIX && societyRegistrationData.status != VALUE_SEVEN && societyRegistrationData.status != VALUE_EIGHT) {
                    societyRegistrationData.show_remove_upload_btn = true;
                }
                if (societyRegistrationData.payment_type == VALUE_ONE) {
                    societyRegistrationData.utitle = 'Challan Copy';
                } else {
                    societyRegistrationData.utitle = 'Payment Details';
                }
                societyRegistrationData.module_type = VALUE_SIXTY;
                $('#popup_container').html(societyRegistrationUploadChallanTemplate(societyRegistrationData));
                loadFB(VALUE_SIXTY, parseData.fb_data, societyRegistrationData.payment_type, societyRegistrationData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'society_registration_upload_challan', societyRegistrationData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'society_registration_upload_challan', 'uc', 'radio', '#fb', VALUE_SIXTY);
                if (societyRegistrationData.challan != '') {
                    $('#challan_container_for_society_registration_upload_challan').hide();
                    $('#challan_name_container_for_society_registration_upload_challan').show();
                    $('#challan_name_href_for_society_registration_upload_challan').attr('href', 'documents/society_registration/' + societyRegistrationData.challan);
                    $('#challan_name_for_society_registration_upload_challan').html(societyRegistrationData.challan);
                    $('#challan_remove_btn_for_society_registration_upload_challan').attr('onclick', 'SocietyRegistration.listview.removeChallan("' + societyRegistrationData.society_registration_id + '")');
                }
            }
        });
    },
    removeChallan: function (societyRegistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'society_registration/remove_challan',
            data: $.extend({}, {'society_registration_id': societyRegistrationId}, getTokenData()),
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
                validationMessageShow('society-registration-uc', textStatus.statusText);
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
                    validationMessageShow('society-registration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-society-registration-uc').html(parseData.message);
                removeDocument('challan', 'society_registration_upload_challan');
                $('#status_' + societyRegistrationId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-society-registration-uc').html('');
        validationMessageHide();
        var societyRegistrationId = $('#society_registration_id_for_society_registration_upload_challan').val();
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_society_registration_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_society_registration_upload_challan_1').focus();
            validationMessageShow('society-registration-uc-payment_type_for_society_registration_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_society_registration_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_society_registration_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_society_registration_upload_challan').focus();
                validationMessageShow('society-registration-uc-challan_for_society_registration_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_society_registration_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_society_registration_upload_challan').focus();
                validationMessageShow('society-registration-uc-challan_for_society_registration_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_SIXTY, 'society-registration-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_society_registration_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#society_registration_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }

        $.ajax({
            type: 'POST',
            url: 'society_registration/upload_challan',
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
                validationMessageShow('society-registration-uc', textStatus.statusText);
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
                    validationMessageShow('society-registration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + societyRegistrationId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + societyRegistrationId).show();
                }
                $('#total_fees_' + societyRegistrationId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }});
    },
    openUploadLetter: function (societyRegistrationId) {
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_letter_btn_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_society_registration_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var societyRegistrationData = parseData.society_registration_data;
                showPopup();
                if (societyRegistrationData.letter != '' && societyRegistrationData.letter_status == VALUE_TWO) {
                    societyRegistrationData.show_remove_upload_btn = false;
                    societyRegistrationData.show_submit_upload_btn = false;
                } else if (societyRegistrationData.letter != '' && societyRegistrationData.letter_status == VALUE_ONE) {                    
                    societyRegistrationData.show_remove_upload_btn = true;
                    societyRegistrationData.show_submit_upload_btn = true;
                } else if (societyRegistrationData.letter == '' && societyRegistrationData.letter_status == VALUE_ZERO) {
                    societyRegistrationData.show_submit_upload_btn = true;
                }
                societyRegistrationData.module_type = VALUE_SIXTY;
                $('#popup_container').html(societyRegistrationUploadLetterTemplate(societyRegistrationData));
                if (societyRegistrationData.letter != '' && societyRegistrationData.letter_status == VALUE_TWO) {
                    $('#upload_letter_remarks_for_society_registration').attr('readonly', true);
                }
                if (societyRegistrationData.letter != '') {
                    societyRegistrationData.show_submit_upload_btn = false;
                    $('#letter_container_for_society_registration_upload_letter').hide();
                    $('#letter_name_container_for_society_registration_upload_letter').show();
                    $('#letter_name_href_for_society_registration_upload_letter').attr('href', 'documents/society_registration/' + societyRegistrationData.letter);
                    $('#letter_name_for_society_registration_upload_letter').html(societyRegistrationData.letter);
                    $('#letter_remove_btn_for_society_registration_upload_letter').attr('onclick', 'SocietyRegistration.listview.removeLetter("' + societyRegistrationData.society_registration_id + '")');
                } else {
//                      console.log('tets');
//                    societyRegistrationData.show_submit_upload_btn = true;
//                    $('#ul_container_for_society_registration_upload_letter').show();
                }
            }
        });
    },
    removeLetter: function (societyRegistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'society_registration/remove_letter',
            data: $.extend({}, {'society_registration_id': societyRegistrationId}, getTokenData()),
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
                validationMessageShow('society-registration-ul', textStatus.statusText);
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
                    validationMessageShow('society-registration-ul', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-society-registration-ul').html(parseData.message);
                removeDocument('letter', 'society_registration_upload_letter');
                SocietyRegistration.listview.listPage();
                $('#status_' + societyRegistrationId).html(socRegUlStatusArray[VALUE_ZERO]);
                
            }
        });
    },
    uploadLetter: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-society-registration-ul').html('');
        validationMessageHide();
        var societyRegistrationId = $('#society_registration_id_for_society_registration_upload_letter').val();
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#letter_container_for_society_registration_upload_letter').is(':visible')) {
            var sealAndStamp = $('#letter_for_society_registration_upload_letter').val();
            if (sealAndStamp == '') {
                $('#letter_for_society_registration_upload_letter').focus();
                validationMessageShow('society-registration-ul-letter_for_society_registration_upload_letter', uploadDocumentValidationMessage);
                return false;
            }
            var letterMessage = fileUploadValidation('letter_for_society_registration_upload_letter', 2048);
            if (letterMessage != '') {
                $('#letter_for_society_registration_upload_letter').focus();
                validationMessageShow('society-registration-ul-letter_for_society_registration_upload_letter', letterMessage);
                return false;
            }
        }
        var letterRemarks = $('#upload_letter_remarks_for_society_registration').val();
        if (letterRemarks == '') {
            $('#upload_letter_remarks_for_society_registration').focus();
            validationMessageShow('society-registration-ul-upload_letter_remarks_for_society_registration', remarksValidationMessage);
            return false;
        }


        var btnObj = $('#submit_btn_for_society_registration_upload_letter');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var letterRemarks = $('#upload_letter_remarks_for_society_registration').val();
        var formData = new FormData($('#society_registration_upload_letter_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        formData.append("letter_remarks", letterRemarks);

        $.ajax({
            type: 'POST',
            url: 'society_registration/upload_letter',
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
                validationMessageShow('society-registration-uc', textStatus.statusText);
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
                    validationMessageShow('society-registration-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                SocietyRegistration.listview.listPage();
                showSuccess(parseData.message);

            }});
    },
    
    askForApproveApplication: function (societyRegistrationId) {
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_society_registration_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId}, getTokenData()),
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
                var societyRegistrationData = parseData.society_registration_data;
                showPopup();
                $('#popup_container').html(societyRegistrationApproveTemplate(societyRegistrationData));
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
        var formData = $('#approve_society_registration_form').serializeFormJSON();
        if (!formData.society_registration_id_for_society_registration_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_society_registration_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_society_registration_approve').focus();
            validationMessageShow('society-registration-approve-certificate_file_for_society_registration_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_society_registration_approve) {
            $('#remarks_for_society_registration_approve').focus();
            validationMessageShow('society-registration-approve-remarks_for_society_registration_approve', remarksValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#submit_btn_for_society_registration_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_society_registration_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'society_registration/approve_application',
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
                validationMessageShow('society-registration-approve', textStatus.statusText);
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
                    validationMessageShow('society-registration-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadSocietyRegistrationData();
            }
        });
    },
    askForRejectApplication: function (societyRegistrationId) {
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_society_registration_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId}, getTokenData()),
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
                var societyRegistrationData = parseData.society_registration_data;
                showPopup();
                $('#popup_container').html(societyRegistrationRejectTemplate(societyRegistrationData));
            }
        });
    },
    rejectApplication: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_society_registration_form').serializeFormJSON();
        if (!formData.society_registration_id_for_society_registration_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_society_registration_reject) {
            $('#remarks_for_society_registration_reject').focus();
            validationMessageShow('society-registration-reject-remarks_for_society_registration_reject', remarksValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'society_registration/reject_application',
            data: $.extend({}, formData, getTokenData()),
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
                validationMessageShow('society-registration-reject', textStatus.statusText);
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
                    validationMessageShow('society-registration-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadSocietyRegistrationData();
            }
        });
    },
    getQueryData: function (societyRegistrationId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SIXTY;
        templateData.module_id = societyRegistrationId;
        var btnObj = $('#query_btn_for_app_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'utility/get_query_data', type: 'post', data: $.extend({}, templateData, getTokenData()),
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
                tmpData.application_number = regNoRenderer(VALUE_SIXTY, moduleData.society_registration_id);
                tmpData.applicant_name = moduleData.applicant_name;
                tmpData.title = 'Applicant_name';
                tmpData.module_type = VALUE_SIXTY;
                tmpData.module_id = societyRegistrationId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (societyRegistrationId) {
        if (!societyRegistrationId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + societyRegistrationId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'society_registration/get_society_registration_data_by_society_registration_id',
            type: 'post',
            data: $.extend({}, {'society_registration_id': societyRegistrationId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var societyRegistrationData = parseData.society_registration_data;
                showPopup();
                if (societyRegistrationData.payment_type == VALUE_ONE || societyRegistrationData.payment_type == VALUE_THREE) {
                    societyRegistrationData.user_payment_type_text = paymentTypeArray[societyRegistrationData.payment_type];
                } else {
                    societyRegistrationData.user_payment_type_text = userPaymentTypeArray[societyRegistrationData.user_payment_type] ? userPaymentTypeArray[societyRegistrationData.user_payment_type] : '';
                }
                if (societyRegistrationData.payment_type == VALUE_ONE) {
                    societyRegistrationData.utitle = 'Fees Paid Challan Copy';
                } else if (societyRegistrationData.payment_type == VALUE_TWO && societyRegistrationData.user_payment_type == VALUE_ONE) {
                    societyRegistrationData.utitle = 'Demand Draft (DD) Copy';
                }
                societyRegistrationData.module_type = VALUE_SIXTY;
                $('#popup_container').html(societyRegistrationViewPaymentTemplate(societyRegistrationData));
                loadFB(VALUE_SIXTY, parseData.fb_data, societyRegistrationData.payment_type);
                loadPH(VALUE_SIXTY, societyRegistrationData.society_registration_id, parseData.ph_data);

                if (societyRegistrationData.payment_type == VALUE_ONE || (societyRegistrationData.payment_type == VALUE_TWO && societyRegistrationData.user_payment_type == VALUE_ONE)) {
                    if (societyRegistrationData.fees_paid_challan != '') {
                        $('#vp_container_for_society_registration').show();
                        $('#fees_paid_challan_name_href_for_society_registration').attr('href', SOCIETY_REGISTRATION_DOC_PATH + societyRegistrationData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_society_registration').html(societyRegistrationData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
