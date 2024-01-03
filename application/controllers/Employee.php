<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Employee extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
        $this->load->model('employee_model');
    }

    function get_employee_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['employee_data'] = array();
            if ($user_id == NULL || !$user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['employee_data'] = $this->employee_model->get_all_employee_list($start, $length);
            $success_array['recordsTotal'] = $this->employee_model->get_total_count_of_records();
            if ($search_applicant_name != '') {
                $success_array['recordsFiltered'] = $this->employee_model->get_filter_count_of_records();
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['employee_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['employee_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

    function get_employee_data_by_id() {
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
            $employee_id = get_from_post('employee_id');
            if (!$employee_id) {
                echo json_encode(get_error_array(INVALID_EMPLOYEE_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $employee_data = $this->utility_model->get_by_id('employee_id', $employee_id, 'employee');
            if (empty($employee_data)) {
                echo json_encode(get_error_array(INVALID_EMPLOYEE_MESSAGE));
                return false;
            }
            if (is_admin()) {
                $dept_data = $this->utility_model->get_by_id('department_id', $employee_data['department_id'], 'department');
                $employee_data['district'] = $dept_data['district'];
            }
            $department_data = $this->utility_lib->get_department_data_by_district();
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['employee_data'] = $employee_data;
            $success_array['department_data'] = $department_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_from_post() {
        $dept_array = array();
        if (is_admin()) {
            $dept_array['department_id'] = get_from_post('department_id_for_employee');
        }
        $dept_array['employee_name'] = get_from_post('employee_name_for_employee');
        $dept_array['designation'] = get_from_post('designation_for_employee');
        $dept_array['roles'] = $this->input->post('roles_for_employee');
        if (is_array($dept_array['roles'])) {
            $dept_array['roles'] = implode(',', $dept_array['roles']);
        }
        $dept_array['email'] = get_from_post('email_for_employee');
        $dept_array['mobile_number'] = get_from_post('mobile_number_for_employee');
        $dept_array['pin'] = get_from_post('pin_for_employee');
        $dept_array['status'] = get_from_post('status_for_employee');
        return $dept_array;
    }

    function _check_validation($dept_array) {
        if (is_admin()) {
            if (!$dept_array['department_id']) {
                return SELECT_DEPARTMENT_MESSAGE;
            }
        }
        if (!$dept_array['employee_name']) {
            return EMPLOYEE_NAME_MESSAGE;
        }
        if (!$dept_array['designation']) {
            return ENTER_DESIGNATION_MESSAGE;
        }
        if (!$dept_array['roles']) {
            return ONE_ROLE_MESSAGE;
        }
        if (!$dept_array['mobile_number']) {
            return MOBILE_NUMBER_MESSAGE;
        }
        if (!preg_match('/^[0-9]{10}+$/', $dept_array['mobile_number'])) {
            return INVALID_MOBILE_NUMBER_MESSAGE;
        }
        if (!$dept_array['pin']) {
            return PIN_MESSAGE;
        }
        return '';
    }

    function save_employee() {
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
            $employee_data = $this->_get_from_post();
            $validation_message = $this->_check_validation($employee_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            if ($_FILES['spacimen_signature_for_employee']['name'] != '') {
                $spacimen_signature_size = $_FILES['spacimen_signature_for_employee']['size'];
                if ($spacimen_signature_size == 0) {
                    echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                    return;
                }
                $maxsize = '1048576‬';
                if ($spacimen_signature_size >= $maxsize) {
                    echo json_encode(get_error_array(UPLOAD_MAX_1_MB_MESSAGE));
                    return;
                }
            }
            if ($_FILES['photo_for_employee']['name'] != '') {
                $photo_size = $_FILES['photo_for_employee']['size'];
                if ($photo_size == 0) {
                    echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                    return;
                }
                $maxsize = '1048576‬';
                if ($photo_size >= $maxsize) {
                    echo json_encode(get_error_array(UPLOAD_MAX_1_MB_MESSAGE));
                    return;
                }
            }
            $this->db->trans_start();
            $ex_mobile = $this->utility_model->check_field_value_exists_or_not('mobile_number', $employee_data['mobile_number'], 'employee', NULL, NULL, NULL, NULL);
            if (!empty($ex_mobile)) {
                echo json_encode(get_error_array(MOBILE_EXISTS_MESSAGE));
                return false;
            }
            $this->load->library('upload');
            $spacimen_signature_filename = '';
            if ($_FILES['spacimen_signature_for_employee']['name'] != '') {
                $main_path = 'documents/employee';
                if (!is_dir($main_path)) {
                    mkdir($main_path);
                    chmod("$main_path", 0755);
                }
                $temp_spacimen_signature_filename = str_replace('_', '', $_FILES['spacimen_signature_for_employee']['name']);
                $spacimen_signature_filename = 'ss_' . (rand(100000000, 999999999)) . '_' . time() . '.' . pathinfo($temp_spacimen_signature_filename, PATHINFO_EXTENSION);

                //Change file name
                $spacimen_signature_final_path = $main_path . DIRECTORY_SEPARATOR . $spacimen_signature_filename;
                if (!move_uploaded_file($_FILES['spacimen_signature_for_employee']['tmp_name'], $spacimen_signature_final_path)) {
                    echo json_encode(get_error_array(DOC_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $employee_data['spacimen_signature'] = $spacimen_signature_filename;
            }
            $photo_filename = '';
            if ($_FILES['photo_for_employee']['name'] != '') {
                $main_path = 'documents/employee';
                if (!is_dir($main_path)) {
                    mkdir($main_path);
                    chmod("$main_path", 0755);
                }
                $temp_photo_filename = str_replace('_', '', $_FILES['photo_for_employee']['name']);
                $photo_filename = 'photo_' . (rand(100000000, 999999999)) . '_' . time() . '.' . pathinfo($temp_photo_filename, PATHINFO_EXTENSION);

                //Change file name
                $photo_final_path = $main_path . DIRECTORY_SEPARATOR . $photo_filename;
                if (!move_uploaded_file($_FILES['photo_for_employee']['tmp_name'], $photo_final_path)) {
                    echo json_encode(get_error_array(DOC_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $employee_data['photo'] = $photo_filename;
            }
            $employee_data['created_by'] = $user_id;
            $employee_data['created_time'] = date('Y-m-d H:i:s');
            $this->utility_model->insert_data('employee', $employee_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = EMPLOYEE_SAVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function update_employee() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $employee_id = get_from_post('employee_id_for_employee');
            if (!is_post() || $user_id == NULL || !$user_id || !$employee_id || $employee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $employee_data = $this->_get_from_post();
            $validation_message = $this->_check_validation($employee_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            if ($_FILES['spacimen_signature_for_employee']['name'] != '') {
                $spacimen_signature_size = $_FILES['spacimen_signature_for_employee']['size'];
                if ($spacimen_signature_size == 0) {
                    echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                    return;
                }
                $maxsize = '1048576‬';
                if ($spacimen_signature_size >= $maxsize) {
                    echo json_encode(get_error_array(UPLOAD_MAX_1_MB_MESSAGE));
                    return;
                }
            }
            if ($_FILES['photo_for_employee']['name'] != '') {
                $photo_size = $_FILES['photo_for_employee']['size'];
                if ($photo_size == 0) {
                    echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                    return;
                }
                $maxsize = '1048576‬';
                if ($photo_size >= $maxsize) {
                    echo json_encode(get_error_array(UPLOAD_MAX_1_MB_MESSAGE));
                    return;
                }
            }
            $this->db->trans_start();
            $ex_mobile = $this->utility_model->check_field_value_exists_or_not('mobile_number', $employee_data['mobile_number'], 'employee', 'employee_id', $employee_id, NULL, NULL);
            if (!empty($ex_mobile)) {
                echo json_encode(get_error_array(MOBILE_EXISTS_MESSAGE));
                return false;
            }
            $this->load->library('upload');
            $spacimen_signature_filename = '';
            if ($_FILES['spacimen_signature_for_employee']['name'] != '') {
                $main_path = 'documents/employee';
                if (!is_dir($main_path)) {
                    mkdir($main_path);
                    chmod("$main_path", 0755);
                }
                $temp_spacimen_signature_filename = str_replace('_', '', $_FILES['spacimen_signature_for_employee']['name']);
                $spacimen_signature_filename = 'ss_' . (rand(100000000, 999999999)) . '_' . time() . '.' . pathinfo($temp_spacimen_signature_filename, PATHINFO_EXTENSION);

                //Change file name
                $spacimen_signature_final_path = $main_path . DIRECTORY_SEPARATOR . $spacimen_signature_filename;
                if (!move_uploaded_file($_FILES['spacimen_signature_for_employee']['tmp_name'], $spacimen_signature_final_path)) {
                    echo json_encode(get_error_array(DOC_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $employee_data['spacimen_signature'] = $spacimen_signature_filename;
            }
            $photo_filename = '';
            if ($_FILES['photo_for_employee']['name'] != '') {
                $main_path = 'documents/employee';
                if (!is_dir($main_path)) {
                    mkdir($main_path);
                    chmod("$main_path", 0755);
                }
                $temp_photo_filename = str_replace('_', '', $_FILES['photo_for_employee']['name']);
                $photo_filename = 'photo_' . (rand(100000000, 999999999)) . '_' . time() . '.' . pathinfo($temp_photo_filename, PATHINFO_EXTENSION);

                //Change file name
                $photo_final_path = $main_path . DIRECTORY_SEPARATOR . $photo_filename;
                if (!move_uploaded_file($_FILES['photo_for_employee']['tmp_name'], $photo_final_path)) {
                    echo json_encode(get_error_array(DOC_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $employee_data['photo'] = $photo_filename;
            }
            $employee_data['updated_by'] = $user_id;
            $employee_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('employee_id', $employee_id, 'employee', $employee_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = EMPLOYEE_UPDATED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function remove_document() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $employee_id = get_from_post('employee_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$employee_id || $employee_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            if ($module_type != VALUE_ONE && $module_type != VALUE_TWO) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = $module_type == VALUE_ONE ? 'spacimen_signature' : ($module_type == VALUE_TWO ? 'photo' : '');
            $this->db->trans_start();
            $ex_emp_data = $this->utility_model->get_by_id('employee_id', $employee_id, 'employee');
            if (empty($ex_emp_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'employee' . DIRECTORY_SEPARATOR . $ex_emp_data[$module_id];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('employee_id', $employee_id, 'employee', array($module_id => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            $success_array['module_id'] = $module_id;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/Employee.php
 */