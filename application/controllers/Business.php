<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Business extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('business_model');
        $this->load->model('utility_model');
    }

    function get_business_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['business_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_logged_user_detail = trim($columns[1]['search']['value']);
            $search_ucn = trim($columns[2]['search']['value']);
            $search_ud = trim($columns[3]['search']['value']);

            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['business_data'] = $this->business_model->get_all_business_list($start, $length, $search_logged_user_detail, $search_ucn, $search_ud);
            $success_array['recordsTotal'] = $this->business_model->get_total_count_of_records();
            if ($search_logged_user_detail != '' || $search_ucn != '' || $search_ud != '') {
                $success_array['recordsFiltered'] = $this->business_model->get_filter_count_of_records($search_logged_user_detail, $search_ucn, $search_ud);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['business_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['business_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_business_data_by_id() {
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
            $business_id = get_from_post('business_id');
            if (!$business_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $business_data = $this->utility_model->get_by_id_with_applicant_name('business_id', $business_id, 'business');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($business_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['business_data'] = $business_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/Business.php
 */
