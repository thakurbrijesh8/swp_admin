var hotelregiListTemplate = Handlebars.compile($('#hotelregi_list_template').html());
var hotelregiTableTemplate = Handlebars.compile($('#hotelregi_table_template').html());
var hotelregiActionTemplate = Handlebars.compile($('#hotelregi_action_template').html());
var hotelregiFormTemplate = Handlebars.compile($('#hotelregi_form_template').html());
var hotelregiViewTemplate = Handlebars.compile($('#hotelregi_view_template').html());
var hotelregiUploadChallanTemplate = Handlebars.compile($('#hotelregi_upload_challan_template').html());
var hotelregiApproveTemplate = Handlebars.compile($('#hotelregi_approve_template').html());
var hotelregiRejectTemplate = Handlebars.compile($('#hotelregi_reject_template').html());
var hotelregiAgentInfoTemplate = Handlebars.compile($('#hotelregi_agent_info_template').html());
var hotelregiViewPaymentTemplate = Handlebars.compile($('#hotelregi_view_payment_template').html());

var tempAgentInfoCnt = 1;

var Hotelregi = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Hotelregi.Router = Backbone.Router.extend({
    routes: {
        'hotelregi': 'renderList',
        'hotelregi_form': 'renderListForForm',
        'edit_hotelregi_form': 'renderList',
        'view_hotelregi_form': 'renderList',
    },
    renderList: function () {
        Hotelregi.listview.listPage();
    },
    renderListForForm: function () {
        Hotelregi.listview.listPageHotelregiForm();
    }
});
Hotelregi.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="hotel_rented_or_leased"]': 'hasCaseOfLeased',
    },
    hasCaseOfLeased: function (event) {
        var val = $('input[name=hotel_rented_or_leased]:checked').val();
        if (val == VALUE_TWO) {
            this.$('.leased_date').show();
        } else {
            this.$('.leased_date').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        addClass('hotelregi', 'active');
        Hotelregi.router.navigate('hotelregi');
        var templateData = {};
        this.$el.html(hotelregiListTemplate(templateData));
        this.loadHotelregiData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageHotelregiForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_tourism');
        this.$el.html(hotelregiListTemplate);
        this.newHotelregiForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return hotelregiActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
        if ((tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_TOURISM) && rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX) {
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
        rowData.module_type = VALUE_SIX;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return hotelregiActionTemplate(rowData);
    },
    loadHotelregiData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var appDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_hotel + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.category_of_hotel;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_SIX, data, full.name_of_tourist_area, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_SIX);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['hotelregi_data'], function (index, objData) {
                json['hotelregi_data'][index]['query_movement_string'] = qmData[objData.hotelregi_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.hotelregi_id] + '</table>') : '-';
            });
            return json['hotelregi_data'];
        };
        var that = this;
        showTableContainer('hotelregi');
        Hotelregi.router.navigate('hotelregi');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Hotelregi.listview.loadHotelregiData();');
        $('#hotelregi_datatable_container').html(hotelregiTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_hotelregi_list', false);
        allowOnlyIntegerValue('mobile_number_for_hotelregi_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_hotelregi_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_hotelregi_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_hotelregi_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_hotelregi_list', false);
        $('#district_for_hotelregi_list').val(searchData.search_district);
        $('#status_for_hotelregi_list').val(searchData.search_status);
        $('#app_timing_for_hotelregi_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_hotelregi_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_hotelregi_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_hotelregi_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_hotelregi_list').attr('disabled', 'disabled');
        }
        hotelregiDataTable = $('#hotelregi_datatable').DataTable({
            ajax: {url: 'hotelregi/get_hotelregi_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'hotelregi_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'hotelregi_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'hotelregi_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'hotelregi_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //  } 
        $('#hotelregi_datatable_filter').remove();
        $('#hotelregi_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = hotelregiDataTable.row(tr);

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
    newHotelregiForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.hotelregi_data;
            Hotelregi.router.navigate('edit_hotelregi_form');
        } else {
            var formData = {};
            Hotelregi.router.navigate('hotelregi_form');
        }
        var templateData = {};
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.IS_CHECKED_YES = IS_CHECKED_YES;
        templateData.IS_CHECKED_NO = IS_CHECKED_NO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.hotelregi_data = parseData.hotelregi_data;

        showFormContainer('hotelregi');
        $('#hotelregi_form_container').html(hotelregiFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'name_of_tourist_area');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#category_of_hotel').val(formData.category_of_hotel);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            that.getFees(category_of_hotel);
            $('#name_of_tourist_area').val(formData.name_of_tourist_area);
            if (formData.permanent_resident_of_ut == IS_CHECKED_YES) {
                $('#permanent_resident_of_ut_yes').attr('checked', 'checked');
            } else if (formData.permanent_resident_of_ut == IS_CHECKED_NO) {
                $('#permanent_resident_of_ut_no').attr('checked', 'checked');
            }

            if (formData.other_business_of_applicant == IS_CHECKED_YES) {
                $('#other_business_of_applicant_yes').attr('checked', 'checked');
            } else if (formData.other_business_of_applicant == IS_CHECKED_NO) {
                $('#other_business_of_applicant_no').attr('checked', 'checked');
            }

            if (formData.hotel_rented_or_leased == VALUE_ONE) {
                $('#hotel_rented').attr('checked', 'checked');
            }
            if (formData.hotel_rented_or_leased == VALUE_TWO) {
                $('#hotel_leased').attr('checked', 'checked');
                formData.leased_date = dateTo_DD_MM_YYYY(formData.leased_date);
                $('.leased_date').show();
            }

            if (formData.site_plan != '') {
                $('#site_plan_container_for_hotelregi').hide();
                $('#site_plan_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.site_plan);
                $('#site_plan_name_container_for_hotelregi').show();
                $('#site_plan_download').attr("href", HOTELREGI_DOC_PATH + formData.site_plan);
            }
            if (formData.construction_plan != '') {
                $('#construction_plan_container_for_hotelregi').hide();
                $('#construction_plan_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.construction_plan);
                $('#construction_plan_name_container_for_hotelregi').show();
                $('#construction_plan_download').attr("href", HOTELREGI_DOC_PATH + formData.construction_plan);
            }
            if (formData.occupancy_certificate != '') {
                $('#occupancy_certificate_container_for_hotelregi').hide();
                $('#occupancy_certificate_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.occupancy_certificate);
                $('#occupancy_certificate_name_container_for_hotelregi').show();
                $('#occupancy_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.occupancy_certificate);
            }
            if (formData.noc_medical != '') {
                $('#noc_medical_container_for_hotelregi').hide();
                $('#noc_medical_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_medical);
                $('#noc_medical_name_container_for_hotelregi').show();
                $('#noc_medical_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_medical);
            }
            if (formData.noc_concerned != '') {
                $('#noc_concerned_container_for_hotelregi').hide();
                $('#noc_concerned_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_concerned);
                $('#noc_concerned_name_container_for_hotelregi').show();
                $('#noc_concerned_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_concerned);
            }
            if (formData.noc_electricity != '') {
                $('#noc_electricity_container_for_hotelregi').hide();
                $('#noc_electricity_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_electricity);
                $('#noc_electricity_name_container_for_hotelregi').show();
                $('#noc_electricity_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_electricity);
            }
            if (formData.aadhar_card_homestay != '') {
                $('#aadhar_card_container_for_homestay').hide();
                $('#aadhar_card_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.aadhar_card_homestay);
                $('#aadhar_card_name_container_for_homestay').show();
                $('#aadhar_card_download').attr("href", HOTELREGI_DOC_PATH + formData.aadhar_card_homestay);
            }
            if (formData.form_xiv_homestay != '') {
                $('#form_xiv_container_for_homestay').hide();
                $('#form_xiv_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.form_xiv_homestay);
                $('#form_xiv_name_container_for_homestay').show();
                $('#form_xiv_download').attr("href", HOTELREGI_DOC_PATH + formData.form_xiv_homestay);
            }
            if (formData.site_plan_homestay != '') {
                $('#site_plan_container_for_homestay').hide();
                $('#site_plan_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.site_plan_homestay);
                $('#site_plan_name_container_for_homestay').show();
                $('#site_plan_homestay_download').attr("href", HOTELREGI_DOC_PATH + formData.site_plan_homestay);
            }
            if (formData.na_order_homestay != '') {
                $('#na_order_container_for_homestay').hide();
                $('#na_order_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.na_order_homestay);
                $('#na_order_name_container_for_homestay').show();
                $('#na_order_download').attr("href", HOTELREGI_DOC_PATH + formData.na_order_homestay);
            }
            if (formData.completion_certificate_homestay != '') {
                $('#completion_certificate_container_for_homestay').hide();
                $('#completion_certificate_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.completion_certificate_homestay);
                $('#completion_certificate_name_container_for_homestay').show();
                $('#completion_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.completion_certificate_homestay);
            }
            if (formData.house_tax_receipt_homestay != '') {
                $('#house_tax_receipt_container_for_homestay').hide();
                $('#house_tax_receipt_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.house_tax_receipt_homestay);
                $('#house_tax_receipt_name_container_for_homestay').show();
                $('#house_tax_receipt_download').attr("href", HOTELREGI_DOC_PATH + formData.house_tax_receipt_homestay);
            }
            if (formData.electricity_bill_homestay != '') {
                $('#electricity_bill_container_for_homestay').hide();
                $('#electricity_bill_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.electricity_bill_homestay);
                $('#electricity_bill_name_container_for_homestay').show();
                $('#electricity_bill_download').attr("href", HOTELREGI_DOC_PATH + formData.electricity_bill_homestay);
            }
            if (formData.noc_fire != '') {
                $('#noc_fire_container_for_hotelregi').hide();
                $('#noc_fire_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_fire);
                $('#noc_fire_name_container_for_hotelregi').show();
                $('#noc_fire_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_fire);
            }
            if (formData.police_clearance_certificate != '') {
                $('#police_clearance_certificate_container_for_hotelregi').hide();
                $('#police_clearance_certificate_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.police_clearance_certificate);
                $('#police_clearance_certificate_name_container_for_hotelregi').show();
                $('#police_clearance_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.police_clearance_certificate);
            }
            if (formData.signature != '') {
                $('#seal_and_stamp_container_for_hotelregi').hide();
                $('#seal_and_stamp_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.signature);
                $('#seal_and_stamp_name_container_for_hotelregi').show();
                $('#seal_and_stamp_download').attr("href", HOTELREGI_DOC_PATH + formData.signature);
            }

            var agentInfo = JSON.parse(formData.name_of_agent);
            $.each(agentInfo, function (key, value) {
                that.addMultipleAgent(value);
            })
        } else {
            that.addMultipleAgent({});
        }
        generateSelect2();
        datePicker();
        $('#hotelregi_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitHotelregi($('#submit_btn_for_hotelregi'));
            }
        });
    },
    editOrViewHotelregi: function (btnObj, hotelregiId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!hotelregiId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotelregi/get_hotelregi_data_by_id',
            type: 'post',
            data: $.extend({}, {'hotelregi_id': hotelregiId}, getTokenData()),
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
                    that.newHotelregiForm(isEdit, parseData);
                } else {
                    that.viewHotelregiForm(parseData);
                }
            }
        });
    },
    viewHotelregiForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var formData = parseData.hotelregi_data;
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        Hotelregi.router.navigate('view_hotelregi_form');
        showFormContainer('hotelregi');
        $('#hotelregi_form_container').html(hotelregiViewTemplate(formData));
        //$('#hotelregi_form_and_datatable_container').html(hotelregiViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'name_of_tourist_area');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#category_of_hotel').val(formData.category_of_hotel);
        $('#entity_establishment_type').val(formData.entity_establishment_type);
        that.getFees(category_of_hotel);
        $('#name_of_tourist_area').val(formData.name_of_tourist_area);
        if (formData.permanent_resident_of_ut == IS_CHECKED_YES) {
            $('#permanent_resident_of_ut_yes').attr('checked', 'checked');
        } else if (formData.permanent_resident_of_ut == IS_CHECKED_NO) {
            $('#permanent_resident_of_ut_no').attr('checked', 'checked');
        }

        if (formData.other_business_of_applicant == IS_CHECKED_YES) {
            $('#other_business_of_applicant_yes').attr('checked', 'checked');
        } else if (formData.other_business_of_applicant == IS_CHECKED_NO) {
            $('#other_business_of_applicant_no').attr('checked', 'checked');
        }

        if (formData.hotel_rented_or_leased == VALUE_ONE) {
            $('#hotel_rented').attr('checked', 'checked');
        }
        if (formData.hotel_rented_or_leased == VALUE_TWO) {
            $('#hotel_leased').attr('checked', 'checked');
            formData.leased_date = dateTo_DD_MM_YYYY(formData.leased_date);
            $('.leased_date').show();
        }

        if (formData.site_plan != '') {
            $('#site_plan_container_for_hotelregi').hide();
            $('#site_plan_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.site_plan);
            $('#site_plan_name_container_for_hotelregi').show();
            $('#site_plan_download').attr("href", HOTELREGI_DOC_PATH + formData.site_plan);
        }
        if (formData.construction_plan != '') {
            $('#construction_plan_container_for_hotelregi').hide();
            $('#construction_plan_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.construction_plan);
            $('#construction_plan_name_container_for_hotelregi').show();
            $('#construction_plan_download').attr("href", HOTELREGI_DOC_PATH + formData.construction_plan);
        }
        if (formData.occupancy_certificate != '') {
            $('#occupancy_certificate_container_for_hotelregi').hide();
            $('#occupancy_certificate_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.occupancy_certificate);
            $('#occupancy_certificate_name_container_for_hotelregi').show();
            $('#occupancy_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.occupancy_certificate);
        }
        if (formData.noc_medical != '') {
            $('#noc_medical_container_for_hotelregi').hide();
            $('#noc_medical_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_medical);
            $('#noc_medical_name_container_for_hotelregi').show();
            $('#noc_medical_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_medical);
        }
        if (formData.noc_concerned != '') {
            $('#noc_concerned_container_for_hotelregi').hide();
            $('#noc_concerned_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_concerned);
            $('#noc_concerned_name_container_for_hotelregi').show();
            $('#noc_concerned_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_concerned);
        }
        if (formData.noc_electricity != '') {
            $('#noc_electricity_container_for_hotelregi').hide();
            $('#noc_electricity_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_electricity);
            $('#noc_electricity_name_container_for_hotelregi').show();
            $('#noc_electricity_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_electricity);
        }
        if (formData.aadhar_card_homestay != '') {
            $('#aadhar_card_container_for_homestay').hide();
            $('#aadhar_card_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.aadhar_card_homestay);
            $('#aadhar_card_name_container_for_homestay').show();
            $('#aadhar_card_download').attr("href", HOTELREGI_DOC_PATH + formData.aadhar_card_homestay);
        }
        if (formData.form_xiv_homestay != '') {
            $('#form_xiv_container_for_homestay').hide();
            $('#form_xiv_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.form_xiv_homestay);
            $('#form_xiv_name_container_for_homestay').show();
            $('#form_xiv_download').attr("href", HOTELREGI_DOC_PATH + formData.form_xiv_homestay);
        }
        if (formData.site_plan_homestay != '') {
            $('#site_plan_container_for_homestay').hide();
            $('#site_plan_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.site_plan_homestay);
            $('#site_plan_name_container_for_homestay').show();
            $('#site_plan_homestay_download').attr("href", HOTELREGI_DOC_PATH + formData.site_plan_homestay);
        }
        if (formData.na_order_homestay != '') {
            $('#na_order_container_for_homestay').hide();
            $('#na_order_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.na_order_homestay);
            $('#na_order_name_container_for_homestay').show();
            $('#na_order_download').attr("href", HOTELREGI_DOC_PATH + formData.na_order_homestay);
        }
        if (formData.completion_certificate_homestay != '') {
            $('#completion_certificate_container_for_homestay').hide();
            $('#completion_certificate_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.completion_certificate_homestay);
            $('#completion_certificate_name_container_for_homestay').show();
            $('#completion_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.completion_certificate_homestay);
        }
        if (formData.house_tax_receipt_homestay != '') {
            $('#house_tax_receipt_container_for_homestay').hide();
            $('#house_tax_receipt_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.house_tax_receipt_homestay);
            $('#house_tax_receipt_name_container_for_homestay').show();
            $('#house_tax_receipt_download').attr("href", HOTELREGI_DOC_PATH + formData.house_tax_receipt_homestay);
        }
        if (formData.electricity_bill_homestay != '') {
            $('#electricity_bill_container_for_homestay').hide();
            $('#electricity_bill_name_image_for_homestay').attr('src', HOTELREGI_DOC_PATH + formData.electricity_bill_homestay);
            $('#electricity_bill_name_container_for_homestay').show();
            $('#electricity_bill_download').attr("href", HOTELREGI_DOC_PATH + formData.electricity_bill_homestay);
        }
        if (formData.noc_fire != '') {
            $('#noc_fire_container_for_hotelregi').hide();
            $('#noc_fire_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.noc_fire);
            $('#noc_fire_name_container_for_hotelregi').show();
            $('#noc_fire_download').attr("href", HOTELREGI_DOC_PATH + formData.noc_fire);
        }
        if (formData.police_clearance_certificate != '') {
            $('#police_clearance_certificate_container_for_hotelregi').hide();
            $('#police_clearance_certificate_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.police_clearance_certificate);
            $('#police_clearance_certificate_name_container_for_hotelregi').show();
            $('#police_clearance_certificate_download').attr("href", HOTELREGI_DOC_PATH + formData.police_clearance_certificate);
        }
        if (formData.signature != '') {
            $('#seal_and_stamp_container_for_hotelregi').hide();
            $('#seal_and_stamp_name_image_for_hotelregi').attr('src', HOTELREGI_DOC_PATH + formData.signature);
            $('#seal_and_stamp_name_container_for_hotelregi').show();
            $('#seal_and_stamp_download').attr("href", HOTELREGI_DOC_PATH + formData.signature);
        }
        $('.remove_btn_hidden').hide();
        var agentInfo = JSON.parse(formData.name_of_agent);
        $.each(agentInfo, function (key, value) {
            that.addMultipleAgent(value);
            $(".name_of_agent").prop("readonly", true);
            $('.remove_btn_hidden').hide();
        })
    },
    checkValidationForHotelregi: function (hotelregiData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        if (!hotelregiData.name_of_hotel) {
            return getBasicMessageAndFieldJSONArray('name_of_hotel', hotelNameValidationMessage);
        }
        if (!hotelregiData.name_of_person) {
            return getBasicMessageAndFieldJSONArray('name_of_person', applicantNameValidationMessage);
        }
        if (!hotelregiData.full_address) {
            return getBasicMessageAndFieldJSONArray('full_address', fullAddressValidationMessage);
        }
        if (!hotelregiData.name_of_tourist_area) {
            return getBasicMessageAndFieldJSONArray('name_of_tourist_area', nameOfTouristAreaValidationMessage);
        }
        if (!hotelregiData.entity_establishment_type) {
            return getBasicMessageAndFieldJSONArray('entity_establishment_type', entityEstablishmentTypeValidationMessage);
        }
        if (!hotelregiData.name_of_proprietor) {
            return getBasicMessageAndFieldJSONArray('name_of_proprietor', nameOfProprietorValidationMessage);
        }
        if (!hotelregiData.category_of_hotel) {
            return getBasicMessageAndFieldJSONArray('category_of_hotel', categoryOfHotelValidationMessage);
        }
        hotelregiData.fees;
        if (!hotelregiData.mob_no) {
            return getBasicMessageAndFieldJSONArray('mob_no', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(hotelregiData.mob_no);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mob_no', invalidMobileValidationMessage);
        }
        if (!hotelregiData.name_of_manager) {
            return getBasicMessageAndFieldJSONArray('name_of_manager', nameOfManagerValidationMessage);
        }
        if (!hotelregiData.manager_permanent_address) {
            return getBasicMessageAndFieldJSONArray('manager_permanent_address', managerPermanentAddressValidationMessage);
        }
        var permanent_resident_of_ut = $('input[name=permanent_resident_of_ut]:checked').val();
        if (permanent_resident_of_ut == '' || permanent_resident_of_ut == null) {
            $('#permanent_resident_of_ut').focus();
            return getBasicMessageAndFieldJSONArray('permanent_resident_of_ut', permanentResidentUTValidationMessage);
        }
        var other_business_of_applicant = $('input[name=other_business_of_applicant]:checked').val();
        if (other_business_of_applicant == '' || other_business_of_applicant == null) {
            $('#other_business_of_applicant').focus();
            return getBasicMessageAndFieldJSONArray('other_business_of_applicant', otherBusinessOfApplicantValidationMessage);
        }

        return '';
    },
    askForSubmitHotelregi: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Hotelregi.listview.submitHotelregi(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitHotelregi: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var hotelregiData = $('#hotelregi_form').serializeFormJSON();
        var validationData = that.checkValidationForHotelregi(hotelregiData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('hotelregi-' + validationData.field, validationData.message);
            return false;
        }

        var agentInfoItem = [];
        var isagentValidation = false;

        $('.agent_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var agentInfo = {};
            var agentName = $('#name_of_agent_' + cnt).val();
            if (agentName == '' || agentName == null) {
                $('#name_of_agent_' + cnt).focus();
                validationMessageShow('hotelregi-' + cnt, agentNameValidationMessage);
                isagentValidation = true;
                return false;
            }
            agentInfo.name = agentName;

            agentInfoItem.push(agentInfo);
        });

        if (isagentValidation) {
            console.log('1');
            return false;
        }

        if ($('#seal_and_stamp_container_for_hotelregi').is(':visible')) {
            var sealAndStamp = $('#seal_and_stamp_for_hotelregi').val();
            if (sealAndStamp == '') {
                $('#seal_and_stamp_for_hotelregi').focus();
                validationMessageShow('hotelregi-seal_and_stamp_for_hotelregi', uploadDocumentValidationMessage);
                return false;
            }
            var sealAndStampMessage = fileUploadValidation('seal_and_stamp_for_hotelregi');
            if (sealAndStampMessage != '') {
                $('#seal_and_stamp_for_hotelregi').focus();
                validationMessageShow('hotelregi-seal_and_stamp_for_hotelregi', sealAndStampMessage);
                return false;
            }
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_hotelregi') : $('#submit_btn_for_hotelregi');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var hotelregiData = new FormData($('#hotelregi_form')[0]);
        hotelregiData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        hotelregiData.append("agent_data", JSON.stringify(agentInfoItem));
        hotelregiData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'hotelregi/submit_hotelregi',
            data: hotelregiData,
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
                validationMessageShow('hotelregi', textStatus.statusText);
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
                    validationMessageShow('hotelregi', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                Hotelregi.router.navigate('hotelregi', {'trigger': true});
            }
        });
    },

    askForRemove: function (hotelregiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Hotelregi.listview.removeDocument(\'' + hotelregiId + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument: function (hotelregiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_TOURISM) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotelregi/remove_document',
            data: $.extend({}, {'hotelregi_id': hotelregiId}, getTokenData()),
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
                validationMessageShow('hotelregi', textStatus.statusText);
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
                    validationMessageShow('hotelregi', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#seal_and_stamp_name_container_for_hotelregi').hide();
                $('#seal_and_stamp_name_image_for_hotelregi').attr('src', '');
                $('#seal_and_stamp_container_for_hotelregi').show();
                $('#seal_and_stamp_for_hotelregi').val('');
            }
        });
    },
    generateFormII: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#hotelregi_id_for_hotelregi_formII').val(hotelregiId);
        $('#hotelregi_formII_pdf_form').submit();
        $('#hotelregi_id_for_hotelregi_formII').val('');
    },

    openUploadChallan: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + hotelregiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotelregi/get_hotelregi_data_by_hotelregi_id',
            type: 'post',
            data: $.extend({}, {'hotelregi_id': hotelregiId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var hotelregiData = parseData.hotelregi_data;
                showPopup();
                if (hotelregiData.status != VALUE_FOUR && hotelregiData.status != VALUE_FIVE && hotelregiData.status != VALUE_SIX && hotelregiData.status != VALUE_SEVEN && hotelregiData.status != VALUE_EIGHT) {
                    hotelregiData.show_remove_upload_btn = true;
                }
                if (hotelregiData.payment_type == VALUE_ONE) {
                    hotelregiData.utitle = 'Challan Copy';
                } else {
                    hotelregiData.utitle = 'Payment Details';
                }
                hotelregiData.module_type = VALUE_SIX;
                $('#popup_container').html(hotelregiUploadChallanTemplate(hotelregiData));
                loadFB(VALUE_SIX, parseData.fb_data, hotelregiData.payment_type, hotelregiData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'hotelregi_upload_challan', hotelregiData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'hotelregi_upload_challan', 'uc', 'radio', '#fb', VALUE_SIX);
                if (hotelregiData.challan != '') {
                    $('#challan_container_for_hotelregi_upload_challan').hide();
                    $('#challan_name_container_for_hotelregi_upload_challan').show();
                    $('#challan_name_href_for_hotelregi_upload_challan').attr('href', 'documents/hotelregi/' + hotelregiData.challan);
                    $('#challan_name_for_hotelregi_upload_challan').html(hotelregiData.challan);
                    $('#challan_remove_btn_for_hotelregi_upload_challan').attr('onclick', 'Hotelregi.listview.removeChallan("' + hotelregiData.hotelregi_id + '")');
                }
            }
        });
    },
    removeChallan: function (hotelregiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotelregi/remove_challan',
            data: $.extend({}, {'hotelregi_id': hotelregiId}, getTokenData()),
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
                validationMessageShow('hotelregi-uc', textStatus.statusText);
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
                    validationMessageShow('hotelregi-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-hotelregi-uc').html(parseData.message);
                removeDocument('challan', 'hotelregi_upload_challan');
                $('#status_' + hotelregiId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-hotelregi-uc').html('');
        validationMessageHide();
        var hotelregiId = $('#hotelregi_id_for_hotelregi_upload_challan').val();
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_hotelregi_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_hotelregi_upload_challan_1').focus();
            validationMessageShow('hotelregi-uc-payment_type_for_hotelregi_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_hotelregi_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_hotelregi_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_hotelregi_upload_challan').focus();
                validationMessageShow('hotelregi-uc-challan_for_hotelregi_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_hotelregi_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_hotelregi_upload_challan').focus();
                validationMessageShow('hotelregi-uc-challan_for_hotelregi_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_SIX, 'hotelregi-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_hotelregi_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#hotelregi_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'hotelregi/upload_challan',
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
                validationMessageShow('hotelregi-uc', textStatus.statusText);
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
                    validationMessageShow('hotelregi-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + hotelregiId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + hotelregiId).show();
                }
                $('#total_fees_' + hotelregiId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_hotelregi_' + hotelregiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotelregi/get_hotelregi_data_by_hotelregi_id',
            type: 'post',
            data: $.extend({}, {'hotelregi_id': hotelregiId}, getTokenData()),
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
                var hotelregiData = parseData.hotelregi_data;
                showPopup();
                $('#popup_container').html(hotelregiApproveTemplate(hotelregiData));
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
        var formData = $('#approve_hotelregi_form').serializeFormJSON();
        if (!formData.hotelregi_id_for_hotelregi_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_hotelregi_approve) {
            $('#registration_number_for_hotelregi_approve').focus();
            validationMessageShow('hotelregi-approve-registration_number_for_hotelregi_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_hotelregi_approve) {
            $('#valid_upto_for_hotelregi_approve').focus();
            validationMessageShow('hotelregi-approve-valid_upto_for_hotelregi_approve', dateValidationMessage);
            return false;
        }
        if (!formData.remarks_for_hotelregi_approve) {
            $('#remarks_for_hotelregi_approve').focus();
            validationMessageShow('hotelregi-approve-remarks_for_hotelregi_approve', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotelregi/approve_application',
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
                validationMessageShow('hotelregi-approve', textStatus.statusText);
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
                    validationMessageShow('hotelregi-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.hotelregi_id_for_hotelregi_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.hotelregi_id_for_hotelregi_approve).remove();
                $('#approve_btn_for_app_' + formData.hotelregi_id_for_hotelregi_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.hotelregi_id_for_hotelregi_approve).show();
                $('#so_status_' + formData.hotelregi_id_for_hotelregi_approve).html(dateTimeDays(formData.hotelregi_id_for_hotelregi_approve, parseData, VALUE_SIX));
            }
        });
    },
    askForRejectApplication: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_hotelregi_' + hotelregiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotelregi/get_hotelregi_data_by_hotelregi_id',
            type: 'post',
            data: $.extend({}, {'hotelregi_id': hotelregiId}, getTokenData()),
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
                var hotelregiData = parseData.hotelregi_data;
                showPopup();
                $('#popup_container').html(hotelregiRejectTemplate(hotelregiData));
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
        var formData = $('#reject_hotelregi_form').serializeFormJSON();
        if (!formData.hotelregi_id_for_hotelregi_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_hotelregi_reject) {
            $('#remarks_for_hotelregi_reject').focus();
            validationMessageShow('hotelregi-reject-remarks_for_hotelregi_reject', establishmentRemarkValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'hotelregi/reject_application',
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
                validationMessageShow('hotelregi-reject', textStatus.statusText);
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
                    validationMessageShow('hotelregi-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.hotelregi_id_for_hotelregi_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.hotelregi_id_for_hotelregi_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.hotelregi_id_for_hotelregi_reject).remove();
                $('#reject_btn_for_app_' + formData.hotelregi_id_for_hotelregi_reject).remove();
                $('#approve_btn_for_app_' + formData.hotelregi_id_for_hotelregi_reject).remove();
                $('#so_status_' + formData.hotelregi_id_for_hotelregi_reject).html(dateTimeDays(formData.hotelregi_id_for_hotelregi_reject, parseData, VALUE_SIX));
                that.loadHotelregiData();
            }
        });
    },
    generateCertificate: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#hotelregi_id_for_certificate').val(hotelregiId);
        $('#hotelregi_certificate_pdf_form').submit();
        $('#hotelregi_id_for_certificate').val('');
    },
    addMultipleAgent: function (templateData) {
        templateData.per_cnt = tempAgentInfoCnt;
        $('#agent_info_container').append(hotelregiAgentInfoTemplate(templateData));
        tempAgentInfoCnt++;
        resetCounter('display-cnt');
    },
    removeAgentInfo: function (perCnt) {
        $('#agent_info_' + perCnt).remove();
        resetCounter('display-cnt');
    },
    getQueryData: function (hotelregiId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!hotelregiId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_SIX;
        templateData.module_id = hotelregiId;
        var btnObj = $('#query_btn_for_hotelregi_' + hotelregiId);
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
                tmpData.application_number = regNoRenderer(VALUE_SIX, moduleData.hotelregi_id);
                tmpData.applicant_name = moduleData.name_of_hotel;
                tmpData.title = 'Hotel Name';
                tmpData.module_type = VALUE_SIX;
                tmpData.module_id = hotelregiId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    getFees: function (category) {
        $("#fees").prop("readonly", true);
        var categoryOfHotel = category.value;
        if (categoryOfHotel == '') {
            return false;
        }

        if (categoryOfHotel == 'A') {
            $('#fees').val('Rs. 5000');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (categoryOfHotel == 'B') {
            $('#fees').val('Rs. 4000');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (categoryOfHotel == 'C') {
            $('#fees').val('Rs. 3000');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (categoryOfHotel == 'D') {
            $('#fees').val('Rs. 2000');
            $('.hotel').show();
            $('.homestay').hide();
        } else if (categoryOfHotel == 'E') {
            $('#fees').val('Rs. 200');
            $('.hotel').hide();
            $('.homestay').show();
        }
    },
    viewPayment: function (hotelregiId) {
        if (!hotelregiId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + hotelregiId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'hotelregi/get_hotelregi_data_by_hotelregi_id',
            type: 'post',
            data: $.extend({}, {'hotelregi_id': hotelregiId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var hotelregiData = parseData.hotelregi_data;
                showPopup();
                if (hotelregiData.payment_type == VALUE_ONE || hotelregiData.payment_type == VALUE_THREE) {
                    hotelregiData.user_payment_type_text = paymentTypeArray[hotelregiData.payment_type];
                } else {
                    hotelregiData.user_payment_type_text = userPaymentTypeArray[hotelregiData.user_payment_type] ? userPaymentTypeArray[hotelregiData.user_payment_type] : '';
                }
                if (hotelregiData.payment_type == VALUE_ONE) {
                    hotelregiData.utitle = 'Fees Paid Challan Copy';
                } else if (hotelregiData.payment_type == VALUE_TWO && hotelregiData.user_payment_type == VALUE_ONE) {
                    hotelregiData.utitle = 'Demand Draft (DD) Copy';
                }
                hotelregiData.module_type = VALUE_SIX;
                $('#popup_container').html(hotelregiViewPaymentTemplate(hotelregiData));
                loadFB(VALUE_SIX, parseData.fb_data, hotelregiData.payment_type);
                loadPH(VALUE_SIX, hotelregiData.hotelregi_id, parseData.ph_data);
                if (hotelregiData.payment_type == VALUE_ONE || (hotelregiData.payment_type == VALUE_TWO && hotelregiData.user_payment_type == VALUE_ONE)) {
                    if (hotelregiData.fees_paid_challan != '') {
                        $('#vp_container_for_hotelregi').show();
                        $('#fees_paid_challan_name_href_for_hotelregi').attr('href', HOTELREGI_DOC_PATH + hotelregiData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_hotelregi').html(hotelregiData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
