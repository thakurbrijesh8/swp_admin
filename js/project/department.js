var departmentListTemplate = Handlebars.compile($('#department_list_template').html());
var departmentTableTemplate = Handlebars.compile($('#department_table_template').html());
var departmentActionTemplate = Handlebars.compile($('#department_action_template').html());
var departmentFormTemplate = Handlebars.compile($('#department_form_template').html());
var Department = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Department.Router = Backbone.Router.extend({
    routes: {
        'department': 'renderListForDepartment',
    },
    renderListForDepartment: function () {
        Department.listview.listPage();
    },
});
Department.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        Department.router.navigate('department');
        activeLink('menu_users');
        addClass('menu_users_department', 'active');
        var templateData = {};
        this.$el.html(departmentListTemplate(templateData));
        this.loadDepartmentData();
    },
    loadDepartmentData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var departmentActionRenderer = function (data, type, full, meta) {
            return departmentActionTemplate({'department_id': data});
        };
        Department.router.navigate('department');
        $('#department_datatable_container').html(departmentTableTemplate);
        $('#department_datatable').DataTable({
            ajax: {url: 'department/get_department_data', dataSrc: "department_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            pageLength: 10,
            language: dataTableProcessingAndNoDataMsg,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'district', 'render': districtRenderer, 'class': 'text-center'},
                {data: 'department_name'},
                {data: 'department_address'},
                {data: 'landline_number'},
                {data: 'hod_designation'},
                {data: 'hof_designation'},
                {
                    "orderable": false,
                    "data": 'department_id',
                    "render": departmentActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": function (settings, json) {
                setNewToken(json.temp_token);
                tempDeptData = json.temp_department_data;
            }
        });
    },
    newDepartment: function (isEdit, departmentData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        $('#model_title').html((isEdit ? 'Update' : 'Add') + ' Department Form');
        $('#model_body').html(departmentFormTemplate(departmentData));
        renderOptionsForTwoDimensionalArray(talukaArray, 'district_for_department');
        if (isEdit) {
            $('#district_for_department').val(departmentData.district);
        }
        generateSelect2();
        $('#popup_modal').modal('show');
        $('#department_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitDepartment($('#submit_btn_for_department'));
            }
        });
    },
    submitDepartment: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        validationMessageHide();
        var departmentId = $('#department_id_for_department').val();
        var district = $('#district_for_department').val();
        if (!district) {
            $('#district_for_department').focus();
            validationMessageShow('department-district_for_department', districtValidationMessage);
            return false;
        }
        var department = $('#department_name_for_department').val();
        if (!department) {
            $('#department_name_for_department').focus();
            validationMessageShow('department-department_name_for_department', departmentValidationMessage);
            return false;
        }
        var formData = $('#department_form').serializeFormJSON();
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        var url = departmentId != '' ? 'update' : 'save';
        $.ajax({
            type: 'POST',
            url: 'department/' + url + '_department',
            data: $.extend({}, formData, getTokenData()),
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
                validationMessageShow('department', textStatus.statusText);
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
                    validationMessageShow('department', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadDepartmentData();
                resetModel();
                showSuccess(parseData.message);
            }
        });
    },
    editDepartment: function (btnObj, departmentId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!departmentId) {
            showError(invalidDepartmentValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr("onclick");
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'department/get_department_data_by_id',
            type: 'post',
            data: $.extend({}, {'department_id': departmentId}, getTokenData()),
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
                that.newDepartment(true, parseData.department_data);
            }
        });
    },
});
