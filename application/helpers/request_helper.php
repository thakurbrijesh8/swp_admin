<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

function check_authenticated() {
    if (!is_authenticated()) {
        header("Location:" . base_url() . "login");
    }
}

function is_authenticated() {
    $CI = & get_instance();
    $user_id = $CI->session->userdata('temp_id_for_eodbsws_admin');
    if (is_null($user_id) || $user_id == '') {
        return false;
    }
    return true;
}

/**
 * Fetch the value from SESSION
 * @param type $key
 * @return type
 */
function get_from_session($key) {
    $CI = & get_instance();
    $value = $CI->session->userdata($key);
    return $value;
}

/**
 * Check Method is POST Or Not.
 * @return boolean
 */
function is_post() {
    return TRUE;
    if (!(filter_input(INPUT_SERVER, 'REQUEST_METHOD') === 'POST')) {
        return FALSE;
    }
    return TRUE;
}

/**
 * Fetch the value from POST. Will be trim() by default.
 * @param type $key - key to fetch from POST
 * @param type $trim - Optional. Default is TRUE
 * @return type
 */
function get_from_post($key, $trim = TRUE) {
    $CI = & get_instance();
    return $trim ? trim($CI->input->post($key)) : $CI->input->post($key);
}

function get_new_token() {
    $CI = & get_instance();
    return $CI->security->get_csrf_hash();
}

function get_success_array() {
    $CI = & get_instance();
    $return_array = array();
    $return_array['success'] = TRUE;
    $return_array['temp_token'] = $CI->security->get_csrf_hash();
    return $return_array;
}

function get_error_array($message = INVALID_ACCESS_MESSAGE) {
    $CI = & get_instance();
    $return_array = array();
    $return_array['success'] = FALSE;
    $return_array['temp_token'] = $CI->security->get_csrf_hash();
    $return_array['message'] = $message;
    return $return_array;
}

function api_encryption($access_token) {
    $method = 'aes-256-cbc';
    $password = substr(hash('sha256', API_ENCRYPTION_KEY, true), 0, 32);
    $iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);
    return base64_encode(openssl_encrypt($access_token, $method, $password, OPENSSL_RAW_DATA, $iv));
}

function api_decryption($access_token) {
    $method = 'aes-256-cbc';
    $password = substr(hash('sha256', API_ENCRYPTION_KEY, true), 0, 32);
    $iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);
    return openssl_decrypt(base64_decode($access_token), $method, $password, OPENSSL_RAW_DATA, $iv);
}

function is_admin() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_A;
}

function is_labour_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_LABOUR_DEPT_USER;
}

function is_sub_register_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_SUB_REGISTRAR;
}

function is_dic_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_DIC;
}

function is_pcc_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_PCC;
}

function is_fb_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_FB;
}

function is_rev_coll_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_REV_COLL;
}

function is_fire_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_FIRE;
}

function is_wm_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_WM;
}

function is_electricity_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_ELECTRICITY;
}

function is_pwd_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_PWD;
}

function is_tourism_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_TOURISM;
}

function is_pda_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_PDA;
}

function is_dic_dnh_dept_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_DIC_DNH;
}

function is_inspections_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_INSPECTIONS;
}

function is_ismw_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_ISMW;
}

function is_view_all_district_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_VDD;
}

function is_forest_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_FOREST;
}

function is_arcs_user() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_ARCS;
}

function is_user_acc_ver() {
    $CI = & get_instance();
    $user_type = $CI->session->userdata('temp_type_for_eodbsws_admin');
    return $user_type == TEMP_TYPE_USER_ACC_VER;
} 

function add_other_village($village_data) {
    $test_array = array();
    $test_array['village_code'] = OTHER_VILLAGE;
    $test_array['village_name'] = 'Other';
    array_push($village_data, $test_array);
    return $village_data;
}
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
function get_logout_array() {
    $return_array = get_error_array();
    $return_array['is_logout'] = true;
    return $return_array;
}

/**
 * EOF: ./application/helpers/request_helper.php
 */