<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_status extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('utility_model');
        $this->load->model('payment_model');
    }

    function check_payment_dv() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $fees_payment_id = get_from_post('fees_payment_id');
        if ($session_user_id == NULL || !$session_user_id || !$fees_payment_id || $fees_payment_id == NULL) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $this->db->trans_start();
        $check_payment_fp = $this->utility_model->get_by_id('fees_payment_id', $fees_payment_id, 'fees_payment');
        if (empty($check_payment_fp)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        if ($check_payment_fp['op_order_number'] == '') {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $module_type_array = $this->config->item('query_module_array');
        if (!isset($module_type_array[$check_payment_fp['module_type']])) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $temp_access_data = $module_type_array[$check_payment_fp['module_type']];
        if (empty($temp_access_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        $module_data = $this->utility_model->get_by_id($temp_access_data['key_id_text'], $check_payment_fp['module_id'], $temp_access_data['tbl_text']);
        if (empty($module_data)) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }

        $update_fp = false;
        $dv_data = array();
        $dv_data['dv_type'] = VALUE_TWO;
        $dv_data['fees_payment_id'] = $fees_payment_id;
        $dv_data['dv_start_datetime'] = date('Y-m-d H:i:s');
        $dv_data['created_by'] = $session_user_id;
        $dv_data['created_time'] = $dv_data['dv_start_datetime'];
        $dv_data['dv_status'] = VALUE_ONE;

        $dv_request_params = "|" . PG_MID . "|" . $check_payment_fp['op_order_number'] . "|" . $check_payment_fp['total_fees'];
        $query_request = http_build_query(array('queryRequest' => $dv_request_params, "aggregatorId" => PG_AGG_ID, "merchantId" => PG_MID));

        $ch = curl_init(PG_DV_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, 50000);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSLVERSION, 6);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query_request);
        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            $dv_data['dv_status'] = VALUE_THREE;
            $dv_data['dv_message'] = curl_error($ch);
        }
        if ($dv_data['dv_status'] == VALUE_ONE) {
            $dv_data['dv_status'] = VALUE_THREE;
            $dv_data['dv_message'] = RES_NOT_REC_MESSAGE;
            if ($response) {
                $return_data = explode('|', $response);
                if (!empty($return_data)) {
                    $status = isset($return_data[2]) ? $return_data[2] : '';
                    if ($status == 'No Records Found') {
                        $status = 'FAIL';
                    }
                    if ($status == 'FAIL' || $status == 'ABORT' || $status == 'PENDING' || $status == 'BOOKED' || $status == 'INPROGRESS' || $status == 'SUCCESS' || $status == 'REFUND' || $status == 'EXPIRED') {
                        $dv_data['dv_status'] = VALUE_TWO;
                        $dv_data['dv_return'] = $response;
                        $dv_data['dv_reference_id'] = isset($return_data[1]) ? $return_data[1] : '';
                        $dv_data['dv_pg_status'] = ($status == 'FAIL' || $status == 'ABORT' || $status == 'REFUND' || $status == 'EXPIRED') ? VALUE_THREE : ($status == 'PENDING' ? VALUE_FOUR : ($status == 'BOOKED' ? VALUE_FIVE : ($status == 'INPROGRESS' ? VALUE_SIX : ($status == 'SUCCESS' ? VALUE_TWO : VALUE_THREE))));
                        $dv_data['dv_order_number'] = isset($return_data[6]) ? $return_data[6] : '';
                        $dv_data['dv_amount'] = isset($return_data[7]) ? $return_data[7] : '';
                        $dv_data['dv_message'] = isset($return_data[8]) ? $return_data[8] : '';
                        $dv_data['dv_bank_code'] = isset($return_data[9]) ? $return_data[9] : '';
                        $dv_data['dv_bank_ref_number'] = isset($return_data[10]) ? $return_data[10] : '';
                        $update_fp = true;
                    }
                }
            }
        }
        $dv_data['dv_end_datetime'] = date('Y-m-d H:i:s');
        $fp_dv_id = $this->utility_model->insert_data('fees_payment_dv', $dv_data);
        if ($update_fp) {
            $update_fp = false;
            $fp_update = array();
            $this->_update_fp_data_status($fp_update, $fp_dv_id, $dv_data, $check_payment_fp, $update_fp, $fees_payment_id);
        }
        if ($update_fp) {
            $this->_update_module_data_status($module_data, $fp_update, $temp_access_data, $check_payment_fp);
        }

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
            return false;
        }
        $success_array = get_success_array();
        $dv_data['entered_by'] = get_from_session('name');
        $success_array['dv_data'] = $dv_data;
        if ($update_fp) {
            $success_array['is_updated_fp'] = $update_fp;
            $success_array['updated_op_status'] = isset($fp_update['op_status']) ? $fp_update['op_status'] : '';
            $success_array['updated_op_message'] = isset($fp_update['op_message']) ? $fp_update['op_message'] : '';
        }
        echo json_encode($success_array);
    }

    function _update_fp_data_status(&$fp_update, $fp_dv_id, $dv_data, $check_payment_fp, &$update_fp, $fees_payment_id) {
        $fp_update = array();
        $fp_update['fees_payment_dv_id'] = $fp_dv_id;
        if ($dv_data['dv_pg_status'] == VALUE_TWO || $dv_data['dv_pg_status'] == VALUE_THREE || $dv_data['dv_pg_status'] == VALUE_FOUR || $dv_data['dv_pg_status'] == VALUE_FIVE || $dv_data['dv_pg_status'] == VALUE_SIX) {
            if ($check_payment_fp['is_auto_dv_done'] == VALUE_ZERO) {
                $fp_update['is_auto_dv_done'] = VALUE_ONE;
            }
            if ($check_payment_fp['op_status'] != $dv_data['dv_pg_status']) {
                if (isset($dv_data['dv_return'])) {
                    $return_data = explode('|', $dv_data['dv_return']);
                    if (!empty($return_data)) {
                        $fp_update['reference_id'] = isset($return_data[13]) ? $return_data[13] : '';
                        $fp_update['op_end_datetime'] = isset($return_data[11]) ? $return_data[11] : '';
                        $fp_update['op_bank_code'] = isset($return_data[9]) ? $return_data[9] : '';
                        $fp_update['op_bank_reference_number'] = isset($return_data[10]) ? $return_data[10] : '';
                        $fp_update['op_transaction_datetime'] = $fp_update['op_end_datetime'];
                        $fp_update['op_mid'] = isset($return_data[0]) ? $return_data[0] : '';
                    }
                }
                $fp_update['op_status'] = $dv_data['dv_pg_status'];
                $fp_update['op_message'] = $dv_data['dv_message'];
                $update_fp = true;
            }
        }
        $this->utility_model->update_data('fees_payment_id', $fees_payment_id, 'fees_payment', $fp_update);
    }

    function _update_module_data_status($module_data, $fp_update, $temp_access_data, $check_payment_fp) {
        if ($module_data['status'] == VALUE_THREE && $fp_update['op_status'] == VALUE_TWO) {
            $md_update = array();
            $md_update['status'] = VALUE_FOUR;
            if ($module_data['user_payment_type'] != VALUE_THREE) {
                $md_update['user_payment_type'] = VALUE_THREE;
            }
            $this->utility_model->update_data($temp_access_data['key_id_text'], $check_payment_fp['module_id'], $temp_access_data['tbl_text'], $md_update);
        }
    }
}
