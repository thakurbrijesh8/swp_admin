<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Transfer extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('transfer_model');
    }

    function get_transfer_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['transfer_data'] = array();
            if ($session_user_id == NULL || !$session_user_id) {
                echo json_encode($success_array);
                return false;
            }
            $columns = $this->input->post('columns');
            $search_applicant_name = trim($columns[1]['search']['value']);
            $search_status = trim($columns[7]['search']['value']);
            $start = get_from_post('start');
            $length = get_from_post('length');
            $this->db->trans_start();
            $success_array['transfer_data'] = $this->transfer_model->get_all_transfer_list($start, $length, $search_applicant_name, $search_status);
            $success_array['recordsTotal'] = $this->transfer_model->get_total_count_of_records();
            if ($search_applicant_name != '' || $search_status != '') {
                $success_array['recordsFiltered'] = $this->transfer_model->get_filter_count_of_records($search_applicant_name, $search_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['transfer_data'], VALUE_TWELVE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['transfer_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['transfer_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_transfer_data_by_id() {
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
            $transfer_id = get_from_post('transfer_id');
            if (!$transfer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $transfer_data = $this->transfer_model->get_transfer_by_id($transfer_id);
            if (empty($transfer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['transfer_data'] = $transfer_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_transfer() {
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
            $transfer_id = get_from_post('transfer_id');
            $transfer_data = $this->_get_post_data_for_transfer();
            $validation_message = $this->_check_validation_for_transfer($transfer_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            //checklist
            if ($transfer_data['request_letter'] == IS_CHECKED_YES) {
                if ($_FILES['request_letter_upload_for_transfer']['name'] != '') {
                    $main_path = 'documents/transfer';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['request_letter_upload_for_transfer']['name']);
                    $filename = 'transfer_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['request_letter_upload_for_transfer']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $transfer_data['request_letter_upload'] = $filename;
                }
            }
            // 2
            if ($transfer_data['project_report'] == IS_CHECKED_YES) {
                if ($_FILES['project_report_upload_for_transfer']['name'] != '') {
                    $main_path = 'documents/transfer';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['project_report_upload_for_transfer']['name']);
                    $filename = 'transfer_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['project_report_upload_for_transfer']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $transfer_data['project_report_upload'] = $filename;
                }
            }
            // 3
            if ($transfer_data['constitution_project'] == IS_CHECKED_YES) {
                if ($_FILES['constitution_project_upload_for_transfer']['name'] != '') {
                    $main_path = 'documents/transfer';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['constitution_project_upload_for_transfer']['name']);
                    $filename = 'transfer_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['constitution_project_upload_for_transfer']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $transfer_data['constitution_project_upload'] = $filename;
                }
            }
            // 4
            if ($transfer_data['valid_authorization'] == IS_CHECKED_YES) {
                if ($_FILES['valid_authorization_upload_for_transfer']['name'] != '') {
                    $main_path = 'documents/transfer';
                    // if (!is_dir($main_path)) {
                    //     mkdir($main_path);
                    //     chmod("$main_path", 0755);
                    // }
                    $documents_path = 'documents';
                    if (!is_dir($documents_path)) {
                        mkdir($documents_path);
                        chmod($documents_path, 0777);
                    }
                    $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                    if (!is_dir($module_path)) {
                        mkdir($module_path);
                        chmod($module_path, 0777);
                    }
                    $this->load->library('upload');
                    $temp_filename = str_replace('_', '', $_FILES['valid_authorization_upload_for_transfer']['name']);
                    $filename = 'transfer_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                    //Change file name
                    $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                    if (!move_uploaded_file($_FILES['valid_authorization_upload_for_transfer']['tmp_name'], $final_path)) {
                        echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                    $transfer_data['valid_authorization_upload'] = $filename;
                }
            }
            //end checklist



            if ($_FILES['sign_seal_for_transfer']['name'] != '') {
                $main_path = 'documents/transfer';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['sign_seal_for_transfer']['name']);
                $filename = 'transfer_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['sign_seal_for_transfer']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $transfer_data['sign_seal'] = $filename;
            }


            $this->db->trans_start();

            // $transfer_data['proprietor_details'] = $proprietorData;
            // $transfer_data['user_id'] = $user_id;
            // $transfer_data['status'] = $module_type;
            $transfer_data['application_date'] = convert_to_mysql_date_format($transfer_data['application_date']);
            if (!$transfer_id || $transfer_id == NULL) {
                $transfer_data['created_by'] = $user_id;
                $transfer_data['created_time'] = date('Y-m-d H:i:s');
                $transfer_id = $this->utility_model->insert_data('transfer', $transfer_data);
            } else {
                $transfer_data['updated_by'] = $user_id;
                $transfer_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', $transfer_data);
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

    function _get_post_data_for_transfer() {
        $transfer_data = array();
        $transfer_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $transfer_data['name_of_applicant'] = get_from_post('name_of_applicant');
        $transfer_data['application_date'] = get_from_post('application_date');
        $transfer_data['state'] = get_from_post('state');
        $transfer_data['district'] = get_from_post('district');
        $transfer_data['taluka'] = get_from_post('taluka');
        $transfer_data['village'] = get_from_post('villages_for_noc_data');
        $transfer_data['plot_no'] = get_from_post('plot_no_for_transfer_data');
        $transfer_data['survey_no'] = get_from_post('survey_no');
        $transfer_data['admeasuring_square_metre'] = get_from_post('admeasuring_square_metre');
        $transfer_data['govt_Industrial_estate_area'] = get_from_post('govt_industrial_estate_area');
        $transfer_data['reason_of_transfer'] = get_from_post('reason_of_transfer');
        $transfer_data['transferer_name'] = get_from_post('transferer_name');
        $transfer_data['name_of_servicing'] = get_from_post('name_of_servicing');
        $transfer_data['other_services'] = get_from_post('other_services');
        $transfer_data['aadhar_no'] = get_from_post('aadhar_no');
        $transfer_data['pan_no'] = get_from_post('pan_no');
        $transfer_data['gst_no'] = get_from_post('gst_no');
        $transfer_data['account_no'] = get_from_post('account_no');
        $transfer_data['request_letter'] = get_from_post('request_letter');
        $transfer_data['project_report'] = get_from_post('project_report');
        $transfer_data['constitution_project'] = get_from_post('constitution_project');
        $transfer_data['valid_authorization'] = get_from_post('valid_authorization');
        return $transfer_data;
    }

    function _check_validation_for_transfer($transfer_data) {
        if (!$transfer_data['name_of_applicant']) {
            return APPLICANT_NAME_MESSAGE;
        }
        if (!$transfer_data['application_date']) {
            return APPLICATION_DATE_MESSAGE;
        }
        if (!$transfer_data['state']) {
            return STATE_MESSAGE;
        }
        if (!$transfer_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$transfer_data['taluka']) {
            return TALUKA_MESSAGE;
        }
        if (!$transfer_data['village']) {
            return VILLAGE_MESSAGE;
        }

        if (!$transfer_data['plot_no']) {
            return PLOT_NO_MESSAGE;
        }
        if (!$transfer_data['survey_no']) {
            return SURVEY_NO_MESSAGE;
        }
        if (!$transfer_data['admeasuring_square_metre']) {
            return ADMEASURING_MESSAGE;
        }
        if (!$transfer_data['govt_Industrial_estate_area']) {
            return GOVT_INDUSTRIAL_AR_MESSAGE;
        }
        if (!$transfer_data['reason_of_transfer']) {
            return REASONOF_TRANSFER_MESSAGE;
        }

        if (!$transfer_data['transferer_name']) {
            return TRANSFERER_NAME_MESSAGE;
        }
        if (!$transfer_data['name_of_servicing']) {
            return NAME_OF_SERVICING_MESSAGE;
        }
        if (!$transfer_data['other_services']) {
            return OTHER_SERVICES_MESSAGE;
        }
        if (!$transfer_data['aadhar_no']) {
            return AADHAR_NO_MESSAGE;
        }
        if (!$transfer_data['pan_no']) {
            return PAN_NO_MESSAGE;
        }
        if (!$transfer_data['gst_no']) {
            return GST_NO_MESSAGE;
        }
        if (!$transfer_data['account_no']) {
            return ACCOUNT_NO_MESSAGE;
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
            $transfer_id = get_from_post('transfer_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$transfer_id || $transfer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'transfer' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));

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
            $transfer_id = get_from_post('transfer_id_for_transfer_form1');
            if (!is_post() || $user_id == null || !$user_id || $transfer_id == null || !$transfer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_transfer_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');

            if (empty($existing_transfer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('transfer_data' => $existing_transfer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('transfer/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_transfer_data_by_transfer_id() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $transfer_id = get_from_post('transfer_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || $transfer_id == null || !$transfer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $transfer_data = $this->utility_model->get_by_id_with_applicant_name('transfer_id', $transfer_id, 'transfer');
            if (empty($transfer_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWELVE, 'fees_bifurcation', 'module_id', $transfer_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_TWELVE, $transfer_id);
                }
                if ($transfer_data['status'] != VALUE_FOUR && $transfer_data['status'] != VALUE_FIVE &&
                        $transfer_data['status'] != VALUE_SIX && $transfer_data['status'] != VALUE_SEVEN &&
                        $transfer_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($transfer_data['status'] != VALUE_ELEVEN) {
                            $transfer_data['show_remove_upload_btn'] = true;
                        }
                        $transfer_data['show_dropdown'] = true;
                        $transfer_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_TWELVE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['transfer_data'] = $transfer_data;
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $success_array['fb_data'] = $fb_data;
                if ($is_fb_details == VALUE_TWO) {
                    $success_array['ph_data'] = $ph_data;
                }
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
            $transfer_id = get_from_post('transfer_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$transfer_id || $transfer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'transfer' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $transfer_id = get_from_post('transfer_id_for_transfer_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $transfer_id == NULL || !$transfer_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_transfer_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $transfer_data = array();
            if ($_FILES['challan_for_transfer_upload_challan']['name'] != '') {
                $main_path = 'documents/transfer';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'transfer';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_transfer_upload_challan']['name']);
                $filename = 'challan_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_transfer_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $transfer_data['challan'] = $filename;
                $transfer_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $transfer_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $transfer_data['status'] = VALUE_NINE;
            }
            $transfer_data['payment_type'] = $payment_type;
            $transfer_data['updated_by'] = $user_id;
            $transfer_data['updated_time'] = date('Y-m-d H:i:s');
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_TWELVE, $transfer_id, $user_id, $transfer_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_TWELVE, 'fees_bifurcation', $update_data, 'module_id', $transfer_id);
            }

            $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', $transfer_data);
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
            $transfer_id = get_from_post('transfer_id_for_transfer_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$transfer_id || $transfer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['admin_registration_number'] = get_from_post('registration_number_for_transfer_approve');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_transfer_approve');
            $update_data['remarks'] = get_from_post('remarks_for_transfer_approve');
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
            $ex_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWELVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_TWELVE, $transfer_id);

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
            $transfer_id = get_from_post('transfer_id_for_transfer_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$transfer_id || $transfer_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_transfer_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_TWELVE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('transfer_id', $transfer_id, 'transfer', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_TWELVE, $transfer_id);

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
            $transfer_id = get_from_post('transfer_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $transfer_id == null || !$transfer_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_transfer_data = $this->utility_model->get_by_id('transfer_id', $transfer_id, 'transfer');
            if (empty($existing_transfer_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_transfer_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('transfer_data' => $existing_transfer_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('transfer/certificate', $data, TRUE));
            $mpdf->Output('transfer_certificate_' . time() . '.pdf', 'I');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }
}

/*
 * EOF: ./application/controller/Transfer.php
 */