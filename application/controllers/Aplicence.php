<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Aplicence extends CI_Controller {

    function __construct() {
        parent::__construct();
        check_authenticated();
        $this->load->model('aplicence_model');
    }

    function get_aplicence_data() {
        try {
            if (!is_ajax()) {
                header("Location:" . base_url() . "login");
                return false;
            }
            $session_user_id = get_from_session('temp_id_for_eodbsws_admin');
            $success_array = array();
            $success_array['aplicence_data'] = array();
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
            $success_array['aplicence_data'] = $this->aplicence_model->get_all_aplicence_list($start, $length, $search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            $success_array['recordsTotal'] = $this->aplicence_model->get_total_count_of_records($search_district);

            if (($search_district != '' && (is_admin() || is_view_all_district_user())) || $search_entity_establishment_type || $search_logged_user_detail != '' || $search_applicant_detail != '' || $search_app_timing != '' || $search_status != '' || $search_query_status != '') {
                $success_array['recordsFiltered'] = $this->aplicence_model->get_filter_count_of_records($search_district, $search_entity_establishment_type, $search_logged_user_detail, $search_applicant_detail, $search_app_timing, $search_status, $search_query_status);
            } else {
                $success_array['recordsFiltered'] = $success_array['recordsTotal'];
            }
            $success_array['query_movements'] = $this->utility_lib->get_query_movement_string($success_array['aplicence_data'], VALUE_FOURTYTHREE);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                $success_array['aplicence_data'] = array();
                echo json_encode($success_array);
                return;
            }
            echo json_encode($success_array);
        } catch (\Exception $e) {
            $success_array['aplicence_data'] = array();
            $success_array['recordsTotal'] = array();
            $success_array['recordsFiltered'] = array();
            $success_array['query_movements'] = array();
            echo json_encode($success_array);
        }
    }

    function get_aplicence_data_by_id() {
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
            $aplicence_id = get_from_post('aplicence_id');
            if (!$aplicence_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $aplicence_data = $this->aplicence_model->get_aplicence_by_id($aplicence_id);
            if (empty($aplicence_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['aplicence_data'] = $aplicence_data;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function submit_aplicence() {
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
            $aplicence_id = get_from_post('aplicence_id');
            $aplicence_data = $this->_get_post_data_for_aplicence();
            $validation_message = $this->_check_validation_for_aplicence($aplicence_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
            $this->db->trans_start();
            $aplicence_data['date_of_certificate'] = convert_to_mysql_date_format($aplicence_data['date_of_certificate']);
            // $aplicence_data['user_id'] = $user_id;
            // $aplicence_data['status'] = $module_type;
            if (!$aplicence_id || $aplicence_id == NULL) {
                $aplicence_data['created_by'] = $user_id;
                $aplicence_data['created_time'] = date('Y-m-d H:i:s');
                $aplicence_id = $this->utility_model->insert_data('appli_licence', $aplicence_data);
            } else {
                $aplicence_data['updated_by'] = $user_id;
                $aplicence_data['updated_time'] = date('Y-m-d H:i:s');
                $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', $aplicence_data);
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

    function _get_post_data_for_aplicence() {
        $aplicence_data = array();
        $aplicence_data['district'] = get_from_post('district');
        $aplicence_data['entity_establishment_type'] = get_from_post('entity_establishment_type');
        $aplicence_data['contractor_name'] = get_from_post('contractor_name');
        $aplicence_data['contractor_fathername'] = get_from_post('contractor_fathername');
        $aplicence_data['contractor_address'] = get_from_post('contractor_address');
        $aplicence_data['contractor_contact'] = get_from_post('contractor_contact');
        $aplicence_data['contractor_email'] = get_from_post('contractor_email');
        $aplicence_data['establi_name'] = get_from_post('establi_name');
        $aplicence_data['establi_address'] = get_from_post('establi_address');
        $aplicence_data['no_of_certificate'] = get_from_post('no_of_certificate');
        $aplicence_data['date_of_certificate'] = get_from_post('date_of_certificate');
        $aplicence_data['employer_name'] = get_from_post('employer_name');
        $aplicence_data['employer_address'] = get_from_post('employer_address');
        $aplicence_data['nature_of_process_for_establi'] = get_from_post('nature_of_process_for_establi');
        $aplicence_data['nature_of_process_for_labour'] = get_from_post('nature_of_process_for_labour');
        $aplicence_data['duration_of_work'] = get_from_post('duration_of_work');
        $aplicence_data['name_of_agent'] = get_from_post('establi_address');
        $aplicence_data['address_of_agent'] = get_from_post('address_of_agent');
        $aplicence_data['max_no_of_empl'] = get_from_post('max_no_of_empl');
        $aplicence_data['if_contractor_work_other_place'] = get_from_post('if_contractor_work_other_place');
        $aplicence_data['detail_of_other_work'] = get_from_post('detail_of_other_work');
        $aplicence_data['estimeted_value'] = get_from_post('estimeted_value');
        return $aplicence_data;
    }

    function _check_validation_for_aplicence($aplicence_data) {
        if (!$aplicence_data['district']) {
            return DISTRICT_MESSAGE;
        }
        if (!$aplicence_data['entity_establishment_type']) {
            return ENTITY_ESTABLISHMENT_TYPE_MESSAGE;
        }
        if (!$aplicence_data['contractor_name']) {
            return CONTRACTOR_NAME_MESSAGE;
        }
        if (!$aplicence_data['contractor_fathername']) {
            return CONTRACTOR_FATHER_NAME_MESSAGE;
        }
        if (!$aplicence_data['contractor_address']) {
            return CONTRACTOR_ADDRESS_MESSAGE;
        }
        if (!$aplicence_data['contractor_contact']) {
            return CONTRACTOR_CONTACT_MESSAGE;
        }
        if (!$aplicence_data['contractor_email']) {
            return ESTABLISHMENT_NAME_MESSAGE;
        }
        if (!$aplicence_data['establi_name']) {
            return ESTABLISHMENT_ADDRESS_MESSAGE;
        }
        if (!$aplicence_data['establi_address']) {
            return CERTIFICATE_NO_MESSAGE;
        }
        if (!$aplicence_data['no_of_certificate']) {
            return CERTIFICATE_DATE_MESSAGE;
        }
        if (!$aplicence_data['date_of_certificate']) {
            return CERTIFICATE_DATE_MESSAGE;
        }
        if (!$aplicence_data['employer_name']) {
            return EMPLOYER_NAME_MESSAGE;
        }
        if (!$aplicence_data['employer_address']) {
            return EMPLOYER_ADDRESS_MESSAGE;
        }
        if (!$aplicence_data['nature_of_process_for_establi']) {
            return NATURE_PROCESS_MESSAGE;
        }
        if (!$aplicence_data['nature_of_process_for_labour']) {
            return NATURE_PROCESS_LABOUR_MESSAGE;
        }
        if (!$aplicence_data['duration_of_work']) {
            return DURATION_WORK_MESSAGE;
        }
        if (!$aplicence_data['name_of_agent']) {
            return NAME_OF_AGENT_MESSAGE;
        }
        if (!$aplicence_data['address_of_agent']) {
            return AGENT_ADDRESS_MESSAGE;
        }
        if (!$aplicence_data['max_no_of_empl']) {
            return MAX_NO_MESSAGE;
        }
        if (!$aplicence_data['estimeted_value']) {
            return ESTABLISHMENT_MESSAGE;
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
            $aplicence_id = get_from_post('aplicence_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$aplicence_id || $aplicence_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'aplicence' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . $ex_est_data['signature'];

            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', array('signature' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));

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
            $aplicence_id = get_from_post('aplicence_id_for_aplicence_form1');
            if (!is_post() || $user_id == null || !$user_id || $aplicence_id == null || !$aplicence_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_aplicence_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');

            if (empty($existing_aplicence_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('aplicence_data' => $existing_aplicence_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('aplicence/pdf', $data, TRUE));
            $mpdf->Output('FORM-I.pdf', 'D');
        } catch (\Exception $e) {
            print_r($e->getMessage());
            return false;
        }
    }

    function get_aplicence_data_by_aplicence_id() {
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
            $aplicence_id = get_from_post('aplicence_id');
            if (!$aplicence_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $is_fb_details = get_from_post('load_fb_details');
            $this->db->trans_start();
            $aplicence_data = $this->utility_model->get_by_id_with_applicant_name('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($aplicence_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($is_fb_details == VALUE_ONE || $is_fb_details == VALUE_TWO) {
                $fb_data = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYTHREE, 'fees_bifurcation', 'module_id', $aplicence_id);
                if ($is_fb_details == VALUE_TWO) {
                    $this->load->model('payment_model');
                    $ph_data = $this->payment_model->get_payment_history(VALUE_FOURTYTHREE, $aplicence_id);
                }
                if ($aplicence_data['status'] != VALUE_FOUR && $aplicence_data['status'] != VALUE_FIVE &&
                        $aplicence_data['status'] != VALUE_SIX && $aplicence_data['status'] != VALUE_SEVEN &&
                        $aplicence_data['status'] != VALUE_EIGHT) {
                    if ($is_fb_details == VALUE_ONE) {
                        if ($aplicence_data['status'] != VALUE_ELEVEN) {
                            $aplicence_data['show_remove_upload_btn'] = true;
                        }
                        $aplicence_data['show_dropdown'] = true;
                        $aplicence_data['dropdown_data'] = $this->utility_model->get_result_data_by_id('module_type', VALUE_FOURTYTHREE, 'dept_fd');
                    }
                }
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['aplicence_data'] = $aplicence_data;
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
            $aplicence_id = get_from_post('aplicence_id');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$aplicence_id || $aplicence_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_est_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($ex_est_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $file_path = 'documents' . DIRECTORY_SEPARATOR . 'aplicence' . DIRECTORY_SEPARATOR . $ex_est_data['challan'];
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', array('status' => VALUE_TWO, 'challan' => '', 'updated_by' => $session_user_id, 'updated_time' => date('Y-m-d H:i:s')));
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
            $aplicence_id = get_from_post('aplicence_id_for_aplicence_upload_challan');
            if (!is_post() || $user_id == NULL || !$user_id || $aplicence_id == NULL || !$aplicence_id) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $payment_type = get_from_post('payment_type_for_aplicence_upload_challan');
            if ($payment_type != VALUE_ONE && $payment_type != VALUE_TWO && $payment_type != VALUE_THREE) {
                echo json_encode(get_error_array(ONE_PAYMENT_OPTION_MESSAGE));
                return false;
            }
            $aplicence_data = array();
            if ($_FILES['challan_for_aplicence_upload_challan']['name'] != '') {
                $main_path = 'documents/aplicence';
                // if (!is_dir($main_path)) {
                //     mkdir($main_path);
                //     chmod("$main_path", 0755);
                // }
                $documents_path = 'documents';
                if (!is_dir($documents_path)) {
                    mkdir($documents_path);
                    chmod($documents_path, 0777);
                }
                $module_path = $documents_path . DIRECTORY_SEPARATOR . 'aplicence';
                if (!is_dir($module_path)) {
                    mkdir($module_path);
                    chmod($module_path, 0777);
                }
                $this->load->library('upload');
                $temp_filename = str_replace('_', '', $_FILES['challan_for_aplicence_upload_challan']['name']);
                $filename = 'challan_dd_po_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
                //Change file name
                $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
                if (!move_uploaded_file($_FILES['challan_for_aplicence_upload_challan']['tmp_name'], $final_path)) {
                    echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                    return;
                }
                $aplicence_data['challan'] = $filename;
                $aplicence_data['challan_updated_date'] = date('Y-m-d H:i:s');
            }
            $aplicence_data['status'] = VALUE_THREE;
            if ($payment_type == VALUE_THREE) {
                $aplicence_data['status'] = VALUE_NINE;
            }
            $aplicence_data['payment_type'] = $payment_type;
            $aplicence_data['updated_by'] = $user_id;
            $aplicence_data['updated_time'] = date('Y-m-d H:i:s');
            $aplicence_data['total_fees'] = VALUE_ZERO;
            $this->db->trans_start();

            if ($payment_type == VALUE_ONE || $payment_type == VALUE_TWO) {
                $error_message = $this->utility_lib->update_fees_bifurcation_details(VALUE_FOURTYTHREE, $aplicence_id, $user_id, $aplicence_data);
                if ($error_message != '') {
                    echo json_encode(get_error_array($error_message));
                    return false;
                }
            } else {
                $update_data = $this->utility_lib->get_basic_delete_array($user_id);
                $this->utility_model->update_data('module_type', VALUE_FOURTYTHREE, 'fees_bifurcation', $update_data, 'module_id', $aplicence_id);
            }

            $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', $aplicence_data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = CHALLAN_UPLOADED_MESSAGE;
            $success_array['total_fees'] = $aplicence_data['total_fees'];
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
            $aplicence_id = get_from_post('aplicence_id_for_aplicence_approve');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$aplicence_id || $aplicence_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['registration_number'] = "LE/LI/DMN/CL-" . get_from_post('registration_number_for_aplicence_approve') . "/" . date('Y');
            $update_data['valid_upto'] = get_from_post('valid_upto_for_aplicence_approve');
            $update_data['fees'] = get_from_post('fees_for_aplicence_renewal_approve');
            $update_data['remarks'] = get_from_post('remarks_for_aplicence_approve');
            if (!$update_data['registration_number']) {
                echo json_encode(get_error_array(REGISTRATION_FILE_NO_MESSAGE));
                return false;
            }
            if (!$update_data['valid_upto']) {
                echo json_encode(get_error_array(DATE_MESSAGE));
                return false;
            }
            if (!$update_data['fees'] || $update_data['fees'] == VALUE_ZERO) {
                echo json_encode(get_error_array(FEES_MESSAGE));
                return false;
            }
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $existing_applicence_data = $this->utility_model->check_registration_number('registration_number', $update_data['registration_number'], 'appli_licence');
            if (is_array($existing_applicence_data)) {
                if (count(array($existing_applicence_data)) > 0) {
                    echo json_encode(get_error_array(REGISTRATION_NUMBER_EXISTS_MESSAGE));
                    return false;
                }
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            if ($_FILES['certificate_file_for_aplicence_approve']['name'] == '') {
                echo json_encode(get_error_array(UPLOAD_DOC_MESSAGE));
                return;
            }
            $evidence_size = $_FILES['certificate_file_for_aplicence_approve']['size'];
            if ($evidence_size == 0) {
                echo json_encode(get_error_array(DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $main_path = 'certificate';
            if (!is_dir($main_path)) {
                mkdir($main_path);
                chmod("$main_path", 0755);
            }
            $ad_path = $main_path . DIRECTORY_SEPARATOR . 'labour';
            if (!is_dir($ad_path)) {
                mkdir($ad_path);
                chmod("$ad_path", 0755);

                $file = DIRECTORY_SEPARATOR . 'index.html';
                $temp_path = $main_path . $file;
                chmod($temp_path, 0755);
                copy($temp_path, $ad_path . $file);
            }
            $this->load->library('upload');
            $temp_filename = str_replace('_', '', $_FILES['certificate_file_for_aplicence_approve']['name']);
            $filename = 'apc_' . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $ad_path . DIRECTORY_SEPARATOR . $filename;
            if (!move_uploaded_file($_FILES['certificate_file_for_aplicence_approve']['tmp_name'], $final_path)) {
                echo json_encode(get_error_array(DOCUMENT_NOT_UPLOAD_MESSAGE));
                return;
            }
            $update_data['certificate_file'] = $filename;
            $temp_fc_filename = 'temp_apfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            error_reporting(E_ERROR);
            $data = array('aplicence_data' => $ex_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
            $mpdf->WriteHTML($this->load->view('aplicence/qr_barcode', $data, TRUE));
            $temp_fc_path = $ad_path . DIRECTORY_SEPARATOR . $temp_fc_filename;

            // Save Temporary QR Code File
            $mpdf->Output($temp_fc_path, 'F');

            $temp_files_to_merge = array();
            array_push($temp_files_to_merge, $temp_fc_path);
            array_push($temp_files_to_merge, $final_path);
            $final_certificate_filename = 'apfc_' . (rand(100000000, 999999999)) . time() . '.pdf';
            $final_filepath = FCPATH . $ad_path . DIRECTORY_SEPARATOR . $final_certificate_filename;

            // Merge QR Code File with Uploaded Certificate
            merge_pdf($final_filepath, $temp_files_to_merge);

            // Remove Temporary QR Code File
            if (file_exists($temp_fc_path)) {
                unlink($temp_fc_path);
            }

            $update_data['final_certificate'] = $final_certificate_filename;
            $update_data['valid_upto'] = convert_to_mysql_date_format($update_data['valid_upto']);
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYTHREE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_FIVE;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_approve($ex_data['user_id'], VALUE_SEVEN, VALUE_FOURTYTHREE, $aplicence_id);
            $this->db->trans_complete();
            if ($this->db->trans_status() === FALSE) {
                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
                return;
            }
            $success_array = get_success_array();
            $success_array['message'] = APP_APPROVED_MESSAGE;
            $success_array['submitted_datetime'] = $ex_data['submitted_datetime'];
            $success_array['processing_days'] = $update_data['processing_days'];
            $success_array['final_certificate_path'] = $ad_path . DIRECTORY_SEPARATOR . $update_data['final_certificate'];
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
            $aplicence_id = get_from_post('aplicence_id_for_aplicence_reject');
            if (!is_post() || $session_user_id == NULL || !$session_user_id || !$aplicence_id || $aplicence_id == NULL) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data = array();
            $update_data['remarks'] = get_from_post('remarks_for_aplicence_reject');
            if (!$update_data['remarks']) {
                echo json_encode(get_error_array(ESTABLISHMENT_REMARK_MESSAGE));
                return false;
            }
            $this->db->trans_start();
            $ex_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($ex_data)) {
                echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
                return false;
            }
            $update_data['processing_days'] = $this->utility_lib->calculate_processing_days(VALUE_FOURTYTHREE, $ex_data['submitted_datetime']);
            $update_data['status'] = VALUE_SIX;
            $update_data['status_datetime'] = date('Y-m-d H:i:s');
            $update_data['updated_by'] = $session_user_id;
            $update_data['updated_time'] = date('Y-m-d H:i:s');
            $this->utility_model->update_data('aplicence_id', $aplicence_id, 'appli_licence', $update_data);

            $this->utility_lib->send_sms_and_email_for_app_reject($ex_data['user_id'], VALUE_EIGHT, VALUE_FOURTYTHREE, $aplicence_id);
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
            $aplicence_id = get_from_post('aplicence_id_for_certificate');
            if (!is_post() || $user_id == null || !$user_id || $aplicence_id == null || !$aplicence_id) {
                print_r(INVALID_ACCESS_MESSAGE);
                return false;
            }
            $this->db->trans_start();
            $existing_aplicence_data = $this->utility_model->get_by_id('aplicence_id', $aplicence_id, 'appli_licence');
            if (empty($existing_aplicence_data)) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            if ($existing_aplicence_data['status'] != VALUE_FIVE) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(DATABASE_ERROR_MESSAGE);
                return;
            }
            error_reporting(E_ERROR);
            $data = array('aplicence_data' => $existing_aplicence_data);
            $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'Legal']);
            $mpdf->WriteHTML($this->load->view('aplicence/certificate', $data, TRUE));
            $mpdf->Output('Aplicence_certificate_' . time() . '.pdf', 'I');
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
            $excel_data = $this->aplicence_model->get_records_for_excel($session_district);
            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                print_r(INVALID_ACCESS_MESSAGE);
                return;
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=Contractor_Report_' . date('Y-m-d H:i:s') . '.csv');
            $output = fopen("php://output", "w");
            fputcsv($output, array('Application Number', 'District', 'Entity / Establishment Type', 'Applicant Name', 'Mobile Number', 'Contractor Name',
                'Nature of Work', 'Submitted On', 'Status', 'Query Status', 'Appr./Rej. By', 'Appr./Rej. datetime', 'Remarks'));
            if (!empty($excel_data)) {
                $taluka_array = $this->config->item('taluka_array');
                $app_status_text_array = $this->config->item('app_status_text_array');
                $query_status_text_array = $this->config->item('query_status_text_array');
                $prefix_module_array = $this->config->item('prefix_module_array');
                $entity_establishment_type_array = $this->config->item('entity_establishment_type_array');
                foreach ($excel_data as $list) {
                    $prefix = isset($prefix_module_array[VALUE_FOURTYTHREE]) ? $prefix_module_array[VALUE_FOURTYTHREE] : '';
                    $list['aplicence_id'] = generate_registration_number($prefix, $list['aplicence_id']);
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