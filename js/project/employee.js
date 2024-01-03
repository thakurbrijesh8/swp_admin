var employeeListTemplate = Handlebars.compile($('#employee_list_template').html());
var employeeTableTemplate = Handlebars.compile($('#employee_table_template').html());
var employeeActionTemplate = Handlebars.compile($('#employee_action_template').html());
var employeeFormTemplate = Handlebars.compile($('#employee_form_template').html());
var Employee = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Employee.Router = Backbone.Router.extend({
    routes: {
        'employee': 'renderListForEmployee',
    },
    renderListForEmployee: function () {
        Employee.listview.listPage();
    },
});
Employee.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        Employee.router.navigate('employee');
        activeLink('menu_users');
        addClass('menu_users_employee', 'active');
        var templateData = {};
        this.$el.html(employeeListTemplate(templateData));
        this.loadEmployeeData();
    },
    loadEmployeeData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var employeeActionRenderer = function (data, type, full, meta) {
            return employeeActionTemplate({'employee_id': data});
        };
        var employeeStatusRenderer = function (data, type, full, meta) {
            return employeeStatusArray[data] ? employeeStatusArray[data] : employeeStatusArray[VALUE_ZERO];
        };
        var rolesRenderer = function (data, type, full, meta) {
            var returnString = '';
            if (data.indexOf(',') != -1) {
                var rArray = data.split(',');
                var cnt = 1;
                $.each(rArray, function (index, role) {
                    returnString += rolesArray[role] ? cnt + ') ' + rolesArray[role] + '<br>' : '';
                    cnt++;
                });
            } else {
                returnString = rolesArray[data] ? ('1) ' + rolesArray[data]) : '';
            }
            return returnString;
        };
        Employee.router.navigate('employee');
        $('#employee_datatable_container').html(employeeTableTemplate);
        if (tempTypeInSession == TEMP_TYPE_A) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_employee_list');
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], 'department_id_for_employee_list', 'department_id', 'department_name');
            generateSelect2();
        }
        $('#employee_datatable').DataTable({
            ajax: {url: 'employee/get_employee_data', dataSrc: "employee_data", type: "post"},
            bAutoWidth: false,
            pageLength: 10,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'district', 'render': districtRenderer, 'class': 'text-center'},
                {data: 'department_name'},
                {data: 'employee_name'},
                {data: 'designation'},
                {data: 'roles', 'render': rolesRenderer},
                {data: 'mobile_number', 'class': 'text-center'},
                {data: 'status', 'render': employeeStatusRenderer, 'class': 'text-center'},
                {
                    "orderable": false,
                    "data": 'employee_id',
                    "render": employeeActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#employee_datatable_filter').remove();
    },
    askForNewEmployee: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        tempDeptData = [];
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        if (tempTypeInSession != TEMP_TYPE_A) {
            that.newEmployee(false, {});
            return false;
        }
        var btnObj = $('#new_employee_btn_for_employee');
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'utility/get_district_wise_department_data',
            data: getTokenData(),
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
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnClick);
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                tempDeptData = parseData.department_data;
                that.newEmployee(false, {});
            }
        });
    },
    newEmployee: function (isEdit, employeeData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        $('#model_title').html((isEdit ? 'Update' : 'Add') + ' Employee Form');
        $('#model_body').html(employeeFormTemplate(employeeData));
        if (tempTypeInSession == TEMP_TYPE_A) {
            renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_employee');
            var deptData = tempDeptData[employeeData.district] ? tempDeptData[employeeData.district] : [];
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(deptData, 'department_id_for_employee', 'department_id', 'department_name');
            if (isEdit) {
                $('#district_for_employee').val(employeeData.district);
                $('#department_id_for_employee').val(employeeData.department_id);
            }
        }
        if (!isEdit) {
            employeeData.status = VALUE_ONE;
            employeeData.spacimen_signature = '';
            employeeData.photo = '';
        }
        generateBoxes('checkbox', rolesArray, 'roles', 'employee', employeeData.roles, false);
        generateBoxes('radio', employeeStatusArray, 'status', 'employee', employeeData.status, false);
        allowOnlyIntegerValue('mobile_number_for_employee');
        allowOnlyIntegerValue('pin_for_employee');
        if (employeeData.spacimen_signature != '') {
            that.loadDocumentData(employeeData, 'spacimen_signature', VALUE_ONE);
        }
        if (employeeData.photo != '') {
            that.loadDocumentData(employeeData, 'photo', VALUE_TWO);
        }
        generateSelect2();
        $('#popup_modal').modal('show');
        $('#employee_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitEmployee($('#submit_btn_for_employee'));
            }
        });
    },
    loadDocumentData: function (employeeData, id, moduleType) {
        $('#' + id + '_container_for_employee').hide();
        $('#' + id + '_name_container_for_employee').show();
        $('#' + id + '_name_href_for_employee').attr('href', 'documents/employee/' + employeeData[id]);
        $('#' + id + '_name_for_employee').html(employeeData[id]);
        $('#' + id + '_remove_btn_for_employee').attr('onclick', 'Employee.listview.askForRemoveDocuments("' + employeeData.employee_id + '","' + moduleType + '")');
    },
    askForRemoveDocuments: function (employeeId, moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!employeeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var yesEvent = 'Employee.listview.removeDocument(\'' + employeeId + '\',\'' + moduleType + '\')';
        showConfirmation(yesEvent, 'Remove');
    },
    removeDocument(employeeId, moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (moduleType != VALUE_ONE && moduleType != VALUE_TWO) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        if (!employeeId) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'employee/remove_document',
            data: $.extend({}, {'employee_id': employeeId, 'module_type': moduleType}, getTokenData()),
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
                showError(textStatus.statusText);
            },
            success: function (response) {
                if (!isJSON(response)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(response);
                setNewToken(parseData.temp_token);
                if (parseData.success === false) {
                    showError(parseData.message);
                    return false;
                }
                showSuccess(parseData.message);
                removeDocument(parseData.module_id, 'employee');
            }
        });
    },
    districtChangeEvent(obj, moduleName) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var district = obj.val();
        var deptData = tempDeptData[district] ? tempDeptData[district] : [];
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(deptData, 'department_id_for_' + moduleName, 'department_id', 'department_name');
        $('#department_id_for_' + moduleName).val('');
    },
    checkValidationForEmployee: function (employeeData) {
        if (tempTypeInSession == TEMP_TYPE_A) {
            if (!employeeData.district_for_employee) {
                return getBasicMessageAndFieldJSONArray('district_for_employee', districtValidationMessage);
            }
            if (!employeeData.department_id_for_employee) {
                return getBasicMessageAndFieldJSONArray('department_id_for_employee', selectDepartmentValidationMessage);
            }
        }
        if (!employeeData.employee_name_for_employee) {
            return getBasicMessageAndFieldJSONArray('employee_name_for_employee', employeeNameValidationMessage);
        }
        if (!employeeData.designation_for_employee) {
            return getBasicMessageAndFieldJSONArray('designation_for_employee', designationValidationMessage);
        }
        if (!employeeData.roles_for_employee) {
            $('#roles_for_employee_1').focus();
            return getBasicMessageAndFieldJSONArray('roles_for_employee', oneRoleValidationMessage);
        }
        if (!employeeData.email_for_employee) {
            return getBasicMessageAndFieldJSONArray('email_for_employee', emailValidationMessage);
        }
        var emailMessage = emailIdValidation(employeeData.email_for_employee);
        if (emailMessage != '') {
            return getBasicMessageAndFieldJSONArray('email_for_employee', emailMessage);
        }
        if (!employeeData.mobile_number_for_employee) {
            return getBasicMessageAndFieldJSONArray('mobile_number_for_employee', mobileValidationMessage);
        }
        var mobMessage = mobileNumberValidation(employeeData.mobile_number_for_employee);
        if (mobMessage != '') {
            return getBasicMessageAndFieldJSONArray('mobile_number_for_employee', mobMessage);
        }
        if (!employeeData.pin_for_employee) {
            return getBasicMessageAndFieldJSONArray('pin_for_employee', pinValidationMessage);
        }
        if (employeeData['pin_for_employee'].length != 6) {
            return getBasicMessageAndFieldJSONArray('pin_for_employee', sixDigitPinValidationMessage);
        }
        if ($('#spacimen_signature_container_for_employee').is(':visible')) {
            var spacimenSignature = $('#spacimen_signature_for_employee').val();
            if (!spacimenSignature) {
                return getBasicMessageAndFieldJSONArray('spacimen_signature_for_employee', uploadDocValidationMessage);
            }
            var ssMessage = fileUploadValidationForImage('spacimen_signature_for_employee', 1024);
            if (ssMessage != '') {
                return getBasicMessageAndFieldJSONArray('spacimen_signature_for_employee', ssMessage);
            }
        }
        var photo = $('#photo_for_employee').val();
        if (photo != '') {
            var photoMessage = fileUploadValidationForImage('photo_for_employee');
            if (photoMessage != '') {
                return getBasicMessageAndFieldJSONArray('photo_for_employee', photoMessage);
            }
        }
        return '';
    },
    submitEmployee: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var employeeData = $('#employee_form').serializeFormJSON();
        var validationData = that.checkValidationForEmployee(employeeData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('employee-' + validationData.field, validationData.message);
            return false;
        }
        var roles = [];
        $.each($("input[name='roles_for_employee']:checked"), function () {
            roles.push($(this).val());
        });
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var url = employeeData.employee_id_for_employee != '' ? 'update' : 'save';
        var formData = new FormData($('#employee_form')[0]);
        formData.append("csrf_token_eodbsws_admin", getTokenData()['csrf_token_eodbsws_admin']);
        formData.append("roles_for_employee", roles);
        $.ajax({
            type: 'POST',
            url: 'employee/' + url + '_employee',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
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
                validationMessageShow('employee', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnClick);
                if (!isJSON(data)) {
                    loginPage();
                    return false;
                }
                var parseData = JSON.parse(data);
                setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    validationMessageShow('employee', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadEmployeeData();
                resetModel();
                showSuccess(parseData.message);
            }
        });
    },
    editEmployee: function (btnObj, employeeId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!employeeId) {
            showError(invalidEmployeeValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'employee/get_employee_data_by_id',
            type: 'post',
            data: $.extend({}, {'employee_id': employeeId}, getTokenData()),
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
                tempDeptData = parseData.department_data;
                that.newEmployee(true, parseData.employee_data);
            }
        });
    },
});
