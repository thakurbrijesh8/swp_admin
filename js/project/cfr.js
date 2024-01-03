var cfrListTemplate = Handlebars.compile($('#cfr_list_template').html());
var cfrTableTemplate = Handlebars.compile($('#cfr_table_template').html());

var CFR = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
CFR.Router = Backbone.Router.extend({
    routes: {
        'cfr': 'renderList',
    },
    renderList: function () {
        CFR.listview.listPage();
    },
});
CFR.listView = Backbone.View.extend({
    el: 'div#main_container',
    listPage: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        activeLink('menu_cfr');
        CFR.router.navigate('cfr');
        var templateData = {};
        this.$el.html(cfrListTemplate(templateData));
        this.loadCFRData();

    },
    loadCFRData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        var regulationRenderer = function (data, type, full, meta) {
            return  'No Draft Regulation Available for Feedback Submission';
        };
        var fdRenderer = function (data, type, full, meta) {
            return '<pre>' + data + '</pre>';
        };
        var cdRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-mobile f-s-10px"></i></b> :- ' + full.mobile_number + '<br>'
                    + '<b><i class="fas fa-envelope f-s-10px"></i></b> :- ' + full.email + '<br>'
                    + '<b><i class="fas fa-phone-alt f-s-10px"></i></b> :- ' + full.landline_number + '<br>';

        };
        CFR.router.navigate('cfr');
        $('#cfr_datatable_container').html(cfrTableTemplate);
        cfrDataTable = $('#cfr_datatable').DataTable({
            ajax: {url: 'cfr/get_cfr_data', dataSrc: "cfr_data", type: "post"},
            bAutoWidth: false,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center f-w-b'},
                {data: 'created_time', 'class': 'text-center', 'render': dateTimeRenderer},
                {data: '', 'class': 'text-center', 'render': regulationRenderer},
                {data: 'full_name'},
                {data: '', 'class': 'f-s-12px', 'render': cdRenderer},
                {data: 'feedback', 'render': fdRenderer}
            ],
            "initComplete": searchableDatatable
        });
        $('#cfr_datatable_filter').remove();
    }
});
