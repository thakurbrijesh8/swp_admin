var boilerManufactureListTemplate = Handlebars.compile($('#boiler_manufacture_list_template').html());
var boilerManufactureTableTemplate = Handlebars.compile($('#boiler_manufacture_table_template').html());
var boilerManufactureActionTemplate = Handlebars.compile($('#boiler_manufacture_action_template').html());
var boilerManufactureFormTemplate = Handlebars.compile($('#boiler_manufacture_form_template').html());
var boilerManufactureViewTemplate = Handlebars.compile($('#boiler_manufacture_view_template').html());
var technicalPersonnelTemplate = Handlebars.compile($('#technical_personnel_template').html());
var weldersInfoTemplate = Handlebars.compile($('#welders_info_template').html());
var boilerManufactureUploadChallanTemplate = Handlebars.compile($('#boiler_manufacture_upload_challan_template').html());
var boilerManufactureApproveTemplate = Handlebars.compile($('#boiler_manufacture_approve_template').html());
var boilerManufactureRejectTemplate = Handlebars.compile($('#boiler_manufacture_reject_template').html());
var boilerManufactureViewPaymentTemplate = Handlebars.compile($('#boiler_manufacture_view_payment_template').html());

var tempPersoneCnt = 1;
var tempWelderCnt = 1;

var BoilerManufacture = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
BoilerManufacture.Router = Backbone.Router.extend({
    routes: {
        'boilermanufacture': 'renderList',
        'boilermanufacture_form': 'renderListForForm',
        'edit_boilermanufacture_form': 'renderList',
        'view_boilermanufacture_form': 'renderList',
    },
    renderList: function () {
        BoilerManufacture.listview.listPage();
    },
    renderListForForm: function () {
        BoilerManufacture.listview.listPageBoilerManufactureForm();
    }
});
BoilerManufacture.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_instruments_calibrated"]': 'hasInstrumentscalibratedEvent',
        'click input[name="is_internal_quality_control"]': 'hasInternalQualityEvent',
    },
    hasInstrumentscalibratedEvent: function (event) {
        var val = $('input[name=is_instruments_calibrated]:checked').val();
        if (val === '1') {
            this.$('.instruments_calibrate_detail_div').show();
            //addMultiplePrincipleProduct({});
        } else {
            this.$('.instruments_calibrate_detail_div').hide();

        }
    },
    hasInternalQualityEvent: function (event) {
        var val = $('input[name=is_internal_quality_control]:checked').val();
        if (val === '1') {
            this.$('.quality_control_detail_div').show();
            //addMultiplePrincipleProduct({});
        } else {
            this.$('.quality_control_detail_div').hide();

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
        addClass('menu_boiler_manufacture', 'active');
        BoilerManufacture.router.navigate('boilermanufacture');
        var templateData = {};
        this.$el.html(boilerManufactureListTemplate(templateData));
        this.loadBoilerManufactureData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageBoilerManufactureForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_boiler_manufacture', 'active');
        this.$el.html(boilerManufactureListTemplate);
        this.newBoilerManufactureForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return boilerManufactureActionTemplate(rowData);
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
        rowData.status = parseInt(rowData.status);
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
        rowData.module_type = VALUE_THIRTYEIGHT;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        if (tempTypeInSession == TEMP_TYPE_A && (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE)) {
            rowData.show_withdraw_application_btn = true;
        }
        return boilerManufactureActionTemplate(rowData);
    },
    loadBoilerManufactureData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_firm + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.address_of_workshop;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_THIRTYEIGHT, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYEIGHT);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['boiler_manufacture_data'], function (index, objData) {
                json['boiler_manufacture_data'][index]['query_movement_string'] = qmData[objData.boilermanufacture_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.boilermanufacture_id] + '</table>') : '-';
            });
            return json['boiler_manufacture_data'];
        };
        var that = this;
        BoilerManufacture.router.navigate('boilermanufacture');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'BoilerManufacture.listview.loadBoilerManufactureData();');
        $('#boiler_manufacture_form_and_datatable_container').html(boilerManufactureTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_boiler_manufacture_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_boiler_manufacture_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_boiler_manufacture_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_boiler_manufacture_list', false);
        allowOnlyIntegerValue('mobile_number_for_boiler_manufacture_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_boiler_manufacture_list', false);
        $('#district_for_boiler_manufacture_list').val(searchData.search_district);
        $('#status_for_boiler_manufacture_list').val(searchData.search_status);
        $('#app_timing_for_boiler_manufacture_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_boiler_manufacture_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_boiler_manufacture_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_boiler_manufacture_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_boiler_manufacture_list').attr('disabled', 'disabled');
        }
        boilerManufactureDataTable = $('#boiler_manufacture_datatable').DataTable({
            ajax: {url: 'boilermanufacture/get_boiler_manufacture_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'boilermanufacture_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'boilermanufacture_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'boilermanufacture_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'boilermanufacture_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable

        });
        // } 
        $('#boiler_manufacture_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = boilerManufactureDataTable.row(tr);

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
    askForNewBoilerManufactureForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newBoilerManufactureForm(false, {});
    },
    newBoilerManufactureForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;
        var that = this;
        if (isEdit) {
            var formData = parseData.boiler_manufacture_data;
            BoilerManufacture.router.navigate('edit_boilermanufacture_form');
        } else {
            var formData = {};
            BoilerManufacture.router.navigate('boilermanufacture_form');
        }

        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.boilerManufacture_data = parseData.boiler_manufacture_data;


        $('#boiler_manufacture_form_and_datatable_container').html(boilerManufactureFormTemplate((templateData)));

        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);

            if (formData.copy_of_noc != '') {
                $('#copy_of_noc_container_for_manufacturer').hide();
                $('#copy_of_noc_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.copy_of_noc);
                $('#copy_of_noc_name_container_for_manufacturer').show();
                $('#copy_of_noc_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.copy_of_noc);
            }
            if (formData.plan_of_workshop != '') {
                $('#plan_of_workshop_container_for_manufacturer').hide();
                $('#plan_of_workshop_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.plan_of_workshop);
                $('#plan_of_workshop_name_container_for_manufacturer').show();
                $('#plan_of_workshop_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.plan_of_workshop);
            }
            if (formData.occupancy_certificate_copy != '') {
                $('#occupancy_certificate_copy_container_for_manufacturer').hide();
                $('#occupancy_certificate_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.occupancy_certificate_copy);
                $('#occupancy_certificate_copy_name_container_for_manufacturer').show();
                $('#occupancy_certificate_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.occupancy_certificate_copy);
            }
            if (formData.factory_license_copy != '') {
                $('#factory_license_copy_container_for_manufacturer').hide();
                $('#factory_license_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.factory_license_copy);
                $('#factory_license_copy_name_container_for_manufacturer').show();
                $('#factory_license_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.factory_license_copy);
            }
            if (formData.machinery_layout_copy != '') {
                $('#machinery_layout_copy_container_for_manufacturer').hide();
                $('#machinery_layout_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.machinery_layout_copy);
                $('#machinery_layout_copy_name_container_for_manufacturer').show();
                $('#machinery_layout_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.machinery_layout_copy);
            }
            if (formData.qualification_detail != '') {
                $('#qualification_detail_container_for_manufacturer').hide();
                $('#qualification_detail_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.qualification_detail);
                $('#qualification_detail_name_container_for_manufacturer').show();
                $('#qualification_detail_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.qualification_detail);
            }
            if (formData.shop_photograph_copy != '') {
                $('#shop_photograph_copy_container_for_manufacturer').hide();
                $('#shop_photograph_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.shop_photograph_copy);
                $('#shop_photograph_copy_name_container_for_manufacturer').show();
                $('#shop_photograph_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.shop_photograph_copy);
            }
            if (formData.signature_and_seal != '') {
                $('#signature_and_seal_container_for_manufacturer').hide();
                $('#signature_and_seal_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.signature_and_seal);
                $('#signature_and_seal_name_container_for_manufacturer').show();
                $('#signature_and_seal_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.signature_and_seal);
            }

            var technicalPersonInfo = JSON.parse(formData.technical_personnel_info);
            $.each(technicalPersonInfo, function (key, value) {
                that.addMultipleTechnicalPersone(value);
            })

            var weldersInfo = JSON.parse(formData.welders_info);
            $.each(weldersInfo, function (key, value) {
                that.addMultipleweldersdetail(value);
            })
            if (formData.is_internal_quality_control == IS_CHECKED_YES) {
                $('#is_internal_quality_control').attr('checked', 'checked');
                this.$('.quality_control_detail_div').show();
            }
            if (formData.is_instruments_calibrated == IS_CHECKED_YES) {
                $('#is_instruments_calibrated').attr('checked', 'checked');
                this.$('.instruments_calibrate_detail_div').show();
            }
        }

        generateSelect2();
        datePicker();
        $('#boiler_manufacture_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitBoilerManufacture($('#submit_btn_for_boiler_manufacture'));
            }
        });
    },
    editOrViewBoilerManufacture: function (btnObj, boilerManufactureId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!boilerManufactureId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boilermanufacture/get_boiler_manufacture_data_by_id',
            type: 'post',
            data: $.extend({}, {'boilermanufacture_id': boilerManufactureId}, getTokenData()),
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
                // var boilerManufactureData = parseData.boiler_manufacture_data;
                // boilerManufactureData.hydraulically_tested_on = dateTo_DD_MM_YYYY(boilerManufactureData.hydraulically_tested_on);
                if (isEdit) {
                    that.newBoilerManufactureForm(isEdit, parseData);
                } else {
                    that.viewBoilerManufactureForm(parseData);
                }
            }
        });
    },
    viewBoilerManufactureForm: function (parseData) {
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
        //templateData.boilerManufacture_data = boilerManufactureData;
        var formData = parseData.boiler_manufacture_data;
        BoilerManufacture.router.navigate('view_boilermanufacture_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        $('#boiler_manufacture_form_and_datatable_container').html(boilerManufactureViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);

        if (formData.copy_of_noc != '') {
            $('#copy_of_noc_container_for_manufacturer').hide();
            $('#copy_of_noc_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.copy_of_noc);
            $('#copy_of_noc_name_container_for_manufacturer').show();
            $('#copy_of_noc_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.copy_of_noc);
        }
        if (formData.plan_of_workshop != '') {
            $('#plan_of_workshop_container_for_manufacturer').hide();
            $('#plan_of_workshop_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.plan_of_workshop);
            $('#plan_of_workshop_name_container_for_manufacturer').show();
            $('#plan_of_workshop_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.plan_of_workshop);
        }
        if (formData.occupancy_certificate_copy != '') {
            $('#occupancy_certificate_copy_container_for_manufacturer').hide();
            $('#occupancy_certificate_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.occupancy_certificate_copy);
            $('#occupancy_certificate_copy_name_container_for_manufacturer').show();
            $('#occupancy_certificate_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.occupancy_certificate_copy);
        }
        if (formData.factory_license_copy != '') {
            $('#factory_license_copy_container_for_manufacturer').hide();
            $('#factory_license_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.factory_license_copy);
            $('#factory_license_copy_name_container_for_manufacturer').show();
            $('#factory_license_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.factory_license_copy);
        }
        if (formData.machinery_layout_copy != '') {
            $('#machinery_layout_copy_container_for_manufacturer').hide();
            $('#machinery_layout_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.machinery_layout_copy);
            $('#machinery_layout_copy_name_container_for_manufacturer').show();
            $('#machinery_layout_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.machinery_layout_copy);
        }
        if (formData.qualification_detail != '') {
            $('#qualification_detail_container_for_manufacturer').hide();
            $('#qualification_detail_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.qualification_detail);
            $('#qualification_detail_name_container_for_manufacturer').show();
            $('#qualification_detail_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.qualification_detail);
        }
        if (formData.shop_photograph_copy != '') {
            $('#shop_photograph_copy_container_for_manufacturer').hide();
            $('#shop_photograph_copy_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.shop_photograph_copy);
            $('#shop_photograph_copy_name_container_for_manufacturer').show();
            $('#shop_photograph_copy_name_image_for_manufacturer_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.shop_photograph_copy);
        }
        if (formData.signature_and_seal != '') {
            $('#signature_and_seal_container_for_manufacturer').hide();
            $('#signature_and_seal_name_image_for_manufacturer').attr('src', BOILRMENUFACT_DOC_PATH + formData.signature_and_seal);
            $('#signature_and_seal_name_container_for_manufacturer').show();
            $('#signature_and_seal_download').attr("href", BOILRMENUFACT_DOC_PATH + formData.signature_and_seal);
        }


        var technicalPersonInfo = JSON.parse(formData.technical_personnel_info);
        $.each(technicalPersonInfo, function (key, value) {
            that.addMultipleTechnicalPersone(value);
        })

        var weldersInfo = JSON.parse(formData.welders_info);
        $.each(weldersInfo, function (key, value) {
            that.addMultipleweldersdetail(value);
        })
        if (formData.is_internal_quality_control == IS_CHECKED_YES) {
            $('#is_internal_quality_control').attr('checked', 'checked');
            this.$('.quality_control_detail_div').show();
        }
        if (formData.is_instruments_calibrated == IS_CHECKED_YES) {
            $('#is_instruments_calibrated').attr('checked', 'checked');
            this.$('.instruments_calibrate_detail_div').show();
        }

    },
    checkValidationForBoilerManufacture: function (boilerManufactureData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilerManufactureData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!boilerManufactureData.name_of_firm) {
            return getBasicMessageAndFieldJSONArray('name_of_firm', firmNameValidationMessage);
        }
        if (!boilerManufactureData.address_of_workshop) {
            return getBasicMessageAndFieldJSONArray('address_of_workshop', workshopAddressValidationMessage);
        }
        if (!boilerManufactureData.address_of_communication) {
            return getBasicMessageAndFieldJSONArray('address_of_communication', commAddressValidationMessage);
        }
        if (!boilerManufactureData.type_of_jobs) {
            return getBasicMessageAndFieldJSONArray('type_of_jobs', jobTypeValidationMessage);
        }
        if (!boilerManufactureData.tools_and_tackles) {
            return getBasicMessageAndFieldJSONArray('tools_and_tackles', toolsValidationMessage);
        }
        if (!boilerManufactureData.standard_of_work) {
            return getBasicMessageAndFieldJSONArray('standard_of_work', standardWorkValidationMessage);
        }
        if (!boilerManufactureData.controversial_issue) {
            return getBasicMessageAndFieldJSONArray('controversial_issue', controversialIssueValidationMessage);
        }
        if (boilerManufactureData.is_internal_quality_control == isChecked) {
            if (!boilerManufactureData.quality_control_detail) {
                return getBasicMessageAndFieldJSONArray('quality_control_detail', qualityControlValidationMessage);
            }
        }
        if (!boilerManufactureData.power_sanction) {
            return getBasicMessageAndFieldJSONArray('power_sanction', powerSanctionValidationMessage);
        }
        if (!boilerManufactureData.conversant_with_boiler) {
            return getBasicMessageAndFieldJSONArray('conversant_with_boiler', conversantValidationMessage);
        }
        if (boilerManufactureData.is_instruments_calibrated == isChecked) {
            if (!boilerManufactureData.instruments_calibrate_detail) {
                return getBasicMessageAndFieldJSONArray('instruments_calibrate_detail', instrumentCalibrateValidationMessage);
            }
        }
        if (!boilerManufactureData.testing_facility) {
            return getBasicMessageAndFieldJSONArray('testing_facility', testingFacilityValidationMessage);
        }
        if (!boilerManufactureData.recording_system) {
            return getBasicMessageAndFieldJSONArray('recording_system', recordSystemValidationMessage);
        }


        return '';
    },
    askForBoilerManufacture: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'BoilerManufacture.listview.submitBoilerManufacture(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitBoilerManufacture: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var boilerManufactureData = $('#boiler_manufacture_form').serializeFormJSON();
        var validationData = that.checkValidationForBoilerManufacture(boilerManufactureData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('boiler-manufacture-' + validationData.field, validationData.message);
            return false;
        }

        // if (!boilerManufactureData.temp_copy_of_noc) {
        //     if (!$('#copy_of_noc').val()) {
        //         if (imagePdfUploadValidation('copy_of_noc', nocCopyValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!boilerManufactureData.temp_plan_of_workshop) {
        //     if (!$('#plan_of_workshop').val()) {
        //         if (imagePdfUploadValidation('plan_of_workshop', workshopPlanValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }
        // if (!boilerManufactureData.temp_signature_and_seal) {
        //     if (!$('#signature_and_seal').val()) {
        //         if (imagePdfUploadValidation('signature_and_seal', signSealValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }

        var weldersInfoItem = [];
        var technicalPersonnel = [];
        var isweldersInfoValidation = false;
        var isTechnicalPersonnelValidation = false;


        $('.technical_personnel_detail').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var technicalPersonnelInfo = {};
            var supervisorName = $('#supervisor_name_' + cnt).val();
            if (supervisorName == '' || supervisorName == null) {
                $('#supervisor_name_' + cnt).focus();
                validationMessageShow('boiler-manufacture-' + cnt, supervisorNameValidationMessage);
                isTechnicalPersonnelValidation = true;
                return false;
            }
            technicalPersonnelInfo.supervisor_name = supervisorName;

            var qualification = $('#qualification_' + cnt).val();
            if (qualification == '' || qualification == null) {
                $('#qualification_' + cnt).focus();
                validationMessageShow('boiler-manufacture-' + cnt, qualificationValidationMessage);
                isTechnicalPersonnelValidation = true;
                return false;
            }
            technicalPersonnelInfo.qualification = qualification;
            var experience = $('#experience_' + cnt).val();
            if (experience == '' || experience == null) {
                $('#experience_' + cnt).focus();
                validationMessageShow('boiler-manufacture-' + cnt, experienceValidationMessage);
                isTechnicalPersonnelValidation = true;
                return false;
            }
            technicalPersonnelInfo.experience = experience;
            technicalPersonnel.push(technicalPersonnelInfo);
        });

        $('.welders_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var weldersInfo = {};
            var welders_name = $('#welders_name_' + cnt).val();
            if (welders_name == '' || welders_name == null) {
                $('#welders_name_' + cnt).focus();
                validationMessageShow('boiler-manufacture-' + cnt, welderNameValidationMessage);
                isweldersInfoValidation = true;
                return false;
            }
            weldersInfo.welders_name = welders_name;

            var welders_experience = $('#welders_experience_' + cnt).val();
            if (welders_experience == '' || welders_experience == null) {
                $('#welders_experience_' + cnt).focus();
                validationMessageShow('boiler-manufacture-' + cnt, experienceValidationMessage);
                isweldersInfoValidation = true;
                return false;
            }
            weldersInfo.welders_experience = welders_experience;

            //if (!boilerManufactureData.temp_signature_and_seal) {
            // var welders_certificate = $('#welders_certificate_' + cnt).val();
            // if (welders_certificate == '' || welders_certificate == null) {
            //     $('#welders_certificate_' + cnt).focus();
            //     if (imagePdfUploadValidation('signature_and_seal', weldersCertificateValidationMessage, true)) {
            //         isweldersInfoValidation = true;
            //         return false;
            //     }
            // }
            //}
            //weldersInfo.welders_certificate = welders_certificate;
            weldersInfoItem.push(weldersInfo);
        });

        if (isTechnicalPersonnelValidation) {
            return false;
        }
        if (isweldersInfoValidation) {
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_manufacturer') : $('#submit_btn_for_manufacturer');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var boilerManufactureData = new FormData($('#boiler_manufacture_form')[0]);
        boilerManufactureData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        boilerManufactureData.append("welders_data", JSON.stringify(weldersInfoItem));
        boilerManufactureData.append("technical_person_data", JSON.stringify(technicalPersonnel));
        boilerManufactureData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'boilermanufacture/submit_boiler_manufacture',
            data: boilerManufactureData,
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
                validationMessageShow('boilermanufacture', textStatus.statusText);
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
                    validationMessageShow('boilermanufacture', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                BoilerManufacture.router.navigate('boilermanufacture', {'trigger': true});
            }
        });
    },
    viewDocumentFile: function (FileName, boilermanufactureId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/boilermanufactures/' + boilermanufactureId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/boilermanufactures/' + boilermanufactureId + '/' + FileName + ' style=width:150px;height:100px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="BoilerManufacture.listview.askForDeleteforDocumentFile(' + boilermanufactureId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (boilermanufactureId, dbFileNameField, postId, postContainer) {
        if (!boilermanufactureId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'BoilerManufacture.listview.deleteDocumentFile(' + boilermanufactureId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (boilermanufactureId, dbFileNameField, postId, postContainer) {
        if (!boilermanufactureId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'boilermanufacture/delete_upload_file_for_boiler_manufacture',
            type: 'POST',
            data: $.extend({}, {'boilermanufacture_id': boilermanufactureId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
    addMultipleTechnicalPersone: function (templateData) {
        templateData.per_cnt = tempPersoneCnt;
        $('#technical_personnel_info_container').append(technicalPersonnelTemplate(templateData));
        tempPersoneCnt++;
        resetCounter('display-cnt');
    },
    removeTechnicalPersonnel: function (perCnt) {
        $('#technical_personnel_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    addMultipleweldersdetail: function (templateData) {
        templateData.welder_cnt = tempWelderCnt;
        $('#welders_info_container').append(weldersInfoTemplate(templateData));
        tempWelderCnt++;
        resetCounter('display-count');
    },
    removeWeldersInfo: function (welderCnt) {
        $('#welders_info_' + welderCnt).remove();
        resetCounter('display-count');
    },
    generateForm1: function (boilerManufactureId) {
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boilermanufacture_id_for_boilermanufacture_form1').val(boilerManufactureId);
        $('#boilermanufacture_form1_pdf_form').submit();
        $('#boilermanufacture_id_for_boilermanufacture_form1').val('');
    },
    openUploadChallan: function (boilerManufactureId) {
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + boilerManufactureId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boilermanufacture/get_boilermanufacture_data_by_boilermanufacture_id',
            type: 'post',
            data: $.extend({}, {'boilermanufacture_id': boilerManufactureId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var boilerManufactureData = parseData.boilermanufactures_data;
                showPopup();
                if (boilerManufactureData.status != boilerManufactureData && boilerManufactureData.status != VALUE_FIVE && boilerManufactureData.status != VALUE_SIX && boilerManufactureData.status != VALUE_SEVEN && boilerManufactureData.status != VALUE_EIGHT && boilerManufactureData.status != VALUE_ELEVEN) {
                    boilerManufactureData.show_remove_upload_btn = true;
                }
                if (boilerManufactureData.payment_type == VALUE_ONE) {
                    boilerManufactureData.utitle = 'Challan Copy';
                } else {
                    boilerManufactureData.utitle = 'Payment Details';
                }
                boilerManufactureData.module_type = VALUE_THIRTYEIGHT;
                $('#popup_container').html(boilerManufactureUploadChallanTemplate(boilerManufactureData));
                loadFB(VALUE_THIRTYEIGHT, parseData.fb_data, boilerManufactureData.payment_type, boilerManufactureData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'boiler_manufacture_upload_challan', boilerManufactureData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'boiler_manufacture_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYEIGHT);
                if (boilerManufactureData.challan != '') {
                    $('#challan_container_for_boiler_manufacture_upload_challan').hide();
                    $('#challan_name_container_for_boiler_manufacture_upload_challan').show();
                    $('#challan_name_href_for_boiler_manufacture_upload_challan').attr('href', 'documents/boilermanufactures/' + boilerManufactureData.challan);
                    $('#challan_name_for_boiler_manufacture_upload_challan').html(boilerManufactureData.challan);
                    $('#challan_remove_btn_for_boiler_manufacture_upload_challan').attr('onclick', 'BoilerManufacture.listview.removeChallan("' + boilerManufactureData.boilermanufacture_id + '")');
                }
            }
        });
    },
    removeChallan: function (boilerManufactureId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boilermanufacture/remove_challan',
            data: $.extend({}, {'boilermanufacture_id': boilerManufactureId}, getTokenData()),
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
                validationMessageShow('boiler-manufacture-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-manufacture-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-boiler-manufacture-uc').html(parseData.message);
                removeDocument('challan', 'boiler_manufacture_upload_challan');
                $('#status_' + boilerManufactureId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-boiler-manufacture-uc').html('');
        validationMessageHide();
        var boilerManufactureId = $('#boilermanufacture_id_for_boiler_manufacture_upload_challan').val();
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_boiler_manufacture_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_boiler_manufacture_upload_challan_1').focus();
            validationMessageShow('boiler-manufacture-uc-payment_type_for_boiler_manufacture_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_boiler_manufacture_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_boiler_manufacture_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_boiler_manufacture_upload_challan').focus();
                validationMessageShow('boiler-manufacture-uc-challan_for_boiler_manufacture_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_boiler_manufacture_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_boiler_manufacture_upload_challan').focus();
                validationMessageShow('boiler-manufacture-uc-challan_for_boiler_manufacture_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYEIGHT, 'boiler-manufacture-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_boiler_manufacture_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#boiler_manufacture_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'boilermanufacture/upload_challan',
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
                validationMessageShow('boiler-manufacture-uc', textStatus.statusText);
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
                    validationMessageShow('boiler-manufacture-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + boilerManufactureId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + boilerManufactureId).show();
                }
                $('#total_fees_' + boilerManufactureId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (boilerManufactureId) {
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_boiler_manufacture_' + boilerManufactureId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boilermanufacture/get_boilermanufacture_data_by_boilermanufacture_id',
            type: 'post',
            data: $.extend({}, {'boilermanufacture_id': boilerManufactureId}, getTokenData()),
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
                var boilerManufactureData = parseData.boilermanufactures_data;
                showPopup();
                $('#popup_container').html(boilerManufactureApproveTemplate(boilerManufactureData));
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
        var formData = $('#approve_boiler_manufacture_form').serializeFormJSON();
        if (!formData.boiler_manufacture_id_for_boiler_manufacture_approve) {
            alert('ok');
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_boiler_manufacture_approve) {
            $('#registration_number_for_boiler_manufacture_approve').focus();
            validationMessageShow('boiler-manufacture-approve-registration_number_for_boiler_manufacture_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_boiler_manufacture_approve) {
            $('#valid_upto_for_boiler_manufacture_approve').focus();
            validationMessageShow('boiler-manufacture-approve-valid_upto_for_boiler_manufacture_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_manufacture_approve) {
            $('#remarks_for_boiler_manufacture_approve').focus();
            validationMessageShow('boiler-manufacture-approve-remarks_for_boiler_manufacture_approve', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boilermanufacture/approve_application',
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
                validationMessageShow('boiler-manufacture-approve', textStatus.statusText);
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
                    validationMessageShow('boiler-manufacture-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boiler_manufacture_id_for_boiler_manufacture_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_boiler_manufacture_' + formData.boiler_manufacture_id_for_boiler_manufacture_approve).remove();
                $('#approve_btn_for_app_' + formData.boiler_manufacture_id_for_boiler_manufacture_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.boiler_manufacture_id_for_boiler_manufacture_approve).show();
                $('#so_status_' + formData.boiler_manufacture_id_for_boiler_manufacture_approve).html(dateTimeDays(formData.boiler_manufacture_id_for_boiler_manufacture_approve, parseData, VALUE_THIRTYEIGHT));
            }
        });
    },
    askForRejectApplication: function (boilerManufactureId) {
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_boiler_manufacture_' + boilerManufactureId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boilermanufacture/get_boilermanufacture_data_by_boilermanufacture_id',
            type: 'post',
            data: $.extend({}, {'boilermanufacture_id': boilerManufactureId}, getTokenData()),
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
                var boilerManufactureData = parseData.boilermanufactures_data;
                // console.log(parseData.boiler_manufacture_data);
                showPopup();
                $('#popup_container').html(boilerManufactureRejectTemplate(boilerManufactureData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_boiler_manufacture_form').serializeFormJSON();
        if (!formData.boiler_manufacture_id_for_boiler_manufacture_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_boiler_manufacture_reject) {
            $('#remarks_for_boiler_manufacture_reject').focus();
            validationMessageShow('boiler-manufacture-reject-remarks_for_boiler_manufacture_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'boilermanufacture/reject_application',
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
                validationMessageShow('boiler-manufacture-reject', textStatus.statusText);
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
                    validationMessageShow('boiler-manufacture-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).remove();
                $('#reject_btn_for_boiler_manufacture_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).remove();
                $('#approve_btn_for_app_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).remove();
                $('#so_status_' + formData.boiler_manufacture_id_for_boiler_manufacture_reject).html(dateTimeDays(formData.boiler_manufacture_id_for_boiler_manufacture_reject, parseData, VALUE_THIRTYEIGHT));
            }
        });
    },
    generateCertificate: function (boilerManufactureId) {
        if (!boilerManufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#boilermanufacture_id_for_certificate').val(boilerManufactureId);
        $('#boilermanufacture_certificate_pdf_form').submit();
        $('#boilermanufacture_id_for_certificate').val('');
    },
    getQueryData: function (boilermanufactureId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!boilermanufactureId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYEIGHT;
        templateData.module_id = boilermanufactureId;
        var btnObj = $('#query_btn_for_app_' + boilermanufactureId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYEIGHT, moduleData.boilermanufacture_id);
                tmpData.applicant_name = moduleData.name_of_firm;
                tmpData.title = 'Firm Name';
                tmpData.module_type = VALUE_THIRTYEIGHT;
                tmpData.module_id = boilermanufactureId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (boilermanufactureId) {
        if (!boilermanufactureId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + boilermanufactureId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'boilermanufacture/get_boilermanufacture_data_by_boilermanufacture_id',
            type: 'post',
            data: $.extend({}, {'boilermanufacture_id': boilermanufactureId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var boilerManufacturereData = parseData.boilermanufactures_data;
                showPopup();
                if (boilerManufacturereData.payment_type == VALUE_ONE || boilerManufacturereData.payment_type == VALUE_THREE) {
                    boilerManufacturereData.user_payment_type_text = paymentTypeArray[boilerManufacturereData.payment_type];
                } else {
                    boilerManufacturereData.user_payment_type_text = userPaymentTypeArray[boilerManufacturereData.user_payment_type] ? userPaymentTypeArray[boilerManufacturereData.user_payment_type] : '';
                }
                if (boilerManufacturereData.payment_type == VALUE_ONE) {
                    boilerManufacturereData.utitle = 'Fees Paid Challan Copy';
                } else if (boilerManufacturereData.payment_type == VALUE_TWO && boilerManufacturereData.user_payment_type == VALUE_ONE) {
                    boilerManufacturereData.utitle = 'Demand Draft (DD) Copy';
                }
                boilerManufacturereData.module_type = VALUE_THIRTYEIGHT;
                $('#popup_container').html(boilerManufactureViewPaymentTemplate(boilerManufacturereData));
                loadFB(VALUE_THIRTYEIGHT, parseData.fb_data, boilerManufacturereData.payment_type);
                loadPH(VALUE_THIRTYEIGHT, boilerManufacturereData.boilermanufacture_id, parseData.ph_data);
                if (boilerManufacturereData.payment_type == VALUE_ONE || (boilerManufacturereData.payment_type == VALUE_TWO && boilerManufacturereData.user_payment_type == VALUE_ONE)) {
                    if (boilerManufacturereData.fees_paid_challan != '') {
                        $('#vp_container_for_boiler_manufacturer').show();
                        $('#fees_paid_challan_name_href_for_boiler_manufacturer').attr('href', BOILRMENUFACT_DOC_PATH + boilerManufacturereData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_boiler_manufacturer').html(boilerManufacturereData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
