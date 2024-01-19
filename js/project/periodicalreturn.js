var periodicalreturnListTemplate = Handlebars.compile($('#periodicalreturn_list_template').html());
var periodicalreturnTableTemplate = Handlebars.compile($('#periodicalreturn_table_template').html());
var periodicalreturnActionTemplate = Handlebars.compile($('#periodicalreturn_action_template').html());
var periodicalreturnFormTemplate = Handlebars.compile($('#periodicalreturn_form_template').html());
var periodicalreturnViewTemplate = Handlebars.compile($('#periodicalreturn_view_template').html());
var periodicalreturnProprietorInfoTemplate = Handlebars.compile($('#periodicalreturn_proprietor_info_template').html());
var periodicalreturnOtherInfoTemplate = Handlebars.compile($('#periodicalreturn_other_info_template').html());
var periodicalreturnManufacturerInfoTemplate = Handlebars.compile($('#periodicalreturn_manufacturer_info_template').html());
var periodicalreturnManufacturertwoInfoTemplate = Handlebars.compile($('#periodicalreturn_manufacturertwo_info_template').html());
var periodicalreturnRepairerInfoTemplate = Handlebars.compile($('#periodicalreturn_repairer_info_template').html());
//var periodicalreturnUploadChallanTemplate = Handlebars.compile($('#periodicalreturn_upload_challan_template').html());
var periodicalreturnApproveTemplate = Handlebars.compile($('#periodicalreturn_approve_template').html());
var periodicalreturnRejectTemplate = Handlebars.compile($('#periodicalreturn_reject_template').html());
//var periodicalreturnViewPaymentTemplate = Handlebars.compile($('#periodicalreturn_view_payment_template').html());

var tempPersonCnt = 1;
var tempDetailCnt = 1;
var tempDealerCnt = 1;
var tempManufacturerCnt = 1;
var tempManufacturertwoCnt = 1;

var Periodicalreturn = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Periodicalreturn.Router = Backbone.Router.extend({
    routes: {
        'periodicalreturn': 'renderList',
        'periodicalreturn_form': 'renderList',
        'edit_periodicalreturn_form': 'renderList',
        'view_periodicalreturn_form': 'renderList',
    },
    renderList: function () {
        Periodicalreturn.listview.listPage();
    },
    renderListForForm: function () {
        Periodicalreturn.listview.listPagePeriodicalreturnForm();
    }
});
Periodicalreturn.listView = Backbone.View.extend({
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
        activeLink('periodicalreturn');
        addClass('periodicalreturns', 'active');
        Periodicalreturn.router.navigate('periodicalreturns');
        var templateData = {};
        this.$el.html(periodicalreturnListTemplate(templateData));
        this.loadPeriodicalreturnData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageManufacturerRenewalForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('periodicalreturn');
        addClass('periodicalreturns', 'active');
        this.$el.html(periodicalreturnListTemplate);
        this.newPeriodicalreturnForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return periodicalreturnActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }

        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_approve_btn = '';
        } else {
            rowData.show_approve_btn = 'display: none;';
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
                (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
            rowData.show_reject_btn = '';
        } else {
            rowData.show_reject_btn = 'display: none;';
        }
        rowData.module_type = VALUE_TWENTYSEVEN;
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return periodicalreturnActionTemplate(rowData);
    },
    loadPeriodicalreturnData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_applicant + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.applicant_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FIFTY, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FIFTY);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['periodicalreturn_data'], function (index, objData) {
                json['periodicalreturn_data'][index]['query_movement_string'] = qmData[objData.periodicalreturn_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.periodicalreturn_id] + '</table>') : '-';
            });
            return json['periodicalreturn_data'];
        };
        var that = this;
        showTableContainer('periodicalreturn');
        Periodicalreturn.router.navigate('periodicalreturn');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Periodicalreturn.listview.loadPeriodicalreturnData();');
        $('#periodicalreturn_datatable_container').html(periodicalreturnTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_periodicalreturn_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_periodicalreturn_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_periodicalreturn_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_periodicalreturn_list', false);
        allowOnlyIntegerValue('mobile_number_for_periodicalreturn_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_periodicalreturn_list', false);
        $('#district_for_periodicalreturn_list').val(searchData.search_district);
        $('#status_for_periodicalreturn_list').val(searchData.search_status);
        $('#app_timing_for_periodicalreturn_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_periodicalreturn_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_periodicalreturn_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_periodicalreturn_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_periodicalreturn_list').attr('disabled', 'disabled');
        }
        periodicalreturnDataTable = $('#periodicalreturn_datatable').DataTable({
            ajax: {url: 'periodicalreturn/get_periodicalreturn_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'periodicalreturn_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'periodicalreturn_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'periodicalreturn_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'periodicalreturn_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#periodicalreturn_datatable_filter').remove();
        $('#periodicalreturn_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = periodicalreturnDataTable.row(tr);

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
    newPeriodicalreturnForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var tempPersonCnt = 1;
        var tempDetailCnt = 1;
        var tempDealerCnt = 1;
        var tempManufacturerCnt = 1;
        var tempManufacturertwoCnt = 1;
        if (isEdit) {
            var formData = parseData.periodicalreturn_data;
            Periodicalreturn.router.navigate('edit_periodicalreturn_form');
        } else {
            var formData = {};
            Periodicalreturn.router.navigate('periodicalreturn_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.periodicalreturn_data = parseData.periodicalreturn_data;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        //  $('#application_category').val(formData.application_category);

        if (isEdit) {
            templateData.applicant_licence_date = dateTo_DD_MM_YYYY(templateData.periodicalreturn_data.applicant_licence_date);
        } else {
            templateData.applicant_licence_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('periodicalreturn');
        $('#periodicalreturn_form_container').html(periodicalreturnFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            $('#application_category').val(formData.application_category);
            that.getApplicanttype(application_category);

            // $('#application_category').val(formData.application_category);

            var proprietorInfo = JSON.parse(formData.proprietor_details);
            $.each(proprietorInfo, function (key, value) {
                that.addMultipleProprietor(value);
            })

            var otherInfo = JSON.parse(formData.other_details);
            $.each(otherInfo, function (key, value) {
                that.addOther(value);
            })

            var manufacturerInfo = JSON.parse(formData.manufacturer_details);
            $.each(manufacturerInfo, function (key, value) {
                that.addMultipleManufacturer(value);
            })

            var manufacturertwoInfo = JSON.parse(formData.manufacturertwo_details);
            $.each(manufacturertwoInfo, function (key, value) {
                that.addMultipleManufacturertwo(value);
            })

            var repairerInfo = JSON.parse(formData.repairer_details);
            $.each(repairerInfo, function (key, value) {
                that.addMultipleRepairer(value);
            })
        } else {
            that.addMultipleProprietor({});
            that.addOther({});
            that.addMultipleManufacturer({});
            that.addMultipleManufacturertwo({});
            that.addMultipleRepairer({});
        }

        generateSelect2();
        datePicker();
        $('#periodicalreturn_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitPeriodicalreturn($('#submit_btn_for_periodicalreturn'));
            }
        });
    },
    editOrViewPeriodicalreturn: function (btnObj, periodicalreturnId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!periodicalreturnId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'periodicalreturn/get_periodicalreturn_data_by_id',
            type: 'post',
            data: $.extend({}, {'periodicalreturn_id': periodicalreturnId}, getTokenData()),
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
                    that.newPeriodicalreturnForm(isEdit, parseData);
                } else {
                    that.viewPeriodicalreturnForm(parseData);
                }
            }
        });
    },
    viewPeriodicalreturnForm: function (parseData) {
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
        var formData = parseData.periodicalreturn_data;
        Periodicalreturn.router.navigate('view_periodicalreturn_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('periodicalreturn');
        $('#periodicalreturn_form_container').html(periodicalreturnViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);

        $('#application_category').val(formData.application_category);
        that.getApplicanttype(application_category);

        var val = formData.application_category;


        var proprietorInfo = JSON.parse(formData.proprietor_details);
        $.each(proprietorInfo, function (key, value) {
            that.addMultipleProprietor(value);
        })

        var otherInfo = JSON.parse(formData.other_details);
        $.each(otherInfo, function (key, value) {
            that.addOther(value);
        })

        var manufacturerInfo = JSON.parse(formData.manufacturer_details);
        $.each(manufacturerInfo, function (key, value) {
            that.addMultipleManufacturer(value);
        })

        var manufacturertwoInfo = JSON.parse(formData.manufacturertwo_details);
        $.each(manufacturertwoInfo, function (key, value) {
            that.addMultipleManufacturertwo(value);
        })

        var repairerInfo = JSON.parse(formData.repairer_details);
        $.each(repairerInfo, function (key, value) {
            that.addMultipleRepairer(value);
        })
    },
    checkValidationForPeriodicalreturn: function (periodicalreturnData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!periodicalreturnData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!periodicalreturnData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!periodicalreturnData.application_category) {
            return getBasicMessageAndFieldJSONArray('application_category', applicationCategoryValidationMessage);
        }
        if (!periodicalreturnData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!periodicalreturnData.applicant_address) {
            return getBasicMessageAndFieldJSONArray('applicant_address', applicantAddressValidationMessage);
        }
        if (!periodicalreturnData.applicant_licence_no) {
            return getBasicMessageAndFieldJSONArray('applicant_licence_no', licenseNumberValidationMessage);
        }
        return '';
    },
    askForSubmitPeriodicalreturn: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_WM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Periodicalreturn.listview.submitPeriodicalreturn(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitPeriodicalreturn: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var periodicalreturnData = $('#periodicalreturn_form').serializeFormJSON();
        var validationData = that.checkValidationForPeriodicalreturn(periodicalreturnData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('periodicalreturn-' + validationData.field, validationData.message);
            return false;
        }

        var proprietorInfoItem = [];
        // var isproprietorValidation = false;

        $('.proprietor_info').each(function ()
        {
            var cnt = $(this).find('.temp_cnt').val();
            var proprietorInfo = {};
            var occupierName = $('#month_' + cnt).val();
            if (occupierName == '' || occupierName == null) {
                $('#month_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isproprietorValidation = true;
                return false;
            }
            proprietorInfo.month = occupierName;

            var fatherName = $('#ulsold_stock_' + cnt).val();
            if (fatherName == '' || fatherName == null) {
                $('#ulsold_stock_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, fatherNameValidationMessage);
                // isproprietorValidation = true;
                return false;
            }
            proprietorInfo.ulsold_stock = fatherName;

            var address = $('#brought_within_' + cnt).val();
            if (address == '' || address == null) {
                $('#brought_within_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isproprietorValidation = true;
                return false;
            }
            proprietorInfo.brought_within = address;

            var address = $('#broughtouside_' + cnt).val();
            if (address == '' || address == null) {
                $('#broughtouside_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isproprietorValidation = true;
                return false;
            }
            proprietorInfo.broughtouside = address;

            var address = $('#total_' + cnt).val();
            if (address == '' || address == null) {
                $('#total_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isproprietorValidation = true;
                return false;
            }
            proprietorInfo.total = address;


            proprietorInfoItem.push(proprietorInfo);
        });

        // if (isproprietorValidation) {
        //     return false;
        // }

        var otherInfoItem = [];
        // var isotherValidation = false;

        $('.other_info').each(function ()
        {
            var cnt = $(this).find('.temp_cnt').val();
            var otherInfo = {};
            var item_sold = $('#item_sold_' + cnt).val();
            if (item_sold == '' || item_sold == null) {
                $('#item_sold_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.item_sold = item_sold;

            var dispatch_voucher = $('#dispatch_voucher_' + cnt).val();
            if (dispatch_voucher == '' || dispatch_voucher == null) {
                $('#dispatch_voucher_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.dispatch_voucher = dispatch_voucher;

            var address = $('#itemsold2_' + cnt).val();
            if (address == '' || address == null) {
                $('#itemsold2_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.itemsold2 = address;

            var address = $('#dispatchvoucher2_' + cnt).val();
            if (address == '' || address == null) {
                $('#dispatchvoucher2_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.dispatchvoucher2 = address;

            var address = $('#state_name_' + cnt).val();
            if (address == '' || address == null) {
                $('#state_name_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.state_name = address;

            var address = $('#totalsold_' + cnt).val();
            if (address == '' || address == null) {
                $('#totalsold_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.totalsold = address;

            var address = $('#totalbalance_' + cnt).val();
            if (address == '' || address == null) {
                $('#totalbalance_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.totalbalance = address;

            var address = $('#remarks_' + cnt).val();
            if (address == '' || address == null) {
                $('#remarks_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isotherValidation = true;
                return false;
            }
            otherInfo.remarks = address;


            otherInfoItem.push(otherInfo);
        });

        // if (isotherValidation) {
        //     return false;
        // }

        var manufacturerInfoItem = [];
        // var ismanufacturerValidation = false;

        $('.manufacturer_info').each(function ()
        {
            var cnt = $(this).find('.temp_cnt').val();
            var manufacturerInfo = {};
            var occupierName = $('#month_' + cnt).val();
            if (occupierName == '' || occupierName == null) {
                $('#month_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.month = occupierName;

            var fatherName = $('#ulsold_stock_' + cnt).val();
            if (fatherName == '' || fatherName == null) {
                $('#ulsold_stock_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.ulsold_stock = fatherName;

            var address = $('#quantity_' + cnt).val();
            if (address == '' || address == null) {
                $('#quantity_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.quantity = address;

            var address = $('#total_' + cnt).val();
            if (address == '' || address == null) {
                $('#total_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.total = address;

            var address = $('#itemsold_' + cnt).val();
            if (address == '' || address == null) {
                $('#itemsold_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.itemsold = address;

            var address = $('#dispatchno_' + cnt).val();
            if (address == '' || address == null) {
                $('#dispatchno_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturerInfo.dispatchno = address;

            manufacturerInfoItem.push(manufacturerInfo);
        });

        var manufacturertwoInfoItem = [];
        // var ismanufacturerValidation = false;

        $('.manufacturertwo_info').each(function ()
        {
            var cnt = $(this).find('.temp_cnt').val();
            var manufacturertwo_info = {};
            var occupierName = $('#state_' + cnt).val();
            if (occupierName == '' || occupierName == null) {
                $('#state_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.state = occupierName;

            var fatherName = $('#itemsold_' + cnt).val();
            if (fatherName == '' || fatherName == null) {
                $('#itemsold_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.itemsold = fatherName;

            var address = $('#dispatchno_' + cnt).val();
            if (address == '' || address == null) {
                $('#dispatchno_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.dispatchno = address;

            var address = $('#total_' + cnt).val();
            if (address == '' || address == null) {
                $('#total_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.total = address;

            var address = $('#balance_' + cnt).val();
            if (address == '' || address == null) {
                $('#balance_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.balance = address;

            var address = $('#remarks_' + cnt).val();
            if (address == '' || address == null) {
                $('#remarks_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // ismanufacturerValidation = true;
                return false;
            }
            manufacturertwo_info.remarks = address;

            manufacturertwoInfoItem.push(manufacturertwo_info);
        });

        // if (ismanufacturerValidation) {
        //     return false;
        // }


        var repairerInfoItem = [];
        // var isrepairerValidation = false;
        $('.repairer_info').each(function ()
        {
            var cnt = $(this).find('.temp_cnt').val();
            var repairerInfo = {};
            var occupierName = $('#date_' + cnt).val();
            if (occupierName == '' || occupierName == null) {
                $('#date_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.date = occupierName;

            var fatherName = $('#username_' + cnt).val();
            if (fatherName == '' || fatherName == null) {
                $('#username_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.username = fatherName;

            var address = $('#items_' + cnt).val();
            if (address == '' || address == null) {
                $('#items_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.items = address;

            var address = $('#receiptno_' + cnt).val();
            if (address == '' || address == null) {
                $('#receiptno_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.receiptno = address;

            var address = $('#charges_' + cnt).val();
            if (address == '' || address == null) {
                $('#charges_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.charges = address;

            var address = $('#verificsationfees_' + cnt).val();
            if (address == '' || address == null) {
                $('#verificsationfees_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.verificsationfees = address;

            var address = $('#itemsold_' + cnt).val();
            if (address == '' || address == null) {
                $('#itemsold_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.itemsold = address;

            var address = $('#total_' + cnt).val();
            if (address == '' || address == null) {
                $('#total_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.total = address;

            var address = $('#returndate_' + cnt).val();
            if (address == '' || address == null) {
                $('#returndate_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.returndate = address;

            var address = $('#remarks_' + cnt).val();
            if (address == '' || address == null) {
                $('#remarks_' + cnt).focus();
                // validationMessageShow('periodicalreturn-' + cnt, proprietorAddressValidationMessage);
                // isrepairerValidation = true;
                return false;
            }
            repairerInfo.remarks = address;

            repairerInfoItem.push(repairerInfo);
        });

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_periodicalreturn') : $('#submit_btn_for_periodicalreturn');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var periodicalreturnData = new FormData($('#periodicalreturn_form')[0]);
        periodicalreturnData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        periodicalreturnData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        periodicalreturnData.append("other_data", JSON.stringify(otherInfoItem));
        periodicalreturnData.append("manufacturer_data", JSON.stringify(manufacturerInfoItem));
        periodicalreturnData.append("manufacturertwo_data", JSON.stringify(manufacturertwoInfoItem));
        periodicalreturnData.append("repairer_data", JSON.stringify(repairerInfoItem));
        periodicalreturnData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'periodicalreturn/submit_periodicalreturn',
            data: periodicalreturnData,
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
                validationMessageShow('periodicalreturn', textStatus.statusText);
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
                    validationMessageShow('periodicalreturn', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Periodicalreturn.router.navigate('periodicalreturn', {'trigger': true});
            }
        });
    },

    addMultipleProprietor: function (templateData) {
        templateData.per_cnt = tempPersonCnt;
        $('#proprietor_info_container').append(periodicalreturnProprietorInfoTemplate(templateData));
        tempPersonCnt++;
        resetCounter('display-cnt');
    },
    removeProprietorInfo: function (perCnt) {
        $('#proprietor_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    addOther: function (templateData) {
        templateData.dealer_cnt = tempDealerCnt;
        $('#other_info_container').append(periodicalreturnOtherInfoTemplate(templateData));
        tempDealerCnt++;
        resetCounter('displaydealer-cnt');
    },
    removeOtherInfo: function (perCnt) {
        $('#other_info_' + perCnt).remove();
        resetCounter('displaydealer-cnt');
    },
    addMultipleManufacturer: function (templateData) {
        templateData.manufaturer_cnt = tempManufacturerCnt;
        $('#manufacturer_info_container').append(periodicalreturnManufacturerInfoTemplate(templateData));
        tempManufacturerCnt++;
        resetCounter('display-manufaturer-cnt');
    },
    removeManufacturerInfo: function (perCnt) {
        $('#manufacturer_info_' + perCnt).remove();
        resetCounter('display-manufaturer-cnt');
    },
    addMultipleManufacturertwo: function (templateData) {
        templateData.manufacturer_cnt = tempManufacturertwoCnt;
        $('#manufacturertwo_info_container').append(periodicalreturnManufacturertwoInfoTemplate(templateData));
        tempManufacturertwoCnt++;
        resetCounter('display-manufacturertwo-cnt');
    },
    removeManufacturertwoInfo: function (perCnt) {
        $('#manufacturertwo_info_' + perCnt).remove();
        resetCounter('display-manufacturertwo-cnt');
    },
    addMultipleRepairer: function (templateData) {
        templateData.detail_cnt = tempDetailCnt;
        $('#repairer_info_container').append(periodicalreturnRepairerInfoTemplate(templateData));
        tempDetailCnt++;
        resetCounter('detailrepairer-cnt');
    },
    removeRepairerInfo: function (perCnt) {
        $('#repairer_info_' + perCnt).remove();
        resetCounter('detailrepairer-cnt');
    },
    generateForm1: function (periodicalreturnId) {
        if (!periodicalreturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#periodicalreturn_id_for_periodicalreturn_form1').val(periodicalreturnId);
        $('#periodicalreturn_form1_pdf_form').submit();
        $('#periodicalreturn_id_for_periodicalreturn_form1').val('');
    },

    askForApproveApplication: function (periodicalreturnId) {
        if (!periodicalreturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + periodicalreturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'periodicalreturn/get_periodicalreturn_data_by_periodicalreturn_id',
            type: 'post',
            data: $.extend({}, {'periodicalreturn_id': periodicalreturnId}, getTokenData()),
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
                var periodicalreturnData = parseData.periodicalreturn_data;
                showPopup();
                $('#popup_container').html(periodicalreturnApproveTemplate(periodicalreturnData));
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
        var formData = $('#approve_periodicalreturn_form').serializeFormJSON();
        if (!formData.periodicalreturn_id_for_periodicalreturn_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_periodicalreturn_approve) {
            $('#registration_number_for_periodicalreturn_approve').focus();
            validationMessageShow('periodicalreturn-approve-registration_number_for_periodicalreturn_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_periodicalreturn_approve) {
            $('#valid_upto_for_periodicalreturn_approve').focus();
            validationMessageShow('periodicalreturn-approve-valid_upto_for_periodicalreturn_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_periodicalreturn_approve) {
            $('#remarks_for_periodicalreturn_approve').focus();
            validationMessageShow('periodicalreturn-approve-remarks_for_periodicalreturn_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'periodicalreturn/approve_application',
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
                validationMessageShow('periodicalreturn-approve', textStatus.statusText);
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
                    validationMessageShow('periodicalreturn-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.periodicalreturn_id_for_periodicalreturn_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.periodicalreturn_id_for_periodicalreturn_approve).remove();
                $('#approve_btn_for_app_' + formData.periodicalreturn_id_for_periodicalreturn_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.periodicalreturn_id_for_periodicalreturn_approve).show();
                $('#so_status_' + formData.periodicalreturn_id_for_periodicalreturn_approve).html(dateTimeDays(formData.periodicalreturn_id_for_periodicalreturn_approve, parseData, VALUE_FIFTY));
            }
        });
    },
    askForRejectApplication: function (periodicalreturnId) {
        if (!periodicalreturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_periodicalreturn_' + periodicalreturnId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'periodicalreturn/get_periodicalreturn_data_by_periodicalreturn_id',
            type: 'post',
            data: $.extend({}, {'periodicalreturn_id': periodicalreturnId}, getTokenData()),
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
                var periodicalreturnData = parseData.periodicalreturn_data;
                showPopup();
                $('#popup_container').html(periodicalreturnRejectTemplate(periodicalreturnData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_periodicalreturn_form').serializeFormJSON();
        if (!formData.periodicalreturn_id_for_periodicalreturn_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_periodicalreturn_reject) {
            $('#remarks_for_periodicalreturn_reject').focus();
            validationMessageShow('periodicalreturn-reject-remarks_for_periodicalreturn_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'periodicalreturn/reject_application',
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
                validationMessageShow('periodicalreturn-reject', textStatus.statusText);
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
                    validationMessageShow('periodicalreturn-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.periodicalreturn_id_for_periodicalreturn_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.periodicalreturn_id_for_periodicalreturn_reject).remove();
                //   $('#download_fees_paid_challan_btn_' + formData.periodicalreturn_id_for_periodicalreturn_reject).remove();
                $('#reject_btn_for_app_' + formData.periodicalreturn_id_for_periodicalreturn_reject).remove();
                $('#approve_btn_for_app_' + formData.periodicalreturn_id_for_periodicalreturn_reject).remove();
                $('#so_status_' + formData.periodicalreturn_id_for_periodicalreturn_reject).html(dateTimeDays(formData.periodicalreturn_id_for_periodicalreturn_reject, parseData, VALUE_FIFTY));
            }
        });
    },
    generateCertificate: function (periodicalreturnId) {
        if (!periodicalreturnId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#periodicalreturn_id_for_certificate').val(periodicalreturnId);
        $('#periodicalreturn_certificate_pdf_form').submit();
        $('#periodicalreturn_id_for_certificate').val('');
    },
    getQueryData: function (periodicalreturnId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!periodicalreturnId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FIFTY;
        templateData.module_id = periodicalreturnId;
        var btnObj = $('#query_btn_for_pr_' + periodicalreturnId);
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
                tmpData.application_number = regNoRenderer(VALUE_FIFTY, moduleData.periodicalreturn_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_FIFTY;
                tmpData.module_id = periodicalreturnId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    // viewPayment: function (periodicalreturnId) {
    //     if (!periodicalreturnId) {
    //         showError(invalidAccessValidationMessage);
    //         return false;
    //     }
    //     var that = this;
    //     var btnObj = $('#download_fees_paid_challan_btn_' + periodicalreturnId);
    //     var ogBtnHTML = btnObj.html();
    //     var ogBtnOnclick = btnObj.attr('onclick');
    //     btnObj.html(iconSpinnerTemplate);
    //     btnObj.attr('onclick', '');
    //     $.ajax({
    //         url: 'periodicalreturn/get_periodicalreturn_data_by_periodicalreturn_id',
    //         type: 'post',
    //         data: $.extend({}, {'periodicalreturn_id': periodicalreturnId}, getTokenData()),
    //         error: function (textStatus, errorThrown) {
    //             generateNewCSRFToken();
    //             if (!textStatus.statusText) {
    //                 loginPage();
    //                 return false;
    //             }
    //             btnObj.html(ogBtnHTML);
    //             btnObj.attr('onclick', ogBtnOnclick);
    //             showError(textStatus.statusText);
    //             $('html, body').animate({scrollTop: '0px'}, 0);
    //         },
    //         success: function (response) {
    //             btnObj.html(ogBtnHTML);
    //             btnObj.attr('onclick', ogBtnOnclick);
    //             var parseData = JSON.parse(response);
    //             setNewToken(parseData.temp_token);
    //             if (parseData.success === false) {
    //                 showError(parseData.message);
    //                 $('html, body').animate({scrollTop: '0px'}, 0);
    //                 return false;
    //             }
    //             var periodicalreturnData = parseData.periodicalreturn_data;
    //             showPopup();
    //             if (periodicalreturnData.payment_type == VALUE_ONE || periodicalreturnData.payment_type == VALUE_THREE) {
    //                 periodicalreturnData.user_payment_type_text = paymentTypeArray[periodicalreturnData.payment_type];
    //             } else {
    //                 periodicalreturnData.user_payment_type_text = userPaymentTypeArray[periodicalreturnData.user_payment_type] ? userPaymentTypeArray[periodicalreturnData.user_payment_type] : '';
    //             }
    //             if (periodicalreturnData.payment_type == VALUE_ONE) {
    //                 periodicalreturnData.utitle = 'Fees Paid Challan Copy';
    //             } else if (periodicalreturnData.payment_type == VALUE_TWO && periodicalreturnData.user_payment_type == VALUE_ONE) {
    //                 periodicalreturnData.utitle = 'Demand Draft (DD) Copy';
    //             }
    //             $('#popup_container').html(periodicalreturnViewPaymentTemplate(periodicalreturnData));
    //             if (periodicalreturnData.payment_type == VALUE_ONE || (periodicalreturnData.payment_type == VALUE_TWO && periodicalreturnData.user_payment_type == VALUE_ONE)) {
    //                 if (periodicalreturnData.fees_paid_challan != '') {
    //                     $('#vp_container_for_periodicalreturn').show();
    //                     $('#fees_paid_challan_name_href_for_periodicalreturn').attr('href', PR_DOC_PATH + periodicalreturnData.fees_paid_challan);
    //                     $('#fees_paid_challan_name_for_periodicalreturn').html(periodicalreturnData.fees_paid_challan);
    //                 }
    //             }
    //         }
    //     });
    // },
    getApplicanttype: function (constitution) {
        var val = constitution.value;
        if (val == '') {
            return false;
        }
        if (val === '1') {
            this.$('.applicant_detail_for_lr_div').show();
            this.$('.applicant_detail_for_ld_div').hide();
            this.$('.applicant_detail_for_lm_div').hide();
            this.$('.applicant_ld_lm_div').hide();
            this.$('.applicant_lr_div').show();
            this.$('.applicant_ld_div').hide();
            this.$('.applicant_lm_div').hide();

        }
        if (val === '2') {
            this.$('.applicant_detail_for_lr_div').hide();
            this.$('.applicant_detail_for_ld_div').show();
            this.$('.applicant_detail_for_lm_div').hide();
            this.$('.applicant_ld_lm_div').show();
            this.$('.applicant_lr_div').hide();
            this.$('.applicant_ld_div').show();
            this.$('.applicant_lm_div').hide();
        }
        if (val === '3') {
            this.$('.applicant_detail_for_lr_div').hide();
            this.$('.applicant_detail_for_ld_div').hide();
            this.$('.applicant_detail_for_lm_div').show();
            this.$('.applicant_ld_lm_div').show();
            this.$('.applicant_ld_div').hide();
            this.$('.applicant_lr_div').hide();
            this.$('.applicant_ld_div').hide();
            this.$('.applicant_lm_div').show();
        }

    },
});
