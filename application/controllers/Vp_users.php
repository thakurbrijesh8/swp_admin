<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Vp_users extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('vp_users_model');
        $this->load->model('utility_model');
    }

    function get_vp_users_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['vp_users_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $search_applicant_mobile = trim($columns[2]['search']['value']);
            $search_applicant_email = trim($columns[3]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $vp_users_data = $this->vp_users_model->get_all_vp_users_list($start, $length, $search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            $success_array['recordsTotal'] = $this->vp_users_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_applicant_mobile != '' || $search_applicant_email != '') {
                $success_array['recordsFiltered'] = $this->vp_users_model->get_filter_count_of_records($search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['vp_users_data'] = $vp_users_data;
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['vp_users_data'] = array();
                echo json_encode($success_array);
                return false;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['vp_users_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

    function resend_verification_link() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $temp_access_token = get_from_post('temp_access_token');
            if ($session_user_id == NULL || !$session_user_id || $temp_access_token == NULL || !$temp_access_token) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $tu_data = $this->utility_model->get_by_id('temp_access_token', $temp_access_token, 'users');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if (empty($tu_data) || $tu_data['is_active'] == VALUE_ONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }

            $link = 'https://swp.dddgov.in/confirmation?q=' . $tu_data['temp_access_token'];
            $registration_message = "Click following URL or Paste URL in browser's address bar to complete your Account Verification for <b>SWP</b> <br><br>" . $link;
            $this->load->helper('sms_helper');
            send_SMS($this, $tu_data['user_id'], $tu_data['mobile_number'], 'Confirm Your Account. ' . $link, VALUE_ONE);
            $this->load->library('email_lib');
            $this->email_lib->send_email($tu_data, 'Account Verification', $registration_message, VALUE_ONE);

            $success_array = get_success_array();
            $success_array['message'] = VER_MAIL_RESEND_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_vp_users_data_by_id() {
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
            $vp_user_id = get_from_post('vp_user_id');
            if (!$vp_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
           
            $this->db->trans_start();
            $vp_user_data = $this->utility_model->get_by_id('user_id', $vp_user_id, 'users');
            if (empty($vp_user_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['vp_users_data'] = $vp_user_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function update_email() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $vp_user_id = get_from_post('vp_user_id_for_vp_users');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vp_user_id || $vp_user_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }

            $vp_user_data = $this->_get_post_data_for_email_update();
            $validation_message = $this->_check_validation_for_email_update($vp_user_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $vp_user_data['updated_by'] = $session_user_id;
            $vp_user_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('user_id', $vp_user_id, 'users', $vp_user_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = EMAIL_UPDATED_MESSSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_email_update() {
        $vp_user_data = array();
        $vp_user_data['email'] = get_from_post('email_for_vp_users');
        return $vp_user_data;
    }

    function _check_validation_for_email_update($vp_user_data) {
        if (!$vp_user_data['email']) {
            return EMAIL_MESSAGE;
        }
        if (!$vp_user_data['email'] || !filter_var($vp_user_data['email'], FILTER_VALIDATE_EMAIL)) {
            return INVALID_EMAIL_MESSAGE;
        }
        return '';
    }

    function delete_vp_users_by_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $vp_user_id = $this->input->post('vp_user_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$vp_user_id || $vp_user_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $vp_user_data = array();
            $vp_user_data['is_delete'] = IS_DELETE;
            $vp_user_data['updated_by'] = $session_user_id;
            $vp_user_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('user_id', $vp_user_id, 'users', $vp_user_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = DELETE_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }
    
    function get_deleted_users_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['deleted_users_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $search_applicant_mobile = trim($columns[2]['search']['value']);
            $search_applicant_email = trim($columns[3]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $deleted_users_data = $this->vp_users_model->get_all_deleted_users_list($start, $length, $search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            $success_array['recordsTotal'] = $this->vp_users_model->get_total_count_of_deleted_records();
            if ($search_applicant_name != '' || $search_applicant_mobile != '' || $search_applicant_email != '') {
                $success_array['recordsFiltered'] = $this->vp_users_model->get_filter_count_of_deleted_records($search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['deleted_users_data'] = $deleted_users_data;
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['deleted_users_data'] = array();
                echo json_encode($success_array);
                return false;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['deleted_users_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

}

/*
 * EOF: ./application/controller/Vp_users.php
 */