<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('utility_model');
    }

    function get_service_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = get_success_array();
            $success_array['service_data'] = array();
            if ($user_id == NULL || !$user_id) {
                echo json_encode($success_array);
                return false;
            }
            $this->db->trans_start();
            $dept_data = generate_array_for_id_object($this->utility_model->get_result_data('department'), 'department_id');
            $service_data = $this->utility_model->get_result_data('service');
            foreach ($service_data as &$value) {
                $value['daman_department_name'] = $value['daman_department_id'] != VALUE_ZERO ? $dept_data[$value['daman_department_id']]['department_name'] : '';
                $value['diu_department_name'] = $value['diu_department_id'] != VALUE_ZERO ? $dept_data[$value['diu_department_id']]['department_name'] : '';
                $value['dnh_department_name'] = $value['dnh_department_id'] != VALUE_ZERO ? $dept_data[$value['dnh_department_id']]['department_name'] : '';
            }
            $success_array['service_data'] = $service_data;
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['service_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_service_data_by_id() {
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
            $service_id = get_from_post('service_id');
            if (!$service_id) {
                echo json_encode(get_error_array(INVALID_SERVICE_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $service_data = $this->utility_model->get_by_id('service_id', $service_id, 'service');
            if (empty($service_data)) {
                echo json_encode(get_error_array(INVALID_SERVICE_MESSAGE));
                return false;
            }
            $questionary_data = $this->utility_model->get_result_data_by_id('service_id', $service_id, 'questionary');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['service_data'] = $service_data;
            $success_array['questionary_data'] = $questionary_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_from_post() {
        $dept_array = array();
        $dept_array['daman_department_id'] = get_from_post('daman_department_id_for_service');
        $dept_array['diu_department_id'] = get_from_post('diu_department_id_for_service');
        $dept_array['dnh_department_id'] = get_from_post('dnh_department_id_for_service');
        $dept_array['service_name'] = get_from_post('service_name_for_service');
        $dept_array['service_type'] = get_from_post('service_type_for_service');
        $dept_array['timeline'] = get_from_post('timeline_for_service');
        $dept_array['competent_authority'] = get_from_post('competent_authority_for_service');
        $dept_array['first_aagr'] = get_from_post('first_aagr_for_service');
        $dept_array['second_aagr'] = get_from_post('second_aagr_for_service');
        $dept_array['apply_url'] = get_from_post('apply_url_for_service');
        $dept_array['fees_details'] = get_from_post('fees_details_for_service');
        $dept_array['document_checklist'] = get_from_post('document_checklist_for_service');
        $dept_array['procedure'] = get_from_post('procedure_for_service');
        return $dept_array;
    }

    function _check_validation($dept_array) {
        if (!$dept_array['daman_department_id'] && !$dept_array['diu_department_id'] && !$dept_array['dnh_department_id']) {
            return SELECT_DEPARTMENT_MESSAGE;
        }
        if (!$dept_array['service_name']) {
            return SERVICE_NAME_MESSAGE;
        }
        if (!$dept_array['service_type']) {
            return ONE_OPTION_MESSAGE;
        }
        if (!$dept_array['timeline']) {
            return ENTER_TIMELINE_MESSAGE;
        }
        return '';
    }

    function submit_service() {
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
            $service_id = get_from_post('service_id_for_service');
            $service_data = $this->_get_from_post();
            $validation_message = $this->_check_validation($service_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $questionary_items = $this->input->post('questionary_items');
            $service_data['daman_district'] = $service_data['daman_department_id'] != VALUE_ZERO ? TALUKA_DAMAN : VALUE_ZERO;
            $service_data['diu_district'] = $service_data['diu_department_id'] != VALUE_ZERO ? TALUKA_DIU : VALUE_ZERO;
            $service_data['dnh_district'] = $service_data['dnh_department_id'] != VALUE_ZERO ? TALUKA_DNH : VALUE_ZERO;
            $this->db->trans_start();
            if (!$service_id || $service_id == NULL) {
                $service_data['created_by'] = $user_id;
                $service_data['created_time'] = date('Y-m-d H:i:s');
                $service_id = $this->utility_model->insert_data('service', $service_data);
            } else {
                $service_data['updated_by'] = $user_id;
                $service_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('service_id', $service_id, 'service', $service_data);

                $update_data = array();
                $update_data['is_delete'] = IS_DELETE;
                $update_data['updated_by'] = $user_id;
                $update_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('service_id', $service_id, 'questionary', $update_data);
            }
            if (!empty($questionary_items)) {
                foreach ($questionary_items as &$qi) {
                    $qi['service_id'] = $service_id;
                    $qi['created_by'] = $user_id;
                    $qi['created_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->insert_data_batch('questionary', $questionary_items);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = SERVICE_SUBMITTED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/Service.php
 */