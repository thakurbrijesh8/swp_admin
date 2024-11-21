var sellerListTemplate = Handlebars.compile($('#seller_list_template').html());
var sellerTableTemplate = Handlebars.compile($('#seller_table_template').html());
var sellerActionTemplate = Handlebars.compile($('#seller_action_template').html());
var sellerFormTemplate = Handlebars.compile($('#seller_form_template').html());
var sellerViewTemplate = Handlebars.compile($('#seller_view_template').html());
var sellerUploadChallanTemplate = Handlebars.compile($('#seller_upload_challan_template').html());
var sellerApproveTemplate = Handlebars.compile($('#seller_approve_template').html());
var sellerRejectTemplate = Handlebars.compile($('#seller_reject_template').html());
var sellerViewPaymentTemplate = Handlebars.compile($('#seller_view_payment_template').html());

var tempPersonCnt = 1;

var Seller = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Seller.Router = Backbone.Router.extend({
    routes: {
        'seller': 'renderList',
        'seller_form': 'renderList',
        'edit_seller_form': 'renderList',
        'view_seller_form': 'renderList',
    },
    renderList: function () {
        Seller.listview.listPage();
    },
    renderListForForm: function () {
        Seller.listview.listPageSellerForm();
    }
});
Seller.listView = Backbone.View.extend({
    el: 'div#main_container',

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
        addClass('seller', 'active');
        Seller.router.navigate('seller');
        var templateData = {};
        this.$el.html(sellerListTemplate(templateData));
        this.loadSellerData();

    },
    listPageSellerForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic_dnh');
        addClass('seller', 'active');
        this.$el.html(sellerListTemplate);
        this.newSellerForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return sellerActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if (tempTypeInSession == TEMP_TYPE_A && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_edit_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
            rowData.show_form_one_btn = true;
        }
        if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN) {
            rowData.show_upload_challan_btn = true;
        }
        if (rowData.status == VALUE_FOUR || rowData.status == VALUE_FIVE || rowData.status == VALUE_SEVEN || rowData.status == VALUE_EIGHT) {
            rowData.show_download_fees_paid_challan_btn = true;
        }
        if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX && rowData.status != VALUE_ELEVEN &&
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
        rowData.module_type = VALUE_EIGHTEEN;
         rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status == VALUE_FIVE) {
            rowData.show_download_certificate_btn = true;
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return sellerActionTemplate(rowData);
    },
    loadSellerData: function () {
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
           return getAppNoWithRating(VALUE_EIGHTEEN, data, full.district, full);
        };
        var that = this;
        showTableContainer('seller');
        Seller.router.navigate('seller');
        $('#seller_datatable_container').html(sellerTableTemplate);

        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_seller_list', false);
        sellerDataTable = $('#seller_datatable').DataTable({
            ajax: {url: 'seller/get_seller_data', dataSrc: "seller_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'seller_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'name_of_applicant', 'class': 'text-center'},
                {data: 'plot_no', 'class': 'text-center'},
                {data: 'transferer_name', 'class': 'text-center'},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'seller_id', 'class': 'v-a-m text-center', 'render': appStatusRenderer},
                {data: 'seller_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#seller_datatable_filter').remove();
        $('#seller_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = sellerDataTable.row(tr);

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
    newSellerForm: function (isEdit, parseData) {
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
            var formData = parseData.seller_data;
            Seller.router.navigate('edit_seller_form');
        } else {
            var formData = {};
            Seller.router.navigate('seller_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.seller_data = parseData.seller_data;
        if (isEdit) {
            templateData.application_date = dateTo_DD_MM_YYYY(templateData.seller_data.application_date);
        } else {
            templateData.application_date = dateTo_DD_MM_YYYY();
        }
        showFormContainer('seller');
        $('#seller_form_container').html(sellerFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(premisesStatusArray, 'premises_status');
        renderOptionsForTwoDimensionalArray(identityChoiceArray, 'identity_choice');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        //renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_seller_data', 'village_name', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], 'plot_no_for_seller_data', 'plot_no', 'plot_no', 'Plot No');
        if (isEdit) {
            $('#state').val(formData.state);
            $('#district').val(formData.district);

            $('#taluka').val(formData.taluka);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
            var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(plotData, 'plot_no_for_seller_data', 'plot_id', 'plot_no', 'Plot No');
            $('#plot_no_for_seller_data').val(formData.plot_no == 0 ? '' : formData.plot_no);

            if (formData.request_letter_reason == IS_CHECKED_YES) {
                $('#request_letter_reason_yes').attr('checked', 'checked');
                $('.request_letter_reason_div').show();
            } else if (formData.request_letter_reason == IS_CHECKED_NO) {
                $('#request_letter_reason_no').attr('checked', 'checked');
            }

            if (formData.original_extract == IS_CHECKED_YES) {
                $('#original_extract_yes').attr('checked', 'checked');
                $('.original_extract_div').show();
            } else if (formData.original_extract == IS_CHECKED_NO) {
                $('#original_extract_no').attr('checked', 'checked');
            }

            if (formData.nodue_from_mamlatdar == IS_CHECKED_YES) {
                $('#nodue_from_mamlatdar_yes').attr('checked', 'checked');
                $('.nodue_from_mamlatdar_div').show();
            } else if (formData.nodue_from_mamlatdar == IS_CHECKED_NO) {
                $('#nodue_from_mamlatdar_no').attr('checked', 'checked');
            }

            if (formData.nodue_from_electricity == IS_CHECKED_YES) {
                $('#nodue_from_electricity_yes').attr('checked', 'checked');
                $('.nodue_from_electricity_div').show();
            } else if (formData.nodue_from_electricity == IS_CHECKED_NO) {
                $('#nodue_from_electricity_no').attr('checked', 'checked');
            }

            if (formData.nodue_from_bank == IS_CHECKED_YES) {
                $('#nodue_from_bank_yes').attr('checked', 'checked');
                $('.nodue_from_bank_div').show();
            } else if (formData.nodue_from_bank == IS_CHECKED_NO) {
                $('#nodue_from_bank_no').attr('checked', 'checked');
            }
            if (formData.nodues_from_grampanchayat == IS_CHECKED_YES) {
                $('#nodues_from_grampanchayat_yes').attr('checked', 'checked');
                $('.nodues_from_grampanchayat_div').show();
            } else if (formData.nodues_from_grampanchayat == IS_CHECKED_NO) {
                $('#nodues_from_grampanchayat_no').attr('checked', 'checked');
            }

            if (formData.challan_of_lease == IS_CHECKED_YES) {
                $('#challan_of_lease_yes').attr('checked', 'checked');
                $('.challan_of_lease_div').show();
            } else if (formData.challan_of_lease == IS_CHECKED_NO) {
                $('#challan_of_lease_no').attr('checked', 'checked');
            }

            if (formData.occupancy_certy == IS_CHECKED_YES) {
                $('#occupancy_certy_yes').attr('checked', 'checked');
                $('.occupancy_certy_div').show();
            } else if (formData.occupancy_certy == IS_CHECKED_NO) {
                $('#occupancy_certy_no').attr('checked', 'checked');
            }

            if (formData.nodue_from_excise == IS_CHECKED_YES) {
                $('#nodue_from_excise_yes').attr('checked', 'checked');
                $('.nodue_from_excise_div').show();
            } else if (formData.nodue_from_excise == IS_CHECKED_NO) {
                $('#nodue_from_excise_no').attr('checked', 'checked');
            }

            if (formData.sign_behalf_lessee == IS_CHECKED_YES) {
                $('#sign_behalf_lessee_yes').attr('checked', 'checked');
                $('.sign_behalf_lessee_div').show();
            } else if (formData.sign_behalf_lessee == IS_CHECKED_NO) {
                $('#sign_behalf_lessee_no').attr('checked', 'checked');
            }


            if (formData.request_letter_reason_doc != '') {
                $('#request_letter_reason_doc_container_for_seller').hide();
                $('#request_letter_reason_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.request_letter_reason_doc);
                $('#request_letter_reason_doc_name_container_for_seller').show();
                $('#request_letter_reason_doc_name_download').attr("href", SELLER_DOC_PATH + formData.request_letter_reason_doc);
            }
            if (formData.original_extract_doc != '') {
                $('#original_extract_doc_container_for_seller').hide();
                $('#original_extract_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.original_extract_doc);
                $('#original_extract_doc_name_container_for_seller').show();
                $('#original_extract_doc_name_download').attr("href", SELLER_DOC_PATH + formData.original_extract_doc);
            }
            if (formData.nodue_from_mamlatdar_doc != '') {
                $('#nodue_from_mamlatdar_doc_container_for_seller').hide();
                $('#nodue_from_mamlatdar_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.nodue_from_mamlatdar_doc);
                $('#nodue_from_mamlatdar_doc_name_container_for_seller').show();
                $('#nodue_from_mamlatdar_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_mamlatdar_doc);
            }
            if (formData.nodue_from_electricity_doc != '') {
                $('#nodue_from_electricity_doc_container_for_seller').hide();
                $('#nodue_from_electricity_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.nodue_from_electricity_doc);
                $('#nodue_from_electricity_doc_name_container_for_seller').show();
                $('#nodue_from_electricity_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_electricity_doc);
            }
            if (formData.nodue_from_bank_doc != '') {
                $('#nodue_from_bank_doc_container_for_seller').hide();
                $('#nodue_from_bank_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.nodue_from_bank_doc);
                $('#nodue_from_bank_doc_name_container_for_seller').show();
                $('#nodue_from_bank_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_bank_doc);
            }
            if (formData.nodues_from_grampanchayat_doc != '') {
                $('#nodues_from_grampanchayat_doc_container_for_seller').hide();
                $('#nodues_from_grampanchayat_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.nodues_from_grampanchayat_doc);
                $('#nodues_from_grampanchayat_doc_name_container_for_seller').show();
                $('#nodues_from_grampanchayat_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodues_from_grampanchayat_doc);
            }
            if (formData.challan_of_lease_doc != '') {
                $('#challan_of_lease_doc_container_for_seller').hide();
                $('#challan_of_lease_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.challan_of_lease_doc);
                $('#challan_of_lease_doc_name_container_for_seller').show();
                $('#challan_of_lease_doc_name_download').attr("href", SELLER_DOC_PATH + formData.challan_of_lease_doc);
            }
            if (formData.occupancy_certy_doc != '') {
                $('#occupancy_certy_doc_container_for_seller').hide();
                $('#occupancy_certy_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.occupancy_certy_doc);
                $('#occupancy_certy_doc_name_container_for_seller').show();
                $('#occupancy_certy_doc_name_download').attr("href", SELLER_DOC_PATH + formData.occupancy_certy_doc);
            }
            if (formData.nodue_from_excise_doc != '') {
                $('#nodue_from_excise_doc_container_for_seller').hide();
                $('#nodue_from_excise_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.nodue_from_excise_doc);
                $('#nodue_from_excise_doc_name_container_for_seller').show();
                $('#nodue_from_excise_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_excise_doc);
            }
            if (formData.sign_behalf_lessee_doc != '') {
                $('#sign_behalf_lessee_doc_container_for_seller').hide();
                $('#sign_behalf_lessee_doc_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.sign_behalf_lessee_doc);
                $('#sign_behalf_lessee_doc_name_container_for_seller').show();
                $('#sign_behalf_lessee_doc_name_download').attr("href", SELLER_DOC_PATH + formData.sign_behalf_lessee_doc);
            }

            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_seller').hide();
                $('#seal_and_stamp_name_image_for_seller').attr('src', SELLER_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_seller').show();
                $('#seal_and_stamp_download').attr("href", SELLER_DOC_PATH + formData.signature);
            }

        }

        datePicker();
        $('#seller_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitSeller($('#submit_btn_for_seller'));
            }
        });
    },
    editOrViewSeller: function (btnObj, sellerId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!sellerId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'seller/get_seller_data_by_id',
            type: 'post',
            data: $.extend({}, {'seller_id': sellerId}, getTokenData()),
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
                    that.newSellerForm(isEdit, parseData);
                } else {
                    that.viewSellerForm(parseData);
                }
            }
        });
    },
    viewSellerForm: function (parseData) {
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
        var formData = parseData.seller_data;
        Seller.router.navigate('view_seller_form');
        formData.establishment_date = dateTo_DD_MM_YYYY(formData.establishment_date);
        formData.registration_date = dateTo_DD_MM_YYYY(formData.registration_date);
        formData.license_application_date = dateTo_DD_MM_YYYY(formData.license_application_date);
        formData.application_date = dateTo_DD_MM_YYYY(formData.application_date);
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('seller');
        $('#seller_form_container').html(sellerViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#state').val(formData.state);
        $('#district').val(formData.district);
        $('#taluka').val(formData.taluka);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        // $('#villages_for_noc_data').val(formData.village);
        // $('#plot_no_for_seller_data').val(formData.plot_no);

        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempVillagesData, 'villages_for_noc_data', 'village_id', 'village_name', 'Village');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'plot_no_for_seller_data', 'plot_no', 'plot_no', 'Plot No');

        $('#villages_for_noc_data').val(formData.village == 0 ? '' : formData.village);
        var plotData = tempPlotData[formData.village] ? tempPlotData[formData.village] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, 'plot_no_for_seller_data', 'plot_id', 'plot_no', 'Plot No');
        $('#plot_no_for_seller_data').val(formData.plot_no == 0 ? '' : formData.plot_no);


        if (formData.request_letter_reason == IS_CHECKED_YES) {
            $('#request_letter_reason_yes').attr('checked', 'checked');
            $('.request_letter_reason_div').show();
        } else if (formData.request_letter_reason == IS_CHECKED_NO) {
            $('#request_letter_reason_no').attr('checked', 'checked');
        }
        if (formData.original_extract == IS_CHECKED_YES) {
            $('#original_extract_yes').attr('checked', 'checked');
            $('.original_extract_div').show();
        } else if (formData.original_extract == IS_CHECKED_NO) {
            $('#original_extract_no').attr('checked', 'checked');
        }

        if (formData.nodue_from_mamlatdar == IS_CHECKED_YES) {
            $('#nodue_from_mamlatdar_yes').attr('checked', 'checked');
            $('.nodue_from_mamlatdar_div').show();
        } else if (formData.nodue_from_mamlatdar == IS_CHECKED_NO) {
            $('#nodue_from_mamlatdar_no').attr('checked', 'checked');
        }

        if (formData.nodue_from_electricity == IS_CHECKED_YES) {
            $('#nodue_from_electricity_yes').attr('checked', 'checked');
            $('.nodue_from_electricity_div').show();
        } else if (formData.nodue_from_electricity == IS_CHECKED_NO) {
            $('#nodue_from_electricity_no').attr('checked', 'checked');
        }

        if (formData.nodue_from_bank == IS_CHECKED_YES) {
            $('#nodue_from_bank_yes').attr('checked', 'checked');
            $('.nodue_from_bank_div').show();
        } else if (formData.nodue_from_bank == IS_CHECKED_NO) {
            $('#nodue_from_bank_no').attr('checked', 'checked');
        }
        if (formData.nodues_from_grampanchayat == IS_CHECKED_YES) {
            $('#nodues_from_grampanchayat_yes').attr('checked', 'checked');
            $('.nodues_from_grampanchayat_div').show();
        } else if (formData.nodues_from_grampanchayat == IS_CHECKED_NO) {
            $('#nodues_from_grampanchayat_no').attr('checked', 'checked');
        }

        if (formData.challan_of_lease == IS_CHECKED_YES) {
            $('#challan_of_lease_yes').attr('checked', 'checked');
            $('.challan_of_lease_div').show();
        } else if (formData.challan_of_lease == IS_CHECKED_NO) {
            $('#challan_of_lease_no').attr('checked', 'checked');
        }

        if (formData.occupancy_certy == IS_CHECKED_YES) {
            $('#occupancy_certy_yes').attr('checked', 'checked');
            $('.occupancy_certy_div').show();
        } else if (formData.occupancy_certy == IS_CHECKED_NO) {
            $('#occupancy_certy_no').attr('checked', 'checked');
        }

        if (formData.nodue_from_excise == IS_CHECKED_YES) {
            $('#nodue_from_excise_yes').attr('checked', 'checked');
            $('.nodue_from_excise_div').show();
        } else if (formData.nodue_from_excise == IS_CHECKED_NO) {
            $('#nodue_from_excise_no').attr('checked', 'checked');
        }

        if (formData.sign_behalf_lessee == IS_CHECKED_YES) {
            $('#sign_behalf_lessee_yes').attr('checked', 'checked');
            $('.sign_behalf_lessee_div').show();
        } else if (formData.sign_behalf_lessee == IS_CHECKED_NO) {
            $('#sign_behalf_lessee_no').attr('checked', 'checked');
        }


        if (formData.request_letter_reason_doc != '') {
            $('#request_letter_reason_doc_container_for_seller_view').hide();
            $('#request_letter_reason_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.request_letter_reason_doc);
            $('#request_letter_reason_doc_name_container_for_seller_view').show();
            $('#request_letter_reason_doc_name_download').attr("href", SELLER_DOC_PATH + formData.request_letter_reason_doc);
        }
        if (formData.original_extract_doc != '') {
            $('#original_extract_doc_container_for_seller_view').hide();
            $('#original_extract_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.original_extract_doc);
            $('#original_extract_doc_name_container_for_seller_view').show();
            $('#original_extract_doc_name_download').attr("href", SELLER_DOC_PATH + formData.original_extract_doc);
        }
        if (formData.nodue_from_mamlatdar_doc != '') {
            $('#nodue_from_mamlatdar_doc_container_for_seller_view').hide();
            $('#nodue_from_mamlatdar_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.nodue_from_mamlatdar_doc);
            $('#nodue_from_mamlatdar_doc_name_container_for_seller_view').show();
            $('#nodue_from_mamlatdar_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_mamlatdar_doc);
        }
        if (formData.nodue_from_electricity_doc != '') {
            $('#nodue_from_electricity_doc_container_for_seller_view').hide();
            $('#nodue_from_electricity_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.nodue_from_electricity_doc);
            $('#nodue_from_electricity_doc_name_container_for_seller_view').show();
            $('#nodue_from_electricity_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_electricity_doc);
        }
        if (formData.nodue_from_bank_doc != '') {
            $('#nodue_from_bank_doc_container_for_seller_view').hide();
            $('#nodue_from_bank_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.nodue_from_bank_doc);
            $('#nodue_from_bank_doc_name_container_for_seller_view').show();
            $('#nodue_from_bank_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_bank_doc);
        }
        if (formData.nodues_from_grampanchayat_doc != '') {
            $('#nodues_from_grampanchayat_doc_container_for_seller_view').hide();
            $('#nodues_from_grampanchayat_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.nodues_from_grampanchayat_doc);
            $('#nodues_from_grampanchayat_doc_name_container_for_seller_view').show();
            $('#nodues_from_grampanchayat_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodues_from_grampanchayat_doc);
        }
        if (formData.challan_of_lease_doc != '') {
            $('#challan_of_lease_doc_container_for_seller_view').hide();
            $('#challan_of_lease_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.challan_of_lease_doc);
            $('#challan_of_lease_doc_name_container_for_seller_view').show();
            $('#challan_of_lease_doc_name_download').attr("href", SELLER_DOC_PATH + formData.challan_of_lease_doc);
        }
        if (formData.occupancy_certy_doc != '') {
            $('#occupancy_certy_doc_container_for_seller_view').hide();
            $('#occupancy_certy_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.occupancy_certy_doc);
            $('#occupancy_certy_doc_name_container_for_seller_view').show();
            $('#occupancy_certy_doc_name_download').attr("href", SELLER_DOC_PATH + formData.occupancy_certy_doc);
        }
        if (formData.nodue_from_excise_doc != '') {
            $('#nodue_from_excise_doc_container_for_seller_view').hide();
            $('#nodue_from_excise_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.nodue_from_excise_doc);
            $('#nodue_from_excise_doc_name_container_for_seller_view').show();
            $('#nodue_from_excise_doc_name_download').attr("href", SELLER_DOC_PATH + formData.nodue_from_excise_doc);
        }
        if (formData.sign_behalf_lessee_doc != '') {
            $('#sign_behalf_lessee_doc_container_for_seller_view').hide();
            $('#sign_behalf_lessee_doc_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.sign_behalf_lessee_doc);
            $('#sign_behalf_lessee_doc_name_container_for_seller_view').show();
            $('#sign_behalf_lessee_doc_name_download').attr("href", SELLER_DOC_PATH + formData.sign_behalf_lessee_doc);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_seller_view').hide();
            $('#seal_and_stamp_name_image_for_seller_view').attr('src', SELLER_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_seller_view').show();
            $('#seal_and_stamp_download').attr("href", SELLER_DOC_PATH + formData.signature);
        }


    },
    checkValidationForSeller: function (sellerData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!sellerData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!sellerData.name_of_applicant) {
            return getBasicMessageAndFieldJSONArray('name_of_applicant', applicantNameValidationMessage);
        }
        if (!sellerData.state) {
            return getBasicMessageAndFieldJSONArray('state', stateValidationMessage);
        }
        if (!sellerData.district) {
            return getBasicMessageAndFieldJSONArray('district', districtValidationMessage);
        }
        if (!sellerData.taluka) {
            return getBasicMessageAndFieldJSONArray('taluka', talukaValidationMessage);
        }
        if (!sellerData.villages_for_noc_data) {
            return getBasicMessageAndFieldJSONArray('villages_for_noc_data', villageNameValidationMessage);
        }

        if (!sellerData.plot_no_for_seller_data) {
            return getBasicMessageAndFieldJSONArray('plot_no_for_seller_data', plotnoValidationMessage);
        }
//        if (!sellerData.govt_industrial_estate_area) {
//            return getBasicMessageAndFieldJSONArray('govt_industrial_estate_area');
//        }
        if (!sellerData.survey_no) {
            return getBasicMessageAndFieldJSONArray('survey_no', surveynoValidationMessage);
        }
        if (!sellerData.admeasuring_square_metre) {
            return getBasicMessageAndFieldJSONArray('admeasuring_square_metre', admeasuringValidationMessage);
        }

        if (!sellerData.reason_of_transfer) {
            return getBasicMessageAndFieldJSONArray('reason_of_transfer', nameofservicingValidationMessage);
        }

        if (!sellerData.transferer_name) {
            return getBasicMessageAndFieldJSONArray('transferer_name', acNumberValidationMessage);
        }
        if (!sellerData.name_of_servicing) {
            return getBasicMessageAndFieldJSONArray('name_of_servicing', banknameValidationMessage);
        }
        if (!sellerData.udyog_aadhar_memo_no) {
            return getBasicMessageAndFieldJSONArray('udyog_aadhar_memo_no', nameofservicingValidationMessage);
        }
        if (!sellerData.pan_no) {
            return getBasicMessageAndFieldJSONArray('pan_no', nameofservicingValidationMessage);
        }

        if (!sellerData.gst_no) {
            return getBasicMessageAndFieldJSONArray('gst_no', nameofservicingValidationMessage);
        }
        if (!sellerData.trans_account_no) {
            return getBasicMessageAndFieldJSONArray('trans_account_no', nameofservicingValidationMessage);
        }
        return '';
    },
    askForSubmitSeller: function (moduleType) {
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
        var yesEvent = 'Seller.listview.submitseller(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitSeller: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var sellerData = $('#seller_form').serializeFormJSON();
        var validationData = that.checkValidationForSeller(sellerData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('seller-' + validationData.field, validationData.message);
            return false;
        }

        if (sellerData.request_letter_reason == isChecked) {
            if ($('#request_letter_reason_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#request_letter_reason_doc_for_seller').val();
                if (reasonform == '') {
                    $('#request_letter_reason_doc_for_seller').focus();
                    validationMessageShow('seller-request_letter_reason_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('request_letter_reason_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#request_letter_reason_doc_for_seller').focus();
                    validationMessageShow('seller-request_letter_reason_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.original_extract == isChecked) {
            if ($('#original_extract_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#original_extract_doc_for_seller').val();
                if (reasonform == '') {
                    $('#original_extract_doc_for_seller').focus();
                    validationMessageShow('seller-original_extract_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('original_extract_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#original_extract_doc_for_seller').focus();
                    validationMessageShow('seller-original_extract_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.nodue_from_mamlatdar == isChecked) {
            if ($('#nodue_from_mamlatdar_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#nodue_from_mamlatdar_doc_for_seller').val();
                if (reasonform == '') {
                    $('#nodue_from_mamlatdar_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_mamlatdar_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('nodue_from_mamlatdar_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#nodue_from_mamlatdar_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_mamlatdar_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.nodue_from_electricity == isChecked) {
            if ($('#nodue_from_electricity_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#nodue_from_electricity_doc_for_seller').val();
                if (reasonform == '') {
                    $('#nodue_from_electricity_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_electricity_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('nodue_from_electricity_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#nodue_from_electricity_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_electricity_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }

        if (sellerData.nodue_from_bank == isChecked) {
            if ($('#nodue_from_bank_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#nodue_from_bank_doc_for_seller').val();
                if (reasonform == '') {
                    $('#nodue_from_bank_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_bank_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('nodue_from_bank_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#nodue_from_bank_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_bank_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.nodues_from_grampanchayat == isChecked) {
            if ($('#nodues_from_grampanchayat_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#nodues_from_grampanchayat_doc_for_seller').val();
                if (reasonform == '') {
                    $('#nodues_from_grampanchayat_doc_for_seller').focus();
                    validationMessageShow('seller-nodues_from_grampanchayat_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('nodues_from_grampanchayat_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#nodues_from_grampanchayat_doc_for_seller').focus();
                    validationMessageShow('seller-nodues_from_grampanchayat_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.challan_of_lease == isChecked) {
            if ($('#challan_of_lease_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#challan_of_lease_doc_for_seller').val();
                if (reasonform == '') {
                    $('#challan_of_lease_doc_for_seller').focus();
                    validationMessageShow('seller-challan_of_lease_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('challan_of_lease_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#challan_of_lease_doc_for_seller').focus();
                    validationMessageShow('seller-challan_of_lease_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.occupancy_certy == isChecked) {
            if ($('#occupancy_certy_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#occupancy_certy_doc_for_seller').val();
                if (reasonform == '') {
                    $('#occupancy_certy_doc_for_seller').focus();
                    validationMessageShow('seller-occupancy_certy_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('occupancy_certy_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#occupancy_certy_doc_for_seller').focus();
                    validationMessageShow('seller-occupancy_certy_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }
        if (sellerData.nodue_from_excise == isChecked) {
            if ($('#nodue_from_excise_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#nodue_from_excise_doc_for_seller').val();
                if (reasonform == '') {
                    $('#nodue_from_excise_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_excise_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('nodue_from_excise_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#nodue_from_excise_doc_for_seller').focus();
                    validationMessageShow('seller-nodue_from_excise_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }

        if (sellerData.sign_behalf_lessee == isChecked) {
            if ($('#sign_behalf_lessee_doc_container_for_seller').is(':visible')) {
                var reasonform = $('#sign_behalf_lessee_doc_for_seller').val();
                if (reasonform == '') {
                    $('#sign_behalf_lessee_doc_for_seller').focus();
                    validationMessageShow('seller-sign_behalf_lessee_doc_for_seller', uploadDocumentValidationMessage);
                    return false;
                }
                var reasonformMessage = pdffileUploadValidation('sign_behalf_lessee_doc_for_seller');
                if (reasonformMessage != '') {
                    $('#sign_behalf_lessee_doc_for_seller').focus();
                    validationMessageShow('seller-sign_behalf_lessee_doc_for_seller', reasonformMessage);
                    return false;
                }
            }
        }


        if ($('#seal_and_stamp_container_for_seller').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_seller').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_seller').focus();
                validationMessageShow('seller-seal_and_stamp_for_seller', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = imagefileUploadValidation('seal_and_stamp_for_seller');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_seller').focus();
                validationMessageShow('seller-seal_and_stamp_for_seller', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_seller') : $('#submit_btn_for_seller');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var sellerData = new FormData($('#seller_form')[0]);
        sellerData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        //sellerData.append("proprietor_data", JSON.stringify(proprietorInfoItem));
        sellerData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'seller/submit_seller',
            data: sellerData,
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
                validationMessageShow('seller', textStatus.statusText);
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
                    validationMessageShow('seller', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Seller.router.navigate('seller', {'trigger': true});
            }
        });
    },

    askForRemove: function (sellerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Seller.listview.removeDocument(\'' + sellerId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (sellerd) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC_DNH) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!sellerd) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'seller/remove_document',
            data: $.extend({}, {'seller_id': sellerd}, getTokenData()),
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
                validationMessageShow('seller', textStatus.statusText);
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
                    validationMessageShow('seller', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_seller').hide();
                $('#seal_and_stamp_name_image_for_seller').attr('src', '');
                $('#seal_and_stamp_container_for_seller').show();
                $('#seal_and_stamp_for_seller').val('');
            }
        });
    },
    // addMultipleProprietor: function (templateData) {
    //     templateData.per_cnt = tempPersonCnt;
    //     $('#proprietor_info_container').append(proprietorInfoTemplate(templateData));
    //     tempPersonCnt++;
    //     resetCounter('display-cnt');
    // },
    // removeProprietorInfo: function (perCnt) {
    //     $('#proprietor_info_' + perCnt).remove();
    //     resetCounter('display-cnt');
    // },
    generateForm1: function (sellerd) {
        if (!sellerd) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#seller_id_for_seller_form1').val(sellerd);
        $('#seller_form1_pdf_form').submit();
        $('#seller_id_for_seller_form1').val('');
    },

    openUploadChallan: function (sellerd) {
        if (!sellerd) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + sellerd);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'seller/get_seller_data_by_seller_id',
            type: 'post',
            data: $.extend({}, {'seller_id': sellerd, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var sellerData = parseData.seller_data;
                showPopup();
//                if (sellerData.status != VALUE_FOUR && sellerData.status != VALUE_FIVE && sellerData.status != VALUE_SIX) {
//                    sellerData.show_remove_upload_btn = true;
//                }
                if (sellerData.payment_type == VALUE_ONE) {
                    sellerData.utitle = 'Challan Copy';
                } else {
                    sellerData.utitle = 'Payment Details';
                }
                sellerData.module_type = VALUE_EIGHTEEN;
                $('#popup_container').html(sellerUploadChallanTemplate(sellerData));
                loadFB(VALUE_EIGHTEEN, parseData.fb_data, sellerData.payment_type, sellerData.show_remove_upload_btn, sellerData.show_dropdown, sellerData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'seller_upload_challan', sellerData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'seller_upload_challan', 'uc', 'radio', '#fb', VALUE_EIGHTEEN);

                if (sellerData.challan != '') {
                    $('#challan_container_for_seller_upload_challan').hide();
                    $('#challan_name_container_for_seller_upload_challan').show();
                    $('#challan_name_href_for_seller_upload_challan').attr('href', 'documents/seller/' + sellerData.challan);
                    $('#challan_name_for_seller_upload_challan').html(sellerData.challan);
                    $('#challan_remove_btn_for_seller_upload_challan').attr('onclick', 'Seller.listview.removeChallan("' + sellerData.seller_id + '")');
                }
            }
        });
    },
    removeChallan: function (sellerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'seller/remove_challan',
            data: $.extend({}, {'seller_id': sellerId}, getTokenData()),
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
                validationMessageShow('seller-uc', textStatus.statusText);
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
                    validationMessageShow('seller-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-seller-uc').html(parseData.message);
                removeDocument('challan', 'seller_upload_challan');
                $('#status_' + sellerId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-seller-uc').html('');
        validationMessageHide();
        var sellerId = $('#seller_id_for_seller_upload_challan').val();
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_seller_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_seller_upload_challan_1').focus();
            validationMessageShow('seller-uc-payment_type_for_seller_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_seller_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_seller_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_seller_upload_challan').focus();
                validationMessageShow('seller-uc-challan_for_seller_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_seller_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_seller_upload_challan').focus();
                validationMessageShow('seller-uc-challan_for_seller_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_EIGHTEEN, 'seller-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_seller_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#seller_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'seller/upload_challan',
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
                validationMessageShow('seller-uc', textStatus.statusText);
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
                    validationMessageShow('seller-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + sellerId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + sellerId).show();
                }
                $('#total_fees_' + sellerId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (sellerId) {
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_seller_' + sellerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'seller/get_seller_data_by_seller_id',
            type: 'post',
            data: $.extend({}, {'seller_id': sellerId}, getTokenData()),
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
                var sellerData = parseData.seller_data;
                showPopup();
                $('#popup_container').html(sellerApproveTemplate(sellerData));
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
        var formData = $('#approve_seller_form').serializeFormJSON();
        if (!formData.seller_id_for_seller_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_seller_approve) {
            $('#registration_number_for_seller_approve').focus();
            validationMessageShow('seller-approve-registration_number_for_seller_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_seller_approve) {
            $('#valid_upto_for_seller_approve').focus();
            validationMessageShow('seller-approve-valid_upto_for_seller_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_seller_approve) {
            $('#remarks_for_seller_approve').focus();
            validationMessageShow('seller-approve-remarks_for_seller_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'seller/approve_application',
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
                validationMessageShow('seller-approve', textStatus.statusText);
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
                    validationMessageShow('seller-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.seller_id_for_seller_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.seller_id_for_seller_approve).remove();
                $('#approve_btn_for_app_' + formData.seller_id_for_seller_approve).remove();
            }
        });
    },
    askForRejectApplication: function (sellerId) {
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_seller_' + sellerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'seller/get_seller_data_by_seller_id',
            type: 'post',
            data: $.extend({}, {'seller_id': sellerId}, getTokenData()),
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
                var sellerData = parseData.seller_data;
                showPopup();
                $('#popup_container').html(sellerRejectTemplate(sellerData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_seller_form').serializeFormJSON();
        if (!formData.seller_id_for_seller_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_seller_reject) {
            $('#remarks_for_seller_reject').focus();
            validationMessageShow('seller-reject-remarks_for_seller_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'seller/reject_application',
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
                validationMessageShow('seller-reject', textStatus.statusText);
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
                    validationMessageShow('seller-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.seller_id_for_seller_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.seller_id_for_seller_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.seller_id_for_seller_reject).remove();
                $('#reject_btn_for_app_' + formData.seller_id_for_seller_reject).remove();
                $('#approve_btn_for_app_' + formData.seller_id_for_seller_reject).remove();
            }
        });
    },
    generateCertificate: function (sellerId) {
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#seller_id_for_certificate').val(sellerId);
        $('#seller_certificate_pdf_form').submit();
        $('#seller_id_for_certificate').val('');
    },
    getQueryData: function (sellerId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!sellerId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_EIGHTEEN;
        templateData.module_id = sellerId;
        var btnObj = $('#query_btn_for_seller_' + sellerId);
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
                tmpData.application_number = regNoRenderer(VALUE_EIGHTEEN, moduleData.seller_id);
                tmpData.applicant_name = moduleData.name_of_applicant;
                tmpData.title = 'Applicant Name';
                tmpData.module_type = VALUE_EIGHTEEN;
                tmpData.module_id = sellerId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (sellerId) {
        if (!sellerId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + sellerId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'seller/get_seller_data_by_seller_id',
            type: 'post',
            data: $.extend({}, {'seller_id': sellerId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var sellerData = parseData.seller_data;
                showPopup();
                if (sellerData.payment_type == VALUE_ONE || sellerData.payment_type == VALUE_THREE) {
                    sellerData.user_payment_type_text = paymentTypeArray[sellerData.payment_type];
                } else {
                    sellerData.user_payment_type_text = userPaymentTypeArray[sellerData.user_payment_type] ? userPaymentTypeArray[sellerData.user_payment_type] : '';
                }
                if (sellerData.payment_type == VALUE_ONE) {
                    sellerData.utitle = 'Fees Paid Challan Copy';
                } else if (sellerData.payment_type == VALUE_TWO && sellerData.user_payment_type == VALUE_ONE) {
                    sellerData.utitle = 'Demand Draft (DD) Copy';
                }
                sellerData.module_type = VALUE_EIGHTEEN;
                $('#popup_container').html(sellerViewPaymentTemplate(sellerData));
                loadFB(VALUE_EIGHTEEN, parseData.fb_data, sellerData.payment_type);
                loadPH(VALUE_EIGHTEEN, sellerData.seller_id, parseData.ph_data);
                if (sellerData.payment_type == VALUE_ONE || (sellerData.payment_type == VALUE_TWO && sellerData.user_payment_type == VALUE_ONE)) {
                    if (sellerData.fees_paid_challan != '') {
                        $('#vp_container_for_seller').show();
                        $('#fees_paid_challan_name_href_for_seller').attr('href', SELLER_DOC_PATH + sellerData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_seller').html(sellerData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
