var migrantWorkersListTemplate = Handlebars.compile($('#migrantworkers_list_template').html());
var migrantWorkersTableTemplate = Handlebars.compile($('#migrantworkers_table_template').html());
var migrantWorkersActionTemplate = Handlebars.compile($('#migrantworkers_action_template').html());
var migrantWorkersFormTemplate = Handlebars.compile($('#migrantworkers_form_template').html());
var migrantWorkersViewTemplate = Handlebars.compile($('#migrantworkers_view_template').html());
var migrantWorkersViewItemTemplate = Handlebars.compile($('#migrantworkers_view_item_template').html());
var migrantWorkersItemTemplate = Handlebars.compile($('#migrantworkers_item_template').html());
var migrantWorkersUploadChallanTemplate = Handlebars.compile($('#migrantworkers_upload_challan_template').html());
var migrantWorkersApproveTemplate = Handlebars.compile($('#migrantworkers_approve_template').html());
var migrantWorkersRejectTemplate = Handlebars.compile($('#migrantworkers_reject_template').html());
var migrantWorkersViewPaymentTemplate = Handlebars.compile($('#migrantworkers_view_payment_template').html());
var tempMigrantWorkersData = [];
var tempMigrantWorkersCnt = 1;

var MigrantWorkers = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};

MigrantWorkers.Router = Backbone.Router.extend({
    routes: {
        'migrantworkers': 'renderList'
    },
    renderList: function () {
        MigrantWorkers.listview.listPage();
    },
});

MigrantWorkers.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        var templateData = {};

        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_interstate_mw', 'active');
        MigrantWorkers.router.navigate('migrantworkers');
        var templateData = {};
        this.$el.html(migrantWorkersListTemplate(templateData));
        this.loadMigrantWorkersData(sDistrict, sStatus, sAppTimingStatus);
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return migrantWorkersActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYFOUR;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return migrantWorkersActionTemplate(rowData);
    },
    loadMigrantWorkersData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.mw_name_of_establishment + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.mw_nature_of_work_of_establishment;
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
                return regNoRenderer(VALUE_THIRTYFOUR, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THIRTYFOUR, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYFOUR);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['migrantworkers_data'], function (index, objData) {
                json['migrantworkers_data'][index]['query_movement_string'] = qmData[objData.mw_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.mw_id] + '</table>') : '-';
            });
            return json['migrantworkers_data'];
        };
        var that = this;
        showTableContainer('migrantworkers');
        MigrantWorkers.router.navigate('migrantworkers');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'MigrantWorkers.listview.loadMigrantWorkersData();');
        $('#migrantworkers_datatable_container').html(migrantWorkersTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_migrantworkers_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_migrantworkers_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_migrantworkers_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_migrantworkers_list', false);
        allowOnlyIntegerValue('mobile_number_for_migrantworkers_list');
        //if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_migrantworkers_list', false);
        $('#district_for_migrantworkers_list').val(searchData.search_district);
        $('#status_for_migrantworkers_list').val(searchData.search_status);
        $('#app_timing_for_migrantworkers_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_migrantworkers_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_migrantworkers_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_migrantworkers_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_migrantworkers_list').attr('disabled', 'disabled');
        }
        migrantWorkersDatatable = $('#migrantworkers_datatable').DataTable({
            ajax: {url: 'migrantworkers/get_all_migrantworkers', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'mw_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'mw_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'mw_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'mw_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#migrantworkers_datatable_filter').remove();
        $('#migrantworkers_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = migrantWorkersDatatable.row(tr);

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
    askForNewMigrantworkers: function (btnObj) {
        var that = this;
        that.newMigrantworkers(false, {}, {});
    },
    newMigrantworkers: function (isEdit, migrantWorkersData, contractorData) {
        var that = this;
        var templateData = {};

        tempMigrantWorkersCnt = 1;
        templateData.migrantworkers_data = migrantWorkersData;
        templateData.contractor_data = contractorData;
        templateData.is_checked = IS_CHECKED_YES;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        showFormContainer('migrantworkers');
        $('#migrantworkers_form_container').html(migrantWorkersFormTemplate(templateData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (!isEdit) {
            $('.registration_no_for_migrantworkers_registration').hide();
        }
        if (isEdit) {
            $('#district').val(migrantWorkersData.district);
            $('#entity_establishment_type').val(migrantWorkersData.entity_establishment_type);
            $('#declaration_for_migrantworkers').attr('checked', 'checked');
        }
        if (migrantWorkersData.mw_sign_of_principal_employer != '') {
            $('#seal_and_stamp_container_for_migrantworkers').hide();
            $('#seal_and_stamp_name_image_for_migrantworkers').attr('src', MIGRANTWORKERS_DOC_PATH + migrantWorkersData.mw_sign_of_principal_employer);
            $('#seal_and_stamp_name_container_for_migrantworkers').show();
        }

        if (isEdit) {
            var cnt = 1;
            $.each(contractorData, function (index, value) {
                that.addMultipleContractor(value);
            });
            datePicker();
        }
        generateSelect2();
        $('#migrantworkers_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitMigrantworkers($('#submit_btn_for_migrantWorkers'));
            }
        });
    },
    askForSubmitMigrantworkers: function (moduleType) {
        var that = this;
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (moduleType == VALUE_TWO) {
            var yesEvent = 'MigrantWorkers.listview.submitMigrantworkers(\'' + moduleType + '\')';
            showConfirmation(yesEvent, 'Submit');
        } else {
            that.submitMigrantworkers(moduleType);
        }
    },
    submitMigrantworkers: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        validationMessageHide();
        var migrantWorkersFormData = $('#migrantworkers_form').serializeFormJSON();
        var validationData = that.checkValidation(migrantWorkersFormData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('migrantworkers-' + validationData.field, validationData.message);
            return false;
        }

        var newContractorItems = [];
        var exiContractorItems = [];
        var isContractorItemValidation = false;
        $('.migrant_contractor_workers_name').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var contractorItem = {};
            var cpn = $('#migrant_contractor_proprietor_name_' + cnt).val();
            if (cpn == '' || cpn == null) {
                $('#migrant_contractor_proprietor_name_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_proprietor_name_' + cnt, contractorPropriterNameValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_proprietor_name = cpn;
            var cn = $('#migrant_contractor_name_' + cnt).val();
            if (cn == '' || cn == null) {
                $('#migrant_contractor_name_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_name_' + cnt, contractorNameValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_name = cn;
            var ca = $('#migrant_contractor_address_' + cnt).val();
            if (ca == '' || ca == null) {
                $('#migrant_contractor_address_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_address_' + cnt, contractorAddressValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_address = ca;
            var cnow = $('#migrant_contractor_nature_of_working_' + cnt).val();
            if (cnow == '' || cnow == null) {
                $('#migrant_contractor_nature_of_working_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_nature_of_working_' + cnt, contractorNatureOfWorkingValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_nature_of_work = cnow;
            var cl = $('#migrant_contractor_maximum_no_of_workers_' + cnt).val();
            if (cl == '' || cl == null) {
                $('#migrant_contractor_maximum_no_of_workers_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_maximum_no_of_workers_' + cnt, contractorLabourValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_maximum_no_of_workers = cl;
            var csd = $('#migrant_contractor_commencement_date_' + cnt).val();
            if (csd == '' || csd == null) {
                $('#migrant_contractor_commencement_date_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_commencement_date_' + cnt, contractorStartDateValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_date_of_commencement = dateTo_YYYY_MM_DD(csd);
            var ctd = $('#migrant_contractor_termination_date_' + cnt).val();
            if (ctd == '' || ctd == null) {
                $('#migrant_contractor_termination_date_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_termination_date_' + cnt, contractorTerminationDateValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_date_of_termination = dateTo_YYYY_MM_DD(ctd);
            var mcid = $('#mc_id_' + cnt).val();
            if (mcid != '') {
                contractorItem.mc_id = mcid;
                exiContractorItems.push(contractorItem);
                console.log(exiContractorItems);
            } else {
                newContractorItems.push(contractorItem);
            }
        });
        if (isContractorItemValidation) {
            return false;
        }

        if ($('#seal_and_stamp_container_for_migrantworkers').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_migrantworkers').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_migrantworkers').focus();
                validationMessageShow('migrantworkers-seal_and_stamp_for_migrantworkers', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_migrantworkers');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_migrantworkers').focus();
                validationMessageShow('migrantworkers-seal_and_stamp_for_migrantworkers', sealAndStampMessage);
                return false;
            }
        }
        if (!$('#declaration_for_migrantworkers').is(':checked')) {
            $('#declaration_for_migrantworkers').focus();
            validationMessageShow('migrantworkers-declaration_for_migrantworkers', establishmentDeclarationValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#submit_btn_for_migrantworkers') : $('#draft_btn_for_migrantworkers');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#migrantworkers_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        formData.append("new_contractor_data", JSON.stringify(newContractorItems));
        formData.append("exi_contractor_data", JSON.stringify(exiContractorItems));
        formData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'Migrantworkers/submit_migrantworkers',
            data: formData,
            mimeType: 'multipart/form-data',
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
                validationMessageShow('migrantworkers', textStatus.statusText);
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
                    validationMessageShow('migrantworkers', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.listPage();
            }
        });
    },
    checkValidation: function (migrantWorkersFormData) {
        if (!migrantWorkersFormData.name_of_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('name_of_migrantworkers_registration', establishmentNameValidationMessage);
        }
        if (!migrantWorkersFormData.loaction_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('loaction_for_migrantworkers_registration', establishmentLocationValidationMessage);
        }
        if (!migrantWorkersFormData.postal_address_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('postal_address_for_migrantworkers_registration', establishmentPostelAddressValidationMessage);
        }
        if (!migrantWorkersFormData.nature_of_work_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('nature_of_work_for_migrantworkers_registration', establishmentTypeValidationMessage);
        }
        if (!migrantWorkersFormData.principle_employer_full_name_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('principle_employer_full_name_for_migrantworkers_registration', establishmentPrincipalNameValidationMessage);
        }
        if (!migrantWorkersFormData.principle_employer_address_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('principle_employer_address_for_migrantworkers_registration', establishmentPrincipalAddressValidationMessage);
        }
        if (!migrantWorkersFormData.manager_or_person_full_name_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('manager_or_person_full_name_migrantworkers_registration', establishmentManagerNameValidationMessage);
        }
        if (!migrantWorkersFormData.manager_or_person_address_for_migrantworkers_registration) {
            return getBasicMessageAndFieldJSONArray('manager_or_person_address_for_migrantworkers_registration', establishmentManagerAddressValidationMessage);
        }

        return '';
    },
    editOrViewMigrantworkers: function (btnObj, mwId, isEdit, tempId) {
        var that = this;
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!mwId) {
            validationMessageShow('migrantworkers-', 'Please select proper Details');
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        btnObj.html(spinnerTemplate);
        btnObj.attr('onclick', '');
        var template = isEdit ? 'Edit' : 'View';
        $.ajax({
            url: 'migrantworkers/get_migrantworkers_by_id',
            type: 'post',
            data: $.extend({}, {'mw_id': mwId}, getTokenData()),
            error: function (textStatus, errorThrown) {
                generateNewCSRFToken();
                btnObj.html(template);
                btnObj.attr('onclick', 'MigrantWorkers.listview.editOrViewMigrantworkers($(this),"' + mwId + '", ' + isEdit + ',"' + tempId + '"  )');
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
                btnObj.html(template);
                btnObj.attr('onclick', 'MigrantWorkers.listview.editOrViewMigrantworkers($(this),"' + mwId + '", ' + isEdit + ',"' + tempId + '")');
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
                var migrantWorkersData = parseData.migrantworkers_data;
                migrantWorkersData.mw_challan_date = dateTo_DD_MM_YYYY(migrantWorkersData.mw_challan_date);
                migrantWorkersData.mw_certificate_expiry_date = dateTo_DD_MM_YYYY(migrantWorkersData.mw_certificate_expiry_date);
                var contractorData = parseData.contractor_data;
                if (isEdit) {
                    that.newMigrantworkers(isEdit, migrantWorkersData, contractorData);
                } else {
                    that.viewMigrantworkers(migrantWorkersData, contractorData);
                }
            }
        });
    },
    viewMigrantworkers: function (migrantWorkersData, contractorData) {
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var templateData = {};

        templateData.migrantworkers_data = migrantWorkersData;
        templateData.contractor_data = contractorData;
        if (migrantWorkersData.mw_challan_date == 'NaN-NaN-NaN') {
            var challanDate = templateData.migrantworkers_data;
            challanDate.mw_challan_date = '';
        }
        if (migrantWorkersData.mw_certificate_expiry_date == 'NaN-NaN-NaN') {
            var certificateExpiryDate = templateData.migrantworkers_data;
            certificateExpiryDate.mw_certificate_expiry_date = '';
        }
        showFormContainer('migrantworkers');
        $('#migrantworkers_form_container').html(migrantWorkersViewTemplate(templateData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(migrantWorkersData.district);
        $('#entity_establishment_type').val(migrantWorkersData.entity_establishment_type);
        if (migrantWorkersData.status == VALUE_TWO) {
            $('.migrantworkers_hidden').hide();
        } else if (migrantWorkersData.status == VALUE_THREE) {
            $('.migrantworkers_hidden').show();
        }

        if (migrantWorkersData.mw_sign_of_principal_employer != '') {
            $('#seal_and_stamp_container_for_migrantworkers_view').hide();
            $('#seal_and_stamp_name_image_for_migrantworkers_view').attr('src', MIGRANTWORKERS_DOC_PATH + migrantWorkersData.mw_sign_of_principal_employer);
            $('#seal_and_stamp_name_container_for_migrantworkers_view').show();
        }

        $('#declaration_for_migrantworkers').attr('checked', 'checked');

        var cnt = 1;
        $.each(contractorData, function (index, value) {
            value.cnt = cnt;
            $('#migrant_contractor_name_container_for_view').append(migrantWorkersViewItemTemplate(value));
            cnt++;
        });

    },

    generateFormIPDF: function (mwId) {
        if (!mwId) {
            showError('Please select proper Establishment Details');
            return false;
        }
        $('#mw_id_for_pdf').val(mwId);
        $('#mw_pdf_form').submit();
    },

    generateCertificate: function (mwId) {
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#mw_id_for_certificate').val(mwId);
        $('#mw_certificate_pdf_form').submit();
        $('#mw_id_for_certificate').val('');
    },

    addMultipleContractor: function (templateData) {
        templateData.item_cnt = tempMigrantWorkersCnt;
        $('#contractors_and_migrant_workman_details_container').append(migrantWorkersItemTemplate(templateData));
        tempMigrantWorkersCnt++;
        datePicker();
        resetCounter('display-cnt');
    },
    removeContractor: function (itemCnt) {
        $('#migrant_contractor_workers_name_' + itemCnt).remove();
        $('#migrant_contractor_workers_name_id_' + itemCnt).remove();
        resetCounter('display-cnt');
    },
    openUploadChallan: function (mwId) {
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + mwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers/get_migrantworkers_data_by_migrantworkers_id',
            type: 'post',
            data: $.extend({}, {'mw_id': mwId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var migrantworkersData = parseData.migrantworkers_data;
                showPopup();
                if (migrantworkersData.payment_type == VALUE_ONE) {
                    migrantworkersData.utitle = 'Challan Copy';
                } else {
                    migrantworkersData.utitle = 'Payment Details';
                }
                migrantworkersData.module_type = VALUE_THIRTYFOUR;
                $('#popup_container').html(migrantWorkersUploadChallanTemplate(migrantworkersData));
                loadFB(VALUE_THIRTYFOUR, parseData.fb_data, migrantworkersData.payment_type, migrantworkersData.show_remove_upload_btn, migrantworkersData.show_dropdown, migrantworkersData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'migrantworkers_upload_challan', migrantworkersData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'migrantworkers_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYFOUR);
                if (migrantworkersData.challan != '') {
                    $('#challan_container_for_migrantworkers_upload_challan').hide();
                    $('#challan_name_container_for_migrantworkers_upload_challan').show();
                    $('#challan_name_href_for_migrantworkers_upload_challan').attr('href', 'documents/migrantworkers/' + migrantworkersData.challan);
                    $('#challan_name_for_migrantworkers_upload_challan').html(migrantworkersData.challan);
                    $('#challan_remove_btn_for_migrantworkers_upload_challan').attr('onclick', 'MigrantWorkers.listview.removeChallan("' + migrantworkersData.mw_id + '")');
                }
            }
        });
    },
    removeChallan: function (mwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers/remove_challan',
            data: $.extend({}, {'mw_id': mwId}, getTokenData()),
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
                validationMessageShow('migrantworkers-uc', textStatus.statusText);
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
                    validationMessageShow('migrantworkers-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-migrantworkers-uc').html(parseData.message);
                removeDocument('challan', 'migrantworkers_upload_challan');
                $('#status_' + mwId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-migrantworkers-uc').html('');
        validationMessageHide();
        var mwId = $('#migrantworkers_id_for_migrantworkers_upload_challan').val();
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_migrantworkers_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_migrantworkers_upload_challan_1').focus();
            validationMessageShow('migrantworkers-uc-payment_type_for_migrantworkers_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_migrantworkers_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_migrantworkers_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_migrantworkers_upload_challan').focus();
                validationMessageShow('migrantworkers-uc-challan_for_migrantworkers_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_migrantworkers_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_migrantworkers_upload_challan').focus();
                validationMessageShow('migrantworkers-uc-challan_for_migrantworkers_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYFOUR, 'migrantworkers-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_migrantworkers_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#migrantworkers_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers/upload_challan',
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
                validationMessageShow('migrantworkers-uc', textStatus.statusText);
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
                    validationMessageShow('migrantworkers-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + mwId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + mwId).show();
                }
                $('#total_fees_' + mwId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (mwId) {
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + mwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers/get_migrantworkers_data_by_migrantworkers_id',
            type: 'post',
            data: $.extend({}, {'mw_id': mwId}, getTokenData()),
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
                var migrantworkersData = parseData.migrantworkers_data;
                showPopup();
                $('#popup_container').html(migrantWorkersApproveTemplate(migrantworkersData));
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
        var formData = $('#approve_migrantworkers_form').serializeFormJSON();
        if (!formData.migrantworkers_id_for_migrantworkers_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_migrantworkers_approve) {
            $('#registration_number_for_migrantworkers_approve').focus();
            validationMessageShow('migrantworkers-approve-registration_number_for_migrantworkers_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_migrantworkers_approve) {
            $('#valid_upto_for_migrantworkers_approve').focus();
            validationMessageShow('migrantworkers-approve-valid_upto_for_migrantworkers_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_migrantworkers_approve) {
            $('#remarks_for_migrantworkers_approve').focus();
            validationMessageShow('migrantworkers-approve-remarks_for_migrantworkers_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers/approve_application',
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
                validationMessageShow('migrantworkers-approve', textStatus.statusText);
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
                    validationMessageShow('migrantworkers-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.migrantworkers_id_for_migrantworkers_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.migrantworkers_id_for_migrantworkers_approve).remove();
                $('#approve_btn_for_app_' + formData.migrantworkers_id_for_migrantworkers_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.migrantworkers_id_for_migrantworkers_approve).show();
                $('#so_status_' + formData.migrantworkers_id_for_migrantworkers_approve).html(dateTimeDays(formData.migrantworkers_id_for_migrantworkers_approve, parseData, VALUE_THIRTYFOUR));
            }
        });
    },
    askForRejectApplication: function (mwId) {
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + mwId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers/get_migrantworkers_data_by_migrantworkers_id',
            type: 'post',
            data: $.extend({}, {'mw_id': mwId}, getTokenData()),
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
                var migrantworkersData = parseData.migrantworkers_data;
                showPopup();
                $('#popup_container').html(migrantWorkersRejectTemplate(migrantworkersData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_migrantworkers_form').serializeFormJSON();
        if (!formData.migrantworkers_id_for_migrantworkers_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_migrantworkers_reject) {
            $('#remarks_for_migrantworkers_reject').focus();
            validationMessageShow('migrantworkers-reject-remarks_for_migrantworkers_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers/reject_application',
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
                validationMessageShow('migrantworkers-reject', textStatus.statusText);
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
                    validationMessageShow('migrantworkers-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.migrantworkers_id_for_migrantworkers_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.migrantworkers_id_for_migrantworkers_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.migrantworkers_id_for_migrantworkers_reject).remove();
                $('#reject_btn_for_app_' + formData.migrantworkers_id_for_migrantworkers_reject).remove();
                $('#approve_btn_for_app_' + formData.migrantworkers_id_for_migrantworkers_reject).remove();
                $('#so_status_' + formData.migrantworkers_id_for_migrantworkers_reject).html(dateTimeDays(formData.migrantworkers_id_for_migrantworkers_reject, parseData, VALUE_THIRTYFOUR));
            }
        });
    },
    askForRemove: function (mwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'MigrantWorkers.listview.removeDocument(\'' + mwId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (mwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!mwId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers/remove_document',
            data: $.extend({}, {'mw_id': mwId}, getTokenData()),
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
                validationMessageShow('migrantworkers', textStatus.statusText);
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
                    validationMessageShow('migrantworkers', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#seal_and_stamp_name_container_for_migrantworkers').hide();
                $('#seal_and_stamp_name_image_for_migrantworkers').attr('src', '');
                $('#seal_and_stamp_container_for_migrantworkers').show();
                $('#seal_and_stamp_for_migrantworkers').val('');
            }
        });
    },
    getQueryData: function (mwId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!mwId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYFOUR;
        templateData.module_id = mwId;
        var btnObj = $('#query_btn_for_app_' + mwId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYFOUR, moduleData.mw_id);
                tmpData.applicant_name = moduleData.mw_name_of_establishment;
                tmpData.title = 'Establishment Name';
                tmpData.module_type = VALUE_THIRTYFOUR;
                tmpData.module_id = mwId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (migrantworkersId) {
        if (!migrantworkersId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + migrantworkersId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers/get_migrantworkers_data_by_migrantworkers_id',
            type: 'post',
            data: $.extend({}, {'mw_id': migrantworkersId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var migrantworkersData = parseData.migrantworkers_data;
                showPopup();
                if (migrantworkersData.payment_type == VALUE_ONE || migrantworkersData.payment_type == VALUE_THREE) {
                    migrantworkersData.user_payment_type_text = paymentTypeArray[migrantworkersData.payment_type];
                } else {
                    migrantworkersData.user_payment_type_text = userPaymentTypeArray[migrantworkersData.user_payment_type] ? userPaymentTypeArray[migrantworkersData.user_payment_type] : '';
                }
                if (migrantworkersData.payment_type == VALUE_ONE) {
                    migrantworkersData.utitle = 'Fees Paid Challan Copy';
                } else if (migrantworkersData.payment_type == VALUE_TWO && migrantworkersData.user_payment_type == VALUE_ONE) {
                    migrantworkersData.utitle = 'Demand Draft (DD) Copy';
                }
                migrantworkersData.module_type = VALUE_THIRTYFOUR;
                $('#popup_container').html(migrantWorkersViewPaymentTemplate(migrantworkersData));
                loadFB(VALUE_THIRTYFOUR, parseData.fb_data, migrantworkersData.payment_type);
                loadPH(VALUE_THIRTYFOUR, migrantworkersData.mw_id, parseData.ph_data);
                if (migrantworkersData.payment_type == VALUE_ONE || (migrantworkersData.payment_type == VALUE_TWO && migrantworkersData.user_payment_type == VALUE_ONE)) {
                    if (migrantworkersData.fees_paid_challan != '') {
                        $('#vp_container_for_migrantworkers').show();
                        $('#fees_paid_challan_name_href_for_migrantworkers').attr('href', MIGRANTWORKERS_DOC_PATH + migrantworkersData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_migrantworkers').html(migrantworkersData.fees_paid_challan);
                    }
                }
            }
        });
    },
});