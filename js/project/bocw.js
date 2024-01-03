var bocwListTemplate = Handlebars.compile($('#bocw_list_template').html());
var bocwTableTemplate = Handlebars.compile($('#bocw_table_template').html());
var bocwActionTemplate = Handlebars.compile($('#bocw_action_template').html());
var bocwFormTemplate = Handlebars.compile($('#bocw_form_template').html());
var bocwViewTemplate = Handlebars.compile($('#bocw_view_template').html());
var bocwUploadChallanTemplate = Handlebars.compile($('#bocw_upload_challan_template').html());
var bocwApproveTemplate = Handlebars.compile($('#bocw_approve_template').html());
var bocwRejectTemplate = Handlebars.compile($('#bocw_reject_template').html());
var bocwViewPaymentTemplate = Handlebars.compile($('#bocw_view_payment_template').html());

var BOCW = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
BOCW.Router = Backbone.Router.extend({
    routes: {
        'bocw': 'renderList',
        'bocw_form': 'renderListForForm',
        'edit_bocw_form': 'renderList',
        'view_bocw_form': 'renderList',
    },
    renderList: function () {
        BOCW.listview.listPage();
    },
    renderListForForm: function () {
        BOCW.listview.listPageBOCWForm();
    }
});
BOCW.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_bocw', 'active');
        BOCW.router.navigate('bocw');
        var templateData = {};
        this.$el.html(bocwListTemplate(templateData));
        this.loadBOCWData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageBOCWForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_bocw', 'active');
        this.$el.html(bocwListTemplate);
        this.newBOCWForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return bocwActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYTWO;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return bocwActionTemplate(rowData);
    },
    loadBOCWData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_location_of_est + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.nature_of_building;
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
                return regNoRenderer(VALUE_THIRTYTWO, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THIRTYTWO, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYTWO);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['bocw_data'], function (index, objData) {
                json['bocw_data'][index]['query_movement_string'] = qmData[objData.bocw_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.bocw_id] + '</table>') : '-';
            });
            return json['bocw_data'];
        };
        var that = this;
        BOCW.router.navigate('bocw');
        showTableContainer('bocw');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'BOCW.listview.loadBOCWData();');
        $('#bocw_datatable_container').html(bocwTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_bocw_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_bocw_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_bocw_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_bocw_list', false);
        allowOnlyIntegerValue('mobile_number_for_bocw_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_bocw_list', false);
        $('#district_for_bocw_list').val(searchData.search_district);
        $('#status_for_bocw_list').val(searchData.search_status);
        $('#app_timing_for_bocw_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_bocw_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_bocw_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_bocw_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_bocw_list').attr('disabled', 'disabled');
        }
        bocwDataTable = $('#bocw_datatable').DataTable({
            ajax: {url: 'bocw/get_bocw_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'bocw_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'bocw_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'bocw_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'bocw_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#bocw_datatable_filter').remove();
        $('#bocw_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = bocwDataTable.row(tr);

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
    newBOCWForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.bocw_data;
            BOCW.router.navigate('edit_bocw_form');
        } else {
            var formData = {};
            BOCW.router.navigate('bocw_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.bocw_data = parseData.bocw_data;
        templateData.estimated_date_of_commencement = dateTo_DD_MM_YYYY(formData.estimated_date_of_commencement);
        templateData.estimated_date_of_completion = dateTo_DD_MM_YYYY(formData.estimated_date_of_completion);
        showFormContainer('bocw');
        $('#bocw_form_container').html(bocwFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');

            if (formData.workorder_copy != '') {
                $('#workorder_copy_container_for_bocw').hide();
                $('#workorder_copy_name_image_for_bocw').attr('src', BOCW_DOC_PATH + formData.workorder_copy);
                $('#workorder_copy_name_container_for_bocw').show();
                $('#workorder_copy_name_download').attr("href", BOCW_DOC_PATH + formData.workorder_copy);
            }
            if (formData.sign_of_principal_employee != '') {
                $('#seal_and_stamp_container_for_bocw').hide();
                $('#seal_and_stamp_name_image_for_bocw').attr('src', BOCW_DOC_PATH + formData.sign_of_principal_employee);
                $('#seal_and_stamp_name_container_for_bocw').show();
            }
        }
        generateSelect2();
        datePicker();
        $('#bocw_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitBOCW($('#submit_btn_for_bocw'));
            }
        });
    },
    editOrViewBOCW: function (btnObj, bocwId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!bocwId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'bocw/get_bocw_data_by_id',
            type: 'post',
            data: $.extend({}, {'bocw_id': bocwId}, getTokenData()),
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
                    that.newBOCWForm(isEdit, parseData);
                } else {
                    that.viewBOCWForm(parseData);
                }
            }
        });
    },
    viewBOCWForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.bocw_data;
        BOCW.router.navigate('view_bocw_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.estimated_date_of_commencement = dateTo_DD_MM_YYYY(formData.estimated_date_of_commencement);
        formData.estimated_date_of_completion = dateTo_DD_MM_YYYY(formData.estimated_date_of_completion);
        showFormContainer('bocw');
        $('#bocw_form_container').html(bocwViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        $('#declarationone').attr('checked', 'checked');
        $('#declarationtwo').attr('checked', 'checked');

        if (formData.workorder_copy != '') {
            $('#workorder_copy_container_for_bocw').hide();
            $('#workorder_copy_name_image_for_bocw').attr('src', BOCW_DOC_PATH + formData.workorder_copy);
            $('#workorder_copy_name_container_for_bocw').show();
            $('#workorder_copy_name_download').attr("href", BOCW_DOC_PATH + formData.workorder_copy);
        }
        if (formData.sign_of_principal_employee != '') {
            $('#seal_and_stamp_container_for_bocw').hide();
            $('#seal_and_stamp_name_image_for_bocw').attr('src', BOCW_DOC_PATH + formData.sign_of_principal_employee);
            $('#seal_and_stamp_name_container_for_bocw').show();
        }
    },
    checkValidationForBOCW: function (bocwData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!bocwData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!bocwData.name_location_of_est) {
            return getBasicMessageAndFieldJSONArray('name_location_of_est', nameLocationValidationMessage);
        }
        if (!bocwData.postal_address_of_est) {
            return getBasicMessageAndFieldJSONArray('postal_address_of_est', postalAddressValidationMessage);
        }
        if (!bocwData.name_address_of_manager) {
            return getBasicMessageAndFieldJSONArray('name_address_of_manager', managerNameAddressValidationMessage);
        }
        if (!bocwData.nature_of_building) {
            return getBasicMessageAndFieldJSONArray('nature_of_building', buildingNatureValidationMessage);
        }
        if (!bocwData.max_num_building_workers || bocwData.max_num_building_workers <= 0) {
            return getBasicMessageAndFieldJSONArray('max_num_building_workers', maxnumberValidationMessage);
        }
        if (!bocwData.estimated_date_of_commencement) {
            return getBasicMessageAndFieldJSONArray('estimated_date_of_commencement', commencementDateValidationMessage);
        }
        if (!bocwData.estimated_date_of_completion) {
            return getBasicMessageAndFieldJSONArray('estimated_date_of_completion', completionDateValidationMessage);
        }
        if (!bocwData.declarationone) {
            return getBasicMessageAndFieldJSONArray('declarationone', declarationOneValidationMessage);
        }
        if (!bocwData.declarationtwo) {
            return getBasicMessageAndFieldJSONArray('declarationtwo', declarationTwoValidationMessage);
        }

        return '';
    },
    askForSubmitBOCW: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BOCW.listview.submitBOCW(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitBOCW: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var bocwData = $('#bocw_form').serializeFormJSON();
        var validationData = that.checkValidationForBOCW(bocwData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('bocw-' + validationData.field, validationData.message);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_bocw') : $('#submit_btn_for_bocw');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        //var url = bocwData.bocw_id ? 'update' : 'save';
        var bocwData = new FormData($('#bocw_form')[0]);
        bocwData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        bocwData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'bocw/submit_bocw',
            data: bocwData,
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
                validationMessageShow('bocw', textStatus.statusText);
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
                    validationMessageShow('bocw', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                BOCW.router.navigate('bocw', {'trigger': true});
            }
        });
    },

    viewDocumentFile: function (FileName, bocwId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/bocw/' + bocwId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/bocw/' + bocwId + '/' + FileName + ' style=width:250px;height:250px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="BOCW.listview.askForDeleteforDocumentFile(' + bocwId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (bocwId, dbFileNameField, postId, postContainer) {
        if (!bocwId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'BOCW.listview.deleteDocumentFile(' + bocwId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (bocwId, dbFileNameField, postId, postContainer) {
        if (!bocwId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'bocw/delete_upload_file_for_bocw',
            type: 'POST',
            data: $.extend({}, {'bocw_id': bocwId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
    generateForm1: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#bocw_id_for_bocw_form1').val(bocwId);
        $('#bocw_form1_pdf_form').submit();
        $('#bocw_id_for_bocw_form1').val('');
    },
    openUploadChallan: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + bocwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'bocw/get_bocw_data_by_bocw_id',
            type: 'post',
            data: $.extend({}, {'bocw_id': bocwId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var bocwData = parseData.bocw_data;
                showPopup();
                if (bocwData.payment_type == VALUE_ONE) {
                    bocwData.utitle = 'Challan Copy';
                } else {
                    bocwData.utitle = 'Payment Details';
                }
                bocwData.module_type = VALUE_THIRTYTWO;
                $('#popup_container').html(bocwUploadChallanTemplate(bocwData));
                loadFB(VALUE_THIRTYTWO, parseData.fb_data, bocwData.payment_type, bocwData.show_remove_upload_btn, bocwData.show_dropdown, bocwData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'bocw_upload_challan', bocwData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'bocw_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYTWO);
                if (bocwData.challan != '') {
                    $('#challan_container_for_bocw_upload_challan').hide();
                    $('#challan_name_container_for_bocw_upload_challan').show();
                    $('#challan_name_href_for_bocw_upload_challan').attr('href', 'documents/bocw/' + bocwData.challan);
                    $('#challan_name_for_bocw_upload_challan').html(bocwData.challan);
                    $('#challan_remove_btn_for_bocw_upload_challan').attr('onclick', 'BOCW.listview.removeChallan("' + bocwData.bocw_id + '")');
                }
            }
        });
    },
    removeChallan: function (bocwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'bocw/remove_challan',
            data: $.extend({}, {'bocw_id': bocwId}, getTokenData()),
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
                validationMessageShow('bocw-uc', textStatus.statusText);
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
                    validationMessageShow('bocw-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-bocw-uc').html(parseData.message);
                removeDocument('challan', 'bocw_upload_challan');
                $('#status_' + bocwId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-bocw-uc').html('');
        validationMessageHide();
        var bocwId = $('#bocw_id_for_bocw_upload_challan').val();
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_bocw_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_bocw_upload_challan_1').focus();
            validationMessageShow('bocw-uc-payment_type_for_bocw_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_bocw_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_bocw_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_bocw_upload_challan').focus();
                validationMessageShow('bocw-uc-challan_for_bocw_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_bocw_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_bocw_upload_challan').focus();
                validationMessageShow('bocw-uc-challan_for_bocw_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYTWO, 'bocw-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_bocw_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#bocw_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'bocw/upload_challan',
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
                validationMessageShow('bocw-uc', textStatus.statusText);
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
                    validationMessageShow('bocw-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + bocwId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + bocwId).show();
                }
                $('#total_fees_' + bocwId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + bocwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'bocw/get_bocw_data_by_bocw_id',
            type: 'post',
            data: $.extend({}, {'bocw_id': bocwId}, getTokenData()),
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
                var bocwData = parseData.bocw_data;
                showPopup();
                $('#popup_container').html(bocwApproveTemplate(bocwData));
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
        var formData = $('#approve_bocw_form').serializeFormJSON();
        if (!formData.bocw_id_for_bocw_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_bocw_approve) {
            $('#registration_number_for_bocw_approve').focus();
            validationMessageShow('bocw-approve-registration_number_for_bocw_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_bocw_approve) {
            $('#valid_upto_for_bocw_approve').focus();
            validationMessageShow('bocw-approve-valid_upto_for_bocw_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_bocw_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_bocw_approve').focus();
            validationMessageShow('bocw-approve-certificate_file_for_bocw_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_bocw_approve) {
            $('#remarks_for_bocw_approve').focus();
            validationMessageShow('bocw-approve-remarks_for_bocw_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_bocw_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_bocw_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'bocw/approve_application',
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
                validationMessageShow('bocw-approve', textStatus.statusText);
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
                    validationMessageShow('bocw-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.bocw_id_for_bocw_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.bocw_id_for_bocw_approve).remove();
                $('#approve_btn_for_app_' + formData.bocw_id_for_bocw_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.bocw_id_for_bocw_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.bocw_id_for_bocw_approve).show();
                $('#so_status_' + formData.bocw_id_for_bocw_approve).html(dateTimeDays(formData.bocw_id_for_bocw_approve, parseData, VALUE_THIRTYTWO));
            }
        });
    },
    askForRejectApplication: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + bocwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'bocw/get_bocw_data_by_bocw_id',
            type: 'post',
            data: $.extend({}, {'bocw_id': bocwId}, getTokenData()),
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
                var bocwData = parseData.bocw_data;
                showPopup();
                $('#popup_container').html(bocwRejectTemplate(bocwData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_bocw_form').serializeFormJSON();
        if (!formData.bocw_id_for_bocw_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_bocw_reject) {
            $('#remarks_for_bocw_reject').focus();
            validationMessageShow('bocw-reject-remarks_for_bocw_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'bocw/reject_application',
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
                validationMessageShow('bocw-reject', textStatus.statusText);
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
                    validationMessageShow('bocw-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.bocw_id_for_bocw_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.bocw_id_for_bocw_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.bocw_id_for_bocw_reject).remove();
                $('#reject_btn_for_app_' + formData.bocw_id_for_bocw_reject).remove();
                $('#approve_btn_for_app_' + formData.bocw_id_for_bocw_reject).remove();
                $('#so_status_' + formData.bocw_id_for_bocw_reject).html(dateTimeDays(formData.bocw_id_for_bocw_reject, parseData, VALUE_THIRTYTWO));
            }
        });
    },
    generateCertificate: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#bocw_id_for_certificate').val(bocwId);
        $('#bocw_certificate_pdf_form').submit();
        $('#bocw_id_for_certificate').val('');
    },
    getQueryData: function (bocwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!bocwId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYTWO;
        templateData.module_id = bocwId;
        var btnObj = $('#query_btn_for_app_' + bocwId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYTWO, moduleData.bocw_id);
                tmpData.applicant_name = moduleData.name_location_of_est;
                tmpData.title = 'Establishment Name & Location';
                tmpData.module_type = VALUE_THIRTYTWO;
                tmpData.module_id = bocwId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (bocwId) {
        if (!bocwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + bocwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'bocw/get_bocw_data_by_bocw_id',
            type: 'post',
            data: $.extend({}, {'bocw_id': bocwId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var bocwData = parseData.bocw_data;
                showPopup();
                if (bocwData.payment_type == VALUE_ONE || bocwData.payment_type == VALUE_THREE) {
                    bocwData.user_payment_type_text = paymentTypeArray[bocwData.payment_type];
                } else {
                    bocwData.user_payment_type_text = userPaymentTypeArray[bocwData.user_payment_type] ? userPaymentTypeArray[bocwData.user_payment_type] : '';
                }
                if (bocwData.payment_type == VALUE_ONE) {
                    bocwData.utitle = 'Fees Paid Challan Copy';
                } else if (bocwData.payment_type == VALUE_TWO && bocwData.user_payment_type == VALUE_ONE) {
                    bocwData.utitle = 'Demand Draft (DD) Copy';
                }
                bocwData.module_type = VALUE_THIRTYTWO;
                $('#popup_container').html(bocwViewPaymentTemplate(bocwData));
                loadFB(VALUE_THIRTYTWO, parseData.fb_data, bocwData.payment_type);
                loadPH(VALUE_THIRTYTWO, bocwData.bocw_id, parseData.ph_data);
                if (bocwData.payment_type == VALUE_ONE || (bocwData.payment_type == VALUE_TWO && bocwData.user_payment_type == VALUE_ONE)) {
                    if (bocwData.fees_paid_challan != '') {
                        $('#vp_container_for_bocw').show();
                        $('#fees_paid_challan_name_href_for_bocw').attr('href', BOCW_DOC_PATH + bocwData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_bocw').html(bocwData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
