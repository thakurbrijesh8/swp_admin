<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Periodicalreturn extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('periodicalreturn_model');
    }

    function get_periodicalreturn_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['periodicalreturn_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $columns = $this->input->post('columns');
            $search_district = '';
            if (is_admin() || is_view_all_district_user()) {
                $search_district = trim($columns[1]['search']['value']);
                $new_s_district = get_from_post('search_district');
                $search_district = $new_s_district != '' ? $new_s_district : $search_district;
            } else {
                $search_district = $session_district;
            }
            $search_entity_establishment_type = trim($columns[2]['search']['value']);
            $search_logged_user_detail = trim($columns[3]['search']['value']);
            $search_applicant_detail = trim($columns[4]['search']['value']);
            $search_app_timing = trim($columns[5]['search']['value']);
            $search_status = trim($columns[6]['search']['value']);
            $search_query_status = trim($columns[7]['search']['value']);

            $new_s_app_timing_status = get_from_post('search_app_timing_status');
            $search_app_timing = $new_s_app_timing_status != '' ? $new_s_app_timing_status : $search_app_timing;
            $new_s_status = get_from_post('search_status');
            $search_status = $new_s_status != '' ? $new_s_status : $search_status;

            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['periodicalreturn_data'] = $this->periodicalreturn_model->get_all_periodicalreturn_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->periodicalreturn_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->periodicalreturn_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['periodicalreturn_data'], VALUE_FIFTY);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['periodicalreturn_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['periodicalreturn_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_periodicalreturn_data_by_id() {
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
            $periodicalreturn_id = get_from_post('periodicalreturn_id');
            if (!$periodicalreturn_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $periodicalreturn_data = $this->periodicalreturn_model->get_periodicalreturn_by_id($periodicalreturn_id);
            if (empty($periodicalreturn_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['periodicalreturn_data'] = $periodicalreturn_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_periodicalreturn() {
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
            $periodicalreturn_id = get_from_post('periodicalreturn_id');
            $periodicalreturn_data = $this->_get_post_data_for_periodicalreturn();
            $validation_message = $this->_check_validation_for_periodicalreturn($periodicalreturn_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            $periodicalreturn_id = get_from_post('periodicalreturn_id');
            $periodicalreturn_data = $this->_get_post_data_for_periodicalreturn();
            // $validation_message = $this->_check_validation_for_periodicalreturn($periodicalreturn_data);
            // if ($validation_message != '') {
            //     echo json_encode(get_error_array($validation_message));
            //     return false;
            // }
            $proprietorData = $this->input->post('proprietor_data');
            $proprietor_decode_Data = json_decode($proprietorData, true);
            // if ($proprietorData == "" || empty($proprietor_decode_Data)) {
            //     echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
            //     return false;
            // }
            $otherData = $this->input->post('other_data');
            $other_decode_Data = json_decode($otherData, true);
            // if ($otherData == "" || empty($other_decode_Data)) {
            //     echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
            //     return false;
            // }
            $manufacturerData = $this->input->post('manufacturer_data');
            $manufacturer_decode_Data = json_decode($manufacturerData, true);
            // if ($manufacturerData == "" || empty($manufacturer_decode_Data)) {
            //     echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
            //     return false;
            // }
            $manufacturertwoData = $this->input->post('manufacturertwo_data');
            $manufacturertwo_decode_Data = json_decode($manufacturertwoData, true);
            // if ($lrdetailData == "" || empty($lrdetail_decode_Data)) {
            //     echo json_encode(get_error_array('Enter Atlist One Proprietor Data'));
            //     return false;
            // }
            $repairerData = $this->input->post('repairer_data');
            $repairer_decode_Data = json_decode($repairerData, true);


            $this->db->trans_start();
            $periodicalreturn_data['applicant_licence_date'] = convert_to_mysql_date_format($periodicalreturn_data['applicant_licence_date']);
            $periodicalreturn_data['proprietor_details'] = $proprietorData;
            $periodicalreturn_data['other_details'] = $otherData;
            $periodicalreturn_data['manufacturer_details'] = $manufacturerData;
            $periodicalreturn_data['manufacturertwo_details'] = $manufacturertwoData;
            $periodicalreturn_data['repairer_details'] = $repairerData;
            if (!$periodicalreturn_id || $periodicalreturn_id == NULL) {
                $periodicalreturn_data['created_by'] = $user_id;
                $periodicalreturn_data['created_time'] = date('Y-m-d H:i:s');
                $periodicalreturn_id = $this->utility_model->insert_data('periodicalreturn', $periodicalreturn_data);
            } else {
                $periodicalreturn_data['updated_by'] = $user_id;
                $periodicalreturn_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn', $periodicalreturn_data);
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

    function _get_post_data_for_periodicalreturn() {
        $periodicalreturn_data = array();
        $periodicalreturn_data['district'] = get_from_post('district');
        $periodicalreturn_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $periodicalreturn_data['application_category'] = get_from_post('application_category');
        $periodicalreturn_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $periodicalreturn_data['applicant_address'] = get_from_post('applicant_address');
        $periodicalreturn_data['applicant_licence_no'] = get_from_post('applicant_licence_no');
        $periodicalreturn_data['applicant_licence_date'] = get_from_post('applicant_licence_date');
        $periodicalreturn_data['description_wm'] = get_from_post('description_wm');
        $periodicalreturn_data['period_validity_licence'] = get_from_post('period_validity_licence');
        $periodicalreturn_data['suspending_revoke'] = get_from_post('suspending_revoke');
        $periodicalreturn_data['category_of_wm'] = get_from_post('category_of_wm');
        return $periodicalreturn_data;
    }

    function _check_validation_for_periodicalreturn($periodicalreturn_data) {
        if (!$periodicalreturn_data['district']) {
            return SELECT_DISTRICT;
        }
        if (!$periodicalreturn_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$periodicalreturn_data['application_category']) {
            return SELECT_APPLICATIN_CATEGORY;
        }
        if (!$periodicalreturn_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$periodicalreturn_data['applicant_address']) {
            return APPLICANT_ADDRESS_MESSAGE;
        }
        if (!$periodicalreturn_data['applicant_licence_no']) {
            return LICENSE_NUMBER_MESSAGE;
        }

        return '';
    }

    function generate_form1() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $periodicalreturn_id = get_from_post('periodicalreturn_id_for_periodicalreturn_form1');
            if (!is_post() || $user_id == null || !$user_id || $periodicalreturn_id == null || !$periodicalreturn_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_periodicalreturn_data = $this->utility_model->get_by_id('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');

            if (empty($existing_periodicalreturn_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('periodicalreturn_data' => $existing_periodicalreturn_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('periodicalreturn/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_periodicalreturn_data_by_periodicalreturn_id() {
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
            $periodicalreturn_id = get_from_post('periodicalreturn_id');
            if (!$periodicalreturn_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $periodicalreturn_data = $this->utility_model->get_by_id_with_applicant_name('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');
            if (empty($periodicalreturn_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FIFTY, 'fees_bifurcation', 'module_id', $periodicalreturn_id);
            }
            $success_array = get_success_array();
            $success_array['periodicalreturn_data'] = $periodicalreturn_data;
            if ($is_fb_details == VALUE_ONE) {
                $success_array['fb_data'] = $fb_data;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function remove_challan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $periodicalreturn_id = get_from_post('periodicalreturn_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$periodicalreturn_id || $periodicalreturn_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'periodicalreturn' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function upload_challan() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $periodicalreturn_id = get_from_post('periodicalreturn_id_for_periodicalreturn_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $periodicalreturn_id == NULL || !$periodicalreturn_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_periodicalreturn_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $periodicalreturn_data = array();
            if ($_FILES['challan_for_periodicalreturn_upload_challan']['name'] != '') {
                $main_path = 'documents/periodicalreturn';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'periodicalreturn';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_periodicalreturn_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_periodicalreturn_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $periodicalreturn_data['challan'] = $filename;
                $periodicalreturn_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $periodicalreturn_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $periodicalreturn_data['status'] = VALUE_NINE;
            }
            $periodicalreturn_data['payment_type'] = $payment_type;
            $periodicalreturn_data['updated_by'] = $user_id;
            $periodicalreturn_data['updated_time'] = date('Y-m-d H:i:s');
            $periodicalreturn_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FIFTY, $periodicalreturn_id, $user_id, $periodicalreturn_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FIFTY, 'fees_bifurcation', $update_data, 'module_id', $periodicalreturn_id);
            }


            $this->utility_model->update_data('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn', $periodicalreturn_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $periodicalreturn_data['total_fees'];
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
            $periodicalreturn_id = get_from_post('periodicalreturn_id_for_periodicalreturn_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$periodicalreturn_id || $periodicalreturn_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_periodicalreturn_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_periodicalreturn_approve');
            $update_data['remarks'] = get_from_post('remarks_for_periodicalreturn_approve');
            if (!$update_data['admin_registration_number']) {
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
            $ex_data = $this->utility_model->get_by_id('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIFTY, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FIFTY, $periodicalreturn_id);

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
            $periodicalreturn_id = get_from_post('periodicalreturn_id_for_periodicalreturn_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$periodicalreturn_id || $periodicalreturn_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_periodicalreturn_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FIFTY, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FIFTY, $periodicalreturn_id);

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
            $periodicalreturn_id = get_from_post('periodicalreturn_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $periodicalreturn_id == null || !$periodicalreturn_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_periodicalreturn_data = $this->utility_model->get_by_id('periodicalreturn_id', $periodicalreturn_id, 'periodicalreturn');
            if (empty($existing_periodicalreturn_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_periodicalreturn_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('periodicalreturn_data' => $existing_periodicalreturn_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('periodicalreturn/certificate', $data, TRUE));
            $mpdf->Output('Periodicalreturn_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->periodicalreturn_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Periodicalreturn_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Name',
                'Address', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FIFTY]) ? $prefix_module_array[VALUE_FIFTY] : '';
                    $list['periodicalreturn_id'] = generate_registration_number($prefix, $list['periodicalreturn_id']);
                    $list['district'] = isset($taluka_array[$list['district']]) ? $taluka_array[$list['district']] : '-';
                    $list['entity_establishment_type'] = isset($entity_establishment_type_array[$list['entity_establishment_type']]) ? $entity_establishment_type_array[$list['entity_establishment_type']] : '-';
                    $list['submitted_datetime'] = convert_to_new_datetime_format($list['submitted_datetime']);
                    $list['status'] = isset($app_status_text_array[$list['status']]) ? $app_status_text_array[$list['status']] : '-';
                    $list['query_status'] = isset($query_status_text_array[$list['query_status']]) ? $query_status_text_array[$list['query_status']] : '-';
                    fputcsv($output, $list);
                }
            }
            fclose($output);
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/BOCW.php
 */