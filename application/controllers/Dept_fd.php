<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dept_fd extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
    }

    function get_dept_fd_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['dept_fd_data'] = array();
            if ($user_id == NULL || !$user_id) {
                echo json_encode($success_array);
                return false;
            }
            $qm_array = $this->config->item('query_module_array');
            $this->db->trans_start();
            $dept_fd_data = $this->utility_model->get_result_data('dept_fd');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['dept_fd_data'] = array();
                echo json_encode($success_array);
                return;
            }
            if (!empty($dept_fd_data)) {
                foreach ($dept_fd_data as $dept_fd) {
                    if (!isset($qm_array[$dept_fd['module_type']]['fee_details'])) {
                        $qm_array[$dept_fd['module_type']]['fee_details'] = array();
                    }
                    array_push($qm_array[$dept_fd['module_type']]['fee_details'], $dept_fd);
                }
            }
            $success_array['dept_fd_data'] = $qm_array;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['dept_fd_data'] = array();
            echo json_encode($success_array);
        }
    }

    function get_fee_details_by_id() {
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
            $module_type = get_from_post('module_type');
            if (!$module_type) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $qm_array = $this->config->item('query_module_array');
            if (!isset($qm_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $fee_details = $this->utility_model->get_result_data_by_id('module_type', $module_type, 'dept_fd');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['fee_details'] = $fee_details;
            $success_array['qm_array'] = $qm_array[$module_type] ? $qm_array[$module_type] : array();
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_dept_fee_details() {
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
            $module_type = get_from_post('module_type');
            if (!$module_type) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $qm_array = $this->config->item('query_module_array');
            if (!isset($qm_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $new_dfd_items = $this->input->post('new_dfd_items');
            $exi_dfd_items = $this->input->post('exi_dfd_items');
            if (empty($exi_dfd_items) && empty($new_dfd_items)) {
                echo json_encode(get_error_array(ONE_FEE_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $this->_update_dfd_details($session_user_id, $module_type, $exi_dfd_items, $new_dfd_items);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $dfd_data = $this->utility_model->get_result_data_by_id('module_type', $module_type, 'dept_fd');
            $success_array = get_success_array();
            $success_array['message'] = FEE_UPATED_MESSAGE;
            $success_array['dfd_data'] = $dfd_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _update_dfd_details($session_user_id, $module_type, $exi_dfd_items, $new_dfd_items) {
        if ($exi_dfd_items != '') {
            if (!empty($exi_dfd_items)) {
                foreach ($exi_dfd_items as &$value) {
                    $value['updated_by'] = $session_user_id;
                    $value['updated_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->update_data_batch('dept_fd_id', 'dept_fd', $exi_dfd_items);
            }
        }

        if ($new_dfd_items != '') {
            if (!empty($new_dfd_items)) {
                foreach ($new_dfd_items as &$value) {
                    $value['module_type'] = $module_type;
                    $value['created_by'] = $session_user_id;
                    $value['created_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->insert_data_batch('dept_fd', $new_dfd_items);
            }
        }
    }

}

/*
 * EOF: ./application/controller/Dept_fd.php
 */