<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Sj_inspections extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('sj_inspections_model');
        $this->load->model('utility_model');
    }

    function get_sj_inspections_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['sj_inspections_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_iua = trim($columns[2]['search']['value']);
            $search_cbtype = trim($columns[3]['search']['value']);
            $search_cbname = trim($columns[4]['search']['value']);
            $search_cbaddress = trim($columns[5]['search']['value']);
            $search_status = trim($columns[6]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['sj_inspections_data'] = $this->sj_inspections_model->get_all_sji_list($start, $length, $search_iua, $search_cbtype, $search_cbname, $search_cbaddress, $search_status);
            $success_array['recordsTotal'] = $this->sj_inspections_model->get_total_count_of_records();
            if ($search_iua != '' || $search_cbtype != '' || $search_cbname != '' || $search_cbaddress != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->sj_inspections_model->get_filter_count_of_records($search_iua, $search_cbtype, $search_cbname, $search_cbaddress, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['sj_inspections_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['sj_inspections_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_sj_inspections_by_id() {
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
            $sj_inspection_id = get_from_post('sj_inspection_id');
            if (!$sj_inspection_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $sji_data = $this->utility_model->get_by_id('sj_inspection_id', $sj_inspection_id, 'sj_inspections');
            if (empty($sji_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['sji_data'] = $sji_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_sj_inspections() {
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
            $sji_id = get_from_post('sj_inspection_id_for_sji');
            $sji_data = $this->_get_post_data_for_sji();
            $validation_message = $this->_check_validation_for_sji($sji_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $sji_data['inspection_date'] = convert_to_mysql_date_format($sji_data['inspection_date']);
            if (is_array($sji_data['inspection_under_act'])) {
                $sji_data['inspection_under_act'] = implode(',', $sji_data['inspection_under_act']);
            }
            $this->db->trans_start();
            if (!$sji_id || $sji_id == NULL) {
                $sji_data['department_id'] = TEMP_TYPE_LABOUR_DEPT_USER;
                $sji_data['status'] = VALUE_ONE;
                $sji_data['created_by'] = $user_id;
                $sji_data['created_time'] = date('Y-m-d H:i:s');
                $sji_id = $this->utility_model->insert_data('sj_inspections', $sji_data);
            } else {
                $sji_data['updated_by'] = $user_id;
                $sji_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('sj_inspection_id', $sji_id, 'sj_inspections', $sji_data);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = APP_SUBMITTED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_sji() {
        $sji_data = array();
        $sji_data['inspection_date'] = get_from_post('inspection_date_for_sji');
        $sji_data['cb_name'] = get_from_post('cb_name_for_sji');
        $sji_data['cb_address'] = get_from_post('cb_address_for_sji');
        $sji_data['cb_type'] = get_from_post('cb_type_for_sji');
        $sji_data['inspection_details'] = get_from_post('inspection_details_for_sji');
        $sji_data['remarks'] = get_from_post('remarks_for_sji');
        $sji_data['inspection_under_act'] = $this->input->post('inspection_under_act_for_sji');
        return $sji_data;
    }

    function _check_validation_for_sji($sji_data) {
        if (!$sji_data['inspection_date']) {
            return DATE_MESSAGE;
        }
        if (!$sji_data['cb_name']) {
            return CBNAME_MESSAGE;
        }
        if (!$sji_data['cb_address']) {
            return CBADDRESS_MESSAGE;
        }
        if (!$sji_data['cb_type']) {
            return ONE_OPTION_MESSAGE;
        }
        if (!$sji_data['inspection_under_act']) {
            return ONE_OPTION_MESSAGE;
        }
        return '';
    }

    function upload_inspection_report() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $sji_id = get_from_post('sj_inspection_id_for_uir_sji');
            if (!is_post() || $user_id == NULL || !$user_id || $sji_id == NULL || !$sji_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            if ($module_type != VALUE_THREE && $module_type != VALUE_TWO) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $ir_data = array();
            if ($_FILES['inspection_report_for_uir_sji']['name'] != '') {
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'inspection_report';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['inspection_report_for_uir_sji']['name']);
                $filename = 'sji_ireport_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['inspection_report_for_uir_sji']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $ir_data['inspection_report'] = $filename;
            }
            $ir_data['status'] = $module_type;
            if ($module_type == VALUE_THREE) {
                $ir_data['status_datetime'] = date('Y-m-d H:i:s');
            }
            $ir_data['updated_by'] = $user_id;
            $ir_data['updated_time'] = date('Y-m-d H:i:s');
            $this->db->trans_start();
            $this->utility_model->update_data('sj_inspection_id', $sji_id, 'sj_inspections', $ir_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = IR_UPLOAD_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function remove_inspection_report() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $sj_inspection_id = get_from_post('sj_inspection_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$sj_inspection_id || $sj_inspection_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('sj_inspection_id', $sj_inspection_id, 'sj_inspections');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'inspection_report' . DIRECTORY_SEPARATOR . $ex_est_data['inspection_report'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('sj_inspection_id', $sj_inspection_id, 'sj_inspections', array('status' => VALUE_TWO, 'inspection_report' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/BOCW.php
 */