var shopListTemplate = Handlebars.compile($('#shop_list_template').html());
var shopTableTemplate = Handlebars.compile($('#shop_table_template').html());
var shopActionTemplate = Handlebars.compile($('#shop_action_template').html());
var shopFormTemplate = Handlebars.compile($('#shop_form_template').html());
var shopViewTemplate = Handlebars.compile($('#shop_view_template').html());
var shopUploadChallanTemplate = Handlebars.compile($('#shop_upload_challan_template').html());
var shopApproveTemplate = Handlebars.compile($('#shop_approve_template').html());
var shopRejectTemplate = Handlebars.compile($('#shop_reject_template').html());
var shopViewPaymentTemplate = Handlebars.compile($('#shop_view_payment_template').html());
var shopEmployeesViewItemTemplate = Handlebars.compile($('#shop_employees_view_item_template').html());
var shopEmployerFamilyViewItemTemplate = Handlebars.compile($('#shop_employer_family_item_template').html());
var shopEmployerFamilyInfoItemTemplate = Handlebars.compile($('#shop_employer_family_info_item_template').html());
var shopPartnerInfoItemTemplate = Handlebars.compile($('#shop_partner_info_item_template').html());
var shopEmployeesInfoItemTemplate = Handlebars.compile($('#shop_employees_info_item_template').html());
var tempContractorCnt = 1;
var tempEmployeesCnt = 1;
var tempPartnerCnt = 1;

var Shop = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};

Shop.Router = Backbone.Router.extend({
    routes: {
        'shop': 'renderList'
    },
    renderList: function () {
        Shop.listview.listPage();
    }
});

Shop.listView = Backbone.View.extend({
    el: 'div#main_container',
    events: {
        'click input[name="different_location_for_shop"]': 'hasDifferentLocationShopEvent',
    },
    hasDifferentLocationShopEvent: function (event) {
        var val = $('input[name=different_location_for_shop]:checked').val();
        if (val == IS_CHECKED_YES) {
            this.$('.shop_defferent_location').show();
        } else {
            this.$('.shop_defferent_location').hide();

        }
    },
    listPage: function (sDistrict, sStatus, sAppTimingStatus) {
        datePicker();
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_labour');
        addClass('menu_shop_and_establishment', 'active');
        Shop.router.navigate('shop');
        var templateData = {};
        this.$el.html(shopListTemplate(templateData));
        this.loadShopData(sDistrict, sStatus, sAppTimingStatus);
    },
    actionRenderer: function (rowData) {
        if (tempTypeInSession == TEMP_TYPE_VDD) {
            rowData.show_reject_btn = 'display: none;';
            rowData.show_approve_btn = 'display: none;';
            rowData.download_certificate_style = 'display: none;';
            rowData.show_payment_confirm_btn = 'display: none;';
            return shopActionTemplate(rowData);
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
        rowData.module_type = VALUE_THIRTYTHREE;
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
        return shopActionTemplate(rowData);
    },
    loadShopData: function (sDistrict, sStatus, sAppTimingStatus) {
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
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.s_name + '<br><b><i class="fas fa-list-ul f-s-10px"></i></b> :- ' + full.regi_category;
        };
        var apprRejDetailsRenderer = function (data, type, full, meta) {
            if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
                return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.logged_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.s_remark;
            } else {
                return '-';
            }
        };
        var tempRegNoRenderer = function (data, type, full, meta) {
            return getAppNoWithRating(VALUE_THIRTYTHREE, data, full.district, full);
        };
        var dateTimeDaysRenderer = function (data, type, full, meta) {
            return dateTimeDays(data, full, VALUE_THIRTYTHREE);
        };
        var queryMovementString = function (json) {
            var qmData = json.query_movements;
            $.each(json['shop_data'], function (index, objData) {
                json['shop_data'][index]['query_movement_string'] = qmData[objData.s_id] ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + qmData[objData.s_id] + '</table>') : '-';
            });
            return json['shop_data'];
        };
        var that = this;
        showTableContainer('shop');
        Shop.router.navigate('shop');
        var searchData = dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, 'Shop.listview.loadShopData();');
        $('#shop_datatable_container').html(shopTableTemplate(searchData));
        renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_shop_list', false);
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type_for_shop_list', false);
        renderOptionsForTwoDimensionalArray(queryStatuTextsArray, 'query_status_for_shop_list', false);
        renderOptionsForTwoDimensionalArray(appTimingArray, 'app_timing_for_Shop_list', false);
        allowOnlyIntegerValue('mobile_number_for_shop_list');
        // if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_Shop_list', false);
        $('#district_for_shop_list').val(searchData.search_district);
        $('#status_for_shop_list').val(searchData.search_status);
        $('#app_timing_for_shop_list').val(searchData.search_app_timing_status);
        if (searchData.search_district != '') {
            $('#district_for_Shop_list').attr('disabled', 'disabled');
        }
        if (searchData.search_status != '') {
            $('#status_for_shop_list').attr('disabled', 'disabled');
            if (searchData.search_status == VALUE_TEN) {
                $('#query_status_for_shop_list').attr('disabled', 'disabled');
            }
        }
        if (searchData.search_app_timing_status != '') {
            $('#app_timing_for_Shop_list').attr('disabled', 'disabled');
        }
        shopDatatable = $('#shop_datatable').DataTable({
            ajax: {url: 'shop/get_all_shop', "dataSrc": queryMovementString, type: "post", data: searchData},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 's_id', 'class': 'text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'entity_establishment_type', 'class': 'text-center', 'render': entityEstablishmentRenderer},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: '', 'class': '', 'render': appDetailsRenderer},
                {data: 's_id', 'class': 'text-center', 'render': dateTimeDaysRenderer},
                {data: 's_id', 'class': 'text-center v-a-m ', 'render': appStatusRenderer},
                {data: 's_id', 'class': 'text-center v-a-m ', 'render': queryStatusRenderer},
                {data: '', 'class': 'f-s-12px', 'render': apprRejDetailsRenderer},
                {'class': 'details-control ', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        //} 
        $('#shop_datatable_filter').remove();
        $('#shop_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = shopDatatable.row(tr);

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
    askForNewShop: function (btnObj) {
        var that = this;
        that.newShop(false, {});
        that.addMultipleFamilyMembers({});
        that.addMultiplePartnerInfo({});
        datePicker();
    },
    newShop: function (isEdit, shopData) {
        var that = this;
        var templateData = {};

        tempContractorCnt = 1;
        tempEmployeesCnt = 1;
        tempPartnerCnt = 1;

        templateData.shop_data = shopData;
        templateData.is_checked = IS_CHECKED_YES;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('shop');
        $('#shop_form_container').html(shopFormTemplate(templateData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');

        if (isEdit) {
            $('#district').val(shopData.district);
            $('#entity_establishment_type').val(shopData.entity_establishment_type);
            $('#regi_category').val(shopData.regi_category);
            generateSelect2();
            if (shopData.lease_agreement_document != '') {
                $('#lease_agreement_document_container').hide();
                $('#lease_agreement_document_name_image').attr('src', SHOP_DOC_PATH + shopData.lease_agreement_document);
                $('#lease_agreement_document_name_container').show();
                $('#lease_agreement_document_download').attr("href", SHOP_DOC_PATH + shopData.lease_agreement_document);
            }
            if (shopData.house_tax_copy != '') {
                $('#house_tax_copy_container').hide();
                $('#house_tax_copy_name_image').attr('src', SHOP_DOC_PATH + shopData.house_tax_copy);
                $('#house_tax_copy_name_container').show();
                $('#house_tax_copy_download').attr("href", SHOP_DOC_PATH + shopData.house_tax_copy);
            }
            if (shopData.photo_of_shop != '') {
                $('#photo_of_shop_container').hide();
                $('#photo_of_shop_name_image').attr('src', SHOP_DOC_PATH + shopData.photo_of_shop);
                $('#photo_of_shop_name_container').show();
                $('#photo_of_shop_download').attr("href", SHOP_DOC_PATH + shopData.photo_of_shop);
            }
            if (shopData.aadhar_card != '') {
                $('#aadhar_card_container').hide();
                $('#aadhar_card_name_image').attr('src', SHOP_DOC_PATH + shopData.aadhar_card);
                $('#aadhar_card_name_container').show();
                $('#aadhar_card_download').attr("href", SHOP_DOC_PATH + shopData.aadhar_card);
            }
            if (shopData.pan_card != '') {
                $('#pan_card_container').hide();
                $('#pan_card_name_image').attr('src', SHOP_DOC_PATH + shopData.pan_card);
                $('#pan_card_name_container').show();
                $('#pan_card_download').attr("href", SHOP_DOC_PATH + shopData.pan_card);
            }
            if (shopData.gst != '') {
                $('#gst_container').hide();
                $('#gst_name_image').attr('src', SHOP_DOC_PATH + shopData.gst);
                $('#gst_name_container').show();
                $('#gst_download').attr("href", SHOP_DOC_PATH + shopData.gst);
            }
            if (shopData.s_sign_of_employer != '') {
                $('#seal_and_stamp_container_for_shop').hide();
                $('#seal_and_stamp_name_image_for_shop').attr('src', SHOP_DOC_PATH + shopData.s_sign_of_employer);
                $('#seal_and_stamp_name_container_for_shop').show();
                $('#seal_and_stamp_download').attr("href", SHOP_DOC_PATH + shopData.s_sign_of_employer);
            }
            if (shopData.certificate_tourism != '') {
                that.showDocument('certificate_tourism_container', 'certificate_tourism_name_image', 'certificate_tourism_name_container',
                        'certificate_tourism_download', 'certificate_tourism_remove_btn', shopData.certificate_tourism, shopData.s_id, VALUE_EIGHT);
            }
            if (shopData.license_health != '') {
                that.showDocument('license_health_container', 'license_health_name_image', 'license_health_name_container',
                        'license_health_download', 'license_health_remove_btn', shopData.license_health, shopData.s_id, VALUE_NINE);
            }
            if (shopData.noc_health != '') {
                that.showDocument('noc_health_container', 'noc_health_name_image', 'noc_health_name_container',
                        'noc_health_download', 'noc_health_remove_btn', shopData.noc_health, shopData.s_id, VALUE_TEN);
            }
            if (shopData.security_license != '') {
                that.showDocument('security_license_container', 'security_license_name_image', 'security_license_name_container',
                        'security_license_download', 'security_license_remove_btn', shopData.security_license, shopData.s_id, VALUE_ELEVEN);
            }

            $("#declaration_for_shop").prop("checked", true);
            if (shopData.s_different_location == IS_CHECKED_YES) {
                $("#different_location_for_shop").prop("checked", true);
                this.$('.shop_defferent_location').show();
            }

            var cnt = 1;
            var employersFamilyInfo = JSON.parse(shopData.s_employers_family_details);
            $.each(employersFamilyInfo, function (index, value) {
                that.addMultipleFamilyMembers(value);
                if (value.familyGender == VALUE_ONE) {
                    $("#member_gender_male_" + cnt).prop("checked", true);
                }
                if (value.familyGender == VALUE_TWO) {
                    $("#member_gender_female_" + cnt).prop("checked", true);
                }
                if (value.familyAdult == IS_CHECKED_YES) {
                    $("#member_adult_" + cnt).prop("checked", true);
                }
                if (value.familyYoungPerson == IS_CHECKED_YES) {
                    $("#member_young_person_" + cnt).prop("checked", true);
                }
                cnt++;
            });
            var emp_cnt = 1;
            var employeesInfo = JSON.parse(shopData.s_employees_details);
            $.each(employeesInfo, function (index, value) {
                that.addMultipleEmployeesInfo(value);
                if (value.employeeGender == VALUE_ONE) {
                    $("#employees_gender_male_" + emp_cnt).prop("checked", true);
                }
                if (value.employeeGender == VALUE_TWO) {
                    $("#employees_gender_female_" + emp_cnt).prop("checked", true);
                }
                if (value.employeeAdult == IS_CHECKED_YES) {
                    $("#employees_adult_" + emp_cnt).prop("checked", true);
                }
                if (value.employeeYoungPerson == IS_CHECKED_YES) {
                    $("#employees_young_person_" + emp_cnt).prop("checked", true);
                }
                emp_cnt++;
            });

            if (shopData.multiple_partner != '') {
                var partnerInfo = JSON.parse(shopData.multiple_partner);
                $.each(partnerInfo, function (key, value) {
                    that.addMultiplePartnerInfo(value);
                })
            }
        } else {
            that.addMultipleEmployeesInfo({});
        }
        generateSelect2();
        datePicker();
        $('#shop_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitShop($('#submit_btn_for_shop'));
            }
        }
        );
    },
    askForSubmitShop: function (moduleType) {
        var that = this;
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (moduleType == VALUE_TWO) {
            var yesEvent = 'Shop.listview.submitShop(\'' + moduleType + '\')';
            showConfirmation(yesEvent, 'Submit');
        }
    },
    submitShop: function (moduleType) {
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
        var shopFormData = $('#shop_form').serializeFormJSON();
        var validationData = that.checkValidation(shopFormData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('shop-' + validationData.field, validationData.message);
            return false;
        }

        var newPartnerItems = [];
        var isPartnerItemValidation = false;
        $('.partner_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var partnerItem = {};
            var part_name = $('#partner_name_' + cnt).val();
            partnerItem.name = part_name;

            var part_add = $('#partner_address_' + cnt).val();
            partnerItem.address = part_add;

            newPartnerItems.push(partnerItem);
        });
        if (isPartnerItemValidation) {
            return false;
        }

        var newFamilyItems = [];
        var isFamilyItemValidation = false;
        $('.employer_family_info').each(function () {
            var cnt = $(this).find('.temp_cnt').val();
            var familyItem = {};
            var fn = $('#member_name_' + cnt).val();
            familyItem.familyName = fn;

            var fr = $('#member_relationship_' + cnt).val();
            familyItem.familyRelationship = fr;

            var fg = $('input[name=member_gender_' + cnt + ']:checked').val();
            familyItem.familyGender = fg;

            familyItem.familyAdult = 0;
            if ($("#member_adult_" + cnt).is(":checked")) {
                familyItem.familyAdult = 1;
            }

            familyItem.familyYoungPerson = 0;
            if ($("#member_young_person_" + cnt).is(":checked")) {
                familyItem.familyYoungPerson = 1;
            }

            newFamilyItems.push(familyItem);
        });
        if (isFamilyItemValidation) {
            return false;
        }

        var newEmployeeInfoItems = [];
        var isEmployeeInfoItemValidation = false;
        $('.employees_info').each(function () {
            var cnt_emp = $(this).find('.temp_cnt').val();
            var employeeItem = {};
            var empName = $('#employees_name_' + cnt_emp).val();
            if (empName == '' || empName == null) {
                $('#employees_name_' + cnt_emp).focus();
                validationMessageShow('shop-employees_name_' + cnt_emp, shopEmployeeNameValidationMessage);
                isEmployeeInfoItemValidation = true;
                return false;
            }
            employeeItem.employeeName = empName;

            var empManageCap = $('#employees_managerial_capacity_' + cnt_emp).val();
            if (empManageCap == '' || empManageCap == null) {
                $('#employees_managerial_capacity_' + cnt_emp).focus();
                validationMessageShow('shop-employees_managerial_capacity_' + cnt_emp, shopEmployeeManagerialCapacityValidationMessage);
                isEmployeeInfoItemValidation = true;
                return false;
            }
            employeeItem.employeeManagerialCapacity = empManageCap;

            var empType = $('#employees_type_' + cnt_emp).val();
            if (empType == '' || empType == null) {
                $('#employees_type_' + cnt_emp).focus();
                validationMessageShow('shop-employees_type_' + cnt_emp, shopEmployeeTypeValidationMessage);
                isEmployeeInfoItemValidation = true;
                return false;
            }
            employeeItem.employeeType = empType;

            var empGodEmployed = $('#employees_godown_employed_' + cnt_emp).val();
            if (empGodEmployed == '' || empGodEmployed == null) {
                $('#employees_godown_employed_' + cnt_emp).focus();
                validationMessageShow('shop-employees_godown_employed_' + cnt_emp, shopEmployeeGodownEmployedValidationMessage);
                isEmployeeInfoItemValidation = true;
                return false;
            }
            employeeItem.employeeGodownEmployed = empGodEmployed;

            var empGender = $('input[name=employees_gender_' + cnt_emp + ']:checked').val();
            if (empGender == '' || empGender == null) {
                $('#employees_gender_' + cnt_emp).focus();
                validationMessageShow('shop-employees_gender_' + cnt_emp, 'Select Gender !');
                isEmployeeInfoItemValidation = true;
                return false;
            }
            employeeItem.employeeGender = empGender;

            employeeItem.employeeAdult = 0;
            if ($("#employees_adult_" + cnt_emp).is(":checked")) {
                employeeItem.employeeAdult = 1;
            }

            employeeItem.employeeYoungPerson = 0;
            if ($("#employees_young_person_" + cnt_emp).is(":checked")) {
                employeeItem.employeeYoungPerson = 1;
            }

            newEmployeeInfoItems.push(employeeItem);
        });
        if (isEmployeeInfoItemValidation) {
            return false;
        }

        if (newEmployeeInfoItems == 0) {
            validationMessageShow('shop', oneContractorValidationMessage);
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }

        if (!$('#declaration_for_shop').is(':checked')) {
            $('#declaration_for_shop').focus();
            validationMessageShow('shop-declaration_for_shop', shopDeclarationValidationMessage);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_shop') : $('#submit_btn_for_shop');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#shop_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        formData.append("employer_family_info_data", JSON.stringify(newFamilyItems));
        formData.append("employees_info_data", JSON.stringify(newEmployeeInfoItems));
        formData.append("partner_info_data", JSON.stringify(newPartnerItems));
        formData.append("module_type", moduleType);

        $.ajax({
            type: 'POST',
            url: 'shop/submit_shop',
            data: formData,
            mimeType: 'multipart/form-data',
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
                validationMessageShow('shop', textStatus.statusText);
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
                    validationMessageShow('shop', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                that.listPage();
                // Shop.router.navigate('shop', {'trigger': true});
            }
        });
    },

    checkValidation: function (shopFormData) {
        if (!shopFormData.name_for_shop) {
            return getBasicMessageAndFieldJSONArray('name_for_shop', shopNameValidationMessage);
        }
        if (!shopFormData.regi_category) {
            return getBasicMessageAndFieldJSONArray('regi_category', shopRegiCategoryValidationMessage);
        }
        if (!shopFormData.door_no_for_shop) {
            return getBasicMessageAndFieldJSONArray('door_no_for_shop', shopDoorNoValidationMessage);
        }
        if (!shopFormData.street_name_for_shop) {
            return getBasicMessageAndFieldJSONArray('street_name_for_shop', shopStreetNameValidationMessage);
        }
        if (!shopFormData.loaction_for_shop) {
            return getBasicMessageAndFieldJSONArray('loaction_for_shop', shopLocationValidationMessage);
        }
        if (!shopFormData.postal_address_for_shop) {
            return getBasicMessageAndFieldJSONArray('postal_address_for_shop', shopPostelAddressValidationMessage);
        }

        if (shopFormData.different_location_for_shop == IS_CHECKED_YES) {
            if (!shopFormData.office_location_for_shop) {
                return getBasicMessageAndFieldJSONArray('office_location_for_shop', shopOfficeLocationValidationMessage);
            }
            if (!shopFormData.store_room_location_for_shop) {
                return getBasicMessageAndFieldJSONArray('store_room_location_for_shop', shopStoreRoomLocationValidationMessage);
            }
            if (!shopFormData.godown_location_for_shop) {
                return getBasicMessageAndFieldJSONArray('godown_location_for_shop', shopGodownLocationValidationMessage);
            }
            if (!shopFormData.warehouse_location_for_shop) {
                return getBasicMessageAndFieldJSONArray('warehouse_location_for_shop', shopWarehouseLocationValidationMessage);
            }
        }
        if (!shopFormData.name_of_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('name_of_employer_for_shop', shopEmployerNameValidationMessage);
        }
        if (!shopFormData.mobile_no_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('mobile_no_employer_for_shop', mobileValidationMessage);
        }
        var mobileMessage = mobileNumberValidation(shopFormData.mobile_no_employer_for_shop);
        if (mobileMessage != '') {
            return getBasicMessageAndFieldJSONArray('mobile_no_employer_for_shop', invalidMobileValidationMessage);
        }
        if (!shopFormData.residential_address_employer_for_shop) {
            return getBasicMessageAndFieldJSONArray('residential_address_employer_for_shop', shopEmployerResidentialAddressValidationMessage);
        }
        if (!shopFormData.manager_name_for_shop) {
            return getBasicMessageAndFieldJSONArray('manager_name_for_shop', shopManagerNameValidationMessage);
        }
        if (!shopFormData.residential_address_manager_for_shop) {
            return getBasicMessageAndFieldJSONArray('residential_address_manager_for_shop', shopManagerNameValidationMessage);
        }
        if (!shopFormData.category_for_shop) {
            return getBasicMessageAndFieldJSONArray('category_for_shop', shopCategoryValidationMessage);
        }
        if (!shopFormData.nature_of_business_for_shop) {
            return getBasicMessageAndFieldJSONArray('nature_of_business_for_shop', shopNatureOfBusinessValidationMessage);
        }
        if (!shopFormData.date_commencement_of_business_for_shop) {
            return getBasicMessageAndFieldJSONArray('date_commencement_of_business_for_shop', shopDateCommencementOfBusinessValidationMessage);
        }

        return '';
    },
    editOrViewShop: function (btnObj, s_Id, isEdit, tempId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (!s_Id) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'Shop/get_shop_data_by_shop_id',
            type: 'post',
            data: $.extend({}, {'s_id': s_Id}, getTokenData()),
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
                var shopData = parseData.shop_data;
                shopData.s_commencement_of_business_date = shopData.s_commencement_of_business_date != '0000-00-00' ? dateTo_DD_MM_YYYY(shopData.s_commencement_of_business_date) : '';
                shopData.s_certificate_expiry_date = shopData.s_certificate_expiry_date != '0000-00-00' ? dateTo_DD_MM_YYYY(shopData.s_certificate_expiry_date) : '';
                if (isEdit) {
                    that.newShop(isEdit, shopData);
                } else {
                    that.viewShop(shopData);
                }
            }
        });
    },
    viewShop: function (shopData) {
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_LABOUR_DEPT_USER && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var templateData = {};

        templateData.shop_data = shopData;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.s_certificate_expiry_date = templateData.s_certificate_expiry_date != '0000-00-00' ? dateTo_DD_MM_YYYY(templateData.s_certificate_expiry_date) : '';
        showFormContainer('shop');
        $('#shop_form_container').html(shopViewTemplate(templateData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district');
        renderOptionsForTwoDimensionalArray(entityEstablishmentTypeArray, 'entity_establishment_type');
        $('#district').val(shopData.district);
        $('#entity_establishment_type').val(shopData.entity_establishment_type);
        $('#regi_category').val(shopData.regi_category);
        if (shopData.status == VALUE_TWO) {
            $('.shop_hidden').hide();
        } else if (shopData.status == VALUE_THREE) {
            $('.shop_hidden').show();
        }

        $("#declaration_for_shop").prop("checked", true);
        if (shopData.s_different_location == IS_CHECKED_YES) {
            $("#different_location_for_shop").prop("checked", true);
            this.$('.shop_defferent_location').show();
        }
        if (shopData.lease_agreement_document != '') {
            $('#lease_agreement_document_container').hide();
            $('#lease_agreement_document_name_image').attr('src', SHOP_DOC_PATH + shopData.lease_agreement_document);
            $('#lease_agreement_document_name_container').show();
            $('#lease_agreement_document_download').attr("href", SHOP_DOC_PATH + shopData.lease_agreement_document);
        }
        if (shopData.house_tax_copy != '') {
            $('#house_tax_copy_container').hide();
            $('#house_tax_copy_name_image').attr('src', SHOP_DOC_PATH + shopData.house_tax_copy);
            $('#house_tax_copy_name_container').show();
            $('#house_tax_copy_download').attr("href", SHOP_DOC_PATH + shopData.house_tax_copy);
        }
        if (shopData.photo_of_shop != '') {
            $('#photo_of_shop_container').hide();
            $('#photo_of_shop_name_image').attr('src', SHOP_DOC_PATH + shopData.photo_of_shop);
            $('#photo_of_shop_name_container').show();
            $('#photo_of_shop_download').attr("href", SHOP_DOC_PATH + shopData.photo_of_shop);
        }
        if (shopData.aadhar_card != '') {
            $('#aadhar_card_container').hide();
            $('#aadhar_card_name_image').attr('src', SHOP_DOC_PATH + shopData.aadhar_card);
            $('#aadhar_card_name_container').show();
            $('#aadhar_card_download').attr("href", SHOP_DOC_PATH + shopData.aadhar_card);
        }
        if (shopData.pan_card != '') {
            $('#pan_card_container').hide();
            $('#pan_card_name_image').attr('src', SHOP_DOC_PATH + shopData.pan_card);
            $('#pan_card_name_container').show();
            $('#pan_card_download').attr("href", SHOP_DOC_PATH + shopData.pan_card);
        }
        if (shopData.gst != '') {
            $('#gst_container').hide();
            $('#gst_name_image').attr('src', SHOP_DOC_PATH + shopData.gst);
            $('#gst_name_container').show();
            $('#gst_download').attr("href", SHOP_DOC_PATH + shopData.gst);
        }
        if (shopData.s_sign_of_employer != '') {
            $('#seal_and_stamp_container_for_shop').hide();
            $('#seal_and_stamp_name_image_for_shop').attr('src', SHOP_DOC_PATH + shopData.s_sign_of_employer);
            $('#seal_and_stamp_name_container_for_shop').show();
            $('#seal_and_stamp_download').attr("href", SHOP_DOC_PATH + shopData.s_sign_of_employer);
        }
        if (shopData.certificate_tourism != '') {
            that.showDocument('certificate_tourism_container', 'certificate_tourism_name_image', 'certificate_tourism_name_container',
                    'certificate_tourism_download', 'certificate_tourism_remove_btn', shopData.certificate_tourism, shopData.s_id, VALUE_EIGHT);
        }
        if (shopData.license_health != '') {
            that.showDocument('license_health_container', 'license_health_name_image', 'license_health_name_container',
                    'license_health_download', 'license_health_remove_btn', shopData.license_health, shopData.s_id, VALUE_NINE);
        }
        if (shopData.noc_health != '') {
            that.showDocument('noc_health_container', 'noc_health_name_image', 'noc_health_name_container',
                    'noc_health_download', 'noc_health_remove_btn', shopData.noc_health, shopData.s_id, VALUE_TEN);
        }
        if (shopData.security_license != '') {
            that.showDocument('security_license_container', 'security_license_name_image', 'security_license_name_container',
                    'security_license_download', 'security_license_remove_btn', shopData.security_license, shopData.s_id, VALUE_ELEVEN);
        }

        var cnt = 1;
        var employersFamilyInfo = JSON.parse(shopData.s_employers_family_details);
        $.each(employersFamilyInfo, function (index, value) {
            value.item_cnt = cnt;
            $('#employer_family_info_container_view').append(shopEmployerFamilyViewItemTemplate(value));
            if (value.familyGender == VALUE_ONE) {
                $("#member_gender_male_" + cnt).prop("checked", true);
            }
            if (value.familyGender == VALUE_TWO) {
                $("#member_gender_female_" + cnt).prop("checked", true);
            }
            if (value.familyAdult == IS_CHECKED_YES) {
                $("#member_adult_" + cnt).prop("checked", true);
            }
            if (value.familyYoungPerson == IS_CHECKED_YES) {
                $("#member_young_person_" + cnt).prop("checked", true);
            }
            cnt++;
        });

        var emp_cnt = 1;
        var employeesInfo = JSON.parse(shopData.s_employees_details);
        $.each(employeesInfo, function (index, value) {
            value.item_cnt = emp_cnt;
            $('#employees_info_container_view').append(shopEmployeesViewItemTemplate(value));
            if (value.employeeGender == VALUE_ONE) {
                $("#employees_gender_male_" + emp_cnt).prop("checked", true);
            }
            if (value.employeeGender == VALUE_TWO) {
                $("#employees_gender_female_" + emp_cnt).prop("checked", true);
            }
            if (value.employeeAdult == IS_CHECKED_YES) {
                $("#employees_adult_" + emp_cnt).prop("checked", true);
            }
            if (value.employeeYoungPerson == IS_CHECKED_YES) {
                $("#employees_young_person_" + emp_cnt).prop("checked", true);
            }
            emp_cnt++;
        });

        $('.remove_btn_hidden').hide();
        var partnerInfo = JSON.parse(shopData.multiple_partner);
        $.each(partnerInfo, function (key, value) {
            that.addMultiplePartnerInfo(value);
            $(".partner_name").prop("readonly", true);
            $(".partner_address").prop("readonly", true);
            $('.remove_btn_hidden').hide();
        })


    },
    generateFormIPDF: function (sId) {
        if (!sId) {
            showError('Please select proper Shop Details');
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        $('#s_id_for_formI_pdf').val(sId);
        $('#shop_formI_pdf_form').submit();
    },
    generateFormIIPDF: function (sId) {
        if (!sId) {
            showError('Please select proper Shop Details');
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        $('#s_id_for_formII_pdf').val(sId);
        $('#shop_formII_pdf_form').submit();
    },
    generateFormXXIVPDF: function (sId) {
        if (!sId) {
            showError('Please select proper Shop/Establishment Details');
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        $('#s_id_for_formXXIV_pdf').val(sId);
        $('#shop_formXXIV_pdf_form').submit();
    },
    generateFormIVPDF: function (sId) {
        if (!sId) {
            showError('Please select proper Shop/Establishment Details');
            $('html, body').animate({scrollTop: '0px'}, 0);
            return false;
        }
        $('#s_id_for_formIV_pdf').val(sId);
        $('#shop_formIV_pdf_form').submit();
    },
    addMultipleFamilyMembers: function (templateData) {
        templateData.item_cnt = tempContractorCnt;
        templateData.is_checked = IS_CHECKED_YES;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        $('#employer_family_info_container').append(shopEmployerFamilyInfoItemTemplate(templateData));
        tempContractorCnt++;
        datePicker();
        resetCounter('display-cnt');
    },
    removeFamilyMembers: function (itemCnt) {
        $('#employer_family_info_' + itemCnt).remove();
        resetCounter('display-cnt');
    },
    addMultipleEmployeesInfo: function (templateData) {
        templateData.item_cnt = tempEmployeesCnt;
        templateData.is_checked = IS_CHECKED_YES;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        $('#employees_info_container').append(shopEmployeesInfoItemTemplate(templateData));
        tempEmployeesCnt++;
        datePicker();
        resetCounter('display-employees-cnt');
    },
    removeEmployeesInfo: function (itemCnt) {
        $('#employees_info_' + itemCnt).remove();
        resetCounter('display-employees-cnt');
    },
    addMultiplePartnerInfo: function (templateData) {
        templateData.item_cnt = tempPartnerCnt;
        $('#partner_info_container').append(shopPartnerInfoItemTemplate(templateData));
        tempPartnerCnt++;
        resetCounter('display-partner-cnt');
    },
    removePartnerInfo: function (itemCnt) {
        $('#partner_info_' + itemCnt).remove();
        resetCounter('display-Partner-cnt');
    },
    openUploadChallan: function (sId) {
        if (!sId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#upload_challan_btn_' + sId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop/get_shop_data_by_shop_id',
            type: 'post',
            data: $.extend({}, {'s_id': sId, 'load_fb_details': VALUE_ONE}, getTokenData()),
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
                var shopData = parseData.shop_data;
                showPopup();
                if (shopData.payment_type == VALUE_ONE) {
                    shopData.utitle = 'Challan Copy';
                } else {
                    shopData.utitle = 'Payment Details';
                }
                shopData.module_type = VALUE_THIRTYTHREE;
                $('#popup_container').html(shopUploadChallanTemplate(shopData));
                loadFB(VALUE_THIRTYTHREE, parseData.fb_data, shopData.payment_type, shopData.show_remove_upload_btn, shopData.show_dropdown, shopData.dropdown_data);

                generateBoxes('radio', paymentTypeArray, 'payment_type', 'shop_upload_challan', shopData.payment_type, true);
                showSubContainerForPaymentDetails('payment_type', 'shop_upload_challan', 'uc', 'radio', '#fb', VALUE_THIRTYTHREE);
                if (shopData.challan != '') {
                    $('#challan_container_for_shop_upload_challan').hide();
                    $('#challan_name_container_for_shop_upload_challan').show();
                    $('#challan_name_href_for_shop_upload_challan').attr('href', 'documents/shop/' + shopData.challan);
                    $('#challan_name_for_shop_upload_challan').html(shopData.challan);
                    $('#challan_remove_btn_for_shop_upload_challan').attr('onclick', 'Shop.listview.removeChallan("' + shopData.s_id + '")');
                }
            }
        });
    },
    removeChallan: function (sId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        if (!sId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'shop/remove_challan',
            data: $.extend({}, {'s_id': sId}, getTokenData()),
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
                validationMessageShow('shop-uc', textStatus.statusText);
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
                    validationMessageShow('shop-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('.success-message-shop-uc').html(parseData.message);
                removeDocument('challan', 'shop_upload_challan');
                $('#status_' + sId).html(appStatusArray[VALUE_TWO]);
            }
        });
    },
    uploadChallan: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        $('.success-message-shop-uc').html('');
        validationMessageHide();
        var sId = $('#s_id_for_shop_upload_challan').val();
        if (!sId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var paymentType = $('input[name=payment_type_for_shop_upload_challan]:checked').val();
        if (paymentType != VALUE_ONE && paymentType != VALUE_TWO && paymentType != VALUE_THREE) {
            $('#payment_type_for_shop_upload_challan_1').focus();
            validationMessageShow('shop-uc-payment_type_for_shop_upload_challan', onePaymentOptionValidationMessage);
            return false;
        }
        if ($('#challan_container_for_shop_upload_challan').is(':visible')) {
            var sealAndStamp = $('#challan_for_shop_upload_challan').val();
            if (sealAndStamp == '') {
                $('#challan_for_shop_upload_challan').focus();
                validationMessageShow('shop-uc-challan_for_shop_upload_challan', uploadDocumentValidationMessage);
                return false;
            }
            var challanMessage = fileUploadValidation('challan_for_shop_upload_challan', 2048);
            if (challanMessage != '') {
                $('#challan_for_shop_upload_challan').focus();
                validationMessageShow('shop-uc-challan_for_shop_upload_challan', challanMessage);
                return false;
            }
        }
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            var returnData = checkValidationForFB(VALUE_THIRTYTHREE, 'shop-uc', true);
            if (!returnData) {
                return false;
            }
        }
        var btnObj = $('#submit_btn_for_shop_upload_challan');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var formData = new FormData($('#shop_upload_challan_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
            formData.append("fees_bifurcation_details", returnData);
        }
        $.ajax({
            type: 'POST',
            url: 'shop/upload_challan',
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
                validationMessageShow('shop-uc', textStatus.statusText);
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
                    validationMessageShow('shop-uc', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                Swal.close();
                $('#status_' + sId).html(paymentType == VALUE_THREE ? appStatusArray[VALUE_NINE] : appStatusArray[VALUE_THREE]);
                if (paymentType == VALUE_THREE) {
                    $('#confirm_payment_btn_for_app_' + sId).show();
                }
                $('#total_fees_' + sId).html(returnFees(parseData));
                showSuccess(parseData.message);
            }
        });
    },
    askForApproveApplication: function (sId) {
        if (!sId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#approve_btn_for_shop_' + sId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop/get_shop_data_by_shop_id',
            type: 'post',
            data: $.extend({}, {'s_id': sId}, getTokenData()),
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
                var shopData = parseData.shop_data;
                showPopup();
                $('#popup_container').html(shopApproveTemplate(shopData));
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
        var formData = $('#approve_shop_form').serializeFormJSON();
        if (!formData.shop_id_for_shop_approve) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.registration_number_for_shop_approve) {
            $('#registration_number_for_shop_approve').focus();
            validationMessageShow('shop-approve-registration_number_for_shop_approve', shopRegistrationNoValidationMessage);
            return false;
        }
        if (!formData.valid_upto_for_shop_approve) {
            $('#valid_upto_for_shop_approve').focus();
            validationMessageShow('shop-approve-valid_upto_for_shop_approve', dateValidationMessage);
            return false;
        }
        var certficateMessage = fileUploadValidationForPDF('certificate_file_for_shop_approve', 2048);
        if (certficateMessage != '') {
            $('#certificate_file_for_shop_approve').focus();
            validationMessageShow('shop-approve-certificate_file_for_shop_approve', certficateMessage);
            return false;
        }
        if (!formData.remarks_for_shop_approve) {
            $('#remarks_for_shop_approve').focus();
            validationMessageShow('shop-approve-remarks_for_shop_approve', shopRemarkValidationMessage);
            return false;
        }
        var btnObj = $('#submit_btn_for_shop_approve');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');

        var newFormData = new FormData($('#approve_shop_form')[0]);
        newFormData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        $.ajax({
            type: 'POST',
            url: 'shop/approve_application',
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
                validationMessageShow('shop-approve', textStatus.statusText);
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
                    validationMessageShow('shop-approve', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.shop_id_for_shop_approve).html(appStatusArray[VALUE_FIVE]);
                $('#reject_btn_for_app_' + formData.shop_id_for_shop_approve).remove();
                $('#approve_btn_for_app_' + formData.shop_id_for_shop_approve).remove();
                $('#download_certificate_btn_for_app_' + formData.shop_id_for_shop_approve).attr('href', parseData.final_certificate_path);
                $('#download_certificate_btn_for_app_' + formData.shop_id_for_shop_approve).show();
                $('#so_status_' + formData.shop_id_for_shop_approve).html(dateTimeDays(formData.shop_id_for_shop_approve, parseData, VALUE_THIRTYTHREE));
            }
        });
    },
    askForRejectApplication: function (sId) {
        if (!sId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#reject_btn_for_shop_' + sId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop/get_shop_data_by_shop_id',
            type: 'post',
            data: $.extend({}, {'s_id': sId}, getTokenData()),
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
                var shopData = parseData.shop_data;
                showPopup();
                $('#popup_container').html(shopRejectTemplate(shopData));
            }
        });
    },
    rejectApplication: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        validationMessageHide();
        var formData = $('#reject_shop_form').serializeFormJSON();
        if (!formData.shop_id_for_shop_reject) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!formData.remarks_for_shop_reject) {
            $('#remarks_for_shop_reject').focus();
            validationMessageShow('shop-reject-remarks_for_shop_reject', remarksValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'shop/reject_application',
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
                validationMessageShow('shop-reject', textStatus.statusText);
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
                    validationMessageShow('shop-reject', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                $('#status_' + formData.shop_id_for_shop_reject).html(appStatusArray[VALUE_SIX]);
                $('#upload_challan_btn_' + formData.shop_id_for_shop_reject).remove();
                $('#download_fees_paid_challan_btn_' + formData.shop_id_for_shop_reject).remove();
                $('#reject_btn_for_app_' + formData.shop_id_for_shop_reject).remove();
                $('#approve_btn_for_app_' + formData.shop_id_for_shop_reject).remove();
                $('#so_status_' + formData.shop_id_for_shop_reject).html(dateTimeDays(formData.shop_id_for_shop_reject, parseData, VALUE_THIRTYTHREE));
            }
        });
    },
    getQueryData: function (sId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!sId) {
            showError(invalidUserValidationMessage);
            return false;
        }
        var that = this;
        var templateData = {};
        templateData.module_type = VALUE_THIRTYTHREE;
        templateData.module_id = sId;
        var btnObj = $('#query_btn_for_app_' + sId);
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
                tmpData.application_number = regNoRenderer(VALUE_THIRTYTHREE, moduleData.s_id);
                tmpData.applicant_name = moduleData.s_name;
                tmpData.title = 'Shop & Establishment Name';
                ;
                tmpData.module_type = VALUE_THIRTYTHREE;
                tmpData.module_id = sId;
                loadQueryManagementModule(parseData, templateData, tmpData);
            }
        });
    },
    viewPayment: function (shopId) {
        if (!shopId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var btnObj = $('#download_fees_paid_challan_btn_' + shopId);
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'shop/get_shop_data_by_shop_id',
            type: 'post',
            data: $.extend({}, {'s_id': shopId, 'load_fb_details': VALUE_TWO}, getTokenData()),
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
                var shopData = parseData.shop_data;
                showPopup();
                if (shopData.payment_type == VALUE_ONE || shopData.payment_type == VALUE_THREE) {
                    shopData.user_payment_type_text = paymentTypeArray[shopData.payment_type];
                } else {
                    shopData.user_payment_type_text = userPaymentTypeArray[shopData.user_payment_type] ? userPaymentTypeArray[shopData.user_payment_type] : '';
                }
                if (shopData.payment_type == VALUE_ONE) {
                    shopData.utitle = 'Fees Paid Challan Copy';
                } else if (shopData.payment_type == VALUE_TWO && shopData.user_payment_type == VALUE_ONE) {
                    shopData.utitle = 'Demand Draft (DD) Copy';
                }
                shopData.module_type = VALUE_THIRTYTHREE;
                $('#popup_container').html(shopViewPaymentTemplate(shopData));
                loadFB(VALUE_THIRTYTHREE, parseData.fb_data, shopData.payment_type);
                loadPH(VALUE_THIRTYTHREE, shopData.s_id, parseData.ph_data);
                if (shopData.payment_type == VALUE_ONE || (shopData.payment_type == VALUE_TWO && shopData.user_payment_type == VALUE_ONE)) {
                    if (shopData.fees_paid_challan != '') {
                        $('#vp_container_for_shop').show();
                        $('#fees_paid_challan_name_href_for_shop').attr('href', SHOP_DOC_PATH + shopData.fees_paid_challan);
                        $('#fees_paid_challan_name_for_shop').html(shopData.fees_paid_challan);
                    }
                }
            }
        });
    },
    showDocument: function (containerHideId, documentSrcPathId, containerShowId, documenthrefPathId, removeDocumentBtnId, dbDocumentFieldName, dbDocumentFieldId, VALUE) {
        $('#' + containerHideId).hide();
        $('#' + documentSrcPathId).attr('src', SHOP_DOC_PATH + dbDocumentFieldName);
        $('#' + containerShowId).show();
        $('#' + documenthrefPathId).attr("href", SHOP_DOC_PATH + dbDocumentFieldName);
        $('#' + removeDocumentBtnId).attr('onclick', 'Shop.listview.askForRemove("' + dbDocumentFieldId + '","' + VALUE + '")');
    },
});