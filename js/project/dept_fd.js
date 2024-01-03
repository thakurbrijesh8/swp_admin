var deptFDListTemplate = Handlebars.compile($('#dept_fd_list_template').html());
var deptFDTableTemplate = Handlebars.compile($('#dept_fd_table_template').html());
var deptFDDetailsTemplate = Handlebars.compile($('#dept_fd_details_template').html());
var deptFDFDListTemplate = Handlebars.compile($('#dept_fd_fd_list_template').html());
var deptFDFDItemTemplate = Handlebars.compile($('#dept_fd_fd_item_template').html());
var tFDICnt = 1;
var DeptFD = {
    run: function () {
        this.router = new this.Router();
        this.listview = new this.listView();
    }
};
DeptFD.Router = Backbone.Router.extend({
    routes: {
        'dept_fd': 'renderList'
    },
    renderList: function () {
        DeptFD.listview.listPage();
    },
});
DeptFD.listView = Backbone.View.extend({
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
        activeLink('menu_users');
        addClass('menu_dept_fd', 'active');
        DeptFD.router.navigate('dept_fd');
        var templateData = {};
        this.$el.html(deptFDListTemplate(templateData));
        this.loadDeptFDData();

    },
    loadDeptFDData: function () {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        $('#dept_fd_datatable_container').html(pageSpinnerTemplate);
        $.ajax({
            url: 'dept_fd/get_dept_fd_data',
            type: 'post',
            data: getTokenData(),
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
                Dashboard.listview.listPage();
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
                    Dashboard.listview.listPage();
                    return false;
                }
                $('#dept_fd_datatable_container').html(deptFDTableTemplate);
                $.each(parseData.dept_fd_data, function (moduleType, deptFDData) {
                    if (deptFDData.department_name) {
                        deptFDData.module_type = moduleType;
                        $('#dept_fd_details_container').append(deptFDDetailsTemplate(deptFDData));
                        that.loadDFDetails(moduleType, deptFDData.fee_details);
                    }
                });
                $('#dept_fd_datatable').DataTable({
                    paging: false,
                    order: [[1, 'asc']],
                    columnDefs: [
                        {orderable: false, targets: [0, 2, 3, 4]},
                    ],
                    language: dataTableProcessingAndNoDataMsg,
                });
                resetCounter('dept-fd-display-cnt');
            }
        });
    },
    loadDFDetails: function (moduleType, feeDetails) {
        $.each(feeDetails, function (index, fd) {
            $('#fee_details_for_dfdlist_' + moduleType).append((index != 0 ? '<hr>' : '') + (index + 1) + '. ' + fd.description);
        });
    },
    getFeeDetails: function (btnObj, moduleType) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        if (!moduleType) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var that = this;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dept_fd/get_fee_details_by_id',
            type: 'post',
            data: $.extend({}, {'module_type': moduleType}, getTokenData()),
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
                    return false;
                }
                that.loadFD(moduleType, parseData);
            }
        });
    },
    loadFD: function (moduleType, parseData) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        var that = this;
        var qmArray = parseData.qm_array;
        qmArray.module_type = moduleType;
        var feeDetails = parseData.fee_details;
        tFDICnt = 1;
        showPopup();
        $('.swal2-popup').css('width', '40em');
        $('#popup_container').html(deptFDFDListTemplate(qmArray));
        $.each(feeDetails, function (index, fd) {
            that.addMoreFDI(moduleType, fd);
        });
        if (feeDetails.length == VALUE_ZERO) {
            that.addMoreFDI(moduleType, {'show_remove_btn': true});
        }
    },
    addMoreFDI: function (moduleType, fd) {
        fd.module_type = moduleType;
        fd.temp_cnt = tFDICnt;
        $('#fd_item_container_for_dfdlist_' + moduleType).append(deptFDFDItemTemplate(fd));
        tFDICnt++;
        resetCounter('dfdi-cnt-' + moduleType);
    },
    removeFDI: function (moduleType, tempCnt) {
        $('#fd_item_' + moduleType + '_' + tempCnt).remove();
        resetCounter('dfdi-cnt-' + moduleType);
    },
    checkValidationForDFDI: function (moduleType) {
        var reqCnt = 1;
        var newDFDItems = [];
        var exiDFDItems = [];
        var isDFDItemValidation;
        $('.fd_item_' + moduleType).each(function () {
            var that = $(this);
            var dfdItem = {};
            var tempCnt = that.find('.og_temp_cnt').val();
            if (tempCnt == '' || tempCnt == null) {
                showError(invalidAccessValidationMessage);
                isDFDItemValidation = true;
                return false;
            }
            var description = $('#description_for_ddfdi_' + tempCnt).val();
            if (description == '' || description == null || !description) {
                $('#description_for_ddfdi_' + tempCnt).focus();
                validationMessageShow('dfdi-description_for_ddfdi_' + tempCnt, descValidationMessage);
                isDFDItemValidation = true;
                return false;
            }
            dfdItem.description = description;
            var dfdId = $('#dept_fd_id_for_ddfdi_' + tempCnt).val();
            if (!dfdId || dfdId == null) {
                newDFDItems.push(dfdItem);
            } else {
                dfdItem.dept_fd_id = dfdId;
                exiDFDItems.push(dfdItem);
            }
            reqCnt++;
        });
        if (reqCnt == 1 && !isDFDItemValidation) {
            validationMessageShow('dfdi', oneFeeValidationMessage);
            isDFDItemValidation = true;
            return false;
        }
        if (isDFDItemValidation) {
            return false;
        }
        var returnData = {};
        returnData.new_dfd_items = newDFDItems;
        returnData.exi_dfd_items = exiDFDItems;
        return returnData;
    },
    submitDFDItems: function (btnObj) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
        if (tempTypeInSession != TEMP_TYPE_A) {
            Dashboard.router.navigate('dashboard', {trigger: true});
            return false;
        }
        validationMessageHide();
        var that = this;
        var moduleType = $('#module_type_for_dfdlist').val();
        if (!moduleType) {
            showError(invalidAccessValidationMessage);
            return false;
        }
        var formData = {};
        formData.module_type = moduleType;
        var dfdDetails = that.checkValidationForDFDI(moduleType);
        if (!dfdDetails) {
            return false;
        }
        formData.new_dfd_items = dfdDetails.new_dfd_items;
        formData.exi_dfd_items = dfdDetails.exi_dfd_items;
        var ogBtnHTML = btnObj.html();
        var ogBtnOnClick = btnObj.attr('onclick');
        btnObj.html(iconSpinnerTemplate);
        btnObj.attr('onclick', '');
        $.ajax({
            url: 'dept_fd/submit_dept_fee_details',
            type: 'post',
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
                showError(textStatus.statusText);
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
                    return false;
                }
                $('#fee_details_for_dfdlist_' + moduleType).html('');
                that.loadDFDetails(moduleType, parseData.dfd_data);
                showSuccess(parseData.message);
            }
        });
    }
});
