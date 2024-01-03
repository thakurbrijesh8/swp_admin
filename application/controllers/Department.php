<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Department extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
    }

    function get_department_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['department_data'] = array();
            $success_array['temp_department_data'] = array();
            if ($user_id == NULL || !$user_id) {
                echo json_encode($success_array);
                return false;
            }
            $this->db->trans_start();
            $success_array['department_data'] = $this->utility_model->get_result_data('department', 'department_name', 'ASC');
            $this->utility_lib->generate_district_dept_data($success_array['department_data'], $success_array['temp_department_data']);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['department_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['department_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_department_data_by_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == NULL || !$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $department_id = get_from_post('department_id');
            if (!$department_id) {
                echo json_encode(get_error_array(INVALID_DEPARTMENT_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $department_data = $this->utility_model->get_by_id('department_id', $department_id, 'department');
            if (empty($department_data)) {
                echo json_encode(get_error_array(INVALID_DEPARTMENT_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['department_data'] = $department_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_from_post() {
        $dept_array = array();
        $dept_array['district'] = get_from_post('district_for_department');
        $dept_array['department_name'] = get_from_post('department_name_for_department');
        $dept_array['department_address'] = get_from_post('department_address_for_department');
        $dept_array['landline_number'] = get_from_post('landline_number_for_department');
        $dept_array['hod_designation'] = get_from_post('hod_designation_for_department');
        $dept_array['hof_designation'] = get_from_post('hof_designation_for_department');
        return $dept_array;
    }

    function _check_validation($dept_array) {
        if (!$dept_array['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$dept_array['department_name']) {
            return DEPARTMENT_MESSAGE;
        }
        return '';
    }

    function save_department() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == NULL || !$user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $department_data = $this->_get_from_post();
            $validation_message = $this->_check_validation($department_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $existing_department_data = $this->utility_model->check_field_value_exists_or_not('department_name', $department_data['department_name'], 'department', NULL, NULL, 'district', $department_data['district']);
            if (!empty($existing_department_data)) {
                echo json_encode(get_error_array(DEPARTMENT_EXISTS_MESSAGE));
                return false;
            }
            $department_data['created_by'] = $user_id;
            $department_data['created_time'] = date('Y-m-d H:i:s');
            $this->utility_model->insert_data('department', $department_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = DEPARTMENT_SAVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function update_department() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $department_id = get_from_post('department_id_for_department');
            if (!is_post() || $user_id == NULL || !$user_id || !$department_id || $department_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $department_data = $this->_get_from_post();
            $validation_message = $this->_check_validation($department_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $existing_department_data = $this->utility_model->check_field_value_exists_or_not('department_name', $department_data['department_name'], 'department', 'department_id', $department_id, 'district', $department_data['district']);
            if (!empty($existing_department_data)) {
                echo json_encode(get_error_array(DEPARTMENT_EXISTS_MESSAGE));
                return false;
            }
            $department_data['updated_by'] = $user_id;
            $department_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('department_id', $department_id, 'department', $department_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = DEPARTMENT_UPDATED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/Department.php
 */