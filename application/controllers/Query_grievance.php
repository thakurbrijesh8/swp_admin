<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Query_grievance extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('query_grievance_model');
    }

    function get_query_grievance_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['query_grievance_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $search_status = trim($columns[7]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['query_grievance_data'] = $this->query_grievance_model->get_all_query_grievance_list($start, $length, $search_applicant_name, $search_status);
            $success_array['recordsTotal'] = $this->query_grievance_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->query_grievance_model->get_filter_count_of_records($search_applicant_name, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['query_grievance_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['query_grievance_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

    function get_query_grievance_data_by_id() {
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
            $query_grievance_id = get_from_post('query_grievance_id');
            if (!$query_grievance_id) {
                echo json_encode(get_error_array(INVALID_USER_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $query_grievance_data = $this->query_grievance_model->get_query_grievance_by_id($query_grievance_id);
            if (empty($query_grievance_data)) {
                echo json_encode(get_error_array(INVALID_USER_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['query_grievance_data'] = $query_grievance_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_query_grievance() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            //$module_type = get_from_post('module_type');
            if (!is_post() || $user_id == NULL || !$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_grievance_id = get_from_post('query_grievance_id');
            $query_grievance_data = $this->_get_post_data_for_query_grievance();
            $validation_message = $this->_check_validation_for_query_grievance($query_grievance_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            $this->db->trans_start();
            //$query_grievance_data['status'] = VALUE_TWO;
            $ex_data = $this->utility_model->get_by_id('query_grievance_id', $query_grievance_id, 'query_grievance');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_grievance_data['processing_days'] = get_days_in_dates($ex_data['submitted_datetime']);
            $query_grievance_data['status'] = VALUE_TWO;
            $query_grievance_data['status_datetime'] = date('Y-m-d H:i:s');
            $query_grievance_data['updated_by'] = $user_id;
            $query_grievance_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('query_grievance_id', $query_grievance_id, 'query_grievance', $query_grievance_data);
        
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = 'Query Response Submitted Successfully';
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_query_grievance() {
        $query_grievance_data = array();
        $query_grievance_data['query_response'] = get_from_post('query_response');
        return $query_grievance_data;
    }

    function _check_validation_for_query_grievance($query_grievance_data) {
        if (!$query_grievance_data['query_response']) {
            return QUERY_RESPONSE_DETAIL_MESSAGE;
        }
        return '';
    }
}

/*
 * EOF: ./application/controller/BOCW.php
 */