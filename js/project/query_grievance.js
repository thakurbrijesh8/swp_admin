var queryGrievanceListTemplate = Handlebars.compile($('#query_grievance_list_template').html());
var queryGrievanceTableTemplate = Handlebars.compile($('#query_grievance_table_template').html());
var queryGrievanceActionTemplate = Handlebars.compile($('#query_grievance_action_template').html());
var queryGrievanceFormTemplate = Handlebars.compile($('#query_grievance_form_template').html());
var queryGrievanceViewTemplate = Handlebars.compile($('#query_grievance_view_template').html());

var QueryGrievance = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
QueryGrievance.Router = Backbone.Router.extend({
    routes: {
        'query_grievance': 'renderList',
        'query_grievance_form': 'renderListForForm',
        'edit_query_grievance_form': 'renderList',
        'view_query_grievance_form': 'renderList',
    },
    renderList: function () {
        QueryGrievance.listview.listPage();
    },
    renderListForForm: function () {
        QueryGrievance.listview.listPageQueryGrievanceForm();
    }
});
QueryGrievance.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_query_grievance');
        addClass('menu_query_grievance', 'active');
        QueryGrievance.router.navigate('query_grievance');
        var templateData = {};
        this.$el.html(queryGrievanceListTemplate(templateData));
        this.loadQueryGrievanceData();

    },
    listPageQueryGrievanceForm: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_query_grievance');
        addClass('menu_query_grievance', 'active');
        this.$el.html(queryGrievanceListTemplate);
        this.newQueryGrievanceForm(false, {});
    },
    actionRenderer: function (rowData) {
        if ((tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_DIC || tempTypeInSession == TEMP_TYPE_DIC_DNH) && rowData.status == VALUE_ONE) {
            rowData.show_edit_btn = true;
        }
        // if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE) {
        //     rowData.show_form_one_btn = true;
        // }
        // if (rowData.status != VALUE_ZERO && rowData.status != VALUE_ONE && rowData.status != VALUE_SIX) {
        //     rowData.show_upload_challan_btn = true;
        // }
        // if (rowData.status == VALUE_FOUR || rowData.status == VALUE_FIVE || rowData.status == VALUE_SEVEN || rowData.status == VALUE_EIGHT) {
        //     rowData.show_download_fees_paid_challan_btn = true;
        // }
        // if (rowData.status != VALUE_FIVE && rowData.status != VALUE_SIX &&
        //         (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
        //     rowData.show_reject_btn = '';
        // } else {
        //     rowData.show_reject_btn = 'display: none;';
        // }
        // if (rowData.status == VALUE_SEVEN && (rowData.query_status == VALUE_ZERO || rowData.query_status == VALUE_THREE)) {
        //     rowData.show_approve_btn = '';
        // } else {
        //     rowData.show_approve_btn = 'display: none;';
        // }
        // rowData.module_type = VALUE_THIRTYTWO;
        // rowData.show_payment_confirm_btn = rowData.status == VALUE_FOUR ? '' : (rowData.status == VALUE_EIGHT ? '' : 'display: none;');
        // if (rowData.status != VALUE_FIVE) {
        //     rowData.download_certificate_style = 'display: none;';
        // }
        return queryGrievanceActionTemplate(rowData);
    },
    loadQueryGrievanceData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var dateRendere = function (data, type, full, meta) {
            return dateTo_DD_MM_YYYY(full.created_time);
        };
        // var tempRegNoRenderer = function (data, type, full, meta) {
        //     return regNoRenderer(VALUE_THIRTYTWO, data);
        // };
        var talukaRendere = function (data, type, full, meta) {
            return talukaArray[data] ? talukaArray[data] : '';
        };
        var issueCategoryRendere = function (data, type, full, meta) {
            return issueCategoryArray[data] ? issueCategoryArray[data] : '';
        };
        var departmentRendere = function (data, type, full, meta) {
            return departmentArray[data] ? departmentArray[data] : '';
        };
        var that = this;
        QueryGrievance.router.navigate('query_grievance');
        showTableContainer('query_grievance');
        $('#query_grievance_datatable_container').html(queryGrievanceTableTemplate);
        //renderOptionsForTwoDimensionalArray(appStatusTextArray, 'status_for_bocw_list', false);
        bocwDataTable = $('#query_grievance_datatable').DataTable({
            ajax: {url: 'query_grievance/get_query_grievance_data', dataSrc: "query_grievance_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center v-a-m'},
                //{data: 'query_grievance_id', 'class': 'v-a-m text-center f-w-b', 'render': tempRegNoRenderer},
                {data: 'query_reference_number', 'class': 'v-a-m'},
                {data: 'district', 'class': 'text-center', 'render': talukaRendere},
                {data: 'issue_category', 'class': 'text-center', 'render': issueCategoryRendere},
                {data: 'department', 'class': 'text-center', 'render': departmentRendere},
                {data: 'submitted_datetime', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: 'query_grievance_id', 'class': 'v-a-m text-center', 'render': queryGrievanceStatusRenderer},
                //{data: 'query_grievance_id', 'class': 'v-a-m text-center', 'render': queryStatusRenderer},
                {'class': 'details-control text-center', 'orderable': false, 'data': null, "defaultContent": ''}
            ],
            "initComplete": searchableDatatable
        });
        $('#query_grievance_datatable_filter').remove();
        $('#query_grievance_datatable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).parents('tr');
            var row = bocwDataTable.row(tr);

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
    newQueryGrievanceForm: function (isEdit, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        if (isEdit) {
            var formData = parseData.query_grievance_data;
            QueryGrievance.router.navigate('edit_query_grievance_form');
        } else {
            var formData = {};
            QueryGrievance.router.navigate('query_grievance_form');
        }
        var templateData = {};
        templateData.is_checked = isChecked;
        templateData.VALUE_ONE = VALUE_ONE;
        templateData.VALUE_TWO = VALUE_TWO;
        templateData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        templateData.query_grievance_data = parseData.query_grievance_data;
        showFormContainer('query_grievance');
        $('#query_grievance_form_container').html(queryGrievanceFormTemplate((templateData)));
        if (isEdit) {
            $('#district').val(formData.district);
            $('#issue_category').val(formData.issue_category);
            $('#department').val(formData.department);
            $('#industry_classification').val(formData.industry_classification);

            if (formData.department == 10) {
                $('.other_department_div').show();
            }
        }
        $('#query_grievance_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitQueryGrievance($('#submit_btn_for_query_grievance'));
            }
        });
    },
    replyQueryGrievance: function (btnObj, queryGrievanceId, isEdit) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (!queryGrievanceId) {
            showError(invalidUserValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'query_grievance/get_query_grievance_data_by_id',
            type: 'post',
            data: $.extend({}, {'query_grievance_id': queryGrievanceId}, getTokenData()),
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
                    that.newQueryGrievanceForm(isEdit, parseData);
                } else {
                    that.viewQueryGrievanceForm(parseData);
                }
            }
        });
    },
    viewQueryGrievanceForm: function (parseData) {
        var that = this;
        var templateData = {};
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var formData = parseData.query_grievance_data;
        QueryGrievance.router.navigate('view_query_grievance_form');
        formData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        showFormContainer('query_grievance');
        $('#query_grievance_form_container').html(queryGrievanceViewTemplate(formData));
        $('#district').val(formData.district);
        $('#issue_category').val(formData.issue_category);
        $('#department').val(formData.department);
        $('#industry_classification').val(formData.industry_classification);

        if (formData.department == 10) {
            $('.other_department_div').show();
        }
    },
    checkValidationForQueryGrievance: function (queryGrievanceData) {
        if (!queryGrievanceData.district) {
            return getBasicMessageAndFieldJSONArray('district', queryDistrictValidationMessage);
        }
        if (!queryGrievanceData.issue_category) {
            return getBasicMessageAndFieldJSONArray('issue_category', issueCategoryValidationMessage);
        }
        if (!queryGrievanceData.department) {
            return getBasicMessageAndFieldJSONArray('department', queryDepartmentValidationMessage);
        }
        if (queryGrievanceData.department == 10)
        {
            if (!queryGrievanceData.other_department) {
                return getBasicMessageAndFieldJSONArray('other_department', queryOtherDepartmentValidationMessage);
            }
        }
        if (!queryGrievanceData.full_name) {
            return getBasicMessageAndFieldJSONArray('full_name', applicantFullNameValidationMessage);
        }
        // if (!queryGrievanceData.business_name) {
        //     return getBasicMessageAndFieldJSONArray('business_name', businessNameValidationMessage);
        // }
        if (!queryGrievanceData.mobile_no) {
            return getBasicMessageAndFieldJSONArray('mobile_no', mobileNumberValidationMessage);
        }
        if (!queryGrievanceData.email_id) {
            return getBasicMessageAndFieldJSONArray('email_id', emailValidationMessage);
        }
        if (!queryGrievanceData.query) {
            return getBasicMessageAndFieldJSONArray('query', queryDetailValidationMessage);
        }
        if (!queryGrievanceData.query_response) {
            return getBasicMessageAndFieldJSONArray('query_response', queryResponseDetailValidationMessage);
        }
        return '';
    },

    submitQueryGrievance: function (moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var that = this;
        validationMessageHide();
        var queryGrivanceData = $('#query_grievance_form').serializeFormJSON();
        var validationData = that.checkValidationForQueryGrievance(queryGrivanceData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('grievance-' + validationData.field, validationData.message);
            return false;
        }

        var btnObj = moduleType == VALUE_ONE ? $('#draft_btn_for_query_grievance') : $('#submit_btn_for_query_grievance');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var queryGrivanceData = new FormData($('#query_grievance_form')[0]);
        queryGrivanceData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        queryGrivanceData.append("module_type", moduleType);
        $.ajax({
            type: 'POST',
            url: 'query_grievance/submit_query_grievance',
            data: queryGrivanceData,
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
                validationMessageShow('grievance', textStatus.statusText);
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
                    validationMessageShow('grievance', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                showSuccess(parseData.message);
                QueryGrievance.router.navigate('query_grievance', {'trigger': true});
            }
        });
    },
});
