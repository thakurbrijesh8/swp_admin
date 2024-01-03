<?php

define('PG_MID', 1001501);
define('PG_AGG_ID', 'SBIEPAY');
define('PG_DV_URL', 'https://www.sbiepay.sbi/payagg/statusQuery/getStatusQuery');

$config['pg_status_array'] = array(
    VALUE_ZERO => 'Payment Not Initiated',
    VALUE_ONE => 'Payment Initiated',
    VALUE_TWO => 'Payment Success',
    VALUE_THREE => 'Payment Failed',
    VALUE_FOUR => 'Response Pending From Bank',
    VALUE_FIVE => 'Response Pending From Bank',
    VALUE_SIX => 'Payment In Process',
);

$config['pg_status_text_array'] = array(
    VALUE_ZERO => '<span class="badge bg-gray app-status">Payment Not Initiated</span>',
    VALUE_ONE => '<span class="badge bg-nic-blue app-status">Payment Initiated</span>',
    VALUE_TWO => '<span class="badge bg-success app-status">Payment Success</span>',
    VALUE_THREE => '<span class="badge bg-danger app-status">Payment Failed</span>',
    VALUE_FOUR => '<span class="badge bg-warning app-status">Response Pending From Bank</span>',
    VALUE_FIVE => '<span class="badge bg-warning app-status">Response Pending From Bank</span>',
    VALUE_SIX => '<span class="badge bg-warning app-status">Payment In Process</span>'
);

$config['dv_status_array'] = array(
    VALUE_ZERO => 'Not Initiated',
    VALUE_ONE => 'Initiated',
    VALUE_TWO => 'Success',
    VALUE_THREE => 'Failed',
    VALUE_FOUR => 'Response Pending From Bank',
    VALUE_FIVE => 'Response Pending From Bank',
    VALUE_SIX => 'In Process',
);

$config['dv_status_text_array'] = array(
    VALUE_ZERO => '<span class="badge bg-gray app-status">Not Initiated</span>',
    VALUE_ONE => '<span class="badge bg-nic-blue app-status">Initiated</span>',
    VALUE_TWO => '<span class="badge bg-success app-status">Success</span>',
    VALUE_THREE => '<span class="badge bg-danger app-status">Failed</span>',
    VALUE_FOUR => '<span class="badge bg-warning app-status">Response Pending From Bank</span>',
    VALUE_FIVE => '<span class="badge bg-warning app-status">Response Pending From Bank</span>',
    VALUE_SIX => '<span class="badge bg-warning app-status">In Process</span>'
);
