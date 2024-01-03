<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Seller extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('seller_model');
    }

    function get_seller_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['seller_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $session_district = get_from_session('temp_district_for_eodbsws_admin');
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $search_status = trim($columns[7]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['seller_data'] = $this->seller_model->get_all_seller_list($start, $length, $search_applicant_name, $session_district, $search_status);
            $success_array['recordsTotal'] = $this->seller_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->seller_model->get_filter_count_of_records($session_district, $search_applicant_name, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['seller_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['seller_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_seller_data_by_id() {
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
            $seller_id = get_from_post('seller_id');
            if (!$seller_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $seller_data = $this->seller_model->get_seller_by_id($seller_id);
            if (empty($seller_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['seller_data'] = $seller_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_seller() {
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
            $seller_id = get_from_post('seller_id');
            $seller_data = $this->_get_post_data_for_seller();
            $validation_message = $this->_check_validation_for_seller($seller_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            if ($_FILES['seal_and_stamp_for_seller']['name'] != '') {
                $main_path = 'documents/seller';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'seller';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_seller']['name']);
                $filename = 'seller_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['seal_and_stamp_for_seller']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $seller_data['signature'] = $filename;
            }


            $this->db->trans_start();

            // $seller_data['proprietor_details'] = $proprietorData;
            // $seller_data['user_id'] = $user_id;
            // $seller_data['status'] = $module_type;
            $seller_data['application_date'] = convert_to_mysql_date_format($seller_data['application_date']);
            if (!$seller_id || $seller_id == NULL) {
                $seller_data['created_by'] = $user_id;
                $seller_data['created_time'] = date('Y-m-d H:i:s');
                $seller_id = $this->utility_model->insert_data('lease_seller', $seller_data);
            } else {
                $seller_data['updated_by'] = $user_id;
                $seller_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', $seller_data);
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

    function _get_post_data_for_seller() {
        $seller_data = array();
        $seller_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $seller_data['application_date'] = get_from_post('application_date');
        $seller_data['state'] = get_from_post('state');
        $seller_data['district'] = get_from_post('district');
        $seller_data['taluka'] = get_from_post('taluka');
        $seller_data['village'] = get_from_post('villages_for_noc_data');
        $seller_data['plot_no'] = get_from_post('plot_no_for_seller_data');
        $seller_data['survey_no'] = get_from_post('survey_no');
        $seller_data['govt_industrial_estate_area'] = get_from_post('govt_industrial_estate_area');
        $seller_data['admeasuring_square_metre'] = get_from_post('admeasuring_square_metre');
        $seller_data['reason_of_transfer'] = get_from_post('reason_of_transfer');
        $seller_data['transferer_name'] = get_from_post('transferer_name');
        $seller_data['name_of_servicing'] = get_from_post('name_of_servicing');
        $seller_data['udyog_aadhar_memo_no'] = get_from_post('udyog_aadhar_memo_no');
        $seller_data['pan_no'] = get_from_post('pan_no');
        $seller_data['gst_no'] = get_from_post('gst_no');
        $seller_data['trans_account_no'] = get_from_post('trans_account_no');
        $seller_data['request_letter_reason'] = get_from_post('request_letter_reason');
        $seller_data['original_extract'] = get_from_post('original_extract');
        $seller_data['nodue_from_mamlatdar'] = get_from_post('nodue_from_mamlatdar');
        $seller_data['nodue_from_electricity'] = get_from_post('nodue_from_electricity');
        $seller_data['nodue_from_bank'] = get_from_post('nodue_from_bank');
        $seller_data['nodues_from_grampanchayat'] = get_from_post('nodues_from_grampanchayat');
        $seller_data['challan_of_lease'] = get_from_post('challan_of_lease');
        $seller_data['occupancy_certy'] = get_from_post('occupancy_certy');
        $seller_data['nodue_from_excise'] = get_from_post('nodue_from_excise');
        $seller_data['sign_behalf_lessee'] = get_from_post('sign_behalf_lessee');
        return $seller_data;
    }

    function _check_validation_for_seller($seller_data) {
        if (!$seller_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$seller_data['state']) {
            return STATE_MESSAGE;
        }
        if (!$seller_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$seller_data['taluka']) {
            return TALUKA_MESSAGE;
        }
        if (!$seller_data['village']) {
            return VILLAGE_NAME_MESSAGE;
        }

        if (!$seller_data['plot_no']) {
            return PLOT_NO_MESSAGE;
        }
        if (!$seller_data['survey_no']) {
            return SURVEY_NO_MESSAGE;
        }
        if (!$seller_data['admeasuring_square_metre']) {
            return ADMEASURING_MESSAGE;
        }

        if (!$seller_data['reason_of_transfer']) {
            return REASONOF_TRANSFER_MESSAGE;
        }

        if (!$seller_data['transferer_name']) {
            return TRANSFERER_NAME_MESSAGE;
        }
        if (!$seller_data['name_of_servicing']) {
            return NAME_OF_SERVICING_MESSAGE;
        }
        if (!$seller_data['udyog_aadhar_memo_no']) {
            return GOVT_INDUSTRIAL_AR_MESSAGE;
        }
        if (!$seller_data['pan_no']) {
            return REASONOF_TRANSFER_MESSAGE;
        }

        if (!$seller_data['gst_no']) {
            return TRANSFERER_NAME_MESSAGE;
        }
        if (!$seller_data['trans_account_no']) {
            return NAME_OF_SERVICING_MESSAGE;
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
            $seller_id = get_from_post('seller_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$seller_id || $seller_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'seller' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


            $success_array = get_success_array();
            $success_array['message'] = DOCUMENT_REMOVED_MESSAGE;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function generate_form1() {
        try {
            $user_id = get_from_session('temp_id_for_eodbsws_admin');
            $seller_id = get_from_post('seller_id_for_seller_form1');
            if (!is_post() || $user_id == null || !$user_id || $seller_id == null || !$seller_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_seller_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');

            if (empty($existing_seller_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('seller_data' => $existing_seller_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('seller/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_seller_data_by_seller_id() {
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
            $seller_id = get_from_post('seller_id');
            if (!$seller_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $seller_data = $this->utility_model->get_by_id_with_applicant_name('seller_id', $seller_id, 'lease_seller');
            if (empty($seller_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['seller_data'] = $seller_data;
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
            $seller_id = get_from_post('seller_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$seller_id || $seller_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'seller' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $seller_id = get_from_post('seller_id_for_seller_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $seller_id == NULL || !$seller_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $seller_data = array();
            if ($_FILES['challan_for_seller_upload_challan']['name'] != '') {
                $main_path = 'documents/seller';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'seller';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_seller_upload_challan']['name']);
                $filename = 'challan_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_seller_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $seller_data['challan'] = $filename;
                $seller_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $seller_data['status'] = VALUE_THREE;
            $seller_data['updated_by'] = $user_id;
            $seller_data['updated_time'] = date('Y-m-d H:i:s');
            $this->db->trans_start();
            $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', $seller_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
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
            $seller_id = get_from_post('seller_id_for_seller_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$seller_id || $seller_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_seller_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_seller_approve');
            $update_data['remarks'] = get_from_post('remarks_for_seller_approve');
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
            $ex_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_EIGHTEEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_EIGHTEEN, $seller_id);

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
            $seller_id = get_from_post('seller_id_for_seller_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$seller_id || $seller_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_seller_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_EIGHTEEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('seller_id', $seller_id, 'lease_seller', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_EIGHTEEN, $seller_id);

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
            $seller_id = get_from_post('seller_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $seller_id == null || !$seller_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_seller_data = $this->utility_model->get_by_id('seller_id', $seller_id, 'lease_seller');
            if (empty($existing_seller_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_seller_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('seller_data' => $existing_seller_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('seller/certificate', $data, TRUE));
            $mpdf->Output('seller_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/BOCW.php
 */