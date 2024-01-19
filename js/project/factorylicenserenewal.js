var factoryLicenseRenewalListTemplate = Handlebars.compile($('#factory_license_renewal_list_template').html());
var factoryLicenseRenewalTableTemplate = Handlebars.compile($('#factory_license_renewal_table_template').html());
var factoryLicenseRenewalActionTemplate = Handlebars.compile($('#factory_license_renewal_action_template').html());
var factoryLicenseRenewalFormTemplate = Handlebars.compile($('#factory_license_renewal_form_template').html());
var factoryLicenseRenewalViewTemplate = Handlebars.compile($('#factory_license_renewal_view_template').html());
var factoryLicenseRenewalUploadChallanTemplate = Handlebars.compile($('#factory_license_renewal_upload_challan_template').html());
var factoryLicenseRenewalApproveTemplate = Handlebars.compile($('#factory_license_renewal_approve_template').html());
var factoryLicenseRenewalRejectTemplate = Handlebars.compile($('#factory_license_renewal_reject_template').html());
var factoryLicenseRenewalViewPaymentTemplate = Handlebars.compile($('#factory_license_renewal_view_payment_template').html());

var tempProductCnt = 1;
var tempDirectorCnt = 1;
var tempEmployeeCnt = 1;

var FactoryLicenseRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
FactoryLicenseRenewal.Router = Backbone.Router.extend({
    routes: {
        'factorylicense_renewal': 'renderList',
        'factorylicense_renewal_form': 'renderListForForm',
        'edit_factorylicense_renewal_form': 'renderList',
        'view_factorylicense_renewal_form': 'renderList',
    },
    renderList: function () {
        FactoryLicenseRenewal.listview.listPage();
    },
    renderListForForm: function () {
        FactoryLicenseRenewal.listview.listPageFactoryLicenseRenewalForm();
    }
});
FactoryLicenseRenewal.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_factory_exists"]': 'hasFactoryExistsEvent',
        'click input[name="factory_extend"]': 'hasFactoryExtendEvent',
    },
    hasFactoryExistsEvent: function (event) {
        var val = $('input[name=is_factory_exists]:checked').val();
        if (val === '1') {
            this.$('.factory_exists_div').show();
        } else {
            this.$('.factory_exists_div').hide();

        }
    },
    hasFactoryExtendEvent: function (event) {
        var val = $('input[name=factory_extend]:checked').val();
        if (val === '1') {
            this.$('.factory_extend_div').show();
        } else {
            this.$('.factory_extend_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_factory_license_renewal', 'active');
        FactoryLicenseRenewal.router.navigate('factorylicense');
        var templateData = {};
        this.$el.html(factoryLicenseRenewalListTemplate(templateData));
        this.loadFactoryLicenseRenewalData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageFactoryLicenseRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_factory_license_renewal', 'active');
        this.$el.html(factoryLicenseRenewalListTemplate);
        this.newFactoryLicenseRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return factoryLicenseRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYONE;
        if (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE || rowData.status == VALUE_FOUR || rowData.status == VALUE_EIGHT || rowData.status == VALUE_NINE) {
            rowData.show_payment_confirm_btn = '';
        } else {
            rowData.show_payment_confirm_btn = 'display: none;';
        }
        //rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return factoryLicenseRenewalActionTemplate(rowData);
    },
    loadFactoryLicenseRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_factory + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.factory_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FOURTYONE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYONE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['factory_license_renewal_data'], function (index, objData) {
                json['factory_license_renewal_data'][index]['query_movement_string'] = qmData[objData.factorylicence_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.factorylicence_renewal_id] + '</table>') : '-';
            });
            return json['factory_license_renewal_data'];
        };
        var that = this;
        FactoryLicenseRenewal.router.navigate('factorylicense_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'FactoryLicenseRenewal.listview.loadFactoryLicenseRenewalData();');
        $('#factory_license_renewal_form_and_datatable_container').html(factoryLicenseRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_factory_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_factory_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_factory_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_factory_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_factory_renewal_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_factory_renewal_list', false);
        $('#district_for_factory_renewal_list').val(searchData.search_district);
        $('#status_for_factory_renewal_list').val(searchData.search_status);
        $('#app_timing_for_factory_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_factory_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_factory_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_factory_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_factory_renewal_list').attr('disabled', 'disabled');
        }
        factoryLicenseRenewalDataTable = $('#factory_license_renewal_datatable').DataTable({
            ajax: {url: 'factorylicense_renewal/get_factory_license_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'factorylicence_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'factorylicence_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'factorylicence_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'factorylicence_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // }
        $('#factory_license_renewal_datatable_filter').remove();
        $('#factory_license_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = factoryLicenseRenewalDataTable.row(tr);

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
    askForNewFactoryLicenseRenewalForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newFactoryLicenseRenewalForm(false, {});
    },
    newFactoryLicenseRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        if (isEdit) {
            var formData = parseData.factory_license_renewal_data;
            BOCW.router.navigate('edit_factorylicense_renewal_form');
        } else {
            var formData = {};
            BOCW.router.navigate('factorylicense_renewal_form');
        }

        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;
        var that = this;
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.factoryLicenseRenewal_data = parseData.factory_license_renewal_data;
        if (isEdit) {
            templateData['factoryLicenseRenewal_data']['receipt_date'] = dateTo_DD_MM_YYYY(templateData['factoryLicenseRenewal_data']['receipt_date']);
        }
        $('#factory_license_renewal_form_and_datatable_container').html(factoryLicenseRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.sign_of_manager != '') {
                $('#sign_of_manager_container_for_fl').hide();
                $('#sign_of_manager_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_manager);
                $('#sign_of_manager_name_container_for_fl').show();
                $('#sign_of_manager_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_manager);
            }
            if (formData.sign_of_occupier != '') {
                $('#sign_of_occupier_container_for_fl').hide();
                $('#sign_of_occupier_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_occupier);
                $('#sign_of_occupier_name_container_for_fl').show();
                $('#sign_of_occupier_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_occupier);
            }
        }
        generateSelect2();
        datePicker();
        $('#factory_license_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitFactoryLicenseRenewal($('#submit_btn_for_factory_license_renewal'));
            }
        });
    },
    editOrViewFactoryLicenseRenewal: function (btnObj, factoryLicenseRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!factoryLicenseRenewalId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense_renewal/get_factory_license_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'factorylicense_id': factoryLicenseRenewalId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnClick);
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
                btnObj.attr('onclick', ogBtnOnClick);
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
                    that.newFactoryLicenseRenewalForm(isEdit, parseData);
                } else {
                    that.viewFactoryLicenseRenewalForm(parseData);
                }
            }
        });
    },
    viewFactoryLicenseRenewalForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.factory_license_renewal_data;
        BOCW.router.navigate('view_factorylicense_renewal_form');
        formData.receipt_date = dateTo_DD_MM_YYYY(formData.receipt_date);
        $('#factory_license_renewal_form_and_datatable_container').html(factoryLicenseRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);

        if (formData.sign_of_manager != '') {
            $('#sign_of_manager_container_for_fl').hide();
            $('#sign_of_manager_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_manager);
            $('#sign_of_manager_name_container_for_fl').show();
            $('#sign_of_manager_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_manager);
        }
        if (formData.sign_of_occupier != '') {
            $('#sign_of_occupier_container_for_fl').hide();
            $('#sign_of_occupier_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_occupier);
            $('#sign_of_occupier_name_container_for_fl').show();
            $('#sign_of_occupier_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_occupier);
        }
    },
    checkValidationForFactoryLicenseRenewal: function (factoryLicenseRenewalData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!factoryLicenseRenewalData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!factoryLicenseRenewalData.registration_number) {
            return getBasicMessageAndFieldJSONArray('registration_number', licenseNumberValidationMessage);
        }
        if (!factoryLicenseRenewalData.name_of_factory) {
            return getBasicMessageAndFieldJSONArray('name_of_factory', factoryNameValidationMessage);
        }
        if (!factoryLicenseRenewalData.factory_address) {
            return getBasicMessageAndFieldJSONArray('factory_address', factoryAddressValidationMessage);
        }
        if (!factoryLicenseRenewalData.factory_postal_address) {
            return getBasicMessageAndFieldJSONArray('factory_postal_address', factoryPostalAddressValidationMessage);
        }
        if (!factoryLicenseRenewalData.max_no_of_worker_year) {
            return getBasicMessageAndFieldJSONArray('max_no_of_worker_year', maxWorkerValidationMessage);
        }
        if (!factoryLicenseRenewalData.max_power_to_be_used) {
            return getBasicMessageAndFieldJSONArray('max_power_to_be_used', maxPowerValidationMessage);
        }
        if (!factoryLicenseRenewalData.manager_detail) {
            return getBasicMessageAndFieldJSONArray('manager_detail', managerValidationMessage);
        }
        if (!factoryLicenseRenewalData.occupier_detail) {
            return getBasicMessageAndFieldJSONArray('occupier_detail', occupierValidationMessage);
        }
        return '';
    },
    askForSubmitFactoryLicenseRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'FactoryLicenseRenewal.listview.submitFactoryLicenseRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitFactoryLicenseRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var factoryLicenseRenewalData = $('#factory_license_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForFactoryLicenseRenewal(factoryLicenseRenewalData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('factory-license-' + validationData.field, validationData.message);
            return false;
        }

        if ($('#sign_of_manager_container_for_fl').is(':visible')) {
            var sealAndStamp = $('#sign_of_manager_for_fl').val();
            if (sealAndStamp == '') {
                $('#sign_of_manager_for_fl').focus();
                validationMessageShow('factory-license-renewal-sign_of_manager_for_fl', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('sign_of_manager_for_fl');
            if (sealAndStampMessage != '') {
                $('#sign_of_manager_for_fl').focus();
                validationMessageShow('factory-license-renewal-sign_of_manager_for_fl', sealAndStampMessage);
                return false;
            }
        }
        if ($('#sign_of_occupier_container_for_fl').is(':visible')) {
            var sealAndStamp = $('#sign_of_occupier_for_fl').val();
            if (sealAndStamp == '') {
                $('#sign_of_occupier_for_fl').focus();
                validationMessageShow('factory-license-renewal-sign_of_occupier_for_fl', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('sign_of_occupier_for_fl');
            if (sealAndStampMessage != '') {
                $('#sign_of_occupier_for_fl').focus();
                validationMessageShow('factory-license-renewal-sign_of_occupier_for_fl', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_factory') : $('#submit_btn_for_factory');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var factoryLicenseRenewalData = new FormData($('#factory_license_renewal_form')[0]);
        factoryLicenseRenewalData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        factoryLicenseRenewalData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/submit_factory_license_renewal',
            data: factoryLicenseRenewalData,
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
                validationMessageShow('factory-license-renewal', textStatus.statusText);
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
                    validationMessageShow('factory-license-renewal', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                FactoryLicenseRenewal.router.navigate('factorylicense_renewal', {'trigger': true});
            }
        });
    },
    addMultiplePrincipleProduct: function (templateData) {
        templateData.prod_cnt = tempProductCnt;
        $('#principle_product_info_container').append(principleProductTemplate(templateData));
        tempProductCnt++;
        resetCounter('display-cnt');
    },
    removeProductInfo: function (prodCnt) {
        $('#principle_product_info_' + prodCnt).remove();
        resetCounter('display-cnt');
    },

    addMultipleDirector: function (templateData) {
        templateData.director_cnt = tempDirectorCnt;
        $('#director_info_container').append(directorInfoTemplate(templateData));
        tempDirectorCnt++;
        resetCounter('display-cnt-dir');
    },
    removeDirectorInfo: function (dirCnt) {
        $('#director_info_' + dirCnt).remove();
        resetCounter('display-cnt-dir');
    },

    addMultipleEmployee: function (templateData) {
        templateData.emp_cnt = tempEmployeeCnt;
        $('#employee_info_container').append(employeeInfoTemplate(templateData));
        tempEmployeeCnt++;
        resetCounter('display-cnt-emp');
    },
    removeEmployeeInfo: function (empCnt) {
        $('#employee_info_' + empCnt).remove();
        resetCounter('display-cnt-emp');
    },
    askForRemove: function (factoryLicenseRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'FactoryLicenseRenewal.listview.removeDocument(\'' + factoryLicenseRenewalId + '\',\'' + docId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (factoryLicenseRenewalId, docId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/remove_document',
            data: $.extend({}, {'factorylicense_id': factoryLicenseRenewalId, 'document_id': docId}, getTokenData()),
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
                validationMessageShow('clact', textStatus.statusText);
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
                    validationMessageShow('clact', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#' + docId + '_name_container_for_fl').hide();
                $('#' + docId + '_name_image_for_fl').attr('src', '');
                $('#' + docId + '_container_for_fl').show();
                $('#' + docId + '_for_fl').val('');
            }
        });
    },
    generateForm1: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#factorylicense_renewal_id_for_factorylicense_renewal_form1').val(factoryLicenseRenewalId);
        $('#factorylicense_renewal_form1_pdf_form').submit();
        $('#factorylicense_renewal_id_for_factorylicense_renewal_form1').val('');
    },
    openUploadChallan: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + factoryLicenseRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense_renewal/get_factorylicense_renewal_data_by_factorylicense_renewal_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_renewal_id': factoryLicenseRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var factoryLicenseRenewalData = parseData.factory_license_renewal_data;
                showPopup();
                if (factoryLicenseRenewalData.payment_type == VALUE_ONE) {
                    factoryLicenseRenewalData.utitle = 'Challan Copy';
                } else {
                    factoryLicenseRenewalData.utitle = 'Payment Details';
                }
                factoryLicenseRenewalData.module_type = VALUE_FOURTYONE;
                $('#popup_container').html(factoryLicenseRenewalUploadChallanTemplate(factoryLicenseRenewalData));
                loadFB(VALUE_FOURTYONE, parseData.fb_data, factoryLicenseRenewalData.payment_type, factoryLicenseRenewalData.show_remove_upload_btn, factoryLicenseRenewalData.show_dropdown, factoryLicenseRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'factory_license_renewal_upload_challan', factoryLicenseRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'factory_license_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYONE);
                if (factoryLicenseRenewalData.challan != '') {
                    $('#challan_container_for_factory_license_renewal_upload_challan').hide();
                    $('#challan_name_container_for_factory_license_renewal_upload_challan').show();
                    $('#challan_name_href_for_factory_license_renewal_upload_challan').attr('href', 'documents/factorylicense/' + factoryLicenseRenewalData.challan);
                    $('#challan_name_for_factory_license_renewal_upload_challan').html(factoryLicenseRenewalData.challan);
                    $('#challan_remove_btn_for_factory_license_renewal_upload_challan').attr('onclick', 'FactoryLicenseRenewal.listview.removeChallan("' + factoryLicenseRenewalData.factorylicence_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (factoryLicenseRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/remove_challan',
            data: $.extend({}, {'factorylicence_renewal_id': factoryLicenseRenewalId}, getTokenData()),
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
                validationMessageShow('factory-license-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('factory-license-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-factory-license-renewal-uc').html(parseData.message);
                removeDocument('challan', 'factory_license_renewal_upload_challan');
                $('#status_' + factoryLicenseRenewalId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-factory-license-renewal-uc').html('');
        validationMessageHide();
        var factoryLicenseRenewalId = $('#factorylicence_renewal_id_for_factory_license_renewal_upload_challan').val();
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_factory_license_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_factory_license_renewal_upload_challan_1').focus();
            validationMessageShow('factory-license-renewal-uc-payment_type_for_factory_license_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_factory_license_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_factory_license_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_factory_license_renewal_upload_challan').focus();
                validationMessageShow('factory-license-renewal-uc-challan_for_factory_license_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_factory_license_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_factory_license_renewal_upload_challan').focus();
                validationMessageShow('factory-license-renewal-uc-challan_for_factory_license_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYONE, 'factory-license-renewal-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_factory_license_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#factory_license_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/upload_challan',
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
                validationMessageShow('factory-license-renewal-uc', textStatus.statusText);
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
                    validationMessageShow('factory-license-renewal-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + factoryLicenseRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + factoryLicenseRenewalId).show();
                }
                $('#total_fees_' + factoryLicenseRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + factoryLicenseRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense_renewal/get_factorylicense_renewal_data_by_factorylicense_renewal_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_renewal_id': factoryLicenseRenewalId}, getTokenData()),
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
                var factoryLicenseRenewalData = parseData.factory_license_renewal_data;
                showPopup();
                $('#popup_container').html(factoryLicenseRenewalApproveTemplate(factoryLicenseRenewalData));
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
        var formData = $('#approve_factory_license_renewal_form').serializeFormJSON();
        if (!formData.factory_license_renewal_id_for_factory_license_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_factory_license_renewal_approve) {
            $('#registration_number_for_factory_license_renewal_approve').focus();
            validationMessageShow('factory-license-renewal-approve-registration_number_for_factory_license_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_factory_license_renewal_approve) {
            $('#valid_upto_for_factory_license_renewal_approve').focus();
            validationMessageShow('factory-license-renewal-approve-valid_upto_for_factory_license_renewal_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_factory_license_renewal_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_factory_license_renewal_approve').focus();
            validationMessageShow('factory-license-renewal-approve-certificate_file_for_factory_license_renewal_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_factory_license_renewal_approve) {
            $('#remarks_for_factory_license_renewal_approve').focus();
            validationMessageShow('factory-license-renewal-approve-remarks_for_factory_license_renewal_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_factory_license_renewal_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_factory_license_renewal_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/approve_application',
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
                validationMessageShow('factory-license-renewal-approve', textStatus.statusText);
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
                    validationMessageShow('factory-license-renewal-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).show();
                $('#so_status_' + formData.factory_license_renewal_id_for_factory_license_renewal_approve).html(dateTimeDays(formData.factory_license_renewal_id_for_factory_license_renewal_approve, parseData, VALUE_FOURTYONE));
            }
        });
    },
    askForRejectApplication: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + factoryLicenseRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense_renewal/get_factorylicense_renewal_data_by_factorylicense_renewal_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_renewal_id': factoryLicenseRenewalId}, getTokenData()),
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
                var factoryLicenseRenewalData = parseData.factory_license_renewal_data;
                showPopup();
                $('#popup_container').html(factoryLicenseRenewalRejectTemplate(factoryLicenseRenewalData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_factory_license_renewal_form').serializeFormJSON();
        if (!formData.factory_license_renewal_id_for_factory_license_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_factory_license_renewal_reject) {
            $('#remarks_for_factory_license_renewal_reject').focus();
            validationMessageShow('factory-license-reject-remarks_for_factory_license_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense_renewal/reject_application',
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
                validationMessageShow('factory-license-reject', textStatus.statusText);
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
                    validationMessageShow('factory-license-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).remove();
                $('#so_status_' + formData.factory_license_renewal_id_for_factory_license_renewal_reject).html(dateTimeDays(formData.factory_license_renewal_id_for_factory_license_renewal_reject, parseData, VALUE_FOURTYONE));
            }
        });
    },
    generateCertificate: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#factorylicense_renewal_id_for_certificate').val(factoryLicenseRenewalId);
        $('#factorylicense_renewal_certificate_pdf_form').submit();
        $('#factorylicense_renewal_id_for_certificate').val('');
    },
    getQueryData: function (factoryLicenseRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!factoryLicenseRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYONE;
        templateData.module_id = factoryLicenseRenewalId;
        var btnObj = $('#query_btn_for_app_' + factoryLicenseRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYONE, moduleData.factorylicence_renewal_id);
                tmpData.applicant_name = moduleData.name_of_factory;
                tmpData.title = 'Factory Name';
                tmpData.module_type = VALUE_FOURTYONE;
                tmpData.module_id = factoryLicenseRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (factoryLicenseRenewalId) {
        if (!factoryLicenseRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + factoryLicenseRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense_renewal/get_factorylicense_renewal_data_by_factorylicense_renewal_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_renewal_id': factoryLicenseRenewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var factoryLicenseRenewalData = parseData.factory_license_renewal_data;
                showPopup();
                if (factoryLicenseRenewalData.payment_type == VALUE_ONE || factoryLicenseRenewalData.payment_type == VALUE_THREE) {
                    factoryLicenseRenewalData.user_payment_type_text = paymentTypeArray[factoryLicenseRenewalData.payment_type];
                } else {
                    factoryLicenseRenewalData.user_payment_type_text = userPaymentTypeArray[factoryLicenseRenewalData.user_payment_type] ? userPaymentTypeArray[factoryLicenseRenewalData.user_payment_type] : '';
                }
                if (factoryLicenseRenewalData.payment_type == VALUE_ONE) {
                    factoryLicenseRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (factoryLicenseRenewalData.payment_type == VALUE_TWO && factoryLicenseRenewalData.user_payment_type == VALUE_ONE) {
                    factoryLicenseRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                factoryLicenseRenewalData.module_type = VALUE_FOURTYONE;
                $('#popup_container').html(factoryLicenseRenewalViewPaymentTemplate(factoryLicenseRenewalData));
                loadFB(VALUE_FOURTYONE, parseData.fb_data, factoryLicenseRenewalData.payment_type);
                loadPH(VALUE_FOURTYONE, factoryLicenseRenewalData.factorylicence_renewal_id, parseData.ph_data);
                if (factoryLicenseRenewalData.payment_type == VALUE_ONE || (factoryLicenseRenewalData.payment_type == VALUE_TWO && factoryLicenseRenewalData.user_payment_type == VALUE_ONE)) {
                    if (factoryLicenseRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_app').show();
                        $('#fees_paid_challan_name_href_for_app').attr('href', FACTORY_DOC_PATH + factoryLicenseRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_app').html(factoryLicenseRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
