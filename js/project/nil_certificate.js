var nilCertificateListTemplate = Handlebars.compile($('#nil_certificate_list_template').html());
var nilCertificateTableTemplate = Handlebars.compile($('#nil_certificate_table_template').html());
var nilCertificateActionTemplate = Handlebars.compile($('#nil_certificate_action_template').html());
var nilCertificateViewTemplate = Handlebars.compile($('#nil_certificate_view_template').html());
var nilCertificateUploadChallanTemplate = Handlebars.compile($('#nil_certificate_upload_challan_template').html());
var nilCertificateViewPaymentTemplate = Handlebars.compile($('#nil_certificate_view_payment_template').html());
var nilCertificateApproveTemplate = Handlebars.compile($('#nil_certificate_approve_template').html());
var nilCertificateRejectTemplate = Handlebars.compile($('#nil_certificate_reject_template').html());
var NilCertificate = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
NilCertificate.Router = Backbone.Router.extend({
    routes: {
        'nil_certificate': 'listPage'
    },
    listPage: function () {
        NilCertificate.listview.listPage();
    }
});
NilCertificate.listView = Backbone.View.extend({
    el: 'div#main_container',
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
        addClass('nil_certificate', 'active');
        NilCertificate.router.navigate('nil_certificate');
        var templateData = {};
        this.$el.html(nilCertificateListTemplate(templateData));
        this.loadNilCertificateData(sDistrict, sStatus, sAppTimingStatus);
    },
    nilCertificateActionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return nilCertificateActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
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
        rowData.module_type = VALUE_SIXTYONE;
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
        return nilCertificateActionTemplate(rowData);
    },
    loadNilCertificateData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
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
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-12px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            var tString = getAppNoWithRating(VALUE_SIXTYONE, data, full.district, full);
            var villageData = full.district == VALUE_ONE ? damanVillagesArray : (full.district == VALUE_TWO ? diuVillagesArray : (full.district == VALUE_THREE ? dnhVillagesArray : []));
            tString += '<hr>' + (villageData[full.village_dmc_ward] ? villageData[full.village_dmc_ward] : '');
            return tString;
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_SIXTYONE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['nil_certificate_data'], function (index, objData) {
                json['nil_certificate_data'][index]['query_movement_string'] = qmData[objData.nil_certificate_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.nil_certificate_id] + '</table>') : '-';
            });
            return json['nil_certificate_data'];
        };
        var that = this;
        NilCertificate.router.navigate('nil_certificate');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'NilCertificate.listview.listPage();');
        $('#nil_certificate_form_and_datatable_container').html(nilCertificateTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_nil_certificate_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_nil_certificate_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_nil_certificate_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_nil_certificate_list', false);
        allowOnlyIntegerValue('mobile_number_for_nil_certificate_list')
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_nil_certificate_list', false);
        $('#district_for_nil_certificate_list').val(searchData.search_district);
        $('#status_for_nil_certificate_list').val(searchData.search_status);
        $('#app_timing_for_nil_certificate_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_nil_certificate_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_nil_certificate_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_nil_certificate_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_nil_certificate_list').attr('disabled', 'disabled');
        }
        nilCertificateDataTable = $('#nil_certificate_datatable').DataTable({
            ajax: {url: 'nil_certificate/get_nil_certificate_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'nil_certificate_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': 'f-s-13px', 'render': appDetailsRenderer},
                {data: 'nil_certificate_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'nil_certificate_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'nil_certificate_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#nil_certificate_datatable_filter').remove();
        $('#nil_certificate_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = nilCertificateDataTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(that.nilCertificateActionRenderer(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    editOrViewNilCertificate: function (btnObj, nilCertificateId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_SUB_REGISTRAR && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!nilCertificateId) {
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
            url: 'nil_certificate/get_nil_certificate_data_by_id',
            type: 'post',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId}, getTokenData()),
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
                    that.viewNilCertificateForm(parseData);
                }
            }
        });
    },
    viewNilCertificateForm: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var nilCertificateData = parseData.nil_certificate_data;
        nilCertificateData.module_type = VALUE_SIXTYONE;
        nilCertificateData.application_number = regNoRenderer(VALUE_SIXTYONE, nilCertificateData.nil_certificate_id);
        nilCertificateData.district_text = talukaArray[nilCertificateData.district] ? talukaArray[nilCertificateData.district] : '';
        var villageData = nilCertificateData.district == VALUE_ONE ? damanVillagesArray : (nilCertificateData.district == VALUE_TWO ? diuVillagesArray : (nilCertificateData.district == VALUE_THREE ? dnhVillagesArray : []));
        nilCertificateData.village_dmc_ward_text = villageData[nilCertificateData.village_dmc_ward] ? villageData[nilCertificateData.village_dmc_ward] : '';
        nilCertificateData.entity_establishment_type_text = entityEstablishmentTypeArray[nilCertificateData.entity_establishment_type] ? entityEstablishmentTypeArray[nilCertificateData.entity_establishment_type] : '';
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(nilCertificateViewTemplate(nilCertificateData));

        loadMDoc(VALUE_SIXTYONE, nilCertificateData.m_doc, '_view');
        if (nilCertificateData['m_other_doc'].length != VALUE_ZERO) {
            loadMOtherDoc(VALUE_SIXTYONE, nilCertificateData.m_other_doc, '_view');
        }
    },
    openUploadChallan: function (nilCertificateId) {
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + nilCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'nil_certificate/get_nil_certificate_data_by_nil_certificate_id',
            type: 'post',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var nilCertificateData = parseData.nil_certificate_data;
                showPopup();
                if (nilCertificateData.payment_type == VALUE_ONE) {
                    nilCertificateData.utitle = 'Challan Copy';
                } else {
                    nilCertificateData.utitle = 'Payment Details';
                }
                nilCertificateData.module_type = VALUE_SIXTYONE;
                $('#popup_container').html(nilCertificateUploadChallanTemplate(nilCertificateData));
                loadFB(VALUE_SIXTYONE, parseData.fb_data, nilCertificateData.payment_type, nilCertificateData.show_remove_upload_btn, nilCertificateData.show_dropdown, nilCertificateData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'nil_certificate_upload_challan', nilCertificateData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'nil_certificate_upload_challan', 'uc', 'radio', '#fb', VALUE_SIXTYONE);
                if (nilCertificateData.challan != '') {
                    $('#challan_container_for_nil_certificate_upload_challan').hide();
                    $('#challan_name_container_for_nil_certificate_upload_challan').show();
                    $('#challan_name_href_for_nil_certificate_upload_challan').attr('href', 'documents/nil_certificate/' + nilCertificateData.challan);
                    $('#challan_name_for_nil_certificate_upload_challan').html(nilCertificateData.challan);
                    $('#challan_remove_btn_for_nil_certificate_upload_challan').attr('onclick', 'NilCertificate.listview.removeChallan("' + nilCertificateData.nil_certificate_id + '")');
                }
            }
        });
    },
    removeChallan: function (nilCertificateId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'nil_certificate/remove_challan',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId}, getTokenData()),
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
                validationMessageShow('nil-certificate-uc', textStatus.statusText);
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
                    validationMessageShow('nil-certificate-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-nil-certificate-uc').html(parseData.message);
                removeDocument('challan', 'nil_certificate_upload_challan');
                $('#status_' + nilCertificateId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-nil-certificate-uc').html('');
        validationMessageHide();
        var nilCertificateId = $('#nil_certificate_id_for_nil_certificate_upload_challan').val();
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_nil_certificate_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_nil_certificate_upload_challan_1').focus();
            validationMessageShow('nil-certificate-uc-payment_type_for_nil_certificate_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_nil_certificate_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_nil_certificate_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_nil_certificate_upload_challan').focus();
                validationMessageShow('nil-certificate-uc-challan_for_nil_certificate_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_nil_certificate_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_nil_certificate_upload_challan').focus();
                validationMessageShow('nil-certificate-uc-challan_for_nil_certificate_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_SIXTYONE, 'nil-certificate-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_nil_certificate_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#nil_certificate_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'nil_certificate/upload_challan',
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
                validationMessageShow('nil-certificate-uc', textStatus.statusText);
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
                    validationMessageShow('nil-certificate-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + nilCertificateId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + nilCertificateId).show();
                }
                $('#total_fees_' + nilCertificateId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }});
    },
    askForApproveApplication: function (nilCertificateId) {
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + nilCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'nil_certificate/get_nil_certificate_data_by_nil_certificate_id',
            type: 'post',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId}, getTokenData()),
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
                var nilCertificateData = parseData.nil_certificate_data;
                showPopup();
                $('#popup_container').html(nilCertificateApproveTemplate(nilCertificateData));
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
        var formData = $('#approve_nil_certificate_form').serializeFormJSON();
        if (!formData.nil_certificate_id_for_nil_certificate_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_nil_certificate_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_nil_certificate_approve').focus();
            validationMessageShow('nil-certificate-approve-certificate_file_for_nil_certificate_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_nil_certificate_approve) {
            $('#remarks_for_nil_certificate_approve').focus();
            validationMessageShow('nil-certificate-approve-remarks_for_nil_certificate_approve', remarksValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#submit_btn_for_nil_certificate_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_nil_certificate_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'nil_certificate/approve_application',
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
                validationMessageShow('nil-certificate-approve', textStatus.statusText);
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
                    validationMessageShow('nil-certificate-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadNilCertificateData();
            }
        });
    },
    askForRejectApplication: function (nilCertificateId) {
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + nilCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'nil_certificate/get_nil_certificate_data_by_nil_certificate_id',
            type: 'post',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId}, getTokenData()),
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
                var nilCertificateData = parseData.nil_certificate_data;
                showPopup();
                $('#popup_container').html(nilCertificateRejectTemplate(nilCertificateData));
            }
        });
    },
    rejectApplication: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_nil_certificate_form').serializeFormJSON();
        if (!formData.nil_certificate_id_for_nil_certificate_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_nil_certificate_reject) {
            $('#remarks_for_nil_certificate_reject').focus();
            validationMessageShow('nil-certificate-reject-remarks_for_nil_certificate_reject', remarksValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'nil_certificate/reject_application',
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
                validationMessageShow('nil-certificate-reject', textStatus.statusText);
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
                    validationMessageShow('nil-certificate-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadNilCertificateData();
            }
        });
    },
    getQueryData: function (nilCertificateId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SIXTYONE;
        templateData.module_id = nilCertificateId;
        var btnObj = $('#query_btn_for_app_' + nilCertificateId);
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
                tmpData.application_number = regNoRenderer(VALUE_SIXTYONE, moduleData.nil_certificate_id);
                tmpData.applicant_name = moduleData.applicant_name;
                tmpData.title = 'Applicant_name';
                tmpData.module_type = VALUE_SIXTYONE;
                tmpData.module_id = nilCertificateId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (nilCertificateId) {
        if (!nilCertificateId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + nilCertificateId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'nil_certificate/get_nil_certificate_data_by_nil_certificate_id',
            type: 'post',
            data: $.extend({}, {'nil_certificate_id': nilCertificateId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var nilCertificateData = parseData.nil_certificate_data;
                showPopup();
                if (nilCertificateData.payment_type == VALUE_ONE || nilCertificateData.payment_type == VALUE_THREE) {
                    nilCertificateData.user_payment_type_text = paymentTypeArray[nilCertificateData.payment_type];
                } else {
                    nilCertificateData.user_payment_type_text = userPaymentTypeArray[nilCertificateData.user_payment_type] ? userPaymentTypeArray[nilCertificateData.user_payment_type] : '';
                }
                if (nilCertificateData.payment_type == VALUE_ONE) {
                    nilCertificateData.utitle = 'Fees Paid Challan Copy';
                } else if (nilCertificateData.payment_type == VALUE_TWO && nilCertificateData.user_payment_type == VALUE_ONE) {
                    nilCertificateData.utitle = 'Demand Draft (DD) Copy';
                }
                nilCertificateData.module_type = VALUE_SIXTYONE;
                $('#popup_container').html(nilCertificateViewPaymentTemplate(nilCertificateData));
                loadFB(VALUE_SIXTYONE, parseData.fb_data, nilCertificateData.payment_type);
                loadPH(VALUE_SIXTYONE, nilCertificateData.nil_certificate_id, parseData.ph_data);

                if (nilCertificateData.payment_type == VALUE_ONE || (nilCertificateData.payment_type == VALUE_TWO && nilCertificateData.user_payment_type == VALUE_ONE)) {
                    if (nilCertificateData.fees_paid_challan != '') {
                        $('#vp_container_for_nil_certificate').show();
                        $('#fees_paid_challan_name_href_for_nil_certificate').attr('href', NIL_CERTIFICATE_DOC_PATH + nilCertificateData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_nil_certificate').html(nilCertificateData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
