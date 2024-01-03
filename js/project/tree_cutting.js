var treeCuttingListTemplate = Handlebars.compile($('#tree_cutting_list_template').html());
var treeCuttingTableTemplate = Handlebars.compile($('#tree_cutting_table_template').html());
var treeCuttingActionTemplate = Handlebars.compile($('#tree_cutting_action_template').html());
var treeCuttingViewTemplate = Handlebars.compile($('#tree_cutting_view_template').html());
var treeCuttingUploadChallanTemplate = Handlebars.compile($('#tree_cutting_upload_challan_template').html());
var treeCuttingViewPaymentTemplate = Handlebars.compile($('#tree_cutting_view_payment_template').html());
var treeCuttingApproveTemplate = Handlebars.compile($('#tree_cutting_approve_template').html());
var treeCuttingRejectTemplate = Handlebars.compile($('#tree_cutting_reject_template').html());
var TreeCutting = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
TreeCutting.Router = Backbone.Router.extend({
    routes: {
        'tree_cutting': 'listPage'
    },
    listPage: function () {
        TreeCutting.listview.listPage();
    }
});
TreeCutting.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FOREST && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_forest');
        addClass('menu_tree_cutting', 'active');
        TreeCutting.router.navigate('tree_cutting');
        var templateData = {};
        this.$el.html(treeCuttingListTemplate(templateData));
        this.loadTreeCuttingData(sDistrict, sStatus, sAppTimingStatus);
    },
    treeCuttingActionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return treeCuttingActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
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
        rowData.module_type = VALUE_FIFTYNINE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return treeCuttingActionTemplate(rowData);
    },
    loadTreeCuttingData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FOREST && tempTypeInSession != TEMP_TYPE_VDD) {
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
            var tString = '';
            if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
                tString = regNoRenderer(VALUE_FIFTYNINE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            } else {
                tString = regNoRenderer(VALUE_FIFTYNINE, data);
            }
            var villageData = full.district == VALUE_ONE ? damanVillagesArray : (full.district == VALUE_TWO ? diuVillagesArray : (full.district == VALUE_THREE ? dnhVillagesArray : []));
            tString += '<hr>' + (villageData[full.village_dmc_ward] ? villageData[full.village_dmc_ward] : '');
            return tString;
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FIFTYNINE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['tree_cutting_data'], function (index, objData) {
                json['tree_cutting_data'][index]['query_movement_string'] = qmData[objData.tree_cutting_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.tree_cutting_id] + '</table>') : '-';
            });
            return json['tree_cutting_data'];
        };
        var that = this;
        TreeCutting.router.navigate('tree_cutting');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'TreeCutting.listview.listPage();');
        $('#tree_cutting_form_and_datatable_container').html(treeCuttingTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_tree_cutting_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_tree_cutting_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_tree_cutting_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_tree_cutting_list', false);
        allowOnlyIntegerValue('mobile_number_for_tree_cutting_list')
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_tree_cutting_list', false);
        $('#district_for_tree_cutting_list').val(searchData.search_district);
        $('#status_for_tree_cutting_list').val(searchData.search_status);
        $('#app_timing_for_tree_cutting_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_tree_cutting_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_tree_cutting_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_tree_cutting_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_tree_cutting_list').attr('disabled', 'disabled');
        }
        treeCuttingDataTable = $('#tree_cutting_datatable').DataTable({
            ajax: {url: 'tree_cutting/get_tree_cutting_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'tree_cutting_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': 'f-s-13px', 'render': appDetailsRenderer},
                {data: 'tree_cutting_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'tree_cutting_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'tree_cutting_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#tree_cutting_datatable_filter').remove();
        $('#tree_cutting_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = treeCuttingDataTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(that.treeCuttingActionRenderer(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    editOrViewTreeCutting: function (btnObj, treeCuttingId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FOREST && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!treeCuttingId) {
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
            url: 'tree_cutting/get_tree_cutting_data_by_id',
            type: 'post',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId}, getTokenData()),
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
                    that.viewTreeCuttingForm(parseData);
                }
            }
        });
    },
    viewTreeCuttingForm: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var treeCuttingData = parseData.tree_cutting_data;
        treeCuttingData.module_type = VALUE_FIFTYNINE;
        treeCuttingData.application_number = regNoRenderer(VALUE_FIFTYNINE, treeCuttingData.tree_cutting_id);
        treeCuttingData.district_text = talukaArray[treeCuttingData.district] ? talukaArray[treeCuttingData.district] : '';
        var villageData = treeCuttingData.district == VALUE_ONE ? damanVillagesArray : (treeCuttingData.district == VALUE_TWO ? diuVillagesArray : (treeCuttingData.district == VALUE_THREE ? dnhVillagesArray : []));
        treeCuttingData.village_dmc_ward_text = villageData[treeCuttingData.village_dmc_ward] ? villageData[treeCuttingData.village_dmc_ward] : '';
        treeCuttingData.entity_establishment_type_text = entityEstablishmentTypeArray[treeCuttingData.entity_establishment_type] ? entityEstablishmentTypeArray[treeCuttingData.entity_establishment_type] : '';
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(treeCuttingViewTemplate(treeCuttingData));

        loadMDoc(VALUE_FIFTYNINE, treeCuttingData.m_doc, '_view');
        if (treeCuttingData['m_other_doc'].length != VALUE_ZERO) {
            loadMOtherDoc(VALUE_FIFTYNINE, treeCuttingData.m_other_doc, '_view');
        }
    },
    openUploadChallan: function (treeCuttingId) {
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + treeCuttingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tree_cutting/get_tree_cutting_data_by_tree_cutting_id',
            type: 'post',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var treeCuttingData = parseData.tree_cutting_data;
                showPopup();
                if (treeCuttingData.payment_type == VALUE_ONE) {
                    treeCuttingData.utitle = 'Challan Copy';
                } else {
                    treeCuttingData.utitle = 'Payment Details';
                }
                treeCuttingData.module_type = VALUE_FIFTYNINE;
                $('#popup_container').html(treeCuttingUploadChallanTemplate(treeCuttingData));
                loadFB(VALUE_FIFTYNINE, parseData.fb_data, treeCuttingData.payment_type, treeCuttingData.show_remove_upload_btn, treeCuttingData.show_dropdown, treeCuttingData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'tree_cutting_upload_challan', treeCuttingData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'tree_cutting_upload_challan', 'uc', 'radio', '#fb', VALUE_FIFTYNINE);
                if (treeCuttingData.challan != '') {
                    $('#challan_container_for_tree_cutting_upload_challan').hide();
                    $('#challan_name_container_for_tree_cutting_upload_challan').show();
                    $('#challan_name_href_for_tree_cutting_upload_challan').attr('href', 'documents/tree_cutting/' + treeCuttingData.challan);
                    $('#challan_name_for_tree_cutting_upload_challan').html(treeCuttingData.challan);
                    $('#challan_remove_btn_for_tree_cutting_upload_challan').attr('onclick', 'TreeCutting.listview.removeChallan("' + treeCuttingData.tree_cutting_id + '")');
                }
            }
        });
    },
    removeChallan: function (treeCuttingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'tree_cutting/remove_challan',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId}, getTokenData()),
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
                validationMessageShow('tree-cutting-uc', textStatus.statusText);
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
                    validationMessageShow('tree-cutting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-tree-cutting-uc').html(parseData.message);
                removeDocument('challan', 'tree_cutting_upload_challan');
                $('#status_' + treeCuttingId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-tree-cutting-uc').html('');
        validationMessageHide();
        var treeCuttingId = $('#tree_cutting_id_for_tree_cutting_upload_challan').val();
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_tree_cutting_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_tree_cutting_upload_challan_1').focus();
            validationMessageShow('tree-cutting-uc-payment_type_for_tree_cutting_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_tree_cutting_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_tree_cutting_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_tree_cutting_upload_challan').focus();
                validationMessageShow('tree-cutting-uc-challan_for_tree_cutting_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_tree_cutting_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_tree_cutting_upload_challan').focus();
                validationMessageShow('tree-cutting-uc-challan_for_tree_cutting_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FIFTYNINE, 'tree-cutting-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_tree_cutting_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#tree_cutting_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'tree_cutting/upload_challan',
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
                validationMessageShow('tree-cutting-uc', textStatus.statusText);
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
                    validationMessageShow('tree-cutting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + treeCuttingId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + treeCuttingId).show();
                }
                $('#total_fees_' + treeCuttingId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }});
    },
    askForApproveApplication: function (treeCuttingId) {
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + treeCuttingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tree_cutting/get_tree_cutting_data_by_tree_cutting_id',
            type: 'post',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId}, getTokenData()),
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
                var treeCuttingData = parseData.tree_cutting_data;
                showPopup();
                $('#popup_container').html(treeCuttingApproveTemplate(treeCuttingData));
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
        var formData = $('#approve_tree_cutting_form').serializeFormJSON();
        if (!formData.tree_cutting_id_for_tree_cutting_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_tree_cutting_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_tree_cutting_approve').focus();
            validationMessageShow('tree-cutting-approve-certificate_file_for_tree_cutting_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_tree_cutting_approve) {
            $('#remarks_for_tree_cutting_approve').focus();
            validationMessageShow('tree-cutting-approve-remarks_for_tree_cutting_approve', remarksValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#submit_btn_for_tree_cutting_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_tree_cutting_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'tree_cutting/approve_application',
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
                validationMessageShow('tree-cutting-approve', textStatus.statusText);
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
                    validationMessageShow('tree-cutting-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadTreeCuttingData();
            }
        });
    },
    askForRejectApplication: function (treeCuttingId) {
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + treeCuttingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tree_cutting/get_tree_cutting_data_by_tree_cutting_id',
            type: 'post',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId}, getTokenData()),
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
                var treeCuttingData = parseData.tree_cutting_data;
                showPopup();
                $('#popup_container').html(treeCuttingRejectTemplate(treeCuttingData));
            }
        });
    },
    rejectApplication: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_tree_cutting_form').serializeFormJSON();
        if (!formData.tree_cutting_id_for_tree_cutting_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_tree_cutting_reject) {
            $('#remarks_for_tree_cutting_reject').focus();
            validationMessageShow('tree-cutting-reject-remarks_for_tree_cutting_reject', remarksValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'tree_cutting/reject_application',
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
                validationMessageShow('tree-cutting-reject', textStatus.statusText);
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
                    validationMessageShow('tree-cutting-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadTreeCuttingData();
            }
        });
    },
    getQueryData: function (treeCuttingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FIFTYNINE;
        templateData.module_id = treeCuttingId;
        var btnObj = $('#query_btn_for_app_' + treeCuttingId);
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
                tmpData.application_number = regNoRenderer(VALUE_FIFTYNINE, moduleData.tree_cutting_id);
                tmpData.applicant_name = moduleData.applicant_name;
                tmpData.title = 'Applicant_name';
                tmpData.module_type = VALUE_FIFTYNINE;
                tmpData.module_id = treeCuttingId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (treeCuttingId) {
        if (!treeCuttingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + treeCuttingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'tree_cutting/get_tree_cutting_data_by_tree_cutting_id',
            type: 'post',
            data: $.extend({}, {'tree_cutting_id': treeCuttingId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var treeCuttingData = parseData.tree_cutting_data;
                showPopup();
                if (treeCuttingData.payment_type == VALUE_ONE || treeCuttingData.payment_type == VALUE_THREE) {
                    treeCuttingData.user_payment_type_text = paymentTypeArray[treeCuttingData.payment_type];
                } else {
                    treeCuttingData.user_payment_type_text = userPaymentTypeArray[treeCuttingData.user_payment_type] ? userPaymentTypeArray[treeCuttingData.user_payment_type] : '';
                }
                if (treeCuttingData.payment_type == VALUE_ONE) {
                    treeCuttingData.utitle = 'Fees Paid Challan Copy';
                } else if (treeCuttingData.payment_type == VALUE_TWO && treeCuttingData.user_payment_type == VALUE_ONE) {
                    treeCuttingData.utitle = 'Demand Draft (DD) Copy';
                }
                treeCuttingData.module_type = VALUE_FIFTYNINE;
                $('#popup_container').html(treeCuttingViewPaymentTemplate(treeCuttingData));
                loadFB(VALUE_FIFTYNINE, parseData.fb_data, treeCuttingData.payment_type);
                loadPH(VALUE_FIFTYNINE, treeCuttingData.tree_cutting_id, parseData.ph_data);

                if (treeCuttingData.payment_type == VALUE_ONE || (treeCuttingData.payment_type == VALUE_TWO && treeCuttingData.user_payment_type == VALUE_ONE)) {
                    if (treeCuttingData.fees_paid_challan != '') {
                        $('#vp_container_for_tree_cutting').show();
                        $('#fees_paid_challan_name_href_for_tree_cutting').attr('href', TREE_CUTTING_DOC_PATH + treeCuttingData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_tree_cutting').html(treeCuttingData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
