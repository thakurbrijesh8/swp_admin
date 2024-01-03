var riiListTemplate = Handlebars.compile($('#rii_list_template').html());
var riiTableTemplate = Handlebars.compile($('#rii_table_template').html());
var riiActionTemplate = Handlebars.compile($('#rii_action_template').html());
var riiFormTemplate = Handlebars.compile($('#rii_form_template').html());
var riiViewTemplate = Handlebars.compile($('#rii_view_template').html());
var riiUploadChallanTemplate = Handlebars.compile($('#rii_upload_challan_template').html());
var riiApproveTemplate = Handlebars.compile($('#rii_approve_template').html());
var riiRejectTemplate = Handlebars.compile($('#rii_reject_template').html());
var riiViewPaymentTemplate = Handlebars.compile($('#rii_view_payment_template').html());

var RII = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
RII.Router = Backbone.Router.extend({
    routes: {
        'rii': 'renderList',
        'rii_form': 'renderListForForm',
        'edit_rii_form': 'renderList',
        'view_rii_form': 'renderList',
    },
    renderList: function () {
        RII.listview.listPage();
    },
    renderListForForm: function () {
        RII.listview.listPageRIIForm();
    }
});
RII.listView = Backbone.View.extend({
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
        activeLink('menu_labour');
        addClass('menu_rii', 'active');
        RII.router.navigate('rii');
        var templateData = {};
        this.$el.html(riiListTemplate(templateData));
        this.loadRIIData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageRIIForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_rii', 'active');
        this.$el.html(riiListTemplate);
        this.newRIIForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return riiActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYNINE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return riiActionTemplate(rowData);
    },
    loadRIIData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.user_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.address;
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
                return regNoRenderer(VALUE_FOURTYNINE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_FOURTYNINE, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYNINE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['rii_data'], function (index, objData) {
                json['rii_data'][index]['query_movement_string'] = qmData[objData.rii_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.rii_id] + '</table>') : '-';
            });
            return json['rii_data'];
        };
        var that = this;
        RII.router.navigate('rii');
        showTableContainer('rii');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'RII.listview.loadRIIData();');
        $('#rii_datatable_container').html(riiTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_rii_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_rii_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_rii_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_rii_list', false);
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_rii_list', false);
        $('#district_for_rii_list').val(searchData.search_district);
        $('#status_for_rii_list').val(searchData.search_status);
        $('#app_timing_for_rii_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_rii_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_rii_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_rii_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_rii_list').attr('disabled', 'disabled');
        }
        riiDataTable = $('#rii_datatable').DataTable({
            ajax: {url: 'rii/get_rii_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'rii_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'rii_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'rii_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'rii_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#rii_datatable_filter').remove();
        $('#rii_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = riiDataTable.row(tr);

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
    newRIIForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.rii_data;
            RII.router.navigate('edit_rii_form');
        } else {
            var formData = {};
            RII.router.navigate('rii_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.rii_data = parseData.rii_data;
        showFormContainer('rii');
        $('#rii_form_container').html(riiFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        renderOptionsForTwoDimensionalArray(treadeArray, 'trade');
        renderOptionsForTwoDimensionalArray(reportArray, 'reporting');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#trade').val(formData.trade);
            $('#reporting').val(formData.reporting);
        }
        generateSelect2();
        $('#rii_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitRII($('#submit_btn_for_rii'));
            }
        });
    },
    editOrViewRII: function (btnObj, riiId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!riiId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'rii/get_rii_data_by_id',
            type: 'post',
            data: $.extend({}, {'rii_id': riiId}, getTokenData()),
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
                    that.newRIIForm(isEdit, parseData);
                } else {
                    that.viewRIIForm(parseData);
                }
            }
        });
    },
    viewRIIForm: function (parseData) {
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
        var formData = parseData.rii_data;
        RII.router.navigate('view_rii_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('rii');
        $('#rii_form_container').html(riiViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        renderOptionsForTwoDimensionalArray(treadeArray, 'trade');
        renderOptionsForTwoDimensionalArray(reportArray, 'reporting');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#trade').val(formData.trade);
        $('#reporting').val(formData.reporting);
    },
    checkValidationForRII: function (riiData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!riiData.user_name) {
            return getBasicMessageAndFieldJSONArray('user_name', userNameValidationMessage);
        }
        if (!riiData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!riiData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!riiData.address) {
            return getBasicMessageAndFieldJSONArray('address', addressValidationMessage);
        }
        if (!riiData.trade) {
            return getBasicMessageAndFieldJSONArray('trade', tradeValidationMessage);
        }
        if (!riiData.reporting) {
            return getBasicMessageAndFieldJSONArray('reporting', reportValidationMessage);
        }

        return '';
    },
    askForSubmitRII: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'RII.listview.submitRII(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitRII: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var riiData = $('#rii_form').serializeFormJSON();
        var validationData = that.checkValidationForRII(riiData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('rii-' + validationData.field, validationData.message);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_rii') : $('#submit_btn_for_rii');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        //var url = riiData.rii_id ? 'update' : 'save';
        var riiData = new FormData($('#rii_form')[0]);
        riiData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        riiData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'rii/submit_rii',
            data: riiData,
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
                validationMessageShow('rii', textStatus.statusText);
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
                    validationMessageShow('rii', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                RII.router.navigate('rii', {'trigger': true});
            }
        });
    },

    viewDocumentFile: function (FileName, riiId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/rii/' + riiId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/rii/' + riiId + '/' + FileName + ' style=width:250px;height:250px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="RII.listview.askForDeleteforDocumentFile(' + riiId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (riiId, dbFileNameField, postId, postContainer) {
        if (!riiId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'RII.listview.deleteDocumentFile(' + riiId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (riiId, dbFileNameField, postId, postContainer) {
        if (!riiId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'rii/delete_upload_file_for_rii',
            type: 'POST',
            data: $.extend({}, {'rii_id': riiId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
                showError('Some unexpected database error encountered due to which your transaction could not be completed');
            },
            success: function (data) {
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    return false;
                }
                $('.stack-bar-bottom').hide();
                showSuccess(parseData.message);
                $('#temp_' + dbFileNameField).val('');
                $('#' + postContainer).hide();
                $('#' + postContainer).html('');
                $('#' + postId).show();
            }
        });
    },
    generateForm1: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#rii_id_for_rii_form1').val(riiId);
        $('#rii_form1_pdf_form').submit();
        $('#rii_id_for_rii_form1').val('');
    },
    openUploadChallan: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + riiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'rii/get_rii_data_by_rii_id',
            type: 'post',
            data: $.extend({}, {'rii_id': riiId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var riiData = parseData.rii_data;
                showPopup();
                if (riiData.status != VALUE_FOUR && riiData.status != VALUE_FIVE && riiData.status != VALUE_SIX && riiData.status != VALUE_SEVEN && riiData.status != VALUE_EIGHT) {
                    riiData.show_remove_upload_btn = true;
                }
                if (riiData.payment_type == VALUE_ONE) {
                    riiData.utitle = 'Challan Copy';
                } else {
                    riiData.utitle = 'Payment Details';
                }
                riiData.module_type = VALUE_FOURTYNINE;
                $('#popup_container').html(riiUploadChallanTemplate(riiData));
                loadFB(VALUE_FOURTYNINE, parseData.fb_data, riiData.payment_type, riiData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'rii_upload_challan', riiData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'rii_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYNINE);
                if (riiData.challan != '') {
                    $('#challan_container_for_rii_upload_challan').hide();
                    $('#challan_name_container_for_rii_upload_challan').show();
                    $('#challan_name_href_for_rii_upload_challan').attr('href', 'documents/rii/' + riiData.challan);
                    $('#challan_name_for_rii_upload_challan').html(riiData.challan);
                    $('#challan_remove_btn_for_rii_upload_challan').attr('onclick', 'RII.listview.removeChallan("' + riiData.rii_id + '")');
                }
            }
        });
    },
    removeChallan: function (riiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'rii/remove_challan',
            data: $.extend({}, {'rii_id': riiId}, getTokenData()),
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
                validationMessageShow('rii-uc', textStatus.statusText);
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
                    validationMessageShow('rii-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-rii-uc').html(parseData.message);
                removeDocument('challan', 'rii_upload_challan');
                $('#status_' + riiId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-rii-uc').html('');
        validationMessageHide();
        var riiId = $('#rii_id_for_rii_upload_challan').val();
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_rii_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO) {
            $('#payment_type_for_rii_upload_challan_1').focus();
            validationMessageShow('rii-uc-payment_type_for_rii_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_rii_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_rii_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_rii_upload_challan').focus();
                validationMessageShow('rii-uc-challan_for_rii_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_rii_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_rii_upload_challan').focus();
                validationMessageShow('rii-uc-challan_for_rii_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYNINE, 'rii-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_rii_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#rii_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'rii/upload_challan',
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
                validationMessageShow('rii-uc', textStatus.statusText);
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
                    validationMessageShow('rii-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + riiId).html(appStatusArray[VALUE_THREE]);
                $('#total_fees_' + riiId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + riiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'rii/get_rii_data_by_rii_id',
            type: 'post',
            data: $.extend({}, {'rii_id': riiId}, getTokenData()),
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
                var riiData = parseData.rii_data;
                showPopup();
                $('#popup_container').html(riiApproveTemplate(riiData));
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
        var formData = $('#approve_rii_form').serializeFormJSON();
        if (!formData.rii_id_for_rii_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_rii_approve) {
            $('#registration_number_for_rii_approve').focus();
            validationMessageShow('rii-approve-registration_number_for_rii_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_rii_approve) {
            $('#valid_upto_for_rii_approve').focus();
            validationMessageShow('rii-approve-valid_upto_for_rii_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_rii_approve) {
            $('#remarks_for_rii_approve').focus();
            validationMessageShow('rii-approve-remarks_for_rii_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'rii/approve_application',
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
                validationMessageShow('rii-approve', textStatus.statusText);
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
                    validationMessageShow('rii-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.rii_id_for_rii_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.rii_id_for_rii_approve).remove();
                $('#approve_btn_for_app_' + formData.rii_id_for_rii_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.rii_id_for_rii_approve).show();
                $('#so_status_' + formData.rii_id_for_rii_approve).html(dateTimeDays(formData.rii_id_for_rii_approve, parseData, VALUE_FOURTYNINE));
            }
        });
    },
    askForRejectApplication: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + riiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'rii/get_rii_data_by_rii_id',
            type: 'post',
            data: $.extend({}, {'rii_id': riiId}, getTokenData()),
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
                var riiData = parseData.rii_data;
                showPopup();
                $('#popup_container').html(riiRejectTemplate(riiData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_rii_form').serializeFormJSON();
        if (!formData.rii_id_for_rii_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_rii_reject) {
            $('#remarks_for_rii_reject').focus();
            validationMessageShow('rii-reject-remarks_for_rii_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'rii/reject_application',
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
                validationMessageShow('rii-reject', textStatus.statusText);
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
                    validationMessageShow('rii-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.rii_id_for_rii_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.rii_id_for_rii_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.rii_id_for_rii_reject).remove();
                $('#reject_btn_for_app_' + formData.rii_id_for_rii_reject).remove();
                $('#approve_btn_for_app_' + formData.rii_id_for_rii_reject).remove();
                $('#so_status_' + formData.rii_id_for_rii_reject).html(dateTimeDays(formData.rii_id_for_rii_reject, parseData, VALUE_FOURTYNINE));
            }
        });
    },
    generateCertificate: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#rii_id_for_certificate').val(riiId);
        $('#rii_certificate_pdf_form').submit();
        $('#rii_id_for_certificate').val('');
    },
    getQueryData: function (riiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!riiId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYNINE;
        templateData.module_id = riiId;
        var btnObj = $('#query_btn_for_app_' + riiId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYNINE, moduleData.rii_id);
                tmpData.applicant_name = moduleData.user_name;
                tmpData.title = 'Name of User/ Premises ';
                tmpData.module_type = VALUE_FOURTYNINE;
                tmpData.module_id = riiId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (riiId) {
        if (!riiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + riiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'rii/get_rii_data_by_rii_id',
            type: 'post',
            data: $.extend({}, {'rii_id': riiId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var riiData = parseData.rii_data;
                showPopup();
                if (riiData.payment_type == VALUE_ONE) {
                    riiData.user_payment_type_text = paymentTypeArray[riiData.payment_type];
                } else {
                    riiData.user_payment_type_text = userPaymentTypeArray[riiData.user_payment_type] ? userPaymentTypeArray[riiData.user_payment_type] : '';
                }
                if (riiData.payment_type == VALUE_ONE) {
                    riiData.utitle = 'Fees Paid Challan Copy';
                } else if (riiData.payment_type == VALUE_TWO && riiData.user_payment_type == VALUE_ONE) {
                    riiData.utitle = 'Demand Draft (DD) Copy';
                }
                riiData.module_type = VALUE_FOURTYNINE;
                $('#popup_container').html(riiViewPaymentTemplate(riiData));
                loadFB(VALUE_FOURTYNINE, parseData.fb_data, riiData.payment_type);
                loadPH(VALUE_FOURTYNINE, riiData.rii_id, parseData.ph_data);
                if (riiData.payment_type == VALUE_ONE || (riiData.payment_type == VALUE_TWO && riiData.user_payment_type == VALUE_ONE)) {
                    if (riiData.fees_paid_challan != '') {
                        $('#vp_container_for_rii').show();
                        $('#fees_paid_challan_name_href_for_rii').attr('href', RII_DOC_PATH + riiData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_rii').html(riiData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
