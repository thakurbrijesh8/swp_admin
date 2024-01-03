<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Active_users extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('active_users_model');
        $this->load->model('utility_model');
    }

    function get_active_users_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['active_users_data'] = array();
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
            $active_users_data = $this->active_users_model->get_all_active_users_list($start, $length, $search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            $success_array['recordsTotal'] = $this->active_users_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_applicant_mobile != '' || $search_applicant_email != '') {
                $success_array['recordsFiltered'] = $this->active_users_model->get_filter_count_of_records($search_applicant_name, $search_applicant_mobile, $search_applicant_email);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['active_users_data'] = $active_users_data;
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['active_users_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['active_users_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

    function get_active_users_data_by_id() {
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
            $user_id = get_from_post('temp_user_id');
            if (!$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $active_users_data = $this->utility_model->get_by_id('user_id', $user_id, 'users');
            if (empty($active_users_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $active_users_data['pin'] = decrypt($active_users_data['pin']);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['active_users_data'] = $active_users_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/Active_users.php
 */