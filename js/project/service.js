var serviceListTemplate = Handlebars.compile($('#service_list_template').html());
var serviceTableTemplate = Handlebars.compile($('#service_table_template').html());
var serviceActionTemplate = Handlebars.compile($('#service_action_template').html());
var serviceFormTemplate = Handlebars.compile($('#service_form_template').html());
var serviceItemTemplate = Handlebars.compile($('#service_item_template').html());
var questionCnt = 1;
var Service = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
Service.Router = Backbone.Router.extend({
    routes: {
        'service': 'renderList',
    },
    renderList: function () {
        Service.listview.listPage();
    },
});
Service.listView = Backbone.View.extend({
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
        activeLink('menu_users');
        addClass('menu_users_service', 'active');
        Service.router.navigate('service');
        var templateData = {};
        this.$el.html(serviceListTemplate(templateData));
        this.loadServiceData();

    },
    loadServiceData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        Service.router.navigate('service');
        var serviceActionRenderer = function (data, type, full, meta) {
            return serviceActionTemplate({'service_id': data});
        };
        var serviceTypeRenderer = function (data, type, full, meta) {
            return getCheckboxValue(data, serviceTypeArray);
        };
        $('#service_form_and_datatable_container').html(serviceTableTemplate);
        $('#service_datatable').DataTable({
            ajax: {url: 'service/get_service_data', dataSrc: "service_data", type: "post", data: getTokenData()},
            bAutoWidth: false,
            pageLength: 20,
            language: dataTableProcessingAndNoDataMsg,
            columns: [
                {data: '', 'render': serialNumberRenderer, 'class': 'text-center'},
                {data: 'daman_department_name'},
                {data: 'diu_department_name'},
                {data: 'dnh_department_name'},
                {data: 'service_name'},
                {data: 'service_type', 'render': serviceTypeRenderer},
                {data: 'timeline', 'class': 'text-center'},
                {
                    "orderable": false,
                    "data": 'service_id',
                    "render": serviceActionRenderer,
                    'class': 'text-center'
                }
            ],
            "initComplete": function (settings, json) {
                setNewToken(json.temp_token);
            }
        });
    },
    newServiceForm: function (isEdit, serviceData, questionaryData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        questionCnt = 1;
        var that = this;
        $('#service_form_and_datatable_container').html(serviceFormTemplate(serviceData));
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempDeptData[TALUKA_DAMAN], 'daman_department_id_for_service', 'department_id', 'department_name');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempDeptData[TALUKA_DIU], 'diu_department_id_for_service', 'department_id', 'department_name');
        renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempDeptData[TALUKA_DNH], 'dnh_department_id_for_service', 'department_id', 'department_name');
        generateBoxes('checkbox', serviceTypeArray, 'service_type', 'service', serviceData.service_type, true);
        generateBoxes('checkbox', cbTypeArray, 'size_of_firm', 'service', serviceData.size_of_firm, true);
        generateBoxes('checkbox', riskCategoryArray, 'risk_category', 'service', serviceData.risk_category, true);
        generateBoxes('checkbox', foreignDomesticInvestorArray, 'foreign_domestic_investor', 'service', serviceData.foreign_domestic_investor, true);
        if (isEdit) {
            $('#daman_department_id_for_service').val(serviceData.daman_department_id);
            $('#diu_department_id_for_service').val(serviceData.diu_department_id);
            $('#dnh_department_id_for_service').val(serviceData.dnh_department_id);
            $.each(questionaryData, function (index, qData) {
                that.addQuestion(qData);
            });
        }
        generateSelect2();
        $('#service_form').find('input').keypress(function (e) {
            if (e.which == 13) {
                that.submitService($('#submit_btn_for_service'));
            }
        });
    },
    addQuestion: function (questionData) {
        questionData.cnt = questionCnt;
        $('#questionary_item_container_for_service').append(serviceItemTemplate(questionData));
        generateBoxes('radio', yesNoTypeArray, 'answer', 'service_' + questionCnt, questionData.answer, false);
        resetCounter('display-cnt');
        questionCnt++;
    },
    editService: function (btnObj, serviceId) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A && tempTypeInSession != TEMP_TYPE_VDD) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!serviceId) {
            showError(invalidServiceValidationMessage);
            return;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'service/get_service_data_by_id',
            type: 'post',
            data: $.extend({}, {'service_id': serviceId}, getTokenData()),
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
                that.newServiceForm(true, parseData.service_data, parseData.questionary_data);
            }
        });
    },
    checkValidationForService: function (serviceData) {
        if (!serviceData.daman_department_id_for_service && !serviceData.diu_department_id_for_service && !serviceData.dnh_department_id_for_service) {
            return getBasicMessageAndFieldJSONArray('daman_department_id_for_service', selectDepartmentValidationMessage);
        }
        if (!serviceData.service_name_for_service) {
            return getBasicMessageAndFieldJSONArray('service_name_for_service', serviceNameValidationMessage);
        }
        if (!serviceData.risk_category_for_service) {
            return getBasicMessageAndFieldJSONArray('risk_category_for_service', oneOptionValidationMessage);
        }
        if (!serviceData.size_of_firm_for_service) {
            return getBasicMessageAndFieldJSONArray('size_of_firm_for_service', oneOptionValidationMessage);
        }
        if (!serviceData.foreign_domestic_investor_for_service) {
            return getBasicMessageAndFieldJSONArray('foreign_domestic_investor_for_service', oneOptionValidationMessage);
        }
        if (!serviceData.service_type_for_service) {
            return getBasicMessageAndFieldJSONArray('service_type_for_service', oneOptionValidationMessage);
        }
        if (!serviceData.timeline_for_service) {
            return getBasicMessageAndFieldJSONArray('timeline_for_service', enterTimelineValidationMessage);
        }
        return '';
    },
    submitService: function (btnObj) {
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
        var serviceData = $('#service_form').serializeFormJSON();
        var validationData = that.checkValidationForService(serviceData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('service-' + validationData.field, validationData.message);
            return false;
        }
        var serviceItems = [];
        var isServiceItemValidation;
        $('.questionary_item').each(function () {
            var that = $(this);
            var tempCnt = that.find('.questionary_item_cnt').val();
            if (tempCnt == '' || tempCnt == null) {
                showError(invalidAccessValidationMessage);
                isServiceItemValidation = true;
                return false;
            }
            var serviceItem = {};
            var question = $('#question_for_service_' + tempCnt).val();
            if (question == '' || question == null) {
                $('#question_for_service_' + tempCnt).focus();
                validationMessageShow('service-question_for_service_' + tempCnt, enterQuestionValidationMessage);
                isServiceItemValidation = true;
                return false;
            }
            serviceItem.question = question;
            var answer = $('input[name="answer_for_service_' + tempCnt + '"]:checked').val();
            if (!answer) {
                $('#answer_for_service_' + tempCnt).focus();
                validationMessageShow('service-answer_for_service_' + tempCnt, oneOptionValidationMessage);
                isServiceItemValidation = true;
                return false;
            }
            serviceItem.answer = answer;
            serviceItems.push(serviceItem);
        });
        if (isServiceItemValidation) {
            return false;
        }
        serviceData.questionary_items = serviceItems;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'service/submit_service',
            data: $.extend({}, serviceData, getTokenData()),
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
                    showError(parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                that.loadServiceData();
                showSuccess(parseData.message);
            }
        });
    },
});
