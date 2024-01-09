<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Utility_lib {

    var $CI;

    public function __construct() {
        $this->CI = & get_instance();
        $this->CI->load->model('utility_model');
    }

    function login_log($user_id) {
        $logs_data = array();
        $logs_data['sa_user_id'] = $user_id;
        $logs_data['ip_address'] = $_SERVER['REMOTE_ADDR'];
        $logs_data['login_timestamp'] = time();
        $logs_data['logs_data'] = json_encode($this->_get_client_info());
        $logs_data['created_time'] = date('Y-m-d H:i:s');
        return $this->CI->logs_model->insert_log(TBL_LOGS_LOGIN_LOGOUT, $logs_data);
    }

    function logout_log($log_id) {
        $logs_data = array();
        $logs_data['logout_timestamp'] = time();
        $logs_data['updated_time'] = date('Y-m-d H:i:s');
        return $this->CI->logs_model->update_log(TBL_LOGS_LOGIN_LOGOUT, TBL_LOGS_LOGIN_LOGOUT_PRIMARY_KEY, $log_id, $logs_data);
    }

    function _get_client_info() {
        return array(
            'HTTP_USER_AGENT' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
            'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR']
        );
    }

    function get_department_data_by_district() {
        $temp_department_data = $this->CI->utility_model->get_result_data('department', 'department_name', 'ASC');
        $department_data = array();
        $this->generate_district_dept_data($temp_department_data, $department_data);
        return $department_data;
    }

    function generate_district_dept_data($temp_department_data, &$department_data) {
        foreach ($temp_department_data as $dd) {
            if (!isset($department_data[$dd['district']])) {
                $department_data[$dd['district']] = array();
            }
            if (!isset($department_data[$dd['district']][$dd['department_id']])) {
                $department_data[$dd['district']][$dd['department_id']] = $dd;
            }
        }
    }

    function send_sms_and_email_for_app_approve($user_id, $sms_email_type, $module_type, $module_id) {
        $ex_user_data = $this->CI->utility_model->get_by_id('user_id', $user_id, 'users');
        $prefix_module_array = $this->CI->config->item('prefix_module_array');
        $registration_message = 'Your Application Number : ' . generate_registration_number($prefix_module_array[$module_type], $module_id) . ' is Approved !';
        $this->CI->load->helper('sms_helper');
        send_SMS($this, $user_id, $ex_user_data['mobile_number'], $registration_message, $sms_email_type);
        $this->CI->load->library('email_lib');
        $this->CI->email_lib->send_email($ex_user_data, 'Application Approved', $registration_message, $sms_email_type, $module_type, $module_id);
    }

    function send_sms_and_email_for_app_reject($user_id, $sms_email_type, $module_type, $module_id) {
        $ex_user_data = $this->CI->utility_model->get_by_id('user_id', $user_id, 'users');
        $prefix_module_array = $this->CI->config->item('prefix_module_array');
        $registration_message = 'Your Application Number : ' . generate_registration_number($prefix_module_array[$module_type], $module_id) . ' is Rejected !';
        $this->CI->load->helper('sms_helper');
        send_SMS($this, $user_id, $ex_user_data['mobile_number'], $registration_message, $sms_email_type);
        $this->CI->load->library('email_lib');
        $this->CI->email_lib->send_email($ex_user_data, 'Application Rejected', $registration_message, $sms_email_type, $module_type, $module_id);
    }

    function get_query_movement_string($module_data, $module_type) {
        $query_movements = array();
        $module_type_array = $this->CI->config->item('query_module_array');
        $ex_table_data = isset($module_type_array[$module_type]) ? $module_type_array[$module_type] : array();
        if (empty($ex_table_data)) {
            return $query_movements;
        }
        $temp_ids = array();
        foreach ($module_data as &$m_data) {
            $m_data['query_movement_string'] = '';
            if ($m_data['query_status'] != VALUE_ZERO) {
                array_push($temp_ids, $m_data[$ex_table_data['key_id_text']]);
            }
        }
        if (!empty($temp_ids)) {
            $qm_data = $this->CI->utility_model->get_result_data_by_ids('module_id', $temp_ids, 'query', 'module_type', $module_type, 'query_id', 'ASC');
            foreach ($qm_data as $qm) {
                if (!isset($query_movements[$qm['module_id']])) {
                    $query_movements[$qm['module_id']] = '';
                }
                $query_movements[$qm['module_id']] .= $this->get_qm($qm);
            }
        }
        return $query_movements;
    }

    function get_qm($qm) {
        $text_color = $qm["query_type"] == VALUE_ONE ? 'text-danger' : 'text-success';
        return '<tr><td class="text-center f-w-b ' . $text_color . '">' . ($qm["query_type"] == VALUE_ONE ? 'Q' : 'R')
                . '</td><td class="text-center ' . $text_color . '">' . convert_to_new_datetime_format($qm["query_datetime"]) . '</td></tr>';
    }

    function calculate_processing_days($module_type, $submitted_datetime) {
        $module_array = $this->CI->config->item('query_module_array');
        $working_days = 'fdw';
        if (isset($module_array[$module_type])) {
            $working_days = isset($module_array[$module_type]['working_days']) ? $module_array[$module_type]['working_days'] : $working_days;
        }
        $temp_hdl = $this->CI->utility_model->get_result_data_by_id($working_days, VALUE_ONE, 'holidaylist');
        $hdl_array = array();
        foreach ($temp_hdl as $hdl) {
            $hdl_ts = strtotime($hdl['holiday_date']);
            if (!isset($hdl_array[$hdl_ts])) {
                $hdl_array[$hdl_ts] = $hdl_ts;
            }
        }
        if ($submitted_datetime == '0000-00-00 00:00:00' || $submitted_datetime == '1999-01-01 00:00:00') {
            return VALUE_ZERO;
        }
        $total_holiday = 0;
        $total_working_days = 0;
        $startDate = new DateTime($submitted_datetime);

        $endDate = new DateTime(date('d-m-Y'));
        while ($startDate <= $endDate) {
            $timestamp = strtotime($startDate->format('d-m-Y'));
            if (isset($hdl_array[$timestamp])) {
                $total_holiday += 1;
            } else {
                $total_working_days += 1;
            }
            $startDate->modify('+1 day');
        }
        return $total_working_days;
    }

    function update_fees_bifurcation_details($module_type, $module_id, $user_id, &$module_data) {
        $fb_details = json_decode($this->CI->input->post('fees_bifurcation_details'), true);
        $new_fb_details = isset($fb_details['new_fb_items']) ? $fb_details['new_fb_items'] : array();
        $ex_fb_details = isset($fb_details['exi_fb_items']) ? $fb_details['exi_fb_items'] : array();
        $total_fees = isset($fb_details['total_fees']) ? $fb_details['total_fees'] : VALUE_ZERO;
        if (empty($new_fb_details) && empty($ex_fb_details)) {
            return ONE_FEE_MESSAGE;
        }
        $new_total_fee = VALUE_ZERO;
        if (!empty($new_fb_details)) {
            foreach ($new_fb_details as &$nfb) {
                $nfb['module_type'] = $module_type;
                $nfb['module_id'] = $module_id;
                $nfb['created_by'] = $user_id;
                $nfb['created_time'] = date('Y-m-d H:i:s');
                $new_total_fee += intval($nfb['fee']) ? intval($nfb['fee']) : VALUE_ZERO;
            }
        }
        $ex_ids = array();
        if (!empty($ex_fb_details)) {
            foreach ($ex_fb_details as &$efb) {
                $efb['module_type'] = $module_type;
                $efb['module_id'] = $module_id;
                $efb['updated_by'] = $user_id;
                $efb['updated_time'] = date('Y-m-d H:i:s');
                $new_total_fee += intval($efb['fee']) ? intval($efb['fee']) : VALUE_ZERO;
                array_push($ex_ids, $efb['fees_bifurcation_id']);
            }
        }
        if ($new_total_fee != $total_fees) {
            return INVALID_ACCESS_MESSAGE;
        }
        $module_data['total_fees'] = $new_total_fee;

        $update_data = $this->get_basic_delete_array($user_id);
        $this->CI->utility_model->update_data_not_in('module_type', $module_type, 'fees_bifurcation_id', $ex_ids, 'fees_bifurcation', $update_data, 'module_id', $module_id);
        
        if (!empty($new_fb_details)) {
            $this->CI->utility_model->insert_data_batch('fees_bifurcation', $new_fb_details);
        }
        if (!empty($ex_fb_details)) {
            $this->CI->utility_model->update_data_batch('fees_bifurcation_id', 'fees_bifurcation', $ex_fb_details);
        }
        return '';
    }

    function get_basic_delete_array($user_id) {
        $update_data = array();
        $update_data['is_delete'] = IS_DELETE;
        $update_data['updated_by'] = $user_id;
        $update_data['updated_time'] = date('Y-m-d H:i:s');
        return $update_data;
    }

}

/**
 * EOF: ./application/libraries/Email_lib.php
 */