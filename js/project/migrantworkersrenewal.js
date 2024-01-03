var migrantworkersRenewalListTemplate = Handlebars.compile($('#migrantworkers_renewal_list_template').html());
var migrantworkersRenewalTableTemplate = Handlebars.compile($('#migrantworkers_renewal_table_template').html());
var migrantworkersRenewalActionTemplate = Handlebars.compile($('#migrantworkers_renewal_action_template').html());
var migrantworkersRenewalFormTemplate = Handlebars.compile($('#migrantworkers_renewal_form_template').html());
var migrantworkersRenewalViewTemplate = Handlebars.compile($('#migrantworkers_renewal_view_template').html());
var migrantworkersRenewalItemInfoTemplate = Handlebars.compile($('#migrantworkers_renewal_item_info_template').html());
var migrantworkersRenewalUploadChallanTemplate = Handlebars.compile($('#migrantworkers_renewal_upload_challan_template').html());
var migrantworkersRenewalApproveTemplate = Handlebars.compile($('#migrantworkers_renewal_approve_template').html());
var migrantworkersRenewalRejectTemplate = Handlebars.compile($('#migrantworkers_renewal_reject_template').html());
var migrantworkersRenewalViewPaymentTemplate = Handlebars.compile($('#migrantworkers_renewal_view_payment_template').html());

var tempmigrantworkersRenewalProprietorInfoCnt = 1;

var MigrantworkersRenewal = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
MigrantworkersRenewal.Router = Backbone.Router.extend({
    routes: {
        'migrantworkers_renewal': 'renderList',
        'migrantworkers_renewal_form': 'renderListForForm',
        'edit_migrantworkers_renewal_form': 'renderList',
        'view_migrantworkers_renewal_form': 'renderList',
    },
    renderList: function () {
        MigrantworkersRenewal.listview.listPage();
    },
    renderListForForm: function () {
        MigrantworkersRenewal.listview.listPageMigrantworkersRenewalForm();
    }
});
MigrantworkersRenewal.listView = Backbone.View.extend({
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
        addClass('menu_migrantworkers_renewal', 'active');
        MigrantworkersRenewal.router.navigate('migrantworkers_renewal');
        var templateData = {};
        this.$el.html(migrantworkersRenewalListTemplate(templateData));
        this.loadMigrantworkersRenewalData(sDistrict, sStatus, sAppTimingStatus);
    },
    listPageMigrantworkersRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_migrantworkers_renewal', 'active');
        this.$el.html(migrantworkersRenewalListTemplate);
        this.newMigrantworkersRenewalForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return migrantworkersRenewalActionTemplate(rowData);
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
        rowData.module_type = VALUE_FOURTYFIVE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return migrantworkersRenewalActionTemplate(rowData);
    },
    loadMigrantworkersRenewalData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_establishment + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.nature_of_work_of_establishment;
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
                return regNoRenderer(VALUE_FOURTYFIVE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_FOURTYFIVE, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FOURTYFIVE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['migrantworkers_renewal_data'], function (index, objData) {
                json['migrantworkers_renewal_data'][index]['query_movement_string'] = qmData[objData.migrantworkers_renewal_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.migrantworkers_renewal_id] + '</table>') : '-';
            });
            return json['migrantworkers_renewal_data'];
        };
        var that = this;
        MigrantworkersRenewal.router.navigate('migrantworkers_renewal');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'MigrantworkersRenewal.listview.loadMigrantworkersRenewalData();');
        $('#migrantworkers_renewal_form_and_datatable_container').html(migrantworkersRenewalTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_migrantworkers_renewal_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_migrantworkers_renewal_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_migrantworkers_renewal_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_migrantworkers_renewal_list', false);
        allowOnlyIntegerValue('mobile_number_for_migrantworkers_renewal_list');
        $('#district_for_migrantworkers_renewal_list').val(searchData.search_district);
        $('#status_for_migrantworkers_renewal_list').val(searchData.search_status);
        $('#app_timing_for_migrantworkers_renewal_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_migrantworkers_renewal_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_migrantworkers_renewal_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_migrantworkers_renewal_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_migrantworkers_renewal_list').attr('disabled', 'disabled');
        }
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_migrantworkers_renewal_list', false);
        migrantworkersrenewalDataTable = $('#migrantworkers_renewal_datatable').DataTable({
            ajax: {url: 'migrantworkers_renewal/get_migrantworkers_renewal_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'migrantworkers_renewal_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'migrantworkers_renewal_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'migrantworkers_renewal_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'migrantworkers_renewal_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#migrantworkers_renewal_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = migrantworkersrenewalDataTable.row(tr);

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
    newMigrantworkersRenewalForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.migrantworkers_renewal_data;
            MigrantworkersRenewal.router.navigate('edit_migrantworkers_renewal_form');
        } else {
            var formData = {};
            MigrantworkersRenewal.router.navigate('migrantworkers_renewal_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.migrantworkersrenewal_data = parseData.migrantworkers_renewal_data;
        templateData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        $('#migrantworkers_renewal_form_and_datatable_container').html(migrantworkersRenewalFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_migrantworkersrenewal').hide();
                $('#seal_and_stamp_name_image_for_migrantworkersrenewal').attr('src', MIGRANTWORKERS_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_migrantworkersrenewal').show();
                $('#seal_and_stamp_download').attr("href", MIGRANTWORKERS_DOC_PATH + formData.signature);
            }

            var itemInfo = JSON.parse(formData.contractor_details);
            $.each(itemInfo, function (key, value) {
                that.addMultipleContractor(value);
            })
        }
        generateSelect2();
        datePicker();
        $('#migrantworkers_renewal_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitMigrantworkersRenewal($('#submit_btn_for_migrantworkers'));
            }
        });
    },
    editOrViewMigrantworkersRenewal: function (btnObj, migrantworkersRenewalId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!migrantworkersRenewalId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers_renewal/get_migrantworkers_renewal_data_by_id',
            type: 'post',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId}, getTokenData()),
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
                    that.newMigrantworkersRenewalForm(isEdit, parseData);
                } else {
                    that.viewMigrantworkersRenewalForm(parseData);
                }
            }
        });
    },
    viewMigrantworkersRenewalForm: function (parseData) {
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
        var formData = parseData.migrantworkers_renewal_data;
        MigrantworkersRenewal.router.navigate('view_migrantworkers_renewal_form');
        formData.last_valid_upto = dateTo_DD_MM_YYYY(formData.last_valid_upto);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#migrantworkers_renewal_form_and_datatable_container').html(migrantworkersRenewalViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        var itemInfo = JSON.parse(formData.contractor_details);
        $.each(itemInfo, function (key, value) {
            that.addMultipleContractor(value);
            $('.view_hideen').hide();
            $('.hide').attr('readonly', true);
        })

        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_migrantworkersrenewal').hide();
            $('#seal_and_stamp_name_image_for_migrantworkersrenewal').attr('src', MIGRANTWORKERS_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_migrantworkersrenewal').show();
            $('#seal_and_stamp_download').attr("href", MIGRANTWORKERS_DOC_PATH + formData.signature);
        }
    },
    checkValidationForMigrantworkersRenewal: function (migrantworkersrenewalFormData) {
        if (!migrantworkersrenewalFormData.name_of_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('name_of_migrantworkersrenewal_registration', establishmentNameValidationMessage);
        }
        if (!migrantworkersrenewalFormData.loaction_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('loaction_for_migrantworkersrenewal_registration', establishmentLocationValidationMessage);
        }
        if (!migrantworkersrenewalFormData.postal_address_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('postal_address_for_migrantworkersrenewal_registration', establishmentPostelAddressValidationMessage);
        }
        if (!migrantworkersrenewalFormData.nature_of_work_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('nature_of_work_for_migrantworkersrenewal_registration', establishmentTypeValidationMessage);
        }
        if (!migrantworkersrenewalFormData.principle_employer_full_name_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('principle_employer_full_name_for_migrantworkersrenewal_registration', establishmentPrincipalNameValidationMessage);
        }
        if (!migrantworkersrenewalFormData.principle_employer_address_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('principle_employer_address_for_migrantworkersrenewal_registration', establishmentPrincipalAddressValidationMessage);
        }
        if (!migrantworkersrenewalFormData.manager_or_person_full_name_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('manager_or_person_full_name_migrantworkersrenewal_registration', establishmentManagerNameValidationMessage);
        }
        if (!migrantworkersrenewalFormData.manager_or_person_address_for_migrantworkersrenewal_registration) {
            return getBasicMessageAndFieldJSONArray('manager_or_person_address_for_migrantworkersrenewal_registration', establishmentManagerAddressValidationMessage);
        }
        return '';
    },
    askForSubmitMigrantworkersRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'MigrantworkersRenewal.listview.submitMigrantworkersRenewal(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitMigrantworkersRenewal: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var migrantworkersrenewalData = $('#migrantworkers_renewal_form').serializeFormJSON();
        var validationData = that.checkValidationForMigrantworkersRenewal(migrantworkersrenewalData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('migrantworkersrenewal-' + validationData.field, validationData.message);
            return false;
        }

        var newContractorItems = [];
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
            contractorItem.mc_date_of_commencement = csd;
            var ctd = $('#migrant_contractor_termination_date_' + cnt).val();
            if (ctd == '' || ctd == null) {
                $('#migrant_contractor_termination_date_' + cnt).focus();
                validationMessageShow('migrantworkers-migrant_contractor_termination_date_' + cnt, contractorTerminationDateValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mc_date_of_termination = ctd;

            newContractorItems.push(contractorItem);
        });
        if (isContractorItemValidation) {
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_migrantworkers') : $('#submit_btn_for_migrantworkers');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var migrantworkersrenewalData = new FormData($('#migrantworkers_renewal_form')[0]);
        migrantworkersrenewalData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        migrantworkersrenewalData.append("new_contractor_data", JSON.stringify(newContractorItems));
        migrantworkersrenewalData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/submit_migrantworkers_renewal',
            data: migrantworkersrenewalData,
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
                MigrantworkersRenewal.router.navigate('migrantworkers_renewal', {'trigger': true});
            }
        });
    },

    askForRemove: function (migrantworkersRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'MigrantworkersRenewal.listview.removeDocument(\'' + migrantworkersRenewalId + '\',\'' + docType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (migrantworkersRenewalId, docType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/remove_document',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId, 'document_type': docType}, getTokenData()),
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
                if (docType == VALUE_ONE) {
                    $('#seal_and_stamp_name_container_for_migrantworkersrenewal').hide();
                    $('#seal_and_stamp_name_image_for_migrantworkersrenewal').attr('src', '');
                    $('#seal_and_stamp_container_for_migrantworkersrenewal').show();
                    $('#seal_and_stamp_for_migrantworkersrenewal').val('');
                }

            }
        });
    },
    addMultipleContractor: function (templateData) {
        templateData.item_cnt = tempMigrantWorkersCnt;
        $('#contractors_and_migrant_workman_details_container').append(migrantworkersRenewalItemInfoTemplate(templateData));
        tempMigrantWorkersCnt++;
        datePicker();
        resetCounter('display-cnt');
    },
    removeContractor: function (itemCnt) {
        $('#migrant_contractor_workers_name_' + itemCnt).remove();
        $('#migrant_contractor_workers_name_id_' + itemCnt).remove();
        resetCounter('display-cnt');
    },
    generateForm: function (migrantworkersRenewalId) {
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#migrantworkers_renewal_id_for_migrantworkers_renewal_form').val(migrantworkersRenewalId);
        $('#migrantworkers_renewal_form_pdf_form').submit();
        $('#migrantworkers_renewal_id_for_migrantworkers_renewal_form').val('');
    },

    openUploadChallan: function (migrantworkersRenewalId) {
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + migrantworkersRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers_renewal/get_migrantworkers_renewal_data_by_migrantworkers_renewal_id',
            type: 'post',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var migrantworkersRenewalData = parseData.migrantworkers_renewal_data;
                showPopup();
                if (migrantworkersRenewalData.payment_type == VALUE_ONE) {
                    migrantworkersRenewalData.utitle = 'Challan Copy';
                } else {
                    migrantworkersRenewalData.utitle = 'Payment Details';
                }
                migrantworkersRenewalData.module_type = VALUE_FOURTYFIVE;
                $('#popup_container').html(migrantworkersRenewalUploadChallanTemplate(migrantworkersRenewalData));
                loadFB(VALUE_FOURTYFIVE, parseData.fb_data, migrantworkersRenewalData.payment_type, migrantworkersRenewalData.show_remove_upload_btn, migrantworkersRenewalData.show_dropdown, migrantworkersRenewalData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'migrantworkers_renewal_upload_challan', migrantworkersRenewalData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'migrantworkers_renewal_upload_challan', 'uc', 'radio', '#fb', VALUE_FOURTYFIVE);
                if (migrantworkersRenewalData.challan != '') {
                    $('#challan_container_for_migrantworkers_renewal_upload_challan').hide();
                    $('#challan_name_container_for_migrantworkers_renewal_upload_challan').show();
                    $('#challan_name_href_for_migrantworkers_renewal_upload_challan').attr('href', 'documents/migrantworkers/' + migrantworkersRenewalData.challan);
                    $('#challan_name_for_migrantworkers_renewal_upload_challan').html(migrantworkersRenewalData.challan);
                    $('#challan_remove_btn_for_migrantworkers_renewal_upload_challan').attr('onclick', 'MigrantworkersRenewal.listview.removeChallan("' + migrantworkersRenewalData.migrantworkers_renewal_id + '")');
                }
            }
        });
    },
    removeChallan: function (migrantworkersRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/remove_challan',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId}, getTokenData()),
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
                removeDocument('challan', 'migrantworkers_renewal_upload_challan');
                $('#status_' + migrantworkersRenewalId).html(appStatusArray[VALUE_TWO]);
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
        var migrantworkersRenewalId = $('#migrantworkers_renewal_id_for_migrantworkers_renewal_upload_challan').val();
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_migrantworkers_renewal_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_migrantworkers_renewal_upload_challan_1').focus();
            validationMessageShow('migrantworkers_renewal-uc-payment_type_for_migrantworkers_renewal_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_migrantworkers_renewal_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_migrantworkers_renewal_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_migrantworkers_renewal_upload_challan').focus();
                validationMessageShow('migrantworkers-uc-challan_for_migrantworkers_renewal_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_migrantworkers_renewal_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_migrantworkers_renewal_upload_challan').focus();
                validationMessageShow('migrantworkers-uc-challan_for_migrantworkers_renewal_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FOURTYFIVE, 'migrantworkers-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_migrantworkers_renewal_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#migrantworkers_renewal_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/upload_challan',
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
                $('#status_' + migrantworkersRenewalId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + migrantworkersRenewalId).show();
                }
                $('#total_fees_' + migrantworkersRenewalId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (migrantworkersRenewalId) {
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + migrantworkersRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers_renewal/get_migrantworkers_renewal_data_by_migrantworkers_renewal_id',
            type: 'post',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId}, getTokenData()),
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
                var migrantworkersRenewalData = parseData.migrantworkers_renewal_data;
                showPopup();
                $('#popup_container').html(migrantworkersRenewalApproveTemplate(migrantworkersRenewalData));
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
        var formData = $('#approve_migrantworkers_renewal_form').serializeFormJSON();
        if (!formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_migrantworkers_renewal_approve) {
            $('#registration_number_for_migrantworkers_renewal_approve').focus();
            validationMessageShow('migrantworkers-approve-registration_number_for_migrantworkers_renewal_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_migrantworkers_renewal_approve) {
            $('#valid_upto_for_migrantworkers_renewal_approve').focus();
            validationMessageShow('migrantworkers-approve-valid_upto_for_migrantworkers_renewal_approve', dateValidationMessage);
            return false;
        }
//        if (!formData.challan_number_for_migrantworkers_renewal_approve) {
//            $('#challan_number_for_migrantworkers_renewal_approve').focus();
//            validationMessageShow('migrantworkers-approve-challan_number_for_migrantworkers_renewal_approve', challanNoValidationMessage);
//            return false;
//        }
        if (!formData.remarks_for_migrantworkers_renewal_approve) {
            $('#remarks_for_migrantworkers_renewal_approve').focus();
            validationMessageShow('migrantworkers-approve-remarks_for_migrantworkers_renewal_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/approve_application',
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
                $('#status_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve).remove();
                $('#approve_btn_for_app_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve).show();
                $('#so_status_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve).html(dateTimeDays(formData.migrantworkers_renewal_id_for_migrantworkers_renewal_approve, parseData, VALUE_FOURTYFIVE));
            }
        });
    },
    askForRejectApplication: function (migrantworkersRenewalId) {
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + migrantworkersRenewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers_renewal/get_migrantworkers_renewal_data_by_migrantworkers_renewal_id',
            type: 'post',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkersRenewalId}, getTokenData()),
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
                var migrantworkersRenewalData = parseData.migrantworkers_renewal_data;
                showPopup();
                $('#popup_container').html(migrantworkersRenewalRejectTemplate(migrantworkersRenewalData));
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
        var formData = $('#reject_migrantworkers_renewal_form').serializeFormJSON();
        if (!formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_migrantworkers_renewal_reject) {
            $('#remarks_for_migrantworkers_renewal_reject').focus();
            validationMessageShow('migrantworkers-reject-remarks_for_migrantworkers_renewal_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'migrantworkers_renewal/reject_application',
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
                $('#status_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).remove();
                $('#reject_btn_for_app_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).remove();
                $('#approve_btn_for_app_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).remove();
                $('#so_status_' + formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject).html(dateTimeDays(formData.migrantworkers_renewal_id_for_migrantworkers_renewal_reject, parseData, VALUE_FOURTYFIVE));
            }
        });
    },
    generateCertificate: function (migrantworkersRenewalId) {
        if (!migrantworkersRenewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#migrantworkers_renewal_id_for_certificate').val(migrantworkersRenewalId);
        $('#migrantworkers_renewal_certificate_pdf_form').submit();
        $('#migrantworkers_renewal_id_for_certificate').val('');
    },
    getQueryData: function (migrantworkersRenewalId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!migrantworkersRenewalId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FOURTYFIVE;
        templateData.module_id = migrantworkersRenewalId;
        var btnObj = $('#query_btn_for_migrantworkersrenewal' + migrantworkersRenewalId);
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
                tmpData.application_number = regNoRenderer(VALUE_FOURTYFIVE, moduleData.migrantworkers_renewal_id);
                tmpData.applicant_name = moduleData.name_of_establishment;
                tmpData.title = 'Name of Establishment';
                tmpData.module_type = VALUE_FOURTYFIVE;
                tmpData.module_id = migrantworkersRenewalId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getMigrantworkersData: function (btnObj) {
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
            url: 'migrantworkers_renewal/get_migrantworkers_data_by_id',
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
                migrantworkersrenewalData = parseData.migrantworkers_data;
                if (migrantworkersrenewalData == null) {
                    $('#migrantworkers_id').val('');
                    $('#name_of_migrantworkers').val('');
                    $('#name_of_proprietor').val('');
                    $('#registration_number').val('');
                    $('#last_valid_upto').val('');
                    $('#fees').attr('readonly', true);
                    $('#fees').val('');
                    showError(licenseNoNotAvailable);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                }
                if (migrantworkersrenewalData) {
                    $('#migrantworkers_id').val(migrantworkersrenewalData.migrantworkers_id);
                    $('#name_of_migrantworkers').val(migrantworkersrenewalData.name_of_migrantworkers);
                    $('#name_of_proprietor').val(migrantworkersrenewalData.name_of_proprietor);
                    $('#registration_number').val(migrantworkersrenewalData.registration_number);
                    var last_valid_upto = dateTo_DD_MM_YYYY(migrantworkersrenewalData.last_valid_upto);
                    if (migrantworkersrenewalData.last_valid_upto != '0000-00-00') {
                        $('#last_valid_upto').val(last_valid_upto);
                    } else {
                        $('#last_valid_upto').val('');
                    }
                    $('#fees').attr('readonly', true);
                    $('#fees').val(migrantworkersrenewalData.fees);
                }
            }
        });
    },
    viewPayment: function (migrantworkers_renewalId) {
        if (!migrantworkers_renewalId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + migrantworkers_renewalId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'migrantworkers_renewal/get_migrantworkers_renewal_data_by_migrantworkers_renewal_id',
            type: 'post',
            data: $.extend({}, {'migrantworkers_renewal_id': migrantworkers_renewalId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var migrantworkersRenewalData = parseData.migrantworkers_renewal_data;
                showPopup();
                if (migrantworkersRenewalData.payment_type == VALUE_ONE || migrantworkersRenewalData.payment_type == VALUE_THREE) {
                    migrantworkersRenewalData.user_payment_type_text = paymentTypeArray[migrantworkersRenewalData.payment_type];
                } else {
                    migrantworkersRenewalData.user_payment_type_text = userPaymentTypeArray[migrantworkersRenewalData.user_payment_type] ? userPaymentTypeArray[migrantworkersRenewalData.user_payment_type] : '';
                }
                if (migrantworkersRenewalData.payment_type == VALUE_ONE) {
                    migrantworkersRenewalData.utitle = 'Fees Paid Challan Copy';
                } else if (migrantworkersRenewalData.payment_type == VALUE_TWO && migrantworkersRenewalData.user_payment_type == VALUE_ONE) {
                    migrantworkersRenewalData.utitle = 'Demand Draft (DD) Copy';
                }
                migrantworkersRenewalData.module_type = VALUE_FOURTYFIVE;
                $('#popup_container').html(migrantworkersRenewalViewPaymentTemplate(migrantworkersRenewalData));
                loadFB(VALUE_FOURTYFIVE, parseData.fb_data, migrantworkersRenewalData.payment_type);
                loadPH(VALUE_FOURTYFIVE, migrantworkersRenewalData.migrantworkers_renewal_id, parseData.ph_data);
                if (migrantworkersRenewalData.payment_type == VALUE_ONE || (migrantworkersRenewalData.payment_type == VALUE_TWO && migrantworkersRenewalData.user_payment_type == VALUE_ONE)) {
                    if (migrantworkersRenewalData.fees_paid_challan != '') {
                        $('#vp_container_for_migrantworkers_renewal').show();
                        $('#fees_paid_challan_name_href_for_migrantworkers_renewal').attr('href', MIGRANTWORKERS_DOC_PATH + migrantworkersRenewalData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_migrantworkers_renewal').html(migrantworkersRenewalData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
