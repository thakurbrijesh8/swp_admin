var shopRenewalListTemplate = Handlebars.compile($('#shop_renewal_list_template').html());
var shopRenewalTableTemplate = Handlebars.compile($('#shop_renewal_table_template').html());
var shopRenewalActionTemplate = Handlebars.compile($('#shop_renewal_action_template').html());
var shopRenewalFormTemplate = Handlebars.compile($('#shop_renewal_form_template').html());
var shopRenewalViewTemplate = Handlebars.compile($('#shop_renewal_view_template').html());
var shopRenewalUploadChallanTemplate = Handlebars.compile($('#shop_renewal_upload_challan_template').html());
var shopRenewalApproveTemplate = Handlebars.compile($('#shop_renewal_approve_template').html());
var shopRenewalRejectTemplate = Handlebars.compile($('#shop_renewal_reject_template').html());
var shopRenewalViewPaymentTemplate = Handlebars.compile($('#shop_renewal_view_payment_template').html());

var tempPersonCnt = 1;

var ShopRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
ShopRenewal.Router = Backbone.Router.extend({
    routes: {
        'shop_renewal': 'renderList',
        'shop_renewal_form': 'renderListForForm',
        'edit_shop_renewal_form': 'renderList',
        'view_shop_renewal_form': 'renderList',
    },
    renderList: function () {
        ShopRenewal.listview.listPage();
    },
    renderListForForm: function () {
        ShopRenewal.listview.listPageShopRenewalForm();
    }
});
ShopRenewal.listView = Backbone.View.extend({
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
        addClass('menu_shop_renewal', 'active');
        ShopRenewal.router.navigate('shop_renewal');
        var templateData = {};
        this.$el.html(shopRenewalListTemplate(templateData));
        this.loadShopRenewalData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageShopRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_shop_renewal', 'active');
        this.$el.html(shopRenewalListTemplate);
        this.newShopRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return shopRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYTWO;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return shopRenewalActionTemplate(rowData);
    },
    loadShopRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_shop + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.category;
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
                return regNoRenderer(VALUE_FOURTYTWO, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_FOURTYTWO, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYTWO);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['shop_renewal_data'], function (index, objData) {
                json['shop_renewal_data'][index]['query_movement_string'] = qmData[objData.shop_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.shop_renewal_id] + '</table>') : '-';
            });
            return json['shop_renewal_data'];
        };
        var that = this;
        ShopRenewal.router.navigate('shop_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'ShopRenewal.listview.loadShopRenewalData();');
        $('#shop_renewal_form_and_datatable_container').html(shopRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_shop_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_shop_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_shop_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_shop_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_shop_renewal_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_shop_renewal_list', false);
        $('#district_for_shop_renewal_list').val(searchData.search_district);
        $('#status_for_shop_renewal_list').val(searchData.search_status);
        $('#app_timing_for_shop_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_shop_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_shop_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_shop_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_shop_renewal_list').attr('disabled', 'disabled');
        }
        shopDataTable = $('#shop_renewal_datatable').DataTable({
            ajax: {url: 'shop_renewal/get_shop_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'shop_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'shop_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'shop_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'shop_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
        $('#shop_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = shopDataTable.row(tr);

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
    newShopRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.shop_renewal_data;
            ShopRenewal.router.navigate('edit_shop_renewal_form');
        } else {
            var formData = {};
            ShopRenewal.router.navigate('shop_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.shoprenewal_data = parseData.shop_renewal_data;
        templateData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        $('#shop_renewal_form_and_datatable_container').html(shopRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_shoprenewal').hide();
                $('#seal_and_stamp_name_image_for_shoprenewal').attr('src', SHOP_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_shoprenewal').show();
                $('#seal_and_stamp_download').attr("href", SHOP_DOC_PATH + formData.signature);
            }
        }
        generateSelect2();
        datePicker();
        $('#shop_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitShopRenewal($('#submit_btn_for_shop'));
            }
        });
    },
    editOrViewShopRenewal: function (btnObj, shopRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!shopRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId}, getTokenData()),
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
                    that.newShopRenewalForm(isEdit, parseData);
                } else {
                    that.viewShopRenewalForm(parseData);
                }
            }
        });
    },
    viewShopRenewalForm: function (parseData) {
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
        var formData = parseData.shop_renewal_data;
        ShopRenewal.router.navigate('view_shop_renewal_form');
        formData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#shop_renewal_form_and_datatable_container').html(shopRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_shoprenewal').hide();
            $('#seal_and_stamp_name_image_for_shoprenewal').attr('src', SHOP_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_shoprenewal').show();
            $('#seal_and_stamp_download').attr("href", SHOP_DOC_PATH + formData.signature);
        }
    },
    checkValidationForShopRenewal: function (shopRenewalData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!shopRenewalData.name_of_shop) {
            return getBasicMessageAndFieldJSONArray('name_of_shop', shopNameValidationMessage);
        }
        if (!shopRenewalData.door_no_for_shop) {
            return getBasicMessageAndFieldJSONArray('door_no_for_shop', shopDoorNoValidationMessage);
        }
        if (!shopRenewalData.street_name_for_shop) {
            return getBasicMessageAndFieldJSONArray('street_name_for_shop', shopStreetNameValidationMessage);
        }
        if (!shopRenewalData.loaction_for_shop) {
            return getBasicMessageAndFieldJSONArray('loaction_for_shop', shopLocationValidationMessage);
        }
        if (!shopRenewalData.total_employees || shopRenewalData.total_employees == '0') {
            $('#total_employees').focus();
            $('html, body').animate({scrollTop: '0px'}, 0);
            return getBasicMessageAndFieldJSONArray('total_employees', totalTotalValidationMessage);
        }
        if (!shopRenewalData.nature_of_business_for_shop) {
            return getBasicMessageAndFieldJSONArray('nature_of_business_for_shop', shopNatureOfBusinessValidationMessage);
        }
        if (!shopRenewalData.name_of_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('name_of_employer_for_shop', shopEmployerNameValidationMessage);
        }
        if (!shopRenewalData.mobile_no_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('mobile_no_employer_for_shop', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(shopRenewalData.mobile_no_employer_for_shop);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mobile_no_employer_for_shop', invalidMobileValidationMessage);
        }
        if (!shopRenewalData.residential_address_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('residential_address_employer_for_shop', shopEmployerResidentialAddressValidationMessage);
        }
        if (!shopRenewalData.manager_name_for_shop) {
            return getBasicMessageAndFieldJSONArray('manager_name_for_shop', shopManagerNameValidationMessage);
        }
        if (!shopRenewalData.residential_address_manager_for_shop) {
            return getBasicMessageAndFieldJSONArray('residential_address_manager_for_shop', shopManagerNameValidationMessage);
        }
        if (!shopRenewalData.category_for_shop) {
            return getBasicMessageAndFieldJSONArray('category_for_shop', shopCategoryValidationMessage);
        }
        return '';
    },
    askForSubmitShopRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ShopRenewal.listview.submitShopRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitShopRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var shopData = $('#shop_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForShopRenewal(shopData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('shop_renewal-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#seal_and_stamp_container_for_shop').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_shop').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_shop').focus();
                validationMessageShow('shop_renewal-seal_and_stamp_for_shop', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_shop');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_shop').focus();
                validationMessageShow('shop_renewal-seal_and_stamp_for_shop', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_shop') : $('#submit_btn_for_shop');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var shopData = new FormData($('#shop_renewal_form')[0]);
        shopData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        shopData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/submit_shop_renewal',
            data: shopData,
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
                validationMessageShow('shop_renewal', textStatus.statusText);
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
                    validationMessageShow('shop_renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                ShopRenewal.router.navigate('shop_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (shopRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'ShopRenewal.listview.removeDocument(\'' + shopRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (shopRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/remove_document',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId, 'document_type': docType}, getTokenData()),
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
                validationMessageShow('shop_renewal', textStatus.statusText);
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
                    validationMessageShow('shop_renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                if (docType == VALUE_ONE) {
                    $('#seal_and_stamp_name_container_for_shoprenewal').hide();
                    $('#seal_and_stamp_name_image_for_shoprenewal').attr('src', '');
                    $('#seal_and_stamp_container_for_shoprenewal').show();
                    $('#seal_and_stamp_for_shoprenewal').val('');
                }

            }
        });
    },
    generateForm: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#shop_renewal_id_for_shop_renewal_form').val(shopRenewalId);
        $('#shop_renewal_form_pdf_form').submit();
        $('#shop_renewal_id_for_shop_renewal_form').val('');
    },
    openUploadChallan: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + shopRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_renewal_data_by_shop_renewal_id',
            type: 'post',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var shopRenewalData = parseData.shop_renewal_data;
                showPopup();
                if (shopRenewalData.payment_type == VALUE_ONE) {
                    shopRenewalData.utitle = 'Challan Copy';
                } else {
                    shopRenewalData.utitle = 'Payment Details';
                }
                shopRenewalData.module_type = VALUE_FOURTYTWO;
                $('#popup_container').html(shopRenewalUploadChallanTemplate(shopRenewalData));
                loadFB(VALUE_FOURTYTWO, parseData.fb_data, shopRenewalData.payment_type, shopRenewalData.show_remove_upload_btn, shopRenewalData.show_dropdown, shopRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'shop_renewal_upload_challan', shopRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'shop_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYTWO);
                if (shopRenewalData.challan != '') {
                    $('#challan_container_for_shop_renewal_upload_challan').hide();
                    $('#challan_name_container_for_shop_renewal_upload_challan').show();
                    $('#challan_name_href_for_shop_renewal_upload_challan').attr('href', 'documents/shop/' + shopRenewalData.challan);
                    $('#challan_name_for_shop_renewal_upload_challan').html(shopRenewalData.challan);
                    $('#challan_remove_btn_for_shop_renewal_upload_challan').attr('onclick', 'ShopRenewal.listview.removeChallan("' + shopRenewalData.shop_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (shopRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/remove_challan',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId}, getTokenData()),
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
                validationMessageShow('shop_renewal-uc', textStatus.statusText);
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
                    validationMessageShow('shop_renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-shop_renewal-uc').html(parseData.message);
                removeDocument('challan', 'shop_renewal_upload_challan');
                $('#status_' + shopRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-shop_renewal-uc').html('');
        validationMessageHide();
        var shopRenewalId = $('#shop_renewal_id_for_shop_renewal_upload_challan').val();
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_shop_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_shop_renewal_upload_challan_1').focus();
            validationMessageShow('shop_renewal-uc-payment_type_for_shop_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_shop_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_shop_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_shop_renewal_upload_challan').focus();
                validationMessageShow('shop_renewal-uc-challan_for_shop_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_shop_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_shop_renewal_upload_challan').focus();
                validationMessageShow('shop_renewal-uc-challan_for_shop_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYTWO, 'shop_renewal-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_shop_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#shop_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/upload_challan',
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
                validationMessageShow('shop_renewal-uc', textStatus.statusText);
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
                    validationMessageShow('shop_renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + shopRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + shopRenewalId).show();
                }
                $('#total_fees_' + shopRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + shopRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_renewal_data_by_shop_renewal_id',
            type: 'post',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId}, getTokenData()),
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
                var shopRenewalData = parseData.shop_renewal_data;
                showPopup();
                $('#popup_container').html(shopRenewalApproveTemplate(shopRenewalData));
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
        var formData = $('#approve_shop_renewal_form').serializeFormJSON();
        if (!formData.shop_renewal_id_for_shop_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_shop_renewal_approve) {
            $('#registration_number_for_shop_renewal_approve').focus();
            validationMessageShow('shop_renewal-approve-registration_number_for_shop_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_shop_renewal_approve) {
            $('#valid_upto_for_shop_renewal_approve').focus();
            validationMessageShow('shop_renewal-approve-valid_upto_for_shop_renewal_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_shop_renewal_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_shop_renewal_approve').focus();
            validationMessageShow('shop_renewal-approve-certificate_file_for_shop_renewal_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_shop_renewal_approve) {
            $('#remarks_for_shop_renewal_approve').focus();
            validationMessageShow('shop_renewal-approve-remarks_for_shop_renewal_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_shop_renewal_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_shop_renewal_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/approve_application',
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
                validationMessageShow('shop_renewal-approve', textStatus.statusText);
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
                    validationMessageShow('shop_renewal-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.shop_renewal_id_for_shop_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_approve).show();
                $('#so_status_' + formData.shop_renewal_id_for_shop_renewal_approve).html(dateTimeDays(formData.shop_renewal_id_for_shop_renewal_approve, parseData, VALUE_FOURTYTWO));
            }
        });
    },
    askForRejectApplication: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + shopRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_renewal_data_by_shop_renewal_id',
            type: 'post',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId}, getTokenData()),
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
                var shopRenewalData = parseData.shop_renewal_data;
                showPopup();
                $('#popup_container').html(shopRenewalRejectTemplate(shopRenewalData));
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
        var formData = $('#reject_shop_renewal_form').serializeFormJSON();
        if (!formData.shop_renewal_id_for_shop_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_shop_renewal_reject) {
            $('#remarks_for_shop_renewal_reject').focus();
            validationMessageShow('shop_renewal-reject-remarks_for_shop_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'shop_renewal/reject_application',
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
                validationMessageShow('shop_renewal-reject', textStatus.statusText);
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
                    validationMessageShow('shop_renewal-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.shop_renewal_id_for_shop_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.shop_renewal_id_for_shop_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.shop_renewal_id_for_shop_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.shop_renewal_id_for_shop_renewal_reject).remove();
                $('#so_status_' + formData.shop_renewal_id_for_shop_renewal_reject).html(dateTimeDays(formData.shop_renewal_id_for_shop_renewal_reject, parseData, VALUE_FOURTYTWO));
            }
        });
    },
    generateCertificate: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#shop_renewal_id_for_certificate').val(shopRenewalId);
        $('#shop_renewal_certificate_pdf_form').submit();
        $('#shop_renewal_id_for_certificate').val('');
    },
    getQueryData: function (shopRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!shopRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYTWO;
        templateData.module_id = shopRenewalId;
        var btnObj = $('#query_btn_for_shoprenewal' + shopRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYTWO, moduleData.shop_renewal_id);
                tmpData.applicant_name = moduleData.name_of_shop;
                tmpData.title = 'Shop & Establishment Name';
                tmpData.module_type = VALUE_FOURTYTWO;
                tmpData.module_id = shopRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getShopData: function (btnObj) {
        var license_number = $('#registration_number').val();
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!license_number || license_number == null) {
            showError('Enter Shop & Establishment License Number !');
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_data_by_id',
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
                shopRenewalData = parseData.shop_data;
                if (shopRenewalData == null) {
                    $('#shop_id').val('');
                    $('#name_of_shop').val('');
                    $('#name_of_employer_for_shop').val('');
                    $('#mobile_no_employer_for_shop').val('');
                    $('#residential_address_employer_for_shop').val('');
                    $('#manager_name_for_shop').val('');
                    $('#residential_address_manager_for_shop').val('');
                    $('#category_for_shop').val('');
                    $('html, body').animate({scrollTop: '0px'}, 0);
                }
                if (shopRenewalData) {
                    if (shopRenewalData.shop_renewal_id != null) {
                        $('#shop_id').val(shopRenewalData.shop_id);
                        $('#name_of_shop').val(shopRenewalData.name_of_shop);
                        $('#name_of_employer_for_shop').val(shopRenewalData.employer_name);
                        $('#mobile_no_employer_for_shop').val(shopRenewalData.employer_mobile_no);
                        $('#residential_address_employer_for_shop').val(shopRenewalData.employer_residential_address);
                        $('#manager_name_for_shop').val(shopRenewalData.manager_name);
                        $('#residential_address_manager_for_shop').val(shopRenewalData.manager_residential_address);
                        $('#category_for_shop').val(shopRenewalData.category);
                        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
                        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
                        $('#district').val(shopRenewalData.district);
                        $('#entity_establishment_type').val(shopRenewalData.entity_establishment_type);

                    } else {
                        $('#shop_id').val(shopRenewalData.s_id);
                        $('#name_of_shop').val(shopRenewalData.s_name);
                        $('#name_of_employer_for_shop').val(shopRenewalData.s_employer_name);
                        $('#mobile_no_employer_for_shop').val(shopRenewalData.s_employer_mobile_no);
                        $('#residential_address_employer_for_shop').val(shopRenewalData.s_employer_residential_address);
                        $('#manager_name_for_shop').val(shopRenewalData.s_manager_name);
                        $('#residential_address_manager_for_shop').val(shopRenewalData.s_manager_residential_address);
                        $('#category_for_shop').val(shopRenewalData.s_category);
                        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
                        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
                        $('#district').val(shopRenewalData.district);
                        $('#entity_establishment_type').val(shopRenewalData.entity_establishment_type);
                    }
                }
            }
        });
    },
    viewPayment: function (shopRenewalId) {
        if (!shopRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + shopRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop_renewal/get_shop_renewal_data_by_shop_renewal_id',
            type: 'post',
            data: $.extend({}, {'shop_renewal_id': shopRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var shopRenewalData = parseData.shop_renewal_data;
                showPopup();
                if (shopRenewalData.payment_type == VALUE_ONE || shopRenewalData.payment_type == VALUE_THREE) {
                    shopRenewalData.user_payment_type_text = paymentTypeArray[shopRenewalData.payment_type];
                } else {
                    shopRenewalData.user_payment_type_text = userPaymentTypeArray[shopRenewalData.user_payment_type] ? userPaymentTypeArray[shopRenewalData.user_payment_type] : '';
                }
                if (shopRenewalData.payment_type == VALUE_ONE) {
                    shopRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (shopRenewalData.payment_type == VALUE_TWO && shopRenewalData.user_payment_type == VALUE_ONE) {
                    shopRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                shopRenewalData.module_type = VALUE_FOURTYTWO;
                $('#popup_container').html(shopRenewalViewPaymentTemplate(shopRenewalData));
                loadFB(VALUE_FOURTYTWO, parseData.fb_data, shopRenewalData.payment_type);
                loadPH(VALUE_FOURTYTWO, shopRenewalData.shop_renewal_id, parseData.ph_data);
                if (shopRenewalData.payment_type == VALUE_ONE || (shopRenewalData.payment_type == VALUE_TWO && shopRenewalData.user_payment_type == VALUE_ONE)) {
                    if (shopRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_shop_renewal').show();
                        $('#fees_paid_challan_name_href_for_shop_renewal').attr('href', SHOP_DOC_PATH + shopRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_shop_renewal').html(shopRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
