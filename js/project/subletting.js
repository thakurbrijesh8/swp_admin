var sublettingListTemplate = Handlebars.compile($('#subletting_list_template').html());
var sublettingTableTemplate = Handlebars.compile($('#subletting_table_template').html());
var sublettingActionTemplate = Handlebars.compile($('#subletting_action_template').html());
var sublettingFormTemplate = Handlebars.compile($('#subletting_form_template').html());
var sublettingViewTemplate = Handlebars.compile($('#subletting_view_template').html());
var sublettingUploadChallanTemplate = Handlebars.compile($('#subletting_upload_challan_template').html());
var sublettingApproveTemplate = Handlebars.compile($('#subletting_approve_template').html());
var sublettingRejectTemplate = Handlebars.compile($('#subletting_reject_template').html());

var tempPersonCnt = 1;

var Subletting = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Subletting.Router = Backbone.Router.extend({
    routes: {
        'subletting': 'renderList',
        'subletting_form': 'renderList',
        'edit_subletting_form': 'renderList',
        'view_subletting_form': 'renderList',
    },
    renderList: function () {
        Subletting.listview.listPage();
    },
    renderListForForm: function () {
        Subletting.listview.listPageSublettingForm();
    }
});
Subletting.listView = Backbone.View.extend({
    el: 'div#main_container',
       events: {
        'click input[name="request_letter"]': 'hasCaseOfLeased',
        'click input[name="original_extract"]': 'hasCaseOfOriginalextract',
        'click input[name="land_revenue"]': 'hasCaseOfLandrevenue',
        'click input[name="electricity_bill"]': 'hasCaseOfElectricitybill',
        'click input[name="bank_loan"]': 'hasCaseOfBankloan',
        'click input[name="panchayat_tax"]': 'hasCaseOfPanchayattax',
        'click input[name="challan_of_lease"]': 'hasCaseOfchallanoflease',
        'click input[name="occupancy"]': 'hasCaseOfOccupancy',
        'click input[name="central_excise"]': 'hasCaseOfCentralexcise',
        'click input[name="authorization_sign"]': 'hasCaseOfauthorizedsign',

    },
    //     hasCaseOfLeased: function (event) {
    //     var val = $('input[name=request_letter]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.request_letter_div').show();
    //     } else {
    //         this.$('.request_letter_div').hide();

    //     }
    // },
    // hasCaseOfOriginalextract: function (event) {
    //     var val = $('input[name=original_extract]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.original_extract_div').show();
    //     } else {
    //         this.$('.original_extract_div').hide();

    //     }
    // },
    // hasCaseOfLandrevenue: function (event) {
    //     var val = $('input[name=land_revenue]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.land_revenue_div').show();
    //     } else {
    //         this.$('.land_revenue_div').hide();

    //     }
    // },
    // hasCaseOfElectricitybill: function (event) {
    //     var val = $('input[name=electricity_bill]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.electricity_bill_div').show();
    //     } else {
    //         this.$('.electricity_bill_div').hide();

    //     }
    // },
    // hasCaseOfBankloan: function (event) {
    //     var val = $('input[name=bank_loan]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.bank_loan_div').show();
    //     } else {
    //         this.$('.bank_loan_div').hide();

    //     }
    // },
    // hasCaseOfPanchayattax: function (event) {
    //     var val = $('input[name=panchayat_tax]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.panchayat_tax_div').show();
    //     } else {
    //         this.$('.panchayat_tax_div').hide();

    //     }
    // },
    // hasCaseOfchallanoflease: function (event) {
    //     var val = $('input[name=challan_of_lease]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.challan_of_lease_div').show();
    //     } else {
    //         this.$('.challan_of_lease_div').hide();

    //     }
    // },
    //  hasCaseOfOccupancy: function (event) {
    //     var val = $('input[name=occupancy]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.occupancy_div').show();
    //     } else {
    //         this.$('.occupancy_div').hide();

    //     }
    // },
    // hasCaseOfCentralexcise: function (event) {
    //     var val = $('input[name=central_excise]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.central_excise_div').show();
    //     } else {
    //         this.$('.central_excise_div').hide();

    //     }
    // },
    // hasCaseOfauthorizedsign: function (event) {
    //     var val = $('input[name=authorization_sign]:checked').val();
    //     if (val == IS_CHECKED_YES) {
    //         this.$('.authorization_sign_div').show();
    //     } else {
    //         this.$('.authorization_sign_div').hide();

    //     }
    // },

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
          }
        activeLink('menu_dic_dnh');
        addClass('subletting', 'active');
        Subletting.router.navigate('subletting');
        var templateData = {};
        this.$el.html(sublettingListTemplate(templateData));
        this.loadSublettingData();

    },
    listPageSublettingForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('subletting', 'active');
        this.$el.html(sublettingListTemplate);
        this.newSublettingForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return sublettingActionTemplate(rowData);
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
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_TWO && rowData.status != VALUE_THREE && rowData.status != VALUE_SIX) {
            rowData.show_download_fees_paid_challan_btn = true;
            rowData.SUBLETTING_DOC_PATH = SUBLETTING_DOC_PATH;
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
        rowData.module_type = VALUE_THIRTEEN;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : 'display: none;';
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        return sublettingActionTemplate(rowData);
    },
    loadSublettingData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(VALUE_THIRTEEN, data);
        };
        var that = this;
        showTableContainer('subletting');
        Subletting.router.navigate('subletting');
        $('#subletting_datatable_container').html(sublettingTableTemplate);

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_subletting_list', false);
        sublettingDataTable = $('#subletting_datatable').DataTable({
            ajax: {url: 'subletting/get_subletting_data', dataSrc: "subletting_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'subletting_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'name_of_applicant', 'class': 'text-center'},
                {data: 'plot_no', 'class': 'text-center'},
                {data: 'name_of_manufacturing', 'class': 'text-center'},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'subletting_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'subletting_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#subletting_datatable_filter').remove();
        $('#subletting_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = sublettingDataTable.row(tr);

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
    newSublettingForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.subletting_data;
            Subletting.router.navigate('edit_subletting_form');
        } else {
            var formData = {};
           Subletting.router.navigate('subletting_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.subletting_data = parseData.subletting_data;
         if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.subletting_data.application_date);
        }
        showFormContainer('subletting');
        $('#subletting_form_container').html(sublettingFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_subletting_data', 'plot_no', 'plot_no', 'Plot No');

        if (isEdit) {
           
            $('#village_for_subletting').val(formData.village);
            $('#state').val(formData.state);
            $('#district').val(formData.district);
            $('#taluka').val(formData.taluka);

             $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_subletting_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_subletting_data').val(formData.plot_no == 0 ? '' : formData.plot_no);

               if (formData.request_letter == IS_CHECKED_YES) {
                $('#request_letter_yes').attr('checked', 'checked');
                $('.request_letter_div').show();
            } else if (formData.request_letter == IS_CHECKED_NO) {
                $('#request_letter_no').attr('checked', 'checked');
            }
            if (formData.original_extract == IS_CHECKED_YES) {
                $('#original_extract_yes').attr('checked', 'checked');
                $('.original_extract_div').show();
            } else if (formData.original_extract == IS_CHECKED_NO) {
                $('#original_extract_no').attr('checked', 'checked');
            }

             if (formData.land_revenue == IS_CHECKED_YES) {
                $('#land_revenue_yes').attr('checked', 'checked');
                $('.land_revenue_div').show();
            } else if (formData.land_revenue == IS_CHECKED_NO) {
                $('#land_revenue_no').attr('checked', 'checked');
            }
             if (formData.electricity_bill == IS_CHECKED_YES) {
                $('#electricity_bill_yes').attr('checked', 'checked');
                $('.electricity_bill_div').show();
            } else if (formData.electricity_bill == IS_CHECKED_NO) {
                $('#electricity_bill_no').attr('checked', 'checked');
            }
             if (formData.bank_loan == IS_CHECKED_YES) {
                $('#bank_loan_yes').attr('checked', 'checked');
                $('.bank_loan_div').show();
            } else if (formData.bank_loan == IS_CHECKED_NO) {
                $('#bank_loan_no').attr('checked', 'checked');
            }
             if (formData.panchayat_tax == IS_CHECKED_YES) {
                $('#panchayat_tax_yes').attr('checked', 'checked');
                $('.panchayat_tax_div').show();
            } else if (formData.panchayat_tax == IS_CHECKED_NO) {
                $('#panchayat_tax_no').attr('checked', 'checked');
            }
             if (formData.challan_of_lease == IS_CHECKED_YES) {
                $('#challan_of_lease_yes').attr('checked', 'checked');
                $('.challan_of_lease_div').show();
            } else if (formData.challan_of_lease == IS_CHECKED_NO) {
                $('#challan_of_lease_no').attr('checked', 'checked');
            }
             if (formData.occupancy == IS_CHECKED_YES) {
                $('#occupancy_yes').attr('checked', 'checked');
                $('.occupancy_div').show();
            } else if (formData.occupancy == IS_CHECKED_NO) {
                $('#occupancy_no').attr('checked', 'checked');
            }
             if (formData.central_excise == IS_CHECKED_YES) {
                $('#central_excise_yes').attr('checked', 'checked');
                $('.central_excise_div').show();
            } else if (formData.central_excise == IS_CHECKED_NO) {
                $('#central_excise_no').attr('checked', 'checked');
            }
             if (formData.authorization_sign == IS_CHECKED_YES) {
                $('#authorization_sign_yes').attr('checked', 'checked');
                $('.authorization_sign_div').show();
            } else if (formData.authorization_sign == IS_CHECKED_NO) {
                $('#authorization_sign_no').attr('checked', 'checked');
            }



             if (formData.request_letter_premises != '') {
                $('#request_letter_premises_container_for_subletting').hide();
                $('#request_letter_premises_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.request_letter_premises);
                $('#request_letter_premises_name_container_for_subletting').show();
                $('#request_letter_premises_download').attr("href", SUBLETTING_DOC_PATH + formData.request_letter_premises);
            }
             if (formData.original_extract_certificate != '') {
                $('#original_extract_certificate_container_for_subletting').hide();
                $('#original_extract_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.original_extract_certificate);
                $('#original_extract_certificate_name_container_for_subletting').show();
                $('#original_extract_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.original_extract_certificate);
            }
            if (formData.land_revenue_certificate != '') {
                $('#land_revenue_certificate_container_for_subletting').hide();
                $('#land_revenue_certificate_name_image_for_subletting').attr('src',SUBLETTING_DOC_PATH + formData.land_revenue_certificate);
                $('#land_revenue_certificate_name_container_for_subletting').show();
                $('#land_revenue_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.land_revenue_certificate);
            }
            if (formData.electricity_bill_certificate != '') {
                $('#electricity_bill_certificate_container_for_subletting').hide();
                $('#electricity_bill_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.electricity_bill_certificate);
                $('#electricity_bill_certificate_name_container_for_subletting').show();
                $('#electricity_bill_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.electricity_bill_certificate);
            }
            if (formData.bank_loan_certificate != '') {
                $('#bank_loan_certificate_container_for_subletting').hide();
                $('#bank_loan_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.bank_loan_certificate);
                $('#bank_loan_certificate_name_container_for_subletting').show();
                $('#bank_loan_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.bank_loan_certificate);
            }
            if (formData.panchayat_tax_certificate != '') {
                $('#panchayat_tax_certificate_container_for_subletting').hide();
                $('#panchayat_tax_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.panchayat_tax_certificate);
                $('#panchayat_tax_certificate_name_container_for_subletting').show();
                $('#panchayat_tax_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.panchayat_tax_certificate);
            }
            if (formData.challan_of_lease_rent != '') {
                $('#challan_of_lease_rent_container_for_subletting').hide();
                $('#challan_of_lease_rent_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.challan_of_lease_rent);
                $('#challan_of_lease_rent_name_container_for_subletting').show();
                $('#challan_of_lease_rent_download').attr("href", SUBLETTING_DOC_PATH + formData.challan_of_lease_rent);
            }
             if (formData.occupancy_certificate != '') {
                $('#occupancy_certificate_container_for_subletting').hide();
                $('#occupancy_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.occupancy_certificate);
                $('#occupancy_certificate_name_container_for_subletting').show();
                $('#occupancy_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.occupancy_certificate);
            }
            if (formData.central_excise_certificate != '') {
                $('#central_excise_certificate_container_for_subletting').hide();
                $('#central_excise_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.central_excise_certificate);
                $('#central_excise_certificate_name_container_for_subletting').show();
                $('#central_excise_certificate_download').attr("href",SUBLETTING_DOC_PATH + formData.central_excise_certificate);
            }
            if (formData.authorization_sign_lessee != '') {
                $('#authorization_sign_lessee_container_for_subletting').hide();
                $('#authorization_sign_lessee_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.authorization_sign_lessee);
                $('#authorization_sign_lessee_name_container_for_subletting').show();
                $('#authorization_sign_lessee_download').attr("href", SUBLETTING_DOC_PATH + formData.authorization_sign_lessee);
            }


            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_subletting').hide();
                $('#seal_and_stamp_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_subletting').show();
                $('#seal_and_stamp_download').attr("href", SUBLETTING_DOC_PATH + formData.signature);
            }
        }

        datePicker();
        $('#subletting_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSubletting($('#submit_btn_for_subletting'));
            }
        });
    },

    editOrViewSubletting: function (btnObj, sublettingId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sublettingId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'subletting/get_subletting_data_by_id',
            type: 'post',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                    that.newSublettingForm(isEdit, parseData);
                } else {
                    that.viewSublettingForm(parseData);
                }
            }
        });
    },

    viewSublettingForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.subletting_data;
        formData.IS_CHECKED_YES = IS_CHECKED_YES;
        formData.IS_CHECKED_NO = IS_CHECKED_NO;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        Subletting.router.navigate('view_subletting_form');
        showFormContainer('subletting');
        $('#subletting_form_container').html(sublettingViewTemplate(formData));
         formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        $('#state').val(formData.state);
        $('#district').val(formData.district);
        $('#taluka').val(formData.taluka);
        // $('#villages_for_noc_data').val(formData.village);
        // $('#plot_no_for_sublessee_data').val(formData.plot_no);

        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'plot_no_for_subletting_data', 'plot_no', 'plot_no', 'Plot No');


           $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, 'plot_no_for_subletting_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_subletting_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


          if (formData.request_letter == IS_CHECKED_YES) {
                $('#request_letter_yes').attr('checked', 'checked');
                $('.request_letter_div').show();
            } else if (formData.request_letter == IS_CHECKED_NO) {
                $('#request_letter_no').attr('checked', 'checked');
            }
            if (formData.original_extract == IS_CHECKED_YES) {
                $('#original_extract_yes').attr('checked', 'checked');
                $('.original_extract_div').show();
            } else if (formData.original_extract == IS_CHECKED_NO) {
                $('#original_extract_no').attr('checked', 'checked');
            }

             if (formData.land_revenue == IS_CHECKED_YES) {
                $('#land_revenue_yes').attr('checked', 'checked');
                $('.land_revenue_div').show();
            } else if (formData.land_revenue == IS_CHECKED_NO) {
                $('#land_revenue_no').attr('checked', 'checked');
            }
             if (formData.electricity_bill == IS_CHECKED_YES) {
                $('#electricity_bill_yes').attr('checked', 'checked');
                $('.electricity_bill_div').show();
            } else if (formData.electricity_bill == IS_CHECKED_NO) {
                $('#electricity_bill_no').attr('checked', 'checked');
            }
             if (formData.bank_loan == IS_CHECKED_YES) {
                $('#bank_loan_yes').attr('checked', 'checked');
                $('.bank_loan_div').show();
            } else if (formData.bank_loan == IS_CHECKED_NO) {
                $('#bank_loan_no').attr('checked', 'checked');
            }
             if (formData.panchayat_tax == IS_CHECKED_YES) {
                $('#panchayat_tax_yes').attr('checked', 'checked');
                $('.panchayat_tax_div').show();
            } else if (formData.panchayat_tax == IS_CHECKED_NO) {
                $('#panchayat_tax_no').attr('checked', 'checked');
            }
             if (formData.challan_of_lease == IS_CHECKED_YES) {
                $('#challan_of_lease_yes').attr('checked', 'checked');
                $('.challan_of_lease_div').show();
            } else if (formData.challan_of_lease == IS_CHECKED_NO) {
                $('#challan_of_lease_no').attr('checked', 'checked');
            }
             if (formData.occupancy == IS_CHECKED_YES) {
                $('#occupancy_yes').attr('checked', 'checked');
                $('.occupancy_div').show();
            } else if (formData.occupancy == IS_CHECKED_NO) {
                $('#occupancy_no').attr('checked', 'checked');
            }
             if (formData.central_excise == IS_CHECKED_YES) {
                $('#central_excise_yes').attr('checked', 'checked');
                $('.central_excise_div').show();
            } else if (formData.central_excise == IS_CHECKED_NO) {
                $('#central_excise_no').attr('checked', 'checked');
            }
             if (formData.authorization_sign == IS_CHECKED_YES) {
                $('#authorization_sign_yes').attr('checked', 'checked');
                $('.authorization_sign_div').show();
            } else if (formData.authorization_sign == IS_CHECKED_NO) {
                $('#authorization_sign_no').attr('checked', 'checked');
            }


             if (formData.request_letter_premises != '') {
                $('#request_letter_premises_container_for_subletting').hide();
                $('#request_letter_premises_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.request_letter_premises);
                $('#request_letter_premises_name_container_for_subletting').show();
                $('#request_letter_premises_download').attr("href", SUBLETTING_DOC_PATH + formData.request_letter_premises);
            }
             
             if (formData.original_extract_certificate != '') {
                $('#original_extract_certificate_container_for_subletting').hide();
                $('#original_extract_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.original_extract_certificate);
                $('#original_extract_certificate_name_container_for_subletting').show();
                $('#original_extract_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.original_extract_certificate);
            }


            if (formData.land_revenue_certificate != '') {
                $('#land_revenue_certificate_container_for_subletting').hide();
                $('#land_revenue_certificate_name_image_for_subletting').attr('src',SUBLETTING_DOC_PATH + formData.land_revenue_certificate);
                $('#land_revenue_certificate_name_container_for_subletting').show();
                $('#land_revenue_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.land_revenue_certificate);
            }
            if (formData.electricity_bill_certificate != '') {
                $('#electricity_bill_certificate_container_for_subletting').hide();
                $('#electricity_bill_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.electricity_bill_certificate);
                $('#electricity_bill_certificate_name_container_for_subletting').show();
                $('#electricity_bill_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.electricity_bill_certificate);
            }
            if (formData.bank_loan_certificate != '') {
                $('#bank_loan_certificate_container_for_subletting').hide();
                $('#bank_loan_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.bank_loan_certificate);
                $('#bank_loan_certificate_name_container_for_subletting').show();
                $('#bank_loan_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.bank_loan_certificate);
            }
            if (formData.panchayat_tax_certificate != '') {
                $('#panchayat_tax_certificate_container_for_subletting').hide();
                $('#panchayat_tax_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.panchayat_tax_certificate);
                $('#panchayat_tax_certificate_name_container_for_subletting').show();
                $('#panchayat_tax_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.panchayat_tax_certificate);
            }
            if (formData.challan_of_lease_rent != '') {
                $('#challan_of_lease_rent_container_for_subletting').hide();
                $('#challan_of_lease_rent_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.challan_of_lease_rent);
                $('#challan_of_lease_rent_name_container_for_subletting').show();
                $('#challan_of_lease_rent_download').attr("href", SUBLETTING_DOC_PATH + formData.challan_of_lease_rent);
            }
             if (formData.occupancy_certificate != '') {
                $('#occupancy_certificate_container_for_subletting').hide();
                $('#occupancy_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.occupancy_certificate);
                $('#occupancy_certificate_name_container_for_subletting').show();
                $('#occupancy_certificate_download').attr("href", SUBLETTING_DOC_PATH + formData.occupancy_certificate);
            }
            if (formData.central_excise_certificate != '') {
                $('#central_excise_certificate_container_for_subletting').hide();
                $('#central_excise_certificate_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.central_excise_certificate);
                $('#central_excise_certificate_name_container_for_subletting').show();
                $('#central_excise_certificate_download').attr("href",SUBLETTING_DOC_PATH + formData.central_excise_certificate);
            }
            if (formData.authorization_sign_lessee != '') {
                $('#authorization_sign_lessee_container_for_subletting').hide();
                $('#authorization_sign_lessee_name_image_for_subletting').attr('src', SUBLETTING_DOC_PATH + formData.authorization_sign_lessee);
                $('#authorization_sign_lessee_name_container_for_subletting').show();
                $('#authorization_sign_lessee_download').attr("href", SUBLETTING_DOC_PATH + formData.authorization_sign_lessee);
            }

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_subletting_view').hide();
                $('#seal_and_stamp_name_image_for_subletting_view').attr('src', SUBLETTING_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_subletting_view').show();
                $('#seal_and_stamp_download').attr("href", SUBLETTING_DOC_PATH + formData.signature);
        }

    },
    checkValidationForSubletting: function (sublettingData) {
         if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
                if (!sublettingData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
         if (!sublettingData.state) {
            return getBasicMessageAndFieldJSONArray('state', stateValidationMessage);
        }
        if (!sublettingData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!sublettingData.taluka) {
            return getBasicMessageAndFieldJSONArray('taluka', talukaValidationMessage);
        }
         if (!sublettingData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data', villageNameValidationMessage);
        }
        // if (!sublettingData.date) {
        //     return getBasicMessageAndFieldJSONArray('date', dateValidationMessage);
        // }
         if (!sublettingData.plot_no_for_subletting_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_subletting_data', plotnoValidationMessage);
        }
        if (!sublettingData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no', surveynoValidationMessage);
        }
         if (!sublettingData.admeasuring) {
            return getBasicMessageAndFieldJSONArray('admeasuring', admeasuringValidationMessage);
        }
        // if (!sublettingData.estate_area) {
        //     return getBasicMessageAndFieldJSONArray('estate_area', govtIndustrialEstateAreaValidationMessage);
        // }
         if (!sublettingData.name_of_manufacturing) {
            return getBasicMessageAndFieldJSONArray('name_of_manufacturing', nameofmanufactringValidationMessage);
        }
          var request_letter = $('input[name=request_letter]:checked').val();
        if (request_letter == '' || request_letter == null) {
            $('#request_letter').focus();
            return getBasicMessageAndFieldJSONArray('request_letter', requestletterpremisesValidationMessage);
        }
         var original_extract = $('input[name=original_extract]:checked').val();
        if (original_extract == '' || original_extract == null) {
            $('#original_extract').focus();
            return getBasicMessageAndFieldJSONArray('original_extract', originalextractValidationMessage);
        }
         var land_revenue = $('input[name=land_revenue]:checked').val();
        if (land_revenue == '' || land_revenue == null) {
            $('#land_revenue').focus();
            return getBasicMessageAndFieldJSONArray('land_revenue', landrevenueValidationMessage);
        }
         var electricity_bill = $('input[name=electricity_bill]:checked').val();
        if (electricity_bill == '' || electricity_bill == null) {
            $('#electricity_bill').focus();
            return getBasicMessageAndFieldJSONArray('electricity_bill', electricitybillValidationMessage);
        }
         var bank_loan = $('input[name=bank_loan]:checked').val();
        if (bank_loan == '' || bank_loan == null) {
            $('#bank_loan').focus();
            return getBasicMessageAndFieldJSONArray('bank_loan', bankloanValidationMessage);
        }
         var panchayat_tax = $('input[name=panchayat_tax]:checked').val();
        if (panchayat_tax == '' || panchayat_tax == null) {
            $('#panchayat_tax').focus();
            return getBasicMessageAndFieldJSONArray('panchayat_tax', panchyattaxValidationMessage);
        }
         var challan_of_lease = $('input[name=challan_of_lease]:checked').val();
        if (challan_of_lease == '' || challan_of_lease == null) {
            $('#challan_of_lease').focus();
            return getBasicMessageAndFieldJSONArray('challan_of_lease', challanofleaserentValidationMessage);
        }
         var occupancy = $('input[name=occupancy]:checked').val();
        if (occupancy == '' || occupancy == null) {
            $('#occupancy').focus();
            return getBasicMessageAndFieldJSONArray('occupancy', occupancyValidationMessage);
        }
         var central_excise = $('input[name=central_excise]:checked').val();
        if (central_excise == '' || central_excise == null) {
            $('#central_excise').focus();
            return getBasicMessageAndFieldJSONArray('central_excise', centralexciseValidationMessage);
        }
         var authorization_sign = $('input[name=authorization_sign]:checked').val();
        if (authorization_sign == '' || authorization_sign == null) {
            $('#authorization_sign').focus();
            return getBasicMessageAndFieldJSONArray('authorization_sign', authorizationsignValidationMessage);
        }
        return '';
    },
    askForSubmitSubletting: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Subletting.listview.submitSubletting(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitSubletting: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var sublettingData = $('#subletting_form').serializeFormJSON();
        var validationData = that.checkValidationForSubletting(sublettingData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('subletting-' + validationData.field, validationData.message);
            return false;
        }


   if (sublettingData.request_letter == isChecked) {
      if ($('#request_letter_premises_container_for_subletting').is(':visible')) {
            var requestLetter = $('#request_letter_premises_for_subletting').val();
            if (requestLetter == '') {
                $('#request_letter_premises_for_subletting').focus();
                validationMessageShow('subletting-request_letter_premises_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var requestLetterMessage = pdffileUploadValidation('request_letter_premises_for_subletting');
            if (requestLetterMessage != '') {
                $('#request_letter_premises_for_subletting').focus();
                validationMessageShow('subletting-request_letter_premises_for_subletting', requestLetterMessage);
                return false;
            }
        }
    }
       if (sublettingData.original_extract == isChecked) {
      if ($('#original_extract_certificate_container_for_subletting').is(':visible')) {
            var originalExtract = $('#original_extract_certificate_for_subletting').val();
            if (originalExtract == '') {
                $('#original_extract_certificate_for_subletting').focus();
                validationMessageShow('subletting-original_extract_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var originalExtractMessage = pdffileUploadValidation('original_extract_certificate_for_subletting');
            if (originalExtractMessage != '') {
                $('#original_extract_certificate_for_subletting').focus();
                validationMessageShow('subletting-original_extract_certificate_for_subletting', originalExtractMessage);
                return false;
            }
        }
    }

        if (sublettingData.land_revenue == isChecked) {
            if ($('#land_revenue_certificate_container_for_subletting').is(':visible')) {
            var landRevenue = $('#land_revenue_certificate_for_subletting').val();
            if (landRevenue == '') {
                $('#land_revenue_certificate_for_subletting').focus();
                validationMessageShow('subletting-land_revenue_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var landRevenueMessage = pdffileUploadValidation('land_revenue_certificate_for_subletting');
            if (landRevenueMessage != '') {
                $('#land_revenue_certificate_for_subletting').focus();
                validationMessageShow('subletting-land_revenue_certificate_for_subletting', landRevenueMessage);
                return false;
            }
        }
    }
         if (sublettingData.electricity_bill == isChecked) {
      if ($('#electricity_bill_certificate_container_for_subletting').is(':visible')) {
            var electricityBill = $('#electricity_bill_certificate_for_subletting').val();
            if (electricityBill == '') {
                $('#electricity_bill_certificate_for_subletting').focus();
                validationMessageShow('subletting-electricity_bill_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var electricityBillMessage = pdffileUploadValidation('electricity_bill_certificate_for_subletting');
            if (electricityBillMessage != '') {
                $('#electricity_bill_certificate_for_subletting').focus();
                validationMessageShow('subletting-electricity_bill_certificate_for_subletting', electricityBillMessage);
                return false;
            }
        }
    }
         if (sublettingData.bank_loan == isChecked) {
      if ($('#bank_loan_certificate_container_for_subletting').is(':visible')) {
            var bankLoan = $('#bank_loan_certificate_for_subletting').val();
            if (bankLoan == '') {
                $('#bank_loan_certificate_for_subletting').focus();
                validationMessageShow('subletting-bank_loan_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var bankLoanMessage = pdffileUploadValidation('bank_loan_certificate_for_subletting');
            if (bankLoanMessage != '') {
                $('#bank_loan_certificate_for_subletting').focus();
                validationMessageShow('subletting-bank_loan_certificate_for_subletting', bankLoanMessage);
                return false;
            }
        }
    }
         if (sublettingData.panchayat_tax == isChecked) {
      if ($('#panchayat_tax_certificate_container_for_subletting').is(':visible')) {
            var panchayatTax = $('#panchayat_tax_certificate_for_subletting').val();
            if (panchayatTax == '') {
                $('#panchayat_tax_certificate_for_subletting').focus();
                validationMessageShow('subletting-panchayat_tax_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var panchayatTaxMessage = pdffileUploadValidation('panchayat_tax_certificate_for_subletting');
            if (panchayatTaxMessage != '') {
                $('#panchayat_tax_certificate_for_subletting').focus();
                validationMessageShow('subletting-panchayat_tax_certificate_for_subletting', panchayatTaxMessage);
                return false;
            }
        }
    }
         if (sublettingData.challan_of_lease == isChecked) {
      if ($('#challan_of_lease_rent_container_for_subletting').is(':visible')) {
            var challanLease = $('#challan_of_lease_rent_for_subletting').val();
            if (challanLease == '') {
                $('#challan_of_lease_rent_for_subletting').focus();
                validationMessageShow('subletting-challan_of_lease_rent_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var challanLeaseMessageMessage = pdffileUploadValidation('challan_of_lease_rent_for_subletting');
            if (challanLeaseMessageMessage != '') {
                $('#challan_of_lease_rent_for_subletting').focus();
                validationMessageShow('subletting-challan_of_lease_rent_for_subletting', challanLeaseMessageMessage);
                return false;
            }
        }
    }
         if (sublettingData.occupancy == isChecked) {
      if ($('#occupancy_certificate_container_for_subletting').is(':visible')) {
            var occupancyCertificate = $('#occupancy_certificate_for_subletting').val();
            if (occupancyCertificate == '') {
                $('#occupancy_certificate_for_subletting').focus();
                validationMessageShow('subletting-occupancy_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var occupancyCertificateMessage = pdffileUploadValidation('occupancy_certificate_for_subletting');
            if (occupancyCertificateMessage != '') {
                $('#occupancy_certificate_for_subletting').focus();
                validationMessageShow('subletting-occupancy_certificate_for_subletting', occupancyCertificateMessage);
                return false;
            }
        }
    }    if (sublettingData.central_excise == isChecked) {
      if ($('#central_excise_certificate_container_for_subletting').is(':visible')) {
            var centralExcise = $('#central_excise_certificate_for_subletting').val();
            if (centralExcise == '') {
                $('#central_excise_certificate_for_subletting').focus();
                validationMessageShow('subletting-central_excise_certificate_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var centralExciseMessage = pdffileUploadValidation('central_excise_certificate_for_subletting');
            if (centralExciseMessage != '') {
                $('#central_excise_certificate_for_subletting').focus();
                validationMessageShow('subletting-central_excise_certificate_for_subletting', centralExciseMessage);
                return false;
            }
        }
    }
         if (sublettingData.authorization_sign == isChecked) {
      if ($('#authorization_sign_lessee_container_for_subletting').is(':visible')) {
            var authorizatioSign = $('#authorization_sign_lessee_for_subletting').val();
            if (authorizatioSign == '') {
                $('#authorization_sign_lessee_for_subletting').focus();
                validationMessageShow('subletting-authorization_sign_lessee_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var authorizatioSignMessage = imagefileUploadValidation('authorization_sign_lessee_for_subletting');
            if (authorizatioSignMessage != '') {
                $('#authorization_sign_lessee_for_subletting').focus();
                validationMessageShow('subletting-authorization_sign_lessee_for_subletting', authorizatioSignMessage);
                return false;
            }
        }
    }
        if ($('#seal_and_stamp_container_for_subletting').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_subletting').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_subletting').focus();
                validationMessageShow('subletting-seal_and_stamp_for_subletting', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_subletting');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_subletting').focus();
                validationMessageShow('subletting-seal_and_stamp_for_subletting', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_subletting') : $('#submit_btn_for_subletting');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var sublettingData = new FormData($('#subletting_form')[0]);
        sublettingData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        sublettingData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'subletting/submit_subletting',
            data: sublettingData,
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
                validationMessageShow('subletting', textStatus.statusText);
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
                    validationMessageShow('subletting', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Subletting.router.navigate('subletting', {'trigger': true});
            }
        });
    },

    askForRemove: function (sublettingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Subletting.listview.removeDocument(\'' + sublettingId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (sublettingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'subletting/remove_document',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                validationMessageShow('subletting', textStatus.statusText);
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
                    validationMessageShow('subletting', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

              if (docType == VALUE_ONE) {
                    $('#request_letter_premises_name_container_for_subletting').hide();
                    $('#request_letter_premises_name_image_for_subletting').attr('src', '');
                    $('#request_letter_premises_container_for_subletting').show();
                    $('#request_letter_premises_for_subletting').val('');
                }
                if (docType == VALUE_TWO) {
                    $('#original_extract_certificate_name_container_for_subletting').hide();
                    $('#original_extract_certificate_name_image_for_subletting').attr('src', '');
                    $('#original_extract_certificate_container_for_subletting').show();
                    $('#original_extract_certificate_for_subletting').val('');
                }
                if (docType == VALUE_THREE) {
                    $('#land_revenue_certificate_name_container_for_subletting').hide();
                    $('#land_revenue_certificate_name_image_for_subletting').attr('src', '');
                    $('#land_revenue_certificate_container_for_subletting').show();
                    $('#land_revenue_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_FOUR) {
                    $('#electricity_bill_certificate_name_container_for_subletting').hide();
                    $('#electricity_bill_certificate_name_image_for_subletting').attr('src', '');
                    $('#electricity_bill_certificate_container_for_subletting').show();
                    $('#electricity_bill_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_FIVE) {
                    $('#bank_loan_certificate_name_container_for_subletting').hide();
                    $('#bank_loan_certificate_name_image_for_subletting').attr('src', '');
                    $('#bank_loan_certificate_container_for_subletting').show();
                    $('#bank_loan_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_SIX) {
                    $('#panchayat_tax_certificate_name_container_for_subletting').hide();
                    $('#panchayat_tax_certificate_name_image_for_subletting').attr('src', '');
                    $('#panchayat_tax_certificate_container_for_subletting').show();
                    $('#panchayat_tax_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_SEVEN) {
                    $('#challan_of_lease_rent_name_container_for_subletting').hide();
                    $('#challan_of_lease_rent_name_image_for_subletting').attr('src', '');
                    $('#challan_of_lease_rent_container_for_subletting').show();
                    $('#challan_of_lease_rent_for_subletting').val('');
                }
                  if (docType == VALUE_EIGHT) {
                    $('#occupancy_certificate_name_container_for_subletting').hide();
                    $('#occupancy_certificate_name_image_for_subletting').attr('src', '');
                    $('#occupancy_certificate_container_for_subletting').show();
                    $('#occupancy_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_NINE) {
                    $('#central_excise_certificate_name_container_for_subletting').hide();
                    $('#central_excise_certificate_name_image_for_subletting').attr('src', '');
                    $('#central_excise_certificate_container_for_subletting').show();
                    $('#central_excise_certificate_for_subletting').val('');
                }
                  if (docType == VALUE_TEN) {
                    $('#authorization_sign_lessee_name_container_for_subletting').hide();
                    $('#authorization_sign_lessee_name_image_for_subletting').attr('src', '');
                    $('#authorization_sign_lessee_container_for_subletting').show();
                    $('#authorization_sign_lessee_for_subletting').val('');
                }
                if (docType == VALUE_ELEVEN) {
                    $('#seal_and_stamp_name_container_for_subletting').hide();
                    $('#seal_and_stamp_name_image_for_subletting').attr('src', '');
                    $('#seal_and_stamp_container_for_subletting').show();
                    $('#seal_and_stamp_for_subletting').val('');
            }
            }
        });
    },
    
    generateForm1: function (sublettingId) {
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#subletting_id_for_subletting_form1').val(sublettingId);
        $('#subletting_form1_pdf_form').submit();
        $('#subletting_id_for_subletting_form1').val('');
    },

    openUploadChallan: function (sublettingId) {
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + sublettingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'subletting/get_subletting_data_by_subletting_id',
            type: 'post',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                var sublettingData = parseData.subletting_data;
                showPopup();
                if (sublettingData.status != VALUE_FOUR && sublettingData.status != VALUE_FIVE && sublettingData.status != VALUE_SIX) {
                    sublettingData.show_remove_upload_btn = true;
                }
                $('#popup_container').html(sublettingUploadChallanTemplate(sublettingData));
                if (sublettingData.challan != '') {
                    $('#challan_container_for_subletting_upload_challan').hide();
                    $('#challan_name_container_for_subletting_upload_challan').show();
                    $('#challan_name_href_for_subletting_upload_challan').attr('href', 'documents/subletting/' + sublettingData.challan);
                    $('#challan_name_for_subletting_upload_challan').html(sublettingData.challan);
                    $('#challan_remove_btn_for_subletting_upload_challan').attr('onclick', 'Subletting.listview.removeChallan("' + sublettingData.subletting_id + '")');
                }
            }
        });
    },
    removeChallan: function (sublettingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'subletting/remove_challan',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                validationMessageShow('subletting-uc', textStatus.statusText);
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
                    validationMessageShow('subletting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-subletting-uc').html(parseData.message);
                removeDocument('challan', 'subletting_upload_challan');
                $('#status_' + sublettingId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-subletting-uc').html('');
        validationMessageHide();
        var sublettingId = $('#subletting_id_for_subletting_upload_challan').val();
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if ($('#challan_container_for_subletting_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_subletting_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_subletting_upload_challan').focus();
                validationMessageShow('subletting-uc-challan_for_subletting_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_subletting_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_subletting_upload_challan').focus();
                validationMessageShow('subletting-uc-challan_for_subletting_upload_challan', challanMessage);
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_subletting_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#subletting_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'subletting/upload_challan',
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
                validationMessageShow('subletting-uc', textStatus.statusText);
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
                    validationMessageShow('subletting-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + sublettingId).html(appStatusArray[VALUE_THREE]);
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (sublettingId) {
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_subletting_' + sublettingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'subletting/get_subletting_data_by_subletting_id',
            type: 'post',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                var sublettingData = parseData.subletting_data;
                showPopup();
                $('#popup_container').html(sublettingApproveTemplate(sublettingData));
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
        var formData = $('#approve_subletting_form').serializeFormJSON();
        if (!formData.subletting_id_for_subletting_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_subletting_approve) {
            $('#registration_number_for_subletting_approve').focus();
            validationMessageShow('subletting-approve-registration_number_for_subletting_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_subletting_approve) {
            $('#valid_upto_for_subletting_approve').focus();
            validationMessageShow('subletting-approve-valid_upto_for_subletting_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_subletting_approve) {
            $('#remarks_for_subletting_approve').focus();
            validationMessageShow('subletting-approve-remarks_for_subletting_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'subletting/approve_application',
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
                validationMessageShow('subletting-approve', textStatus.statusText);
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
                    validationMessageShow('subletting-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.subletting_id_for_subletting_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.subletting_id_for_subletting_approve).remove();
                $('#approve_btn_for_app_' + formData.subletting_id_for_subletting_approve).remove();
            }
        });
    },
    askForRejectApplication: function (sublettingId) {
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_subletting_' + sublettingId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'subletting/get_subletting_data_by_subletting_id',
            type: 'post',
            data: $.extend({}, {'subletting_id': sublettingId}, getTokenData()),
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
                var sublettingData = parseData.subletting_data;
                showPopup();
                $('#popup_container').html(sublettingRejectTemplate(sublettingData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_subletting_form').serializeFormJSON();
        if (!formData.subletting_id_for_subletting_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_subletting_reject) {
            $('#remarks_for_subletting_reject').focus();
            validationMessageShow('subletting-reject-remarks_for_subletting_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'subletting/reject_application',
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
                validationMessageShow('subletting-reject', textStatus.statusText);
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
                    validationMessageShow('subletting-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.subletting_id_for_subletting_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.subletting_id_for_subletting_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.subletting_id_for_subletting_reject).remove();
                $('#reject_btn_for_app_' + formData.subletting_id_for_subletting_reject).remove();
                $('#approve_btn_for_app_' + formData.subletting_id_for_subletting_reject).remove();
            }
        });
    },
    generateCertificate: function (sublettingId) {
        if (!sublettingId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#subletting_id_for_certificate').val(sublettingId);
        $('#subletting_certificate_pdf_form').submit();
        $('#subletting_id_for_certificate').val('');
    },
    getQueryData: function (sublettingId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!sublettingId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTEEN;
        templateData.module_id = sublettingId;
        var btnObj = $('#query_btn_for_subletting_' + sublettingId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTEEN, moduleData.subletting_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_THIRTEEN;
                tmpData.module_id = sublettingId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    }
});
