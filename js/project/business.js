var businessListTemplate = Handlebars.compile($('#business_list_template').html());
var businessTableTemplate = Handlebars.compile($('#business_table_template').html());
var businessActionTemplate = Handlebars.compile($('#business_action_template').html());
var businessViewTemplate = Handlebars.compile($('#business_view_template').html());
var Business = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Business.Router = Backbone.Router.extend({
    routes: {
        'business': 'renderList',
    },
    renderList: function () {
        Business.listview.listPage();
    },
});
Business.listView = Backbone.View.extend({
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
        activeLink('menu_business');
        Business.router.navigate('business');
        var templateData = {};
        this.$el.html(businessListTemplate(templateData));
        this.loadBusinessData();
    },
    ucnDetails: function (full) {
        return '<div id="ucn_container_for_blist_' + full.business_id + '">' + full.udyam_number + '<hr>' + full.certificate_number + '</div>';
    },
    unitDetails: function (full) {
        return  '<div id="ud_container_for_blist_' + full.business_id + '">'
                + '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.unit_name
                + '<hr><b><i class="fas fa-map f-s-10px"></i></b> :- ' + full.unit_address
                + ', District:- ' + full.district_name + ', State:- ' + full.state_name + ', Pin:- ' + full.unit_pin + '</div>';
    },
    certDetails: function (full) {
        var certifiedBy = '';
        certifiedBy += (full.is_bronze_certified != '' ? (full['is_bronze_certified'].toUpperCase() == 'YES' ? 'Bronze' : '') : '');
        certifiedBy += (full.is_silver_certified != '' ? (full['is_silver_certified'].toUpperCase() == 'YES' ? (certifiedBy != '' ? ', ' : '') + 'Silver' : '') : '');
        certifiedBy += (full.is_gold_certified != '' ? (full['is_gold_certified'].toUpperCase() == 'YES' ? (certifiedBy != '' ? ', ' : '') + 'Gold' : '') : '');
        return '<div id="cd_container_for_blist_' + full.business_id + '">' + full.certification_date + '<hr>' + full.expiry_date + '<hr>' + (certifiedBy == '' ? '-' : certifiedBy) + '</div>';
    },
    amountDetails: function (full) {
        return '<div id="amount_container_for_blist_' + full.business_id + '">'
                + 'Certification Fee: &#8377;' + full.certification_fees + '/-<br>'
                + 'Subsidy Amount: &#8377;' + full.subsidy_amount + '/-<br>'
                + 'Amount Paid: &#8377;' + full.amount_paid + '/-</div>';
    },
    loadBusinessData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var logedUserDetailsRenderer = function (data, type, full, meta) {
            return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.applicant_name + '<br><b><i class="fas fa-phone-volume f-s-10px"></i></b> :- ' + full.applicant_mobile;
        };
        var ucnRenderer = function (data, type, full, meta) {
            return that.ucnDetails(full);
        };
        var unitDetailsRenderer = function (data, type, full, meta) {
            return that.unitDetails(full);
        };
        var certDetailsRenderer = function (data, type, full, meta) {
            return that.certDetails(full);
        };
        var amountRenderer = function (data, type, full, meta) {
            return that.amountDetails(full);
        };
        var actionRenderer = function (data, type, full, meta) {
            return businessActionTemplate(full);
        };
        $('#business_form_and_datatable_container').html(businessTableTemplate);
        businessDataTable = $('#business_datatable').DataTable({
            ajax: {url: 'business/get_business_data', dataSrc: "business_data", type: "post"},
            bAutoWidth: false,
            pageLength: 10,
            ordering: false,
            processing: true,
            language: dataTableProcessingAndNoDataMsg,
            serverSide: true,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: '', 'class': '', 'render': logedUserDetailsRenderer},
                {data: 'udyam_number', 'class': 'text-center', 'render': ucnRenderer},
                {data: '', 'render': unitDetailsRenderer},
                {data: '', 'class': 'text-center', 'render': certDetailsRenderer},
                {data: 'udyam_number', 'render': amountRenderer},
                {data: '', 'render': actionRenderer},
            ],
            "initComplete": searchableDatatable
        });
        $('#boiler_act_renewal_datatable_filter').remove();
    },
    getBusinessDetails: function (btnObj, businessId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!businessId) {
            showError(invalidAccessValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'business/get_business_data_by_id',
            type: 'post',
            data: $.extend({}, {'business_id': businessId}, getTokenData()),
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
                var businessData = parseData.business_data;
                that.viewBusinessForm(businessData);
            }
        });
    },
    viewBusinessForm: function (businessData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        showPopup();
        $('.swal2-popup').css('width', '45em');
        $('#popup_container').html(businessViewTemplate(businessData));
    }
});
