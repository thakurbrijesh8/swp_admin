<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class C_inspections extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('c_inspections_model');
        $this->load->model('utility_model');
    }

    function get_c_inspections_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['c_inspections_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_cbtype = trim($columns[3]['search']['value']);
            $search_cbname = trim($columns[4]['search']['value']);
            $search_cbaddress = trim($columns[5]['search']['value']);
            $search_status = trim($columns[6]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['c_inspections_data'] = $this->c_inspections_model->get_all_ci_list($start, $length, $search_cbtype, $search_cbname, $search_cbaddress, $search_status);
            $success_array['recordsTotal'] = $this->c_inspections_model->get_total_count_of_records();
            if ($search_cbtype != '' || $search_cbname != '' || $search_cbaddress != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->c_inspections_model->get_filter_count_of_records($search_cbtype, $search_cbname, $search_cbaddress, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['c_inspections_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['c_inspections_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_c_inspections_by_id() {
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
            $c_inspection_id = get_from_post('c_inspection_id');
            if (!$c_inspection_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ci_data = $this->utility_model->get_by_id('c_inspection_id', $c_inspection_id, 'c_inspections');
            if (empty($ci_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['ci_data'] = $ci_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_c_inspections() {
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
            $ci_id = get_from_post('c_inspection_id_for_ci');
            $ci_data = $this->_get_post_data_for_ci();
            $validation_message = $this->_check_validation_for_ci($ci_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $temp_array = array();
            $temp_array[0] = $ci_data['inspection_under_act'];
            $temp_acts = is_array($ci_data['inspection_under_act']) ? $ci_data['inspection_under_act'] : $temp_array;
            $ci_data['inspection_date'] = convert_to_mysql_date_format($ci_data['inspection_date']);
            if (is_array($ci_data['inspection_under_act'])) {
                $ci_data['inspection_under_act'] = implode(',', $ci_data['inspection_under_act']);
            }
            $this->db->trans_start();
            $assign_data = $this->_assign_inspector($temp_acts);
            $ci_data['officer_ids'] = '';
            if (!empty($assign_data)) {
                $ci_data['officer_ids'] = json_encode($assign_data);
            }
            if (!$ci_id || $ci_id == NULL) {
                $ci_data['department_id'] = TEMP_TYPE_LABOUR_DEPT_USER;
                $ci_data['status'] = VALUE_ONE;
                $ci_data['created_by'] = $user_id;
                $ci_data['created_time'] = date('Y-m-d H:i:s');
                $ci_id = $this->utility_model->insert_data('c_inspections', $ci_data);
            } else {
                $ci_data['updated_by'] = $user_id;
                $ci_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('c_inspection_id', $ci_id, 'c_inspections', $ci_data);
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

    function _assign_inspector($temp_acts) {
        $c_inspection_act_array = $this->config->item('c_inspection_act_array');
//        $temp_labour_act = VALUE_ZERO;
//        $temp_fb_act = VALUE_ZERO;
//        $temp_wm_act = VALUE_ZERO;
//        $temp_pcc_act = VALUE_ZERO;
        $ao_data = array();
        $ao_data['officer_id'] = 0;
        $ao_data['officer_name'] = '';
        $ao_data['message'] = 'No Officer are Available !';
        $ao_data['status'] = 2;
        $assign_data = array();
        foreach ($temp_acts as $key => $act_id) {
            if (!isset($assign_data[$act_id])) {
                $assign_data[$act_id] = $ao_data;
            }
            $temp_data = isset($c_inspection_act_array[$act_id]) ? $c_inspection_act_array[$act_id] : array();
            if (!empty($temp_data)) {
//                if ($temp_data['department'] == TEMP_TYPE_LABOUR_DEPT_USER) {
                    $temp_o_data = $this->utility_model->get_rand_officer_id($temp_data['department']);
                    if (!empty($temp_o_data)) {
                        $assign_data[$act_id]['officer_id'] = $temp_o_data['officer_id'];
                        $assign_data[$act_id]['officer_name'] = $temp_o_data['officer_name'];
                        $assign_data[$act_id]['message'] = '';
                        $assign_data[$act_id]['status'] = 1;
                    }
//                    $temp_labour_act++;
//                }
//                if ($temp_data['department'] == TEMP_TYPE_FB) {
//                    $temp_o_data = $this->utility_model->get_rand_officer_id(TEMP_TYPE_FB);
//                    if (!empty($temp_o_data)) {
//                        $assign_data[$act_id]['officer_id'] = $temp_o_data['officer_id'];
//                        $assign_data[$act_id]['officer_name'] = $temp_o_data['officer_name'];
//                        $assign_data[$act_id]['message'] = '';
//                        $assign_data[$act_id]['status'] = 1;
//                    }
//                    $temp_fb_act++;
//                }
//                if ($temp_data['department'] == TEMP_TYPE_WM) {
//                    $temp_o_data = $this->utility_model->get_rand_officer_id(TEMP_TYPE_WM);
//                    if (!empty($temp_o_data)) {
//                        $assign_data[$act_id]['officer_id'] = $temp_o_data['officer_id'];
//                        $assign_data[$act_id]['officer_name'] = $temp_o_data['officer_name'];
//                        $assign_data[$act_id]['message'] = '';
//                        $assign_data[$act_id]['status'] = 1;
//                    }
//                    $temp_wm_act++;
//                }
//                if ($temp_data['department'] == TEMP_TYPE_PCC) {
//                    $temp_o_data = $this->utility_model->get_rand_officer_id(TEMP_TYPE_PCC);
//                    if (!empty($temp_o_data)) {
//                        $assign_data[$act_id]['officer_id'] = $temp_o_data['officer_id'];
//                        $assign_data[$act_id]['officer_name'] = $temp_o_data['officer_name'];
//                        $assign_data[$act_id]['message'] = '';
//                        $assign_data[$act_id]['status'] = 1;
//                    }
//                    $temp_pcc_act++;
//                }
            }
        }
        return $assign_data;
    }

    function _get_post_data_for_ci() {
        $ci_data = array();
        $ci_data['inspection_date'] = get_from_post('inspection_date_for_ci');
        $ci_data['cb_name'] = get_from_post('cb_name_for_ci');
        $ci_data['cb_address'] = get_from_post('cb_address_for_ci');
        $ci_data['cb_type'] = get_from_post('cb_type_for_ci');
        $ci_data['inspection_details'] = get_from_post('inspection_details_for_ci');
        $ci_data['remarks'] = get_from_post('remarks_for_ci');
        $ci_data['inspection_under_act'] = $this->input->post('inspection_under_act_for_ci');
        return $ci_data;
    }

    function _check_validation_for_ci($ci_data) {
        if (!$ci_data['inspection_date']) {
            return DATE_MESSAGE;
        }
        if (!$ci_data['cb_name']) {
            return CBNAME_MESSAGE;
        }
        if (!$ci_data['cb_address']) {
            return CBADDRESS_MESSAGE;
        }
        if (!$ci_data['cb_type']) {
            return ONE_OPTION_MESSAGE;
        }
        if (!$ci_data['inspection_under_act']) {
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
            $ci_id = get_from_post('c_inspection_id_for_uir_ci');
            if (!is_post() || $user_id == NULL || !$user_id || $ci_id == NULL || !$ci_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            if ($module_type != VALUE_THREE && $module_type != VALUE_TWO) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $ir_data = array();
            if ($_FILES['inspection_report_for_uir_ci']['name'] != '') {
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
                $temp_filename = str_replace('_', '', $_FILES['inspection_report_for_uir_ci']['name']);
                $filename = 'ci_ireport_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['inspection_report_for_uir_ci']['tmp_name'], $final_path)) {
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
            $this->utility_model->update_data('c_inspection_id', $ci_id, 'c_inspections', $ir_data);
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
            $c_inspection_id = get_from_post('c_inspection_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$c_inspection_id || $c_inspection_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('c_inspection_id', $c_inspection_id, 'c_inspections');
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
            $this->utility_model->update_data('c_inspection_id', $c_inspection_id, 'c_inspections', array('status' => VALUE_TWO, 'inspection_report' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function randomize_inspector_details() {
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
            $ci_id = get_from_post('c_inspection_id');
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('c_inspection_id', $ci_id, 'c_inspections');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $temp_acts = array();
            if (strpos($ex_est_data['inspection_under_act'], ',') !== false) {
                $temp_acts = explode(",", $ex_est_data['inspection_under_act']);
            } else {
                array_push($temp_acts, $ex_est_data['inspection_under_act']);
            }
            $assign_data = $this->_assign_inspector($temp_acts);
            $ci_data['officer_ids'] = '';
            if (!empty($assign_data)) {
                $ci_data['officer_ids'] = json_encode($assign_data);
            }
            $ci_data['updated_by'] = $session_user_id;
            $ci_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('c_inspection_id', $ci_id, 'c_inspections', $ci_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = RAND_SUCCESS_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function lock_randomization_details() {
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
            $ci_id = get_from_post('c_inspection_id');
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('c_inspection_id', $ci_id, 'c_inspections');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $ci_data = array();
            $ci_data['is_lock'] = VALUE_ONE;
            $ci_data['updated_by'] = $session_user_id;
            $ci_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('c_inspection_id', $ci_id, 'c_inspections', $ci_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = LOCK_RAND_SUCCESS_MESSAGE;
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