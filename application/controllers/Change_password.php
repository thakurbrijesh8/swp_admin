<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Change_password extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    function index() {
        try {
            $temp_tid = $this->input->get('tid');
            $tid = check_atob_encoded_value($temp_tid);
            if (!$tid) {
                $this->load->view('error', array('error_message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_npp = $this->input->get('npp');
            $npp = check_atob_encoded_value($temp_npp);
            if (!$npp) {
                $this->load->view('error', array('error_message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->load->model('utility_model');
            $this->db->trans_start();
            $ex_user_data = $this->utility_model->get_by_id('sa_user_id', $tid, 'sa_users');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $this->load->view('error', array('error_message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            if (empty($ex_user_data)) {
                $this->load->view('error', array('error_message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($ex_user_data['is_npp'] != VALUE_ZERO) {
                $this->load->view('error', array('error_message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($ex_user_data['is_deactive'] != VALUE_ZERO) {
                $this->load->view('error', array('error_message' => ACCOUNT_NOT_ACTIVE_MESSAGE));
                return false;
            }
            $success_data = array();
            $success_data['temp_tid'] = $temp_tid;
            $success_data['temp_npp'] = $temp_npp;
            $this->load->view('change_password', $success_data);
        } catch (\Exception $e) {
            $this->load->view('error', array('error_message' => $e->getMessage()));
            return;
        }
    }

    function change_new_password() {
        if (!is_ajax()) {
            header("Location:" . base_url() . "login");
            return false;
        }
        try {
            $temp_tid = get_from_post('temp_tid_for_change_password');
            $tid = check_atob_encoded_value($temp_tid);
            if (!$tid) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_npp = get_from_post('temp_npp_for_change_password');
            $npp = check_atob_encoded_value($temp_npp);
            if (!$npp || $npp != VALUE_ONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $ex_user_data = $this->utility_model->get_by_id('sa_user_id', $tid, 'sa_users');
            if (empty($ex_user_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($ex_user_data['is_npp'] != VALUE_ZERO) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($ex_user_data['is_deactive'] != VALUE_ZERO) {
                echo json_encode(get_error_array(ACCOUNT_NOT_ACTIVE_MESSAGE));
                return false;
            }
            $new_password = atob_decode(get_from_post('new_password_for_change_password'));
            $retype_password = atob_decode(get_from_post('retype_password_for_change_password'));
            if ($new_password == '') {
                echo json_encode(get_error_array(NEW_PASSWORD_MESSAGE));
                return false;
            }
            if ($retype_password == '') {
                echo json_encode(get_error_array(RETYPE_PASSWORD_MESSAGE));
                return false;
            }
            if ($new_password != $retype_password) {
                echo json_encode(get_error_array(PASSWORD_AND_RETYPE_PASSWORD_NOT_MATCH_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $update_data = array();
            $update_data['password'] = encrypt($new_password);
            $update_data['updated_by'] = $ex_user_data['sa_user_id'];
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $update_data['is_npp'] = VALUE_ONE;
            $update_data['npp_datetime'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('sa_user_id', $ex_user_data['sa_user_id'], 'sa_users', $update_data);
            $this->logs_model->insert_log(TBL_LOGS_CHANGE_PASSWORD, array('sa_user_id' => $ex_user_data['sa_user_id'], 'old_password' => $ex_user_data['password'], 'new_password' => $update_data['password'], 'created_time' => date('Y-m-d H:i:s')));
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }
}

/*
 * EOF: ./application/controllers/Change_password.php
 */