var factoryLicenseListTemplate = Handlebars.compile($('#factory_license_list_template').html());
var factoryLicenseTableTemplate = Handlebars.compile($('#factory_license_table_template').html());
var factoryLicenseActionTemplate = Handlebars.compile($('#factory_license_action_template').html());
var factoryLicenseFormTemplate = Handlebars.compile($('#factory_license_form_template').html());
var factoryLicenseViewTemplate = Handlebars.compile($('#factory_license_view_template').html());
var principleProductTemplate = Handlebars.compile($('#principle_product_template').html());
var directorInfoTemplate = Handlebars.compile($('#director_info_template').html());
var employeeInfoTemplate = Handlebars.compile($('#employee_info_template').html());
var factoryLicenseUploadChallanTemplate = Handlebars.compile($('#factory_license_upload_challan_template').html());
var factoryLicenseApproveTemplate = Handlebars.compile($('#factory_license_approve_template').html());
var factoryLicenseRejectTemplate = Handlebars.compile($('#factory_license_reject_template').html());
var factoryLicenseViewPaymentTemplate = Handlebars.compile($('#factory_license_view_payment_template').html());

var tempProductCnt = 1;
var tempDirectorCnt = 1;
var tempEmployeeCnt = 1;

var FactoryLicense = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
FactoryLicense.Router = Backbone.Router.extend({
    routes: {
        'factorylicense': 'renderList',
        'factorylicense_form': 'renderListForForm',
        'edit_factorylicense_form': 'renderList',
        'view_factorylicense_form': 'renderList',
    },
    renderList: function () {
        FactoryLicense.listview.listPage();
    },
    renderListForForm: function () {
        FactoryLicense.listview.listPageFactoryLicenseForm();
    }
});
FactoryLicense.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="is_factory_exists"]': 'hasFactoryExistsEvent',
        'click input[name="factory_extend"]': 'hasFactoryExtendEvent',
    },
    hasFactoryExistsEvent: function (event) {
        var val = $('input[name=is_factory_exists]:checked').val();
        if (val === '1') {
            this.$('.factory_exists_div').show();
        } else {
            this.$('.factory_exists_div').hide();

        }
    },
    hasFactoryExtendEvent: function (event) {
        var val = $('input[name=factory_extend]:checked').val();
        if (val === '1') {
            this.$('.factory_extend_div').show();
        } else {
            this.$('.factory_extend_div').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboa&&rd', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        addClass('menu_factory_license', 'active');
        FactoryLicense.router.navigate('factorylicense');
        var templateData = {};
        this.$el.html(factoryLicenseListTemplate(templateData));
        this.loadFactoryLicenseData(sDistrict, sStatus, sAppTimingStatus);

    },
    listPageFactoryLicenseForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_factory');
        this.$el.html(factoryLicenseListTemplate);
        this.newFactoryLicenseForm(false, {});
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return factoryLicenseActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYFIVE;
        if (rowData.status == VALUE_TWO || rowData.status == VALUE_THREE || rowData.status == VALUE_FOUR || rowData.status == VALUE_EIGHT || rowData.status == VALUE_NINE) {
            rowData.show_payment_confirm_btn = '';
        } else {
            rowData.show_payment_confirm_btn = 'display: none;';
        }
        // rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        if (rowData.status != VALUE_FIVE) {
            rowData.download_certificate_style = 'display: none;';
        }
        if (rowData.rating != VALUE_ZERO && (rowData.status == VALUE_FIVE || rowData.status == VALUE_SIX)) {
            rowData.show_fr_btn = true;
        }
        return factoryLicenseActionTemplate(rowData);
    },
    loadFactoryLicenseData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.name_of_factory + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.work_carried;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_THIRTYFIVE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYFIVE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['factory_license_data'], function (index, objData) {
                json['factory_license_data'][index]['query_movement_string'] = qmData[objData.factorylicence_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.factorylicence_id] + '</table>') : '-';
            });
            return json['factory_license_data'];
        };
        var that = this;
        FactoryLicense.router.navigate('factorylicense');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'FactoryLicense.listview.loadFactoryLicenseData();');
        $('#factory_license_form_and_datatable_container').html(factoryLicenseTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_factory_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_factory_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_factory_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_factory_list', false);
        allowOnlyIntegerValue('mobile_number_for_factory_list');
        //  if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_factory_list', false);
        $('#district_for_factory_list').val(searchData.search_district);
        $('#status_for_factory_list').val(searchData.search_status);
        $('#app_timing_for_factory_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_factory_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_factory_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_factory_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_factory_list').attr('disabled', 'disabled');
        }
        factoryLicenseDataTable = $('#factory_license_datatable').DataTable({
            ajax: {url: 'factorylicense/get_factory_license_data', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'factorylicence_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 'factorylicence_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 'factorylicence_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 'factorylicence_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        // } 
        $('#factory_license_datatable_filter').remove();
        $('#factory_license_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = factoryLicenseDataTable.row(tr);

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
    askForNewFactoryLicenseForm: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        that.newFactoryLicenseForm(false, {});
    },
    newFactoryLicenseForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }

        var that = this;
        if (isEdit) {
            var formData = parseData.factory_license_data;
            FactoryLicense.router.navigate('edit_factorylicense_form');
        } else {
            var formData = {};
            FactoryLicense.router.navigate('factorylicense_form');
        }

        tempProductCnt = 1;
        tempDirectorCnt = 1;
        tempEmployeeCnt = 1;
        var that = this;
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.factoryLicense_data = parseData.factory_license_data;
        if (isEdit) {
            templateData['factoryLicense_data']['date_of_approval'] = dateTo_DD_MM_YYYY(templateData['factoryLicense_data']['date_of_approval']);
        }
        $('#factory_license_form_and_datatable_container').html(factoryLicenseFormTemplate((templateData)));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        if (isEdit) {
            $('#district').val(formData.district);
            $('#entity_establishment_type').val(formData.entity_establishment_type);
            $('#declarationone').attr('checked', 'checked');
            $('#declarationtwo').attr('checked', 'checked');

            var directorInfo = JSON.parse(formData.director_info);
            $.each(directorInfo, function (key, value) {
                that.addMultipleDirector(value);
            })

            var managingdirectorInfo = JSON.parse(formData.managing_director_info);
            $.each(managingdirectorInfo, function (key, value) {
                that.addMultipleEmployee(value);
            })

            var productInfo = JSON.parse(formData.product_data);
            $.each(productInfo, function (key, value) {
                that.addMultiplePrincipleProduct(value);
            })

            if (formData.is_factory_exists == IS_CHECKED_YES) {
                $('#is_factory_exists').attr('checked', 'checked');
                this.$('.factory_exists_div').show();
            }
            if (formData.factory_extend == IS_CHECKED_YES) {
                $('#factory_extend').attr('checked', 'checked');
                this.$('.factory_extend_div').show();
            }

            if (formData.form_two_copy != '') {
                $('#form_two_copy_container_for_fl').hide();
                $('#form_two_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.form_two_copy);
                $('#form_two_copy_name_container_for_fl').show();
                $('#form_two_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.form_two_copy);
            }
            if (formData.occupancy_certificate != '') {
                $('#occupancy_certificate_container_for_fl').hide();
                $('#occupancy_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.occupancy_certificate);
                $('#occupancy_certificate_name_container_for_fl').show();
                $('#occupancy_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.occupancy_certificate);
            }
            if (formData.stability_certificate != '') {
                $('#stability_certificate_container_for_fl').hide();
                $('#stability_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.stability_certificate);
                $('#stability_certificate_name_container_for_fl').show();
                $('#stability_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.stability_certificate);
            }
            if (formData.safety_equipments_list != '') {
                $('#safety_equipments_list_container_for_fl').hide();
                $('#safety_equipments_list_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.safety_equipments_list);
                $('#safety_equipments_list_name_container_for_fl').show();
                $('#safety_equipments_list_name_download').attr("href", FACTORY_DOC_PATH + formData.safety_equipments_list);
            }
            if (formData.machinery_layout != '') {
                $('#machinery_layout_container_for_fl').hide();
                $('#machinery_layout_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.machinery_layout);
                $('#machinery_layout_name_container_for_fl').show();
                $('#machinery_layout_name_download').attr("href", FACTORY_DOC_PATH + formData.machinery_layout);
            }
            if (formData.approved_plan_copy != '') {
                $('#approved_plan_copy_container_for_fl').hide();
                $('#approved_plan_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.approved_plan_copy);
                $('#approved_plan_copy_name_container_for_fl').show();
                $('#approved_plan_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.approved_plan_copy);
            }
            if (formData.safety_provision != '') {
                $('#safety_provision_container_for_fl').hide();
                $('#safety_provision_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.safety_provision);
                $('#safety_provision_name_container_for_fl').show();
                $('#safety_provision_name_download').attr("href", FACTORY_DOC_PATH + formData.safety_provision);
            }
            if (formData.copy_of_site_plans != '') {
                $('#copy_of_site_plans_container_for_fl').hide();
                $('#copy_of_site_plans_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.copy_of_site_plans);
                $('#copy_of_site_plans_name_container_for_fl').show();
                $('#copy_of_site_plans_name_download').attr("href", FACTORY_DOC_PATH + formData.copy_of_site_plans);
            }
            if (formData.plan_approval != '') {
                $('#plan_approval_container_for_fl').hide();
                $('#plan_approval_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.plan_approval);
                $('#plan_approval_name_container_for_fl').show();
                $('#plan_approval_name_download').attr("href", FACTORY_DOC_PATH + formData.plan_approval);
            }
            if (formData.self_certificate != '') {
                $('#self_certificate_container_for_fl').hide();
                $('#self_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.self_certificate);
                $('#self_certificate_name_container_for_fl').show();
                $('#self_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.self_certificate);
            }
            if (formData.project_report != '') {
                $('#project_report_container_for_fl').hide();
                $('#project_report_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.project_report);
                $('#project_report_name_container_for_fl').show();
                $('#project_report_name_download').attr("href", FACTORY_DOC_PATH + formData.project_report);
            }
            if (formData.land_document_copy != '') {
                $('#land_document_copy_container_for_fl').hide();
                $('#land_document_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.land_document_copy);
                $('#land_document_copy_name_container_for_fl').show();
                $('#land_document_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.land_document_copy);
            }
            if (formData.ssi_registration_copy != '') {
                $('#ssi_registration_copy_container_for_fl').hide();
                $('#ssi_registration_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.ssi_registration_copy);
                $('#ssi_registration_copy_name_container_for_fl').show();
                $('#ssi_registration_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.ssi_registration_copy);
            }
            if (formData.detail_of_etp != '') {
                $('#detail_of_etp_container_for_fl').hide();
                $('#detail_of_etp_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.detail_of_etp);
                $('#detail_of_etp_name_container_for_fl').show();
                $('#detail_of_etp_name_download').attr("href", FACTORY_DOC_PATH + formData.detail_of_etp);
            }
            if (formData.questionnaire_copy != '') {
                $('#questionnaire_copy_container_for_fl').hide();
                $('#questionnaire_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.questionnaire_copy);
                $('#questionnaire_copy_name_container_for_fl').show();
                $('#questionnaire_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.questionnaire_copy);
            }
            if (formData.sign_of_occupier != '') {
                $('#seal_and_stamp_container_for_fl').hide();
                $('#seal_and_stamp_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_occupier);
                $('#seal_and_stamp_name_container_for_fl').show();
                $('#seal_and_stamp_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_occupier);
            }
        } else {
            that.addMultipleDirector({});
            that.addMultipleEmployee({});
        }

        generateSelect2();
        datePicker();
        $('#factory_license_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitFactoryLicense($('#submit_btn_for_factory_license'));
            }
        });
    },
    editOrViewFactoryLicense: function (btnObj, factoryLicenseId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_FB && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!factoryLicenseId) {
            showError(invalidIdValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense/get_factory_license_data_by_id',
            type: 'post',
            data: $.extend({}, {'factorylicense_id': factoryLicenseId}, getTokenData()),
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
                if (isEdit) {
                    that.newFactoryLicenseForm(isEdit, parseData);
                } else {
                    that.viewFactoryLicenseForm(parseData);
                }
            }
        });
    },
    viewFactoryLicenseForm: function (parseData) {
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
        var formData = parseData.factory_license_data;
        FactoryLicense.router.navigate('view_factorylicense_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        formData.date_of_approval = dateTo_DD_MM_YYYY(formData.date_of_approval);
        $('#factory_license_form_and_datatable_container').html(factoryLicenseViewTemplate(formData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(formData.district);
        $('#entity_establishment_type').val(formData.entity_establishment_type);

        if (formData.form_two_copy != '') {
            $('#form_two_copy_container_for_fl').hide();
            $('#form_two_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.form_two_copy);
            $('#form_two_copy_name_container_for_fl').show();
            $('#form_two_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.form_two_copy);
        }
        if (formData.occupancy_certificate != '') {
            $('#occupancy_certificate_container_for_fl').hide();
            $('#occupancy_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.occupancy_certificate);
            $('#occupancy_certificate_name_container_for_fl').show();
            $('#occupancy_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.occupancy_certificate);
        }
        if (formData.stability_certificate != '') {
            $('#stability_certificate_container_for_fl').hide();
            $('#stability_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.stability_certificate);
            $('#stability_certificate_name_container_for_fl').show();
            $('#stability_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.stability_certificate);
        }
        if (formData.safety_equipments_list != '') {
            $('#safety_equipments_list_container_for_fl').hide();
            $('#safety_equipments_list_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.safety_equipments_list);
            $('#safety_equipments_list_name_container_for_fl').show();
            $('#safety_equipments_list_name_download').attr("href", FACTORY_DOC_PATH + formData.safety_equipments_list);
        }
        if (formData.machinery_layout != '') {
            $('#machinery_layout_container_for_fl').hide();
            $('#machinery_layout_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.machinery_layout);
            $('#machinery_layout_name_container_for_fl').show();
            $('#machinery_layout_name_download').attr("href", FACTORY_DOC_PATH + formData.machinery_layout);
        }
        if (formData.approved_plan_copy != '') {
            $('#approved_plan_copy_container_for_fl').hide();
            $('#approved_plan_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.approved_plan_copy);
            $('#approved_plan_copy_name_container_for_fl').show();
            $('#approved_plan_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.approved_plan_copy);
        }
        if (formData.safety_provision != '') {
            $('#safety_provision_container_for_fl').hide();
            $('#safety_provision_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.safety_provision);
            $('#safety_provision_name_container_for_fl').show();
            $('#safety_provision_name_download').attr("href", FACTORY_DOC_PATH + formData.safety_provision);
        }
        if (formData.copy_of_site_plans != '') {
            $('#copy_of_site_plans_container_for_fl').hide();
            $('#copy_of_site_plans_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.copy_of_site_plans);
            $('#copy_of_site_plans_name_container_for_fl').show();
            $('#copy_of_site_plans_name_download').attr("href", FACTORY_DOC_PATH + formData.copy_of_site_plans);
        }
        if (formData.plan_approval != '') {
            $('#plan_approval_container_for_fl').hide();
            $('#plan_approval_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.plan_approval);
            $('#plan_approval_name_container_for_fl').show();
            $('#plan_approval_name_download').attr("href", FACTORY_DOC_PATH + formData.plan_approval);
        }
        if (formData.self_certificate != '') {
            $('#self_certificate_container_for_fl').hide();
            $('#self_certificate_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.self_certificate);
            $('#self_certificate_name_container_for_fl').show();
            $('#self_certificate_name_download').attr("href", FACTORY_DOC_PATH + formData.self_certificate);
        }
        if (formData.project_report != '') {
            $('#project_report_container_for_fl').hide();
            $('#project_report_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.project_report);
            $('#project_report_name_container_for_fl').show();
            $('#project_report_name_download').attr("href", FACTORY_DOC_PATH + formData.project_report);
        }
        if (formData.land_document_copy != '') {
            $('#land_document_copy_container_for_fl').hide();
            $('#land_document_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.land_document_copy);
            $('#land_document_copy_name_container_for_fl').show();
            $('#land_document_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.land_document_copy);
        }
        if (formData.ssi_registration_copy != '') {
            $('#ssi_registration_copy_container_for_fl').hide();
            $('#ssi_registration_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.ssi_registration_copy);
            $('#ssi_registration_copy_name_container_for_fl').show();
            $('#ssi_registration_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.ssi_registration_copy);
        }
        if (formData.detail_of_etp != '') {
            $('#detail_of_etp_container_for_fl').hide();
            $('#detail_of_etp_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.detail_of_etp);
            $('#detail_of_etp_name_container_for_fl').show();
            $('#detail_of_etp_name_download').attr("href", FACTORY_DOC_PATH + formData.detail_of_etp);
        }
        if (formData.questionnaire_copy != '') {
            $('#questionnaire_copy_container_for_fl').hide();
            $('#questionnaire_copy_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.questionnaire_copy);
            $('#questionnaire_copy_name_container_for_fl').show();
            $('#questionnaire_copy_name_download').attr("href", FACTORY_DOC_PATH + formData.questionnaire_copy);
        }
        if (formData.sign_of_occupier != '') {
            $('#seal_and_stamp_container_for_fl').hide();
            $('#seal_and_stamp_name_image_for_fl').attr('src', FACTORY_DOC_PATH + formData.sign_of_occupier);
            $('#seal_and_stamp_name_container_for_fl').show();
            $('#seal_and_stamp_download').attr("href", FACTORY_DOC_PATH + formData.sign_of_occupier);
        }

        var directorInfo = JSON.parse(formData.director_info);
        $.each(directorInfo, function (key, value) {
            that.addMultipleDirector(value);
        })

        var managingdirectorInfo = JSON.parse(formData.managing_director_info);
        $.each(managingdirectorInfo, function (key, value) {
            that.addMultipleEmployee(value);
        })

        var productInfo = JSON.parse(formData.product_data);
        $.each(productInfo, function (key, value) {
            that.addMultiplePrincipleProduct(value);
        })

        if (formData.is_factory_exists == IS_CHECKED_YES) {
            $('#is_factory_exists').attr('checked', 'checked');
            this.$('.factory_exists_div').show();
        }
        if (formData.factory_extend == IS_CHECKED_YES) {
            $('#factory_extend').attr('checked', 'checked');
            this.$('.factory_extend_div').show();
        }
    },
    checkValidationForFactoryLicense: function (factoryLicenseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!factoryLicenseData.district) {
            return getBasicMessageAndFieldJSONArray('district', selectDistrictValidationMessage);
        }
        if (!factoryLicenseData.name_of_factory) {
            return getBasicMessageAndFieldJSONArray('name_of_factory', factoryNameValidationMessage);
        }
        if (!factoryLicenseData.factory_address) {
            return getBasicMessageAndFieldJSONArray('factory_address', factoryAddressValidationMessage);
        }
        if (!factoryLicenseData.factory_postal_address) {
            return getBasicMessageAndFieldJSONArray('factory_postal_address', factoryPostalAddressValidationMessage);
        }
        if (!factoryLicenseData.work_carried) {
            return getBasicMessageAndFieldJSONArray('work_carried', manufacturingNatureValidationMessage);
        }
        if (!factoryLicenseData.max_no_of_worker_year) {
            return getBasicMessageAndFieldJSONArray('max_no_of_worker_year', maxWorkerValidationMessage);
        }
        // if (!factoryLicenseData.no_of_ordinarily_emp) {
        //     return getBasicMessageAndFieldJSONArray('no_of_ordinarily_emp', maxWorkerValidationMessage);
        // }
        if (!factoryLicenseData.total_power_install) {
            return getBasicMessageAndFieldJSONArray('total_power_install', powerValidationMessage);
        }
        if (!factoryLicenseData.total_power_used) {
            return getBasicMessageAndFieldJSONArray('total_power_used', powerValidationMessage);
        }
        if (!factoryLicenseData.max_power_to_be_used) {
            return getBasicMessageAndFieldJSONArray('max_power_to_be_used', maxPowerValidationMessage);
        }
        if (!factoryLicenseData.manager_detail) {
            return getBasicMessageAndFieldJSONArray('manager_detail', managerValidationMessage);
        }
        if (!factoryLicenseData.occupier_detail) {
            return getBasicMessageAndFieldJSONArray('occupier_detail', occupierValidationMessage);
        }
        if (!factoryLicenseData.proprietor_of_factory) {
            return getBasicMessageAndFieldJSONArray('proprietor_of_factory', factoryProprietorValidationMessage);
        }
        if (!factoryLicenseData.share_holders) {
            return getBasicMessageAndFieldJSONArray('share_holders', shareHolderValidationMessage);
        }
        if (!factoryLicenseData.chief_head) {
            return getBasicMessageAndFieldJSONArray('chief_head', chiefHeadValidationMessage);
        }
        if (!factoryLicenseData.owner_detail) {
            return getBasicMessageAndFieldJSONArray('owner_detail', ownerValidationMessage);
        }

        if (factoryLicenseData.is_factory_exists == isChecked) {
            if (!factoryLicenseData.factory_license_no) {
                return getBasicMessageAndFieldJSONArray('factory_license_no', factoryLicenseNoValidationMessage);
            }
            if (!factoryLicenseData.nature_of_work) {
                return getBasicMessageAndFieldJSONArray('nature_of_work', manufacturingNatureValidationMessage);
            }
            if (!factoryLicenseData.max_no_of_worker_month) {
                return getBasicMessageAndFieldJSONArray('max_no_of_worker_month', maxWorkerValidationMessage);
            }
        }
        if (factoryLicenseData.factory_extend == isChecked) {
            if (!factoryLicenseData.reference_no) {
                return getBasicMessageAndFieldJSONArray('reference_no', referenceNoValidationMessage);
            }
            if (!factoryLicenseData.date_of_approval) {
                return getBasicMessageAndFieldJSONArray('date_of_approval', approvalDateValidationMessage);
            }
            if (!factoryLicenseData.disposal_waste) {
                return getBasicMessageAndFieldJSONArray('disposal_waste', disposal_waste);
            }
            if (!factoryLicenseData.name_of_authority) {
                return getBasicMessageAndFieldJSONArray('name_of_authority', authorityNameValidationMessage);
            }
        }

        return '';
    },
    askForSubmitFactoryLicense: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'FactoryLicense.listview.submitFactoryLicense(\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Submit');
    },
    submitFactoryLicense: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var factoryLicenseData = $('#factory_license_form').serializeFormJSON();
        var validationData = that.checkValidationForFactoryLicense(factoryLicenseData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('factory-license-' + validationData.field, validationData.message);
            return false;
        }

        // if (!factoryLicenseData.temp_sign_of_occupier) {
        //     if (!$('#sign_of_occupier').val()) {
        //         if (imagePdfUploadValidation('sign_of_occupier', occupierSignValidationMessage, true)) {
        //             return false;
        //         }
        //     }
        // }

        var directorsInfoItem = [];
        var managingDirectorsInfoItem = [];
        var principleProductInfoItem = [];
        var isdirectorInfoValidation = false;
        var isManagingDirectorValidation = false;
        var isProductInfoValidation = false;
        $('.director_info').each(function () {
            var tempcnt = $(this).find('.temp_cnt').val();
            var directorsItem = {};
            var directorInfo = $('#director_name_' + tempcnt).val();
            // if (directorInfo == '' || directorInfo == null) {
            //     $('#director_name_' + tempcnt).focus();
            //     validationMessageShow('factory-license-' + tempcnt, directorNameValidationMessage);
            //     isdirectorInfoValidation = true;
            //     return false;
            // }
            directorsItem.director_name = directorInfo;
            directorsInfoItem.push(directorsItem);
        });

        $('.employee_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var managingDirectorsItem = {};
            var managerName = $('#manager_name_' + cnt).val();
            // if (managerName == '' || managerName == null) {
            //     $('#manager_name_' + cnt).focus();
            //     validationMessageShow('factory-license-' + cnt, managerNameValidationMessage);
            //     isManagingDirectorValidation = true;
            //     return false;
            // }
            managingDirectorsItem.manager_name = managerName;

            var managingDirName = $('#managing_director_name_' + cnt).val();
            // if (managingDirName == '' || managingDirName == null) {
            //     $('#managing_director_name_' + cnt).focus();
            //     validationMessageShow('factory-license-' + cnt, managingDirNameValidationMessage);
            //     isManagingDirectorValidation = true;
            //     return false;
            // }
            managingDirectorsItem.managing_director_name = managingDirName;
            managingDirectorsInfoItem.push(managingDirectorsItem);
        });


        if (factoryLicenseData.is_factory_exists == isChecked) {
            $('.principle_product_info').each(function () {
                var cnt = $(this).find('.temp_cnt').val();
                var productInfoItem = {};
                var productName = $('#product_name_' + cnt).val();
                if (productName == '' || productName == null) {
                    $('#product_name_' + cnt).focus();
                    validationMessageShow('factory-license-' + cnt, productNameValidationMessage);
                    isProductInfoValidation = true;
                    return false;
                }
                productInfoItem.product_name = productName;

                var productValue = $('#product_value_' + cnt).val();
                if (productValue == '' || productValue == null) {
                    $('#product_value_' + cnt).focus();
                    validationMessageShow('factory-license-' + cnt, productValueValidationMessage);
                    isProductInfoValidation = true;
                    return false;
                }
                productInfoItem.product_value = productValue;
                principleProductInfoItem.push(productInfoItem);
            });
        }

        // if (isdirectorInfoValidation) {
        //     return false;
        // }
        // if (isManagingDirectorValidation) {
        //     return false;
        // }
        if (isProductInfoValidation) {
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_factory') : $('#submit_btn_for_factory');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var factoryLicenseData = new FormData($('#factory_license_form')[0]);
        factoryLicenseData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        factoryLicenseData.append("directors_data", JSON.stringify(directorsInfoItem));
        factoryLicenseData.append("managing_directors_data", JSON.stringify(managingDirectorsInfoItem));
        factoryLicenseData.append("product_data", JSON.stringify(principleProductInfoItem));
        factoryLicenseData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'factorylicense/submit_factory_license',
            data: factoryLicenseData,
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
                validationMessageShow('factorylicense', textStatus.statusText);
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
                    validationMessageShow('factorylicense', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                FactoryLicense.router.navigate('factorylicense', {'trigger': true});
            }
        });
    },
    addMultiplePrincipleProduct: function (templateData) {
        templateData.prod_cnt = tempProductCnt;
        $('#principle_product_info_container').append(principleProductTemplate(templateData));
        tempProductCnt++;
        resetCounter('display-cnt');
    },
    removeProductInfo: function (prodCnt) {
        $('#principle_product_info_' + prodCnt).remove();
        resetCounter('display-cnt');
    },

    addMultipleDirector: function (templateData) {
        templateData.director_cnt = tempDirectorCnt;
        $('#director_info_container').append(directorInfoTemplate(templateData));
        tempDirectorCnt++;
        resetCounter('display-cnt-dir');
    },
    removeDirectorInfo: function (dirCnt) {
        $('#director_info_' + dirCnt).remove();
        resetCounter('display-cnt-dir');
    },

    addMultipleEmployee: function (templateData) {
        templateData.emp_cnt = tempEmployeeCnt;
        $('#employee_info_container').append(employeeInfoTemplate(templateData));
        tempEmployeeCnt++;
        resetCounter('display-cnt-emp');
    },
    removeEmployeeInfo: function (empCnt) {
        $('#employee_info_' + empCnt).remove();
        resetCounter('display-cnt-emp');
    },
    viewDocumentFile: function (FileName, factorylicenseId, postId, postContainer, dbFileNameField, isVisible = true) {
        if (!FileName) {
            $('#' + postId).show();
        } else {
            var pdfItemContainer = '<a href="' + labourdddBaseUrl + 'documents/factorylicense/' + factorylicenseId + '/' + FileName + '?ts=' + $.now() + '" target="_blank">' +
                    '<img src= ' + labourdddBaseUrl + 'documents/factorylicense/' + factorylicenseId + '/' + FileName + ' style=width:250px;height:250px></a>'
            if (isVisible) {
                pdfItemContainer += '<button type="button" class="btn btn-sm btn-danger" style="vertical-align: top;" onclick="FactoryLicense.listview.askForDeleteforDocumentFile(' + factorylicenseId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\');"> <i class="fas fa-trash" style="padding-right: 4px;"></i> Remove</button>'
            }
            $('#' + postContainer).html(pdfItemContainer);
            $('#' + postId).hide();
            $('#' + postContainer).show();
    }
    },
    askForDeleteforDocumentFile: function (factorylicenseId, dbFileNameField, postId, postContainer) {
        if (!factorylicenseId) {
            showError('Please select proper Upload File');
            $('html, body').animate({scrollTop: '0px'}, 0)
            return false;
        }
        var noEvent = "$(this).closest('.stack-bar-bottom').hide();";
        var yesEvent = 'FactoryLicense.listview.deleteDocumentFile(' + factorylicenseId + ',\'' + dbFileNameField + '\',\'' + postId + '\',\'' + postContainer + '\')';
        showConfirmation(yesEvent, 'remove');
    },
    deleteDocumentFile: function (factorylicenseId, dbFileNameField, postId, postContainer) {
        if (!factorylicenseId) {
            showError('Please select proper Upload Document File');
            return false;
        }
        $.ajax({
            url: 'factorylicense/delete_upload_file_for_factory',
            type: 'POST',
            data: $.extend({}, {'factorylicense_id': factorylicenseId, 'dbFileNameField': dbFileNameField}, getTokenData()),
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
    generateForm1: function (factoryLicenseId) {
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#factorylicense_id_for_factorylicense_form1').val(factoryLicenseId);
        $('#factorylicense_form1_pdf_form').submit();
        $('#factorylicense_id_for_factorylicense_form1').val('');
    },
    openUploadChallan: function (factoryLicenseId) {
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + factoryLicenseId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense/get_factorylicense_data_by_factorylicense_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_id': factoryLicenseId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var factoryLicenseData = parseData.factory_license_data;
                showPopup();
                if (factoryLicenseData.payment_type == VALUE_ONE) {
                    factoryLicenseData.utitle = 'Challan Copy';
                } else {
                    factoryLicenseData.utitle = 'Payment Details';
                }
                factoryLicenseData.module_type = VALUE_THIRTYFIVE;
                $('#popup_container').html(factoryLicenseUploadChallanTemplate(factoryLicenseData));
                loadFB(VALUE_THIRTYFIVE, parseData.fb_data, factoryLicenseData.payment_type, factoryLicenseData.show_remove_upload_btn, factoryLicenseData.show_dropdown, factoryLicenseData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'factory_license_upload_challan', factoryLicenseData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'factory_license_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYFIVE);
                if (factoryLicenseData.challan != '') {
                    $('#challan_container_for_factory_license_upload_challan').hide();
                    $('#challan_name_container_for_factory_license_upload_challan').show();
                    $('#challan_name_href_for_factory_license_upload_challan').attr('href', 'documents/factorylicense/' + factoryLicenseData.challan);
                    $('#challan_name_for_factory_license_upload_challan').html(factoryLicenseData.challan);
                    $('#challan_remove_btn_for_factory_license_upload_challan').attr('onclick', 'FactoryLicense.listview.removeChallan("' + factoryLicenseData.factorylicence_id + '")');
                }
            }
        });
    },
    removeChallan: function (factoryLicenseId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense/remove_challan',
            data: $.extend({}, {'factorylicence_id': factoryLicenseId}, getTokenData()),
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
                validationMessageShow('factory-license-uc', textStatus.statusText);
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
                    validationMessageShow('factory-license-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-factory-license-uc').html(parseData.message);
                removeDocument('challan', 'factory_license_upload_challan');
                $('#status_' + factoryLicenseId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-factory-license-uc').html('');
        validationMessageHide();
        var factoryLicenseId = $('#factorylicence_id_for_factory_license_upload_challan').val();
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_factory_license_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_factory_license_upload_challan_1').focus();
            validationMessageShow('factory-license-uc-payment_type_for_factory_license_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_factory_license_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_factory_license_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_factory_license_upload_challan').focus();
                validationMessageShow('factory-license-uc-challan_for_factory_license_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_factory_license_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_factory_license_upload_challan').focus();
                validationMessageShow('factory-license-uc-challan_for_factory_license_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYFIVE, 'factory-license-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_factory_license_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#factory_license_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense/upload_challan',
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
                validationMessageShow('factory-license-uc', textStatus.statusText);
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
                    validationMessageShow('factory-license-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + factoryLicenseId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + factoryLicenseId).show();
                }
                $('#total_fees_' + factoryLicenseId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (factoryLicenseId) {
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_app_' + factoryLicenseId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense/get_factorylicense_data_by_factorylicense_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_id': factoryLicenseId}, getTokenData()),
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
                var factoryLicenseData = parseData.factory_license_data;
                showPopup();
                $('#popup_container').html(factoryLicenseApproveTemplate(factoryLicenseData));
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
        var formData = $('#approve_factory_license_form').serializeFormJSON();
        if (!formData.factory_license_id_for_factory_license_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_factory_license_approve) {
            $('#registration_number_for_factory_license_approve').focus();
            validationMessageShow('factory-license-approve-registration_number_for_factory_license_approve', establishmentRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_factory_license_approve) {
            $('#valid_upto_for_factory_license_approve').focus();
            validationMessageShow('factory-license-approve-valid_upto_for_factory_license_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_factory_license_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_factory_license_approve').focus();
            validationMessageShow('factory-license-approve-certificate_file_for_factory_license_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_factory_license_approve) {
            $('#remarks_for_factory_license_approve').focus();
            validationMessageShow('factory-license-approve-remarks_for_factory_license_approve', remarksValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_factory_license_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_factory_license_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'factorylicense/approve_application',
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
                validationMessageShow('factory-license-approve', textStatus.statusText);
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
                    validationMessageShow('factory-license-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.factory_license_id_for_factory_license_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.factory_license_id_for_factory_license_approve).remove();
                $('#approve_btn_for_app_' + formData.factory_license_id_for_factory_license_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.factory_license_id_for_factory_license_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.factory_license_id_for_factory_license_approve).show();
                $('#so_status_' + formData.factory_license_id_for_factory_license_approve).html(dateTimeDays(formData.factory_license_id_for_factory_license_approve, parseData, VALUE_THIRTYFIVE));
            }
        });
    },
    askForRejectApplication: function (factoryLicenseId) {
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_app_' + factoryLicenseId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense/get_factorylicense_data_by_factorylicense_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_id': factoryLicenseId}, getTokenData()),
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
                var factoryLicenseData = parseData.factory_license_data;
                showPopup();
                $('#popup_container').html(factoryLicenseRejectTemplate(factoryLicenseData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_factory_license_form').serializeFormJSON();
        if (!formData.factory_license_id_for_factory_license_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_factory_license_reject) {
            $('#remarks_for_factory_license_reject').focus();
            validationMessageShow('factory-license-reject-remarks_for_factory_license_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'factorylicense/reject_application',
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
                validationMessageShow('factory-license-reject', textStatus.statusText);
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
                    validationMessageShow('factory-license-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);

                $('#status_' + formData.factory_license_id_for_factory_license_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.factory_license_id_for_factory_license_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.factory_license_id_for_factory_license_reject).remove();
                $('#reject_btn_for_app_' + formData.factory_license_id_for_factory_license_reject).remove();
                $('#approve_btn_for_app_' + formData.factory_license_id_for_factory_license_reject).remove();
                $('#so_status_' + formData.factory_license_id_for_factory_license_reject).html(dateTimeDays(formData.factory_license_id_for_factory_license_reject, parseData, VALUE_THIRTYFIVE));
            }
        });
    },
    generateCertificate: function (factoryLicenseId) {
        if (!factoryLicenseId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $('#factorylicense_id_for_certificate').val(factoryLicenseId);
        $('#factorylicense_certificate_pdf_form').submit();
        $('#factorylicense_id_for_certificate').val('');
    },
    getQueryData: function (factorylicenceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!factorylicenceId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYFIVE;
        templateData.module_id = factorylicenceId;
        var btnObj = $('#query_btn_for_app_' + factorylicenceId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYFIVE, moduleData.factorylicence_id);
                tmpData.applicant_name = moduleData.name_of_factory;
                tmpData.title = 'Factory Name';
                tmpData.module_type = VALUE_THIRTYFIVE;
                tmpData.module_id = factorylicenceId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (factorylicenceId) {
        if (!factorylicenceId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + factorylicenceId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'factorylicense/get_factorylicense_data_by_factorylicense_id',
            type: 'post',
            data: $.extend({}, {'factorylicence_id': factorylicenceId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var factoryLicenseData = parseData.factory_license_data;
                showPopup();
                if (factoryLicenseData.payment_type == VALUE_ONE || factoryLicenseData.payment_type == VALUE_THREE) {
                    factoryLicenseData.user_payment_type_text = paymentTypeArray[factoryLicenseData.payment_type];
                } else {
                    factoryLicenseData.user_payment_type_text = userPaymentTypeArray[factoryLicenseData.user_payment_type] ? userPaymentTypeArray[factoryLicenseData.user_payment_type] : '';
                }
                if (factoryLicenseData.payment_type == VALUE_ONE) {
                    factoryLicenseData.utitle = 'Fees Paid Challan Copy';
                } else if (factoryLicenseData.payment_type == VALUE_TWO && factoryLicenseData.user_payment_type == VALUE_ONE) {
                    factoryLicenseData.utitle = 'Demand Draft (DD) Copy';
                }
                factoryLicenseData.module_type = VALUE_THIRTYFIVE;
                $('#popup_container').html(factoryLicenseViewPaymentTemplate(factoryLicenseData));
                loadFB(VALUE_THIRTYFIVE, parseData.fb_data, factoryLicenseData.payment_type);
                loadPH(VALUE_THIRTYFIVE, factoryLicenseData.factorylicence_id, parseData.ph_data);
                if (factoryLicenseData.payment_type == VALUE_ONE || (factoryLicenseData.payment_type == VALUE_TWO && factoryLicenseData.user_payment_type == VALUE_ONE)) {
                    if (factoryLicenseData.fees_paid_challan != '') {
                        $('#vp_container_for_factory_license').show();
                        $('#fees_paid_challan_name_href_for_factory_license').attr('href', FACTORY_DOC_PATH + factoryLicenseData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_factory_license').html(factoryLicenseData.fees_paid_challan);
                    }
                }
            }
        });
    },
});
