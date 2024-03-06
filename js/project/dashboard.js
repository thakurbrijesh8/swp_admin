var dashboardListTemplate = Handlebars.compile($('#dashboard_list_template').html());
var dashboardItemTemplate = Handlebars.compile($('#dashboard_item_template').html());
var ophListTemplate = Handlebars.compile($('#oph_list_template').html());
var ophActionTemplate = Handlebars.compile($('#oph_action_template').html());
var dvListTemplate = Handlebars.compile($('#dv_list_template').html());
var dvItemTemplate = Handlebars.compile($('#dv_item_template').html());
var hwrListTemplate = Handlebars.compile($('#hwr_list_template').html());
var hwrTableTemplate = Handlebars.compile($('#hwr_table_template').html());
var hwrItemTemplate = Handlebars.compile($('#hwr_item_template').html());
var hwrViewListTemplate = Handlebars.compile($('#hwr_view_list_template').html());
var Dashboard = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Dashboard.Router = Backbone.Router.extend({
    routes: {
        '': 'renderList',
        'dashboard': 'renderList',
        'online_payment_history': 'renderListForOPH',
        'head_wise_report': 'renderListForHWR'
    },
    renderList: function () {
        Dashboard.listview.listPage();
    },
    renderListForURLChange: function () {
        Dashboard.listview.listPage();
    },
    renderListForOPH: function () {
        Dashboard.listview.listPageForOPH();
    },
    renderListForHWR: function () {
        Dashboard.listview.listPageForHWR();
    },
});
Dashboard.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_USER_ACC_VER) {
            VPUsers.listview.listPage();
            return false;
        }
        Dashboard.router.navigate('dashboard');
        activeLink('menu_dashboard');
        var templateData = {};
        this.$el.html(dashboardListTemplate(templateData));
        datePicker();
        this.loadDashboardData();
    },
    basicDataForItem: function (serCnt, appData, serviceData, district) {
        appData.item_cnt = serCnt;
        appData.department_name = serviceData.department_name;
        appData.service_name = serviceData.service_name;
        appData.timeline = serviceData.timeline;
        appData.district_text = talukaArray[district] ? talukaArray[district] : '';
        appData.district = district;
        appData.module_type = serviceData.module_type;
        appData.VALUE_ONE = VALUE_ONE;
        appData.VALUE_TWO = VALUE_TWO;
        appData.VALUE_THREE = VALUE_THREE;
        appData.VALUE_FOUR = VALUE_FOUR;
        appData.VALUE_FIVE = VALUE_FIVE;
        appData.VALUE_SIX = VALUE_SIX;
        appData.VALUE_SEVEN = VALUE_SEVEN;
        appData.VALUE_EIGHT = VALUE_EIGHT;
        appData.VALUE_NINE = VALUE_NINE;
        appData.VALUE_TEN = VALUE_TEN;
        return appData;
    },
    loadDashboardData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('#app_count_main_container').html(noRecordFoundTemplate({'colspan': 25, 'message': dataTableProcessingAndNoDataMsg.loadingRecords}));
        $.ajax({
            url: 'main/get_dashboard_data',
            type: 'post',
            data: getTokenData(),
            error: function (textStatus, errorThrown) {
                $('#app_count_main_container').html(noRecordFoundTemplate({'colspan': 25, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
                generateNewCSRFToken();
                showError(textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (response) {
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                var deptWiseApp = parseData.dept_wise_app_details;
                var serCnt = 1;
                var damanData = {};
                var diuData = {};
                var dnhData = {};
                var tempDeptName = '';
                $.each(deptWiseApp, function (index, serviceData) {
                    if (serCnt == 1) {
                        tempDeptName = serviceData.department_name;
                        $('#app_count_main_container').html('');
                    }
                    serviceData.item_cnt = serCnt;
                    damanData = serviceData[TALUKA_DAMAN] ? serviceData[TALUKA_DAMAN] : {};
                    if (that.getDistWiseCalculation(damanData) != VALUE_ZERO) {
                        damanData = that.basicDataForItem(serCnt, damanData, serviceData, TALUKA_DAMAN);
                        if (tempDeptName != serviceData.department_name) {
                            tempDeptName = serviceData.department_name;
                            damanData.show_border_top = 'border-top: 1px solid black;';
                        }
                        $('#app_count_main_container').append(dashboardItemTemplate(damanData));
                        serCnt++;
                    }
                    diuData = serviceData[TALUKA_DIU] ? serviceData[TALUKA_DIU] : {};
                    if (that.getDistWiseCalculation(diuData) != VALUE_ZERO) {
                        diuData = that.basicDataForItem(serCnt, diuData, serviceData, TALUKA_DIU);
                        if (tempDeptName != serviceData.department_name) {
                            tempDeptName = serviceData.department_name;
                            diuData.show_border_top = 'border-top: 1px solid black;';
                        }
                        $('#app_count_main_container').append(dashboardItemTemplate(diuData));
                        serCnt++;
                    }
                    dnhData = serviceData[TALUKA_DNH] ? serviceData[TALUKA_DNH] : {};
                    if (that.getDistWiseCalculation(dnhData) != VALUE_ZERO) {
                        dnhData = that.basicDataForItem(serCnt, dnhData, serviceData, TALUKA_DNH);
                        if (tempDeptName != serviceData.department_name) {
                            tempDeptName = serviceData.department_name;
                            dnhData.show_border_top = 'border-top: 1px solid black;';
                        }
                        $('#app_count_main_container').append(dashboardItemTemplate(dnhData));
                        serCnt++;
                    }
                });
                if (serCnt == VALUE_ONE) {
                    $('#app_count_main_container').html(noRecordFoundTemplate({'colspan': 25, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
                }
                var csvTitle = ['No.', 'District', 'Department Name', 'Service Name', 'Time Line', 'Total Application',
                    'Within Time : Submitted', 'Within Time : Queried', 'Within Time : Fees Pending', 'Within Time : Fees Paid',
                    'Within Time : Pay Office', 'Within Time : Fees N.A.', 'Within Time : Payment Confirmed',
                    'Within Time : Approved', 'Within Time : Rejected', 'Delayed as per SLA : Submitted',
                    'Delayed as per SLA : Queried', 'Delayed as per SLA : Fees Pending', 'Delayed as per SLA : Fees Paid',
                    'Delayed as per SLA : Pay Office', 'Delayed as per SLA : Fees N.A.', 'Delayed as per SLA : Payment Confirmed',
                    'Delayed as per SLA : Approved', 'Delayed as per SLA : Rejected'];
                $('#app_count_datatable').DataTable({
                    dom: 'Bfrtip',
                    buttons: [{
                            extend: 'csv',
                            title: 'SWP Dashboard ' + dateTo_DD_MM_YYYY_HH_II_SS(),
                            text: 'Download CSV',
                            exportOptions: {
                                modifier: {
                                    page: 'all'
                                },
                                format: {
                                    header: function (data, columnIdx) {
                                        return csvTitle[columnIdx] ? csvTitle[columnIdx] : data;
                                    }
                                }
                            }
                        }],
                    bAutoWidth: false,
                    pageLength: 250,
                    "columnDefs": [
                        {"orderable": false, "targets": [1, 2, 3]},
                    ],
                    "lengthChange": false,
                    "initComplete": searchableDatatable
                });
                $('#app_count_datatable_filter').remove();
                $('#app_count_datatable_paginate').remove();
            }
        });
    },
    getDistWiseCalculation: function (dWiseData) {
        var totalCnt = dWiseData['delay_approved_app'] + dWiseData['delay_fees_paid_app'] +
                dWiseData['delay_fees_pending_app'] + dWiseData['delay_fess_na_app'] + dWiseData['delay_pay_at_office_app'] +
                dWiseData['delay_payment_confirmed_app'] + dWiseData['delay_rejected_app'] + dWiseData['delay_submitted_app'] +
                dWiseData['delay_queried_app'] + dWiseData['ot_queried_app'] +
                dWiseData['ot_approved_app'] + dWiseData['ot_fees_paid_app'] +
                dWiseData['ot_fees_pending_app'] + dWiseData['ot_fess_na_app'] + dWiseData['ot_pay_at_office_app'] +
                dWiseData['ot_payment_confirmed_app'] + dWiseData['ot_rejected_app'] + dWiseData['ot_submitted_app'];
        return parseInt(totalCnt) ? parseInt(totalCnt) : 0;
//        var totalCnt = dWiseData['delay_approved_app'] + dWiseData['delay_draft_app'] + dWiseData['delay_fees_paid_app'] +
//                dWiseData['delay_fees_pending_app'] + dWiseData['delay_fess_na_app'] + dWiseData['delay_pay_at_office_app'] +
//                dWiseData['delay_payment_confirmed_app'] + dWiseData['delay_rejected_app'] + dWiseData['delay_submitted_app'] +
//                dWiseData['delay_queried_app'] + dWiseData['ot_queried_app'] +
//                dWiseData['ot_approved_app'] + dWiseData['ot_draft_app'] + dWiseData['ot_fees_paid_app'] +
//                dWiseData['ot_fees_pending_app'] + dWiseData['ot_fess_na_app'] + dWiseData['ot_pay_at_office_app'] +
//                dWiseData['ot_payment_confirmed_app'] + dWiseData['ot_rejected_app'] + dWiseData['ot_submitted_app'];
//        return parseInt(totalCnt) ? parseInt(totalCnt) : 0;
    },
    changeRouter: function (moduleType, district, status, appTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (district != TALUKA_DAMAN && district != TALUKA_DIU && district != TALUKA_DNH) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        switch (moduleType) {
            case VALUE_ONE:
                Wmregistration.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWO:
                Repairer.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THREE:
                Dealer.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOUR:
                Manufacturer.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FIVE:
                WC.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SIX:
                Hotelregi.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SEVEN:
                Psfregistration.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_EIGHT:
                Cinema.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_NINE:
                MSME.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TEN:
                Textile.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_ELEVEN:
                Noc.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWELVE:
                Transfer.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTEEN:
                Subletting.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTEEN:
                RepairerRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FIFTEEN:
                DealerRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SIXTEEN:
                ManufacturerRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SEVENTEEN:
                Sublessee.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_EIGHTEEN:
                Seller.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_NINETEEN:
                TravelAgent.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTY:
                HotelRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYONE:
                Property.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYTWO:
                FilmShooting.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYTHREE:
                TravelagentRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYFOUR:
                Tourismevent.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYFIVE:
                Landallotment.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYSIX:
                Construction.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYSEVEN:
                Inspection.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYEIGHT:
                OccupancyCertificate.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_TWENTYNINE:
                Site.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTY:
                Zone.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYONE:
                CLACT.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYTWO:
                BOCW.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYTHREE:
                Shop.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYFOUR:
                MigrantWorkers.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYFIVE:
                FactoryLicense.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYSIX:
                BuildingPlan.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYSEVEN:
                BoilerAct.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYEIGHT:
                BoilerManufacture.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_THIRTYNINE:
                SingleReturn.listview.listPageForSingleReturn(district, status, appTimingStatus);
                break;
            case VALUE_FOURTY:
                Na.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYONE:
                FactoryLicenseRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYTWO:
                ShopRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYTHREE:
                Aplicence.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYFOUR:
                BoilerActRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYFIVE:
                MigrantworkersRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYSIX:
                AplicenceRenewal.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYSEVEN:
                ISMW.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYEIGHT:
                VC.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FOURTYNINE:
                RII.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FIFTY:
                Periodicalreturn.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_FIFTYTWO:
                Ips.listview.listPageForIncentives(district, status, appTimingStatus);
                break;
            case VALUE_FIFTYNINE:
                TreeCutting.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SIXTY:
                SocietyRegistration.listview.listPage(district, status, appTimingStatus);
                break;
            case VALUE_SIXTYONE:
                NilCertificate.listview.listPage(district, status, appTimingStatus);
                break;
        }

    },
    listPageForOPH: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_INSPECTIONS || tempTypeInSession == TEMP_TYPE_ISMW) {
            Dashboard.listview.listPage();
            return false;
        }
        activeLink('menu_opd');
        addClass('menu_oph', 'active');
        Dashboard.router.navigate('online_payment_history');
        var templateData = {};
        this.$el.html(ophListTemplate(templateData));
        if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_oph_list', false);
        }
        renderOptionsForTwoDimensionalArray(deptNameArray, 'dept_name_for_oph_list', false);
        renderOptionsForTwoDimensionalArray(pgStatusArray, 'pg_status_for_oph_list', false);
        this.loadOPHData();
    },
    loadOPHData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_INSPECTIONS || tempTypeInSession == TEMP_TYPE_ISMW) {
            Dashboard.listview.listPage();
            return false;
        }
        var tempRegNoRenderer = function (data, type, full, meta) {
            return regNoRenderer(full.module_type, data);
        };
        var feeRenderer = function (data, type, full, meta) {
            return data + ' /-';
        };
        var deptNameRenderer = function (data, type, full, meta) {
            return getDeptName(data);
        };
        var serviceNameRenderer = function (data, type, full, meta) {
            return getServiceName(data);
        };
        var opMessageRenderer = function (data, type, full, meta) {
            return pgMessage(data, full.fees_payment_id);
        };
        var tdtRenderer = function (data, type, full, meta) {
            return full.op_transaction_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(full.op_transaction_datetime) : (full.op_start_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(full.op_start_datetime) : '-');
        };
        var actionRenderer = function (data, type, full, meta) {
            return ophActionTemplate({'fees_payment_id': data});
        };
        ophDataTable = $('#oph_datatable').DataTable({
            ajax: {url: 'utility/get_all_payment_history', dataSrc: "payment_history", type: "post"},
            bAutoWidth: false,
            pageLength: 25,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'district', 'class': 'text-center', 'render': districtRenderer},
                {data: 'module_type', 'render': deptNameRenderer},
                {data: 'module_type', 'render': serviceNameRenderer},
                {data: 'module_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: '', 'class': 'text-center', 'render': tdtRenderer},
                {data: 'total_fees', 'class': 'text-right', 'render': feeRenderer},
                {data: 'reference_id', 'class': 'text-center'},
                {data: 'op_status', 'class': 'text-center', 'render': pgStatusRenderer},
                {data: 'op_message', 'render': opMessageRenderer},
                {data: 'fees_payment_id', 'class': 'text-center', 'render': actionRenderer},
            ],
            "initComplete": searchableDatatable
        });
        $('#oph_datatable_filter').remove();
    },
    getBasicOPHDetails: function (btnObj, feesPaymentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!feesPaymentId || !btnObj) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'utility/get_oph_data_by_id',
            type: 'post',
            data: $.extend({}, {'fees_payment_id': feesPaymentId}, getTokenData()),
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
                that.loadDVDetails(parseData);
            }
        });
    },
    loadDVDetails: function (parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var fpData = parseData.fp_data;
        var dvData = parseData.dv_data;
        showPopup();
        fpData.district_text = talukaArray[fpData.district] ? talukaArray[fpData.district] : '';
        fpData.application_number = regNoRenderer(fpData.module_type, fpData.module_id);
        fpData.department_name = getDeptName(fpData.module_type);
        fpData.service_name = getServiceName(fpData.module_type);
        fpData.service_name = getServiceName(fpData.module_type);
        fpData.transaction_datetime_text = fpData.op_transaction_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(fpData.op_transaction_datetime) : (fpData.op_start_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(fpData.op_start_datetime) : '-');
        fpData.payment_status_text = pgStatus(fpData.op_status, fpData.fees_payment_id);
        $('#popup_container').html(dvListTemplate(fpData));
        var tempDVCnt = 1;
        $.each(dvData, function (index, dv) {
            loadDVRow(dv);
            tempDVCnt++;
        });
        if (tempDVCnt == 1) {
            $('#dv_item_container').html(noRecordFoundTemplate({'colspan': 8, 'message': 'No Data Available !'}));
        }
        resetCounter('dv-cnt');
        $('.swal2-popup').css('width', '60em');
    },
    listPageForHWR: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_INSPECTIONS || tempTypeInSession == TEMP_TYPE_ISMW) {
            Dashboard.listview.listPage();
            return false;
        }
        activeLink('menu_opd');
        addClass('menu_hwr', 'active');
        Dashboard.router.navigate('head_wise_report');
        var templateData = {};
        this.$el.html(hwrListTemplate(templateData));
        datePicker();
        $('#from_date_for_hwr').val(dateTo_DD_MM_YYYY());
        this.searchHWR($('#search_btn_for_hwr'));
    },
    searchHWR: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession == TEMP_TYPE_INSPECTIONS || tempTypeInSession == TEMP_TYPE_ISMW) {
            Dashboard.listview.listPage();
            return false;
        }
        $('.h_field_for_hwr').val('');
        $('#hwr_datatable_container_for_hwr').html(hwrTableTemplate);
        var that = this;
        $('#total_online_payment_received_for_hwr').html(VALUE_ZERO);
        $('#item_container_for_hwr').html(noRecordFoundTemplate({'colspan': 16, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
        var searchData = $('#hwr_form').serializeFormJSON();
        if (!searchData.from_date_for_hwr && !searchData.to_date_for_hwr) {
            showError(fromToDateValidationMessage);
            return false;
        }
        $('#h_from_date_for_hwr').val(searchData.from_date_for_hwr);
        $('#h_to_date_for_hwr').val(searchData.to_date_for_hwr);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $('#item_container_for_hwr').html(noRecordFoundTemplate({'colspan': 16, 'message': dataTableProcessingAndNoDataMsg.loadingRecords}));
        $.ajax({
            url: 'utility/get_head_wise_report_data',
            type: 'post',
            data: $.extend({}, searchData, getTokenData()),
            error: function (textStatus, errorThrown) {
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
                $('#total_online_payment_received_for_hwr').html(VALUE_ZERO);
                $('#item_container_for_hwr').html(noRecordFoundTemplate({'colspan': 16, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
                generateNewCSRFToken();
                showError(textStatus.statusText);
            },
            success: function (response) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                $('#total_online_payment_received_for_hwr').html(VALUE_ZERO);
                var parseData = JSON.parse(response);
                if (parseData.is_logout === true) {
                    loginPage();
                    return false;
                }
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    $('#item_container_for_hwr').html(noRecordFoundTemplate({'colspan': 16, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
                    return false;
                }
                var hwrData = parseData.hwr_data;
                if (hwrData.length == VALUE_ZERO) {
                    $('#item_container_for_hwr').html(noRecordFoundTemplate({'colspan': 16, 'message': dataTableProcessingAndNoDataMsg.emptyTable}));
                    return false;
                }
                $('#item_container_for_hwr').html('');
                that.loadHWR(hwrData);
            }
        });
    },
    loadHWR: function (hwrData) {
        var tCnt = VALUE_ONE;
        var tdwCnt = VALUE_ONE;
        var thwCnt = VALUE_ONE;
        var totalORP = VALUE_ZERO;
        var totalFPORP = VALUE_ZERO;
        $.each(hwrData, function (index, hwr) {
            hwr.temp_cnt = tCnt;
            $('#item_container_for_hwr').append(hwrItemTemplate(hwr));
            totalFPORP += parseInt(hwr.fp_total) ? parseInt(hwr.fp_total) : VALUE_ZERO;
            tdwCnt = 1;
            $.each(hwr.dwise, function (index, dwiseDetails) {
                if (tdwCnt == VALUE_ONE) {
                    $('#dwise_item_container_for_hwr_' + hwr.module_type).html('<div id="hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district + '">' + dwiseDetails.district_name + '</div>');
                } else {
                    $('#item_container_for_hwr').append('<tr><td></td><td></td><td></td><td class="text-center"><div id="hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district + '">' + dwiseDetails.district_name + '</div></td>'
                            + '</tr>');
                }
                thwCnt = 1;
                $.each(dwiseDetails.head_wise, function (fullHead, hwise) {
                    totalORP += parseInt(hwise.hw_total_fees) ? parseInt(hwise.hw_total_fees) : VALUE_ZERO;
                    if (thwCnt == VALUE_ONE) {
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-right">' + hwise.hw_total_fees + '/-</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.pao_code ? hwise.pao_code : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.ddo_code ? hwise.ddo_code : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.grant_number ? hwise.grant_number : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.major_head ? hwise.major_head : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.sub_major_head ? hwise.sub_major_head : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.minor_head ? hwise.minor_head : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.sub_head ? hwise.sub_head : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.detailed_head ? hwise.detailed_head : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.object ? hwise.object : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center">' + (hwise.category ? hwise.category : '') + '</td>');
                        $('#hwise_item_container_for_hwr_' + hwr.module_type + '_' + dwiseDetails.district).parent().parent().append('<td class="text-center"><button type="button" class="btn btn-sm btn-primary" title="View" '
                                + 'onclick="Dashboard.listview.viewHWR($(this),' + hwr.module_type + ',' + dwiseDetails.district + ',\'' + fullHead + '\');" style="padding: 4px 8px 2.5px 8px;">'
                                + '<i class="fas fa-eye"></i></button></td>');
                    } else {
                        $('#item_container_for_hwr').append('<tr><td></td><td></td><td></td><td></td>'
                                + '<td class="text-right">' + hwise.hw_total_fees + '/-</td>'
                                + '<td class="text-center">' + (hwise.pao_code ? hwise.pao_code : '') + '</td>'
                                + '<td class="text-center">' + (hwise.ddo_code ? hwise.ddo_code : '') + '</td>'
                                + '<td class="text-center">' + (hwise.grant_number ? hwise.grant_number : '') + '</td>'
                                + '<td class="text-center">' + (hwise.major_head ? hwise.major_head : '') + '</td>'
                                + '<td class="text-center">' + (hwise.sub_major_head ? hwise.sub_major_head : '') + '</td>'
                                + '<td class="text-center">' + (hwise.minor_head ? hwise.minor_head : '') + '</td>'
                                + '<td class="text-center">' + (hwise.sub_head ? hwise.sub_head : '') + '</td>'
                                + '<td class="text-center">' + (hwise.detailed_head ? hwise.detailed_head : '') + '</td>'
                                + '<td class="text-center">' + (hwise.object ? hwise.object : '') + '</td>'
                                + '<td class="text-center">' + (hwise.category ? hwise.category : '') + '</td>'
                                + '<td class="text-center"><button type="button" class="btn btn-sm btn-primary" title="View" '
                                + 'onclick="Dashboard.listview.viewHWR($(this),' + hwr.module_type + ',' + dwiseDetails.district + ',\'' + fullHead + '\');" style="padding: 4px 8px 2.5px 8px;">'
                                + '<i class="fas fa-eye"></i></button></td>'
                                + '</tr>');
                    }
                    thwCnt++;
                });
                tdwCnt++;
            });
            tCnt++;
        });
//        if (totalORP != totalFPORP) {
//            $('#total_online_payment_received_for_hwr').html('<span class="text-danger">' + totalORP + '<span>');
//        } else {
        $('#total_online_payment_received_for_hwr').html(totalORP);
//        }
        $('#hwr_datatable').DataTable({
            ordering: false, paging: false, info: false, searching: false,
            dom: 'Bfrtip',
            buttons: [{
                    extend: 'csvHtml5',
                    title: 'Head Wise Report - ' + dateTo_DD_MM_YYYY_HH_II_SS(),
                    text: '<i class="fas fa-file-excel"></i> &nbsp; Download CSV',
                    footer: true
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Head Wise Report - ' + dateTo_DD_MM_YYYY_HH_II_SS(),
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    text: '<i class="fas fa-file-pdf"></i> &nbsp; Download PDF',
                    footer: true
                }
            ]
        });
    },
    viewHWR: function (btnObj, moduleType, district, fullHead) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!moduleType || (district != VALUE_ONE && district != VALUE_TWO && district != VALUE_THREE) || !fullHead) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var searchData = {};
        searchData.module_type = moduleType;
        searchData.district = district;
        searchData.full_head = fullHead;
        searchData.from_date = $('#h_from_date_for_hwr').val();
        searchData.to_date = $('#h_to_date_for_hwr').val();
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'utility/get_module_district_hwr_data',
            type: 'post',
            data: $.extend({}, searchData, getTokenData()),
            error: function (textStatus, errorThrown) {
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
                generateNewCSRFToken();
                showError(textStatus.statusText);
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
                if (parseData.success == false) {
                    showError(parseData.message);
                    return false;
                }
                var mtData = parseData.mt_data;
                var mdHWRData = parseData.md_hwr_data;
                mtData.district_text = talukaArray[district] ? talukaArray[district] : '';
                showPopup();
                $('.swal2-popup').css('width', '45em');
                $('#popup_container').html(hwrViewListTemplate(mtData));
                var totalFee = 0;
                $.each(mdHWRData, function (index, mdhwr) {
                    totalFee += parseInt(mdhwr.fee) ? parseInt(mdhwr.fee) : VALUE_ZERO;
                    $('#item_container_for_dhwr_view').append('<tr><td class="f-w-b text-center">' + (index + 1) + '</td>'
                            + '<td class="text-center">' + mdhwr.op_transaction_datetime + '</td>'
                            + '<td class="text-center">' + regNoRenderer(mdhwr.module_type, mdhwr.module_id) + '</td>'
                            + '<td class="text-right">' + mdhwr.total_fees + '/-</td>'
                            + '<td>' + mdhwr.fee_description + '</td>'
                            + '<td class="text-right">' + mdhwr.fee + '/-</td></tr>');
                });
                $('.orp_for_hwr_view').html(totalFee);

                $('#dhwr_datatable').DataTable({
                    ordering: false, paging: false, info: false, searching: false,
                    language: dataTableProcessingAndNoDataMsg,
                    dom: 'Bfrtip',
                    buttons: [{
                            extend: 'csvHtml5',
                            title: 'Detailed Head Wise Report - ' + dateTo_DD_MM_YYYY_HH_II_SS(),
                            text: '<i class="fas fa-file-excel"></i> &nbsp; Download CSV',
                            footer: true
                        },
                        {
                            extend: 'pdfHtml5',
                            title: 'Detailed Head Wise Report - ' + dateTo_DD_MM_YYYY_HH_II_SS(),
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            text: '<i class="fas fa-file-pdf"></i> &nbsp; Download PDF',
                            footer: true
                        }
                    ]
                });
            }
        });
    }
});
