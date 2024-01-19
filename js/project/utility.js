(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push($.trim(this.value) || '');
            } else {
                o[this.name] = $.trim(this.value) || '';
            }
        });
        return o;
    };

})(jQuery);

function loginPage() {
    window.location = baseUrl + 'login';
}

function checkValidation(moduleName, fieldName, messageName) {
    var val = $('#' + fieldName).val();
    var newFieldName = moduleName + '-' + fieldName;
    validationMessageHide(newFieldName);
    if (!val || !val.trim()) {
        validationMessageShow(newFieldName, messageName);
    }
}

function validationMessageHide(moduleName) {
    if (typeof moduleName === "undefined") {
        $('.error-message').hide();
        $('.error-message').html('');
    } else {
        $('.error-message-' + moduleName).hide();
        $('.error-message-' + moduleName).html('');
    }
}

function validationMessageShow(moduleName, messageName) {
    $('.error-message-' + moduleName).html(messageName);
    $('.error-message-' + moduleName).show();
}

function getBasicMessageAndFieldJSONArray(field, message) {
    var returnData = {};
    returnData['message'] = message;
    returnData['field'] = field;
    return returnData;
}

function resetForm(formId) {
    validationMessageHide();
    $('#' + formId).trigger("reset");
}

function checkPasswordValidation(moduleName, id) {
    var password = $('#' + id).val();
    if (!password) {
        validationMessageShow(moduleName + '-' + id, passwordValidationMessage);
        return;
    }
    var msg = passwordValidation(password);
    if (msg != '') {
        validationMessageShow(moduleName + '-' + id, msg);
        return;
    }
    validationMessageHide(moduleName + '-' + id);
}

function passwordValidation(password) {
    var regex = new RegExp(passwordRegex);
    if (!regex.test(password)) {
        return passwordPolicyValidationMessage;
    }
    return '';
}

function checkPasswordValidationForRetypePassword(moduleName, compareId, id) {
    var retypePassword = $('#' + compareId).val();
    if (!retypePassword) {
        validationMessageHide(moduleName + '-' + compareId);
        return;
    }
    var password = $('#' + id).val();
    if (password != retypePassword) {
        validationMessageShow(moduleName + '-' + compareId, passwordAndRetypePasswordValidationMessage);
        return;
    }
    validationMessageHide(moduleName + '-' + compareId);
}

function passwordValidation(password) {
    if (!passwordRegex.test(password)) {
        return passwordPolicyValidationMessage;
    }
    return '';
}

function generateSelect2() {
    $('.select2').select2({"allowClear": true});
}

function generateSelect2WithId(id) {
    $('#' + id).select2({"allowClear": true});
}

function renderOptionsForTwoDimensionalArray(dataArray, comboId, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        data = {"value_field": index, 'text_field': dataObject};
        optionResult = optionTemplate(data);
        $("#" + comboId).append(optionResult);
    });
}

function renderOptionsForTwoDimensionalArrayIndexValue(dataArray, comboId, valueId, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        data = {"value_field": index, 'text_field': dataObject[valueId]};
        optionResult = optionTemplate(data);
        $("#" + comboId).append(optionResult);
    });
}

function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(dataArray, comboId, keyId, valueId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="">Select ' + message + '</option>');
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            data = {"value_field": dataObject[keyId], 'text_field': dataObject[valueId]};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}
function renderOptionsForStateAndDistrict(dataArray, comboId, keyId, valueId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="0">' + message + '</option>');
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            data = {"value_field": dataObject[keyId], 'text_field': dataObject[valueId]};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}

function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(dataArray, comboId, keyId, valueId, valueId2, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    var optionResult = "";
    var textField = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            if (dataObject[valueId2]) {
                textField = dataObject[valueId] + (dataObject[valueId2] != null ? '( ' + dataObject[valueId2] + ' )' : '');
            } else {
                textField = dataObject[valueId];
            }
            data = {"value_field": dataObject[keyId], 'text_field': textField};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}

function dateTo_DD_MM_YYYY(date, delimeter) {
    var delim = delimeter ? delimeter : '-';
    var d = new Date(date || Date.now()),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join(delim);
}

function dateTo_DD_MM_YYYY_HH_II_SS(date, delimeter) {
    var delim = delimeter ? delimeter : '-';
    var d = new Date(date || Date.now()),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return [day, month, year].join(delim) + ' ' + hours + ':' + minutes + ':' + seconds;
}

function getPerviousDateTo_DD_MM_YYYY(days, date) {
    var d = new Date(date || Date.now());
    d.setDate(d.getDate() - days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;
    return [day, month, year].join('-');
}

function getNextDateTo_DD_MM_YYYY(days, date) {
    var ndate = date.split("-").reverse().join("-");
    var d = new Date(ndate || Date.now());
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;
    return [day, month, year].join('-');
}

function dateTo_YYYY_MM_DD(date, delimeter) {
    return date.split('-').reverse().join('-');
}

function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return hours + ":" + minutes + ":" + " " + am_pm;
}

function checkPincode(obj) {
    var pincode = obj.val();
    var pincodeValidationMessage = pincodeValidation(pincode);
    if (pincodeValidationMessage != '') {
        showError(pincodeValidationMessage);
        return false;
    }
}


function pincodeValidation(pincode) {
    if (!pincode) {
        return '';
    }
    var regex = /^[1-9][0-9]{5}$/;
    if (!regex.test(pincode)) {
        return 'Invalid Pincode';
    }
    return '';
}

function checkNumeric(obj) {
    if (!$.isNumeric(obj.val())) {
        obj.val("");
    }
}

function allowOnlyIntegerValue(id) {
    allowOnlyIntegerValueObj($('#' + id));
}

function allowOnlyIntegerValueObj(obj) {
    obj.keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}

function roundOff(obj) {
    var amount = obj.val();
    if ($.isNumeric(amount)) {
        obj.val(parseFloat(Math.abs(amount)).toFixed(2));
    }
}

var districtRenderer = function (data, type, full, meta) {
    return talukaArray[data] ? talukaArray[data] : '';
};
var entityEstablishmentRenderer = function (data, type, full, meta) {
    return entityEstablishmentTypeArray[data] ? entityEstablishmentTypeArray[data] : '';
};
var serialNumberRenderer = function (data, type, full, meta) {
    return meta.row + meta.settings._iDisplayStart + 1;
};

var districtRenderer = function (data, type, full, meta) {
    return talukaArray[data] ? talukaArray[data] : '-';
};
var yesNoRenderer = function (data, type, full, meta) {
    return yesNoTypeArray[data] ? yesNoTypeArray[data] : '-';
};

var appStatusRenderer = function (data, type, full, meta) {

    return '<div id="status_' + data + '">' + (appStatusArray[full.status] ? appStatusArray[full.status] : appStatusArray[VALUE_ZERO]) + '</div>' +
            '<div id="total_fees_' + data + '">' + returnFees(full) + '</div>';

};
var AppStatusforSRRenderer = function (data, type, full, meta) {
    return '<div id="status_' + data + '">' + (appStatusArray[full.status] ? appStatusArray[full.status] : appStatusArray[VALUE_ZERO]) + '</div>' +
            '<div id="total_fees_' + data + '">' + returnFees(full) + '</div>' +
            '<hr><div id="letter_status_' + data + '">' + (socRegUlStatusArray[full.letter_status] ? socRegUlStatusArray[full.letter_status] : socRegUlStatusArray[VALUE_ZERO]) + '</div>';
};
function returnFees(full) {
    return (full.total_fees ? (full.total_fees != VALUE_ZERO ? '<hr><span class="badge bg-success app-status">Fees : ' + full.total_fees + '/-</span>' : '') : '')
}

var queryStatusRenderer = function (data, type, full, meta) {
    return '<div id="query_status_' + data + '">' + (queryStatusArray[full.query_status] ? queryStatusArray[full.query_status] : queryStatusArray[VALUE_ZERO]) + '</div>' +
            '<hr><div id="query_movement_status_' + data + '">' + (full.query_movement_string ? full.query_movement_string : '-') + '</div>';
};
var queryGrievanceStatusRenderer = function (data, type, full, meta) {
    return '<div id="query_grievance_status_' + data + '">' + (queryGrievanceStatusArray[full.status] ? queryGrievanceStatusArray[full.status] : queryGrievanceStatusArray[VALUE_ZERO]) + '</div>';
};

var dateRenderer = function (data, type, full, meta) {
    return dateTo_DD_MM_YYYY(data);
};

var dateTimeRenderer = function (data, type, full, meta) {
    return data != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(data) : '-';
};

function dateTimeDays(data, full, moduleType) {
    var returnString = (full.submitted_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(full.submitted_datetime) : '-');
    if (full.processing_days) {
        var timelineDays = queryModuleArray[moduleType] ? queryModuleArray[moduleType] : '';
        if (timelineDays['day']) {
            var daysText = 'danger';
            if (full.processing_days <= timelineDays['day']) {
                daysText = 'success';
            }
            returnString += '<hr><span class="badge bg-' + daysText + ' app-status">' + full.processing_days + ' ' + (full.processing_days <= 1 ? 'Day' : 'Days') + '</span>';
        }
    }
    return '<div id="so_status_' + data + '">' + returnString + '</div>';
}

function dashboardNaviationToModule(sDistrict, sStatus, sAppTimingStatus, resetPageEvent) {
    var sDisplayText = '';
    if (typeof sDistrict === "undefined") {
        sDistrict = '';
    } else {
        sDisplayText += (talukaArray[sDistrict] ? '<span class="badge bg-info app-status">' + talukaArray[sDistrict] + '</span>' : '');
    }
    if (typeof sAppTimingStatus === "undefined") {
        sAppTimingStatus = '';
    } else {
        var asText = sAppTimingStatus == VALUE_ONE ? 'light-green' : 'light-red';
        var asTextTitle = sAppTimingStatus == VALUE_ONE ? 'Within Time' : 'Delayed as per SLA';
        sDisplayText += ' <b>></b> <span class="badge bg-' + asText + ' app-status">' + asTextTitle + '</span>';
    }
    if (typeof sStatus === "undefined") {
        sStatus = '';
    } else {
        var tempText = (sStatus == VALUE_TEN ? '<span class="badge bg-warning app-status">Queried</span>' : (appStatusArray[sStatus] ? appStatusArray[sStatus] : ''));
        sDisplayText += tempText != '' ? ' <b>></b> ' + tempText : '';
    }
    if (sDisplayText != '') {
        sDisplayText += ' : <span class="badge bg-danger app-status cursor-pointer" style="padding: 7px !important;" ' +
                'onclick="' + resetPageEvent + '"><i class="fas fa-sync-alt"></i>&nbsp; Reset Search</span>';
    }
    var returnData = {};
    returnData.s_display_text = sDisplayText;
    returnData.search_district = sDistrict;
    returnData.search_status = sStatus;
    returnData.search_app_timing_status = sAppTimingStatus;
    return returnData;
}

var premisesStatusRenderer = function (data, type, full, meta) {
    return premisesStatusArray[data] ? premisesStatusArray[data] : '';
};

var emailEditsplitStringRenderer = function (data, type, full, meta) {
    var btn = full.is_delete == VALUE_ONE ? '' : '<button class="btn btn-sm" onclick="VPUsers.listview.editEmailVPUsers($(this),' + full.user_id + ', false);" style="padding: 2px 5px; margin-top: 1px; margin-bottom: 2px;"> <i class="fas fa-edit text-success" style="margin-right: 2px;"></i></button>';
    return data.replace('@', '<br>@') + btn;
};

var splitStringRenderer = function (data, type, full, meta) {
    return data.replace('@', '<br>@');
};

var yesNoRenderer = function (data, type, full, meta) {
    return yesNoArray[data] ? yesNoArray[data] : '-';
};

var userStatusRenderer = function (data, type, full, meta) {
    return userStatusArray[data] ? userStatusArray[data] : '-';
};

function checkAlphabets(obj) {
    obj.val(obj.val().replace(/[^a-z A-Z.]/g, ""));
    if ((event.which >= 48 && event.which <= 57)) {
        event.preventDefault();
    }
}

function checkAlphabetsBlur(obj) {
    obj.val(obj.val().replace(/[^a-z A-Z.]/g, ''));
}

function datePicker() {
    $('.date_picker').datetimepicker({
        icons:
                {
                    up: 'fa fa-angle-up',
                    down: 'fa fa-angle-down',
                    next: 'fa fa-angle-right',
                    previous: 'fa fa-angle-left'
                }
    });
    dateChangeEvent();
}

function startDateEndDateFunctionality(startDateId, endDateId) {
    $('#' + startDateId).datetimepicker();
    $('#' + endDateId).datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $('#' + startDateId).on("dp.change", function (e) {
        $('#' + endDateId).data("DateTimePicker").minDate(e.date);
    });
    $('#' + endDateId).on("dp.change", function (e) {
        $('#' + startDateId).data("DateTimePicker").maxDate(e.date);
    });
    dateChangeEvent();
}

function timePicker() {
    $('.timepicker').datetimepicker({
        format: 'LT'
    })
}

function dateChangeEvent() {
    $('.date_picker').keyup(function (e) {
        e = e || window.event; //for pre-IE9 browsers, where the event isn't passed to the handler function
        if (e.keyCode == '37' || e.which == '37' || e.keyCode == '39' || e.which == '39') {
            var message = ' ' + $('.ui-state-hover').html() + ' ' + $('.ui-datepicker-month').html() + ' ' + $('.ui-datepicker-year').html();
            if ($(this).attr('id') == 'startDate') {
                $(".date_picker").val(message);
            }
        }
    });
}

function checkValidationForMobileNumber(moduleName, id) {
    var mobileNumber = $('#' + id).val();
    if (!mobileNumber) {
        validationMessageShow(moduleName + '-' + id, mobileValidationMessage);
        return;
    }
    var validate = mobileNumberValidation(mobileNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
    validationMessageHide(moduleName + '-' + id);
}

function mobileNumberValidation(mobileNumber) {
    var filter = /^[0-9-+]+$/;
    if (mobileNumber.length != 10 || !filter.test(mobileNumber)) {
        return invalidMobileValidationMessage;
    }
    return '';
}

function checkValidationForEmail(moduleName, id) {
    var emailId = $('#' + id).val();
    if (!emailId) {
        validationMessageShow(moduleName + '-' + id, emailValidationMessage);
        return false;
    }
    var validate = emailIdValidation(emailId);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
    validationMessageHide(moduleName + '-' + id);
}

function checkValidationForExiEmail(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var emailId = $('#' + id).val();
    if (!emailId) {
        return false;
    }
    var validate = emailIdValidation(emailId);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function checkValidationForEmailBlank(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var emailId = $('#' + id).val();
    if (!emailId) {
        return false;
    }
    var validate = emailIdValidation(emailId);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function emailIdValidation(emailId) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(emailId)) {
        return invalidEmailValidationMessage;
    }
    return '';
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000
});

function toastFire(type, message) {
    Toast.fire({
        type: type,
        title: '<span style="padding-left: 10px; padding-right: 10px;">' + message + '</span>',
        showCloseButton: true,
    });
}

function showConfirmation(yesEvent, message) {
    $('.swal2-popup').removeClass('p-5px');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure You want to ' + message + ' ?',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, ' + message + ' it !',
        cancelButtonText: 'No, Cancel !',
    }).then((result) => {
        if (result.value) {
            $('#temp_btn').attr('onclick', yesEvent);
            $('#temp_btn').click();
            $('#temp_btn').attr('onclick', '');
        }
    });
}

function showPopup() {
    const swalWithBootstrapButtons = Swal.mixin({});
    swalWithBootstrapButtons.fire({
        showCancelButton: false,
        showConfirmButton: false,
        html: '<div id="popup_container"></div>',
    });
    $('.swal2-popup').addClass('p-5px');
}

function showSuccess(message) {
    toastFire('success', message);
}

function showError(message) {
    toastFire('error', message);
}

function activeLink(id) {
    $('.nav-link').removeClass('active');
    addClass(id, 'active');
}

function addClass(id, className) {
    $('#' + id).addClass(className);
}

function addTagSpinner(id) {
    $('#' + id).parent().find('.error-message').before(tagSpinnerTemplate);
}

function removeTagSpinner() {
    $('#tag_spinner').remove();
}

function resetModel() {
    $('#popup_modal').modal('hide');
    $('#model_title').html('');
    $('#model_body').html('');
}

function activeSelectedBtn(obj) {
    $('.small-btn').removeClass('btn-success');
    $('.small-btn').addClass('btn-primary');
    if (obj) {
        obj.removeClass('btn-primary');
        obj.addClass('btn-success');
    }
}

function selectOrDeselectRow(obj, id) {
    if (obj.hasClass('bg-white')) {
        obj.removeClass('bg-white');
        obj.addClass('bg-active');
        $('#' + id).prop('checked', true);
    } else {
        obj.removeClass('bg-active');
        obj.addClass('bg-white');
        $('#' + id).prop('checked', false);
    }
}

function getTotalSelectedRows(id) {
    $('#' + id).html($('.bg-active').length);
}

var trimColumnValueRenderer = function (data, type, full, meta) {
    return (data).trim();
};

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getDistrictData(stateId, districtId) {
    renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], districtId, 'district_code', 'district_name', 'District');
    $('#' + districtId).val('');
    var stateCode = $('#' + stateId).val();
    if (!stateCode) {
        return;
    }
    var districtData = tempDistrictData[stateCode] ? tempDistrictData[stateCode] : [];
    renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(districtData, districtId, 'district_code', 'district_name', 'District');
    $('#' + districtId).val('');
}

function fileUploadValidationForImage(imageUploadAttrId, maxFileSize) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > maxFileSize) {
        return 'Maximum upload size ' + (maxFileSize / 1024) + ' MB only.';
    }
    return false;
}

function fileUploadValidation(imageUploadAttrId, maxFileSize) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif', 'pdf'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > maxFileSize) {
        return 'Maximum upload size ' + (maxFileSize / 1024) + ' MB only.';
    }
    return false;
}

function fileUploadValidationForPDF(imageUploadAttrId, maxFileSize) {
    var allowedFiles = ['pdf'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > maxFileSize) {
        return 'Maximum upload size ' + (maxFileSize / 1024) + ' MB only.';
    }
    return false;
}

function checkValidationForDocumentfileUploadValidation(imageUploadAttrId, maxFileSize) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif', 'pdf'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > maxFileSize) {
        return 'Maximum upload size ' + (maxFileSize / 1024) + ' MB only.';
    }
    return false;
}

function fileUploadValidationForAllFiles(imageUploadAttrId, maxFileSize) {
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > maxFileSize) {
        return 'Maximum upload size ' + (maxFileSize / 1024) + ' MB only.';
    }
    return false;
}

var dataTableProcessingAndNoDataMsg = {
    'loadingRecords': '<span class="color-nic-blue"><i class="fas fa-spinner fa-spin fa-2x"></i></span>',
    'processing': '<span class="color-nic-blue"><i class="fas fa-spinner fa-spin fa-3x"></i></span>',
    'emptyTable': 'No Data Available !'
};

var searchableDatatable = function (settings, json) {
    this.api().columns().every(function () {
        var that = this;
        $('input', this.header()).on('keyup change clear', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
        $('select', this.header()).on('change', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
}

var fontRenderer = function (data, type, full, meta) {
    return '<span class="table-bold-data">' + data + '</span>';
};

function getSubCategoryData(categoryIdText, subCategoryIdText) {
    renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor([], subCategoryIdText, 'sub_category_id', 'sub_category_name', 'Sub Category');
    var categoryId = $('#' + categoryIdText).val();
    if (!categoryId) {
        return;
    }
    $.ajax({
        url: 'pmanage/get_sub_category_data_for_product',
        type: 'post',
        data: $.extend({}, {'category_id': categoryId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            showError(textStatus.statusText);
            $('html, body').animate({scrollTop: '0px'}, 0);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(parseData.sub_category_data, subCategoryIdText, 'sub_category_id', 'sub_category_name', 'Sub Category');
            $('#' + subCategoryIdText).val('');
        }
    });
}

function getActName(actArray, actId) {
    return actArray[actId] ? actArray[actId]['act_name'] : ''
}

function generateBoxes(type, data, id, moduleName, existingArray, isBr) {
    $.each(data, function (index, value) {
        var template = '<label class="' + type + '-inline f-w-n m-b-0px m-r-10px"><input type="' + type + '" id="' + id + '_for_' + moduleName + '_' + index + '" name="' + id + '_for_' + moduleName + '" value="' + index + '">&nbsp;&nbsp;' + value + '</label>';
        if (isBr) {
            template += '<br>';
        }
        $('#' + id + '_container_for_' + moduleName).append(template);
    });
    if (existingArray) {
        if (type == 'checkbox') {
            var existingData = (existingArray).split(',');
            $.each(existingData, function (index, value) {
                $('input[name=' + id + '_for_' + moduleName + '][value="' + value + '"]').click();
            });
        } else {
            $('input[name=' + id + '_for_' + moduleName + '][value="' + existingArray + '"]').click();
        }
    } else {
        $('input[name=' + id + '_for_' + moduleName + '][value="' + existingArray + '"]').click();
    }
}

function getLocation() {
    tempLocationData = {};
    tempLocationData.latitude = '';
    tempLocationData.longitude = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCurrentLatLong);
    }
}

function getCurrentLatLong(position) {
    $('#latitude_for_road_details').val(position.coords.latitude);
    $('#longitude_for_road_details').val(position.coords.longitude);
}

function showSubContainer(id, moduleName, showId, showValue, type) {
    var otherId = '';
    if (type == 'radio') {
        otherId = $('input[name=' + id + '_for_' + moduleName + ']:checked').val();
    } else {
        otherId = $('#' + id + '_for_' + moduleName).val();
    }
    if (otherId == showValue) {
        $('#' + showId + '_container_for_' + moduleName + '').show();
    }
    $('input[name=' + id + '_for_' + moduleName + ']').change(function () {
        var other = $(this).val();
        $('#' + showId + '_container_for_' + moduleName + '').hide();
        if (other == showValue) {
            $('#' + showId + '_container_for_' + moduleName + '').show();
            return false;
        }
    });
}

function showSubContainerForPaymentDetails(id, moduleName, showId, type, showId2, moduleType) {
    var otherId = '';
    if (type == 'radio') {
        otherId = $('input[name=' + id + '_for_' + moduleName + ']:checked').val();
    } else {
        otherId = $('#' + id + '_for_' + moduleName).val();
    }
    if (otherId == VALUE_ONE || otherId == VALUE_TWO) {
        $('#' + showId + '_container_for_' + moduleName).show();
        if (showId2) {
            $(showId2 + '_container_for_' + moduleType).show();
        }
    }
    $('input[name=' + id + '_for_' + moduleName + ']').change(function () {
        validationMessageHide('wmregistration-uc-' + id + '_for_' + moduleName);
        var other = $(this).val();
        $('#' + showId + '_container_for_' + moduleName).hide();
        if (showId2) {
            $(showId2 + '_container_for_' + moduleType).hide();
        }
        if (other == VALUE_ONE || other == VALUE_TWO) {
            if (other == VALUE_ONE) {
                $('.utitle_for_' + moduleName).html('Challan Copy');
            } else {
                $('.utitle_for_' + moduleName).html('Payment Details');
            }
            $('#' + showId + '_container_for_' + moduleName).show();
            if (showId2) {
                $(showId2 + '_container_for_' + moduleType).show();
            }
            return false;
        }
    });
}

function getEncryptedId(id) {
    return generateRandomString(3) + window.btoa(id) + generateRandomString(3);
}

function getDescryptedId(encryptedId) {
    var tempString = encryptedId.substr(3);
    var tempString2 = tempString.substr(0, -3);
    return window.atob(tempString2);
}

function resetCounter(className) {
    var cnt = 1;
    $('.' + className).each(function () {
        $(this).html(cnt);
        cnt++;
    });
}

function returnCounter(className) {
    var cnt = 0;
    $('.' + className).each(function () {
        cnt++;
    });
    return cnt;
}

function getTextOfId(dataArray, value, compareValue, otherValue) {
    var data = dataArray[value] ? dataArray[value] : '';
    if (compareValue != '' && otherValue != '') {
        if (value == compareValue) {
            data = data + '(' + otherValue + ')';
        }
    }
    return data;
}

var emailRenderer = function (data, type, full, meta) {
    return data.replace('@', '<br>@');
};

function removeDocument(id, moduleName) {
    $('#' + id + '_name_container_for_' + moduleName).hide();
    $('#' + id + '_container_for_' + moduleName).show();
    $('#' + id + '_name_href_for_' + moduleName).attr('href', '');
    $('#' + id + '_name_for_' + moduleName).html('');
    $('#' + id + '_remove_btn_for_' + moduleName).attr('onclick', '');
}

function removeRowDetails(moduleName, cnt) {
    $('#' + moduleName + '_row_' + cnt).remove();
    resetCounter(moduleName + '-cnt');
}

var _validFileExtensions = [".jpg", ".jpeg", ".png"];
//var _validFileExtensions = [".jpg", ".jpeg", ".png", ".pdf"];
var _imageFileExtensions = [".jpg", ".jpeg", ".png"];
function imagePdfValidation(oInput, message, imagePdfUploadAttrId) {
    if (oInput.type == "file") {
        var sFileName = oInput.value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }

            if (!blnValid) {
                showError(message + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
            if (jQuery.inArray(sCurExtension, _imageFileExtensions) != -1) {
                if (($('#' + imagePdfUploadAttrId)[0].files[0].size / 1204) > maxFileSizeInKb) {
                    showError('Maximum upload size ' + maxFileSizeInKb + ' mb only in ' + message);
                    return false;
                }
            } else {
                if ((($('#' + imagePdfUploadAttrId)[0].files[0].size / 1024) / 1024) > maxFileSizeInMb) {
                    showError('Maximum upload size ' + maxFileSizeInMb + ' mb only in ' + message);
                    return true;
                }
            }
        }
    }
    return true;
}

function imagePdfUploadValidation(imageUploadAttrId, message, isValidateFileSize) {
    var allowedFiles = ['.jpg', '.png', '.jpeg'];
//    var allowedFiles = ['.jpg', '.png', '.jpeg', '.pdf'];
    var allowedFilesImage = ['.jpg', '.png', '.jpeg'];
    var imageName = $('#' + imageUploadAttrId).val();
    var fileExtension = imageName.replace(/^.*\./, '');
//    if (imageName.length > 0) {
    var regex = new RegExp('([a-zA-Z0-9\s_\\.\-:])+(' + allowedFiles.join('|') + ')$');

    if (!regex.test(imageName.toLowerCase())) {
        showError(message + ' <b>' + allowedFiles.join(', ') + '</b> only.');
        return true;
    }

    if (jQuery.inArray('.' + fileExtension, allowedFilesImage) != -1) {
        if (isValidateFileSize) {
            if (($('#' + imageUploadAttrId)[0].files[0].size / 1204) > maxFileSizeInKb) {
                showError('Maximum upload size ' + maxFileSizeInKb + 'kb only.');
                return true;
            }
        }
    } else {
        if (isValidateFileSize) {
            if ((($('#' + imageUploadAttrId)[0].files[0].size / 1024) / 1024) > maxFileSizeInMb) {
                showError('Maximum upload size ' + maxFileSizeInMb + ' mb only.');
                return true;
            }
        }
    }
//    }
    return false;
}

function regNoRenderer(moduleType, moduleId) {
    var pre = prefixModuleArray[moduleType] ? prefixModuleArray[moduleType] : '';
    return pre + ('00000' + moduleId).slice(-5);
}

function loadQueryDocItemForViewQuestion(queryDocumentData, mainCnt) {
    var tempCnt = 1;
    $.each(queryDocumentData, function (index, docData) {
        docData.cnt = tempCnt;
        $('#document_item_container_for_query_view_' + mainCnt).append(documentItemViewTemplate(docData));
        if (docData.document) {
            $('#document_name_href_for_query_answer_view_' + tempCnt).attr('href', 'documents/query/' + docData['document']);
            $('#document_name_for_query_answer_view_' + tempCnt).html(docData['document']);
        }
        tempCnt++;
    });
}

function loadQueryDocItemForView(queryDocumentData, mainCnt) {
    var tempCnt = 1;
    $.each(queryDocumentData, function (index, docData) {
        docData.cnt = tempCnt;
        $('#document_item_container_for_query_answer_view_' + mainCnt).append(documentItemViewTemplate(docData));
        if (docData.document) {
            $('#document_name_href_for_query_answer_view_' + tempCnt).attr('href', QUERY_PATH + docData['document']);
            $('#document_name_for_query_answer_view_' + tempCnt).html(docData['document']);
        }
        tempCnt++;
    });
}

function checkValidationForSubmitQueryDetails() {
    validationMessageHide();
    var moduleType = $('#module_type_for_query').val();
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN && moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY &&
            moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE &&
            moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        return invalidAccessValidationMessage;
    }
    var moduleId = $('#module_id_for_query').val();
    if (!moduleId) {
        return invalidAccessValidationMessage;
    }
    var queryType = $('#query_type_for_query').val();
    if (queryType != VALUE_ONE && queryType != VALUE_TWO) {
        return invalidAccessValidationMessage;
    }
    var remarks = $('#remarks_for_query').val();
    if (!remarks) {
        return remarksValidationMessage;
    }
    return '';
}

function askForSubmitQueryDetails() {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var validationMessage = checkValidationForSubmitQueryDetails();
    if (validationMessage != '') {
        $('#remarks_for_query').focus();
        validationMessageShow('query-remarks_for_query', validationMessage);
        return false;
    }
    var yesEvent = 'submitQueryDetails()';
    showConfirmation(yesEvent, 'Submit');
}

function getQDItems() {
    var newQDItems = [];
    var exiQDItems = [];
    var isQDItemValidation;
    $('.query_document_row').each(function () {
        var that = $(this);
        var tempCnt = that.find('.og_query_document_cnt').val();
        if (tempCnt == '' || tempCnt == null) {
            showError(invalidAccessMsg);
            isQDItemValidation = true;
            return false;
        }
        var qdItem = {};
        var docName = $('#doc_name_for_query_' + tempCnt).val();
        if (docName == '' || docName == null) {
            $('#doc_name_for_query_' + tempCnt).focus();
            validationMessageShow('query-doc_name_for_query_' + tempCnt, documentNameValidationMessage);
            isQDItemValidation = true;
            return false;
        }
        qdItem.doc_name = docName;
        if ($('#document_container_for_query_' + tempCnt).is(':visible')) {
            var uploadDoc = $('#document_for_query_' + tempCnt).val();
            if (!uploadDoc) {
                validationMessageShow('query-document_for_query_' + tempCnt, uploadDocValidationMessage);
                isQDItemValidation = true;
                return false;
            }
            var uploadDocMessage = fileUploadValidation('document_for_query_' + tempCnt, 2048);
            if (uploadDocMessage != '') {
                validationMessageShow('query-document_for_query_' + tempCnt, uploadDocMessage);
                isQDItemValidation = true;
                return false;
            }
        }

        var queryDocumentId = $('#query_document_id_for_query_' + tempCnt).val();
        if (!queryDocumentId || queryDocumentId == null) {
            newQDItems.push(qdItem);
        } else {
            qdItem.query_document_id = queryDocumentId;
            exiQDItems.push(qdItem);
        }
    });
    if (isQDItemValidation) {
        return false;
    }
    return {'new_qd_items': newQDItems, 'exi_qd_items': exiQDItems};
}

function submitQueryDetails() {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var validationMessage = checkValidationForSubmitQueryDetails();
    if (validationMessage != '') {
        $('#remarks_for_query').focus();
        validationMessageShow('query-remarks_for_query', validationMessage);
        return false;
    }
    var formData = {};
    formData.query_id_for_query = $('#query_id_for_query').val();
    formData.module_type_for_query = $('#module_type_for_query').val();
    formData.module_id_for_query = $('#module_id_for_query').val();
    formData.query_type_for_query = $('#query_type_for_query').val();
    formData.remarks_for_query = $('#remarks_for_query').val();
    formData.new_qd_items = [];
    formData.exi_qd_items = [];
    var qdItems = getQDItems();
    if (!qdItems) {
        return false;
    }
    formData.new_qd_items = qdItems.new_qd_items;
    formData.exi_qd_items = qdItems.exi_qd_items;
    var btnObj = $('#submit_btn_for_query');
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/raise_a_query',
        data: $.extend({}, formData, getTokenData()),
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
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
            showSuccess(parseData.message);
            var tempData = {};
            tempData.remarks = formData.remarks_for_query;
            tempData.datetime_text = parseData.query_datetime;
            if (!jQuery.isEmptyObject(parseData.query_document_data)) {
                tempData.show_document_container = true;
            }
            tempData.cnt = 1;
            $('#query_container').html(queryQuestionViewTemplate(tempData));
            $('#query_status_' + formData.module_id_for_query).html(queryStatusArray[parseData.query_status]);
            $('#query_movement_status_' + formData.module_id_for_query).html(parseData.query_movement_string != '' ? ('<table class="table table-bordered mb-0 bg-beige f-s-12px table-lh1">' + parseData.query_movement_string + '</table>') : '');
            loadQueryDocItemForViewQuestion(parseData.query_document_data, tempData.cnt);

            $('#reject_btn_for_app_' + formData.module_id_for_query).hide();
            $('#approve_btn_for_app_' + formData.module_id_for_query).hide();
        }
    });
}

function askForResolvedQuery(moduleType, moduleId) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY &&
            moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE &&
            moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    if (!moduleId) {
        showError(invalidAccessValidationMessage);
        return false;
    }

    var yesEvent = 'resolvedQuery(' + moduleType + ',' + moduleId + ')';
    showConfirmation(yesEvent, 'Resolved Query');
}

function resolvedQuery(moduleType, moduleId) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY &&
            moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE &&
            moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    if (!moduleId) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var btnObj = $('#resolved_btn_for_query');
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/resolved_query',
        data: $.extend({}, {'module_type': moduleType, 'module_id': moduleId}, getTokenData()),
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
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
            showSuccess(parseData.message);
            $('#query_status_' + moduleId).html(queryStatusArray[parseData.query_status]);
            $('#popup_modal').modal('hide');
            if (parseData.status != VALUE_FIVE && parseData.status != VALUE_SIX &&
                    (parseData.query_status == VALUE_ZERO || parseData.query_status == VALUE_THREE)) {
                $('#reject_btn_for_app_' + moduleId).show();
            }
            if (moduleType == VALUE_TWENTYSEVEN || moduleType == VALUE_THIRTY || moduleType == VALUE_FIFTY || (parseData.status == VALUE_SEVEN && (parseData.query_status == VALUE_ZERO || parseData.query_status == VALUE_THREE))) {
                $('#approve_btn_for_app_' + moduleId).show();
            }

            $('#resolved_btn_for_query').remove();
        }
    });
}

function raiseAnotherQuery(moduleType, moduleId) {
    var templateData = {};
    templateData.datetime_text = '00-00-0000 00:00:00';
    templateData.query_type = VALUE_ONE;
    templateData.module_type = moduleType;
    templateData.module_id = moduleId;
    $('#query_item_container').prepend(queryQuestionTemplate(templateData));
    $('#raise_query_btn_for_query').hide();
}

function loadQueryManagementModule(parseData, templateData, tmpData) {
    documentRowCnt = 1;
    var moduleData = parseData.module_data;
    if ((moduleData.status != VALUE_FIVE && moduleData.status != VALUE_SIX) && (moduleData.query_status == VALUE_ONE || moduleData.query_status == VALUE_TWO)) {
        tmpData.show_resolve_query_btn = true;
    }
    if ((moduleData.status != VALUE_FIVE && moduleData.status != VALUE_SIX) && (moduleData.query_status == VALUE_TWO || moduleData.query_status == VALUE_THREE)) {
        tmpData.show_raise_query_btn = true;
    }
    $('#model_title').html('Query Management');
    $('#model_body').html(queryFormTemplate(tmpData));
    var cnt = 1;
    $.each(parseData.query_data, function (index, qd) {
        qd.cnt = cnt;
        qd.show_extra_div = true;
        qd.datetime_text = qd.display_datetime;
        if (qd.query_type == VALUE_ONE) {
            if (qd.status == VALUE_ONE) {
                if (!jQuery.isEmptyObject(qd.query_documents)) {
                    qd.show_document_container = true;
                }
                $('#query_item_container').prepend(queryQuestionViewTemplate(qd));
                loadQueryDocItemForViewQuestion(qd.query_documents, cnt);
            } else {
                qd.datetime_text = '00-00-0000 00:00:00';
                $('#query_item_container').prepend(queryQuestionTemplate(qd));
                $.each(qd.query_documents, function (index, docData) {
                    addDocumentRow(docData);
                });
                $('#raise_query_btn_for_query').hide();
            }
        }
        if (qd.query_type == VALUE_TWO) {
            if (qd.status == VALUE_ONE) {
                if (!jQuery.isEmptyObject(qd.query_documents)) {
                    qd.show_document_container = true;
                }
                $('#query_item_container').prepend(queryAnswerViewTemplate(qd));
                loadQueryDocItemForView(qd.query_documents, cnt);
            }
        }
        cnt++;
    });
    if (moduleData.status == VALUE_TWO || moduleData.status == VALUE_THREE || moduleData.status == VALUE_FOUR || moduleData.status == VALUE_SEVEN ||
            moduleData.status == VALUE_EIGHT || moduleData.status == VALUE_NINE) {
        if (cnt == 1) {
            raiseAnotherQuery(templateData.module_type, templateData.module_id);
        }
    }
    $('#popup_modal').modal('show');
}

function addDocumentRow(templateData) {
    templateData.cnt = documentRowCnt;
    $('#document_item_container_for_query').append(documentItemTemplate(templateData));
    if (templateData.document) {
        loadQueryDocument('document', documentRowCnt, templateData);
    }
    resetCounter('query-document-cnt');
    documentRowCnt++;
}

function checkValidationForDocUpload() {
    validationMessageHide();
    var moduleType = $('#module_type_for_query').val();
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE &&
            moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY && moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE && moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        return invalidAccessValidationMessage;
    }
    var moduleId = $('#module_id_for_query').val();
    if (!moduleId) {
        return invalidAccessValidationMessage;
    }
    var queryType = $('#query_type_for_query').val();
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE &&
            moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY && moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE && moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        return invalidAccessValidationMessage;
    }
    return '';
}

function uploadDocumentForQuery(tempCnt) {
    var validationMessage = checkValidationForDocUpload();
    if (validationMessage != '') {
        showError(validationMessage);
        return false;
    }
    var id = 'document_for_query_' + tempCnt;
    var doc = $('#' + id).val();
    if (doc == '') {
        return false;
    }
    var materialslipMessage = fileUploadValidation(id, 2048);
    if (materialslipMessage != '') {
        showError(materialslipMessage);
        return false;
    }
    $('#document_container_for_query_' + tempCnt).hide();
    $('#document_name_container_for_query_' + tempCnt).hide();
    $('#spinner_template_for_query_' + tempCnt).show();
    var formData = new FormData();
    formData.append('query_id_for_query', $('#query_id_for_query').val());
    formData.append('module_type_for_query', $('#module_type_for_query').val());
    formData.append('module_id_for_query', $('#module_id_for_query').val());
    formData.append('query_type_for_query', $('#query_type_for_query').val());
    formData.append('query_document_id_for_query', $('#query_document_id_for_query_' + tempCnt).val());
    formData.append('document_for_query', $('#' + id)[0].files[0]);
    $.ajax({
        type: 'POST',
        url: 'utility/upload_query_document',
        data: formData,
        mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        error: function (textStatus, errorThrown) {
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            $('#spinner_template_for_query_' + tempCnt).hide();
            $('#document_container_for_query_' + tempCnt).show();
            $('#document_name_container_for_query_' + tempCnt).hide();
            $('#' + id).val('');
            showError(textStatus.statusText);
        },
        success: function (data) {
            var parseData = JSON.parse(data);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            if (parseData.success == false) {
                $('#spinner_template_for_query_' + tempCnt).hide();
                $('#document_container_for_query_' + tempCnt).show();
                $('#document_name_container_for_query_' + tempCnt).hide();
                $('#' + id).val('');
                showError(parseData.message);
                return false;
            }
            $('#spinner_template_for_query_' + tempCnt).hide();
            $('#document_name_container_for_query_' + tempCnt).hide();
            $('#' + id).val('');
            $('#query_id_for_query').val(parseData.query_id);
            $('#query_document_id_for_query_' + tempCnt).val(parseData.query_document_id);
            var docItemData = {};
            docItemData.query_document_id = parseData.query_document_id;
            docItemData.query_id = parseData.query_id;
            docItemData.document = parseData.document_name;
            loadQueryDocument('document', tempCnt, docItemData);
        }
    });
}

function loadQueryDocument(documentFieldName, cnt, docItemData) {
    $('#' + documentFieldName + '_container_for_query_' + cnt).hide();
    $('#' + documentFieldName + '_name_container_for_query_' + cnt).show();
    $('#' + documentFieldName + '_name_href_for_query_' + cnt).attr('href', 'documents/query/' + docItemData[documentFieldName]);
    $('#' + documentFieldName + '_name_for_query_' + cnt).html(docItemData[documentFieldName]);
    $('#' + documentFieldName + '_remove_btn_for_query_' + cnt).attr('onclick', 'askForRemoveDocumentRow("' + cnt + '")');
}


function askForRemoveDocumentRow(cnt) {
    var queryDocumentId = $('#query_document_id_for_query_' + cnt).val();
    if (!queryDocumentId || queryDocumentId == 0 || queryDocumentId == null) {
        removeDocumentItemRow(cnt);
        return false;
    }
    var yesEvent = 'removeDocumentRow(' + cnt + ')';
    showConfirmation(yesEvent, 'Remove');
}

function removeDocumentItemRow(cnt) {
    $('#query_document_row_' + cnt).remove();
    resetCounter('query-document-cnt');
}

function removeDocumentRow(cnt) {
    var queryDocumentId = $('#query_document_id_for_query_' + cnt).val();
    if (!queryDocumentId || queryDocumentId == 0 || queryDocumentId == null) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'utility/remove_query_document_item',
        data: $.extend({}, {'query_document_id': queryDocumentId}, getTokenData()),
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
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            showSuccess(parseData.message);
            removeDocumentItemRow(cnt);
        }
    });
}

function showTableContainer(id) {
    $('#' + id + '_form_container').hide();
    $('#' + id + '_datatable_container').show();
}

function showFormContainer(id) {
    $('#' + id + '_datatable_container').hide();
    $('#' + id + '_form_container').show();
}

function askForConfirmPayment(moduleType, moduleId) {
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY &&
            moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE &&
            moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    if (!moduleId) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var yesEvent = 'confirmPayment(' + moduleType + ',' + moduleId + ')';
    showConfirmation(yesEvent, 'Confirm');
}

function confirmPayment(moduleType, moduleId) {
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE && moduleType != VALUE_FOUR &&
            moduleType != VALUE_FIVE && moduleType != VALUE_SIX && moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN && moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN && moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_SEVENTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY && moduleType != VALUE_TWENTYONE && moduleType != VALUE_TWENTYTWO && moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFOUR && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_TWENTYSIX && moduleType != VALUE_TWENTYSEVEN && moduleType != VALUE_TWENTYEIGHT && moduleType != VALUE_TWENTYNINE && moduleType != VALUE_THIRTY &&
            moduleType != VALUE_THIRTYONE && moduleType != VALUE_THIRTYTWO && moduleType != VALUE_THIRTYTHREE && moduleType != VALUE_THIRTYFOUR && moduleType != VALUE_THIRTYFIVE &&
            moduleType != VALUE_THIRTYSIX && moduleType != VALUE_THIRTYSEVEN && moduleType != VALUE_THIRTYEIGHT && moduleType != VALUE_THIRTYNINE && moduleType != VALUE_FOURTY && moduleType != VALUE_FOURTYONE && moduleType != VALUE_FOURTYTWO && moduleType != VALUE_FOURTYTHREE && moduleType != VALUE_FOURTYFOUR && moduleType != VALUE_FOURTYFIVE && moduleType != VALUE_FOURTYSIX &&
            moduleType != VALUE_FOURTYEIGHT && moduleType != VALUE_FOURTYNINE && moduleType != VALUE_FIFTY && moduleType != VALUE_FIFTYTWO && moduleType != VALUE_FIFTYNINE && moduleType != VALUE_SIXTY && moduleType != VALUE_SIXTYONE) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    if (!moduleId) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var btnObj = $('#confirm_payment_btn_for_app_' + moduleId);
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/confirm_payment',
        data: $.extend({}, {'module_type': moduleType, 'module_id': moduleId}, getTokenData()),
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
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
//            $('#confirm_payment_btn_for_app_' + moduleId).remove();
            showSuccess(parseData.message);
            if (moduleType == VALUE_ONE) {
                Wmregistration.listview.loadWmregistrationData();
            }
            if (moduleType == VALUE_TWO) {
                Repairer.listview.loadRepairerData();
            }
            if (moduleType == VALUE_THREE) {
                Dealer.listview.loadDealerData();
            }
            if (moduleType == VALUE_FOUR) {
                Manufacturer.listview.loadManufacturerData();
            }
            if (moduleType == VALUE_FIVE) {
                WC.listview.loadWCData();
            }
            if (moduleType == VALUE_SIX) {
                Hotelregi.listview.loadHotelregiData();
            }
            if (moduleType == VALUE_SEVEN) {
                Psfregistration.listview.loadPsfregistrationData();
            }
            if (moduleType == VALUE_EIGHT) {
                Cinema.listview.loadCinemaData();
            }
            if (moduleType == VALUE_NINE) {
                MSME.listview.loadMSMEData();
            }
            if (moduleType == VALUE_TEN) {
                Textile.listview.loadTextileData();
            }
            if (moduleType == VALUE_ELEVEN) {
                Noc.listview.loadNocData();
            }
            if (moduleType == VALUE_TWELVE) {
                Transfer.listview.loadTransferData();
            }
            if (moduleType == VALUE_THIRTEEN) {
                Subletting.listview.loadSublettingData();
            }
            if (moduleType == VALUE_FOURTEEN) {
                RepairerRenewal.listview.loadRepairerRenewalData();
            }
            if (moduleType == VALUE_FIFTEEN) {
                DealerRenewal.listview.loadDealerRenewalData();
            }
            if (moduleType == VALUE_SIXTEEN) {
                ManufacturerRenewal.listview.loadManufacturerRenewalData();
            }
            if (moduleType == VALUE_SEVENTEEN) {
                Sublessee.listview.loadSublesseeData();
            }
            if (moduleType == VALUE_EIGHTEEN) {
                Seller.listview.loadSellerData();
            }
            if (moduleType == VALUE_NINETEEN) {
                TravelAgent.listview.loadTravelAgentData();
            }
            if (moduleType == VALUE_TWENTY) {
                HotelRenewal.listview.loadHotelRenewalData();
            }
            if (moduleType == VALUE_TWENTYONE) {
                Property.listview.loadPropertyData();
            }
            if (moduleType == VALUE_TWENTYTWO) {
                FilmShooting.listview.loadFilmShootingData();
            }
            if (moduleType == VALUE_TWENTYTHREE) {
                TravelagentRenewal.listview.loadTravelagentRenewalData();
            }
            if (moduleType == VALUE_TWENTYFOUR) {
                Tourismevent.listview.loadTourismeventData();
            }
            if (moduleType == VALUE_TWENTYFIVE) {
                Landallotment.listview.loadLandallotmentData();
            }
            if (moduleType == VALUE_TWENTYEIGHT) {
                OccupancyCertificate.listview.loadOccupancyCertificateData();
            }
            if (moduleType == VALUE_TWENTYSEVEN) {
                Inspection.listview.loadInspectionData();
            }
            if (moduleType == VALUE_TWENTYSIX) {
                Construction.listview.loadConstructionData();
            }
            if (moduleType == VALUE_TWENTYNINE) {
                Site.listview.loadSiteData();
            }
            if (moduleType == VALUE_THIRTY) {
                Zone.listview.loadZoneData();
            }
            if (moduleType == VALUE_THIRTYONE) {
                CLACT.listview.loadCLACTData();
            }
            if (moduleType == VALUE_THIRTYTWO) {
                BOCW.listview.loadBOCWData();
            }
            if (moduleType == VALUE_THIRTYTHREE) {
                Shop.listview.loadShopData();
            }
            if (moduleType == VALUE_THIRTYFOUR) {
                MigrantWorkers.listview.loadMigrantWorkersData();
            }
            if (moduleType == VALUE_THIRTYFIVE) {
                BOCW.listview.loadBOCWData();
            }
            if (moduleType == VALUE_THIRTYFIVE) {
                FactoryLicense.listview.loadFactoryLicenseData();
            }
            if (moduleType == VALUE_THIRTYSIX) {
                BuildingPlan.listview.loadBuildingPlanData();
            }
            if (moduleType == VALUE_THIRTYSEVEN) {
                BoilerAct.listview.loadBoilerActData();
            }
            if (moduleType == VALUE_THIRTYEIGHT) {
                BoilerManufacture.listview.loadBoilerManufactureData();
            }
            if (moduleType == VALUE_THIRTYNINE) {
                SingleReturn.listview.loadSingleReturnData();
            }
            if (moduleType == VALUE_FOURTY) {
                Na.listview.loadNaData();
            }
            if (moduleType == VALUE_FOURTYONE) {
                FactoryLicenseRenewal.listview.loadFactoryLicenseRenewalData();
            }
            if (moduleType == VALUE_FOURTYTWO) {
                ShopRenewal.listview.loadShopRenewalData();
            }
            if (moduleType == VALUE_FOURTYTHREE) {
                Aplicence.listview.loadAplicenceData();
            }
            if (moduleType == VALUE_FOURTYFOUR) {
                BoilerActRenewal.listview.loadBoilerActRenewalData();
            }
            if (moduleType == VALUE_FOURTYFIVE) {
                MigrantworkersRenewal.listview.loadMigrantworkersRenewalData();
            }
            if (moduleType == VALUE_FOURTYSIX) {
                AplicenceRenewal.listview.loadAplicenceRenewalData();
            }
            if (moduleType == VALUE_FOURTYNINE) {
                RII.listview.loadRIIData();
            }
            if (moduleType == VALUE_FOURTYEIGHT) {
                VC.listview.loadVCData();
            }
            if (moduleType == VALUE_FIFTY) {
                Periodicalreturn.listview.loadPeriodicalreturnData();
            }
            if (moduleType == VALUE_FIFTYTWO) {
                Ips.listview.listPageForIncentives();
            }
            if (moduleType == VALUE_FIFTYNINE) {
                TreeCutting.listview.listPage();
            }
            if (moduleType == VALUE_SIXTY) {
                SocietyRegistration.listview.listPage();
            }
            if (moduleType == VALUE_SIXTYONE) {
                NilCertificate.listview.listPage();
            }
//            $('#status_' + moduleId).html(appStatusArray[parseData.status]);
//            $('#approve_btn_for_app_' + moduleId).show();

        }
    });
}


function getTotal(btnObj) {

    var a = $('#contribution').val() == "" ? 0 : $('#contribution').val();
    var b = $('#term_loan').val() == "" ? 0 : $('#term_loan').val();
    var c = $('#unsecured_loan').val() == "" ? 0 : $('#unsecured_loan').val();
    var d = $('#accruals').val() == "" ? 0 : $('#accruals').val();

    var res = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d);
    $('#finance_total').val(res);
}

function getTotalInvestment(btnObj) {

    var a = $('#capital_subsidy').val() == "" ? 0 : $('#capital_subsidy').val();
    var b = $('#anum').val() == "" ? 0 : $('#anum').val();

    var res = parseFloat(a) + parseFloat(b);
    $('#cliam_amount_total').val(res);
}

function getTotalCliam(btnObj) {

    var a = $('#capital_cost').val() == "" ? 0 : $('#capital_cost').val();
    var b = $('#consutancy_fees').val() == "" ? 0 : $('#consutancy_fees').val();
    var c = $('#certification_charges').val() == "" ? 0 : $('#certification_charges').val();
    var d = $('#testing_equipments').val() == "" ? 0 : $('#testing_equipments').val();

    var res = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d);
    $('#cliam_amount_total').val(res);
}

function getTotalCliamAmount(btnObj) {

    var a = $('#audit_fees').val() == "" ? 0 : $('#audit_fees').val();
    var b = $('#equipment_cost').val() == "" ? 0 : $('#equipment_cost').val();

    var res = parseFloat(a) + parseFloat(b);
    $('#cliam_amount_total').val(res);
}

function getTotalAcquisition(btnObj) {

    var a = $('#purchase').val() == "" ? 0 : $('#purchase').val();
    var b = $('#technology_fees').val() == "" ? 0 : $('#technology_fees').val();
    var c = $('#other_detail').val() == "" ? 0 : $('#other_detail').val();

    var res = parseFloat(a) + parseFloat(b) + parseFloat(c);
    $('#upgradation_total').val(res);
}

function getTotalEmployee(btnObj) {

    var a = $('#direct_unskilled').val() == "" ? 0 : $('#direct_unskilled').val();
    var b = $('#direct_semiskilled').val() == "" ? 0 : $('#direct_semiskilled').val();
    var c = $('#direct_skilled').val() == "" ? 0 : $('#direct_skilled').val();

    var res = parseFloat(a) + parseFloat(b) + parseFloat(c);
    $('#direct_total').val(res);


    var d = $('#contractor_unskilled').val() == "" ? 0 : $('#contractor_unskilled').val();
    var e = $('#contractor_semiskilled').val() == "" ? 0 : $('#contractor_semiskilled').val();
    var f = $('#contractor_skilled').val() == "" ? 0 : $('#contractor_skilled').val();

    var res1 = parseFloat(d) + parseFloat(e) + parseFloat(f);
    $('#contractor_total').val(res1);

    var res2 = parseFloat(a) + parseFloat(d);
    $('#total_unskilled').val(res2);

    var res3 = parseFloat(b) + parseFloat(e);
    $('#total_semiskilled').val(res3);

    var res4 = parseFloat(c) + parseFloat(f);
    $('#total_skilled').val(res4);

    var res5 = parseFloat(res) + parseFloat(res1);
    $('#total_total').val(res5);


    var g = $('#direct_male').val() == "" ? 0 : $('#direct_male').val();
    var h = $('#contractor_male').val() == "" ? 0 : $('#contractor_male').val();

    var res6 = parseFloat(g) + parseFloat(h);
    $('#total_male').val(res6);

    var i = $('#direct_female').val() == "" ? 0 : $('#direct_female').val();
    var j = $('#contractor_female').val() == "" ? 0 : $('#contractor_female').val();

    var res7 = parseFloat(i) + parseFloat(j);
    $('#total_female').val(res7);

}

function getTotalWorker(id1, id2, id3) {
    var value1 = $('#' + id1).val();
    var value2 = $('#' + id2).val();
    var value3 = $('#' + id3);

    var a = value1 == "" ? 0 : value1;
    var b = value2 == "" ? 0 : value2;

    var res = parseFloat(a) + parseFloat(b);
    $(value3).val(res);
}

function getCommonData() {
    tempVillagesData = [];
    tempPlotData = [];
    tempDeptData = [];
    $.ajax({
        url: 'utility/get_common_data',
        type: 'post',
        async: false,
        error: function (textStatus, errorThrown) {
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            tempVillagesData = parseData.village_data;
            tempPlotData = parseData.plot_data;
            tempDeptData = parseData.department_data;
            tempStateData = parseData.state_data;
            tempState1Data = parseData.state_data;
            tempDistrictData = parseData.district_data;
        }
    });
}

function getPlotData(obj, id, moduleName) {
    renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination([], id + '_for_' + moduleName, 'plot_id', 'plot_no', 'Plot No');
    $('#' + id + '_for_' + moduleName).val('');
    var villageCode = obj.val();
    if (!villageCode) {
        return;
    }
    var plotData = tempPlotData[villageCode] ? tempPlotData[villageCode] : [];
    // console.log(plotData);
    renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(plotData, id + '_for_' + moduleName, 'plot_id', 'plot_no', 'Plot No');
    $('#' + id + '_for_' + moduleName).val('');
    this.getAreaData('plot_id', 'area');
}

function getAreaData(obj) {
    var villageCode = $('#villages_for_noc_data').val();
    $('#govt_industrial_estate_area').val('');
    if (!villageCode) {
        return false;
    }
    var plotId = obj.val();
    if (!plotId) {
        return false;
    }
    var plotsData = tempPlotData[villageCode] ? tempPlotData[villageCode] : [];
    var plotData = plotsData[plotId] ? plotsData[plotId] : [];
    $('#govt_industrial_estate_area').val(plotData.area ? plotData.area : '');
}

function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationForPlot(dataArray, comboId, keyId, valueId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="">Select ' + message + '</option>');
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            if (dataObject[is_vacant] == VALUE_ONE) {
                data = {"value_field": dataObject[keyId], 'text_field': dataObject[valueId]};
                optionResult = optionTemplate(data);
                $("#" + comboId).append(optionResult);
            }
        }
    });
}

function openFullPageOverlay() {
    document.getElementById("full_page_overlay_div").style.width = "100%";
}

function closeFullPageOverlay() {
    document.getElementById("full_page_overlay_div").style.width = "0%";
}

function loadFB(moduleType, fbDetails, paymentType, isAllowChanges, showDropdown, dropdownData) {
    if (typeof isAllowChanges == "undefined") {
        isAllowChanges = false;
    }
    if (typeof showDropdown == "undefined") {
        showDropdown = false;
    }
    if (typeof dropdownData == "undefined") {
        dropdownData = [];
    }
    if (paymentType == VALUE_ONE || paymentType == VALUE_TWO) {
        $('#fb_container_for_' + moduleType).show();
    }
    tempDropdownData = dropdownData;
    fbCnt = VALUE_ONE;
    var templateData = {};
    templateData.module_type = moduleType;
    templateData.is_allow_changes = isAllowChanges;
    if (showDropdown) {
        templateData.show_dropdown = showDropdown;
    }
    $('#fb_container_for_' + moduleType).html(fbListTemplate(templateData));
    var tfbd = VALUE_ONE;
    if (!isAllowChanges) {
        var totalFee = 0;
    }
    $.each(fbDetails, function (index, fbd) {
        fbd.is_allow_changes = isAllowChanges;
        if (showDropdown) {
            fbd.show_dropdown = showDropdown;
        }
        addFBRow(moduleType, fbd);
        if (!isAllowChanges) {
            var fee = parseInt(fbd.fee);
            totalFee += fee ? fee : 0;
        }
        tfbd++;
    });
    if (tfbd == VALUE_ONE && isAllowChanges) {
        var tData = {};
        tData.is_allow_changes = isAllowChanges;
        if (showDropdown) {
            tData.show_dropdown = showDropdown;
        }
        addFBRow(moduleType, tData);
    }
    if (tfbd == VALUE_ONE && !isAllowChanges) {
        $('#fb_item_container_for_' + moduleType).html(noRecordFoundTemplate({'colspan': 3, 'message': 'Fee Details Not Available !'}));
    }
    if (!isAllowChanges) {
        $('#total_fees_for_fb_' + moduleType).html(totalFee + ' /-');
    }
}

function addFBRow(moduleType, fbd) {
    fbd.module_type = moduleType;
    fbd.fb_cnt = fbCnt;
    if (fbd.is_allow_changes) {
        $('#fb_item_container_for_' + moduleType).append(fbItemTemplate(fbd));
        if (fbd.show_dropdown) {
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempDropdownData, 'dept_fd_id_for_fb_' + fbCnt, 'dept_fd_id', 'description', false, false);
            $('#dept_fd_id_for_fb_' + fbCnt).val(fbd.dept_fd_id != VALUE_ZERO ? fbd.dept_fd_id : '');
        }
        allowOnlyIntegerValue('fee_for_fb_' + fbCnt);
        resetCounter('fb-cnt');
        fbFeeCalculation(moduleType);
    } else {
        $('#fb_item_container_for_' + moduleType).append(fbItemViewTemplate(fbd));
    }
    fbCnt++;
}

function askForRemoveFBRow(moduleType, rowCnt) {
    $('#fb_row_' + moduleType + '_' + rowCnt).remove();
    fbFeeCalculation(moduleType);
    resetCounter('fb-cnt');
}

function fbFeeCalculation(moduleType) {
    var totalFee = 0;
    $('.fee_for_fb_' + moduleType).each(function () {
        var fee = parseInt($(this).val());
        totalFee += fee ? fee : 0;
    });
    $('#total_fees_for_fb_' + moduleType).html(totalFee + ' /-');
}

function checkValidationForFB(moduleType, vmClass, showDropdown) {
    if (typeof showDropdown == "undefined") {
        showDropdown = false;
    }
    var tempCntForFB = 0;
    var newFBItems = [];
    var exiFBItems = [];
    var totalFees = 0;
    var isFBItemValidation = false;
    $('.fb_row_' + moduleType).each(function () {
        var tfbCnt = $(this).find('.og_fb_cnt').val();
        var fbItem = {};
        if (showDropdown) {
            var deptFDId = $('#dept_fd_id_for_fb_' + tfbCnt).val();
            if (deptFDId == '' || deptFDId == null || !deptFDId) {
                $('#dept_fd_id_for_fb_' + tfbCnt).focus();
                validationMessageShow('fb-dept_fd_id_for_fb_' + tfbCnt, oneOptionValidationMessage);
                isFBItemValidation = true;
                return false;
            }
            fbItem.dept_fd_id = deptFDId;
            fbItem.fee_description = $('#dept_fd_id_for_fb_' + tfbCnt + ' option:selected').text();
        } else {
            var desc = $('#desc_for_fb_' + tfbCnt).val();
            if (desc == '' || desc == null) {
                $('#desc_for_fb_' + tfbCnt).focus();
                validationMessageShow('fb-desc_for_fb_' + tfbCnt, descValidationMessage);
                isFBItemValidation = true;
                return false;
            }
            fbItem.dept_fd_id = VALUE_ZERO;
            fbItem.fee_description = desc;
        }
        var fee = parseInt($('#fee_for_fb_' + tfbCnt).val());
        if (fee == '' || fee == null || !fee) {
            $('#fee_for_fb_' + tfbCnt).focus();
            validationMessageShow('fb-fee_for_fb_' + tfbCnt, feesValidationMessage);
            isFBItemValidation = true;
            return false;
        }
        fbItem.fee = fee;
        totalFees += fee;
        var fbId = $('#fb_id_for_fb_' + tfbCnt).val();
        if (fbId != '') {
            fbItem.fees_bifurcation_id = fbId;
            exiFBItems.push(fbItem);
        } else {
            newFBItems.push(fbItem);
        }
        tempCntForFB++;
    });
    if (isFBItemValidation) {
        return false;
    }
    if (tempCntForFB == 0) {
        validationMessageShow(vmClass, oneFeeValidationMessage);
        $('html, body').animate({scrollTop: '0px'}, 0);
        return false;
    }

    var returnData = {};
    returnData.new_fb_items = newFBItems;
    returnData.exi_fb_items = exiFBItems;
    returnData.total_fees = totalFees;
    return JSON.stringify(returnData);
}

function loadPH(moduleType, moduleId, phDetails) {
    var templateData = {};
    templateData.module_type = moduleType;
    templateData.application_number = regNoRenderer(moduleType, moduleId);
    $('#ph_container_for_' + moduleType).html(phListTemplate(templateData));
    var tempCnt = 1;
    $.each(phDetails, function (index, phd) {
        phd.module_type = moduleType;
        phd.ph_cnt = tempCnt;
        phd.transaction_datetime = phd.op_start_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(phd.op_start_datetime) : '';
        phd.status_text = pgStatusTextArray[phd.op_status] ? pgStatusTextArray[phd.op_status] : pgStatusTextArray[VALUE_ZERO];
        $('#ph_item_container_for_' + moduleType).append(phItemTemplate(phd));
        tempCnt++;
    });
    if (tempCnt == 1) {
        $('#ph_container_for_' + moduleType).html('');
        return false;
    }
    $('.swal2-popup').css('width', '55em');
    $('#ph_container_for_' + moduleType).show();
}

var pgStatusRenderer = function (data, type, full, meta) {
    return pgStatus(data, full.fees_payment_id);
};

function pgStatus(data, feePaymentId) {
    return '<div class="pg_status_' + feePaymentId + '">' + (pgStatusTextArray[data] ? pgStatusTextArray[data] : '') + '</div>';
}

function pgMessage(data, feePaymentId) {
    return '<div class="pg_message_' + feePaymentId + '">' + data + '</div>';
}

function getDeptName(data) {
    var qmData = queryModuleArray[data] ? queryModuleArray[data] : [];
    return qmData['department_name'] ? qmData['department_name'] : '';
}

function getServiceName(data) {
    var qmData = queryModuleArray[data] ? queryModuleArray[data] : [];
    return qmData['title'] ? qmData['title'] : '';
}

function checkPaymentDV(btnObj, feesPaymentId) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (!feesPaymentId || !btnObj) {
        showError(invalidAccessValidationMessage);
        return;
    }
    var that = this;
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        url: 'payment_status/check_payment_dv',
        type: 'post',
        data: $.extend({}, {'fees_payment_id': feesPaymentId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            showError(textStatus.statusText);
        },
        success: function (response) {
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            var parseData = JSON.parse(response);
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
            var totalExCnt = returnCounter('dv-cnt');
            if (totalExCnt == 0) {
                $('#dv_item_container').html('');
            }
            var dvData = parseData.dv_data;
            loadDVRow(dvData);
            resetCounter('dv-cnt');
            if (parseData.is_updated_fp) {
                $('.pg_status_' + feesPaymentId).html(pgStatus(parseData.updated_op_status, feesPaymentId));
            }
        }
    });
}

function loadDVRow(dv) {
    dv.dv_by = dv.dv_type == VALUE_ONE ? 'Auto' : (dv.entered_by ? dv.entered_by : '');
    dv.dv_start_datetime_text = dateTo_DD_MM_YYYY_HH_II_SS(dv.dv_start_datetime);
    dv.dv_status_text = dvStatusTextArray[dv.dv_status] ? dvStatusTextArray[dv.dv_status] : '';
    dv.dv_pg_status_text = dv.dv_pg_status != VALUE_ZERO ? (pgStatusTextArray[dv.dv_pg_status] ? pgStatusTextArray[dv.dv_pg_status] : '') : '';
    $('#dv_item_container').append(dvItemTemplate(dv));
}

function getCheckboxValue(columValue, arrayValue) {
    var tempstring = [];
    var str = columValue;
    if (columValue) {
        var splitComma = str.split(',');
        $.each(splitComma, function (index, value) {
            if (index != VALUE_ZERO) {
                tempstring += ', ';
            }
            tempstring += arrayValue[value] ? arrayValue[value] : '';
        });
        return tempstring;
    }
}

function loadMDoc(moduleType, docDetails, isView) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (typeof docDetails == "undefined") {
        docDetails = '';
    }
    if (typeof isView == "undefined") {
        isView = '';
    }
    var templateData = {};
    templateData.no_record_fount_for_doc = noRecordFoundTemplate({'colspan': 3, 'message': 'Document Not Available !'});
    templateData.module_type = moduleType;
    if (isView) {
        templateData.is_view = isView;
    }
    $('#m_doc_container_for_' + moduleType + isView).html(mDocListTemplate(templateData));

    var sDoc = moduleDocArray[moduleType] ? moduleDocArray[moduleType] : [];
    var dCnt = 1;
    $.each(sDoc, function (docId, dd) {
        if (dCnt == 1) {
            $('#doc_item_container_for_' + moduleType + isView).html('');
        }
        var sdData = {};
        sdData.doc_cnt = dCnt;
        sdData.module_type = moduleType;
        sdData.doc_id = docId;
        sdData.doc_name = dd.name;
        if (dd.is_require == VALUE_ONE) {
            sdData.is_require = dd.is_require;
        }
        sdData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
        if (isView) {
            $('#doc_item_container_for_' + moduleType + isView).append(mDocItemViewTemplate(sdData));
        }
        if (docDetails != '') {
            var exDoc = docDetails[docId] ? docDetails[docId] : '';
            if (exDoc != '') {
                if (isView) {
                    loadExMDocForView(moduleType, docId, exDoc);
                }
            }
        }
        dCnt++;
    });
}

function loadExMDocForView(moduleType, docId, docData) {
    $('#upload_name_href_for_' + moduleType + '_' + docId).attr('href', PROJECT_PATH + docData.doc_path + '/' + docData.doc_name);
    $('#upload_container_for_' + moduleType + '_' + docId).hide();
    $('#upload_name_container_for_' + moduleType + '_' + docId).show();
}

function loadMOtherDoc(moduleType, docDetails, isView) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (typeof docDetails == "undefined") {
        docDetails = '';
    }
    if (typeof isView == "undefined") {
        isView = '';
    }
    mOtherDocRowCnt = 1;
    var templateData = {};
    templateData.module_type = moduleType;
    if (isView) {
        templateData.is_view = isView;
    }
    $('#m_other_doc_container_for_' + moduleType + isView).html(mOtherDocListTemplate(templateData));
    if (docDetails != '') {
        $.each(docDetails, function (index, docData) {
            addMOtherDocumentRow(moduleType, docData, isView);
        });
    }
}

function addMOtherDocumentRow(moduleType, docData, isView) {
    if (typeof isView == "undefined") {
        isView = '';
    }
    docData.cnt = mOtherDocRowCnt;
    docData.module_type = moduleType;
    docData.VIEW_UPLODED_DOCUMENT = VIEW_UPLODED_DOCUMENT;
    if (isView) {
        $('#other_doc_item_container_for_' + moduleType + isView).append(mOtherDocItemViewTemplate(docData));
        if (docData.other_doc) {
            loadMOtherDocumentForView(moduleType, mOtherDocRowCnt, docData);
        }
    }
    resetCounter('other-doc-display-cnt-for-' + moduleType);
    mOtherDocRowCnt++;
}

function loadMOtherDocumentForView(moduleType, cnt, docData) {
    $('#other_upload_name_href_for_' + moduleType + '_' + cnt).attr('href', PROJECT_PATH + docData.other_doc_path + '/' + docData.other_doc);
    $('#other_upload_container_for_' + moduleType + '_' + cnt).hide();
    $('#other_upload_name_container_for_' + moduleType + '_' + cnt).show();
}

function loadMap(mapId, latClass, lngClass, mapData, allowOnClick) {
    if (typeof allowOnClick === "undefined") {
        allowOnClick = false;
    }
    var map = L.map(mapId).setView([mapData.lat, mapData.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; NIC Daman'
    }).addTo(map);
    var popup = L.popup();
    if (allowOnClick) {
        popup.setLatLng(mapData)
                .setContent('Selected LatLng(' + mapData.lat + ',' + mapData.lng + ')')
                .openOn(map);
        map.on('click', onMapClick);
        function onMapClick(e) {
            popup
                    .setLatLng(e.latlng)
                    .setContent("Selected " + e.latlng.toString())
                    .openOn(map);

            $('.' + latClass).val((e['latlng'].lat).toFixed(6));
            $('.' + lngClass).val((e['latlng'].lng).toFixed(6));
        }
    } else {
        var marker = L.marker([mapData.lat, mapData.lng]).addTo(map);
        marker.bindPopup('Selected LatLng(' + mapData.lat + ',' + mapData.lng + ')').openPopup();
    }
}
function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function showFeedbackRating(btnObj, moduleType, moduleId) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (!moduleType || moduleType == null || moduleType == VALUE_ZERO || !moduleId || moduleId == null || moduleId == VALUE_ZERO) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/get_basic_details_for_feedback_rating',
        data: $.extend({}, {'module_type': moduleType, 'module_id': moduleId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            closeFullPageOverlay();
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
            closeFullPageOverlay();
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
                return false;
            }
            var frData = parseData.fr_data;
            frData.module_type = moduleType;
            frData.application_number = regNoRenderer(moduleType, frData.module_id);
            if (frData.rating == VALUE_ZERO) {
                frData.show_submit_btn = true;
            }
            showPopup();
            $('.swal2-popup').css('width', '30em');
            $('#popup_container').html(feedbackRatingTemplate(frData));
            generateBoxes('radio', ratingArray, 'rating', 'fr', frData.rating);
        }
    });
}

function getRating(rating) {
    if (rating == VALUE_ZERO) {
        return '';
    }
    var returnData = '<hr>';
    $.each(ratingArray, function (index, value) {
        returnData += '<span class="fa fa-star' + (rating >= value ? ' text-warning' : '') + '"></span>';
    });
    return returnData;
}

function getFRContainer(rating, frDateTime) {
    return '<div>' + getRating(rating) + '</div>';
//            + '<div>' + (frDateTime != "0000-00-00 00:00:00" ? dateTo_DD_MM_YYYY_HH_II_SS(frDateTime) : '') + '</div>'
}

function getAppNoWithRating(moduleType, moduleId, full) {
    var returnData = '';
    if (tempTypeInSession == TEMP_TYPE_A || tempTypeInSession == TEMP_TYPE_VDD) {
        returnData = regNoRenderer(moduleType, moduleId) + '<hr>' + (talukaArray[full.district] ? talukaArray[full.district] : '');
    } else {
        returnData = regNoRenderer(moduleType, moduleId);
    }
    return returnData + getFRContainer(full.rating, full.fr_datetime);
}