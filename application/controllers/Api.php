<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('utility_model');
    }

    function _bd_for_logs($crone_type) {
        $logs_data = array();
        $logs_data['crone_type'] = $crone_type;
        $logs_data['ip_address'] = $_SERVER['REMOTE_ADDR'];
        $logs_data['start_datetime'] = date('Y-m-d H:i:s');
        $logs_data['logs_data'] = json_encode($_SERVER);
        return $logs_data;
    }

    function _insert_log($logs_data, $status, $message) {
        $logs_data['end_datetime'] = date('Y-m-d H:i:s');
        $logs_data['status'] = $status;
        $logs_data['message'] = $message;
        $this->utility_model->insert_data('logs_crone', $logs_data);
    }

    function pending_dv_data() {
        $check_auth = check_crone_authentication();
        if (!$check_auth) {
            header("Location: " . base_url() . 'main/page_not_found');
            return false;
        }
        $logs_data = $this->_bd_for_logs(VALUE_THREE);
        $check_ip = check_crone_ip_authentication();
        if (!$check_ip) {
            $this->_insert_log($logs_data, VALUE_ONE, INVALID_IP_MESSAGE);
            header("Location: " . base_url() . 'main/page_not_found');
            return false;
        }
        try {
            $pending_dv = $this->utility_model->get_pending_dv();
            if (empty($pending_dv)) {
                $this->_insert_log($logs_data, VALUE_TWO, NO_RECORD_FOUND_MESSAGE);
                return false;
            }
            $module_type_array = $this->config->item('query_module_array');
            $this->load->library('payment_lib');
            foreach ($pending_dv as $fp) {
                $this->payment_lib->check_payment_dv($module_type_array, $fp);
            }
            $msg = count($pending_dv) . RECORDS_UPDATED_MESSAGE;
            $this->_insert_log($logs_data, VALUE_TWO, $msg);
        } catch (\Exception $e) {
            $this->_insert_log($logs_data, VALUE_ONE, $e->getMessage());
            header("Location: " . base_url() . 'main/page_not_found');
        }
    }
}

/*
 * EOF: ./application/controller/Api.php
 */