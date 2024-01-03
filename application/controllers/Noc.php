<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Noc extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('noc_model');
        $this->load->model('utility_model');
    }

    function get_noc_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['noc_data'] = array();
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
            $success_array['noc_data'] = $this->noc_model->get_all_noc_list($start, $length, $search_applicant_name, $session_district, $search_status);
            $success_array['recordsTotal'] = $this->noc_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->noc_model->get_filter_count_of_records($session_district, $search_applicant_name, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['noc_data'], VALUE_ELEVEN);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['noc_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['noc_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_noc_data_by_id() {
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
            $noc_id = get_from_post('noc_id');
            if (!$noc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $noc_data = $this->noc_model->get_noc_by_id($noc_id);
            if (empty($noc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['noc_data'] = $noc_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_noc() {
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
            $noc_id = get_from_post('noc_id');
            $noc_data = $this->_get_post_data_for_noc();
            $validation_message = $this->_check_validation_for_noc($noc_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }

            if ($_FILES['seal_and_stamp_for_noc']['name'] != '') {
                $main_path = 'documents/noc';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'noc';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['seal_and_stamp_for_noc']['name']);
                $filename = 'noc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['seal_and_stamp_for_noc']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $noc_data['signature'] = $filename;
            }


            $this->db->trans_start();

            // $noc_data['proprietor_details'] = $proprietorData;
            // $noc_data['user_id'] = $user_id;
            // $noc_data['status'] = $module_type;
            $noc_data['application_date'] = convert_to_mysql_date_format($noc_data['application_date']);
            $noc_data['loan_from_date'] = convert_to_mysql_date_format($noc_data['loan_from_date']);
            $noc_data['to_date'] = convert_to_mysql_date_format($noc_data['to_date']);
            if (!$noc_id || $noc_id == NULL) {
                $noc_data['created_by'] = $user_id;
                $noc_data['created_time'] = date('Y-m-d H:i:s');
                $noc_id = $this->utility_model->insert_data('noc', $noc_data);
            } else {
                $noc_data['application_date'] = date('Y-m-d');
                $noc_data['updated_by'] = $user_id;
                $noc_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('noc_id', $noc_id, 'noc', $noc_data);
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

    function _get_post_data_for_noc() {
        $noc_data = array();
        $noc_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $noc_data['application_date'] = get_from_post('application_date');
        $noc_data['state'] = get_from_post('state');
        $noc_data['district'] = get_from_post('district');
        $noc_data['taluka'] = get_from_post('taluka');
        $noc_data['village'] = get_from_post('villages_for_noc_data');
        $noc_data['loan_amount'] = get_from_post('loan_amount');
        $noc_data['plot_no'] = get_from_post('plot_no_for_noc_data');
        $noc_data['survey_no'] = get_from_post('survey_no');
        // $noc_data['admeasuring_square_metre'] = get_from_post('admeasuring_square_metre');
        $noc_data['govt_industrial_estate_area'] = get_from_post('govt_industrial_estate_area');
        $noc_data['purpose_of_lease'] = get_from_post('purpose_of_lease');
        $noc_data['ac_number'] = get_from_post('ac_number');
        $noc_data['bank_name'] = get_from_post('bank_name');
        $noc_data['branch_name'] = get_from_post('branch_name');
        $noc_data['ifsc_code'] = get_from_post('ifsc_code');
        $noc_data['loan_from_date'] = get_from_post('loan_from_date');
        $noc_data['to_date'] = get_from_post('to_date');
        $noc_data['reason_of_loan_from_bank'] = get_from_post('reason_of_loan_from_bank');
        $noc_data['request_letter_of_bank'] = get_from_post('request_letter_of_bank');
        $noc_data['behalf_of_lessee'] = get_from_post('behalf_of_lessee');
        $noc_data['public_undertaking'] = get_from_post('public_undertaking');
        return $noc_data;
    }

    function _check_validation_for_noc($noc_data) {
        if (!$noc_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$noc_data['state']) {
            return STATE_MESSAGE;
        }
        if (!$noc_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$noc_data['taluka']) {
            return TALUKA_MESSAGE;
        }
        if (!$noc_data['village']) {
            return VILLAGE_NAME_MESSAGE;
        }

        if (!$noc_data['loan_amount']) {
            return LOAN_AMOUNT_MESSAGE;
        }
        if (!$noc_data['plot_no']) {
            return PLOT_NO_MESSAGE;
        }
        if (!$noc_data['survey_no']) {
            return SURVEY_NO_MESSAGE;
        }
        // if (!$noc_data['admeasuring_square_metre']) {
        //     return ADMEASURING_MESSAGE;
        // }

        if (!$noc_data['purpose_of_lease']) {
            return PURPOSE_MESSAGE;
        }

        if (!$noc_data['ac_number']) {
            return ACCOUNT_NO_MESSAGE;
        }
        if (!$noc_data['bank_name']) {
            return BANK_NAME_MESSAGE;
        }
        if (!$noc_data['branch_name']) {
            return BRANCH_NAME_MESSAGE;
        }
        if (!$noc_data['ifsc_code']) {
            return IFSC_CODE_MESSAGE;
        }
        if (!$noc_data['loan_from_date']) {
            return LOAN_FROM_DATE_MESSAGE;
        }
        if (!$noc_data['to_date']) {
            return LOAN_TO_DATE_MESSAGE;
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
            $noc_id = get_from_post('noc_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$noc_id || $noc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'noc' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];


            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('noc_id', $noc_id, 'noc', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));


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
            $noc_id = get_from_post('noc_id_for_noc_form1');
            if (!is_post() || $user_id == null || !$user_id || $noc_id == null || !$noc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_noc_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');

            if (empty($existing_noc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('noc_data' => $existing_noc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('noc/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_noc_data_by_noc_id() {
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
            $noc_id = get_from_post('noc_id');
            if (!$noc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $noc_data = $this->utility_model->get_by_id_with_applicant_name('noc_id', $noc_id, 'noc');
            if (empty($noc_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $success_array = get_success_array();
            $success_array['noc_data'] = $noc_data;
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
            $noc_id = get_from_post('noc_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$noc_id || $noc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'noc' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('noc_id', $noc_id, 'noc', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $noc_id = get_from_post('noc_id_for_noc_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $noc_id == NULL || !$noc_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $noc_data = array();
            if ($_FILES['challan_for_noc_upload_challan']['name'] != '') {
                $main_path = 'documents/noc';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'noc';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_noc_upload_challan']['name']);
                $filename = 'challan_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_noc_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $noc_data['challan'] = $filename;
                $noc_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $noc_data['status'] = VALUE_THREE;
            $noc_data['updated_by'] = $user_id;
            $noc_data['updated_time'] = date('Y-m-d H:i:s');
            $this->db->trans_start();
            $this->utility_model->update_data('noc_id', $noc_id, 'noc', $noc_data);
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
            $noc_id = get_from_post('noc_id_for_noc_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$noc_id || $noc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_noc_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_noc_approve');
            $update_data['remarks'] = get_from_post('remarks_for_noc_approve');
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
            $ex_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_ELEVEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('noc_id', $noc_id, 'noc', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_ELEVEN, $noc_id);

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
            $noc_id = get_from_post('noc_id_for_noc_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$noc_id || $noc_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_noc_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_ELEVEN, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('noc_id', $noc_id, 'noc', $update_data);


            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_ELEVEN, $noc_id);

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
            $noc_id = get_from_post('noc_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $noc_id == null || !$noc_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_noc_data = $this->utility_model->get_by_id('noc_id', $noc_id, 'noc');
            if (empty($existing_noc_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_noc_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('noc_data' => $existing_noc_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('noc/certificate', $data, TRUE));
            $mpdf->Output('noc_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

}

/*
 * EOF: ./application/controller/BOCW.php
 */