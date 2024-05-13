<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Utility extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('utility_model');
    }

    function generate_new_token() {
        if (!is_post()) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        echo json_encode(get_success_array());
    }

    function get_common_data() {
        $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
        $success_array = array();
        $success_array['success'] = true;
        $success_array['village_data'] = array();
        $success_array['plot_data'] = array();
        $success_array['department_data'] = array();
        $success_array['state_data'] = array();
        if ($session_user_id == NULL || !$session_user_id) {
            echo json_encode($success_array);
            return false;
        }
        $this->load->model('utility_model');
        $this->db->trans_start();
        $success_array['village_data'] = $this->utility_model->get_result_data('villages');
        $temp_plot_data = $this->utility_model->get_plot_result_data('plot_numbers');
        $plot_data = array();
        foreach ($temp_plot_data as $data) {
            if (!isset($plot_data[$data['village_id']])) {
                $plot_data[$data['village_id']] = array();
            }
            if (!isset($plot_data[$data['village_id']][$data['plot_id']])) {
                $plot_data[$data['village_id']][$data['plot_id']] = $data;
            }
        }
        $success_array['plot_data'] = $plot_data;
        $success_array['department_data'] = $this->utility_lib->get_department_data_by_district();
        $success_array['state_data'] = $this->utility_model->get_result_data('state');
        $temp_district_data = $this->utility_model->get_result_data('district');
        $district_data = array();
        foreach ($temp_district_data as $data) {
            if (!isset($district_data[$data['state_code']])) {
                $district_data[$data['state_code']] = array();
            }
            array_push($district_data[$data['state_code']], $data);
        }
        $success_array['district_data'] = $district_data;
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            echo json_encode($success_array);
            return;
        }
        echo json_encode($success_array);
    }

    function get_query_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
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
            $module_type_array = $this->config->item('query_module_array');
            if (!isset($module_type_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_access_data = $module_type_array[$module_type];
            if (empty($temp_access_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = get_from_post('module_id');
            if (!$module_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            if ($module_type == VALUE_FIFTYTWO) {
                $this->load->model('ips_model');
                $module_data = $this->ips_model->get_incentive_details_by_id($module_id);
            } else {
                $module_data = $this->utility_model->get_by_id($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($module_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_query_data = $this->utility_model->query_data_by_type_id($module_type, $module_id);
            $query_data = array();
            foreach ($temp_query_data as $qd_data) {
                if (!isset($query_data[$qd_data['query_id']])) {
                    $query_data[$qd_data['query_id']] = array();
                    $query_data[$qd_data['query_id']]['query_id'] = $qd_data['query_id'];
                    $query_data[$qd_data['query_id']]['module_type'] = $qd_data['module_type'];
                    $query_data[$qd_data['query_id']]['module_id'] = $qd_data['module_id'];
                    $query_data[$qd_data['query_id']]['query_type'] = $qd_data['query_type'];
                    $query_data[$qd_data['query_id']]['user_id'] = $qd_data['user_id'];
                    $query_data[$qd_data['query_id']]['remarks'] = $qd_data['remarks'];
                    $query_data[$qd_data['query_id']]['display_datetime'] = $qd_data['display_datetime'];
                    $query_data[$qd_data['query_id']]['status'] = $qd_data['status'];
                    $query_data[$qd_data['query_id']]['query_documents'] = array();
                }
                if ($qd_data['query_document_id']) {
                    $tmp_doc = array();
                    $tmp_doc['query_document_id'] = $qd_data['query_document_id'];
                    $tmp_doc['doc_name'] = $qd_data['doc_name'];
                    $tmp_doc['document'] = $qd_data['document'];
                    array_push($query_data[$qd_data['query_id']]['query_documents'], $tmp_doc);
                }
            }
            $success_array = get_success_array();
            $success_array['module_data'] = $module_data;
            $success_array['query_data'] = $query_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function raise_a_query() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type_for_query');
            if ($module_type != VALUE_ONE && $module_type != VALUE_TWO && $module_type != VALUE_THREE && $module_type != VALUE_FOUR &&
                    $module_type != VALUE_FIVE && $module_type != VALUE_SIX && $module_type != VALUE_SEVEN && $module_type != VALUE_EIGHT && $module_type != VALUE_NINE && $module_type != VALUE_TEN && $module_type != VALUE_ELEVEN && $module_type != VALUE_TWELVE && $module_type != VALUE_THIRTEEN && $module_type != VALUE_FOURTEEN && $module_type != VALUE_FIFTEEN && $module_type != VALUE_SIXTEEN && $module_type != VALUE_SEVENTEEN && $module_type != VALUE_EIGHTEEN &&
                    $module_type != VALUE_NINETEEN && $module_type != VALUE_TWENTY && $module_type != VALUE_TWENTYONE && $module_type != VALUE_TWENTYTWO && $module_type != VALUE_TWENTYTHREE &&
                    $module_type != VALUE_TWENTYFOUR && $module_type != VALUE_TWENTYFIVE && $module_type != VALUE_TWENTYSIX && $module_type != VALUE_TWENTYSEVEN && $module_type != VALUE_TWENTYEIGHT && $module_type != VALUE_TWENTYNINE && $module_type != VALUE_THIRTY && $module_type != VALUE_THIRTYONE && $module_type != VALUE_THIRTYTWO &&
                    $module_type != VALUE_THIRTYTHREE && $module_type != VALUE_THIRTYFOUR && $module_type != VALUE_THIRTYFIVE && $module_type != VALUE_THIRTYSIX && $module_type != VALUE_THIRTYSEVEN && $module_type != VALUE_THIRTYEIGHT && $module_type != VALUE_THIRTYNINE && $module_type != VALUE_FOURTY && $module_type != VALUE_FOURTYONE && $module_type != VALUE_FOURTYTWO && $module_type != VALUE_FOURTYTHREE && $module_type != VALUE_FOURTYFOUR && $module_type != VALUE_FOURTYFIVE && $module_type != VALUE_FOURTYSIX &&
                    $module_type != VALUE_FOURTYEIGHT && $module_type != VALUE_FOURTYNINE && $module_type != VALUE_FIFTY && $module_type != VALUE_FIFTYTWO && $module_type != VALUE_FIFTYNINE && $module_type != VALUE_SIXTY && $module_type != VALUE_SIXTYONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type_array = $this->config->item('query_module_array');
            if (!isset($module_type_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_access_data = $module_type_array[$module_type];
            if (empty($temp_access_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = get_from_post('module_id_for_query');
            if (!$module_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_type = get_from_post('query_type_for_query');
            if ($query_type != VALUE_ONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $remarks = get_from_post('remarks_for_query');
            if (!$remarks) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_id = get_from_post('query_id_for_query');
            $this->db->trans_start();
            $insert_data = array();
            $insert_data['remarks'] = $remarks;
            $insert_data['status'] = VALUE_ONE;
            if (!$query_id || $query_id == NULL) {
                $insert_data['module_type'] = $module_type;
                $insert_data['module_id'] = $module_id;
                $insert_data['query_type'] = $query_type;
                $insert_data['user_id'] = $session_user_id;
                $insert_data['created_by'] = $session_user_id;
                $insert_data['created_time'] = date('Y-m-d H:i:s');
                $insert_data['query_datetime'] = $insert_data['created_time'];
                $insert_data['query_id'] = $this->utility_model->insert_data('query', $insert_data);
            } else {
                $insert_data['updated_by'] = $session_user_id;
                $insert_data['updated_time'] = date('Y-m-d H:i:s');
                $insert_data['query_datetime'] = $insert_data['updated_time'];
                $this->utility_model->update_data('query_id', $query_id, 'query', $insert_data);
                $insert_data['query_id'] = $query_id;
            }

            $this->_update_qd_items($session_user_id, $query_id);

            $update_data = array();
            $update_data['query_status'] = VALUE_ONE;
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text'], $update_data);

            $qd_data = $this->utility_model->get_result_data_by_id('query_id', $query_id, 'query_document');

            $ex_data = $this->utility_model->get_user_data_for_query_management($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);

            $query_movements = '';
            $qm_data = $this->utility_model->get_result_data_by_ids('module_id', $module_id, 'query', 'module_type', $module_type, 'status', VALUE_ONE, 'query_id', 'ASC');
            if (!empty($qm_data)) {
                foreach ($qm_data as $qm) {
                    $query_movements .= $this->utility_lib->get_qm($qm);
                }
            }

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $prefix_module_array = $this->config->item('prefix_module_array');
            $registration_message = 'Query Raised for your Application Number : ' . generate_registration_number($prefix_module_array[$module_type], $module_id);
            $this->load->helper('sms_helper');
            send_SMS($this, $session_user_id, $ex_data['mobile_number'], $registration_message, VALUE_FIVE);
            $this->load->library('email_lib');
            $this->email_lib->send_email($ex_data, 'Query Raised', $registration_message, VALUE_FIVE);

            $success_array = get_success_array();
            $success_array['message'] = QUERY_RAISED_MESSAGE;
            $success_array['query_status'] = VALUE_ONE;
            $success_array['query_datetime'] = convert_to_new_datetime_format($insert_data['query_datetime']);
            $success_array['query_document_data'] = $qd_data;
            $success_array['query_movement_string'] = $query_movements;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _update_qd_items($user_id, $query_id) {
        $exi_qd_items = $this->input->post('exi_qd_items');
        if ($exi_qd_items != '') {
            if (!empty($exi_qd_items)) {
                foreach ($exi_qd_items as &$value) {
                    $value['query_id'] = $query_id;
                    $value['updated_by'] = $user_id;
                    $value['updated_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->update_data_batch('query_document_id', 'query_document', $exi_qd_items);
            }
        }
        $new_qd_items = $this->input->post('new_qd_items');
        if ($new_qd_items != '') {
            if (!empty($new_qd_items)) {
                foreach ($new_qd_items as &$value) {
                    $value['query_id'] = $query_id;
                    $value['created_by'] = $user_id;
                    $value['created_time'] = date('Y-m-d H:i:s');
                }
                $this->utility_model->insert_data_batch('query_document', $new_qd_items);
            }
        }
    }

    function resolved_query() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            if ($module_type != VALUE_ONE && $module_type != VALUE_TWO && $module_type != VALUE_THREE && $module_type != VALUE_FOUR &&
                    $module_type != VALUE_FIVE && $module_type != VALUE_SIX && $module_type != VALUE_SEVEN && $module_type != VALUE_EIGHT && $module_type != VALUE_NINE && $module_type != VALUE_TEN && $module_type != VALUE_ELEVEN && $module_type != VALUE_TWELVE && $module_type != VALUE_THIRTEEN && $module_type != VALUE_FOURTEEN && $module_type != VALUE_FIFTEEN && $module_type != VALUE_SIXTEEN && $module_type != VALUE_SEVENTEEN && $module_type != VALUE_EIGHTEEN &&
                    $module_type != VALUE_NINETEEN && $module_type != VALUE_TWENTY && $module_type != VALUE_TWENTYONE && $module_type != VALUE_TWENTYTWO && $module_type != VALUE_TWENTYTHREE &&
                    $module_type != VALUE_TWENTYFOUR && $module_type != VALUE_TWENTYFIVE && $module_type != VALUE_TWENTYSIX && $module_type != VALUE_TWENTYSEVEN && $module_type != VALUE_TWENTYEIGHT && $module_type != VALUE_TWENTYNINE && $module_type != VALUE_THIRTY && $module_type != VALUE_THIRTYONE && $module_type != VALUE_THIRTYTWO &&
                    $module_type != VALUE_THIRTYTHREE && $module_type != VALUE_THIRTYFOUR && $module_type != VALUE_THIRTYFIVE && $module_type != VALUE_THIRTYSIX && $module_type != VALUE_THIRTYSEVEN && $module_type != VALUE_THIRTYEIGHT && $module_type != VALUE_THIRTYNINE && $module_type != VALUE_FOURTY && $module_type != VALUE_FOURTYONE && $module_type != VALUE_FOURTYTWO && $module_type != VALUE_FOURTYTHREE && $module_type != VALUE_FOURTYFOUR && $module_type != VALUE_FOURTYFIVE && $module_type != VALUE_FOURTYSIX &&
                    $module_type != VALUE_FOURTYEIGHT && $module_type != VALUE_FOURTYNINE && $module_type != VALUE_FIFTY && $module_type != VALUE_FIFTYTWO && $module_type != VALUE_FIFTYNINE && $module_type != VALUE_SIXTY && $module_type != VALUE_SIXTYONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type_array = $this->config->item('query_module_array');
            if (!isset($module_type_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_access_data = $module_type_array[$module_type];
            if (empty($temp_access_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = get_from_post('module_id');
            if (!$module_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $update_data = array();
            $update_data['query_status'] = VALUE_THREE;
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text'], $update_data);
            $ex_module_data = $this->utility_model->get_by_id($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);

            $ex_data = $this->utility_model->get_user_data_for_query_management($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);
            $prefix_module_array = $this->config->item('prefix_module_array');
            $registration_message = 'Query has been Resolved for your Application Number : ' . generate_registration_number($prefix_module_array[$module_type], $module_id);
            $this->load->helper('sms_helper');
            send_SMS($this, $session_user_id, $ex_data['mobile_number'], $registration_message, VALUE_NINE);
            $this->load->library('email_lib');
            $this->email_lib->send_email($ex_data, 'Query Resolved', $registration_message, VALUE_NINE);

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = QUERY_RESOLVED_MESSAGE;
            $success_array['query_status'] = VALUE_THREE;
            $success_array['status'] = $ex_module_data['status'];
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function confirm_payment() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            if ($module_type != VALUE_ONE && $module_type != VALUE_TWO && $module_type != VALUE_THREE && $module_type != VALUE_FOUR &&
                    $module_type != VALUE_FIVE && $module_type != VALUE_SIX && $module_type != VALUE_SEVEN && $module_type != VALUE_EIGHT && $module_type != VALUE_NINE && $module_type != VALUE_TEN && $module_type != VALUE_ELEVEN && $module_type != VALUE_TWELVE && $module_type != VALUE_THIRTEEN && $module_type != VALUE_FOURTEEN && $module_type != VALUE_FIFTEEN && $module_type != VALUE_SIXTEEN && $module_type != VALUE_SEVENTEEN && $module_type != VALUE_EIGHTEEN &&
                    $module_type != VALUE_NINETEEN && $module_type != VALUE_TWENTY && $module_type != VALUE_TWENTYONE && $module_type != VALUE_TWENTYTWO && $module_type != VALUE_TWENTYTHREE &&
                    $module_type != VALUE_TWENTYFOUR && $module_type != VALUE_TWENTYFIVE && $module_type != VALUE_TWENTYSIX && $module_type != VALUE_TWENTYSEVEN && $module_type != VALUE_TWENTYEIGHT && $module_type != VALUE_TWENTYNINE && $module_type != VALUE_THIRTY && $module_type != VALUE_THIRTYONE && $module_type != VALUE_THIRTYTWO &&
                    $module_type != VALUE_THIRTYTHREE && $module_type != VALUE_THIRTYFOUR && $module_type != VALUE_THIRTYFIVE && $module_type != VALUE_THIRTYSIX && $module_type != VALUE_THIRTYSEVEN && $module_type != VALUE_THIRTYEIGHT && $module_type != VALUE_THIRTYNINE && $module_type != VALUE_FOURTY && $module_type != VALUE_FOURTYONE && $module_type != VALUE_FOURTYTWO && $module_type != VALUE_FOURTYTHREE && $module_type != VALUE_FOURTYFOUR && $module_type != VALUE_FOURTYFIVE && $module_type != VALUE_FOURTYSIX &&
                    $module_type != VALUE_FOURTYEIGHT && $module_type != VALUE_FOURTYNINE && $module_type != VALUE_FIFTY && $module_type != VALUE_FIFTYTWO && $module_type != VALUE_FIFTYNINE && $module_type != VALUE_SIXTY && $module_type != VALUE_SIXTYONE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type_array = $this->config->item('query_module_array');
            if (!isset($module_type_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_access_data = $module_type_array[$module_type];
            if (empty($temp_access_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = get_from_post('module_id');
            if (!$module_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            if ($module_type == VALUE_FIFTYTWO) {
                $this->load->model('ips_model');
                $ex_module_data = $this->ips_model->get_incentive_details_by_id($module_id);
            } else {
                $ex_module_data = $this->utility_model->get_by_id($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);
            }
            if (empty($ex_module_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            if ($module_type == VALUE_FOURTYONE || $module_type == VALUE_THIRTYFIVE || $module_type == VALUE_FOURTYFOUR || $module_type == VALUE_THIRTYSEVEN) {
                if ($ex_module_data['status'] == VALUE_TWO || $ex_module_data['status'] == VALUE_THREE || $ex_module_data['status'] == VALUE_FOUR ||
                        $ex_module_data['status'] == VALUE_EIGHT || $ex_module_data['status'] == VALUE_NINE) {
                    
                } else {
                    echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                    return;
                }
            } else {
                if ($ex_module_data['status'] == VALUE_FOUR || $ex_module_data['status'] == VALUE_EIGHT || $ex_module_data['status'] == VALUE_NINE) {
                    
                } else {
                    echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                    return;
                }
            }
            //        if ($ex_module_data['status'] == VALUE_FOUR || $ex_module_data['status'] == VALUE_EIGHT) {
            //            
            //        } else {
            //            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            //            return;
            //        }
            $update_data = array();
            $update_data['status'] = VALUE_SEVEN;
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text'], $update_data);

            $ex_data = $this->utility_model->get_user_data_for_query_management($temp_access_data['key_id_text'], $module_id, $temp_access_data['tbl_text']);
            $prefix_module_array = $this->config->item('prefix_module_array');
            $registration_message = 'Payment Confirmed for your Application Number : ' . generate_registration_number($prefix_module_array[$module_type], $module_id);
            $this->load->helper('sms_helper');
            send_SMS($this, $session_user_id, $ex_data['mobile_number'], $registration_message, VALUE_TEN);
            $this->load->library('email_lib');
            $this->email_lib->send_email($ex_data, 'Payment Confirmed', $registration_message, VALUE_TEN);

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = PAYMENT_CONFIRMED_MESSAGE;
            $success_array['status'] = $update_data['status'];
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_district_wise_department_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $department_data = $this->utility_lib->get_department_data_by_district();
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

    function upload_query_document() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $query_id = get_from_post('query_id_for_query');
            $query_document_id = get_from_post('query_document_id_for_query');
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type_for_query');
            if ($module_type != VALUE_ONE && $module_type != VALUE_TWO && $module_type != VALUE_THREE && $module_type != VALUE_FOUR &&
                    $module_type != VALUE_FIVE && $module_type != VALUE_SIX && $module_type != VALUE_SEVEN && $module_type != VALUE_EIGHT && $module_type != VALUE_NINE && $module_type != VALUE_TEN && $module_type != VALUE_ELEVEN && $module_type != VALUE_TWELVE && $module_type != VALUE_THIRTEEN && $module_type != VALUE_FOURTEEN && $module_type != VALUE_FIFTEEN && $module_type != VALUE_SIXTEEN && $module_type != VALUE_SEVENTEEN && $module_type != VALUE_EIGHTEEN &&
                    $module_type != VALUE_NINETEEN && $module_type != VALUE_TWENTY && $module_type != VALUE_TWENTYONE && $module_type != VALUE_TWENTYTWO && $module_type != VALUE_TWENTYTHREE && $module_type != VALUE_TWENTYFOUR && $module_type != VALUE_TWENTYFIVE && $module_type != VALUE_TWENTYSIX && $module_type != VALUE_TWENTYSEVEN && $module_type != VALUE_TWENTYEIGHT && $module_type != VALUE_TWENTYNINE && $module_type != VALUE_THIRTY && $module_type != VALUE_THIRTYONE && $module_type != VALUE_THIRTYTWO &&
                    $module_type != VALUE_THIRTYTHREE && $module_type != VALUE_THIRTYFOUR && $module_type != VALUE_THIRTYFIVE && $module_type != VALUE_THIRTYSIX && $module_type != VALUE_THIRTYSEVEN && $module_type != VALUE_THIRTYEIGHT && $module_type != VALUE_THIRTYNINE && $module_type != VALUE_FOURTY && $module_type != VALUE_FOURTYONE && $module_type != VALUE_FOURTYTWO && $module_type != VALUE_FOURTYTHREE && $module_type != VALUE_FOURTYFOUR && $module_type != VALUE_FOURTYFIVE && $module_type != VALUE_FOURTYSIX &&
                    $module_type != VALUE_FOURTYEIGHT && $module_type != VALUE_FOURTYNINE && $module_type != VALUE_FIFTY && $module_type != VALUE_FIFTYTWO && $module_type != VALUE_FIFTYNINE && $module_type != VALUE_SIXTY && $module_type != VALUE_SIXTYONE) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type_array = $this->config->item('query_module_array');
            if (!isset($module_type_array[$module_type])) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $temp_access_data = $module_type_array[$module_type];
            if (empty($temp_access_data)) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_id = get_from_post('module_id_for_query');
            if (!$module_id) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_type = get_from_post('query_type_for_query');
            if ($query_type != VALUE_ONE && $query_type != VALUE_TWO) {
                echo json_encode(array('success' => FALSE, 'message' => INVALID_ACCESS_MESSAGE));
                return false;
            }

            if ($_FILES['document_for_query']['name'] == '') {
                echo json_encode(array('success' => FALSE, 'message' => UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['document_for_query']['size'];
            if ($evidence_size == 0) {
                echo json_encode(array('success' => FALSE, 'message' => DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $maxsize = '20971520';
            if ($evidence_size >= $maxsize) {
                echo json_encode(array('success' => FALSE, 'message' => UPLOAD_MAX_ONE_MB_MESSAGE));
                return;
            }
            $path = 'documents';
            if (!is_dir($path)) {
                mkdir($path);
                chmod("$path", 0755);
            }
            $main_path = $path . DIRECTORY_SEPARATOR . 'query';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $this->load->library('upload');
            $temp_qd_filename = str_replace('_', '', $_FILES['document_for_query']['name']);
            $qd_filename = 'query_doc_' . (rand(10000, 99999)) . time() . '.' . pathinfo($temp_qd_filename, PATHINFO_EXTENSION);
            //Change file name
            $qd_final_path = $main_path . DIRECTORY_SEPARATOR . $qd_filename;
            if (!move_uploaded_file($_FILES['document_for_query']['tmp_name'], $qd_final_path)) {
                echo json_encode(array('success' => FALSE, 'message' => DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $this->db->trans_start();
            $qdata = array();
            if (!$query_id || $query_id == NULL) {
                $qdata['module_type'] = $module_type;
                $qdata['module_id'] = $module_id;
                $qdata['query_type'] = $query_type;
                $qdata['user_id'] = $session_user_id;
                $qdata['created_by'] = $session_user_id;
                $qdata['created_time'] = date('Y-m-d H:i:s');
                $query_id = $this->utility_model->insert_data('query', $qdata);
            }

            $qd_data = array();
            $qd_data['document'] = $qd_filename;
            if (!$query_document_id || $query_document_id == NULL) {
                $qd_data['query_id'] = $query_id;
                $qd_data['created_by'] = $session_user_id;
                $qd_data['created_time'] = date('Y-m-d H:i:s');
                $query_document_id = $this->utility_model->insert_data('query_document', $qd_data);
            } else {
                $qd_data['updated_by'] = $session_user_id;
                $qd_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('query_document_id', $query_document_id, 'query_document', $qd_data);
            }

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(array('success' => FALSE, 'message' => DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = array();
            $success_array['query_id'] = $query_id;
            $success_array['query_document_id'] = $query_document_id;
            $success_array['document_name'] = $qd_filename;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function remove_query_document_item() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $query_document_id = get_from_post('query_document_id');
            if ($session_user_id == NULL || !$session_user_id || !$query_document_id || $query_document_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('query_document_id', $query_document_id, 'query_document');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            if ($ex_data['document'] != '') {
                $file_path = 'documents' . DIRECTORY_SEPARATOR . 'query' . DIRECTORY_SEPARATOR . $ex_data['document'];
                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }
            $update_data = array();
            $update_data['is_delete'] = IS_DELETE;
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('query_document_id', $query_document_id, 'query_document', $update_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = QUERY_DOCUMENT_ITEM_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_all_payment_history() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['payment_history'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $columns = $this->input->post('columns');
            $assing_modules = array();
            $search_dept = '';
            if (is_admin() || is_view_all_district_user()) {
                $search_district = trim($columns[1]['search']['value']);
                $search_dept = trim($columns[2]['search']['value']);
            } else {
                $search_district = $session_district;
                $search_dept = get_from_session('temp_type_for_eodbsws_admin');
            }
            $search_prn = trim($columns[7]['search']['value']);
            $search_ps = trim($columns[8]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');

            $dept_module_array = $this->config->item('dept_module_array');
            if ($search_dept != '') {
                $t_array = array(VALUE_HUNDRED);
                $ta_modules = isset($dept_module_array[$search_dept]) ? $dept_module_array[$search_dept] : $t_array;
                $assing_modules = empty($ta_modules) ? $t_array : $ta_modules;
            }

            $this->load->model('payment_model');
            $this->db->trans_start();
            $success_array['payment_history'] = $this->payment_model->get_all_payment_history($start, $length, $search_district, $assing_modules, $search_ps, $search_prn);
            $success_array['recordsTotal'] = $this->payment_model->get_total_count_of_records($search_district, $assing_modules);
            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || !empty($assing_modules) || $search_ps != '' || $search_prn != '') {
                $success_array['recordsFiltered'] = $this->payment_model->get_filter_count_of_records($search_district, $assing_modules, $search_ps, $search_prn);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode($success_array);
                return false;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['payment_history'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            echo json_encode($success_array);
        }
    }

    function get_oph_data_by_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $fees_payment_id = get_from_post('fees_payment_id');
            if ($session_user_id == NULL || !$session_user_id || !$fees_payment_id || $fees_payment_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->load->model('payment_model');
            $this->db->trans_start();
            $fp_data = $this->utility_model->get_by_id('fees_payment_id', $fees_payment_id, 'fees_payment');
            if (empty($fp_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $dv_data = $this->payment_model->get_dv_details($fees_payment_id);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['fp_data'] = $fp_data;
            $success_array['dv_data'] = $dv_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_head_wise_report_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $t_from_date = get_from_post('from_date_for_hwr');
            $t_to_date = get_from_post('to_date_for_hwr');
            if (!$t_from_date && !$t_to_date) {
                echo json_encode(get_error_array(FROM_TO_DATE_MESSAGE));
                return false;
            }
            $from_date = $t_from_date ? convert_to_mysql_date_format($t_from_date) : '';
            $to_date = $t_to_date ? convert_to_mysql_date_format($t_to_date) : '';

            $assing_modules = array();
            $search_district = '';
            $search_dept = '';
            if (!is_admin() && !is_view_all_district_user()) {
                $search_district = get_from_session('temp_district_for_eodbsws_admin');
                $search_dept = get_from_session('temp_type_for_eodbsws_admin');
            }
            $dept_module_array = $this->config->item('dept_module_array');
            if ($search_dept != '') {
                $t_array = array(VALUE_HUNDRED);
                $ta_modules = isset($dept_module_array[$search_dept]) ? $dept_module_array[$search_dept] : $t_array;
                $assing_modules = empty($ta_modules) ? $t_array : $ta_modules;
            }
            $this->load->model('payment_model');
            $this->db->trans_start();
            $t_hwr_details = $this->payment_model->get_hwr_details($search_district, $assing_modules, $from_date, $to_date);
            $dept_fd = generate_array_for_id_object($this->utility_model->get_result_data_or_ids('module_type', $assing_modules, 'dept_fd'), 'dept_fd_id');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return false;
            }
            $mt_array = $this->config->item('query_module_array');
            $district_array = $this->config->item('taluka_array');
            $hwr_array = array();
            foreach ($t_hwr_details as $value) {
                if (!isset($hwr_array[$value['module_type']])) {
                    $hwr_array[$value['module_type']] = array();
                    $hwr_array[$value['module_type']]['module_type'] = $value['module_type'];
                    $hwr_array[$value['module_type']]['department_name'] = isset($mt_array[$value['module_type']]['department_name']) ? $mt_array[$value['module_type']]['department_name'] : '';
                    $hwr_array[$value['module_type']]['service_name'] = isset($mt_array[$value['module_type']]['title']) ? $mt_array[$value['module_type']]['title'] : '';
                    $hwr_array[$value['module_type']]['fp_total'] = VALUE_ZERO;
                    $hwr_array[$value['module_type']]['fb_total'] = VALUE_ZERO;
                    $hwr_array[$value['module_type']]['dwise'] = array();
                }
                if (!isset($hwr_array[$value['module_type']]['dwise'][$value['district']])) {
                    $hwr_array[$value['module_type']]['dwise'][$value['district']]['district'] = $value['district'];
                    $hwr_array[$value['module_type']]['dwise'][$value['district']]['district_name'] = $district_array[$value['district']] ? $district_array[$value['district']] : '';
                    $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'] = array();
                    $hwr_array[$value['module_type']]['fp_total'] += $value['fp_total_fees'];
                }

                if (isset($dept_fd[$value['dept_fd_id']])) {
                    $t_fd = $dept_fd[$value['dept_fd_id']];
                    $td_name = $value['district'] == TALUKA_DAMAN ? 'daman_' : ($value['district'] == TALUKA_DIU ? 'diu_' : ($value['district'] == TALUKA_DNH ? 'dnh_' : ''));
                    if ($td_name != '') {
                        $full_head = $t_fd[$td_name . 'full_head'];
                        if (!isset($hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head])) {
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head] = array();
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['dept_fd_id'] = $value['dept_fd_id'];
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['hw_total_fees'] = VALUE_ZERO;
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['pao_code'] = isset($t_fd[$td_name . 'pao_code']) ? $t_fd[$td_name . 'pao_code'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['ddo_code'] = isset($t_fd[$td_name . 'ddo_code']) ? $t_fd[$td_name . 'ddo_code'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['grant_number'] = isset($t_fd[$td_name . 'grant_number']) ? $t_fd[$td_name . 'grant_number'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['major_head'] = isset($t_fd[$td_name . 'major_head']) ? $t_fd[$td_name . 'major_head'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['sub_major_head'] = isset($t_fd[$td_name . 'sub_major_head']) ? $t_fd[$td_name . 'sub_major_head'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['minor_head'] = isset($t_fd[$td_name . 'minor_head']) ? $t_fd[$td_name . 'minor_head'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['sub_head'] = isset($t_fd[$td_name . 'sub_head']) ? $t_fd[$td_name . 'sub_head'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['detailed_head'] = isset($t_fd[$td_name . 'detailed_head']) ? $t_fd[$td_name . 'detailed_head'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['object'] = isset($t_fd[$td_name . 'object']) ? $t_fd[$td_name . 'object'] : '';
                            $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['category'] = isset($t_fd[$td_name . 'category']) ? $t_fd[$td_name . 'category'] : '';
                        }
                        $hwr_array[$value['module_type']]['dwise'][$value['district']]['head_wise'][$full_head]['hw_total_fees'] += $value['fb_total_fees'];
                    }
                }
            }
            $success_array = get_success_array();
            $success_array['hwr_data'] = $hwr_array;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_module_district_hwr_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $module_type = get_from_post('module_type');
            $mt_array = $this->config->item('query_module_array');
            if (!isset($mt_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $district = get_from_post('district');
            if ($district != VALUE_ONE && $district != VALUE_TWO && $district != VALUE_THREE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $full_head = get_from_post('full_head');
            if (!$full_head) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $t_from_date = get_from_post('from_date');
            $t_to_date = get_from_post('to_date');
            if (!$t_from_date && !$t_to_date) {
                echo json_encode(get_error_array(FROM_TO_DATE_MESSAGE));
                return false;
            }
            $from_date = $t_from_date ? convert_to_mysql_date_format($t_from_date) : '';
            $to_date = $t_to_date ? convert_to_mysql_date_format($t_to_date) : '';
            $search_district = '';
            $search_dept = '';
            if (is_admin() || is_view_all_district_user()) {
                $search_district = $district;
            } else {
                $search_district = get_from_session('temp_district_for_eodbsws_admin');
                $search_dept = get_from_session('temp_type_for_eodbsws_admin');
            }
            $this->load->model('payment_model');
            $this->db->trans_start();
            $md_hwr_data = $this->payment_model->get_md_hwr_details($module_type, $search_district, $full_head, $from_date, $to_date);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['md_hwr_data'] = $md_hwr_data;
            $success_array['mt_data'] = $mt_array[$module_type];
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_basic_details_for_feedback_rating() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $module_type = get_from_post('module_type');
            $module_id = get_from_post('module_id');
            if (!is_post() || $session_user_id == null || !$session_user_id || !$module_type || $module_type == NULL ||
                    !$module_id || $module_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_module_array = $this->config->item('query_module_array');
            if (!isset($query_module_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $qm_data = $query_module_array[$module_type];
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_details_for_feedback_rating($qm_data, $module_id);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['fr_data'] = $ex_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function get_basic_details_for_withdraw_application() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $module_type = get_from_post('module_type');
            $module_id = get_from_post('module_id');
            if (!is_post() || $session_user_id == null || !$session_user_id || !$module_type || $module_type == NULL ||
                    !$module_id || $module_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_module_array = $this->config->item('query_module_array');
            if (!isset($query_module_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $qm_data = $query_module_array[$module_type];
            $this->db->trans_start();
            if ($module_type == VALUE_FIFTYTWO) {
                $ex_data = $this->utility_model->get_details_for_ips_incentives_withdraw_application($qm_data, $module_id);
            } else {
                $ex_data = $this->utility_model->get_details_for_withdraw_application($qm_data, $module_id);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            if ($ex_data['status'] == VALUE_ELEVEN) {
                echo json_encode(get_error_array(ALREADY_WITHDRAW_APPLICATION_MESSAGE));
                return;
            }
            if ($ex_data['status'] != VALUE_TWO && $ex_data['status'] != VALUE_THREE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['wa_data'] = $ex_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function update_details_for_withdraw_application() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            if (!is_authenticated()) {
                echo json_encode(get_logout_array());
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $module_type = get_from_post('module_type_for_withdraw_application');
            $module_id = get_from_post('module_id_for_withdraw_application');
            if (!is_post() || $session_user_id == null || !$session_user_id || !$module_type || $module_type == NULL ||
                    !$module_id || $module_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $query_module_array = $this->config->item('query_module_array');
            if (!isset($query_module_array[$module_type])) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $qm_data = $query_module_array[$module_type];
            $update_data = array();
            $update_data['withdrawal_remarks'] = get_from_post('remarks_for_withdraw_application');
            if (!$update_data['withdrawal_remarks']) {
                echo json_encode(get_error_array(REMARKS_MESSAGE));
                return false;
            }
            $ex_data = $this->utility_model->get_by_id($qm_data['key_id_text'], $module_id, $qm_data['tbl_text']);
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($ex_data['status'] == VALUE_ELEVEN) {
                echo json_encode(get_error_array(ALREADY_WITHDRAW_APPLICATION_MESSAGE));
                return;
            }
            if ($ex_data['status'] != VALUE_TWO && $ex_data['status'] != VALUE_THREE) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            if ($ex_data['submitted_datetime'] != '0000-00-00 00:00:00') {
                $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_THIRTYTHREE, $ex_data['submitted_datetime']);
            }
            if ($ex_data['query_status'] == VALUE_ONE || $ex_data['query_status'] == VALUE_TWO) {
                $update_data['query_status'] = VALUE_THREE;
            }
            $this->db->trans_start();
            $update_data['status'] = VALUE_ELEVEN;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data($qm_data['key_id_text'], $module_id, $qm_data['tbl_text'], $update_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = WITHDRAW_APPLICATION_MESSAGE;
            $success_array['wa_data'] = $update_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }
}

/*
     * EOF: ./application/controller/Utility.php
     */    