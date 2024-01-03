var loginDetailLogsListTemplate = Handlebars.compile($('#login_detail_logs_list_template').html());
var Logs = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Logs.Router = Backbone.Router.extend({
    routes: {
        'login_detail_logs': 'renderList',
    },
    renderList: function () {
        Logs.listview.listPage();
    },
});
Logs.listView = Backbone.View.extend({
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
        activeLink('menu_logs');
        addClass('menu_logs_login_detail', 'active');
        Logs.router.navigate('login_detail_logs');
        var templateData = {};
        this.$el.html(loginDetailLogsListTemplate(templateData));
        this.loadAdminLoginLogsDetail();
    },
    loadAdminLoginLogsDetail: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var nameRenderer = function (data, type, full, meta) {
            return data + ' - ' + full.username;
        };
        $('#admin_login_detail_datatable').DataTable({
            ajax: {url: 'logs/get_admin_login_logs_data', dataSrc: "admin_login_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            pageLength: 25,
            language: dataTableProcessingAndNoDataMsg,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'name', 'render': nameRenderer},
                {data: 'ip_address', 'class': 'text-center'},
                {data: 'login_time', 'class': 'text-center'},
                {data: 'logout_time', 'class': 'text-center'}
            ],
            "initComplete": function (settings, json) {
                setNewToken(json.temp_token);
            }
        });
    },
});
