<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Ismw extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('ismw_model');
    }

    function get_ismw_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['ismw_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $columns = $this->input->post('columns');
            $search_district = '';
            if (is_admin() || is_view_all_district_user()) {
                $search_district = trim($columns[2]['search']['value']);
                $search_applicant_name = trim($columns[3]['search']['value']);
                $search_mob = trim($columns[4]['search']['value']);
                $search_status = trim($columns[6]['search']['value']);
            } else {
                $search_district = $session_district;
                $search_applicant_name = trim($columns[2]['search']['value']);
                $search_mob = trim($columns[3]['search']['value']);
                $search_status = trim($columns[5]['search']['value']);
            }
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['ismw_data'] = $this->ismw_model->get_all_ismw_list($start, $length, $search_district, $search_applicant_name, $search_mob, $search_status);
            $success_array['recordsTotal'] = $this->ismw_model->get_total_count_of_records($search_district, $search_mob, $search_status);
            if (($search_district != '' && is_admin()) || $search_applicant_name != '' || $search_mob != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->ismw_model->get_filter_count_of_records($search_district, $search_applicant_name, $search_mob, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['ismw_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['ismw_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_ismw_data_by_id() {
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
            $ismw_id = get_from_post('ismw_id');
            if (!$ismw_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ismw_data = $this->ismw_model->get_ismw_by_id($ismw_id);
            $village_data = $this->utility_model->get_result_by_id('state_code', $ismw_data['p_state'], 'all_villages', 'district_code', $ismw_data['p_dist']);
            if (empty($ismw_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['ismw_data'] = $ismw_data;
            $success_array['village_data'] = add_other_village($village_data);
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_ismw() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $module_type = get_from_post('module_type');
            if (!is_post() || $user_id == NULL || !$user_id || ($module_type != VALUE_ONE && $module_type != VALUE_TWO)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $ismw_id = get_from_post('ismw_id');
            $ismw_data = $this->_get_post_data_for_ismw();
            $validation_message = $this->_check_validation_for_ismw($ismw_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $ismw_data['status'] = $module_type;
            if ($module_type == VALUE_TWO) {
                $ismw_data['submitted_datetime'] = date('Y-m-d H:i:s');
            }
            if (!$ismw_id || $ismw_id == NULL) {
                $ismw_data['created_by'] = $user_id;
                $ismw_data['user_id'] = $user_id;
                $ismw_data['created_time'] = date('Y-m-d H:i:s');
                $ismw_id = $this->utility_model->insert_data('ismw', $ismw_data);
            } else {
                $ismw_data['updated_by'] = $user_id;
                $ismw_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('ismw_id', $ismw_id, 'ismw', $ismw_data);
            }

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = $module_type == VALUE_ONE ? APP_DRAFT_MESSAGE : APP_SUBMITTED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_ismw() {
        $ismw_data = array();
        $ismw_data['district'] = get_from_post('district');
        $ismw_data['name'] = get_from_post('name');
        $ismw_data['dob'] = convert_to_mysql_date_format(get_from_post('dob'));
        $ismw_data['gender'] = get_from_post('gender_for_ismw');
        $ismw_data['mobile_no'] = get_from_post('mobile_no');
        $ismw_data['aadhaar_no'] = get_from_post('aadhaar_no');
        $ismw_data['p_state'] = get_from_post('state_for_ismw');
        $ismw_data['p_dist'] = get_from_post('district_for_ismw');
        $ismw_data['p_block_no'] = get_from_post('p_block_no');
        $ismw_data['p_village'] = get_from_post('village_for_ismw');
        $ismw_data['p_house_no'] = get_from_post('p_house_no');
        $ismw_data['p_pincode'] = get_from_post('p_pincode');
        $ismw_data['ee_state'] = get_from_post('ee_state');
        $ismw_data['ee_dist'] = get_from_post('ee_dist');
        $ismw_data['ee_occuption'] = get_from_post('ee_occuption');
        $ismw_data['ee_nature'] = get_from_post('ee_nature');
        $ismw_data['ee_nature'] = get_from_post('ee_nature');

        return $ismw_data;
    }

    function _check_validation_for_ismw($ismw_data) {
        if (!$ismw_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$ismw_data['name']) {
            return PERSONS_NAME_MESSAGE;
        }
        if (!$ismw_data['dob']) {
            return DATE_MESSAGE;
        }
        if (!$ismw_data['gender']) {
            return SELECT_ONE_OPTION_MESSAGE;
        }
        if (!$ismw_data['mobile_no']) {
            return MOBILE_NUMBER_MESSAGE;
        }
        if (!$ismw_data['aadhaar_no']) {
            return AADHAR_NO_MESSAGE;
        }
        if (!$ismw_data['p_state']) {
            return STATE_MESSAGE;
        }
        if (!$ismw_data['p_dist']) {
            return DISTRICT_MESSAGE;
        }
//        if (!$ismw_data['p_block_no']) {
//            return WARD_NO_MESSAGE;
//        }
        if (!$ismw_data['p_village']) {
            return VILLAGE_MESSAGE;
        }
//        if (!$ismw_data['p_house_no']) {
//            return HOUSE_NO_MESSAGE;
//        }
        if (!$ismw_data['p_pincode']) {
            return PINCODE_MESSAGE;
        }

        return '';
    }

    function remove_document() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ismw_id = get_from_post('ismw_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ismw_id || $ismw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('ismw_id', $ismw_id, 'ismw');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'ismw' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('ismw_id', $ismw_id, 'ismw', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_form() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ismw_id = get_from_post('ismw_id_for_ismw_form');
            if (!is_post() || $user_id == null || !$user_id || $ismw_id == null || !$ismw_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_ismw_data = $this->utility_model->get_by_id('ismw_id', $ismw_id, 'ismw');
            $gender_array = $this->config->item('gender_type_array');
            $existing_ismw_data['gender'] = isset($gender_array[$existing_ismw_data['gender']]) ? $gender_array[$existing_ismw_data['gender']] : '-';

            $state_data = $this->utility_model->get_by_id('state_code', $existing_ismw_data['p_state'], 'state');
            $existing_ismw_data['p_state'] = $state_data['state_name'];
            $ee_state_data = $this->utility_model->get_by_id('state_code', $existing_ismw_data['ee_state'], 'state');
            $existing_ismw_data['ee_state'] = $ee_state_data['state_name'];

            $dist_data = $this->utility_model->get_by_id('district_code', $existing_ismw_data['p_dist'], 'district');
            $existing_ismw_data['p_dist'] = $dist_data['district_name'];
            $ee_dist_data = $this->utility_model->get_by_id('district_code', $existing_ismw_data['ee_dist'], 'district');
            $existing_ismw_data['ee_dist'] = $ee_dist_data['district_name'];

            $village_data = $this->utility_model->get_by_id('village_code', $existing_ismw_data['p_village'], 'all_villages');
            if ($existing_ismw_data['p_village'] == OTHER_VILLAGE) {
                $existing_ismw_data['p_village'] = 'Other';
            } else {
                $existing_ismw_data['p_village'] = $village_data['village_name'];
            }
            if (empty($existing_ismw_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('ismw_data' => $existing_ismw_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('ismw/pdf', $data, TRUE));
            $mpdf->Output('FORM-II.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_ismw_data_by_ismw_id() {
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
            $ismw_id = get_from_post('ismw_id');
            if (!$ismw_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ismw_data = $this->utility_model->get_by_id_with_applicant_name('ismw_id', $ismw_id, 'ismw');
            if (empty($ismw_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['ismw_data'] = $ismw_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function approve_application() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ismw_id = get_from_post('ismw_id_for_ismw_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ismw_id || $ismw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = get_from_post('registration_number_for_ismw_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_ismw_approve');
            $update_data['remarks'] = get_from_post('remarks_for_ismw_approve');
            if (!$update_data['registration_number']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REGISTRATION_NO_MESSAGE));
                return false;
            }
            if (!$update_data['valid_upto']) {
                echo json_encode(get_error_array(DATE_MESSAGE));
                return false;
            }
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $update_data['valid_upto'] = convert_to_mysql_date_format($update_data['valid_upto']);
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('ismw_id', $ismw_id, 'ismw');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYSEVEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('ismw_id', $ismw_id, 'ismw', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOURTYSEVEN, $ismw_id);

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = APP_APPROVED_MESSAGE;
            $success_array['submitted_datetime'] = $ex_data['submitted_datetime'];
            $success_array['processing_days'] = $update_data['processing_days'];
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function reject_application() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ismw_id = get_from_post('ismw_id_for_ismw_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$ismw_id || $ismw_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_ismw_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('ismw_id', $ismw_id, 'ismw');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYSEVEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('ismw_id', $ismw_id, 'ismw', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOURTYSEVEN, $ismw_id);

            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = APP_REJECTED_MESSAGE;
            $success_array['submitted_datetime'] = $ex_data['submitted_datetime'];
            $success_array['processing_days'] = $update_data['processing_days'];
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_certificate() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $ismw_id = get_from_post('ismw_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $ismw_id == null || !$ismw_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_ismw_data = $this->utility_model->get_by_id('ismw_id', $ismw_id, 'ismw');
            if (empty($existing_ismw_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_ismw_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('ismw_data' => $existing_ismw_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('ismw/certificate', $data, TRUE));
            $mpdf->Output('Ismw_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function generate_excel() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            if (!is_post() || $user_id == null || !$user_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $this->db->trans_start();
            $excel_data = $this->ismw_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=ismw_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Name', 'Mobile Number', 'Submitted On', 'Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                //$query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOURTYSEVEN]) ? $prefix_module_array[VALUE_FOURTYSEVEN] : '';
                    $list['ismw_id'] = generate_registration_number($prefix, $list['ismw_id']);
                    $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                    $list['submitted_datetime'] = isset($list['submitted_datetime']) ? (convert_to_new_datetime_format($list['submitted_datetime'])) : '';
                    $list['status'] = isset($app_status_text_array[$list['status']]) ? $app_status_text_array[$list['status']] : '-';
                    //$list['query_status'] = isset($query_status_text_array[$list['query_status']]) ? $query_status_text_array[$list['query_status']] : '-';
                    fputcsv($output, $list);
                }
            }
            fclose($output);
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_village_data_for_ismw() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
    //        $session_user_data = $this->utility_model->get_by_id('user_id', $session_user_id, 'users');
    //        if (empty($session_user_data)) {
    //            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
    //            return false;
    //        }
            $state_code = get_from_post('state_code');
            if (!$state_code) {
                echo json_encode(get_error_array(SELECT_STATE_MESSAGE));
                return false;
            }
            $district_code = get_from_post('district_code');
            if (!$district_code) {
                echo json_encode(get_error_array(SELECT_DISTRICT_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $village_data = $this->utility_model->get_result_by_id('state_code', $state_code, 'all_villages', 'district_code', $district_code, NULL, NULL, 'village_name');
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['village_data'] = add_other_village($village_data);
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