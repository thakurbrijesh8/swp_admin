var clactListTemplate = Handlebars.compile($('#clact_list_template').html());
var clactTableTemplate = Handlebars.compile($('#clact_table_template').html());
var clactFormTemplate = Handlebars.compile($('#clact_form_template').html());
var clactActionTemplate = Handlebars.compile($('#clact_action_template').html());
var clactItemTemplate = Handlebars.compile($('#clact_item_template').html());
var clactViewTemplate = Handlebars.compile($('#clact_view_template').html());
var clactViewItemTemplate = Handlebars.compile($('#clact_view_item_template').html());
var clactUploadChallanTemplate = Handlebars.compile($('#clact_upload_challan_template').html());
var clactApproveTemplate = Handlebars.compile($('#clact_approve_template').html());
var clactRejectTemplate = Handlebars.compile($('#clact_reject_template').html());
var clactViewPaymentTemplate = Handlebars.compile($('#clact_view_payment_template').html());
var tempContCnt = 1;
var CLACT = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
CLACT.Router = Backbone.Router.extend({
    routes: {
        'clact': 'renderList',
        'clact_form': 'renderListForForm',
        'edit_clact_form': 'renderList',
        'view_clact_form': 'renderList',
    },
    renderList: function () {
        CLACT.listview.listPage();
    },
    renderListForForm: function () {
        CLACT.listview.listPageCLACTForm();
    }
});
CLACT.listView = Backbone.View.extend({
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
        addClass('menu_clact', 'active');
        CLACT.router.navigate('clact');
        this.$el.html(clactListTemplate);
        this.loadCLACTData(sDistrict, sStatus, sAppTimingStatus);
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return clactActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYONE;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        return clactActionTemplate(rowData);
    },
    loadCLACTData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.establishment_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.nature_of_work;
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
                return regNoRenderer(VALUE_THIRTYONE, data) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
            else
                return regNoRenderer(VALUE_THIRTYONE, data);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYONE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['clact_data'], function (index, objData) {
                json['clact_data'][index]['query_movement_string'] = qmData[objData.establishment_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.establishment_id] + '</table>') : '-';
            });
            return json['clact_data'];
        };
        var that = this;
        showTableContainer('clact');
        CLACT.router.navigate('clact');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'CLACT.listview.loadCLACTData();');
        $('#clact_datatable_container').html(clactTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_clact_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_clact_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_clact_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_clact_list', false);
        allowOnlyIntegerValue('mobile_number_for_clact_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_clact_list', false);
        $('#district_for_clact_list').val(searchData.search_district);
        $('#status_for_clact_list').val(searchData.search_status);
        $('#app_timing_for_clact_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_clact_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_clact_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_clact_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_clact_list').attr('disabled', 'disabled');
        }
        clactDatatable = $('#clact_datatable').DataTable({
            ajax: {url: 'clact/get_clact_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'establishment_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'establishment_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'establishment_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'establishment_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#clact_datatable_filter').remove();
        $('#clact_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = clactDatatable.row(tr);

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
    listPageCLACTForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_clact', 'active');
        this.$el.html(clactListTemplate);
        this.addCLACT(false, {});
    },
    addContractor: function (contractorData) {
        if (!contractorData.user_id) {
            contractorData.user_id = $('#user_id_for_clact').val();
        }
        contractorData.cnt = tempContCnt;
        if (contractorData.contractor_start_date) {
            contractorData.contractor_start_date_text = contractorData.contractor_start_date != '0000-00-00' ? dateTo_DD_MM_YYYY(contractorData.contractor_start_date) : '';
        }
        if (contractorData.contractor_termination_date) {
            contractorData.contractor_termination_date_text = contractorData.contractor_termination_date != '0000-00-00' ? dateTo_DD_MM_YYYY(contractorData.contractor_termination_date) : '';
        }
        $('#contractor_container_for_clact').append(clactItemTemplate(contractorData));
        allowOnlyIntegerValue('contractor_mobile_number_' + tempContCnt);
        allowOnlyIntegerValue('contractor_labour_' + tempContCnt);
        resetCounter('display-contractor-item-cnt');
        datePicker();
        tempContCnt++;
    },
    removeContractor: function (itemCnt) {
        $('.contractor_item_for_clact_' + itemCnt).remove();
        resetCounter('display-contractor-item-cnt');
    },
    addCLACT: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.clact_data;
            CLACT.router.navigate('edit_clact_form');
        } else {
            var formData = {};
            CLACT.router.navigate('clact_form');
        }
        tempContCnt = 1;
        formData.VALUE_ONE = VALUE_ONE;
        formData.VALUE_TWO = VALUE_TWO;
        showFormContainer('clact');
        $('#clact_form_container').html(clactFormTemplate(formData));
        allowOnlyIntegerValue('pe_mobile_number_for_clact');
        allowOnlyIntegerValue('mp_mobile_number_for_clact');
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            var contData = parseData.contractor_data;
            $.each(contData, function (index, conData) {
                that.addContractor(conData);
            });
            $('#declaration_for_clact').prop('checked', true);
            if (formData.seal_and_stamp != '') {
                $('#seal_and_stamp_container_for_clact').hide();
                $('#seal_and_stamp_name_image_for_clact').attr('src', CLACT_DOC_PATH + formData.seal_and_stamp);
                $('#seal_and_stamp_name_container_for_clact').show();
            }
        }
        $('#clact_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitCLACT(VALUE_ONE);
            }
        });
    },
    checkValidationForCLACT: function (clactDetails) {
        if (!clactDetails.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!clactDetails.establishment_name_for_clact) {
            return getBasicMessageAndFieldJSONArray('establishment_name_for_clact', establishmentNameValidationMessage);
        }
        if (!clactDetails.establishment_location_for_clact) {
            return getBasicMessageAndFieldJSONArray('establishment_location_for_clact', establishmentLocationValidationMessage);
        }
        if (!clactDetails.establishment_postel_address_for_clact) {
            return getBasicMessageAndFieldJSONArray('establishment_postel_address_for_clact', establishmentPostalAddressValidationMessage);
        }
        if (!clactDetails.nature_of_work_for_clact) {
            return getBasicMessageAndFieldJSONArray('nature_of_work_for_clact', contractorNatureOfWorkingValidationMessage);
        }
        if (!clactDetails.pe_full_name_for_clact) {
            return getBasicMessageAndFieldJSONArray('pe_full_name_for_clact', establishmentPrincipalNameValidationMessage);
        }
        if (!clactDetails.pe_address_for_clact) {
            return getBasicMessageAndFieldJSONArray('pe_address_for_clact', establishmentPrincipalAddressValidationMessage);
        }
        if (!clactDetails.pe_mobile_number_for_clact) {
            return getBasicMessageAndFieldJSONArray('pe_mobile_number_for_clact', mobileValidationMessage);
        }
        var peMobileMessage = mobileNumberValidation(clactDetails.pe_mobile_number_for_clact);
        if (peMobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('pe_mobile_number_for_clact', peMobileMessage);
        }
        if (!clactDetails.pe_email_id_for_clact) {
            return getBasicMessageAndFieldJSONArray('pe_email_id_for_clact', emailValidationMessage);
        }
        var peEmailMessage = emailIdValidation(clactDetails.pe_email_id_for_clact);
        if (peEmailMessage != '') {
            return getBasicMessageAndFieldJSONArray('pe_email_id_for_clact', peEmailMessage);
        }
        if (!clactDetails.mp_full_name_for_clact) {
            return getBasicMessageAndFieldJSONArray('mp_full_name_for_clact', establishmentManagerNameValidationMessage);
        }
        if (!clactDetails.mp_address_for_clact) {
            return getBasicMessageAndFieldJSONArray('mp_address_for_clact', establishmentManagerAddressValidationMessage);
        }
        if (!clactDetails.mp_mobile_number_for_clact) {
            return getBasicMessageAndFieldJSONArray('mp_mobile_number_for_clact', mobileValidationMessage);
        }
        var mpMobileMessage = mobileNumberValidation(clactDetails.mp_mobile_number_for_clact);
        if (mpMobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mp_mobile_number_for_clact', mpMobileMessage);
        }
        if (!clactDetails.mp_email_id_for_clact) {
            return getBasicMessageAndFieldJSONArray('mp_email_id_for_clact', emailValidationMessage);
        }
        var mpEmailMessage = emailIdValidation(clactDetails.mp_email_id_for_clact);
        if (mpEmailMessage != '') {
            return getBasicMessageAndFieldJSONArray('mp_email_id_for_clact', mpEmailMessage);
        }
        return '';
    },
    askForSubmitCLACT: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CLACT.listview.submitCLACT(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitCLACT: function (moduleType) {
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
        var seekerStaffDetailsData = $('#clact_form').serializeFormJSON();
        var validationData = that.checkValidationForCLACT(seekerStaffDetailsData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('clact-' + validationData.field, validationData.message);
            return false;
        }
        var tempCntForContractor = 0;
        var newContractorItems = [];
        var exiContractorItems = [];
        var isContractorItemValidation = false;
        $('.contractor-item-for-clact').each(function () {
            var ciCnt = $(this).find('.contractor-item-cnt').val();
            var contractorItem = {};
            var cpn = $('#contractor_proprietor_name_' + ciCnt).val();
            if (cpn == '' || cpn == null) {
                $('#contractor_proprietor_name_' + ciCnt).focus();
                validationMessageShow('clact-contractor_proprietor_name_' + ciCnt, contractorPropriterNameValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_proprietor_name = cpn;
            var cn = $('#contractor_name_' + ciCnt).val();
            if (cn == '' || cn == null) {
                $('#contractor_name_' + ciCnt).focus();
                validationMessageShow('clact-contractor_name_' + ciCnt, contractorNameValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_name = cn;

            var cei = $('#contractor_email_id_' + ciCnt).val();
            if (cei == '' || cei == null) {
                $('#contractor_email_id_' + ciCnt).focus();
                validationMessageShow('clact-contractor_email_id_' + ciCnt, emailValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            var ceiMessage = emailIdValidation(cei);
            if (ceiMessage != '') {
                $('#contractor_email_id_' + ciCnt).focus();
                validationMessageShow('clact-contractor_email_id_' + ciCnt, ceiMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.email_id = cei;

            var cmn = $('#contractor_mobile_number_' + ciCnt).val();
            if (cmn == '' || cmn == null) {
                $('#contractor_mobile_number_' + ciCnt).focus();
                validationMessageShow('clact-contractor_mobile_number_' + ciCnt, mobileValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            var cmnMessage = mobileNumberValidation(cmn);
            if (cmnMessage != '') {
                $('#contractor_mobile_number_' + ciCnt).focus();
                validationMessageShow('clact-contractor_mobile_number_' + ciCnt, cmnMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.mobile_number = cmn;

            var ca = $('#contractor_address_' + ciCnt).val();
            if (ca == '' || ca == null) {
                $('#contractor_address_' + ciCnt).focus();
                validationMessageShow('clact-contractor_address_' + ciCnt, contractorAddressValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_address = ca;

            var cnow = $('#nature_of_work_' + ciCnt).val();
            if (cnow == '' || cnow == null) {
                $('#nature_of_work_' + ciCnt).focus();
                validationMessageShow('clact-nature_of_work_' + ciCnt, contractorNatureOfWorkingValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.nature_of_work = cnow;

            var cl = $('#contractor_labour_' + ciCnt).val();
            if (cl == '' || cl == null) {
                $('#contractor_labour_' + ciCnt).focus();
                validationMessageShow('clact-contractor_labour_' + ciCnt, contractorLabourValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_labour = cl;

            var csd = $('#contractor_start_date_' + ciCnt).val();
            if (csd == '' || csd == null) {
                $('#contractor_start_date_' + ciCnt).focus();
                validationMessageShow('clact-contractor_start_date_' + ciCnt, contractorStartDateValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_start_date = dateTo_YYYY_MM_DD(csd);

            var ctd = $('#contractor_termination_date_' + ciCnt).val();
            if (ctd == '' || ctd == null) {
                $('#contractor_termination_date_' + ciCnt).focus();
                validationMessageShow('clact-contractor_termination_date_' + ciCnt, contractorTerminationDateValidationMessage);
                isContractorItemValidation = true;
                return false;
            }
            contractorItem.contractor_termination_date = dateTo_YYYY_MM_DD(ctd);
            contractorItem.user_id = $('#user_id_' + ciCnt).val();
            var ci = $('#contractor_id_' + ciCnt).val();
            if (ci != '') {
                contractorItem.establishment_contractor_id = ci;
                exiContractorItems.push(contractorItem);
            } else {
                newContractorItems.push(contractorItem);
            }
            tempCntForContractor++;
        });
        if (isContractorItemValidation) {
            return false;
        }
        if (tempCntForContractor == 0) {
            validationMessageShow('clact', oneContractorValidationMessage);
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        if ($('#seal_and_stamp_container_for_clact').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_clact').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_clact').focus();
                validationMessageShow('clact-seal_and_stamp_for_clact', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_clact', 2048);
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_clact').focus();
                validationMessageShow('clact-seal_and_stamp_for_clact', sealAndStampMessage);
                return false;
            }
        }
        if (!$('#declaration_for_clact').is(':checked')) {
            $('#declaration_for_clact').focus();
            validationMessageShow('clact-declaration_for_clact', establishmentDeclarationValidationMessage);
            return false;
        }
        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_clact') : $('#submit_btn_for_clact');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#clact_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        formData.append("new_contractor_item_for_clact", JSON.stringify(newContractorItems));
        formData.append("exi_contractor_item_for_clact", JSON.stringify(exiContractorItems));
        formData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'clact/submit_clact',
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
                validationMessageShow('clact', textStatus.statusText);
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
                    validationMessageShow('clact', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                CLACT.router.navigate('clact', {'trigger': true});
            }
        });
    },
    editOrViewCLACT: function (btnObj, aeId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!aeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'clact/get_clact_data_by_id',
            type: 'post',
            data: $.extend({}, {'clact_id': aeId}, getTokenData()),
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
                    that.addCLACT(true, parseData);
                } else {
                    that.viewCLACT(parseData);
                }
            }
        });
    },
    viewCLACT: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.clact_data;
        CLACT.router.navigate('view_clact_form');
        formData.valid_upto_text = formData.valid_upto != '0000-00-00' ? dateTo_DD_MM_YYYY(formData.valid_upto) : '';
        showFormContainer('clact');
        $('#clact_form_container').html(clactViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        var contData = parseData.contractor_data;
        var contCnt = 1;
        $.each(contData, function (index, conData) {
            conData.contractor_start_date_text = conData.contractor_start_date != '0000-00-00' ? dateTo_DD_MM_YYYY(conData.contractor_start_date) : '';
            conData.contractor_termination_date_text = conData.contractor_termination_date != '0000-00-00' ? dateTo_DD_MM_YYYY(conData.contractor_termination_date) : '';
            conData.cnt = contCnt;
            $('#contractor_container_for_clact_view').append(clactViewItemTemplate(conData));
            contCnt++;
        });
        if (formData.seal_and_stamp != '') {
            $('#seal_and_stamp_container_for_clact_view').hide();
            $('#seal_and_stamp_name_image_for_clact_view').attr('src', CLACT_DOC_PATH + formData.seal_and_stamp);
            $('#seal_and_stamp_name_container_for_clact_view').show();
        }
    },
    askForRemove: function (establishmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'CLACT.listview.removeDocument(\'' + establishmentId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (establishmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'clact/remove_document',
            data: $.extend({}, {'establishment_id': establishmentId}, getTokenData()),
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
                $('#seal_and_stamp_name_container_for_clact').hide();
                $('#seal_and_stamp_name_image_for_clact').attr('src', '');
                $('#seal_and_stamp_container_for_clact').show();
                $('#seal_and_stamp_for_clact').val('');
            }
        });
    },
    generateForm1: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#establishment_id_for_clact_form1').val(establishmentId);
        $('#establishment_form1_pdf_form').submit();
        $('#establishment_id_for_clact_form1').val('');
    },
    openUploadChallan: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + establishmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'clact/get_clact_data_by_clact_id',
            type: 'post',
            data: $.extend({}, {'clact_id': establishmentId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var clactData = parseData.clact_data;
                showPopup();
                if (clactData.payment_type == VALUE_ONE) {
                    clactData.utitle = 'Challan Copy';
                } else {
                    clactData.utitle = 'Payment Details';
                }
                clactData.module_type = VALUE_THIRTYONE;
                $('#popup_container').html(clactUploadChallanTemplate(clactData));
                loadFB(VALUE_THIRTYONE, parseData.fb_data, clactData.payment_type, clactData.show_remove_upload_btn, clactData.show_dropdown, clactData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'clact_upload_challan', clactData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'clact_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYONE);
                if (clactData.challan != '') {
                    $('#challan_container_for_clact_upload_challan').hide();
                    $('#challan_name_container_for_clact_upload_challan').show();
                    $('#challan_name_href_for_clact_upload_challan').attr('href', 'documents/clact/' + clactData.challan);
                    $('#challan_name_for_clact_upload_challan').html(clactData.challan);
                    $('#challan_remove_btn_for_clact_upload_challan').attr('onclick', 'CLACT.listview.removeChallan("' + clactData.establishment_id + '")');
                }
            }
        });
    },
    removeChallan: function (establishmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'clact/remove_challan',
            data: $.extend({}, {'establishment_id': establishmentId}, getTokenData()),
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
                validationMessageShow('clact-uc', textStatus.statusText);
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
                    validationMessageShow('clact-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-clact-uc').html(parseData.message);
                removeDocument('challan', 'clact_upload_challan');
                $('#status_' + establishmentId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-clact-uc').html('');
        validationMessageHide();
        var establishmentId = $('#clact_id_for_clact_upload_challan').val();
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_clact_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_clact_upload_challan_1').focus();
            validationMessageShow('clact-uc-payment_type_for_clact_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_clact_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_clact_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_clact_upload_challan').focus();
                validationMessageShow('clact-uc-challan_for_clact_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_clact_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_clact_upload_challan').focus();
                validationMessageShow('clact-uc-challan_for_clact_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYONE, 'clact-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_clact_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#clact_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'clact/upload_challan',
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
                validationMessageShow('clact-uc', textStatus.statusText);
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
                    validationMessageShow('clact-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + establishmentId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + establishmentId).show();
                }
                $('#total_fees_' + establishmentId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + establishmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'clact/get_clact_data_by_clact_id',
            type: 'post',
            data: $.extend({}, {'clact_id': establishmentId}, getTokenData()),
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
                var clactData = parseData.clact_data;
                showPopup();
                $('#popup_container').html(clactApproveTemplate(clactData));
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
        var formData = $('#approve_clact_form').serializeFormJSON();
        if (!formData.clact_id_for_clact_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_clact_approve) {
            $('#registration_number_for_clact_approve').focus();
            validationMessageShow('clact-approve-registration_number_for_clact_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_clact_approve) {
            $('#valid_upto_for_clact_approve').focus();
            validationMessageShow('clact-approve-valid_upto_for_clact_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_clact_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_clact_approve').focus();
            validationMessageShow('clact-approve-certificate_file_for_clact_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_clact_approve) {
            $('#remarks_for_clact_approve').focus();
            validationMessageShow('clact-approve-remarks_for_clact_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_clact_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_clact_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'clact/approve_application',
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
                validationMessageShow('clact-approve', textStatus.statusText);
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
                    validationMessageShow('clact-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.clact_id_for_clact_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.clact_id_for_clact_approve).remove();
                $('#approve_btn_for_app_' + formData.clact_id_for_clact_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.clact_id_for_clact_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.clact_id_for_clact_approve).show();
                $('#so_status_' + formData.clact_id_for_clact_approve).html(dateTimeDays(formData.clact_id_for_clact_approve, parseData, VALUE_THIRTYONE));
                //that.loadCLACTData();
            }
        });
    },
    askForRejectApplication: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + establishmentId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'clact/get_clact_data_by_clact_id',
            type: 'post',
            data: $.extend({}, {'clact_id': establishmentId}, getTokenData()),
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
                var clactData = parseData.clact_data;
                showPopup();
                $('#popup_container').html(clactRejectTemplate(clactData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_clact_form').serializeFormJSON();
        if (!formData.clact_id_for_clact_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_clact_reject) {
            $('#remarks_for_clact_reject').focus();
            validationMessageShow('clact-reject-remarks_for_clact_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'clact/reject_application',
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
                validationMessageShow('clact-reject', textStatus.statusText);
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
                    validationMessageShow('clact-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.clact_id_for_clact_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.clact_id_for_clact_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.clact_id_for_clact_reject).remove();
                $('#reject_btn_for_app_' + formData.clact_id_for_clact_reject).remove();
                $('#approve_btn_for_app_' + formData.clact_id_for_clact_reject).remove();
                $('#so_status_' + formData.clact_id_for_clact_reject).html(dateTimeDays(formData.clact_id_for_clact_reject, parseData, VALUE_THIRTYONE));
            }
        });
    },
    generateCertificate: function (establishmentId) {
        if (!establishmentId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#establishment_id_for_certificate').val(establishmentId);
        $('#establishment_certificate_pdf_form').submit();
        $('#establishment_id_for_certificate').val('');
    },
    getQueryData: function (establishmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!establishmentId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYONE;
        templateData.module_id = establishmentId;
        var btnObj = $('#query_btn_for_app_' + establishmentId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYONE, moduleData.establishment_id);
                tmpData.applicant_name = moduleData.establishment_name;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_THIRTYONE;
                tmpData.module_id = establishmentId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (clactId) {
        if (!clactId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + clactId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'clact/get_clact_data_by_clact_id',
            type: 'post',
            data: $.extend({}, {'clact_id': clactId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var clactData = parseData.clact_data;
                showPopup();
                if (clactData.payment_type == VALUE_ONE || clactData.payment_type == VALUE_THREE) {
                    clactData.user_payment_type_text = paymentTypeArray[clactData.payment_type];
                } else {
                    clactData.user_payment_type_text = userPaymentTypeArray[clactData.user_payment_type] ? userPaymentTypeArray[clactData.user_payment_type] : '';
                }
                if (clactData.payment_type == VALUE_ONE) {
                    clactData.utitle = 'Fees Paid Challan Copy';
                } else if (clactData.payment_type == VALUE_TWO && clactData.user_payment_type == VALUE_ONE) {
                    clactData.utitle = 'Demand Draft (DD) Copy';
                }
                clactData.module_type = VALUE_THIRTYONE;
                $('#popup_container').html(clactViewPaymentTemplate(clactData));
                loadFB(VALUE_THIRTYONE, parseData.fb_data, clactData.payment_type);
                loadPH(VALUE_THIRTYONE, clactData.establishment_id, parseData.ph_data);
                if (clactData.payment_type == VALUE_ONE || (clactData.payment_type == VALUE_TWO && clactData.user_payment_type == VALUE_ONE)) {
                    if (clactData.fees_paid_challan != '') {
                        $('#vp_container_for_clact').show();
                        $('#fees_paid_challan_name_href_for_clact').attr('href', CLACT_DOC_PATH + clactData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_clact').html(clactData.fees_paid_challan);
                    }
                }
            }
        });
    },
});