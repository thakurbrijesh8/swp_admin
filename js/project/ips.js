var ipsIncListTemplate = Handlebars.compile($('#ips_inc_list_template').html());
var ipsIncTableTemplate = Handlebars.compile($('#ips_inc_table_template').html());
var ipsIncActionTemplate = Handlebars.compile($('#ips_inc_action_template').html());
var ipsIncViewTemplate = Handlebars.compile($('#ips_inc_view_template').html());
var ipsIncDocItemViewTemplate = Handlebars.compile($('#ips_inc_doc_item_view_template').html());
var ipsIncUploadChallanTemplate = Handlebars.compile($('#ips_inc_upload_challan_template').html());
var ipsIncViewPaymentTemplate = Handlebars.compile($('#ips_inc_view_payment_template').html());
var ipsIncApproveTemplate = Handlebars.compile($('#ips_inc_approve_template').html());
var ipsIncRejectTemplate = Handlebars.compile($('#ips_inc_reject_template').html());
var Ips = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Ips.Router = Backbone.Router.extend({
    routes: {
        'ips_incentives': 'renderListForIncentives'
    },
    renderListForIncentives: function () {
        Ips.listview.listPageForIncentives();
    }
});
Ips.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPageForIncentives: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_dic');
        addClass('ips', 'active');
        Ips.router.navigate('ips_incentives');
        var templateData = {};
        this.$el.html(ipsIncListTemplate(templateData));
        this.loadIpsData(sDistrict, sStatus, sAppTimingStatus);
    },
    incentivesActionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return ipsIncActionTemplate(rowData);
        }
        rowData.show_rv_query_btn = true;
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
        rowData.module_type = VALUE_FIFTYTWO;
        rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : (rowData.status == VALUE_NINE ? '' : 'display: none;'));
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return ipsIncActionTemplate(rowData);
    },
    loadIpsData: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name +
                    '<hr><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var schemeRenderer = function (data, type, full, meta) {
            return  (schemeTypeArray[full.scheme_type] ? schemeTypeArray[full.scheme_type] : '') +
                    '<hr>' + (schemeArray[full.scheme] ? schemeArray[full.scheme] : '');
        };
        var odRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.owner_name +
                    '<hr><b><i class="fas fa-at f-s-10px"></i></b> :- ' + full.owner_email +
                    '<hr><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.owner_mobile_no;
        };
        var manuRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.manu_name +
                    '<hr><b><i class="fas fa-map-pin f-s-10px"></i></b> :- ' + full.main_plant_address +
                    '<hr><b><i class="fas fa-map-pin f-s-10px"></i></b> :- ' + full.office_address;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-12px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_FIFTYTWO, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_FIFTYTWO);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['incentives_data'], function (index, objData) {
                json['incentives_data'][index]['query_movement_string'] = qmData[objData.ips_incentive_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.ips_incentive_id] + '</table>') : '-';
            });
            return json['incentives_data'];
        };
        var that = this;
        Ips.router.navigate('ips_incentives');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Ips.listview.listPageForIncentives();');
        $('#incentives_form_and_datatable_container').html(ipsIncTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(schemeArray, 'scheme_for_incentives_list', false);
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_incentives_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_incentives_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_incentives_list', false);
        allowOnlyIntegerValue('mobile_number_for_incentives_list')
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_incentives_list', false);
        $('#district_for_incentives_list').val(searchData.search_district);
        $('#status_for_incentives_list').val(searchData.search_status);
        $('#app_timing_for_incentives_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_incentives_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_incentives_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_incentives_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_incentives_list').attr('disabled', 'disabled');
        }
        incentivesDataTable = $('#incentives_datatable').DataTable({
            ajax: {url: 'ips/get_incentives_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'ips_incentive_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': 'f-s-13px', 'render': schemeRenderer},
                {data: '', 'class': 'f-s-14px', 'render': odRenderer},
                {data: '', 'class': 'f-s-14px', 'render': manuRenderer},
                {data: 'ips_incentive_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'ips_incentive_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'ips_incentive_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#incentives_datatable_filter').remove();
        $('#incentives_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = incentivesDataTable.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(that.incentivesActionRenderer(row.data())).show();
                tr.addClass('shown');
            }
        });
    },
    editOrViewIncentives: function (btnObj, ipsIncentiveId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        if (isEdit) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ips/get_incentives_data_by_id',
            type: 'post',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId}, getTokenData()),
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
                if (!isEdit) {
                    that.viewIpsForm(parseData);
                }
            }
        });
    },
    setBasicDetailsforIncentives: function (ipsData) {
        ipsData.VALUE_ONE = VALUE_ONE;
        ipsData.VALUE_TWO = VALUE_TWO;
        ipsData.VALUE_THREE = VALUE_THREE;
        ipsData.VALUE_FOUR = VALUE_FOUR;
        ipsData.VALUE_FIVE = VALUE_FIVE;
        ipsData.VALUE_SIX = VALUE_SIX;
        ipsData.VALUE_SEVEN = VALUE_SEVEN;
        ipsData.VALUE_EIGHT = VALUE_EIGHT;
        ipsData.VALUE_NINE = VALUE_NINE;
        ipsData.VALUE_TEN = VALUE_TEN;
        ipsData.VALUE_ELEVEN = VALUE_ELEVEN;
        ipsData.VALUE_TWELVE = VALUE_TWELVE;
        ipsData.VALUE_THIRTEEN = VALUE_THIRTEEN;
        ipsData.VALUE_FOURTEEN = VALUE_FOURTEEN;
        ipsData.VALUE_FIFTEEN = VALUE_FIFTEEN;
        ipsData.VALUE_SIXTEEN = VALUE_SIXTEEN;
        ipsData.VALUE_SEVENTEEN = VALUE_SEVENTEEN;
        ipsData.VALUE_EIGHTEEN = VALUE_EIGHTEEN;
        ipsData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        ipsData.common_application_number = regNoRenderer(VALUE_FIFTYONE, ipsData.ips_id);
        ipsData.inc_application_number = regNoRenderer(VALUE_FIFTYTWO, ipsData.ips_incentive_id);
        ipsData.scheme_type_text = schemeTypeArray[ipsData.scheme_type] ? schemeTypeArray[ipsData.scheme_type] : '';
        ipsData.scheme_text = schemeArray[ipsData.scheme] ? schemeArray[ipsData.scheme] : '';
        ipsData.district_text = talukaArray[ipsData.district] ? talukaArray[ipsData.district] : '';
        ipsData.owner_category_text = ownerCategoryArray[ipsData.owner_category] ? ownerCategoryArray[ipsData.owner_category] : '';
        ipsData.caste_category_text = casteCategoryArray[ipsData.caste_category] ? casteCategoryArray[ipsData.caste_category] : '';
        ipsData.constitution_text = ipsData.constitution == VALUE_FIVE ? ipsData.other_constitution : (constitutionArray[ipsData.constitution] ? constitutionArray[ipsData.constitution] : '');
        ipsData.unit_category_text = unitCategoryArray[ipsData.unit_category] ? unitCategoryArray[ipsData.unit_category] : '';
        if (ipsData.unit_category == VALUE_ONE) {
            ipsData.msme_category_text = msmeTypeArray[ipsData.msme_category] ? msmeTypeArray[ipsData.msme_category] : '';
            ipsData.show_unit_category_one = true;
        }
//        if (ipsData.unit_category == VALUE_TWO) {
//            ipsData.show_unit_category_two = true;
//        }
        ipsData.entrepreneur_category_text = getCheckboxValue(ipsData.entrepreneur_category, entrepreneurCategoryArray);
        if (ipsData.entrepreneur_category == VALUE_THREE || $.inArray('3', ipsData.entrepreneur_category) != -1) {
            ipsData.show_entrepreneur_category_dob_details = true;
            ipsData.birth_date_text = ipsData.birth_date != '0000-00-00' ? dateTo_DD_MM_YYYY(ipsData.birth_date) : '';
        }
        ipsData.unit_type_text = getCheckboxValue(ipsData.unit_type, unitTypeArray);
        if (ipsData.unit_type == VALUE_FIVE || $.inArray('5', ipsData.unit_type) != -1) {
            ipsData.show_unit_type_three = true;
        }
        if (ipsData.unit_type == VALUE_SIX || $.inArray('6', ipsData.unit_type) != -1) {
            ipsData.show_unit_type_four = true;
        }
        ipsData.sector_category_text = sectorCategoryArray[ipsData.sector_category] ? sectorCategoryArray[ipsData.sector_category] : '';
        ipsData.thrust_sectors_text = getCheckboxValue(ipsData.thrust_sectors, thrustSectorsArray);
        ipsData.commencement_date_text = ipsData.commencement_date != '0000-00-00' ? dateTo_DD_MM_YYYY(ipsData.commencement_date) : '';

        ipsData.latitude = parseFloat(ipsData.latitude);
        ipsData.longitude = parseFloat(ipsData.longitude);
        if (ipsData.latitude != VALUE_ZERO || ipsData.longitude != VALUE_ZERO) {
            ipsData.show_map = true;
        }

        return ipsData;
    },
    viewIpsForm: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_DIC && tempTypeInSession != TEMP_TYPE_DIC_DNH && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var ipsData = that.setBasicDetailsforIncentives(parseData.ips_incentive_data);
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(ipsIncViewTemplate(ipsData));

        if (ipsData.show_map) {
            var mapData = {};
            mapData.lat = ipsData.latitude;
            mapData.lng = ipsData.longitude;
            loadMap('map_container_for_ips_view', '', '', mapData, false);
        }

        that.viewIncentivesDocument(ipsData);
        resetCounter('view-doc-sr-no');
        var docDetails = parseData.doc_details;
        var schemeDocuments = schemeDocArray[ipsData.scheme] ? schemeDocArray[ipsData.scheme] : '';
        var tCnt = 1;
        $.each(schemeDocuments, function (docId, docNameText) {
            var docData = docDetails[docId] ? docDetails[docId] : {};
            docData.doc_cnt = tCnt;
            docData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
            docData.doc_id = docId;
            docData.doc_name_text = docNameText;
            $('#doc_item_container_for_view_incentives').append(ipsIncDocItemViewTemplate(docData));
            if (docData.doc_name) {
                that.loadIncentivesDocumentForView(docData.doc_id, docData);
            }
            tCnt++;
        });
        if (tCnt == 1) {
            $('#doc_item_container_for_view_incentives').html(noRecordFoundTemplate({'colspan': 3, 'message': 'Document Not Available !'}));
        }
    },
    viewIncentivesDocument: function (ipsData) {
        var that = this;
        var docData = {};
        docData.ips_id = ipsData.ips_id;
//        if (ipsData.unit_category == VALUE_ONE) {
//            if (ipsData.unit_doc != '') {
//                docData.file_name = ipsData.unit_doc;
//                that.loadIpsDocumentForView(VALUE_ONE, docData);
//            }
//        }
//        if (ipsData.unit_category == VALUE_TWO) {
//            if (ipsData.non_msme_doc != '') {
//                docData.file_name = ipsData.non_msme_doc;
//                that.loadIpsDocumentForView(VALUE_TWO, docData);
//            }
//        }
        if (ipsData.entrepreneur_category == VALUE_THREE || $.inArray('3', ipsData.entrepreneur_category) != -1) {
            if (ipsData.birth_doc != '') {
                docData.file_name = ipsData.birth_doc;
                that.loadIpsDocumentForView(VALUE_THREE, docData);
            }
        }
        if (ipsData.udyam_regi_doc != '') {
            docData.file_name = ipsData.udyam_regi_doc;
            that.loadIpsDocumentForView(VALUE_FOUR, docData);
        }
        if (ipsData.partnership_deed_doc != '') {
            docData.file_name = ipsData.partnership_deed_doc;
            that.loadIpsDocumentForView(VALUE_FIVE, docData);
        }
        if (ipsData.enterprise_doc != '') {
            docData.file_name = ipsData.enterprise_doc;
            that.loadIpsDocumentForView(VALUE_SIX, docData);
        }
        if (ipsData.ent_leased_doc != '') {
            docData.file_name = ipsData.ent_leased_doc;
            that.loadIpsDocumentForView(VALUE_SEVEN, docData);
        }
        if (ipsData.electricity_doc != '') {
            docData.file_name = ipsData.electricity_doc;
            that.loadIpsDocumentForView(VALUE_EIGHT, docData);
        }
        if (ipsData.authorization_doc != '') {
            docData.file_name = ipsData.authorization_doc;
            that.loadIpsDocumentForView(VALUE_NINE, docData);
        }
        if (ipsData.pcc_doc != '') {
            docData.file_name = ipsData.pcc_doc;
            that.loadIpsDocumentForView(VALUE_TEN, docData);
        }
        if (ipsData.factory_license_doc != '') {
            docData.file_name = ipsData.factory_license_doc;
            that.loadIpsDocumentForView(VALUE_ELEVEN, docData);
        }
//        if (ipsData.clearnces_doc != '') {
//            docData.file_name = ipsData.clearnces_doc;
//            that.loadIpsDocumentForView(VALUE_TWELVE, docData);
//        }
        if (ipsData.ur_cin_doc != '') {
            docData.file_name = ipsData.ur_cin_doc;
            that.loadIpsDocumentForView(VALUE_THIRTEEN, docData);
        }
        if (ipsData.ur_tin_doc != '') {
            docData.file_name = ipsData.ur_tin_doc;
            that.loadIpsDocumentForView(VALUE_FOURTEEN, docData);
        }
        if (ipsData.ur_pan_doc != '') {
            docData.file_name = ipsData.ur_pan_doc;
            that.loadIpsDocumentForView(VALUE_FIFTEEN, docData);
        }
        if (ipsData.ur_gst_doc != '') {
            docData.file_name = ipsData.ur_gst_doc;
            that.loadIpsDocumentForView(VALUE_SIXTEEN, docData);
        }
        if (ipsData.ur_other_doc != '') {
            docData.file_name = ipsData.ur_other_doc;
            that.loadIpsDocumentForView(VALUE_SEVENTEEN, docData);
        }
        if (ipsData.undertaking_doc != '') {
            docData.file_name = ipsData.undertaking_doc;
            that.loadIpsDocumentForView(VALUE_EIGHTEEN, docData);
        }
    },
    openUploadChallan: function (ipsIncentiveId) {
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + ipsIncentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ips/get_incentive_data_by_ips_incentive_id',
            type: 'post',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var incentiveData = parseData.incentive_data;
                showPopup();
                if (incentiveData.status != VALUE_FOUR && incentiveData.status != VALUE_FIVE && incentiveData.status != VALUE_SIX && incentiveData.status != VALUE_SEVEN && incentiveData.status != VALUE_EIGHT) {
                    incentiveData.show_remove_upload_btn = true;
                }
                if (incentiveData.payment_type == VALUE_ONE) {
                    incentiveData.utitle = 'Challan Copy';
                } else {
                    incentiveData.utitle = 'Payment Details';
                }
                incentiveData.module_type = VALUE_FIFTYTWO;
                $('#popup_container').html(ipsIncUploadChallanTemplate(incentiveData));
                loadFB(VALUE_FIFTYTWO, parseData.fb_data, incentiveData.payment_type, incentiveData.show_remove_upload_btn);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'incentives_upload_challan', incentiveData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'incentives_upload_challan', 'uc', 'radio', '#fb', VALUE_FIFTYTWO);
                if (incentiveData.challan != '') {
                    $('#challan_container_for_incentives_upload_challan').hide();
                    $('#challan_name_container_for_incentives_upload_challan').show();
                    $('#challan_name_href_for_incentives_upload_challan').attr('href', 'documents/ips_inc/' + incentiveData.challan);
                    $('#challan_name_for_incentives_upload_challan').html(incentiveData.challan);
                    $('#challan_remove_btn_for_incentives_upload_challan').attr('onclick', 'Ips.listview.removeChallan("' + incentiveData.ips_incentive_id + '")');
                }
            }
        });
    },
    removeChallan: function (ipsIncentiveId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'ips/remove_challan',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId}, getTokenData()),
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
                validationMessageShow('incentives-uc', textStatus.statusText);
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
                    validationMessageShow('incentives-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-incentives-uc').html(parseData.message);
                removeDocument('challan', 'incentives_upload_challan');
                $('#status_' + ipsIncentiveId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-incentives-uc').html('');
        validationMessageHide();
        var ipsIncentiveId = $('#ips_incentive_id_for_incentives_upload_challan').val();
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_incentives_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_incentives_upload_challan_1').focus();
            validationMessageShow('incentives-uc-payment_type_for_incentives_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_incentives_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_incentives_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_incentives_upload_challan').focus();
                validationMessageShow('incentives-uc-challan_for_incentives_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_incentives_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_incentives_upload_challan').focus();
                validationMessageShow('incentives-uc-challan_for_incentives_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_FIFTYTWO, 'incentives-uc');
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_incentives_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#incentives_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'ips/upload_challan',
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
                validationMessageShow('incentives-uc', textStatus.statusText);
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
                    validationMessageShow('incentives-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + ipsIncentiveId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + ipsIncentiveId).show();
                }
                $('#total_fees_' + ipsIncentiveId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (ipsIncentiveId) {
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + ipsIncentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ips/get_incentive_data_by_ips_incentive_id',
            type: 'post',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId}, getTokenData()),
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
                var incentiveData = parseData.incentive_data;
                showPopup();
                $('#popup_container').html(ipsIncApproveTemplate(incentiveData));
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
        var formData = $('#approve_incentives_form').serializeFormJSON();
        if (!formData.ips_incentive_id_for_incentives_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_incentives_approve) {
            $('#registration_number_for_incentives_approve').focus();
            validationMessageShow('incentives-approve-registration_number_for_incentives_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_incentives_approve) {
            $('#valid_upto_for_incentives_approve').focus();
            validationMessageShow('incentives-approve-valid_upto_for_incentives_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_incentives_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_incentives_approve').focus();
            validationMessageShow('incentives-approve-certificate_file_for_incentives_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_incentives_approve) {
            $('#remarks_for_incentives_approve').focus();
            validationMessageShow('incentives-approve-remarks_for_incentives_approve', remarksValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#submit_btn_for_incentives_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var newFormData = new FormData($('#approve_incentives_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'ips/approve_application',
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
                validationMessageShow('incentives-approve', textStatus.statusText);
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
                    validationMessageShow('incentives-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadIpsData();
            }
        });
    },
    askForRejectApplication: function (ipsIncentiveId) {
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + ipsIncentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ips/get_incentive_data_by_ips_incentive_id',
            type: 'post',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId}, getTokenData()),
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
                var incentiveData = parseData.incentive_data;
                showPopup();
                $('#popup_container').html(ipsIncRejectTemplate(incentiveData));
            }
        });
    },
    rejectApplication: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_incentives_form').serializeFormJSON();
        if (!formData.ips_incentive_id_for_incentives_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_incentives_reject) {
            $('#remarks_for_incentives_reject').focus();
            validationMessageShow('incentives-reject-remarks_for_incentives_reject', remarksValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'ips/reject_application',
            data: $.extend({}, formData, getTokenData()),
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
                validationMessageShow('incentives-reject', textStatus.statusText);
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
                    validationMessageShow('incentives-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.loadIpsData();
            }
        });
    },
    generateCertificate: function (ipsIncentiveId) {
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#ips_incentive_id_for_certificate').val(ipsIncentiveId);
        $('#incentives_certificate_pdf_form').submit();
        $('#ips_incentive_id_for_certificate').val('');
    },
    getQueryData: function (ipsIncentiveId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_FIFTYTWO;
        templateData.module_id = ipsIncentiveId;
        var btnObj = $('#query_btn_for_app_' + ipsIncentiveId);
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
                tmpData.application_number = regNoRenderer(VALUE_FIFTYTWO, moduleData.ips_incentive_id);
                tmpData.applicant_name = moduleData.manu_name;
                tmpData.title = 'Manufacturing Unit / Service Unit Details';
                tmpData.module_type = VALUE_FIFTYTWO;
                tmpData.module_id = ipsIncentiveId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (ipsIncentiveId) {
        if (!ipsIncentiveId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + ipsIncentiveId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'ips/get_incentive_data_by_ips_incentive_id',
            type: 'post',
            data: $.extend({}, {'ips_incentive_id': ipsIncentiveId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var incentiveData = parseData.incentive_data;
                showPopup();
                if (incentiveData.payment_type == VALUE_ONE || incentiveData.payment_type == VALUE_THREE) {
                    incentiveData.user_payment_type_text = paymentTypeArray[incentiveData.payment_type];
                } else {
                    incentiveData.user_payment_type_text = userPaymentTypeArray[incentiveData.user_payment_type] ? userPaymentTypeArray[incentiveData.user_payment_type] : '';
                }
                if (incentiveData.payment_type == VALUE_ONE) {
                    incentiveData.utitle = 'Fees Paid Challan Copy';
                } else if (incentiveData.payment_type == VALUE_TWO && incentiveData.user_payment_type == VALUE_ONE) {
                    incentiveData.utitle = 'Demand Draft (DD) Copy';
                }
                incentiveData.module_type = VALUE_FIFTYTWO;
                $('#popup_container').html(ipsIncViewPaymentTemplate(incentiveData));
                loadFB(VALUE_FIFTYTWO, parseData.fb_data, incentiveData.payment_type);
                loadPH(VALUE_FIFTYTWO, incentiveData.ips_incentive_id, parseData.ph_data);

                if (incentiveData.payment_type == VALUE_ONE || (incentiveData.payment_type == VALUE_TWO && incentiveData.user_payment_type == VALUE_ONE)) {
                    if (incentiveData.fees_paid_challan != '') {
                        $('#vp_container_for_incentives').show();
                        $('#fees_paid_challan_name_href_for_incentives').attr('href', IPS_INC_DOC_PATH + incentiveData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_incentives').html(incentiveData.fees_paid_challan);
                    }
                }
            }
        });
    },
    loadIpsDocumentForView: function (fileNo, incentiveData) {
        $('#upload_name_href_for_ips_' + fileNo).attr('href', IPS_DOC_PATH + incentiveData.file_name);
        $('#upload_name_container_for_ips_' + fileNo).show();
    },
    loadIncentivesDocumentForView: function (fileNo, incentiveData) {
        $('#upload_name_href_for_incentives_' + fileNo).attr('href', IPS_INC_DOC_PATH + incentiveData.doc_name);
        $('#upload_name_container_for_incentives_' + fileNo).show();
    },
});
