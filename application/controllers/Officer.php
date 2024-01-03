<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Officer extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('user_model');
    }

    function get_officer_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['officer_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $this->db->trans_start();
            $success_array['officer_data'] = $this->utility_model->get_officer_data();
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['officer_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['officer_data'] = array();
            echo json_encode($success_array);
        }
    }

    function get_common_data_for_officer() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['department_data'] = array();
            if ($user_id == NULL || !$user_id) {
                echo json_encode($success_array);
                return false;
            }
            $this->db->trans_start();
            $success_array['department_data'] = $this->user_model->get_all_user_type_list(TRUE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['department_data'] = array();
            echo json_encode($success_array);
        }
    }

    function get_officer_data_by_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $officer_id = get_from_post('officer_id');
            if (!$officer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $officer_data = $this->utility_model->get_by_id('officer_id', $officer_id, 'officer');
            if (empty($officer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $department_data = $this->user_model->get_all_user_type_list(TRUE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['officer_data'] = $officer_data;
            $success_array['department_data'] = $department_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_officer_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $officer_data = $this->_get_post_data_for_officer();
            $validation_message = $this->_check_validation_for_officer($officer_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $officer_id = get_from_post('officer_id_for_officer');
            $this->db->trans_start();
            if (!$officer_id || $officer_id == null) {
                $officer_data['created_by'] = $session_user_id;
                $officer_data['created_time'] = date('Y-m-d H:i:s');
                $this->utility_model->insert_data('officer', $officer_data);
            } else {
                $officer_data['updated_by'] = $session_user_id;
                $officer_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_user('officer_id', $officer_id, 'officer', $officer_data);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = OFFICER_SAVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_officer() {
        $officer_data = array();
        $officer_data['department_id'] = get_from_post('department_id_for_officer');
        $officer_data['officer_name'] = get_from_post('officer_name_for_officer');
        $officer_data['mobile_number'] = get_from_post('mobile_number_for_officer');
        $officer_data['email'] = get_from_post('email_for_officer');
        $officer_data['status'] = get_from_post('status_for_officer');
        return $officer_data;
    }

    function _check_validation_for_officer($officer_data) {
        if (!$officer_data['department_id']) {
            return ONE_OPTION_MESSAGE;
        }
        if (!$officer_data['officer_name']) {
            return NAME_MESSAGE;
        }
        if (!$officer_data['mobile_number']) {
            return MOBILE_NUMBER_MESSAGE;
        }
        return '';
    }

}

/*
 * EOF: ./application/controller/Officer.php
 */