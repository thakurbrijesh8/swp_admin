var activeUsersListTemplate = Handlebars.compile($('#active_users_list_template').html());
var activeUsersTableTemplate = Handlebars.compile($('#active_users_table_template').html());
var activeUsersActionTemplate = Handlebars.compile($('#active_users_action_template').html());
var activeUsersViewTemplate = Handlebars.compile($('#active_users_view_template').html());

var ActiveUsers = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
ActiveUsers.Router = Backbone.Router.extend({
    routes: {
        'client_active_users': 'renderList',
    },
    renderList: function () {
        ActiveUsers.listview.listPage();
    },
});
ActiveUsers.listView = Backbone.View.extend({
    el: 'div#main_container',

    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_client_mm');
        addClass('menu_client_active_users', 'active');
        ActiveUsers.router.navigate('client_active_users');
        var templateData = {};
        this.$el.html(activeUsersListTemplate(templateData));
        this.loadActiveUsersData();
    },
    loadActiveUsersData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        activeLink('menu_client_mm');
        addClass('menu_client_active_users', 'active');
        ActiveUsers.router.navigate('client_active_users');
        var activeUsersActionRenderer = function (data, type, full, meta) {
            return activeUsersActionTemplate({'user_id': data});
        };
        $('#active_users_datatable_container').html(activeUsersTableTemplate);
        allowOnlyIntegerValue('mobile_number_for_active_users_list');
        activeUsersDataTable = $('#active_users_datatable').DataTable({
            ajax: {url: 'active_users/get_active_users_data', dataSrc: "active_users_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            pageLength: 25,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'applicant_name', 'class': 'v-a-m'},
                {data: 'mobile_number', 'class': 'text-center v-a-m'},
                {data: 'email', 'class': 'text-center v-a-m', 'render': splitStringRenderer},
                {data: 'applicant_address', 'class': 'v-a-m'},
                {data: 'verify_mobile_datetime', 'class': 'text-center v-a-m', 'render': dateTimeRenderer},
                {data: 'is_active', 'class': 'text-center v-a-m', 'render': userStatusRenderer},
                {
                    "orderable": false,
                    "data": 'user_id',
                    "render": activeUsersActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": searchableDatatable
        });
        $('#active_users_datatable_filter').remove();
    },
    askForViewActiveUsers: function (btnObj, userId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!userId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'active_users/get_active_users_data_by_id',
            type: 'post',
            data: $.extend({}, {'temp_user_id': userId}, getTokenData()),
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
                var activeUsersData = parseData.active_users_data;
                that.viewActiveUsers(activeUsersData);
            }
        });
    },
    viewActiveUsers: function (activeUsersData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_USER_ACC_VER) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        $('#model_title').html('Active User Information');
        $('#model_body').html(activeUsersViewTemplate(activeUsersData));
        $('#popup_modal').modal('show');
    },
});
